"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { detectContentType, type DetectionResult } from "./detector";

interface SmartPasteState {
  isActive: boolean;
  detection: DetectionResult | null;
  showNotification: boolean;
}

interface UseSmartPasteOptions {
  enabled?: boolean;
  onDetection?: (result: DetectionResult) => void;
  autoNavigate?: boolean;
  confidenceThreshold?: number;
}

export function useSmartPaste(options: UseSmartPasteOptions = {}) {
  const {
    enabled = true,
    onDetection,
    autoNavigate = false,
    confidenceThreshold = 0.7,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [state, setState] = useState<SmartPasteState>({
    isActive: false,
    detection: null,
    showNotification: false,
  });

  // Track if we're on tools page (root level)
  const isOnToolsPage =
    pathname === `/${locale}/tools` || pathname === `/${locale}`;

  // Prevent multiple rapid detections
  const lastDetectionTime = useRef<number>(0);
  const notificationTimeout = useRef<NodeJS.Timeout | null>(null);

  const hideNotification = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showNotification: false,
    }));
  }, []);

  const navigateToTool = useCallback(
    (tool: string) => {
      router.push(`/${locale}/tools/${tool}`);
      hideNotification();
    },
    [router, locale, hideNotification],
  );

  const handlePaste = useCallback(
    async (event: ClipboardEvent) => {
      if (!enabled) return;

      // Prevent triggering when pasting into input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Debounce: prevent multiple detections within 500ms
      const now = Date.now();
      if (now - lastDetectionTime.current < 500) {
        return;
      }
      lastDetectionTime.current = now;

      // Get clipboard content
      const text = event.clipboardData?.getData("text/plain");
      if (!text) return;

      // Detect content type
      const result = detectContentType(text);

      if (result && result.confidence >= confidenceThreshold) {
        setState({
          isActive: true,
          detection: result,
          showNotification: true,
        });

        onDetection?.(result);

        // Auto-navigate if enabled and on tools page
        if (autoNavigate && isOnToolsPage) {
          navigateToTool(result.tool);
        } else {
          // Clear notification after 5 seconds
          if (notificationTimeout.current) {
            clearTimeout(notificationTimeout.current);
          }
          notificationTimeout.current = setTimeout(() => {
            hideNotification();
          }, 5000);
        }
      }
    },
    [
      enabled,
      confidenceThreshold,
      onDetection,
      autoNavigate,
      isOnToolsPage,
      navigateToTool,
      hideNotification,
    ],
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, [enabled, handlePaste]);

  return {
    ...state,
    navigateToTool,
    hideNotification,
  };
}
