import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  Check,
  ChevronRight,
  ExternalLink,
  Gem,
  Share,
  Smartphone,
  SquarePlus,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { VocabQuiz } from "@/components/quiz/VocabQuiz";
import { TierSteps } from "@/components/quiz/TierSteps";
import { getTestStatus, type TestStatus } from "@/lib/progress-store";
import {
  DAILY_GOAL_SECONDS,
  getGems,
  getSparks,
  getTodayMinutes,
  notifyStats,
  startActiveTimeTracking,
  subscribeStats,
} from "@/lib/stats-store";
import {
  COURSE_MEANING,
  COURSE_TITLE,
  COURSE_UNITS,
  courseIds,
  type CourseUnit,
} from "@/data/course";
import {
  findVocabLesson,
  findVocabTest,
  lessonPicture,
  testPicture,
  VOCAB_LESSONS,
  type VocabLesson,
  type VocabTest,
} from "@/data/lessons";
import { FAMILY_LESSON_ID } from "@/data/family";
import { WEATHER_LESSON_ID } from "@/data/weather";
import { HOBBIES_LESSON_ID } from "@/data/hobbies";
import { JOBS_LESSON_ID } from "@/data/jobs";
import { FOOD_LESSON_ID } from "@/data/food";
import { MOTHER_TONGUES, TRANSLATIONS, type MotherTongue, type Strings } from "@/lib/i18n";

import { readProfile, writeProfile, type Profile } from "@/lib/profile";
import { requestFullscreen } from "@/lib/fullscreen";
import { getFinishedLessonIds, reconcileCourse } from "@/lib/course-store";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WortWunder — learn German for the A1 exam" },
      {
        name: "description",
        content:
          "Learn beginner German words through playful picture, spelling, and listening lessons.",
      },
      { property: "og:title", content: "WortWunder — learn German for the A1 exam" },
      {
        property: "og:description",
        content: "A playful way to learn German for the A1 exam, for learners of any age.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Screen = "home" | "quiz";

function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeTest, setActiveTest] = useState<VocabTest | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileChecked, setProfileChecked] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const lang: MotherTongue = profile?.motherTongue ?? "english";
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();
  // Server snapshot is 0 (icon only) — localStorage isn't visible there.
  const gems = useSyncExternalStore(subscribeStats, getGems, () => 0);
  const sparks = useSyncExternalStore(subscribeStats, getSparks, () => 0);

  useEffect(() => startActiveTimeTracking(), []);

  useEffect(() => {
    setProfile(readProfile());
    setProfileChecked(true);
    setInstalled(
      window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true,
    );

    const w = window as Window & { __bip?: InstallPromptEvent | null };
    const pickUpPrompt = () => {
      if (w.__bip) setInstallPrompt(w.__bip);
    };
    pickUpPrompt();
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener("bip-ready", pickUpPrompt);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    try {
      const redirectUrl = new URL(window.location.href);
      if (redirectUrl.searchParams.get("install") === "1") {
        redirectUrl.searchParams.delete("install");
        window.history.replaceState(
          {},
          "",
          redirectUrl.pathname + redirectUrl.search + redirectUrl.hash,
        );
        setShowInstallHelp(true);
      }
    } catch {
      /* URL parsing failed — skip the auto-reopen, rest of the app still works */
    }

    return () => {
      window.removeEventListener("bip-ready", pickUpPrompt);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const saveProfile = (next: Profile) => {
    writeProfile(next);
    setProfile(next);
  };

  const clearAllData = () => {
    try {
      localStorage.clear();
    } catch {
      /* localStorage unavailable — nothing to clear */
    }
    notifyStats();
    setProfile(null);
    setShowClearConfirm(false);
    setShowProfileMenu(false);
    go("home");
  };

  const addToHomeScreen = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      (window as Window & { __bip?: InstallPromptEvent | null }).__bip = null;
      setInstallPrompt(null);
      return;
    }
    const ua = navigator.userAgent;
    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    if (isIOS) setShowInstallHelp(true);
  };
  const go = setScreen;
  const startTest = (testId: string) => {
    const test = findVocabTest(testId);
    if (!test) return;
    requestFullscreen();
    setActiveTest(test);
    go("quiz");
  };
  const startCourseLesson = (unitId: string, lessonId: string) => {
    requestFullscreen();
    void navigate({ to: "/kurs/$unitId/$lessonId", params: { unitId, lessonId } });
  };

  return (
    <div className="app-sky relative min-h-dvh overflow-hidden text-foreground [padding:env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]">
      <header className="relative z-20 mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={() => setShowProfileMenu(true)}
            className="glass-panel grid size-11 shrink-0 place-items-center overflow-hidden rounded-2xl"
            aria-label={t.openProfileMenu}
          >
            <img src="/images/logo.png" alt="" className="size-full object-cover" />
          </button>
          <button
            onClick={() => go("home")}
            className="min-w-0 text-left"
            aria-label="Go to learning path"
          >
            <span className="block truncate font-display text-xl font-extrabold leading-none">
              WortWunder
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              {profile?.name || "Freund"}
            </span>
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Stat icon={<Gem />} value={gems} label={t.gems} />
          <Stat icon={<Zap />} value={sparks} label={t.sparks} />
        </div>
      </header>

      {screen === "quiz" && activeTest && (
        <VocabQuiz
          key={activeTest.testId}
          testId={activeTest.testId}
          words={activeTest.words}
          t={t}
          lang={lang}
          onExit={() => go("home")}
        />
      )}

      {screen !== "quiz" && (
        <main className="relative z-10 mx-auto max-w-5xl px-4 pb-10 sm:px-6">
          {screen === "home" && (
            <Home
              t={t}
              lang={lang}
              onStart={startTest}
              onStartLesson={startCourseLesson}
              name={profile?.name}
              showInstall={!installed}
              onAddToHomeScreen={addToHomeScreen}
            />
          )}
        </main>
      )}

      {profileChecked && !profile && <Onboarding onSubmit={saveProfile} />}
      {showInstallHelp && <InstallHelp t={t} onClose={() => setShowInstallHelp(false)} />}
      {showProfileMenu && (
        <ProfileMenu
          profile={profile}
          onClose={() => setShowProfileMenu(false)}
          onSave={(next) => {
            saveProfile(next);
            setShowProfileMenu(false);
          }}
          onRequestClear={() => setShowClearConfirm(true)}
        />
      )}
      {showClearConfirm && (
        <ClearConfirm t={t} onCancel={() => setShowClearConfirm(false)} onConfirm={clearAllData} />
      )}
    </div>
  );
}

