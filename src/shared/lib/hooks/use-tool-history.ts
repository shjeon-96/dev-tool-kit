"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

export interface HistoryItem {
  id: string;
  input: string;
  output: string;
  timestamp: number;
}

const STORAGE_PREFIX = "tool-history";
const MAX_ITEMS = 20;

// Helper to get initial value from localStorage
function getStoredHistory(storageKey: string): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useToolHistory(slug: string) {
  const storageKey = `${STORAGE_PREFIX}-${slug}`;

  // Use lazy initialization for state
  const [history, setHistory] = useState<HistoryItem[]>(() =>
    getStoredHistory(storageKey),
  );

  // Subscribe to storage events for cross-tab sync
  useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => {
      try {
        return localStorage.getItem(storageKey) || "[]";
      } catch {
        return "[]";
      }
    },
    () => "[]",
  );

  const addToHistory = useCallback(
    (input: string, output: string) => {
      if (!input.trim() || !output.trim()) return;

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        input,
        output,
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        const updated = [newItem, ...prev].slice(0, MAX_ITEMS);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (error) {
          console.error("Failed to save history:", error);
        }
        return updated;
      });
    },
    [storageKey],
  );

  const removeFromHistory = useCallback(
    (id: string) => {
      setHistory((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (error) {
          console.error("Failed to update history:", error);
        }
        return updated;
      });
    },
    [storageKey],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  }, [storageKey]);

  const getHistoryItem = useCallback(
    (id: string) => {
      return history.find((item) => item.id === id);
    },
    [history],
  );

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
    hasHistory: history.length > 0,
  };
}
