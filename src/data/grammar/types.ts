import type { MotherTongue } from "@/lib/i18n";
import type { GrammarType } from "@/lib/grammar-engine";
import type { TestType } from "@/lib/quiz-engine";
import type { VocabWord } from "@/data/vocabulary";

// The grammar section (1 Grammatik on the path). A lesson holds word tests,
// played by VocabQuiz like any Wortschatz test, and hand-written grammar
// tests, played by GrammarQuiz. See ROADMAP.md for the plan and
// GRAMMAR-EXAMPLE.md for one test drawn out screen by screen.

export type Localized = Record<MotherTongue, string>;

// One sentence (or, in the sound tests, one word). Every question type a
// test uses is generated from these, so writing a test means writing
// sentences, not questions.
export interface GrammarSentence {
  id: string;
  // Space-separated tokens; punctuation stays attached to its token.
  german: string;
  meaning: Localized;
  // The rule card this sentence belongs to. Wrong options for
  // sentenceMeaning / listenPick are picked from the same rule first.
  rule?: string;
  // Index of the token this test is about ("bin" in "Ich bin Anna."). A
  // sentence without one gets no gapPick / gapType question.
  focus?: number;
  // The part of the focus token that is the gap, when it's letters rather
  // than the whole word ("ä" in "Mädchen").
  focusPart?: string;
  // Wrong fillers for the gap: gapPick options. Needed for gapPick.
  distractors?: string[];
  // One line shown after a wrong answer. Falls back to the rule's text.
  why?: Localized;
}

export interface RuleCard {
  id: string;
  title: Localized;
  text: Localized;
  // Sentences of this test shown as the examples (at most three).
  // `highlight` is the token to colour; the sentence's focus by default.
  examples: { id: string; highlight?: number }[];
  // Optional small table, e.g. pronoun -> verb form, or letter -> sound.
  table?: { left: string; right: string | Localized }[];
  // The one easy question asked straight after the card.
  check: { prompt: Localized; options: string[]; answer: string };
}

export interface GrammarTest {
  kind: "grammar";
  testId: string; // "G1.2"
  title: string; // "ä, ö, ü, ß"
  meaning: Localized;
  rules: RuleCard[];
  sentences: GrammarSentence[];
  testTypes: GrammarType[];
  // For `pairs`: one board for the whole test. The left side is German and
  // is spoken when tapped.
  pairs?: { left: string; right: string | Localized }[];
  // For `sort`: one board for the whole test.
  sort?: {
    groups: { id: string; label: string; meaning: Localized }[];
    items: { text: string; group: string }[];
  };
}

// A word test inside a grammar lesson, played by VocabQuiz. Word ids repeat
// across Wortschatz lessons ("krank" is in 1.13 and 1.19), so a reference
// names the lesson too. Words that exist in no Wortschatz lesson are listed
// in full under `newWords`.
export interface WordsTest {
  kind: "words";
  testId: string; // "G1.1"
  title: string; // "Wörter", "Wörter 1"
  meaning: Localized;
  words: { lessonId: string; wordId: string }[];
  newWords?: VocabWord[];
  testTypes?: TestType[];
}

export type GrammarLessonTest = WordsTest | GrammarTest;

export interface GrammarLesson {
  id: string; // "G1"
  title: string;
  icon: string;
  // The lesson's public/ asset folder, e.g. "G1 getting started": sentence
  // audio under audio/, path pictures under icons/ (lesson.jpg and
  // test-<n>.jpg, n counting from 1 in test order).
  assetDir: string;
  meaning: Localized;
  // Wortschatz lesson ids whose words this lesson borrows.
  borrowsFrom: string[];
  tests: GrammarLessonTest[];
}
