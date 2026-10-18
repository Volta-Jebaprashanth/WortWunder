import type { GrammarStep, GrammarTest, L, Question } from "@/lib/grammar-engine";
import { EYEBROW, SUB, l } from "@/data/g1/common";

// G1.2 Das ABC: the German letter names in four "clubs", the tricksters
// (E I J V W Z), and spelling a name aloud. Part C of screens.md.

const hearLetter = (
  id: string,
  letter: string,
  options: string[],
  tip: L,
  eyebrow = EYEBROW.listening,
): Question => ({
  id,
  type: "choice",
  eyebrow,
  title: "Was hörst du?",
  subtitle: SUB.listenTapLetter,
  prompt: { sound: { letter }, autoplay: true },
  options,
  answer: letter,
  optionStyle: "letter",
  optionSound: "letter",
  tip,
});

const soundOf = (id: string, letter: string, others: string[], tip: L): Question => ({
  id,
  type: "sound",
  eyebrow: EYEBROW.soundCheck,
  title: "Wie klingt das?",
  subtitle: l("Which sound is this letter?", "இந்த எழுத்தின் ஒலி எது?", "මේ අකුරේ ශබ්දය කුමක්ද?"),
  show: letter,
  sounds: [{ letter }, ...others.map((o) => ({ letter: o }))],
  tip,
});

const spelledName = (id: string, name: string, options: string[], tip: L): Question => ({
  id,
  type: "choice",
  eyebrow: EYEBROW.spelling,
  title: "Wie heißt sie?",
  subtitle: l(
    "Listen to the spelling. Which name is it?",
    "எழுத்துக்கூட்டலைக் கேள். இது எந்தப் பெயர்?",
    "අකුරු කියන එක අහන්න. මේ කුමන නමද?",
  ),
  prompt: { art: "🏷️", sound: { spell: name }, autoplay: true },
  options,
  answer: name,
  optionSound: "spell",
  tip,
});

const buildName = (
  id: string,
  name: string,
  decoys: string,
  fast = false,
  reveal?: L,
): Question => ({
  id,
  type: "build",
  eyebrow: EYEBROW.spelling,
  title: fast ? "Schnell!" : "Baue den Namen",
  subtitle: fast
    ? l(
        "Fast! Listen to the spelling, then build it.",
        "வேகமாக! எழுத்துக்கூட்டலைக் கேட்டு அதை அமை.",
        "ඉක්මනින්! අකුරු කියන එක අහලා එය හදන්න.",
      )
    : l(
        "Listen to the spelling, then build it.",
        "எழுத்துக்கூட்டலைக் கேட்டு அதை அமை.",
        "අකුරු කියන එක අහලා එය හදන්න.",
      ),
  prompt: { sound: { spell: name, fast }, autoplay: true },
  answer: Array.from(name),
  decoys: Array.from(decoys),
  ...(reveal ? { reveal } : {}),
});

const clubBaskets = {
  eh: { id: "eh", label: l('🎵 "-eh" club', '🎵 "-eh" குழு', '🎵 "-eh" කණ්ඩායම') },
  e: { id: "e", label: l('🔔 "e-" club', '🔔 "e-" குழு', '🔔 "e-" කණ්ඩායම') },
  ah: { id: "ah", label: l('😮 "-ah" club', '😮 "-ah" குழு', '😮 "-ah" කණ්ඩායම') },
};

