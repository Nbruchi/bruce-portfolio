# Positioning Draft — CV, LinkedIn, and Portfolio Narrative

Placeholders in [brackets] are things only you know — fill them in, and correct anything I've assumed wrongly about your role. Numbers matter enormously in CV bullets: wherever I've written [X], dig up a real figure (locations served, orders processed, team size, modules owned). A bullet with a number is read; a bullet without one is skimmed.

---

## 1. Positioning one-liner

Use this consistently — CV summary, LinkedIn headline, portfolio hero, cover letters. Repetition is what makes a positioning stick.

**Primary:**
> Full-stack product engineer specializing in complex, multi-module backend systems — production experience with payment integrations (mobile money, cards) and tax compliance, shipping web and mobile from a single API.

**Shorter (LinkedIn headline, ~120 chars):**
> Full-Stack Engineer · Multi-module SaaS backends · Payments (MoMo, cards) & compliance · Web + Mobile (Next.js, Nest.js, Expo)

**Shortest (portfolio hero):**
> I build interconnected systems — the kind where inventory, orders, payments, and accounting all have to agree.

---

## 2. CV — Current role

**[Your Title] — [Company Name]**, Kigali, Rwanda · [Start date] – Present

*Sole software engineer on a multi-tenant restaurant management SaaS (NestJS · Next.js · Expo React Native · PostgreSQL · Redis/Bull) with RRA fiscal compliance — [X] businesses, [X] modules. Team of three (designer, deployment engineer, me); I own all application engineering and architecture.*

Pick 5–6 of these; more dilutes. Ordered strongest-first. Lead with the scope bullet — it frames everything after it.

- Sole engineer across the entire stack — backend, web, and mobile — owning architectural decisions end-to-end and working directly with the client on system direction; designer and deployment engineer as the only other team members.

- Leading implementation of RRA VSDC fiscal compliance (CIS specification) across the platform: device registration and TIN validation, automated real-time receipt signing on every sale, and resilient retry via Bull/Redis background workers — including a Redis-lock outbound rate limiter to respect RRA endpoint limits under concurrent load, verified with purpose-built load-testing tooling.
- Conducted a full-system correctness and security audit of a 28-module financial codebase; identified and severity-rated 53 gaps spanning tenant isolation, webhook signature verification, and ledger integrity, then executed a 37-unit remediation program to closure.
- Hardened the double-entry accounting core: append-only journal entries enforced at the ORM layer, reversal linkage preventing double-reversals, accrual-based revenue recognition (revenue at invoice, payments clearing AR), and GL-posting guards blocking deletion of posted financial records.
- Built and maintain interconnected operational modules — orders, real-time stock depletion with append-only movement logs, production recipes, payroll/PAYE, AR/AP, expenses — where a single completed order drives inventory, revenue, tax, and compliance records in one consistent transaction.
- Worked on multi-channel payment acceptance (MTN MoMo, Airtel Money, cards, cash) via the Xentripay aggregator, including webhook processing and [reconciliation / failure handling — keep what you personally did].
- Enforced multi-tenant data isolation across every module: JWT-derived `businessId` scoping on all queries, role-guarded routes for seven business roles across web and mobile clients.
- Migrated the web client's API layer end-to-end: 130+ methods across 13 services and 50+ components, including auth-proxy removal.
- Designed the spec-driven AI-assisted development workflow used on the codebase: binding agent rules, invariant pre-flight checks for financial modules, protected-file boundaries, and mandatory progress/context documentation — enabling safe agentic development inside a production financial system.

**Notes on these bullets:**
- The audit + remediation bullet and the VSDC bullet are your two strongest — they signal correctness engineering and compliance work, which screen well for fintech and B2B SaaS at senior rates. Keep them near the top.
- The last bullet (AI workflow governance) is unusual and 2026-relevant — it's the work version of the SubTrack discipline story. Companies adopting AI coding agents are actively hiring people who know how to govern them in serious codebases.
- The "led/owned" verbs are now accurate as written — you've confirmed you're the sole engineer. Keep them.
- **The "sole engineer" concern is now answered:** the quiet worry that a solo engineer can't collaborate is directly countered by the WithinTech Learn entry — a distributed 3-dev remote team across US/Rwanda timezones. In interviews, pair the two: "At my day job I own the whole system alone; at WithinTech I shipped as part of an async remote team." That combination — deep solo ownership *and* proven remote collaboration — is precisely the profile remote employers want. Still keep the "I had no safety net, so I built one" framing for the RexPlus side.
- Use your real employment title on the CV; add scope in parentheses if the title undersells it — e.g. "Software Developer (sole engineer, full stack)". Never invent a title a reference check would contradict.
- **Confidentiality is absolute:** never publish these context docs, name specific vulnerabilities, or show employer code anywhere public. Patterns and lessons are yours to describe; findings and implementation are the company's. Public writeups about this work should describe hardening in general terms only, and only for issues long since fixed and deployed.

---

## 2b. CV — WithinTech Learn

**[Your role — e.g. Full-Stack Developer] — WithinTech Learn** (learn.withintech.org) · Remote · [dates]
*Clarify how to label this: if paid, it's an Experience entry; if unpaid collaboration, keep it in Experience anyway but describe it as a collaboration — real shipped product with a team beats the Projects section.*

*E-learning platform serving 750+ students, built by a 3-developer remote team across the US and Rwanda — live at learn.withintech.org. pnpm monorepo: Next.js web, Express.js API.*

