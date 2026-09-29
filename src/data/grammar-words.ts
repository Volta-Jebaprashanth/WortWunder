import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Pronomen & Co." (basic grammar words) lesson, 1.30:
// personal pronouns, possessives and a few "someone / nothing / everything"
// words. "sie" (she), "sie" (they) and "Sie" (formal you), and "ihr"/"Ihr",
// share a spelling, so the quiz never offers two of them as options for the
// same question (see pickDistractorIds in src/lib/quiz-engine.ts). "das"
// reuses the shared article clip. The 24 words split into two tests of 12.
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.30 grammar words/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const GRAMMAR_LESSON_ID = "1.30";

export const GRAMMAR_WORDS: VocabWord[] = [
  {
    id: "ich",
    image: "/1.30 grammar words/images/i.jpg",
    full: "ich",
    english: "I",
    tamil: "நான்",
    sinhala: "මම",
  },
  {
    id: "du",
    image: "/1.30 grammar words/images/you.jpg",
    full: "du",
    english: "You",
    tamil: "நீ",
    sinhala: "ඔයා",
  },
  {
    id: "sie-formal",
    image: "/1.30 grammar words/images/you-formal.jpg",
    full: "Sie",
    english: "You (formal)",
    tamil: "நீங்கள்",
    sinhala: "ඔබ",
  },
  {
    id: "er",
    image: "/1.30 grammar words/images/he.jpg",
    full: "er",
    english: "He",
    tamil: "அவன்",
    sinhala: "ඔහු",
  },
  {
    id: "sie-she",
    image: "/1.30 grammar words/images/she.jpg",
    full: "sie",
    english: "She",
    tamil: "அவள்",
    sinhala: "ඇය",
  },
  {
    id: "es",
    image: "/1.30 grammar words/images/it.jpg",
    full: "es",
    english: "It",
    tamil: "அது",
    sinhala: "එය",
  },
  {
    id: "wir",
    image: "/1.30 grammar words/images/we.jpg",
    full: "wir",
    english: "We",
    tamil: "நாங்கள்",
    sinhala: "අපි",
  },
  {
    id: "ihr",
    image: "/1.30 grammar words/images/you-plural.jpg",
    full: "ihr",
    english: "You (plural)",
    tamil: "நீங்கள் எல்லோரும்",
    sinhala: "ඔයාලා",
  },
  {
    id: "sie-they",
    image: "/1.30 grammar words/images/they.jpg",
    full: "sie",
    english: "They",
    tamil: "அவர்கள்",
    sinhala: "ඔවුන්",
  },
  {
    id: "mein",
    image: "/1.30 grammar words/images/my.jpg",
    full: "mein",
    english: "My",
    tamil: "என்",
    sinhala: "මගේ",
  },
  {
    id: "dein",
    image: "/1.30 grammar words/images/your.jpg",
    full: "dein",
    english: "Your",
    tamil: "உன்",
    sinhala: "ඔයාගේ",
  },
  {
    id: "ihr-formal",
    image: "/1.30 grammar words/images/your-formal.jpg",
    full: "Ihr",
    english: "Your (formal)",
    tamil: "உங்கள்",
    sinhala: "ඔබගේ",
  },
  {
    id: "unser",
    image: "/1.30 grammar words/images/our.jpg",
    full: "unser",
    english: "Our",
    tamil: "எங்கள்",
    sinhala: "අපේ",
  },
  {
    id: "euer",
    image: "/1.30 grammar words/images/your-plural.jpg",
    full: "euer",
    english: "Your (plural)",
    tamil: "உங்கள் எல்லோருடைய",
    sinhala: "ඔයාලගේ",
  },
  {
    id: "dieser",
    image: "/1.30 grammar words/images/this.jpg",
    full: "dieser",
    english: "This (masculine)",
    tamil: "இந்த",
    sinhala: "මේ",
  },
  {
    id: "diese",
    image: "/1.30 grammar words/images/these.jpg",
    full: "diese",
    english: "This / these",
    tamil: "இவை / இந்த",
    sinhala: "මේ / මේවා",
  },
  {
    id: "das-that",
    image: "/1.30 grammar words/images/that.jpg",
    full: "das",
    english: "That / this",
    tamil: "அது / இது",
    sinhala: "ඒක / මේක",
  },
  {
    id: "etwas",
    image: "/1.30 grammar words/images/something.jpg",
    full: "etwas",
    english: "Something",
    tamil: "ஏதோ",
    sinhala: "යමක්",
  },
  {
    id: "nichts",
    image: "/1.30 grammar words/images/nothing.jpg",
    full: "nichts",
    english: "Nothing",
    tamil: "ஒன்றுமில்லை",
    sinhala: "කිසිවක් නැත",
  },
  {
    id: "jemand",
    image: "/1.30 grammar words/images/someone.jpg",
    full: "jemand",
    english: "Someone",
    tamil: "யாரோ",
    sinhala: "කවුරු හරි",
  },
  {
    id: "niemand",
    image: "/1.30 grammar words/images/nobody.jpg",
    full: "niemand",
    english: "Nobody",
    tamil: "யாரும் இல்லை",
    sinhala: "කවුරුවත් නැත",
  },
  {
    id: "alles",
    image: "/1.30 grammar words/images/everything.jpg",
    full: "alles",
    english: "Everything",
    tamil: "எல்லாம்",
    sinhala: "සියල්ල",
  },
  {
    id: "jeder",
    image: "/1.30 grammar words/images/everyone.jpg",
    full: "jeder",
    english: "Everyone / every",
    tamil: "ஒவ்வொருவரும்",
    sinhala: "හැමෝම",
  },
  {
    id: "zusammen",
    image: "/1.30 grammar words/images/together.jpg",
    full: "zusammen",
    english: "Together",
    tamil: "ஒன்றாக",
    sinhala: "එකට",
  },
];
