# Architecture

Technical structure of the portfolio site. Read before creating a file or installing anything.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16, App Router** | Same framework as SubTrack and the client platform — the site is itself a work sample, so it should be in the stack being claimed. Static export of every route, so hosting is free and fast |
| Language | **TypeScript, strict** | Non-negotiable; matches the standard claimed everywhere else |
| Styling | **Tailwind v4** with `@theme` tokens in `globals.css` | Same mechanism as SubTrack; no `tailwind.config.ts` for tokens |
| Content | **MDX** compiled at build time | Posts and case studies are files in the repo, versioned with the code. No CMS, no database, no admin |
| MDX pipeline | **`next-mdx-remote/rsc`** (the RSC entry point, not the classic client package) + `gray-matter` for frontmatter | Decided — see rationale below |
| Syntax highlighting | **Shiki**, build-time only | Zero client JS for highlighting. Never ship a runtime highlighter |
| Fonts | `next/font/local` or `next/font/google`, self-hosted | No external font CDN request; fonts are render-blocking and a third-party hop costs real time on slow connections |
| Deployment | **Vercel**, custom domain | Static output, global CDN, free tier is genuinely sufficient here |
| Package manager | **pnpm** | Vercel auto-detects `pnpm-lock.yaml` and uses it natively; stricter dependency linking than npm catches undeclared peer dependencies instead of letting them work by accident |
| Analytics | **Vercel Analytics** (or none) | Cookieless and privacy-preserving, so no cookie banner is needed. If any analytics tool requiring consent is ever considered, it does not ship — a consent banner is a worse trade than not knowing the numbers |

**No database. No API routes. No authentication.** If a feature seems to need one of these, it does not belong in v1.

---

## Package Manager

**pnpm.** Two setup rules, both to avoid a class of problem that's annoying to debug later rather than to prevent now:

- **Enable via Corepack, and pin the version.** `corepack enable`, then add `"packageManager": "pnpm@9.x.x"` (exact installed version) to `package.json`. This is what makes the pnpm version reproducible across machines and Vercel's build environment — without it, "works on my machine" becomes a real risk the moment pnpm ships a version with different resolution behavior.
- **Only `pnpm-lock.yaml` is ever committed.** Never generate or commit `package-lock.json` or `yarn.lock` alongside it — a second lockfile confuses Vercel's package-manager auto-detection and can cause it to install with the wrong tool. If one appears (e.g. from a stray `npm install`), delete it immediately, don't just `.gitignore` it after the fact.

If a dependency throws a peer-dependency warning under pnpm that npm would have silently ignored, install the peer explicitly — that warning is pnpm's stricter linking surfacing a real gap, not a false alarm to suppress.

---

## Theming

Two themes, designed as a pair (see `ui-tokens.md`). Implementation constraints:

- **Class strategy:** `.dark` on `<html>`, Tailwind v4 configured with a custom dark variant against that class (not `prefers-color-scheme` alone, since a manual override must be able to beat the OS).
- **Flash prevention is mandatory.** A minimal blocking inline `<script>` in `<head>` (rendered via `dangerouslySetInnerHTML` in `layout.tsx`) reads `localStorage.theme`, falls back to `matchMedia("(prefers-color-scheme: dark)")`, and sets the class **before first paint**. It must be inline and blocking — a deferred script or a `useEffect` guarantees a visible flash. Add `suppressHydrationWarning` to `<html>` since the server cannot know the resolved theme.
- **Hand-rolled, not a library.** The script is ~10 lines and a `ThemeToggle` client component is ~30. `next-themes` is the sanctioned fallback *only* if a concrete edge case (cross-tab sync, `system` re-resolution on OS change) proves annoying in practice — install it then, and record the reason in the dependency list below.
- The theme toggle is the site's only stateful client component. It is also the only justified `"use client"` outside the scroll-reveal observer.
- `<meta name="theme-color">` per theme; `color-scheme: light dark` in CSS so native scrollbars and form controls follow.
- **OG images stay light-themed and fixed.** They are generated at build time with no access to a viewer's preference, and a single consistent share image is better than a coin flip.

---

## Structure

