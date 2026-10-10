import { describe, expect, it } from "vitest";
import { checkpointSentences, COURSE_UNITS, findSentence, resolveWord } from "@/data/course";
import type {
  CourseLesson,
  Dialogue,
  GrammarNote,
  ReadingText,
  Sentence,
  SpeakTask,
} from "@/data/course/types";
import type { VocabWord } from "@/data/vocabulary";
import {
  buildCheckpointQueue,
  buildDialogue,
  buildLessonQueue,
  buildReviewQueue,
  checkComprehension,
  checkDialoguePick,
  checkSpoken,
  isScored,
  isTask,
  REVIEW_SIZE,
  spokenScore,
  buildTiles,
  checkBank,
  checkGap,
  checkPick,
  checkpointPassed,
  checkTyped,
  CHECKPOINT_SIZE,
  exerciseMedia,
  isQuestion,
  KNOWN_STRENGTH,
  normalizeTyped,
  requeueWrong,
  sameTokens,
  splitAtToken,
  tokenize,
  type BankExercise,
  type GapExercise,
  type PickExercise,
  type QueueContext,
  type Rng,
} from "@/lib/course-engine";

// A small deterministic generator, so shuffles are repeatable per seed.
function seeded(seed: number): Rng {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function sentence(n: number, german: string, english: string): Sentence {
  return {
    id: `u09.l01.s0${n}`,
    german,
    english,
    tamil: `ta ${english}`,
    sinhala: `si ${english}`,
  };
}

const SENTENCES = [
  sentence(1, "Hallo, Anna!", "Hello, Anna!"),
  sentence(2, "Tschüss, Tom!", "Bye, Tom!"),
  sentence(3, "Guten Tag, Herr Weber.", "Good day, Mr Weber."),
  sentence(4, "Auf Wiedersehen, Frau Klein.", "Goodbye, Mrs Klein."),
];
const NOTE: GrammarNote = {
  id: "u09.g01",
  tag: "t",
  title: { english: "T", tamil: "T", sinhala: "T" },
  body: { english: "B", tamil: "B", sinhala: "B" },
  examples: ["u09.l01.s01"],
};
const WORD: VocabWord = {
  id: "hallo",
  full: "Hallo",
  image: "/hello.jpg",
  english: "Hello",
  tamil: "ta",
  sinhala: "si",
};
const LESSON: CourseLesson = {
  id: "u09.l01",
  title: "Test",
  meaning: { english: "Test", tamil: "Test", sinhala: "Test" },
  newWords: ["1.1/hallo"],
  sentences: SENTENCES,
  steps: [
    { kind: "word", ref: "1.1/hallo" },
    { kind: "sentence", id: "u09.l01.s01" },
    { kind: "sentence", id: "u09.l01.s02" },
    { kind: "tip", noteId: "u09.g01" },
    { kind: "sentence", id: "u09.l01.s03" },
    { kind: "sentence", id: "u09.l01.s04" },
  ],
};

// A longer lesson with two marked gaps, for the grammar and typing passes.
const GRAMMAR_SENTENCES: Sentence[] = [
  { ...sentence(1, "Ich heiße Anna.", "My name is Anna."), accept: ["Mein Name ist Anna."] },
  sentence(2, "Ich bin Tom.", "I am Tom."),
  { ...sentence(3, "Wie heißt du?", "What is your name?"), gap: { token: 1, options: ["heiße"] } },
  sentence(4, "Wer bist du?", "Who are you?"),
  sentence(5, "Guten Morgen! Ich bin Anna.", "Good morning! I am Anna."),
  { ...sentence(6, "Bist du Anna?", "Are you Anna?"), gap: { token: 0, options: ["Sind", "Bin"] } },
];
const GRAMMAR_LESSON: CourseLesson = {
  ...LESSON,
  newWords: [],
  sentences: GRAMMAR_SENTENCES,
  steps: GRAMMAR_SENTENCES.map((s) => ({ kind: "sentence", id: s.id })),
};

function context(overrides: Partial<QueueContext> = {}): QueueContext {
  return {
    lang: "english",
    notes: [NOTE],
    resolveWord: (ref) => (ref === "1.1/hallo" ? WORD : undefined),
    rng: seeded(1),
    ...overrides,
  };
}

describe("tokenize", () => {
  it("drops punctuation around words and keeps it inside them", () => {
    expect(tokenize("Hallo, Anna!")).toEqual(["Hallo", "Anna"]);
    expect(tokenize("Wie geht's?")).toEqual(["Wie", "geht's"]);
    expect(tokenize("  Guten   Tag,  Herr Weber. ")).toEqual(["Guten", "Tag", "Herr", "Weber"]);
    expect(tokenize("Ich bin 20 Jahre alt.")).toEqual(["Ich", "bin", "20", "Jahre", "alt"]);
  });

  it("keeps Tamil and Sinhala words whole, including their vowel signs", () => {
    expect(tokenize("வணக்கம், அன்னா!")).toEqual(["வணக்கம்", "அன்னா"]);
    expect(tokenize("ආයුබෝවන්, ඇනා!")).toEqual(["ආයුබෝවන්", "ඇනා"]);
  });
});

describe("splitAtToken", () => {
  it("cuts a sentence around one word and keeps the punctuation", () => {
    expect(splitAtToken("Wie heißt du?", 1)).toEqual({
      before: "Wie ",
      word: "heißt",
      after: " du?",
    });
    expect(splitAtToken("Bist du Anna?", 0)).toEqual({
      before: "",
      word: "Bist",
      after: " du Anna?",
    });
    expect(splitAtToken("Guten Tag, Herr Weber.", 3)).toEqual({
      before: "Guten Tag, Herr ",
      word: "Weber",
      after: ".",
    });
    expect(splitAtToken("Guten Tag! Wie heißen Sie?", 1).after).toBe("! Wie heißen Sie?");
  });

  it("returns no word for a position the sentence does not have", () => {
    expect(splitAtToken("Hallo, Anna!", 5).word).toBe("");
  });
});

describe("buildTiles", () => {
  it("holds every answer word plus decoys that never repeat an answer word", () => {
    const answer = ["Hallo", "Anna", "und", "Tom"];
    const pool = ["hallo", "Tom", "Guten", "Tag", "Herr", "Weber", "Guten"];
    for (let seed = 1; seed <= 20; seed++) {
      const tiles = buildTiles(answer, pool, seeded(seed));
      expect(tiles).toHaveLength(answer.length + 3);
      for (const token of answer) expect(tiles).toContain(token);
      const decoys = tiles.filter((tile) => !answer.includes(tile));
      expect(decoys).toHaveLength(3);
      expect(new Set(decoys).size).toBe(3);
      expect(decoys).not.toContain("hallo");
    }
  });

  it("uses fewer decoys when the lesson has none to offer", () => {
    expect(buildTiles(["Hallo"], ["Hallo"], seeded(1))).toEqual(["Hallo"]);
  });
});

describe("buildLessonQueue", () => {
  it("follows the authored steps, then asks for every sentence in German", () => {
    const queue = buildLessonQueue(LESSON, context());
    expect(queue.slice(0, 6).map((e) => e.kind)).toEqual([
      "newWord",
      "bankFromDe",
      "listenPick",
      "tip",
      "bankFromDe",
      "listenPick",
    ]);
    const first = queue.slice(0, 6).filter(isQuestion);
    expect(first.map((e) => e.sentence.id)).toEqual(SENTENCES.map((s) => s.id));

    // One to put in order (or a word bank, if it is too short for that),
    // two word banks, one to type.
    const production = queue.slice(6);
    expect(["order", "bankToDe"]).toContain(production[0]!.kind);
    expect(production.slice(1).map((e) => e.kind)).toEqual(["bankToDe", "listenBank", "type"]);
    expect(
      production
        .filter(isQuestion)
        .map((e) => e.sentence.id)
        .sort(),
    ).toEqual(SENTENCES.map((s) => s.id));
  });

  it("gives every screen a unique key", () => {
    const keys = buildLessonQueue(LESSON, context()).map((e) => e.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("never opens the second pass with the sentence just seen", () => {
    for (let seed = 1; seed <= 40; seed++) {
      const queue = buildLessonQueue(LESSON, context({ rng: seeded(seed) }));
      const before = queue[5] as PickExercise;
      const after = queue[6] as BankExercise;
      expect(after.sentence.id).not.toBe(before.sentence.id);
    }
  });

  it("builds mother-tongue tiles for bankFromDe and German tiles for the rest", () => {
    const queue = buildLessonQueue(LESSON, context({ lang: "tamil" }));
    const fromDe = queue.find((e) => e.kind === "bankFromDe") as BankExercise;
    expect(fromDe.answer).toEqual(tokenize(fromDe.sentence.tamil));
    const toDe = queue.find((e) => e.kind === "bankToDe") as BankExercise;
    expect(toDe.answer).toEqual(tokenize(toDe.sentence.german));
    for (const token of toDe.answer) expect(toDe.tiles).toContain(token);
  });

  it("offers the right meaning among distinct options for listenPick", () => {
    const queue = buildLessonQueue(LESSON, context());
    for (const exercise of queue) {
      if (exercise.kind !== "listenPick") continue;
      expect(exercise.optionIds).toHaveLength(3);
      expect(new Set(exercise.optionIds).size).toBe(3);
      expect(exercise.optionIds).toContain(exercise.sentence.id);
    }
  });

  it("skips the recognition pass for sentences the learner knows", () => {
    const queue = buildLessonQueue(
      LESSON,
      context({ strengthOf: (id) => (id === "u09.l01.s01" ? KNOWN_STRENGTH : 0) }),
    );
    const firstPass = queue.filter((e) => e.kind === "bankFromDe" || e.kind === "listenPick");
    expect(firstPass.filter(isQuestion).map((e) => e.sentence.id)).not.toContain("u09.l01.s01");
    const secondPass = queue.filter(
      (e) => isQuestion(e) && e.kind !== "bankFromDe" && e.kind !== "listenPick",
    );
    expect(secondPass).toHaveLength(SENTENCES.length);
  });

  it("leaves out steps whose word, note or sentence cannot be found", () => {
    const queue = buildLessonQueue(LESSON, context({ notes: [], resolveWord: () => undefined }));
    expect(queue.some((e) => e.kind === "tip" || e.kind === "newWord")).toBe(false);
    expect(queue).toHaveLength(SENTENCES.length * 2);
  });
});

describe("the grammar and typing passes", () => {
  it("asks every marked gap between recognition and production", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const queue = buildLessonQueue(GRAMMAR_LESSON, context({ rng: seeded(seed) }));
      expect(queue).toHaveLength(6 + 2 + 6);
      const gaps = queue.slice(6, 8) as GapExercise[];
      expect(gaps.map((e) => e.kind)).toEqual(["gap", "gap"]);
      expect(gaps.map((e) => e.answer)).toEqual(["heißt", "Bist"]);
      expect(gaps[1]!.options.slice().sort()).toEqual(["Bin", "Bist", "Sind"]);
    }
  });

  it("runs production from ordering through word banks to typing", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const production = buildLessonQueue(GRAMMAR_LESSON, context({ rng: seeded(seed) })).slice(8);
      expect(production.map((e) => e.kind)).toEqual([
        "order",
        "order",
        "bankToDe",
        "listenBank",
        "type",
        "speak",
      ]);
      expect(
        production
          .filter(isQuestion)
          .map((e) => e.sentence.id)
          .sort(),
      ).toEqual(GRAMMAR_SENTENCES.map((s) => s.id));
    }
  });

  it("orders a sentence with its own words only, never already in order", () => {
    for (let seed = 1; seed <= 40; seed++) {
      const queue = buildLessonQueue(GRAMMAR_LESSON, context({ rng: seeded(seed) }));
      for (const exercise of queue) {
        if (exercise.kind !== "order") continue;
        expect(exercise.tiles.slice().sort()).toEqual(exercise.answer.slice().sort());
        expect(sameTokens(exercise.tiles, exercise.answer)).toBe(false);
        expect(checkBank(exercise, exercise.answer)).toBe(true);
      }
    }
  });

  it("accepts only the missing word for a gap", () => {
    const queue = buildLessonQueue(GRAMMAR_LESSON, context());
    const gap = queue.find((e) => e.kind === "gap") as GapExercise;
    expect(checkGap(gap, "heißt")).toBe(true);
    expect(checkGap(gap, "heiße")).toBe(false);
    expect(checkGap(gap, "")).toBe(false);
  });
});

