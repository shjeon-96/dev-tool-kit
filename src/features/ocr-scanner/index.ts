// OCR Scanner Feature
// Extract text from images using Tesseract.js

export { OcrScanner } from "./ui/ocr-scanner";
export { useOcrScanner } from "./model/use-ocr-scanner";
export { extractText, isSupportedImageType } from "./lib/ocr";
export type {
  OCRLanguage,
  OCRResult,
  OCRProgress,
  OCRProcessResult,
} from "./lib/types";
export { OCR_LANGUAGES } from "./lib/types";
