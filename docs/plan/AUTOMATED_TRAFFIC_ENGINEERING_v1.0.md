# 자동화된 트래픽 엔지니어링 계획서 v1.0

> 바이브 코딩 시대의 트래픽 자동화 전략: pSEO, 데이터 파이프라인, 도구 엔지니어링

**작성일**: 2025-12-23
**버전**: 1.0
**목표**: 콘텐츠 작성 없이 자동화된 시스템으로 월간 100K+ 방문자 달성

---

## 목차

1. [현황 분석 및 전략 개요](#1-현황-분석-및-전략-개요)
2. [Phase 1: 프로그래매틱 SEO 확장](#2-phase-1-프로그래매틱-seo-확장)
3. [Phase 2: 데이터 애그리게이션 파이프라인](#3-phase-2-데이터-애그리게이션-파이프라인)
4. [Phase 3: 도구 엔지니어링 - 확장 프로그램](#4-phase-3-도구-엔지니어링---확장-프로그램)
5. [기술 인프라 아키텍처](#5-기술-인프라-아키텍처)
6. [실행 로드맵 및 KPI](#6-실행-로드맵-및-kpi)

---

## 1. 현황 분석 및 전략 개요

### 1.1 핵심 패러다임 전환

```
기존 방식: 인간 → 콘텐츠 작성 → 트래픽
새로운 방식: 시스템 설계 → 자동 생성 → 트래픽 × N
```

**트래픽 자동화 3축 전략:**

| 축                    | 방법론                                | 목표                     |
| --------------------- | ------------------------------------- | ------------------------ |
| **pSEO**              | 템플릿 + 데이터 = 수만 개 랜딩 페이지 | 롱테일 키워드 장악       |
| **데이터 파이프라인** | 외부 데이터 수집 → 큐레이션 콘텐츠    | 신선한 콘텐츠 자동 공급  |
| **도구 엔지니어링**   | 브라우저/IDE 확장 프로그램            | 작업 환경 내 트래픽 유입 |

### 1.2 현재 구현 상태 분석

#### ✅ 이미 구현된 pSEO 페이지

| 경로 패턴             | 현재 상태 | 예상 페이지 수 |
| --------------------- | --------- | -------------- |
| `/resize-to/[target]` | ✅ 구현됨 | ~50개          |
| `/convert/[slug]`     | ✅ 구현됨 | ~30개          |
| `/compare/[slug]`     | ✅ 구현됨 | ~20개          |
| `/use-cases/[slug]`   | ✅ 구현됨 | ~15개          |
| `/guides/[slug]`      | ✅ 구현됨 | 31개           |

#### ✅ Chrome Extension 현황

```
extension/
├── background.ts     # 컨텍스트 메뉴 (7개 도구 연동)
├── popup.tsx         # 팝업 UI (6개 Quick Tools)
└── build/            # Manifest V3 준수 빌드
```

**현재 기능:**

- 텍스트 선택 → 우클릭 → 도구로 이동
- 팝업에서 Quick Tools 접근
- 최근 사용 도구 추적

---

## 2. Phase 1: 프로그래매틱 SEO 확장

### 2.1 대규모 페이지 생성 전략

#### 2.1.1 신규 pSEO 페이지 카테고리

```
예상 신규 페이지 생성량: ~5,000개

1. 변환 매트릭스 (Cross-conversion)
   /convert/json-to-csv
   /convert/json-to-xml
   /convert/json-to-yaml
   /convert/xml-to-json
   /convert/csv-to-json
   ... (모든 포맷 조합 ~100개)

2. 이미지 타겟 확장
   /resize-to/passport-photo-35x45mm
   /resize-to/instagram-story-1080x1920
   /resize-to/youtube-thumbnail-1280x720
   /resize-to/linkedin-banner-1584x396
   ... (소셜/플랫폼별 ~200개)

3. 해시 타입별 페이지
   /hash/md5-generator
   /hash/sha256-generator
   /hash/bcrypt-generator
   /hash/file-checksum-md5
   ... (~50개)

4. 인코딩/디코딩 매트릭스
   /encode/url-encode-online
   /decode/base64-decode-online
   /encode/html-entities-encode
   ... (~80개)

5. 지역화 롱테일 (국가별)
   /[locale]/tools/[tool]/for-[country]
   예: /ko/tools/json-formatter/for-korea
   ... (40개 도구 × 10개 주요국가 = ~400개)
```

#### 2.1.2 빌드 최적화 전략

```typescript
// 하이브리드 렌더링 전략
// src/app/[locale]/convert/[slug]/page.tsx

export async function generateStaticParams() {
  // 빌드 시: 상위 30개 조합만 정적 생성
  const topConversions = await getTop30ConversionPairs();
  const locales = ["en", "ko", "ja"];

  return locales.flatMap((locale) =>
    topConversions.map((conversion) => ({
      locale,
      slug: conversion.slug,
    })),
  );
}

// 나머지 ~70개 조합은 On-demand 생성
export const dynamicParams = true; // 기본값

// ISR: 7일마다 재생성 (검색 트렌드 반영)
export const revalidate = 604800;
```

**빌드 시간 최적화 비교:**

| 전략                      | 빌드 시 생성 | 첫 요청 지연 | 빌드 시간 |
| ------------------------- | ------------ | ------------ | --------- |
| Full Static (모든 페이지) | 5,000개      | 없음         | ~50분     |
| **Hybrid (추천)**         | 500개 (10%)  | 1-2초        | ~5분      |
| On-demand Only            | 0개          | 1-2초        | ~30초     |

### 2.2 내부 링크 그래프 자동화

#### 2.2.1 동적 내부 링크 컴포넌트

```typescript
// src/shared/ui/internal-links.tsx

interface InternalLinksProps {
  currentSlug: string;
  category: string;
}

export function InternalLinks({ currentSlug, category }: InternalLinksProps) {
  // 1. 동일 카테고리 관련 페이지
  const relatedTools = getRelatedToolsByCategory(category, 6);

  // 2. 연관 변환 도구 (JSON 도구면 JSON→CSV, JSON→XML 등)
  const relatedConversions = getConversionsInvolvingFormat(
    extractFormat(currentSlug),
    4
  );

  // 3. 인기 가이드 (같은 주제)
  const relatedGuides = getGuidesByTopic(category, 3);

  return (
    <nav className="internal-links">
      <section>
        <h3>Related Tools</h3>
        {relatedTools.map(tool => (
          <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
        ))}
      </section>

      <section>
        <h3>Format Conversions</h3>
        {relatedConversions.map(conv => (
          <Link href={`/convert/${conv.slug}`}>{conv.name}</Link>
        ))}
      </section>

      <section>
        <h3>Learn More</h3>
        {relatedGuides.map(guide => (
          <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
        ))}
      </section>
    </nav>
  );
}
```

#### 2.2.2 동적 브레드크럼 생성

```typescript
// src/shared/ui/dynamic-breadcrumb.tsx

export function DynamicBreadcrumb({ segments }: { segments: string[] }) {
  const breadcrumbs = segments.map((segment, index) => ({
    name: formatSegmentName(segment),
    url: `/${segments.slice(0, index + 1).join("/")}`,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, ...breadcrumbs]} />
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/">Home</Link></li>
          {breadcrumbs.map((crumb, i) => (
            <li key={i}>
              <span className="mx-2">/</span>
              <Link href={crumb.url}>{crumb.name}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

### 2.3 대규모 사이트맵 전략

#### 2.3.1 사이트맵 분할 설정

```javascript
// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://web-toolkit.app",
  generateRobotsTxt: true,
  sitemapSize: 5000, // Google 권장: 50,000개 미만

  exclude: ["/api/*", "/admin/*", "/server-sitemap.xml"],

  robotsTxtOptions: {
    additionalSitemaps: [
      "https://web-toolkit.app/server-sitemap.xml", // 동적 페이지용
    ],
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
      { userAgent: "GPTBot", disallow: "/" }, // AI 크롤러 차단 (선택)
    ],
  },

  // 페이지별 우선순위 설정
  transform: async (config, path) => {
    // 도구 페이지: 높은 우선순위
    if (path.includes("/tools/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // pSEO 페이지: 중간 우선순위
    if (path.includes("/resize-to/") || path.includes("/convert/")) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: "monthly",
      priority: 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};
```

#### 2.3.2 서버 사이드 동적 사이트맵

```typescript
// src/app/server-sitemap.xml/route.ts

import { getServerSideSitemap } from "next-sitemap";
import { getAllDynamicUrls } from "@/lib/sitemap-utils";

export async function GET() {
  // 데이터베이스에서 동적 URL 조회
  const dynamicUrls = await getAllDynamicUrls();

  const fields = dynamicUrls.map((url) => ({
    loc: `https://web-toolkit.app${url.path}`,
    lastmod: url.updatedAt.toISOString(),
    changefreq: "daily" as const,
    priority: 0.7,
  }));

  return getServerSideSitemap(fields);
}
```

---

## 3. Phase 2: 데이터 애그리게이션 파이프라인

### 3.1 데이터 소스 및 수집 전략

#### 3.1.1 타겟 데이터 소스

| 소스            | 데이터 유형        | 활용 방안                        | API/방법   |
| --------------- | ------------------ | -------------------------------- | ---------- |
| GitHub Trending | 인기 리포지토리    | "오늘의 인기 개발 도구" 큐레이션 | 비공식 API |
| Reddit          | 서브레딧 트렌드    | 개발자 질문/이슈 트렌드 분석     | RSS 피드   |
| npm Registry    | 패키지 다운로드 수 | "이번 주 인기 npm 패키지"        | 공식 API   |
| Stack Overflow  | 태그별 질문 수     | "가장 많이 묻는 JSON 질문"       | 공식 API   |
| Product Hunt    | 새로운 개발자 도구 | 도구 트렌드 큐레이션             | 공식 API   |

#### 3.1.2 Reddit RSS 파이프라인 구현

```typescript
// src/lib/data-pipeline/reddit-collector.ts

import Parser from "rss-parser";

const parser = new Parser();

interface RedditPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
}

const SUBREDDIT_CONFIG = {
  programming: {
    url: "https://www.reddit.com/r/programming/top.rss?t=week",
    relevantKeywords: ["json", "api", "convert", "format", "encode", "decode"],
  },
  webdev: {
    url: "https://www.reddit.com/r/webdev/top.rss?t=week",
    relevantKeywords: ["tool", "utility", "developer", "productivity"],
  },
  javascript: {
    url: "https://www.reddit.com/r/javascript/top.rss?t=week",
    relevantKeywords: ["json", "typescript", "npm", "package"],
  },
};

export async function collectRedditTrends(): Promise<RedditPost[]> {
  const allPosts: RedditPost[] = [];

  for (const [subreddit, config] of Object.entries(SUBREDDIT_CONFIG)) {
    try {
      const feed = await parser.parseURL(config.url);

      const relevantPosts = feed.items
        .filter((item) =>
          config.relevantKeywords.some(
            (keyword) =>
              item.title?.toLowerCase().includes(keyword) ||
              item.content?.toLowerCase().includes(keyword),
          ),
        )
        .slice(0, 10)
        .map((item) => ({
          title: item.title || "",
          link: item.link || "",
          pubDate: item.pubDate || "",
          author: item.creator || "unknown",
          content: item.contentSnippet || "",
          subreddit,
        }));

      allPosts.push(...relevantPosts);

      // Rate limiting: 2초 대기
      await sleep(2000);
    } catch (error) {
      console.error(`Reddit ${subreddit} 수집 실패:`, error);
      // 실패해도 다른 서브레딧 계속 수집
    }
  }

  return allPosts;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

#### 3.1.3 GitHub Trending 파이프라인

```typescript
// src/lib/data-pipeline/github-collector.ts

interface TrendingRepo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  todayStars: number;
}

// 비공식 API 활용 (github-trending-api 또는 직접 스크래핑)
const GITHUB_TRENDING_API = "https://api.gitterapp.com/repositories";

export async function collectGitHubTrending(
  language?: string,
  since: "daily" | "weekly" | "monthly" = "daily",
): Promise<TrendingRepo[]> {
  try {
    const params = new URLSearchParams();
    if (language) params.set("language", language);
    params.set("since", since);

    const response = await fetch(`${GITHUB_TRENDING_API}?${params}`, {
      headers: {
        "User-Agent": "WebToolkit-Bot/1.0",
      },
      // 30초 타임아웃
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`GitHub API 응답 오류: ${response.status}`);
    }

    const data = await response.json();

    return data.map((repo: any) => ({
      name: repo.name,
      fullName: repo.fullName,
      description: repo.description || "",
      url: repo.url,
      stars: repo.stars,
      forks: repo.forks,
      language: repo.language || "Unknown",
      todayStars: repo.currentPeriodStars || 0,
    }));
  } catch (error) {
    console.error("GitHub Trending 수집 실패:", error);
    return [];
  }
}

// 개발자 도구 카테고리 필터링
export function filterDeveloperTools(repos: TrendingRepo[]): TrendingRepo[] {
  const toolKeywords = [
    "tool",
    "cli",
    "utility",
    "converter",
    "formatter",
    "generator",
    "validator",
    "encoder",
    "decoder",
  ];

  return repos.filter((repo) => {
    const searchText = `${repo.name} ${repo.description}`.toLowerCase();
    return toolKeywords.some((keyword) => searchText.includes(keyword));
  });
}
```

### 3.2 자동 큐레이션 콘텐츠 생성

#### 3.2.1 트렌드 리포트 자동 생성

```typescript
// src/lib/data-pipeline/trend-report-generator.ts

import {
  collectGitHubTrending,
  filterDeveloperTools,
} from "./github-collector";
import { collectRedditTrends } from "./reddit-collector";

interface WeeklyTrendReport {
  week: string;
  generatedAt: Date;
  githubTrending: {
    overall: TrendingRepo[];
    byLanguage: Record<string, TrendingRepo[]>;
    developerTools: TrendingRepo[];
  };
  redditDiscussions: {
    topPosts: RedditPost[];
    emergingTopics: string[];
  };
}

export async function generateWeeklyTrendReport(): Promise<WeeklyTrendReport> {
  const languages = ["javascript", "typescript", "python", "go", "rust"];

  // 병렬 수집
  const [overall, ...byLanguageResults] = await Promise.all([
    collectGitHubTrending(undefined, "weekly"),
    ...languages.map((lang) => collectGitHubTrending(lang, "weekly")),
  ]);

  const byLanguage: Record<string, TrendingRepo[]> = {};
  languages.forEach((lang, i) => {
    byLanguage[lang] = byLanguageResults[i];
  });

  const redditPosts = await collectRedditTrends();
  const emergingTopics = extractEmergingTopics(redditPosts);

  return {
    week: getWeekString(),
    generatedAt: new Date(),
    githubTrending: {
      overall: overall.slice(0, 25),
      byLanguage,
      developerTools: filterDeveloperTools(overall).slice(0, 10),
    },
    redditDiscussions: {
      topPosts: redditPosts.slice(0, 20),
      emergingTopics,
    },
  };
}

function getWeekString(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(
    ((now.getTime() - startOfYear.getTime()) / 86400000 +
      startOfYear.getDay() +
      1) /
      7,
  );
  return `${now.getFullYear()}-W${weekNum.toString().padStart(2, "0")}`;
}

function extractEmergingTopics(posts: RedditPost[]): string[] {
  // 단순 키워드 빈도 분석 (실제로는 NLP 적용 권장)
  const wordFrequency: Record<string, number> = {};

  posts.forEach((post) => {
    const words = `${post.title} ${post.content}`
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word.length > 3);

    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  });

  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}
```

#### 3.2.2 자동 생성 페이지 템플릿

```typescript
// src/app/[locale]/trends/[week]/page.tsx

import { getTrendReport } from '@/lib/data-pipeline';

interface PageProps {
  params: Promise<{ locale: string; week: string }>;
}

export async function generateStaticParams() {
  // 최근 12주 리포트만 정적 생성
  const weeks = getLastNWeeks(12);
  const locales = ['en', 'ko', 'ja'];

  return locales.flatMap(locale =>
    weeks.map(week => ({ locale, week }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, week } = await params;

  return {
    title: `Developer Trends - ${week} | Web Toolkit`,
    description: `Weekly developer trends report for ${week}. Top GitHub repositories, trending tools, and community discussions.`,
  };
}

export default async function TrendReportPage({ params }: PageProps) {
  const { locale, week } = await params;
  const report = await getTrendReport(week);

  if (!report) {
    notFound();
  }

  return (
    <main className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Developer Trends: {week}
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Trending on GitHub
        </h2>
        <div className="grid gap-4">
          {report.githubTrending.overall.slice(0, 10).map(repo => (
            <RepoCard key={repo.fullName} repo={repo} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Developer Tools of the Week
        </h2>
        <div className="grid gap-4">
          {report.githubTrending.developerTools.map(repo => (
            <ToolCard key={repo.fullName} repo={repo} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Hot Discussions
        </h2>
        {report.redditDiscussions.topPosts.slice(0, 10).map(post => (
          <DiscussionCard key={post.link} post={post} />
        ))}
      </section>

      {/* 내부 링크: 관련 도구 추천 */}
      <RelatedToolsSection topics={report.redditDiscussions.emergingTopics} />
    </main>
  );
}
```

### 3.3 스케줄러 및 자동화

```typescript
// scripts/scheduled-tasks.ts
// Vercel Cron 또는 GitHub Actions로 실행

import { generateWeeklyTrendReport } from "@/lib/data-pipeline";
import { saveTrendReport } from "@/lib/database";

async function weeklyTrendCollection() {
  console.log("Weekly trend collection started:", new Date().toISOString());

  try {
    const report = await generateWeeklyTrendReport();
    await saveTrendReport(report);

    // ISR 재생성 트리거
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.REVALIDATE_SECRET}` },
      body: JSON.stringify({ path: `/trends/${report.week}` }),
    });

    console.log("Weekly trend report generated:", report.week);
  } catch (error) {
    console.error("Trend collection failed:", error);
    // 에러 알림 (Slack, Discord 등)
  }
}

// Vercel Cron: 매주 일요일 자정 실행
// vercel.json: { "crons": [{ "path": "/api/cron/trends", "schedule": "0 0 * * 0" }] }
```

---

## 4. Phase 3: 도구 엔지니어링 - 확장 프로그램

### 4.1 Chrome Extension 고도화

#### 4.1.1 현재 상태 → 목표 상태

| 기능          | 현재          | 목표                       |
| ------------- | ------------- | -------------------------- |
| 컨텍스트 메뉴 | 7개 도구 연동 | 15+ 도구 + 카테고리 메뉴   |
| 팝업          | 단순 링크     | 인라인 미니 도구 (Preview) |
| 검색          | 없음          | Omnibox 통합               |
| 단축키        | 없음          | 전역 단축키 지원           |
| 오프라인      | 미지원        | Service Worker 캐싱        |

#### 4.1.2 인라인 미니 도구 구현

```typescript
// extension/popup.tsx (고도화)

import { useState, useEffect } from 'react';

// 인라인 실행 가능한 도구
const INLINE_TOOLS = {
  'base64-encode': {
    name: 'Base64 Encode',
    execute: (input: string) => btoa(unescape(encodeURIComponent(input))),
  },
  'base64-decode': {
    name: 'Base64 Decode',
    execute: (input: string) => decodeURIComponent(escape(atob(input))),
  },
  'url-encode': {
    name: 'URL Encode',
    execute: (input: string) => encodeURIComponent(input),
  },
  'url-decode': {
    name: 'URL Decode',
    execute: (input: string) => decodeURIComponent(input),
  },
  'json-minify': {
    name: 'JSON Minify',
    execute: (input: string) => JSON.stringify(JSON.parse(input)),
  },
  'json-beautify': {
    name: 'JSON Beautify',
    execute: (input: string) => JSON.stringify(JSON.parse(input), null, 2),
  },
};

function MiniToolPanel({ selectedText }: { selectedText: string }) {
  const [input, setInput] = useState(selectedText);
  const [output, setOutput] = useState('');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const executeTool = (toolId: string) => {
    try {
      const tool = INLINE_TOOLS[toolId as keyof typeof INLINE_TOOLS];
      const result = tool.execute(input);
      setOutput(result);
      setActiveTool(toolId);
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="mini-tool-panel">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to process..."
        rows={3}
      />

      <div className="tool-buttons">
        {Object.entries(INLINE_TOOLS).map(([id, tool]) => (
          <button
            key={id}
            onClick={() => executeTool(id)}
            className={activeTool === id ? 'active' : ''}
          >
            {tool.name}
          </button>
        ))}
      </div>

      {output && (
        <div className="output-section">
          <textarea value={output} readOnly rows={3} />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </div>
  );
}
```

#### 4.1.3 Omnibox 검색 통합

```typescript
// extension/background.ts (추가)

// Omnibox 설정
chrome.omnibox.setDefaultSuggestion({
  description: "Search DevToolkit tools: <match>%s</match>",
});

// 검색어 입력 시 제안
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  const suggestions = searchTools(text).map((tool) => ({
    content: tool.slug,
    description: `<match>${tool.name}</match> - ${tool.description}`,
  }));
  suggest(suggestions);
});

// 선택 시 도구 페이지로 이동
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  const url = `${BASE_URL}/${text}`;

  switch (disposition) {
    case "currentTab":
      chrome.tabs.update({ url });
      break;
    case "newForegroundTab":
      chrome.tabs.create({ url });
      break;
    case "newBackgroundTab":
      chrome.tabs.create({ url, active: false });
      break;
  }
});

function searchTools(query: string) {
  const normalizedQuery = query.toLowerCase();
  return ALL_TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.slug.includes(normalizedQuery) ||
      tool.keywords?.some((k) => k.includes(normalizedQuery)),
  ).slice(0, 5);
}
```

#### 4.1.4 manifest.json 업데이트

```json
{
  "manifest_version": 3,
  "name": "DevToolkit - Developer Tools",
  "version": "1.0.0",
  "description": "40+ developer tools at your fingertips. JSON, Base64, Hash, UUID, and more.",

  "permissions": ["contextMenus", "activeTab", "storage", "clipboardWrite"],

  "optional_permissions": ["tabs"],

  "background": {
    "service_worker": "background.js"
  },

  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },

  "omnibox": {
    "keyword": "dt"
  },

  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+D",
        "mac": "Command+Shift+D"
      },
      "description": "Open DevToolkit popup"
    },
    "quick-json": {
      "suggested_key": {
        "default": "Ctrl+Shift+J",
        "mac": "Command+Shift+J"
      },
      "description": "Format selected JSON"
    }
  },

  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

