import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CourseBackdrop,
  CourseHeader,
  CourseNotFound,
  useCourseScreen,
} from "@/components/course/CourseShell";
import { Guidebook } from "@/components/course/Guidebook";
import { COURSE_TITLE, findUnit } from "@/data/course";

// A unit's guidebook, e.g. /kurs/u01/guide.
export const Route = createFileRoute("/kurs/$unitId/guide")({
  head: ({ params }) => ({
    meta: [{ title: `${findUnit(params.unitId)?.title ?? COURSE_TITLE} — WortWunder` }],
  }),
  component: GuideRoute,
});

function GuideRoute() {
  const { unitId } = Route.useParams();
  const navigate = useNavigate();
  const { ready, lang, t } = useCourseScreen();
  const unit = findUnit(unitId);

  return (
    <CourseBackdrop>
      {!unit && <CourseNotFound t={t} />}
      {unit && ready && (
        <>
          <CourseHeader
            label={t.backToUnit}
            eyebrow={unit.title}
            title={t.guidebook}
            onBack={() => void navigate({ to: "/kurs/$unitId", params: { unitId } })}
          />
          <Guidebook unit={unit} t={t} lang={lang} />
        </>
      )}
    </CourseBackdrop>
  );
}
