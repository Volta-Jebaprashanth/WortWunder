# Bug report: Grammatik → G1 "Los geht's"

Tested on 2026-10-15, desktop Chrome 155, against the local dev server (`localhost:8080`). Profile: mother tongue English.

**Scope.** All four tests (G1.1 Wörter, G1.2 ä ö ü ß, G1.3 ei ie sch w z, G1.4 Nomen Verb Pronomen) were played start to finish. Answers were judged against standard German, not against the app's data. Audio and images were out of scope.

**Overall.** Every test completes, saves its progress and shows the tick on the path. No console errors. German spelling, grammar and English meanings are correct throughout. The bugs below are about questions that contradict the lesson, explanations that mislead, and flow.

| #   | Severity | Test       | Summary                                                                        |
| --- | -------- | ---------- | ------------------------------------------------------------------------------ |
| 1   | High     | G1.3       | Pairs board rejects correct matches ("die Zeit" ↔ ei, "die Schule" ↔ ie)      |
| 2   | Medium   | G1.3       | "Say the second letter!" gives the wrong sound with German letter names        |
| 3   | Medium   | G1.4       | Pronomen definition contradicts the sort game (ich, du)                        |
| 4   | Low      | G1.3       | Path title lists only part of what the test covers                             |
| 5   | Low      | G1.2, G1.3 | Pairs instruction doesn't say what to match                                    |
| 6   | Low      | G1.1, G1.4 | Capitalisation is never practised or enforced                                  |
| 7   | Low      | G1.2       | Rule card and check question repeat 3× with no mistakes                        |
| 8   | Low      | All        | Finish screen shows no result                                                  |
| 9   | Low      | G1.2–G1.4  | Gap questions read the answer out to screen readers                            |

---

## 1. G1.3 pairs board rejects correct matches (High)

**Steps**

1. Open Grammatik → Los geht's → "ei, ie, sch, w, z".
2. Play through to "Finde die Paare". Words: mein, wie, neu, die Schule, die Zeit. Sounds: z, ie, ei, sch, eu.
3. Match **die Zeit → ei**.
4. Match **die Schule → ie**.

**Expected:** both are correct readings of the rule just taught. "Zeit" has the "ei" ("eye") sound, and "die" has the "ie" ("ee") sound.

**Actual:** both flash red as wrong. Only die Zeit → z and die Schule → sch are accepted, so a learner who applies the rule correctly is marked wrong.

**Suggested fix:** use words that contain only one of the target sounds, or show the pair words without their article. For example, replace "die Zeit" with "zehn", or use "Schule" instead of "die Schule". Check G1.2's pairs board against the same rule (its pairs happen to be unambiguous today).

## 2. G1.3 "ei / ie" rule card: "Say the second letter!" (Medium)

**Where:** rule card "ei" and "ie": *"ei sounds like 'eye'. ie sounds like 'ee'. Say the second letter!"*

**Problem:** the tip only works with **English** letter names (i = "eye", e = "ee"). With **German** letter names it gives the wrong result: German "i" is "ee", so "ei" would come out as "ee". Learners who know the German alphabet, or whose first language isn't English, get the wrong sound. The app also teaches the German alphabet elsewhere.

**Suggested fix:** drop the tip, or reword it to something like *"ei sounds like English 'eye', ie like English 'ee'."* Check the Tamil and Sinhala versions too.

## 3. G1.4 Pronomen definition contradicts the sort game (Medium)

**Where:** rule card "Pronomen: a short word for a Nomen". It says *"A Pronomen stands in for a Nomen, so you don't say the name again."* The sort group is labelled **Pronomen — "stands in"**.

**Problem:** the sort game requires **ich** and **du** in Pronomen, but they don't stand in for any named Nomen. A learner following the definition has no reason to put them there.

**Suggested fix:** widen the definition, e.g. *"A Pronomen is a short word for a person or thing: ich, du, er, sie, es."* Change the group subtitle to match, e.g. "ich, du, er…".

## 4. G1.3 path title is incomplete (Low)

The title on the path is **"ei, ie, sch, w, z"**. The test also teaches **eu, ch, sp/st and v**. Suggest a broader title such as "Neue Laute" / "Letters that sound different", or list every group.

## 5. Pairs instruction doesn't say what to match (Low)

G1.3's pairs screen only says *"Match each pair."* It doesn't say to match each word with the sound or letters it contains, which makes bug 1 more likely. Suggested wording: *"Match each word to the sound it has."*

## 6. Capitalisation is never practised or enforced (Low)

- G1.4 teaches that every Nomen starts with a capital letter, and sentences start with one too. In "Schreib, was fehlt", typing **"ich"** (lowercase) for "_ lerne." is accepted.
- The G1.1 spelling tiles are always uppercase (I-C-H for "ich", K-I-N-D for "Kind"), so case is never practised.

**Suggested fix:** decide on a policy. Either accept lowercase but show the correctly capitalised form in the "Richtig!" feedback, or use mixed-case tiles and check case in tests that teach it.

## 7. G1.2 rule card and check question repeat 3× (Low)

In G1.2's training stage, the "Letters with two dots" card and its check question came up three times, though the first answer was correct. One wrong answer on the ß card also sent the learner back through both cards again. This feels repetitive at the start of a lesson. Suggest showing each card once, plus once more only after a mistake.

## 8. Finish screen shows no result (Low)

"Geschafft! — Great job! You finished this lesson." shows only a "Back to my path" button. There is no score, no count of mistakes, and no note of what was learned. Also, "lesson" should be "test" here: it finishes one test of the lesson.

## 9. Gap questions give the answer to screen readers (Low, accessibility)

The gap word's speaker button is labelled with the full answer, e.g. **"schön — tap to hear"** on "sch_n", or "Sie lernt. — tap to hear" on "_ lernt.". Screen-reader users hear the answer before choosing. Suggest a neutral label such as "Play the word".

---

## Notes (not bugs)

- Some wrong options in gap questions form real words: sch_n + o = **schon** (already), _ielen + sch = **schielen** (to squint), Water (English). The English hint under each question rules them out, so the questions are still fair.
- "ch = a soft 'h', as in 'huge'" is a fair beginner's approximation of the sound in "ich".

## Verified working

- **G1.1:** all 15 meanings are correct, and every question type has exactly one right option.
- **G1.2 / G1.3:** every "Was fehlt?" and "Schreib, was fehlt" question has exactly one answer that fits the meaning.
- **G1.4:** all sentences, verb endings (ich lerne, du lernst, er/sie/es lernt) and noun → pronoun pairs (der Mann → er, die Frau → sie, das Kind → es) are correct.
- **Wrong answers in every question type:**
  - all show "Fast! Versuch's nochmal."
  - rule questions add a hint
  - pairs flash red
  - the sort game marks only the wrong tile and keeps the correct ones in place
- **Input:** letter tiles and a physical keyboard both work, and uppercase input like "Ü" is accepted.
- **Progress:** each test is saved as completed, and the lesson shows the tick on the path.
