"use client";

import { useState, useCallback, useRef } from "react";
import type {
  FSAccessState,
  FileEntry,
  DirectoryInfo,
  StreamProgress,
  WriteFileData,
  PickDirectoryOptions,
  StreamReadOptions,
  StreamWriteOptions,
  ZipFallbackOptions,
  UseFSAccessReturn,
} from "./types";
import { useFSAccessSupport } from "./detect";
import {
  scanDirectory,
  readFileStream as streamRead,
  readAllFiles as readAll,
} from "./stream-read";
import {
  writeFile as fsWriteFile,
  writeAllFiles as fsWriteAllFiles,
} from "./stream-write";
import { downloadAsZip as zipDownload } from "./fallback";

/**
 * File System Access API 통합 Hook
 *
 * Chrome/Edge: File System Access API로 폴더 직접 읽기/쓰기
 * Safari/Firefox: ZIP 다운로드 폴백
 *
 * @example
 * ```tsx
 * function FileExporter({ files }) {
 *   const {
 *     isSupported,
 *     isReady,
 *     pickDirectory,
 *     writeAllFiles,
 *     downloadAsZip,
 *     progress
 *   } = useFSAccess();
 *
 *   const handleExport = async () => {
 *     if (isSupported) {
 *       const ok = await pickDirectory({ mode: "readwrite" });
 *       if (ok) {
 *         await writeAllFiles(files);
 *       }
 *     } else {
 *       await downloadAsZip(files, { filename: "export.zip" });
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleExport} disabled={progress !== null}>
 *       {progress ? `${progress.percentage}%` : "Export"}
 *     </button>
 *   );
 * }
 * ```
 */
export function useFSAccess(): UseFSAccessReturn {
  // 브라우저 지원 감지
  const { supportLevel, isSupported } = useFSAccessSupport();

  // 상태
  const [state, setState] = useState<FSAccessState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [directory, setDirectory] = useState<DirectoryInfo | null>(null);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [progress, setProgress] = useState<StreamProgress | null>(null);

  // 디렉토리 핸들 ref
  const dirHandleRef = useRef<FileSystemDirectoryHandle | null>(null);

  /**
   * 디렉토리 선택
   */
  const pickDirectory = useCallback(
    async (options?: PickDirectoryOptions): Promise<boolean> => {
      if (!isSupported) {
        setError("File System Access API is not supported in this browser");
        return false;
      }

      try {
        setState("loading");
        setError(null);

        // showDirectoryPicker 호출
        const handle = await window.showDirectoryPicker?.({
          mode: options?.mode ?? "read",
          startIn: options?.startIn,
        });

        if (!handle) {
          setState("idle");
          return false;
        }

        // 디렉토리 스캔
        const { files: scannedFiles, directoryInfo } = await scanDirectory(
          handle,
          {
            recursive: true,
          },
        );

        dirHandleRef.current = handle;
        setDirectory(directoryInfo);
        setFiles(scannedFiles);
        setState("ready");

        return true;
      } catch (err) {
        // 사용자 취소
        if (err instanceof DOMException && err.name === "AbortError") {
          setState("idle");
          return false;
        }

        const message =
          err instanceof Error ? err.message : "Failed to pick directory";
        setError(message);
        setState("error");
        return false;
      }
    },
    [isSupported],
  );

  /**
   * 디렉토리 닫기
   */
  const closeDirectory = useCallback(() => {
    dirHandleRef.current = null;
    setDirectory(null);
    setFiles([]);
    setState("idle");
    setError(null);
    setProgress(null);
  }, []);

  /**
   * 단일 파일 스트리밍 읽기
   */
  const readFileStream = useCallback(
    (entry: FileEntry, options?: StreamReadOptions) => {
      return streamRead(entry, {
        ...options,
        onProgress: (p) => {
          setProgress(p);
          options?.onProgress?.(p);
        },
      });
    },
    [],
  );

  /**
   * 전체 파일 읽기 (래핑된 제너레이터 반환)
   */
  const readAllFiles = useCallback(
    (options?: StreamReadOptions) => {
      const targetFiles = files.length > 0 ? files : [];

      // 원본 제너레이터를 래핑하여 진행률 업데이트 추가
      const wrappedGenerator = async function* () {
        for await (const result of readAll(targetFiles, {
          ...options,
          onProgress: (p) => {
            setProgress(p);
            options?.onProgress?.(p);
          },
        })) {
          yield result;
        }
        setProgress(null);
      };

      return wrappedGenerator();
    },
    [files],
  );

  /**
   * 단일 파일 쓰기
   */
  const writeFile = useCallback(
    async (
      file: WriteFileData,
      options?: StreamWriteOptions,
    ): Promise<boolean> => {
      if (!dirHandleRef.current) {
        setError("No directory selected. Call pickDirectory first.");
        return false;
      }

      try {
        setState("loading");
        const success = await fsWriteFile(dirHandleRef.current, file, {
          ...options,
          createDirectories: true,
          onProgress: (p) => {
            setProgress(p);
            options?.onProgress?.(p);
          },
        });

        setProgress(null);
        setState("ready");
        return success;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to write file";
        setError(message);
        setState("error");
        return false;
      }
    },
    [],
  );

  /**
   * 여러 파일 쓰기
   */
  const writeAllFiles = useCallback(
    async (
      filesToWrite: WriteFileData[],
      options?: StreamWriteOptions,
    ): Promise<boolean> => {
      if (!dirHandleRef.current) {
        setError("No directory selected. Call pickDirectory first.");
        return false;
      }

      try {
        setState("loading");
        const success = await fsWriteAllFiles(
          dirHandleRef.current,
          filesToWrite,
          {
            ...options,
            createDirectories: true,
            onProgress: (p) => {
              setProgress(p);
              options?.onProgress?.(p);
            },
          },
        );

        setProgress(null);
        setState("ready");
        return success;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to write files";
        setError(message);
        setState("error");
        return false;
      }
    },
    [],
  );

  /**
   * ZIP으로 다운로드 (폴백)
   */
  const downloadAsZip = useCallback(
    async (
      filesToZip: WriteFileData[],
      options?: ZipFallbackOptions,
    ): Promise<void> => {
      try {
        setState("loading");
        await zipDownload(filesToZip, {
          ...options,
          onProgress: (p) => {
            setProgress(p);
            options?.onProgress?.(p);
          },
        });
        setProgress(null);
        setState("idle");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create ZIP";
        setError(message);
        setState("error");
        throw err;
      }
    },
    [],
  );

  /**
   * 상태 초기화
   */
  const reset = useCallback(() => {
    closeDirectory();
  }, [closeDirectory]);

  return {
    // 상태
    supportLevel,
    isSupported,
    isReady: state === "ready",
    isLoading: state === "loading",
    state,
    error,

    // 디렉토리 정보
    directory,
    files,
    progress,

    // 액션 - 디렉토리
    pickDirectory,
    closeDirectory,

    // 액션 - 읽기
    readFileStream: readFileStream as UseFSAccessReturn["readFileStream"],
    readAllFiles: readAllFiles as UseFSAccessReturn["readAllFiles"],

    // 액션 - 쓰기
    writeFile,
    writeAllFiles,

    // 액션 - 폴백
    downloadAsZip,

    // 유틸리티
    reset,
  };
}
