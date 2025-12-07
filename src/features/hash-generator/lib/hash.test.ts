import { describe, it, expect } from "vitest";
import {
  computeHash,
  computeAllHashes,
  compareHashes,
  HASH_ALGORITHMS,
  type HashAlgorithm,
} from "./hash";

describe("Hash Generator", () => {
  describe("computeHash", () => {
    const testInput = "hello world";

    it("generates correct MD5 hash", () => {
      const result = computeHash(testInput, "md5");
      expect(result).toBe("5eb63bbbe01eeed093cb22bb8f5acdc3");
    });

    it("generates correct SHA1 hash", () => {
      const result = computeHash(testInput, "sha1");
      expect(result).toBe("2aae6c35c94fcfb415dbe95f408b9ce91ee846ed");
    });

    it("generates correct SHA256 hash", () => {
      const result = computeHash(testInput, "sha256");
      expect(result).toBe(
        "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
      );
    });

    it("generates correct SHA512 hash", () => {
      const result = computeHash(testInput, "sha512");
      expect(result).toBe(
        "309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f",
      );
    });

    it("handles empty string", () => {
      const result = computeHash("", "md5");
      expect(result).toBe("d41d8cd98f00b204e9800998ecf8427e");
    });

    it("handles unicode characters", () => {
      const result = computeHash("안녕하세요", "md5");
      expect(result).toHaveLength(32); // MD5 produces 32 hex characters
    });

    it("handles special characters", () => {
      const result = computeHash("!@#$%^&*()", "sha256");
      expect(result).toHaveLength(64); // SHA256 produces 64 hex characters
    });

    it("produces consistent results", () => {
      const hash1 = computeHash("test", "sha256");
      const hash2 = computeHash("test", "sha256");
      expect(hash1).toBe(hash2);
    });

    it("throws error for unsupported algorithm", () => {
      expect(() => computeHash("test", "invalid" as HashAlgorithm)).toThrow(
        "Unsupported algorithm",
      );
    });
  });

  describe("computeAllHashes", () => {
    it("returns all supported hash algorithms", () => {
      const results = computeAllHashes("test");
      expect(results).toHaveLength(HASH_ALGORITHMS.length);
      expect(results.map((r) => r.algorithm)).toEqual(HASH_ALGORITHMS);
    });

    it("returns correct hash structure", () => {
      const results = computeAllHashes("test");
      results.forEach((result) => {
        expect(result).toHaveProperty("algorithm");
        expect(result).toHaveProperty("hash");
        expect(typeof result.hash).toBe("string");
        expect(result.hash.length).toBeGreaterThan(0);
      });
    });

    it("handles empty input", () => {
      const results = computeAllHashes("");
      expect(results).toHaveLength(HASH_ALGORITHMS.length);
      results.forEach((result) => {
        expect(result.hash.length).toBeGreaterThan(0);
      });
    });
  });

  describe("compareHashes", () => {
    const testHashes = [
      {
        algorithm: "md5" as HashAlgorithm,
        hash: "5eb63bbbe01eeed093cb22bb8f5acdc3",
      },
      {
        algorithm: "sha1" as HashAlgorithm,
        hash: "2aae6c35c94fcfb415dbe95f408b9ce91ee846ed",
      },
    ];

    it("returns true when hash matches (exact)", () => {
      const result = compareHashes(
        testHashes,
        "5eb63bbbe01eeed093cb22bb8f5acdc3",
      );
      expect(result).toBe(true);
    });

    it("returns true when hash matches (case insensitive)", () => {
      const result = compareHashes(
        testHashes,
        "5EB63BBBE01EEED093CB22BB8F5ACDC3",
      );
      expect(result).toBe(true);
    });

    it("returns true when hash matches with whitespace", () => {
      const result = compareHashes(
        testHashes,
        "  5eb63bbbe01eeed093cb22bb8f5acdc3  ",
      );
      expect(result).toBe(true);
    });

    it("returns false when hash does not match", () => {
      const result = compareHashes(testHashes, "invalidhash123");
      expect(result).toBe(false);
    });

    it("returns null when compareHash is empty", () => {
      const result = compareHashes(testHashes, "");
      expect(result).toBe(null);
    });

    it("returns null when compareHash is only whitespace", () => {
      const result = compareHashes(testHashes, "   ");
      expect(result).toBe(null);
    });

    it("returns null when hashes array is empty", () => {
      const result = compareHashes([], "somehash");
      expect(result).toBe(null);
    });
  });

  describe("HASH_ALGORITHMS", () => {
    it("contains all expected algorithms", () => {
      expect(HASH_ALGORITHMS).toContain("md5");
      expect(HASH_ALGORITHMS).toContain("sha1");
      expect(HASH_ALGORITHMS).toContain("sha256");
      expect(HASH_ALGORITHMS).toContain("sha512");
    });
  });
});
