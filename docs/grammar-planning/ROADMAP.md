# Grammar roadmap

Beginner German grammar (A1 and A2), in 20 sections, one grammar system at
a time. Each system is taught in full, not as fixed phrases. The goal is
using grammar, not knowing rules: after the last section a learner can build
their own sentences, ask and answer questions, give reasons, compare, and
talk about the past and the future. The vocabulary lessons (1.1–1.30) are
the word bank; the grammar here is how those words become sentences. The
"Grammar coverage" table at the end maps each grammar point to its tests,
and lists what is left for B1.

## Rules

- **Grammar first.** Each Wörter test only brings in the words its section's
  sentences need. Most of them are grammar words: pronouns, question
  words, articles, prepositions, verbs. Nouns and adjectives come from the
  vocabulary lessons listed under "Borrows from".
- **Every section opens with a Wörter test**: it introduces the new words
  the same way the vocabulary tests do, 10–15 words per test. A long
  section can have a second Wörter test halfway, so words arrive close to
  where they are used.
- **A word is introduced once.** After its Wörter test, later tests and
  sections use it without introducing it again. A known spelling with a new
  meaning counts as a new word (_sie_ she → they, _Frau_ woman → Mrs,
  _sein_ to be → his, _ihr_ you all → her → to her, _nach_ to → after,
  _vor_ before → in front of, _wie_ how → as).
- **Only taught grammar and introduced words.** An example sentence uses
  only grammar from earlier tests and words from earlier Wörter tests.
  A fixed phrase (_Wie heißt du?_) may come before its grammar only when a
  later test explains it; the roadmap names that test.
- **The learner produces German.** Choosing from options is only the warm-up
  in a grammar test. The learner must also build the sentence from word
  tiles, fill in the right form (_du lern**st**_, _ein**en**_, _mit dem_),
  and answer a question with a whole sentence.
- **Every section ends with a Sprechen test**: a short real situation (say
  who you are, shop, plan a day) where the learner builds sentences with the
  section's grammar plus everything before it. Here the learner may also use
  any word from a vocabulary lesson they have finished (_Ich wohne in ___._),
  but the app's own prompts still use only introduced words.
- **The sound words in G1.3 and G1.4 do not count as introduced.** They are
  heard, not learned, so a later Wörter test can introduce them.
- **Words with no picture** (_wie, um, und, man, es gibt, denn, doch_) use
  screens without images: German ↔ English matching, listen and choose,
  fill the gap.

## How to plan a grammar section

The standard for planning any grammar section (G1 to G20). Each section
is designed on its own: it can have its own question styles, screens and
teaching ideas.

**Role.** You are a specialised German language trainer for
English-speaking kids. You are fluent in German and English, and you know
how to teach grammar in a simple, organised way, so kids can grab it
easily. The app is built for kids, but adults with zero German can use it
too.

**Steps.**

1. Analyse the app overall.
2. Refer to this roadmap: the section's tests and the Rules above.
3. Plan the whole section: how each grammar concept is introduced, and
   what types of question it uses. Make it very interactive, easy to
   understand and easy to remember.

**Levels.** Every lesson has four hardness levels, played in this order:
**Training → Simple → Medium → Hard**.

**Penalty rules.** Every lesson has penalty rules, so the learner has to
complete each level correctly before moving on.

**Output.** Two Markdown files in `docs/grammar-planning/G<n>/`:

- `plan.md`: the plan described above.
- `screens.md`: what exactly each screen looks like, for every screen in
  the section, as a wireframe UI. Every screen has its real words and
  everything that will be on it. Images and audio are placeholders only.
  It lists every single thing that will be built, but it is an MD file,
  not code.
- Ignore the vocabulary (Wörter) tests in `screens.md`: they look the
  same as the other vocabulary lessons.

## G1 Los geht's (Getting started) · A1

Before any grammar: how German looks and sounds, and the names for the three
kinds of word the rest of the section talks about. The words in G1.3 and
G1.4 are there for their sounds. The learner hears them but is not drilled
on their meaning.

| Test | Teaches                                                                                   | Example                                                                                 |
| ---- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| G1.1 | **Wörter**: first words                                                                   | _Hallo, Tschüss, Danke, Bitte, ja, nein, ich, du, der Mann, die Frau, das Kind, lernen_ |
| G1.2 | The alphabet A–Z, and spelling a name aloud                                               | _A-N-N-A_                                                                               |
| G1.3 | The new letters: ä, ö, ü, ß                                                               | _Mädchen, schön, Tür, Straße_                                                           |
| G1.4 | Letter pairs that sound different: ei/ie, eu, au, sch, ch (two sounds), sp/st, j, w, v, z | _mein / wie, Haus, Schule, ich / acht, ja_                                              |
| G1.5 | Three kinds of word: Nomen (always a capital letter), Verb, Pronomen                      | _Anna **lernt**. **Sie** lernt._                                                        |
| G1.6 | **Sprechen**: greet, thank, say goodbye                                                   | _Hallo! — Hallo! … Danke! — Bitte! … Tschüss!_                                          |

