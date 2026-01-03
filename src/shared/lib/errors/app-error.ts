/**
 * Application Error Types
 *
 * Standardized error types for the application with error codes
 * and metadata support.
 */

/**
 * Error codes for categorizing errors
 */
export type ErrorCode =
  // General errors
  | "UNKNOWN"
  | "VALIDATION"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "UNAUTHORIZED"
  | "RATE_LIMITED"
  | "TIMEOUT"
  // Network errors
  | "NETWORK_ERROR"
  | "API_ERROR"
  | "EXTERNAL_SERVICE_ERROR"
  // Storage errors
  | "STORAGE_ERROR"
  | "ENCRYPTION_ERROR"
  | "DECRYPTION_ERROR"
  // Billing errors
  | "BILLING_ERROR"
  | "SUBSCRIPTION_ERROR"
  | "PAYMENT_FAILED"
  | "QUOTA_EXCEEDED";

/**
 * Error severity levels
 */
export type ErrorSeverity = "low" | "medium" | "high" | "critical";

/**
 * Error metadata type
 */
export interface ErrorMetadata {
  /** HTTP status code if applicable */
  statusCode?: number;
  /** Original error if wrapping */
  cause?: Error;
  /** Additional context */
  context?: Record<string, unknown>;
  /** User-facing message (localized) */
  userMessage?: string;
  /** Whether to retry the operation */
  retryable?: boolean;
  /** Suggested retry delay in ms */
  retryAfter?: number;
}

/**
 * AppError - Base application error class
 *
 * @example
 * throw new AppError("NOT_FOUND", "User not found", {
 *   context: { userId: "123" },
 *   userMessage: "The requested user does not exist",
 * });
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly severity: ErrorSeverity;
  public readonly timestamp: Date;
  public readonly metadata: ErrorMetadata;

  constructor(code: ErrorCode, message: string, metadata: ErrorMetadata = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.severity = getSeverityForCode(code);
    this.timestamp = new Date();
    this.metadata = metadata;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    return this.metadata.userMessage || getDefaultUserMessage(this.code);
  }

  /**
   * Check if error is retryable
   */
  isRetryable(): boolean {
    return this.metadata.retryable ?? isRetryableByDefault(this.code);
  }

  /**
   * Get retry delay in ms
   */
  getRetryDelay(): number {
    return this.metadata.retryAfter ?? 1000;
  }

  /**
   * Convert to plain object for logging/serialization
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      severity: this.severity,
      timestamp: this.timestamp.toISOString(),
      metadata: {
        ...this.metadata,
        cause: this.metadata.cause?.message,
      },
      stack: this.stack,
    };
  }

  /**
   * Create from unknown error
   */
  static from(error: unknown, defaultCode: ErrorCode = "UNKNOWN"): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(defaultCode, error.message, {
        cause: error,
      });
    }

    return new AppError(defaultCode, String(error));
  }

  /**
   * Create a validation error
   */
  static validation(
    message: string,
    context?: Record<string, unknown>,
  ): AppError {
    return new AppError("VALIDATION", message, {
      context,
      userMessage: message,
    });
  }

  /**
   * Create a not found error
   */
  static notFound(resource: string, id?: string): AppError {
    const message = id
      ? `${resource} with id "${id}" not found`
      : `${resource} not found`;
    return new AppError("NOT_FOUND", message, {
      statusCode: 404,
      context: { resource, id },
      userMessage: `The requested ${resource.toLowerCase()} was not found`,
    });
  }

  /**
   * Create an unauthorized error
   */
  static unauthorized(message = "Authentication required"): AppError {
    return new AppError("UNAUTHORIZED", message, {
      statusCode: 401,
      userMessage: "Please sign in to continue",
    });
  }

  /**
   * Create a forbidden error
   */
  static forbidden(message = "Access denied"): AppError {
    return new AppError("FORBIDDEN", message, {
      statusCode: 403,
      userMessage: "You don't have permission to perform this action",
    });
  }

  /**
   * Create a rate limited error
   */
  static rateLimited(retryAfter?: number): AppError {
    return new AppError("RATE_LIMITED", "Rate limit exceeded", {
      statusCode: 429,
      retryable: true,
      retryAfter: retryAfter ?? 60000,
      userMessage: "Too many requests. Please try again later.",
    });
  }
}

/**
 * Get default severity for error code
 */
function getSeverityForCode(code: ErrorCode): ErrorSeverity {
  switch (code) {
    case "VALIDATION":
    case "NOT_FOUND":
      return "low";
    case "RATE_LIMITED":
    case "TIMEOUT":
    case "NETWORK_ERROR":
      return "medium";
    case "UNAUTHORIZED":
    case "FORBIDDEN":
    case "BILLING_ERROR":
    case "SUBSCRIPTION_ERROR":
      return "high";
    case "PAYMENT_FAILED":
    case "ENCRYPTION_ERROR":
    case "DECRYPTION_ERROR":
      return "critical";
    default:
      return "medium";
  }
}

/**
 * Check if error code is retryable by default
 */
function isRetryableByDefault(code: ErrorCode): boolean {
  switch (code) {
    case "NETWORK_ERROR":
    case "TIMEOUT":
    case "RATE_LIMITED":
    case "EXTERNAL_SERVICE_ERROR":
      return true;
    default:
      return false;
  }
}

/**
 * Get default user message for error code
 */
function getDefaultUserMessage(code: ErrorCode): string {
  switch (code) {
    case "VALIDATION":
      return "Please check your input and try again.";
    case "NOT_FOUND":
      return "The requested resource was not found.";
    case "UNAUTHORIZED":
      return "Please sign in to continue.";
    case "FORBIDDEN":
      return "You don't have permission to perform this action.";
    case "RATE_LIMITED":
      return "Too many requests. Please try again later.";
    case "TIMEOUT":
      return "The request timed out. Please try again.";
    case "NETWORK_ERROR":
      return "Network error. Please check your connection.";
    case "BILLING_ERROR":
    case "SUBSCRIPTION_ERROR":
      return "There was a problem with your subscription.";
    case "PAYMENT_FAILED":
      return "Payment failed. Please check your payment method.";
    case "QUOTA_EXCEEDED":
      return "You've reached your usage limit. Please upgrade your plan.";
    case "ENCRYPTION_ERROR":
    case "DECRYPTION_ERROR":
      return "Security error. Please try again.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}

/**
 * Type guard for AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
