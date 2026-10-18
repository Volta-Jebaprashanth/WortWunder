import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Play, RotateCcw, Star, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { playLetter, playSequence, playWord } from "@/lib/word-audio";
import { playCorrectSound, playWrongSound } from "@/lib/feedback-sound";
import { shuffle, type Tier } from "@/lib/quiz-engine";
import {
  GRAMMAR_TIERS,
  nameDecoys,
  playSound,
  soundItems,
  spellableName,
  type Card,
  type ChatLine,
  type L,
  type Merke,
  type Prompt,
  type Question,
  type Sound,
  type Tone,
} from "@/lib/grammar-engine";
import { Continue, LessonFrame, LoadingImage, MatchPairs } from "@/components/quiz/pieces";
import { TierSteps } from "@/components/quiz/TierSteps";
import type { MotherTongue, Strings } from "@/lib/i18n";

// The screens of the grammar tests (GrammarQuiz.tsx): unscored teaching
// cards, the question types the vocabulary quiz doesn't have (sound choice,
// sort baskets, team-tile builder, tap the words, chat order, full scene),
// and the grammar result sheet. Wireframes: docs/grammar-planning/G1/screens.md.

const TONE_CLASSES: Record<Tone, string> = {
  nomen: "bg-sky-500/15 text-sky-700 ring-sky-500",
  verb: "bg-rose-500/15 text-rose-700 ring-rose-500",
  pronomen: "bg-emerald-500/15 text-emerald-700 ring-emerald-500",
  plain: "bg-card ring-border",
};

function Art({ art, size = "md" }: { art: string; size?: "md" | "lg" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto my-4 grid place-items-center rounded-[28px] bg-card shadow-inner ring-1 ring-border",
        size === "lg" ? "h-32 w-48 text-6xl" : "h-24 w-40 text-5xl",
      )}
    >
      {art}
    </div>
  );
}

function BigPlay({
  t,
  sound,
  autoplay,
}: {
  t: Strings;
  sound: Sound;
  autoplay?: boolean | undefined;
}) {
  useEffect(() => {
    if (autoplay) playSound(sound);
    // Plays once per screen; the sound object is fixed for a question.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="my-5 flex justify-center">
      <Button
        onClick={() => playSound(sound)}
        className="size-24 rounded-full bg-berry text-primary-foreground shadow-[0_8px_0_var(--primary-shadow)] hover:bg-berry/90 active:translate-y-1 active:shadow-none"
        aria-label={t.playGermanWord}
      >
        <Volume2 className="size-10" />
      </Button>
    </div>
  );
}

const SPEAKER_ICON = { cat: "🐱", mouse: "🐭", you: "🙂" } as const;

export function Bubble({
  t,
  lang,
  line,
  lit,
  empty,
}: {
  t: Strings;
  lang: MotherTongue;
  line?: ChatLine;
  lit?: boolean;
  // The reply slot: an empty "You" bubble.
  empty?: boolean;
}) {
  const mine = empty || line?.speaker === "you";
  const sound = line?.sound;
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[85%] flex-col", mine ? "items-end" : "items-start")}>
        <button
          type="button"
          disabled={!sound}
          onClick={() => sound && playSound(sound)}
          className={cn(
            "flex items-center gap-2 rounded-3xl px-4 py-2.5 font-display text-lg font-extrabold ring-2 transition",
            mine
              ? "rounded-br-md bg-primary/10 ring-primary/40"
              : "rounded-bl-md bg-card ring-border",
            lit && "ring-sun bg-sun/30",
          )}
        >
          {!mine && <span aria-hidden>{SPEAKER_ICON[line!.speaker]}</span>}
          {empty ? (
            <span className="tracking-[0.3em] text-ink-soft">▢▢▢</span>
          ) : line!.text ? (
            line!.text
          ) : (
            <Volume2 className="size-5" />
          )}
          {sound && line!.text && <Volume2 className="size-4 shrink-0 text-ink-soft" />}
          {mine && (
            <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              {t.you}
            </span>
          )}
        </button>
        {line?.meaning && (
          <span className="mt-0.5 px-2 text-xs font-bold text-ink-soft">
            ({line.meaning[lang]})
          </span>
        )}
      </div>
    </div>
  );
}

function ToneTiles({ tokens }: { tokens: { text: string; tone: Tone }[] }) {
  return (
    <div className="my-5 flex flex-wrap items-center justify-center gap-2">
      {tokens.map((token, i) => (
        <span
          key={i}
          className={cn(
            "rounded-2xl px-3 py-2 font-display text-xl font-extrabold ring-2",
            TONE_CLASSES[token.tone],
          )}
        >
          {token.text}
        </span>
      ))}
    </div>
  );
}

// The letters of a word as tiles, with "▢" as the gap the learner fills.
function PatternTiles({
  show,
  fill,
  fillState,
}: {
  show: string;
  fill?: string | null | undefined;
  fillState?: "right" | "wrong" | undefined;
}) {
  return (
    <div className="my-5 flex flex-wrap justify-center gap-2">
      {Array.from(show).map((ch, i) =>
        ch === "▢" ? (
          <span
            key={i}
            className={cn(
              "grid h-12 min-w-12 place-items-center rounded-xl border-2 bg-glass px-2 font-display text-xl font-extrabold",
              !fillState && "border-dashed border-ring/50",
              fillState === "right" && "border-success text-success",
              fillState === "wrong" && "border-destructive text-destructive",
            )}
          >
            {fill ?? ""}
          </span>
        ) : (
          <span
            key={i}
            className="grid size-12 place-items-center rounded-xl bg-card font-display text-xl font-extrabold ring-1 ring-border"
          >
            {ch}
          </span>
        ),
      )}
    </div>
  );
}

