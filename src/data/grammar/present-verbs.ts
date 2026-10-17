import type { GrammarLesson, GrammarTest, Localized, WordsTest } from "@/data/grammar/types";
import { VERBS_LESSON_ID } from "@/data/verbs";
import { HOBBIES_LESSON_ID } from "@/data/hobbies";
import { TIME_LESSON_ID } from "@/data/time";
import { TRANSPORT_LESSON_ID } from "@/data/transport";
import { FOOD_LESSON_ID } from "@/data/food";

// G3 Verben im Präsens: a verb is a stem plus an ending that depends on who
// does it (ich lerne, du lernst, er lernt, wir lernen, ihr lernt), haben,
// and the verb as the second part of a sentence (docs/planning/ROADMAP.md, section 3).
// One word test, then one grammar test per step. Gaps are always the whole
// verb form, never just its ending: SentenceLine marks the first match of
// `focusPart`, which is the wrong "e" in "spiele". Every sentence has its
// own clip in public/G3 present verbs/audio/.
//
// The Tamil and Sinhala strings are drafts and need a native speaker's
// review (docs/planning/ROADMAP.md, Open decisions).
export const PRESENT_VERBS_LESSON_ID = "G3";

const ALL_SENTENCE_TYPES = [
  "rule",
  "gapPick",
  "sentenceMeaning",
  "listenPick",
  "pairs",
  "sort",
  "order",
  "spot",
  "transform",
  "meaningBuild",
  "gapType",
  "listenBuild",
  "reply",
] as const;

function about(word: string): Localized {
  return {
    english: `Say it about "${word}"`,
    tamil: `"${word}" பற்றிச் சொல்`,
    sinhala: `"${word}" ගැන කියන්න`,
  };
}
function sayWith(word: string): Localized {
  return {
    english: `Say it with "${word}"`,
    tamil: `"${word}" பயன்படுத்திச் சொல்`,
    sinhala: `"${word}" යොදලා කියන්න`,
  };
}
function startWith(word: string): Localized {
  return {
    english: `Start with "${word}"`,
    tamil: `"${word}" என்று தொடங்கு`,
    sinhala: `"${word}" වලින් පටන් ගන්න`,
  };
}

const MATCH_MEANING: Localized = {
  english: "Match each German phrase to its meaning.",
  tamil: "ஒவ்வொரு ஜெர்மன் சொற்றொடரையும் அதன் பொருளுடன் இணைக்கவும்.",
  sinhala: "සෑම ජර්මන් වාක්‍ය ඛණ්ඩයක්ම එහි අර්ථයට ගළපන්න.",
};
const MATCH_VERB: Localized = {
  english: "Match each person to their verb.",
  tamil: "ஒவ்வொரு ஆளையும் அவருக்கான வினைச்சொல்லுடன் இணைக்கவும்.",
  sinhala: "සෑම පුද්ගලයෙක්ම ඔහුගේ ක්‍රියාපදයට ගළපන්න.",
};

const WORDS: WordsTest = {
  kind: "words",
  testId: "G3.1",
  title: "Wörter",
  meaning: { english: "Words", tamil: "சொற்கள்", sinhala: "වචන" },
  words: [
    { lessonId: VERBS_LESSON_ID, wordId: "lernen" },
    { lessonId: VERBS_LESSON_ID, wordId: "spielen" },
    { lessonId: VERBS_LESSON_ID, wordId: "kochen" },
    { lessonId: VERBS_LESSON_ID, wordId: "machen" },
    { lessonId: VERBS_LESSON_ID, wordId: "trinken" },
    { lessonId: VERBS_LESSON_ID, wordId: "haben" },
    { lessonId: HOBBIES_LESSON_ID, wordId: "schwimmen-verb" },
    { lessonId: HOBBIES_LESSON_ID, wordId: "tanzen-verb" },
    { lessonId: HOBBIES_LESSON_ID, wordId: "singen-verb" },
    { lessonId: TIME_LESSON_ID, wordId: "zeit" },
    { lessonId: TIME_LESSON_ID, wordId: "heute" },
    { lessonId: TRANSPORT_LESSON_ID, wordId: "auto" },
    { lessonId: FOOD_LESSON_ID, wordId: "wasser" },
  ],
  // In no Wortschatz lesson yet.
  newWords: [
    {
      id: "deutsch",
      image: "/G3 present verbs/images/german.jpg",
      full: "Deutsch",
      english: "German (language)",
      tamil: "ஜெர்மன் மொழி",
      sinhala: "ජර්මන් භාෂාව",
    },
    {
      id: "fussball",
      image: "/G3 present verbs/images/football.jpg",
      full: "der Fußball",
      english: "Football",
      tamil: "கால்பந்து",
      sinhala: "පාපන්දු",
    },
  ],
};

// G3.2 ------------------------------------------------------------------

const ICH_E: Localized = {
  english: '"ich" goes with the ending "-e": ich lerne.',
  tamil: '"ich" உடன் "-e" முடிவு வரும்: ich lerne.',
  sinhala: '"ich" සමඟ "-e" අගය එනවා: ich lerne.',
};
const DU_ST: Localized = {
  english: '"du" goes with the ending "-st": du lernst.',
  tamil: '"du" உடன் "-st" முடிவு வரும்: du lernst.',
  sinhala: '"du" සමඟ "-st" අගය එනවා: du lernst.',
};
const WHAT_DO_YOU_DO: Localized = {
  english: "What are you doing?",
  tamil: "நீ என்ன செய்கிறாய்?",
  sinhala: "ඔයා මොකද කරන්නේ?",
};

