# @hsin19/content

Everything the homepage says about me: profile, launchpad tiles, projects and experience.

Today these are static JSON files. The site (`apps/web`) reads them **at build time** through a content loader, so the files can later be replaced by an API that returns the same shapes without touching any component.

## Files

| File                   | Shape                                                                           |
| ---------------------- | ------------------------------------------------------------------------------- |
| `data/profile.json`    | One object                                                                      |
| `data/launchpad.json`  | Array of tiles                                                                  |
| `data/projects.json`   | Array of projects; those with `featured` render as large cards                  |
| `data/experience.json` | Array of entries; `draft: true` hides one in production, `todo` flags gaps      |
| `icons/`               | Images referenced from the data by paths relative to `data/` (`../icons/x.svg`) |

## Contract

- Every array item needs a unique string `id`.
- **Array order is display order.** The loader records each item's position, so reordering the JSON reorders the page.
- Fields are validated by the schemas in `apps/web/src/content.config.ts`; a build fails loudly on bad data.
