"use client";

import { useState, useCallback, useEffect } from "react";
import type { ToolSlug } from "@/shared/types/tool";

const STORAGE_KEY = "recent-tools";
const MAX_RECENT = 8;

interface RecentToolEntry {
  slug: ToolSlug;
  timestamp: number;
}

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentToolEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load recent tools from localStorage on mount
  useEffect(() => {
    // Use queueMicrotask to avoid synchronous setState warning
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setRecentTools(JSON.parse(stored));
        }
      } catch {
        // localStorage not available
      }
      setIsLoaded(true);
    });
  }, []);

  // Save to localStorage when recent tools change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentTools));
    } catch {
      // localStorage not available
    }
  }, [recentTools, isLoaded]);

  const addRecentTool = useCallback((slug: ToolSlug) => {
    setRecentTools((prev) => {
      // Remove existing entry for this tool
      const filtered = prev.filter((entry) => entry.slug !== slug);
      // Add to front with current timestamp
      const newEntry: RecentToolEntry = {
        slug,
        timestamp: Date.now(),
      };
      return [newEntry, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecentTools = useCallback(() => {
    setRecentTools([]);
  }, []);

  const getRecentSlugs = useCallback((): ToolSlug[] => {
    return recentTools.map((entry) => entry.slug);
  }, [recentTools]);

  return {
    recentTools,
    addRecentTool,
    clearRecentTools,
    getRecentSlugs,
    hasRecentTools: recentTools.length > 0,
    isLoaded,
  };
}
