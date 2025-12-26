"use client";

import {
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  ArrowLeftRight,
} from "lucide-react";
import { Button, Textarea } from "@/shared/ui";
import type { Conversion } from "@/entities/converter";
import { useConverter } from "../model/use-converter";
import {
  getFormatLabel,
  getPlaceholder,
  getUIText,
} from "../lib/format-labels";

interface ConverterToolProps {
  conversion: Conversion;
  locale: string;
}

export function ConverterTool({ conversion, locale }: ConverterToolProps) {
  const {
    input,
    output,
    error,
    copied,
    examples,
    setInput,
    handleCopy,
    handleClear,
    handleSwap,
    handleLoadExample,
    canSwap,
    hasExamples,
  } = useConverter({ conversion });

  // 라벨
  const fromLabel = getFormatLabel(conversion.from, locale);
  const toLabel = getFormatLabel(conversion.to, locale);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">{fromLabel}</span>
          <ArrowRight className="h-4 w-4" />
          <span className="font-medium">{toLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          {hasExamples && (
            <Button variant="outline" size="sm" onClick={handleLoadExample}>
              {getUIText("loadExample", locale)}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleClear}>
            <RotateCcw className="h-4 w-4 mr-1" />
            {getUIText("clear", locale)}
          </Button>
        </div>
      </div>

      {/* Converter Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{fromLabel}</label>
          <Textarea
            placeholder={getPlaceholder(conversion.from, locale)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{toLabel}</label>
            <div className="flex items-center gap-2">
              {canSwap && (
                <Button variant="ghost" size="sm" onClick={handleSwap}>
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Textarea
            value={error ? "" : output}
            readOnly
            className={`min-h-[200px] font-mono text-sm ${
              error ? "border-destructive" : ""
            }`}
            placeholder={error || ""}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>

      {/* Examples Section */}
      {hasExamples && (
        <div className="mt-8 p-4 rounded-lg border bg-muted/30">
          <h3 className="text-sm font-medium mb-3">
            {getUIText("examples", locale)}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {getUIText("input", locale)}
              </p>
              <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                {examples[0].input}
              </pre>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {getUIText("output", locale)}
              </p>
              <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                {examples[0].output}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
