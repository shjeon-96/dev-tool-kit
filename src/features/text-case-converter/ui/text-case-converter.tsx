"use client";

import { useState } from "react";
import { Copy, Check, Trash2, ClipboardPaste, History, X } from "lucide-react";
import { Button } from "@/shared/ui";
import { useTextCaseConverter } from "../model/use-text-case-converter";
import { caseOptions } from "../lib/converter";

export function TextCaseConverter() {
  const {
    input,
    outputs,
    error,
    setInput,
    handleCopy,
    handleClear,
    handlePaste,
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  } = useTextCaseConverter();

  const [copiedCase, setCopiedCase] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const onCopy = async (caseType: string) => {
    const success = await handleCopy(
      caseType as Parameters<typeof handleCopy>[0],
    );
    if (success) {
      setCopiedCase(caseType);
      setTimeout(() => setCopiedCase(null), 2000);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
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
                  loadFromHistory(item.input);
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
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="h-[120px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          spellCheck={false}
        />
      </div>

      {/* Output Grid */}
      {input.trim() && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {caseOptions.map((option) => (
            <div
              key={option.type}
              className="rounded-lg border bg-card p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {option.label}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => onCopy(option.type)}
                >
                  {copiedCase === option.type ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <div className="font-mono text-sm break-all bg-muted/50 rounded p-2 min-h-[40px]">
                {outputs[option.type] || ""}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!input.trim() && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Enter text above to see all case conversions</p>
          <p className="text-sm mt-2">
            Supports: camelCase, PascalCase, snake_case, kebab-case, and more
          </p>
        </div>
      )}
    </div>
  );
}
