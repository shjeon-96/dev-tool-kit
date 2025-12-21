/**
 * PDF Split - PDF를 여러 파일로 분할
 */

import { PDFDocument } from "pdf-lib";
import type { PDFProcessResult, SplitMode } from "./types";

/**
 * 범위 문자열을 페이지 인덱스 배열로 파싱
 * 예: "1-5, 8, 10-12" → [0, 1, 2, 3, 4, 7, 9, 10, 11]
 */
export function parsePageRange(
  rangeInput: string,
  totalPages: number,
): number[] {
  const pages = new Set<number>();
  const parts = rangeInput.split(",").map((s) => s.trim());

  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((s) => parseInt(s.trim(), 10));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
          pages.add(i - 1); // 0-based index
        }
      }
    } else {
      const page = parseInt(part, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        pages.add(page - 1); // 0-based index
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

/**
 * PDF 분할
 */
export async function splitPDF(
  file: File,
  mode: SplitMode,
  onProgress?: (progress: number) => void,
): Promise<PDFProcessResult> {
  try {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });
    const totalPages = pdf.getPageCount();

    if (totalPages === 0) {
      return { success: false, error: "PDF has no pages" };
    }

    let pageIndices: number[];
    const filenames: string[] = [];
    const baseName = file.name.replace(/\.pdf$/i, "");

    switch (mode.type) {
      case "all":
        // 각 페이지를 개별 파일로
        pageIndices = Array.from({ length: totalPages }, (_, i) => i);
        break;

      case "range":
        // 범위 지정 분할
        if (!mode.rangeInput) {
          return { success: false, error: "Range input is required" };
        }
        pageIndices = parsePageRange(mode.rangeInput, totalPages);
        if (pageIndices.length === 0) {
          return { success: false, error: "Invalid page range" };
        }
        break;

      case "extract":
        // 선택한 페이지 추출
        if (!mode.selectedPages || mode.selectedPages.length === 0) {
          return { success: false, error: "No pages selected" };
        }
        pageIndices = mode.selectedPages.filter(
          (i) => i >= 0 && i < totalPages,
        );
        break;

      default:
        return { success: false, error: "Invalid split mode" };
    }

    const results: Uint8Array[] = [];

    for (let i = 0; i < pageIndices.length; i++) {
      const pageIndex = pageIndices[i];
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [pageIndex]);
      newPdf.addPage(page);

      const data = await newPdf.save();
      results.push(data);

      const pageNum = pageIndex + 1;
      filenames.push(`${baseName}_page_${pageNum}.pdf`);

      onProgress?.(((i + 1) / pageIndices.length) * 100);
    }

    return {
      success: true,
      data: results,
      filenames,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to split PDF",
    };
  }
}

/**
 * 범위로 PDF 분할 (연속 페이지를 하나의 파일로)
 */
export async function splitPDFByRanges(
  file: File,
  ranges: [number, number][],
  onProgress?: (progress: number) => void,
): Promise<PDFProcessResult> {
  try {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });
    const totalPages = pdf.getPageCount();
    const baseName = file.name.replace(/\.pdf$/i, "");

    const results: Uint8Array[] = [];
    const filenames: string[] = [];

    for (let i = 0; i < ranges.length; i++) {
      const [start, end] = ranges[i];
      const startIdx = Math.max(0, start - 1);
      const endIdx = Math.min(totalPages - 1, end - 1);

      if (startIdx > endIdx) continue;

      const pageIndices = Array.from(
        { length: endIdx - startIdx + 1 },
        (_, j) => startIdx + j,
      );

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, pageIndices);
      pages.forEach((page) => newPdf.addPage(page));

      const data = await newPdf.save();
      results.push(data);
      filenames.push(`${baseName}_pages_${start}-${end}.pdf`);

      onProgress?.(((i + 1) / ranges.length) * 100);
    }

    return {
      success: true,
      data: results,
      filenames,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to split PDF by ranges",
    };
  }
}
