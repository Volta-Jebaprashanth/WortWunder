import type { L } from "@/lib/grammar-engine";

// Shared bits of the G1 grammar tests (docs/grammar-planning/G1/screens.md).
// Every learner-facing line is in English, Tamil and Sinhala; German screen
// titles, options and the characters' lines stay German.
export function l(english: string, tamil: string, sinhala: string): L {
  return { english, tamil, sinhala };
}

// Audio specific to the G1 tests lives here (see scripts/generate-audio.mjs).
export const G1_ASSET_DIR = "G1 getting started";

export const EYEBROW = {
  listening: l("Listening", "கேட்டல்", "සවන්දීම"),
  soundCheck: l("Sound check", "ஒலிச் சோதனை", "ශබ්ද පරීක්ෂාව"),
  spelling: l("Spelling", "எழுத்துக்கூட்டல்", "අකුරු කීම"),
  sorting: l("Sorting", "வகைப்படுத்தல்", "වර්ග කිරීම"),
  missing: l("Missing letter", "விடுபட்ட எழுத்து", "නැති අකුර"),
  matching: l("Matching game", "பொருத்தும் விளையாட்டு", "ගැළපීමේ ක්‍රීඩාව"),
  keyboard: l("Keyboard", "விசைப்பலகை", "යතුරුපුවරුව"),
  wordBuilder: l("Word builder", "சொல் அமைத்தல்", "වචන සෑදීම"),
  teamBuilder: l("Team builder", "குழு அமைத்தல்", "කණ්ඩායම් සෑදීම"),
  wordKinds: l("Word kinds", "சொல் வகைகள்", "වචන වර්ග"),
  findNomen: l("Find the Nomen", "Nomen-ஐக் கண்டுபிடி", "Nomen සොයන්න"),
  colours: l("Colours", "வண்ணங்கள்", "වර්ණ"),
  capitals: l("Capitals", "பெரிய எழுத்துகள்", "කැපිටල් අකුරු"),
  standIn: l("Stand-in", "மாற்றுச் சொல்", "ආදේශක වචනය"),
  sentenceBuilder: l("Sentence builder", "வாக்கியம் அமைத்தல்", "වාක්‍ය සෑදීම"),
  chat: l("Chat", "உரையாடல்", "කතාබහ"),
  chatOrder: l("Chat order", "உரையாடல் வரிசை", "කතාබහේ පිළිවෙල"),
  fullScene: l("Full scene", "முழுக் காட்சி", "සම්පූර්ණ දර්ශනය"),
  nameTag: l("Name tag", "பெயர் அட்டை", "නම් පත"),
  picture: l("Picture challenge", "படச் சவால்", "පින්තූර අභියෝගය"),
};

export const SUB = {
  listenTapLetter: l(
    "Listen, then tap the letter.",
    "கேள், பிறகு எழுத்தைத் தட்டு.",
    "අහලා, අකුර තට්ටු කරන්න.",
  ),
  listenChoose: l(
    "Listen, then choose the word you hear.",
    "கேள், பிறகு கேட்ட சொல்லைத் தேர்ந்தெடு.",
    "අහලා, ඇසුණු වචනය තෝරන්න.",
  ),
  listenBuild: l("Listen, then build it.", "கேள், பிறகு அதை அமை.", "අහලා, එය හදන්න."),
  dotsOrNot: l(
    "Listen. Dots or no dots?",
    "கேள். புள்ளிகள் உண்டா இல்லையா?",
    "අහන්න. තිත් තියෙනවද නැද්ද?",
  ),
  whichSound: l("Which sound is this?", "இது எந்த ஒலி?", "මේ කුමන ශබ්දයද?"),
  pickMissing: l(
    "Listen, then pick what is missing.",
    "கேள், பிறகு விடுபட்டதைத் தேர்ந்தெடு.",
    "අහලා, නැති කොටස තෝරන්න.",
  ),
  whatDoYouSay: l("What do you say back?", "நீ என்ன பதில் சொல்வாய்?", "ඔබ ආපසු මොනවද කියන්නේ?"),
  tapEachLetter: l(
    "Tap each letter to hear it.",
    "ஒவ்வொரு எழுத்தையும் தட்டிக் கேள்.",
    "එක් එක් අකුර තට්ටු කර අහන්න.",
  ),
};
