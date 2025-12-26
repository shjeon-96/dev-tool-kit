"use client";

import { useCssToTailwind } from "../model/use-css-to-tailwind";
import { Button, Label, Textarea } from "@/shared/ui";
import { Copy, Check, RotateCcw, FileCode, AlertCircle } from "lucide-react";
import { useState } from "react";

export function CssToTailwind() {
  const { inputCss, setInputCss, result, copyToClipboard, reset, loadExample } =
    useCssToTailwind();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(result.tailwind);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>CSS 입력</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadExample}>
                <FileCode className="h-4 w-4 mr-2" />
                예시 로드
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            value={inputCss}
            onChange={(e) => setInputCss(e.target.value)}
            placeholder={`.example {
  display: flex;
  padding: 16px;
  margin: 8px;
}`}
            className="font-mono text-sm min-h-[200px] sm:min-h-[280px] lg:min-h-[300px]"
          />
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Tailwind 클래스</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!result.tailwind}
            >
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "복사됨" : "복사"}
            </Button>
          </div>
          <div className="p-4 rounded-lg border bg-card min-h-[100px]">
            {result.tailwind ? (
              <code className="text-sm font-mono break-all">
                {result.tailwind}
              </code>
            ) : (
              <p className="text-sm text-muted-foreground">
                CSS를 입력하면 Tailwind 클래스가 여기에 표시됩니다
              </p>
            )}
          </div>

          {/* Unsupported */}
          {result.unsupported.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-warning">
                <AlertCircle className="h-4 w-4" />
                <Label className="text-warning">변환 불가 속성</Label>
              </div>
              <div className="p-4 rounded-lg border border-warning/30 bg-warning/10">
                <ul className="text-sm font-mono space-y-1">
                  {result.unsupported.map((item, i) => (
                    <li key={i} className="text-warning">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Preview */}
          {result.tailwind && (
            <div className="space-y-2">
              <Label>미리보기</Label>
              <div className="p-4 rounded-lg border bg-card">
                <div className={result.tailwind}>
                  <span>미리보기 텍스트</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cheatsheet */}
      <div className="space-y-4">
        <Label>지원되는 CSS 속성</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
          <div className="p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">레이아웃</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>display</li>
              <li>position</li>
              <li>overflow</li>
              <li>z-index</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">Flexbox</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>flex-direction</li>
              <li>flex-wrap</li>
              <li>justify-content</li>
              <li>align-items</li>
              <li>gap</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">크기</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>width, height</li>
              <li>max-width, min-width</li>
              <li>margin, padding</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">타이포그래피</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>font-size</li>
              <li>font-weight</li>
              <li>text-align</li>
              <li>text-decoration</li>
              <li>text-transform</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">색상</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>color (기본 색상)</li>
              <li>background-color</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">테두리</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>border-radius</li>
              <li>border-width</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">효과</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>opacity</li>
              <li>cursor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
