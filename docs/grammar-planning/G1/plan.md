# G1 Los geht's — full lesson plan

The detailed plan for section G1 of [ROADMAP.md](../ROADMAP.md). The roadmap
says _what_ each test teaches; this file says _how_: the teaching screens,
the questions at each level, the memory tricks, and the penalty rules.

Audience of the app: English-speaking kids (adults welcome) with zero
German. Every teaching card is also shown in the learner's mother tongue
(English, Tamil, Sinhala — `src/lib/i18n.ts`).

## 1. The app today (what G1 builds on)

- **One quiz engine, tier-gated.** `src/lib/quiz-engine.ts` builds rounds
  from "rows" (one question × one item). `src/lib/progress-store.ts` gives
  each row a _pending_ counter; a test is done when every row is 0, and a
  level only opens when the level before it is fully cleared.
- **Screens that already exist** (`src/components/quiz/pieces.tsx`):
  `TrainingCard` (intro card), picture ↔ word choice, meaning, listen and
  choose, missing letter, listen → picture, translate, letter builder,
  listen → letter builder, match pairs, `LetterOptions`, `ResultCard`.
- **Audio** is pre-generated (`scripts/generate-audio.mjs`); every letter
  A–Z already has a clip (`src/data/letter-audio.generated.ts`).
- **No microphone / speech recognition.** "Speaking" is practised by
  building the sentence (tiles, typing) and by optional, unscored "say it
  after me" screens.
- **Grammar is empty** on the path ("Grammatik", `children: []` in
  `src/routes/index.tsx`). The old `GrammarQuiz.tsx`, `grammar-pieces.tsx`
  and `grammar-engine.ts` (sentence tiles, gap input) were removed in
  commit `eb55c3d` and can be restored from `eb55c3d^` as a starting point.

## 2. The four levels

Every G1 test runs the same four levels, in order. A level opens only
when every question in the level before it is cleared.

| Level           | Colour (existing `TierSteps`) | What the learner does                                  | Help allowed       |
| --------------- | ----------------------------- | ------------------------------------------------------ | ------------------ |
| 🟣 **Training** | violet                        | Sees and hears the new thing, then one easy check      | Everything         |
| 🔵 **Simple**   | sky / green                   | Recognises it: choose from 2–4 options                 | 🔊 replay, 💡 hint |
| 🟡 **Medium**   | amber                         | Recalls it: fill a gap, sort, listen and pick, 4+ opts | 🔊 replay, 💡 hint |
| 🔴 **Hard**     | berry                         | Produces it: build/type with no options, mixed review  | 🔊 replay only     |

Engine mapping: Training = today's `training` + `basic` tiers merged
(intro card, then "find the picture"); Simple = `easy`; Medium = `medium`;
Hard = `hard`. `TierSteps` shows 4 dots instead of 5 for grammar tests.

## 3. Penalty rules (all G1 tests)

They build on the existing pending counter, so learners can't skip
ahead by guessing, and nothing is ever taken away from them.

1. **Every question starts at 1** ("answer me right once").
2. **First mistake on a question: +2.** The learner now owes it more
   correct answers. Caps: Training 3, Simple 4, Medium 4, **Hard 5**.
   More mistakes on the same question in the same round add nothing extra.
