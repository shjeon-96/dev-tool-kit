/**
 * ONNX Runtime Wrapper
 * Provides a simplified interface for loading and running ONNX models
 */

import * as ort from "onnxruntime-web";

export type ExecutionProvider = "webgpu" | "wasm" | "cpu";

export interface OnnxSessionOptions {
  executionProviders?: ExecutionProvider[];
  graphOptimizationLevel?: "disabled" | "basic" | "extended" | "all";
  enableCpuMemArena?: boolean;
  enableMemPattern?: boolean;
  logSeverityLevel?: 0 | 1 | 2 | 3 | 4;
}

export interface OnnxSession {
  session: ort.InferenceSession;
  inputNames: string[];
  outputNames: string[];
  provider: ExecutionProvider;
}

// Configure ONNX Runtime Web to use WASM files from CDN
ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

/**
 * Create an ONNX inference session from a model URL or buffer
 */
export async function createSession(
  modelSource: string | ArrayBuffer,
  options: OnnxSessionOptions = {},
): Promise<OnnxSession> {
  const {
    executionProviders = ["webgpu", "wasm", "cpu"],
    graphOptimizationLevel = "all",
    enableCpuMemArena = true,
    enableMemPattern = true,
    logSeverityLevel = 2,
  } = options;

  // Try each execution provider in order
  let session: ort.InferenceSession | null = null;
  let usedProvider: ExecutionProvider = "cpu";

  for (const provider of executionProviders) {
    try {
      const sessionOptions: ort.InferenceSession.SessionOptions = {
        executionProviders: [provider],
        graphOptimizationLevel,
        enableCpuMemArena,
        enableMemPattern,
        logSeverityLevel,
      };

      if (typeof modelSource === "string") {
        session = await ort.InferenceSession.create(
          modelSource,
          sessionOptions,
        );
      } else {
        session = await ort.InferenceSession.create(
          modelSource,
          sessionOptions,
        );
      }

      usedProvider = provider;
      break;
    } catch (error) {
      console.warn(`Failed to create session with ${provider}:`, error);
      continue;
    }
  }

  if (!session) {
    throw new Error(
      "Failed to create ONNX session with any execution provider",
    );
  }

  return {
    session,
    inputNames: [...session.inputNames],
    outputNames: [...session.outputNames],
    provider: usedProvider,
  };
}

/**
 * Run inference on the session with the given inputs
 */
export async function runInference(
  onnxSession: OnnxSession,
  inputs: Record<string, ort.Tensor>,
): Promise<Record<string, ort.Tensor>> {
  const results = await onnxSession.session.run(inputs);
  return results;
}

/**
 * Create a tensor from an image data array
 */
export function createTensorFromImageData(
  imageData: Float32Array | Uint8Array,
  dims: [number, number, number, number], // [batch, channels, height, width]
): ort.Tensor {
  const floatData =
    imageData instanceof Float32Array
      ? imageData
      : new Float32Array(imageData).map((v) => v / 255.0);

  return new ort.Tensor("float32", floatData, dims);
}

/**
 * Dispose of a session and free resources
 */
export async function disposeSession(onnxSession: OnnxSession): Promise<void> {
  await onnxSession.session.release();
}

/**
 * Preprocess image for model input
 * Resizes and normalizes image to the expected input dimensions
 */
export function preprocessImage(
  canvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number,
  normalize: boolean = true,
): Float32Array {
  // Create a temporary canvas for resizing
  const resizeCanvas = document.createElement("canvas");
  resizeCanvas.width = targetWidth;
  resizeCanvas.height = targetHeight;
  const ctx = resizeCanvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Draw and resize
  ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
  const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  const { data } = imageData;

  // Convert to CHW format (Channels, Height, Width)
  const channels = 3;
  const pixels = targetWidth * targetHeight;
  const floatData = new Float32Array(channels * pixels);

  for (let i = 0; i < pixels; i++) {
    const srcIdx = i * 4;
    // RGB channels
    for (let c = 0; c < 3; c++) {
      const value = data[srcIdx + c];
      const normalizedValue = normalize ? value / 255.0 : value;
      floatData[c * pixels + i] = normalizedValue;
    }
  }

  return floatData;
}

/**
 * Postprocess model output to create a mask
 */
export function postprocessMask(
  outputData: Float32Array,
  outputWidth: number,
  outputHeight: number,
  threshold: number = 0.5,
): Uint8ClampedArray {
  const pixels = outputWidth * outputHeight;
  const maskData = new Uint8ClampedArray(pixels * 4);

  for (let i = 0; i < pixels; i++) {
    // Get the mask value (0-1)
    const maskValue = outputData[i];
    const alpha = maskValue > threshold ? 255 : 0;

    // Set RGBA values (white with variable alpha)
    maskData[i * 4] = 255; // R
    maskData[i * 4 + 1] = 255; // G
    maskData[i * 4 + 2] = 255; // B
    maskData[i * 4 + 3] = alpha; // A
  }

  return maskData;
}

export { ort };
