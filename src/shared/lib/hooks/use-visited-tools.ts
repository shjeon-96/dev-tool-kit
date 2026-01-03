"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { z } from "zod";
import {
  safeGetRawItem,
  safeSetItem,
  safeRemoveItem,
} from "@/shared/lib/storage";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("visited-tools");
const STORAGE_KEY = "visited-tools";
const MAX_ITEMS = 50;

// Cached storage value for useSyncExternalStore
let cachedStorageValue: string[] | null = null;
let cachedStorageRaw: string | null = null;

// localStorage 구독 함수
function subscribeToStorage(callback: () => void) {
  const handleStorageChange = () => {
    // Invalidate cache when storage changes
    cachedStorageValue = null;
    cachedStorageRaw = null;
    callback();
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}

// Zod schema for storage validation
const visitedToolsSchema = z.array(z.string()).max(MAX_ITEMS).catch([]);

function getStorageSnapshot(): string[] {
  if (typeof window === "undefined") return emptyArray;

  const stored = safeGetRawItem(STORAGE_KEY);

  // Return cached value if storage hasn't changed
  if (stored === cachedStorageRaw && cachedStorageValue !== null) {
    return cachedStorageValue;
  }

  // Update cache
  cachedStorageRaw = stored;
  if (!stored) {
    cachedStorageValue = emptyArray;
    return emptyArray;
  }

  // Parse and validate
  const parseResult = visitedToolsSchema.safeParse(JSON.parse(stored));
  if (parseResult.success) {
    cachedStorageValue = parseResult.data;
    return parseResult.data;
  }

  logger.debug("Invalid visited-tools data, using default", {
    error: parseResult.error.message,
  });
  cachedStorageValue = emptyArray;
  return emptyArray;
}

// Stable empty array reference for server snapshot
const emptyArray: string[] = [];

function getServerSnapshot(): string[] {
  return emptyArray;
}

/**
 * 사용자가 방문한 도구 목록을 추적하는 Hook
 * Smart Internal Links에서 사용자 히스토리 기반 추천에 활용
 */
export function useVisitedTools() {
  const storedTools = useSyncExternalStore(
    subscribeToStorage,
    getStorageSnapshot,
    getServerSnapshot,
  );
  const [localTools, setLocalTools] = useState<string[]>(storedTools);
  const isLoaded = typeof window !== "undefined";

  // 현재 도구 목록 (로컬 상태와 스토리지 병합)
  const visitedTools = localTools.length > 0 ? localTools : storedTools;

  // 도구 방문 기록
  const recordVisit = useCallback((slug: string) => {
    setLocalTools((prev) => {
      // 중복 추가 (빈도 기반 추천을 위해)
      const updated = [slug, ...prev].slice(0, MAX_ITEMS);
      safeSetItem(STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  // 히스토리 초기화
  const clearVisitedTools = useCallback(() => {
    setLocalTools([]);
    safeRemoveItem(STORAGE_KEY);
  }, []);

  // 고유 방문 도구 목록
  const uniqueVisitedTools = [...new Set(visitedTools)] as string[];

  return {
    visitedTools,
    uniqueVisitedTools,
    recordVisit,
    clearVisitedTools,
    isLoaded,
    visitCount: visitedTools.length,
  };
}
