"use client";

import { useState, useCallback, useEffect } from "react";
import {
  type ImageFormat,
  type ConversionOptions,
  type ImageFile,
  type ConvertedImage,
  DEFAULT_OPTIONS,
  getFormatFromMimeType,
  FORMAT_INFO,
} from "../lib/types";
import {
  convertImage,
  getImageInfo,
  blobToDataUrl,
  downloadBlob,
  checkAllFormatSupport,
} from "../lib/converter";

export interface UseImageConverterReturn {
  // 상태
  images: ImageFile[];
  convertedImages: ConvertedImage[];
  options: ConversionOptions;
  isConverting: boolean;
  progress: number;
  formatSupport: Record<ImageFormat, boolean>;

  // 액션
  addImages: (files: FileList | File[]) => Promise<void>;
  removeImage: (id: string) => void;
  clearImages: () => void;
  setOptions: (options: Partial<ConversionOptions>) => void;
  convertAll: () => Promise<void>;
  downloadResult: (converted: ConvertedImage) => void;
  downloadAll: () => void;
}

export function useImageConverter(): UseImageConverterReturn {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [options, setOptionsState] =
    useState<ConversionOptions>(DEFAULT_OPTIONS);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formatSupport, setFormatSupport] = useState<
    Record<ImageFormat, boolean>
  >({
    jpeg: true,
    png: true,
    webp: true,
    avif: false,
    gif: true,
  });

  // 포맷 지원 여부 확인
  useEffect(() => {
    checkAllFormatSupport().then(setFormatSupport);
  }, []);

  // 이미지 추가
  const addImages = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );

    const newImages: ImageFile[] = [];

    for (const file of fileArray) {
      try {
        const { width, height } = await getImageInfo(file);
        const previewUrl = URL.createObjectURL(file);
        const format = getFormatFromMimeType(file.type);

        newImages.push({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          size: file.size,
          format,
          width,
          height,
          previewUrl,
        });
      } catch {
        // 로드 실패한 이미지는 무시
        console.warn(`Failed to load image: ${file.name}`);
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    // 새 이미지가 추가되면 이전 변환 결과 초기화
    setConvertedImages([]);
  }, []);

  // 이미지 제거
  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
    setConvertedImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  // 모든 이미지 삭제
  const clearImages = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setConvertedImages([]);
    setProgress(0);
  }, [images]);

  // 옵션 설정
  const setOptions = useCallback((newOptions: Partial<ConversionOptions>) => {
    setOptionsState((prev) => ({ ...prev, ...newOptions }));
    // 옵션이 변경되면 이전 변환 결과 초기화
    setConvertedImages([]);
  }, []);

  // 모든 이미지 변환
  const convertAll = useCallback(async () => {
    if (images.length === 0) return;

    setIsConverting(true);
    setProgress(0);
    setConvertedImages([]);

    const results: ConvertedImage[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      try {
        const blob = await convertImage(image.file, options);
        const dataUrl = await blobToDataUrl(blob);

        results.push({
          id: image.id,
          originalName: image.name,
          originalSize: image.size,
          originalFormat: image.format,
          convertedBlob: blob,
          convertedSize: blob.size,
          convertedFormat: options.format,
          dataUrl,
        });
      } catch (error) {
        console.error(`Failed to convert ${image.name}:`, error);
      }

      setProgress(Math.round(((i + 1) / images.length) * 100));
    }

    setConvertedImages(results);
    setIsConverting(false);
  }, [images, options]);

  // 결과 다운로드
  const downloadResult = useCallback((converted: ConvertedImage) => {
    downloadBlob(
      converted.convertedBlob,
      converted.originalName,
      converted.convertedFormat,
    );
  }, []);

  // 모든 결과 다운로드
  const downloadAll = useCallback(() => {
    convertedImages.forEach((converted) => {
      downloadBlob(
        converted.convertedBlob,
        converted.originalName,
        converted.convertedFormat,
      );
    });
  }, [convertedImages]);

  // cleanup
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  return {
    images,
    convertedImages,
    options,
    isConverting,
    progress,
    formatSupport,
    addImages,
    removeImage,
    clearImages,
    setOptions,
    convertAll,
    downloadResult,
    downloadAll,
  };
}

// Re-export types
export type { ImageFormat, ConversionOptions, ImageFile, ConvertedImage };
export {
  FORMAT_INFO,
  formatFileSize,
  calculateCompressionRatio,
} from "../lib/types";
