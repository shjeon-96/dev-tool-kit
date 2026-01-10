# Content Generation Workflow

## Overview

AI 기반 자동화 트렌드 블로그의 콘텐츠 생성 워크플로우

```
트렌드 수집 → AI 기사 생성 → 발행 큐 → 자동 발행
```

## 1. 트렌드 수집 (Cron: 매 2시간)

**API**: `GET /api/cron/trends`

**소스**:

- Google Trends
- RSS 피드
- 뉴스 API

**저장 위치**: `trends` 테이블

```typescript
interface Trend {
  id: string;
  source: "google_trends" | "reddit" | "news_rss" | "twitter" | "manual";
  keyword: string;
  volume: number;
  competition_score: number;
  priority_score: number;
  region: "kr" | "us" | "global";
  category: ArticleCategory | null;
  processed: boolean;
}
```

## 2. AI 기사 생성 (Cron: 매 4시간)

**API**: `GET /api/cron/generate-articles`

**사용 라이브러리**: `src/lib/content-generator/`

**생성 콘텐츠**:

- 한국어/영어 제목 및 본문
- 발췌문 (excerpt)
- SEO 키워드
- FAQ (SEO 리치 스니펫용)
- 핵심 요약 (key takeaways)

```typescript
interface GeneratedContent {
  title_ko: string;
  title_en: string;
  excerpt_ko: string;
  excerpt_en: string;
  content_ko: string;
  content_en: string;
  tags: string[];
  seo_keywords: string[];
  faqs?: ArticleFAQ[];
  key_takeaways_ko?: string[];
  key_takeaways_en?: string[];
}
```

## 3. 기사 발행 (Cron: 매 1시간)

**API**: `GET /api/cron/publish-articles`

**프로세스**:

1. `publish_queue`에서 예정된 기사 조회
2. `status: "scheduled"` → `status: "published"` 변경
3. `published_at` 타임스탬프 설정
4. 캐시 무효화 (revalidate)

## 주요 파일

| 파일                                  | 역할               |
| ------------------------------------- | ------------------ |
| `src/lib/trend-detector/`             | 트렌드 감지 시스템 |
| `src/lib/content-generator/`          | AI 콘텐츠 생성     |
| `src/lib/content-generator/prompts/`  | Claude 프롬프트    |
| `src/entities/trend/model/queries.ts` | DB 쿼리 함수       |
| `src/entities/trend/model/types.ts`   | 타입 정의          |

## Article 상태 흐름

```
draft → review → scheduled → published → archived
```

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

## 수동 기사 작성

자동화 외에 수동으로 기사를 작성하려면:

1. Supabase Dashboard에서 `articles` 테이블에 직접 삽입
2. 또는 Dashboard UI 구현 (향후 계획)

## 환경 변수

```bash
# AI 콘텐츠 생성
ANTHROPIC_API_KEY=...

# Cron Job 인증
CRON_SECRET=...

# Supabase
SUPABASE_SERVICE_ROLE_KEY=...
```
