# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Web Toolkit** - 개발자를 위한 웹 기반 올인원 도구 모음

| 항목             | 값                      |
| ---------------- | ----------------------- |
| **URL**          | https://web-toolkit.app |
| **Repository**   | dev-tool-kit            |
| **Version**      | 0.1.0                   |
| **Tools**        | 28개                    |
| **Cheatsheets**  | 14개                    |
| **Guides**       | 5개                     |
| **Languages**    | en, ko, ja              |
| **Static Pages** | 161개                   |

### Project Goals

- 100% 클라이언트 사이드 처리 (데이터 서버 전송 없음)
- SEO 최적화된 정적 페이지 생성
- PWA 지원으로 오프라인 사용 가능
- 다국어 지원 (영어, 한국어, 일본어)

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

### Available Scripts

| Command                 | Description                |
| ----------------------- | -------------------------- |
| `npm run dev`           | 개발 서버 (Turbopack)      |
| `npm run build`         | 프로덕션 빌드              |
| `npm run start`         | 프로덕션 서버              |
| `npm run lint`          | ESLint 검사                |
| `npm run test`          | Vitest 단위 테스트         |
| `npm run test:ui`       | Vitest UI 모드             |
| `npm run test:coverage` | 테스트 커버리지            |
| `npm run test:e2e`      | Playwright E2E 테스트      |
| `npm run test:e2e:ui`   | Playwright UI 모드         |
| `npm run analyze`       | 번들 분석 (`ANALYZE=true`) |
| `npm run prepare`       | Husky 설정                 |

---

## Tech Stack

### Core Framework

| Package    | Version | Purpose                       |
| ---------- | ------- | ----------------------------- |
| next       | 16.0.7  | React 프레임워크 (App Router) |
| react      | 19.2.0  | UI 라이브러리                 |
| react-dom  | 19.2.0  | React DOM 렌더러              |
| typescript | ^5      | 타입 시스템 (strict mode)     |

### Styling & UI

| Package                  | Version   | Purpose             |
| ------------------------ | --------- | ------------------- |
| tailwindcss              | ^4        | CSS 프레임워크      |
| @tailwindcss/postcss     | ^4        | PostCSS 플러그인    |
| tw-animate-css           | ^1.4.0    | 애니메이션 유틸리티 |
| tailwind-merge           | ^3.4.0    | 클래스 병합         |
| class-variance-authority | ^0.7.1    | 변형 관리           |
| clsx                     | ^2.1.1    | 조건부 클래스       |
| framer-motion            | ^12.23.25 | 애니메이션          |
| lucide-react             | ^0.556.0  | 아이콘              |
| next-themes              | ^0.4.6    | 다크모드            |

### Radix UI Components (shadcn/ui)

| Package                       | Version |
| ----------------------------- | ------- |
| @radix-ui/react-dialog        | ^1.1.15 |
| @radix-ui/react-dropdown-menu | ^2.1.16 |
| @radix-ui/react-label         | ^2.1.8  |
| @radix-ui/react-select        | ^2.2.6  |
| @radix-ui/react-slider        | ^1.3.6  |
| @radix-ui/react-slot          | ^1.2.4  |
| @radix-ui/react-switch        | ^1.2.6  |
| @radix-ui/react-tabs          | ^1.1.13 |
| cmdk                          | ^1.1.1  |

### Internationalization & SEO

| Package   | Version | Purpose         |
| --------- | ------- | --------------- |
| next-intl | ^4.5.8  | i18n 라이브러리 |
| next-pwa  | ^5.6.0  | PWA 지원        |

### Tool-Specific Dependencies

