<div align="center">

# 👋 Bruce Nkundabagenzi — Portfolio

**Personal portfolio site for a Kigali-based full-stack engineer.**
Live at [**brucenkundabagenzi.com**](https://brucenkundabagenzi.com) once deployed — see [📈 Progress](#-progress).

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-managed-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## 🎯 What this is

The site's job: get a hiring manager from skim to interview request in **under 90 seconds**. It's a sales asset with a deadline, not a playground.

📖 Full brief in [`context/project-overview.md`](context/project-overview.md).

## 🧱 Stack

| | |
|---|---|
| **Framework** | Next.js 16 · App Router · TypeScript strict |
| **Styling** | Tailwind v4, semantic tokens only |
| **Content** | MDX via `next-mdx-remote/rsc`, no CMS |
| **Hosting** | Vercel, static export, no database |

📐 Full rationale in [`context/architecture.md`](context/architecture.md).

## 📚 Context-driven development

Everything about this site — positioning, copy, design tokens, motion rules, layout, personal facts, screenshot rules, git conventions, and the build plan — is specified in [`context/`](context/) **before** it's implemented. This isn't incidental documentation; it's the source of truth. Read the relevant file before touching code or copy — see [`AGENTS.md`](AGENTS.md) for which file governs which kind of change.

| 📄 File | Covers |
|---|---|
| 🗺️ [`project-overview.md`](context/project-overview.md) | What this site is, the audience, the positioning it sells |
| 🏗️ [`build-plan.md`](context/build-plan.md) | Numbered features, build order, launch gate |
| ✅ [`progress-tracker.md`](context/progress-tracker.md) | Current status, open questions, decisions |
| ⚙️ [`architecture.md`](context/architecture.md) | Stack, file structure, rendering, performance budget |
| 🎨 [`ui-tokens.md`](context/ui-tokens.md) / [`ui-rules.md`](context/ui-rules.md) | Design tokens (two-theme system) and layout/component specs |
| 🎬 [`motion-spec.md`](context/motion-spec.md) | The site's full motion budget |
| ✍️ [`content-spec.md`](context/content-spec.md) / [`profile-facts.md`](context/profile-facts.md) | Source of truth for copy, and for names/dates/figures |
| 📸 [`screenshot-spec.md`](context/screenshot-spec.md) | Capture rules and disclosure limits per project |
| 🧪 [`code-standards.md`](context/code-standards.md) | Implementation and verification rules |
| 🌿 [`git-workflow.md`](context/git-workflow.md) | Branch naming and commit conventions |

## 🚀 Getting started

Package manager is **pnpm** (pinned via Corepack — see `architecture.md`). Don't use npm/yarn; a second lockfile breaks Vercel's auto-detection.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🌐

```bash
pnpm build   # 🏗️ production build — must be clean before any feature is done
pnpm lint    # 🧹 eslint
```

## 📈 Progress

🚧 **Not yet launched.** Current phase and next feature are tracked in [`context/progress-tracker.md`](context/progress-tracker.md) — check there rather than this file for up-to-date status.

## 🌐 Deployment

Vercel, custom domain (`brucenkundabagenzi.com`, already purchased 🎉), static export. Deployment is feature 12 in the build plan and is the **launch gate** — see [`build-plan.md`](context/build-plan.md#12-deploy--custom-domain).