- Built the platform's learning core: a three-level course hierarchy (course → module → sub-module) with gated progression and quiz assessment at every level.
- Built the automated email engagement system — invitations, reminders, and performance-based rewards for top challenge performers.
- Introduced internationalisation with `next-i18next`, taking the platform from English-only to English, French, and Kinyarwanda.
- Integrated subscription payments with a local fintech provider — sourced the partner and handled the initial configuration.
- Added the platform's dark theme and UI improvements.
- Collaborated async in a distributed team across US and Rwanda timezones, working inside an existing codebase with clear ownership boundaries and no coordination conflicts.

**Do not claim:** the code-execution engine, the challenge problems, or user authentication — all predate this engagement. See `portfolio-context/profile-facts.md`.

---

## 2c. CV — Early Experience (internships)

Keep this section short — two lines each, no bullets. It exists to make the timeline continuous, not to compete with the roles above. Both were completed while studying.

**Developer — TV1**, Kigali, Rwanda · Jan – Jul 2025
- Built a content management system used internally to update the company's websites, with a team of 6.

**Front-end Developer — Creative Tim** · May – Jun 2024
- Built an internal kanban board for organisation-wide task tracking, with a team of 5.

*Note: state "six months" or just the dates for TV1 — 13 Jan to 10 Jul is not seven months, and a duration that contradicts the dates beside it is a needless credibility cost.*

---

## 3. CV — SubTrack entry (Projects section)

**SubTrack** — Full-stack subscription & recurring-expense tracker · Live: subtrack-web-two.vercel.app · [repo URL]

- Solo-built monorepo: Next.js 16 web app, Expo React Native mobile app, and a Nest.js API — both clients consume a single documented contract (Swagger/OpenAPI) with zero drift.
- Automated renewal tracking via daily scheduled jobs writing an append-only payment history; multi-currency support with cached FX rates (scheduled refresh, graceful degradation on cache miss) converting all totals to the user's base currency.
- Engineering discipline throughout: versioned TypeORM migrations from day one, self-rolled JWT auth with per-platform refresh-token transport (httpOnly cookie on web, SecureStore on mobile), strict TypeScript, and browser-verified UI via Playwright.
- [Once deployed:] Live at [URL] — API docs browsable at [URL]/api/docs.

---

## 4. Portfolio "About" narrative

First person, ~200 words. Tone: confident, concrete, zero buzzword padding. Adjust facts to match reality.

---

I'm [Name], a full-stack engineer based in Kigali, Rwanda.

I spend my days as the sole engineer on a multi-tenant restaurant management SaaS — the kind of system where nothing lives alone. An order placed at a till deducts inventory through an append-only movement log, posts to a double-entry ledger, generates a tax-compliant fiscal receipt signed with the revenue authority in real time, and settles through mobile money, card, or cash. I own that whole stack — backend, web dashboard, and the staff mobile app — plus the architectural decisions behind it, working directly with the client on where the system goes next.

That's the work I love: systems where the modules have to agree with each other, and where getting the model wrong in one place breaks truth everywhere else. Being the only engineer on something that handles real money taught me to build my own safety net — append-only financial records, invariants that are enforced rather than hoped for, and audits that treat "it seems to work" as an unproven claim.

That experience shapes how I build. My projects favor a single source of truth behind one API, explicit contracts between parts, versioned migrations, and verification at every step — because I've seen what happens in real businesses when those things are afterthoughts.

Outside my main role I've shipped as part of a distributed remote team: WithinTech Learn (learn.withintech.org), a live e-learning platform serving over 750 students, where I built the course progression and assessment system, the email engagement that keeps students moving, and the translation layer that took it from English-only to three languages — working async with two other developers between the US and Rwanda. I also build and write in public. My current project is SubTrack, a subscription tracker with web and mobile clients on one Nest.js API — multi-currency, scheduled renewal jobs, cached FX conversion — built end-to-end solo, and documented as I go, including how I structure long-running AI-assisted builds so they stay disciplined across dozens of sessions.

I'm open to remote full-stack and backend roles, especially product teams building systems where correctness matters.

---

## 5. Where each piece goes

| Asset | Placement |
| --- | --- |
| One-liner (primary) | CV summary line, cover letter opener |
| One-liner (short) | LinkedIn headline |
| One-liner (shortest) | Portfolio hero section |
| Current-role bullets | CV, LinkedIn experience section |
| SubTrack entry | CV projects section, LinkedIn projects |
| About narrative | Portfolio About page, adapted for LinkedIn About |

## 6. What's still missing (do after SubTrack v1 ships)

1. **Real numbers** for the [X] placeholders — ask at work if you don't know them.
2. **SubTrack polish for reviewers** — deployed ✅; remaining: custom domain, seeded demo account, public API docs link, repo README, mobile screenshots/build (see conversation notes).
3. **Two or three blog posts** to convert private experience into public evidence — patterns and lessons only, zero proprietary detail, zero named vulnerabilities, and only about hardening that shipped long ago:
   - "Why financial records should be append-only (and how to enforce it in TypeORM)" — reversal entries, subscriber guards, `glPosted` one-way transitions; a genuinely useful post that showcases your strongest spike
   - "Governing AI coding agents in a production financial codebase" — binding rules, invariant pre-flight checks, protected files; the work-side companion to the SubTrack workflow story, and rare content in 2026
   - "Real-time fiscal compliance: lessons from integrating a tax authority's receipt-signing API" — rate limiting, queued retries, graceful degradation; general patterns, no RRA-specific internals that aren't already public spec
4. **A GitHub profile README** echoing the one-liner, pinned repos: SubTrack + [project two, later].