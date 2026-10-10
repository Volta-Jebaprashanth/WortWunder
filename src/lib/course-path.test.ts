import { describe, expect, it } from "vitest";
import type { CourseUnit } from "@/data/course/types";
import {
  checkpointStatus,
  isUnitComplete,
  isUnitOpen,
  lessonStatus,
  nextCourseStep,
  type CourseProgress,
} from "@/lib/course-path";

function unit(id: string, lessons: number, withCheckpoint: boolean): CourseUnit {
  const text = { english: id, tamil: id, sinhala: id };
  return {
    id,
    title: id,
    icon: "x",
    meaning: text,
    canDo: { english: [id], tamil: [id], sinhala: [id] },
    notes: [],
    guidebook: [],
    dialogues: [],
    readings: [],
    speakTasks: [],
    lessons: Array.from({ length: lessons }, (_, i) => ({
      id: `${id}.l0${i + 1}`,
      title: id,
      meaning: text,
      newWords: [],
      sentences: [],
      steps: [],
    })),
    checkpoint: withCheckpoint ? [`${id}.l01.s01`] : [],
  };
}

const U1 = unit("u01", 3, true);
const U2 = unit("u02", 2, false);
const U3 = unit("u03", 2, true);
const UNITS = [U1, U2, U3];

function progress(lessons: string[] = [], checkpoints: string[] = []): CourseProgress {
  return { finishedLessons: new Set(lessons), passedCheckpoints: new Set(checkpoints) };
}

describe("lessons inside a unit", () => {
  it("open one after another", () => {
    const start = progress();
    expect(lessonStatus(UNITS, U1, "u01.l01", start)).toBe("open");
    expect(lessonStatus(UNITS, U1, "u01.l02", start)).toBe("locked");
    expect(lessonStatus(UNITS, U1, "u01.l03", start)).toBe("locked");

    const one = progress(["u01.l01"]);
    expect(lessonStatus(UNITS, U1, "u01.l01", one)).toBe("done");
    expect(lessonStatus(UNITS, U1, "u01.l02", one)).toBe("open");
    expect(lessonStatus(UNITS, U1, "u01.l03", one)).toBe("locked");
  });

  it("stay locked for an id the unit does not have", () => {
    expect(lessonStatus(UNITS, U1, "u01.l09", progress())).toBe("locked");
  });
});

describe("units", () => {
  it("open once the unit before is complete", () => {
    expect(isUnitOpen(UNITS, "u01", progress())).toBe(true);
    expect(isUnitOpen(UNITS, "u02", progress())).toBe(false);
    expect(isUnitOpen(UNITS, "u09", progress())).toBe(false);
    expect(lessonStatus(UNITS, U2, "u02.l01", progress())).toBe("locked");
  });

  it("need the checkpoint, not just the lessons, where there is one", () => {
    const lessonsOnly = progress(["u01.l01", "u01.l02", "u01.l03"]);
    expect(isUnitComplete(U1, lessonsOnly)).toBe(false);
    expect(isUnitOpen(UNITS, "u02", lessonsOnly)).toBe(false);

    const passed = progress(["u01.l01", "u01.l02", "u01.l03"], ["u01"]);
    expect(isUnitComplete(U1, passed)).toBe(true);
    expect(lessonStatus(UNITS, U2, "u02.l01", passed)).toBe("open");
  });

  it("are complete on their lessons alone when they have no checkpoint", () => {
    const done = progress(["u02.l01", "u02.l02"], ["u01"]);
    expect(isUnitComplete(U2, done)).toBe(true);
    expect(isUnitOpen(UNITS, "u03", done)).toBe(true);
    expect(isUnitComplete(U2, progress(["u02.l01"], ["u01"]))).toBe(false);
  });
});

describe("checkpoints", () => {
  it("are open as soon as their unit is, and done once passed", () => {
    expect(checkpointStatus(UNITS, U1, progress())).toBe("open");
    expect(checkpointStatus(UNITS, U3, progress())).toBe("locked");
    expect(checkpointStatus(UNITS, U1, progress([], ["u01"]))).toBe("done");
  });

  it("let a learner skip ahead: passing early opens the unit and the next", () => {
    const skipped = progress([], ["u01"]);
    expect(lessonStatus(UNITS, U1, "u01.l01", skipped)).toBe("open");
    expect(lessonStatus(UNITS, U1, "u01.l03", skipped)).toBe("open");
    expect(lessonStatus(UNITS, U2, "u02.l01", skipped)).toBe("open");
    expect(lessonStatus(UNITS, U2, "u02.l02", skipped)).toBe("locked");
  });
});

describe("nextCourseStep", () => {
  it("is the first unfinished lesson, then the unit's checkpoint", () => {
    expect(nextCourseStep(UNITS, progress())).toEqual({
      kind: "lesson",
      unitId: "u01",
      lessonId: "u01.l01",
    });
    expect(nextCourseStep(UNITS, progress(["u01.l01"]))).toEqual({
      kind: "lesson",
      unitId: "u01",
      lessonId: "u01.l02",
    });
    expect(nextCourseStep(UNITS, progress(["u01.l01", "u01.l02", "u01.l03"]))).toEqual({
      kind: "checkpoint",
      unitId: "u01",
    });
  });

  it("moves to the next unit once one is complete, skipped lessons included", () => {
    expect(nextCourseStep(UNITS, progress([], ["u01"]))).toEqual({
      kind: "lesson",
      unitId: "u02",
      lessonId: "u02.l01",
    });
    expect(nextCourseStep(UNITS, progress(["u02.l01", "u02.l02"], ["u01"]))).toEqual({
      kind: "lesson",
      unitId: "u03",
      lessonId: "u03.l01",
    });
  });

  it("is undefined when every unit is complete", () => {
    const all = progress(["u02.l01", "u02.l02"], ["u01", "u03"]);
    expect(nextCourseStep(UNITS, all)).toBeUndefined();
  });
});
