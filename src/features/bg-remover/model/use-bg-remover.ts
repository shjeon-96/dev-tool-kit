"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  loadModel,
  unloadModel,
  isModelLoaded,
  getCurrentSession,
} from "../lib/model";
import { removeBackground, downloadImage } from "../lib/remove";
import {
  DEFAULT_PROCESSING_OPTIONS,
  AVAILABLE_MODELS,
  type ModelType,
  type ProcessingOptions,
  type ProcessingResult,
  type ProcessingProgress,
  type ModelState,
} from "../lib/types";
import type { ExecutionProvider } from "@/shared/lib/onnx";

interface UseBgRemoverReturn {
  // State
  modelState: ModelState;
  processingProgress: ProcessingProgress | null;
  result: ProcessingResult | null;
  options: ProcessingOptions;
  selectedFile: File | null;
  previewUrl: string | null;

  // Actions
  loadSelectedModel: (modelType: ModelType) => Promise<void>;
  processImage: (file: File) => Promise<void>;
  setOptions: (options: Partial<ProcessingOptions>) => void;
  setSelectedFile: (file: File | null) => void;
  downloadResult: (type: "result" | "mask") => void;
  reset: () => void;

  // Constants
  availableModels: typeof AVAILABLE_MODELS;
}

export function useBgRemover(): UseBgRemoverReturn {
  // Model state
  const [modelState, setModelState] = useState<ModelState>({
    isLoaded: false,
    isLoading: false,
    error: null,
    provider: null,
    modelType: null,
  });

  // Processing state
  const [processingProgress, setProcessingProgress] =
    useState<ProcessingProgress | null>(null);
  const [result, setResult] = useState<ProcessingResult | null>(null);

  // Options
  const [options, setOptionsState] = useState<ProcessingOptions>(
    DEFAULT_PROCESSING_OPTIONS,
  );

  // File state
  const [selectedFile, setSelectedFileState] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Refs for cleanup
  const previewUrlRef = useRef<string | null>(null);

  // Cleanup preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  // Load model
  const loadSelectedModel = useCallback(async (modelType: ModelType) => {
    if (isModelLoaded(modelType)) {
      const session = getCurrentSession();
      if (session) {
        setModelState({
          isLoaded: true,
          isLoading: false,
          error: null,
          provider: session.provider,
          modelType,
        });
      }
      return;
    }

    setModelState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const { provider } = await loadModel(modelType, (progress, message) => {
        setProcessingProgress({
          stage: "loading",
          progress,
          message,
        });
      });

      setModelState({
        isLoaded: true,
        isLoading: false,
        error: null,
        provider,
        modelType,
      });

      setOptionsState((prev) => ({ ...prev, model: modelType }));
    } catch (error) {
      setModelState({
        isLoaded: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load model",
        provider: null,
        modelType: null,
      });
    } finally {
      setProcessingProgress(null);
    }
  }, []);

  // Process image
  const processImage = useCallback(
    async (file: File) => {
      const session = getCurrentSession();
      if (!session || !modelState.modelType) {
        throw new Error("Model not loaded");
      }

      setProcessingProgress({
        stage: "preprocessing",
        progress: 0,
        message: "Starting...",
      });

      try {
        const processingResult = await removeBackground(
          file,
          session,
          modelState.modelType,
          options,
          setProcessingProgress,
        );

        setResult(processingResult);
      } catch (error) {
        setProcessingProgress(null);
        throw error;
      }
    },
    [modelState.modelType, options],
  );

  // Set selected file
  const setSelectedFile = useCallback((file: File | null) => {
    // Cleanup previous preview
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setSelectedFileState(file);
    setResult(null);

    if (file) {
      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, []);

  // Update options
  const setOptions = useCallback((newOptions: Partial<ProcessingOptions>) => {
    setOptionsState((prev) => ({ ...prev, ...newOptions }));
  }, []);

  // Download result
  const downloadResult = useCallback(
    (type: "result" | "mask") => {
      if (!result) return;

      const dataUrl = type === "result" ? result.resultImage : result.maskImage;
      const extension = options.outputFormat;
      const filename = `bg-removed-${type}.${extension}`;

      downloadImage(dataUrl, filename);
    },
    [result, options.outputFormat],
  );

  // Reset all state
  const reset = useCallback(() => {
    setSelectedFile(null);
    setResult(null);
    setProcessingProgress(null);
    setOptionsState(DEFAULT_PROCESSING_OPTIONS);
  }, [setSelectedFile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unloadModel();
    };
  }, []);

  return {
    // State
    modelState,
    processingProgress,
    result,
    options,
    selectedFile,
    previewUrl,

    // Actions
    loadSelectedModel,
    processImage,
    setOptions,
    setSelectedFile,
    downloadResult,
    reset,

    // Constants
    availableModels: AVAILABLE_MODELS,
  };
}
