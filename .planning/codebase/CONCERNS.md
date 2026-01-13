# Concerns

**Analysis Date:** 2026-01-13

## Technical Debt

**Type Safety Issues:**

- Pattern: `as never` type assertions found in multiple files
- Files:
  - `src/app/[locale]/pricing/page.tsx`
  - `src/features/billing/ui/billing-content.tsx`
  - `src/shared/lib/supabase/server.ts`
- Impact: Bypasses TypeScript safety, may hide runtime errors
- Recommendation: Replace with proper type definitions or type guards

**Untyped Service Client:**

- File: `src/shared/lib/supabase/server.ts`
- Issue: `getUntypedServiceClient()` lacks database type safety
- Impact: No autocomplete or type checking for queries
- Recommendation: Generate Supabase types and use typed client

## Known Issues

**Error Handling Gaps:**

- Location: `src/lib/content-generator/index.ts`
- Issue: AI generation errors may not be properly caught
- Impact: Failed generations could leave articles in inconsistent state
- Recommendation: Add comprehensive try/catch with rollback logic

**Rate Limiting Edge Cases:**

- Location: `src/shared/lib/api/rate-limiter.ts`
- Issue: KV connection failures may block requests
- Impact: Service availability during KV outages
- Recommendation: Add fallback to in-memory limiting

## Missing Tests

**High Priority (Business Critical):**

- `src/app/api/webhooks/lemonsqueezy/route.ts` - Payment webhook handling
- `src/features/auth/` - Authentication flows
- `src/lib/content-generator/` - AI content generation

**Medium Priority:**

- `src/lib/trend-detector/` - Trend collection logic
- `src/entities/trend/model/queries.ts` - Article queries
- `src/entities/subscription/` - Subscription status checks

**Low Priority:**

- Widget components (header, sidebar, footer)
- Utility functions (most have basic tests)

## Security Considerations

**Webhook Verification:**

- Status: Implemented
- Location: `src/app/api/webhooks/lemonsqueezy/route.ts`
- Method: HMAC signature validation
- Note: Ensure secret rotation policy exists

**API Key Exposure:**

- Status: Properly secured
- Server keys: Only in server components and API routes
- Client keys: Only `NEXT_PUBLIC_*` prefixed variables exposed

**Rate Limiting:**

- Status: Implemented
- Location: `src/shared/lib/api/rate-limiter.ts`
- Tiers: Free, Pro, Enterprise limits defined

## Performance Considerations

**ISR Revalidation:**

- Pattern: Incremental Static Regeneration for articles
- Concern: Revalidation timing may cause stale content
- Recommendation: Monitor cache hit rates

**Image Optimization:**

- Tool: Sharp 0.34.5 configured
- Status: Next.js Image component used
- Concern: Large hero images on article pages
- Recommendation: Audit image sizes and formats

**Bundle Size:**

- Analyzer: `@next/bundle-analyzer` available
- Concern: Multiple Radix UI packages may increase bundle
- Recommendation: Run bundle analysis periodically

## Documentation Gaps

**Missing Documentation:**

- Cron job failure handling procedures
- LemonSqueezy webhook event handling details
- Content generation prompt engineering guide
- Database schema documentation

**Outdated Documentation:**

- Check if README matches current feature set
- Verify CLAUDE.md reflects latest API patterns

## Dependency Concerns

**Major Version Updates Available:**

- Check for security updates regularly
- Next.js 16 is latest (good)
- React 19 is latest (good)

**Deprecated Packages:**

- None detected in current dependency tree

## Improvement Opportunities

**Code Organization:**

- Consider extracting repeated patterns into shared utilities
- Some API routes have duplicated error handling logic

**Testing Infrastructure:**

- Add MSW for API mocking in tests
- Set up CI/CD test pipeline
- Add visual regression testing for UI components

**Monitoring:**

- Consider adding error tracking (Sentry)
- Add performance monitoring (Web Vitals)
- Implement structured logging for cron jobs

---

_Concerns analysis: 2026-01-13_
_Review and update quarterly_
