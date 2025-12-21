import { describe, it, expect } from "vitest";
import { calculateCompressionStats } from "./compress";

describe("PDF Compress", () => {
  describe("calculateCompressionStats", () => {
    it("calculates correct stats for compression", () => {
      const result = calculateCompressionStats(1000, 700);
      expect(result).toEqual({
        originalSize: 1000,
        compressedSize: 700,
        savedBytes: 300,
        savedPercent: 30,
      });
    });

    it("calculates 50% compression", () => {
      const result = calculateCompressionStats(2000, 1000);
      expect(result.savedPercent).toBe(50);
      expect(result.savedBytes).toBe(1000);
    });

    it("handles no compression (same size)", () => {
      const result = calculateCompressionStats(1000, 1000);
      expect(result).toEqual({
        originalSize: 1000,
        compressedSize: 1000,
        savedBytes: 0,
        savedPercent: 0,
      });
    });

    it("handles size increase (negative compression)", () => {
      const result = calculateCompressionStats(1000, 1200);
      expect(result).toEqual({
        originalSize: 1000,
        compressedSize: 1200,
        savedBytes: 0, // clamped to 0
        savedPercent: 0, // clamped to 0
      });
    });

    it("handles zero original size", () => {
      const result = calculateCompressionStats(0, 0);
      expect(result).toEqual({
        originalSize: 0,
        compressedSize: 0,
        savedBytes: 0,
        savedPercent: 0,
      });
    });

    it("handles 100% compression (complete removal)", () => {
      const result = calculateCompressionStats(1000, 0);
      expect(result).toEqual({
        originalSize: 1000,
        compressedSize: 0,
        savedBytes: 1000,
        savedPercent: 100,
      });
    });

    it("handles large file sizes", () => {
      const originalSize = 100 * 1024 * 1024; // 100 MB
      const compressedSize = 75 * 1024 * 1024; // 75 MB
      const result = calculateCompressionStats(originalSize, compressedSize);

      expect(result.originalSize).toBe(originalSize);
      expect(result.compressedSize).toBe(compressedSize);
      expect(result.savedBytes).toBe(25 * 1024 * 1024);
      expect(result.savedPercent).toBe(25);
    });

    it("handles floating point percentages", () => {
      const result = calculateCompressionStats(1000, 666);
      expect(result.savedBytes).toBe(334);
      expect(result.savedPercent).toBeCloseTo(33.4, 1);
    });
  });
});
