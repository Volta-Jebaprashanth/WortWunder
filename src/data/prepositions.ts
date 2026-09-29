import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Präpositionen" (important prepositions) lesson,
// 1.27. Most were taught in lesson 1.18 and keep its meanings, photos and
// clips; "gegen", "durch", "seit" and "bis" are new. The 21 words split into
// two tests (11 + 10).
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.27 prepositions/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const PREPOSITIONS_LESSON_ID = "1.27";

export const PREPOSITIONS_WORDS: VocabWord[] = [
  {
    id: "in",
    image: "/1.27 prepositions/images/in.jpg",
    full: "in",
    english: "In",
    tamil: "உள்ளே",
    sinhala: "ඇතුළේ",
  },
  {
    id: "an",
    image: "/1.27 prepositions/images/at-on.jpg",
    full: "an",
    english: "At / on (a wall)",
    tamil: "சுவரில் / ஓரத்தில்",
    sinhala: "බිත්තියේ / ළඟ",
  },
  {
    id: "auf",
    image: "/1.27 prepositions/images/on.jpg",
    full: "auf",
    english: "On (top of)",
    tamil: "மேலே",
    sinhala: "උඩ",
  },
  {
    id: "unter",
    image: "/1.27 prepositions/images/under.jpg",
    full: "unter",
    english: "Under",
    tamil: "கீழே",
    sinhala: "යට",
  },
  {
    id: "ueber",
    image: "/1.27 prepositions/images/over.jpg",
    full: "über",
    english: "Over / about",
    tamil: "மேலே / பற்றி",
    sinhala: "උඩින් / ගැන",
  },
  {
    id: "neben",
    image: "/1.27 prepositions/images/next-to.jpg",
    full: "neben",
    english: "Next to",
    tamil: "அருகில்",
    sinhala: "ළඟ",
  },
  {
    id: "hinter",
    image: "/1.27 prepositions/images/behind.jpg",
    full: "hinter",
    english: "Behind",
    tamil: "பின்னால்",
    sinhala: "පිටුපසින්",
  },
  {
    id: "vor",
    image: "/1.27 prepositions/images/in-front-of.jpg",
    full: "vor",
    english: "In front of",
    tamil: "முன்னால்",
    sinhala: "ඉදිරියෙන්",
  },
  {
    id: "zwischen",
    image: "/1.27 prepositions/images/between.jpg",
    full: "zwischen",
    english: "Between",
    tamil: "இடையில்",
    sinhala: "අතර",
  },
  {
    id: "mit",
    image: "/1.27 prepositions/images/with.jpg",
    full: "mit",
    english: "With",
    tamil: "உடன்",
    sinhala: "එක්ක",
  },
  {
    id: "ohne",
    image: "/1.27 prepositions/images/without.jpg",
    full: "ohne",
    english: "Without",
    tamil: "இல்லாமல்",
    sinhala: "නැතුව",
  },
  {
    id: "fuer",
    image: "/1.27 prepositions/images/for.jpg",
    full: "für",
    english: "For",
    tamil: "க்காக",
    sinhala: "සඳහා",
  },
  {
    id: "gegen",
    image: "/1.27 prepositions/images/against.jpg",
    full: "gegen",
    english: "Against / around (time)",
    tamil: "எதிராக",
    sinhala: "විරුද්ධව",
  },
  {
    id: "durch",
    image: "/1.27 prepositions/images/through.jpg",
    full: "durch",
    english: "Through",
    tamil: "வழியாக",
    sinhala: "හරහා",
  },
  {
    id: "aus",
    image: "/1.27 prepositions/images/out-of.jpg",
    full: "aus",
    english: "Out of / from",
    tamil: "வெளியே",
    sinhala: "ඇතුළෙන් පිටතට",
  },
  {
    id: "von",
    image: "/1.27 prepositions/images/from.jpg",
    full: "von",
    english: "From / of",
    tamil: "இருந்து / உடைய",
    sinhala: "ගෙන් / ගේ",
  },
  {
    id: "zu",
    image: "/1.27 prepositions/images/too.jpg",
    full: "zu",
    english: "Too / to",
    tamil: "மிகவும் அதிகமாக / -க்கு",
    sinhala: "වැඩියි / ට",
  },
  {
    id: "bei",
    image: "/1.27 prepositions/images/at.jpg",
    full: "bei",
    english: "At / with (someone)",
    tamil: "இடத்தில்",
    sinhala: "ළඟ",
  },
  {
    id: "nach",
    image: "/1.27 prepositions/images/to.jpg",
    full: "nach",
    english: "To (a place) / after",
    tamil: "நோக்கி",
    sinhala: "වෙත",
  },
  {
    id: "seit",
    image: "/1.27 prepositions/images/since.jpg",
    full: "seit",
    english: "Since / for (time)",
    tamil: "முதல்",
    sinhala: "සිට",
  },
  {
    id: "bis",
    image: "/1.27 prepositions/images/until.jpg",
    full: "bis",
    english: "Until / to",
    tamil: "வரை",
    sinhala: "තෙක්",
  },
];
