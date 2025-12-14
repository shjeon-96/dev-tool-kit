"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useFFmpeg, fetchFile } from "@/shared/lib/ffmpeg";

export type OutputFormat = "image/png" | "image/jpeg" | "image/webp";
export type ResizeMode = "pixel" | "percent";

export interface ImageInfo {
  file: File;
  width: number;
  height: number;
  preview: string;
}

export interface ResizeOptions {
  width: number;
  height: number;
  mode: ResizeMode;
  format: OutputFormat;
  quality: number;
  maintainAspectRatio: boolean;
}

// 출력 포맷에 따른 확장자 매핑
const FORMAT_TO_EXT: Record<OutputFormat, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export function useImageResizer() {
  const [originalImage, setOriginalImage] = useState<ImageInfo | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    mode: "pixel",
    format: "image/png",
    quality: 0.9,
    maintainAspectRatio: true,
  });

  const {
    ffmpeg,
    load: loadFFmpeg,
    isReady: ffmpegReady,
    isLoading: ffmpegLoading,
    error: ffmpegError,
  } = useFFmpeg({ multiThread: true, enableLogging: false });

  // Check if SharedArrayBuffer is supported (WebAssembly multi-threading)
  const isWasmSupported = typeof SharedArrayBuffer !== "undefined";

  // FFmpeg 로드 상태 에러 표시
  useEffect(() => {
    if (ffmpegError) {
      // FFmpeg 로드 실패해도 Canvas 폴백으로 동작하므로 경고만 표시
      console.warn("FFmpeg load warning:", ffmpegError);
    }
  }, [ffmpegError]);

  // 컴포넌트 마운트 시 FFmpeg 로드 시도
  const ffmpegLoadAttempted = useRef(false);
  useEffect(() => {
    if (
      !ffmpegLoadAttempted.current &&
      !ffmpegReady &&
      !ffmpegLoading &&
      isWasmSupported
    ) {
      ffmpegLoadAttempted.current = true;
      loadFFmpeg().catch(() => {
        // 에러는 ffmpegError에서 처리됨, Canvas 폴백 사용
      });
    }
  }, [loadFFmpeg, ffmpegReady, ffmpegLoading, isWasmSupported]);

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
        img.onerror = () => reject(new Error("이미지 로드 실패"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("파일 읽기 실패"));
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      try {
        setError(null);
        setResizedImage(null);
        setResizedFile(null);
        setProgress(0);

        const imageInfo = await loadImage(file);
        setOriginalImage(imageInfo);

        // 초기 크기 설정
        setOptions((prev) => ({
          ...prev,
          width: imageInfo.width,
          height: imageInfo.height,
        }));
      } catch (e) {
        setError(e instanceof Error ? e.message : "이미지 로드 실패");
      }
    },
    [loadImage],
  );

  const calculateDimensions = useCallback(
    (
      originalWidth: number,
      originalHeight: number,
      targetWidth: number,
      targetHeight: number,
      mode: ResizeMode,
      maintainAspectRatio: boolean,
    ) => {
      let newWidth = targetWidth;
      let newHeight = targetHeight;

      if (mode === "percent") {
        newWidth = Math.round((originalWidth * targetWidth) / 100);
        newHeight = Math.round((originalHeight * targetHeight) / 100);
      }

      if (maintainAspectRatio && mode === "pixel") {
        const aspectRatio = originalWidth / originalHeight;
        if (newWidth / newHeight > aspectRatio) {
          newWidth = Math.round(newHeight * aspectRatio);
        } else {
          newHeight = Math.round(newWidth / aspectRatio);
        }
      }

      return { width: newWidth, height: newHeight };
    },
    [],
  );

  // FFmpeg를 사용한 이미지 리사이즈
  const resizeWithFFmpeg = useCallback(async () => {
    if (!originalImage || !ffmpeg || !ffmpegReady) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const { width, height } = calculateDimensions(
        originalImage.width,
        originalImage.height,
        options.width,
        options.height,
        options.mode,
        options.maintainAspectRatio,
      );

      setProgress(10);

      // 입력 파일 이름과 출력 파일 이름 설정
      const inputExt = originalImage.file.name.split(".").pop() || "png";
      const inputName = `input.${inputExt}`;
      const outputExt = FORMAT_TO_EXT[options.format];
      const outputName = `output.${outputExt}`;

      // 입력 파일을 FFmpeg 파일 시스템에 쓰기
      const inputData = await fetchFile(originalImage.file);
      await ffmpeg.writeFile(inputName, inputData);

      setProgress(30);

      // FFmpeg 명령어 구성
      // -vf scale: 리사이즈
      // -q:v: 품질 설정 (1=최고품질, 31=최저품질, JPEG/WebP용)
      const qualityValue = Math.round(31 - options.quality * 30); // 0.9 -> 4, 0.1 -> 28

      const args = [
        "-i",
        inputName,
        "-vf",
        `scale=${width}:${height}:flags=lanczos`,
      ];

      // 포맷별 품질 설정
      if (options.format === "image/jpeg") {
        args.push("-q:v", String(qualityValue));
      } else if (options.format === "image/webp") {
        args.push("-quality", String(Math.round(options.quality * 100)));
      }

      args.push("-y", outputName);

      setProgress(50);

      // FFmpeg 실행
      await ffmpeg.exec(args);

      setProgress(80);

      // 출력 파일 읽기
      const outputData = await ffmpeg.readFile(outputName);

      // Uint8Array로 변환 (FileData는 Uint8Array | string 타입)
      let outputBytes: Uint8Array;
      if (typeof outputData === "string") {
        // 문자열인 경우 (거의 발생하지 않음, 바이너리 파일이므로)
        const encoder = new TextEncoder();
        outputBytes = encoder.encode(outputData);
      } else {
        outputBytes = outputData;
      }

      // Blob 및 File 생성 (ArrayBuffer로 변환하여 BlobPart 호환성 확보)
      const blob = new Blob([new Uint8Array(outputBytes)], {
        type: options.format,
      });
      const newFile = new File([blob], `resized.${outputExt}`, {
        type: options.format,
      });

      // 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(blob);
      setResizedImage(previewUrl);
      setResizedFile(newFile);

      // 파일 시스템 정리
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      setProgress(100);
    } catch (e) {
      console.error("FFmpeg resize error:", e);
      setError(e instanceof Error ? e.message : "이미지 리사이즈 실패");
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, ffmpeg, ffmpegReady, options, calculateDimensions]);

  // Canvas 기반 폴백 리사이즈 (FFmpeg 로드 실패 시)
  const resizeWithCanvas = useCallback(async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const { width, height } = calculateDimensions(
        originalImage.width,
        originalImage.height,
        options.width,
        options.height,
        options.mode,
        options.maintainAspectRatio,
      );

      setProgress(20);

      // Canvas로 리사이즈
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 컨텍스트 생성 실패");

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalImage.preview;
      });

      setProgress(50);

      // 고품질 리사이즈 설정
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      setProgress(70);

      // Blob 생성
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Blob 생성 실패"));
          },
          options.format,
          options.quality,
        );
      });

      const extension = FORMAT_TO_EXT[options.format];
      const newFile = new File([blob], `resized.${extension}`, {
        type: options.format,
      });

      const previewUrl = URL.createObjectURL(blob);
      setResizedImage(previewUrl);
      setResizedFile(newFile);

      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "이미지 리사이즈 실패");
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, options, calculateDimensions]);

  // 메인 리사이즈 함수 - FFmpeg 사용 가능하면 FFmpeg, 아니면 Canvas
  const resizeImage = useCallback(async () => {
    if (!originalImage) return;

    if (ffmpegReady && ffmpeg && isWasmSupported) {
      await resizeWithFFmpeg();
    } else {
      // FFmpeg 로드 안 됐거나 지원 안 되면 Canvas 폴백
      await resizeWithCanvas();
    }
  }, [
    originalImage,
    ffmpegReady,
    ffmpeg,
    isWasmSupported,
    resizeWithFFmpeg,
    resizeWithCanvas,
  ]);

  const downloadImage = useCallback(() => {
    if (!resizedFile || !resizedImage) return;

    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = resizedFile.name;
    link.click();
  }, [resizedFile, resizedImage]);

  const handleClear = useCallback(() => {
    if (originalImage?.preview) {
      URL.revokeObjectURL(originalImage.preview);
    }
    if (resizedImage) {
      URL.revokeObjectURL(resizedImage);
    }
    setOriginalImage(null);
    setResizedImage(null);
    setResizedFile(null);
    setError(null);
    setProgress(0);
  }, [originalImage?.preview, resizedImage]);

  const updateOptions = useCallback((updates: Partial<ResizeOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
    originalImage,
    resizedImage,
    resizedFile,
    isProcessing,
    error,
    options,
    progress,
    ffmpegState: {
      loaded: ffmpegReady,
      loading: ffmpegLoading,
      error: ffmpegError,
      isSupported: isWasmSupported,
    },
    handleFileSelect,
    resizeImage,
    downloadImage,
    handleClear,
    updateOptions,
  };
}