Borrows from: 1.1 Hallo, 1.2 Familie, 1.30 Pronomen & Co.

## G2 Erste Sätze (First sentences) · A1

Only `heißen` and `sein`. Regular verb endings come in G3, and questions in
G4.

| Test | Teaches                                                                | Example                                                                                        |
| ---- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| G2.1 | **Wörter 1**: the words for G2.2 to G2.4                               | _heißen, sein, der Name, wie, müde, nett, krank, hier, neu, er, sie, es, der Lehrer, der Arzt_ |
| G2.2 | `ich` and `du` with `heißen`; _Wie heißt du?_ as a fixed phrase (G4.3) | _Ich heiße Anna. Wie heißt du?_                                                                |
| G2.3 | `sein`: ich bin, du bist                                               | _Ich bin müde. Du bist nett._                                                                  |
| G2.4 | `er`, `sie`, `es` with `ist`; no `ein` before a job; `-in` for a woman | _Er ist Lehrer. Sie ist Lehrerin. Sie ist Ärztin._                                             |
| G2.5 | **Wörter 2**: the words for G2.6                                       | _wir, ihr, sie (they), Sie, Herr, Frau (Mrs), alt, jung, zusammen, da, glücklich, toll_        |
| G2.6 | `wir`, `ihr`, `sie` with `sind` / `seid`; formal `Sie`                 | _Wir sind zusammen. Ihr seid toll. Sie sind Herr Weber._                                       |
| G2.7 | **Sprechen**: say who you are and who someone else is                  | _Ich heiße Anna. Ich bin hier neu. Er heißt Tom. Er ist Lehrer._                               |

Borrows from: 1.1 Hallo, 1.7 Der Beruf, 1.8 Angaben zur Person,
1.19 Gefühle, 1.30 Pronomen & Co.

## G3 Verben im Präsens (Verbs in the present) · A1

| Test | Teaches                                                                                                                                         | Example                                                                                                                                |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| G3.1 | **Wörter**                                                                                                                                      | _spielen, kochen, machen, trinken, schwimmen, tanzen, singen, gehen, arbeiten, haben, die Zeit, das Auto, heute, Deutsch, der Fußball_ |
| G3.2 | Verb stem and ending; `ich -e`, `du -st`                                                                                                        | _ich lerne, du lernst_                                                                                                                 |
| G3.3 | `er/sie/es -t`                                                                                                                                  | _Er spielt Fußball._                                                                                                                   |
| G3.4 | `wir -en`, `ihr -t`, `sie/Sie -en`                                                                                                              | _Wir kochen. Ihr kocht._                                                                                                               |
| G3.5 | Special stems: after `-t` / `-d` add an `-e-`; after `-s` / `-ß` / `-z` the `du` form takes only `-t`                                           | _du arbeitest, er arbeitet; du tanzt, du heißt_                                                                                        |
| G3.6 | `haben`                                                                                                                                         | _Ich habe Zeit. Er hat Zeit._                                                                                                          |
| G3.7 | In a statement the verb is the second idea, even when the sentence starts with a time word (a yes/no question puts it first; G4.2 teaches that) | _Ich **lerne** heute Deutsch. Heute **lerne** ich Deutsch._                                                                            |
| G3.8 | **Sprechen**: say what you and others do                                                                                                        | _Ich spiele Fußball. Heute koche ich. Wir tanzen. Anna singt._                                                                         |

Borrows from: 1.6 Die Hobbys, 1.17 Wichtige Verben.

## G4 Fragen (Questions) · A1

| Test | Teaches                                                             | Example                                                                                                  |
| ---- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| G4.1 | **Wörter 1**                                                        | _wer, was, warum, wo, woher, wann, kommen, wohnen, aus, in, das Land, Indien, Sri Lanka_                 |
| G4.2 | Yes/no questions: the verb moves to the front; answer `ja` / `nein` | _Spielst du Fußball? Ja. Bist du müde? Nein._                                                            |
| G4.3 | `wer`, `was`, `warum`, and `wie` (known from G2.2)                  | _Wer bist du? Was machst du? Warum lernst du Deutsch?_                                                   |
| G4.4 | `wo`, `woher`, `wann`; `kommen aus`, `wohnen in`                    | _Woher kommst du? Ich komme aus Sri Lanka. Wo wohnst du? Ich wohne in Indien._                           |
| G4.5 | **Wörter 2**: numbers                                               | _eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf, wie alt, wie viel, das Jahr_ |
| G4.6 | `wie alt`, `wie viel`; _… Jahre alt_ as a fixed phrase (G5.6)       | _Wie alt bist du? Ich bin acht Jahre alt. Wie viel Zeit hast du?_                                        |
| G4.7 | **Sprechen**: ask someone about themselves, and answer about you    | _Wie heißt du? Woher kommst du? Wo wohnst du? Wie alt bist du? — Ich heiße …_                            |

`wohin` waits for G10, where its answers (`nach`, `zu`) are taught.

