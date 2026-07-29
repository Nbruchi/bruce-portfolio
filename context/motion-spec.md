# Motion Spec — Portfolio Website

Motion rules for the portfolio site. Read before building any animated element. This file exists because motion is the easiest thing on a portfolio to overdo, and overdoing it actively works against this site's goal.

---

## The Positioning Constraint (read first)

This site sells a **full-stack engineer with backend/systems depth** — sole engineer on a production financial system, append-only ledgers, fiscal compliance, multi-tenant correctness. Motion is a claim about what you're selling. A site heavy with scroll-jacking, parallax, and reveal-on-everything reads as *creative frontend specialist* — a different job posting, and one whose evidence this portfolio doesn't carry.

**Restraint reads senior. Excess reads junior-trying-hard.** The target impression is "this person has taste and knows when to stop," not "this person discovered a motion library."

If a visitor remembers the animations instead of the projects, the site failed.

---

## Motion Budget

The entire site gets **three** categories of motion. Nothing outside this list ships without a deliberate decision recorded here.

| # | Category | Where | Notes |
|---|---|---|---|
| 1 | **One hero moment** | Landing hero only | A single entrance on first paint. Not a sequence, not a loop, not a five-second reveal. |
| 2 | **Interactive feedback** | Buttons, links, cards, form fields, nav | Hover, focus, active/press. The workhorse — most of the site's motion lives here. |
| 3 | **One scroll-reveal pattern** | Project cards / section blocks | *One* pattern, applied consistently. Optional — the site must work with it removed. |

**Hard budget:** a visitor should reach the first project without waiting on any animation. Target: content readable within ~1s of paint, first project reachable within ~3s of landing.

---

## Tokens

Define these once (CSS custom properties or Tailwind theme, matching whatever the site uses) and never hardcode a duration or easing in a component.

```css
/* Durations */
--motion-instant: 100ms;  /* color/opacity feedback on press */
--motion-fast:    150ms;  /* hover, focus rings — the default */
--motion-base:    250ms;  /* card lift, small transforms, page/route fades */
--motion-slow:    400ms;  /* hero entrance, scroll reveals — the ceiling */

/* Easings */
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1);    /* things entering / responding */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);    /* things moving between states */
```

**Nothing on this site animates for longer than 400ms.** If something needs more, it's the wrong effect.

Default to `--ease-out` — motion that decelerates into place feels responsive; linear or ease-in feels sluggish.

---

## What Animates, Precisely

### Hero (one moment)
- Fade + small upward translate (`opacity 0 → 1`, `translateY(8–12px) → 0`) on the headline, subhead, and CTA row.
- Stagger allowed, but tight: ~60–80ms between the three elements, total sequence under `--motion-slow`.
- **No** typewriter effect, no word-by-word reveal, no animated gradient background, no particle canvas, no 3D scene.
- The hero text must be present in the DOM and readable if JS fails — animate from a CSS-only initial state, never render text only after a JS callback.

### Interactive feedback
| Element | Animate | Duration |
|---|---|---|
| Button / link hover | background, border, text color | `--motion-fast` |
| Card hover | `translateY(-2px)` + shadow | `--motion-base` |
| Focus ring | opacity/outline only | `--motion-fast` |
| Press/active | `scale(0.98)` | `--motion-instant` |
| Nav underline / active state | color or transform | `--motion-fast` |

Focus states must be **visible and immediate** — never fade a focus ring in slowly, keyboard users need it now.

### Scroll reveal (optional, one pattern only)
- Same fade + `translateY(12px)` as the hero, `--motion-base` to `--motion-slow`.
- Applied to **section-level blocks or project cards** — never to individual words, list items, icons, or paragraphs.
- **Fires once.** Never re-animate on scroll-up. `IntersectionObserver` with `unobserve()` after the first trigger.
- Trigger when the element is ~15% visible, not when it's fully in view — otherwise content appears to arrive late.
- Never gate above-the-fold content behind a scroll reveal.

