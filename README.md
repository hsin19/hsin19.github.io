# hsin19.github.io

Personal homepage and portal of Eric Yeh — who I am, what I've built, and quick links into the tools I run.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

```sh
fnm use            # Node 26, from .node-version
pnpm install
pnpm dev           # http://localhost:6476
pnpm run check     # format, lint, typecheck, build
```

## Where things live

| Path                    | What                                                           |
| ----------------------- | -------------------------------------------------------------- |
| `src/data/`             | All content: profile, launchpad, projects, experience          |
| `src/components/`       | Page sections                                                  |
| `src/components/stage/` | The decorative scene behind the hero (swappable)               |
| `src/styles/global.css` | Theme tokens and base styles                                   |
| `public/seal.svg`       | The seal, vectorized from the original stamp; also the favicon |
| `docs/ROADMAP.md`       | Where this site can grow next                                  |

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`. The repository's Pages source must be set to **GitHub Actions** (Settings → Pages → Build and deployment).
