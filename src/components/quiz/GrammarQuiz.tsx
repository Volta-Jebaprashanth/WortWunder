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
  SpotSentence,
  WordBuilder,
} from "@/components/quiz/grammar-pieces";
import {
  acceptedOrders,
  answerSentence,
  BOARD_ID,
  buildGrammarRound,
  endMark,
  gapAnswer,
  grammarItemAudio,
  rowsForTest,
  sameAnswer,
  sameWordsOtherOrder,
  spotTokens,
  tileWords,
  type GrammarItem,
} from "@/lib/grammar-engine";
import { shuffle } from "@/lib/quiz-engine";
import { ensureRowsEntered, getActiveTierRows, recordFail, recordPass } from "@/lib/progress-store";
import { recordCorrectAnswer } from "@/lib/stats-store";
import type { MotherTongue, Strings } from "@/lib/i18n";
import type { GrammarSentence, GrammarTest, Localized } from "@/data/grammar/types";

// The quiz screen for a grammar test (G1.2, G1.3, ... — see
// src/data/grammar/), the counterpart of VocabQuiz. Same tier-gated rounds
// and progress rules; the queue comes from grammar-engine.ts. As in
// VocabQuiz, a wrong answer is asked again in place until it's right (with
// a hint that fits the kind of question, never the answer itself); only the
// first miss on a question costs a penalty.
function localized(value: string | Localized, lang: MotherTongue): string {
  return typeof value === "string" ? value : value[lang];
}

function rowIdOf(item: GrammarItem): string {
  if (item.kind === "rule") return item.rule.id;
  return "sentence" in item ? item.sentence.id : BOARD_ID;
}