describe("checkTyped", () => {
  const [name, , ask] = GRAMMAR_SENTENCES as [Sentence, Sentence, Sentence];

  it("ignores case, punctuation and spacing", () => {
    expect(normalizeTyped("  Wie   geht's?! ")).toBe("wie gehts");
    expect(checkTyped(name, "ich heiße anna")).toMatchObject({ verdict: "exact", correct: true });
    expect(checkTyped(name, " Ich  heiße Anna!! ").verdict).toBe("exact");
  });

  it("accepts a listed alternative and says which one matched", () => {
    expect(checkTyped(name, "mein name ist anna")).toEqual({
      verdict: "exact",
      correct: true,
      target: "Mein Name ist Anna.",
    });
  });

  it("accepts ss and ae/oe/ue spellings, but points them out", () => {
    expect(checkTyped(name, "Ich heisse Anna")).toMatchObject({
      verdict: "spelling",
      correct: true,
      target: "Ich heiße Anna.",
    });
    const hear = sentence(7, "Schreib, was du hörst.", "Write what you hear.");
    expect(checkTyped(hear, "schreib was du hoerst").verdict).toBe("spelling");
  });

  it("accepts one character off as almost right and names the word", () => {
    expect(checkTyped(name, "Ich heiße Ana")).toEqual({
      verdict: "almost",
      correct: true,
      target: "Ich heiße Anna.",
      diffToken: 2,
    });
    expect(checkTyped(name, "Ich heißee Anna")).toMatchObject({ verdict: "almost", diffToken: 1 });
    expect(checkTyped(name, "Ich heise Anna")).toMatchObject({ verdict: "almost", diffToken: 1 });
    expect(checkTyped(name, "Ichheiße Anna").verdict).toBe("almost");
  });

  it("rejects anything further off, and an empty answer", () => {
    expect(checkTyped(name, "Ich heie Ana").correct).toBe(false);
    expect(checkTyped(name, "Ich bin Anna").correct).toBe(false);
    expect(checkTyped(name, "   ")).toEqual({
      verdict: "wrong",
      correct: false,
      target: "Ich heiße Anna.",
    });
  });

  it("never passes the gap's wrong word as a near miss", () => {
    // "heiße" is one character from "heißt", and exactly the mistake the
    // sentence is there to catch.
    expect(checkTyped(ask, "Wie heiße du?").correct).toBe(false);
    expect(checkTyped(ask, "Wie heisse du").correct).toBe(false);
    expect(checkTyped(ask, "Wie heißt du").verdict).toBe("exact");
    expect(checkTyped(ask, "Wie heißt da").verdict).toBe("almost");
  });

  it("does not stretch a very short answer", () => {
    expect(checkTyped(sentence(8, "Ja.", "Yes."), "Je").correct).toBe(false);
  });
});