Borrows from: 1.8 Angaben zur Person, 1.15 Die Zahlen, 1.16 Die W-Fragen.

## G5 Nomen & Artikel (Nouns and articles) · A1

| Test  | Teaches                                                        | Example                                                                                                                          |
| ----- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| G5.1  | **Wörter 1**: things at home and animals                       | _der Tisch, der Stuhl, die Lampe, die Tür, das Bett, das Fenster, das Buch, der Hund, die Katze, das Pferd, groß, klein_         |
| G5.2  | Every noun has a gender: `der`, `die`, `das`                   | _Der Tisch ist groß. Die Lampe ist neu._                                                                                         |
| G5.3  | `ein`, `eine`: "a" versus "the"; `Das ist …`                   | _Das ist ein Hund. Der Hund ist klein._                                                                                          |
| G5.4  | Compound nouns: the last noun gives `der` / `die` / `das`      | _der Tisch + die Lampe = die Tischlampe; das Kind + das Buch = das Kinderbuch_                                                   |
| G5.5  | **Wörter 2**: family, with plurals; `nicht`, `doch`            | _der Bruder, die Schwester, der Sohn, die Tochter, die Eltern, der Großvater, die Großmutter, der Onkel, die Tante, nicht, doch_ |
| G5.6  | Plural: `die` for every noun, and the endings                  | _Die Kinder sind müde. Ich habe zwei Brüder._                                                                                    |
| G5.7  | `kein`, `keine`                                                | _Das ist kein Hund. Das sind keine Bücher._                                                                                      |
| G5.8  | `nicht`, and when to use `nicht` or `kein`                     | _Ich komme nicht. Ich habe keine Zeit._                                                                                          |
| G5.9  | `doch`: answering "yes" to a question with `nicht` or `kein`   | _Kommst du nicht? Doch!_                                                                                                         |
| G5.10 | **Sprechen**: say what something is, and who is in your family | _Das ist eine Lampe. Die Lampe ist neu. Ich habe zwei Brüder. Ich habe keine Schwester._                                         |

Borrows from: 1.2 Familie, 1.4 Haus & Zimmer, 1.8 Angaben zur Person,
1.12 Arbeit & Schule, 1.24 Die Tiere. The words of both word tests now carry
a `plural`, which `TrainingCard` shows. No sentence puts a `der` word after a
verb (_Ich habe einen Hund._): that is Akkusativ, G6.

## G6 Akkusativ (The object of a sentence) · A1

| Test | Teaches                                                                         | Example                                                                                                                         |
| ---- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| G6.1 | **Wörter**                                                                      | _der Apfel, der Kaffee, der Tee, das Brot, die Milch, der Saft, kaufen, brauchen, möchten, es gibt, für, ohne, mich, dich, ihn_ |
| G6.2 | Who does it, and to what; `der` becomes `den`, `ein` becomes `einen`            | _Ich habe einen Bruder._                                                                                                        |
| G6.3 | `die` and `das` do not change; `keinen`                                         | _Ich habe keinen Hund._                                                                                                         |
| G6.4 | `es gibt`, `brauchen`, `möchten` with an object                                 | _Ich möchte einen Kaffee._                                                                                                      |
| G6.5 | `für` and `ohne` always take the Akkusativ                                      | _Der Tee ist für Anna. Ich trinke Kaffee ohne Milch._                                                                           |
| G6.6 | `mich`, `dich`, `ihn`, `sie`, `es`: `er` becomes `ihn` like `der` becomes `den` | _Ich brauche dich. Der Apfel? Ich kaufe ihn._                                                                                   |
| G6.7 | Mixed: subject or object?                                                       | _Der Mann kauft den Apfel._                                                                                                     |
| G6.8 | **Sprechen**: shopping: ask for things and say what you need                    | _Ich möchte einen Apfel. Ich brauche Milch. Gibt es Brot? — Nein, es gibt kein Brot._                                           |

Borrows from: 1.3 Essen & Trinken, 1.9 Einkaufen, 1.27 Präpositionen,
1.30 Pronomen & Co.

## G7 Possessivartikel (My, your, his, her) · A1

| Test | Teaches                                                                                | Example                                                                                                                           |
| ---- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| G7.1 | **Wörter**                                                                             | _mein, dein, sein (his), ihr (her), unser, euer, Ihr, der Vater, die Mutter, der Opa, die Oma, die Tasche, die Wohnung, besuchen_ |
| G7.2 | `mein`, `dein`, and the extra `-e`                                                     | _mein Vater, meine Mutter_                                                                                                        |
| G7.3 | `sein`, `ihr`: same spelling as the verb `sein` and the pronoun `ihr`, a different job | _sein Auto, ihre Tasche_                                                                                                          |
| G7.4 | `unser`, `euer`, formal `Ihr`                                                          | _unsere Wohnung, Ihr Name_                                                                                                        |
| G7.5 | Possessives as the object                                                              | _Ich besuche meinen Opa._                                                                                                         |
| G7.6 | A name + `-s`                                                                          | _Annas Bruder, Annas Wohnung_                                                                                                     |
| G7.7 | **Sprechen**: talk about your family and what belongs to whom                          | _Mein Vater ist Lehrer. Meine Mutter ist Ärztin. Das ist Annas Tasche. Ich besuche meine Oma._                                    |

