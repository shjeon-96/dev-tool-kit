/**
 * Background Remover Model Loader
 * Handles loading and managing ONNX models for background removal
 */

import {
  createSession,
  disposeSession,
  type OnnxSession,
  type ExecutionProvider,
} from "@/shared/lib/onnx";
import { getRecommendedExecutionProvider } from "@/shared/lib/webgpu";
import { AVAILABLE_MODELS, type ModelType, type ModelConfig } from "./types";

let currentSession: OnnxSession | null = null;
let currentModelType: ModelType | null = null;

/**
 * Get model configuration
 */
export function getModelConfig(modelType: ModelType): ModelConfig {
  return AVAILABLE_MODELS[modelType];
}

/**
 * Load a model for inference
 */
export async function loadModel(
  modelType: ModelType,
  onProgress?: (progress: number, message: string) => void,
): Promise<{
  session: OnnxSession;
  provider: ExecutionProvider;
}> {
  // If same model is already loaded, return it
  if (currentSession && currentModelType === modelType) {
    return {
      session: currentSession,
      provider: currentSession.provider,
    };
  }

  // Dispose existing session if different model
  if (currentSession) {
    await disposeSession(currentSession);
    currentSession = null;
    currentModelType = null;
  }

  const config = getModelConfig(modelType);
  onProgress?.(0, `Loading ${config.displayName}...`);

  // Determine execution providers
  const recommendedProvider = getRecommendedExecutionProvider();
  const executionProviders: ExecutionProvider[] =
    recommendedProvider === "webgpu"
      ? ["webgpu", "wasm", "cpu"]
      : ["wasm", "cpu"];

  try {
    // Fetch model with progress tracking
    onProgress?.(10, "Downloading model...");

    const response = await fetch(config.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }

    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;
    let loaded = 0;

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    const chunks: Uint8Array[] = [];

    // Read chunks with progress
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      loaded += value.length;

      if (total > 0) {
        const downloadProgress = 10 + (loaded / total) * 60;
        onProgress?.(
          downloadProgress,
          `Downloading model... ${Math.round((loaded / total) * 100)}%`,
        );
      }
    }

    // Combine chunks into single buffer
    const modelBuffer = new Uint8Array(loaded);
    let offset = 0;
    for (const chunk of chunks) {
      modelBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    onProgress?.(75, "Initializing model...");

    // Create session
    const session = await createSession(modelBuffer.buffer, {
      executionProviders,
      graphOptimizationLevel: "all",
    });

    currentSession = session;
    currentModelType = modelType;

    onProgress?.(100, "Model loaded successfully");

    return {
      session,
      provider: session.provider,
    };
  } catch (error) {
    throw new Error(
      `Failed to load model: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get current model session
 */
export function getCurrentSession(): OnnxSession | null {
  return currentSession;
}

/**
 * Get current model type
 */
export function getCurrentModelType(): ModelType | null {
  return currentModelType;
}

/**
 * Unload the current model
 */
export async function unloadModel(): Promise<void> {
  if (currentSession) {
    await disposeSession(currentSession);
    currentSession = null;
    currentModelType = null;
  }
}

/**
 * Check if a model is loaded
 */
export function isModelLoaded(modelType?: ModelType): boolean {
  if (!currentSession) return false;
  if (modelType) return currentModelType === modelType;
  return true;
}
