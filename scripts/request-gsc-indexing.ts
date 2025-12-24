/**
 * GSC Indexing API 색인 요청 스크립트
 *
 * 핵심 URL에 대해 Google에 색인 요청을 보냅니다.
 *
 * 사용법:
 *   npx tsx scripts/request-gsc-indexing.ts [옵션]
 *
 * 옵션:
 *   --url <url>     단일 URL 색인 요청
 *   --priority      priority-urls.json의 상위 50개 URL 요청
 *   --new           새로 생성된 페이지만 요청 (sitemap 비교)
 *   --dry-run       실제 요청 없이 테스트
 *   --help          도움말
 */

import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";
import {
  requestIndexing,
  requestBatchIndexing,
  getIndexingStatus,
} from "../src/shared/lib/gsc/indexing-api";

// Load .env.local
config({ path: ".env.local" });

// ============================================
// 헬퍼 함수
// ============================================

async function loadPriorityUrls(): Promise<string[]> {
  const filepath = path.join(process.cwd(), "data", "priority-urls.json");
  try {
    const content = await fs.readFile(filepath, "utf-8");
    const data = JSON.parse(content);
    return data.top50 as string[];
  } catch {
    throw new Error(
      "priority-urls.json을 찾을 수 없습니다. 먼저 generate-priority-urls.ts를 실행하세요.",
    );
  }
}

async function saveIndexingLog(result: unknown): Promise<void> {
  const logsDir = path.join(process.cwd(), "data", "indexing-logs");
  await fs.mkdir(logsDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filepath = path.join(logsDir, `indexing-${timestamp}.json`);
  await fs.writeFile(filepath, JSON.stringify(result, null, 2));

  console.log(`\n📝 로그 저장됨: ${filepath}`);
}

function printUsage(): void {
  console.log(`
GSC Indexing API 색인 요청 스크립트

사용법:
  npx tsx scripts/request-gsc-indexing.ts [옵션]

옵션:
  --url <url>     단일 URL 색인 요청
  --priority      priority-urls.json의 상위 URL 요청
  --count <n>     요청할 URL 수 (기본: 50, 최대: 200)
  --status <url>  URL 색인 상태 확인
  --dry-run       실제 요청 없이 테스트
  --help          도움말

예시:
  # 단일 URL 색인 요청
  npx tsx scripts/request-gsc-indexing.ts --url https://web-toolkit.app/en/tools/json-formatter

  # 상위 50개 우선순위 URL 요청
  npx tsx scripts/request-gsc-indexing.ts --priority

  # 상위 20개만 요청
  npx tsx scripts/request-gsc-indexing.ts --priority --count 20

  # URL 색인 상태 확인
  npx tsx scripts/request-gsc-indexing.ts --status https://web-toolkit.app/en

주의:
  - Indexing API는 하루 200개 요청 제한이 있습니다
  - 너무 많은 요청은 스팸으로 간주될 수 있습니다
  - 새 페이지나 중요한 업데이트에만 사용하세요
  `);
}

// ============================================
// 메인 함수
// ============================================

async function main() {
  const args = process.argv.slice(2);

  // 도움말
  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    printUsage();
    return;
  }

  // 환경 변수 확인
  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    console.error("❌ GOOGLE_SERVICE_ACCOUNT 환경 변수가 설정되지 않았습니다.");
    console.log(`
설정 방법:
1. Google Cloud Console에서 Indexing API 활성화
2. 서비스 계정 생성 및 JSON 키 다운로드
3. GSC에서 서비스 계정 이메일에 'Owner' 권한 부여
4. .env.local에 추가:
   GOOGLE_SERVICE_ACCOUNT='{"type":"service_account",...}'
    `);
    return;
  }

  // Dry run
  const isDryRun = args.includes("--dry-run");
  if (isDryRun) {
    console.log("🧪 Dry run 모드 - 실제 API 요청 없음\n");
  }

  // URL 상태 확인
  const statusIndex = args.indexOf("--status");
  if (statusIndex !== -1 && args[statusIndex + 1]) {
    const url = args[statusIndex + 1];
    console.log(`🔍 URL 색인 상태 확인: ${url}`);

    if (isDryRun) {
      console.log("  (dry-run) 상태 확인 건너뜀");
      return;
    }

    const status = await getIndexingStatus(url);
    console.log(JSON.stringify(status, null, 2));
    return;
  }

  // 단일 URL 요청
  const urlIndex = args.indexOf("--url");
  if (urlIndex !== -1 && args[urlIndex + 1]) {
    const url = args[urlIndex + 1];
    console.log(`📤 단일 URL 색인 요청: ${url}`);

    if (isDryRun) {
      console.log("  (dry-run) 요청 건너뜀");
      return;
    }

    const result = await requestIndexing(url);
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log("\n✅ 색인 요청 성공!");
    } else {
      console.log("\n❌ 색인 요청 실패");
    }
    return;
  }

  // 우선순위 URL 일괄 요청
  if (args.includes("--priority")) {
    const countIndex = args.indexOf("--count");
    const count = countIndex !== -1 ? parseInt(args[countIndex + 1], 10) : 50;
    const maxCount = Math.min(count, 200); // API 일일 제한

    console.log(`📤 우선순위 URL ${maxCount}개 색인 요청`);

    const urls = await loadPriorityUrls();
    const targetUrls = urls.slice(0, maxCount);

    console.log(`\n대상 URL: ${targetUrls.length}개`);
    targetUrls.slice(0, 5).forEach((url) => console.log(`  - ${url}`));
    if (targetUrls.length > 5) {
      console.log(`  ... 외 ${targetUrls.length - 5}개`);
    }

    if (isDryRun) {
      console.log("\n(dry-run) 요청 건너뜀");
      return;
    }

    console.log("\n⏳ 색인 요청 시작... (URL당 1초 대기)");
    const result = await requestBatchIndexing(targetUrls);

    console.log("\n" + "=".repeat(60));
    console.log("📊 결과 요약");
    console.log("=".repeat(60));
    console.log(`총 요청: ${result.total}`);
    console.log(`성공: ${result.success}`);
    console.log(`실패: ${result.failed}`);

    if (result.failed > 0) {
      console.log("\n❌ 실패한 URL:");
      result.results
        .filter((r) => !r.success)
        .forEach((r) => console.log(`  - ${r.url}: ${r.error}`));
    }

    await saveIndexingLog(result);
    return;
  }

  // 알 수 없는 옵션
  console.error("❌ 알 수 없는 옵션입니다. --help로 사용법을 확인하세요.");
}

main().catch(console.error);
