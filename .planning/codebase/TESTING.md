# Testing

**Analysis Date:** 2026-01-13

## Framework

**Unit Testing:**

- Framework: Vitest 3.2.4 (`vitest.config.ts`)
- Environment: jsdom for DOM testing
- Coverage: v8 provider
- UI: `@vitest/ui` available

**Component Testing:**

- Library: Testing Library React 16.3.1
- Pattern: Render → Query → Assert

**E2E Testing:**

- Framework: Playwright 1.57.0 (`playwright.config.ts`)
- Browsers: Chromium, Firefox, WebKit
- Base URL: `http://localhost:3000`

## Test Structure

**Organization:**

```
src/
├── shared/lib/
│   └── *.test.ts          # Co-located unit tests
├── entities/
│   └── [name]/model/
│       └── *.test.ts      # Entity unit tests
└── ...

e2e/
└── *.spec.ts              # E2E test files
```

**Naming Conventions:**

- Unit tests: `*.test.ts` (co-located with source)
- E2E tests: `*.spec.ts` (in `e2e/` directory)

**Test Commands:**

```bash
npm run test           # Run Vitest unit tests
npm run test:ui        # Vitest with UI
npm run test:coverage  # With coverage report
npm run test:e2e       # Playwright E2E tests
```

## Test Patterns

**Unit Test Example:**

```typescript
// src/shared/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { formatDate, slugify } from "./utils";

describe("formatDate", () => {
  it("formats ISO date to readable string", () => {
    expect(formatDate("2024-01-15")).toBe("January 15, 2024");
  });
});

describe("slugify", () => {
  it("converts string to URL-safe slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
});
```

**Component Test Example:**

```typescript
// src/features/auth/ui/auth-form.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthForm } from "./auth-form";

describe("AuthForm", () => {
  it("shows validation error for invalid email", async () => {
    render(<AuthForm />);
    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "invalid" } });
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});
```

**E2E Test Example:**

```typescript
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test("home page loads trending articles", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /trending/i })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(5);
});
```

## Coverage

**Current State:**

- Unit test files detected in `src/shared/lib/`
- E2E test files detected in `e2e/`
- Coverage reporting configured (v8 provider)

**Coverage Gaps Identified:**

- `src/lib/trend-detector/` - Core automation logic lacks tests
- `src/lib/content-generator/` - AI generation lacks tests
- `src/entities/` - Entity queries lack comprehensive tests
- `src/features/auth/` - Auth flows need more coverage

**Coverage Configuration:**

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
```

## Test Utilities

**Setup Files:**

- `vitest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration

**Mocking:**

- Vitest built-in mocking (`vi.mock()`, `vi.fn()`)
- MSW not detected (consider for API mocking)

**Fixtures:**

- No centralized fixture system detected
- Consider adding `test/fixtures/` for shared test data

## Best Practices (Project-Specific)

**What to Test:**

1. Entity query functions (`src/entities/*/model/queries.ts`)
2. Utility functions (`src/shared/lib/`)
3. Critical user flows (auth, billing)
4. Automation pipelines (trend detection, content generation)

**What's Currently Tested:**

- Basic utility functions in `src/shared/lib/`
- Core E2E flows for homepage

**Testing Priority:**

1. High: Payment webhooks, authentication
2. Medium: Content generation, trend detection
3. Low: UI components, styling

---

_Testing analysis: 2026-01-13_
_Update when test infrastructure changes_