// "45 min", "1 h", "1 h 30 min" — h/min read the same in every UI language.
function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

// A zero count shows just the icon — the number only appears once it's > 0.
function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}) {
  return (
    <span
      className="glass-panel flex items-center gap-1.5 rounded-full px-2.5 py-2 sm:px-3"
      aria-label={`${value} ${label}`}
    >
      <span className="[&_svg]:size-4">{icon}</span>
      {value !== 0 && <span className="font-display text-sm font-bold">{value}</span>}
    </span>
  );
}

type PathNode = {
  id: string;
  title: string;
  icon: React.ReactNode;
  // "soon" marks something that isn't playable yet (the course lessons still
  // to be written): shown muted, with "coming soon" in its meaning line.
  state: "done" | "active" | "soon";
  meaning: string;
  // The course lesson this node opens, if any.
  lesson?: { unitId: string; lessonId: string };
  // The VocabQuiz test this node opens, if any — drives its tier badge and
  // completed tick (see getTestStatus).
  testId?: string;
  // A numbered test's part, shown in a circle after the title ("Hallo ①").
  part?: number;
  children?: PathNode[];
};

// A lesson/test photo filling its round path badge. Falls back to the
// lesson's emoji if the picture is missing (e.g. a lesson re-split into more
// tests than it has icons/test-<part>.jpg files for).
function PathPicture({ src, fallback }: { src: string; fallback: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
      className="size-full rounded-full object-cover"
    />
  );
}

function collectTestIds(nodes: PathNode[]): string[] {
  return nodes.flatMap((node) => [
    ...(node.testId ? [node.testId] : []),
    ...(node.children ? collectTestIds(node.children) : []),
  ]);
}

