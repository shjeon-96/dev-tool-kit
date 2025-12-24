import { describe, it, expect } from "vitest";
import {
  escapeWifiString,
  generateWifiString,
  generateVCardString,
  isValidUrl,
  isValidEmail,
  getQrCapacity,
  isContentTooLarge,
} from "./encode";

describe("QR Encode Utils", () => {
  // ============================================
  // escapeWifiString
  // ============================================
  describe("escapeWifiString", () => {
    it("특수문자 이스케이프", () => {
      expect(escapeWifiString("test;password")).toBe("test\\;password");
      expect(escapeWifiString("my:wifi")).toBe("my\\:wifi");
      expect(escapeWifiString('quote"test')).toBe('quote\\"test');
    });

    it("일반 문자열은 변경 없음", () => {
      expect(escapeWifiString("MyWiFi123")).toBe("MyWiFi123");
    });

    it("복합 특수문자 이스케이프", () => {
      expect(escapeWifiString('a;b:c"d')).toBe('a\\;b\\:c\\"d');
    });

    it("빈 문자열 처리", () => {
      expect(escapeWifiString("")).toBe("");
    });
  });

  // ============================================
  // generateWifiString
  // ============================================
  describe("generateWifiString", () => {
    it("기본 WPA WiFi 문자열 생성", () => {
      const result = generateWifiString({
        ssid: "MyNetwork",
        password: "mypassword",
        encryption: "WPA",
        hidden: false,
      });
      expect(result).toBe("WIFI:T:WPA;S:MyNetwork;P:mypassword;H:false;;");
    });

    it("WEP 암호화", () => {
      const result = generateWifiString({
        ssid: "OldNetwork",
        password: "wepkey",
        encryption: "WEP",
        hidden: false,
      });
      expect(result).toContain("T:WEP");
    });

    it("비밀번호 없는 개방형 네트워크", () => {
      const result = generateWifiString({
        ssid: "OpenWifi",
        password: "",
        encryption: "nopass",
        hidden: false,
      });
      expect(result).toBe("WIFI:T:nopass;S:OpenWifi;P:;H:false;;");
    });

    it("숨겨진 네트워크", () => {
      const result = generateWifiString({
        ssid: "HiddenNet",
        password: "secret",
        encryption: "WPA",
        hidden: true,
      });
      expect(result).toContain("H:true");
    });

    it("특수문자 포함 SSID 이스케이프", () => {
      const result = generateWifiString({
        ssid: "My;Network",
        password: "pass:word",
        encryption: "WPA",
        hidden: false,
      });
      expect(result).toContain("S:My\\;Network");
      expect(result).toContain("P:pass\\:word");
    });
  });

  // ============================================
  // generateVCardString
  // ============================================
  describe("generateVCardString", () => {
    it("기본 vCard 문자열 생성", () => {
      const result = generateVCardString({
        firstName: "John",
        lastName: "Doe",
        phone: "+1-234-567-8900",
        email: "john@example.com",
        organization: "Acme Inc",
      });

      expect(result).toContain("BEGIN:VCARD");
      expect(result).toContain("VERSION:3.0");
      expect(result).toContain("N:Doe;John");
      expect(result).toContain("FN:John Doe");
      expect(result).toContain("TEL:+1-234-567-8900");
      expect(result).toContain("EMAIL:john@example.com");
      expect(result).toContain("ORG:Acme Inc");
      expect(result).toContain("END:VCARD");
    });

    it("빈 필드 처리", () => {
      const result = generateVCardString({
        firstName: "Jane",
        lastName: "",
        phone: "",
        email: "",
        organization: "",
      });

      expect(result).toContain("FN:Jane");
      expect(result).toContain("N:;Jane");
    });

    it("한글 이름 지원", () => {
      const result = generateVCardString({
        firstName: "길동",
        lastName: "홍",
        phone: "010-1234-5678",
        email: "hong@example.com",
        organization: "테스트 회사",
      });

      expect(result).toContain("FN:길동 홍");
      expect(result).toContain("N:홍;길동");
    });
  });

  // ============================================
  // isValidUrl
  // ============================================
  describe("isValidUrl", () => {
    it("유효한 HTTP URL", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com")).toBe(true);
      expect(isValidUrl("https://example.com/path?query=1")).toBe(true);
    });

    it("유효하지 않은 URL", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("example.com")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });

    it("기타 프로토콜", () => {
      expect(isValidUrl("ftp://files.example.com")).toBe(true);
      expect(isValidUrl("mailto:test@example.com")).toBe(true);
    });
  });

  // ============================================
  // isValidEmail
  // ============================================
  describe("isValidEmail", () => {
    it("유효한 이메일", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.kr")).toBe(true);
      expect(isValidEmail("user+tag@example.org")).toBe(true);
    });

    it("유효하지 않은 이메일", () => {
      expect(isValidEmail("not-an-email")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("user @example.com")).toBe(false);
    });
  });

  // ============================================
  // getQrCapacity
  // ============================================
  describe("getQrCapacity", () => {
    it("L 레벨 용량", () => {
      const capacity = getQrCapacity("L");
      expect(capacity.numeric).toBe(7089);
      expect(capacity.alphanumeric).toBe(4296);
      expect(capacity.binary).toBe(2953);
    });

    it("M 레벨 용량", () => {
      const capacity = getQrCapacity("M");
      expect(capacity.binary).toBe(2331);
    });

    it("H 레벨 용량 (가장 낮음)", () => {
      const capacity = getQrCapacity("H");
      expect(capacity.binary).toBe(1273);
    });

    it("오류 정정 레벨 증가 시 용량 감소", () => {
      const l = getQrCapacity("L");
      const m = getQrCapacity("M");
      const q = getQrCapacity("Q");
      const h = getQrCapacity("H");

      expect(l.binary).toBeGreaterThan(m.binary);
      expect(m.binary).toBeGreaterThan(q.binary);
      expect(q.binary).toBeGreaterThan(h.binary);
    });
  });

  // ============================================
  // isContentTooLarge
  // ============================================
  describe("isContentTooLarge", () => {
    it("짧은 콘텐츠는 false", () => {
      expect(isContentTooLarge("Hello World", "L")).toBe(false);
      expect(isContentTooLarge("https://example.com", "H")).toBe(false);
    });

    it("매우 긴 콘텐츠는 true", () => {
      const longContent = "a".repeat(3000);
      expect(isContentTooLarge(longContent, "L")).toBe(true);
      expect(isContentTooLarge(longContent, "H")).toBe(true);
    });

    it("경계값 테스트", () => {
      // H 레벨 한계: 1273 bytes
      const nearLimit = "a".repeat(1270);
      expect(isContentTooLarge(nearLimit, "H")).toBe(false);

      const overLimit = "a".repeat(1280);
      expect(isContentTooLarge(overLimit, "H")).toBe(true);
    });

    it("한글 멀티바이트 처리", () => {
      // 한글은 3바이트
      const koreanText = "안녕하세요".repeat(100); // 500자 = ~1500 bytes
      expect(isContentTooLarge(koreanText, "H")).toBe(true);
      expect(isContentTooLarge(koreanText, "L")).toBe(false);
    });
  });
});
