import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { hasWordAudio, lookaheadQuestions, playWord, setAudioWindow } from "@/lib/word-audio";
import { playCorrectSound, playWrongSound, preloadFeedbackSounds } from "@/lib/feedback-sound";
import {
  AnswerGrid,
  Continue,
  LessonFrame,
  MatchPairs,
  ResultCard,
} from "@/components/quiz/pieces";
import {
  GapInput,
  ListenButton,
  RuleIntro,
  SentenceCard,
  SentenceFeedback,
  SortBuckets,
} from "@/components/quiz/grammar-pieces";
import {
  BOARD_ID,
  buildGrammarRound,
  gapAnswer,
  grammarItemAudio,
  rowsForTest,
  sameAnswer,
  type GrammarItem,
} from "@/lib/grammar-engine";
import { shuffle } from "@/lib/quiz-engine";
import { ensureRowsEntered, getActiveTierRows, recordFail, recordPass } from "@/lib/progress-store";
import { recordCorrectAnswer } from "@/lib/stats-store";
import type { MotherTongue, Strings } from "@/lib/i18n";
import type { GrammarTest, Localized } from "@/data/grammar/types";

// The quiz screen for a grammar test (G1.2, G1.3, ... — see
// src/data/grammar/), the counterpart of VocabQuiz. Same tier-gated rounds
// and progress rules; the queue comes from grammar-engine.ts. As in
// VocabQuiz, a wrong answer is asked again in place until it's right (with
// the sentence's "why" line as a hint, never the answer itself); only the
// first miss on a question costs a penalty.
function localized(value: string | Localized, lang: MotherTongue): string {
  return typeof value === "string" ? value : value[lang];
}

function rowIdOf(item: GrammarItem): string {
  if (item.kind === "rule") return item.rule.id;
  return "sentence" in item ? item.sentence.id : BOARD_ID;
}

