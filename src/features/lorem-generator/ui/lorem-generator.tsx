"use client";

import { useLoremGenerator, type GenerateUnit } from "../model/use-lorem-generator";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
} from "@/shared/ui";
import { Copy, RefreshCw, Check } from "lucide-react";
import { useState } from "react";

const unitOptions: { value: GenerateUnit; label: string }[] = [
  { value: "words", label: "단어" },
  { value: "sentences", label: "문장" },
  { value: "paragraphs", label: "문단" },
];

export function LoremGenerator() {
  const {
    unit,
    setUnit,
    count,
    setCount,
    useHtml,
    setUseHtml,
    useKorean,
    setUseKorean,
    startWithLorem,
    setStartWithLorem,
    generatedText,
    copyToClipboard,
  } = useLoremGenerator();

  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    setKey(k => k + 1);
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {/* Unit Selection */}
          <div className="flex items-center gap-4">
            <Label className="w-20">단위</Label>
            <Select
              value={unit}
              onValueChange={(value: GenerateUnit) => setUnit(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Count Slider */}
          <div className="flex items-center gap-4">
            <Label className="w-20">수량</Label>
            <div className="flex-1 flex items-center gap-4">
              <Slider
                value={[count]}
                onValueChange={([value]) => setCount(value)}
                min={1}
                max={unit === "words" ? 100 : unit === "sentences" ? 20 : 10}
                step={1}
                className="flex-1"
              />
              <span className="w-8 text-center text-sm font-medium">{count}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Options */}
          <div className="flex items-center justify-between">
            <Label>HTML 태그 포함</Label>
            <Switch
              checked={useHtml}
              onCheckedChange={setUseHtml}
              disabled={unit !== "paragraphs"}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>한국어 텍스트</Label>
            <Switch
              checked={useKorean}
              onCheckedChange={setUseKorean}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Lorem으로 시작</Label>
            <Switch
              checked={startWithLorem}
              onCheckedChange={setStartWithLorem}
              disabled={useKorean}
            />
          </div>
        </div>
      </div>

      {/* Generated Text */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>생성된 텍스트</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRegenerate}>
              <RefreshCw className="h-4 w-4 mr-2" />
              재생성
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "복사됨" : "복사"}
            </Button>
          </div>
        </div>
        <Textarea
          key={key}
          value={generatedText}
          readOnly
          className="min-h-[300px] font-mono text-sm"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span>문자 수: {generatedText.length}</span>
        <span>단어 수: {generatedText.split(/\s+/).filter(Boolean).length}</span>
      </div>
    </div>
  );
}