| Package                   | Version  | Used By                   |
| ------------------------- | -------- | ------------------------- |
| crypto-js                 | ^4.2.0   | hash-generator            |
| jwt-decode                | ^4.0.0   | jwt-decoder               |
| qrcode                    | ^1.5.4   | qr-generator              |
| sql-formatter             | ^15.6.10 | sql-formatter             |
| prettier                  | ^3.7.4   | prettier-playground       |
| markdown-it               | ^14.1.0  | markdown-preview          |
| highlight.js              | ^11.11.1 | 코드 하이라이팅           |
| svgo                      | ^4.0.0   | svg-optimizer             |
| cron-parser               | ^5.4.0   | cron-parser               |
| cronstrue                 | ^3.9.0   | cron-parser (자연어 변환) |
| date-fns                  | ^4.1.0   | unix-timestamp            |
| uuid                      | ^13.0.0  | uuid-generator            |
| ulid                      | ^3.0.2   | uuid-generator            |
| lorem-ipsum               | ^2.0.8   | lorem-generator           |
| he                        | ^1.2.0   | html-entity               |
| ua-parser-js              | ^2.0.6   | ua-parser                 |
| js-beautify               | ^1.15.4  | css-to-tailwind           |
| browser-image-compression | ^2.0.2   | image-resizer             |
| colorthief                | ^2.6.0   | color-picker              |
| jszip                     | ^3.10.1  | app-icon-generator        |
| file-saver                | ^2.0.5   | 파일 다운로드             |
| react-dropzone            | ^14.3.8  | 파일 업로드               |
| @monaco-editor/react      | ^4.7.0   | 코드 에디터               |
| zustand                   | ^5.0.9   | 상태 관리                 |
| lz-string                 | ^1.5.0   | URL 상태 압축             |

### Development Dependencies

| Package                   | Version | Purpose             |
| ------------------------- | ------- | ------------------- |
| vitest                    | ^3.2.4  | 단위 테스트         |
| @vitest/coverage-v8       | ^3.2.4  | 커버리지            |
| @vitejs/plugin-react      | ^4.7.0  | React 플러그인      |
| @testing-library/react    | ^16.3.0 | 컴포넌트 테스트     |
| @testing-library/jest-dom | ^6.9.1  | DOM 매처            |
| jsdom                     | ^26.1.0 | DOM 환경            |
| @playwright/test          | ^1.57.0 | E2E 테스트          |
| eslint                    | ^9      | 린터                |
| eslint-config-next        | 16.0.7  | Next.js ESLint 설정 |
| husky                     | ^9.1.7  | Git hooks           |
| lint-staged               | ^15.5.2 | 스테이징 린트       |
| sharp                     | ^0.34.5 | 이미지 처리         |
| @next/bundle-analyzer     | ^16.0.7 | 번들 분석           |

---

## Architecture (Feature-Sliced Design)

