import { useEffect, useRef } from "react";
import { Delete, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hasWordAudio, playWord } from "@/lib/word-audio";
import { bareToken } from "@/lib/grammar-engine";
import type { Tier } from "@/lib/quiz-engine";
import type { MotherTongue, Strings } from "@/lib/i18n";
import type { GrammarSentence, Localized, RuleCard } from "@/data/grammar/types";
import { ArticleWord, LessonFrame } from "@/components/quiz/pieces";

// Building blocks for the grammar quiz (GrammarQuiz.tsx). The shared frame,
// answer grids, match board and result card come from pieces.tsx; these are
// the parts only sentences need.

// Splits a token around the part a test is about: the focus letters
// ("ä" in "Mädchen") or the word without its punctuation ("lernt" in
// "lernt.").
function splitToken(token: string, part?: string): [string, string, string] {
  if (part) {
    let at = token.indexOf(part);
    if (at < 0) at = token.toLowerCase().indexOf(part.toLowerCase());
    if (at >= 0)
      return [token.slice(0, at), token.slice(at, at + part.length), token.slice(at + part.length)];
  }
  const bare = bareToken(token);
  return ["", bare, token.slice(bare.length)];
}

// A German sentence with one token marked: highlighted (`highlight`), or
// blanked out as a gap the learner fills (`gap`, showing `filled` once there
// is something to show).
export function SentenceLine({
  german,
  highlight,
  part,
  gap,
  filled,
  tone = "neutral",
}: {
  german: string;
  highlight?: number | undefined;
  part?: string | undefined;
  gap?: boolean;
  filled?: string | undefined;
  tone?: "neutral" | "right" | "wrong";
}) {
  return (
    <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
      {german.split(" ").map((token, i) => {
        if (i !== highlight) return <span key={i}>{token}</span>;
        const [before, mid, after] = splitToken(token, part);
        return (
          <span key={i}>
            {before}
            {gap ? (
              <span
                className={cn(
                  "mx-0.5 inline-block min-w-[2.5ch] border-b-4 border-dashed px-1 text-center",
                  tone === "neutral" && "border-ring/60",
                  tone === "right" && "border-success text-success",
                  tone === "wrong" && "border-destructive text-destructive",
                )}
              >
                {filled || " "}
              </span>
            ) : (
              // Letters inside a word get no padding, so the word still
              // reads as one ("Mädchen", not "M ä dchen").
              <span
                className={cn("rounded-md bg-sun/60", !/\p{L}/u.test(before + after) && "px-1")}
              >
                {mid}
              </span>
            )}
            {after}
          </span>
        );
      })}
    </span>
  );
}

// A sentence card: tap it to hear it, its meaning underneath.
export function SentenceCard({
  t,
  sentence,
  lang,
  showMeaning = true,
  ...line
}: {
  t: Strings;
  sentence: GrammarSentence;
  lang: MotherTongue;
  showMeaning?: boolean;
} & Omit<React.ComponentProps<typeof SentenceLine>, "german">) {
  return (
    <div className="mx-auto my-5 flex max-w-md flex-col items-center gap-2 rounded-[28px] bg-card px-6 py-5 text-center shadow-inner ring-1 ring-border">
      <button
        type="button"
        onClick={() => playWord(sentence.german)}
        aria-label={t.tapToHear(sentence.german)}
        className="inline-flex items-center gap-2 font-display text-2xl font-extrabold sm:text-3xl"
      >
        <SentenceLine german={sentence.german} {...line} />
        <Volume2 className="size-6 shrink-0 text-ink-soft" />
      </button>
      {showMeaning && <p className="font-bold text-ink-soft">{sentence.meaning[lang]}</p>}
    </div>
  );
}

