# Contributing to WortWunder

Thanks for helping people learn German! Contributions of all sizes are welcome:
fixing a typo in a translation, suggesting a better photo, adding a lesson, or
improving the app itself.

By taking part you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug.** Open an issue with the _Bug report_ template.
- **Fix vocabulary.** Found a wrong article, translation or spelling? Open an
  issue with the _Vocabulary fix_ template, or send a pull request.
- **Suggest a feature.** Open an issue with the _Feature request_ template
  before starting large changes, so we can agree on the approach first.
- **Improve translations.** Meanings are shown in English, Tamil and Sinhala.
  Native speakers checking these are especially valuable.

## Development setup

You need [Node.js](https://nodejs.org) 20+ and [bun](https://bun.sh).
`bun.lock` is the only lockfile, so please use bun rather than npm or yarn.

```sh
git clone https://github.com/Volta-Jebaprashanth/wortwunder.git
cd wortwunder
bun install
bun run dev        # http://localhost:8080
```

Before you open a pull request, make sure these pass:

```sh
bun run lint
bun run typecheck
bun run build
```

CI runs the same three checks on every pull request.

## Project conventions

[AGENTS.md](AGENTS.md) documents the architecture and conventions in detail.
The essentials:

- **Adding a lesson:** create a word-list file in `src/data/` (see
  `src/data/family.ts`) and add one entry to `VOCAB_LESSONS` in
  `src/data/lessons.ts`. The learning path and tests are generated from it.
- **Assets:** each lesson has its own folder `public/<section>.<lesson> <name>/`
  with `audio/` (German filenames), `images/` (English filenames, square
  640×640) and `icons/`.
- **Audio** is generated, not recorded: add the word to `WORDS` in
  `scripts/generate-audio.mjs` and run `bun run generate-audio`.
- **Images:** after adding or replacing one, run
  `bun run generate-image-placeholders`, and list the photo's source URL in
  [CREDITS.md](CREDITS.md). Only use images you're allowed to redistribute
  ([Pexels](https://www.pexels.com) is the default source).
- **Generated files** (`src/routeTree.gen.ts`, `src/data/*.generated.ts`) are
  written by tools. Never edit them by hand.
- **Formatting** is handled by Prettier (`bun run format`).

## Pull requests

1. Fork the repository and create a branch from `main`
   (e.g. `fix/familie-articles`, `feat/lesson-sport`).
2. Keep each pull request focused on one change.
3. Write clear commit messages in the imperative mood, e.g.
   `fix: correct article for "das Mädchen"`.
4. Fill in the pull request template, and add screenshots for UI changes.
5. Note that changing a lesson's word count re-splits it into tests and resets
   learners' saved progress for that lesson. Call this out in the PR if it
   applies.

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](LICENSE).