```
portfolio/
├── context/                  # these docs — committed, and part of the story
│   ├── project-overview.md
│   ├── content-spec.md
│   ├── architecture.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── motion-spec.md
│   ├── code-standards.md
│   ├── build-plan.md
│   ├── progress-tracker.md
│   └── git-workflow.md
├── content/
│   ├── work/                 # case studies (MDX + frontmatter)
│   │   ├── restaurant-saas.mdx
│   │   ├── withintech-learn.mdx
│   │   └── subtrack.mdx
│   └── writing/              # blog posts (MDX + frontmatter)
│       └── append-only-financial-records.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts, metadata defaults, header/footer
│   │   ├── page.tsx          # home
│   │   ├── work/[slug]/page.tsx
│   │   ├── writing/page.tsx
│   │   ├── writing/[slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── not-found.tsx
│   │   ├── globals.css       # @theme tokens live here
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── layout/           # Header, Footer, Container
│   │   ├── home/             # Hero, Ledger, LedgerEntry, WritingTeaser, Contact
│   │   ├── content/          # MDX component overrides, StackChips, Figure, Callout
│   │   └── ui/               # Button, ArrowLink, Chip — small and hand-written
│   └── lib/
│       ├── content.ts        # read/parse MDX, frontmatter typing, sorting
│       ├── reading-time.ts
│       └── metadata.ts       # shared metadata + OG helpers
└── public/
    ├── images/work/          # screenshots, optimized
    └── resume.pdf            # confirmed — linked from the header and About page
```

**`context/` is committed deliberately.** A reviewer browsing the repo finding a documented design system, content spec, and build plan sees process — and it is the same practice being claimed in the writing about AI-assisted development. It is a feature, not clutter.

---

## MDX Pipeline Decision

**`next-mdx-remote/rsc`, not `@next/mdx`.** The two solve different problems: `@next/mdx` compiles known files at bundle time (either as literal route files or static imports), which fits content baked into the route tree. This project's content is a *collection* looked up by a dynamic `[slug]` — `lib/content.ts` reads the matching file with `fs`, parses frontmatter with `gray-matter`, validates it with `zod`, and only then renders the body. `next-mdx-remote/rsc`'s `compileMDX()` slots directly into that loader as a plain async Server Component function; `@next/mdx` would fight the dynamic lookup and bypass the typed frontmatter layer entirely. Use the `/rsc` subpath specifically — the classic `next-mdx-remote` package requires `"use client"` and browser hydration, which this fully static, zero-client-JS site doesn't want.

## Content Model

Every MDX file carries typed frontmatter, validated at build time. A missing or malformed field fails the build rather than rendering an empty page.

**Case study (`content/work/*.mdx`)**
```yaml
title: "SubTrack"
summary: "Subscription tracker — web and mobile on one API"
role: "Solo — design, API, web, mobile"
timeframe: "2026"
stack: ["Next.js", "Nest.js", "Expo", "PostgreSQL", "TypeORM"]
liveUrl: "https://…"      # optional
repoUrl: "https://…"      # optional
figures:                    # the Ledger's margin figures
  - "3 apps"
  - "1 contract"
  - "37 features"
order: 3                    # position in the Ledger
featured: true
```

**Post (`content/writing/*.mdx`)**
```yaml
title: "Why financial records should be append-only"
description: "Reversals instead of edits, and enforcing it at the ORM layer."
date: "2026-03-14"
draft: false                # drafts never render in production
```

Types for both live in `src/lib/content.ts` and are the single source of truth — no inline `any`, no untyped `frontmatter.foo` access in components.

---

## Rendering

- **Every route is statically generated.** `generateStaticParams` for both dynamic segments; no route may be dynamic at request time
- Server Components by default. `"use client"` only where genuinely required — realistically the scroll-reveal observer and nothing else. If a second client component appears, question it
- No client-side data fetching anywhere
- The site must render its full text content with JavaScript disabled. With JS off the theme falls back to the OS preference via a `@media (prefers-color-scheme: dark)` block mirroring `.dark` — the toggle simply does nothing, which is the correct degradation

---

## Performance Budget

Enforced, not aspirational. Checked before launch and after any dependency addition:

- Lighthouse performance ≥ 95, accessibility 100, best practices ≥ 95, SEO 100
- Total client JS on the home page **< 100kb** gzipped
- Largest Contentful Paint < 1.5s on simulated Slow 4G
- Cumulative Layout Shift < 0.05 — reserve space for images and fonts; entrance animations use `transform`, never layout properties
- Every image served through `next/image` with explicit dimensions, AVIF/WebP, and lazy loading below the fold
- Fonts: `font-display: swap`, subset to Latin, preloaded for the display face only

