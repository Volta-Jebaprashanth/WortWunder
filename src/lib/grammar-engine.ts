import { shuffle, type Tier } from "@/lib/quiz-engine";
import type { GrammarSentence, GrammarTest, RuleCard } from "@/data/grammar/types";

// Queue builder for a grammar test (see GrammarQuiz.tsx), the counterpart of
// quiz-engine.ts for vocabulary. Same five tiers and the same pending-rows
// progress model (progress-store.ts), but a row is keyed on a rule card, a
// sentence or the test's one pairs / sort board instead of on a word, and
// not every sentence gets every type: only sentences with a gap get
// gapPick / gapType. The rule card and its check question are one row, the
// way a vocabulary training row is the intro card plus its first question.
// "listenBuild" shares its name with a vocabulary type (quiz-engine.ts); both
// are hard-tier, so progress-store.ts's tier lookup gives the same answer.
export type GrammarType =
  | "rule"
  | "gapPick"
  | "sentenceMeaning"
  | "listenPick"
  | "pairs"
  | "sort"
  | "order"
  | "spot"
  | "transform"
  | "meaningBuild"
  | "gapType"
  | "listenBuild"
  | "reply";

export const GRAMMAR_TIERS: Record<Tier, GrammarType[]> = {
  training: ["rule"],
  basic: ["gapPick", "sentenceMeaning"],
  easy: ["listenPick", "pairs", "sort"],
  medium: ["order", "spot", "transform"],
  hard: ["meaningBuild", "gapType", "listenBuild", "reply"],
};

const TIER_BY_GRAMMAR_TYPE = Object.fromEntries(
  (Object.keys(GRAMMAR_TIERS) as Tier[]).flatMap((tier) =>
    GRAMMAR_TIERS[tier].map((type) => [type, tier] as const),
  ),
) as Record<GrammarType, Tier>;

export function tierOfGrammarType(type: string): Tier | undefined {
  return (TIER_BY_GRAMMAR_TYPE as Record<string, Tier | undefined>)[type];
}

// The row id of the test's single pairs / sort board.
export const BOARD_ID = "board";

export interface GrammarRow {
  testType: GrammarType;
  id: string;
}

export function hasGap(sentence: GrammarSentence): boolean {
  return sentence.focus !== undefined;
}

// Every row the test should have, for ensureRowsEntered.
export function rowsForTest(test: GrammarTest): GrammarRow[] {
  const rows: GrammarRow[] = [];
  for (const testType of test.testTypes) {
    switch (testType) {
      case "rule":
        for (const rule of test.rules) rows.push({ testType, id: rule.id });
        break;
      case "gapPick":
        for (const s of test.sentences)
          if (hasGap(s) && s.distractors?.length) rows.push({ testType, id: s.id });
        break;
      case "gapType":
        for (const s of test.sentences) if (hasGap(s)) rows.push({ testType, id: s.id });
        break;
      case "sentenceMeaning":
      case "listenPick":
        for (const s of test.sentences) rows.push({ testType, id: s.id });
        break;
      case "order":
      case "meaningBuild":
      case "listenBuild":
        for (const s of test.sentences)
          if (tokensOf(s).length > 1) rows.push({ testType, id: s.id });
        break;
      case "spot":
        // Swapping in a wrong word only works when the gap is a whole word.
        for (const s of test.sentences)
          if (hasGap(s) && !s.focusPart && s.distractors?.length) rows.push({ testType, id: s.id });
        break;
      case "transform": {
        const ids = new Set(test.sentences.map((s) => s.id));
        for (const s of test.sentences)
          if (s.transformTo && ids.has(s.transformTo.id)) rows.push({ testType, id: s.id });
        break;
      }
      case "reply":
        for (const s of test.sentences) if (s.replyTo) rows.push({ testType, id: s.id });
        break;
      case "pairs":
        if (test.pairs?.length) rows.push({ testType, id: BOARD_ID });
        break;
      case "sort":
        if (test.sort?.items.length) rows.push({ testType, id: BOARD_ID });
        break;
    }
  }
  return rows;
}

