import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Die W-Fragen" (question words) lesson, 1.16. The
// source list had 17 words, which would split into two tests of 9 and 8 --
// below the 10-word minimum -- so three more common "wie" questions (wie
// weit, wie groß, was für) round it up to 20: two tests of 10 (see
// src/data/lessons.ts). welcher / welche / welches share a meaning and are
// told apart by their captions.
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.16 question words/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings, and their photos are copied
// into this lesson's folder; their audio is the existing clip, since
// WORD_AUDIO is keyed by the spoken text. Many of these words can't be told
// apart from a photo alone, so every screen also captions the picture in the
// learner's mother tongue — see VocabQuiz.tsx.
export const QUESTIONS_LESSON_ID = "1.16";

export const QUESTIONS_WORDS: VocabWord[] = [
  {
    id: "wer",
    image: "/1.16 question words/images/who.jpg",
    full: "wer",
    english: "Who",
    tamil: "யார்",
    sinhala: "කවුද",
  },
  {
    id: "was",
    image: "/1.16 question words/images/what.jpg",
    full: "was",
    english: "What",
    tamil: "என்ன",
    sinhala: "මොකක්ද",
  },
  {
    id: "wann",
    image: "/1.16 question words/images/when.jpg",
    full: "wann",
    english: "When",
    tamil: "எப்போது",
    sinhala: "කවදාද",
  },
  {
    id: "wo",
    image: "/1.16 question words/images/where.jpg",
    full: "wo",
    english: "Where",
    tamil: "எங்கே",
    sinhala: "කොහේද",
  },
  {
    id: "wohin",
    image: "/1.16 question words/images/where-to.jpg",
    full: "wohin",
    english: "Where to",
    tamil: "எங்கே நோக்கி",
    sinhala: "කොහාටද",
  },
  {
    id: "woher",
    image: "/1.16 question words/images/where-from.jpg",
    full: "woher",
    english: "Where from",
    tamil: "எங்கிருந்து",
    sinhala: "කොහේ ඉඳලාද",
  },
  {
    id: "warum",
    image: "/1.16 question words/images/why.jpg",
    full: "warum",
    english: "Why",
    tamil: "ஏன்",
    sinhala: "ඇයි",
  },
  {
    id: "wie",
    image: "/1.16 question words/images/how.jpg",
    full: "wie",
    english: "How",
    tamil: "எப்படி",
    sinhala: "කොහොමද",
  },
  {
    id: "wie-viel",
    image: "/1.16 question words/images/how-much.jpg",
    full: "wie viel",
    english: "How much",
    tamil: "எவ்வளவு",
    sinhala: "කොච්චරද",
  },
  {
    id: "wie-viele",
    image: "/1.16 question words/images/how-many.jpg",
    full: "wie viele",
    english: "How many",
    tamil: "எத்தனை",
    sinhala: "කීයක්ද",
  },
  {
    id: "welcher",
    image: "/1.16 question words/images/which-masculine.jpg",
    full: "welcher",
    english: "Which (masculine)",
    tamil: "எந்த (ஆண்பால்)",
    sinhala: "කුමන (පුරුෂ ලිංග)",
  },
  {
    id: "welche",
    image: "/1.16 question words/images/which-feminine.jpg",
    full: "welche",
    english: "Which (feminine / plural)",
    tamil: "எந்த (பெண்பால் / பன்மை)",
    sinhala: "කුමන (ස්ත්‍රී ලිංග / බහුවචන)",
  },
  {
    id: "welches",
    image: "/1.16 question words/images/which-neuter.jpg",
    full: "welches",
    english: "Which (neuter)",
    tamil: "எந்த (நடுநிலை)",
    sinhala: "කුමන (නපුංසක ලිංග)",
  },
  {
    id: "was-fuer",
    image: "/1.16 question words/images/what-kind-of.jpg",
    full: "was für",
    english: "What kind of",
    tamil: "என்ன வகை",
    sinhala: "මොන වගේද",
  },
  {
    id: "wie-lange",
    image: "/1.16 question words/images/how-long.jpg",
    full: "wie lange",
    english: "How long",
    tamil: "எவ்வளவு நேரம்",
    sinhala: "කොච්චර වෙලාද",
  },
  {
    id: "wie-oft",
    image: "/1.16 question words/images/how-often.jpg",
    full: "wie oft",
    english: "How often",
    tamil: "எத்தனை முறை",
    sinhala: "කොච්චර නිතරද",
  },
  {
    id: "wie-alt",
    image: "/1.16 question words/images/how-old.jpg",
    full: "wie alt",
    english: "How old",
    tamil: "என்ன வயது",
    sinhala: "වයස කීයද",
  },
  {
    id: "wie-spaet",
    image: "/1.16 question words/images/what-time.jpg",
    full: "wie spät",
    english: "What time",
    tamil: "என்ன நேரம்",
    sinhala: "වෙලාව කීයද",
  },
  {
    id: "wie-weit",
    image: "/1.16 question words/images/how-far.jpg",
    full: "wie weit",
    english: "How far",
    tamil: "எவ்வளவு தூரம்",
    sinhala: "කොච්චර දුරද",
  },
  {
    id: "wie-gross",
    image: "/1.16 question words/images/how-big.jpg",
    full: "wie groß",
    english: "How big / tall",
    tamil: "எவ்வளவு பெரியது",
    sinhala: "කොච්චර ලොකුද",
  },
];
