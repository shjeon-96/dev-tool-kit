export interface SerpData {
  url: string;
  title: string;
  description: string;
  favicon?: string;
}

export interface SerpAnalysis {
  title: {
    length: number;
    pixelWidth: number;
    status: "optimal" | "short" | "long";
    message: string;
  };
  description: {
    length: number;
    pixelWidth: number;
    status: "optimal" | "short" | "long";
    message: string;
  };
  url: {
    length: number;
    isValid: boolean;
    displayUrl: string;
  };
}

export const LIMITS = {
  TITLE: {
    MIN_CHARS: 30,
    MAX_CHARS: 60,
    MAX_PIXELS_DESKTOP: 600,
    MAX_PIXELS_MOBILE: 540,
  },
  DESCRIPTION: {
    MIN_CHARS: 120,
    MAX_CHARS: 160,
    MAX_PIXELS_DESKTOP: 920,
    MAX_PIXELS_MOBILE: 680,
  },
} as const;

export const SAMPLE_DATA: SerpData = {
  url: "https://web-toolkit.app/tools/json-formatter",
  title: "JSON Formatter & Validator - Free Online Tool | Web Toolkit",
  description:
    "Format, validate, and beautify JSON data instantly. 100% client-side processing - your data never leaves your browser. No signup required.",
};

export type DeviceType = "desktop" | "mobile";
