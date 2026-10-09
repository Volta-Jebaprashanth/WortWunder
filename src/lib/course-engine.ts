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
// German), in shuffled order and from easier to harder: put the words in
// order, build the sentence from a word bank, then type it. Between the two
// passes every sentence with a marked gap is asked as a grammar question. A
// sentence the learner already knows well skips the recognition pass.
export type Rng = () => number;

export type BankKind = "bankFromDe" | "bankToDe" | "listenBank" | "order";
export type TypeKind = "type" | "listenType";
export type QuestionKind = BankKind | TypeKind | "listenPick" | "gap";

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
// Tap word tiles in order. `answer` is in German for bankToDe, listenBank
// and order, and in the learner's mother tongue for bankFromDe. An `order`
// exercise has no decoy tiles: only the sentence's own words, shuffled.
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
// Fill the sentence's one gap from a few choices. `answer` is the missing
// word; `options` holds it among the wrong ones.
export interface GapExercise {
  kind: "gap";
  key: string;
  sentence: Sentence;
  answer: string;
  options: string[];
}
// Type the German sentence, from its meaning (type) or by ear (listenType).
export interface TypeExercise {
  kind: TypeKind;
  key: string;
  sentence: Sentence;
}
export type QuestionExercise = BankExercise | PickExercise | GapExercise | TypeExercise;
export type Exercise = TipExercise | NewWordExercise | QuestionExercise;

// Sentences at or above this strength (see course-store.ts) skip the
// recognition pass.
export const KNOWN_STRENGTH = 2;
const DISTRACTOR_TILES = 3;
const PICK_OPTIONS = 3;
// A sentence shorter than this has nothing to put in order.
const ORDER_MIN_WORDS = 3;
// A typed answer one character off still counts, unless the sentence is so
// short that one character is most of a word.
const ALMOST_MIN_LENGTH = 5;
// The unit checkpoint: how many questions it asks and the share of them
// needed to pass.
export const CHECKPOINT_SIZE = 12;
export const CHECKPOINT_PASS = 0.8;

export function shuffled<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

const EDGE_PUNCTUATION = /^[^\p{L}\p{M}\p{N}]+|[^\p{L}\p{M}\p{N}]+$/gu;

// Splits a sentence into the words shown on tiles: punctuation around a word
// is dropped ("Hallo," -> "Hallo"), punctuation inside it is kept ("geht's").
export function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map((token) => token.replace(EDGE_PUNCTUATION, ""))
    .filter((token) => token.length > 0);
}

