import { useEffect, useState } from "react";
import { courseIds } from "@/data/course";
import type { CourseProgress } from "@/lib/course-path";
import {
  getFinishedLessonIds,
  getPassedCheckpointUnitIds,
  reconcileCourse,
} from "@/lib/course-store";

// The learner's saved course progress, read after mount (the server render
// can't see localStorage). `checked` turns true once that read has happened,
// so a screen can tell "nothing finished" apart from "not looked yet".
export function useCourseProgress(): CourseProgress & { checked: boolean } {
  const [state, setState] = useState<CourseProgress & { checked: boolean }>({
    finishedLessons: new Set(),
    passedCheckpoints: new Set(),
    checked: false,
  });
  useEffect(() => {
    reconcileCourse(courseIds());
    setState({
      finishedLessons: new Set(getFinishedLessonIds()),
      passedCheckpoints: new Set(getPassedCheckpointUnitIds()),
      checked: true,
    });
  }, []);
  return state;
}