// A miss on one of these whole screens brings it back once, not two or
// three times (see recordFail).
const BIG_SCREENS = new Set<GrammarItem["kind"]>(["rule", "pairs", "sort"]);

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
  // Word-tile questions: indices into the item's tiles, in sentence order.
  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  // A rule item is two screens: the rule card, then its check question.
  const [introDone, setIntroDone] = useState(false);
  const [placement, setPlacement] = useState<(string | null)[]>([]);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const pairsMissed = useRef(false);
  // For the finish screen: questions answered, and how many of those were
  // missed at least once.
  const [score, setScore] = useState({ questions: 0, mistakes: 0 });
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
    setPlaced([]);
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

  // A listening question plays its sentence once on arrival, a reply
  // question the line being answered.
  useEffect(() => {
    if (item?.kind === "listenPick" || item?.kind === "listenBuild") playWord(item.sentence.german);
    if (item?.kind === "reply" && item.sentence.replyTo) playWord(item.sentence.replyTo.german);
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
    else
      recordFail(test.testId, item.kind, rowIdOf(item), BIG_SCREENS.has(item.kind) ? 1 : undefined);
  };
  const checkAnswer = (isCorrect: boolean) => {
    setChecked(true);
    setLastCorrect(isCorrect);
    // Only the first wrong attempt on a queue appearance costs a penalty —
    // further in-place retries (see `retry` below) don't stack.
    if (isCorrect || attempts === 0) record(isCorrect);
    if (isCorrect) setScore((s) => ({ ...s, questions: s.questions + 1 }));
    else if (attempts === 0) setScore((s) => ({ ...s, mistakes: s.mistakes + 1 }));
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
    setPlaced([]);
    setSelectedTile(null);
    setPlacement((old) => old.map((group, i) => (group === sortItems[i]?.group ? group : null)));
  };

  // What the learner should end up with: the sentence itself, or for
  // transform the sentence it turns into.
  const target = item && "sentence" in item ? answerSentence(item, test) : undefined;
  const builtWords = item && "options" in item ? placed.map((i) => item.options[i] ?? "") : [];
  // Where only the meaning is given, any right word order counts.
  const anyOrder = item?.kind === "order" || item?.kind === "meaningBuild";
  const builtRight =
    target !== undefined && acceptedOrders(target, anyOrder).includes(builtWords.join(" "));
  const builder = (
    <WordBuilder
      t={t}
      tiles={item && "options" in item ? item.options : []}
      placed={placed}
      end={target ? endMark(target) : ""}
      disabled={checked}
      tone={checked ? (lastCorrect ? "right" : "wrong") : "neutral"}
      onPlace={(i) => setPlaced((old) => [...old, i])}
      onRemove={(position) => setPlaced((old) => old.filter((_, p) => p !== position))}
      onReset={() => setPlaced([])}
    />
  );
  const checkBuilt = !checked && (
    <Continue t={t} disabled={placed.length === 0} onClick={() => checkAnswer(builtRight)} />
  );
  const whyOf = (s: GrammarSentence) =>
    s.why?.[lang] ?? (s.rule ? rules[s.rule]?.text[lang] : undefined);
  // The hint after a miss fits what was asked: the rule's "why" only where
  // the mistake is the form of a word (a gap, a planted mistake, a wrong
  // word on the tiles), something else for meaning, listening, replies and
  // word order.
  const hint = (() => {
    if (!item) return undefined;
    switch (item.kind) {
      case "rule":
        return item.rule.text[lang];
      case "pairs":
      case "sort":
        return undefined;
      case "sentenceMeaning":
        return t.hintMeaning;
      case "listenPick":
        return t.hintListen;
      case "reply":
        return t.hintReply;
      case "transform":
        // Left as it was: the instruction says what to change.
        if (builtWords.join(" ") === tileWords(item.sentence).join(" "))
          return item.sentence.transformTo?.prompt[lang];
        if (target && sameWordsOtherOrder(builtWords, target)) return t.hintWordOrder;
        // The rule for the sentence to make, not the one it started as.
        return target ? whyOf(target) : undefined;
      case "order":
      case "meaningBuild":
      case "listenBuild":
        if (target && sameWordsOtherOrder(builtWords, target)) return t.hintWordOrder;
        return whyOf(item.sentence);
      default:
        return whyOf(item.sentence);
    }
  })();
  // A typed gap is checked without case; a right answer typed with the
  // wrong case still gets a word about the capital.
  const gapWord = item?.kind === "gapType" ? gapAnswer(item.sentence) : "";
  const capitalNote =
    gapWord && lastCorrect && typed.trim() !== gapWord && gapWord !== gapWord.toLowerCase()
      ? t.capitalNote(gapWord)
      : undefined;
  const sortDone = placement.length > 0 && placement.every((group) => group !== null);
  const sortCorrect = sortItems.every((sortItem, i) => placement[i] === sortItem.group);

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 pb-10 sm:px-6">
      {ready && !item && (
        <LessonFrame t={t} eyebrow={t.roundUp} title="Geschafft!" subtitle={t.roundSuccess}>
          <div className="mx-auto my-5 max-w-md space-y-3 rounded-[24px] bg-card p-4 text-center ring-1 ring-border">
            {score.questions > 0 && (
              <p className="font-display text-xl font-extrabold">
                {t.resultSummary(score.questions, score.mistakes)}
              </p>
            )}
            <p className="font-bold text-ink-soft">
              {t.youLearned}: {test.title} · {test.meaning[lang]}
            </p>
            {test.rules.length > 0 && (
              <ul className="space-y-1 text-sm font-bold">
                {test.rules.map((rule) => (
                  <li key={rule.id}>✓ {rule.title[lang]}</li>
                ))}
              </ul>
            )}
          </div>
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
          subtitle={test.pairsPrompt?.[lang] ?? t.matchEachPair}
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
              // A miss costs one replay of the board: the fail, then the pass
              // for finishing it, as for any question retried in place.
              const missed = pairsMissed.current;
              if (missed) record(false);
              record(true);
              setScore((s) => ({
                questions: s.questions + 1,
                mistakes: s.mistakes + (missed ? 1 : 0),
              }));
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

      {item?.kind === "order" && (
        <LessonFrame
          t={t}
          eyebrow={t.orderChallenge}
          tier={item.tier}
          title="Ordne die Wörter"
          subtitle={t.putWordsInOrder}
        >
          <p className="mt-5 text-center font-display text-2xl font-extrabold text-ink-soft">
            {item.sentence.meaning[lang]}
          </p>
          {builder}
          {checkBuilt}
        </LessonFrame>
      )}

      {item?.kind === "meaningBuild" && (
        <LessonFrame
          t={t}
          eyebrow={t.translationChallenge}
          tier={item.tier}
          title="Wie sagt man das auf Deutsch?"
          subtitle={t.buildSentence}
        >
          <p className="mt-5 text-center font-display text-2xl font-extrabold">
            {item.sentence.meaning[lang]}
          </p>
          {builder}
          {checkBuilt}
        </LessonFrame>
      )}

      {item?.kind === "listenBuild" && (
        <LessonFrame
          t={t}
          eyebrow={t.listeningChallenge}
          tier={item.tier}
          title="Baue den Satz"
          subtitle={t.listenThenBuild}
        >
          <ListenButton t={t} text={item.sentence.german} />
          {builder}
          {checkBuilt}
        </LessonFrame>
      )}

      {item?.kind === "transform" && item.sentence.transformTo && (
        <LessonFrame
          t={t}
          eyebrow={t.transformChallenge}
          tier={item.tier}
          title="Ändere den Satz"
          subtitle={item.sentence.transformTo.prompt[lang]}
        >
          <SentenceCard
            t={t}
            sentence={item.sentence}
            lang={lang}
            highlight={item.sentence.focus}
          />
          {builder}
          {checkBuilt}
        </LessonFrame>
      )}

      {item?.kind === "spot" && (
        <LessonFrame
          t={t}
          eyebrow={t.spotChallenge}
          tier={item.tier}
          title="Finde den Fehler"
          subtitle={t.tapWrongWord}
        >
          <SpotSentence
            t={t}
            tokens={spotTokens(item.sentence, item.options[0])}
            selected={answer}
            revealed={checked}
            correct={item.options[0] ? String(item.sentence.focus) : "none"}
            onSelect={setAnswer}
          />
          <p className="text-center font-bold text-ink-soft">{item.sentence.meaning[lang]}</p>
          {!checked && (
            <Continue
              t={t}
              disabled={!answer}
              onClick={() =>
                checkAnswer(answer === (item.options[0] ? String(item.sentence.focus) : "none"))
              }
            />
          )}
        </LessonFrame>
      )}

      {item?.kind === "reply" && item.sentence.replyTo && (
        <LessonFrame
          t={t}
          eyebrow={t.replyChallenge}
          tier={item.tier}
          title="Was sagst du?"
          subtitle={t.pickReply}
        >
          <SentenceCard
            t={t}
            sentence={{
              id: `${item.sentence.id}-prompt`,
              german: item.sentence.replyTo.german,
              meaning: item.sentence.replyTo.meaning,
            }}
            lang={lang}
          />
          <AnswerGrid
            options={item.options}
            selected={answer}
            correct={item.sentence.german}
            revealed={checked}
            onSelect={setAnswer}
            speak={item.options.every(hasWordAudio)}
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

      {item && item.kind !== "pairs" && checked && (
        <ResultCard
          correct={lastCorrect}
          correctText=""
          hint={hint}
          detail={
            lastCorrect && target ? (
              <SentenceFeedback t={t} sentence={target} lang={lang} why={capitalNote} />
            ) : undefined
          }
          actionLabel={lastCorrect ? "Weiter" : t.tryAgain}
          onAction={lastCorrect ? goNext : retry}
        />
      )}
    </main>
  );
}
