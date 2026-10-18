import type { GrammarStep, GrammarTest, L, Question } from "@/lib/grammar-engine";
import { EYEBROW, l } from "@/data/g1/common";

// G1.5 Wortarten: recognising Nomen (blue 📦, always a capital), Verb (red
// ⚡) and Pronomen (green 🔁), plus the capital trap (the first word of a
// sentence is big too). These colours stay fixed for the rest of the app.
// Part F of screens.md. Only G1.1 words are used (D1: er / sie included).

const NOMEN = "📦 Nomen";
const VERB = "⚡ Verb";
const PRONOMEN = "🔁 Pronomen";

const KIND_BASKETS = [
  { id: "nomen", label: l("📦 Nomen", "📦 Nomen", "📦 Nomen"), tone: "nomen" as const },
  { id: "verb", label: l("⚡ Verb", "⚡ Verb", "⚡ Verb"), tone: "verb" as const },
  {
    id: "pronomen",
    label: l("🔁 Pronomen", "🔁 Pronomen", "🔁 Pronomen"),
    tone: "pronomen" as const,
  },
];

const yesNo = (
  id: string,
  title: string,
  subtitle: L,
  word: string,
  answer: "ja" | "nein",
  tip: L,
): Question => ({
  id,
  type: "choice",
  eyebrow: EYEBROW.wordKinds,
  title,
  subtitle,
  prompt: { show: word, showStyle: "word" },
  options: ["ja 👍", "nein 👎"],
  answer: answer === "ja" ? "ja 👍" : "nein 👎",
  tip,
});

const whichKind = (id: string, word: string, answer: string, tip: L): GrammarStep => ({
  tier: "easy",
  q: {
    id,
    type: "choice",
    eyebrow: EYEBROW.wordKinds,
    title: "Welche Wortart?",
    subtitle: l("What kind of word is this?", "இது எந்த வகைச் சொல்?", "මේ කුමන වර්ගයේ වචනයක්ද?"),
    prompt: { show: word, showStyle: "word" },
    options: [NOMEN, VERB, PRONOMEN],
    answer,
    tip,
  },
});

const CAPITAL_TIP = l(
  "Only Nomen (and names) always get a capital.",
  "Nomen (மற்றும் பெயர்கள்) மட்டுமே எப்போதும் பெரிய எழுத்தில் தொடங்கும்.",
  "හැමවිටම කැපිටල් අකුර ලැබෙන්නේ Nomen (සහ නම්) වලට පමණයි.",
);

const needsCapital = (id: string, options: string[], answer: string): Question => ({
  id,
  type: "choice",
  eyebrow: EYEBROW.capitals,
  title: "Groß oder klein?",
  subtitle: l(
    "Which word needs a capital letter?",
    "எந்தச் சொல்லுக்குப் பெரிய எழுத்து தேவை?",
    "කැපිටල් අකුරක් ඕනෙ කුමන වචනයටද?",
  ),
  prompt: {},
  options,
  answer,
  tip: CAPITAL_TIP,
});

const tapNomen = (id: string, sentence: string, target: string, tip: L): GrammarStep => ({
  tier: "medium",
  q: {
    id,
    type: "tapWords",
    eyebrow: EYEBROW.findNomen,
    title: "Finde das Nomen",
    subtitle: l(
      "Tap every Nomen in the sentence.",
      "வாக்கியத்தில் உள்ள ஒவ்வொரு Nomen-ஐயும் தட்டு.",
      "වාක්‍යයේ තියෙන හැම Nomen එකක්ම තට්ටු කරන්න.",
    ),
    sentence,
    targets: [target],
    tip,
  },
});

const colourSentence = (
  id: string,
  sentence: string,
  items: { text: string; basket: "nomen" | "verb" | "pronomen" }[],
): GrammarStep => ({
  tier: "medium",
  q: {
    id,
    type: "sort",
    eyebrow: EYEBROW.colours,
    title: "Färbe den Satz",
    subtitle: l(
      "Put each word into its colour.",
      "ஒவ்வொரு சொல்லையும் அதன் வண்ணத்தில் வை.",
      "එක් එක් වචනය එහි වර්ණයට දාන්න.",
    ),
    sentence,
    baskets: KIND_BASKETS,
    items,
    tip: l(
      "Point at it → Nomen. Do it → Verb. Stands in → Pronomen.",
      "சுட்டிக்காட்ட முடியும் → Nomen. செய்ய முடியும் → Verb. பதிலாக நிற்கும் → Pronomen.",
      "පෙන්වන්න පුළුවන් → Nomen. කරන්න පුළුවන් → Verb. ආදේශ වෙනවා → Pronomen.",
    ),
    reveal: l(
      "Blue Nomen, red Verb, green Pronomen!",
      "நீல Nomen, சிவப்பு Verb, பச்சை Pronomen!",
      "නිල් Nomen, රතු Verb, කොළ Pronomen!",
    ),
  },
});

