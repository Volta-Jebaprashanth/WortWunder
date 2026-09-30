<!-- markdownlint-disable-next-line MD041 MD033 -->
<p align="center"><img src="public/images/logo.png" alt="WortWunder logo: a friendly fox waving a German flag and saying Hallo!" width="180"></p>

# 🌟 WortWunder

**Master every word you need for the German A1 exam, one playful lesson at a time.**

Passing Goethe or ÖSD A1 starts with vocabulary. WortWunder turns the A1 word list
into short, game-like sessions with real photos, native-sounding audio and a
learning path that shows your progress. Finish a section and you'll know every word in it.

👉 **[Try it now](https://wortwunder.voltajeba.com/)**, free in your browser and installable on your phone.

---

## Why WortWunder?

Most learners preparing for A1 know the frustration: you read a word list, you
understand it, and a week later it's gone. WortWunder is built around one
idea: **you don't finish a word until you really know it.**

- 🎯 **Built for the A1 exam.** 30 lessons and 1,100+ words cover the topics A1
  tests ask about: greetings, family, food, home, shopping, time, travel,
  health, work, numbers, verbs, prepositions and more.
- 🧠 **Made to stick.** Every word goes through 11 kinds of exercises, from
  easy recognition to spelling it from memory. A word only counts as learned
  when you've passed all of them.
- 📸 **Real photos.** Each word is shown with a real photo of the thing or
  action, which is easier to remember than a translation.
- 🔊 **Hear every word.** Clear neural-voice pronunciation for every word, so
  you practise listening and speaking along with reading.
- 🇩🇪 **der, die, das from day one.** Every noun is taught with its article, so
  you never have to go back and relearn genders.
- 🌍 **Learn in your language.** Meanings are shown in **English, Tamil or
  Sinhala**.
- 👨‍👩‍👧 **For every age.** Anyone can use it: an adult getting ready for a visa or
  integration exam, a student, or a child learning their first German words.

---

## How it works

### 1. Follow the path

Your learning path is split into sections, and each section into small tests
of 10–15 words. Short tests keep each session quick, so you can do one on the
bus or during a coffee break.

### 2. Level up through five tiers

Each test takes you through five tiers of difficulty. The next tier opens only
after you've cleared the one before it:

| Tier | What you do |
| --- | --- |
| 🌱 **Training** | Meet the word with its picture, sound and meaning |
| ⭐ **Basic** | Match the word to the right picture |
| 🟢 **Easy** | Picture → word, word → meaning, listen and choose |
| 🟡 **Medium** | Fill in missing letters, listen → picture, translate |
| 🔴 **Hard** | Spell it from scratch, spell what you hear, match pairs |

If you get a word wrong, it comes back until you get it right.

### 3. Become a vocab expert

When you finish a section, you have practised every word in it: you've seen
it, heard it, recognised it and spelled it. You know the word, not just its
translation.

### 4. Practise for the real exam

The **ÖSD** section groups the same lessons under the topic names used in the
exam, so you can revise by exam topic. Your progress is shared between both
views.

---

## What's inside

| | |
| --- | --- |
| 📚 Lessons | 30 A1 topics |
| 🔤 Words | 1,100+ |
| 🧩 Exercise types | 11 |
| 🗣️ Meaning languages | English · தமிழ் · සිංහල |
| 📱 Platforms | Any browser, installable as an app on Android & iOS |
| 💸 Price | Free, a non-profit learning project |

---

## Install it like an app

WortWunder is a Progressive Web App. Open it on your phone and tap **Install**
(on Android) or **Share → Add to Home Screen** (on iPhone). It launches full
screen, just like a native app.

---

## For developers

WortWunder is built with TanStack Start, React 19, Tailwind CSS v4 and
shadcn/ui, and uses [bun](https://bun.sh).

```sh
bun install
bun run dev      # start the dev server
bun run build    # production build
bun run lint     # lint
```

Adding a new lesson takes a word-list file in `src/data/` and one entry in
`src/data/lessons.ts`. See [AGENTS.md](AGENTS.md) for the full architecture,
asset conventions and audio/image workflow. Photo credits are listed in
[CREDITS.md](CREDITS.md).

The first UI prototype was scaffolded with [Lovable](https://lovable.dev). Everything
since, including the learning path, the tiered quiz engine, the A1 vocabulary,
photos and audio, has been designed and built by hand.

---

Viel Erfolg bei deiner A1-Prüfung! 🍀
