"use client";

import { useState, useCallback } from "react";
import type { ToolSlug } from "@/entities/tool";
import type { ShareState, ShareResponse } from "./types";

// ============================================
// useShare Hook
// ============================================

interface UseShareOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
}

export function useShare(options: UseShareOptions = {}) {
  const [state, setState] = useState<ShareState>({
    status: "idle",
    copied: false,
  });

  /**
   * 데이터 공유 생성
   */
  const share = useCallback(
    async (
      toolSlug: ToolSlug,
      input: string,
      toolOptions?: Record<string, unknown>,
    ): Promise<string | null> => {
      if (!input.trim()) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: "공유할 데이터가 없습니다.",
        }));
        options.onError?.("공유할 데이터가 없습니다.");
        return null;
      }

      setState((prev) => ({ ...prev, status: "loading", error: undefined }));

      try {
        const response = await fetch("/api/share", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toolSlug,
            input,
            options: toolOptions,
          }),
        });

        const data: ShareResponse = await response.json();

        if (!response.ok || !data.success) {
          const errorMsg = data.error || "공유 링크 생성에 실패했습니다.";
          setState((prev) => ({
            ...prev,
            status: "error",
            error: errorMsg,
          }));
          options.onError?.(errorMsg);
          return null;
        }

        const shareUrl = data.url || "";
        setState({
          status: "success",
          shareId: data.id,
          shareUrl,
          copied: false,
        });
        options.onSuccess?.(shareUrl);
        return shareUrl;
      } catch (error) {
        const errorMsg = "네트워크 오류가 발생했습니다.";
        setState((prev) => ({
          ...prev,
          status: "error",
          error: errorMsg,
        }));
        options.onError?.(errorMsg);
        console.error("Share error:", error);
        return null;
      }
    },
    [options],
  );

  /**
   * 공유 URL 클립보드 복사
   */
  const copyToClipboard = useCallback(async () => {
    if (!state.shareUrl) return false;

    try {
      await navigator.clipboard.writeText(state.shareUrl);
      setState((prev) => ({ ...prev, copied: true }));

      // 2초 후 copied 상태 리셋
      setTimeout(() => {
        setState((prev) => ({ ...prev, copied: false }));
      }, 2000);

      return true;
    } catch {
      return false;
    }
  }, [state.shareUrl]);

  /**
   * 상태 초기화
   */
  const reset = useCallback(() => {
    setState({
      status: "idle",
      copied: false,
    });
  }, []);

  return {
    ...state,
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    share,
    copyToClipboard,
    reset,
  };
}
