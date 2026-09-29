import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "Die Tiere" (animals) lesson, 1.24: farm animals,
// wild animals and pets. "der Fisch" here is the live animal, so it gets a
// new photo, but it reuses the lesson 1.3 clip. The 17 words split into two
// tests (9 + 8).
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.24 animals/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const ANIMALS_LESSON_ID = "1.24";

export const ANIMALS_WORDS: VocabWord[] = [
  {
    id: "hund",
    image: "/1.24 animals/images/dog.jpg",
    full: "der Hund",
    english: "Dog",
    tamil: "நாய்",
    sinhala: "බල්ලා",
  },
  {
    id: "katze",
    image: "/1.24 animals/images/cat.jpg",
    full: "die Katze",
    english: "Cat",
    tamil: "பூனை",
    sinhala: "පූසා",
  },
  {
    id: "vogel",
    image: "/1.24 animals/images/bird.jpg",
    full: "der Vogel",
    english: "Bird",
    tamil: "பறவை",
    sinhala: "කුරුල්ලා",
  },
  {
    id: "fisch",
    image: "/1.24 animals/images/fish.jpg",
    full: "der Fisch",
    english: "Fish",
    tamil: "மீன்",
    sinhala: "මාළු",
  },
  {
    id: "pferd",
    image: "/1.24 animals/images/horse.jpg",
    full: "das Pferd",
    english: "Horse",
    tamil: "குதிரை",
    sinhala: "අශ්වයා",
  },
  {
    id: "kuh",
    image: "/1.24 animals/images/cow.jpg",
    full: "die Kuh",
    english: "Cow",
    tamil: "பசு",
    sinhala: "එළදෙන",
  },
  {
    id: "schwein",
    image: "/1.24 animals/images/pig.jpg",
    full: "das Schwein",
    english: "Pig",
    tamil: "பன்றி",
    sinhala: "ඌරා",
  },
  {
    id: "schaf",
    image: "/1.24 animals/images/sheep.jpg",
    full: "das Schaf",
    english: "Sheep",
    tamil: "செம்மறி ஆடு",
    sinhala: "බැටළුවා",
  },
  {
    id: "huhn",
    image: "/1.24 animals/images/chicken.jpg",
    full: "das Huhn",
    english: "Chicken",
    tamil: "கோழி",
    sinhala: "කිකිළිය",
  },
  {
    id: "ente",
    image: "/1.24 animals/images/duck.jpg",
    full: "die Ente",
    english: "Duck",
    tamil: "வாத்து",
    sinhala: "තාරාවා",
  },
  {
    id: "elefant",
    image: "/1.24 animals/images/elephant.jpg",
    full: "der Elefant",
    english: "Elephant",
    tamil: "யானை",
    sinhala: "අලියා",
  },
  {
    id: "loewe",
    image: "/1.24 animals/images/lion.jpg",
    full: "der Löwe",
    english: "Lion",
    tamil: "சிங்கம்",
    sinhala: "සිංහයා",
  },
  {
    id: "tiger",
    image: "/1.24 animals/images/tiger.jpg",
    full: "der Tiger",
    english: "Tiger",
    tamil: "புலி",
    sinhala: "කොටියා",
  },
  {
    id: "baer",
    image: "/1.24 animals/images/bear.jpg",
    full: "der Bär",
    english: "Bear",
    tamil: "கரடி",
    sinhala: "වලසා",
  },
  {
    id: "tier",
    image: "/1.24 animals/images/animal.jpg",
    full: "das Tier",
    english: "Animal",
    tamil: "விலங்கு",
    sinhala: "සතා",
  },
  {
    id: "haustier",
    image: "/1.24 animals/images/pet.jpg",
    full: "das Haustier",
    english: "Pet",
    tamil: "செல்லப்பிராணி",
    sinhala: "සුරතල් සතා",
  },
  {
    id: "wild",
    image: "/1.24 animals/images/wild.jpg",
    full: "wild",
    english: "Wild",
    tamil: "காட்டு",
    sinhala: "වනචාරී",
  },
];
