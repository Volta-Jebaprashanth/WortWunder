# Bug report: Grammatik → G2 "Erste Sätze"

Tested on 2026-10-15, desktop Chrome 155, against the local dev server (`localhost:8080`). Profile: mother tongue English.

**Scope.** All seven tests were played start to finish: G2.1 Wörter 1, G2.2 Ich heiße …, G2.3 ich bin, du bist, G2.4 er, sie, es ist, G2.5 Wörter 2, G2.6 wir, ihr, sie, Sie, G2.7 kommen aus, wohnen in. Answers were judged against standard German, not against the app's data. Audio and images were out of scope.

**Overall.** Every test completes, saves its progress and shows the tick on the path. No console errors. The German sentences are correct throughout: verb forms, "aus" and "in", and the professions without an article ("Tom ist Lehrer"). The English meanings are correct too. The bugs below are two correct answers that get rejected, the "sie / Sie" explanation, hints that don't match the mistake, and flow.

| #   | Severity | Test       | Summary                                                                              |
| --- | -------- | ---------- | ------------------------------------------------------------------------------------ |
| 1   | High     | G2.6       | "What is your name?" is rejected as the meaning of "Wie heißen Sie?"                 |
| 2   | High     | G2.4, G2.6 | Sentence building rejects the correct word order "Er ist hier neu."                  |
| 3   | Medium   | G2.6       | Rule card: "Sie with a capital S is the polite you" fails at the start of a sentence |
| 4   | Medium   | G2.5       | Vocabulary card teaches "sie = They" only, right after G2.4 taught "sie = she"       |
| 5   | Medium   | G2.2–G2.6  | The hint after a wrong answer doesn't match the mistake                              |
| 6   | Low      | G2.7       | "Woher kommst du?" / "Wo wohnst du?" are tested but never taught                     |
| 7   | Low      | G2.6, G2.7 | Conjugation tables show bare "sie" after "they" has been taught                      |
| 8   | Low      | G2.6       | Pairs label "ihr ↔ you (friends)" drops the plural                                   |
| 9   | Low      | G2.5       | Spelling tiles turn "Sie" and "sie" into the same "SIE"                              |
| 10  | Low      | G2.1       | A pairs board with a single pair                                                     |
| 11  | Low      | G2.2–G2.4  | Pairs boards mix two kinds of pair under "Match each pair."                          |
| 12  | Low      | G2.2       | The "du" rule comes before the "ich" rule in a test called "Ich heiße …"             |

---

## 1. G2.6 rejects "What is your name?" for "Wie heißen Sie?" (High)

**Steps**

1. Open Grammatik → Erste Sätze → "wir, ihr, sie, Sie".
2. Play until "Was bedeutet das?" shows **"Wie heißen Sie?"**. The options include "What is your name?" and "What is your name? (polite)".
3. Pick **What is your name?**

**Expected:** accepted. It is a correct translation. English has no polite "you", so it is the normal way to say "Wie heißen Sie?".

**Actual:** "Fast! Versuch's nochmal." The hint is about verb endings, not meaning: _"The polite 'Sie' goes with the same verb as 'wir': 'sind', 'heißen'."_ Only "What is your name? (polite)" is accepted. Both options appear together, so the learner has to guess that the "(polite)" label is what's being tested.

**Suggested fix:** don't put "What is your name?" and "What is your name? (polite)" in the same option set. Take the other sentence's meaning out of the distractors when the two differ only by "(polite)". The same goes for "Wie heißt du?" (picking the "(polite)" option there is fairly wrong, but the pair still invites guessing).

## 2. Word order "Er ist hier neu." is rejected (High)

**Steps**

1. Open "er, sie, es ist".
2. Play until "Wie sagt man das auf Deutsch?" asks for **"He is new here."** The tiles are: Er, ist, neu, hier, plus distractors.
3. Build **Er ist hier neu.**

**Expected:** accepted. "Er ist hier neu." and "Er ist neu hier." are both correct German and mean the same.

**Actual:** "Fast! Versuch's nochmal." with the hint _"'er', 'sie', 'es' and names go with 'ist'"_. The learner did use "ist", so the hint doesn't help either.

**Also affected:** "Ich bin neu hier." (G2.3) and "Ihr seid neu hier." (G2.6) in "Ordne die Wörter" and "Wie sagt man das auf Deutsch?". I checked G2.4 directly; the other two use the same tiles and almost certainly behave the same. The listening version ("Baue den Satz") is fine. There the audio fixes the order.

