import type { VocabWord } from "@/data/vocabulary";
import type { VocabTest } from "@/data/lessons";
import { GREETINGS_WORDS } from "@/data/greetings";
import { SMALL_WORDS_WORDS } from "@/data/small-words";
import { GRAMMAR_WORDS } from "@/data/grammar-words";
import { PERSONAL_WORDS } from "@/data/personal";
import { VERBS_WORDS } from "@/data/verbs";
import { l } from "@/data/g1/common";

// G1.1 Erste Wörter: a plain vocabulary test (VocabQuiz, every question
// type) over the first 14 words. The words are the same entries as in their
// Wortschatz lessons (same picture and audio); a few get a one-line memory
// hook on their intro card. er and sie (she) are in here so G1.5 can show a
// Pronomen standing in for a noun (decision D1 in the G1 plan).
function word(list: VocabWord[], id: string, hook?: VocabWord["hook"]): VocabWord {
  const found = list.find((w) => w.id === id);
  if (!found) throw new Error(`G1.1: no word "${id}"`);
  return hook ? { ...found, hook } : found;
}

const ARTICLE_HOOK = l(
  "Say der / die / das with the noun, like part of its name.",
  "der / die / das-ஐப் பெயர்ச்சொல்லுடன் அதன் பெயரின் ஒரு பகுதி போலச் சொல்.",
  "der / die / das නාමපදය සමඟ, එහි නමේම කොටසක් වගේ කියන්න.",
);

export const G1_1_WORDS: VocabWord[] = [
  word(GREETINGS_WORDS, "hallo"),
  word(
    GREETINGS_WORDS,
    "tschuess",
    l(
      'Tschüss sounds like "choose": I choose to go home. Tschüss!',
      'Tschüss என்பது "choose" போல ஒலிக்கும்: நான் வீட்டுக்குப் போகத் தேர்கிறேன். Tschüss!',
      'Tschüss ඇසෙන්නේ "choose" වගේ: මම ගෙදර යන්න තෝරනවා. Tschüss!',
    ),
  ),
  word(GREETINGS_WORDS, "danke"),
  word(
    GREETINGS_WORDS,
    "bitte",
    l(
      'Bitte: "a bit of help, please".',
      'Bitte: "a bit" — கொஞ்சம் உதவி, தயவுசெய்து.',
      'Bitte: "a bit" — පොඩි උදව්වක්, කරුණාකර.',
    ),
  ),
  word(
    SMALL_WORDS_WORDS,
    "ja",
    l(
      'ja sounds like "yah" — a happy nod.',
      'ja என்பது "யா" போல ஒலிக்கும் — மகிழ்ச்சியான தலையசைப்பு.',
      'ja ඇසෙන්නේ "යා" වගේ — සතුටින් හිස සැලීමක්.',
    ),
  ),
  word(
    SMALL_WORDS_WORDS,
    "nein",
    l(
      'nein sounds like "nine": nein times no!',
      'nein என்பது ஆங்கில "nine" போல ஒலிக்கும்: ஒன்பது முறை இல்லை!',
      'nein ඇසෙන්නේ ඉංග්‍රීසි "nine" වගේ: නවවතාවක් නැහැ!',
    ),
  ),
  word(GRAMMAR_WORDS, "ich"),
  word(GRAMMAR_WORDS, "du"),
  word(GRAMMAR_WORDS, "er"),
  word(GRAMMAR_WORDS, "sie-she"),
  word(PERSONAL_WORDS, "mann", ARTICLE_HOOK),
  word(PERSONAL_WORDS, "frau", ARTICLE_HOOK),
  word(PERSONAL_WORDS, "kind", ARTICLE_HOOK),
  word(VERBS_WORDS, "lernen"),
];

export const G1_1_TEST: VocabTest = {
  testId: "g1.1",
  part: 1,
  words: G1_1_WORDS,
};
