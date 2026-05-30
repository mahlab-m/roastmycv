# RoastMyCV — Night 1 Build Report

## Overview

Built the full MVP of RoastMyCV in a single session: a dark-themed Next.js web app that takes a pasted CV, runs it through an AI analysis API, and returns a scored, section-by-section roast with rewrite suggestions. The app includes a freemium gate (3 free roasts per email, stored in localStorage) and a mock Anthropic API response ready to swap for the real thing on Night 2.

Stack: Next.js 16.2.6 (App Router), React 19, TypeScript, Tailwind CSS 4.

---

## File Map

| File | What it does |
|------|-------------|
| `app/layout.tsx` | Root layout: sets dark background, injects Geist fonts, renders the persistent `RoastMyCV` nav link |
| `app/globals.css` | Global styles: always-dark theme (bg #0a0a0a), Tailwind CSS 4 import |
| `app/page.tsx` | Landing page: hero headline, 3-step how-it-works, value props grid, footer — pure server component |
| `app/upload/page.tsx` | Upload form: email input with per-email usage counter, CV textarea, freemium gate logic (localStorage), modal when limit hit, POST to `/api/roast`, redirect to `/results` — client component |
| `app/api/roast/route.ts` | POST route handler: validates body, returns mock structured roast JSON (5 sections, scores, feedback, rewrites) |
| `app/results/page.tsx` | Results page: reads roast from sessionStorage, renders overall score (colour-coded), per-section score bars, feedback text, highlighted rewrite boxes, "Roast Another CV" CTA — client component |

---

## Key Decisions

**Tailwind CSS 4 / `@import "tailwindcss"`**
Tailwind 4 drops the `@tailwind base/components/utilities` directives in favour of a single `@import "tailwindcss"`. The existing scaffold already had this correct; I left it in place.

**Always-dark theme**
The scaffold defaulted to light mode with a `prefers-color-scheme: dark` override. Since RoastMyCV is a dark-first product, I removed the media query and hardcoded `#0a0a0a` as the only background colour.

**sessionStorage for results, localStorage for usage**
Results are transient (user just submitted → view results → gone) so sessionStorage is the right scope. Usage counts persist across sessions so localStorage is correct. Both are keyed sensibly (`roast_result`, `roastmycv_usage`).

**Mock API response**
The real Anthropic call is one function swap. The mock returns the exact JSON schema the results page consumes, so Night 2 integration is a drop-in with no frontend changes needed.

**Freemium counter on email blur**
Usage count is read from localStorage as the user types a valid email (once `@` is present), so the "X free roasts remaining" badge updates live. This gives transparency without friction.

**No UI library**
Pure Tailwind utility classes throughout. No Radix, no shadcn, no headlessui — keeps the bundle minimal and the codebase legible.

---

## What to Read First

1. `app/layout.tsx` — understand the shell (nav, fonts, dark bg)
2. `app/page.tsx` — landing page pattern (server component, static)
3. `app/upload/page.tsx` — most complex file: form state, freemium logic, API call, routing
4. `app/api/roast/route.ts` — API contract (the JSON shape here drives the results page)
5. `app/results/page.tsx` — how results are displayed

---

## Night 2 Plan

### 1. Anthropic API integration
Replace the mock in `app/api/roast/route.ts` with a real `@anthropic-ai/sdk` call. The prompt should instruct Claude to return JSON matching the existing schema (overall_score, summary, sections[]). Add prompt caching on the system prompt. Store `ANTHROPIC_API_KEY` as an environment variable.

### 2. Authentication (NextAuth)
Add `next-auth` for email-based magic link login. This replaces the localStorage freemium tracking with server-side usage counts tied to real user accounts. Schema: User (email, roastCount, createdAt).

### 3. Database
Add a lightweight database (PlanetScale MySQL or Neon Postgres via Prisma) to persist: users, roast history, usage counts. The results page can then show previous roasts.

### 4. Stripe payments ($5/month)
Wire up Stripe Checkout for a single "Pro" subscription tier. On webhook `customer.subscription.created`, mark the user as Pro in the database and remove the freemium gate check.

### 5. Vercel deploy
Push to Vercel. Add `ANTHROPIC_API_KEY`, `NEXTAUTH_SECRET`, `STRIPE_SECRET_KEY`, `DATABASE_URL` as environment variables. The build already passes (`npm run build`) so deployment should be one-click.

---

## Issues Encountered

**Detached HEAD state**
After committing in a remote execution environment, git was in detached HEAD mode (commits landed on a floating commit chain, not on the `main` branch ref). Fixed with `git checkout -B main` to reattach the branch pointer to the current HEAD.

**node_modules not pre-installed**
The scaffold was cloned without installing dependencies. Ran `npm install` before any build or docs check.

**Next.js 16 docs location**
AGENTS.md instructed reading `node_modules/next/dist/docs/` — this exists after install at `node_modules/next/dist/docs/01-app/`. Confirmed that App Router conventions (route handlers, `useRouter` from `next/navigation`, client/server component split) are unchanged from Next.js 15 for the patterns used in this build. The one breaking change relevant here: dynamic route `params` are now Promises (not used in this MVP since there are no dynamic segments).
