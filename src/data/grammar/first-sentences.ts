import type { GrammarLesson, GrammarTest, Localized, WordsTest } from "@/data/grammar/types";
import { JOBS_LESSON_ID } from "@/data/jobs";
import { PERSONAL_LESSON_ID } from "@/data/personal";
import { QUESTIONS_LESSON_ID } from "@/data/questions";
import { VERBS_LESSON_ID } from "@/data/verbs";
import { SMALL_WORDS_LESSON_ID } from "@/data/small-words";
import { FEELINGS_LESSON_ID } from "@/data/feelings";
import { DESCRIBING_LESSON_ID } from "@/data/describing";
import { PREPOSITIONS_LESSON_ID } from "@/data/prepositions";
import { POSITION_LESSON_ID } from "@/data/position";
import { GRAMMAR_LESSON_ID } from "@/data/grammar-words";

// G2 Erste Sätze: introducing yourself — heißen, sein (bin, bist, ist,
// sind, seid), kommen aus, wohnen in (ROADMAP.md, section 3). Two word
// tests, each right before the grammar tests that use its words. Every
// sentence has its own clip in public/G2 first sentences/audio/.
//
// The Tamil and Sinhala strings are drafts and need a native speaker's
// review (ROADMAP.md, Open decisions).
export const FIRST_SENTENCES_LESSON_ID = "G2";

// Every grammar test in this lesson uses every sentence-based type it has
// data for; sort only where there is something to sort.
const ALL_SENTENCE_TYPES = [
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
  "reply",
] as const;

const ABOUT_DU: Localized = {
  english: 'Say it about "du"',
  tamil: '"du" பற்றிச் சொல்',
  sinhala: '"du" ගැන කියන්න',
};
const ABOUT_ICH: Localized = {
  english: 'Say it about "ich"',
  tamil: '"ich" பற்றிச் சொல்',
  sinhala: '"ich" ගැන කියන්න',
};

const WORDS_1: WordsTest = {
  kind: "words",
  testId: "G2.1",
  title: "Wörter 1",
  meaning: { english: "Words 1", tamil: "சொற்கள் 1", sinhala: "වචන 1" },
  words: [
    { lessonId: PERSONAL_LESSON_ID, wordId: "heissen" },
    { lessonId: PERSONAL_LESSON_ID, wordId: "sein" },
    { lessonId: PERSONAL_LESSON_ID, wordId: "name" },
    { lessonId: QUESTIONS_LESSON_ID, wordId: "wie" },
    { lessonId: FEELINGS_LESSON_ID, wordId: "muede" },
    { lessonId: FEELINGS_LESSON_ID, wordId: "krank" },
    { lessonId: DESCRIBING_LESSON_ID, wordId: "nett" },
    { lessonId: DESCRIBING_LESSON_ID, wordId: "neu" },
    { lessonId: POSITION_LESSON_ID, wordId: "hier" },
    { lessonId: JOBS_LESSON_ID, wordId: "lehrer" },
    { lessonId: JOBS_LESSON_ID, wordId: "aerztin" },
  ],
};

const ICH_HEISSE: Localized = {
  english: '"ich" goes with "heiße".',
  tamil: '"ich" உடன் "heiße" வரும்.',
  sinhala: '"ich" සමඟ "heiße" එනවා.',
};
const DU_HEISST: Localized = {
  english: '"du" goes with "heißt".',
  tamil: '"du" உடன் "heißt" வரும்.',
  sinhala: '"du" සමඟ "heißt" එනවා.',
};
const WHAT_IS_YOUR_NAME: Localized = {
  english: "What is your name?",
  tamil: "உன் பெயர் என்ன?",
  sinhala: "ඔයාගේ නම මොකක්ද?",
};

