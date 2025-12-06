"use client";

import { useState, useCallback, useEffect } from "react";
import { format, parseISO } from "date-fns";

export type TimestampUnit = "seconds" | "milliseconds";

export function useTimestamp() {
  const [timestamp, setTimestamp] = useState("");
  const [dateString, setDateString] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [unit, setUnit] = useState<TimestampUnit>("seconds");
  const [error, setError] = useState<string | null>(null);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = useCallback(
    (ts: string) => {
      if (!ts.trim()) {
        setDateString("");
        setError(null);
        return;
      }

      try {
        const num = parseInt(ts, 10);
        if (isNaN(num)) {
          throw new Error("Invalid number");
        }

        // Auto-detect unit based on magnitude
        const isMs = num > 9999999999;
        const date = new Date(isMs ? num : num * 1000);

        if (isNaN(date.getTime())) {
          throw new Error("Invalid timestamp");
        }

        setDateString(format(date, "yyyy-MM-dd HH:mm:ss"));
        setError(null);
      } catch {
        setError("Invalid timestamp");
        setDateString("");
      }
    },
    []
  );

  const dateToTimestamp = useCallback(
    (dateStr: string) => {
      if (!dateStr.trim()) {
        setTimestamp("");
        setError(null);
        return;
      }

      try {
        const date = parseISO(dateStr);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date");
        }

        const ts =
          unit === "milliseconds"
            ? date.getTime()
            : Math.floor(date.getTime() / 1000);

        setTimestamp(ts.toString());
        setError(null);
      } catch {
        setError("Invalid date format");
        setTimestamp("");
      }
    },
    [unit]
  );

  const handleTimestampChange = useCallback(
    (value: string) => {
      setTimestamp(value);
      timestampToDate(value);
    },
    [timestampToDate]
  );

  const handleDateChange = useCallback(
    (value: string) => {
      setDateString(value);
      dateToTimestamp(value);
    },
    [dateToTimestamp]
  );

  const setNow = useCallback(() => {
    const now = new Date();
    const ts =
      unit === "milliseconds" ? now.getTime() : Math.floor(now.getTime() / 1000);
    setTimestamp(ts.toString());
    setDateString(format(now, "yyyy-MM-dd HH:mm:ss"));
    setError(null);
  }, [unit]);

  const handleClear = useCallback(() => {
    setTimestamp("");
    setDateString("");
    setError(null);
  }, []);

  const copyTimestamp = useCallback(async () => {
    if (!timestamp) return false;
    try {
      await navigator.clipboard.writeText(timestamp);
      return true;
    } catch {
      return false;
    }
  }, [timestamp]);

  const copyDate = useCallback(async () => {
    if (!dateString) return false;
    try {
      await navigator.clipboard.writeText(dateString);
      return true;
    } catch {
      return false;
    }
  }, [dateString]);

  return {
    timestamp,
    dateString,
    currentTime,
    unit,
    error,
    setUnit,
    handleTimestampChange,
    handleDateChange,
    setNow,
    handleClear,
    copyTimestamp,
    copyDate,
  };
}
