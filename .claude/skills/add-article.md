# Add Article Skill

수동으로 기사를 추가하거나 관리하는 워크플로우입니다.

## Trigger

- "기사 추가해줘", "add article"
- "새 글 작성", "write post"
- "수동 기사 등록", "manual article"

## Article Types

| 타입       | 설명                  | 자동화      |
| ---------- | --------------------- | ----------- |
| **Trend**  | 트렌드 감지 → AI 생성 | ✅ Cron Job |
| **Manual** | 직접 작성             | ❌ 수동     |

## Article Structure

```typescript
interface Article {
  slug: string; // URL용 고유 식별자

  // 이중 언어 콘텐츠
  title_ko: string;
  title_en: string;
  excerpt_ko: string; // 발췌문 (SEO용)
  excerpt_en: string;
  content_ko: string; // Markdown 본문
  content_en: string;

  // 분류
  category: ArticleCategory; // tech, business, lifestyle, etc.
  tags: string[];

  // SEO
  seo_keywords: string[];
  meta_title_ko: string;
  meta_title_en: string;
  meta_description_ko: string;
  meta_description_en: string;

  // SEO 확장 (리치 스니펫)
  faqs: ArticleFAQ[];
  key_takeaways_ko: string[];
  key_takeaways_en: string[];

  // 상태
  status: "draft" | "review" | "scheduled" | "published" | "archived";
  scheduled_at: string | null;
  published_at: string | null;
}
```

## Categories

```typescript
type ArticleCategory =
  | "tech" // 테크놀로지
  | "business" // 비즈니스
  | "lifestyle" // 라이프스타일
  | "entertainment" // 엔터테인먼트
  | "trending" // 트렌딩
  | "news"; // 뉴스
```

## Manual Article Workflow

### Step 1: Slug 생성

```typescript
// 규칙: 영어 소문자, 하이픈 구분
const slug = "how-to-use-ai-for-content-creation";

// 고유성 확인
const existing = await getArticleBySlug(slug);
if (existing) throw new Error("Slug already exists");
```

### Step 2: 콘텐츠 작성

```markdown
## 제목

- 한국어: 40자 이내, 핵심 키워드 포함
- 영어: 60자 이내, SEO 최적화

## 발췌문 (Excerpt)

- 한국어: 100-150자
- 영어: 150-160자 (Google 스니펫 최적화)

## 본문 (Content)

- Markdown 형식
- 1500-3000단어 권장
- H2, H3 헤딩 활용
- 코드 블록, 리스트 활용
```

### Step 3: SEO 메타데이터

```json
{
  "seo_keywords": ["AI", "content creation", "automation"],
  "meta_title_ko": "AI로 콘텐츠 만들기 - Web Toolkit",
  "meta_title_en": "How to Use AI for Content Creation - Web Toolkit",
  "meta_description_ko": "AI를 활용한 효율적인 콘텐츠 제작 방법을 알아보세요.",
  "meta_description_en": "Learn how to leverage AI for efficient content creation."
}
```

### Step 4: FAQ 추가 (리치 스니펫)

```typescript
const faqs: ArticleFAQ[] = [
  {
    question_ko: "AI 콘텐츠 생성의 장점은?",
    question_en: "What are the benefits of AI content generation?",
    answer_ko: "시간 절약, 일관성 유지, 대규모 생산이 가능합니다.",
    answer_en: "Time savings, consistency, and scalability.",
  },
];
```

### Step 5: 핵심 요약 추가

```typescript
const key_takeaways_ko = [
  "AI는 콘텐츠 초안 작성에 효과적",
  "인간 검토는 여전히 필수",
  "SEO 최적화 자동화 가능",
];

const key_takeaways_en = [
  "AI is effective for content drafting",
  "Human review is still essential",
  "SEO optimization can be automated",
];
```

### Step 6: 데이터베이스 삽입

```typescript
import { createClient } from "@/shared/lib/supabase/server";

const supabase = await createClient();

const { data, error } = await supabase
  .from("articles")
  .insert({
    slug: "how-to-use-ai-for-content-creation",
    title_ko: "AI로 콘텐츠 만들기",
    title_en: "How to Use AI for Content Creation",
    excerpt_ko: "AI를 활용한 콘텐츠 제작 가이드",
    excerpt_en: "A guide to creating content with AI",
    content_ko: "## 서론\n...",
    content_en: "## Introduction\n...",
    category: "tech",
    tags: ["ai", "content", "automation"],
    seo_keywords: ["AI content", "automation"],
    status: "draft",
    reading_time_minutes: 5,
    word_count_ko: 1500,
    word_count_en: 1200,
    ai_model: "manual",
    generation_cost_usd: 0,
  })
  .select()
  .single();
```

## Article Status Flow

```
draft → review → scheduled → published → archived
         ↑__________________________|
         (재발행 시)
```

### Status 변경

```typescript
// 초안 → 리뷰 요청
await supabase
  .from("articles")
  .update({ status: "review" })
  .eq("id", articleId);

// 예약 발행
await supabase
  .from("articles")
  .update({
    status: "scheduled",
    scheduled_at: new Date("2025-01-15T09:00:00Z").toISOString(),
  })
  .eq("id", articleId);

// 즉시 발행
await supabase
  .from("articles")
  .update({
    status: "published",
    published_at: new Date().toISOString(),
  })
  .eq("id", articleId);
```

## Supabase Studio 직접 입력

웹 UI로 기사 추가:

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 → Table Editor
3. `articles` 테이블 선택
4. "Insert" 버튼 클릭
5. 필드 입력 후 저장

## Reading Time 계산

```typescript
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

const reading_time_minutes = calculateReadingTime(content_ko);
const word_count_ko = content_ko.trim().split(/\s+/).length;
const word_count_en = content_en.trim().split(/\s+/).length;
```

## Checklist

```markdown
### 기사 추가 체크리스트

- [ ] 고유 slug 생성 및 검증
- [ ] 한국어/영어 제목 작성
- [ ] 한국어/영어 발췌문 작성
- [ ] 한국어/영어 본문 작성
- [ ] 카테고리 선택
- [ ] 태그 추가 (3-5개)
- [ ] SEO 키워드 설정
- [ ] 메타 제목/설명 작성
- [ ] FAQ 추가 (2-5개)
- [ ] 핵심 요약 추가 (3-5개)
- [ ] 읽기 시간/단어 수 계산
- [ ] 초안 저장 (status: draft)
- [ ] 리뷰 후 발행
```

## Quick SQL Insert

```sql
INSERT INTO articles (
  slug, title_ko, title_en,
  excerpt_ko, excerpt_en,
  content_ko, content_en,
  category, tags, seo_keywords,
  status, reading_time_minutes,
  word_count_ko, word_count_en,
  ai_model, generation_cost_usd
) VALUES (
  'my-new-article',
  '새 기사 제목',
  'My New Article Title',
  '기사 요약',
  'Article summary',
  '## 본문 내용',
  '## Content body',
  'tech',
  ARRAY['tag1', 'tag2'],
  ARRAY['keyword1', 'keyword2'],
  'draft',
  5,
  1000,
  800,
  'manual',
  0
);
```
