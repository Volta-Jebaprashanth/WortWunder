import type { GrammarStep, GrammarTest, L, Question } from "@/lib/grammar-engine";
import { EYEBROW, SUB, l } from "@/data/g1/common";

// G1.3 Ä Ö Ü ß: the "sound changer" dots, the sharp s, and writing them
// without a German keyboard. The words are sound words: heard, never quizzed
// for meaning. Part D of screens.md.

const ROUND_LIPS = l(
  "Listen to the lips: round lips mean dots.",
  "உதடுகளைக் கவனி: உருண்ட உதடுகள் என்றால் புள்ளிகள்.",
  "තොල් ගැන සවන් දෙන්න: රවුම් තොල් කියන්නේ තිත්.",
);

const dotsOrNot = (
  id: string,
  word: string,
  options: [string, string],
  tip: L = ROUND_LIPS,
): Question => ({
  id,
  type: "choice",
  eyebrow: EYEBROW.listening,
  title: "Was hörst du?",
  subtitle: SUB.dotsOrNot,
  prompt: { sound: { word }, autoplay: true },
  options,
  answer: word,
  optionSound: "word",
  tip,
});

const missing = (
  id: string,
  word: string,
  pattern: string,
  options: string[],
  answer: string,
  tip: L,
  tier: "training" | "medium" = "medium",
): GrammarStep => ({
  tier,
  q: {
    id,
    type: "choice",
    eyebrow: EYEBROW.missing,
    title: "Welcher Buchstabe fehlt?",
    subtitle: SUB.pickMissing,
    prompt: { sound: { word }, autoplay: true, show: pattern, showStyle: "pattern" },
    options,
    answer,
    optionStyle: "letter",
    tip,
  },
});

const build = (id: string, word: string, letters: string, decoys: string): GrammarStep => ({
  tier: "hard",
  q: {
    id,
    type: "build",
    eyebrow: EYEBROW.wordBuilder,
    title: "Baue das Wort",
    subtitle: SUB.listenBuild,
    prompt: { sound: { word }, autoplay: true },
    // ß stays one tile here (it is never split into SS in G1.3).
    answer: Array.from(letters),
    decoys: Array.from(decoys),
  },
});

const typeNoDots = (id: string, word: string, answer: string): GrammarStep => ({
  tier: "hard",
  q: {
    id,
    type: "type",
    eyebrow: EYEBROW.keyboard,
    title: "Ohne Punkte!",
    subtitle: l(
      "No dots on your keyboard. Type it.",
      "உன் விசைப்பலகையில் புள்ளிகள் இல்லை. தட்டச்சு செய்.",
      "ඔබේ යතුරුපුවරුවේ තිත් නැහැ. එය ටයිප් කරන්න.",
    ),
    show: word,
    answer,
    note: l(
      "A–Z only: ä → ae · ö → oe · ü → ue · ß → ss",
      "A–Z மட்டும்: ä → ae · ö → oe · ü → ue · ß → ss",
      "A–Z පමණයි: ä → ae · ö → oe · ü → ue · ß → ss",
    ),
    tip: l(
      "The dots fall down and become an e. ß becomes ss.",
      "புள்ளிகள் கீழே விழுந்து e ஆகின்றன. ß என்பது ss ஆகிறது.",
      "තිත් පහළට වැටිලා e වෙනවා. ß, ss වෙනවා.",
    ),
  },
});

const newLetterCard = (letter: string, art: string, from: string, body: L, hear: string[]) => ({
  kind: "info" as const,
  title: `Neuer Buchstabe: ${letter}`,
  subtitle: l(
    "The dots change the sound.",
    "புள்ளிகள் ஒலியை மாற்றுகின்றன.",
    "තිත් ශබ්දය වෙනස් කරනවා.",
  ),
  art,
  rows: [
    {
      big: `${from} → ${letter}`,
      text: body,
      hearLetters: [from.toUpperCase(), letter.toUpperCase() === "SS" ? "ß" : letter.toUpperCase()],
    },
    { text: l("Listen:", "கேள்:", "අහන්න:"), hear },
  ],
});

