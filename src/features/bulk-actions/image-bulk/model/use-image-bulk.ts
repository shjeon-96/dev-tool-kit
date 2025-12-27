"use client";

import { useState, useCallback } from "react";
import { useFeatureAccess } from "@/entities/subscription";
import { useQuota } from "@/features/quota";
import { getBulkLimits, isLimitExceeded } from "../../model/bulk-limits";
import { useFSAccess, type WriteFileData } from "@/shared/lib/fs-access";

export type ExportMode = "folder" | "zip";
export type ResizeMode = "width" | "height" | "percentage" | "dimensions";
export type OutputFormat = "jpeg" | "png" | "webp";

export interface ResizeOptions {
  mode: ResizeMode;
  width?: number;
  height?: number;
  percentage?: number;
  maintainAspectRatio: boolean;
  format: OutputFormat;
  quality: number;
}

export interface ImageBulkItem {
  id: string;
  name: string;
  size: number;
  originalWidth: number;
  originalHeight: number;
  status: "pending" | "processing" | "success" | "error";
  progress: number;
  error?: string;
  resultBlob?: Blob;
  resultWidth?: number;
  resultHeight?: number;
  resultSize?: number;
}

const DEFAULT_OPTIONS: ResizeOptions = {
  mode: "percentage",
  percentage: 50,
  width: 800,
  height: 600,
  maintainAspectRatio: true,
  format: "jpeg",
  quality: 85,
};