```
의존성 흐름: app → widgets → features → entities → shared
```

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   └── [locale]/                 # i18n 라우팅
│       ├── layout.tsx            # 루트 레이아웃
│       ├── page.tsx              # 홈페이지
│       ├── tools/
│       │   ├── page.tsx          # 도구 목록
│       │   └── [slug]/
│       │       └── page.tsx      # 개별 도구 페이지
│       ├── cheatsheets/
│       │   ├── page.tsx          # 치트시트 목록
│       │   └── [slug]/
│       │       └── page.tsx      # 개별 치트시트
│       ├── guides/
│       │   ├── page.tsx          # 가이드 목록
│       │   └── [slug]/
│       │       └── page.tsx      # 개별 가이드
│       └── privacy/
│           └── page.tsx          # 개인정보처리방침
│
├── widgets/                      # 독립적인 UI 블록
│   ├── header/                   # 헤더 (Language Switcher, Theme Toggle)
│   ├── sidebar/                  # 사이드바 (카테고리별 도구 목록)
│   ├── footer/                   # 푸터 (링크, 저작권)
│   ├── command-menu/             # Cmd+K 검색
│   └── file-uploader/            # 파일 업로드 UI
│
├── features/                     # 28개 도구 구현
│   ├── json-formatter/
│   │   ├── model/
│   │   │   └── use-json-formatter.ts  # 상태/로직 Hook
│   │   ├── lib/
│   │   │   ├── formatter.ts           # 순수 함수
│   │   │   └── formatter.test.ts      # 단위 테스트
│   │   ├── ui/
│   │   │   └── json-formatter.tsx     # UI 컴포넌트
│   │   └── index.ts
│   ├── jwt-decoder/
│   ├── hash-generator/
│   └── ... (25개 더)
│
├── entities/                     # 비즈니스 엔티티
│   ├── tool/
│   │   ├── model/
│   │   │   ├── types.ts          # ToolSlug, Tool 타입
│   │   │   ├── registry.ts       # 도구 레지스트리
│   │   │   └── seo-content.ts    # SEO 콘텐츠
│   │   └── ui/
│   │       └── tool-seo-section.tsx
│   ├── cheatsheet/
│   │   ├── model/
│   │   │   └── types.ts
│   │   ├── data/                 # 14개 치트시트 데이터
│   │   └── ui/
│   │       └── cheatsheet-table.tsx
│   └── guide/
│       ├── model/
│       │   └── types.ts
│       ├── data/                 # 5개 가이드 데이터
│       └── ui/
│           └── guide-content.tsx
│
└── shared/                       # 공유 리소스
    ├── ui/                       # UI 컴포넌트 (16개)
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── textarea.tsx
    │   ├── select.tsx
    │   ├── label.tsx
    │   ├── slider.tsx
    │   ├── switch.tsx
    │   ├── tabs.tsx
    │   ├── dialog.tsx
    │   ├── dropdown-menu.tsx
    │   ├── sheet.tsx
    │   ├── command.tsx
    │   ├── theme-provider.tsx
    │   ├── json-ld.tsx
    │   ├── clarity.tsx
    │   └── share-button.tsx
    ├── lib/
    │   └── hooks/
    │       ├── use-tool-history.ts   # 로컬 히스토리
    │       └── use-url-state.ts      # URL 상태 공유
    └── config/
        └── site.ts               # SITE_CONFIG
