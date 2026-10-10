import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerGrid, Continue, LessonFrame } from "@/components/quiz/pieces";
import { ResultSheet, SentenceLine } from "@/components/course/SentenceAudio";
import { cn } from "@/lib/utils";
import { checkComprehension, type HearExercise, type ReadExercise } from "@/lib/course-engine";
import { playCorrectSound, playWrongSound } from "@/lib/feedback-sound";
import { playSentenceSequence } from "@/lib/word-audio";
import type { ComprehensionQuestion, ReadingText } from "@/data/course/types";
import type { MotherTongue, Strings } from "@/lib/i18n";

const RICHTIG_FALSCH = ["Richtig", "Falsch"];

// One comprehension question in either exam format: a few answers to choose
// from, or a statement to judge richtig or falsch. `onCheck` gets the
// verdict once the learner has committed to an answer.
function QuestionBlock({
  t,
  lang,
  question,
  revealed,
  onCheck,
}: {
  t: Strings;
  lang: MotherTongue;
  question: ComprehensionQuestion;
  revealed: boolean;
  onCheck: (correct: boolean) => void;
}) {
  const [answer, setAnswer] = useState<string | null>(null);
  const choice = question.format === "choice";
  const options = choice ? question.options.map((option) => option[lang]) : RICHTIG_FALSCH;
  const correctText = choice
    ? (options[question.correct] ?? "")
    : RICHTIG_FALSCH[question.correct ? 0 : 1]!;

  const check = () => {
    const picked = options.indexOf(answer ?? "");
    onCheck(checkComprehension(question, choice ? picked : picked === 0));
  };

  return (
    <>
      <p className="mb-4 rounded-[24px] bg-card p-4 text-center font-display text-lg font-extrabold ring-1 ring-border">
        {choice ? question.prompt[lang] : question.statement[lang]}
      </p>
      <AnswerGrid
        options={options}
        selected={answer}
        correct={correctText}
        revealed={revealed}
        onSelect={setAnswer}
        speak={false}
      />
      {!revealed && <Continue t={t} disabled={!answer} onClick={check} />}
    </>
  );
}

function answerText(question: ComprehensionQuestion, lang: MotherTongue): string {
  if (question.format === "choice") return question.options[question.correct]?.[lang] ?? "";
  return RICHTIG_FALSCH[question.correct ? 0 : 1]!;
}

// `hearQ`: a short dialogue heard without its text, then one question. The
// lines are shown, with their meaning, once the answer is in.
export function HearTask({
  t,
  lang,
  exercise,
  onDone,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  exercise: HearExercise;
  onDone: (correct: boolean) => void;
  onContinue: () => void;
}) {
  const { lines, question } = exercise;
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    playSentenceSequence(lines);
  }, [lines]);

  return (
    <>
      <LessonFrame t={t} eyebrow={t.listeningChallenge} title="Hör zu" subtitle={t.listenDialogue}>
        <div className="my-5 flex justify-center">
          <Button
            onClick={() => playSentenceSequence(lines)}
            className="size-24 rounded-full bg-berry text-primary-foreground shadow-[0_8px_0_var(--primary-shadow)] hover:bg-berry/90 active:translate-y-1 active:shadow-none [&_svg]:size-10"
            aria-label={t.playDialogue}
          >
            <Volume2 />
          </Button>
        </div>
        <QuestionBlock
          t={t}
          lang={lang}
          question={question}
          revealed={result !== null}
          onCheck={(correct) => {
            if (correct) playCorrectSound();
            else playWrongSound();
            setResult(correct);
            onDone(correct);
          }}
        />
      </LessonFrame>
      {result !== null && (
        <ResultSheet correct={result} onContinue={onContinue}>
          {!result && (
            <p className="text-sm font-bold text-ink-soft">
              {t.correctAnswer} {answerText(question, lang)}
            </p>
          )}
          <div className="mt-2 space-y-2">
            {lines.map((line) => (
              <SentenceLine key={line.id} t={t} lang={lang} sentence={line} />
            ))}
          </div>
        </ResultSheet>
      )}
    </>
  );
}

// A sign on a door, a text message or a handwritten note, each drawn to
// look the part.
function ReadingCard({ text }: { text: ReadingText }) {
  const lines = text.german.split("\n");
  return (
    <div
      lang="de"
      className={cn(
        "mx-auto my-5 max-w-sm p-5 font-display text-xl font-extrabold leading-snug",
        text.layout === "sign" &&
          "rounded-xl border-4 border-foreground bg-card text-center shadow-md",
        text.layout === "message" &&
          "rounded-[24px] rounded-bl-md bg-mint/40 text-left ring-1 ring-border",
        text.layout === "note" &&
          "-rotate-1 rounded-sm bg-sun/50 text-left font-sans font-bold italic shadow-md",
      )}
    >
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}

// `readQ`: a short text to read, then one question.
export function ReadTask({
  t,
  lang,
  exercise,
  onDone,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  exercise: ReadExercise;
  onDone: (correct: boolean) => void;
  onContinue: () => void;
}) {
  const { text } = exercise;
  const [result, setResult] = useState<boolean | null>(null);

  return (
    <>
      <LessonFrame
        t={t}
        eyebrow={t.readingChallenge}
        title="Lies den Text"
        subtitle={t.readThenAnswer}
      >
        <ReadingCard text={text} />
        <QuestionBlock
          t={t}
          lang={lang}
          question={text.question}
          revealed={result !== null}
          onCheck={(correct) => {
            if (correct) playCorrectSound();
            else playWrongSound();
            setResult(correct);
            onDone(correct);
          }}
        />
      </LessonFrame>
      {result !== null && (
        <ResultSheet correct={result} onContinue={onContinue}>
          {!result && (
            <p className="text-sm font-bold text-ink-soft">
              {t.correctAnswer} {answerText(text.question, lang)}
            </p>
          )}
        </ResultSheet>
      )}
    </>
  );
}
