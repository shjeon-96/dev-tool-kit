# Feature Modules Details

## entities/

### trend/

트렌드 및 기사 엔티티

**Files:**

- `model/types.ts`: Trend, Article, ArticleCategory, ArticleStatus
- `model/queries.ts`: getPublishedArticles, getTrendingArticles, getArticleBySlug, getArticlesByCategory

**Key Types:**

```typescript
type ArticleCategory =
  | "tech"
  | "business"
  | "lifestyle"
  | "entertainment"
  | "trending"
  | "news";
type ArticleStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";
type TrendSource =
  | "google_trends"
  | "reddit"
  | "news_rss"
  | "twitter"
  | "manual";
```

### author/

E-E-A-T SEO를 위한 저자 프로필

**Files:**

- `model/types.ts`: Author, LocalizedAuthor, SocialProfiles
- `model/queries.ts`: getAuthorBySlug, getAllAuthors

**Key Features:**

- 다국어 이름/바이오 (ko, en)
- AI 생성 저자 표시
- 소셜 프로필 (JSON-LD sameAs용)
- 자격증/전문 분야 태그

### subscription/

구독 및 결제 정보

**Files:**

- `model/types.ts`: Subscription, SubscriptionStatus
- `model/queries.ts`: getUserSubscription
- `lib/`: 구독 유틸리티
- `ui/`: 구독 관련 UI

---

## features/

### auth/

Supabase 기반 인증

**Structure:**

```
auth/
├── model/use-auth.ts      # 인증 상태 Hook
└── ui/
    ├── SignInForm.tsx     # 로그인 폼
    ├── SignUpForm.tsx     # 회원가입 폼
    └── AuthButton.tsx     # 인증 버튼
```

**Capabilities:**

- 이메일/비밀번호 인증
- OAuth 소셜 로그인
- 세션 관리
- 프로필 관리

### billing/

LemonSqueezy 결제 통합

**Structure:**

```
billing/
├── model/use-subscription.ts   # 구독 상태 Hook
└── ui/
    ├── PricingCard.tsx         # 가격 카드
    ├── BillingPortal.tsx       # 결제 포털
    └── SubscriptionStatus.tsx  # 구독 상태
```

**Capabilities:**

- 구독 플랜 선택
- 결제 처리 (Checkout)
- 구독 취소/재개
- 웹훅 처리

---

## lib/

### trend-detector/

트렌드 수집 시스템

**Sources:**

- Google Trends API
- RSS 피드 파서
- 뉴스 API

**Output:** Trend 엔티티 → trends 테이블

### web-search/

RAG 기반 웹 검색

**Provider:** Tavily API

**Types:**

```typescript
interface SearchResult {
  url: string;
  title: string;
  content: string;
  score?: number;
  publishedDate?: string;
}

interface WebSearchOptions {
  maxResults?: number;
  searchDepth?: "basic" | "advanced";
  topic?: "general" | "news";
}
```

### content-generator/

Claude AI 콘텐츠 생성

**Output:**

```typescript
interface GeneratedContent {
  title_ko: string;
  title_en: string;
  content_ko: string;
  content_en: string;
  excerpt_ko: string;
  excerpt_en: string;
  tags: string[];
  seo_keywords: string[];
  faqs?: ArticleFAQ[];
  key_takeaways_ko?: string[];
  key_takeaways_en?: string[];
}
```

**Prompts:** `prompts/` 디렉토리에 Claude 프롬프트 정의

---

## widgets/

### header/

- 로고, 네비게이션
- 언어 전환 (en/ko)
- 사용자 메뉴 통합

### footer/

- 사이트 링크
- 소셜 미디어
- 저작권 정보

### sidebar/

- 카테고리 목록
- 인기 기사
- 관련 기사

### user-menu/

- 프로필 표시
- 대시보드 링크
- 로그아웃

### ad-unit/

- Google AdSense 통합
- 반응형 광고 유닛
- AD_SLOTS 설정 기반
