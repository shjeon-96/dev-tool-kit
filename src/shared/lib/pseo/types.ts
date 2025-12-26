/**
 * pSEO Page Factory Types
 *
 * 모든 pSEO 페이지에서 공유하는 타입 정의
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { LocaleKey } from "@/shared/lib/i18n";

/**
 * pSEO 페이지 Props
 */
export interface PSEOPageProps {
  params: Promise<{
    locale: string;
    type?: string;
    slug?: string;
  }>;
}

/**
 * 브레드크럼 아이템
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * FAQ 아이템
 */
export interface FAQItem {
  q: string;
  a: string;
}

/**
 * 로케일별 텍스트 맵
 */
export type LocalizedText = Record<LocaleKey, string>;

/**
 * pSEO 콘텐츠 인터페이스 (레지스트리 아이템의 content 필드)
 */
export interface PSEOContent {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

/**
 * pSEO 레지스트리 아이템의 기본 구조
 */
export interface PSEORegistryItem<
  TSlug extends string,
  TContent extends PSEOContent,
> {
  slug: TSlug;
  name: string;
  content: Record<LocaleKey, TContent>;
}

/**
 * pSEO 페이지 설정
 */
export interface PSEOPageConfig<
  TSlug extends string,
  TItem extends PSEORegistryItem<TSlug, PSEOContent>,
> {
  // Route configuration
  routePrefix: string; // e.g., "minify", "diff", "hash"
  paramKey: "type" | "slug"; // URL param name

  // Registry functions
  getAllSlugs: () => TSlug[];
  getBySlug: (slug: string) => TItem | undefined;
  getRelated: (currentSlug: TSlug, limit?: number) => TItem[];

  // SEO configuration
  applicationCategory: string; // e.g., "UtilitiesApplication"
  additionalKeywords?: string[]; // e.g., ["minifier", "compress", "online", "free"]

  // Localized texts
  texts: {
    categoryName: LocalizedText; // e.g., { en: "Minifiers", ko: "압축 도구", ja: "圧縮ツール" }
    relatedTitle: LocalizedText; // e.g., { en: "Related Minifiers", ko: "관련 압축 도구", ... }
    notFoundTitle: string; // e.g., "Minifier Not Found"
  };

  // Page icon
  Icon: LucideIcon;

  // Tool component
  ToolComponent: React.ComponentType<{ item: TItem; locale: string }>;

  // Optional custom sections
  renderCustomSections?: (item: TItem, locale: string) => ReactNode;

  // FAQ generator
  generateFAQs: (item: TItem, locale: string) => FAQItem[];
}

/**
 * pSEO 페이지 팩토리 반환 타입
 */
export interface PSEOPageFactory {
  generateStaticParams: () => Promise<
    { locale: string; type?: string; slug?: string }[]
  >;
  generateMetadata: (props: PSEOPageProps) => Promise<Metadata>;
  Page: (props: PSEOPageProps) => Promise<ReactNode>;
}
