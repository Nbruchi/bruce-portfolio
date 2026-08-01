# Content Spec

The actual words on the site. **This file is the source of truth for copy — build to it rather than inventing text at implementation time.** Copy is what makes a portfolio feel templated or real; it deserves the same discipline as the code.

Confirmed personal facts live in `profile-facts.md` — that file is the source of truth for names, dates, links, and figures. Placeholders in `{braces}` below are still unresolved there. Anything marked **[VERIFY]** is a claim that must be confirmed accurate before it ships.

---

## Voice

Plain, specific, first person. Short sentences. Concrete nouns over adjectives — "append-only journal entries" not "robust financial architecture." No superlatives about yourself ("passionate," "results-driven," "ninja"), no third-person bio, no exclamation marks.

Assume the reader is a competent engineer who is skeptical and busy. Earn each sentence.

**Domain terms get a half-sentence of plain English on first use**, every time: "RRA VSDC (Rwanda's electronic invoicing system — every sale must be cryptographically signed and reported to the tax authority in real time)." A reader in Berlin or Austin does not know these acronyms, and unexplained jargon reads as padding rather than depth.

---

## Home — Hero

**Eyebrow (mono, small):**
> Kigali, Rwanda · Available for remote roles

**Headline (display):**
> I build systems where every part has to agree with the others.

**Subhead (body, max ~2 lines):**
> I'm the sole engineer on a restaurant management platform that handles inventory, double-entry accounting, multi-channel payments, and real-time tax compliance — where one wrong number in one module makes every other module lie. Full-stack, web and mobile, with a lot of that depth on the backend.

**No years-of-experience figure anywhere on the site** — see `profile-facts.md` for why. Scope is the claim; tenure is not.

**CTA row:**
- Primary: `See the work` → anchors to the Ledger section
- Secondary: `Read the writing` → `/writing`
- Tertiary (text link): `brucenkundabagenzi@gmail.com` → mailto

**Why this headline:** it states the actual spike (interconnected systems) in language a non-specialist reads instantly, and it sets up the site's ledger metaphor. It is not "Hi, I'm X 👋" and not "Building beautiful digital experiences" — both of which are invisible to a reader who has seen forty portfolios this month.

---

## Home — The Ledger (signature section)

The site's one memorable device. Three entries, each a row with two balancing sides: **what was built** (left) and **what it proves** (right), with real figures set in mono in the margin. See `ui-rules.md` for the layout spec.

The conceit is honest, not decorative: a ledger only works if both sides agree, which is the same claim the headline makes.

### Entry 01 — Restaurant Management Platform *(client name withheld)*
**Margin figures:** `28 modules` · `3 apps · 1 API` · `53 issues remediated` · `sole engineer`
**Left — Built:**
> A multi-tenant restaurant management platform: point of sale, inventory, product catalog, double-entry accounting, payroll, procurement, and real-time fiscal compliance with Rwanda's tax authority. Payments through mobile money, card, and cash. Web dashboard, staff mobile app, one API.

**Right — Proves:**
> Sole engineer across the whole stack, working directly with the client on where the system goes. I audited it end to end, rated every issue by severity, and closed all 53 — tenant isolation, ledger immutability, correct revenue recognition. Financial records are append-only and enforced at the ORM layer rather than by convention, because these businesses chose the system for one reason: they could not trace their money or their stock in what they had before.

*(Customer count stays off the page — see `profile-facts.md` for why, and for the interview answer.)*

**Link:** `Read the case study →` `/work/restaurant-saas`

### Entry 02 — WithinTech Learn
**Margin figures:** `750+ students` · `250+ certificates` · `3 languages` · `3 devs, 2 continents`
**Left — Built:**
> The learning core of an e-learning platform: courses with gated module and sub-module progression, quizzes at every level, and the automated email engagement that keeps students moving — invitations, reminders, and rewards for top performers. Added French and Kinyarwanda translation to an app that shipped in English only, and a dark theme it didn't have.

**Right — Proves:**
> Joined a live codebase built by others and shipped inside it — three developers split between the US and Rwanda, working async across timezones with no collisions and no dropped work. The platform now serves 750+ students and has issued 250+ certificates.

**Link:** `Read the case study →` `/work/withintech-learn` · `Visit the site ↗` `https://learn.withintech.org/`

> **Claim discipline — read before writing this case study.** The code-execution engine, the challenge problems, and user auth predate Bruce and are **never** claimed, mentioned as his, or implied by adjacency. Payments are "integrated with a local fintech partner and configured", never "built". See `profile-facts.md` for the full ownership table. The temptation is to borrow the most impressive-sounding feature; the cost of being asked to explain someone else's code in an interview is the whole interview.

### Entry 03 — SubTrack
**Margin figures:** `3 apps` · `1 contract` · `37 features` · `deployed`
**Left — Built:**
> A subscription and recurring-expense tracker. Next.js web app and an Expo mobile app built independently against one documented Nest.js API. Multi-currency with cached exchange rates, scheduled jobs that log payment history, spend limits, Gmail-based subscription detection, CSV and PDF export.

**Right — Proves:**
> Built solo, end to end, and shipped. Versioned migrations from the first commit, strict TypeScript, browser-verified UI, and a scheduled job designed to stay correct on hosting that sleeps — the kind of failure that silently corrupts data if nobody thinks about it.

