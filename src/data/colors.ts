import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Die Farben" (colours) lesson, 1.22. "orange" is the
// colour, not the fruit ("die Orange", lesson 1.3), so it gets its own clip
// and photo. The 12 words make one test.
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.22 colors/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const COLORS_LESSON_ID = "1.22";

export const COLORS_WORDS: VocabWord[] = [
  {
    id: "farbe",
    image: "/1.22 colors/images/color.jpg",
    full: "die Farbe",
    english: "Colour",
    tamil: "நிறம்",
    sinhala: "වර්ණය",
  },
  {
    id: "rot",
    image: "/1.22 colors/images/red.jpg",
    full: "rot",
    english: "Red",
    tamil: "சிவப்பு",
    sinhala: "රතු",
  },
  {
    id: "blau",
    image: "/1.22 colors/images/blue.jpg",
    full: "blau",
    english: "Blue",
    tamil: "நீலம்",
    sinhala: "නිල්",
  },
  {
    id: "gruen",
    image: "/1.22 colors/images/green.jpg",
    full: "grün",
    english: "Green",
    tamil: "பச்சை",
    sinhala: "කොළ",
  },
  {
    id: "gelb",
    image: "/1.22 colors/images/yellow.jpg",
    full: "gelb",
    english: "Yellow",
    tamil: "மஞ்சள்",
    sinhala: "කහ",
  },
  {
    id: "orange",
    image: "/1.22 colors/images/orange.jpg",
    full: "orange",
    english: "Orange",
    tamil: "ஆரஞ்சு நிறம்",
    sinhala: "තැඹිලි",
  },
  {
    id: "rosa",
    image: "/1.22 colors/images/pink.jpg",
    full: "rosa",
    english: "Pink",
    tamil: "இளஞ்சிவப்பு",
    sinhala: "රෝස",
  },
  {
    id: "lila",
    image: "/1.22 colors/images/purple.jpg",
    full: "lila",
    english: "Purple",
    tamil: "ஊதா",
    sinhala: "දම්",
  },
  {
    id: "braun",
    image: "/1.22 colors/images/brown.jpg",
    full: "braun",
    english: "Brown",
    tamil: "பழுப்பு",
    sinhala: "දුඹුරු",
  },
  {
    id: "schwarz",
    image: "/1.22 colors/images/black.jpg",
    full: "schwarz",
    english: "Black",
    tamil: "கருப்பு",
    sinhala: "කළු",
  },
  {
    id: "weiss",
    image: "/1.22 colors/images/white.jpg",
    full: "weiß",
    english: "White",
    tamil: "வெள்ளை",
    sinhala: "සුදු",
  },
  {
    id: "grau",
    image: "/1.22 colors/images/grey.jpg",
    full: "grau",
    english: "Grey",
    tamil: "சாம்பல்",
    sinhala: "අළු",
  },
];
