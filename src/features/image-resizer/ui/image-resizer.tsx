"use client";

import {
  useImageResizer,
  ResizeMode,
  OutputFormat,
} from "../model/use-image-resizer";
import {
  Button,
  Input,
  Label,
  Slider,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  FileUploader,
} from "@/shared/ui";
import {
  Download,
  RotateCcw,
  ImageIcon,
  Loader2,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useLeadCaptureContext } from "@/features/lead-capture";

export function ImageResizer() {
  const {
    originalImage,
    resizedImage,
    resizedFile,
    isProcessing,
    error,
    options,
    progress,
    ffmpegState,
    handleFileSelect,
    resizeImage,
    downloadImage,
    handleClear,
    updateOptions,
  } = useImageResizer();

  const { openModal } = useLeadCaptureContext();

  const handleDownload = () => {
    openModal("image-resizer", downloadImage);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* FFmpeg Loading Status */}
      {ffmpegState.loading && (
        <div className="rounded-lg border border-info/30 bg-info/10 p-4 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-info" />
          <div>
            <p className="font-medium text-info">FFmpeg 로딩 중...</p>
            <p className="text-sm text-muted-foreground">
              고성능 이미지 처리 엔진을 준비하고 있습니다
            </p>
          </div>
        </div>
      )}

      {/* FFmpeg Ready Status */}
      {ffmpegState.loaded && !ffmpegState.loading && (
        <div className="rounded-lg border border-success/30 bg-success/10 p-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-success" />
          <span className="text-sm text-success">
            FFmpeg.wasm 활성화됨 - 고품질 Lanczos 리샘플링 사용
          </span>
        </div>
      )}

      {/* FFmpeg Not Supported Warning */}
      {!ffmpegState.isSupported && !ffmpegState.loading && (
        <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-warning" />
          <span className="text-sm text-warning">
            브라우저가 WebAssembly를 지원하지 않습니다. Canvas 폴백 모드로
            동작합니다.
          </span>
        </div>
      )}

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
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Options */}
          <div className="space-y-6">
            {/* Original Image Info */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">원본 이미지</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>파일명: {originalImage.file.name}</p>
                <p>크기: {formatFileSize(originalImage.file.size)}</p>
                <p>
                  해상도: {originalImage.width} × {originalImage.height}px
                </p>
              </div>
            </div>

            {/* Resize Options */}
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-medium">리사이즈 설정</h3>

              {/* Mode Selection */}
              <div className="space-y-2">
                <Label id="resize-mode-label">크기 모드</Label>
                <Select
                  value={options.mode}
                  onValueChange={(value: ResizeMode) =>
                    updateOptions({ mode: value })
                  }
                >
                  <SelectTrigger aria-labelledby="resize-mode-label">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pixel">픽셀 (px)</SelectItem>
                    <SelectItem value="percent">퍼센트 (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    너비 {options.mode === "percent" ? "(%)" : "(px)"}
                  </Label>
                  <Input
                    type="number"
                    value={options.width}
                    onChange={(e) =>
                      updateOptions({ width: parseInt(e.target.value) || 0 })
                    }
                    min={1}
                    max={options.mode === "percent" ? 500 : 10000}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    높이 {options.mode === "percent" ? "(%)" : "(px)"}
                  </Label>
                  <Input
                    type="number"
                    value={options.height}
                    onChange={(e) =>
                      updateOptions({ height: parseInt(e.target.value) || 0 })
                    }
                    min={1}
                    max={options.mode === "percent" ? 500 : 10000}
                  />
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="flex items-center justify-between">
                <Label htmlFor="aspect-ratio">비율 유지</Label>
                <Switch
                  id="aspect-ratio"
                  checked={options.maintainAspectRatio}
                  onCheckedChange={(checked) =>
                    updateOptions({ maintainAspectRatio: checked })
                  }
                />
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <Label>출력 포맷</Label>
                <Select
                  value={options.format}
                  onValueChange={(value: OutputFormat) =>
                    updateOptions({ format: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image/png">PNG</SelectItem>
                    <SelectItem value="image/jpeg">JPEG</SelectItem>
                    <SelectItem value="image/webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quality Slider */}
              {options.format !== "image/png" && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label id="quality-label">품질</Label>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(options.quality * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[options.quality * 100]}
                    onValueChange={([value]) =>
                      updateOptions({ quality: value / 100 })
                    }
                    min={10}
                    max={100}
                    step={5}
                    aria-labelledby="quality-label"
                  />
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {isProcessing && progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>처리 중...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={resizeImage}
                disabled={isProcessing || ffmpegState.loading}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    처리 중...
                  </>
                ) : ffmpegState.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    FFmpeg 로딩 중...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    리사이즈
                    {ffmpegState.loaded && (
                      <Zap className="ml-1 h-3 w-3 text-warning" />
                    )}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                초기화
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-4">
            {/* Original Preview */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">원본 미리보기</h3>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={originalImage.preview}
                  alt="Original"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Resized Preview */}
            {resizedImage && resizedFile && (
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">리사이즈 결과</h3>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center mb-4">
                  <img
                    src={resizedImage}
                    alt="Resized"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <p>{formatFileSize(resizedFile.size)}</p>
                    {originalImage && (
                      <p className="text-xs">
                        {(
                          (1 - resizedFile.size / originalImage.file.size) *
                          100
                        ).toFixed(1)}
                        % 절감
                      </p>
                    )}
                  </div>
                  <Button onClick={handleDownload} size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    다운로드
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
