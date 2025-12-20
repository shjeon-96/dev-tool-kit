"use client";

import { useState, useCallback, useEffect } from "react";
import type { ToolSlug } from "@/entities/tool";
import { getConnectableTools } from "./types";
import {
  canStorePipelineData,
  safeSessionStorageSet,
  getByteSize,
  PIPELINE_DATA_LIMIT,
  formatBytes,
} from "@/shared/lib";

interface UsePipelineOptions {
  onNavigate?: (toolSlug: ToolSlug, data: string) => void;
  onError?: (error: string) => void;
}

interface SendToPipelineResult {
  success: boolean;
  error?: string;
  dataSize?: number;
}

export function usePipeline(
  currentTool: ToolSlug,
  options: UsePipelineOptions = {},
) {
  const [output, setOutput] = useState<string>("");
  const [isPipelineMode, setIsPipelineMode] = useState(false);

  const connectableTools = getConnectableTools(currentTool);
  const hasConnections = connectableTools.length > 0;

  const captureOutput = useCallback((value: string) => {
    setOutput(value);
  }, []);

  /**
   * 데이터 크기 정보 조회
   */
  const getDataSizeInfo = useCallback(() => {
    const size = getByteSize(output);
    return {
      size,
      formatted: formatBytes(size),
      limit: PIPELINE_DATA_LIMIT,
      limitFormatted: formatBytes(PIPELINE_DATA_LIMIT),
      isOverLimit: size > PIPELINE_DATA_LIMIT,
      percentage: Math.min(100, (size / PIPELINE_DATA_LIMIT) * 100),
    };
  }, [output]);

  const sendToPipeline = useCallback(
    (targetTool: ToolSlug): SendToPipelineResult => {
      if (!output) {
        return { success: false, error: "전송할 데이터가 없습니다." };
      }

      // 용량 체크
      const storageCheck = canStorePipelineData(output);
      if (!storageCheck.canStore) {
        options.onError?.(storageCheck.reason ?? "저장할 수 없습니다.");
        return {
          success: false,
          error: storageCheck.reason,
          dataSize: storageCheck.dataSize,
        };
      }

      // 데이터 직렬화
      const pipelineData = JSON.stringify({
        from: currentTool,
        to: targetTool,
        data: output,
        timestamp: Date.now(),
      });

      // 안전한 저장
      const saveResult = safeSessionStorageSet("pipeline-data", pipelineData);
      if (!saveResult.success) {
        options.onError?.(saveResult.error ?? "저장 중 오류가 발생했습니다.");
        return {
          success: false,
          error: saveResult.error,
          dataSize: storageCheck.dataSize,
        };
      }

      // 성공적으로 저장됨 - 네비게이션
      options.onNavigate?.(targetTool, output);
      return {
        success: true,
        dataSize: storageCheck.dataSize,
      };
    },
    [output, currentTool, options],
  );

  const togglePipelineMode = useCallback(() => {
    setIsPipelineMode((prev) => !prev);
  }, []);

  return {
    output,
    captureOutput,
    sendToPipeline,
    connectableTools,
    hasConnections,
    isPipelineMode,
    togglePipelineMode,
    getDataSizeInfo,
  };
}

export function usePipelineReceiver() {
  const [receivedData, setReceivedData] = useState<{
    from: ToolSlug;
    data: string;
  } | null>(null);

  const checkForPipelineData = useCallback(() => {
    const stored = sessionStorage.getItem("pipeline-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Only use data less than 5 minutes old
        if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
          setReceivedData({
            from: parsed.from,
            data: parsed.data,
          });
          return parsed.data;
        }
      } catch {
        // Invalid data
      }
      sessionStorage.removeItem("pipeline-data");
    }
    return null;
  }, []);

  const clearReceivedData = useCallback(() => {
    setReceivedData(null);
    sessionStorage.removeItem("pipeline-data");
  }, []);

  return {
    receivedData,
    checkForPipelineData,
    clearReceivedData,
  };
}

/**
 * Simplified hook for receiving pipeline data
 * Automatically checks for data on mount and calls onReceive when data is available
 *
 * @example
 * ```tsx
 * // In a tool component:
 * usePipelineInput((data) => setInput(data));
 * ```
 */
export function usePipelineInput(onReceive: (data: string) => void) {
  const { receivedData, checkForPipelineData, clearReceivedData } =
    usePipelineReceiver();

  // Check for pipeline data on mount
  useEffect(() => {
    checkForPipelineData();
  }, [checkForPipelineData]);

  // Process received data
  useEffect(() => {
    if (receivedData) {
      onReceive(receivedData.data);
      clearReceivedData();
    }
  }, [receivedData, onReceive, clearReceivedData]);

  return { receivedData };
}
