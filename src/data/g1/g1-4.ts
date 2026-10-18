import type { GrammarStep, GrammarTest, L, Question, Sound } from "@/lib/grammar-engine";
import { EYEBROW, SUB, l } from "@/data/g1/common";

// G1.4 Buchstaben-Teams: letter pairs that make one sound (ei ie au eu sch
// ch sp st) and the "swap letters" (j w v z). In the builders a team is one
// tile. Part E of screens.md. The "en:" sounds are the wrong readings an
// English speaker would give (recorded with an English voice).

const EI_IE_TIP = l(
  "Say the second letter's English name: e-I = eye, i-E = ee.",
  "இரண்டாவது எழுத்தின் ஆங்கிலப் பெயரைச் சொல்: e-I = eye, i-E = ee.",
  "දෙවන අකුරේ ඉංග්‍රීසි නම කියන්න: e-I = eye, i-E = ee.",
);

const twoSpellings = (
  id: string,
  word: string,
  options: string[],
  tip: L,
  title = "Was hörst du?",
): Question => ({
  id,
  type: "choice",
  eyebrow: EYEBROW.listening,
  title,
  subtitle: SUB.listenChoose,
  prompt: { sound: { word }, autoplay: true },
  options,
  answer: word,
  optionSound: "word",
  tip,
});

const soundOf = (id: string, word: string, wrong: [string, string], tip: L): Question => ({
  id,
  type: "sound",
  eyebrow: EYEBROW.soundCheck,
  title: "Wie klingt das?",
  subtitle: l("Which sound is this word?", "இந்தச் சொல்லின் ஒலி எது?", "මේ වචනයේ ශබ්දය කුමක්ද?"),
  show: word,
  sounds: [{ word }, ...wrong.map((w): Sound => ({ word: `en:${w}` }))],
  tip,
});

const fillTeam = (
  id: string,
  word: string,
  pattern: string,
  options: string[],
  answer: string,
  tip: L,
): GrammarStep => ({
  tier: "medium",
  q: {
    id,
    type: "choice",
    eyebrow: EYEBROW.missing,
    title: "Welches Team fehlt?",
    subtitle: SUB.pickMissing,
    prompt: { sound: { word }, autoplay: true, show: pattern, showStyle: "pattern" },
    options,
    answer,
    tip,
  },
});

const chunkBuild = (id: string, word: string, answer: string[], decoys: string[]): GrammarStep => ({
  tier: "hard",
  q: {
    id,
    type: "build",
    eyebrow: EYEBROW.teamBuilder,
    title: "Baue das Wort",
    subtitle: l(
      "Listen, then build it. Teams are 1 tile.",
      "கேட்டு அதை அமை. ஒரு குழு = 1 ஓடு.",
      "අහලා එය හදන්න. කණ්ඩායමක් = ටයිල් 1යි.",
    ),
    prompt: { sound: { word }, autoplay: true },
    answer,
    decoys,
    tileStyle: "chunk",
  },
});

const dragonCat = (id: string, dragon: string[], cat: string[]): GrammarStep => ({
  tier: "medium",
  q: {
    id,
    type: "sort",
    eyebrow: EYEBROW.sorting,
    title: "Drache oder Katze?",
    subtitle: l(
      "Tap a word to hear it. Which ch is it?",
      "சொல்லைத் தட்டிக் கேள். இது எந்த ch?",
      "වචනය තට්ටු කර අහන්න. මේ කුමන ch ද?",
    ),
    baskets: [
      { id: "dragon", label: l("🐉 dragon ch", "🐉 டிராகன் ch", "🐉 මකර ch") },
      { id: "cat", label: l("🐱 cat ch", "🐱 பூனை ch", "🐱 පූසා ch") },
    ],
    items: [
      ...dragon.map((w) => ({ text: w, basket: "dragon", sound: { word: w } })),
      ...cat.map((w) => ({ text: w, basket: "cat", sound: { word: w } })),
    ],
    tip: l(
      "Look before the ch: a, o, u, au → dragon. Anything else → cat.",
      "ch-க்கு முன் பார்: a, o, u, au → டிராகன். மற்றவை → பூனை.",
      "ch ට කලින් බලන්න: a, o, u, au → මකරා. වෙන ඕනෑම එකක් → පූසා.",
    ),
  },
});

