import type { GrammarLesson, GrammarTest, Localized, WordsTest } from "@/data/grammar/types";
import { HOME_LESSON_ID } from "@/data/home";
import { ANIMALS_LESSON_ID } from "@/data/animals";
import { FAMILY_LESSON_ID } from "@/data/family";
import { WORK_SCHOOL_LESSON_ID } from "@/data/work-school";
import { PERSONAL_LESSON_ID } from "@/data/personal";
import { NUMBERS_LESSON_ID } from "@/data/numbers";

// G5 Nomen & Artikel: every noun has a gender (der, die, das), "a" is ein /
// eine, the plural takes die and its own ending, and "not" before a noun is
// kein / keine instead of nicht (docs/planning/ROADMAP.md, section 3). Two
// word tests (things and animals, then family and numbers), each right
// before the grammar tests that use its words. Every sentence and every
// replyTo line has its own clip in public/G5 nouns and articles/audio/.
//
// Nothing in this lesson puts a der word after haben or another verb: that
// is "einen" / "keinen" (Akkusativ), which G6 teaches. Objects here are die
// and das words or plurals, where nothing changes.
//
// The Tamil and Sinhala strings are drafts and need a native speaker's
// review (docs/planning/ROADMAP.md, Open decisions).
export const NOUNS_ARTICLES_LESSON_ID = "G5";

const WHICH_RIGHT: Localized = {
  english: "Which one is right?",
  tamil: "எது சரி?",
  sinhala: "නිවැරදි එක කුමක්ද?",
};

type Article = "der" | "die" | "das";

// The gender of each article, in the words the sort boards and tables use.
const GENDER: Record<Article, Localized> = {
  der: { english: "masculine", tamil: "ஆண்பால்", sinhala: "පුරුෂ ලිංගය" },
  die: { english: "feminine", tamil: "பெண்பால்", sinhala: "ස්ත්‍රී ලිංගය" },
  das: { english: "neuter", tamil: "நடுநிலைப் பால்", sinhala: "නපුංසක ලිංගය" },
};

// "Tisch is a der word: der Tisch."
function articleWhy(noun: string, article: Article): Localized {
  return {
    english: `"${noun}" is a ${article} word: ${article} ${noun}.`,
    tamil: `"${noun}" ஒரு ${article} சொல்: ${article} ${noun}.`,
    sinhala: `"${noun}" ${article} වචනයක්: ${article} ${noun}.`,
  };
}

// "Hund is a der word, so "a" is ein."
function einWhy(noun: string, article: Article): Localized {
  const ein = article === "die" ? "eine" : "ein";
  return {
    english: `"${noun}" is a ${article} word, so "a" is ${ein}.`,
    tamil: `"${noun}" ஒரு ${article} சொல், அதனால் "ஒரு" = ${ein}.`,
    sinhala: `"${noun}" ${article} වචනයක්, ඒ නිසා "එක" = ${ein}.`,
  };
}

// "Hund is a der word, so "not a" is kein."
function keinWhy(noun: string, article: Article): Localized {
  const kein = article === "die" ? "keine" : "kein";
  return {
    english: `"${noun}" is a ${article} word, so "not a" is ${kein}.`,
    tamil: `"${noun}" ஒரு ${article} சொல், அதனால் "ஒரு … அல்ல" = ${kein}.`,
    sinhala: `"${noun}" ${article} වචනයක්, ඒ නිසා "… නෙවෙයි" = ${kein}.`,
  };
}

// "The plural of Buch is Bücher."
function pluralWhy(singular: string, plural: string): Localized {
  return {
    english: `The plural of "${singular}" is "${plural}".`,
    tamil: `"${singular}" என்பதன் பன்மை "${plural}".`,
    sinhala: `"${singular}" හි බහුවචනය "${plural}".`,
  };
}

// G5.1 ------------------------------------------------------------------

const WORDS_1: WordsTest = {
  kind: "words",
  testId: "G5.1",
  title: "Wörter 1",
  meaning: {
    english: "Words: things and animals",
    tamil: "சொற்கள்: பொருட்களும் விலங்குகளும்",
    sinhala: "වචන: දේවල් සහ සතුන්",
  },
  words: [
    { lessonId: HOME_LESSON_ID, wordId: "tisch" },
    { lessonId: HOME_LESSON_ID, wordId: "stuhl" },
    { lessonId: HOME_LESSON_ID, wordId: "lampe" },
    { lessonId: HOME_LESSON_ID, wordId: "tuer" },
    { lessonId: HOME_LESSON_ID, wordId: "bett" },
    { lessonId: HOME_LESSON_ID, wordId: "fenster" },
    { lessonId: WORK_SCHOOL_LESSON_ID, wordId: "buch" },
    { lessonId: ANIMALS_LESSON_ID, wordId: "hund" },
    { lessonId: ANIMALS_LESSON_ID, wordId: "katze" },
    { lessonId: ANIMALS_LESSON_ID, wordId: "pferd" },
    { lessonId: HOME_LESSON_ID, wordId: "gross" },
    { lessonId: HOME_LESSON_ID, wordId: "klein" },
  ],
};

// G5.2 ------------------------------------------------------------------
// The gap is always the article. No sentenceMeaning or listenPick: the
// sentences differ in their noun, so those would test words, not gender.

