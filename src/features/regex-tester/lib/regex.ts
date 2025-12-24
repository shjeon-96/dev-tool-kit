/**
 * Regex testing utilities
 */

export interface RegexFlags {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
  unicode: boolean;
  sticky: boolean;
}

export interface MatchResult {
  match: string;
  index: number;
  groups: Record<string, string> | undefined;
}

/**
 * Build flag string from flags object
 */
export function buildFlagString(flags: RegexFlags): string {
  let str = "";
  if (flags.global) str += "g";
  if (flags.ignoreCase) str += "i";
  if (flags.multiline) str += "m";
  if (flags.dotAll) str += "s";
  if (flags.unicode) str += "u";
  if (flags.sticky) str += "y";
  return str;
}

/**
 * Parse flag string to flags object
 */
export function parseFlagString(flagStr: string): RegexFlags {
  return {
    global: flagStr.includes("g"),
    ignoreCase: flagStr.includes("i"),
    multiline: flagStr.includes("m"),
    dotAll: flagStr.includes("s"),
    unicode: flagStr.includes("u"),
    sticky: flagStr.includes("y"),
  };
}

/**
 * Create RegExp from pattern and flags, returns null if invalid
 */
export function createRegex(pattern: string, flags: RegexFlags): RegExp | null {
  if (!pattern) return null;
  try {
    return new RegExp(pattern, buildFlagString(flags));
  } catch {
    return null;
  }
}

/**
 * Get regex error message, returns null if valid
 */
export function getRegexError(
  pattern: string,
  flags: RegexFlags,
): string | null {
  if (!pattern) return null;
  try {
    new RegExp(pattern, buildFlagString(flags));
    return null;
  } catch (e) {
    return (e as Error).message;
  }
}

/**
 * Find all matches in text
 */
export function findMatches(
  pattern: string,
  text: string,
  flags: RegexFlags,
): MatchResult[] {
  const regex = createRegex(pattern, flags);
  if (!regex || !text) return [];

  const results: MatchResult[] = [];

  if (flags.global) {
    let match;
    const regexCopy = new RegExp(regex.source, regex.flags);
    while ((match = regexCopy.exec(text)) !== null) {
      results.push({
        match: match[0],
        index: match.index,
        groups: match.groups,
      });
      if (match[0].length === 0) {
        regexCopy.lastIndex++;
      }
    }
  } else {
    const match = regex.exec(text);
    if (match) {
      results.push({
        match: match[0],
        index: match.index,
        groups: match.groups,
      });
    }
  }

  return results;
}

/**
 * Replace matches in text
 */
export function replaceMatches(
  pattern: string,
  text: string,
  replacement: string,
  flags: RegexFlags,
): string {
  const regex = createRegex(pattern, flags);
  if (!regex || !text) return "";
  try {
    return text.replace(regex, replacement);
  } catch {
    return "";
  }
}

/**
 * Count matches in text
 */
export function countMatches(
  pattern: string,
  text: string,
  flags: RegexFlags,
): number {
  // Force global flag for counting
  const countFlags = { ...flags, global: true };
  return findMatches(pattern, text, countFlags).length;
}

/**
 * Escape special regex characters
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Common regex patterns
 */
export const commonPatterns = {
  email: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
  url: "https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$",
  phoneKorea: "0\\d{1,2}-\\d{3,4}-\\d{4}",
  ipv4: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
  date: "\\d{4}-\\d{2}-\\d{2}",
  htmlTag: "<[^>]+>",
  hexColor: "#[0-9A-Fa-f]{3,8}",
  uuid: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
} as const;