const ICH_DU: GrammarTest = {
  kind: "grammar",
  testId: "G3.2",
  title: "ich lerne, du lernst",
  meaning: {
    english: "I learn, you learn",
    tamil: "நான் கற்கிறேன், நீ கற்கிறாய்",
    sinhala: "මම, ඔයා ඉගෙන ගන්නවා",
  },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "stem",
      title: {
        english: "A verb is a stem and an ending",
        tamil: "வினைச்சொல் = அடி + முடிவு",
        sinhala: "ක්‍රියාපදය = මූලය + අග",
      },
      text: {
        english:
          'In the dictionary a verb ends in "-en": lernen. Take away "-en" and you have the stem: lern. Then you add an ending that shows who does it.',
        tamil:
          'அகராதியில் வினைச்சொல் "-en" என்று முடியும்: lernen. "-en" ஐ நீக்கினால் அடி கிடைக்கும்: lern. பிறகு யார் செய்கிறார் என்பதைக் காட்டும் முடிவைச் சேர்.',
        sinhala:
          'ශබ්දකෝෂයේ ක්‍රියාපදය "-en" වලින් ඉවර වෙනවා: lernen. "-en" අයින් කළාම මූලය ලැබෙනවා: lern. ඊට පස්සේ කවුද කරන්නේ කියලා පෙන්වන අගක් එකතු කරන්න.',
      },
      examples: [{ id: "ich-lerne" }, { id: "du-lernst" }],
      table: [
        { left: "lernen", right: "lern" },
        { left: "spielen", right: "spiel" },
        { left: "kochen", right: "koch" },
      ],
      check: {
        prompt: {
          english: 'What is the stem of "spielen"?',
          tamil: '"spielen" இன் அடி எது?',
          sinhala: '"spielen" හි මූලය කුමක්ද?',
        },
        options: ["spiel", "spielen"],
        answer: "spiel",
      },
    },
    {
      id: "e-st",
      title: {
        english: "ich -e, du -st",
        tamil: "ich -e, du -st",
        sinhala: "ich -e, du -st",
      },
      text: {
        english:
          'With "ich" the ending is "-e". With "du" it is "-st". German has one present: "ich lerne" is "I learn" and "I am learning".',
        tamil: '"ich" உடன் முடிவு "-e". "du" உடன் முடிவு "-st".',
        sinhala: '"ich" සමඟ අග "-e". "du" සමඟ අග "-st".',
      },
      examples: [{ id: "ich-spiele" }, { id: "du-spielst" }],
      table: [
        { left: "ich", right: "lerne" },
        { left: "du", right: "lernst" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "du"?',
          tamil: '"du" உடன் வரும் சொல் எது?',
          sinhala: '"du" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["lernst", "lerne"],
        answer: "lernst",
      },
    },
  ],
  sentences: [
    {
      id: "ich-lerne",
      german: "Ich lerne Deutsch.",
      meaning: {
        english: "I learn German.",
        tamil: "நான் ஜெர்மன் கற்கிறேன்.",
        sinhala: "මම ජර්මන් ඉගෙන ගන්නවා.",
      },
      rule: "e-st",
      focus: 1,
      distractors: ["lernst", "lernt"],
      why: ICH_E,
      transformTo: { id: "du-lernst", prompt: about("du") },
      replyTo: {
        german: "Was machst du?",
        meaning: WHAT_DO_YOU_DO,
        decoys: ["Du lernst Deutsch.", "Ich lernst Deutsch."],
      },
    },
    {
      id: "ich-spiele",
      german: "Ich spiele Fußball.",
      meaning: {
        english: "I play football.",
        tamil: "நான் கால்பந்து விளையாடுகிறேன்.",
        sinhala: "මම පාපන්දු ගහනවා.",
      },
      rule: "e-st",
      focus: 1,
      distractors: ["spielst", "spielt"],
      why: ICH_E,
      transformTo: { id: "du-spielst", prompt: about("du") },
    },
    {
      id: "ich-trinke",
      german: "Ich trinke Wasser.",
      meaning: {
        english: "I drink water.",
        tamil: "நான் தண்ணீர் குடிக்கிறேன்.",
        sinhala: "මම වතුර බොනවා.",
      },
      rule: "e-st",
      focus: 1,
      distractors: ["trinkst", "trinkt"],
      why: ICH_E,
      transformTo: { id: "du-trinkst", prompt: about("du") },
    },
    {
      id: "ich-koche",
      german: "Ich koche.",
      meaning: { english: "I cook.", tamil: "நான் சமைக்கிறேன்.", sinhala: "මම උයනවා." },
      rule: "e-st",
      focus: 1,
      distractors: ["kochst", "kocht"],
      why: ICH_E,
      transformTo: { id: "du-kochst", prompt: about("du") },
      replyTo: {
        german: "Was machst du?",
        meaning: WHAT_DO_YOU_DO,
        decoys: ["Du kochst.", "Ich kochst."],
      },
    },
    {
      id: "ich-singe",
      german: "Ich singe.",
      meaning: { english: "I sing.", tamil: "நான் பாடுகிறேன்.", sinhala: "මම සින්දු කියනවා." },
      rule: "e-st",
      focus: 1,
      distractors: ["singst", "singt"],
      why: ICH_E,
    },
    {
      id: "du-lernst",
      german: "Du lernst Deutsch.",
      meaning: {
        english: "You learn German.",
        tamil: "நீ ஜெர்மன் கற்கிறாய்.",
        sinhala: "ඔයා ජර්මන් ඉගෙන ගන්නවා.",
      },
      rule: "e-st",
      focus: 1,
      distractors: ["lerne", "lernt"],
      why: DU_ST,
      transformTo: { id: "ich-lerne", prompt: about("ich") },
    },
    {
      id: "du-spielst",
      german: "Du spielst Fußball.",
      meaning: {
        english: "You play football.",
        tamil: "நீ கால்பந்து விளையாடுகிறாய்.",
        sinhala: "ඔයා පාපන්දු ගහනවා.",
      },
      rule: "e-st",
      focus: 1,
      distractors: ["spiele", "spielt"],
      why: DU_ST,
      transformTo: { id: "ich-spiele", prompt: about("ich") },
    },
    {
      id: "du-trinkst",
      german: "Du trinkst Wasser.",
      meaning: {
        english: "You drink water.",
        tamil: "நீ தண்ணீர் குடிக்கிறாய்.",
        sinhala: "ඔයා වතුර බොනවා.",
      },
      rule: "e-st",
      focus: 1,
      distractors: ["trinke", "trinkt"],
      why: DU_ST,
      transformTo: { id: "ich-trinke", prompt: about("ich") },
    },
    {
      id: "du-kochst",
      german: "Du kochst.",
      meaning: { english: "You cook.", tamil: "நீ சமைக்கிறாய்.", sinhala: "ඔයා උයනවා." },
      rule: "e-st",
      focus: 1,
      distractors: ["koche", "kocht"],
      why: DU_ST,
      transformTo: { id: "ich-koche", prompt: about("ich") },
    },
    {
      id: "du-schwimmst",
      german: "Du schwimmst.",
      meaning: { english: "You swim.", tamil: "நீ நீந்துகிறாய்.", sinhala: "ඔයා පිහිනනවා." },
      rule: "e-st",
      focus: 1,
      distractors: ["schwimme", "schwimmt"],
      why: DU_ST,
    },
  ],
  pairs: [
    {
      left: "Ich spiele Fußball.",
      right: {
        english: "I play football.",
        tamil: "நான் கால்பந்து விளையாடுகிறேன்.",
        sinhala: "මම පාපන්දු ගහනවා.",
      },
    },
    {
      left: "Du spielst Fußball.",
      right: {
        english: "You play football.",
        tamil: "நீ கால்பந்து விளையாடுகிறாய்.",
        sinhala: "ඔයා පාපන්දු ගහනවා.",
      },
    },
    {
      left: "Ich lerne",
      right: { english: "I learn", tamil: "நான் கற்கிறேன்", sinhala: "මම ඉගෙන ගන්නවා" },
    },
    {
      left: "Du lernst",
      right: { english: "You learn", tamil: "நீ கற்கிறாய்", sinhala: "ඔයා ඉගෙන ගන්නවා" },
    },
  ],
  pairsPrompt: MATCH_MEANING,
  sort: {
    groups: [
      { id: "ich", label: "ich", meaning: { english: "I …", tamil: "நான் …", sinhala: "මම …" } },
      { id: "du", label: "du", meaning: { english: "you …", tamil: "நீ …", sinhala: "ඔයා …" } },
    ],
    items: [
      { text: "lerne", group: "ich" },
      { text: "lernst", group: "du" },
      { text: "spiele", group: "ich" },
      { text: "spielst", group: "du" },
      { text: "koche", group: "ich" },
      { text: "kochst", group: "du" },
      { text: "trinke", group: "ich" },
      { text: "trinkst", group: "du" },
    ],
  },
};

