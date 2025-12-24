/**
 * UUID formatting utilities
 */

export interface FormatOptions {
  uppercase: boolean;
  noDashes: boolean;
}

/**
 * Format a UUID/ULID string based on options
 */
export function formatId(id: string, options: FormatOptions): string {
  let result = id;

  if (options.noDashes) {
    result = result.replace(/-/g, "");
  }

  if (options.uppercase) {
    result = result.toUpperCase();
  }

  return result;
}

/**
 * Validate if a string is a valid UUID v4
 */
export function isValidUuidV4(uuid: string): boolean {
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(uuid);
}

/**
 * Validate if a string is a valid UUID v1
 */
export function isValidUuidV1(uuid: string): boolean {
  const uuidV1Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV1Regex.test(uuid);
}

/**
 * Validate if a string is a valid ULID
 */
export function isValidUlid(ulid: string): boolean {
  // ULID is 26 characters, Crockford's Base32
  const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
  return ulidRegex.test(ulid);
}

/**
 * Detect the type of ID
 */
export function detectIdType(
  id: string,
): "uuid-v1" | "uuid-v4" | "ulid" | "unknown" {
  if (isValidUuidV4(id)) return "uuid-v4";
  if (isValidUuidV1(id)) return "uuid-v1";
  if (isValidUlid(id)) return "ulid";
  return "unknown";
}

/**
 * Parse UUID into its components
 */
export function parseUuid(uuid: string): {
  timeLow: string;
  timeMid: string;
  timeHiAndVersion: string;
  clockSeqHiAndRes: string;
  clockSeqLow: string;
  node: string;
} | null {
  const parts = uuid.split("-");
  if (parts.length !== 5) return null;

  return {
    timeLow: parts[0],
    timeMid: parts[1],
    timeHiAndVersion: parts[2],
    clockSeqHiAndRes: parts[3].substring(0, 2),
    clockSeqLow: parts[3].substring(2),
    node: parts[4],
  };
}
