import type { GrammarLesson, GrammarTest, Localized, WordsTest } from "@/data/grammar/types";
import { QUESTIONS_LESSON_ID } from "@/data/questions";
import { SMALL_WORDS_LESSON_ID } from "@/data/small-words";
import { VERBS_LESSON_ID } from "@/data/verbs";

// G4 Fragen: yes/no questions (the verb moves to the front), questions with
// a question word (wer, was, wie, wo, woher, wohin, wann; the verb is still
// second), and answering with ja, nein and doch (docs/planning/ROADMAP.md,
// section 3). One word test, then one grammar test per step. Every sentence
// and every replyTo line has its own clip in public/G4 questions/audio/.
//
// The lesson uses only words from G1 to G3 plus its own word test. English
// "do" and "-ing" have no German form; G4.2's second card says so once, and
// the meanings use whichever English sounds natural.
//
// The Tamil and Sinhala strings are drafts and need a native speaker's
// review (docs/planning/ROADMAP.md, Open decisions).
export const QUESTIONS_GRAMMAR_LESSON_ID = "G4";

const MAKE_QUESTION: Localized = {
  english: "Make it a question",
  tamil: "இதைக் கேள்வியாக மாற்று",
  sinhala: "මෙය ප්‍රශ්නයක් කරන්න",
};
const MAKE_STATEMENT: Localized = {
  english: "Make it a statement",
  tamil: "இதைக் கூற்றாக மாற்று",
  sinhala: "මෙය ප්‍රකාශයක් කරන්න",
};
const SAY_NO: Localized = {
  english: 'Answer with "nein"',
  tamil: '"nein" என்று பதில் சொல்',
  sinhala: '"nein" කියලා උත්තර දෙන්න',
};
const SAY_YES: Localized = {
  english: 'Answer with "ja"',
  tamil: '"ja" என்று பதில் சொல்',
  sinhala: '"ja" කියලා උත්තර දෙන්න',
};
const MATCH_QUESTION_WORD: Localized = {
  english: "Match each question word to its meaning.",
  tamil: "ஒவ்வொரு கேள்விச் சொல்லையும் அதன் பொருளுடன் இணைக்கவும்.",
  sinhala: "සෑම ප්‍රශ්න වචනයක්ම එහි අර්ථයට ගළපන්න.",
};
const WHICH_RIGHT: Localized = {
  english: "Which sentence is right?",
  tamil: "எந்த வாக்கியம் சரி?",
  sinhala: "නිවැරදි වාක්‍යය කුමක්ද?",
};

const WORDS: WordsTest = {
  kind: "words",
  testId: "G4.1",
  title: "Wörter",
  meaning: { english: "Words", tamil: "சொற்கள்", sinhala: "වචන" },
  words: [
    { lessonId: QUESTIONS_LESSON_ID, wordId: "wer" },
    { lessonId: QUESTIONS_LESSON_ID, wordId: "was" },
    { lessonId: QUESTIONS_LESSON_ID, wordId: "wo" },
    { lessonId: QUESTIONS_LESSON_ID, wordId: "woher" },
    { lessonId: QUESTIONS_LESSON_ID, wordId: "wohin" },
    { lessonId: QUESTIONS_LESSON_ID, wordId: "wann" },
    { lessonId: SMALL_WORDS_LESSON_ID, wordId: "nicht" },
    { lessonId: SMALL_WORDS_LESSON_ID, wordId: "morgen" },
    { lessonId: VERBS_LESSON_ID, wordId: "gehen" },
  ],
  // In no Wortschatz lesson yet.
  newWords: [
    {
      id: "doch",
      image: "/G4 questions/images/yes-after-not.jpg",
      full: "doch",
      english: 'Yes (to a "not" question)',
      tamil: 'ஆம் ("இல்லையா" கேள்விக்கு)',
      sinhala: 'ඔව් ("නැද්ද" ප්‍රශ්නයකට)',
    },
    {
      id: "nach-hause",
      image: "/G4 questions/images/home.jpg",
      full: "nach Hause",
      english: "Home (going home)",
      tamil: "வீட்டுக்கு",
      sinhala: "ගෙදර (යනවා)",
    },
  ],
  // Spelling "nach Hause" and "doch" letter by letter isn't the point here;
  // the words are for the questions that follow.
  testTypes: [
    "training",
    "wordPicture",
    "picture",
    "meaning",
    "listen",
    "listenPicture",
    "translate",
    "match",
  ],
};

// G4.2 ------------------------------------------------------------------
// Five ideas, each said as a statement and as a question. The two halves
// mean different things (You are tired. / Are you tired?), so unlike G3.6
// this test keeps sentenceMeaning and listenPick: telling the two apart is
// the rule. No gaps and no spot: the forms are the ones G2 and G3 taught;
// what's new is the order.

const VERB_FIRST: Localized = {
  english: "In a yes/no question the verb comes first, then the person.",
  tamil: "ஆம்/இல்லை கேள்வியில் வினைச்சொல் முதலில், பிறகு ஆள்.",
  sinhala: "ඔව්/නැහැ ප්‍රශ්නයක ක්‍රියාපදය මුලින්ම, ඊට පස්සේ පුද්ගලයා.",
};
const VERB_SECOND: Localized = {
  english: "In a statement the person comes first and the verb second.",
  tamil: "கூற்று வாக்கியத்தில் ஆள் முதலில், வினைச்சொல் இரண்டாவது.",
  sinhala: "ප්‍රකාශයක පුද්ගලයා මුලින්, ක්‍රියාපදය දෙවැනියට.",
};

