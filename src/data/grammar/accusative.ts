import type { GrammarLesson, GrammarTest, Localized, WordsTest } from "@/data/grammar/types";
import { FOOD_LESSON_ID } from "@/data/food";
import { SHOPPING_LESSON_ID } from "@/data/shopping";
import { VERBS_LESSON_ID } from "@/data/verbs";

// G6 Akkusativ: the one an action is done to is the object, and there a der
// word changes: der → den, ein → einen, kein → keinen. die and das words and
// the plural don't change (docs/planning/ROADMAP.md, section 3). One word
// test (food and drink, kaufen, brauchen, möchten, es gibt), then four
// grammar tests. Every sentence and every replyTo line has its own clip in
// public/G6 accusative/audio/, unless the same text already has one.
//
// Every object in G6.2 is a der word, so the change is all the learner
// sees; G6.3 brings in the die and das words that stay as they are. G6.5
// teaches that the article, not the place, shows who does it ("Den Apfel
// kauft der Mann."), so only its sentences list the object-first order in
// `alternatives`. Its gaps and boards use der words on both sides, because
// a die or das word or a name looks the same as subject and object, and
// "Der Kaffee trinkt Tom." would be good German.
//
// The Tamil and Sinhala strings are drafts and need a native speaker's
// review (docs/planning/ROADMAP.md, Open decisions).
export const ACCUSATIVE_LESSON_ID = "G6";

const WHICH_RIGHT: Localized = {
  english: "Which one is right?",
  tamil: "எது சரி?",
  sinhala: "නිවැරදි එක කුමක්ද?",
};

// "Apfel is a der word and the object here, so der becomes den."
function objectWhy(noun: string, from: string, to: string): Localized {
  return {
    english: `"${noun}" is a der word and the object here, so ${from} becomes ${to}.`,
    tamil: `"${noun}" ஒரு der சொல், இங்கே செயப்படுபொருள், அதனால் ${from} → ${to}.`,
    sinhala: `"${noun}" der වචනයක්, මෙතන කර්මය, ඒ නිසා ${from} → ${to}.`,
  };
}

// "der Apfel is the subject here, not the object, so it stays der."
function subjectWhy(noun: string, article: string): Localized {
  return {
    english: `"${article} ${noun}" is the subject here, not the object, so it stays ${article}.`,
    tamil: `"${article} ${noun}" இங்கே எழுவாய், செயப்படுபொருள் அல்ல, அதனால் ${article} மாறாது.`,
    sinhala: `"${article} ${noun}" මෙතන කර්තෘ, කර්මය නොවේ, ඒ නිසා ${article} වෙනස් වෙන්නේ නැහැ.`,
  };
}

// "After ist there is no object, so it stays ein."
function istWhy(form: string): Localized {
  return {
    english: `After "ist" there is no object, so it stays ${form}.`,
    tamil: `"ist"-க்குப் பின் செயப்படுபொருள் இல்லை, அதனால் ${form} மாறாது.`,
    sinhala: `"ist" ට පස්සේ කර්මයක් නැහැ, ඒ නිසා ${form} වෙනස් වෙන්නේ නැහැ.`,
  };
}

// "Milch is a die word. Only der words change, so it stays die."
function stayWhy(noun: string, article: "die" | "das", form: string): Localized {
  return {
    english: `"${noun}" is a ${article} word. Only der words change, so it stays ${form}.`,
    tamil: `"${noun}" ஒரு ${article} சொல். der சொற்கள் மட்டுமே மாறும், அதனால் ${form} மாறாது.`,
    sinhala: `"${noun}" ${article} වචනයක්. වෙනස් වෙන්නේ der වචන විතරයි, ඒ නිසා ${form} එලෙසම තියෙනවා.`,
  };
}

// G6.1 ------------------------------------------------------------------

const WORDS: WordsTest = {
  kind: "words",
  testId: "G6.1",
  title: "Wörter",
  meaning: {
    english: "Words: food, drinks and shopping",
    tamil: "சொற்கள்: உணவு, பானங்கள், கடைக்குச் செல்லுதல்",
    sinhala: "වචන: කෑම, බීම සහ සාප්පු යාම",
  },
  words: [
    { lessonId: FOOD_LESSON_ID, wordId: "apfel" },
    { lessonId: FOOD_LESSON_ID, wordId: "kaffee" },
    { lessonId: FOOD_LESSON_ID, wordId: "tee" },
    { lessonId: FOOD_LESSON_ID, wordId: "saft" },
    { lessonId: FOOD_LESSON_ID, wordId: "brot" },
    { lessonId: FOOD_LESSON_ID, wordId: "milch" },
    { lessonId: SHOPPING_LESSON_ID, wordId: "kaufen" },
    { lessonId: SHOPPING_LESSON_ID, wordId: "brauchen" },
    { lessonId: VERBS_LESSON_ID, wordId: "moechten" },
  ],
  newWords: [
    {
      id: "es-gibt",
      image: "/G6 accusative/images/there-is.jpg",
      full: "es gibt",
      english: "There is / there are",
      tamil: "… இருக்கிறது / உண்டு",
      sinhala: "… තියෙනවා",
      example: {
        german: "Es gibt Kaffee.",
        english: "There is coffee.",
        tamil: "காபி இருக்கிறது.",
        sinhala: "කෝපි තියෙනවා.",
      },
    },
  ],
};

// G6.2 ------------------------------------------------------------------
// Every object is a der word. The gap is the article, and two sentences
// keep der or ein (a subject, and after "ist") so the learner doesn't turn
// every der into den. No sentenceMeaning or listenPick: the sentences
// differ in their nouns, so those would test words, not the case.

