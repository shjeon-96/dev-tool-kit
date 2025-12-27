"use client";

import { useState, useCallback, useMemo } from "react";
import { optimize, type Config } from "svgo/browser";
import { useQuota } from "@/features/quota";

export interface OptimizeOptions {
  removeDoctype: boolean;
  removeXMLProcInst: boolean;
  removeComments: boolean;
  removeMetadata: boolean;
  removeTitle: boolean;
  removeDesc: boolean;
  removeUselessDefs: boolean;
  removeEditorsNSData: boolean;
  removeEmptyAttrs: boolean;
  removeHiddenElems: boolean;
  removeEmptyContainers: boolean;
  cleanupNumericValues: boolean;
  convertColors: boolean;
  removeUnknownsAndDefaults: boolean;
  removeNonInheritableGroupAttrs: boolean;
  removeUselessStrokeAndFill: boolean;
  cleanupIds: boolean;
  mergePaths: boolean;
  convertShapeToPath: boolean;
  minifyStyles: boolean;
}

const defaultOptions: OptimizeOptions = {
  removeDoctype: true,
  removeXMLProcInst: true,
  removeComments: true,
  removeMetadata: true,
  removeTitle: false,
  removeDesc: false,
  removeUselessDefs: true,
  removeEditorsNSData: true,
  removeEmptyAttrs: true,
  removeHiddenElems: true,
  removeEmptyContainers: true,
  cleanupNumericValues: true,
  convertColors: true,
  removeUnknownsAndDefaults: true,
  removeNonInheritableGroupAttrs: true,
  removeUselessStrokeAndFill: true,
  cleanupIds: true,
  mergePaths: true,
  convertShapeToPath: true,
  minifyStyles: true,
};

export function useSvgOptimizer() {
  const { trackUsage } = useQuota("svg-optimizer");

  const [inputSvg, setInputSvg] = useState("");
  const [outputSvg, setOutputSvg] = useState("");
  const [options, setOptions] = useState<OptimizeOptions>(defaultOptions);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateOption = useCallback(
    (key: keyof OptimizeOptions, value: boolean) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetOptions = useCallback(() => {
    setOptions(defaultOptions);
  }, []);

  const optimizeSvg = useCallback(async () => {
    if (!inputSvg.trim()) {
      setError("SVG 코드를 입력해주세요");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const plugins: string[] = [];

      if (options.removeDoctype) plugins.push("removeDoctype");
      if (options.removeXMLProcInst) plugins.push("removeXMLProcInst");
      if (options.removeComments) plugins.push("removeComments");
      if (options.removeMetadata) plugins.push("removeMetadata");
      if (options.removeTitle) plugins.push("removeTitle");
      if (options.removeDesc) plugins.push("removeDesc");
      if (options.removeUselessDefs) plugins.push("removeUselessDefs");
      if (options.removeEditorsNSData) plugins.push("removeEditorsNSData");
      if (options.removeEmptyAttrs) plugins.push("removeEmptyAttrs");
      if (options.removeHiddenElems) plugins.push("removeHiddenElems");
      if (options.removeEmptyContainers) plugins.push("removeEmptyContainers");
      if (options.cleanupNumericValues) plugins.push("cleanupNumericValues");
      if (options.convertColors) plugins.push("convertColors");
      if (options.removeUnknownsAndDefaults)
        plugins.push("removeUnknownsAndDefaults");
      if (options.removeNonInheritableGroupAttrs)
        plugins.push("removeNonInheritableGroupAttrs");
      if (options.removeUselessStrokeAndFill)
        plugins.push("removeUselessStrokeAndFill");
      if (options.cleanupIds) plugins.push("cleanupIds");
      if (options.mergePaths) plugins.push("mergePaths");
      if (options.convertShapeToPath) plugins.push("convertShapeToPath");
      if (options.minifyStyles) plugins.push("minifyStyles");

      const config: Config = {
        multipass: true,
        plugins: plugins as Config["plugins"],
      };

      const result = optimize(inputSvg, config);

      setOutputSvg(result.data);
      trackUsage();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "SVG 최적화 중 오류가 발생했습니다",
      );
      setOutputSvg("");
    } finally {
      setIsProcessing(false);
    }
  }, [inputSvg, options, trackUsage]);

  const stats = useMemo(() => {
    const inputSize = new Blob([inputSvg]).size;
    const outputSize = new Blob([outputSvg]).size;
    const saved = inputSize - outputSize;
    const percent = inputSize > 0 ? Math.round((saved / inputSize) * 100) : 0;

    return {
      inputSize,
      outputSize,
      saved,
      percent,
    };
  }, [inputSvg, outputSvg]);

  const formatBytes = useCallback((bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const downloadSvg = useCallback(() => {
    if (!outputSvg) return;

    const blob = new Blob([outputSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, [outputSvg]);

  const reset = useCallback(() => {
    setInputSvg("");
    setOutputSvg("");
    setError(null);
  }, []);

  return {
    inputSvg,
    setInputSvg,
    outputSvg,
    options,
    updateOption,
    resetOptions,
    optimizeSvg,
    isProcessing,
    error,
    stats,
    formatBytes,
    copyToClipboard,
    downloadSvg,
    reset,
  };
}