### 4.2 VS Code Extension 신규 개발

#### 4.2.1 핵심 기능 설계

```
VS Code Extension 기능 목록:

1. package.json 분석
   - 의존성 취약점 검사
   - 라이선스 호환성 체크
   - 버전 업데이트 알림

2. 코드 내 즉시 변환
   - JSON 포맷팅 (선택 영역)
   - Base64 인코딩/디코딩
   - 문자열 → RegExp 변환

3. 사이드바 웹뷰
   - 웹 도구 내장 (Webview)
   - 오프라인 지원

4. 컨텍스트 메뉴
   - "Open in DevToolkit" 옵션
   - 파일 타입별 추천 도구
```

#### 4.2.2 package.json 컨텍스트 메뉴

```typescript
// vscode-extension/src/extension.ts

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // package.json 분석 명령어
  const analyzePackageCmd = vscode.commands.registerCommand(
    "devtoolkit.analyzePackage",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const document = editor.document;
      if (!document.fileName.endsWith("package.json")) {
        vscode.window.showWarningMessage("Please open a package.json file");
        return;
      }

      try {
        const packageJson = JSON.parse(document.getText());
        const dependencies = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
        };

        // 웹 도구로 분석 데이터 전송
        const encodedData = encodeURIComponent(JSON.stringify(dependencies));
        const url = `https://web-toolkit.app/tools/package-analyzer?deps=${encodedData}`;

        vscode.env.openExternal(vscode.Uri.parse(url));
      } catch (error) {
        vscode.window.showErrorMessage("Failed to parse package.json");
      }
    },
  );

  // 컨텍스트 메뉴 등록
  context.subscriptions.push(analyzePackageCmd);

  // 선택 텍스트 변환 명령어들
  registerTextTransformCommands(context);
}

