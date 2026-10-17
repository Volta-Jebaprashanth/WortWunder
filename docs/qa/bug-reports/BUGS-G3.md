# Bug report: Grammatik → G3 "Verben im Präsens"

Tested on 2026-10-15, desktop Chrome 155, against the local dev server (`localhost:8080`). Profile: mother tongue English.

**Scope.** All six tests were played start to finish: G3.1 Wörter, G3.2 ich lerne, du lernst, G3.3 er, sie, es -t, G3.4 wir -en, ihr -t, G3.5 haben, G3.6 Das Verb ist Nummer 2. That is about 810 screens in total. Answers were judged against standard German, not against the app's data. Audio and images were out of scope. On listening screens the expected sentence was read from the quiz state only to get past them.

**Overall.** Every test completes, saves its progress and shows the tick on the path. No console errors. The German is correct throughout: every regular verb ending for every person, all forms of "haben", and every "Heute"-first sentence. Every vocabulary meaning is right too. The bugs below are one rejected correct translation, a rule card that says "always" where German has exceptions, hints that don't match the mistake (same as G2), and flow.

| #   | Severity | Test       | Summary                                                                                       |
| --- | -------- | ---------- | --------------------------------------------------------------------------------------------- |
| 1   | High     | G3.5       | "You have time." is rejected as the meaning of "Ihr habt Zeit."                               |
| 2   | Medium   | G3.6       | Rule card and hint say the verb is "always" second, but the test's own question puts it first |
| 3   | Medium   | G3.2–G3.6  | The hint after a wrong answer doesn't match the mistake (same as G2 bug 5)                    |
| 4   | Low      | G3.6       | Capital letters on the tiles give away the word order                                         |
| 5   | Low      | G3.5, G3.6 | Rule cards come in reverse order                                                              |
| 6   | Low      | G3.6       | "Was bedeutet das?" doesn't test word order                                                   |
| 7   | Low      | G3.6       | English switches from "I learn" to "I am learning" when "heute" is added                      |
| 8   | Low      | G3.1–G3.5  | One wrong answer brings back the same board or rule card two or three times                   |
| 9   | Low      | G3.1       | "Baue das Wort" shows the German word it asks you to spell                                    |
| 10  | Low      | Path       | Test subtitles follow different patterns                                                      |

---

## 1. G3.5 rejects "You have time." for "Ihr habt Zeit." (High)

**Steps**

1. Open Grammatik → Verben im Präsens → "haben".
2. Play until "Was bedeutet das?" shows **"Ihr habt Zeit."** with the options "You have time. / We have time. / You all have time. / We have a car."
3. Pick **You have time.**

**Expected:** accepted. English "you" is singular and plural, so "You have time." is a correct translation of "Ihr habt Zeit.".

**Actual:** "Fast! Versuch's nochmal." The hint is about the verb form, not the meaning: _"'wir' and 'sie' (they) go with 'haben', 'ihr' goes with 'habt'."_ Only "You all have time." is accepted. Both options are on screen together, so the learner has to guess that "all" is what's being tested.

**Suggested fix:** don't use "You …" as a distractor for an "ihr" sentence when the option set also has "You all …". When an "ihr" sentence is the prompt, take "Du …" meanings ("You have time.") out of its distractors. This is the same pattern as G2 bug 1 ("What is your name?" vs "(polite)").

## 2. "The verb always comes second" is contradicted in the same test (Medium)

**Where:** the G3.6 rule card "The verb is number 2": _"In a German sentence the verb always comes second."_ The hint after a word-order mistake repeats it: _"The verb is always the second part of the sentence."_

**Problem:** yes/no questions put the verb first, and the learner has already seen them:

- G3.6's own reply screen asks **"Hast du heute Zeit?"**, with the verb in place 1, right after the card says "always".
- G3.5's reply screen asks "Hast du Zeit?".

A learner who believes the card can't explain the question they're answering. Imperatives and subordinate clauses break the rule as well; they come later, but "always" will have to be unlearned.

**Suggested fix:** _"In a statement the verb comes second."_ Add one line: _"In a yes/no question it comes first: Hast du Zeit?"_ Change the hint the same way. Check the Tamil and Sinhala versions too.

## 3. The hint after a wrong answer doesn't match the mistake (Medium)

Same root cause as G2 bug 5: the hint is the rule's fixed "why" text, not feedback on what the learner did. Examples from G3:

| Test      | Screen                                  | Wrong answer given                                        | Hint shown                                                           |
| --------- | --------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| G3.2      | Was bedeutet das? "Du spielst Fußball." | "I cook." (wrong meaning)                                 | "du" goes with the ending "-st"                                      |
| G3.2      | Ändere den Satz, Say it about "ich"     | wrong form for "ich"                                      | "du" goes with the ending "-st" (the rule for the _source_ sentence) |
| G3.4      | Ändere den Satz, wir → ihr              | "Ihr spielen Fußball."                                    | "wir", "sie" and "Sie" go with "-en" (should be the "ihr -t" rule)   |
| G3.2–G3.5 | Ordne die Wörter / Baue den Satz        | "singe Ich", "Auto ein hat Er" (wrong order, right forms) | a verb-ending rule                                                   |
| G3.5      | Ordne die Wörter "Tom has time today."  | "heute hat Tom Zeit" (uses "hat")                         | "er", "sie", "es" and names go with "hat"                            |
| G3.6      | Ändere den Satz, Start with "Ich"       | "Ich heute lerne Deutsch"                                 | When "Heute" comes first, the verb is still second …                 |

**Suggested fix:** as for G2. On "Ändere den Satz", show the rule for the _target_ person. On word-order screens, show a word-order hint (e.g. "Start with the person, then the verb"). On "Was bedeutet das?", show the right meaning instead of a grammar rule.

## 4. Tile capitals give away the word order (Low)

**Where:** G3.6 "Ordne die Wörter", "Wie sagt man das auf Deutsch?" and "Baue den Satz".

**Problem:** each sentence's tiles carry its capitalisation: "Heute, lerne, ich, Deutsch" or "Ich, lerne, heute, Deutsch". The one capitalised tile has to go first, and the rest follows from G3.2–G3.5. So the exercise can be solved without knowing the verb-second rule. It also means only one order is ever possible. In G3.5, "Tom has time today." can't be built as "Heute hat Tom Zeit." because the tile is "heute", though that is correct German.

**Suggested fix:** show tiles in lower case (except nouns, names and "Sie") and capitalise whichever word the learner puts first. Then accept both orders where the English allows them ("Heute hat Tom Zeit." / "Tom hat heute Zeit."). The "Start with …" screens already do this well, with both "Ich"/"ich" and "Heute"/"heute" as tiles.

## 5. Rule cards in reverse order (Low)

- **G3.6** opens with "Heute first: the verb **stays** second" before "The verb is number 2". "Stays" refers to a rule that hasn't been taught yet.
- **G3.5** opens with "wir haben, ihr habt" (_"haben follows the normal pattern"_) before "ich habe, du hast, er hat", which is the card that introduces "haben" and says _"It breaks the pattern"_. The first card's text also names only "sie (they)", while its table shows "sie, Sie".

**Suggested fix:** swap the two cards in each test. Add "and polite Sie" to the G3.5 card text.

## 6. G3.6 "Was bedeutet das?" doesn't test word order (Low)

"Heute lerne ich Deutsch." and "Ich lerne heute Deutsch." have the same English, and every meaning question in G3.6 offers the same four options ("Today I am learning German / Tom is playing football / we are cooking / I have time"). Each one is answered by spotting a single noun or name. There are about 16 of them, about a fifth of the test.

**Suggested fix:** drop the meaning type from this test. Or replace it with "Which sentence is right?" pairs (the rule-check format), which do test the rule.

## 7. English tense changes when "heute" is added (Low)

G3.2–G3.5 translate the present as "I learn German." / "We cook.". G3.6 translates the same sentences with "heute" as "Today I am learning German." / "Today we are cooking.". Both are fine English, but side by side they suggest that "heute" changes the German tense.

**Suggested fix:** pick one style for the whole lesson, or add a one-line note on the G3.2 card: "German lerne = I learn / I am learning".

## 8. Repetition after a single mistake (Low)

- **Rule card + check:** one wrong rule-check answer shows the card and its check two more times (G3.2, G3.3, G3.4, G3.5).
- **Pairs boards:** one wrong pair brings the same four-pair board back three times, identical (G3.3, G3.4, G3.5).
- **G3.1:** one wrong pair ("trinken ↔ German") brought three extra boards with only two pairs each (trinken, Deutsch).

**Suggested fix:** one repeat is enough. For the vocabulary pairs, merge the missed words into the next full board instead of making a two-pair board.

## 9. "Baue das Wort" shows the word it asks for (Low)

**Where:** G3.1, the non-listening "Baue das Wort": _"Tap the letters to spell lernen."_ with the meaning "To learn" below.

**Problem:** the instruction spells the answer, so the screen is a copying task. The listening version ("Listen, then spell the word you hear.") is fine.