// The body of the result card: the right sentence with its focus marked,
// its meaning, and after a miss one line saying why.
export function SentenceFeedback({
  t,
  sentence,
  lang,
  why,
}: {
  t: Strings;
  sentence: GrammarSentence;
  lang: MotherTongue;
  why?: string | undefined;
}) {
  return (
    <>
      <button
        type="button"
        onClick={() => playWord(sentence.german)}
        aria-label={t.tapToHear(sentence.german)}
        className="inline-flex items-center gap-2 font-display text-2xl font-extrabold"
      >
        <SentenceLine
          german={sentence.german}
          highlight={sentence.focus}
          part={sentence.focusPart}
        />
        <Volume2 className="size-6 shrink-0 text-ink-soft" />
      </button>
      <p className="font-bold text-ink-soft">{sentence.meaning[lang]}</p>
      {why && <p className="mt-2 text-sm font-bold">💡 {why}</p>}
    </>
  );
}

// The big round speaker button of the listening questions.
export function ListenButton({
  t,
  text,
  ready = true,
}: {
  t: Strings;
  text: string;
  ready?: boolean;
}) {
  return (
    <div className="my-5 flex justify-center">
      <Button
        onClick={() => playWord(text)}
        className="size-24 rounded-full bg-berry text-primary-foreground shadow-[0_8px_0_var(--primary-shadow)] hover:bg-berry/90 active:translate-y-1 active:shadow-none"
        aria-label={t.playGermanWord}
      >
        <Volume2 className={cn("size-10", !ready && "animate-pulse")} />
      </Button>
    </div>
  );
}

function localized(value: string | Localized, lang: MotherTongue): string {
  return typeof value === "string" ? value : value[lang];
}

// The Training tier's rule card: two or three example sentences (tap to
// hear), the rule in a line or two in the mother tongue, and an optional
// small table. Not a question; its check question follows it.
export function RuleIntro({
  t,
  lang,
  rule,
  sentences,
  tier,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  rule: RuleCard;
  sentences: Record<string, GrammarSentence>;
  tier?: Tier | undefined;
  onContinue: () => void;
}) {
  const examples = rule.examples.flatMap(({ id, highlight }) => {
    const sentence = sentences[id];
    return sentence ? [{ sentence, highlight: highlight ?? sentence.focus }] : [];
  });
  const first = examples[0]?.sentence.german;
  useEffect(() => {
    if (first) playWord(first);
  }, [first]);

  return (
    <LessonFrame
      t={t}
      eyebrow={`${t.training} · ${t.ruleCard}`}
      tier={tier}
      title="Neue Regel"
      subtitle={rule.title[lang]}
    >
      <div className="mx-auto max-w-md space-y-3">
        {examples.map(({ sentence, highlight }) => (
          <button
            key={sentence.id}
            type="button"
            onClick={() => playWord(sentence.german)}
            aria-label={t.tapToHear(sentence.german)}
            className="flex w-full items-center gap-3 rounded-[24px] bg-card p-4 text-left ring-1 ring-border transition hover:bg-card/80"
          >
            <Volume2 className="size-6 shrink-0 text-ink-soft" />
            <span className="min-w-0">
              <span className="block font-display text-2xl font-extrabold">
                <SentenceLine
                  german={sentence.german}
                  highlight={highlight}
                  part={highlight === sentence.focus ? sentence.focusPart : undefined}
                />
              </span>
              <span className="block font-bold text-ink-soft">{sentence.meaning[lang]}</span>
            </span>
          </button>
        ))}
        <p className="rounded-[24px] bg-sun/25 p-4 text-center font-bold ring-1 ring-sun">
          {rule.text[lang]}
        </p>
        {rule.table && (
          <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-3 gap-y-2 rounded-[24px] bg-card p-4 ring-1 ring-border">
            {rule.table.map((row) => (
              <TableRow key={row.left} left={row.left} right={localized(row.right, lang)} t={t} />
            ))}
          </div>
        )}
      </div>
      <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onContinue}>
        Weiter
      </Button>
    </LessonFrame>
  );
}

function TableRow({ t, left, right }: { t: Strings; left: string; right: string }) {
  return (
    <>
      <button
        type="button"
        onClick={() => playWord(left)}
        aria-label={t.tapToHear(left)}
        className="justify-self-end font-display text-xl font-extrabold"
      >
        <ArticleWord text={left} />
      </button>
      <span className="font-bold text-ink-soft">→</span>
      <span className="font-display text-lg font-extrabold">{right}</span>
    </>
  );
}

