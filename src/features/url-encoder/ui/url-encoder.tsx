"use client";

import { useUrlEncoder, type EncodingMode } from "../model/use-url-encoder";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/shared/ui";
import { ArrowDownUp, Copy, Trash2, Check } from "lucide-react";
import { useState } from "react";

const modeOptions: { value: EncodingMode; label: string; description: string }[] = [
  {
    value: "encodeURIComponent",
    label: "encodeURIComponent",
    description: "쿼리 파라미터 값 인코딩에 적합",
  },
  {
    value: "encodeURI",
    label: "encodeURI",
    description: "전체 URL 인코딩에 적합 (예약 문자 유지)",
  },
];

export function UrlEncoder() {
  const {
    input,
    setInput,
    mode,
    setMode,
    isEncoding,
    setIsEncoding,
    output,
    handleSwap,
    handleClear,
    copyToClipboard,
  } = useUrlEncoder();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>모드</Label>
          <Select value={mode} onValueChange={(v: EncodingMode) => setMode(v)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isEncoding ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEncoding(true)}
          >
            인코딩
          </Button>
          <Button
            variant={!isEncoding ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEncoding(false)}
          >
            디코딩
          </Button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={handleSwap}>
            <ArrowDownUp className="h-4 w-4 mr-2" />
            결과 ↔ 입력
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="h-4 w-4 mr-2" />
            초기화
          </Button>
        </div>
      </div>

      {/* Mode Description */}
      <p className="text-sm text-muted-foreground">
        {modeOptions.find((m) => m.value === mode)?.description}
      </p>

      {/* Input/Output */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{isEncoding ? "원본 텍스트" : "인코딩된 텍스트"}</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="변환할 텍스트를 입력하세요..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>{isEncoding ? "인코딩된 결과" : "디코딩된 결과"}</Label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted"
          />
        </div>
      </div>

      {/* Reference */}
      <div className="rounded-lg border p-4 space-y-2">
        <h4 className="font-medium">참고</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <strong>encodeURIComponent:</strong> 모든 특수문자 인코딩 (쿼리 파라미터에 사용)
          </p>
          <p>
            <strong>encodeURI:</strong> URL 예약문자(: / ? # @ 등) 유지
          </p>
        </div>
      </div>
    </div>
  );
}
