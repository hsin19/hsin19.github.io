# Agent instructions — hsin19.github.io

Personal homepage and portal for Eric Yeh. Read this before writing code.

## Stack

- **Node 26** (`.node-version`), **pnpm 12** (`packageManager` in `package.json`)
- **Astro 7**, static output, deployed to GitHub Pages
- **TypeScript 6** — `astro check` does not support TypeScript 7.0 yet; keep TS on 6.x until it does
- **dprint** for formatting (no Prettier), **oxlint** for linting
- `simple-git-hooks` + `lint-staged` run `dprint fmt` and `oxlint --fix` on pre-commit

## Commands

- `pnpm dev` — dev server on **http://localhost:6476** (Astro 7 daemonizes it; `pnpm astro dev status | logs | stop`)
- `pnpm run check` — format, lint, typecheck and build. **Run before every commit.**

## Conventions

- **English only** in content, code, comments and commit messages. The single exception is the owner's native name (`profile.nativeName`).
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:` …). Commit in meaningful chunks, not baby steps.
- **Content lives in `src/data/`**. Editing a project, a launchpad tile or a job never requires touching a component.
  - Experience entries with `draft: true` render only in dev; `todo` notes show in dev and print as build warnings.
- **Styling**: vanilla CSS. Theme tokens are in `src/styles/global.css` and use `light-dark()`. `light-dark()` only accepts colors — non-color theme values (blend modes, opacity, rotations) must be switched with the `[data-theme]` + `prefers-color-scheme` pair already used there.
- **Theme state**: `data-theme` on `<html>` is set only for a manual override; absent means "follow the system". Listen for the `themechange` event on `document` to react to either.
- **Motion**: everything decorative must respect `prefers-reduced-motion`. Scroll reveals use CSS scroll-driven animations (`.reveal`) guarded by `@supports`.

## The hero stage

`src/components/stage/` is the slot for showier visuals. A `Stage` (see `types.ts`) receives a canvas, renders a still frame under reduced motion, pauses off-screen, and returns a cleanup function. To try a WebGPU or three.js scene, write a new `Stage` and point `HeroStage.astro` at it — nothing else changes. See `docs/ROADMAP.md`.
