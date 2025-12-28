"use client";

import { useEffect } from "react";
import { Star } from "lucide-react";
import { useFavorites, useRecentTools } from "@/shared/lib";
import { Button, OfflineIndicator } from "@/shared/ui";
import { QuotaIndicator } from "@/features/quota";
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
      <div className="flex items-center gap-2">
        <QuotaIndicator slug={slug} compact />
        <OfflineIndicator size="sm" />
        <Button variant="ghost" size="icon" disabled className="opacity-0">
          <Star className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <QuotaIndicator slug={slug} compact />
      <OfflineIndicator size="sm" />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleFavorite(slug)}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={favorite}
        className="hover:bg-warning/10"
      >
        <Star
          className={`h-5 w-5 transition-colors ${
            favorite
              ? "fill-warning text-warning"
              : "text-muted-foreground hover:text-warning"
          }`}
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
