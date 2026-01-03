import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import LZString from "lz-string";
import type { ToolSlug } from "@/shared/types/tool";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("kv");

// ============================================
// Magic Share - Vercel KV Configuration
// ============================================

/**
 * 공유 데이터의 최대 유효 기간 (30일)
 */
const SHARE_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

/**
 * 공유 ID 길이 (nanoid)
 */
const SHARE_ID_LENGTH = 8;

/**
 * 최대 데이터 크기 (압축 전 기준, 1MB)
 */
export const MAX_SHARE_DATA_SIZE = 1 * 1024 * 1024; // 1MB

/**
 * Rate Limit 설정 (IP당)
 */
export const RATE_LIMIT = {
  maxRequests: 10, // 최대 요청 수
  windowSeconds: 60, // 시간 윈도우 (1분)
} as const;

// ============================================
// In-Memory LRU Cache Fallback for Rate Limiting
// Used when Vercel KV is unavailable
// ============================================

interface RateLimitEntry {
  count: number;
  expiresAt: number;
}

/**
 * Simple LRU Cache for rate limiting fallback
 * Max 10,000 entries to prevent memory issues
 */
class RateLimitCache {
  private readonly maxSize = 10_000;
  private cache = new Map<string, RateLimitEntry>();

  get(key: string): RateLimitEntry | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check expiration
    if (entry.expiresAt < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }

    // LRU: Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry;
  }

  set(key: string, entry: RateLimitEntry): void {
    // Evict oldest entries if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, entry);
  }

  increment(key: string): RateLimitEntry {
    const existing = this.get(key);
    if (existing) {
      existing.count++;
      this.cache.set(key, existing);
      return existing;
    }
    const newEntry: RateLimitEntry = {
      count: 1,
      expiresAt: Date.now() + RATE_LIMIT.windowSeconds * 1000,
    };
    this.set(key, newEntry);
    return newEntry;
  }
}

// Singleton instance for fallback rate limiting
const rateLimitCache = new RateLimitCache();

// ============================================
// Share Data Types
// ============================================

export interface ShareData {
  toolSlug: ToolSlug;
  input: string;
  options?: Record<string, unknown>;
  createdAt: number;
  expiresAt: number;
}

export interface ShareResult {
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}

export interface ShareRetrieveResult {
  success: boolean;
  data?: ShareData;
  error?: string;
}

// ============================================
// Compression Utilities
// ============================================

/**
 * 데이터를 압축하여 문자열로 변환
 */
export function compressData(data: ShareData): string {
  const json = JSON.stringify(data);
  return LZString.compressToEncodedURIComponent(json);
}

/**
 * 압축된 문자열을 데이터로 변환
 */
export function decompressData(compressed: string): ShareData | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(compressed);
    if (!json) return null;
    return JSON.parse(json) as ShareData;
  } catch {
    return null;
  }
}

// ============================================
// KV Operations
// ============================================

/**
 * 공유 데이터 저장
 */
export async function saveShareData(
  toolSlug: ToolSlug,
  input: string,
  options?: Record<string, unknown>,
): Promise<ShareResult> {
  try {
    // 데이터 크기 검증
    const dataSize = new Blob([input]).size;
    if (dataSize > MAX_SHARE_DATA_SIZE) {
      return {
        success: false,
        error: `Data size (${formatSize(dataSize)}) exceeds maximum allowed (${formatSize(MAX_SHARE_DATA_SIZE)})`,
      };
    }

    // 공유 ID 생성
    const id = nanoid(SHARE_ID_LENGTH);

    // 공유 데이터 구성
    const now = Date.now();
    const shareData: ShareData = {
      toolSlug,
      input,
      options,
      createdAt: now,
      expiresAt: now + SHARE_TTL_SECONDS * 1000,
    };

    // 압축 후 저장
    const compressed = compressData(shareData);

    // Vercel KV에 저장
    await kv.set(`share:${id}`, compressed, {
      ex: SHARE_TTL_SECONDS,
    });

    return {
      success: true,
      id,
    };
  } catch (error) {
    logger.error("Failed to save share data", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      success: false,
      error: "Failed to create share link. Please try again.",
    };
  }
}

