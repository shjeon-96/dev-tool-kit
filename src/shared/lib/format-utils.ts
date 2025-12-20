/**
 * Format bytes to human readable string
 * @example formatBytes(1024) => "1.0 KB"
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

/**
 * Alias for formatBytes (commonly used as formatSize)
 */
export const formatSize = formatBytes;

/**
 * Format date to localized string
 * @example formatDate(new Date()) => "Dec 20, 2025"
 */
export function formatDate(
  date: Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  if (!date) return "Never";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options ?? defaultOptions);
}

/**
 * Format date to relative time string
 * @example formatRelativeDate(new Date(Date.now() - 86400000)) => "Yesterday"
 */
export function formatRelativeDate(date: Date | null | undefined): string {
  if (!date) return "Never";

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30)
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  if (days < 365)
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;

  return formatDate(date);
}

/**
 * Format number with thousands separators
 * @example formatNumber(1234567) => "1,234,567"
 */
export function formatNumber(num: number, locale = "en-US"): string {
  return num.toLocaleString(locale);
}

/**
 * Format percentage
 * @example formatPercent(0.75) => "75%"
 */
export function formatPercent(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Truncate string with ellipsis
 * @example truncateString("Hello World", 5) => "Hello..."
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Format duration in ms to human readable string
 * @example formatDuration(3661000) => "1h 1m 1s"
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  if (seconds > 0) {
    return `${seconds}s`;
  }
  return `${ms}ms`;
}
