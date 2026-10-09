import { useSyncExternalStore } from "react";
import { Check, Loader2, Turtle, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isSentenceReady, playSentence, subscribeAudio } from "@/lib/word-audio";
import type { Sentence } from "@/data/course/types";
import type { MotherTongue, Strings } from "@/lib/i18n";

// The big "play" button of a listening exercise, with a smaller one beside
// it that plays the slow recording.
export function SentenceAudioButtons({ t, sentence }: { t: Strings; sentence: Sentence }) {
  const ready = useSyncExternalStore(
    subscribeAudio,
    () => isSentenceReady(sentence.id),
    () => true,
  );
  return (
    <div className="my-5 flex items-end justify-center gap-4">
      <Button
        onClick={() => playSentence(sentence)}
        className="size-24 rounded-full bg-berry text-primary-foreground shadow-[0_8px_0_var(--primary-shadow)] hover:bg-berry/90 active:translate-y-1 active:shadow-none [&_svg]:size-10"
        aria-label={t.playSentence}
      >
        {ready ? <Volume2 className="size-10" /> : <Loader2 className="size-10 animate-spin" />}
      </Button>
      <Button
        onClick={() => playSentence(sentence, true)}
        className="size-14 rounded-full bg-sun text-foreground shadow-[0_5px_0_oklch(0.72_0.14_91)] hover:bg-sun/90 active:translate-y-1 active:shadow-none [&_svg]:size-6"
        aria-label={t.playSlowly}
      >
        <Turtle className="size-6" />
      </Button>
    </div>
  );
}

// A German sentence shown as text, tappable to hear it, with a slow button.
export function SentenceCard({ t, sentence }: { t: Strings; sentence: Sentence }) {
  return (
    <div className="mx-auto my-5 flex max-w-md items-center gap-3 rounded-[28px] bg-card p-4 shadow-inner ring-1 ring-border">
      <button
        type="button"
        onClick={() => playSentence(sentence)}
        aria-label={t.tapToHear(sentence.german)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left font-display text-2xl font-extrabold"
      >
        <Volume2 className="size-6 shrink-0 text-ink-soft" />
        <span className="min-w-0 break-words">{sentence.german}</span>
      </button>
      <Button
        onClick={() => playSentence(sentence, true)}
        className="size-11 shrink-0 rounded-full bg-sun text-foreground shadow-[0_4px_0_oklch(0.72_0.14_91)] hover:bg-sun/90 active:translate-y-1 active:shadow-none"
        aria-label={t.playSlowly}
      >
        <Turtle className="size-5" />
      </Button>
    </div>
  );
}

// The sheet that slides up once an answer is checked. Unlike the vocabulary
// quiz's ResultCard there is no retry in place: a wrong answer shows the
// right one and the question comes back at the end of the lesson.
export function CourseResult({
  t,
  lang,
  correct,
  sentence,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  correct: boolean;
  sentence: Sentence;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4">
      <div
        className={cn(
          "animate-slide-in-up w-full max-w-3xl rounded-t-[28px] p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(0,0,0,0.18)] sm:p-7",
          correct ? "bg-success-soft" : "bg-danger-soft",
        )}
      >
        <div className="flex items-start gap-3">
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
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "font-display text-xl font-extrabold",
                correct ? "text-success" : "text-destructive",
              )}
            >
              {correct ? "Richtig!" : "Nicht ganz."}
            </p>
            {!correct && <p className="text-sm font-bold text-ink-soft">{t.correctAnswer}</p>}
            <button
              type="button"
              onClick={() => playSentence(sentence)}
              aria-label={t.tapToHear(sentence.german)}
              className="mt-1 flex items-center gap-2 text-left font-display text-lg font-extrabold"
            >
              <span className="min-w-0 break-words">{sentence.german}</span>
              <Volume2 className="size-5 shrink-0 text-ink-soft" />
            </button>
            <p className="font-bold text-ink-soft">{sentence[lang]}</p>
          </div>
        </div>
        <Button variant="adventure" size="lesson" className="mt-4 w-full" onClick={onContinue}>
          Weiter
        </Button>
      </div>
    </div>
  );
}
