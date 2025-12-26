/**
 * API Rate Limiting Types and Constants
 *
 * shared 레이어에 위치하여 FSD 의존성 방향 준수
 * features/api-access에서 re-export하여 사용
 */

export interface ApiRateLimits {
  requestsPerMinute: number;
  requestsPerDay: number;
  requestsPerMonth: number;
}

export const API_RATE_LIMITS: Record<"free" | "pro", ApiRateLimits> = {
  free: {
    requestsPerMinute: 0, // No API access for free
    requestsPerDay: 0,
    requestsPerMonth: 0,
  },
  pro: {
    requestsPerMinute: 60,
    requestsPerDay: 10000,
    requestsPerMonth: 100000,
  },
};
