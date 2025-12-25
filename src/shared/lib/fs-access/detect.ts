"use client";

import { useSyncExternalStore } from "react";
import type { SupportLevel } from "./types";

/**
 * File System Access API 지원 감지
 *
 * useSyncExternalStore를 사용하여 SSR 환경에서 안전하게 브라우저 API 감지
 */

// 캐시된 지원 레벨 (브라우저에서만 계산)
let cachedSupportLevel: SupportLevel | null = null;

/**
 * File System Access API 지원 레벨 계산
 */
function detectSupportLevel(): SupportLevel {
  // SSR 환경
  if (typeof window === "undefined") {
    return "none";
  }

  // 캐시된 값 반환
  if (cachedSupportLevel !== null) {
    return cachedSupportLevel;
  }

  // Chrome/Edge: showDirectoryPicker 지원 확인
  if (
    "showDirectoryPicker" in window &&
    typeof window.showDirectoryPicker === "function"
  ) {
    // File System Access API 완전 지원
    cachedSupportLevel = "full";
    return "full";
  }

  // Safari/Firefox: Blob, URL.createObjectURL 지원 확인 (ZIP 폴백용)
  if (
    typeof Blob !== "undefined" &&
    typeof URL !== "undefined" &&
    "createObjectURL" in URL
  ) {
    cachedSupportLevel = "fallback";
    return "fallback";
  }

  // 지원 불가
  cachedSupportLevel = "none";
  return "none";
}

/**
 * 브라우저 지원 레벨 반환 (클라이언트)
 */
function getSnapshot(): SupportLevel {
  return detectSupportLevel();
}

/**
 * SSR 시 기본값 반환
 * fallback으로 설정하여 모든 브라우저에서 최소 기능 보장
 */
function getServerSnapshot(): SupportLevel {
  return "fallback";
}

/**
 * 구독 함수 (API 지원 레벨은 변경되지 않으므로 빈 구현)
 */
function subscribe(): () => void {
  // File System Access API 지원 여부는 런타임에 변경되지 않음
  return () => {};
}

/**
 * File System Access API 지원 레벨을 감지하는 Hook
 *
 * @returns 지원 레벨 및 관련 정보
 *
 * @example
 * ```tsx
 * const { supportLevel, isSupported, isFallback } = useFSAccessSupport();
 *
 * if (isSupported) {
 *   // Chrome/Edge: 폴더 직접 읽기/쓰기
 * } else if (isFallback) {
 *   // Safari/Firefox: ZIP 다운로드
 * }
 * ```
 */
export function useFSAccessSupport() {
  const supportLevel = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    /** 브라우저 지원 레벨 */
    supportLevel,
    /** Chrome/Edge 완전 지원 여부 */
    isSupported: supportLevel === "full",
    /** 부분 지원 여부 */
    isPartial: supportLevel === "partial",
    /** 폴백 모드 여부 (Safari/Firefox) */
    isFallback: supportLevel === "fallback",
    /** 지원 불가 여부 */
    isNone: supportLevel === "none",
    /** 사용 가능 여부 (full 또는 fallback) */
    canUse: supportLevel === "full" || supportLevel === "fallback",
  };
}

/**
 * File System Access API 지원 여부 확인 (비-Hook 버전)
 * 이벤트 핸들러 등 Hook 외부에서 사용
 */
export function checkFSAccessSupport(): {
  supportLevel: SupportLevel;
  isSupported: boolean;
  isFallback: boolean;
  canUse: boolean;
} {
  const supportLevel = detectSupportLevel();

  return {
    supportLevel,
    isSupported: supportLevel === "full",
    isFallback: supportLevel === "fallback",
    canUse: supportLevel === "full" || supportLevel === "fallback",
  };
}

/**
 * 브라우저 정보 감지
 */
export function detectBrowser(): {
  name: string;
  isChrome: boolean;
  isEdge: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  supportsFullAPI: boolean;
} {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      name: "unknown",
      isChrome: false,
      isEdge: false,
      isSafari: false,
      isFirefox: false,
      supportsFullAPI: false,
    };
  }

  const ua = navigator.userAgent;

  // Edge (Chromium 기반)
  if (ua.includes("Edg/")) {
    return {
      name: "Edge",
      isChrome: false,
      isEdge: true,
      isSafari: false,
      isFirefox: false,
      supportsFullAPI: true,
    };
  }

  // Chrome
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
    return {
      name: "Chrome",
      isChrome: true,
      isEdge: false,
      isSafari: false,
      isFirefox: false,
      supportsFullAPI: true,
    };
  }

  // Safari
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
    return {
      name: "Safari",
      isChrome: false,
      isEdge: false,
      isSafari: true,
      isFirefox: false,
      supportsFullAPI: false,
    };
  }

  // Firefox
  if (ua.includes("Firefox/")) {
    return {
      name: "Firefox",
      isChrome: false,
      isEdge: false,
      isSafari: false,
      isFirefox: true,
      supportsFullAPI: false,
    };
  }

  return {
    name: "unknown",
    isChrome: false,
    isEdge: false,
    isSafari: false,
    isFirefox: false,
    supportsFullAPI: false,
  };
}

// Cached browser info for useSyncExternalStore
let cachedBrowserInfo: ReturnType<typeof detectBrowser> | null = null;

function subscribeBrowserInfo(): () => void {
  // Browser info doesn't change at runtime
  return () => {};
}

function getBrowserInfoSnapshot(): ReturnType<typeof detectBrowser> {
  if (cachedBrowserInfo === null) {
    cachedBrowserInfo = detectBrowser();
  }
  return cachedBrowserInfo;
}

const serverBrowserInfo = {
  name: "unknown",
  isChrome: false,
  isEdge: false,
  isSafari: false,
  isFirefox: false,
  supportsFullAPI: false,
} as const;

function getBrowserInfoServerSnapshot(): typeof serverBrowserInfo {
  return serverBrowserInfo;
}

/**
 * 브라우저 정보 Hook
 */
export function useBrowserInfo() {
  const browserInfo = useSyncExternalStore(
    subscribeBrowserInfo,
    getBrowserInfoSnapshot,
    getBrowserInfoServerSnapshot,
  );

  return browserInfo;
}
