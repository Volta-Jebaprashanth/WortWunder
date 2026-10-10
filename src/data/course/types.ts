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
  say?: string; // what the voice is given to read, where `german` would be misread (letter names)
  grammar?: string[]; // tags such as "verb-second", "akkusativ"
  words?: string[]; // vocabulary used, as "<lessonId>/<wordId>"
}

// One question about a dialogue or a text, in the two formats the exam
// uses: pick one of a few answers, or judge a statement richtig or falsch.
// Asked in the learner's mother tongue.
export type ComprehensionQuestion =
  | { format: "choice"; prompt: Translations; options: Translations[]; correct: number }
  | { format: "richtigFalsch"; statement: Translations; correct: boolean };

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

// A short text to read, then one question: a sign on a door, a text
// message or a handwritten note. `german` may have several lines.
export interface ReadingText {
  id: string; // "u01.r01"
  layout: "sign" | "message" | "note";
  german: string;
  question: ComprehensionQuestion;
}

// A speaking task: the learner hears a question (or just reads the cue) and
// answers aloud. `models` are answers that fit; the first is shown as the
// model answer.
export interface SpeakTask {
  id: string; // "u01.q01"
  cue: Translations; // what to do, e.g. "Say your name."
  question?: string; // sentence id, played first
  models: string[]; // sentence ids
}

// One authored step of a lesson, in teaching order. The engine turns each
// sentence into one or more exercises (see src/lib/course-engine.ts).
export type LessonStep =
  | { kind: "tip"; noteId: string }
  | { kind: "word"; ref: string } // "<lessonId>/<wordId>"
  | { kind: "sentence"; id: string }
  | { kind: "dialogue"; id: string } // played line by line; the learner picks speaker b's replies
  | { kind: "listen"; id: string } // a dialogue heard without text, then its question
  | { kind: "read"; id: string } // a ReadingText and its question
  | { kind: "speakQ"; id: string }; // a SpeakTask

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
  readings: ReadingText[];
  speakTasks: SpeakTask[];
  lessons: CourseLesson[];
  checkpoint: string[]; // sentence and task ids drawn on for the unit test
}
