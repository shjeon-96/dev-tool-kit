# SEO Optimization Skill

SEO 최적화 워크플로우입니다.

## Trigger

- "SEO", "검색 최적화"
- "메타 태그", "meta tags"
- "JSON-LD", "구조화 데이터"
- "sitemap", "사이트맵"

## SEO 체크리스트

### 기본 메타 태그

```typescript
// src/app/[locale]/[category]/[slug]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);

  const title = locale === "ko" ? article.title_ko : article.title_en;
  const description =
    locale === "ko" ? article.meta_description_ko : article.meta_description_en;

  return {
    title,
    description,
    keywords: article.seo_keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at,
      authors: ["Web Toolkit"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://web-toolkit.app/${locale}/${article.category}/${slug}`,
      languages: {
        en: `/en/${article.category}/${slug}`,
        ko: `/ko/${article.category}/${slug}`,
      },
    },
  };
}
```

### JSON-LD 구조화 데이터

```typescript
// src/shared/ui/json-ld.tsx
import Script from "next/script";

interface ArticleJsonLdProps {
  article: Article;
  locale: string;
}

export function ArticleJsonLd({ article, locale }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "ko" ? article.title_ko : article.title_en,
    description: locale === "ko" ? article.excerpt_ko : article.excerpt_en,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Organization",
      name: "Web Toolkit",
    },
    publisher: {
      "@type": "Organization",
      name: "Web Toolkit",
      logo: {
        "@type": "ImageObject",
        url: "https://web-toolkit.app/logo.png",
      },
    },
  };

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### FAQ 구조화 데이터

```typescript
export function FaqJsonLd({ faqs }: { faqs: ArticleFAQ[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question_en,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer_en,
      },
    })),
  };

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### 저자 E-E-A-T

```typescript
export function AuthorJsonLd({ author }: { author: Author }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name_en,
    description: author.bio_en,
    jobTitle: author.credentials?.[0],
    sameAs: Object.values(author.social_profiles || {}),
  };

  return (
    <Script
      id="author-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

## Sitemap

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getPublishedArticles } from "@/entities/trend/model/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();
  const locales = ["en", "ko"];

  const articleUrls = articles.flatMap((article) =>
    locales.map((locale) => ({
      url: `https://web-toolkit.app/${locale}/${article.category}/${article.slug}`,
      lastModified: article.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const staticPages = [
    { url: "https://web-toolkit.app", priority: 1.0 },
    { url: "https://web-toolkit.app/en", priority: 1.0 },
    { url: "https://web-toolkit.app/ko", priority: 1.0 },
    { url: "https://web-toolkit.app/en/blog", priority: 0.9 },
    { url: "https://web-toolkit.app/ko/blog", priority: 0.9 },
  ];

  return [...staticPages, ...articleUrls];
}
```

## Robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/"],
    },
    sitemap: "https://web-toolkit.app/sitemap.xml",
  };
}
```

## SEO 컴포넌트 사용

```typescript
// 페이지에서 사용
import { ArticleJsonLd, FaqJsonLd, AuthorJsonLd } from "@/shared/ui";

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  return (
    <>
      <ArticleJsonLd article={article} locale={params.locale} />
      {article.faqs && <FaqJsonLd faqs={article.faqs} />}
      {article.author && <AuthorJsonLd author={article.author} />}

      <article>
        {/* 콘텐츠 */}
      </article>
    </>
  );
}
```

## SEO 검증

### Google 도구

```bash
# 구조화 데이터 테스트
https://search.google.com/test/rich-results

# 모바일 친화성 테스트
https://search.google.com/test/mobile-friendly

# PageSpeed Insights
https://pagespeed.web.dev/
```

### 메타 태그 확인

```bash
# 브라우저에서 확인
view-source:https://web-toolkit.app/en/tech/article-slug

# curl로 확인
curl -s https://web-toolkit.app/en/tech/article-slug | grep -E "<meta|<title"
```

## SEO 최적화 체크리스트

```markdown
### 페이지별 SEO 체크리스트

- [ ] title 태그 (50-60자)
- [ ] meta description (150-160자)
- [ ] Open Graph 태그
- [ ] Twitter Card 태그
- [ ] canonical URL
- [ ] hreflang (다국어)
- [ ] JSON-LD 구조화 데이터
- [ ] 이미지 alt 텍스트
- [ ] 적절한 heading 구조 (H1 → H2 → H3)
```

```markdown
### 전체 사이트 SEO 체크리스트

- [ ] sitemap.xml 생성
- [ ] robots.txt 설정
- [ ] SSL (HTTPS)
- [ ] 모바일 반응형
- [ ] Core Web Vitals 최적화
- [ ] 404 페이지
- [ ] 301 리다이렉트 (필요시)
```

## 바이브 코딩 팁

```bash
# 빌드 후 sitemap 확인
npm run build
cat .next/server/app/sitemap.xml

# 로컬에서 메타 태그 확인
npm run dev
# http://localhost:3000 → 페이지 소스 보기
```
