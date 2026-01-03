/**
 * Safe localStorage wrapper with standardized error handling
 *
 * Provides graceful degradation when localStorage is unavailable
 * (e.g., private browsing mode, storage quota exceeded)
 */

import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("storage");

export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely get an item from localStorage with JSON parsing
 */
export function safeGetItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;

    return JSON.parse(stored) as T;
  } catch (error) {
    logger.debug("localStorage getItem failed", {
      key,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return defaultValue;
  }
}

/**
 * Safely get a raw string item from localStorage (no JSON parsing)
 */
export function safeGetRawItem(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(key);
  } catch (error) {
    logger.debug("localStorage getItem failed", {
      key,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  }
}

/**
 * Safely set an item in localStorage with JSON serialization
 */
export function safeSetItem<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // Common causes: quota exceeded, private browsing mode
    logger.debug("localStorage setItem failed", {
      key,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

/**
 * Safely set a raw string item in localStorage (no JSON serialization)
 */
export function safeSetRawItem(key: string, value: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    logger.debug("localStorage setItem failed", {
      key,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 */
export function safeRemoveItem(key: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logger.debug("localStorage removeItem failed", {
      key,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

/**
 * Safely parse JSON with error handling
 */
export function safeJsonParse<T>(
  json: string,
  defaultValue: T,
): StorageResult<T> {
  try {
    return {
      success: true,
      data: JSON.parse(json) as T,
    };
  } catch (error) {
    logger.debug("JSON parse failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      success: false,
      data: defaultValue,
      error: error instanceof Error ? error : new Error("JSON parse failed"),
    };
  }
}

/**
 * Create a typed storage accessor for a specific key
 * Useful for creating reusable storage hooks
 */
export function createStorageAccessor<T>(key: string, defaultValue: T) {
  return {
    get: () => safeGetItem(key, defaultValue),
    set: (value: T) => safeSetItem(key, value),
    remove: () => safeRemoveItem(key),
    key,
    defaultValue,
  };
}