const DER_DIE_DAS: GrammarTest = {
  kind: "grammar",
  testId: "G5.2",
  title: "der, die, das",
  meaning: {
    english: "the: three genders",
    tamil: "the: மூன்று பால்கள்",
    sinhala: "the: ලිංග තුනක්",
  },
  testTypes: ["rule", "gapPick", "sort", "order", "spot", "meaningBuild", "gapType", "listenBuild"],
  rules: [
    {
      id: "gender",
      title: {
        english: "der, die, das = the",
        tamil: "der, die, das = the",
        sinhala: "der, die, das = the",
      },
      text: {
        english:
          'Every German noun has a gender, and the word for "the" shows it: der (masculine), die (feminine) or das (neuter).',
        tamil:
          'ஒவ்வொரு ஜெர்மன் பெயர்ச்சொல்லுக்கும் ஒரு பால் உண்டு. "the" என்பதற்கான சொல் அதைக் காட்டும்: der (ஆண்பால்), die (பெண்பால்), das (நடுநிலைப் பால்).',
        sinhala:
          'සෑම ජර්මන් නාම පදයකටම ලිංගයක් තියෙනවා. "the" සඳහා වචනය එය පෙන්වනවා: der (පුරුෂ), die (ස්ත්‍රී), das (නපුංසක).',
      },
      examples: [{ id: "der-tisch" }, { id: "die-lampe" }, { id: "das-bett" }],
      table: [
        { left: "der Tisch", right: GENDER.der },
        { left: "die Lampe", right: GENDER.die },
        { left: "das Bett", right: GENDER.das },
      ],
      check: {
        prompt: WHICH_RIGHT,
        options: ["der Tisch", "die Tisch", "das Tisch"],
        answer: "der Tisch",
      },
    },
    {
      id: "learn-with-word",
      title: {
        english: "Learn the article with the noun",
        tamil: "பெயர்ச்சொல்லுடன் article-ஐயும் கற்றுக்கொள்",
        sinhala: "නාම පදය සමඟ article එකත් ඉගෙන ගන්න",
      },
      text: {
        english:
          "The gender belongs to the word, not to the thing: der Stuhl, die Tür and das Fenster are all things. So learn every noun with its der, die or das.",
        tamil:
          "பால் சொல்லுக்குச் சொந்தம், பொருளுக்கு அல்ல: der Stuhl, die Tür, das Fenster மூன்றும் பொருட்கள்தான். அதனால் ஒவ்வொரு பெயர்ச்சொல்லையும் அதன் der, die அல்லது das உடன் கற்றுக்கொள்.",
        sinhala:
          "ලිංගය අයිති වචනයට, දේට නොවේ: der Stuhl, die Tür, das Fenster තුනම දේවල්. ඒ නිසා සෑම නාම පදයක්ම එහි der, die හෝ das සමඟ ඉගෙන ගන්න.",
      },
      examples: [{ id: "der-stuhl" }, { id: "die-tuer" }, { id: "das-fenster" }],
      check: {
        prompt: WHICH_RIGHT,
        options: ["das Fenster", "der Fenster"],
        answer: "das Fenster",
      },
    },
  ],
  sentences: [
    {
      id: "der-tisch",
      german: "Der Tisch ist groß.",
      meaning: { english: "The table is big.", tamil: "மேசை பெரியது.", sinhala: "මේසය ලොකුයි." },
      rule: "gender",
      focus: 0,
      distractors: ["Die", "Das"],
      why: articleWhy("Tisch", "der"),
    },
    {
      id: "der-stuhl",
      german: "Der Stuhl ist neu.",
      meaning: {
        english: "The chair is new.",
        tamil: "நாற்காலி புதியது.",
        sinhala: "පුටුව අලුත්.",
      },
      rule: "learn-with-word",
      focus: 0,
      distractors: ["Die", "Das"],
      why: articleWhy("Stuhl", "der"),
    },
    {
      id: "der-hund",
      german: "Der Hund ist klein.",
      meaning: { english: "The dog is small.", tamil: "நாய் சிறியது.", sinhala: "බල්ලා පොඩියි." },
      rule: "gender",
      focus: 0,
      distractors: ["Die", "Das"],
      why: articleWhy("Hund", "der"),
    },
    {
      id: "die-lampe",
      german: "Die Lampe ist neu.",
      meaning: {
        english: "The lamp is new.",
        tamil: "விளக்கு புதியது.",
        sinhala: "ලාම්පුව අලුත්.",
      },
      rule: "gender",
      focus: 0,
      distractors: ["Der", "Das"],
      why: articleWhy("Lampe", "die"),
    },
    {
      id: "die-tuer",
      german: "Die Tür ist groß.",
      meaning: { english: "The door is big.", tamil: "கதவு பெரியது.", sinhala: "දොර ලොකුයි." },
      rule: "learn-with-word",
      focus: 0,
      distractors: ["Der", "Das"],
      why: articleWhy("Tür", "die"),
    },
    {
      id: "die-katze",
      german: "Die Katze ist müde.",
      meaning: {
        english: "The cat is tired.",
        tamil: "பூனை களைப்பாக இருக்கிறது.",
        sinhala: "පූසා මහන්සියි.",
      },
      rule: "gender",
      focus: 0,
      distractors: ["Der", "Das"],
      why: articleWhy("Katze", "die"),
    },
    {
      id: "das-bett",
      german: "Das Bett ist groß.",
      meaning: { english: "The bed is big.", tamil: "கட்டில் பெரியது.", sinhala: "ඇඳ ලොකුයි." },
      rule: "gender",
      focus: 0,
      distractors: ["Der", "Die"],
      why: articleWhy("Bett", "das"),
    },
    {
      id: "das-fenster",
      german: "Das Fenster ist klein.",
      meaning: {
        english: "The window is small.",
        tamil: "ஜன்னல் சிறியது.",
        sinhala: "ජනේලය පොඩියි.",
      },
      rule: "learn-with-word",
      focus: 0,
      distractors: ["Der", "Die"],
      why: articleWhy("Fenster", "das"),
    },
    {
      id: "das-buch",
      german: "Das Buch ist neu.",
      meaning: { english: "The book is new.", tamil: "புத்தகம் புதியது.", sinhala: "පොත අලුත්." },
      rule: "gender",
      focus: 0,
      distractors: ["Der", "Die"],
      why: articleWhy("Buch", "das"),
    },
    {
      id: "das-pferd",
      german: "Das Pferd ist müde.",
      meaning: {
        english: "The horse is tired.",
        tamil: "குதிரை களைப்பாக இருக்கிறது.",
        sinhala: "අශ්වයා මහන්සියි.",
      },
      rule: "gender",
      focus: 0,
      distractors: ["Der", "Die"],
      why: articleWhy("Pferd", "das"),
    },
  ],
  sort: {
    groups: (["der", "die", "das"] as const).map((article) => ({
      id: article,
      label: article,
      meaning: GENDER[article],
    })),
    items: [
      { text: "Tisch", group: "der" },
      { text: "Stuhl", group: "der" },
      { text: "Hund", group: "der" },
      { text: "Lampe", group: "die" },
      { text: "Tür", group: "die" },
      { text: "Katze", group: "die" },
      { text: "Bett", group: "das" },
      { text: "Buch", group: "das" },
      { text: "Pferd", group: "das" },
    ],
  },
};

// G5.3 ------------------------------------------------------------------
// The gap is the article, and the wrong options include the "the" word:
// "Hier ist der Hund." is good German, but the meaning under the sentence
// says "a dog". "Was ist das?" (G4.3's was) is answered in `reply`.

const WHAT_IS_THIS: Localized = {
  english: "What is this?",
  tamil: "இது என்ன?",
  sinhala: "මේ මොකක්ද?",
};

