/**
 * Logger Implementation
 *
 * A structured logging system that:
 * - Supports log levels (debug, info, warn, error)
 * - Provides context-aware child loggers
 * - Respects production/development environment
 * - Can be extended with external transports
 */

import {
  type Logger,
  type LoggerConfig,
  type LogLevel,
  type LogEntry,
  LOG_LEVEL_PRIORITY,
} from "./types";

// Default configuration
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: process.env.NODE_ENV === "production" ? "info" : "debug",
  timestamps: true,
  enabled: true,
};

/**
 * Create a logger instance
 */
function createLogger(
  context?: string,
  config: Partial<LoggerConfig> = {},
): Logger {
  const mergedConfig: LoggerConfig = { ...DEFAULT_CONFIG, ...config };

  function shouldLog(level: LogLevel): boolean {
    if (!mergedConfig.enabled) return false;
    return (
      LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[mergedConfig.minLevel]
    );
  }

  function formatMessage(entry: LogEntry): string {
    const parts: string[] = [];

    if (mergedConfig.timestamps) {
      parts.push(`[${entry.timestamp}]`);
    }

    parts.push(`[${entry.level.toUpperCase()}]`);

    if (entry.context) {
      parts.push(`[${entry.context}]`);
    }

    parts.push(entry.message);

    return parts.join(" ");
  }

  function log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
  ): void {
    if (!shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      data,
    };

    const formattedMessage = formatMessage(entry);

    // Use console.error for warn and error to allow them in production
    switch (level) {
      case "debug":
        // In production, debug logs are typically disabled via minLevel
        // eslint-disable-next-line no-console
        console.debug(formattedMessage, data ?? "");
        break;
      case "info":
        // eslint-disable-next-line no-console
        console.info(formattedMessage, data ?? "");
        break;
      case "warn":
        console.warn(formattedMessage, data ?? "");
        break;
      case "error":
        console.error(formattedMessage, data ?? "");
        break;
    }
  }

  return {
    debug: (message, data) => log("debug", message, data),
    info: (message, data) => log("info", message, data),
    warn: (message, data) => log("warn", message, data),
    error: (message, data) => log("error", message, data),
    child: (childContext) =>
      createLogger(
        context ? `${context}:${childContext}` : childContext,
        config,
      ),
  };
}

// Export the root logger
export const logger = createLogger();

// Export factory for creating contextual loggers
export { createLogger };
