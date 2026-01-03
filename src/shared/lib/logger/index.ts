/**
 * Logger Module
 *
 * Structured logging system for the application.
 * Replaces direct console.log/warn/error usage.
 *
 * @example
 * // Root logger
 * import { logger } from "@/shared/lib/logger";
 * logger.info("Application started");
 * logger.error("Something failed", { error: err.message });
 *
 * @example
 * // Contextual logger
 * import { createLogger } from "@/shared/lib/logger";
 * const log = createLogger("webhook");
 * log.info("Processing webhook", { event: "subscription_created" });
 *
 * @example
 * // Child logger
 * const paymentLog = logger.child("payment");
 * paymentLog.warn("Payment failed", { userId: "123" });
 */

export { logger, createLogger } from "./logger";
export type { Logger, LogLevel, LogEntry, LoggerConfig } from "./types";
