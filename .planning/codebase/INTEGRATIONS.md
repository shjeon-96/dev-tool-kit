# Integrations

**Analysis Date:** 2026-01-13

## External APIs

**Anthropic Claude AI:**

- Package: `@anthropic-ai/sdk` 0.71.2
- Purpose: AI content generation for articles
- Client: `src/lib/content-generator/index.ts`
- Config: `ANTHROPIC_API_KEY` environment variable
- Usage: RAG-based article generation with web search context

**Tavily Search:**

- Package: `@tavily/core` 0.6.4
- Purpose: Web search for RAG (Retrieval Augmented Generation)
- Client: `src/lib/web-search/`
- Config: `TAVILY_API_KEY` environment variable (optional)
- Usage: Provides context for AI content generation

**Google Trends:**

- Package: `google-trends-api` 4.9.2
- Purpose: Trend detection and keyword discovery
- Client: `src/lib/trend-detector/sources/`
- Config: No API key required
- Usage: Daily trending topics collection

## Database

**Supabase:**

- Package: `@supabase/supabase-js` 2.78.0, `@supabase/ssr` 0.7.0
- Purpose: PostgreSQL database + Auth + Realtime
- Clients:
  - Browser: `src/shared/lib/supabase/client.ts`
  - Server: `src/shared/lib/supabase/server.ts`
  - Middleware: `src/shared/lib/supabase/middleware.ts`
- Config:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only)

**Key Tables:**

- `articles` - Published and draft articles
- `article_analytics` - View counts and metrics
- `trends` - Collected trend data
- `profiles` - User profiles
- `subscriptions` - Subscription status

## Payment Processing

**LemonSqueezy:**

- Package: `@lemonsqueezy/lemonsqueezy.js` 2.2.0
- Purpose: Subscription payments and billing
- Client: `src/shared/lib/lemonsqueezy/`
- Config:
  - `LEMONSQUEEZY_API_KEY`
  - `LEMONSQUEEZY_STORE_ID`
  - `LEMONSQUEEZY_WEBHOOK_SECRET`
- Endpoints:
  - `src/app/api/checkout/route.ts` - Create checkout session
  - `src/app/api/webhooks/lemonsqueezy/route.ts` - Handle webhooks
  - `src/app/api/subscription/route.ts` - Subscription management

## Caching

**Vercel KV:**

- Package: `@vercel/kv` 3.0.0
- Purpose: Distributed Redis-compatible cache
- Client: `src/shared/lib/kv.ts`
- Config:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
- Usage: Rate limiting, session caching

## Analytics & Monitoring

**Google AdSense:**

- Purpose: Display advertising
- Config: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- Component: `src/widgets/ad-unit/`
- Slots: `src/shared/config/ad-slots.ts`

**OG Image Generation:**

- Package: `@vercel/og` 0.8.6
- Purpose: Dynamic Open Graph images
- Usage: Article social sharing previews

## Authentication

**Supabase Auth:**

- Package: `@supabase/ssr` 0.7.0
- Methods: Email/Password, OAuth (Google, Apple)
- Middleware: `src/shared/lib/supabase/middleware.ts`
- Feature: `src/features/auth/`
- Protected routes via middleware session check

## Webhooks

**Inbound:**

- `POST /api/webhooks/lemonsqueezy` - Payment events
  - Events: subscription_created, subscription_updated, order_created
  - Verification: HMAC signature validation

**Outbound:**

- Vercel Cron Jobs (scheduled via `vercel.json`)
  - `/api/cron/trends` - Every 2 hours
  - `/api/cron/generate-articles` - Every 4 hours
  - `/api/cron/publish-articles` - Every 1 hour

## Third-Party Services

**Vercel:**

- Hosting: Next.js deployment
- Cron: Scheduled jobs via `vercel.json`
- KV: Redis-compatible storage
- Analytics: Edge functions monitoring

**RSS Feeds:**

- Purpose: News trend detection
- Sources: Multiple RSS feeds parsed in `src/lib/trend-detector/sources/`
- Parsing: XML parsing for trend extraction

## Environment Variables Summary

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ANTHROPIC_API_KEY=...
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_WEBHOOK_SECRET=...

# Optional
TAVILY_API_KEY=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
NEXT_PUBLIC_ADSENSE_CLIENT_ID=...
```

---

_Integrations analysis: 2026-01-13_
_Update when external services change_
