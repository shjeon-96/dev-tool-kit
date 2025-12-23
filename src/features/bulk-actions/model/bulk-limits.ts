/**
 * Bulk Actions Limits Configuration
 *
 * 티어별 대량 작업 제한
 */

import type { TierType } from "@/entities/subscription";

export interface BulkLimits {
  jsonFormatter: {
    maxFiles: number;
    maxFileSizeKB: number;
  };
  hashGenerator: {
    maxItems: number;
    maxFileSizeMB: number;
  };
  qrGenerator: {
    maxItems: number;
  };
  imageResizer: {
    maxItems: number;
    maxFileSizeMB: number;
  };
}

export const BULK_LIMITS: Record<TierType, BulkLimits> = {
  free: {
    jsonFormatter: {
      maxFiles: 1,
      maxFileSizeKB: 100,
    },
    hashGenerator: {
      maxItems: 5,
      maxFileSizeMB: 5,
    },
    qrGenerator: {
      maxItems: 1,
    },
    imageResizer: {
      maxItems: 3,
      maxFileSizeMB: 5,
    },
  },
  pro: {
    jsonFormatter: {
      maxFiles: 100,
      maxFileSizeKB: 5000, // 5MB per file
    },
    hashGenerator: {
      maxItems: 500,
      maxFileSizeMB: 100,
    },
    qrGenerator: {
      maxItems: 50,
    },
    imageResizer: {
      maxItems: 100,
      maxFileSizeMB: 50,
    },
  },
};

/**
 * 티어별 제한 가져오기
 */
export function getBulkLimits(tier: TierType): BulkLimits {
  return BULK_LIMITS[tier];
}

/**
 * 제한 초과 여부 확인
 */
export function isLimitExceeded(current: number, limit: number): boolean {
  return current > limit;
}
