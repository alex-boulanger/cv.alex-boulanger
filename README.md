# cv.alex-boulanger.dev

One résumé, three outputs: a web page, a print stylesheet, and a PDF printed
from that page. The data lives in TypeScript and nothing downstream duplicates
it.

```
src/content/*.ts ──▶ Astro components ──▶ HTML ──┬──▶ browser
                                                 └──▶ Playwright ──▶ PDF
```

## Editing the résumé

Everything a reader sees comes from `src/content/`:

| File            | What it holds                                       |
| --------------- | --------------------------------------------------- |
| `profile.ts`    | Name, headline, contact details, summary, PDF name   |
| `experience.ts` | Roles, reverse-chronological                         |
| `education.ts`  | Schools and programmes                               |
| `skills.ts`     | Grouped competencies                                 |
| `languages.ts`  | Languages and levels                                 |
| `types.ts`      | The shape of all of the above                        |

Dates are `YYYY-MM` strings; an `end` of `null` means the role is current.
Durations, the tenure bars and the structured data are all derived from them —
no duration is written by hand.

## Commands

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `pnpm dev`             | Dev server on `localhost:4321`                       |
| `pnpm build`           | Builds `dist/`, then prints the PDF and the OG card  |
| `pnpm build:site`      | Builds `dist/` only — faster when styling            |
| `pnpm pdf`             | Prints the PDF from an existing `dist/`              |
| `pnpm preview`         | Serves `dist/` as it will be deployed                |
| `pnpm check`           | Type-checks the project and looks for placeholders   |
| `pnpm check:content`   | Fails if any résumé data still says `TODO`           |

The PDF needs Chromium once: `pnpm exec playwright install chromium`.

## How the PDF stays identical

`scripts/generate-pdf.ts` serves the built `dist/` over localhost, loads the
real page in Chromium, waits for the web fonts, and prints it. `print.css`
pins the palette back to light, sets A4 and margins in `@page`, and keeps roles
from splitting across pages. There is no second template to keep in sync.

## Design notes

- Single column, semantic HTML, real headings — parsers and screen readers get
  the same document a person does.
- Space Grotesk and IBM Plex Mono are self-hosted in `public/fonts/`; no third-party
  requests at runtime.
- Dark mode follows the system on screen. The PDF is always light.
- The tenure bar next to each role is the one piece of ornament, and it is
  drawn from the dates: all bars share a scale, so tenure is visible at a
  glance.

## Deploying

`.github/workflows/deploy.yml` runs on every push to `main`: content check,
install Chromium, build, print, then `wrangler pages deploy dist`.

Two repository secrets are required:

- `CLOUDFLARE_API_TOKEN` — a token with the **Cloudflare Pages: Edit**
  permission
- `CLOUDFLARE_ACCOUNT_ID`

The workflow deploys to a Pages project named `cv`; change `--project-name` if
yours differs. Point `cv.alex-boulanger.dev` at the project under **Custom
domains**.

The PDF is published alongside the site at
`/alex-boulanger-resume.pdf`.
