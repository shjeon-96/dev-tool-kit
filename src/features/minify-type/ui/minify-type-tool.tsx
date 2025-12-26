"use client";

import { Copy, Trash2, Minimize2, ArrowRight } from "lucide-react";
import { Button, Textarea, Label } from "@/shared/ui";
import { useCopyToClipboard } from "@/shared/lib/hooks";
import { useMinifyType } from "../model/use-minify-type";
import type { MinifyType, LocaleKey } from "@/entities/minify-type";

interface MinifyTypeToolProps {
  type: MinifyType;
  locale: string;
}

export function MinifyTypeTool({ type, locale }: MinifyTypeToolProps) {
  const { input, setInput, output, minify, clear, isProcessing, error, stats } =
    useMinifyType(type);

  const { copy, copied } = useCopyToClipboard();

  const localeKey = locale as LocaleKey;

  const labels = {
    input: {
      en: "Input",
      ko: "입력",
      ja: "入力",
    },
    output: {
      en: "Output",
      ko: "출력",
      ja: "出力",
    },
    minify: {
      en: "Minify",
      ko: "압축",
      ja: "圧縮",
    },
    copy: {
      en: "Copy",
      ko: "복사",
      ja: "コピー",
    },
    copied: {
      en: "Copied!",
      ko: "복사됨!",
      ja: "コピー完了!",
    },
    clear: {
      en: "Clear",
      ko: "지우기",
      ja: "クリア",
    },
    placeholder: {
      en: `Paste your ${type.name} here...`,
      ko: `${type.name}을(를) 붙여넣으세요...`,
      ja: `${type.name}をここに貼り付けてください...`,
    },
    originalSize: {
      en: "Original",
      ko: "원본",
      ja: "元のサイズ",
    },
    minifiedSize: {
      en: "Minified",
      ko: "압축 후",
      ja: "圧縮後",
    },
    savings: {
      en: "Savings",
      ko: "절약",
      ja: "削減",
    },
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Type Info Badge */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted capitalize">
          {type.category}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-info/10 text-info">
          {type.fileExtension}
        </span>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <Label>{labels.input[localeKey] || labels.input.en}</Label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          className="font-mono text-sm"
          placeholder={labels.placeholder[localeKey] || labels.placeholder.en}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={minify}
          disabled={isProcessing || !input.trim()}
          className="flex-1"
        >
          <Minimize2 className="h-4 w-4 mr-2" />
          {labels.minify[localeKey] || labels.minify.en}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Button variant="outline" onClick={clear}>
          <Trash2 className="h-4 w-4 mr-2" />
          {labels.clear[localeKey] || labels.clear.en}
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
          <div className="text-center">
            <div className="text-muted-foreground">
              {labels.originalSize[localeKey] || labels.originalSize.en}
            </div>
            <div className="font-mono font-medium">
              {formatBytes(stats.originalSize)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">
              {labels.minifiedSize[localeKey] || labels.minifiedSize.en}
            </div>
            <div className="font-mono font-medium text-success">
              {formatBytes(stats.minifiedSize)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">
              {labels.savings[localeKey] || labels.savings.en}
            </div>
            <div className="font-mono font-medium text-info">
              {stats.savingsPercent.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="space-y-2">
          <Label className="flex items-center justify-between">
            <span>{labels.output[localeKey] || labels.output.en}</span>
            <Button size="sm" variant="ghost" onClick={() => copy(output)}>
              <Copy className="h-4 w-4 mr-1" />
              {copied
                ? labels.copied[localeKey] || labels.copied.en
                : labels.copy[localeKey] || labels.copy.en}
            </Button>
          </Label>
          <Textarea
            value={output}
            readOnly
            rows={6}
            className="font-mono text-sm bg-muted/30"
          />
        </div>
      )}
    </div>
  );
}
