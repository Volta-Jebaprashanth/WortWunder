# G1 Los geht's — screens

Wireframes for every screen in G1, with the exact words, options and
answers on each. [plan.md](plan.md) explains _why_; this file shows _what
is on the screen_. Nothing here is code.

## How to read this

- `[IMG: …]` image placeholder · `[🔊 …]` audio placeholder (tap to play)
  · `[ANIM: …]` animation placeholder.
- `●━●━○━○` = the 4-dot level track (Training · Simple · Medium · Hard),
  top right of every question.
- `( )` = a choice button · `[ ]` = a tile · `▢` = an empty slot.
- ✅ marks the right answer (never shown to the learner).
- Every English line is shown in the learner's mother tongue (English /
  Tamil / Sinhala).
- The German screen titles ("Was hörst du?", "Baue das Wort", "Szene 1")
  are fixed UI labels, like today's vocabulary screens. They always have
  an English subtitle and are not counted as introduced words. Answers,
  options and the characters' lines use only G1 words.
- Every question uses the same frame (it's today's `LessonFrame`):

```
┌──────────────────────────────────────────┐
│ EYEBROW (screen name)          ●━●━○━○   │
│ German title  🔊                         │
│ English subtitle (what to do)            │
│                                          │
│            … screen content …            │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │               Check                  │ │
│ └──────────────────────────────────────┘ │
│ 💡 Hint                  (Simple/Medium) │
└──────────────────────────────────────────┘
```

---

# Part A — Shared screens

These are used by every G1 test.

### A1. Path: the G1 node

```
┌──────────────────────────────────────────┐
│ 📝 Grammatik                              │
│   🚀 G1 Los geht's  · Getting started  ▾ │
│     ◉ G1.1 Erste Wörter    First words   │
│     ◉ G1.2 Das ABC          The alphabet │
│     ◉ G1.3 Ä Ö Ü ß          New letters  │
│     ◉ G1.4 Buchstaben-Teams Letter teams │
│     ◉ G1.5 Wortarten        Kinds of word│
│     ◉ G1.6 Hallo & Tschüss  Speaking     │
└──────────────────────────────────────────┘
```

- Each node shows its icon `[IMG: icons/test-<n>.jpg]`, its stars (☆☆☆ →
  ⭐⭐⭐) and the 4-dot track of where the learner is.
- Every node is open (no locks — the app has no backend). A completed
  node shows a ✔ and opens the A13 level popup first.

### A2. Level start banner (shown once when a level opens)

```
┌──────────────────────────────────────────┐
│                 ●━●━○━○                  │
│         🔵  Level 2 · Simple             │
│     Choose the right one.                │
│  ┌────────────────────────────────────┐  │
│  │              Weiter                │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

| Level    | Banner line                                       |
| -------- | ------------------------------------------------- |
| Training | 🟣 Level 1 · Training — "Look, listen, remember." |
| Simple   | 🔵 Level 2 · Simple — "Choose the right one."     |
| Medium   | 🟡 Level 3 · Medium — "Remember it yourself."     |
| Hard     | 🔴 Level 4 · Hard — "No help now. You can do it!" |

### A3. Warm-up (first 2 screens of G1.3–G1.6)

Same frame as the question it reuses, with the eyebrow `WARM-UP`, no level
dots, and the line "From last time" under the title. Unscored: a wrong
answer just shows the right one and moves on.

### A4. Correct (bottom sheet)

```
┌──────────────────────────────────────────┐
│  ✔  Richtig!                             │
│     Hallo = Hello!                       │
│  ┌────────────────────────────────────┐  │
│  │              Weiter                │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### A5. Wrong (bottom sheet): choice screens

```
┌──────────────────────────────────────────┐
│  ✖  Fast! Versuch's nochmal.             │
│     💡 E and I swap: E says "eh".        │
│  ┌──────── YOU CHOSE ─────────────────┐  │
│  │   I  [🔊 letter I]   "ee"          │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │            Try again               │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

The right answer is not given away. The learner retries the same
question until it is right (today's behaviour). Only the first miss
costs +2.

### A6. Wrong (bottom sheet): build / spell / order screens

```
┌──────────────────────────────────────────┐
│  ✖  Fast! Versuch's nochmal.             │
│     💡 Listen for the dots.              │
│   YOU WROTE      [S][C][H][O][N]          │
│                              ↑ red       │
│   CORRECT        [S][C][H][Ö][N]          │
│  ┌────────────────────────────────────┐  │
│  │            Try again               │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### A7. 💡 Hint button (Simple and Medium only, hidden in Hard)

| Screen type                 | What one tap of 💡 does         |
| --------------------------- | ------------------------------- |
| Choice (2–4 options)        | Greys out one wrong option      |
| Build (letters/teams/words) | Places the next right tile      |
| Sort baskets                | Drops one item into its basket  |
| Tap words / fix capitals    | Wiggles one right word / letter |
| Order the dialogue          | Places the first bubble         |

Under the button: "Using a hint means this one comes back once more."

### A8. Pause card (after 3 misses in a row)

```
┌──────────────────────────────────────────┐
│ PAUSE                                    │
│ [IMG: cat with a cup of tea]             │
│ Let's look at this again together.       │
│ ┌──────── MERKE ─────────────────────┐   │
│ │ (Merke card of the last missed rule)│   │
│ └─────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │              Weiter                │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

Then one unscored question from the Training checks of that rule, then
back to the round.

### A9. Merke card (rule card)

```
┌──────────────────────────────────────────┐
│ MERKE · REMEMBER                         │
│ [ANIM: rule animation]                   │
│  ★ E and I swap places. J says yott.     │
│  e.g. E [🔊]  I [🔊]  J [🔊]             │
│  ┌────────────────────────────────────┐  │
│  │              Weiter                │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

All six Merke cards:

| Test | Merke line                                                           | Examples on the card           |
| ---- | -------------------------------------------------------------------- | ------------------------------ |
| G1.1 | Say der / die / das with the noun, like part of its name.            | der Mann · die Frau · das Kind |
| G1.2 | E and I swap places. J says yott.                                    | E · I · J                      |
| G1.3 | Dots change the sound. Lips round for ö and ü. ß = ss.               | schon / schön · Straße         |
| G1.4 | ei = eye, ie = ee. W says v, V says f, J says y.                     | mein · wie · Vater · ja        |
| G1.5 | Blue box = Nomen = capital. Red flash = Verb. Green swap = Pronomen. | Die Frau lernt. → Sie lernt.   |
| G1.6 | Bitte has 3 jobs: please, here you go, you're welcome.               | Bitte! — Danke! — Bitte!       |

### A10. Say it after me (unscored, skippable)

```
┌──────────────────────────────────────────┐
│ SAY IT AFTER ME                          │
│ Hallo!  🔊                               │
│ Listen, then say it out loud.            │
│        [ANIM: cat's mouth speaking]      │
│   ( 🔊 Hear it again )  ( 🐢 Slowly )     │
│  ┌────────────────────────────────────┐  │
│  │          I said it! ✔              │  │
│  └────────────────────────────────────┘  │
│                Skip →                    │
└──────────────────────────────────────────┘
```

### A11. Test finished

