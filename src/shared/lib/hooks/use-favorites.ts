"use client";

import { useState, useCallback, useEffect } from "react";
import type { ToolSlug } from "@/entities/tool";

const STORAGE_KEY = "tool-favorites";
const MAX_FAVORITES = 10;

export function useFavorites() {
  const [favorites, setFavorites] = useState<ToolSlug[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    // Use queueMicrotask to avoid synchronous setState warning
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch {
        // localStorage not available
      }
      setIsLoaded(true);
    });
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage not available
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((slug: ToolSlug) => {
    setFavorites((prev) => {
      if (prev.includes(slug)) return prev;
      return [slug, ...prev].slice(0, MAX_FAVORITES);
    });
  }, []);

  const removeFavorite = useCallback((slug: ToolSlug) => {
    setFavorites((prev) => prev.filter((s) => s !== slug));
  }, []);

  const toggleFavorite = useCallback((slug: ToolSlug) => {
    setFavorites((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      return [slug, ...prev].slice(0, MAX_FAVORITES);
    });
  }, []);

  const isFavorite = useCallback(
    (slug: ToolSlug) => favorites.includes(slug),
    [favorites],
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    hasFavorites: favorites.length > 0,
    isLoaded,
  };
}
