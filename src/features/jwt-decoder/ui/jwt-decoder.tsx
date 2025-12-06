"use client";

import { useState } from "react";
import { Trash2, ClipboardPaste, Clock, AlertTriangle, History, X } from "lucide-react";
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
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  } = useJwtDecoder();

  const [showHistory, setShowHistory] = useState(false);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

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

        {hasHistory && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="h-4 w-4 mr-1" />
            History
          </Button>
        )}

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

      {/* History Panel */}
      {showHistory && hasHistory && (
        <div className="rounded-md border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Recent History</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  loadFromHistory(item.input, item.output);
                  setShowHistory(false);
                }}
                className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {truncateText(item.input)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

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
