"use client";

import type { WriteFileData, StreamWriteOptions } from "./types";

/**
 * Stream Write Utilities
 *
 * File System Access API를 사용한 스트리밍 파일 쓰기
 * Chrome/Edge 86+ 전용
 */

/**
 * 데이터를 Blob으로 변환
 */
function toBlob(data: Blob | Uint8Array | string, type?: string): Blob {
  if (data instanceof Blob) {
    return data;
  }

  if (data instanceof Uint8Array) {
    const buffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
    return new Blob([buffer], { type: type || "application/octet-stream" });
  }

  return new Blob([data], { type: type || "text/plain;charset=utf-8" });
}

/**
 * 경로에서 디렉토리 핸들 가져오기 (필요시 생성)
 *
 * @param rootHandle 루트 디렉토리 핸들
 * @param path 상대 경로 (예: "images/icons")
 * @param create 디렉토리 생성 여부
 * @returns 디렉토리 핸들
 */
async function getDirectoryHandle(
  rootHandle: FileSystemDirectoryHandle,
  path: string,
  create: boolean = true,
): Promise<FileSystemDirectoryHandle> {
  if (!path || path === ".") {
    return rootHandle;
  }

  const parts = path.split("/").filter((p) => p && p !== ".");
  let currentHandle = rootHandle;

  for (const part of parts) {
    try {
      currentHandle = await currentHandle.getDirectoryHandle(part, { create });
    } catch (error) {
      if (!create) {
        throw new Error(`Directory not found: ${path}`);
      }
      throw error;
    }
  }

  return currentHandle;
}

/**
 * 단일 파일 쓰기
 *
 * @param dirHandle 루트 디렉토리 핸들
 * @param file 쓰기할 파일 데이터
 * @param options 쓰기 옵션
 * @returns 성공 여부
 *
 * @example
 * ```ts
 * await writeFile(dirHandle, {
 *   name: "output.json",
 *   path: "results",
 *   data: JSON.stringify(data),
 *   type: "application/json"
 * });
 * ```
 */
export async function writeFile(
  dirHandle: FileSystemDirectoryHandle,
  file: WriteFileData,
  options?: StreamWriteOptions,
): Promise<boolean> {
  try {
    // 경로가 있으면 하위 디렉토리 생성/가져오기
    let targetDir = dirHandle;
    if (file.path && options?.createDirectories !== false) {
      targetDir = await getDirectoryHandle(dirHandle, file.path, true);
    }

    // 파일 핸들 가져오기
    const fileHandle = await targetDir.getFileHandle(file.name, {
      create: true,
    });

    // 쓰기 가능한 스트림 생성
    const writable = await fileHandle.createWritable({
      keepExistingData: !options?.overwrite,
    });

    // 데이터 쓰기
    const blob = toBlob(file.data, file.type);
    await writable.write(blob);
    await writable.close();

    return true;
  } catch (error) {
    console.error(`Failed to write file: ${file.name}`, error);
    return false;
  }
}

/**
 * 여러 파일 쓰기
 *
 * @param dirHandle 루트 디렉토리 핸들
 * @param files 쓰기할 파일 목록
 * @param options 쓰기 옵션
 * @returns 성공 여부 (모든 파일 성공 시 true)
 *
 * @example
 * ```ts
 * const success = await writeAllFiles(dirHandle, [
 *   { name: "data.json", data: jsonStr },
 *   { name: "logo.png", path: "images", data: imageBlob },
 * ], {
 *   onProgress: (p) => setProgress(p.percentage)
 * });
 * ```
 */
