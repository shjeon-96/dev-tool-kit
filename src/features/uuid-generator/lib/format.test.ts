import { describe, it, expect } from "vitest";
import {
  formatId,
  isValidUuidV4,
  isValidUuidV1,
  isValidUlid,
  detectIdType,
  parseUuid,
} from "./format";

describe("UUID Format Utils", () => {
  // ============================================
  // formatId
  // ============================================
  describe("formatId", () => {
    const sampleUuid = "550e8400-e29b-41d4-a716-446655440000";

    it("기본 옵션으로 원본 반환", () => {
      const result = formatId(sampleUuid, {
        uppercase: false,
        noDashes: false,
      });
      expect(result).toBe(sampleUuid);
    });

    it("대문자 변환", () => {
      const result = formatId(sampleUuid, {
        uppercase: true,
        noDashes: false,
      });
      expect(result).toBe("550E8400-E29B-41D4-A716-446655440000");
    });

    it("대시 제거", () => {
      const result = formatId(sampleUuid, {
        uppercase: false,
        noDashes: true,
      });
      expect(result).toBe("550e8400e29b41d4a716446655440000");
    });

    it("대문자 + 대시 제거", () => {
      const result = formatId(sampleUuid, {
        uppercase: true,
        noDashes: true,
      });
      expect(result).toBe("550E8400E29B41D4A716446655440000");
    });

    it("ULID 대문자 변환", () => {
      const ulid = "01arZ3ndektsv4rrffq69g5fav";
      const result = formatId(ulid, {
        uppercase: true,
        noDashes: false,
      });
      expect(result).toBe("01ARZ3NDEKTSV4RRFFQ69G5FAV");
    });
  });

  // ============================================
  // isValidUuidV4
  // ============================================
  describe("isValidUuidV4", () => {
    it("유효한 UUID v4 인식", () => {
      expect(isValidUuidV4("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
      expect(isValidUuidV4("f47ac10b-58cc-4372-a567-0e02b2c3d479")).toBe(true);
    });

    it("UUID v1 거부", () => {
      expect(isValidUuidV4("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBe(false);
    });

    it("잘못된 형식 거부", () => {
      expect(isValidUuidV4("not-a-uuid")).toBe(false);
      expect(isValidUuidV4("")).toBe(false);
      expect(isValidUuidV4("550e8400e29b41d4a716446655440000")).toBe(false); // 대시 없음
    });

    it("대소문자 무관", () => {
      expect(isValidUuidV4("550E8400-E29B-41D4-A716-446655440000")).toBe(true);
    });
  });

  // ============================================
  // isValidUuidV1
  // ============================================
  describe("isValidUuidV1", () => {
    it("유효한 UUID v1 인식", () => {
      expect(isValidUuidV1("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBe(true);
    });

    it("UUID v4 거부", () => {
      expect(isValidUuidV1("550e8400-e29b-41d4-a716-446655440000")).toBe(false);
    });

    it("잘못된 형식 거부", () => {
      expect(isValidUuidV1("not-a-uuid")).toBe(false);
      expect(isValidUuidV1("")).toBe(false);
    });
  });

  // ============================================
  // isValidUlid
  // ============================================
  describe("isValidUlid", () => {
    it("유효한 ULID 인식", () => {
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAV")).toBe(true);
      expect(isValidUlid("01arZ3ndektsv4rrffq69g5fav")).toBe(true);
    });

    it("잘못된 길이 거부", () => {
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FA")).toBe(false); // 25자
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAVX")).toBe(false); // 27자
    });

    it("잘못된 문자 거부 (I, L, O, U 포함)", () => {
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAI")).toBe(false);
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAL")).toBe(false);
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAO")).toBe(false);
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAU")).toBe(false);
    });

    it("빈 문자열 거부", () => {
      expect(isValidUlid("")).toBe(false);
    });
  });

  // ============================================
  // detectIdType
  // ============================================
  describe("detectIdType", () => {
    it("UUID v4 감지", () => {
      expect(detectIdType("550e8400-e29b-41d4-a716-446655440000")).toBe(
        "uuid-v4",
      );
    });

    it("UUID v1 감지", () => {
      expect(detectIdType("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBe(
        "uuid-v1",
      );
    });

    it("ULID 감지", () => {
      expect(detectIdType("01ARZ3NDEKTSV4RRFFQ69G5FAV")).toBe("ulid");
    });

    it("알 수 없는 형식", () => {
      expect(detectIdType("not-an-id")).toBe("unknown");
      expect(detectIdType("")).toBe("unknown");
    });
  });

  // ============================================
  // parseUuid
  // ============================================
  describe("parseUuid", () => {
    it("UUID 컴포넌트 파싱", () => {
      const result = parseUuid("550e8400-e29b-41d4-a716-446655440000");
      expect(result).toEqual({
        timeLow: "550e8400",
        timeMid: "e29b",
        timeHiAndVersion: "41d4",
        clockSeqHiAndRes: "a7",
        clockSeqLow: "16",
        node: "446655440000",
      });
    });

    it("잘못된 형식은 null 반환", () => {
      expect(parseUuid("not-a-uuid")).toBeNull();
      expect(parseUuid("550e8400e29b41d4a716446655440000")).toBeNull();
      expect(parseUuid("")).toBeNull();
    });
  });
});
