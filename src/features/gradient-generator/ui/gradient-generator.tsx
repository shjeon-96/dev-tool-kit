"use client";

import { useGradientGenerator, type GradientType } from "../model/use-gradient-generator";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from "@/shared/ui";
import { Copy, Plus, Trash2, RotateCcw, Check } from "lucide-react";
import { useState } from "react";

const typeOptions: { value: GradientType; label: string }[] = [
  { value: "linear", label: "Linear (선형)" },
  { value: "radial", label: "Radial (방사형)" },
  { value: "conic", label: "Conic (원뿔형)" },
];

export function GradientGenerator() {
  const {
    type,
    setType,
    angle,
    setAngle,
    colorStops,
    cssValue,
    cssCode,
    addColorStop,
    removeColorStop,
    updateColorStop,
    resetGradient,
    copyToClipboard,
    presets,
    applyPreset,
  } = useGradientGenerator();

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
          <div
            className="w-full h-[300px] rounded-lg border"
            style={{ background: cssValue }}
          />

          {/* Presets */}
          <div className="space-y-2">
            <Label>프리셋</Label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="w-12 h-8 rounded border hover:ring-2 ring-primary transition-all"
                  style={{
                    background: `linear-gradient(90deg, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                  }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Type & Angle */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>유형</Label>
              <Select
                value={type}
                onValueChange={(v: GradientType) => setType(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>각도</Label>
                <span className="text-sm text-muted-foreground">{angle}°</span>
              </div>
              <Slider
                value={[angle]}
                onValueChange={([v]) => setAngle(v)}
                min={0}
                max={360}
                disabled={type === "radial"}
              />
            </div>
          </div>

          {/* Color Stops */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>색상 정지점</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={addColorStop}>
                  <Plus className="h-4 w-4 mr-1" />
                  추가
                </Button>
                <Button variant="outline" size="sm" onClick={resetGradient}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  초기화
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {colorStops
                .sort((a, b) => a.position - b.position)
                .map((stop) => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-3 p-3 rounded-lg border"
                  >
                    <Input
                      type="color"
                      value={stop.color}
                      onChange={(e) =>
                        updateColorStop(stop.id, { color: e.target.value })
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={stop.color}
                      onChange={(e) =>
                        updateColorStop(stop.id, { color: e.target.value })
                      }
                      className="w-24 font-mono text-sm"
                    />
                    <div className="flex-1 flex items-center gap-2">
                      <Slider
                        value={[stop.position]}
                        onValueChange={([v]) =>
                          updateColorStop(stop.id, { position: v })
                        }
                        min={0}
                        max={100}
                      />
                      <span className="w-12 text-sm text-right">
                        {stop.position}%
                      </span>
                    </div>
                    {colorStops.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColorStop(stop.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
            </div>
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
