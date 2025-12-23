"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  ResizeTarget,
  ResizeResult,
} from "@/entities/image-resize-target";

export interface ImageInfo {
  file: File;
  width: number;
  height: number;
  preview: string;
}

export function useResizeTarget(target: ResizeTarget) {
  const [originalImage, setOriginalImage] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (originalImage?.preview) {
        URL.revokeObjectURL(originalImage.preview);
      }
      if (result?.preview) {
        URL.revokeObjectURL(result.preview);
      }
    };
  }, [originalImage?.preview, result?.preview]);

  const loadImage = useCallback((file: File): Promise<ImageInfo> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            file,
            width: img.width,
            height: img.height,
            preview: e.target?.result as string,
          });
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      try {
        setError(null);
        setResult(null);
        setProgress(0);

        const imageInfo = await loadImage(file);
        setOriginalImage(imageInfo);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load image");
      }
    },
    [loadImage],
  );

  // 파일 사이즈 타겟용 리사이즈 (품질 조절로 크기 맞추기)
  const resizeToFileSize = useCallback(
    async (
      img: HTMLImageElement,
      targetSizeKB: number,
      format: "jpeg" | "webp" = "jpeg",
    ): Promise<{ blob: Blob; width: number; height: number }> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      // 초기 크기 설정 (최대 1920x1080 or 원본 중 작은 것)
      let width = Math.min(img.width, 1920);
      let height = Math.min(img.height, 1080);
      const aspectRatio = img.width / img.height;

      // 종횡비 유지
      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // 이진 탐색으로 최적 품질 찾기
      let minQuality = 0.1;
      let maxQuality = 1.0;
      let bestBlob: Blob | null = null;
      const targetBytes = targetSizeKB * 1024;
      const tolerance = 0.05; // 5% 허용 오차

      for (let i = 0; i < 10; i++) {
        const quality = (minQuality + maxQuality) / 2;
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("Blob creation failed"))),
            `image/${format}`,
            quality,
          );
        });

        if (blob.size <= targetBytes) {
          bestBlob = blob;
          if (blob.size >= targetBytes * (1 - tolerance)) {
            break; // 목표에 충분히 근접
          }
          minQuality = quality;
        } else {
          maxQuality = quality;
        }
      }

      // 품질만으로 안되면 크기 축소
      if (!bestBlob || bestBlob.size > targetBytes) {
        const scale = Math.sqrt(
          targetBytes / (bestBlob?.size || targetBytes * 2),
        );
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        bestBlob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("Blob creation failed"))),
            `image/${format}`,
            0.85,
          );
        });
      }

      return {
        blob: bestBlob,
        width: canvas.width,
        height: canvas.height,
      };
    },
    [],
  );

  // 디멘션 타겟용 리사이즈
  const resizeToDimension = useCallback(
    async (
      img: HTMLImageElement,
      targetWidth: number,
      targetHeight: number,
      format: "png" | "jpeg" | "webp" = "png",
    ): Promise<{ blob: Blob; width: number; height: number }> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 배경을 흰색으로 (JPEG용)
      if (format === "jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      // 종횡비 유지하면서 중앙에 맞추기 (cover 방식)
      const scale = Math.max(
        targetWidth / img.width,
        targetHeight / img.height,
      );
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (targetWidth - scaledWidth) / 2;
      const y = (targetHeight - scaledHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      const quality = format === "png" ? undefined : 0.92;
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Blob creation failed"))),
          `image/${format}`,
          quality,
        );
      });

      return { blob, width: targetWidth, height: targetHeight };
    },
    [],
  );

  const resize = useCallback(async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);
    setProgress(10);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = originalImage.preview;
      });

      setProgress(30);

      let resizeResult: { blob: Blob; width: number; height: number };

      if (target.type === "file-size" && target.targetSizeKB) {
        resizeResult = await resizeToFileSize(img, target.targetSizeKB);
      } else if (target.targetWidth && target.targetHeight) {
        const format =
          target.type === "platform" && target.platform?.includes("favicon")
            ? "png"
            : "jpeg";
        resizeResult = await resizeToDimension(
          img,
          target.targetWidth,
          target.targetHeight,
          format,
        );
      } else {
        throw new Error("Invalid resize target");
      }

      setProgress(80);

      const preview = URL.createObjectURL(resizeResult.blob);
      const file = new File(
        [resizeResult.blob],
        `resized-${target.slug}.${resizeResult.blob.type.split("/")[1]}`,
        { type: resizeResult.blob.type },
      );

      setResult({
        success: true,
        file,
        preview,
        originalSize: originalImage.file.size,
        newSize: resizeResult.blob.size,
        width: resizeResult.width,
        height: resizeResult.height,
      });

      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Resize failed");
      setResult({
        success: false,
        originalSize: originalImage.file.size,
        newSize: 0,
        width: 0,
        height: 0,
        error: e instanceof Error ? e.message : "Resize failed",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, target, resizeToFileSize, resizeToDimension]);

  const download = useCallback(() => {
    if (!result?.file || !result?.preview) return;

    const link = document.createElement("a");
    link.href = result.preview;
    link.download = result.file.name;
    link.click();
  }, [result]);

  const clear = useCallback(() => {
    if (originalImage?.preview) {
      URL.revokeObjectURL(originalImage.preview);
    }
    if (result?.preview) {
      URL.revokeObjectURL(result.preview);
    }
    setOriginalImage(null);
    setResult(null);
    setError(null);
    setProgress(0);
  }, [originalImage?.preview, result?.preview]);

  return {
    originalImage,
    result,
    isProcessing,
    error,
    progress,
    handleFileSelect,
    resize,
    download,
    clear,
    canvasRef,
  };
}
