"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * User preferences for personalized experience
 */
export interface UserPreferences {
  // Content preferences
  preferredCategories: string[];
  readingHistory: string[]; // Article slugs (last 50)
  favoriteArticles: string[]; // Article slugs

  // UI preferences
  layoutPreference: "grid" | "list";
  fontSize: "normal" | "large";
  reducedMotion: boolean;

  // Reading statistics
  totalArticlesRead: number;
  lastVisit: string | null;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  preferredCategories: [],
  readingHistory: [],
  favoriteArticles: [],
  layoutPreference: "grid",
  fontSize: "normal",
  reducedMotion: false,
  totalArticlesRead: 0,
  lastVisit: null,
};

const STORAGE_KEY = "user-preferences";
const MAX_HISTORY_SIZE = 50;

/**
 * Get initial preferences from localStorage (client-side only)
 * Also updates last visit timestamp
 */
function getInitialPreferences(): UserPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let prefs = DEFAULT_PREFERENCES;
    if (stored) {
      prefs = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
    }
    // Update last visit timestamp
    const updated = { ...prefs, lastVisit: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

/**
 * Hook for managing user preferences with localStorage persistence
 * Provides personalization features for the blog platform
 */
export function useUserPreferences() {
  const [preferences, setPreferencesState] = useState<UserPreferences>(
    getInitialPreferences,
  );
  // Track mount status for hydration safety
  const [isLoaded, setIsLoaded] = useState(false);

  // Mount detection is an intentional one-time effect
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsLoaded(true), []);

  // Save preferences to localStorage
  const savePreferences = useCallback((newPrefs: UserPreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Update preferences
  const updatePreferences = useCallback(
    (updates: Partial<UserPreferences>) => {
      setPreferencesState((prev) => {
        const updated = { ...prev, ...updates };
        savePreferences(updated);
        return updated;
      });
    },
    [savePreferences],
  );

  // Track article read
  const trackArticleRead = useCallback(
    (slug: string, category: string) => {
      setPreferencesState((prev) => {
        // Add to reading history (avoid duplicates at front)
        const history = prev.readingHistory.filter((s) => s !== slug);
        history.unshift(slug);
        if (history.length > MAX_HISTORY_SIZE) {
          history.pop();
        }

        // Update category preference (boost recently read categories)
        const categories = prev.preferredCategories.filter(
          (c) => c !== category,
        );
        categories.unshift(category);
        if (categories.length > 6) {
          categories.pop();
        }

        const updated: UserPreferences = {
          ...prev,
          readingHistory: history,
          preferredCategories: categories,
          totalArticlesRead: prev.totalArticlesRead + 1,
        };
        savePreferences(updated);
        return updated;
      });
    },
    [savePreferences],
  );

  // Toggle favorite article
  const toggleFavorite = useCallback(
    (slug: string) => {
      setPreferencesState((prev) => {
        const favorites = prev.favoriteArticles.includes(slug)
          ? prev.favoriteArticles.filter((s) => s !== slug)
          : [...prev.favoriteArticles, slug];

        const updated = { ...prev, favoriteArticles: favorites };
        savePreferences(updated);
        return updated;
      });
    },
    [savePreferences],
  );

  // Check if article is favorite
  const isFavorite = useCallback(
    (slug: string) => preferences.favoriteArticles.includes(slug),
    [preferences.favoriteArticles],
  );

  // Set layout preference
  const setLayoutPreference = useCallback(
    (layout: "grid" | "list") => {
      updatePreferences({ layoutPreference: layout });
    },
    [updatePreferences],
  );

  // Set font size preference
  const setFontSize = useCallback(
    (size: "normal" | "large") => {
      updatePreferences({ fontSize: size });
    },
    [updatePreferences],
  );

  // Toggle reduced motion
  const toggleReducedMotion = useCallback(() => {
    updatePreferences({ reducedMotion: !preferences.reducedMotion });
  }, [updatePreferences, preferences.reducedMotion]);

  // Get recommended categories based on reading history
  const getRecommendedCategories = useCallback(
    (limit: number = 3): string[] => {
      return preferences.preferredCategories.slice(0, limit);
    },
    [preferences.preferredCategories],
  );

  // Check if user has read an article
  const hasRead = useCallback(
    (slug: string) => preferences.readingHistory.includes(slug),
    [preferences.readingHistory],
  );

  // Get reading streak info
  const getReadingStats = useCallback(() => {
    const lastVisit = preferences.lastVisit
      ? new Date(preferences.lastVisit)
      : null;
    const now = new Date();

    const daysSinceLastVisit = lastVisit
      ? Math.floor(
          (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24),
        )
      : null;

    return {
      totalArticlesRead: preferences.totalArticlesRead,
      recentArticlesCount: preferences.readingHistory.length,
      favoritesCount: preferences.favoriteArticles.length,
      daysSinceLastVisit,
      isReturningUser: daysSinceLastVisit !== null && daysSinceLastVisit > 0,
    };
  }, [preferences]);

  // Clear all preferences
  const clearPreferences = useCallback(() => {
    setPreferencesState(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore errors
    }
  }, []);

  return {
    preferences,
    isLoaded,

    // Article tracking
    trackArticleRead,
    hasRead,

    // Favorites
    toggleFavorite,
    isFavorite,

    // UI preferences
    setLayoutPreference,
    setFontSize,
    toggleReducedMotion,

    // Recommendations
    getRecommendedCategories,
    getReadingStats,

    // Utility
    updatePreferences,
    clearPreferences,
  };
}

/**
 * Hook to apply user preferences to document
 * Should be used in root layout
 */
export function useApplyPreferences() {
  const { preferences, isLoaded } = useUserPreferences();

  useEffect(() => {
    if (!isLoaded) return;

    // Apply font size
    if (preferences.fontSize === "large") {
      document.documentElement.classList.add("font-size-large");
    } else {
      document.documentElement.classList.remove("font-size-large");
    }

    // Apply reduced motion
    if (preferences.reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [isLoaded, preferences.fontSize, preferences.reducedMotion]);
}
