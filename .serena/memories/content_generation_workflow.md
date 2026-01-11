# Content Generation Workflow

## Overview

AI 기반 자동화 트렌드 블로그의 콘텐츠 생성 워크플로우

```
트렌드 수집 → 웹 검색(RAG) → AI 기사 생성 → 발행 큐 → 자동 발행
```

---

## Cron 스케줄 (vercel.json)

| Endpoint                      | Schedule                                 | 주기     |
| ----------------------------- | ---------------------------------------- | -------- |
| `/api/cron/trends`            | `0 0,2,4,6,8,10,12,14,16,18,20,22 * * *` | 매 2시간 |
| `/api/cron/generate-articles` | `30 0,4,8,12,16,20 * * *`                | 매 4시간 |
| `/api/cron/publish-articles`  | `0 * * * *`                              | 매 1시간 |

---

## 1. 트렌드 수집 (Cron: 매 2시간)

**API**: `GET /api/cron/trends`
**Max Duration**: 60초

### 설정

```typescript
{
  sources: ["google_trends", "reddit", "news_rss"],
  options: {
    region: "global",
    limit: 30,
    minVolume: 100
  },
  maxTrendsPerSource: 30
}
```

### 처리 흐름

1. 소스별 트렌드 수집 (Google Trends, Reddit, RSS)
2. 중복 키워드 체크 (`processed: false` 기준)
3. 기존 트렌드 업데이트 또는 신규 삽입
4. `trends` 테이블 저장

### Trend 엔티티

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
  related_keywords: string[];
  metadata: object;
}
```

---

## 2. AI 기사 생성 (Cron: 매 4시간)

**API**: `GET /api/cron/generate-articles`
**Max Duration**: 300초 (5분)

### 비용 제어

```typescript
const DAILY_BUDGET_USD = 2.0; // 일일 예산: $2 (~$60/월)
const MAX_ARTICLES_PER_RUN = 5; // 실행당 최대 기사 수
```

### AI 모델

```typescript
const MODEL = "claude-3-haiku-20240307";

// 가격 (per 1M tokens)
const PRICING = {
  input: 0.25, // $0.25
  output: 1.25, // $1.25
};

// 예상 비용: ~$0.004/기사
```

### 처리 흐름

1. 일일 지출 확인 (`getTodaySpending`)
2. 남은 예산으로 생성 가능한 기사 수 계산
3. `priority_score` 높은 순으로 미처리 트렌드 조회
4. **RAG: Tavily 웹 검색으로 최신 컨텍스트 수집** (설정된 경우)
5. Claude Haiku로 다국어 기사 생성
6. `articles` 테이블 삽입
7. `trends` 테이블 `processed: true` 업데이트
8. `publish_queue`에 1시간 후 발행 예약

### 기사 스타일 매핑

```typescript
function determineArticleStyle(category) {
  switch (category) {
    case "tech":
      return "analysis";
    case "business":
      return "news";
    case "lifestyle":
      return "howto";
    case "entertainment":
      return "listicle";
    default:
      return "news";
  }
}
```

### 생성 콘텐츠

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
  // SEO 리치 스니펫용
  faqs?: ArticleFAQ[];
  key_takeaways_ko?: string[];
  key_takeaways_en?: string[];
}
```

---

## 3. 기사 발행 (Cron: 매 1시간)

**API**: `GET /api/cron/publish-articles`
**Max Duration**: 60초

### 설정

```typescript
const MAX_PUBLISH_PER_RUN = 10; // 실행당 최대 발행 수
```

### 처리 흐름

1. `publish_queue`에서 예약 시간 도래한 기사 조회
2. `priority` 높은 순, `scheduled_time` 순 정렬
3. `status: "pending"` → `"processing"` → `"completed"`
4. `articles.status` → `"published"`, `published_at` 설정
5. **ISR 캐시 무효화**:
   - 기사 페이지 (`/ko|en/{category}/{slug}`)
   - 카테고리 페이지 (`/ko|en/{category}`)
   - 홈페이지 (`/ko`, `/en`)
   - 사이트맵 (`/sitemap.xml`)
6. `article_analytics` 초기 레코드 생성

### 에러 처리 및 재시도

```typescript
const maxRetries = 3;
const retryDelayMinutes = 15;

// 재시도 로직
if (retryCount < maxRetries) {
  // 15분 후 재시도 예약
  scheduledTime = now + 15분;
  status = "pending";
} else {
  status = "failed";
}
```

---

## RAG (웹 검색 컨텍스트)

### Tavily API 통합

```typescript
// src/lib/web-search/

interface WebSearchOptions {
  maxResults?: number;
  maxTokens?: number;
  searchDepth?: "basic" | "advanced";
  topic?: "general" | "news";
}

// 트렌드 키워드로 웹 검색
const searchResult = await searchTrendContext(
  trend.keyword,
  trend.related_keywords || [],
);

// 프롬프트에 컨텍스트 포함
const context = formatContextForPrompt(searchResult);
```

### 폴백 동작

- Tavily 미설정: 모델 지식만으로 생성
- 검색 실패: 경고 로그 후 계속 진행

---

## Article 상태 흐름

```
draft → review → scheduled → published → archived
```

### 자동화 흐름

```
트렌드 → draft → scheduled(1시간 후) → published
```

---

## 환경 변수

```bash
# AI 콘텐츠 생성
ANTHROPIC_API_KEY=...

# 웹 검색 (RAG) - 선택사항
TAVILY_API_KEY=...

# Cron Job 인증
CRON_SECRET=...

# Supabase
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## 주요 파일

| 파일                                          | 역할               |
| --------------------------------------------- | ------------------ |
| `src/app/api/cron/trends/route.ts`            | 트렌드 수집 API    |
| `src/app/api/cron/generate-articles/route.ts` | 기사 생성 API      |
| `src/app/api/cron/publish-articles/route.ts`  | 기사 발행 API      |
| `src/lib/trend-detector/`                     | 트렌드 감지 시스템 |
| `src/lib/web-search/`                         | RAG 웹 검색        |
| `src/lib/content-generator/`                  | AI 콘텐츠 생성     |
| `src/lib/content-generator/prompts/`          | Claude 프롬프트    |
| `src/entities/trend/model/queries.ts`         | DB 쿼리 함수       |
| `vercel.json`                                 | Cron 스케줄 설정   |

---

## 수동 트리거

```bash
# 트렌드 수집
curl -X GET "http://localhost:3000/api/cron/trends" \
  -H "Authorization: Bearer $CRON_SECRET"

# AI 기사 생성
curl -X GET "http://localhost:3000/api/cron/generate-articles" \
  -H "Authorization: Bearer $CRON_SECRET"

# 기사 발행
curl -X GET "http://localhost:3000/api/cron/publish-articles" \
  -H "Authorization: Bearer $CRON_SECRET"
```

---

## 비용 추정

| 항목           | 값                |
| -------------- | ----------------- |
| 모델           | Claude 3 Haiku    |
| 기사당 비용    | ~$0.004           |
| 일일 예산      | $2.00             |
| 일일 최대 기사 | ~30개 (6회 × 5개) |
| 월간 예상 비용 | ~$60              |
| 월간 예상 기사 | ~900개            |
