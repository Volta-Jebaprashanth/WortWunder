import type { GrammarLesson, GrammarTest, WordsTest } from "@/data/grammar/types";
import { GREETINGS_LESSON_ID } from "@/data/greetings";
import { PERSONAL_LESSON_ID } from "@/data/personal";
import { VERBS_LESSON_ID } from "@/data/verbs";
import { SMALL_WORDS_LESSON_ID } from "@/data/small-words";
import { GRAMMAR_LESSON_ID } from "@/data/grammar-words";

// G1 Los geht's: before any grammar, how German looks and sounds, and the
// names for the three kinds of word the rest of the section talks about
// (docs/planning/ROADMAP.md, section 3). The words in G1.2 and G1.3 are there for their
// sounds; every one already exists in a Wortschatz lesson, so its audio is
// the existing clip (WORD_AUDIO is keyed by the spoken text). G1.4's
// sentences have their own clips in public/G1 getting started/audio/.
//
// The Tamil and Sinhala strings are drafts and need a native speaker's
// review (docs/planning/ROADMAP.md, Open decisions).
export const GETTING_STARTED_LESSON_ID = "G1";

const WORDS: WordsTest = {
  kind: "words",
  testId: "G1.1",
  title: "Wörter",
  meaning: { english: "First words", tamil: "முதல் சொற்கள்", sinhala: "පළමු වචන" },
  words: [
    { lessonId: GREETINGS_LESSON_ID, wordId: "hallo" },
    { lessonId: GREETINGS_LESSON_ID, wordId: "tschuess" },
    { lessonId: GREETINGS_LESSON_ID, wordId: "danke" },
    { lessonId: GREETINGS_LESSON_ID, wordId: "bitte" },
    { lessonId: SMALL_WORDS_LESSON_ID, wordId: "ja" },
    { lessonId: SMALL_WORDS_LESSON_ID, wordId: "nein" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "ich" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "du" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "er" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "sie-she" },
    { lessonId: GRAMMAR_LESSON_ID, wordId: "es" },
    { lessonId: PERSONAL_LESSON_ID, wordId: "mann" },
    { lessonId: PERSONAL_LESSON_ID, wordId: "frau" },
    { lessonId: PERSONAL_LESSON_ID, wordId: "kind" },
    { lessonId: VERBS_LESSON_ID, wordId: "lernen" },
  ],
  // Spelling a two-letter pronoun letter by letter isn't a useful drill.
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

const LETTERS: GrammarTest = {
  kind: "grammar",
  testId: "G1.2",
  title: "ä, ö, ü, ß",
  meaning: { english: "The new letters", tamil: "புதிய எழுத்துகள்", sinhala: "අලුත් අකුරු" },
  testTypes: ["rule", "gapPick", "listenPick", "pairs", "gapType"],
  rules: [
    {
      id: "umlaut",
      title: {
        english: "Letters with two dots",
        tamil: "இரண்டு புள்ளிகள் உள்ள எழுத்துகள்",
        sinhala: "තිත් දෙකක් ඇති අකුරු",
      },
      text: {
        english: "The two dots change the sound of a, o and u. Listen and copy.",
        tamil: "இரண்டு புள்ளிகள் a, o, u-வின் ஒலியை மாற்றும். கேட்டு, அப்படியே சொல்லுங்கள்.",
        sinhala: "තිත් දෙක a, o, u අකුරුවල ශබ්දය වෙනස් කරනවා. අහලා, ඒ විදිහටම කියන්න.",
      },
      examples: [{ id: "maedchen" }, { id: "schoen" }, { id: "tuer" }],
      table: [
        {
          left: "ä",
          right: { english: 'like "e" in "bed"', tamil: '"எ" போல', sinhala: '"එ" වගේ' },
        },
        {
          left: "ö",
          right: {
            english: 'say "e" with round lips',
            tamil: 'உதடுகளைக் குவித்து "எ"',
            sinhala: 'තොල් රවුම් කරලා "එ"',
          },
        },
        {
          left: "ü",
          right: {
            english: 'say "ee" with round lips',
            tamil: 'உதடுகளைக் குவித்து "ஈ"',
            sinhala: 'තොල් රවුම් කරලා "ඊ"',
          },
        },
      ],
      check: {
        prompt: {
          english: "Which word has two dots?",
          tamil: "எந்தச் சொல்லில் இரண்டு புள்ளிகள் உள்ளன?",
          sinhala: "තිත් දෙකක් ඇති වචනය කුමක්ද?",
        },
        options: ["schön", "der Mann", "Hallo"],
        answer: "schön",
      },
    },
    {
      id: "eszett",
      title: {
        english: "ß: a sharp s",
        tamil: "ß: கூர்மையான s",
        sinhala: "ß: තියුණු s",
      },
      text: {
        english: 'ß sounds like "ss". It is never at the start of a word.',
        tamil: 'ß என்பது "ss" போல ஒலிக்கும். இது ஒருபோதும் சொல்லின் தொடக்கத்தில் வராது.',
        sinhala: 'ß "ss" වගේ ඇසෙනවා. එය කවදාවත් වචනයක මුලට එන්නේ නැහැ.',
      },
      examples: [{ id: "strasse" }, { id: "gross" }],
      table: [{ left: "ß", right: "ss" }],
      check: {
        prompt: {
          english: 'Which letter sounds like "ss"?',
          tamil: '"ss" போல ஒலிக்கும் எழுத்து எது?',
          sinhala: '"ss" වගේ ඇසෙන අකුර කුමක්ද?',
        },
        options: ["ß", "B", "ü"],
        answer: "ß",
      },
    },
  ],
  sentences: [
    {
      id: "maedchen",
      german: "das Mädchen",
      meaning: { english: "the girl", tamil: "சிறுமி", sinhala: "ගැහැනු ළමයා" },
      rule: "umlaut",
      focus: 1,
      focusPart: "ä",
      distractors: ["a", "e", "ö"],
    },
    {
      id: "kaese",
      german: "der Käse",
      meaning: { english: "the cheese", tamil: "பாலாடைக்கட்டி", sinhala: "චීස්" },
      rule: "umlaut",
      focus: 1,
      focusPart: "ä",
      distractors: ["a", "e", "ü"],
    },
    {
      id: "schoen",
      german: "schön",
      meaning: { english: "beautiful", tamil: "அழகான", sinhala: "ලස්සන" },
      rule: "umlaut",
      focus: 0,
      focusPart: "ö",
      distractors: ["o", "e", "ü"],
    },
    {
      id: "hoeren",
      german: "hören",
      meaning: { english: "to hear", tamil: "கேட்பது", sinhala: "අහනවා" },
      rule: "umlaut",
      focus: 0,
      focusPart: "ö",
      distractors: ["o", "e", "ä"],
    },
    {
      id: "tuer",
      german: "die Tür",
      meaning: { english: "the door", tamil: "கதவு", sinhala: "දොර" },
      rule: "umlaut",
      focus: 1,
      focusPart: "ü",
      distractors: ["u", "i", "ö"],
    },
    {
      id: "fuenf",
      german: "fünf",
      meaning: { english: "five", tamil: "ஐந்து", sinhala: "පහ" },
      rule: "umlaut",
      focus: 0,
      focusPart: "ü",
      distractors: ["u", "i", "ä"],
    },
    {
      id: "strasse",
      german: "die Straße",
      meaning: { english: "the street", tamil: "தெரு", sinhala: "වීදිය" },
      rule: "eszett",
      focus: 1,
      focusPart: "ß",
      distractors: ["B", "s", "z"],
    },
    {
      id: "gross",
      german: "groß",
      meaning: { english: "big", tamil: "பெரிய", sinhala: "ලොකු" },
      rule: "eszett",
      focus: 0,
      focusPart: "ß",
      distractors: ["B", "s", "z"],
    },
  ],
  pairs: [
    { left: "das Mädchen", right: "ä" },
    { left: "schön", right: "ö" },
    { left: "die Tür", right: "ü" },
    { left: "die Straße", right: "ß" },
  ],
  pairsPrompt: {
    english: "Match each word to the letter it has.",
    tamil: "ஒவ்வொரு சொல்லையும் அதிலுள்ள எழுத்துடன் இணைக்கவும்.",
    sinhala: "සෑම වචනයක්ම එහි ඇති අකුරට ගළපන්න.",
  },
};

const SOUNDS: GrammarTest = {
  kind: "grammar",
  testId: "G1.3",
  // The test covers ei, ie, eu, sch, ch, sp, st, w, v and z: too many to
  // list in a path title.
  title: "Neue Laute",
  meaning: {
    english: "Letters that sound different",
    tamil: "வேறுபட்டு ஒலிக்கும் எழுத்துகள்",
    sinhala: "වෙනස් විදිහට ඇසෙන අකුරු",
  },
  testTypes: ["rule", "gapPick", "listenPick", "pairs", "gapType"],
  rules: [
    {
      id: "ei-ie",
      title: { english: '"ei" and "ie"', tamil: '"ei" மற்றும் "ie"', sinhala: '"ei" සහ "ie"' },
      text: {
        english: 'ei sounds like English "eye". ie sounds like English "ee".',
        tamil: '"ei" என்பது "ஐ" போலவும், "ie" என்பது "ஈ" போலவும் ஒலிக்கும்.',
        sinhala: '"ei" "අයි" වගේත්, "ie" "ඊ" වගේත් ඇසෙනවා.',
      },
      examples: [{ id: "mein" }, { id: "wie" }, { id: "vier" }],
      table: [
        { left: "ei", right: { english: '"eye"', tamil: '"ஐ"', sinhala: '"අයි"' } },
        { left: "ie", right: { english: '"ee"', tamil: '"ஈ"', sinhala: '"ඊ"' } },
      ],
      check: {
        prompt: {
          english: 'Which word has the "ee" sound?',
          tamil: '"ஈ" ஒலி உள்ள சொல் எது?',
          sinhala: '"ඊ" ශබ්දය ඇති වචනය කුමක්ද?',
        },
        options: ["wie", "mein"],
        answer: "wie",
      },
    },
    {
      id: "eu-sch-ch",
      title: {
        english: '"eu", "sch" and "ch"',
        tamil: '"eu", "sch" மற்றும் "ch"',
        sinhala: '"eu", "sch" සහ "ch"',
      },
      text: {
        english: "These letters always make one sound together. Listen and copy.",
        tamil:
          "இந்த எழுத்துகள் சேர்ந்து எப்போதும் ஒரே ஒலியைத் தரும். கேட்டு, அப்படியே சொல்லுங்கள்.",
        sinhala: "මේ අකුරු එකට හැම විටම එක ශබ්දයක් දෙනවා. අහලා, ඒ විදිහටම කියන්න.",
      },
      examples: [{ id: "neu" }, { id: "schule" }, { id: "ich" }],
      table: [
        { left: "eu", right: { english: '"oy", as in "boy"', tamil: '"ஆய்"', sinhala: '"ඔයි"' } },
        { left: "sch", right: { english: '"sh"', tamil: '"ஷ"', sinhala: '"ෂ"' } },
        {
          left: "ch",
          right: {
            english: 'a soft "h", as in "huge"',
            tamil: 'மென்மையான "ஹ்"',
            sinhala: 'මෘදු "හ්"',
          },
        },
      ],
      check: {
        prompt: {
          english: 'Which word has the "sh" sound?',
          tamil: '"ஷ" ஒலி உள்ள சொல் எது?',
          sinhala: '"ෂ" ශබ්දය ඇති වචනය කුමක්ද?',
        },
        options: ["die Schule", "neu", "ich"],
        answer: "die Schule",
      },
    },
    {
      id: "sp-st",
      title: {
        english: '"sp" and "st" at the start',
        tamil: 'தொடக்கத்தில் "sp", "st"',
        sinhala: 'මුලදී "sp" සහ "st"',
      },
      text: {
        english: 'At the start of a word, sp sounds like "shp" and st like "sht".',
        tamil:
          'ஒரு சொல்லின் தொடக்கத்தில் "sp" என்பது "ஷ்ப்" போலவும், "st" என்பது "ஷ்ட்" போலவும் ஒலிக்கும்.',
        sinhala: 'වචනයක මුලදී "sp" "ෂ්ප්" වගේත්, "st" "ෂ්ට්" වගේත් ඇසෙනවා.',
      },
      examples: [{ id: "spielen" }, { id: "stuhl" }],
      table: [
        { left: "sp", right: { english: '"shp"', tamil: '"ஷ்ப்"', sinhala: '"ෂ්ප්"' } },
        { left: "st", right: { english: '"sht"', tamil: '"ஷ்ட்"', sinhala: '"ෂ්ට්"' } },
      ],
      check: {
        prompt: {
          english: 'Which word starts with "sht"?',
          tamil: '"ஷ்ட்" ஒலியுடன் தொடங்கும் சொல் எது?',
          sinhala: '"ෂ්ට්" ශබ්දයෙන් පටන් ගන්නා වචනය කුමක්ද?',
        },
        options: ["der Stuhl", "das Wasser", "ich"],
        answer: "der Stuhl",
      },
    },
    {
      id: "w-v-z",
      title: {
        english: '"w", "v" and "z"',
        tamil: '"w", "v" மற்றும் "z"',
        sinhala: '"w", "v" සහ "z"',
      },
      text: {
        english: "These three letters do not sound like they do in English.",
        tamil: "இந்த மூன்று எழுத்துகளும் ஆங்கிலத்தில் ஒலிப்பது போல ஒலிக்காது.",
        sinhala: "මේ අකුරු තුන ඉංග්‍රීසියේ වගේ ඇසෙන්නේ නැහැ.",
      },
      examples: [{ id: "wasser" }, { id: "vater" }, { id: "zeit" }],
      table: [
        { left: "w", right: { english: '"v"', tamil: '"வ"', sinhala: '"ව"' } },
        { left: "v", right: { english: '"f"', tamil: '"ஃப"', sinhala: '"ෆ"' } },
        { left: "z", right: { english: '"ts"', tamil: '"ட்ஸ"', sinhala: '"ට්ස"' } },
      ],
      check: {
        prompt: {
          english: 'Which word starts with an "f" sound?',
          tamil: '"ஃப" ஒலியுடன் தொடங்கும் சொல் எது?',
          sinhala: '"ෆ" ශබ්දයෙන් පටන් ගන්නා වචනය කුමක්ද?',
        },
        options: ["der Vater", "das Wasser", "die Zeit"],
        answer: "der Vater",
      },
    },
  ],
  sentences: [
    {
      id: "mein",
      german: "mein",
      meaning: { english: "my", tamil: "என்னுடைய", sinhala: "මගේ" },
      rule: "ei-ie",
      focus: 0,
      focusPart: "ei",
      distractors: ["ie", "eu", "e"],
    },
    {
      id: "wie",
      german: "wie",
      meaning: { english: "how", tamil: "எப்படி", sinhala: "කොහොමද" },
      rule: "ei-ie",
      focus: 0,
      focusPart: "ie",
      distractors: ["ei", "eu", "i"],
    },
    {
      id: "vier",
      german: "vier",
      meaning: { english: "four", tamil: "நான்கு", sinhala: "හතර" },
      rule: "ei-ie",
      focus: 0,
      focusPart: "ie",
      distractors: ["ei", "eu", "i"],
    },
    {
      id: "neu",
      german: "neu",
      meaning: { english: "new", tamil: "புதிய", sinhala: "අලුත්" },
      rule: "eu-sch-ch",
      focus: 0,
      focusPart: "eu",
      distractors: ["ei", "ie", "u"],
    },
    {
      id: "heute",
      german: "heute",
      meaning: { english: "today", tamil: "இன்று", sinhala: "අද" },
      rule: "eu-sch-ch",
      focus: 0,
      focusPart: "eu",
      distractors: ["ei", "ie", "au"],
    },
    {
      id: "schule",
      german: "die Schule",
      meaning: { english: "the school", tamil: "பள்ளி", sinhala: "පාසල" },
      rule: "eu-sch-ch",
      focus: 1,
      focusPart: "Sch",
      distractors: ["S", "Sh", "Ch"],
    },
    {
      id: "ich",
      german: "ich",
      meaning: { english: "I", tamil: "நான்", sinhala: "මම" },
      rule: "eu-sch-ch",
      focus: 0,
      focusPart: "ch",
      distractors: ["sch", "h", "k"],
    },
    {
      id: "spielen",
      german: "spielen",
      meaning: { english: "to play", tamil: "விளையாடுவது", sinhala: "සෙල්ලම් කරනවා" },
      rule: "sp-st",
      focus: 0,
      focusPart: "sp",
      distractors: ["schp", "sch", "p"],
    },
    {
      id: "stuhl",
      german: "der Stuhl",
      meaning: { english: "the chair", tamil: "நாற்காலி", sinhala: "පුටුව" },
      rule: "sp-st",
      focus: 1,
      focusPart: "St",
      distractors: ["Scht", "Sch", "T"],
    },
    {
      id: "wasser",
      german: "das Wasser",
      meaning: { english: "the water", tamil: "தண்ணீர்", sinhala: "වතුර" },
      rule: "w-v-z",
      focus: 1,
      focusPart: "W",
      distractors: ["V", "F", "B"],
    },
    {
      id: "vater",
      german: "der Vater",
      meaning: { english: "the father", tamil: "அப்பா", sinhala: "තාත්තා" },
      rule: "w-v-z",
      focus: 1,
      focusPart: "V",
      distractors: ["F", "W", "Ph"],
    },
    {
      id: "zeit",
      german: "die Zeit",
      meaning: { english: "the time", tamil: "நேரம்", sinhala: "වෙලාව" },
      rule: "w-v-z",
      focus: 1,
      focusPart: "Z",
      distractors: ["Ts", "C", "S"],
    },
  ],
  // Each word holds exactly one of the sounds on the right, so no pair can
  // be right for a reason the board doesn't accept ("die Zeit" has ei as
  // well as z, "die Schule" has the ie of "die").
  pairs: [
    { left: "mein", right: "ei" },
    { left: "wie", right: "ie" },
    { left: "neu", right: "eu" },
    { left: "schön", right: "sch" },
    { left: "zehn", right: "z" },
  ],
  pairsPrompt: {
    english: "Match each word to the sound it has.",
    tamil: "ஒவ்வொரு சொல்லையும் அதிலுள்ள ஒலியுடன் இணைக்கவும்.",
    sinhala: "සෑම වචනයක්ම එහි ඇති ශබ්දයට ගළපන්න.",
  },
};

const PRONOUN_WHY = {
  english: '"er" is "he", "sie" is "she", "es" is "it".',
  tamil: '"er" என்பது "அவன்", "sie" என்பது "அவள்", "es" என்பது "அது".',
  sinhala: '"er" යනු "ඔහු", "sie" යනු "ඇය", "es" යනු "එය".',
};

const KINDS: GrammarTest = {
  kind: "grammar",
  testId: "G1.4",
  title: "Nomen, Verb, Pronomen",
  meaning: {
    english: "Three kinds of word",
    tamil: "மூன்று வகைச் சொற்கள்",
    sinhala: "වචන වර්ග තුනක්",
  },
  testTypes: ["rule", "gapPick", "sentenceMeaning", "listenPick", "sort", "pairs", "gapType"],
  rules: [
    {
      id: "nomen",
      title: {
        english: "Nomen: names of people and things",
        tamil: "Nomen: மனிதர்கள், பொருட்களின் பெயர்கள்",
        sinhala: "Nomen: මිනිසුන්ගේ සහ දේවල්වල නම්",
      },
      text: {
        english: "A Nomen names a person or a thing. It always starts with a capital letter.",
        tamil:
          "Nomen என்பது ஒரு நபர் அல்லது பொருளின் பெயர். அது எப்போதும் பெரிய எழுத்தில் (capital) தொடங்கும்.",
        sinhala: "Nomen යනු පුද්ගලයෙකුගේ හෝ දෙයක නමයි. එය හැම විටම කැපිටල් අකුරකින් පටන් ගන්නවා.",
      },
      examples: [
        { id: "anna", highlight: 0 },
        { id: "mann", highlight: 1 },
        { id: "kind", highlight: 1 },
      ],
      check: {
        prompt: {
          english: "Which word is a Nomen?",
          tamil: "எந்தச் சொல் Nomen?",
          sinhala: "Nomen එක කුමක්ද?",
        },
        options: ["die Frau", "lernen", "du"],
        answer: "die Frau",
      },
    },
    {
      id: "verb",
      title: {
        english: "Verb: the action word",
        tamil: "Verb: செயல் சொல்",
        sinhala: "Verb: ක්‍රියා වචනය",
      },
      text: {
        english: "A Verb says what someone does. Its ending changes with the person.",
        tamil: "Verb ஒருவர் என்ன செய்கிறார் என்று சொல்லும். அதன் முடிவு ஆளுக்கு ஏற்ப மாறும்.",
        sinhala: "Verb එකෙන් කෙනෙක් කරන දේ කියනවා. එහි අග පුද්ගලයා අනුව වෙනස් වෙනවා.",
      },
      examples: [
        { id: "ich", highlight: 1 },
        { id: "du", highlight: 1 },
        { id: "anna", highlight: 1 },
      ],
      table: [
        { left: "ich", right: "lerne" },
        { left: "du", right: "lernst" },
        { left: "Anna", right: "lernt" },
      ],
      check: {
        prompt: {
          english: "Which word is the Verb?",
          tamil: "எந்தச் சொல் Verb?",
          sinhala: "Verb එක කුමක්ද?",
        },
        options: ["lernen", "das Kind", "ja"],
        answer: "lernen",
      },
    },
    {
      id: "pronomen",
      title: {
        english: "Pronomen: a short word for a person or thing",
        tamil: "Pronomen: ஒரு நபர் அல்லது பொருளுக்கான சிறு சொல்",
        sinhala: "Pronomen: පුද්ගලයෙකුට හෝ දෙයකට කෙටි වචනයක්",
      },
      text: {
        english:
          "A Pronomen is a short word for a person or thing: ich, du, er, sie, es. er, sie and es stand in for a Nomen, so you don't say the name again.",
        tamil:
          "Pronomen என்பது ஒரு நபர் அல்லது பொருளுக்கான சிறு சொல்: ich, du, er, sie, es. பெயரை மீண்டும் சொல்லாமல் இருக்க, er, sie, es ஒரு Nomen-க்குப் பதிலாக வரும்.",
        sinhala:
          "Pronomen යනු පුද්ගලයෙකුට හෝ දෙයකට කෙටි වචනයක්: ich, du, er, sie, es. නම නැවත නොකියා ඉන්න, er, sie, es Nomen එකක් වෙනුවට එනවා.",
      },
      examples: [
        { id: "mann", highlight: 1 },
        { id: "er", highlight: 0 },
      ],
      table: [
        { left: "der Mann", right: "er" },
        { left: "die Frau", right: "sie" },
        { left: "das Kind", right: "es" },
      ],
      check: {
        prompt: {
          english: 'Which word can stand in for "die Frau"?',
          tamil: '"die Frau" என்பதற்குப் பதிலாக எந்தச் சொல் வரும்?',
          sinhala: '"die Frau" වෙනුවට එන්නේ කුමන වචනයද?',
        },
        options: ["sie", "er", "es"],
        answer: "sie",
      },
    },
  ],
  sentences: [
    {
      id: "anna",
      german: "Anna lernt.",
      nounFirst: true,
      meaning: { english: "Anna learns.", tamil: "அன்னா கற்கிறாள்.", sinhala: "ඇනා ඉගෙන ගන්නවා." },
      rule: "nomen",
    },
    {
      id: "sie",
      german: "Sie lernt.",
      meaning: { english: "She learns.", tamil: "அவள் கற்கிறாள்.", sinhala: "ඇය ඉගෙන ගන්නවා." },
      rule: "pronomen",
      focus: 0,
      distractors: ["Er", "Es"],
      why: PRONOUN_WHY,
    },
    {
      id: "tom",
      german: "Tom lernt.",
      nounFirst: true,
      meaning: { english: "Tom learns.", tamil: "டாம் கற்கிறான்.", sinhala: "ටොම් ඉගෙන ගන්නවා." },
      rule: "nomen",
    },
    {
      id: "er",
      german: "Er lernt.",
      meaning: { english: "He learns.", tamil: "அவன் கற்கிறான்.", sinhala: "ඔහු ඉගෙන ගන්නවා." },
      rule: "pronomen",
      focus: 0,
      distractors: ["Sie", "Es"],
      why: PRONOUN_WHY,
    },
    {
      id: "mann",
      german: "Der Mann lernt.",
      meaning: {
        english: "The man learns.",
        tamil: "அந்த ஆண் கற்கிறார்.",
        sinhala: "මිනිසා ඉගෙන ගන්නවා.",
      },
      rule: "nomen",
    },
    {
      id: "frau",
      german: "Die Frau lernt.",
      meaning: {
        english: "The woman learns.",
        tamil: "அந்தப் பெண் கற்கிறார்.",
        sinhala: "කාන්තාව ඉගෙන ගන්නවා.",
      },
      rule: "nomen",
    },
    {
      id: "kind",
      german: "Das Kind lernt.",
      meaning: {
        english: "The child learns.",
        tamil: "குழந்தை கற்கிறது.",
        sinhala: "ළමයා ඉගෙන ගන්නවා.",
      },
      rule: "nomen",
    },
    {
      id: "es",
      german: "Es lernt.",
      meaning: { english: "It learns.", tamil: "அது கற்கிறது.", sinhala: "එය ඉගෙන ගන්නවා." },
      rule: "pronomen",
      focus: 0,
      distractors: ["Er", "Sie"],
      why: {
        english: '"es" stands in for a "das" word, like "das Kind".',
        tamil: '"es" என்பது "das Kind" போன்ற "das" சொல்லுக்குப் பதிலாக வரும்.',
        sinhala: '"es" එන්නේ "das Kind" වගේ "das" වචනයක් වෙනුවටයි.',
      },
    },
    {
      id: "ich",
      german: "Ich lerne.",
      meaning: { english: "I learn.", tamil: "நான் கற்கிறேன்.", sinhala: "මම ඉගෙන ගන්නවා." },
      rule: "verb",
      focus: 0,
      distractors: ["Du", "Er"],
      why: {
        english: '"I" is "ich". "du" is "you".',
        tamil: '"நான்" என்பது "ich". "du" என்பது "நீ".',
        sinhala: '"මම" යනු "ich". "du" යනු "ඔයා".',
      },
    },
    {
      id: "du",
      german: "Du lernst.",
      meaning: { english: "You learn.", tamil: "நீ கற்கிறாய்.", sinhala: "ඔයා ඉගෙන ගන්නවා." },
      rule: "verb",
      focus: 0,
      distractors: ["Ich", "Er"],
      why: {
        english: '"you" (a friend, a child) is "du". "ich" is "I".',
        tamil: '"நீ" என்பது "du". "ich" என்பது "நான்".',
        sinhala: '"ඔයා" යනු "du". "ich" යනු "මම".',
      },
    },
  ],
  sort: {
    groups: [
      {
        id: "nomen",
        label: "Nomen",
        meaning: { english: "person, thing", tamil: "நபர், பொருள்", sinhala: "පුද්ගලයා, දෙය" },
      },
      {
        id: "verb",
        label: "Verb",
        meaning: { english: "action", tamil: "செயல்", sinhala: "ක්‍රියාව" },
      },
      {
        id: "pronomen",
        label: "Pronomen",
        meaning: { english: "ich, du, er …", tamil: "ich, du, er …", sinhala: "ich, du, er …" },
      },
    ],
    items: [
      { text: "Anna", group: "nomen" },
      { text: "der Mann", group: "nomen" },
      { text: "die Frau", group: "nomen" },
      { text: "das Kind", group: "nomen" },
      { text: "lernen", group: "verb" },
      { text: "lernt", group: "verb" },
      { text: "er", group: "pronomen" },
      { text: "sie", group: "pronomen" },
      { text: "ich", group: "pronomen" },
      { text: "du", group: "pronomen" },
    ],
  },
  pairs: [
    { left: "der Mann", right: "er" },
    { left: "die Frau", right: "sie" },
    { left: "das Kind", right: "es" },
  ],
  pairsPrompt: {
    english: "Match each Nomen to its Pronomen.",
    tamil: "ஒவ்வொரு Nomen-ஐயும் அதன் Pronomen-உடன் இணைக்கவும்.",
    sinhala: "සෑම Nomen එකක්ම එහි Pronomen එකට ගළපන්න.",
  },
};

export const GETTING_STARTED_LESSON: GrammarLesson = {
  id: GETTING_STARTED_LESSON_ID,
  title: "Los geht's",
  icon: "🚀",
  assetDir: "G1 getting started",
  meaning: { english: "Getting started", tamil: "தொடங்குவோம்", sinhala: "පටන් ගනිමු" },
  borrowsFrom: [
    GREETINGS_LESSON_ID,
    PERSONAL_LESSON_ID,
    VERBS_LESSON_ID,
    SMALL_WORDS_LESSON_ID,
    GRAMMAR_LESSON_ID,
  ],
  tests: [WORDS, LETTERS, SOUNDS, KINDS],
};
