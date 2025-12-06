"use client";

import { useState, useCallback, useMemo } from "react";
import cronstrue from "cronstrue/i18n";
import { parseExpression } from "cron-parser";

export interface CronPreset {
  label: string;
  expression: string;
}

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

export function useCronParser() {
  const [expression, setExpression] = useState("0 0 * * *");
  const [nextCount, setNextCount] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const description = useMemo(() => {
    if (!expression.trim()) return null;

    try {
      const desc = cronstrue.toString(expression, {
        locale: "ko",
        use24HourTimeFormat: true,
      });
      setError(null);
      return desc;
    } catch {
      try {
        // Try English if Korean fails
        const desc = cronstrue.toString(expression, {
          use24HourTimeFormat: true,
        });
        setError(null);
        return desc;
      } catch (e) {
        setError("유효하지 않은 Cron 표현식입니다");
        return null;
      }
    }
  }, [expression]);

  const nextExecutions = useMemo(() => {
    if (!expression.trim() || error) return [];

    try {
      const interval = parseExpression(expression);
      const executions: Date[] = [];

      for (let i = 0; i < nextCount; i++) {
        executions.push(interval.next().toDate());
      }

      return executions;
    } catch {
      return [];
    }
  }, [expression, nextCount, error]);

  const applyPreset = useCallback((preset: CronPreset) => {
    setExpression(preset.expression);
    setError(null);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleClear = useCallback(() => {
    setExpression("");
    setError(null);
  }, []);

  return {
    expression,
    setExpression,
    description,
    nextExecutions,
    nextCount,
    setNextCount,
    error,
    applyPreset,
    copyToClipboard,
    handleClear,
  };
}
