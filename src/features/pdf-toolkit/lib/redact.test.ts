import { describe, it, expect } from "vitest";
import { REDACT_PATTERNS } from "./redact";

describe("PDF Redact", () => {
  describe("REDACT_PATTERNS", () => {
    describe("creditCard pattern", () => {
      const pattern = REDACT_PATTERNS.creditCard;

      it("should have correct configuration", () => {
        expect(pattern.id).toBe("creditCard");
        expect(pattern.label).toBe("Credit Card");
        expect(pattern.enabled).toBe(true);
      });

      it("should match Visa card (16 digits)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("4111111111111111".match(regex)).toBeTruthy();
        expect("4012888888881881".match(regex)).toBeTruthy();
      });

      it("should match Visa card (13 digits)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("4111111111111".match(regex)).toBeTruthy();
      });

      it("should match MasterCard", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("5111111111111118".match(regex)).toBeTruthy();
        expect("5500000000000004".match(regex)).toBeTruthy();
      });

      it("should match American Express (15 digits)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("371449635398431".match(regex)).toBeTruthy();
        expect("378282246310005".match(regex)).toBeTruthy();
      });

      it("should match Discover card", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("6011111111111117".match(regex)).toBeTruthy();
        expect("6500000000000002".match(regex)).toBeTruthy();
      });

      it("should not match random numbers", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("1234567890123456".match(regex)).toBeFalsy();
        expect("0000000000000000".match(regex)).toBeFalsy();
      });

      it("should not match short numbers", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("411111111111".match(regex)).toBeFalsy(); // 12 digits
        expect("41111111".match(regex)).toBeFalsy(); // 8 digits
      });

      it("should match card in text", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        const text = "Card number is 4111111111111111 please";
        const matches = text.match(regex);
        expect(matches).toContain("4111111111111111");
      });
    });

    describe("ssn pattern", () => {
      const pattern = REDACT_PATTERNS.ssn;

      it("should have correct configuration", () => {
        expect(pattern.id).toBe("ssn");
        expect(pattern.label).toContain("SSN");
        expect(pattern.enabled).toBe(true);
      });

      it("should match US SSN format (XXX-XX-XXXX)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("123-45-6789".match(regex)).toBeTruthy();
        expect("000-00-0000".match(regex)).toBeTruthy();
        expect("999-99-9999".match(regex)).toBeTruthy();
      });

      it("should match Korean RRN format (XXXXXX-XXXXXXX)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("900101-1234567".match(regex)).toBeTruthy();
        expect("850515-2345678".match(regex)).toBeTruthy();
      });

      it("should match Korean RRN with valid gender digits (1-4)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("900101-1234567".match(regex)).toBeTruthy(); // Male born before 2000
        expect("900101-2234567".match(regex)).toBeTruthy(); // Female born before 2000
        expect("900101-3234567".match(regex)).toBeTruthy(); // Male born after 2000
        expect("900101-4234567".match(regex)).toBeTruthy(); // Female born after 2000
      });

      it("should not match invalid formats", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("123-456-789".match(regex)).toBeFalsy();
        expect("1234-5678".match(regex)).toBeFalsy();
        expect("123456789".match(regex)).toBeFalsy();
      });

      it("should match SSN in text", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        const text = "SSN: 123-45-6789 is the number";
        const matches = text.match(regex);
        expect(matches).toContain("123-45-6789");
      });
    });

    describe("phone pattern", () => {
      const pattern = REDACT_PATTERNS.phone;

      it("should have correct configuration", () => {
        expect(pattern.id).toBe("phone");
        expect(pattern.label).toBe("Phone Number");
        expect(pattern.enabled).toBe(false); // disabled by default
      });

      it("should match Korean mobile format (010-XXXX-XXXX)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("010-1234-5678".match(regex)).toBeTruthy();
        expect("010-123-4567".match(regex)).toBeTruthy();
      });

      it("should match Korean landline format (02-XXXX-XXXX)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("02-1234-5678".match(regex)).toBeTruthy();
        expect("031-123-4567".match(regex)).toBeTruthy();
      });

      it("should match Korean format with +82", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("+82-10-1234-5678".match(regex)).toBeTruthy();
        expect("+82 10 1234 5678".match(regex)).toBeTruthy();
      });

      it("should match US phone format (XXX-XXX-XXXX)", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("123-456-7890".match(regex)).toBeTruthy();
        expect("555-123-4567".match(regex)).toBeTruthy();
      });

      it("should match phone with dots", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("123.456.7890".match(regex)).toBeTruthy();
      });

      it("should match phone with spaces", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("123 456 7890".match(regex)).toBeTruthy();
      });
    });

    describe("email pattern", () => {
      const pattern = REDACT_PATTERNS.email;

      it("should have correct configuration", () => {
        expect(pattern.id).toBe("email");
        expect(pattern.label).toBe("Email Address");
        expect(pattern.enabled).toBe(false); // disabled by default
      });

      it("should match simple email", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("test@example.com".match(regex)).toBeTruthy();
        expect("user@domain.org".match(regex)).toBeTruthy();
      });

      it("should match email with dots in local part", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("first.last@example.com".match(regex)).toBeTruthy();
        expect("user.name.here@domain.com".match(regex)).toBeTruthy();
      });

      it("should match email with special characters", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("user+tag@example.com".match(regex)).toBeTruthy();
        expect("user_name@example.com".match(regex)).toBeTruthy();
        expect("user-name@example.com".match(regex)).toBeTruthy();
        expect("user%tag@example.com".match(regex)).toBeTruthy();
      });

      it("should match email with subdomain", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("user@mail.example.com".match(regex)).toBeTruthy();
        expect("user@sub.domain.co.kr".match(regex)).toBeTruthy();
      });

      it("should match email with numbers", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("user123@example.com".match(regex)).toBeTruthy();
        expect("123@456.com".match(regex)).toBeTruthy();
      });

      it("should match various TLDs", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("user@example.io".match(regex)).toBeTruthy();
        expect("user@example.co.uk".match(regex)).toBeTruthy();
        expect("user@example.kr".match(regex)).toBeTruthy();
      });

      it("should not match invalid emails", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("@example.com".match(regex)).toBeFalsy();
        expect("user@".match(regex)).toBeFalsy();
        expect("user@.com".match(regex)).toBeFalsy();
        expect("user@domain".match(regex)).toBeFalsy(); // no TLD
      });

      it("should match email in text", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        const text = "Contact us at support@example.com for help";
        const matches = text.match(regex);
        expect(matches).toContain("support@example.com");
      });
    });

    describe("custom pattern", () => {
      const pattern = REDACT_PATTERNS.custom;

      it("should have correct configuration", () => {
        expect(pattern.id).toBe("custom");
        expect(pattern.label).toBe("Custom Keywords");
        expect(pattern.enabled).toBe(false);
      });

      it("should have a catch-all regex by default", () => {
        expect(pattern.regex.source).toBe(".*");
      });
    });

    describe("pattern structure", () => {
      it("should have all required pattern types", () => {
        expect(REDACT_PATTERNS.creditCard).toBeDefined();
        expect(REDACT_PATTERNS.ssn).toBeDefined();
        expect(REDACT_PATTERNS.phone).toBeDefined();
        expect(REDACT_PATTERNS.email).toBeDefined();
        expect(REDACT_PATTERNS.custom).toBeDefined();
      });

      it("should have consistent structure for all patterns", () => {
        const patterns = Object.values(REDACT_PATTERNS);

        patterns.forEach((pattern) => {
          expect(pattern).toHaveProperty("id");
          expect(pattern).toHaveProperty("label");
          expect(pattern).toHaveProperty("description");
          expect(pattern).toHaveProperty("regex");
          expect(pattern).toHaveProperty("enabled");

          expect(typeof pattern.id).toBe("string");
          expect(typeof pattern.label).toBe("string");
          expect(typeof pattern.description).toBe("string");
          expect(pattern.regex).toBeInstanceOf(RegExp);
          expect(typeof pattern.enabled).toBe("boolean");
        });
      });

      it("should have unique IDs", () => {
        const ids = Object.values(REDACT_PATTERNS).map((p) => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      });

      it("should have exactly 5 patterns", () => {
        const patternCount = Object.keys(REDACT_PATTERNS).length;
        expect(patternCount).toBe(5);
      });

      it("should have creditCard and ssn enabled by default", () => {
        expect(REDACT_PATTERNS.creditCard.enabled).toBe(true);
        expect(REDACT_PATTERNS.ssn.enabled).toBe(true);
      });

      it("should have phone, email, and custom disabled by default", () => {
        expect(REDACT_PATTERNS.phone.enabled).toBe(false);
        expect(REDACT_PATTERNS.email.enabled).toBe(false);
        expect(REDACT_PATTERNS.custom.enabled).toBe(false);
      });
    });
  });

  describe("regex edge cases", () => {
    describe("credit card edge cases", () => {
      const pattern = REDACT_PATTERNS.creditCard;

      it("should handle card numbers with boundaries", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        // Word boundary should work
        expect("x4111111111111111x".match(regex)).toBeFalsy();
        expect(" 4111111111111111 ".match(regex)).toBeTruthy();
      });
    });

    describe("email edge cases", () => {
      const pattern = REDACT_PATTERNS.email;

      it("should handle consecutive emails", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        const text = "a@b.com c@d.com";
        const matches = text.match(regex);
        expect(matches?.length).toBe(2);
      });

      it("should handle email in URL-like structure", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        expect("mailto:user@example.com".match(regex)).toBeTruthy();
      });
    });

    describe("SSN edge cases", () => {
      const pattern = REDACT_PATTERNS.ssn;

      it("should handle SSN with text around it", () => {
        const regex = new RegExp(pattern.regex.source, "g");
        const text = "ID:123-45-6789!";
        const matches = text.match(regex);
        expect(matches).toContain("123-45-6789");
      });
    });
  });
});
