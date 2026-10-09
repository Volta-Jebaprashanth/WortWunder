import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonFrame } from "@/components/quiz/pieces";
import { playSentence } from "@/lib/word-audio";
import type { GrammarNote, Sentence } from "@/data/course/types";
import type { MotherTongue, Strings } from "@/lib/i18n";

// The text of a grammar note and its example sentences, each tappable to
// hear. Shared by the tip screen of a lesson and the unit's guidebook.
export function NoteBody({
  t,
  lang,
  note,
  examples,
}: {
  t: Strings;
  lang: MotherTongue;
  note: GrammarNote;
  examples: Sentence[];
}) {
  return (
    <>
      <div className="space-y-3 rounded-[24px] bg-card p-5 ring-1 ring-border">
        {note.body[lang].split("\n").map((line, i) => (
          <p key={i} className="font-bold leading-snug">
            {line}
          </p>
        ))}
      </div>
      {examples.length > 0 && (
        <ul className="mt-3 space-y-2">
          {examples.map((sentence) => (
            <li key={sentence.id}>
              <button
                type="button"
                onClick={() => playSentence(sentence)}
                aria-label={t.tapToHear(sentence.german)}
                className="flex w-full items-center gap-3 rounded-2xl bg-glass p-3 text-left ring-1 ring-border transition hover:bg-card"
              >
                <Volume2 className="size-5 shrink-0 text-ink-soft" />
                <span className="min-w-0">
                  <span className="block font-display text-lg font-extrabold">
                    {sentence.german}
                  </span>
                  <span className="block text-sm font-bold text-ink-soft">{sentence[lang]}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// A short grammar or usage note in the learner's mother tongue, shown before
// a new pattern: a few lines of text and example sentences to tap and hear.
export function TipCard({
  t,
  lang,
  note,
  examples,
  onContinue,
}: {
  t: Strings;
  lang: MotherTongue;
  note: GrammarNote;
  examples: Sentence[];
  onContinue: () => void;
}) {
  return (
    <LessonFrame t={t} eyebrow={t.tip} title="Gut zu wissen" subtitle={note.title[lang]}>
      <NoteBody t={t} lang={lang} note={note} examples={examples} />
      <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onContinue}>
        Weiter
      </Button>
    </LessonFrame>
  );
}
