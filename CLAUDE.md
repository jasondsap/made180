@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Version warning (read first)

This project runs **Next.js 16.2.3** and **React 19.2.4** — both newer than most training data. The repo's `AGENTS.md` (included above) is load-bearing: before writing Next.js / React code, consult `node_modules/next/dist/docs/` (organized into `01-app`, `02-pages`, `03-architecture`, `04-community`, `index.md`) rather than relying on memory. Patterns from Next 13–15 may be deprecated or removed.

## Commands

```bash
npm run dev      # next dev — local server at http://localhost:3000
npm run build    # next build — production build
npm run start    # next start — serve production build
npm run lint     # eslint (flat config via eslint.config.mjs)
```

There is no test framework configured.

## Architecture

The site is a single-page marketing site for MADE180 Digital Solutions (custom platforms / AI tools for behavioral health), with one interactive demo widget backed by an external RAG service.

**App Router layout** (`app/`):
- `layout.tsx` — root layout; loads DM Sans + Space Mono via `next/font/google`, sets site-wide metadata (OpenGraph/Twitter for `https://www.made180.com`).
- `page.tsx` — the entire marketing site (~60KB, `'use client'`). All content data (services, projects, PSS tools, WRI modules, process steps, tech stack) lives as inline arrays at the top of this file. Renders `<AdvisorDemo />` as a floating widget.
- `AdvisorDemo.tsx` — client chat widget. Caps at `MAX_MESSAGES = 10` (5 turns), POSTs queries to `/api/advisor-demo`, renders citations with color-coded source badges (TIP 64, TIP 57, SAMHSA, NAADAC, IC&RC, etc.).
- `api/advisor-demo/route.ts` — thin proxy to an external RAG service. **Requires `RAG_API_URL` and `RAG_API_KEY` env vars in Vercel.** Posts `{ module: 'peer_advisor', query, context: { audience_role: 'peer_specialist', conversation_history: [] } }` (single-turn — no history persisted). Translates `doc_id` prefixes (`samhsa_tip64`, `naadac_code_of_ethics`, …) into display labels via the `DOC_LABELS` map. Includes an **in-memory** per-IP rate limit (20 requests/hour) — this resets on every serverless cold start, so it is best-effort only; do not rely on it as the sole protection.
- `globals.css` — Tailwind v4 (`@import "tailwindcss"`) plus a MADE180 design-token palette exposed as CSS variables (`--navy`, `--teal`, `--orange`, `--warm`, etc.) used throughout `page.tsx`.

**Tooling:**
- Tailwind v4 via `@tailwindcss/postcss` (see `postcss.config.mjs`). No `tailwind.config.*` — config lives in CSS.
- TypeScript strict mode; path alias `@/*` → `./*` (root).
- ESLint flat config extending `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`.
- Icons exclusively from `lucide-react`.

**Unrelated content:** `docs/sms-privacy.md` and `docs/sms-terms.md` are standalone policy docs, not wired into routes.

## Conventions seen in the codebase

- Color tokens are referenced both via CSS variables (in `globals.css`) and inline hex values (in `page.tsx` data arrays — e.g. `color: '#1A73A8'`). Match the existing style of the file you're editing rather than introducing a new pattern.
- The advisor demo deliberately runs **without auth, DB, or persistence** — it's a public demo. Don't add session handling to it without confirming intent.
- All page content is hard-coded in `page.tsx` arrays — there is no CMS. Copy edits happen in that file.