export function tokensOf(sentence: Pick<GrammarSentence, "german">): string[] {
  return sentence.german.split(" ");
}

// A token without the punctuation attached to it ("lernt." -> "lernt").
export function bareToken(token: string): string {
  return token.replace(/[.,!?;:]+$/, "");
}

// What fills the gap: the focus letters, or the whole focus word.
export function gapAnswer(sentence: GrammarSentence): string {
  if (sentence.focusPart) return sentence.focusPart;
  return bareToken(tokensOf(sentence)[sentence.focus ?? 0] ?? "");
}

// Typed answers ignore case and surrounding spaces. Capitals are part of
// what's checked only where a test is about them, and no test is yet.
export function sameAnswer(typed: string, answer: string): boolean {
  return typed.trim().toLowerCase() === answer.trim().toLowerCase();
}

// The words of a sentence without punctuation ("Hallo," -> "Hallo").
export function wordsOf(sentence: Pick<GrammarSentence, "german">): string[] {
  return tokensOf(sentence).map(bareToken);
}

type TileSource = Pick<GrammarSentence, "german" | "formal" | "nounFirst">;

// Whether `word`, starting one order of the sentence, keeps its capital
// anywhere: a noun or a name (marked with nounFirst, or written with a
// capital later in the sentence's own order), or polite "Sie".
function keepsCapital(word: string, sentence: TileSource): boolean {
  const own = wordsOf(sentence);
  if (word === own[0]) return !!sentence.nounFirst || (!!sentence.formal && word === "Sie");
  return own.slice(1).includes(word);
}

// The words of a sentence (or of one of its `alternatives`) as word tiles:
// the first word in lower case unless it keeps its capital anywhere, so the
// one capital on the tiles doesn't give away which word comes first.
// WordBuilder capitalises whichever tile is placed first.
export function tileWords(sentence: TileSource, german = sentence.german): string[] {
  const words = wordsOf({ german });
  const first = words[0];
  if (first && !keepsCapital(first, sentence)) words[0] = first.toLowerCase();
  return words;
}

// Every word order a built sentence may have, as tile words joined by
// spaces: the sentence's own, plus its `alternatives` where the question
// allows them (see GrammarSentence).
export function acceptedOrders(sentence: GrammarSentence, withAlternatives: boolean): string[] {
  const orders = [tileWords(sentence).join(" ")];
  if (withAlternatives)
    for (const german of sentence.alternatives ?? [])
      orders.push(tileWords(sentence, german).join(" "));
  return orders;
}

// True when `built` has exactly the words of one accepted order, just not in
// that order: the learner got the forms right and the word order wrong.
export function sameWordsOtherOrder(built: string[], sentence: GrammarSentence): boolean {
  const sorted = (words: string[]) => [...words].sort().join(" ");
  return sorted(built) === sorted(tileWords(sentence));
}

// The mark that ends the sentence ("." or "?"), shown after the tiles.
export function endMark(sentence: GrammarSentence): string {
  return /[.?!]$/.exec(sentence.german)?.[0] ?? "";
}

// Shuffled tiles, never in the answer's own order.
function scrambled(tiles: string[], answer: string[]): string[] {
  let out = shuffle(tiles);
  for (let i = 0; i < 5 && out.join(" ") === answer.join(" "); i++) out = shuffle(tiles);
  return out;
}

// Up to `count` wrong words for the tile pool, not already in it.
function decoyWords(sentence: GrammarSentence, words: string[], count: number): string[] {
  return shuffle((sentence.distractors ?? []).filter((d) => !words.includes(d))).slice(0, count);
}

export type SentenceKind =
  | "gapPick"
  | "gapType"
  | "sentenceMeaning"
  | "listenPick"
  | "order"
  | "spot"
  | "transform"
  | "meaningBuild"
  | "listenBuild"
  | "reply";

