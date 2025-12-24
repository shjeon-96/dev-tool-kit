/**
 * GSC 색인 우선순위 URL 생성 스크립트
 *
 * Week 5-6: 핵심 페이지 50개 수동 색인 요청용 URL 목록 생성
 */

import fs from "fs";
import path from "path";
import { tools } from "../src/entities/tool/model/registry";
import { conversions } from "../src/entities/converter/model/registry";
import { guides } from "../src/entities/guide/data";
import type { ToolSlug } from "../src/entities/tool/model/types";

const SITE_URL = "https://web-toolkit.app";

// ============================================
// 우선순위 정의
// ============================================

interface PriorityUrl {
  url: string;
  priority: number; // 1 = 최고, 5 = 최저
  category: string;
  locale: string;
}

// 핵심 도구 (우선순위 1)
const CORE_TOOLS: ToolSlug[] = [
  "json-formatter",
  "jwt-decoder",
  "hash-generator",
  "base64-converter",
  "image-resizer",
  "qr-generator",
  "url-encoder",
  "uuid-generator",
  "color-picker",
  "regex-tester",
];

// 인기 도구 (우선순위 2)
const POPULAR_TOOLS: ToolSlug[] = [
  "unix-timestamp",
  "cron-parser",
  "diff-checker",
  "markdown-preview",
  "css-minifier",
  "html-entity",
  "svg-optimizer",
  "app-icon-generator",
  "gradient-generator",
  "box-shadow",
];

// 인기 변환 페이지 (우선순위 2)
const POPULAR_CONVERTERS = [
  "json-to-csv",
  "json-to-yaml",
  "xml-to-json",
  "csv-to-json",
  "yaml-to-json",
  "markdown-to-html",
  "html-to-markdown",
  "json-to-xml",
  "png-to-jpg",
  "jpg-to-png",
];

// ============================================
// URL 생성
// ============================================

function generatePriorityUrls(): PriorityUrl[] {
  const urls: PriorityUrl[] = [];

  // 1. 핵심 도구 (우선순위 1) - 영어만 먼저
  for (const slug of CORE_TOOLS) {
    if (tools[slug]) {
      urls.push({
        url: `${SITE_URL}/en/tools/${slug}`,
        priority: 1,
        category: "core-tool",
        locale: "en",
      });
    }
  }

  // 2. 인기 도구 (우선순위 2) - 영어
  for (const slug of POPULAR_TOOLS) {
    if (tools[slug as ToolSlug]) {
      urls.push({
        url: `${SITE_URL}/en/tools/${slug}`,
        priority: 2,
        category: "popular-tool",
        locale: "en",
      });
    }
  }

  // 3. 인기 변환 페이지 (우선순위 2) - 영어
  for (const slug of POPULAR_CONVERTERS) {
    const conversion = conversions.find((c) => c.slug === slug);
    if (conversion) {
      urls.push({
        url: `${SITE_URL}/en/convert/${slug}`,
        priority: 2,
        category: "popular-converter",
        locale: "en",
      });
    }
  }

  // 4. 핵심 가이드 (우선순위 2)
  const guideSlugs = Object.keys(guides).slice(0, 10);
  for (const slug of guideSlugs) {
    urls.push({
      url: `${SITE_URL}/en/guides/${slug}`,
      priority: 2,
      category: "guide",
      locale: "en",
    });
  }

  // 5. 나머지 도구 (우선순위 3) - 영어
  const allToolSlugs = Object.keys(tools) as ToolSlug[];
  const remainingTools = allToolSlugs.filter(
    (slug) =>
      !CORE_TOOLS.includes(slug) && !POPULAR_TOOLS.includes(slug as ToolSlug),
  );

  for (const slug of remainingTools.slice(0, 20)) {
    urls.push({
      url: `${SITE_URL}/en/tools/${slug}`,
      priority: 3,
      category: "tool",
      locale: "en",
    });
  }

  // 6. 핵심 도구 다국어 버전 (우선순위 3)
  for (const slug of CORE_TOOLS.slice(0, 5)) {
    for (const locale of ["ko", "ja"] as const) {
      urls.push({
        url: `${SITE_URL}/${locale}/tools/${slug}`,
        priority: 3,
        category: "core-tool-i18n",
        locale,
      });
    }
  }

  // 7. 메인 페이지들 (우선순위 1)
  urls.unshift(
    { url: `${SITE_URL}/en`, priority: 1, category: "homepage", locale: "en" },
    {
      url: `${SITE_URL}/en/tools`,
      priority: 1,
      category: "tools-index",
      locale: "en",
    },
    {
      url: `${SITE_URL}/en/guides`,
      priority: 1,
      category: "guides-index",
      locale: "en",
    },
    {
      url: `${SITE_URL}/en/pricing`,
      priority: 1,
      category: "pricing",
      locale: "en",
    },
  );

  return urls;
}

// ============================================
// 출력
// ============================================

function main() {
  const urls = generatePriorityUrls();

  // 우선순위별 정렬
  urls.sort((a, b) => a.priority - b.priority);

  console.log("=".repeat(60));
  console.log("GSC 색인 우선순위 URL 목록");
  console.log("=".repeat(60));
  console.log(`총 URL 수: ${urls.length}`);
  console.log();

  // 우선순위별 그룹화
  const byPriority = urls.reduce(
    (acc, url) => {
      acc[url.priority] = acc[url.priority] || [];
      acc[url.priority].push(url);
      return acc;
    },
    {} as Record<number, PriorityUrl[]>,
  );

  for (const [priority, priorityUrls] of Object.entries(byPriority)) {
    console.log(`\n📌 Priority ${priority} (${priorityUrls.length}개)`);
    console.log("-".repeat(40));
    for (const { url } of priorityUrls) {
      console.log(`  ${url}`);
    }
  }

  // 상위 50개 URL만 별도 출력 (GSC 수동 제출용)
  console.log("\n");
  console.log("=".repeat(60));
  console.log("📋 GSC 수동 제출용 상위 50개 URL");
  console.log("=".repeat(60));
  const top50 = urls.slice(0, 50);
  for (const { url } of top50) {
    console.log(url);
  }

  // JSON 파일로 저장
  const outputPath = "data/priority-urls.json";
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(process.cwd(), outputPath),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalUrls: urls.length,
        top50: top50.map((u) => u.url),
        byPriority: byPriority,
      },
      null,
      2,
    ),
  );

  console.log(`\n✅ JSON 저장됨: ${outputPath}`);
}

main();