// G3.3 ------------------------------------------------------------------

const ER_T: Localized = {
  english: '"er", "sie", "es" and names go with the ending "-t": er spielt.',
  tamil: '"er", "sie", "es", பெயர்கள் — இவற்றுடன் "-t" முடிவு வரும்: er spielt.',
  sinhala: '"er", "sie", "es" සහ නම් සමඟ "-t" අග එනවා: er spielt.',
};

const ER_SIE_ES: GrammarTest = {
  kind: "grammar",
  testId: "G3.3",
  title: "er, sie, es -t",
  meaning: {
    english: "he, she, it plays",
    tamil: "அவன், அவள், அது விளையாடுகிறது",
    sinhala: "ඔහු, ඇය, එය සෙල්ලම් කරනවා",
  },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "er-t",
      title: {
        english: 'er, sie, es: the ending "-t"',
        tamil: 'er, sie, es: "-t" முடிவு',
        sinhala: 'er, sie, es: "-t" අග',
      },
      text: {
        english:
          'With "er", "sie", "es", and with a name, add "-t" to the stem: spiel + t = spielt.',
        tamil: '"er", "sie", "es" உடனும், ஒரு பெயருடனும் அடியுடன் "-t" சேர்: spiel + t = spielt.',
        sinhala: '"er", "sie", "es" සමඟත්, නමක් සමඟත් මූලයට "-t" එකතු කරන්න: spiel + t = spielt.',
      },
      examples: [{ id: "tom-spielt" }, { id: "er-spielt" }, { id: "sie-kocht" }],
      table: [
        { left: "ich", right: "spiele" },
        { left: "du", right: "spielst" },
        { left: "er, sie, es", right: "spielt" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "er"?',
          tamil: '"er" உடன் வரும் சொல் எது?',
          sinhala: '"er" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["spielt", "spiele", "spielst"],
        answer: "spielt",
      },
    },
  ],
  sentences: [
    {
      id: "tom-spielt",
      german: "Tom spielt Fußball.",
      meaning: {
        english: "Tom plays football.",
        tamil: "டாம் கால்பந்து விளையாடுகிறான்.",
        sinhala: "ටොම් පාපන්දු ගහනවා.",
      },
      rule: "er-t",
      focus: 1,
      distractors: ["spiele", "spielst"],
      why: ER_T,
      transformTo: { id: "er-spielt", prompt: sayWith("er") },
      replyTo: {
        german: "Was macht Tom?",
        meaning: {
          english: "What is Tom doing?",
          tamil: "டாம் என்ன செய்கிறான்?",
          sinhala: "ටොම් මොකද කරන්නේ?",
        },
        decoys: ["Ich spiele Fußball.", "Tom spielst Fußball."],
      },
    },
    {
      id: "er-spielt",
      german: "Er spielt Fußball.",
      meaning: {
        english: "He plays football.",
        tamil: "அவன் கால்பந்து விளையாடுகிறான்.",
        sinhala: "ඔහු පාපන්දු ගහනවා.",
      },
      rule: "er-t",
      focus: 1,
      distractors: ["spiele", "spielst"],
      why: ER_T,
    },
    {
      id: "anna-kocht",
      german: "Anna kocht.",
      meaning: { english: "Anna cooks.", tamil: "அன்னா சமைக்கிறாள்.", sinhala: "ඇනා උයනවා." },
      rule: "er-t",
      focus: 1,
      distractors: ["koche", "kochst"],
      why: ER_T,
      transformTo: { id: "sie-kocht", prompt: sayWith("sie") },
    },
    {
      id: "sie-kocht",
      german: "Sie kocht.",
      meaning: { english: "She cooks.", tamil: "அவள் சமைக்கிறாள்.", sinhala: "ඇය උයනවා." },
      rule: "er-t",
      focus: 1,
      distractors: ["koche", "kochst"],
      why: ER_T,
    },
    {
      id: "sie-lernt",
      german: "Sie lernt Deutsch.",
      meaning: {
        english: "She learns German.",
        tamil: "அவள் ஜெர்மன் கற்கிறாள்.",
        sinhala: "ඇය ජර්මන් ඉගෙන ගන්නවා.",
      },
      rule: "er-t",
      focus: 1,
      distractors: ["lerne", "lernst"],
      why: ER_T,
    },
    {
      id: "er-trinkt",
      german: "Er trinkt Wasser.",
      meaning: {
        english: "He drinks water.",
        tamil: "அவன் தண்ணீர் குடிக்கிறான்.",
        sinhala: "ඔහු වතුර බොනවා.",
      },
      rule: "er-t",
      focus: 1,
      distractors: ["trinke", "trinkst"],
      why: ER_T,
    },
    {
      id: "kind-schwimmt",
      german: "Das Kind schwimmt.",
      meaning: {
        english: "The child swims.",
        tamil: "குழந்தை நீந்துகிறது.",
        sinhala: "ළමයා පිහිනනවා.",
      },
      rule: "er-t",
      focus: 2,
      distractors: ["schwimme", "schwimmst"],
      why: ER_T,
      transformTo: { id: "es-schwimmt", prompt: sayWith("es") },
    },
    {
      id: "es-schwimmt",
      german: "Es schwimmt.",
      meaning: { english: "It swims.", tamil: "அது நீந்துகிறது.", sinhala: "එය පිහිනනවා." },
      rule: "er-t",
      focus: 1,
      distractors: ["schwimme", "schwimmst"],
      why: ER_T,
    },
    {
      id: "lena-singt",
      german: "Lena singt.",
      meaning: {
        english: "Lena sings.",
        tamil: "லீனா பாடுகிறாள்.",
        sinhala: "ලීනා සින්දු කියනවා.",
      },
      rule: "er-t",
      focus: 1,
      distractors: ["singe", "singst"],
      why: ER_T,
    },
    {
      id: "er-tanzt",
      german: "Er tanzt.",
      meaning: { english: "He dances.", tamil: "அவன் நடனமாடுகிறான்.", sinhala: "ඔහු නටනවා." },
      rule: "er-t",
      focus: 1,
      distractors: ["tanze", "tanzen"],
      why: ER_T,
    },
  ],
  pairs: [
    { left: "ich", right: "spiele" },
    { left: "du", right: "spielst" },
    { left: "er", right: "spielt" },
  ],
  pairsPrompt: MATCH_VERB,
  sort: {
    groups: [
      { id: "ich", label: "ich", meaning: { english: "I …", tamil: "நான் …", sinhala: "මම …" } },
      { id: "du", label: "du", meaning: { english: "you …", tamil: "நீ …", sinhala: "ඔයා …" } },
      {
        id: "er",
        label: "er, sie, es",
        meaning: { english: "he, she, it …", tamil: "அவன், அவள், அது …", sinhala: "ඔහු, ඇය, එය …" },
      },
    ],
    items: [
      { text: "spiele", group: "ich" },
      { text: "spielst", group: "du" },
      { text: "spielt", group: "er" },
      { text: "kochst", group: "du" },
      { text: "kocht", group: "er" },
      { text: "lerne", group: "ich" },
      { text: "lernt", group: "er" },
      { text: "trinkst", group: "du" },
    ],
  },
};

