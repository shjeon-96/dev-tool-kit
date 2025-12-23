/**
 * Image Converter Types
 */

export type ImageFormat = "jpeg" | "png" | "webp" | "avif" | "gif";

export interface ConversionOptions {
  format: ImageFormat;
  quality: number; // 0-100
  maintainMetadata: boolean;
}

export interface ConvertedImage {
  id: string;
  originalName: string;
  originalSize: number;
  originalFormat: string;
  convertedBlob: Blob;
  convertedSize: number;
  convertedFormat: ImageFormat;
  dataUrl?: string;
}

export interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: number;
  format: string;
  width: number;
  height: number;
  previewUrl: string;
}

export const FORMAT_INFO: Record<
  ImageFormat,
  {
    name: string;
    extension: string;
    mimeType: string;
    supportsTransparency: boolean;
    supportsAnimation: boolean;
    supportsQuality: boolean;
  }
> = {
  jpeg: {
    name: "JPEG",
    extension: "jpg",
    mimeType: "image/jpeg",
    supportsTransparency: false,
    supportsAnimation: false,
    supportsQuality: true,
  },
  png: {
    name: "PNG",
    extension: "png",
    mimeType: "image/png",
    supportsTransparency: true,
    supportsAnimation: false,
    supportsQuality: false,
  },
  webp: {
    name: "WebP",
    extension: "webp",
    mimeType: "image/webp",
    supportsTransparency: true,
    supportsAnimation: true,
    supportsQuality: true,
  },
  avif: {
    name: "AVIF",
    extension: "avif",
    mimeType: "image/avif",
    supportsTransparency: true,
    supportsAnimation: true,
    supportsQuality: true,
  },
  gif: {
    name: "GIF",
    extension: "gif",
    mimeType: "image/gif",
    supportsTransparency: true,
    supportsAnimation: true,
    supportsQuality: false,
  },
};

export const DEFAULT_OPTIONS: ConversionOptions = {
  format: "webp",
  quality: 85,
  maintainMetadata: false,
};

/**
 * 파일 확장자에서 포맷 추출
 */
export function getFormatFromExtension(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const formatMap: Record<string, string> = {
    jpg: "jpeg",
    jpeg: "jpeg",
    png: "png",
    webp: "webp",
    avif: "avif",
    gif: "gif",
    bmp: "bmp",
    tiff: "tiff",
    tif: "tiff",
    svg: "svg",
  };
  return formatMap[ext] || ext;
}

/**
 * MIME 타입에서 포맷 추출
 */
export function getFormatFromMimeType(mimeType: string): string {
  const formatMap: Record<string, string> = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
    "image/svg+xml": "svg",
  };
  return formatMap[mimeType] || "unknown";
}

/**
 * 포맷이 지원되는지 확인
 */
export function isFormatSupported(format: string): format is ImageFormat {
  return format in FORMAT_INFO;
}

/**
 * 파일 크기 포맷
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * 압축률 계산
 */
export function calculateCompressionRatio(
  originalSize: number,
  convertedSize: number,
): number {
  if (originalSize === 0) return 0;
  return Math.round((1 - convertedSize / originalSize) * 100);
}
