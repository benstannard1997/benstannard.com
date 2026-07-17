# Handover — Ben Stannard Portfolio (Astro build)

## What this is
Astro rebuild of the `design_handoff_index_homepage` prototype ("1a — Index" /
"2a" mobile), extended per your scope call: **Series, About, Contact** as real
routes, series authored as **Markdown at compile time**, images **hosted on
Flickr**, and a **carousel** on each series page.

Not a git repo yet — nothing has been committed.

## Stack
- **Astro 7** (static output, `output: 'static'` in `astro.config.mjs`)
- **Cloudflare** via `wrangler.jsonc` — static-assets-only Worker (no server
  code), `assets.directory` points at `./dist`
- No UI framework (React/Vue/etc.) — plain Astro components + scoped `<style>`
- Fonts: Google Fonts (Oxanium + Space Mono), loaded via `<link>` in the layout,
  exactly as the prototype specified

## Commands
```
npm run dev        # astro dev, localhost:4321
npm run build       # -> dist/
npm run check       # astro check (typecheck) — currently 0 errors/warnings/hints
npm run cf-preview   # build, then `wrangler dev` against dist/ (Cloudflare runtime, not Vite)
npm run deploy       # build, then `wrangler deploy` — NOT run; do this yourself
```

## Structure
```
src/
  layouts/Frame.astro       # the ruling frame, header, footer nav, mid-edge labels
  components/Photo.astro    # real <img> OR the prototype's stripe placeholder
  components/Carousel.astro # prev/next + keyboard arrows, wraps both ends
  data/site.ts               # wordmark, tagline, nav, contact links, homepage featured photo
  content.config.ts          # `series` collection schema (Zod v4, via astro/zod)
  content/series/*.md        # the 4 series — THIS is what you edit to add/change work
  pages/
    index.astro               # homepage (1a / 2a)
    series/index.astro         # series ledger (list of series)
    series/[slug].astro        # series detail — carousel + markdown body
    about.astro, contact.astro, 404.astro
  styles/global.css          # design tokens (colours, type scale, spacing) from the handoff
```

## Adding/editing a series
Add a new `.md` file under `src/content/series/`. Frontmatter shape is enforced
by `src/content.config.ts`:
```yaml
title: Gritstone
index: "01"        # shown as "SERIES 01"
year: "2025"
location: Stanage Edge, Peak District   # optional
order: 1            # sort order on the series index
summary: One line, shown on the series ledger
images:
  - src: null       # Flickr direct image URL, or null for the stripe placeholder
    alt: ...
    title: ...
    description: ...   # optional
    href: ...           # optional — links out to the Flickr photo page
```
The markdown body below the frontmatter is the long-form text on the series
detail page. The series index page caps display at 4 entries (per your "up to
4 series" spec) — sorted by `order`, so a 5th file won't appear until you
reorder or raise that cap in `src/pages/series/index.astro`.

**Flickr URLs**: use the direct image URL (`live.staticflickr.com/.../<id>_<secret>_b.jpg`
style), not the photo page URL, for `src`. `href` is the photo page, if you want
the caption to link out.

## What's placeholder / needs real content
- **All photographs** are `src: null` → render as the prototype's diagonal-stripe
  placeholder. Swap in Flickr URLs whenever real images are ready; placeholder
  and its border disappear automatically.
- **About page copy** (`src/pages/about.astro`) is stand-in text — replace with
  Ben's real bio.
- **Contact details** (`src/data/site.ts` → `site.contact`) are placeholder
  email/Instagram/Flickr links — replace with real ones.
- `astro.config.mjs` → `site:` is a placeholder domain; set it to the real one
  before deploying (affects canonical URLs / sitemap-style metadata only).
- `wrangler.jsonc` → `name` is `ben-stannard-portfolio`; rename if you want a
  different Cloudflare project name.

## Design fidelity notes
- Homepage (desktop + mobile) was screenshotted at the prototype's reference
  sizes (1180×840 and 390×800) and matches the `1a`/`2a` blocks in the handoff
  HTML: ruling frame insets, absolute-centred 560px photo, mid-edge labels,
  footer nav, mobile single-column collapse.
- Series/About/Contact are **not** in the original handoff — designed to match
  the same frame/label/monospace language (ledger-style list borrowed from the
  unused "1c — Ledger" alternate direction in the prototype, since it fit a
  list of series better than inventing something new).
- The desktop mid-edge labels (`UNTITLED (PROFILE)` / `WORK ↗`) are homepage-only.
  They're absolutely positioned at the vertical centre of the frame, which only
  works because the homepage's content is centred and narrower than the frame;
  I originally reused them on Series/About/Contact and they overlapped the
  ledger text — removed there, kept only on `/`.
- Carousel stage is capped at 560px (same as the homepage photo) so a series
  page reads as "the same photograph, same place" and controls don't run past
  the frame at desktop width.

## Verified, not just built
- `npm run build` and `npm run check` both clean (0 errors/warnings/hints).
- Screenshotted desktop (1180×840) and mobile (390×800) for `/`, `/series`,
  `/series/gritstone`, `/about`, `/contact` and eyeballed against the handoff.
- Carousel driven end-to-end with Playwright: next/prev, wraps both directions,
  counter updates, arrow keys work, no console errors, and controls correctly
  don't render for a single-image series.
- Ran the **built** output through `wrangler dev` (the actual Cloudflare
  runtime, not Astro's dev server) and hit `/`, `/series`, `/series/gritstone`,
  `/about`, `/contact`, and a bad path.

## Open item — not yet resolved
Under `wrangler dev` against the built `dist/`, the interior routes
(`/series`, `/series/gritstone`, `/about`, `/contact`) came back `307` instead
of `200` (homepage `/` and `/favicon.svg` were fine; `/nope` correctly 404'd).
I was mid-investigation (checking the redirect target — likely Cloudflare's
static-assets handler doing a trailing-slash normalization, e.g. `/series` →
`/series/`) when the session was interrupted. **Before deploying, re-run**:
```
npm run build && npx wrangler dev --port 8788
curl -sD - -o /dev/null http://localhost:8788/series      # check the Location header
curl -so /dev/null -w "%{http_code}\n" http://localhost:8788/series/
```
If it's a plain trailing-slash redirect to a 200, that's normal Cloudflare
Pages/assets behaviour and harmless (browsers follow it transparently) — just
confirm the final response is 200 with real content, not a loop or a 404.
`trailingSlash: 'ignore'` is already set in `astro.config.mjs`; if the redirect
turns out to be a problem you may need `trailingSlash: 'always'` (or the
`assets.html_handling` option in `wrangler.jsonc`) instead.

## Not done
- No `git init` / commit — repo is untracked.
- No actual `wrangler deploy` — needs your Cloudflare auth/account, so I didn't
  run it.
- No sitemap/robots.txt/analytics — didn't come up in scope; ask if wanted.