const FIX_TIP = l(
  "Two reasons for a capital: first word, or a Nomen.",
  "பெரிய எழுத்துக்கு இரண்டு காரணங்கள்: முதல் சொல், அல்லது Nomen.",
  "කැපිටල් අකුරකට හේතු දෙකක්: පළමු වචනය, නැත්නම් Nomen.",
);

const fixCapitals = (id: string, sentence: string, fixed: string): GrammarStep => ({
  tier: "medium",
  q: {
    id,
    type: "capitals",
    eyebrow: EYEBROW.capitals,
    title: "Groß oder klein?",
    subtitle: l(
      "Tap the letters that must be capitals.",
      "பெரிய எழுத்தாக இருக்க வேண்டியவற்றைத் தட்டு.",
      "කැපිටල් විය යුතු අකුරු තට්ටු කරන්න.",
    ),
    sentence,
    fixed,
    tip: FIX_TIP,
    reveal: l(`${fixed}`, `${fixed}`, `${fixed}`),
  },
});

const SWAP_TIP = l(
  "Man → er, woman / girl → sie. First word → capital.",
  "ஆண் → er, பெண் / சிறுமி → sie. முதல் சொல் → பெரிய எழுத்து.",
  "පිරිමි → er, ගැහැණු / ගැහැණු ළමයි → sie. පළමු වචනය → කැපිටල්.",
);

const swap = (id: string, noun: string, pronoun: "Sie" | "Er", decoys: string[]): GrammarStep => ({
  tier: "hard",
  q: {
    id,
    type: "build",
    eyebrow: EYEBROW.standIn,
    title: "Tausche!",
    subtitle: l(
      "Say it again with a Pronomen.",
      "Pronomen பயன்படுத்தி மீண்டும் சொல்.",
      "Pronomen එකක් දාලා ආයෙත් කියන්න.",
    ),
    prompt: {
      sound: { word: `${noun} lernt.` },
      colored: [
        { text: noun, tone: "nomen" },
        { text: "lernt.", tone: "verb" },
      ],
    },
    answer: [pronoun, "lernt"],
    decoys,
    punct: ["", "."],
    tileStyle: "word",
    tip: SWAP_TIP,
  },
});

const sentence = (
  id: string,
  art: string,
  context: L,
  answer: string[],
  decoys: string[],
  punct: string[],
): GrammarStep => ({
  tier: "hard",
  q: {
    id,
    type: "build",
    eyebrow: EYEBROW.sentenceBuilder,
    title: "Baue den Satz",
    subtitle: l(
      "Build it in German. Watch the capitals!",
      "ஜெர்மனில் அமை. பெரிய எழுத்துகளைக் கவனி!",
      "ජර්මන් භාෂාවෙන් හදන්න. කැපිටල් අකුරු ගැන සැලකිලිමත් වෙන්න!",
    ),
    prompt: { art, context },
    answer,
    decoys,
    punct,
    tileStyle: "word",
    tip: FIX_TIP,
  },
});