```
┌──────────────────────────────────────────┐
│ ROUND-UP                                 │
│ Geschafft!                               │
│ Great job! You finished this test.       │
│               ⭐ ⭐ ☆                     │
│   34 questions · 1 mistake               │
│ ┌──────── MERKE ─────────────────────┐   │
│ │ ★ E and I swap places. J says yott.│   │
│ └─────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │          Back to my path           │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

Stars come from Hard mistakes: 0 → ⭐⭐⭐, 1–2 → ⭐⭐, 3+ → ⭐.

### A12. G1 badge (after G1.6)

```
┌──────────────────────────────────────────┐
│ [ANIM: confetti]                         │
│ 🏅  Los geht's!                          │
│ You finished G1: Getting started.        │
│ What you can do now:                     │
│  ✔ say 14 first words                    │
│  ✔ spell your name                       │
│  ✔ read ä ö ü ß and the letter teams     │
│  ✔ spot Nomen, Verb, Pronomen            │
│  ✔ greet, thank and say bye              │
│ ┌ 6 Merke cards (swipe) ───────────────┐ │
│  ┌────────────────────────────────────┐  │
│  │          Back to my path           │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

### A13. Practise again (level popup, completed tests only)

```
┌──────────────────────────────────────────┐
│          Practise again                  │
│   Which level do you want to practise?   │
│  ┌────────────────────────────────────┐  │
│  │ Level 1 · Training         ●━○━○━○ │  │
│  ├────────────────────────────────────┤  │
│  │ Level 2 · Simple           ●━●━○━○ │  │
│  ├────────────────────────────────────┤  │
│  │ Level 3 · Medium           ●━●━●━○ │  │
│  ├────────────────────────────────────┤  │
│  │ Level 4 · Hard             ●━●━●━● │  │
│  └────────────────────────────────────┘  │
│              ( Cancel )                  │
└──────────────────────────────────────────┘
```

- Shown when the learner opens a test they have **completed**. The test
  starts over at the chosen level; earlier levels count as cleared.
- Not shown before completion (the test just resumes).
- Test profile (name `volta`, any capitals, age `29`): always shown, with
  an extra "Continue where I left off" button when the test is part-way.
- Vocabulary tests use the same popup with their own levels.

---

# Part B — G1.1 Erste Wörter (first words)

A standard vocabulary test, built with the same screens as every other
vocabulary lesson, so it isn't wireframed here. The word list is in
[plan.md](plan.md) (G1.1).

---

# Part C — G1.2 Das ABC (the alphabet)

New audio for this test: none for the letters (A–Z clips already exist).
Spelled names = letter clips played with 0.6 s gaps (0.3 s in "fast").

### C0. No warm-up

G1.2 opens straight on the first club card (C1); there are no review
questions from G1.1.

### C1. Training · club card (×4)

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Das ABC  🔊                              │
│ Tap each letter to hear it.              │
│   🎵 The "-eh" club: they all rhyme!     │
│   ┌───┐┌───┐┌───┐┌───┐                   │
│   │ B ││ C ││ D ││ E │                   │
│   │beh││tseh│deh││ eh│                   │
│   └───┘└───┘└───┘└───┘                   │
│   ┌───┐┌───┐┌───┐┌───┐                   │
│   │ G ││ P ││ T ││ W │                   │
│   │geh││peh││teh││weh│                   │
│   └───┘└───┘└───┘└───┘                   │
│   ( ▶ Play all )                         │
│  [ Weiter ]  (after every tile is heard) │
└──────────────────────────────────────────┘
```

Each tile = `[🔊 letter]` + the sound written small under it.

| Card | Title line                             | Tiles (letter · sound under it)                                           |
| ---- | -------------------------------------- | ------------------------------------------------------------------------- |
| C1a  | 🎵 The "-eh" club: they all rhyme!     | B beh · C tseh · D deh · E eh · G geh · P peh · T teh · W weh             |
| C1b  | 🔔 The "e-" club: they start with "e"  | F eff · L ell · M emm · N enn · R err · S ess                             |
| C1c  | 😮 The "-ah" club: open your mouth!    | A ah · H hah · K kah                                                      |
| C1d  | 🃏 The odd ones: each has its own name | I ih · J jott · O oh · Q kuh · U uh · V fau · X iks · Y üpsilon · Z tsett |

### C2. Training · club check (after each card)

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Was hörst du?  🔊                        │
│ Listen, then tap the letter.             │
│               ( 🔊 )                     │
│         ┌─────┐     ┌─────┐              │
│         │  T  │     │  D  │              │
│         └─────┘     └─────┘              │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| ID  | After | Plays  | Options    | Tip if wrong                        |
| --- | ----- | ------ | ---------- | ----------------------------------- |
| C2a | C1a   | [🔊 T] | (T ✅) (D) | T is "teh" — your tongue taps hard. |
| C2b | C1b   | [🔊 M] | (M ✅) (N) | M is "emm" — lips close.            |
| C2c | C1c   | [🔊 H] | (H ✅) (K) | H is "hah" — like a breath.         |
| C2d | C1d   | [🔊 V] | (V ✅) (W) | V is "fau", W is "weh".             |

### C3. Training · trickster card + check

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Achtung! Tricksters  🔊                  │
│ These letters fool English speakers.     │
│ [IMG: mouse looking confused]            │
│  E 🔊 sounds like English "A"  (eh)      │
│  I 🔊 sounds like English "E"  (ee)      │
│  J 🔊 is "yott", not "jay"               │
│  V 🔊 is "fau"     W 🔊 is "veh"         │
│  Z 🔊 is "tsett"                         │
│  [ Weiter ]                              │
└──────────────────────────────────────────┘
```

Then the G1.2 Merke card (A9), then check **C3-check**: plays [🔊 I] →
(I ✅) (E). Tip: "I says 'ee'. E says 'eh'. They swap!"

### C4. Training · spelling card + check

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Buchstabieren  🔊                        │
│ Spelling: say each letter of a name.     │
│ [IMG: cat with name tag "ANNA"]          │
│     A  —  N  —  N  —  A                  │
│  (letters light up one by one with       │
│   [🔊 A] [🔊 N] [🔊 N] [🔊 A])            │
│   ( ▶ Play again )                       │
│  [ Weiter ]                              │
└──────────────────────────────────────────┘
```

Check **C4-check**: plays A-N-N-A → (ANNA ✅) (ANA). Tip: "Count the
letters: N comes twice."

### C5. Simple · hear a letter → tap it (10)

```
┌──────────────────────────────────────────┐
│ LISTENING                      ●━●━○━○   │
│ Was hörst du?  🔊                        │
│ Listen, then tap the letter.             │
│               ( 🔊 )                     │
│      ┌───┐  ┌───┐  ┌───┐  ┌───┐          │
│      │ E │  │ I │  │ A │  │ G │          │
│      └───┘  └───┘  └───┘  └───┘          │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Plays  | Options          | Tip if wrong                    |
| --- | ------ | ---------------- | ------------------------------- |
| 1   | [🔊 E] | E ✅ · I · A · G | E says "eh", like English "A".  |
| 2   | [🔊 I] | I ✅ · E · Y · A | I says "ee", like English "E".  |
| 3   | [🔊 A] | A ✅ · E · H · R | A says "ah", mouth open.        |
| 4   | [🔊 J] | J ✅ · G · Y · I | J says "yott".                  |
| 5   | [🔊 G] | G ✅ · J · K · C | G says "geh", it rhymes with E. |
| 6   | [🔊 V] | V ✅ · W · F · U | V says "fau".                   |
| 7   | [🔊 W] | W ✅ · V · U · B | W says "weh".                   |
| 8   | [🔊 Z] | Z ✅ · C · S · T | Z says "tsett".                 |
| 9   | [🔊 Y] | Y ✅ · J · I · U | Y says "üpsilon".               |
| 10  | [🔊 R] | R ✅ · A · H · E | R says "err" — from the throat. |

