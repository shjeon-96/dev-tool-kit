# Conventions

**Analysis Date:** 2026-01-13

## Code Style

**Formatting:**

- Tool: Prettier (`.prettierrc` not detected, using defaults)
- Indentation: 2 spaces
- Quotes: Double quotes for JSX, single quotes elsewhere
- Semicolons: Yes
- Trailing commas: ES5 style

**Linting:**

- Tool: ESLint 9.x with `eslint.config.mjs`
- Extends: Next.js core web vitals
- Custom rules: FSD layer boundary enforcement
- TypeScript: Strict mode enabled (`tsconfig.json`)

## Naming Conventions

**Files:**

- Components: `kebab-case.tsx` (e.g., `auth-form.tsx`, `billing-content.tsx`)
- Utilities: `kebab-case.ts` (e.g., `rate-limiter.ts`, `logger.ts`)
- Types: `types.ts` in `model/` directories
- Tests: `*.test.ts` co-located with source

**Directories:**

- All lowercase with hyphens: `trend-detector/`, `content-generator/`
- FSD layers: `entities/`, `features/`, `widgets/`, `shared/`
- Internal structure: `model/`, `ui/`, `lib/`

**Components:**

- PascalCase for component names: `AuthForm`, `BillingContent`
- Props interfaces: `[ComponentName]Props`

**Functions:**

- camelCase for functions: `getPublishedArticles`, `generateArticleContent`
- Hooks: `use[Name]` prefix (e.g., `useAuth`, `useSubscription`)
- Event handlers: `handle[Event]` or `on[Event]`

**Variables:**

- camelCase for variables: `articleCount`, `isLoading`
- Constants: SCREAMING_SNAKE_CASE for config (e.g., `SITE_CONFIG`, `AD_SLOTS`)
- Booleans: `is`, `has`, `should` prefixes

## Common Patterns

**Server Components (Default):**

```typescript
// src/app/[locale]/[category]/page.tsx
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  // Direct data fetching, no hooks
}
```

**Client Components:**

```typescript
// src/features/auth/ui/auth-form.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function AuthForm() {
  const t = useTranslations("auth");
  // Client-side interactivity
}
```

**Entity Pattern:**

```typescript
// src/entities/[name]/model/types.ts
export interface EntityName { ... }

// src/entities/[name]/model/queries.ts
export async function getEntityById(id: string) { ... }

// src/entities/[name]/index.ts
export * from "./model/types";
export * from "./model/queries";
```

**Supabase Queries:**

```typescript
// Server-side with service role
import { getUntypedServiceClient } from "@/shared/lib/supabase/server";

const supabase = getUntypedServiceClient();
const { data, error } = await supabase
  .from("articles")
  .select("*")
  .eq("status", "published");
```

**API Routes:**

```typescript
// src/app/api/[route]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Process request
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

**i18n Usage:**

```typescript
// Server Component
import { getTranslations } from "next-intl/server";
const t = await getTranslations("namespace");

// Client Component
("use client");
import { useTranslations } from "next-intl";
const t = useTranslations("namespace");
```

## Import Order

**Standard ordering (not enforced by tooling):**

1. React/Next.js imports
2. Third-party libraries
3. Internal aliases (`@/entities/`, `@/features/`, etc.)
4. Relative imports
5. Type imports

**Path Aliases:**

- `@/*` → `src/*` (configured in `tsconfig.json`)

## Documentation Style

**Comments:**

- JSDoc for public APIs (optional, not enforced)
- Inline comments for complex logic
- TODO/FIXME for known issues

**File Headers:**

- Not required by convention

**README Files:**

- Layer-level READMEs: `src/*/README.md`
- Project README: `README.md`
- AI Instructions: `CLAUDE.md`

---

_Conventions analysis: 2026-01-13_
_Update when coding standards change_