const HEISSEN: GrammarTest = {
  kind: "grammar",
  testId: "G2.2",
  title: "Ich heiße …",
  meaning: { english: "My name is …", tamil: "என் பெயர் …", sinhala: "මගේ නම …" },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "ich-heisse",
      title: {
        english: '"My name is …": ich heiße',
        tamil: '"என் பெயர் …": ich heiße',
        sinhala: '"මගේ නම …": ich heiße',
      },
      text: {
        english: 'To say your name, say "ich heiße" and then your name.',
        tamil: 'உன் பெயரைச் சொல்ல, "ich heiße" என்று சொல்லி, பிறகு உன் பெயரைச் சொல்.',
        sinhala: 'ඔයාගේ නම කියන්න, "ich heiße" කියලා ඊට පස්සේ නම කියන්න.',
      },
      examples: [{ id: "ich-anna" }, { id: "ich-tom" }],
      check: {
        prompt: {
          english: 'Which one means "My name is Tom"?',
          tamil: '"என் பெயர் டாம்" என்பது எது?',
          sinhala: '"මගේ නම ටොම්" කියන්නේ කුමක්ද?',
        },
        options: ["Ich heiße Tom.", "Du heißt Tom."],
        answer: "Ich heiße Tom.",
      },
    },
    {
      id: "du-heisst",
      title: {
        english: '"Your name is …": du heißt',
        tamil: '"உன் பெயர் …": du heißt',
        sinhala: '"ඔයාගේ නම …": du heißt',
      },
      text: {
        english: 'With "du" the verb is "heißt". To ask a name: "Wie heißt du?"',
        tamil: '"du" உடன் வினைச்சொல் "heißt". பெயரைக் கேட்க: "Wie heißt du?"',
        sinhala: '"du" සමඟ ක්‍රියාපදය "heißt". නම අහන්න: "Wie heißt du?"',
      },
      examples: [{ id: "du-anna" }, { id: "wie" }],
      table: [
        { left: "ich", right: "heiße" },
        { left: "du", right: "heißt" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "du"?',
          tamil: '"du" உடன் வரும் சொல் எது?',
          sinhala: '"du" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["heißt", "heiße"],
        answer: "heißt",
      },
    },
  ],
  sentences: [
    {
      id: "ich-anna",
      german: "Ich heiße Anna.",
      meaning: { english: "My name is Anna.", tamil: "என் பெயர் அன்னா.", sinhala: "මගේ නම ඇනා." },
      rule: "ich-heisse",
      focus: 1,
      distractors: ["heißt", "heißen"],
      why: ICH_HEISSE,
      transformTo: { id: "du-anna", prompt: ABOUT_DU },
      replyTo: {
        german: "Wie heißt du?",
        meaning: WHAT_IS_YOUR_NAME,
        decoys: ["Du heißt Anna.", "Ich heißt Anna."],
      },
    },
    {
      id: "ich-tom",
      german: "Ich heiße Tom.",
      meaning: { english: "My name is Tom.", tamil: "என் பெயர் டாம்.", sinhala: "මගේ නම ටොම්." },
      rule: "ich-heisse",
      focus: 1,
      distractors: ["heißt", "heißen"],
      why: ICH_HEISSE,
      transformTo: { id: "du-tom", prompt: ABOUT_DU },
    },
    {
      id: "hallo-lena",
      german: "Hallo, ich heiße Lena.",
      meaning: {
        english: "Hello, my name is Lena.",
        tamil: "வணக்கம், என் பெயர் லீனா.",
        sinhala: "හලෝ, මගේ නම ලීනා.",
      },
      rule: "ich-heisse",
      focus: 2,
      distractors: ["heißt", "heißen"],
      why: ICH_HEISSE,
      replyTo: {
        german: "Hallo, wie heißt du?",
        meaning: {
          english: "Hello, what is your name?",
          tamil: "வணக்கம், உன் பெயர் என்ன?",
          sinhala: "හලෝ, ඔයාගේ නම මොකක්ද?",
        },
        decoys: ["Hallo, du heißt Lena.", "Hallo, ich heißt Lena."],
      },
    },
    {
      id: "ich-weber",
      german: "Ich heiße Anna Weber.",
      meaning: {
        english: "My name is Anna Weber.",
        tamil: "என் பெயர் அன்னா வெபர்.",
        sinhala: "මගේ නම ඇනා වෙබර්.",
      },
      rule: "ich-heisse",
      focus: 1,
      distractors: ["heißt", "heißen"],
      why: ICH_HEISSE,
    },
    {
      id: "du-anna",
      german: "Du heißt Anna.",
      meaning: {
        english: "Your name is Anna.",
        tamil: "உன் பெயர் அன்னா.",
        sinhala: "ඔයාගේ නම ඇනා.",
      },
      rule: "du-heisst",
      focus: 1,
      distractors: ["heiße", "heißen"],
      why: DU_HEISST,
      transformTo: { id: "ich-anna", prompt: ABOUT_ICH },
    },
    {
      id: "du-tom",
      german: "Du heißt Tom.",
      meaning: {
        english: "Your name is Tom.",
        tamil: "உன் பெயர் டாம்.",
        sinhala: "ඔයාගේ නම ටොම්.",
      },
      rule: "du-heisst",
      focus: 1,
      distractors: ["heiße", "heißen"],
      why: DU_HEISST,
      transformTo: { id: "ich-tom", prompt: ABOUT_ICH },
    },
    {
      id: "wie",
      german: "Wie heißt du?",
      meaning: WHAT_IS_YOUR_NAME,
      rule: "du-heisst",
      focus: 1,
      distractors: ["heiße", "heißen"],
      why: DU_HEISST,
    },
    {
      id: "hallo-wie",
      german: "Hallo, wie heißt du?",
      meaning: {
        english: "Hello, what is your name?",
        tamil: "வணக்கம், உன் பெயர் என்ன?",
        sinhala: "හලෝ, ඔයාගේ නම මොකක්ද?",
      },
      rule: "du-heisst",
      focus: 2,
      distractors: ["heiße", "heißen"],
      why: DU_HEISST,
    },
  ],
  pairs: [
    { left: "ich", right: "heiße" },
    { left: "du", right: "heißt" },
    { left: "Ich heiße", right: { english: "My name is", tamil: "என் பெயர்", sinhala: "මගේ නම" } },
    { left: "Wie heißt du?", right: WHAT_IS_YOUR_NAME },
  ],
};

const BIN: Localized = {
  english: '"ich" goes with "bin".',
  tamil: '"ich" உடன் "bin" வரும்.',
  sinhala: '"ich" සමඟ "bin" එනවා.',
};
const BIST: Localized = {
  english: '"du" goes with "bist".',
  tamil: '"du" உடன் "bist" வரும்.',
  sinhala: '"du" සමඟ "bist" එනවා.',
};

