import type { CourseUnit } from "@/data/course/types";

// What is open, locked and finished on the course path. Pure: the saved
// progress comes in as two sets (see course-store.ts).
//
// Units open in order: a unit opens once the one before it is complete. A
// unit is complete when its checkpoint is passed, or, for a unit that has no
// checkpoint yet, when all its lessons are finished. Inside an open unit the
// lessons open one after another, and the checkpoint is open from the start:
// passing it early opens every lesson of the unit and the next unit, which
// is how a learner who already knows the material skips ahead.
export interface CourseProgress {
  finishedLessons: ReadonlySet<string>;
  passedCheckpoints: ReadonlySet<string>;
}

export type StepStatus = "done" | "open" | "locked";

export type CourseStep =
  { kind: "lesson"; unitId: string; lessonId: string } | { kind: "checkpoint"; unitId: string };

export function hasCheckpoint(unit: CourseUnit): boolean {
  return unit.checkpoint.length > 0;
}

export function isUnitComplete(unit: CourseUnit, progress: CourseProgress): boolean {
  if (hasCheckpoint(unit)) return progress.passedCheckpoints.has(unit.id);
  return unit.lessons.every((lesson) => progress.finishedLessons.has(lesson.id));
}

export function isUnitOpen(
  units: readonly CourseUnit[],
  unitId: string,
  progress: CourseProgress,
): boolean {
  const index = units.findIndex((unit) => unit.id === unitId);
  return index >= 0 && units.slice(0, index).every((unit) => isUnitComplete(unit, progress));
}

export function lessonStatus(
  units: readonly CourseUnit[],
  unit: CourseUnit,
  lessonId: string,
  progress: CourseProgress,
): StepStatus {
  if (progress.finishedLessons.has(lessonId)) return "done";
  if (!isUnitOpen(units, unit.id, progress)) return "locked";
  if (progress.passedCheckpoints.has(unit.id)) return "open";
  const index = unit.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return "locked";
  const earlierDone = unit.lessons
    .slice(0, index)
    .every((lesson) => progress.finishedLessons.has(lesson.id));
  return earlierDone ? "open" : "locked";
}

export function checkpointStatus(
  units: readonly CourseUnit[],
  unit: CourseUnit,
  progress: CourseProgress,
): StepStatus {
  if (progress.passedCheckpoints.has(unit.id)) return "done";
  return isUnitOpen(units, unit.id, progress) ? "open" : "locked";
}

// Where the learner carries on: the first unfinished lesson of the first
// incomplete unit, or that unit's checkpoint once its lessons are done.
// Undefined when every unit written so far is complete.
export function nextCourseStep(
  units: readonly CourseUnit[],
  progress: CourseProgress,
): CourseStep | undefined {
  const unit = units.find((u) => !isUnitComplete(u, progress));
  if (!unit) return undefined;
  const lesson = unit.lessons.find((l) => !progress.finishedLessons.has(l.id));
  if (lesson) return { kind: "lesson", unitId: unit.id, lessonId: lesson.id };
  return { kind: "checkpoint", unitId: unit.id };
}
