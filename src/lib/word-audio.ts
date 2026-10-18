import { WORD_AUDIO } from "@/data/word-audio.generated";
import { LETTER_AUDIO } from "@/data/letter-audio.generated";

// Playback goes through the Web Audio API rather than <audio> elements: clips
// are fetched and decoded into memory ahead of time, so a tap starts the sound
// with no network, element or decoding work, and the silence the TTS renders
// at the start of every mp3 is skipped. A clip that isn't decoded yet falls
// back to a plain <audio> element so a very early tap still plays.
//
// Nothing here loads a whole lesson. A quiz tells the loader which clips the
// current question and the next few need (setAudioWindow); the loader fetches
// those a few at a time, current question first, drops requests that fell out
// of the window, and keeps decoded word clips in a small LRU so memory stays
// flat however many words a test has. Letters and screen titles are shared by
// every lesson, so they're kept once loaded.
interface Clip {
  buffer: AudioBuffer;
  offset: number;
  // Where the audible part ends: the TTS pads short clips with silence, so a
  // sequence (playSequence) starts the next clip from here, not the buffer end.
  end: number;
}
export interface AudioNeeds {
  words: string[];
  letters: string[];
}

const LOOKAHEAD_QUESTIONS = 3;
const MAX_ACTIVE_LOADS = 3;
const MAX_LOOSE_CLIPS = 60;
const SILENCE_THRESHOLD = 0.02;
const LEAD_IN_SECONDS = 0.01;
const TITLE_SRCS = Object.values(WORD_AUDIO).filter((src) => src.startsWith("/audio/title-"));

const clips = new Map<string, Clip>();
const inflight = new Map<string, AbortController>();
const listeners = new Set<() => void>();
let pending: string[] = [];
let active = 0;
let windowSrcs = new Set<string>();
let audioCtx: AudioContext | null = null;

// Only one clip (or one sequence, see playSequence) plays at a time —
// otherwise rapid taps (e.g. spelling a word letter by letter) pile up
// overlapping audio.
let activeSources: AudioBufferSourceNode[] = [];
let activeElement: HTMLAudioElement | null = null;
let sequenceTimers: ReturnType<typeof setTimeout>[] = [];

export function constrainedNetwork(): boolean {
  if (typeof navigator === "undefined") return false;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return Boolean(
    connection &&
    (connection.saveData ||
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"),
  );
}

// How many upcoming questions to fetch ahead: none on data-saver / 2G, so the
// current question gets the whole connection.
export function lookaheadQuestions(): number {
  return constrainedNetwork() ? 0 : LOOKAHEAD_QUESTIONS;
}

function isPinned(src: string): boolean {
  return src.startsWith("/audio/letters/") || src.startsWith("/audio/title-");
}

function firstAudibleOffset(buffer: AudioBuffer): number {
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    if (Math.abs(data[i]!) > SILENCE_THRESHOLD)
      return Math.max(0, i / buffer.sampleRate - LEAD_IN_SECONDS);
  }
  return 0;
}

function lastAudibleEnd(buffer: AudioBuffer): number {
  const data = buffer.getChannelData(0);
  for (let i = data.length - 1; i >= 0; i--) {
    if (Math.abs(data[i]!) > SILENCE_THRESHOLD)
      return Math.min(buffer.duration, i / buffer.sampleRate + LEAD_IN_SECONDS);
  }
  return buffer.duration;
}

function notify() {
  for (const listener of listeners) listener();
}

function evict() {
  let loose = 0;
  for (const src of clips.keys()) if (!isPinned(src)) loose++;
  for (const src of clips.keys()) {
    if (loose <= MAX_LOOSE_CLIPS) break;
    if (isPinned(src) || windowSrcs.has(src)) continue;
    clips.delete(src);
    loose--;
  }
}

function store(src: string, clip: Clip) {
  clips.delete(src);
  clips.set(src, clip);
  evict();
  notify();
}