const EIN_EINE: GrammarTest = {
  kind: "grammar",
  testId: "G5.3",
  title: "ein, eine",
  meaning: { english: "a, an", tamil: "ஒரு", sinhala: "එක (a)" },
  testTypes: [
    "rule",
    "gapPick",
    "sort",
    "order",
    "spot",
    "meaningBuild",
    "gapType",
    "listenBuild",
    "reply",
  ],
  rules: [
    {
      id: "ein-eine",
      title: { english: "ein, eine = a", tamil: "ein, eine = ஒரு", sinhala: "ein, eine = a" },
      text: {
        english: 'For "a", der and das words take ein, die words take eine.',
        tamil: '"ஒரு" என்பதற்கு der, das சொற்களுக்கு ein, die சொற்களுக்கு eine.',
        sinhala: '"a" සඳහා der සහ das වචනවලට ein, die වචනවලට eine.',
      },
      examples: [{ id: "hier-hund" }, { id: "hier-katze" }, { id: "hier-bett" }],
      table: [
        { left: "der Hund", right: "ein Hund" },
        { left: "die Katze", right: "eine Katze" },
        { left: "das Pferd", right: "ein Pferd" },
      ],
      check: {
        prompt: {
          english: 'Which one is "a cat"?',
          tamil: '"ஒரு பூனை" எது?',
          sinhala: '"a cat" (පූසෙක්) කුමක්ද?',
        },
        options: ["eine Katze", "ein Katze"],
        answer: "eine Katze",
      },
    },
    {
      id: "das-ist",
      title: {
        english: "Das ist … = This is …",
        tamil: "Das ist … = இது …",
        sinhala: "Das ist … = මේ …",
      },
      text: {
        english:
          'Das ist … means "this is …" or "that is …". This das points at something; it is not the article: Das ist eine Lampe.',
        tamil:
          'Das ist … என்றால் "இது …" அல்லது "அது …". இந்த das ஒன்றைச் சுட்டிக்காட்டுகிறது; இது article அல்ல: Das ist eine Lampe.',
        sinhala:
          'Das ist … කියන්නේ "මේ …" හෝ "ඒ …". මෙහි das යමක් පෙන්වනවා; එය article එක නොවේ: Das ist eine Lampe.',
      },
      examples: [{ id: "das-lampe" }, { id: "das-buch" }],
      check: {
        prompt: {
          english: 'Which one is "This is a book."?',
          tamil: '"இது ஒரு புத்தகம்." எது?',
          sinhala: '"මේ පොතක්." කුමක්ද?',
        },
        options: ["Das ist ein Buch.", "Das ist das Buch."],
        answer: "Das ist ein Buch.",
      },
    },
    {
      id: "ein-then-der",
      title: {
        english: "First ein, then der",
        tamil: "முதலில் ein, பிறகு der",
        sinhala: "මුලින් ein, පස්සේ der",
      },
      text: {
        english:
          "Use ein / eine when you first name something. After that we know which one, so it is der, die or das: Das ist ein Hund. Der Hund ist klein.",
        tamil:
          "ஒன்றை முதல் முறை சொல்லும்போது ein / eine. அதன் பிறகு எது என்று தெரியும், அதனால் der, die அல்லது das: Das ist ein Hund. Der Hund ist klein.",
        sinhala:
          "යමක් මුල්වරට කියද්දී ein / eine. ඊට පස්සේ කුමක්ද කියලා දන්නවා, ඒ නිසා der, die හෝ das: Das ist ein Hund. Der Hund ist klein.",
      },
      examples: [
        { id: "das-hund", highlight: 2 },
        { id: "der-hund-klein", highlight: 0 },
      ],
      check: {
        prompt: {
          english: "Das ist eine Katze. … Katze ist groß. What goes in the gap?",
          tamil: "Das ist eine Katze. … Katze ist groß. இடைவெளியில் என்ன வரும்?",
          sinhala: "Das ist eine Katze. … Katze ist groß. හිස්තැනට එන්නේ මොකක්ද?",
        },
        options: ["Die", "Eine"],
        answer: "Die",
      },
    },
  ],
  sentences: [
    {
      id: "hier-hund",
      german: "Hier ist ein Hund.",
      meaning: {
        english: "Here is a dog.",
        tamil: "இங்கே ஒரு நாய் இருக்கிறது.",
        sinhala: "මෙතන බල්ලෙක් ඉන්නවා.",
      },
      rule: "ein-eine",
      focus: 2,
      distractors: ["eine", "der"],
      why: einWhy("Hund", "der"),
    },
    {
      id: "hier-katze",
      german: "Hier ist eine Katze.",
      meaning: {
        english: "Here is a cat.",
        tamil: "இங்கே ஒரு பூனை இருக்கிறது.",
        sinhala: "මෙතන පූසෙක් ඉන්නවා.",
      },
      rule: "ein-eine",
      focus: 2,
      distractors: ["ein", "die"],
      why: einWhy("Katze", "die"),
    },
    {
      id: "hier-bett",
      german: "Hier ist ein Bett.",
      meaning: {
        english: "Here is a bed.",
        tamil: "இங்கே ஒரு கட்டில் இருக்கிறது.",
        sinhala: "මෙතන ඇඳක් තියෙනවා.",
      },
      rule: "ein-eine",
      focus: 2,
      distractors: ["eine", "das"],
      why: einWhy("Bett", "das"),
    },
    {
      id: "das-lampe",
      german: "Das ist eine Lampe.",
      meaning: {
        english: "This is a lamp.",
        tamil: "இது ஒரு விளக்கு.",
        sinhala: "මේ ලාම්පුවක්.",
      },
      rule: "das-ist",
      focus: 2,
      distractors: ["ein", "die"],
      why: einWhy("Lampe", "die"),
      replyTo: {
        german: "Was ist das?",
        meaning: WHAT_IS_THIS,
        decoys: ["Das ist ein Lampe.", "Ich heiße Anna."],
      },
    },
    {
      id: "das-buch",
      german: "Das ist ein Buch.",
      meaning: {
        english: "This is a book.",
        tamil: "இது ஒரு புத்தகம்.",
        sinhala: "මේ පොතක්.",
      },
      rule: "das-ist",
      focus: 2,
      distractors: ["eine", "das"],
      why: einWhy("Buch", "das"),
      replyTo: {
        german: "Was ist das?",
        meaning: WHAT_IS_THIS,
        decoys: ["Das ist eine Buch.", "Ich bin müde."],
      },
    },
    {
      id: "das-stuhl",
      german: "Das ist ein Stuhl.",
      meaning: {
        english: "This is a chair.",
        tamil: "இது ஒரு நாற்காலி.",
        sinhala: "මේ පුටුවක්.",
      },
      rule: "das-ist",
      focus: 2,
      distractors: ["eine", "der"],
      why: einWhy("Stuhl", "der"),
      replyTo: {
        german: "Was ist das?",
        meaning: WHAT_IS_THIS,
        decoys: ["Das ist eine Stuhl.", "Ich komme morgen."],
      },
    },
    {
      id: "das-katze",
      german: "Das ist eine Katze.",
      meaning: {
        english: "This is a cat.",
        tamil: "இது ஒரு பூனை.",
        sinhala: "මේ පූසෙක්.",
      },
      rule: "das-ist",
      focus: 2,
      distractors: ["ein", "die"],
      why: einWhy("Katze", "die"),
      replyTo: {
        german: "Was ist das?",
        meaning: WHAT_IS_THIS,
        decoys: ["Das ist ein Katze.", "Ich trinke Wasser."],
      },
    },
    {
      id: "das-hund",
      german: "Das ist ein Hund.",
      meaning: {
        english: "This is a dog.",
        tamil: "இது ஒரு நாய்.",
        sinhala: "මේ බල්ලෙක්.",
      },
      rule: "ein-then-der",
      focus: 2,
      distractors: ["eine", "der"],
      why: einWhy("Hund", "der"),
    },
    {
      id: "der-hund-klein",
      german: "Der Hund ist klein.",
      meaning: { english: "The dog is small.", tamil: "நாய் சிறியது.", sinhala: "බල්ලා පොඩියි." },
      rule: "ein-then-der",
      focus: 0,
      distractors: ["Ein", "Die"],
      why: {
        english: 'We know which dog now, so "the" is der: der Hund.',
        tamil: 'எந்த நாய் என்று இப்போது தெரியும், அதனால் "the" = der: der Hund.',
        sinhala: 'දැන් කුමන බල්ලාද කියලා දන්නවා, ඒ නිසා "the" = der: der Hund.',
      },
    },
    {
      id: "die-katze-gross",
      german: "Die Katze ist groß.",
      meaning: { english: "The cat is big.", tamil: "பூனை பெரியது.", sinhala: "පූසා ලොකුයි." },
      rule: "ein-then-der",
      focus: 0,
      distractors: ["Eine", "Der"],
      why: {
        english: 'We know which cat now, so "the" is die: die Katze.',
        tamil: 'எந்தப் பூனை என்று இப்போது தெரியும், அதனால் "the" = die: die Katze.',
        sinhala: 'දැන් කුමන පූසාද කියලා දන්නවා, ඒ නිසා "the" = die: die Katze.',
      },
    },
  ],
  sort: {
    groups: [
      {
        id: "ein",
        label: "ein",
        meaning: {
          english: "a, for der and das words",
          tamil: "der, das சொற்களுக்கு",
          sinhala: "der සහ das වචනවලට",
        },
      },
      {
        id: "eine",
        label: "eine",
        meaning: { english: "a, for die words", tamil: "die சொற்களுக்கு", sinhala: "die වචනවලට" },
      },
    ],
    items: [
      { text: "Hund", group: "ein" },
      { text: "Stuhl", group: "ein" },
      { text: "Bett", group: "ein" },
      { text: "Fenster", group: "ein" },
      { text: "Katze", group: "eine" },
      { text: "Lampe", group: "eine" },
      { text: "Tür", group: "eine" },
      { text: "Frau", group: "eine" },
    ],
  },
};

