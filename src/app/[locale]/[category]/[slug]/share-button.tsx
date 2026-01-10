"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  label: string;
}

export function ShareButton({ title, label }: ShareButtonProps) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed - silently ignore
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        // Clipboard failed - silently ignore
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="p-2.5 rounded-full border bg-card hover:bg-secondary transition-colors"
      aria-label={label}
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}
