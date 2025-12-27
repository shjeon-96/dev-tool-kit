# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Web Toolkit** - 개발자를 위한 웹 기반 올인원 도구 모음 (100% 클라이언트 사이드 처리)

| 항목           | 값                      |
| -------------- | ----------------------- |
| **URL**        | https://web-toolkit.app |
| **Tools**      | 45                      |
| **pSEO Pages** | 500+                    |
| **Languages**  | en, ko, ja, es, pt, de  |

---

## Quick Start

```bash
nvm use 20  # Node.js 20+ 필수
npm install
npm run dev  # http://localhost:3000
```

### Key Commands

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `npm run dev`            | 개발 서버 (Turbopack)              |
| `npm run build`          | 프로덕션 빌드                      |
| `npm run lint`           | ESLint 검사                        |
| `npm run test`           | Vitest 단위 테스트 (watch 모드)    |
| `npm run test [pattern]` | 특정 패턴 테스트 (예: `formatter`) |
| `npm run test --run`     | 단일 실행 (watch 없이)             |
| `npm run test:coverage`  | 커버리지 리포트 생성               |
| `npm run test:e2e`       | Playwright E2E 테스트              |
| `npm run analyze`        | 번들 분석 (`ANALYZE=true`)         |
| `npm run validate:tools` | 도구 레지스트리 유효성 검사        |

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
│   ├── convert/[slug]/           # pSEO: 포맷 변환
│   ├── resize-to/[target]/       # pSEO: 이미지 리사이즈
│   ├── encode/[type]/            # pSEO: 인코딩
│   ├── decode/[type]/            # pSEO: 디코딩
│   ├── hash/[type]/              # pSEO: 해시 생성
│   ├── minify/[type]/            # pSEO: 코드 압축
│   ├── validate/[type]/          # pSEO: 유효성 검사
│   ├── diff/[type]/              # pSEO: 차이 비교
│   ├── format/[type]/            # pSEO: 코드 포맷팅
│   ├── generate/[type]/          # pSEO: 코드 생성
│   ├── guides/[slug]/            # 가이드 페이지
│   └── cheatsheets/[slug]/       # 치트시트 페이지
│
├── features/                     # 도구 + 기능 모듈 (50+)
│   ├── json-formatter/           # 도구 예시
│   │   ├── model/use-*.ts        # 상태/로직 Hook
│   │   ├── lib/*.ts              # 순수 함수 (테스트 대상)
│   │   └── ui/*.tsx              # UI 컴포넌트
│   ├── auth/                     # 인증 (Supabase)
│   └── billing/                  # 결제 (LemonSqueezy)
│
├── entities/                     # 비즈니스 엔티티 + pSEO 레지스트리
│   ├── tool/model/               # 도구 타입, 레지스트리, SEO
│   ├── converter/model/          # 포맷 변환 레지스트리
│   ├── image-resize-target/      # 리사이즈 타겟 레지스트리
│   ├── encode-decode-type/       # 인코딩/디코딩 레지스트리
│   ├── hash-type/                # 해시 타입 레지스트리
│   ├── minify-type/              # 압축 타입 레지스트리
│   ├── validate-type/            # 검증 타입 레지스트리
│   ├── diff-type/                # 비교 타입 레지스트리
│   ├── format-type/              # 포맷 타입 레지스트리
│   ├── generate-type/            # 생성 타입 레지스트리
│   ├── competitor/               # 경쟁사 비교 레지스트리
│   ├── glossary/                 # 용어집 레지스트리
│   ├── use-case/                 # 사용 사례 레지스트리
│   ├── comparison/               # 도구 비교 레지스트리
│   └── ai-context/               # AI 컨텍스트 레지스트리
│
└── shared/
    ├── ui/                       # 공통 UI 컴포넌트 (Radix UI)
    ├── lib/hooks/                # 공통 Hooks
    ├── lib/quota/                # 사용량 제한 시스템
    └── config/site.ts            # SITE_CONFIG
```

---

## Adding a New Tool

### 1. ToolSlug 타입 추가

```typescript
// src/shared/types/tool.ts (ToolSlug 정의 위치)
export type ToolSlug = "existing-tool" | "new-tool";
```

### 2. registry.ts - 도구 메타데이터 등록

```typescript
// src/entities/tool/model/registry.ts
"new-tool": {
  title: "New Tool",
  description: "설명...",
  icon: IconComponent,
  category: "text" | "media" | "converters" | "security",
  isPremium: false,
  freeLimit: undefined,
},
```

### 3. Feature 구현 - `src/features/new-tool/`

```
new-tool/
├── model/use-new-tool.ts   # Hook (상태 관리)
├── lib/logic.ts            # 순수 함수 (테스트 대상)
├── ui/new-tool.tsx         # UI 컴포넌트
└── index.ts                # 배럴 export (named export 필수)
```

### 4. component-map.ts - Dynamic Import 등록

```typescript
// src/entities/tool/model/component-map.ts
"new-tool": {
  import: () => import("@/features/new-tool"),
  component: "NewTool",  // index.ts에서 export한 컴포넌트명
},
```

### 5. messages/\*.json - 번역 추가 (6개 언어)

- `tools.[slug].title`, `tools.[slug].description`
- `seo.[slug].title`, `seo.[slug].description`, `seo.[slug].keywords`

### 6. seo-content.ts - SEO 콘텐츠 추가

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
npm run validate:tools  # 레지스트리 일관성 검사
```

---

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

**지원 언어**: `en` (default), `ko`, `ja`, `es`, `pt`, `de` (`src/i18n/routing.ts`)

---

## Next.js 16 Caveats

### Async Params (필수!)

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

### Locale Fallback Pattern (pSEO 페이지)

일부 pSEO 페이지에서 es, pt, de 번역이 없는 경우 fallback 필요:

```typescript
// LocaleKey가 en | ko | ja 만 지원하는 경우
type LocaleKey = "en" | "ko" | "ja";

function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en"; // es, pt, de는 en으로 fallback
}

// 사용
const localeKey = getSafeLocaleKey(locale);
const content = data.content[localeKey];
```

---

## pSEO Pages

자동 생성되는 대량 SEO 페이지:

| Route                    | Registry                              |
| ------------------------ | ------------------------------------- |
| `/convert/[slug]`        | `entities/converter/model/registry`   |
| `/resize-to/[target]`    | `entities/image-resize-target/model/` |
| `/encode/[type]`         | `entities/encode-decode-type/model/`  |
| `/decode/[type]`         | `entities/encode-decode-type/model/`  |
| `/hash/[type]`           | `entities/hash-type/model/`           |
| `/minify/[type]`         | `entities/minify-type/model/`         |
| `/validate/[type]`       | `entities/validate-type/model/`       |
| `/diff/[type]`           | `entities/diff-type/model/`           |
| `/format/[type]`         | `entities/format-type/model/`         |
| `/generate/[type]`       | `entities/generate-type/model/`       |
| `/alternative-to/[comp]` | `entities/competitor/model/`          |
| `/glossary/[term]`       | `entities/glossary/model/`            |
| `/use-cases/[slug]`      | `entities/use-case/model/`            |
| `/compare/[slug]`        | `entities/comparison/model/`          |
| `/ai/[context]`          | `entities/ai-context/model/`          |

pSEO 페이지 추가 시:

1. `generateStaticParams()`에서 `routing.locales` 사용 (하드코딩 금지)
2. `alternates.languages`에 6개 언어 모두 포함

---

## Testing

```bash
npm run test                  # watch 모드
npm run test formatter        # 패턴 필터 (formatter 포함 파일)
npm run test --run            # 단일 실행 (CI용)
npm run test:e2e              # E2E 전체 (11 specs)
npm run test:e2e:ui           # E2E UI 모드 (디버깅용)
```

- 단위 테스트: `src/features/*/lib/*.test.ts`
- E2E 테스트: `e2e/*.spec.ts`
- 커버리지: `src/features/**/lib/**`, `src/shared/lib/**`

---

## Key Files Reference

| File                                       | Purpose                         |
| ------------------------------------------ | ------------------------------- |
| `src/shared/types/tool.ts`                 | ToolSlug, ToolCategory 타입     |
| `src/entities/tool/model/types.ts`         | Tool 인터페이스 (re-export)     |
| `src/entities/tool/model/registry.ts`      | 도구 메타데이터 레지스트리      |
| `src/entities/tool/model/component-map.ts` | 도구 컴포넌트 Dynamic Import 맵 |
| `src/entities/tool/model/seo-content.ts`   | 도구별 SEO 콘텐츠               |
| `src/i18n/routing.ts`                      | 지원 언어 목록 (6개)            |
| `src/shared/lib/quota/`                    | 사용량 제한 시스템              |
| `src/app/sitemap.ts`                       | 동적 사이트맵                   |

---

## Premium & Quota System

```typescript
// Tool 정의
interface Tool {
  isPremium?: boolean; // true면 Pro 전용
  freeLimit?: number; // 무료 사용자 일일 제한
}

// 사용량 체크
const { stats } = useQuota(slug);
// stats.dailyUsage, stats.dailyLimit, stats.isExceeded
```

---

## Environment Variables

```bash
NEXT_PUBLIC_APP_URL=https://web-toolkit.app

# Supabase (인증)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# LemonSqueezy (결제)
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_WEBHOOK_SECRET=...

# Vercel KV (Magic Share)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

---

## Guide Section ID Rules

Guide Section ID는 반드시 **kebab-case** 사용:

```typescript
// ✅ 올바른 예
{ id: "what-is-json", title: "What is JSON?" }

// ❌ 잘못된 예
{ id: "whatIsJson", title: "..." }  // camelCase 금지
```

---

## UI Components & Design System

상세 가이드: `docs/UI_COMPONENTS.md`

### 핵심 규칙

| 항목          | 권장                                  | 피하기                            |
| ------------- | ------------------------------------- | --------------------------------- |
| **색상**      | `text-primary`, `text-success`        | `text-blue-500`, `text-green-500` |
| **Textarea**  | `h-[250px] sm:h-[350px] lg:h-[400px]` | `h-[400px]` (고정)                |
| **Scale**     | `md:scale-105`                        | `scale-105` (모바일 깨짐)         |
| **Animation** | Framer Motion                         | CSS animation                     |

### 주요 컴포넌트

```tsx
// 공통 UI
import { Button, Input, Textarea, Card } from "@/shared/ui";

// Animated Widgets
import { HeroSection } from "@/widgets/hero-section";
import { FAQSection } from "@/widgets/faq-section";
```

### Framer Motion 주의사항

```tsx
// ❌ 타입 에러
transition={{ ease: "easeOut" }}

// ✅ 올바른 사용
transition={{ duration: 0.5 }}
// 또는 베지어 커브 사용
transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
```