describe("buildCheckpointQueue", () => {
  const pool = [...SENTENCES, ...GRAMMAR_SENTENCES.map((s) => ({ ...s, id: `${s.id}b` }))];

  it("asks each drawn sentence once, in a mix of exercise types", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const queue = buildCheckpointQueue(pool, { lang: "english", rng: seeded(seed) });
      expect(queue).toHaveLength(pool.length);
      expect(new Set(queue.map((e) => e.sentence.id)).size).toBe(pool.length);
      expect(new Set(queue.map((e) => e.key)).size).toBe(pool.length);
      const kinds = new Set(queue.map((e) => e.kind));
      for (const kind of ["listenPick", "bankToDe", "listenBank", "type", "listenType"])
        expect(kinds, `seed ${seed}`).toContain(kind);
      for (const exercise of queue)
        if (exercise.kind === "gap") expect(exercise.sentence.gap).toBeDefined();
    }
  });

  it("draws no more than the checkpoint size from a larger pool", () => {
    const large = Array.from({ length: 30 }, (_, i) => ({
      ...sentence(1, `Satz Nummer ${i} hier.`, `Sentence number ${i} here.`),
      id: `u09.l01.s${i + 10}`,
    }));
    const queue = buildCheckpointQueue(large, { lang: "english", rng: seeded(3) });
    expect(queue).toHaveLength(CHECKPOINT_SIZE);
  });

  it("passes at 80 percent right", () => {
    expect(checkpointPassed(10, 12)).toBe(true);
    expect(checkpointPassed(9, 12)).toBe(false);
    expect(checkpointPassed(12, 12)).toBe(true);
    expect(checkpointPassed(0, 0)).toBe(false);
  });
});