// G3.4 ------------------------------------------------------------------

const PLURAL_EN: Localized = {
  english: '"wir", "sie" (they) and "Sie" go with "-en", like the dictionary form: wir spielen.',
  tamil: '"wir", "sie" (அவர்கள்), "Sie" உடன் அகராதி வடிவம் போலவே "-en" வரும்: wir spielen.',
  sinhala: '"wir", "sie" (ඔවුන්) සහ "Sie" සමඟ ශබ්දකෝෂ රූපය වගේම "-en" එනවා: wir spielen.',
};
const IHR_T: Localized = {
  english: '"ihr" goes with "-t": ihr spielt.',
  tamil: '"ihr" உடன் "-t" வரும்: ihr spielt.',
  sinhala: '"ihr" සමඟ "-t" එනවා: ihr spielt.',
};

const PLURAL: GrammarTest = {
  kind: "grammar",
  testId: "G3.4",
  title: "wir -en, ihr -t",
  meaning: {
    english: "we play, you all play",
    tamil: "நாங்கள் விளையாடுகிறோம், நீங்கள் விளையாடுகிறீர்கள்",
    sinhala: "අපි, ඔයාලා සෙල්ලම් කරනවා",
  },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "wir-en",
      title: {
        english: 'wir, sie, Sie: the ending "-en"',
        tamil: 'wir, sie, Sie: "-en" முடிவு',
        sinhala: 'wir, sie, Sie: "-en" අග',
      },
      text: {
        english:
          'With "wir", "sie" (they) and polite "Sie" the verb looks just like the dictionary form: wir kochen.',
        tamil:
          '"wir", "sie" (அவர்கள்), மரியாதையான "Sie" உடன் வினைச்சொல் அகராதி வடிவம் போலவே இருக்கும்: wir kochen.',
        sinhala:
          '"wir", "sie" (ඔවුන්) සහ ගෞරවාන්විත "Sie" සමඟ ක්‍රියාපදය ශබ්දකෝෂ රූපය වගේමයි: wir kochen.',
      },
      examples: [{ id: "wir-kochen" }, { id: "kinder-schwimmen" }],
      table: [
        { left: "wir", right: "kochen" },
        { left: "sie, Sie", right: "kochen" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "wir"?',
          tamil: '"wir" உடன் வரும் சொல் எது?',
          sinhala: '"wir" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["kochen", "kocht"],
        answer: "kochen",
      },
    },
    {
      id: "ihr-t",
      title: {
        english: 'ihr: the ending "-t"',
        tamil: 'ihr: "-t" முடிவு',
        sinhala: 'ihr: "-t" අග',
      },
      text: {
        english: '"ihr" (you all) takes "-t", the same ending as "er": ihr kocht.',
        tamil: '"ihr" (நீங்கள் எல்லோரும்) உடன் "er" போலவே "-t" வரும்: ihr kocht.',
        sinhala: '"ihr" (ඔයාලා) සමඟ "er" වගේම "-t" එනවා: ihr kocht.',
      },
      examples: [{ id: "ihr-kocht" }, { id: "ihr-spielt" }],
      table: [
        { left: "wir", right: "kochen" },
        { left: "ihr", right: "kocht" },
        { left: "sie, Sie", right: "kochen" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "ihr"?',
          tamil: '"ihr" உடன் வரும் சொல் எது?',
          sinhala: '"ihr" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["kocht", "kochen"],
        answer: "kocht",
      },
    },
  ],
  sentences: [
    {
      id: "wir-kochen",
      german: "Wir kochen.",
      meaning: { english: "We cook.", tamil: "நாங்கள் சமைக்கிறோம்.", sinhala: "අපි උයනවා." },
      rule: "wir-en",
      focus: 1,
      distractors: ["kocht", "kochst"],
      why: PLURAL_EN,
      transformTo: { id: "ihr-kocht", prompt: about("ihr") },
    },
    {
      id: "ihr-kocht",
      german: "Ihr kocht.",
      meaning: {
        english: "You all cook.",
        tamil: "நீங்கள் சமைக்கிறீர்கள்.",
        sinhala: "ඔයාලා උයනවා.",
      },
      rule: "ihr-t",
      focus: 1,
      distractors: ["kochen", "kochst"],
      why: IHR_T,
      transformTo: { id: "wir-kochen", prompt: about("wir") },
    },
    {
      id: "wir-spielen",
      german: "Wir spielen Fußball.",
      meaning: {
        english: "We play football.",
        tamil: "நாங்கள் கால்பந்து விளையாடுகிறோம்.",
        sinhala: "අපි පාපන්දු ගහනවා.",
      },
      rule: "wir-en",
      focus: 1,
      distractors: ["spielt", "spielst"],
      why: PLURAL_EN,
      transformTo: { id: "ihr-spielt", prompt: about("ihr") },
    },
    {
      id: "ihr-spielt",
      german: "Ihr spielt Fußball.",
      meaning: {
        english: "You all play football.",
        tamil: "நீங்கள் கால்பந்து விளையாடுகிறீர்கள்.",
        sinhala: "ඔයාලා පාපන්දු ගහනවා.",
      },
      rule: "ihr-t",
      focus: 1,
      distractors: ["spielen", "spielst"],
      why: IHR_T,
      transformTo: { id: "wir-spielen", prompt: about("wir") },
    },
    {
      id: "wir-lernen",
      german: "Wir lernen Deutsch.",
      meaning: {
        english: "We learn German.",
        tamil: "நாங்கள் ஜெர்மன் கற்கிறோம்.",
        sinhala: "අපි ජර්මන් ඉගෙන ගන්නවා.",
      },
      rule: "wir-en",
      focus: 1,
      distractors: ["lernt", "lernst"],
      why: PLURAL_EN,
      replyTo: {
        german: "Was macht ihr?",
        meaning: {
          english: "What are you all doing?",
          tamil: "நீங்கள் என்ன செய்கிறீர்கள்?",
          sinhala: "ඔයාලා මොකද කරන්නේ?",
        },
        decoys: ["Ihr lernt Deutsch.", "Wir lernt Deutsch."],
      },
    },
    {
      id: "ihr-lernt",
      german: "Ihr lernt Deutsch.",
      meaning: {
        english: "You all learn German.",
        tamil: "நீங்கள் ஜெர்மன் கற்கிறீர்கள்.",
        sinhala: "ඔයාලා ජර්මන් ඉගෙන ගන්නවා.",
      },
      rule: "ihr-t",
      focus: 1,
      distractors: ["lernen", "lernst"],
      why: IHR_T,
    },
    {
      id: "anna-tom-tanzen",
      german: "Anna und Tom tanzen.",
      meaning: {
        english: "Anna and Tom dance.",
        tamil: "அன்னாவும் டாமும் நடனமாடுகிறார்கள்.",
        sinhala: "ඇනා සහ ටොම් නටනවා.",
      },
      rule: "wir-en",
      focus: 3,
      distractors: ["tanzt", "tanze"],
      why: PLURAL_EN,
      transformTo: { id: "sie-tanzen", prompt: sayWith("sie") },
    },
    {
      id: "sie-tanzen",
      german: "Sie tanzen.",
      meaning: {
        english: "They dance.",
        tamil: "அவர்கள் நடனமாடுகிறார்கள்.",
        sinhala: "ඔවුන් නටනවා.",
      },
      rule: "wir-en",
      focus: 1,
      distractors: ["tanzt", "tanze"],
      why: PLURAL_EN,
    },
    {
      id: "kinder-schwimmen",
      german: "Die Kinder schwimmen.",
      meaning: {
        english: "The children swim.",
        tamil: "குழந்தைகள் நீந்துகிறார்கள்.",
        sinhala: "ළමයි පිහිනනවා.",
      },
      rule: "wir-en",
      focus: 2,
      distractors: ["schwimmt", "schwimmst"],
      why: PLURAL_EN,
    },
    {
      id: "sie-formal",
      german: "Sie trinken Wasser, Frau Weber.",
      formal: true,
      meaning: {
        english: "You drink water, Mrs Weber.",
        tamil: "நீங்கள் தண்ணீர் குடிக்கிறீர்கள், திருமதி வெபர்.",
        sinhala: "ඔබ වතුර බොනවා, වෙබර් මහත්මිය.",
      },
      rule: "wir-en",
      focus: 1,
      distractors: ["trinkt", "trinkst"],
      why: PLURAL_EN,
    },
  ],
  pairs: [
    {
      left: "Wir kochen.",
      right: { english: "We cook.", tamil: "நாங்கள் சமைக்கிறோம்.", sinhala: "අපි උයනවා." },
    },
    {
      left: "Ihr kocht.",
      right: {
        english: "You all cook.",
        tamil: "நீங்கள் சமைக்கிறீர்கள்.",
        sinhala: "ඔයාලා උයනවා.",
      },
    },
    {
      left: "Wir lernen",
      right: { english: "We learn", tamil: "நாங்கள் கற்கிறோம்", sinhala: "අපි ඉගෙන ගන්නවා" },
    },
    {
      left: "Ihr lernt",
      right: {
        english: "You all learn",
        tamil: "நீங்கள் கற்கிறீர்கள்",
        sinhala: "ඔයාලා ඉගෙන ගන්නවා",
      },
    },
  ],
  pairsPrompt: MATCH_MEANING,
  // Who goes with which form. Lower-case "sie" is left out: it could be
  // "she" (spielt) or "they" (spielen).
  sort: {
    groups: [
      {
        id: "spielen",
        label: "spielen",
        meaning: {
          english: "wir, sie (they), Sie …",
          tamil: "wir, sie (அவர்கள்), Sie …",
          sinhala: "wir, sie (ඔවුන්), Sie …",
        },
      },
      {
        id: "spielt",
        label: "spielt",
        meaning: { english: "er, ihr …", tamil: "er, ihr …", sinhala: "er, ihr …" },
      },
    ],
    items: [
      { text: "wir", group: "spielen" },
      { text: "Anna und Tom", group: "spielen" },
      { text: "die Kinder", group: "spielen" },
      { text: "ihr", group: "spielt" },
      { text: "er", group: "spielt" },
      { text: "Anna", group: "spielt" },
      { text: "das Kind", group: "spielt" },
    ],
  },
};

