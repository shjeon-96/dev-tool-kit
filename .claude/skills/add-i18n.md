# Add i18n Translation Skill

번역을 추가하거나 관리하는 워크플로우입니다.

## Trigger

- "번역 추가해줘", "add translation"
- "i18n 업데이트", "다국어 지원 추가"
- 특정 페이지/기능의 번역 요청

## Supported Languages

| Code | Language          | File               |
| ---- | ----------------- | ------------------ |
| `en` | English (default) | `messages/en.json` |
| `ko` | 한국어            | `messages/ko.json` |

**참고:** 프로젝트는 2개 언어만 지원합니다 (`src/i18n/routing.ts`)

## Translation Structure

### Blog/Article Translations

```json
{
  "blog": {
    "title": "Blog",
    "description": "Latest articles and insights",
    "readMore": "Read more",
    "publishedAt": "Published on {date}",
    "readingTime": "{minutes} min read",
    "category": {
      "tech": "Technology",
      "business": "Business",
      "lifestyle": "Lifestyle",
      "entertainment": "Entertainment",
      "trending": "Trending",
      "news": "News"
    }
  }
}
```

### SEO Translations

```json
{
  "seo": {
    "home": {
      "title": "Web Toolkit - AI-Powered Trend Blog",
      "description": "Fresh insights on tech, business, and lifestyle trends powered by AI"
    },
    "blog": {
      "title": "Blog - Web Toolkit",
      "description": "Explore our latest articles"
    }
  }
}
```

### Common UI Translations

```json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "retry": "Try again",
    "share": "Share",
    "copy": "Copy",
    "copied": "Copied!",
    "viewAll": "View all"
  }
}
```

## Workflow

### Step 1: Identify Missing Translations

```bash
# 특정 키가 두 언어에 있는지 확인
grep -l "blog.title" messages/*.json
```

### Step 2: Add to Both Language Files

반드시 2개 파일 모두에 추가:

```bash
messages/en.json  # 먼저 작성 (기본 언어)
messages/ko.json  # 한국어 번역
```

### Step 3: Translation Guidelines

#### English (en.json) - Default Language

- Clear, concise, professional tone
- Use sentence case for titles
- Include keywords for SEO
- Example: "Fresh insights on technology trends"

#### Korean (ko.json)

- 존댓말 사용 (해요체)
- 기술 용어는 영어 그대로 유지 (AI, API 등)
- 자연스러운 한국어 표현 사용
- 예: "최신 기술 트렌드에 대한 인사이트"

## Usage in Code

### Client Components

```typescript
"use client";
import { useTranslations } from "next-intl";

export function ArticleCard() {
  const t = useTranslations("blog");
  return <span>{t("readMore")}</span>;
}
```

### Server Components

```typescript
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("blog");
  return <h1>{t("title")}</h1>;
}
```

### With Parameters

```json
{
  "publishedAt": "Published on {date}"
}
```

```typescript
t("publishedAt", { date: "Jan 10, 2025" });
```

### Pluralization

```json
{
  "articles": "{count, plural, =0 {No articles} one {# article} other {# articles}}"
}
```

```typescript
t("articles", { count: 5 }); // "5 articles"
```

## Trend Blog Specific Translations

### Category Labels

```json
{
  "category": {
    "tech": "Technology",
    "business": "Business",
    "lifestyle": "Lifestyle",
    "entertainment": "Entertainment",
    "trending": "Trending",
    "news": "News"
  }
}
```

### Article Metadata

```json
{
  "article": {
    "readingTime": "{minutes} min read",
    "author": "By {name}",
    "shareArticle": "Share this article",
    "relatedArticles": "Related Articles",
    "tableOfContents": "Table of Contents"
  }
}
```

### Subscription CTA

```json
{
  "subscription": {
    "title": "Stay Updated",
    "description": "Get the latest trends delivered to your inbox",
    "placeholder": "Enter your email",
    "button": "Subscribe",
    "success": "Thanks for subscribing!"
  }
}
```

## Validation

```bash
# 빌드로 누락된 키 확인
npm run build

# 개발 서버에서 직접 확인
npm run dev
# 각 언어로 페이지 접근: /en/..., /ko/...
```

## Common Pitfalls

1. **한쪽 언어만 추가** - 런타임에 키가 그대로 표시됨
2. **중첩 구조 불일치** - 파싱 에러
3. **JSON 문법 오류** - 쉼표 누락, 따옴표 오류
4. **SEO 키 누락** - 메타데이터에 키가 표시됨

## Batch Translation Template

새 기능 추가 시 필요한 번역 템플릿:

```json
{
  "featureName": {
    "title": "",
    "description": "",
    "action": "",
    "success": "",
    "error": ""
  },
  "seo": {
    "featureName": {
      "title": "",
      "description": ""
    }
  }
}
```

## Quick Add Script

두 언어 파일에 동일한 구조 추가:

```bash
# jq 사용 (설치: brew install jq)
for lang in en ko; do
  jq '.newFeature = {"title": "TODO", "description": "TODO"}' \
    messages/$lang.json > tmp.json && mv tmp.json messages/$lang.json
done
```

## Translation Comparison

두 언어 파일 간 키 차이 확인:

```bash
# 영어에만 있는 키
diff <(cat messages/en.json | jq -r 'paths | join(".")' | sort) \
     <(cat messages/ko.json | jq -r 'paths | join(".")' | sort)
```
