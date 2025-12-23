/**
 * 트렌드 데이터 저장소
 * 파일 시스템 기반 JSON 저장
 */

import fs from "fs/promises";
import path from "path";
import type { WeeklyTrendReport, StorageMetadata } from "./types";

// ============================================
// 설정
// ============================================

const DATA_DIR = path.join(process.cwd(), "data", "trends");
const METADATA_FILE = path.join(DATA_DIR, "_metadata.json");

// ============================================
// 초기화
// ============================================

/**
 * 데이터 디렉토리 초기화
 */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

// ============================================
// 저장 함수
// ============================================

/**
 * 주간 트렌드 리포트 저장
 */
export async function saveTrendReport(
  report: WeeklyTrendReport,
): Promise<void> {
  await ensureDataDir();

  const filePath = path.join(DATA_DIR, `${report.week}.json`);
  await fs.writeFile(filePath, JSON.stringify(report, null, 2), "utf-8");

  // 메타데이터 업데이트
  await updateMetadata();

  console.log(`[Storage] 리포트 저장 완료: ${filePath}`);
}

/**
 * 메타데이터 업데이트
 */
async function updateMetadata(): Promise<void> {
  const reports = await listTrendReports();

  const metadata: StorageMetadata = {
    version: "1.0",
    lastUpdated: new Date().toISOString(),
    recordCount: reports.length,
  };

  await fs.writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2), "utf-8");
}

// ============================================
// 조회 함수
// ============================================

/**
 * 특정 주차 리포트 조회
 */
export async function getTrendReport(
  week: string,
): Promise<WeeklyTrendReport | null> {
  const filePath = path.join(DATA_DIR, `${week}.json`);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as WeeklyTrendReport;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

/**
 * 최신 리포트 조회
 */
export async function getLatestTrendReport(): Promise<WeeklyTrendReport | null> {
  const reports = await listTrendReports();

  if (reports.length === 0) {
    return null;
  }

  return getTrendReport(reports[0]);
}

/**
 * 저장된 모든 리포트 주차 목록 조회
 */
export async function listTrendReports(): Promise<string[]> {
  try {
    await ensureDataDir();
    const files = await fs.readdir(DATA_DIR);

    return files
      .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
      .map((f) => f.replace(".json", ""))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

/**
 * 최근 N개 리포트 조회
 */
export async function getRecentReports(
  limit = 12,
): Promise<WeeklyTrendReport[]> {
  const weeks = await listTrendReports();
  const recentWeeks = weeks.slice(0, limit);

  const reports: WeeklyTrendReport[] = [];
  for (const week of recentWeeks) {
    const report = await getTrendReport(week);
    if (report) {
      reports.push(report);
    }
  }

  return reports;
}

/**
 * 메타데이터 조회
 */
export async function getStorageMetadata(): Promise<StorageMetadata | null> {
  try {
    const content = await fs.readFile(METADATA_FILE, "utf-8");
    return JSON.parse(content) as StorageMetadata;
  } catch {
    return null;
  }
}

// ============================================
// 삭제 함수
// ============================================

/**
 * 특정 리포트 삭제
 */
export async function deleteTrendReport(week: string): Promise<boolean> {
  const filePath = path.join(DATA_DIR, `${week}.json`);

  try {
    await fs.unlink(filePath);
    await updateMetadata();
    console.log(`[Storage] 리포트 삭제 완료: ${week}`);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

/**
 * 오래된 리포트 정리 (기본 52주 = 1년 보관)
 */
export async function cleanupOldReports(keepWeeks = 52): Promise<number> {
  const reports = await listTrendReports();

  if (reports.length <= keepWeeks) {
    return 0;
  }

  const toDelete = reports.slice(keepWeeks);
  let deletedCount = 0;

  for (const week of toDelete) {
    if (await deleteTrendReport(week)) {
      deletedCount++;
    }
  }

  console.log(`[Storage] ${deletedCount}개 오래된 리포트 삭제 완료`);
  return deletedCount;
}

// ============================================
// 리포트 존재 여부 확인
// ============================================

/**
 * 특정 주차 리포트 존재 여부 확인
 */
export async function reportExists(week: string): Promise<boolean> {
  const filePath = path.join(DATA_DIR, `${week}.json`);

  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
