# DevToolkit 테스트 전략

## 🎯 테스트 목표

### 핵심 목표
1. **안정성**: 모든 도구가 예상대로 작동
2. **성능**: 빠른 응답 시간 보장
3. **호환성**: 모든 브라우저에서 동작
4. **보안**: 클라이언트 사이드 처리 검증

### 목표 지표
- **코드 커버리지**: 80% 이상 (단위 테스트)
- **E2E 커버리지**: 핵심 사용자 시나리오 100%
- **성능**: 모든 작업 3초 이내 완료
- **에러율**: 0.1% 미만

---

## 🧪 테스트 피라미드

```
        /\
       /E2E\      10% - 사용자 시나리오
      /______\
     /  통합  \    20% - 컴포넌트 통합
    /__________\
   /   단위     \  70% - 함수/컴포넌트
  /______________\
```

---

## 📋 테스트 유형별 전략

### 1. 단위 테스트 (Unit Tests)

#### 테스트 프레임워크
```json
{
  "vitest": "^1.0.0",          // Jest 대체, Vite 기반
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "@testing-library/user-event": "^14.0.0"
}
```

#### 테스트 구조
```typescript
// features/json-formatter/lib/formatter.test.ts
import { describe, it, expect } from 'vitest';
import { formatJSON, minifyJSON, validateJSON } from './formatter';

describe('JSON Formatter', () => {
  describe('formatJSON', () => {
    it('should format valid JSON with 2 spaces', () => {
      const input = '{"name":"John","age":30}';
      const expected = '{\n  "name": "John",\n  "age": 30\n}';
      expect(formatJSON(input)).toBe(expected);
    });
    
    it('should handle nested objects', () => {
      const input = '{"user":{"name":"John","details":{"age":30}}}';
      const result = formatJSON(input);
      expect(result).toContain('  "user": {');
      expect(result).toContain('    "name": "John"');
    });
    
    it('should throw error for invalid JSON', () => {
      const input = '{"name": "John"';
      expect(() => formatJSON(input)).toThrow('Invalid JSON');
    });
  });
  
  describe('minifyJSON', () => {
    it('should remove all whitespace', () => {
      const input = '{\n  "name": "John",\n  "age": 30\n}';
      const expected = '{"name":"John","age":30}';
      expect(minifyJSON(input)).toBe(expected);
    });
  });
});
```

#### 컴포넌트 테스트
```typescript
// features/json-formatter/ui/JsonFormatter.test.tsx
import { render, screen, userEvent } from '@testing-library/react';
import { JsonFormatter } from './JsonFormatter';

describe('JsonFormatter Component', () => {
  it('should format JSON on button click', async () => {
    const user = userEvent.setup();
    render(<JsonFormatter />);
    
    const input = screen.getByLabelText('Input JSON');
    const formatButton = screen.getByText('Format');
    
    await user.type(input, '{"test":true}');
    await user.click(formatButton);
    
    expect(screen.getByLabelText('Output')).toHaveValue(
      '{\n  "test": true\n}'
    );
  });
  
  it('should show error for invalid JSON', async () => {
    const user = userEvent.setup();
    render(<JsonFormatter />);
    
    const input = screen.getByLabelText('Input JSON');
    await user.type(input, '{"invalid"}');
    
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Invalid JSON syntax'
    );
  });
});
```

#### 커스텀 Hook 테스트
```typescript
// hooks/useJsonFormatter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useJsonFormatter } from './useJsonFormatter';

describe('useJsonFormatter', () => {
  it('should format JSON correctly', () => {
    const { result } = renderHook(() => useJsonFormatter());
    
    act(() => {
      result.current.setInput('{"test":true}');
      result.current.format();
    });
    
    expect(result.current.output).toBe('{\n  "test": true\n}');
    expect(result.current.error).toBeNull();
  });
});
```

### 테스트 커버리지 목표

| 카테고리 | 목표 | 우선순위 |
|---------|------|---------|
| 비즈니스 로직 | 95%+ | 필수 |
| UI 컴포넌트 | 80%+ | 높음 |
| 유틸리티 | 100% | 필수 |
| Hooks | 90%+ | 높음 |

---

### 2. 통합 테스트 (Integration Tests)

