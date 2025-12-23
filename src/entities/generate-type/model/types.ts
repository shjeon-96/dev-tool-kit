/**
 * Generator type definitions for pSEO pages
 */

export interface GenerateType {
  slug: string;
  name: string;
  title: {
    en: string;
    ko: string;
    ja: string;
  };
  description: {
    en: string;
    ko: string;
    ja: string;
  };
  keywords: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  useCases?: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  category: "identifier" | "security" | "text" | "data" | "design";
  outputExample: string;
}

export type LocaleKey = "en" | "ko" | "ja";