### C6. Simple · see a letter → pick its sound (SoundChoice, 6)

```
┌──────────────────────────────────────────┐
│ SOUND CHECK                    ●━●━○━○   │
│ Wie klingt das?  🔊                      │
│ Which sound is this letter?              │
│                ┌─────┐                   │
│                │  J  │                   │
│                └─────┘                   │
│   ( 🔊 Sound 1 ) ( 🔊 Sound 2 ) ( 🔊 Sound 3 )│
│   tap to hear, tap again to choose       │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

Sound buttons have no letters on them. Order is shuffled.

| #   | Letter shown | Sound buttons play          | Tip if wrong  |
| --- | ------------ | --------------------------- | ------------- |
| 1   | E            | [🔊 E] ✅ · [🔊 I] · [🔊 A] | E is "eh".    |
| 2   | I            | [🔊 I] ✅ · [🔊 E] · [🔊 A] | I is "ee".    |
| 3   | J            | [🔊 J] ✅ · [🔊 G] · [🔊 Y] | J is "yott".  |
| 4   | V            | [🔊 V] ✅ · [🔊 W] · [🔊 F] | V is "fau".   |
| 5   | W            | [🔊 W] ✅ · [🔊 V] · [🔊 B] | W is "weh".   |
| 6   | Z            | [🔊 Z] ✅ · [🔊 C] · [🔊 S] | Z is "tsett". |

### C7. Medium · hear a spelled name → choose it (6)

```
┌──────────────────────────────────────────┐
│ SPELLING                       ●━●━●━○   │
│ Wie heißt sie?  🔊                       │
│ Listen to the spelling. Which name is it?│
│   [IMG: name tag with ▢ ▢ ▢]  ( 🔊 )     │
│        ( JAN )      ( YAN )              │
│        ( GAN )      ( JEN )              │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Plays (spelled) | Options                   | Tip if wrong           |
| --- | --------------- | ------------------------- | ---------------------- |
| 1   | J-A-N           | JAN ✅ · YAN · GAN · JEN  | "yott" is J.           |
| 2   | E-V-A           | EVA ✅ · IVA · EWA · AVA  | "eh" is E, "fau" is V. |
| 3   | I-D-A           | IDA ✅ · EDA · IDE · ADA  | "ee" is I.             |
| 4   | U-W-E           | UWE ✅ · UVE · OWE · UWI  | "weh" is W.            |
| 5   | Z-O-E           | ZOE ✅ · ZOI · COE · SOE  | "tsett" is Z.          |
| 6   | M-A-X           | MAX ✅ · MEX · NAX · MAKS | "ah" is A, "iks" is X. |

### C8. Medium · sort letters into clubs (SortBaskets, 3)

```
┌──────────────────────────────────────────┐
│ SORTING                        ●━●━●━○   │
│ Welcher Club?  🔊                        │
│ Drag each letter into its club.          │
│      [D] [F] [T] [M] [G] [S]   ← tap 🔊  │
│  ┌──────────────┐   ┌──────────────┐     │
│  │ 🎵 "-eh" club │   │ 🔔 "e-" club  │     │
│  │              │   │              │     │
│  └──────────────┘   └──────────────┘     │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

Each letter tile plays its sound when tapped.

| #   | Baskets       | Letters → right basket        |
| --- | ------------- | ----------------------------- |
| 1   | "-eh" · "e-"  | D T G → "-eh" · F M S → "e-"  |
| 2   | "-eh" · "-ah" | B P W → "-eh" · A H K → "-ah" |
| 3   | "e-" · "-ah"  | L N R → "e-" · A H K → "-ah"  |

Tip if wrong: "Say it out loud: does it end in 'eh' or start with 'e'?"

### C9. Hard · hear a spelled name → build it (6)

```
┌──────────────────────────────────────────┐
│ SPELLING                       ●━●━●━●   │
│ Baue den Namen  🔊                       │
│ Listen to the spelling, then build it.   │
│               ( 🔊 )                     │
│          ▢   ▢   ▢   ▢                   │
│     [N] [A] [I] [E] [L] [M]   ⟲          │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| #   | Plays   | Tiles (answer + decoys) |
| --- | ------- | ----------------------- |
| 1   | T-O-M   | T O M + D U             |
| 2   | B-E-N   | B E N + I P             |
| 3   | L-E-N-A | L E N A + I M           |
| 4   | P-A-U-L | P A U L + B R           |
| 5   | E-M-I-L | E M I L + Y N           |
| 6   | J-E-N-S | J E N S + G I           |

### C10. Hard · fast spelling (3)

Same as C9, title "Schnell!" ("Fast!"), letters 0.3 s apart. After a right
answer the word appears with its picture: "You spelled **ja**!"

| #   | Plays (fast) | Tiles       | Reveal                |
| --- | ------------ | ----------- | --------------------- |
| 1   | J-A          | J A + G Y   | ja · [IMG: thumbs up] |
| 2   | D-U          | D U + T O   | du · [IMG: pointing]  |
| 3   | I-C-H        | I C H + E K | ich · [IMG: self]     |

### C11. Hard · spell YOUR name (1)

```
┌──────────────────────────────────────────┐
│ SPELLING                       ●━●━●━●   │
│ Dein Name!  🔊                           │
│ This is YOUR name. Listen and build it.  │
│   [IMG: name tag]       ( 🔊 )           │
│          ▢  ▢  ▢  ▢  ▢                   │
│   [L] [E] [N] [I] [A] [M] [S]  ⟲         │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

- Spells the profile name (`wortwunder:profile`), A–Z letters only.
- Tiles = the name's letters + 3 decoys (always include E/I if missing).
- Fallback: if the name has other characters or more than 10 letters, use
  ANNA and say "Let's spell Anna's name."
- On a right answer: "⭐ Toll! Now you can spell your name in German."

---

# Part D — G1.3 Ä Ö Ü ß

**Sound words** (heard only, never quizzed for meaning). New audio is
needed for all of them: Mädchen, schön, schon, Tür, Straße, Strasse,
Vater, Väter, Mutter, Mütter, Bruder, Brüder, Apfel, Äpfel, groß, Fuß,
plus the letters ä, ö, ü, Eszett.

### D0. Warm-up (2, from G1.2)

| #   | Screen              | Plays  | Options      |
| --- | ------------------- | ------ | ------------ |
| 1   | Hear a letter       | [🔊 E] | (E ✅) (I)   |
| 2   | Hear a spelled name | J-A    | (JA ✅) (GA) |

### D1. Training · sound card (×5)

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Neuer Buchstabe: ü  🔊                   │
│ The dots change the sound.               │
│   [ANIM: lips smile "ee" → round "ü"]    │
│     u  🔊   →   ü  🔊                    │
│  Say "ee", then make your lips round     │
│  like you're whistling. 😗               │
│   Listen:  Tür 🔊   Mütter 🔊   Brüder 🔊│
│  [ Weiter ]                              │
└──────────────────────────────────────────┘
```