Borrows from: 1.2 Familie, 1.4 Haus & Zimmer, 1.30 Pronomen & Co.

## G8 Besondere Verben (Verbs that change) · A1

| Test | Teaches                                                     | Example                                                                                                                 |
| ---- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| G8.1 | **Wörter 1**: verbs that change their vowel, and `wissen`   | _essen, lesen, sehen, sprechen, nehmen, geben, fahren, schlafen, laufen, tragen, wissen_                                |
| G8.2 | Vowel change e to i / ie; `nehmen` also changes a consonant | _ich esse, du isst; ich lese, er liest; ich nehme, du nimmst_                                                           |
| G8.3 | Vowel change a to ä, and au to äu                           | _ich fahre, er fährt; ich laufe, du läufst_                                                                             |
| G8.4 | `wissen`: ich weiß, du weißt, er weiß                       | _Ich weiß es nicht. Weißt du das?_                                                                                      |
| G8.5 | **Wörter 2**: separable verbs                               | _aufstehen, anrufen, einkaufen, fernsehen, mitkommen, ankommen, abfahren, aufmachen, zumachen, anfangen, früh, die Uhr_ |
| G8.6 | Separable verbs: the front part goes to the end             | _Ich stehe früh auf._                                                                                                   |
| G8.7 | Separable verbs in questions and the daily routine          | _Wann rufst du an? Wann stehst du auf?_                                                                                 |
| G8.8 | **Sprechen**: your day, from morning to night               | _Ich stehe früh auf. Ich esse Brot. Ich lese ein Buch. Ich sehe fern. Ich schlafe._                                     |

Borrows from: 1.3 Essen & Trinken, 1.10 Zeit & Datum, 1.11 Verkehr & Wege,
1.17 Wichtige Verben.

## G9 Modalverben (Can, must, want, should, may, like) · A1–A2

| Test | Teaches                                                 | Example                                                                                           |
| ---- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| G9.1 | **Wörter**                                              | _können, müssen, wollen, sollen, dürfen, mögen, man, parken, morgen, die Arbeit, die Hausaufgabe_ |
| G9.2 | `können`                                                | _Ich kann schwimmen._                                                                             |
| G9.3 | `müssen`                                                | _Ich muss arbeiten._                                                                              |
| G9.4 | `wollen` and `möchten`                                  | _Ich möchte Tee trinken._                                                                         |
| G9.5 | `sollen`: someone else wants it                         | _Ich soll Hausaufgaben machen._                                                                   |
| G9.6 | `dürfen`                                                | _Hier darf man nicht parken._                                                                     |
| G9.7 | `mögen` with a noun: ich mag, du magst                  | _Ich mag Tee. Magst du Hunde?_                                                                    |
| G9.8 | Mixed: modal second, other verb last                    | _Kannst du morgen kommen?_                                                                        |
| G9.9 | **Sprechen**: what you can, must and want to do; asking | _Ich kann schwimmen. Ich muss Hausaufgaben machen. Willst du Fußball spielen?_                    |

Borrows from: 1.6 Die Hobbys, 1.12 Arbeit & Schule, 1.17 Wichtige Verben.

## G10 Dativ 1: Präpositionen (Dative after prepositions) · A2

The third case. It starts with the prepositions that always take it, so the
learner meets the new endings in short phrases before whole sentences.

| Test  | Teaches                                                                                               | Example                                                                                                                     |
| ----- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| G10.1 | **Wörter**                                                                                            | _mit, bei, zu, von, seit, nach (to), wohin, der Freund, die Freundin, das Haus, die Schule, der Bus, das Büro, die Schweiz_ |
| G10.2 | `mit`, `bei`, `zu`, `von`, `aus` always take the Dativ: `der` / `das` → `dem`, `die` → `der`          | _mit dem Bus, bei der Freundin, aus dem Büro_                                                                               |
| G10.3 | `ein` → `einem`, `eine` → `einer`; `kein` and the possessives the same way                            | _mit einem Freund, bei meiner Oma, mit meinem Bruder_                                                                       |
| G10.4 | Short forms: `zum`, `zur`, `beim`, `vom`                                                              | _zum Arzt, zur Schule, beim Arzt, vom Büro_                                                                                 |
| G10.5 | Plural: `den` + `-n` on the noun                                                                      | _mit den Kindern, bei den Eltern, mit meinen Freunden_                                                                      |
| G10.6 | Where to? `wohin` with `nach` (towns, countries) and `zu` (people, places); `nach Hause` / `zu Hause` | _Wohin fährst du? Nach Indien. Zu Anna. Ich gehe nach Hause. Ich bin zu Hause._                                             |
| G10.7 | Countries with an article; `seit` + Dativ                                                             | _aus der Schweiz; seit einem Jahr, seit zwei Jahren_                                                                        |
| G10.8 | **Sprechen**: say how you go somewhere, and who with                                                  | _Ich fahre mit dem Bus zur Schule. Seit einem Jahr wohne ich bei meiner Oma._                                               |