describe("dialogues and tasks", () => {
  const DIALOGUE: Dialogue = {
    id: "u09.d01",
    title: { english: "D", tamil: "D", sinhala: "D" },
    lines: [
      { speaker: "a", sentenceId: "u09.l01.s03" },
      { speaker: "b", sentenceId: "u09.l01.s01" },
      { speaker: "a", sentenceId: "u09.l01.s06" },
      { speaker: "b", sentenceId: "u09.l01.s02" },
    ],
    question: {
      format: "choice",
      prompt: { english: "Q", tamil: "Q", sinhala: "Q" },
      options: [
        { english: "A", tamil: "A", sinhala: "A" },
        { english: "B", tamil: "B", sinhala: "B" },
      ],
      correct: 1,
    },
  };
  const READING: ReadingText = {
    id: "u09.r01",
    layout: "sign",
    german: "Hallo!",
    question: {
      format: "richtigFalsch",
      statement: { english: "S", tamil: "S", sinhala: "S" },
      correct: false,
    },
  };
  const TASK: SpeakTask = {
    id: "u09.q01",
    cue: { english: "C", tamil: "C", sinhala: "C" },
    question: "u09.l01.s03",
    models: ["u09.l01.s01", "u09.l01.s99"],
  };
  const byId = (id: string) => GRAMMAR_SENTENCES.find((s) => s.id === id);

  it("lets the learner pick each of speaker b's lines from three sentences", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const exercise = buildDialogue(DIALOGUE, byId, GRAMMAR_SENTENCES, seeded(seed));
      expect(exercise.turns.map((turn) => turn.sentence.id)).toEqual(
        DIALOGUE.lines.map((line) => line.sentenceId),
      );
      for (const turn of exercise.turns) {
        if (turn.speaker === "a") {
          expect(turn.optionIds).toBeUndefined();
          continue;
        }
        expect(turn.optionIds).toHaveLength(3);
        expect(turn.optionIds).toContain(turn.sentence.id);
        expect(new Set(turn.optionIds!.map((id) => byId(id)!.german)).size).toBe(3);
        expect(checkDialoguePick(turn, turn.sentence.id)).toBe(true);
        expect(
          checkDialoguePick(
            turn,
            turn.optionIds!.find((id) => id !== turn.sentence.id)!,
          ),
        ).toBe(false);
      }
    }
  });

  it("leaves out a line whose sentence cannot be found", () => {
    const broken = { ...DIALOGUE, lines: [...DIALOGUE.lines, { speaker: "a", sentenceId: "x" }] };
    expect(buildDialogue(broken as Dialogue, byId, [], seeded(1)).turns).toHaveLength(4);
  });

  it("puts dialogue, listening, reading and speaking steps into the queue", () => {
    const lesson: CourseLesson = {
      ...GRAMMAR_LESSON,
      steps: [
        ...GRAMMAR_LESSON.steps,
        { kind: "dialogue", id: "u09.d01" },
        { kind: "listen", id: "u09.d01" },
        { kind: "read", id: "u09.r01" },
        { kind: "speakQ", id: "u09.q01" },
        { kind: "read", id: "u09.r99" },
      ],
    };
    const queue = buildLessonQueue(
      lesson,
      context({ dialogues: [DIALOGUE], readings: [READING], speakTasks: [TASK] }),
    );
    // The tasks sit where the author put them: after the recognition pass.
    expect(queue.slice(6, 10).map((e) => e.kind)).toEqual(["dialogue", "hearQ", "readQ", "speakQ"]);
    expect(queue.filter(isTask)).toHaveLength(3);
    expect(queue.filter(isScored)).toHaveLength(6 + 2 + 6 + 3);
    expect(queue.filter(isQuestion)).toHaveLength(6 + 2 + 6);
    const speakQ = queue[9]!;
    if (speakQ.kind !== "speakQ") throw new Error("expected a speaking task");
    expect(speakQ.question?.id).toBe("u09.l01.s03");
    expect(speakQ.models.map((m) => m.id)).toEqual(["u09.l01.s01"]);
    expect(exerciseMedia(queue[7]!).sentenceIds).toEqual(DIALOGUE.lines.map((l) => l.sentenceId));
    expect(exerciseMedia(queue[8]!).sentenceIds).toEqual([]);
  });

  it("skips a listening step whose dialogue has no question", () => {
    const { question: _, ...silent } = DIALOGUE;
    const lesson: CourseLesson = { ...GRAMMAR_LESSON, steps: [{ kind: "listen", id: "u09.d01" }] };
    expect(buildLessonQueue(lesson, context({ dialogues: [silent] }))).toEqual([]);
  });

  it("checks a comprehension answer in either format", () => {
    expect(checkComprehension(DIALOGUE.question!, 1)).toBe(true);
    expect(checkComprehension(DIALOGUE.question!, 0)).toBe(false);
    expect(checkComprehension(READING.question, false)).toBe(true);
    expect(checkComprehension(READING.question, true)).toBe(false);
  });
});