const YES_NO: GrammarTest = {
  kind: "grammar",
  testId: "G4.2",
  title: "Kommst du?",
  meaning: {
    english: "Yes/no questions",
    tamil: "ஆம்/இல்லை கேள்விகள்",
    sinhala: "ඔව්/නැහැ ප්‍රශ්න",
  },
  testTypes: [
    "rule",
    "sentenceMeaning",
    "listenPick",
    "order",
    "transform",
    "meaningBuild",
    "listenBuild",
  ],
  rules: [
    {
      id: "verb-first",
      title: {
        english: "Yes/no question: the verb comes first",
        tamil: "ஆம்/இல்லை கேள்வி: வினைச்சொல் முதலில்",
        sinhala: "ඔව්/නැහැ ප්‍රශ්නය: ක්‍රියාපදය මුලින්",
      },
      text: {
        english:
          "To ask a yes/no question, put the verb at the front: Du bist müde. → Bist du müde?",
        tamil: "ஆம்/இல்லை கேள்வி கேட்க, வினைச்சொல்லை முன்னால் வை: Du bist müde. → Bist du müde?",
        sinhala:
          "ඔව්/නැහැ ප්‍රශ්නයක් අහන්න, ක්‍රියාපදය ඉස්සරහට දාන්න: Du bist müde. → Bist du müde?",
      },
      examples: [
        { id: "du-muede", highlight: 1 },
        { id: "bist-muede", highlight: 0 },
        { id: "kommst-indien", highlight: 0 },
      ],
      check: {
        prompt: WHICH_RIGHT,
        // Not "Du bist müde?": said with a rising voice, that is a real
        // (surprised) question in spoken German.
        options: ["Bist du müde?", "Du müde bist?"],
        answer: "Bist du müde?",
      },
    },
    {
      id: "no-do",
      title: {
        english: 'No "do" in German',
        tamil: 'ஜெர்மனில் "do" இல்லை',
        sinhala: 'ජර්මන් භාෂාවේ "do" නැහැ',
      },
      text: {
        english:
          'English adds "do" or "does". German just moves the verb: Spielt Tom Fußball? = Does Tom play football? or Is Tom playing football?',
        tamil:
          'ஆங்கிலத்தில் "do" அல்லது "does" சேர்க்கிறார்கள். ஜெர்மனில் வினைச்சொல்லை மட்டும் முன்னால் நகர்த்து: Spielt Tom Fußball? = டாம் கால்பந்து விளையாடுகிறானா?',
        sinhala:
          'ඉංග්‍රීසියේ "do" හෝ "does" එකතු කරනවා. ජර්මන් භාෂාවේ ක්‍රියාපදය විතරක් ඉස්සරහට ගේනවා: Spielt Tom Fußball? = ටොම් පාපන්දු ගහනවද?',
      },
      examples: [
        { id: "spielt-tom", highlight: 0 },
        { id: "wohnt-anna", highlight: 0 },
      ],
      check: {
        prompt: {
          english: 'Which one is "Does Anna live in Vienna?"',
          tamil: '"அன்னா வியன்னாவில் வசிக்கிறாளா?" எது?',
          sinhala: '"ඇනා වියානාවේ ජීවත් වෙනවද?" කුමක්ද?',
        },
        options: ["Wohnt Anna in Wien?", "Anna wohnt in Wien."],
        answer: "Wohnt Anna in Wien?",
      },
    },
  ],
  sentences: [
    {
      id: "du-muede",
      german: "Du bist müde.",
      meaning: {
        english: "You are tired.",
        tamil: "நீ களைப்பாக இருக்கிறாய்.",
        sinhala: "ඔයා මහන්සියි.",
      },
      rule: "verb-first",
      why: VERB_SECOND,
      distractors: ["bin"],
      transformTo: { id: "bist-muede", prompt: MAKE_QUESTION },
    },
    {
      id: "bist-muede",
      german: "Bist du müde?",
      meaning: {
        english: "Are you tired?",
        tamil: "நீ களைப்பாக இருக்கிறாயா?",
        sinhala: "ඔයා මහන්සිද?",
      },
      rule: "verb-first",
      why: VERB_FIRST,
      distractors: ["ist"],
      transformTo: { id: "du-muede", prompt: MAKE_STATEMENT },
    },
    {
      id: "du-indien",
      german: "Du kommst aus Indien.",
      meaning: {
        english: "You are from India.",
        tamil: "நீ இந்தியாவிலிருந்து வருகிறாய்.",
        sinhala: "ඔයා ඉන්දියාවේ සිට එනවා.",
      },
      rule: "verb-first",
      why: VERB_SECOND,
      distractors: ["komme", "in"],
      transformTo: { id: "kommst-indien", prompt: MAKE_QUESTION },
    },
    {
      id: "kommst-indien",
      german: "Kommst du aus Indien?",
      meaning: {
        english: "Are you from India?",
        tamil: "நீ இந்தியாவிலிருந்து வருகிறாயா?",
        sinhala: "ඔයා ඉන්දියාවේ සිට එනවද?",
      },
      rule: "verb-first",
      why: VERB_FIRST,
      distractors: ["kommt", "in"],
      transformTo: { id: "du-indien", prompt: MAKE_STATEMENT },
    },
    {
      id: "du-zeit",
      german: "Du hast heute Zeit.",
      alternatives: ["Heute hast du Zeit."],
      meaning: {
        english: "You have time today.",
        tamil: "உனக்கு இன்று நேரம் இருக்கிறது.",
        sinhala: "ඔයාට අද වෙලාව තියෙනවා.",
      },
      rule: "verb-first",
      why: VERB_SECOND,
      distractors: ["habe"],
      transformTo: { id: "hast-zeit", prompt: MAKE_QUESTION },
    },
    {
      id: "hast-zeit",
      german: "Hast du heute Zeit?",
      meaning: {
        english: "Do you have time today?",
        tamil: "உனக்கு இன்று நேரம் இருக்கிறதா?",
        sinhala: "ඔයාට අද වෙලාව තියෙනවද?",
      },
      rule: "verb-first",
      why: VERB_FIRST,
      distractors: ["hat"],
      transformTo: { id: "du-zeit", prompt: MAKE_STATEMENT },
    },
    {
      id: "tom-spielt",
      german: "Tom spielt Fußball.",
      nounFirst: true,
      meaning: {
        english: "Tom plays football.",
        tamil: "டாம் கால்பந்து விளையாடுகிறான்.",
        sinhala: "ටොම් පාපන්දු ගහනවා.",
      },
      rule: "no-do",
      why: VERB_SECOND,
      distractors: ["spielst"],
      transformTo: { id: "spielt-tom", prompt: MAKE_QUESTION },
    },
    {
      id: "spielt-tom",
      german: "Spielt Tom Fußball?",
      meaning: {
        english: "Does Tom play football?",
        tamil: "டாம் கால்பந்து விளையாடுகிறானா?",
        sinhala: "ටොම් පාපන්දු ගහනවද?",
      },
      rule: "no-do",
      why: VERB_FIRST,
      distractors: ["spielst"],
      transformTo: { id: "tom-spielt", prompt: MAKE_STATEMENT },
    },
    {
      id: "anna-wohnt",
      german: "Anna wohnt in Wien.",
      nounFirst: true,
      meaning: {
        english: "Anna lives in Vienna.",
        tamil: "அன்னா வியன்னாவில் வசிக்கிறாள்.",
        sinhala: "ඇනා වියානාවේ ජීවත් වෙනවා.",
      },
      rule: "no-do",
      why: VERB_SECOND,
      distractors: ["aus"],
      transformTo: { id: "wohnt-anna", prompt: MAKE_QUESTION },
    },
    {
      id: "wohnt-anna",
      german: "Wohnt Anna in Wien?",
      meaning: {
        english: "Does Anna live in Vienna?",
        tamil: "அன்னா வியன்னாவில் வசிக்கிறாளா?",
        sinhala: "ඇනා වියානාවේ ජීවත් වෙනවද?",
      },
      rule: "no-do",
      why: VERB_FIRST,
      distractors: ["aus"],
      transformTo: { id: "anna-wohnt", prompt: MAKE_STATEMENT },
    },
  ],
};

