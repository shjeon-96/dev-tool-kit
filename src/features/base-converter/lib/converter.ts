/**
 * Base converter pure functions
 * Handles number base conversions between binary, octal, decimal, and hexadecimal
 */

export type NumberBase = 2 | 8 | 10 | 16;

export interface BaseValues {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

/**
 * Validates input string against the specified number base
 * @param value - The input string to validate
 * @param base - The number base (2, 8, 10, or 16)
 * @returns true if valid, false otherwise
 */
export function validateBaseInput(value: string, base: NumberBase): boolean {
  if (!value.trim()) return true;

  const patterns: Record<NumberBase, RegExp> = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^-?[0-9]+$/,
    16: /^[0-9a-fA-F]+$/,
  };

  return patterns[base].test(value);
}

/**
 * Converts a number from one base to all supported bases
 * @param input - The input string to convert
 * @param sourceBase - The base of the input number
 * @returns BaseValues object with all conversions, or null if invalid
 */
export function convertBase(
  input: string,
  sourceBase: NumberBase,
): BaseValues | null {
  if (!input.trim()) return null;

  if (!validateBaseInput(input, sourceBase)) {
    return null;
  }

  try {
    // Use BigInt for large numbers
    let decimalValue: bigint;

    if (sourceBase === 10) {
      decimalValue = BigInt(input);
    } else {
      decimalValue = BigInt(parseInt(input, sourceBase));
    }

    // Handle negative numbers for display
    const isNegative = decimalValue < BigInt(0);
    const absValue = isNegative ? -decimalValue : decimalValue;

    return {
      binary: (isNegative ? "-" : "") + absValue.toString(2),
      octal: (isNegative ? "-" : "") + absValue.toString(8),
      decimal: decimalValue.toString(10),
      hexadecimal: (
        (isNegative ? "-" : "") + absValue.toString(16)
      ).toUpperCase(),
    };
  } catch {
    return null;
  }
}

/**
 * Converts a decimal number to a specific base
 * @param decimal - The decimal number (as string or number)
 * @param targetBase - The target base
 * @returns The converted string
 */
export function decimalToBase(
  decimal: string | number | bigint,
  targetBase: NumberBase,
): string {
  try {
    const value = typeof decimal === "bigint" ? decimal : BigInt(decimal);
    const isNegative = value < BigInt(0);
    const absValue = isNegative ? -value : value;
    const result = absValue.toString(targetBase);
    return (
      (isNegative ? "-" : "") +
      (targetBase === 16 ? result.toUpperCase() : result)
    );
  } catch {
    return "";
  }
}

/**
 * Converts a number from any base to decimal
 * @param value - The input string
 * @param sourceBase - The source base
 * @returns The decimal value as string, or empty string if invalid
 */
export function toDecimal(value: string, sourceBase: NumberBase): string {
  if (!value.trim() || !validateBaseInput(value, sourceBase)) {
    return "";
  }

  try {
    if (sourceBase === 10) {
      return BigInt(value).toString();
    }
    return BigInt(parseInt(value, sourceBase)).toString();
  } catch {
    return "";
  }
}

/**
 * Gets the base name in Korean
 * @param base - The number base
 * @returns The Korean name for the base
 */
export function getBaseName(base: NumberBase): string {
  const names: Record<NumberBase, string> = {
    2: "2진수",
    8: "8진수",
    10: "10진수",
    16: "16진수",
  };
  return names[base];
}

/**
 * Gets the base prefix for display
 * @param base - The number base
 * @returns The prefix string (e.g., "0b", "0o", "0x")
 */
export function getBasePrefix(base: NumberBase): string {
  const prefixes: Record<NumberBase, string> = {
    2: "0b",
    8: "0o",
    10: "",
    16: "0x",
  };
  return prefixes[base];
}
