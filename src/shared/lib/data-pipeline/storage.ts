/**
 * 트렌드 데이터 저장소
 *
 * 환경별 스토리지 전략:
 * - Vercel (프로덕션): Vercel KV 사용
 * - 로컬 개발: 파일 시스템 사용
 */

import type { WeeklyTrendReport, StorageMetadata } from "./types";

// ============================================
// 환경 감지
// ============================================

const IS_VERCEL = process.env.VERCEL === "1";

// ============================================
// Vercel KV 스토리지 (프로덕션)
// ============================================

async function getKV() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

const KV_PREFIX = {
  TREND_REPORT: "trend:",
  METADATA: "trend:_metadata",
  CACHE: "cache:",
  REPORT_LIST: "trend:_list",
};

// ============================================
// 파일 시스템 스토리지 (로컬 개발)
// ============================================

import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "trends");
const METADATA_FILE = path.join(DATA_DIR, "_metadata.json");
const CACHE_DIR = path.join(process.cwd(), "data", "cache");

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

async function ensureCacheDir(): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

// ============================================
// 주간 트렌드 리포트 저장
// ============================================

export async function saveTrendReport(
  report: WeeklyTrendReport,
): Promise<void> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const key = `${KV_PREFIX.TREND_REPORT}${report.week}`;

    // 리포트 저장
    await kv.set(key, report);

    // 리포트 목록 업데이트
    const existingList = (await kv.get<string[]>(KV_PREFIX.REPORT_LIST)) || [];
    if (!existingList.includes(report.week)) {
      existingList.push(report.week);
      existingList.sort().reverse();
      await kv.set(KV_PREFIX.REPORT_LIST, existingList);
    }

    // 메타데이터 업데이트
    await updateMetadataKV(existingList.length);

    console.log(`[Storage:KV] 리포트 저장 완료: ${report.week}`);
  } else {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, `${report.week}.json`);
    await fs.writeFile(filePath, JSON.stringify(report, null, 2), "utf-8");
    await updateMetadataFS();
    console.log(`[Storage:FS] 리포트 저장 완료: ${filePath}`);
  }
}

async function updateMetadataKV(recordCount: number): Promise<void> {
  const kv = await getKV();
  const metadata: StorageMetadata = {
    version: "1.0",
    lastUpdated: new Date().toISOString(),
    recordCount,
  };
  await kv.set(KV_PREFIX.METADATA, metadata);
}

async function updateMetadataFS(): Promise<void> {
  const reports = await listTrendReportsFS();
  const metadata: StorageMetadata = {
    version: "1.0",
    lastUpdated: new Date().toISOString(),
    recordCount: reports.length,
  };
  await fs.writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2), "utf-8");
}

// ============================================
// 트렌드 리포트 조회
// ============================================

export async function getTrendReport(
  week: string,
): Promise<WeeklyTrendReport | null> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const key = `${KV_PREFIX.TREND_REPORT}${week}`;
    return kv.get<WeeklyTrendReport>(key);
  } else {
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
}

export async function getLatestTrendReport(): Promise<WeeklyTrendReport | null> {
  const reports = await listTrendReports();

  if (reports.length === 0) {
    return null;
  }

  return getTrendReport(reports[0]);
}

// ============================================
// 리포트 목록 조회
// ============================================

async function listTrendReportsFS(): Promise<string[]> {
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

export async function listTrendReports(): Promise<string[]> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const list = await kv.get<string[]>(KV_PREFIX.REPORT_LIST);
    return list || [];
  } else {
    return listTrendReportsFS();
  }
}

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

// ============================================
// 메타데이터 조회
// ============================================

export async function getStorageMetadata(): Promise<StorageMetadata | null> {
  if (IS_VERCEL) {
    const kv = await getKV();
    return kv.get<StorageMetadata>(KV_PREFIX.METADATA);
  } else {
    try {
      const content = await fs.readFile(METADATA_FILE, "utf-8");
      return JSON.parse(content) as StorageMetadata;
    } catch {
      return null;
    }
  }
}

// ============================================
// 리포트 삭제
// ============================================

export async function deleteTrendReport(week: string): Promise<boolean> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const key = `${KV_PREFIX.TREND_REPORT}${week}`;

    // 삭제
    await kv.del(key);

    // 목록에서 제거
    const existingList = (await kv.get<string[]>(KV_PREFIX.REPORT_LIST)) || [];
    const newList = existingList.filter((w) => w !== week);
    await kv.set(KV_PREFIX.REPORT_LIST, newList);

    // 메타데이터 업데이트
    await updateMetadataKV(newList.length);

    console.log(`[Storage:KV] 리포트 삭제 완료: ${week}`);
    return true;
  } else {
    const filePath = path.join(DATA_DIR, `${week}.json`);

    try {
      await fs.unlink(filePath);
      await updateMetadataFS();
      console.log(`[Storage:FS] 리포트 삭제 완료: ${week}`);
      return true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return false;
      }
      throw error;
    }
  }
}

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

export async function reportExists(week: string): Promise<boolean> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const key = `${KV_PREFIX.TREND_REPORT}${week}`;
    const exists = await kv.exists(key);
    return exists > 0;
  } else {
    const filePath = path.join(DATA_DIR, `${week}.json`);

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

// ============================================
// 일반 캐시 저장소 (Fallback 오케스트레이터용)
// ============================================

export async function saveToStorage<T>(key: string, data: T): Promise<void> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const kvKey = `${KV_PREFIX.CACHE}${key}`;
    // 6시간 TTL 설정
    await kv.set(kvKey, data, { ex: 6 * 60 * 60 });
  } else {
    await ensureCacheDir();
    const filePath = path.join(CACHE_DIR, `${key}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }
}

export async function loadFromStorage<T>(key: string): Promise<T | null> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const kvKey = `${KV_PREFIX.CACHE}${key}`;
    return kv.get<T>(kvKey);
  } else {
    const filePath = path.join(CACHE_DIR, `${key}.json`);

    try {
      const content = await fs.readFile(filePath, "utf-8");
      return JSON.parse(content) as T;
    } catch {
      return null;
    }
  }
}

export async function deleteFromStorage(key: string): Promise<boolean> {
  if (IS_VERCEL) {
    const kv = await getKV();
    const kvKey = `${KV_PREFIX.CACHE}${key}`;
    await kv.del(kvKey);
    return true;
  } else {
    const filePath = path.join(CACHE_DIR, `${key}.json`);

    try {
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
