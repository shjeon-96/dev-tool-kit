# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Web Toolkit** - AI 기반 자동화 트렌드 블로그

| 항목           | 값                      |
| -------------- | ----------------------- |
| **URL**        | https://web-toolkit.app |
| **Type**       | Trend Blog              |
| **Languages**  | en, ko                  |
| **Automation** | AI 콘텐츠 자동 생성     |

---

## Quick Start

```bash
nvm use 20  # Node.js 20+ 필수
npm install
npm run dev  # http://localhost:3000
```

### Key Commands

| Command              | Description             |
| -------------------- | ----------------------- |
| `npm run dev`        | 개발 서버 (Turbopack)   |
| `npm run build`      | 프로덕션 빌드           |
| `npm run lint`       | ESLint 검사             |
| `npm run test`       | Vitest 단위 테스트      |
| `npm run test:e2e`   | Playwright E2E 테스트   |

---

## Architecture (Feature-Sliced Design)

```
의존성 흐름: app → widgets → features → entities → shared
```

### Core Structure

```
src/
├── app/[locale]/                 # Next.js App Router (i18n)
│   ├── page.tsx                  # 홈페이지 (트렌딩 기사)
│   ├── [category]/               # 카테고리 페이지
│   │   └── [slug]/               # 기사 상세 페이지
│   ├── blog/                     # 블로그 목록
│   ├── auth/                     # 인증 (signin, signup)
│   ├── dashboard/                # 대시보드
│   └── pricing/                  # 가격 페이지
│
├── app/api/                      # API Routes
│   ├── cron/                     # 자동화 Cron Jobs
│   │   ├── trends/               # 트렌드 수집
│   │   ├── generate-articles/    # AI 기사 생성
│   │   └── publish-articles/     # 기사 발행
│   ├── checkout/                 # 결제
│   └── webhooks/                 # 웹훅
│
├── features/                     # 기능 모듈
│   ├── auth/                     # 인증 (Supabase)
│   ├── billing/                  # 결제 (LemonSqueezy)
│   └── blog/                     # 블로그 UI
│
├── entities/                     # 비즈니스 엔티티
│   ├── trend/                    # 트렌드/기사 엔티티
│   │   └── model/
│   │       ├── types.ts          # Article, ArticleCategory
│   │       └── queries.ts        # Supabase 쿼리
│   ├── post/                     # 블로그 포스트
│   └── subscription/             # 구독
│
├── lib/                          # 자동화 라이브러리
│   ├── trend-detector/           # 트렌드 감지
│   │   └── sources/              # Google Trends, RSS
│   └── content-generator/        # AI 콘텐츠 생성
│       └── prompts/              # Claude 프롬프트
│
├── widgets/                      # UI 위젯
│   ├── header/                   # 헤더
│   ├── footer/                   # 푸터
│   ├── sidebar/                  # 사이드바
│   └── ad-unit/                  # AdSense 광고
│
└── shared/
    ├── ui/                       # 공통 UI 컴포넌트 (Radix UI)
    ├── lib/                      # 공통 라이브러리
    │   ├── supabase/             # Supabase 클라이언트
    │   ├── lemonsqueezy/         # 결제
    │   └── hooks/                # 공통 Hooks
    └── config/                   # 설정
        ├── site.ts               # SITE_CONFIG
        └── ad-slots.ts           # AdSense 슬롯
```

---

## i18n Usage

```typescript
// Client Component
"use client";
import { useTranslations } from "next-intl";
const t = useTranslations("blog");

// Server Component
import { getTranslations } from "next-intl/server";
const t = await getTranslations("blog");
```

**지원 언어**: `en` (default), `ko` (`src/i18n/routing.ts`)

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
  return <Article slug={slug} />;
}
```

---

## Database (Supabase)

### 주요 테이블

| Table              | Description        |
| ------------------ | ------------------ |
| `articles`         | 기사 저장          |
| `article_analytics`| 조회수 통계        |
| `trends`           | 트렌드 데이터      |
| `profiles`         | 사용자 프로필      |
| `subscriptions`    | 구독 정보          |

### Article 쿼리

```typescript
import {
  getPublishedArticles,
  getTrendingArticles,
  getArticleBySlug,
  getArticlesByCategory
} from "@/entities/trend/model/queries";

// 트렌딩 기사 조회
const articles = await getTrendingArticles(5);

// 카테고리별 기사
const { articles, total } = await getArticlesByCategory("tech", { limit: 10 });
```

---

## Content Automation

### Cron Jobs (vercel.json)

| Endpoint                      | Schedule    | Description      |
| ----------------------------- | ----------- | ---------------- |
| `/api/cron/trends`            | 매 2시간    | 트렌드 수집      |
| `/api/cron/generate-articles` | 매 4시간    | AI 기사 생성     |
| `/api/cron/publish-articles`  | 매 1시간    | 기사 발행        |

### AI 콘텐츠 생성

```typescript
// src/lib/content-generator/
import { generateArticle } from "@/lib/content-generator";

const article = await generateArticle({
  keyword: "트렌드 키워드",
  category: "tech",
  locale: "ko"
});
```

---

## Key Files Reference

| File                                  | Purpose                     |
| ------------------------------------- | --------------------------- |
| `src/entities/trend/model/types.ts`   | Article, ArticleCategory    |
| `src/entities/trend/model/queries.ts` | Supabase 쿼리 함수          |
| `src/lib/trend-detector/`             | 트렌드 감지 시스템          |
| `src/lib/content-generator/`          | AI 콘텐츠 생성              |
| `src/i18n/routing.ts`                 | 지원 언어 목록              |
| `src/shared/config/ad-slots.ts`       | AdSense 슬롯 설정           |
| `messages/*.json`                     | 번역 파일                   |

---

## Environment Variables

```bash
NEXT_PUBLIC_APP_URL=https://web-toolkit.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# LemonSqueezy (결제)
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_WEBHOOK_SECRET=...

# Anthropic (AI 콘텐츠)
ANTHROPIC_API_KEY=...

# AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=...
```

---

## Article Categories

```typescript
type ArticleCategory =
  | "tech"           // 테크놀로지
  | "business"       // 비즈니스
  | "lifestyle"      // 라이프스타일
  | "entertainment"  // 엔터테인먼트
  | "trending"       // 트렌딩
  | "news";          // 뉴스
```

---

## UI Components

### 공통 UI

```tsx
import { Button, Input, Card, Badge } from "@/shared/ui";
```

### AdSense 광고

```tsx
import { AdUnit } from "@/widgets/ad-unit";
import { AD_SLOTS } from "@/shared/config/ad-slots";

<AdUnit slot={AD_SLOTS.ARTICLE_MIDDLE} format="rectangle" />
```
