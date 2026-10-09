import { useEffect, useMemo, useState } from "react";
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
import {
  CourseResult,
  SentenceAudioButtons,
  SentenceCard,
} from "@/components/course/SentenceAudio";
import { courseIds, resolveWord } from "@/data/course";
import type { CourseLesson, CourseUnit, Sentence } from "@/data/course/types";
import {
  buildLessonQueue,
  checkBank,
  checkPick,
  exerciseMedia,
  isQuestion,
  requeueWrong,
  type BankExercise,
  type Exercise,
  type PickExercise,
  type QuestionExercise,
} from "@/lib/course-engine";
import {
  finishLesson,
  getSentenceStrength,
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
  const [queue, setQueue] = useState<Exercise[] | null>(null);
  const [index, setIndex] = useState(0);
  // Keys of the questions missed at least once, for the first-try score.
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState(0);
  const sentencesById = useMemo(
    () => new Map(lesson.sentences.map((s) => [s.id, s])),
    [lesson.sentences],
  );

  // Built after mount: it reads saved strengths from localStorage and
  // shuffles, neither of which the server render can match.
  useEffect(() => {
    preloadFeedbackSounds();
    reconcileCourse(courseIds());
    const built = buildLessonQueue(lesson, {
      lang,
      notes: unit.notes,
      resolveWord,
      strengthOf: getSentenceStrength,
    });
    setQueue(built);
    setQuestionCount(built.filter(isQuestion).length);
    setIndex(0);
    setMissed(new Set());
  }, [lesson, unit, lang]);

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
    if (finished && questionCount > 0) finishLesson(lesson.id, (firstTry / questionCount) * 100);
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
    setQueue((prev) => (prev ? requeueWrong(prev, question) : prev));
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
        {finished && (
          <LessonFrame
            t={t}
            eyebrow={`${unit.title} · ${lesson.title}`}
            title="Lektion geschafft!"
            subtitle={t.roundSuccess}
          >
            <div className="animate-pop rounded-3xl bg-sun/35 p-5 text-center ring-2 ring-sun">
              <Star className="mx-auto size-10 fill-sun text-foreground" />
              <p className="mt-1 font-display text-2xl font-extrabold">
                {t.lessonScore(firstTry, questionCount)}
              </p>
            </div>
            <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onExit}>
              {t.backToPath}
            </Button>
          </LessonFrame>
        )}

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

        {exercise && exercise.kind !== "tip" && exercise.kind !== "newWord" && (
          <>
            {exercise.kind === "listenPick" ? (
              <PickScreen
                key={exercise.key}
                t={t}
                lang={lang}
                exercise={exercise}
                sentencesById={sentencesById}
                onAnswer={(correct) => answered(exercise, correct)}
                onContinue={next}
              />
            ) : (
              <BankScreen
                key={exercise.key}
                t={t}
                lang={lang}
                exercise={exercise}
                onAnswer={(correct) => answered(exercise, correct)}
                onContinue={next}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}

function BankScreen({
  t,
  lang,
  exercise,
  onAnswer,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  exercise: BankExercise;
  onAnswer: (correct: boolean) => void;
  onContinue: () => void;
}) {
  const { sentence, kind } = exercise;
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  // The German is heard on arrival where the learner starts from it; for
  // bankToDe it is heard once the answer is in, as the model to compare with.
  useEffect(() => {
    if (kind !== "bankToDe") playSentence(sentence);
  }, [kind, sentence]);

  const check = () => {
    const correct = checkBank(
      exercise,
      picked.map((i) => exercise.tiles[i]!),
    );
    setResult(correct ? "correct" : "wrong");
    onAnswer(correct);
    if (kind === "bankToDe") setTimeout(() => playSentence(sentence), 500);
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
  }[kind];

  // The result sheet sits outside the frame: the frame's glass backdrop
  // would otherwise become the containing block of its fixed positioning.
  return (
    <>
      <LessonFrame t={t} {...frame}>
        {kind === "bankFromDe" && <SentenceCard t={t} sentence={sentence} />}
        {kind === "bankToDe" && <WordCard t={t} text={sentence[lang]} />}
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
}: {
  t: Strings;
  lang: MotherTongue;
  exercise: PickExercise;
  sentencesById: Map<string, Sentence>;
  onAnswer: (correct: boolean) => void;
  onContinue: () => void;
}) {
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