// G3.5 ------------------------------------------------------------------

const HABE: Localized = {
  english: '"ich" goes with "habe".',
  tamil: '"ich" உடன் "habe" வரும்.',
  sinhala: '"ich" සමඟ "habe" එනවා.',
};
const HAST: Localized = {
  english: '"du" goes with "hast": no "b".',
  tamil: '"du" உடன் "hast" வரும்: "b" இல்லை.',
  sinhala: '"du" සමඟ "hast" එනවා: "b" නැහැ.',
};
const HAT: Localized = {
  english: '"er", "sie", "es" and names go with "hat".',
  tamil: '"er", "sie", "es", பெயர்கள் — இவற்றுடன் "hat" வரும்.',
  sinhala: '"er", "sie", "es" සහ නම් සමඟ "hat" එනවා.',
};
const HABEN_PL: Localized = {
  english: '"wir" and "sie" (they) go with "haben", "ihr" goes with "habt".',
  tamil: '"wir", "sie" (அவர்கள்) உடன் "haben"; "ihr" உடன் "habt".',
  sinhala: '"wir" සහ "sie" (ඔවුන්) සමඟ "haben"; "ihr" සමඟ "habt".',
};

const HABEN: GrammarTest = {
  kind: "grammar",
  testId: "G3.5",
  title: "haben",
  meaning: {
    english: "I have, you have, he has",
    tamil: "எனக்கு, உனக்கு, அவனுக்கு இருக்கிறது",
    sinhala: "මට, ඔයාට, ඔහුට තියෙනවා",
  },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "habe-hast-hat",
      title: {
        english: "ich habe, du hast, er hat",
        tamil: "ich habe, du hast, er hat",
        sinhala: "ich habe, du hast, er hat",
      },
      text: {
        english:
          '"haben" means "to have". It breaks the pattern: with "du" and "er" the "b" drops out: du hast, er hat.',
        tamil:
          '"haben" என்றால் "வைத்திருத்தல்". இது விதியைப் பின்பற்றாது: "du", "er" உடன் "b" விழுந்துவிடும்: du hast, er hat.',
        sinhala:
          '"haben" කියන්නේ "තියෙනවා". මේක නීතියට අනුව යන්නේ නැහැ: "du" සහ "er" සමඟ "b" අතුරුදහන් වෙනවා: du hast, er hat.',
      },
      examples: [{ id: "ich-zeit" }, { id: "du-zeit" }, { id: "anna-auto" }],
      table: [
        { left: "ich", right: "habe" },
        { left: "du", right: "hast" },
        { left: "er, sie, es", right: "hat" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "du"?',
          tamil: '"du" உடன் வரும் சொல் எது?',
          sinhala: '"du" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["hast", "habst", "hat"],
        answer: "hast",
      },
    },
    {
      id: "haben-plural",
      title: {
        english: "wir haben, ihr habt",
        tamil: "wir haben, ihr habt",
        sinhala: "wir haben, ihr habt",
      },
      text: {
        english:
          'With "wir", "ihr", "sie" (they) and polite "Sie", "haben" follows the normal pattern.',
        tamil:
          '"wir", "ihr", "sie" (அவர்கள்), மரியாதையான "Sie" உடன் "haben" வழக்கமான விதியைப் பின்பற்றும்.',
        sinhala:
          '"wir", "ihr", "sie" (ඔවුන්) සහ ගෞරවාන්විත "Sie" සමඟ "haben" සාමාන්‍ය නීතියට අනුව යනවා.',
      },
      examples: [{ id: "wir-zeit" }, { id: "ihr-zeit" }],
      table: [
        { left: "wir", right: "haben" },
        { left: "ihr", right: "habt" },
        { left: "sie, Sie", right: "haben" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "wir"?',
          tamil: '"wir" உடன் வரும் சொல் எது?',
          sinhala: '"wir" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["haben", "habt"],
        answer: "haben",
      },
    },
  ],
  sentences: [
    {
      id: "ich-zeit",
      german: "Ich habe Zeit.",
      meaning: {
        english: "I have time.",
        tamil: "எனக்கு நேரம் இருக்கிறது.",
        sinhala: "මට වෙලාව තියෙනවා.",
      },
      rule: "habe-hast-hat",
      focus: 1,
      distractors: ["hast", "hat"],
      why: HABE,
      transformTo: { id: "du-zeit", prompt: about("du") },
      replyTo: {
        german: "Hast du Zeit?",
        meaning: {
          english: "Do you have time?",
          tamil: "உனக்கு நேரம் இருக்கிறதா?",
          sinhala: "ඔයාට වෙලාව තියෙනවද?",
        },
        decoys: ["Du hast Zeit.", "Ich hat Zeit."],
      },
    },
    {
      id: "du-zeit",
      german: "Du hast Zeit.",
      meaning: {
        english: "You have time.",
        tamil: "உனக்கு நேரம் இருக்கிறது.",
        sinhala: "ඔයාට වෙලාව තියෙනවා.",
      },
      rule: "habe-hast-hat",
      focus: 1,
      distractors: ["habe", "hat"],
      why: HAST,
      transformTo: { id: "ich-zeit", prompt: about("ich") },
    },
    {
      id: "anna-auto",
      german: "Anna hat ein Auto.",
      meaning: {
        english: "Anna has a car.",
        tamil: "அன்னாவிடம் ஒரு கார் இருக்கிறது.",
        sinhala: "ඇනාට කාරයක් තියෙනවා.",
      },
      rule: "habe-hast-hat",
      focus: 1,
      distractors: ["habe", "hast"],
      why: HAT,
      transformTo: { id: "sie-auto", prompt: sayWith("sie") },
    },
    {
      id: "sie-auto",
      german: "Sie hat ein Auto.",
      meaning: {
        english: "She has a car.",
        tamil: "அவளிடம் ஒரு கார் இருக்கிறது.",
        sinhala: "ඇයට කාරයක් තියෙනවා.",
      },
      rule: "habe-hast-hat",
      focus: 1,
      distractors: ["habe", "hast"],
      why: HAT,
    },
    {
      id: "er-auto",
      german: "Er hat ein Auto.",
      meaning: {
        english: "He has a car.",
        tamil: "அவனிடம் ஒரு கார் இருக்கிறது.",
        sinhala: "ඔහුට කාරයක් තියෙනවා.",
      },
      rule: "habe-hast-hat",
      focus: 1,
      distractors: ["habe", "hast"],
      why: HAT,
    },
    {
      id: "tom-zeit",
      german: "Tom hat heute Zeit.",
      alternatives: ["Heute hat Tom Zeit."],
      meaning: {
        english: "Tom has time today.",
        tamil: "டாமுக்கு இன்று நேரம் இருக்கிறது.",
        sinhala: "ටොම්ට අද වෙලාව තියෙනවා.",
      },
      rule: "habe-hast-hat",
      focus: 1,
      distractors: ["habe", "hast"],
      why: HAT,
    },
    {
      id: "wir-zeit",
      german: "Wir haben Zeit.",
      meaning: {
        english: "We have time.",
        tamil: "எங்களுக்கு நேரம் இருக்கிறது.",
        sinhala: "අපිට වෙලාව තියෙනවා.",
      },
      rule: "haben-plural",
      focus: 1,
      distractors: ["habt", "hat"],
      why: HABEN_PL,
      transformTo: { id: "ihr-zeit", prompt: about("ihr") },
    },
    {
      id: "ihr-zeit",
      german: "Ihr habt Zeit.",
      meaning: {
        english: "You all have time.",
        tamil: "உங்களுக்கு நேரம் இருக்கிறது.",
        sinhala: "ඔයාලට වෙලාව තියෙනවා.",
      },
      rule: "haben-plural",
      focus: 1,
      distractors: ["haben", "hat"],
      why: HABEN_PL,
      transformTo: { id: "wir-zeit", prompt: about("wir") },
    },
    {
      id: "wir-auto",
      german: "Wir haben ein Auto.",
      meaning: {
        english: "We have a car.",
        tamil: "எங்களிடம் ஒரு கார் இருக்கிறது.",
        sinhala: "අපිට කාරයක් තියෙනවා.",
      },
      rule: "haben-plural",
      focus: 1,
      distractors: ["habt", "hat"],
      why: HABEN_PL,
    },
  ],
  pairs: [
    { left: "ich", right: "habe" },
    { left: "du", right: "hast" },
    { left: "er", right: "hat" },
    { left: "ihr", right: "habt" },
  ],
  pairsPrompt: MATCH_VERB,
  sort: {
    groups: [
      {
        id: "hat",
        label: "hat",
        meaning: { english: "er, sie, es …", tamil: "er, sie, es …", sinhala: "er, sie, es …" },
      },
      {
        id: "haben",
        label: "haben",
        meaning: {
          english: "wir, sie (they) …",
          tamil: "wir, sie (அவர்கள்) …",
          sinhala: "wir, sie (ඔවුන්) …",
        },
      },
    ],
    items: [
      { text: "er", group: "hat" },
      { text: "Anna", group: "hat" },
      { text: "das Kind", group: "hat" },
      { text: "wir", group: "haben" },
      { text: "Anna und Tom", group: "haben" },
      { text: "die Kinder", group: "haben" },
    ],
  },
};

