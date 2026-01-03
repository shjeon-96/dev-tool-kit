/**
 * Result Type Pattern
 *
 * A functional approach to error handling that makes errors explicit
 * in the type system, forcing callers to handle both success and failure cases.
 *
 * @example
 * // Return a success result
 * const success = ok({ user: { id: "123" } });
 *
 * // Return an error result
 * const failure = err(new AppError("NOT_FOUND", "User not found"));
 *
 * // Handle the result
 * if (result.ok) {
 *   console.log(result.value.user.id);
 * } else {
 *   console.error(result.error.message);
 * }
 */

/**
 * Success result type
 */
export interface Ok<T> {
  readonly ok: true;
  readonly value: T;
}

/**
 * Error result type
 */
export interface Err<E> {
  readonly ok: false;
  readonly error: E;
}

/**
 * Result type - either success or error
 */
export type Result<T, E = Error> = Ok<T> | Err<E>;

/**
 * Create a success result
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

/**
 * Create an error result
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

/**
 * Check if result is Ok
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.ok;
}

/**
 * Check if result is Err
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return !result.ok;
}

/**
 * Unwrap value or throw error
 * Use sparingly - prefer pattern matching
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value;
  }
  throw result.error;
}

/**
 * Unwrap value or return default
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (result.ok) {
    return result.value;
  }
  return defaultValue;
}

/**
 * Map success value
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  if (result.ok) {
    return ok(fn(result.value));
  }
  return result;
}

/**
 * Map error value
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> {
  if (result.ok) {
    return result;
  }
  return err(fn(result.error));
}

/**
 * Chain results (flatMap)
 */
export function flatMap<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> {
  if (result.ok) {
    return fn(result.value);
  }
  return result;
}

/**
 * Wrap a function that may throw into a Result
 */
export function tryCatch<T, E = Error>(
  fn: () => T,
  onError?: (error: unknown) => E,
): Result<T, E> {
  try {
    return ok(fn());
  } catch (error) {
    if (onError) {
      return err(onError(error));
    }
    return err(error as E);
  }
}

/**
 * Wrap an async function that may throw into a Result
 */
export async function tryCatchAsync<T, E = Error>(
  fn: () => Promise<T>,
  onError?: (error: unknown) => E,
): Promise<Result<T, E>> {
  try {
    const value = await fn();
    return ok(value);
  } catch (error) {
    if (onError) {
      return err(onError(error));
    }
    return err(error as E);
  }
}

/**
 * Combine multiple results into one
 * Returns first error if any, or array of values
 */
export function combine<T, E>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];

  for (const result of results) {
    if (!result.ok) {
      return result;
    }
    values.push(result.value);
  }

  return ok(values);
}

/**
 * Match on a result (pattern matching)
 */
export function match<T, E, R>(
  result: Result<T, E>,
  handlers: {
    ok: (value: T) => R;
    err: (error: E) => R;
  },
): R {
  if (result.ok) {
    return handlers.ok(result.value);
  }
  return handlers.err(result.error);
}