export async function writeAllFiles(
  dirHandle: FileSystemDirectoryHandle,
  files: WriteFileData[],
  options?: StreamWriteOptions,
): Promise<boolean> {
  if (files.length === 0) return true;

  const totalFiles = files.length;
  const totalBytes = files.reduce((sum, f) => {
    if (f.data instanceof Blob) return sum + f.data.size;
    if (f.data instanceof Uint8Array) return sum + f.data.byteLength;
    return sum + new TextEncoder().encode(f.data).byteLength;
  }, 0);

  let processedFiles = 0;
  let processedBytes = 0;
  let allSuccess = true;

  for (const file of files) {
    const fileSize =
      file.data instanceof Blob
        ? file.data.size
        : file.data instanceof Uint8Array
          ? file.data.byteLength
          : new TextEncoder().encode(file.data).byteLength;

    options?.onProgress?.({
      currentFile: file.name,
      currentIndex: processedFiles,
      totalFiles,
      bytesProcessed: processedBytes,
      bytesTotal: totalBytes,
      percentage: Math.round((processedBytes / totalBytes) * 100),
    });

    const success = await writeFile(dirHandle, file, options);
    if (!success) {
      allSuccess = false;
    }

    processedFiles++;
    processedBytes += fileSize;

    options?.onProgress?.({
      currentFile: file.name,
      currentIndex: processedFiles,
      totalFiles,
      bytesProcessed: processedBytes,
      bytesTotal: totalBytes,
      percentage: Math.round((processedBytes / totalBytes) * 100),
    });
  }

  return allSuccess;
}

/**
 * 스트리밍 파일 쓰기 (대용량 파일용)
 *
 * @param dirHandle 루트 디렉토리 핸들
 * @param fileName 파일명
 * @param stream 읽기 스트림
 * @param options 쓰기 옵션 + 파일 크기
 * @returns 성공 여부
 *
 * @example
 * ```ts
 * const stream = new ReadableStream({...});
 * await writeFileStream(dirHandle, "large-file.bin", stream, {
 *   totalSize: 1024 * 1024 * 1024, // 1GB
 *   onProgress: (p) => console.log(`${p.percentage}%`)
 * });
 * ```
 */
export async function writeFileStream(
  dirHandle: FileSystemDirectoryHandle,
  fileName: string,
  stream: ReadableStream<Uint8Array>,
  options?: StreamWriteOptions & { path?: string; totalSize?: number },
): Promise<boolean> {
  try {
    // 경로가 있으면 하위 디렉토리 생성
    let targetDir = dirHandle;
    if (options?.path && options?.createDirectories !== false) {
      targetDir = await getDirectoryHandle(dirHandle, options.path, true);
    }

    // 파일 핸들 생성
    const fileHandle = await targetDir.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable({
      keepExistingData: !options?.overwrite,
    });

    const reader = stream.getReader();
    let bytesWritten = 0;
    const totalSize = options?.totalSize ?? 0;

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        // Uint8Array의 ArrayBuffer를 사용하여 Blob 생성
        const buffer = value.buffer.slice(
          value.byteOffset,
          value.byteOffset + value.byteLength,
        ) as ArrayBuffer;
        const blob = new Blob([buffer]);
        await writable.write(blob);
        bytesWritten += value.byteLength;

        if (totalSize > 0) {
          options?.onProgress?.({
            currentFile: fileName,
            currentIndex: 0,
            totalFiles: 1,
            bytesProcessed: bytesWritten,
            bytesTotal: totalSize,
            percentage: Math.round((bytesWritten / totalSize) * 100),
          });
        }
      }
    } finally {
      reader.releaseLock();
      await writable.close();
    }

    return true;
  } catch (error) {
    console.error(`Failed to write file stream: ${fileName}`, error);
    return false;
  }
}

/**
 * 디렉토리 내 파일 삭제
 *
 * @param dirHandle 디렉토리 핸들
 * @param fileName 삭제할 파일명
 */
export async function deleteFile(
  dirHandle: FileSystemDirectoryHandle,
  fileName: string,
): Promise<boolean> {
  try {
    await dirHandle.removeEntry(fileName);
    return true;
  } catch {
    return false;
  }
}

/**
 * 디렉토리 삭제 (재귀)
 *
 * @param parentHandle 부모 디렉토리 핸들
 * @param dirName 삭제할 디렉토리명
 */
export async function deleteDirectory(
  parentHandle: FileSystemDirectoryHandle,
  dirName: string,
): Promise<boolean> {
  try {
    await parentHandle.removeEntry(dirName, { recursive: true });
    return true;
  } catch {
    return false;
  }
}
