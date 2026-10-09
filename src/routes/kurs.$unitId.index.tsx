import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CourseBackdrop,
  CourseHeader,
  CourseNotFound,
  useCourseScreen,
} from "@/components/course/CourseShell";
import { UnitPage } from "@/components/course/UnitPage";
import { COURSE_TITLE, findUnit } from "@/data/course";
import { requestFullscreen } from "@/lib/fullscreen";
import { useCourseProgress } from "@/lib/use-course-progress";

// A course unit's page, e.g. /kurs/u01: can-do list, guidebook, lessons and
// checkpoint.
export const Route = createFileRoute("/kurs/$unitId/")({
  head: ({ params }) => ({
    meta: [{ title: `${findUnit(params.unitId)?.title ?? COURSE_TITLE} — WortWunder` }],
  }),
  component: UnitRoute,
});

function UnitRoute() {
  const { unitId } = Route.useParams();
  const navigate = useNavigate();
  const { ready, lang, t } = useCourseScreen();
  const progress = useCourseProgress();
  const unit = findUnit(unitId);

  return (
    <CourseBackdrop>
      {!unit && <CourseNotFound t={t} />}
      {unit && ready && (
        <>
          <CourseHeader
            label={t.backToPath}
            eyebrow={COURSE_TITLE}
            title={unit.title}
            onBack={() => void navigate({ to: "/" })}
          />
          <UnitPage
            unit={unit}
            progress={progress}
            t={t}
            lang={lang}
            onOpenLesson={(lessonId) => {
              requestFullscreen();
              void navigate({ to: "/kurs/$unitId/$lessonId", params: { unitId, lessonId } });
            }}
            onOpenGuide={() => void navigate({ to: "/kurs/$unitId/guide", params: { unitId } })}
            onOpenCheckpoint={() => {
              requestFullscreen();
              void navigate({ to: "/kurs/$unitId/checkpoint", params: { unitId } });
            }}
          />
        </>
      )}
    </CourseBackdrop>
  );
}
