/**
 * Data format type definitions for pSEO pages
 */

export interface FormatType {
  slug: string;
  name: string;
  fileExtension: string;
  mimeType: string;
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
  category: "data" | "config" | "markup" | "document";
  isHumanReadable: boolean;
  supportsComments: boolean;
}

export type LocaleKey = "en" | "ko" | "ja";
