import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Gefühle" (feelings & emotions) lesson, 1.19:
// how you feel, feeling nouns (Angst, Liebe, Freude, ...) and feeling verbs.
// The source list had "traurig" twice; it is taught once. Nouns keep their
// article in `full` like every other lesson. The 23 words split into two
// tests (12 + 11, see src/data/lessons.ts).
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.19 feelings/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const FEELINGS_LESSON_ID = "1.19";

export const FEELINGS_WORDS: VocabWord[] = [
  {
    id: "gluecklich",
    image: "/1.19 feelings/images/happy.jpg",
    full: "glücklich",
    english: "Happy",
    tamil: "மகிழ்ச்சியான",
    sinhala: "සතුටු",
  },
  {
    id: "traurig",
    image: "/1.19 feelings/images/sad.jpg",
    full: "traurig",
    english: "Sad",
    tamil: "சோகமான",
    sinhala: "දුක",
  },
  {
    id: "muede",
    image: "/1.19 feelings/images/tired.jpg",
    full: "müde",
    english: "Tired",
    tamil: "சோர்வான",
    sinhala: "මහන්සි",
  },
  {
    id: "hungrig",
    image: "/1.19 feelings/images/hungry.jpg",
    full: "hungrig",
    english: "Hungry",
    tamil: "பசியான",
    sinhala: "බඩගිනි",
  },
  {
    id: "durstig",
    image: "/1.19 feelings/images/thirsty.jpg",
    full: "durstig",
    english: "Thirsty",
    tamil: "தாகமான",
    sinhala: "පිපාසිත",
  },
  {
    id: "krank",
    image: "/1.19 feelings/images/sick.jpg",
    full: "krank",
    english: "Sick",
    tamil: "நோய்வாய்ப்பட்ட",
    sinhala: "ලෙඩ",
  },
  {
    id: "gesund",
    image: "/1.19 feelings/images/healthy.jpg",
    full: "gesund",
    english: "Healthy",
    tamil: "ஆரோக்கியமான",
    sinhala: "නිරෝගී",
  },
  {
    id: "nervoes",
    image: "/1.19 feelings/images/nervous.jpg",
    full: "nervös",
    english: "Nervous",
    tamil: "பதற்றமான",
    sinhala: "කලබල",
  },
  {
    id: "ruhig",
    image: "/1.19 feelings/images/calm.jpg",
    full: "ruhig",
    english: "Calm",
    tamil: "அமைதியான",
    sinhala: "සන්සුන්",
  },
  {
    id: "froh",
    image: "/1.19 feelings/images/glad.jpg",
    full: "froh",
    english: "Glad",
    tamil: "சந்தோஷமான",
    sinhala: "සතුටින්",
  },
  {
    id: "zufrieden",
    image: "/1.19 feelings/images/satisfied.jpg",
    full: "zufrieden",
    english: "Satisfied",
    tamil: "திருப்தியான",
    sinhala: "සෑහීමකට පත්",
  },
  {
    id: "wuetend",
    image: "/1.19 feelings/images/angry.jpg",
    full: "wütend",
    english: "Angry",
    tamil: "கோபமான",
    sinhala: "තරහ",
  },
  {
    id: "ueberrascht",
    image: "/1.19 feelings/images/surprised.jpg",
    full: "überrascht",
    english: "Surprised",
    tamil: "ஆச்சரியமான",
    sinhala: "පුදුම වූ",
  },
  {
    id: "angst",
    image: "/1.19 feelings/images/fear.jpg",
    full: "die Angst",
    english: "Fear",
    tamil: "பயம்",
    sinhala: "බය",
  },
  {
    id: "spass",
    image: "/1.19 feelings/images/fun.jpg",
    full: "der Spaß",
    english: "Fun",
    tamil: "வேடிக்கை",
    sinhala: "විනෝදය",
  },
  {
    id: "liebe",
    image: "/1.19 feelings/images/love.jpg",
    full: "die Liebe",
    english: "Love",
    tamil: "அன்பு",
    sinhala: "ආදරය",
  },
  {
    id: "freude",
    image: "/1.19 feelings/images/joy.jpg",
    full: "die Freude",
    english: "Joy",
    tamil: "சந்தோஷம்",
    sinhala: "ප්‍රීතිය",
  },
  {
    id: "problem",
    image: "/1.19 feelings/images/problem.jpg",
    full: "das Problem",
    english: "Problem",
    tamil: "பிரச்சனை",
    sinhala: "ප්‍රශ්නය",
  },
  {
    id: "angst-haben",
    image: "/1.19 feelings/images/to-be-afraid.jpg",
    full: "Angst haben",
    english: "To be afraid",
    tamil: "பயப்படுதல்",
    sinhala: "බය වෙනවා",
  },
  {
    id: "sich-freuen",
    image: "/1.19 feelings/images/to-look-forward.jpg",
    full: "sich freuen",
    english: "To be happy / look forward to",
    tamil: "மகிழ்தல்",
    sinhala: "සතුටු වෙනවා",
  },
  {
    id: "hoffen",
    image: "/1.19 feelings/images/to-hope.jpg",
    full: "hoffen",
    english: "To hope",
    tamil: "நம்பிக்கை கொள்ளுதல்",
    sinhala: "බලාපොරොත්තු වෙනවා",
  },
  {
    id: "wuenschen",
    image: "/1.19 feelings/images/to-wish.jpg",
    full: "wünschen",
    english: "To wish",
    tamil: "விரும்புதல்",
    sinhala: "පතනවා",
  },
  {
    id: "fuehlen",
    image: "/1.19 feelings/images/to-feel.jpg",
    full: "fühlen",
    english: "To feel",
    tamil: "உணர்தல்",
    sinhala: "දැනෙනවා",
  },
];
