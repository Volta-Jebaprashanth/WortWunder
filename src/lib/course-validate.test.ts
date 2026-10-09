import { describe, expect, it } from "vitest";
import { COURSE_UNITS, resolveWord } from "@/data/course";
import type { CourseUnit, Sentence } from "@/data/course/types";
import { COURSE_AUDIO } from "@/data/course-audio.generated";
import { validateCourse, type ValidationContext } from "@/lib/course-validate";

const REAL_CONTEXT: ValidationContext = {
  hasWord: (ref) => resolveWord(ref) !== undefined,
  audioIds: new Set(Object.keys(COURSE_AUDIO)),
};

// A deep copy of the real first unit with one thing broken by `change`.
function broken(change: (unit: CourseUnit, first: Sentence) => void): string[] {
  const unit = structuredClone(COURSE_UNITS[0]!);
  change(unit, unit.lessons[0]!.sentences[0]!);
  return validateCourse([unit], REAL_CONTEXT);
}

describe("validateCourse", () => {
  it("passes the real course", () => {
    expect(validateCourse(COURSE_UNITS, REAL_CONTEXT)).toEqual([]);
  });

  it("fails on a missing translation", () => {
    expect(broken((_, s) => (s.tamil = "  "))).toEqual(["u01.l01.s01 is missing tamil"]);
    expect(broken((u) => (u.lessons[0]!.meaning.sinhala = ""))).toEqual([
      "u01.l01 meaning is missing sinhala",
    ]);
    expect(broken((u) => (u.notes[0]!.body.english = ""))).toEqual([
      "u01.g01 body is missing english",
    ]);
  });

  it("fails on a duplicate id", () => {
    expect(broken((u) => (u.lessons[0]!.sentences[1]!.id = "u01.l01.s01"))).toContain(
      "duplicate id u01.l01.s01",
    );
  });

  it("fails on a gap index out of range", () => {
    expect(broken((_, s) => (s.gap = { token: 2, options: ["Tschüss"] }))).toEqual([
      "u01.l01.s01 gap token 2 is out of range",
    ]);
    expect(broken((_, s) => (s.gap = { token: -1, options: ["Tschüss"] }))).toHaveLength(1);
    expect(broken((_, s) => (s.gap = { token: 0, options: ["Tschüss"] }))).toEqual([]);
    expect(broken((_, s) => (s.gap = { token: 0, options: [] }))).toEqual([
      "u01.l01.s01 gap has no wrong options",
    ]);
  });

  it("fails on a gap option that repeats the answer or another option", () => {
    expect(broken((_, s) => (s.gap = { token: 0, options: ["Hallo"] }))).toEqual([
      "u01.l01.s01 gap options repeat a word",
    ]);
    expect(broken((_, s) => (s.gap = { token: 0, options: ["Tschüss", "Tschüss"] }))).toEqual([
      "u01.l01.s01 gap options repeat a word",
    ]);
  });

  it("fails on a reference to an unknown word", () => {
    expect(broken((_, s) => (s.words = ["1.1/nope"]))).toEqual([
      "u01.l01.s01 refers to unknown word 1.1/nope",
    ]);
    expect(broken((u) => u.lessons[0]!.newWords.push("9.9/hallo"))).toEqual([
      "u01.l01 newWords refers to unknown word 9.9/hallo",
    ]);
    expect(broken((u) => u.lessons[0]!.steps.push({ kind: "word", ref: "1.1/nope" }))).toEqual([
      "u01.l01 step refers to unknown word 1.1/nope",
    ]);
  });

  it("fails on a reference to an unknown sentence or note", () => {
    expect(
      broken((u) => u.lessons[0]!.steps.push({ kind: "sentence", id: "u01.l01.s99" })),
    ).toEqual(["u01.l01 step refers to unknown sentence u01.l01.s99"]);
    expect(broken((u) => u.notes[0]!.examples.push("u01.l01.s99"))).toEqual([
      "u01.g01 example refers to unknown sentence u01.l01.s99",
    ]);
    expect(broken((u) => u.lessons[0]!.steps.push({ kind: "tip", noteId: "u01.g99" }))).toEqual([
      "u01.l01 step refers to unknown note u01.g99",
    ]);
    expect(broken((u) => u.guidebook.push("u01.g99"))).toEqual([
      "u01 guidebook refers to unknown note u01.g99",
    ]);
    expect(broken((u) => u.checkpoint.push("u01.l01.s99"))).toEqual([
      "u01 checkpoint refers to unknown id u01.l01.s99",
    ]);
  });

  it("fails on a sentence with no audio", () => {
    const unit = structuredClone(COURSE_UNITS[0]!);
    const errors = validateCourse([unit], { ...REAL_CONTEXT, audioIds: new Set() });
    expect(errors).toHaveLength(unit.lessons.flatMap((lesson) => lesson.sentences).length);
    expect(errors[0]).toBe("u01.l01.s01 has no audio");
  });

  it("fails on a sentence no step uses, or filed under the wrong lesson", () => {
    expect(
      broken((u) => {
        const lesson = u.lessons[0]!;
        lesson.steps = lesson.steps.filter((s) => s.kind !== "sentence" || s.id !== "u01.l01.s01");
      }),
    ).toEqual(["u01.l01.s01 is not used by any step of u01.l01"]);
    expect(
      broken((u, s) => {
        s.id = "u02.l01.s01";
        u.lessons[0]!.steps.push({ kind: "sentence", id: s.id });
        u.notes[0]!.examples = [];
      }),
    ).toContain("sentence u02.l01.s01 does not belong to u01.l01");
  });
});
