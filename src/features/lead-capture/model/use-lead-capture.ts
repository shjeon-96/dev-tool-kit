"use client";

import { useState, useCallback } from "react";
import type { LeadCaptureState } from "./types";

const LEAD_CAPTURE_DISMISSED_KEY = "lead-capture-dismissed";
const LEAD_CAPTURE_SUBMITTED_KEY = "lead-capture-submitted";

export function useLeadCapture() {
  const [state, setState] = useState<LeadCaptureState>({
    isOpen: false,
    toolSlug: null,
    pendingDownload: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 이미 Lead Magnet을 받았거나 닫은 적이 있는지 확인
   */
  const hasInteracted = useCallback((toolSlug: string): boolean => {
    if (typeof window === "undefined") return false;

    const dismissed = localStorage.getItem(LEAD_CAPTURE_DISMISSED_KEY);
    const submitted = localStorage.getItem(LEAD_CAPTURE_SUBMITTED_KEY);

    const dismissedTools = dismissed ? JSON.parse(dismissed) : [];
    const submittedTools = submitted ? JSON.parse(submitted) : [];

    return (
      dismissedTools.includes(toolSlug) || submittedTools.includes(toolSlug)
    );
  }, []);

  /**
   * Lead Capture 모달 열기
   */
  const openModal = useCallback(
    (toolSlug: string, onDownload: () => void) => {
      // 이미 상호작용했으면 바로 다운로드
      if (hasInteracted(toolSlug)) {
        onDownload();
        return;
      }

      setState({
        isOpen: true,
        toolSlug,
        pendingDownload: onDownload,
      });
    },
    [hasInteracted],
  );

  /**
   * 모달 닫기 (건너뛰기)
   */
  const closeModal = useCallback(
    (skipAndDownload: boolean = false) => {
      if (skipAndDownload && state.toolSlug) {
        // 건너뛰기 기록
        const dismissed = localStorage.getItem(LEAD_CAPTURE_DISMISSED_KEY);
        const dismissedTools = dismissed ? JSON.parse(dismissed) : [];
        if (!dismissedTools.includes(state.toolSlug)) {
          dismissedTools.push(state.toolSlug);
          localStorage.setItem(
            LEAD_CAPTURE_DISMISSED_KEY,
            JSON.stringify(dismissedTools),
          );
        }

        // 다운로드 실행
        state.pendingDownload?.();
      }

      setState({
        isOpen: false,
        toolSlug: null,
        pendingDownload: null,
      });
      setError(null);
    },
    [state.toolSlug, state.pendingDownload],
  );

  /**
   * 이메일 제출
   */
  const submitEmail = useCallback(
    async (email: string, leadMagnetId: string, personaTag: string) => {
      if (!state.toolSlug) return;

      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch("/api/leads/capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            sourceTool: state.toolSlug,
            leadMagnetId,
            personaTag,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to submit email");
        }

        // 제출 기록
        const submitted = localStorage.getItem(LEAD_CAPTURE_SUBMITTED_KEY);
        const submittedTools = submitted ? JSON.parse(submitted) : [];
        if (!submittedTools.includes(state.toolSlug)) {
          submittedTools.push(state.toolSlug);
          localStorage.setItem(
            LEAD_CAPTURE_SUBMITTED_KEY,
            JSON.stringify(submittedTools),
          );
        }

        // 다운로드 실행
        state.pendingDownload?.();

        // 모달 닫기
        setState({
          isOpen: false,
          toolSlug: null,
          pendingDownload: null,
        });

        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [state.toolSlug, state.pendingDownload],
  );

  return {
    isOpen: state.isOpen,
    toolSlug: state.toolSlug,
    isSubmitting,
    error,
    openModal,
    closeModal,
    submitEmail,
    hasInteracted,
  };
}
