# QA playbook: testing a lesson in the browser

How to play through a WortWunder lesson as a black-box tester, using the
`selenium-mcp` tools against the user's Chrome. It was written after testing
Grammatik → G1 "Los geht's" (results are in `BUGS-G1.md`). Follow it to test
any other lesson without rediscovering the setup.

## The brief (from the user)

- Act as a professional tester who is fluent in German and English.
- Check that:
  - the **German is correct** (spelling, grammar, articles, verb endings)
  - the **meanings are correct**
  - every **question actually works**
  - the **flow works**: progress, retry and finish
- **Black-box only.** Don't look at the codebase or lesson data to decide what
  is right. Judge every answer from your own German knowledge.
- **Don't check audio or images.** They are already verified.
- Actively look for **meaningless, ambiguous or contradictory questions**:
  - more than one option is defensible
  - no option is right
  - a question contradicts the rule card shown before it
- Deliver a bug report like `BUGS-G1.md`, with severity, steps, expected,
  actual and a suggested fix, plus a "verified working" section.

## 1. Connect

- Chrome runs with `--remote-debugging-port=1997`. 1997 is the **Chrome
  debug port**, not the MCP server's.
- The dev server is `http://localhost:8080`, usually already open in the
  active tab.

```
ToolSearch "select:mcp__selenium-mcp__connectToBrowser,mcp__selenium-mcp__executeScript,mcp__selenium-mcp__click,mcp__selenium-mcp__sendKeys,mcp__selenium-mcp__takeScreenshot"
connectToBrowser { debuggerAddress: "127.0.0.1:1997" }
```

If the connection fails, find the port:
`Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ? CommandLine -match remote-debugging`.

## 2. Known tool limits

- **`startConsoleCapture` / `getConsoleLogs` don't work.** Chrome 155 is
  newer than Selenium's CDP support. Hook `console.error` in the page instead
  (helpers below).
- **`executeScript` times out after 30 s.** Never `await` a long loop.
  Start it without awaiting, then poll a global in later calls
  (`await sleep(25000); return window.__log`).
- **Each `executeScript` is a fresh scope.** Anything reused must live on
  `window`. Functions rebuilt with `eval(fn.toString())` lose their closure,
  so keep helpers like `sleep`, `vis` and `txt` on `window`.
- **Plain `el.click()` doesn't work on drag/sort tiles.** Those listen for
  pointer events. Use `__tap` below, or the Selenium `click` tool.
- **Screenshots:** save them into the scratchpad and view them with `Read`.
  Take one per new screen type, and whenever something looks off.

## 3. Helpers to paste first (one `executeScript` call)

They are installed on `window` and survive until a page reload. The app is a
single-page app, so they last the whole session unless you navigate away.

```js
window.sleep = (ms) => new Promise((r) => setTimeout(r, ms));
window.vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
window.txt = (el) => (el.innerText || "").replace(/\s+/g, " ").trim();

// Console errors
window.__qaErrors = [];
const oe = console.error;
console.error = function (...a) { window.__qaErrors.push(a.map(String).join(" ").slice(0, 300)); return oe.apply(this, a); };
addEventListener("error", (e) => window.__qaErrors.push("X: " + e.message));
addEventListener("unhandledrejection", (e) => window.__qaErrors.push("R: " + e.reason));

// Screen text plus every visible button, input and textarea
window.__dump = () => JSON.stringify({
  text: document.body.innerText.replace(/\n+/g, " | ").slice(0, 900),
  btns: [...document.querySelectorAll("button,input,textarea")].filter(vis).map((b, i) =>
    i + ":" + (b.tagName === "BUTTON"
      ? (txt(b) || b.getAttribute("aria-label") || "")
      : "[" + b.tagName + " val=" + b.value + "]") + (b.disabled ? " (disabled)" : "")),
});

// Find an enabled button by exact text (last = the one lowest on the page)
window.__btn = (t, last) => {
  const l = [...document.querySelectorAll("button")].filter((b) => vis(b) && !b.disabled && txt(b) === t);
  return last ? l[l.length - 1] : l[0];
};
window.__click = async (t) => { const b = __btn(t); if (!b) return "NOTFOUND " + t; b.click(); await sleep(600); return __dump(); };

// Feedback line after Check
window.__fb = () =>
  (document.body.innerText.replace(/\n+/g, " | ").match(/(Richtig!.{0,120}|Fast!.{0,220}|Super!.{0,40})/) || ["(none)"])[0];

// Tap for tiles that need pointer events (sort game)
window.__tap = (el) => {
  const r = el.getBoundingClientRect();
  const o = { bubbles: true, cancelable: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0 };
  for (const [C, t] of [[PointerEvent, "pointerdown"], [MouseEvent, "mousedown"], [PointerEvent, "pointerup"], [MouseEvent, "mouseup"], [MouseEvent, "click"]])
    el.dispatchEvent(new C(t, o));
};

// Replace a gap's dashed blank with "_" to get e.g. "der K_se"
window.__gapTemplate = (btn) => {
  const c = btn.cloneNode(true);
  c.querySelectorAll("svg").forEach((s) => s.remove());
  c.querySelectorAll('[class*="border-dashed"]').forEach((s) => s.replaceWith("_"));
  const wrap = c.querySelector("span");
  const words = [...wrap.children].map((w) => w.textContent.replace(/ /g, "").trim());
  return words.length ? words.join(" ") : wrap.textContent.trim();
};
return "ok";
```

## 4. Opening a lesson or test

The path is on `/`. Lesson and test nodes are found by their exact text.
Clicking a lesson expands it; clicking a test starts it.

