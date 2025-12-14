"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

interface UseUrlStateOptions<T> {
  key?: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

interface UseUrlStateReturn<T> {
  state: T;
  setState: (value: T | ((prev: T) => T)) => void;
  clearUrl: () => void;
  getShareUrl: () => string;
  hasUrlState: boolean;
}

/**
 * Hook for managing state synchronized with URL parameters using LZ-String compression
 * @param options - Configuration options for URL state management
 * @returns State management functions and current state
 */
export function useUrlState<T>(
  options: UseUrlStateOptions<T>,
): UseUrlStateReturn<T> {
  const {
    key = "data",
    defaultValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse state from URL
  const getStateFromUrl = useCallback((): T => {
    if (!searchParams) return defaultValue;
    const param = searchParams.get(key);
    if (param) {
      try {
        const decompressed = decompressFromEncodedURIComponent(param);
        if (decompressed) {
          return deserialize(decompressed);
        }
      } catch {
        // Parsing failed, use default
      }
    }
    return defaultValue;
  }, [searchParams, key, deserialize, defaultValue]);

  // Initialize state from URL or default
  const [state, setStateInternal] = useState<T>(getStateFromUrl);

  // Track previous searchParams to detect external URL changes
  const prevSearchParamsRef = useRef(searchParams?.toString());

  // Sync state from URL on external searchParams change (e.g., browser back/forward)
  useEffect(() => {
    const currentParamsString = searchParams?.toString();
    if (prevSearchParamsRef.current !== currentParamsString) {
      prevSearchParamsRef.current = currentParamsString;
      // Use requestAnimationFrame to avoid synchronous setState in effect
      const rafId = requestAnimationFrame(() => {
        const newState = getStateFromUrl();
        setStateInternal(newState);
      });

      // Cleanup to prevent memory leak
      return () => cancelAnimationFrame(rafId);
    }
  }, [searchParams, getStateFromUrl]);

  // Update URL with new state
  const updateUrl = useCallback(
    (value: T) => {
      const serialized = serialize(value);
      const compressed = compressToEncodedURIComponent(serialized);

      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set(key, compressed);

      const currentPath = pathname ?? "/";
      router.replace(`${currentPath}?${params.toString()}`, { scroll: false });
    },
    [key, pathname, router, searchParams, serialize],
  );

  // Set state and update URL
  const setState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStateInternal((prev) => {
        const newValue =
          typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        updateUrl(newValue);
        return newValue;
      });
    },
    [updateUrl],
  );

  // Clear URL parameter and reset to default
  const clearUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.delete(key);

    const currentPath = pathname ?? "/";
    const queryString = params.toString();
    const newPath = queryString ? `${currentPath}?${queryString}` : currentPath;

    router.replace(newPath, { scroll: false });
    setStateInternal(defaultValue);
  }, [key, pathname, router, searchParams, defaultValue]);

  // Get shareable URL
  const getShareUrl = useCallback(() => {
    const serialized = serialize(state);
    const compressed = compressToEncodedURIComponent(serialized);
    const params = new URLSearchParams();
    params.set(key, compressed);

    const currentPath = pathname ?? "/";
    if (typeof window !== "undefined") {
      return `${window.location.origin}${currentPath}?${params.toString()}`;
    }
    return `${currentPath}?${params.toString()}`;
  }, [key, pathname, serialize, state]);

  return {
    state,
    setState,
    clearUrl,
    getShareUrl,
    hasUrlState: searchParams?.has(key) ?? false,
  };
}
