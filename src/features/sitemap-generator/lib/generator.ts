/**
 * Sitemap Generator - XML Sitemap 생성 로직
 */

import type { SitemapUrl, SitemapOptions, ChangeFrequency } from "./types";
import { DEFAULT_OPTIONS } from "./types";

/**
 * URL 유효성 검사
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * URL 정규화
 */
export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // 트레일링 슬래시 제거 (루트 제외)
    let pathname = parsed.pathname;
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    return `${parsed.protocol}//${parsed.host}${pathname}${parsed.search}`;
  } catch {
    return url;
  }
}

/**
 * 텍스트 입력에서 URL 파싱
 */
export function parseUrls(input: string): string[] {
  const lines = input
    .split(/[\n,]/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const urls: string[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    // URL이 아니면 스킵
    if (!line.startsWith("http://") && !line.startsWith("https://")) {
      continue;
    }

    if (isValidUrl(line)) {
      const normalized = normalizeUrl(line);
      if (!seen.has(normalized)) {
        seen.add(normalized);
        urls.push(normalized);
      }
    }
  }

  return urls;
}

/**
 * XML 특수문자 이스케이프
 */
export function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * ISO 8601 날짜 포맷
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

/**
 * 단일 URL 엔트리 생성
 */
export function generateUrlEntry(
  url: SitemapUrl,
  options: SitemapOptions,
  indent: string = "",
): string {
  const lines: string[] = [];
  const innerIndent = options.prettyPrint ? indent + "  " : "";
  const newline = options.prettyPrint ? "\n" : "";

  lines.push(`${indent}<url>${newline}`);
  lines.push(`${innerIndent}<loc>${escapeXml(url.loc)}</loc>${newline}`);

  if (options.includeLastmod) {
    const lastmod = url.lastmod || formatDate();
    lines.push(`${innerIndent}<lastmod>${lastmod}</lastmod>${newline}`);
  }

  if (url.changefreq || options.defaultChangefreq) {
    const changefreq = url.changefreq || options.defaultChangefreq;
    lines.push(
      `${innerIndent}<changefreq>${changefreq}</changefreq>${newline}`,
    );
  }

  const priority = url.priority ?? options.defaultPriority;
  lines.push(
    `${innerIndent}<priority>${priority.toFixed(1)}</priority>${newline}`,
  );

  lines.push(`${indent}</url>`);

  return lines.join("");
}

/**
 * XML Sitemap 생성
 */
export function generateSitemap(
  urls: SitemapUrl[],
  options: Partial<SitemapOptions> = {},
): string {
  const opts: SitemapOptions = { ...DEFAULT_OPTIONS, ...options };
  const newline = opts.prettyPrint ? "\n" : "";
  const indent = opts.prettyPrint ? "  " : "";

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const url of urls) {
    lines.push(generateUrlEntry(url, opts, indent));
  }

  lines.push("</urlset>");

  return lines.join(newline) + newline;
}

/**
 * Sitemap Index 생성 (여러 sitemap 파일용)
 */
export function generateSitemapIndex(
  sitemapUrls: string[],
  options: { prettyPrint?: boolean } = {},
): string {
  const prettyPrint = options.prettyPrint ?? true;
  const newline = prettyPrint ? "\n" : "";
  const indent = prettyPrint ? "  " : "";
  const innerIndent = prettyPrint ? "    " : "";

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const url of sitemapUrls) {
    lines.push(`${indent}<sitemap>${newline}`);
    lines.push(`${innerIndent}<loc>${escapeXml(url)}</loc>${newline}`);
    lines.push(`${innerIndent}<lastmod>${formatDate()}</lastmod>${newline}`);
    lines.push(`${indent}</sitemap>`);
  }

  lines.push("</sitemapindex>");

  return lines.join(newline) + newline;
}

/**
 * URL에서 도메인 추출
 */
export function extractDomain(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}

/**
 * URL들이 같은 도메인인지 확인
 */
export function validateSameDomain(urls: string[]): {
  valid: boolean;
  domain: string | null;
  invalidUrls: string[];
} {
  if (urls.length === 0) {
    return { valid: true, domain: null, invalidUrls: [] };
  }

  const firstDomain = extractDomain(urls[0]);
  if (!firstDomain) {
    return { valid: false, domain: null, invalidUrls: [urls[0]] };
  }

  const invalidUrls: string[] = [];
  for (const url of urls) {
    const domain = extractDomain(url);
    if (domain !== firstDomain) {
      invalidUrls.push(url);
    }
  }

  return {
    valid: invalidUrls.length === 0,
    domain: firstDomain,
    invalidUrls,
  };
}

/**
 * Sitemap 통계 계산
 */
export function calculateStats(urls: SitemapUrl[]): {
  totalUrls: number;
  uniqueDomains: number;
  avgPriority: number;
  changefreqDistribution: Record<ChangeFrequency, number>;
} {
  const domains = new Set<string>();
  let prioritySum = 0;
  const changefreqDistribution: Record<ChangeFrequency, number> = {
    always: 0,
    hourly: 0,
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    never: 0,
  };

  for (const url of urls) {
    const domain = extractDomain(url.loc);
    if (domain) domains.add(domain);

    prioritySum += url.priority ?? 0.5;

    if (url.changefreq) {
      changefreqDistribution[url.changefreq]++;
    }
  }

  return {
    totalUrls: urls.length,
    uniqueDomains: domains.size,
    avgPriority: urls.length > 0 ? prioritySum / urls.length : 0,
    changefreqDistribution,
  };
}
