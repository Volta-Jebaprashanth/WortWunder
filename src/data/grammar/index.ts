import type { VocabWord } from "@/data/vocabulary";
import { findVocabLesson } from "@/data/lessons";
import type { GrammarLesson, GrammarLessonTest, WordsTest } from "@/data/grammar/types";
import { GETTING_STARTED_LESSON } from "@/data/grammar/getting-started";
import { FIRST_SENTENCES_LESSON } from "@/data/grammar/first-sentences";

// Section 1 Grammatik on the path, in order. Test ids ("G1.2") are the keys
// progress is stored under, like the vocabulary test ids.
export const GRAMMAR_LESSONS: GrammarLesson[] = [GETTING_STARTED_LESSON, FIRST_SENTENCES_LESSON];

export function findGrammarTest(testId: string): GrammarLessonTest | undefined {
  for (const lesson of GRAMMAR_LESSONS) {
    const test = lesson.tests.find((t) => t.testId === testId);
    if (test) return test;
  }
  return undefined;
}

// A word test's words, looked up in the Wortschatz lessons they come from.
// Progress rows are keyed by word id, so one word test can't hold two words
// with the same id (the same id from two lessons).
export function resolveWords(test: WordsTest): VocabWord[] {
  const words = test.words.map(({ lessonId, wordId }) => {
    const word = findVocabLesson(lessonId)
      .tests.flatMap((t) => t.words)
      .find((w) => w.id === wordId);
    if (!word) throw new Error(`${test.testId}: no word ${wordId} in lesson ${lessonId}`);
    return word;
  });
  const all = [...words, ...(test.newWords ?? [])];
  const ids = new Set(all.map((w) => w.id));
  if (ids.size !== all.length) throw new Error(`${test.testId}: duplicate word ids`);
  return all;
}

export function grammarLessonPicture(lesson: GrammarLesson): string {
  return `/${lesson.assetDir}/icons/lesson.jpg`;
}

// test-1.jpg for the lesson's first test, test-2.jpg for the second, ...
export function grammarTestPicture(lesson: GrammarLesson, test: GrammarLessonTest): string {
  return `/${lesson.assetDir}/icons/test-${lesson.tests.indexOf(test) + 1}.jpg`;
}
