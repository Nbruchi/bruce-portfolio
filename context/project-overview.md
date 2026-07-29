# Project Overview

## What This Is

A personal portfolio site for a Kigali-based full-stack engineer, built to convert remote job applications into interviews. It is a **sales asset with a deadline**, not a playground — every decision is judged against whether it moves a hiring manager from skim to interview request.

Live target: **brucenkundabagenzi.com**. Not a platform-default subdomain — the URL appears in every application and reads as part of the pitch.

---

## The Audience (design for exactly this person)

A hiring manager or senior engineer screening a stack of remote applicants. They:

- Give the link **60–90 seconds** before deciding to read on or close the tab
- Are usually on desktop, sometimes mobile, often with the site open next to a CV
- Do **not** register accounts, do not run repos locally, do not read every word
- Are scanning for two things: *is this person's experience real*, and *can they communicate*
- Are frequently non-Rwandan and unfamiliar with RRA, EBM/VSDC, MoMo, or Xentripay — domain terms must carry a half-sentence of plain-English context or they read as noise

**Design consequence:** the top of the page must answer "who is this and what are they good at" without a scroll, and the strongest evidence must be reachable in one scroll or one click. Nothing is gated, nothing waits on an animation, nothing requires interpretation.

---

## The Positioning This Site Sells

> Full-stack product engineer specializing in complex, multi-module backend systems — production experience with payment integrations and tax compliance, shipping web and mobile from a single API.

Three proof pillars, in priority order:

1. **Systems depth** — sole engineer on a multi-tenant restaurant SaaS (**client cannot be named — see `profile-facts.md`; never publish the company name or the internal system name**) with double-entry accounting, append-only ledgers, fiscal compliance, and multi-channel payments. Audited it (53 severity-rated gaps) and remediated it.
2. **Remote collaboration** — shipped WithinTech Learn as part of a distributed 3-developer team across US/Rwanda timezones. This pillar exists specifically to answer the "solo engineer, can they work in a team?" objection before it is asked.
3. **Ships end-to-end, alone** — SubTrack: web + mobile + API from one contract, deployed, documented, with a disciplined AI-assisted build process.

Everything on the site serves one of these three. Content that serves none of them does not ship.

---

## Non-Negotiable Constraint: Confidentiality

The day-job system is a client's production financial system. Its internal documentation records specific, named security vulnerabilities.

**Never publish, quote, screenshot, or paraphrase:** employer source code, the internal context documents, specific vulnerabilities or their locations, client names, business data, or transaction figures that were not already public.

Permitted: describing the *shape* of the work (multi-module architecture, append-only ledger design, fiscal integration, the fact that an audit was conducted and remediated), and general engineering patterns learned. When in doubt, describe the pattern, not the finding. This constraint governs the site, the blog, and every case study.

---

## Pages

```
/                        Home — hero, the Ledger, selected work, writing teaser, contact
/work/[slug]             Project case study (subtrack, withintech-learn, restaurant-saas)
/writing                 Post index
/writing/[slug]          Post (MDX)
/about                   Longer narrative, background, what I'm looking for
/uses  (optional, v2)    Tools/setup — low value, only if everything else is done
```

Deliberately **no** contact form (a mailto link and LinkedIn are enough, and a form is a spam magnet plus a backend dependency), **no** testimonials section (nothing credible to put in it), **no** skills-percentage bars (they communicate nothing and read junior).

---

## Success Criteria

- A stranger can state the positioning sentence in their own words after 30 seconds on the page
- First project case study reachable in one scroll or one click from the top
- Every claim on the site is defensible in a technical interview — no inflation, no borrowed credit
- Loads and is readable on a mid-range Android on a slow connection (the site is built by someone in Kigali; it should not assume US broadband)
- Lighthouse: performance ≥ 95, accessibility 100, best practices ≥ 95, SEO 100
- Fully usable with keyboard only, with `prefers-reduced-motion` on, and with JavaScript disabled
- The site itself is a work sample: a reviewer inspecting the DOM or the repo should find it clean

---

## Explicit Non-Goals

- Not a design showcase. Motion and visual flourish are capped by `motion-spec.md` for a reason — this site sells systems depth, not creative frontend.
- Not a CMS. Content is MDX in the repo, edited in the editor, deployed by push. No Sanity, no Contentful, no admin UI.
- Not a blog platform. The writing section exists to prove communication and make private work visible; it needs an index and post pages, nothing more (no comments, no reactions, no newsletter capture in v1).
- Not comprehensive. Three strong pieces of work beat eight weak ones. Every project not in the "selected work" set stays off the site.