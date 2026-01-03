/**
 * Error Handling Module
 *
 * Provides standardized error types and Result pattern for
 * explicit error handling across the application.
 *
 * @example
 * // Using Result pattern
 * import { ok, err, tryCatchAsync, type Result } from "@/shared/lib/errors";
 *
 * async function fetchUser(id: string): Promise<Result<User, AppError>> {
 *   return tryCatchAsync(
 *     () => api.getUser(id),
 *     (error) => AppError.from(error, "API_ERROR")
 *   );
 * }
 *
 * const result = await fetchUser("123");
 * if (result.ok) {
 *   console.log(result.value);
 * } else {
 *   console.error(result.error.getUserMessage());
 * }
 *
 * @example
 * // Using AppError
 * import { AppError } from "@/shared/lib/errors";
 *
 * throw AppError.notFound("User", "123");
 * throw AppError.validation("Email is required");
 * throw AppError.rateLimited(60000);
 *
 * @example
 * // Using BillingError
 * import { BillingError } from "@/shared/lib/errors";
 *
 * throw BillingError.paymentDeclined("card_declined");
 * throw BillingError.quotaExceeded(100, 150);
 */

// Result pattern
export {
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
  type Ok,
  type Err,
  type Result,
} from "./result";

// Application errors
export {
  AppError,
  isAppError,
  type ErrorCode,
  type ErrorSeverity,
  type ErrorMetadata,
} from "./app-error";

// Billing-specific errors
export {
  BillingError,
  isBillingError,
  type BillingErrorCode,
  type BillingErrorMetadata,
} from "./billing-error";