Borrows from: 1.2 Familie, 1.11 Verkehr & Wege, 1.25 In der Stadt,
1.27 Präpositionen.

## G11 Dativ 2: Verben & Pronomen (Dative verbs and pronouns) · A2

| Test  | Teaches                                                                      | Example                                                                                                              |
| ----- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| G11.1 | **Wörter 1**                                                                 | _mir, dir, ihm, ihr (to her), uns, euch, ihnen, Ihnen, helfen, gefallen, gehören, danken, schmecken, antworten, gut_ |
| G11.2 | Dative pronouns: `mir`, `dir`, `ihm`, `ihr`, `uns`, `euch`, `ihnen`, `Ihnen` | _Wie geht es dir? Mir geht es gut. Wie geht es Ihnen?_                                                               |
| G11.3 | Verbs that take the Dativ, with a noun                                       | _Ich helfe meiner Mutter. Das Auto gehört meinem Vater. Ich danke dem Lehrer._                                       |
| G11.4 | Verbs that take the Dativ, with a pronoun                                    | _Das gefällt mir. Das Brot schmeckt ihm. Kannst du mir helfen?_                                                      |
| G11.5 | **Wörter 2**: verbs with two objects                                         | _schenken, zeigen, bringen, schreiben, sagen, das Geschenk, die Blume, der Brief, der Junge, der Student_            |
| G11.6 | Two objects: the person is Dativ, the thing is Akkusativ                     | _Ich schenke meiner Mutter eine Blume. Ich gebe dem Kind das Buch._                                                  |
| G11.7 | n-nouns: `der Junge` → `den` / `dem Jungen`; `Herr` → `Herrn`                | _Ich helfe dem Jungen. Ich danke Herrn Weber._                                                                       |
| G11.8 | Mixed: Nominativ, Akkusativ or Dativ?                                        | _Der Mann gibt dem Kind einen Apfel._                                                                                |
| G11.9 | **Sprechen**: give, show and thank                                           | _Ich schenke meiner Oma eine Blume. Die Blume gefällt ihr. Ich helfe meinem Bruder._                                 |

Borrows from: 1.2 Familie, 1.17 Wichtige Verben, 1.30 Pronomen & Co.

## G12 Zeit (Time) · A1–A2

| Test   | Teaches                                                                | Example                                                                                                                               |
| ------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| G12.1  | **Wörter 1**: the clock and the week                                   | _um, wie spät, halb, Viertel, vor (before), nach (after), bis, ab, der Montag, der Dienstag, das Wochenende, das Essen, die Stunde_   |
| G12.2  | The clock; `halb neun` is 8:30, not 9:30                               | _Wie spät ist es? Es ist acht Uhr. Es ist halb neun. Es ist Viertel nach acht._                                                       |
| G12.3  | `um`, `von ... bis`, `ab`                                              | _um acht Uhr, von Montag bis Dienstag, ab Montag_                                                                                     |
| G12.4  | `vor`, `nach`, `in` + Dativ for time                                   | _vor dem Essen, nach dem Essen, in einer Stunde_                                                                                      |
| G12.5  | **Wörter 2**: months, seasons, dates, how often                        | _am, im, der Mai, der Juli, der Sommer, der Winter, der erste, der zweite, der dritte, immer, oft, manchmal, nie, wie oft, wie lange_ |
| G12.6  | `am` = an dem, `im` = in dem: days, months, seasons                    | _am Montag, im Juli, im Sommer_                                                                                                       |
| G12.7  | The date: `der erste`, `am ersten` (the ending is explained in G16.3)  | _Heute ist der erste Mai. Ich komme am dritten Juli._                                                                                 |
| G12.8  | `wie oft`, `wie lange`, `seit wann`; `immer`, `oft`, `manchmal`, `nie` | _Wie oft spielst du Fußball? Manchmal. Wie lange lernst du Deutsch? Seit einem Jahr._                                                 |
| G12.9  | Time first, verb still second                                          | _Am Montag **spiele** ich Fußball. Nach dem Essen **sehe** ich fern._                                                                 |
| G12.10 | **Sprechen**: make a plan: ask when, and say when                      | _Wann kommst du? — Am Montag um acht Uhr. Kannst du am Wochenende? — Nein, am Wochenende arbeite ich._                                |

Borrows from: 1.10 Zeit & Datum, 1.15 Die Zahlen, 1.27 Präpositionen.

## G13 Ort: Wechselpräpositionen (Where and where to) · A2

The nine two-way prepositions: Dativ for where something is (`wo?`),
Akkusativ for where it goes (`wohin?`).