// G5.4 ------------------------------------------------------------------
// The family words, each with its plural on the training card (the
// Wortschatz entries carry `plural`), and zwei / drei for G5.5.

const WORDS_2: WordsTest = {
  kind: "words",
  testId: "G5.4",
  title: "Wörter 2",
  meaning: {
    english: "Words: family and numbers",
    tamil: "சொற்கள்: குடும்பமும் எண்களும்",
    sinhala: "වචන: පවුල සහ ඉලක්කම්",
  },
  words: [
    { lessonId: FAMILY_LESSON_ID, wordId: "bruder" },
    { lessonId: FAMILY_LESSON_ID, wordId: "schwester" },
    { lessonId: FAMILY_LESSON_ID, wordId: "sohn" },
    { lessonId: FAMILY_LESSON_ID, wordId: "tochter" },
    { lessonId: FAMILY_LESSON_ID, wordId: "eltern" },
    { lessonId: FAMILY_LESSON_ID, wordId: "grossvater" },
    { lessonId: FAMILY_LESSON_ID, wordId: "grossmutter" },
    { lessonId: PERSONAL_LESSON_ID, wordId: "kind" },
    { lessonId: NUMBERS_LESSON_ID, wordId: "zwei" },
    { lessonId: NUMBERS_LESSON_ID, wordId: "drei" },
  ],
};

// G5.5 ------------------------------------------------------------------
// Singular and plural sentences side by side, so sentenceMeaning and
// listenPick turn on "dog" versus "dogs", and transform switches between
// them. Gaps are the article (die for every plural) or the plural noun.

const MORE_THAN_ONE: Localized = {
  english: "Say it about more than one",
  tamil: "ஒன்றுக்கு மேற்பட்டவை பற்றிச் சொல்",
  sinhala: "එකකට වඩා ගැන කියන්න",
};
const ABOUT_ONE: Localized = {
  english: "Say it about one",
  tamil: "ஒன்றைப் பற்றிச் சொல்",
  sinhala: "එකක් ගැන කියන්න",
};
const PLURAL_DIE: Localized = {
  english: 'With more than one, "the" is die.',
  tamil: 'ஒன்றுக்கு மேற்பட்டவை என்றால் "the" = die.',
  sinhala: 'එකකට වඩා නම් "the" = die.',
};

