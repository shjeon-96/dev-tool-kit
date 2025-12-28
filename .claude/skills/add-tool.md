# Add New Tool Skill

새로운 도구를 Web Toolkit에 추가하는 전체 워크플로우입니다.

## Trigger

- "새 도구 추가해줘", "add new tool", "도구 만들어줘"
- 도구 이름과 함께 요청 시 (예: "markdown editor 도구 추가해줘")

## Pre-requisites Check

1. 도구 이름 확인 (kebab-case slug로 변환)
2. 카테고리 결정: `text` | `media` | `security` | `converters`
3. 유사한 기존 도구 확인

## Step-by-Step Workflow

### Step 1: ToolSlug 타입 추가

**File:** `src/shared/types/tool.ts`

```typescript
export type ToolSlug = "existing-tool" | "new-tool"; // 추가
```

### Step 2: registry.ts - 도구 메타데이터 등록

**File:** `src/entities/tool/model/registry.ts`

```typescript
"new-tool": {
  title: "New Tool",
  description: "도구 설명...",
  icon: IconComponent,  // lucide-react에서 import
  category: "text",
  relatedTools: ["related-tool-1", "related-tool-2"],
  isPremium: false,      // optional
  freeLimit: undefined,  // optional
},
```

### Step 3: Feature 모듈 생성

**Directory:** `src/features/new-tool/`

```
new-tool/
├── model/
│   └── use-new-tool.ts   # 상태 관리 Hook
├── lib/
│   ├── logic.ts          # 순수 함수 (비즈니스 로직)
│   └── logic.test.ts     # 테스트
├── ui/
│   └── new-tool.tsx      # UI 컴포넌트
└── index.ts              # 배럴 export
```

#### index.ts 템플릿:

```typescript
export { NewTool } from "./ui/new-tool";
```

#### use-new-tool.ts 템플릿:

```typescript
"use client";

import { useState, useCallback } from "react";

export function useNewTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const process = useCallback(() => {
    try {
      setError(null);
      // 로직 호출
      setOutput(/* result */);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  }, [input]);

  return {
    input,
    setInput,
    output,
    error,
    process,
  };
}
```

#### new-tool.tsx 템플릿:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useNewTool } from "../model/use-new-tool";

export function NewTool() {
  const t = useTranslations("tools.new-tool");
  const { input, setInput, output, error, process } = useNewTool();

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("inputPlaceholder")}
        className="h-[250px] sm:h-[350px] lg:h-[400px]"
      />
      <Button onClick={process}>{t("action")}</Button>
      {error && <p className="text-destructive">{error}</p>}
      <Textarea
        value={output}
        readOnly
        className="h-[250px] sm:h-[350px] lg:h-[400px]"
      />
    </div>
  );
}
```

### Step 4: component-map.ts 등록

**File:** `src/entities/tool/model/component-map.ts`

```typescript
"new-tool": {
  import: () => import("@/features/new-tool"),
  component: "NewTool",
},
```

### Step 5: 번역 추가 (6개 언어)

**Files:** `messages/en.json`, `ko.json`, `ja.json`, `es.json`, `pt.json`, `de.json`

```json
{
  "tools": {
    "new-tool": {
      "title": "New Tool",
      "description": "Tool description",
      "inputPlaceholder": "Enter input...",
      "action": "Process"
    }
  },
  "seo": {
    "new-tool": {
      "title": "New Tool - Web Toolkit",
      "description": "SEO description for the tool page",
      "keywords": "keyword1, keyword2, keyword3"
    }
  }
}
```

### Step 6: SEO 콘텐츠 추가

**File:** `src/entities/tool/model/seo-content.ts`

```typescript
"new-tool": {
  keywords: ["keyword1", "keyword2"],
  features: ["feature1", "feature2"],
  useCases: ["use case 1", "use case 2"],
},
```

### Step 7: 테스트 작성

**File:** `src/features/new-tool/lib/logic.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { processLogic } from "./logic";

describe("processLogic", () => {
  it("should process input correctly", () => {
    expect(processLogic("input")).toBe("expected output");
  });
});
```

## Validation Checklist

```bash
# 레지스트리 유효성 검사
npm run validate:tools

# 타입 체크
npx tsc --noEmit

# 테스트 실행
npm run test new-tool

# 빌드 확인
npm run build
```

## Common Pitfalls

1. **index.ts 누락**: 배럴 export가 없으면 dynamic import 실패
2. **ToolSlug 누락**: 타입 에러 발생
3. **번역 누락**: 런타임에 키 표시됨
4. **relatedTools 오타**: 빌드 시 타입 에러

## Learning Opportunity

Feature 모듈의 핵심 로직(`lib/logic.ts`)을 사용자가 직접 구현하도록 요청하세요:

- 다양한 알고리즘 접근법이 가능한 경우
- 에러 처리 전략을 결정해야 하는 경우
- 성능 vs 정확성 트레이드오프가 있는 경우
