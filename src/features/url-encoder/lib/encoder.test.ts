import { describe, it, expect } from "vitest";
import {
  encodeUrl,
  decodeUrl,
  processUrlEncoding,
  isUrlEncoded,
  getEncodingDifference,
  URL_UNSAFE_CHARS,
} from "./encoder";

describe("URL Encoder", () => {
  describe("encodeUrl", () => {
    it("returns empty output for empty input", () => {
      const result = encodeUrl("", "encodeURIComponent");
      expect(result.output).toBe("");
      expect(result.error).toBeNull();
    });

    it("encodes with encodeURIComponent", () => {
      const result = encodeUrl("Hello World!", "encodeURIComponent");
      expect(result.output).toBe("Hello%20World!");
      expect(result.error).toBeNull();
    });

    it("encodes with encodeURI", () => {
      const result = encodeUrl(
        "https://example.com/path?q=hello world",
        "encodeURI",
      );
      expect(result.output).toBe("https://example.com/path?q=hello%20world");
      expect(result.error).toBeNull();
    });

    it("encodes Korean characters", () => {
      const result = encodeUrl("안녕하세요", "encodeURIComponent");
      expect(result.output).toBe(
        "%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94",
      );
      expect(result.error).toBeNull();
    });

    it("encodes emojis", () => {
      const result = encodeUrl("🌍", "encodeURIComponent");
      expect(result.output).toBe("%F0%9F%8C%8D");
      expect(result.error).toBeNull();
    });

    it("encodes special characters with encodeURIComponent", () => {
      const result = encodeUrl("a=b&c=d", "encodeURIComponent");
      expect(result.output).toBe("a%3Db%26c%3Dd");
    });

    it("preserves special characters with encodeURI", () => {
      const result = encodeUrl("a=b&c=d", "encodeURI");
      expect(result.output).toBe("a=b&c=d");
    });
  });

  describe("decodeUrl", () => {
    it("returns empty output for empty input", () => {
      const result = decodeUrl("", "encodeURIComponent");
      expect(result.output).toBe("");
      expect(result.error).toBeNull();
    });

    it("decodes with decodeURIComponent", () => {
      const result = decodeUrl("Hello%20World!", "encodeURIComponent");
      expect(result.output).toBe("Hello World!");
      expect(result.error).toBeNull();
    });

    it("decodes Korean characters", () => {
      const result = decodeUrl(
        "%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94",
        "encodeURIComponent",
      );
      expect(result.output).toBe("안녕하세요");
      expect(result.error).toBeNull();
    });

    it("decodes emojis", () => {
      const result = decodeUrl("%F0%9F%8C%8D", "encodeURIComponent");
      expect(result.output).toBe("🌍");
      expect(result.error).toBeNull();
    });

    it("returns error for malformed encoding", () => {
      const result = decodeUrl("%E0%A4%A", "encodeURIComponent");
      expect(result.output).toBe("");
      expect(result.error).not.toBeNull();
    });

    it("decodes URL with decodeURI", () => {
      const result = decodeUrl(
        "https://example.com/path?q=hello%20world",
        "encodeURI",
      );
      expect(result.output).toBe("https://example.com/path?q=hello world");
    });
  });

  describe("processUrlEncoding", () => {
    it("encodes when isEncoding is true", () => {
      const result = processUrlEncoding(
        "Hello World",
        "encodeURIComponent",
        true,
      );
      expect(result.output).toBe("Hello%20World");
    });

    it("decodes when isEncoding is false", () => {
      const result = processUrlEncoding(
        "Hello%20World",
        "encodeURIComponent",
        false,
      );
      expect(result.output).toBe("Hello World");
    });
  });

  describe("isUrlEncoded", () => {
    it("returns false for empty string", () => {
      expect(isUrlEncoded("")).toBe(false);
    });

    it("returns true for encoded string", () => {
      expect(isUrlEncoded("Hello%20World")).toBe(true);
      expect(isUrlEncoded("%EC%95%88%EB%85%95")).toBe(true);
    });

    it("returns false for non-encoded string", () => {
      expect(isUrlEncoded("Hello World")).toBe(false);
      expect(isUrlEncoded("plain text")).toBe(false);
    });

    it("returns false for string with % but not percent-encoded", () => {
      expect(isUrlEncoded("100%")).toBe(false);
      expect(isUrlEncoded("50% off")).toBe(false);
    });

    it("returns false for malformed percent encoding", () => {
      expect(isUrlEncoded("%GG")).toBe(false);
    });
  });

  describe("getEncodingDifference", () => {
    it("returns differences between encoding modes", () => {
      const diff = getEncodingDifference();
      expect(diff.encodeURIComponent).toHaveLength(3);
      expect(diff.encodeURI).toHaveLength(3);
    });
  });

  describe("URL_UNSAFE_CHARS", () => {
    it("contains common unsafe characters", () => {
      const chars = URL_UNSAFE_CHARS.map((c) => c.char);
      expect(chars).toContain(" ");
      expect(chars).toContain("&");
      expect(chars).toContain("=");
      expect(chars).toContain("?");
    });

    it("has correct encodings", () => {
      const space = URL_UNSAFE_CHARS.find((c) => c.char === " ");
      expect(space?.encoded).toBe("%20");

      const ampersand = URL_UNSAFE_CHARS.find((c) => c.char === "&");
      expect(ampersand?.encoded).toBe("%26");
    });
  });
});