| Card | Title                     | Animation                      | Body line                                                      | Listen to                         |
| ---- | ------------------------- | ------------------------------ | -------------------------------------------------------------- | --------------------------------- |
| D1a  | Neuer Buchstabe: ä        | a → ä, mouth slightly closing  | ä sounds like the "e" in English _bed_. ä is a cousin of e.    | Mädchen 🔊 Väter 🔊 Äpfel 🔊      |
| D1b  | Neuer Buchstabe: ö        | lips "eh" → round fish lips 🐟 | Say "eh", but make your lips round like a fish.                | schön 🔊                          |
| D1c  | Neuer Buchstabe: ü        | lips "ee" → round whistle 😗   | Say "ee", then make your lips round like you're whistling.     | Tür 🔊 Mütter 🔊 Brüder 🔊        |
| D1d  | Neuer Buchstabe: ß        | two "s" holding hands → ß      | ß = sharp s, sounds like ss. Never at the start. It's not a B! | Straße 🔊 groß 🔊 Fuß 🔊          |
| D1e  | No dots on your keyboard? | dots fall down → become "e"    | ä → ae · ö → oe · ü → ue · ß → ss                              | schön = schoen · Straße = Strasse |

After D1e: the G1.3 Merke card (A9).

### D2. Training · check after each card (×5)

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Was hörst du?  🔊                        │
│ Which one has the dots?                  │
│               ( 🔊 )                     │
│      ( Mutter )        ( Mütter )        │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| ID  | After | Plays / shows                  | Options            | Tip if wrong                       |
| --- | ----- | ------------------------------ | ------------------ | ---------------------------------- |
| D2a | D1a   | [🔊 Väter]                     | Vater · Väter ✅   | ä sounds like "e" in bed.          |
| D2b | D1b   | [🔊 schön]                     | schon · schön ✅   | Round lips = ö.                    |
| D2c | D1c   | [🔊 Mütter]                    | Mutter · Mütter ✅ | Whistle lips = ü.                  |
| D2d | D1d   | shows `Stra ▢ e` + [🔊 Straße] | ß ✅ · B           | ß looks like B but sounds like ss. |
| D2e | D1e   | "Write schön with no dots"     | schoen ✅ · schon  | The dots become an e: ö → oe.      |

### D3. Simple · hear → pick a or ä / o or ö / u or ü (8)

Same wireframe as D2, title "Was hörst du?", subtitle "Listen. Dots or no
dots?"

| #   | Plays       | Options            |
| --- | ----------- | ------------------ |
| 1   | [🔊 Vater]  | Vater ✅ · Väter   |
| 2   | [🔊 Äpfel]  | Apfel · Äpfel ✅   |
| 3   | [🔊 Mutter] | Mutter ✅ · Mütter |
| 4   | [🔊 Brüder] | Bruder · Brüder ✅ |
| 5   | [🔊 schon]  | schon ✅ · schön   |
| 6   | [🔊 Bruder] | Bruder ✅ · Brüder |
| 7   | [🔊 Väter]  | Vater · Väter ✅   |
| 8   | [🔊 schön]  | schon · schön ✅   |

Tip if wrong: "Listen to the lips: round lips mean dots."

### D4. Simple · hear the letter → tap it (4)

Same wireframe as C5, with options always `Ä · Ö · Ü · ß`.

| #   | Plays       | Answer |
| --- | ----------- | ------ |
| 1   | [🔊 ä]      | Ä      |
| 2   | [🔊 ö]      | Ö      |
| 3   | [🔊 ü]      | Ü      |
| 4   | [🔊 Eszett] | ß      |

### D5. Medium · missing letter, with sound (6)

```
┌──────────────────────────────────────────┐
│ MISSING LETTER                 ●━●━●━○   │
│ Welcher Buchstabe fehlt?  🔊             │
│ Listen, then pick the missing letter.    │
│               ( 🔊 )                     │
│       [M] [▢] [D] [C] [H] [E] [N]        │
│        ( A )    ( Ä )    ( E )           │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

The sound always plays, because _schon_ / _Apfel_ are also real words.

| #   | Plays        | Shows   | Options      | Tip if wrong                     |
| --- | ------------ | ------- | ------------ | -------------------------------- |
| 1   | [🔊 Mädchen] | M▢dchen | a · ä ✅ · e | "e" as in bed → ä.               |
| 2   | [🔊 schön]   | sch▢n   | o · ö ✅ · u | Round fish lips → ö.             |
| 3   | [🔊 Tür]     | T▢r     | u · ü ✅ · i | Whistle lips → ü.                |
| 4   | [🔊 Straße]  | Stra▢e  | ß ✅ · s · z | Sharp ss after a long sound → ß. |
| 5   | [🔊 groß]    | gro▢    | ß ✅ · s · B | ß is not a B!                    |
| 6   | [🔊 Äpfel]   | ▢pfel   | A · Ä ✅ · E | You heard the dots.              |

### D6. Medium · match the spellings (2 boards)

```
┌──────────────────────────────────────────┐
│ MATCHING GAME                  ●━●━●━○   │
│ Finde die Paare  🔊                      │
│ Match each word to its no-dots spelling. │
│   ( Straße )          ( schoen )         │
│   ( schön )           ( Tuer )           │
│   ( Tür )             ( Strasse )        │
└──────────────────────────────────────────┘
```

| Board | Pairs                                                |
| ----- | ---------------------------------------------------- |
| 1     | Straße ↔ Strasse · schön ↔ schoen · Tür ↔ Tuer       |
| 2     | Mädchen ↔ Maedchen · groß ↔ gross · Brüder ↔ Brueder |

### D7. Hard · hear → build (6)

Same wireframe as C9, title "Baue das Wort". Tiles include Ä Ö Ü ß as
their own tiles. ß is **not** split into SS.

| #   | Plays        | Slots | Tiles (answer + decoys) |
| --- | ------------ | ----- | ----------------------- |
| 1   | [🔊 Tür]     | 3     | T Ü R + U               |
| 2   | [🔊 schön]   | 5     | S C H Ö N + O           |
| 3   | [🔊 Mädchen] | 7     | M Ä D C H E N + A       |
| 4   | [🔊 Straße]  | 6     | S T R A ß E + B S       |
| 5   | [🔊 Fuß]     | 3     | F U ß + S Ü             |
| 6   | [🔊 Brüder]  | 6     | B R Ü D E R + U         |

### D8. Hard · type it with no dots (3)

```
┌──────────────────────────────────────────┐
│ KEYBOARD                       ●━●━●━●   │
│ Ohne Punkte!  🔊                         │
│ No dots on your keyboard. Type it.       │
│              schön  🔊                   │
│   ┌──────────────────────────────┐       │
│   │ s c h o e ▌                  │       │
│   └──────────────────────────────┘       │
│   A–Z keyboard only (no ä ö ü ß keys)    │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| #   | Shows  | Correct (any case) |
| --- | ------ | ------------------ |
| 1   | Straße | strasse            |
| 2   | schön  | schoen             |
| 3   | Tür    | tuer               |

---

# Part E — G1.4 Buchstaben-Teams (letter teams)

**Team tiles** are one tile each: `ei ie au eu sch ch sp st`.
**Sound words** (new audio): mein, nein, wie, Liebe, sie, die, Haus,
Maus, neu, Euro, Häuser, Schule, Fisch, acht, Buch, auch, Nacht, ich,
nicht, Milch, Küche, Sport, Straße, Stuhl, ja, Vater, Zoo, Zebra.
**Wrong-sound clips** for SoundChoice (spoken like an English reader
would): "dja", "ha", "wee", "why", "vah-ter", "wah-ter", "zoo"
(English z), "soh", "skoo-leh", "soo-leh", "hoos", "hoys".

### E0. Warm-up (2, from G1.3)

