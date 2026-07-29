# Code Standards

Implementation rules for the portfolio repo. The site is itself a work sample — a reviewer may open the repo, view source, or run Lighthouse. Write it accordingly.

---

## Engineering Mindset

- Read `content-spec.md` before writing any copy; read `ui-tokens.md` and `ui-rules.md` before writing any styles. Never invent copy or a color at implementation time
- Scope is sacred — build only the current numbered feature from `build-plan.md`
- Every feature is verified before it is called done (see the checklist at the bottom)
- Clean over clever. This codebase is small; there is no excuse for anything hard to read

---

## TypeScript

- Strict mode, no exceptions
- Never `any` — use `unknown` and narrow
- No type assertions unless unavoidable, with a comment explaining why
- Explicit return types on all exported functions
- Frontmatter is validated with `zod` and consumed through the inferred types in `lib/content.ts` — never index into raw frontmatter from a component

---

## Next.js

- App Router only. Every route statically generated; nothing dynamic at request time
- Server Components by default. `"use client"` only where genuinely unavoidable (realistically: the scroll-reveal observer). A second client component needs a written reason
- No API routes, no server actions, no client-side fetching — there is no data source
- `next/image` for every image with explicit width/height; `next/link` for every internal link
- Metadata via the `metadata` export or `generateMetadata` — never a hand-written `<head>`

---

## Components

- Named exports only, one component per file
- Props typed directly above the component
- Folder names kebab-case, component files PascalCase, utilities kebab-case
- Imports via `@/` — never a relative path going up more than one level
- Order inside a file: external imports, internal imports, types, component

---

## Styling

- Tailwind utilities using **semantic tokens only** — `bg-surface`, `text-text-primary`, `border-rule`. Never a raw Tailwind color (`bg-slate-800`), never an arbitrary hex (`bg-[#221A29]`), never a raw palette token (`bg-paper`), never an inline style
- **No `dark:` variants in components.** The semantic layer resolves per theme; if a component seems to need `dark:`, the correct fix is a new semantic token defined in both themes (see `ui-tokens.md`). The one sanctioned exception is code blocks, which are deliberately theme-stable
- Tokens are defined once in `globals.css` under `@theme`. A value used twice becomes a token. Any semantic token added must be defined in **both** themes in the same edit
- No `box-shadow` anywhere (see `ui-tokens.md`)
- Animate only `transform` and `opacity`; durations and easings come from tokens (see `motion-spec.md`)

---

## Content

- Copy lives in `content-spec.md` and MDX files, not in component JSX. If a component contains a sentence of marketing prose, it is in the wrong place
- Every MDX file has complete, valid frontmatter; the build fails otherwise
- `draft: true` never renders in a production build
- Dates are ISO `YYYY-MM-DD`

---

## Accessibility (blocking, not optional)

- One `<h1>` per page; heading levels never skip
- Semantic landmarks: `<main>`, `<nav>`, `<article>`, `<footer>`
- Visible focus on every interactive element; never remove an outline without an equal replacement
- All images have meaningful alt text; decorative images use `alt=""`
- WCAG AA contrast on all text; every new color pairing checked before it ships
- `prefers-reduced-motion` respected site-wide
- Touch targets ≥ 44×44px
- Full text content renders with JavaScript disabled

An accessibility failure blocks a feature the same way a type error does.

---

## Copy Style

Defined in `content-spec.md`'s Voice section. In short: plain, specific, first person, active voice, sentence case, no filler, no self-superlatives, domain jargon always explained on first use.

---

## Environment Variables

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL — resolves `metadataBase`, sitemap, RSS, OG image URLs |

That is the whole list, and it should stay that way. There are no secrets in this project; if a feature introduces one, question the feature.

---

## Verification Checklist (every feature)

- [ ] `pnpm build` passes with zero errors and zero warnings
- [ ] `pnpm lint` and `tsc --noEmit` clean
- [ ] No new `any`, no arbitrary color values, no hardcoded copy
- [ ] Rendered and visually checked in a real browser — not just type-checked
- [ ] Keyboard pass: tab through, focus always visible, order logical
- [ ] Reduced-motion pass: all content visible and readable
- [ ] **Both-themes pass:** the feature checked in light *and* dark — contrast holds, no leaked hardcoded colors, screenshots don't glare, no `dark:` variants introduced
- [ ] 320px pass: no horizontal overflow
- [ ] `progress-tracker.md` updated — feature moved to Completed, next feature identified

## Pre-Launch Checklist (feature 12 only)

- [ ] Lighthouse on the deployed URL: performance ≥ 95, accessibility 100, best practices ≥ 95, SEO 100
- [ ] Home page client JS < 100kb gzipped
- [ ] Tested on throttled Slow 4G and a mid-range Android profile
- [ ] JavaScript disabled: every page's full text content still renders, and the theme falls back to the OS preference
- [ ] **No theme flash:** hard-reload every page in dark mode, cold cache included — zero white flash
- [ ] Every page reviewed in both themes at desktop and mobile widths
- [ ] OG image checked as a real rendered image, not just in code
- [ ] Every external link works; every internal link resolves; no 404s in the sitemap
- [ ] Read every word aloud once — typos on a portfolio cost more than they should
- [ ] Confidentiality review: nothing on the site discloses employer specifics (see `project-overview.md`)