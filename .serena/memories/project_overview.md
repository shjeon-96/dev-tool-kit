# Web Toolkit - Project Overview

## Purpose

AI 기반 자동화 트렌드 블로그 - Claude AI로 트렌드 기사를 자동 생성하고 발행

## Key Information

| 항목           | 값                                         |
| -------------- | ------------------------------------------ |
| **URL**        | https://web-toolkit.app                    |
| **Type**       | Automated Trend Blog                       |
| **Languages**  | en, ko (2개)                               |
| **Automation** | Cron Jobs (트렌드 수집 → 기사 생성 → 발행) |
| **License**    | MIT                                        |

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **State Management**: React hooks + custom hooks
- **Compiler**: React Compiler (babel-plugin-react-compiler)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Database/Auth**: Supabase
- **Payments**: LemonSqueezy
- **AI**: Anthropic Claude (@anthropic-ai/sdk)
- **i18n**: next-intl

## Architecture

Feature-Sliced Design (FSD)

```
의존성 흐름: app → widgets → features → entities → shared
```

## Project Structure

```
src/
├── app/[locale]/              # Next.js App Router (i18n)
│   ├── page.tsx               # 홈 (트렌딩 기사)
│   ├── [category]/[slug]/     # 기사 상세
│   ├── blog/                  # 블로그 목록
│   ├── auth/                  # 인증
│   ├── dashboard/             # 대시보드
│   └── pricing/               # 가격
│
├── app/api/                   # API Routes
│   ├── cron/                  # 자동화 Cron Jobs
│   │   ├── trends/            # 트렌드 수집 (매 2시간)
│   │   ├── generate-articles/ # AI 기사 생성 (매 4시간)
│   │   └── publish-articles/  # 기사 발행 (매 1시간)
│   ├── checkout/              # 결제
│   └── webhooks/              # 웹훅
│
├── features/                  # 기능 모듈
│   ├── auth/                  # 인증 (Supabase)
│   ├── billing/               # 결제 (LemonSqueezy)
│   └── blog/                  # 블로그 UI
│
├── entities/                  # 비즈니스 엔티티
│   ├── trend/                 # 트렌드/기사 엔티티
│   ├── post/                  # 블로그 포스트
│   └── subscription/          # 구독
│
├── lib/                       # 자동화 라이브러리
│   ├── trend-detector/        # 트렌드 감지 (Google Trends, RSS)
│   └── content-generator/     # AI 콘텐츠 생성 (Claude)
│
├── widgets/                   # UI 위젯
│   ├── header/                # 헤더
│   ├── footer/                # 푸터
│   └── ad-unit/               # AdSense 광고
│
└── shared/                    # 공통
    ├── ui/                    # Radix UI 컴포넌트
    ├── lib/                   # Supabase, hooks
    └── config/                # 설정
```

## Key Files

| File                                  | Purpose                       |
| ------------------------------------- | ----------------------------- |
| `src/entities/trend/model/types.ts`   | Article, Trend, Category 타입 |
| `src/entities/trend/model/queries.ts` | Supabase 쿼리 함수            |
| `src/lib/trend-detector/`             | 트렌드 감지 시스템            |
| `src/lib/content-generator/`          | AI 콘텐츠 생성                |
| `src/i18n/routing.ts`                 | 지원 언어 (en, ko)            |
| `messages/*.json`                     | 번역 파일                     |

## Database Tables (Supabase)

| Table               | Description   |
| ------------------- | ------------- |
| `trends`            | 트렌드 데이터 |
| `articles`          | 기사 저장     |
| `article_analytics` | 조회수 통계   |
| `profiles`          | 사용자 프로필 |
| `subscriptions`     | 구독 정보     |
| `publish_queue`     | 발행 대기열   |

## Article Categories

```typescript
type ArticleCategory =
  | "tech" // 테크놀로지
  | "business" // 비즈니스
  | "lifestyle" // 라이프스타일
  | "entertainment" // 엔터테인먼트
  | "trending" // 트렌딩
  | "news"; // 뉴스
```
