"use client";

import { useState, useCallback } from "react";
import type { PDFFile, PDFTab, SplitMode, CompressOptions } from "../lib/types";
import { mergePDFs, getPageCount } from "../lib/merge";
import { splitPDF } from "../lib/split";
import { compressPDF, calculateCompressionStats } from "../lib/compress";

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savedPercent: number;
}

export function usePdfToolkit() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [activeTab, setActiveTab] = useState<PDFTab>("merge");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [compressionResult, setCompressionResult] =
    useState<CompressionResult | null>(null);

  // 파일 추가
  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const newFiles: PDFFile[] = [];
    const fileArray = Array.from(fileList);

    for (const file of fileArray) {
      if (file.type !== "application/pdf") {
        continue;
      }

      const pageCount = await getPageCount(file);

      newFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        file,
        pageCount,
        size: file.size,
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setError(null);
  }, []);

  // 파일 제거
  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // 파일 순서 변경
  const reorderFiles = useCallback((fromIndex: number, toIndex: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const [removed] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, removed);
      return newFiles;
    });
  }, []);

  // 전체 삭제
  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
    setProgress(0);
    setCompressionResult(null);
  }, []);

  // PDF 병합
  const handleMerge = useCallback(async (): Promise<Blob | null> => {
    if (files.length < 2) {
      setError("Need at least 2 files to merge");
      return null;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const result = await mergePDFs(
        files.map((f) => f.file),
        setProgress,
      );

      if (!result.success || !result.data || Array.isArray(result.data)) {
        setError(result.error || "Failed to merge PDFs");
        return null;
      }

      // slice() creates a new Uint8Array with ArrayBuffer (not SharedArrayBuffer)
      return new Blob([result.data.slice()], { type: "application/pdf" });
    } finally {
      setIsProcessing(false);
    }
  }, [files]);

  // PDF 분할
  const handleSplit = useCallback(
    async (
      file: PDFFile,
      mode: SplitMode,
    ): Promise<{ blobs: Blob[]; filenames: string[] } | null> => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      try {
        const result = await splitPDF(file.file, mode, setProgress);

        if (!result.success || !result.data || !Array.isArray(result.data)) {
          setError(result.error || "Failed to split PDF");
          return null;
        }

        const blobs = result.data.map(
          (data) => new Blob([data.slice()], { type: "application/pdf" }),
        );
        return { blobs, filenames: result.filenames || [] };
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  // PDF 압축
  const handleCompress = useCallback(
    async (file: PDFFile, options: CompressOptions): Promise<Blob | null> => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);
      setCompressionResult(null);

      try {
        const result = await compressPDF(file.file, options, setProgress);

        if (!result.success || !result.data || Array.isArray(result.data)) {
          setError(result.error || "Failed to compress PDF");
          return null;
        }

        const stats = calculateCompressionStats(file.size, result.data.length);
        setCompressionResult(stats);

        // slice() creates a new Uint8Array with ArrayBuffer (not SharedArrayBuffer)
        return new Blob([result.data.slice()], { type: "application/pdf" });
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  // 파일 다운로드
  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  // 여러 파일 다운로드 (ZIP)
  const downloadMultiple = useCallback(
    async (blobs: Blob[], filenames: string[], zipName: string) => {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      blobs.forEach((blob, index) => {
        zip.file(filenames[index], blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, zipName);
    },
    [downloadBlob],
  );

  return {
    // 상태
    files,
    activeTab,
    isProcessing,
    progress,
    error,
    compressionResult,

    // 파일 관리
    addFiles,
    removeFile,
    reorderFiles,
    clearFiles,

    // 탭 관리
    setActiveTab,

    // 작업
    handleMerge,
    handleSplit,
    handleCompress,

    // 다운로드
    downloadBlob,
    downloadMultiple,
  };
}
