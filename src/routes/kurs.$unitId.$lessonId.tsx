import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LessonPlayer } from "@/components/course/LessonPlayer";
import { COURSE_TITLE, findLesson, findUnit } from "@/data/course";
import { TRANSLATIONS } from "@/lib/i18n";
import { useProfile } from "@/lib/profile";
import { startActiveTimeTracking } from "@/lib/stats-store";

// The lesson player for one course lesson, e.g. /kurs/u01/u01.l01.
export const Route = createFileRoute("/kurs/$unitId/$lessonId")({
  head: ({ params }) => {
    const lesson = findLesson(params.unitId, params.lessonId);
    return {
      meta: [{ title: `${lesson?.title ?? COURSE_TITLE} — WortWunder` }],
    };
  },
  component: LessonRoute,
});

function LessonRoute() {
  const { unitId, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { profile, checked } = useProfile();
  const unit = findUnit(unitId);
  const lesson = findLesson(unitId, lessonId);
  const lang = profile?.motherTongue ?? "english";

  useEffect(() => startActiveTimeTracking(), []);

  // Name, age and mother tongue are asked for on the home screen; a learner
  // who lands here first is sent there.
  useEffect(() => {
    if (checked && !profile) void navigate({ to: "/", replace: true });
  }, [checked, profile, navigate]);

  return (
    <div className="app-sky relative min-h-dvh overflow-hidden text-foreground [padding:env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]">
      {unit && lesson && profile && (
        <LessonPlayer
          unit={unit}
          lesson={lesson}
          t={TRANSLATIONS[lang]}
          lang={lang}
          onExit={() => void navigate({ to: "/" })}
        />
      )}
      {(!unit || !lesson) && (
        <main className="mx-auto max-w-md px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-extrabold">{COURSE_TITLE}</h1>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 font-display font-extrabold text-primary-foreground"
          >
            {TRANSLATIONS[lang].backToPath}
          </Link>
        </main>
      )}
    </div>
  );
}
