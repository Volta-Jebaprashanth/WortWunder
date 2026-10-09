import type { MotherTongue } from "@/lib/i18n";

// One vocabulary word. `full` matches the keys in word-audio.generated.ts so
// playWord() finds the right pronunciation clip. The meaning fields are keyed
// the same as MotherTongue so a word's meaning in the learner's chosen
// language can be read with `word[lang]`.
export interface VocabWord {
  id: string;
  image: string;
  full: string;
  english: string;
  tamil: string;
  sinhala: string;
  // The plural with its article ("die Vögel"), shown and spoken on the
  // Training level's intro screen. Left out for words without one.
  plural?: string;
  // A short German sentence using the word, plus its meaning, shown on the
  // Training level's intro screen (TrainingCard in pieces.tsx).
  example?: { german: string } & Record<MotherTongue, string>;
}

export function wordMeaning(word: VocabWord, lang: MotherTongue): string {
  return word[lang];
}
