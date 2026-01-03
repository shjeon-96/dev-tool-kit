import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  safeGetItem,
  safeGetRawItem,
  safeSetItem,
  safeSetRawItem,
  safeRemoveItem,
  safeJsonParse,
  createStorageAccessor,
} from "./safe-storage";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("safe-storage", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("safeGetItem", () => {
    it("should return default value when key not found", () => {
      const result = safeGetItem("missing", { default: true });
      expect(result).toEqual({ default: true });
    });

    it("should parse and return stored JSON value", () => {
      localStorageMock.setItem("test", JSON.stringify({ foo: "bar" }));
      const result = safeGetItem("test", {});
      expect(result).toEqual({ foo: "bar" });
    });

    it("should return default value on parse error", () => {
      localStorageMock.setItem("test", "invalid json");
      const result = safeGetItem("test", { default: true });
      expect(result).toEqual({ default: true });
    });

    it("should return default value when localStorage throws", () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error("Storage error");
      });
      const result = safeGetItem("test", { default: true });
      expect(result).toEqual({ default: true });
    });
  });

  describe("safeGetRawItem", () => {
    it("should return null when key not found", () => {
      const result = safeGetRawItem("missing");
      expect(result).toBeNull();
    });

    it("should return raw string value", () => {
      localStorageMock.setItem("test", "raw value");
      const result = safeGetRawItem("test");
      expect(result).toBe("raw value");
    });

    it("should return null on error", () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error("Storage error");
      });
      const result = safeGetRawItem("test");
      expect(result).toBeNull();
    });
  });

  describe("safeSetItem", () => {
    it("should store JSON serialized value", () => {
      const result = safeSetItem("test", { foo: "bar" });
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "test",
        '{"foo":"bar"}',
      );
    });

    it("should return false on storage error", () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error("Quota exceeded");
      });
      const result = safeSetItem("test", { foo: "bar" });
      expect(result).toBe(false);
    });
  });

  describe("safeSetRawItem", () => {
    it("should store raw string value", () => {
      const result = safeSetRawItem("test", "raw value");
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "test",
        "raw value",
      );
    });

    it("should return false on storage error", () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error("Quota exceeded");
      });
      const result = safeSetRawItem("test", "raw value");
      expect(result).toBe(false);
    });
  });

  describe("safeRemoveItem", () => {
    it("should remove item from storage", () => {
      localStorageMock.setItem("test", "value");
      const result = safeRemoveItem("test");
      expect(result).toBe(true);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("test");
    });

    it("should return false on error", () => {
      localStorageMock.removeItem.mockImplementationOnce(() => {
        throw new Error("Storage error");
      });
      const result = safeRemoveItem("test");
      expect(result).toBe(false);
    });
  });

  describe("safeJsonParse", () => {
    it("should parse valid JSON", () => {
      const result = safeJsonParse('{"foo":"bar"}', {});
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ foo: "bar" });
      expect(result.error).toBeUndefined();
    });

    it("should return default on invalid JSON", () => {
      const result = safeJsonParse("invalid", { default: true });
      expect(result.success).toBe(false);
      expect(result.data).toEqual({ default: true });
      expect(result.error).toBeInstanceOf(Error);
    });

    it("should handle empty string", () => {
      const result = safeJsonParse("", { default: true });
      expect(result.success).toBe(false);
      expect(result.data).toEqual({ default: true });
    });
  });

  describe("createStorageAccessor", () => {
    it("should create an accessor with get/set/remove methods", () => {
      const accessor = createStorageAccessor("my-key", { count: 0 });

      expect(accessor.key).toBe("my-key");
      expect(accessor.defaultValue).toEqual({ count: 0 });

      // Test set
      accessor.set({ count: 5 });
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "my-key",
        '{"count":5}',
      );

      // Test get (after mocking the stored value)
      localStorageMock.setItem("my-key", '{"count":5}');
      const value = accessor.get();
      expect(value).toEqual({ count: 5 });

      // Test remove
      accessor.remove();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("my-key");
    });
  });
});
