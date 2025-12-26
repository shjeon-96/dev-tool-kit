"use client";

import { useRegexTester, type RegexFlags } from "../model/use-regex-tester";
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

const flagDescriptions: Record<
  keyof RegexFlags,
  { label: string; desc: string }
> = {
  global: { label: "g", desc: "전역 검색" },
  ignoreCase: { label: "i", desc: "대소문자 무시" },
  multiline: { label: "m", desc: "여러 줄 모드" },
  dotAll: { label: "s", desc: ". 이 줄바꿈 포함" },
  unicode: { label: "u", desc: "유니코드 모드" },
  sticky: { label: "y", desc: "고정 위치 검색" },
};

export function RegexTester() {
  const {
    pattern,
    setPattern,
    testString,
    setTestString,
    replacement,
    setReplacement,
    flags,
    toggleFlag,
    flagString,
    error,
    matches,
    replacedString,
    highlightedText,
    copyToClipboard,
    cheatSheet,
    commonPatterns,
    applyPattern,
  } = useRegexTester();

  const [copiedPattern, setCopiedPattern] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);

  const handleCopyPattern = async () => {
    const fullPattern = `/${pattern}/${flagString}`;
    const success = await copyToClipboard(fullPattern);
    if (success) {
      setCopiedPattern(true);
      setTimeout(() => setCopiedPattern(false), 2000);
    }
  };

  const handleCopyResult = async () => {
    const success = await copyToClipboard(replacedString);
    if (success) {
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel - Pattern & Test String */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pattern Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>정규식 패턴</Label>
              <Button variant="outline" size="sm" onClick={handleCopyPattern}>
                {copiedPattern ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copiedPattern ? "복사됨" : "복사"}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="패턴 입력..."
                className="font-mono"
              />
              <span className="text-muted-foreground">/</span>
              <span className="font-mono text-sm w-16">
                {flagString || "없음"}
              </span>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          {/* Flags */}
          <div className="space-y-2">
            <Label>플래그</Label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(flagDescriptions) as (keyof RegexFlags)[]).map(
                (flag) => (
                  <Button
                    key={flag}
                    variant={flags[flag] ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFlag(flag)}
                    title={flagDescriptions[flag].desc}
                  >
                    {flagDescriptions[flag].label}
                  </Button>
                ),
              )}
            </div>
          </div>

          {/* Common Patterns */}
          <div className="space-y-2">
            <Label>자주 쓰는 패턴</Label>
            <Select onValueChange={applyPattern}>
              <SelectTrigger>
                <SelectValue placeholder="패턴 선택..." />
              </SelectTrigger>
              <SelectContent>
                {commonPatterns.map((p) => (
                  <SelectItem key={p.name} value={p.pattern}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Test String */}
          <div className="space-y-2">
            <Label>테스트 문자열</Label>
            <Textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="테스트할 문자열을 입력하세요..."
              className="font-mono text-sm min-h-[120px]"
            />
          </div>

          {/* Highlighted Result */}
          {highlightedText && (
            <div className="space-y-2">
              <Label>매칭 결과</Label>
              <div className="p-4 rounded-lg border bg-card font-mono text-sm whitespace-pre-wrap break-all">
                {highlightedText.map((part, i) => (
                  <span
                    key={i}
                    className={
                      part.isMatch ? "bg-warning/40 dark:bg-warning/30" : ""
                    }
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Replacement */}
          <div className="space-y-2">
            <Label>치환 문자열</Label>
            <Input
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder="치환할 문자열 (예: $1, $&)..."
              className="font-mono"
            />
          </div>

          {/* Replaced Result */}
          {replacement && replacedString && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>치환 결과</Label>
                <Button variant="outline" size="sm" onClick={handleCopyResult}>
                  {copiedResult ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copiedResult ? "복사됨" : "복사"}
                </Button>
              </div>
              <div className="p-4 rounded-lg border bg-muted font-mono text-sm whitespace-pre-wrap break-all">
                {replacedString}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Match Info & Cheatsheet */}
        <div className="space-y-4">
          {/* Match Info */}
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-3">매칭 정보</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">매칭 수</span>
                <span className="font-mono">{matches.length}</span>
              </div>
              {matches.length > 0 && (
                <div className="max-h-[200px] overflow-y-auto space-y-1 mt-2">
                  {matches.map((match, i) => (
                    <div key={i} className="p-2 rounded bg-muted text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">#{i + 1}</span>
                        <span className="font-mono">위치: {match.index}</span>
                      </div>
                      <div className="font-mono mt-1 break-all">
                        &quot;{match.match}&quot;
                      </div>
                      {match.groups && Object.keys(match.groups).length > 0 && (
                        <div className="mt-1 text-muted-foreground">
                          그룹: {JSON.stringify(match.groups)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cheatsheet */}
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-3">치트시트</h3>
            <div className="space-y-1 text-xs max-h-[400px] overflow-y-auto">
              {cheatSheet.map((item) => (
                <div key={item.pattern} className="flex gap-2">
                  <code className="font-mono bg-muted px-1 rounded w-12 text-center">
                    {item.pattern}
                  </code>
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