// G4.3 ------------------------------------------------------------------
// The gap is the question word. Some wrong ones make real German ("Was
// kommt heute?"), which is fair because the meaning under the sentence
// rules them out. The answers (Ich trinke Wasser.) are there for `reply`.

const WER: Localized = {
  english: '"wer" (who) asks about a person.',
  tamil: '"wer" (யார்) ஒரு நபரைப் பற்றிக் கேட்கும்.',
  sinhala: '"wer" (කවුද) පුද්ගලයෙක් ගැන අහනවා.',
};
const WAS: Localized = {
  english: '"was" (what) asks about a thing or an action.',
  tamil: '"was" (என்ன) ஒரு பொருள் அல்லது செயலைப் பற்றிக் கேட்கும்.',
  sinhala: '"was" (මොකක්ද) දෙයක් හෝ ක්‍රියාවක් ගැන අහනවා.',
};
const WIE: Localized = {
  english: '"wie" (how) asks for a name: Wie heißt du? = What is your name?',
  tamil: '"wie" (எப்படி) பெயரைக் கேட்கும்: Wie heißt du? = உன் பெயர் என்ன?',
  sinhala: '"wie" (කොහොමද) නම අහනවා: Wie heißt du? = ඔයාගේ නම මොකක්ද?',
};
const W_SECOND: Localized = {
  english: "The question word comes first, the verb second.",
  tamil: "கேள்விச் சொல் முதலில், வினைச்சொல் இரண்டாவது.",
  sinhala: "ප්‍රශ්න වචනය මුලින්, ක්‍රියාපදය දෙවැනියට.",
};

