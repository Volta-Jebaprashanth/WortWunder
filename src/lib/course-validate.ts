import { MOTHER_TONGUES } from "@/lib/i18n";
import type { ComprehensionQuestion, CourseUnit, Translations } from "@/data/course/types";
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

  const needQuestion = (question: ComprehensionQuestion, what: string) => {
    if (question.format === "richtigFalsch") {
      needText(question.statement, `${what} statement`);
      return;
    }
    needText(question.prompt, `${what} prompt`);
    if (question.options.length < 2) errors.push(`${what} needs at least two options`);
    question.options.forEach((option, i) => needText(option, `${what} option ${i + 1}`));
    if (!Number.isInteger(question.correct) || !(question.correct in question.options))
      errors.push(`${what} correct answer ${question.correct} is out of range`);
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
    // The checkpoint tests this unit, so it draws on this unit's sentences only.
    const ownIds = new Set(unit.lessons.flatMap((lesson) => lesson.sentences.map((s) => s.id)));
    for (const id of unit.checkpoint)
      if (!ownIds.has(id)) errors.push(`${unit.id} checkpoint refers to unknown id ${id}`);

    for (const dialogue of unit.dialogues) {
      claim(dialogue.id, "dialogue");
      needText(dialogue.title, `${dialogue.id} title`);
      if (dialogue.lines.length === 0) errors.push(`${dialogue.id} has no lines`);
      for (const line of dialogue.lines)
        if (!sentenceIds.has(line.sentenceId))
          errors.push(`${dialogue.id} refers to unknown sentence ${line.sentenceId}`);
      if (dialogue.question) needQuestion(dialogue.question, `${dialogue.id} question`);
    }
    const dialoguesById = new Map(unit.dialogues.map((dialogue) => [dialogue.id, dialogue]));

    const readingIds = new Set(unit.readings.map((text) => text.id));
    for (const text of unit.readings) {
      claim(text.id, "reading");
      if (!text.german.trim()) errors.push(`${text.id} has no German text`);
      needQuestion(text.question, `${text.id} question`);
    }

    const speakTaskIds = new Set(unit.speakTasks.map((task) => task.id));
    for (const task of unit.speakTasks) {
      claim(task.id, "speaking task");
      needText(task.cue, `${task.id} cue`);
      if (task.models.length === 0) errors.push(`${task.id} has no model answer`);
      for (const id of [...(task.question ? [task.question] : []), ...task.models])
        if (!sentenceIds.has(id)) errors.push(`${task.id} refers to unknown sentence ${id}`);
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
        } else if (step.kind === "tip") {
          if (!noteIds.has(step.noteId))
            errors.push(`${lesson.id} step refers to unknown note ${step.noteId}`);
        } else if (step.kind === "dialogue" || step.kind === "listen") {
          const dialogue = dialoguesById.get(step.id);
          if (!dialogue) errors.push(`${lesson.id} step refers to unknown dialogue ${step.id}`);
          else if (step.kind === "listen" && !dialogue.question)
            errors.push(`${lesson.id} listens to ${step.id}, which has no question`);
          // A line written for a dialogue need not be drilled on its own.
          for (const line of dialogue?.lines ?? []) usedSentences.add(line.sentenceId);
        } else if (step.kind === "read") {
          if (!readingIds.has(step.id))
            errors.push(`${lesson.id} step refers to unknown reading ${step.id}`);
        } else if (!speakTaskIds.has(step.id)) {
          errors.push(`${lesson.id} step refers to unknown speaking task ${step.id}`);
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
          // A wrong option equal to the answer, or listed twice, would put
          // the same word on two buttons.
          const choices = [tokens[sentence.gap.token], ...sentence.gap.options];
          if (new Set(choices).size < choices.length)
            errors.push(`${sentence.id} gap options repeat a word`);
        }
        for (const ref of sentence.words ?? [])
          if (!ctx.hasWord(ref)) errors.push(`${sentence.id} refers to unknown word ${ref}`);
        if (!ctx.audioIds.has(sentence.id)) errors.push(`${sentence.id} has no audio`);
      }
    }
  }
  return errors;
}