describe("speaking", () => {
  it("scores the share of the target's words that were heard", () => {
    expect(spokenScore("Ich heiße Anna.", "ich heiße anna")).toBe(1);
    expect(spokenScore("Ich heiße Anna.", "ich heisse Jeba")).toBeCloseTo(2 / 3);
    expect(spokenScore("Ich heiße Anna.", "guten tag")).toBe(0);
    expect(spokenScore("", "hallo")).toBe(0);
  });

  it("passes when most words of any target are in any guess", () => {
    expect(checkSpoken(["Ich heiße Anna."], ["ich weiß ja", "ich heiße Hanna"])).toBe(true);
    expect(checkSpoken(["Ich heiße Anna.", "Ich bin Tom."], ["ich bin Jeba"])).toBe(true);
    expect(checkSpoken(["Wie geht es Ihnen, Frau Klein?"], ["wie geht es"])).toBe(false);
    expect(checkSpoken(["Ich heiße Anna."], [])).toBe(false);
  });

  it("re-queues a spoken sentence with its listening fallback under the new key", () => {
    const queue = buildLessonQueue(GRAMMAR_LESSON, context());
    const speak = queue.find((e) => e.kind === "speak")!;
    if (speak.kind !== "speak") throw new Error("expected a speaking exercise");
    expect(speak.fallback.key).toBe(speak.key);
    const again = requeueWrong(queue, speak).at(-1)!;
    if (again.kind !== "speak") throw new Error("expected a speaking exercise");
    expect(again.key).toBe(`${speak.key}+`);
    expect(again.fallback.key).toBe(again.key);
    expect(speak.fallback.key).toBe(speak.key);
  });

  it("types a spelled-out sentence instead of asking for it aloud", () => {
    const spelled = GRAMMAR_SENTENCES.map((s) => ({ ...s, say: "Weh" }));
    const lesson = { ...GRAMMAR_LESSON, sentences: spelled };
    const queue = buildLessonQueue(lesson, context());
    expect(queue.some((e) => e.kind === "speak")).toBe(false);
  });
});

