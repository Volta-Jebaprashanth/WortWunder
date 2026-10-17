import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

// Desktop-only choice between an iPad Air sized tablet frame and an iPhone
// 17 Pro Max sized phone frame (styles.css). The choice lives in
// localStorage and is applied as <html data-view="tablet|phone"> — before
// hydration by the inline script in __root.tsx, then here whenever it changes.
export const DESKTOP_QUERY = "(hover: hover) and (pointer: fine)";
export const VIEW_KEY = "wortwunder:desktop-view";
type View = "phone" | "tablet";

function readView(): View | null {
  try {
    const saved = localStorage.getItem(VIEW_KEY);
    return saved === "phone" || saved === "tablet" ? saved : null;
  } catch {
    return null;
  }
}

export function DesktopViewSwitch() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    setIsDesktop(window.matchMedia(DESKTOP_QUERY).matches);
    setView(readView());
  }, []);

  const choose = (next: View) => {
    setView(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {
      /* localStorage unavailable — the choice still applies for this visit */
    }
    document.documentElement.setAttribute("data-view", next);
    (window as { __fitFrame?: () => void }).__fitFrame?.();
  };

  if (!isDesktop) return null;

  if (view === null) {
    return (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="desktop-view-title"
          className="animate-pop glass-panel w-full max-w-sm rounded-[28px] bg-card p-7 text-center"
        >
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-mint/35">
            <Smartphone className="size-8" />
          </div>
          <h2 id="desktop-view-title" className="mt-4 font-display text-2xl font-extrabold">
            Made for phones
          </h2>
          <p className="mt-2 font-bold text-ink-soft">
            WortWunder is built to be used on a phone. Show it the way it looks on one?
          </p>
          <div className="mt-6 grid gap-2">
            <Button
              size="lg"
              className="rounded-2xl font-display text-base font-extrabold"
              onClick={() => choose("phone")}
            >
              <Smartphone /> Yes, phone view
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-2xl font-display text-base font-extrabold"
              onClick={() => choose("tablet")}
            >
              <Monitor /> No, keep the bigger view
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const other: View = view === "phone" ? "tablet" : "phone";
  return (
    <button
      type="button"
      onClick={() => choose(other)}
      className="glass-panel fixed right-4 bottom-4 z-[100] flex items-center gap-2 rounded-full px-4 py-2.5 font-display text-sm font-extrabold transition hover:bg-card"
    >
      {other === "phone" ? <Smartphone className="size-4" /> : <Tablet className="size-4" />}
      {other === "phone" ? "Phone view" : "Tablet view"}
    </button>
  );
}
