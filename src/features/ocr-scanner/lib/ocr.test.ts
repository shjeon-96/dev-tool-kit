import { describe, it, expect } from "vitest";
import { OCR_LANGUAGES, type OCRLanguage } from "./types";
import { getSupportedImageTypes, isSupportedImageType } from "./ocr";

describe("OCR Scanner", () => {
  describe("OCR_LANGUAGES", () => {
    it("contains all expected languages", () => {
      const languages = OCR_LANGUAGES.map((l) => l.value);
      expect(languages).toContain("eng");
      expect(languages).toContain("kor");
      expect(languages).toContain("jpn");
    });

    it("has 7 language options", () => {
      expect(OCR_LANGUAGES).toHaveLength(7);
    });

    it("each language has required properties", () => {
      OCR_LANGUAGES.forEach((lang) => {
        expect(lang).toHaveProperty("value");
        expect(lang).toHaveProperty("label");
        expect(lang).toHaveProperty("description");
        expect(typeof lang.value).toBe("string");
        expect(typeof lang.label).toBe("string");
        expect(typeof lang.description).toBe("string");
      });
    });

    it("includes multi-language options", () => {
      const multiLanguages = OCR_LANGUAGES.filter((l) => l.value.includes("+"));
      expect(multiLanguages.length).toBeGreaterThan(0);
      expect(multiLanguages.some((l) => l.value === "eng+kor")).toBe(true);
      expect(multiLanguages.some((l) => l.value === "eng+kor+jpn")).toBe(true);
    });
  });

  describe("getSupportedImageTypes", () => {
    it("returns array of MIME types", () => {
      const types = getSupportedImageTypes();
      expect(Array.isArray(types)).toBe(true);
      expect(types.length).toBeGreaterThan(0);
    });

    it("includes common image formats", () => {
      const types = getSupportedImageTypes();
      expect(types).toContain("image/png");
      expect(types).toContain("image/jpeg");
      expect(types).toContain("image/webp");
    });
  });

  describe("isSupportedImageType", () => {
    it("returns true for PNG files", () => {
      const file = new File([""], "test.png", { type: "image/png" });
      expect(isSupportedImageType(file)).toBe(true);
    });

    it("returns true for JPEG files", () => {
      const file = new File([""], "test.jpg", { type: "image/jpeg" });
      expect(isSupportedImageType(file)).toBe(true);
    });

    it("returns true for WebP files", () => {
      const file = new File([""], "test.webp", { type: "image/webp" });
      expect(isSupportedImageType(file)).toBe(true);
    });

    it("returns false for unsupported types", () => {
      const pdf = new File([""], "test.pdf", { type: "application/pdf" });
      expect(isSupportedImageType(pdf)).toBe(false);

      const svg = new File([""], "test.svg", { type: "image/svg+xml" });
      expect(isSupportedImageType(svg)).toBe(false);
    });
  });

  describe("OCRLanguage type", () => {
    it("accepts valid language codes", () => {
      const validLanguages: OCRLanguage[] = [
        "eng",
        "kor",
        "jpn",
        "eng+kor",
        "eng+jpn",
        "kor+jpn",
        "eng+kor+jpn",
      ];

      validLanguages.forEach((lang) => {
        expect(OCR_LANGUAGES.some((l) => l.value === lang)).toBe(true);
      });
    });
  });
});