const WER_WAS_WIE: GrammarTest = {
  kind: "grammar",
  testId: "G4.3",
  title: "wer, was, wie",
  meaning: {
    english: "who, what, how",
    tamil: "யார், என்ன, எப்படி",
    sinhala: "කවුද, මොකක්ද, කොහොමද",
  },
  testTypes: [
    "rule",
    "gapPick",
    "sentenceMeaning",
    "listenPick",
    "pairs",
    "order",
    "spot",
    "meaningBuild",
    "gapType",
    "listenBuild",
    "reply",
  ],
  rules: [
    {
      id: "wer-was",
      title: {
        english: "wer = who, was = what",
        tamil: "wer = யார், was = என்ன",
        sinhala: "wer = කවුද, was = මොකක්ද",
      },
      text: {
        english:
          'A question can start with a question word: "wer" (who) or "was" (what). The verb comes second: Was machst du?',
        tamil:
          'கேள்விச் சொல்லுடன் கேள்வி தொடங்கலாம்: "wer" (யார்) அல்லது "was" (என்ன). வினைச்சொல் இரண்டாவது: Was machst du?',
        sinhala:
          'ප්‍රශ්නයක් ප්‍රශ්න වචනයකින් පටන් ගන්න පුළුවන්: "wer" (කවුද) හෝ "was" (මොකක්ද). ක්‍රියාපදය දෙවැනියට: Was machst du?',
      },
      examples: [{ id: "wer-kommt" }, { id: "was-machst" }],
      table: [
        { left: "wer", right: { english: "who", tamil: "யார்", sinhala: "කවුද" } },
        { left: "was", right: { english: "what", tamil: "என்ன", sinhala: "මොකක්ද" } },
      ],
      check: {
        prompt: {
          english: 'Which word means "who"?',
          tamil: '"யார்" என்பதற்கான ஜெர்மன் சொல் எது?',
          sinhala: '"කවුද" යන්නට ජර්මන් වචනය කුමක්ද?',
        },
        options: ["wer", "was", "wie"],
        answer: "wer",
      },
    },
    {
      id: "wie",
      title: {
        english: "wie = how",
        tamil: "wie = எப்படி",
        sinhala: "wie = කොහොමද",
      },
      text: {
        english:
          'To ask a name, German says "how": Wie heißt du? = What is your name? The verb is second here too.',
        tamil:
          'பெயர் கேட்க ஜெர்மனில் "எப்படி" என்று சொல்வார்கள்: Wie heißt du? = உன் பெயர் என்ன? இங்கும் வினைச்சொல் இரண்டாவது.',
        sinhala:
          'නම අහන්න ජර්මන් භාෂාවේ "කොහොමද" කියනවා: Wie heißt du? = ඔයාගේ නම මොකක්ද? මෙතනත් ක්‍රියාපදය දෙවැනියට.',
      },
      examples: [{ id: "wie-heisst" }, { id: "wie-heissen-sie" }],
      check: {
        prompt: {
          english: 'Which one is "What is your name?"',
          tamil: '"உன் பெயர் என்ன?" எது?',
          sinhala: '"ඔයාගේ නම මොකක්ද?" කුමක්ද?',
        },
        options: ["Wie heißt du?", "Was heißt du?"],
        answer: "Wie heißt du?",
      },
    },
  ],
  sentences: [
    {
      id: "wer-kommt",
      german: "Wer kommt heute?",
      meaning: {
        english: "Who is coming today?",
        tamil: "இன்று யார் வருகிறார்கள்?",
        sinhala: "අද කවුද එන්නේ?",
      },
      rule: "wer-was",
      focus: 0,
      distractors: ["Was", "Wie"],
      why: WER,
    },
    {
      id: "wer-spielt",
      german: "Wer spielt Fußball?",
      meaning: {
        english: "Who plays football?",
        tamil: "யார் கால்பந்து விளையாடுகிறார்கள்?",
        sinhala: "කවුද පාපන්දු ගහන්නේ?",
      },
      rule: "wer-was",
      focus: 0,
      distractors: ["Was", "Wie"],
      why: WER,
    },
    {
      id: "tom-spielt",
      german: "Tom spielt Fußball.",
      nounFirst: true,
      meaning: {
        english: "Tom plays football.",
        tamil: "டாம் கால்பந்து விளையாடுகிறான்.",
        sinhala: "ටොම් පාපන්දු ගහනවා.",
      },
      rule: "wer-was",
      replyTo: {
        german: "Wer spielt Fußball?",
        meaning: {
          english: "Who plays football?",
          tamil: "யார் கால்பந்து விளையாடுகிறார்கள்?",
          sinhala: "කවුද පාපන්දු ගහන්නේ?",
        },
        decoys: ["Ich trinke Wasser.", "Tom spielst Fußball."],
      },
    },
    {
      id: "was-machst",
      german: "Was machst du?",
      meaning: {
        english: "What are you doing?",
        tamil: "நீ என்ன செய்கிறாய்?",
        sinhala: "ඔයා මොකද කරන්නේ?",
      },
      rule: "wer-was",
      focus: 0,
      distractors: ["Wer", "Wie"],
      why: WAS,
    },
    {
      id: "was-trinkst",
      german: "Was trinkst du?",
      meaning: {
        english: "What are you drinking?",
        tamil: "நீ என்ன குடிக்கிறாய்?",
        sinhala: "ඔයා මොකද බොන්නේ?",
      },
      rule: "wer-was",
      focus: 0,
      distractors: ["Wer", "Wie"],
      why: WAS,
    },
    {
      id: "ich-trinke",
      german: "Ich trinke Wasser.",
      meaning: {
        english: "I am drinking water.",
        tamil: "நான் தண்ணீர் குடிக்கிறேன்.",
        sinhala: "මම වතුර බොනවා.",
      },
      rule: "wer-was",
      replyTo: {
        german: "Was trinkst du?",
        meaning: {
          english: "What are you drinking?",
          tamil: "நீ என்ன குடிக்கிறாய்?",
          sinhala: "ඔයා මොකද බොන්නේ?",
        },
        decoys: ["Ich heiße Anna.", "Ich trinkst Wasser."],
      },
    },
    {
      id: "was-lernt",
      german: "Was lernt ihr?",
      meaning: {
        english: "What are you all learning?",
        tamil: "நீங்கள் என்ன கற்கிறீர்கள்?",
        sinhala: "ඔයාලා මොකද ඉගෙන ගන්නේ?",
      },
      rule: "wer-was",
      focus: 0,
      distractors: ["Wer", "Wie"],
      why: WAS,
    },
    {
      id: "wie-heisst",
      german: "Wie heißt du?",
      meaning: {
        english: "What is your name?",
        tamil: "உன் பெயர் என்ன?",
        sinhala: "ඔයාගේ නම මොකක්ද?",
      },
      rule: "wie",
      focus: 0,
      distractors: ["Was", "Wer"],
      why: WIE,
    },
    {
      id: "wie-heissen-sie",
      german: "Wie heißen Sie?",
      formal: true,
      meaning: {
        english: "What is your name? (polite)",
        tamil: "உங்கள் பெயர் என்ன? (மரியாதை)",
        sinhala: "ඔබේ නම මොකක්ද?",
      },
      rule: "wie",
      focus: 0,
      distractors: ["Was", "Wer"],
      why: WIE,
    },
    {
      id: "wie-heisst-lehrer",
      german: "Wie heißt der Lehrer?",
      meaning: {
        english: "What is the teacher's name?",
        tamil: "ஆசிரியரின் பெயர் என்ன?",
        sinhala: "ගුරුතුමාගේ නම මොකක්ද?",
      },
      rule: "wie",
      focus: 0,
      distractors: ["Was", "Wer"],
      why: WIE,
    },
  ],
  pairs: [
    { left: "wer", right: { english: "who", tamil: "யார்", sinhala: "කවුද" } },
    { left: "was", right: { english: "what", tamil: "என்ன", sinhala: "මොකක්ද" } },
    { left: "wie", right: { english: "how", tamil: "எப்படி", sinhala: "කොහොමද" } },
  ],
  pairsPrompt: MATCH_QUESTION_WORD,
};

