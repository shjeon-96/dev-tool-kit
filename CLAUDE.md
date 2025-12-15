# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Web Toolkit** - 개발자를 위한 웹 기반 올인원 도구 모음 (100% 클라이언트 사이드 처리)

| 항목             | 값                      |
| ---------------- | ----------------------- |
| **URL**          | https://web-toolkit.app |
| **Version**      | 0.4.0                   |
| **Tools**        | 31개                    |
| **Guides**       | 31개                    |
| **Cheatsheets**  | 14개                    |
| **Languages**    | en, ko, ja              |
| **Static Pages** | 249개                   |

---

## Quick Start

```bash
# Node.js 20+ 필수
nvm use 20

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev  # http://localhost:3000

# 프로덕션 빌드
npm run build
```

### Key Commands

| Command                 | Description           |
| ----------------------- | --------------------- |
| `npm run dev`           | 개발 서버 (Turbopack) |
| `npm run build`         | 프로덕션 빌드         |
| `npm run lint`          | ESLint 검사           |
| `npm run test`          | Vitest 단위 테스트    |
| `npm run test:e2e`      | Playwright E2E 테스트 |
| `npm run test:coverage` | 테스트 커버리지       |
| `npm run analyze`       | 번들 분석             |

---

## Architecture (Feature-Sliced Design)

```
의존성 흐름: app → widgets → features → entities → shared
```

### Core Structure

```
src/
├── app/[locale]/                 # Next.js App Router (i18n)
│   ├── tools/[slug]/             # 도구 페이지
│   ├── guides/[slug]/            # 가이드 페이지
│   ├── cheatsheets/[slug]/       # 치트시트 페이지
│   └── api/share/                # Magic Share API
│
├── features/                     # 31개 도구 구현
│   └── json-formatter/
│       ├── model/use-json-formatter.ts  # 상태/로직 Hook
│       ├── lib/formatter.ts             # 순수 함수 (테스트 대상)
│       └── ui/json-formatter.tsx        # UI 컴포넌트
│
├── entities/                     # 비즈니스 엔티티
│   ├── tool/model/
│   │   ├── types.ts              # ToolSlug 타입
│   │   ├── registry.ts           # 도구 레지스트리
│   │   └── seo-content.ts        # SEO 콘텐츠
│   ├── guide/data/               # 31개 가이드 데이터
│   └── cheatsheet/data/          # 14개 치트시트 데이터
│
└── shared/
    ├── ui/                       # 공통 UI 컴포넌트
    ├── lib/hooks/                # 공통 Hooks
    └── config/site.ts            # SITE_CONFIG
```

---

## Adding a New Tool

1. **types.ts** - ToolSlug 타입 추가

```typescript
// src/entities/tool/model/types.ts
export type ToolSlug = "existing-tool" | "new-tool";
```

2. **registry.ts** - 도구 등록

```typescript
// src/entities/tool/model/registry.ts
"new-tool": {
  title: "New Tool",
  description: "설명...",
  icon: IconComponent,
  category: "text" | "media" | "converters" | "security",
},
```

3. **Feature 구현** - `src/features/new-tool/`

```
new-tool/
├── model/use-new-tool.ts   # Hook (상태 관리)
├── lib/logic.ts            # 순수 함수 (테스트 가능)
├── ui/new-tool.tsx         # UI 컴포넌트
└── index.ts                # 배럴 export
```

4. **tool-renderer.tsx** - Dynamic import 추가

```typescript
// src/app/[locale]/tools/[slug]/tool-renderer.tsx
const NewTool = dynamic(() => import("@/features/new-tool"));
case "new-tool": return <NewTool />;
```

5. **messages/\*.json** - 번역 추가 (3개 언어)

6. **seo-content.ts** - SEO 콘텐츠 추가

---

## i18n Usage

```typescript
// Client Component
"use client";
import { useTranslations } from "next-intl";
const t = useTranslations("tools");
t("json-formatter.title");

// Server Component
import { getTranslations } from "next-intl/server";
const t = await getTranslations("tools");
```

### Supported Languages

- `en` (default), `ko`, `ja`
- Files: `messages/en.json`, `messages/ko.json`, `messages/ja.json`

---

## Custom Hooks

| Hook               | Location                                     | Purpose                    |
| ------------------ | -------------------------------------------- | -------------------------- |
| useToolHistory     | shared/lib/hooks/use-tool-history.ts         | 로컬스토리지 기반 히스토리 |
| useUrlState        | shared/lib/hooks/use-url-state.ts            | URL 쿼리 파라미터 상태     |
| useCopyToClipboard | shared/lib/hooks/use-copy-to-clipboard.ts    | 클립보드 복사 + 피드백     |
| useAdSense         | shared/lib/hooks/use-ad-sense.ts             | AdSense 로딩 상태 관리     |
| usePipelineInput   | features/tool-pipeline/model/use-pipeline.ts | 도구 간 데이터 전달        |

---

## Testing

```bash
# 단위 테스트
npm run test                  # 전체 실행
npm run test -- formatter     # 파일명 필터

# E2E 테스트
npm run test:e2e              # 전체 실행
npm run test:e2e:ui           # UI 모드
```

### Test File Locations

- 단위 테스트: `src/features/*/lib/*.test.ts`
- E2E 테스트: `e2e/*.spec.ts`

---

## Next.js 16 Caveats

### Async Params (중요!)

```typescript
// ✅ Next.js 16 방식 - await 필수
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return <Tool slug={slug} />;
}

// ❌ 이전 방식 (동작하지 않음)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;  // 에러!
}
```

---

## Key Files Reference

| File                                              | Purpose             |
| ------------------------------------------------- | ------------------- |
| `src/entities/tool/model/types.ts`                | ToolSlug 타입 정의  |
| `src/entities/tool/model/registry.ts`             | 도구 레지스트리     |
| `src/entities/tool/model/seo-content.ts`          | SEO 콘텐츠          |
| `src/app/[locale]/tools/[slug]/tool-renderer.tsx` | 도구 Dynamic Import |
| `src/shared/config/site.ts`                       | SITE_CONFIG         |
| `src/i18n/routing.ts`                             | 지원 언어 목록      |
| `messages/*.json`                                 | i18n 번역 파일      |

---

## Analytics & Monetization

- **Google Analytics**: G-BHCZK28NQQ
- **Google Tag Manager**: GTM-NKT5P48C
- **AdSense**: ca-pub-4981986991458105
- **ads.txt**: `public/ads.txt`

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://web-toolkit.app
NEXT_PUBLIC_CLARITY_ID=your_clarity_id  # Optional
KV_REST_API_URL=...                      # Magic Share (Vercel KV)
KV_REST_API_TOKEN=...
```

---

## Guide Section ID Rules

**중요**: Guide Section ID는 반드시 **kebab-case** 사용

```typescript
// ✅ 올바른 예
{ id: "what-is-json", title: "What is JSON?" }

// ❌ 잘못된 예
{ id: "whatIsJson", title: "..." }  // camelCase 금지
```
