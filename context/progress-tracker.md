# Progress Tracker

Update after every completed feature. Anyone (or any agent) reading this should immediately know what is done, what is next, and what is unresolved.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 01 Project Setup
**Next:** 02 Design System Foundation

---

## Progress

### Phase 1 — Foundation
- [x] 01 Project Setup
- [ ] 02 Design System Foundation
- [ ] 03 Layout Shell

### Phase 2 — Content Pipeline
- [ ] 04 MDX Pipeline + Content Layer
- [ ] 05 Content Components

### Phase 3 — Launchable Site (launch gate)
- [ ] 06 Hero
- [ ] 07 The Ledger
- [ ] 08 Case Study Pages (SubTrack + WithinTech Learn)
- [ ] 09 Writing Index + Post Pages (+ first post)
- [ ] 10 About Page
- [ ] 11 SEO, Metadata, OG Images
- [ ] 12 Deploy + Custom Domain

### Phase 4 — Depth (post-launch)
- [ ] 13 Restaurant Platform Case Study
- [ ] 14 Post 2 — Append-only financial records
- [ ] 15 Post 3 — Governing an AI coding agent
- [ ] 16 Scroll Reveal

---

## Open Questions

Blocking content, not code. Resolve before the features that need them.

- [x] **Domain name** — `brucenkundabagenzi.com`. Buy it early; DNS propagation is not instant
- [x] **Display name** — confirmed: `Bruce Nkundabagenzi`
- [x] **Years of experience** — resolved: no years figure on the site. Pre-Sept-2025 was university work, hackathons, and internships; the site claims scope instead of tenure (see `profile-facts.md`)
- [x] **Internship details** — CreativeTim (May–Jun 2024) and TV1 (Jan–Jul 2025) recorded in `profile-facts.md`; CV only, not the site. Creative Tim confirmed as creative-tim.com — spell it as two words
- [x] **Real figures for the Ledger** — resolved. Entry 01 uses system scale (28 modules, 3 apps/1 API, 53 issues remediated, sole engineer); the customer count (3) stays off the site with a prepared interview answer. Entry 02 uses platform figures from WithinTech's own landing page
- [x] **WithinTech ownership calibration** — resolved. Course structure, quizzes, email engagement, i18n, and dark theme are his; the code-execution engine, challenges, and auth are **not** and are removed from all copy. Payments are "integrated/configured", not "built". Full table in `profile-facts.md`
- [x] **Timezone overlap claim** — computed in `profile-facts.md` (full European day, ~7h US Eastern); confirm sustainability before publishing
- [x] **MDX pipeline choice** — resolved: `next-mdx-remote/rsc`. It matches the already-speced `lib/content.ts` loader (fs read → gray-matter → zod → compile) far better than `@next/mdx`'s bundle-time import model, which doesn't suit a dynamic `[slug]` content collection. Full rationale in `architecture.md`
- [x] **Toggle change announcement** — resolved: `aria-label` update only, no `aria-live` region. Focus stays on the button through the click, which is the reliable case for a re-announced accessible name; a live region would risk double-announcing the same change. Rationale in `ui-rules.md`
- [x] **Restaurant platform disclosure review** — resolved. Bruce reads it first, the deployment engineer reviews second before it publishes

---

- [x] **Screenshot plan** — full shot list per project in `screenshot-spec.md`. Existing SubTrack shots need retaking (browser chrome, personal tab titles, seed-data issues)
- [x] **Client approval for restaurant-platform screenshots** — obtained. Condition: never name the client or the internal system. Full boundary (including Bruce's own added restrictions on real data and vulnerability detail) in `screenshot-spec.md`

---

## Decisions

- **Site title confirmed:** `Software Engineer` on the site, `Digital Apps Developer (Software Engineer — full stack + mobile)` on the CV
- **Domain purchased:** `brucenkundabagenzi.com` on Namecheap, $11.48 first year, Domain Privacy included free/forever, auto-renew on. DNS not yet pointed at Vercel — do this at feature 12 (or earlier if you want zero propagation delay at launch)

- **CV PDF: confirmed yes** — `resume.pdf` in `public/`, linked from the header and About page (see `architecture.md`)
- **Role positioning: full-stack leads, mobile stated explicitly, backend depth proven via case studies rather than led with** — reasoning in `profile-facts.md`'s Role Positioning section
- **Site stays quiet on job-search status** — no “open to work” banner; Bruce is mid-contract on both current engagements and a public banner could unsettle either relationship

- **Next.js 16 + MDX + static export, no CMS** — content is versioned with the code; the site is a work sample in the stack being claimed
- **Fresh identity, not SubTrack's** — teal/Inter/shadowed cards belong to the product being showcased, not the showcase
- **The Ledger as signature section** — the double-entry metaphor encodes the actual engineering thesis (systems where parts must agree) rather than decorating it
- **Dark mode ships in v1, designed upfront** (reversed from the initial plan at the user's call — correctly). Rationale: retrofitting a second theme is painful because components accumulate hardcoded light-mode values, so designing both now forces a two-layer semantic token system that prevents the leak entirely. Both palettes land in feature 02; the toggle lands in feature 03
- **Theme toggle: three states (`system → light → dark`), cycling, icon + mono label** — resolved, no longer open. Fixed button width sized to the longest label so the header never reflows on click; label hides below 640px with the accessible name carrying full state. Spec in `ui-rules.md`
- **Themes are a designed pair, not an inversion** — dark is warm plum-shifted (never neutral black), gold lifts to `#D4A24C` for contrast, and the feature section inverts in opposite directions per theme (darker on light, lighter on dark) through one semantic token
- **Launch at feature 12, not feature 16** — the job search starts when the link works
- **`next.config.ts` sets `output: "export"` and `images.unoptimized: true` from feature 01, not deferred to launch** — static export disables Next's Image Optimization server outright, so leaving `next/image` on its default loader would build clean now and fail the moment `output: "export"` is added later. Setting both together at project setup means every subsequent feature is developed against the real static-export constraint

---

## Session Notes

- Context docs (`project-overview`, `content-spec`, `architecture`, `ui-tokens`, `ui-rules`, `motion-spec`, `code-standards`, `build-plan`, `git-workflow`) written before any code, deliberately — same approach that kept SubTrack coherent across 30+ sessions
- `profile-facts.md` added as the single source of truth for personal facts; `content-spec.md`, `project-overview.md`, `architecture.md`, and `build-plan.md` updated to reference it and to drop the employer's internal system name (client cannot be named — the case study slug is `restaurant-saas`)
- `git-workflow.md` is carried over from SubTrack with only the project name changed; conventions are identical
- Dark mode was added to the plan after the first draft of these docs; `ui-tokens.md` (color system), `ui-rules.md` (toggle, dark-mode screenshots), `architecture.md` (flash prevention, no-JS fallback), `build-plan.md` (features 02/03/12), and `code-standards.md` (semantic-token rule, both-themes verification) were all updated in the same pass — no doc left describing a single-theme site