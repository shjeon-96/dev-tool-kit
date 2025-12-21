/**
 * Background Removal Logic
 * Core implementation for removing backgrounds from images
 */

import {
  runInference,
  preprocessImage,
  ort,
  type OnnxSession,
} from "@/shared/lib/onnx";
import { getModelConfig } from "./model";
import type {
  ProcessingOptions,
  ProcessingResult,
  ProcessingProgress,
  ModelType,
} from "./types";

/**
 * Load an image from a file or URL into a canvas
 */
export async function loadImageToCanvas(source: File | string): Promise<{
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      resolve({
        canvas,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    if (source instanceof File) {
      img.src = URL.createObjectURL(source);
    } else {
      img.src = source;
    }
  });
}

/**
 * Apply feathering to mask edges
 */
function applyFeathering(
  maskData: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number,
): Uint8ClampedArray {
  if (radius === 0) return maskData;

  // Simple box blur for feathering
  const result = new Uint8ClampedArray(maskData.length);
  const kernelSize = radius * 2 + 1;
  const kernelArea = kernelSize * kernelSize;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let alphaSum = 0;

      for (let ky = -radius; ky <= radius; ky++) {
        for (let kx = -radius; kx <= radius; kx++) {
          const sx = Math.min(Math.max(x + kx, 0), width - 1);
          const sy = Math.min(Math.max(y + ky, 0), height - 1);
          alphaSum += maskData[(sy * width + sx) * 4 + 3];
        }
      }

      const idx = (y * width + x) * 4;
      result[idx] = 255; // R
      result[idx + 1] = 255; // G
      result[idx + 2] = 255; // B
      result[idx + 3] = Math.round(alphaSum / kernelArea); // A
    }
  }

  return result;
}

/**
 * Apply mask to original image
 */
function applyMaskToImage(
  originalCanvas: HTMLCanvasElement,
  maskData: Uint8ClampedArray,
  maskWidth: number,
  maskHeight: number,
  backgroundColor?: string,
): HTMLCanvasElement {
  const { width, height } = originalCanvas;
  const resultCanvas = document.createElement("canvas");
  resultCanvas.width = width;
  resultCanvas.height = height;

  const ctx = resultCanvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  // Fill background if specified
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  // Get original image data
  const originalCtx = originalCanvas.getContext("2d");
  if (!originalCtx) throw new Error("Failed to get original canvas context");
  const originalData = originalCtx.getImageData(0, 0, width, height);

  // Create temporary canvas for mask at original size
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = maskWidth;
  maskCanvas.height = maskHeight;
  const maskCtx = maskCanvas.getContext("2d");
  if (!maskCtx) throw new Error("Failed to get mask canvas context");

  // Put mask data
  const maskImageData = maskCtx.createImageData(maskWidth, maskHeight);
  maskImageData.data.set(maskData);
  maskCtx.putImageData(maskImageData, 0, 0);

  // Scale mask to original size
  const scaledMaskCanvas = document.createElement("canvas");
  scaledMaskCanvas.width = width;
  scaledMaskCanvas.height = height;
  const scaledMaskCtx = scaledMaskCanvas.getContext("2d");
  if (!scaledMaskCtx)
    throw new Error("Failed to get scaled mask canvas context");

  scaledMaskCtx.drawImage(maskCanvas, 0, 0, width, height);
  const scaledMaskData = scaledMaskCtx.getImageData(0, 0, width, height);

  // Apply mask to original
  const resultData = ctx.createImageData(width, height);

  for (let i = 0; i < originalData.data.length; i += 4) {
    const alpha = scaledMaskData.data[i + 3] / 255;

    if (backgroundColor) {
      // Blend with background
      resultData.data[i] =
        originalData.data[i] * alpha + resultData.data[i] * (1 - alpha);
      resultData.data[i + 1] =
        originalData.data[i + 1] * alpha + resultData.data[i + 1] * (1 - alpha);
      resultData.data[i + 2] =
        originalData.data[i + 2] * alpha + resultData.data[i + 2] * (1 - alpha);
      resultData.data[i + 3] = 255;
    } else {
      // Transparent background
      resultData.data[i] = originalData.data[i];
      resultData.data[i + 1] = originalData.data[i + 1];
      resultData.data[i + 2] = originalData.data[i + 2];
      resultData.data[i + 3] = scaledMaskData.data[i + 3];
    }
  }

  ctx.putImageData(resultData, 0, 0);
  return resultCanvas;
}

/**
 * Sigmoid function for normalization
 */
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Process mask output from model
 */
