"use client";

import { useEffect } from "react";
import { useColorPicker, type ColorInfo } from "../model/use-color-picker";
import { FileUploader } from "@/widgets/file-uploader";
import { Button } from "@/shared/ui";
import { Palette, Copy, Plus, X, Pipette } from "lucide-react";

function ColorCard({
  color,
  onCopy,
  onRemove,
}: {
  color: ColorInfo;
  onCopy: (text: string) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div
        className="h-16 w-full"
        style={{ backgroundColor: color.hex }}
      />
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm">{color.hex}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onCopy(color.hex)}
            >
              <Copy className="h-3 w-3" />
            </Button>
            {onRemove && (
              <Button variant="ghost" size="icon-sm" onClick={onRemove}>
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p
            className="cursor-pointer hover:text-foreground"
            onClick={() =>
              onCopy(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`)
            }
          >
            RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
          </p>
          <p
            className="cursor-pointer hover:text-foreground"
            onClick={() =>
              onCopy(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`)
            }
          >
            HSL: {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
          </p>
        </div>
      </div>
    </div>
  );
}

export function ColorPicker() {
  const {
    imageSource,
    palette,
    selectedColor,
    pickedColors,
    isExtracting,
    error,
    canvasRef,
    imageRef,
    handleFileSelect,
    extractPalette,
    pickColorFromImage,
    addToPickedColors,
    removePickedColor,
    copyToClipboard,
    handleClear,
  } = useColorPicker();

  useEffect(() => {
    if (imageSource && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const img = imageRef.current;

      img.onload = () => {
        const maxWidth = 600;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };

      img.src = imageSource.preview;
    }
  }, [imageSource, canvasRef, imageRef]);

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      {!imageSource && (
        <FileUploader
          onFileSelect={handleFileSelect}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
          maxSize={10 * 1024 * 1024}
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Main Content */}
      {imageSource && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Image & Picker */}
          <div className="space-y-4">
            {/* Image Canvas */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Pipette className="h-4 w-4" />
                  이미지에서 색상 선택
                </h3>
                <Button variant="outline" size="sm" onClick={handleClear}>
                  초기화
                </Button>
              </div>
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <img
                  ref={imageRef}
                  src={imageSource.preview}
                  alt="Source"
                  className="hidden"
                />
                <canvas
                  ref={canvasRef}
                  onClick={pickColorFromImage}
                  className="max-w-full cursor-crosshair mx-auto block"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                이미지를 클릭하여 색상을 선택하세요
              </p>
            </div>

            {/* Selected Color */}
            {selectedColor && (
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">선택된 색상</h3>
                  <Button size="sm" onClick={addToPickedColors}>
                    <Plus className="h-4 w-4 mr-2" />
                    저장
                  </Button>
                </div>
                <ColorCard color={selectedColor} onCopy={copyToClipboard} />
              </div>
            )}

            {/* Extract Palette */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">자동 팔레트 추출</h3>
                <Button
                  size="sm"
                  onClick={() => extractPalette(8)}
                  disabled={isExtracting}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  {isExtracting ? "추출 중..." : "팔레트 추출"}
                </Button>
              </div>
              {palette.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg cursor-pointer border hover:scale-105 transition-transform"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.hex} (${color.percentage}%)`}
                      onClick={() => copyToClipboard(color.hex)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Picked Colors & Palette */}
          <div className="space-y-4">
            {/* Picked Colors */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">저장된 색상</h3>
              {pickedColors.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {pickedColors.map((color) => (
                    <ColorCard
                      key={color.hex}
                      color={color}
                      onCopy={copyToClipboard}
                      onRemove={() => removePickedColor(color.hex)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  이미지에서 색상을 선택하고 저장하세요
                </p>
              )}
            </div>

            {/* Extracted Palette Details */}
            {palette.length > 0 && (
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">추출된 팔레트</h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <p className="font-mono text-sm">{color.hex}</p>
                        <p className="text-xs text-muted-foreground">
                          {color.percentage}% 사용
                        </p>
                      </div>
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
