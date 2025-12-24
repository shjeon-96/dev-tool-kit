/**
 * GSC 색인 상태 모니터링 스크립트
 *
 * Week 5-6: 색인 상태 추적 및 주간 리포트 생성
 *
 * 사전 요구사항:
 * 1. Google Cloud Console에서 Search Console API 활성화
 * 2. 서비스 계정 생성 및 키 다운로드
 * 3. GSC에서 서비스 계정 이메일에 권한 부여
 * 4. 환경 변수 설정: GOOGLE_SERVICE_ACCOUNT (JSON 문자열)
 */

import fs from "fs/promises";
import path from "path";

// ============================================
// 타입 정의
// ============================================

interface IndexStatus {
  url: string;
  status:
    | "indexed"
    | "crawled-not-indexed"
    | "not-crawled"
    | "error"
    | "unknown";
  lastCrawled?: string;
  coverage?: string;
  error?: string;
}

interface IndexReport {
  generatedAt: string;
  siteUrl: string;
  summary: {
    total: number;
    indexed: number;
    crawledNotIndexed: number;
    notCrawled: number;
    errors: number;
    indexRate: string;
  };
  details: IndexStatus[];
  recommendations: string[];
}

// ============================================
// Google API 클라이언트 (조건부 로드)
// ============================================

async function getSearchConsoleClient() {
  try {
    const { google } = await import("googleapis");

    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT;
    if (!credentials) {
      throw new Error(
        "GOOGLE_SERVICE_ACCOUNT 환경 변수가 설정되지 않았습니다.",
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });

    return google.searchconsole({ version: "v1", auth });
  } catch (error) {
    if ((error as Error).message.includes("GOOGLE_SERVICE_ACCOUNT")) {
      throw error;
    }
    throw new Error(
      `Google API 클라이언트 초기화 실패: ${(error as Error).message}`,
    );
  }
}

// ============================================
// 색인 상태 확인
// ============================================

function mapCoverageState(state?: string): IndexStatus["status"] {
  switch (state) {
    case "INDEXED":
    case "Submitted and indexed":
      return "indexed";
    case "CRAWLED_CURRENTLY_NOT_INDEXED":
    case "Crawled - currently not indexed":
      return "crawled-not-indexed";
    case "DISCOVERED_CURRENTLY_NOT_INDEXED":
    case "Discovered - currently not indexed":
      return "not-crawled";
    case "URL_IS_UNKNOWN":
    case "URL is unknown to Google":
      return "unknown";
    default:
      return "error";
  }
}

