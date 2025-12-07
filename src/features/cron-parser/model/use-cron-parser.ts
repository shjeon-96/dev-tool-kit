"use client";

import { useState, useCallback, useMemo } from "react";
import cronstrue from "cronstrue/i18n";
import cronParser from "cron-parser";

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

  // Parse cron expression and return description and error
  const { description, error } = useMemo(() => {
    if (!expression.trim()) return { description: null, error: null };

    try {
      const desc = cronstrue.toString(expression, {
        locale: "ko",
        use24HourTimeFormat: true,
      });
      return { description: desc, error: null };
    } catch {
      try {
        // Try English if Korean fails
        const desc = cronstrue.toString(expression, {
          use24HourTimeFormat: true,
        });
        return { description: desc, error: null };
      } catch {
        return { description: null, error: "유효하지 않은 Cron 표현식입니다" };
      }
    }
  }, [expression]);

  const nextExecutions = useMemo(() => {
    if (!expression.trim() || error) return [];

    try {
      const interval = cronParser.parse(expression);
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
