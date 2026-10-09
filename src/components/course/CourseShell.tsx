import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { COURSE_TITLE } from "@/data/course";
import { TRANSLATIONS, type MotherTongue, type Strings } from "@/lib/i18n";
import { useProfile } from "@/lib/profile";
import { startActiveTimeTracking } from "@/lib/stats-store";

// What every course route needs: the learner's language and its strings.
// `ready` is false until the saved profile has been read. Name, age and
// mother tongue are asked for on the home screen, so a learner who lands on
// a course page first is sent there.
export function useCourseScreen(): { ready: boolean; lang: MotherTongue; t: Strings } {
  const navigate = useNavigate();
  const { profile, checked } = useProfile();
  const lang = profile?.motherTongue ?? "english";

  useEffect(() => startActiveTimeTracking(), []);
  useEffect(() => {
    if (checked && !profile) void navigate({ to: "/", replace: true });
  }, [checked, profile, navigate]);

  return { ready: profile !== null, lang, t: TRANSLATIONS[lang] };
}

// The sky background and safe-area padding shared with the home screen.
export function CourseBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-sky relative min-h-dvh overflow-hidden text-foreground [padding:env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]">
      {children}
    </div>
  );
}

// Shown for a unit or lesson id that doesn't exist.
export function CourseNotFound({ t }: { t: Strings }) {
  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-extrabold">{COURSE_TITLE}</h1>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 font-display font-extrabold text-primary-foreground"
      >
        {t.backToPath}
      </Link>
    </main>
  );
}

// The top bar of a course page that isn't a lesson: a back button and what
// the page belongs to.
export function CourseHeader({
  label,
  eyebrow,
  title,
  onBack,
}: {
  label: string;
  eyebrow: string;
  title: string;
  onBack: () => void;
}) {
  return (
    <header className="relative z-20 mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
      <button
        type="button"
        onClick={onBack}
        aria-label={label}
        className="glass-panel grid size-11 shrink-0 place-items-center rounded-2xl"
      >
        <ArrowLeft className="size-5" />
      </button>
      <div className="min-w-0">
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
          {eyebrow}
        </p>
        <p className="truncate font-display text-xl font-extrabold leading-tight">{title}</p>
      </div>
    </header>
  );
}