```

---

## Tools (28개)

### Category: Text & Code (12개)

| Slug                | Title                 | Description                                                           | Icon            |
| ------------------- | --------------------- | --------------------------------------------------------------------- | --------------- |
| json-formatter      | JSON Formatter        | JSON 데이터를 포맷팅, 압축, 검증합니다                                | FileJson        |
| sql-formatter       | SQL Formatter         | SQL 쿼리를 포맷팅하고 다양한 방언을 지원합니다                        | Database        |
| markdown-preview    | Markdown Preview      | Markdown을 실시간으로 렌더링하고 코드 하이라이팅을 지원합니다         | FileText        |
| diff-checker        | Diff Checker          | 두 텍스트의 차이점을 비교하고 변경 사항을 시각화합니다                | GitCompare      |
| prettier-playground | Prettier Playground   | 다양한 언어의 코드를 Prettier로 포맷팅합니다                          | Sparkles        |
| regex-tester        | Regex Tester          | 정규식을 테스트하고 매칭 결과를 실시간으로 확인합니다                 | Regex           |
| lorem-generator     | Lorem Ipsum Generator | 더미 텍스트를 단어, 문장, 문단 단위로 생성합니다                      | TextCursorInput |
| url-parser          | URL Parser            | URL을 분석하여 구성 요소를 분해하고 쿼리 파라미터를 편집합니다        | Link            |
| uuid-generator      | UUID/ULID Generator   | UUID v1, v4 및 ULID를 생성하고 다양한 포맷으로 변환합니다             | Fingerprint     |
| cron-parser         | Cron Parser           | Cron 표현식을 해석하고 다음 실행 시간을 예측합니다                    | Timer           |
| ua-parser           | User Agent Parser     | User Agent 문자열을 분석하여 브라우저, OS, 디바이스 정보를 확인합니다 | Monitor         |
| meta-generator      | Meta Tag Generator    | SEO용 메타 태그, Open Graph, Twitter Card를 생성합니다                | Tags            |
| curl-builder        | cURL Builder          | HTTP 요청을 구성하고 cURL 명령어를 생성합니다                         | Terminal        |

### Category: Media & Design (7개)

| Slug               | Title                | Description                                                      | Icon       |
| ------------------ | -------------------- | ---------------------------------------------------------------- | ---------- |
| image-resizer      | Image Resizer        | 이미지 크기 조절, 포맷 변환, 품질 조정을 브라우저에서 처리합니다 | Image      |
| app-icon-generator | App Icon Generator   | iOS, Android, Favicon 규격에 맞는 앱 아이콘을 일괄 생성합니다    | Smartphone |
| qr-generator       | QR Code Generator    | URL, WiFi, 연락처 등 다양한 형식의 QR 코드를 생성합니다          | QrCode     |
| color-picker       | Color Picker         | 이미지에서 색상을 추출하고 팔레트를 생성합니다                   | Palette    |
| box-shadow         | Box Shadow Generator | CSS box-shadow를 시각적으로 편집하고 코드를 생성합니다           | Square     |
| gradient-generator | Gradient Generator   | CSS 그라디언트를 시각적으로 편집하고 코드를 생성합니다           | Blend      |
| svg-optimizer      | SVG Optimizer        | SVG 파일을 최적화하여 파일 크기를 줄입니다                       | FileImage  |

### Category: Converters (6개)

| Slug             | Title                 | Description                                             | Icon       |
| ---------------- | --------------------- | ------------------------------------------------------- | ---------- |
| base-converter   | Number Base Converter | 2진수, 8진수, 10진수, 16진수 간 상호 변환을 지원합니다  | Calculator |
| base64-converter | Base64 Converter      | 텍스트, 파일을 Base64로 인코딩/디코딩합니다             | Binary     |
| unix-timestamp   | Unix Timestamp        | Unix 타임스탬프와 날짜/시간 간 양방향 변환을 지원합니다 | Clock      |
| url-encoder      | URL Encoder/Decoder   | URL을 인코딩하거나 디코딩합니다                         | Link2      |
| html-entity      | HTML Entity Encoder   | HTML 특수문자를 엔티티로 인코딩/디코딩합니다            | Code       |
| css-to-tailwind  | CSS to Tailwind       | CSS 속성을 Tailwind CSS 클래스로 변환합니다             | Paintbrush |

### Category: Security & Encoding (3개)

| Slug           | Title          | Description                                                   | Icon |
| -------------- | -------------- | ------------------------------------------------------------- | ---- |
| jwt-decoder    | JWT Decoder    | JWT 토큰을 디코딩하여 Header, Payload, 만료 시간을 확인합니다 | Lock |
| hash-generator | Hash Generator | MD5, SHA-1, SHA-256, SHA-512 해시를 생성하고 비교합니다       | Hash |

### Adding a New Tool

1. **types.ts** - ToolSlug 타입 추가

   ```typescript
   // src/entities/tool/model/types.ts
   export type ToolSlug = "existing-tool" | "new-tool"; // 추가
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
   ├── model/
   │   └── use-new-tool.ts   # Hook
   ├── lib/
   │   ├── logic.ts          # 순수 함수
   │   └── logic.test.ts     # 테스트
   ├── ui/
   │   └── new-tool.tsx      # UI
   └── index.ts
   ```

4. **tool-renderer.tsx** - Dynamic import 추가

   ```typescript
   // src/app/[locale]/tools/[slug]/tool-renderer.tsx
   const NewTool = dynamic(() => import("@/features/new-tool"));

   switch (slug) {
     case "new-tool":
       return <NewTool />;
   }
   ```

5. **messages/\*.json** - 번역 추가 (3개 언어)

6. **seo-content.ts** - SEO 콘텐츠 추가 (선택)

---

## Cheatsheets (14개)

| Slug        | Title             | File                 |
| ----------- | ----------------- | -------------------- |
| git         | Git Commands      | git-commands.ts      |
| http-status | HTTP Status Codes | http-status.ts       |
| regex       | Regex Syntax      | regex-syntax.ts      |
| mime-types  | MIME Types        | mime-types.ts        |
| javascript  | JavaScript Syntax | javascript-syntax.ts |
| css         | CSS Syntax        | css-syntax.ts        |
| typescript  | TypeScript Syntax | typescript-syntax.ts |
| react       | React Syntax      | react-syntax.ts      |
| vue         | Vue Syntax        | vue-syntax.ts        |
| nextjs      | Next.js Syntax    | nextjs-syntax.ts     |
| tailwind    | Tailwind CSS      | tailwind-syntax.ts   |
| nodejs      | Node.js Syntax    | nodejs-syntax.ts     |
| docker      | Docker Commands   | docker-syntax.ts     |
| bash        | Bash Commands     | bash-syntax.ts       |

**Data Location**: `src/entities/cheatsheet/data/`

### Cheatsheet Data Structure

```typescript
// src/entities/cheatsheet/model/types.ts
export interface CheatsheetItem {
  code: string;
  name: string;
  description: string;
  example?: string;
  category?: string;
}

