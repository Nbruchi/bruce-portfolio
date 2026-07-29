# UI Tokens

Visual identity for the portfolio site. Deliberately **nothing like SubTrack's** (teal accent, Inter, white cards, soft shadows) — this site frames SubTrack rather than being it, and a hiring manager who visits both should read them as two products with different jobs.

Never hardcode a color, size, or duration in a component. Tokens only.

---

## Direction: The Ledger

The identity comes from the subject's own world. This engineer's thesis is *systems where every part has to agree with the others* — and the artifact that embodies that literally is a **double-entry ledger**: two columns that must balance, ruled entries, figures aligned in the margin, an audit trail that can be reconstructed.

So: bookkeeping structure, warm archival materials, figures treated as first-class typography. Restrained, precise, a little old-world — the visual register of something that has to be *right*, not something that has to be *exciting*.

**Where the boldness is spent:** the Ledger section on the home page (see `ui-rules.md`). Everything else stays quiet and disciplined so that one device carries the memory.

**What this is explicitly not:** cream-and-terracotta editorial, dark-mode-with-neon-accent, or dense newspaper broadsheet. Those are the current defaults; this is a specific choice for this brief.

---

## Color

**Two themes, designed as a pair — not an inversion.** Light mode is a ledger page under daylight; dark mode is the same ledger under lamplight. The dark theme is warmer and plum-shifted rather than neutral grey-black, so both read as the same material at different times of day.

### The two-layer token rule (this is the important part)

Colors are declared in two layers, and **components may only ever use the semantic layer.**

- **Layer 1 — raw palette:** literal hex values per theme. Referenced only inside `globals.css`.
- **Layer 2 — semantic tokens:** role names (`--surface`, `--text-primary`, `--accent`…) that resolve to different raw values per theme.

A component writes `bg-surface text-text-primary`. It never writes `bg-paper`, never writes a hex, and — critically — **never branches on theme** (`dark:` variants are a smell here; if a component needs one, the semantic layer is missing a token). This is what makes the second theme nearly free, and what stops light-mode colors leaking into components over time.

```css
:root {
  /* Layer 1 — light palette */
  --paper:        #EFEEEB;  /* warm grey, deliberately not cream */
  --paper-raised: #F7F6F4;
  --plum:         #221A29;  /* deep plum-black */
  --plum-soft:    #574B5E;
  --gold:         #A8792B;  /* ochre gold */
  --gold-wash:    #EFE4CD;
  --rule-light:   #D6D2CA;
  --green:        #4A6B55;

  /* Layer 2 — semantic (light) */
  --surface:          var(--paper);
  --surface-raised:   var(--paper-raised);
  --surface-feature:  var(--plum);        /* the one inverted section */
  --text-primary:     var(--plum);
  --text-secondary:   var(--plum-soft);
  --text-on-feature:  var(--paper);
  --accent:           var(--gold);
  --accent-wash:      var(--gold-wash);
  --rule:             var(--rule-light);
  --status-balance:   var(--green);
  --surface-code:     #1F1A24;            /* deliberately theme-stable — see ui-rules.md */
}

:root.dark {
  /* Layer 1 — dark palette (warmer, plum-shifted; never neutral black) */
  --ink:          #161219;  /* page background */
  --ink-raised:   #1F1A24;  /* cards, raised blocks */
  --ink-feature:  #2A2331;  /* the feature section lifts UP in dark, not down */
  --bone:         #EDE9E4;  /* warm paper-white text */
  --bone-soft:    #A79DAE;
  --gold-lit:     #D4A24C;  /* gold lifted for contrast on dark — the same pigment under lamplight */
  --gold-ember:   #3A2E1C;  /* dark equivalent of gold-wash */
  --rule-dark:    #332C3A;
  --green-lit:    #7FA98B;

  /* Layer 2 — semantic (dark) */
  --surface:          var(--ink);
  --surface-raised:   var(--ink-raised);
  --surface-feature:  var(--ink-feature);
  --text-primary:     var(--bone);
  --text-secondary:   var(--bone-soft);
  --text-on-feature:  var(--bone);
  --accent:           var(--gold-lit);
  --accent-wash:      var(--gold-ember);
  --rule:             var(--rule-dark);
  --status-balance:   var(--green-lit);
  --surface-code:     #1F1A24;            /* same value in both themes, by design */
}
```

### Design decisions worth knowing

**The feature section inverts in opposite directions.** In light mode the contact section is a dark plum block (`--surface-feature` → `--plum`) — it stands out by going dark. In dark mode it cannot go darker without disappearing, so it *lifts* (`--ink-feature`, a step lighter than the page). Same semantic role, opposite mechanic, zero component branching. This is the single case that would have broken a naive inversion, and it is why the semantic layer exists.

**Gold shifts, it does not stay put.** `#A8792B` on a dark background clears contrast but looks muddy and dead; `#D4A24C` reads as the same pigment lit differently. Never reuse a light-mode accent value on dark and call it done.

**Dark mode is not black.** `#161219` is plum-shifted and slightly warm. Pure `#000` with white text causes halation (text appears to smear) for many readers, and neutral grey-black would abandon the palette's character.

### Contrast floors (verify any new pairing before shipping)

| Pairing | Light | Dark |
|---|---|---|
| `--text-primary` on `--surface` | ≈14:1 | ≈15:1 |
| `--text-secondary` on `--surface` | ≈7:1 | ≈7:1 |
| `--accent` on `--surface` | ≈4.6:1 — links and large text only, **never** small secondary text | ≈8:1 |

