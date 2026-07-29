# Build Plan

Numbered features, built in order, one at a time. Each is small enough to finish and verify in a single session. The numbering is the ticket system — branches and commits reference it (see `git-workflow.md`).

**Sequencing principle:** the site must be *launchable* as early as possible, then improved. Phase 3 is the launch gate — everything after it is enhancement. A deployed site with two case studies beats a perfect unshipped one, and the job search starts the day the link works.

---

## Phase 1 — Foundation

### 01 Project Setup
Next.js 16 (App Router, TypeScript strict), Tailwind v4, ESLint/Prettier, folder structure per `architecture.md`. Commit `context/` in the first commit — it is part of the repo's story.
**Verify:** `pnpm build` clean, dev server renders a placeholder home page.

### 02 Design System Foundation — **both themes**
Tokens from `ui-tokens.md` into `globals.css` via `@theme`: the raw palette for **both** themes plus the semantic layer, defined together in one pass. Tailwind v4 dark variant wired to the `.dark` class on `<html>`. Fonts (Fraunces, Archivo, IBM Plex Mono) via `next/font`, self-hosted, subset. Base element styles, focus-visible ring, `color-scheme: light dark`, the `prefers-reduced-motion` block from `motion-spec.md`, and the no-JS `@media (prefers-color-scheme: dark)` fallback.

Both themes ship in this feature, not later — that is the whole point of doing it upfront. Once components exist, retrofitting means auditing every one of them for leaked light-mode values.

**Verify:** a scratch page rendering every type scale step, every semantic token as a swatch, and a mono figure row — screenshot it in **both** themes, contrast-check every pairing in both, then delete the page.

### 03 Layout Shell + Theme Toggle
`Header` (sticky, hairline-on-scroll), `Footer`, `Container`. Root `layout.tsx` with metadata defaults and the **blocking inline theme script** per `architecture.md`. `ThemeToggle` client component, `localStorage` persistence, `<meta name="theme-color">` per theme. `not-found.tsx`.

Toggle is three-state (`system → light → dark`) with icon + mono label, fixed-width — full spec in `ui-rules.md`.

**Verify:** keyboard tab order correct, focus visible in both themes, no horizontal overflow at 320px, and — the critical one — **hard-reload repeatedly in dark mode and confirm zero white flash**, including on a cold cache and on a client-side navigation. Then confirm the OS-preference default works with `localStorage` cleared, and that the toggle has a correct, updating `aria-label`. Click through all three states repeatedly and confirm **the header does not reflow** — fixed width is part of the spec, not a nicety.

---

## Phase 2 — Content Pipeline

### 04 MDX Pipeline + Content Layer
`lib/content.ts`: read `content/work` and `content/writing`, parse frontmatter with `gray-matter`, validate with `zod` (build fails on a bad file), typed return values, sorting, draft filtering. `lib/reading-time.ts`. Shiki configured build-time.
Uses `next-mdx-remote/rsc` — decision and rationale recorded in `architecture.md`.
**Verify:** a temporary script printing the parsed index of both collections; deliberately break a frontmatter field and confirm the build fails with a readable error.

### 05 Content Components
MDX component overrides per `ui-rules.md`: headings, prose, links, lists, code blocks, blockquotes, images with captions, `StackChips`, `Figure`, mobile-screenshot frame.
**Verify:** a fixture MDX file exercising every element, rendered and screenshotted.

---

## Phase 3 — The Launchable Site *(launch gate)*

### 06 Hero
Copy exactly as written in `content-spec.md`. Eyebrow, headline, subhead, CTA row. The one hero motion moment from `motion-spec.md` — CSS-only initial state so text is present without JS.
**Verify:** readable with JS disabled; reduced-motion shows it immediately; LCP element is the headline.

### 07 The Ledger
The signature section. Three-column desktop grid (figures / BUILT / PROVES), stacked on mobile, hairline rules with mono entry numbers, driven by case-study frontmatter — not hardcoded.
**Verify:** desktop and mobile screenshots; balance visually equal between columns; correct with only two entries present (it will be, briefly).

