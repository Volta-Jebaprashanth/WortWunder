import { beforeEach, describe, expect, it, vi } from "vitest";
import { ALL_TEST_TYPES, type TestType } from "@/lib/quiz-engine";
import {
  ensureTestEntered,
  getActiveTierRows,
  getPendingRows,
  getTestStatus,
  isTestCompleted,
  recordFail,
  recordPass,
} from "@/lib/progress-store";

const PROGRESS_KEY = "wortwunder:progress";
const TEST = "1.1.1";
const WORDS = ["hallo", "danke"];

// The store reads and writes localStorage on every call, so an in-memory
// stand-in is all it needs.
let data: Map<string, string>;
beforeEach(() => {
  data = new Map();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
    clear: () => data.clear(),
  });
});

function pendingOf(testType: TestType, wordId: string): number | undefined {
  return getPendingRows(TEST).find((r) => r.testType === testType && r.wordId === wordId)?.pending;
}

// Passes every row of whichever tier is active until that tier is cleared.
function clearActiveTier() {
  const tier = getActiveTierRows(TEST);
  for (const row of tier) {
    for (let i = 0; i < row.pending; i++) recordPass(TEST, row.testType, row.wordId);
  }
}

function completeTest() {
  for (let guard = 0; guard < 10 && getActiveTierRows(TEST).length > 0; guard++) clearActiveTier();
}

describe("entering a test", () => {
  it("creates a row for every word and test type", () => {
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    expect(getPendingRows(TEST)).toHaveLength(WORDS.length * ALL_TEST_TYPES.length);
  });

  it("starts basic rows at 2 and every other row at 1", () => {
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    expect(pendingOf("training", "hallo")).toBe(1);
    expect(pendingOf("wordPicture", "hallo")).toBe(2);
    expect(pendingOf("listen", "hallo")).toBe(1);
    expect(pendingOf("match", "danke")).toBe(1);
  });

  it("leaves an in-progress test untouched when it is entered again", () => {
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    recordPass(TEST, "training", "hallo");
    recordFail(TEST, "training", "danke");
    const before = getPendingRows(TEST);
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    expect(getPendingRows(TEST)).toEqual(before);
  });
});

describe("passing and failing", () => {
  beforeEach(() => ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES));

  it("lowers a row by one on a pass, never below zero", () => {
    recordPass(TEST, "wordPicture", "hallo");
    expect(pendingOf("wordPicture", "hallo")).toBe(1);
    recordPass(TEST, "wordPicture", "hallo");
    recordPass(TEST, "wordPicture", "hallo");
    expect(pendingOf("wordPicture", "hallo")).toBe(0);
  });

  it("raises a row by two on a fail, up to its tier's cap", () => {
    recordFail(TEST, "listen", "hallo");
    expect(pendingOf("listen", "hallo")).toBe(3);
    recordFail(TEST, "listen", "hallo");
    recordFail(TEST, "listen", "hallo");
    expect(pendingOf("listen", "hallo")).toBe(4);

    for (let i = 0; i < 3; i++) recordFail(TEST, "training", "hallo");
    expect(pendingOf("training", "hallo")).toBe(3);

    for (let i = 0; i < 3; i++) recordFail(TEST, "wordPicture", "hallo");
    expect(pendingOf("wordPicture", "hallo")).toBe(5);
  });
});

describe("tier gating", () => {
  beforeEach(() => ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES));

  it("hands out only the earliest tier that still has pending rows", () => {
    expect(new Set(getActiveTierRows(TEST).map((r) => r.testType))).toEqual(new Set(["training"]));
    recordPass(TEST, "training", "hallo");
    expect(getActiveTierRows(TEST)).toEqual([
      { testType: "training", wordId: "danke", pending: 1 },
    ]);
    recordPass(TEST, "training", "danke");
    expect(new Set(getActiveTierRows(TEST).map((r) => r.testType))).toEqual(
      new Set(["wordPicture"]),
    );
  });

  it("walks training, basic, easy, medium, hard in order", () => {
    const seen: string[] = [];
    for (let guard = 0; guard < 10; guard++) {
      const status = getTestStatus(TEST);
      if (status.kind !== "inProgress") break;
      seen.push(status.tier);
      clearActiveTier();
    }
    expect(seen).toEqual(["training", "basic", "easy", "medium", "hard"]);
    expect(getActiveTierRows(TEST)).toEqual([]);
  });
});

