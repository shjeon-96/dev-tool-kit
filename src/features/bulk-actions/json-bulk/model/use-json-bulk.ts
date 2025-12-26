"use client";

import { useState, useCallback } from "react";
import { useFeatureAccess } from "@/entities/subscription";
import { useQuota } from "@/shared/lib/quota";
import {
  formatJson,
  minifyJson,
  type FormatResult,
} from "@/features/json-formatter";
import { getBulkLimits, isLimitExceeded } from "../../model/bulk-limits";
import { useFSAccess, type WriteFileData } from "@/shared/lib/fs-access";

export interface JsonBulkItem {
  id: string;
  name: string;
  input: string;
  output: string;
  status: "pending" | "processing" | "success" | "error";
  error?: string;
}

export type BulkOperation = "format" | "minify" | "validate";
export type ExportMode = "folder" | "zip";

export function useJsonBulk() {
  const { tier, isPro, canAccessBulkActions } = useFeatureAccess();
  const { trackUsage } = useQuota("json-formatter");
  const limits = getBulkLimits(tier);

  // File System Access
  const fsAccess = useFSAccess();

  const [items, setItems] = useState<JsonBulkItem[]>([]);
  const [operation, setOperation] = useState<BulkOperation>("format");
  const [indent, setIndent] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exportMode, setExportMode] = useState<ExportMode>(
    fsAccess.isSupported ? "folder" : "zip",
  );

  // 파일 추가
  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const maxFiles = limits.jsonFormatter.maxFiles;

      // 제한 확인
      if (isLimitExceeded(items.length + fileArray.length, maxFiles)) {
        const allowed = maxFiles - items.length;
        if (allowed <= 0) {
          return {
            success: false,
            error: `Maximum ${maxFiles} file(s) allowed. Upgrade to Pro for up to 100 files.`,
          };
        }
        fileArray.splice(allowed);
      }

      const newItems: JsonBulkItem[] = [];

      for (const file of fileArray) {
        // 파일 크기 확인
        if (file.size > limits.jsonFormatter.maxFileSizeKB * 1024) {
          newItems.push({
            id: crypto.randomUUID(),
            name: file.name,
            input: "",
            output: "",
            status: "error",
            error: `File too large. Max ${limits.jsonFormatter.maxFileSizeKB}KB.`,
          });
          continue;
        }

        try {
          const content = await file.text();
          newItems.push({
            id: crypto.randomUUID(),
            name: file.name,
            input: content,
            output: "",
            status: "pending",
          });
        } catch {
          newItems.push({
            id: crypto.randomUUID(),
            name: file.name,
            input: "",
            output: "",
            status: "error",
            error: "Failed to read file",
          });
        }
      }

      setItems((prev) => [...prev, ...newItems]);
      return { success: true };
    },
    [
      items.length,
      limits.jsonFormatter.maxFiles,
      limits.jsonFormatter.maxFileSizeKB,
    ],
  );

  // 텍스트 직접 추가
  const addText = useCallback(
    (text: string, name?: string) => {
      const maxFiles = limits.jsonFormatter.maxFiles;

      if (isLimitExceeded(items.length + 1, maxFiles)) {
        return {
          success: false,
          error: `Maximum ${maxFiles} item(s) allowed. Upgrade to Pro for up to 100 items.`,
        };
      }

      const newItem: JsonBulkItem = {
        id: crypto.randomUUID(),
        name: name || `item-${items.length + 1}.json`,
        input: text,
        output: "",
        status: "pending",
      };

      setItems((prev) => [...prev, newItem]);
      return { success: true };
    },
    [items.length, limits.jsonFormatter.maxFiles],
  );

  // 아이템 삭제
  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // 전체 삭제
  const clearAll = useCallback(() => {
    setItems([]);
    setProgress(0);
  }, []);

  // 일괄 처리
  const processAll = useCallback(async () => {
    if (items.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    const pendingItems = items.filter(
      (item) => item.status !== "error" || item.input,
    );
    let processed = 0;

    for (const item of pendingItems) {
      // 상태 업데이트: processing
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, status: "processing" as const } : i,
        ),
      );

      let result: FormatResult;

      switch (operation) {
        case "format":
          result = formatJson(item.input, indent);
          break;
        case "minify":
          result = minifyJson(item.input);
          break;
        case "validate":
          result = formatJson(item.input); // validate by parsing
          break;
        default:
          result = { success: false, output: "", error: "Unknown operation" };
      }

      // 결과 업데이트
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                output: result.output,
                status: result.success ? "success" : "error",
                error: result.error,
              }
            : i,
        ),
      );

      processed++;
      setProgress(Math.round((processed / pendingItems.length) * 100));

      // 약간의 딜레이 (UI 업데이트용)
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    trackUsage();
    setIsProcessing(false);
  }, [items, operation, indent, trackUsage]);

  // 결과 다운로드 (개별)
  const downloadItem = useCallback((item: JsonBulkItem) => {
    if (!item.output) return;

    const blob = new Blob([item.output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.name.replace(/\.json$/, "") + "_formatted.json";
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // 결과 파일 데이터 생성
  const getExportFiles = useCallback((): WriteFileData[] => {
    const successItems = items.filter((item) => item.status === "success");
    return successItems.map((item) => ({
      name: item.name.replace(/\.json$/, "") + "_formatted.json",
      data: item.output,
      type: "application/json",
    }));
  }, [items]);

  // 폴더에 저장 (Chrome/Edge)
  const downloadToFolder = useCallback(async () => {
    const files = getExportFiles();
    if (files.length === 0)
      return { success: false, error: "No files to export" };

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
  const downloadAsZip = useCallback(async () => {
    const files = getExportFiles();
    if (files.length === 0)
      return { success: false, error: "No files to export" };

    try {
      await fsAccess.downloadAsZip(files, {
        filename: "json_bulk_formatted.zip",
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "ZIP creation failed",
      };
    }
  }, [getExportFiles, fsAccess]);

  // 전체 결과 다운로드 (모드에 따라)
  const downloadAll = useCallback(async () => {
    if (exportMode === "folder" && fsAccess.isSupported) {
      return downloadToFolder();
    }
    return downloadAsZip();
  }, [exportMode, fsAccess.isSupported, downloadToFolder, downloadAsZip]);

  // 결과 복사
  const copyItem = useCallback(async (item: JsonBulkItem) => {
    if (!item.output) return false;
    try {
      await navigator.clipboard.writeText(item.output);
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
    limit: limits.jsonFormatter.maxFiles,
    remaining: limits.jsonFormatter.maxFiles - items.length,
  };

  return {
    // 상태
    items,
    operation,
    indent,
    isProcessing,
    progress,
    stats,
    limits: limits.jsonFormatter,
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
    setOperation,
    setIndent,
    setExportMode,
    addFiles,
    addText,
    removeItem,
    clearAll,
    processAll,
    downloadItem,
    downloadAll,
    downloadToFolder,
    downloadAsZip,
    copyItem,
  };
}