const clubSort = (
  id: string,
  a: keyof typeof clubBaskets,
  aLetters: string,
  b: keyof typeof clubBaskets,
  bLetters: string,
): Question => ({
  id,
  type: "sort",
  eyebrow: EYEBROW.sorting,
  title: "Welcher Club?",
  subtitle: l(
    "Put each letter into its club. Tap a letter to hear it.",
    "ஒவ்வொரு எழுத்தையும் அதன் குழுவில் வை. கேட்க எழுத்தைத் தட்டு.",
    "එක් එක් අකුර එහි කණ්ඩායමට දාන්න. අහන්න අකුර තට්ටු කරන්න.",
  ),
  baskets: [clubBaskets[a], clubBaskets[b]],
  items: [
    ...Array.from(aLetters).map((ch) => ({ text: ch, basket: a, sound: { letter: ch } })),
    ...Array.from(bLetters).map((ch) => ({ text: ch, basket: b, sound: { letter: ch } })),
  ],
  tip: l(
    'Say it out loud: does it end in "eh", start with "e", or say "ah"?',
    'சத்தமாகச் சொல்: "eh"-இல் முடிகிறதா, "e"-இல் தொடங்குகிறதா, அல்லது "ah" என்கிறதா?',
    'හයියෙන් කියන්න: "eh" වලින් ඉවර වෙනවද, "e" වලින් පටන් ගන්නවද, නැත්නම් "ah" ද?',
  ),
});

const CLUB_SUB = SUB.tapEachLetter;

