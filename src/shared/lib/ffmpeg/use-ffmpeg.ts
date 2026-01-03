"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

export type FFmpegLoadState = "idle" | "loading" | "ready" | "error";

interface UseFFmpegOptions {
  /**
   * Auto-load FFmpeg on mount (default: false)
   * Set to false for lazy loading on first use
   */
  autoLoad?: boolean;
  /**
   * Enable multi-threading (requires COOP/COEP headers)
   */
  multiThread?: boolean;
  /**
   * Log FFmpeg messages (useful for debugging)
   */
  enableLogging?: boolean;
}

interface UseFFmpegReturn {
  ffmpeg: FFmpeg | null;
  loadState: FFmpegLoadState;
  progress: number;
  error: string | null;
  load: () => Promise<boolean>;
  isReady: boolean;
  isLoading: boolean;
}

// CDN URLs for FFmpeg core files
const FFMPEG_CORE_URL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
const FFMPEG_CORE_MT_URL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";

/**
 * Custom hook for FFmpeg.wasm integration
 *
 * Usage:
 * ```tsx
 * const { ffmpeg, load, isReady, progress } = useFFmpeg({ autoLoad: false });
 *
 * // Load FFmpeg when needed
 * await load();
 *
 * // Use FFmpeg
 * if (isReady && ffmpeg) {
 *   await ffmpeg.writeFile("input.jpg", await fetchFile(file));
 *   await ffmpeg.exec(["-i", "input.jpg", "-vf", "scale=100:100", "output.jpg"]);
 *   const data = await ffmpeg.readFile("output.jpg");
 * }
 * ```
 */
export function useFFmpeg(options: UseFFmpegOptions = {}): UseFFmpegReturn {
  const {
    autoLoad = false,
    multiThread = true,
    enableLogging = false,
  } = options;

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [ffmpegInstance, setFfmpegInstance] = useState<FFmpeg | null>(null);
  const [loadState, setLoadState] = useState<FFmpegLoadState>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Check if SharedArrayBuffer is available (requires COOP/COEP headers)
  const canUseMultiThread = useCallback(() => {
    if (typeof window === "undefined") return false;
    return typeof SharedArrayBuffer !== "undefined";
  }, []);

  const load = useCallback(async (): Promise<boolean> => {
    // Already loaded or loading
    if (loadState === "ready" || loadState === "loading") {
      return loadState === "ready";
    }

    setLoadState("loading");
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;
      setFfmpegInstance(ffmpeg);

      // Set up logging if enabled (debug mode only)
      if (enableLogging) {
        ffmpeg.on("log", ({ message }) => {
          // eslint-disable-next-line no-console -- Intentional debug logging when enableLogging is true
          console.log("[FFmpeg]", message);
        });
      }

      // Set up progress tracking
      ffmpeg.on("progress", ({ progress: p }) => {
        setProgress(Math.round(p * 100));
      });

      // Determine if we can use multi-threading
      const useMultiThread = multiThread && canUseMultiThread();

      if (enableLogging) {
        // eslint-disable-next-line no-console -- Intentional debug logging when enableLogging is true
        console.log(
          `[FFmpeg] Loading ${useMultiThread ? "multi-threaded" : "single-threaded"} core...`,
        );
      }

      // Select the appropriate core URL
      const baseURL = useMultiThread ? FFMPEG_CORE_MT_URL : FFMPEG_CORE_URL;

      // Load FFmpeg core with blob URLs to bypass CORS
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript",
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm",
        ),
        ...(useMultiThread && {
          workerURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.worker.js`,
            "text/javascript",
          ),
        }),
      });

      setLoadState("ready");
      setProgress(100);

      if (enableLogging) {
        // eslint-disable-next-line no-console -- Intentional debug logging when enableLogging is true
        console.log("[FFmpeg] Loaded successfully!");
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load FFmpeg";

      console.error("[FFmpeg] Load error:", errorMessage);
      setError(errorMessage);
      setLoadState("error");
      setProgress(0);

      return false;
    }
  }, [loadState, multiThread, enableLogging, canUseMultiThread]);

  // Auto-load on mount if enabled
  const autoLoadAttempted = useRef(false);
  useEffect(() => {
    if (autoLoad && loadState === "idle" && !autoLoadAttempted.current) {
      autoLoadAttempted.current = true;
      // Schedule load asynchronously to avoid direct setState in effect body
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ffmpegRef.current) {
        ffmpegRef.current.terminate();
        ffmpegRef.current = null;
      }
    };
  }, []);

  return {
    ffmpeg: ffmpegInstance,
    loadState,
    progress,
    error,
    load,
    isReady: loadState === "ready",
    isLoading: loadState === "loading",
  };
}

// Re-export fetchFile for convenience
export { fetchFile };

// Utility types for FFmpeg operations
export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100
  format?: "jpg" | "png" | "webp" | "avif";
  maintainAspectRatio?: boolean;
}

/**
 * Process image using FFmpeg
 * @param ffmpeg FFmpeg instance
 * @param inputFile Input file (File, Blob, or URL)
 * @param options Processing options
 * @returns Processed image as Uint8Array
 */
export async function processImage(
  ffmpeg: FFmpeg,
  inputFile: File | Blob | string,
  options: ImageProcessingOptions = {},
): Promise<Uint8Array> {
  const {
    width,
    height,
    quality = 85,
    format = "jpg",
    maintainAspectRatio = true,
  } = options;

  // Write input file
  const inputName = "input";
  const outputName = `output.${format}`;
  await ffmpeg.writeFile(inputName, await fetchFile(inputFile));

  // Build FFmpeg arguments
  const args = ["-i", inputName];

  // Scale filter
  if (width || height) {
    if (maintainAspectRatio) {
      if (width && !height) {
        args.push("-vf", `scale=${width}:-1`);
      } else if (!width && height) {
        args.push("-vf", `scale=-1:${height}`);
      } else {
        args.push(
          "-vf",
          `scale=${width}:${height}:force_original_aspect_ratio=decrease`,
        );
      }
    } else {
      args.push("-vf", `scale=${width || -1}:${height || -1}`);
    }
  }

  // Quality settings by format
  switch (format) {
    case "jpg":
      args.push("-q:v", String(Math.round(((100 - quality) / 100) * 31)));
      break;
    case "webp":
      args.push("-quality", String(quality));
      break;
    case "avif":
      args.push("-crf", String(Math.round(((100 - quality) / 100) * 63)));
      break;
    case "png":
      // PNG is lossless, compression level 0-9
      args.push(
        "-compression_level",
        String(Math.round(((100 - quality) / 100) * 9)),
      );
      break;
  }

  args.push("-y", outputName);

  // Execute FFmpeg command
  await ffmpeg.exec(args);

  // Read output file
  const data = await ffmpeg.readFile(outputName);

  // Clean up
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return data as Uint8Array;
}
