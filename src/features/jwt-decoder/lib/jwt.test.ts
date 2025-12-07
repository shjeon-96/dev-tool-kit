import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  isValidJwtFormat,
  base64UrlDecode,
  decodeJwt,
  getTimeRemaining,
  formatTimestamp,
  getCommonClaims,
  getAlgorithmInfo,
} from "./jwt";

describe("JWT Decoder", () => {
  describe("isValidJwtFormat", () => {
    it("returns false for empty input", () => {
      expect(isValidJwtFormat("")).toBe(false);
      expect(isValidJwtFormat(null as unknown as string)).toBe(false);
      expect(isValidJwtFormat(undefined as unknown as string)).toBe(false);
    });

    it("returns false for invalid format", () => {
      expect(isValidJwtFormat("invalid")).toBe(false);
      expect(isValidJwtFormat("one.two")).toBe(false);
      expect(isValidJwtFormat("one.two.three.four")).toBe(false);
    });

    it("returns true for valid format", () => {
      expect(isValidJwtFormat("header.payload.signature")).toBe(true);
      expect(isValidJwtFormat("a.b.c")).toBe(true);
    });

    it("returns false for empty parts", () => {
      expect(isValidJwtFormat("..")).toBe(false);
      expect(isValidJwtFormat("a..c")).toBe(false);
      expect(isValidJwtFormat(".b.c")).toBe(false);
    });
  });

  describe("base64UrlDecode", () => {
    it("decodes standard base64url", () => {
      // "Hello" in base64url
      expect(base64UrlDecode("SGVsbG8")).toBe("Hello");
    });

    it("handles base64url special characters", () => {
      // Base64url uses - instead of + and _ instead of /
      const encoded = "PDw_Pz4-"; // <<??>> in base64url
      expect(base64UrlDecode(encoded)).toBe("<<??>>");
    });

    it("adds padding correctly", () => {
      // "Hi" needs padding
      expect(base64UrlDecode("SGk")).toBe("Hi");
    });

    it("throws error for invalid base64", () => {
      expect(() => base64UrlDecode("!!!")).toThrow();
    });
  });

  describe("decodeJwt", () => {
    // Valid JWT for testing (header: {"alg":"HS256","typ":"JWT"}, payload: {"sub":"1234567890","name":"John Doe","iat":1516239022})
    const validJwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    it("returns null for empty input", () => {
      const result = decodeJwt("");
      expect(result.decoded).toBeNull();
      expect(result.error).toBeNull();
    });

    it("returns error for invalid format", () => {
      const result = decodeJwt("invalid");
      expect(result.decoded).toBeNull();
      expect(result.error).toBe("Invalid JWT format: must have 3 parts");
    });

    it("decodes valid JWT correctly", () => {
      const result = decodeJwt(validJwt);
      expect(result.error).toBeNull();
      expect(result.decoded).not.toBeNull();
      expect(result.decoded?.header.alg).toBe("HS256");
      expect(result.decoded?.header.typ).toBe("JWT");
      expect(result.decoded?.payload.sub).toBe("1234567890");
      expect(result.decoded?.payload.name).toBe("John Doe");
    });

    it("extracts iat timestamp", () => {
      const result = decodeJwt(validJwt);
      expect(result.decoded?.issuedAt).toEqual(new Date(1516239022 * 1000));
    });

    it("handles token without exp", () => {
      const result = decodeJwt(validJwt);
      expect(result.decoded?.expiresAt).toBeNull();
      expect(result.decoded?.isExpired).toBe(false);
    });

    it("returns error for malformed base64", () => {
      const result = decodeJwt("!!!.???.$$$");
      expect(result.decoded).toBeNull();
      expect(result.error).not.toBeNull();
    });
  });

  describe("getTimeRemaining", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("returns null for null input", () => {
      expect(getTimeRemaining(null)).toBeNull();
    });

    it('returns "Expired" for past date', () => {
      const pastDate = new Date(Date.now() - 1000);
      expect(getTimeRemaining(pastDate)).toBe("Expired");
    });

    it("returns formatted time for future date", () => {
      vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
      const futureDate = new Date("2024-01-01T01:30:45Z");
      expect(getTimeRemaining(futureDate)).toBe("01:30:45");
    });

    it("includes days for long duration", () => {
      vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
      const futureDate = new Date("2024-01-03T12:30:00Z");
      expect(getTimeRemaining(futureDate)).toBe("2d 12h 30m");
    });
  });

  describe("formatTimestamp", () => {
    it('returns "-" for null', () => {
      expect(formatTimestamp(null)).toBe("-");
    });

    it("formats date correctly", () => {
      const date = new Date("2024-03-15T14:30:45");
      const result = formatTimestamp(date);
      expect(result).toMatch(/2024/);
      expect(result).toMatch(/03/);
      expect(result).toMatch(/15/);
    });
  });

  describe("getCommonClaims", () => {
    it("returns all common JWT claims", () => {
      const claims = getCommonClaims();
      expect(claims).toHaveLength(7);

      const claimNames = claims.map((c) => c.claim);
      expect(claimNames).toContain("iss");
      expect(claimNames).toContain("sub");
      expect(claimNames).toContain("aud");
      expect(claimNames).toContain("exp");
      expect(claimNames).toContain("nbf");
      expect(claimNames).toContain("iat");
      expect(claimNames).toContain("jti");
    });

    it("includes descriptions in Korean", () => {
      const claims = getCommonClaims();
      const iss = claims.find((c) => c.claim === "iss");
      expect(iss?.description).toBe("토큰 발급자");
    });
  });

  describe("getAlgorithmInfo", () => {
    it("returns info for HS256", () => {
      const info = getAlgorithmInfo("HS256");
      expect(info).not.toBeNull();
      expect(info?.name).toBe("HMAC SHA-256");
      expect(info?.type).toBe("Symmetric");
    });

    it("returns info for RS256", () => {
      const info = getAlgorithmInfo("RS256");
      expect(info).not.toBeNull();
      expect(info?.name).toBe("RSA SHA-256");
      expect(info?.type).toBe("Asymmetric");
    });

    it("returns info for ES256", () => {
      const info = getAlgorithmInfo("ES256");
      expect(info).not.toBeNull();
      expect(info?.type).toBe("Asymmetric");
      expect(info?.description).toBe("타원곡선 알고리즘");
    });

    it('returns info for "none" algorithm', () => {
      const info = getAlgorithmInfo("none");
      expect(info).not.toBeNull();
      expect(info?.type).toBe("None");
    });

    it("returns null for unknown algorithm", () => {
      expect(getAlgorithmInfo("UNKNOWN")).toBeNull();
    });
  });
});