// G3.6 ------------------------------------------------------------------
// Each idea is said twice, once starting with the person and once with
// "Heute". Both halves of a pair share one meaning, so each lists the other
// as an alternative: with only the meaning to go on, either order is right.

const VERB_SECOND: Localized = {
  english: "In a statement the verb is the second part of the sentence.",
  tamil: "ஒரு கூற்று வாக்கியத்தில் வினைச்சொல் இரண்டாவது பகுதி.",
  sinhala: "ප්‍රකාශන වාක්‍යයක ක්‍රියාපදය වාක්‍යයේ දෙවැනි කොටසයි.",
};
const HEUTE_FIRST: Localized = {
  english: 'When "Heute" comes first, the verb is still second and the person moves behind it.',
  tamil: '"Heute" முதலில் வந்தால், வினைச்சொல் இரண்டாவதாகவே இருக்கும்; ஆள் அதற்குப் பின் வரும்.',
  sinhala: '"Heute" මුලින් ආවොත්, ක්‍රියාපදය තවමත් දෙවැනියි; පුද්ගලයා ඊට පස්සේ එනවා.',
};
const TODAY_GERMAN: Localized = {
  english: "Today I am learning German.",
  tamil: "இன்று நான் ஜெர்மன் கற்கிறேன்.",
  sinhala: "අද මම ජර්මන් ඉගෙන ගන්නවා.",
};
const TODAY_FOOTBALL: Localized = {
  english: "Today Tom is playing football.",
  tamil: "இன்று டாம் கால்பந்து விளையாடுகிறான்.",
  sinhala: "අද ටොම් පාපන්දු ගහනවා.",
};
const TODAY_COOK: Localized = {
  english: "Today we are cooking.",
  tamil: "இன்று நாங்கள் சமைக்கிறோம்.",
  sinhala: "අද අපි උයනවා.",
};
const TODAY_TIME: Localized = {
  english: "Today I have time.",
  tamil: "இன்று எனக்கு நேரம் இருக்கிறது.",
  sinhala: "අද මට වෙලාව තියෙනවා.",
};

