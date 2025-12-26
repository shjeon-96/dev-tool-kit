import type { LocaleKey, LocalizedContent } from "@/shared/lib/i18n";
import type { CategorizedRegistryItem } from "@/shared/lib/registry";

export type MinifyTypeSlug =
  | "json"
  | "javascript"
  | "css"
  | "html"
  | "xml"
  | "svg"
  | "sql";

export type MinifyCategory = "data" | "code" | "markup";

/**
 * Minify 타입의 로컬라이즈된 콘텐츠
 */
export interface MinifyTypeContent {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  benefits: string[];
  useCases: string[];
}

/**
 * Minify 타입 레지스트리 아이템
 */
export interface MinifyType extends CategorizedRegistryItem<
  MinifyTypeSlug,
  MinifyCategory
> {
  fileExtension: string;
  mimeType: string;
  content: LocalizedContent<MinifyTypeContent>;
}

// Re-export for backward compatibility
export type { LocaleKey };