| Test  | Teaches                                                            | Example                                                                                                     |
| ----- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| G13.1 | **Wörter 1**                                                       | _an, auf, unter, über, neben, vor (in front of), hinter, zwischen, die Wand, das Regal, der Park, das Kino_ |
| G13.2 | Where? `wo` + Dativ                                                | _Das Buch ist auf dem Tisch. Die Katze ist unter dem Bett._                                                 |
| G13.3 | Where to? `wohin` + Akkusativ; `ins`, `ans`                        | _Ich gehe in die Schule. Ich gehe ins Kino. Die Katze geht unter das Bett._                                 |
| G13.4 | `wo` or `wohin`? The same preposition, two cases                   | _Ich bin in der Schule. Ich gehe in die Schule._                                                            |
| G13.5 | **Wörter 2**: putting and being; directions                        | _liegen, legen, stehen, stellen, hängen, sitzen, das Bild, der Schrank, links, rechts, geradeaus, durch_    |
| G13.6 | Pairs: `liegen` / `legen`, `stehen` / `stellen`, `hängen`          | _Das Buch liegt auf dem Tisch. Ich lege das Buch auf den Tisch._                                            |
| G13.7 | Directions: `links`, `rechts`, `geradeaus`; `durch` + Akkusativ    | _Das Kino ist links. Ich gehe durch den Park._                                                              |
| G13.8 | Mixed: Dativ or Akkusativ?                                         | _Ich stelle den Stuhl neben das Bett. Der Stuhl steht neben dem Bett._                                      |
| G13.9 | **Sprechen**: say where things are in your room, and where they go | _Das Bild hängt an der Wand. Die Tasche liegt unter dem Tisch. Ich lege das Buch ins Regal._                |

Borrows from: 1.4 Haus & Zimmer, 1.11 Verkehr & Wege, 1.25 In der Stadt,
1.27 Präpositionen.

## G14 Imperativ (Asking and telling) · A1

| Test  | Teaches                                                                                       | Example                                                                                           |
| ----- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| G14.1 | **Wörter**                                                                                    | _der Platz, warten, öffnen, schließen, wiederholen, langsam, leise, laut, mal, sofort_            |
| G14.2 | Formal: `Sie`                                                                                 | _Nehmen Sie Platz._                                                                               |
| G14.3 | Informal: `du`; e to i / ie verbs keep the change (G8), separable verbs split, `sein` → `sei` | _Komm bitte! Nimm! Lies! Steh auf! Sei leise! Hilf mir!_                                          |
| G14.4 | Several people: `ihr`                                                                         | _Wartet hier!_                                                                                    |
| G14.5 | Softer requests: `bitte`, `mal`, and `Können Sie …?`                                          | _Mach mal das Fenster auf! Können Sie mir helfen? Wiederholen Sie bitte!_                         |
| G14.6 | **Sprechen**: ask someone to do something, and answer a request                               | _Öffnen Sie bitte das Fenster! — Ja. … Sprechen Sie bitte langsam! … Kannst du mir helfen? — Ja!_ |

Borrows from: 1.13 Gesundheit, 1.26 Alltagssprache.

## G15 Vergangenheit (Talking about the past) · A1–A2

The participle always goes to the end, like the second verb in G9.

| Test  | Teaches                                                                         | Example                                                                                                              |
| ----- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| G15.1 | **Wörter**                                                                      | _gestern, vorgestern, letzte Woche, früher, der Urlaub, reisen, fliegen, bleiben, telefonieren, die Pizza, der Film_ |
| G15.2 | Präteritum of `sein` and `haben`: `war`, `hatte`                                | _Ich war krank. Ich hatte keine Zeit._                                                                               |
| G15.3 | Präteritum of the modal verbs: `konnte`, `musste`, `wollte`, `sollte`, `durfte` | _Früher konnte ich nicht schwimmen. Gestern musste ich arbeiten._                                                    |
| G15.4 | Perfekt with `haben`: `ge-...-t`                                                | _Ich habe Deutsch gelernt._                                                                                          |
| G15.5 | Perfekt with `haben`: `ge-...-en`                                               | _Ich habe Pizza gegessen. Ich habe einen Film gesehen._                                                              |
| G15.6 | Perfekt with `sein`: movement and change; `bleiben`                             | _Ich bin nach Hause gegangen. Wir sind zu Hause geblieben._                                                          |
| G15.7 | Participles that look different: `-ge-` inside, no `ge-` for be- / -ieren verbs | _Ich habe eingekauft. Ich bin aufgestanden. Ich habe Oma besucht. Ich habe telefoniert._                             |
| G15.8 | Mixed: `haben` or `sein`?                                                       | _Wir sind gefahren. Wir haben gespielt._                                                                             |
| G15.9 | **Sprechen**: tell what you did yesterday or last weekend                       | _Gestern war ich im Kino. Ich habe einen Film gesehen. Letzte Woche bin ich nach Indien geflogen._                   |

Borrows from: 1.10 Zeit & Datum, 1.14 Reise & Hotel, 1.17 Wichtige Verben.

## G16 Adjektive (Describing and comparing) · A2

Adjectives after `sein` (_Der Tisch ist groß._) have no ending and are known
since G5. This section adds the endings an adjective takes in front of a
noun, and comparing.

