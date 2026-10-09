import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CourseBackdrop, CourseNotFound, useCourseScreen } from "@/components/course/CourseShell";
import { CheckpointPlayer } from "@/components/course/LessonPlayer";
import { COURSE_TITLE, COURSE_UNITS, findUnit } from "@/data/course";
import { checkpointStatus, hasCheckpoint } from "@/lib/course-path";
import { useCourseProgress } from "@/lib/use-course-progress";

// A unit's checkpoint test, e.g. /kurs/u01/checkpoint.
export const Route = createFileRoute("/kurs/$unitId/checkpoint")({
  head: ({ params }) => ({
    meta: [{ title: `${findUnit(params.unitId)?.title ?? COURSE_TITLE} — WortWunder` }],
  }),
  component: CheckpointRoute,
});

function CheckpointRoute() {
  const { unitId } = Route.useParams();
  const navigate = useNavigate();
  const { ready, lang, t } = useCourseScreen();
  const progress = useCourseProgress();
  const found = findUnit(unitId);
  const unit = found && hasCheckpoint(found) ? found : undefined;
  // Judged once, on arrival: passing the test must not count as "locked".
  const locked =
    unit !== undefined &&
    progress.checked &&
    checkpointStatus(COURSE_UNITS, unit, progress) === "locked";

  // A unit that isn't open yet has no test to take: back to its page.
  useEffect(() => {
    if (locked) void navigate({ to: "/kurs/$unitId", params: { unitId }, replace: true });
  }, [locked, navigate, unitId]);

  return (
    <CourseBackdrop>
      {!unit && <CourseNotFound t={t} />}
      {unit && ready && progress.checked && !locked && (
        <CheckpointPlayer unit={unit} t={t} lang={lang} onExit={() => void navigate({ to: "/" })} />
      )}
    </CourseBackdrop>
  );
}
