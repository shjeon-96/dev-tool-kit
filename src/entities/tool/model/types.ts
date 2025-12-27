import type { LucideIcon } from "lucide-react";

// Re-export types from shared layer for backward compatibility
export type { ToolSlug, ToolCategory } from "@/shared/types/tool";
import type { ToolSlug } from "@/shared/types/tool";

export interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
  category: "text" | "media" | "security" | "converters";
  /** Pro 전용 기능 여부 */
  isPremium?: boolean;
  /** 무료 사용자 일일 사용 제한 (미설정 시 무제한) */
  freeLimit?: number;
  /** 관련 도구 목록 (내부 링크 SEO 강화) */
  relatedTools?: ToolSlug[];
  /** 주요 특징 목록 */
  features?: string[];
  /** FAQ 항목 키 목록 */
  faq?: string[];
}