const SAY_A: Localized = {
  english: 'Say "a"',
  tamil: '"ஒரு …" என்று சொல்',
  sinhala: '"a" (එකක්) කියලා කියන්න',
};
const SAY_THE: Localized = {
  english: 'Say "the"',
  tamil: '"the" என்று சொல்',
  sinhala: '"the" කියලා කියන්න',
};

const DEN_EINEN: GrammarTest = {
  kind: "grammar",
  testId: "G6.2",
  title: "den, einen",
  meaning: {
    english: "der becomes den",
    tamil: "der → den",
    sinhala: "der → den",
  },
  testTypes: [
    "rule",
    "gapPick",
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
      id: "den",
      title: {
        english: "The object: der → den",
        tamil: "செயப்படுபொருள்: der → den",
        sinhala: "කර්මය: der → den",
      },
      text: {
        english:
          "The one who does the action is the subject. The one it is done to is the object (Akkusativ), and there der becomes den: Ich kaufe den Apfel.",
        tamil:
          "செயலைச் செய்பவர் எழுவாய் (subject). செயல் யார் / எதன் மீது நடக்கிறதோ அது செயப்படுபொருள் (object, Akkusativ). அங்கே der → den ஆகும், தமிழில் -ஐ சேர்வது போல: Ich kaufe den Apfel.",
        sinhala:
          "ක්‍රියාව කරන්නා කර්තෘ (subject). ක්‍රියාව සිදු වෙන්නේ කාටද / කුමකටද, එය කර්මය (object, Akkusativ). එතැනදී der → den වෙනවා: Ich kaufe den Apfel.",
      },
      examples: [{ id: "der-apfel" }, { id: "kaufe-den-apfel" }, { id: "tom-den-kaffee" }],
      table: [
        { left: "der Apfel", right: "den Apfel" },
        { left: "der Kaffee", right: "den Kaffee" },
        { left: "der Tisch", right: "den Tisch" },
      ],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Ich kaufe den Apfel.", "Ich kaufe der Apfel."],
        answer: "Ich kaufe den Apfel.",
      },
    },
    {
      id: "einen",
      title: {
        english: "ein → einen",
        tamil: "ein → einen",
        sinhala: "ein → einen",
      },
      text: {
        english:
          "ein changes the same way: a der word as the object takes einen. Ich habe einen Hund.",
        tamil:
          "ein-உம் அதே போல் மாறும்: செயப்படுபொருளாக வரும் der சொல்லுக்கு einen. Ich habe einen Hund.",
        sinhala: "ein ත් ඒ විදියටම වෙනස් වෙනවා: කර්මය වෙන der වචනයකට einen. Ich habe einen Hund.",
      },
      examples: [
        { id: "habe-einen-hund" },
        { id: "anna-einen-bruder" },
        { id: "kaufe-einen-apfel" },
      ],
      table: [
        { left: "ein Hund", right: "einen Hund" },
        { left: "ein Bruder", right: "einen Bruder" },
        { left: "ein Apfel", right: "einen Apfel" },
      ],
      check: {
        prompt: {
          english: 'Which one is "I have a dog."?',
          tamil: '"என்னிடம் ஒரு நாய் இருக்கிறது." எது?',
          sinhala: '"මට බල්ලෙක් ඉන්නවා." කුමක්ද?',
        },
        options: ["Ich habe einen Hund.", "Ich habe ein Hund."],
        answer: "Ich habe einen Hund.",
      },
    },
    {
      id: "ist",
      title: {
        english: "After ist: no change",
        tamil: "ist-க்குப் பின்: மாற்றம் இல்லை",
        sinhala: "ist ට පස්සේ: වෙනසක් නැහැ",
      },
      text: {
        english:
          "bin, bist, ist … have no object, so what comes after them stays der or ein: Das ist ein Apfel.",
        tamil:
          "bin, bist, ist … க்குச் செயப்படுபொருள் இல்லை, அதனால் அவற்றுக்குப் பின் வருவது der அல்லது ein ஆகவே இருக்கும்: Das ist ein Apfel.",
        sinhala:
          "bin, bist, ist … වලට කර්මයක් නැහැ, ඒ නිසා ඒවාට පස්සේ එන එක der හෝ ein විදියටම තියෙනවා: Das ist ein Apfel.",
      },
      examples: [{ id: "das-ein-apfel" }, { id: "der-hund-klein" }],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Das ist ein Apfel.", "Das ist einen Apfel."],
        answer: "Das ist ein Apfel.",
      },
    },
  ],
  sentences: [
    {
      id: "der-apfel",
      german: "Der Apfel ist groß.",
      meaning: {
        english: "The apple is big.",
        tamil: "ஆப்பிள் பெரியது.",
        sinhala: "ඇපල් එක ලොකුයි.",
      },
      rule: "den",
      focus: 0,
      distractors: ["Den", "Das"],
      why: subjectWhy("Apfel", "der"),
    },
    {
      id: "kaufe-den-apfel",
      german: "Ich kaufe den Apfel.",
      meaning: {
        english: "I buy the apple.",
        tamil: "நான் ஆப்பிளை வாங்குகிறேன்.",
        sinhala: "මම ඇපල් එක ගන්නවා.",
      },
      rule: "den",
      focus: 2,
      distractors: ["der", "das"],
      why: objectWhy("Apfel", "der", "den"),
      transformTo: { id: "kaufe-einen-apfel", prompt: SAY_A },
    },
    {
      id: "tom-den-kaffee",
      german: "Tom trinkt den Kaffee.",
      nounFirst: true,
      meaning: {
        english: "Tom drinks the coffee.",
        tamil: "டாம் காபியைக் குடிக்கிறான்.",
        sinhala: "ටොම් කෝපි එක බොනවා.",
      },
      rule: "den",
      focus: 2,
      distractors: ["der", "die"],
      why: objectWhy("Kaffee", "der", "den"),
    },
    {
      id: "wir-den-tisch",
      german: "Wir kaufen den Tisch.",
      meaning: {
        english: "We buy the table.",
        tamil: "நாங்கள் மேசையை வாங்குகிறோம்.",
        sinhala: "අපි මේසය ගන්නවා.",
      },
      rule: "den",
      focus: 2,
      distractors: ["der", "das"],
      why: objectWhy("Tisch", "der", "den"),
    },
    {
      id: "habe-einen-hund",
      german: "Ich habe einen Hund.",
      meaning: {
        english: "I have a dog.",
        tamil: "என்னிடம் ஒரு நாய் இருக்கிறது.",
        sinhala: "මට බල්ලෙක් ඉන්නවා.",
      },
      rule: "einen",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Hund", "ein", "einen"),
    },
    {
      id: "anna-einen-bruder",
      german: "Anna hat einen Bruder.",
      nounFirst: true,
      meaning: {
        english: "Anna has a brother.",
        tamil: "அன்னாவுக்கு ஒரு சகோதரன் இருக்கிறான்.",
        sinhala: "ඇනාට සහෝදරයෙක් ඉන්නවා.",
      },
      rule: "einen",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Bruder", "ein", "einen"),
    },
    {
      id: "kaufe-einen-apfel",
      german: "Ich kaufe einen Apfel.",
      meaning: {
        english: "I buy an apple.",
        tamil: "நான் ஒரு ஆப்பிள் வாங்குகிறேன்.",
        sinhala: "මම ඇපල් එකක් ගන්නවා.",
      },
      rule: "einen",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Apfel", "ein", "einen"),
      transformTo: { id: "kaufe-den-apfel", prompt: SAY_THE },
    },
    {
      id: "ja-einen-bruder",
      german: "Ja, ich habe einen Bruder.",
      meaning: {
        english: "Yes, I have a brother.",
        tamil: "ஆம், எனக்கு ஒரு சகோதரன் இருக்கிறான்.",
        sinhala: "ඔව්, මට සහෝදරයෙක් ඉන්නවා.",
      },
      rule: "einen",
      focus: 3,
      distractors: ["ein", "eine"],
      why: objectWhy("Bruder", "ein", "einen"),
      replyTo: {
        german: "Hast du einen Bruder?",
        meaning: {
          english: "Do you have a brother?",
          tamil: "உனக்கு ஒரு சகோதரன் இருக்கிறானா?",
          sinhala: "ඔයාට සහෝදරයෙක් ඉන්නවද?",
        },
        decoys: ["Ja, ich habe ein Bruder.", "Nein, ich habe einen Bruder."],
      },
    },
    {
      id: "das-ein-apfel",
      german: "Das ist ein Apfel.",
      meaning: {
        english: "This is an apple.",
        tamil: "இது ஒரு ஆப்பிள்.",
        sinhala: "මේ ඇපල් එකක්.",
      },
      rule: "ist",
      focus: 2,
      distractors: ["einen", "eine"],
      why: istWhy("ein"),
    },
    {
      id: "der-hund-klein",
      german: "Der Hund ist klein.",
      meaning: { english: "The dog is small.", tamil: "நாய் சிறியது.", sinhala: "බල්ලා පොඩියි." },
      rule: "ist",
      focus: 0,
      distractors: ["Den", "Die"],
      why: subjectWhy("Hund", "der"),
    },
  ],
};

