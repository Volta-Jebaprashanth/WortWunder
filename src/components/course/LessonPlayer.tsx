import { useCallback, useEffect, useMemo, useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnswerGrid,
  Continue,
  LessonFrame,
  TrainingCard,
  WordCard,
} from "@/components/quiz/pieces";
import { WordBank } from "@/components/course/WordBank";
import { TipCard } from "@/components/course/TipCard";
import { GapSentence } from "@/components/course/GapSentence";
import { TypeAnswer } from "@/components/course/TypeAnswer";
import {
  CourseResult,
  SentenceAudioButtons,
  SentenceCard,
} from "@/components/course/SentenceAudio";
import { allSentences, checkpointSentences, courseIds, resolveWord } from "@/data/course";
import type { CourseLesson, CourseUnit, Sentence } from "@/data/course/types";
import {
  buildCheckpointQueue,
  buildLessonQueue,
  checkBank,
  checkGap,
  checkPick,
  checkpointPassed,
  checkTyped,
  exerciseMedia,
  isQuestion,
  requeueWrong,
  type BankExercise,
  type Exercise,
  type GapExercise,
  type PickExercise,
  type QuestionExercise,
  type TypedResult,
  type TypeExercise,
} from "@/lib/course-engine";
import {
  finishLesson,
  getSentenceStrength,
  passCheckpoint,
  recordSentenceAnswer,
  reconcileCourse,
} from "@/lib/course-store";
import { recordCorrectAnswer } from "@/lib/stats-store";
import { lookaheadQuestions, playSentence, setAudioWindow } from "@/lib/word-audio";
import { setImageWindow } from "@/lib/image-preload";
import { playCorrectSound, playWrongSound, preloadFeedbackSounds } from "@/lib/feedback-sound";
import type { MotherTongue, Strings } from "@/lib/i18n";

// Plays one course lesson from start to finish: the queue built by
// course-engine.ts, one screen at a time, with a progress bar on top and a
// summary at the end. A question answered wrongly shows the right answer and
// comes back at the end of the lesson until it is answered correctly.
export function LessonPlayer({
  unit,
  lesson,
  t,
  lang,
  onExit,
}: {
  unit: CourseUnit;
  lesson: CourseLesson;
  t: Strings;
  lang: MotherTongue;
  onExit: () => void;
}) {
  const build = useCallback(
    () =>
      buildLessonQueue(lesson, {
        lang,
        notes: unit.notes,
        resolveWord,
        strengthOf: getSentenceStrength,
      }),
    [lesson, unit, lang],
  );
  // A tip's examples may come from an earlier lesson of the unit.
  const sentences = useMemo(() => allSentences([unit]), [unit]);

  return (
    <ExercisePlayer
      t={t}
      lang={lang}
      build={build}
      sentences={sentences}
      requeue
      onExit={onExit}
      onFinished={(right, total) => finishLesson(lesson.id, (right / total) * 100)}
      summary={(right, total) => (
        <LessonFrame
          t={t}
          eyebrow={`${unit.title} · ${lesson.title}`}
          title="Lektion geschafft!"
          subtitle={t.roundSuccess}
        >
          <ScoreCard text={t.lessonScore(right, total)} />
          <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onExit}>
            {t.backToPath}
          </Button>
        </LessonFrame>
      )}
    />
  );
}

// Plays a unit's checkpoint: a mixed test over the whole unit in which every
// question is asked once. Enough right answers (see checkpointPassed) pass
// it, which completes the unit; otherwise the learner can try again with a
// freshly drawn test.
export function CheckpointPlayer({
  unit,
  t,
  lang,
  onExit,
}: {
  unit: CourseUnit;
  t: Strings;
  lang: MotherTongue;
  onExit: () => void;
}) {
  const [attempt, setAttempt] = useState(0);
  const pool = useMemo(() => checkpointSentences(unit), [unit]);
  const sentences = useMemo(() => allSentences([unit]), [unit]);
  const build = useCallback(() => buildCheckpointQueue(pool, { lang }), [pool, lang]);

  return (
    <ExercisePlayer
      key={attempt}
      t={t}
      lang={lang}
      build={build}
      sentences={sentences}
      requeue={false}
      onExit={onExit}
      onFinished={(right, total) => {
        if (checkpointPassed(right, total)) passCheckpoint(unit.id);
      }}
      summary={(right, total) => {
        const passed = checkpointPassed(right, total);
        return (
          <LessonFrame
            t={t}
            eyebrow={`${unit.title} · ${t.checkpoint}`}
            title={passed ? "Einheit geschafft!" : "Noch nicht geschafft"}
            subtitle={passed ? t.checkpointPassed : t.checkpointFailed}
          >
            <ScoreCard text={t.checkpointScore(right, total)} muted={!passed} />
            {!passed && (
              <Button
                variant="adventure"
                size="lesson"
                className="mt-6 w-full"
                onClick={() => setAttempt((n) => n + 1)}
              >
                {t.tryAgain}
              </Button>
            )}
            <Button
              variant={passed ? "adventure" : "outline"}
              size="lesson"
              className={passed ? "mt-6 w-full" : "mt-3 w-full rounded-2xl border-2"}
              onClick={onExit}
            >
              {t.backToPath}
            </Button>
          </LessonFrame>
        );
      }}
    />
  );
}

