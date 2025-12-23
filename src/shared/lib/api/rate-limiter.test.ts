import { describe, it, expect, beforeEach } from "vitest";
import {
  checkRateLimits,
  incrementRateLimit,
  getRateLimitHeaders,
  getRateLimitStats,
  clearRateLimitCache,
} from "./rate-limiter";

describe("rate-limiter", () => {
  beforeEach(() => {
    clearRateLimitCache();
  });

  describe("checkRateLimits", () => {
    it("should allow requests within limits", () => {
      const result = checkRateLimits("test-key-1", "pro");

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(60); // requestsPerMinute
      expect(result.remaining).toBeGreaterThanOrEqual(0);
      expect(result.window).toBe("minute");
    });

    it("should deny requests for free tier (no API access)", () => {
      const result = checkRateLimits("test-key-2", "free");

      expect(result.allowed).toBe(false);
      expect(result.limit).toBe(0);
      expect(result.error).toBe("API access requires Pro subscription");
    });

    it("should track remaining requests correctly", () => {
      const apiKeyId = "test-key-3";

      // First check
      const result1 = checkRateLimits(apiKeyId, "pro");
      expect(result1.remaining).toBe(59); // 60 - 1 (current request)

      // Increment counter
      incrementRateLimit(apiKeyId);

      // Second check
      const result2 = checkRateLimits(apiKeyId, "pro");
      expect(result2.remaining).toBe(58); // 60 - 1 (previous) - 1 (current)
    });

    it("should deny when minute limit is exceeded", () => {
      const apiKeyId = "test-key-4";

      // Simulate 60 requests
      for (let i = 0; i < 60; i++) {
        incrementRateLimit(apiKeyId);
      }

      const result = checkRateLimits(apiKeyId, "pro");

      expect(result.allowed).toBe(false);
      expect(result.error).toContain("60 requests per minute");
      expect(result.retryAfter).toBeGreaterThan(0);
      expect(result.window).toBe("minute");
    });
  });

  describe("incrementRateLimit", () => {
    it("should increment counters for all windows", () => {
      const apiKeyId = "test-key-5";

      incrementRateLimit(apiKeyId);
      const stats = getRateLimitStats(apiKeyId, "pro");

      expect(stats.minute.used).toBe(1);
      expect(stats.day.used).toBe(1);
      expect(stats.month.used).toBe(1);
    });

    it("should accumulate increments", () => {
      const apiKeyId = "test-key-6";

      incrementRateLimit(apiKeyId);
      incrementRateLimit(apiKeyId);
      incrementRateLimit(apiKeyId);

      const stats = getRateLimitStats(apiKeyId, "pro");

      expect(stats.minute.used).toBe(3);
      expect(stats.day.used).toBe(3);
      expect(stats.month.used).toBe(3);
    });
  });

  describe("getRateLimitHeaders", () => {
    it("should generate correct headers for allowed request", () => {
      const result = checkRateLimits("test-key-7", "pro");
      const headers = getRateLimitHeaders(result);

      expect(headers["X-RateLimit-Limit"]).toBe("60");
      expect(headers["X-RateLimit-Remaining"]).toBeDefined();
      expect(headers["X-RateLimit-Reset"]).toBeDefined();
      expect(headers["Retry-After"]).toBeUndefined();
    });

    it("should include Retry-After for rate limited request", () => {
      const apiKeyId = "test-key-8";

      // Exhaust limit
      for (let i = 0; i < 60; i++) {
        incrementRateLimit(apiKeyId);
      }

      const result = checkRateLimits(apiKeyId, "pro");
      const headers = getRateLimitHeaders(result);

      expect(headers["X-RateLimit-Limit"]).toBe("60");
      expect(headers["X-RateLimit-Remaining"]).toBe("0");
      expect(headers["Retry-After"]).toBeDefined();
      expect(Number(headers["Retry-After"])).toBeGreaterThan(0);
    });
  });

  describe("getRateLimitStats", () => {
    it("should return correct stats for new API key", () => {
      const stats = getRateLimitStats("new-key", "pro");

      expect(stats.minute.used).toBe(0);
      expect(stats.minute.limit).toBe(60);
      expect(stats.day.used).toBe(0);
      expect(stats.day.limit).toBe(10000);
      expect(stats.month.used).toBe(0);
      expect(stats.month.limit).toBe(100000);
    });

    it("should track usage correctly", () => {
      const apiKeyId = "test-key-9";

      incrementRateLimit(apiKeyId);
      incrementRateLimit(apiKeyId);

      const stats = getRateLimitStats(apiKeyId, "pro");

      expect(stats.minute.used).toBe(2);
      expect(stats.day.used).toBe(2);
      expect(stats.month.used).toBe(2);
    });

    it("should return correct limits for free tier", () => {
      const stats = getRateLimitStats("free-key", "free");

      expect(stats.minute.limit).toBe(0);
      expect(stats.day.limit).toBe(0);
      expect(stats.month.limit).toBe(0);
    });
  });

  describe("clearRateLimitCache", () => {
    it("should clear all cached data", () => {
      const apiKeyId = "test-key-10";

      // Add some data
      incrementRateLimit(apiKeyId);
      incrementRateLimit(apiKeyId);

      let stats = getRateLimitStats(apiKeyId, "pro");
      expect(stats.minute.used).toBe(2);

      // Clear cache
      clearRateLimitCache();

      // Verify cleared
      stats = getRateLimitStats(apiKeyId, "pro");
      expect(stats.minute.used).toBe(0);
    });
  });

  describe("window reset behavior", () => {
    it("should have reset timestamp in the future", () => {
      const result = checkRateLimits("test-key-11", "pro");
      const now = Math.ceil(Date.now() / 1000);

      expect(result.reset).toBeGreaterThan(now);
    });

    it("should have stats reset timestamps in the future", () => {
      const stats = getRateLimitStats("test-key-12", "pro");
      const now = Math.ceil(Date.now() / 1000);

      expect(stats.minute.reset).toBeGreaterThan(now);
      expect(stats.day.reset).toBeGreaterThan(now);
      expect(stats.month.reset).toBeGreaterThan(now);
    });
  });
});
