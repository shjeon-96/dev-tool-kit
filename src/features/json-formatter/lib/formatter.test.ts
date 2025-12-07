import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, validateJson, beautifyJs } from "./formatter";

describe("JSON Formatter", () => {
  describe("formatJson", () => {
    it("formats valid JSON with default indent (2 spaces)", () => {
      const input = '{"name":"test","value":123}';
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe('{\n  "name": "test",\n  "value": 123\n}');
      expect(result.error).toBeUndefined();
    });

    it("formats valid JSON with custom indent (4 spaces)", () => {
      const input = '{"a":1}';
      const result = formatJson(input, 4);

      expect(result.success).toBe(true);
      expect(result.output).toBe('{\n    "a": 1\n}');
    });

    it("formats nested objects", () => {
      const input = '{"a":{"b":{"c":1}}}';
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toContain('"a":');
      expect(result.output).toContain('"b":');
      expect(result.output).toContain('"c": 1');
    });

    it("formats arrays", () => {
      const input = "[1,2,3]";
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe("[\n  1,\n  2,\n  3\n]");
    });

    it("returns error for invalid JSON", () => {
      const input = "{invalid json}";
      const result = formatJson(input);

      expect(result.success).toBe(false);
      expect(result.output).toBe(input);
      expect(result.error).toBeDefined();
    });

    it("handles empty object", () => {
      const input = "{}";
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe("{}");
    });

    it("handles empty array", () => {
      const input = "[]";
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe("[]");
    });

    it("handles null value", () => {
      const input = "null";
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe("null");
    });

    it("handles boolean values", () => {
      const input = '{"active":true,"deleted":false}';
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toContain('"active": true');
      expect(result.output).toContain('"deleted": false');
    });

    it("handles unicode characters", () => {
      const input = '{"name":"한글","emoji":"🚀"}';
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toContain("한글");
      expect(result.output).toContain("🚀");
    });

    it("handles escaped characters", () => {
      const input = '{"text":"line1\\nline2","path":"C:\\\\Users"}';
      const result = formatJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toContain("\\n");
      expect(result.output).toContain("\\\\");
    });
  });

  describe("minifyJson", () => {
    it("removes all whitespace from formatted JSON", () => {
      const input = '{\n  "name": "test"\n}';
      const result = minifyJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe('{"name":"test"}');
    });

    it("handles already minified JSON", () => {
      const input = '{"a":1,"b":2}';
      const result = minifyJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe('{"a":1,"b":2}');
    });

    it("minifies nested objects", () => {
      const input = `{
        "a": {
          "b": {
            "c": 1
          }
        }
      }`;
      const result = minifyJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe('{"a":{"b":{"c":1}}}');
    });

    it("returns error for invalid JSON", () => {
      const input = "not valid json";
      const result = minifyJson(input);

      expect(result.success).toBe(false);
      expect(result.output).toBe(input);
      expect(result.error).toBeDefined();
    });

    it("preserves string content with spaces", () => {
      const input = '{"message": "hello world"}';
      const result = minifyJson(input);

      expect(result.success).toBe(true);
      expect(result.output).toBe('{"message":"hello world"}');
    });
  });

  describe("validateJson", () => {
    it("returns success for valid JSON object", () => {
      const result = validateJson('{"valid":true}');

      expect(result.success).toBe(true);
      expect(result.output).toBe("Valid JSON");
      expect(result.error).toBeUndefined();
    });

    it("returns success for valid JSON array", () => {
      const result = validateJson("[1, 2, 3]");

      expect(result.success).toBe(true);
    });

    it("returns success for valid primitives", () => {
      expect(validateJson("null").success).toBe(true);
      expect(validateJson("true").success).toBe(true);
      expect(validateJson("false").success).toBe(true);
      expect(validateJson("123").success).toBe(true);
      expect(validateJson('"string"').success).toBe(true);
    });

    it("returns error for invalid JSON", () => {
      const result = validateJson("{invalid}");

      expect(result.success).toBe(false);
      expect(result.output).toBe("");
      expect(result.error).toBeDefined();
    });

    it("returns error for trailing comma", () => {
      const result = validateJson('{"a": 1,}');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns error for single quotes", () => {
      const result = validateJson("{'key': 'value'}");

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns error for unquoted keys", () => {
      const result = validateJson("{key: 'value'}");

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns error for empty input", () => {
      const result = validateJson("");

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("beautifyJs", () => {
    it("beautifies JavaScript code", () => {
      const input = "function test(){return 1;}";
      const result = beautifyJs(input);

      expect(result.success).toBe(true);
      expect(result.output).toContain("function test()");
      expect(result.output).toContain("return 1;");
    });

    it("applies 2-space indentation", () => {
      const input = "if(a){b=1;}";
      const result = beautifyJs(input);

      expect(result.success).toBe(true);
      // Check for proper indentation
      expect(result.output).toMatch(/\n {2}/);
    });

    it("handles arrow functions", () => {
      const input = "const fn = () => {return 1;}";
      const result = beautifyJs(input);

      expect(result.success).toBe(true);
      expect(result.output).toContain("=>");
    });

    it("handles object literals", () => {
      const input = "const obj = {a:1,b:2};";
      const result = beautifyJs(input);

      expect(result.success).toBe(true);
      expect(result.output).toContain("a:");
      expect(result.output).toContain("b:");
    });

    it("formats already beautified code consistently", () => {
      const input = "function test() {\n  return 1;\n}";
      const result = beautifyJs(input);

      expect(result.success).toBe(true);
    });
  });
});