function registerTextTransformCommands(context: vscode.ExtensionContext) {
  const transformCommands = [
    {
      command: "devtoolkit.formatJson",
      transform: (text: string) => JSON.stringify(JSON.parse(text), null, 2),
    },
    {
      command: "devtoolkit.minifyJson",
      transform: (text: string) => JSON.stringify(JSON.parse(text)),
    },
    {
      command: "devtoolkit.base64Encode",
      transform: (text: string) => Buffer.from(text).toString("base64"),
    },
    {
      command: "devtoolkit.base64Decode",
      transform: (text: string) =>
        Buffer.from(text, "base64").toString("utf-8"),
    },
  ];

  transformCommands.forEach(({ command, transform }) => {
    const cmd = vscode.commands.registerCommand(command, () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      if (!text) {
        vscode.window.showWarningMessage("Please select text first");
        return;
      }

      try {
        const result = transform(text);
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, result);
        });
      } catch (error) {
        vscode.window.showErrorMessage(
          `Transform failed: ${(error as Error).message}`,
        );
      }
    });

    context.subscriptions.push(cmd);
  });
}
```

#### 4.2.3 package.json (VS Code Extension)

```json
{
  "name": "devtoolkit-vscode",
  "displayName": "DevToolkit",
  "description": "Developer tools for VS Code - JSON, Base64, Hash, and more",
  "version": "1.0.0",
  "publisher": "web-toolkit",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": ["Formatters", "Other"],
  "activationEvents": ["onLanguage:json", "onCommand:devtoolkit.*"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "devtoolkit.analyzePackage",
        "title": "Analyze Dependencies",
        "category": "DevToolkit"
      },
      {
        "command": "devtoolkit.formatJson",
        "title": "Format JSON",
        "category": "DevToolkit"
      },
      {
        "command": "devtoolkit.minifyJson",
        "title": "Minify JSON",
        "category": "DevToolkit"
      },
      {
        "command": "devtoolkit.base64Encode",
        "title": "Base64 Encode",
        "category": "DevToolkit"
      },
      {
        "command": "devtoolkit.base64Decode",
        "title": "Base64 Decode",
        "category": "DevToolkit"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "when": "resourceFilename == package.json",
          "command": "devtoolkit.analyzePackage",
          "group": "devtoolkit"
        }
      ],
      "editor/context": [
        {
          "when": "editorHasSelection",
          "command": "devtoolkit.formatJson",
          "group": "devtoolkit@1"
        },
        {
          "when": "editorHasSelection",
          "command": "devtoolkit.base64Encode",
          "group": "devtoolkit@2"
        },
        {
          "when": "editorHasSelection",
          "command": "devtoolkit.base64Decode",
          "group": "devtoolkit@3"
        }
      ]
    },
    "keybindings": [
      {
        "command": "devtoolkit.formatJson",
        "key": "ctrl+alt+j",
        "mac": "cmd+alt+j",
        "when": "editorHasSelection"
      }
    ]
  }
}
```

---

## 5. 기술 인프라 아키텍처

### 5.1 에러 핸들링 매트릭스

#### 5.1.1 Node.js 시스템 에러 대응

```typescript
// src/lib/error-handling/system-errors.ts