describe("completion", () => {
  it("reports not started, in progress, then completed", () => {
    expect(getTestStatus(TEST)).toEqual({ kind: "notStarted" });
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    expect(getTestStatus(TEST)).toEqual({ kind: "inProgress", tier: "training" });
    expect(isTestCompleted(TEST)).toBe(false);
    completeTest();
    expect(getTestStatus(TEST)).toEqual({ kind: "completed" });
    expect(isTestCompleted(TEST)).toBe(true);
  });

  it("resets the rows on re-entry but keeps the completed flag", () => {
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    completeTest();
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    expect(pendingOf("training", "hallo")).toBe(1);
    expect(pendingOf("wordPicture", "hallo")).toBe(2);
    expect(isTestCompleted(TEST)).toBe(true);
    expect(getTestStatus(TEST)).toEqual({ kind: "completed" });
    recordFail(TEST, "training", "hallo");
    expect(isTestCompleted(TEST)).toBe(true);
  });

  it("keeps tests apart from each other", () => {
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    completeTest();
    expect(getTestStatus("1.1.2")).toEqual({ kind: "notStarted" });
  });
});

describe("reconciling with changed content", () => {
  beforeEach(() => ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES));

  it("drops rows for a word that was removed, so it cannot block completion", () => {
    recordFail(TEST, "training", "danke");
    ensureTestEntered(TEST, ["hallo"], ALL_TEST_TYPES);
    expect(getPendingRows(TEST).every((r) => r.wordId === "hallo")).toBe(true);
    completeTest();
    expect(isTestCompleted(TEST)).toBe(true);
  });

  it("adds fresh rows for a new word without touching existing progress", () => {
    recordPass(TEST, "training", "hallo");
    ensureTestEntered(TEST, [...WORDS, "bitte"], ALL_TEST_TYPES);
    expect(pendingOf("training", "hallo")).toBe(0);
    expect(pendingOf("training", "bitte")).toBe(1);
    expect(pendingOf("wordPicture", "bitte")).toBe(2);
  });

  it("drops rows for a test type that was removed", () => {
    const fewer = ALL_TEST_TYPES.filter((type) => type !== "match");
    ensureTestEntered(TEST, WORDS, fewer);
    expect(getPendingRows(TEST).some((r) => r.testType === "match")).toBe(false);
  });

  it("starts a newly added training row cleared for a word already seen", () => {
    const withoutTraining = ALL_TEST_TYPES.filter((type) => type !== "training");
    data.clear();
    ensureTestEntered(TEST, WORDS, withoutTraining);
    ensureTestEntered(TEST, [...WORDS, "bitte"], ALL_TEST_TYPES);
    expect(pendingOf("training", "hallo")).toBe(0);
    expect(pendingOf("training", "bitte")).toBe(1);
  });
});

describe("damaged or outdated storage", () => {
  it("treats unreadable data as no progress", () => {
    data.set(PROGRESS_KEY, "{not json");
    expect(getTestStatus(TEST)).toEqual({ kind: "notStarted" });
    ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES);
    expect(getTestStatus(TEST)).toEqual({ kind: "inProgress", tier: "training" });
  });

  it("ignores a store saved under another schema version", () => {
    data.set(
      PROGRESS_KEY,
      JSON.stringify({ version: 1, tests: { [TEST]: { completed: true, rows: {} } } }),
    );
    expect(isTestCompleted(TEST)).toBe(false);
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
    expect(() => ensureTestEntered(TEST, WORDS, ALL_TEST_TYPES)).not.toThrow();
    expect(getTestStatus(TEST)).toEqual({ kind: "notStarted" });
  });
});