export interface Cheatsheet {
  slug: string;
  title: string;
  description: string;
  items: CheatsheetItem[];
}
```

---

## Guides (5개)

| Slug             | Difficulty   | Read Time |
| ---------------- | ------------ | --------- |
| json-formatter   | beginner     | 5분       |
| jwt-decoder      | intermediate | 8분       |
| base64-converter | beginner     | 5분       |
| regex-tester     | intermediate | 10분      |
| hash-generator   | intermediate | 7분       |

**Data Location**: `src/entities/guide/data/`

### Guide Data Structure

```typescript
// src/entities/guide/model/types.ts
export interface GuideSection {
  id: string; // kebab-case 필수! (예: "what-is-json")
  title: string;
  content: string;
  code?: string;
  language?: string;
}

export interface Guide {
  slug: string;
  sections: GuideSection[];
  relatedTools: string[];
  keywords: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  readTime: number;
}
```

### Guide Section ID Rules

**중요**: Section ID는 반드시 **kebab-case** 사용

```typescript
// ✅ 올바른 예
{ id: "what-is-json", title: "What is JSON?" }
{ id: "common-errors", title: "Common Errors" }

// ❌ 잘못된 예
{ id: "whatIsJson", title: "What is JSON?" }  // camelCase 금지
{ id: "what_is_json", title: "What is JSON?" }  // snake_case 금지
```

---

## i18n (Internationalization)

### Supported Languages

| Code | Language          | File             |
| ---- | ----------------- | ---------------- |
| en   | English (default) | messages/en.json |
| ko   | 한국어            | messages/ko.json |
| ja   | 日本語            | messages/ja.json |

### Configuration

```typescript
// src/i18n/routing.ts
export const locales = ["en", "ko", "ja"] as const;
export const defaultLocale = "en";
```

### Usage

```typescript
// Client Component
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("tools");
  return <h1>{t("json-formatter.title")}</h1>;
}

// Server Component
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("tools");
  return <h1>{t("json-formatter.title")}</h1>;
}
```

### Translation Structure

```json
{
  "tools": {
    "json-formatter": {
      "title": "JSON Formatter",
      "description": "Format, minify, and validate JSON data"
    }
  },
  "cheatsheets": {
    "git": {
      "title": "Git Commands Cheatsheet"
    }
  },
  "guides": {
    "json-formatter": {
      "title": "JSON Formatter Guide",
      "sections": {
        "what-is-json": "What is JSON?"
      }
    }
  }
}
```

---

## Analytics & Monetization

### Google Analytics 4

```typescript
// Measurement ID
G - BHCZK28NQQ;
```

### Google Tag Manager

```typescript
// Container ID
GTM - NKT5P48C;
```

### Google AdSense (현재 구현)

```typescript
// Publisher ID
ca - pub - 4981986991458105;

// ads.txt (public/ads.txt)
(google.com, pub - 4981986991458105, DIRECT, f08c47fec0942fa0);
```

### Ad Components

```typescript
// src/shared/ui/ad-unit/ad-unit.tsx
import { AdUnit } from "@/shared/ui";

// 기본 광고
<AdUnit slot="SLOT_ID" />

