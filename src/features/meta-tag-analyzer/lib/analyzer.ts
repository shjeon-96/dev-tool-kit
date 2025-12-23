import type {
  AnalysisResult,
  AnalysisIssue,
  MetaTagInfo,
  OpenGraphInfo,
  TwitterCardInfo,
} from "./types";
import { LIMITS } from "./types";

export function analyzeHtml(html: string): AnalysisResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const meta = extractMetaTags(doc);
  const openGraph = extractOpenGraph(doc);
  const twitterCard = extractTwitterCard(doc);
  const h1Tags = extractHeadings(doc, "h1");
  const h2Tags = extractHeadings(doc, "h2");
  const imageCount = doc.querySelectorAll("img").length;
  const wordCount = countWords(doc.body?.textContent || "");

  const issues = analyzeIssues(meta, openGraph, twitterCard, h1Tags, doc);
  const score = calculateScore(issues);
  const grade = getGrade(score);

  return {
    score,
    grade,
    meta,
    openGraph,
    twitterCard,
    issues,
    h1Tags,
    h2Tags,
    imageCount,
    wordCount,
  };
}

function extractMetaTags(doc: Document): MetaTagInfo {
  return {
    title: doc.querySelector("title")?.textContent || undefined,
    description: getMetaContent(doc, "description"),
    keywords: getMetaContent(doc, "keywords"),
    canonical:
      doc.querySelector('link[rel="canonical"]')?.getAttribute("href") ||
      undefined,
    robots: getMetaContent(doc, "robots"),
    viewport: getMetaContent(doc, "viewport"),
    charset:
      doc.querySelector("meta[charset]")?.getAttribute("charset") || undefined,
  };
}

function extractOpenGraph(doc: Document): OpenGraphInfo {
  return {
    title: getMetaProperty(doc, "og:title"),
    description: getMetaProperty(doc, "og:description"),
    image: getMetaProperty(doc, "og:image"),
    url: getMetaProperty(doc, "og:url"),
    type: getMetaProperty(doc, "og:type"),
    siteName: getMetaProperty(doc, "og:site_name"),
  };
}

function extractTwitterCard(doc: Document): TwitterCardInfo {
  return {
    card:
      getMetaContent(doc, "twitter:card") ||
      getMetaProperty(doc, "twitter:card"),
    title:
      getMetaContent(doc, "twitter:title") ||
      getMetaProperty(doc, "twitter:title"),
    description:
      getMetaContent(doc, "twitter:description") ||
      getMetaProperty(doc, "twitter:description"),
    image:
      getMetaContent(doc, "twitter:image") ||
      getMetaProperty(doc, "twitter:image"),
    site:
      getMetaContent(doc, "twitter:site") ||
      getMetaProperty(doc, "twitter:site"),
    creator:
      getMetaContent(doc, "twitter:creator") ||
      getMetaProperty(doc, "twitter:creator"),
  };
}

function getMetaContent(doc: Document, name: string): string | undefined {
  return (
    doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ||
    undefined
  );
}

function getMetaProperty(doc: Document, property: string): string | undefined {
  return (
    doc
      .querySelector(`meta[property="${property}"]`)
      ?.getAttribute("content") || undefined
  );
}