const steps: GrammarStep[] = [
  // ---- Training ----
  {
    tier: "training",
    intro: [
      {
        kind: "letters",
        title: "Das ABC",
        subtitle: CLUB_SUB,
        heading: l(
          '🎵 The "-eh" club: they all rhyme!',
          '🎵 "-eh" குழு: எல்லாம் ஒரே ஓசையில் முடியும்!',
          '🎵 "-eh" කණ්ඩායම: හැම එකම එක වගේ ඉවර වෙනවා!',
        ),
        tiles: [
          { letter: "B", sound: "beh" },
          { letter: "C", sound: "tseh" },
          { letter: "D", sound: "deh" },
          { letter: "E", sound: "eh" },
          { letter: "G", sound: "geh" },
          { letter: "P", sound: "peh" },
          { letter: "T", sound: "teh" },
          { letter: "W", sound: "weh" },
        ],
      },
    ],
    q: hearLetter(
      "c2a",
      "T",
      ["T", "D"],
      l(
        'T is "teh" — your tongue taps hard.',
        'T என்பது "teh" — நாக்கு வேகமாகத் தட்டும்.',
        'T යනු "teh" — දිව තදින් තට්ටු වෙනවා.',
      ),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "letters",
        title: "Das ABC",
        subtitle: CLUB_SUB,
        heading: l(
          '🔔 The "e-" club: they start with "e"',
          '🔔 "e-" குழு: "e"-இல் தொடங்கும்',
          '🔔 "e-" කණ්ඩායම: "e" වලින් පටන් ගන්නවා',
        ),
        tiles: [
          { letter: "F", sound: "eff" },
          { letter: "L", sound: "ell" },
          { letter: "M", sound: "emm" },
          { letter: "N", sound: "enn" },
          { letter: "R", sound: "err" },
          { letter: "S", sound: "ess" },
        ],
      },
    ],
    q: hearLetter(
      "c2b",
      "M",
      ["M", "N"],
      l(
        'M is "emm" — lips close.',
        'M என்பது "emm" — உதடுகள் மூடும்.',
        'M යනු "emm" — තොල් වැසෙනවා.',
      ),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "letters",
        title: "Das ABC",
        subtitle: CLUB_SUB,
        heading: l(
          '😮 The "-ah" club: open your mouth!',
          '😮 "-ah" குழு: வாயைத் திற!',
          '😮 "-ah" කණ්ඩායම: කට අරින්න!',
        ),
        tiles: [
          { letter: "A", sound: "ah" },
          { letter: "H", sound: "hah" },
          { letter: "K", sound: "kah" },
        ],
      },
    ],
    q: hearLetter(
      "c2c",
      "H",
      ["H", "K"],
      l(
        'H is "hah" — like a breath.',
        'H என்பது "hah" — ஒரு மூச்சு போல.',
        'H යනු "hah" — හුස්මක් වගේ.',
      ),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "letters",
        title: "Das ABC",
        subtitle: CLUB_SUB,
        heading: l(
          "🃏 The odd ones: each has its own name",
          "🃏 தனித்தவை: ஒவ்வொன்றுக்கும் சொந்தப் பெயர்",
          "🃏 වෙනස් ඒවා: හැම එකටම තමන්ගේම නමක්",
        ),
        tiles: [
          { letter: "I", sound: "ih" },
          { letter: "J", sound: "jott" },
          { letter: "O", sound: "oh" },
          { letter: "Q", sound: "kuh" },
          { letter: "U", sound: "uh" },
          { letter: "V", sound: "fau" },
          { letter: "X", sound: "iks" },
          { letter: "Y", sound: "üpsilon" },
          { letter: "Z", sound: "tsett" },
        ],
      },
    ],
    q: hearLetter(
      "c2d",
      "V",
      ["V", "W"],
      l('V is "fau", W is "weh".', 'V என்பது "fau", W என்பது "weh".', 'V යනු "fau", W යනු "weh".'),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Achtung! Tricksters",
        subtitle: l(
          "These letters fool English speakers.",
          "இந்த எழுத்துகள் ஆங்கிலம் பேசுபவர்களை ஏமாற்றும்.",
          "මේ අකුරු ඉංග්‍රීසි කතා කරන අයව රවටනවා.",
        ),
        art: "🐭❓",
        rows: [
          {
            big: "E",
            text: l(
              'sounds like the English letter "A" (eh)',
              'ஆங்கில "A" எழுத்து போல ஒலிக்கும் (eh)',
              'ඉංග්‍රීසි "A" අකුර වගේ ඇසෙනවා (eh)',
            ),
            hearLetters: ["E"],
          },
          {
            big: "I",
            text: l(
              'sounds like the English letter "E" (ee)',
              'ஆங்கில "E" எழுத்து போல ஒலிக்கும் (ee)',
              'ඉංග්‍රීසි "E" අකුර වගේ ඇසෙනවා (ee)',
            ),
            hearLetters: ["I"],
          },
          {
            big: "J",
            text: l('is "yott", not "jay"', '"yott", "jay" அல்ல', '"yott", "jay" නොවේ'),
            hearLetters: ["J"],
          },
          {
            big: "V · W",
            text: l(
              'V is "fau", W is "veh"',
              'V என்பது "fau", W என்பது "veh"',
              'V යනු "fau", W යනු "veh"',
            ),
            hearLetters: ["V", "W"],
          },
          {
            big: "Z",
            text: l('is "tsett"', '"tsett"', '"tsett"'),
            hearLetters: ["Z"],
          },
        ],
      },
      { kind: "merke" },
    ],
    q: hearLetter(
      "c3check",
      "I",
      ["I", "E"],
      l(
        'I says "ee". E says "eh". They swap!',
        'I "ee" என்கிறது. E "eh" என்கிறது. இடம் மாறுகின்றன!',
        'I කියන්නේ "ee". E කියන්නේ "eh". ඒවා මාරු වෙනවා!',
      ),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "spell",
        title: "Buchstabieren",
        subtitle: l(
          "Spelling: say each letter of a name.",
          "எழுத்துக்கூட்டல்: பெயரின் ஒவ்வொரு எழுத்தையும் சொல்.",
          "අකුරු කීම: නමක එක් එක් අකුර කියන්න.",
        ),
        art: "🐱🏷️",
        name: "ANNA",
      },
    ],
    q: {
      ...spelledName(
        "c4check",
        "ANNA",
        ["ANNA", "ANA"],
        l(
          "Count the letters: N comes twice.",
          "எழுத்துகளை எண்ணு: N இரண்டு முறை வருகிறது.",
          "අකුරු ගණන් කරන්න: N දෙපාරක් එනවා.",
        ),
      ),
      title: "Buchstabieren",
    },
  },

  // ---- Simple ----
  ...(
    [
      [
        "E",
        "EIAG",
        l(
          'E says "eh", like English "A".',
          'E "eh" என்கிறது, ஆங்கில "A" போல.',
          'E කියන්නේ "eh", ඉංග්‍රීසි "A" වගේ.',
        ),
      ],
      [
        "I",
        "IEYA",
        l(
          'I says "ee", like English "E".',
          'I "ee" என்கிறது, ஆங்கில "E" போல.',
          'I කියන්නේ "ee", ඉංග්‍රීසි "E" වගේ.',
        ),
      ],
      [
        "A",
        "AEHR",
        l('A says "ah", mouth open.', 'A "ah" என்கிறது, வாய் திறந்து.', 'A කියන්නේ "ah", කට ඇරලා.'),
      ],
      ["J", "JGYI", l('J says "yott".', 'J "yott" என்கிறது.', 'J කියන්නේ "yott".')],
      [
        "G",
        "GJKC",
        l(
          'G says "geh", it rhymes with E.',
          'G "geh" என்கிறது, E போல முடியும்.',
          'G කියන්නේ "geh", E වගේ ඉවර වෙනවා.',
        ),
      ],
      ["V", "VWFU", l('V says "fau".', 'V "fau" என்கிறது.', 'V කියන්නේ "fau".')],
      ["W", "WVUB", l('W says "weh".', 'W "weh" என்கிறது.', 'W කියන්නේ "weh".')],
      ["Z", "ZCST", l('Z says "tsett".', 'Z "tsett" என்கிறது.', 'Z කියන්නේ "tsett".')],
      ["Y", "YJIU", l('Y says "üpsilon".', 'Y "üpsilon" என்கிறது.', 'Y කියන්නේ "üpsilon".')],
      [
        "R",
        "RAHE",
        l(
          'R says "err" — from the throat.',
          'R "err" என்கிறது — தொண்டையிலிருந்து.',
          'R කියන්නේ "err" — උගුරෙන්.',
        ),
      ],
    ] as const
  ).map(([letter, options, tip], i): GrammarStep => ({
    tier: "easy",
    q: hearLetter(`c5-${i + 1}`, letter, Array.from(options), tip),
  })),
  ...(
    [
      ["E", "IA", l('E is "eh".', 'E என்பது "eh".', 'E යනු "eh".')],
      ["I", "EA", l('I is "ee".', 'I என்பது "ee".', 'I යනු "ee".')],
      ["J", "GY", l('J is "yott".', 'J என்பது "yott".', 'J යනු "yott".')],
      ["V", "WF", l('V is "fau".', 'V என்பது "fau".', 'V යනු "fau".')],
      ["W", "VB", l('W is "weh".', 'W என்பது "weh".', 'W යනු "weh".')],
      ["Z", "CS", l('Z is "tsett".', 'Z என்பது "tsett".', 'Z යනු "tsett".')],
    ] as const
  ).map(([letter, others, tip], i): GrammarStep => ({
    tier: "easy",
    q: soundOf(`c6-${i + 1}`, letter, Array.from(others), tip),
  })),

  // ---- Medium ----
  ...(
    [
      ["JAN", ["JAN", "YAN", "GAN", "JEN"], l('"yott" is J.', '"yott" என்பது J.', '"yott" යනු J.')],
      [
        "EVA",
        ["EVA", "IVA", "EWA", "AVA"],
        l('"eh" is E, "fau" is V.', '"eh" என்பது E, "fau" என்பது V.', '"eh" යනු E, "fau" යනු V.'),
      ],
      ["IDA", ["IDA", "EDA", "IDE", "ADA"], l('"ee" is I.', '"ee" என்பது I.', '"ee" යනු I.')],
      ["UWE", ["UWE", "UVE", "OWE", "UWI"], l('"weh" is W.', '"weh" என்பது W.', '"weh" යනු W.')],
      [
        "ZOE",
        ["ZOE", "ZOI", "COE", "SOE"],
        l('"tsett" is Z.', '"tsett" என்பது Z.', '"tsett" යනු Z.'),
      ],
      [
        "MAX",
        ["MAX", "MEX", "NAX", "MAKS"],
        l('"ah" is A, "iks" is X.', '"ah" என்பது A, "iks" என்பது X.', '"ah" යනු A, "iks" යනු X.'),
      ],
    ] as const
  ).map(([name, options, tip], i): GrammarStep => ({
    tier: "medium",
    q: spelledName(`c7-${i + 1}`, name, [...options], tip),
  })),
  { tier: "medium", q: clubSort("c8-1", "eh", "DTG", "e", "FMS") },
  { tier: "medium", q: clubSort("c8-2", "eh", "BPW", "ah", "AHK") },
  { tier: "medium", q: clubSort("c8-3", "e", "LNR", "ah", "AHK") },

  // ---- Hard ----
  { tier: "hard", q: buildName("c9-1", "TOM", "DU") },
  { tier: "hard", q: buildName("c9-2", "BEN", "IP") },
  { tier: "hard", q: buildName("c9-3", "LENA", "IM") },
  { tier: "hard", q: buildName("c9-4", "PAUL", "BR") },
  { tier: "hard", q: buildName("c9-5", "EMIL", "YN") },
  { tier: "hard", q: buildName("c9-6", "JENS", "GI") },
  {
    tier: "hard",
    q: buildName(
      "c10-1",
      "JA",
      "GY",
      true,
      l("You spelled ja! 👍", "நீ ja என்று எழுத்துக்கூட்டினாய்! 👍", "ඔබ ja අකුරු කිව්වා! 👍"),
    ),
  },
  {
    tier: "hard",
    q: buildName(
      "c10-2",
      "DU",
      "TO",
      true,
      l("You spelled du! 👉", "நீ du என்று எழுத்துக்கூட்டினாய்! 👉", "ඔබ du අකුරු කිව්වා! 👉"),
    ),
  },
  {
    tier: "hard",
    q: buildName(
      "c10-3",
      "ICH",
      "EK",
      true,
      l("You spelled ich! 🙋", "நீ ich என்று எழுத்துக்கூட்டினாய்! 🙋", "ඔබ ich අකුරු කිව්වා! 🙋"),
    ),
  },
  {
    tier: "hard",
    q: {
      id: "c11",
      type: "build",
      eyebrow: EYEBROW.spelling,
      title: "Dein Name!",
      subtitle: l(
        "This is YOUR name. Listen and build it.",
        "இது உன் பெயர். கேட்டு அதை அமை.",
        "මේ ඔබේ නම. අහලා එය හදන්න.",
      ),
      prompt: { art: "🏷️", autoplay: true },
      answer: [],
      decoys: [],
      dynamic: "yourName",
      fallbackNote: l(
        "Let's spell Anna's name.",
        "அன்னாவின் பெயரை எழுத்துக்கூட்டுவோம்.",
        "අපි ඇනාගේ නම අකුරු කියමු.",
      ),
      reveal: l(
        "⭐ Toll! Now you can spell your name in German.",
        "⭐ Toll! இப்போது உன் பெயரை ஜெர்மனில் எழுத்துக்கூட்ட முடியும்.",
        "⭐ Toll! දැන් ඔබට ඔබේ නම ජර්මන් භාෂාවෙන් අකුරු කියන්න පුළුවන්.",
      ),
    },
  },
];

export const G1_2_TEST: GrammarTest = {
  id: "g1.2",
  title: "Das ABC",
  meaning: l("The alphabet", "எழுத்துக்கள்", "හෝඩිය"),
  icon: "🔤",
  merke: {
    line: l(
      "E and I swap places. J says yott.",
      'E-யும் I-யும் இடம் மாறுகின்றன. J "yott" என்கிறது.',
      'E සහ I මාරු වෙනවා. J කියන්නේ "yott".',
    ),
    examples: [
      { text: "E", sound: { letter: "E" } },
      { text: "I", sound: { letter: "I" } },
      { text: "J", sound: { letter: "J" } },
    ],
  },
  // No warm-up: G1.2 opens straight on the alphabet.
  warmup: [],
  steps,
};