| #   | Screen           | Plays / shows        | Options            |
| --- | ---------------- | -------------------- | ------------------ |
| 1   | Dots or no dots? | [🔊 Mütter]          | Mutter · Mütter ✅ |
| 2   | Missing letter   | Stra▢e + [🔊 Straße] | ß ✅ · B           |

### E1. Training · team card (×3)

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Buchstaben-Teams  🔊                     │
│ Some letters work as a team: one sound.  │
│  ┌─────────────────────────────────────┐ │
│  │ ei = 👁️ "eye"     mein 🔊  nein 🔊  │ │
│  │ ie = "ee"         wie 🔊  Liebe 🔊  │ │
│  │ ★ Say the English name of the       │ │
│  │   SECOND letter!  e-I → "eye"        │ │
│  │                   i-E → "ee"         │ │
│  ├─────────────────────────────────────┤ │
│  │ au = "ow!" 🤕     Haus 🔊  Maus 🐭🔊 │ │
│  │ eu / äu = "oy"    neu 🔊  Euro 🔊   │ │
│  │                   Häuser 🔊          │ │
│  └─────────────────────────────────────┘ │
│  [ Weiter ]                              │
└──────────────────────────────────────────┘
```

| Card | Title           | Rows                                                                                                                                                                                                                     |
| ---- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| E1a  | Vowel teams     | ei = "eye" (mein, nein — "you know nein!") · ie = "ee" (wie, Liebe) · ★ say the 2nd letter's English name · au = "ow!" (Haus, Maus) · eu / äu = "oy" like _boy_ (neu, Euro, Häuser)                                      |
| E1b  | Consonant teams | sch = "sh" 🤫 (Schule, Fisch) · ch after a o u au = 🐉 dragon, scratchy throat (acht, Buch, auch) · ch after anything else = 🐱 cat hiss (ich, nicht, Milch) · sp / st at the start = "shp / sht" (Sport, Straße, Stuhl) |
| E1c  | Swap letters    | j = English y (ja) · w = English v (wie) · v = English f (Vater) · z = "ts" (Zoo, Zebra) · "They borrow another letter's sound."                                                                                         |

E1b has `[ANIM: dragon breathing "ch" / cat hissing "ch"]`. After E1c:
the G1.4 Merke card (A9).

### E2. Training · checks (2 after each card)

| ID   | After | Plays       | Options               | Tip if wrong                    |
| ---- | ----- | ----------- | --------------------- | ------------------------------- |
| E2a1 | E1a   | [🔊 mein]   | mein ✅ · mien        | "eye" → ei.                     |
| E2a2 | E1a   | [🔊 Maus]   | Maus ✅ · Meus        | "ow!" → au.                     |
| E2b1 | E1b   | [🔊 Schule] | Schule ✅ · Sule      | "sh" is three letters: sch.     |
| E2b2 | E1b   | [🔊 ich]    | 🐉 dragon · 🐱 cat ✅ | After i it's the soft cat hiss. |
| E2c1 | E1c   | [🔊 Zoo]    | Zoo ✅ · Tsoo         | "ts" is written z.              |
| E2c2 | E1c   | [🔊 Vater]  | Vater ✅ · Fater      | In German, v sounds like f.     |

### E3. Simple · hear → ei or ie? (6)

```
┌──────────────────────────────────────────┐
│ LISTENING                      ●━●━○━○   │
│ ei oder ie?  🔊                          │
│ "eye" or "ee"? Listen and pick.          │
│               ( 🔊 )                     │
│        ( wie )        ( wei )            │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Plays      | Options          |
| --- | ---------- | ---------------- |
| 1   | [🔊 mein]  | mein ✅ · mien   |
| 2   | [🔊 wie]   | wie ✅ · wei     |
| 3   | [🔊 nein]  | nein ✅ · nien   |
| 4   | [🔊 Liebe] | Liebe ✅ · Leibe |
| 5   | [🔊 sie]   | sie ✅ · sei     |
| 6   | [🔊 die]   | die ✅ · dei     |

Tip if wrong: "Say the second letter's English name: e-I = eye, i-E = ee."

### E4. Simple · see a word → pick its sound (SoundChoice, 6)

Same wireframe as C6, showing a word instead of a letter.

| #   | Word shown | Sound buttons play (shuffled)                     | Tip if wrong          |
| --- | ---------- | ------------------------------------------------- | --------------------- |
| 1   | ja         | [🔊 ja] ✅ · [🔊 "dja"] · [🔊 "ha"]               | j sounds like y.      |
| 2   | wie        | [🔊 wie] ✅ · [🔊 "wee"] · [🔊 "why"]             | w sounds like v.      |
| 3   | Vater      | [🔊 Vater] ✅ · [🔊 "vah-ter"] · [🔊 "wah-ter"]   | v sounds like f.      |
| 4   | Zoo        | [🔊 Zoo] ✅ · [🔊 "zoo" (English)] · [🔊 "soh"]   | z sounds like ts.     |
| 5   | Schule     | [🔊 Schule] ✅ · [🔊 "skoo-leh"] · [🔊 "soo-leh"] | sch sounds like sh.   |
| 6   | Haus       | [🔊 Haus] ✅ · [🔊 "hoos"] · [🔊 "hoys"]          | au sounds like "ow!". |

### E5. Medium · dragon or cat? (SortBaskets, 2)

```
┌──────────────────────────────────────────┐
│ SORTING                        ●━●━●━○   │
│ Drache oder Katze?  🔊                   │
│ Tap a word to hear it. Which ch is it?   │
│     [acht] [ich] [Buch] [nicht]          │
│  ┌──────────────┐   ┌──────────────┐     │
│  │ 🐉 dragon ch  │   │ 🐱 cat ch     │     │
│  └──────────────┘   └──────────────┘     │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| Board | 🐉 dragon    | 🐱 cat        |
| ----- | ------------ | ------------- |
| 1     | acht · Buch  | ich · nicht   |
| 2     | auch · Nacht | Milch · Küche |

Tip if wrong: "Look before the ch: a, o, u, au → dragon. Anything else → cat."

### E6. Medium · fill the team (6)

Same wireframe as D5, with team tiles as the options.

| #   | Plays       | Shows | Options           | Tip if wrong                |
| --- | ----------- | ----- | ----------------- | --------------------------- |
| 1   | [🔊 Haus]   | H▢s   | au ✅ · eu · ei   | "ow!" → au.                 |
| 2   | [🔊 wie]    | w▢    | ie ✅ · ei · ee   | "ee" → ie.                  |
| 3   | [🔊 Schule] | ▢ule  | Sch ✅ · Sh · Ch  | German writes "sh" as sch.  |
| 4   | [🔊 neu]    | n▢    | eu ✅ · au · oi   | "oy" → eu.                  |
| 5   | [🔊 mein]   | m▢n   | ei ✅ · ie · ai   | "eye" → ei.                 |
| 6   | [🔊 Sport]  | ▢ort  | Sp ✅ · Schp · Sb | You say "shp" but write sp. |

### E7. Medium · hear → pick from 4 spellings (4)

Same wireframe as C7, with words instead of names.

| #   | Plays      | Options                         |
| --- | ---------- | ------------------------------- |
| 1   | [🔊 wie]   | wie ✅ · vie · wee · wei        |
| 2   | [🔊 ja]    | ja ✅ · ya · jah · dja          |
| 3   | [🔊 Vater] | Vater ✅ · Fater · Water · Vata |
| 4   | [🔊 Zoo]   | Zoo ✅ · Tsoo · Soo · Zu        |

### E8. Hard · build with team tiles (ChunkBuilder, 6)

```
┌──────────────────────────────────────────┐
│ TEAM BUILDER                   ●━●━●━●   │
│ Baue das Wort  🔊                        │
│ Listen, then build it. Teams are 1 tile. │
│               ( 🔊 )                     │
│        ▢     ▢     ▢                     │
│   [H]  [au]  [s]  [eu]  [ei]   ⟲         │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

