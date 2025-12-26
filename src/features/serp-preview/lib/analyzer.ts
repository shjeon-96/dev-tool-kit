import type { SerpData, SerpAnalysis, DeviceType } from "./types";
import { LIMITS } from "./types";

// Average character width estimation for Google SERP fonts
const CHAR_WIDTHS: Record<string, number> = {
  // Narrow characters
  i: 4,
  l: 4,
  t: 5,
  f: 5,
  r: 5,
  j: 5,
  " ": 4,
  ".": 4,
  ",": 4,
  "'": 3,
  "!": 4,
  "|": 4,
  "-": 5,
  // Medium characters
  a: 8,
  b: 8,
  c: 8,
  d: 8,
  e: 8,
  g: 8,
  h: 8,
  k: 8,
  n: 8,
  o: 8,
  p: 8,
  q: 8,
  s: 7,
  u: 8,
  v: 7,
  x: 7,
  y: 7,
  z: 7,
  // Wide characters
  m: 12,
  w: 11,
  // Uppercase (wider)
  A: 10,
  B: 9,
  C: 10,
  D: 10,
  E: 9,
  F: 8,
  G: 10,
  H: 10,
  I: 5,
  J: 7,
  K: 9,
  L: 8,
  M: 12,
  N: 10,
  O: 11,
  P: 9,
  Q: 11,
  R: 9,
  S: 9,
  T: 9,
  U: 10,
  V: 10,
  W: 14,
  X: 9,
  Y: 9,
  Z: 9,
  // Numbers
  "0": 8,
  "1": 6,
  "2": 8,
  "3": 8,
  "4": 8,
  "5": 8,
  "6": 8,
  "7": 8,
  "8": 8,
  "9": 8,
};

const DEFAULT_CHAR_WIDTH = 8;

export function estimatePixelWidth(text: string): number {
  let width = 0;
  for (const char of text) {
    width += CHAR_WIDTHS[char] ?? DEFAULT_CHAR_WIDTH;
  }
  return width;
}

export function analyzeSerpData(
  data: SerpData,
  device: DeviceType = "desktop",
): SerpAnalysis {
  const titlePixels = estimatePixelWidth(data.title);
  const descPixels = estimatePixelWidth(data.description);

  const titleMaxPixels =
    device === "desktop"
      ? LIMITS.TITLE.MAX_PIXELS_DESKTOP
      : LIMITS.TITLE.MAX_PIXELS_MOBILE;

  const descMaxPixels =
    device === "desktop"
      ? LIMITS.DESCRIPTION.MAX_PIXELS_DESKTOP
      : LIMITS.DESCRIPTION.MAX_PIXELS_MOBILE;

  // Title analysis
  let titleStatus: "optimal" | "short" | "long" = "optimal";
  let titleMessage = "타이틀 길이가 적절합니다";

  if (data.title.length < LIMITS.TITLE.MIN_CHARS) {
    titleStatus = "short";
    titleMessage = `타이틀이 너무 짧습니다 (${LIMITS.TITLE.MIN_CHARS}자 이상 권장)`;
  } else if (
    data.title.length > LIMITS.TITLE.MAX_CHARS ||
    titlePixels > titleMaxPixels
  ) {
    titleStatus = "long";
    titleMessage = "타이틀이 잘릴 수 있습니다";
  }

  // Description analysis
  let descStatus: "optimal" | "short" | "long" = "optimal";
  let descMessage = "설명 길이가 적절합니다";

  if (data.description.length < LIMITS.DESCRIPTION.MIN_CHARS) {
    descStatus = "short";
    descMessage = `설명이 너무 짧습니다 (${LIMITS.DESCRIPTION.MIN_CHARS}자 이상 권장)`;
  } else if (
    data.description.length > LIMITS.DESCRIPTION.MAX_CHARS ||
    descPixels > descMaxPixels
  ) {
    descStatus = "long";
    descMessage = "설명이 잘릴 수 있습니다";
  }

  // URL analysis
  const displayUrl = formatDisplayUrl(data.url);
  const isValidUrl = isValidUrlFormat(data.url);

  return {
    title: {
      length: data.title.length,
      pixelWidth: titlePixels,
      status: titleStatus,
      message: titleMessage,
    },
    description: {
      length: data.description.length,
      pixelWidth: descPixels,
      status: descStatus,
      message: descMessage,
    },
    url: {
      length: data.url.length,
      isValid: isValidUrl,
      displayUrl,
    },
  };
}

export function formatDisplayUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname === "/" ? "" : parsed.pathname;
    return `${parsed.hostname}${path}`;
  } catch {
    return url;
  }
}

function isValidUrlFormat(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function truncateText(text: string, maxPixels: number): string {
  let width = 0;
  let result = "";

  for (const char of text) {
    const charWidth = CHAR_WIDTHS[char] ?? DEFAULT_CHAR_WIDTH;
    if (width + charWidth > maxPixels - 20) {
      // Reserve space for "..."
      return result + "...";
    }
    width += charWidth;
    result += char;
  }

  return result;
}

export function getStatusColor(status: "optimal" | "short" | "long"): string {
  switch (status) {
    case "optimal":
      return "text-success";
    case "short":
      return "text-warning";
    case "long":
      return "text-destructive";
  }
}

export function getStatusBadgeVariant(
  status: "optimal" | "short" | "long",
): "default" | "outline" | "destructive" {
  switch (status) {
    case "optimal":
      return "default";
    case "short":
      return "outline";
    case "long":
      return "destructive";
  }
}
