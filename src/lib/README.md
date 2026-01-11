# lib/

<!-- AUTO-GENERATED-START -->

## Overview

AI 기반 자동화 시스템의 핵심 라이브러리들. 트렌드 감지, 웹 검색, AI 콘텐츠 생성 기능을 담당합니다.

## Libraries

| Library              | Purpose                                 |
| -------------------- | --------------------------------------- |
| `trend-detector/`    | 트렌드 감지 시스템 (Google Trends, RSS) |
| `web-search/`        | RAG 기반 웹 검색 (Tavily API)           |
| `content-generator/` | Claude AI 기사 콘텐츠 생성              |

## Automation Flow

```
trend-detector → web-search → content-generator
    ↓                ↓              ↓
 트렌드 수집    컨텍스트 검색   AI 기사 생성
```

## trend-detector/

트렌드 데이터 수집 및 분석

**Sources:**

- Google Trends
- RSS 피드
- 뉴스 API

**Output:** `Trend` 엔티티

## web-search/

RAG(Retrieval-Augmented Generation)를 위한 웹 검색

```typescript
interface WebSearchOptions {
  maxResults?: number;
  maxTokens?: number;
  searchDepth?: "basic" | "advanced";
  topic?: "general" | "news";
}
```

## content-generator/

Claude AI를 사용한 다국어 기사 생성

**Output:**

- 제목 (한국어/영어)
- 본문 (한국어/영어)
- 발췌문, SEO 키워드
- FAQ (리치 스니펫용)
- 핵심 요약

## Environment Variables

```bash
ANTHROPIC_API_KEY=...     # Claude AI
TAVILY_API_KEY=...        # Web Search (optional)
```

<!-- AUTO-GENERATED-END -->
