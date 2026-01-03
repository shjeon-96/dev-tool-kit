import { describe, it, expect } from "vitest";
import { AppError, isAppError, type ErrorCode } from "./app-error";

describe("AppError", () => {
  describe("constructor", () => {
    it("should create an error with required fields", () => {
      const error = new AppError("NOT_FOUND", "User not found");

      expect(error.name).toBe("AppError");
      expect(error.code).toBe("NOT_FOUND");
      expect(error.message).toBe("User not found");
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.metadata).toEqual({});
    });

    it("should create an error with metadata", () => {
      const error = new AppError("VALIDATION", "Invalid email", {
        statusCode: 400,
        context: { field: "email" },
        userMessage: "Please enter a valid email address",
      });

      expect(error.metadata.statusCode).toBe(400);
      expect(error.metadata.context).toEqual({ field: "email" });
      expect(error.metadata.userMessage).toBe(
        "Please enter a valid email address",
      );
    });

    it("should set severity based on error code", () => {
      expect(new AppError("VALIDATION", "").severity).toBe("low");
      expect(new AppError("RATE_LIMITED", "").severity).toBe("medium");
      expect(new AppError("UNAUTHORIZED", "").severity).toBe("high");
      expect(new AppError("PAYMENT_FAILED", "").severity).toBe("critical");
    });
  });

  describe("getUserMessage", () => {
    it("should return custom user message when provided", () => {
      const error = new AppError("VALIDATION", "Technical message", {
        userMessage: "User friendly message",
      });
      expect(error.getUserMessage()).toBe("User friendly message");
    });

    it("should return default message when not provided", () => {
      const error = new AppError("NOT_FOUND", "Resource not found");
      expect(error.getUserMessage()).toBe(
        "The requested resource was not found.",
      );
    });
  });

  describe("isRetryable", () => {
    it("should return metadata.retryable when set", () => {
      const retryable = new AppError("VALIDATION", "", { retryable: true });
      const notRetryable = new AppError("NETWORK_ERROR", "", {
        retryable: false,
      });

      expect(retryable.isRetryable()).toBe(true);
      expect(notRetryable.isRetryable()).toBe(false);
    });

    it("should use default retryability based on code", () => {
      expect(new AppError("NETWORK_ERROR", "").isRetryable()).toBe(true);
      expect(new AppError("TIMEOUT", "").isRetryable()).toBe(true);
      expect(new AppError("RATE_LIMITED", "").isRetryable()).toBe(true);
      expect(new AppError("VALIDATION", "").isRetryable()).toBe(false);
      expect(new AppError("NOT_FOUND", "").isRetryable()).toBe(false);
    });
  });

  describe("getRetryDelay", () => {
    it("should return custom retry delay when set", () => {
      const error = new AppError("NETWORK_ERROR", "", { retryAfter: 5000 });
      expect(error.getRetryDelay()).toBe(5000);
    });

    it("should return default 1000ms when not set", () => {
      const error = new AppError("NETWORK_ERROR", "");
      expect(error.getRetryDelay()).toBe(1000);
    });
  });

  describe("toJSON", () => {
    it("should serialize to JSON correctly", () => {
      const cause = new Error("Original error");
      const error = new AppError("API_ERROR", "API call failed", {
        statusCode: 500,
        cause,
        context: { endpoint: "/api/users" },
      });

      const json = error.toJSON();

      expect(json.name).toBe("AppError");
      expect(json.code).toBe("API_ERROR");
      expect(json.message).toBe("API call failed");
      expect(json.severity).toBe("medium");
      expect(json.metadata).toHaveProperty("cause", "Original error");
      expect(json.metadata).toHaveProperty("statusCode", 500);
      expect(json.stack).toBeDefined();
    });
  });

  describe("static from", () => {
    it("should return AppError unchanged", () => {
      const original = new AppError("NOT_FOUND", "Not found");
      const result = AppError.from(original);
      expect(result).toBe(original);
    });

    it("should wrap Error instances", () => {
      const original = new Error("Something went wrong");
      const result = AppError.from(original, "API_ERROR");

      expect(result).toBeInstanceOf(AppError);
      expect(result.code).toBe("API_ERROR");
      expect(result.message).toBe("Something went wrong");
      expect(result.metadata.cause).toBe(original);
    });

    it("should wrap non-Error values", () => {
      const result = AppError.from("string error");
      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe("string error");
      expect(result.code).toBe("UNKNOWN");
    });
  });

  describe("static factory methods", () => {
    it("should create validation error", () => {
      const error = AppError.validation("Email is required", {
        field: "email",
      });

      expect(error.code).toBe("VALIDATION");
      expect(error.message).toBe("Email is required");
      expect(error.metadata.context).toEqual({ field: "email" });
      expect(error.getUserMessage()).toBe("Email is required");
    });

    it("should create not found error with id", () => {
      const error = AppError.notFound("User", "123");

      expect(error.code).toBe("NOT_FOUND");
      expect(error.message).toBe('User with id "123" not found');
      expect(error.metadata.statusCode).toBe(404);
      expect(error.metadata.context).toEqual({ resource: "User", id: "123" });
    });

    it("should create not found error without id", () => {
      const error = AppError.notFound("Configuration");

      expect(error.message).toBe("Configuration not found");
    });

    it("should create unauthorized error", () => {
      const error = AppError.unauthorized();

      expect(error.code).toBe("UNAUTHORIZED");
      expect(error.metadata.statusCode).toBe(401);
      expect(error.getUserMessage()).toBe("Please sign in to continue");
    });

    it("should create forbidden error", () => {
      const error = AppError.forbidden();

      expect(error.code).toBe("FORBIDDEN");
      expect(error.metadata.statusCode).toBe(403);
    });

    it("should create rate limited error", () => {
      const error = AppError.rateLimited(30000);

      expect(error.code).toBe("RATE_LIMITED");
      expect(error.metadata.statusCode).toBe(429);
      expect(error.isRetryable()).toBe(true);
      expect(error.getRetryDelay()).toBe(30000);
    });
  });

  describe("isAppError", () => {
    it("should return true for AppError instances", () => {
      const error = new AppError("UNKNOWN", "test");
      expect(isAppError(error)).toBe(true);
    });

    it("should return false for regular Error", () => {
      const error = new Error("test");
      expect(isAppError(error)).toBe(false);
    });

    it("should return false for non-errors", () => {
      expect(isAppError("string")).toBe(false);
      expect(isAppError(null)).toBe(false);
      expect(isAppError(undefined)).toBe(false);
      expect(isAppError({ code: "FAKE" })).toBe(false);
    });
  });

  describe("error code coverage", () => {
    const codes: ErrorCode[] = [
      "UNKNOWN",
      "VALIDATION",
      "NOT_FOUND",
      "FORBIDDEN",
      "UNAUTHORIZED",
      "RATE_LIMITED",
      "TIMEOUT",
      "NETWORK_ERROR",
      "API_ERROR",
      "EXTERNAL_SERVICE_ERROR",
      "STORAGE_ERROR",
      "ENCRYPTION_ERROR",
      "DECRYPTION_ERROR",
      "BILLING_ERROR",
      "SUBSCRIPTION_ERROR",
      "PAYMENT_FAILED",
      "QUOTA_EXCEEDED",
    ];

    it.each(codes)("should handle error code: %s", (code) => {
      const error = new AppError(code, `Test ${code}`);
      expect(error.code).toBe(code);
      expect(error.severity).toBeDefined();
      expect(error.getUserMessage()).toBeTruthy();
    });
  });
});
