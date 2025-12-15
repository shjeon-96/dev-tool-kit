/**
 * Video processing utilities using FFmpeg.wasm
 * Supports video compression, format conversion, and quality adjustment
 */
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// 지원하는 비디오 포맷
export type VideoFormat = "mp4" | "webm" | "mov" | "avi";
export type VideoCodec = "h264" | "h265" | "vp9" | "av1";
export type AudioCodec = "aac" | "mp3" | "opus" | "none";

// 프리셋 품질 레벨
export type QualityPreset =
  | "ultra" // 최고 품질, 큰 파일
  | "high" // 고품질, 적당한 파일
  | "medium" // 중간 품질, 작은 파일
  | "low" // 저품질, 매우 작은 파일
  | "custom"; // 사용자 정의

export interface VideoInfo {
  duration: number; // 초
  width: number;
  height: number;
  bitrate: number; // kbps
  codec: string;
  fps: number;
  fileSize: number; // bytes
}

export interface CompressionOptions {
  // 출력 설정
  format: VideoFormat;
  videoCodec: VideoCodec;
  audioCodec: AudioCodec;

  // 품질 설정
  preset: QualityPreset;
  crf: number; // 0-51 (낮을수록 고품질)
  targetBitrate?: number; // kbps

  // 해상도 설정
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  maxResolution?: "720p" | "1080p" | "1440p" | "4k" | "original";

  // 추가 옵션
  fps?: number;
  removeAudio: boolean;
  fastStart: boolean; // 웹 스트리밍 최적화
}

// 프리셋별 기본 설정
export const QUALITY_PRESETS: Record<
  Exclude<QualityPreset, "custom">,
  Partial<CompressionOptions>
> = {
  ultra: {
    crf: 18,
    videoCodec: "h264",
    audioCodec: "aac",
  },
  high: {
    crf: 23,
    videoCodec: "h264",
    audioCodec: "aac",
  },
  medium: {
    crf: 28,
    videoCodec: "h264",
    audioCodec: "aac",
    maxResolution: "1080p",
  },
  low: {
    crf: 35,
    videoCodec: "h264",
    audioCodec: "aac",
    maxResolution: "720p",
  },
};

// 해상도 매핑
const RESOLUTION_MAP: Record<string, { width: number; height: number }> = {
  "720p": { width: 1280, height: 720 },
  "1080p": { width: 1920, height: 1080 },
  "1440p": { width: 2560, height: 1440 },
  "4k": { width: 3840, height: 2160 },
};

// 코덱 매핑
const VIDEO_CODEC_MAP: Record<VideoCodec, string> = {
  h264: "libx264",
  h265: "libx265",
  vp9: "libvpx-vp9",
  av1: "libaom-av1",
};

const AUDIO_CODEC_MAP: Record<AudioCodec, string> = {
  aac: "aac",
  mp3: "libmp3lame",
  opus: "libopus",
  none: "",
};

// 포맷별 확장자
const FORMAT_EXTENSION: Record<VideoFormat, string> = {
  mp4: "mp4",
  webm: "webm",
  mov: "mov",
  avi: "avi",
};

export type ProgressCallback = (progress: number, stage: string) => void;

/**
 * 비디오 압축 실행
 */
