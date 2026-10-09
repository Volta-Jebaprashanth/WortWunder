import type { CourseUnit } from "@/data/course/types";

// Unit 1, "Hallo!": greet, give a name, spell it. Only lesson 1 is written so
// far (milestone C1a); the other five lessons, the remaining guidebook notes
// and the checkpoint come with C1b.
//
// Tamil and Sinhala here are drafts and still need a native reader's review
// (ROADMAP.md section 13). Translations of the greetings match the ones in
// src/data/greetings.ts so the course and the vocabulary lesson agree.
export const UNIT_01: CourseUnit = {
  id: "u01",
  title: "Hallo!",
  icon: "👋",
  meaning: { english: "Hello!", tamil: "வணக்கம்!", sinhala: "ආයුබෝවන්!" },
  canDo: {
    english: ["Greet someone and say goodbye", "Say your name", "Spell your name"],
    tamil: [
      "ஒருவரை வரவேற்று விடைபெறலாம்",
      "உங்கள் பெயரைச் சொல்லலாம்",
      "உங்கள் பெயரை எழுத்துக்கூட்டிச் சொல்லலாம்",
    ],
    sinhala: [
      "කෙනෙකුට ආචාර කර සමුගන්න පුළුවන්",
      "ඔබේ නම කියන්න පුළුවන්",
      "ඔබේ නම අකුරෙන් අකුර කියන්න පුළුවන්",
    ],
  },
  notes: [
    {
      id: "u01.g01",
      tag: "formal-informal",
      title: {
        english: "Friends or strangers?",
        tamil: "நண்பர்களா, அறிமுகமில்லாதவர்களா?",
        sinhala: "යාළුවන්ද, නාඳුනන අයද?",
      },
      body: {
        english:
          "With friends, family and children say Hallo and Tschüss.\n" +
          "With adults you don't know, or to be polite, say Guten Tag and Auf Wiedersehen.\n" +
          "Herr means Mr and Frau means Mrs. They go before the family name.",
        tamil:
          "நண்பர்கள், குடும்பத்தினர், குழந்தைகளிடம் Hallo, Tschüss என்று சொல்லுங்கள்.\n" +
          "அறிமுகமில்லாத பெரியவர்களிடம் அல்லது மரியாதையாகப் பேசும்போது Guten Tag, Auf Wiedersehen என்று சொல்லுங்கள்.\n" +
          "Herr என்றால் திரு, Frau என்றால் திருமதி. இவை குடும்பப் பெயருக்கு முன் வரும்.",
        sinhala:
          "යාළුවන්ට, පවුලේ අයට සහ ළමයින්ට Hallo සහ Tschüss කියන්න.\n" +
          "නාඳුනන වැඩිහිටියන්ට හෝ ගෞරවයෙන් කතා කරන විට Guten Tag සහ Auf Wiedersehen කියන්න.\n" +
          "Herr යනු මහතා, Frau යනු මහත්මිය. ඒවා වාසගමට පෙර යෙදේ.",
      },
      examples: ["u01.l01.s01", "u01.l01.s04", "u01.l01.s05"],
    },
  ],
  guidebook: ["u01.g01"],
  dialogues: [],
  lessons: [
    {
      id: "u01.l01",
      title: "Hallo und Tschüss",
      meaning: {
        english: "Hello and goodbye",
        tamil: "வணக்கமும் விடைபெறுதலும்",
        sinhala: "ආයුබෝවන් සහ සමුගැනීම",
      },
      newWords: ["1.1/hallo", "1.1/tschuess", "1.1/guten-tag", "1.1/auf-wiedersehen"],
      sentences: [
        {
          id: "u01.l01.s01",
          german: "Hallo, Anna!",
          english: "Hello, Anna!",
          tamil: "வணக்கம், அன்னா!",
          sinhala: "ආයුබෝවන්, ඇනා!",
          voice: "f",
          words: ["1.1/hallo"],
        },
        {
          id: "u01.l01.s02",
          german: "Tschüss, Tom!",
          english: "Bye, Tom!",
          tamil: "பை பை, டாம்!",
          sinhala: "බායි, ටොම්!",
          voice: "m",
          words: ["1.1/tschuess"],
        },
        {
          id: "u01.l01.s03",
          german: "Hallo, Anna und Tom!",
          english: "Hello, Anna and Tom!",
          tamil: "வணக்கம், அன்னா மற்றும் டாம்!",
          sinhala: "ආයුබෝවන්, ඇනා සහ ටොම්!",
          voice: "f",
          words: ["1.1/hallo"],
        },
        {
          id: "u01.l01.s04",
          german: "Guten Tag, Herr Weber.",
          english: "Good day, Mr Weber.",
          tamil: "நல்ல பகல் வணக்கம், திரு வேபர்.",
          sinhala: "සුභ දවසක්, වෙබර් මහතා.",
          voice: "m",
          grammar: ["formal-informal"],
          words: ["1.1/guten-tag"],
        },
        {
          id: "u01.l01.s05",
          german: "Auf Wiedersehen, Frau Klein.",
          english: "Goodbye, Mrs Klein.",
          tamil: "மீண்டும் சந்திப்போம், திருமதி க்ளைன்.",
          sinhala: "නැවත හමුවෙමු, ක්ලයින් මහත්මිය.",
          voice: "f",
          grammar: ["formal-informal"],
          words: ["1.1/auf-wiedersehen"],
        },
        {
          id: "u01.l01.s06",
          german: "Guten Tag, Frau Klein.",
          english: "Good day, Mrs Klein.",
          tamil: "நல்ல பகல் வணக்கம், திருமதி க்ளைன்.",
          sinhala: "සුභ දවසක්, ක්ලයින් මහත්මිය.",
          voice: "m",
          grammar: ["formal-informal"],
          words: ["1.1/guten-tag"],
        },
      ],
      steps: [
        { kind: "word", ref: "1.1/hallo" },
        { kind: "word", ref: "1.1/tschuess" },
        { kind: "sentence", id: "u01.l01.s01" },
        { kind: "sentence", id: "u01.l01.s02" },
        { kind: "sentence", id: "u01.l01.s03" },
        { kind: "tip", noteId: "u01.g01" },
        { kind: "word", ref: "1.1/guten-tag" },
        { kind: "word", ref: "1.1/auf-wiedersehen" },
        { kind: "sentence", id: "u01.l01.s04" },
        { kind: "sentence", id: "u01.l01.s05" },
        { kind: "sentence", id: "u01.l01.s06" },
      ],
    },
  ],
  checkpoint: [],
};
