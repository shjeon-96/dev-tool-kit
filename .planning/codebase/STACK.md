# Technology Stack

**Analysis Date:** 2026-01-13

## Languages

**Primary:**

- TypeScript 5.x (strict mode) - All application code (`tsconfig.json`)

**Secondary:**

- JavaScript (ES2017+ target) - Build scripts, config files

## Runtime

**Environment:**

- Node.js 20+ (required per project documentation)
- Both Server and Client components (Next.js 16)

**Package Manager:**

- npm 10.x
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**

- Next.js 16.0.10 - Full-stack React framework (`package.json`)
- React 19.2.0 - UI library with Compiler enabled (`next.config.ts`)

**Testing:**

- Vitest 3.2.4 - Unit tests (`vitest.config.ts`)
- Playwright 1.57.0 - E2E tests (`playwright.config.ts`)
- Testing Library React 16.3.1 - Component testing

**Build/Dev:**

- Turbopack - Default dev bundler in Next.js 16
- React Compiler - Enabled in `next.config.ts`
- Tailwind CSS v4 - Utility-first CSS (`@tailwindcss/postcss`)
- Lightning CSS - High-performance CSS compiler

## Key Dependencies

**Critical:**

- `@anthropic-ai/sdk` 0.71.2 - Claude AI content generation (`src/lib/content-generator/`)
- `@supabase/supabase-js` 2.78.0 - Database & auth (`src/shared/lib/supabase/`)
- `@lemonsqueezy/lemonsqueezy.js` 2.2.0 - Payment processing (`src/shared/lib/lemonsqueezy/`)
- `next-intl` 4.5.8 - Internationalization (en, ko) (`src/i18n/`)
- `@tavily/core` 0.6.4 - Web search for RAG (`src/lib/web-search/`)

**UI:**

- Radix UI (multiple packages) - Headless accessible components (`src/shared/ui/`)
- Lucide React 0.556.0 - Icon library
- Framer Motion 12.23.25 - Animations
- class-variance-authority 0.7.1 - Component variants

**Infrastructure:**

- `@vercel/kv` 3.0.0 - Distributed cache (`src/shared/lib/kv.ts`)
- `@vercel/og` 0.8.6 - Dynamic OG image generation
- `next-pwa` 5.6.0 - Progressive Web App support
- `google-trends-api` 4.9.2 - Trend detection

**Utilities:**

- Zod 4.2.1 - Schema validation
- date-fns 4.1.0 - Date manipulation
- nanoid 5.1.6 - ID generation
- markdown-it 14.1.0 - Markdown parsing
- Sharp 0.34.5 - Image optimization

## Configuration

**Environment:**

- `.env.local` (gitignored) - Local development secrets
- `.env.example` - Template with required variables
- Key configs:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ANTHROPIC_API_KEY`
  - `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_WEBHOOK_SECRET`
  - `TAVILY_API_KEY` (optional)
  - `KV_REST_API_URL`, `KV_REST_API_TOKEN`

**Build:**

- `next.config.ts` - Next.js config with PWA, i18n, bundle analyzer
- `tsconfig.json` - TypeScript with path aliases (`@/*`)
- `tailwind.config.ts` - Tailwind CSS theme
- `eslint.config.mjs` - ESLint with Feature-Sliced Design boundaries

## Platform Requirements

**Development:**

- macOS/Linux/Windows (any platform with Node.js 20+)
- No Docker required for local dev

**Production:**

- Vercel - Next.js hosting with Cron Jobs
- Supabase - PostgreSQL database + Auth
- LemonSqueezy - Payment processing
- Vercel KV - Redis-compatible cache

---

_Stack analysis: 2026-01-13_
_Update after major dependency changes_