| Test   | Teaches                                                                                                     | Example                                                                                          |
| ------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| G16.1  | **Wörter**                                                                                                  | _dieser, jeder, welcher, schön, teuer, billig, rot, blau, lang, kurz, viel, gern, als, wie (as)_ |
| G16.2  | `dieser`, `jeder`, `welcher`: the same endings as `der`                                                     | _Dieser Tisch ist teuer. Welche Tasche möchtest du? Jedes Kind lernt._                           |
| G16.3  | After `der` / `dieser`: `-e`, and `-en` everywhere else                                                     | _der rote Apfel, die blaue Tasche; den roten Apfel, mit dem roten Auto_                          |
| G16.4  | After `ein` / `kein` / `mein`: the adjective shows the gender                                               | _ein roter Apfel, eine rote Tasche, ein rotes Auto_                                              |
| G16.5  | After `ein` in the Akkusativ and Dativ                                                                      | _Ich kaufe einen roten Apfel. Ich fahre mit einem blauen Auto._                                  |
| G16.6  | No article: the adjective takes the article's ending                                                        | _rote Äpfel, billige Bücher_                                                                     |
| G16.7  | Comparing: `-er` and `als`; short adjectives often add an umlaut                                            | _groß – größer, alt – älter. Der Tisch ist größer als der Stuhl._                                |
| G16.8  | The most: `am -sten`; `gut – besser – am besten`, `viel – mehr – am meisten`, `gern – lieber – am liebsten` | _Ich trinke gern Tee, lieber Kaffee, am liebsten Saft._                                          |
| G16.9  | The same: `so … wie`                                                                                        | _Anna ist so alt wie Tom._                                                                       |
| G16.10 | **Sprechen**: describe things, choose one, and compare                                                      | _Welches Auto gefällt dir? Das rote Auto gefällt mir. Es ist schöner als das blaue Auto._        |

Borrows from: 1.3 Essen & Trinken, 1.4 Haus & Zimmer, 1.9 Einkaufen.

## G17 Sätze verbinden (Joining sentences) · A1–A2

| Test  | Teaches                                                                            | Example                                                                                    |
| ----- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| G17.1 | **Wörter**                                                                         | _und, oder, aber, denn, sondern, deshalb, dann, zuerst, danach, auch, sehr_                |
| G17.2 | `und`, `oder`: the verb does not move                                              | _Ich trinke Tee oder Kaffee. Ich bin sehr müde und Anna auch._                             |
| G17.3 | `aber`, `denn`, `sondern`: the verb does not move                                  | _Ich komme nicht, denn ich bin krank. Nicht Tee, sondern Kaffee._                          |
| G17.4 | `deshalb`, `dann`, `zuerst`, `danach` take the first place, so the verb comes next | _Ich bin krank, deshalb bleibe ich zu Hause. Zuerst stehe ich auf, dann esse ich._         |
| G17.5 | Mixed: does the verb move?                                                         | _…, denn ich bin müde. / …, deshalb bin ich müde._                                         |
| G17.6 | **Sprechen**: tell your day in order, and say why                                  | _Zuerst stehe ich auf, dann esse ich Brot. Danach gehe ich zur Schule, aber ich bin müde._ |

Borrows from: 1.18 Kleine Wörter, 1.29 Adverbien.

## G18 Nebensätze (Clauses with the verb at the end) · A2

| Test  | Teaches                                                         | Example                                                                                                  |
| ----- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| G18.1 | **Wörter**                                                      | _weil, dass, wenn, ob, glauben, denken, finden, hoffen, fragen, das Wetter, regnen, die Sonne, scheinen_ |
| G18.2 | `weil`: the verb goes to the end                                | _Ich bleibe zu Hause, weil ich krank bin._                                                               |
| G18.3 | `weil` with a modal, a separable verb, the Perfekt              | _…, weil ich arbeiten muss. …, weil ich früh aufstehe. …, weil ich Pizza gegessen habe._                 |
| G18.4 | `dass`, after `glauben`, `denken`, `finden`, `hoffen`, `wissen` | _Ich glaube, dass er krank ist. Ich finde, dass Deutsch toll ist._                                       |
| G18.5 | `wenn`; a clause first, then verb, verb                         | _Wenn es regnet, bleibe ich zu Hause._                                                                   |
| G18.6 | Indirect questions: `ob`, and W-words                           | _Ich weiß nicht, ob er kommt. Weißt du, wo Anna wohnt?_                                                  |
| G18.7 | Mixed: `denn` or `weil`?                                        | _Ich komme nicht, denn ich bin krank. Ich komme nicht, weil ich krank bin._                              |
| G18.8 | **Sprechen**: give reasons and opinions                         | _Ich lerne Deutsch, weil ich in der Schweiz wohnen möchte. Wenn die Sonne scheint, spiele ich Fußball._  |

Borrows from: 1.18 Kleine Wörter, 1.19 Gefühle.

## G19 Reflexive Verben & Verben mit Präposition · A2

