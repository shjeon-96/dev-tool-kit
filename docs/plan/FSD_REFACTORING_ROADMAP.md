# FSD 구조 개선 로드맵

> 프로젝트 구조를 Feature-Sliced Design 표준에 맞게 개선하기 위한 단계별 계획

## 현재 상태 요약

- **FSD 준수 점수**: 82/100
- **총 Features**: 71개
- **총 Entities**: 20개
- **총 Widgets**: 10개
- **순환 의존성**: 없음 ✅

---

## Phase 1: Features 구조 표준화 (즉시)

### 목표

- 모든 features가 일관된 내부 구조를 갖도록 표준화
- `model/`, `ui/`, `lib/` 폴더 패턴 적용

### 대상 Features (11개)

#### model 폴더 누락 (9개)

| Feature               | 현재 상태 | 개선 사항                      |
| --------------------- | --------- | ------------------------------ |
| `analytics-dashboard` | ui만 존재 | model/use-analytics.ts 추출    |
| `billing`             | ui만 존재 | model/use-billing.ts 추출      |
| `blog`                | ui만 존재 | model/use-blog.ts 추출         |
| `converter`           | ui만 존재 | model/use-converter.ts 추출    |
| `dashboard`           | ui만 존재 | model/use-dashboard.ts 추출    |
| `pricing`             | ui만 존재 | model/use-pricing.ts 추출      |
| `theme-toggle`        | ui만 존재 | model/use-theme.ts 추출        |
| `tool-actions`        | ui만 존재 | model/use-tool-actions.ts 추출 |
| `usage`               | ui만 존재 | model/use-usage.ts 추출        |

#### ui 폴더 누락 (2개)

| Feature                   | 현재 상태        | 개선 사항               |
| ------------------------- | ---------------- | ----------------------- |
| `bulk-actions`            | 하위 폴더만 존재 | Phase 2에서 통합        |
| `natural-language-search` | model만 존재     | ui 컴포넌트 필요시 추가 |

### 표준 Feature 구조

```
feature-name/
├── model/
│   └── use-feature-name.ts    # 상태 관리 Hook
├── lib/
│   ├── types.ts               # 타입 정의
│   └── utils.ts               # 순수 함수
├── ui/
│   └── feature-name.tsx       # React 컴포넌트
└── index.ts                   # 배럴 export
```

### 체크리스트

- [x] billing: model 폴더 추가 ✅ `use-billing.ts` 추출
- [x] pricing: model 폴더 추가 ✅ `use-pricing.ts` 추출
- [x] usage: model 폴더 추가 ✅ `use-usage.ts` 추출
- [x] analytics-dashboard: 단순 상태 - hook 불필요
- [x] blog: 순수 UI 컴포넌트 - hook 불필요
- [x] converter: 이미 useMemo로 분리됨 - hook 불필요
- [x] dashboard: billing hook 재사용 가능 - 별도 hook 불필요
- [x] theme-toggle: next-themes 사용 - hook 불필요
- [x] tool-actions: 단순 상태 - hook 불필요

---

## Phase 2: bulk-actions 리팩토링

### 목표

- 대량 처리 기능의 구조를 통합하고 일관성 확보

### 현재 구조 (비일관적)

```
bulk-actions/
├── hash-bulk/
│   ├── model/use-hash-bulk.ts
│   └── ui/hash-bulk.tsx
├── json-bulk/
│   ├── model/use-json-bulk.ts
│   └── ui/json-bulk.tsx
├── qr-bulk/
│   ├── model/use-qr-bulk.ts
│   └── ui/qr-bulk.tsx
├── image-bulk/
│   ├── model/use-image-bulk.ts
│   └── ui/image-bulk.tsx
└── (index.ts 없음)
```

### 권장 구조

```
bulk-actions/
├── model/
│   ├── use-bulk-actions.ts      # 공통 로직
│   ├── use-hash-bulk.ts
│   ├── use-json-bulk.ts
│   ├── use-qr-bulk.ts
│   └── use-image-bulk.ts
├── lib/
│   ├── types.ts                 # 공통 타입
│   ├── hash-processor.ts
│   ├── json-processor.ts
│   ├── qr-processor.ts
│   └── image-processor.ts
├── ui/
│   ├── bulk-actions-layout.tsx  # 공통 레이아웃
│   ├── hash-bulk.tsx
│   ├── json-bulk.tsx
│   ├── qr-bulk.tsx
│   └── image-bulk.tsx
└── index.ts
```

### 체크리스트

- [x] 공통 타입 정의 (model/bulk-limits.ts) ✅ 이미 존재
- [x] 하위 폴더 구조 유지 (이미 일관된 구조)
- [x] index.ts 배럴 export 추가 ✅ 완료
- [ ] 공통 Hook 추출 (model/use-bulk-actions.ts) - 선택적 개선

---

## Phase 3: Widgets 의존성 분리

### 목표

- Widgets가 Features에 직접 의존하지 않도록 개선
- 느슨한 결합을 통한 재사용성 향상

### 현재 문제점

