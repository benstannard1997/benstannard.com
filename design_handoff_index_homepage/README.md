# Handoff: Ben Stannard Photography — "Index" Homepage

## Overview
Personal portfolio website for **Ben Stannard**, a photographer based in Sheffield, UK. The site is deliberately photo-centric: a single featured photograph sits at the optical centre of the page inside a thin ruling-line frame, with all navigation, identity, and metadata reduced to small monospace labels around the margins. Colour is intentionally absent from the UI — the only colour on the page comes from the photography itself.

This document covers the chosen direction, **"1a — Index"**, and its mobile behaviour (**"2a"**). Two alternate directions (1b Masthead, 1c Ledger) also exist in the prototype file for reference but are **not** the ones to build.

## About the Design Files
The file in this bundle (`Ben Stannard Portfolio.dc.html`) is a **design reference created in HTML** — a prototype showing the intended look and behaviour, not production code to copy directly. It is authored in a bespoke "Design Component" format (custom `<x-dc>` / `<helmet>` tags) that will **not** run in a normal app.

The task is to **recreate this design in the target codebase's environment** (React, Vue, Astro, plain HTML/CSS, etc.) using that project's established patterns. If no codebase exists yet, choose an appropriate lightweight stack — this is a small, largely static marketing/portfolio site, so a static-site approach (Astro, Eleventy, Next static export, or even hand-written HTML/CSS) is a good fit. Do not ship the `.dc.html` file directly.

## Fidelity
**High-fidelity (hifi).** Colours, typography, spacing, and layout are final and should be recreated precisely. Exact values are given in Design Tokens below. Reproduce the ruling frame, corner labels, centred photo, and monospace caption faithfully.

## Screens / Views

### 1. Homepage — Desktop ("1a — Index")
- **Name**: Homepage / Index
- **Purpose**: Landing page. Presents one featured photograph and gives access to the rest of the site via marginal navigation. First impression is "gallery wall label," not "website."
- **Layout**:
  - Full white page. Reference canvas size **1180 × 840** (treat as a fluid full-viewport page — `100vw × 100vh` with `min-height` — the 1180×840 is the design ratio, not a fixed cap).
  - A **ruling frame**: a 1px solid black rectangle inset **40px** from all four page edges. Purely decorative; `pointer-events: none`.
  - All content sits inside the frame with additional horizontal padding of ~16px (content starts ~56px from page edge).
  - **Top header row** (~14px below the top frame line): space-between flex row. Left = wordmark; right = tagline.
  - **Centred photograph**: absolutely centred in the page (`top:50%; left:50%; translate(-50%,-50%)`), **560px** wide, **4:3** aspect ratio. Monospace caption block centred directly beneath it (18px gap).
  - **Left & right mid-edge labels**: vertically centred against the left and right frame lines (56px from page edge).
  - **Bottom row** (~14px above the bottom frame line): three-part space-between flex row — left index label, centre nav links, right year.
