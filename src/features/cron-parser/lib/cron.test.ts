import { describe, it, expect } from "vitest";
import {
  cronFields,
  cronPresets,
  validateCronField,
  validateCronExpression,
  parseCronExpression,
  buildCronExpression,
  getSimpleDescription,
} from "./cron";

describe("Cron Utils", () => {
  // ============================================
  // cronFields
  // ============================================
  describe("cronFields", () => {
    it("5개 필드 정의", () => {
      expect(cronFields).toHaveLength(5);
    });

    it("필드 순서 확인", () => {
      expect(cronFields[0].name).toBe("minute");
      expect(cronFields[1].name).toBe("hour");
      expect(cronFields[2].name).toBe("dayOfMonth");
      expect(cronFields[3].name).toBe("month");
      expect(cronFields[4].name).toBe("dayOfWeek");
    });

    it("필드 범위 확인", () => {
      expect(cronFields[0]).toMatchObject({ min: 0, max: 59 });
      expect(cronFields[1]).toMatchObject({ min: 0, max: 23 });
      expect(cronFields[2]).toMatchObject({ min: 1, max: 31 });
      expect(cronFields[3]).toMatchObject({ min: 1, max: 12 });
      expect(cronFields[4]).toMatchObject({ min: 0, max: 6 });
    });
  });

  // ============================================
  // cronPresets
  // ============================================
  describe("cronPresets", () => {
    it("프리셋 개수 확인", () => {
      expect(cronPresets.length).toBeGreaterThan(0);
    });

    it("각 프리셋에 label과 expression 존재", () => {
      cronPresets.forEach((preset) => {
        expect(preset.label).toBeTruthy();
        expect(preset.expression).toBeTruthy();
      });
    });

    it("프리셋 표현식 유효성", () => {
      cronPresets.forEach((preset) => {
        const result = validateCronExpression(preset.expression);
        expect(result.valid).toBe(true);
      });
    });
  });

  // ============================================
  // validateCronField
  // ============================================
  describe("validateCronField", () => {
    const minuteField = cronFields[0]; // 0-59
    const hourField = cronFields[1]; // 0-23
    const dayOfMonthField = cronFields[2]; // 1-31

    it("와일드카드 (*) 허용", () => {
      expect(validateCronField("*", minuteField)).toBe(true);
    });

    it("유효한 숫자 허용", () => {
      expect(validateCronField("0", minuteField)).toBe(true);
      expect(validateCronField("30", minuteField)).toBe(true);
      expect(validateCronField("59", minuteField)).toBe(true);
    });

    it("범위 외 숫자 거부", () => {
      expect(validateCronField("60", minuteField)).toBe(false);
      expect(validateCronField("-1", minuteField)).toBe(false);
      expect(validateCronField("0", dayOfMonthField)).toBe(false); // min is 1
    });

    it("범위 (n-m) 허용", () => {
      expect(validateCronField("0-30", minuteField)).toBe(true);
      expect(validateCronField("9-17", hourField)).toBe(true);
    });

    it("잘못된 범위 거부", () => {
      expect(validateCronField("30-10", minuteField)).toBe(false); // start > end
      expect(validateCronField("0-60", minuteField)).toBe(false); // end > max
    });

    it("스텝 값 (*/n) 허용", () => {
      expect(validateCronField("*/5", minuteField)).toBe(true);
      expect(validateCronField("*/15", minuteField)).toBe(true);
    });

    it("범위 스텝 (n-m/s) 허용", () => {
      expect(validateCronField("0-30/5", minuteField)).toBe(true);
    });

    it("리스트 (n,m) 허용", () => {
      expect(validateCronField("0,15,30,45", minuteField)).toBe(true);
      expect(validateCronField("1,15", dayOfMonthField)).toBe(true);
    });

    it("잘못된 리스트 거부", () => {
      expect(validateCronField("0,60", minuteField)).toBe(false);
    });

    it("유효하지 않은 값 거부", () => {
      expect(validateCronField("abc", minuteField)).toBe(false);
      expect(validateCronField("", minuteField)).toBe(false);
    });
  });

  // ============================================
  // validateCronExpression
  // ============================================
  describe("validateCronExpression", () => {
    it("유효한 5필드 표현식", () => {
      expect(validateCronExpression("* * * * *").valid).toBe(true);
      expect(validateCronExpression("0 0 * * *").valid).toBe(true);
      expect(validateCronExpression("*/5 * * * *").valid).toBe(true);
      expect(validateCronExpression("0 9 * * 1-5").valid).toBe(true);
    });

    it("유효한 6필드 표현식 (초 포함)", () => {
      expect(validateCronExpression("0 * * * * *").valid).toBe(true);
      expect(validateCronExpression("30 0 12 * * *").valid).toBe(true);
    });

    it("빈 표현식 거부", () => {
      const result = validateCronExpression("");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("빈");
    });

    it("필드 수 오류", () => {
      expect(validateCronExpression("* * *").valid).toBe(false);
      expect(validateCronExpression("* * * *").valid).toBe(false);
      expect(validateCronExpression("* * * * * * *").valid).toBe(false);
    });

    it("잘못된 필드 값", () => {
      const result = validateCronExpression("60 * * * *");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("minute");
    });
  });

  // ============================================
  // parseCronExpression
  // ============================================
  describe("parseCronExpression", () => {
    it("5필드 표현식 파싱", () => {
      const result = parseCronExpression("0 12 1 * *");
      expect(result).toEqual({
        minute: "0",
        hour: "12",
        dayOfMonth: "1",
        month: "*",
        dayOfWeek: "*",
      });
    });

    it("6필드 표현식 파싱 (초 필드 제외)", () => {
      const result = parseCronExpression("0 30 12 * * *");
      expect(result).toEqual({
        minute: "30",
        hour: "12",
        dayOfMonth: "*",
        month: "*",
        dayOfWeek: "*",
      });
    });

    it("공백 정규화", () => {
      const result = parseCronExpression("  0   12   1   *   *  ");
      expect(result).not.toBeNull();
      expect(result?.minute).toBe("0");
    });

    it("잘못된 필드 수 null 반환", () => {
      expect(parseCronExpression("* * *")).toBeNull();
      expect(parseCronExpression("* * * * * * *")).toBeNull();
    });
  });

  // ============================================
  // buildCronExpression
  // ============================================
  describe("buildCronExpression", () => {
    it("필드에서 표현식 생성", () => {
      const result = buildCronExpression({
        minute: "0",
        hour: "12",
        dayOfMonth: "*",
        month: "*",
        dayOfWeek: "1-5",
      });
      expect(result).toBe("0 12 * * 1-5");
    });

    it("와일드카드 표현식", () => {
      const result = buildCronExpression({
        minute: "*",
        hour: "*",
        dayOfMonth: "*",
        month: "*",
        dayOfWeek: "*",
      });
      expect(result).toBe("* * * * *");
    });
  });

  // ============================================
  // getSimpleDescription
  // ============================================
  describe("getSimpleDescription", () => {
    it("프리셋 매칭", () => {
      expect(getSimpleDescription("* * * * *")).toBe("매분");
      expect(getSimpleDescription("0 * * * *")).toBe("매시간");
      expect(getSimpleDescription("0 0 * * *")).toBe("매일 자정");
    });

    it("N분마다 패턴", () => {
      expect(getSimpleDescription("*/5 * * * *")).toBe("매 5분");
      expect(getSimpleDescription("*/15 * * * *")).toBe("15분마다");
    });

    it("매시간 N분 패턴", () => {
      expect(getSimpleDescription("30 * * * *")).toBe("매시간 30분에");
    });

    it("매일 특정 시간 패턴", () => {
      expect(getSimpleDescription("0 9 * * *")).toBe("매일 9시 0분에");
      expect(getSimpleDescription("30 14 * * *")).toBe("매일 14시 30분에");
    });

    it("복잡한 패턴은 null", () => {
      expect(getSimpleDescription("0 9 1 * *")).toBeNull(); // 매월 1일
      expect(getSimpleDescription("0 9 * * 1")).toBeNull(); // 매주 월요일
    });

    it("잘못된 표현식은 null", () => {
      expect(getSimpleDescription("invalid")).toBeNull();
      expect(getSimpleDescription("")).toBeNull();
    });
  });
});