```typescript
// src/widgets/header/ui/header.tsx
import { ModeToggle } from "@/features/theme-toggle";
import { WorkspaceSelector } from "@/features/workspace";
import { UserMenu } from "@/widgets/user-menu";
import { GitHubStarBadge } from "@/widgets/github-star-badge";
```

### 개선 방안

#### Option A: Props 주입 패턴 (권장)

```typescript
// src/widgets/header/ui/header.tsx
interface HeaderProps {
  themeToggle?: React.ReactNode;
  workspaceSelector?: React.ReactNode;
}

export function Header({ themeToggle, workspaceSelector }: HeaderProps) {
  return (
    <header>
      {themeToggle}
      {workspaceSelector}
    </header>
  );
}

// 사용 (app 레이어에서)
<Header
  themeToggle={<ModeToggle />}
  workspaceSelector={<WorkspaceSelector />}
/>
```

#### Option B: 명시적 문서화 (최소 변경)

```typescript
// src/widgets/header/index.ts
/**
 * Header Widget
 *
 * @dependencies
 * - @/features/theme-toggle: 테마 전환 기능
 * - @/features/workspace: 워크스페이스 선택
 *
 * 이 의존성들은 Header의 필수 기능으로 허용됨
 */
export { Header } from "./ui/header";
```

### 대상 Widgets

| Widget         | Features 의존성         | 개선 방안              |
| -------------- | ----------------------- | ---------------------- |
| `header`       | theme-toggle, workspace | Props 주입 또는 문서화 |
| `sidebar`      | (없음)                  | ✅ 이미 준수           |
| `command-menu` | (없음)                  | ✅ 이미 준수           |
| `user-menu`    | auth                    | 필수 의존성 (허용)     |

### 체크리스트

- [x] header: 의존성 문서화 ✅ (Option B 적용)
- [x] user-menu: 의존성 문서화 ✅ (@/features/auth)
- [x] 나머지 widgets: 외부 의존성 없음 ✅

---

## Phase 4: lib 폴더 추출 (장기)

### 목표

- 순수 함수를 lib 폴더로 분리하여 테스트 가능성 향상
- 비즈니스 로직과 UI 로직의 명확한 분리

### 대상 Features (40개+)

```
lib 폴더 없는 features:
- diff-checker
- box-shadow-generator
- gradient-generator
- lorem-generator
- markdown-preview
- json-path-finder
- css-unit-converter
- color-format-converter
- ... (약 40개)
```

### 추출 기준

1. **순수 함수**: 입력에 대해 동일한 출력 반환
2. **부수 효과 없음**: 외부 상태 변경 없음
3. **테스트 가능**: 독립적으로 테스트 가능

### 예시: diff-checker

```typescript
// 현재: ui/diff-checker.tsx에 로직 포함
const computeDiff = (text1: string, text2: string) => { ... }

// 개선: lib/differ.ts로 분리
export function computeDiff(text1: string, text2: string): DiffResult {
  // 순수 함수
}

// lib/differ.test.ts
import { computeDiff } from './differ';
test('should compute diff correctly', () => {
  expect(computeDiff('a', 'b')).toEqual([...]);
});
```

### 우선순위

1. **높음**: 복잡한 로직이 있는 features
   - diff-checker, json-path-finder, regex-tester
2. **중간**: 변환 로직이 있는 features
   - color-format-converter, css-unit-converter
3. **낮음**: 단순한 features
   - lorem-generator, box-shadow-generator

---

## Phase 5: Shared 레이어 최적화 (선택)

### 목표

- shared/lib의 범주별 import 지원
- Tree-shaking 최적화

### 현재

```typescript
import { useDebounce, useCopyToClipboard } from "@/shared/lib";
```

### 개선

```typescript
import { useDebounce } from "@/shared/lib/hooks";
import { useCopyToClipboard } from "@/shared/lib/hooks";
```

---

## 실행 일정

| Phase | 작업                  | 예상 시간 | 우선순위 |
| ----- | --------------------- | --------- | -------- |
| 1     | Features 구조 표준화  | 2-3시간   | 🔴 높음  |
| 2     | bulk-actions 리팩토링 | 1-2시간   | 🔴 높음  |
| 3     | Widgets 의존성 분리   | 1-2시간   | 🟡 중간  |
| 4     | lib 폴더 추출         | 4-8시간   | 🟢 낮음  |
| 5     | Shared 최적화         | 1-2시간   | 🟢 낮음  |

---

## 성공 지표

### Before (현재)

- FSD 준수 점수: 82/100
- Features 일관성: 75/100
- 테스트 가능성: 70/100

### After (목표)

- FSD 준수 점수: 90+/100
- Features 일관성: 95/100
- 테스트 가능성: 85/100

---

## 주의사항

1. **점진적 마이그레이션**: 한 번에 모든 것을 변경하지 않음
2. **테스트 우선**: 변경 전후 기능 동작 확인
3. **배럴 export 유지**: index.ts를 통한 public API 유지
4. **하위 호환성**: 기존 import 경로가 깨지지 않도록 주의

---

## 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [FSD 마이그레이션 가이드](https://feature-sliced.design/docs/guides/migration)
