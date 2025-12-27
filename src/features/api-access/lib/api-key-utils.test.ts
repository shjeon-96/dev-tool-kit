import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  generateApiKey,
  maskApiKey,
  isValidApiKeyFormat,
  calculateExpirationDate,
  hashApiKey,
} from "./api-key-utils";

describe("api-key-utils", () => {
  describe("generateApiKey", () => {
    it("should generate key with correct prefix", () => {
      const key = generateApiKey();
      expect(key.startsWith("wtk_")).toBe(true);
    });

    it("should generate key with correct length", () => {
      const key = generateApiKey();
      // wtk_ (4) + 32 character nanoid = 36 total
      expect(key.length).toBe(36);
    });

    it("should generate unique keys", () => {
      const key1 = generateApiKey();
      const key2 = generateApiKey();
      expect(key1).not.toBe(key2);
    });

    it("should generate valid format keys", () => {
      const key = generateApiKey();
      expect(isValidApiKeyFormat(key)).toBe(true);
    });
  });

  describe("maskApiKey", () => {
    it("should mask key correctly", () => {
      const key = "wtk_abcdefghijklmnopqrstuvwxyz123456";
      const masked = maskApiKey(key);
      expect(masked).toBe("wtk_****yz123456");
    });

    it("should preserve last 8 characters", () => {
      const key = "wtk_12345678901234567890123456ABCDEFGH";
      const masked = maskApiKey(key);
      expect(masked.endsWith("ABCDEFGH")).toBe(true);
    });

    it("should return **** for invalid key format", () => {
      expect(maskApiKey("invalid_key")).toBe("****");
      expect(maskApiKey("abc")).toBe("****");
      expect(maskApiKey("")).toBe("****");
    });

    it("should handle key starting with different prefix", () => {
      expect(maskApiKey("xyz_abcdefgh12345678")).toBe("****");
    });

    it("should work with real generated key", () => {
      const key = generateApiKey();
      const masked = maskApiKey(key);
      expect(masked.startsWith("wtk_****")).toBe(true);
      expect(masked.length).toBe(16); // wtk_**** (8) + last 8 chars
    });
  });

  describe("isValidApiKeyFormat", () => {
    it("should return true for valid key format", () => {
      const key = "wtk_abcdefghijklmnopqrstuvwxyz123456";
      expect(isValidApiKeyFormat(key)).toBe(true);
    });

    it("should return true for key with uppercase letters", () => {
      const key = "wtk_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef";
      expect(isValidApiKeyFormat(key)).toBe(true);
    });

    it("should return true for key with numbers", () => {
      const key = "wtk_12345678901234567890123456789012";
      expect(isValidApiKeyFormat(key)).toBe(true);
    });

    it("should return true for key with underscores and hyphens", () => {
      // Must be exactly 32 characters after wtk_ prefix
      const key = "wtk_abc-def_ghi-jkl_mno-pqr_stu-vwxy";
      expect(isValidApiKeyFormat(key)).toBe(true);
    });

    it("should return false for key with wrong prefix", () => {
      expect(isValidApiKeyFormat("xyz_abcdefghijklmnopqrstuvwxyz123456")).toBe(
        false,
      );
      expect(isValidApiKeyFormat("abc_abcdefghijklmnopqrstuvwxyz123456")).toBe(
        false,
      );
    });

    it("should return false for key with wrong length", () => {
      expect(isValidApiKeyFormat("wtk_short")).toBe(false);
      expect(
        isValidApiKeyFormat("wtk_abcdefghijklmnopqrstuvwxyz12345678901234"),
      ).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidApiKeyFormat("")).toBe(false);
    });

    it("should return false for key without prefix", () => {
      expect(isValidApiKeyFormat("abcdefghijklmnopqrstuvwxyz123456")).toBe(
        false,
      );
    });

    it("should validate generated keys", () => {
      for (let i = 0; i < 10; i++) {
        const key = generateApiKey();
        expect(isValidApiKeyFormat(key)).toBe(true);
      }
    });
  });

  describe("calculateExpirationDate", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-01-15T12:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return null for never", () => {
      const result = calculateExpirationDate("never");
      expect(result).toBeNull();
    });

    it("should calculate 30 days expiration", () => {
      const result = calculateExpirationDate("30d");
      expect(result).not.toBeNull();
      expect(result!.getDate()).toBe(14); // Jan 15 + 30 days = Feb 14
      expect(result!.getMonth()).toBe(1); // February (0-indexed)
    });

    it("should calculate 90 days expiration", () => {
      const result = calculateExpirationDate("90d");
      expect(result).not.toBeNull();
      // Jan 15 + 90 days = April 14
      expect(result!.getMonth()).toBe(3); // April (0-indexed)
    });

    it("should calculate 1 year expiration", () => {
      const result = calculateExpirationDate("1y");
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2025);
      expect(result!.getMonth()).toBe(0); // January
      expect(result!.getDate()).toBe(15);
    });

    it("should return future date for all non-never options", () => {
      const now = new Date();
      const options: Array<"30d" | "90d" | "1y"> = ["30d", "90d", "1y"];

      options.forEach((option) => {
        const result = calculateExpirationDate(option);
        expect(result).not.toBeNull();
        expect(result!.getTime()).toBeGreaterThan(now.getTime());
      });
    });
  });

  describe("hashApiKey", () => {
    it("should return a hash string", async () => {
      const key = "wtk_abcdefghijklmnopqrstuvwxyz123456";
      const hash = await hashApiKey(key);

      expect(typeof hash).toBe("string");
      expect(hash.length).toBe(64); // SHA-256 produces 64 hex characters
    });

    it("should return consistent hash for same input", async () => {
      const key = "wtk_test1234567890abcdefghijklmno";
      const hash1 = await hashApiKey(key);
      const hash2 = await hashApiKey(key);

      expect(hash1).toBe(hash2);
    });

    it("should return different hash for different inputs", async () => {
      const key1 = "wtk_abcdefghijklmnopqrstuvwxyz123456";
      const key2 = "wtk_123456abcdefghijklmnopqrstuvwxyz";

      const hash1 = await hashApiKey(key1);
      const hash2 = await hashApiKey(key2);

      expect(hash1).not.toBe(hash2);
    });

    it("should return hex-only characters", async () => {
      const key = generateApiKey();
      const hash = await hashApiKey(key);

      expect(hash).toMatch(/^[0-9a-f]+$/);
    });

    it("should hash empty string", async () => {
      const hash = await hashApiKey("");
      expect(hash.length).toBe(64);
    });
  });
});
