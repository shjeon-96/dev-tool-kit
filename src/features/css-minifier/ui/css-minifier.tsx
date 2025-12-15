"use client";

import { useState } from "react";
import { Copy, Check, Trash2, ClipboardPaste, History, X } from "lucide-react";
import { Button } from "@/shared/ui";
import { useCssMinifier, type CssMode } from "../model/use-css-minifier";

export function CssMinifier() {
  const {
    input,
    output,
    error,
    stats,
    options,
    setInput,
    updateOption,
    handleProcess,
    handleCopy,
    handleClear,
    handlePaste,
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  } = useCssMinifier();

  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const onCopy = async () => {
    const success = await handleCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const modeButtons: { mode: CssMode; label: string }[] = [
    { mode: "minify", label: "Minify" },
    { mode: "beautify", label: "Beautify" },
  ];

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {modeButtons.map(({ mode, label }) => (
          <Button key={mode} onClick={() => handleProcess(mode)} size="sm">
            {label}
          </Button>
        ))}

        <div className="flex items-center gap-4 ml-4 flex-wrap">
          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={options.removeComments}
              onChange={(e) => updateOption("removeComments", e.target.checked)}
              className="rounded"
            />
            Comments
          </label>

          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={options.shortenColors}
              onChange={(e) => updateOption("shortenColors", e.target.checked)}
              className="rounded"
            />
            Shorten Colors
          </label>

          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={options.shortenZeros}
              onChange={(e) => updateOption("shortenZeros", e.target.checked)}
              className="rounded"
            />
            Shorten Zeros
          </label>

          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={options.removeEmptyRules}
              onChange={(e) =>
                updateOption("removeEmptyRules", e.target.checked)
              }
              className="rounded"
            />
            Empty Rules
          </label>
        </div>

        <div className="flex items-center gap-2 ml-auto">
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
      </div>

      {/* Stats */}
      {stats && (
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Original: <strong>{formatBytes(stats.originalSize)}</strong>
          </span>
          <span className="text-muted-foreground">
            Minified: <strong>{formatBytes(stats.minifiedSize)}</strong>
          </span>
          <span className="text-green-600 dark:text-green-400">
            Saved: <strong>{formatBytes(stats.savings)}</strong> (
            {stats.savingsPercent}%)
          </span>
        </div>
      )}

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
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">CSS Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=".class { color: red; }"
            className="h-[400px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Output</label>
            {output && (
              <Button variant="ghost" size="sm" onClick={onCopy}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
              </Button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Processed CSS will appear here"
            className="h-[400px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
