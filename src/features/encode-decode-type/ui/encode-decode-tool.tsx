"use client";

import { useEffect } from "react";
import {
  Copy,
  Trash2,
  ArrowRightLeft,
  AlertCircle,
  Code,
  FileCode,
} from "lucide-react";
import { Button, Textarea, Label } from "@/shared/ui";
import { useCopyToClipboard } from "@/shared/lib/hooks/use-copy-to-clipboard";
import { useEncodeDecode } from "../model/use-encode-decode";
import type {
  EncodeDecodeType,
  LocaleKey,
} from "@/entities/encode-decode-type";

interface EncodeDecodeToolProps {
  type: EncodeDecodeType;
  locale: string;
  initialMode?: "encode" | "decode";
}

export function EncodeDecodeTool({
  type,
  locale,
  initialMode = "encode",
}: EncodeDecodeToolProps) {
  const {
    input,
    setInput,
    output,
    mode,
    setMode,
    process,
    clear,
    swap,
    isProcessing,
    error,
  } = useEncodeDecode(type);

  const { copy, copied } = useCopyToClipboard();

  // 초기 모드 설정
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, setMode]);

  // 입력이 변경되면 자동 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        process();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [input, process, mode]);

  const localeKey = locale as LocaleKey;

  const labels = {
    encode: {
      en: "Encode",
      ko: "인코딩",
      ja: "エンコード",
    },
    decode: {
      en: "Decode",
      ko: "디코딩",
      ja: "デコード",
    },
    inputPlaceholder: {
      en: `Enter text to ${mode}...`,
      ko: `${mode === "encode" ? "인코딩" : "디코딩"}할 텍스트를 입력하세요...`,
      ja: `${mode === "encode" ? "エンコード" : "デコード"}するテキストを入力...`,
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
    swap: {
      en: "Swap",
      ko: "교환",
      ja: "入れ替え",
    },
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
          className="flex-1"
        >
          <Code className="h-4 w-4 mr-2" />
          {labels.encode[localeKey] || labels.encode.en}
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          <FileCode className="h-4 w-4 mr-2" />
          {labels.decode[localeKey] || labels.decode.en}
        </Button>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            labels.inputPlaceholder[localeKey] || labels.inputPlaceholder.en
          }
          rows={4}
          className="font-mono text-sm"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
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
            rows={4}
            className="font-mono text-sm pr-20 break-all"
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
        <Button variant="outline" onClick={swap} className="flex-1">
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          {labels.swap[localeKey] || labels.swap.en}
        </Button>
        <Button variant="outline" onClick={clear} className="flex-1">
          <Trash2 className="h-4 w-4 mr-2" />
          {labels.clear[localeKey] || labels.clear.en}
        </Button>
      </div>
    </div>
  );
}