**Suggested fix:** let a sentence list other accepted word orders, and add "… hier neu" for these three. Or avoid sentences whose two adverbs can swap.

## 3. "Sie with a capital S is the polite you" (Medium)

**Where:** G2.6 rule card "'Sie': the polite 'you'". It says: _"'Sie' with a capital S is the polite 'you', for adults you don't know well."_ Example: "Sie sind Frau Weber."

**Problem:** at the start of a sentence, "sie" (she) and "sie" (they) are also written "Sie". The card's own example starts with "Sie", so the capital proves nothing there. G2.4 had just taught **"Sie ist Ärztin." = "She is a doctor."**, and G2.6 itself uses "Sie sind krank." = "They are sick." A learner following the card would read both as polite "you".

**Suggested fix:** reword to something like _"Polite 'Sie' always has a capital S, even in the middle of a sentence. At the start of a sentence, use the verb and the context: Sie ist = she is, Sie sind = they are or polite you."_ Show a mid-sentence example, e.g. "Wie heißen Sie?" (already on the card) or "Woher kommen Sie?". Check the Tamil and Sinhala versions too.

## 4. "sie = They" contradicts G2.4 (Medium)

**Where:** G2.5 Wörter 2, "Neues Wort" card **sie → They**. All later screens use "They" as its only meaning.

**Problem:** the test just before it (G2.4) taught "sie = she" ("Sie ist Ärztin." = She is a doctor; the pairs board matched Anna ↔ sie). G2.5 now tells the learner that "sie" means "They", with no hint that it also means "she".

**Suggested fix:** show **"she / they"** for "sie". If one card per meaning is needed, use two cards and name the verb on each: "sie (she, + ist)" and "sie (they, + sind)".

## 5. The hint after a wrong answer doesn't match the mistake (Medium)

The hint after a wrong answer seems to be the rule's fixed "why" text, not feedback on what the learner actually did. Examples:

