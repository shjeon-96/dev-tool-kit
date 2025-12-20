"use client";

import { useState, useCallback, useRef } from "react";
import { useFFmpeg } from "@/shared/lib/ffmpeg/use-ffmpeg";
import { useQuota } from "@/shared/lib/quota";
import {
  compressVideo,
  getDefaultOptions,
  getOptionsFromPreset,
  estimateCompressedSize,
  type CompressionOptions,
  type QualityPreset,
  type VideoFormat,
  type VideoCodec,
  type AudioCodec,
} from "../lib/video-processor";

export type {
  CompressionOptions,
  QualityPreset,
  VideoFormat,
  VideoCodec,
  AudioCodec,
};

interface VideoFile {
  file: File;
  preview: string;
  duration: number;
  width: number;
  height: number;
}

interface CompressedResult {
  data: Uint8Array;
  filename: string;
  size: number;
  blob: Blob;
  preview: string;
}

export function useVideoCompressor() {
  const { trackUsage } = useQuota("video-compressor");

  const {
    ffmpeg,
    loadState,
    load: loadFFmpeg,
    isReady: ffmpegReady,
    isLoading: ffmpegLoading,
    error: ffmpegError,
    progress: ffmpegProgress,
  } = useFFmpeg({ autoLoad: false, enableLogging: false });

  const [originalVideo, setOriginalVideo] = useState<VideoFile | null>(null);
  const [compressedResult, setCompressedResult] =
    useState<CompressedResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] =
    useState<CompressionOptions>(getDefaultOptions());

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 비디오 파일 선택 처리
  const handleFileSelect = useCallback(async (file: File) => {
    // 이전 결과 초기화
    setCompressedResult(null);
    setError(null);
    setProgress(0);

    // 비디오 메타데이터 추출
    const preview = URL.createObjectURL(file);

    try {
      const metadata = await extractVideoMetadata(file, preview);
      setOriginalVideo({
        file,
        preview,
        ...metadata,
      });
    } catch (err) {
      setError("비디오 파일을 읽는 중 오류가 발생했습니다.");
      console.error("Video metadata extraction error:", err);
    }
  }, []);

  // 비디오 메타데이터 추출
  const extractVideoMetadata = (
    file: File,
    preview: string,
  ): Promise<{ duration: number; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
        });
        URL.revokeObjectURL(preview);
      };

      video.onerror = () => {
        reject(new Error("Failed to load video metadata"));
        URL.revokeObjectURL(preview);
      };

      video.src = preview;
    });
  };

  // 압축 실행
  const compress = useCallback(async () => {
    if (!originalVideo || !ffmpeg) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setCompressedResult(null);

    try {
      // FFmpeg 프로그레스 콜백
      const onProgress = (prog: number, currentStage: string) => {
        setProgress(prog);
        setStage(currentStage);
      };

      const result = await compressVideo(
        ffmpeg,
        originalVideo.file,
        options,
        onProgress,
      );

      // Blob 생성 - SharedArrayBuffer 호환을 위해 일반 ArrayBuffer로 복사
      const mimeType = options.format === "webm" ? "video/webm" : "video/mp4";
      const normalBuffer = new Uint8Array(result.data).buffer as ArrayBuffer;
      const blob = new Blob([normalBuffer], { type: mimeType });
      const preview = URL.createObjectURL(blob);

      setCompressedResult({
        data: result.data,
        filename: result.filename,
        size: result.data.length,
        blob,
        preview,
      });
      trackUsage();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "압축 중 오류가 발생했습니다.";
      setError(errorMessage);
      console.error("Compression error:", err);
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setStage("");
    }
  }, [originalVideo, ffmpeg, options, trackUsage]);

  // 다운로드
  const download = useCallback(() => {
    if (!compressedResult) return;

    const url = URL.createObjectURL(compressedResult.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = compressedResult.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [compressedResult]);

  // 초기화
  const handleClear = useCallback(() => {
    if (originalVideo?.preview) {
      URL.revokeObjectURL(originalVideo.preview);
    }
    if (compressedResult?.preview) {
      URL.revokeObjectURL(compressedResult.preview);
    }
    setOriginalVideo(null);
    setCompressedResult(null);
    setError(null);
    setProgress(0);
    setStage("");
    setOptions(getDefaultOptions());
  }, [originalVideo, compressedResult]);

  // 옵션 업데이트
  const updateOptions = useCallback((updates: Partial<CompressionOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  // 프리셋 적용
  const applyPreset = useCallback(
    (preset: Exclude<QualityPreset, "custom">) => {
      setOptions(getOptionsFromPreset(preset));
    },
    [],
  );

  // 예상 압축 크기
  const estimatedSize = originalVideo
    ? estimateCompressedSize(
        originalVideo.file.size,
        originalVideo.duration,
        options,
      )
    : 0;

  // 압축률
  const compressionRatio =
    originalVideo && compressedResult
      ? ((1 - compressedResult.size / originalVideo.file.size) * 100).toFixed(1)
      : null;

  return {
    // 상태
    originalVideo,
    compressedResult,
    isProcessing,
    progress,
    stage,
    error,
    options,
    estimatedSize,
    compressionRatio,

    // FFmpeg 상태
    ffmpegState: {
      loading: ffmpegLoading,
      loaded: ffmpegReady,
      loadState,
      error: ffmpegError,
      progress: ffmpegProgress,
      isSupported: typeof SharedArrayBuffer !== "undefined",
    },

    // 액션
    handleFileSelect,
    compress,
    download,
    handleClear,
    updateOptions,
    applyPreset,
    loadFFmpeg,

    // refs
    videoRef,
  };
}