const PLURAL: GrammarTest = {
  kind: "grammar",
  testId: "G5.5",
  title: "Plural",
  meaning: {
    english: "more than one",
    tamil: "ஒன்றுக்கு மேற்பட்டவை",
    sinhala: "එකකට වඩා",
  },
  testTypes: [
    "rule",
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
  ],
  rules: [
    {
      id: "plural-die",
      title: {
        english: "More than one: die",
        tamil: "ஒன்றுக்கு மேற்பட்டவை: die",
        sinhala: "එකකට වඩා: die",
      },
      text: {
        english:
          'With more than one, "the" is die, for der, die and das words alike: der Hund → die Hunde.',
        tamil:
          'ஒன்றுக்கு மேற்பட்டவை என்றால், der, die, das எல்லாச் சொற்களுக்கும் "the" = die: der Hund → die Hunde.',
        sinhala: 'එකකට වඩා නම්, der, die, das ඕනෑම වචනයකට "the" = die: der Hund → die Hunde.',
      },
      examples: [{ id: "der-hund", highlight: 0 }, { id: "die-hunde" }, { id: "die-kinder" }],
      table: [
        { left: "der Hund", right: "die Hunde" },
        { left: "die Katze", right: "die Katzen" },
        { left: "das Kind", right: "die Kinder" },
      ],
      check: {
        prompt: {
          english: 'Which one is "the children"?',
          tamil: '"குழந்தைகள்" (the children) எது?',
          sinhala: '"ළමයි" (the children) කුමක්ද?',
        },
        options: ["die Kinder", "das Kinder"],
        answer: "die Kinder",
      },
    },
    {
      id: "endings",
      title: {
        english: "Every noun has its own plural",
        tamil: "ஒவ்வொரு பெயர்ச்சொல்லுக்கும் தனிப் பன்மை",
        sinhala: "සෑම නාම පදයකටම තමන්ගේම බහුවචනයක්",
      },
      text: {
        english:
          "The plural adds -e, -n, -en or -er, often with ä, ö, ü, and some nouns don't change. Learn the plural with the word.",
        tamil:
          "பன்மையில் -e, -n, -en அல்லது -er சேரும், பெரும்பாலும் ä, ö, ü உடன்; சில சொற்கள் மாறுவதில்லை. பன்மையைச் சொல்லுடன் சேர்த்துக் கற்றுக்கொள்.",
        sinhala:
          "බහුවචනයට -e, -n, -en හෝ -er එකතු වෙනවා, බොහෝවිට ä, ö, ü සමඟ; සමහර වචන වෙනස් වෙන්නේ නැහැ. බහුවචනය වචනය සමඟම ඉගෙන ගන්න.",
      },
      examples: [{ id: "die-buecher" }, { id: "die-lampen" }, { id: "die-fenster" }],
      table: [
        { left: "das Buch", right: "die Bücher" },
        { left: "die Lampe", right: "die Lampen" },
        { left: "der Bruder", right: "die Brüder" },
        { left: "das Fenster", right: "die Fenster" },
      ],
      check: {
        prompt: {
          english: 'Which one is "the books"?',
          tamil: '"புத்தகங்கள்" (the books) எது?',
          sinhala: '"පොත්" (the books) කුමක්ද?',
        },
        options: ["die Bücher", "die Buchs"],
        answer: "die Bücher",
      },
    },
    {
      id: "numbers",
      title: {
        english: "zwei, drei … + plural",
        tamil: "zwei, drei … + பன்மை",
        sinhala: "zwei, drei … + බහුවචනය",
      },
      text: {
        english: "After a number, use the plural with no der, die or das: Ich habe zwei Brüder.",
        tamil: "எண்ணுக்குப் பின் der, die, das இல்லாமல் பன்மை: Ich habe zwei Brüder.",
        sinhala: "ඉලක්කමකට පස්සේ der, die, das නැතුව බහුවචනය: Ich habe zwei Brüder.",
      },
      examples: [{ id: "zwei-brueder" }, { id: "drei-kinder" }],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Wir haben drei Kinder.", "Wir haben drei Kind."],
        answer: "Wir haben drei Kinder.",
      },
    },
  ],
  sentences: [
    {
      id: "der-hund",
      german: "Der Hund ist klein.",
      meaning: { english: "The dog is small.", tamil: "நாய் சிறியது.", sinhala: "බල්ලා පොඩියි." },
      rule: "plural-die",
      why: articleWhy("Hund", "der"),
      transformTo: { id: "die-hunde", prompt: MORE_THAN_ONE },
    },
    {
      id: "die-hunde",
      german: "Die Hunde sind klein.",
      meaning: {
        english: "The dogs are small.",
        tamil: "நாய்கள் சிறியவை.",
        sinhala: "බල්ලෝ පොඩියි.",
      },
      rule: "plural-die",
      focus: 0,
      distractors: ["Der", "Das"],
      why: PLURAL_DIE,
      transformTo: { id: "der-hund", prompt: ABOUT_ONE },
    },
    {
      id: "das-kind",
      german: "Das Kind ist müde.",
      meaning: {
        english: "The child is tired.",
        tamil: "குழந்தை களைப்பாக இருக்கிறது.",
        sinhala: "ළමයා මහන්සියි.",
      },
      rule: "plural-die",
      why: articleWhy("Kind", "das"),
      transformTo: { id: "die-kinder", prompt: MORE_THAN_ONE },
    },
    {
      id: "die-kinder",
      german: "Die Kinder sind müde.",
      meaning: {
        english: "The children are tired.",
        tamil: "குழந்தைகள் களைப்பாக இருக்கிறார்கள்.",
        sinhala: "ළමයි මහන්සියි.",
      },
      rule: "plural-die",
      focus: 0,
      distractors: ["Das", "Der"],
      why: PLURAL_DIE,
      transformTo: { id: "das-kind", prompt: ABOUT_ONE },
    },
    {
      id: "die-buecher",
      german: "Die Bücher sind neu.",
      meaning: {
        english: "The books are new.",
        tamil: "புத்தகங்கள் புதியவை.",
        sinhala: "පොත් අලුත්.",
      },
      rule: "endings",
      focus: 1,
      distractors: ["Buch", "Bucher"],
      why: pluralWhy("Buch", "Bücher"),
    },
    {
      id: "die-lampen",
      german: "Die Lampen sind klein.",
      meaning: {
        english: "The lamps are small.",
        tamil: "விளக்குகள் சிறியவை.",
        sinhala: "ලාම්පු පොඩියි.",
      },
      rule: "endings",
      focus: 1,
      distractors: ["Lampe", "Lampes"],
      why: pluralWhy("Lampe", "Lampen"),
    },
    {
      id: "die-fenster",
      german: "Die Fenster sind groß.",
      meaning: {
        english: "The windows are big.",
        tamil: "ஜன்னல்கள் பெரியவை.",
        sinhala: "ජනේල ලොකුයි.",
      },
      rule: "endings",
      focus: 1,
      distractors: ["Fensters", "Fenstern"],
      why: pluralWhy("Fenster", "Fenster"),
    },
    {
      id: "zwei-brueder",
      german: "Ich habe zwei Brüder.",
      meaning: {
        english: "I have two brothers.",
        tamil: "எனக்கு இரண்டு சகோதரர்கள் இருக்கிறார்கள்.",
        sinhala: "මට සහෝදරයෝ දෙන්නෙක් ඉන්නවා.",
      },
      rule: "numbers",
      focus: 3,
      distractors: ["Bruder", "Brudern"],
      why: pluralWhy("Bruder", "Brüder"),
    },
    {
      id: "zwei-schwestern",
      german: "Anna hat zwei Schwestern.",
      nounFirst: true,
      meaning: {
        english: "Anna has two sisters.",
        tamil: "அன்னாவுக்கு இரண்டு சகோதரிகள் இருக்கிறார்கள்.",
        sinhala: "ඇනාට සහෝදරියෝ දෙන්නෙක් ඉන්නවා.",
      },
      rule: "numbers",
      focus: 3,
      distractors: ["Schwester", "Schwesteren"],
      why: pluralWhy("Schwester", "Schwestern"),
    },
    {
      id: "drei-kinder",
      german: "Wir haben drei Kinder.",
      meaning: {
        english: "We have three children.",
        tamil: "எங்களுக்கு மூன்று குழந்தைகள் இருக்கிறார்கள்.",
        sinhala: "අපිට ළමයි තුන්දෙනෙක් ඉන්නවා.",
      },
      rule: "numbers",
      focus: 3,
      distractors: ["Kind", "Kinden"],
      why: pluralWhy("Kind", "Kinder"),
    },
  ],
  pairs: [
    { left: "der Bruder", right: "die Brüder" },
    { left: "die Schwester", right: "die Schwestern" },
    { left: "das Kind", right: "die Kinder" },
    { left: "das Buch", right: "die Bücher" },
    { left: "der Sohn", right: "die Söhne" },
  ],
  pairsPrompt: {
    english: "Match each word to its plural.",
    tamil: "ஒவ்வொரு சொல்லையும் அதன் பன்மையுடன் இணைக்கவும்.",
    sinhala: "සෑම වචනයක්ම එහි බහුවචනයට ගළපන්න.",
  },
};