```js
const node = (t) => [...document.querySelectorAll("*")].find((e) => e.childElementCount === 0 && e.textContent.trim() === t);
if (!node("ä, ö, ü, ß")) { node("Los geht's").click(); await sleep(600); }
node("ä, ö, ü, ß").click(); await sleep(1000); return __dump();
```

- The finish screen says **"Geschafft!"** and has a **"Back to my path"**
  button.
- Reopening a finished test **restarts it from the beginning**.

## 5. Screen types and how to answer them

The title in `btns[2]` identifies the screen. The flow on every question
screen is: pick an option → **Check** (disabled until something is chosen) →
**"Richtig!"** + **Weiter**, or **"Fast! Versuch's nochmal."** + **Try again**.

### Vocabulary screens (word tests such as G1.1)

| Title | What it asks | How to answer |
| --- | --- | --- |
| Neues Wort | Intro card | Click Weiter |
| Welches Bild ist das? | German word → picture (English caption) | Pick the meaning |
| Was ist das? | Picture → German | Pick the German |
| Was bedeutet das? | German → English | Pick the meaning |
| Was hörst du? | Audio → German | Pick what you hear (see audio note) |
| Welches Bild hörst du? | Audio → picture | Pick the picture |
| Wie sagt man das auf Deutsch? | English → German | Pick the German |
| Baue das Wort | Spell from letter tiles | Tiles are UPPERCASE; the article is dropped. Click tiles in order, or "Type with the keyboard" + `sendKeys` |
| Finde die Paare | Match German ↔ meaning | Click left, then right; wrong pairs flash red with no text |

### Grammar screens (grammar tests such as G1.2–G1.4)

| Title | What it asks | How to answer |
| --- | --- | --- |
| Neue Regel | Rule card | Read it and check its claims for correctness, then Weiter |
| Was passt? | Rule check question | Pick the answer |
| Was fehlt? | Gap: pick the filler | English meaning shown under the sentence |
| Schreib, was fehlt | Gap: type the filler | Letter keys or a real keyboard; case-insensitive |
| Was hörst du? | Pick the sentence heard | See audio note |
| Was bedeutet das? | Sentence → meaning | Pick the meaning |
| Finde die Paare | Pairs board | Click left, then right |
| Sortiere die Wörter | Sort tiles into groups | Tap a tile, then its group. Use `__tap` or Selenium `click`; JS `click()` does nothing |

**Audio note.** You can't hear audio. For listening questions, judge the
option set (are the options distinct and sensible?), then answer. To know
which clip played, hook `fetch` and record `.mp3` URLs: the file name
usually tells you the word. Clips that were cached earlier won't show up.
In that case say in the report that you couldn't verify that one. Listening
correctness is out of scope anyway.

**Sort game gotcha.** A group's button label grows as tiles are added
("Nomen person, thing die Frau …"), so match groups by their heading text
or with `startsWith`, never by exact label.

## 6. How to judge a question

Do this for every question. It is the core of the job.

1. **Fill each option into the gap or pairing**, and ask: is the result
   real, correct German? Does it match the meaning shown?
   - Exactly one option should work. Zero or more than one is a bug.
   - Exception: a second real word ruled out by the meaning hint is only a
     note (sch_n + o = "schon").
2. **Check the question against the rule card shown just before it.** If
   applying the rule correctly gets you marked wrong, that's a
   **contradiction**. Example: G1.3's pairs board rejects "die Zeit" ↔ ei.
3. **Check rule-card claims** as a linguist would: are they true, and would a
   learner who isn't a native English speaker be misled?
4. **Check the meanings**, English and German, for every word and sentence
   shown.
5. **Make at least one deliberate wrong answer per question type.** Check the
   feedback, the hint, "Try again", and that correct work is kept.
6. Note **flow issues**:
   - repeats that feel pointless
   - missing feedback
   - titles that don't match the content
   - instructions that don't say what to do
   - a weak finish screen
7. At the end, check progress:
   `JSON.parse(localStorage.getItem("wortwunder:progress")).tests` should
   show `completed: true` for each test id. The path should show the tick,
   and `window.__qaErrors` should be empty.

Mistakes add extra rounds of that question type. Rule cards, pairs boards
and the sort game come back two or three more times after an error. Budget
for it.

## 7. Automating long tests

A test can have 60–150 screens. Write a loop that reads the screen, decides
the answer from **your own** lexicon or rules, clicks, logs a line, and
repeats. Start it without awaiting, and poll it.

```js
window.__log = []; window.__done = false;
(async () => {
  for (let i = 0; i < 80; i++) {
    const r = await window.__step(); // your solver: returns a log line, or "STOP ..." when it can't decide
    __log.push(r);
    if (r.startsWith("STOP") || r === "FINISHED") break;
  }
})().then(() => (__done = "OK")).catch((e) => (__done = "ERR " + e.stack));
return "started";
```

Then poll with `await sleep(25000); return (__done || "RUNNING") + "\n" + __log.join("\n")`.

- **Log the judgement, not just the click.** For example:
  `tpl="sch_n" hint="beautiful" realWords=[ö,o] meaningFits=[ö]`. That makes
  ambiguity visible in the log.
- **Stop on anything the solver can't decide**, and handle it by hand.
  Unknown screens are where bugs hide.
- **Hand-check ambiguity-prone screens before automating them:** pairs
  boards, the sort game and rule checks.

## 8. Report

- Write `BUGS-<lesson>.md` at the repo root, in the same shape as
  `BUGS-G1.md`:
  - a summary table
  - one section per bug: steps, expected, actual, suggested fix
  - notes
  - verified working
- Rank the severity:
  - **High:** correct answers are rejected, or the content is wrong
  - **Medium:** a misleading explanation, or a definition that contradicts
    the exercise
  - **Low:** wording, flow, polish
