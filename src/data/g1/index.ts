import type { GrammarTest, L } from "@/lib/grammar-engine";
import type { GrammarBadge } from "@/components/quiz/GrammarQuiz";
import { G1_1_TEST } from "@/data/g1/g1-1";
import { G1_2_TEST } from "@/data/g1/g1-2";
import { G1_3_TEST } from "@/data/g1/g1-3";
import { G1_4_TEST } from "@/data/g1/g1-4";
import { G1_5_TEST } from "@/data/g1/g1-5";
import { G1_6_TEST } from "@/data/g1/g1-6";
import { l } from "@/data/g1/common";

// G1 Los geht's (docs/grammar-planning/G1/plan.md): six tests that open in
// order. G1.1 is a vocabulary test (VocabQuiz); G1.2–G1.6 are grammar tests
// (GrammarQuiz). Each test id is also its progress key.
export { G1_1_TEST };

export const G1_GRAMMAR_TESTS: GrammarTest[] = [
  G1_2_TEST,
  G1_3_TEST,
  G1_4_TEST,
  G1_5_TEST,
  G1_6_TEST,
];

export interface G1PathTest {
  testId: string;
  // "G1.1", shown before the title.
  label: string;
  title: string;
  meaning: L;
  icon: string;
  grammar: boolean;
}

export const G1_SECTION = {
  id: "g1",
  title: "G1 Los geht's",
  meaning: l("Getting started", "தொடங்குவோம்", "පටන් ගනිමු"),
  icon: "🚀",
};

export const G1_PATH: G1PathTest[] = [
  {
    testId: G1_1_TEST.testId,
    label: "G1.1",
    title: "Erste Wörter",
    meaning: l("First words", "முதல் சொற்கள்", "පළමු වචන"),
    icon: "👋",
    grammar: false,
  },
  ...G1_GRAMMAR_TESTS.map((test, i) => ({
    testId: test.id,
    label: `G1.${i + 2}`,
    title: test.title,
    meaning: test.meaning,
    icon: test.icon,
    grammar: true,
  })),
];

export function findG1GrammarTest(testId: string): GrammarTest | undefined {
  return G1_GRAMMAR_TESTS.find((test) => test.id === testId);
}

// The G1 badge, shown after G1.6 (A12 in screens.md).
export const G1_BADGE: GrammarBadge = {
  title: "🏅 Los geht's!",
  line: l(
    "You finished G1: Getting started.",
    "நீ G1: தொடங்குவோம் முடித்துவிட்டாய்.",
    "ඔබ G1: පටන් ගනිමු අවසන් කළා.",
  ),
  can: [
    l("say 14 first words", "14 முதல் சொற்களைச் சொல்ல", "පළමු වචන 14ක් කියන්න"),
    l("spell your name", "உன் பெயரை எழுத்துக்கூட்ட", "ඔබේ නම අකුරු කියන්න"),
    l(
      "read ä ö ü ß and the letter teams",
      "ä ö ü ß மற்றும் எழுத்துக் குழுக்களைப் படிக்க",
      "ä ö ü ß සහ අකුරු කණ්ඩායම් කියවන්න",
    ),
    l(
      "spot Nomen, Verb, Pronomen",
      "Nomen, Verb, Pronomen-ஐக் கண்டுபிடிக்க",
      "Nomen, Verb, Pronomen හඳුනාගන්න",
    ),
    l(
      "greet, thank and say bye",
      "வாழ்த்த, நன்றி சொல்ல, விடைபெற",
      "ආචාර කරන්න, ස්තූති කරන්න, සමුගන්න",
    ),
  ],
  merkes: [
    {
      line: l(
        "Say der / die / das with the noun, like part of its name.",
        "der / die / das-ஐப் பெயர்ச்சொல்லுடன் அதன் பெயரின் ஒரு பகுதி போலச் சொல்.",
        "der / die / das නාමපදය සමඟ, එහි නමේම කොටසක් වගේ කියන්න.",
      ),
      examples: [
        { text: "der Mann", sound: { word: "der Mann" } },
        { text: "die Frau", sound: { word: "die Frau" } },
        { text: "das Kind", sound: { word: "das Kind" } },
      ],
    },
    ...G1_GRAMMAR_TESTS.map((test) => test.merke),
  ],
};
