import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseBackdrop, CourseHeader, useCourseScreen } from "@/components/course/CourseShell";
import { ReviewPlayer } from "@/components/course/LessonPlayer";
import { LessonFrame } from "@/components/quiz/pieces";
import { COURSE_TITLE, courseIds, noteForTag } from "@/data/course";
import { REVIEW_SIZE } from "@/lib/course-engine";
import { getDueSentenceIds, getWeakGrammarTags, reconcileCourse } from "@/lib/course-store";
import { requestFullscreen } from "@/lib/fullscreen";

// The daily review session, /ueben: the sentences due today, and the
// grammar the learner has been getting wrong.
export const Route = createFileRoute("/ueben")({
  head: () => ({ meta: [{ title: "Üben — WortWunder" }] }),
  component: ReviewRoute,
});

function ReviewRoute() {
  const navigate = useNavigate();
  const { ready, lang, t } = useCourseScreen();
  const [started, setStarted] = useState(false);
  // Read after mount: progress lives in localStorage.
  const [due, setDue] = useState<number | null>(null);
  const [weakTags, setWeakTags] = useState<string[]>([]);
  useEffect(() => {
    reconcileCourse(courseIds());
    setDue(getDueSentenceIds().length);
    setWeakTags(getWeakGrammarTags());
  }, []);
  const goHome = () => void navigate({ to: "/" });
  const weakTitles = weakTags.flatMap((tag) => noteForTag(tag)?.title[lang] ?? []);

  return (
    <CourseBackdrop>
      {ready && started && <ReviewPlayer t={t} lang={lang} onExit={goHome} />}
      {ready && !started && due !== null && (
        <>
          <CourseHeader label={t.backToPath} eyebrow={COURSE_TITLE} title="Üben" onBack={goHome} />
          <main className="relative z-10 mx-auto max-w-3xl px-4 pb-10 sm:px-6">
            <LessonFrame
              t={t}
              eyebrow={t.review}
              title="Üben"
              subtitle={due > 0 ? t.reviewIntro(Math.min(due, REVIEW_SIZE)) : t.nothingDue}
            >
              <div className="mx-auto grid size-24 place-items-center rounded-3xl bg-mint/35">
                <Dumbbell className="size-12" />
              </div>
              {weakTitles.length > 0 && (
                <div className="mt-5 rounded-[24px] bg-card p-4 ring-1 ring-border">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
                    {t.practiseGrammar}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {weakTitles.map((title) => (
                      <li key={title} className="font-display text-lg font-extrabold">
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {due > 0 ? (
                <Button
                  variant="adventure"
                  size="lesson"
                  className="mt-6 w-full"
                  onClick={() => {
                    requestFullscreen();
                    setStarted(true);
                  }}
                >
                  {t.startReview}
                </Button>
              ) : (
                <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={goHome}>
                  {t.backToPath}
                </Button>
              )}
            </LessonFrame>
          </main>
        </>
      )}
    </CourseBackdrop>
  );
}