export function PromptView({
  t,
  lang,
  prompt,
  fill,
  fillState,
}: {
  t: Strings;
  lang: MotherTongue;
  prompt: Prompt;
  fill?: string | null;
  fillState?: "right" | "wrong" | undefined;
}) {
  return (
    <div>
      {prompt.image && (
        <div className="mx-auto my-4 flex flex-col items-center gap-2">
          <div className="size-36 overflow-hidden rounded-[28px] bg-card ring-1 ring-border">
            <LoadingImage
              src={prompt.image}
              alt=""
              className="size-full"
              imgClassName="object-cover"
            />
          </div>
          {prompt.caption && (
            <span className="rounded-full bg-glass px-3 py-1 text-xs font-bold text-ink-soft ring-1 ring-border">
              {prompt.caption[lang]}
            </span>
          )}
        </div>
      )}
      {prompt.art && <Art art={prompt.art} />}
      {prompt.context && (
        <p className="mb-3 text-center font-bold text-ink-soft">{prompt.context[lang]}</p>
      )}
      {prompt.chat && (
        <div className="my-4 space-y-2">
          {prompt.chat.map((line, i) => (
            <Bubble key={i} t={t} lang={lang} line={line} />
          ))}
          {prompt.replySlot && <Bubble t={t} lang={lang} empty />}
        </div>
      )}
      {prompt.colored && <ToneTiles tokens={prompt.colored} />}
      {prompt.sound && !prompt.chat && (
        <BigPlay t={t} sound={prompt.sound} autoplay={prompt.autoplay} />
      )}
      {prompt.chat && prompt.sound && prompt.autoplay && <AutoPlay sound={prompt.sound} />}
      {prompt.show && prompt.showStyle === "pattern" && (
        <PatternTiles show={prompt.show} fill={fill} fillState={fillState} />
      )}
      {prompt.show && prompt.showStyle === "big" && (
        <div className="mx-auto my-5 grid size-28 place-items-center rounded-[28px] bg-card font-display text-6xl font-extrabold shadow-inner ring-1 ring-border">
          {prompt.show}
        </div>
      )}
      {prompt.show && (prompt.showStyle === "word" || !prompt.showStyle) && (
        <div className="mx-auto my-5 grid min-h-24 max-w-xs place-items-center rounded-[28px] bg-card px-6 py-4 text-center font-display text-3xl font-extrabold shadow-inner ring-1 ring-border">
          {prompt.show}
        </div>
      )}
    </div>
  );
}

function AutoPlay({ sound }: { sound: Sound }) {
  useEffect(() => {
    playSound(sound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function WeiterButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button
      variant="adventure"
      size="lesson"
      className="mt-6 w-full"
      disabled={disabled}
      onClick={onClick}
    >
      Weiter
    </Button>
  );
}

function HearChip({
  text,
  onClick,
  tone = "plain",
}: {
  text: string;
  onClick: () => void;
  tone?: Tone | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display font-extrabold ring-2 transition hover:brightness-95",
        TONE_CLASSES[tone],
      )}
    >
      {text} <Volume2 className="size-4 shrink-0 text-ink-soft" />
    </button>
  );
}

