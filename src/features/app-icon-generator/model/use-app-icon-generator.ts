"use client";

import { useState, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { iconPlatforms, getActualSize } from "../lib/icon-sizes";
import { useQuota } from "@/shared/lib/quota";

export interface SourceImage {
  file: File;
  preview: string;
  width: number;
  height: number;
}

export function useAppIconGenerator() {
  const { trackUsage } = useQuota("app-icon-generator");

  const [sourceImage, setSourceImage] = useState<SourceImage | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "ios",
    "android",
    "favicon",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadImage = useCallback((file: File): Promise<SourceImage> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            file,
            preview: e.target?.result as string,
            width: img.width,
            height: img.height,
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
        const image = await loadImage(file);

        if (image.width < 1024 || image.height < 1024) {
          setError("최소 1024x1024 픽셀 이상의 이미지를 사용하세요.");
        }

        setSourceImage(image);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load image");
      }
    },
    [loadImage],
  );

  const togglePlatform = useCallback((platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId],
    );
  }, []);

  const resizeToSize = useCallback(
    (img: HTMLImageElement, size: number): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, size, size);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create blob"));
          },
          "image/png",
          1.0,
        );
      });
    },
    [],
  );

  const generateIcons = useCallback(async () => {
    if (!sourceImage) return;

    setIsGenerating(true);
    setProgress(0);
    setError(null);

    try {
      const zip = new JSZip();
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = sourceImage.preview;
      });

      const platforms = iconPlatforms.filter((p) =>
        selectedPlatforms.includes(p.id),
      );

      const totalIcons = platforms.reduce((sum, p) => sum + p.sizes.length, 0);
      let processedIcons = 0;

      for (const platform of platforms) {
        const folder = zip.folder(platform.id);
        if (!folder) continue;

        for (const iconSize of platform.sizes) {
          const actualSize = getActualSize(iconSize);
          const blob = await resizeToSize(img, actualSize);

          const pathParts = iconSize.filename.split("/");
          if (pathParts.length > 1) {
            const subFolder = folder.folder(pathParts.slice(0, -1).join("/"));
            subFolder?.file(pathParts[pathParts.length - 1], blob);
          } else {
            folder.file(iconSize.filename, blob);
          }

          processedIcons++;
          setProgress(Math.round((processedIcons / totalIcons) * 100));
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "app-icons.zip");
      trackUsage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate icons");
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  }, [sourceImage, selectedPlatforms, resizeToSize, trackUsage]);

  const handleClear = useCallback(() => {
    if (sourceImage?.preview) {
      URL.revokeObjectURL(sourceImage.preview);
    }
    setSourceImage(null);
    setError(null);
    setProgress(0);
  }, [sourceImage]);

  return {
    sourceImage,
    selectedPlatforms,
    isGenerating,
    progress,
    error,
    platforms: iconPlatforms,
    handleFileSelect,
    togglePlatform,
    generateIcons,
    handleClear,
  };
}