export function GrammarQuiz({
  test,
  t,
  lang,
  onExit,
}: {
  test: GrammarTest;
  t: Strings;
  lang: MotherTongue;
  onExit: () => void;
}) {
  const sentences = useMemo(() => Object.fromEntries(test.sentences.map((s) => [s.id, s])), [test]);
  const rules = useMemo(() => Object.fromEntries(test.rules.map((r) => [r.id, r])), [test]);
  const [queue, setQueue] = useState<GrammarItem[]>([]);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  // A rule item is two screens: the rule card, then its check question.
  const [introDone, setIntroDone] = useState(false);
  const [placement, setPlacement] = useState<(string | null)[]>([]);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const pairsMissed = useRef(false);
  const item: GrammarItem | undefined = queue[index];

  useEffect(() => {
    preloadFeedbackSounds();
    ensureRowsEntered(test.testId, rowsForTest(test));
    setQueue(buildGrammarRound(getActiveTierRows<string>(test.testId), test));
    setReady(true);
  }, [test]);

  // A sort board shows its tiles in a fresh order each time it comes up.
  const sortItems = useMemo(
    () => (item?.kind === "sort" ? shuffle(test.sort?.items ?? []) : []),
    [item, test],
  );

  useEffect(() => {
    setAnswer(null);
    setTyped("");
    setChecked(false);
    setAttempts(0);
    setIntroDone(false);
    setSelectedTile(null);
    setPlacement(sortItems.map(() => null));
    pairsMissed.current = false;
  }, [queue, index, sortItems]);

  useEffect(() => {
    if (!item) return;
    const upcoming = queue
      .slice(index + 1, index + 1 + lookaheadQuestions())
      .map((next) => ({ words: grammarItemAudio(next, test), letters: [] }));
    setAudioWindow({ words: grammarItemAudio(item, test), letters: [] }, upcoming);
  }, [queue, index, item, test]);

  // A listening question plays its sentence once on arrival.
  useEffect(() => {
    if (item?.kind === "listenPick") playWord(item.sentence.german);
  }, [item]);

  const pairsWords = useMemo(
    () =>
      (test.pairs ?? []).map((pair, i) => ({
        id: `p${i}`,
        full: pair.left,
        english: localized(pair.right, "english"),
        tamil: localized(pair.right, "tamil"),
        sinhala: localized(pair.right, "sinhala"),
      })),
    [test],
  );

  const goNext = () => {
    const nextIndex = index + 1;
    if (nextIndex < queue.length) {
      setIndex(nextIndex);
      return;
    }
    const nextRows = getActiveTierRows<string>(test.testId);
    setQueue(nextRows.length > 0 ? buildGrammarRound(nextRows, test) : []);
    setIndex(0);
    setRound((r) => r + 1);
  };
  const record = (isCorrect: boolean) => {
    if (!item) return;
    if (isCorrect) recordPass(test.testId, item.kind, rowIdOf(item));
    else recordFail(test.testId, item.kind, rowIdOf(item));
  };
  const checkAnswer = (isCorrect: boolean) => {
    setChecked(true);
    setLastCorrect(isCorrect);
    // Only the first wrong attempt on a queue appearance costs a penalty —
    // further in-place retries (see `retry` below) don't stack.
    if (isCorrect || attempts === 0) record(isCorrect);
    if (isCorrect) {
      recordCorrectAnswer();
      playCorrectSound();
    } else {
      playWrongSound();
      setAttempts((a) => a + 1);
    }
  };
  // Back to the same question. A sort board keeps the tiles that were in the
  // right group and sends the wrong ones back to the tray.
  const retry = () => {
    setChecked(false);
    setAnswer(null);
    setTyped("");
    setSelectedTile(null);
    setPlacement((old) => old.map((group, i) => (group === sortItems[i]?.group ? group : null)));
  };

  const sentence = item && "sentence" in item ? item.sentence : undefined;
  const why = sentence
    ? (sentence.why?.[lang] ?? (sentence.rule ? rules[sentence.rule]?.text[lang] : undefined))
    : undefined;
  const sortDone = placement.length > 0 && placement.every((group) => group !== null);
  const sortCorrect = sortItems.every((sortItem, i) => placement[i] === sortItem.group);

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 pb-10 sm:px-6">
      {ready && !item && (
        <LessonFrame t={t} eyebrow={t.roundUp} title="Geschafft!" subtitle={t.roundSuccess}>
          <Button variant="adventure" size="lesson" className="w-full" onClick={onExit}>
            {t.backToPath}
          </Button>
        </LessonFrame>
      )}

      {item?.kind === "rule" && !introDone && (
        <RuleIntro
          t={t}
          lang={lang}
          rule={item.rule}
          sentences={sentences}
          tier={item.tier}
          onContinue={() => setIntroDone(true)}
        />
      )}

      {item?.kind === "rule" && introDone && (
        <LessonFrame
          t={t}
          eyebrow={`${t.training} · ${t.quickCheck}`}
          tier={item.tier}
          title="Was passt?"
          subtitle={item.rule.check.prompt[lang]}
        >
          <div className="my-5" />
          <AnswerGrid
            options={item.checkOptions}
            selected={answer}
            correct={item.rule.check.answer}
            revealed={checked}
            onSelect={setAnswer}
            speak={item.checkOptions.every(hasWordAudio)}
          />
          {!checked && (
            <Continue
              t={t}
              disabled={!answer}
              onClick={() => checkAnswer(answer === item.rule.check.answer)}
            />
          )}
        </LessonFrame>
      )}

      {item?.kind === "gapPick" && (
        <LessonFrame
          t={t}
          eyebrow={t.fillGap}
          tier={item.tier}
          title="Was fehlt?"
          subtitle={t.pickGapFiller}
        >
          <SentenceCard
            t={t}
            sentence={item.sentence}
            lang={lang}
            highlight={item.sentence.focus}
            part={item.sentence.focusPart}
            gap
            filled={answer ?? undefined}
            tone={checked ? (lastCorrect ? "right" : "wrong") : "neutral"}
          />
          <AnswerGrid
            options={item.options}
            selected={answer}
            correct={gapAnswer(item.sentence)}
            revealed={checked}
            onSelect={setAnswer}
            speak={!item.sentence.focusPart && item.options.every(hasWordAudio)}
          />
          {!checked && (
            <Continue
              t={t}
              disabled={!answer}
              onClick={() => checkAnswer(answer === gapAnswer(item.sentence))}
            />
          )}
        </LessonFrame>
      )}

      {item?.kind === "sentenceMeaning" && (
        <LessonFrame
          t={t}
          eyebrow={t.meaningCheck}
          tier={item.tier}
          title="Was bedeutet das?"
          subtitle={t.chooseMeaning}
        >
          <SentenceCard t={t} sentence={item.sentence} lang={lang} showMeaning={false} />
          <AnswerGrid
            options={[
              ...new Set(item.options.map((id) => sentences[id]?.meaning[lang] ?? "")),
            ].filter(Boolean)}
            selected={answer}
            correct={item.sentence.meaning[lang]}
            revealed={checked}
            onSelect={setAnswer}
            speak={false}
          />
          {!checked && (
            <Continue
              t={t}
              disabled={!answer}
              onClick={() => checkAnswer(answer === item.sentence.meaning[lang])}
            />
          )}
        </LessonFrame>
      )}

      {item?.kind === "listenPick" && (
        <LessonFrame
          t={t}
          eyebrow={t.listeningChallenge}
          tier={item.tier}
          title="Was hörst du?"
          subtitle={t.listenThenChooseSentence}
        >
          <ListenButton t={t} text={item.sentence.german} />
          <p className="mb-4 text-center text-sm font-bold text-ink-soft">{t.listenAgain}</p>
          <AnswerGrid
            options={item.options.map((id) => sentences[id]?.german ?? "").filter(Boolean)}
            selected={answer}
            correct={item.sentence.german}
            revealed={checked}
            onSelect={setAnswer}
            speak={false}
          />
          {!checked && (
            <Continue
              t={t}
              disabled={!answer}
              onClick={() => checkAnswer(answer === item.sentence.german)}
            />
          )}
        </LessonFrame>
      )}

      {item?.kind === "pairs" && (
        <LessonFrame
          t={t}
          eyebrow={t.matchChallenge}
          tier={item.tier}
          title="Finde die Paare"
          subtitle={t.matchEachPair}
        >
          <MatchPairs
            key={`${round}:${index}`}
            t={t}
            lang={lang}
            words={pairsWords}
            onAttempt={(_, isCorrect) => {
              if (isCorrect) recordCorrectAnswer();
              else pairsMissed.current = true;
            }}
            onComplete={() => {
              record(!pairsMissed.current);
              goNext();
            }}
            title="Super!"
            actionLabel="Weiter"
          />
        </LessonFrame>
      )}

      {item?.kind === "sort" && test.sort && (
        <LessonFrame
          t={t}
          eyebrow={t.sortChallenge}
          tier={item.tier}
          title="Sortiere die Wörter"
          subtitle={t.sortHint}
        >
          <div className="my-5">
            <SortBuckets
              lang={lang}
              groups={test.sort.groups}
              items={sortItems}
              placement={placement}
              selected={selectedTile}
              revealed={checked}
              onSelect={setSelectedTile}
              onPlace={(i, group) => {
                setPlacement((old) => old.map((g, j) => (j === i ? group : g)));
                setSelectedTile(null);
              }}
            />
          </div>
          {!checked && (
            <Continue t={t} disabled={!sortDone} onClick={() => checkAnswer(sortCorrect)} />
          )}
        </LessonFrame>
      )}

      {item?.kind === "gapType" && (
        <LessonFrame
          t={t}
          eyebrow={t.typeChallenge}
          tier={item.tier}
          title="Schreib, was fehlt"
          subtitle={t.typeMissing}
        >
          <SentenceCard
            t={t}
            sentence={item.sentence}
            lang={lang}
            highlight={item.sentence.focus}
            part={item.sentence.focusPart}
            gap
            filled={typed}
            tone={checked ? (lastCorrect ? "right" : "wrong") : "neutral"}
          />
          <GapInput
            t={t}
            value={typed}
            keys={item.options}
            onChange={setTyped}
            disabled={checked}
            onSubmit={() => {
              if (!checked) checkAnswer(sameAnswer(typed, gapAnswer(item.sentence)));
            }}
          />
          {!checked && (
            <Continue
              t={t}
              disabled={!typed.trim()}
              onClick={() => checkAnswer(sameAnswer(typed, gapAnswer(item.sentence)))}
            />
          )}
        </LessonFrame>
      )}

      {item && item.kind !== "pairs" && checked && (
        <ResultCard
          correct={lastCorrect}
          correctText=""
          hint={item.kind === "rule" ? item.rule.text[lang] : why}
          detail={
            lastCorrect && sentence ? (
              <SentenceFeedback t={t} sentence={sentence} lang={lang} />
            ) : undefined
          }
          actionLabel={lastCorrect ? "Weiter" : t.tryAgain}
          onAction={lastCorrect ? goNext : retry}
        />
      )}
    </main>
  );
}
