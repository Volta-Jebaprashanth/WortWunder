import type { MotherTongue } from "@/lib/i18n";
import type { VocabWord } from "@/data/vocabulary";
import { GREETINGS_LESSON_ID, GREETINGS_WORDS } from "@/data/greetings";
import { FAMILY_LESSON_ID, FAMILY_WORDS } from "@/data/family";
import { FOOD_LESSON_ID, FOOD_WORDS } from "@/data/food";
import { HOME_LESSON_ID, HOME_WORDS } from "@/data/home";
import { WEATHER_LESSON_ID, WEATHER_WORDS } from "@/data/weather";
import { HOBBIES_LESSON_ID, HOBBIES_WORDS } from "@/data/hobbies";
import { JOBS_LESSON_ID, JOBS_WORDS } from "@/data/jobs";
import { PERSONAL_LESSON_ID, PERSONAL_WORDS } from "@/data/personal";
import { SHOPPING_LESSON_ID, SHOPPING_WORDS } from "@/data/shopping";
import { TIME_LESSON_ID, TIME_WORDS } from "@/data/time";
import { TRANSPORT_LESSON_ID, TRANSPORT_WORDS } from "@/data/transport";
import { WORK_SCHOOL_LESSON_ID, WORK_SCHOOL_WORDS } from "@/data/work-school";
import { HEALTH_LESSON_ID, HEALTH_WORDS } from "@/data/health";
import { TRAVEL_LESSON_ID, TRAVEL_WORDS } from "@/data/travel";
import { NUMBERS_LESSON_ID, NUMBERS_WORDS } from "@/data/numbers";
import { QUESTIONS_LESSON_ID, QUESTIONS_WORDS } from "@/data/questions";
import { VERBS_LESSON_ID, VERBS_WORDS } from "@/data/verbs";
import { SMALL_WORDS_LESSON_ID, SMALL_WORDS_WORDS } from "@/data/small-words";
import { FEELINGS_LESSON_ID, FEELINGS_WORDS } from "@/data/feelings";
import { CLOTHES_LESSON_ID, CLOTHES_WORDS } from "@/data/clothes";
import { DESCRIBING_LESSON_ID, DESCRIBING_WORDS } from "@/data/describing";
import { COLORS_LESSON_ID, COLORS_WORDS } from "@/data/colors";
import { NATURE_LESSON_ID, NATURE_WORDS } from "@/data/nature";
import { ANIMALS_LESSON_ID, ANIMALS_WORDS } from "@/data/animals";
import { TOWN_LESSON_ID, TOWN_WORDS } from "@/data/town";
import { COMMUNICATION_LESSON_ID, COMMUNICATION_WORDS } from "@/data/communication";
import { PREPOSITIONS_LESSON_ID, PREPOSITIONS_WORDS } from "@/data/prepositions";
import { POSITION_LESSON_ID, POSITION_WORDS } from "@/data/position";
import { ADVERBS_LESSON_ID, ADVERBS_WORDS } from "@/data/adverbs";
import { GRAMMAR_LESSON_ID, GRAMMAR_WORDS } from "@/data/grammar-words";

// Every vocabulary test holds 10-15 words. A lesson's word list is split
// evenly into as few tests as fit that range (24 -> 12+12, 37 -> 13+12+12),
// numbered under the lesson id: lesson "1.2" -> tests "1.2.1", "1.2.2", ...
// Each test id is also the key its progress is stored under (see
// src/lib/progress-store.ts), so re-splitting a lesson resets its progress.
export const MIN_TEST_WORDS = 10;
export const MAX_TEST_WORDS = 15;

export interface VocabTest {
  testId: string;
  part: number;
  words: VocabWord[];
}

export interface VocabLesson {
  id: string;
  title: string;
  // Emoji fallback, shown if the path picture below fails to load.
  icon: string;
  // The lesson's public/ asset folder, e.g. "1.1 greetings". Its icons/
  // subfolder holds the small round path pictures: lesson.jpg for the lesson
  // node and test-<part>.jpg for each numbered test (see lessonPicture /
  // testPicture).
  assetDir: string;
  meaning: Record<MotherTongue, string>;
  tests: VocabTest[];
}

export function splitIntoTests(lessonId: string, words: VocabWord[]): VocabTest[] {
  const count = Math.max(1, Math.ceil(words.length / MAX_TEST_WORDS));
  const base = Math.floor(words.length / count);
  const extra = words.length % count;
  const tests: VocabTest[] = [];
  let start = 0;
  for (let i = 0; i < count; i++) {
    const size = base + (i < extra ? 1 : 0);
    tests.push({
      testId: `${lessonId}.${i + 1}`,
      part: i + 1,
      words: words.slice(start, start + size),
    });
    start += size;
  }
  return tests;
}