// G4.4 ------------------------------------------------------------------
// wo and woher come back from G2.7 next to the new wohin and wann.

const WO: Localized = {
  english: '"wo" (where) asks about the place someone is in.',
  tamil: '"wo" (எங்கே) ஒருவர் இருக்கும் இடத்தைக் கேட்கும்.',
  sinhala: '"wo" (කොහේද) කෙනෙක් ඉන්න තැන අහනවා.',
};
const WOHER: Localized = {
  english: '"woher" (where from) asks where someone comes from.',
  tamil: '"woher" (எங்கிருந்து) ஒருவர் எங்கிருந்து வருகிறார் என்று கேட்கும்.',
  sinhala: '"woher" (කොහේ ඉඳලාද) කෙනෙක් එන තැන අහනවා.',
};
const WOHIN: Localized = {
  english: '"wohin" (where to) asks where someone is going.',
  tamil: '"wohin" (எங்கே நோக்கி) ஒருவர் எங்கே போகிறார் என்று கேட்கும்.',
  sinhala: '"wohin" (කොහාටද) කෙනෙක් යන තැන අහනවා.',
};
const WANN: Localized = {
  english: '"wann" (when) asks about the time.',
  tamil: '"wann" (எப்போது) நேரத்தைப் பற்றிக் கேட்கும்.',
  sinhala: '"wann" (කවදාද) වෙලාව ගැන අහනවා.',
};

const WOHIN_WANN: GrammarTest = {
  kind: "grammar",
  testId: "G4.4",
  title: "wo, woher, wohin, wann",
  meaning: {
    english: "where, where from, where to, when",
    tamil: "எங்கே, எங்கிருந்து, எங்கே நோக்கி, எப்போது",
    sinhala: "කොහේද, කොහේ ඉඳලාද, කොහාටද, කවදාද",
  },
  testTypes: [
    "rule",
    "gapPick",
    "sentenceMeaning",
    "listenPick",
    "pairs",
    "order",
    "spot",
    "meaningBuild",
    "gapType",
    "listenBuild",
    "reply",
  ],
  rules: [
    {
      id: "wo-woher-wohin",
      title: {
        english: "wo, woher, wohin",
        tamil: "wo, woher, wohin",
        sinhala: "wo, woher, wohin",
      },
      text: {
        english:
          '"wo" = where, "woher" = where from, "wohin" = where to. The verb comes second: Wohin gehst du?',
        tamil:
          '"wo" = எங்கே, "woher" = எங்கிருந்து, "wohin" = எங்கே நோக்கி. வினைச்சொல் இரண்டாவது: Wohin gehst du?',
        sinhala:
          '"wo" = කොහේද, "woher" = කොහේ ඉඳලාද, "wohin" = කොහාටද. ක්‍රියාපදය දෙවැනියට: Wohin gehst du?',
      },
      examples: [{ id: "wo-wohnst" }, { id: "woher-anna" }, { id: "wohin-gehst" }],
      table: [
        { left: "wo", right: { english: "where", tamil: "எங்கே", sinhala: "කොහේද" } },
        {
          left: "woher",
          right: { english: "where from", tamil: "எங்கிருந்து", sinhala: "කොහේ ඉඳලාද" },
        },
        {
          left: "wohin",
          right: { english: "where to", tamil: "எங்கே நோக்கி", sinhala: "කොහාටද" },
        },
      ],
      check: {
        prompt: {
          english: 'Which word means "where to"?',
          tamil: '"எங்கே நோக்கி" என்பதற்கான ஜெர்மன் சொல் எது?',
          sinhala: '"කොහාටද" යන්නට ජර්මන් වචනය කුමක්ද?',
        },
        options: ["wohin", "woher", "wo"],
        answer: "wohin",
      },
    },
    {
      id: "wann",
      title: { english: "wann = when", tamil: "wann = எப்போது", sinhala: "wann = කවදාද" },
      text: {
        english: '"wann" asks about the time. The verb comes second: Wann kommst du?',
        tamil: '"wann" நேரத்தைப் பற்றிக் கேட்கும். வினைச்சொல் இரண்டாவது: Wann kommst du?',
        sinhala: '"wann" වෙලාව ගැන අහනවා. ක්‍රියාපදය දෙවැනියට: Wann kommst du?',
      },
      examples: [{ id: "wann-kommst" }, { id: "ich-komme-morgen" }],
      check: {
        prompt: {
          english: 'Which word means "when"?',
          tamil: '"எப்போது" என்பதற்கான ஜெர்மன் சொல் எது?',
          sinhala: '"කවදාද" යන්නට ජර්මන් වචනය කුමක්ද?',
        },
        options: ["wann", "wer", "wo"],
        answer: "wann",
      },
    },
  ],
  sentences: [
    {
      id: "wo-wohnst",
      german: "Wo wohnst du?",
      meaning: {
        english: "Where do you live?",
        tamil: "நீ எங்கே வசிக்கிறாய்?",
        sinhala: "ඔයා කොහෙද ජීවත් වෙන්නේ?",
      },
      rule: "wo-woher-wohin",
      focus: 0,
      distractors: ["Woher", "Wohin"],
      why: WO,
    },
    {
      id: "woher-anna",
      german: "Woher kommt Anna?",
      meaning: {
        english: "Where is Anna from?",
        tamil: "அன்னா எங்கிருந்து வருகிறாள்?",
        sinhala: "ඇනා කොහෙන්ද එන්නේ?",
      },
      rule: "wo-woher-wohin",
      focus: 0,
      distractors: ["Wo", "Wohin"],
      why: WOHER,
    },
    {
      id: "wohin-gehst",
      german: "Wohin gehst du?",
      meaning: {
        english: "Where are you going?",
        tamil: "நீ எங்கே போகிறாய்?",
        sinhala: "ඔයා කොහාටද යන්නේ?",
      },
      rule: "wo-woher-wohin",
      focus: 0,
      distractors: ["Wo", "Woher"],
      why: WOHIN,
    },
    {
      id: "wohin-tom",
      german: "Wohin geht Tom?",
      meaning: {
        english: "Where is Tom going?",
        tamil: "டாம் எங்கே போகிறான்?",
        sinhala: "ටොම් කොහාටද යන්නේ?",
      },
      rule: "wo-woher-wohin",
      focus: 0,
      distractors: ["Wo", "Woher"],
      why: WOHIN,
    },
    {
      id: "ich-gehe-hause",
      german: "Ich gehe nach Hause.",
      meaning: {
        english: "I am going home.",
        tamil: "நான் வீட்டுக்குப் போகிறேன்.",
        sinhala: "මම ගෙදර යනවා.",
      },
      rule: "wo-woher-wohin",
      replyTo: {
        german: "Wohin gehst du?",
        meaning: {
          english: "Where are you going?",
          tamil: "நீ எங்கே போகிறாய்?",
          sinhala: "ඔයා කොහාටද යන්නේ?",
        },
        decoys: ["Ich wohne in Wien.", "Ich gehst nach Hause."],
      },
    },
    {
      id: "wann-kommst",
      german: "Wann kommst du?",
      meaning: {
        english: "When are you coming?",
        tamil: "நீ எப்போது வருகிறாய்?",
        sinhala: "ඔයා කවදාද එන්නේ?",
      },
      rule: "wann",
      focus: 0,
      distractors: ["Wer", "Wohin"],
      why: WANN,
    },
    {
      id: "ich-komme-morgen",
      german: "Ich komme morgen.",
      meaning: {
        english: "I am coming tomorrow.",
        tamil: "நான் நாளை வருகிறேன்.",
        sinhala: "මම හෙට එනවා.",
      },
      rule: "wann",
      replyTo: {
        german: "Wann kommst du?",
        meaning: {
          english: "When are you coming?",
          tamil: "நீ எப்போது வருகிறாய்?",
          sinhala: "ඔයා කවදාද එන්නේ?",
        },
        decoys: ["Ich komme aus Wien.", "Ich kommst morgen."],
      },
    },
    {
      id: "wann-zeit",
      german: "Wann hast du Zeit?",
      meaning: {
        english: "When do you have time?",
        tamil: "உனக்கு எப்போது நேரம் இருக்கிறது?",
        sinhala: "ඔයාට කවදාද වෙලාව තියෙන්නේ?",
      },
      rule: "wann",
      focus: 0,
      distractors: ["Wer", "Wohin"],
      why: WANN,
    },
    {
      id: "ich-zeit-morgen",
      german: "Ich habe morgen Zeit.",
      alternatives: ["Morgen habe ich Zeit."],
      meaning: {
        english: "I have time tomorrow.",
        tamil: "எனக்கு நாளை நேரம் இருக்கிறது.",
        sinhala: "මට හෙට වෙලාව තියෙනවා.",
      },
      rule: "wann",
      replyTo: {
        german: "Wann hast du Zeit?",
        meaning: {
          english: "When do you have time?",
          tamil: "உனக்கு எப்போது நேரம் இருக்கிறது?",
          sinhala: "ඔයාට කවදාද වෙලාව තියෙන්නේ?",
        },
        decoys: ["Ich gehe nach Hause.", "Ich hast morgen Zeit."],
      },
    },
  ],
  pairs: [
    { left: "wo", right: { english: "where", tamil: "எங்கே", sinhala: "කොහේද" } },
    {
      left: "woher",
      right: { english: "where from", tamil: "எங்கிருந்து", sinhala: "කොහේ ඉඳලාද" },
    },
    { left: "wohin", right: { english: "where to", tamil: "எங்கே நோக்கி", sinhala: "කොහාටද" } },
    { left: "wann", right: { english: "when", tamil: "எப்போது", sinhala: "කවදාද" } },
  ],
  pairsPrompt: MATCH_QUESTION_WORD,
};