describe("buildReviewQueue", () => {
  const strengths: Record<string, number> = {
    "u09.l01.s01": 0,
    "u09.l01.s02": 1,
    "u09.l01.s03": 2,
    "u09.l01.s04": 2,
    "u09.l01.s05": 3,
    "u09.l01.s06": 5,
  };
  const reviewContext = (rng: Rng) => ({
    lang: "english" as const,
    strengthOf: (id: string) => strengths[id] ?? 0,
    othersOf: (s: Sentence) => GRAMMAR_SENTENCES.filter((other) => other.id !== s.id),
    rng,
  });

  it("asks harder exercises of stronger sentences", () => {
    const queue = buildReviewQueue(GRAMMAR_SENTENCES, reviewContext(seeded(1)));
    expect(queue.map((e) => e.sentence.id)).toEqual(GRAMMAR_SENTENCES.map((s) => s.id));
    expect(queue.map((e) => e.kind)).toEqual([
      "listenPick",
      "bankFromDe",
      "gap",
      "order",
      "bankToDe",
      "listenType",
    ]);
  });

  it("takes no more than a session's worth", () => {
    const many = Array.from({ length: 40 }, (_, i) => ({
      ...sentence(1, `Satz Nummer ${i} hier.`, `Sentence number ${i} here.`),
      id: `u09.l01.s${i + 10}`,
    }));
    const queue = buildReviewQueue(many, { ...reviewContext(seeded(2)), othersOf: () => many });
    expect(queue).toHaveLength(REVIEW_SIZE);
    expect(queue[0]!.sentence.id).toBe("u09.l01.s10");
    expect(new Set(queue.map((e) => e.key)).size).toBe(REVIEW_SIZE);
  });
});