const BIN_BIST: GrammarTest = {
  kind: "grammar",
  testId: "G2.3",
  title: "ich bin, du bist",
  meaning: { english: "I am, you are", tamil: "நான், நீ", sinhala: "මම, ඔයා" },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "bin-bist",
      title: {
        english: '"I am" and "you are"',
        tamil: '"நான் …" மற்றும் "நீ …"',
        sinhala: '"මම …" සහ "ඔයා …"',
      },
      text: {
        english: 'With "ich" the verb is "bin". With "du" it is "bist".',
        tamil: '"ich" உடன் "bin" வரும். "du" உடன் "bist" வரும்.',
        sinhala: '"ich" සමඟ "bin" එනවා. "du" සමඟ "bist" එනවා.',
      },
      examples: [{ id: "ich-anna" }, { id: "du-tom" }],
      table: [
        { left: "ich", right: "bin" },
        { left: "du", right: "bist" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "ich"?',
          tamil: '"ich" உடன் வரும் சொல் எது?',
          sinhala: '"ich" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["bin", "bist"],
        answer: "bin",
      },
    },
    {
      id: "du-friends",
      title: {
        english: '"du": for friends and family',
        tamil: '"du": நண்பர்கள், குடும்பத்தினருக்கு',
        sinhala: '"du": යාළුවන්ට සහ පවුලේ අයට',
      },
      text: {
        english: '"du" is the friendly "you", for friends, family and children.',
        tamil: '"du" என்பது நண்பர்கள், குடும்பத்தினர், குழந்தைகளிடம் சொல்லும் "நீ".',
        sinhala: '"du" කියන්නේ යාළුවන්ට, පවුලේ අයට, ළමයින්ට කියන "ඔයා".',
      },
      examples: [{ id: "du-nett" }, { id: "du-muede" }],
      check: {
        prompt: {
          english: 'Who do you call "du"?',
          tamil: '"du" என்று யாரை அழைப்பாய்?',
          sinhala: '"du" කියලා කතා කරන්නේ කාටද?',
        },
        options: ["das Kind", "Frau Weber"],
        answer: "das Kind",
      },
    },
  ],
  sentences: [
    {
      id: "ich-anna",
      german: "Ich bin Anna.",
      meaning: { english: "I am Anna.", tamil: "நான் அன்னா.", sinhala: "මම ඇනා." },
      rule: "bin-bist",
      focus: 1,
      distractors: ["bist", "ist", "sind"],
      why: BIN,
      replyTo: {
        german: "Hallo! Ich bin Tom.",
        meaning: {
          english: "Hello! I am Tom.",
          tamil: "வணக்கம்! நான் டாம்.",
          sinhala: "හලෝ! මම ටොම්.",
        },
        decoys: ["Du bist Anna.", "Ich bist Anna."],
      },
    },
    {
      id: "du-tom",
      german: "Du bist Tom.",
      meaning: { english: "You are Tom.", tamil: "நீ டாம்.", sinhala: "ඔයා ටොම්." },
      rule: "bin-bist",
      focus: 1,
      distractors: ["bin", "ist", "sind"],
      why: BIST,
    },
    {
      id: "ich-muede",
      german: "Ich bin müde.",
      meaning: {
        english: "I am tired.",
        tamil: "நான் சோர்வாக இருக்கிறேன்.",
        sinhala: "මට මහන්සියි.",
      },
      rule: "bin-bist",
      focus: 1,
      distractors: ["bist", "ist", "sind"],
      why: BIN,
      transformTo: { id: "du-muede", prompt: ABOUT_DU },
      replyTo: {
        german: "Wie geht's?",
        meaning: { english: "How are you?", tamil: "எப்படி இருக்கிறாய்?", sinhala: "කොහොමද?" },
        decoys: ["Du bist müde.", "Ich bist müde."],
      },
    },
    {
      id: "du-muede",
      german: "Du bist müde.",
      meaning: {
        english: "You are tired.",
        tamil: "நீ சோர்வாக இருக்கிறாய்.",
        sinhala: "ඔයාට මහන්සියි.",
      },
      rule: "du-friends",
      focus: 1,
      distractors: ["bin", "ist", "sind"],
      why: BIST,
      transformTo: { id: "ich-muede", prompt: ABOUT_ICH },
    },
    {
      id: "ich-krank",
      german: "Ich bin krank.",
      meaning: {
        english: "I am sick.",
        tamil: "எனக்கு உடம்பு சரியில்லை.",
        sinhala: "මට අසනීපයි.",
      },
      rule: "bin-bist",
      focus: 1,
      distractors: ["bist", "ist", "sind"],
      why: BIN,
      transformTo: { id: "du-krank", prompt: ABOUT_DU },
    },
    {
      id: "du-krank",
      german: "Du bist krank.",
      meaning: {
        english: "You are sick.",
        tamil: "உனக்கு உடம்பு சரியில்லை.",
        sinhala: "ඔයාට අසනීපයි.",
      },
      rule: "bin-bist",
      focus: 1,
      distractors: ["bin", "ist", "sind"],
      why: BIST,
      transformTo: { id: "ich-krank", prompt: ABOUT_ICH },
    },
    {
      id: "ich-neu",
      german: "Ich bin neu hier.",
      meaning: {
        english: "I am new here.",
        tamil: "நான் இங்கே புதிதாக வந்திருக்கிறேன்.",
        sinhala: "මම මෙහෙට අලුත්.",
      },
      rule: "bin-bist",
      focus: 1,
      distractors: ["bist", "ist", "sind"],
      why: BIN,
    },
    {
      id: "du-nett",
      german: "Du bist nett.",
      meaning: {
        english: "You are nice.",
        tamil: "நீ அன்பாக இருக்கிறாய்.",
        sinhala: "ඔයා කරුණාවන්තයි.",
      },
      rule: "du-friends",
      focus: 1,
      distractors: ["bin", "ist", "sind"],
      why: BIST,
    },
  ],
  pairs: [
    { left: "ich", right: "bin" },
    { left: "du", right: "bist" },
    { left: "Ich bin", right: { english: "I am", tamil: "நான் …", sinhala: "මම …" } },
    { left: "Du bist", right: { english: "You are", tamil: "நீ …", sinhala: "ඔයා …" } },
  ],
};

