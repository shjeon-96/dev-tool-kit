"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "./button";

interface ShareButtonProps {
  getShareUrl: () => string;
  className?: string;
}

export function ShareButton({ getShareUrl, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = getShareUrl();

    // Try Web Share API first (mobile-friendly)
    if (navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch {
        // User cancelled or not supported, fall through to clipboard
      }
    }

    // Fallback to clipboard copy
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
      console.error("Failed to copy URL to clipboard");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className={className}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </Button>
  );
}
