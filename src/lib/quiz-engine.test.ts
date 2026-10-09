import { describe, expect, it } from "vitest";
import type { VocabWord } from "@/data/vocabulary";
import { MAX_TEST_WORDS, MIN_TEST_WORDS, splitIntoTests, VOCAB_LESSONS } from "@/data/lessons";
import {
  ALL_TEST_TYPES,
  answerLetters,
  buildRoundFromRows,
  itemMedia,
  letterTilesFor,
  missingLetterQuestion,
  spellingOf,
  TEST_TIERS,
  TIER_ORDER,
  tierOfType,
  wordSegments,
  type RowRef,
  type TestType,
} from "@/lib/quiz-engine";

function word(id: string, full = id): VocabWord {
  return {
    id,
    full,
    image: `/img/${id}.jpg`,
    english: `${id}-en`,
    tamil: `${id}-ta`,
    sinhala: `${id}-si`,
  };
}

const WORDS = ["a", "b", "c", "d", "e", "f"].map((id) => word(id, `wort${id}`));

describe("tiers", () => {
  it("puts every test type in exactly one tier", () => {
    const grouped = TIER_ORDER.flatMap((tier) => TEST_TIERS[tier]);
    expect(grouped).toEqual(ALL_TEST_TYPES);
    expect(new Set(grouped).size).toBe(grouped.length);
  });

  it("maps a type back to its tier", () => {
    expect(tierOfType("training")).toBe("training");
    expect(tierOfType("wordPicture")).toBe("basic");
    expect(tierOfType("listen")).toBe("easy");
    expect(tierOfType("translate")).toBe("medium");
    expect(tierOfType("match")).toBe("hard");
  });
});

describe("spelling helpers", () => {
  it("drops a leading article", () => {
    expect(spellingOf(word("vogel", "der Vogel"))).toBe("Vogel");
    expect(spellingOf(word("katze", "die Katze"))).toBe("Katze");
    expect(spellingOf(word("hallo", "Hallo"))).toBe("Hallo");
    // Only a leading article is dropped, not one inside the word.
    expect(spellingOf(word("derby", "Derby"))).toBe("Derby");
  });

  it("keeps only letters, uppercased", () => {
    expect(answerLetters("Wie geht's?")).toBe("WIEGEHTS");
    expect(answerLetters("Tschüss")).toBe("TSCHÜSS");
    expect(answerLetters("Großvater")).toBe("GROSSVATER");
    expect(answerLetters("Café")).toBe("CAFÉ");
  });

  it("counts letters per word in line with answerLetters", () => {
    expect(wordSegments("Wie geht's?")).toEqual([3, 5]);
    expect(wordSegments("Großvater")).toEqual([10]);
    expect(wordSegments("Guten  Morgen")).toEqual([5, 6]);
  });

  it("builds a tile pool that holds exactly the answer's letters", () => {
    const tiles = letterTilesFor("Guten Tag");
    expect(tiles.slice().sort()).toEqual("GUTENTAG".split("").sort());
  });

  it("adds one duplicated letter as a decoy when asked", () => {
    const tiles = letterTilesFor("Vogel", true);
    expect(tiles).toHaveLength(6);
    for (const letter of "VOGEL") expect(tiles).toContain(letter);
    expect(new Set(tiles).size).toBe(5);
  });

  it("blanks the middle letter and offers it among four distinct options", () => {
    const question = missingLetterQuestion("Vogel");
    expect(question.letters).toEqual(["V", "O", "G", "E", "L"]);
    expect(question.blankIndex).toBe(2);
    expect(question.correct).toBe("G");
    expect(question.options).toHaveLength(4);
    expect(new Set(question.options).size).toBe(4);
    expect(question.options).toContain("G");
  });
});

describe("buildRoundFromRows", () => {
  it("makes one item per single-word row, with three other words as options", () => {
    const rows: RowRef[] = WORDS.map((w) => ({ testType: "picture", wordId: w.id }));
    const items = buildRoundFromRows(rows, WORDS);
    expect(items).toHaveLength(WORDS.length);
    for (const item of items) {
      if (item.kind === "match") throw new Error("unexpected match item");
      expect(item.kind).toBe("picture");
      expect(item.tier).toBe("easy");
      expect(item.optionIds).toHaveLength(3);
      expect(new Set(item.optionIds).size).toBe(3);
      expect(item.optionIds).not.toContain(item.word.id);
    }
    expect(items.map((i) => (i.kind === "match" ? "" : i.word.id)).sort()).toEqual(
      WORDS.map((w) => w.id),
    );
  });

  it("skips rows for words or test types that no longer exist", () => {
    const rows: RowRef[] = [
      { testType: "picture", wordId: "a" },
      { testType: "picture", wordId: "removed-word" },
      { testType: "removedType" as TestType, wordId: "b" },
    ];
    const items = buildRoundFromRows(rows, WORDS);
    expect(items).toHaveLength(1);
  });

  it("groups match rows into boards of at most five words", () => {
    const rows: RowRef[] = WORDS.map((w) => ({ testType: "match", wordId: w.id }));
    const items = buildRoundFromRows(rows, WORDS);
    const boards = items.map((item) => {
      if (item.kind !== "match") throw new Error("expected only match items");
      return item.words.map((w) => w.id);
    });
    expect(boards.map((b) => b.length).sort()).toEqual([1, 5]);
    expect(boards.flat().sort()).toEqual(WORDS.map((w) => w.id));
  });

  it("never offers or pairs two words that are spelled the same", () => {
    const words = [
      word("sie-she", "sie"),
      word("sie-they", "sie"),
      word("sie-formal", "Sie"),
      word("ich"),
      word("du"),
      word("er"),
      word("wir"),
    ];
    const same = new Set(["sie-she", "sie-they", "sie-formal"]);
    for (let run = 0; run < 20; run++) {
      const items = buildRoundFromRows(
        words.flatMap((w) => [
          { testType: "listen" as const, wordId: w.id },
          { testType: "match" as const, wordId: w.id },
        ]),
        words,
      );
      for (const item of items) {
        if (item.kind === "match") {
          expect(item.words.filter((w) => same.has(w.id)).length).toBeLessThanOrEqual(1);
        } else if (same.has(item.word.id)) {
          expect(item.optionIds.some((id) => same.has(id))).toBe(false);
        }
      }
    }
  });
});