// 옵션
<AdUnit
  slot="SLOT_ID"
  format="auto" | "horizontal" | "vertical" | "rectangle"
  responsive={true}
  className="my-4"
/>
```

### Microsoft Clarity (Optional)

```bash
# .env.local
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

### Search Console Verification

| Service               | Meta Tag Content                              |
| --------------------- | --------------------------------------------- |
| Google Search Console | `UbK-cRKd2S1F-xeGfKZsoDQqr5t9EXk8upUmWhqLb0w` |
| Naver Search Advisor  | `12d9409b0e0f7faf6b74da7f2bc059e6a6683a37`    |

---

## Monetization Strategy (Phase 13 - 예정)

### 3-Pillar Hybrid Revenue Model

| Pillar          | Revenue Source              | Expected % | Phase |
| --------------- | --------------------------- | ---------- | ----- |
| **Primary**     | Freemium + Quota-based 구독 | 60-70%     | 1     |
| **Secondary A** | Non-intrusive 광고          | 20-25%     | 2     |
| **Secondary B** | 제휴 마케팅                 | 10-15%     | 2     |

### Subscription Tiers

| Tier           | Price  | Features                                         |
| -------------- | ------ | ------------------------------------------------ |
| **Free**       | $0     | 28개 도구 기본, 일일 100회 API, 광고 표시        |
| **Pro**        | $9/월  | 무제한 접근, 10K API/월, 광고 제거, Bulk Actions |
| **Enterprise** | Custom | 무제한 API, SLA, AI 분석, 팀 기능                |

### Premium Features (게이팅 대상)

| Feature             | Free  | Pro     | Enterprise    |
| ------------------- | ----- | ------- | ------------- |
| Bulk JSON Format    | 1파일 | 100파일 | 무제한        |
| Batch Hash Generate | 5개   | 500개   | 무제한        |
| QR Code Bulk        | 1개   | 50개    | 무제한        |
| API Access          | ❌    | ✅      | ✅ + SLA      |
| AI 분석             | ❌    | 기본    | 고급          |
| 작업 기록           | 7일   | 무제한  | 무제한 + 감사 |

### Required Infrastructure (미구현)

```yaml
# Phase 1에서 구현 예정
authentication:
  solution: "Supabase Auth"
  features: [Google, GitHub, Email, Magic Link]

database:
  solution: "Supabase (PostgreSQL)"
  tables: [users, subscriptions, usage_records, api_keys]

payment:
  solution: "Stripe"
  features: [구독 결제, Quota 초과 청구, 웹훅]

feature_gating:
  implementation: "서버/클라이언트 하이브리드"
```

### Implementation Roadmap

| Phase       | Duration   | Focus                                     |
| ----------- | ---------- | ----------------------------------------- |
| **Phase 1** | Month 1-3  | Auth, Payment, Basic Gating, Bulk Actions |
| **Phase 2** | Month 4-6  | 광고 최적화, 제휴, B2D 마케팅             |
| **Phase 3** | Month 7-12 | AI 대시보드, 팀 기능, Enterprise          |

### KPIs

| Metric      | Phase 1 | Phase 2 | Phase 3 |
| ----------- | ------- | ------- | ------- |
| MRR         | $500    | $2,000  | $10,000 |
| Pro 구독자  | 50      | 200     | 500     |
| 유료 전환율 | 1%      | 2.5%    | 5%      |

**상세 계획**: `.claude/plans/rustling-soaring-lovelace.md` Phase 13 참조

---

## SEO Configuration

### Site Config

```typescript
// src/shared/config/site.ts
export const SITE_CONFIG = {
  name: "Web Toolkit",
  url: "https://web-toolkit.app",
  description: "All-in-one web-based toolkit for developers",
  author: "Web Toolkit Team",
};
```

### Metadata Structure

