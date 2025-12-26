"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Trash2,
  ClipboardPaste,
  History,
  X,
  FileJson,
} from "lucide-react";
import {
  Button,
  ShareButton,
  EmptyState,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { ToolActionsBar } from "@/widgets/tool-actions";
import { useCopyToClipboard } from "@/shared/lib";
import { useJsonFormatter, type FormatMode } from "../model/use-json-formatter";
import { usePipelineInput } from "@/features/tool-pipeline";

export function JsonFormatter() {
  const {
    input,
    output,
    error,
    indent,
    setInput,
    setIndent,
    handleFormat,
    handleClear,
    handlePaste,
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
    getShareUrl,
  } = useJsonFormatter();

  const { copied, copy } = useCopyToClipboard();
  const [showHistory, setShowHistory] = useState(false);

  // Pipeline에서 받은 데이터 처리 (simplified)
  const handlePipelineData = useCallback(
    (data: string) => setInput(data),
    [setInput],
  );
  usePipelineInput(handlePipelineData);

  const onCopy = () => copy(output);

  const formatButtons: { mode: FormatMode; label: string }[] = [
    { mode: "beautify", label: "Beautify" },
    { mode: "minify", label: "Minify" },
    { mode: "validate", label: "Validate" },
  ];

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ko-KR", {
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

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {formatButtons.map(({ mode, label }) => (
          <Button
            key={mode}
            onClick={() => handleFormat(mode)}
            size="sm"
            aria-label={`${label} JSON`}
          >
            {label}
          </Button>
        ))}

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted-foreground">Indent:</span>
          <Select
            value={String(indent)}
            onValueChange={(value) => setIndent(Number(value))}
          >
            <SelectTrigger
              size="sm"
              className="w-[100px]"
              aria-label="Select indentation size"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 spaces</SelectItem>
              <SelectItem value="4">4 spaces</SelectItem>
              <SelectItem value="1">1 tab</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePaste}
          aria-label="Paste from clipboard"
        >
          <ClipboardPaste className="h-4 w-4 mr-1" aria-hidden="true" />
          Paste
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          aria-label="Clear input and output"
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
      </div>

      {/* AI, Pipeline, Workspace Actions */}
      <ToolActionsBar
        toolSlug="json-formatter"
        input={input}
        output={output}
        context="json"
      />

      {/* History Panel */}
      {showHistory && hasHistory && (
        <div
          className="rounded-md border bg-muted/30 p-4"
          role="region"
          aria-label="Recent history"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 id="history-heading" className="text-sm font-medium">
              Recent History
            </h3>
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
          <div
            className="space-y-2 max-h-48 overflow-y-auto"
            role="listbox"
            aria-labelledby="history-heading"
          >
            {history.map((item) => (
              <button
                key={item.id}
                role="option"
                aria-selected={input === item.input}
                onClick={() => {
                  loadFromHistory(item.input, item.output);
                  setShowHistory(false);
                }}
                className={`w-full text-left p-2 rounded-md transition-colors text-sm ${
                  input === item.input
                    ? "bg-muted ring-1 ring-primary/20"
                    : "hover:bg-muted"
                }`}
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
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            id="json-error"
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-sm font-medium">
            Input
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="h-[250px] sm:h-[350px] lg:h-[400px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
            aria-describedby={error ? "json-error" : undefined}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="json-output" className="text-sm font-medium">
              Output
            </label>
            {output && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopy}
                className="transition-colors"
                aria-label={
                  copied ? "Copied to clipboard" : "Copy output to clipboard"
                }
              >
                {copied ? (
                  <Check
                    className="h-4 w-4 text-success transition-transform duration-200 scale-110"
                    aria-hidden="true"
                  />
                ) : (
                  <Copy
                    className="h-4 w-4 transition-transform duration-200 hover:scale-110"
                    aria-hidden="true"
                  />
                )}
                <span className="ml-1 transition-colors">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </Button>
            )}
          </div>
          {!output && !input ? (
            <EmptyState
              icon={<FileJson className="h-12 w-12" />}
              title="Start formatting JSON"
              description="Paste your JSON in the input area or click the Paste button to get started. We'll automatically format and validate it."
              className="h-[250px] sm:h-[350px] lg:h-[400px]"
            />
          ) : (
            <textarea
              id="json-output"
              value={output}
              readOnly
              placeholder="Formatted output will appear here"
              className="h-[250px] sm:h-[350px] lg:h-[400px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              spellCheck={false}
              aria-readonly="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
