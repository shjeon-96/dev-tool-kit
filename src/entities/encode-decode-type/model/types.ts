/**
 * Encode/Decode Type 정의
 */

export interface EncodeDecodeType {
  slug: string;
  name: string;
  mode: "encode" | "decode" | "both";
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
  category: "text" | "url" | "html" | "binary" | "format";
}

export type LocaleKey = "en" | "ko" | "ja";