Slots are not a fixed letter count, since one tile can be 1–3 letters. The
decoys are chosen so only one build is possible.

| #   | Plays       | Answer tiles    | Decoys   |
| --- | ----------- | --------------- | -------- |
| 1   | [🔊 Haus]   | H · au · s      | eu · ei  |
| 2   | [🔊 Schule] | Sch · u · l · e | Sh · o   |
| 3   | [🔊 mein]   | m · ei · n      | ie · ai  |
| 4   | [🔊 acht]   | a · ch · t      | g · k    |
| 5   | [🔊 Sport]  | Sp · o · r · t  | Schp · b |
| 6   | [🔊 neu]    | n · eu          | oi · au  |

### E9. Hard · mixed review build, G1.3 + G1.4 (4)

Same wireframe as E8.

| #   | Plays        | Answer tiles           | Decoys   |
| --- | ------------ | ---------------------- | -------- |
| 1   | [🔊 schön]   | sch · ö · n            | o · sh   |
| 2   | [🔊 Straße]  | St · r · a · ß · e     | Scht · s |
| 3   | [🔊 Mädchen] | M · ä · d · ch · e · n | a · sch  |
| 4   | [🔊 Zebra]   | Z · e · b · r · a      | Ts · s   |

---

# Part F — G1.5 Wortarten (kinds of word)

Colours (fixed for the whole app from here on): **Nomen = blue 📦**,
**Verb = red ⚡**, **Pronomen = green 🔁**. Articles are grey and stuck to
their noun as one tile ([der Mann]).

Sentences use only: der Mann, die Frau, das Kind, Anna, Tom, lernen,
lernt, ich, du, er, sie, Hallo. If D1 is a no, every item with `er`/`sie`
is removed and F4/F9 are cut to the `ich`/`du` items.

### F0. Warm-up (2, from G1.4)

| #   | Screen         | Plays     | Options        |
| --- | -------------- | --------- | -------------- |
| 1   | Dragon or cat? | [🔊 ich]  | 🐉 · 🐱 ✅     |
| 2   | ei or ie?      | [🔊 nein] | nein ✅ · nien |

### F1. Training · word-kind card (×3) + capital-trap card

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Das Nomen  🔊                            │
│ 📦 A person, animal, thing or name.      │
│ ┌──────────────────────────────────────┐ │
│ │ 🟦 der Mann 🔊   🟦 die Frau 🔊       │ │
│ │ 🟦 das Kind 🔊   🟦 Anna 🔊           │ │
│ └──────────────────────────────────────┘ │
│  ★ ALWAYS a capital letter: M F K A      │
│  Test: can you point at it? → Nomen!     │
│  [ANIM: finger points at a picture]      │
│  [ Weiter ]                              │
└──────────────────────────────────────────┘
```

| Card | Title                  | Colour / icon | Body                                                                                                                             | Animation                                                  |
| ---- | ---------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| F1a  | Das Nomen              | blue 📦       | A person, animal, thing or name. Always a capital letter. Can you point at it? → Nomen.                                          | finger points at the man / woman / child                   |
| F1b  | Das Verb               | red ⚡        | What someone does. lernen → Anna **lernt**. Can you do it? → Verb.                                                               | child opens a book, "lernt" flashes red                    |
| F1c  | Das Pronomen           | green 🔁      | A stand-in word. It takes the noun's place: **Anna** lernt → **Sie** lernt. ich, du, er, sie.                                    | blue [Anna] tile flips into green [Sie]                    |
| F1d  | Achtung: Capital trap! | ⚠️            | The **first word** of a sentence always gets a capital too: **I**ch, **S**ie, **H**allo. So look for capitals in the **middle**. | mouse: "Ich has a capital — Nomen?" cat: "No! It's first." |

After F1d: the G1.5 Merke card (A9).

### F2. Training · checks (3, answered with ja / nein)

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Ist das ein Nomen? 📦  🔊                │
│ Is this word a Nomen?                    │
│                 Frau 🔊                  │
│        ( ja 👍 )      ( nein 👎 )        │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| ID  | After | Question               | Word | Answer  | Tip if wrong                          |
| --- | ----- | ---------------------- | ---- | ------- | ------------------------------------- |
| F2a | F1a   | Is this a Nomen? 📦    | Frau | ja ✅   | You can point at a woman → Nomen.     |
| F2b | F1b   | Is this a Verb? ⚡     | Kind | nein ✅ | You can't "do" a child → not a Verb.  |
| F2c | F1c   | Is this a Pronomen? 🔁 | du   | ja ✅   | du stands in for a person → Pronomen. |

### F3. Simple · which kind? (8)

```
┌──────────────────────────────────────────┐
│ WORD KINDS                     ●━●━○━○   │
│ Welche Wortart?  🔊                      │
│ What kind of word is this?               │
│                lernen 🔊                 │
│ ( 📦 Nomen )  ( ⚡ Verb )  ( 🔁 Pronomen )│
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Word   | Answer      | Tip if wrong                   |
| --- | ------ | ----------- | ------------------------------ |
| 1   | Frau   | 📦 Nomen    | You can point at her.          |
| 2   | lernen | ⚡ Verb     | You can do it.                 |
| 3   | du     | 🔁 Pronomen | It stands in for a person.     |
| 4   | Kind   | 📦 Nomen    | Capital letter → Nomen.        |
| 5   | ich    | 🔁 Pronomen | It stands in for you yourself. |
| 6   | Mann   | 📦 Nomen    | Capital letter → Nomen.        |
| 7   | er     | 🔁 Pronomen | er stands in for a man.        |
| 8   | lernt  | ⚡ Verb     | It says what Anna does.        |

### F4. Simple · which word needs a capital? (4)

Same frame, 3 lower-case buttons.

| #   | Options (all lower case) | Answer |
| --- | ------------------------ | ------ |
| 1   | frau · lernen · du       | frau   |
| 2   | ich · kind · lernt       | kind   |
| 3   | mann · er · lernen       | mann   |
| 4   | du · sie · anna          | anna   |

Tip if wrong: "Only Nomen (and names) always get a capital."

### F5. Medium · tap all the Nomen (TapWords, 4)

```
┌──────────────────────────────────────────┐
│ FIND THE NOMEN                 ●━●━●━○   │
│ Finde das Nomen  📦  🔊                  │
│ Tap every Nomen in the sentence.         │
│                                          │
│      Hallo,   Anna!          🔊          │
│      ─────    ────                       │
│   (tapped words turn blue)               │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Sentence        | Tap  | Trap / tip if wrong                           |
| --- | --------------- | ---- | --------------------------------------------- |
| 1   | Die Frau lernt. | Frau | "Die" has a capital only because it's first.  |
| 2   | Das Kind lernt. | Kind | "Das" is first in the sentence — not a Nomen. |
| 3   | Hallo, Anna!    | Anna | Hallo is first, Anna is a name → Nomen.       |
| 4   | Der Mann lernt. | Mann | Look in the middle for capitals.              |

### F6. Medium · colour the sentence (SortBaskets, 4)

```
┌──────────────────────────────────────────┐
│ COLOURS                        ●━●━●━○   │
│ Färbe den Satz  🔊                       │
│ Drag each word into its colour.          │
│     [Der Mann] [lernt.] [Er] [lernt.]    │
│ ┌─────────┐ ┌─────────┐ ┌──────────┐     │
│ │📦 Nomen │ │ ⚡ Verb  │ │🔁 Pronomen│     │
│ └─────────┘ └─────────┘ └──────────┘     │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Sentence                  | 📦 Nomen   | ⚡ Verb       | 🔁 Pronomen |
| --- | ------------------------- | ---------- | ------------- | ----------- |
| 1   | Anna lernt.               | Anna       | lernt         | —           |
| 2   | Sie lernt.                | —          | lernt         | Sie         |
| 3   | Das Kind lernt.           | [Das Kind] | lernt         | —           |
| 4   | Der Mann lernt. Er lernt. | [Der Mann] | lernt · lernt | Er          |

