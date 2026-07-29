# UI Rules

Layout and component rules. Read alongside `ui-tokens.md` (identity) and `motion-spec.md` (animation). Where a rule here conflicts with a token, the token wins.

---

## Layout Skeleton

```
┌──────────────────────────────────────────────┐
│  header — name/mark left, 3 links right       │  sticky, hairline bottom rule
├──────────────────────────────────────────────┤
│                                              │
│  HERO — eyebrow / headline / subhead / CTAs   │  min-height ~72vh, not 100vh
│                                              │
├──────────────────────────────────────────────┤
│  THE LEDGER — three balancing entries          │  the signature section
├──────────────────────────────────────────────┤
│  WRITING — three recent posts                  │
├──────────────────────────────────────────────┤
│  CONTACT — feature section (--surface-feature)   │
├──────────────────────────────────────────────┤
│  footer — small, mono, one line                 │
└──────────────────────────────────────────────┘
```

- Container `--container` (72rem), gutters `--gutter`, sections separated by `--section-gap`
- Hero is **not** full viewport height: the top of the Ledger must be visible at the fold on a laptop, so the reader knows to keep going
- Exactly one feature (`--surface-feature`) section on the home page. Two would dilute it. Note it goes *dark* against a light page and *lighter* against a dark page — the component just uses `--surface-feature` and `--text-on-feature` and never branches (see `ui-tokens.md`)

---

## The Ledger (signature section)

The one memorable device on the site. Three entries; each is a row whose two halves must agree — left is what was built, right is what it proves. Figures live in the margin, set in mono.

```
 ── 01 ──────────────────────────────────────────────────────
  28 modules          BUILT                  PROVES
  53 gaps found       A multi-tenant         Sole engineer across
  3 apps              restaurant platform…   the whole stack…
  1 engineer
                                             Read the case study →
 ── 02 ──────────────────────────────────────────────────────
```

**Spec**
- Desktop: three columns — margin figures (~14ch, mono, `--accent`), Built (~1fr), Proves (~1fr). Column heads `BUILT` / `PROVES` in mono uppercase `--text-secondary`, rendered once per entry
- A hairline rule (`--rule`) above each entry, with the entry number set in mono, inline with the rule, at the left. Numbering is legitimate here: entries are ordered by evidentiary weight, and the order carries meaning
- The two prose columns are **top-aligned and visually equal in weight** — the balance is the whole point. Never let one side dominate
- Mobile (<768px): stack to figures → BUILT → PROVES, with the rule and number preserved. The metaphor survives stacking because the labels remain
- No cards, no borders around entries, no background fills. Rules and alignment do all the structural work
- The margin figures are real numbers from the work. Never invent one to fill the column; three figures is fine if there are only three true ones

---

## Header

