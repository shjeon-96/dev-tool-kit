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

// Rate limit types are in shared for FSD compliance
// Re-export for backward compatibility
export { API_RATE_LIMITS, type ApiRateLimits } from "@/shared/lib/api/types";
