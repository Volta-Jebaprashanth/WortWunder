import type { ChatLine, GrammarStep, GrammarTest, L, Question } from "@/lib/grammar-engine";
import { EYEBROW, SUB, l } from "@/data/g1/common";

// G1.6 Hallo & Tschüss (Sprechen): a first conversation in chat bubbles with
// the cat (and the mouse). The characters only speak G1 words; English lines
// describe the situation. Part G of screens.md.

const cat = (text: string, meaning?: L): ChatLine => ({
  speaker: "cat",
  text,
  sound: { word: text.replace(/!$/, "") },
  ...(meaning ? { meaning } : {}),
});
const you = (text: string, meaning?: L): ChatLine => ({
  speaker: "you",
  text,
  sound: { word: text.replace(/!$/, "") },
  ...(meaning ? { meaning } : {}),
});

const M = {
  hello: l("hello", "வணக்கம்", "ආයුබෝවන්"),
  bye: l("bye", "போய் வருகிறேன்", "ගිහින් එන්නම්"),
  hereYouGo: l("here you go", "இதோ", "මෙන්න"),
  thanks: l("thank you", "நன்றி", "ස්තූතියි"),
  welcome: l("you're welcome", "பரவாயில்லை", "කමක් නැහැ"),
};

const reply = (
  id: string,
  art: string,
  line: string | null,
  options: string[],
  answer: string,
  tip: L,
  context?: L,
): Question => ({
  id,
  type: "choice",
  eyebrow: EYEBROW.chat,
  title: "Was sagst du?",
  subtitle: SUB.whatDoYouSay,
  prompt: {
    art,
    ...(context ? { context } : {}),
    chat: line ? [cat(line)] : [{ speaker: "cat", text: "🍪 ?" }],
    replySlot: true,
    ...(line ? { sound: { word: line.replace(/!$/, "") }, autoplay: true } : {}),
  },
  options,
  answer,
  optionSound: "word",
  tip,
});

const TIPS = {
  hallo: l(
    "Hallo back when someone arrives.",
    "யாராவது வந்தால் பதிலுக்கு Hallo.",
    "කවුරුහරි ආවම ආපසු Hallo.",
  ),
  danke: l(
    "Someone gives you something → Danke!",
    "யாராவது ஏதாவது கொடுத்தால் → Danke!",
    "කවුරුහරි මොනවහරි දුන්නම → Danke!",
  ),
  bitte: l(
    "Someone says Danke → Bitte! (you're welcome)",
    "யாராவது Danke என்றால் → Bitte! (பரவாயில்லை)",
    "කවුරුහරි Danke කිව්වම → Bitte! (කමක් නැහැ)",
  ),
  tschuess: l(
    "Someone leaves → Tschüss!",
    "யாராவது புறப்பட்டால் → Tschüss!",
    "කවුරුහරි යනකොට → Tschüss!",
  ),
  ja: l("You want it → ja!", "உனக்கு வேண்டும் → ja!", "ඔබට ඕනෙ → ja!"),
  nein: l("You don't want it → nein!", "உனக்கு வேண்டாம் → nein!", "ඔබට එපා → nein!"),
};

const listenOnly = (
  id: string,
  word: string,
  options: string[],
  answer: string,
  tip: L,
): GrammarStep => ({
  tier: "medium",
  q: {
    id,
    type: "choice",
    eyebrow: EYEBROW.chat,
    title: "Was sagst du?",
    subtitle: l(
      "Listen only. What do you say back?",
      "கேட்டு மட்டும். நீ என்ன பதில் சொல்வாய்?",
      "අහන්න විතරයි. ඔබ ආපසු මොනවද කියන්නේ?",
    ),
    prompt: {
      chat: [{ speaker: "cat", text: "", sound: { word } }],
      replySlot: true,
      sound: { word },
      autoplay: true,
    },
    options,
    answer,
    optionSound: "word",
    tip,
  },
});

const buildReply = (
  id: string,
  art: string,
  line: string,
  answer: string,
  decoys: string,
  tip: L,
): GrammarStep => ({
  tier: "hard",
  q: {
    id,
    type: "build",
    eyebrow: EYEBROW.chat,
    title: "Was sagst du?",
    subtitle: l(
      "Build your reply from the letters.",
      "எழுத்துகளிலிருந்து உன் பதிலை அமை.",
      "අකුරු වලින් ඔබේ පිළිතුර හදන්න.",
    ),
    prompt: { art, chat: [cat(line)], sound: { word: line.replace(/!$/, "") }, autoplay: true },
    answer: Array.from(answer),
    decoys: Array.from(decoys),
    tip,
  },
});

