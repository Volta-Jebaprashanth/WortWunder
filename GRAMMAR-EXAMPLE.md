# Grammar test example: 4.2.2 "ich bin, du bist"

One grammar test, shown from the first screen to the last, so the format in
[ROADMAP.md](ROADMAP.md) can be judged before anything is built.

The screens are sketches of content and layout, not pixel designs. They show
the app with English as the mother tongue; a Tamil or Sinhala learner sees
the same screens with the grey text in their language.

## Contents

1. [The test at a glance](#1-the-test-at-a-glance)
2. [Training](#2-training)
3. [Basic](#3-basic)
4. [Easy](#4-easy)
5. [Medium](#5-medium)
6. [Hard](#6-hard)
7. [Finish screen](#7-finish-screen)
8. [The data behind it](#8-the-data-behind-it)
9. [The one type this test does not use](#9-the-one-type-this-test-does-not-use)

## 1. The test at a glance

| | |
| --- | --- |
| Path position | 4 Grammatik, 4.2 Erste Sätze, test 2 of 5 |
| The one rule | With `ich` the verb is `bin`. With `du` the verb is `bist`. |
| Already known | `ich`, `du`, names, *Hallo* (from 4.2.1 and 1.1 Hallo) |
| New words | `müde`, `nett`, `hier`, `krank`, `neu` |

The eight sentences everything is built from:

| Id | German | Meaning |
| --- | --- | --- |
| s1 | Ich bin Anna. | I am Anna. |
| s2 | Du bist Tom. | You are Tom. |
| s3 | Ich bin müde. | I am tired. |
| s4 | Du bist nett. | You are nice. |
| s5 | Ich bin hier. | I am here. |
| s6 | Du bist krank. | You are sick. |
| s7 | Ich bin neu hier. | I am new here. |
| s8 | Du bist müde. | You are tired. |

What the learner goes through:

| Tier | Screens | Count |
| --- | --- | --- |
| Training | 5 new-word cards, 1 rule card, 1 check question | 7 |
| Basic | pick the gap (8), pick the meaning (8) | 16 |
| Easy | listen and pick (8), match pairs (1 board) | 9 |
| Medium | word order (8), find the mistake (8), change the sentence (4) | 20 |
| Hard | build from meaning (8), type the gap (8), dictation (8), pick the reply (2) | 26 |

About 78 screens if nothing is missed. A missed question comes back later in
the same tier, under the same pending-attempts rule the vocabulary tests use.
The learner can leave at any point and resume where they stopped.

Every screen shares one frame:

```
┌──────────────────────────────────┐
│ ✕   ▓▓▓▓▓▓▓░░░░░░░░░░░░░   12/78 │  close, progress
│     ● ● ○ ○ ○                    │  tier steps: training ... hard
│                                  │
│  (the question)                  │
│                                  │
│  [          CHECK            ]   │
└──────────────────────────────────┘
```

In the sketches below, `[bin]` marks the verb highlight colour and `🔊`
marks something that plays audio when tapped.

## 2. Training

### New-word cards

One card per new word, the same card vocabulary tests already use
(`TrainingCard`). Five cards, then the rule.

```
┌──────────────────────────────────┐
│  New word                        │
│                                  │
│        ┌──────────────┐          │
│        │   (photo)    │          │
│        └──────────────┘          │
│                                  │
│          🔊  müde                │
│            tired                 │
│                                  │
│  [         CONTINUE          ]   │
└──────────────────────────────────┘
```

### `rule`: the rule card

Examples first, the rule in one line under them, then the pattern as a small
table. Tapping a sentence plays it; tapping a single word shows its meaning.

```
┌──────────────────────────────────┐
│  "I am" and "you are"            │
│                                  │
│  🔊  Ich [bin] Anna.             │
│      I am Anna.                  │
│                                  │
│  🔊  Du [bist] Tom.              │
│      You are Tom.                │
│                                  │
│  The word after "ich" is "bin".  │
│  The word after "du" is "bist".  │
│                                  │
│      ich   →   bin               │
│      du    →   bist              │
│                                  │
│  "Du" is for friends, family     │
│  and children.                   │
│                                  │
│  [         CONTINUE          ]   │
└──────────────────────────────────┘
```

For Tamil and Sinhala learners the last line reads differently: it says that
`du` is the informal "you" (நீ / ඔයා), which they already know as a concept.

### `ruleCheck`: one easy question straight after

```
┌──────────────────────────────────┐
│  Which word goes with "ich"?     │
│                                  │
│  ┌─────────────┐ ┌─────────────┐ │
│  │     bin     │ │    bist     │ │
│  └─────────────┘ └─────────────┘ │
│                                  │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

## 3. Basic

### `gapPick`: pick the word for the gap

```
┌──────────────────────────────────┐
│  Fill the gap                    │
│                                  │
│      Ich  ____  müde.            │
│      I am tired.                 │
│                                  │
│  ┌─────────────┐ ┌─────────────┐ │
│  │     bin     │ │    bist     │ │
│  └─────────────┘ └─────────────┘ │
│  ┌─────────────┐ ┌─────────────┐ │
│  │     ist     │ │    sind     │ │
│  └─────────────┘ └─────────────┘ │
│                                  │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

`ist` and `sind` have not been taught yet. They are there as decoys only,
and the learner will recognise them when 4.2.3 and 4.2.4 arrive.

After a correct answer:

```
│  ✓  Ich [bin] müde.         🔊   │
│     I am tired.                  │
│  [         CONTINUE          ]   │
```

After a wrong answer (the learner picked `bist`):

```
│  ✗  Ich [bin] müde.         🔊   │
│     I am tired.                  │
│                                  │
│     "bist" goes with "du".       │
│     With "ich" it is "bin".      │
│  [          GOT IT           ]   │
```

Every question type uses this same feedback strip: the full correct
sentence with the verb highlighted, its audio, and one line saying why.

### `sentenceMeaning`: pick what the sentence means

```
┌──────────────────────────────────┐
│  What does this mean?            │
│                                  │
│      🔊  Du bist krank.          │
│                                  │
│  ┌──────────────────────────────┐│
│  │ You are sick.                ││
│  ├──────────────────────────────┤│
│  │ I am sick.                   ││
│  ├──────────────────────────────┤│
│  │ You are tired.               ││
│  ├──────────────────────────────┤│
│  │ I am here.                   ││
│  └──────────────────────────────┘│
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

The wrong options are the meanings of other sentences in the test, chosen so
at least one differs only in the person (I / you) and one only in the last
word.

## 4. Easy

### `listenPick`: hear it, pick it

The sentence plays once on its own; the speaker button repeats it.

```
┌──────────────────────────────────┐
│  What did you hear?              │
│                                  │
│            ( 🔊 )                │
│                                  │
│  ┌──────────────────────────────┐│
│  │ Ich bin müde.                ││
│  ├──────────────────────────────┤│
│  │ Du bist müde.                ││
│  ├──────────────────────────────┤│
│  │ Ich bin neu hier.            ││
│  └──────────────────────────────┘│
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

### `pairs`: match the two columns

One board for the whole test, using the existing `MatchPairs` piece.
Tap one on the left, then its partner on the right.

```
┌──────────────────────────────────┐
│  Match the pairs                 │
│                                  │
│  ┌────────────┐  ┌─────────────┐ │
│  │ ich        │  │ bist        │ │
│  ├────────────┤  ├─────────────┤ │
│  │ du         │  │ bin         │ │
│  ├────────────┤  ├─────────────┤ │
│  │ Ich bin    │  │ You are     │ │
│  ├────────────┤  ├─────────────┤ │
│  │ Du bist    │  │ I am        │ │
│  └────────────┘  └─────────────┘ │
└──────────────────────────────────┘
```

## 5. Medium

### `order`: put the words in order

The tiles are the words of the sentence, shuffled. Tapping a tile moves it
into the next empty slot; tapping a placed tile sends it back.

```
┌──────────────────────────────────┐
│  Put the words in order          │
│                                  │
│      I am new here.              │
│                                  │
│   ┌─────┐ ┌─────┐ ┌────┐ ┌────┐  │
│   │ Ich │ │     │ │    │ │    │  │
│   └─────┘ └─────┘ └────┘ └────┘  │
│                                  │
│      ┌──────┐ ┌─────┐ ┌─────┐    │
│      │ hier │ │ bin │ │ neu │    │
│      └──────┘ └─────┘ └─────┘    │
│                                  │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

### `spot`: find the mistake

One word is wrong. The learner taps it. Some sentences are correct, and for
those the learner taps "No mistake".

```
┌──────────────────────────────────┐
│  Tap the wrong word              │
│                                  │
│   ┌────┐ ┌─────┐ ┌───────┐       │
│   │ Du │ │ bin │ │ nett. │       │
│   └────┘ └─────┘ └───────┘       │
│      You are nice.               │
│                                  │
│  ┌──────────────────────────────┐│
│  │        No mistake            ││
│  └──────────────────────────────┘│
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

Feedback shows the fix: *Du [bist] nett.* with the line
`"bin" goes with "ich". With "du" it is "bist".`

### `transform`: change the sentence

Only sentences that have a partner in the test get this type. Here there
are four: s3 and s8 (*müde*) in both directions, and two more made the same
way.

```
┌──────────────────────────────────┐
│  Say it about "du"               │
│                                  │
│      Ich bin müde.               │
│                                  │
│   ┌─────┐ ┌──────┐ ┌──────┐      │
│   │     │ │      │ │      │      │
│   └─────┘ └──────┘ └──────┘      │
│                                  │
│   ┌─────┐ ┌────┐ ┌──────┐ ┌────┐ │
│   │ bin │ │ Du │ │ bist │ │müde│ │
│   └─────┘ └────┘ └──────┘ └────┘ │
│                                  │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

The old verb (`bin`) stays in the tile pool as a decoy, so the learner has
to change it on purpose.

## 6. Hard

### `meaningBuild`: build the German from the meaning

No German sentence is shown. The tile pool holds the right words plus
decoys.

```
┌──────────────────────────────────┐
│  Write this in German            │
│                                  │
│      You are sick.               │
│                                  │
│   ┌─────┐ ┌──────┐ ┌───────┐     │
│   │     │ │      │ │       │     │
│   └─────┘ └──────┘ └───────┘     │
│                                  │
│  ┌────┐ ┌─────┐ ┌──────┐ ┌─────┐ │
│  │ Du │ │ bin │ │ bist │ │ Ich │ │
│  └────┘ └─────┘ └──────┘ └─────┘ │
│        ┌───────┐ ┌──────┐        │
│        │ krank │ │ müde │        │
│        └───────┘ └──────┘        │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

### `gapType`: type the missing word

The only screen with a keyboard. The four German letters sit above the
phone keyboard so nobody needs a German layout.

```
┌──────────────────────────────────┐
│  Type the missing word           │
│                                  │
│      Du  [ bis_      ]  nett.    │
│      You are nice.               │
│                                  │
│      ┌───┐ ┌───┐ ┌───┐ ┌───┐     │
│      │ ä │ │ ö │ │ ü │ │ ß │     │
│      └───┘ └───┘ └───┘ └───┘     │
│                                  │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

`Bist` and `bist` both count as correct here. Capital letters are only
checked in tests where they are the point.

### `listenBuild`: dictation with tiles

```
┌──────────────────────────────────┐
│  Build what you hear             │
│                                  │
│            ( 🔊 )                │
│                                  │
│   ┌─────┐ ┌─────┐ ┌─────┐        │
│   │     │ │     │ │     │        │
│   └─────┘ └─────┘ └─────┘        │
│                                  │
│   ┌──────┐ ┌─────┐ ┌─────┐       │
│   │ hier │ │ Ich │ │ bin │       │
│   └──────┘ └─────┘ └─────┘       │
│                                  │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

No meaning is shown and there are no decoys: the task is hearing, not
choosing the form.

### `reply`: pick the answer that fits

A short exchange, like the exam's speaking part. The first line plays
aloud.

```
┌──────────────────────────────────┐
│  What do you say back?           │
│                                  │
│  ┌──────────────────────────┐    │
│  │ 🔊 Hallo! Ich bin Tom.   │    │
│  └──────────────────────────┘    │
│                                  │
│  ┌──────────────────────────────┐│
│  │ Hallo Tom! Ich bin Anna.     ││
│  ├──────────────────────────────┤│
│  │ Hallo Tom! Du bist Anna.     ││
│  ├──────────────────────────────┤│
│  │ Hallo Tom! Ich bist Anna.    ││
│  └──────────────────────────────┘│
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

The second option is good German but the wrong thing to say; the third is
the wrong form. Both kinds of decoy appear in every `reply` question.

## 7. Finish screen

The existing `ResultCard`, with one addition: the sentences the learner can
now say.

```
┌──────────────────────────────────┐
│            ⭐ Done!              │
│                                  │
│  You can now say:                │
│                                  │
│  🔊  Ich bin Anna.               │
│  🔊  Ich bin müde.               │
│  🔊  Du bist nett.               │
│                                  │
│  Next: er, sie, es ist           │
│                                  │
│  [         CONTINUE          ]   │
└──────────────────────────────────┘
```

## 8. The data behind it

All of the screens above come from this one object. Nobody writes
individual questions.

Two sentences are shown in full; the other six have the same shape. The
Tamil and Sinhala strings here are drafts and need a native speaker's
review before they ship.

```ts
// src/data/grammar/first-sentences.ts
export const TEST_4_2_2: GrammarTest = {
  testId: "4.2.2",
  title: "ich bin, du bist",
  meaning: {
    english: "I am, you are",
    tamil: "நான், நீ",
    sinhala: "මම, ඔයා",
  },
  newWordIds: ["muede", "nett", "hier", "krank", "neu"],
  testTypes: [
    "rule",
    "ruleCheck",
    "gapPick",
    "sentenceMeaning",
    "listenPick",
    "pairs",
    "order",
    "spot",
    "transform",
    "meaningBuild",
    "gapType",
    "listenBuild",
    "reply",
  ],
  rules: [
    {
      id: "bin-bist",
      title: {
        english: '"I am" and "you are"',
        tamil: "...",
        sinhala: "...",
      },
      text: {
        english: 'The word after "ich" is "bin". The word after "du" is "bist".',
        tamil: "...",
        sinhala: "...",
      },
      exampleIds: ["s1", "s2"],
      table: [
        { left: "ich", right: "bin" },
        { left: "du", right: "bist" },
      ],
    },
  ],
  sentences: [
    {
      id: "s1",
      german: "Ich bin Anna.",
      meaning: {
        english: "I am Anna.",
        tamil: "நான் அன்னா.",
        sinhala: "මම ඇනා.",
      },
      focus: 1, // "bin"
      distractors: ["bist", "ist", "sind"],
      why: {
        english: '"bist" goes with "du". With "ich" it is "bin".',
        tamil: "...",
        sinhala: "...",
      },
      replyTo: {
        german: "Hallo! Ich bin Tom.",
        meaning: {
          english: "Hello! I am Tom.",
          tamil: "...",
          sinhala: "...",
        },
      },
    },
    {
      id: "s3",
      german: "Ich bin müde.",
      meaning: {
        english: "I am tired.",
        tamil: "நான் சோர்வாக இருக்கிறேன்.",
        sinhala: "මට මහන්සියි.",
      },
      focus: 1,
      distractors: ["bist", "ist", "sind"],
      why: {
        english: '"bist" goes with "du". With "ich" it is "bin".',
        tamil: "...",
        sinhala: "...",
      },
      transformTo: {
        german: "Du bist müde.",
        prompt: {
          english: 'Say it about "du"',
          tamil: "...",
          sinhala: "...",
        },
      },
    },
    // s2, s4, s5, s6, s7, s8: same shape
  ],
  pairs: [
    { left: "ich", right: "bin" },
    { left: "du", right: "bist" },
    { left: "Ich bin", right: "I am" },
    { left: "Du bist", right: "You are" },
  ],
};
```

How each screen is derived from a sentence:

| Type | Uses |
| --- | --- |
| `gapPick`, `gapType` | `german` with the `focus` word removed; `distractors` as the wrong options |
| `sentenceMeaning` | `german` and `meaning`; wrong options are other sentences' meanings |
| `listenPick`, `listenBuild` | the sentence's audio clip; other sentences as wrong options |
| `order`, `meaningBuild` | the words of `german` as tiles; `distractors` as decoy tiles |
| `spot` | `german` with the `focus` word swapped for one of `distractors` |
| `transform` | `transformTo` |
| `reply` | `replyTo` as the prompt; the wrong replies swap the pronoun or the verb form |
| feedback strip | `german`, `meaning`, `why` |

One thing in this example goes beyond the data model in ROADMAP.md: the
last two `pairs` rows have a mother-tongue right-hand side ("I am"), so
`pairs.right` needs to accept either plain German text or a localized
string.

## 9. The one type this test does not use

`sort` has nothing to sort when the rule is two verb forms. It first
appears in 4.5.1, where the learner drags nouns onto their article:

```
┌──────────────────────────────────┐
│  der, die or das?                │
│                                  │
│  ┌────────┐ ┌────────┐ ┌───────┐ │
│  │  der   │ │  die   │ │  das  │ │
│  │        │ │        │ │       │ │
│  │ Tisch  │ │        │ │       │ │
│  └────────┘ └────────┘ └───────┘ │
│                                  │
│   ┌───────┐ ┌──────┐ ┌───────┐   │
│   │ Lampe │ │ Bett │ │ Stuhl │   │
│   └───────┘ └──────┘ └───────┘   │
│                                  │
│  [           CHECK           ]   │
└──────────────────────────────────┘
```

The three boxes use the article colours the app already has, so the colour
a noun lands in is the colour it keeps everywhere else.
