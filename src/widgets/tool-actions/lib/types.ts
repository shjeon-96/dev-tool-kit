/**
 * Tool Actions Types
 *
 * 도구 액션 바 관련 타입 정의
 */

import type { ToolSlug } from "@/entities/tool";
import type { ExplainContext } from "@/features/ai-explain";

/**
 * 도구 액션 바 Props
 */
export interface ToolActionsBarProps {
  toolSlug: ToolSlug;
  input: string;
  output: string;
  context?: ExplainContext;
  className?: string;
}

/**
 * FAB 메뉴 아이템
 */
export interface FabMenuItem {
  id: string;
  label: string;
  delay: number;
  visible: boolean;
  component: React.ReactNode;
}

/**
 * 모바일 메뉴 아이템 라벨
 */
export const MOBILE_MENU_LABELS = {
  workspace: "워크스페이스에 저장",
  pipeline: "다른 도구로 전송",
  aiExplain: "AI 분석",
  share: "공유 링크",
} as const;

export type MobileMenuLabelKey = keyof typeof MOBILE_MENU_LABELS;
