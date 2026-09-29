import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Position & Ort" (position & location) lesson, 1.28:
// where something is. "innen"/"außen" (the inside/outside of a thing) are
// different words from "drinnen"/"draußen" (indoors/outdoors, lesson 1.23)
// and get their own photos. The 17 words split into two tests (9 + 8).
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.28 position/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const POSITION_LESSON_ID = "1.28";

export const POSITION_WORDS: VocabWord[] = [
  {
    id: "hier",
    image: "/1.28 position/images/here.jpg",
    full: "hier",
    english: "Here",
    tamil: "இங்கே",
    sinhala: "මෙතන",
  },
  {
    id: "dort",
    image: "/1.28 position/images/there.jpg",
    full: "dort",
    english: "There",
    tamil: "அங்கே",
    sinhala: "අතන",
  },
  {
    id: "oben",
    image: "/1.28 position/images/above.jpg",
    full: "oben",
    english: "Upstairs / above",
    tamil: "மேலே",
    sinhala: "උඩ",
  },
  {
    id: "unten",
    image: "/1.28 position/images/below.jpg",
    full: "unten",
    english: "Downstairs / below",
    tamil: "கீழே",
    sinhala: "පහළ",
  },
  {
    id: "links",
    image: "/1.28 position/images/left.jpg",
    full: "links",
    english: "Left",
    tamil: "இடது",
    sinhala: "වමට",
  },
  {
    id: "rechts",
    image: "/1.28 position/images/right.jpg",
    full: "rechts",
    english: "Right",
    tamil: "வலது",
    sinhala: "දකුණට",
  },
  {
    id: "vorne",
    image: "/1.28 position/images/at-the-front.jpg",
    full: "vorne",
    english: "In front / at the front",
    tamil: "முன்பக்கம்",
    sinhala: "ඉස්සරහ",
  },
  {
    id: "hinten",
    image: "/1.28 position/images/at-the-back.jpg",
    full: "hinten",
    english: "Behind / at the back",
    tamil: "பின்பக்கம்",
    sinhala: "පිටුපස",
  },
  {
    id: "innen",
    image: "/1.28 position/images/inside.jpg",
    full: "innen",
    english: "Inside",
    tamil: "உட்புறம்",
    sinhala: "ඇතුළත",
  },
  {
    id: "aussen",
    image: "/1.28 position/images/outside.jpg",
    full: "außen",
    english: "Outside",
    tamil: "வெளிப்புறம்",
    sinhala: "පිටත",
  },
  {
    id: "nahe",
    image: "/1.28 position/images/near.jpg",
    full: "nahe",
    english: "Near",
    tamil: "அருகில்",
    sinhala: "ආසන්නයේ",
  },
  {
    id: "weit",
    image: "/1.28 position/images/far.jpg",
    full: "weit",
    english: "Far",
    tamil: "தொலைவில்",
    sinhala: "දුර",
  },
  {
    id: "ueberall",
    image: "/1.28 position/images/everywhere.jpg",
    full: "überall",
    english: "Everywhere",
    tamil: "எல்லா இடத்திலும்",
    sinhala: "හැම තැනම",
  },
  {
    id: "irgendwo",
    image: "/1.28 position/images/somewhere.jpg",
    full: "irgendwo",
    english: "Somewhere",
    tamil: "எங்கோ",
    sinhala: "කොහේ හරි",
  },
  {
    id: "nirgendwo",
    image: "/1.28 position/images/nowhere.jpg",
    full: "nirgendwo",
    english: "Nowhere",
    tamil: "எங்குமில்லை",
    sinhala: "කොහේවත් නැත",
  },
  {
    id: "zusammen",
    image: "/1.28 position/images/together.jpg",
    full: "zusammen",
    english: "Together",
    tamil: "ஒன்றாக",
    sinhala: "එකට",
  },
  {
    id: "allein",
    image: "/1.28 position/images/alone.jpg",
    full: "allein",
    english: "Alone",
    tamil: "தனியாக",
    sinhala: "තනිවම",
  },
];