```typescript
// src/app/[locale]/layout.tsx
export async function generateMetadata({ params }) {
  return {
    title: {
      template: "%s | Web Toolkit",
      default: "Web Toolkit - Developer Tools",
    },
    description: "...",
    alternates: {
      canonical: `https://web-toolkit.app/${locale}`,
      languages: {
        en: "https://web-toolkit.app/en",
        ko: "https://web-toolkit.app/ko",
        ja: "https://web-toolkit.app/ja",
      },
    },
    verification: {
      google: "UbK-cRKd2S1F-xeGfKZsoDQqr5t9EXk8upUmWhqLb0w",
      other: {
        "naver-site-verification": "12d9409b0e0f7faf6b74da7f2bc059e6a6683a37",
      },
    },
  };
}
```

### JSON-LD Schemas

- `Organization` - 사이트 정보
- `WebSite` - 검색 박스
- `BreadcrumbList` - 경로 표시
- `FAQPage` - 도구별 FAQ (seo-content.ts)

### OG Image

- **API Route**: `/api/og`
- **Size**: 1200x630px
- **Dynamic**: 도구별 타이틀 포함

---

## PWA Configuration

### manifest.json

```json
{
  "name": "Web Toolkit",
  "short_name": "WebToolkit",
  "description": "All-in-one web-based toolkit for developers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0a0a0a",
  "orientation": "portrait-primary",
  "categories": ["developer", "utilities", "productivity"],
  "icons": [
    { "src": "/icons/icon-72x72.png", "sizes": "72x72" },
    { "src": "/icons/icon-96x96.png", "sizes": "96x96" },
    { "src": "/icons/icon-128x128.png", "sizes": "128x128" },
    { "src": "/icons/icon-144x144.png", "sizes": "144x144" },
    { "src": "/icons/icon-152x152.png", "sizes": "152x152" },
    { "src": "/icons/icon-192x192.png", "sizes": "192x192" },
    { "src": "/icons/icon-384x384.png", "sizes": "384x384" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512" }
  ]
}
```

### Icon Generation Script

```bash
# public/icons/ 디렉토리에 아이콘 생성
node scripts/generate-icons.mjs
```

---

## Shared Components

### UI Components (16개)

| Component     | Source             | Description                                                            |
| ------------- | ------------------ | ---------------------------------------------------------------------- |
| Button        | button.tsx         | 버튼 (variants: default, destructive, outline, secondary, ghost, link) |
| Input         | input.tsx          | 텍스트 입력                                                            |
| Textarea      | textarea.tsx       | 멀티라인 텍스트                                                        |
| Select        | select.tsx         | 드롭다운 선택                                                          |
| Label         | label.tsx          | 폼 레이블                                                              |
| Slider        | slider.tsx         | 슬라이더                                                               |
| Switch        | switch.tsx         | 토글 스위치                                                            |
| Tabs          | tabs.tsx           | 탭 컨테이너                                                            |
| Dialog        | dialog.tsx         | 모달 다이얼로그                                                        |
| DropdownMenu  | dropdown-menu.tsx  | 드롭다운 메뉴                                                          |
| Sheet         | sheet.tsx          | 사이드 패널                                                            |
| Command       | command.tsx        | 커맨드 팔레트 (cmdk)                                                   |
| ThemeProvider | theme-provider.tsx | 다크모드 제공자                                                        |
| JsonLd        | json-ld.tsx        | 구조화된 데이터                                                        |
| ClarityScript | clarity.tsx        | MS Clarity 스크립트                                                    |
| ShareButton   | share-button.tsx   | URL 공유 버튼                                                          |

### Custom Hooks (2개)

| Hook           | File                | Description                             |
| -------------- | ------------------- | --------------------------------------- |
| useToolHistory | use-tool-history.ts | 로컬스토리지 기반 히스토리              |
| useUrlState    | use-url-state.ts    | URL 쿼리 파라미터 상태 (lz-string 압축) |

---

## Testing

### Unit Tests (Vitest)

| Feature        | Test File                                           |
| -------------- | --------------------------------------------------- |
| json-formatter | `src/features/json-formatter/lib/formatter.test.ts` |
| hash-generator | `src/features/hash-generator/lib/hash.test.ts`      |
| jwt-decoder    | `src/features/jwt-decoder/lib/jwt.test.ts`          |
| base-converter | `src/features/base-converter/lib/converter.test.ts` |
| url-encoder    | `src/features/url-encoder/lib/encoder.test.ts`      |
| color-picker   | `src/features/color-picker/lib/color.test.ts`       |

```bash
# 테스트 실행
npm run test

# 커버리지
npm run test:coverage

# UI 모드
npm run test:ui
```

### E2E Tests (Playwright)

| Feature        | Test File                    |
| -------------- | ---------------------------- |
| json-formatter | `e2e/json-formatter.spec.ts` |
| hash-generator | `e2e/hash-generator.spec.ts` |

```bash
# E2E 실행
npm run test:e2e

# UI 모드
npm run test:e2e:ui
```

### Test Conventions

```typescript
// 순수 함수 테스트 (lib/*.test.ts)
import { describe, it, expect } from "vitest";
import { formatJson } from "./formatter";

describe("formatJson", () => {
  it("formats valid JSON", () => {
    expect(formatJson('{"a":1}')).toBe('{\n  "a": 1\n}');
  });
});
```

---

## CI/CD

### Pre-commit Hooks (Husky + lint-staged)

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

### Git Hooks

```bash
# .husky/pre-commit
npx lint-staged
```

---

## Next.js 16 Caveats

### Async Params

Next.js 16에서 `params`는 Promise로 반환됩니다.

```typescript
// ✅ Next.js 16 방식
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;  // await 필수!
  return <Tool slug={slug} />;
}