async function checkSingleUrlIndex(
  searchconsole: Awaited<ReturnType<typeof getSearchConsoleClient>>,
  siteUrl: string,
  inspectionUrl: string,
): Promise<IndexStatus> {
  try {
    const response = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl,
        siteUrl,
      },
    });

    const result = response.data.inspectionResult;
    const indexResult = result?.indexStatusResult;

    return {
      url: inspectionUrl,
      status: mapCoverageState(indexResult?.coverageState),
      lastCrawled: indexResult?.lastCrawlTime || undefined,
      coverage: indexResult?.verdict || undefined,
    };
  } catch (error) {
    return {
      url: inspectionUrl,
      status: "error",
      error: (error as Error).message,
    };
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function checkIndexStatus(
  urls: string[],
  siteUrl = "https://web-toolkit.app",
): Promise<IndexStatus[]> {
  const searchconsole = await getSearchConsoleClient();
  const results: IndexStatus[] = [];

  console.log(`\n🔍 ${urls.length}개 URL 색인 상태 확인 중...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`  [${i + 1}/${urls.length}] ${url}`);

    const status = await checkSingleUrlIndex(searchconsole, siteUrl, url);
    results.push(status);

    // Rate limiting (GSC API 제한 준수)
    if (i < urls.length - 1) {
      await sleep(1200); // 초당 약 0.8 요청
    }
  }

  return results;
}

// ============================================
// 리포트 생성
// ============================================

function generateRecommendations(summary: IndexReport["summary"]): string[] {
  const recommendations: string[] = [];

  if (summary.crawledNotIndexed > summary.total * 0.1) {
    recommendations.push(
      "⚠️ 크롤링되었지만 색인되지 않은 페이지가 10% 이상입니다. 콘텐츠 품질을 점검하세요.",
    );
  }

  if (summary.notCrawled > summary.total * 0.2) {
    recommendations.push(
      "⚠️ 발견되었지만 크롤링되지 않은 페이지가 20% 이상입니다. 내부 링크를 강화하세요.",
    );
  }

  if (summary.errors > 0) {
    recommendations.push(
      `🔴 ${summary.errors}개 URL에서 오류가 발생했습니다. robots.txt 또는 접근 권한을 확인하세요.`,
    );
  }

  if (parseFloat(summary.indexRate) < 50) {
    recommendations.push(
      "📊 색인률이 50% 미만입니다. 고품질 백링크 구축 및 소셜 시그널 강화를 고려하세요.",
    );
  }

  if (parseFloat(summary.indexRate) >= 80) {
    recommendations.push("✅ 색인률이 양호합니다. 현재 전략을 유지하세요.");
  }

  return recommendations;
}

export async function generateWeeklyIndexReport(
  urls?: string[],
): Promise<IndexReport> {
  // URL 목록이 없으면 priority-urls.json에서 로드
  if (!urls) {
    const priorityPath = path.join(process.cwd(), "data", "priority-urls.json");
    try {
      const content = await fs.readFile(priorityPath, "utf-8");
      const data = JSON.parse(content);
      urls = data.top50 as string[];
    } catch {
      throw new Error(
        "URL 목록이 없습니다. scripts/generate-priority-urls.ts를 먼저 실행하세요.",
      );
    }
  }

  const results = await checkIndexStatus(urls);

  const summary = {
    total: results.length,
    indexed: results.filter((r) => r.status === "indexed").length,
    crawledNotIndexed: results.filter((r) => r.status === "crawled-not-indexed")
      .length,
    notCrawled: results.filter(
      (r) => r.status === "not-crawled" || r.status === "unknown",
    ).length,
    errors: results.filter((r) => r.status === "error").length,
    indexRate: "",
  };

  summary.indexRate = ((summary.indexed / summary.total) * 100).toFixed(1);

  const report: IndexReport = {
    generatedAt: new Date().toISOString(),
    siteUrl: "https://web-toolkit.app",
    summary,
    details: results,
    recommendations: generateRecommendations(summary),
  };

  return report;
}

// ============================================
// 리포트 저장 및 출력
// ============================================

async function saveReport(report: IndexReport): Promise<string> {
  const reportsDir = path.join(process.cwd(), "data", "index-reports");
  await fs.mkdir(reportsDir, { recursive: true });

  const week = new Date().toISOString().slice(0, 10);
  const filename = `index-report-${week}.json`;
  const filepath = path.join(reportsDir, filename);

  await fs.writeFile(filepath, JSON.stringify(report, null, 2));
  return filepath;
}

function printReport(report: IndexReport): void {
  console.log("\n");
  console.log("=".repeat(60));
  console.log("📊 GSC 색인 상태 리포트");
  console.log("=".repeat(60));
  console.log(`생성 시간: ${report.generatedAt}`);
  console.log(`사이트: ${report.siteUrl}`);
  console.log();

  console.log("📈 요약");
  console.log("-".repeat(40));
  console.log(`총 URL: ${report.summary.total}`);
  console.log(
    `색인됨: ${report.summary.indexed} (${report.summary.indexRate}%)`,
  );
  console.log(`크롤링됨 (미색인): ${report.summary.crawledNotIndexed}`);
  console.log(`발견됨 (미크롤링): ${report.summary.notCrawled}`);
  console.log(`오류: ${report.summary.errors}`);
  console.log();

  console.log("🎯 권장 사항");
  console.log("-".repeat(40));
  for (const rec of report.recommendations) {
    console.log(`  ${rec}`);
  }
  console.log();

  // 상태별 URL 출력
  const notIndexed = report.details.filter((d) => d.status !== "indexed");

  if (notIndexed.length > 0) {
    console.log("❌ 미색인 URL");
    console.log("-".repeat(40));
    for (const item of notIndexed.slice(0, 10)) {
      console.log(`  [${item.status}] ${item.url}`);
    }
    if (notIndexed.length > 10) {
      console.log(`  ... 외 ${notIndexed.length - 10}개`);
    }
  }
}

// ============================================
// 메인 함수
// ============================================

async function main() {
  const args = process.argv.slice(2);

  // 도움말
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
GSC 색인 상태 모니터링 스크립트

사용법:
  npx tsx scripts/gsc-index-monitor.ts [옵션]

옵션:
  --dry-run    API 호출 없이 테스트 실행
  --url <url>  단일 URL 확인
  --help, -h   도움말 표시

환경 변수:
  GOOGLE_SERVICE_ACCOUNT  Google 서비스 계정 JSON (필수)

예시:
  npx tsx scripts/gsc-index-monitor.ts
  npx tsx scripts/gsc-index-monitor.ts --dry-run
  npx tsx scripts/gsc-index-monitor.ts --url https://web-toolkit.app/en/tools/json-formatter
    `);
    return;
  }

  // Dry run 모드
  if (args.includes("--dry-run")) {
    console.log("🧪 Dry run 모드 - API 호출 없이 테스트");

    const mockReport: IndexReport = {
      generatedAt: new Date().toISOString(),
      siteUrl: "https://web-toolkit.app",
      summary: {
        total: 50,
        indexed: 35,
        crawledNotIndexed: 10,
        notCrawled: 4,
        errors: 1,
        indexRate: "70.0",
      },
      details: [],
      recommendations: [
        "⚠️ 크롤링되었지만 색인되지 않은 페이지가 10% 이상입니다.",
        "📊 색인률이 50% 미만입니다. 고품질 백링크 구축을 고려하세요.",
      ],
    };

    printReport(mockReport);
    return;
  }

  // 단일 URL 확인
  const urlIndex = args.indexOf("--url");
  if (urlIndex !== -1 && args[urlIndex + 1]) {
    const url = args[urlIndex + 1];
    console.log(`🔍 단일 URL 확인: ${url}`);

    try {
      const results = await checkIndexStatus([url]);
      console.log("\n결과:");
      console.log(JSON.stringify(results[0], null, 2));
    } catch (error) {
      console.error("오류:", (error as Error).message);
    }
    return;
  }

  // 전체 리포트 생성
  try {
    console.log("📊 GSC 색인 상태 리포트 생성 중...");
    const report = await generateWeeklyIndexReport();
    printReport(report);

    const filepath = await saveReport(report);
    console.log(`\n✅ 리포트 저장됨: ${filepath}`);
  } catch (error) {
    console.error("❌ 오류:", (error as Error).message);

    if ((error as Error).message.includes("GOOGLE_SERVICE_ACCOUNT")) {
      console.log(`
설정 방법:
1. Google Cloud Console에서 Search Console API 활성화
2. 서비스 계정 생성 및 JSON 키 다운로드
3. GSC에서 서비스 계정 이메일에 'Full' 권한 부여
4. 환경 변수 설정:
   export GOOGLE_SERVICE_ACCOUNT='{"type":"service_account",...}'
      `);
    }
  }
}

main();
