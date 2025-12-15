"use client";

import { useHtmlEntity, type EntityMode } from "../model/use-html-entity";
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

const modeOptions: { value: EntityMode; label: string; example: string }[] = [
  { value: "named", label: "Named Entity", example: "&amp; &lt; &gt;" },
  { value: "numeric", label: "Numeric (Hex)", example: "&#x26; &#x3C; &#x3E;" },
  {
    value: "decimal",
    label: "Numeric (Decimal)",
    example: "&#38; &#60; &#62;",
  },
];

const commonEntities = [
  { char: "&", entity: "&amp;", name: "Ampersand" },
  { char: "<", entity: "&lt;", name: "Less than" },
  { char: ">", entity: "&gt;", name: "Greater than" },
  { char: '"', entity: "&quot;", name: "Quotation mark" },
  { char: "'", entity: "&apos;", name: "Apostrophe" },
  { char: " ", entity: "&nbsp;", name: "Non-breaking space" },
  { char: "©", entity: "&copy;", name: "Copyright" },
  { char: "®", entity: "&reg;", name: "Registered" },
  { char: "™", entity: "&trade;", name: "Trademark" },
  { char: "€", entity: "&euro;", name: "Euro" },
];

export function HtmlEntity() {
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
  } = useHtmlEntity();

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
          <Label>형식</Label>
          <Select value={mode} onValueChange={(v: EntityMode) => setMode(v)}>
            <SelectTrigger className="w-44">
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

      {/* Example */}
      <p className="text-sm text-muted-foreground">
        예시: {modeOptions.find((m) => m.value === mode)?.example}
      </p>

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label>{isEncoding ? "원본 HTML" : "인코딩된 텍스트"}</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="HTML 텍스트를 입력하세요..."
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

      {/* Common Entities Reference */}
      <div className="rounded-lg border p-4">
        <h4 className="font-medium mb-3">자주 사용하는 HTML 엔티티</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
          {commonEntities.map((item) => (
            <div
              key={item.entity}
              className="flex items-center gap-2 p-2 rounded bg-muted"
            >
              <span className="font-mono text-lg">{item.char}</span>
              <span className="text-muted-foreground font-mono text-xs">
                {item.entity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