const steps: GrammarStep[] = [
  // ---- Training ----
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Buchstaben-Teams",
        subtitle: l(
          "Some letters work as a team: one sound.",
          "சில எழுத்துகள் ஒரு குழுவாக வேலை செய்கின்றன: ஒரே ஒலி.",
          "සමහර අකුරු කණ්ඩායමක් විදිහට වැඩ කරනවා: එක ශබ්දයක්.",
        ),
        art: "👁️",
        rows: [
          {
            big: 'ei = "eye"',
            text: l("You know nein!", "உனக்கு nein தெரியும்!", "ඔබ nein දන්නවා!"),
            hear: ["mein", "nein"],
          },
          {
            big: 'ie = "ee"',
            text: l(
              "★ Say the English name of the SECOND letter: e-I → eye, i-E → ee.",
              "★ இரண்டாவது எழுத்தின் ஆங்கிலப் பெயரைச் சொல்: e-I → eye, i-E → ee.",
              "★ දෙවන අකුරේ ඉංග්‍රීසි නම කියන්න: e-I → eye, i-E → ee.",
            ),
            hear: ["wie", "Liebe"],
          },
          {
            big: 'au = "ow!" 🤕',
            text: l(
              "Like when you bump your knee.",
              "முழங்காலில் இடித்துக்கொண்டால் சொல்வது போல.",
              "දණහිස හැප්පුණාම කියනවා වගේ.",
            ),
            hear: ["Haus", "Maus"],
          },
          {
            big: 'eu / äu = "oy"',
            text: l('Like "boy".', '"boy" போல.', '"boy" වගේ.'),
            hear: ["neu", "Euro", "Häuser"],
          },
        ],
      },
    ],
    q: twoSpellings(
      "e2a1",
      "mein",
      ["mein", "mien"],
      l('"eye" → ei.', '"eye" → ei.', '"eye" → ei.'),
    ),
  },
  {
    tier: "training",
    q: twoSpellings(
      "e2a2",
      "Maus",
      ["Maus", "Meus"],
      l('"ow!" → au.', '"ow!" → au.', '"ow!" → au.'),
    ),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Konsonanten-Teams",
        subtitle: l(
          "Consonant teams: one sound each.",
          "மெய்யெழுத்துக் குழுக்கள்: ஒவ்வொன்றுக்கும் ஒரு ஒலி.",
          "ව්‍යඤ්ජන කණ්ඩායම්: හැම එකකටම එක ශබ්දයක්.",
        ),
        art: "🐉🐱",
        rows: [
          {
            big: 'sch = "sh" 🤫',
            text: l("Three letters, one shh.", "மூன்று எழுத்துகள், ஒரே ஷ்.", "අකුරු තුනයි, එක ෂ්."),
            hear: ["Schule", "Fisch"],
          },
          {
            big: "ch 🐉",
            text: l(
              "After a, o, u, au: the scratchy dragon sound in the throat.",
              "a, o, u, au-க்குப் பின்: தொண்டையில் கரகரப்பான டிராகன் ஒலி.",
              "a, o, u, au ට පස්සේ: උගුරේ රළු මකර ශබ්දය.",
            ),
            hear: ["acht", "Buch", "auch"],
          },
          {
            big: "ch 🐱",
            text: l(
              "After everything else: the soft cat hiss.",
              "மற்ற எல்லாவற்றுக்கும் பின்: மென்மையான பூனைச் சீறல்.",
              "අනිත් හැම එකකටම පස්සේ: මෘදු පූසා හිස් ශබ්දය.",
            ),
            hear: ["ich", "nicht", "Milch"],
          },
          {
            big: 'sp / st = "shp / sht"',
            text: l("At the start of a word.", "சொல்லின் தொடக்கத்தில்.", "වචනයක මුලදී."),
            hear: ["Sport", "Straße", "Stuhl"],
          },
        ],
      },
    ],
    q: twoSpellings(
      "e2b1",
      "Schule",
      ["Schule", "Sule"],
      l(
        '"sh" is three letters: sch.',
        '"sh" என்பது மூன்று எழுத்துகள்: sch.',
        '"sh" කියන්නේ අකුරු තුනක්: sch.',
      ),
    ),
  },
  {
    tier: "training",
    q: {
      id: "e2b2",
      type: "choice",
      eyebrow: EYEBROW.listening,
      title: "Drache oder Katze?",
      subtitle: l(
        "Listen. Dragon ch or cat ch?",
        "கேள். டிராகன் ch-ஆ பூனை ch-ஆ?",
        "අහන්න. මකර ch ද පූසා ch ද?",
      ),
      prompt: { sound: { word: "ich" }, autoplay: true, show: "ich", showStyle: "word" },
      options: ["🐉 Drache", "🐱 Katze"],
      answer: "🐱 Katze",
      tip: l(
        "After i it's the soft cat hiss.",
        "i-க்குப் பின் அது மென்மையான பூனைச் சீறல்.",
        "i ට පස්සේ ඒක මෘදු පූසා හිස් ශබ්දය.",
      ),
    },
  },
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Tausch-Buchstaben",
        subtitle: l(
          "They borrow another letter's sound.",
          "இவை வேறொரு எழுத்தின் ஒலியைக் கடன் வாங்குகின்றன.",
          "මේවා වෙන අකුරක ශබ්දය ණයට ගන්නවා.",
        ),
        art: "🔁",
        rows: [
          { big: "j = y", text: l('English "y"', 'ஆங்கில "y"', 'ඉංග්‍රීසි "y"'), hear: ["ja"] },
          { big: "w = v", text: l('English "v"', 'ஆங்கில "v"', 'ඉංග්‍රීසි "v"'), hear: ["wie"] },
          { big: "v = f", text: l('English "f"', 'ஆங்கில "f"', 'ඉංග්‍රීසි "f"'), hear: ["Vater"] },
          {
            big: "z = ts",
            text: l('"ts" like in "cats"', '"cats"-இல் உள்ள "ts"', '"cats" හි "ts" වගේ'),
            hear: ["Zoo", "Zebra"],
          },
        ],
      },
      { kind: "merke" },
    ],
    q: twoSpellings(
      "e2c1",
      "Zoo",
      ["Zoo", "Tsoo"],
      l('"ts" is written z.', '"ts" என்பது z என எழுதப்படும்.', '"ts" ලියන්නේ z.'),
    ),
  },
  {
    tier: "training",
    q: twoSpellings(
      "e2c2",
      "Vater",
      ["Vater", "Fater"],
      l(
        "In German, v sounds like f.",
        "ஜெர்மனில் v என்பது f போல ஒலிக்கும்.",
        "ජර්මන් භාෂාවේ v ඇසෙන්නේ f වගේ.",
      ),
    ),
  },

  // ---- Simple ----
  ...(
    [
      ["mein", "mien"],
      ["wie", "wei"],
      ["nein", "nien"],
      ["Liebe", "Leibe"],
      ["sie", "sei"],
      ["die", "dei"],
    ] as const
  ).map(([word, other], i): GrammarStep => ({
    tier: "easy",
    q: {
      ...twoSpellings(`e3-${i + 1}`, word, [word, other], EI_IE_TIP, "ei oder ie?"),
      subtitle: l(
        '"eye" or "ee"? Listen and pick.',
        '"eye"-ஆ "ee"-ஆ? கேட்டுத் தேர்ந்தெடு.',
        '"eye" ද "ee" ද? අහලා තෝරන්න.',
      ),
    },
  })),
  {
    tier: "easy",
    q: soundOf(
      "e4-1",
      "ja",
      ["jah", "ha"],
      l("j sounds like y.", "j என்பது y போல ஒலிக்கும்.", "j ඇසෙන්නේ y වගේ."),
    ),
  },
  {
    tier: "easy",
    q: soundOf(
      "e4-2",
      "wie",
      ["wee", "why"],
      l("w sounds like v.", "w என்பது v போல ஒலிக்கும்.", "w ඇසෙන්නේ v වගේ."),
    ),
  },
  {
    tier: "easy",
    q: soundOf(
      "e4-3",
      "Vater",
      ["vah-ter", "wah-ter"],
      l("v sounds like f.", "v என்பது f போல ஒலிக்கும்.", "v ඇසෙන්නේ f වගේ."),
    ),
  },
  {
    tier: "easy",
    q: soundOf(
      "e4-4",
      "Zoo",
      ["zoo", "so"],
      l("z sounds like ts.", "z என்பது ts போல ஒலிக்கும்.", "z ඇසෙන්නේ ts වගේ."),
    ),
  },
  {
    tier: "easy",
    q: soundOf(
      "e4-5",
      "Schule",
      ["skoo-leh", "soo-leh"],
      l("sch sounds like sh.", "sch என்பது sh போல ஒலிக்கும்.", "sch ඇසෙන්නේ sh වගේ."),
    ),
  },
  {
    tier: "easy",
    q: soundOf(
      "e4-6",
      "Haus",
      ["hoos", "hoys"],
      l('au sounds like "ow!".', 'au என்பது "ow!" போல ஒலிக்கும்.', 'au ඇසෙන්නේ "ow!" වගේ.'),
    ),
  },

  // ---- Medium ----
  dragonCat("e5-1", ["acht", "Buch"], ["ich", "nicht"]),
  dragonCat("e5-2", ["auch", "Nacht"], ["Milch", "Küche"]),
  fillTeam(
    "e6-1",
    "Haus",
    "H▢s",
    ["au", "eu", "ei"],
    "au",
    l('"ow!" → au.', '"ow!" → au.', '"ow!" → au.'),
  ),
  fillTeam(
    "e6-2",
    "wie",
    "w▢",
    ["ie", "ei", "ee"],
    "ie",
    l('"ee" → ie.', '"ee" → ie.', '"ee" → ie.'),
  ),
  fillTeam(
    "e6-3",
    "Schule",
    "▢ule",
    ["Sch", "Sh", "Ch"],
    "Sch",
    l(
      'German writes "sh" as sch.',
      'ஜெர்மனில் "sh" என்பது sch என எழுதப்படும்.',
      'ජර්මන් භාෂාවේ "sh" ලියන්නේ sch.',
    ),
  ),
  fillTeam(
    "e6-4",
    "neu",
    "n▢",
    ["eu", "au", "oi"],
    "eu",
    l('"oy" → eu.', '"oy" → eu.', '"oy" → eu.'),
  ),
  fillTeam(
    "e6-5",
    "mein",
    "m▢n",
    ["ei", "ie", "ai"],
    "ei",
    l('"eye" → ei.', '"eye" → ei.', '"eye" → ei.'),
  ),
  fillTeam(
    "e6-6",
    "Sport",
    "▢ort",
    ["Sp", "Schp", "Sb"],
    "Sp",
    l(
      'You say "shp" but write sp.',
      'நீ "shp" என்று சொல்கிறாய், ஆனால் sp என எழுது.',
      'ඔබ කියන්නේ "shp", ඒත් ලියන්නේ sp.',
    ),
  ),
  ...(
    [
      [
        "wie",
        ["wie", "vie", "wee", "wei"],
        l("w sounds like v, ie is ee.", "w என்பது v, ie என்பது ee.", "w ඇසෙන්නේ v, ie යනු ee."),
      ],
      [
        "ja",
        ["ja", "ya", "jah", "dja"],
        l(
          "German writes the y sound as j.",
          "ஜெர்மனில் y ஒலி j என எழுதப்படும்.",
          "ජර්මන් භාෂාවේ y ශබ්දය ලියන්නේ j.",
        ),
      ],
      [
        "Vater",
        ["Vater", "Fater", "Water", "Vata"],
        l(
          "The f sound here is written v.",
          "இங்கே f ஒலி v என எழுதப்படும்.",
          "මෙහි f ශබ්දය ලියන්නේ v.",
        ),
      ],
      [
        "Zoo",
        ["Zoo", "Tsoo", "Soo", "Zu"],
        l("The ts sound is written z.", "ts ஒலி z என எழுதப்படும்.", "ts ශබ්දය ලියන්නේ z."),
      ],
    ] as const
  ).map(([word, options, tip], i): GrammarStep => ({
    tier: "medium",
    q: twoSpellings(`e7-${i + 1}`, word, [...options], tip),
  })),

  // ---- Hard ----
  chunkBuild("e8-1", "Haus", ["H", "au", "s"], ["eu", "ei"]),
  chunkBuild("e8-2", "Schule", ["Sch", "u", "l", "e"], ["Sh", "o"]),
  chunkBuild("e8-3", "mein", ["m", "ei", "n"], ["ie", "ai"]),
  chunkBuild("e8-4", "acht", ["a", "ch", "t"], ["g", "k"]),
  chunkBuild("e8-5", "Sport", ["Sp", "o", "r", "t"], ["Schp", "b"]),
  chunkBuild("e8-6", "neu", ["n", "eu"], ["oi", "au"]),
  chunkBuild("e9-1", "schön", ["sch", "ö", "n"], ["o", "sh"]),
  chunkBuild("e9-2", "Straße", ["St", "r", "a", "ß", "e"], ["Scht", "s"]),
  chunkBuild("e9-3", "Mädchen", ["M", "ä", "d", "ch", "e", "n"], ["a", "sch"]),
  chunkBuild("e9-4", "Zebra", ["Z", "e", "b", "r", "a"], ["Ts", "s"]),
];

