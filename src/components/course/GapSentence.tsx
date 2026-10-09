import { cn } from "@/lib/utils";
import { splitAtToken } from "@/lib/course-engine";

// A German sentence with one word left out. The gap shows the option the
// learner has picked, or a blank line until they pick one.
export function GapSentence({
  text,
  token,
  filled,
  result,
}: {
  text: string;
  token: number;
  filled: string | null;
  // Set once the answer has been checked, to colour the gap.
  result?: "correct" | "wrong" | undefined;
}) {
  const { before, after } = splitAtToken(text, token);
  return (
    <p className="mx-auto my-5 max-w-md whitespace-pre-wrap rounded-[28px] bg-card p-5 text-center font-display text-2xl font-extrabold leading-relaxed shadow-inner ring-1 ring-border">
      {before}
      <span
        className={cn(
          "inline-block min-w-16 border-b-4 border-ring/50 px-1 text-primary",
          result === "correct" && "border-success text-success",
          result === "wrong" && "border-destructive text-destructive",
        )}
      >
        {filled ?? " "}
      </span>
      {after}
    </p>
  );
}