function startLoad(src: string) {
  const controller = new AbortController();
  inflight.set(src, controller);
  active++;
  void (async () => {
    try {
      if (typeof OfflineAudioContext === "undefined") return;
      const response = await fetch(src, { signal: controller.signal });
      if (!response.ok) return;
      const bytes = await response.arrayBuffer();
      const buffer = await new OfflineAudioContext(1, 1, 24000).decodeAudioData(bytes);
      store(src, {
        buffer,
        offset: firstAudibleOffset(buffer),
        end: lastAudibleEnd(buffer),
      });
    } catch {
      /* aborted or failed — it's requested again the next time it's needed */
    } finally {
      inflight.delete(src);
      active--;
      pump();
    }
  })();
}

function pump() {
  const limit = constrainedNetwork() ? 1 : MAX_ACTIVE_LOADS;
  while (active < limit && pending.length > 0) {
    const src = pending.shift()!;
    if (!clips.has(src) && !inflight.has(src)) startLoad(src);
  }
}

function enqueue(srcs: string[], front = false) {
  const fresh = srcs.filter((src) => !clips.has(src) && !inflight.has(src));
  const rest = pending.filter((src) => !fresh.includes(src));
  pending = front ? [...fresh, ...rest] : [...rest, ...fresh];
  pump();
}

function srcsOf({ words, letters }: AudioNeeds): string[] {
  const srcs: string[] = [];
  for (const word of words) {
    const src = WORD_AUDIO[word];
    if (src) srcs.push(src);
  }
  for (const letter of letters) {
    const src = LETTER_AUDIO[letterKey(letter)];
    if (src) srcs.push(src);
  }
  return srcs;
}

// "ß" uppercases to "SS" in JavaScript, so it has its own key.
function letterKey(letter: string): string {
  return letter === "ß" || letter === "ẞ" ? "ß" : letter.toUpperCase();
}

// Tells the loader what the quiz needs now: the clips for the current
// question (fetched first), then those for the next few, then the shared
// screen titles. Anything requested earlier that hasn't started and isn't in
// this window is dropped, and in-flight requests that fell out of it are
// aborted.
export function setAudioWindow(current: AudioNeeds, upcoming: AudioNeeds[]) {
  const ordered = [...new Set([...srcsOf(current), ...upcoming.flatMap(srcsOf)])];
  windowSrcs = new Set(ordered);
  const wanted = new Set([...ordered, ...TITLE_SRCS]);
  for (const [src, controller] of inflight) if (!wanted.has(src)) controller.abort();
  pending = [];
  enqueue([...ordered, ...TITLE_SRCS]);
}

// For screens outside the quiz's window (the hand-written Vogel lesson):
// fetch these clips ahead of anything already queued.
export function preloadWords(words: string[]) {
  enqueue(srcsOf({ words, letters: [] }), true);
}

export function preloadLetters(letters: string[]) {
  enqueue(srcsOf({ words: [], letters }), true);
}

export function isWordReady(word: string): boolean {
  const src = WORD_AUDIO[word];
  return !src || clips.has(src);
}