const steps: GrammarStep[] = [
  // ---- Training ----
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Das Nomen",
        subtitle: l(
          "📦 A person, animal, thing or name.",
          "📦 ஒரு நபர், விலங்கு, பொருள் அல்லது பெயர்.",
          "📦 පුද්ගලයෙක්, සතෙක්, දෙයක් හෝ නමක්.",
        ),
        art: "👉🧑",
        rows: [
          {
            big: "📦",
            tone: "nomen",
            text: l(
              "ALWAYS a capital letter: M F K A. Can you point at it? → Nomen!",
              "எப்போதும் பெரிய எழுத்து: M F K A. அதைச் சுட்டிக்காட்ட முடியுமா? → Nomen!",
              "හැමවිටම කැපිටල් අකුරක්: M F K A. ඒක පෙන්වන්න පුළුවන්ද? → Nomen!",
            ),
            hear: ["der Mann", "die Frau", "das Kind", "Anna"],
          },
        ],
      },
    ],
    q: yesNo(
      "f2a",
      "Ist das ein Nomen?",
      l("Is this word a Nomen? 📦", "இந்தச் சொல் Nomen-ஆ? 📦", "මේ වචනය Nomen එකක්ද? 📦"),
      "Frau",
      "ja",
      l(
        "You can point at a woman → Nomen.",
        "ஒரு பெண்ணைச் சுட்டிக்காட்டலாம் → Nomen.",
        "ගැහැණියක් පෙන්වන්න පුළුවන් → Nomen.",
      ),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Das Verb",
        subtitle: l("⚡ What someone does.", "⚡ ஒருவர் செய்வது.", "⚡ කෙනෙක් කරන දේ."),
        art: "🧒📖",
        rows: [
          {
            big: "⚡",
            tone: "verb",
            text: l(
              "lernen → Anna lernt. Can you do it? → Verb!",
              "lernen → Anna lernt. அதைச் செய்ய முடியுமா? → Verb!",
              "lernen → Anna lernt. ඒක කරන්න පුළුවන්ද? → Verb!",
            ),
            hear: ["lernen", "Anna lernt."],
          },
        ],
      },
    ],
    q: yesNo(
      "f2b",
      "Ist das ein Verb?",
      l("Is this word a Verb? ⚡", "இந்தச் சொல் Verb-ஆ? ⚡", "මේ වචනය Verb එකක්ද? ⚡"),
      "Kind",
      "nein",
      l(
        'You can\'t "do" a child → not a Verb.',
        'குழந்தையைச் "செய்ய" முடியாது → Verb அல்ல.',
        'ළමයෙක් "කරන්න" බැහැ → Verb නොවේ.',
      ),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Das Pronomen",
        subtitle: l("🔁 A stand-in word.", "🔁 பதிலாக நிற்கும் சொல்.", "🔁 ආදේශක වචනයක්."),
        art: "🟦➡️🟩",
        rows: [
          {
            big: "🔁",
            tone: "pronomen",
            text: l(
              "It takes the noun's place: Anna lernt → Sie lernt. ich, du, er, sie are Pronomen.",
              "இது பெயர்ச்சொல்லின் இடத்தை எடுக்கும்: Anna lernt → Sie lernt. ich, du, er, sie ஆகியவை Pronomen.",
              "මේක නාමපදයේ තැන ගන්නවා: Anna lernt → Sie lernt. ich, du, er, sie Pronomen වේ.",
            ),
            hear: ["Anna lernt.", "Sie lernt.", "ich", "du", "er", "sie"],
          },
        ],
      },
      {
        kind: "info",
        title: "Achtung: Großbuchstabe!",
        subtitle: l("⚠️ Capital trap!", "⚠️ பெரிய எழுத்துப் பொறி!", "⚠️ කැපිටල් අකුරු උගුල!"),
        art: "🐭❓🐱",
        rows: [
          {
            big: "Ich · Sie · Hallo",
            text: l(
              "The first word of a sentence always gets a capital too. So look for capitals in the MIDDLE.",
              "வாக்கியத்தின் முதல் சொல்லும் எப்போதும் பெரிய எழுத்தில் தொடங்கும். எனவே நடுவில் உள்ள பெரிய எழுத்துகளைத் தேடு.",
              "වාක්‍යයක පළමු වචනයටත් හැමවිටම කැපිටල් අකුරක් ලැබෙනවා. ඒ නිසා මැද තියෙන කැපිටල් අකුරු හොයන්න.",
            ),
          },
          {
            big: "🐭",
            text: l(
              'Maus: "Ich has a capital — is it a Nomen?" Katze: "No! It\'s first in the sentence."',
              'Maus: "Ich பெரிய எழுத்தில் உள்ளது — அது Nomen-ஆ?" Katze: "இல்லை! அது வாக்கியத்தில் முதலில் உள்ளது."',
              'Maus: "Ich කැපිටල් — ඒක Nomen ද?" Katze: "නැහැ! ඒක වාක්‍යයේ මුලින්ම තියෙන්නේ."',
            ),
          },
        ],
      },
      { kind: "merke" },
    ],
    q: yesNo(
      "f2c",
      "Ist das ein Pronomen?",
      l("Is this word a Pronomen? 🔁", "இந்தச் சொல் Pronomen-ஆ? 🔁", "මේ වචනය Pronomen එකක්ද? 🔁"),
      "du",
      "ja",
      l(
        "du stands in for a person → Pronomen.",
        "du ஒரு நபருக்குப் பதிலாக நிற்கிறது → Pronomen.",
        "du පුද්ගලයෙක් වෙනුවට එනවා → Pronomen.",
      ),
    ),
  },

  // ---- Simple ----
  whichKind(
    "f3-1",
    "Frau",
    NOMEN,
    l("You can point at her.", "அவளைச் சுட்டிக்காட்டலாம்.", "ඇයව පෙන්වන්න පුළුවන්."),
  ),
  whichKind(
    "f3-2",
    "lernen",
    VERB,
    l("You can do it.", "அதை நீ செய்யலாம்.", "ඔබට ඒක කරන්න පුළුවන්."),
  ),
  whichKind(
    "f3-3",
    "du",
    PRONOMEN,
    l(
      "It stands in for a person.",
      "இது ஒரு நபருக்குப் பதிலாக நிற்கிறது.",
      "මේක පුද්ගලයෙක් වෙනුවට එනවා.",
    ),
  ),
  whichKind(
    "f3-4",
    "Kind",
    NOMEN,
    l("Capital letter → Nomen.", "பெரிய எழுத்து → Nomen.", "කැපිටල් අකුර → Nomen."),
  ),
  whichKind(
    "f3-5",
    "ich",
    PRONOMEN,
    l("It stands in for you yourself.", "இது உனக்கே பதிலாக நிற்கிறது.", "මේක ඔබ වෙනුවටම එනවා."),
  ),
  whichKind(
    "f3-6",
    "Mann",
    NOMEN,
    l("Capital letter → Nomen.", "பெரிய எழுத்து → Nomen.", "කැපිටල් අකුර → Nomen."),
  ),
  whichKind(
    "f3-7",
    "er",
    PRONOMEN,
    l(
      "er stands in for a man.",
      "er ஒரு ஆணுக்குப் பதிலாக நிற்கிறது.",
      "er පිරිමියෙක් වෙනුවට එනවා.",
    ),
  ),
  whichKind(
    "f3-8",
    "lernt",
    VERB,
    l("It says what Anna does.", "அன்னா என்ன செய்கிறாள் என்று சொல்கிறது.", "ඇනා කරන දේ කියනවා."),
  ),
  { tier: "easy", q: needsCapital("f4-1", ["frau", "lernen", "du"], "frau") },
  { tier: "easy", q: needsCapital("f4-2", ["ich", "kind", "lernt"], "kind") },
  { tier: "easy", q: needsCapital("f4-3", ["mann", "er", "lernen"], "mann") },
  { tier: "easy", q: needsCapital("f4-4", ["du", "sie", "anna"], "anna") },

  // ---- Medium ----
  tapNomen(
    "f5-1",
    "Die Frau lernt.",
    "Frau",
    l(
      '"Die" has a capital only because it\'s first.',
      '"Die" முதலில் இருப்பதால் மட்டுமே பெரிய எழுத்து.',
      '"Die" ට කැපිටල් තියෙන්නේ ඒක මුලින්ම නිසා පමණයි.',
    ),
  ),
  tapNomen(
    "f5-2",
    "Das Kind lernt.",
    "Kind",
    l(
      '"Das" is first in the sentence — not a Nomen.',
      '"Das" வாக்கியத்தில் முதலில் உள்ளது — Nomen அல்ல.',
      '"Das" වාක්‍යයේ මුලින්ම — Nomen නොවේ.',
    ),
  ),
  tapNomen(
    "f5-3",
    "Hallo, Anna!",
    "Anna",
    l(
      "Hallo is first, Anna is a name → Nomen.",
      "Hallo முதலில், Anna ஒரு பெயர் → Nomen.",
      "Hallo මුලින්ම, Anna නමක් → Nomen.",
    ),
  ),
  tapNomen(
    "f5-4",
    "Der Mann lernt.",
    "Mann",
    l(
      "Look in the middle for capitals.",
      "நடுவில் பெரிய எழுத்துகளைத் தேடு.",
      "මැද කැපිටල් අකුරු හොයන්න.",
    ),
  ),
  colourSentence("f6-1", "Anna lernt.", [
    { text: "Anna", basket: "nomen" },
    { text: "lernt", basket: "verb" },
  ]),
  colourSentence("f6-2", "Sie lernt.", [
    { text: "Sie", basket: "pronomen" },
    { text: "lernt", basket: "verb" },
  ]),
  colourSentence("f6-3", "Das Kind lernt.", [
    { text: "Das Kind", basket: "nomen" },
    { text: "lernt", basket: "verb" },
  ]),
  colourSentence("f6-4", "Der Mann lernt. Er lernt.", [
    { text: "Der Mann", basket: "nomen" },
    { text: "lernt", basket: "verb" },
    { text: "Er", basket: "pronomen" },
    { text: "lernt", basket: "verb" },
  ]),
  fixCapitals("f7-1", "die frau lernt.", "Die Frau lernt."),
  fixCapitals("f7-2", "hallo, anna!", "Hallo, Anna!"),
  fixCapitals("f7-3", "der mann lernt. er lernt.", "Der Mann lernt. Er lernt."),

  // ---- Hard ----
  swap("f8-1", "Die Frau", "Sie", ["sie", "Er", "Frau"]),
  swap("f8-2", "Der Mann", "Er", ["er", "Sie", "Mann"]),
  swap("f8-3", "Anna", "Sie", ["sie", "Er", "Anna"]),
  swap("f8-4", "Tom", "Er", ["er", "Sie", "Tom"]),
  sentence(
    "f9-1",
    "🧒📖",
    l("The child is learning.", "குழந்தை படிக்கிறது.", "ළමයා ඉගෙන ගන්නවා."),
    ["Das", "Kind", "lernt"],
    ["das", "kind"],
    ["", "", "."],
  ),
  sentence(
    "f9-2",
    "👩📖",
    l("The woman is learning.", "பெண் படிக்கிறாள்.", "කාන්තාව ඉගෙන ගන්නවා."),
    ["Die", "Frau", "lernt"],
    ["die", "frau"],
    ["", "", "."],
  ),
  sentence(
    "f9-3",
    "🧒👋",
    l("Hello, Anna!", "வணக்கம், அன்னா!", "ආයුබෝවන්, ඇනා!"),
    ["Hallo", "Anna"],
    ["hallo", "anna"],
    [",", "!"],
  ),
  sentence(
    "f9-4",
    "👦📖",
    l("He is learning.", "அவன் படிக்கிறான்.", "ඔහු ඉගෙන ගන්නවා."),
    ["Er", "lernt"],
    ["er", "Lernt"],
    ["", "."],
  ),
];

