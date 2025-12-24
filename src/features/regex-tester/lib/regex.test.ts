import { describe, it, expect } from "vitest";
import {
  buildFlagString,
  parseFlagString,
  createRegex,
  getRegexError,
  findMatches,
  replaceMatches,
  countMatches,
  escapeRegex,
  commonPatterns,
} from "./regex";

describe("Regex Utils", () => {
  // ============================================
  // buildFlagString
  // ============================================
  describe("buildFlagString", () => {
    it("모든 플래그 비활성화", () => {
      const result = buildFlagString({
        global: false,
        ignoreCase: false,
        multiline: false,
        dotAll: false,
        unicode: false,
        sticky: false,
      });
      expect(result).toBe("");
    });

    it("global 플래그만 활성화", () => {
      const result = buildFlagString({
        global: true,
        ignoreCase: false,
        multiline: false,
        dotAll: false,
        unicode: false,
        sticky: false,
      });
      expect(result).toBe("g");
    });

    it("여러 플래그 조합", () => {
      const result = buildFlagString({
        global: true,
        ignoreCase: true,
        multiline: true,
        dotAll: false,
        unicode: false,
        sticky: false,
      });
      expect(result).toBe("gim");
    });

    it("모든 플래그 활성화", () => {
      const result = buildFlagString({
        global: true,
        ignoreCase: true,
        multiline: true,
        dotAll: true,
        unicode: true,
        sticky: true,
      });
      expect(result).toBe("gimsuy");
    });
  });

  // ============================================
  // parseFlagString
  // ============================================
  describe("parseFlagString", () => {
    it("빈 문자열 파싱", () => {
      const result = parseFlagString("");
      expect(result).toEqual({
        global: false,
        ignoreCase: false,
        multiline: false,
        dotAll: false,
        unicode: false,
        sticky: false,
      });
    });

    it("gi 플래그 파싱", () => {
      const result = parseFlagString("gi");
      expect(result.global).toBe(true);
      expect(result.ignoreCase).toBe(true);
      expect(result.multiline).toBe(false);
    });

    it("전체 플래그 파싱", () => {
      const result = parseFlagString("gimsuy");
      expect(result.global).toBe(true);
      expect(result.ignoreCase).toBe(true);
      expect(result.multiline).toBe(true);
      expect(result.dotAll).toBe(true);
      expect(result.unicode).toBe(true);
      expect(result.sticky).toBe(true);
    });
  });

  // ============================================
  // createRegex
  // ============================================
  describe("createRegex", () => {
    const defaultFlags = {
      global: true,
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
      sticky: false,
    };

    it("유효한 패턴으로 RegExp 생성", () => {
      const result = createRegex("\\d+", defaultFlags);
      expect(result).toBeInstanceOf(RegExp);
      expect(result?.source).toBe("\\d+");
    });

    it("빈 패턴은 null 반환", () => {
      expect(createRegex("", defaultFlags)).toBeNull();
    });

    it("유효하지 않은 패턴은 null 반환", () => {
      expect(createRegex("[", defaultFlags)).toBeNull();
      expect(createRegex("(", defaultFlags)).toBeNull();
      expect(createRegex("*", defaultFlags)).toBeNull();
    });
  });

  // ============================================
  // getRegexError
  // ============================================
  describe("getRegexError", () => {
    const defaultFlags = {
      global: false,
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
      sticky: false,
    };

    it("유효한 패턴은 null 반환", () => {
      expect(getRegexError("\\d+", defaultFlags)).toBeNull();
      expect(getRegexError("hello", defaultFlags)).toBeNull();
    });

    it("빈 패턴은 null 반환", () => {
      expect(getRegexError("", defaultFlags)).toBeNull();
    });

    it("유효하지 않은 패턴은 에러 메시지 반환", () => {
      const error = getRegexError("[", defaultFlags);
      expect(error).not.toBeNull();
      expect(typeof error).toBe("string");
    });
  });

  // ============================================
  // findMatches
  // ============================================
  describe("findMatches", () => {
    const globalFlags = {
      global: true,
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
      sticky: false,
    };

    const nonGlobalFlags = {
      global: false,
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
      sticky: false,
    };

    it("global 플래그로 모든 매치 찾기", () => {
      const result = findMatches("\\d+", "a1b22c333", globalFlags);
      expect(result).toHaveLength(3);
      expect(result[0].match).toBe("1");
      expect(result[1].match).toBe("22");
      expect(result[2].match).toBe("333");
    });

    it("non-global은 첫 번째 매치만 반환", () => {
      const result = findMatches("\\d+", "a1b22c333", nonGlobalFlags);
      expect(result).toHaveLength(1);
      expect(result[0].match).toBe("1");
    });

    it("매치 인덱스 정확성", () => {
      const result = findMatches("test", "test test test", globalFlags);
      expect(result[0].index).toBe(0);
      expect(result[1].index).toBe(5);
      expect(result[2].index).toBe(10);
    });

    it("캡처 그룹", () => {
      const result = findMatches(
        "(?<year>\\d{4})-(?<month>\\d{2})",
        "2024-12",
        globalFlags,
      );
      expect(result[0].groups).toEqual({ year: "2024", month: "12" });
    });

    it("빈 매치 처리", () => {
      const result = findMatches("a*", "bbb", globalFlags);
      // 각 위치에서 빈 문자열 매치
      expect(result.length).toBeGreaterThan(0);
    });

    it("매치 없음", () => {
      const result = findMatches("xyz", "abc", globalFlags);
      expect(result).toHaveLength(0);
    });
  });

  // ============================================
  // replaceMatches
  // ============================================
  describe("replaceMatches", () => {
    const globalFlags = {
      global: true,
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
      sticky: false,
    };

    it("모든 매치 교체", () => {
      const result = replaceMatches("\\d+", "a1b2c3", "X", globalFlags);
      expect(result).toBe("aXbXcX");
    });

    it("캡처 그룹 참조 교체", () => {
      const result = replaceMatches("(\\d+)", "a1b2", "[$1]", globalFlags);
      expect(result).toBe("a[1]b[2]");
    });

    it("빈 패턴은 빈 문자열 반환", () => {
      expect(replaceMatches("", "test", "X", globalFlags)).toBe("");
    });

    it("빈 텍스트는 빈 문자열 반환", () => {
      expect(replaceMatches("\\d", "", "X", globalFlags)).toBe("");
    });
  });

  // ============================================
  // countMatches
  // ============================================
  describe("countMatches", () => {
    const flags = {
      global: false, // countMatches는 내부적으로 global 강제
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
      sticky: false,
    };

    it("매치 개수 카운트", () => {
      expect(countMatches("\\d", "a1b2c3d4e5", flags)).toBe(5);
    });

    it("매치 없으면 0", () => {
      expect(countMatches("\\d", "no digits", flags)).toBe(0);
    });

    it("빈 패턴은 0", () => {
      expect(countMatches("", "test", flags)).toBe(0);
    });
  });

  // ============================================
  // escapeRegex
  // ============================================
  describe("escapeRegex", () => {
    it("특수문자 이스케이프", () => {
      expect(escapeRegex("a.b")).toBe("a\\.b");
      expect(escapeRegex("a*b")).toBe("a\\*b");
      expect(escapeRegex("a+b")).toBe("a\\+b");
      expect(escapeRegex("a?b")).toBe("a\\?b");
      expect(escapeRegex("a^b")).toBe("a\\^b");
      expect(escapeRegex("a$b")).toBe("a\\$b");
      expect(escapeRegex("a{b")).toBe("a\\{b");
      expect(escapeRegex("a}b")).toBe("a\\}b");
      expect(escapeRegex("a(b")).toBe("a\\(b");
      expect(escapeRegex("a)b")).toBe("a\\)b");
      expect(escapeRegex("a|b")).toBe("a\\|b");
      expect(escapeRegex("a[b")).toBe("a\\[b");
      expect(escapeRegex("a]b")).toBe("a\\]b");
      expect(escapeRegex("a\\b")).toBe("a\\\\b");
    });

    it("일반 문자열은 변경 없음", () => {
      expect(escapeRegex("hello world")).toBe("hello world");
    });

    it("빈 문자열", () => {
      expect(escapeRegex("")).toBe("");
    });

    it("복합 특수문자", () => {
      expect(escapeRegex("test.*?")).toBe("test\\.\\*\\?");
    });
  });

  // ============================================
  // commonPatterns
  // ============================================
  describe("commonPatterns", () => {
    it("이메일 패턴", () => {
      const regex = new RegExp(commonPatterns.email);
      expect(regex.test("test@example.com")).toBe(true);
      expect(regex.test("not-an-email")).toBe(false);
    });

    it("URL 패턴", () => {
      const regex = new RegExp(commonPatterns.url);
      expect(regex.test("https://example.com")).toBe(true);
      expect(regex.test("http://example.com/path")).toBe(true);
    });

    it("한국 전화번호 패턴", () => {
      const regex = new RegExp(commonPatterns.phoneKorea);
      expect(regex.test("010-1234-5678")).toBe(true);
      expect(regex.test("02-123-4567")).toBe(true);
    });

    it("IPv4 패턴", () => {
      const regex = new RegExp(commonPatterns.ipv4);
      expect(regex.test("192.168.0.1")).toBe(true);
      expect(regex.test("10.0.0.1")).toBe(true);
    });

    it("날짜 패턴", () => {
      const regex = new RegExp(commonPatterns.date);
      expect(regex.test("2024-12-25")).toBe(true);
    });

    it("HTML 태그 패턴", () => {
      const regex = new RegExp(commonPatterns.htmlTag);
      expect(regex.test("<div>")).toBe(true);
      expect(regex.test("<a href='#'>")).toBe(true);
    });

    it("HEX 색상 패턴", () => {
      const regex = new RegExp(commonPatterns.hexColor);
      expect(regex.test("#fff")).toBe(true);
      expect(regex.test("#ffffff")).toBe(true);
      expect(regex.test("#FF5733")).toBe(true);
    });

    it("UUID 패턴", () => {
      const regex = new RegExp(commonPatterns.uuid);
      expect(regex.test("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    });
  });
});