After a right answer the sentence is shown in its colours.

### F7. Medium · fix the capitals (3)

```
┌──────────────────────────────────────────┐
│ CAPITALS                       ●━●━●━○   │
│ Groß oder klein?  🔊                     │
│ Tap the letters that must be capitals.   │
│                                          │
│   d i e   f r a u   l e r n t .          │
│   ↑ tap a letter to make it big          │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Shown                     | Must be capital | Fixed                     |
| --- | ------------------------- | --------------- | ------------------------- |
| 1   | die frau lernt.           | d · f           | Die Frau lernt.           |
| 2   | hallo, anna!              | h · a (of anna) | Hallo, Anna!              |
| 3   | der mann lernt. er lernt. | d · m · e       | Der Mann lernt. Er lernt. |

Tip if wrong: "Two reasons for a capital: first word, or a Nomen."

### F8. Hard · swap the noun for a Pronomen (4)

```
┌──────────────────────────────────────────┐
│ STAND-IN                       ●━●━●━●   │
│ Tausche!  🔁  🔊                         │
│ Say it again with a Pronomen.            │
│        🟦 Die Frau  🟥 lernt.             │
│        ↓                                 │
│        ▢      ▢ .                        │
│   [Sie] [sie] [Er] [lernt] [Frau]   ⟲    │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| #   | Shown           | Answer     | Tiles                         |
| --- | --------------- | ---------- | ----------------------------- |
| 1   | Die Frau lernt. | Sie lernt. | Sie · sie · Er · lernt · Frau |
| 2   | Der Mann lernt. | Er lernt.  | Er · er · Sie · lernt · Mann  |
| 3   | Anna lernt.     | Sie lernt. | Sie · sie · Er · lernt · Anna |
| 4   | Tom lernt.      | Er lernt.  | Er · er · Sie · lernt · Tom   |

Tip if wrong: "Man → er, woman / girl → sie. First word → capital."

### F9. Hard · build the sentence (SentenceTiles, 4)

