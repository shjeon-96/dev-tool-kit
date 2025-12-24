"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import type { ToolSlug } from "@/entities/tool/model/types";

const STORAGE_KEY = "visited-tools";
const MAX_ITEMS = 50;

// localStorage 구독 함수
function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStorageSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getServerSnapshot(): string[] {
  return [];
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
  const recordVisit = useCallback((slug: ToolSlug) => {
    setLocalTools((prev) => {
      // 중복 추가 (빈도 기반 추천을 위해)
      const updated = [slug, ...prev].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage 저장 실패 시 무시
      }
      return updated;
    });
  }, []);

  // 히스토리 초기화
  const clearVisitedTools = useCallback(() => {
    setLocalTools([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage 삭제 실패 시 무시
    }
  }, []);

  // 고유 방문 도구 목록
  const uniqueVisitedTools = [...new Set(visitedTools)] as ToolSlug[];

  return {
    visitedTools,
    uniqueVisitedTools,
    recordVisit,
    clearVisitedTools,
    isLoaded,
    visitCount: visitedTools.length,
  };
}