| Test  | Teaches                                                           | Example                                                                                                                                                  |
| ----- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G19.1 | **Wörter**                                                        | _sich, sich waschen, sich anziehen, sich freuen, sich interessieren, sich treffen, sich setzen, sich beeilen, die Party, der Geburtstag, worauf, darauf_ |
| G19.2 | Reflexive pronouns: `mich`, `dich`, `sich`, `uns`, `euch`, `sich` | _Ich wasche mich. Er zieht sich an._                                                                                                                     |
| G19.3 | Reflexive verbs in questions, commands and the Perfekt            | _Wir treffen uns am Montag. Setz dich! Ich habe mich beeilt._                                                                                            |
| G19.4 | Verbs with a fixed preposition                                    | _Ich warte auf den Bus. Ich freue mich auf die Party. Ich interessiere mich für Fußball._                                                                |
| G19.5 | Asking and pointing back: `worauf?`, `wofür?`, `darauf`, `dafür`  | _Worauf wartest du? Auf den Bus. Ich warte darauf._                                                                                                      |
| G19.6 | **Sprechen**: plans and feelings                                  | _Ich freue mich auf meinen Geburtstag. Wir treffen uns am Wochenende._                                                                                   |

Borrows from: 1.17 Wichtige Verben, 1.19 Gefühle.

## G20 werden & Konjunktiv II (Future, wishes, polite requests) · A2

| Test  | Teaches                                                                            | Example                                                                                     |
| ----- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| G20.1 | **Wörter**                                                                         | _werden, würde, hätte, wäre, könnte, vielleicht, nächste Woche, später, die Idee, die Lust_ |
| G20.2 | `werden`: become; du wirst, er wird                                                | _Ich werde müde. Er wird Lehrer._                                                           |
| G20.3 | `werden` + infinitive for the future (often the Präsens and a time word is enough) | _Ich werde nächste Woche nach Indien fliegen. Nächste Woche fliege ich nach Indien._        |
| G20.4 | Wishes: `hätte gern`, `würde gern`; `Das wäre toll!`                               | _Ich hätte gern einen Kaffee. Ich würde gern in die Schweiz reisen._                        |
| G20.5 | Polite requests: `Könnten Sie …?`, `Würden Sie …?`                                 | _Könnten Sie mir helfen? Würden Sie bitte das Fenster öffnen?_                              |
| G20.6 | Advice and ideas: `du solltest`, `wir könnten`                                     | _Du solltest zum Arzt gehen. Wir könnten ins Kino gehen._                                   |
| G20.7 | **Sprechen**: make a plan together, and say what you would like                    | _Hast du Lust? Wir könnten ins Kino gehen. — Das wäre toll! Ich hätte gern eine Pizza._     |

Borrows from: 1.14 Reise & Hotel, 1.26 Alltagssprache.

## Grammar coverage

| Grammar point                                                  | Tests                               |
| -------------------------------------------------------------- | ----------------------------------- |
| Alphabet, sounds, spelling aloud                               | G1.2–G1.4                           |
| Present tense: regular verbs, special stems, `sein`, `haben`   | G2, G3                              |
| Vowel-change verbs, `wissen`, separable verbs                  | G8                                  |
| Modal verbs, present and Präteritum                            | G9, G15.3                           |
| Word order: verb second, verb first, verb last                 | G3.7, G4.2, G9.8, G12.9, G17.4, G18 |
| Questions: yes/no, W-words, indirect                           | G4, G12.8, G18.6                    |
| Gender, articles, plural, compound nouns, `-in`                | G2.4, G5                            |
| Negation: `nicht`, `kein`, `doch`                              | G5.7–G5.9                           |
| Nominativ, Akkusativ, Dativ                                    | G5, G6, G10, G11                    |
| Personal pronouns in all three cases; reflexive pronouns       | G2, G6.6, G11.2, G19.2              |
| Possessive articles in all three cases; name + `-s`            | G7, G10.3                           |
| n-nouns                                                        | G11.7                               |
| Prepositions: Akkusativ, Dativ, two-way, time                  | G6.5, G10, G12, G13                 |
| Imperativ                                                      | G14                                 |
| Past: Präteritum of `sein` / `haben` / modals; Perfekt         | G15                                 |
| `dieser`, `jeder`, `welcher`; adjective endings                | G16.2–G16.6                         |
| Comparison                                                     | G16.7–G16.9                         |
| Joining sentences: `und` … `sondern`; `deshalb`, `dann`        | G17                                 |
| Clauses: `weil`, `dass`, `wenn`, `ob`                          | G18                                 |
| Reflexive verbs; verbs with a preposition; `worauf` / `darauf` | G19                                 |
| `werden`; Futur; Konjunktiv II for wishes, requests, advice    | G20                                 |

Left for B1: the Genitiv (_des Mannes_, _wegen_); relative clauses; the
Präteritum of all verbs; the Plusquamperfekt; the passive; `zu` +
infinitive and `um … zu`; `obwohl`, `als`, `bevor`, `trotzdem`; Konjunktiv
II with `wenn` (_Wenn ich Zeit hätte, …_).
