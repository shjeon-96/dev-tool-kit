/**
 * File System Access API Module
 *
 * 대용량 파일 스트리밍 처리(10GB+)를 위한 브라우저 API 래퍼
 *
 * 브라우저 지원:
 * - Chrome/Edge 86+: File System Access API 완전 지원
 * - Safari/Firefox: ZIP 다운로드 폴백
 *
 * @example
 * ```tsx
 * import { useFSAccess } from "@/shared/lib/fs-access";
 *
 * function FileExporter({ files }) {
 *   const {
 *     isSupported,
 *     pickDirectory,
 *     writeAllFiles,
 *     downloadAsZip,
 *     progress
 *   } = useFSAccess();
 *
 *   const handleExport = async () => {
 *     if (isSupported) {
 *       const ok = await pickDirectory({ mode: "readwrite" });
 *       if (ok) await writeAllFiles(files);
 *     } else {
 *       await downloadAsZip(files, { filename: "export.zip" });
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleExport}>
 *       {progress ? `${progress.percentage}%` : "Export"}
 *     </button>
 *   );
 * }
 * ```
 */

// Types
export type {
  SupportLevel,
  FSAccessState,
  DirectoryMode,
  FileEntry,
  DirectoryInfo,
  StreamProgress,
  WriteFileData,
  PickDirectoryOptions,
  FileFilter,
  StreamReadOptions,
  StreamWriteOptions,
  ZipFallbackOptions,
  UseFSAccessReturn,
} from "./types";

// Main Hook
export { useFSAccess } from "./use-fs-access";

// Detection (SSR-safe)
export {
  useFSAccessSupport,
  checkFSAccessSupport,
  detectBrowser,
  useBrowserInfo,
} from "./detect";

// Stream Read
export {
  scanDirectory,
  readFileStream,
  readFileAsUint8Array,
  readFileAsText,
  readAllFiles,
} from "./stream-read";

// Stream Write
export {
  writeFile,
  writeAllFiles,
  writeFileStream,
  deleteFile,
  deleteDirectory,
} from "./stream-write";

// Fallback (Safari/Firefox)
export {
  downloadAsZip,
  downloadFile,
  createZipBlob,
  readZipFile,
} from "./fallback";

// UI Components
export {
  BrowserPromptBanner,
  BrowserPromptDialog,
  ExportModeSelector,
  FSAccessStatus,
} from "./ui";
