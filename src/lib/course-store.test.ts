import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  addDays,
  finishLesson,
  getDueSentenceIds,
  getFinishedLessonIds,
  getLessonState,
  getPassedCheckpointUnitIds,
  getSentenceState,
  getSentenceStrength,
  getStreak,
  isCheckpointPassed,
  MAX_STRENGTH,
  passCheckpoint,
  recordSentenceAnswer,
  reconcileCourse,
} from "@/lib/course-store";

const COURSE_KEY = "wortwunder:course";
const TODAY = "2026-10-09";

let data: Map<string, string>;
beforeEach(() => {
  data = new Map();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  });
});

describe("addDays", () => {
  it("crosses month and year ends", () => {
    expect(addDays("2026-10-09", 1)).toBe("2026-10-10");
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(addDays("2026-12-31", 30)).toBe("2027-01-30");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });
});

describe("lessons", () => {
  it("starts unfinished", () => {
    expect(getLessonState("u01.l01")).toEqual({ done: false, best: 0 });
    expect(getFinishedLessonIds()).toEqual([]);
  });

  it("stays finished and keeps the best score across replays", () => {
    finishLesson("u01.l01", 83.4, TODAY);
    expect(getLessonState("u01.l01")).toEqual({ done: true, best: 83 });
    finishLesson("u01.l01", 50, TODAY);
    expect(getLessonState("u01.l01")).toEqual({ done: true, best: 83 });
    finishLesson("u01.l01", 100, TODAY);
    expect(getLessonState("u01.l01").best).toBe(100);
    expect(getFinishedLessonIds()).toEqual(["u01.l01"]);
  });
});

describe("unit checkpoints", () => {
  it("records a pass per unit", () => {
    expect(isCheckpointPassed("u01")).toBe(false);
    passCheckpoint("u01");
    expect(isCheckpointPassed("u01")).toBe(true);
    expect(isCheckpointPassed("u02")).toBe(false);
    expect(getPassedCheckpointUnitIds()).toEqual(["u01"]);
  });
});

describe("sentence strength", () => {
  it("rises by one per right answer and spaces the due day out", () => {
    expect(getSentenceStrength("s1")).toBe(0);
    const gaps = [1, 2, 4, 8, 16];
    gaps.forEach((gap, i) => {
      recordSentenceAnswer("s1", true, TODAY);
      expect(getSentenceState("s1")).toEqual({ strength: i + 1, due: addDays(TODAY, gap) });
    });
    recordSentenceAnswer("s1", true, TODAY);
    expect(getSentenceState("s1")).toEqual({ strength: MAX_STRENGTH, due: addDays(TODAY, 30) });
  });

  it("drops to 1, due tomorrow, on a wrong answer", () => {
    for (let i = 0; i < 4; i++) recordSentenceAnswer("s1", true, TODAY);
    recordSentenceAnswer("s1", false, TODAY);
    expect(getSentenceState("s1")).toEqual({ strength: 1, due: addDays(TODAY, 1) });
    recordSentenceAnswer("s2", false, TODAY);
    expect(getSentenceStrength("s2")).toBe(1);
  });

  it("lists due sentences weakest first", () => {
    recordSentenceAnswer("strong", true, TODAY);
    recordSentenceAnswer("strong", true, TODAY);
    recordSentenceAnswer("weak", true, TODAY);
    expect(getDueSentenceIds(TODAY)).toEqual([]);
    expect(getDueSentenceIds(addDays(TODAY, 1))).toEqual(["weak"]);
    expect(getDueSentenceIds(addDays(TODAY, 2))).toEqual(["weak", "strong"]);
  });
});

describe("streak", () => {
  it("counts consecutive days on which a lesson was finished", () => {
    expect(getStreak(TODAY)).toBe(0);
    finishLesson("u01.l01", 100, TODAY);
    finishLesson("u01.l02", 100, TODAY);
    expect(getStreak(TODAY)).toBe(1);
    finishLesson("u01.l03", 100, addDays(TODAY, 1));
    expect(getStreak(addDays(TODAY, 1))).toBe(2);
  });

  it("survives until the end of the next day, then resets", () => {
    finishLesson("u01.l01", 100, TODAY);
    finishLesson("u01.l02", 100, addDays(TODAY, 1));
    expect(getStreak(addDays(TODAY, 2))).toBe(2);
    expect(getStreak(addDays(TODAY, 3))).toBe(0);
    finishLesson("u01.l03", 100, addDays(TODAY, 3));
    expect(getStreak(addDays(TODAY, 3))).toBe(1);
  });
});

describe("reconciling with changed content", () => {
  it("drops progress for ids that no longer exist and keeps the rest", () => {
    finishLesson("u01.l01", 90, TODAY);
    finishLesson("u01.l99", 90, TODAY);
    passCheckpoint("u01");
    passCheckpoint("u99");
    recordSentenceAnswer("u01.l01.s01", true, TODAY);
    recordSentenceAnswer("u01.l01.s99", true, TODAY);

    reconcileCourse({
      unitIds: ["u01"],
      lessonIds: ["u01.l01"],
      sentenceIds: ["u01.l01.s01"],
    });

    expect(getFinishedLessonIds()).toEqual(["u01.l01"]);
    expect(getLessonState("u01.l01").best).toBe(90);
    expect(isCheckpointPassed("u01")).toBe(true);
    expect(isCheckpointPassed("u99")).toBe(false);
    expect(getSentenceStrength("u01.l01.s01")).toBe(1);
    expect(getSentenceState("u01.l01.s99")).toBeUndefined();
    expect(getStreak(TODAY)).toBe(1);
  });
});

describe("damaged or outdated storage", () => {
  it("treats unreadable data as no progress", () => {
    data.set(COURSE_KEY, "{not json");
    expect(getLessonState("u01.l01").done).toBe(false);
    finishLesson("u01.l01", 100, TODAY);
    expect(getLessonState("u01.l01").done).toBe(true);
  });

  it("ignores a store saved under another schema version", () => {
    data.set(COURSE_KEY, JSON.stringify({ version: 0, lessons: { "u01.l01": { done: true } } }));
    expect(getLessonState("u01.l01").done).toBe(false);
  });

  it("fills in parts missing from a saved store", () => {
    data.set(COURSE_KEY, JSON.stringify({ version: 1, lessons: {} }));
    expect(() => recordSentenceAnswer("s1", true, TODAY)).not.toThrow();
    expect(getStreak(TODAY)).toBe(0);
  });

  it("keeps working when localStorage throws", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    });
    expect(() => finishLesson("u01.l01", 100, TODAY)).not.toThrow();
    expect(getLessonState("u01.l01").done).toBe(false);
  });
});