const steps: GrammarStep[] = [
  // ---- Training ----
  {
    tier: "training",
    intro: [
      newLetterCard(
        "ä",
        "😮",
        "a",
        l(
          'ä sounds like the "e" in English bed. ä is a cousin of e.',
          'ä ஆங்கில "bed"-இல் உள்ள "e" போல ஒலிக்கும். ä என்பது e-யின் உறவினர்.',
          'ä ඇසෙන්නේ ඉංග්‍රීසි "bed" හි "e" වගේ. ä යනු e ගේ ඥාතියෙක්.',
        ),
        ["Mädchen", "Väter", "Äpfel"],
      ),
    ],
    q: {
      ...dotsOrNot(
        "d2a",
        "Väter",
        ["Vater", "Väter"],
        l(
          'ä sounds like "e" in bed.',
          'ä என்பது bed-இல் உள்ள "e" போல.',
          'ä ඇසෙන්නේ bed හි "e" වගේ.',
        ),
      ),
      subtitle: l("Which one has the dots?", "எதில் புள்ளிகள் உள்ளன?", "තිත් තියෙන්නේ කුමකද?"),
    },
  },
  {
    tier: "training",
    intro: [
      newLetterCard(
        "ö",
        "🐟",
        "o",
        l(
          'Say "eh", but make your lips round like a fish.',
          '"eh" என்று சொல், ஆனால் உதடுகளை மீன் போல உருண்டையாக்கு.',
          '"eh" කියන්න, ඒත් තොල් මාළුවෙක් වගේ රවුම් කරන්න.',
        ),
        ["schön"],
      ),
    ],
    q: {
      ...dotsOrNot(
        "d2b",
        "schön",
        ["schon", "schön"],
        l("Round lips = ö.", "உருண்ட உதடுகள் = ö.", "රවුම් තොල් = ö."),
      ),
      subtitle: l("Which one has the dots?", "எதில் புள்ளிகள் உள்ளன?", "තිත් තියෙන්නේ කුමකද?"),
    },
  },
  {
    tier: "training",
    intro: [
      newLetterCard(
        "ü",
        "😗",
        "u",
        l(
          'Say "ee", then make your lips round like you\'re whistling.',
          '"ee" என்று சொல், பிறகு விசில் அடிப்பது போல உதடுகளை உருண்டையாக்கு.',
          '"ee" කියන්න, ඊට පස්සේ විසිල් ගහනවා වගේ තොල් රවුම් කරන්න.',
        ),
        ["Tür", "Mütter", "Brüder"],
      ),
    ],
    q: {
      ...dotsOrNot(
        "d2c",
        "Mütter",
        ["Mutter", "Mütter"],
        l("Whistle lips = ü.", "விசில் உதடுகள் = ü.", "විසිල් තොල් = ü."),
      ),
      subtitle: l("Which one has the dots?", "எதில் புள்ளிகள் உள்ளன?", "තිත් තියෙන්නේ කුමකද?"),
    },
  },
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Neuer Buchstabe: ß",
        subtitle: l("Two s's holding hands.", "கை கோர்த்த இரண்டு s.", "අත් අල්ලගත්ත s දෙකක්."),
        art: "🤝",
        rows: [
          {
            big: "ss → ß",
            text: l(
              "ß = sharp s (Eszett). It sounds like ss and is never at the start of a word. It's not a B!",
              "ß = கூர்மையான s (Eszett). ss போல ஒலிக்கும், சொல்லின் தொடக்கத்தில் வராது. அது B அல்ல!",
              "ß = තියුණු s (Eszett). ss වගේ ඇසෙනවා, වචනයක මුලට එන්නේ නැහැ. ඒක B නොවේ!",
            ),
            hearLetters: ["ß"],
          },
          { text: l("Listen:", "கேள்:", "අහන්න:"), hear: ["Straße", "groß", "Fuß"] },
        ],
      },
    ],
    q: {
      id: "d2d",
      type: "choice",
      eyebrow: EYEBROW.missing,
      title: "Was hörst du?",
      subtitle: SUB.pickMissing,
      prompt: { sound: { word: "Straße" }, autoplay: true, show: "Stra▢e", showStyle: "pattern" },
      options: ["ß", "B"],
      answer: "ß",
      optionStyle: "letter",
      tip: l(
        "ß looks like B but sounds like ss.",
        "ß B போலத் தோன்றும், ஆனால் ss போல ஒலிக்கும்.",
        "ß B වගේ පේනවා, ඒත් ss වගේ ඇසෙනවා.",
      ),
    },
  },
  {
    tier: "training",
    intro: [
      {
        kind: "info",
        title: "Keine Punkte?",
        subtitle: l(
          "No dots on your keyboard?",
          "உன் விசைப்பலகையில் புள்ளிகள் இல்லையா?",
          "ඔබේ යතුරුපුවරුවේ තිත් නැද්ද?",
        ),
        art: "⌨️",
        rows: [
          {
            big: "ä → ae · ö → oe · ü → ue · ß → ss",
            text: l(
              "The dots fall down and become an e.",
              "புள்ளிகள் கீழே விழுந்து e ஆகின்றன.",
              "තිත් පහළට වැටිලා e වෙනවා.",
            ),
          },
          {
            big: "schön = schoen",
            text: l("Straße = Strasse", "Straße = Strasse", "Straße = Strasse"),
            hear: ["schön", "Straße"],
          },
        ],
      },
      { kind: "merke" },
    ],
    q: {
      id: "d2e",
      type: "choice",
      eyebrow: EYEBROW.keyboard,
      title: "Ohne Punkte!",
      subtitle: l(
        "Write schön with no dots.",
        "schön-ஐப் புள்ளிகள் இல்லாமல் எழுது.",
        "schön තිත් නැතුව ලියන්න.",
      ),
      prompt: { show: "schön", showStyle: "word" },
      options: ["schoen", "schon"],
      answer: "schoen",
      tip: l(
        "The dots become an e: ö → oe.",
        "புள்ளிகள் e ஆகின்றன: ö → oe.",
        "තිත් e වෙනවා: ö → oe.",
      ),
    },
  },

  // ---- Simple ----
  { tier: "easy", q: dotsOrNot("d3-1", "Vater", ["Vater", "Väter"]) },
  { tier: "easy", q: dotsOrNot("d3-2", "Äpfel", ["Apfel", "Äpfel"]) },
  { tier: "easy", q: dotsOrNot("d3-3", "Mutter", ["Mutter", "Mütter"]) },
  { tier: "easy", q: dotsOrNot("d3-4", "Brüder", ["Bruder", "Brüder"]) },
  { tier: "easy", q: dotsOrNot("d3-5", "schon", ["schon", "schön"]) },
  { tier: "easy", q: dotsOrNot("d3-6", "Bruder", ["Bruder", "Brüder"]) },
  { tier: "easy", q: dotsOrNot("d3-7", "Väter", ["Vater", "Väter"]) },
  { tier: "easy", q: dotsOrNot("d3-8", "schön", ["schon", "schön"]) },
  ...(["Ä", "Ö", "Ü", "ß"] as const).map((letter, i): GrammarStep => ({
    tier: "easy",
    q: {
      id: `d4-${i + 1}`,
      type: "choice",
      eyebrow: EYEBROW.listening,
      title: "Was hörst du?",
      subtitle: SUB.listenTapLetter,
      prompt: { sound: { letter }, autoplay: true },
      options: ["Ä", "Ö", "Ü", "ß"],
      answer: letter,
      optionStyle: "letter",
      optionSound: "letter",
      tip: l(
        "ä is like e · ö is fish lips · ü is whistle lips · ß is ss.",
        "ä e போல · ö மீன் உதடுகள் · ü விசில் உதடுகள் · ß என்பது ss.",
        "ä e වගේ · ö මාළු තොල් · ü විසිල් තොල් · ß යනු ss.",
      ),
    },
  })),

  // ---- Medium ----
  missing(
    "d5-1",
    "Mädchen",
    "M▢dchen",
    ["a", "ä", "e"],
    "ä",
    l('"e" as in bed → ä.', 'bed-இல் உள்ள "e" → ä.', 'bed හි "e" → ä.'),
  ),
  missing(
    "d5-2",
    "schön",
    "sch▢n",
    ["o", "ö", "u"],
    "ö",
    l("Round fish lips → ö.", "உருண்ட மீன் உதடுகள் → ö.", "රවුම් මාළු තොල් → ö."),
  ),
  missing(
    "d5-3",
    "Tür",
    "T▢r",
    ["u", "ü", "i"],
    "ü",
    l("Whistle lips → ü.", "விசில் உதடுகள் → ü.", "විසිල් තොල් → ü."),
  ),
  missing(
    "d5-4",
    "Straße",
    "Stra▢e",
    ["ß", "s", "z"],
    "ß",
    l(
      "Sharp ss after a long sound → ß.",
      "நீண்ட ஒலிக்குப் பின் கூர்மையான ss → ß.",
      "දිගු ශබ්දයකට පස්සේ තියුණු ss → ß.",
    ),
  ),
  missing(
    "d5-5",
    "groß",
    "gro▢",
    ["ß", "s", "B"],
    "ß",
    l("ß is not a B!", "ß என்பது B அல்ல!", "ß, B නොවේ!"),
  ),
  missing(
    "d5-6",
    "Äpfel",
    "▢pfel",
    ["A", "Ä", "E"],
    "Ä",
    l("You heard the dots.", "நீ புள்ளிகளைக் கேட்டாய்.", "ඔබට තිත් ඇසුණා."),
  ),
  ...(
    [
      [
        ["Straße", "Strasse"],
        ["schön", "schoen"],
        ["Tür", "Tuer"],
      ],
      [
        ["Mädchen", "Maedchen"],
        ["groß", "gross"],
        ["Brüder", "Brueder"],
      ],
    ] as [string, string][][]
  ).map((pairs, i): GrammarStep => ({
    tier: "medium",
    q: {
      id: `d6-${i + 1}`,
      type: "match",
      eyebrow: EYEBROW.matching,
      title: "Finde die Paare",
      subtitle: l(
        "Match each word to its no-dots spelling.",
        "ஒவ்வொரு சொல்லையும் அதன் புள்ளியில்லா எழுத்துடன் பொருத்து.",
        "එක් එක් වචනය තිත් නැති ලියන ක්‍රමයට ගළපන්න.",
      ),
      pairs,
    },
  })),

  // ---- Hard ----
  build("d7-1", "Tür", "TÜR", "U"),
  build("d7-2", "schön", "SCHÖN", "O"),
  build("d7-3", "Mädchen", "MÄDCHEN", "A"),
  build("d7-4", "Straße", "STRAßE", "BS"),
  build("d7-5", "Fuß", "FUß", "SÜ"),
  build("d7-6", "Brüder", "BRÜDER", "U"),
  typeNoDots("d8-1", "Straße", "strasse"),
  typeNoDots("d8-2", "schön", "schoen"),
  typeNoDots("d8-3", "Tür", "tuer"),
];

