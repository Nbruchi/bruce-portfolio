# Profile Facts

Single source of truth for every personal fact and figure on the site. `content-spec.md` and the MDX files reference this — never retype a name, date, or number elsewhere, or they drift.

**This file is committed to a public repo.** Publishable facts only. Anything not cleared for disclosure (client name, transaction volumes, internal figures) stays out of the repo entirely — keep those in an untracked local note.

Status key: ✅ confirmed · ⚠️ needs a decision · ⬜ not yet supplied

---

## Identity

| Field | Value | Status |
|---|---|---|
| Full name | NKUNDABAGENZI Bruce | ✅ |
| Display name (site, OG, metadata) | **Bruce Nkundabagenzi** | ✅ confirmed |
| Location | Kigali, Rwanda — stated openly on the site | ✅ |
| Domain | `brucenkundabagenzi.com` | ✅ |
| Email | brucenkundabagenzi@gmail.com | ✅ |
| GitHub | https://github.com/Nbruchi | ✅ |
| LinkedIn | https://www.linkedin.com/in/bruce-nkundabagenzi-7218b83ab/ | ✅ |
| Years of professional experience | **Not stated on the site** — see note | ✅ resolved |

**✅ Display name confirmed: `Bruce Nkundabagenzi`.** Rwandan convention puts the family name first, but every other identifier you own already uses the given-name-first international form: the domain (`brucenkundabagenzi.com`), the email, and the LinkedIn slug (`bruce-nkundabagenzi`). A recruiter who reads "N. Bruce" on the site and then sees "Bruce Nkundabagenzi" on LinkedIn has to do a small reconciliation, and at screening speed small reconciliations become "is this the same person?" One name, everywhere, spelled the same way. Use `NKUNDABAGENZI Bruce` for local/formal documents where that convention is expected; use `Bruce Nkundabagenzi` for the international job search.

**✅ Years of experience — resolved: the site states no years figure.**

The pre-September-2025 period was university work: school projects, school-led hackathons, and internships. Coursework and hackathons are not professional experience and must never be counted toward a years claim — a reviewer reads that as padding, and one padded claim makes every other claim on the page suspect. Internships *are* real experience and belong on the CV with dates, but they are usually discounted by hiring managers.

That leaves a true professional timeline of roughly one year of full ownership plus internships before it — which, stated as a number, badly undersells the actual scope of the work. So the site states **scope, not tenure**: "sole engineer on a production financial system with double-entry accounting and real-time fiscal compliance" is a stronger and more accurate claim than any year count, and it cannot be contradicted by a timeline.

Rules that follow from this:
- No years figure in the hero, the About page, or the metadata description
- Internships appear on the **CV** with real dates and one line of substance each — not on the site's Ledger, which is reserved for the three main pieces of work
- Hackathons appear only if there was a placement or win worth naming, and only as a single line on the About page — never as "experience"
- If asked directly in an interview or a form, the honest answer is the professional start date plus the internships, stated plainly. Never inflate it

---

## Roles

### Restaurant management SaaS — **client name withheld**
| Field | Value | Status |
|---|---|---|
| Site label | Restaurant Management Platform | ✅ |
| Case study slug | `/work/restaurant-saas` | ✅ |
| Formal employment title | Digital Apps Developer | ✅ |
| Title used on the site | Software Engineer | ✅ confirmed |
| Started | 2 September 2025 | ✅ |
| Status | Current | ✅ |
| Scope | Sole engineer — backend, web, mobile, architecture | ✅ |
| Stack | NestJS API · Next.js web · Expo mobile · PostgreSQL/TypeORM · Bull + Redis · Socket.IO | ✅ |
| System scale | 28 modules · 3 client apps on 1 API · 4 enforced data invariants | ✅ |
| Businesses in production | **3** — publishable but *not* on the site; see note | ✅ resolved |
| Why they chose it | Traceability of money and stock — the reason they switched from competitors | ✅ |

### The customer count: keep it off the site, keep it ready for interviews

Three restaurants is a true number and a weak headline. On a page skimmed in 90 seconds, "3 businesses" gets compared against SaaS numbers it was never competing with, and the reader draws the wrong conclusion before reading why.

But the *reason* it's three is genuinely the strongest thing about this project: onboarding requires a business to meet real fiscal-compliance obligations, so the customer base is small by design and each one is a serious operator. And they chose this system over alternatives specifically for **traceability of money and stock** — which means the append-only ledger, the stock movement log, and the invariants aren't engineering vanity, they are the product's competitive advantage.

So: the site states system scale (modules, apps, invariants, real-time fiscal signing) and describes production use qualitatively. The count is never published, never implied to be larger, and answered plainly and confidently if asked:

> "Three, and that's the point — onboarding requires the business to be fiscally compliant, so it's a high bar by design. They moved to us from other systems because they couldn't trace their money and stock, which is exactly what the ledger design solves."

That answer converts a weak-looking number into the best story in the interview. Never inflate it, never say "several", never say "multiple businesses" hoping it reads as more.

### Confidentiality — hard rules for this case study

The internal documentation contains material that must never reach the site: the client's name, the internal system name, the payment aggregator's name, specific vulnerabilities and their locations (including anything with a `GAP-` identifier), business data, and any screenshot containing real records.

**Publishable:** the architecture shape (multi-tenant, module boundaries, three clients on one API), the invariant *patterns* (append-only financial records, stock mutations always producing a movement log, tenant scoping from the JWT, reversals instead of edits), the fiscal-compliance integration described generically (a national electronic invoicing system requiring real-time signed receipts), and the fact that a systematic audit and remediation programme was carried out.

**On publishing the audit figure:** "53 issues found and remediated" is strong evidence of correctness work, and the employer is unnamed, so the disclosure risk is low. Frame it as completed remediation, never as a defect count — "audited and closed 53 issues across 28 modules", not "found 53 vulnerabilities". If the client ever objects, drop the number and keep the sentence.

**Employer cannot be named.** The case study describes the system, never the company or its clients. No logos, no screenshots containing business data, no figures that could identify the client. Refer to it as "a restaurant management platform" or "a client's restaurant SaaS" — never invent a pseudonym, and **do not use the internal system name anywhere public** (an internal codename is itself identifying, and it's searchable).

**✅ Title — confirmed as recommended.** `Digital Apps Developer` is the contract title; it exists because the client couldn't decide between full-stack and full-stack-plus-mobile. It's also meaningless to an international reviewer. Recommendation: the **site** says `Software Engineer` (a functional description, and the employer isn't named anyway, so there's nothing to contradict); the **CV** says `Digital Apps Developer (Software Engineer — full stack + mobile)` so anything verified in a reference check matches exactly. Never put a title on a CV that an employment check would contradict.

### WithinTech Learn
| Field | Value | Status |
|---|---|---|
| Site label | WithinTech Learn | ✅ |
| Live URL | https://learn.withintech.org/ | ✅ |
| Case study slug | `/work/withintech-learn` | ✅ |
| Started | 1 March 2026 | ✅ |
| Status | Current (concurrent with the role above) | ✅ |
| Team | 3 developers, remote, US + Rwanda | ✅ |
| Engagement type | Paid contract, expires October 2026 | ✅ |
| Stack | pnpm monorepo — Next.js web, Express.js API | ✅ |
| Platform scale | 750+ students · 6+ courses · 250+ certificates issued · 30+ challenge solvers | ✅ |

### Ownership — what is and is not claimable

Bruce joined an existing codebase. Several headline features predate him and **must never be claimed**.

| Component | Ownership | Claimable? |
|---|---|---|
| Course structure — courses → modules → sub-modules, gated progression | **Built fully** | ✅ Yes |
| Quiz system | **Built fully** | ✅ Yes |
| Email engagement — invitations, reminders, top-performer rewards | **Built fully** | ✅ Yes |
| Multi-language (EN / FR / RW) via `next-i18next` | **Introduced and built** | ✅ Yes |
| Dark theme / UI improvements | **Built** (platform had none) | ✅ Yes |
| Subscription payments | **Partial** — sourced the local fintech partner and did the initial configuration; a teammate wrote the implementation | ⚠️ Only as "integrated with", never as "built" |
| Code-execution engine (compiler, sandboxing, verdicts, six languages) | **Not his** — existed before he joined | ❌ Never claim |
| Challenges (the problems themselves) | **Not his** — predates him | ❌ Never claim |
| User management / auth | **Not his** — predates him | ❌ Never claim |

**This removes the code-execution engine from the portfolio entirely.** Earlier drafts led with it because it was the most impressive-sounding feature — that was exactly the trap. An interviewer asking "walk me through your sandboxing approach" about someone else's code ends the interview. What remains is still strong and, better, entirely defensible: the whole learning core (structure, progression, assessment), the engagement layer, and internationalisation.

**Attribute the platform numbers as platform numbers**, not as personal outcomes: "the platform serves 750+ students" is true and useful context; "I grew it to 750 students" is not.

**Note the contract end date.** The engagement expires October 2026 — describe it as a contract with an end date rather than open-ended, and be ready to say what happens after.

Note: this role runs concurrently with the day job. That's normal and fine, but be ready to answer it in one sentence in an interview — the answer is simply that it's separate work outside the main role.

### SubTrack
| Field | Value | Status |
|---|---|---|
| Site label | SubTrack | ✅ |
| Case study slug | `/work/subtrack` | ✅ |
| Live URL | https://subtrack-web-two.vercel.app/ (custom domain pending) | ✅ |
| Type | Personal project, solo, shipped | ✅ |

---

## Availability

| Field | Value | Status |
|---|---|---|
| Timezone | Kigali, Rwanda — CAT (UTC+2), no daylight saving | ✅ |
| Working availability | Through 22:00 local, flexible if the role requires it | ✅ |
| Employment status | Employed / under contract — site stays quiet, no “open to work” banner | ✅ resolved |

**Overlap, computed — state this concretely on the site rather than vaguely.** Kigali is UTC+2 year-round, and working until 22:00 local produces unusually good coverage:

| Region | Overlap with a 9–5 local day |
|---|---|
| Western Europe (CET/CEST) | Effectively the entire working day |
| US Eastern (EDT, UTC−4) | ~7 hours — 15:00–22:00 Kigali covers 09:00–16:00 ET |
| US Pacific (PDT, UTC−7) | ~4 hours — 18:00–22:00 Kigali covers 09:00–13:00 PT |

This is a genuine competitive advantage over much of the offshore talent pool and belongs in the contact section as a specific claim, not a vague one. Suggested copy: *"I'm in Kigali (UTC+2) and work through 22:00 local — that's a full overlap with European hours and about seven hours with US Eastern."*

**✅ Confirmed real — publish it as stated.** This is a genuine competitive advantage and should not be softened.

---

## Role Positioning

**Full-stack leads. Mobile is a close second, stated explicitly. Backend depth is proven, not announced.**

Reasoning, since this decides real copy: backend-only roles are a smaller, slower-moving slice of the remote market, and companies hiring full-stack are both more numerous and faster to move. Leading with "full-stack" doesn't hide backend strength — the restaurant-platform case study is almost entirely backend-systems evidence — it just doesn't gate the application pool down to backend-only postings before a human even reads the case studies. Mobile stays visible because SubTrack's Expo app and the sole-ownership story depend on it being real, not incidental.

**Where this shows up:**
- Hero subhead: leads with systems/full-stack framing, mentions "web and mobile" explicitly
- Contact section: states full-stack and backend-leaning roles, mentions mobile as a capability rather than a target
- Case study order in the Ledger is unaffected — it's ordered by evidentiary weight, not by target role
- CV summary line and cover letters should mirror this ordering: full-stack first, backend depth as the differentiator within it, mobile as a stated additional capability

---

## Internships (CV only — not on the site)

Both were completed while studying, which is why the calendar has gaps — that is normal for a student and needs no apology or explanation on a CV. Dates alone tell the story.

| # | Organisation | Dates | Role | What was built |
|---|---|---|---|---|
| 1 | Creative Tim (creative-tim.com) | May – June 2024 (2 months) | Front-end developer | Internal kanban board for organisation-wide task tracking, built with a team of 5 |
| 2 | TV1 (local news company, Rwanda) | 13 January – 10 July 2025 (six months) | Developer | Content management system used internally to update the company's websites, built with a team of 6 |

**✅ Resolved — use "six months".** 13 January to 10 July 2025 is 5 months, 27 days; "six months" is the honest round figure. Every mention of this internship (CV, `profile-facts.md`, any case study) uses six months, not seven.

**✅ Creative Tim confirmed** — the UI-kit and template company at creative-tim.com. Spell it **"Creative Tim", two words**, exactly as the company does; "CreativeTim" reads as a typo to anyone who knows them. This is the one recognizable name on the CV for a frontend-aware reviewer, so it earns its place despite being a short internship.

**Worth knowing for interviews:** both internships were team-based (5 and 6 people), and WithinTech Learn is a 3-person distributed team. That is three separate instances of collaborative work — more than enough to answer the "you're a solo engineer, can you work in a team?" question with specifics rather than reassurance. The day job is the outlier, not the pattern.

**Timeline is effectively continuous.** TV1 ended 10 July 2025; the current role began 2 September 2025 — a seven-week gap that needs no explanation. There is no "missing years" problem to solve on the CV, only a years-claim to avoid on the site.

---

## Still Needed (Tier 2 / 3)

- [x] WithinTech: engagement type, ownership, and figures — resolved above
- [x] Restaurant platform scale figures — resolved above (system scale used; customer count kept off-site)
- [x] Screenshots — shot list in `screenshot-spec.md`; client approval obtained
- [x] Target roles — **resolved.** Full-stack leads, mobile is a close second and mentioned as a real strength, backend depth is proven through the case studies rather than led with in headline copy — reasoning: backend-only roles are a smaller and slower-moving market than full-stack, and full-stack keeps every door (including backend-heavy roles, since the evidence is all there) open. See the Role Positioning note below.
- [x] CV PDF on the site — yes, confirmed