const BANK = ["Hallo", "Danke", "Bitte", "Tschüss", "ja", "nein"];

const steps: GrammarStep[] = [
  // ---- Training ----
  {
    tier: "training",
    intro: [
      {
        kind: "scene",
        title: "Szene 1: Hallo!",
        subtitle: l("Arriving at school.", "பள்ளிக்கு வருதல்.", "පාසලට පැමිණීම."),
        art: "🐱👋🏫",
        lines: [cat("Hallo!", M.hello), you("Hallo!", M.hello)],
      },
      { kind: "say", text: "Hallo!", sound: { word: "Hallo" } },
    ],
    q: reply("g3a", "🐱👋🏫", "Hallo!", ["Hallo!", "Tschüss!"], "Hallo!", TIPS.hallo),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "scene",
        title: "Szene 2: Ein Geschenk",
        subtitle: l(
          "Someone gives you something.",
          "யாரோ உனக்கு ஏதோ கொடுக்கிறார்கள்.",
          "කවුරුහරි ඔබට මොනවහරි දෙනවා.",
        ),
        art: "🐱🎁",
        lines: [cat("Bitte!", M.hereYouGo), you("Danke!", M.thanks), cat("Bitte!", M.welcome)],
      },
      { kind: "merke" },
      { kind: "say", text: "Danke!", sound: { word: "Danke" } },
    ],
    q: reply("g3b", "🐱🎁", "Bitte!", ["Danke!", "Hallo!"], "Danke!", TIPS.danke),
  },
  {
    tier: "training",
    intro: [
      {
        kind: "scene",
        title: "Szene 3: Tschüss!",
        subtitle: l("Leaving.", "புறப்படுதல்.", "පිටත්ව යාම."),
        art: "🐱👋🚪",
        lines: [cat("Tschüss!", M.bye), you("Tschüss!", M.bye)],
      },
      { kind: "say", text: "Tschüss!", sound: { word: "Tschüss" } },
    ],
    q: reply("g3c", "🐱👋🚪", "Tschüss!", ["Tschüss!", "Danke!"], "Tschüss!", TIPS.tschuess),
  },

  // ---- Simple ----
  {
    tier: "easy",
    q: reply(
      "g4-1",
      "🐱👋",
      "Hallo!",
      ["Hallo!", "Danke!", "Tschüss!"],
      "Hallo!",
      TIPS.hallo,
      l("The cat arrives.", "பூனை வருகிறது.", "පූසා එනවා."),
    ),
  },
  {
    tier: "easy",
    q: reply(
      "g4-2",
      "🐱🎁",
      "Bitte!",
      ["Danke!", "Bitte!", "Hallo!"],
      "Danke!",
      TIPS.danke,
      l(
        "The cat gives you a gift.",
        "பூனை உனக்கு ஒரு பரிசு கொடுக்கிறது.",
        "පූසා ඔබට තෑග්ගක් දෙනවා.",
      ),
    ),
  },
  {
    tier: "easy",
    q: reply(
      "g4-3",
      "🎁➡️🐱",
      "Danke!",
      ["Bitte!", "Danke!", "ja"],
      "Bitte!",
      TIPS.bitte,
      l(
        "You gave the cat a gift.",
        "நீ பூனைக்கு ஒரு பரிசு கொடுத்தாய்.",
        "ඔබ පූසාට තෑග්ගක් දුන්නා.",
      ),
    ),
  },
  {
    tier: "easy",
    q: reply(
      "g4-4",
      "🐱🚪",
      "Tschüss!",
      ["Tschüss!", "Hallo!", "Bitte!"],
      "Tschüss!",
      TIPS.tschuess,
      l("The cat goes home.", "பூனை வீட்டுக்குப் போகிறது.", "පූසා ගෙදර යනවා."),
    ),
  },
  {
    tier: "easy",
    q: reply(
      "g4-5",
      "🐱🍪😋",
      null,
      ["ja", "nein", "Tschüss!"],
      "ja",
      TIPS.ja,
      l("You want the cookie.", "உனக்கு பிஸ்கட் வேண்டும்.", "ඔබට බිස්කට් එක ඕනෙ."),
    ),
  },
  {
    tier: "easy",
    q: reply(
      "g4-6",
      "🐱🍪🙅",
      null,
      ["nein", "ja", "Hallo!"],
      "nein",
      TIPS.nein,
      l("You are full.", "உன் வயிறு நிறைந்துவிட்டது.", "ඔබේ බඩ පිරිලා."),
    ),
  },

  // ---- Medium ----
  listenOnly("g5-1", "Hallo", ["Hallo!", "Bitte!", "nein"], "Hallo!", TIPS.hallo),
  listenOnly("g5-2", "Bitte", ["Danke!", "Tschüss!", "ja"], "Danke!", TIPS.danke),
  listenOnly("g5-3", "Tschüss", ["Tschüss!", "Hallo!", "Danke!"], "Tschüss!", TIPS.tschuess),
  listenOnly("g5-4", "Danke", ["Bitte!", "Danke!", "Hallo!"], "Bitte!", TIPS.bitte),
  ...[
    [cat("Hallo!"), you("Hallo!"), you("Bitte!"), cat("Danke!")],
    [cat("Bitte!"), you("Danke!"), cat("Tschüss!"), you("Tschüss!")],
  ].map((bubbles, i): GrammarStep => ({
    tier: "medium",
    q: {
      id: `g6-${i + 1}`,
      type: "order",
      eyebrow: EYEBROW.chatOrder,
      title: "Was kommt zuerst?",
      subtitle: l(
        "Put the bubbles in the right order.",
        "குமிழ்களைச் சரியான வரிசையில் வை.",
        "බුබුළු නිවැරදි පිළිවෙලට තියන්න.",
      ),
      bubbles,
      tip: l(
        "First Hallo, then the gift and Danke, Tschüss at the end.",
        "முதலில் Hallo, பிறகு பரிசும் Danke-யும், கடைசியில் Tschüss.",
        "මුලින්ම Hallo, ඊට පස්සේ තෑග්ග සහ Danke, අන්තිමට Tschüss.",
      ),
    },
  })),

  // ---- Hard ----
  buildReply("g7-1", "🐱👋", "Hallo!", "HALLO", "E", TIPS.hallo),
  buildReply("g7-2", "🐱🎁", "Bitte!", "DANKE", "T", TIPS.danke),
  buildReply("g7-3", "🎁➡️🐱", "Danke!", "BITTE", "D", TIPS.bitte),
  // Tschüss is spelled with ss (Tschüß is the old spelling): no ß tile.
  buildReply("g7-4", "🐱🚪", "Tschüss!", "TSCHÜSS", "U", TIPS.tschuess),
  {
    tier: "hard",
    q: {
      id: "g8-1",
      type: "scene",
      eyebrow: EYEBROW.fullScene,
      title: "Der erste Tag",
      subtitle: l(
        "Your first day. Answer the cat.",
        "உன் முதல் நாள். பூனைக்குப் பதில் சொல்.",
        "ඔබේ පළමු දවස. පූසාට උත්තර දෙන්න.",
      ),
      bank: BANK,
      turns: [
        { speaker: "cat", line: "Hallo!", sound: { word: "Hallo" }, art: "🐱👋", answer: "Hallo" },
        {
          speaker: "cat",
          line: "Bitte!",
          sound: { word: "Bitte" },
          art: "🐱✏️",
          context: l(
            "The cat gives you a pencil.",
            "பூனை உனக்கு ஒரு பென்சில் கொடுக்கிறது.",
            "පූසා ඔබට පැන්සලක් දෙනවා.",
          ),
          answer: "Danke",
        },
        {
          speaker: "cat",
          line: "🍪 ?",
          art: "🐱🍪",
          context: l("You want it.", "உனக்கு அது வேண்டும்.", "ඔබට ඒක ඕනෙ."),
          answer: "ja",
        },
        {
          speaker: "cat",
          line: "Bitte!",
          sound: { word: "Bitte" },
          art: "🐱🍪➡️",
          context: l(
            "The cat hands you the cookie.",
            "பூனை பிஸ்கட்டை உன்னிடம் கொடுக்கிறது.",
            "පූසා බිස්කට් එක ඔබට දෙනවා.",
          ),
          answer: "Danke",
        },
        {
          speaker: "cat",
          line: "Tschüss!",
          sound: { word: "Tschüss" },
          art: "🐱🚪",
          answer: "Tschüss",
        },
      ],
      tip: TIPS.danke,
    },
  },
  {
    tier: "hard",
    q: {
      id: "g8-2",
      type: "scene",
      eyebrow: EYEBROW.fullScene,
      title: "Besuch",
      subtitle: l(
        "A visitor. The mouse visits you — you speak first.",
        "ஒரு விருந்தினர். எலி உன்னைப் பார்க்க வருகிறது — நீ முதலில் பேசு.",
        "අමුත්තෙක්. මීයා ඔබව බලන්න එනවා — ඔබ මුලින් කතා කරන්න.",
      ),
      bank: BANK,
      turns: [
        {
          art: "🐭🚪",
          context: l("The mouse arrives.", "எலி வருகிறது.", "මීයා එනවා."),
          answer: "Hallo",
        },
        {
          art: "🍰➡️🐭",
          context: l("Give her the cake.", "அவளுக்கு கேக்கைக் கொடு.", "ඇයට කේක් එක දෙන්න."),
          answer: "Bitte",
        },
        {
          speaker: "mouse",
          line: "Danke!",
          sound: { word: "Danke" },
          art: "🐭🍰",
          answer: "Bitte",
        },
        {
          art: "🐭👋",
          context: l("The mouse goes home.", "எலி வீட்டுக்குப் போகிறது.", "මීයා ගෙදර යනවා."),
          answer: "Tschüss",
        },
      ],
      tip: TIPS.bitte,
    },
  },
  ...(
    [
      ["g9-1", "cat", "LENA", "IM"],
      ["g9-2", "mouse", "MIA", "EN"],
    ] as const
  ).map(([id, speaker, name, decoys]): GrammarStep => ({
    tier: "hard",
    q: {
      id,
      type: "build",
      eyebrow: EYEBROW.nameTag,
      title: "Hallo!",
      subtitle:
        speaker === "cat"
          ? l(
              "The cat spells her name. Build it.",
              "பூனை தன் பெயரை எழுத்துக்கூட்டுகிறது. அதை அமை.",
              "පූසා තමන්ගේ නම අකුරු කියනවා. එය හදන්න.",
            )
          : l(
              "The mouse spells her name. Build it.",
              "எலி தன் பெயரை எழுத்துக்கூட்டுகிறது. அதை அமை.",
              "මීයා තමන්ගේ නම අකුරු කියනවා. එය හදන්න.",
            ),
      prompt: {
        chat: [
          {
            speaker,
            text: `Hallo! ${Array.from(name).join("-")}`,
            sound: { seq: [{ word: "Hallo" }, { spell: name }] },
          },
        ],
        sound: { seq: [{ word: "Hallo" }, { spell: name }] },
        autoplay: true,
        art: "🏷️",
      },
      answer: Array.from(name),
      decoys: Array.from(decoys),
      tip: l(
        "Listen for each letter name.",
        "ஒவ்வொரு எழுத்தின் பெயரையும் கவனி.",
        "එක් එක් අකුරේ නම අහන්න.",
      ),
    },
  })),
];

