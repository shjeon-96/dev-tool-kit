"use client";

import { Copy, Trash2, RefreshCw, Settings } from "lucide-react";
import {
  Button,
  Textarea,
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useCopyToClipboard } from "@/shared/lib/hooks";
import { useGenerateType } from "../model/use-generate-type";
import type { GenerateType, LocaleKey } from "@/entities/generate-type";

interface GenerateTypeToolProps {
  type: GenerateType;
  locale: string;
}

export function GenerateTypeTool({ type, locale }: GenerateTypeToolProps) {
  const {
    output,
    outputs,
    generate,
    generateMultiple,
    clear,
    isProcessing,
    count,
    setCount,
    options,
    setOptions,
  } = useGenerateType(type);

  const { copy, copied } = useCopyToClipboard();

  const localeKey = locale as LocaleKey;

  const labels = {
    generate: {
      en: "Generate",
      ko: "생성",
      ja: "生成",
    },
    generateMultiple: {
      en: "Generate Multiple",
      ko: "여러 개 생성",
      ja: "複数生成",
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
    count: {
      en: "Count",
      ko: "개수",
      ja: "個数",
    },
    length: {
      en: "Length",
      ko: "길이",
      ja: "長さ",
    },
    options: {
      en: "Options",
      ko: "옵션",
      ja: "オプション",
    },
    example: {
      en: "Example",
      ko: "예시",
      ja: "例",
    },
  };

  // 옵션이 필요한 타입인지 확인
  const needsOptions = ["password", "api-key", "string", "number"].includes(
    type.slug,
  );

  return (
    <div className="space-y-6">
      {/* Type Info Badge */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted capitalize">
          {type.category}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-info/10 text-info">
          {labels.example[localeKey]}: {type.outputExample}
        </span>
      </div>

      {/* Options (for types that need them) */}
      {needsOptions && (
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4" />
            <span className="font-medium text-sm">
              {labels.options[localeKey] || labels.options.en}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{labels.length[localeKey] || labels.length.en}</Label>
              <Input
                type="number"
                value={options.length || 16}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    length: parseInt(e.target.value) || 16,
                  })
                }
                min={4}
                max={128}
              />
            </div>

            {type.slug === "api-key" && (
              <div className="space-y-2">
                <Label>Prefix</Label>
                <Input
                  type="text"
                  value={options.prefix || ""}
                  onChange={(e) =>
                    setOptions({ ...options, prefix: e.target.value })
                  }
                  placeholder="sk_live_"
                />
              </div>
            )}
          </div>

          {type.slug === "password" && (
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeUppercase}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      includeUppercase: e.target.checked,
                    })
                  }
                />
                A-Z
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      includeLowercase: e.target.checked,
                    })
                  }
                />
                a-z
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) =>
                    setOptions({ ...options, includeNumbers: e.target.checked })
                  }
                />
                0-9
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.includeSymbols}
                  onChange={(e) =>
                    setOptions({ ...options, includeSymbols: e.target.checked })
                  }
                />
                !@#$%
              </label>
            </div>
          )}
        </div>
      )}

      {/* Count Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>{labels.count[localeKey] || labels.count.en}</Label>
          <Select
            value={count.toString()}
            onValueChange={(value) => setCount(parseInt(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => generateMultiple(count)} disabled={isProcessing}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isProcessing ? "animate-spin" : ""}`}
          />
          {count > 1
            ? labels.generateMultiple[localeKey] || labels.generateMultiple.en
            : labels.generate[localeKey] || labels.generate.en}
        </Button>
      </div>

      {/* Output */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          {labels.output[localeKey] || labels.output.en}
          {outputs.length > 0 && (
            <span className="text-xs text-muted-foreground">
              ({outputs.length}{" "}
              {locale === "ko" ? "개" : locale === "ja" ? "件" : "items"})
            </span>
          )}
        </Label>
        <div className="relative">
          <Textarea
            value={outputs.join("\n")}
            readOnly
            rows={Math.min(outputs.length + 1, 10)}
            className="font-mono text-sm pr-20"
            placeholder={isProcessing ? "Generating..." : ""}
          />
          {outputs.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => copy(outputs.join("\n"))}
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
        <Button
          variant="default"
          onClick={() => generateMultiple(count)}
          className="flex-1"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isProcessing ? "animate-spin" : ""}`}
          />
          {labels.generate[localeKey] || labels.generate.en}
        </Button>
        <Button variant="outline" onClick={clear} className="flex-1">
          <Trash2 className="h-4 w-4 mr-2" />
          {labels.clear[localeKey] || labels.clear.en}
        </Button>
      </div>
    </div>
  );
}