#### 도구 통합 테스트
```typescript
// features/image-resizer/ImageResizer.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageResizer } from './ImageResizer';

describe('Image Resizer Integration', () => {
  it('should resize image and download result', async () => {
    const user = userEvent.setup();
    render(<ImageResizer />);
    
    // 1. 파일 업로드
    const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Upload image');
    await user.upload(input, file);
    
    // 2. 크기 설정
    const widthInput = screen.getByLabelText('Width');
    await user.clear(widthInput);
    await user.type(widthInput, '800');
    
    // 3. 처리
    const processButton = screen.getByText('Resize');
    await user.click(processButton);
    
    // 4. 결과 확인
    await waitFor(() => {
      expect(screen.getByText('Download')).toBeInTheDocument();
    });
    
    // 5. 다운로드 시뮬레이션
    const downloadSpy = jest.spyOn(window, 'saveAs');
    await user.click(screen.getByText('Download'));
    
    expect(downloadSpy).toHaveBeenCalledWith(
      expect.any(Blob),
      'resized-test.jpg'
    );
  });
});
```

#### API 모킹
```typescript
// __tests__/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/process', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, result: 'processed' })
    );
  })
];

// __tests__/setup.ts
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

### 3. E2E 테스트 (End-to-End Tests)

#### Playwright 설정
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 2,
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
```

#### 사용자 시나리오 테스트
```typescript
// e2e/json-formatter.spec.ts
import { test, expect } from '@playwright/test';

test.describe('JSON Formatter E2E', () => {
  test('complete user journey', async ({ page }) => {
    // 1. 페이지 방문
    await page.goto('/tools/json-formatter');
    
    // 2. JSON 입력
    const input = page.locator('[data-testid="json-input"]');
    await input.fill('{"name":"test","value":123}');
    
    // 3. 포맷 버튼 클릭
    await page.click('button:has-text("Format")');
    
    // 4. 결과 확인
    const output = page.locator('[data-testid="json-output"]');
    await expect(output).toContainText('"name": "test"');
    
    // 5. 복사 기능 테스트
    await page.click('button:has-text("Copy")');
    
    // 6. 클립보드 확인
    const clipboardText = await page.evaluate(() => 
      navigator.clipboard.readText()
    );
    expect(clipboardText).toContain('"name": "test"');
    
    // 7. 다운로드 테스트
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Download")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('formatted.json');
  });
  
  test('error handling', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    
    // 잘못된 JSON 입력
    await page.fill('[data-testid="json-input"]', '{"invalid"}');
    
    // 에러 메시지 확인
    await expect(page.locator('.error-message')).toContainText(
      'Invalid JSON syntax'
    );
  });
});
```

#### 크로스 브라우저 테스트
```typescript
// e2e/cross-browser.spec.ts
import { test, expect, devices } from '@playwright/test';

const browsers = ['chromium', 'firefox', 'webkit'];

browsers.forEach(browserName => {
  test.describe(`Image Resizer - ${browserName}`, () => {
    test('should work across browsers', async ({ page }) => {
      await page.goto('/tools/image-resizer');
      
      // 파일 업로드 테스트
      await page.setInputFiles('input[type="file"]', 'test-image.jpg');
      
      // Canvas 렌더링 확인
      const canvas = page.locator('canvas');
      await expect(canvas).toBeVisible();
      
      // 다운로드 기능 확인
      const downloadPromise = page.waitForEvent('download');
      await page.click('button:has-text("Download")');
      await downloadPromise;
    });
  });
});
```

---

### 4. 성능 테스트

#### Lighthouse CI
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/tools/json-formatter',
        'http://localhost:3000/tools/image-resizer'
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:pwa': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