- Name or wordmark left (Fraunces 600), three links right: `Work`, `Writing`, `About`, then the theme toggle
- Sticky, `--surface` background, hairline bottom rule that appears only after scroll (before scroll it's flush with the hero)
- Active route: `--accent` text. Inactive: `--text-secondary`. No underline; color change only
- Mobile: same row, links collapse to smaller mono labels — **no hamburger menu for three links**. The toggle stays visible at all widths

### Theme toggle

**Three states, cycling: `system → light → dark → system`.** Icon plus a short text label, both always visible on desktop. Decided rather than left open — a three-state control is the familiar pattern and it keeps "follow my OS" available as a real choice instead of a hidden default.

```
┌──────────────────────┐
│  ☾   DARK            │   ← icon + mono label, fixed width
└──────────────────────┘
```

**Structure**
- A single `<button>` in the header, after the nav links. Not a dropdown, not three separate controls — one control the reader can click through
- Content: a `lucide-react` icon (`Monitor` for system, `Sun` for light, `Moon` for dark) plus the label in IBM Plex Mono, uppercase, `--text-mono` size, `0.04em` letter-spacing — matching every other label and eyebrow on the site
- Labels: `SYSTEM` / `LIGHT` / `DARK`. The label shows the **selected state**, not the resolved appearance — when set to system, it says `SYSTEM`, never `DARK`, because the point of that state is that it defers
- Styling: transparent background, `1px solid --rule`, `--radius-md`, `--text-secondary` text, icon in `--accent`. Hover: `--accent-wash` fill, border → `--accent`. It is a quiet utility control, never Primary-styled

**Fixed width — this matters.** The three labels have different lengths, so a naturally-sized button reflows the header every time it's clicked, shifting the nav links beside it. Set `min-width` to fit the longest label (`SYSTEM`) and center the contents. A control that makes the page twitch when used is a small bug that reads as carelessness on a site arguing for carefulness.

**Responsive:** below `640px` the label is hidden and the icon stands alone, because the header at 320px has to hold a wordmark, three links, and this control. The accessible name still carries the full state (see below), so nothing is lost for screen-reader users — only visual redundancy. If the label proves important enough to keep at every width, the correct trade is dropping to two nav links, not shrinking the type.

**Accessibility**
- `aria-label` states both the current setting and what the click does, and updates every time: `"Theme: dark. Switch to system."` An icon and a two-word label are not a sufficient accessible name for a control whose meaning is a cycle
- Real `<button>`, so Enter and Space work for free — do not rebuild this on a `div`
- 44×44px minimum hit area even though the visual control is smaller
- **Announce the change via the updating `aria-label` alone — no `aria-live` region.** Resolved, not left open. The button keeps focus after the click that changes state, which is exactly the condition where an updated accessible name gets reliably re-announced — the standard pattern for toggle-style controls (the same technique a mute/unmute button uses). A live region solves a different problem (announcing a change to a user who isn't focused on the thing that changed) and would risk a double announcement stacked on top of the label update. Don't add one here.

**Motion:** icon swap is a 150ms opacity crossfade, label swap is instant. No rotation, no morph, no sliding indicator — see `motion-spec.md`. Under `prefers-reduced-motion`, both swap instantly.

**Pre-hydration:** the inline theme script has already set the class before paint, so the button reads the resolved state on mount and renders the correct icon and label on its first client render. Never render a default state and correct it in an effect — that is a visible flicker on every page load.

---

## Buttons and Links

| Type | Spec |
|---|---|
| **Primary** | `--text-primary` background, `--surface` text, `--radius-md`, `padding: 0.75rem 1.5rem`, Archivo 500. Hover: `--accent` background, `--surface` text |
| **Secondary** | transparent background, `1px solid --text-primary`, `--text-primary` text. Hover: `--accent-wash` fill, border → `--accent` |
| **Text link (inline prose)** | `--accent`, underlined with `text-underline-offset: 0.2em`, `text-decoration-thickness: 1px`. Hover: thickness 2px |
| **Arrow link** (case study, all posts) | `--text-primary` text + `→` in `--accent`. Hover: arrow translates 3px right, text → `--accent` |
| **External link** | same as arrow link but `↗` glyph. Always `rel="noopener noreferrer"`, `target="_blank"` |

Focus visible on every interactive element: `2px solid --accent`, `outline-offset: 3px`. Never remove an outline without replacing it with something at least as visible.

---

## Case Study / Post Pages

- Single column, `--container-prose` (44rem), left-aligned. No sidebar, no floating table of contents in v1
- Header block: title (Fraunces, `--text-h2`), one-line summary (`--text-body-lg`, `--text-secondary`), then a mono meta row — role · timeframe · stack chips · links
- Stack chips: mono, `--text-mono`, `--accent-wash` background, `--radius-sm`, `padding: 0.2rem 0.5rem`. Labels only, no logos
- Prose: `--text-body-lg`, line-height 1.65, paragraph spacing `--space-6`. Headings get `--space-12` above, `--space-4` below
- Code blocks: the fixed code surface (see below), `--radius-lg`, mono, horizontal scroll on overflow — never wrap code. Syntax highlighting build-time only (see `architecture.md`)
- Blockquotes: no quotation-mark decoration; a 2px `--accent` left rule and `--text-secondary` text
- Images/screenshots: `--radius-lg`, `1px solid --rule`, full prose width, with a mono caption beneath in `--text-secondary`. Every image has real alt text describing what it shows, not "screenshot"
- **Screenshots in dark mode:** SubTrack and WithinTech screenshots are light-UI images and will glare against `--surface` in dark mode. Treatment: keep the image unaltered (never CSS-filter a screenshot — it misrepresents the work), but wrap it in a `--surface-raised` frame with `--space-3` padding and a `--rule` border, so the transition from page to screenshot is stepped rather than abrupt. Check every screenshot in dark mode before shipping the page
- Code blocks use a fixed dark background in **both** themes — the dark palette's `--ink-raised` value, referenced through a dedicated `--surface-code` semantic token that resolves to the same value in both themes. This is the one sanctioned place a color does not change with the theme, because code reads as code in an editor regardless of the surrounding page
- Mobile screenshots: present in a simple phone-proportion frame at ~320px wide, two or three side by side on desktop, horizontally scrollable on mobile

---

## Writing Index

A ruled list, not a card grid — it echoes the Ledger without repeating it:

```
 2026 ─────────────────────────────────────────────
  MAR 14   Why financial records should be append-only        6 min
  FEB 02   Running a correct daily job on hosting that sleeps 4 min
```

Date and reading time in mono; title in Archivo 500, `--text-primary`; whole row is the link target; hover fills the row with `--accent-wash`. Year headings in Fraunces with a hairline rule.

---

## About Page

- One headshot on the entire site, and this is its only placement — never in the header, hero, or as a favicon/OG default. The identity is the Ledger, not a personal brand photo; one small, well-placed exception alongside the "human paragraph" (see `content-spec.md`) supports the humanizing goal without competing with it.
- Treatment matches the site's existing image chrome (`ui-tokens.md`'s no-shadow rule): `--radius-lg`, `1px solid --rule`, no CSS filter, no grayscale — real color, presented plainly, the same restraint applied to case-study screenshots
- Size: small and fixed, roughly 140–160px square on desktop (`next/image` with explicit width/height per `code-standards.md`) — a portrait accent next to a paragraph, not a hero banner
- Layout: sits beside the human paragraph on desktop (image left or right, text wraps or sits in a flex row), stacks above it on mobile
- Alt text: the real name (`"Bruce Nkundabagenzi"`), not "headshot" or "photo of the author"

---

## Empty and Failure States

- Writing index with no posts: a single line — `First post is being written.` Never ship a "coming soon" card with a placeholder illustration
- 404: keeps the header and palette, one line (`That page doesn't exist.`) plus a link home. No jokes, no illustration
- Any fetch failure (there should be none — the site is static): fail to readable text, never to a spinner that spins forever

---

## Responsive

Breakpoints: `640px`, `768px`, `1024px`. Design mobile-first; the Ledger's three-column layout is the only structure that genuinely changes shape.

Test at 320px width. Nothing may overflow horizontally at any width — check with `overflow-x` debugging before calling a page done.

---

## Accessibility Floor (non-negotiable)

- Semantic landmarks: one `<h1>` per page, `<main>`, `<nav>`, `<article>` for posts
- Heading levels never skip
- Full keyboard operability; visible focus everywhere; logical tab order
- `prefers-reduced-motion` respected site-wide (see `motion-spec.md`)
- All text meets WCAG AA; interactive targets ≥ 44×44px on touch
- Alt text on every image; decorative images get `alt=""`
- The site is readable and navigable with JavaScript disabled

---

## Do Nots

- No hamburger menu for three links
- No box-shadows (see `ui-tokens.md`)
- No card grid for projects — the Ledger is the projects section
- No skill bars, percentage ratings, or star ratings for technologies
- No technology logo walls
- No "Hi, I'm X 👋" hero, no emoji in headings
- No testimonials until there are real ones with real names and permission
- No cookie banner (the site sets no cookies — see `architecture.md`'s analytics decision; the theme preference uses `localStorage`, which is not a cookie and requires no consent under GDPR as a user-requested preference)
- No theme toggle buried in a footer or a menu — it is a header control or it does not exist
- No CSS filter/invert applied to screenshots to fake dark mode
- No auto-playing video or audio, ever
- No second accent color