### Page / route transitions
- Cross-fade only, `--motion-base`. No slide-in page pushes, no full-screen wipe overlays.
- Never block navigation on an exit animation — the new page starts loading immediately.

---

## Reduced Motion (mandatory)

Every animation on this site must be disabled under `prefers-reduced-motion: reduce`. This is not optional polish — it is an accessibility requirement, and vestibular-disorder users get real symptoms from motion they didn't ask for.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Reduced motion means reduced, not broken.** Scroll-revealed content must be *visible* under reduced motion, not stuck at `opacity: 0` because the JS observer was the thing that set it visible. Test this explicitly: enable reduced motion at the OS level and confirm every section is readable.

Also honor it in JS, not just CSS, wherever an observer or animation is scripted:
```js
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) { revealEverythingImmediately(); return; }
```

---

## Performance Rules

- **Animate `transform` and `opacity` only.** These are compositor-friendly. Animating `width`, `height`, `top`, `left`, `margin`, or `padding` triggers layout on every frame and janks on mid-range Android — the device class a lot of your visitors and much of the Rwandan market actually use.
- Animating `box-shadow` is acceptable at card scale but prefer a pseudo-element opacity crossfade if it stutters.
- No `will-change` unless a measured jank problem exists; it costs memory when applied broadly.
- No animation on scroll position itself (no scroll-jacking, no scroll-linked parallax). Scroll must feel native.
- Nothing animates in an infinite loop. No pulsing CTAs, no bouncing arrows, no perpetual gradient shifts.

---

## Dependencies

**Default: no animation library.** Everything in this spec is CSS transitions plus `IntersectionObserver` for reveals. That's ~15 lines of JS.

Only reach for a library if a *specific* need appears that CSS genuinely can't serve — coordinated multi-element sequences with shared timelines, layout-shift animations (FLIP), or gesture-driven motion. If that happens, record the reason here before installing, matching the SubTrack convention of never adding a dependency without a written justification.

Shipping a polished motion layer in plain CSS is itself a signal in your favor. Adding 40kb of JS for three fades is the opposite.

---

## Anti-Patterns (never ship these)

- Scroll-jacking or hijacked scroll snapping across full-page sections
- Parallax on hero backgrounds
- Preloader / splash screen with a progress animation — the site isn't heavy enough to need one, and it delays exactly the audience with 90 seconds of patience
- Text that animates in word-by-word or character-by-character
- Animated counters that count up to your stats *(the WithinTech site does this — and it's why link previews and no-JS crawlers show "0+ Students". Server-render the real number, animate from there or not at all.)*
- Custom cursor effects, cursor-following blobs, magnetic buttons
- Reveal animations on every element in a list
- Infinite/looping motion of any kind
- Anything that delays or blocks reading, clicking, or navigating

---

## Verification Checklist

Before calling the site done:

- [ ] Every animation disabled and all content visible under `prefers-reduced-motion: reduce`
- [ ] With JS disabled, all text content is present and readable (no `opacity: 0` orphans)
- [ ] First project reachable within ~3 seconds of landing, no waiting
- [ ] Keyboard tab-through: focus rings appear immediately and are clearly visible
- [ ] Tested on a mid-range Android device or throttled CPU (4–6× slowdown in DevTools) — no visible jank
- [ ] No animation exceeds 400ms
- [ ] No infinite loops running in the background
- [ ] Lighthouse: no layout-shift regressions caused by entrance animations (reserve space; animate `transform`, not layout)

---

## The Test That Settles Arguments

For any proposed animation, ask: **does removing it lose information, or just decoration?**

Motion that communicates — *this is now active, this action succeeded, this is where you are* — earns its place. Motion that decorates costs load, attention, and accessibility, and buys an impression this particular portfolio doesn't need.

When unsure, ship it without the animation and see whether anything feels missing.