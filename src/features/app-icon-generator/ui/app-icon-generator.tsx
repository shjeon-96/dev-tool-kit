"use client";

import { useAppIconGenerator } from "../model/use-app-icon-generator";
import { getActualSize } from "../lib/icon-sizes";
import { Button, Label, Switch, FileUploader } from "@/shared/ui";
import { Download, RotateCcw, Smartphone, Monitor, Globe } from "lucide-react";

const platformIcons: Record<string, typeof Smartphone> = {
  ios: Smartphone,
  android: Smartphone,
  favicon: Globe,
};

export function AppIconGenerator() {
  const {
    sourceImage,
    selectedPlatforms,
    isGenerating,
    progress,
    error,
    platforms,
    handleFileSelect,
    togglePlatform,
    generateIcons,
    handleClear,
  } = useAppIconGenerator();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      {!sourceImage && (
        <div className="space-y-4">
          <FileUploader
            onFileSelect={handleFileSelect}
            accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
            maxSize={10 * 1024 * 1024}
          />
          <p className="text-sm text-muted-foreground text-center">
            권장: 1024x1024 픽셀 이상의 정사각형 PNG 이미지
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Main Content */}
      {sourceImage && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Source & Options */}
          <div className="space-y-6">
            {/* Source Image Preview */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">원본 이미지</h3>
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center mb-4">
                <img
                  src={sourceImage.preview}
                  alt="Source"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>파일명: {sourceImage.file.name}</p>
                <p>크기: {formatFileSize(sourceImage.file.size)}</p>
                <p>
                  해상도: {sourceImage.width} × {sourceImage.height}px
                </p>
              </div>
            </div>

            {/* Platform Selection */}
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-medium">플랫폼 선택</h3>
              {platforms.map((platform) => {
                const Icon = platformIcons[platform.id] || Monitor;
                return (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label htmlFor={platform.id}>{platform.name}</Label>
                        <p className="text-xs text-muted-foreground">
                          {platform.sizes.length}개 사이즈
                        </p>
                      </div>
                    </div>
                    <Switch
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={generateIcons}
                disabled={isGenerating || selectedPlatforms.length === 0}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    생성 중... {progress}%
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    아이콘 생성 & 다운로드
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                초기화
              </Button>
            </div>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Right Panel - Size Preview */}
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-4">생성될 아이콘 목록</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {platforms
                  .filter((p) => selectedPlatforms.includes(p.id))
                  .map((platform) => (
                    <div key={platform.id}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        {platform.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {platform.sizes.map((size, idx) => {
                          const actualSize = getActualSize(size);
                          return (
                            <div
                              key={idx}
                              className="text-xs p-2 bg-muted rounded flex justify-between items-center"
                            >
                              <span className="truncate flex-1 mr-2">
                                {size.name}
                              </span>
                              <span className="text-muted-foreground whitespace-nowrap">
                                {actualSize}×{actualSize}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