export const G1_5_TEST: GrammarTest = {
  id: "g1.5",
  title: "Wortarten",
  meaning: l("Kinds of word", "சொல் வகைகள்", "වචන වර්ග"),
  icon: "🎨",
  merke: {
    line: l(
      "Blue box = Nomen = capital. Red flash = Verb. Green swap = Pronomen.",
      "நீலப் பெட்டி = Nomen = பெரிய எழுத்து. சிவப்பு மின்னல் = Verb. பச்சை மாற்றம் = Pronomen.",
      "නිල් පෙට්ටිය = Nomen = කැපිටල්. රතු විදුලිය = Verb. කොළ මාරුව = Pronomen.",
    ),
    examples: [
      { text: "Die Frau lernt.", sound: { word: "Die Frau lernt." } },
      { text: "Sie lernt.", sound: { word: "Sie lernt." } },
    ],
  },
  warmup: [
    {
      id: "w-ich",
      type: "choice",
      eyebrow: EYEBROW.listening,
      title: "Drache oder Katze?",
      subtitle: l(
        "Listen. Dragon ch or cat ch?",
        "கேள். டிராகன் ch-ஆ பூனை ch-ஆ?",
        "අහන්න. මකර ch ද පූසා ch ද?",
      ),
      prompt: { sound: { word: "ich" }, autoplay: true },
      options: ["🐉 Drache", "🐱 Katze"],
      answer: "🐱 Katze",
    },
    {
      id: "w-nein",
      type: "choice",
      eyebrow: EYEBROW.listening,
      title: "ei oder ie?",
      subtitle: l(
        '"eye" or "ee"? Listen and pick.',
        '"eye"-ஆ "ee"-ஆ? கேட்டுத் தேர்ந்தெடு.',
        '"eye" ද "ee" ද? අහලා තෝරන්න.',
      ),
      prompt: { sound: { word: "nein" }, autoplay: true },
      options: ["nein", "nien"],
      answer: "nein",
    },
  ],
  steps,
};
