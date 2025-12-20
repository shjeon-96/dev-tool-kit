export { cn } from "./utils";
export { useToolHistory, type HistoryItem } from "./hooks/use-tool-history";
export { useUrlState } from "./hooks/use-url-state";
export { useFavorites } from "./hooks/use-favorites";
export { useRecentTools } from "./hooks/use-recent-tools";
export { useAdSense } from "./hooks/use-ad-sense";
export {
  useCopyToClipboard,
  useCopyAtIndex,
} from "./hooks/use-copy-to-clipboard";
export {
  useDebounce,
  useDebouncedCallback,
  useDebouncedState,
} from "./hooks/use-debounce";
export {
  useOnlineStatus,
  useServiceWorkerStatus,
  useOfflineReady,
  useNetworkStatusChange,
  useOfflineUpgradePrompt,
} from "./hooks/use-online-status";
export { useFileDropzone } from "./hooks/use-file-dropzone";

// Format utilities
export {
  formatBytes,
  formatSize,
  formatDate,
  formatRelativeDate,
  formatNumber,
  formatPercent,
  truncateString,
  formatDuration,
} from "./format-utils";

// Storage utilities
export {
  getByteSize,
  getSessionStorageUsage,
  getSessionStorageRemaining,
  isPipelineDataTooLarge,
  canStorePipelineData,
  safeSessionStorageSet,
  PIPELINE_DATA_LIMIT,
} from "./storage-utils";

// Database (Dexie.js)
export { db } from "./db";
export type { Workspace, WorkspaceItem, AIConfig } from "./db";

// API utilities - import directly from "@/shared/lib/api" in server components only