export type GrammarItem =
  | { kind: "rule"; tier: Tier; rule: RuleCard; checkOptions: string[] }
  | {
      kind: SentenceKind;
      tier: Tier;
      sentence: GrammarSentence;
      // gapPick: the fillers to choose from. gapType: the letter keys.
      // sentenceMeaning / listenPick: ids of the sentences offered, this one
      // included. order / meaningBuild / listenBuild / transform: the word
      // tiles. spot: the wrong word swapped in for the focus, or empty when
      // the sentence is shown as it is. reply: the replies offered.
      options: string[];
    }
  | { kind: "pairs" | "sort"; tier: Tier };

// A meaning as plain English: English has no separate polite or plural
// "you", so "What is your name? (polite)" and "You all have time." are also
// right as "What is your name?" and "You have time.".
function plainEnglish(meaning: GrammarSentence["meaning"]): string {
  return meaning.english
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/\ball\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Up to `count` other sentences as wrong options, from the same rule card
// first so the choice turns on the thing being taught (ei vs ie, er vs sie).
// For a meaning question, a sentence whose meaning would also be a right
// answer (see plainEnglish) is never offered.
function otherSentenceIds(
  test: GrammarTest,
  sentence: GrammarSentence,
  count: number,
  byMeaning = false,
): string[] {
  const others = test.sentences.filter(
    (s) =>
      s.id !== sentence.id &&
      s.german !== sentence.german &&
      !(byMeaning && plainEnglish(s.meaning) === plainEnglish(sentence.meaning)),
  );
  const sameRule = shuffle(others.filter((s) => s.rule && s.rule === sentence.rule));
  const rest = shuffle(others.filter((s) => !s.rule || s.rule !== sentence.rule));
  return [...sameRule, ...rest].slice(0, count).map((s) => s.id);
}

// The letter keys offered for typing the gap: every letter of the answer,
// plus decoys taken first from the sentence's wrong fillers (so "a" sits
// next to "ä", "e" next to "ie") and then from common letters, shuffled.
// Keys keep the case of the letters they come from, so a capital ("St" in
// "Stuhl", "Ich" at the start) can be typed with them. Answers are still
// checked without case; GrammarQuiz notes a missed capital.
const GAP_KEY_COUNT = 8;
const COMMON_LETTERS = ["e", "n", "a", "r", "t", "s", "i", "l", "h", "u", "o", "m"];

function lettersOf(text: string): string[] {
  return [...text].filter((ch) => /\p{L}/u.test(ch));
}

export function gapKeys(sentence: GrammarSentence): string[] {
  const keys = new Set(lettersOf(gapAnswer(sentence)));
  const decoys = [
    ...shuffle((sentence.distractors ?? []).flatMap(lettersOf)),
    ...shuffle(COMMON_LETTERS),
  ];
  // At least two decoys even when the answer alone fills the keyboard.
  const target = Math.max(GAP_KEY_COUNT, keys.size + 2);
  for (const letter of decoys) {
    if (keys.size >= target) break;
    keys.add(letter);
  }
  return shuffle([...keys]);
}

// `rows` are pending rows from progress-store.ts, whose `wordId` is the
// row's id here (a rule card, a sentence or BOARD_ID).
export function buildGrammarRound(
  rows: { testType: string; wordId: string }[],
  test: GrammarTest,
): GrammarItem[] {
  const rules = Object.fromEntries(test.rules.map((r) => [r.id, r]));
  const sentences = Object.fromEntries(test.sentences.map((s) => [s.id, s]));
  const items: GrammarItem[] = [];
  const ruleItems: Extract<GrammarItem, { kind: "rule" }>[] = [];
  for (const row of rows) {
    // Skips rows left over from content that has since changed, like
    // buildRoundFromRows does for vocabulary.
    const tier = tierOfGrammarType(row.testType);
    if (!tier) continue;
    const type = row.testType as GrammarType;
    if (type === "rule") {
      const rule = rules[row.wordId];
      if (rule)
        ruleItems.push({ kind: "rule", tier, rule, checkOptions: shuffle(rule.check.options) });
      continue;
    }
    if (type === "pairs" || type === "sort") {
      items.push({ kind: type, tier });
      continue;
    }
    const sentence = sentences[row.wordId];
    if (!sentence) continue;
    const options = sentenceOptions(type, sentence, test, sentences);
    if (options) items.push({ kind: type, tier, sentence, options });
  }
  // Rule cards build on each other ("haben breaks the pattern" before "wir
  // haben follows it"), so they come in the order the test lists them.
  const ruleOrder = test.rules.map((r) => r.id);
  ruleItems.sort((a, b) => ruleOrder.indexOf(a.rule.id) - ruleOrder.indexOf(b.rule.id));
  return [...ruleItems, ...shuffle(items)];
}

// The question-specific options of a sentence item (see GrammarItem), or
// undefined when the sentence can't make that question.
function sentenceOptions(
  type: SentenceKind,
  sentence: GrammarSentence,
  test: GrammarTest,
  sentences: Record<string, GrammarSentence>,
): string[] | undefined {
  const words = tileWords(sentence);
  switch (type) {
    case "gapPick":
      return shuffle([gapAnswer(sentence), ...(sentence.distractors ?? []).slice(0, 3)]);
    case "gapType":
      return gapKeys(sentence);
    case "sentenceMeaning":
      return shuffle([sentence.id, ...otherSentenceIds(test, sentence, 3, true)]);
    case "listenPick":
      return shuffle([sentence.id, ...otherSentenceIds(test, sentence, 3)]);
    case "order":
    case "listenBuild":
      return scrambled(words, words);
    case "meaningBuild":
      return scrambled([...words, ...decoyWords(sentence, words, 2)], words);
    case "transform": {
      const target = sentence.transformTo && sentences[sentence.transformTo.id];
      if (!target) return undefined;
      // The words that have to change stay in the pool, so they're changed on
      // purpose rather than by elimination.
      const targetWords = tileWords(target);
      const decoys = [...new Set(words.filter((w) => !targetWords.includes(w)))];
      return scrambled([...targetWords, ...decoys], targetWords);
    }
    case "spot": {
      // Two times in three a wrong word is swapped in; otherwise the sentence
      // is right and the answer is "no mistake".
      const wrong = shuffle(sentence.distractors ?? [])[0];
      return wrong && Math.random() < 2 / 3 ? [wrong] : [];
    }
    case "reply":
      return sentence.replyTo ? shuffle([sentence.german, ...sentence.replyTo.decoys]) : undefined;
  }
}

// The sentence a spot question shows: the focus word swapped for `wrong`.
export function spotTokens(sentence: GrammarSentence, wrong: string | undefined): string[] {
  const tokens = tokensOf(sentence);
  if (!wrong || sentence.focus === undefined) return tokens;
  return tokens.map((token, i) =>
    i === sentence.focus ? wrong + token.slice(bareToken(token).length) : token,
  );
}

// The sentence a question's answer is: the transform target for transform,
// the sentence itself otherwise.
export function answerSentence(
  item: Extract<GrammarItem, { sentence: GrammarSentence }>,
  test: GrammarTest,
): GrammarSentence {
  if (item.kind !== "transform" || !item.sentence.transformTo) return item.sentence;
  return test.sentences.find((s) => s.id === item.sentence.transformTo!.id) ?? item.sentence;
}

// The German clips an item plays, for setAudioWindow.
export function grammarItemAudio(item: GrammarItem, test: GrammarTest): string[] {
  const byId = Object.fromEntries(test.sentences.map((s) => [s.id, s]));
  switch (item.kind) {
    case "rule":
      return [
        ...item.rule.examples.map((e) => byId[e.id]?.german ?? ""),
        ...item.rule.check.options,
      ].filter(Boolean);
    case "pairs":
      return (test.pairs ?? []).map((p) => p.left);
    case "sort":
      return (test.sort?.items ?? []).map((i) => i.text);
    case "listenPick":
      return item.options.map((id) => byId[id]?.german ?? "").filter(Boolean);
    case "transform":
      return [item.sentence.german, answerSentence(item, test).german, ...item.options];
    case "reply":
      return [item.sentence.replyTo?.german ?? "", ...item.options].filter(Boolean);
    case "order":
    case "meaningBuild":
    case "listenBuild":
      return [item.sentence.german, ...item.options];
    default:
      return [item.sentence.german];
  }
}
