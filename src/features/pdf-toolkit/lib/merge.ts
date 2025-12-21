/**
 * PDF Merge - 여러 PDF를 하나로 병합
 */

import { PDFDocument } from "pdf-lib";
import type { PDFProcessResult } from "./types";

export async function mergePDFs(
  files: File[],
  onProgress?: (progress: number) => void,
): Promise<PDFProcessResult> {
  if (files.length === 0) {
    return { success: false, error: "No files to merge" };
  }

  if (files.length === 1) {
    return { success: false, error: "Need at least 2 files to merge" };
  }

  try {
    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const bytes = await files[i].arrayBuffer();
      const pdf = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));

      onProgress?.(((i + 1) / files.length) * 100);
    }

    const data = await mergedPdf.save();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to merge PDFs",
    };
  }
}

/**
 * PDF 파일에서 페이지 수 가져오기
 */
export async function getPageCount(file: File): Promise<number> {
  try {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });
    return pdf.getPageCount();
  } catch {
    return 0;
  }
}