describe("itemMedia", () => {
  const byId = Object.fromEntries(WORDS.map((w) => [w.id, w]));
  const a = WORDS[0]!;

  it("lists the spoken options and the question picture for a picture question", () => {
    const media = itemMedia(
      { kind: "picture", tier: "easy", word: a, optionIds: ["b", "c", "d"] },
      byId,
    );
    expect(media.words).toEqual(["worta", "wortb", "wortc", "wortd"]);
    expect(media.images).toEqual([a.image]);
    expect(media.letters).toEqual([]);
  });

  it("lists the word's letters for a spelling question", () => {
    const media = itemMedia({ kind: "listenBuild", tier: "hard", word: a, optionIds: [] }, byId);
    expect(media.words).toEqual(["worta"]);
    expect(media.letters).toEqual("WORTA".split(""));
  });

  it("includes plural and example sentence for a training item", () => {
    const vogel: VocabWord = {
      ...word("vogel", "der Vogel"),
      plural: "die Vögel",
      example: { german: "Der Vogel singt.", english: "", tamil: "", sinhala: "" },
    };
    const media = itemMedia({ kind: "training", tier: "training", word: vogel, optionIds: [] }, {});
    expect(media.words).toEqual(["der Vogel", "die Vögel", "Der Vogel singt."]);
  });

  it("lists every word and picture on a match board", () => {
    const media = itemMedia({ kind: "match", tier: "hard", words: [a, WORDS[1]!] }, byId);
    expect(media.words).toEqual(["worta", "wortb"]);
    expect(media.images).toEqual([a.image, WORDS[1]!.image]);
  });
});

describe("splitIntoTests", () => {
  const list = (n: number) => Array.from({ length: n }, (_, i) => word(`w${i}`));

  it("splits evenly into as few tests as fit", () => {
    expect(splitIntoTests("1.9", list(24)).map((t) => t.words.length)).toEqual([12, 12]);
    expect(splitIntoTests("1.9", list(37)).map((t) => t.words.length)).toEqual([13, 12, 12]);
    expect(splitIntoTests("1.9", list(15)).map((t) => t.words.length)).toEqual([15]);
  });

  it("numbers tests under the lesson id and keeps the word order", () => {
    const tests = splitIntoTests("1.9", list(24));
    expect(tests.map((t) => t.testId)).toEqual(["1.9.1", "1.9.2"]);
    expect(tests.map((t) => t.part)).toEqual([1, 2]);
    expect(tests.flatMap((t) => t.words.map((w) => w.id))).toEqual(list(24).map((w) => w.id));
  });

  it("keeps every real lesson's tests even and within the word limits, with unique ids", () => {
    const tests = VOCAB_LESSONS.flatMap((lesson) => lesson.tests);
    for (const lesson of VOCAB_LESSONS) {
      const sizes = lesson.tests.map((test) => test.words.length);
      const total = sizes.reduce((a, b) => a + b, 0);
      expect(Math.max(...sizes), lesson.id).toBeLessThanOrEqual(MAX_TEST_WORDS);
      expect(Math.max(...sizes) - Math.min(...sizes), lesson.id).toBeLessThanOrEqual(1);
      // A lesson of 16-19 words can't be cut into tests of 10-15 (1.24 and
      // 1.28 have 17, so 9 + 8); every other size must respect the minimum.
      if (total <= MAX_TEST_WORDS || total >= 2 * MIN_TEST_WORDS)
        expect(Math.min(...sizes), lesson.id).toBeGreaterThanOrEqual(MIN_TEST_WORDS);
    }
    for (const test of tests) {
      const ids = test.words.map((w) => w.id);
      expect(new Set(ids).size, `duplicate word id in ${test.testId}`).toBe(ids.length);
    }
    const testIds = tests.map((t) => t.testId);
    expect(new Set(testIds).size).toBe(testIds.length);
  });
});
