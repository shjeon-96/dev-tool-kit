"use client";

import { Trash2, ClipboardPaste, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui";
import { useJwtDecoder } from "../model/use-jwt-decoder";

export function JwtDecoder() {
  const {
    input,
    decoded,
    error,
    timeRemaining,
    handleInputChange,
    handleClear,
    handlePaste,
  } = useJwtDecoder();

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={handlePaste}>
          <ClipboardPaste className="h-4 w-4 mr-1" />
          Paste
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>

        {/* Timer */}
        {timeRemaining && (
          <div className="ml-auto flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className={decoded?.isExpired ? "text-destructive" : ""}>
              {decoded?.isExpired ? "Expired" : `Expires in ${timeRemaining}`}
            </span>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">JWT Token</label>
        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="h-32 w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          spellCheck={false}
        />
      </div>

      {/* Decoded Output */}
      {decoded && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Header */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Header
            </label>
            <pre className="rounded-md border bg-muted/50 p-3 font-mono text-sm overflow-auto max-h-[200px]">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Payload
            </label>
            <pre className="rounded-md border bg-muted/50 p-3 font-mono text-sm overflow-auto max-h-[200px]">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Claims Table */}
      {decoded && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Claims</label>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-2 font-medium">Claim</th>
                  <th className="text-left p-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {Object.entries(decoded.payload).map(([key, value]) => (
                  <tr key={key}>
                    <td className="p-2 font-mono text-xs">{key}</td>
                    <td className="p-2 font-mono text-xs">
                      {key === "exp" || key === "iat" || key === "nbf" ? (
                        <span>
                          {String(value)}
                          <span className="text-muted-foreground ml-2">
                            ({new Date((value as number) * 1000).toLocaleString()})
                          </span>
                        </span>
                      ) : typeof value === "object" ? (
                        JSON.stringify(value)
                      ) : (
                        String(value)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expiry Status */}
      {decoded?.isExpired && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          This token has expired
          {decoded.expiresAt && ` on ${decoded.expiresAt.toLocaleString()}`}
        </div>
      )}
    </div>
  );
}
