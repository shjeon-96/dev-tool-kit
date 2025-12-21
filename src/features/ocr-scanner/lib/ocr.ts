/**
 * OCR Processing - Tesseract.js wrapper
 */

import Tesseract from "tesseract.js";
import type {
  OCRLanguage,
  OCRProgress,
  OCRProcessResult,
  OCRWord,
} from "./types";

/**
 * Extract words from nested Tesseract result structure
 */
function extractWordsFromBlocks(blocks: Tesseract.Block[] | null): OCRWord[] {
  if (!blocks) return [];

  const words: OCRWord[] = [];

  for (const block of blocks) {
    for (const paragraph of block.paragraphs) {
      for (const line of paragraph.lines) {
        for (const word of line.words) {
          words.push({
            text: word.text,
            confidence: word.confidence,
            bbox: word.bbox,
          });
        }
      }
    }
  }

  return words;
}

/**
 * Extract text from image using Tesseract.js
 */
export async function extractText(
  imageSource: File | string,
  language: OCRLanguage,
  onProgress?: (progress: OCRProgress) => void,
): Promise<OCRProcessResult> {
  try {
    const result = await Tesseract.recognize(imageSource, language, {
      logger: (m) => {
        if (onProgress && m.status && typeof m.progress === "number") {
          onProgress({
            status: formatStatus(m.status),
            progress: Math.round(m.progress * 100),
          });
        }
      },
    });

    const words = extractWordsFromBlocks(result.data.blocks);

    return {
      success: true,
      data: {
        text: result.data.text,
        confidence: result.data.confidence,
        words,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to extract text",
    };
  }
}

/**
 * Format Tesseract status to user-friendly message
 */
function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    "loading tesseract core": "Loading OCR engine...",
    "initializing tesseract": "Initializing...",
    "loading language traineddata": "Loading language data...",
    "initializing api": "Preparing OCR...",
    "recognizing text": "Recognizing text...",
  };

  return statusMap[status] || status;
}

/**
 * Get supported file types for OCR
 */
export function getSupportedImageTypes(): string[] {
  return ["image/png", "image/jpeg", "image/webp", "image/bmp", "image/gif"];
}

/**
 * Check if file is a supported image type
 */
export function isSupportedImageType(file: File): boolean {
  return getSupportedImageTypes().includes(file.type);
}

/**
 * Create image preview URL from file
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke image preview URL
 */
export function revokeImagePreview(url: string): void {
  URL.revokeObjectURL(url);
}
