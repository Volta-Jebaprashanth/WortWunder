import type { MotherTongue } from "@/lib/i18n";

// The course data model (ROADMAP.md section 8). Ids are stable forever:
// progress and audio files are stored under them, so an id is never
// renumbered or reused. To retire a sentence, delete it and leave the gap.

export type Translations = Record<MotherTongue, string>;

export interface Sentence {
  id: string; // "u01.l02.s03"
  german: string;
  english: string;
  tamil: string;
  sinhala: string;
  accept?: string[]; // other correct German answers for typing
  gap?: { token: number; options: string[] }; // for the `gap` exercise
  voice?: "f" | "m"; // which voice reads it; default "f"
  grammar?: string[]; // tags such as "verb-second", "akkusativ"
  words?: string[]; // vocabulary used, as "<lessonId>/<wordId>"
}

export interface ComprehensionQuestion {
  prompt: Translations;
  options: Translations[];
  correct: number; // index into options
}

export interface DialogueLine {
  speaker: "a" | "b";
  sentenceId: string;
}

export interface Dialogue {
  id: string; // "u01.d01"
  title: Translations;
  lines: DialogueLine[];
  question?: ComprehensionQuestion; // makes it usable as `hearQ`
}

export interface GrammarNote {
  id: string; // "u02.g01"
  tag: string; // matches Sentence.grammar tags
  title: Translations;
  body: Translations; // short; a table or 3–4 examples
  examples: string[]; // sentence ids
}

// One authored step of a lesson, in teaching order. The engine turns each
// sentence into one or more exercises (see src/lib/course-engine.ts).
export type LessonStep =
  | { kind: "tip"; noteId: string }
  | { kind: "word"; ref: string } // "<lessonId>/<wordId>"
  | { kind: "sentence"; id: string };

export interface CourseLesson {
  id: string; // "u01.l02"
  title: string; // German
  meaning: Translations;
  newWords: string[]; // "<lessonId>/<wordId>"
  sentences: Sentence[];
  steps: LessonStep[];
}

export interface CourseUnit {
  id: string; // "u01"
  title: string;
  icon: string; // emoji shown on the path
  meaning: Translations;
  canDo: Record<MotherTongue, string[]>; // shown on the unit card
  notes: GrammarNote[];
  guidebook: string[]; // grammar note ids, in reading order
  dialogues: Dialogue[];
  lessons: CourseLesson[];
  checkpoint: string[]; // sentence and task ids drawn on for the unit test
}
