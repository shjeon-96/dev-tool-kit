/**
 * URL encoder/decoder pure functions
 * Handles URL encoding and decoding operations
 */

export type EncodingMode = "encodeURIComponent" | "encodeURI";

export interface EncodeResult {
  output: string;
  error: string | null;
}

/**
 * Encodes a string using the specified encoding mode
 * @param input - The string to encode
 * @param mode - The encoding mode ("encodeURIComponent" or "encodeURI")
 * @returns EncodeResult with output or error
 */
export function encodeUrl(input: string, mode: EncodingMode): EncodeResult {
  if (!input.trim()) {
    return { output: "", error: null };
  }

  try {
    const output =
      mode === "encodeURIComponent"
        ? encodeURIComponent(input)
        : encodeURI(input);
    return { output, error: null };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "인코딩 실패",
    };
  }
}

/**
 * Decodes a URL-encoded string using the specified mode
 * @param input - The encoded string to decode
 * @param mode - The decoding mode ("encodeURIComponent" or "encodeURI")
 * @returns EncodeResult with output or error
 */
export function decodeUrl(input: string, mode: EncodingMode): EncodeResult {
  if (!input.trim()) {
    return { output: "", error: null };
  }

  try {
    const output =
      mode === "encodeURIComponent"
        ? decodeURIComponent(input)
        : decodeURI(input);
    return { output, error: null };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "디코딩 실패",
    };
  }
}

/**
 * Processes input based on encoding/decoding direction
 * @param input - The input string
 * @param mode - The encoding mode
 * @param isEncoding - true for encoding, false for decoding
 * @returns EncodeResult with output or error
 */
export function processUrlEncoding(
  input: string,
  mode: EncodingMode,
  isEncoding: boolean,
): EncodeResult {
  return isEncoding ? encodeUrl(input, mode) : decodeUrl(input, mode);
}

/**
 * Checks if a string is URL encoded
 * @param input - The string to check
 * @returns true if the string appears to be URL encoded
 */
export function isUrlEncoded(input: string): boolean {
  if (!input) return false;

  // Check for percent-encoded characters
  const percentPattern = /%[0-9A-Fa-f]{2}/;
  if (!percentPattern.test(input)) return false;

  // Try to decode - if it succeeds and differs from input, it's encoded
  try {
    const decoded = decodeURIComponent(input);
    return decoded !== input;
  } catch {
    // Malformed encoding
    return false;
  }
}

/**
 * Gets the difference between encodeURI and encodeURIComponent
 * Useful for educational purposes
 */
export function getEncodingDifference(): {
  encodeURIComponent: string[];
  encodeURI: string[];
} {
  return {
    encodeURIComponent: [
      "모든 특수문자 인코딩",
      "쿼리 파라미터 값에 적합",
      "/ ? & = 등도 인코딩",
    ],
    encodeURI: [
      "URL 구조 문자는 유지",
      "전체 URL 인코딩에 적합",
      "/ ? & = 등은 유지",
    ],
  };
}

/**
 * Common URL-unsafe characters that need encoding
 */
export const URL_UNSAFE_CHARS = [
  { char: " ", encoded: "%20", name: "공백" },
  { char: "!", encoded: "%21", name: "느낌표" },
  { char: "#", encoded: "%23", name: "해시" },
  { char: "$", encoded: "%24", name: "달러" },
  { char: "&", encoded: "%26", name: "앰퍼샌드" },
  { char: "'", encoded: "%27", name: "작은따옴표" },
  { char: "(", encoded: "%28", name: "왼쪽 괄호" },
  { char: ")", encoded: "%29", name: "오른쪽 괄호" },
  { char: "+", encoded: "%2B", name: "플러스" },
  { char: ",", encoded: "%2C", name: "쉼표" },
  { char: "/", encoded: "%2F", name: "슬래시" },
  { char: ":", encoded: "%3A", name: "콜론" },
  { char: ";", encoded: "%3B", name: "세미콜론" },
  { char: "=", encoded: "%3D", name: "등호" },
  { char: "?", encoded: "%3F", name: "물음표" },
  { char: "@", encoded: "%40", name: "앳" },
];
