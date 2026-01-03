"use client";

import { useState, useCallback, useEffect } from "react";
import type { ToolSlug } from "@/shared/types/tool";
import { safeGetItem, safeSetItem } from "@/shared/lib/storage";

const STORAGE_KEY = "tool-favorites";
const MAX_FAVORITES = 10;

export function useFavorites() {
  const [favorites, setFavorites] = useState<ToolSlug[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    // Use queueMicrotask to avoid synchronous setState warning
    queueMicrotask(() => {
      const stored = safeGetItem<ToolSlug[]>(STORAGE_KEY, []);
      setFavorites(stored);
      setIsLoaded(true);
    });
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (!isLoaded) return;
    safeSetItem(STORAGE_KEY, favorites);
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
