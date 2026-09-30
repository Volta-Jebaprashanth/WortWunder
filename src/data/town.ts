import type { VocabWord } from "@/data/vocabulary";

// Vocabulary for the "In der Stadt" (places around town) lesson, 1.25.
// Most places were already taught in earlier lessons; "die Bushaltestelle"
// uses the lesson 1.11 bus-stop photo. The 28 words split into two tests of
// 14.
//
// Per-lesson asset layout (see AGENTS.md): this lesson's own audio/images
// live under `public/1.25 town/`, split into `audio/` (German filenames) and
// `images/` (English filenames, independent of the German word). Images are
// real Pexels photos (free to use, no attribution required) cropped to
// 640x640; sources per file are in CREDITS.md. Words that were already taught
// in an earlier lesson keep the same meanings (unless noted above), and their
// photos are copied into this lesson's folder; their audio is the existing
// clip, since WORD_AUDIO is keyed by the spoken text. Every screen also
// captions the picture in the learner's mother tongue — see VocabQuiz.tsx.
export const TOWN_LESSON_ID = "1.25";

export const TOWN_WORDS: VocabWord[] = [
  {
    id: "stadt",
    image: "/1.25 town/images/city.jpg",
    full: "die Stadt",
    english: "City",
    tamil: "நகரம்",
    sinhala: "නගරය",
  },
  {
    id: "dorf",
    image: "/1.25 town/images/village.jpg",
    full: "das Dorf",
    english: "Village",
    tamil: "கிராமம்",
    sinhala: "ගම",
  },
  {
    id: "strasse",
    image: "/1.25 town/images/street.jpg",
    full: "die Straße",
    english: "Street",
    tamil: "தெரு",
    sinhala: "වීදිය",
  },
  {
    id: "platz",
    image: "/1.25 town/images/square.jpg",
    full: "der Platz",
    english: "Square / place",
    tamil: "சதுக்கம்",
    sinhala: "චතුරශ්‍රය",
  },
  {
    id: "park",
    image: "/1.25 town/images/park.jpg",
    full: "der Park",
    english: "Park",
    tamil: "பூங்கா",
    sinhala: "උද්‍යානය",
  },
  {
    id: "bahnhof",
    image: "/1.25 town/images/train-station.jpg",
    full: "der Bahnhof",
    english: "Train station",
    tamil: "ரயில் நிலையம்",
    sinhala: "දුම්රිය ස්ථානය",
  },
  {
    id: "bushaltestelle",
    image: "/1.25 town/images/bus-stop.jpg",
    full: "die Bushaltestelle",
    english: "Bus stop",
    tamil: "பேருந்து நிறுத்தம்",
    sinhala: "බස් නැවතුම්පොළ",
  },
  {
    id: "flughafen",
    image: "/1.25 town/images/airport.jpg",
    full: "der Flughafen",
    english: "Airport",
    tamil: "விமான நிலையம்",
    sinhala: "ගුවන් තොටුපළ",
  },
  {
    id: "krankenhaus",
    image: "/1.25 town/images/hospital.jpg",
    full: "das Krankenhaus",
    english: "Hospital",
    tamil: "மருத்துவமனை",
    sinhala: "රෝහල",
  },
  {
    id: "apotheke",
    image: "/1.25 town/images/pharmacy.jpg",
    full: "die Apotheke",
    english: "Pharmacy",
    tamil: "மருந்தகம்",
    sinhala: "ෆාමසිය",
  },
  {
    id: "bank",
    image: "/1.25 town/images/bank.jpg",
    full: "die Bank",
    english: "Bank",
    tamil: "வங்கி",
    sinhala: "බැංකුව",
  },
  {
    id: "post",
    image: "/1.25 town/images/post-office.jpg",
    full: "die Post",
    english: "Post office / mail",
    tamil: "தபால் நிலையம்",
    sinhala: "තැපැල් කාර්යාලය",
  },
  {
    id: "polizei",
    image: "/1.25 town/images/police.jpg",
    full: "die Polizei",
    english: "Police",
    tamil: "காவல்துறை",
    sinhala: "පොලිසිය",
  },
  {
    id: "schule",
    image: "/1.25 town/images/school.jpg",
    full: "die Schule",
    english: "School",
    tamil: "பள்ளி",
    sinhala: "පාසල",
  },
  {
    id: "universitaet",
    image: "/1.25 town/images/university.jpg",
    full: "die Universität",
    english: "University",
    tamil: "பல்கலைக்கழகம்",
    sinhala: "විශ්වවිද්‍යාලය",
  },
  {
    id: "geschaeft",
    image: "/1.25 town/images/shop.jpg",
    full: "das Geschäft",
    english: "Shop / store",
    tamil: "கடை",
    sinhala: "සාප්පුව",
  },
  {
    id: "supermarkt",
    image: "/1.25 town/images/supermarket.jpg",
    full: "der Supermarkt",
    english: "Supermarket",
    tamil: "பல்பொருள் அங்காடி",
    sinhala: "සුපිරි වෙළඳසැල",
  },
  {
    id: "restaurant",
    image: "/1.25 town/images/restaurant.jpg",
    full: "das Restaurant",
    english: "Restaurant",
    tamil: "உணவகம்",
    sinhala: "අවන්හල",
  },
  {
    id: "cafe",
    image: "/1.25 town/images/cafe.jpg",
    full: "das Café",
    english: "Caf\\u00e9",
    tamil: "காபி கடை",
    sinhala: "කෝපි හල",
  },
  {
    id: "hotel",
    image: "/1.25 town/images/hotel.jpg",
    full: "das Hotel",
    english: "Hotel",
    tamil: "ஹோட்டல்",
    sinhala: "හෝටලය",
  },
  {
    id: "museum",
    image: "/1.25 town/images/museum.jpg",
    full: "das Museum",
    english: "Museum",
    tamil: "அருங்காட்சியகம்",
    sinhala: "කෞතුකාගාරය",
  },
  {
    id: "kino",
    image: "/1.25 town/images/cinema.jpg",
    full: "das Kino",
    english: "Cinema",
    tamil: "திரையரங்கு",
    sinhala: "සිනමා ශාලාව",
  },
  {
    id: "bibliothek",
    image: "/1.25 town/images/library.jpg",
    full: "die Bibliothek",
    english: "Library",
    tamil: "நூலகம்",
    sinhala: "පුස්තකාලය",
  },
  {
    id: "kirche",
    image: "/1.25 town/images/church.jpg",
    full: "die Kirche",
    english: "Church",
    tamil: "தேவாலயம்",
    sinhala: "පල්ලිය",
  },
  {
    id: "baeckerei",
    image: "/1.25 town/images/bakery.jpg",
    full: "die Bäckerei",
    english: "Bakery",
    tamil: "பேக்கரி",
    sinhala: "බේකරිය",
  },
  {
    id: "markt",
    image: "/1.25 town/images/market.jpg",
    full: "der Markt",
    english: "Market",
    tamil: "சந்தை",
    sinhala: "වෙළඳපොළ",
  },
  {
    id: "tankstelle",
    image: "/1.25 town/images/petrol-station.jpg",
    full: "die Tankstelle",
    english: "Petrol station",
    tamil: "எரிபொருள் நிலையம்",
    sinhala: "ඉන්ධන පිරවුම්හල",
  },
  {
    id: "toilette",
    image: "/1.25 town/images/toilet.jpg",
    full: "die Toilette",
    english: "Toilet",
    tamil: "கழிப்பறை",
    sinhala: "වැසිකිළිය",
  },
];
