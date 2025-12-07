import { describe, it, expect } from "vitest";
import {
  validateBaseInput,
  convertBase,
  decimalToBase,
  toDecimal,
  getBaseName,
  getBasePrefix,
} from "./converter";

describe("Base Converter", () => {
  describe("validateBaseInput", () => {
    it("validates empty input as true", () => {
      expect(validateBaseInput("", 10)).toBe(true);
      expect(validateBaseInput("  ", 10)).toBe(true);
    });

    it("validates binary input correctly", () => {
      expect(validateBaseInput("101010", 2)).toBe(true);
      expect(validateBaseInput("111", 2)).toBe(true);
      expect(validateBaseInput("123", 2)).toBe(false);
      expect(validateBaseInput("abc", 2)).toBe(false);
    });

    it("validates octal input correctly", () => {
      expect(validateBaseInput("01234567", 8)).toBe(true);
      expect(validateBaseInput("777", 8)).toBe(true);
      expect(validateBaseInput("89", 8)).toBe(false);
      expect(validateBaseInput("abc", 8)).toBe(false);
    });

    it("validates decimal input correctly", () => {
      expect(validateBaseInput("12345", 10)).toBe(true);
      expect(validateBaseInput("-999", 10)).toBe(true);
      expect(validateBaseInput("0", 10)).toBe(true);
      expect(validateBaseInput("abc", 10)).toBe(false);
      expect(validateBaseInput("12.34", 10)).toBe(false);
    });

    it("validates hexadecimal input correctly", () => {
      expect(validateBaseInput("FF", 16)).toBe(true);
      expect(validateBaseInput("0123456789abcdef", 16)).toBe(true);
      expect(validateBaseInput("ABCDEF", 16)).toBe(true);
      expect(validateBaseInput("GHI", 16)).toBe(false);
    });
  });

  describe("convertBase", () => {
    it("returns null for empty input", () => {
      expect(convertBase("", 10)).toBeNull();
      expect(convertBase("   ", 10)).toBeNull();
    });

    it("converts decimal to all bases correctly", () => {
      const result = convertBase("255", 10);
      expect(result).not.toBeNull();
      expect(result?.binary).toBe("11111111");
      expect(result?.octal).toBe("377");
      expect(result?.decimal).toBe("255");
      expect(result?.hexadecimal).toBe("FF");
    });

    it("converts binary to all bases correctly", () => {
      const result = convertBase("1010", 2);
      expect(result).not.toBeNull();
      expect(result?.binary).toBe("1010");
      expect(result?.octal).toBe("12");
      expect(result?.decimal).toBe("10");
      expect(result?.hexadecimal).toBe("A");
    });

    it("converts hexadecimal to all bases correctly", () => {
      const result = convertBase("FF", 16);
      expect(result).not.toBeNull();
      expect(result?.binary).toBe("11111111");
      expect(result?.octal).toBe("377");
      expect(result?.decimal).toBe("255");
      expect(result?.hexadecimal).toBe("FF");
    });

    it("converts octal to all bases correctly", () => {
      const result = convertBase("77", 8);
      expect(result).not.toBeNull();
      expect(result?.binary).toBe("111111");
      expect(result?.octal).toBe("77");
      expect(result?.decimal).toBe("63");
      expect(result?.hexadecimal).toBe("3F");
    });

    it("handles negative decimal numbers", () => {
      const result = convertBase("-10", 10);
      expect(result).not.toBeNull();
      expect(result?.binary).toBe("-1010");
      expect(result?.octal).toBe("-12");
      expect(result?.decimal).toBe("-10");
      expect(result?.hexadecimal).toBe("-A");
    });

    it("handles large numbers with BigInt", () => {
      const result = convertBase("9999999999999999999", 10);
      expect(result).not.toBeNull();
      expect(result?.decimal).toBe("9999999999999999999");
    });

    it("returns null for invalid input", () => {
      expect(convertBase("abc", 10)).toBeNull();
      expect(convertBase("123", 2)).toBeNull();
      expect(convertBase("89", 8)).toBeNull();
    });

    it("handles zero correctly", () => {
      const result = convertBase("0", 10);
      expect(result).not.toBeNull();
      expect(result?.binary).toBe("0");
      expect(result?.octal).toBe("0");
      expect(result?.decimal).toBe("0");
      expect(result?.hexadecimal).toBe("0");
    });
  });

  describe("decimalToBase", () => {
    it("converts decimal to binary", () => {
      expect(decimalToBase(10, 2)).toBe("1010");
      expect(decimalToBase("255", 2)).toBe("11111111");
    });

    it("converts decimal to octal", () => {
      expect(decimalToBase(64, 8)).toBe("100");
      expect(decimalToBase("63", 8)).toBe("77");
    });

    it("converts decimal to hexadecimal (uppercase)", () => {
      expect(decimalToBase(255, 16)).toBe("FF");
      expect(decimalToBase("4095", 16)).toBe("FFF");
    });

    it("handles negative numbers", () => {
      expect(decimalToBase(-10, 2)).toBe("-1010");
      expect(decimalToBase(-255, 16)).toBe("-FF");
    });

    it("handles BigInt input", () => {
      expect(decimalToBase(BigInt(1000), 16)).toBe("3E8");
    });

    it("returns empty string for invalid input", () => {
      expect(decimalToBase("abc", 10)).toBe("");
    });
  });

  describe("toDecimal", () => {
    it("converts binary to decimal", () => {
      expect(toDecimal("1010", 2)).toBe("10");
      expect(toDecimal("11111111", 2)).toBe("255");
    });

    it("converts octal to decimal", () => {
      expect(toDecimal("77", 8)).toBe("63");
      expect(toDecimal("100", 8)).toBe("64");
    });

    it("converts hexadecimal to decimal", () => {
      expect(toDecimal("FF", 16)).toBe("255");
      expect(toDecimal("fff", 16)).toBe("4095");
    });

    it("returns decimal as-is", () => {
      expect(toDecimal("123", 10)).toBe("123");
      expect(toDecimal("-456", 10)).toBe("-456");
    });

    it("returns empty string for invalid input", () => {
      expect(toDecimal("", 10)).toBe("");
      expect(toDecimal("abc", 10)).toBe("");
      expect(toDecimal("123", 2)).toBe("");
    });
  });

  describe("getBaseName", () => {
    it("returns correct Korean names", () => {
      expect(getBaseName(2)).toBe("2진수");
      expect(getBaseName(8)).toBe("8진수");
      expect(getBaseName(10)).toBe("10진수");
      expect(getBaseName(16)).toBe("16진수");
    });
  });

  describe("getBasePrefix", () => {
    it("returns correct prefixes", () => {
      expect(getBasePrefix(2)).toBe("0b");
      expect(getBasePrefix(8)).toBe("0o");
      expect(getBasePrefix(10)).toBe("");
      expect(getBasePrefix(16)).toBe("0x");
    });
  });
});
