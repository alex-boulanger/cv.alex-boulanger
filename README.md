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

| File            | What it holds                                      |
| --------------- | -------------------------------------------------- |
| `profile.ts`    | Name, headline, contact details, summary, PDF name |
| `experience.ts` | Roles, reverse-chronological                       |
| `education.ts`  | Schools and programmes                             |
| `skills.ts`     | Grouped competencies                               |
| `languages.ts`  | Languages and levels                               |
| `types.ts`      | The shape of all of the above                      |

Dates are `YYYY-MM` strings; an `end` of `null` means the role is current.
Durations and the structured data are derived from them — no duration is
written by hand.

## Commands

| Command              | What it does                                        |
| -------------------- | --------------------------------------------------- |
| `pnpm dev`           | Dev server on `localhost:4321`                      |
| `pnpm build`         | Builds `dist/`, then prints the PDF and the OG card |
| `pnpm build:site`    | Builds `dist/` only — faster when styling           |
| `pnpm pdf`           | Prints the PDF from an existing `dist/`             |
| `pnpm preview`       | Serves `dist/` as it will be deployed               |
| `pnpm check`         | Type-checks the project and looks for placeholders  |
| `pnpm check:content` | Fails if any résumé data still says `TODO`          |

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
- The page ships no JavaScript at all.
- The masthead links to the PDF by absolute URL. The file is written into
  `dist/` at build time and `astro dev` only serves `public/`, so a relative
  link would 404 in development.

## Deploying

`.github/workflows/deploy.yml` runs on every push to `main`: content check,
install Chromium, build, print the PDF, then `wrangler pages deploy`. The
project name (`cv`) and the uploaded directory (`dist`) come from
`wrangler.toml`, so the workflow and the config cannot drift apart.

### One-time Cloudflare setup

Everything below is account-level and only needs doing once.

**1. Collect the two values the workflow needs.**

`pnpm dlx wrangler whoami` prints the account ID. For the token, go to
**My Profile → API Tokens → Create Token → Create Custom Token** and grant:

| Scope   | Resource         | Permission |
| ------- | ---------------- | ---------- |
| Account | Cloudflare Pages | Edit       |

Add both as environment secrets in the GitHub environment named `prod` under
**Settings → Environments → prod → Environment secrets**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The workflow creates the `cv` Pages project if it does not already exist.

**2. Push to `main`** so a production deployment exists. A custom domain cannot
be attached to a project that has never deployed.

**3. Attach the subdomain.** In the dashboard: **Workers & Pages → cv → Custom
domains → Set up a custom domain**, and enter `cv.alex-boulanger.dev`.

Because `alex-boulanger.dev` is a zone on the same Cloudflare account,
Cloudflare creates the `cv` CNAME for you and issues the certificate — nothing
to add in DNS by hand. If the zone ever moves off Cloudflare, add a proxied
`CNAME cv → cv.pages.dev` instead.

The same step via the API, if you would rather not click:

```sh
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/cv/domains" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"cv.alex-boulanger.dev"}'
```

### Notes

- `astro.config.mjs` and `src/content/profile.ts` both hardcode
  `https://cv.alex-boulanger.dev`. They drive the canonical URL, the Open Graph
  tags and the PDF link — change them together if the domain changes.
- The project keeps serving `cv.pages.dev` alongside the custom domain. The
  `<link rel="canonical">` in the page points at the custom domain, so search
  engines only index one of them.
- The PDF is published alongside the site at `/alex-boulanger-resume.pdf`.
