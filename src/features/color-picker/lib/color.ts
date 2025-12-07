/**
 * Color utility pure functions
 * Handles color conversions between RGB, HEX, and HSL formats
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorInfo {
  hex: string;
  rgb: RGB;
  hsl: HSL;
}

/**
 * Converts RGB values to HEX color string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HEX color string (e.g., "#FF5733")
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number): string => {
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    return clamped.toString(16).padStart(2, "0");
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

/**
 * Converts HEX color string to RGB values
 * @param hex - HEX color string (with or without #)
 * @returns RGB object or null if invalid
 */
export function hexToRgb(hex: string): RGB | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, "");

  // Validate hex format
  if (
    !/^[0-9A-Fa-f]{6}$/.test(cleanHex) &&
    !/^[0-9A-Fa-f]{3}$/.test(cleanHex)
  ) {
    return null;
  }

  // Expand shorthand form (e.g., "03F" -> "0033FF")
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Converts RGB values to HSL
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HSL object with h (0-360), s (0-100), l (0-100)
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  // Normalize RGB values to 0-1
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL to RGB values
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns RGB object
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rTemp = 0;
  let gTemp = 0;
  let bTemp = 0;

  if (h >= 0 && h < 60) {
    rTemp = c;
    gTemp = x;
    bTemp = 0;
  } else if (h >= 60 && h < 120) {
    rTemp = x;
    gTemp = c;
    bTemp = 0;
  } else if (h >= 120 && h < 180) {
    rTemp = 0;
    gTemp = c;
    bTemp = x;
  } else if (h >= 180 && h < 240) {
    rTemp = 0;
    gTemp = x;
    bTemp = c;
  } else if (h >= 240 && h < 300) {
    rTemp = x;
    gTemp = 0;
    bTemp = c;
  } else {
    rTemp = c;
    gTemp = 0;
    bTemp = x;
  }

  return {
    r: Math.round((rTemp + m) * 255),
    g: Math.round((gTemp + m) * 255),
    b: Math.round((bTemp + m) * 255),
  };
}

/**
 * Converts HEX to HSL
 * @param hex - HEX color string
 * @returns HSL object or null if invalid
 */
export function hexToHsl(hex: string): HSL | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Converts HSL to HEX
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns HEX color string
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Creates a complete ColorInfo object from RGB values
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns ColorInfo object
 */
export function createColorInfo(r: number, g: number, b: number): ColorInfo {
  return {
    hex: rgbToHex(r, g, b),
    rgb: { r, g, b },
    hsl: rgbToHsl(r, g, b),
  };
}

/**
 * Parses any color format to ColorInfo
 * @param color - Color string (HEX, rgb(), hsl())
 * @returns ColorInfo or null if invalid
 */
export function parseColor(color: string): ColorInfo | null {
  const trimmed = color.trim();

  // HEX format
  if (trimmed.startsWith("#") || /^[0-9A-Fa-f]{3,6}$/.test(trimmed)) {
    const rgb = hexToRgb(trimmed);
    if (!rgb) return null;
    return createColorInfo(rgb.r, rgb.g, rgb.b);
  }

  // RGB format: rgb(255, 128, 64) or 255, 128, 64
  const rgbMatch = trimmed.match(
    /^(?:rgb\s*\(\s*)?(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)?$/i,
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    if (r <= 255 && g <= 255 && b <= 255) {
      return createColorInfo(r, g, b);
    }
  }

  // HSL format: hsl(360, 100%, 50%)
  const hslMatch = trimmed.match(
    /^hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*\)$/i,
  );
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseInt(hslMatch[2], 10);
    const l = parseInt(hslMatch[3], 10);
    if (h <= 360 && s <= 100 && l <= 100) {
      const rgb = hslToRgb(h, s, l);
      return createColorInfo(rgb.r, rgb.g, rgb.b);
    }
  }

  return null;
}

/**
 * Calculates relative luminance of a color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Luminance value (0-1)
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const srgb = c / 255;
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determines if text should be light or dark based on background color
 * @param bgHex - Background HEX color
 * @returns "light" or "dark"
 */
export function getContrastTextColor(bgHex: string): "light" | "dark" {
  const rgb = hexToRgb(bgHex);
  if (!rgb) return "dark";

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.179 ? "dark" : "light";
}

/**
 * Calculates contrast ratio between two colors (WCAG)
 * @param hex1 - First HEX color
 * @param hex2 - Second HEX color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}