/**
 * 공유 데이터 조회
 */
export async function getShareData(id: string): Promise<ShareRetrieveResult> {
  try {
    const compressed = await kv.get<string>(`share:${id}`);

    if (!compressed) {
      return {
        success: false,
        error: "Share link not found or expired",
      };
    }

    const data = decompressData(compressed);
    if (!data) {
      return {
        success: false,
        error: "Failed to decompress share data",
      };
    }

    // 만료 확인
    if (data.expiresAt < Date.now()) {
      return {
        success: false,
        error: "Share link has expired",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error("Failed to get share data", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      success: false,
      error: "Failed to retrieve share data",
    };
  }
}

/**
 * 공유 데이터 삭제 (선택적)
 */
export async function deleteShareData(id: string): Promise<boolean> {
  try {
    await kv.del(`share:${id}`);
    return true;
  } catch {
    return false;
  }
}

// ============================================
// Rate Limiting
// ============================================

/**
 * Rate Limit 키 생성
 */
function getRateLimitKey(ip: string): string {
  return `ratelimit:share:${ip}`;
}

/**
 * Rate Limit 체크 및 증가
 * Primary: Vercel KV (distributed)
 * Fallback: In-memory LRU cache (server-local)
 */
export async function checkRateLimit(
  ip: string,
): Promise<{
  allowed: boolean;
  remaining: number;
  resetAt: number;
  source: "kv" | "memory";
}> {
  const key = getRateLimitKey(ip);

  try {
    // Primary: Use Vercel KV for distributed rate limiting
    const current = (await kv.get<number>(key)) ?? 0;

    if (current >= RATE_LIMIT.maxRequests) {
      const ttl = await kv.ttl(key);
      return {
        allowed: false,
        remaining: 0,
        resetAt: Date.now() + ttl * 1000,
        source: "kv",
      };
    }

    // Increment count
    if (current === 0) {
      await kv.set(key, 1, { ex: RATE_LIMIT.windowSeconds });
    } else {
      await kv.incr(key);
    }

    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - current - 1,
      resetAt: Date.now() + RATE_LIMIT.windowSeconds * 1000,
      source: "kv",
    };
  } catch (error) {
    // Fallback: Use in-memory LRU cache when KV is unavailable
    logger.warn("KV unavailable, using in-memory fallback", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    const entry = rateLimitCache.increment(ip);

    if (entry.count > RATE_LIMIT.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.expiresAt,
        source: "memory",
      };
    }

    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - entry.count,
      resetAt: entry.expiresAt,
      source: "memory",
    };
  }
}

// ============================================
// Utilities
// ============================================

/**
 * 바이트를 읽기 쉬운 형식으로 변환
 */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 공유 URL 생성
 */
export function createShareUrl(id: string, baseUrl: string): string {
  return `${baseUrl}/s/${id}`;
}

/**
 * 공유 가능 여부 확인
 */
export function canShare(input: string): {
  canShare: boolean;
  reason?: string;
  size: number;
  maxSize: number;
} {
  const size = new Blob([input]).size;

  if (size === 0) {
    return {
      canShare: false,
      reason: "No data to share",
      size,
      maxSize: MAX_SHARE_DATA_SIZE,
    };
  }

  if (size > MAX_SHARE_DATA_SIZE) {
    return {
      canShare: false,
      reason: `Data too large (${formatSize(size)} > ${formatSize(MAX_SHARE_DATA_SIZE)})`,
      size,
      maxSize: MAX_SHARE_DATA_SIZE,
    };
  }

  return {
    canShare: true,
    size,
    maxSize: MAX_SHARE_DATA_SIZE,
  };
}