export function MerkeBox({ t, lang, merke }: { t: Strings; lang: MotherTongue; merke: Merke }) {
  return (
    <div className="rounded-[24px] bg-sun/30 p-4 ring-2 ring-sun">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
        {t.remember}
      </p>
      <p className="mt-1 font-display text-lg font-extrabold">★ {merke.line[lang]}</p>
      {merke.examples.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {merke.examples.map((example) => (
            <HearChip
              key={example.text}
              text={example.text}
              onClick={() => example.sound && playSound(example.sound)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CardView({
  t,
  lang,
  card,
  merke,
  tier,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  card: Card;
  merke: Merke;
  tier?: Tier | undefined;
  onContinue: () => void;
}) {
  switch (card.kind) {
    case "letters":
      return <LettersCard t={t} lang={lang} card={card} tier={tier} onContinue={onContinue} />;
    case "info":
      return (
        <LessonFrame
          t={t}
          eyebrow={t.training}
          tier={tier}
          tiers={GRAMMAR_TIERS}
          title={card.title}
          subtitle={card.subtitle[lang]}
        >
          {card.art && <Art art={card.art} size="lg" />}
          <div className="space-y-3">
            {card.rows.map((row, i) => (
              <div key={i} className="rounded-[22px] bg-card p-4 ring-1 ring-border">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {row.big && (
                    <span
                      className={cn(
                        "rounded-xl px-2.5 py-1 font-display text-xl font-extrabold ring-2",
                        TONE_CLASSES[row.tone ?? "plain"],
                      )}
                    >
                      {row.big}
                    </span>
                  )}
                  <span className="font-bold">{row.text[lang]}</span>
                </div>
                {(row.hear?.length || row.hearLetters?.length) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {row.hearLetters?.map((letter) => (
                      <HearChip key={letter} text={letter} onClick={() => playLetter(letter)} />
                    ))}
                    {row.hear?.map((word) => (
                      <HearChip
                        key={word}
                        text={word}
                        tone={row.tone}
                        onClick={() => playWord(word)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <WeiterButton onClick={onContinue} />
        </LessonFrame>
      );
    case "spell":
      return <SpellCard t={t} lang={lang} card={card} tier={tier} onContinue={onContinue} />;
    case "merke":
      return (
        <LessonFrame
          t={t}
          eyebrow={t.remember}
          tier={tier}
          tiers={GRAMMAR_TIERS}
          title="Merke!"
          subtitle={t.remember}
        >
          <Art art="🐱💡" />
          <MerkeBox t={t} lang={lang} merke={merke} />
          <WeiterButton onClick={onContinue} />
        </LessonFrame>
      );
    case "scene":
      return <SceneCard t={t} lang={lang} card={card} tier={tier} onContinue={onContinue} />;
    case "say":
      return <SayCard t={t} card={card} onContinue={onContinue} />;
  }
}

function LettersCard({
  t,
  lang,
  card,
  tier,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  card: Extract<Card, { kind: "letters" }>;
  tier?: Tier | undefined;
  onContinue: () => void;
}) {
  const [heard, setHeard] = useState<Set<number>>(new Set());
  const [lit, setLit] = useState<number | null>(null);
  const hear = (i: number) => setHeard((prev) => new Set([...prev, i]));
  return (
    <LessonFrame
      t={t}
      eyebrow={t.training}
      tier={tier}
      tiers={GRAMMAR_TIERS}
      title={card.title}
      subtitle={card.subtitle[lang]}
    >
      <p className="mb-3 text-center font-display text-lg font-extrabold">{card.heading[lang]}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {card.tiles.map((tile, i) => (
          <button
            key={tile.letter}
            type="button"
            onClick={() => {
              playLetter(tile.letter);
              hear(i);
            }}
            className={cn(
              "flex flex-col items-center rounded-2xl bg-card py-2 ring-2 ring-border transition",
              heard.has(i) && "ring-success/60",
              lit === i && "bg-sun/40 ring-sun",
            )}
          >
            <span className="font-display text-3xl font-extrabold">{tile.letter}</span>
            <span className="text-xs font-bold text-ink-soft">{tile.sound}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          className="rounded-xl border-2 font-display font-extrabold"
          onClick={() =>
            playSequence(
              card.tiles.map((tile) => ({ letter: tile.letter })),
              0.35,
              (i) => {
                setLit(i);
                hear(i);
              },
            )
          }
        >
          <Play /> {t.playAll}
        </Button>
      </div>
      <WeiterButton onClick={onContinue} disabled={heard.size < card.tiles.length} />
    </LessonFrame>
  );
}

function SpellCard({
  t,
  lang,
  card,
  tier,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  card: Extract<Card, { kind: "spell" }>;
  tier?: Tier | undefined;
  onContinue: () => void;
}) {
  const [lit, setLit] = useState<number | null>(null);
  const play = () => playSound({ spell: card.name }, setLit);
  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LessonFrame
      t={t}
      eyebrow={t.training}
      tier={tier}
      tiers={GRAMMAR_TIERS}
      title={card.title}
      subtitle={card.subtitle[lang]}
    >
      {card.art && <Art art={card.art} size="lg" />}
      <div className="my-4 flex items-center justify-center gap-2">
        {Array.from(card.name).map((ch, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="font-extrabold text-ink-soft">—</span>}
            <span
              className={cn(
                "grid size-14 place-items-center rounded-2xl bg-card font-display text-3xl font-extrabold ring-2 ring-border transition",
                lit !== null && i <= lit && "bg-sun/40 ring-sun",
              )}
            >
              {ch}
            </span>
          </span>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="rounded-xl border-2 font-display font-extrabold"
          onClick={play}
        >
          <Play /> {t.playAgain}
        </Button>
      </div>
      <WeiterButton onClick={onContinue} />
    </LessonFrame>
  );
}

function SceneCard({
  t,
  lang,
  card,
  tier,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  card: Extract<Card, { kind: "scene" }>;
  tier?: Tier | undefined;
  onContinue: () => void;
}) {
  const [lit, setLit] = useState<number | null>(null);
  // Which line each sequence item belongs to, so the right bubble lights up.
  const owners = card.lines.flatMap((line, i) =>
    line.sound ? soundItems(line.sound).items.map(() => i) : [],
  );
  const playScene = () =>
    playSound({ seq: card.lines.flatMap((line) => (line.sound ? [line.sound] : [])) }, (i) =>
      setLit(owners[i] ?? null),
    );
  return (
    <LessonFrame
      t={t}
      eyebrow={t.training}
      tier={tier}
      tiers={GRAMMAR_TIERS}
      title={card.title}
      subtitle={card.subtitle[lang]}
    >
      <Art art={card.art} size="lg" />
      <div className="space-y-3">
        {card.lines.map((line, i) => (
          <Bubble key={i} t={t} lang={lang} line={line} lit={lit === i} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          className="rounded-xl border-2 font-display font-extrabold"
          onClick={playScene}
        >
          <Play /> {t.playScene}
        </Button>
      </div>
      <WeiterButton onClick={onContinue} />
    </LessonFrame>
  );
}

function SayCard({
  t,
  card,
  onContinue,
}: {
  t: Strings;
  card: Extract<Card, { kind: "say" }>;
  onContinue: () => void;
}) {
  const word = "word" in card.sound ? card.sound.word : undefined;
  useEffect(() => {
    playSound(card.sound);
  }, [card.sound]);
  return (
    <LessonFrame
      t={t}
      eyebrow={t.sayItAfterMe}
      title={card.text}
      subtitle={t.listenThenSay}
      onTitle={() => playSound(card.sound)}
    >
      <Art art="🐱🗣️" size="lg" />
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          className="rounded-xl border-2 font-display font-extrabold"
          onClick={() => playSound(card.sound)}
        >
          <Volume2 /> {t.hearAgain}
        </Button>
        {word && (
          <Button
            variant="outline"
            className="rounded-xl border-2 font-display font-extrabold"
            onClick={() => playWord(word, { slow: true })}
          >
            🐢 {t.slowly}
          </Button>
        )}
      </div>
      <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onContinue}>
        {t.iSaidIt} <Check />
      </Button>
      <button
        type="button"
        onClick={onContinue}
        className="mx-auto mt-3 block font-bold text-ink-soft underline-offset-4 hover:underline"
      >
        {t.skip} →
      </button>
    </LessonFrame>
  );
}

const LEVEL_DOTS = ["🟣", "🔵", "🟡", "🔴"];

export function LevelBanner({
  t,
  tier,
  onContinue,
}: {
  t: Strings;
  tier: Tier;
  onContinue: () => void;
}) {
  const level = Math.max(0, GRAMMAR_TIERS.indexOf(tier));
  return (
    <section className="glass-panel animate-pop mx-auto mt-10 max-w-md rounded-[28px] p-6 text-center sm:p-8">
      <div className="flex justify-center">
        <TierSteps tier={tier} tiers={GRAMMAR_TIERS} />
      </div>
      <p className="mt-4 font-display text-2xl font-extrabold">
        {LEVEL_DOTS[level]} {t.levelWord} {level + 1} · {t.levelNames[level]}
      </p>
      <p className="mt-1 font-bold text-ink-soft">{t.levelLines[level]}</p>
      <WeiterButton onClick={onContinue} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export interface CheckResult {
  correct: boolean;
  // The wrong option the learner chose (choice screens).
  picked?: { text: string; sound?: Sound | undefined } | undefined;
  // What they built vs the right build (build / type / order screens).
  typed?: { typed: string[]; answer: string[] } | undefined;
  // Shown on warm-up and pause questions, which reveal the answer.
  answerText?: string | undefined;
}

export interface QuestionProps {
  t: Strings;
  lang: MotherTongue;
  q: Question;
  // How many times 💡 was tapped on this attempt.
  hints: number;
  // The result sheet is up: inputs freeze and Check hides.
  locked: boolean;
  profileName?: string | undefined;
  onCheck: (result: CheckResult) => void;
  // A miss inside a screen that handles its own feedback (match, scene).
  onMiss: () => void;
}

export function QuestionView(props: QuestionProps) {
  switch (props.q.type) {
    case "choice":
      return <ChoiceQuestion {...props} q={props.q} />;
    case "sound":
      return <SoundQuestion {...props} q={props.q} />;
    case "sort":
      return <SortQuestion {...props} q={props.q} />;
    case "build":
    case "order":
      return <BuildQuestion {...props} q={props.q} />;
    case "type":
      return <TypeQuestion {...props} q={props.q} />;
    case "tapWords":
    case "capitals":
      return <TapQuestion {...props} q={props.q} />;
    case "match":
      return <MatchQuestion {...props} q={props.q} />;
    case "scene":
      return <SceneQuestion {...props} q={props.q} />;
  }
}

function optionSoundOf(
  q: Extract<Question, { type: "choice" }>,
  option: string,
): Sound | undefined {
  const clean = option.replace(/[!?.,]/g, "").trim();
  switch (q.optionSound) {
    case "letter":
      return { letter: clean };
    case "word":
      return { word: clean };
    case "spell":
      return { spell: clean };
    default:
      return undefined;
  }
}

function selectClass(selected: boolean, revealed: boolean, right: boolean) {
  return cn(
    !revealed && selected && "border-primary bg-primary/10",
    revealed && selected && right && "border-success bg-success-soft",
    revealed && selected && !right && "border-destructive bg-danger-soft",
  );
}

function ChoiceQuestion({
  t,
  lang,
  q,
  hints,
  locked,
  onCheck,
}: QuestionProps & { q: Extract<Question, { type: "choice" }> }) {
  const options = useMemo(() => shuffle(q.options), [q]);
  const [selected, setSelected] = useState<string | null>(null);
  const wrong = options.filter((option) => option !== q.answer);
  const greyed = new Set(wrong.slice(0, Math.min(hints, options.length - 2)));
  const letters = q.optionStyle === "letter";
  return (
    <>
      <PromptView
        t={t}
        lang={lang}
        prompt={q.prompt}
        fill={locked ? selected : null}
        fillState={locked ? (selected === q.answer ? "right" : "wrong") : undefined}
      />
      <div
        className={cn(
          letters ? "flex flex-wrap justify-center gap-3" : "grid grid-cols-1 gap-3 sm:grid-cols-2",
          !letters && options.length === 3 && "sm:grid-cols-3",
        )}
      >
        {options.map((option) => (
          <Button
            key={option}
            variant={letters ? "tile" : "answer"}
            size={letters ? "tile" : undefined}
            disabled={locked || greyed.has(option)}
            onClick={() => setSelected(option)}
            className={cn(
              greyed.has(option) && "opacity-30",
              selectClass(selected === option, locked, option === q.answer),
            )}
          >
            {option}
          </Button>
        ))}
      </div>
      {!locked && (
        <Continue
          t={t}
          disabled={!selected}
          onClick={() =>
            onCheck({
              correct: selected === q.answer,
              picked: { text: selected!, sound: optionSoundOf(q, selected!) },
              answerText: q.answer,
            })
          }
        />
      )}
    </>
  );
}

function SoundQuestion({
  t,
  q,
  hints,
  locked,
  onCheck,
}: QuestionProps & { q: Extract<Question, { type: "sound" }> }) {
  // Index 0 of q.sounds is the right one; the buttons show them shuffled.
  const order = useMemo(() => shuffle(q.sounds.map((_, i) => i)), [q]);
  const [selected, setSelected] = useState<number | null>(null);
  const greyed = new Set(order.filter((i) => i !== 0).slice(0, Math.min(hints, order.length - 2)));
  return (
    <>
      <div className="mx-auto my-5 grid min-h-28 min-w-28 max-w-xs place-items-center rounded-[28px] bg-card px-6 font-display text-5xl font-extrabold shadow-inner ring-1 ring-border">
        {q.show}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {order.map((soundIndex, i) => (
          <Button
            key={soundIndex}
            variant="answer"
            disabled={locked || greyed.has(soundIndex)}
            onClick={() => {
              playSound(q.sounds[soundIndex]!);
              setSelected(soundIndex);
            }}
            className={cn(
              "flex-col gap-1 py-4",
              greyed.has(soundIndex) && "opacity-30",
              selectClass(selected === soundIndex, locked, soundIndex === 0),
            )}
          >
            <Volume2 className="size-6" />
            <span className="text-sm">{t.soundN(i + 1)}</span>
          </Button>
        ))}
      </div>
      <p className="mt-3 text-center text-sm font-bold text-ink-soft">{t.tapSoundToChoose}</p>
      {!locked && (
        <Continue
          t={t}
          disabled={selected === null}
          onClick={() =>
            onCheck({
              correct: selected === 0,
              picked: {
                text: t.soundN(order.indexOf(selected!) + 1),
                sound: q.sounds[selected!],
              },
            })
          }
        />
      )}
    </>
  );
}

function SortQuestion({
  t,
  lang,
  q,
  hints,
  locked,
  onCheck,
}: QuestionProps & { q: Extract<Question, { type: "sort" }> }) {
  const order = useMemo(() => shuffle(q.items.map((_, i) => i)), [q]);
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [checkedWrong, setCheckedWrong] = useState(false);

  // Each hint drops one item that isn't in its right basket yet into it.
  useEffect(() => {
    if (hints === 0) return;
    setPlaced((prev) => {
      const next = order.find((i) => prev[i] !== q.items[i]!.basket);
      return next === undefined ? prev : { ...prev, [next]: q.items[next]!.basket };
    });
  }, [hints, order, q]);

  const tapItem = (i: number) => {
    if (locked) return;
    const sound = q.items[i]!.sound;
    if (sound) playSound(sound);
    if (placed[i]) {
      setPlaced(({ [i]: _removed, ...rest }) => rest);
      return;
    }
    setSelected(selected === i ? null : i);
  };
  const tapBasket = (basket: string) => {
    if (locked || selected === null) return;
    setPlaced((prev) => ({ ...prev, [selected]: basket }));
    setSelected(null);
  };
  const allPlaced = order.every((i) => placed[i]);
  const tray = order.filter((i) => !placed[i]);

  return (
    <>
      {q.sentence && (
        <button
          type="button"
          onClick={() => playWord(q.sentence!)}
          className="mx-auto mb-4 flex items-center gap-2 rounded-[22px] bg-card px-5 py-3 font-display text-2xl font-extrabold ring-1 ring-border"
        >
          {q.sentence} <Volume2 className="size-5 text-ink-soft" />
        </button>
      )}
      <p className="mb-2 text-center text-sm font-bold text-ink-soft">{t.tapToPlace}</p>
      <div className="flex min-h-14 flex-wrap justify-center gap-2">
        {tray.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => tapItem(i)}
            className={cn(
              "rounded-2xl bg-card px-4 py-2 font-display text-lg font-extrabold ring-2 ring-border transition",
              selected === i && "ring-primary bg-primary/10 -translate-y-1",
            )}
          >
            {q.items[i]!.text}
          </button>
        ))}
      </div>
      <div
        className={cn(
          "mt-4 grid gap-2 sm:gap-3",
          q.baskets.length === 3 ? "grid-cols-3" : "grid-cols-2",
        )}
      >
        {q.baskets.map((basket) => (
          <button
            key={basket.id}
            type="button"
            onClick={() => tapBasket(basket.id)}
            className={cn(
              "flex min-h-36 flex-col items-center gap-2 rounded-[22px] p-2 ring-2 transition sm:p-3",
              TONE_CLASSES[basket.tone ?? "plain"],
              selected !== null && "ring-4",
            )}
          >
            <span className="text-center text-sm font-extrabold sm:text-base">
              {basket.label[lang]}
            </span>
            <span className="flex flex-wrap justify-center gap-1.5">
              {order
                .filter((i) => placed[i] === basket.id)
                .map((i) => (
                  <span
                    key={i}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      tapItem(i);
                    }}
                    className={cn(
                      "rounded-xl bg-card px-2.5 py-1 font-display font-extrabold text-foreground ring-1 ring-border",
                      checkedWrong &&
                        locked &&
                        placed[i] !== q.items[i]!.basket &&
                        "bg-danger-soft ring-2 ring-destructive",
                    )}
                  >
                    {q.items[i]!.text}
                  </span>
                ))}
            </span>
          </button>
        ))}
      </div>
      {!locked && (
        <Continue
          t={t}
          disabled={!allPlaced}
          onClick={() => {
            const correct = order.every((i) => placed[i] === q.items[i]!.basket);
            setCheckedWrong(!correct);
            onCheck({ correct });
          }}
        />
      )}
    </>
  );
}

interface Tile {
  id: number;
  text: string;
  speaker?: ChatLine["speaker"] | undefined;
}

const tileKey = (tile: { text: string; speaker?: string | undefined }) =>
  `${tile.speaker ?? ""}|${tile.text}`;

function BuildQuestion({
  t,
  lang,
  q,
  hints,
  locked,
  profileName,
  onCheck,
}: QuestionProps & { q: Extract<Question, { type: "build" | "order" }> }) {
  // The answer as tiles (text + speaker for chat bubbles), plus the prompt —
  // "Spell YOUR name" builds both from the profile name.
  const setup = useMemo(() => {
    if (q.type === "order")
      return {
        answer: q.bubbles.map((b) => ({ text: b.text, speaker: b.speaker })),
        decoys: [] as { text: string; speaker?: ChatLine["speaker"] }[],
        prompt: undefined as Prompt | undefined,
        fallback: false,
      };
    if (q.dynamic === "yourName") {
      const { name, fallback } = spellableName(profileName);
      return {
        answer: Array.from(name).map((text) => ({ text })),
        decoys: nameDecoys(name).map((text) => ({ text })),
        prompt: { ...q.prompt, sound: { spell: name } } as Prompt,
        fallback,
      };
    }
    return {
      answer: q.answer.map((text) => ({ text })),
      decoys: q.decoys.map((text) => ({ text })),
      prompt: q.prompt,
      fallback: false,
    };
  }, [q, profileName]);
  const tiles = useMemo<Tile[]>(
    () => shuffle([...setup.answer, ...setup.decoys]).map((tile, id) => ({ ...tile, id })),
    [setup],
  );
  const [placed, setPlaced] = useState<number[]>([]);
  const slots = setup.answer.length;
  const style = q.type === "order" ? "bubble" : (q.tileStyle ?? "letter");

  // Each hint lays the first `hints` tiles of the right answer, in place.
  useEffect(() => {
    if (hints === 0) return;
    const used = new Set<number>();
    const prefix: number[] = [];
    for (const want of setup.answer.slice(0, hints)) {
      const tile = tiles.find((tl) => !used.has(tl.id) && tileKey(tl) === tileKey(want));
      if (!tile) break;
      used.add(tile.id);
      prefix.push(tile.id);
    }
    setPlaced(prefix);
  }, [hints, setup, tiles]);

  const tap = (tile: Tile) => {
    if (locked || placed.length >= slots || placed.includes(tile.id)) return;
    if (style === "letter" && tile.text.length === 1) playLetter(tile.text);
    setPlaced((prev) => [...prev, tile.id]);
  };
  const remove = (position: number) => {
    if (locked) return;
    setPlaced((prev) => prev.filter((_, i) => i !== position));
  };
  const byId = (id: number) => tiles[id]!;
  const punct = q.type === "build" ? q.punct : undefined;

  return (
    <>
      {setup.prompt && <PromptView t={t} lang={lang} prompt={setup.prompt} />}
      {setup.fallback && q.type === "build" && q.fallbackNote && (
        <p className="mb-2 text-center font-bold text-ink-soft">{q.fallbackNote[lang]}</p>
      )}
      {style === "bubble" ? (
        <ol className="my-4 space-y-2">
          {Array.from({ length: slots }).map((_, i) => {
            const id = placed[i];
            return (
              <li key={i} className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-card font-extrabold ring-1 ring-border">
                  {i + 1}
                </span>
                {id === undefined ? (
                  <span className="h-12 flex-1 rounded-2xl border-2 border-dashed border-ring/50 bg-glass" />
                ) : (
                  <button type="button" className="flex-1" onClick={() => remove(i)}>
                    <Bubble
                      t={t}
                      lang={lang}
                      line={{ speaker: byId(id).speaker!, text: byId(id).text }}
                    />
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="my-5 flex min-h-14 flex-wrap items-center justify-center gap-2">
          {Array.from({ length: slots }).map((_, i) => {
            const id = placed[i];
            return (
              <span key={i} className="flex items-end gap-0.5">
                {id === undefined ? (
                  <span
                    className={cn(
                      "grid h-12 place-items-center rounded-xl border-2 border-dashed border-ring/50 bg-glass",
                      style === "word" ? "w-20" : "w-12",
                    )}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    disabled={locked}
                    className={cn(
                      "grid h-12 min-w-12 place-items-center rounded-xl bg-card px-2 font-display text-xl font-extrabold ring-1 ring-border",
                    )}
                  >
                    {byId(id).text}
                  </button>
                )}
                {punct?.[i] && (
                  <span className="pb-1 font-display text-2xl font-extrabold">{punct[i]}</span>
                )}
              </span>
            );
          })}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {tiles.map((tile) =>
          style === "bubble" ? (
            <button
              key={tile.id}
              type="button"
              disabled={locked || placed.includes(tile.id)}
              onClick={() => tap(tile)}
              className={cn("transition", placed.includes(tile.id) && "opacity-30")}
            >
              <Bubble t={t} lang={lang} line={{ speaker: tile.speaker!, text: tile.text }} />
            </button>
          ) : (
            <Button
              key={tile.id}
              variant="tile"
              size="tile"
              disabled={locked || placed.includes(tile.id) || placed.length >= slots}
              onClick={() => tap(tile)}
              className={cn(tile.text.length > 1 && "w-auto min-w-12 px-3")}
            >
              {tile.text}
            </Button>
          ),
        )}
        <Button
          variant="tile"
          size="tile"
          disabled={locked}
          onClick={() => setPlaced([])}
          aria-label={t.resetLetters}
          className="bg-sun shadow-[0_4px_0_oklch(0.72_0.14_91)]"
        >
          <RotateCcw />
        </Button>
      </div>
      {!locked && (
        <Continue
          t={t}
          disabled={placed.length !== slots}
          onClick={() => {
            const built = placed.map(byId);
            const correct = built.every((tile, i) => tileKey(tile) === tileKey(setup.answer[i]!));
            onCheck({
              correct,
              typed: {
                typed: built.map((tile) => tile.text),
                answer: setup.answer.map((tile) => tile.text),
              },
            });
          }}
        />
      )}
    </>
  );
}

function TypeQuestion({
  t,
  lang,
  q,
  locked,
  onCheck,
}: QuestionProps & { q: Extract<Question, { type: "type" }> }) {
  const [value, setValue] = useState("");
  return (
    <>
      <button
        type="button"
        onClick={() => playWord(q.show)}
        className="mx-auto my-5 flex min-h-24 max-w-xs items-center justify-center gap-2 rounded-[28px] bg-card px-6 py-4 font-display text-3xl font-extrabold shadow-inner ring-1 ring-border"
      >
        {q.show} <Volume2 className="size-6 text-ink-soft" />
      </button>
      <input
        type="text"
        value={value}
        disabled={locked}
        // A–Z only: this screen practises typing without ä ö ü ß keys.
        onChange={(e) => setValue(e.target.value.replace(/[^a-zA-Z]/g, ""))}
        placeholder={t.typeHere}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-center font-display text-2xl font-extrabold tracking-wider outline-none focus:border-primary"
        style={{ fontSize: 22 }}
      />
      {q.note && <p className="mt-2 text-center text-sm font-bold text-ink-soft">{q.note[lang]}</p>}
      {!locked && (
        <Continue
          t={t}
          disabled={value.length === 0}
          onClick={() =>
            onCheck({
              correct: value.toLowerCase() === q.answer.toLowerCase(),
              typed: { typed: [...value.toLowerCase()], answer: [...q.answer.toLowerCase()] },
            })
          }
        />
      )}
    </>
  );
}

// "Tap all the Nomen" (tap whole words) and "Fix the capitals" (tap the
// letters that must be big).
function TapQuestion({
  t,
  q,
  hints,
  locked,
  onCheck,
}: QuestionProps & { q: Extract<Question, { type: "tapWords" | "capitals" }> }) {
  const words = q.type === "tapWords";
  const units = useMemo(() => (words ? q.sentence.split(" ") : Array.from(q.sentence)), [q, words]);
  const targets = useMemo(() => {
    if (q.type === "tapWords")
      return new Set(
        units
          .map((unit, i) => [unit.replace(/[^\p{L}]/gu, ""), i] as const)
          .filter(([word]) => q.targets.includes(word))
          .map(([, i]) => i),
      );
    const fixed = Array.from(q.fixed);
    return new Set(units.map((ch, i) => (fixed[i] !== ch ? i : -1)).filter((i) => i >= 0));
  }, [q, units]);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  // After a hint, one right word / letter not tapped yet wiggles until tapped.
  const wiggle = hints > 0 ? [...targets].find((i) => !tapped.has(i)) : undefined;

  const toggle = (i: number) => {
    if (locked) return;
    setTapped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  const correctNow = tapped.size === targets.size && [...targets].every((i) => tapped.has(i));

  return (
    <>
      <div
        className={cn("my-6 flex flex-wrap items-end justify-center", words ? "gap-3" : "gap-1")}
      >
        {units.map((unit, i) => {
          const tappable = /\p{L}/u.test(unit);
          if (!tappable)
            return (
              <span
                key={i}
                className={cn("font-display text-3xl font-extrabold", unit === " " && "w-3")}
              >
                {unit}
              </span>
            );
          const on = tapped.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={cn(
                "rounded-xl font-display text-3xl font-extrabold ring-2 transition",
                words ? "px-3 py-1.5" : "grid h-12 min-w-9 place-items-center px-1",
                on ? (words ? TONE_CLASSES.nomen : "bg-sun/40 ring-sun") : "bg-card ring-border",
                wiggle === i && "animate-bounce ring-primary",
              )}
            >
              {!words && on ? unit.toUpperCase() : unit}
            </button>
          );
        })}
      </div>
      {!locked && (
        <Continue
          t={t}
          disabled={tapped.size === 0}
          onClick={() => onCheck({ correct: correctNow })}
        />
      )}
    </>
  );
}

function MatchQuestion({
  t,
  lang,
  q,
  onCheck,
  onMiss,
}: QuestionProps & { q: Extract<Question, { type: "match" }> }) {
  const words = useMemo(
    () =>
      q.pairs.map(([left, right], i) => ({
        id: String(i),
        full: left,
        icon: "",
        english: right,
        tamil: right,
        sinhala: right,
      })),
    [q],
  );
  const missed = useRef(false);
  return (
    <MatchPairs
      t={t}
      lang={lang}
      words={words}
      onAttempt={(_, isCorrect) => {
        if (!isCorrect && !missed.current) {
          missed.current = true;
          onMiss();
        }
      }}
      onComplete={() => onCheck({ correct: true })}
      title="Super!"
      actionLabel="Weiter"
    />
  );
}

function SceneQuestion({
  t,
  lang,
  q,
  onCheck,
  onMiss,
}: QuestionProps & { q: Extract<Question, { type: "scene" }> }) {
  const [turn, setTurn] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const current = q.turns[turn];

  useEffect(() => {
    if (current?.sound) playSound(current.sound);
  }, [current]);

  const pick = (word: string) => {
    if (!current) return;
    if (word === current.answer) {
      playCorrectSound();
      setWrong(null);
      if (turn + 1 >= q.turns.length) onCheck({ correct: true });
      setTurn(turn + 1);
    } else {
      playWrongSound();
      setWrong(word);
      onMiss();
    }
  };

  return (
    <>
      <p className="mb-2 text-right text-xs font-extrabold uppercase tracking-wider text-ink-soft">
        {t.turnOf(Math.min(turn + 1, q.turns.length), q.turns.length)}
      </p>
      <div className="space-y-2">
        {q.turns.slice(0, turn + 1).map((step, i) => (
          <div key={i} className="space-y-2">
            {step.art && i === turn && <Art art={step.art} />}
            {step.context && i === turn && (
              <p className="text-center font-bold text-ink-soft">{step.context[lang]}</p>
            )}
            {step.line && (
              <Bubble
                t={t}
                lang={lang}
                line={{
                  speaker: step.speaker ?? "cat",
                  text: step.line,
                  ...(step.sound ? { sound: step.sound } : {}),
                }}
              />
            )}
            {i < turn ? (
              <Bubble t={t} lang={lang} line={{ speaker: "you", text: `${step.answer}!` }} />
            ) : (
              <Bubble t={t} lang={lang} empty />
            )}
          </div>
        ))}
      </div>
      {wrong && (
        <p className="mt-3 rounded-2xl bg-danger-soft p-3 text-center font-bold text-destructive">
          ✖ {wrong}? Fast! Versuch's nochmal.
        </p>
      )}
      {turn < q.turns.length && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {q.bank.map((word) => (
            <Button
              key={word}
              variant="tile"
              className="h-12 px-4 font-display text-lg"
              onClick={() => pick(word)}
            >
              {word}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Result sheet (A4 / A5 / A6)
// ---------------------------------------------------------------------------

function TokenRow({ tokens, tone }: { tokens: string[]; tone: (i: number) => "right" | "wrong" }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {tokens.map((token, i) => (
        <span
          key={i}
          className={cn(
            "grid h-10 min-w-10 place-items-center rounded-xl border-2 px-1.5 font-display text-lg font-extrabold",
            tone(i) === "right"
              ? "border-success bg-success-soft text-success"
              : "border-destructive bg-danger-soft text-destructive",
          )}
        >
          {token}
        </span>
      ))}
    </div>
  );
}

export function GrammarSheet({
  t,
  lang,
  result,
  tip,
  reveal,
  revealAnswer,
  actionLabel,
  onAction,
}: {
  t: Strings;
  lang: MotherTongue;
  result: CheckResult;
  tip?: L | undefined;
  reveal?: L | undefined;
  // Warm-up / pause: a miss shows the right answer and moves on.
  revealAnswer?: boolean;
  actionLabel: string;
  onAction: () => void;
}) {
  const { correct, picked, typed } = result;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4">
      <div
        className={cn(
          "animate-slide-in-up max-h-[80dvh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(0,0,0,0.18)] sm:p-7",
          correct ? "bg-success-soft" : "bg-danger-soft",
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full",
              correct ? "bg-success" : "bg-destructive",
            )}
          >
            {correct ? (
              <Check className="text-primary-foreground" />
            ) : (
              <X className="text-primary-foreground" />
            )}
          </span>
          <div className="min-w-0">
            <p
              className={cn(
                "font-display text-xl font-extrabold",
                correct ? "text-success" : "text-destructive",
              )}
            >
              {correct ? "Richtig!" : revealAnswer ? "Fast!" : "Fast! Versuch's nochmal."}
            </p>
            {correct && reveal && <p className="text-sm font-bold text-ink-soft">{reveal[lang]}</p>}
            {!correct && revealAnswer && result.answerText && (
              <p className="text-sm font-bold text-ink-soft">{t.answerWas(result.answerText)}</p>
            )}
            {!correct && tip && <p className="text-sm font-bold text-ink-soft">💡 {tip[lang]}</p>}
          </div>
        </div>
        {!correct && !revealAnswer && picked && (
          <div className="mt-4 flex flex-col items-center gap-2 rounded-3xl bg-card p-4 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
              {t.youChose}
            </p>
            <button
              type="button"
              disabled={!picked.sound}
              onClick={() => picked.sound && playSound(picked.sound)}
              className="inline-flex items-center gap-2 font-display text-3xl font-extrabold"
            >
              {picked.text}
              {picked.sound && <Volume2 className="size-7 shrink-0 text-ink-soft" />}
            </button>
          </div>
        )}
        {!correct && typed && (
          <div className="mt-4 flex flex-col items-center gap-2 rounded-3xl bg-card p-4 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
              {t.youWrote}
            </p>
            <TokenRow
              tokens={typed.typed}
              tone={(i) => (typed.typed[i] === typed.answer[i] ? "right" : "wrong")}
            />
            <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
              {t.correctSpelling}
            </p>
            <TokenRow tokens={typed.answer} tone={() => "right"} />
          </div>
        )}
        <Button variant="adventure" size="lesson" className="mt-4 w-full" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export function StarsRow({ stars, size = "lg" }: { stars: number; size?: "sm" | "lg" }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <Star
          key={i}
          className={cn(
            size === "lg" ? "size-10" : "size-3.5",
            i < stars ? "fill-sun text-foreground" : "text-ink-soft/40",
          )}
        />
      ))}
    </span>
  );
}
