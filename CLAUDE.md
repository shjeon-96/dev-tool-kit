# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Web Toolkit** - 개발자를 위한 웹 기반 올인원 도구 모음 (100% 클라이언트 사이드 처리)

| 항목            | 값                      |
| --------------- | ----------------------- |
| **URL**         | https://web-toolkit.app |
| **Version**     | 1.2.0                   |
| **Tools**       | 40+개                   |
| **pSEO Pages**  | 500+개                  |
| **Guides**      | 31개                    |
| **Cheatsheets** | 14개                    |
| **Languages**   | en, ko, ja, es, pt, de  |

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

| Command                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `npm run dev`            | 개발 서버 (Turbopack)                              |
| `npm run build`          | 프로덕션 빌드                                      |
| `npm run lint`           | ESLint 검사                                        |
| `npm run test`           | Vitest 단위 테스트 (watch 모드)                    |
| `npm run test -- [name]` | 특정 파일 테스트 (예: `npm run test -- formatter`) |
| `npm run test:coverage`  | 테스트 커버리지                                    |
| `npm run test:e2e`       | Playwright E2E 테스트                              |
| `npm run test:e2e:ui`    | Playwright UI 모드                                 |
| `npm run analyze`        | 번들 분석 (`ANALYZE=true`)                         |

---

## Architecture (Feature-Sliced Design)

```
의존성 흐름: app → widgets → features → entities → shared
```

### Core Structure

```
src/
├── app/[locale]/                 # Next.js App Router (i18n)
│   ├── tools/[slug]/             # 도구 페이지 (40+)
│   ├── tools/bulk-actions/       # 대량 작업 페이지
│   ├── convert/[slug]/           # pSEO: 포맷 변환 (54개)
│   ├── resize-to/[slug]/         # pSEO: 이미지 리사이즈 (200+)
│   ├── minify/[slug]/            # pSEO: 코드 압축
│   ├── validate/[slug]/          # pSEO: 유효성 검사
│   ├── diff/[slug]/              # pSEO: 차이 비교
│   ├── hash/[slug]/              # pSEO: 해시 생성
│   ├── guides/[slug]/            # 가이드 페이지 (31개)
│   ├── cheatsheets/[slug]/       # 치트시트 페이지 (14개)
│   ├── dashboard/                # 사용자 대시보드
│   ├── docs/api/                 # API 문서 (Swagger UI)
│   └── api/                      # API routes
│
├── features/                     # 도구 + 기능 모듈 (60+)
│   ├── json-formatter/           # 도구 예시
│   │   ├── model/use-json-formatter.ts  # 상태/로직 Hook
│   │   ├── lib/formatter.ts             # 순수 함수 (테스트 대상)
│   │   └── ui/json-formatter.tsx        # UI 컴포넌트
│   ├── bulk-actions/             # 대량 처리 기능
│   │   ├── hash-bulk/            # 대량 해시
│   │   ├── json-bulk/            # 대량 JSON
│   │   └── qr-bulk/              # 대량 QR
│   ├── auth/                     # 인증 (Supabase)
│   ├── billing/                  # 결제 (LemonSqueezy)
│   └── pricing/                  # 요금제 관리
│
├── entities/                     # 비즈니스 엔티티
│   ├── tool/model/
│   │   ├── types.ts              # ToolSlug 타입
│   │   ├── registry.ts           # 도구 레지스트리
│   │   └── seo-content.ts        # SEO 콘텐츠
│   ├── converter/model/          # pSEO: 변환기 레지스트리
│   ├── image-resize-target/model/ # pSEO: 리사이즈 타겟
│   ├── subscription/             # 구독 상태 관리
│   ├── guide/data/               # 가이드 데이터
│   └── cheatsheet/data/          # 치트시트 데이터
│
├── shared/
│   ├── ui/                       # 공통 UI 컴포넌트 (Radix UI)
│   ├── lib/hooks/                # 공통 Hooks
│   ├── lib/quota/                # 사용량 제한 시스템
│   ├── lib/api/                  # API 유틸리티 (rate-limiter, auth)
│   ├── lib/fs-access/            # File System Access API
│   └── config/site.ts            # SITE_CONFIG
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
  isPremium: false,        // Pro 전용 여부
  freeLimit: undefined,    // 무료 사용자 일일 제한 (미설정시 무제한)
},
```

3. **Feature 구현** - `src/features/new-tool/`

```
new-tool/
├── model/use-new-tool.ts   # Hook (상태 관리)
├── lib/logic.ts            # 순수 함수 (테스트 가능)
├── ui/new-tool.tsx         # UI 컴포넌트
└── index.ts                # 배럴 export (named export 필수)
```

4. **tool-renderer.tsx** - Dynamic import 추가

```typescript
// src/app/[locale]/tools/[slug]/tool-renderer.tsx
"new-tool": dynamic(
  () => import("@/features/new-tool").then((mod) => mod.NewTool),
  { ssr: false },
),
```

5. **messages/\*.json** - 번역 추가 (6개 언어: en, ko, ja, es, pt, de)
   - `tools.[slug].title`, `tools.[slug].description`
   - `seo.[slug].title`, `seo.[slug].description`, `seo.[slug].keywords`

6. **seo-content.ts** - SEO 콘텐츠 추가