import { constants } from "os";

interface ErrorRecoveryStrategy {
  shouldRetry: boolean;
  retryDelay: number;
  maxRetries: number;
  fallbackAction?: () => Promise<void>;
}

const ERROR_STRATEGIES: Record<string, ErrorRecoveryStrategy> = {
  // 연결 끊김 - 지수 백오프로 재시도
  ECONNRESET: {
    shouldRetry: true,
    retryDelay: 1000,
    maxRetries: 3,
  },
  // 타임아웃 - 더 긴 간격으로 재시도
  ETIMEDOUT: {
    shouldRetry: true,
    retryDelay: 5000,
    maxRetries: 2,
  },
  // 권한 없음 - 재시도 불가
  EACCES: {
    shouldRetry: false,
    retryDelay: 0,
    maxRetries: 0,
  },
  // 파일 없음 - 재시도 불가
  ENOENT: {
    shouldRetry: false,
    retryDelay: 0,
    maxRetries: 0,
  },
  // 파일 핸들 초과 - 잠시 대기 후 재시도
  EMFILE: {
    shouldRetry: true,
    retryDelay: 10000,
    maxRetries: 5,
  },
};

export async function withErrorRecovery<T>(
  operation: () => Promise<T>,
  operationName: string,
): Promise<T> {
  let lastError: Error | null = null;
  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      const errorCode = (error as NodeJS.ErrnoException).code || "";
      const strategy = ERROR_STRATEGIES[errorCode] || {
        shouldRetry: false,
        maxRetries: 0,
      };

      if (!strategy.shouldRetry || attempt >= strategy.maxRetries) {
        console.error(
          `[${operationName}] 복구 불가능한 에러:`,
          errorCode,
          error,
        );
        throw error;
      }

      attempt++;
      const delay = strategy.retryDelay * Math.pow(2, attempt - 1); // 지수 백오프
      console.warn(
        `[${operationName}] 재시도 ${attempt}/${strategy.maxRetries}, ${delay}ms 대기...`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
```

#### 5.1.2 HTTP 상태 코드 기반 제어

```typescript
// src/lib/error-handling/http-errors.ts

interface HttpErrorStrategy {
  shouldRetry: boolean;
  retryAfterHeader: boolean;
  defaultDelay: number;
  maxRetries: number;
}

const HTTP_ERROR_STRATEGIES: Record<number, HttpErrorStrategy> = {
  // 429 Too Many Requests - Retry-After 헤더 존중
  429: {
    shouldRetry: true,
    retryAfterHeader: true,
    defaultDelay: 60000, // 기본 1분 대기
    maxRetries: 5,
  },
  // 500 서버 오류 - 짧은 재시도
  500: {
    shouldRetry: true,
    retryAfterHeader: false,
    defaultDelay: 3000,
    maxRetries: 2,
  },
  // 502 Bad Gateway
  502: {
    shouldRetry: true,
    retryAfterHeader: false,
    defaultDelay: 5000,
    maxRetries: 3,
  },
  // 503 Service Unavailable
  503: {
    shouldRetry: true,
    retryAfterHeader: true,
    defaultDelay: 10000,
    maxRetries: 3,
  },
  // 504 Gateway Timeout
  504: {
    shouldRetry: true,
    retryAfterHeader: false,
    defaultDelay: 5000,
    maxRetries: 2,
  },
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
): Promise<Response> {
  let lastResponse: Response | null = null;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(30000), // 30초 타임아웃
      });

      // 성공 또는 클라이언트 에러 (재시도 불필요)
      if (
        response.ok ||
        (response.status >= 400 &&
          response.status < 500 &&
          response.status !== 429)
      ) {
        return response;
      }

      lastResponse = response;
      const strategy = HTTP_ERROR_STRATEGIES[response.status];

      if (!strategy?.shouldRetry || attempt >= maxRetries) {
        return response;
      }

      // Retry-After 헤더 확인
      let delay = strategy.defaultDelay;
      if (strategy.retryAfterHeader) {
        const retryAfter = response.headers.get("Retry-After");
        if (retryAfter) {
          delay = parseInt(retryAfter, 10) * 1000 || delay;
        }
      }

      attempt++;
      console.warn(
        `[HTTP ${response.status}] 재시도 ${attempt}/${maxRetries}, ${delay}ms 대기...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.error("Request timeout");
      }

      attempt++;
      if (attempt > maxRetries) throw error;

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  return lastResponse!;
}
```

#### 5.1.3 JSON 파싱 방어 로직

```typescript
// src/lib/error-handling/json-parser.ts

interface SafeParseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  rawInput?: string;
}

export function safeJsonParse<T = unknown>(input: string): SafeParseResult<T> {
  // 빈 입력 체크
  if (!input || typeof input !== "string") {
    return {
      success: false,
      error: "Input is empty or not a string",
      rawInput: String(input).slice(0, 100),
    };
  }

  // 공백 제거
  const trimmed = input.trim();

  try {
    const data = JSON.parse(trimmed) as T;
    return { success: true, data };
  } catch (error) {
    const parseError = error as SyntaxError;

    // 상세 에러 정보 추출
    const positionMatch = parseError.message.match(/position (\d+)/);
    const position = positionMatch ? parseInt(positionMatch[1], 10) : -1;

    return {
      success: false,
      error: `JSON Parse Error: ${parseError.message}`,
      rawInput:
        position >= 0
          ? `...${trimmed.slice(Math.max(0, position - 20), position + 20)}...`
          : trimmed.slice(0, 100),
    };
  }
}

// 느슨한 JSON 파싱 (일반적인 오류 자동 수정)
export function lenientJsonParse<T = unknown>(
  input: string,
): SafeParseResult<T> {
  let fixed = input.trim();

  // 1. 후행 쉼표 제거
  fixed = fixed.replace(/,(\s*[}\]])/g, "$1");

  // 2. 단일 따옴표 → 이중 따옴표
  // (문자열 내부가 아닌 곳만)
  fixed = fixed.replace(/'/g, '"');

  // 3. 따옴표 없는 키 처리
  fixed = fixed.replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

  return safeJsonParse<T>(fixed);
}
```

### 5.2 데이터 저장 아키텍처

```typescript
// src/lib/database/trend-storage.ts

import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "trends");

interface TrendReport {
  week: string;
  generatedAt: Date;
  // ... 기타 필드
}

export async function saveTrendReport(report: TrendReport): Promise<void> {
  // 디렉토리 생성 (없으면)
  await fs.mkdir(DATA_DIR, { recursive: true });

  const filePath = path.join(DATA_DIR, `${report.week}.json`);
  await fs.writeFile(filePath, JSON.stringify(report, null, 2), "utf-8");
}

export async function getTrendReport(
  week: string,
): Promise<TrendReport | null> {
  const filePath = path.join(DATA_DIR, `${week}.json`);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function listTrendReports(): Promise<string[]> {
  try {
    const files = await fs.readdir(DATA_DIR);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}
```

---

## 6. 실행 로드맵 및 KPI

### 6.1 단계별 실행 계획

```
┌─────────────────────────────────────────────────────────────────┐
│  Week 1-2: 데이터 파이프라인 구축                                │
│  ├── Reddit RSS 수집기 구현 및 테스트                           │
│  ├── GitHub Trending 수집기 구현                                │
│  ├── 에러 핸들링/재시도 로직 강화                               │
│  └── JSON 파일 기반 데이터 저장 구조                            │
├─────────────────────────────────────────────────────────────────┤
│  Week 3-4: pSEO 페이지 확장                                      │
│  ├── 변환 매트릭스 페이지 템플릿 구축 (~100개)                  │
│  ├── 해시 타입별 페이지 생성 (~50개)                            │
│  ├── 내부 링크 그래프 자동화 컴포넌트                           │
│  ├── 사이트맵 분할 설정 (next-sitemap)                          │
│  └── Google Search Console 색인 요청                            │
├─────────────────────────────────────────────────────────────────┤
│  Week 5-6: 자동 큐레이션 콘텐츠                                  │
│  ├── 주간 트렌드 리포트 자동 생성 페이지                        │
│  ├── Vercel Cron 스케줄러 설정                                  │
│  ├── ISR 재생성 트리거 API 구현                                 │
│  └── 트렌드 데이터 → 도구 추천 연결                             │
├─────────────────────────────────────────────────────────────────┤
│  Week 7-8: Chrome Extension 고도화                               │
│  ├── 인라인 미니 도구 (팝업 내 실행)                            │
│  ├── Omnibox 검색 통합 (키워드: dt)                             │
│  ├── 전역 단축키 지원                                           │
│  └── Chrome Web Store 재등록                                    │
├─────────────────────────────────────────────────────────────────┤
│  Week 9-10: VS Code Extension 개발                               │
│  ├── package.json 분석 기능                                     │
│  ├── 선택 텍스트 변환 명령어                                    │
│  ├── 컨텍스트 메뉴 통합                                         │
│  └── VS Code Marketplace 등록                                   │
├─────────────────────────────────────────────────────────────────┤
│  Week 11-12: 최적화 및 모니터링                                  │
│  ├── Core Web Vitals 최적화                                     │
│  ├── 트래픽 분석 대시보드 구축                                  │
│  ├── 에러 모니터링 (Sentry 등)                                  │
│  └── A/B 테스트 (광고 배치, CTA 등)                             │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 예상 페이지 생성량

| 카테고리                | 현재 | 목표     | 증가량   |
| ----------------------- | ---- | -------- | -------- |
| resize-to (이미지 타겟) | ~50  | 250      | +200     |
| convert (변환 도구)     | ~30  | 130      | +100     |
| hash (해시 타입)        | 0    | 50       | +50      |
| encode/decode           | 0    | 80       | +80      |
| trends (주간 리포트)    | 0    | 52/year  | +52      |
| **총계**                | ~80  | **~560** | **+480** |

### 6.3 KPI 목표

| 지표                     | Month 1 | Month 3 | Month 6 | Month 12 |
| ------------------------ | ------- | ------- | ------- | -------- |
| 인덱싱된 페이지          | 200     | 500     | 600     | 700+     |
| 월간 방문자 (Organic)    | 3K      | 15K     | 50K     | 100K     |
| Extension 설치 (Chrome)  | 100     | 500     | 2K      | 5K       |
| Extension 설치 (VS Code) | 50      | 300     | 1K      | 3K       |
| 자동 생성 콘텐츠         | 10개/주 | 20개/주 | 20개/주 | 20개/주  |
| AdSense RPM              | $1      | $2.5    | $3.5    | $4+      |

### 6.4 리스크 및 대응 전략

| 리스크               | 영향도 | 대응 전략                                 |
| -------------------- | ------ | ----------------------------------------- |
| 비공식 API 중단      | 높음   | 대체 데이터 소스 준비, 캐싱 전략          |
| Chrome 정책 변경     | 중간   | Manifest V3 완전 준수, Firefox 버전 병행  |
| Google 알고리즘 변화 | 높음   | 품질 콘텐츠 비중 유지, 다채널 트래픽 분산 |
| Rate Limiting        | 중간   | 프록시 풀, 지수 백오프, 캐싱 레이어       |
| 빌드 시간 증가       | 낮음   | Hybrid 렌더링, 증분 빌드                  |

---

## 부록: 기술 스택 요약

```yaml
Frontend:
  - Next.js 15 (App Router)
  - TypeScript
  - Tailwind CSS

pSEO:
  - generateStaticParams (Hybrid)
  - ISR (revalidate)
  - next-sitemap

Data Pipeline:
  - Node.js (RSS Parser)
  - Vercel Cron
  - JSON File Storage (초기) → Supabase (확장 시)

Extensions:
  - Chrome: Plasmo (Manifest V3)
  - VS Code: VS Code Extension API

Monitoring:
  - Vercel Analytics
  - Google Search Console
  - Sentry (에러 추적)
```

---

_이 계획서는 월간 리뷰를 통해 업데이트됩니다._
_최종 수정: 2025-12-23_
