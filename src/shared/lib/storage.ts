// ============================================
// Safe localStorage Utilities
// ============================================

export type StorageResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely get and parse JSON from localStorage
 */
export function safeGetItem<T>(key: string, defaultValue: T): T {
  if (!isStorageAvailable()) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely get raw string from localStorage
 */
export function safeGetRawItem(key: string): string | null {
  if (!isStorageAvailable()) return null;

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely set JSON to localStorage
 */
export function safeSetItem<T>(key: string, value: T): boolean {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely set raw string to localStorage
 */
export function safeSetRawItem(key: string, value: string): boolean {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely remove item from localStorage
 */
export function safeRemoveItem(key: string): boolean {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely parse JSON string
 */
export function safeJsonParse<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Create a type-safe storage accessor
 */
export function createStorageAccessor<T>(key: string, defaultValue: T) {
  return {
    get: () => safeGetItem(key, defaultValue),
    set: (value: T) => safeSetItem(key, value),
    remove: () => safeRemoveItem(key),
  };
}
