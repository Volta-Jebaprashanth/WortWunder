# Grammar roadmap

How WortWunder grows from a vocabulary trainer into one that also teaches A1
grammar, as the first section on the learning path: **1 Grammatik**.

The path after the change:

| Section      | Contents                                                      |
| ------------ | ------------------------------------------------------------- |
| 1 Grammatik  | the new grammar lessons G1 to G13, where a new learner starts |
| 2 Wortschatz | the 30 vocabulary lessons, unchanged (today section 1)        |
| 3 ÖSD        | the renamed vocabulary lessons, unchanged (today section 2)   |
| 4 Testing    | the developer area, unchanged (today section 3)               |

Section numbers are display order only; the path does not show them. Saved
progress and asset folders are keyed by lesson and test ids, so the
vocabulary lessons keep their ids `1.1` to `1.30` and their `public/1.x ...`
folders even though they now sit in section 2. Grammar ids use a `G` prefix
(lesson `G2`, test `G2.2`) so they cannot collide with them.

The plan assumes the learner has never seen German before and reads the
explanations in English, Tamil or Sinhala.

For one test drawn out screen by screen, see
[GRAMMAR-EXAMPLE.md](GRAMMAR-EXAMPLE.md). Before writing or shipping any
lesson, go through the [checklist in section 9](#9-checklist-for-every-new-lesson).
It comes from the 31 bugs found when G1 to G3 were tested
(`docs/qa/bug-reports/BUGS-G1.md` to `BUGS-G3.md`).

## Contents

1. [Teaching principles](#1-teaching-principles)
2. [How section 1 is structured](#2-how-section-1-is-structured)
3. [Lessons and tests](#3-lessons-and-tests)
4. [Question types](#4-question-types)
5. [Data model](#5-data-model)
6. [What changes in the code](#6-what-changes-in-the-code)
7. [Build phases](#7-build-phases)
8. [Open decisions](#8-open-decisions)
9. [Checklist for every new lesson](#9-checklist-for-every-new-lesson)

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
  then attach the label _Verb_. The German labels (Verb, Nomen, Artikel,
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

| Topic               | Why it is hard for these learners                     | Where it is taught                   |
| ------------------- | ----------------------------------------------------- | ------------------------------------ |
| Verb in position 2  | Tamil and Sinhala sentences end with the verb         | G3.6, then reinforced in G4, G9, G10 |
| Articles and gender | No articles in Tamil or Sinhala; no gender in English | G5, which gets five grammar tests    |
| Sentence bracket    | A verb split across the sentence has no equivalent    | G8.5, reused in G9 and G12           |

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

|                       | Word test (Wortschatz, and Wörter in Grammatik) | Grammar test                             |
| --------------------- | ----------------------------------------------- | ---------------------------------------- |
| Unit of content       | a word                                          | a sentence                               |
| Test contents         | a word list                                     | hand-written, one rule each              |
| Test name on the path | "Familie 1", "Wörter 1"                         | the rule itself, e.g. "ich bin, du bist" |
| Test size             | 5-15 words                                      | 8-10 sentences                           |
| First tier            | word intro card                                 | rule card                                |
| Quiz screen           | `VocabQuiz`                                     | `GrammarQuiz` (new)                      |

### Inside one grammar test

Every test runs through the same five tiers the vocabulary quiz uses, so the
progress badges and the mastery counter stay the same.

| Tier     | What happens                                                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Training | The rule card with example sentences and audio, then one check question per rule card. No new-word cards: those words were taught in the word test |
| Basic    | Pick the right form; pick the meaning of a sentence                                                                                                |
| Easy     | Match pairs; sort into groups; listen and pick                                                                                                     |
| Medium   | Put the words in order; find the mistake; change the sentence                                                                                      |
| Hard     | Build the sentence from its meaning; type the missing word; dictation; pick the reply                                                              |

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

| Test | Teaches                                                               | Example                                                                                 |
| ---- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| G1.1 | **Wörter**: first words                                               | _Hallo, Tschüss, Danke, Bitte, ja, nein, ich, du, der Mann, die Frau, das Kind, lernen_ |
| G1.2 | The new letters: ä, ö, ü, ß                                           | _Mädchen, schön, Tür, Straße_                                                           |
| G1.3 | Letter pairs that sound different: ei/ie, eu, sch, ch, sp/st, w, v, z | _mein / wie, Schule, ich_                                                               |
| G1.4 | Three kinds of word: Nomen (always a capital letter), Verb, Pronomen  | _Anna **lernt**. **Sie** lernt._                                                        |

Borrows from: 1.1 Hallo, 1.2 Familie, 1.30 Pronomen & Co.

### G2 Erste Sätze (First sentences)

| Test | Teaches                                                          | Example                                                                                          |
| ---- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| G2.1 | **Wörter 1**: the words for G2.2 to G2.4                         | _heißen, sein, der Name, wie, müde, nett, krank, hier, neu, er, sie, es, der Lehrer, die Ärztin_ |
| G2.2 | `ich` and `du` with `heißen`                                     | _Ich heiße Anna. Wie heißt du?_                                                                  |
| G2.3 | `sein`: ich bin, du bist                                         | _Ich bin müde. Du bist nett._                                                                    |
| G2.4 | `er`, `sie`, `es` with `ist`                                     | _Er ist Lehrer. Sie ist Ärztin._                                                                 |
| G2.5 | **Wörter 2**: the words for G2.6 and G2.7                        | _wir, ihr, sie (she / they), Sie, der Freund, die Freundin, Herr, Frau, kommen, wohnen, aus, in_ |
| G2.6 | `wir`, `ihr`, `sie` with `sind` / `seid`; formal `Sie`           | _Wir sind Freunde. Sind Sie Herr Weber?_                                                         |
| G2.7 | `kommen aus`, `wohnen in`, and the questions `Woher …?`, `Wo …?` | _Woher kommst du? Ich komme aus Sri Lanka._                                                      |

Borrows from: 1.1 Hallo, 1.7 Der Beruf, 1.8 Angaben zur Person,
1.19 Gefühle, 1.30 Pronomen & Co.

### G3 Verben im Präsens (Verbs in the present)

| Test | Teaches                                                                                         | Example                                                                                                               |
| ---- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| G3.1 | **Wörter**                                                                                      | _spielen, kochen, machen, trinken, schwimmen, tanzen, singen, haben, die Zeit, das Auto, heute, Deutsch, der Fußball_ |
| G3.2 | Verb stem and ending; `ich -e`, `du -st`                                                        | _ich lerne, du lernst_                                                                                                |
| G3.3 | `er/sie/es -t`                                                                                  | _Er spielt Fußball._                                                                                                  |
| G3.4 | `wir -en`, `ihr -t`, `sie/Sie -en`                                                              | _Wir kochen. Ihr kocht._                                                                                              |
| G3.5 | `haben`                                                                                         | _Ich habe Zeit. Sie hat ein Auto._                                                                                    |
| G3.6 | In a statement the verb is the second idea (a yes/no question puts it first; G4.2 teaches that) | _Ich **lerne** heute Deutsch._                                                                                        |

Borrows from: 1.6 Die Hobbys, 1.17 Wichtige Verben.

### G4 Fragen (Questions)

| Test | Teaches                                                 | Example                                                                      |
| ---- | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| G4.1 | **Wörter**                                              | _wer, was, wo, woher, wohin, wann, nicht, doch, das Land, Indien, Sri Lanka_ |
| G4.2 | Yes/no questions: the verb moves to the front           | _Kommst du aus Indien?_                                                      |
| G4.3 | `wer`, `was`, `wie`                                     | _Wer ist das? Was machst du?_                                                |
| G4.4 | `wohin`, `wann`, building on `wo` and `woher` from G2.7 | _Wohin gehst du? Wann kommst du?_                                            |
| G4.5 | Answering: `ja`, `nein`, `doch`                         | _Kommst du nicht? Doch!_                                                     |

Borrows from: 1.8 Angaben zur Person, 1.16 Die W-Fragen.

### G5 Nomen & Artikel (Nouns and articles)

| Test | Teaches                                      | Example                                                                                                     |
| ---- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| G5.1 | **Wörter 1**: things at home and animals     | _der Tisch, der Stuhl, die Lampe, die Tür, das Bett, das Fenster, das Buch, der Hund, die Katze, das Pferd_ |
| G5.2 | Every noun has a gender: `der`, `die`, `das` | _der Tisch, die Lampe, das Bett_                                                                            |
| G5.3 | `ein`, `eine`: "a" versus "the"              | _Das ist ein Hund. Der Hund ist klein._                                                                     |
| G5.4 | **Wörter 2**: family, with plurals           | _der Bruder, die Schwester, das Kind, der Sohn, die Tochter, die Eltern, der Opa, die Oma_                  |
| G5.5 | Plural: always `die`, and the common endings | _das Kind, die Kinder_                                                                                      |
| G5.6 | `kein`, `keine`                              | _Das ist kein Hund._                                                                                        |
| G5.7 | `nicht`, and when to use `nicht` or `kein`   | _Ich komme nicht. Ich habe keine Zeit._                                                                     |

Borrows from: 1.2 Familie, 1.4 Haus & Zimmer, 1.24 Die Tiere. G5.4 is the
place to fill in the `plural` field for these words, which `TrainingCard`
already shows but almost no word has yet.

### G6 Akkusativ (The object of a sentence)

| Test | Teaches                                                              | Example                                                                                             |
| ---- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| G6.1 | **Wörter**                                                           | _der Apfel, der Kaffee, der Tee, das Brot, die Milch, der Saft, kaufen, brauchen, möchten, es gibt_ |
| G6.2 | Who does it, and to what; `der` becomes `den`, `ein` becomes `einen` | _Ich habe einen Bruder._                                                                            |
| G6.3 | `die` and `das` do not change; `keinen`                              | _Ich habe keinen Hund._                                                                             |
| G6.4 | `es gibt`, `brauchen`, `möchten` with an object                      | _Ich möchte einen Kaffee._                                                                          |
| G6.5 | Mixed: subject or object?                                            | _Der Mann kauft den Apfel._                                                                         |

Borrows from: 1.3 Essen & Trinken, 1.9 Einkaufen.

### G7 Possessivartikel (My, your, his, her)

| Test | Teaches                            | Example                                                                                  |
| ---- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| G7.1 | **Wörter**                         | _mein, dein, unser, euer, Ihr, der Vater, die Mutter, die Tasche, die Wohnung, besuchen_ |
| G7.2 | `mein`, `dein`, and the extra `-e` | _mein Vater, meine Mutter_                                                               |
| G7.3 | `sein`, `ihr`                      | _sein Auto, ihre Tasche_                                                                 |
| G7.4 | `unser`, `euer`, formal `Ihr`      | _unsere Wohnung, Ihr Name_                                                               |
| G7.5 | Possessives as the object          | _Ich besuche meinen Opa._                                                                |

Borrows from: 1.2 Familie, 1.4 Haus & Zimmer, 1.30 Pronomen & Co.

### G8 Besondere Verben (Verbs that change)

| Test | Teaches                                            | Example                                                                            |
| ---- | -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| G8.1 | **Wörter 1**: verbs that change their vowel        | _essen, lesen, sehen, sprechen, nehmen, geben, fahren, schlafen, laufen, tragen_   |
| G8.2 | Vowel change e to i / ie                           | _ich esse, du isst; ich lese, er liest_                                            |
| G8.3 | Vowel change a to ä                                | _ich fahre, er fährt_                                                              |
| G8.4 | **Wörter 2**: separable verbs                      | _aufstehen, anrufen, einkaufen, fernsehen, mitkommen, ankommen, abfahren, die Uhr_ |
| G8.5 | Separable verbs: the front part goes to the end    | _Ich stehe um 7 Uhr auf._                                                          |
| G8.6 | Separable verbs in questions and the daily routine | _Wann rufst du an?_                                                                |

Borrows from: 1.3 Essen & Trinken, 1.10 Zeit & Datum, 1.11 Verkehr & Wege,
1.17 Wichtige Verben.

### G9 Modalverben (Can, must, want, may)

| Test | Teaches                              | Example                                                                                      |
| ---- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| G9.1 | **Wörter**                           | _können, müssen, wollen, dürfen, man, arbeiten, parken, morgen, die Arbeit, die Hausaufgabe_ |
| G9.2 | `können`                             | _Ich kann schwimmen._                                                                        |
| G9.3 | `müssen`                             | _Ich muss arbeiten._                                                                         |
| G9.4 | `wollen` and `möchten`               | _Ich möchte Tee trinken._                                                                    |
| G9.5 | `dürfen`                             | _Hier darf man nicht parken._                                                                |
| G9.6 | Mixed: modal second, other verb last | _Kannst du morgen kommen?_                                                                   |

Borrows from: 1.6 Die Hobbys, 1.12 Arbeit & Schule, 1.17 Wichtige Verben.

### G10 Zeit & Ort (Time and place)

Dative is taught here only as fixed phrases. The full dative system belongs
to A2.

| Test  | Teaches                                      | Example                                                                                                  |
| ----- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| G10.1 | **Wörter 1**: time                           | _um, am, im, von, bis, der Montag, der Dienstag, das Wochenende, der Juli, der Sommer, die Uhr, morgens_ |
| G10.2 | `um`, `am`, `im`                             | _um 8 Uhr, am Montag, im Juli_                                                                           |
| G10.3 | `von ... bis`; time first, verb still second | _Am Montag **gehe** ich zum Arzt._                                                                       |
| G10.4 | **Wörter 2**: places and getting there       | _das Büro, die Schule, der Arzt, das Kino, der Bus, der Zug, bei, nach, zu, mit, aus_                    |
| G10.5 | Where? `in`, `bei` as fixed phrases          | _im Büro, in der Schule, bei Anna_                                                                       |
| G10.6 | Where to? `nach`, `zu`, `in`                 | _nach Berlin, zum Arzt, ins Kino_                                                                        |
| G10.7 | `mit` and `aus`                              | _mit dem Bus, aus der Schweiz_                                                                           |

Borrows from: 1.10 Zeit & Datum, 1.11 Verkehr & Wege, 1.25 In der Stadt,
1.27 Präpositionen.

### G11 Imperativ (Asking and telling)

| Test  | Teaches               | Example                                                                                  |
| ----- | --------------------- | ---------------------------------------------------------------------------------------- |
| G11.1 | **Wörter**            | _der Platz, warten, helfen, sagen, zeigen, öffnen, schließen, wiederholen, langsam, mir_ |
| G11.2 | Formal: `Sie`         | _Nehmen Sie Platz._                                                                      |
| G11.3 | Informal: `du`        | _Komm bitte!_                                                                            |
| G11.4 | Several people: `ihr` | _Wartet hier!_                                                                           |
| G11.5 | Polite requests       | _Können Sie mir helfen?_                                                                 |

Borrows from: 1.13 Gesundheit, 1.26 Alltagssprache.

### G12 Vergangenheit (Talking about the past)

| Test  | Teaches                           | Example                                                                                    |
| ----- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| G12.1 | **Wörter**                        | _gestern, letzte Woche, das Jahr, der Urlaub, nach Hause, gehen, reisen, fliegen, bleiben_ |
| G12.2 | `war` and `hatte`                 | _Ich war krank. Ich hatte keine Zeit._                                                     |
| G12.3 | Perfekt with `haben`: `ge-...-t`  | _Ich habe Deutsch gelernt._                                                                |
| G12.4 | Perfekt with `haben`: `ge-...-en` | _Ich habe Pizza gegessen._                                                                 |
| G12.5 | Perfekt with `sein`: movement     | _Ich bin nach Hause gegangen._                                                             |
| G12.6 | Mixed: `haben` or `sein`?         | _Wir sind gefahren. Wir haben gespielt._                                                   |

Borrows from: 1.10 Zeit & Datum, 1.14 Reise & Hotel, 1.17 Wichtige Verben.

### G13 Sätze verbinden (Joining ideas)

| Test  | Teaches                            | Example                                                             |
| ----- | ---------------------------------- | ------------------------------------------------------------------- |
| G13.1 | **Wörter**                         | _und, oder, aber, denn, gern, lieber, am liebsten, mich, dich, ihn_ |
| G13.2 | `und`, `oder`                      | _Ich trinke Tee oder Kaffee._                                       |
| G13.3 | `aber`, `denn`                     | _Ich komme nicht, denn ich bin krank._                              |
| G13.4 | `mich`, `dich`, `ihn`, `sie`, `es` | _Ich sehe ihn. Er ruft mich an._                                    |
| G13.5 | `gern`, `lieber`, `am liebsten`    | _Ich trinke lieber Tee._                                            |

Borrows from: 1.18 Kleine Wörter, 1.29 Adverbien, 1.30 Pronomen & Co.

## 4. Question types

Fourteen types. One sentence can feed most of them, the same way one
`VocabWord` feeds the eleven vocabulary types.

| Tier     | Type              | What the learner does                                                                                                  | Built from                                                  |
| -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Training | `rule`            | Reads a rule card: two or three example sentences with audio, the pattern highlighted, one or two lines of explanation | new `RuleCard`, modelled on `TrainingCard`                  |
| Training | `ruleCheck`       | Answers one easy pick question straight after the card                                                                 | `OptionGrid`                                                |
| Basic    | `gapPick`         | Picks the word that fills the gap: _Ich ___ Anna._ (bin / bist / ist / sind)                                           | `OptionGrid`                                                |
| Basic    | `sentenceMeaning` | Reads a German sentence, picks its meaning                                                                             | `OptionGrid`                                                |
| Easy     | `pairs`           | Matches two columns: pronoun to verb form, noun to article, question to answer                                         | `MatchPairs`                                                |
| Easy     | `sort`            | Drops words into two or three groups: der / die / das, or haben / sein                                                 | new `SortBuckets`                                           |
| Easy     | `listenPick`      | Hears a sentence, picks the one that was said                                                                          | `OptionGrid` + `playWord`                                   |
| Medium   | `order`           | Arranges shuffled word tiles into the sentence                                                                         | new `WordBuilder`, the word-tile version of `LetterBuilder` |
| Medium   | `spot`            | Taps the wrong word in a sentence, or confirms the sentence is right                                                   | new `SpotMistake`                                           |
| Medium   | `transform`       | Rewrites a sentence with tiles: statement to question, positive to negative, `ich` to `er`                             | `WordBuilder`                                               |
| Hard     | `meaningBuild`    | Reads the meaning, builds the German sentence from tiles that include decoys                                           | `WordBuilder`                                               |
| Hard     | `gapType`         | Types the missing word                                                                                                 | new `GapInput` with ä ö ü ß keys                            |
| Hard     | `listenBuild`     | Hears a sentence, builds it from tiles                                                                                 | `WordBuilder` + `playWord`                                  |
| Hard     | `reply`           | Reads or hears a line, picks the reply that fits                                                                       | `OptionGrid`                                                |

Notes on specific types:

- **`rule` is not a lecture.** Maximum three example sentences and two lines
  of text per card. A rule that needs more is split across two tests.
- **`order` is the most important type** for learners whose own language
  puts the verb last. Every grammar test from G3.6 onward includes it.
- **`gapType` needs on-screen letter keys.** Most learners will not have a
  German keyboard. The keys keep the case of the answer, so `St` in `Stuhl`
  or `Ich` at the start of a sentence can be typed. Answers are compared
  without case, and a right answer typed in the wrong case gets a short
  note about the capital letter.
- **`reply` is the exam bridge.** It mirrors the A1 speaking and listening
  tasks, where the learner reacts to a question or a request.
- **The hint fits the mistake.** After a miss, the learner sees a hint
  chosen by question type, never the answer:

  | Question type                            | Hint shown after a miss                                                                                                                        |
  | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
  | `rule` check                             | the rule card's text                                                                                                                           |
  | `gapPick`, `gapType`, `spot`             | the sentence's `why` (the rule for the focus word)                                                                                             |
  | `order`, `meaningBuild`, `listenBuild`   | a word-order hint when the words are right but the order isn't, otherwise the sentence's `why`                                                 |
  | `transform`                              | the instruction again when the sentence was left unchanged, a word-order hint for the wrong order, otherwise the `why` of the sentence to make |
  | `sentenceMeaning`, `listenPick`, `reply` | a fixed hint for that type, never a grammar rule                                                                                               |

  So a sentence's `why` must be about the form of its focus word and
  nothing else: it is only shown where that form is what went wrong.

These types are for grammar tests. Word tests use the eleven vocabulary
types unchanged.

Which grammar tests use which types:

| Test kind                        | Types                                                                                                                                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sounds and letters (G1.2, G1.3)  | `rule`, `ruleCheck`, `listenPick`, `pairs`, `gapType`                                                                                                                                          |
| Verb forms (G2, G3, G8, G9, G12) | all except `sort` (G12.6 adds `sort` for haben / sein)                                                                                                                                         |
| Articles and cases (G5, G6, G7)  | all, with `sort` for gender                                                                                                                                                                    |
| Word order (G3.6, G4, G10.3)     | `rule`, `ruleCheck`, `order`, `transform`, `spot`, `meaningBuild`, `listenBuild`. No `sentenceMeaning`: two orders of one sentence mean the same, so a meaning question doesn't test the order |
| Fixed phrases (G10, G11, G13)    | `rule`, `ruleCheck`, `gapPick`, `sentenceMeaning`, `pairs`, `order`, `meaningBuild`, `reply`                                                                                                   |

## 5. Data model

A word test is a list of word references. A grammar test is a rule plus a
list of sentences. Each sentence carries
enough information for every question type to be generated from it, so
writing a test means writing sentences, not writing questions.

The sketch below is the plan the code started from. The live types in
`src/data/grammar/types.ts` are the source of truth and have more fields.
These were added after G1 to G3 were tested, and every new lesson needs to
think about them:

| Field          | On        | Use it when                                                                                                                                                                                                                                                           |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alternatives` | sentence  | Another word order is just as right (_Er ist neu hier._ / _Er ist hier neu._, _Heute habe ich Zeit._ / _Ich habe heute Zeit._). `order` and `meaningBuild` accept it; `listenBuild` and `transform` don't, because there the audio or the instruction fixes the order |
| `formal`       | sentence  | The sentence starts with polite `Sie`. Word tiles show the first word in lower case unless it's a noun, a name or polite `Sie`; without this flag, _Sie trinken Wasser, Frau Weber._ would show the tile `sie`                                                        |
| `nounFirst`    | sentence  | The sentence starts with a noun or a name (_Anna kommt aus Wien._), which keeps its capital on a word tile. Any other first word is shown in lower case                                                                                                               |
| `pairsPrompt`  | test      | Always, when the test has a pairs board: one line saying what to match ("Match each word to the sound it has.")                                                                                                                                                       |
| `newWords`     | word test | A word needs a meaning its Wortschatz entry doesn't give. G2.5 teaches `sie` as "she / they" because 1.30 has only "They"                                                                                                                                             |

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

| File                                        | Change                                                                                                                                                                                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/grammar/index.ts` (new)           | `GRAMMAR_LESSONS`, and a lookup that turns a word test's `{ lessonId, wordId }` references into `VocabWord`s from `VOCAB_LESSONS`                                                                                                                               |
| `src/lib/grammar-engine.ts` (new)           | `GrammarType` union, tier table, queue builder that turns pending rows plus a `GrammarTest` into quiz items                                                                                                                                                     |
| `src/lib/progress-store.ts`                 | Rows are already stored as `"<type>:<id>"` strings. Let the caller pass the tier lookup so grammar types can use the same store and the same pending-attempts rule                                                                                              |
| `src/components/quiz/GrammarQuiz.tsx` (new) | The grammar counterpart of `VocabQuiz`: takes a `GrammarTest`, runs the tiered queue                                                                                                                                                                            |
| `src/components/quiz/pieces.tsx`            | New pieces: `RuleCard`, `WordBuilder`, `SortBuckets`, `SpotMistake`, `GapInput`, and a tappable `GlossedSentence`. Existing `OptionGrid`, `MatchPairs`, `LessonFrame`, `Continue`, `ResultCard` are reused as they are                                          |
| `src/routes/index.tsx`                      | A new first path node, "Grammatik", built from `GRAMMAR_LESSONS`, above Wortschatz, ÖSD and Testing; word tests open the existing `"quiz"` screen (`VocabQuiz` with the resolved words), grammar tests a new `"grammar"` screen; unlock state for grammar nodes |
| `src/lib/i18n.ts`                           | Strings for the new screens in all three languages                                                                                                                                                                                                              |
| `scripts/generate-audio.mjs`                | Sentence entries per grammar lesson                                                                                                                                                                                                                             |
| `AGENTS.md`                                 | A "Grammar lessons" section once the first lesson ships                                                                                                                                                                                                         |

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
without help, and can they say _Ich heiße ..._ afterwards?

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

| Decision                                                                         | Recommendation                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Do grammar lessons lock in order?                                                | Yes. Grammar builds on itself in a way vocabulary does not. Keep the vocabulary sections open                                                                                                                                             |
| Who checks the Tamil and Sinhala explanations?                                   | A native speaker reviews each lesson before it ships. A wrong grammar explanation does more harm than a wrong word meaning                                                                                                                |
| Do grammar tests need Wortschatz first?                                          | No. Grammar is the starting point, so each lesson's word tests teach the words it needs, and the result screen links forward to the Wortschatz lesson for more practice                                                                   |
| Typing on a phone                                                                | Ship `gapType` with on-screen ä ö ü ß keys. If typing still frustrates learners in Phase 2, drop it from the default set and keep tiles                                                                                                   |
| Where does grammar sit on the path?                                              | Decided: first. 1 Grammatik, 2 Wortschatz, 3 ÖSD, 4 Testing                                                                                                                                                                               |
| A word test repeats words the learner already mastered in Wortschatz. Skip them? | Not in Phase 1. A word test has its own test id and its own progress, so a learner who did 1.30 Pronomen & Co sees `ich` and `du` again. That is short, and it is spiral practice. Revisit once there is a shared per-word mastery record |

## 9. Checklist for every new lesson

Testing G1 to G3 found 31 bugs (`docs/qa/bug-reports/BUGS-G1.md` to
`BUGS-G3.md`). Almost none were wrong German. They were right answers the
app rejected, rule cards that contradicted their own questions, and things
tested before they were taught. The engine now guards against some of
these. The rest can only be caught while writing the lesson, so check every
item below for each test of G4 to G13 before it ships.

### Capitals on word tiles

Word tiles show the first word of a sentence in lower case, so the one
capital doesn't give away which word comes first (`tileWords` in
`grammar-engine.ts`). The first word keeps its capital only when it is a
noun or a name, or polite `Sie`. Mark a sentence that starts with a noun or
a name (_Anna kommt._, _Der Mann …_ doesn't need it: `der` is lower case)
with `nounFirst`, and one that starts with polite `Sie` with `formal`.
An alternative order that starts with a word written with a capital later
in the sentence (_Heute spielt **Tom** Fußball._ → _Tom spielt heute
Fußball._) keeps that capital without a flag.

### Exactly one right answer

- **Fill every option into every question and read the result as German.**
  Exactly one option may work. Zero or two right options is a bug, even
  when the second one is only "technically" right.
- **English has one "you".** `du`, `ihr` and `Sie` all translate as "you".
  Write `ihr` meanings with "all" ("You all have time.") and polite `Sie`
  meanings with "(polite)". The engine then keeps "You have time." out of
  the options when "You all have time." is the answer. A meaning that
  differs from another in any other way English can't show will still
  produce two right answers. Rewrite one of the two sentences.
- **Word order that can change.** Two adverbs (_neu hier_ / _hier neu_), a
  time phrase that can go first (_Heute hat Tom Zeit._), anything English
  doesn't fix: list every right order in `alternatives`. A sentence whose
  order the English does fix (_Anna and Tom_ → _Anna und Tom_) needs none.
- **Pairs boards.** Each word on the left must fit exactly one item on the
  right, even when the learner applies the rule to the whole text,
  article included. _die Zeit_ matched both `z` and `ei`, and the `ie` in
  _die_ made _die Schule_ match `ie` as well as `sch`. Check every left
  item against every right item.
- **Gaps with real-word decoys.** _sch_n_ + `o` is _schon_, and
  _Sie _ krank_ fits both `ist` and `sind`. That's fair only because the
  meaning under the question rules the decoy out. Read each decoy against
  the meaning, not only against the gap.

### Teach before you test

- **Every word and structure a question uses must appear earlier**: on a
  rule card, as a sentence of the test, or in the word test. G2.7 asked
  _Woher kommst du?_ in pairs and replies before any card taught `woher`.
  Check `replyTo` lines, pairs and sort tiles too, not only the sentences.
- **Teach a word with every meaning the lesson will use.** G2.5 taught
  `sie` = "They" right after G2.4 used `sie` = "she". When a Wortschatz word
  carries only one of its meanings, give the word test its own entry in
  `newWords`.
- **Rule cards play in the order they are listed.** List them so each card
  builds on the one before. A card that says "stays second" or "follows
  the normal pattern" must come after the card that teaches the pattern.

### Rule cards that hold up

- **No "always" unless it really is always.** "The verb always comes
  second" was contradicted by _Hast du Zeit?_ in the same test. Before
  writing a rule, search this lesson and every earlier one, including
  `replyTo` lines, for sentences that break it, and say where the rule
  stops ("In a statement …").
- **A definition must cover everything the test files under it.** The
  Pronomen card said "stands in for a Nomen", then the sort board wanted
  `ich` and `du` under Pronomen.
- **No tricks that only work in English.** "Say the second letter!" works
  with English letter names and gives the wrong sound with German ones.
  The Tamil and Sinhala text must teach the same thing as the English.
- **Tables say which `sie`.** Once G2.6 has taught "they", a table row
  `er, sie → kommt` is ambiguous. Write `"sie" = she` or add the plural
  row. Name polite `Sie` wherever the rule covers it.
- **Explain the English when it changes.** English has "I learn" and "I am
  learning" where German has one form. Pick one English tense for the
  lesson, or say once on a card that both mean the same German.

### Questions that test the rule

- **Drop types that can't test the rule.** In a word-order test, both
  orders mean the same, so `sentenceMeaning` is answered by spotting one
  noun. Leave out any type a learner can answer without knowing the rule.
- **`why` is about the focus word only.** It's shown after a wrong gap, a
  missed planted mistake or a wrong word on the tiles (see
  [question types](#4-question-types)), never after a wrong meaning or
  reply.
- **Decoys must be really wrong.** A `reply` decoy needs to be wrong German
  or the wrong thing to say. A `spot` decoy that happens to be real German
  (_Er habe ein Auto._, Konjunktiv) is acceptable at A1, but a plainly
  wrong form is better.
- **Spelling and case.** Vocabulary spelling tiles are upper case. A word
  test that holds two words differing only in case (`Sie`, `sie`) must
  leave out `build` and `listenBuild`.

### Board and path details

- **One kind of pair per board**, every pair the same kind (word ↔ meaning,
  person ↔ verb form, Nomen ↔ Pronomen), and a `pairsPrompt` that names
  it. At least three pairs, and no two right-hand labels the same in any
  language.
- **The path title covers the whole test.** A title listing only some of
  what the test teaches (G1.3 "ei, ie, sch, w, z") misleads. Use a short
  name instead ("Neue Laute").
- **One subtitle pattern per lesson**, e.g. _he, she, it plays_ / _we play,
  you all play_.

### Before it ships

1. `bun run lint`, `bun run typecheck` and `bun run build` pass.
2. Every German string a screen speaks has a clip: sentences, `replyTo`
   lines, pairs (left side) and sort tiles. Rule-check options are spoken
   only when every option has a clip, so wrong forms there can go without.
   Add the clips to `scripts/generate-audio.mjs` and run
   `bun run generate-audio`.
3. A tester plays every test in the browser, following
   [QA-PLAYBOOK.md](../qa/QA-PLAYBOOK.md): black-box, judged by their own German,
   with at least one deliberate wrong answer per question type. They check
   that the hint fits the mistake and that a missed rule card or board
   comes back once, not more.
4. A native speaker reviews the Tamil and Sinhala text.
