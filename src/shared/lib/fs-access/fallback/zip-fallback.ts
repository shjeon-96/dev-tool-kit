"use client";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import type {
  WriteFileData,
  ZipFallbackOptions,
  StreamProgress,
} from "../types";

/**
 * ZIP Fallback for Safari/Firefox
 *
 * File System Access API를 지원하지 않는 브라우저에서
 * 여러 파일을 ZIP으로 묶어 다운로드
 */

/**
 * 기본 옵션
 */
const DEFAULT_OPTIONS: Required<Omit<ZipFallbackOptions, "onProgress">> = {
  filename: "download.zip",
  compressionLevel: 6,
};

/**
 * WriteFileData를 Blob으로 변환
 */
function toBlob(data: Blob | Uint8Array | string, type?: string): Blob {
  if (data instanceof Blob) {
    return data;
  }

  if (data instanceof Uint8Array) {
    // ArrayBuffer로 변환하여 타입 호환성 보장
    const buffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
    return new Blob([buffer], {
      type: type || "application/octet-stream",
    });
  }

  // string
  return new Blob([data], { type: type || "text/plain;charset=utf-8" });
}

/**
 * 파일 데이터를 Uint8Array로 변환
 */
async function toUint8Array(
  data: Blob | Uint8Array | string,
): Promise<Uint8Array> {
  if (data instanceof Uint8Array) {
    return data;
  }

  if (data instanceof Blob) {
    const buffer = await data.arrayBuffer();
    return new Uint8Array(buffer);
  }

  // string
  const encoder = new TextEncoder();
  return encoder.encode(data);
}

/**
 * 여러 파일을 ZIP으로 다운로드
 *
 * @param files 다운로드할 파일 목록
 * @param options ZIP 생성 옵션
 *
 * @example
 * ```ts
 * await downloadAsZip([
 *   { name: "data.json", data: JSON.stringify(obj) },
 *   { name: "images/logo.png", data: imageBlob },
 * ], {
 *   filename: "export.zip",
 *   onProgress: (p) => console.log(`${p.percentage}%`)
 * });
 * ```
 */
export async function downloadAsZip(
  files: WriteFileData[],
  options?: ZipFallbackOptions,
): Promise<void> {
  if (files.length === 0) {
    throw new Error("No files to download");
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const zip = new JSZip();

  // 진행률 계산용
  const totalFiles = files.length;
  let processedFiles = 0;
  let processedBytes = 0;
  const totalBytes = await calculateTotalBytes(files);

  // 진행률 업데이트 헬퍼
  const updateProgress = (currentFile: string, bytesAdded: number) => {
    processedBytes += bytesAdded;
    opts.onProgress?.({
      currentFile,
      currentIndex: processedFiles,
      totalFiles,
      bytesProcessed: processedBytes,
      bytesTotal: totalBytes,
      percentage: Math.round((processedBytes / totalBytes) * 100),
    });
  };

  // 파일 추가
  for (const file of files) {
    const data = await toUint8Array(file.data);
    const filePath = file.path ? `${file.path}/${file.name}` : file.name;

    // 하위 디렉토리 처리
    const pathParts = filePath.split("/");
    if (pathParts.length > 1) {
      // 디렉토리 경로 생성
      const folderPath = pathParts.slice(0, -1).join("/");
      const fileName = pathParts[pathParts.length - 1];
      const folder = zip.folder(folderPath);
      folder?.file(fileName, data, {
        compression: opts.compressionLevel > 0 ? "DEFLATE" : "STORE",
        compressionOptions: { level: opts.compressionLevel },
      });
    } else {
      zip.file(filePath, data, {
        compression: opts.compressionLevel > 0 ? "DEFLATE" : "STORE",
        compressionOptions: { level: opts.compressionLevel },
      });
    }

    processedFiles++;
    updateProgress(file.name, data.byteLength);
  }

  // ZIP 생성 및 다운로드
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: opts.compressionLevel > 0 ? "DEFLATE" : "STORE",
    compressionOptions: { level: opts.compressionLevel },
  });

  saveAs(zipBlob, opts.filename);
}

/**
 * 단일 파일 다운로드 (ZIP 없이)
 *
 * @param file 다운로드할 파일
 *
 * @example
 * ```ts
 * await downloadFile({
 *   name: "data.json",
 *   data: JSON.stringify(obj),
 *   type: "application/json"
 * });
 * ```
 */
export async function downloadFile(file: WriteFileData): Promise<void> {
  const blob = toBlob(file.data, file.type);
  saveAs(blob, file.name);
}

/**
 * 전체 바이트 수 계산
 */
async function calculateTotalBytes(files: WriteFileData[]): Promise<number> {
  let total = 0;

  for (const file of files) {
    if (file.data instanceof Blob) {
      total += file.data.size;
    } else if (file.data instanceof Uint8Array) {
      total += file.data.byteLength;
    } else {
      // string - UTF-8 인코딩 기준
      total += new TextEncoder().encode(file.data).byteLength;
    }
  }

  return total;
}

/**
 * 파일 목록을 ZIP Blob으로 변환 (다운로드 없이)
 *
 * @param files 파일 목록
 * @param options ZIP 옵션
 * @returns ZIP Blob
 */
export async function createZipBlob(
  files: WriteFileData[],
  options?: Omit<ZipFallbackOptions, "filename">,
): Promise<Blob> {
  const opts = {
    compressionLevel: DEFAULT_OPTIONS.compressionLevel,
    ...options,
  };
  const zip = new JSZip();

  for (const file of files) {
    const data = await toUint8Array(file.data);
    const filePath = file.path ? `${file.path}/${file.name}` : file.name;

    const pathParts = filePath.split("/");
    if (pathParts.length > 1) {
      const folderPath = pathParts.slice(0, -1).join("/");
      const fileName = pathParts[pathParts.length - 1];
      const folder = zip.folder(folderPath);
      folder?.file(fileName, data);
    } else {
      zip.file(filePath, data);
    }
  }

  return zip.generateAsync({
    type: "blob",
    compression: opts.compressionLevel > 0 ? "DEFLATE" : "STORE",
    compressionOptions: { level: opts.compressionLevel },
  });
}

/**
 * ZIP 파일 읽기 (업로드된 ZIP 처리용)
 *
 * @param zipFile ZIP 파일 또는 Blob
 * @param options 읽기 옵션
 * @returns 파일 엔트리 목록
 */
export async function readZipFile(
  zipFile: File | Blob,
  options?: {
    onProgress?: (progress: StreamProgress) => void;
  },
): Promise<WriteFileData[]> {
  const zip = await JSZip.loadAsync(zipFile);
  const files: WriteFileData[] = [];

  const entries = Object.entries(zip.files);
  const totalFiles = entries.filter(([, file]) => !file.dir).length;
  let processedFiles = 0;

  for (const [path, zipEntry] of entries) {
    // 디렉토리 스킵
    if (zipEntry.dir) continue;

    const data = await zipEntry.async("uint8array");
    const pathParts = path.split("/");
    const name = pathParts[pathParts.length - 1];
    const filePath =
      pathParts.length > 1 ? pathParts.slice(0, -1).join("/") : undefined;

    files.push({
      name,
      path: filePath,
      data,
    });

    processedFiles++;
    options?.onProgress?.({
      currentFile: name,
      currentIndex: processedFiles - 1,
      totalFiles,
      bytesProcessed: data.byteLength,
      bytesTotal: zipFile.size,
      percentage: Math.round((processedFiles / totalFiles) * 100),
    });
  }

  return files;
}
