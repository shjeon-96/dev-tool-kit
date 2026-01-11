# Feature Development Skill

새 기능을 처음부터 끝까지 개발하는 통합 워크플로우입니다.

## Trigger

- "기능 만들어줘", "create feature"
- "새 기능 추가", "add feature"
- "[기능명] 구현해줘"

## Feature 구조 (FSD)

```
src/features/[feature-name]/
├── model/
│   └── use-[feature].ts     # 상태/로직 Hook
├── lib/
│   ├── [logic].ts           # 순수 함수
│   └── [logic].test.ts      # 단위 테스트
├── ui/
│   ├── [component].tsx      # UI 컴포넌트
│   └── index.ts             # UI 배럴 export
└── index.ts                 # Feature 배럴 export
```

## 단계별 가이드

### Step 1: 계획

```markdown
1. 기능 요구사항 정리
2. 필요한 데이터/타입 파악
3. UI 컴포넌트 구조 설계
4. API 엔드포인트 필요 여부 확인
```

### Step 2: 타입 정의

```typescript
// src/features/[feature]/model/types.ts
export interface FeatureData {
  id: string;
  name: string;
  // ...
}

export interface FeatureState {
  data: FeatureData | null;
  isLoading: boolean;
  error: Error | null;
}
```

### Step 3: 순수 함수 (테스트 가능)

```typescript
// src/features/[feature]/lib/logic.ts
export function processFeatureData(input: string): FeatureData {
  // 순수 함수 로직
  return {
    id: generateId(),
    name: input.trim(),
  };
}

export function validateInput(input: string): boolean {
  return input.length > 0 && input.length < 200;
}
```

### Step 4: 단위 테스트

```typescript
// src/features/[feature]/lib/logic.test.ts
import { describe, it, expect } from "vitest";
import { processFeatureData, validateInput } from "./logic";

describe("processFeatureData", () => {
  it("should process valid input", () => {
    const result = processFeatureData("test");
    expect(result.name).toBe("test");
  });
});

describe("validateInput", () => {
  it("should return true for valid input", () => {
    expect(validateInput("valid")).toBe(true);
  });

  it("should return false for empty input", () => {
    expect(validateInput("")).toBe(false);
  });
});
```

### Step 5: Custom Hook

```typescript
// src/features/[feature]/model/use-feature.ts
"use client";

import { useState, useCallback } from "react";
import { processFeatureData, validateInput } from "../lib/logic";

export function useFeature() {
  const [data, setData] = useState<FeatureData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const process = useCallback(async (input: string) => {
    if (!validateInput(input)) {
      setError(new Error("Invalid input"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = processFeatureData(input);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    process,
    reset,
  };
}
```

### Step 6: UI 컴포넌트

```typescript
// src/features/[feature]/ui/feature-form.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Alert } from "@/shared/ui";
import { useFeature } from "../model/use-feature";

export function FeatureForm() {
  const t = useTranslations("feature");
  const [input, setInput] = useState("");
  const { data, isLoading, error, process, reset } = useFeature();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    process(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("inputPlaceholder")}
        disabled={isLoading}
      />

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t("processing") : t("submit")}
        </Button>
        <Button type="button" variant="outline" onClick={reset}>
          {t("reset")}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          {error.message}
        </Alert>
      )}

      {data && (
        <div className="p-4 bg-muted rounded-lg">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}
```

### Step 7: 배럴 Export

```typescript
// src/features/[feature]/ui/index.ts
export { FeatureForm } from "./feature-form";

// src/features/[feature]/index.ts
export { useFeature } from "./model/use-feature";
export { FeatureForm } from "./ui";
export type { FeatureData, FeatureState } from "./model/types";
```

### Step 8: 페이지에 연결

```typescript
// src/app/[locale]/[feature]/page.tsx
import { getTranslations } from "next-intl/server";
import { FeatureForm } from "@/features/[feature]";

export default async function FeaturePage() {
  const t = await getTranslations("feature");

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <FeatureForm />
    </div>
  );
}
```

### Step 9: 번역 추가

```json
// messages/en.json
{
  "feature": {
    "title": "Feature Name",
    "inputPlaceholder": "Enter value...",
    "submit": "Submit",
    "reset": "Reset",
    "processing": "Processing..."
  }
}

// messages/ko.json
{
  "feature": {
    "title": "기능 이름",
    "inputPlaceholder": "값을 입력하세요...",
    "submit": "제출",
    "reset": "초기화",
    "processing": "처리 중..."
  }
}
```

## 체크리스트

```markdown
### Feature 개발 체크리스트

- [ ] 요구사항 정리
- [ ] 타입 정의 (model/types.ts)
- [ ] 순수 함수 구현 (lib/\*.ts)
- [ ] 단위 테스트 작성 (lib/\*.test.ts)
- [ ] Custom Hook 구현 (model/use-\*.ts)
- [ ] UI 컴포넌트 구현 (ui/\*.tsx)
- [ ] 배럴 export (index.ts)
- [ ] 번역 추가 (en.json, ko.json)
- [ ] 페이지 연결
- [ ] 테스트 통과 확인
- [ ] 린트/타입 체크
```

## 바이브 코딩 팁

1. **타입 먼저**: 데이터 구조부터 정의
2. **순수 함수 먼저**: 테스트 가능한 로직 분리
3. **Hook으로 상태 관리**: 재사용 가능한 로직
4. **UI는 마지막**: 로직이 완성된 후 UI 연결

```bash
# 기능 개발 후 검증
npm run test --run -- [feature]
npx tsc --noEmit
npm run lint
```