// G5.6 ------------------------------------------------------------------

const MAKE_NEGATIVE: Localized = {
  english: 'Say "not a"',
  tamil: '"… அல்ல" என்று சொல்',
  sinhala: '"… නෙවෙයි" කියලා කියන්න',
};
const MAKE_POSITIVE: Localized = {
  english: 'Say "a"',
  tamil: '"ஒரு …" என்று சொல்',
  sinhala: '"a" (එකක්) කියලා කියන්න',
};
const PLURAL_KEINE: Localized = {
  english: 'With more than one, "no" is keine.',
  tamil: 'ஒன்றுக்கு மேற்பட்டவை என்றால் "இல்லை" = keine.',
  sinhala: 'එකකට වඩා නම් "නැහැ" = keine.',
};

const KEIN_KEINE: GrammarTest = {
  kind: "grammar",
  testId: "G5.6",
  title: "kein, keine",
  meaning: { english: "not a, no", tamil: "ஒரு … அல்ல, இல்லை", sinhala: "… නෙවෙයි, නැහැ" },
  testTypes: [
    "rule",
    "gapPick",
    "sentenceMeaning",
    "listenPick",
    "sort",
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
      id: "kein",
      title: {
        english: "kein, keine = not a",
        tamil: "kein, keine = ஒரு … அல்ல",
        sinhala: "kein, keine = … නෙවෙයි",
      },
      text: {
        english: 'To say "not a", put a k in front of ein: ein → kein, eine → keine.',
        tamil: '"ஒரு … அல்ல" என்று சொல்ல ein-க்கு முன் k சேர்: ein → kein, eine → keine.',
        sinhala: '"… නෙවෙයි" කියන්න ein ට ඉස්සරහින් k එකතු කරන්න: ein → kein, eine → keine.',
      },
      examples: [
        { id: "das-ein-hund", highlight: 2 },
        { id: "das-kein-hund" },
        { id: "das-keine-katze" },
      ],
      table: [
        { left: "ein Hund", right: "kein Hund" },
        { left: "eine Katze", right: "keine Katze" },
        { left: "ein Buch", right: "kein Buch" },
      ],
      check: {
        prompt: {
          english: 'Which one is "This is not a book."?',
          tamil: '"இது புத்தகம் அல்ல." எது?',
          sinhala: '"මේ පොතක් නෙවෙයි." කුමක්ද?',
        },
        options: ["Das ist kein Buch.", "Das ist keine Buch.", "Das ist ein Buch."],
        answer: "Das ist kein Buch.",
      },
    },
    {
      id: "keine-plural",
      title: {
        english: "More than one: keine",
        tamil: "ஒன்றுக்கு மேற்பட்டவை: keine",
        sinhala: "එකකට වඩා: keine",
      },
      text: {
        english:
          'With more than one, use keine, and "Das ist" becomes "Das sind" (these are): Das sind keine Hunde.',
        tamil:
          'ஒன்றுக்கு மேற்பட்டவை என்றால் keine, "Das ist" என்பது "Das sind" (இவை) ஆகும்: Das sind keine Hunde.',
        sinhala: 'එකකට වඩා නම් keine, "Das ist" වෙනුවට "Das sind" (මේවා): Das sind keine Hunde.',
      },
      examples: [{ id: "keine-hunde" }, { id: "keine-kinder" }],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Das sind keine Hunde.", "Das sind kein Hunde."],
        answer: "Das sind keine Hunde.",
      },
    },
  ],
  sentences: [
    {
      id: "das-ein-hund",
      german: "Das ist ein Hund.",
      meaning: { english: "This is a dog.", tamil: "இது ஒரு நாய்.", sinhala: "මේ බල්ලෙක්." },
      rule: "kein",
      why: einWhy("Hund", "der"),
      transformTo: { id: "das-kein-hund", prompt: MAKE_NEGATIVE },
    },
    {
      id: "das-kein-hund",
      german: "Das ist kein Hund.",
      meaning: {
        english: "This is not a dog.",
        tamil: "இது நாய் அல்ல.",
        sinhala: "මේ බල්ලෙක් නෙවෙයි.",
      },
      rule: "kein",
      focus: 2,
      distractors: ["keine", "ein"],
      why: keinWhy("Hund", "der"),
      transformTo: { id: "das-ein-hund", prompt: MAKE_POSITIVE },
    },
    {
      id: "das-eine-katze",
      german: "Das ist eine Katze.",
      meaning: { english: "This is a cat.", tamil: "இது ஒரு பூனை.", sinhala: "මේ පූසෙක්." },
      rule: "kein",
      why: einWhy("Katze", "die"),
      transformTo: { id: "das-keine-katze", prompt: MAKE_NEGATIVE },
    },
    {
      id: "das-keine-katze",
      german: "Das ist keine Katze.",
      meaning: {
        english: "This is not a cat.",
        tamil: "இது பூனை அல்ல.",
        sinhala: "මේ පූසෙක් නෙවෙයි.",
      },
      rule: "kein",
      focus: 2,
      distractors: ["kein", "eine"],
      why: keinWhy("Katze", "die"),
      transformTo: { id: "das-eine-katze", prompt: MAKE_POSITIVE },
    },
    {
      id: "das-kein-buch",
      german: "Das ist kein Buch.",
      meaning: {
        english: "This is not a book.",
        tamil: "இது புத்தகம் அல்ல.",
        sinhala: "මේ පොතක් නෙවෙයි.",
      },
      rule: "kein",
      focus: 2,
      distractors: ["keine", "ein"],
      why: keinWhy("Buch", "das"),
    },
    {
      id: "nein-keine-lampe",
      german: "Nein, das ist keine Lampe.",
      meaning: {
        english: "No, this is not a lamp.",
        tamil: "இல்லை, இது விளக்கு அல்ல.",
        sinhala: "නැහැ, මේ ලාම්පුවක් නෙවෙයි.",
      },
      rule: "kein",
      focus: 3,
      distractors: ["kein", "eine"],
      why: keinWhy("Lampe", "die"),
      replyTo: {
        german: "Ist das eine Lampe?",
        meaning: {
          english: "Is this a lamp?",
          tamil: "இது ஒரு விளக்கா?",
          sinhala: "මේ ලාම්පුවක්ද?",
        },
        decoys: ["Nein, das ist kein Lampe.", "Ja, das ist keine Lampe."],
      },
    },
    {
      id: "nein-kein-pferd",
      german: "Nein, das ist kein Pferd.",
      meaning: {
        english: "No, this is not a horse.",
        tamil: "இல்லை, இது குதிரை அல்ல.",
        sinhala: "නැහැ, මේ අශ්වයෙක් නෙවෙයි.",
      },
      rule: "kein",
      focus: 3,
      distractors: ["keine", "ein"],
      why: keinWhy("Pferd", "das"),
      replyTo: {
        german: "Ist das ein Pferd?",
        meaning: {
          english: "Is this a horse?",
          tamil: "இது ஒரு குதிரையா?",
          sinhala: "මේ අශ්වයෙක්ද?",
        },
        decoys: ["Nein, das ist keine Pferd.", "Ja, das ist kein Pferd."],
      },
    },
    {
      id: "keine-hunde",
      german: "Das sind keine Hunde.",
      meaning: {
        english: "These are not dogs.",
        tamil: "இவை நாய்கள் அல்ல.",
        sinhala: "මේ බල්ලෝ නෙවෙයි.",
      },
      rule: "keine-plural",
      focus: 2,
      distractors: ["kein", "eine"],
      why: PLURAL_KEINE,
    },
    {
      id: "keine-buecher",
      german: "Das sind keine Bücher.",
      meaning: {
        english: "These are not books.",
        tamil: "இவை புத்தகங்கள் அல்ல.",
        sinhala: "මේ පොත් නෙවෙයි.",
      },
      rule: "keine-plural",
      focus: 2,
      distractors: ["kein", "ein"],
      why: PLURAL_KEINE,
    },
    {
      id: "keine-kinder",
      german: "Hier sind keine Kinder.",
      meaning: {
        english: "There are no children here.",
        tamil: "இங்கே குழந்தைகள் இல்லை.",
        sinhala: "මෙතන ළමයි නැහැ.",
      },
      rule: "keine-plural",
      focus: 2,
      distractors: ["kein", "eine"],
      why: PLURAL_KEINE,
    },
  ],
  sort: {
    groups: [
      {
        id: "kein",
        label: "kein",
        meaning: {
          english: "for der and das words",
          tamil: "der, das சொற்களுக்கு",
          sinhala: "der සහ das වචනවලට",
        },
      },
      {
        id: "keine",
        label: "keine",
        meaning: {
          english: "for die words and more than one",
          tamil: "die சொற்களுக்கும் பன்மைக்கும்",
          sinhala: "die වචනවලට සහ බහුවචනයට",
        },
      },
    ],
    items: [
      { text: "Hund", group: "kein" },
      { text: "Buch", group: "kein" },
      { text: "Pferd", group: "kein" },
      { text: "Auto", group: "kein" },
      { text: "Katze", group: "keine" },
      { text: "Lampe", group: "keine" },
      { text: "Zeit", group: "keine" },
      { text: "Kinder", group: "keine" },
    ],
  },
};

