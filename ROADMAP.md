# Grammar roadmap

How WortWunder grows from a vocabulary trainer into one that also teaches A1
grammar, as a fourth section on the learning path: **4 Grammatik**.

The plan assumes the learner has never seen German before and reads the
explanations in English, Tamil or Sinhala.

For one test drawn out screen by screen, see
[GRAMMAR-EXAMPLE.md](GRAMMAR-EXAMPLE.md).

## Contents

1. [Teaching principles](#1-teaching-principles)
2. [How section 4 is structured](#2-how-section-4-is-structured)
3. [Lessons and tests](#3-lessons-and-tests)
4. [Question types](#4-question-types)
5. [Data model](#5-data-model)
6. [What changes in the code](#6-what-changes-in-the-code)
7. [Build phases](#7-build-phases)
8. [Open decisions](#8-open-decisions)

## 1. Teaching principles

These rules shape every lesson below. They matter more than any single
question type.

- **One new thing per test.** A test teaches one small rule (for example
  "ich bin, du bist"), never a whole chapter. This is why grammar tests are
  written by hand and named, instead of being an even split of a word list
  like the vocabulary tests.
- **Sentence first, rule second.** The learner hears and reads two or three
  real sentences, then sees the rule that explains them. The rule is one or
  two lines in the mother tongue, never a wall of text.
- **Closed vocabulary.** A grammar test may use only words the learner has
  already met, plus at most five new ones. New words are introduced on their
  own cards before the rule appears. Grammar and unknown words never arrive
  in the same question.
- **Everything is glossed.** Every German sentence has a mother-tongue
  meaning, and tapping any German word shows its meaning and plays it.
  A beginner is never left staring at a word they cannot decode.
- **Plain words before grammar terms.** Explain with "the action word" first,
  then attach the label *Verb*. The German labels (Verb, Nomen, Artikel,
  Akkusativ) are worth teaching because classes and exam books use them.
- **Recognise, arrange, produce.** Each test moves from picking the right
  form, to ordering a sentence, to building or typing it. This is the same
  tier ladder the vocabulary tests already use.
- **Colour carries the pattern.** The article colours in `pieces.tsx`
  (`ARTICLE_COLORS`) already mark der/die/das. Grammar adds one more
  highlight for the verb, so position 2 and the sentence bracket are visible
  at a glance.
- **Spiral back.** Later tests reuse earlier sentences and patterns, so a
  modal-verb test still drills articles and conjugation.

### What the mother tongue changes

Tamil and Sinhala put the verb at the end of the sentence and have no
articles. English has articles but no noun gender. Three topics therefore
need slower, more explicit teaching than a European textbook gives them:

| Topic | Why it is hard for these learners | Where it is taught |
| --- | --- | --- |
| Verb in position 2 | Tamil and Sinhala sentences end with the verb | 4.3.5, then reinforced in 4.4, 4.9, 4.10 |
| Articles and gender | No articles in Tamil or Sinhala; no gender in English | 4.5, which gets five tests |
| Sentence bracket | A verb split across the sentence has no equivalent | 4.8.3, reused in 4.9 and 4.12 |

One topic is easier: `du` versus `Sie` maps directly onto the informal and
formal "you" that Tamil and Sinhala already have (the app's own word list
uses நீ / நீங்கள் and ඔයා / ඔබ). Say so in the rule card.

## 2. How section 4 is structured

The path keeps its three levels: section, lesson, test.

```
4 Grammatik
  4.2 Erste Sätze                lesson: one grammar topic
    4.2.1 Ich heiße ...          test: one small rule, 8-10 sentences
    4.2.2 ich bin, du bist
    ...
```

Differences from the vocabulary sections:

| | Vocabulary (1 Grundlagen) | Grammar (4 Grammatik) |
| --- | --- | --- |
| Unit of content | a word | a sentence |
| Test contents | even split of the lesson's word list | hand-written, one rule each |
| Test name on the path | "Familie 1", "Familie 2" | the rule itself, e.g. "ich bin, du bist" |
| Test size | 10-15 words | 8-10 sentences |
| First tier | word intro card | rule card |

### Inside one test

Every test runs through the same five tiers the vocabulary quiz uses, so the
progress badges and the mastery counter stay the same.

| Tier | What happens |
| --- | --- |
| Training | New-word cards if the test has any, then the rule card with example sentences and audio, then one check question per rule card |
| Basic | Pick the right form; pick the meaning of a sentence |
| Easy | Match pairs; sort into groups; listen and pick |
| Medium | Put the words in order; find the mistake; change the sentence |
| Hard | Build the sentence from its meaning; type the missing word; dictation; pick the reply |

Not every test uses every question type. Each test lists the types that fit
its rule, the same way `VocabTest.testTypes` already limits a vocabulary
test.

### Order and unlocking

Grammar lessons unlock in order, because each one depends on the one before.
Tests inside a lesson also unlock in order. This differs from the
vocabulary section, which is open. See [Open decisions](#8-open-decisions).

Each lesson also names the Grundlagen lessons whose words it borrows. That is
shown as a hint ("works best after 1.2 Familie"), never as a lock.

## 3. Lessons and tests

Thirteen lessons, 57 tests. The "Borrows from" column lists the Grundlagen
lessons whose words the sentences reuse.

### 4.1 Los geht's (Getting started)

Before any grammar: how German looks and sounds, and the names for the three
kinds of word the rest of the section talks about.

| Test | Teaches | Example |
| --- | --- | --- |
| 4.1.1 | The new letters: ä, ö, ü, ß | *Mädchen, schön, Tür, Straße* |
| 4.1.2 | Letter pairs that sound different: ei/ie, eu, sch, ch, sp/st, w, v, z | *mein / wie, Schule, ich* |
| 4.1.3 | Three kinds of word: Nomen (always a capital letter), Verb, Pronomen | *Anna **lernt**. **Sie** lernt.* |

Borrows from: 1.1 Hallo.

### 4.2 Erste Sätze (First sentences)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.2.1 | `ich` and `du` with `heißen` | *Ich heiße Anna. Wie heißt du?* |
| 4.2.2 | `sein`: ich bin, du bist | *Ich bin müde. Du bist nett.* |
| 4.2.3 | `er`, `sie`, `es` with `ist` | *Er ist Lehrer. Sie ist Ärztin.* |
| 4.2.4 | `wir`, `ihr`, `sie` with `sind` / `seid`; formal `Sie` | *Wir sind Freunde. Sind Sie Herr Weber?* |
| 4.2.5 | `kommen aus`, `wohnen in` | *Ich komme aus Sri Lanka. Ich wohne in Wien.* |

Borrows from: 1.1 Hallo, 1.7 Der Beruf, 1.8 Angaben zur Person,
1.30 Pronomen & Co.

### 4.3 Verben im Präsens (Verbs in the present)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.3.1 | Verb stem and ending; `ich -e`, `du -st` | *ich lerne, du lernst* |
| 4.3.2 | `er/sie/es -t` | *Er spielt Fußball.* |
| 4.3.3 | `wir -en`, `ihr -t`, `sie/Sie -en` | *Wir kochen. Ihr kocht.* |
| 4.3.4 | `haben` | *Ich habe Zeit. Sie hat ein Auto.* |
| 4.3.5 | The verb is always the second idea | *Ich **lerne** heute Deutsch.* |

Borrows from: 1.6 Die Hobbys, 1.17 Wichtige Verben.

### 4.4 Fragen (Questions)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.4.1 | Yes/no questions: the verb moves to the front | *Kommst du aus Indien?* |
| 4.4.2 | `wer`, `was`, `wie` | *Wer ist das? Was machst du?* |
| 4.4.3 | `wo`, `woher`, `wohin`, `wann` | *Wo wohnst du? Woher kommst du?* |
| 4.4.4 | Answering: `ja`, `nein`, `doch` | *Kommst du nicht? Doch!* |

Borrows from: 1.16 Die W-Fragen.

### 4.5 Nomen & Artikel (Nouns and articles)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.5.1 | Every noun has a gender: `der`, `die`, `das` | *der Tisch, die Lampe, das Bett* |
| 4.5.2 | `ein`, `eine`: "a" versus "the" | *Das ist ein Hund. Der Hund ist klein.* |
| 4.5.3 | Plural: always `die`, and the common endings | *das Kind, die Kinder* |
| 4.5.4 | `kein`, `keine` | *Das ist kein Hund.* |
| 4.5.5 | `nicht`, and when to use `nicht` or `kein` | *Ich komme nicht. Ich habe keine Zeit.* |

Borrows from: 1.2 Familie, 1.4 Haus & Zimmer, 1.24 Die Tiere.

### 4.6 Akkusativ (The object of a sentence)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.6.1 | Who does it, and to what; `der` becomes `den`, `ein` becomes `einen` | *Ich habe einen Bruder.* |
| 4.6.2 | `die` and `das` do not change; `keinen` | *Ich habe keinen Hund.* |
| 4.6.3 | `es gibt`, `brauchen`, `möchten` with an object | *Ich möchte einen Kaffee.* |
| 4.6.4 | Mixed: subject or object? | *Der Mann kauft den Apfel.* |

Borrows from: 1.3 Essen & Trinken, 1.9 Einkaufen.

### 4.7 Possessivartikel (My, your, his, her)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.7.1 | `mein`, `dein`, and the extra `-e` | *mein Vater, meine Mutter* |
| 4.7.2 | `sein`, `ihr` | *sein Auto, ihre Tasche* |
| 4.7.3 | `unser`, `euer`, formal `Ihr` | *unsere Wohnung, Ihr Name* |
| 4.7.4 | Possessives as the object | *Ich besuche meinen Opa.* |

Borrows from: 1.2 Familie, 1.30 Pronomen & Co.

### 4.8 Besondere Verben (Verbs that change)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.8.1 | Vowel change e to i / ie | *ich esse, du isst; ich lese, er liest* |
| 4.8.2 | Vowel change a to ä | *ich fahre, er fährt* |
| 4.8.3 | Separable verbs: the front part goes to the end | *Ich stehe um 7 Uhr auf.* |
| 4.8.4 | Separable verbs in questions and the daily routine | *Wann rufst du an?* |

Borrows from: 1.3 Essen & Trinken, 1.11 Verkehr & Wege, 1.17 Wichtige Verben.

### 4.9 Modalverben (Can, must, want, may)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.9.1 | `können` | *Ich kann schwimmen.* |
| 4.9.2 | `müssen` | *Ich muss arbeiten.* |
| 4.9.3 | `wollen` and `möchten` | *Ich möchte Tee trinken.* |
| 4.9.4 | `dürfen` | *Hier darf man nicht parken.* |
| 4.9.5 | Mixed: modal second, other verb last | *Kannst du morgen kommen?* |

Borrows from: 1.6 Die Hobbys, 1.12 Arbeit & Schule.

### 4.10 Zeit & Ort (Time and place)

Dative is taught here only as fixed phrases. The full dative system belongs
to A2.

| Test | Teaches | Example |
| --- | --- | --- |
| 4.10.1 | `um`, `am`, `im` | *um 8 Uhr, am Montag, im Juli* |
| 4.10.2 | `von ... bis`; time first, verb still second | *Am Montag **gehe** ich zum Arzt.* |
| 4.10.3 | Where? `in`, `bei` as fixed phrases | *im Büro, in der Schule, bei Anna* |
| 4.10.4 | Where to? `nach`, `zu`, `in` | *nach Berlin, zum Arzt, ins Kino* |
| 4.10.5 | `mit` and `aus` | *mit dem Bus, aus der Schweiz* |

Borrows from: 1.10 Zeit & Datum, 1.11 Verkehr & Wege, 1.25 In der Stadt,
1.27 Präpositionen.

### 4.11 Imperativ (Asking and telling)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.11.1 | Formal: `Sie` | *Nehmen Sie Platz.* |
| 4.11.2 | Informal: `du` | *Komm bitte!* |
| 4.11.3 | Several people: `ihr` | *Wartet hier!* |
| 4.11.4 | Polite requests | *Können Sie mir helfen?* |

Borrows from: 1.13 Gesundheit, 1.26 Alltagssprache.

### 4.12 Vergangenheit (Talking about the past)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.12.1 | `war` and `hatte` | *Ich war krank. Ich hatte keine Zeit.* |
| 4.12.2 | Perfekt with `haben`: `ge-...-t` | *Ich habe Deutsch gelernt.* |
| 4.12.3 | Perfekt with `haben`: `ge-...-en` | *Ich habe Pizza gegessen.* |
| 4.12.4 | Perfekt with `sein`: movement | *Ich bin nach Hause gegangen.* |
| 4.12.5 | Mixed: `haben` or `sein`? | *Wir sind gefahren. Wir haben gespielt.* |

Borrows from: 1.14 Reise & Hotel, 1.17 Wichtige Verben.

### 4.13 Sätze verbinden (Joining ideas)

| Test | Teaches | Example |
| --- | --- | --- |
| 4.13.1 | `und`, `oder` | *Ich trinke Tee oder Kaffee.* |
| 4.13.2 | `aber`, `denn` | *Ich komme nicht, denn ich bin krank.* |
| 4.13.3 | `mich`, `dich`, `ihn`, `sie`, `es` | *Ich sehe ihn. Er ruft mich an.* |
| 4.13.4 | `gern`, `lieber`, `am liebsten` | *Ich trinke lieber Tee.* |

Borrows from: 1.18 Kleine Wörter, 1.29 Adverbien.

## 4. Question types

Fourteen types. One sentence can feed most of them, the same way one
`VocabWord` feeds the eleven vocabulary types.

| Tier | Type | What the learner does | Built from |
| --- | --- | --- | --- |
| Training | `rule` | Reads a rule card: two or three example sentences with audio, the pattern highlighted, one or two lines of explanation | new `RuleCard`, modelled on `TrainingCard` |
| Training | `ruleCheck` | Answers one easy pick question straight after the card | `OptionGrid` |
| Basic | `gapPick` | Picks the word that fills the gap: *Ich ___ Anna.* (bin / bist / ist / sind) | `OptionGrid` |
| Basic | `sentenceMeaning` | Reads a German sentence, picks its meaning | `OptionGrid` |
| Easy | `pairs` | Matches two columns: pronoun to verb form, noun to article, question to answer | `MatchPairs` |
| Easy | `sort` | Drops words into two or three groups: der / die / das, or haben / sein | new `SortBuckets` |
| Easy | `listenPick` | Hears a sentence, picks the one that was said | `OptionGrid` + `playWord` |
| Medium | `order` | Arranges shuffled word tiles into the sentence | new `WordBuilder`, the word-tile version of `LetterBuilder` |
| Medium | `spot` | Taps the wrong word in a sentence, or confirms the sentence is right | new `SpotMistake` |
| Medium | `transform` | Rewrites a sentence with tiles: statement to question, positive to negative, `ich` to `er` | `WordBuilder` |
| Hard | `meaningBuild` | Reads the meaning, builds the German sentence from tiles that include decoys | `WordBuilder` |
| Hard | `gapType` | Types the missing word | new `GapInput` with ä ö ü ß keys |
| Hard | `listenBuild` | Hears a sentence, builds it from tiles | `WordBuilder` + `playWord` |
| Hard | `reply` | Reads or hears a line, picks the reply that fits | `OptionGrid` |

Notes on specific types:

- **`rule` is not a lecture.** Maximum three example sentences and two lines
  of text per card. A rule that needs more is split across two tests.
- **`order` is the most important type** for learners whose own language
  puts the verb last. Every test from 4.3.5 onward includes it.
- **`gapType` needs on-screen umlaut keys.** Most learners will not have a
  German keyboard. Answers are compared without case sensitivity except
  where the capital letter is the point (nouns, formal `Sie`).
- **`reply` is the exam bridge.** It mirrors the A1 speaking and listening
  tasks, where the learner reacts to a question or a request.
- **Wrong answers explain themselves.** After a miss, the feedback shows the
  right sentence with the pattern highlighted and one line saying why, in
  the mother tongue.

Which tests use which types:

| Test kind | Types |
| --- | --- |
| Sounds and letters (4.1.1, 4.1.2) | `rule`, `ruleCheck`, `listenPick`, `pairs`, `gapType` |
| Verb forms (4.2, 4.3, 4.8, 4.9, 4.12) | all except `sort` (4.12.5 adds `sort` for haben / sein) |
| Articles and cases (4.5, 4.6, 4.7) | all, with `sort` for gender |
| Word order (4.3.5, 4.4, 4.10.2) | `rule`, `ruleCheck`, `order`, `transform`, `spot`, `meaningBuild`, `listenBuild` |
| Fixed phrases (4.10, 4.11, 4.13) | `rule`, `ruleCheck`, `gapPick`, `sentenceMeaning`, `pairs`, `order`, `meaningBuild`, `reply` |

## 5. Data model

A grammar test is a rule plus a list of sentences. Each sentence carries
enough information for every question type to be generated from it, so
writing a test means writing sentences, not writing questions.

```ts
// src/data/grammar/types.ts
import type { MotherTongue } from "@/lib/i18n";
import type { GrammarType } from "@/lib/grammar-engine";

type Localized = Record<MotherTongue, string>;

export interface GrammarSentence {
  id: string;
  // Space-separated tokens are the word tiles; punctuation stays attached.
  german: string;
  meaning: Localized;
  // Index of the token this test is about ("bin" in "Ich bin Anna.").
  focus: number;
  // Wrong forms for the focus slot: gapPick options, decoy tiles.
  distractors: string[];
  // One line shown after a wrong answer.
  why: Localized;
  // For `transform`: the sentence to turn this one into.
  transformTo?: { german: string; prompt: Localized };
  // For `reply`: the line this sentence answers.
  replyTo?: { german: string; meaning: Localized };
}

export interface RuleCard {
  id: string;
  title: Localized;
  text: Localized;
  // Ids of sentences in this test, shown as the examples.
  exampleIds: string[];
  // Optional small table, e.g. pronoun / verb form.
  table?: { left: string; right: string }[];
}

export interface GrammarTest {
  testId: string; // "4.2.2"
  title: string; // "ich bin, du bist"
  meaning: Localized;
  rules: RuleCard[];
  sentences: GrammarSentence[];
  testTypes: GrammarType[];
  // Vocabulary introduced before the rule; ids of existing VocabWords.
  newWordIds?: string[];
  // For `pairs` and `sort`, which are not sentence-based.
  pairs?: { left: string; right: string }[];
  sort?: { groups: string[]; items: { text: string; group: string }[] };
}

export interface GrammarLesson {
  id: string; // "4.2"
  title: string;
  icon: string;
  assetDir: string; // "4.2 first sentences"
  meaning: Localized;
  // Grundlagen lesson ids, shown as "works best after".
  borrowsFrom: string[];
  tests: GrammarTest[];
}
```

Files follow the existing one-file-per-lesson pattern:
`src/data/grammar/first-sentences.ts`, `src/data/grammar/present-tense.ts`,
and so on, collected into `GRAMMAR_LESSONS` in `src/data/grammar/index.ts`.

### Assets

- **Audio.** Every sentence needs a clip. Add each one to the `WORDS` array
  in `scripts/generate-audio.mjs` with `dir: "4.2 first sentences/audio"`,
  then run `bun run generate-audio`. Roughly 57 tests at 8-10 sentences is
  about 500 clips, so generate per lesson, not all at once.
- **Images.** Sentences do not need photos. Grammar screens are text and
  audio. Only the path icons are needed: `icons/lesson.jpg` and
  `icons/test-<part>.jpg`, with the emoji as fallback, exactly as for
  vocabulary lessons.
- **New words.** A word that a grammar test introduces is a normal
  `VocabWord` with its own image and audio, stored in the grammar lesson's
  folder under `images/` and `audio/`.

## 6. What changes in the code

| File | Change |
| --- | --- |
| `src/lib/grammar-engine.ts` (new) | `GrammarType` union, tier table, queue builder that turns pending rows plus a `GrammarTest` into quiz items |
| `src/lib/progress-store.ts` | Rows are already stored as `"<type>:<id>"` strings. Let the caller pass the tier lookup so grammar types can use the same store and the same pending-attempts rule |
| `src/components/quiz/GrammarQuiz.tsx` (new) | The grammar counterpart of `VocabQuiz`: takes a `GrammarTest`, runs the tiered queue |
| `src/components/quiz/pieces.tsx` | New pieces: `RuleCard`, `WordBuilder`, `SortBuckets`, `SpotMistake`, `GapInput`, and a tappable `GlossedSentence`. Existing `OptionGrid`, `MatchPairs`, `LessonFrame`, `Continue`, `ResultCard` are reused as they are |
| `src/routes/index.tsx` | A fourth path node, "Grammatik", built from `GRAMMAR_LESSONS`; a `"grammar"` screen next to `"quiz"`; unlock state for grammar nodes |
| `src/lib/i18n.ts` | Strings for the new screens in all three languages |
| `scripts/generate-audio.mjs` | Sentence entries per grammar lesson |
| `AGENTS.md` | A "Grammar lessons" section once the first lesson ships |

The test id is the progress key, as in the vocabulary section. Grammar ids
start with `4.`, so they cannot collide with existing saved progress.

## 7. Build phases

Each phase ends with something a learner can use.

### Phase 1: one lesson, four question types

Goal: prove the format with real learners before writing 57 tests.

- Data types, `grammar-engine.ts`, progress-store change.
- `GrammarQuiz` with `rule`, `ruleCheck`, `gapPick`, `sentenceMeaning`,
  `order`.
- `RuleCard`, `WordBuilder`, `GlossedSentence`.
- Section 4 on the path with lesson **4.2 Erste Sätze** (five tests).
- Sentence audio for 4.2.

Check before moving on: can someone with no German finish 4.2.1 without
help, and can they say *Ich heiße ...* afterwards?

### Phase 2: the remaining question types

- `pairs`, `sort`, `listenPick`, `spot`, `transform`, `meaningBuild`,
  `gapType`, `listenBuild`, `reply`.
- Wrong-answer explanations (`why`).
- Sequential unlocking.
- Back-fill 4.2 with the new types.

### Phase 3: the foundation lessons

- 4.1 Los geht's, 4.3 Verben im Präsens, 4.4 Fragen, 4.5 Nomen & Artikel.

After this phase a learner can introduce themselves, ask and answer simple
questions, and name things: the first part of the A1 speaking exam.

### Phase 4: objects and richer verbs

- 4.6 Akkusativ, 4.7 Possessivartikel, 4.8 Besondere Verben,
  4.9 Modalverben.

### Phase 5: time, requests, past

- 4.10 Zeit & Ort, 4.11 Imperativ, 4.12 Vergangenheit,
  4.13 Sätze verbinden.

### Phase 6: review and exam link

- A mixed review test after 4.5, 4.9 and 4.13, drawing sentences from the
  lessons before it.
- A "my mistakes" practice round built from the rows with the most failed
  attempts.
- Exam-style tasks in section 2 ÖSD that combine vocabulary and grammar:
  fill in a form, write a short message, react to a request.

## 8. Open decisions

| Decision | Recommendation |
| --- | --- |
| Do grammar lessons lock in order? | Yes. Grammar builds on itself in a way vocabulary does not. Keep the vocabulary sections open |
| Who checks the Tamil and Sinhala explanations? | A native speaker reviews each lesson before it ships. A wrong grammar explanation does more harm than a wrong word meaning |
| Do grammar tests need Grundlagen first? | No hard requirement. Show "works best after" and teach any missing word inside the test |
| Typing on a phone | Ship `gapType` with on-screen ä ö ü ß keys. If typing still frustrates learners in Phase 2, drop it from the default set and keep tiles |
| Where does section 4 sit on the path? | After 2 ÖSD and before Testing, which then becomes section 5, or stays last unnumbered since it is a developer area |
