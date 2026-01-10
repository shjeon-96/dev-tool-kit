"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";

// Theme schedule modes
export type ThemeScheduleMode = "manual" | "system" | "scheduled";

// Schedule configuration
export interface ThemeSchedule {
  mode: ThemeScheduleMode;
  darkStart: string; // "HH:mm" format (e.g., "18:00")
  darkEnd: string; // "HH:mm" format (e.g., "06:00")
}

// Default schedule (6 PM to 6 AM)
const DEFAULT_SCHEDULE: ThemeSchedule = {
  mode: "system",
  darkStart: "18:00",
  darkEnd: "06:00",
};

const STORAGE_KEY = "theme-schedule";

/**
 * Parse time string to minutes since midnight
 */
function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Check if current time is within dark mode hours
 */
function isInDarkPeriod(darkStart: string, darkEnd: string): boolean {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = parseTimeToMinutes(darkStart);
  const endMinutes = parseTimeToMinutes(darkEnd);

  // Handle overnight schedules (e.g., 18:00 to 06:00)
  if (startMinutes > endMinutes) {
    // Dark period spans midnight
    return currentMinutes >= startMinutes || currentMinutes < endMinutes;
  }
  // Dark period within same day
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/**
 * Calculate minutes until next theme change
 */
function getMinutesUntilChange(darkStart: string, darkEnd: string): number {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = parseTimeToMinutes(darkStart);
  const endMinutes = parseTimeToMinutes(darkEnd);

  const isDark = isInDarkPeriod(darkStart, darkEnd);

  if (isDark) {
    // Calculate time until light mode
    if (startMinutes > endMinutes) {
      // Overnight: check if before or after midnight
      if (currentMinutes >= startMinutes) {
        // After dark start, calculate time until end tomorrow
        return 24 * 60 - currentMinutes + endMinutes;
      }
      // Before dark end
      return endMinutes - currentMinutes;
    }
    return endMinutes - currentMinutes;
  }

  // Calculate time until dark mode
  if (currentMinutes < startMinutes) {
    return startMinutes - currentMinutes;
  }
  // After end but before next start (next day)
  return 24 * 60 - currentMinutes + startMinutes;
}

/**
 * Hook for scheduled theme switching
 * Supports manual, system, and time-based automatic theme changes
 */
/**
 * Get initial schedule from localStorage (client-side only)
 */
function getInitialSchedule(): ThemeSchedule {
  if (typeof window === "undefined") return DEFAULT_SCHEDULE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ThemeSchedule;
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_SCHEDULE;
}

export function useScheduledTheme() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [schedule, setScheduleState] =
    useState<ThemeSchedule>(getInitialSchedule);
  // Track if client-side mount has occurred (for SSR safety)
  const [mounted, setMounted] = useState(false);

  // Apply scheduled theme after mount
  // Mount detection is an intentional one-time effect
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    if (schedule.mode !== "scheduled") {
      // For manual or system modes, let next-themes handle it
      if (schedule.mode === "system") {
        setTheme("system");
      }
      return;
    }

    // Scheduled mode: check current time and apply theme
    const applyScheduledTheme = () => {
      const shouldBeDark = isInDarkPeriod(schedule.darkStart, schedule.darkEnd);
      const newTheme = shouldBeDark ? "dark" : "light";

      // Only change if different to avoid unnecessary re-renders
      if (theme !== newTheme) {
        setTheme(newTheme);
      }
    };

    // Apply immediately
    applyScheduledTheme();

    // Set up interval to check every minute
    const interval = setInterval(applyScheduledTheme, 60 * 1000);

    return () => clearInterval(interval);
  }, [mounted, schedule, setTheme, theme]);

  // Update schedule
  const updateSchedule = useCallback(
    (newSchedule: Partial<ThemeSchedule>) => {
      const updated = { ...schedule, ...newSchedule };
      setScheduleState(updated);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }

      // Apply new mode immediately
      if (updated.mode === "manual") {
        // Keep current theme
      } else if (updated.mode === "system") {
        setTheme("system");
      } else if (updated.mode === "scheduled") {
        const shouldBeDark = isInDarkPeriod(updated.darkStart, updated.darkEnd);
        setTheme(shouldBeDark ? "dark" : "light");
      }
    },
    [schedule, setTheme],
  );

  // Set theme for manual mode
  const setManualTheme = useCallback(
    (newTheme: "light" | "dark") => {
      updateSchedule({ mode: "manual" });
      setTheme(newTheme);
    },
    [setTheme, updateSchedule],
  );

  // Get status information
  const getStatus = useCallback(() => {
    if (schedule.mode !== "scheduled") {
      return {
        isScheduled: false,
        nextChange: null,
        currentPeriod: resolvedTheme === "dark" ? "dark" : "light",
      };
    }

    const minutesUntilChange = getMinutesUntilChange(
      schedule.darkStart,
      schedule.darkEnd,
    );
    const hours = Math.floor(minutesUntilChange / 60);
    const minutes = minutesUntilChange % 60;

    return {
      isScheduled: true,
      nextChange: { hours, minutes },
      currentPeriod: isInDarkPeriod(schedule.darkStart, schedule.darkEnd)
        ? "dark"
        : "light",
    };
  }, [schedule, resolvedTheme]);

  return {
    schedule,
    updateSchedule,
    setManualTheme,
    getStatus,
    isLoaded: mounted,
    currentTheme: resolvedTheme,
  };
}

/**
 * Format time for display
 */
export function formatScheduleTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}