// G5.7 ------------------------------------------------------------------
// Every gap offers nicht, kein and keine, and exactly one fits. No
// sentenceMeaning or listenPick: "I am not tired" and "I have no time"
// are told apart by their words, not by nicht or kein.

const NICHT_WHY: Localized = {
  english: 'Not with a verb, a describing word or a place: use "nicht".',
  tamil: 'வினைச்சொல், விவரிக்கும் சொல் அல்லது இடத்துடன் "இல்லை": "nicht".',
  sinhala: 'ක්‍රියාපදයක්, විස්තර කරන වචනයක් හෝ ස්ථානයක් සමඟ "නැහැ": "nicht".',
};

function nounKeinWhy(noun: string, article: Article | "plural"): Localized {
  const kein = article === "der" || article === "das" ? "kein" : "keine";
  const what: Localized =
    article === "plural"
      ? { english: "more than one", tamil: "பன்மை", sinhala: "බහුවචනය" }
      : { english: `a ${article} word`, tamil: `${article} சொல்`, sinhala: `${article} වචනයක්` };
  return {
    english: `"${noun}" is a noun (${what.english}), so "not" is ${kein}.`,
    tamil: `"${noun}" ஒரு பெயர்ச்சொல் (${what.tamil}), அதனால் "இல்லை" = ${kein}.`,
    sinhala: `"${noun}" නාම පදයක් (${what.sinhala}), ඒ නිසා "නැහැ" = ${kein}.`,
  };
}