function extractHeadings(doc: Document, tag: string): string[] {
  return Array.from(doc.querySelectorAll(tag)).map(
    (el) => el.textContent?.trim() || "",
  );
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function analyzeIssues(
  meta: MetaTagInfo,
  og: OpenGraphInfo,
  twitter: TwitterCardInfo,
  h1Tags: string[],
  doc: Document,
): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];

  // Title checks
  if (!meta.title) {
    issues.push({
      type: "title",
      level: "error",
      message: "페이지에 title 태그가 없습니다",
      suggestion: "30-60자 사이의 고유한 title을 추가하세요",
    });
  } else {
    const titleLen = meta.title.length;
    if (titleLen < LIMITS.TITLE_MIN) {
      issues.push({
        type: "title",
        level: "warning",
        message: `Title이 너무 짧습니다 (${titleLen}자)`,
        suggestion: `최소 ${LIMITS.TITLE_MIN}자 이상으로 작성하세요`,
      });
    } else if (titleLen > LIMITS.TITLE_MAX) {
      issues.push({
        type: "title",
        level: "warning",
        message: `Title이 너무 깁니다 (${titleLen}자)`,
        suggestion: `${LIMITS.TITLE_MAX}자 이하로 줄이세요`,
      });
    }
  }

  // Description checks
  if (!meta.description) {
    issues.push({
      type: "description",
      level: "error",
      message: "Meta description이 없습니다",
      suggestion: "120-160자 사이의 설명을 추가하세요",
    });
  } else {
    const descLen = meta.description.length;
    if (descLen < LIMITS.DESCRIPTION_MIN) {
      issues.push({
        type: "description",
        level: "warning",
        message: `Description이 너무 짧습니다 (${descLen}자)`,
        suggestion: `최소 ${LIMITS.DESCRIPTION_MIN}자 이상으로 작성하세요`,
      });
    } else if (descLen > LIMITS.DESCRIPTION_MAX) {
      issues.push({
        type: "description",
        level: "warning",
        message: `Description이 너무 깁니다 (${descLen}자)`,
        suggestion: `${LIMITS.DESCRIPTION_MAX}자 이하로 줄이세요`,
      });
    }
  }

  // H1 checks
  if (h1Tags.length === 0) {
    issues.push({
      type: "h1",
      level: "error",
      message: "H1 태그가 없습니다",
      suggestion: "페이지에 하나의 H1 태그를 추가하세요",
    });
  } else if (h1Tags.length > 1) {
    issues.push({
      type: "h1",
      level: "warning",
      message: `H1 태그가 ${h1Tags.length}개 있습니다`,
      suggestion: "H1 태그는 하나만 사용하는 것이 좋습니다",
    });
  }

  // Canonical check
  if (!meta.canonical) {
    issues.push({
      type: "canonical",
      level: "info",
      message: "Canonical URL이 설정되지 않았습니다",
      suggestion: "중복 콘텐츠 방지를 위해 canonical 태그 추가를 고려하세요",
    });
  }

  // Viewport check
  if (!meta.viewport) {
    issues.push({
      type: "viewport",
      level: "error",
      message: "Viewport 메타 태그가 없습니다",
      suggestion: "모바일 반응형을 위해 viewport 태그를 추가하세요",
    });
  }

  // Open Graph checks
  if (!og.title) {
    issues.push({
      type: "og",
      level: "warning",
      message: "Open Graph title이 없습니다",
      suggestion: "소셜 미디어 공유를 위해 og:title을 추가하세요",
    });
  }
  if (!og.description) {
    issues.push({
      type: "og",
      level: "warning",
      message: "Open Graph description이 없습니다",
      suggestion: "og:description을 추가하세요",
    });
  }
  if (!og.image) {
    issues.push({
      type: "og",
      level: "warning",
      message: "Open Graph image가 없습니다",
      suggestion: "소셜 공유 시 표시될 이미지(og:image)를 추가하세요",
    });
  }

  // Twitter Card checks
  if (!twitter.card) {
    issues.push({
      type: "twitter",
      level: "info",
      message: "Twitter Card가 설정되지 않았습니다",
      suggestion: "Twitter 공유를 위해 twitter:card를 추가하세요",
    });
  }

  // Image alt checks
  const imagesWithoutAlt = doc.querySelectorAll("img:not([alt])").length;
  if (imagesWithoutAlt > 0) {
    issues.push({
      type: "accessibility",
      level: "warning",
      message: `${imagesWithoutAlt}개의 이미지에 alt 속성이 없습니다`,
      suggestion: "모든 이미지에 설명적인 alt 텍스트를 추가하세요",
    });
  }

  return issues;
}

function calculateScore(issues: AnalysisIssue[]): number {
  let score = 100;

  for (const issue of issues) {
    switch (issue.level) {
      case "error":
        score -= 15;
        break;
      case "warning":
        score -= 8;
        break;
      case "info":
        score -= 3;
        break;
    }
  }

  return Math.max(0, Math.min(100, score));
}

export function getGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case "A+":
    case "A":
      return "text-green-500";
    case "B":
      return "text-lime-500";
    case "C":
      return "text-yellow-500";
    case "D":
      return "text-orange-500";
    default:
      return "text-red-500";
  }
}
