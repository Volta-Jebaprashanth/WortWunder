#!/usr/bin/env bun
// Fails (exit code 1) if the course data is broken: duplicate ids, a missing
// translation, a gap index out of range, a reference to an unknown word or
// sentence, or a sentence without audio. Run with `bun run validate-course`;
// CI runs it on every PR. The checks themselves live in
// src/lib/course-validate.ts so they can be unit tested.

import { existsSync } from "node:fs";
import path from "node:path";
import { COURSE_UNITS, resolveWord } from "@/data/course";
import { COURSE_AUDIO } from "@/data/course-audio.generated";
import { validateCourse } from "@/lib/course-validate";

const PUBLIC_DIR = path.join(path.dirname(import.meta.dir), "public");

const errors = validateCourse(COURSE_UNITS, {
  hasWord: (ref) => resolveWord(ref) !== undefined,
  audioIds: new Set(Object.keys(COURSE_AUDIO)),
});

// The manifest can list a clip that was never written or has been deleted.
for (const [id, clip] of Object.entries(COURSE_AUDIO)) {
  for (const src of [clip.src, clip.slow]) {
    if (!existsSync(path.join(PUBLIC_DIR, src))) errors.push(`${id}: missing file public${src}`);
  }
}

if (errors.length > 0) {
  console.error(`Course validation failed with ${errors.length} problem(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
const sentences = COURSE_UNITS.flatMap((u) => u.lessons.flatMap((l) => l.sentences)).length;
console.log(`Course OK: ${COURSE_UNITS.length} unit(s), ${sentences} sentence(s).`);
