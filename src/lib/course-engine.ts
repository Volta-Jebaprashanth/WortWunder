import type { MotherTongue } from "@/lib/i18n";
import type { VocabWord } from "@/data/vocabulary";
import type { CourseLesson, GrammarNote, Sentence } from "@/data/course/types";

// Turns a course lesson into the queue of screens the lesson player shows,
// and checks answers. Pure functions only: no storage, no audio, and
// randomness comes in through `rng` so tests can pin it down.
//
// A lesson runs in two passes. The first follows the authored steps: tips
// and new words where the author put them, and each sentence as a
// recognition exercise (read or hear German, give the meaning). The second
// pass asks for every sentence again as a production exercise (build the
// German), in shuffled order. A sentence the learner already knows well
// skips the recognition pass.
export type Rng = () => number;

export type BankKind = "bankFromDe" | "bankToDe" | "listenBank";
export type QuestionKind = BankKind | "listenPick";

export interface TipExercise {
  kind: "tip";
  key: string;
  note: GrammarNote;
}
export interface NewWordExercise {
  kind: "newWord";
  key: string;
  word: VocabWord;
}
// Tap word tiles in order. `answer` is in German for bankToDe and
// listenBank, and in the learner's mother tongue for bankFromDe.
export interface BankExercise {
  kind: BankKind;
  key: string;
  sentence: Sentence;
  answer: string[];
  tiles: string[];
}
// Hear the sentence, pick its meaning. `optionIds` are sentence ids.
export interface PickExercise {
  kind: "listenPick";
  key: string;
  sentence: Sentence;
  optionIds: string[];
}
export type QuestionExercise = BankExercise | PickExercise;
export type Exercise = TipExercise | NewWordExercise | QuestionExercise;

// Sentences at or above this strength (see course-store.ts) skip the
// recognition pass.
export const KNOWN_STRENGTH = 2;
const DISTRACTOR_TILES = 3;
const PICK_OPTIONS = 3;

export function shuffled<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

// Splits a sentence into the words shown on tiles: punctuation around a word
// is dropped ("Hallo," -> "Hallo"), punctuation inside it is kept ("geht's").
export function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map((token) => token.replace(/^[^\p{L}\p{M}\p{N}]+|[^\p{L}\p{M}\p{N}]+$/gu, ""))
    .filter((token) => token.length > 0);
}

export function sameTokens(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((token, i) => token === b[i]);
}

// The tile pool for a word-bank exercise: the answer's own words plus a few
// words from the lesson's other sentences, shuffled. A decoy never repeats a
// word of the answer (whatever its capitalisation), so there is only one way
// to build the sentence.
export function buildTiles(
  answer: readonly string[],
  pool: readonly string[],
  rng: Rng = Math.random,
  decoys = DISTRACTOR_TILES,
): string[] {
  const taken = new Set(answer.map((token) => token.toLowerCase()));
  const extra: string[] = [];
  for (const token of shuffled(pool, rng)) {
    if (extra.length >= decoys) break;
    if (taken.has(token.toLowerCase())) continue;
    taken.add(token.toLowerCase());
    extra.push(token);
  }
  return shuffled([...answer, ...extra], rng);
}

export function isQuestion(exercise: Exercise): exercise is QuestionExercise {
  return exercise.kind !== "tip" && exercise.kind !== "newWord";
}

export interface QueueContext {
  lang: MotherTongue;
  notes: readonly GrammarNote[];
  resolveWord: (ref: string) => VocabWord | undefined;
  strengthOf?: (sentenceId: string) => number;
  rng?: Rng;
}

function bankExercise(
  kind: BankKind,
  sentence: Sentence,
  others: readonly Sentence[],
  lang: MotherTongue,
  rng: Rng,
): BankExercise {
  const text = (s: Sentence) => (kind === "bankFromDe" ? s[lang] : s.german);
  const answer = tokenize(text(sentence));
  const pool = others.flatMap((other) => tokenize(text(other)));
  return {
    kind,
    key: `${kind}:${sentence.id}`,
    sentence,
    answer,
    tiles: buildTiles(answer, pool, rng),
  };
}

