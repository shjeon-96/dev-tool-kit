# Test Execution Skill

테스트를 실행하고 결과를 분석하는 워크플로우입니다.

## Trigger

- "테스트 실행해줘", "run tests"
- "테스트 통과했어?", "check tests"
- "커버리지", "coverage"

## Test Types

| 종류 | 위치               | 프레임워크 |
| ---- | ------------------ | ---------- |
| Unit | `src/**/*.test.ts` | Vitest     |
| E2E  | `e2e/*.spec.ts`    | Playwright |

## Commands

### Unit Tests (Vitest)

```bash
# Watch 모드 (개발 중)
npm run test

# 특정 패턴만 테스트
npm run test content-generator
npm run test queries

# 단일 실행 (CI용)
npm run test --run

# 커버리지 리포트
npm run test:coverage

# UI 모드
npm run test:ui
```

### E2E Tests (Playwright)

```bash
# 전체 E2E 실행
npm run test:e2e

# UI 모드 (디버깅용)
npm run test:e2e:ui

# 특정 파일만
npx playwright test e2e/article.spec.ts

# 특정 브라우저
npx playwright test --project=chromium

# 헤드풀 모드
npx playwright test --headed
```

## Test File Structure

### Unit Test Template

```typescript
// src/lib/content-generator/logic.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateContent, parseResponse } from "./logic";

describe("generateContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("valid input", () => {
    it("should generate content for trend", async () => {
      const result = await generateContent({
        keyword: "AI trends",
        category: "tech",
      });

      expect(result).toHaveProperty("title_ko");
      expect(result).toHaveProperty("title_en");
      expect(result).toHaveProperty("content_ko");
      expect(result).toHaveProperty("content_en");
    });
  });

  describe("error handling", () => {
    it("should throw on invalid input", async () => {
      await expect(generateContent({ keyword: "" })).rejects.toThrow(
        "Keyword is required",
      );
    });
  });
});

describe("parseResponse", () => {
  it("should parse JSON response correctly", () => {
    const response = '{"title": "Test"}';
    const result = parseResponse(response);
    expect(result.title).toBe("Test");
  });

  it("should handle malformed JSON", () => {
    expect(() => parseResponse("invalid")).toThrow();
  });
});
```

### E2E Test Template

```typescript
// e2e/article.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Article Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tech/sample-article");
  });

  test("should display article content", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("article")).toBeVisible();
  });

  test("should have correct SEO meta tags", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Web Toolkit");

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.+/);
  });

  test("should navigate to related articles", async ({ page }) => {
    await page
      .getByRole("link", { name: /related/i })
      .first()
      .click();
    await expect(page.getByRole("article")).toBeVisible();
  });
});
```

## TDD Workflow

### 1. Red Phase - 실패하는 테스트 작성

```typescript
it("should calculate reading time", () => {
  const result = calculateReadingTime("Lorem ipsum...", 200); // 200 words/min
  expect(result).toBe(5); // 5 minutes
});
```

### 2. Green Phase - 테스트 통과하는 최소 코드

```typescript
export function calculateReadingTime(content: string, wpm = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}
```

### 3. Refactor Phase - 코드 개선

```typescript
const DEFAULT_WPM = 200;

export function calculateReadingTime(
  content: string,
  wordsPerMinute = DEFAULT_WPM,
): number {
  if (!content.trim()) return 0;

  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

## Testing Focus Areas

### Trend Blog 특화 테스트

1. **Content Generator** (`src/lib/content-generator/`)
   - AI 응답 파싱
   - 프롬프트 템플릿
   - 에러 핸들링

2. **Trend Detector** (`src/lib/trend-detector/`)
   - 트렌드 소스 파싱
   - 우선순위 계산
   - 중복 감지

3. **Entity Queries** (`src/entities/trend/model/queries.ts`)
   - CRUD 작업
   - 필터링/정렬
   - 페이지네이션

4. **API Routes** (`src/app/api/`)
   - 인증 검사
   - 입력 검증
   - 에러 응답

## Mocking

### API 모킹

```typescript
import { vi } from "vitest";

vi.mock("@anthropic-ai/sdk", () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [{ text: '{"title": "Test"}' }],
      }),
    },
  })),
}));
```

### Supabase 모킹

```typescript
vi.mock("@/shared/lib/supabase/server", () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
    }),
  }),
}));
```

## Debugging Tips

### Vitest

```bash
# 특정 테스트만 실행
npm run test -- --testNamePattern="should calculate"

# 디버그 모드
npm run test -- --inspect-brk
```

### Playwright

```bash
# 디버그 모드
npx playwright test --debug

# 트레이스 뷰어
npx playwright show-report

# 느리게 실행
npx playwright test --slow-mo 1000
```

## CI Integration

```yaml
# .github/workflows/ci.yml
- name: Run unit tests
  run: npm run test --run

- name: Run E2E tests
  run: npm run test:e2e
```

## Quick Validation

```bash
# 코드 변경 후 빠른 검증
npx tsc --noEmit && npm run test --run
```
