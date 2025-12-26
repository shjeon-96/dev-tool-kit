"use client";

import { useEffect } from "react";
import {
  Copy,
  Trash2,
  AlertCircle,
  Maximize2,
  Minimize2,
  Play,
  Settings,
} from "lucide-react";
import {
  Button,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useCopyToClipboard } from "@/shared/lib/hooks";
import { useFormatType } from "../model/use-format-type";
import type { FormatType, LocaleKey } from "@/entities/format-type";

interface FormatTypeToolProps {
  type: FormatType;
  locale: string;
}

export function FormatTypeTool({ type, locale }: FormatTypeToolProps) {
  const {
    input,
    setInput,
    output,
    mode,
    setMode,
    format,
    clear,
    isProcessing,
    error,
    indentSize,
    setIndentSize,
  } = useFormatType(type);

  const { copy, copied } = useCopyToClipboard();

  // 입력이 변경되면 자동 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        format();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [input, format, mode, indentSize]);

  const localeKey = locale as LocaleKey;

  const labels = {
    beautify: {
      en: "Beautify",
      ko: "정렬",
      ja: "整形",
    },
    minify: {
      en: "Minify",
      ko: "압축",
      ja: "最小化",
    },
    inputPlaceholder: {
      en: `Paste your ${type.name} code here...`,
      ko: `${type.name} 코드를 여기에 붙여넣으세요...`,
      ja: `${type.name}コードをここに貼り付けてください...`,
    },
    output: {
      en: "Output",
      ko: "출력",
      ja: "出力",
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
    format: {
      en: "Format",
      ko: "포맷",
      ja: "フォーマット",
    },
    indent: {
      en: "Indent",
      ko: "들여쓰기",
      ja: "インデント",
    },
    spaces: {
      en: "spaces",
      ko: "칸",
      ja: "スペース",
    },
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle & Settings */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={mode === "beautify" ? "default" : "outline"}
            onClick={() => setMode("beautify")}
            size="sm"
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            {labels.beautify[localeKey] || labels.beautify.en}
          </Button>
          <Button
            variant={mode === "minify" ? "default" : "outline"}
            onClick={() => setMode("minify")}
            size="sm"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            {labels.minify[localeKey] || labels.minify.en}
          </Button>
        </div>

        {mode === "beautify" && (
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <Select
              value={indentSize.toString()}
              onValueChange={(value) => setIndentSize(parseInt(value))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 {labels.spaces[localeKey]}</SelectItem>
                <SelectItem value="4">4 {labels.spaces[localeKey]}</SelectItem>
                <SelectItem value="8">8 {labels.spaces[localeKey]}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Format Info Badge */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted">
          {type.fileExtension}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted">
          {type.mimeType}
        </span>
        {type.supportsComments && (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-success/10 text-success">
            {locale === "ko"
              ? "주석 지원"
              : locale === "ja"
                ? "コメント対応"
                : "Comments Supported"}
          </span>
        )}
      </div>

      {/* Input */}
      <div className="space-y-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            labels.inputPlaceholder[localeKey] || labels.inputPlaceholder.en
          }
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Output */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          {labels.output[localeKey] || labels.output.en}
        </Label>
        <div className="relative">
          <Textarea
            value={output}
            readOnly
            rows={8}
            className="font-mono text-sm pr-20"
            placeholder={isProcessing ? "Processing..." : ""}
          />
          {output && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => copy(output)}
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied
                ? labels.copied[localeKey] || labels.copied.en
                : labels.copy[localeKey] || labels.copy.en}
            </Button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="default" onClick={format} className="flex-1">
          <Play className="h-4 w-4 mr-2" />
          {labels.format[localeKey] || labels.format.en}
        </Button>
        <Button variant="outline" onClick={clear} className="flex-1">
          <Trash2 className="h-4 w-4 mr-2" />
          {labels.clear[localeKey] || labels.clear.en}
        </Button>
      </div>
    </div>
  );
}
