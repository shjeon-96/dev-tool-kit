"use client";

import { useState } from "react";
import { Copy, Check, Trash2, ClipboardPaste } from "lucide-react";
import { Button } from "@/shared/ui";
import { useJsonFormatter, type FormatMode } from "../model/use-json-formatter";

export function JsonFormatter() {
  const {
    input,
    output,
    error,
    indent,
    setInput,
    setIndent,
    handleFormat,
    handleCopy,
    handleClear,
    handlePaste,
  } = useJsonFormatter();

  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const success = await handleCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatButtons: { mode: FormatMode; label: string }[] = [
    { mode: "beautify", label: "Beautify" },
    { mode: "minify", label: "Minify" },
    { mode: "validate", label: "Validate" },
  ];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {formatButtons.map(({ mode, label }) => (
          <Button key={mode} onClick={() => handleFormat(mode)} size="sm">
            {label}
          </Button>
        ))}

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-muted-foreground">Indent:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="h-8 rounded-md border bg-background px-2 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>

        <Button variant="outline" size="sm" onClick={handlePaste}>
          <ClipboardPaste className="h-4 w-4 mr-1" />
          Paste
        </Button>

        <Button variant="outline" size="sm" onClick={handleClear}>
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
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
            placeholder="Formatted output will appear here"
            className="h-[400px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
