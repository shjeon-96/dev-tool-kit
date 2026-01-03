# Adding a New Tool

## Step-by-Step Guide

### 1. ToolSlug 타입 추가

```typescript
// src/shared/types/tool.ts
export type ToolSlug = "existing-tool" | "new-tool";
```

### 2. 도구 메타데이터 등록

```typescript
// src/entities/tool/model/registry.ts
"new-tool": {
  title: "New Tool",
  description: "설명...",
  icon: IconComponent,
  category: "text" | "media" | "converters" | "security",
  isPremium: false,        // Pro 전용 여부
  freeLimit: undefined,    // 무료 일일 제한 (숫자 또는 undefined)
},
```

### 3. Feature 구현

```
src/features/new-tool/
├── model/use-new-tool.ts   # Hook (상태 관리)
├── lib/logic.ts            # 순수 함수 (테스트 대상)
├── lib/logic.test.ts       # 단위 테스트
├── ui/new-tool.tsx         # UI 컴포넌트
└── index.ts                # 배럴 export
```

#### index.ts 예시

```typescript
// Named export 필수!
export { NewTool } from "./ui/new-tool";
```

### 4. Component Map 등록

```typescript
// src/entities/tool/model/component-map.ts
"new-tool": {
  import: () => import("@/features/new-tool"),
  component: "NewTool",  // index.ts에서 export한 컴포넌트명
},
```

### 5. 번역 추가 (6개 언어)

`messages/en.json`, `messages/ko.json`, `messages/ja.json`,
`messages/es.json`, `messages/pt.json`, `messages/de.json`:

```json
{
  "tools": {
    "new-tool": {
      "title": "New Tool",
      "description": "Tool description"
    }
  },
  "seo": {
    "new-tool": {
      "title": "New Tool - Web Toolkit",
      "description": "SEO description...",
      "keywords": "keyword1, keyword2"
    }
  }
}
```

### 6. SEO 콘텐츠 추가

```typescript
// src/entities/tool/model/seo-content.ts
"new-tool": {
  keywords: ["keyword1", "keyword2"],
  features: ["feature1", "feature2"],
  useCases: ["use case 1", "use case 2"],
},
```

### 7. 유효성 검사

```bash
npm run validate:tools
```

## 중요 사항

- **배럴 export**: `index.ts`에서 반드시 named export 사용
- **테스트**: `lib/` 내 순수 함수는 반드시 테스트 작성
- **번역**: 6개 언어 모두 추가 필수
- **Component Map**: `component` 이름이 export 이름과 일치해야 함