describe("checking answers", () => {
  const queue = buildLessonQueue(LESSON, context());
  const bank = queue.find((e) => e.kind === "bankToDe") as BankExercise;
  const pick = queue.find((e) => e.kind === "listenPick") as PickExercise;

  it("accepts the tiles only in the right order", () => {
    expect(checkBank(bank, bank.answer)).toBe(true);
    expect(checkBank(bank, bank.answer.slice().reverse())).toBe(false);
    expect(checkBank(bank, bank.answer.slice(0, -1))).toBe(false);
    expect(checkBank(bank, [...bank.answer, "und"])).toBe(false);
    expect(sameTokens(["hallo"], ["Hallo"])).toBe(false);
  });

  it("accepts only the heard sentence's meaning", () => {
    expect(checkPick(pick, pick.sentence.id)).toBe(true);
    const wrong = pick.optionIds.find((id) => id !== pick.sentence.id)!;
    expect(checkPick(pick, wrong)).toBe(false);
  });
});

describe("requeueWrong", () => {
  it("adds the question again at the end under a new key, as often as needed", () => {
    const queue = buildLessonQueue(LESSON, context());
    const missed = queue.find(isQuestion)!;
    const once = requeueWrong(queue, missed);
    expect(once).toHaveLength(queue.length + 1);
    expect(queue).toHaveLength(SENTENCES.length * 2 + 2);
    const again = once[once.length - 1]!;
    expect(again).toMatchObject({ kind: missed.kind, sentence: missed.sentence });
    expect(again.key).not.toBe(missed.key);

    const twice = requeueWrong(once, again as BankExercise);
    expect(new Set(twice.map((e) => e.key)).size).toBe(twice.length);
  });
});

