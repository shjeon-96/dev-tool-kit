# Architecture

**Analysis Date:** 2026-01-13

## Pattern Overview

**Overall:** Full-Stack AI-Powered Content Platform with Feature-Sliced Design (FSD)

**Key Characteristics:**

- Next.js 16 App Router with i18n
- Feature-Sliced Design layered architecture
- Automated content pipeline (Trend Detection → AI Generation → Publishing)
- Server-first rendering with React Server Components

## Layers

**Dependency Flow:** `app → widgets → features → entities → lib → shared`

**App Layer (`src/app/`):**

- Purpose: Next.js pages, layouts, API routes
- Contains: Page components, route handlers, cron jobs
- Depends on: widgets, features, entities, shared
- Used by: Framework (Next.js)

**Widgets Layer (`src/widgets/`):**

- Purpose: Reusable layout and navigation components
- Contains: Header, Sidebar, Footer, AdUnit
- Depends on: features, entities, shared
- Used by: App layer (layouts)

**Features Layer (`src/features/`):**

- Purpose: Business features with UI and state
- Contains: Auth forms, Billing UI, Blog components
- Depends on: entities, shared
- Used by: App, Widgets

**Entities Layer (`src/entities/`):**

- Purpose: Domain models and business data
- Contains: Types, Supabase queries, React hooks
- Depends on: shared
- Used by: Features, Lib, App

**Lib Layer (`src/lib/`):**

- Purpose: Core automation libraries
- Contains: Trend detector, Content generator, Web search
- Depends on: entities, shared
- Used by: API routes (cron jobs)

**Shared Layer (`src/shared/`):**

- Purpose: Framework-agnostic utilities
- Contains: UI components, hooks, config, Supabase client
- Depends on: nothing
- Used by: All layers

## Data Flow

**Content Pipeline (Automated):**

1. **Trend Collection** (`/api/cron/trends` every 2 hours)
   - `collectAllTrends()` in `src/lib/trend-detector/index.ts`
   - Sources: Google Trends, Reddit, News RSS
   - Output: Trends stored in Supabase `trends` table

2. **Article Generation** (`/api/cron/generate-articles` every 4 hours)
   - `generateArticleContent()` in `src/lib/content-generator/index.ts`
   - RAG: Web search via Tavily → Claude AI generation
   - Output: Draft articles in `articles` table

3. **Article Publishing** (`/api/cron/publish-articles` every 1 hour)
   - Update status: draft → published
   - ISR revalidation triggered

**User Request Flow:**

1. User visits `/:locale/[category]/[slug]`
2. Server Component fetches from Supabase (`entities/trend/model/queries.ts`)
3. Renders article with ads, related content
4. Client hydration for interactivity

**Payment Flow:**

1. User clicks Subscribe → POST `/api/checkout`
2. LemonSqueezy checkout session created
3. User completes payment → Webhook to `/api/webhooks/lemonsqueezy`
4. Subscription updated in Supabase
5. Client-side `useSubscription()` reflects premium status

**State Management:**

- Server state: Supabase queries (no client cache)
- Client state: React hooks (`useAuth`, `useSubscription`)
- No global state library (React context only)

## Key Abstractions

**Entity Pattern:**

- Purpose: Domain model encapsulation
- Examples: `src/entities/trend/`, `src/entities/author/`, `src/entities/subscription/`
- Structure: `model/types.ts`, `model/queries.ts`, optional `ui/`, `lib/`

**Library Pattern:**

- Purpose: Standalone automation services
- Examples: `src/lib/trend-detector/`, `src/lib/content-generator/`, `src/lib/web-search/`
- Pattern: Main export function + types + internal modules

**Widget Pattern:**

- Purpose: Layout components with internal logic
- Examples: `src/widgets/header/`, `src/widgets/sidebar/`, `src/widgets/ad-unit/`
- Structure: `ui/` subdirectory with components

**Supabase Client Pattern:**

- Browser: `src/shared/lib/supabase/client.ts` (createBrowserClient)
- Server: `src/shared/lib/supabase/server.ts` (createServerClient)
- Service: `getUntypedServiceClient()` for admin operations

## Entry Points

**Pages:**

- `src/app/[locale]/page.tsx` - Home (trending articles)
- `src/app/[locale]/[category]/[slug]/page.tsx` - Article detail
- `src/app/[locale]/dashboard/page.tsx` - User dashboard

**API Routes:**

- `src/app/api/cron/` - Automated jobs (Vercel Cron)
- `src/app/api/webhooks/lemonsqueezy/route.ts` - Payment webhook
- `src/app/api/checkout/route.ts` - Checkout session

**Build:**

- `next.config.ts` - Configuration entry
- `src/shared/lib/supabase/middleware.ts` - Auth middleware

## Error Handling

**Strategy:** Log and continue for cron jobs, fail fast for user requests

**Patterns:**

- API routes: try/catch with structured JSON responses
- Cron jobs: Log errors, continue to next item
- Custom errors: `AppError` class in `src/shared/lib/errors/`

## Cross-Cutting Concerns

**Logging:**

- Custom logger: `src/shared/lib/logger/logger.ts`
- Levels: debug, info, warn, error
- Production: info level only

**Validation:**

- Zod schemas for type validation
- Manual validation at API boundaries

**Authentication:**

- Supabase Auth (email/password, OAuth)
- Session via cookies (`@supabase/ssr`)
- Middleware: `src/shared/lib/supabase/middleware.ts`

**Rate Limiting:**

- Vercel KV-based limiter: `src/shared/lib/api/rate-limiter.ts`
- Tier-based limits (free, pro, enterprise)

---

_Architecture analysis: 2026-01-13_
_Update when major patterns change_
