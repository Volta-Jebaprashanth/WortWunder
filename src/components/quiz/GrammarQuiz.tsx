import { useEffect, useMemo, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonFrame } from "@/components/quiz/pieces";
import {
  CardView,
  GrammarSheet,
  LevelBanner,
  MerkeBox,
  QuestionView,
  StarsRow,
  type CheckResult,
} from "@/components/quiz/grammar-pieces";
import {
  GRAMMAR_TIERS,
  buildGrammarRound,
  enterGrammarTest,
  grammarRowType,
  hasHint,
  saveStars,
  starsFor,
  stepMedia,
  type GrammarStep,
  type GrammarTest,
  type L,
  type Merke,
  type Question,
} from "@/lib/grammar-engine";
import { recordFail, recordPass } from "@/lib/progress-store";
import { recordCorrectAnswer } from "@/lib/stats-store";
import { playCorrectSound, playWrongSound, preloadFeedbackSounds } from "@/lib/feedback-sound";
import { lookaheadQuestions, setAudioWindow } from "@/lib/word-audio";
import type { Tier } from "@/lib/quiz-engine";
import type { MotherTongue, Strings } from "@/lib/i18n";

// Runs one grammar test (G1.2 Das ABC, ...): two unscored warm-up questions
// from the test before, then the four levels, each opened by a banner.
// Rules from docs/grammar-planning/G1/plan.md §3:
//   - every question starts at 1 pending; a right answer -1, the first miss
//     on an appearance +2 (capped per level, Hard 5 — progress-store.ts);
//   - a miss shows the tip and "Try again" on the same question;
//   - 💡 (Simple and Medium only) means a right answer doesn't count down;
//   - three misses in a row -> a Pause card (the Merke rule again plus one
//     easy unscored question), then back to the question;
//   - stars come from Hard mistakes; the best run is kept.

export interface GrammarBadge {
  title: string;
  line: L;
  can: L[];
  merkes: Merke[];
}

type Phase =
  | { kind: "warmup"; index: number }
  | { kind: "banner"; tier: Tier }
  | { kind: "intro"; card: number }
  | { kind: "question" }
  | { kind: "pause"; stage: "merke" | "question" }
  | { kind: "finish" }
  | { kind: "badge" };

const FREE_MISSES_BEFORE_PAUSE = 3;

