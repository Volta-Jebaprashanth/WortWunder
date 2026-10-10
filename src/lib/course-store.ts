// Local-only progress for the course ("Von Null auf A1"), kept apart from
// the vocabulary tests' progress-store.ts:
//   - per lesson:   finished or not, and the best score (0-100)
//   - per unit:     checkpoint passed or not
//   - per sentence: a strength 0-5 and the local day it is next due. A right
//                   answer raises the strength by one and pushes the due day
//                   out (1, 2, 4, 8, 16, then 30 days); a wrong one drops it
//                   to 1, due tomorrow.
//   - streak:       the last day a lesson was finished and the run of days
// Like progress-store.ts every call reads and writes localStorage directly,
// so "Clear all my data" can't be undone by a stale in-memory copy.
// reconcileCourse drops entries whose ids no longer exist in the course data,
// so content changes never strand saved progress.
const COURSE_KEY = "wortwunder:course";
const SCHEMA_VERSION = 1;
export const MAX_STRENGTH = 5;
// Days until a sentence is due again, by its strength after the answer; a
// right answer on a sentence already at full strength earns the longest gap.
const DUE_AFTER_DAYS = [1, 1, 2, 4, 8, 16];
const DUE_AT_FULL_STRENGTH = 30;

export interface LessonState {
  done: boolean;
  best: number;
}
export interface SentenceState {
  strength: number;
  due: string; // local day, "YYYY-MM-DD"
}
interface CourseStore {
  version: number;
  lessons: Record<string, LessonState>;
  units: Record<string, { checkpoint: boolean }>;
  sentences: Record<string, SentenceState>;
  streak: { day: string; run: number };
  // Per grammar tag: wrong answers not yet made up for by right ones.
  misses: Record<string, number>;
}

// Local time, not UTC, so a day rolls over at the learner's own midnight.
export function localDay(date: Date = new Date()): string {
  return date.toLocaleDateString("en-CA");
}

export function addDays(day: string, days: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return localDay(new Date(y!, m! - 1, d! + days));
}

function emptyStore(): CourseStore {
  return {
    version: SCHEMA_VERSION,
    lessons: {},
    units: {},
    sentences: {},
    streak: { day: "", run: 0 },
    misses: {},
  };
}

function readStore(): CourseStore {
  try {
    const raw = localStorage.getItem(COURSE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<CourseStore>;
    if (parsed.version !== SCHEMA_VERSION) return emptyStore();
    return { ...emptyStore(), ...parsed };
  } catch {
    return emptyStore();
  }
}

function writeStore(store: CourseStore) {
  try {
    localStorage.setItem(COURSE_KEY, JSON.stringify(store));
  } catch {
    /* localStorage unavailable — progress still works for this session */
  }
}

function keep<T>(record: Record<string, T>, ids: readonly string[]): Record<string, T> {
  const known = new Set(ids);
  return Object.fromEntries(Object.entries(record).filter(([id]) => known.has(id)));
}

export function reconcileCourse(known: {
  unitIds: readonly string[];
  lessonIds: readonly string[];
  sentenceIds: readonly string[];
  grammarTags?: readonly string[];
}) {
  const store = readStore();
  store.units = keep(store.units, known.unitIds);
  store.lessons = keep(store.lessons, known.lessonIds);
  store.sentences = keep(store.sentences, known.sentenceIds);
  if (known.grammarTags) store.misses = keep(store.misses, known.grammarTags);
  writeStore(store);
}

export function getLessonState(lessonId: string): LessonState {
  return readStore().lessons[lessonId] ?? { done: false, best: 0 };
}

export function getFinishedLessonIds(): string[] {
  return Object.entries(readStore().lessons)
    .filter(([, state]) => state.done)
    .map(([id]) => id);
}

// `score` is the share of questions answered right first time, 0-100.
// Finishing is permanent; replaying a lesson can only raise its best score.
export function finishLesson(lessonId: string, score: number, today: string = localDay()) {
  const store = readStore();
  const best = Math.max(store.lessons[lessonId]?.best ?? 0, Math.round(score));
  store.lessons[lessonId] = { done: true, best };
  countDay(store, today);
  writeStore(store);
}

function countDay(store: CourseStore, today: string) {
  if (store.streak.day === today) return;
  const continues = store.streak.day === addDays(today, -1);
  store.streak = { day: today, run: continues ? store.streak.run + 1 : 1 };
}

// Counts today towards the streak. Finishing a lesson does this by itself;
// a review session or a checkpoint calls it when it ends.
export function markActiveDay(today: string = localDay()) {
  const store = readStore();
  countDay(store, today);
  writeStore(store);
}

export function isCheckpointPassed(unitId: string): boolean {
  return readStore().units[unitId]?.checkpoint ?? false;
}

export function getPassedCheckpointUnitIds(): string[] {
  return Object.entries(readStore().units)
    .filter(([, state]) => state.checkpoint)
    .map(([id]) => id);
}

export function passCheckpoint(unitId: string) {
  const store = readStore();
  store.units[unitId] = { checkpoint: true };
  writeStore(store);
}

export function getSentenceState(sentenceId: string): SentenceState | undefined {
  return readStore().sentences[sentenceId];
}

export function getSentenceStrength(sentenceId: string): number {
  return readStore().sentences[sentenceId]?.strength ?? 0;
}

// `grammar` are the sentence's grammar tags: a wrong answer counts against
// each of them and a right one makes up for one earlier miss.
export function recordSentenceAnswer(
  sentenceId: string,
  correct: boolean,
  today: string = localDay(),
  grammar: readonly string[] = [],
) {
  const store = readStore();
  const before = store.sentences[sentenceId]?.strength ?? 0;
  const strength = correct ? Math.min(before + 1, MAX_STRENGTH) : 1;
  const days =
    correct && before === MAX_STRENGTH ? DUE_AT_FULL_STRENGTH : DUE_AFTER_DAYS[strength]!;
  store.sentences[sentenceId] = { strength, due: addDays(today, days) };
  for (const tag of grammar) {
    const misses = Math.max(0, (store.misses[tag] ?? 0) + (correct ? -1 : 1));
    if (misses > 0) store.misses[tag] = misses;
    else delete store.misses[tag];
  }
  writeStore(store);
}

// The grammar tags the learner currently misses most, worst first.
export function getWeakGrammarTags(limit = 3): string[] {
  return Object.entries(readStore().misses)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function getDueSentenceIds(today: string = localDay()): string[] {
  return Object.entries(readStore().sentences)
    .filter(([, state]) => state.due <= today)
    .sort(([, a], [, b]) => a.strength - b.strength)
    .map(([id]) => id);
}

// The current run of days, or 0 once a day has been missed.
export function getStreak(today: string = localDay()): number {
  const { day, run } = readStore().streak;
  return day === today || day === addDays(today, -1) ? run : 0;
}