**Suggested fix:** _"Tap the letters to spell the German word."_ The meaning (and picture) is already the prompt. (This is probably shared with every vocabulary lesson.)

## 10. Path subtitles follow different patterns (Low)

Under "Verben im Präsens":

- "ich lerne, du lernst" → _I learn, you learn_
- "er, sie, es -t" → _he, she, it plays_
- "wir -en, ihr -t" → _we, you all, they_: names "they", which isn't in the title, and has no verb
- "haben" → _to have_

**Suggested fix:** use one pattern, e.g. _he, she, it plays_ / _we play, you all play_.

---

## Notes (not bugs)

- **Gap options that are also real German.** "Sie _." (tanzt / tanzen) and "Sie _ Wasser, Frau Weber." (trinkt / trinken) each have two grammatical fillers. The English hint picks one each time, so they're fair, but only because of the hint (same as G2).
- **"Finde den Fehler" with "du".** "Du schwimmt." (You swim.) and "Du lernt Deutsch." (You learn German.) are fixed by changing the verb, but "Ihr schwimmt." / "Ihr lernt Deutsch." would also match the English. They only appear in G3.2, before "ihr" is taught, so this is fine. Don't reuse them after G3.4. The G3.4 versions use "You all …", which is unambiguous.
- **Konjunktiv I as "mistakes".** "Er tanze.", "Lena singe.", "Er habe ein Auto." are planted mistakes that are technically real German (reported speech). That's fine at A1.
- **Missing letter with a second real word.** HA_EN (B, also S = "Hasen") and ZE_T (I, also L = "Zelt") have a second real word, but the meaning hint rules it out (same as G1 "sch_n").
- **"In the dictionary a verb ends in -en"** (G3.2 card). Nearly true: "wandern", "tun", "sein" end in "-n". "Almost every verb …" would be safer.
- **Sort game feedback.** A wrong sort shows the misplaced tiles in red with no hint text. That's clear enough. "Try again" keeps the correct tiles and returns the wrong ones to the pool.
- **Not tested:** whether "Tom und Anna tanzen." is accepted for "Anna and Tom dance." (the screen didn't come up again once I'd set up the check). G2 rejected the same swap, which is fine: the English sets the order.

## Verified working

- **G3.1 vocabulary:** all 15 meanings are correct (das Auto, der Fußball, trinken, Deutsch, kochen, lernen, die Zeit, singen, spielen, machen, haben, heute, das Wasser, tanzen, schwimmen). Every "Welcher Buchstabe fehlt?" has exactly one letter that fits the meaning. FUSSBALL is spelled correctly in upper case.
- **Verb endings:** ich -e, du -st, er/sie/es/names -t, wir -en, ihr -t, sie/Sie -en are correct for lernen, spielen, kochen, trinken, singen, schwimmen and tanzen ("du tanzt" correctly has no extra s). "haben" is correct in every person (habe, hast, hat, haben, habt, haben).
- **Every gap and "Schreib, was fehlt"** has exactly one answer that fits the English hint. The typed answers accept repeated letter keys (schwimmst from one m key).
- **"Finde den Fehler":** every planted mistake is a real error, and every "No mistake" sentence is correct.
- **"Ändere den Satz":** du ↔ ich, Tom → er, Anna → sie, das Kind → es, Anna und Tom → sie (they), wir ↔ ihr, and "Start with Heute/Ich/Tom/Wir" are all accepted and correct.
- **Sort games:** ich/du endings (G3.2, G3.3), and subjects into "spielen" vs "spielt" and "haben" vs "hat" (G3.4, G3.5) are all accepted.
- **Replies:** "Was machst du?" → "Ich lerne Deutsch.", "Was macht Tom?" → "Tom spielt Fußball.", "Was macht ihr?" → "Wir lernen Deutsch.", "Hast du (heute) Zeit?" → "Ich habe Zeit." / "Heute habe ich Zeit." The distractors are all wrong.
- **G3.6 word order:** every verb-second sentence is correct, and every planted wrong order ("Heute ich lerne Deutsch.", "Ich heute lerne Deutsch.", "Heute wir kochen.") is rejected.
- **Wrong answers in every question type:**
  - all show "Fast! Versuch's nochmal." and "Try again"
  - "Try again" clears the wrong part and keeps correct work
  - pairs flash red
  - a mistake brings that question type back in later rounds
- **Progress:** G3.1–G3.6 are all saved as completed, the path shows a tick on every test and on "Verben im Präsens", and `window.__qaErrors` stayed empty. Reopening a finished test restarts it without clearing its completed flag.
