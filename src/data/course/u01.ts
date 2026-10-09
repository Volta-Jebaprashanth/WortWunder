import type { CourseUnit } from "@/data/course/types";

// Unit 1, "Hallo!": greet, give a name, ask how someone is, spell a name and
// choose between du and Sie.
//
// Tamil and Sinhala here are drafts and still need a native reader's review
// (ROADMAP.md section 13). Translations of the greetings match the ones in
// src/data/greetings.ts so the course and the vocabulary lesson agree, with
// one exception: where German tells du from Sie, the translation does too
// (நீ / நீங்கள், ඔයා / ඔබ), because that difference is what the unit teaches.
//
// `accept` lists other German sentences that answer the same prompt just as
// well ("Mein Name ist Anna." for "Ich heiße Anna."), so a typed answer is
// not marked wrong for being a different right one.
export const UNIT_01: CourseUnit = {
  id: "u01",
  title: "Hallo!",
  icon: "👋",
  meaning: { english: "Hello!", tamil: "வணக்கம்!", sinhala: "ආයුබෝවන්!" },
  canDo: {
    english: [
      "Greet someone and say goodbye",
      "Say your name",
      "Ask how someone is and answer",
      "Spell your name",
      "Choose between du and Sie",
    ],
    tamil: [
      "ஒருவரை வரவேற்று விடைபெறலாம்",
      "உங்கள் பெயரைச் சொல்லலாம்",
      "ஒருவரிடம் நலம் விசாரித்துப் பதில் சொல்லலாம்",
      "உங்கள் பெயரை எழுத்துக்கூட்டிச் சொல்லலாம்",
      "du, Sie இவற்றில் சரியானதைத் தேர்ந்தெடுக்கலாம்",
    ],
    sinhala: [
      "කෙනෙකුට ආචාර කර සමුගන්න පුළුවන්",
      "ඔබේ නම කියන්න පුළුවන්",
      "කෙනෙකුගෙන් සැප දුක් අසා පිළිතුරු දෙන්න පුළුවන්",
      "ඔබේ නම අකුරෙන් අකුර කියන්න පුළුවන්",
      "du සහ Sie අතරින් නිවැරදි එක තෝරන්න පුළුවන්",
    ],
  },
  notes: [
    {
      id: "u01.g01",
      tag: "formal-informal",
      title: {
        english: "Friends or strangers?",
        tamil: "நண்பர்களா, அறிமுகமில்லாதவர்களா?",
        sinhala: "යාළුවන්ද, නාඳුනන අයද?",
      },
      body: {
        english:
          "With friends, family and children say Hallo and Tschüss.\n" +
          "With adults you don't know, or to be polite, say Guten Tag and Auf Wiedersehen.\n" +
          "Herr means Mr and Frau means Mrs. They go before the family name.",
        tamil:
          "நண்பர்கள், குடும்பத்தினர், குழந்தைகளிடம் Hallo, Tschüss என்று சொல்லுங்கள்.\n" +
          "அறிமுகமில்லாத பெரியவர்களிடம் அல்லது மரியாதையாகப் பேசும்போது Guten Tag, Auf Wiedersehen என்று சொல்லுங்கள்.\n" +
          "Herr என்றால் திரு, Frau என்றால் திருமதி. இவை குடும்பப் பெயருக்கு முன் வரும்.",
        sinhala:
          "යාළුවන්ට, පවුලේ අයට සහ ළමයින්ට Hallo සහ Tschüss කියන්න.\n" +
          "නාඳුනන වැඩිහිටියන්ට හෝ ගෞරවයෙන් කතා කරන විට Guten Tag සහ Auf Wiedersehen කියන්න.\n" +
          "Herr යනු මහතා, Frau යනු මහත්මිය. ඒවා වාසගමට පෙර යෙදේ.",
      },
      examples: ["u01.l01.s01", "u01.l01.s04", "u01.l01.s05"],
    },
    {
      id: "u01.g02",
      tag: "sein-heissen",
      title: {
        english: "Saying your name",
        tamil: "உங்கள் பெயரைச் சொல்லுதல்",
        sinhala: "ඔබේ නම කීම",
      },
      body: {
        english:
          "Ich heiße Anna and Ich bin Anna both tell someone your name.\n" +
          "To ask a friend or a child, say Wie heißt du?\n" +
          "The verb changes with the person: ich heiße, du heißt. ich bin, du bist.",
        tamil:
          "Ich heiße Anna, Ich bin Anna இரண்டுமே உங்கள் பெயரைச் சொல்லப் பயன்படும்.\n" +
          "நண்பரிடம் அல்லது குழந்தையிடம் கேட்க Wie heißt du? என்று சொல்லுங்கள்.\n" +
          "வினைச்சொல் நபருக்கு ஏற்ப மாறும்: ich heiße, du heißt. ich bin, du bist.",
        sinhala:
          "Ich heiße Anna සහ Ich bin Anna යන දෙකම ඔබේ නම කීමට යොදයි.\n" +
          "යාළුවෙකුගෙන් හෝ ළමයෙකුගෙන් අහන්න Wie heißt du? කියන්න.\n" +
          "ක්‍රියා පදය පුද්ගලයා අනුව වෙනස් වේ: ich heiße, du heißt. ich bin, du bist.",
      },
      examples: ["u01.l02.s01", "u01.l02.s02", "u01.l02.s03"],
    },
    {
      id: "u01.g03",
      tag: "wie-gehts",
      title: {
        english: "How are you?",
        tamil: "எப்படி இருக்கிறாய்?",
        sinhala: "කොහොමද?",
      },
      body: {
        english:
          "Wie geht's? is short for Wie geht es dir? It asks a friend how they are.\n" +
          "Answers: Sehr gut (very well), Gut (well), Nicht so gut (not so well).\n" +
          "To ask back, say Und dir? to a friend and Und Ihnen? to an adult you don't know.",
        tamil:
          "Wie geht's? என்பது Wie geht es dir? என்பதன் சுருக்கம். நண்பரிடம் நலம் விசாரிக்கப் பயன்படும்.\n" +
          "பதில்கள்: Sehr gut (மிகவும் நலம்), Gut (நலம்), Nicht so gut (அவ்வளவு நலமில்லை).\n" +
          "திருப்பிக் கேட்க நண்பரிடம் Und dir? என்றும், அறிமுகமில்லாத பெரியவரிடம் Und Ihnen? என்றும் சொல்லுங்கள்.",
        sinhala:
          "Wie geht's? යනු Wie geht es dir? යන්නෙහි කෙටි රූපයයි. යාළුවෙකුගෙන් සැප දුක් අහන්න යොදයි.\n" +
          "පිළිතුරු: Sehr gut (ඉතා හොඳින්), Gut (හොඳින්), Nicht so gut (එතරම් හොඳින් නෙවෙයි).\n" +
          "ආපසු අහන්න යාළුවෙකුට Und dir? කියාත්, නාඳුනන වැඩිහිටියෙකුට Und Ihnen? කියාත් කියන්න.",
      },
      examples: ["u01.l03.s01", "u01.l03.s05", "u01.l03.s06"],
    },
    {
      id: "u01.g04",
      tag: "alphabet",
      title: {
        english: "The German alphabet",
        tamil: "ஜெர்மன் அகரவரிசை",
        sinhala: "ජර්මානු හෝඩිය",
      },
      body: {
        english:
          "German uses the same 26 letters as English, plus ä, ö, ü and ß.\n" +
          'Most letter names end in an "eh" or "ah" sound: A is ah, B is beh, K is kah.\n' +
          "Watch these: J is yot, V is fow, W is veh, Y is üpsilon, Z is tset.\n" +
          "To make a letter clear, add a name: A wie Anna means A as in Anna.",
        tamil:
          "ஜெர்மன் மொழியில் ஆங்கிலத்தின் அதே 26 எழுத்துக்களும், கூடுதலாக ä, ö, ü, ß ஆகியவையும் உள்ளன.\n" +
          'பெரும்பாலான எழுத்துப் பெயர்கள் "ஏ" அல்லது "ஆ" ஒலியில் முடியும்: A ஆ, B பே, K கா.\n' +
          "இவற்றைக் கவனியுங்கள்: J யொட், V ஃபவ், W வே, Y இப்சிலொன், Z ட்செட்.\n" +
          "எழுத்தைத் தெளிவாகச் சொல்ல ஒரு பெயரைச் சேர்க்கலாம்: A wie Anna என்றால் அன்னாவில் வரும் A.",
        sinhala:
          "ජර්මානු භාෂාවේ ඉංග්‍රීසි අකුරු 26 ම සහ ඊට අමතරව ä, ö, ü සහ ß ඇත.\n" +
          'බොහෝ අකුරු නම් "ඒ" හෝ "ආ" ශබ්දයෙන් අවසන් වේ: A ආ, B බේ, K කා.\n' +
          "මේවා ගැන සැලකිලිමත් වන්න: J යොට්, V ෆව්, W වේ, Y ඉප්සිලොන්, Z ට්සෙට්.\n" +
          "අකුරක් පැහැදිලි කිරීමට නමක් එකතු කරන්න: A wie Anna යනු ඇනා හි A යන්නයි.",
      },
      examples: ["u01.l04.s02", "u01.l04.s04", "u01.l04.s06"],
    },
    {
      id: "u01.g05",
      tag: "spelling",
      title: {
        english: "Spelling your name",
        tamil: "பெயரை எழுத்துக்கூட்டிச் சொல்லுதல்",
        sinhala: "නම අකුරෙන් අකුර කීම",
      },
      body: {
        english:
          "People often ask you to spell your name: Wie schreibt man das? or Buchstabieren Sie, bitte.\n" +
          "Answer letter by letter: W, E, B, E, R.\n" +
          "If you did not understand, say Wie bitte? or Noch einmal, bitte.",
        tamil:
          "உங்கள் பெயரை எழுத்துக்கூட்டிச் சொல்லும்படி அடிக்கடி கேட்பார்கள்: Wie schreibt man das? அல்லது Buchstabieren Sie, bitte.\n" +
          "ஒவ்வொரு எழுத்தாகப் பதில் சொல்லுங்கள்: W, E, B, E, R.\n" +
          "புரியவில்லை என்றால் Wie bitte? அல்லது Noch einmal, bitte என்று சொல்லுங்கள்.",
        sinhala:
          "ඔබේ නම අකුරෙන් අකුර කියන්නැයි බොහෝ විට අසනු ඇත: Wie schreibt man das? හෝ Buchstabieren Sie, bitte.\n" +
          "අකුරෙන් අකුර පිළිතුරු දෙන්න: W, E, B, E, R.\n" +
          "තේරුණේ නැත්නම් Wie bitte? හෝ Noch einmal, bitte කියන්න.",
      },
      examples: ["u01.l05.s03", "u01.l05.s04", "u01.l05.s05", "u01.l05.s07"],
    },
    {
      id: "u01.g06",
      tag: "du-sie",
      title: {
        english: "du or Sie?",
        tamil: "du அல்லது Sie?",
        sinhala: "du ද Sie ද?",
      },
      body: {
        english:
          "German has two words for you.\n" +
          "du is for friends, family and children: Wie heißt du? Bist du Tom?\n" +
          "Sie is for adults you don't know. It always has a capital S: Wie heißen Sie? Sind Sie Herr Weber?\n" +
          "The verb changes too: du heißt, Sie heißen. du bist, Sie sind.",
        tamil:
          "ஜெர்மன் மொழியில் நீ, நீங்கள் என்பதற்கு இரண்டு சொற்கள் உள்ளன.\n" +
          "du (நீ) நண்பர்கள், குடும்பத்தினர், குழந்தைகளுக்கு: Wie heißt du? Bist du Tom?\n" +
          "Sie (நீங்கள்) அறிமுகமில்லாத பெரியவர்களுக்கு. இது எப்போதும் பெரிய S எழுத்தில் தொடங்கும்: Wie heißen Sie? Sind Sie Herr Weber?\n" +
          "வினைச்சொல்லும் மாறும்: du heißt, Sie heißen. du bist, Sie sind.",
        sinhala:
          "ජර්මානු භාෂාවේ ඔයා, ඔබ යන්නට වචන දෙකක් ඇත.\n" +
          "du (ඔයා) යාළුවන්ට, පවුලේ අයට සහ ළමයින්ට: Wie heißt du? Bist du Tom?\n" +
          "Sie (ඔබ) නාඳුනන වැඩිහිටියන්ට. එය සැමවිටම ලොකු S අකුරෙන් පටන් ගනී: Wie heißen Sie? Sind Sie Herr Weber?\n" +
          "ක්‍රියා පදයත් වෙනස් වේ: du heißt, Sie heißen. du bist, Sie sind.",
      },
      examples: ["u01.l06.s01", "u01.l06.s02", "u01.l06.s04"],
    },
  ],
  guidebook: ["u01.g01", "u01.g02", "u01.g03", "u01.g04", "u01.g05", "u01.g06"],
  dialogues: [],
  lessons: [
    {
      id: "u01.l01",
      title: "Hallo und Tschüss",
      meaning: {
        english: "Hello and goodbye",
        tamil: "வணக்கமும் விடைபெறுதலும்",
        sinhala: "ආයුබෝවන් සහ සමුගැනීම",
      },
      newWords: ["1.1/hallo", "1.1/tschuess", "1.1/guten-tag", "1.1/auf-wiedersehen"],
      sentences: [
        {
          id: "u01.l01.s01",
          german: "Hallo, Anna!",
          english: "Hello, Anna!",
          tamil: "வணக்கம், அன்னா!",
          sinhala: "ආයුබෝවන්, ඇනා!",
          voice: "f",
          words: ["1.1/hallo"],
        },
        {
          id: "u01.l01.s02",
          german: "Tschüss, Tom!",
          english: "Bye, Tom!",
          tamil: "பை பை, டாம்!",
          sinhala: "බායි, ටොම්!",
          voice: "m",
          words: ["1.1/tschuess"],
        },
        {
          id: "u01.l01.s03",
          german: "Hallo, Anna und Tom!",
          english: "Hello, Anna and Tom!",
          tamil: "வணக்கம், அன்னா மற்றும் டாம்!",
          sinhala: "ආයුබෝවන්, ඇනා සහ ටොම්!",
          voice: "f",
          words: ["1.1/hallo"],
        },
        {
          id: "u01.l01.s04",
          german: "Guten Tag, Herr Weber.",
          english: "Good day, Mr Weber.",
          tamil: "நல்ல பகல் வணக்கம், திரு வேபர்.",
          sinhala: "සුභ දවසක්, වෙබර් මහතා.",
          voice: "m",
          grammar: ["formal-informal"],
          words: ["1.1/guten-tag"],
        },
        {
          id: "u01.l01.s05",
          german: "Auf Wiedersehen, Frau Klein.",
          english: "Goodbye, Mrs Klein.",
          tamil: "மீண்டும் சந்திப்போம், திருமதி க்ளைன்.",
          sinhala: "නැවත හමුවෙමු, ක්ලයින් මහත්මිය.",
          voice: "f",
          grammar: ["formal-informal"],
          words: ["1.1/auf-wiedersehen"],
        },
        {
          id: "u01.l01.s06",
          german: "Guten Tag, Frau Klein.",
          english: "Good day, Mrs Klein.",
          tamil: "நல்ல பகல் வணக்கம், திருமதி க்ளைன்.",
          sinhala: "සුභ දවසක්, ක්ලයින් මහත්මිය.",
          voice: "m",
          grammar: ["formal-informal"],
          words: ["1.1/guten-tag"],
        },
      ],
      steps: [
        { kind: "word", ref: "1.1/hallo" },
        { kind: "word", ref: "1.1/tschuess" },
        { kind: "sentence", id: "u01.l01.s01" },
        { kind: "sentence", id: "u01.l01.s02" },
        { kind: "sentence", id: "u01.l01.s03" },
        { kind: "tip", noteId: "u01.g01" },
        { kind: "word", ref: "1.1/guten-tag" },
        { kind: "word", ref: "1.1/auf-wiedersehen" },
        { kind: "sentence", id: "u01.l01.s04" },
        { kind: "sentence", id: "u01.l01.s05" },
        { kind: "sentence", id: "u01.l01.s06" },
      ],
    },
    {
      id: "u01.l02",
      title: "Ich heiße …",
      meaning: {
        english: "My name is …",
        tamil: "என் பெயர் …",
        sinhala: "මගේ නම …",
      },
      newWords: ["1.1/guten-morgen"],
      sentences: [
        {
          id: "u01.l02.s01",
          german: "Ich heiße Anna.",
          english: "My name is Anna.",
          tamil: "என் பெயர் அன்னா.",
          sinhala: "මගේ නම ඇනා.",
          accept: ["Mein Name ist Anna."],
          gap: { token: 1, options: ["heißt", "bist"] },
          voice: "f",
          grammar: ["sein-heissen"],
        },
        {
          id: "u01.l02.s02",
          german: "Ich bin Tom.",
          english: "I am Tom.",
          tamil: "நான் டாம்.",
          sinhala: "මම ටොම්.",
          gap: { token: 1, options: ["bist", "heißt"] },
          voice: "m",
          grammar: ["sein-heissen"],
        },
        {
          id: "u01.l02.s03",
          german: "Wie heißt du?",
          english: "What is your name?",
          tamil: "உன் பெயர் என்ன?",
          sinhala: "ඔයාගේ නම මොකක්ද?",
          accept: ["Wie ist dein Name?"],
          gap: { token: 1, options: ["heiße", "bin"] },
          voice: "f",
          grammar: ["sein-heissen"],
        },
        {
          id: "u01.l02.s04",
          german: "Wer bist du?",
          english: "Who are you?",
          tamil: "நீ யார்?",
          sinhala: "ඔයා කවුද?",
          voice: "m",
          grammar: ["sein-heissen"],
        },
        {
          id: "u01.l02.s05",
          german: "Ich heiße Tom. Und du?",
          english: "My name is Tom. And you?",
          tamil: "என் பெயர் டாம். உன் பெயர்?",
          sinhala: "මගේ නම ටොම්. ඔයාගේ?",
          accept: ["Mein Name ist Tom. Und du?"],
          voice: "m",
          grammar: ["sein-heissen"],
        },
        {
          id: "u01.l02.s06",
          german: "Guten Morgen! Ich bin Anna.",
          english: "Good morning! I am Anna.",
          tamil: "காலை வணக்கம்! நான் அன்னா.",
          sinhala: "සුභ උදෑසනක්! මම ඇනා.",
          voice: "f",
          grammar: ["sein-heissen"],
          words: ["1.1/guten-morgen"],
        },
      ],
      steps: [
        { kind: "tip", noteId: "u01.g02" },
        { kind: "sentence", id: "u01.l02.s01" },
        { kind: "sentence", id: "u01.l02.s02" },
        { kind: "sentence", id: "u01.l02.s03" },
        { kind: "sentence", id: "u01.l02.s04" },
        { kind: "sentence", id: "u01.l02.s05" },
        { kind: "word", ref: "1.1/guten-morgen" },
        { kind: "sentence", id: "u01.l02.s06" },
      ],
    },
    {
      id: "u01.l03",
      title: "Wie geht's?",
      meaning: {
        english: "How are you?",
        tamil: "எப்படி இருக்கிறாய்?",
        sinhala: "කොහොමද?",
      },
      newWords: ["1.1/wie-gehts", "1.1/danke"],
      sentences: [
        {
          id: "u01.l03.s01",
          german: "Wie geht's?",
          english: "How are you?",
          tamil: "எப்படி இருக்கிறாய்?",
          sinhala: "කොහොමද?",
          accept: ["Wie geht es dir?"],
          voice: "f",
          grammar: ["wie-gehts"],
          words: ["1.1/wie-gehts"],
        },
        {
          id: "u01.l03.s02",
          german: "Danke, gut.",
          english: "Thanks, fine.",
          tamil: "நன்றி, நலம்.",
          sinhala: "ස්තූතියි, හොඳින්.",
          accept: ["Gut, danke."],
          voice: "m",
          grammar: ["wie-gehts"],
          words: ["1.1/danke"],
        },
        {
          id: "u01.l03.s03",
          german: "Sehr gut, danke!",
          english: "Very well, thanks!",
          tamil: "மிகவும் நலம், நன்றி!",
          sinhala: "ඉතා හොඳින්, ස්තූතියි!",
          accept: ["Danke, sehr gut!"],
          voice: "f",
          grammar: ["wie-gehts"],
          words: ["1.1/danke"],
        },
        {
          id: "u01.l03.s04",
          german: "Nicht so gut.",
          english: "Not so well.",
          tamil: "அவ்வளவு நலமில்லை.",
          sinhala: "එතරම් හොඳින් නෙවෙයි.",
          voice: "m",
          grammar: ["wie-gehts"],
        },
        {
          id: "u01.l03.s05",
          german: "Gut, danke. Und dir?",
          english: "Fine, thanks. And you?",
          tamil: "நலம், நன்றி. நீ?",
          sinhala: "හොඳින්, ස්තූතියි. ඔයාට?",
          accept: ["Danke, gut. Und dir?"],
          voice: "f",
          grammar: ["wie-gehts"],
          words: ["1.1/danke"],
        },
        {
          id: "u01.l03.s06",
          german: "Wie geht es Ihnen, Frau Klein?",
          english: "How are you, Mrs Klein?",
          tamil: "எப்படி இருக்கிறீர்கள், திருமதி க்ளைன்?",
          sinhala: "ඔබට කොහොමද, ක්ලයින් මහත්මිය?",
          gap: { token: 3, options: ["Sie", "du"] },
          voice: "m",
          grammar: ["wie-gehts", "formal-informal"],
        },
        {
          id: "u01.l03.s07",
          german: "Es geht mir gut.",
          english: "I am fine.",
          tamil: "நான் நலமாக இருக்கிறேன்.",
          sinhala: "මම හොඳින් ඉන්නවා.",
          accept: ["Mir geht es gut.", "Mir geht's gut."],
          gap: { token: 2, options: ["ich", "du"] },
          voice: "f",
          grammar: ["wie-gehts"],
        },
      ],
      steps: [
        { kind: "word", ref: "1.1/wie-gehts" },
        { kind: "word", ref: "1.1/danke" },
        { kind: "sentence", id: "u01.l03.s01" },
        { kind: "sentence", id: "u01.l03.s02" },
        { kind: "sentence", id: "u01.l03.s03" },
        { kind: "sentence", id: "u01.l03.s04" },
        { kind: "tip", noteId: "u01.g03" },
        { kind: "sentence", id: "u01.l03.s05" },
        { kind: "sentence", id: "u01.l03.s06" },
        { kind: "sentence", id: "u01.l03.s07" },
      ],
    },
    {
      id: "u01.l04",
      title: "Das Alphabet",
      meaning: {
        english: "The alphabet",
        tamil: "அகரவரிசை",
        sinhala: "හෝඩිය",
      },
      newWords: [],
      // `say` gives the voice the letter's German name, tuned the same way
      // as the letter clips in scripts/generate-audio.mjs.
      sentences: [
        {
          id: "u01.l04.s01",
          german: "Das ist das Alphabet.",
          english: "This is the alphabet.",
          tamil: "இது அகரவரிசை.",
          sinhala: "මේ හෝඩියයි.",
          voice: "f",
          grammar: ["alphabet"],
        },
        {
          id: "u01.l04.s02",
          german: "A wie Anna.",
          english: "A as in Anna.",
          tamil: "A, அன்னா போல.",
          sinhala: "A, ඇනා වගේ.",
          voice: "f",
          say: "Ah wie Anna.",
          grammar: ["alphabet"],
        },
        {
          id: "u01.l04.s03",
          german: "T wie Tom.",
          english: "T as in Tom.",
          tamil: "T, டாம் போல.",
          sinhala: "T, ටොම් වගේ.",
          voice: "m",
          say: "Teh wie Tom.",
          grammar: ["alphabet"],
        },
        {
          id: "u01.l04.s04",
          german: "W wie Weber.",
          english: "W as in Weber.",
          tamil: "W, வேபர் போல.",
          sinhala: "W, වෙබර් වගේ.",
          voice: "f",
          say: "Weh wie Weber.",
          grammar: ["alphabet"],
        },
        {
          id: "u01.l04.s05",
          german: "K wie Klein.",
          english: "K as in Klein.",
          tamil: "K, க்ளைன் போல.",
          sinhala: "K, ක්ලයින් වගේ.",
          voice: "m",
          say: "Kah wie Klein.",
          grammar: ["alphabet"],
        },
        {
          id: "u01.l04.s06",
          german: "Wie schreibt man das?",
          english: "How do you write that?",
          tamil: "அதை எப்படி எழுதுவது?",
          sinhala: "ඒක ලියන්නේ කොහොමද?",
          gap: { token: 1, options: ["schreiben", "schreibe"] },
          voice: "m",
          grammar: ["alphabet", "spelling"],
        },
      ],
      steps: [
        { kind: "tip", noteId: "u01.g04" },
        { kind: "sentence", id: "u01.l04.s01" },
        { kind: "sentence", id: "u01.l04.s02" },
        { kind: "sentence", id: "u01.l04.s03" },
        { kind: "sentence", id: "u01.l04.s04" },
        { kind: "sentence", id: "u01.l04.s05" },
        { kind: "sentence", id: "u01.l04.s06" },
      ],
    },
    {
      id: "u01.l05",
      title: "Buchstabieren",
      meaning: {
        english: "Spelling",
        tamil: "எழுத்துக்கூட்டுதல்",
        sinhala: "අකුරෙන් අකුර කීම",
      },
      newWords: ["1.1/bitte", "1.1/entschuldigung"],
      sentences: [
        {
          id: "u01.l05.s01",
          german: "Wie ist Ihr Name, bitte?",
          english: "What is your name, please?",
          tamil: "தயவுசெய்து, உங்கள் பெயர் என்ன?",
          sinhala: "කරුණාකර, ඔබේ නම මොකක්ද?",
          accept: ["Wie heißen Sie, bitte?"],
          voice: "m",
          grammar: ["formal-informal"],
          words: ["1.1/bitte"],
        },
        {
          id: "u01.l05.s02",
          german: "Mein Name ist Weber.",
          english: "My name is Weber.",
          tamil: "என் பெயர் வேபர்.",
          sinhala: "මගේ නම වෙබර්.",
          accept: ["Ich heiße Weber."],
          gap: { token: 0, options: ["Ich", "Wie"] },
          voice: "f",
          grammar: ["sein-heissen"],
        },
        {
          id: "u01.l05.s03",
          german: "Wie schreibt man Weber?",
          english: "How do you write Weber?",
          tamil: "வேபர் என்பதை எப்படி எழுதுவது?",
          sinhala: "වෙබර් ලියන්නේ කොහොමද?",
          voice: "m",
          grammar: ["spelling"],
        },
        {
          id: "u01.l05.s04",
          german: "W, E, B, E, R.",
          english: "W, E, B, E, R.",
          tamil: "W, E, B, E, R.",
          sinhala: "W, E, B, E, R.",
          accept: ["Weber"],
          voice: "f",
          say: "Weh, Ee, Beh, Ee, Er.",
          grammar: ["spelling"],
        },
        {
          id: "u01.l05.s05",
          german: "Buchstabieren Sie, bitte.",
          english: "Please spell it.",
          tamil: "தயவுசெய்து எழுத்துக்கூட்டிச் சொல்லுங்கள்.",
          sinhala: "කරුණාකර අකුරෙන් අකුර කියන්න.",
          gap: { token: 1, options: ["du", "ich"] },
          voice: "m",
          grammar: ["spelling", "formal-informal"],
          words: ["1.1/bitte"],
        },
        {
          id: "u01.l05.s06",
          german: "Entschuldigung, wie bitte?",
          english: "Excuse me, pardon?",
          tamil: "மன்னிக்கவும், என்ன சொன்னீர்கள்?",
          sinhala: "සමාවෙන්න, මොකක්ද කිව්වේ?",
          voice: "f",
          grammar: ["spelling"],
          words: ["1.1/entschuldigung", "1.1/bitte"],
        },
        {
          id: "u01.l05.s07",
          german: "Noch einmal, bitte.",
          english: "Once more, please.",
          tamil: "தயவுசெய்து இன்னொரு முறை.",
          sinhala: "කරුණාකර තව එක පාරක්.",
          voice: "m",
          grammar: ["spelling"],
          words: ["1.1/bitte"],
        },
      ],
      steps: [
        { kind: "word", ref: "1.1/bitte" },
        { kind: "sentence", id: "u01.l05.s01" },
        { kind: "sentence", id: "u01.l05.s02" },
        { kind: "tip", noteId: "u01.g05" },
        { kind: "sentence", id: "u01.l05.s03" },
        { kind: "sentence", id: "u01.l05.s04" },
        { kind: "sentence", id: "u01.l05.s05" },
        { kind: "word", ref: "1.1/entschuldigung" },
        { kind: "sentence", id: "u01.l05.s06" },
        { kind: "sentence", id: "u01.l05.s07" },
      ],
    },
    {
      id: "u01.l06",
      title: "du oder Sie?",
      meaning: {
        english: "Informal or formal you?",
        tamil: "நீ அல்லது நீங்கள்?",
        sinhala: "ඔයා ද ඔබ ද?",
      },
      newWords: ["1.1/guten-abend"],
      sentences: [
        {
          id: "u01.l06.s01",
          german: "Guten Tag! Wie heißen Sie?",
          english: "Good day! What is your name?",
          tamil: "நல்ல பகல் வணக்கம்! உங்கள் பெயர் என்ன?",
          sinhala: "සුභ දවසක්! ඔබේ නම මොකක්ද?",
          accept: ["Guten Tag! Wie ist Ihr Name?"],
          gap: { token: 3, options: ["heißt", "heiße"] },
          voice: "f",
          grammar: ["du-sie"],
          words: ["1.1/guten-tag"],
        },
        {
          id: "u01.l06.s02",
          german: "Sind Sie Herr Weber?",
          english: "Are you Mr Weber?",
          tamil: "நீங்கள் திரு வேபரா?",
          sinhala: "ඔබ වෙබර් මහතාද?",
          gap: { token: 1, options: ["du", "ich"] },
          voice: "f",
          grammar: ["du-sie"],
        },
        {
          id: "u01.l06.s03",
          german: "Nein, ich bin Herr Klein.",
          english: "No, I am Mr Klein.",
          tamil: "இல்லை, நான் திரு க்ளைன்.",
          sinhala: "නැහැ, මම ක්ලයින් මහතා.",
          voice: "m",
          grammar: ["du-sie"],
        },
        {
          id: "u01.l06.s04",
          german: "Bist du Anna?",
          english: "Are you Anna?",
          tamil: "நீ அன்னாவா?",
          sinhala: "ඔයා ඇනාද?",
          gap: { token: 0, options: ["Sind", "Bin"] },
          voice: "m",
          grammar: ["du-sie"],
        },
        {
          id: "u01.l06.s05",
          german: "Ja, ich bin Anna.",
          english: "Yes, I am Anna.",
          tamil: "ஆம், நான் அன்னா.",
          sinhala: "ඔව්, මම ඇනා.",
          voice: "f",
          grammar: ["du-sie"],
        },
        {
          id: "u01.l06.s06",
          german: "Wie geht es dir, Tom?",
          english: "How are you, Tom?",
          tamil: "எப்படி இருக்கிறாய், டாம்?",
          sinhala: "ඔයාට කොහොමද, ටොම්?",
          accept: ["Wie geht's, Tom?"],
          voice: "f",
          grammar: ["du-sie", "wie-gehts"],
        },
        {
          id: "u01.l06.s07",
          german: "Guten Abend, Frau Klein. Wie geht es Ihnen?",
          english: "Good evening, Mrs Klein. How are you?",
          tamil: "மாலை வணக்கம், திருமதி க்ளைன். எப்படி இருக்கிறீர்கள்?",
          sinhala: "සුභ සන්ධ්‍යාවක්, ක්ලයින් මහත්මිය. ඔබට කොහොමද?",
          voice: "m",
          grammar: ["du-sie", "wie-gehts"],
          words: ["1.1/guten-abend"],
        },
      ],
      steps: [
        { kind: "tip", noteId: "u01.g06" },
        { kind: "sentence", id: "u01.l06.s01" },
        { kind: "sentence", id: "u01.l06.s02" },
        { kind: "sentence", id: "u01.l06.s03" },
        { kind: "sentence", id: "u01.l06.s04" },
        { kind: "sentence", id: "u01.l06.s05" },
        { kind: "sentence", id: "u01.l06.s06" },
        { kind: "word", ref: "1.1/guten-abend" },
        { kind: "sentence", id: "u01.l06.s07" },
      ],
    },
  ],
  checkpoint: [
    "u01.l01.s03",
    "u01.l01.s04",
    "u01.l01.s05",
    "u01.l02.s01",
    "u01.l02.s03",
    "u01.l02.s04",
    "u01.l02.s05",
    "u01.l03.s03",
    "u01.l03.s05",
    "u01.l03.s06",
    "u01.l03.s07",
    "u01.l04.s02",
    "u01.l04.s06",
    "u01.l05.s02",
    "u01.l05.s03",
    "u01.l05.s05",
    "u01.l05.s07",
    "u01.l06.s01",
    "u01.l06.s02",
    "u01.l06.s04",
    "u01.l06.s06",
  ],
};
