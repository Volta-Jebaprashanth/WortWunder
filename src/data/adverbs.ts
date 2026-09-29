import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Adverbien" (basic adverbs) lesson, 1.29. Most were
// taught in lessons 1.15 and 1.18 and keep their meanings. "schnell",
// "langsam", "Richtig" and "falsch" reuse their adjective photos and clips
// (lessons 1.21 and 1.1) with adverb meanings ("quickly", ...). The 22 words
// split into two tests of 11.
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.29 adverbs/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const ADVERBS_LESSON_ID = "1.29";

export const ADVERBS_WORDS: VocabWord[] = [
  {
    id: "sehr",
    image: "/1.29 adverbs/images/very.jpg",
    full: "sehr",
    english: "Very",
    tamil: "மிகவும்",
    sinhala: "හරිම",
  },
  {
    id: "ziemlich",
    image: "/1.29 adverbs/images/quite.jpg",
    full: "ziemlich",
    english: "Quite",
    tamil: "ஓரளவு",
    sinhala: "තරමක්",
  },
  {
    id: "wirklich",
    image: "/1.29 adverbs/images/really.jpg",
    full: "wirklich",
    english: "Really",
    tamil: "உண்மையில்",
    sinhala: "ඇත්තටම",
  },
  {
    id: "nur",
    image: "/1.29 adverbs/images/only.jpg",
    full: "nur",
    english: "Only",
    tamil: "மட்டும்",
    sinhala: "විතරයි",
  },
  {
    id: "auch",
    image: "/1.29 adverbs/images/also.jpg",
    full: "auch",
    english: "Also / too",
    tamil: "கூட",
    sinhala: "එසේම",
  },
  {
    id: "schon",
    image: "/1.29 adverbs/images/already.jpg",
    full: "schon",
    english: "Already",
    tamil: "ஏற்கனவே",
    sinhala: "දැනටමත්",
  },
  {
    id: "noch",
    image: "/1.29 adverbs/images/still.jpg",
    full: "noch",
    english: "Still / yet",
    tamil: "இன்னும்",
    sinhala: "තවමත්",
  },
  {
    id: "wieder",
    image: "/1.29 adverbs/images/again.jpg",
    full: "wieder",
    english: "Again",
    tamil: "மீண்டும்",
    sinhala: "ආයෙත්",
  },
  {
    id: "vielleicht",
    image: "/1.29 adverbs/images/maybe.jpg",
    full: "vielleicht",
    english: "Maybe",
    tamil: "ஒருவேளை",
    sinhala: "සමහරවිට",
  },
  {
    id: "natuerlich",
    image: "/1.29 adverbs/images/of-course.jpg",
    full: "Natürlich",
    english: "Of course",
    tamil: "நிச்சயமாக",
    sinhala: "ඇත්තෙන්ම",
  },
  {
    id: "gern",
    image: "/1.29 adverbs/images/gladly.jpg",
    full: "gern",
    english: "Gladly",
    tamil: "மகிழ்ச்சியுடன்",
    sinhala: "සතුටින්",
  },
  {
    id: "lieber",
    image: "/1.29 adverbs/images/rather.jpg",
    full: "lieber",
    english: "Rather / preferably",
    tamil: "அதைவிட விருப்பமாக",
    sinhala: "වඩා කැමතියි",
  },
  {
    id: "fast",
    image: "/1.29 adverbs/images/almost.jpg",
    full: "fast",
    english: "Almost",
    tamil: "கிட்டத்தட்ட",
    sinhala: "බොහෝ දුරට",
  },
  {
    id: "genug",
    image: "/1.29 adverbs/images/enough.jpg",
    full: "genug",
    english: "Enough",
    tamil: "போதும்",
    sinhala: "ඇති",
  },
  {
    id: "mehr",
    image: "/1.29 adverbs/images/more.jpg",
    full: "mehr",
    english: "More",
    tamil: "அதிகமாக",
    sinhala: "වැඩිපුර",
  },
  {
    id: "weniger",
    image: "/1.29 adverbs/images/less.jpg",
    full: "weniger",
    english: "Less",
    tamil: "குறைவாக",
    sinhala: "අඩුවෙන්",
  },
  {
    id: "zusammen",
    image: "/1.29 adverbs/images/together.jpg",
    full: "zusammen",
    english: "Together",
    tamil: "ஒன்றாக",
    sinhala: "එකට",
  },
  {
    id: "allein",
    image: "/1.29 adverbs/images/alone.jpg",
    full: "allein",
    english: "Alone",
    tamil: "தனியாக",
    sinhala: "තනිවම",
  },
  {
    id: "schnell",
    image: "/1.29 adverbs/images/fast.jpg",
    full: "schnell",
    english: "Quickly",
    tamil: "வேகமாக",
    sinhala: "ඉක්මනින්",
  },
  {
    id: "langsam",
    image: "/1.29 adverbs/images/slow.jpg",
    full: "langsam",
    english: "Slowly",
    tamil: "மெதுவாக",
    sinhala: "හෙමින්",
  },
  {
    id: "richtig",
    image: "/1.29 adverbs/images/correct.jpg",
    full: "Richtig",
    english: "Correctly",
    tamil: "சரியாக",
    sinhala: "නිවැරදිව",
  },
  {
    id: "falsch",
    image: "/1.29 adverbs/images/wrong.jpg",
    full: "falsch",
    english: "Incorrectly",
    tamil: "தவறாக",
    sinhala: "වැරදියට",
  },
];