const VERB_POSITION: GrammarTest = {
  kind: "grammar",
  testId: "G3.6",
  title: "Das Verb ist Nummer 2",
  meaning: {
    english: "The verb comes second",
    tamil: "வினைச்சொல் இரண்டாவது",
    sinhala: "ක්‍රියාපදය දෙවැනියි",
  },
  // No gaps and no spot: this test is about where the verb goes, not its
  // form, so it is all tiles, listening and replies. No sentenceMeaning
  // either: both orders of a sentence mean the same, so a meaning question
  // is answered by spotting one noun and never tests the order.
  testTypes: ["rule", "listenPick", "order", "transform", "meaningBuild", "listenBuild", "reply"],
  rules: [
    {
      id: "verb-second",
      title: {
        english: "The verb is number 2",
        tamil: "வினைச்சொல் எண் 2",
        sinhala: "ක්‍රියාපදය අංක 2",
      },
      text: {
        english:
          'In a German statement the verb comes second. Words like "heute" go after it: Ich lerne heute Deutsch. In a yes/no question the verb comes first: Hast du Zeit?',
        tamil:
          'ஜெர்மன் கூற்று வாக்கியத்தில் வினைச்சொல் இரண்டாவதாக வரும். "heute" போன்ற சொற்கள் அதற்குப் பின் வரும்: Ich lerne heute Deutsch. ஆம்/இல்லை கேள்வியில் வினைச்சொல் முதலில் வரும்: Hast du Zeit?',
        sinhala:
          'ජර්මන් ප්‍රකාශන වාක්‍යයක ක්‍රියාපදය දෙවැනියට එනවා. "heute" වගේ වචන ඊට පස්සේ එනවා: Ich lerne heute Deutsch. ඔව්/නැහැ ප්‍රශ්නයක ක්‍රියාපදය මුලින්ම එනවා: Hast du Zeit?',
      },
      examples: [
        { id: "ich-heute", highlight: 1 },
        { id: "tom-heute", highlight: 1 },
      ],
      check: {
        prompt: {
          english: "Which sentence is right?",
          tamil: "எந்த வாக்கியம் சரி?",
          sinhala: "නිවැරදි වාක්‍යය කුමක්ද?",
        },
        options: ["Ich lerne heute Deutsch.", "Ich heute lerne Deutsch."],
        answer: "Ich lerne heute Deutsch.",
      },
    },
    {
      id: "heute-first",
      title: {
        english: "Heute first: the verb stays second",
        tamil: "Heute முதலில்: வினைச்சொல் இரண்டாவதே",
        sinhala: "Heute මුලින්: ක්‍රියාපදය දෙවැනියි",
      },
      text: {
        english:
          'You can start with "Heute". The verb stays in place 2, so "ich" moves behind it: Heute lerne ich Deutsch.',
        tamil:
          '"Heute" என்று தொடங்கலாம். வினைச்சொல் இடம் 2-இலேயே இருக்கும், அதனால் "ich" அதற்குப் பின் போகும்: Heute lerne ich Deutsch.',
        sinhala:
          '"Heute" වලින් පටන් ගන්න පුළුවන්. ක්‍රියාපදය 2 වැනි තැනේම තියෙනවා, ඒ නිසා "ich" ඊට පස්සට යනවා: Heute lerne ich Deutsch.',
      },
      examples: [
        { id: "heute-ich", highlight: 1 },
        { id: "heute-tom", highlight: 1 },
      ],
      check: {
        prompt: {
          english: "Which sentence is right?",
          tamil: "எந்த வாக்கியம் சரி?",
          sinhala: "නිවැරදි වාක්‍යය කුමක්ද?",
        },
        options: ["Heute lerne ich Deutsch.", "Heute ich lerne Deutsch."],
        answer: "Heute lerne ich Deutsch.",
      },
    },
  ],
  sentences: [
    {
      id: "ich-heute",
      german: "Ich lerne heute Deutsch.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Heute lerne ich Deutsch."],
      meaning: TODAY_GERMAN,
      rule: "verb-second",
      why: VERB_SECOND,
      transformTo: { id: "heute-ich", prompt: startWith("Heute") },
    },
    {
      id: "heute-ich",
      german: "Heute lerne ich Deutsch.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Ich lerne heute Deutsch."],
      meaning: TODAY_GERMAN,
      rule: "heute-first",
      why: HEUTE_FIRST,
      transformTo: { id: "ich-heute", prompt: startWith("Ich") },
    },
    {
      id: "tom-heute",
      german: "Tom spielt heute Fußball.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Heute spielt Tom Fußball."],
      meaning: TODAY_FOOTBALL,
      rule: "verb-second",
      why: VERB_SECOND,
      transformTo: { id: "heute-tom", prompt: startWith("Heute") },
    },
    {
      id: "heute-tom",
      german: "Heute spielt Tom Fußball.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Tom spielt heute Fußball."],
      meaning: TODAY_FOOTBALL,
      rule: "heute-first",
      why: HEUTE_FIRST,
      transformTo: { id: "tom-heute", prompt: startWith("Tom") },
    },
    {
      id: "wir-heute",
      german: "Wir kochen heute.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Heute kochen wir."],
      meaning: TODAY_COOK,
      rule: "verb-second",
      why: VERB_SECOND,
      transformTo: { id: "heute-wir", prompt: startWith("Heute") },
    },
    {
      id: "heute-wir",
      german: "Heute kochen wir.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Wir kochen heute."],
      meaning: TODAY_COOK,
      rule: "heute-first",
      why: HEUTE_FIRST,
      transformTo: { id: "wir-heute", prompt: startWith("Wir") },
      replyTo: {
        german: "Was macht ihr heute?",
        meaning: {
          english: "What are you all doing today?",
          tamil: "நீங்கள் இன்று என்ன செய்கிறீர்கள்?",
          sinhala: "ඔයාලා අද මොකද කරන්නේ?",
        },
        decoys: ["Heute kocht ihr.", "Heute wir kochen."],
      },
    },
    {
      id: "ich-zeit-heute",
      german: "Ich habe heute Zeit.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Heute habe ich Zeit."],
      meaning: TODAY_TIME,
      rule: "verb-second",
      why: VERB_SECOND,
      transformTo: { id: "heute-zeit", prompt: startWith("Heute") },
    },
    {
      id: "heute-zeit",
      german: "Heute habe ich Zeit.",
      // Both orders mean the same: without a "Start with …" instruction,
      // either is right.
      alternatives: ["Ich habe heute Zeit."],
      meaning: TODAY_TIME,
      rule: "heute-first",
      why: HEUTE_FIRST,
      transformTo: { id: "ich-zeit-heute", prompt: startWith("Ich") },
      replyTo: {
        german: "Hast du heute Zeit?",
        meaning: {
          english: "Do you have time today?",
          tamil: "உனக்கு இன்று நேரம் இருக்கிறதா?",
          sinhala: "ඔයාට අද වෙලාව තියෙනවද?",
        },
        decoys: ["Heute hast du Zeit.", "Heute ich habe Zeit."],
      },
    },
  ],
};

export const PRESENT_VERBS_LESSON: GrammarLesson = {
  id: PRESENT_VERBS_LESSON_ID,
  title: "Verben im Präsens",
  icon: "🏃",
  assetDir: "G3 present verbs",
  meaning: {
    english: "Verbs in the present",
    tamil: "நிகழ்கால வினைச்சொற்கள்",
    sinhala: "වර්තමාන කාල ක්‍රියාපද",
  },
  borrowsFrom: [
    VERBS_LESSON_ID,
    HOBBIES_LESSON_ID,
    TIME_LESSON_ID,
    TRANSPORT_LESSON_ID,
    FOOD_LESSON_ID,
  ],
  tests: [WORDS, ICH_DU, ER_SIE_ES, PLURAL, HABEN, VERB_POSITION],
};
