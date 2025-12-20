"use client";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export type BulkItemStatus = "pending" | "processing" | "success" | "error";

interface BulkStatusIconProps {
  status: BulkItemStatus;
  className?: string;
}

/**
 * Status icon for bulk operation items
 */
export function BulkStatusIcon({ status, className }: BulkStatusIconProps) {
  switch (status) {
    case "pending":
      return (
        <div
          className={cn("h-4 w-4 rounded-full bg-muted", className)}
          aria-label="Pending"
        />
      );
    case "processing":
      return (
        <Loader2
          className={cn("h-4 w-4 animate-spin text-blue-500", className)}
          aria-label="Processing"
        />
      );
    case "success":
      return (
        <CheckCircle2
          className={cn("h-4 w-4 text-green-500", className)}
          aria-label="Success"
        />
      );
    case "error":
      return (
        <XCircle
          className={cn("h-4 w-4 text-red-500", className)}
          aria-label="Error"
        />
      );
  }
}

interface BulkStats {
  total: number;
  pending: number;
  success: number;
  error: number;
  remaining?: number;
}

interface BulkStatsBarProps {
  stats: BulkStats;
  className?: string;
}

/**
 * Stats bar for bulk operations showing total, success, error, and remaining counts
 */
export function BulkStatsBar({ stats, className }: BulkStatsBarProps) {
  const remaining = stats.remaining ?? stats.pending;

  return (
    <div className={cn("flex gap-4 text-sm", className)}>
      <span>Total: {stats.total}</span>
      <span className="text-muted-foreground">|</span>
      <span className="text-green-600">Success: {stats.success}</span>
      <span className="text-muted-foreground">|</span>
      <span className="text-red-600">Error: {stats.error}</span>
      <span className="text-muted-foreground">|</span>
      <span className="text-muted-foreground">Remaining: {remaining}</span>
    </div>
  );
}

interface BulkProgressBarProps {
  isProcessing: boolean;
  progress: number;
  label?: string;
  className?: string;
}

/**
 * Progress bar for bulk operations
 */
export function BulkProgressBar({
  isProcessing,
  progress,
  label = "Processing",
  className,
}: BulkProgressBarProps) {
  if (!isProcessing) return null;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        {label}... {progress}%
      </p>
    </div>
  );
}

interface EmptyDropzoneProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDragging?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Empty state dropzone for bulk file upload
 */
export function EmptyDropzone({
  icon,
  title,
  description,
  isDragging,
  onClick,
  className,
}: EmptyDropzoneProps) {
  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
        isDragging ? "border-primary bg-primary/5" : "hover:border-primary/50",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