const IST: Localized = {
  english: '"er", "sie", "es" and names go with "ist".',
  tamil: '"er", "sie", "es", பெயர்கள் — இவற்றுடன் "ist" வரும்.',
  sinhala: '"er", "sie", "es" සහ නම් සමඟ "ist" එනවා.',
};

const ER_SIE_ES: GrammarTest = {
  kind: "grammar",
  testId: "G2.4",
  title: "er, sie, es ist",
  meaning: {
    english: "he is, she is, it is",
    tamil: "அவன், அவள், அது",
    sinhala: "ඔහු, ඇය, එය",
  },
  testTypes: [
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
  ],
  rules: [
    {
      id: "ist",
      title: {
        english: '"he is", "she is", "it is": ist',
        tamil: '"அவன் / அவள் / அது …": ist',
        sinhala: '"ඔහු / ඇය / එය …": ist',
      },
      text: {
        english: 'With "er", "sie", "es", and with a name, the verb is "ist".',
        tamil: '"er", "sie", "es" உடனும், ஒரு பெயருடனும் "ist" வரும்.',
        sinhala: '"er", "sie", "es" සමඟත්, නමක් සමඟත් "ist" එනවා.',
      },
      examples: [{ id: "tom-lehrer" }, { id: "er-lehrer" }, { id: "sie-aerztin" }],
      table: [
        { left: "ich", right: "bin" },
        { left: "du", right: "bist" },
        { left: "er, sie, es", right: "ist" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "er"?',
          tamil: '"er" உடன் வரும் சொல் எது?',
          sinhala: '"er" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["ist", "bin", "bist"],
        answer: "ist",
      },
    },
  ],
  sentences: [
    {
      id: "tom-lehrer",
      german: "Tom ist Lehrer.",
      meaning: {
        english: "Tom is a teacher.",
        tamil: "டாம் ஒரு ஆசிரியர்.",
        sinhala: "ටොම් ගුරුවරයෙක්.",
      },
      rule: "ist",
      focus: 1,
      distractors: ["bin", "bist", "sind"],
      why: IST,
      transformTo: {
        id: "er-lehrer",
        prompt: {
          english: 'Say "er" instead of "Tom"',
          tamil: '"Tom" என்பதற்குப் பதிலாக "er" சொல்',
          sinhala: '"Tom" වෙනුවට "er" කියන්න',
        },
      },
    },
    {
      id: "er-lehrer",
      german: "Er ist Lehrer.",
      meaning: {
        english: "He is a teacher.",
        tamil: "அவர் ஒரு ஆசிரியர்.",
        sinhala: "ඔහු ගුරුවරයෙක්.",
      },
      rule: "ist",
      focus: 1,
      distractors: ["bin", "bist", "sind"],
      why: IST,
    },
    {
      id: "anna-aerztin",
      german: "Anna ist Ärztin.",
      meaning: {
        english: "Anna is a doctor.",
        tamil: "அன்னா ஒரு மருத்துவர்.",
        sinhala: "ඇනා වෛද්‍යවරියක්.",
      },
      rule: "ist",
      focus: 1,
      distractors: ["bin", "bist", "sind"],
      why: IST,
      transformTo: {
        id: "sie-aerztin",
        prompt: {
          english: 'Say "sie" instead of "Anna"',
          tamil: '"Anna" என்பதற்குப் பதிலாக "sie" சொல்',
          sinhala: '"Anna" වෙනුවට "sie" කියන්න',
        },
      },
    },
    {
      id: "sie-aerztin",
      german: "Sie ist Ärztin.",
      meaning: {
        english: "She is a doctor.",
        tamil: "அவள் ஒரு மருத்துவர்.",
        sinhala: "ඇය වෛද්‍යවරියක්.",
      },
      rule: "ist",
      focus: 1,
      distractors: ["bin", "bist", "sind"],
      why: IST,
    },
    {
      id: "kind-krank",
      german: "Das Kind ist krank.",
      meaning: {
        english: "The child is sick.",
        tamil: "குழந்தைக்கு உடம்பு சரியில்லை.",
        sinhala: "ළමයාට අසනීපයි.",
      },
      rule: "ist",
      focus: 2,
      distractors: ["bin", "bist", "sind"],
      why: IST,
      transformTo: {
        id: "es-krank",
        prompt: {
          english: 'Say "es" instead of "das Kind"',
          tamil: '"das Kind" என்பதற்குப் பதிலாக "es" சொல்',
          sinhala: '"das Kind" වෙනුවට "es" කියන්න',
        },
      },
    },
    {
      id: "es-krank",
      german: "Es ist krank.",
      meaning: {
        english: "It is sick.",
        tamil: "அதற்கு உடம்பு சரியில்லை.",
        sinhala: "එයාට අසනීපයි.",
      },
      rule: "ist",
      focus: 1,
      distractors: ["bin", "bist", "sind"],
      why: IST,
    },
    {
      id: "er-neu",
      german: "Er ist neu hier.",
      meaning: {
        english: "He is new here.",
        tamil: "அவன் இங்கே புதிதாக வந்திருக்கிறான்.",
        sinhala: "ඔහු මෙහෙට අලුත්.",
      },
      rule: "ist",
      focus: 1,
      distractors: ["bin", "bist", "sind"],
      why: IST,
    },
    {
      id: "sie-nett",
      german: "Sie ist nett.",
      meaning: {
        english: "She is nice.",
        tamil: "அவள் அன்பானவள்.",
        sinhala: "ඇය කරුණාවන්තයි.",
      },
      rule: "ist",
      focus: 1,
      distractors: ["bin", "bist", "sind"],
      why: IST,
    },
  ],
  pairs: [
    { left: "ich", right: "bin" },
    { left: "du", right: "bist" },
    { left: "Tom", right: "er" },
    { left: "Anna", right: "sie" },
    { left: "das Kind", right: "es" },
  ],
  sort: {
    groups: [
      { id: "bin", label: "bin", meaning: { english: "ich …", tamil: "ich …", sinhala: "ich …" } },
      { id: "bist", label: "bist", meaning: { english: "du …", tamil: "du …", sinhala: "du …" } },
      {
        id: "ist",
        label: "ist",
        meaning: { english: "er, sie, es …", tamil: "er, sie, es …", sinhala: "er, sie, es …" },
      },
    ],
    items: [
      { text: "ich", group: "bin" },
      { text: "du", group: "bist" },
      { text: "er", group: "ist" },
      { text: "sie", group: "ist" },
      { text: "es", group: "ist" },
      { text: "Tom", group: "ist" },
      { text: "Anna", group: "ist" },
      { text: "das Kind", group: "ist" },
    ],
  },
};

const WORDS_2: WordsTest = {
  kind: "words",
  testId: "G2.5",
  title: "Wörter 2",
  meaning: { english: "Words 2", tamil: "சொற்கள் 2", sinhala: "වචන 2" },
  words: [
    { lessonId: GRAMMAR_LESSON_ID, wordId: "wir" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "ihr" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "sie-they" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "sie-formal" },
    { lessonId: SMALL_WORDS_LESSON_ID, wordId: "und" },
    { lessonId: VERBS_LESSON_ID, wordId: "kommen" },
    { lessonId: VERBS_LESSON_ID, wordId: "wohnen" },
    { lessonId: PREPOSITIONS_LESSON_ID, wordId: "aus" },
    { lessonId: PREPOSITIONS_LESSON_ID, wordId: "in" },
  ],
  // Spelling two-letter words letter by letter isn't a useful drill.
  testTypes: [
    "training",
    "wordPicture",
    "picture",
    "meaning",
    "listen",
    "listenPicture",
    "translate",
    "listenBuild",
    "match",
  ],
};

const SIND: Localized = {
  english: '"wir" and "sie" (they) go with "sind".',
  tamil: '"wir", "sie" (அவர்கள்) உடன் "sind" வரும்.',
  sinhala: '"wir" සහ "sie" (ඔවුන්) සමඟ "sind" එනවා.',
};
const SEID: Localized = {
  english: '"ihr" goes with "seid".',
  tamil: '"ihr" உடன் "seid" வரும்.',
  sinhala: '"ihr" සමඟ "seid" එනවා.',
};
const FORMAL: Localized = {
  english: 'The polite "Sie" goes with the same verb as "wir": "sind", "heißen".',
  tamil: 'மரியாதையான "Sie" உடன் "wir" போலவே "sind", "heißen" வரும்.',
  sinhala: 'ගෞරවාන්විත "Sie" සමඟ "wir" වගේම "sind", "heißen" එනවා.',
};

const PLURAL: GrammarTest = {
  kind: "grammar",
  testId: "G2.6",
  title: "wir, ihr, sie, Sie",
  meaning: {
    english: "we, you all, they, polite you",
    tamil: "நாங்கள், நீங்கள், அவர்கள்",
    sinhala: "අපි, ඔයාලා, ඔවුන්, ඔබ",
  },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "plural",
      title: {
        english: '"we", "you all", "they"',
        tamil: '"நாங்கள்", "நீங்கள் (பலர்)", "அவர்கள்"',
        sinhala: '"අපි", "ඔයාලා", "ඔවුන්"',
      },
      text: {
        english: 'wir sind, ihr seid, sie sind. "ihr" is "you" for two or more friends.',
        tamil:
          'wir sind, ihr seid, sie sind. இரண்டு அல்லது அதற்கு மேற்பட்ட நண்பர்களிடம் "ihr" என்போம்.',
        sinhala: 'wir sind, ihr seid, sie sind. යාළුවෝ දෙන්නෙකුට හෝ වැඩි ගණනකට "ihr" කියනවා.',
      },
      examples: [{ id: "wir-hier" }, { id: "ihr-nett" }, { id: "sie-krank" }],
      table: [
        { left: "wir", right: "sind" },
        { left: "ihr", right: "seid" },
        { left: "sie", right: "sind" },
      ],
      check: {
        prompt: {
          english: 'Which word goes with "ihr"?',
          tamil: '"ihr" உடன் வரும் சொல் எது?',
          sinhala: '"ihr" සමඟ එන වචනය කුමක්ද?',
        },
        options: ["seid", "sind", "bist"],
        answer: "seid",
      },
    },
    {
      id: "formal",
      title: {
        english: '"Sie": the polite "you"',
        tamil: '"Sie": மரியாதையான "நீங்கள்"',
        sinhala: '"Sie": ගෞරවාන්විත "ඔබ"',
      },
      text: {
        english: '"Sie" with a capital S is the polite "you", for adults you don\'t know well.',
        tamil:
          'பெரிய S உடன் "Sie" என்பது மரியாதையான "நீங்கள்" — அதிகம் தெரியாத பெரியவர்களிடம் சொல்வோம்.',
        sinhala: 'කැපිටල් S සහිත "Sie" යනු ගෞරවාන්විත "ඔබ" — හොඳින් නොදන්නා වැඩිහිටියන්ට කියනවා.',
      },
      examples: [{ id: "sie-weber" }, { id: "wie-sie" }],
      table: [
        { left: "du", right: "bist, heißt" },
        { left: "Sie", right: "sind, heißen" },
      ],
      check: {
        prompt: {
          english: "How do you ask Frau Weber her name?",
          tamil: "Frau Weber-இடம் அவருடைய பெயரை எப்படிக் கேட்பாய்?",
          sinhala: "Frau Weber ගෙන් එයාගේ නම අහන්නේ කොහොමද?",
        },
        options: ["Wie heißen Sie?", "Wie heißt du?"],
        answer: "Wie heißen Sie?",
      },
    },
  ],
  sentences: [
    {
      id: "wir-hier",
      german: "Wir sind hier.",
      meaning: {
        english: "We are here.",
        tamil: "நாங்கள் இங்கே இருக்கிறோம்.",
        sinhala: "අපි මෙතන ඉන්නවා.",
      },
      rule: "plural",
      focus: 1,
      distractors: ["seid", "bin", "ist"],
      why: SIND,
    },
    {
      id: "wir-muede",
      german: "Wir sind müde.",
      meaning: {
        english: "We are tired.",
        tamil: "நாங்கள் சோர்வாக இருக்கிறோம்.",
        sinhala: "අපිට මහන්සියි.",
      },
      rule: "plural",
      focus: 1,
      distractors: ["seid", "bin", "ist"],
      why: SIND,
    },
    {
      id: "ihr-nett",
      german: "Ihr seid nett.",
      meaning: {
        english: "You (all) are nice.",
        tamil: "நீங்கள் அன்பானவர்கள்.",
        sinhala: "ඔයාලා කරුණාවන්තයි.",
      },
      rule: "plural",
      focus: 1,
      distractors: ["sind", "bist", "ist"],
      why: SEID,
    },
    {
      id: "ihr-neu",
      german: "Ihr seid neu hier.",
      meaning: {
        english: "You (all) are new here.",
        tamil: "நீங்கள் இங்கே புதிதாக வந்திருக்கிறீர்கள்.",
        sinhala: "ඔයාලා මෙහෙට අලුත්.",
      },
      rule: "plural",
      focus: 1,
      distractors: ["sind", "bist", "ist"],
      why: SEID,
    },
    {
      id: "anna-tom",
      german: "Anna und Tom sind krank.",
      meaning: {
        english: "Anna and Tom are sick.",
        tamil: "அன்னாவுக்கும் டாமுக்கும் உடம்பு சரியில்லை.",
        sinhala: "ඇනාට සහ ටොම්ට අසනීපයි.",
      },
      rule: "plural",
      focus: 3,
      distractors: ["ist", "seid"],
      why: SIND,
      transformTo: {
        id: "sie-krank",
        prompt: {
          english: 'Say "sie" instead of "Anna und Tom"',
          tamil: '"Anna und Tom" என்பதற்குப் பதிலாக "sie" சொல்',
          sinhala: '"Anna und Tom" වෙනුවට "sie" කියන්න',
        },
      },
    },
    {
      id: "sie-krank",
      german: "Sie sind krank.",
      meaning: {
        english: "They are sick.",
        tamil: "அவர்களுக்கு உடம்பு சரியில்லை.",
        sinhala: "ඔවුන්ට අසනීපයි.",
      },
      rule: "plural",
      focus: 1,
      distractors: ["seid", "ist"],
      why: SIND,
    },
    {
      id: "sie-weber",
      german: "Sie sind Frau Weber.",
      meaning: {
        english: "You are Mrs Weber.",
        tamil: "நீங்கள் திருமதி வெபர்.",
        sinhala: "ඔබ වෙබර් මහත්මිය.",
      },
      rule: "formal",
      focus: 1,
      distractors: ["bist", "ist", "seid"],
      why: FORMAL,
    },
    {
      id: "wie-sie",
      german: "Wie heißen Sie?",
      meaning: {
        english: "What is your name? (polite)",
        tamil: "உங்கள் பெயர் என்ன?",
        sinhala: "ඔබේ නම කුමක්ද?",
      },
      rule: "formal",
      focus: 1,
      distractors: ["heißt", "heiße"],
      why: FORMAL,
    },
    {
      id: "wie-du",
      german: "Wie heißt du?",
      meaning: WHAT_IS_YOUR_NAME,
      rule: "formal",
      focus: 1,
      distractors: ["heißen", "heiße"],
      why: DU_HEISST,
      transformTo: {
        id: "wie-sie",
        prompt: {
          english: 'Ask politely, with "Sie"',
          tamil: '"Sie" பயன்படுத்தி மரியாதையாகக் கேள்',
          sinhala: '"Sie" යොදා ගෞරවයෙන් අහන්න',
        },
      },
    },
    {
      id: "ich-weber",
      german: "Ich bin Frau Weber.",
      meaning: {
        english: "I am Mrs Weber.",
        tamil: "நான் திருமதி வெபர்.",
        sinhala: "මම වෙබර් මහත්මිය.",
      },
      rule: "formal",
      focus: 1,
      distractors: ["bist", "sind"],
      why: BIN,
      replyTo: {
        german: "Sind Sie Frau Weber?",
        meaning: {
          english: "Are you Mrs Weber?",
          tamil: "நீங்கள் திருமதி வெபரா?",
          sinhala: "ඔබ වෙබර් මහත්මියද?",
        },
        decoys: ["Du bist Frau Weber.", "Ich sind Frau Weber."],
      },
    },
  ],
  pairs: [
    { left: "wir", right: { english: "we", tamil: "நாங்கள்", sinhala: "අපි" } },
    {
      left: "ihr",
      right: { english: "you (friends)", tamil: "நீங்கள் (நண்பர்கள்)", sinhala: "ඔයාලා" },
    },
    {
      left: "Sie",
      right: { english: "you (polite)", tamil: "நீங்கள் (மரியாதை)", sinhala: "ඔබ" },
    },
    { left: "sie sind", right: { english: "they are", tamil: "அவர்கள்", sinhala: "ඔවුන්" } },
  ],
};

