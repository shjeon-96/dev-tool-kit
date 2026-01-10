/**
 * Shared Hooks - Barrel Export
 *
 * 공용 Hook 모음
 */

// Tool State Management (Composition Pattern)
export {
  useToolState,
  type ProcessResult,
  type UseToolStateOptions,
  type UseToolStateReturn,
} from "./use-tool-state";

// User Preferences & History
export { useToolHistory } from "./use-tool-history";
export { useFavorites } from "./use-favorites";
export { useRecentTools } from "./use-recent-tools";
export { useVisitedTools } from "./use-visited-tools";

// UI & Interaction
export { useCopyToClipboard } from "./use-copy-to-clipboard";
export { useDebounce } from "./use-debounce";
export { useFileDropzone } from "./use-file-dropzone";
export { useUrlState } from "./use-url-state";

// Network & Status
export { useOnlineStatus } from "./use-online-status";
export { useAdBlockDetection } from "./use-adblock-detection";
export { useAdSense } from "./use-ad-sense";

// Animation
export {
  useScrollAnimation,
  useStaggeredAnimation,
} from "./use-scroll-animation";