// G6.3 ------------------------------------------------------------------
// die and das words as the object, beside der words that do change, then
// keinen. Every gap offers the changed form and an unchanged one, so only
// knowing the noun's gender gets it right.

const SAY_NOT_A: Localized = {
  english: 'Say "not a"',
  tamil: '"… இல்லை" என்று சொல்',
  sinhala: '"… නැහැ" කියලා කියන්න',
};
const SAY_A_POSITIVE: Localized = {
  english: 'Say "a"',
  tamil: '"ஒரு …" என்று சொல்',
  sinhala: '"a" (එකක්) කියලා කියන්න',
};

const DIE_DAS_KEINEN: GrammarTest = {
  kind: "grammar",
  testId: "G6.3",
  title: "die, das, keinen",
  meaning: {
    english: "what stays, and keinen",
    tamil: "மாறாதவை, மற்றும் keinen",
    sinhala: "වෙනස් නොවන ඒවා, සහ keinen",
  },
  testTypes: [
    "rule",
    "gapPick",
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
      id: "die-das",
      title: {
        english: "die and das don't change",
        tamil: "die, das மாறுவதில்லை",
        sinhala: "die සහ das වෙනස් වෙන්නේ නැහැ",
      },
      text: {
        english:
          "Only der words change. die, das, eine and the plural die stay as they are: Ich kaufe die Milch. Tom hat ein Auto.",
        tamil:
          "der சொற்கள் மட்டுமே மாறும். die, das, eine, பன்மை die அப்படியே இருக்கும்: Ich kaufe die Milch. Tom hat ein Auto.",
        sinhala:
          "වෙනස් වෙන්නේ der වචන විතරයි. die, das, eine සහ බහුවචන die එලෙසම තියෙනවා: Ich kaufe die Milch. Tom hat ein Auto.",
      },
      examples: [{ id: "kaufe-die-milch" }, { id: "wir-das-brot" }, { id: "habe-eine-katze" }],
      table: [
        { left: "der Apfel", right: "den Apfel" },
        { left: "die Milch", right: "die Milch" },
        { left: "das Brot", right: "das Brot" },
        { left: "ein Auto", right: "ein Auto" },
      ],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Ich habe eine Katze.", "Ich habe einen Katze."],
        answer: "Ich habe eine Katze.",
      },
    },
    {
      id: "keinen",
      title: {
        english: "kein → keinen",
        tamil: "kein → keinen",
        sinhala: "kein → keinen",
      },
      text: {
        english:
          "kein changes like ein: a der word as the object takes keinen. keine and kein for das words stay: Ich habe keinen Hund.",
        tamil:
          "kein, ein போலவே மாறும்: செயப்படுபொருளாக வரும் der சொல்லுக்கு keinen. keine-உம் das சொற்களின் kein-உம் மாறாது: Ich habe keinen Hund.",
        sinhala:
          "kein, ein වගේම වෙනස් වෙනවා: කර්මය වෙන der වචනයකට keinen. keine සහ das වචනවල kein වෙනස් වෙන්නේ නැහැ: Ich habe keinen Hund.",
      },
      examples: [{ id: "habe-keinen-hund" }, { id: "keinen-tee" }, { id: "keine-milch" }],
      table: [
        { left: "kein Hund", right: "keinen Hund" },
        { left: "keine Milch", right: "keine Milch" },
        { left: "kein Buch", right: "kein Buch" },
      ],
      check: {
        prompt: {
          english: 'Which one is "I don\'t have a dog."?',
          tamil: '"என்னிடம் நாய் இல்லை." எது?',
          sinhala: '"මට බල්ලෙක් නැහැ." කුමක්ද?',
        },
        options: ["Ich habe keinen Hund.", "Ich habe kein Hund."],
        answer: "Ich habe keinen Hund.",
      },
    },
  ],
  sentences: [
    {
      id: "kaufe-die-milch",
      german: "Ich kaufe die Milch.",
      meaning: {
        english: "I buy the milk.",
        tamil: "நான் பாலை வாங்குகிறேன்.",
        sinhala: "මම කිරි ටික ගන්නවා.",
      },
      rule: "die-das",
      focus: 2,
      distractors: ["den", "der"],
      why: stayWhy("Milch", "die", "die"),
    },
    {
      id: "wir-das-brot",
      german: "Wir kaufen das Brot.",
      meaning: {
        english: "We buy the bread.",
        tamil: "நாங்கள் ரொட்டியை வாங்குகிறோம்.",
        sinhala: "අපි පාන් එක ගන්නවා.",
      },
      rule: "die-das",
      focus: 2,
      distractors: ["den", "die"],
      why: stayWhy("Brot", "das", "das"),
    },
    {
      id: "habe-eine-katze",
      german: "Ich habe eine Katze.",
      meaning: {
        english: "I have a cat.",
        tamil: "என்னிடம் ஒரு பூனை இருக்கிறது.",
        sinhala: "මට පූසෙක් ඉන්නවා.",
      },
      rule: "die-das",
      focus: 2,
      distractors: ["einen", "ein"],
      why: stayWhy("Katze", "die", "eine"),
    },
    {
      id: "tom-ein-auto",
      german: "Tom hat ein Auto.",
      nounFirst: true,
      meaning: {
        english: "Tom has a car.",
        tamil: "டாமிடம் ஒரு கார் இருக்கிறது.",
        sinhala: "ටොම්ට කාර් එකක් තියෙනවා.",
      },
      rule: "die-das",
      focus: 2,
      distractors: ["einen", "eine"],
      why: stayWhy("Auto", "das", "ein"),
    },
    {
      id: "anna-einen-saft",
      german: "Anna kauft einen Saft.",
      nounFirst: true,
      meaning: {
        english: "Anna buys a juice.",
        tamil: "அன்னா ஒரு பழச்சாறு வாங்குகிறாள்.",
        sinhala: "ඇනා යුෂ එකක් ගන්නවා.",
      },
      rule: "die-das",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Saft", "ein", "einen"),
    },
    {
      id: "habe-einen-hund",
      german: "Ich habe einen Hund.",
      meaning: {
        english: "I have a dog.",
        tamil: "என்னிடம் ஒரு நாய் இருக்கிறது.",
        sinhala: "මට බල්ලෙක් ඉන්නවා.",
      },
      rule: "keinen",
      why: objectWhy("Hund", "ein", "einen"),
      transformTo: { id: "habe-keinen-hund", prompt: SAY_NOT_A },
    },
    {
      id: "habe-keinen-hund",
      german: "Ich habe keinen Hund.",
      meaning: {
        english: "I don't have a dog.",
        tamil: "என்னிடம் நாய் இல்லை.",
        sinhala: "මට බල්ලෙක් නැහැ.",
      },
      rule: "keinen",
      focus: 2,
      distractors: ["kein", "keine"],
      why: objectWhy("Hund", "kein", "keinen"),
      transformTo: { id: "habe-einen-hund", prompt: SAY_A_POSITIVE },
    },
    {
      id: "keinen-tee",
      german: "Wir haben keinen Tee.",
      meaning: {
        english: "We have no tea.",
        tamil: "எங்களிடம் தேநீர் இல்லை.",
        sinhala: "අපිට තේ නැහැ.",
      },
      rule: "keinen",
      focus: 2,
      distractors: ["kein", "keine"],
      why: objectWhy("Tee", "kein", "keinen"),
    },
    {
      id: "keine-milch",
      german: "Ich trinke keine Milch.",
      meaning: {
        english: "I don't drink milk.",
        tamil: "நான் பால் குடிப்பதில்லை.",
        sinhala: "මම කිරි බොන්නේ නැහැ.",
      },
      rule: "keinen",
      focus: 2,
      distractors: ["keinen", "kein"],
      why: stayWhy("Milch", "die", "keine"),
    },
    {
      id: "kein-buch",
      german: "Er hat kein Buch.",
      meaning: {
        english: "He has no book.",
        tamil: "அவனிடம் புத்தகம் இல்லை.",
        sinhala: "එයාට පොතක් නැහැ.",
      },
      rule: "keinen",
      focus: 2,
      distractors: ["keinen", "keine"],
      why: stayWhy("Buch", "das", "kein"),
    },
    {
      id: "nein-keinen-bruder",
      german: "Nein, ich habe keinen Bruder.",
      meaning: {
        english: "No, I don't have a brother.",
        tamil: "இல்லை, எனக்குச் சகோதரன் இல்லை.",
        sinhala: "නැහැ, මට සහෝදරයෙක් නැහැ.",
      },
      rule: "keinen",
      focus: 3,
      distractors: ["kein", "keine"],
      why: objectWhy("Bruder", "kein", "keinen"),
      replyTo: {
        german: "Hast du einen Bruder?",
        meaning: {
          english: "Do you have a brother?",
          tamil: "உனக்கு ஒரு சகோதரன் இருக்கிறானா?",
          sinhala: "ඔයාට සහෝදරයෙක් ඉන්නවද?",
        },
        decoys: ["Nein, ich habe kein Bruder.", "Ja, ich habe keinen Bruder."],
      },
    },
  ],
  sort: {
    groups: [
      {
        id: "keinen",
        label: "keinen",
        meaning: { english: "der words", tamil: "der சொற்கள்", sinhala: "der වචන" },
      },
      {
        id: "keine",
        label: "keine",
        meaning: {
          english: "die words and more than one",
          tamil: "die சொற்களும் பன்மையும்",
          sinhala: "die වචන සහ බහුවචනය",
        },
      },
      {
        id: "kein",
        label: "kein",
        meaning: { english: "das words", tamil: "das சொற்கள்", sinhala: "das වචන" },
      },
    ],
    items: [
      { text: "Hund", group: "keinen" },
      { text: "Tee", group: "keinen" },
      { text: "Saft", group: "keinen" },
      { text: "Milch", group: "keine" },
      { text: "Katze", group: "keine" },
      { text: "Kinder", group: "keine" },
      { text: "Auto", group: "kein" },
      { text: "Brot", group: "kein" },
      { text: "Buch", group: "kein" },
    ],
  },
};

