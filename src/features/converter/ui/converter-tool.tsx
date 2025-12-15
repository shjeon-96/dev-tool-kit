"use client";

import { useState, useMemo } from "react";
import {
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  ArrowLeftRight,
} from "lucide-react";
import { Button, Textarea } from "@/shared/ui";
import { useCopyToClipboard, useDebounce } from "@/shared/lib";
import type { Conversion } from "@/entities/converter";
import { getConverter } from "@/entities/converter";
import { getExamples } from "@/entities/converter/model/examples";

interface ConverterToolProps {
  conversion: Conversion;
  locale: string;
}

export function ConverterTool({ conversion, locale }: ConverterToolProps) {
  const [input, setInput] = useState("");
  const { copied, copy } = useCopyToClipboard();

  const debouncedInput = useDebounce(input, 300);

  // Auto-convert using useMemo (derived state)
  const { output, error } = useMemo(() => {
    if (!debouncedInput.trim()) {
      return { output: "", error: null };
    }

    const converter = getConverter(conversion.slug);
    if (!converter) {
      return { output: "", error: "Converter not found" };
    }

    const result = converter(debouncedInput);
    if (result.success) {
      return { output: result.output, error: null };
    } else {
      return { output: "", error: result.error || "Conversion failed" };
    }
  }, [debouncedInput, conversion.slug]);

  const handleCopy = () => {
    copy(output);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleSwap = () => {
    if (conversion.direction === "bidirectional" && output) {
      setInput(output);
    }
  };

  const handleLoadExample = () => {
    const examples = getExamples(conversion.slug);
    if (examples.length > 0) {
      setInput(examples[0].input);
    }
  };

  const examples = getExamples(conversion.slug);

  // 입력/출력 라벨
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
          {examples.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleLoadExample}>
              {locale === "ko"
                ? "예시 불러오기"
                : locale === "ja"
                  ? "例を読み込む"
                  : "Load Example"}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleClear}>
            <RotateCcw className="h-4 w-4 mr-1" />
            {locale === "ko" ? "초기화" : locale === "ja" ? "クリア" : "Clear"}
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
              {conversion.direction === "bidirectional" && output && (
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
      {examples.length > 0 && (
        <div className="mt-8 p-4 rounded-lg border bg-muted/30">
          <h3 className="text-sm font-medium mb-3">
            {locale === "ko" ? "예시" : locale === "ja" ? "例" : "Examples"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {locale === "ko" ? "입력" : locale === "ja" ? "入力" : "Input"}
              </p>
              <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                {examples[0].input}
              </pre>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {locale === "ko" ? "출력" : locale === "ja" ? "出力" : "Output"}
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

// 포맷 라벨 헬퍼
function getFormatLabel(format: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    json: { en: "JSON", ko: "JSON", ja: "JSON" },
    yaml: { en: "YAML", ko: "YAML", ja: "YAML" },
    csv: { en: "CSV", ko: "CSV", ja: "CSV" },
    xml: { en: "XML", ko: "XML", ja: "XML" },
    base64: { en: "Base64", ko: "Base64", ja: "Base64" },
    text: { en: "Text", ko: "텍스트", ja: "テキスト" },
    url: { en: "URL Encoded", ko: "URL 인코딩", ja: "URLエンコード" },
    "hex-color": { en: "HEX Color", ko: "HEX 색상", ja: "HEXカラー" },
    rgb: { en: "RGB", ko: "RGB", ja: "RGB" },
    hsl: { en: "HSL", ko: "HSL", ja: "HSL" },
    decimal: { en: "Decimal", ko: "10진수", ja: "10進数" },
    "binary-num": { en: "Binary", ko: "2진수", ja: "2進数" },
    hexadecimal: { en: "Hexadecimal", ko: "16진수", ja: "16進数" },
    md5: { en: "MD5 Hash", ko: "MD5 해시", ja: "MD5ハッシュ" },
    sha256: { en: "SHA256 Hash", ko: "SHA256 해시", ja: "SHA256ハッシュ" },
    unix: {
      en: "Unix Timestamp",
      ko: "Unix 타임스탬프",
      ja: "Unixタイムスタンプ",
    },
    datetime: { en: "Date/Time", ko: "날짜/시간", ja: "日付/時間" },
    typescript: { en: "TypeScript", ko: "TypeScript", ja: "TypeScript" },
    css: { en: "CSS", ko: "CSS", ja: "CSS" },
    tailwind: { en: "Tailwind CSS", ko: "Tailwind CSS", ja: "Tailwind CSS" },
  };

  return labels[format]?.[locale] || labels[format]?.en || format.toUpperCase();
}

// 플레이스홀더 헬퍼
function getPlaceholder(format: string, locale: string): string {
  const placeholders: Record<string, Record<string, string>> = {
    json: {
      en: "Paste JSON here...",
      ko: "JSON을 붙여넣으세요...",
      ja: "JSONを貼り付けてください...",
    },
    yaml: {
      en: "Paste YAML here...",
      ko: "YAML을 붙여넣으세요...",
      ja: "YAMLを貼り付けてください...",
    },
    csv: {
      en: "Paste CSV here...",
      ko: "CSV를 붙여넣으세요...",
      ja: "CSVを貼り付けてください...",
    },
    text: {
      en: "Enter text here...",
      ko: "텍스트를 입력하세요...",
      ja: "テキストを入力してください...",
    },
    base64: {
      en: "Enter Base64 string...",
      ko: "Base64 문자열을 입력하세요...",
      ja: "Base64文字列を入力...",
    },
    url: {
      en: "Enter URL encoded string...",
      ko: "URL 인코딩된 문자열을 입력하세요...",
      ja: "URLエンコードされた文字列を入力...",
    },
    "hex-color": {
      en: "#FF5733 or FF5733",
      ko: "#FF5733 또는 FF5733",
      ja: "#FF5733 または FF5733",
    },
    rgb: {
      en: "rgb(255, 87, 51) or 255, 87, 51",
      ko: "rgb(255, 87, 51) 또는 255, 87, 51",
      ja: "rgb(255, 87, 51) または 255, 87, 51",
    },
    decimal: {
      en: "Enter decimal number...",
      ko: "10진수를 입력하세요...",
      ja: "10進数を入力...",
    },
    "binary-num": {
      en: "Enter binary number (0s and 1s)...",
      ko: "2진수를 입력하세요 (0과 1)...",
      ja: "2進数を入力 (0と1)...",
    },
    hexadecimal: {
      en: "Enter hex number (0-9, A-F)...",
      ko: "16진수를 입력하세요 (0-9, A-F)...",
      ja: "16進数を入力 (0-9, A-F)...",
    },
    unix: {
      en: "Enter Unix timestamp...",
      ko: "Unix 타임스탬프를 입력하세요...",
      ja: "Unixタイムスタンプを入力...",
    },
    datetime: {
      en: "2023-12-15 or ISO format...",
      ko: "2023-12-15 또는 ISO 형식...",
      ja: "2023-12-15 または ISO形式...",
    },
  };

  return (
    placeholders[format]?.[locale] ||
    placeholders[format]?.en ||
    `Enter ${format}...`
  );
}
