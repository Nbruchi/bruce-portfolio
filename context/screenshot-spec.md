# Screenshot Spec

What to capture, how to capture it, and what must never appear. Screenshots are the only way a reviewer experiences the mobile app and the client platform at all — they carry more weight per pixel than any paragraph on the site.

---

## Capture Rules (apply to every shot)

**Web**
- **No browser chrome.** No tabs, no bookmarks bar, no extension icons, no window frame. Capture the viewport only — DevTools device toolbar screenshot, a full-screen (F11) capture, or crop tightly afterwards. The existing SubTrack web shots fail this and must be retaken.
- **No personal context, ever.** The current captures show tab titles including a personal Gmail inbox, WhatsApp, and a GitHub account. That is both unprofessional and a small privacy leak — a reviewer can read a surprising amount from a tab strip.
- Fixed viewport for every web shot: **1440×900**. Consistency across shots reads as deliberate; mixed sizes read as scraps.
- Light theme for all captures unless the shot exists specifically to show dark mode.

**Mobile**
- Clean status bar: full battery or hidden, strong signal, no notification icons, a neutral time. Real device shots showing `83%` battery and a cluttered status bar look like debugging screenshots, because that is what they are.
- Same device frame and resolution for every mobile shot in a set.
- Capture after the branding work lands so the app icon and splash are the real ones.

**Data**
- Seed data must look like a real person's account and must be internally sensible. **A subscription named "Gemini API Token Usage" categorised as *Fitness* is visible in the current shots** — a reviewer who notices that reads carelessness into everything else on the page.
- No empty or zero-valued cards in a hero shot (`Upcoming Renewals (7d): 0` currently sits in the mobile dashboard). Seed the data so every visible stat has a real value.
- No lorem ipsum, no `test test`, no obviously fake names like `asdf`.

**⚠️ The spend-trend chart is the weakest thing in the current set.** It reads flat at zero from February to June and then spikes in July, which tells a reviewer the data was created last week — and worse, it looks like a broken chart. Charts are the most-looked-at element in a dashboard screenshot. Seed several months of history so the line has a plausible shape before capturing.

**⚠️ Also visible in the current shots:** a subscription with a renewal date three days in the past showing as overdue. That is exactly the sleeping-scheduler failure mode — the renewal job has not been advancing renewals. Whatever is decided about fixing it, do not publish a screenshot that displays it: overdue rows in a screenshot of an app whose headline feature is *automatic renewal tracking* is the one detail a sharp reviewer will fixate on.

---

## SubTrack

**Status:** web dashboard, web subscriptions, mobile dashboard, mobile subscriptions, and mobile welcome have all been retaken and now pass the capture rules — no browser chrome, seeded persona ("Bryan Cole"), correct categories, a plausible multi-month spend-trend shape, no overdue rows visible, and the welcome screen's status bar is cropped out entirely (satisfies "hidden," and the icon shown is the real app mark, not a stock placeholder). Web landing was already clean.

**Remaining polish:** none. The full mobile set (welcome, dashboard, subscriptions) is now consistently cropped with no status bar showing — confirmed clean, not just blended against the background. The whole SubTrack screenshot set (web landing, web dashboard, web subscriptions, mobile welcome, mobile dashboard, mobile subscriptions) is ready to use as-is.

**Still needed — priority order:**

| # | Shot | Why it earns space |
|---|---|---|
| 1 | Web — detected subscriptions review page (`/subscriptions/detected`) | The Gmail auto-detection flow is the most differentiated feature in the whole project. Nothing else in the portfolio looks like it |
| 2 | Web — subscription detail with payment history | Shows the append-only history the scheduled job produces — the data model story made visible |
| 3 | Web — settings, spend limit set and partially used | Shows a complete v2 feature and the Gmail connection control in one frame |
| 4 | Web — export menu open | One click, shows CSV/PDF for both datasets |
| 5 | Mobile — add/edit subscription form, "Custom" cycle selected | Shows the segmented control, the native date picker, and the conditional "every N days" field |
| 6 | Mobile — subscription detail | Mobile parity with the web detail view |

