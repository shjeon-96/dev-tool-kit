/**
 * PDF Compress - PDF 파일 압축 (메타데이터 제거, 객체 스트림 사용)
 */

import { PDFDocument } from "pdf-lib";
import type { PDFProcessResult, CompressOptions } from "./types";

export async function compressPDF(
  file: File,
  options: CompressOptions,
  onProgress?: (progress: number) => void,
): Promise<PDFProcessResult> {
  try {
    onProgress?.(10);

    const bytes = await file.arrayBuffer();
    onProgress?.(30);

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });
    onProgress?.(50);

    // 메타데이터 제거
    if (options.removeMetadata) {
      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      pdf.setProducer("");
      pdf.setCreator("");
      pdf.setCreationDate(new Date(0));
      pdf.setModificationDate(new Date(0));
    }
    onProgress?.(70);

    // 객체 스트림 사용하여 저장 (압축 최적화)
    const data = await pdf.save({
      useObjectStreams: true,
    });
    onProgress?.(100);

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to compress PDF",
    };
  }
}

/**
 * 압축 결과 통계 계산
 */
export function calculateCompressionStats(
  originalSize: number,
  compressedSize: number,
): {
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savedPercent: number;
} {
  const savedBytes = originalSize - compressedSize;
  const savedPercent = originalSize > 0 ? (savedBytes / originalSize) * 100 : 0;

  return {
    originalSize,
    compressedSize,
    savedBytes: Math.max(0, savedBytes),
    savedPercent: Math.max(0, savedPercent),
  };
}
