import type { VocabWord } from "@/data/vocabulary";
import { findVocabLesson } from "@/data/lessons";
import type { GrammarLesson, GrammarLessonTest, WordsTest } from "@/data/grammar/types";
import { GETTING_STARTED_LESSON } from "@/data/grammar/getting-started";
import { FIRST_SENTENCES_LESSON } from "@/data/grammar/first-sentences";
import { PRESENT_VERBS_LESSON } from "@/data/grammar/present-verbs";
import { QUESTIONS_GRAMMAR_LESSON } from "@/data/grammar/questions";
import { NOUNS_ARTICLES_LESSON } from "@/data/grammar/nouns-articles";
import { ACCUSATIVE_LESSON } from "@/data/grammar/accusative";

// Section 1 Grammatik on the path, in order. Test ids ("G1.2") are the keys
// progress is stored under, like the vocabulary test ids.
export const GRAMMAR_LESSONS: GrammarLesson[] = [
  GETTING_STARTED_LESSON,
  FIRST_SENTENCES_LESSON,
  PRESENT_VERBS_LESSON,
  QUESTIONS_GRAMMAR_LESSON,
  NOUNS_ARTICLES_LESSON,
  ACCUSATIVE_LESSON,
];

// The grammar lessons not built yet (docs/planning/ROADMAP.md, section 3).
// The path lists them after GRAMMAR_LESSONS as "coming soon" nodes with no
// tests; tapping one says which lessons are ready. Move a lesson from here
// into GRAMMAR_LESSONS once it's built. The Tamil and Sinhala strings are
// drafts and need a native speaker's review.
export type UpcomingGrammarLesson = Pick<GrammarLesson, "id" | "title" | "icon" | "meaning">;

export const UPCOMING_GRAMMAR_LESSONS: UpcomingGrammarLesson[] = [
  {
    id: "G7",
    title: "Possessivartikel",
    icon: "👜",
    meaning: {
      english: "My, your, his, her",
      tamil: "என், உன், அவனுடைய, அவளுடைய",
      sinhala: "මගේ, ඔබේ, ඔහුගේ, ඇයගේ",
    },
  },
  {
    id: "G8",
    title: "Besondere Verben",
    icon: "🔄",
    meaning: {
      english: "Verbs that change",
      tamil: "மாறும் வினைச்சொற்கள்",
      sinhala: "වෙනස් වන ක්‍රියා පද",
    },
  },
  {
    id: "G9",
    title: "Modalverben",
    icon: "💪",
    meaning: {
      english: "Can, must, want, may",
      tamil: "முடியும், வேண்டும், விரும்பு, அனுமதி",
      sinhala: "පුළුවන්, ඕනෑ, කැමති, අවසර",
    },
  },
  {
    id: "G10",
    title: "Zeit & Ort",
    icon: "🕒",
    meaning: {
      english: "Time and place",
      tamil: "நேரமும் இடமும்",
      sinhala: "කාලය සහ ස්ථානය",
    },
  },
  {
    id: "G11",
    title: "Imperativ",
    icon: "📣",
    meaning: {
      english: "Asking and telling",
      tamil: "கட்டளைகளும் வேண்டுகோள்களும்",
      sinhala: "අණ සහ ඉල්ලීම්",
    },
  },
  {
    id: "G12",
    title: "Vergangenheit",
    icon: "⏳",
    meaning: {
      english: "Talking about the past",
      tamil: "கடந்த காலத்தைப் பற்றிப் பேசுதல்",
      sinhala: "අතීතය ගැන කතා කිරීම",
    },
  },
  {
    id: "G13",
    title: "Sätze verbinden",
    icon: "🔗",
    meaning: {
      english: "Joining ideas",
      tamil: "வாக்கியங்களை இணைத்தல்",
      sinhala: "වාක්‍ය සම්බන්ධ කිරීම",
    },
  },
];

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