// ❌ 이전 방식 (동작하지 않음)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;  // 에러!
}
```

### generateStaticParams

```typescript
export async function generateStaticParams() {
  return getToolSlugs().map((slug) => ({ slug }));
}
```

---

## Environment Variables

### Required

```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://web-toolkit.app
```

### Optional

```bash
# Microsoft Clarity
NEXT_PUBLIC_CLARITY_ID=your_clarity_id

# Bundle Analysis
ANALYZE=true  # npm run analyze 시 자동 설정
```

---

## Build Configuration

### next.config.ts

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
};

// 플러그인 체인
export default bundleAnalyzer(withPWA(withNextIntl(nextConfig)));
```

---

## Key Files Reference

| File                                              | Purpose                                      |
| ------------------------------------------------- | -------------------------------------------- |
| `next.config.ts`                                  | Next.js + PWA + i18n + 번들 분석 설정        |
| `src/shared/config/site.ts`                       | SITE_CONFIG (이름, URL, 설명)                |
| `src/i18n/routing.ts`                             | 지원 언어 목록                               |
| `src/entities/tool/model/types.ts`                | ToolSlug 타입 정의                           |
| `src/entities/tool/model/registry.ts`             | 28개 도구 레지스트리                         |
| `src/entities/tool/model/seo-content.ts`          | SEO 콘텐츠 (whatIs, howToUse, features, faq) |
| `src/app/[locale]/tools/[slug]/tool-renderer.tsx` | 도구 Dynamic Import                          |
| `messages/*.json`                                 | i18n 번역 파일 (en, ko, ja)                  |
| `public/manifest.json`                            | PWA 매니페스트                               |
| `public/ads.txt`                                  | AdSense 인증                                 |
| `vitest.config.ts`                                | Vitest 설정                                  |
| `playwright.config.ts`                            | Playwright 설정                              |

---

## Troubleshooting

### Build Errors

**번역 키 누락**

```bash
# 에러: Missing message: tools.new-tool.title for locale "ja"
# 해결: messages/ja.json에 번역 추가
```

**Dynamic Import 실패**

```bash
# 에러: Cannot find module '@/features/new-tool'
# 해결: tool-renderer.tsx에 import 추가
```

### Development Issues

**Hydration Mismatch**

```typescript
// 클라이언트 전용 로직은 useEffect 내부에서 실행
useEffect(() => {
  // 브라우저 전용 코드
}, []);
```

**Sharp 설치 실패 (M1 Mac)**

```bash
npm install --platform=darwin --arch=arm64 sharp
```
