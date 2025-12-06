"use client";

import { useState, useEffect, useCallback } from "react";

export interface HistoryItem {
  id: string;
  input: string;
  output: string;
  timestamp: number;
}

const STORAGE_PREFIX = "tool-history";
const MAX_ITEMS = 20;

export function useToolHistory(slug: string) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const storageKey = `${STORAGE_PREFIX}-${slug}`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, [storageKey]);

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
    [storageKey]
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
    [storageKey]
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
    [history]
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
