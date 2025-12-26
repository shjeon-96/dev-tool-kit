"use client";

import { useState, useCallback } from "react";
import { useFeatureAccess } from "@/entities/subscription";
import { useQuota } from "@/shared/lib/quota";
import {
  computeAllFileHashesWasm,
  type HashAlgorithm,
  type HashResult,
} from "@/features/hash-generator";
import { getBulkLimits, isLimitExceeded } from "../../model/bulk-limits";
import { useFSAccess, type WriteFileData } from "@/shared/lib/fs-access";

export type ExportMode = "folder" | "zip";

export interface HashBulkItem {
  id: string;
  name: string;
  size: number;
  status: "pending" | "processing" | "success" | "error";
  hashes?: HashResult[];
  progress: number;
  error?: string;
}

export function useHashBulk() {
  const { tier, isPro, canAccessBulkActions } = useFeatureAccess();
  const { trackUsage } = useQuota("hash-generator");
  const limits = getBulkLimits(tier);

  // File System Access
  const fsAccess = useFSAccess();

  const [items, setItems] = useState<HashBulkItem[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<
    HashAlgorithm | "all"
  >("all");
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [exportMode, setExportMode] = useState<ExportMode>(
    fsAccess.isSupported ? "folder" : "zip",
  );

  // 파일 추가
  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const maxItems = limits.hashGenerator.maxItems;
      const maxFileSizeMB = limits.hashGenerator.maxFileSizeMB;

      // 제한 확인
      if (isLimitExceeded(items.length + fileArray.length, maxItems)) {
        const allowed = maxItems - items.length;
        if (allowed <= 0) {
          return {
            success: false,
            error: `Maximum ${maxItems} file(s) allowed. Upgrade to Pro for up to 500 files.`,
          };
        }
        fileArray.splice(allowed);
      }

      const newItems: HashBulkItem[] = [];

      for (const file of fileArray) {
        // 파일 크기 확인
        if (file.size > maxFileSizeMB * 1024 * 1024) {
          newItems.push({
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            status: "error",
            progress: 0,
            error: `File too large. Max ${maxFileSizeMB}MB.`,
          });
          continue;
        }

        newItems.push({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          status: "pending",
          progress: 0,
        });
      }

      // 파일 객체 저장을 위한 Map 사용
      const fileMap = new Map<string, File>();
      newItems.forEach((item, index) => {
        if (item.status !== "error") {
          fileMap.set(item.id, fileArray[index]);
        }
      });

      // 파일 Map을 window에 임시 저장 (실제 처리 시 사용)
      (
        window as unknown as { __hashBulkFiles: Map<string, File> }
      ).__hashBulkFiles =
        (window as unknown as { __hashBulkFiles: Map<string, File> })
          .__hashBulkFiles || new Map();
      fileMap.forEach((file, id) => {
        (
          window as unknown as { __hashBulkFiles: Map<string, File> }
        ).__hashBulkFiles.set(id, file);
      });

      setItems((prev) => [...prev, ...newItems]);
      return { success: true };
    },
    [
      items.length,
      limits.hashGenerator.maxItems,
      limits.hashGenerator.maxFileSizeMB,
    ],
  );

  // 아이템 삭제
  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    // 파일 Map에서도 삭제
    (
      window as unknown as { __hashBulkFiles: Map<string, File> }
    ).__hashBulkFiles?.delete(id);
  }, []);

  // 전체 삭제
  const clearAll = useCallback(() => {
    setItems([]);
    setOverallProgress(0);
    (
      window as unknown as { __hashBulkFiles: Map<string, File> }
    ).__hashBulkFiles?.clear();
  }, []);

  // 일괄 처리
  const processAll = useCallback(async () => {
    const pendingItems = items.filter((item) => item.status === "pending");
    if (pendingItems.length === 0) return;

    setIsProcessing(true);
    setOverallProgress(0);

    const fileMap = (
      window as unknown as { __hashBulkFiles: Map<string, File> }
    ).__hashBulkFiles;
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
          i.id === item.id ? { ...i, status: "processing" as const } : i,
        ),
      );

      try {
        const hashes = await computeAllFileHashesWasm(file, (progress) => {
          setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, progress } : i)),
          );
        });

        // 결과 업데이트
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: "success" as const,
                  hashes,
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
                  error: err instanceof Error ? err.message : "Hash failed",
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
  }, [items, trackUsage]);

  // CSV 콘텐츠 생성
  const generateCsvContent = useCallback(() => {
    const successItems = items.filter((item) => item.status === "success");
    if (successItems.length === 0) return null;

    const headers = ["Filename", "Size", "MD5", "SHA1", "SHA256", "SHA512"];
    const rows = successItems.map((item) => {
      const getHash = (algo: string) =>
        item.hashes?.find((h) => h.algorithm === algo)?.hash || "";
      return [
        item.name,
        formatSize(item.size),
        getHash("md5"),
        getHash("sha1"),
        getHash("sha256"),
        getHash("sha512"),
      ];
    });

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  }, [items]);

  // 내보내기용 파일 데이터 생성
  const getExportFiles = useCallback((): WriteFileData[] => {
    const csv = generateCsvContent();
    if (!csv) return [];

    return [
      {
        name: "hashes.csv",
        data: csv,
        type: "text/csv",
      },
    ];
  }, [generateCsvContent]);

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
        filename: "hash_results.zip",
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

  // 클립보드 복사
  const copyHash = useCallback(async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      return true;
    } catch {
      return false;
    }
  }, []);

  // 통계
  const stats = {
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    processing: items.filter((i) => i.status === "processing").length,
    success: items.filter((i) => i.status === "success").length,
    error: items.filter((i) => i.status === "error").length,
    limit: limits.hashGenerator.maxItems,
    remaining: limits.hashGenerator.maxItems - items.length,
  };

  return {
    // 상태
    items,
    selectedAlgorithm,
    isProcessing,
    overallProgress,
    stats,
    limits: limits.hashGenerator,
    exportMode,

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
    setSelectedAlgorithm,
    setExportMode,
    addFiles,
    removeItem,
    clearAll,
    processAll,
    exportResults,
    exportToFolder,
    exportAsZip,
    copyHash,
  };
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
