import { nanoid } from "nanoid";

const API_KEY_PREFIX = "wtk";

/**
 * Generate a new API key
 * Format: wtk_[32 character nanoid]
 */
export function generateApiKey(): string {
  return `${API_KEY_PREFIX}_${nanoid(32)}`;
}

/**
 * Mask an API key for display
 * e.g., "wtk_abc123...xyz789" -> "wtk_****xyz789"
 */
export function maskApiKey(key: string): string {
  if (!key.startsWith(`${API_KEY_PREFIX}_`)) {
    return "****";
  }
  const suffix = key.slice(-8);
  return `${API_KEY_PREFIX}_****${suffix}`;
}

/**
 * Validate API key format
 */
export function isValidApiKeyFormat(key: string): boolean {
  const regex = new RegExp(`^${API_KEY_PREFIX}_[A-Za-z0-9_-]{32}$`);
  return regex.test(key);
}

/**
 * Hash an API key for secure storage
 * Using Web Crypto API for browser compatibility
 */
export async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Calculate expiration date
 */
export function calculateExpirationDate(
  expiresIn: "30d" | "90d" | "1y" | "never",
): Date | null {
  if (expiresIn === "never") return null;

  const now = new Date();
  switch (expiresIn) {
    case "30d":
      now.setDate(now.getDate() + 30);
      break;
    case "90d":
      now.setDate(now.getDate() + 90);
      break;
    case "1y":
      now.setFullYear(now.getFullYear() + 1);
      break;
  }
  return now;
}
