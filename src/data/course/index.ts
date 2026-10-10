import type { MotherTongue } from "@/lib/i18n";
import type { VocabWord } from "@/data/vocabulary";
import { VOCAB_LESSONS } from "@/data/lessons";
import type { CourseLesson, CourseUnit, GrammarNote, Sentence } from "@/data/course/types";
import { UNIT_01 } from "@/data/course/u01";

export type * from "@/data/course/types";

// The A1 course ("Von Null auf A1", see ROADMAP.md). A working name, kept
// here so it is cheap to change.
export const COURSE_TITLE = "Von Null auf A1";

export const COURSE_MEANING: Record<MotherTongue, string> = {
  english: "From zero to A1",
  tamil: "பூஜ்ஜியத்திலிருந்து A1 வரை",
  sinhala: "බිංදුවේ සිට A1 දක්වා",
};

// One file per unit, listed here in course order.
export const COURSE_UNITS: CourseUnit[] = [UNIT_01];

export function findUnit(unitId: string): CourseUnit | undefined {
  return COURSE_UNITS.find((unit) => unit.id === unitId);
}

export function findLesson(unitId: string, lessonId: string): CourseLesson | undefined {
  return findUnit(unitId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function allSentences(units: CourseUnit[] = COURSE_UNITS): Sentence[] {
  return units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.sentences));
}

const SENTENCES_BY_ID = new Map(allSentences().map((sentence) => [sentence.id, sentence]));
const LESSON_BY_SENTENCE = new Map(
  COURSE_UNITS.flatMap((unit) =>
    unit.lessons.flatMap((lesson) => lesson.sentences.map((s) => [s.id, lesson] as const)),
  ),
);

export function findSentence(sentenceId: string): Sentence | undefined {
  return SENTENCES_BY_ID.get(sentenceId);
}

// The lesson a sentence is taught in.
export function lessonOfSentence(sentenceId: string): CourseLesson | undefined {
  return LESSON_BY_SENTENCE.get(sentenceId);
}

// The guidebook note that explains a grammar tag, for naming the tag to the
// learner.
export function noteForTag(tag: string): GrammarNote | undefined {
  for (const unit of COURSE_UNITS) {
    const note = unit.notes.find((n) => n.tag === tag);
    if (note) return note;
  }
  return undefined;
}

// The sentences a unit's checkpoint draws on, in the order the unit lists them.
export function checkpointSentences(unit: CourseUnit): Sentence[] {
  const byId = new Map(allSentences([unit]).map((sentence) => [sentence.id, sentence]));
  return unit.checkpoint
    .map((id) => byId.get(id))
    .filter((sentence): sentence is Sentence => sentence !== undefined);
}

// Vocabulary is referenced as "<lessonId>/<wordId>" ("1.1/hallo") because
// word ids repeat across vocabulary lessons.
const WORDS_BY_REF = new Map<string, VocabWord>(
  VOCAB_LESSONS.flatMap((lesson) =>
    lesson.tests.flatMap((test) =>
      test.words.map((word) => [`${lesson.id}/${word.id}`, word] as const),
    ),
  ),
);

export function resolveWord(ref: string): VocabWord | undefined {
  return WORDS_BY_REF.get(ref);
}

// Every id that saved course progress may refer to, for
// course-store.ts's reconcileCourse.
export function courseIds(units: CourseUnit[] = COURSE_UNITS) {
  return {
    unitIds: units.map((unit) => unit.id),
    lessonIds: units.flatMap((unit) => unit.lessons.map((lesson) => lesson.id)),
    sentenceIds: allSentences(units).map((sentence) => sentence.id),
    grammarTags: units.flatMap((unit) => unit.notes.map((note) => note.tag)),
  };
}
