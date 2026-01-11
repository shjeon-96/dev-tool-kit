# Architecture Overview

## Design Pattern

Feature-Sliced Design (FSD) 아키텍처 적용

```
의존성 흐름: app → widgets → features → entities → shared
```

## Layer Responsibilities

### app/

- Next.js App Router 페이지 및 레이아웃
- API Routes (REST endpoints, Cron jobs, Webhooks)
- 라우팅 설정 및 i18n

### widgets/

- 독립적인 UI 블록 (header, footer, sidebar 등)
- features와 entities를 조합
- 레이아웃 구성 요소

### features/

- 비즈니스 기능 단위
- model (hooks), ui (components), lib (pure functions)
- 각 feature는 독립적으로 테스트 가능

### entities/

- 도메인 모델 (types.ts)
- 데이터 액세스 레이어 (queries.ts)
- Supabase 쿼리 함수

### shared/

- 의존성 없는 공통 코드
- UI 컴포넌트 (Radix UI 기반)
- Hooks, 설정, 유틸리티

### lib/

- 자동화 시스템 라이브러리
- 트렌드 감지, 웹 검색, AI 콘텐츠 생성

## Data Flow

### 콘텐츠 자동화 파이프라인

```
1. trend-detector/
   └─→ Google Trends, RSS 수집
   └─→ trends 테이블 저장

2. web-search/
   └─→ Tavily API로 컨텍스트 수집
   └─→ RAG용 SearchContextResult 반환

3. content-generator/
   └─→ Claude AI로 기사 생성
   └─→ 다국어 콘텐츠 (ko, en)
   └─→ articles 테이블 저장

4. publish-articles/
   └─→ scheduled → published 상태 변경
   └─→ 캐시 무효화
```

### 사용자 요청 흐름

```
Client Request
     ↓
Next.js App Router (app/[locale])
     ↓
Server Component / API Route
     ↓
Entity Queries (Supabase)
     ↓
Response (SSR/ISR)
```

## Key Architectural Decisions

1. **FSD 아키텍처**: 확장 가능하고 유지보수 쉬운 구조
2. **Server Components**: 대부분 서버 컴포넌트로 SEO 최적화
3. **Supabase**: PostgreSQL + Auth + Storage 통합
4. **next-intl**: 다국어 지원 (en, ko)
5. **Cron Jobs**: Vercel Cron으로 자동화 스케줄링

## Technology Stack

| Category   | Technology               |
| ---------- | ------------------------ |
| Framework  | Next.js 16+ (App Router) |
| Language   | TypeScript (strict mode) |
| Styling    | Tailwind CSS v4          |
| UI Library | Radix UI                 |
| Database   | Supabase (PostgreSQL)    |
| Auth       | Supabase Auth            |
| Payments   | LemonSqueezy             |
| AI         | Anthropic Claude         |
| Search     | Tavily API               |
| i18n       | next-intl                |
| Testing    | Vitest, Playwright       |