export const G1_6_TEST: GrammarTest = {
  id: "g1.6",
  title: "Hallo & Tschüss",
  meaning: l("Speaking", "பேசுதல்", "කතා කිරීම"),
  icon: "💬",
  merke: {
    line: l(
      "Bitte has 3 jobs: please, here you go, you're welcome.",
      "Bitte-க்கு 3 வேலைகள்: தயவுசெய்து, இதோ, பரவாயில்லை.",
      "Bitte ට රාජකාරි 3ක්: කරුණාකර, මෙන්න, කමක් නැහැ.",
    ),
    examples: [
      { text: "Bitte!", sound: { word: "Bitte" } },
      { text: "Danke!", sound: { word: "Danke" } },
    ],
  },
  warmup: [
    {
      id: "w-frau",
      type: "choice",
      eyebrow: EYEBROW.wordKinds,
      title: "Welche Wortart?",
      subtitle: l("What kind of word is this?", "இது எந்த வகைச் சொல்?", "මේ කුමන වර්ගයේ වචනයක්ද?"),
      prompt: { show: "Frau", showStyle: "word" },
      options: ["📦 Nomen", "⚡ Verb", "🔁 Pronomen"],
      answer: "📦 Nomen",
    },
    {
      id: "w-capital",
      type: "choice",
      eyebrow: EYEBROW.capitals,
      title: "Groß oder klein?",
      subtitle: l(
        "Which word needs a capital letter?",
        "எந்தச் சொல்லுக்குப் பெரிய எழுத்து தேவை?",
        "කැපිටල් අකුරක් ඕනෙ කුමන වචනයටද?",
      ),
      prompt: {},
      options: ["frau", "du", "lernen"],
      answer: "frau",
    },
  ],
  steps,
};
