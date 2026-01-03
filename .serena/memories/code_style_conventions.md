# Code Style and Conventions

## General

- **Language**: TypeScript (strict mode)
- **Style**: ESLint + Prettier
- **Components**: 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- **Types**: 명시적 타입 선언 권장, `any` 타입 금지 (`unknown` 사용)

## Naming Conventions

- **Files**: kebab-case (예: `use-json-formatter.ts`)
- **Components**: PascalCase (예: `JsonFormatter.tsx`)
- **Hooks**: use 접두사 (예: `useJsonFormatter`)
- **Constants**: UPPER_SNAKE_CASE (예: `MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase (예: `ToolSlug`)

## Feature Module Structure (FSD)

```
src/features/[feature-name]/
├── model/use-*.ts      # 상태/로직 Hook
├── lib/*.ts            # 순수 함수 (테스트 대상)
├── ui/*.tsx            # UI 컴포넌트
└── index.ts            # 배럴 export (named export 필수)
```

## Next.js 16 필수 패턴 (Async Params)

```typescript
// ✅ 올바른 방식 - await 필수
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return <Tool slug={slug} />;
}

// ❌ 이전 방식 (동작 안함)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;  // 에러!
}
```

## i18n Usage

```typescript
// Client Component
"use client";
import { useTranslations } from "next-intl";
const t = useTranslations("tools");

// Server Component
import { getTranslations } from "next-intl/server";
const t = await getTranslations("tools");
```

## UI Components

- 공통 컴포넌트: `@/shared/ui` 사용
- 색상: 시맨틱 토큰 사용 (`text-primary`, `text-success`)
- 애니메이션: Framer Motion 사용

## 금지사항

- `console.log` 프로덕션 코드에 남기기 금지
- 하드코딩된 문자열/숫자 (상수로 정의)
- `// @ts-ignore` 사용 금지
- 테스트 없는 비즈니스 로직 커밋
