# Test Execution Skill

테스트를 실행하고 결과를 분석하는 워크플로우입니다.

## Trigger

- "테스트 실행해줘", "run tests"
- "테스트 통과했어?", "check tests"
- 특정 도구/기능 테스트 요청

## Test Types

### Unit Tests (Vitest)

- **Location:** `src/features/*/lib/*.test.ts`, `src/shared/lib/**/*.test.ts`
- **Framework:** Vitest
- **Coverage:** `src/features/**/lib/**`, `src/shared/lib/**`

### E2E Tests (Playwright)

- **Location:** `e2e/*.spec.ts`
- **Framework:** Playwright
- **Specs:** 11 test files

## Commands

### Unit Tests

```bash
# Watch 모드 (개발 중)
npm run test

# 특정 패턴만 테스트
npm run test formatter      # 파일명에 'formatter' 포함
npm run test hash           # 파일명에 'hash' 포함

# 단일 실행 (CI용)
npm run test --run

# 커버리지 리포트
npm run test:coverage
```

### E2E Tests

```bash
# 전체 E2E 실행
npm run test:e2e

# UI 모드 (디버깅용)
npm run test:e2e:ui

# 특정 파일만
npx playwright test e2e/json-formatter.spec.ts

# 특정 브라우저
npx playwright test --project=chromium
```

## Test File Structure

### Unit Test Template

```typescript
// src/features/tool-name/lib/logic.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { processLogic, validateInput } from "./logic";

describe("processLogic", () => {
  describe("valid input", () => {
    it("should process simple input", () => {
      const result = processLogic("input");
      expect(result).toBe("expected");
    });

    it("should handle edge cases", () => {
      expect(processLogic("")).toBe("");
      expect(processLogic(null)).toBeNull();
    });
  });

  describe("error handling", () => {
    it("should throw on invalid input", () => {
      expect(() => processLogic("invalid")).toThrow("Error message");
    });
  });
});

describe("validateInput", () => {
  it("should validate correctly", () => {
    expect(validateInput("valid")).toBe(true);
    expect(validateInput("invalid")).toBe(false);
  });
});
```

### E2E Test Template

```typescript
// e2e/tool-name.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Tool Name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/tool-name");
  });

  test("should load the page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Tool Name/i }),
    ).toBeVisible();
  });

  test("should process input", async ({ page }) => {
    const input = page.getByRole("textbox").first();
    await input.fill("test input");

    await page.getByRole("button", { name: /Process/i }).click();

    const output = page.getByRole("textbox").last();
    await expect(output).toHaveValue(/expected/);
  });

  test("should handle errors", async ({ page }) => {
    await page.getByRole("button", { name: /Process/i }).click();
    await expect(page.getByText(/error/i)).toBeVisible();
  });
});
```

## Test-Driven Development (TDD) Workflow

### 1. Red Phase - 실패하는 테스트 작성

```typescript
it("should format JSON with 2-space indent", () => {
  const result = formatJson('{"a":1}', { indent: 2 });
  expect(result).toBe('{\n  "a": 1\n}');
});
```

### 2. Green Phase - 테스트 통과하는 최소 코드

```typescript
export function formatJson(input: string, options: { indent: number }) {
  return JSON.stringify(JSON.parse(input), null, options.indent);
}
```

### 3. Refactor Phase - 코드 개선

```typescript
export function formatJson(
  input: string,
  { indent = 2 }: FormatOptions = {},
): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}
```

## Coverage Goals

- **Target:** 80%+ line coverage for `lib/` directories
- **Focus:** Business logic in `src/features/*/lib/`
- **Skip:** UI components (tested via E2E)

## Debugging Tips

### Vitest

```bash
# 특정 테스트만 실행
npm run test -- --testNamePattern="should format"

# 디버그 모드
npm run test -- --inspect-brk
```

### Playwright

```bash
# 헤드풀 모드 (브라우저 표시)
npx playwright test --headed

# 느리게 실행
npx playwright test --slow-mo 1000

# 디버그 모드
npx playwright test --debug

# 트레이스 뷰어
npx playwright show-report
```

## CI Integration

GitHub Actions에서 자동 실행:

```yaml
# .github/workflows/ci.yml
- run: npm run test --run
- run: npm run test:e2e
```

## Common Issues

### 1. Test Timeout

```typescript
test(
  "slow operation",
  async () => {
    // 타임아웃 늘리기
  },
  { timeout: 30000 },
);
```

### 2. Flaky E2E Tests

```typescript
// 요소 대기
await expect(page.getByText("Result")).toBeVisible({ timeout: 10000 });

// 네트워크 대기
await page.waitForLoadState("networkidle");
```

### 3. Mock Dependencies

```typescript
import { vi } from "vitest";

vi.mock("./api", () => ({
  fetchData: vi.fn().mockResolvedValue({ data: "mock" }),
}));
```

## Quick Validation

코드 변경 후 빠른 검증:

```bash
# 타입 체크 + 관련 테스트
npx tsc --noEmit && npm run test --run -- [pattern]
```
