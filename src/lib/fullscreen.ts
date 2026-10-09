// Asks the browser to go fullscreen when a lesson starts, so the lesson
// fills the phone's screen. Must be called from a tap. Unsupported browsers
// (e.g. iOS Safari) are fine: the layout fills the viewport anyway.
export function requestFullscreen() {
  if (typeof document === "undefined") return;
  const root = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    mozRequestFullScreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  };
  const request =
    root.requestFullscreen ??
    root.webkitRequestFullscreen ??
    root.mozRequestFullScreen ??
    root.msRequestFullscreen;
  try {
    request?.call(root)?.catch?.(() => {});
  } catch {
    /* fullscreen unsupported */
  }
}