export const G1_3_TEST: GrammarTest = {
  id: "g1.3",
  title: "Ä Ö Ü ß",
  meaning: l("New letters", "புதிய எழுத்துகள்", "අලුත් අකුරු"),
  icon: "😮",
  merke: {
    line: l(
      "Dots change the sound. Lips round for ö and ü. ß = ss.",
      "புள்ளிகள் ஒலியை மாற்றுகின்றன. ö, ü-க்கு உதடுகள் உருண்டை. ß = ss.",
      "තිත් ශබ්දය වෙනස් කරනවා. ö සහ ü සඳහා තොල් රවුම්. ß = ss.",
    ),
    examples: [
      { text: "schon", sound: { word: "schon" } },
      { text: "schön", sound: { word: "schön" } },
      { text: "Straße", sound: { word: "Straße" } },
    ],
  },
  warmup: [
    {
      id: "w-e",
      type: "choice",
      eyebrow: EYEBROW.listening,
      title: "Was hörst du?",
      subtitle: SUB.listenTapLetter,
      prompt: { sound: { letter: "E" }, autoplay: true },
      options: ["E", "I"],
      answer: "E",
      optionStyle: "letter",
    },
    {
      id: "w-ja",
      type: "choice",
      eyebrow: EYEBROW.spelling,
      title: "Wie heißt das?",
      subtitle: l(
        "Listen to the spelling. Which is it?",
        "எழுத்துக்கூட்டலைக் கேள். இது எது?",
        "අකුරු කියන එක අහන්න. මේ කුමක්ද?",
      ),
      prompt: { sound: { spell: "JA" }, autoplay: true },
      options: ["JA", "GA"],
      answer: "JA",
    },
  ],
  steps,
};
