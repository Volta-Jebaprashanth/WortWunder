// The browser side of the speaking exercises. Two ways to check what the
// learner says, in order of preference:
//   - speech recognition (Chrome on Android and desktop, partly Safari): the
//     browser transcribes the German and course-engine.ts compares it with
//     the target. The audio goes to the browser maker's servers, which the
//     learner is told once (see hasSeenMicNote).
//   - recording (everywhere else with a microphone): the learner hears their
//     own recording next to the model and rates it themselves.
// "Can't speak right now" turns speaking off for the rest of the session;
// the lesson player then shows a listening exercise in its place.

interface RecognitionAlternative {
  transcript: string;
}
interface RecognitionEvent {
  results: ArrayLike<ArrayLike<RecognitionAlternative>>;
}
interface Recognition {
  lang: string;
  maxAlternatives: number;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
}
type RecognitionConstructor = new () => Recognition;

function recognitionConstructor(): RecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as Window & {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function canRecognizeSpeech(): boolean {
  return recognitionConstructor() !== undefined;
}

export function canRecord(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof MediaRecorder !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  );
}

// Why listening ended without anything usable: the microphone is blocked or
// missing ("blocked"), or nothing was understood ("nothing").
export type ListenFailure = "blocked" | "nothing";

// Listens for one German utterance. `done` gets the browser's guesses at
// what was said, best first, or the reason there are none. Returns a
// function that gives up listening.
export function listenOnce(done: (heard: string[], failure?: ListenFailure) => void): () => void {
  const Constructor = recognitionConstructor();
  if (!Constructor) {
    done([], "blocked");
    return () => {};
  }
  const recognition = new Constructor();
  let finished = false;
  const finish = (heard: string[], failure?: ListenFailure) => {
    if (finished) return;
    finished = true;
    done(heard, failure);
  };
  recognition.lang = "de-DE";
  recognition.maxAlternatives = 5;
  recognition.interimResults = false;
  recognition.onresult = (event) => {
    const alternatives = Array.from(event.results[0] ?? [], (a) => a.transcript);
    finish(alternatives, alternatives.length > 0 ? undefined : "nothing");
  };
  recognition.onerror = (event) =>
    finish([], event.error === "no-speech" || event.error === "aborted" ? "nothing" : "blocked");
  recognition.onend = () => finish([], "nothing");
  try {
    recognition.start();
  } catch {
    finish([], "blocked");
  }
  return () => {
    finished = true;
    recognition.abort();
  };
}

// Starts recording from the microphone. The returned `stop` ends it and
// gives an object URL of the recording, to play back.
export async function startRecording(): Promise<{ stop: () => Promise<string> }> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks: Blob[] = [];
  recorder.ondataavailable = (event) => chunks.push(event.data);
  recorder.start();
  return {
    stop: () =>
      new Promise((resolve) => {
        recorder.onstop = () => {
          for (const track of stream.getTracks()) track.stop();
          resolve(URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType })));
        };
        recorder.stop();
      }),
  };
}

// "Can't speak right now", for the rest of the session (until the page is
// reloaded). Subscribable so screens swap as soon as it is set.
let speakingOff = false;
const listeners = new Set<() => void>();

export function isSpeakingOff(): boolean {
  return speakingOff;
}

export function turnSpeakingOff() {
  speakingOff = true;
  for (const listener of listeners) listener();
}

export function subscribeSpeaking(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// The one-line note that speech recognition sends audio to the browser
// maker is shown until the learner has used the microphone once.
const MIC_NOTE_KEY = "wortwunder:mic-note";

export function hasSeenMicNote(): boolean {
  try {
    return localStorage.getItem(MIC_NOTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markMicNoteSeen() {
  try {
    localStorage.setItem(MIC_NOTE_KEY, "1");
  } catch {
    /* localStorage unavailable — the note just shows again */
  }
}
