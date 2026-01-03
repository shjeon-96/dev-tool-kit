import { describe, it, expect, vi } from "vitest";
import {
  ok,
  err,
  isOk,
  isErr,
  unwrap,
  unwrapOr,
  map,
  mapErr,
  flatMap,
  tryCatch,
  tryCatchAsync,
  combine,
  match,
} from "./result";

describe("Result Pattern", () => {
  describe("ok", () => {
    it("should create a success result", () => {
      const result = ok(42);
      expect(result.ok).toBe(true);
      expect(result.value).toBe(42);
    });

    it("should work with objects", () => {
      const data = { id: "123", name: "Test" };
      const result = ok(data);
      expect(result.ok).toBe(true);
      expect(result.value).toEqual(data);
    });

    it("should work with null/undefined", () => {
      expect(ok(null).value).toBeNull();
      expect(ok(undefined).value).toBeUndefined();
    });
  });

  describe("err", () => {
    it("should create an error result", () => {
      const error = new Error("Something went wrong");
      const result = err(error);
      expect(result.ok).toBe(false);
      expect(result.error).toBe(error);
    });

    it("should work with custom error types", () => {
      const customError = { code: "NOT_FOUND", message: "Not found" };
      const result = err(customError);
      expect(result.ok).toBe(false);
      expect(result.error).toEqual(customError);
    });
  });

  describe("isOk / isErr", () => {
    it("should correctly identify Ok results", () => {
      const success = ok("value");
      const failure = err(new Error("error"));

      expect(isOk(success)).toBe(true);
      expect(isOk(failure)).toBe(false);
    });

    it("should correctly identify Err results", () => {
      const success = ok("value");
      const failure = err(new Error("error"));

      expect(isErr(success)).toBe(false);
      expect(isErr(failure)).toBe(true);
    });
  });

  describe("unwrap", () => {
    it("should return value for Ok", () => {
      const result = ok(42);
      expect(unwrap(result)).toBe(42);
    });

    it("should throw for Err", () => {
      const error = new Error("Test error");
      const result = err(error);
      expect(() => unwrap(result)).toThrow(error);
    });
  });

  describe("unwrapOr", () => {
    it("should return value for Ok", () => {
      const result = ok(42);
      expect(unwrapOr(result, 0)).toBe(42);
    });

    it("should return default for Err", () => {
      const result = err(new Error("error"));
      expect(unwrapOr(result, 0)).toBe(0);
    });
  });

  describe("map", () => {
    it("should transform Ok value", () => {
      const result = ok(5);
      const mapped = map(result, (x) => x * 2);
      expect(mapped.ok).toBe(true);
      if (mapped.ok) {
        expect(mapped.value).toBe(10);
      }
    });

    it("should pass through Err unchanged", () => {
      const error = new Error("error");
      const result = err(error);
      const mapped = map(result, (x: number) => x * 2);
      expect(mapped.ok).toBe(false);
      if (!mapped.ok) {
        expect(mapped.error).toBe(error);
      }
    });
  });

  describe("mapErr", () => {
    it("should transform Err value", () => {
      const result = err("original error");
      const mapped = mapErr(result, (e) => new Error(e));
      expect(mapped.ok).toBe(false);
      if (!mapped.ok) {
        expect(mapped.error).toBeInstanceOf(Error);
        expect(mapped.error.message).toBe("original error");
      }
    });

    it("should pass through Ok unchanged", () => {
      const result = ok(42);
      const mapped = mapErr(result, (e: string) => new Error(e));
      expect(mapped.ok).toBe(true);
      if (mapped.ok) {
        expect(mapped.value).toBe(42);
      }
    });
  });

  describe("flatMap", () => {
    it("should chain successful operations", () => {
      const result = ok(5);
      const chained = flatMap(result, (x) => ok(x * 2));
      expect(chained.ok).toBe(true);
      if (chained.ok) {
        expect(chained.value).toBe(10);
      }
    });

    it("should short-circuit on Err input", () => {
      const error = new Error("first error");
      const result = err(error);
      const chained = flatMap(result, () => ok(10));
      expect(chained.ok).toBe(false);
      if (!chained.ok) {
        expect(chained.error).toBe(error);
      }
    });

    it("should propagate Err from inner function", () => {
      const result = ok(5);
      const innerError = new Error("inner error");
      const chained = flatMap(result, () => err(innerError));
      expect(chained.ok).toBe(false);
      if (!chained.ok) {
        expect(chained.error).toBe(innerError);
      }
    });
  });

  describe("tryCatch", () => {
    it("should return Ok for successful operations", () => {
      const result = tryCatch(() => 42);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBe(42);
      }
    });

    it("should return Err for throwing operations", () => {
      const error = new Error("thrown error");
      const result = tryCatch(() => {
        throw error;
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(error);
      }
    });

    it("should use custom error mapper", () => {
      const result = tryCatch(
        () => {
          throw new Error("original");
        },
        (e) => ({ code: "CUSTOM", original: e }),
      );
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe("CUSTOM");
      }
    });
  });

  describe("tryCatchAsync", () => {
    it("should return Ok for successful async operations", async () => {
      const result = await tryCatchAsync(async () => {
        return Promise.resolve(42);
      });
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBe(42);
      }
    });

    it("should return Err for rejected promises", async () => {
      const error = new Error("async error");
      const result = await tryCatchAsync(async () => {
        throw error;
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(error);
      }
    });

    it("should use custom error mapper for async", async () => {
      const result = await tryCatchAsync(
        async () => {
          throw new Error("original");
        },
        (e) => ({ code: "ASYNC_ERROR", original: e }),
      );
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe("ASYNC_ERROR");
      }
    });
  });

  describe("combine", () => {
    it("should combine all Ok results", () => {
      const results = [ok(1), ok(2), ok(3)];
      const combined = combine(results);
      expect(combined.ok).toBe(true);
      if (combined.ok) {
        expect(combined.value).toEqual([1, 2, 3]);
      }
    });

    it("should return first Err", () => {
      const error1 = new Error("first");
      const error2 = new Error("second");
      const results = [ok(1), err(error1), ok(3), err(error2)];
      const combined = combine(results);
      expect(combined.ok).toBe(false);
      if (!combined.ok) {
        expect(combined.error).toBe(error1);
      }
    });

    it("should handle empty array", () => {
      const results: ReturnType<typeof ok<number>>[] = [];
      const combined = combine(results);
      expect(combined.ok).toBe(true);
      if (combined.ok) {
        expect(combined.value).toEqual([]);
      }
    });
  });

  describe("match", () => {
    it("should call ok handler for Ok", () => {
      const okHandler = vi.fn((x: number) => x * 2);
      const errHandler = vi.fn(() => 0);

      const result = match(ok(5), { ok: okHandler, err: errHandler });

      expect(result).toBe(10);
      expect(okHandler).toHaveBeenCalledWith(5);
      expect(errHandler).not.toHaveBeenCalled();
    });

    it("should call err handler for Err", () => {
      const error = new Error("test");
      const okHandler = vi.fn(() => 0);
      const errHandler = vi.fn((e: Error) => e.message.length);

      const result = match(err(error), { ok: okHandler, err: errHandler });

      expect(result).toBe(4); // "test".length
      expect(okHandler).not.toHaveBeenCalled();
      expect(errHandler).toHaveBeenCalledWith(error);
    });

    it("should work with different return types", () => {
      const result1 = match(ok(42), {
        ok: (x) => `Value: ${x}`,
        err: () => "Error occurred",
      });
      expect(result1).toBe("Value: 42");

      const result2 = match(err(new Error("fail")), {
        ok: () => "Success",
        err: (e) => `Error: ${e.message}`,
      });
      expect(result2).toBe("Error: fail");
    });
  });
});