// G4.5 ------------------------------------------------------------------
// Answers to yes/no questions. "Ja" and "Doch" both mean "yes", so neither
// is ever a gap or a decoy tile: without the question in view, the meaning
// can't tell them apart. They meet in `reply` (which shows the question)
// and on the sort board. Each reply offers exactly one right answer: a "ja"
// question never offers the matching "nein" answer, and the other way round.

const JA: Localized = {
  english: 'To say yes to a question without "nicht", use "ja".',
  tamil: '"nicht" இல்லாத கேள்விக்கு ஆம் சொல்ல "ja" பயன்படுத்து.',
  sinhala: '"nicht" නැති ප්‍රශ්නයකට ඔව් කියන්න "ja" යොදන්න.',
};
const NEIN: Localized = {
  english: 'To say no, use "nein", and "nicht" (not) after the verb: Nein, ich komme nicht.',
  tamil:
    'இல்லை என்று சொல்ல "nein", வினைச்சொல்லுக்குப் பின் "nicht" (இல்லை): Nein, ich komme nicht.',
  sinhala: 'නැහැ කියන්න "nein", ක්‍රියාපදයට පස්සේ "nicht" (නැහැ): Nein, ich komme nicht.',
};
const DOCH: Localized = {
  english: 'To say yes to a question with "nicht", use "doch".',
  tamil: '"nicht" உள்ள கேள்விக்கு ஆம் சொல்ல "doch" பயன்படுத்து.',
  sinhala: '"nicht" තියෙන ප්‍රශ්නයකට ඔව් කියන්න "doch" යොදන්න.',
};

