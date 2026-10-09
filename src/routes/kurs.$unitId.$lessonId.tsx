import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CourseBackdrop, CourseNotFound, useCourseScreen } from "@/components/course/CourseShell";
import { LessonPlayer } from "@/components/course/LessonPlayer";
import { COURSE_TITLE, COURSE_UNITS, findLesson, findUnit } from "@/data/course";
import { lessonStatus } from "@/lib/course-path";
import { useCourseProgress } from "@/lib/use-course-progress";

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
  const { ready, lang, t } = useCourseScreen();
  const progress = useCourseProgress();
  const unit = findUnit(unitId);
  const lesson = findLesson(unitId, lessonId);
  const locked =
    unit !== undefined &&
    lesson !== undefined &&
    progress.checked &&
    lessonStatus(COURSE_UNITS, unit, lesson.id, progress) === "locked";

  // Lessons open in order: a locked one sends the learner to the unit page,
  // which shows what comes first.
  useEffect(() => {
    if (locked) void navigate({ to: "/kurs/$unitId", params: { unitId }, replace: true });
  }, [locked, navigate, unitId]);

  return (
    <CourseBackdrop>
      {(!unit || !lesson) && <CourseNotFound t={t} />}
      {unit && lesson && ready && progress.checked && !locked && (
        <LessonPlayer
          unit={unit}
          lesson={lesson}
          t={t}
          lang={lang}
          onExit={() => void navigate({ to: "/" })}
        />
      )}
    </CourseBackdrop>
  );
}
