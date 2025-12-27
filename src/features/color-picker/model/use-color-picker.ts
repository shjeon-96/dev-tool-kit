"use client";

import { useState, useCallback, useRef } from "react";
import { useQuota } from "@/features/quota";

export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export interface ExtractedColor extends ColorInfo {
  count: number;
  percentage: number;
}

export interface ImageSource {
  file: File;
  preview: string;
  width: number;
  height: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function useColorPicker() {
  const { trackUsage } = useQuota("color-picker");

  const [imageSource, setImageSource] = useState<ImageSource | null>(null);
  const [palette, setPalette] = useState<ExtractedColor[]>([]);
  const [selectedColor, setSelectedColor] = useState<ColorInfo | null>(null);
  const [pickedColors, setPickedColors] = useState<ColorInfo[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const loadImage = useCallback((file: File): Promise<ImageSource> => {
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
        setPalette([]);
        setPickedColors([]);
        setSelectedColor(null);

        const source = await loadImage(file);
        setImageSource(source);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load image");
      }
    },
    [loadImage],
  );

  const extractPalette = useCallback(
    async (colorCount: number = 8) => {
      if (!imageSource) return;

      setIsExtracting(true);
      setError(null);

      try {
        const img = new Image();
        img.crossOrigin = "anonymous";

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = imageSource.preview;
        });

        const canvas = document.createElement("canvas");
        const sampleSize = 100;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        const ctx = canvas.getContext("2d");

        if (!ctx) throw new Error("Failed to get canvas context");

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;

        const colorMap = new Map<string, number>();
        const totalPixels = sampleSize * sampleSize;

        for (let i = 0; i < data.length; i += 4) {
          const r = Math.round(data[i] / 16) * 16;
          const g = Math.round(data[i + 1] / 16) * 16;
          const b = Math.round(data[i + 2] / 16) * 16;
          const key = `${r},${g},${b}`;
          colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }

        const sortedColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, colorCount);

        const extractedPalette: ExtractedColor[] = sortedColors.map(
          ([key, count]) => {
            const [r, g, b] = key.split(",").map(Number);
            return {
              hex: rgbToHex(r, g, b),
              rgb: { r, g, b },
              hsl: rgbToHsl(r, g, b),
              count,
              percentage: Math.round((count / totalPixels) * 100),
            };
          },
        );

        setPalette(extractedPalette);
        trackUsage();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to extract colors");
      } finally {
        setIsExtracting(false);
      }
    },
    [imageSource, trackUsage],
  );

  const pickColorFromImage = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = Math.floor((event.clientX - rect.left) * scaleX);
      const y = Math.floor((event.clientY - rect.top) * scaleY);

      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];

      const color: ColorInfo = {
        hex: rgbToHex(r, g, b),
        rgb: { r, g, b },
        hsl: rgbToHsl(r, g, b),
      };

      setSelectedColor(color);
    },
    [],
  );

  const addToPickedColors = useCallback(() => {
    if (
      selectedColor &&
      !pickedColors.some((c) => c.hex === selectedColor.hex)
    ) {
      setPickedColors((prev) => [...prev, selectedColor]);
    }
  }, [selectedColor, pickedColors]);

  const removePickedColor = useCallback((hex: string) => {
    setPickedColors((prev) => prev.filter((c) => c.hex !== hex));
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (imageSource?.preview) {
      URL.revokeObjectURL(imageSource.preview);
    }
    setImageSource(null);
    setPalette([]);
    setPickedColors([]);
    setSelectedColor(null);
    setError(null);
  }, [imageSource]);

  return {
    imageSource,
    palette,
    selectedColor,
    pickedColors,
    isExtracting,
    error,
    canvasRef,
    imageRef,
    handleFileSelect,
    extractPalette,
    pickColorFromImage,
    addToPickedColors,
    removePickedColor,
    copyToClipboard,
    handleClear,
    setSelectedColor,
  };
}
