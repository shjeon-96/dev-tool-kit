// ============================================
// Storage Utility Functions
// ============================================

import { formatBytes } from "./format-utils";

/**
 * SessionStorage 용량 제한 (약 5MB)
 * 브라우저마다 다르지만 보수적으로 4.5MB로 설정
 */
const SESSION_STORAGE_LIMIT = 4.5 * 1024 * 1024; // 4.5MB

/**
 * Pipeline 데이터 최대 크기 (3MB)
 * 여유 공간 확보를 위해 전체 용량보다 작게 설정
 */
export const PIPELINE_DATA_LIMIT = 3 * 1024 * 1024; // 3MB

/**
 * 문자열의 바이트 크기 계산 (UTF-8)
 */
export function getByteSize(str: string): number {
  return new Blob([str]).size;
}

/**
 * SessionStorage 현재 사용량 계산
 */
export function getSessionStorageUsage(): number {
  let total = 0;

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      const value = sessionStorage.getItem(key);
      if (value) {
        total += getByteSize(key) + getByteSize(value);
      }
    }
  }

  return total;
}

/**
 * SessionStorage 남은 용량 계산 (추정)
 */
export function getSessionStorageRemaining(): number {
  return Math.max(0, SESSION_STORAGE_LIMIT - getSessionStorageUsage());
}

/**
 * 데이터가 Pipeline 크기 제한을 초과하는지 확인
 */
export function isPipelineDataTooLarge(data: string): boolean {
  return getByteSize(data) > PIPELINE_DATA_LIMIT;
}

/**
 * Pipeline 데이터 저장 가능 여부 확인
 */
export function canStorePipelineData(data: string): {
  canStore: boolean;
  reason?: string;
  dataSize: number;
  limit: number;
} {
  const dataSize = getByteSize(data);
  const remaining = getSessionStorageRemaining();

  if (dataSize > PIPELINE_DATA_LIMIT) {
    return {
      canStore: false,
      reason: `데이터 크기(${formatBytes(dataSize)})가 제한(${formatBytes(PIPELINE_DATA_LIMIT)})을 초과합니다.`,
      dataSize,
      limit: PIPELINE_DATA_LIMIT,
    };
  }

  if (dataSize > remaining) {
    return {
      canStore: false,
      reason: `SessionStorage 남은 용량(${formatBytes(remaining)})이 부족합니다.`,
      dataSize,
      limit: remaining,
    };
  }

  return {
    canStore: true,
    dataSize,
    limit: PIPELINE_DATA_LIMIT,
  };
}

/**
 * 안전하게 SessionStorage에 저장
 */
export function safeSessionStorageSet(
  key: string,
  value: string,
): { success: boolean; error?: string } {
  try {
    sessionStorage.setItem(key, value);
    return { success: true };
  } catch (error) {
    // QuotaExceededError 처리
    if (
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED")
    ) {
      return {
        success: false,
        error: "저장 공간이 부족합니다. 일부 데이터를 삭제해주세요.",
      };
    }
    return {
      success: false,
      error: "저장 중 오류가 발생했습니다.",
    };
  }
}