export const G1_4_TEST: GrammarTest = {
  id: "g1.4",
  title: "Buchstaben-Teams",
  meaning: l("Letter teams", "எழுத்துக் குழுக்கள்", "අකුරු කණ්ඩායම්"),
  icon: "🤝",
  merke: {
    line: l(
      "ei = eye, ie = ee. W says v, V says f, J says y.",
      "ei = eye, ie = ee. W என்பது v, V என்பது f, J என்பது y.",
      "ei = eye, ie = ee. W කියන්නේ v, V කියන්නේ f, J කියන්නේ y.",
    ),
    examples: [
      { text: "mein", sound: { word: "mein" } },
      { text: "wie", sound: { word: "wie" } },
      { text: "Vater", sound: { word: "Vater" } },
      { text: "ja", sound: { word: "ja" } },
    ],
  },
  warmup: [
    {
      id: "w-muetter",
      type: "choice",
      eyebrow: EYEBROW.listening,
      title: "Was hörst du?",
      subtitle: SUB.dotsOrNot,
      prompt: { sound: { word: "Mütter" }, autoplay: true },
      options: ["Mutter", "Mütter"],
      answer: "Mütter",
    },
    {
      id: "w-strasse",
      type: "choice",
      eyebrow: EYEBROW.missing,
      title: "Welcher Buchstabe fehlt?",
      subtitle: SUB.pickMissing,
      prompt: { sound: { word: "Straße" }, autoplay: true, show: "Stra▢e", showStyle: "pattern" },
      options: ["ß", "B"],
      answer: "ß",
      optionStyle: "letter",
    },
  ],
  steps,
};
