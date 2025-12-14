"use client";

import { useState, useCallback } from "react";
import type { ToolSlug } from "@/entities/tool";
import { getConnectableTools } from "./types";

interface UsePipelineOptions {
  onNavigate?: (toolSlug: ToolSlug, data: string) => void;
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

  const sendToPipeline = useCallback(
    (targetTool: ToolSlug) => {
      if (output && options.onNavigate) {
        // Store the data in sessionStorage for the target tool to pick up
        sessionStorage.setItem(
          "pipeline-data",
          JSON.stringify({
            from: currentTool,
            to: targetTool,
            data: output,
            timestamp: Date.now(),
          }),
        );
        options.onNavigate(targetTool, output);
      }
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