// Sort the tiles into groups (der / die / das, or Nomen / Verb / Pronomen):
// tap a tile, then the group it belongs in; tap a placed tile to take it
// back. `placement[i]` is the group of `items[i]`, null while in the tray.
export function SortBuckets({
  lang,
  groups,
  items,
  placement,
  selected,
  revealed,
  onSelect,
  onPlace,
}: {
  lang: MotherTongue;
  groups: { id: string; label: string; meaning: Localized }[];
  items: { text: string; group: string }[];
  placement: (string | null)[];
  selected: number | null;
  revealed: boolean;
  onSelect: (index: number | null) => void;
  onPlace: (index: number, group: string | null) => void;
}) {
  const tile = (i: number) => {
    const item = items[i]!;
    const placed = placement[i] ?? null;
    return (
      <button
        key={i}
        type="button"
        disabled={revealed}
        onClick={(e) => {
          e.stopPropagation();
          playWord(item.text);
          if (placed) onPlace(i, null);
          else onSelect(selected === i ? null : i);
        }}
        className={cn(
          "rounded-xl bg-card px-3 py-2 font-display text-base font-extrabold shadow-[0_3px_0_rgba(0,0,0,0.12)] ring-2 ring-border transition",
          selected === i && "ring-primary bg-primary/10",
          revealed && placed === item.group && "ring-success bg-success-soft",
          revealed && placed !== item.group && "ring-destructive bg-danger-soft",
        )}
      >
        <ArticleWord text={item.text} />
      </button>
    );
  };
  return (
    <div>
      <div className={cn("grid gap-3", groups.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
        {groups.map((group) => (
          <div
            key={group.id}
            role="button"
            tabIndex={revealed ? -1 : 0}
            onClick={() => {
              if (!revealed && selected !== null) onPlace(selected, group.id);
            }}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !revealed && selected !== null)
                onPlace(selected, group.id);
            }}
            className={cn(
              "flex min-h-40 flex-col items-center gap-2 rounded-[24px] bg-glass p-2 ring-2 ring-border transition sm:p-3",
              selected !== null &&
                !revealed &&
                "cursor-pointer ring-primary/60 hover:bg-primary/10",
            )}
          >
            <span className="text-center">
              <span className="block font-display text-base font-extrabold sm:text-lg">
                {group.label}
              </span>
              <span className="block text-[11px] font-bold leading-tight text-ink-soft">
                {group.meaning[lang]}
              </span>
            </span>
            <span className="flex flex-wrap justify-center gap-1.5">
              {items.map((_, i) => (placement[i] === group.id ? tile(i) : null))}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex min-h-12 flex-wrap justify-center gap-2">
        {items.map((_, i) => (placement[i] ? null : tile(i)))}
      </div>
    </div>
  );
}

// Build a sentence from word tiles: tap a tile to place it next, tap a placed
// tile to send it back. `placed` holds tile indices in sentence order; `end`
// is the sentence's closing mark, shown after the last slot. Tiles with a
// recorded clip are spoken on tap.
export function WordBuilder({
  t,
  tiles,
  placed,
  end,
  disabled,
  tone = "neutral",
  onPlace,
  onRemove,
  onReset,
}: {
  t: Strings;
  tiles: string[];
  placed: number[];
  end: string;
  disabled: boolean;
  tone?: "neutral" | "right" | "wrong";
  onPlace: (index: number) => void;
  onRemove: (position: number) => void;
  onReset: () => void;
}) {
  const say = (word: string) => {
    if (hasWordAudio(word)) playWord(word);
  };
  const tileClass =
    "rounded-xl bg-card px-3 py-2 font-display text-lg font-extrabold shadow-[0_3px_0_rgba(0,0,0,0.12)] ring-2 ring-border transition";
  return (
    <div className="my-5">
      <div
        className={cn(
          "flex min-h-16 flex-wrap items-center justify-center gap-2 border-b-4 border-dashed px-2 pb-3",
          tone === "neutral" && "border-ring/50",
          tone === "right" && "border-success",
          tone === "wrong" && "border-destructive",
        )}
      >
        {placed.map((tileIndex, position) => (
          <button
            key={`${tileIndex}-${position}`}
            type="button"
            disabled={disabled}
            onClick={() => onRemove(position)}
            className={tileClass}
          >
            {tiles[tileIndex]}
          </button>
        ))}
        {placed.length > 0 && <span className="font-display text-2xl font-extrabold">{end}</span>}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {tiles.map((tile, i) => (
          <button
            key={`${tile}-${i}`}
            type="button"
            disabled={disabled || placed.includes(i)}
            onClick={() => {
              say(tile);
              onPlace(i);
            }}
            className={cn(tileClass, placed.includes(i) && "opacity-30")}
          >
            {tile}
          </button>
        ))}
        <Button
          variant="tile"
          size="tile"
          disabled={disabled || placed.length === 0}
          onClick={onReset}
          aria-label={t.resetLetters}
          className="bg-sun shadow-[0_4px_0_oklch(0.72_0.14_91)]"
        >
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}

// Find the mistake: the sentence's words as buttons, plus "No mistake".
// `selected` is a word's index as a string, or "none".
export function SpotSentence({
  t,
  tokens,
  selected,
  revealed,
  correct,
  onSelect,
}: {
  t: Strings;
  tokens: string[];
  selected: string | null;
  revealed: boolean;
  correct: string;
  onSelect: (choice: string) => void;
}) {
  const tone = (choice: string) =>
    cn(
      !revealed && selected === choice && "ring-primary bg-primary/10",
      revealed && selected === choice && choice === correct && "ring-success bg-success-soft",
      revealed && selected === choice && choice !== correct && "ring-destructive bg-danger-soft",
    );
  return (
    <div className="my-5 space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {tokens.map((token, i) => (
          <button
            key={i}
            type="button"
            disabled={revealed}
            onClick={() => onSelect(String(i))}
            className={cn(
              "rounded-xl bg-card px-3 py-2 font-display text-xl font-extrabold ring-2 ring-border transition",
              tone(String(i)),
            )}
          >
            {token}
          </button>
        ))}
      </div>
      <Button
        variant="answer"
        disabled={revealed}
        onClick={() => onSelect("none")}
        className={cn("w-full", tone("none"))}
      >
        {t.noMistake}
      </Button>
    </div>
  );
}

