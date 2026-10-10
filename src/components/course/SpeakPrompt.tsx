import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mic, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonFrame } from "@/components/quiz/pieces";
import {
  CourseResult,
  SentenceAudioButtons,
  SentenceCard,
  SentenceLine,
} from "@/components/course/SentenceAudio";
import { cn } from "@/lib/utils";
import { checkSpoken, type SpeakQExercise } from "@/lib/course-engine";
import {
  canRecognizeSpeech,
  canRecord,
  hasSeenMicNote,
  isSpeakingOff,
  listenOnce,
  markMicNoteSeen,
  startRecording,
  subscribeSpeaking,
  turnSpeakingOff,
  type ListenFailure,
} from "@/lib/speech";
import { playSentence } from "@/lib/word-audio";
import type { Sentence } from "@/data/course/types";
import type { MotherTongue, Strings } from "@/lib/i18n";

// Whether the learner has said "Can't speak right now" this session.
export function useSpeakingOff(): boolean {
  return useSyncExternalStore(subscribeSpeaking, isSpeakingOff, () => false);
}

// The microphone part of a speaking exercise. Where the browser recognises
// speech, a tap listens once and `onResult` gets whether enough of one of
// the `targets` was heard, plus what was heard. Elsewhere the learner
// records themselves, plays it next to the `model`, and rates it: `onResult`
// gets their own verdict. "Can't speak right now" turns speaking off for the
// session (see src/lib/speech.ts); the screen using this reacts to that.
export function SpeakPrompt({
  t,
  targets,
  model,
  onResult,
}: {
  t: Strings;
  targets: string[];
  model: Sentence;
  onResult: (correct: boolean, heard?: string) => void;
}) {
  // Decided after mount: the server render knows nothing about the browser.
  const [mode, setMode] = useState<"recognize" | "record" | "none" | null>(null);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<ListenFailure | null>(null);
  const [recording, setRecording] = useState<string | null>(null);
  const [showNote, setShowNote] = useState(false);
  const stopRef = useRef<(() => Promise<string>) | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const recognize = canRecognizeSpeech();
    setMode(recognize ? "recognize" : canRecord() ? "record" : "none");
    setShowNote(recognize && !hasSeenMicNote());
    return () => cancelRef.current?.();
  }, []);
  useEffect(
    () => () => {
      if (recording) URL.revokeObjectURL(recording);
    },
    [recording],
  );

  const listen = () => {
    markMicNoteSeen();
    setFailure(null);
    setBusy(true);
    cancelRef.current = listenOnce((heard, why) => {
      setBusy(false);
      cancelRef.current = null;
      if (why) setFailure(why);
      else onResult(checkSpoken(targets, heard), heard[0]);
    });
  };

  const toggleRecording = async () => {
    if (busy && stopRef.current) {
      const url = await stopRef.current();
      stopRef.current = null;
      setBusy(false);
      setRecording(url);
      return;
    }
    setFailure(null);
    try {
      const { stop } = await startRecording();
      stopRef.current = stop;
      setRecording(null);
      setBusy(true);
    } catch {
      setFailure("blocked");
    }
  };

  return (
    <div className="my-5 flex flex-col items-center gap-3 text-center">
      {mode !== "none" && (
        <Button
          onClick={mode === "recognize" ? listen : () => void toggleRecording()}
          disabled={mode === null || (mode === "recognize" && busy)}
          aria-label={busy && mode === "record" ? t.stopRecording : t.tapToSpeak}
          className={cn(
            "size-24 rounded-full bg-berry text-primary-foreground shadow-[0_8px_0_var(--primary-shadow)] hover:bg-berry/90 active:translate-y-1 active:shadow-none disabled:opacity-100 [&_svg]:size-10",
            busy && "animate-pulse",
          )}
        >
          {busy && mode === "record" ? <Square /> : <Mic />}
        </Button>
      )}
      <p className="font-bold text-ink-soft">
        {failure === "blocked" || mode === "none"
          ? t.micBlocked
          : failure === "nothing"
            ? t.heardNothing
            : busy
              ? mode === "record"
                ? t.stopRecording
                : t.listening
              : t.tapToSpeak}
      </p>
      {showNote && <p className="max-w-sm text-xs font-bold text-ink-soft">{t.micNote}</p>}

      {recording && !busy && (
        <div className="w-full max-w-sm rounded-[24px] bg-card p-4 ring-1 ring-border">
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              className="rounded-2xl border-2"
              onClick={() => void new Audio(recording).play()}
            >
              <Volume2 /> {t.yourRecording}
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-2"
              onClick={() => playSentence(model)}
            >
              <Volume2 /> {t.modelRecording}
            </Button>
          </div>
          <p className="mt-3 font-display font-extrabold">{t.soundClose}</p>
          <div className="mt-2 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-2xl border-2"
              onClick={() => onResult(false)}
            >
              {t.notYet}
            </Button>
            <Button variant="adventure" className="flex-1" onClick={() => onResult(true)}>
              {t.yesClose}
            </Button>
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        className="font-bold text-ink-soft underline"
        onClick={turnSpeakingOff}
      >
        {t.cantSpeak}
      </Button>
    </div>
  );
}

// The `speak` exercise: read a German sentence aloud.
export function SpeakScreen({
  t,
  lang,
  sentence,
  onAnswer,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  sentence: Sentence;
  onAnswer: (correct: boolean) => void;
  onContinue: () => void;
}) {
  const [result, setResult] = useState<{ correct: boolean; heard?: string | undefined } | null>(
    null,
  );

  return (
    <>
      <LessonFrame t={t} eyebrow={t.speakingChallenge} title="Sprich nach" subtitle={t.readAloud}>
        <SentenceCard t={t} sentence={sentence} />
        <p className="-mt-2 text-center font-bold text-ink-soft">{sentence[lang]}</p>
        {result === null && (
          <SpeakPrompt
            t={t}
            targets={[sentence.german]}
            model={sentence}
            onResult={(correct, heard) => {
              setResult({ correct, heard });
              onAnswer(correct);
            }}
          />
        )}
      </LessonFrame>
      {result !== null && (
        <CourseResult
          t={t}
          lang={lang}
          correct={result.correct}
          sentence={sentence}
          note={result.heard ? t.heard(result.heard) : undefined}
          onContinue={onContinue}
        />
      )}
    </>
  );
}

// The `speakQ` task: hear a question (or read the cue) and answer aloud.
// Practice only: whatever was said, the model answer is shown afterwards,
// and with speaking turned off it is shown straight away.
export function SpeakQScreen({
  t,
  lang,
  exercise,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  exercise: SpeakQExercise;
  onContinue: () => void;
}) {
  const { task, question, models } = exercise;
  const speakingOff = useSpeakingOff();
  const [result, setResult] = useState<{ correct: boolean; heard?: string | undefined } | null>(
    null,
  );
  const model = models[0];
  const answered = result !== null || speakingOff || !model;

  useEffect(() => {
    if (question) playSentence(question);
  }, [question]);

  return (
    <LessonFrame t={t} eyebrow={t.speakingChallenge} title="Antworte" subtitle={task.cue[lang]}>
      {question && <SentenceAudioButtons t={t} sentence={question} />}
      {!answered && model && (
        <SpeakPrompt
          t={t}
          targets={models.map((m) => m.german)}
          model={model}
          onResult={(correct, heard) => setResult({ correct, heard })}
        />
      )}
      {answered && (
        <>
          <div
            className={cn(
              "rounded-[24px] bg-card p-4 ring-1 ring-border",
              result?.correct && "bg-success-soft ring-success",
            )}
          >
            {result?.heard && (
              <p className="mb-2 text-sm font-bold text-ink-soft">{t.heard(result.heard)}</p>
            )}
            {question && <SentenceLine t={t} lang={lang} sentence={question} />}
            <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
              {t.modelAnswer}
            </p>
            {model && <SentenceLine t={t} lang={lang} sentence={model} />}
          </div>
          <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onContinue}>
            Weiter
          </Button>
        </>
      )}
    </LessonFrame>
  );
}
