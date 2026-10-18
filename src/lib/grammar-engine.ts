import type { MotherTongue } from "@/lib/i18n";
import { shuffle, type Tier } from "@/lib/quiz-engine";
import { ensureRowsEntered, getActiveTierRows, GRAMMAR_ROW_PREFIX } from "@/lib/progress-store";
import { playLetter, playSequence, playWord, type SequenceItem } from "@/lib/word-audio";

// Grammar tests (G1.2 Das ABC, G1.3 Ä Ö Ü ß, ...): hand-written questions in
// four levels, Training -> Simple -> Medium -> Hard (the vocabulary tiers
// minus "basic"; Simple is stored as "easy"). Each question is one row in
// progress-store.ts with the same pending counter as vocabulary rows, so the
// level gate and the +2/-1 rules work the same way. The full design is in
// docs/grammar-planning/G1/plan.md (rules) and screens.md (every screen).
export type L = Record<MotherTongue, string>;
export type GrammarTier = "training" | "easy" | "medium" | "hard";
export const GRAMMAR_TIERS: Tier[] = ["training", "easy", "medium", "hard"];

// Something a screen can play: a recorded word (word-audio.generated.ts), a
// letter's German name, a word spelled letter by letter (0.6 s gaps, 0.3 s
// when fast), or several of these in a row.
export type Sound =
  { word: string } | { letter: string } | { spell: string; fast?: boolean } | { seq: Sound[] };

export type Speaker = "cat" | "mouse" | "you";

export interface ChatLine {
  speaker: Speaker;
  text: string;
  sound?: Sound;
  // Small meaning under the bubble on scene cards ("here you go").
  meaning?: L;
}

// Word-kind colours, fixed for the whole app from G1.5 on.
export type Tone = "nomen" | "verb" | "pronomen" | "plain";

// ---- Cards: unscored teaching screens shown before a Training question ----

export interface InfoRow {
  // Big label at the start of the row ("ei = 👁️", "u → ü").
  big?: string;
  text: L;
  // Chips to tap and hear: recorded words, or letter names.
  hear?: string[];
  hearLetters?: string[];
  tone?: Tone;
}

export type Card =
  | {
      kind: "letters";
      title: string;
      subtitle: L;
      heading: L;
      tiles: { letter: string; sound: string }[];
    }
  | { kind: "info"; title: string; subtitle: L; art?: string; rows: InfoRow[] }
  | { kind: "spell"; title: string; subtitle: L; art?: string; name: string }
  | { kind: "merke" }
  | { kind: "scene"; title: string; subtitle: L; art: string; lines: ChatLine[] }
  | { kind: "say"; text: string; sound: Sound };

// ---- Questions: scored rows ----

export interface Prompt {
  sound?: Sound;
  // Plays the sound once when the screen opens (listening questions).
  autoplay?: boolean;
  show?: string;
  // big: one letter/word in a large tile · word: a word card · pattern: the
  // letters of `show` as tiles, with "▢" as the gap.
  showStyle?: "big" | "word" | "pattern";
  image?: string;
  caption?: L;
  art?: string;
  context?: L;
  chat?: ChatLine[];
  // An empty "You" bubble under the chat, waiting for the reply.
  replySlot?: boolean;
  // A sentence shown in its word-kind colours (G1.5 swap screens).
  colored?: { text: string; tone: Tone }[];
}

interface QuestionBase {
  id: string;
  eyebrow: L;
  title: string;
  subtitle: L;
  // One-line tip on the wrong-answer sheet.
  tip?: L;
  // Extra line on the right-answer sheet ("You spelled ja!").
  reveal?: L;
}

export type Question =
  | (QuestionBase & {
      type: "choice";
      prompt: Prompt;
      options: string[];
      answer: string;
      optionStyle?: "letter" | "word";
      // What the "You chose" card plays for a wrong pick.
      optionSound?: "letter" | "word" | "spell";
    })
  | (QuestionBase & {
      type: "sound";
      show: string;
      // The first one is right; the screen shuffles them.
      sounds: Sound[];
    })
  | (QuestionBase & {
      type: "sort";
      // A sentence shown above the tiles (G1.5 "colour the sentence").
      sentence?: string;
      baskets: { id: string; label: L; tone?: Tone }[];
      items: { text: string; basket: string; sound?: Sound }[];
    })
  | (QuestionBase & {
      type: "build";
      prompt: Prompt;
      answer: string[];
      decoys: string[];
      // Fixed punctuation after each slot (sentences: [",", "!"]).
      punct?: string[];
      tileStyle?: "letter" | "chunk" | "word";
      // The learner's own profile name (G1.2 "Spell YOUR name").
      dynamic?: "yourName";
      // Shown when the profile name can't be spelled with A–Z tiles.
      fallbackNote?: L;
    })
  | (QuestionBase & {
      type: "order";
      // The bubbles in the right order; the screen shuffles them.
      bubbles: ChatLine[];
    })
  | (QuestionBase & { type: "type"; show: string; answer: string; note?: L })
  | (QuestionBase & { type: "tapWords"; sentence: string; targets: string[] })
  | (QuestionBase & { type: "capitals"; sentence: string; fixed: string })
  | (QuestionBase & { type: "match"; pairs: [string, string][] })
  | (QuestionBase & {
      type: "scene";
      // Who opens the scene, for the header line.
      turns: SceneTurn[];
      bank: string[];
    });