### 08 Case Study Pages
`/work/[slug]`, statically generated. Header block (title, summary, role, timeframe, stack chips, links), prose body, screenshots. **Write SubTrack and WithinTech Learn first** — SubTrack because it's fully controlled and fresh, WithinTech because the live URL is independent proof.
**Verify:** both pages render, links work, images optimized, metadata and OG image correct per page.

### 09 Writing Index + Post Pages
Ruled-list index grouped by year, post pages, reading time, RSS at `/writing/rss.xml`. Ship with the first post: *"Running a correct daily job on hosting that sleeps"* — shortest, most concrete, and already fully worked out.
**Verify:** index sorted correctly, drafts hidden in a production build, RSS validates.

### 10 About Page
Adapted from `positioning-draft.md`'s About narrative, plus background, current learning, and one human paragraph.

### 11 SEO, Metadata, OG Images
Root layout defaults (`metadataBase`, title template) per `architecture.md`. Static `metadata` exports on `/`, `/about`, `/writing`; `generateMetadata()` on `/work/[slug]` and `/writing/[slug]`, sourced from the same `lib/content.ts` loader the pages render with — never a duplicated title string. `sitemap.ts` and `robots.ts` built from the same content-listing functions. Per-segment `opengraph-image.tsx` on both dynamic routes plus one root-level default for static routes. JSON-LD (`Person` on home, `BlogPosting` on posts) as a literal script tag, not a `metadata` field.
**Verify:** every route has correct title/description via View Source (not just DevTools, since this must work with JS off); OG preview rendered as an actual image per route and checked, including at least one case study and one post; sitemap lists every route including newly-added content; `metadataBase` resolves correctly on the deployed URL, not just localhost.

### 12 Deploy + Custom Domain
Vercel, custom domain, HTTPS, analytics (cookieless or none). Run the full `code-standards.md` pre-launch checklist: Lighthouse, keyboard pass, reduced-motion pass, JS-disabled pass, 320px pass, throttled-connection pass, **and a full both-themes pass over every page**.
**Verify:** the live URL passes every budget in `architecture.md`. **This is the launch gate — start applying with this link the day it passes.**

---

## Phase 4 — Depth (after launch, in priority order)

### 13 Restaurant Platform Case Study
Deliberately last of the three, and written most carefully: it is the strongest evidence *and* carries the confidentiality constraint from `project-overview.md`. **Client approval obtained** for a case study and screenshots, conditioned on never naming the client or the internal system — see `profile-facts.md` and `screenshot-spec.md` for the full boundary, which goes further than the client's stated condition on data and vulnerability detail as a matter of Bruce's own judgment, not something contingent on further permission. No company name, no internal system name, no logos, no real business data. Patterns only — no vulnerabilities, no `GAP-` identifiers, no employer code.

**Review before publishing: Bruce reads it first, the deployment engineer reviews second** — a second set of eyes from someone who knows the system catches what the primary author, too close to the material, tends to miss.

### 14 Post 2 — "Why financial records should be append-only"
The best signal-to-effort post on the list. General patterns, zero employer specifics.

### 15 Post 3 — "Governing an AI coding agent in a codebase where mistakes cost money"
Rare and current. Ties the whole positioning together.

### 16 Scroll Reveal
The optional third motion category from `motion-spec.md`: one pattern, section blocks only, fires once, `IntersectionObserver` with reduced-motion short-circuit.
**Verify:** every section visible under reduced motion and with JS disabled.

---

## Deliberately Out of Scope

- Contact form — mailto and LinkedIn suffice; a form adds spam and a backend dependency
- `/uses` page, project filtering/tags, search, comments, newsletter capture, view counters, i18n
- Any CMS or admin UI

---

## Feature Count

| Phase | Features |
|---|---|
| 1 — Foundation | 3 (01–03) |
| 2 — Content Pipeline | 2 (04–05) |
| 3 — Launchable Site | 7 (06–12) |
| 4 — Depth | 4 (13–16) |
| **Total** | **16** |