describe("exerciseMedia", () => {
  it("names what each kind of screen plays and shows", () => {
    const queue = buildLessonQueue(LESSON, context());
    expect(exerciseMedia(queue[0]!)).toEqual({
      sentenceIds: [],
      words: ["Hallo"],
      images: ["/hello.jpg"],
    });
    expect(exerciseMedia(queue[1]!).sentenceIds).toEqual(["u09.l01.s01"]);
    expect(exerciseMedia(queue[3]!).sentenceIds).toEqual(["u09.l01.s01"]);
  });
});

describe("the real course", () => {
  it("builds a playable queue for every lesson in every language", () => {
    for (const unit of COURSE_UNITS) {
      for (const lesson of unit.lessons) {
        for (const lang of ["english", "tamil", "sinhala"] as const) {
          const queue = buildLessonQueue(lesson, {
            lang,
            notes: unit.notes,
            resolveWord,
            dialogues: unit.dialogues,
            readings: unit.readings,
            speakTasks: unit.speakTasks,
            findSentence,
          });
          for (const exercise of queue) {
            if (exercise.kind === "dialogue") {
              expect(exercise.turns, exercise.key).toHaveLength(exercise.dialogue.lines.length);
              for (const turn of exercise.turns)
                expect(turn.optionIds?.length ?? 3, exercise.key).toBe(3);
            } else if (exercise.kind === "hearQ") {
              expect(exercise.lines, exercise.key).toHaveLength(exercise.dialogue.lines.length);
            } else if (exercise.kind === "speakQ") {
              expect(exercise.models.length, exercise.key).toBe(exercise.task.models.length);
            }
          }
          const questions = queue.filter(isQuestion);
          // Sentences written only for a dialogue are not drilled.
          const drilled = lesson.steps.flatMap((s) => (s.kind === "sentence" ? [s.id] : []));
          const gaps = lesson.sentences.filter((s) => s.gap && drilled.includes(s.id)).length;
          expect(questions).toHaveLength(drilled.length * 2 + gaps);
          expect(queue.length - questions.length).toBe(
            lesson.steps.filter((s) => s.kind !== "sentence").length,
          );
          for (const exercise of questions) {
            if (exercise.kind === "listenPick") {
              expect(exercise.optionIds.length, exercise.key).toBe(3);
            } else if (exercise.kind === "gap") {
              expect(exercise.answer, exercise.key).not.toBe("");
              expect(new Set(exercise.options).size, exercise.key).toBe(exercise.options.length);
            } else if (exercise.kind === "order") {
              expect(exercise.tiles.length, exercise.key).toBe(exercise.answer.length);
            } else if (exercise.kind === "speak") {
              expect(exercise.fallback.kind).toBe("listenBank");
              expect(exercise.sentence.say, exercise.key).toBeUndefined();
            } else if (!("tiles" in exercise)) {
              expect(checkTyped(exercise.sentence, exercise.sentence.german).verdict).toBe("exact");
            } else {
              expect(exercise.answer.length, exercise.key).toBeGreaterThan(0);
              expect(exercise.tiles.length, exercise.key).toBeGreaterThan(exercise.answer.length);
            }
          }
        }
      }
    }
  });

  it("types every accepted alternative as right", () => {
    for (const unit of COURSE_UNITS)
      for (const lesson of unit.lessons)
        for (const s of lesson.sentences)
          for (const alternative of s.accept ?? [])
            expect(checkTyped(s, alternative).verdict, `${s.id}: ${alternative}`).toBe("exact");
  });

  it("builds a full checkpoint for every unit that has one", () => {
    for (const unit of COURSE_UNITS) {
      const pool = checkpointSentences(unit);
      if (pool.length === 0) continue;
      expect(pool).toHaveLength(unit.checkpoint.length);
      for (const lang of ["english", "tamil", "sinhala"] as const)
        expect(buildCheckpointQueue(pool, { lang })).toHaveLength(CHECKPOINT_SIZE);
    }
  });
});
