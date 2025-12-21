"use client";

import type {
  FileEntry,
  DirectoryInfo,
  StreamReadOptions,
  FileFilter,
} from "./types";

/**
 * Stream Read Utilities
 *
 * File System Access API를 사용한 스트리밍 파일 읽기
 * Chrome/Edge 86+ 전용
 */

/** 기본 청크 크기: 64KB */
const DEFAULT_CHUNK_SIZE = 64 * 1024;

/**
 * 디렉토리 핸들에서 파일 목록 스캔
 *
 * @param dirHandle 디렉토리 핸들
 * @param options 스캔 옵션
 * @returns 파일 엔트리 목록과 디렉토리 정보
 */
export async function scanDirectory(
  dirHandle: FileSystemDirectoryHandle,
  options?: {
    filter?: FileFilter;
    recursive?: boolean;
    basePath?: string;
  },
): Promise<{ files: FileEntry[]; directoryInfo: DirectoryInfo }> {
  const files: FileEntry[] = [];
  const basePath = options?.basePath ?? "";
  const recursive = options?.recursive ?? true;

  // 재귀 스캔
  async function scan(handle: FileSystemDirectoryHandle, currentPath: string) {
    // entries()를 사용하여 [name, handle] 튜플 반복
    // TypeScript의 lib.dom.d.ts에 entries()가 정의되어 있지 않아 타입 단언 사용
    const entries = (
      handle as unknown as {
        entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
      }
    ).entries();
    for await (const [, entry] of entries) {
      if (entry.kind === "file") {
        const fileHandle = entry as FileSystemFileHandle;
        const file = await fileHandle.getFile();
        const filePath = currentPath
          ? `${currentPath}/${file.name}`
          : file.name;

        // 필터 적용
        if (matchesFilter(file, filePath, options?.filter)) {
          files.push({
            handle: fileHandle,
            file,
            name: file.name,
            path: filePath,
            size: file.size,
            type: file.type || "application/octet-stream",
            lastModified: file.lastModified,
          });
        }
      } else if (entry.kind === "directory" && recursive) {
        const subDirHandle = entry as FileSystemDirectoryHandle;
        const subPath = currentPath
          ? `${currentPath}/${entry.name}`
          : entry.name;
        await scan(subDirHandle, subPath);
      }
    }
  }

  await scan(dirHandle, basePath);

  // 디렉토리 정보 계산
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const directoryInfo: DirectoryInfo = {
    handle: dirHandle,
    name: dirHandle.name,
    fileCount: files.length,
    totalSize,
  };

  return { files, directoryInfo };
}

/**
 * 파일 필터 매칭
 */
function matchesFilter(file: File, path: string, filter?: FileFilter): boolean {
  if (!filter) return true;

  // 확장자 필터
  if (filter.extensions && filter.extensions.length > 0) {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!filter.extensions.some((e) => e.toLowerCase() === ext)) {
      return false;
    }
  }

  // MIME 타입 필터
  if (filter.mimeTypes && filter.mimeTypes.length > 0) {
    if (!filter.mimeTypes.some((m) => file.type.startsWith(m))) {
      return false;
    }
  }

  // 크기 필터
  if (filter.maxSize !== undefined && file.size > filter.maxSize) {
    return false;
  }
  if (filter.minSize !== undefined && file.size < filter.minSize) {
    return false;
  }

  return true;
}

/**
 * 단일 파일 스트리밍 읽기
 *
 * @param entry 파일 엔트리
 * @param options 읽기 옵션
 * @yields Uint8Array 청크
 *
 * @example
 * ```ts
 * for await (const chunk of readFileStream(entry, { chunkSize: 1024 * 1024 })) {
 *   processChunk(chunk);
 * }
 * ```
 */
export async function* readFileStream(
  entry: FileEntry,
  options?: StreamReadOptions,
): AsyncGenerator<Uint8Array, void, unknown> {
  const chunkSize = options?.chunkSize ?? DEFAULT_CHUNK_SIZE;

  // 파일 가져오기
  let file: File;
  if (entry.handle) {
    file = await entry.handle.getFile();
  } else if (entry.file) {
    file = entry.file;
  } else {
    throw new Error(`Cannot read file: ${entry.name}`);
  }

  // 스트림으로 읽기
  const stream = file.stream();
  const reader = stream.getReader();

  let buffer = new Uint8Array(0);
  let bytesRead = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // 남은 데이터 반환
        if (buffer.length > 0) {
          yield buffer;
        }
        break;
      }

      // 버퍼에 추가
      const newBuffer = new Uint8Array(buffer.length + value.length);
      newBuffer.set(buffer);
      newBuffer.set(value, buffer.length);
      buffer = newBuffer;

      // 청크 크기만큼 yield
      while (buffer.length >= chunkSize) {
        const chunk = buffer.slice(0, chunkSize);
        buffer = buffer.slice(chunkSize);
        bytesRead += chunk.length;

        options?.onProgress?.({
          currentFile: entry.name,
          currentIndex: 0,
          totalFiles: 1,
          bytesProcessed: bytesRead,
          bytesTotal: file.size,
          percentage: Math.round((bytesRead / file.size) * 100),
        });

        yield chunk;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * 파일 전체 읽기 (Uint8Array로 반환)
 *
 * @param entry 파일 엔트리
 * @returns 파일 데이터
 */
export async function readFileAsUint8Array(
  entry: FileEntry,
): Promise<Uint8Array> {
  let file: File;
  if (entry.handle) {
    file = await entry.handle.getFile();
  } else if (entry.file) {
    file = entry.file;
  } else {
    throw new Error(`Cannot read file: ${entry.name}`);
  }

  const buffer = await file.arrayBuffer();
  return new Uint8Array(buffer);
}

/**
 * 파일 텍스트로 읽기
 *
 * @param entry 파일 엔트리
 * @param encoding 인코딩 (기본: utf-8)
 * @returns 텍스트 내용
 */
export async function readFileAsText(
  entry: FileEntry,
  encoding: string = "utf-8",
): Promise<string> {
  let file: File;
  if (entry.handle) {
    file = await entry.handle.getFile();
  } else if (entry.file) {
    file = entry.file;
  } else {
    throw new Error(`Cannot read file: ${entry.name}`);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, encoding);
  });
}

/**
 * 모든 파일 순차 읽기 제너레이터
 *
 * @param files 파일 엔트리 목록
 * @param options 읽기 옵션
 * @yields 파일 엔트리와 데이터
 *
 * @example
 * ```ts
 * for await (const { entry, data } of readAllFiles(files)) {
 *   const text = new TextDecoder().decode(data);
 *   console.log(`${entry.name}: ${text.length} chars`);
 * }
 * ```
 */
export async function* readAllFiles(
  files: FileEntry[],
  options?: StreamReadOptions,
): AsyncGenerator<{ entry: FileEntry; data: Uint8Array }, void, unknown> {
  const totalFiles = files.length;
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  let processedBytes = 0;

  for (let i = 0; i < files.length; i++) {
    const entry = files[i];
    const data = await readFileAsUint8Array(entry);
    processedBytes += data.length;

    options?.onProgress?.({
      currentFile: entry.name,
      currentIndex: i,
      totalFiles,
      bytesProcessed: processedBytes,
      bytesTotal: totalBytes,
      percentage: Math.round((processedBytes / totalBytes) * 100),
    });

    yield { entry, data };
  }
}
