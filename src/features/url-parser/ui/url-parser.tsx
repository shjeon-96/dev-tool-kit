"use client";

import { useState } from "react";
import { useUrlParser } from "../model/use-url-parser";
import { Button, Input, Label } from "@/shared/ui";
import { Copy, Check, Plus, Trash2, RotateCcw } from "lucide-react";

function CopyButton({ text, onCopy }: { text: string; onCopy: (text: string) => Promise<boolean> }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </Button>
  );
}

export function UrlParser() {
  const {
    input,
    setInput,
    parsedUrl,
    queryParams,
    error,
    updateQueryParam,
    addQueryParam,
    removeQueryParam,
    copyToClipboard,
    handleClear,
  } = useUrlParser();

  const urlComponents = parsedUrl
    ? [
        { label: "Protocol", value: parsedUrl.protocol },
        { label: "Host", value: parsedUrl.host },
        { label: "Hostname", value: parsedUrl.hostname },
        { label: "Port", value: parsedUrl.port || "(기본값)" },
        { label: "Pathname", value: parsedUrl.pathname },
        { label: "Search", value: parsedUrl.search || "(없음)" },
        { label: "Hash", value: parsedUrl.hash || "(없음)" },
        { label: "Origin", value: parsedUrl.origin },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>URL 입력</Label>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <RotateCcw className="h-4 w-4 mr-2" />
            초기화
          </Button>
        </div>
        <Input
          type="text"
          placeholder="https://example.com/path?query=value#hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Parsed Results */}
      {parsedUrl && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* URL Components */}
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-4">URL 구성요소</h3>
            <div className="space-y-3">
              {urlComponents.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground w-24 shrink-0">
                    {item.label}
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <code className="flex-1 text-sm bg-muted px-2 py-1 rounded truncate">
                      {item.value}
                    </code>
                    {item.value && item.value !== "(없음)" && item.value !== "(기본값)" && (
                      <CopyButton text={item.value} onCopy={copyToClipboard} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Query Parameters */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">쿼리 파라미터</h3>
              <Button variant="outline" size="sm" onClick={addQueryParam}>
                <Plus className="h-4 w-4 mr-2" />
                추가
              </Button>
            </div>

            {queryParams.length > 0 ? (
              <div className="space-y-2">
                {queryParams.map((param, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={param.key}
                      onChange={(e) => updateQueryParam(index, "key", e.target.value)}
                      placeholder="key"
                      className="flex-1 font-mono text-sm"
                    />
                    <span className="text-muted-foreground">=</span>
                    <Input
                      value={param.value}
                      onChange={(e) => updateQueryParam(index, "value", e.target.value)}
                      placeholder="value"
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeQueryParam(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                쿼리 파라미터가 없습니다
              </p>
            )}
          </div>
        </div>
      )}

      {/* Full URL Preview */}
      {parsedUrl && (
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">전체 URL</h3>
            <CopyButton text={parsedUrl.href} onCopy={copyToClipboard} />
          </div>
          <code className="block text-sm bg-muted p-3 rounded break-all">
            {parsedUrl.href}
          </code>
        </div>
      )}
    </div>
  );
}
