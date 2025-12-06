"use client";

import { useBoxShadow } from "../model/use-box-shadow";
import {
  Button,
  Input,
  Label,
  Slider,
  Switch,
} from "@/shared/ui";
import { Copy, Plus, Trash2, RotateCcw, Check } from "lucide-react";
import { useState } from "react";

export function BoxShadow() {
  const {
    shadows,
    boxColor,
    setBoxColor,
    boxRadius,
    setBoxRadius,
    cssValue,
    cssCode,
    updateShadow,
    addShadow,
    removeShadow,
    resetShadows,
    copyToClipboard,
  } = useBoxShadow();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(cssCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preview */}
        <div className="space-y-4">
          <Label>미리보기</Label>
          <div className="flex items-center justify-center min-h-[300px] rounded-lg border bg-muted/30 p-8">
            <div
              className="w-40 h-40 transition-all duration-200"
              style={{
                backgroundColor: boxColor,
                borderRadius: `${boxRadius}px`,
                boxShadow: cssValue,
              }}
            />
          </div>

          {/* Box Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>박스 색상</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={boxColor}
                  onChange={(e) => setBoxColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={boxColor}
                  onChange={(e) => setBoxColor(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>모서리 반경: {boxRadius}px</Label>
              <Slider
                value={[boxRadius]}
                onValueChange={([v]) => setBoxRadius(v)}
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>그림자 설정</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={addShadow}>
                <Plus className="h-4 w-4 mr-1" />
                추가
              </Button>
              <Button variant="outline" size="sm" onClick={resetShadows}>
                <RotateCcw className="h-4 w-4 mr-1" />
                초기화
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {shadows.map((shadow, index) => (
              <div
                key={index}
                className="rounded-lg border p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    그림자 {index + 1}
                  </span>
                  {shadows.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeShadow(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Offset X */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>X 오프셋</span>
                    <span>{shadow.offsetX}px</span>
                  </div>
                  <Slider
                    value={[shadow.offsetX]}
                    onValueChange={([v]) => updateShadow(index, { offsetX: v })}
                    min={-50}
                    max={50}
                  />
                </div>

                {/* Offset Y */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Y 오프셋</span>
                    <span>{shadow.offsetY}px</span>
                  </div>
                  <Slider
                    value={[shadow.offsetY]}
                    onValueChange={([v]) => updateShadow(index, { offsetY: v })}
                    min={-50}
                    max={50}
                  />
                </div>

                {/* Blur */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>블러</span>
                    <span>{shadow.blur}px</span>
                  </div>
                  <Slider
                    value={[shadow.blur]}
                    onValueChange={([v]) => updateShadow(index, { blur: v })}
                    min={0}
                    max={100}
                  />
                </div>

                {/* Spread */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>확산</span>
                    <span>{shadow.spread}px</span>
                  </div>
                  <Slider
                    value={[shadow.spread]}
                    onValueChange={([v]) => updateShadow(index, { spread: v })}
                    min={-50}
                    max={50}
                  />
                </div>

                {/* Color & Opacity */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm">색상</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={shadow.color}
                        onChange={(e) =>
                          updateShadow(index, { color: e.target.value })
                        }
                        className="w-10 h-8 p-1"
                      />
                      <Input
                        value={shadow.color}
                        onChange={(e) =>
                          updateShadow(index, { color: e.target.value })
                        }
                        className="font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>투명도</span>
                      <span>{shadow.opacity}%</span>
                    </div>
                    <Slider
                      value={[shadow.opacity]}
                      onValueChange={([v]) => updateShadow(index, { opacity: v })}
                      min={0}
                      max={100}
                    />
                  </div>
                </div>

                {/* Inset */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inset (내부 그림자)</span>
                  <Switch
                    checked={shadow.inset}
                    onCheckedChange={(v) => updateShadow(index, { inset: v })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>CSS 코드</Label>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "복사됨" : "복사"}
          </Button>
        </div>
        <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto">
          {cssCode}
        </pre>
      </div>
    </div>
  );
}
