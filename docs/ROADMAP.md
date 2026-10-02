# Roadmap

The first version is deliberately calm: ship a clean portal now, keep the doors open for showier work later. Each item below fits the current structure without a rewrite.

## Showier hero stages

The hero renders whatever `Stage` `HeroStage.astro` mounts (`src/components/stage/types.ts`).

- **WebGPU scene** — port the GPGPU leaf / firefly wind field from the earlier three.js prototype as a `Stage`. Load it with a dynamic `import()` only when `navigator.gpu` exists, and keep `fireflies` as the fallback.
- **Pointer and scroll response** — feed scroll progress into the stage so the scene shifts as the hero leaves the viewport.

## /journey — the Yggdrasil story

The three-act illustrated scroll story (dusk sea of clouds → descending the great tree → the forest notice board) lives on the local `rewrite` branch, waiting on illustration assets. When the art is ready:

1. Add `@astrojs/react` and move the React + GSAP + Lenis code into `src/pages/journey.astro` as a `client:only` island.
2. Link to it from the hero as an "experience it" entry point.

The homepage stays fast because the island ships only on `/journey`.

## Writing

Add an Astro content collection (`src/content.config.ts`) for posts or notes, and a `/writing` index. The section components already follow the eyebrow + heading pattern a list page would reuse.

## Smaller ideas

- Serve the site from the `hsin19.com` apex alongside the existing subdomains.
- Generate an Open Graph image at build time (name, seal, palette).
- Show live status dots on launchpad tiles once the services expose CORS-friendly health endpoints.
