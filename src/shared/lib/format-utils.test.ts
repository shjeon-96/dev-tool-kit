import { describe, expect, it } from "vitest";
import {
  formatBytes,
  formatSize,
  formatDate,
  formatRelativeDate,
  formatNumber,
  formatPercent,
  truncateString,
  formatDuration,
} from "./format-utils";

describe("format-utils", () => {
  // ============================================
  // formatBytes
  // ============================================
  describe("formatBytes", () => {
    it("바이트 단위 포맷팅", () => {
      expect(formatBytes(0)).toBe("0 B");
      expect(formatBytes(500)).toBe("500 B");
      expect(formatBytes(1023)).toBe("1023 B");
    });

    it("킬로바이트 단위 포맷팅", () => {
      expect(formatBytes(1024)).toBe("1.0 KB");
      expect(formatBytes(1536)).toBe("1.5 KB");
      expect(formatBytes(10240)).toBe("10.0 KB");
    });

    it("메가바이트 단위 포맷팅", () => {
      expect(formatBytes(1024 * 1024)).toBe("1.0 MB");
      expect(formatBytes(1.5 * 1024 * 1024)).toBe("1.5 MB");
      expect(formatBytes(100 * 1024 * 1024)).toBe("100.0 MB");
    });

    it("기가바이트 단위 포맷팅", () => {
      expect(formatBytes(1024 * 1024 * 1024)).toBe("1.0 GB");
      expect(formatBytes(2.5 * 1024 * 1024 * 1024)).toBe("2.5 GB");
    });
  });

  // ============================================
  // formatSize (alias)
  // ============================================
  describe("formatSize", () => {
    it("formatBytes의 별칭으로 동일하게 동작", () => {
      expect(formatSize(1024)).toBe(formatBytes(1024));
      expect(formatSize(1024 * 1024)).toBe(formatBytes(1024 * 1024));
    });
  });

  // ============================================
  // formatDate
  // ============================================
  describe("formatDate", () => {
    it("null/undefined에 대해 Never 반환", () => {
      expect(formatDate(null)).toBe("Never");
      expect(formatDate(undefined)).toBe("Never");
    });

    it("유효한 날짜 포맷팅", () => {
      const date = new Date("2025-12-25");
      const result = formatDate(date);
      expect(result).toContain("Dec");
      expect(result).toContain("25");
      expect(result).toContain("2025");
    });

    it("커스텀 옵션 적용", () => {
      const date = new Date("2025-01-15");
      const result = formatDate(date, { year: "numeric", month: "long" });
      expect(result).toContain("January");
      expect(result).toContain("2025");
    });
  });

  // ============================================
  // formatRelativeDate
  // ============================================
  describe("formatRelativeDate", () => {
    it("null/undefined에 대해 Never 반환", () => {
      expect(formatRelativeDate(null)).toBe("Never");
      expect(formatRelativeDate(undefined)).toBe("Never");
    });

    it("방금 전 (60초 미만)", () => {
      const date = new Date(Date.now() - 30 * 1000);
      expect(formatRelativeDate(date)).toBe("Just now");
    });

    it("분 단위", () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatRelativeDate(date)).toBe("5 minutes ago");

      const date2 = new Date(Date.now() - 1 * 60 * 1000);
      expect(formatRelativeDate(date2)).toBe("1 minute ago");
    });

    it("시간 단위", () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
      expect(formatRelativeDate(date)).toBe("3 hours ago");

      const date2 = new Date(Date.now() - 1 * 60 * 60 * 1000);
      expect(formatRelativeDate(date2)).toBe("1 hour ago");
    });

    it("어제", () => {
      const date = new Date(Date.now() - 25 * 60 * 60 * 1000);
      expect(formatRelativeDate(date)).toBe("Yesterday");
    });

    it("일 단위", () => {
      const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(date)).toBe("5 days ago");
    });

    it("주 단위", () => {
      const date = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(date)).toBe("2 weeks ago");

      const date2 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(date2)).toBe("1 week ago");
    });

    it("월 단위", () => {
      const date = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(date)).toBe("2 months ago");

      const date2 = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(date2)).toBe("1 month ago");
    });
  });

  // ============================================
  // formatNumber
  // ============================================
  describe("formatNumber", () => {
    it("천 단위 구분 포맷팅", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(999)).toBe("999");
    });

    it("소수점 포함 숫자", () => {
      expect(formatNumber(1234.56)).toBe("1,234.56");
    });

    it("0과 음수", () => {
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(-1234)).toBe("-1,234");
    });
  });

  // ============================================
  // formatPercent
  // ============================================
  describe("formatPercent", () => {
    it("기본 퍼센트 포맷팅 (소수점 없음)", () => {
      expect(formatPercent(0.75)).toBe("75%");
      expect(formatPercent(1)).toBe("100%");
      expect(formatPercent(0)).toBe("0%");
    });

    it("소수점 포함 퍼센트", () => {
      expect(formatPercent(0.7534, 2)).toBe("75.34%");
      expect(formatPercent(0.333, 1)).toBe("33.3%");
    });

    it("100% 초과", () => {
      expect(formatPercent(1.5)).toBe("150%");
    });
  });

  // ============================================
  // truncateString
  // ============================================
  describe("truncateString", () => {
    it("maxLength 이하 문자열은 그대로 반환", () => {
      expect(truncateString("Hello", 10)).toBe("Hello");
      expect(truncateString("Hi", 2)).toBe("Hi");
    });

    it("maxLength 초과 시 잘라서 ... 추가", () => {
      expect(truncateString("Hello World", 5)).toBe("Hello...");
      expect(truncateString("ABCDEFGHIJ", 3)).toBe("ABC...");
    });

    it("빈 문자열", () => {
      expect(truncateString("", 5)).toBe("");
    });
  });

  // ============================================
  // formatDuration
  // ============================================
  describe("formatDuration", () => {
    it("밀리초 단위", () => {
      expect(formatDuration(500)).toBe("500ms");
      expect(formatDuration(0)).toBe("0ms");
    });

    it("초 단위", () => {
      expect(formatDuration(1000)).toBe("1s");
      expect(formatDuration(5000)).toBe("5s");
    });

    it("분 단위", () => {
      expect(formatDuration(60 * 1000)).toBe("1m 0s");
      expect(formatDuration(90 * 1000)).toBe("1m 30s");
      expect(formatDuration(5 * 60 * 1000)).toBe("5m 0s");
    });

    it("시간 단위", () => {
      expect(formatDuration(60 * 60 * 1000)).toBe("1h 0m 0s");
      expect(formatDuration(3661 * 1000)).toBe("1h 1m 1s");
      expect(formatDuration(2 * 60 * 60 * 1000 + 30 * 60 * 1000)).toBe(
        "2h 30m 0s",
      );
    });
  });
});