export const VOCAB_LESSONS: VocabLesson[] = [
  {
    id: GREETINGS_LESSON_ID,
    assetDir: "1.1 greetings",
    title: "Hallo",
    icon: "👋",
    meaning: { english: "Hello", tamil: "வணக்கம்", sinhala: "ආයුබෝවන්" },
    tests: splitIntoTests(GREETINGS_LESSON_ID, GREETINGS_WORDS),
  },
  {
    id: FAMILY_LESSON_ID,
    assetDir: "1.2 family",
    title: "Familie",
    icon: "👨‍👩‍👧",
    meaning: { english: "Family", tamil: "குடும்பம்", sinhala: "පවුල" },
    tests: splitIntoTests(FAMILY_LESSON_ID, FAMILY_WORDS),
  },
  {
    id: FOOD_LESSON_ID,
    assetDir: "1.3 food",
    title: "Essen & Trinken",
    icon: "🍽️",
    meaning: { english: "Food & Drinks", tamil: "உணவு & பானங்கள்", sinhala: "කෑම බීම" },
    tests: splitIntoTests(FOOD_LESSON_ID, FOOD_WORDS),
  },
  {
    id: HOME_LESSON_ID,
    assetDir: "1.4 home",
    title: "Haus & Zimmer",
    icon: "🏠",
    meaning: { english: "Home & Rooms", tamil: "வீடு & அறைகள்", sinhala: "ගෙදර සහ කාමර" },
    tests: splitIntoTests(HOME_LESSON_ID, HOME_WORDS),
  },
  {
    id: WEATHER_LESSON_ID,
    assetDir: "1.5 weather",
    title: "Das Wetter",
    icon: "🌦️",
    meaning: { english: "The Weather", tamil: "வானிலை", sinhala: "කාලගුණය" },
    tests: splitIntoTests(WEATHER_LESSON_ID, WEATHER_WORDS),
  },
  {
    id: HOBBIES_LESSON_ID,
    assetDir: "1.6 hobbies",
    title: "Die Hobbys",
    icon: "⚽",
    meaning: { english: "Hobbies", tamil: "பொழுதுபோக்குகள்", sinhala: "විනෝදාංශ" },
    tests: splitIntoTests(HOBBIES_LESSON_ID, HOBBIES_WORDS),
  },
  {
    id: JOBS_LESSON_ID,
    assetDir: "1.7 jobs",
    title: "Der Beruf",
    icon: "💼",
    meaning: { english: "Jobs", tamil: "தொழில்கள்", sinhala: "රැකියා" },
    tests: splitIntoTests(JOBS_LESSON_ID, JOBS_WORDS),
  },
  {
    id: PERSONAL_LESSON_ID,
    assetDir: "1.8 personal information",
    title: "Angaben zur Person",
    icon: "🪪",
    meaning: {
      english: "Personal information",
      tamil: "தனிப்பட்ட விவரங்கள்",
      sinhala: "පුද්ගලික තොරතුරු",
    },
    tests: splitIntoTests(PERSONAL_LESSON_ID, PERSONAL_WORDS),
  },
  {
    id: SHOPPING_LESSON_ID,
    assetDir: "1.9 shopping",
    title: "Einkaufen",
    icon: "🛒",
    meaning: { english: "Shopping", tamil: "பொருட்கள் வாங்குதல்", sinhala: "සාප්පු යාම" },
    tests: splitIntoTests(SHOPPING_LESSON_ID, SHOPPING_WORDS),
  },
  {
    id: TIME_LESSON_ID,
    assetDir: "1.10 time",
    title: "Zeit & Datum",
    icon: "🕐",
    meaning: {
      english: "Time, days & dates",
      tamil: "நேரம், நாட்கள் & தேதிகள்",
      sinhala: "වේලාව, දවස් සහ දින",
    },
    tests: splitIntoTests(TIME_LESSON_ID, TIME_WORDS),
  },
  {
    id: TRANSPORT_LESSON_ID,
    assetDir: "1.11 transport",
    title: "Verkehr & Wege",
    icon: "🚌",
    meaning: {
      english: "Transport & directions",
      tamil: "போக்குவரத்து & திசைகள்",
      sinhala: "ප්‍රවාහනය සහ දිශා",
    },
    tests: splitIntoTests(TRANSPORT_LESSON_ID, TRANSPORT_WORDS),
  },
  {
    id: WORK_SCHOOL_LESSON_ID,
    assetDir: "1.12 work and school",
    title: "Arbeit & Schule",
    icon: "🏫",
    meaning: { english: "Work & school", tamil: "வேலை & பள்ளி", sinhala: "රැකියාව සහ පාසල" },
    tests: splitIntoTests(WORK_SCHOOL_LESSON_ID, WORK_SCHOOL_WORDS),
  },
  {
    id: HEALTH_LESSON_ID,
    assetDir: "1.13 health",
    title: "Gesundheit",
    icon: "🩺",
    meaning: { english: "Health", tamil: "ஆரோக்கியம்", sinhala: "සෞඛ්‍යය" },
    tests: splitIntoTests(HEALTH_LESSON_ID, HEALTH_WORDS),
  },
  {
    id: TRAVEL_LESSON_ID,
    assetDir: "1.14 travel",
    title: "Reise & Hotel",
    icon: "🏨",
    meaning: {
      english: "Travel & hotel",
      tamil: "பயணம் & ஹோட்டல்",
      sinhala: "සංචාරය සහ හෝටලය",
    },
    tests: splitIntoTests(TRAVEL_LESSON_ID, TRAVEL_WORDS),
  },
  {
    id: NUMBERS_LESSON_ID,
    assetDir: "1.15 numbers",
    title: "Die Zahlen",
    icon: "🔢",
    meaning: {
      english: "Numbers",
      tamil: "எண்கள்",
      sinhala: "ඉලක්කම්",
    },
    tests: splitIntoTests(NUMBERS_LESSON_ID, NUMBERS_WORDS),
  },
  {
    id: QUESTIONS_LESSON_ID,
    assetDir: "1.16 question words",
    title: "Die W-Fragen",
    icon: "❓",
    meaning: {
      english: "Question words",
      tamil: "கேள்விச் சொற்கள்",
      sinhala: "ප්‍රශ්න වචන",
    },
    tests: splitIntoTests(QUESTIONS_LESSON_ID, QUESTIONS_WORDS),
  },
  {
    id: VERBS_LESSON_ID,
    assetDir: "1.17 verbs",
    title: "Wichtige Verben",
    icon: "🏃",
    meaning: {
      english: "Essential verbs",
      tamil: "முக்கிய வினைச்சொற்கள்",
      sinhala: "වැදගත් ක්‍රියා පද",
    },
    tests: splitIntoTests(VERBS_LESSON_ID, VERBS_WORDS),
  },
  {
    id: SMALL_WORDS_LESSON_ID,
    assetDir: "1.18 small words",
    title: "Kleine Wörter",
    icon: "🔗",
    meaning: {
      english: "Connectors & small words",
      tamil: "இணைப்புச் சொற்கள்",
      sinhala: "සම්බන්ධක සහ කුඩා වචන",
    },
    tests: splitIntoTests(SMALL_WORDS_LESSON_ID, SMALL_WORDS_WORDS),
  },
  {
    id: FEELINGS_LESSON_ID,
    assetDir: "1.19 feelings",
    title: "Gefühle",
    icon: "😊",
    meaning: {
      english: "Feelings & emotions",
      tamil: "உணர்வுகள்",
      sinhala: "හැඟීම්",
    },
    tests: splitIntoTests(FEELINGS_LESSON_ID, FEELINGS_WORDS),
  },
  {
    id: CLOTHES_LESSON_ID,
    assetDir: "1.20 clothes",
    title: "Kleidung & Aussehen",
    icon: "👕",
    meaning: {
      english: "Clothes & appearance",
      tamil: "ஆடைகள் & தோற்றம்",
      sinhala: "ඇඳුම් සහ පෙනුම",
    },
    tests: splitIntoTests(CLOTHES_LESSON_ID, CLOTHES_WORDS),
  },
  {
    id: DESCRIBING_LESSON_ID,
    assetDir: "1.21 describing",
    title: "Eigenschaften",
    icon: "📏",
    meaning: {
      english: "Describing people & things",
      tamil: "விவரிக்கும் சொற்கள்",
      sinhala: "විස්තර කරන වචන",
    },
    tests: splitIntoTests(DESCRIBING_LESSON_ID, DESCRIBING_WORDS),
  },
  {
    id: COLORS_LESSON_ID,
    assetDir: "1.22 colors",
    title: "Die Farben",
    icon: "🎨",
    meaning: {
      english: "Colours",
      tamil: "நிறங்கள்",
      sinhala: "වර්ණ",
    },
    tests: splitIntoTests(COLORS_LESSON_ID, COLORS_WORDS),
  },
  {
    id: NATURE_LESSON_ID,
    assetDir: "1.23 nature",
    title: "Natur & Umwelt",
    icon: "🌳",
    meaning: {
      english: "Nature & environment",
      tamil: "இயற்கை & சுற்றுச்சூழல்",
      sinhala: "සොබාදහම සහ පරිසරය",
    },
    tests: splitIntoTests(NATURE_LESSON_ID, NATURE_WORDS),
  },
  {
    id: ANIMALS_LESSON_ID,
    assetDir: "1.24 animals",
    title: "Die Tiere",
    icon: "🐶",
    meaning: {
      english: "Animals",
      tamil: "விலங்குகள்",
      sinhala: "සතුන්",
    },
    tests: splitIntoTests(ANIMALS_LESSON_ID, ANIMALS_WORDS),
  },
  {
    id: TOWN_LESSON_ID,
    assetDir: "1.25 town",
    title: "In der Stadt",
    icon: "🏙️",
    meaning: {
      english: "Places around town",
      tamil: "நகரத்தில் உள்ள இடங்கள்",
      sinhala: "නගරයේ ස්ථාන",
    },
    tests: splitIntoTests(TOWN_LESSON_ID, TOWN_WORDS),
  },
  {
    id: COMMUNICATION_LESSON_ID,
    assetDir: "1.26 communication",
    title: "Alltagssprache",
    icon: "🗣️",
    meaning: {
      english: "Everyday communication",
      tamil: "அன்றாட உரையாடல்",
      sinhala: "එදිනෙදා කතාබහ",
    },
    tests: splitIntoTests(COMMUNICATION_LESSON_ID, COMMUNICATION_WORDS),
  },
  {
    id: PREPOSITIONS_LESSON_ID,
    assetDir: "1.27 prepositions",
    title: "Präpositionen",
    icon: "🧩",
    meaning: {
      english: "Important prepositions",
      tamil: "முக்கிய முன்னிடைச் சொற்கள்",
      sinhala: "වැදගත් පූර්ව නිපාත",
    },
    tests: splitIntoTests(PREPOSITIONS_LESSON_ID, PREPOSITIONS_WORDS),
  },
  {
    id: POSITION_LESSON_ID,
    assetDir: "1.28 position",
    title: "Position & Ort",
    icon: "📍",
    meaning: {
      english: "Position & location",
      tamil: "இடம் & நிலை",
      sinhala: "පිහිටීම සහ ස්ථානය",
    },
    tests: splitIntoTests(POSITION_LESSON_ID, POSITION_WORDS),
  },
  {
    id: ADVERBS_LESSON_ID,
    assetDir: "1.29 adverbs",
    title: "Adverbien",
    icon: "🧠",
    meaning: {
      english: "Basic adverbs",
      tamil: "அடிப்படை வினையுரிச்சொற்கள்",
      sinhala: "මූලික ක්‍රියා විශේෂණ",
    },
    tests: splitIntoTests(ADVERBS_LESSON_ID, ADVERBS_WORDS),
  },
  {
    id: GRAMMAR_LESSON_ID,
    assetDir: "1.30 grammar words",
    title: "Pronomen & Co.",
    icon: "🧱",
    meaning: {
      english: "Basic grammar words",
      tamil: "அடிப்படை இலக்கணச் சொற்கள்",
      sinhala: "මූලික ව්‍යාකරණ වචන",
    },
    tests: splitIntoTests(GRAMMAR_LESSON_ID, GRAMMAR_WORDS),
  },
];

export function lessonPicture(lesson: VocabLesson): string {
  return `/${lesson.assetDir}/icons/lesson.jpg`;
}

export function testPicture(lesson: VocabLesson, test: VocabTest): string {
  return `/${lesson.assetDir}/icons/test-${test.part}.jpg`;
}

export function findVocabLesson(lessonId: string): VocabLesson {
  const lesson = VOCAB_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) throw new Error(`Unknown vocab lesson ${lessonId}`);
  return lesson;
}

export function findVocabTest(testId: string): VocabTest | undefined {
  for (const lesson of VOCAB_LESSONS) {
    const test = lesson.tests.find((t) => t.testId === testId);
    if (test) return test;
  }
  return undefined;
}
