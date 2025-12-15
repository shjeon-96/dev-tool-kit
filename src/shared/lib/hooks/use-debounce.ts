"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Debounce a value - returns the debounced value after the specified delay
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 300);
 *
 * useEffect(() => {
 *   // This will only run 300ms after the user stops typing
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounce a callback function
 *
 * @example
 * ```tsx
 * const debouncedSave = useDebouncedCallback((text: string) => {
 *   saveToServer(text);
 * }, 500);
 *
 * return <input onChange={(e) => debouncedSave(e.target.value)} />;
 * ```
 */
export function useDebouncedCallback<
  T extends (...args: Parameters<T>) => void,
>(callback: T, delay: number): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Returns both immediate and debounced values
 * Useful when you need to show immediate UI feedback but debounce expensive operations
 *
 * @example
 * ```tsx
 * const [input, debouncedInput, setInput] = useDebouncedState('', 300);
 *
 * // input - shows immediately in the UI
 * // debouncedInput - used for expensive operations
 * ```
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number,
): [T, T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce(value, delay);

  return [value, debouncedValue, setValue];
}
