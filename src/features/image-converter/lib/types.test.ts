import { describe, it, expect } from "vitest";
import {
  FORMAT_INFO,
  DEFAULT_OPTIONS,
  getFormatFromExtension,
  getFormatFromMimeType,
  isFormatSupported,
  formatFileSize,
  calculateCompressionRatio,
} from "./types";
import type { ImageFormat } from "./types";

describe("image-converter types", () => {
  describe("FORMAT_INFO", () => {
    it("should have all supported formats", () => {
      const formats: ImageFormat[] = ["jpeg", "png", "webp", "avif", "gif"];
      formats.forEach((format) => {
        expect(FORMAT_INFO[format]).toBeDefined();
      });
    });

    it("should have required properties for each format", () => {
      Object.values(FORMAT_INFO).forEach((info) => {
        expect(info.name).toBeDefined();
        expect(info.extension).toBeDefined();
        expect(info.mimeType).toBeDefined();
        expect(typeof info.supportsTransparency).toBe("boolean");
        expect(typeof info.supportsAnimation).toBe("boolean");
        expect(typeof info.supportsQuality).toBe("boolean");
      });
    });

    it("should have correct JPEG properties", () => {
      expect(FORMAT_INFO.jpeg.name).toBe("JPEG");
      expect(FORMAT_INFO.jpeg.extension).toBe("jpg");
      expect(FORMAT_INFO.jpeg.mimeType).toBe("image/jpeg");
      expect(FORMAT_INFO.jpeg.supportsTransparency).toBe(false);
      expect(FORMAT_INFO.jpeg.supportsAnimation).toBe(false);
      expect(FORMAT_INFO.jpeg.supportsQuality).toBe(true);
    });

    it("should have correct PNG properties", () => {
      expect(FORMAT_INFO.png.name).toBe("PNG");
      expect(FORMAT_INFO.png.extension).toBe("png");
      expect(FORMAT_INFO.png.mimeType).toBe("image/png");
      expect(FORMAT_INFO.png.supportsTransparency).toBe(true);
      expect(FORMAT_INFO.png.supportsAnimation).toBe(false);
      expect(FORMAT_INFO.png.supportsQuality).toBe(false);
    });

    it("should have correct WebP properties", () => {
      expect(FORMAT_INFO.webp.name).toBe("WebP");
      expect(FORMAT_INFO.webp.mimeType).toBe("image/webp");
      expect(FORMAT_INFO.webp.supportsTransparency).toBe(true);
      expect(FORMAT_INFO.webp.supportsAnimation).toBe(true);
      expect(FORMAT_INFO.webp.supportsQuality).toBe(true);
    });

    it("should have correct AVIF properties", () => {
      expect(FORMAT_INFO.avif.name).toBe("AVIF");
      expect(FORMAT_INFO.avif.mimeType).toBe("image/avif");
      expect(FORMAT_INFO.avif.supportsTransparency).toBe(true);
      expect(FORMAT_INFO.avif.supportsAnimation).toBe(true);
    });

    it("should have correct GIF properties", () => {
      expect(FORMAT_INFO.gif.name).toBe("GIF");
      expect(FORMAT_INFO.gif.mimeType).toBe("image/gif");
      expect(FORMAT_INFO.gif.supportsTransparency).toBe(true);
      expect(FORMAT_INFO.gif.supportsAnimation).toBe(true);
      expect(FORMAT_INFO.gif.supportsQuality).toBe(false);
    });
  });

  describe("DEFAULT_OPTIONS", () => {
    it("should have webp as default format", () => {
      expect(DEFAULT_OPTIONS.format).toBe("webp");
    });

    it("should have 85 as default quality", () => {
      expect(DEFAULT_OPTIONS.quality).toBe(85);
    });

    it("should not maintain metadata by default", () => {
      expect(DEFAULT_OPTIONS.maintainMetadata).toBe(false);
    });
  });

  describe("getFormatFromExtension", () => {
    it("should return jpeg for jpg extension", () => {
      expect(getFormatFromExtension("image.jpg")).toBe("jpeg");
    });

    it("should return jpeg for jpeg extension", () => {
      expect(getFormatFromExtension("image.jpeg")).toBe("jpeg");
    });

    it("should return png for png extension", () => {
      expect(getFormatFromExtension("image.png")).toBe("png");
    });

    it("should return webp for webp extension", () => {
      expect(getFormatFromExtension("image.webp")).toBe("webp");
    });

    it("should return avif for avif extension", () => {
      expect(getFormatFromExtension("image.avif")).toBe("avif");
    });

    it("should return gif for gif extension", () => {
      expect(getFormatFromExtension("image.gif")).toBe("gif");
    });

    it("should return tiff for tiff/tif extension", () => {
      expect(getFormatFromExtension("image.tiff")).toBe("tiff");
      expect(getFormatFromExtension("image.tif")).toBe("tiff");
    });

    it("should return svg for svg extension", () => {
      expect(getFormatFromExtension("image.svg")).toBe("svg");
    });

    it("should return bmp for bmp extension", () => {
      expect(getFormatFromExtension("image.bmp")).toBe("bmp");
    });

    it("should handle uppercase extensions", () => {
      expect(getFormatFromExtension("image.JPG")).toBe("jpeg");
      expect(getFormatFromExtension("image.PNG")).toBe("png");
    });

    it("should handle mixed case extensions", () => {
      expect(getFormatFromExtension("image.JpG")).toBe("jpeg");
    });

    it("should return original extension for unknown formats", () => {
      expect(getFormatFromExtension("image.xyz")).toBe("xyz");
    });

    it("should handle filenames without extension", () => {
      expect(getFormatFromExtension("image")).toBe("image");
    });

    it("should handle empty string", () => {
      expect(getFormatFromExtension("")).toBe("");
    });

    it("should handle multiple dots in filename", () => {
      expect(getFormatFromExtension("my.photo.jpg")).toBe("jpeg");
    });
  });

  describe("getFormatFromMimeType", () => {
    it("should return jpeg for image/jpeg", () => {
      expect(getFormatFromMimeType("image/jpeg")).toBe("jpeg");
    });

    it("should return png for image/png", () => {
      expect(getFormatFromMimeType("image/png")).toBe("png");
    });

    it("should return webp for image/webp", () => {
      expect(getFormatFromMimeType("image/webp")).toBe("webp");
    });

    it("should return avif for image/avif", () => {
      expect(getFormatFromMimeType("image/avif")).toBe("avif");
    });

    it("should return gif for image/gif", () => {
      expect(getFormatFromMimeType("image/gif")).toBe("gif");
    });

    it("should return bmp for image/bmp", () => {
      expect(getFormatFromMimeType("image/bmp")).toBe("bmp");
    });

    it("should return tiff for image/tiff", () => {
      expect(getFormatFromMimeType("image/tiff")).toBe("tiff");
    });

    it("should return svg for image/svg+xml", () => {
      expect(getFormatFromMimeType("image/svg+xml")).toBe("svg");
    });

    it("should return unknown for unsupported mime types", () => {
      expect(getFormatFromMimeType("application/pdf")).toBe("unknown");
      expect(getFormatFromMimeType("text/plain")).toBe("unknown");
    });

    it("should return unknown for empty string", () => {
      expect(getFormatFromMimeType("")).toBe("unknown");
    });
  });

  describe("isFormatSupported", () => {
    it("should return true for jpeg", () => {
      expect(isFormatSupported("jpeg")).toBe(true);
    });

    it("should return true for png", () => {
      expect(isFormatSupported("png")).toBe(true);
    });

    it("should return true for webp", () => {
      expect(isFormatSupported("webp")).toBe(true);
    });

    it("should return true for avif", () => {
      expect(isFormatSupported("avif")).toBe(true);
    });

    it("should return true for gif", () => {
      expect(isFormatSupported("gif")).toBe(true);
    });

    it("should return false for unsupported formats", () => {
      expect(isFormatSupported("bmp")).toBe(false);
      expect(isFormatSupported("tiff")).toBe(false);
      expect(isFormatSupported("svg")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isFormatSupported("")).toBe(false);
    });

    it("should return false for random string", () => {
      expect(isFormatSupported("xyz")).toBe(false);
    });
  });

  describe("formatFileSize", () => {
    it("should format bytes", () => {
      expect(formatFileSize(0)).toBe("0 B");
      expect(formatFileSize(100)).toBe("100 B");
      expect(formatFileSize(1023)).toBe("1023 B");
    });

    it("should format kilobytes", () => {
      expect(formatFileSize(1024)).toBe("1.0 KB");
      expect(formatFileSize(1536)).toBe("1.5 KB");
      expect(formatFileSize(10240)).toBe("10.0 KB");
    });

    it("should format megabytes", () => {
      expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
      expect(formatFileSize(1.5 * 1024 * 1024)).toBe("1.50 MB");
      expect(formatFileSize(10 * 1024 * 1024)).toBe("10.00 MB");
    });

    it("should handle boundary values", () => {
      expect(formatFileSize(1024 - 1)).toBe("1023 B");
      expect(formatFileSize(1024 * 1024 - 1)).toContain("KB");
    });
  });

  describe("calculateCompressionRatio", () => {
    it("should calculate 50% compression", () => {
      expect(calculateCompressionRatio(1000, 500)).toBe(50);
    });

    it("should calculate 0% compression (same size)", () => {
      expect(calculateCompressionRatio(1000, 1000)).toBe(0);
    });

    it("should calculate negative ratio (size increase)", () => {
      expect(calculateCompressionRatio(1000, 1500)).toBe(-50);
    });

    it("should handle zero original size", () => {
      expect(calculateCompressionRatio(0, 100)).toBe(0);
    });

    it("should handle complete compression (0 bytes result)", () => {
      expect(calculateCompressionRatio(1000, 0)).toBe(100);
    });

    it("should round to integer", () => {
      expect(calculateCompressionRatio(1000, 333)).toBe(67); // 66.7 rounds to 67
      expect(calculateCompressionRatio(1000, 666)).toBe(33); // 33.4 rounds to 33
    });

    it("should handle small compressions", () => {
      expect(calculateCompressionRatio(1000, 999)).toBe(0); // 0.1% rounds to 0
      expect(calculateCompressionRatio(1000, 990)).toBe(1); // 1% rounds to 1
    });
  });
});
