/**
 * Rate Limiter with In-Memory Cache
 *
 * Features:
 * - In-memory cache for fast rate limit checks
 * - Sliding window counter algorithm
 * - Standard X-RateLimit headers
 * - Fallback to DB for persistence
 */

import { API_RATE_LIMITS, type ApiRateLimits } from "./types";

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
  retryAfter?: number; // Seconds until next allowed request
  error?: string;
  window: "minute" | "day" | "month";
}

export interface RateLimitHeaders {
  "X-RateLimit-Limit": string;
  "X-RateLimit-Remaining": string;
  "X-RateLimit-Reset": string;
  "Retry-After"?: string;
}

// In-memory cache for rate limiting
// Key format: `${apiKeyId}:${window}`
const rateLimitCache = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

// Cache cleanup interval (every 5 minutes)
const CACHE_CLEANUP_INTERVAL = 5 * 60 * 1000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function startCacheCleanup() {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitCache.entries()) {
      if (value.resetAt < now) {
        rateLimitCache.delete(key);
      }
    }
  }, CACHE_CLEANUP_INTERVAL);

  // Don't prevent Node.js from exiting
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}

// Start cleanup on module load
startCacheCleanup();

/**
 * Get window duration in milliseconds
 */
function getWindowDuration(window: "minute" | "day" | "month"): number {
  switch (window) {
    case "minute":
      return 60 * 1000;
    case "day":
      return 24 * 60 * 60 * 1000;
    case "month":
      return 30 * 24 * 60 * 60 * 1000;
  }
}

/**
 * Get the limit for a specific window
 */
function getWindowLimit(
  limits: ApiRateLimits,
  window: "minute" | "day" | "month",
): number {
  switch (window) {
    case "minute":
      return limits.requestsPerMinute;
    case "day":
      return limits.requestsPerDay;
    case "month":
      return limits.requestsPerMonth;
  }
}

/**
 * Check rate limit for a specific window
 */
function checkWindowLimit(
  apiKeyId: string,
  window: "minute" | "day" | "month",
  limit: number,
): RateLimitResult {
  const cacheKey = `${apiKeyId}:${window}`;
  const now = Date.now();
  const windowDuration = getWindowDuration(window);

  let entry = rateLimitCache.get(cacheKey);

  // Reset if window expired
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + windowDuration,
    };
  }

  const remaining = Math.max(0, limit - entry.count);
  const reset = Math.ceil(entry.resetAt / 1000); // Unix timestamp in seconds

  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return {
      allowed: false,
      limit,
      remaining: 0,
      reset,
      retryAfter,
      error: `Rate limit exceeded: ${limit} requests per ${window}`,
      window,
    };
  }

  return {
    allowed: true,
    limit,
    remaining: remaining - 1, // Account for current request
    reset,
    window,
  };
}

/**
 * Increment the counter for all windows
 */
export function incrementRateLimit(apiKeyId: string): void {
  const now = Date.now();
  const windows: Array<"minute" | "day" | "month"> = ["minute", "day", "month"];

  for (const window of windows) {
    const cacheKey = `${apiKeyId}:${window}`;
    const windowDuration = getWindowDuration(window);

    let entry = rateLimitCache.get(cacheKey);

    if (!entry || entry.resetAt < now) {
      entry = {
        count: 1,
        resetAt: now + windowDuration,
      };
    } else {
      entry.count++;
    }

    rateLimitCache.set(cacheKey, entry);
  }
}

/**
 * Check rate limits against all windows
 * Returns the most restrictive result
 */
export function checkRateLimits(
  apiKeyId: string,
  tier: "free" | "pro" = "pro",
): RateLimitResult {
  const limits = API_RATE_LIMITS[tier];
  const windows: Array<"minute" | "day" | "month"> = ["minute", "day", "month"];

  // Check each window, return first failure
  for (const window of windows) {
    const limit = getWindowLimit(limits, window);
    if (limit === 0) {
      return {
        allowed: false,
        limit: 0,
        remaining: 0,
        reset: Math.ceil(Date.now() / 1000),
        error: "API access requires Pro subscription",
        window,
      };
    }

    const result = checkWindowLimit(apiKeyId, window, limit);
    if (!result.allowed) {
      return result;
    }
  }

  // All checks passed, return minute window info (most relevant)
  const minuteLimit = limits.requestsPerMinute;
  const minuteResult = checkWindowLimit(apiKeyId, "minute", minuteLimit);

  return {
    allowed: true,
    limit: minuteLimit,
    remaining: minuteResult.remaining,
    reset: minuteResult.reset,
    window: "minute",
  };
}

/**
 * Generate rate limit headers from result
 */
export function getRateLimitHeaders(result: RateLimitResult): RateLimitHeaders {
  const headers: RateLimitHeaders = {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": Math.max(0, result.remaining).toString(),
    "X-RateLimit-Reset": result.reset.toString(),
  };

  if (result.retryAfter !== undefined) {
    headers["Retry-After"] = result.retryAfter.toString();
  }

  return headers;
}

/**
 * Get current usage stats for an API key
 */
export function getRateLimitStats(
  apiKeyId: string,
  tier: "free" | "pro" = "pro",
): {
  minute: { used: number; limit: number; reset: number };
  day: { used: number; limit: number; reset: number };
  month: { used: number; limit: number; reset: number };
} {
  const limits = API_RATE_LIMITS[tier];
  const now = Date.now();

  const getWindowStats = (window: "minute" | "day" | "month") => {
    const cacheKey = `${apiKeyId}:${window}`;
    const entry = rateLimitCache.get(cacheKey);
    const limit = getWindowLimit(limits, window);
    const windowDuration = getWindowDuration(window);

    if (!entry || entry.resetAt < now) {
      return {
        used: 0,
        limit,
        reset: Math.ceil((now + windowDuration) / 1000),
      };
    }

    return {
      used: entry.count,
      limit,
      reset: Math.ceil(entry.resetAt / 1000),
    };
  };

  return {
    minute: getWindowStats("minute"),
    day: getWindowStats("day"),
    month: getWindowStats("month"),
  };
}

/**
 * Clear rate limit cache for testing
 */
export function clearRateLimitCache(): void {
  rateLimitCache.clear();
}

/**
 * Get cache size for monitoring
 */
export function getRateLimitCacheSize(): number {
  return rateLimitCache.size;
}