| Test | Question                                        | Wrong answer given                                                  | Hint shown                                          |
| ---- | ----------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| G2.2 | Was sagst du? "Wie heißt du?"                   | Du heißt Anna. (correct German, but it doesn't answer the question) | "ich" goes with "heiße".                            |
| G2.4 | Ändere den Satz: say "es" instead of "das Kind" | Das Kind ist krank. (the sentence left unchanged)                   | "er", "sie", "es" and names go with "ist".          |
| G2.4 | Wie sagt man das auf Deutsch? "He is new here." | Er ist hier neu. (correct, see bug 2)                               | "er", "sie", "es" and names go with "ist".          |
| G2.6 | Was bedeutet das? "Wie heißen Sie?"             | What is your name? (correct, see bug 1)                             | The polite "Sie" goes with the same verb as "wir" … |

In each case the learner already did what the hint says, so the hint doesn't help.

**Suggested fix:** give each question type its own hint:

- reply: "Answer the question: say your own name."
- transform: "Replace 'das Kind' with 'es'."
- meaning: "Look at the whole sentence."

Show the rule's "why" only on gap and spot questions, where the mistake is the verb form.

## 6. "Woher" and "Wo" are tested but never taught (Low)

G2.7's two rule cards teach "Ich komme aus …" and "Ich wohne in …". The test then asks the learner to match and answer **"Woher kommst du?"** and **"Wo wohnst du?"** (pairs board, "Was sagst du?"). It never introduces the question words "woher" and "wo". The English on the pairs board makes the pairs solvable, but they arrive unexplained.

**Suggested fix:** add the two questions as examples on the rule cards, e.g. "Woher kommst du? — Ich komme aus Sri Lanka."

## 7. Conjugation tables show bare "sie" after "they" has been taught (Low)

The G2.7 rule cards show **"er, sie → kommt"** and **"er, sie → wohnt"**. By now G2.6 has taught "sie sind" (they). A learner can't tell which "sie" the table means, and "sie kommt" is wrong for "they".

**Suggested fix:** write "er, sie (she) → kommt", or add a row "wir, sie, Sie → kommen".

## 8. "ihr ↔ you (friends)" drops the plural (Low)

G2.6 pairs board: **ihr ↔ "you (friends)"**. "du" is also "you" for friends, so this label doesn't tell them apart. The rule card itself says "'ihr' is 'you' for two or more friends", and other screens say "You (all)".

**Suggested fix:** "you all (friends)".

## 9. Spelling tiles turn "Sie" and "sie" into the same "SIE" (Low)

In G2.5 "Baue das Wort", both "Sie" (You, formal) and "sie" (They) are built as **S-I-E** from uppercase tiles. The capital letter is the only written difference between them, and G2.6 teaches exactly that difference, but the spelling never practises it. This is the same issue as G1 bug 6.

**Suggested fix:** use mixed-case tiles for these two words, or leave them out of the spelling exercise.

## 10. Pairs board with a single pair (Low)

In G2.1, one "Finde die Paare" round showed only **der Lehrer ↔ Teacher**, and another showed only two pairs. With one pair there is nothing to choose. Suggest merging leftover pairs into the previous board, or making every board at least three pairs.

## 11. Pairs boards mix two kinds of pair (Low)

G2.2–G2.4 boards put **pronoun ↔ verb form** pairs (ich ↔ heiße, du ↔ bist) and **German ↔ English** pairs (Ich heiße ↔ My name is) on one board. G2.4 also adds **name ↔ pronoun** pairs (Tom ↔ er, das Kind ↔ es). The only instruction is "Match each pair." Learners have to work out each pair's type themselves. Suggest one type per board, with an instruction that names it (e.g. "Match each word to its verb"). This is related to G1 bug 5.

## 12. G2.2 opens with the "du" rule (Low)

In "Ich heiße …", the first rule card is **"Your name is …": du heißt**, and only the second card is "My name is …": ich heiße. Suggest swapping them, so the test opens with what its title promises: say your own name first, then ask someone else's.

---

## Notes (not bugs)

- **Gap options that are also real German.** "Sie _ Ärztin." with options ist/sind and "Sie _ krank." with ist/sind both have two grammatical fillers: "Sie ist" (she) and "Sie sind" (they / polite you). The same goes for "Sie ist krank." in "Finde den Fehler", which is correct German for "She is sick". In every case the English hint picks one meaning, so the questions are fair, but they only work because of the hint. Keep the hint visible on these screen types.
- **"Tom und Anna sind krank."** is rejected when building "Anna and Tom are sick." That's fine: the English sets the order.
- **Sie / sie in listening.** They sound the same. The app never offers both as options when the audio is one of them, so no listening question was ambiguous.
- **Unconfirmed:** once, a "Schreib, was fehlt" input showed "iisstt" after "ist" was typed with the letter keys (every letter doubled). I couldn't reproduce it; typing gave "i", "is", "ist" every later time. Worth a quick look at the letter-key handler.
- **Replies.** "Ich bin müde." answering "Wie geht's?" and "Ich bin Frau Weber." answering "Sind Sie Frau Weber?" are both fine. "Ja, ich bin Frau Weber." would sound more natural for the second.

## Verified working

- **G2.1 / G2.5 vocabulary:** all 20 meanings are correct (nett, hier, sein, krank, müde, wie, die Ärztin, neu, der Name, der Lehrer, heißen; und, aus, ihr, wohnen, wir, Sie, in, kommen). The one exception is "sie" (bug 4). Every "Welcher Buchstabe fehlt?" has exactly one letter that fits.
- **Verb forms:** heißen, sein, kommen and wohnen are correct in every person shown (ich heiße / du heißt; bin, bist, ist, sind, seid; komme, kommst, kommt; wohne, wohnst, wohnt). Every gap and "Schreib, was fehlt" has exactly one answer that fits the English hint.
- **"Finde den Fehler":** every planted mistake is a real error (ich heißt, du ist, Anna und Tom seid, Tom wohnt aus Graz, Anna kommt in Deutschland …), and every "No mistake" sentence is correct.
- **"Ändere den Satz":** ich ↔ du, Tom → er, Anna → sie, das Kind → es, Anna und Tom → sie, and du → Sie ("Wie heißen Sie?") are all accepted.
- **Sort game (G2.4):** ich → bin, du → bist, er/sie/es/Anna/Tom/das Kind → ist is accepted.
- **Wrong answers in every question type:**
  - all show "Fast! Versuch's nochmal." and "Try again"
  - pairs flash red
  - a mistake brings that question type back in later rounds
- **Progress:** G2.1–G2.7 are all saved as completed, the path shows a tick on every test and on "Erste Sätze", and `window.__qaErrors` stayed empty.
