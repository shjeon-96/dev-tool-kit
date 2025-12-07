/**
 * JWT decoder pure functions
 * Handles JWT token parsing, validation, and analysis
 */

export interface JwtHeader {
  alg: string;
  typ?: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string | string[]; // Audience
  exp?: number; // Expiration time
  nbf?: number; // Not before
  iat?: number; // Issued at
  jti?: string; // JWT ID
  [key: string]: unknown;
}

export interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  isExpired: boolean;
  expiresAt: Date | null;
  issuedAt: Date | null;
  notBefore: Date | null;
}

export interface JwtDecodeResult {
  decoded: DecodedJwt | null;
  error: string | null;
}

/**
 * Validates JWT token format (3 parts separated by dots)
 * @param token - The JWT token string
 * @returns true if format is valid
 */
export function isValidJwtFormat(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.trim().split(".");
  return parts.length === 3 && parts.every((part) => part.length > 0);
}

/**
 * Decodes a base64url encoded string
 * @param input - The base64url encoded string
 * @returns The decoded string
 */
export function base64UrlDecode(input: string): string {
  // Replace base64url characters with base64 characters
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  const padding = base64.length % 4;
  if (padding) {
    base64 += "=".repeat(4 - padding);
  }

  try {
    return atob(base64);
  } catch {
    throw new Error("Invalid base64 encoding");
  }
}

/**
 * Parses a JWT token and returns its components
 * @param token - The JWT token string
 * @returns JwtDecodeResult with decoded token or error
 */
export function decodeJwt(token: string): JwtDecodeResult {
  if (!token.trim()) {
    return { decoded: null, error: null };
  }

  if (!isValidJwtFormat(token)) {
    return { decoded: null, error: "Invalid JWT format: must have 3 parts" };
  }

  try {
    const parts = token.trim().split(".");

    // Decode header
    const headerJson = base64UrlDecode(parts[0]);
    const header: JwtHeader = JSON.parse(headerJson);

    // Decode payload
    const payloadJson = base64UrlDecode(parts[1]);
    const payload: JwtPayload = JSON.parse(payloadJson);

    // Extract timestamps
    const exp = payload.exp;
    const iat = payload.iat;
    const nbf = payload.nbf;

    const expiresAt = exp ? new Date(exp * 1000) : null;
    const issuedAt = iat ? new Date(iat * 1000) : null;
    const notBefore = nbf ? new Date(nbf * 1000) : null;
    const isExpired = expiresAt ? expiresAt < new Date() : false;

    return {
      decoded: {
        header,
        payload,
        signature: parts[2],
        isExpired,
        expiresAt,
        issuedAt,
        notBefore,
      },
      error: null,
    };
  } catch (e) {
    return {
      decoded: null,
      error: e instanceof Error ? e.message : "Failed to decode JWT",
    };
  }
}

/**
 * Calculates time remaining until token expiration
 * @param expiresAt - The expiration date
 * @returns Formatted time string or null if expired/no expiration
 */
export function getTimeRemaining(expiresAt: Date | null): string | null {
  if (!expiresAt) return null;

  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Formats a timestamp for display
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatTimestamp(date: Date | null): string {
  if (!date) return "-";

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

/**
 * Gets common JWT claims with descriptions
 */
export function getCommonClaims(): Array<{
  claim: string;
  name: string;
  description: string;
}> {
  return [
    { claim: "iss", name: "Issuer", description: "토큰 발급자" },
    { claim: "sub", name: "Subject", description: "토큰 주체 (사용자 ID)" },
    { claim: "aud", name: "Audience", description: "토큰 대상자" },
    { claim: "exp", name: "Expiration", description: "만료 시간" },
    { claim: "nbf", name: "Not Before", description: "토큰 활성화 시간" },
    { claim: "iat", name: "Issued At", description: "토큰 발급 시간" },
    { claim: "jti", name: "JWT ID", description: "토큰 고유 식별자" },
  ];
}

/**
 * Extracts algorithm information from JWT header
 * @param header - The JWT header
 * @returns Algorithm description
 */
export function getAlgorithmInfo(
  alg: string,
): { name: string; type: string; description: string } | null {
  const algorithms: Record<
    string,
    { name: string; type: string; description: string }
  > = {
    HS256: {
      name: "HMAC SHA-256",
      type: "Symmetric",
      description: "대칭키 알고리즘",
    },
    HS384: {
      name: "HMAC SHA-384",
      type: "Symmetric",
      description: "대칭키 알고리즘",
    },
    HS512: {
      name: "HMAC SHA-512",
      type: "Symmetric",
      description: "대칭키 알고리즘",
    },
    RS256: {
      name: "RSA SHA-256",
      type: "Asymmetric",
      description: "비대칭키 알고리즘",
    },
    RS384: {
      name: "RSA SHA-384",
      type: "Asymmetric",
      description: "비대칭키 알고리즘",
    },
    RS512: {
      name: "RSA SHA-512",
      type: "Asymmetric",
      description: "비대칭키 알고리즘",
    },
    ES256: {
      name: "ECDSA P-256",
      type: "Asymmetric",
      description: "타원곡선 알고리즘",
    },
    ES384: {
      name: "ECDSA P-384",
      type: "Asymmetric",
      description: "타원곡선 알고리즘",
    },
    ES512: {
      name: "ECDSA P-512",
      type: "Asymmetric",
      description: "타원곡선 알고리즘",
    },
    PS256: {
      name: "RSA-PSS SHA-256",
      type: "Asymmetric",
      description: "RSA-PSS 알고리즘",
    },
    PS384: {
      name: "RSA-PSS SHA-384",
      type: "Asymmetric",
      description: "RSA-PSS 알고리즘",
    },
    PS512: {
      name: "RSA-PSS SHA-512",
      type: "Asymmetric",
      description: "RSA-PSS 알고리즘",
    },
    none: { name: "None", type: "None", description: "서명 없음 (비권장)" },
  };

  return algorithms[alg] || null;
}
