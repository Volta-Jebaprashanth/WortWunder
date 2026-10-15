import { isTestType, TIER_ORDER, tierOfType, type TestType, type Tier } from "@/lib/quiz-engine";
import { tierOfGrammarType } from "@/lib/grammar-engine";

// Local-only mastery tracking. Each test (e.g. "1.1" for greetings) gets one
// row per (testType, word) combination — 100 rows for a 10-word/10-type test
// — holding a `pendingAttempts` counter instead of a pass/fail log:
//   - a test is first entered           -> every row starts at 1
//                                          (2 for basic-tier rows)
//   - the FIRST wrong attempt on a row  -> pending = min(pending + 2, 4)
//                                          (max 3 for training-tier rows,
//                                          max 5 for basic-tier rows)
//   - whenever that row is finally passed (first try or after retries)
//                                       -> pending = max(pending - 1, 0)
// A test is "complete" once every one of its rows is 0. Re-entering an
// already-completed test resets all rows back to 1 for a fresh practice
// round, but the completed flag itself is permanent. Re-entering a test
// that's still in progress (rows exist, not yet completed) leaves the rows
// untouched so exiting mid-exercise and coming back resumes where the kid
// left off.
//
// Every entry also reconciles the row set against the CURRENT word list and
// test-type list, so content changes between app builds never strand a
// kid's saved progress: a row for a word/type that's been removed is
// dropped (and can no longer block completion), and a row for a newly added
// word/type is created fresh (see startPending) — even mid-progress, not just on a fresh
// start. See ensureTestEntered.
//
// Rounds are strictly tier-gated (training -> basic -> easy -> medium ->
// hard, see quiz-engine.ts TIER_ORDER): every row across all 5 tiers exists
// from the moment a test is entered, but getActiveTierRows only ever hands
// back rows from the earliest tier that isn't fully cleared yet, so nothing
// from medium is ever queued while an easy row is still pending, etc. The
// training tier introduces each word once (capped at 3 if the kid keeps
// missing its question); the basic tier then starts each row at 2 (and caps
// at 5) so a kid sees every word a couple more times in its simplest form
// before anything harder shows up.
//
// Grammar tests (grammar-engine.ts) use the same store and rules. Their row
// types ("rule", "gapPick", ...) and ids (a rule card, a sentence, "board")
// differ, and not every id gets every type, so they enter through
// ensureRowsEntered with an explicit row list; a row's type names its tier
// in quiz-engine.ts or grammar-engine.ts.
const PROGRESS_KEY = "wortwunder:progress";
const SCHEMA_VERSION = 2;
const FAIL_PENALTY = 2;
const PENDING_LIMITS: Record<Tier, { start: number; max: number }> = {
  training: { start: 1, max: 3 },
  basic: { start: 2, max: 5 },
  easy: { start: 1, max: 4 },
  medium: { start: 1, max: 4 },
  hard: { start: 1, max: 4 },
};

function tierOfRow(testType: string): Tier | undefined {
  return isTestType(testType) ? tierOfType(testType) : tierOfGrammarType(testType);
}

function startPending(testType: string): number {
  return PENDING_LIMITS[tierOfRow(testType) ?? "hard"].start;
}

function maxPending(testType: string): number {
  return PENDING_LIMITS[tierOfRow(testType) ?? "hard"].max;
}

interface TestState {
  completed: boolean;
  rows: Record<string, number>;
}

interface ProgressStore {
  version: number;
  tests: Record<string, TestState>;
}

export interface PendingRow<T extends string = TestType> {
  testType: T;
  wordId: string;
  pending: number;
}

function rowKey(testType: string, wordId: string): string {
  return `${testType}:${wordId}`;
}

function emptyStore(): ProgressStore {
  return { version: SCHEMA_VERSION, tests: {} };
}

function readStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<ProgressStore>;
    if (parsed.version !== SCHEMA_VERSION || !parsed.tests) return emptyStore();
    return { version: SCHEMA_VERSION, tests: parsed.tests };
  } catch {
    return emptyStore();
  }
}

function writeStore(store: ProgressStore) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
  } catch {
    /* localStorage unavailable — progress still works for this session */
  }
}

export function ensureTestEntered(testId: string, wordIds: string[], testTypes: TestType[]) {
  ensureRowsEntered(
    testId,
    wordIds.flatMap((id) => testTypes.map((testType) => ({ testType, id }))),
  );
}

