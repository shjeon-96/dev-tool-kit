import { describe, it, expect } from "vitest";
import { parsePageRange } from "./split";

describe("PDF Split", () => {
  describe("parsePageRange", () => {
    const totalPages = 20;

    it("parses single page number", () => {
      const result = parsePageRange("5", totalPages);
      expect(result).toEqual([4]); // 0-based index
    });

    it("parses multiple single pages", () => {
      const result = parsePageRange("1, 5, 10", totalPages);
      expect(result).toEqual([0, 4, 9]);
    });

    it("parses page range", () => {
      const result = parsePageRange("1-5", totalPages);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it("parses mixed pages and ranges", () => {
      const result = parsePageRange("1-3, 5, 8-10", totalPages);
      expect(result).toEqual([0, 1, 2, 4, 7, 8, 9]);
    });

    it("handles duplicate pages", () => {
      const result = parsePageRange("1, 1, 2, 2-3", totalPages);
      expect(result).toEqual([0, 1, 2]);
    });

    it("clamps range to total pages", () => {
      const result = parsePageRange("18-25", totalPages);
      expect(result).toEqual([17, 18, 19]); // pages 18, 19, 20
    });

    it("ignores pages beyond total", () => {
      const result = parsePageRange("21, 22, 100", totalPages);
      expect(result).toEqual([]);
    });

    it("ignores pages below 1", () => {
      const result = parsePageRange("0, -1, 1", totalPages);
      expect(result).toEqual([0]); // only page 1
    });

    it("handles empty input", () => {
      const result = parsePageRange("", totalPages);
      expect(result).toEqual([]);
    });

    it("handles whitespace", () => {
      const result = parsePageRange("  1 , 2 , 3  ", totalPages);
      expect(result).toEqual([0, 1, 2]);
    });

    it("handles invalid input", () => {
      const result = parsePageRange("abc, xyz", totalPages);
      expect(result).toEqual([]);
    });

    it("handles mixed valid and invalid", () => {
      const result = parsePageRange("1, abc, 3, xyz, 5", totalPages);
      expect(result).toEqual([0, 2, 4]);
    });

    it("returns sorted indices", () => {
      const result = parsePageRange("10, 1, 5, 3", totalPages);
      expect(result).toEqual([0, 2, 4, 9]);
    });

    it("handles range with spaces", () => {
      const result = parsePageRange("1 - 3", totalPages);
      expect(result).toEqual([0, 1, 2]);
    });

    it("handles reversed range (start > end)", () => {
      // When start > end, the loop doesn't execute
      const result = parsePageRange("5-1", totalPages);
      expect(result).toEqual([]);
    });

    it("handles single page in total", () => {
      const result = parsePageRange("1-5", 1);
      expect(result).toEqual([0]); // only page 1 exists
    });
  });
});
