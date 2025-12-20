export interface ApiKey {
  id: string;
  name: string;
  key: string; // Only shown once at creation, then masked
  maskedKey: string; // e.g., "wtk_****abcd"
  createdAt: Date;
  lastUsedAt: Date | null;
  expiresAt: Date | null;
  usageCount: number;
  isActive: boolean;
}

export interface ApiKeyCreateInput {
  name: string;
  expiresIn?: "30d" | "90d" | "1y" | "never";
}

export interface ApiUsageRecord {
  id: string;
  apiKeyId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  timestamp: Date;
  responseTimeMs: number;
}

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
