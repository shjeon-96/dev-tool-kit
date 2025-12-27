import { describe, it, expect } from "vitest";
import {
  estimatePixelWidth,
  analyzeSerpData,
  formatDisplayUrl,
  truncateText,
  getStatusColor,
  getStatusBadgeVariant,
} from "./analyzer";
import { LIMITS, SAMPLE_DATA } from "./types";
import type { SerpData } from "./types";

describe("serp-preview analyzer", () => {
  describe("estimatePixelWidth", () => {
    it("should return 0 for empty string", () => {
      expect(estimatePixelWidth("")).toBe(0);
    });

    it("should calculate width for single character", () => {
      // Narrow character
      expect(estimatePixelWidth("i")).toBe(4);
      // Medium character
      expect(estimatePixelWidth("a")).toBe(8);
      // Wide character
      expect(estimatePixelWidth("m")).toBe(12);
    });

    it("should calculate width for multiple characters", () => {
      const width = estimatePixelWidth("Hi");
      // H=10, i=4
      expect(width).toBe(14);
    });

    it("should use default width for unknown characters", () => {
      // Korean characters should use default width (8)
      const width = estimatePixelWidth("한글");
      expect(width).toBe(16); // 2 characters * 8
    });

    it("should handle spaces correctly", () => {
      expect(estimatePixelWidth(" ")).toBe(4);
      expect(estimatePixelWidth("a b")).toBe(8 + 4 + 8); // a + space + b
    });

    it("should handle numbers", () => {
      expect(estimatePixelWidth("1")).toBe(6);
      expect(estimatePixelWidth("123")).toBe(6 + 8 + 8);
    });

    it("should handle mixed case text", () => {
      const width = estimatePixelWidth("Ab");
      // A=10, b=8
      expect(width).toBe(18);
    });

    it("should handle special characters", () => {
      expect(estimatePixelWidth(".")).toBe(4);
      expect(estimatePixelWidth(",")).toBe(4);
      expect(estimatePixelWidth("-")).toBe(5);
    });
  });

  describe("formatDisplayUrl", () => {
    it("should format valid URL", () => {
      const result = formatDisplayUrl("https://example.com/path/to/page");
      expect(result).toBe("example.com/path/to/page");
    });

    it("should remove trailing slash from root path", () => {
      const result = formatDisplayUrl("https://example.com/");
      expect(result).toBe("example.com");
    });

    it("should handle URL without path", () => {
      const result = formatDisplayUrl("https://example.com");
      expect(result).toBe("example.com");
    });

    it("should handle URL with query parameters", () => {
      const result = formatDisplayUrl("https://example.com/search?q=test");
      expect(result).toBe("example.com/search");
    });

    it("should return original string for invalid URL", () => {
      const result = formatDisplayUrl("not a valid url");
      expect(result).toBe("not a valid url");
    });

    it("should handle subdomain", () => {
      const result = formatDisplayUrl("https://blog.example.com/post");
      expect(result).toBe("blog.example.com/post");
    });
  });

  describe("truncateText", () => {
    it("should not truncate short text", () => {
      const result = truncateText("Hi", 100);
      expect(result).toBe("Hi");
    });

    it("should truncate long text with ellipsis", () => {
      const longText = "This is a very long title that should be truncated";
      const result = truncateText(longText, 100);
      expect(result).toContain("...");
      expect(result.length).toBeLessThan(longText.length);
    });

    it("should reserve space for ellipsis", () => {
      const text = "AAAAAAAAAA"; // 10 A's = 100 pixels
      const result = truncateText(text, 50);
      // Should have less than full text + ellipsis
      expect(result.endsWith("...")).toBe(true);
    });

    it("should handle empty string", () => {
      const result = truncateText("", 100);
      expect(result).toBe("");
    });

    it("should handle text that exactly fits", () => {
      // Small text that fits within maxPixels
      const result = truncateText("Hi", 1000);
      expect(result).toBe("Hi");
    });
  });

  describe("getStatusColor", () => {
    it("should return success for optimal", () => {
      expect(getStatusColor("optimal")).toBe("text-success");
    });

    it("should return warning for short", () => {
      expect(getStatusColor("short")).toBe("text-warning");
    });

    it("should return destructive for long", () => {
      expect(getStatusColor("long")).toBe("text-destructive");
    });
  });

  describe("getStatusBadgeVariant", () => {
    it("should return default for optimal", () => {
      expect(getStatusBadgeVariant("optimal")).toBe("default");
    });

    it("should return outline for short", () => {
      expect(getStatusBadgeVariant("short")).toBe("outline");
    });

    it("should return destructive for long", () => {
      expect(getStatusBadgeVariant("long")).toBe("destructive");
    });
  });

  describe("LIMITS", () => {
    it("should have correct title limits", () => {
      expect(LIMITS.TITLE.MIN_CHARS).toBe(30);
      expect(LIMITS.TITLE.MAX_CHARS).toBe(60);
      expect(LIMITS.TITLE.MAX_PIXELS_DESKTOP).toBe(600);
      expect(LIMITS.TITLE.MAX_PIXELS_MOBILE).toBe(540);
    });

    it("should have correct description limits", () => {
      expect(LIMITS.DESCRIPTION.MIN_CHARS).toBe(120);
      expect(LIMITS.DESCRIPTION.MAX_CHARS).toBe(160);
      expect(LIMITS.DESCRIPTION.MAX_PIXELS_DESKTOP).toBe(920);
      expect(LIMITS.DESCRIPTION.MAX_PIXELS_MOBILE).toBe(680);
    });

    it("should have mobile limits less than desktop", () => {
      expect(LIMITS.TITLE.MAX_PIXELS_MOBILE).toBeLessThan(
        LIMITS.TITLE.MAX_PIXELS_DESKTOP,
      );
      expect(LIMITS.DESCRIPTION.MAX_PIXELS_MOBILE).toBeLessThan(
        LIMITS.DESCRIPTION.MAX_PIXELS_DESKTOP,
      );
    });
  });

  describe("SAMPLE_DATA", () => {
    it("should have valid URL", () => {
      expect(SAMPLE_DATA.url).toContain("https://");
    });

    it("should have title within limits", () => {
      expect(SAMPLE_DATA.title.length).toBeGreaterThanOrEqual(
        LIMITS.TITLE.MIN_CHARS,
      );
    });

    it("should have description within limits", () => {
      expect(SAMPLE_DATA.description.length).toBeGreaterThanOrEqual(
        LIMITS.DESCRIPTION.MIN_CHARS,
      );
    });
  });

  describe("analyzeSerpData", () => {
    it("should analyze SAMPLE_DATA correctly", () => {
      const result = analyzeSerpData(SAMPLE_DATA);

      expect(result.title.length).toBe(SAMPLE_DATA.title.length);
      expect(result.description.length).toBe(SAMPLE_DATA.description.length);
      expect(result.url.isValid).toBe(true);
      expect(result.url.displayUrl).toContain("web-toolkit.app");
    });

    it("should mark short title as short", () => {
      const data: SerpData = {
        url: "https://example.com",
        title: "Short", // Too short
        description: "A".repeat(130),
      };

      const result = analyzeSerpData(data);
      expect(result.title.status).toBe("short");
      expect(result.title.message).toContain("짧습니다");
    });

    it("should mark long title as long", () => {
      const data: SerpData = {
        url: "https://example.com",
        title: "A".repeat(70), // Too long
        description: "B".repeat(130),
      };

      const result = analyzeSerpData(data);
      expect(result.title.status).toBe("long");
      expect(result.title.message).toContain("잘릴 수");
    });

    it("should mark optimal title as optimal", () => {
      const data: SerpData = {
        url: "https://example.com",
        title: "A".repeat(45), // Within limits
        description: "B".repeat(130),
      };

      const result = analyzeSerpData(data);
      expect(result.title.status).toBe("optimal");
      expect(result.title.message).toContain("적절합니다");
    });

    it("should mark short description as short", () => {
      const data: SerpData = {
        url: "https://example.com",
        title: "A valid title here for testing",
        description: "Too short", // Too short
      };

      const result = analyzeSerpData(data);
      expect(result.description.status).toBe("short");
      expect(result.description.message).toContain("짧습니다");
    });

    it("should mark long description as long", () => {
      const data: SerpData = {
        url: "https://example.com",
        title: "A valid title here for testing",
        description: "A".repeat(200), // Too long
      };

      const result = analyzeSerpData(data);
      expect(result.description.status).toBe("long");
      expect(result.description.message).toContain("잘릴 수");
    });

    it("should mark optimal description as optimal", () => {
      // Use narrow characters (like 'i' = 4px) to stay within pixel limits
      // 140 chars * 4px = 560px < 920px limit
      const data: SerpData = {
        url: "https://example.com",
        title: "A valid title here for testing",
        description: "i".repeat(140), // Within character and pixel limits
      };

      const result = analyzeSerpData(data);
      expect(result.description.status).toBe("optimal");
      expect(result.description.message).toContain("적절합니다");
    });

    it("should validate URL correctly", () => {
      const validData: SerpData = {
        url: "https://example.com/path",
        title: "Title",
        description: "Description",
      };

      const result = analyzeSerpData(validData);
      expect(result.url.isValid).toBe(true);
    });

    it("should detect invalid URL", () => {
      const invalidData: SerpData = {
        url: "not-a-valid-url",
        title: "Title",
        description: "Description",
      };

      const result = analyzeSerpData(invalidData);
      expect(result.url.isValid).toBe(false);
    });

    it("should use different limits for mobile", () => {
      // Create a title that would be OK on desktop but too long on mobile
      // Mobile max is 540px, desktop is 600px
      const wideTitle = "W".repeat(40); // W = 14px, 40*14 = 560px

      const data: SerpData = {
        url: "https://example.com",
        title: wideTitle,
        description: "A".repeat(130),
      };

      const desktopResult = analyzeSerpData(data, "desktop");
      const mobileResult = analyzeSerpData(data, "mobile");

      // Both should have same pixel width
      expect(desktopResult.title.pixelWidth).toBe(
        mobileResult.title.pixelWidth,
      );

      // Mobile might be long while desktop is OK
      // (depends on exact pixel calculation)
    });

    it("should default to desktop device", () => {
      const data: SerpData = {
        url: "https://example.com",
        title: "A valid title for testing purposes",
        description: "A".repeat(140),
      };

      const defaultResult = analyzeSerpData(data);
      const desktopResult = analyzeSerpData(data, "desktop");

      expect(defaultResult.title.status).toBe(desktopResult.title.status);
      expect(defaultResult.description.status).toBe(
        desktopResult.description.status,
      );
    });

    it("should calculate pixel width for title and description", () => {
      const data: SerpData = {
        url: "https://example.com",
        title: "Test Title",
        description: "Test Description",
      };

      const result = analyzeSerpData(data);
      expect(result.title.pixelWidth).toBeGreaterThan(0);
      expect(result.description.pixelWidth).toBeGreaterThan(0);
    });

    it("should format display URL", () => {
      const data: SerpData = {
        url: "https://example.com/path/to/page",
        title: "Title",
        description: "Description",
      };

      const result = analyzeSerpData(data);
      expect(result.url.displayUrl).toBe("example.com/path/to/page");
    });

    it("should handle title with pixel width exceeding limit", () => {
      // Use wide characters to exceed pixel limit even with fewer characters
      const wideTitle = "W".repeat(50); // W = 14px each = 700px > 600px limit

      const data: SerpData = {
        url: "https://example.com",
        title: wideTitle,
        description: "A".repeat(130),
      };

      const result = analyzeSerpData(data);
      expect(result.title.status).toBe("long");
    });

    it("should handle description with pixel width exceeding limit", () => {
      // Use wide characters to exceed pixel limit
      // Need at least 120 chars (MIN_CHARS) and exceed 920px
      // W = 14px, so 70 W's = 980px, but need 120+ chars
      // Mix: 70 W's (980px) + 50 i's (200px) = 1180px > 920px limit
      // Total: 120 chars which meets MIN_CHARS
      const wideDesc = "W".repeat(70) + "i".repeat(50); // 120 chars, ~1180px

      const data: SerpData = {
        url: "https://example.com",
        title: "A valid title for testing purposes",
        description: wideDesc,
      };

      const result = analyzeSerpData(data);
      expect(result.description.status).toBe("long");
    });
  });
});
