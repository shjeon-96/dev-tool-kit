import type { ToolSlug } from "@/entities/tool";

// ============================================
// Share Feature Types
// ============================================

/**
 * 공유 요청 데이터
 */
export interface ShareRequest {
  toolSlug: ToolSlug;
  input: string;
  options?: Record<string, unknown>;
}

/**
 * 공유 API 응답
 */
export interface ShareResponse {
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
  expiresAt?: number;
}

/**
 * 공유 데이터 조회 응답
 */
export interface ShareDataResponse {
  success: boolean;
  data?: {
    toolSlug: ToolSlug;
    input: string;
    options?: Record<string, unknown>;
    createdAt: number;
    expiresAt: number;
  };
  error?: string;
}

/**
 * 공유 버튼 상태
 */
export type ShareStatus = "idle" | "loading" | "success" | "error";

/**
 * 공유 UI 상태
 */
export interface ShareState {
  status: ShareStatus;
  shareId?: string;
  shareUrl?: string;
  error?: string;
  copied: boolean;
}