// A vocab lesson as a path node, expanding to its numbered tests. ÖSD lists
// some Wortschatz lessons again under its own title: those copies get an
// id prefix (node ids must be unique in the tree) but open the same tests,
// so progress is shared between both places.
function lessonPathNode(
  lesson: VocabLesson,
  lang: MotherTongue,
  opts: { idPrefix?: string; title?: string | undefined; meaning?: string | undefined } = {},
): PathNode {
  const { idPrefix = "", title = lesson.title, meaning = lesson.meaning[lang] } = opts;
  return {
    id: `${idPrefix}${lesson.id}`,
    title,
    icon: <PathPicture src={lessonPicture(lesson)} fallback={lesson.icon} />,
    state: "active",
    meaning,
    children: lesson.tests.map((test) => ({
      id: `${idPrefix}${test.testId}`,
      title: `${title} ${test.part}`,
      icon: <PathPicture src={testPicture(lesson, test)} fallback={lesson.icon} />,
      part: test.part,
      state: "active",
      meaning: `${meaning} ${test.part}`,
      testId: test.testId,
    })),
  };
}

// A course unit as a path node, expanding to its lessons. A unit is done
// once every one of its lessons is finished (see course-store.ts).
function unitPathNode(unit: CourseUnit, lang: MotherTongue, finished: Set<string>): PathNode {
  return {
    id: `kurs-${unit.id}`,
    title: unit.title,
    icon: unit.icon,
    state: unit.lessons.every((lesson) => finished.has(lesson.id)) ? "done" : "active",
    meaning: unit.meaning[lang],
    children: unit.lessons.map((lesson) => ({
      id: `kurs-${lesson.id}`,
      title: lesson.title,
      icon: unit.icon,
      state: finished.has(lesson.id) ? "done" : "active",
      meaning: lesson.meaning[lang],
      lesson: { unitId: unit.id, lessonId: lesson.id },
    })),
  };
}

// Wortschatz lessons repeated under the ÖSD section, optionally renamed.
const OESD_LESSONS: {
  lessonId: string;
  title?: string;
  meaning?: Record<MotherTongue, string>;
}[] = [
  { lessonId: WEATHER_LESSON_ID },
  {
    lessonId: FAMILY_LESSON_ID,
    title: "Die Familienmitglieder",
    meaning: {
      english: "Family members",
      tamil: "குடும்ப உறுப்பினர்கள்",
      sinhala: "පවුලේ සාමාජිකයන්",
    },
  },
  { lessonId: HOBBIES_LESSON_ID },
  { lessonId: JOBS_LESSON_ID },
  {
    lessonId: FOOD_LESSON_ID,
    title: "Essen und Trinken",
  },
];

const PATH_MEANINGS = {
  wortschatz: { english: "Vocabulary", tamil: "சொற்களஞ்சியம்", sinhala: "වචන මාලාව" },
  oesd: { english: "ÖSD exam", tamil: "ÖSD தேர்வு", sinhala: "ÖSD විභාගය" },
} satisfies Record<string, Record<MotherTongue, string>>;

// What the "Start lesson" button opens. The course comes first: its first
// unfinished lesson. Once the course lessons written so far are done, it is
// the vocabulary test the learner is partway through if there is one,
// otherwise the first one not finished yet. With everything finished it
// falls back to the first test, for practice.
function nextCourseLesson(finished: Set<string>) {
  for (const unit of COURSE_UNITS) {
    const lesson = unit.lessons.find((l) => !finished.has(l.id));
    if (lesson) return { unitId: unit.id, lessonId: lesson.id };
  }
  return undefined;
}

function nextTestId(statuses: Record<string, TestStatus>): string | undefined {
  const testIds = VOCAB_LESSONS.flatMap((lesson) => lesson.tests.map((test) => test.testId));
  return (
    testIds.find((id) => statuses[id]?.kind === "inProgress") ??
    testIds.find((id) => statuses[id]?.kind !== "completed") ??
    testIds[0]
  );
}

