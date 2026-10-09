import { BookOpen, Check, ChevronRight, Flag, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COURSE_UNITS } from "@/data/course";
import type { CourseUnit } from "@/data/course/types";
import { CHECKPOINT_PASS, CHECKPOINT_SIZE } from "@/lib/course-engine";
import {
  checkpointStatus,
  hasCheckpoint,
  lessonStatus,
  type CourseProgress,
  type StepStatus,
} from "@/lib/course-path";
import type { MotherTongue, Strings } from "@/lib/i18n";

// A unit's own page: what the learner will be able to do after it, the
// guidebook, the lessons with their locked, open and finished states, and
// the checkpoint that completes the unit.
export function UnitPage({
  unit,
  progress,
  t,
  lang,
  onOpenLesson,
  onOpenGuide,
  onOpenCheckpoint,
}: {
  unit: CourseUnit;
  progress: CourseProgress;
  t: Strings;
  lang: MotherTongue;
  onOpenLesson: (lessonId: string) => void;
  onOpenGuide: () => void;
  onOpenCheckpoint: () => void;
}) {
  const checkpoint = checkpointStatus(COURSE_UNITS, unit, progress);
  const lessonsDone = unit.lessons.every((lesson) => progress.finishedLessons.has(lesson.id));
  const questions = Math.min(unit.checkpoint.length, CHECKPOINT_SIZE);

  return (
    <main className="relative z-10 mx-auto max-w-3xl space-y-5 px-4 pb-10 sm:px-6">
      <section className="glass-panel rounded-[28px] p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-3xl bg-frost text-4xl ring-2 ring-border">
            {unit.icon}
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{unit.title}</h1>
            <p className="font-bold text-ink-soft">{unit.meaning[lang]}</p>
          </div>
        </div>
        <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
          {t.unitGoals}
        </p>
        <ul className="mt-2 space-y-2">
          {unit.canDo[lang].map((line) => (
            <li key={line} className="flex items-start gap-2 font-bold leading-snug">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint">
                <Check className="size-3" />
              </span>
              {line}
            </li>
          ))}
        </ul>
        {unit.guidebook.length > 0 && (
          <button
            type="button"
            onClick={onOpenGuide}
            className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-left ring-1 ring-border transition hover:bg-card/80"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sun/50">
              <BookOpen className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display font-extrabold">{t.guidebook}</span>
              <span className="block text-xs font-bold text-ink-soft">{t.guidebookHint}</span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-ink-soft" />
          </button>
        )}
      </section>

      <section className="glass-panel rounded-[28px] p-5 sm:p-7">
        <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
          {t.lessons}
        </h2>
        <ol className="mt-3 space-y-2">
          {unit.lessons.map((lesson, i) => {
            const status = lessonStatus(COURSE_UNITS, unit, lesson.id, progress);
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  disabled={status === "locked"}
                  onClick={() => onOpenLesson(lesson.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-left ring-1 ring-border transition",
                    status === "locked" ? "opacity-60" : "hover:bg-card/80",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full border-4 border-frost font-display text-lg font-extrabold shadow-md",
                      status === "done" ? "bg-mint" : "bg-frost",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-extrabold">{lesson.title}</span>
                    <span className="block text-xs font-bold text-ink-soft">
                      {lesson.meaning[lang]}
                    </span>
                  </span>
                  <StatusIcon status={status} label={t.locked} />
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      {hasCheckpoint(unit) && (
        <section className="glass-panel rounded-[28px] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full border-4 border-frost shadow-md",
                checkpoint === "done" ? "bg-mint" : "bg-sun",
              )}
            >
              <Flag className="size-5" />
            </span>
            <h2 className="min-w-0 flex-1 font-display text-xl font-extrabold">{t.checkpoint}</h2>
            {checkpoint !== "open" && <StatusIcon status={checkpoint} label={t.locked} />}
          </div>
          <p className="mt-3 font-bold text-ink-soft">
            {checkpoint === "done"
              ? t.checkpointPassed
              : t.checkpointIntro(questions, Math.round(CHECKPOINT_PASS * 100))}
          </p>
          {checkpoint === "open" && !lessonsDone && (
            <p className="mt-1 text-sm font-bold text-ink-soft">{t.skipAhead}</p>
          )}
          <Button
            variant={checkpoint === "done" ? "outline" : "adventure"}
            size="lesson"
            className={cn("mt-4 w-full", checkpoint === "done" && "rounded-2xl border-2")}
            disabled={checkpoint === "locked"}
            onClick={onOpenCheckpoint}
          >
            {checkpoint === "done" ? t.tryAgain : t.startCheckpoint}
          </Button>
        </section>
      )}
    </main>
  );
}

function StatusIcon({ status, label }: { status: StepStatus; label: string }) {
  if (status === "done")
    return (
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success">
        <Check className="size-4 text-primary-foreground" />
      </span>
    );
  if (status === "locked")
    return <Lock className="size-5 shrink-0 text-ink-soft" aria-label={label} />;
  return <ChevronRight className="size-5 shrink-0 text-ink-soft" />;
}