```
┌──────────────────────────────────────────┐
│ SENTENCE BUILDER               ●━●━●━●   │
│ Baue den Satz  🔊                        │
│ Build it in German. Watch the capitals!  │
│   [IMG: child reading]                   │
│   "The child is learning."               │
│        ▢      ▢      ▢ .                 │
│   [das] [Das] [kind] [Kind] [lernt]  ⟲   │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| #   | Image placeholder    | English prompt         | Answer          | Tiles                           |
| --- | -------------------- | ---------------------- | --------------- | ------------------------------- |
| 1   | [IMG: child reading] | The child is learning. | Das Kind lernt. | das · Das · kind · Kind · lernt |
| 2   | [IMG: woman reading] | The woman is learning. | Die Frau lernt. | die · Die · frau · Frau · lernt |
| 3   | [IMG: child waving]  | Hello, Anna!           | Hallo, Anna!    | hallo · Hallo · anna · Anna     |
| 4   | [IMG: boy reading]   | He is learning.        | Er lernt.       | er · Er · lernt · Lernt         |

Punctuation (`,` `.` `!`) is fixed in place, not a tile.

---

# Part G — G1.6 Hallo & Tschüss (Sprechen)

Characters: 🐱 **Katze** (left bubbles) and **You** (right bubbles, the
learner's profile name). Words used: Hallo, Tschüss, Danke, Bitte, ja,
nein. English context lines describe the situation; the characters only
speak German.

### G0. Warm-up (2, from G1.5)

| #   | Screen          | Shows              | Options         |
| --- | --------------- | ------------------ | --------------- |
| 1   | Which kind?     | Frau               | 📦 ✅ · ⚡ · 🔁 |
| 2   | Needs a capital | frau · du · lernen | frau ✅         |

### G1. Training · scene card (×3)

```
┌──────────────────────────────────────────┐
│ TRAINING                       ●━○━○━○   │
│ Szene 2: Ein Geschenk  🔊                │
│ Someone gives you something.             │
│   [IMG: cat holding out a gift]          │
│  ┌──────────────┐                        │
│  │🐱 Bitte!  🔊 │   (here you go)        │
│  └──────────────┘                        │
│               ┌──────────────┐           │
│   (thank you) │ Danke!  🔊 You│           │
│               └──────────────┘           │
│  ┌──────────────┐                        │
│  │🐱 Bitte!  🔊 │   (you're welcome)     │
│  └──────────────┘                        │
│  ( ▶ Play the scene )                    │
│  [ Weiter ]                              │
└──────────────────────────────────────────┘
```

| Card | Title                 | Image placeholder                      | Lines (small meaning under each)                                               |
| ---- | --------------------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| G1a  | Szene 1: Hallo!       | [IMG: cat waving at classroom door]    | 🐱 Hallo! (hello) → You: Hallo! (hello)                                        |
| G1b  | Szene 2: Ein Geschenk | [IMG: cat holding out a gift]          | 🐱 Bitte! (here you go) → You: Danke! (thank you) → 🐱 Bitte! (you're welcome) |
| G1c  | Szene 3: Tschüss!     | [IMG: cat waving at the door, leaving] | 🐱 Tschüss! (bye) → You: Tschüss! (bye)                                        |

After G1b: the G1.6 Merke card ("Bitte has 3 jobs").

### G2. Training · say it after me (×3, unscored)

The A10 screen with: G2a "Hallo!", G2b "Danke!", G2c "Tschüss!".

### G3. Training · pick the reply (×3)

```
┌──────────────────────────────────────────┐
│ CHAT                           ●━○━○━○   │
│ Was sagst du?  🔊                        │
│ What do you say back?                    │
│   [IMG: cat waving at classroom door]    │
│  ┌──────────────┐                        │
│  │🐱 Hallo!  🔊 │                        │
│  └──────────────┘                        │
│               ┌──────────────┐           │
│               │   ▢ ▢ ▢   You│           │
│               └──────────────┘           │
│        ( Hallo! )    ( Tschüss! )        │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| ID  | Scene    | 🐱 says  | Options              | Tip if wrong                         |
| --- | -------- | -------- | -------------------- | ------------------------------------ |
| G3a | arriving | Hallo!   | Hallo! ✅ · Tschüss! | Hallo back when someone arrives.     |
| G3b | gift     | Bitte!   | Danke! ✅ · Hallo!   | Someone gives you something → Danke! |
| G3c | leaving  | Tschüss! | Tschüss! ✅ · Danke! | Someone leaves → Tschüss!            |

### G4. Simple · pick the reply (3 options, 6)

Same wireframe as G3, with 3 options and 💡 Hint. Items 5–6 use a picture
prompt instead of a line: the cat holds out a cookie, with a "?" bubble.

| #   | Image placeholder                  | Context line (English)    | 🐱 says  | Options                       |
| --- | ---------------------------------- | ------------------------- | -------- | ----------------------------- |
| 1   | [IMG: cat arriving, waving]        | The cat arrives.          | Hallo!   | Hallo! ✅ · Danke! · Tschüss! |
| 2   | [IMG: cat holding out a gift]      | The cat gives you a gift. | Bitte!   | Danke! ✅ · Bitte! · Hallo!   |
| 3   | [IMG: you give the cat a gift]     | You gave the cat a gift.  | Danke!   | Bitte! ✅ · Danke! · ja       |
| 4   | [IMG: cat at the door, leaving]    | The cat goes home.        | Tschüss! | Tschüss! ✅ · Hallo! · Bitte! |
| 5   | [IMG: cat offers a cookie, you 😋] | You want the cookie.      | 🍪 ?     | ja ✅ · nein · Tschüss!       |
| 6   | [IMG: cat offers a cookie, you 🙅] | You are full.             | 🍪 ?     | nein ✅ · ja · Hallo!         |

### G5. Medium · listen only (4)

Same as G3, but the cat's bubble shows only `🔊` (no text, no picture).

| #   | Plays         | Options                       |
| --- | ------------- | ----------------------------- |
| 1   | [🔊 Hallo!]   | Hallo! ✅ · Bitte! · nein     |
| 2   | [🔊 Bitte!]   | Danke! ✅ · Tschüss! · ja     |
| 3   | [🔊 Tschüss!] | Tschüss! ✅ · Hallo! · Danke! |
| 4   | [🔊 Danke!]   | Bitte! ✅ · Danke! · Hallo!   |

### G6. Medium · put the chat in order (2)

```
┌──────────────────────────────────────────┐
│ CHAT ORDER                     ●━●━●━○   │
│ Was kommt zuerst?  🔊                    │
│ Drag the bubbles into the right order.   │
│   1 ▢                                    │
│   2 ▢                                    │
│   3 ▢                                    │
│   4 ▢                                    │
│   (🐱 Danke!)  (You Hallo!)              │
│   (🐱 Hallo!)  (You Bitte!)              │
│  [ Check ]                    💡 Hint    │
└──────────────────────────────────────────┘
```

| #   | Right order                                                   |
| --- | ------------------------------------------------------------- |
| 1   | 🐱 Hallo! → You: Hallo! → You: Bitte! (gives) → 🐱 Danke!     |
| 2   | 🐱 Bitte! (gives) → You: Danke! → 🐱 Tschüss! → You: Tschüss! |

Each bubble has its speaker icon, so order 1's two "Hallo!" bubbles are
told apart.

### G7. Hard · build your reply (4)

Same as G3, but the reply bubble is filled from letter tiles (with Ü and
ß tiles). No options, no hint.

| #   | 🐱 says (+ image)             | Answer  | Tiles             |
| --- | ----------------------------- | ------- | ----------------- |
| 1   | Hallo! [IMG: cat arriving]    | HALLO   | H A L L O + E     |
| 2   | Bitte! [IMG: gift]            | DANKE   | D A N K E + T     |
| 3   | Danke! [IMG: you gave a gift] | BITTE   | B I T T E + D     |
| 4   | Tschüss! [IMG: cat leaving]   | TSCHÜSS | T S C H Ü S S + U |

`Tschüss` is spelled with **ss** (`Tschüß` is the old spelling), so
there is no ß tile here.

### G8. Hard · full scene (2)

```
┌──────────────────────────────────────────┐
│ FULL SCENE                     ●━●━●━●   │
│ Der erste Tag  🔊      turn 3 of 5       │
│ Your first day. Answer the cat.          │
│  ┌──────────────┐                        │
│  │🐱 Hallo!     │                        │
│  └──────────────┘   ┌──────────┐         │
│                     │Hallo! You│         │
│  ┌──────────────┐   └──────────┘         │
│  │🐱 Bitte! 🎁  │                        │
│  └──────────────┘   ┌──────────┐         │
│                     │  ▢   You │         │
│                     └──────────┘         │
│ [Hallo] [Danke] [Bitte] [Tschüss] [ja] [nein] │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

- The learner taps one word tile from the full bank of 6 each turn.
- A mistake shows A5, and the scene replays from that turn (the earlier
  turns stay).
- The whole scene is one row: it passes only when every turn is right.

**Scene A — Der erste Tag** (Your first day). The cat talks first.

| Turn | 🐱 says / does                             | You answer |
| ---- | ------------------------------------------ | ---------- |
| 1    | Hallo! [IMG: cat waving]                   | Hallo!     |
| 2    | Bitte! [IMG: gives a pencil]               | Danke!     |
| 3    | 🍪 ? [IMG: offers a cookie] "You want it." | ja         |
| 4    | Bitte! [IMG: hands the cookie]             | Danke!     |
| 5    | Tschüss! [IMG: waves at the door]          | Tschüss!   |

**Scene B — Besuch** (A visitor). The mouse visits **you**, so the learner
speaks first. Turns with no line show only a picture + context line.

| Turn | Picture / 🐭 says                                   | You say  |
| ---- | --------------------------------------------------- | -------- |
| 1    | [IMG: mouse at your door] "The mouse arrives."      | Hallo!   |
| 2    | [IMG: you hand the mouse cake] "Give her the cake." | Bitte!   |
| 3    | 🐭 Danke!                                           | Bitte!   |
| 4    | [IMG: mouse at the door] "The mouse goes home."     | Tschüss! |

### G9. Hard · name tag (2)

```
┌──────────────────────────────────────────┐
│ NAME TAG                       ●━●━●━●   │
│ Hallo!  🔊                               │
│ The cat spells her name. Build it.       │
│  ┌───────────────────────┐               │
│  │🐱 Hallo! L-E-N-A  🔊  │               │
│  └───────────────────────┘               │
│   [IMG: blank name tag]                  │
│          ▢  ▢  ▢  ▢                      │
│   [L] [E] [N] [A] [I] [M]   ⟲            │
│  [ Check ]                               │
└──────────────────────────────────────────┘
```

| #   | Speaker | Plays          | Tiles         |
| --- | ------- | -------------- | ------------- |
| 1   | 🐱      | Hallo! L-E-N-A | L E N A + I M |
| 2   | 🐭      | Hallo! M-I-A   | M I A + E N   |

Then: A11 (test finished) → A12 (G1 badge).

---

# Part H — Count check

| Test | Warm-up                                     | Training (cards + checks) | Simple | Medium | Hard | Scored rows |
| ---- | ------------------------------------------- | ------------------------- | ------ | ------ | ---- | ----------- |
| G1.1 | standard vocabulary test (not counted here) |                           |        |        |      |             |
| G1.2 | 0                                           | 6 cards + 6               | 16     | 9      | 10   | 41          |
| G1.3 | 2                                           | 5 cards + 5               | 12     | 8      | 9    | 34          |
| G1.4 | 2                                           | 3 cards + 6               | 12     | 12     | 10   | 40          |
| G1.5 | 2                                           | 4 cards + 3               | 12     | 11     | 8    | 34          |
| G1.6 | 2                                           | 3 cards + 3 say + 3       | 6      | 6      | 8    | 23          |

Cards, warm-ups and say-it-after-me screens are not scored rows. A first
miss on any row adds +2 (plan.md §3), so a real run is longer than the
row count.
