import { useEffect, useMemo } from "react";
import { NoteBody } from "@/components/course/TipCard";
import { allSentences } from "@/data/course";
import type { CourseUnit, GrammarNote, Sentence } from "@/data/course/types";
import { setAudioWindow } from "@/lib/word-audio";
import type { MotherTongue, Strings } from "@/lib/i18n";

// A unit's guidebook: its grammar notes in reading order, each with example
// sentences to tap and hear. Readable at any time, whatever is locked.
export function Guidebook({ unit, t, lang }: { unit: CourseUnit; t: Strings; lang: MotherTongue }) {
  const notes = useMemo(
    () =>
      unit.guidebook
        .map((id) => unit.notes.find((note) => note.id === id))
        .filter((note): note is GrammarNote => note !== undefined),
    [unit],
  );
  const sentencesById = useMemo(
    () => new Map(allSentences([unit]).map((sentence) => [sentence.id, sentence])),
    [unit],
  );

  // Fetch the examples' clips so a tap plays at once.
  useEffect(() => {
    setAudioWindow(
      { words: [], letters: [], sentenceIds: notes.flatMap((note) => note.examples) },
      [],
    );
  }, [notes]);

  return (
    <main className="relative z-10 mx-auto max-w-3xl space-y-5 px-4 pb-10 sm:px-6">
      {notes.map((note) => (
        <section key={note.id} className="glass-panel rounded-[28px] p-5 sm:p-7">
          <h2 className="mb-4 font-display text-2xl font-extrabold">{note.title[lang]}</h2>
          <NoteBody
            t={t}
            lang={lang}
            note={note}
            examples={note.examples
              .map((id) => sentencesById.get(id))
              .filter((s): s is Sentence => s !== undefined)}
          />
        </section>
      ))}
    </main>
  );
}