function processMaskOutput(
  outputData: Float32Array,
  width: number,
  height: number,
  threshold: number,
): Uint8ClampedArray {
  const pixels = width * height;
  const maskData = new Uint8ClampedArray(pixels * 4);

  // Find min/max for normalization
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < pixels; i++) {
    const val = outputData[i];
    min = Math.min(min, val);
    max = Math.max(max, val);
  }

  const range = max - min || 1;

  for (let i = 0; i < pixels; i++) {
    // Normalize and apply sigmoid
    const normalized = (outputData[i] - min) / range;
    const value = sigmoid((normalized - 0.5) * 10); // Sharpen edges

    // Apply threshold
    const alpha = value > threshold ? Math.round(value * 255) : 0;

    maskData[i * 4] = 255; // R
    maskData[i * 4 + 1] = 255; // G
    maskData[i * 4 + 2] = 255; // B
    maskData[i * 4 + 3] = alpha; // A
  }

  return maskData;
}

/**
 * Remove background from an image
 */
export async function removeBackground(
  imageSource: File | string,
  session: OnnxSession,
  modelType: ModelType,
  options: Partial<ProcessingOptions> = {},
  onProgress?: (progress: ProcessingProgress) => void,
): Promise<ProcessingResult> {
  const startTime = performance.now();
  const config = getModelConfig(modelType);

  const {
    threshold = 0.5,
    featherRadius = 0,
    outputFormat = "png",
    backgroundColor,
  } = options;

  // Stage 1: Load image
  onProgress?.({
    stage: "preprocessing",
    progress: 0,
    message: "Loading image...",
  });

  const {
    canvas: originalCanvas,
    width,
    height,
  } = await loadImageToCanvas(imageSource);

  // Stage 2: Preprocess
  onProgress?.({
    stage: "preprocessing",
    progress: 25,
    message: "Preprocessing image...",
  });

  const inputSize = config.inputSize;
  const inputData = preprocessImage(originalCanvas, inputSize, inputSize, true);

  // Create input tensor (NCHW format)
  const inputTensor = new ort.Tensor("float32", inputData, [
    1,
    3,
    inputSize,
    inputSize,
  ]);

  // Stage 3: Run inference
  onProgress?.({
    stage: "inference",
    progress: 50,
    message: "Running AI inference...",
  });

  const inputName = session.inputNames[0];
  const outputs = await runInference(session, { [inputName]: inputTensor });

  // Get the output (typically the first/main output)
  const outputName = session.outputNames[0];
  const outputTensor = outputs[outputName];
  const outputData = outputTensor.data as Float32Array;

  // Get output dimensions
  const outputDims = outputTensor.dims;
  const outputHeight = outputDims[2] as number;
  const outputWidth = outputDims[3] as number;

  // Stage 4: Postprocess
  onProgress?.({
    stage: "postprocessing",
    progress: 75,
    message: "Generating mask...",
  });

  // Process mask
  let maskData = processMaskOutput(
    outputData,
    outputWidth,
    outputHeight,
    threshold,
  );

  // Apply feathering if specified
  if (featherRadius > 0) {
    maskData = applyFeathering(
      maskData,
      outputWidth,
      outputHeight,
      featherRadius,
    );
  }

  // Apply mask to original image
  onProgress?.({
    stage: "postprocessing",
    progress: 90,
    message: "Applying mask...",
  });

  const resultCanvas = applyMaskToImage(
    originalCanvas,
    maskData,
    outputWidth,
    outputHeight,
    backgroundColor,
  );

  // Create mask canvas for visualization
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = outputWidth;
  maskCanvas.height = outputHeight;
  const maskCtx = maskCanvas.getContext("2d");
  if (maskCtx) {
    const maskImageData = maskCtx.createImageData(outputWidth, outputHeight);
    maskImageData.data.set(maskData);
    maskCtx.putImageData(maskImageData, 0, 0);
  }

  // Convert to data URLs
  const mimeType = outputFormat === "webp" ? "image/webp" : "image/png";
  const resultImage = resultCanvas.toDataURL(mimeType);
  const maskImage = maskCanvas.toDataURL("image/png");
  const originalImage = originalCanvas.toDataURL("image/png");

  const endTime = performance.now();

  onProgress?.({
    stage: "complete",
    progress: 100,
    message: "Complete!",
  });

  return {
    originalImage,
    resultImage,
    maskImage,
    width,
    height,
    processingTime: endTime - startTime,
    provider: session.provider,
  };
}

/**
 * Download result image
 */
export function downloadImage(
  dataUrl: string,
  filename: string = "result.png",
): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
