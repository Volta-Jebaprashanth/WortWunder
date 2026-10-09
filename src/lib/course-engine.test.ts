import { describe, expect, it } from "vitest";
import { COURSE_UNITS, resolveWord } from "@/data/course";
import type { CourseLesson, GrammarNote, Sentence } from "@/data/course/types";
import type { VocabWord } from "@/data/vocabulary";
import {
  buildLessonQueue,
  buildTiles,
  checkBank,
  checkPick,
  exerciseMedia,
  isQuestion,
  KNOWN_STRENGTH,
  requeueWrong,
  sameTokens,
  tokenize,
  type BankExercise,
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

    const production = queue.slice(6);
    expect(production.map((e) => e.kind)).toEqual([
      "bankToDe",
      "listenBank",
      "bankToDe",
      "listenBank",
    ]);
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
    const secondPass = queue.filter((e) => e.kind === "bankToDe" || e.kind === "listenBank");
    expect(secondPass).toHaveLength(SENTENCES.length);
  });

  it("leaves out steps whose word, note or sentence cannot be found", () => {
    const queue = buildLessonQueue(LESSON, context({ notes: [], resolveWord: () => undefined }));
    expect(queue.some((e) => e.kind === "tip" || e.kind === "newWord")).toBe(false);
    expect(queue).toHaveLength(SENTENCES.length * 2);
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
          const queue = buildLessonQueue(lesson, { lang, notes: unit.notes, resolveWord });
          const questions = queue.filter(isQuestion);
          expect(questions).toHaveLength(lesson.sentences.length * 2);
          expect(queue.length - questions.length).toBe(
            lesson.steps.filter((s) => s.kind !== "sentence").length,
          );
          for (const exercise of questions) {
            if (exercise.kind === "listenPick") {
              expect(exercise.optionIds.length, exercise.key).toBeGreaterThanOrEqual(2);
            } else {
              expect(exercise.answer.length, exercise.key).toBeGreaterThan(0);
              expect(exercise.tiles.length, exercise.key).toBeGreaterThan(exercise.answer.length);
            }
          }
        }
      }
    }
  });
});