export function GrammarQuiz({
  test,
  t,
  lang,
  profileName,
  badge,
  startTier,
  onExit,
}: {
  test: GrammarTest;
  t: Strings;
  lang: MotherTongue;
  profileName?: string | undefined;
  // Shown after the finish screen when this test completes the section.
  badge?: GrammarBadge | undefined;
  // Start over at this level (picked in the level popup); resume when unset.
  startTier?: Tier | undefined;
  onExit: () => void;
}) {
  const [queue, setQueue] = useState<GrammarStep[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase | null>(null);
  const [shownTier, setShownTier] = useState<Tier | null>(null);
  // Bumped to remount a question for a fresh attempt.
  const [attemptKey, setAttemptKey] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [missStreak, setMissStreak] = useState(0);
  const [hardMistakes, setHardMistakes] = useState(0);
  const [score, setScore] = useState({ questions: 0, mistakes: 0 });
  const [stars, setStars] = useState(0);

  const step: GrammarStep | undefined = queue[index];
  // One easy Training question, asked unscored on the Pause card: a Training
  // check the learner has already met (at or before the current question).
  const pauseQuestion = useMemo<Question | undefined>(() => {
    if (phase?.kind !== "pause") return undefined;
    const upTo = step ? test.steps.indexOf(step) : test.steps.length - 1;
    const choices = test.steps
      .slice(0, upTo + 1)
      .filter((s) => s.tier === "training" && s.q.type === "choice");
    return choices[Math.floor(Math.random() * choices.length)]?.q;
    // Picked once when the pause opens, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase?.kind === "pause", test]);

  const resetAttempt = () => {
    setAttempts(0);
    setHints(0);
    setHintUsed(false);
    setResult(null);
    setAttemptKey((k) => k + 1);
  };

  const startStep = (steps: GrammarStep[], i: number) => {
    setIndex(i);
    resetAttempt();
    setPhase(steps[i]?.intro?.length ? { kind: "intro", card: 0 } : { kind: "question" });
  };

  const finish = () => {
    const earned = starsFor(hardMistakes);
    saveStars(test.id, earned);
    setStars(earned);
    setResult(null);
    setPhase({ kind: "finish" });
  };

  const beginRound = (steps: GrammarStep[]) => {
    if (steps.length === 0) return finish();
    if (steps[0]!.tier !== shownTier) {
      setIndex(0);
      setResult(null);
      setPhase({ kind: "banner", tier: steps[0]!.tier });
      return;
    }
    startStep(steps, 0);
  };

  useEffect(() => {
    preloadFeedbackSounds();
    enterGrammarTest(test, startTier);
    const first = buildGrammarRound(test);
    setQueue(first);
    if (test.warmup.length > 0) setPhase({ kind: "warmup", index: 0 });
    else if (first.length === 0) setPhase({ kind: "finish" });
    else setPhase({ kind: "banner", tier: first[0]!.tier });
  }, [test, startTier]);

  // Fetch the clips this step and the next few can play.
  useEffect(() => {
    if (!step) return;
    const upcoming = queue.slice(index + 1, index + 1 + lookaheadQuestions());
    setAudioWindow(
      stepMedia(step),
      upcoming.map((next) => stepMedia(next)),
    );
  }, [queue, index, step]);

  const goNext = () => {
    if (index + 1 < queue.length) return startStep(queue, index + 1);
    const next = buildGrammarRound(test);
    setQueue(next);
    beginRound(next);
  };

  const registerMiss = (penalty?: number) => {
    if (!step) return;
    if (attempts === 0) {
      recordFail(test.id, grammarRowType(step.tier), step.q.id, penalty);
      setScore((s) => ({ ...s, mistakes: s.mistakes + 1 }));
      if (step.tier === "hard") setHardMistakes((m) => m + 1);
    }
    setAttempts((a) => a + 1);
  };

  const registerPass = () => {
    if (!step) return;
    if (!hintUsed) recordPass(test.id, grammarRowType(step.tier), step.q.id);
    setScore((s) => ({ ...s, questions: s.questions + 1 }));
    setMissStreak(0);
  };

  const onCheck = (res: CheckResult) => {
    if (res.correct) {
      recordCorrectAnswer();
      playCorrectSound();
    } else playWrongSound();
    if (phase?.kind === "warmup" || phase?.kind === "pause") {
      setResult(res);
      return;
    }
    if (!step) return;
    // A match board ends on its own "Super!" button: no sheet after it.
    if (step.q.type === "match") {
      registerPass();
      return goNext();
    }
    setResult(res);
    if (res.correct) registerPass();
    else {
      registerMiss();
      setMissStreak((n) => n + 1);
    }
  };

  const sheetAction = () => {
    if (!phase || !result) return;
    if (phase.kind === "warmup") {
      setResult(null);
      setAttemptKey((k) => k + 1);
      if (phase.index + 1 < test.warmup.length)
        setPhase({ kind: "warmup", index: phase.index + 1 });
      else beginRound(queue);
      return;
    }
    if (phase.kind === "pause") {
      resetAttempt();
      setAttempts(1); // the miss that opened the pause already counted
      setPhase({ kind: "question" });
      return;
    }
    if (result.correct) return goNext();
    if (missStreak >= FREE_MISSES_BEFORE_PAUSE) {
      setMissStreak(0);
      setResult(null);
      setPhase({ kind: "pause", stage: "merke" });
      return;
    }
    // Same question again; the first miss already cost its +2.
    setResult(null);
    setHints(0);
    setAttemptKey((k) => k + 1);
  };

  const tier = step?.tier;
  const showHint =
    phase?.kind === "question" &&
    step &&
    (tier === "easy" || tier === "medium") &&
    hasHint(step.q) &&
    !result;

  const isWarmup = phase?.kind === "warmup";
  const isPauseQuestion = phase?.kind === "pause" && phase.stage === "question";
  const sheetQuestion: Question | undefined = isWarmup
    ? test.warmup[phase.index]
    : isPauseQuestion
      ? pauseQuestion
      : step?.q;

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 pb-10 sm:px-6">
      {phase?.kind === "warmup" && test.warmup[phase.index] && (
        <LessonFrame
          t={t}
          eyebrow={t.warmUp}
          title={test.warmup[phase.index]!.title}
          subtitle={`${t.fromLastTime} · ${test.warmup[phase.index]!.subtitle[lang]}`}
        >
          <QuestionView
            key={`warmup-${phase.index}-${attemptKey}`}
            t={t}
            lang={lang}
            q={test.warmup[phase.index]!}
            hints={0}
            locked={result !== null}
            profileName={profileName}
            onCheck={onCheck}
            onMiss={() => {}}
          />
        </LessonFrame>
      )}

      {phase?.kind === "banner" && (
        <LevelBanner
          t={t}
          tier={phase.tier}
          onContinue={() => {
            setShownTier(phase.tier);
            startStep(queue, 0);
          }}
        />
      )}

      {phase?.kind === "intro" && step?.intro?.[phase.card] && (
        <CardView
          key={`${index}-${phase.card}-${attemptKey}`}
          t={t}
          lang={lang}
          card={step.intro[phase.card]!}
          merke={test.merke}
          tier={step.tier}
          onContinue={() =>
            setPhase(
              phase.card + 1 < step.intro!.length
                ? { kind: "intro", card: phase.card + 1 }
                : { kind: "question" },
            )
          }
        />
      )}

      {phase?.kind === "question" && step && (
        <LessonFrame
          t={t}
          eyebrow={
            step.tier === "training"
              ? `${t.training} · ${step.q.eyebrow[lang]}`
              : step.q.eyebrow[lang]
          }
          tier={step.tier}
          tiers={GRAMMAR_TIERS}
          title={step.q.title}
          subtitle={step.q.subtitle[lang]}
        >
          <QuestionView
            key={attemptKey}
            t={t}
            lang={lang}
            q={step.q}
            hints={hints}
            locked={result !== null}
            profileName={profileName}
            onCheck={onCheck}
            onMiss={() => registerMiss(step.q.type === "match" ? 1 : undefined)}
          />
          {showHint && (
            <div className="mt-3 text-center">
              <Button
                variant="ghost"
                className="font-display font-extrabold"
                onClick={() => {
                  setHints((h) => h + 1);
                  setHintUsed(true);
                }}
              >
                <Lightbulb /> {t.hint}
              </Button>
              <p className="text-xs font-bold text-ink-soft">{t.hintNote}</p>
            </div>
          )}
        </LessonFrame>
      )}

      {phase?.kind === "pause" && phase.stage === "merke" && (
        <LessonFrame t={t} eyebrow={t.pause} title="Pause" subtitle={t.pauseLine}>
          <div
            aria-hidden
            className="mx-auto my-4 grid h-28 w-44 place-items-center rounded-[28px] bg-card text-6xl ring-1 ring-border"
          >
            🐱☕
          </div>
          <MerkeBox t={t} lang={lang} merke={test.merke} />
          <Button
            variant="adventure"
            size="lesson"
            className="mt-6 w-full"
            onClick={() =>
              pauseQuestion
                ? setPhase({ kind: "pause", stage: "question" })
                : (resetAttempt(), setAttempts(1), setPhase({ kind: "question" }))
            }
          >
            Weiter
          </Button>
        </LessonFrame>
      )}

      {isPauseQuestion && pauseQuestion && (
        <LessonFrame
          t={t}
          eyebrow={t.pause}
          title={pauseQuestion.title}
          subtitle={pauseQuestion.subtitle[lang]}
        >
          <QuestionView
            key={`pause-${attemptKey}`}
            t={t}
            lang={lang}
            q={pauseQuestion}
            hints={0}
            locked={result !== null}
            profileName={profileName}
            onCheck={onCheck}
            onMiss={() => {}}
          />
        </LessonFrame>
      )}

      {phase?.kind === "finish" && (
        <LessonFrame t={t} eyebrow={t.roundUp} title="Geschafft!" subtitle={t.roundSuccess}>
          <div className="my-4 flex justify-center" aria-label={t.starsLabel(stars)}>
            <StarsRow stars={stars} />
          </div>
          {score.questions > 0 && (
            <p className="mb-4 rounded-[24px] bg-card p-4 text-center font-display text-xl font-extrabold ring-1 ring-border">
              {t.resultSummary(score.questions, score.mistakes)}
            </p>
          )}
          <MerkeBox t={t} lang={lang} merke={test.merke} />
          <Button
            variant="adventure"
            size="lesson"
            className="mt-6 w-full"
            onClick={badge ? () => setPhase({ kind: "badge" }) : onExit}
          >
            {badge ? "Weiter" : t.backToPath}
          </Button>
        </LessonFrame>
      )}

      {phase?.kind === "badge" && badge && (
        <section className="glass-panel animate-pop mx-auto max-w-3xl rounded-[28px] p-5 text-center sm:p-8">
          <p className="text-5xl" aria-hidden>
            🎉🏅🎉
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{badge.title}</h1>
          <p className="font-bold text-ink-soft">{badge.line[lang]}</p>
          <ul className="mx-auto mt-4 max-w-sm space-y-1 text-left font-bold">
            {badge.can.map((line, i) => (
              <li key={i}>✔ {line[lang]}</li>
            ))}
          </ul>
          <div className="mt-5 space-y-3 text-left">
            {badge.merkes.map((merke, i) => (
              <MerkeBox key={i} t={t} lang={lang} merke={merke} />
            ))}
          </div>
          <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onExit}>
            {t.backToPath}
          </Button>
        </section>
      )}

      {result && sheetQuestion && (
        <GrammarSheet
          t={t}
          lang={lang}
          result={result}
          tip={sheetQuestion.tip}
          reveal={sheetQuestion.reveal}
          revealAnswer={isWarmup || isPauseQuestion}
          actionLabel={result.correct || isWarmup || isPauseQuestion ? "Weiter" : t.tryAgain}
          onAction={sheetAction}
        />
      )}
    </main>
  );
}
