"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  ClipboardPaste,
  Clock,
  AlertTriangle,
  History,
  X,
  KeyRound,
} from "lucide-react";
import { Button, ShareButton, EmptyState } from "@/shared/ui";
import { ToolActionsBar } from "@/widgets/tool-actions";
import { useJwtDecoder } from "../model/use-jwt-decoder";
import { usePipelineReceiver } from "@/features/tool-pipeline";

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
    getShareUrl,
  } = useJwtDecoder();

  const [showHistory, setShowHistory] = useState(false);
  const { receivedData, checkForPipelineData, clearReceivedData } =
    usePipelineReceiver();

  // Pipeline에서 받은 데이터 처리
  useEffect(() => {
    checkForPipelineData();
  }, [checkForPipelineData]);

  useEffect(() => {
    if (receivedData) {
      handleInputChange(receivedData.data);
      clearReceivedData();
    }
  }, [receivedData, handleInputChange, clearReceivedData]);

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
        <Button
          variant="outline"
          size="sm"
          onClick={handlePaste}
          aria-label="Paste JWT token from clipboard"
        >
          <ClipboardPaste className="h-4 w-4 mr-1" aria-hidden="true" />
          Paste
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          aria-label="Clear input and decoded result"
        >
          <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
          Clear
        </Button>

        {hasHistory && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            aria-expanded={showHistory}
            aria-label="Toggle history panel"
          >
            <History className="h-4 w-4 mr-1" aria-hidden="true" />
            History
          </Button>
        )}

        {input && <ShareButton getShareUrl={getShareUrl} />}

        {/* Timer */}
        {timeRemaining && (
          <div
            className="ml-auto flex items-center gap-2 text-sm"
            role="status"
            aria-live="polite"
          >
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span className={decoded?.isExpired ? "text-destructive" : ""}>
              {decoded?.isExpired ? "Expired" : `Expires in ${timeRemaining}`}
            </span>
          </div>
        )}
      </div>

      {/* AI, Pipeline, Workspace Actions */}
      <ToolActionsBar
        toolSlug="jwt-decoder"
        input={input}
        output={decoded ? JSON.stringify(decoded, null, 2) : ""}
      />

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
                aria-label="Clear all history"
              >
                <Trash2 className="h-3 w-3 mr-1" aria-hidden="true" />
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(false)}
                aria-label="Close history panel"
              >
                <X className="h-4 w-4" aria-hidden="true" />
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
        <div
          role="alert"
          aria-live="polite"
          className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          {error}
        </div>
      )}

      {/* Input */}
      <div className="space-y-2">
        <label htmlFor="jwt-input" className="text-sm font-medium">
          JWT Token
        </label>
        <textarea
          id="jwt-input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="h-32 w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          spellCheck={false}
          aria-describedby={error ? "jwt-error" : undefined}
        />
      </div>

      {/* Empty State */}
      {!decoded && !error && !input && (
        <EmptyState
          icon={<KeyRound className="h-12 w-12" />}
          title="Decode your JWT token"
          description="Paste a JWT token to decode its header and payload. We'll also show expiration status and validate the structure."
          className="min-h-[200px]"
        />
      )}

      {/* Decoded Output */}
      {decoded && (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Header */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-info">Header</label>
            <pre className="rounded-md border bg-muted/50 p-3 font-mono text-sm overflow-auto max-h-[200px]">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Payload</label>
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
                            (
                            {new Date(
                              (value as number) * 1000,
                            ).toLocaleString()}
                            )
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
        <div
          role="alert"
          aria-live="polite"
          className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          This token has expired
          {decoded.expiresAt && ` on ${decoded.expiresAt.toLocaleString()}`}
        </div>
      )}
    </div>
  );
}