export function subscribeAudio(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function stopActive() {
  activeElement?.pause();
  for (const source of activeSources) {
    try {
      source.stop();
    } catch {
      /* already ended */
    }
  }
  activeSources = [];
  for (const timer of sequenceTimers) clearTimeout(timer);
  sequenceTimers = [];
}

// Mobile browsers suspend (iOS: "interrupt") the AudioContext when the app is
// backgrounded or the phone locks, and on return resume() often never brings
// it back, so every later clip played into a dead context and was silent.
// Instead the context is dropped whenever the page is hidden and a fresh one
// is made on the next tap (inside that user gesture, so it's allowed to
// start). Decoded clips aren't tied to a context (they're decoded with an
// OfflineAudioContext), so nothing needs re-fetching.
function dropContext() {
  stopActive();
  const ctx = audioCtx;
  audioCtx = null;
  void ctx?.close().catch(() => {
    /* already closed */
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") dropContext();
  });
  window.addEventListener("pagehide", dropContext);
}

function context(): AudioContext {
  const state = audioCtx?.state as string | undefined;
  if (state === "closed" || state === "interrupted") dropContext();
  audioCtx ??= new AudioContext();
  if (audioCtx.state !== "running") void audioCtx.resume();
  return audioCtx;
}

function playClip(src: string, rate = 1) {
  stopActive();
  const ready = clips.get(src);
  if (ready) {
    clips.delete(src);
    clips.set(src, ready);
    const ctx = context();
    const source = ctx.createBufferSource();
    source.buffer = ready.buffer;
    source.playbackRate.value = rate;
    source.connect(ctx.destination);
    source.start(0, ready.offset);
    activeSources = [source];
    return;
  }
  enqueue([src], true);
  const audio = new Audio(src);
  audio.playbackRate = rate;
  activeElement = audio;
  audio.play().catch(() => {
    /* autoplay/decoding blocked — user can just tap again */
  });
}

// Clips spoken the way an English reader would say a German word (the
// "wrong" sounds in the grammar tests' sound-choice screens) are keyed
// "en:<text>" and fall back to an English voice.
const ENGLISH_PREFIX = "en:";

function speak(text: string, rate = 0.78) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const english = text.startsWith(ENGLISH_PREFIX);
  const utterance = new SpeechSynthesisUtterance(
    english ? text.slice(ENGLISH_PREFIX.length) : text,
  );
  utterance.lang = english ? "en-US" : "de-DE";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

// Plays a recorded pronunciation for `word` if one has been generated
// (see scripts/generate-audio.mjs). Falls back to the device's speech
// synthesis for words that don't have an audio file yet, so new vocabulary
// still speaks something before its audio is recorded. `slow` plays it at
// three-quarter speed (the grammar tests' "say it after me" screen).
export function playWord(word: string, { slow = false }: { slow?: boolean } = {}) {
  const src = WORD_AUDIO[word];
  if (src) playClip(src, slow ? 0.75 : 1);
  else speak(word, slow ? 0.55 : 0.78);
}

// Plays the German name of a single letter (e.g. "P" -> "peh"), for the
// word-builder's letter tiles.
export function playLetter(letter: string) {
  const src = LETTER_AUDIO[letterKey(letter)];
  if (src) playClip(src);
  else speak(letter);
}

export type SequenceItem = { word: string } | { letter: string };

function sequenceSrc(item: SequenceItem): string | undefined {
  return "word" in item ? WORD_AUDIO[item.word] : LETTER_AUDIO[letterKey(item.letter)];
}

// Plays clips one after another with `gapSeconds` of silence between them —
// a name spelled letter by letter (A-N-N-A) or a short dialogue. When every
// clip is already decoded they're scheduled on the audio clock so the gaps
// are exact; otherwise each one starts on a timer. `onItem(i)` fires as item
// i starts, so a screen can light it up. Any other playback cancels it.
export function playSequence(
  items: SequenceItem[],
  gapSeconds = 0.6,
  onItem?: (index: number) => void,
) {
  stopActive();
  if (items.length === 0) return;
  const srcs = items.map(sequenceSrc);
  const decoded = srcs.map((src) => (src ? clips.get(src) : undefined));
  if (decoded.every((clip) => clip !== undefined)) {
    const ctx = context();
    let at = ctx.currentTime + 0.05;
    const sources: AudioBufferSourceNode[] = [];
    decoded.forEach((clip, i) => {
      const source = ctx.createBufferSource();
      source.buffer = clip!.buffer;
      source.connect(ctx.destination);
      source.start(at, clip!.offset);
      if (onItem) {
        const delay = Math.max(0, (at - ctx.currentTime) * 1000);
        sequenceTimers.push(setTimeout(() => onItem(i), delay));
      }
      sources.push(source);
      at += clip!.end - clip!.offset + gapSeconds;
    });
    activeSources = sources;
    return;
  }
  enqueue(
    srcs.filter((src): src is string => Boolean(src)),
    true,
  );
  const step = 600 + gapSeconds * 1000;
  const timers = items.map((item, i) =>
    setTimeout(() => {
      // Each clip stops whatever is playing, so keep the remaining timers.
      const pendingTimers = sequenceTimers;
      sequenceTimers = [];
      if ("word" in item) playWord(item.word);
      else playLetter(item.letter);
      sequenceTimers = pendingTimers;
      onItem?.(i);
    }, i * step),
  );
  sequenceTimers = timers;
}