## Typography

Three roles, three families. All open-source, all loaded via `next/font` (self-hosted, no external font CDN).

| Role | Family | Used for |
|---|---|---|
| **Display** | **Fraunces** (variable; `wght` 400–700, `SOFT` low, `WONK` on at large sizes) | Hero headline, section headings, case-study titles. Its almanac/ledger-book character is the point |
| **Body** | **Archivo** (variable) | All running text, navigation, buttons. A grotesque with slightly condensed proportions — sets densely without feeling cramped |
| **Figures & labels** | **IBM Plex Mono** | Every number, date, eyebrow, stack chip, and margin figure in the Ledger |

**Why not Inter:** SubTrack uses it, and it's the default of defaults. The pairing above is a deliberate choice; do not substitute a "safer" family without recording why here.

**The figure rule (this is the identity's core move):** every numeral that carries meaning — dates, counts, durations, scale figures — is set in **IBM Plex Mono**, tabular, slightly tighter than the surrounding text. Numbers are treated as data on this site, not as prose. This is what makes the ledger metaphor readable rather than merely claimed.

### Scale

Fluid, `clamp()`-based, capped so nothing gets silly on a large monitor.

```css
--text-hero:    clamp(2.5rem, 6vw, 4.5rem);   /* Fraunces 600, line-height 1.05, letter-spacing -0.02em */
--text-h2:      clamp(1.75rem, 3vw, 2.5rem);  /* Fraunces 600, line-height 1.15 */
--text-h3:      clamp(1.25rem, 2vw, 1.5rem);  /* Fraunces 500, line-height 1.25 */
--text-body-lg: 1.125rem;                     /* Archivo 400, line-height 1.65 — case study prose */
--text-body:    1rem;                         /* Archivo 400, line-height 1.6 */
--text-small:   0.875rem;                     /* Archivo 400 */
--text-mono:    0.8125rem;                    /* Plex Mono 400, letter-spacing 0.04em, often uppercase */
```

Prose measure caps at **68 characters** (`max-width: 68ch`). Long lines are the most common readability failure on portfolio sites.

---

## Spacing

A 4px base, but the useful ones are named by role so components stop inventing values:

```css
--space-1:  0.25rem;   --space-2: 0.5rem;   --space-3: 0.75rem;
--space-4:  1rem;      --space-6: 1.5rem;   --space-8: 2rem;
--space-12: 3rem;      --space-16: 4rem;    --space-24: 6rem;

--section-gap:    clamp(4rem, 10vw, 8rem);  /* between major page sections */
--container:      72rem;                     /* max content width */
--container-prose: 44rem;                    /* case studies and posts */
--gutter:         clamp(1.25rem, 5vw, 3rem); /* page side padding */
```

---

## Borders, Radius, Elevation

```css
--radius-sm: 3px;   /* chips, badges */
--radius-md: 6px;   /* buttons, inputs */
--radius-lg: 10px;  /* cards, image frames */
--hairline: 1px solid var(--rule);
```

**No shadows.** Depth comes from hairline rules and surface tone (`--surface` vs `--surface-raised`) — a ledger is printed, not floating. This is a deliberate departure from SubTrack's shadowed cards, and it must stay consistent: one soft shadow anywhere will make the rest of the site look unfinished.

Radius stays small on purpose. Zero radius would tip into the broadsheet cliché; 16px pill-cards would tip into generic SaaS. Small-but-present is the choice.

---

## Motion

Defined in `motion-spec.md`. Tokens repeated here for convenience only — that file is authoritative:

```css
--motion-instant: 100ms; --motion-fast: 150ms; --motion-base: 250ms; --motion-slow: 400ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Theme Behavior

- **Default: follow the OS** (`prefers-color-scheme`). Most people have already expressed a preference at the system level; asking again is noise.
- **Manual override persists** in `localStorage` under `theme` (`"light" | "dark" | "system"`), and once set, it wins over the OS on that device.
- **No flash of the wrong theme, ever.** A tiny blocking inline script in `<head>` sets the class on `<html>` before first paint — see `architecture.md`. A dark-mode user seeing a white flash on every navigation is the most visible possible bug on this site.
- `<meta name="theme-color">` updates per theme; `color-scheme: light dark` is declared so native form controls and scrollbars match.
- Theme switching gets a **150ms color transition on background and text only** — not on transforms, not on everything (`transition: all` on a theme switch produces a visible sweep as elements repaint at different times). Under `prefers-reduced-motion`, switch instantly.

## Invariants

- Never hardcode a hex, font size, or duration in a component — tokens only
- **Components use semantic tokens only** (`--surface`, `--text-primary`, `--accent`). Never a raw palette token, never a hex, never a `dark:` variant — if a component needs to branch on theme, add a semantic token instead
- Every semantic token is defined in **both** themes in the same edit — they must never drift
- `--accent` is the only accent color on the site, in both themes
- Every meaningful numeral is set in IBM Plex Mono, tabular
- No box-shadows anywhere
- No gradient except, if used at all, a single flat one in the OG image template
- Prose never exceeds 68ch
- Every new color pairing is contrast-checked **in both themes** before it ships
- Screenshots and images are checked in dark mode — a white-background screenshot glares against `--ink` and needs the treatment in `ui-rules.md`
- Any token added here must be actually used; delete unused tokens rather than leaving aspirational ones