// G6.4 ------------------------------------------------------------------
// Three ways to put an object to use. sentenceMeaning and listenPick stay
// in: here the sentences differ in their verb (would like, need, there
// is), which is what the test teaches.

const MOECHTEN_BRAUCHEN_ES_GIBT: GrammarTest = {
  kind: "grammar",
  testId: "G6.4",
  title: "möchten, brauchen, es gibt",
  meaning: {
    english: "would like, need, there is",
    tamil: "விரும்புகிறேன், தேவை, இருக்கிறது",
    sinhala: "කැමතියි, ඕනෑ, තියෙනවා",
  },
  testTypes: [
    "rule",
    "gapPick",
    "sentenceMeaning",
    "listenPick",
    "order",
    "spot",
    "meaningBuild",
    "gapType",
    "listenBuild",
    "reply",
  ],
  rules: [
    {
      id: "moechten",
      title: {
        english: "möchten = would like",
        tamil: "möchten = விரும்புகிறேன்",
        sinhala: "möchten = කැමතියි",
      },
      text: {
        english:
          "Ich möchte … is the polite way to ask for something. What you would like is the object: Ich möchte einen Kaffee.",
        tamil:
          "Ich möchte … என்பது ஒன்றை மரியாதையாகக் கேட்கும் வழி. நீ விரும்புவது செயப்படுபொருள்: Ich möchte einen Kaffee.",
        sinhala:
          "Ich möchte … කියන්නේ යමක් ආචාරශීලීව ඉල්ලන විදිය. ඔයා කැමති දේ කර්මය: Ich möchte einen Kaffee.",
      },
      examples: [{ id: "moechte-kaffee" }, { id: "moechtest-saft" }, { id: "anna-katze" }],
      table: [
        { left: "ich", right: "möchte" },
        { left: "du", right: "möchtest" },
        { left: 'er, "sie" = she', right: "möchte" },
        { left: "wir, Sie", right: "möchten" },
      ],
      check: {
        prompt: {
          english: 'Which one is "I would like a tea."?',
          tamil: '"எனக்கு ஒரு தேநீர் வேண்டும்." எது?',
          sinhala: '"මට තේ එකක් ඕනෑ." කුමක්ද?',
        },
        options: ["Ich möchte einen Tee.", "Ich möchte ein Tee."],
        answer: "Ich möchte einen Tee.",
      },
    },
    {
      id: "brauchen",
      title: {
        english: "brauchen + den / einen",
        tamil: "brauchen + den / einen",
        sinhala: "brauchen + den / einen",
      },
      text: {
        english:
          "brauchen (to need) has an object too, so a der word takes den or einen: Ich brauche einen Stuhl.",
        tamil:
          "brauchen (தேவைப்படுதல்)-க்கும் செயப்படுபொருள் உண்டு, அதனால் der சொல்லுக்கு den அல்லது einen: Ich brauche einen Stuhl.",
        sinhala:
          "brauchen (ඕනෑ වෙනවා) ටත් කර්මයක් තියෙනවා, ඒ නිසා der වචනයකට den හෝ einen: Ich brauche einen Stuhl.",
      },
      examples: [
        { id: "brauche-stuhl" },
        { id: "tom-braucht-buch" },
        { id: "brauche-keinen-kaffee" },
      ],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Ich brauche einen Stuhl.", "Ich brauche ein Stuhl."],
        answer: "Ich brauche einen Stuhl.",
      },
    },
    {
      id: "es-gibt",
      title: {
        english: "es gibt = there is",
        tamil: "es gibt = இருக்கிறது",
        sinhala: "es gibt = තියෙනවා",
      },
      text: {
        english:
          'Es gibt … means "there is" or "there are". What there is, is the object: Es gibt keinen Kaffee. As a question: Gibt es …?',
        tamil:
          'Es gibt … என்றால் "… இருக்கிறது" அல்லது "… உண்டு". இருப்பது செயப்படுபொருள்: Es gibt keinen Kaffee. கேள்வியாக: Gibt es …?',
        sinhala:
          'Es gibt … කියන්නේ "… තියෙනවා". තියෙන දේ කර්මය: Es gibt keinen Kaffee. ප්‍රශ්නයක් විදියට: Gibt es …?',
      },
      examples: [
        { id: "es-gibt-keinen-kaffee" },
        { id: "hier-gibt-es-stuhl" },
        { id: "es-gibt-milch" },
      ],
      check: {
        prompt: {
          english: 'Which one is "There is no tea."?',
          tamil: '"தேநீர் இல்லை." எது?',
          sinhala: '"තේ නැහැ." කුමක්ද?',
        },
        options: ["Es gibt keinen Tee.", "Es gibt kein Tee."],
        answer: "Es gibt keinen Tee.",
      },
    },
  ],
  sentences: [
    {
      id: "moechte-kaffee",
      german: "Ich möchte einen Kaffee.",
      meaning: {
        english: "I would like a coffee.",
        tamil: "எனக்கு ஒரு காபி வேண்டும்.",
        sinhala: "මට කෝපි එකක් ඕනෑ.",
      },
      rule: "moechten",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Kaffee", "ein", "einen"),
      replyTo: {
        german: "Was möchtest du?",
        meaning: {
          english: "What would you like?",
          tamil: "உனக்கு என்ன வேண்டும்?",
          sinhala: "ඔයාට මොනවද ඕනෑ?",
        },
        decoys: ["Ich möchte ein Kaffee.", "Ich heiße Tom."],
      },
    },
    {
      id: "moechte-tee",
      german: "Ich möchte einen Tee.",
      meaning: {
        english: "I would like a tea.",
        tamil: "எனக்கு ஒரு தேநீர் வேண்டும்.",
        sinhala: "මට තේ එකක් ඕනෑ.",
      },
      rule: "moechten",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Tee", "ein", "einen"),
      replyTo: {
        german: "Was möchten Sie?",
        meaning: {
          english: "What would you like? (polite)",
          tamil: "உங்களுக்கு என்ன வேண்டும்?",
          sinhala: "ඔබට මොනවද ඕනෑ?",
        },
        decoys: ["Ich möchte eine Tee.", "Ja, ich habe Zeit."],
      },
    },
    {
      id: "moechtest-saft",
      german: "Möchtest du einen Saft?",
      meaning: {
        english: "Would you like a juice?",
        tamil: "உனக்கு ஒரு பழச்சாறு வேண்டுமா?",
        sinhala: "ඔයාට යුෂ එකක් ඕනෑද?",
      },
      rule: "moechten",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Saft", "ein", "einen"),
    },
    {
      id: "anna-katze",
      german: "Anna möchte eine Katze.",
      nounFirst: true,
      meaning: {
        english: "Anna would like a cat.",
        tamil: "அன்னாவுக்கு ஒரு பூனை வேண்டும்.",
        sinhala: "ඇනාට පූසෙක් ඕනෑ.",
      },
      rule: "moechten",
      focus: 2,
      distractors: ["einen", "ein"],
      why: stayWhy("Katze", "die", "eine"),
    },
    {
      id: "brauche-stuhl",
      german: "Ich brauche einen Stuhl.",
      meaning: {
        english: "I need a chair.",
        tamil: "எனக்கு ஒரு நாற்காலி தேவை.",
        sinhala: "මට පුටුවක් ඕනෑ වෙනවා.",
      },
      rule: "brauchen",
      focus: 2,
      distractors: ["ein", "eine"],
      why: objectWhy("Stuhl", "ein", "einen"),
    },
    {
      id: "tom-braucht-buch",
      german: "Tom braucht das Buch.",
      nounFirst: true,
      meaning: {
        english: "Tom needs the book.",
        tamil: "டாமுக்கு அந்தப் புத்தகம் தேவை.",
        sinhala: "ටොම්ට පොත ඕනෑ වෙනවා.",
      },
      rule: "brauchen",
      focus: 2,
      distractors: ["den", "die"],
      why: stayWhy("Buch", "das", "das"),
    },
    {
      id: "brauche-keinen-kaffee",
      german: "Ich brauche keinen Kaffee.",
      meaning: {
        english: "I don't need a coffee.",
        tamil: "எனக்குக் காபி தேவையில்லை.",
        sinhala: "මට කෝපි එකක් ඕනෑ නැහැ.",
      },
      rule: "brauchen",
      focus: 2,
      distractors: ["kein", "keine"],
      why: objectWhy("Kaffee", "kein", "keinen"),
    },
    {
      id: "es-gibt-keinen-kaffee",
      german: "Nein, es gibt keinen Kaffee.",
      meaning: {
        english: "No, there is no coffee.",
        tamil: "இல்லை, காபி இல்லை.",
        sinhala: "නැහැ, කෝපි නැහැ.",
      },
      rule: "es-gibt",
      focus: 3,
      distractors: ["kein", "keine"],
      why: objectWhy("Kaffee", "kein", "keinen"),
      replyTo: {
        german: "Gibt es Kaffee?",
        meaning: {
          english: "Is there coffee?",
          tamil: "காபி இருக்கிறதா?",
          sinhala: "කෝපි තියෙනවද?",
        },
        decoys: ["Nein, es gibt kein Kaffee.", "Ja, es gibt keinen Kaffee."],
      },
    },
    {
      id: "hier-gibt-es-stuhl",
      german: "Hier gibt es einen Stuhl.",
      alternatives: ["Es gibt hier einen Stuhl."],
      meaning: {
        english: "There is a chair here.",
        tamil: "இங்கே ஒரு நாற்காலி இருக்கிறது.",
        sinhala: "මෙතන පුටුවක් තියෙනවා.",
      },
      rule: "es-gibt",
      focus: 3,
      distractors: ["ein", "eine"],
      why: objectWhy("Stuhl", "ein", "einen"),
    },
    {
      id: "es-gibt-milch",
      german: "Es gibt keine Milch.",
      meaning: {
        english: "There is no milk.",
        tamil: "பால் இல்லை.",
        sinhala: "කිරි නැහැ.",
      },
      rule: "es-gibt",
      focus: 2,
      distractors: ["keinen", "kein"],
      why: stayWhy("Milch", "die", "keine"),
    },
  ],
};

