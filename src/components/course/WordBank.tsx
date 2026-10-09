import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The word-bank answer area: tapping a tile in the pool moves it onto the
// answer line, tapping it there puts it back. `picked` holds indexes into
// `tiles` (not the words themselves) so two tiles with the same word stay
// independent.
export function WordBank({
  tiles,
  picked,
  onPick,
  onUnpick,
  disabled,
  result,
}: {
  tiles: string[];
  picked: number[];
  onPick: (tileIndex: number) => void;
  onUnpick: (position: number) => void;
  disabled: boolean;
  // Set once the answer has been checked, to colour the answer line.
  result?: "correct" | "wrong" | undefined;
}) {
  const tileClass = "h-12 px-4 text-lg";
  return (
    <>
      <div
        className={cn(
          "my-5 flex min-h-32 flex-wrap content-start items-start gap-2 rounded-[24px] border-2 border-dashed border-ring/50 bg-glass p-3",
          result === "correct" && "border-solid border-success bg-success-soft",
          result === "wrong" && "border-solid border-destructive bg-danger-soft",
        )}
      >
        {picked.map((tileIndex, position) => (
          <Button
            key={tileIndex}
            variant="tile"
            disabled={disabled}
            onClick={() => onUnpick(position)}
            className={cn(tileClass, "disabled:opacity-100")}
          >
            {tiles[tileIndex]}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {tiles.map((tile, i) => {
          const used = picked.includes(i);
          return (
            <Button
              key={i}
              variant="tile"
              disabled={disabled || used}
              aria-hidden={used}
              onClick={() => onPick(i)}
              // A used tile keeps its place as an empty slot, so the pool
              // doesn't reflow under the learner's finger.
              className={cn(tileClass, used && "text-transparent shadow-none disabled:opacity-40")}
            >
              {tile}
            </Button>
          );
        })}
      </div>
    </>
  );
}
