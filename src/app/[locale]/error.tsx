"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">
        Something went wrong!
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        We apologize for the inconvenience. An unexpected error occurred in the
        application.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
        </Button>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 overflow-auto rounded-lg bg-muted p-4 text-left font-mono text-xs">
          <p className="font-bold text-destructive mb-2">
            {error.name}: {error.message}
          </p>
          <pre className="whitespace-pre-wrap">{error.stack}</pre>
        </div>
      )}
    </div>
  );
}