```typescript
// src/entities/tool/model/seo-content.ts
"new-tool": {
  keywords: ["keyword1", "keyword2"],
  features: ["feature1", "feature2"],
  useCases: ["use case 1", "use case 2"],
},
```

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

- `en` (default), `ko`, `ja`, `es`, `pt`, `de`
- Files: `messages/{locale}.json`

---

## Custom Hooks

| Hook               | Location                                     | Purpose                    |
| ------------------ | -------------------------------------------- | -------------------------- |
| useToolHistory     | shared/lib/hooks/use-tool-history.ts         | 로컬스토리지 기반 히스토리 |
| useUrlState        | shared/lib/hooks/use-url-state.ts            | URL 쿼리 파라미터 상태     |
| useCopyToClipboard | shared/lib/hooks/use-copy-to-clipboard.ts    | 클립보드 복사 + 피드백     |
| useQuota           | shared/lib/quota/use-quota.ts                | 사용량 제한 체크           |
| usePipelineInput   | features/tool-pipeline/model/use-pipeline.ts | 도구 간 데이터 전달        |

---

## Testing

```bash
# 단위 테스트
npm run test                  # watch 모드
npm run test -- formatter     # 파일명 필터
npm run test -- --run         # 단일 실행 (watch 없이)

# E2E 테스트
npm run test:e2e              # 전체 실행
npm run test:e2e:ui           # UI 모드
```

### Test File Locations

- 단위 테스트: `src/features/*/lib/*.test.ts`
- E2E 테스트: `e2e/*.spec.ts`
- 커버리지 대상: `src/features/**/lib/**`, `src/shared/lib/**`

---

## Programmatic SEO (pSEO) Pages

자동 생성되는 대량 SEO 페이지:

| Route Pattern       | Example                 | Registry Location                                    |
| ------------------- | ----------------------- | ---------------------------------------------------- |
| `/convert/[slug]`   | `/convert/json-to-yaml` | `src/entities/converter/model/registry.ts`           |
| `/resize-to/[slug]` | `/resize-to/1920x1080`  | `src/entities/image-resize-target/model/registry.ts` |
| `/minify/[slug]`    | `/minify/json`          | `src/entities/minify-type/model/registry.ts`         |
| `/validate/[slug]`  | `/validate/json`        | `src/entities/validate-type/model/registry.ts`       |
| `/diff/[slug]`      | `/diff/json`            | `src/entities/diff-type/model/registry.ts`           |
| `/hash/[slug]`      | `/hash/md5`             | `src/entities/hash-type/model/registry.ts`           |

각 pSEO 페이지는 기존 도구를 재활용하며, SEO 최적화된 콘텐츠를 제공합니다.

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

| File                                              | Purpose                |
| ------------------------------------------------- | ---------------------- |
| `src/entities/tool/model/types.ts`                | ToolSlug 타입 정의     |
| `src/entities/tool/model/registry.ts`             | 도구 레지스트리        |
| `src/entities/tool/model/seo-content.ts`          | SEO 콘텐츠             |
| `src/app/[locale]/tools/[slug]/tool-renderer.tsx` | 도구 Dynamic Import    |
| `src/entities/subscription/`                      | 구독/Premium 게이트    |
| `src/shared/lib/quota/`                           | 사용량 제한 시스템     |
| `src/shared/config/site.ts`                       | SITE_CONFIG            |
| `src/i18n/routing.ts`                             | 지원 언어 목록         |
| `messages/*.json`                                 | i18n 번역 파일         |
| `src/app/sitemap.ts`                              | 동적 사이트맵 생성     |
| `src/entities/*/model/registry.ts`                | pSEO 페이지 레지스트리 |

---

## Premium & Quota System

도구별 사용량 제한 시스템:

```typescript
// entities/tool/model/types.ts
interface Tool {
  isPremium?: boolean; // true면 Pro 전용
  freeLimit?: number; // 무료 사용자 일일 제한
}

// 사용량 체크
const { stats, isLoading } = useQuota(slug);
// stats.dailyUsage, stats.dailyLimit, stats.isExceeded
```

- `PremiumToolGate`: Pro 전용 도구 접근 제어
- `QuotaWarning`: 사용량 80% 이상시 경고 표시

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://web-toolkit.app

# Supabase (인증)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# LemonSqueezy (결제)
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_STORE_ID=...
LEMONSQUEEZY_WEBHOOK_SECRET=...

# Vercel KV (Magic Share)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# Optional
NEXT_PUBLIC_CLARITY_ID=...
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

---

## API v1 (Public REST API)

공개 API 엔드포인트 (`/api/v1/`):

| Endpoint                 | Method | Description             |
| ------------------------ | ------ | ----------------------- |
| `/api/v1/hash/generate`  | POST   | 해시 생성 (MD5, SHA 등) |
| `/api/v1/json/format`    | POST   | JSON 포맷팅/압축        |
| `/api/v1/qr/generate`    | POST   | QR 코드 생성            |
| `/api/v1/uuid/generate`  | GET    | UUID 생성               |
| `/api/v1/base64/convert` | POST   | Base64 인코딩/디코딩    |

- Rate Limit: 익명 100회/일, Pro 10,000회/일
- 인증: `X-API-Key` 헤더 (대시보드에서 발급)
- API 문서: `/docs/api` (Swagger UI)
