import { describe, it, expect } from "vitest";
import { convertCase, caseOptions, type CaseType } from "./converter";

describe("convertCase", () => {
  describe("basic cases", () => {
    it("converts to lowercase", () => {
      const result = convertCase("Hello World", "lower");
      expect(result.success).toBe(true);
      expect(result.output).toBe("hello world");
    });

    it("converts to uppercase", () => {
      const result = convertCase("Hello World", "upper");
      expect(result.success).toBe(true);
      expect(result.output).toBe("HELLO WORLD");
    });

    it("converts to title case", () => {
      const result = convertCase("hello world", "title");
      expect(result.success).toBe(true);
      expect(result.output).toBe("Hello World");
    });

    it("converts to sentence case", () => {
      const result = convertCase("hello world. this is test.", "sentence");
      expect(result.success).toBe(true);
      expect(result.output).toBe("Hello world. This is test.");
    });
  });

  describe("programming cases", () => {
    it("converts to camelCase", () => {
      const result = convertCase("hello world", "camel");
      expect(result.success).toBe(true);
      expect(result.output).toBe("helloWorld");
    });

    it("converts to PascalCase", () => {
      const result = convertCase("hello world", "pascal");
      expect(result.success).toBe(true);
      expect(result.output).toBe("HelloWorld");
    });

    it("converts to snake_case", () => {
      const result = convertCase("hello world", "snake");
      expect(result.success).toBe(true);
      expect(result.output).toBe("hello_world");
    });

    it("converts to kebab-case", () => {
      const result = convertCase("hello world", "kebab");
      expect(result.success).toBe(true);
      expect(result.output).toBe("hello-world");
    });

    it("converts to CONSTANT_CASE", () => {
      const result = convertCase("hello world", "constant");
      expect(result.success).toBe(true);
      expect(result.output).toBe("HELLO_WORLD");
    });

    it("converts to dot.case", () => {
      const result = convertCase("hello world", "dot");
      expect(result.success).toBe(true);
      expect(result.output).toBe("hello.world");
    });

    it("converts to path/case", () => {
      const result = convertCase("hello world", "path");
      expect(result.success).toBe(true);
      expect(result.output).toBe("hello/world");
    });
  });

  describe("special cases", () => {
    it("reverses text", () => {
      const result = convertCase("hello", "reverse");
      expect(result.success).toBe(true);
      expect(result.output).toBe("olleh");
    });

    it("handles existing camelCase input", () => {
      const result = convertCase("helloWorld", "snake");
      expect(result.success).toBe(true);
      expect(result.output).toBe("hello_world");
    });

    it("handles existing snake_case input", () => {
      const result = convertCase("hello_world", "camel");
      expect(result.success).toBe(true);
      expect(result.output).toBe("helloWorld");
    });

    it("handles kebab-case input", () => {
      const result = convertCase("hello-world", "pascal");
      expect(result.success).toBe(true);
      expect(result.output).toBe("HelloWorld");
    });
  });

  describe("error handling", () => {
    it("returns error for empty input", () => {
      const result = convertCase("", "lower");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Please enter text to convert");
    });

    it("returns error for whitespace only input", () => {
      const result = convertCase("   ", "lower");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Please enter text to convert");
    });
  });
});

describe("caseOptions", () => {
  it("has all 12 case types", () => {
    expect(caseOptions).toHaveLength(12);
  });

  it("includes all case types", () => {
    const types: CaseType[] = [
      "lower",
      "upper",
      "title",
      "sentence",
      "camel",
      "pascal",
      "snake",
      "kebab",
      "constant",
      "dot",
      "path",
      "reverse",
    ];
    types.forEach((type) => {
      expect(caseOptions.find((opt) => opt.type === type)).toBeDefined();
    });
  });

  it("has labels and examples for all options", () => {
    caseOptions.forEach((option) => {
      expect(option.label).toBeTruthy();
      expect(option.example).toBeTruthy();
    });
  });
});
