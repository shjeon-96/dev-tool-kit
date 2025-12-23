"use client";

import { useResizeTarget } from "../model/use-resize-target";
import { Button, FileUploader } from "@/shared/ui";
import {
  Download,
  RotateCcw,
  ImageIcon,
  Check,
  ArrowRight,
} from "lucide-react";
import type { ResizeTarget } from "@/entities/image-resize-target";

interface ResizeTargetToolProps {
  target: ResizeTarget;
  locale: string;
}

export function ResizeTargetTool({ target, locale }: ResizeTargetToolProps) {
  const {
    originalImage,
    result,
    isProcessing,
    error,
    progress,
    handleFileSelect,
    resize,
    download,
    clear,
  } = useResizeTarget(target);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getTargetDescription = () => {
    if (target.type === "file-size" && target.targetSizeKB) {
      return target.targetSizeKB >= 1024
        ? `${target.targetSizeKB / 1024}MB`
        : `${target.targetSizeKB}KB`;
    }
    if (target.targetWidth && target.targetHeight) {
      return `${target.targetWidth}×${target.targetHeight}px`;
    }
    return "";
  };

  const labels = {
    en: {
      uploadTitle: "Upload Your Image",
      uploadDesc: `Drag and drop an image to resize to ${getTargetDescription()}`,
      original: "Original",
      resized: "Resized",
      resize: "Resize Now",
      processing: "Processing...",
      download: "Download",
      tryAnother: "Try Another",
      size: "Size",
      dimensions: "Dimensions",
      saved: "saved",
      success: "Success!",
    },
    ko: {
      uploadTitle: "이미지 업로드",
      uploadDesc: `${getTargetDescription()}로 리사이즈할 이미지를 드래그 앤 드롭하세요`,
      original: "원본",
      resized: "리사이즈됨",
      resize: "리사이즈",
      processing: "처리 중...",
      download: "다운로드",
      tryAnother: "다른 이미지",
      size: "크기",
      dimensions: "해상도",
      saved: "절감",
      success: "완료!",
    },
    ja: {
      uploadTitle: "画像をアップロード",
      uploadDesc: `${getTargetDescription()}にリサイズする画像をドラッグ＆ドロップ`,
      original: "オリジナル",
      resized: "リサイズ済み",
      resize: "リサイズ",
      processing: "処理中...",
      download: "ダウンロード",
      tryAnother: "別の画像",
      size: "サイズ",
      dimensions: "解像度",
      saved: "削減",
      success: "完了！",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="space-y-6">
      {/* Target Info Banner */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <ImageIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-primary">
              {target.type === "file-size" ? (
                <>Target: {getTargetDescription()}</>
              ) : (
                <>Target: {getTargetDescription()}</>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {target.platform && `${target.platform} • `}
              {target.type === "file-size"
                ? "Quality-optimized compression"
                : "Exact dimensions with crop-to-fit"}
            </p>
          </div>
        </div>
      </div>

      {/* File Upload Area */}
      {!originalImage && (
        <FileUploader
          onFileSelect={handleFileSelect}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
          maxSize={50 * 1024 * 1024}
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Main Content */}
      {originalImage && (
        <div className="space-y-6">
          {/* Comparison View */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Original */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                  1
                </span>
                {t.original}
              </h3>
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center mb-3">
                <img
                  src={originalImage.preview}
                  alt="Original"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  {t.size}: {formatFileSize(originalImage.file.size)}
                </p>
                <p>
                  {t.dimensions}: {originalImage.width}×{originalImage.height}px
                </p>
              </div>
            </div>

            {/* Resized */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                  2
                </span>
                {t.resized}
              </h3>
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center mb-3">
                {result?.success && result.preview ? (
                  <img
                    src={result.preview}
                    alt="Resized"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : isProcessing ? (
                  <div className="flex flex-col items-center gap-2">
                    <RotateCcw className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {progress}%
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ArrowRight className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{getTargetDescription()}</p>
                  </div>
                )}
              </div>
              {result?.success && (
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    {t.size}: {formatFileSize(result.newSize)}
                  </p>
                  <p className="text-muted-foreground">
                    {t.dimensions}: {result.width}×{result.height}px
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    {((1 - result.newSize / result.originalSize) * 100).toFixed(
                      0,
                    )}
                    % {t.saved}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && progress > 0 && (
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {!result?.success && (
              <Button
                onClick={resize}
                disabled={isProcessing}
                className="flex-1 min-w-[150px]"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    {t.processing}
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    {t.resize}
                  </>
                )}
              </Button>
            )}

            {result?.success && (
              <>
                <Button
                  onClick={download}
                  className="flex-1 min-w-[150px]"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t.download}
                </Button>
                <Button variant="outline" onClick={clear} size="lg">
                  {t.tryAnother}
                </Button>
              </>
            )}

            {!result?.success && (
              <Button variant="outline" onClick={clear}>
                {t.tryAnother}
              </Button>
            )}
          </div>

          {/* Success Message */}
          {result?.success && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-600 dark:text-green-400">
                  {t.success}
                </p>
                <p className="text-sm text-muted-foreground">
                  {locale === "ko"
                    ? `이미지가 ${getTargetDescription()}로 리사이즈되었습니다.`
                    : locale === "ja"
                      ? `画像が${getTargetDescription()}にリサイズされました。`
                      : `Image has been resized to ${getTargetDescription()}.`}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
