import { describe, it, expect } from "vitest";
import { jsonToTypescript } from "./converter";
import type { ConvertOptions } from "./converter";

describe("json-to-typescript converter", () => {
  const defaultOptions: ConvertOptions = {
    rootName: "Root",
    useInterface: true,
    optionalProperties: false,
    addExport: false,
  };

  describe("basic type conversion", () => {
    it("should convert simple object with primitive types", () => {
      const json = '{"name": "John", "age": 30, "active": true}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("interface Root");
      expect(result.output).toContain("name: string");
      expect(result.output).toContain("age: number");
      expect(result.output).toContain("active: boolean");
    });

    it("should handle null values", () => {
      const json = '{"value": null}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("value: null");
    });

    it("should handle string values", () => {
      const json = '{"message": "hello"}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("message: string");
    });

    it("should handle number values", () => {
      const json = '{"count": 42, "price": 19.99}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("count: number");
      expect(result.output).toContain("price: number");
    });

    it("should handle boolean values", () => {
      const json = '{"enabled": true, "disabled": false}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("enabled: boolean");
      expect(result.output).toContain("disabled: boolean");
    });
  });

  describe("array handling", () => {
    it("should convert simple array of primitives", () => {
      const json = '{"numbers": [1, 2, 3]}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("numbers: number[]");
    });

    it("should convert array of strings", () => {
      const json = '{"tags": ["a", "b", "c"]}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("tags: string[]");
    });

    it("should handle empty array as unknown[]", () => {
      const json = '{"items": []}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("items: unknown[]");
    });

    it("should handle mixed type array", () => {
      const json = '{"values": [1, "two", 3]}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("(number | string)[]");
    });

    it("should convert array of objects", () => {
      const json = '{"users": [{"name": "John"}, {"name": "Jane"}]}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("UsersItem");
      expect(result.output).toContain("users: UsersItem[]");
    });
  });

  describe("nested objects", () => {
    it("should convert nested object", () => {
      const json = '{"user": {"name": "John", "address": {"city": "NYC"}}}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("interface User");
      expect(result.output).toContain("interface Address");
      expect(result.output).toContain("user: User");
      expect(result.output).toContain("address: Address");
    });

    it("should handle deeply nested objects", () => {
      const json = '{"a": {"b": {"c": {"d": "value"}}}}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("interface A");
      expect(result.output).toContain("interface B");
      expect(result.output).toContain("interface C");
    });
  });

  describe("options", () => {
    it("should use custom root name", () => {
      const json = '{"name": "test"}';
      const options = { ...defaultOptions, rootName: "CustomType" };
      const result = jsonToTypescript(json, options);

      expect(result.success).toBe(true);
      expect(result.output).toContain("interface CustomType");
    });

    it("should use type instead of interface when useInterface is false", () => {
      const json = '{"name": "test"}';
      const options = { ...defaultOptions, useInterface: false };
      const result = jsonToTypescript(json, options);

      expect(result.success).toBe(true);
      expect(result.output).toContain("type Root =");
      expect(result.output).not.toContain("interface");
    });

    it("should add optional modifier when optionalProperties is true", () => {
      const json = '{"name": "test", "age": 30}';
      const options = { ...defaultOptions, optionalProperties: true };
      const result = jsonToTypescript(json, options);

      expect(result.success).toBe(true);
      expect(result.output).toContain("name?: string");
      expect(result.output).toContain("age?: number");
    });

    it("should add export keyword when addExport is true", () => {
      const json = '{"name": "test"}';
      const options = { ...defaultOptions, addExport: true };
      const result = jsonToTypescript(json, options);

      expect(result.success).toBe(true);
      expect(result.output).toContain("export interface Root");
    });

    it("should add export to nested interfaces", () => {
      const json = '{"user": {"name": "John"}}';
      const options = { ...defaultOptions, addExport: true };
      const result = jsonToTypescript(json, options);

      expect(result.success).toBe(true);
      expect(result.output).toContain("export interface User");
      expect(result.output).toContain("export interface Root");
    });
  });

  describe("special property names", () => {
    it("should quote property names with special characters", () => {
      const json = '{"my-property": "value", "another property": "value2"}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain('"my-property": string');
      expect(result.output).toContain('"another property": string');
    });

    it("should not quote valid property names", () => {
      const json =
        '{"validName": "value", "_underscore": "value", "$dollar": "value"}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("validName: string");
      expect(result.output).toContain("_underscore: string");
      expect(result.output).toContain("$dollar: string");
    });
  });

  describe("array root", () => {
    it("should handle array at root level", () => {
      const json = '[{"name": "John"}, {"name": "Jane"}]';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("RootItem");
      expect(result.output).toContain("type Root = RootItem[]");
    });

    it("should handle empty array at root level", () => {
      const json = "[]";
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("type Root = unknown[]");
    });

    it("should handle primitive array at root level", () => {
      const json = "[1, 2, 3]";
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("type Root = number[]");
    });

    it("should handle mixed primitive array at root level", () => {
      const json = '[1, "two", true]';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toMatch(/\(number \| string \| boolean\)\[\]/);
    });
  });

  describe("error handling", () => {
    it("should return error for invalid JSON", () => {
      const json = "not valid json";
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should return error for primitive JSON value", () => {
      const result1 = jsonToTypescript('"string"', defaultOptions);
      expect(result1.success).toBe(false);
      expect(result1.error).toContain("must be a JSON object or array");

      const result2 = jsonToTypescript("123", defaultOptions);
      expect(result2.success).toBe(false);

      const result3 = jsonToTypescript("true", defaultOptions);
      expect(result3.success).toBe(false);
    });

    it("should return error for null JSON", () => {
      const result = jsonToTypescript("null", defaultOptions);
      expect(result.success).toBe(false);
      expect(result.error).toContain("must be a JSON object or array");
    });

    it("should return empty output on error", () => {
      const result = jsonToTypescript("invalid", defaultOptions);
      expect(result.output).toBe("");
    });
  });

  describe("interface ordering", () => {
    it("should order nested interfaces before root", () => {
      const json = '{"user": {"profile": {"name": "John"}}}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      const lines = result.output.split("\n");
      const profileIndex = lines.findIndex((l) =>
        l.includes("interface Profile"),
      );
      const userIndex = lines.findIndex((l) => l.includes("interface User"));
      const rootIndex = lines.findIndex((l) => l.includes("interface Root"));

      expect(profileIndex).toBeLessThan(userIndex);
      expect(userIndex).toBeLessThan(rootIndex);
    });
  });

  describe("complex scenarios", () => {
    it("should handle real-world API response", () => {
      const json = JSON.stringify({
        data: {
          users: [
            { id: 1, name: "John", email: "john@example.com" },
            { id: 2, name: "Jane", email: "jane@example.com" },
          ],
          pagination: {
            page: 1,
            total: 100,
            hasNext: true,
          },
        },
        status: "success",
      });

      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("interface Root");
      expect(result.output).toContain("interface Data");
      expect(result.output).toContain("interface UsersItem");
      expect(result.output).toContain("interface Pagination");
    });

    it("should handle object with array of different object types", () => {
      const json = '{"items": [{"type": "A", "value": 1}]}';
      const result = jsonToTypescript(json, defaultOptions);

      expect(result.success).toBe(true);
      expect(result.output).toContain("ItemsItem");
    });
  });
});