export function ensureRowsEntered(testId: string, wanted: { testType: string; id: string }[]) {
  const store = readStore();
  const existing = store.tests[testId];
  const hasRows = Boolean(existing && Object.keys(existing.rows).length > 0);
  const resetAll = !hasRows || existing!.completed;
  const seenIds = new Set(
    resetAll ? [] : Object.keys(existing!.rows).map((key) => key.split(":")[1]),
  );

  // Rebuilt from the current row list every time, so a row whose key no
  // longer matches a real word+testType combo simply isn't carried over
  // (dropped), while every combo that IS current gets a row — reusing its
  // existing pendingAttempts when resuming, or starting fresh (see
  // startPending) when it's new or this is a full reset. All tiers' rows
  // are populated up front even though presentation is tier-gated — see getActiveTierRows.
  // One exception to "new rows start fresh": a training row added to a
  // word the kid is already partway through (progress saved before the
  // training tier existed) starts cleared — they've already met that word,
  // so it shouldn't drag them back to the intro screens.
  const rows: Record<string, number> = {};
  for (const { testType, id } of wanted) {
    const key = rowKey(testType, id);
    const start =
      tierOfRow(testType) === "training" && seenIds.has(id) ? 0 : startPending(testType);
    rows[key] = resetAll ? startPending(testType) : (existing!.rows[key] ?? start);
  }
  store.tests[testId] = {
    completed: (existing?.completed ?? false) || Object.values(rows).every((p) => p === 0),
    rows,
  };
  writeStore(store);
}

export function getPendingRows<T extends string = TestType>(testId: string): PendingRow<T>[] {
  const rows = readStore().tests[testId]?.rows ?? {};
  return Object.entries(rows).map(([key, pending]) => {
    const [testType, wordId] = key.split(":") as [T, string];
    return { testType, wordId, pending };
  });
}

// The rows the queue should draw from right now: whatever's still pending
// in the earliest tier (basic -> easy -> medium -> hard) that isn't fully
// cleared.
// Later tiers' rows already exist (see ensureTestEntered) but are withheld
// until every row ahead of them in tier order hits 0.
export function getActiveTierRows<T extends string = TestType>(testId: string): PendingRow<T>[] {
  const rows = getPendingRows<T>(testId);
  for (const tier of TIER_ORDER) {
    const tierRows = rows.filter((row) => tierOfRow(row.testType) === tier && row.pending > 0);
    if (tierRows.length > 0) return tierRows;
  }
  return [];
}

export function isTestCompleted(testId: string): boolean {
  return readStore().tests[testId]?.completed ?? false;
}

// `penalty` is how many extra passes a miss costs. Big screens (a rule card,
// a whole pairs or sort board) pass 1, so one miss brings them back once
// rather than two or three times.
export function recordFail(
  testId: string,
  testType: string,
  wordId: string,
  penalty = FAIL_PENALTY,
) {
  updateRow(testId, testType, wordId, (pending) =>
    Math.min(pending + penalty, maxPending(testType)),
  );
}

export function recordPass(testId: string, testType: string, wordId: string) {
  updateRow(testId, testType, wordId, (pending) => Math.max(pending - 1, 0));
}

function updateRow(
  testId: string,
  testType: string,
  wordId: string,
  next: (pending: number) => number,
) {
  const store = readStore();
  const test = store.tests[testId] ?? { completed: false, rows: {} };
  const key = rowKey(testType, wordId);
  test.rows[key] = next(test.rows[key] ?? startPending(testType));
  test.completed = test.completed || Object.values(test.rows).every((pending) => pending === 0);
  store.tests[testId] = test;
  writeStore(store);
}

// What the learning path shows for a test: nothing until it's been entered,
// the tier currently being worked through while in progress, and just a
// "completed" tick once it's done — completion is permanent, so re-entering
// a finished test for practice never brings the tier badge back.
export type TestStatus =
  { kind: "notStarted" } | { kind: "inProgress"; tier: Tier } | { kind: "completed" };

export function getTestStatus(testId: string): TestStatus {
  const test = readStore().tests[testId];
  if (!test || Object.keys(test.rows).length === 0) return { kind: "notStarted" };
  if (test.completed) return { kind: "completed" };
  const type = getActiveTierRows<string>(testId)[0]?.testType;
  const tier = type ? tierOfRow(type) : undefined;
  return tier ? { kind: "inProgress", tier } : { kind: "completed" };
}