3. **A correct answer: −1.**
4. **After a mistake** the app shows what the learner picked and the
   one-line tip for that rule, then "Try again" on the same question until
   it is right (today's behaviour). The right answer is not given away,
   except on build screens, which show the correct spelling. The +2 makes
   the question come back in later rounds, reshuffled.
5. **Using 💡 Hint** (removes wrong options / shows the first letter or tile)
   means the answer **doesn't count down** (no −1), but it isn't a mistake
   either (no +2). Hard has no hints.
6. **Level gate:** the next level opens only when every question in this
   level is at 0. The test is complete when Hard is at 0.
7. **Test gate:** G1.1 → G1.6 open in order. G1.6 (Sprechen) needs
   G1.1–G1.5 done.
8. **Three misses in a row → "Pause card"**, the kid-safety valve. The app
   shows the _Merke_ card again and one easy question from the level before
   (unscored), then continues. No lives, no hearts, no lock-outs, and
   progress is never lost.
9. **Stars on the result card** (based on Hard only): ⭐⭐⭐ no mistakes, ⭐⭐
   1–2 mistakes, ⭐ more. Replaying a completed test resets the counters
   (current behaviour) to try for 3 stars.
10. **Warm-up:** each test starts with 2 unscored review questions from the
    test before it (G1.2 onward), so earlier things keep coming back.

## 4. Memory system used across all of G1

- **Mascots:** the Katze 🐱 and the Maus 🐭 (the repo's name). The cat
  teaches, the mouse makes the mistakes kids make ("Maus says _I_ for E —
  oops!"), so the learner is never the one being corrected first.
- **Word-kind colours, fixed from G1.5 for the whole app:**
  **Nomen = blue 📦** (a thing you can point at), **Verb = red ⚡** (an
  action you can do), **Pronomen = green 🔁** (a stand-in word). Every
  sentence tile in G2–G20 keeps these colours, so G1.5 pays off for the
  rest of the course.
- **Sound clubs:** letters and letter pairs are taught in families that
  rhyme or share a trick, never as one long list of 26.
- **One rule = one Merke card**: max 1 sentence + 1 example + 1 picture/
  animation. It is saved to the test's "📒 My notebook" (later feature,
  optional).
- **Repeat aloud screens** (🔁 "Say it after me"): unscored, always
  skippable. They help memory even without a microphone.

## 5. The tests

Item counts are per level, so one run is about **30–45 screens (8–12
min)**, matching the daily goal.

---

### G1.1 Wörter: first words

**Words (12):** Hallo, Tschüss, Danke, Bitte, ja, nein, ich, du, der Mann,
die Frau, das Kind, lernen.
(See decision D1 in §6: add **er** and **sie** (she), making 14.)

Grouping on the Training screens (taught 3–4 at a time, in this order):

1. 👋 **Talking words:** Hallo, Tschüss, Danke, Bitte
2. 👍 **Yes/no:** ja, nein
3. 🙋 **People:** ich, du, der Mann, die Frau, das Kind
4. 📚 **Doing:** lernen

Memory hooks on the Training card (1 line each):

- _Tschüss_ — "choose": "I **choose** to go home. Tschüss!"
- _ja_ — sounds like "yah", a happy nod.
- _nein_ — sounds like "nine": "**nein** times no!"
- _Bitte_ — "a **bit** of help, please".
- _der / die / das_ — "say the little word with the noun, like it's part of
  its name": **der** Mann, **die** Frau, **das** Kind (no rule yet, G5).

| Level    | Questions (existing vocabulary screens)                                            |
| -------- | ---------------------------------------------------------------------------------- |
| Training | `TrainingCard` per word → "find the picture" (`wordPicture`)                       |
| Simple   | picture → choose word; word → choose meaning; listen → choose word                 |
| Medium   | missing letter; listen → choose picture; English → choose German                   |
| Hard     | build the word from letter tiles; listen → build; match 5 pairs (German ↔ picture) |

This is a Wörter test, so it is built exactly like a vocabulary test
(`VocabQuiz` + data file). No new screens are needed.

---

### G1.2 The alphabet, and spelling a name aloud

**Big idea:** German letters have their own names. Most are easy. Five of
them are "tricksters" for English speakers.

**Training: four letter clubs** (one card + one check per club):

| Club              | Letters           | Trick                                                                  |
| ----------------- | ----------------- | ---------------------------------------------------------------------- |
| 🎵 **"-eh" club** | B C D E G P T W   | They all rhyme: beh, tseh, deh, eh, geh, peh, teh, weh                 |
| 🔔 **"e-" club**  | F L M N R S       | They start with "e": eff, ell, emm, enn, err, ess                      |
| 😮 **"-ah" club** | A H K             | Open your mouth: ah, hah, kah                                          |
| 🃏 **Odd ones**   | I J O Q U V X Y Z | Each has its own name: ih, jott, oh, kuh, uh, fau, iks, üpsilon, tsett |

**Trickster card** (shown after the clubs, Maus gets these wrong):

- **E** sounds like the English letter **A** ("eh")
- **I** sounds like the English letter **E** ("ee")
- **J** is "yott", not "jay"
- **V** is "fau", **W** is "veh"
- **Z** is "tsett"

Merke: _"E and I swap places. J says yott."_

**Spelling a name:** the cat spells **A-N-N-A** letter by letter (letter
clips joined with short pauses). Names used, all sound-safe: Anna, Tom,
Ben, Max, Ida, Jan, Emil, Lena, Paul, Eva, Uwe, Zoe. **E, I, J, V, W, Z
appear often on purpose.**

| Level    | Questions                                                                                                                                                 | Items |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Training | Club card (hear each letter, tap to replay) → "which letter did you hear?" (2 options from that club); then trickster card + check, spelling card + check | 6 + 6 |
| Simple   | Hear a letter → tap it (4 letter options, `LetterOptions`); always 1 trickster distractor (hear "ih" → E/I)                                               | 10    |
| Simple   | See a letter → hear 3 sounds 🔊🔊🔊, pick the right one (**new: SoundChoice**)                                                                            | 6     |
| Medium   | Hear a spelled name (3–4 letters) → choose the written name from 4 (Jan / Yan / Gan / Jen)                                                                | 6     |
| Medium   | Which club? Drag letters into the 3 rhyme clubs (**new: SortBaskets**)                                                                                    | 3     |
| Hard     | Hear a spelled name → build it from letter tiles, no options (`LetterBuilder` fed with letter audio)                                                      | 6     |
| Hard     | Hear a whole spelled sequence fast (e.g. W-I-E) → build                                                                                                   | 3     |
| Hard     | ⭐ **Spell YOUR name**: the app spells the profile name (`wortwunder:profile`), the learner taps each letter as it's spoken                               | 1     |

---

### G1.3 The new letters: ä, ö, ü, ß

**Big idea:** the two dots are a "sound changer". ß is two s's holding
hands. The words are **sound words**: heard, never quizzed for meaning.

Sound words: Mädchen, schön, Tür, Straße, plus minimal pairs for the
listening drill: Vater/Väter, Mutter/Mütter, Bruder/Brüder, schon/schön,
Apfel/Äpfel; and groß, Fuß, weiß for ß.

**Training cards (one each):**

- **ä** = the "e" in English _bed_. "**ä** is a cousin of **e**."
- **ö** = say "eh" but make your lips round like a fish 🐟.
- **ü** = say "ee" but make your lips round like you're whistling 😗.
  Mouth animation on the card: lips go from smile to round.
- **ß** = "sharp s" (Eszett). It sounds like **ss**, it's never at the
  start of a word, and if you can't type it, write **ss**: Straße = Strasse.
- **No German keyboard?** ä → ae, ö → oe, ü → ue, ß → ss.
  ("The dots fall down and become an e.")

Merke: _"Dots change the sound. Lips round for ö and ü."_

| Level    | Questions                                                                                                      | Items |
| -------- | -------------------------------------------------------------------------------------------------------------- | ----- |
| Training | Card → hear a pair (Mutter / Mütter), "which one had the dots?" (2 options); plus the no-keyboard card + check | 5 + 5 |
| Simple   | Hear a word → choose a or ä / o or ö / u or ü (minimal pair, 2 options)                                        | 8     |
| Simple   | Hear the letter → tap ä / ö / ü / ß (`LetterOptions`)                                                          | 4     |
| Medium   | Missing letter: M_dchen, sch_n, T_r, Stra_e (options a ä e / o ö u / u ü i / ß s z)                            | 6     |
| Medium   | Match the spelling: Straße ↔ Strasse, schön ↔ schoen, Tür ↔ Tuer (`MatchPairs`)                                | 2     |
| Hard     | Hear a sound word → build it from letter tiles that include Ä Ö Ü ß and lookalike decoys                       | 6     |
| Hard     | Type it the "no keyboard" way: shown _schön_ → type `schoen`                                                   | 3     |

Engine note: `answerLetters()` turns ß into "SS". For G1.3, **ß must be
its own tile**, so the builder needs a "keep ß" option.

---

### G1.4 Letter pairs that sound different

**Big idea:** some letters are a **team**. Together they make one new
sound. In tiles, a team is **one tile** (`sch`, `ei`, `ie`, `au`, `eu`,
`ch`, `sp`, `st`).

**Training: three team cards**

1. **Vowel teams**
   - **ei / ie: say the English name of the SECOND letter.**
     ei → "i" → _eye_: **mein**, **nein**. ie → "e" → _ee_: **wie**, **Liebe**.
     (The best trick in G1. Card shows ei with a big 👁️ "eye".)
   - **au** = "ow!" like when you bump your knee: **Haus**, **Maus** 🐭.
   - **eu** (and äu) = "oy" like _boy_: **neu**, **Euro**, **Häuser**.
2. **Consonant teams**
   - **sch** = English "sh": **Schule**, **Fisch**. "Three letters, one shh 🤫."
   - **ch** has **two sounds**:
     after **a, o, u, au** it's the scratchy "dragon" sound in the throat 🐉:
     **acht**, **Buch**, **auch**.
     After everything else it's the soft "cat hiss" 🐱: **ich**, **nicht**, **Milch**.
   - **sp / st at the start** = "shp / sht": **Sport**, **Straße**, **Stuhl**.
3. **Swap letters**: "they borrow another letter's sound":
   **j** = English y (**ja**), **w** = English v (**wie**), **v** = English f
   (**Vater**), **z** = "ts" (**Zoo**, **Zebra**).

Merke: _"ei = eye, ie = ee. W says v, V says f, J says y."_

| Level    | Questions                                                                                    | Items |
| -------- | -------------------------------------------------------------------------------------------- | ----- |
| Training | Team card (tap each example to hear) → hear one, choose between 2 spellings                  | 3 + 6 |
| Simple   | Hear a word → choose **ei** or **ie** (mein / mien, wie / wei, nein / nien)                  | 6     |
| Simple   | See a word → hear 3 sounds, pick the right one (**SoundChoice**): _ja_ → "ya" / "dja" / "ha" | 6     |
| Medium   | **Dragon or cat?** Sort ch-words into 🐉 / 🐱 baskets: acht, ich, Buch, nicht, auch, Milch   | 2     |
| Medium   | Fill the team: H\_\_s (au / eu / ei), W\_\_ (ie / ei), \_\_ule (Sch / Sh / Ch)               | 6     |
| Medium   | Hear a word → choose from 4 spellings with swap traps: _wie_ → wie / vie / wee / wei         | 4     |
| Hard     | Hear a word → build it from **team tiles + single letters** (**new: ChunkBuilder**)          | 6     |
| Hard     | Mixed review: G1.3 + G1.4 words, build with no options                                       | 4     |

---

### G1.5 Three kinds of word: Nomen, Verb, Pronomen

**Big idea:** the three jobs a word can have. Learners only **recognise**
them here. Using them is G2/G3.

**Training cards:**

- 📦 **Nomen (blue)**: a person, animal, thing or name. **Always a capital
  letter**, even in the middle of a sentence: der **M**ann, die **F**rau,
  das **K**ind, **A**nna. Test: _"Can you point at it? It's a Nomen."_
- ⚡ **Verb (red)**: what someone does. _lernen_ → Anna **lernt**. Test:
  _"Can you do it? It's a Verb."_
- 🔁 **Pronomen (green)**: a stand-in. It takes the noun's place so you
  don't repeat it: **Anna** lernt → **Sie** lernt. ich, du are Pronomen.
  Animation: the blue "Anna" tile flips into a green "sie" tile.
- ⚠️ **Capital trap:** the **first word of every sentence** gets a capital
  too: **I**ch, **S**ie. "So look for capitals in the **middle**."
  Maus card: "_Ich_ has a capital — is it a Nomen?" → cat: "No! It's first
  in the sentence."

Merke: _"Blue box = Nomen = capital. Red flash = Verb. Green swap = Pronomen."_

Sentences (only introduced words; `lernt` is shown as a whole word, its
ending is explained in G3.3): _Anna lernt. Der Mann lernt. Die Frau lernt.
Das Kind lernt. Er lernt. Sie lernt._ (er/sie → decision D1.)

| Level    | Questions                                                                                                                                                  | Items |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Training | 3 kind cards + capital-trap card → "is this word blue, red or green?" (one each)                                                                           | 4 + 3 |
| Simple   | One word shown → tap 📦 / ⚡ / 🔁 (Frau, lernen, du, Kind, ich, Mann)                                                                                      | 8     |
| Simple   | "Which needs a capital?" frau / lernen / du → tap one (3 options)                                                                                          | 4     |
| Medium   | **Tap all the Nomen** in a sentence (**new: TapWords**): _Die Frau lernt._ / _Ich lerne. Das Kind lernt._ (the capital-trap _Ich_ must not be tapped)      | 4     |
| Medium   | **Colour the sentence:** drag each word of _Anna lernt._ / _Sie lernt._ into its colour basket                                                             | 4     |
| Medium   | Fix the capitals: _die frau lernt._ → tap the letters that must be big                                                                                     | 3     |
| Hard     | Swap noun → Pronomen: _**Die Frau** lernt._ → build _Sie lernt._ from tiles (lower/upper-case decoys: sie / Sie / frau)                                    | 4     |
| Hard     | Build the sentence from tiles with correct capitals: [das] [Das] [kind] [Kind] [lernt] → _Das Kind lernt._ (**SentenceTiles**, from the old `GrammarQuiz`) | 4     |

---

### G1.6 Sprechen: greet, thank, say goodbye

**Big idea:** your first real conversation. A **chat screen** (speech
bubbles, cat on one side, the learner on the other; **new: DialogueChat**).

**Training: three scene cards** with picture + audio:

1. 🏫 **Arriving:** _Hallo!_ — _Hallo!_
2. 🎁 **Giving:** someone hands you something — _Bitte!_ (here you go) —
   _Danke!_ — _Bitte!_ (you're welcome).
   Merke: _"Bitte has 3 jobs: please, here you go, you're welcome."_
3. 🚪 **Leaving:** _Tschüss!_ — _Tschüss!_

Plus **ja / nein** as answers to a picture prompt (a cookie held out with
a "?" bubble). No question grammar, just pictures.

| Level    | Questions                                                                                                                 | Items |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ----- |
| Training | Scene card (hear both lines) → 🔁 "say it after me" (unscored) → pick the reply (2 bubbles)                               | 3 + 3 |
| Simple   | Scene picture + cat's line → pick your reply bubble (3 options)                                                           | 6     |
| Medium   | Listen only (no text) → pick the reply                                                                                    | 4     |
| Medium   | Put a 4-line dialogue in order (drag bubbles): Hallo → Hallo → Danke → Bitte                                              | 2     |
| Hard     | Type / build your reply from letters, no options                                                                          | 4     |
| Hard     | **Full scene, 4–6 turns, no hints:** meet, take a gift, say thanks, say bye. One mistake replays the scene from that turn | 2     |
| Hard     | ⭐ **Name tag:** the cat says _Hallo!_ and spells her name (L-E-N-A), the learner builds it (G1.2 review)                 | 2     |

Finish: G1 badge 🏅 "Los geht's!" and the Merke cards from all six tests
shown as a recap.

Every screen, with its exact words, options and answers, is wireframed in
[screens.md](screens.md).

## 6. Decisions for you

Built with the recommended options (2026-10-18): D1 yes (`er`/`sie` in
G1.1, 14 words), D2 four dots for grammar tests, D3 Hard cap 5.

- **D1. `er` / `sie` (she) in G1.1?** The roadmap's G1.5 example _Sie
  lernt._ uses `sie` before G2.1 introduces it, which breaks the "only
  introduced words" rule. **Recommended:** move `er` and `sie` (she) from
  G2.1 to G1.1 (14 words; G2.1 drops to 12). The alternative is G1.5 with
  `ich`/`du` only, which can't show "a Pronomen replaces a noun".
- **D2. 4 dots or 5?** The plan shows 4 levels for grammar tests while
  vocabulary keeps its 5. Alternatively, keep 5 everywhere (Simple split
  into basic + easy).
- **D3. Hard cap 5** (vs 4 today), so a Hard mistake costs a little more.

## 7. Build checklist

New screens (in order of need): **SoundChoice** (🔊 buttons as options),
**SortBaskets** (2–3 baskets), **ChunkBuilder** (team tiles), **TapWords**,
**SentenceTiles** (restore from `eb55c3d^`), **DialogueChat**, **Merke
card**, **Pause card**. Engine: 4-level tier set for grammar, "keep ß"
in the letter builder, unscored warm-up and repeat-aloud rows, hint = no
count-down. Audio: every sound word, spelled names (letter clips plus
pauses) and dialogue line added to `scripts/generate-audio.mjs`. Text:
all card text in `i18n.ts` for English, Tamil and Sinhala. QA each test
per `docs/qa/QA-PLAYBOOK.md`.