function pickExercise(
  sentence: Sentence,
  others: readonly Sentence[],
  lang: MotherTongue,
  rng: Rng,
): PickExercise {
  // Two options must never read the same, or two answers would be right.
  const meanings = new Set([sentence[lang]]);
  const wrong: string[] = [];
  for (const other of shuffled(others, rng)) {
    if (wrong.length >= PICK_OPTIONS - 1) break;
    if (meanings.has(other[lang])) continue;
    meanings.add(other[lang]);
    wrong.push(other.id);
  }
  return {
    kind: "listenPick",
    key: `listenPick:${sentence.id}`,
    sentence,
    optionIds: shuffled([sentence.id, ...wrong], rng),
  };
}

export function buildLessonQueue(lesson: CourseLesson, ctx: QueueContext): Exercise[] {
  const rng = ctx.rng ?? Math.random;
  const strengthOf = ctx.strengthOf ?? (() => 0);
  const byId = new Map(lesson.sentences.map((s) => [s.id, s]));
  const othersOf = (sentence: Sentence) => lesson.sentences.filter((s) => s.id !== sentence.id);
  const queue: Exercise[] = [];
  const ordered: Sentence[] = [];

  for (const step of lesson.steps) {
    if (step.kind === "tip") {
      const note = ctx.notes.find((n) => n.id === step.noteId);
      if (note) queue.push({ kind: "tip", key: `tip:${note.id}`, note });
    } else if (step.kind === "word") {
      const word = ctx.resolveWord(step.ref);
      if (word) queue.push({ kind: "newWord", key: `newWord:${step.ref}`, word });
    } else {
      const sentence = byId.get(step.id);
      if (!sentence) continue;
      const position = ordered.push(sentence) - 1;
      if (strengthOf(sentence.id) >= KNOWN_STRENGTH) continue;
      queue.push(
        position % 2 === 0
          ? bankExercise("bankFromDe", sentence, othersOf(sentence), ctx.lang, rng)
          : pickExercise(sentence, othersOf(sentence), ctx.lang, rng),
      );
    }
  }

  const production = shuffled(ordered, rng);
  // Don't ask for the sentence the learner has just seen straight away.
  const last = queue[queue.length - 1];
  if (production.length > 1 && last && isQuestion(last) && production[0] === last.sentence)
    production.push(production.shift()!);
  production.forEach((sentence, i) => {
    queue.push(
      bankExercise(
        i % 2 === 0 ? "bankToDe" : "listenBank",
        sentence,
        othersOf(sentence),
        ctx.lang,
        rng,
      ),
    );
  });
  return queue;
}

// A wrongly answered question comes back at the end of the lesson, as often
// as it takes. The copy gets its own key so React remounts the screen.
export function requeueWrong(queue: readonly Exercise[], exercise: QuestionExercise): Exercise[] {
  return [...queue, { ...exercise, key: `${exercise.key}+` }];
}

export function checkBank(exercise: BankExercise, picked: readonly string[]): boolean {
  return sameTokens(picked, exercise.answer);
}

export function checkPick(exercise: PickExercise, pickedId: string): boolean {
  return pickedId === exercise.sentence.id;
}

// What a screen plays or shows, so the loaders can fetch it ahead of time.
export interface ExerciseMedia {
  sentenceIds: string[];
  words: string[];
  images: string[];
}

export function exerciseMedia(exercise: Exercise): ExerciseMedia {
  switch (exercise.kind) {
    case "tip":
      return { sentenceIds: exercise.note.examples, words: [], images: [] };
    case "newWord":
      return { sentenceIds: [], words: [exercise.word.full], images: [exercise.word.image] };
    default:
      return { sentenceIds: [exercise.sentence.id], words: [], images: [] };
  }
}