Test on a throttled connection and a mid-range Android profile, not just a fast laptop. A significant share of the world — including the market this engineer knows best — is on exactly that hardware.

---

## SEO and Sharing

- `sitemap.ts` and `robots.ts` generated from the content index
- Per-page `metadata` export or `generateMetadata()`: title, description, canonical URL, OG and Twitter tags — mechanics below
- **Dynamic OG images** via `opengraph-image.tsx` (Next's ImageResponse): title + name on the site palette. The link gets pasted into hiring channels — a broken preview wastes the only moment it is seen by more than one person

### Metadata mechanics — which routes use which mechanism

Two separate APIs, chosen by whether a route's metadata can be known without reading content:

**Root layout (`app/layout.tsx`) sets the inherited defaults:**
```tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Bruce Nkundabagenzi — Software engineer',
    template: '%s — Bruce Nkundabagenzi',
  },
  description: '…the positioning sentence…',
};
```
`metadataBase` is not optional — every relative URL in every page's metadata (OG images, canonical links) resolves against it. Omit it and Next warns at build time and guesses the origin, which silently breaks OG images on preview deployments. `title.template` means every other page exports only its own title text (`'SubTrack'`), and the `— Bruce Nkundabagenzi` suffix is appended automatically — never retyped per page.

**Static routes — `/`, `/about`, `/writing` (index) — export a plain object:**
```tsx
// app/about/page.tsx
export const metadata: Metadata = { title: 'About', description: '…' };
```

**Dynamic routes — `/work/[slug]`, `/writing/[slug]` — use `generateMetadata()`,** which receives `params`, looks up the matching item, and returns the same shape. Runs once per slug at build time (static export, so no per-request cost) and **must call the same `lib/content.ts` loader the page body uses** — one source of truth for the title, never a second copy:
```tsx
// app/work/[slug]/page.tsx
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project = await getWorkBySlug(params.slug); // same loader the page renders with
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}
```

**OG images are their own mechanism, not a `metadata` field.** `opengraph-image.tsx` is a special file per route segment. The dynamic routes each get one inside `app/work/[slug]/` and `app/writing/[slug]/`, running `generateStaticParams` the same way the page does — one rendered image per case study/post at build time. Static routes share a single root-level `opengraph-image.tsx` unless a specific page needs its own.

**JSON-LD has no field in `Metadata` at all** — it ships as a literal `<script type="application/ld+json">` rendered inside the page. `Person` schema goes in the home page, `BlogPosting` schema in `app/writing/[slug]/page.tsx`, both sourced from the same content data already loaded for the page.

**`sitemap.ts` and `robots.ts` are a third, unrelated special-file convention** — a function returning `MetadataRoute.Sitemap` / `MetadataRoute.Robots`. `sitemap.ts` calls the same listing functions from `lib/content.ts` used to build the Ledger and Writing index, so a new file dropped into `content/` appears in the sitemap automatically — nothing to remember to update by hand.
- JSON-LD `Person` schema on the home page, `BlogPosting` on posts
- RSS feed at `/writing/rss.xml` — cheap to generate, and developer-audience readers still use it

---

## Dependency Policy

The dependency list is short on purpose; this site's performance is part of its argument.

**Approved:** `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, MDX pipeline packages, `gray-matter`, `shiki`, `zod` (frontmatter validation), `lucide-react` (icons, tree-shaken imports only — also supplies the theme toggle glyphs).

**Dev tooling (no shipped-code footprint, exempt from the performance rationale above but still recorded):** `prettier` + `eslint-config-prettier` — build-plan feature 01 calls for ESLint/Prettier together; `eslint-config-prettier` turns off the ESLint stylistic rules that would otherwise fight Prettier's formatting. `playwright` (core library, not `@playwright/test`) — lets an agent drive a real Chromium instance to run the visual/keyboard/contrast/reduced-motion checks each feature's verify step already calls for, rather than asking the human to eyeball every pass. Ad-hoc scripts only, not a committed test suite — the build-plan has no testing phase.

**Conditionally approved:** `next-themes` — only if hand-rolled theming hits a real edge case (see Theming above). Record the specific reason here before installing.

**Explicitly not approved:** any animation library (see `motion-spec.md`), any UI component library (shadcn included — this site's components are few, small, and hand-written to match a bespoke identity), any CMS SDK, any analytics tool requiring consent, any carousel/slider library.

Before installing anything, add it here with a one-line reason. Same rule as SubTrack.