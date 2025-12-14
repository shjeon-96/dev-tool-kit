"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { ShareDataResponse } from "./types";

// ============================================
// useSharedData Hook
// ============================================

interface SharedData {
  input: string;
  options?: Record<string, unknown>;
  createdAt: number;
  expiresAt: number;
}

interface UseSharedDataResult {
  sharedData: SharedData | null;
  isLoading: boolean;
  error: string | null;
  hasSharedData: boolean;
  clearSharedData: () => void;
}

/**
 * URL의 shared 파라미터에서 공유 데이터를 로드하는 훅
 */
export function useSharedData(): UseSharedDataResult {
  const searchParams = useSearchParams();
  const sharedId = searchParams?.get("shared") ?? null;

  const [sharedData, setSharedData] = useState<SharedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSharedData = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/share/${id}`);
      const data: ShareDataResponse = await response.json();

      if (!response.ok || !data.success || !data.data) {
        setError(data.error || "Failed to load shared data");
        setSharedData(null);
        return;
      }

      setSharedData({
        input: data.data.input,
        options: data.data.options,
        createdAt: data.data.createdAt,
        expiresAt: data.data.expiresAt,
      });
    } catch (err) {
      console.error("Failed to fetch shared data:", err);
      setError("Network error while loading shared data");
      setSharedData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sharedId) {
      fetchSharedData(sharedId);
    } else {
      setSharedData(null);
      setError(null);
    }
  }, [sharedId, fetchSharedData]);

  const clearSharedData = useCallback(() => {
    setSharedData(null);
    setError(null);

    // URL에서 shared 파라미터 제거
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("shared");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return {
    sharedData,
    isLoading,
    error,
    hasSharedData: !!sharedId,
    clearSharedData,
  };
}
