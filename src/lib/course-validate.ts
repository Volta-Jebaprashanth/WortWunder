import { MOTHER_TONGUES } from "@/lib/i18n";
import type { CourseUnit, Translations } from "@/data/course/types";
import { tokenize } from "@/lib/course-engine";

// Checks the course data for the mistakes that would otherwise only show up
// in front of a learner. Pure, so it is unit tested with deliberately broken
// data; scripts/validate-course.ts runs it over the real course in CI.
export interface ValidationContext {
  // Whether a "<lessonId>/<wordId>" vocabulary reference exists.
  hasWord: (ref: string) => boolean;
  // Sentence ids that have generated audio (course-audio.generated.ts).
  audioIds: ReadonlySet<string>;
}

function missingLanguages(text: Partial<Translations> | undefined): string[] {
  return MOTHER_TONGUES.map((m) => m.value).filter((lang) => !text?.[lang]?.trim());
}

export function validateCourse(units: CourseUnit[], ctx: ValidationContext): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  const claim = (id: string, what: string) => {
    if (!id.trim()) errors.push(`${what} has an empty id`);
    else if (seen.has(id)) errors.push(`duplicate id ${id}`);
    seen.add(id);
  };
  const needText = (text: Partial<Translations> | undefined, what: string) => {
    for (const lang of missingLanguages(text)) errors.push(`${what} is missing ${lang}`);
  };

  const sentenceIds = new Set(
    units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.sentences.map((s) => s.id))),
  );

  for (const unit of units) {
    claim(unit.id, "unit");
    if (!unit.title.trim()) errors.push(`${unit.id} has no title`);
    needText(unit.meaning, `${unit.id} meaning`);
    for (const lang of MOTHER_TONGUES.map((m) => m.value)) {
      const list = unit.canDo[lang];
      if (!list?.length || list.some((line) => !line.trim()))
        errors.push(`${unit.id} canDo is missing ${lang}`);
    }

    const noteIds = new Set(unit.notes.map((note) => note.id));
    for (const note of unit.notes) {
      claim(note.id, "grammar note");
      needText(note.title, `${note.id} title`);
      needText(note.body, `${note.id} body`);
      for (const id of note.examples)
        if (!sentenceIds.has(id))
          errors.push(`${note.id} example refers to unknown sentence ${id}`);
    }
    for (const id of unit.guidebook)
      if (!noteIds.has(id)) errors.push(`${unit.id} guidebook refers to unknown note ${id}`);
    for (const id of unit.checkpoint)
      if (!sentenceIds.has(id)) errors.push(`${unit.id} checkpoint refers to unknown id ${id}`);

    for (const dialogue of unit.dialogues) {
      claim(dialogue.id, "dialogue");
      needText(dialogue.title, `${dialogue.id} title`);
      for (const line of dialogue.lines)
        if (!sentenceIds.has(line.sentenceId))
          errors.push(`${dialogue.id} refers to unknown sentence ${line.sentenceId}`);
    }

    for (const lesson of unit.lessons) {
      claim(lesson.id, "lesson");
      if (!lesson.id.startsWith(`${unit.id}.`))
        errors.push(`lesson ${lesson.id} does not belong to ${unit.id}`);
      if (!lesson.title.trim()) errors.push(`${lesson.id} has no title`);
      needText(lesson.meaning, `${lesson.id} meaning`);
      for (const ref of lesson.newWords)
        if (!ctx.hasWord(ref)) errors.push(`${lesson.id} newWords refers to unknown word ${ref}`);

      const ownSentences = new Set(lesson.sentences.map((s) => s.id));
      const usedSentences = new Set<string>();
      for (const step of lesson.steps) {
        if (step.kind === "sentence") {
          if (!ownSentences.has(step.id))
            errors.push(`${lesson.id} step refers to unknown sentence ${step.id}`);
          usedSentences.add(step.id);
        } else if (step.kind === "word") {
          if (!ctx.hasWord(step.ref))
            errors.push(`${lesson.id} step refers to unknown word ${step.ref}`);
        } else if (!noteIds.has(step.noteId)) {
          errors.push(`${lesson.id} step refers to unknown note ${step.noteId}`);
        }
      }

      for (const sentence of lesson.sentences) {
        claim(sentence.id, "sentence");
        if (!sentence.id.startsWith(`${lesson.id}.`))
          errors.push(`sentence ${sentence.id} does not belong to ${lesson.id}`);
        if (!sentence.german.trim()) errors.push(`${sentence.id} has no German text`);
        needText(sentence, sentence.id);
        if (!usedSentences.has(sentence.id))
          errors.push(`${sentence.id} is not used by any step of ${lesson.id}`);
        if (sentence.gap) {
          const tokens = tokenize(sentence.german);
          if (!Number.isInteger(sentence.gap.token) || !(sentence.gap.token in tokens))
            errors.push(`${sentence.id} gap token ${sentence.gap.token} is out of range`);
          if (sentence.gap.options.length === 0)
            errors.push(`${sentence.id} gap has no wrong options`);
        }
        for (const ref of sentence.words ?? [])
          if (!ctx.hasWord(ref)) errors.push(`${sentence.id} refers to unknown word ${ref}`);
        if (!ctx.audioIds.has(sentence.id)) errors.push(`${sentence.id} has no audio`);
      }
    }
  }
  return errors;
}
