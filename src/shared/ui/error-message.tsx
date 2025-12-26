"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "./button";

const errorAnimation = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.15, ease: "easeOut" as const },
};

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: "inline" | "card";
  className?: string;
}

export function ErrorMessage({
  title,
  message,
  onRetry,
  onDismiss,
  variant = "inline",
  className,
}: ErrorMessageProps) {
  if (variant === "card") {
    return (
      <motion.div
        role="alert"
        aria-live="polite"
        {...errorAnimation}
        className={cn(
          "rounded-lg border border-destructive/20 bg-destructive/10 p-4",
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle
            className="h-5 w-5 text-destructive shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="flex-1 space-y-2">
            {title && <h4 className="font-medium text-destructive">{title}</h4>}
            <p className="text-sm text-destructive/90">{message}</p>
            {(onRetry || onDismiss) && (
              <div className="flex gap-2 pt-2">
                {onRetry && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" aria-hidden="true" />
                    다시 시도
                  </Button>
                )}
                {onDismiss && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                    className="text-destructive/70"
                  >
                    닫기
                  </Button>
                )}
              </div>
            )}
          </div>
          {onDismiss && !onRetry && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onDismiss}
              aria-label="Dismiss error"
              className="text-destructive/70 hover:text-destructive"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      role="alert"
      aria-live="polite"
      {...errorAnimation}
      className={cn(
        "flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive",
        className,
      )}
    >
      <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="text-destructive/70 hover:text-destructive -mr-1"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </Button>
      )}
    </motion.div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 text-muted-foreground" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="font-medium text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