const AUS: Localized = {
  english: '"kommen" goes with "aus" (from).',
  tamil: '"kommen" உடன் "aus" (இருந்து) வரும்.',
  sinhala: '"kommen" සමඟ "aus" (සිට) එනවා.',
};
const IN: Localized = {
  english: '"wohnen" goes with "in".',
  tamil: '"wohnen" உடன் "in" வரும்.',
  sinhala: '"wohnen" සමඟ "in" එනවා.',
};

const FROM_LIVE: GrammarTest = {
  kind: "grammar",
  testId: "G2.7",
  title: "kommen aus, wohnen in",
  meaning: {
    english: "Where you're from, where you live",
    tamil: "எங்கிருந்து, எங்கே வசிக்கிறாய்",
    sinhala: "කොහෙන්ද, කොහෙද ජීවත් වෙන්නේ",
  },
  testTypes: [...ALL_SENTENCE_TYPES],
  rules: [
    {
      id: "kommen-aus",
      title: {
        english: "Where you're from: kommen aus",
        tamil: "எங்கிருந்து: kommen aus",
        sinhala: "කොහෙන්ද: kommen aus",
      },
      text: {
        english: '"aus" means "from". Ich komme aus … = I am from …',
        tamil: '"aus" என்றால் "இருந்து". Ich komme aus … = நான் …-இலிருந்து வருகிறேன்.',
        sinhala: '"aus" කියන්නේ "සිට". Ich komme aus … = මම … සිට එනවා.',
      },
      examples: [{ id: "ich-sri" }, { id: "du-oesterreich" }],
      table: [
        { left: "ich", right: "komme" },
        { left: "du", right: "kommst" },
        { left: "er, sie", right: "kommt" },
      ],
      check: {
        prompt: {
          english: 'Which word means "from"?',
          tamil: '"இருந்து" என்பதற்கான ஜெர்மன் சொல் எது?',
          sinhala: '"සිට" යන්නට ජර්මන් වචනය කුමක්ද?',
        },
        options: ["aus", "in"],
        answer: "aus",
      },
    },
    {
      id: "wohnen-in",
      title: {
        english: "Where you live: wohnen in",
        tamil: "எங்கே வசிக்கிறாய்: wohnen in",
        sinhala: "කොහෙද ජීවත් වෙන්නේ: wohnen in",
      },
      text: {
        english: "Ich wohne in … = I live in …",
        tamil: "Ich wohne in … = நான் …-இல் வசிக்கிறேன்.",
        sinhala: "Ich wohne in … = මම …වල ජීවත් වෙනවා.",
      },
      examples: [{ id: "ich-wien" }, { id: "du-wien" }],
      table: [
        { left: "ich", right: "wohne" },
        { left: "du", right: "wohnst" },
        { left: "er, sie", right: "wohnt" },
      ],
      check: {
        prompt: {
          english: "Which sentence says where you live?",
          tamil: "நீ எங்கே வசிக்கிறாய் என்று சொல்லும் வாக்கியம் எது?",
          sinhala: "ඔයා ජීවත් වෙන තැන කියන වාක්‍යය කුමක්ද?",
        },
        options: ["Ich wohne in Wien.", "Ich komme aus Wien."],
        answer: "Ich wohne in Wien.",
      },
    },
  ],
  sentences: [
    {
      id: "ich-sri",
      german: "Ich komme aus Sri Lanka.",
      meaning: {
        english: "I am from Sri Lanka.",
        tamil: "நான் இலங்கையிலிருந்து வருகிறேன்.",
        sinhala: "මම ශ්‍රී ලංකාවේ සිට එනවා.",
      },
      rule: "kommen-aus",
      focus: 2,
      distractors: ["in"],
      why: AUS,
      replyTo: {
        german: "Woher kommst du?",
        meaning: {
          english: "Where are you from?",
          tamil: "நீ எங்கிருந்து வருகிறாய்?",
          sinhala: "ඔයා කොහෙන්ද එන්නේ?",
        },
        decoys: ["Ich wohne in Sri Lanka.", "Du kommst aus Sri Lanka."],
      },
    },
    {
      id: "ich-indien",
      german: "Ich komme aus Indien.",
      meaning: {
        english: "I am from India.",
        tamil: "நான் இந்தியாவிலிருந்து வருகிறேன்.",
        sinhala: "මම ඉන්දියාවේ සිට එනවා.",
      },
      rule: "kommen-aus",
      focus: 2,
      distractors: ["in"],
      why: AUS,
    },
    {
      id: "du-oesterreich",
      german: "Du kommst aus Österreich.",
      meaning: {
        english: "You are from Austria.",
        tamil: "நீ ஆஸ்திரியாவிலிருந்து வருகிறாய்.",
        sinhala: "ඔයා ඔස්ට්‍රියාවේ සිට එනවා.",
      },
      rule: "kommen-aus",
      focus: 2,
      distractors: ["in"],
      why: AUS,
    },
    {
      id: "anna-de",
      german: "Anna kommt aus Deutschland.",
      meaning: {
        english: "Anna is from Germany.",
        tamil: "அன்னா ஜெர்மனியிலிருந்து வருகிறாள்.",
        sinhala: "ඇනා ජර්මනියේ සිට එනවා.",
      },
      rule: "kommen-aus",
      focus: 2,
      distractors: ["in"],
      why: AUS,
    },
    {
      id: "ich-wien",
      german: "Ich wohne in Wien.",
      meaning: {
        english: "I live in Vienna.",
        tamil: "நான் வியன்னாவில் வசிக்கிறேன்.",
        sinhala: "මම වියානාවේ ජීවත් වෙනවා.",
      },
      rule: "wohnen-in",
      focus: 2,
      distractors: ["aus"],
      why: IN,
      transformTo: { id: "du-wien", prompt: ABOUT_DU },
      replyTo: {
        german: "Wo wohnst du?",
        meaning: {
          english: "Where do you live?",
          tamil: "நீ எங்கே வசிக்கிறாய்?",
          sinhala: "ඔයා කොහෙද ජීවත් වෙන්නේ?",
        },
        decoys: ["Ich komme aus Wien.", "Du wohnst in Wien."],
      },
    },
    {
      id: "du-wien",
      german: "Du wohnst in Wien.",
      meaning: {
        english: "You live in Vienna.",
        tamil: "நீ வியன்னாவில் வசிக்கிறாய்.",
        sinhala: "ඔයා වියානාවේ ජීවත් වෙනවා.",
      },
      rule: "wohnen-in",
      focus: 2,
      distractors: ["aus"],
      why: IN,
      transformTo: { id: "ich-wien", prompt: ABOUT_ICH },
    },
    {
      id: "ich-berlin",
      german: "Ich wohne in Berlin.",
      meaning: {
        english: "I live in Berlin.",
        tamil: "நான் பெர்லினில் வசிக்கிறேன்.",
        sinhala: "මම බර්ලින්වල ජීවත් වෙනවා.",
      },
      rule: "wohnen-in",
      focus: 2,
      distractors: ["aus"],
      why: IN,
    },
    {
      id: "tom-graz",
      german: "Tom wohnt in Graz.",
      meaning: {
        english: "Tom lives in Graz.",
        tamil: "டாம் கிராஸில் வசிக்கிறான்.",
        sinhala: "ටොම් ග්‍රාස්වල ජීවත් වෙනවා.",
      },
      rule: "wohnen-in",
      focus: 2,
      distractors: ["aus"],
      why: IN,
    },
  ],
  pairs: [
    {
      left: "Ich komme aus",
      right: { english: "I am from", tamil: "நான் … இலிருந்து", sinhala: "මම … සිට" },
    },
    {
      left: "Ich wohne in",
      right: { english: "I live in", tamil: "நான் … இல் வசிக்கிறேன்", sinhala: "මම … ජීවත් වෙනවා" },
    },
    {
      left: "Woher kommst du?",
      right: {
        english: "Where are you from?",
        tamil: "நீ எங்கிருந்து வருகிறாய்?",
        sinhala: "ඔයා කොහෙන්ද එන්නේ?",
      },
    },
    {
      left: "Wo wohnst du?",
      right: {
        english: "Where do you live?",
        tamil: "நீ எங்கே வசிக்கிறாய்?",
        sinhala: "ඔයා කොහෙද ජීවත් වෙන්නේ?",
      },
    },
  ],
};

export const FIRST_SENTENCES_LESSON: GrammarLesson = {
  id: FIRST_SENTENCES_LESSON_ID,
  title: "Erste Sätze",
  icon: "💬",
  assetDir: "G2 first sentences",
  meaning: { english: "First sentences", tamil: "முதல் வாக்கியங்கள்", sinhala: "පළමු වාක්‍ය" },
  borrowsFrom: [
    JOBS_LESSON_ID,
    PERSONAL_LESSON_ID,
    QUESTIONS_LESSON_ID,
    VERBS_LESSON_ID,
    SMALL_WORDS_LESSON_ID,
    FEELINGS_LESSON_ID,
    DESCRIBING_LESSON_ID,
    PREPOSITIONS_LESSON_ID,
    POSITION_LESSON_ID,
    GRAMMAR_LESSON_ID,
  ],
  tests: [WORDS_1, HEISSEN, BIN_BIST, ER_SIE_ES, WORDS_2, PLURAL, FROM_LIVE],
};