export function useImageBulk() {
  const { tier, isPro, canAccessBulkActions } = useFeatureAccess();
  const { trackUsage } = useQuota("image-resizer");
  const limits = getBulkLimits(tier);

  // File System Access
  const fsAccess = useFSAccess();

  const [items, setItems] = useState<ImageBulkItem[]>([]);
  const [options, setOptions] = useState<ResizeOptions>(DEFAULT_OPTIONS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [exportMode, setExportMode] = useState<ExportMode>(
    fsAccess.isSupported ? "folder" : "zip",
  );

  // 이미지 크기 계산
  const calculateDimensions = useCallback(
    (
      originalWidth: number,
      originalHeight: number,
      opts: ResizeOptions,
    ): { width: number; height: number } => {
      switch (opts.mode) {
        case "percentage": {
          const scale = (opts.percentage || 100) / 100;
          return {
            width: Math.round(originalWidth * scale),
            height: Math.round(originalHeight * scale),
          };
        }
        case "width": {
          const targetWidth = opts.width || originalWidth;
          if (opts.maintainAspectRatio) {
            const scale = targetWidth / originalWidth;
            return {
              width: targetWidth,
              height: Math.round(originalHeight * scale),
            };
          }
          return { width: targetWidth, height: originalHeight };
        }
        case "height": {
          const targetHeight = opts.height || originalHeight;
          if (opts.maintainAspectRatio) {
            const scale = targetHeight / originalHeight;
            return {
              width: Math.round(originalWidth * scale),
              height: targetHeight,
            };
          }
          return { width: originalWidth, height: targetHeight };
        }
        case "dimensions": {
          const targetWidth = opts.width || originalWidth;
          const targetHeight = opts.height || originalHeight;
          if (opts.maintainAspectRatio) {
            const scaleW = targetWidth / originalWidth;
            const scaleH = targetHeight / originalHeight;
            const scale = Math.min(scaleW, scaleH);
            return {
              width: Math.round(originalWidth * scale),
              height: Math.round(originalHeight * scale),
            };
          }
          return { width: targetWidth, height: targetHeight };
        }
        default:
          return { width: originalWidth, height: originalHeight };
      }
    },
    [],
  );

  // Canvas를 사용한 이미지 리사이즈
  const resizeImage = useCallback(
    async (
      file: File,
      originalWidth: number,
      originalHeight: number,
      opts: ResizeOptions,
    ): Promise<{ blob: Blob; width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(url);

          const { width, height } = calculateDimensions(
            originalWidth,
            originalHeight,
            opts,
          );

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          // 고품질 리사이즈
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          const mimeType = `image/${opts.format}`;
          const quality = opts.quality / 100;

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({ blob, width, height });
              } else {
                reject(new Error("Failed to create blob"));
              }
            },
            mimeType,
            quality,
          );
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };

        img.src = url;
      });
    },
    [calculateDimensions],
  );

  // 이미지 정보 추출
  const getImageInfo = useCallback(
    (file: File): Promise<{ width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };

        img.src = url;
      });
    },
    [],
  );

  // 파일 추가
  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      const maxItems = limits.imageResizer.maxItems;
      const maxFileSizeMB = limits.imageResizer.maxFileSizeMB;

      // 제한 확인
      if (isLimitExceeded(items.length + fileArray.length, maxItems)) {
        const allowed = maxItems - items.length;
        if (allowed <= 0) {
          return {
            success: false,
            error: `Maximum ${maxItems} image(s) allowed. Upgrade to Pro for up to 100 images.`,
          };
        }
        fileArray.splice(allowed);
      }

      const newItems: ImageBulkItem[] = [];

      for (const file of fileArray) {
        // 파일 크기 확인
        if (file.size > maxFileSizeMB * 1024 * 1024) {
          newItems.push({
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            originalWidth: 0,
            originalHeight: 0,
            status: "error",
            progress: 0,
            error: `File too large. Max ${maxFileSizeMB}MB.`,
          });
          continue;
        }

        try {
          const { width, height } = await getImageInfo(file);
          const id = crypto.randomUUID();

          newItems.push({
            id,
            name: file.name,
            size: file.size,
            originalWidth: width,
            originalHeight: height,
            status: "pending",
            progress: 0,
          });

          // 파일 객체 저장
          (
            window as unknown as { __imageBulkFiles: Map<string, File> }
          ).__imageBulkFiles =
            (window as unknown as { __imageBulkFiles: Map<string, File> })
              .__imageBulkFiles || new Map();
          (
            window as unknown as { __imageBulkFiles: Map<string, File> }
          ).__imageBulkFiles.set(id, file);
        } catch {
          newItems.push({
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            originalWidth: 0,
            originalHeight: 0,
            status: "error",
            progress: 0,
            error: "Failed to load image",
          });
        }
      }

      setItems((prev) => [...prev, ...newItems]);
      return { success: true };
    },
    [
      items.length,
      limits.imageResizer.maxItems,
      limits.imageResizer.maxFileSizeMB,
      getImageInfo,
    ],
  );

  // 아이템 삭제
  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    (
      window as unknown as { __imageBulkFiles: Map<string, File> }
    ).__imageBulkFiles?.delete(id);
  }, []);

  // 전체 삭제
  const clearAll = useCallback(() => {
    setItems([]);
    setOverallProgress(0);
    (
      window as unknown as { __imageBulkFiles: Map<string, File> }
    ).__imageBulkFiles?.clear();
  }, []);

  // 일괄 처리
  const processAll = useCallback(async () => {
    const pendingItems = items.filter((item) => item.status === "pending");
    if (pendingItems.length === 0) return;

    setIsProcessing(true);
    setOverallProgress(0);

    const fileMap = (
      window as unknown as { __imageBulkFiles: Map<string, File> }
    ).__imageBulkFiles;
    let processed = 0;

    for (const item of pendingItems) {
      const file = fileMap?.get(item.id);
      if (!file) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "error" as const, error: "File not found" }
              : i,
          ),
        );
        continue;
      }

      // 상태 업데이트: processing
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, status: "processing" as const, progress: 50 }
            : i,
        ),
      );

      try {
        const { blob, width, height } = await resizeImage(
          file,
          item.originalWidth,
          item.originalHeight,
          options,
        );

        // 결과 업데이트
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: "success" as const,
                  resultBlob: blob,
                  resultWidth: width,
                  resultHeight: height,
                  resultSize: blob.size,
                  progress: 100,
                }
              : i,
          ),
        );
      } catch (err) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: "error" as const,
                  error: err instanceof Error ? err.message : "Resize failed",
                  progress: 0,
                }
              : i,
          ),
        );
      }

      processed++;
      setOverallProgress(Math.round((processed / pendingItems.length) * 100));
    }

    trackUsage();
    setIsProcessing(false);
  }, [items, options, resizeImage, trackUsage]);

  // 내보내기용 파일 데이터 생성
  const getExportFiles = useCallback((): WriteFileData[] => {
    const successItems = items.filter(
      (item) => item.status === "success" && item.resultBlob,
    );
    if (successItems.length === 0) return [];

    return successItems.map((item) => {
      const ext = options.format === "jpeg" ? "jpg" : options.format;
      const baseName = item.name.replace(/\.[^/.]+$/, "");
      return {
        name: `${baseName}_resized.${ext}`,
        data: item.resultBlob!,
        type: `image/${options.format}`,
      };
    });
  }, [items, options.format]);

  // 폴더에 저장 (Chrome/Edge)
  const exportToFolder = useCallback(async () => {
    const files = getExportFiles();
    if (files.length === 0)
      return { success: false, error: "No results to export" };

    try {
      const picked = await fsAccess.pickDirectory({ mode: "readwrite" });
      if (!picked)
        return { success: false, error: "Folder selection cancelled" };

      const success = await fsAccess.writeAllFiles(files);
      return { success, error: success ? undefined : "Failed to write files" };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Export failed",
      };
    }
  }, [getExportFiles, fsAccess]);

  // ZIP으로 다운로드
  const exportAsZip = useCallback(async () => {
    const files = getExportFiles();
    if (files.length === 0)
      return { success: false, error: "No results to export" };

    try {
      await fsAccess.downloadAsZip(files, {
        filename: "resized_images.zip",
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "ZIP creation failed",
      };
    }
  }, [getExportFiles, fsAccess]);

  // 결과 내보내기 (모드에 따라)
  const exportResults = useCallback(async () => {
    if (exportMode === "folder" && fsAccess.isSupported) {
      return exportToFolder();
    }
    return exportAsZip();
  }, [exportMode, fsAccess.isSupported, exportToFolder, exportAsZip]);

  // 통계
  const stats = {
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    processing: items.filter((i) => i.status === "processing").length,
    success: items.filter((i) => i.status === "success").length,
    error: items.filter((i) => i.status === "error").length,
    limit: limits.imageResizer.maxItems,
    remaining: limits.imageResizer.maxItems - items.length,
  };

  // 총 저장량 계산
  const totalSaved = items.reduce((acc, item) => {
    if (item.status === "success" && item.resultSize) {
      return acc + (item.size - item.resultSize);
    }
    return acc;
  }, 0);

  return {
    // 상태
    items,
    options,
    isProcessing,
    overallProgress,
    stats,
    limits: limits.imageResizer,
    exportMode,
    totalSaved,

    // File System Access
    fsAccess: {
      isSupported: fsAccess.isSupported,
      supportLevel: fsAccess.supportLevel,
      isExporting: fsAccess.isLoading,
      exportProgress: fsAccess.progress,
    },

    // 기능 접근
    isPro,
    canAccessBulkActions,
    tier,

    // 액션
    setOptions,
    setExportMode,
    addFiles,
    removeItem,
    clearAll,
    processAll,
    exportResults,
    exportToFolder,
    exportAsZip,
    calculateDimensions,
  };
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