const ARE_YOU_COMING: Localized = {
  english: "Are you coming?",
  tamil: "நீ வருகிறாயா?",
  sinhala: "ඔයා එනවද?",
};
const ARE_YOU_TIRED: Localized = {
  english: "Are you tired?",
  tamil: "நீ களைப்பாக இருக்கிறாயா?",
  sinhala: "ඔයා මහන්සිද?",
};
const DO_YOU_LIVE: Localized = {
  english: "Do you live in Vienna?",
  tamil: "நீ வியன்னாவில் வசிக்கிறாயா?",
  sinhala: "ඔයා වියානාවේ ජීවත් වෙනවද?",
};

const JA_NEIN_DOCH: GrammarTest = {
  kind: "grammar",
  testId: "G4.5",
  title: "ja, nein, doch",
  meaning: {
    english: 'yes, no, and yes to a "not" question',
    tamil: 'ஆம், இல்லை, "இல்லையா" கேள்விக்கு ஆம்',
    sinhala: 'ඔව්, නැහැ, "නැද්ද" ප්‍රශ්නයකට ඔව්',
  },
  testTypes: [
    "rule",
    "listenPick",
    "sort",
    "order",
    "transform",
    "meaningBuild",
    "listenBuild",
    "reply",
  ],
  rules: [
    {
      id: "ja-nein",
      title: { english: "ja and nein", tamil: "ja, nein", sinhala: "ja සහ nein" },
      text: {
        english:
          'Answer a yes/no question with "ja" or "nein". For no, add "nicht" (not) after the verb: Nein, ich komme nicht.',
        tamil:
          'ஆம்/இல்லை கேள்விக்கு "ja" அல்லது "nein" என்று பதில் சொல். இல்லை என்றால் வினைச்சொல்லுக்குப் பின் "nicht" சேர்: Nein, ich komme nicht.',
        sinhala:
          'ඔව්/නැහැ ප්‍රශ්නයකට "ja" හෝ "nein" කියලා උත්තර දෙන්න. නැහැ නම් ක්‍රියාපදයට පස්සේ "nicht" එකතු කරන්න: Nein, ich komme nicht.',
      },
      examples: [{ id: "ja-komme" }, { id: "nein-komme" }],
      check: {
        prompt: {
          english: 'Which one is "No, I am not coming."?',
          tamil: '"இல்லை, நான் வரவில்லை." எது?',
          sinhala: '"නැහැ, මම එන්නේ නැහැ." කුමක්ද?',
        },
        options: ["Nein, ich komme nicht.", "Nein, ich komme."],
        answer: "Nein, ich komme nicht.",
      },
    },
    {
      id: "doch",
      title: {
        english: 'doch: yes to a "not" question',
        tamil: 'doch: "இல்லையா" கேள்விக்கு ஆம்',
        sinhala: 'doch: "නැද්ද" ප්‍රශ්නයකට ඔව්',
      },
      text: {
        english:
          'When the question has "nicht", say "doch" for yes: Kommst du nicht? (Aren\'t you coming?) Doch, ich komme.',
        tamil:
          'கேள்வியில் "nicht" இருந்தால், ஆம் என்பதற்கு "doch" சொல்: Kommst du nicht? (நீ வரவில்லையா?) Doch, ich komme.',
        sinhala:
          'ප්‍රශ්නයේ "nicht" තියෙනවා නම්, ඔව් කියන්න "doch" කියන්න: Kommst du nicht? (ඔයා එන්නේ නැද්ද?) Doch, ich komme.',
      },
      examples: [{ id: "doch-komme" }, { id: "doch-muede" }],
      check: {
        prompt: {
          english: "Bist du nicht müde? You are tired. What do you say?",
          tamil: "Bist du nicht müde? நீ களைப்பாக இருக்கிறாய். என்ன சொல்வாய்?",
          sinhala: "Bist du nicht müde? ඔයා මහන්සියි. මොකක්ද කියන්නේ?",
        },
        options: ["Doch, ich bin müde.", "Ja, ich bin müde."],
        answer: "Doch, ich bin müde.",
      },
    },
  ],
  sentences: [
    {
      id: "ja-komme",
      german: "Ja, ich komme.",
      meaning: {
        english: "Yes, I am coming.",
        tamil: "ஆம், நான் வருகிறேன்.",
        sinhala: "ඔව්, මම එනවා.",
      },
      rule: "ja-nein",
      why: JA,
      distractors: ["kommst"],
      transformTo: { id: "nein-komme", prompt: SAY_NO },
      replyTo: {
        german: "Kommst du?",
        meaning: ARE_YOU_COMING,
        decoys: ["Doch, ich komme.", "Ja, ich kommst."],
      },
    },
    {
      id: "nein-komme",
      german: "Nein, ich komme nicht.",
      meaning: {
        english: "No, I am not coming.",
        tamil: "இல்லை, நான் வரவில்லை.",
        sinhala: "නැහැ, මම එන්නේ නැහැ.",
      },
      rule: "ja-nein",
      why: NEIN,
      distractors: ["kommst"],
      transformTo: { id: "ja-komme", prompt: SAY_YES },
      replyTo: {
        german: "Kommst du?",
        meaning: ARE_YOU_COMING,
        decoys: ["Doch, ich komme nicht.", "Nein, ich komme."],
      },
    },
    {
      id: "doch-komme",
      german: "Doch, ich komme.",
      meaning: {
        english: "Yes, I am coming!",
        tamil: "ஆமாம், நான் வருகிறேன்!",
        sinhala: "ඔව්, මම එනවා!",
      },
      rule: "doch",
      why: DOCH,
      distractors: ["kommst"],
      replyTo: {
        german: "Kommst du nicht?",
        meaning: {
          english: "Aren't you coming?",
          tamil: "நீ வரவில்லையா?",
          sinhala: "ඔයා එන්නේ නැද්ද?",
        },
        decoys: ["Nein, ich komme.", "Doch, ich kommst."],
      },
    },
    {
      id: "ja-muede",
      german: "Ja, ich bin müde.",
      meaning: {
        english: "Yes, I am tired.",
        tamil: "ஆம், நான் களைப்பாக இருக்கிறேன்.",
        sinhala: "ඔව්, මම මහන්සියි.",
      },
      rule: "ja-nein",
      why: JA,
      distractors: ["bist"],
      transformTo: { id: "nein-muede", prompt: SAY_NO },
      replyTo: {
        german: "Bist du müde?",
        meaning: ARE_YOU_TIRED,
        decoys: ["Doch, ich bin müde.", "Ja, ich bist müde."],
      },
    },
    {
      id: "nein-muede",
      german: "Nein, ich bin nicht müde.",
      meaning: {
        english: "No, I am not tired.",
        tamil: "இல்லை, நான் களைப்பாக இல்லை.",
        sinhala: "නැහැ, මම මහන්සි නැහැ.",
      },
      rule: "ja-nein",
      why: NEIN,
      distractors: ["bist"],
      transformTo: { id: "ja-muede", prompt: SAY_YES },
      replyTo: {
        german: "Bist du müde?",
        meaning: ARE_YOU_TIRED,
        decoys: ["Nein, ich bin müde.", "Doch, ich bin nicht müde."],
      },
    },
    {
      id: "doch-muede",
      german: "Doch, ich bin müde.",
      meaning: {
        english: "Yes, I am tired!",
        tamil: "ஆமாம், நான் களைப்பாக இருக்கிறேன்!",
        sinhala: "ඔව්, මම මහන්සියි!",
      },
      rule: "doch",
      why: DOCH,
      distractors: ["bist"],
      replyTo: {
        german: "Bist du nicht müde?",
        meaning: {
          english: "Aren't you tired?",
          tamil: "நீ களைப்பாக இல்லையா?",
          sinhala: "ඔයා මහන්සි නැද්ද?",
        },
        decoys: ["Nein, ich bin müde.", "Doch, ich bist müde."],
      },
    },
    {
      id: "ja-wien",
      german: "Ja, ich wohne in Wien.",
      meaning: {
        english: "Yes, I live in Vienna.",
        tamil: "ஆம், நான் வியன்னாவில் வசிக்கிறேன்.",
        sinhala: "ඔව්, මම වියානාවේ ජීවත් වෙනවා.",
      },
      rule: "ja-nein",
      why: JA,
      distractors: ["wohnst"],
      transformTo: { id: "nein-wien", prompt: SAY_NO },
      replyTo: {
        german: "Wohnst du in Wien?",
        meaning: DO_YOU_LIVE,
        decoys: ["Doch, ich wohne in Wien.", "Ja, ich wohnst in Wien."],
      },
    },
    {
      id: "nein-wien",
      german: "Nein, ich wohne nicht in Wien.",
      meaning: {
        english: "No, I don't live in Vienna.",
        tamil: "இல்லை, நான் வியன்னாவில் வசிக்கவில்லை.",
        sinhala: "නැහැ, මම වියානාවේ ජීවත් වෙන්නේ නැහැ.",
      },
      rule: "ja-nein",
      why: NEIN,
      distractors: ["wohnst"],
      transformTo: { id: "ja-wien", prompt: SAY_YES },
      replyTo: {
        german: "Wohnst du in Wien?",
        meaning: DO_YOU_LIVE,
        decoys: ["Nein, ich wohne in Wien.", "Doch, ich wohne nicht in Wien."],
      },
    },
    {
      id: "doch-wien",
      german: "Doch, ich wohne in Wien.",
      meaning: {
        english: "Yes, I do live in Vienna!",
        tamil: "ஆமாம், நான் வியன்னாவில்தான் வசிக்கிறேன்!",
        sinhala: "ඔව්, මම වියානාවේ ජීවත් වෙනවා!",
      },
      rule: "doch",
      why: DOCH,
      distractors: ["wohnst"],
      replyTo: {
        german: "Wohnst du nicht in Wien?",
        meaning: {
          english: "Don't you live in Vienna?",
          tamil: "நீ வியன்னாவில் வசிக்கவில்லையா?",
          sinhala: "ඔයා වියානාවේ ජීවත් වෙන්නේ නැද්ද?",
        },
        decoys: ["Nein, ich wohne in Wien.", "Doch, ich wohnst in Wien."],
      },
    },
  ],
  sort: {
    groups: [
      {
        id: "ja",
        label: "Ja, …",
        meaning: {
          english: 'yes to a question without "nicht"',
          tamil: '"nicht" இல்லாத கேள்விக்கு ஆம்',
          sinhala: '"nicht" නැති ප්‍රශ්නයකට ඔව්',
        },
      },
      {
        id: "doch",
        label: "Doch, …",
        meaning: {
          english: 'yes to a question with "nicht"',
          tamil: '"nicht" உள்ள கேள்விக்கு ஆம்',
          sinhala: '"nicht" තියෙන ප්‍රශ්නයකට ඔව්',
        },
      },
    ],
    items: [
      { text: "Kommst du?", group: "ja" },
      { text: "Bist du müde?", group: "ja" },
      { text: "Wohnst du in Wien?", group: "ja" },
      { text: "Kommst du nicht?", group: "doch" },
      { text: "Bist du nicht müde?", group: "doch" },
      { text: "Wohnst du nicht in Wien?", group: "doch" },
    ],
  },
};

export const QUESTIONS_GRAMMAR_LESSON: GrammarLesson = {
  id: QUESTIONS_GRAMMAR_LESSON_ID,
  title: "Fragen",
  icon: "❓",
  assetDir: "G4 questions",
  meaning: { english: "Questions", tamil: "கேள்விகள்", sinhala: "ප්‍රශ්න" },
  borrowsFrom: [QUESTIONS_LESSON_ID, SMALL_WORDS_LESSON_ID, VERBS_LESSON_ID],
  tests: [WORDS, YES_NO, WER_WAS_WIE, WOHIN_WANN, JA_NEIN_DOCH],
};
