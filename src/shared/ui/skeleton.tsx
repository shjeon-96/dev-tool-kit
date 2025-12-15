import { cn } from "@/shared/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={cn(
        "rounded-md bg-muted relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent",
        "dark:before:via-foreground/10",
        className,
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("space-y-2", className)}
      role="status"
      aria-label="Loading text"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
      <span className="sr-only">Loading text...</span>
    </div>
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading card"
      className={cn("rounded-lg border p-4 space-y-3", className)}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <span className="sr-only">Loading card...</span>
    </div>
  );
}