export interface SceneTurn {
  speaker?: Speaker;
  line?: string;
  sound?: Sound;
  art?: string;
  context?: L;
  answer: string;
}

export interface GrammarStep {
  tier: GrammarTier;
  // Cards shown before the question each time it comes up (Training only).
  intro?: Card[];
  q: Question;
}

export interface Merke {
  line: L;
  examples: { text: string; sound?: Sound }[];
}

export interface GrammarTest {
  id: string;
  title: string;
  meaning: L;
  icon: string;
  merke: Merke;
  // Unscored review questions from the test before (A3 in screens.md).
  warmup: Question[];
  steps: GrammarStep[];
}

export function grammarRowType(tier: GrammarTier): string {
  return `${GRAMMAR_ROW_PREFIX}${tier}`;
}

export function enterGrammarTest(test: GrammarTest) {
  ensureRowsEntered(
    test.id,
    test.steps.map((step) => ({ testType: grammarRowType(step.tier), id: step.q.id })),
  );
}

// The next round: every still-pending question of the earliest level that
// isn't cleared. Training keeps the written order (each card leads into its
// check); the other levels are shuffled.
export function buildGrammarRound(test: GrammarTest): GrammarStep[] {
  const pending = new Set(
    getActiveTierRows<string>(test.id).map((row) => `${row.testType}:${row.wordId}`),
  );
  const steps = test.steps.filter((step) =>
    pending.has(`${grammarRowType(step.tier)}:${step.q.id}`),
  );
  return steps[0]?.tier === "training" ? steps : shuffle(steps);
}

// ---- Sounds ----

export function soundItems(sound: Sound): { items: SequenceItem[]; gap: number } {
  if ("word" in sound) return { items: [{ word: sound.word }], gap: 0 };
  if ("letter" in sound) return { items: [{ letter: sound.letter }], gap: 0 };
  if ("spell" in sound)
    return {
      items: [...sound.spell].map((letter) => ({ letter })),
      gap: sound.fast ? 0.3 : 0.6,
    };
  const parts = sound.seq.map(soundItems);
  return {
    items: parts.flatMap((part) => part.items),
    gap: Math.max(0.5, ...parts.map((part) => part.gap)),
  };
}

// Plays a Sound; several clips go through playSequence, which calls
// `onItem(i)` as each one starts.
export function playSound(sound: Sound, onItem?: (index: number) => void) {
  const { items, gap } = soundItems(sound);
  if (items.length === 1 && !onItem) {
    const item = items[0]!;
    if ("word" in item) playWord(item.word);
    else playLetter(item.letter);
    return;
  }
  playSequence(items, gap, onItem);
}

// Which question types have a 💡 hint (A7 in screens.md).
export function hasHint(q: Question): boolean {
  return ["choice", "sound", "sort", "build", "order", "tapWords", "capitals"].includes(q.type);
}

// Every word and letter clip a step can play, so the loader can fetch them
// ahead of time (setAudioWindow in word-audio.ts).
export function stepMedia(value: unknown): { words: string[]; letters: string[] } {
  const words = new Set<string>();
  const letters = new Set<string>();
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    const { word, letter, spell, hear, hearLetters } = record;
    if (typeof word === "string") words.add(word);
    if (typeof letter === "string") letters.add(letter);
    if (typeof spell === "string") for (const ch of spell) letters.add(ch);
    if (Array.isArray(hear)) for (const w of hear) words.add(String(w));
    if (Array.isArray(hearLetters)) for (const ch of hearLetters) letters.add(String(ch));
    Object.values(record).forEach(walk);
  };
  walk(value);
  return { words: [...words], letters: [...letters] };
}

// ---- Stars (result card and path) ----

const STARS_KEY = "wortwunder:stars";

// From Hard mistakes only: none -> 3, one or two -> 2, more -> 1.
export function starsFor(hardMistakes: number): number {
  return hardMistakes === 0 ? 3 : hardMistakes <= 2 ? 2 : 1;
}

function readStars(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STARS_KEY) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

export function getStars(testId: string): number {
  return readStars()[testId] ?? 0;
}

// Keeps the best run, so replaying for 3 stars never loses any.
export function saveStars(testId: string, stars: number) {
  const all = readStars();
  all[testId] = Math.max(all[testId] ?? 0, stars);
  try {
    localStorage.setItem(STARS_KEY, JSON.stringify(all));
  } catch {
    /* localStorage unavailable — stars still show on this result card */
  }
}

// ---- The learner's name, spelled (G1.2 C11) ----

const FALLBACK_NAME = "ANNA";

export function spellableName(name: string | undefined): { name: string; fallback: boolean } {
  const upper = (name ?? "").trim().toUpperCase();
  if (/^[A-Z]{1,10}$/.test(upper)) return { name: upper, fallback: false };
  return { name: FALLBACK_NAME, fallback: true };
}

// Three decoy letters that aren't in the name, always including E and I
// when the name lacks them (the tricksters).
export function nameDecoys(name: string): string[] {
  const picks = ["E", "I"].filter((ch) => !name.includes(ch));
  const rest = shuffle([..."AOUNMLRST"].filter((ch) => !name.includes(ch) && !picks.includes(ch)));
  return [...picks, ...rest].slice(0, 3);
}