function Home({
  t,
  lang,
  onStart,
  onStartLesson,
  name,
  showInstall,
  onAddToHomeScreen,
}: {
  t: Strings;
  lang: MotherTongue;
  onStart: (nodeId: string) => void;
  onStartLesson: (unitId: string, lessonId: string) => void;
  name?: string | undefined;
  showInstall: boolean;
  onAddToHomeScreen: () => void;
}) {
  const todayMinutes = useSyncExternalStore(subscribeStats, getTodayMinutes, () => 0);
  const goalMinutes = DAILY_GOAL_SECONDS / 60;
  const goalReached = todayMinutes >= goalMinutes;
  // Read after mount, like `statuses` below: course progress lives in
  // localStorage, which the server render can't see.
  const [finishedLessons, setFinishedLessons] = useState<Set<string>>(new Set());
  useEffect(() => {
    reconcileCourse(courseIds());
    setFinishedLessons(new Set(getFinishedLessonIds()));
  }, []);
  const path = useMemo<PathNode[]>(
    () => [
      {
        id: "kurs",
        title: COURSE_TITLE,
        icon: "🎓",
        state: "active",
        meaning: COURSE_MEANING[lang],
        children: [
          ...COURSE_UNITS.map((unit) => unitPathNode(unit, lang, finishedLessons)),
          {
            id: "kurs-more",
            title: "Mehr Lektionen",
            icon: "⏳",
            state: "soon",
            meaning: `${t.moreLessons} · ${t.comingSoon}`,
          },
        ],
      },
      {
        id: "wortschatz",
        title: "Wortschatz",
        icon: "🔤",
        state: "active",
        meaning: PATH_MEANINGS.wortschatz[lang],
        children: VOCAB_LESSONS.map((lesson) => lessonPathNode(lesson, lang)),
      },
      {
        id: "oesd",
        title: "ÖSD",
        icon: "📘",
        state: "active",
        meaning: PATH_MEANINGS.oesd[lang],
        children: OESD_LESSONS.map(({ lessonId, title, meaning }) =>
          lessonPathNode(findVocabLesson(lessonId), lang, {
            idPrefix: "oesd-",
            title,
            meaning: meaning?.[lang],
          }),
        ),
      },
    ],
    [lang, t, finishedLessons],
  );
  // The top-level sections and the course units start open; each vocabulary
  // lesson (Hallo, Familie, ...) expands to its numbered tests on tap.
  const [expanded, setExpanded] = useState<Set<string>>(
    () =>
      new Set([
        ...path.filter((node) => node.children).map((node) => node.id),
        ...COURSE_UNITS.map((unit) => `kurs-${unit.id}`),
      ]),
  );
  const toggleNode = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  // Sections, units and vocabulary lessons toggle open; a course lesson or a
  // vocab test starts playing.
  const handleCardClick = (node: PathNode) => {
    if (node.children?.length) toggleNode(node.id);
    else if (node.lesson) onStartLesson(node.lesson.unitId, node.lesson.lessonId);
    else if (node.testId) onStart(node.testId);
  };
  // Read after mount rather than during render: progress lives in
  // localStorage, which the server render can't see.
  const [statuses, setStatuses] = useState<Record<string, TestStatus>>({});
  useEffect(() => {
    setStatuses(
      Object.fromEntries(collectTestIds(path).map((testId) => [testId, getTestStatus(testId)])),
    );
  }, [path]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr]">
      <section className="glass-panel rounded-[28px] p-5 sm:p-7">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-ink-soft">Hallo, {name || "Freund"}!</p>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Dein Lernweg</h1>
            <p className="mt-1 font-bold text-ink-soft">{t.readyForAdventure}</p>
            {showInstall && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 rounded-xl border-2 border-border bg-card font-display font-extrabold"
                onClick={onAddToHomeScreen}
              >
                <Smartphone /> {t.addToHomeScreen}
              </Button>
            )}
          </div>
          <div className="animate-bob grid size-20 shrink-0 place-items-center overflow-hidden rounded-3xl ring-2 ring-border">
            <img
              src="/images/logo.png"
              alt="WortWunder mascot"
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="mx-auto mt-7 max-w-lg">
          <PathTree
            t={t}
            nodes={path}
            depth={0}
            expanded={expanded}
            statuses={statuses}
            onToggle={toggleNode}
            onCardClick={handleCardClick}
          />
        </div>
      </section>
      <aside className="space-y-5">
        <section className="glass-panel rounded-[28px] p-5">
          <p className="text-sm font-extrabold text-ink-soft">{t.todaysGoal}</p>
          <div className="mt-2 flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-mint/35">
              <Sparkles className="size-8" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-extrabold">
                {goalReached
                  ? t.dailyGoalReached
                  : t.dailyTimeProgress(formatMinutes(todayMinutes), formatMinutes(goalMinutes))}
              </p>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-ice">
                <div
                  className="h-full rounded-full bg-mint transition-[width]"
                  style={{ width: `${Math.min(todayMinutes / goalMinutes, 1) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section>
        <Button
          variant="adventure"
          size="lesson"
          className="w-full"
          onClick={() => {
            const lesson = nextCourseLesson(finishedLessons);
            if (lesson) return onStartLesson(lesson.unitId, lesson.lessonId);
            const testId = nextTestId(statuses);
            if (testId) onStart(testId);
          }}
        >
          {t.startLesson} <Zap />
        </Button>
      </aside>
    </div>
  );
}

const CHEVRON_COLORS = ["bg-mint", "bg-sun", "bg-frost"];

function PathTree({
  t,
  nodes,
  depth,
  expanded,
  statuses,
  onToggle,
  onCardClick,
}: {
  t: Strings;
  nodes: PathNode[];
  depth: number;
  expanded: Set<string>;
  statuses: Record<string, TestStatus>;
  onToggle: (id: string) => void;
  onCardClick: (node: PathNode) => void;
}) {
  return (
    <div className={cn("space-y-2", depth > 0 && "ml-6 mt-2 border-l-2 border-ice pl-4")}>
      {nodes.map((node) => {
        const hasChildren = !!node.children?.length;
        const isExpanded = expanded.has(node.id);
        const openCard = () => onCardClick(node);
        const status = node.testId ? statuses[node.testId] : undefined;
        const childTestIds = node.children ? collectTestIds(node.children) : [];
        const allChildrenDone =
          childTestIds.length > 0 && childTestIds.every((id) => statuses[id]?.kind === "completed");
        const state = status?.kind === "completed" || allChildrenDone ? "done" : node.state;
        const currentTier = status?.kind === "inProgress" ? status.tier : undefined;
        return (
          <div key={node.id}>
            <div
              className={cn(
                "flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-border transition",
                depth === 0 && "p-4",
                state === "soon" && "opacity-70",
              )}
            >
              <button
                type="button"
                onClick={openCard}
                aria-label={node.title}
                className={cn(
                  "relative z-10 grid shrink-0 place-items-center rounded-full border-4 border-frost shadow-md [&>svg]:size-5",
                  depth === 0 ? "size-14 text-2xl" : "size-11 text-lg",
                  state === "done" && "bg-mint",
                  state === "active" && "animate-bob bg-frost",
                  state === "soon" && "bg-frost",
                )}
              >
                {node.icon}
                {state === "done" && (
                  <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-success ring-2 ring-frost">
                    <Check className="size-3 text-primary-foreground" />
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={openCard}
                className="flex min-w-0 flex-1 items-center gap-3 self-stretch text-left"
              >
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-display font-extrabold",
                      depth === 0 ? "text-lg" : "text-base",
                    )}
                  >
                    {node.part === undefined ? (
                      node.title
                    ) : (
                      <>
                        {node.title.slice(0, -String(node.part).length).trimEnd()}{" "}
                        <span className="ml-0.5 inline-grid size-6 place-items-center rounded-full bg-primary align-middle text-sm leading-none text-primary-foreground">
                          {node.part}
                        </span>
                      </>
                    )}
                  </span>
                  <span className="block text-xs font-bold text-ink-soft">{node.meaning}</span>
                </span>
                {currentTier && <TierSteps tier={currentTier} />}
              </button>
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => onToggle(node.id)}
                  aria-label={isExpanded ? t.collapseSection : t.expandSection}
                  aria-expanded={isExpanded}
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full text-foreground shadow-[0_4px_0_rgba(0,0,0,0.18)] transition hover:brightness-105 active:translate-y-1 active:shadow-none",
                    CHEVRON_COLORS[depth % CHEVRON_COLORS.length],
                  )}
                >
                  <ChevronRight
                    className={cn("size-5 transition-transform", isExpanded && "rotate-90")}
                  />
                </button>
              )}
            </div>
            {hasChildren && isExpanded && (
              <PathTree
                t={t}
                nodes={node.children!}
                depth={depth + 1}
                expanded={expanded}
                statuses={statuses}
                onToggle={onToggle}
                onCardClick={onCardClick}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Onboarding({ onSubmit }: { onSubmit: (profile: Profile) => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [motherTongue, setMotherTongue] = useState<MotherTongue>("english");
  const t = TRANSLATIONS[motherTongue];
  const valid = name.trim().length > 0 && Number(age) > 0;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSubmit({ name: name.trim(), age: age.trim(), motherTongue });
        }}
        className="animate-pop glass-panel w-full max-w-sm rounded-[28px] bg-card p-6 sm:p-7"
      >
        <div className="mx-auto grid size-16 place-items-center overflow-hidden rounded-3xl ring-2 ring-border">
          <img src="/images/logo.png" alt="WortWunder" className="size-full object-cover" />
        </div>
        <h2 className="mt-4 text-center font-display text-2xl font-extrabold">Wer bist du?</h2>
        <p className="mt-1 text-center font-bold text-ink-soft">{t.whoAreYouSubtitle}</p>
        <div className="mt-6 space-y-3">
          <div>
            <label
              htmlFor="onboarding-name"
              className="mb-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft"
            >
              {t.nameLabel}
            </label>
            <Input
              id="onboarding-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              autoFocus
              className="h-12 rounded-2xl border-2 border-border bg-glass px-4 font-display text-base font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="onboarding-age"
              className="mb-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft"
            >
              {t.ageLabel}
            </label>
            <Input
              id="onboarding-age"
              type="number"
              min={1}
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t.agePlaceholder}
              className="h-12 rounded-2xl border-2 border-border bg-glass px-4 font-display text-base font-bold"
            />
          </div>
          <MotherTongueField
            label={t.motherTongueLabel}
            value={motherTongue}
            onChange={setMotherTongue}
          />
        </div>
        <Button
          type="submit"
          variant="adventure"
          size="lesson"
          className="mt-6 w-full"
          disabled={!valid}
        >
          Los geht's!
        </Button>
      </form>
    </div>
  );
}

function MotherTongueField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: MotherTongue;
  onChange: (value: MotherTongue) => void;
}) {
  return (
    <div>
      <span className="mb-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      <div className="grid grid-cols-3 gap-2">
        {MOTHER_TONGUES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "h-12 rounded-2xl border-2 font-display text-sm font-extrabold transition",
              value === option.value
                ? "border-primary bg-primary/10"
                : "border-border bg-glass text-ink-soft",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfileMenu({
  profile,
  onClose,
  onSave,
  onRequestClear,
}: {
  profile: Profile | null;
  onClose: () => void;
  onSave: (profile: Profile) => void;
  onRequestClear: () => void;
}) {
  const [name, setName] = useState(profile?.name ?? "");
  const [age, setAge] = useState(profile?.age ?? "");
  const [motherTongue, setMotherTongue] = useState<MotherTongue>(
    profile?.motherTongue ?? "english",
  );
  const t = TRANSLATIONS[motherTongue];
  const valid = name.trim().length > 0 && Number(age) > 0;
  return (
    <div className="fixed inset-0 z-50 flex bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-in-left glass-panel flex h-full w-full max-w-xs flex-col rounded-r-[28px] bg-card p-6"
      >
        <div className="flex items-center justify-between">
          <div className="grid size-12 place-items-center overflow-hidden rounded-2xl ring-2 ring-border">
            <img src="/images/logo.png" alt="WortWunder" className="size-full object-cover" />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label={t.closeMenu}>
            <X />
          </Button>
        </div>
        <h2 className="mt-4 font-display text-xl font-extrabold">{t.aboutMe}</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft"
            >
              {t.nameLabel}
            </label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-2xl border-2 border-border bg-glass px-4 font-display text-base font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="profile-age"
              className="mb-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft"
            >
              {t.ageLabel}
            </label>
            <Input
              id="profile-age"
              type="number"
              min={1}
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-12 rounded-2xl border-2 border-border bg-glass px-4 font-display text-base font-bold"
            />
          </div>
          <MotherTongueField
            label={t.motherTongueLabel}
            value={motherTongue}
            onChange={setMotherTongue}
          />
        </div>
        <Button
          variant="adventure"
          size="lesson"
          className="mt-4 w-full"
          disabled={!valid}
          onClick={() => onSave({ name: name.trim(), age: age.trim(), motherTongue })}
        >
          {t.save}
        </Button>

        <div className="mt-auto border-t border-border pt-4">
          <Button
            variant="outline"
            className="w-full rounded-2xl border-2 border-destructive text-destructive hover:bg-danger-soft"
            onClick={onRequestClear}
          >
            <Trash2 className="size-4" /> {t.clearAllData}
          </Button>
          <p className="mt-4 text-center text-[10px] leading-snug text-ink-soft">
            Lesson photos:{" "}
            <a
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Pexels License
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function ClearConfirm({
  t,
  onCancel,
  onConfirm,
}: {
  t: Strings;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop glass-panel w-full max-w-sm rounded-[28px] bg-card p-6 text-center sm:p-7"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-3xl bg-danger-soft">
          <Trash2 className="size-7 text-destructive" />
        </div>
        <h2 className="mt-4 font-display text-xl font-extrabold">{t.deleteEverythingTitle}</h2>
        <p className="mt-2 font-bold text-ink-soft">{t.deleteEverythingBody}</p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 rounded-2xl" onClick={onCancel}>
            {t.cancel}
          </Button>
          <Button variant="destructive" className="flex-1 rounded-2xl" onClick={onConfirm}>
            {t.yesDelete}
          </Button>
        </div>
      </div>
    </div>
  );
}

function InstallHelp({ t, onClose }: { t: Strings; onClose: () => void }) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isSafari = !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
  const safariLink = (() => {
    if (typeof window === "undefined") return "#";
    const url = new URL(window.location.href);
    url.searchParams.set("install", "1");
    return url.toString().replace(/^https?:\/\//, (m) => `x-safari-${m}`);
  })();

  const steps: { icon: React.ReactNode; text: React.ReactNode; href?: string }[] = [
    ...(!isSafari ? [{ icon: <ExternalLink />, text: t.openInSafariStep, href: safariLink }] : []),
    { icon: <Share />, text: t.tapShareStep },
    { icon: <SquarePlus />, text: t.addToHomeScreenStep },
    { icon: <Check />, text: t.tapAddStep },
    { icon: <Smartphone />, text: t.findIconStep },
  ];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop glass-panel w-full max-w-sm rounded-[28px] bg-card p-6 sm:p-7"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-3xl bg-mint/35">
          <Smartphone className="size-7" />
        </div>
        <h2 className="mt-4 text-center font-display text-xl font-extrabold">
          {t.addToHomeScreen}
        </h2>
        <p className="mt-1 text-center font-bold text-ink-soft">{t.followStepsGrownUp}</p>
        <ol className="mt-5 space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-sun/40 font-display text-base font-extrabold ring-2 ring-border">
                {index + 1}
              </span>
              <div className="rounded-2xl bg-glass p-3 ring-1 ring-border">
                <p className="flex items-start gap-1.5 text-sm font-bold leading-snug">
                  <span className="mt-0.5 shrink-0 text-ink-soft [&_svg]:size-4">{step.icon}</span>
                  <span>{step.text}</span>
                </p>
                {step.href && (
                  <a
                    href={step.href}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 font-display text-sm font-extrabold text-primary-foreground"
                  >
                    {t.openInSafari} <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <Button variant="adventure" size="lesson" className="mt-6 w-full" onClick={onClose}>
          {t.gotIt}
        </Button>
      </div>
    </div>
  );
}
