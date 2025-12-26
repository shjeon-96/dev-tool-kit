"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const GITHUB_REPO = "jsh-me/dev-tool-kit";
const CACHE_KEY = "github_stars";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CachedStars {
  count: number;
  timestamp: number;
}

export function GitHubStarBadge() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { count, timestamp }: CachedStars = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setStars(count);
            return;
          }
        }
      } catch {
        // Ignore cache errors
      }

      // Fetch from GitHub API
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}`,
        );
        if (response.ok) {
          const data = await response.json();
          const count = data.stargazers_count || 0;
          setStars(count);

          // Cache the result
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ count, timestamp: Date.now() }),
            );
          } catch {
            // Ignore cache write errors
          }
        }
      } catch {
        // Fail silently
      }
    };

    fetchStars();
  }, []);

  return (
    <a
      href={`https://github.com/${GITHUB_REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium bg-muted/60 hover:bg-muted transition-colors border border-border/50 hover:border-border"
    >
      <Star className="h-4 w-4 text-warning fill-warning" />
      <span className="text-foreground/80">Star</span>
      {stars !== null && (
        <span className="text-muted-foreground text-xs">
          {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
        </span>
      )}
    </a>
  );
}
