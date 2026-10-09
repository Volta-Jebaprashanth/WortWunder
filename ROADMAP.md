# Roadmap: from vocabulary trainer to a full A1 course

Written 2026-10-09. This is the build plan for turning WortWunder from a
vocabulary app into a complete German A1 course. Work through the milestones
in section 12 one at a time and tick them off here as they land.

## 1. Goal

A learner who starts with zero German and finishes the course can understand,
read, write and speak German at A1 level, and can sit a Goethe-Zertifikat A1
(Start Deutsch 1) style exam with confidence.

Today the app teaches and drills single words only. The course adds what is
missing: sentences, grammar, dialogues, listening and reading comprehension,
speaking and writing.

## 2. Decisions already made

| Topic         | Decision                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Backend       | None, ever. Everything runs in the browser; progress stays in `localStorage`.                                            |
| German used   | Standard German from Germany: voices, spellings and word choices (Januar, Guten Tag, Tüte). No Austrian variants.        |
| Exam model    | Goethe-Zertifikat A1 format for the mock exam.                                                                           |
| Home sections | 1 the new course, 2 Wortschatz (today's "Grundlagen", renamed), 3 ÖSD (unchanged). The "Testing" section is removed.     |
| Course name   | **Von Null auf A1** ("From zero to A1"). A working name; it lives in one constant so it is cheap to change.              |
| Languages     | Every instruction, translation and grammar note exists in English, Tamil and Sinhala, like the rest of the app.          |

Consequences of "no backend" that the design accepts:

- Speaking is checked by the browser's own speech recognition where it
  exists, and by record-and-compare self-rating elsewhere.
- Free writing is checked against a model answer and a checklist the learner
  ticks; nothing grades free text automatically.
- There is no free conversation partner. The course trains the scripted A1
  speaking tasks, which is what the exam asks for.

## 3. Home screen layout after the change

1. **Von Null auf A1**: the course. Units expand to lessons. This is where a
   beginner starts, and the big "Start lesson" button continues it.
2. **Wortschatz**: the 30 existing vocabulary lessons, unchanged in behaviour.
3. **ÖSD**: the existing re-listing of vocabulary lessons, unchanged.

Rules for the rename:

- Only display titles change. Lesson ids (`1.1` … `1.30`), test ids
  (`1.2.1`) and the `public/1.x name/` folders stay exactly as they are:
  the ids are the keys saved progress is stored under, and the folders are
  referenced by every image and audio path.
- The hand-written "der Vogel" walkthrough in `src/routes/index.tsx` and its
  screens are deleted together with the Testing section.

## 4. How the course is shaped

- **13 units**, each with a real-life theme and one or two grammar points.
- **About 6 lessons per unit**, each roughly 5 minutes: 12–15 exercises.
- **One guidebook per unit**: the grammar and key phrases, in the learner's
  mother tongue, readable at any time.
- **One checkpoint per unit**: a longer mixed test. Passing it completes the
  unit. A learner who already knows the material can take it early to skip
  ahead.
- **Lessons unlock in order.** The next lesson opens when the previous one
  is finished.
- **A daily review session** ("Üben") built from what the learner got wrong
  or has not seen for a while.

Target volume: about 75 lessons, 900 sentences, 40 dialogues, 13 guidebooks.

## 5. Syllabus

Each unit reuses words, photos and audio from the vocabulary lessons listed
in the last column, so the course and section 2 reinforce each other.

| #   | Unit                 | The learner can…                           | Grammar                                          | Vocabulary lessons |
| --- | -------------------- | ------------------------------------------ | ------------------------------------------------ | ------------------ |
| 1   | Hallo!               | greet, give a name, spell it               | alphabet and sounds, ich bin / ich heiße, du/Sie | 1.1                |
| 2   | Woher kommst du?     | say origin, home town, languages           | regular present tense, W-questions, verb second  | 1.8, 1.16          |
| 3   | Zahlen & Angaben     | give age, phone number, address            | sein / haben, yes/no questions                   | 1.15, 1.8          |
| 4   | Meine Familie        | describe family and people                 | der/die/das, ein/kein, mein/dein, plurals        | 1.2, 1.21          |
| 5   | Essen & Trinken      | order food and drink, say likes            | accusative, möchten, gern, nicht/kein            | 1.3                |
| 6   | Mein Tag             | tell the time, describe a routine          | separable verbs, um/am/im, time in position one  | 1.10, 1.17         |
| 7   | Einkaufen            | ask prices, buy food and clothes           | accusative pronouns, welch-/dies-                | 1.9, 1.20, 1.22    |
| 8   | Wohnen               | describe a home and its rooms              | es gibt, in/auf/neben + dative                   | 1.4, 1.28          |
| 9   | In der Stadt         | ask the way, use transport                 | imperative, mit/zu/nach                          | 1.11, 1.25, 1.27   |
| 10  | Arbeit & Freizeit    | talk about job, hobbies, abilities         | können/müssen/wollen/dürfen, sentence bracket    | 1.6, 1.7, 1.12     |
| 11  | Gesundheit & Termine | see a doctor, make and move appointments   | sollen, formal imperative, mir/dir               | 1.13, 1.19         |
| 12  | Gestern & Reisen     | talk about the past, travel, weather       | Perfekt with haben/sein, war/hatte               | 1.5, 1.14          |
| 13  | Prüfungstraining     | sit a full mock exam in all four skills    | revision of everything                           | all                |

Lessons inside each unit:

1. **Hallo!** Hallo und Tschüss · Ich heiße … · Wie geht's? · Das Alphabet ·
   Buchstabieren · du oder Sie?
2. **Woher kommst du?** Länder · Ich komme aus … · Ich wohne in … ·
   Sprachen · Wer? Wie? Wo? Woher? · Er und sie
3. **Zahlen & Angaben** 0–20 · 20–100 · Wie alt bist du? · Telefonnummer ·
   Adresse und E-Mail · Ein Formular
4. **Meine Familie** Mutter, Vater, Kind · der, die, das · Das ist mein … ·
   ein und kein · Zwei Kinder (Plural) · Wie ist er?
5. **Essen & Trinken** Was ist das? · Ich esse gern … · Ich möchte … ·
   einen, eine, ein · Im Café · Das schmeckt (nicht)
6. **Mein Tag** Wie spät ist es? · Die Wochentage · Ich stehe auf · um, am,
   im · Mein Morgen · Hast du Zeit?
7. **Einkaufen** Was kostet das? · Im Supermarkt · Wie viel? · Kleidung und
   Farben · Ich nehme ihn · An der Kasse
8. **Wohnen** Meine Wohnung · Die Zimmer · Möbel · Es gibt … · Wo ist …? ·
   Eine Wohnung suchen
9. **In der Stadt** Orte in der Stadt · Wo ist der Bahnhof? · Links, rechts,
   geradeaus · Mit dem Bus · Eine Fahrkarte kaufen · Gehen Sie …!
10. **Arbeit & Freizeit** Was bist du von Beruf? · Am Arbeitsplatz · Meine
    Hobbys · Ich kann … · Ich muss … · Darf ich …? Willst du …?
11. **Gesundheit & Termine** Der Körper · Mir tut … weh · Beim Arzt · Einen
    Termin machen · Du sollst … · Absagen und verschieben
12. **Gestern & Reisen** Ich war, ich hatte · Ich habe … gemacht · Ich bin …
    gefahren · Das Wetter · Im Hotel · Mein Urlaub
13. **Prüfungstraining** Hören · Lesen · Schreiben · Sprechen · Komplette
    Prüfung 1 · Komplette Prüfung 2

## 6. Exercise types

### Derived automatically from a sentence

The author writes the sentence once; the engine builds these from it, the
same way `VocabQuiz` builds 11 test types from one word.

| Id            | What the learner does                                              | Skill     |
| ------------- | ------------------------------------------------------------------ | --------- |
| `bankToDe`    | Sees the mother-tongue sentence, taps German word tiles in order   | writing   |
| `bankFromDe`  | Sees the German sentence, taps mother-tongue word tiles in order   | reading   |
| `listenBank`  | Hears the sentence, taps German word tiles in order                | listening |
| `listenPick`  | Hears the sentence, picks its meaning from three                   | listening |
| `gap`         | Fills one gap from choices (verb form, article, case, preposition) | grammar   |
| `order`       | Puts shuffled German words into the right order                    | grammar   |
| `type`        | Types the German sentence, with an ä ö ü ß helper row              | writing   |
| `listenType`  | Hears the sentence and types it (dictation)                        | listening |
| `speak`       | Reads the sentence aloud                                           | speaking  |

Distractor tiles come from other sentences in the same lesson, so the author
never writes them by hand. A `gap` needs the gap position and its wrong
options marked in the data, because those carry the grammar point.

### Authored

| Id         | What it is                                                                       | Skill          |
| ---------- | -------------------------------------------------------------------------------- | -------------- |
| `tip`      | A short grammar or usage card in the mother tongue, shown before a new pattern   | grammar        |
| `newWord`  | A word introduced with photo and audio (reuses `TrainingCard`)                   | vocabulary     |
| `dialogue` | A two-voice exchange played line by line; the learner picks the right next reply | listen + speak |
| `hearQ`    | A short dialogue or announcement, then one question                              | listening      |
| `readQ`    | A sign, SMS, note or advert, then richtig/falsch or a/b                          | reading        |
| `form`     | Fill in a registration form from a short description                             | writing        |
| `message`  | Write a short message covering three points; self-check against a model          | writing        |
| `speakQ`   | Answer a spoken question aloud, or ask one from a cue card                       | speaking       |

### Mix inside a lesson

A lesson introduces 2–4 new words and 6–8 new sentences. Exercises run from
recognition to production: tip → new words → `bankFromDe` / `listenPick` →
`gap` / `order` → `bankToDe` / `listenBank` → `type` / `speak`. An exercise
answered wrongly comes back at the end of the lesson until it is right.

## 7. Speaking and writing in the browser

**Speaking**

- Where `SpeechRecognition` exists (Chrome on Android and desktop, partly
  Safari), the learner's speech is transcribed in `de-DE` and compared with
  the target after stripping case and punctuation. A pass needs most target
  words present, not a perfect transcript, because recognition of beginners
  is unreliable.
- Elsewhere (Firefox, some iOS setups), the app records the learner with
  `MediaRecorder`, plays the recording next to the model audio, and asks
  "Did you sound close?" with a self-rating.
- Every speaking exercise has a "Can't speak right now" button that swaps
  speaking exercises for listening ones for the rest of the session.
- Browser speech recognition sends audio to the browser vendor's servers.
  Say so in one line the first time the microphone is requested.

**Writing**

- Single sentences are checked exactly, after normalising case, punctuation
  and spacing. Each sentence may list accepted alternatives. `ss` for `ß`
  and `ae/oe/ue` for umlauts are accepted but pointed out.
- A near miss (one character off) is shown as "almost right" with the
  difference highlighted and still counts as correct.
- `form` fields are checked exactly. `message` shows a model answer and a
  three-item checklist the learner ticks.

## 8. Data model

New folder `src/data/course/`, one file per unit, plus an index.

```ts
interface Sentence {
  id: string; // "u01.l02.s03", stable forever, used as progress and audio key
  german: string;
  english: string;
  tamil: string;
  sinhala: string;
  accept?: string[]; // other correct German answers for typing
  gap?: { token: number; options: string[] }; // for the `gap` exercise
  voice?: "f" | "m"; // which voice reads it; default "f"
  grammar?: string[]; // tags such as "verb-second", "akkusativ"
  words?: string[]; // vocabulary used, as "<lessonId>/<wordId>"
}

interface DialogueLine {
  speaker: "a" | "b";
  sentenceId: string;
}

interface Dialogue {
  id: string; // "u01.d01"
  title: Record<MotherTongue, string>;
  lines: DialogueLine[];
  question?: ComprehensionQuestion; // makes it usable as `hearQ`
}

interface GrammarNote {
  id: string; // "u02.g01"
  tag: string; // matches Sentence.grammar tags
  title: Record<MotherTongue, string>;
  body: Record<MotherTongue, string>; // short; a table or 3–4 examples
  examples: string[]; // sentence ids
}

interface CourseLesson {
  id: string; // "u01.l02"
  title: string; // German
  meaning: Record<MotherTongue, string>;
  newWords: string[]; // "<lessonId>/<wordId>"
  sentences: Sentence[]; // written where they are taught
  steps: LessonStep[]; // authored order: tips, words, sentences (later: dialogues, tasks)
}

interface CourseUnit {
  id: string; // "u01"
  title: string;
  icon: string; // emoji on the path
  meaning: Record<MotherTongue, string>;
  canDo: Record<MotherTongue, string[]>; // shown on the unit card
  notes: GrammarNote[];
  guidebook: string[]; // grammar note ids
  dialogues: Dialogue[];
  lessons: CourseLesson[];
  checkpoint: string[]; // sentence and task ids drawn on for the unit test
}
```

The types as built live in `src/data/course/types.ts`.

Rules:

- Ids are never renumbered or reused once shipped; progress is stored under
  them. To retire a sentence, delete it and leave the gap in the numbering.
- Vocabulary is referenced as `<lessonId>/<wordId>` because word ids repeat
  across vocabulary lessons.
- A validation script (`scripts/validate-course.ts`, run with bun so it can
  read the TypeScript data; the checks are in `src/lib/course-validate.ts`)
  fails the build on: duplicate ids, a missing translation, a gap index out
  of range, a reference to an unknown word or sentence, a sentence with no
  audio file.

## 9. Engine, progress and review

**`src/lib/course-engine.ts`** (pure functions, unit tested)

- Turns a lesson's steps into an exercise queue, choosing the exercise type
  for each sentence by how well the learner already knows it.
- Tokenises sentences, builds tile pools and distractors, checks answers
  (tile order, typed text, spoken transcript).
- Re-queues wrong answers at the end of the lesson.

**`src/lib/course-store.ts`** (`localStorage` key `wortwunder:course`)

- Per lesson: finished or not, best score.
- Per unit: checkpoint passed or not.
- Per sentence: a strength level 0–5 and the day it is next due.
- Streak: last active day and current run of days.
- Versioned like `progress-store.ts`, and reconciled against the current
  course data on load so content changes never strand saved progress.

**Review ("Üben")**

- A right answer raises a sentence's strength by one and pushes its due date
  out (1, 2, 4, 8, 16, 30 days). A wrong answer drops it to level 1, due
  tomorrow.
- A review session takes up to 15 due sentences, weakest first, and uses a
  harder exercise type the stronger the sentence is.
- Grammar tags the learner misses most are named on the review screen
  ("Practise: accusative").

Existing gems, sparks and the daily time goal keep working unchanged: the
course calls the same `recordCorrectAnswer`.

## 10. Audio

- `scripts/generate-course-audio.ts` (a separate script run with bun, since
  `generate-audio.mjs` runs under node and cannot import the TypeScript
  course data) reads every sentence from `src/data/course/` and writes
  `public/course/<unit>/audio/<sentenceId>.mp3` plus a manifest
  `src/data/course-audio.generated.ts`.
- Two voices: `de-DE-KatjaNeural` (the current one) and a male German voice
  such as `de-DE-ConradNeural`, so dialogues have two distinct speakers.
- A slow rendering of each sentence (`<sentenceId>.slow.mp3`) for a
  "play slowly" button.
- Playback goes through the existing `word-audio.ts` loader and its
  look-ahead window; nothing new is needed there except accepting course
  manifest entries.
- The service worker's audio cache cap (400 entries) is raised to fit the
  course.

Measured on unit 1, lesson 1: about 41 KB per sentence for the normal and
slow clip together, so 900 sentences come to roughly 37 MB.

Expected size: roughly 30–50 MB of new audio. This is an estimate; measure
after unit 1 and multiply.

## 11. Screens and routing

The course is built as real routes and separate components, not as more
states inside `src/routes/index.tsx`.

| Route                      | Screen                                             |
| -------------------------- | -------------------------------------------------- |
| `/`                        | Home path: course units, Wortschatz, ÖSD           |
| `/kurs/$unitId`            | Unit page: can-do list, lessons, guidebook link    |
| `/kurs/$unitId/guide`      | Guidebook                                          |
| `/kurs/$unitId/$lessonId`  | Lesson player                                      |
| `/kurs/$unitId/checkpoint` | Unit checkpoint                                    |
| `/ueben`                   | Review session                                     |
| `/pruefung/$examId`        | Mock exam                                          |

New components live in `src/components/course/` (`LessonPlayer`, `WordBank`,
`GapSentence`, `TypeAnswer`, `SpeakPrompt`, `DialoguePlayer`, `TipCard`,
`ComprehensionTask`, `UnitCard`). They reuse `LessonFrame`, `ResultCard`,
`Continue`, `Picture` and `TrainingCard` from `pieces.tsx`.

All new interface text goes into `src/lib/i18n.ts` in three languages.

## 12. Milestones

Each milestone is sized to build, check and commit on its own. "Done when"
is the acceptance test. Build order is top to bottom; content milestones (C)
are interleaved with engineering ones (E) so there is always something real
to try.

### Stage A: prepare the ground

- [x] **E0. Restructure the home path.** Add the "Von Null auf A1" section
      first (empty, marked "coming soon"), rename Grundlagen to Wortschatz,
      keep ÖSD third, delete the Testing section and the der Vogel
      walkthrough screens, point the "Start lesson" button at the learner's
      next unfinished item, and change the page title from "for kids" to
      wording that fits all ages.
      _Done when:_ the home screen shows the three sections in the new
      order, every vocabulary test still opens with its saved progress
      intact, and `index.tsx` no longer contains the Vogel screens.
- [x] **E1. Test tooling.** Add vitest, a `test` script and a CI step. Cover
      `quiz-engine.ts` and `progress-store.ts` first, since they already
      exist and must not regress.
      _Done when:_ `bun run test` passes locally and in CI.
- [x] **E2. Line endings.** Make the Windows checkout lint clean (set
      `eol=lf` in `.gitattributes` or `endOfLine: "auto"` in Prettier).
      _Done when:_ `bun run lint` passes on Windows.

### Stage B: a vertical slice (unit 1, lesson 1)

- [x] **E3. Course data model and validation.** Types from section 8,
      `src/data/course/index.ts`, and `scripts/validate-course.ts` wired
      into CI.
      _Done when:_ a deliberately broken sentence fails validation.
- [x] **C1a. Unit 1, lesson 1 content.** "Hallo und Tschüss": words,
      sentences and one tip in all three languages.
- [x] **E4. Sentence audio pipeline.** `scripts/generate-course-audio.ts`,
      two voices, slow renderings, generated manifest.
      _Done when:_ every sentence of lesson 1 has a normal and a slow clip.
- [x] **E5. Course engine and store.** `course-engine.ts` and
      `course-store.ts` with tests, for the exercise types `bankToDe`,
      `bankFromDe`, `listenBank`, `listenPick`, `tip`, `newWord`.
      _Done when:_ tests cover queue building, answer checking, wrong-answer
      re-queueing and store reconciliation.
- [x] **E6. Lesson player.** Route, `LessonPlayer`, `WordBank`, `TipCard`,
      progress bar, end-of-lesson summary.
      _Done when:_ lesson 1 can be played start to finish on a phone, with
      audio, in each of the three languages.

### Stage C: a complete unit

- [ ] **E7. Course path on the home screen.** Unit cards, lesson nodes,
      locked and finished states, unit page with can-do list.
- [ ] **E8. Grammar exercises.** `gap` and `order`, plus the guidebook
      screen.
- [ ] **E9. Typing.** `type` and `listenType`, the ä ö ü ß helper row,
      accepted alternatives and "almost right" feedback.
- [ ] **C1b. Unit 1 complete.** Remaining five lessons, guidebook and
      checkpoint content.
- [ ] **E10. Unit checkpoint.** Mixed test, pass mark, skip-ahead rule.
      _Done when:_ a new learner can go from zero through all of unit 1.

**Stop here and try it with real learners** in each of the three languages
before writing more content. Change what is confusing while only one unit
depends on it.

### Stage D: more skills

- [ ] **E11. Dialogues.** `DialoguePlayer`, two voices, pick-the-reply.
- [ ] **E12. Comprehension tasks.** `hearQ` and `readQ` in the exam's
      formats (a/b/c, richtig/falsch, sign and notice layouts).
- [ ] **E13. Speaking.** `speak` and `speakQ` with speech recognition, the
      record-and-compare fallback, and the "Can't speak right now" switch.
- [ ] **E14. Review.** Sentence strength, due dates, the "Üben" session,
      weak-grammar summary.
- [ ] **E15. Streak and daily goal.** Day streak on the home screen, working
      alongside the existing time goal.

### Stage E: content build-out

One milestone per unit. Each includes sentences, dialogues, tips, guidebook,
checkpoint, audio generation and a pass through the validation script.

- [ ] **C2.** Woher kommst du?
- [ ] **C3.** Zahlen & Angaben
- [ ] **C4.** Meine Familie
- [ ] **C5.** Essen & Trinken
- [ ] **C6.** Mein Tag
- [ ] **C7.** Einkaufen
- [ ] **C8.** Wohnen
- [ ] **C9.** In der Stadt
- [ ] **C10.** Arbeit & Freizeit
- [ ] **C11.** Gesundheit & Termine
- [ ] **C12.** Gestern & Reisen

### Stage F: exam readiness

- [ ] **E16. Writing tasks.** `form` and `message` with model answers and
      checklists.
- [ ] **E17. Mock exam player.** Timed sections, no feedback until the end,
      a result per skill and a pass mark of 60%.
- [ ] **C13. Prüfungstraining content.** Skill-by-skill practice lessons and
      two complete mock exams in the format below.

  | Part      | Tasks                                                                                              |
  | --------- | -------------------------------------------------------------------------------------------------- |
  | Hören     | Short everyday dialogues (a/b/c) · public announcements (richtig/falsch) · phone messages (a/b/c)  |
  | Lesen     | Two short messages (richtig/falsch) · choose between two adverts · signs and notices               |
  | Schreiben | Fill in five fields of a form · write a short message covering three points                        |
  | Sprechen  | Introduce yourself from keywords · ask and answer with topic cards · make and answer requests      |

### Stage G: finish

- [ ] **E18. Offline.** Cache the app shell and let a learner download a
      unit's audio and pictures, so an installed app works with no signal.
- [ ] **E19. Clean-up.** "Clear all my data" also clears the service-worker
      caches; remove the unused shadcn components and dependencies; split
      what remains of `index.tsx` into smaller files.
- [ ] **E20. Tap-a-word hints.** Tapping a German word in any sentence shows
      its meaning, taken from the linked vocabulary.
- [ ] **E21. Public pages.** Update `README.md`, the page metadata and
      `AGENTS.md` to describe a full A1 course.

## 13. How content gets written

For each lesson:

1. List the new words (prefer ones already in the vocabulary lessons, which
   brings their photo and audio for free) and the one grammar point.
2. Write 6–8 German sentences that use only words and grammar taught so far
   plus this lesson's new material. Later lessons deliberately reuse earlier
   sentences' words.
3. Translate each into English, Tamil and Sinhala. Translations should be
   natural, not word for word.
4. Mark gaps, accepted alternatives, grammar tags and voices.
5. Write the tip in three languages: two or three lines and a few examples,
   no terminology the learner has not met.
6. Run the validation script, generate audio, play the lesson once.

**Review rule:** Tamil and Sinhala drafted by an AI assistant are reviewed by
a native reader before the unit is marked done. German sentences are checked
against the Goethe A1 word list so nothing above the level slips in.

## 14. Risks

| Risk                                                           | What limits it                                                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Content takes far longer than code                             | One unit per milestone; the stop after unit 1 fixes the format before it is multiplied by 12    |
| Translation mistakes in Tamil or Sinhala                       | Native review per unit; a "report a mistake" mail link on the result card                       |
| Speech recognition is missing or unreliable on some phones     | Fallback mode, lenient matching, and speaking can always be skipped without blocking progress   |
| Audio size makes the app heavy on mobile data                  | Look-ahead loading (already in place), per-unit download in E18, measure after unit 1           |
| `localStorage` fills up                                        | Store only a strength and a date per sentence; about 900 sentences stays far below the 5 MB cap |
| Typing German is frustrating on a phone                        | Helper row for special characters, tolerant matching, word-bank alternative early in the course |
| Shipping a content change breaks saved progress                | Stable ids, reconciliation on load, store tests                                                 |

## 15. Not planned

- Accounts, sync between devices, leaderboards or anything else needing a
  server.
- An AI conversation partner or automatic grading of free writing.
- Levels above A1.
- Austrian or Swiss variants.
