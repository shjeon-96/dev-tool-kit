/**
 * OCR Scanner Types
 */

export type OCRLanguage =
  | "eng"
  | "kor"
  | "jpn"
  | "eng+kor"
  | "eng+jpn"
  | "kor+jpn"
  | "eng+kor+jpn";

export interface OCRLanguageOption {
  value: OCRLanguage;
  label: string;
  description: string;
}

export const OCR_LANGUAGES: OCRLanguageOption[] = [
  { value: "eng", label: "English", description: "English only" },
  { value: "kor", label: "Korean", description: "Korean only" },
  { value: "jpn", label: "Japanese", description: "Japanese only" },
  {
    value: "eng+kor",
    label: "English + Korean",
    description: "Mixed English and Korean",
  },
  {
    value: "eng+jpn",
    label: "English + Japanese",
    description: "Mixed English and Japanese",
  },
  {
    value: "kor+jpn",
    label: "Korean + Japanese",
    description: "Mixed Korean and Japanese",
  },
  {
    value: "eng+kor+jpn",
    label: "All Languages",
    description: "English, Korean, and Japanese",
  },
];

export interface OCRProgress {
  status: string;
  progress: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
  words: OCRWord[];
}

export interface OCRWord {
  text: string;
  confidence: number;
  bbox: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
}

export interface OCRProcessResult {
  success: boolean;
  data?: OCRResult;
  error?: string;
}