Web dashboard and mobile dashboard remain the hero shots for the case study header — capture those most carefully.

---

## WithinTech Learn

**Capture only what Bruce built.** A screenshot of the code-execution engine or the challenge list implies ownership the case study explicitly disclaims, and an interviewer who saw it will ask about it.

| # | Shot | Notes |
|---|---|---|
| 1 | Course view with gated progression — locked and unlocked states both visible in one frame | The single most important shot: it is his work and the platform's spine |
| 2 | Sub-module quiz, mid-attempt or on the results state | His work, and it shows the assessment layer |
| 3 | Dark theme — the same view in both themes | His contribution, and it doubles as evidence of UI work |
| 4 | One engagement email (reminder or top-performer reward) as rendered in an inbox | Email systems are invisible in app screenshots; this is the only way that work shows |

**Dropped:** language switcher / English-Kinyarwanda side-by-side — i18n work is still in progress, not ready to show.

**Never capture:** the code editor / challenge runner, challenge problem pages, auth screens.

**Privacy:** use his own account or a test account. No real student names, emails, avatars, or progress data — this is a live platform with 750+ real users, and their data is not his to publish.

---

## Restaurant Management Platform

**✅ Client approval obtained.** Bruce confirmed the client has cleared screenshots and a case study, on the condition that **the client's name and the platform's (internal system) name are never included.** That is the one hard boundary the client stated — everything below it is Bruce's own professional judgment on top, not something the client asked for, and it stays in place regardless:

- **Real business/customer data never ships, approval or not.** Publishing a real restaurant's stock levels, revenue, or transaction history would be a data-handling failure independent of what the client technically permitted — capture from a seeded demo tenant with entirely fictional data, always.
- **No vulnerability detail, `GAP-` identifiers, or anything from the internal audit findings.** The client approved a case study about the *system*, not a disclosure of what was once wrong with it — publishing specific security gaps (even fixed ones) is a different kind of risk the approval doesn't cover and shouldn't be read to cover.
- **No payment-aggregator name.** A third party's name isn't Bruce's or the client's to publish either way.

**Capture from a seeded demo tenant with entirely fictional data — never a live business.**

| # | Shot | Why |
|---|---|---|
| 1 | Stock movement log / audit trail view | The single best shot available: it makes the append-only invariant visible, and it is the traceability the customers actually bought |
| 2 | Journal entries with a reversal pair | Shows corrections-as-reversals rather than edits — the case study's core argument, in one image |
| 3 | Point-of-sale or order flow | Shows the operational surface the fiscal and stock machinery sits beneath |
| 4 | A signed fiscal receipt, fictional identifiers only | Proves the compliance integration exists |
| 5 | Mobile staff app — one screen | Establishes that the platform is genuinely three clients, not two |

**Must never appear:** client or company name, logos, real business names, real staff names, real customer data, real amounts, real tax identifiers or receipt signatures, internal system name, payment-aggregator name, anything carrying a `GAP-` identifier or referencing a vulnerability.

**Consider diagrams instead of, or alongside, UI shots.** For this case study specifically, a module-boundary diagram and a "one order, five consequences" flow (order → stock movement → journal entries → tax record → signed receipt) communicate the interconnectedness argument better than any dashboard screenshot, and they carry zero disclosure risk. Build them as SVG in the site's own palette rather than exporting from a diagramming tool.

---

## Storage and Delivery

- Source captures in `public/images/work/{project}/`, kebab-case, descriptive names (`subtrack-web-detected-subscriptions.png`)
- Served through `next/image` with explicit dimensions, AVIF/WebP, lazy-loaded below the fold
- Every image gets real alt text describing what it shows — never "screenshot"
- Mobile shots displayed in a phone-proportion frame per `ui-rules.md`; light-UI screenshots get the raised-surface frame treatment in dark mode