// G6.5 ------------------------------------------------------------------
// Two der words in one sentence, so only the article shows which one does
// it. Each sentence lists its other order in `alternatives` (the second
// card teaches it). The gaps are both subject and object, and every wrong
// filler leaves two subjects or two objects, which is not German.

const DER_ODER_DEN: GrammarTest = {
  kind: "grammar",
  testId: "G6.5",
  title: "der oder den",
  meaning: {
    english: "subject or object?",
    tamil: "எழுவாயா, செயப்படுபொருளா?",
    sinhala: "කර්තෘද, කර්මයද?",
  },
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
      id: "der-or-den",
      title: {
        english: "der or den?",
        tamil: "der-ஆ, den-ஆ?",
        sinhala: "der ද, den ද?",
      },
      text: {
        english:
          "Find who does the action: that is der or ein. The one it is done to is den or einen: Der Mann kauft den Apfel.",
        tamil:
          "செயலைச் செய்பவரைக் கண்டுபிடி: அது der அல்லது ein. செயல் யார் / எதன் மீது நடக்கிறதோ அது den அல்லது einen: Der Mann kauft den Apfel.",
        sinhala:
          "ක්‍රියාව කරන්නා හොයන්න: එය der හෝ ein. ක්‍රියාව සිදු වෙන එක den හෝ einen: Der Mann kauft den Apfel.",
      },
      examples: [{ id: "mann-apfel" }, { id: "lehrer-tee" }, { id: "mann-hund" }],
      check: {
        prompt: WHICH_RIGHT,
        options: ["Der Mann kauft den Tee.", "Der Mann kauft der Tee."],
        answer: "Der Mann kauft den Tee.",
      },
    },
    {
      id: "object-first",
      title: {
        english: "The article shows who does it",
        tamil: "யார் செய்கிறார் என்பதை article காட்டும்",
        sinhala: "කවුද කරන්නේ කියලා article එක පෙන්වනවා",
      },
      text: {
        english:
          "der and den show who does what, so the object can even come first: Den Apfel kauft der Mann. The man is still the one who buys.",
        tamil:
          "யார் எதைச் செய்கிறார் என்பதை der, den காட்டுவதால் (தமிழில் -ஐ போல), செயப்படுபொருள் முதலில் கூட வரலாம்: Den Apfel kauft der Mann. வாங்குவது இன்னும் அந்த ஆண்தான்.",
        sinhala:
          "කවුද මොකක්ද කරන්නේ කියලා der සහ den පෙන්වන නිසා, කර්මය මුලින්ම වුණත් එන්න පුළුවන්: Den Apfel kauft der Mann. ගන්නේ තාමත් ඒ මිනිසා.",
      },
      examples: [{ id: "den-apfel-mann" }, { id: "den-tisch-lehrer" }],
      check: {
        prompt: {
          english: "Den Kaffee trinkt der Mann. Who drinks?",
          tamil: "Den Kaffee trinkt der Mann. யார் குடிக்கிறார்?",
          sinhala: "Den Kaffee trinkt der Mann. කවුද බොන්නේ?",
        },
        options: ["der Mann", "der Kaffee"],
        answer: "der Mann",
      },
    },
  ],
  sentences: [
    {
      id: "mann-apfel",
      german: "Der Mann kauft den Apfel.",
      alternatives: ["Den Apfel kauft der Mann."],
      meaning: {
        english: "The man buys the apple.",
        tamil: "அந்த ஆண் ஆப்பிளை வாங்குகிறார்.",
        sinhala: "මිනිසා ඇපල් එක ගන්නවා.",
      },
      rule: "der-or-den",
      focus: 3,
      distractors: ["der", "das"],
      why: objectWhy("Apfel", "der", "den"),
      replyTo: {
        german: "Wer kauft den Apfel?",
        meaning: {
          english: "Who buys the apple?",
          tamil: "ஆப்பிளை யார் வாங்குகிறார்?",
          sinhala: "ඇපල් එක ගන්නේ කවුද?",
        },
        decoys: ["Den Mann kauft den Apfel.", "Der Mann kauft der Apfel."],
      },
    },
    {
      id: "lehrer-tee",
      german: "Der Lehrer trinkt den Tee.",
      alternatives: ["Den Tee trinkt der Lehrer."],
      meaning: {
        english: "The teacher drinks the tea.",
        tamil: "ஆசிரியர் தேநீரைக் குடிக்கிறார்.",
        sinhala: "ගුරුතුමා තේ එක බොනවා.",
      },
      rule: "der-or-den",
      focus: 0,
      distractors: ["Den", "Die"],
      why: subjectWhy("Lehrer", "der"),
      replyTo: {
        german: "Was trinkt der Lehrer?",
        meaning: {
          english: "What does the teacher drink?",
          tamil: "ஆசிரியர் என்ன குடிக்கிறார்?",
          sinhala: "ගුරුතුමා බොන්නේ මොකක්ද?",
        },
        decoys: ["Der Lehrer trinkt der Tee.", "Der Lehrer ist müde."],
      },
    },
    {
      id: "ein-mann-tisch",
      german: "Ein Mann kauft einen Tisch.",
      alternatives: ["Einen Tisch kauft ein Mann."],
      meaning: {
        english: "A man buys a table.",
        tamil: "ஒரு ஆண் ஒரு மேசை வாங்குகிறார்.",
        sinhala: "මිනිසෙක් මේසයක් ගන්නවා.",
      },
      rule: "der-or-den",
      focus: 0,
      distractors: ["Einen", "Eine"],
      why: subjectWhy("Mann", "ein"),
    },
    {
      id: "freund-stuhl",
      german: "Der Freund braucht einen Stuhl.",
      alternatives: ["Einen Stuhl braucht der Freund."],
      meaning: {
        english: "The friend needs a chair.",
        tamil: "நண்பனுக்கு ஒரு நாற்காலி தேவை.",
        sinhala: "යාළුවාට පුටුවක් ඕනෑ වෙනවා.",
      },
      rule: "der-or-den",
      focus: 3,
      distractors: ["ein", "eine"],
      why: objectWhy("Stuhl", "ein", "einen"),
    },
    {
      id: "mann-hund",
      german: "Der Mann hat einen Hund.",
      alternatives: ["Einen Hund hat der Mann."],
      meaning: {
        english: "The man has a dog.",
        tamil: "அந்த ஆணிடம் ஒரு நாய் இருக்கிறது.",
        sinhala: "මිනිසාට බල්ලෙක් ඉන්නවා.",
      },
      rule: "der-or-den",
      focus: 0,
      distractors: ["Den", "Die"],
      why: subjectWhy("Mann", "der"),
    },
    {
      id: "wir-kaffee",
      german: "Wir trinken den Kaffee.",
      alternatives: ["Den Kaffee trinken wir."],
      meaning: {
        english: "We drink the coffee.",
        tamil: "நாங்கள் காபியைக் குடிக்கிறோம்.",
        sinhala: "අපි කෝපි එක බොනවා.",
      },
      rule: "der-or-den",
      focus: 2,
      distractors: ["der", "das"],
      why: objectWhy("Kaffee", "der", "den"),
    },
    {
      id: "das-lehrer",
      german: "Das ist der Lehrer.",
      meaning: {
        english: "This is the teacher.",
        tamil: "இவர்தான் ஆசிரியர்.",
        sinhala: "මේ ගුරුතුමා.",
      },
      rule: "der-or-den",
      focus: 2,
      distractors: ["den", "die"],
      why: istWhy("der"),
    },
    {
      id: "den-apfel-mann",
      german: "Den Apfel kauft der Mann.",
      alternatives: ["Der Mann kauft den Apfel."],
      meaning: {
        english: "The man buys the apple.",
        tamil: "அந்த ஆண் ஆப்பிளை வாங்குகிறார்.",
        sinhala: "මිනිසා ඇපල් එක ගන්නවා.",
      },
      rule: "object-first",
      focus: 0,
      distractors: ["Der", "Das"],
      why: objectWhy("Apfel", "der", "den"),
    },
    {
      id: "den-tisch-lehrer",
      german: "Den Tisch kauft der Lehrer.",
      alternatives: ["Der Lehrer kauft den Tisch."],
      meaning: {
        english: "The teacher buys the table.",
        tamil: "ஆசிரியர் மேசையை வாங்குகிறார்.",
        sinhala: "ගුරුතුමා මේසය ගන්නවා.",
      },
      rule: "object-first",
      focus: 0,
      distractors: ["Der", "Das"],
      why: objectWhy("Tisch", "der", "den"),
    },
  ],
  sort: {
    groups: [
      {
        id: "subject",
        label: "der, ein",
        meaning: {
          english: "does it (subject)",
          tamil: "செய்பவர் (எழுவாய்)",
          sinhala: "කරන්නා (කර්තෘ)",
        },
      },
      {
        id: "object",
        label: "den, einen",
        meaning: {
          english: "it is done to (object)",
          tamil: "செயல் நடப்பது (செயப்படுபொருள்)",
          sinhala: "ක්‍රියාව සිදු වෙන එක (කර්මය)",
        },
      },
    ],
    items: [
      { text: "der Mann", group: "subject" },
      { text: "ein Hund", group: "subject" },
      { text: "der Tee", group: "subject" },
      { text: "ein Stuhl", group: "subject" },
      { text: "den Apfel", group: "object" },
      { text: "einen Kaffee", group: "object" },
      { text: "den Lehrer", group: "object" },
      { text: "einen Tisch", group: "object" },
    ],
  },
};

export const ACCUSATIVE_LESSON: GrammarLesson = {
  id: ACCUSATIVE_LESSON_ID,
  title: "Akkusativ",
  icon: "🛒",
  assetDir: "G6 accusative",
  meaning: {
    english: "The object of a sentence",
    tamil: "வாக்கியத்தின் செயப்படுபொருள்",
    sinhala: "වාක්‍යයේ කර්මය",
  },
  borrowsFrom: [FOOD_LESSON_ID, SHOPPING_LESSON_ID, VERBS_LESSON_ID],
  tests: [WORDS, DEN_EINEN, DIE_DAS_KEINEN, MOECHTEN_BRAUCHEN_ES_GIBT, DER_ODER_DEN],
};