#### 부하 테스트
```typescript
// performance/load-test.ts
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '30s', target: 100 },  // Ramp up
    { duration: '1m', target: 100 },   // Stay at 100
    { duration: '30s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
};

export default function() {
  // JSON Formatter 테스트
  const payload = JSON.stringify({
    input: '{"test": true, "array": [1,2,3]}',
    action: 'format'
  });
  
  const response = http.post(
    'http://localhost:3000/api/format',
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

---

### 5. 접근성 테스트

#### 자동화된 접근성 테스트
```typescript
// a11y/accessibility.test.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test('JSON Formatter should be accessible', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    await injectAxe(page);
    
    const violations = await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    });
    
    expect(violations).toHaveLength(0);
  });
  
  test('keyboard navigation', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    
    // Tab으로 모든 요소 접근 가능
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => 
      document.activeElement?.tagName
    );
    expect(focusedElement).toBeTruthy();
    
    // Enter로 버튼 클릭
    await page.keyboard.press('Enter');
  });
});
```

#### 스크린 리더 테스트
```typescript
// a11y/screen-reader.test.ts
test('screen reader announcements', async ({ page }) => {
  await page.goto('/tools/json-formatter');
  
  // ARIA live region 확인
  const liveRegion = page.locator('[role="status"]');
  
  // 작업 수행
  await page.fill('[data-testid="json-input"]', '{"test":true}');
  await page.click('button:has-text("Format")');
  
  // 성공 메시지 확인
  await expect(liveRegion).toContainText('JSON formatted successfully');
});
```

---

## 🔧 테스트 환경 설정

### 1. CI/CD 파이프라인

#### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
      
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
  
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
  
  performance-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      
      - name: Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

### 2. 테스트 스크립트

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:a11y": "playwright test --grep @a11y",
    "test:perf": "k6 run performance/load-test.ts",
    "test:all": "npm run test:unit && npm run test:e2e"
  }
}
```

---

## 📊 테스트 메트릭스

### 도구별 테스트 요구사항

| 도구 | 단위 테스트 | 통합 테스트 | E2E 테스트 | 특수 테스트 |
|-----|------------|------------|-----------|------------|
| JSON Formatter | 파싱, 포맷팅, 검증 | 에디터 통합 | 전체 플로우 | 대용량 JSON |
| JWT Decoder | 디코딩, 만료 체크 | UI 업데이트 | 복사 기능 | 다양한 토큰 |
| Image Resizer | 크기 계산, 압축 | Canvas 렌더링 | 드래그앤드롭 | 다양한 포맷 |
| Base64 | 인코딩/디코딩 | 파일 처리 | 업로드/다운로드 | 대용량 파일 |

### 브라우저 지원 매트릭스

| 브라우저 | 최소 버전 | 테스트 빈도 |
|---------|----------|------------|
| Chrome | 90+ | 모든 커밋 |
| Firefox | 88+ | 모든 커밋 |
| Safari | 14+ | 모든 커밋 |
| Edge | 90+ | 주간 |
| Mobile Safari | 14+ | PR 시 |
| Mobile Chrome | 90+ | PR 시 |

---

## 🚨 에러 처리 테스트

### 엣지 케이스
```typescript
describe('Edge Cases', () => {
  test('handles extremely large files', async () => {
    const largeFile = new File([new ArrayBuffer(100 * 1024 * 1024)], 'large.bin');
    // 100MB 파일 처리 테스트
  });
  
  test('handles special characters', () => {
    const specialChars = '{"emoji":"🎉","korean":"안녕하세요"}';
    expect(formatJSON(specialChars)).toContain('🎉');
  });
  
  test('handles concurrent operations', async () => {
    const promises = Array(10).fill(null).map(() => 
      processImage(testImage)
    );
    const results = await Promise.all(promises);
    expect(results).toHaveLength(10);
  });
});
```

---

## 📅 테스트 실행 일정

### 지속적 테스트
- **모든 커밋**: 단위 테스트, 린트
- **PR 생성**: 통합 테스트, E2E 기본
- **머지 전**: 전체 E2E, 성능 테스트
- **배포 전**: 전체 테스트 스위트

### 정기 테스트
- **일간**: 스모크 테스트
- **주간**: 전체 크로스 브라우저
- **월간**: 보안 감사, 접근성 감사

---

## ✅ 테스트 체크리스트

### 새 기능 추가 시
- [ ] 단위 테스트 작성 (커버리지 80%+)
- [ ] 통합 테스트 추가
- [ ] E2E 시나리오 추가
- [ ] 엣지 케이스 테스트
- [ ] 크로스 브라우저 확인
- [ ] 접근성 테스트
- [ ] 성능 벤치마크
- [ ] 에러 처리 테스트

### 릴리즈 전
- [ ] 전체 테스트 스위트 통과
- [ ] 커버리지 목표 달성
- [ ] 성능 기준 충족
- [ ] 접근성 검사 통과
- [ ] 보안 스캔 완료
- [ ] 사용자 시나리오 검증