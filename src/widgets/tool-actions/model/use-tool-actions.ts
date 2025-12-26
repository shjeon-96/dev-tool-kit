"use client";

/**
 * useToolActions Hook
 *
 * 도구 액션 바 상태 관리 Hook
 * - 모바일 FAB 메뉴 상태
 * - 액션 가용성 판단
 * - 연결 가능 도구 조회
 */

import { useState, useCallback, useMemo } from "react";
import { getConnectableTools } from "@/features/tool-pipeline";
import type { ToolSlug } from "@/entities/tool";

interface UseToolActionsProps {
  toolSlug: ToolSlug;
  input: string;
  output: string;
}

interface UseToolActionsReturn {
  // 모바일 메뉴 상태
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // 연결 가능 도구
  connectableTools: ReturnType<typeof getConnectableTools>;

  // 조건
  hasActions: boolean;
  hasInput: boolean;
  hasOutput: boolean;
  hasPipelineTarget: boolean;
  hasShareableContent: boolean;
}

export function useToolActions({
  toolSlug,
  input,
  output,
}: UseToolActionsProps): UseToolActionsReturn {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 연결 가능한 도구 목록
  const connectableTools = useMemo(
    () => getConnectableTools(toolSlug),
    [toolSlug],
  );

  // 메뉴 액션
  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // 조건 계산
  const hasInput = !!input;
  const hasOutput = !!output;
  const hasPipelineTarget = hasOutput && connectableTools.length > 0;
  const hasShareableContent = hasInput || hasOutput;
  const hasActions = hasInput || hasOutput || connectableTools.length > 0;

  return {
    // 모바일 메뉴 상태
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,

    // 연결 가능 도구
    connectableTools,

    // 조건
    hasActions,
    hasInput,
    hasOutput,
    hasPipelineTarget,
    hasShareableContent,
  };
}
