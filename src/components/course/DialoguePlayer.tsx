import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonFrame } from "@/components/quiz/pieces";
import { cn } from "@/lib/utils";
import { checkDialoguePick, type DialogueExercise } from "@/lib/course-engine";
import { playCorrectSound, playWrongSound } from "@/lib/feedback-sound";
import { playSentence } from "@/lib/word-audio";
import type { Sentence } from "@/data/course/types";
import type { MotherTongue, Strings } from "@/lib/i18n";

// Roughly how long a line takes to say, to pace the next one after it.
function speakingTime(sentence: Sentence): number {
  return 900 + sentence.german.length * 90;
}

// A two-voice exchange played line by line, like a chat. Speaker a's lines
// appear and play by themselves; for each of speaker b's the learner picks
// the reply from three German sentences. A wrong pick is marked and they
// pick again, so the dialogue always runs to its end. `onPick` reports each
// reply's first attempt; `onDone` whether every reply was right first time.
export function DialoguePlayer({
  t,
  lang,
  exercise,
  sentencesById,
  onPick,
  onDone,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  exercise: DialogueExercise;
  sentencesById: Map<string, Sentence>;
  onPick: (sentence: Sentence, correct: boolean) => void;
  onDone: (correct: boolean) => void;
  onContinue: () => void;
}) {
  const { turns, dialogue } = exercise;
  // How many turns are on screen. The turn at this index is the one waiting:
  // for the learner's pick, or for its moment to play.
  const [shown, setShown] = useState(0);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [misses, setMisses] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const current = turns[shown];
  const finished = shown >= turns.length;

  // A line that needs no pick appears after the line before it has had time
  // to be heard.
  useEffect(() => {
    if (!current || current.optionIds) return;
    const before = turns[shown - 1];
    const timer = setTimeout(
      () => {
        playSentence(current.sentence);
        setShown((n) => n + 1);
      },
      before ? speakingTime(before.sentence) : 400,
    );
    return () => clearTimeout(timer);
  }, [current, shown, turns]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [shown]);

  useEffect(() => {
    if (finished) onDone(misses === 0);
    // Reported once, when the last line is on screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const pick = (id: string) => {
    if (!current) return;
    const correct = checkDialoguePick(current, id);
    if (wrongIds.length === 0) onPick(current.sentence, correct);
    if (!correct) {
      playWrongSound();
      if (wrongIds.length === 0) setMisses((n) => n + 1);
      setWrongIds((old) => [...old, id]);
      return;
    }
    playCorrectSound();
    setWrongIds([]);
    setTimeout(() => playSentence(current.sentence), 500);
    setShown((n) => n + 1);
  };

  return (
    <LessonFrame t={t} eyebrow={t.dialogue} title="Was passt?" subtitle={dialogue.title[lang]}>
      <div className="space-y-3">
        {turns.slice(0, shown).map((turn, i) => (
          <div key={i} className={cn("flex", turn.speaker === "b" && "justify-end")}>
            <button
              type="button"
              onClick={() => playSentence(turn.sentence)}
              aria-label={t.tapToHear(turn.sentence.german)}
              className={cn(
                "animate-pop max-w-[85%] rounded-[22px] p-3 text-left ring-1 ring-border",
                turn.speaker === "a" ? "rounded-bl-md bg-card" : "rounded-br-md bg-mint/40",
              )}
            >
              <span className="flex items-center gap-2 font-display text-lg font-extrabold">
                {turn.sentence.german} <Volume2 className="size-4 shrink-0 text-ink-soft" />
              </span>
              <span className="block text-sm font-bold text-ink-soft">{turn.sentence[lang]}</span>
            </button>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {current?.optionIds && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="mb-3 text-center font-bold text-ink-soft">{t.chooseReply}</p>
          <div className="grid gap-3">
            {current.optionIds.map((id) => {
              const option = sentencesById.get(id);
              if (!option) return null;
              const wrong = wrongIds.includes(id);
              return (
                <Button
                  key={id}
                  variant="answer"
                  disabled={wrong}
                  onClick={() => pick(id)}
                  className={cn(wrong && "border-destructive bg-danger-soft")}
                >
                  {option.german}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {finished && (
        <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onContinue}>
          Weiter
        </Button>
      )}
    </LessonFrame>
  );
}
