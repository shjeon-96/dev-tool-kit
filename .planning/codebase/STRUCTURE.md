# Codebase Structure

**Analysis Date:** 2026-01-13

## Directory Layout

```
dev-tool-kit/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # i18n dynamic segment
│   │   └── api/                # API routes
│   ├── entities/               # Domain entities
│   ├── features/               # Business features
│   ├── lib/                    # Core automation libraries
│   ├── widgets/                # Layout components
│   ├── shared/                 # Shared utilities
│   └── i18n/                   # Internationalization
├── messages/                   # Translation files
├── public/                     # Static assets
├── e2e/                        # E2E tests
└── [config files]              # Root configuration
```

## Directory Purposes

**src/app/[locale]/**

- Purpose: Next.js pages with i18n
- Contains: Page components, layouts
- Key files: `page.tsx` (home), `layout.tsx` (root layout)
- Subdirectories: `[category]/`, `dashboard/`, `auth/`, `pricing/`

**src/app/api/**

- Purpose: Backend API routes
- Contains: Route handlers (GET, POST, etc.)
- Key files: `cron/trends/route.ts`, `webhooks/lemonsqueezy/route.ts`
- Subdirectories: `cron/`, `webhooks/`, `checkout/`, `subscription/`

**src/entities/**

- Purpose: Domain models and queries
- Contains: Types, Supabase queries, hooks
- Key files: `trend/model/types.ts`, `trend/model/queries.ts`
- Subdirectories: `trend/`, `author/`, `subscription/`

**src/features/**

- Purpose: Business feature modules
- Contains: UI components, state hooks
- Key files: `auth/ui/auth-form.tsx`, `billing/ui/billing-content.tsx`
- Subdirectories: `auth/`, `billing/`

**src/lib/**

- Purpose: Core automation libraries
- Contains: Trend detection, AI generation, web search
- Key files: `trend-detector/index.ts`, `content-generator/index.ts`
- Subdirectories: `trend-detector/sources/`, `content-generator/prompts/`

**src/widgets/**

- Purpose: Reusable layout components
- Contains: Navigation, ads, footer
- Key files: `header/ui/header.tsx`, `sidebar/ui/sidebar.tsx`
- Subdirectories: `header/`, `sidebar/`, `footer/`, `ad-unit/`, `user-menu/`

**src/shared/**

- Purpose: Framework-agnostic utilities
- Contains: UI library, hooks, config, clients
- Key files: `lib/supabase/client.ts`, `config/site.ts`
- Subdirectories: `ui/`, `lib/`, `config/`, `types/`

## Key File Locations

**Entry Points:**

- `src/app/[locale]/layout.tsx` - Root layout with providers
- `src/app/[locale]/page.tsx` - Home page

**Configuration:**

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `vercel.json` - Cron job schedules
- `eslint.config.mjs` - ESLint with FSD boundaries

**Core Logic:**

- `src/lib/trend-detector/index.ts` - Trend collection
- `src/lib/content-generator/index.ts` - AI article generation
- `src/entities/trend/model/queries.ts` - Article database queries

**Testing:**

- `vitest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration
- `src/shared/lib/**/*.test.ts` - Unit test files
- `e2e/*.spec.ts` - E2E test files

**Documentation:**

- `README.md` - Project overview
- `CLAUDE.md` - AI assistant instructions
- `src/*/README.md` - Layer-specific docs

## Naming Conventions

**Files:**

- `kebab-case.ts` - TypeScript modules
- `kebab-case.tsx` - React components
- `*.test.ts` - Unit tests (co-located)
- `*.spec.ts` - E2E tests

**Directories:**

- `kebab-case/` - All directories
- `model/` - Types and queries in entities
- `ui/` - React components in features/widgets
- `lib/` - Utilities and hooks

**Special Patterns:**

- `page.tsx` - Next.js page component
- `layout.tsx` - Next.js layout component
- `route.ts` - Next.js API route
- `index.ts` - Barrel exports

## Where to Add New Code

**New Page:**

- Implementation: `src/app/[locale]/[page-name]/page.tsx`
- Layout (optional): `src/app/[locale]/[page-name]/layout.tsx`

**New API Route:**

- Implementation: `src/app/api/[route-name]/route.ts`
- Cron job: `src/app/api/cron/[job-name]/route.ts`

**New Entity:**

- Types: `src/entities/[name]/model/types.ts`
- Queries: `src/entities/[name]/model/queries.ts`
- Barrel: `src/entities/[name]/index.ts`

**New Feature:**

- Hook: `src/features/[name]/model/use-[name].ts`
- UI: `src/features/[name]/ui/[component].tsx`
- Barrel: `src/features/[name]/index.ts`

**New Widget:**

- Component: `src/widgets/[name]/ui/[name].tsx`
- Barrel: `src/widgets/[name]/index.ts`

**Shared Utility:**

- Hook: `src/shared/lib/hooks/use-[name].ts`
- Utility: `src/shared/lib/[name].ts`
- UI Component: `src/shared/ui/[name].tsx`

## Special Directories

**messages/**

- Purpose: Translation JSON files
- Files: `en.json`, `ko.json`, `ja.json`, etc.
- Committed: Yes

**.next/**

- Purpose: Next.js build output
- Generated: By `npm run build`
- Committed: No (.gitignore)

**public/**

- Purpose: Static assets
- Contains: Icons, images, PWA manifest
- Committed: Yes

---

_Structure analysis: 2026-01-13_
_Update when directory structure changes_