function ScoreCard({ text, muted = false }: { text: string; muted?: boolean }) {
  return (
    <div
      className={
        muted
          ? "rounded-3xl bg-ice p-5 text-center ring-2 ring-border"
          : "animate-pop rounded-3xl bg-sun/35 p-5 text-center ring-2 ring-sun"
      }
    >
      {!muted && <Star className="mx-auto size-10 fill-sun text-foreground" />}
      <p className="mt-1 font-display text-2xl font-extrabold">{text}</p>
    </div>
  );
}

// Runs a queue of exercises. `sentences` is everything a screen may need to
// look up by id (a tip's examples, the options of a listening question).
// With `requeue`, a missed question comes back at the end; without it every
// question is asked once. `onFinished` and `summary` get the number of
// questions answered right first time and the number asked.
function ExercisePlayer({
  t,
  lang,
  build,
  sentences,
  requeue,
  onExit,
  onFinished,
  summary,
}: {
  t: Strings;
  lang: MotherTongue;
  build: () => Exercise[];
  sentences: Sentence[];
  requeue: boolean;
  onExit: () => void;
  onFinished: (right: number, total: number) => void;
  summary: (right: number, total: number) => React.ReactNode;
}) {
  const [queue, setQueue] = useState<Exercise[] | null>(null);
  const [index, setIndex] = useState(0);
  // Keys of the questions missed at least once, for the first-try score.
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState(0);
  const sentencesById = useMemo(() => new Map(sentences.map((s) => [s.id, s])), [sentences]);

  // Built after mount: it reads saved strengths from localStorage and
  // shuffles, neither of which the server render can match.
  useEffect(() => {
    preloadFeedbackSounds();
    reconcileCourse(courseIds());
    const built = build();
    setQueue(built);
    setQuestionCount(built.filter(isQuestion).length);
    setIndex(0);
    setMissed(new Set());
  }, [build]);

  const exercise = queue?.[index];
  const finished = queue !== null && index >= queue.length;
  const firstTry = questionCount - missed.size;

  useEffect(() => {
    if (!queue || !exercise) return;
    const needs = (e: Exercise) => {
      const media = exerciseMedia(e);
      return { words: media.words, letters: [], sentenceIds: media.sentenceIds };
    };
    const upcoming = queue.slice(index + 1, index + 1 + lookaheadQuestions());
    setAudioWindow(needs(exercise), upcoming.map(needs));
    setImageWindow(
      exerciseMedia(exercise).images,
      upcoming.map((e) => exerciseMedia(e).images),
    );
  }, [queue, index, exercise]);

  useEffect(() => {
    if (finished && questionCount > 0) onFinished(firstTry, questionCount);
    // Recorded once, when the last screen is left.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const next = () => setIndex((i) => i + 1);
  const answered = (question: QuestionExercise, correct: boolean) => {
    recordSentenceAnswer(question.sentence.id, correct);
    if (correct) {
      recordCorrectAnswer();
      playCorrectSound();
      return;
    }
    playWrongSound();
    // A re-queued copy's key ends in "+": count it under the original.
    setMissed((prev) => new Set(prev).add(question.key.replace(/\++$/, "")));
    if (requeue) setQueue((prev) => (prev ? requeueWrong(prev, question) : prev));
  };

  const screen = (question: QuestionExercise) => {
    const common = {
      t,
      lang,
      onAnswer: (correct: boolean) => answered(question, correct),
      onContinue: next,
    };
    switch (question.kind) {
      case "listenPick":
        return (
          <PickScreen
            key={question.key}
            {...common}
            exercise={question}
            sentencesById={sentencesById}
          />
        );
      case "gap":
        return <GapScreen key={question.key} {...common} exercise={question} />;
      case "type":
      case "listenType":
        return <TypeScreen key={question.key} {...common} exercise={question} />;
      default:
        return <BankScreen key={question.key} {...common} exercise={question} />;
    }
  };

  return (
    <>
      <header className="relative z-20 mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onExit}
          aria-label={t.exitLesson}
          className="glass-panel grid size-11 shrink-0 place-items-center rounded-2xl"
        >
          <X className="size-5" />
        </button>
        <div
          className="h-4 flex-1 overflow-hidden rounded-full bg-ice ring-1 ring-border"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={queue?.length ?? 0}
          aria-valuenow={Math.min(index, queue?.length ?? 0)}
        >
          <div
            className="h-full rounded-full bg-mint transition-[width] duration-300"
            style={{ width: `${queue?.length ? Math.min(index / queue.length, 1) * 100 : 0}%` }}
          />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        {finished && summary(firstTry, questionCount)}

        {exercise?.kind === "tip" && (
          <TipCard
            key={exercise.key}
            t={t}
            lang={lang}
            note={exercise.note}
            examples={exercise.note.examples
              .map((id) => sentencesById.get(id))
              .filter((s): s is Sentence => Boolean(s))}
            onContinue={next}
          />
        )}

        {exercise?.kind === "newWord" && (
          <TrainingCard
            key={exercise.key}
            t={t}
            lang={lang}
            word={exercise.word}
            onContinue={next}
          />
        )}

        {exercise && isQuestion(exercise) && screen(exercise)}
      </main>
    </>
  );
}

interface ScreenProps {
  t: Strings;
  lang: MotherTongue;
  onAnswer: (correct: boolean) => void;
  onContinue: () => void;
}

function BankScreen({
  t,
  lang,
  exercise,
  onAnswer,
  onContinue,
}: ScreenProps & { exercise: BankExercise }) {
  const { sentence, kind } = exercise;
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  // Where the learner starts from the meaning, the German is heard once the
  // answer is in, as the model to compare with; elsewhere on arrival.
  const fromMeaning = kind === "bankToDe" || kind === "order";

  useEffect(() => {
    if (!fromMeaning) playSentence(sentence);
  }, [fromMeaning, sentence]);

  const check = () => {
    const correct = checkBank(
      exercise,
      picked.map((i) => exercise.tiles[i]!),
    );
    setResult(correct ? "correct" : "wrong");
    onAnswer(correct);
    if (fromMeaning) setTimeout(() => playSentence(sentence), 500);
  };

  const frame = {
    bankFromDe: {
      eyebrow: t.meaningCheck,
      title: "Was bedeutet das?",
      subtitle: t.buildMeaning,
    },
    bankToDe: {
      eyebrow: t.translationChallenge,
      title: "Wie sagt man das auf Deutsch?",
      subtitle: t.buildGerman,
    },
    listenBank: {
      eyebrow: t.listeningChallenge,
      title: "Was hörst du?",
      subtitle: t.listenBuildSentence,
    },
    order: {
      eyebrow: t.grammarChallenge,
      title: "Ordne die Wörter",
      subtitle: t.orderWords,
    },
  }[kind];

  // The result sheet sits outside the frame: the frame's glass backdrop
  // would otherwise become the containing block of its fixed positioning.
  return (
    <>
      <LessonFrame t={t} {...frame}>
        {kind === "bankFromDe" && <SentenceCard t={t} sentence={sentence} />}
        {fromMeaning && <WordCard t={t} text={sentence[lang]} />}
        {kind === "listenBank" && <SentenceAudioButtons t={t} sentence={sentence} />}
        <WordBank
          tiles={exercise.tiles}
          picked={picked}
          disabled={result !== null}
          result={result ?? undefined}
          onPick={(i) => setPicked((old) => [...old, i])}
          onUnpick={(position) => setPicked((old) => old.filter((_, i) => i !== position))}
        />
        {result === null && <Continue t={t} disabled={picked.length === 0} onClick={check} />}
      </LessonFrame>
      {result !== null && (
        <CourseResult
          t={t}
          lang={lang}
          correct={result === "correct"}
          sentence={sentence}
          onContinue={onContinue}
        />
      )}
    </>
  );
}

function PickScreen({
  t,
  lang,
  exercise,
  sentencesById,
  onAnswer,
  onContinue,
}: ScreenProps & { exercise: PickExercise; sentencesById: Map<string, Sentence> }) {
  const { sentence } = exercise;
  const [answer, setAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const options = exercise.optionIds
    .map((id) => sentencesById.get(id))
    .filter((s): s is Sentence => Boolean(s));

  useEffect(() => {
    playSentence(sentence);
  }, [sentence]);

  const check = () => {
    const pickedId = options.find((option) => option[lang] === answer)?.id ?? "";
    const correct = checkPick(exercise, pickedId);
    setResult(correct ? "correct" : "wrong");
    onAnswer(correct);
  };

  return (
    <>
      <LessonFrame
        t={t}
        eyebrow={t.listeningChallenge}
        title="Was hörst du?"
        subtitle={t.listenPickMeaning}
      >
        <SentenceAudioButtons t={t} sentence={sentence} />
        <AnswerGrid
          options={options.map((option) => option[lang])}
          selected={answer}
          correct={sentence[lang]}
          revealed={result !== null}
          onSelect={setAnswer}
          speak={false}
        />
        {result === null && <Continue t={t} disabled={!answer} onClick={check} />}
      </LessonFrame>
      {result !== null && (
        <CourseResult
          t={t}
          lang={lang}
          correct={result === "correct"}
          sentence={sentence}
          onContinue={onContinue}
        />
      )}
    </>
  );
}

function GapScreen({
  t,
  lang,
  exercise,
  onAnswer,
  onContinue,
}: ScreenProps & { exercise: GapExercise }) {
  const { sentence } = exercise;
  const [answer, setAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const check = () => {
    const correct = checkGap(exercise, answer ?? "");
    setResult(correct ? "correct" : "wrong");
    onAnswer(correct);
    setTimeout(() => playSentence(sentence), 500);
  };

  return (
    <>
      <LessonFrame t={t} eyebrow={t.grammarChallenge} title="Was fehlt?" subtitle={t.fillGap}>
        <GapSentence
          text={sentence.german}
          token={sentence.gap?.token ?? 0}
          filled={answer}
          result={result ?? undefined}
        />
        <p className="-mt-2 mb-5 text-center font-bold text-ink-soft">{sentence[lang]}</p>
        <AnswerGrid
          options={exercise.options}
          selected={answer}
          correct={exercise.answer}
          revealed={result !== null}
          onSelect={setAnswer}
          speak={false}
        />
        {result === null && <Continue t={t} disabled={!answer} onClick={check} />}
      </LessonFrame>
      {result !== null && (
        <CourseResult
          t={t}
          lang={lang}
          correct={result === "correct"}
          sentence={sentence}
          onContinue={onContinue}
        />
      )}
    </>
  );
}

function TypeScreen({
  t,
  lang,
  exercise,
  onAnswer,
  onContinue,
}: ScreenProps & { exercise: TypeExercise }) {
  const { sentence, kind } = exercise;
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<TypedResult | null>(null);

  useEffect(() => {
    if (kind === "listenType") playSentence(sentence);
  }, [kind, sentence]);

  const check = () => {
    const checked = checkTyped(sentence, typed);
    setResult(checked);
    onAnswer(checked.correct);
    if (kind === "type") setTimeout(() => playSentence(sentence), 500);
  };

  const frame =
    kind === "type"
      ? {
          eyebrow: t.translationChallenge,
          title: "Schreib auf Deutsch",
          subtitle: t.typeGerman,
        }
      : {
          eyebrow: t.listeningChallenge,
          title: "Schreib, was du hörst",
          subtitle: t.listenTypeSentence,
        };

  return (
    <>
      <LessonFrame t={t} {...frame}>
        {kind === "type" ? (
          <WordCard t={t} text={sentence[lang]} />
        ) : (
          <SentenceAudioButtons t={t} sentence={sentence} />
        )}
        <TypeAnswer
          t={t}
          value={typed}
          onChange={setTyped}
          onSubmit={check}
          disabled={result !== null}
          result={result ? (result.correct ? "correct" : "wrong") : undefined}
        />
        {result === null && <Continue t={t} disabled={!typed.trim()} onClick={check} />}
      </LessonFrame>
      {result !== null && (
        <CourseResult
          t={t}
          lang={lang}
          correct={result.correct}
          sentence={sentence}
          title={result.verdict === "almost" ? "Fast richtig!" : undefined}
          note={
            result.verdict === "almost"
              ? t.almostRight
              : result.verdict === "spelling"
                ? t.mindSpecialLetters
                : undefined
          }
          // The mark counts words of the German as authored, so it is left
          // out when the typing matched one of the accepted alternatives.
          markToken={result.target === sentence.german ? result.diffToken : undefined}
          onContinue={onContinue}
        />
      )}
    </>
  );
}
