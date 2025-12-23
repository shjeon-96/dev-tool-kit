/**
 * Hash Type 정의
 */

export interface HashType {
  slug: string;
  algorithm: string;
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
  outputLength?: number; // bits
  isSecure: boolean; // 보안용으로 권장되는지
}

export type LocaleKey = "en" | "ko" | "ja";
