"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Share2, Copy, Check, Loader2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useShare } from "../model/use-share";
import type { ToolSlug } from "@/entities/tool";

// ============================================
// ShareButton Component
// ============================================

interface ShareButtonProps {
  toolSlug: ToolSlug;
  input: string;
  options?: Record<string, unknown>;
  className?: string;
}

export function ShareButton({
  toolSlug,
  input,
  options,
  className,
}: ShareButtonProps) {
  const t = useTranslations("share");
  const [isOpen, setIsOpen] = useState(false);

  const {
    shareUrl,
    error,
    copied,
    isLoading,
    isSuccess,
    share,
    copyToClipboard,
  } = useShare();

  const hasInput = input.trim().length > 0;

  const handleShare = async () => {
    if (!hasInput) return;

    if (isSuccess && shareUrl) {
      // 이미 공유된 경우 팝오버만 열기
      setIsOpen(true);
      return;
    }

    const url = await share(toolSlug, input, options);
    if (url) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // 팝오버 닫을 때 상태 유지 (같은 데이터면 재사용)
  };

  const handleCopy = async () => {
    await copyToClipboard();
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        disabled={!hasInput || isLoading}
        className={cn(
          "gap-2 transition-all",
          hasInput && "border-success/50 hover:border-success",
          isSuccess && "border-success bg-success/10",
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isSuccess ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        <span>{isSuccess ? t("shared") : t("share")}</span>
      </Button>

      {/* Share Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 z-50 w-80 bg-popover border rounded-lg shadow-lg p-4"
          >
            {error ? (
              <div className="text-sm text-destructive">{error}</div>
            ) : shareUrl ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-success">
                  <Check className="h-4 w-4" />
                  <span>{t("linkCreated")}</span>
                </div>

                {/* URL Display */}
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 bg-transparent text-sm truncate outline-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-success" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t("copied")}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t("copyLink")}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("open")}
                    </a>
                  </Button>
                </div>

                {/* Expiry Notice */}
                <p className="text-xs text-muted-foreground">
                  {t("expiryNotice")}
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={handleClose} />}
    </div>
  );
}
