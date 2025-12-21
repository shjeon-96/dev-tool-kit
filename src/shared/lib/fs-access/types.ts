/**
 * File System Access API Types
 *
 * 대용량 파일 스트리밍 처리(10GB+)를 위한 타입 정의
 */

/**
 * 브라우저 지원 레벨
 * - full: Chrome/Edge - File System Access API 완전 지원
 * - partial: 일부 기능만 지원 (미래 확장용)
 * - fallback: Safari/Firefox - ZIP 다운로드 폴백
 * - none: 지원 불가
 */
export type SupportLevel = "full" | "partial" | "fallback" | "none";

/**
 * Hook 상태
 */
export type FSAccessState = "idle" | "loading" | "ready" | "error";

/**
 * 디렉토리 접근 모드
 */
export type DirectoryMode = "read" | "readwrite";

/**
 * 파일 엔트리 정보
 */
export interface FileEntry {
  /** 파일 핸들 (Chrome/Edge) */
  handle?: FileSystemFileHandle;
  /** 파일 객체 (폴백용) */
  file?: File;
  /** 파일명 */
  name: string;
  /** 상대 경로 (디렉토리 기준) */
  path: string;
  /** 파일 크기 (bytes) */
  size: number;
  /** MIME 타입 */
  type: string;
  /** 마지막 수정 시간 */
  lastModified: number;
}

/**
 * 디렉토리 정보
 */
export interface DirectoryInfo {
  /** 디렉토리 핸들 (Chrome/Edge) */
  handle?: FileSystemDirectoryHandle;
  /** 디렉토리명 */
  name: string;
  /** 파일 개수 */
  fileCount: number;
  /** 총 크기 (bytes) */
  totalSize: number;
}

/**
 * 스트리밍 진행률
 */
export interface StreamProgress {
  /** 현재 처리 중인 파일명 */
  currentFile: string;
  /** 현재 파일 인덱스 (0-based) */
  currentIndex: number;
  /** 총 파일 수 */
  totalFiles: number;
  /** 처리된 바이트 */
  bytesProcessed: number;
  /** 총 바이트 */
  bytesTotal: number;
  /** 진행률 (0-100) */
  percentage: number;
}

/**
 * 쓰기용 파일 데이터
 */
export interface WriteFileData {
  /** 파일명 */
  name: string;
  /** 상대 경로 (하위 디렉토리 포함) */
  path?: string;
  /** 파일 데이터 */
  data: Blob | Uint8Array | string;
  /** MIME 타입 */
  type?: string;
}

/**
 * 디렉토리 선택 옵션
 */
export interface PickDirectoryOptions {
  /** 접근 모드 */
  mode?: DirectoryMode;
  /** 시작 디렉토리 ID (이전 선택 기억용) */
  startIn?:
    | FileSystemHandle
    | "desktop"
    | "documents"
    | "downloads"
    | "pictures";
}

/**
 * 파일 필터
 */
export interface FileFilter {
  /** 허용할 확장자 목록 (예: [".json", ".txt"]) */
  extensions?: string[];
  /** 허용할 MIME 타입 목록 */
  mimeTypes?: string[];
  /** 최대 파일 크기 (bytes) */
  maxSize?: number;
  /** 최소 파일 크기 (bytes) */
  minSize?: number;
}

/**
 * 스트리밍 읽기 옵션
 */
export interface StreamReadOptions {
  /** 청크 크기 (bytes, 기본: 64KB) */
  chunkSize?: number;
  /** 진행률 콜백 */
  onProgress?: (progress: StreamProgress) => void;
  /** 파일 필터 */
  filter?: FileFilter;
  /** 재귀적 스캔 여부 */
  recursive?: boolean;
}

/**
 * 스트리밍 쓰기 옵션
 */
export interface StreamWriteOptions {
  /** 진행률 콜백 */
  onProgress?: (progress: StreamProgress) => void;
  /** 기존 파일 덮어쓰기 여부 */
  overwrite?: boolean;
  /** 하위 디렉토리 자동 생성 여부 */
  createDirectories?: boolean;
}

/**
 * ZIP 폴백 옵션
 */
export interface ZipFallbackOptions {
  /** ZIP 파일명 (기본: "download.zip") */
  filename?: string;
  /** 압축 레벨 (0-9, 기본: 6) */
  compressionLevel?: number;
  /** 진행률 콜백 */
  onProgress?: (progress: StreamProgress) => void;
}

/**
 * useFSAccess Hook 반환 타입
 */
export interface UseFSAccessReturn {
  // 상태
  /** 브라우저 지원 레벨 */
  supportLevel: SupportLevel;
  /** Chrome/Edge 완전 지원 여부 */
  isSupported: boolean;
  /** 디렉토리 선택 완료 여부 */
  isReady: boolean;
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 현재 상태 */
  state: FSAccessState;
  /** 에러 메시지 */
  error: string | null;

  // 디렉토리 정보
  /** 선택된 디렉토리 정보 */
  directory: DirectoryInfo | null;
  /** 디렉토리 내 파일 목록 */
  files: FileEntry[];
  /** 스트리밍 진행률 */
  progress: StreamProgress | null;

  // 액션 - 디렉토리
  /** 디렉토리 선택 */
  pickDirectory: (options?: PickDirectoryOptions) => Promise<boolean>;
  /** 디렉토리 닫기 */
  closeDirectory: () => void;

  // 액션 - 읽기
  /** 단일 파일 스트리밍 읽기 */
  readFileStream: (
    entry: FileEntry,
    options?: StreamReadOptions,
  ) => AsyncGenerator<Uint8Array, void, unknown>;
  /** 전체 파일 읽기 */
  readAllFiles: (
    options?: StreamReadOptions,
  ) => AsyncGenerator<{ entry: FileEntry; data: Uint8Array }, void, unknown>;

  // 액션 - 쓰기
  /** 단일 파일 쓰기 */
  writeFile: (
    file: WriteFileData,
    options?: StreamWriteOptions,
  ) => Promise<boolean>;
  /** 여러 파일 쓰기 */
  writeAllFiles: (
    files: WriteFileData[],
    options?: StreamWriteOptions,
  ) => Promise<boolean>;

  // 액션 - 폴백
  /** ZIP으로 다운로드 (Safari/Firefox) */
  downloadAsZip: (
    files: WriteFileData[],
    options?: ZipFallbackOptions,
  ) => Promise<void>;

  // 유틸리티
  /** 상태 초기화 */
  reset: () => void;
}

/**
 * File System Access API 확장 타입
 *
 * 참고: TypeScript 5.x에서는 lib.dom.d.ts에 기본 타입이 포함되어 있음
 * 여기서는 showDirectoryPicker 옵션만 확장
 */
declare global {
  interface Window {
    showDirectoryPicker?: (options?: {
      id?: string;
      mode?: "read" | "readwrite";
      startIn?:
        | FileSystemHandle
        | "desktop"
        | "documents"
        | "downloads"
        | "pictures";
    }) => Promise<FileSystemDirectoryHandle>;
  }
}

export {};