// Typing the gap. `keys` are letter tiles (the answer's letters mixed with
// decoys, see gapKeys) so nobody needs a German keyboard; a tile inserts at
// the cursor, the last tile deletes. The phone keyboard works too.
export function GapInput({
  t,
  value,
  keys,
  onChange,
  onSubmit,
  disabled,
}: {
  t: Strings;
  value: string;
  keys: string[];
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const insert = (letter: string) => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? value.length;
    const end = input?.selectionEnd ?? value.length;
    onChange(value.slice(0, start) + letter + value.slice(end));
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + letter.length, start + letter.length);
    });
  };
  // Deletes the selection, or the letter before the cursor.
  const erase = () => {
    const input = inputRef.current;
    const end = input?.selectionEnd ?? value.length;
    const start = Math.min(input?.selectionStart ?? end, end);
    const from = start === end ? Math.max(0, start - 1) : start;
    onChange(value.slice(0, from) + value.slice(end));
    requestAnimationFrame(() => input?.setSelectionRange(from, from));
  };
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) onSubmit();
        }}
        placeholder={t.typeHere}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        className="h-14 w-full rounded-2xl border-2 border-border bg-glass px-4 text-center font-display text-2xl font-extrabold outline-none focus:border-primary"
        style={{ fontSize: 24 }}
      />
      <div className="flex flex-wrap justify-center gap-2">
        {keys.map((letter) => (
          <Button
            key={letter}
            variant="tile"
            size="tile"
            disabled={disabled}
            onClick={() => insert(letter)}
            aria-label={t.typeLetter(letter)}
          >
            {letter}
          </Button>
        ))}
        <Button
          variant="tile"
          size="tile"
          disabled={disabled || !value}
          onClick={erase}
          aria-label={t.deleteLetter}
          className="bg-sun shadow-[0_4px_0_oklch(0.72_0.14_91)]"
        >
          <Delete />
        </Button>
      </div>
    </div>
  );
}
