import { shuffle, type Tier } from "@/lib/quiz-engine";
import type { GrammarSentence, GrammarTest, RuleCard } from "@/data/grammar/types";

// Queue builder for a grammar test (see GrammarQuiz.tsx), the counterpart of
// quiz-engine.ts for vocabulary. Same five tiers and the same pending-rows
// progress model (progress-store.ts), but a row is keyed on a rule card, a
// sentence or the test's one pairs / sort board instead of on a word, and
// not every sentence gets every type: only sentences with a gap get
// gapPick / gapType. The rule card and its check question are one row, the
// way a vocabulary training row is the intro card plus its first question.
export type GrammarType =
  "rule" | "gapPick" | "sentenceMeaning" | "listenPick" | "pairs" | "sort" | "gapType";

export const GRAMMAR_TIERS: Record<Tier, GrammarType[]> = {
  training: ["rule"],
  basic: ["gapPick", "sentenceMeaning"],
  easy: ["listenPick", "pairs", "sort"],
  medium: [],
  hard: ["gapType"],
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

export function tokensOf(sentence: GrammarSentence): string[] {
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

export type SentenceKind = "gapPick" | "gapType" | "sentenceMeaning" | "listenPick";

export type GrammarItem =
  | { kind: "rule"; tier: Tier; rule: RuleCard; checkOptions: string[] }
  | {
      kind: SentenceKind;
      tier: Tier;
      sentence: GrammarSentence;
      // gapPick: the fillers to choose from. sentenceMeaning / listenPick:
      // ids of the sentences offered, this one included.
      options: string[];
    }
  | { kind: "pairs" | "sort"; tier: Tier };

// Up to `count` other sentences as wrong options, from the same rule card
// first so the choice turns on the thing being taught (ei vs ie, er vs sie).
function otherSentenceIds(test: GrammarTest, sentence: GrammarSentence, count: number): string[] {
  const others = test.sentences.filter((s) => s.id !== sentence.id && s.german !== sentence.german);
  const sameRule = shuffle(others.filter((s) => s.rule && s.rule === sentence.rule));
  const rest = shuffle(others.filter((s) => !s.rule || s.rule !== sentence.rule));
  return [...sameRule, ...rest].slice(0, count).map((s) => s.id);
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
  for (const row of rows) {
    // Skips rows left over from content that has since changed, like
    // buildRoundFromRows does for vocabulary.
    const tier = tierOfGrammarType(row.testType);
    if (!tier) continue;
    const type = row.testType as GrammarType;
    if (type === "rule") {
      const rule = rules[row.wordId];
      if (rule) items.push({ kind: "rule", tier, rule, checkOptions: shuffle(rule.check.options) });
      continue;
    }
    if (type === "pairs" || type === "sort") {
      items.push({ kind: type, tier });
      continue;
    }
    const sentence = sentences[row.wordId];
    if (!sentence) continue;
    const options =
      type === "gapPick"
        ? shuffle([gapAnswer(sentence), ...(sentence.distractors ?? []).slice(0, 3)])
        : type === "gapType"
          ? []
          : shuffle([sentence.id, ...otherSentenceIds(test, sentence, 3)]);
    items.push({ kind: type, tier, sentence, options });
  }
  return shuffle(items);
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
    default:
      return [item.sentence.german];
  }
}
