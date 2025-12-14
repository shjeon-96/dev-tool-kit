"use client";

import { useEffect } from "react";
import { Star } from "lucide-react";
import { useFavorites, useRecentTools } from "@/shared/lib";
import { Button } from "@/shared/ui";
import type { ToolSlug } from "@/entities/tool";

interface ToolHeaderActionsProps {
  slug: ToolSlug;
}

export function ToolHeaderActions({ slug }: ToolHeaderActionsProps) {
  const { toggleFavorite, isFavorite, isLoaded } = useFavorites();
  const { addRecentTool } = useRecentTools();

  // Track tool usage when mounted
  useEffect(() => {
    addRecentTool(slug);
  }, [slug, addRecentTool]);

  const favorite = isFavorite(slug);

  if (!isLoaded) {
    return (
      <Button variant="ghost" size="icon" disabled className="opacity-0">
        <Star className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggleFavorite(slug)}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorite}
      className="hover:bg-yellow-500/10"
    >
      <Star
        className={`h-5 w-5 transition-colors ${
          favorite
            ? "fill-yellow-500 text-yellow-500"
            : "text-muted-foreground hover:text-yellow-500"
        }`}
        aria-hidden="true"
      />
    </Button>
  );
}
