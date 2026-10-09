import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Strings } from "@/lib/i18n";

const SPECIAL_LETTERS = ["ä", "ö", "ü", "ß"];

// The typing answer area: a text field and a row of the letters a learner's
// keyboard usually lacks. A helper letter goes in at the cursor and the
// field keeps the focus, so the phone keyboard stays open.
export function TypeAnswer({
  t,
  value,
  onChange,
  onSubmit,
  disabled,
  result,
}: {
  t: Strings;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  // Set once the answer has been checked, to colour the field.
  result?: "correct" | "wrong" | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const insert = (letter: string) => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? value.length;
    const end = input?.selectionEnd ?? value.length;
    onChange(value.slice(0, start) + letter + value.slice(end));
    // After React has written the new value back into the field.
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + letter.length, start + letter.length);
    });
  };

  return (
    <div className="my-5">
      <Input
        ref={inputRef}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) onSubmit();
        }}
        placeholder={t.typeHere}
        aria-label={t.typeHere}
        lang="de"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="done"
        className={cn(
          "h-14 rounded-2xl border-2 border-border bg-glass px-4 font-display text-lg font-bold disabled:opacity-100 md:text-lg",
          result === "correct" && "border-success bg-success-soft",
          result === "wrong" && "border-destructive bg-danger-soft",
        )}
      />
      <div className="mt-3 flex justify-center gap-2">
        {SPECIAL_LETTERS.map((letter) => (
          <Button
            key={letter}
            variant="tile"
            size="tile"
            disabled={disabled}
            // Keeps the focus (and the phone keyboard) on the text field.
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insert(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
}