- **Components**:
  - **Wordmark** — text "BEN STANNARD". Oxanium 700, 15px, letter-spacing 4px, black. Top-left.
  - **Tagline** — text "PHOTOGRAPHY — SHEFFIELD, UK". Space Mono 400, 12px, letter-spacing 2px, uppercase, colour `#555`. Top-right.
  - **Photo frame** — 560px wide, 4:3. In the prototype it is a diagonal-stripe placeholder (`repeating-linear-gradient(45deg, #ededeb, #ededeb 11px, #e2e2df 11px, #e2e2df 22px)`) with a 1px `#d0d0cc` border and centred placeholder label "FEATURED PHOTOGRAPH" (Space Mono 11px, letter-spacing 3px, `#9a9a96`, uppercase). **Replace with a real `<img>`, object-fit: cover / contain as appropriate.** The border and placeholder go away once a real image is in.
  - **Caption** — three centred lines, Space Mono 400, 11px, line-height 1.7, letter-spacing 0.5px, colour `#111`:
    - Line 1: `Ben Stannard`
    - Line 2: `Stanage Edge — Coordinates: 53°21′05″N 1°38′08″W`
    - Line 3: `Peak District, England, 2025`
  - **Left mid label** — text "UNTITLED (PROFILE)". Space Mono 12px, letter-spacing 2px. Links to the profile/about view.
  - **Right mid label** — text "WORK ↗". Space Mono 12px, letter-spacing 2px. Links to the work/gallery index.
  - **Bottom-left** — "INDEX 001". Space Mono 12px, letter-spacing 2px. (Current photo's index number.)
  - **Bottom-centre nav** — links, 28px gap: `SERIES`, `ARCHIVE`, `INFO`, `CONTACT`. Space Mono 12px, letter-spacing 2px.
  - **Bottom-right** — "2025 →". Space Mono 12px, letter-spacing 2px.

### 2. Homepage — Mobile ("2a", ≤ ~480px)
- **Name**: Homepage / Index (mobile)
- **Purpose**: Same content, single-column.
- **Layout** (reference 390px wide):
  - Ruling frame inset reduces from 40px to **16px**.
  - Inner content padding ~20px/22px.
  - Vertical flow instead of absolute centring: **header block → flexible centred photo area → sitemap footer** (`display:flex; flex-direction:column`, the photo area is `flex:1` and centres its contents vertically).
  - Header: wordmark on line 1, tagline on line 2 (tagline drops to 10px).
  - Photo: full content-width, still 4:3, stripe placeholder 10px/20px scale. Caption beneath, Space Mono 10px (coordinate line shortened to `Stanage Edge — 53°21′05″N 1°38′08″W`).
  - The left/right mid-edge labels are **dropped** on mobile (they don't fit); their destinations move into the footer nav.
  - Footer: 1px black top border, then nav links wrapping (`flex-wrap`, gap 10px×20px): `SERIES ARCHIVE INFO CONTACT`; below that a space-between row: `INDEX 001` (left) and `2025 →` (right), colour `#555`. All Space Mono 11px, letter-spacing 2px.
- **Breakpoint guidance**: single mobile breakpoint around **480px**. Between 480px and the desktop layout, the desktop absolute-centred layout scales down gracefully; you may introduce a tablet tweak if the mid-edge labels crowd the photo, but it isn't required.

## Interactions & Behavior
- **Links / navigation**: default `<a>` colour is `inherit` (black) with **no underline**; on **hover**, colour stays black and an **underline** appears with `text-underline-offset: 3px`. Apply this globally to all anchors.
- The marginal labels are the entire navigation system — each is a real link to its destination (Series, Archive, Info, Contact, Work, Profile).
- **Featured photo**: on a real site this would likely link through to the corresponding project/series page, and/or advance to the next photo. Not specified in the prototype — confirm intended behaviour with the client. A minimal build can make the whole photo a link to `WORK`.
- No animations in the prototype. Keep it quiet; if anything, a subtle fade-in on the photo is acceptable but optional.
- **Responsive**: see the two screens above. Desktop = absolute-centred with margin labels; mobile = single-column with footer nav.

## State Management
Essentially **static**. No client state required for the homepage as designed. If the featured photo becomes a rotating/selectable set, you'd need:
- `currentIndex` — which photo is featured (drives "INDEX 001", caption, and the image src).
- Photo list data (see below). Otherwise none.

## Content / Data Model
Each photograph entry needs: `image` (asset), `title` (e.g. "Untitled (Profile)"), `caption` lines (`location` + `coordinates`, `place, year`), `index` (e.g. "001"), and `year`. The homepage renders one such entry as the featured image.

## Design Tokens

### Colours
| Token | Hex | Usage |
|---|---|---|
| Page background | `#ffffff` | Page / all screens |
| Foreground / ink | `#000000` | Frame lines, wordmark, primary labels |
| Muted text | `#555555` | Tagline, secondary footer labels |
| Caption text | `#111111` | Photo caption |
| Placeholder stripe A | `#ededeb` | Photo placeholder only (remove with real images) |
| Placeholder stripe B | `#e2e2df` | Photo placeholder only |
| Placeholder border | `#d0d0cc` | Photo placeholder border |
| Placeholder label | `#9a9a96` | Placeholder caption text |
| Canvas/desk (prototype only) | `#c9c9c7` | Background *behind* the page in the prototype — do **not** use in the real site |

**Note on colour:** the brand rule is *white background, black type, and all other colour comes from the photography.* Do not introduce accent colours.

### Typography
- **Display / wordmark**: **Oxanium** (Google Fonts), weights 200–800. Used for the "BEN STANNARD" wordmark (700). This is the brand's chosen face (client referenced Oxanium directly).
- **UI / captions / labels**: **Space Mono** (Google Fonts), 400 & 700. Used for every marginal label, the tagline, and the photo caption.
- Fonts loaded via: `https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap`

Type scale actually used:
| Element | Family | Weight | Size | Letter-spacing | Transform |
|---|---|---|---|---|---|
| Wordmark | Oxanium | 700 | 15px (14px mobile) | 4px (3px mobile) | as typed (caps) |
| Tagline | Space Mono | 400 | 12px (10px mobile) | 2px | uppercase |
| Photo caption | Space Mono | 400 | 11px (10px mobile) | 0.5px | none |
| Placeholder label | Space Mono | 400 | 11px (10px mobile) | 3px | uppercase |
| Margin labels / nav | Space Mono | 400 | 12px (11px mobile) | 2px | as typed (caps) |

### Spacing / geometry
- Frame inset: **40px** desktop / **16px** mobile.
- Content inset from frame: ~16px (so ~56px from page edge desktop).
- Featured photo width: **560px** desktop / full content-width mobile. Aspect ratio **4:3**.
- Caption top margin: 18px desktop / 14px mobile.
- Bottom nav link gap: 28px desktop; mobile footer gaps 10px (row) × 20px (column).
- Borders: all rules are **1px solid #000**.

### Border radius / shadows
- **None.** No rounded corners, no shadows anywhere. Hard 1px black lines only.

## Assets
- **Photography**: not included — supplied by the client (Ben Stannard). All photo areas are stripe placeholders in the prototype; swap in real images. The site's entire colour palette derives from these.
- **Fonts**: Oxanium + Space Mono from Google Fonts (self-host for production if preferred).
- **Icons**: none. The only glyphs are typographic arrows (`↗`, `→`) set in Space Mono.

## Files
- `Ben Stannard Portfolio.dc.html` — the prototype. Look for:
  - `id="1a"` block — **desktop Index homepage (the design to build)**.
  - `id="2a"` block — **mobile Index homepage**.
  - `id="1b"` (Masthead) and `id="1c"` (Ledger) — alternate directions, **not** selected; reference only.
