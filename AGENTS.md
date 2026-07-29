# Bruce Nkundabagenzi — Portfolio Site

A personal portfolio built to convert remote job applications into interviews. It is itself a work sample — read the relevant file in `context/` before writing any code or copy. Never invent copy, colors, structure, or facts from general training data or a generic portfolio template; this project has its own spec.

## Start here

- `context/project-overview.md` — what this site is, who it's for, the positioning it sells, confidentiality constraint
- `context/build-plan.md` — the numbered feature list; build one feature at a time, in order, launch-gated at feature 12
- `context/progress-tracker.md` — current status, open questions, decisions log. **Update after every completed feature**

## Before touching...

| Task | Read first |
|---|---|
| Any code | `context/architecture.md` (stack, file structure, rendering rules), `context/code-standards.md` (TS/Next/component/a11y rules) |
| Any styling | `context/ui-tokens.md` (design tokens, two-theme system), `context/ui-rules.md` (layout and component specs) |
| Any animation | `context/motion-spec.md` |
| Any copy | `context/content-spec.md` (source of truth for words), `context/profile-facts.md` (source of truth for names/dates/figures) |
| Screenshots | `context/screenshot-spec.md` |
| Branching / commits | `context/git-workflow.md` |
| CV / LinkedIn copy | `context/positioning-draft.md` |

## Non-negotiable invariants

These apply regardless of which numbered feature is in progress.

- **Static export only.** No API routes, no database, no auth, no CMS, no client-side data fetching. Next.js 16 App Router, TypeScript strict, Tailwind v4, MDX content compiled at build time.
- **Server Components by default.** `"use client"` only for the theme toggle and the scroll-reveal observer — a third client component needs a written reason.
- **Semantic tokens only.** Styling uses `bg-surface`, `text-text-primary`, etc. — never a raw Tailwind color, a hex value, or a `dark:` variant. A new semantic token is defined in **both** themes in the same edit (see `ui-tokens.md`).
- **No box-shadows, no second accent color, no skill bars, no logo walls, no card grid for projects, no hamburger menu.** Full "Do Nots" list in `ui-rules.md`.
- **Motion budget is fixed:** one hero moment, interactive feedback, one optional scroll-reveal pattern — nothing else. Animate `transform`/`opacity` only, tokens from `motion-spec.md`, and everything must disable under `prefers-reduced-motion`.
- **Confidentiality is absolute.** Never publish the restaurant-platform client's name, its internal system name, the payment aggregator's name, any `GAP-` identifier, real business data, or employer source code. See `project-overview.md` and `profile-facts.md`.
- **WithinTech Learn ownership boundary.** Never claim the code-execution engine, challenge content, or auth as Bruce's work — full ownership table in `profile-facts.md`.
- **No years-of-experience figure anywhere on the site** — the site claims scope, not tenure (rationale in `profile-facts.md`).
- **Copy lives in `content-spec.md` and MDX files**, never invented inline in component JSX.
- **Accessibility is blocking**, not optional — same severity as a type error. Floor defined in `code-standards.md`.
- **Dependency discipline:** nothing gets installed without a one-line reason recorded in `architecture.md`'s Dependency Policy first.

## Workflow

- Branch and commit per `git-workflow.md` (`<type>/<build-plan-number>-<description>`, Conventional Commits).
- Every feature is verified against the checklist in `code-standards.md` (build clean, lint clean, keyboard pass, reduced-motion pass, both-themes pass, 320px pass) before `progress-tracker.md` is updated.