// Cuts a sentence around one of its words (counted the way tokenize counts
// them), keeping the punctuation: ("Wie heißt du?", 1) gives "Wie ", "heißt"
// and " du?".
export function splitAtToken(
  text: string,
  token: number,
): { before: string; word: string; after: string } {
  const words = text.trim().split(/\s+/);
  let seen = -1;
  for (let i = 0; i < words.length; i++) {
    const raw = words[i]!;
    const word = raw.replace(EDGE_PUNCTUATION, "");
    if (!word || ++seen !== token) continue;
    const start = raw.indexOf(word);
    return {
      before: [...words.slice(0, i), raw.slice(0, start)].join(" "),
      word,
      after: [raw.slice(start + word.length), ...words.slice(i + 1)].join(" "),
    };
  }
  return { before: text, word: "", after: "" };
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

// The answer's own words in an order that is never the right one.
function scrambled(answer: readonly string[], rng: Rng): string[] {
  for (let attempt = 0; attempt < 5; attempt++) {
    const tiles = shuffled(answer, rng);
    if (!sameTokens(tiles, answer)) return tiles;
  }
  return [...answer.slice(1), answer[0]!];
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
  kind: Exclude<BankKind, "order">,
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

// A sentence too short to reorder is built from a word bank instead.
function orderExercise(
  sentence: Sentence,
  others: readonly Sentence[],
  lang: MotherTongue,
  rng: Rng,
): BankExercise {
  const answer = tokenize(sentence.german);
  if (answer.length < ORDER_MIN_WORDS || new Set(answer).size < 2)
    return bankExercise("bankToDe", sentence, others, lang, rng);
  return {
    kind: "order",
    key: `order:${sentence.id}`,
    sentence,
    answer,
    tiles: scrambled(answer, rng),
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

function gapExercise(sentence: Sentence, gap: NonNullable<Sentence["gap"]>, rng: Rng): GapExercise {
  const answer = tokenize(sentence.german)[gap.token] ?? "";
  return {
    kind: "gap",
    key: `gap:${sentence.id}`,
    sentence,
    answer,
    options: shuffled([answer, ...gap.options], rng),
  };
}

function typeExercise(kind: TypeKind, sentence: Sentence): TypeExercise {
  return { kind, key: `${kind}:${sentence.id}`, sentence };
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

  for (const sentence of ordered)
    if (sentence.gap) queue.push(gapExercise(sentence, sentence.gap, rng));

  const production = shuffled(ordered, rng);
  // Don't ask for the sentence the learner has just seen straight away.
  const last = queue[queue.length - 1];
  if (production.length > 1 && last && isQuestion(last) && production[0] === last.sentence)
    production.push(production.shift()!);
  // The first third is put in order, the last third typed, and the ones in
  // between built from a word bank.
  const third = Math.floor(production.length / 3);
  let banks = 0;
  let typed = 0;
  production.forEach((sentence, i) => {
    if (i < third) queue.push(orderExercise(sentence, othersOf(sentence), ctx.lang, rng));
    else if (i >= production.length - third)
      queue.push(typeExercise(typed++ % 2 === 0 ? "type" : "listenType", sentence));
    else
      queue.push(
        bankExercise(
          banks++ % 2 === 0 ? "bankToDe" : "listenBank",
          sentence,
          othersOf(sentence),
          ctx.lang,
          rng,
        ),
      );
  });
  return queue;
}

// The unit checkpoint: up to CHECKPOINT_SIZE of the unit's checkpoint
// sentences, each asked once, in a mix of every exercise type. Nothing is
// re-queued; the share answered right decides the pass (checkpointPassed).
export function buildCheckpointQueue(
  sentences: readonly Sentence[],
  ctx: { lang: MotherTongue; rng?: Rng },
): QuestionExercise[] {
  const rng = ctx.rng ?? Math.random;
  let typed = 0;
  return shuffled(sentences, rng)
    .slice(0, CHECKPOINT_SIZE)
    .map((sentence, i) => {
      const others = sentences.filter((s) => s.id !== sentence.id);
      switch (i % 6) {
        case 0:
          return pickExercise(sentence, others, ctx.lang, rng);
        case 2:
          return bankExercise("bankToDe", sentence, others, ctx.lang, rng);
        case 3:
          return typeExercise(typed++ % 2 === 0 ? "type" : "listenType", sentence);
        case 4:
          return bankExercise("listenBank", sentence, others, ctx.lang, rng);
        default:
          return sentence.gap
            ? gapExercise(sentence, sentence.gap, rng)
            : orderExercise(sentence, others, ctx.lang, rng);
      }
    });
}

export function checkpointPassed(right: number, total: number): boolean {
  return total > 0 && right / total >= CHECKPOINT_PASS;
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

export function checkGap(exercise: GapExercise, picked: string): boolean {
  return picked === exercise.answer;
}

// A typed answer with case, punctuation and extra spaces taken out.
export function normalizeTyped(text: string): string {
  return text
    .toLocaleLowerCase("de")
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

// "ss" for "ß" and "ae", "oe", "ue" for the umlauts are how German is typed
// on a keyboard without those letters.
function foldSpecialLetters(text: string): string {
  return text.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
}

function comparable(text: string): string {
  return foldSpecialLetters(normalizeTyped(text));
}

function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  let i = 0;
  while (i < short.length && short[i] === long[i]) i++;
  const rest = short.length === long.length ? i + 1 : i;
  return short.slice(rest) === long.slice(i + 1);
}

// How a typed sentence compares with the target:
//   exact    - right, apart from case, punctuation and spacing
//   spelling - right, but written with ss / ae / oe / ue: accepted, pointed out
//   almost   - one character off: accepted, with the word to look at again
//   wrong
// `target` is the accepted answer the typing came closest to, as authored.
export type TypedVerdict = "exact" | "spelling" | "almost" | "wrong";
export interface TypedResult {
  verdict: TypedVerdict;
  correct: boolean;
  target: string;
  diffToken?: number; // for "almost": the word of `target` that differs
}

export function checkTyped(sentence: Sentence, typed: string): TypedResult {
  const candidates = [sentence.german, ...(sentence.accept ?? [])];
  const mine = normalizeTyped(typed);
  const folded = foldSpecialLetters(mine);
  const wrong: TypedResult = { verdict: "wrong", correct: false, target: sentence.german };
  if (!mine) return wrong;

  for (const target of candidates)
    if (normalizeTyped(target) === mine) return { verdict: "exact", correct: true, target };
  for (const target of candidates)
    if (comparable(target) === folded) return { verdict: "spelling", correct: true, target };

  // One character can be the whole grammar point ("heißt" / "heiße"): the
  // sentence with one of its gap's wrong options in it is never a near miss.
  const gap = sentence.gap;
  if (gap) {
    const tokens = tokenize(sentence.german);
    for (const option of gap.options) {
      const trap = tokens.map((token, i) => (i === gap.token ? option : token));
      if (comparable(trap.join(" ")) === folded) return wrong;
    }
  }

  for (const target of candidates) {
    const theirs = comparable(target);
    if (theirs.length < ALMOST_MIN_LENGTH || !withinOneEdit(folded, theirs)) continue;
    const typedTokens = tokenize(typed).map(comparable);
    const diffToken = tokenize(target).findIndex(
      (token, i) => comparable(token) !== typedTokens[i],
    );
    return { verdict: "almost", correct: true, target, ...(diffToken >= 0 && { diffToken }) };
  }
  return wrong;
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
