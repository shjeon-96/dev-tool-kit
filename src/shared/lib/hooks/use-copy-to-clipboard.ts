"use client";

import { useState, useCallback } from "react";

interface UseCopyToClipboardOptions {
  /** Duration to show "copied" state in ms (default: 2000) */
  duration?: number;
  /** Callback when copy succeeds */
  onSuccess?: () => void;
  /** Callback when copy fails */
  onError?: (error: unknown) => void;
}

interface UseCopyToClipboardReturn {
  /** Whether text was recently copied */
  copied: boolean;
  /** Copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Reset copied state */
  reset: () => void;
}

/**
 * Custom hook for copying text to clipboard with visual feedback
 *
 * @example
 * ```tsx
 * const { copied, copy } = useCopyToClipboard();
 *
 * return (
 *   <button onClick={() => copy(text)}>
 *     {copied ? <Check /> : <Copy />}
 *   </button>
 * );
 * ```
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardReturn {
  const { duration = 2000, onSuccess, onError } = options;

  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) return false;

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onSuccess?.();

        // Auto-reset after duration
        setTimeout(() => setCopied(false), duration);

        return true;
      } catch (error) {
        onError?.(error);
        return false;
      }
    },
    [duration, onSuccess, onError],
  );

  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  return { copied, copy, reset };
}

/**
 * Hook for managing multiple copy states (e.g., list of items)
 *
 * @example
 * ```tsx
 * const { copiedIndex, copyAt } = useCopyAtIndex();
 *
 * return items.map((item, i) => (
 *   <button onClick={() => copyAt(item.text, i)}>
 *     {copiedIndex === i ? <Check /> : <Copy />}
 *   </button>
 * ));
 * ```
 */
export function useCopyAtIndex(options: UseCopyToClipboardOptions = {}): {
  copiedIndex: number | null;
  copyAt: (text: string, index: number) => Promise<boolean>;
  reset: () => void;
} {
  const { duration = 2000, onSuccess, onError } = options;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyAt = useCallback(
    async (text: string, index: number): Promise<boolean> => {
      if (!text) return false;

      try {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        onSuccess?.();

        // Auto-reset after duration
        setTimeout(() => setCopiedIndex(null), duration);

        return true;
      } catch (error) {
        onError?.(error);
        return false;
      }
    },
    [duration, onSuccess, onError],
  );

  const reset = useCallback(() => {
    setCopiedIndex(null);
  }, []);

  return { copiedIndex, copyAt, reset };
}
