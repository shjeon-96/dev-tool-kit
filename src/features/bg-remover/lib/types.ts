/**
 * Background Remover Types
 */

import type { ExecutionProvider } from "@/shared/lib/onnx";

/**
 * Supported model types
 */
export type ModelType = "u2net" | "u2netp" | "isnet";

/**
 * Model configuration
 */
export interface ModelConfig {
  name: ModelType;
  displayName: string;
  url: string;
  inputSize: number;
  description: string;
  fileSize: string;
}

/**
 * Processing options
 */
export interface ProcessingOptions {
  model: ModelType;
  threshold: number;
  featherRadius: number;
  outputFormat: "png" | "webp";
  backgroundColor?: string;
  preserveOriginalSize: boolean;
}

/**
 * Processing result
 */
export interface ProcessingResult {
  originalImage: string;
  resultImage: string;
  maskImage: string;
  width: number;
  height: number;
  processingTime: number;
  provider: ExecutionProvider;
}

/**
 * Processing progress
 */
export interface ProcessingProgress {
  stage:
    | "loading"
    | "preprocessing"
    | "inference"
    | "postprocessing"
    | "complete";
  progress: number;
  message: string;
}

/**
 * Model loading state
 */
export interface ModelState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  provider: ExecutionProvider | null;
  modelType: ModelType | null;
}

/**
 * Default processing options
 */
export const DEFAULT_PROCESSING_OPTIONS: ProcessingOptions = {
  model: "u2netp",
  threshold: 0.5,
  featherRadius: 0,
  outputFormat: "png",
  preserveOriginalSize: true,
};

/**
 * Available models
 * Using public HuggingFace repositories with Apache 2.0 license
 * @see https://huggingface.co/BritishWerewolf
 */
export const AVAILABLE_MODELS: Record<ModelType, ModelConfig> = {
  u2net: {
    name: "u2net",
    displayName: "U2-Net (High Quality)",
    url: "https://huggingface.co/BritishWerewolf/U-2-Net/resolve/main/onnx/model.onnx",
    inputSize: 320,
    description: "Higher accuracy, larger model (~176MB)",
    fileSize: "176MB",
  },
  u2netp: {
    name: "u2netp",
    displayName: "U2-Net-P (Fast)",
    url: "https://huggingface.co/BritishWerewolf/U-2-Netp/resolve/main/onnx/model.onnx",
    inputSize: 320,
    description: "Faster processing, smaller model (~4MB)",
    fileSize: "4MB",
  },
  isnet: {
    name: "isnet",
    displayName: "IS-Net (Detailed)",
    url: "https://huggingface.co/BritishWerewolf/IS-Net/resolve/main/onnx/model.onnx",
    inputSize: 1024,
    description: "Detailed edge detection (~179MB)",
    fileSize: "179MB",
  },
};