**Link:** `Read the case study →` `/work/subtrack` · `Try the live demo ↗` `https://subtrack-web-two.vercel.app/` *(update when a custom domain lands)*

---

## Home — Writing teaser

**Section heading:** `Writing`
**Intro line:**
> Notes on the things that were hard.

Three most recent posts: title, date (mono), one-line description. Then `All posts →`.

---

## Home — Contact

**Heading:** `Open to the right remote role`  
*(quiet framing — no "actively job hunting" language; see `profile-facts.md` Role Positioning + Availability)*
**Body:**
> I build full-stack, web and mobile, with a lot of depth on the backend — the kind of product team where correctness matters: fintech, B2B SaaS, anything with real money or real compliance in it. I'm in Kigali (UTC+2) and work through 22:00 local — a full overlap with European hours, and about seven hours with US Eastern.

**Links:** email (mailto), GitHub, LinkedIn. No form.

---

## Case Study Template

Every case study follows this shape. Consistency is a signal in itself.

0. **Back link**, above the header — `← All work`, to `/#ledger` (there is no standalone work index route — the Ledger on home is it)
1. **Header** — project name, one-line summary, role, timeframe, stack (mono chips), live/repo links where they exist
2. **The problem** — 2–3 sentences on what the system needed to do and why it was hard. Not "the client wanted an app."
3. **What I built** — the substance. Architecture decisions and their reasoning. This is where a technical reader decides whether you're real.
4. **One hard problem, in depth** — the most valuable section on the entire site. Pick one genuinely difficult thing, explain the failure mode, the options, what you chose and why, and how you verified it. A reader who finishes this section knows how you think.
5. **What I'd do differently** — short, honest, specific. This section builds more trust than the previous three combined, because almost nobody writes it.
6. **Screenshots** — web and mobile where both exist. Mobile especially: a reviewer cannot run an Expo app, so screenshots are the only way it exists for them. Shot lists, capture rules, and disclosure limits are in `screenshot-spec.md`.

**Suggested "one hard problem" per case study:**
- SubTrack → the renewal job that had to stay correct on hosting that sleeps (catch-up loop, idempotency, why `paidAt` is the due date and not the run date). Concrete, subtle, and shows correctness instinct.
- WithinTech Learn → **gated progression and progress computation** across a three-level hierarchy (course → module → sub-module, each with a quiz gate). This is his, it is the platform's spine, and it has real edge cases worth writing about: what unlocks what, partial completion, re-taken quizzes, and keeping a student's computed progress consistent with what the UI shows. Second choice: retrofitting three-language i18n into a live English-only app without breaking existing content.
- Restaurant platform → **append-only financial records, and why the business bought them.** The hook writes itself: these restaurants switched because they couldn't trace money or stock, so immutability isn't an engineering preference here, it's the product. Cover: why corrections are reversals rather than edits, how stock quantity can never move without producing a log entry, and how a point-in-time balance is reconstructed from an append-only trail. **Patterns only — no vulnerabilities, no `GAP-` identifiers, no client or vendor names, no screenshots with real data.**

---

## Writing — Launch Set

Three posts, in build order. Each one converts private, invisible experience into public evidence.

1. **"Why financial records should be append-only"** — reversal entries instead of edits, enforcing immutability at the ORM layer, one-way status transitions. General patterns, zero employer specifics. Best signal-to-effort ratio on the list.
2. **"Running a correct daily job on hosting that sleeps"** — the SubTrack renewal-job failure and its three-layer fix. Short, concrete, and it turns a deployment mistake into evidence of correctness thinking. Publishing your own failure modes builds disproportionate trust.
3. **"Governing an AI coding agent in a codebase where mistakes cost money"** — binding rules, invariant pre-flight checks, protected files, mandatory progress documentation. Rare, current, and genuinely differentiated content in 2026.

Every post: date, reading time, and a real conclusion. No "in this article we will explore" throat-clearing — first sentence states the problem.

Above the header, on every post page: a back link, `← All writing`, to `/writing`.

---

## About Page

Adapt the About narrative already drafted in `positioning-draft.md` (sole-engineer framing, "I had no safety net, so I built one," WithinTech remote-team paragraph, SubTrack and the AI-workflow story). Add: how you got into engineering, what you're learning now, and one non-work paragraph — the reader is deciding whether they want to work with a person, and a page with zero humanity is its own kind of red flag.

A small headshot (`/bruce-image.jpg`) runs alongside the human paragraph — real alt text (`"Bruce Nkundabagenzi"`), no filter or decorative crop. Layout and image chrome are specced in `ui-rules.md`. It appears here only, never in the header or hero — see `ui-rules.md` for why.

---

## Metadata (every page)

- `<title>`: `Bruce Nkundabagenzi — Software engineer` on home; `{Post title} — Bruce Nkundabagenzi` elsewhere
- `<meta name="description">`: the positioning sentence, trimmed under 160 characters
- OpenGraph image: generated per page (see `architecture.md`), showing title + name on the site's palette. Link previews get shared into hiring channels — a broken or generic preview wastes the one moment your link is seen by more than one person.