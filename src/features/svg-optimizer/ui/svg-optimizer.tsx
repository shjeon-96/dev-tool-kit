"use client";

import {
  useSvgOptimizer,
  type OptimizeOptions,
} from "../model/use-svg-optimizer";
import { Button, Label, Textarea, Switch } from "@/shared/ui";
import {
  Copy,
  Check,
  Download,
  RotateCcw,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const optionLabels: Record<keyof OptimizeOptions, string> = {
  removeDoctype: "DOCTYPE 제거",
  removeXMLProcInst: "XML 선언 제거",
  removeComments: "주석 제거",
  removeMetadata: "메타데이터 제거",
  removeTitle: "Title 제거",
  removeDesc: "Description 제거",
  removeUselessDefs: "불필요한 Defs 제거",
  removeEditorsNSData: "에디터 데이터 제거",
  removeEmptyAttrs: "빈 속성 제거",
  removeHiddenElems: "숨겨진 요소 제거",
  removeEmptyContainers: "빈 컨테이너 제거",
  cleanupNumericValues: "숫자 값 정리",
  convertColors: "색상 변환",
  removeUnknownsAndDefaults: "기본값 제거",
  removeNonInheritableGroupAttrs: "비상속 그룹 속성 제거",
  removeUselessStrokeAndFill: "불필요한 Stroke/Fill 제거",
  cleanupIds: "ID 정리",
  mergePaths: "경로 병합",
  convertShapeToPath: "도형을 경로로 변환",
  minifyStyles: "스타일 축소",
};

export function SvgOptimizer() {
  const {
    inputSvg,
    setInputSvg,
    outputSvg,
    options,
    updateOption,
    resetOptions,
    optimizeSvg,
    isProcessing,
    error,
    stats,
    formatBytes,
    copyToClipboard,
    downloadSvg,
    reset,
  } = useSvgOptimizer();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(outputSvg);
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
            <Label>입력 SVG</Label>
            <span className="text-sm text-muted-foreground">
              {formatBytes(stats.inputSize)}
            </span>
          </div>
          <Textarea
            value={inputSvg}
            onChange={(e) => setInputSvg(e.target.value)}
            placeholder="SVG 코드를 붙여넣으세요..."
            className="font-mono text-sm min-h-[200px] sm:min-h-[280px] lg:min-h-[300px]"
          />

          {/* Preview */}
          {inputSvg && (
            <div className="space-y-2">
              <Label>입력 미리보기</Label>
              <div
                className="p-4 rounded-lg border bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] flex items-center justify-center"
                style={{ minHeight: "150px" }}
              >
                <div
                  className="max-w-full max-h-[200px]"
                  dangerouslySetInnerHTML={{ __html: inputSvg }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>최적화된 SVG</Label>
            <div className="flex items-center gap-2">
              {outputSvg && (
                <>
                  <span className="text-sm text-muted-foreground">
                    {formatBytes(stats.outputSize)}
                  </span>
                  {stats.percent > 0 && (
                    <span className="text-sm text-green-600 font-medium">
                      -{stats.percent}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          <Textarea
            value={outputSvg}
            readOnly
            placeholder="최적화 결과가 여기에 표시됩니다..."
            className="font-mono text-sm min-h-[200px] sm:min-h-[280px] lg:min-h-[300px]"
          />

          {/* Preview */}
          {outputSvg && (
            <div className="space-y-2">
              <Label>출력 미리보기</Label>
              <div
                className="p-4 rounded-lg border bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] flex items-center justify-center"
                style={{ minHeight: "150px" }}
              >
                <div
                  className="max-w-full max-h-[200px]"
                  dangerouslySetInnerHTML={{ __html: outputSvg }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button onClick={optimizeSvg} disabled={!inputSvg || isProcessing}>
          <Zap className="h-4 w-4 mr-2" />
          {isProcessing ? "처리 중..." : "최적화"}
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!outputSvg}>
          {copied ? (
            <Check className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {copied ? "복사됨" : "복사"}
        </Button>
        <Button variant="outline" onClick={downloadSvg} disabled={!outputSvg}>
          <Download className="h-4 w-4 mr-2" />
          다운로드
        </Button>
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          초기화
        </Button>
      </div>

      {/* Stats */}
      {outputSvg && (
        <div className="p-4 rounded-lg bg-muted">
          <h3 className="font-semibold mb-2">최적화 결과</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">원본 크기</p>
              <p className="font-mono">{formatBytes(stats.inputSize)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">최적화 크기</p>
              <p className="font-mono">{formatBytes(stats.outputSize)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">절약</p>
              <p className="font-mono text-green-600">
                {formatBytes(stats.saved)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">압축률</p>
              <p className="font-mono text-green-600">{stats.percent}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>최적화 옵션</Label>
          <Button variant="ghost" size="sm" onClick={resetOptions}>
            기본값으로 복원
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(Object.keys(options) as (keyof OptimizeOptions)[]).map((key) => (
            <div key={key} className="flex items-center gap-2">
              <Switch
                id={key}
                checked={options[key]}
                onCheckedChange={(checked) => updateOption(key, checked)}
              />
              <label htmlFor={key} className="text-sm cursor-pointer">
                {optionLabels[key]}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
