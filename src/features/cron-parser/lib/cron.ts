/**
 * Cron expression utilities
 */

export interface CronPreset {
  label: string;
  expression: string;
}

export interface CronField {
  name: string;
  min: number;
  max: number;
  allowed: string;
}

/**
 * Cron field definitions
 */
export const cronFields: CronField[] = [
  { name: "minute", min: 0, max: 59, allowed: "0-59" },
  { name: "hour", min: 0, max: 23, allowed: "0-23" },
  { name: "dayOfMonth", min: 1, max: 31, allowed: "1-31" },
  { name: "month", min: 1, max: 12, allowed: "1-12" },
  { name: "dayOfWeek", min: 0, max: 6, allowed: "0-6 (Sun-Sat)" },
];

/**
 * Common cron presets
 */
export const cronPresets: CronPreset[] = [
  { label: "매분", expression: "* * * * *" },
  { label: "매시간", expression: "0 * * * *" },
  { label: "매일 자정", expression: "0 0 * * *" },
  { label: "매일 정오", expression: "0 12 * * *" },
  { label: "매주 월요일", expression: "0 0 * * 1" },
  { label: "매월 1일", expression: "0 0 1 * *" },
  { label: "매년 1월 1일", expression: "0 0 1 1 *" },
  { label: "평일 오전 9시", expression: "0 9 * * 1-5" },
  { label: "매 5분", expression: "*/5 * * * *" },
  { label: "매 30분", expression: "*/30 * * * *" },
];

/**
 * Validate a single cron field value
 */
export function validateCronField(value: string, field: CronField): boolean {
  // Wildcard
  if (value === "*") return true;

  // Step value (*/n or n/m)
  if (value.includes("/")) {
    const [base, step] = value.split("/");
    if (base !== "*" && !validateCronField(base, field)) return false;
    const stepNum = parseInt(step, 10);
    return !isNaN(stepNum) && stepNum > 0;
  }

  // Range (n-m)
  if (value.includes("-")) {
    const [start, end] = value.split("-").map((v) => parseInt(v, 10));
    return (
      !isNaN(start) &&
      !isNaN(end) &&
      start >= field.min &&
      end <= field.max &&
      start <= end
    );
  }

  // List (n,m,...)
  if (value.includes(",")) {
    return value.split(",").every((v) => validateCronField(v.trim(), field));
  }

  // Single number
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= field.min && num <= field.max;
}

/**
 * Validate a cron expression
 */
export function validateCronExpression(expression: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = expression.trim();
  if (!trimmed) {
    return { valid: false, error: "빈 표현식" };
  }

  const parts = trimmed.split(/\s+/);

  // Standard cron: 5 fields, with seconds: 6 fields
  if (parts.length !== 5 && parts.length !== 6) {
    return {
      valid: false,
      error: `필드 수가 올바르지 않습니다 (${parts.length}개, 5-6개 필요)`,
    };
  }

  // If 6 fields, skip the first (seconds)
  const fields = parts.length === 6 ? parts.slice(1) : parts;

  for (let i = 0; i < fields.length; i++) {
    if (!validateCronField(fields[i], cronFields[i])) {
      return {
        valid: false,
        error: `${cronFields[i].name} 필드가 유효하지 않습니다: ${fields[i]}`,
      };
    }
  }

  return { valid: true };
}

/**
 * Parse cron expression into field values
 */
export function parseCronExpression(expression: string): {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
} | null {
  const parts = expression.trim().split(/\s+/);

  if (parts.length !== 5 && parts.length !== 6) {
    return null;
  }

  const fields = parts.length === 6 ? parts.slice(1) : parts;

  return {
    minute: fields[0],
    hour: fields[1],
    dayOfMonth: fields[2],
    month: fields[3],
    dayOfWeek: fields[4],
  };
}

/**
 * Build cron expression from field values
 */
export function buildCronExpression(fields: {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}): string {
  return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
}

/**
 * Get human-readable description for common cron patterns
 */
export function getSimpleDescription(expression: string): string | null {
  const preset = cronPresets.find((p) => p.expression === expression);
  if (preset) return preset.label;

  // Try to match common patterns
  const parsed = parseCronExpression(expression);
  if (!parsed) return null;

  const { minute, hour, dayOfMonth, month, dayOfWeek } = parsed;

  // Every minute
  if (
    minute === "*" &&
    hour === "*" &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    return "매분";
  }

  // Every N minutes
  if (
    minute.startsWith("*/") &&
    hour === "*" &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    const interval = minute.slice(2);
    return `${interval}분마다`;
  }

  // Every hour at specific minute
  if (
    !minute.includes("*") &&
    hour === "*" &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    return `매시간 ${minute}분에`;
  }

  // Daily at specific time
  if (
    !minute.includes("*") &&
    !hour.includes("*") &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    return `매일 ${hour}시 ${minute}분에`;
  }

  return null;
}
