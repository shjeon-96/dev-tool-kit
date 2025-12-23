/**
 * Image Converter Core Logic
 */

import { type ImageFormat, type ConversionOptions, FORMAT_INFO } from "./types";

/**
 * 이미지 로드
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

/**
 * 이미지를 Canvas에 그리기
 */
function drawImageToCanvas(
  img: HTMLImageElement,
  options: ConversionOptions,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // 투명도를 지원하지 않는 포맷의 경우 흰색 배경 추가
  if (!FORMAT_INFO[options.format].supportsTransparency) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);
  return canvas;
}

/**
 * Canvas를 Blob으로 변환
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  options: ConversionOptions,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const mimeType = FORMAT_INFO[options.format].mimeType;
    const quality = FORMAT_INFO[options.format].supportsQuality
      ? options.quality / 100
      : undefined;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      },
      mimeType,
      quality,
    );
  });
}

/**
 * 이미지 변환
 */
export async function convertImage(
  file: File,
  options: ConversionOptions,
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = drawImageToCanvas(img, options);
  return canvasToBlob(canvas, options);
}

/**
 * 이미지 정보 추출
 */
export async function getImageInfo(
  file: File,
): Promise<{ width: number; height: number }> {
  const img = await loadImage(file);
  return {
    width: img.naturalWidth,
    height: img.naturalHeight,
  };
}

/**
 * Blob을 Data URL로 변환
 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read blob"));
    reader.readAsDataURL(blob);
  });
}

/**
 * 포맷 지원 여부 확인 (브라우저별)
 */
export async function checkFormatSupport(
  format: ImageFormat,
): Promise<boolean> {
  // PNG와 JPEG는 모든 브라우저에서 지원
  if (format === "png" || format === "jpeg" || format === "gif") {
    return true;
  }

  // WebP와 AVIF는 브라우저에 따라 다름
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve(false);
      return;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1, 1);

    canvas.toBlob(
      (blob) => {
        resolve(blob !== null);
      },
      FORMAT_INFO[format].mimeType,
      0.9,
    );
  });
}

/**
 * 모든 포맷 지원 여부 확인
 */
export async function checkAllFormatSupport(): Promise<
  Record<ImageFormat, boolean>
> {
  const formats: ImageFormat[] = ["jpeg", "png", "webp", "avif", "gif"];
  const support: Record<string, boolean> = {};

  for (const format of formats) {
    support[format] = await checkFormatSupport(format);
  }

  return support as Record<ImageFormat, boolean>;
}

/**
 * 파일 다운로드
 */
export function downloadBlob(
  blob: Blob,
  filename: string,
  format: ImageFormat,
): void {
  const ext = FORMAT_INFO[format].extension;
  const baseName = filename.replace(/\.[^/.]+$/, "");
  const fullFilename = `${baseName}.${ext}`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fullFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