export async function compressVideo(
  ffmpeg: FFmpeg,
  inputFile: File,
  options: CompressionOptions,
  onProgress?: ProgressCallback,
): Promise<{ data: Uint8Array; filename: string; estimatedSize: number }> {
  const inputName = "input_video";
  const outputExt = FORMAT_EXTENSION[options.format];
  const outputName = `output.${outputExt}`;

  try {
    // 1. 입력 파일 쓰기
    onProgress?.(5, "파일 로딩 중...");
    await ffmpeg.writeFile(inputName, await fetchFile(inputFile));

    // 2. FFmpeg 인자 구성
    const args = buildFFmpegArgs(inputName, outputName, options);

    // 3. 변환 실행
    onProgress?.(10, "비디오 압축 중...");
    await ffmpeg.exec(args);

    // 4. 출력 파일 읽기
    onProgress?.(95, "파일 저장 중...");
    const data = (await ffmpeg.readFile(outputName)) as Uint8Array;

    // 5. 정리
    await ffmpeg.deleteFile(inputName);
    await ffmpeg.deleteFile(outputName);

    onProgress?.(100, "완료!");

    // 파일명 생성
    const originalName = inputFile.name.replace(/\.[^/.]+$/, "");
    const filename = `${originalName}_compressed.${outputExt}`;

    return {
      data,
      filename,
      estimatedSize: data.length,
    };
  } catch (error) {
    // 에러 시에도 파일 정리 시도
    try {
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch {
      // 무시
    }
    throw error;
  }
}

/**
 * FFmpeg 인자 구성
 */
function buildFFmpegArgs(
  inputName: string,
  outputName: string,
  options: CompressionOptions,
): string[] {
  const args: string[] = ["-i", inputName];

  // 비디오 코덱
  args.push("-c:v", VIDEO_CODEC_MAP[options.videoCodec]);

  // CRF (품질)
  if (options.videoCodec === "vp9") {
    args.push("-crf", String(options.crf), "-b:v", "0");
  } else if (options.videoCodec === "av1") {
    args.push("-crf", String(options.crf), "-b:v", "0");
  } else {
    args.push("-crf", String(options.crf));
  }

  // 타겟 비트레이트 (선택적)
  if (options.targetBitrate) {
    args.push("-b:v", `${options.targetBitrate}k`);
  }

  // 해상도 스케일링
  const scaleFilter = buildScaleFilter(options);
  if (scaleFilter) {
    args.push("-vf", scaleFilter);
  }

  // FPS 제한
  if (options.fps) {
    args.push("-r", String(options.fps));
  }

  // 오디오 설정
  if (options.removeAudio) {
    args.push("-an");
  } else if (options.audioCodec !== "none") {
    args.push("-c:a", AUDIO_CODEC_MAP[options.audioCodec]);
    args.push("-b:a", "128k");
  }

  // H.264/H.265 특정 설정
  if (options.videoCodec === "h264" || options.videoCodec === "h265") {
    args.push("-preset", "medium");
    args.push("-profile:v", "main");
  }

  // VP9 특정 설정
  if (options.videoCodec === "vp9") {
    args.push("-deadline", "good");
    args.push("-cpu-used", "4");
  }

  // 웹 스트리밍 최적화 (MP4)
  if (options.fastStart && options.format === "mp4") {
    args.push("-movflags", "+faststart");
  }

  // 출력 파일
  args.push("-y", outputName);

  return args;
}

/**
 * 스케일 필터 구성
 */
function buildScaleFilter(options: CompressionOptions): string | null {
  let targetWidth: number | undefined;
  let targetHeight: number | undefined;

  // 최대 해상도 설정 적용
  if (options.maxResolution && options.maxResolution !== "original") {
    const maxRes = RESOLUTION_MAP[options.maxResolution];
    if (maxRes) {
      targetWidth = maxRes.width;
      targetHeight = maxRes.height;
    }
  }

  // 명시적 해상도 설정이 있으면 우선
  if (options.width) targetWidth = options.width;
  if (options.height) targetHeight = options.height;

  if (!targetWidth && !targetHeight) {
    return null;
  }

  if (options.maintainAspectRatio) {
    if (targetWidth && !options.height) {
      // 너비 기준으로 비율 유지
      return `scale='min(${targetWidth},iw)':-2`;
    } else if (targetHeight && !options.width) {
      // 높이 기준으로 비율 유지
      return `scale=-2:'min(${targetHeight},ih)'`;
    } else if (targetWidth && targetHeight) {
      // 최대 해상도 내에서 비율 유지
      return `scale='min(${targetWidth},iw)':'min(${targetHeight},ih)':force_original_aspect_ratio=decrease`;
    }
  } else {
    return `scale=${targetWidth || -2}:${targetHeight || -2}`;
  }

  return null;
}

/**
 * 예상 압축 결과 계산 (대략적)
 */
export function estimateCompressedSize(
  originalSize: number,
  duration: number,
  options: CompressionOptions,
): number {
  // CRF 기반 대략적인 압축 비율 추정
  const crfRatio = Math.pow(0.93, options.crf - 18); // CRF 18 기준

  // 해상도 기반 조정
  let resolutionFactor = 1;
  if (options.maxResolution) {
    const resMap: Record<string, number> = {
      "720p": 0.4,
      "1080p": 0.7,
      "1440p": 0.85,
      "4k": 1,
      original: 1,
    };
    resolutionFactor = resMap[options.maxResolution] || 1;
  }

  // 오디오 제거 시 추가 절감
  const audioFactor = options.removeAudio ? 0.85 : 1;

  // 예상 크기 계산
  const estimatedSize =
    originalSize * crfRatio * resolutionFactor * audioFactor;

  // 최소 10% 절감 보장 (비현실적 결과 방지)
  return Math.min(estimatedSize, originalSize * 0.9);
}

/**
 * 기본 압축 옵션 생성
 */
export function getDefaultOptions(): CompressionOptions {
  return {
    format: "mp4",
    videoCodec: "h264",
    audioCodec: "aac",
    preset: "medium",
    crf: 28,
    maintainAspectRatio: true,
    maxResolution: "1080p",
    removeAudio: false,
    fastStart: true,
  };
}

/**
 * 프리셋 기반 옵션 생성
 */
export function getOptionsFromPreset(
  preset: Exclude<QualityPreset, "custom">,
): CompressionOptions {
  const base = getDefaultOptions();
  const presetOptions = QUALITY_PRESETS[preset];
  return { ...base, ...presetOptions, preset };
}
