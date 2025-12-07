import { describe, it, expect } from "vitest";
import {
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  createColorInfo,
  parseColor,
  getLuminance,
  getContrastTextColor,
  getContrastRatio,
} from "./color";

describe("Color Picker", () => {
  describe("rgbToHex", () => {
    it("converts RGB to HEX correctly", () => {
      expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
    });

    it("pads single digit hex values", () => {
      expect(rgbToHex(15, 15, 15)).toBe("#0f0f0f");
      expect(rgbToHex(1, 2, 3)).toBe("#010203");
    });

    it("clamps values to 0-255 range", () => {
      expect(rgbToHex(300, -10, 128)).toBe("#ff0080");
    });

    it("rounds decimal values", () => {
      expect(rgbToHex(127.6, 64.4, 32)).toBe("#804020");
    });
  });

  describe("hexToRgb", () => {
    it("converts HEX to RGB correctly", () => {
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("handles HEX without #", () => {
      expect(hexToRgb("ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("expands shorthand HEX", () => {
      expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("abc")).toEqual({ r: 170, g: 187, b: 204 });
    });

    it("handles case-insensitive HEX", () => {
      expect(hexToRgb("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#AbCdEf")).toEqual({ r: 171, g: 205, b: 239 });
    });

    it("returns null for invalid HEX", () => {
      expect(hexToRgb("invalid")).toBeNull();
      expect(hexToRgb("#gggggg")).toBeNull();
      expect(hexToRgb("#12")).toBeNull();
      expect(hexToRgb("#12345")).toBeNull();
    });
  });

  describe("rgbToHsl", () => {
    it("converts RGB to HSL correctly", () => {
      // White
      expect(rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });
      // Black
      expect(rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
      // Red
      expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
      // Green
      expect(rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
      // Blue
      expect(rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
    });

    it("handles gray values", () => {
      expect(rgbToHsl(128, 128, 128)).toEqual({ h: 0, s: 0, l: 50 });
    });
  });

  describe("hslToRgb", () => {
    it("converts HSL to RGB correctly", () => {
      // White
      expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
      // Black
      expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
      // Red
      expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
      // Green
      expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
      // Blue
      expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
    });

    it("handles various hue values", () => {
      // Yellow (60°)
      expect(hslToRgb(60, 100, 50)).toEqual({ r: 255, g: 255, b: 0 });
      // Cyan (180°)
      expect(hslToRgb(180, 100, 50)).toEqual({ r: 0, g: 255, b: 255 });
      // Magenta (300°)
      expect(hslToRgb(300, 100, 50)).toEqual({ r: 255, g: 0, b: 255 });
    });
  });

  describe("hexToHsl", () => {
    it("converts HEX to HSL correctly", () => {
      expect(hexToHsl("#ff0000")).toEqual({ h: 0, s: 100, l: 50 });
      expect(hexToHsl("#00ff00")).toEqual({ h: 120, s: 100, l: 50 });
    });

    it("returns null for invalid HEX", () => {
      expect(hexToHsl("invalid")).toBeNull();
    });
  });

  describe("hslToHex", () => {
    it("converts HSL to HEX correctly", () => {
      expect(hslToHex(0, 100, 50)).toBe("#ff0000");
      expect(hslToHex(120, 100, 50)).toBe("#00ff00");
      expect(hslToHex(240, 100, 50)).toBe("#0000ff");
    });
  });

  describe("createColorInfo", () => {
    it("creates complete color info object", () => {
      const info = createColorInfo(255, 128, 64);
      expect(info.hex).toBe("#ff8040");
      expect(info.rgb).toEqual({ r: 255, g: 128, b: 64 });
      expect(info.hsl).toBeDefined();
      expect(info.hsl.h).toBeGreaterThanOrEqual(0);
      expect(info.hsl.h).toBeLessThanOrEqual(360);
    });
  });

  describe("parseColor", () => {
    it("parses HEX colors", () => {
      const result = parseColor("#ff0000");
      expect(result).not.toBeNull();
      expect(result?.rgb).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("parses HEX without #", () => {
      const result = parseColor("00ff00");
      expect(result).not.toBeNull();
      expect(result?.rgb).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("parses rgb() format", () => {
      const result = parseColor("rgb(255, 128, 64)");
      expect(result).not.toBeNull();
      expect(result?.rgb).toEqual({ r: 255, g: 128, b: 64 });
    });

    it("parses comma-separated RGB", () => {
      const result = parseColor("100, 150, 200");
      expect(result).not.toBeNull();
      expect(result?.rgb).toEqual({ r: 100, g: 150, b: 200 });
    });

    it("parses hsl() format", () => {
      const result = parseColor("hsl(0, 100%, 50%)");
      expect(result).not.toBeNull();
      expect(result?.rgb).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("returns null for invalid input", () => {
      expect(parseColor("invalid")).toBeNull();
      expect(parseColor("rgb(300, 0, 0)")).toBeNull();
    });
  });

  describe("getLuminance", () => {
    it("calculates luminance correctly", () => {
      // White has highest luminance
      expect(getLuminance(255, 255, 255)).toBeCloseTo(1, 2);
      // Black has lowest luminance
      expect(getLuminance(0, 0, 0)).toBe(0);
      // Pure red
      expect(getLuminance(255, 0, 0)).toBeCloseTo(0.2126, 2);
      // Pure green
      expect(getLuminance(0, 255, 0)).toBeCloseTo(0.7152, 2);
      // Pure blue
      expect(getLuminance(0, 0, 255)).toBeCloseTo(0.0722, 2);
    });
  });

  describe("getContrastTextColor", () => {
    it('returns "dark" for light backgrounds', () => {
      expect(getContrastTextColor("#ffffff")).toBe("dark");
      expect(getContrastTextColor("#ffff00")).toBe("dark");
      expect(getContrastTextColor("#cccccc")).toBe("dark");
    });

    it('returns "light" for dark backgrounds', () => {
      expect(getContrastTextColor("#000000")).toBe("light");
      expect(getContrastTextColor("#333333")).toBe("light");
      expect(getContrastTextColor("#0000ff")).toBe("light");
    });

    it('returns "dark" for invalid HEX', () => {
      expect(getContrastTextColor("invalid")).toBe("dark");
    });
  });

  describe("getContrastRatio", () => {
    it("calculates contrast ratio between white and black", () => {
      const ratio = getContrastRatio("#ffffff", "#000000");
      expect(ratio).toBeCloseTo(21, 0);
    });

    it("calculates contrast ratio between same colors", () => {
      const ratio = getContrastRatio("#808080", "#808080");
      expect(ratio).toBeCloseTo(1, 1);
    });

    it("returns null for invalid colors", () => {
      expect(getContrastRatio("invalid", "#000000")).toBeNull();
      expect(getContrastRatio("#ffffff", "invalid")).toBeNull();
    });

    it("calculates meaningful contrast ratios", () => {
      // WCAG AA requires 4.5:1 for normal text
      const ratio = getContrastRatio("#ffffff", "#767676");
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});
