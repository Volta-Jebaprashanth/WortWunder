# Grammar roadmap

How WortWunder grows from a vocabulary trainer into one that also teaches A1
grammar, as the first section on the learning path: **1 Grammatik**.

The path after the change:

| Section | Contents |
| --- | --- |
| 1 Grammatik | the new grammar lessons G1 to G13, where a new learner starts |
| 2 Wortschatz | the 30 vocabulary lessons, unchanged (today section 1) |
| 3 ÖSD | the renamed vocabulary lessons, unchanged (today section 2) |
| 4 Testing | the developer area, unchanged (today section 3) |

Section numbers are display order only; the path does not show them. Saved
progress and asset folders are keyed by lesson and test ids, so the
vocabulary lessons keep their ids `1.1` to `1.30` and their `public/1.x ...`
folders even though they now sit in section 2. Grammar ids use a `G` prefix
(lesson `G2`, test `G2.2`) so they cannot collide with them.

The plan assumes the learner has never seen German before and reads the
explanations in English, Tamil or Sinhala.

For one test drawn out screen by screen, see
[GRAMMAR-EXAMPLE.md](GRAMMAR-EXAMPLE.md).

## Contents

1. [Teaching principles](#1-teaching-principles)
2. [How section 1 is structured](#2-how-section-1-is-structured)
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
- **Words first, then grammar.** Each lesson opens with a word test that
  teaches every new word its grammar tests need, using the existing
  vocabulary quiz. A grammar test then introduces no new words at all, so
  grammar and unknown words never arrive in the same question.
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
| Verb in position 2 | Tamil and Sinhala sentences end with the verb | G3.6, then reinforced in G4, G9, G10 |
| Articles and gender | No articles in Tamil or Sinhala; no gender in English | G5, which gets five grammar tests |
| Sentence bracket | A verb split across the sentence has no equivalent | G8.5, reused in G9 and G12 |

One topic is easier: `du` versus `Sie` maps directly onto the informal and
formal "you" that Tamil and Sinhala already have (the app's own word list
uses நீ / நீங்கள் and ඔයා / ඔබ). Say so in the rule card.

## 2. How section 1 is structured

The path keeps its three levels: section, lesson, test. A grammar lesson
holds two kinds of test:

```
1 Grammatik
  G2 Erste Sätze                lesson: one grammar topic
    G2.1 Wörter 1               word test: the words for G2.2 to G2.4
    G2.2 Ich heiße ...          grammar test: one small rule, 8-10 sentences
    G2.3 ich bin, du bist
    G2.4 er, sie, es
    G2.5 Wörter 2               word test: the words for G2.6 and G2.7
    G2.6 wir, ihr, sie
    G2.7 kommen aus, wohnen in
```

### Word tests

A word test is an ordinary vocabulary test, played by `VocabQuiz` exactly as
the Wortschatz tests are. It has the same eleven question types, the same
five tiers and the same progress rules. Nothing about it is new code.

- **Where it goes.** A word test holds the words for the grammar tests that
  follow it, up to the next word test. Every lesson starts with one. A
  lesson whose words fall into two groups (G5: things, then family) or that
  needs more than 15 words gets a second word test right before the grammar
  tests that use the second group, not all of them up front. A learner
  should meet a word shortly before they need it.
- **Size.** 5 to 15 words, picked by hand for the grammar that follows. This
  is not the even split `splitIntoTests` makes for Wortschatz lessons.
  Fewer than five new words for a group means they join the lesson's
  earlier word test instead of getting their own.
- **Reuse first.** Most words already exist in a Wortschatz lesson with a
  photo and audio, so the word test refers to them, and they need no new
  assets. A word that exists nowhere yet becomes a normal `VocabWord` in
  the grammar lesson's own folder.
- **Question types.** Each word test can limit its types with
  `VocabTest.testTypes`. Spelling a two-letter pronoun is not a useful
  drill, so a test made of small words (G1.1, G13.1) can drop `build` and
  `missing`.
- **Name on the path.** "Wörter", or "Wörter 1" and "Wörter 2" when a lesson
  has two.

### Grammar tests

Differences from the vocabulary tests:

| | Word test (Wortschatz, and Wörter in Grammatik) | Grammar test |
| --- | --- | --- |
| Unit of content | a word | a sentence |
| Test contents | a word list | hand-written, one rule each |
| Test name on the path | "Familie 1", "Wörter 1" | the rule itself, e.g. "ich bin, du bist" |
| Test size | 5-15 words | 8-10 sentences |
| First tier | word intro card | rule card |
| Quiz screen | `VocabQuiz` | `GrammarQuiz` (new) |

### Inside one grammar test

Every test runs through the same five tiers the vocabulary quiz uses, so the
progress badges and the mastery counter stay the same.

| Tier | What happens |
| --- | --- |
| Training | The rule card with example sentences and audio, then one check question per rule card. No new-word cards: those words were taught in the word test |
| Basic | Pick the right form; pick the meaning of a sentence |
| Easy | Match pairs; sort into groups; listen and pick |
| Medium | Put the words in order; find the mistake; change the sentence |
| Hard | Build the sentence from its meaning; type the missing word; dictation; pick the reply |

Not every test uses every question type. Each test lists the types that fit
its rule, the same way `VocabTest.testTypes` already limits a vocabulary
test.

### Order and unlocking

Grammar lessons unlock in order, because each one depends on the one before.
Tests inside a lesson also unlock in order, word tests included: a grammar
test opens only after the word test before it is finished. This differs
from the vocabulary section, which is open. See [Open decisions](#8-open-decisions).

Each lesson also names the Wortschatz lessons whose words it borrows. Because
grammar now comes first, the learner usually has not done those lessons yet,
so this is never a lock or a "works best after" hint. Every word a grammar
test needs is taught in the lesson's own word test, and the result screen
links forward: "Practise more of these words in 1.2 Familie".

## 3. Lessons and tests

Thirteen lessons, 74 tests: 17 word tests and 57 grammar tests. Each
lesson starts with a word test, and a lesson with two groups of words gets
a second one partway through (G2, G5, G8, G10). The word lists below are
drafts. Most of the words already exist in a Wortschatz lesson and are
reused from there. The "Borrows from" line lists those lessons.

### G1 Los geht's (Getting started)

Before any grammar: how German looks and sounds, and the names for the three
kinds of word the rest of the section talks about. The words in G1.2 and
G1.3 are there for their sounds. The learner hears them but is not drilled
on their meaning.

| Test | Teaches | Example |
| --- | --- | --- |
| G1.1 | **Wörter**: first words | *Hallo, Tschüss, Danke, Bitte, ja, nein, ich, du, der Mann, die Frau, das Kind, lernen* |
| G1.2 | The new letters: ä, ö, ü, ß | *Mädchen, schön, Tür, Straße* |
| G1.3 | Letter pairs that sound different: ei/ie, eu, sch, ch, sp/st, w, v, z | *mein / wie, Schule, ich* |
| G1.4 | Three kinds of word: Nomen (always a capital letter), Verb, Pronomen | *Anna **lernt**. **Sie** lernt.* |

Borrows from: 1.1 Hallo, 1.2 Familie, 1.30 Pronomen & Co.

### G2 Erste Sätze (First sentences)

| Test | Teaches | Example |
| --- | --- | --- |
| G2.1 | **Wörter 1**: the words for G2.2 to G2.4 | *heißen, sein, der Name, wie, müde, nett, krank, hier, neu, er, sie, es, der Lehrer, die Ärztin* |
| G2.2 | `ich` and `du` with `heißen` | *Ich heiße Anna. Wie heißt du?* |
| G2.3 | `sein`: ich bin, du bist | *Ich bin müde. Du bist nett.* |
| G2.4 | `er`, `sie`, `es` with `ist` | *Er ist Lehrer. Sie ist Ärztin.* |
| G2.5 | **Wörter 2**: the words for G2.6 and G2.7 | *wir, ihr, sie (they), Sie, der Freund, die Freundin, Herr, Frau, kommen, wohnen, aus, in* |
| G2.6 | `wir`, `ihr`, `sie` with `sind` / `seid`; formal `Sie` | *Wir sind Freunde. Sind Sie Herr Weber?* |
| G2.7 | `kommen aus`, `wohnen in` | *Ich komme aus Sri Lanka. Ich wohne in Wien.* |

Borrows from: 1.1 Hallo, 1.7 Der Beruf, 1.8 Angaben zur Person,
1.19 Gefühle, 1.30 Pronomen & Co.

### G3 Verben im Präsens (Verbs in the present)

| Test | Teaches | Example |
| --- | --- | --- |
| G3.1 | **Wörter** | *spielen, kochen, machen, trinken, schwimmen, tanzen, singen, haben, die Zeit, das Auto, heute, Deutsch, der Fußball* |
| G3.2 | Verb stem and ending; `ich -e`, `du -st` | *ich lerne, du lernst* |
| G3.3 | `er/sie/es -t` | *Er spielt Fußball.* |
| G3.4 | `wir -en`, `ihr -t`, `sie/Sie -en` | *Wir kochen. Ihr kocht.* |
| G3.5 | `haben` | *Ich habe Zeit. Sie hat ein Auto.* |
| G3.6 | The verb is always the second idea | *Ich **lerne** heute Deutsch.* |

Borrows from: 1.6 Die Hobbys, 1.17 Wichtige Verben.

### G4 Fragen (Questions)

| Test | Teaches | Example |
| --- | --- | --- |
| G4.1 | **Wörter** | *wer, was, wo, woher, wohin, wann, nicht, doch, das Land, Indien, Sri Lanka* |
| G4.2 | Yes/no questions: the verb moves to the front | *Kommst du aus Indien?* |
| G4.3 | `wer`, `was`, `wie` | *Wer ist das? Was machst du?* |
| G4.4 | `wo`, `woher`, `wohin`, `wann` | *Wo wohnst du? Woher kommst du?* |
| G4.5 | Answering: `ja`, `nein`, `doch` | *Kommst du nicht? Doch!* |

Borrows from: 1.8 Angaben zur Person, 1.16 Die W-Fragen.

### G5 Nomen & Artikel (Nouns and articles)

| Test | Teaches | Example |
| --- | --- | --- |
| G5.1 | **Wörter 1**: things at home and animals | *der Tisch, der Stuhl, die Lampe, die Tür, das Bett, das Fenster, das Buch, der Hund, die Katze, das Pferd* |
| G5.2 | Every noun has a gender: `der`, `die`, `das` | *der Tisch, die Lampe, das Bett* |
| G5.3 | `ein`, `eine`: "a" versus "the" | *Das ist ein Hund. Der Hund ist klein.* |
| G5.4 | **Wörter 2**: family, with plurals | *der Bruder, die Schwester, das Kind, der Sohn, die Tochter, die Eltern, der Opa, die Oma* |
| G5.5 | Plural: always `die`, and the common endings | *das Kind, die Kinder* |
| G5.6 | `kein`, `keine` | *Das ist kein Hund.* |
| G5.7 | `nicht`, and when to use `nicht` or `kein` | *Ich komme nicht. Ich habe keine Zeit.* |

Borrows from: 1.2 Familie, 1.4 Haus & Zimmer, 1.24 Die Tiere. G5.4 is the
place to fill in the `plural` field for these words, which `TrainingCard`
already shows but almost no word has yet.

### G6 Akkusativ (The object of a sentence)

| Test | Teaches | Example |
| --- | --- | --- |
| G6.1 | **Wörter** | *der Apfel, der Kaffee, der Tee, das Brot, die Milch, der Saft, kaufen, brauchen, möchten, es gibt* |
| G6.2 | Who does it, and to what; `der` becomes `den`, `ein` becomes `einen` | *Ich habe einen Bruder.* |
| G6.3 | `die` and `das` do not change; `keinen` | *Ich habe keinen Hund.* |
| G6.4 | `es gibt`, `brauchen`, `möchten` with an object | *Ich möchte einen Kaffee.* |
| G6.5 | Mixed: subject or object? | *Der Mann kauft den Apfel.* |

Borrows from: 1.3 Essen & Trinken, 1.9 Einkaufen.

### G7 Possessivartikel (My, your, his, her)

| Test | Teaches | Example |
| --- | --- | --- |
| G7.1 | **Wörter** | *mein, dein, unser, euer, Ihr, der Vater, die Mutter, die Tasche, die Wohnung, besuchen* |
| G7.2 | `mein`, `dein`, and the extra `-e` | *mein Vater, meine Mutter* |
| G7.3 | `sein`, `ihr` | *sein Auto, ihre Tasche* |
| G7.4 | `unser`, `euer`, formal `Ihr` | *unsere Wohnung, Ihr Name* |
| G7.5 | Possessives as the object | *Ich besuche meinen Opa.* |

Borrows from: 1.2 Familie, 1.4 Haus & Zimmer, 1.30 Pronomen & Co.

### G8 Besondere Verben (Verbs that change)

| Test | Teaches | Example |
| --- | --- | --- |
| G8.1 | **Wörter 1**: verbs that change their vowel | *essen, lesen, sehen, sprechen, nehmen, geben, fahren, schlafen, laufen, tragen* |
| G8.2 | Vowel change e to i / ie | *ich esse, du isst; ich lese, er liest* |
| G8.3 | Vowel change a to ä | *ich fahre, er fährt* |
| G8.4 | **Wörter 2**: separable verbs | *aufstehen, anrufen, einkaufen, fernsehen, mitkommen, ankommen, abfahren, die Uhr* |
| G8.5 | Separable verbs: the front part goes to the end | *Ich stehe um 7 Uhr auf.* |
| G8.6 | Separable verbs in questions and the daily routine | *Wann rufst du an?* |

Borrows from: 1.3 Essen & Trinken, 1.10 Zeit & Datum, 1.11 Verkehr & Wege,
1.17 Wichtige Verben.

### G9 Modalverben (Can, must, want, may)

| Test | Teaches | Example |
| --- | --- | --- |
| G9.1 | **Wörter** | *können, müssen, wollen, dürfen, man, arbeiten, parken, morgen, die Arbeit, die Hausaufgabe* |
| G9.2 | `können` | *Ich kann schwimmen.* |
| G9.3 | `müssen` | *Ich muss arbeiten.* |
| G9.4 | `wollen` and `möchten` | *Ich möchte Tee trinken.* |
| G9.5 | `dürfen` | *Hier darf man nicht parken.* |
| G9.6 | Mixed: modal second, other verb last | *Kannst du morgen kommen?* |

Borrows from: 1.6 Die Hobbys, 1.12 Arbeit & Schule, 1.17 Wichtige Verben.

### G10 Zeit & Ort (Time and place)

Dative is taught here only as fixed phrases. The full dative system belongs
to A2.

| Test | Teaches | Example |
| --- | --- | --- |
| G10.1 | **Wörter 1**: time | *um, am, im, von, bis, der Montag, der Dienstag, das Wochenende, der Juli, der Sommer, die Uhr, morgens* |
| G10.2 | `um`, `am`, `im` | *um 8 Uhr, am Montag, im Juli* |
| G10.3 | `von ... bis`; time first, verb still second | *Am Montag **gehe** ich zum Arzt.* |
| G10.4 | **Wörter 2**: places and getting there | *das Büro, die Schule, der Arzt, das Kino, der Bus, der Zug, bei, nach, zu, mit, aus* |
| G10.5 | Where? `in`, `bei` as fixed phrases | *im Büro, in der Schule, bei Anna* |
| G10.6 | Where to? `nach`, `zu`, `in` | *nach Berlin, zum Arzt, ins Kino* |
| G10.7 | `mit` and `aus` | *mit dem Bus, aus der Schweiz* |

Borrows from: 1.10 Zeit & Datum, 1.11 Verkehr & Wege, 1.25 In der Stadt,
1.27 Präpositionen.

### G11 Imperativ (Asking and telling)

| Test | Teaches | Example |
| --- | --- | --- |
| G11.1 | **Wörter** | *der Platz, warten, helfen, sagen, zeigen, öffnen, schließen, wiederholen, langsam, mir* |
| G11.2 | Formal: `Sie` | *Nehmen Sie Platz.* |
| G11.3 | Informal: `du` | *Komm bitte!* |
| G11.4 | Several people: `ihr` | *Wartet hier!* |
| G11.5 | Polite requests | *Können Sie mir helfen?* |

Borrows from: 1.13 Gesundheit, 1.26 Alltagssprache.

### G12 Vergangenheit (Talking about the past)

| Test | Teaches | Example |
| --- | --- | --- |
| G12.1 | **Wörter** | *gestern, letzte Woche, das Jahr, der Urlaub, nach Hause, gehen, reisen, fliegen, bleiben* |
| G12.2 | `war` and `hatte` | *Ich war krank. Ich hatte keine Zeit.* |
| G12.3 | Perfekt with `haben`: `ge-...-t` | *Ich habe Deutsch gelernt.* |
| G12.4 | Perfekt with `haben`: `ge-...-en` | *Ich habe Pizza gegessen.* |
| G12.5 | Perfekt with `sein`: movement | *Ich bin nach Hause gegangen.* |
| G12.6 | Mixed: `haben` or `sein`? | *Wir sind gefahren. Wir haben gespielt.* |

Borrows from: 1.10 Zeit & Datum, 1.14 Reise & Hotel, 1.17 Wichtige Verben.

### G13 Sätze verbinden (Joining ideas)

| Test | Teaches | Example |
| --- | --- | --- |
| G13.1 | **Wörter** | *und, oder, aber, denn, gern, lieber, am liebsten, mich, dich, ihn* |
| G13.2 | `und`, `oder` | *Ich trinke Tee oder Kaffee.* |
| G13.3 | `aber`, `denn` | *Ich komme nicht, denn ich bin krank.* |
| G13.4 | `mich`, `dich`, `ihn`, `sie`, `es` | *Ich sehe ihn. Er ruft mich an.* |
| G13.5 | `gern`, `lieber`, `am liebsten` | *Ich trinke lieber Tee.* |

Borrows from: 1.18 Kleine Wörter, 1.29 Adverbien, 1.30 Pronomen & Co.

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
  puts the verb last. Every grammar test from G3.6 onward includes it.
- **`gapType` needs on-screen umlaut keys.** Most learners will not have a
  German keyboard. Answers are compared without case sensitivity except
  where the capital letter is the point (nouns, formal `Sie`).
- **`reply` is the exam bridge.** It mirrors the A1 speaking and listening
  tasks, where the learner reacts to a question or a request.
- **Wrong answers explain themselves.** After a miss, the feedback shows the
  right sentence with the pattern highlighted and one line saying why, in
  the mother tongue.

These types are for grammar tests. Word tests use the eleven vocabulary
types unchanged.

Which grammar tests use which types:

| Test kind | Types |
| --- | --- |
| Sounds and letters (G1.2, G1.3) | `rule`, `ruleCheck`, `listenPick`, `pairs`, `gapType` |
| Verb forms (G2, G3, G8, G9, G12) | all except `sort` (G12.6 adds `sort` for haben / sein) |
| Articles and cases (G5, G6, G7) | all, with `sort` for gender |
| Word order (G3.6, G4, G10.3) | `rule`, `ruleCheck`, `order`, `transform`, `spot`, `meaningBuild`, `listenBuild` |
| Fixed phrases (G10, G11, G13) | `rule`, `ruleCheck`, `gapPick`, `sentenceMeaning`, `pairs`, `order`, `meaningBuild`, `reply` |

## 5. Data model

A word test is a list of word references. A grammar test is a rule plus a
list of sentences. Each sentence carries
enough information for every question type to be generated from it, so
writing a test means writing sentences, not writing questions.

```ts
// src/data/grammar/types.ts
import type { MotherTongue } from "@/lib/i18n";
import type { GrammarType } from "@/lib/grammar-engine";
import type { TestType } from "@/lib/quiz-engine";
import type { VocabWord } from "@/data/vocabulary";

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
  kind: "grammar";
  testId: string; // "G2.3"
  title: string; // "ich bin, du bist"
  meaning: Localized;
  rules: RuleCard[];
  sentences: GrammarSentence[];
  testTypes: GrammarType[];
  // For `pairs` and `sort`, which are not sentence-based.
  pairs?: { left: string; right: string }[];
  sort?: { groups: string[]; items: { text: string; group: string }[] };
}

// A word test inside a grammar lesson, played by VocabQuiz. Word ids repeat
// across Wortschatz lessons ("krank" is in 1.13 and 1.19), so a reference
// names the lesson too. Words that exist in no Wortschatz lesson are listed
// in full under `newWords`.
export interface WordsTest {
  kind: "words";
  testId: string; // "G2.1"
  title: string; // "Wörter 1"
  words: { lessonId: string; wordId: string }[];
  newWords?: VocabWord[];
  testTypes?: TestType[];
}

export interface GrammarLesson {
  id: string; // "G2"
  title: string;
  icon: string;
  assetDir: string; // "G2 first sentences"
  meaning: Localized;
  // Wortschatz lesson ids, linked from the result screen for more practice.
  borrowsFrom: string[];
  tests: (WordsTest | GrammarTest)[];
}
```

Files follow the existing one-file-per-lesson pattern:
`src/data/grammar/first-sentences.ts`, `src/data/grammar/present-tense.ts`,
and so on, collected into `GRAMMAR_LESSONS` in `src/data/grammar/index.ts`.

### Assets

- **Audio.** Every sentence needs a clip. Add each one to the `WORDS` array
  in `scripts/generate-audio.mjs` with `dir: "G2 first sentences/audio"`,
  then run `bun run generate-audio`. Roughly 57 grammar tests at 8-10
  sentences is about 500 clips, so generate per lesson, not all at once.
  Reused words in word tests already have their audio.
- **Images.** Sentences do not need photos. Grammar screens are text and
  audio. Word tests reuse their words' Wortschatz photos. Only the path
  icons are needed, one per test, word tests included: `icons/lesson.jpg` and
  `icons/test-<part>.jpg`, with the emoji as fallback, exactly as for
  vocabulary lessons.
- **New words.** A word that exists in no Wortschatz lesson is a normal
  `VocabWord` with its own image and audio, stored in the grammar lesson's
  folder under `images/` and `audio/`, and listed in the word test's
  `newWords`.

## 6. What changes in the code

| File | Change |
| --- | --- |
| `src/data/grammar/index.ts` (new) | `GRAMMAR_LESSONS`, and a lookup that turns a word test's `{ lessonId, wordId }` references into `VocabWord`s from `VOCAB_LESSONS` |
| `src/lib/grammar-engine.ts` (new) | `GrammarType` union, tier table, queue builder that turns pending rows plus a `GrammarTest` into quiz items |
| `src/lib/progress-store.ts` | Rows are already stored as `"<type>:<id>"` strings. Let the caller pass the tier lookup so grammar types can use the same store and the same pending-attempts rule |
| `src/components/quiz/GrammarQuiz.tsx` (new) | The grammar counterpart of `VocabQuiz`: takes a `GrammarTest`, runs the tiered queue |
| `src/components/quiz/pieces.tsx` | New pieces: `RuleCard`, `WordBuilder`, `SortBuckets`, `SpotMistake`, `GapInput`, and a tappable `GlossedSentence`. Existing `OptionGrid`, `MatchPairs`, `LessonFrame`, `Continue`, `ResultCard` are reused as they are |
| `src/routes/index.tsx` | A new first path node, "Grammatik", built from `GRAMMAR_LESSONS`, above Wortschatz, ÖSD and Testing; word tests open the existing `"quiz"` screen (`VocabQuiz` with the resolved words), grammar tests a new `"grammar"` screen; unlock state for grammar nodes |
| `src/lib/i18n.ts` | Strings for the new screens in all three languages |
| `scripts/generate-audio.mjs` | Sentence entries per grammar lesson |
| `AGENTS.md` | A "Grammar lessons" section once the first lesson ships |

The test id is the progress key, as in the vocabulary section. Grammar ids
start with `G`, so they cannot collide with the vocabulary ids `1.1` to
`1.30` or with existing saved progress.

## 7. Build phases

Each phase ends with something a learner can use.

### Phase 1: one lesson, four question types

Goal: prove the format with real learners before writing 74 tests.

- Data types, `grammar-engine.ts`, progress-store change.
- `GrammarQuiz` with `rule`, `ruleCheck`, `gapPick`, `sentenceMeaning`,
  `order`.
- `RuleCard`, `WordBuilder`, `GlossedSentence`.
- Word tests: the `WordsTest` type and its lookup, opened in `VocabQuiz`.
- Section 1 on the path with lesson **G2 Erste Sätze** (two word tests,
  five grammar tests), and
  Wortschatz, ÖSD and Testing moved down to sections 2, 3 and 4.
- Sentence audio for G2.

Check before moving on: can someone with no German finish G2.1 and G2.2
without help, and can they say *Ich heiße ...* afterwards?

### Phase 2: the remaining question types

- `pairs`, `sort`, `listenPick`, `spot`, `transform`, `meaningBuild`,
  `gapType`, `listenBuild`, `reply`.
- Wrong-answer explanations (`why`).
- Sequential unlocking.
- Back-fill G2 with the new types.

### Phase 3: the foundation lessons

- G1 Los geht's, G3 Verben im Präsens, G4 Fragen, G5 Nomen & Artikel.

After this phase a learner can introduce themselves, ask and answer simple
questions, and name things: the first part of the A1 speaking exam.

### Phase 4: objects and richer verbs

- G6 Akkusativ, G7 Possessivartikel, G8 Besondere Verben,
  G9 Modalverben.

### Phase 5: time, requests, past

- G10 Zeit & Ort, G11 Imperativ, G12 Vergangenheit,
  G13 Sätze verbinden.

### Phase 6: review and exam link

- A mixed review test after G5, G9 and G13, drawing sentences from the
  lessons before it.
- A "my mistakes" practice round built from the rows with the most failed
  attempts.
- Exam-style tasks in section 3 ÖSD that combine vocabulary and grammar:
  fill in a form, write a short message, react to a request.

## 8. Open decisions

| Decision | Recommendation |
| --- | --- |
| Do grammar lessons lock in order? | Yes. Grammar builds on itself in a way vocabulary does not. Keep the vocabulary sections open |
| Who checks the Tamil and Sinhala explanations? | A native speaker reviews each lesson before it ships. A wrong grammar explanation does more harm than a wrong word meaning |
| Do grammar tests need Wortschatz first? | No. Grammar is the starting point, so each lesson's word tests teach the words it needs, and the result screen links forward to the Wortschatz lesson for more practice |
| Typing on a phone | Ship `gapType` with on-screen ä ö ü ß keys. If typing still frustrates learners in Phase 2, drop it from the default set and keep tiles |
| Where does grammar sit on the path? | Decided: first. 1 Grammatik, 2 Wortschatz, 3 ÖSD, 4 Testing |
| A word test repeats words the learner already mastered in Wortschatz. Skip them? | Not in Phase 1. A word test has its own test id and its own progress, so a learner who did 1.30 Pronomen & Co sees `ich` and `du` again. That is short, and it is spiral practice. Revisit once there is a shared per-word mastery record |