const NICHT_KEIN: GrammarTest = {
  kind: "grammar",
  testId: "G5.7",
  title: "nicht oder kein",
  meaning: { english: "not or no", tamil: "nicht அல்லது kein", sinhala: "nicht ද kein ද" },
  testTypes: [
    "rule",
    "gapPick",
    "sort",
    "order",
    "spot",
    "meaningBuild",
    "gapType",
    "listenBuild",
    "reply",
  ],
  rules: [
    {
      id: "nicht",
      title: { english: "nicht = not", tamil: "nicht = இல்லை", sinhala: "nicht = නැහැ" },
      text: {
        english:
          "nicht says no to a verb, to a describing word like müde, or to a place: Ich komme nicht. Ich wohne nicht in Wien.",
        tamil:
          "nicht ஒரு வினைச்சொல், müde போன்ற விவரிக்கும் சொல் அல்லது ஒரு இடத்தை மறுக்கும்: Ich komme nicht. Ich wohne nicht in Wien.",
        sinhala:
          "nicht ක්‍රියාපදයක්, müde වගේ විස්තර කරන වචනයක් හෝ ස්ථානයක් නිෂේධ කරනවා: Ich komme nicht. Ich wohne nicht in Wien.",
      },
      examples: [{ id: "komme-nicht" }, { id: "katze-nicht-klein" }, { id: "wohne-nicht" }],
      check: {
        prompt: {
          english: 'Which one is "I am not coming."?',
          tamil: '"நான் வரவில்லை." எது?',
          sinhala: '"මම එන්නේ නැහැ." කුමක්ද?',
        },
        options: ["Ich komme nicht.", "Ich komme kein."],
        answer: "Ich komme nicht.",
      },
    },
    {
      id: "kein-noun",
      title: {
        english: "kein before a noun",
        tamil: "பெயர்ச்சொல்லுக்கு முன் kein",
        sinhala: "නාම පදයකට පෙර kein",
      },
      text: {
        english:
          "A noun that would have ein, eine or no article gets kein / keine, not nicht: Ich habe Zeit. → Ich habe keine Zeit.",
        tamil:
          "ein, eine அல்லது article இல்லாத பெயர்ச்சொல்லுக்கு nicht அல்ல, kein / keine: Ich habe Zeit. → Ich habe keine Zeit.",
        sinhala:
          "ein, eine හෝ article නැති නාම පදයකට nicht නොවේ, kein / keine: Ich habe Zeit. → Ich habe keine Zeit.",
      },
      examples: [{ id: "keine-zeit" }, { id: "kein-hund" }, { id: "kein-auto" }],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Ich habe keine Zeit.", "Ich habe nicht Zeit."],
        answer: "Ich habe keine Zeit.",
      },
    },
  ],
  sentences: [
    {
      id: "komme-nicht",
      german: "Ich komme nicht.",
      meaning: {
        english: "I am not coming.",
        tamil: "நான் வரவில்லை.",
        sinhala: "මම එන්නේ නැහැ.",
      },
      rule: "nicht",
      focus: 2,
      distractors: ["kein", "keine"],
      why: NICHT_WHY,
    },
    {
      id: "nein-nicht-muede",
      german: "Nein, ich bin nicht müde.",
      meaning: {
        english: "No, I am not tired.",
        tamil: "இல்லை, நான் களைப்பாக இல்லை.",
        sinhala: "නැහැ, මම මහන්සි නැහැ.",
      },
      rule: "nicht",
      focus: 3,
      distractors: ["kein", "keine"],
      why: NICHT_WHY,
      replyTo: {
        german: "Bist du müde?",
        meaning: {
          english: "Are you tired?",
          tamil: "நீ களைப்பாக இருக்கிறாயா?",
          sinhala: "ඔයා මහන්සිද?",
        },
        decoys: ["Nein, ich bin kein müde.", "Ja, ich bin nicht müde."],
      },
    },
    {
      id: "katze-nicht-klein",
      german: "Die Katze ist nicht klein.",
      meaning: {
        english: "The cat is not small.",
        tamil: "பூனை சிறியது அல்ல.",
        sinhala: "පූසා පොඩි නැහැ.",
      },
      rule: "nicht",
      focus: 3,
      distractors: ["kein", "keine"],
      why: NICHT_WHY,
    },
    {
      id: "tom-spielt-nicht",
      german: "Tom spielt heute nicht.",
      nounFirst: true,
      alternatives: ["Heute spielt Tom nicht."],
      meaning: {
        english: "Tom is not playing today.",
        tamil: "டாம் இன்று விளையாடவில்லை.",
        sinhala: "ටොම් අද සෙල්ලම් කරන්නේ නැහැ.",
      },
      rule: "nicht",
      focus: 3,
      distractors: ["kein", "keine"],
      why: NICHT_WHY,
    },
    {
      id: "wohne-nicht",
      german: "Ich wohne nicht in Wien.",
      meaning: {
        english: "I don't live in Vienna.",
        tamil: "நான் வியன்னாவில் வசிக்கவில்லை.",
        sinhala: "මම වියානාවේ ජීවත් වෙන්නේ නැහැ.",
      },
      rule: "nicht",
      focus: 2,
      distractors: ["kein", "keine"],
      why: NICHT_WHY,
    },
    {
      id: "keine-zeit",
      german: "Nein, ich habe keine Zeit.",
      meaning: {
        english: "No, I have no time.",
        tamil: "இல்லை, எனக்கு நேரம் இல்லை.",
        sinhala: "නැහැ, මට වෙලාව නැහැ.",
      },
      rule: "kein-noun",
      focus: 3,
      distractors: ["nicht", "kein"],
      why: nounKeinWhy("Zeit", "die"),
      replyTo: {
        german: "Hast du Zeit?",
        meaning: {
          english: "Do you have time?",
          tamil: "உனக்கு நேரம் இருக்கிறதா?",
          sinhala: "ඔයාට වෙලාව තියෙනවද?",
        },
        decoys: ["Nein, ich habe nicht Zeit.", "Ja, ich habe keine Zeit."],
      },
    },
    {
      id: "kein-auto",
      german: "Nein, ich habe kein Auto.",
      meaning: {
        english: "No, I don't have a car.",
        tamil: "இல்லை, என்னிடம் கார் இல்லை.",
        sinhala: "නැහැ, මට කාර් එකක් නැහැ.",
      },
      rule: "kein-noun",
      focus: 3,
      distractors: ["nicht", "keine"],
      why: nounKeinWhy("Auto", "das"),
      replyTo: {
        german: "Hast du ein Auto?",
        meaning: {
          english: "Do you have a car?",
          tamil: "உன்னிடம் கார் இருக்கிறதா?",
          sinhala: "ඔයාට කාර් එකක් තියෙනවද?",
        },
        decoys: ["Nein, ich habe nicht Auto.", "Ja, ich habe kein Auto."],
      },
    },
    {
      id: "kein-hund",
      german: "Das ist kein Hund.",
      meaning: {
        english: "This is not a dog.",
        tamil: "இது நாய் அல்ல.",
        sinhala: "මේ බල්ලෙක් නෙවෙයි.",
      },
      rule: "kein-noun",
      focus: 2,
      distractors: ["nicht", "keine"],
      why: nounKeinWhy("Hund", "der"),
    },
    {
      id: "keine-kinder",
      german: "Wir haben keine Kinder.",
      meaning: {
        english: "We have no children.",
        tamil: "எங்களுக்குக் குழந்தைகள் இல்லை.",
        sinhala: "අපිට ළමයි නැහැ.",
      },
      rule: "kein-noun",
      focus: 2,
      distractors: ["nicht", "kein"],
      why: nounKeinWhy("Kinder", "plural"),
    },
    {
      id: "tom-keine-katze",
      german: "Tom hat keine Katze.",
      nounFirst: true,
      meaning: {
        english: "Tom doesn't have a cat.",
        tamil: "டாமிடம் பூனை இல்லை.",
        sinhala: "ටොම්ට පූසෙක් නැහැ.",
      },
      rule: "kein-noun",
      focus: 2,
      distractors: ["nicht", "kein"],
      why: nounKeinWhy("Katze", "die"),
    },
  ],
  sort: {
    groups: [
      {
        id: "nicht",
        label: "nicht",
        meaning: {
          english: "for a verb or a describing word",
          tamil: "வினைச்சொல் அல்லது விவரிக்கும் சொல்லுக்கு",
          sinhala: "ක්‍රියාපදයකට හෝ විස්තර කරන වචනයකට",
        },
      },
      {
        id: "kein",
        label: "kein / keine",
        meaning: {
          english: "for a noun",
          tamil: "பெயர்ச்சொல்லுக்கு",
          sinhala: "නාම පදයකට",
        },
      },
    ],
    items: [
      { text: "müde", group: "nicht" },
      { text: "klein", group: "nicht" },
      { text: "kommen", group: "nicht" },
      { text: "spielen", group: "nicht" },
      { text: "Zeit", group: "kein" },
      { text: "Auto", group: "kein" },
      { text: "Hund", group: "kein" },
      { text: "Kinder", group: "kein" },
    ],
  },
};

export const NOUNS_ARTICLES_LESSON: GrammarLesson = {
  id: NOUNS_ARTICLES_LESSON_ID,
  title: "Nomen & Artikel",
  icon: "🏷️",
  assetDir: "G5 nouns and articles",
  meaning: {
    english: "Nouns and articles",
    tamil: "பெயர்ச்சொற்களும் articles-உம்",
    sinhala: "නාම පද සහ articles",
  },
  borrowsFrom: [
    HOME_LESSON_ID,
    ANIMALS_LESSON_ID,
    FAMILY_LESSON_ID,
    WORK_SCHOOL_LESSON_ID,
    PERSONAL_LESSON_ID,
    NUMBERS_LESSON_ID,
  ],
  tests: [WORDS_1, DER_DIE_DAS, EIN_EINE, WORDS_2, PLURAL, KEIN_KEINE, NICHT_KEIN],
};
