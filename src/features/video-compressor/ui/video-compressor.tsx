"use client";

import {
  useVideoCompressor,
  type QualityPreset,
  type VideoFormat,
  type AudioCodec,
} from "../model/use-video-compressor";
import {
  Button,
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
  Video,
  Loader2,
  Zap,
  AlertCircle,
  Play,
  FileVideo,
  Settings2,
} from "lucide-react";

const PRESET_LABELS: Record<Exclude<QualityPreset, "custom">, string> = {
  ultra: "최고 품질 (큰 파일)",
  high: "고품질 (권장)",
  medium: "중간 품질 (균형)",
  low: "저품질 (작은 파일)",
};

const FORMAT_LABELS: Record<VideoFormat, string> = {
  mp4: "MP4 (H.264)",
  webm: "WebM (VP9)",
  mov: "MOV",
  avi: "AVI",
};

const AUDIO_LABELS: Record<AudioCodec, string> = {
  aac: "AAC (권장)",
  mp3: "MP3",
  opus: "Opus",
  none: "오디오 제거",
};

export function VideoCompressor() {
  const {
    originalVideo,
    compressedResult,
    isProcessing,
    progress,
    stage,
    error,
    options,
    estimatedSize,
    compressionRatio,
    ffmpegState,
    handleFileSelect,
    compress,
    download,
    handleClear,
    updateOptions,
    applyPreset,
    loadFFmpeg,
  } = useVideoCompressor();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* FFmpeg Status */}
      {!ffmpegState.loaded && !ffmpegState.loading && (
        <div className="rounded-lg border border-info/30 bg-info/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileVideo className="h-5 w-5 text-info" />
              <div>
                <p className="font-medium text-info">FFmpeg.wasm 준비</p>
                <p className="text-sm text-muted-foreground">
                  비디오 압축을 위해 FFmpeg를 로드하세요
                </p>
              </div>
            </div>
            <Button onClick={() => void loadFFmpeg()} size="sm">
              <Zap className="mr-2 h-4 w-4" />
              FFmpeg 로드
            </Button>
          </div>
        </div>
      )}

      {ffmpegState.loading && (
        <div className="rounded-lg border border-info/30 bg-info/10 p-4 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-info" />
          <div>
            <p className="font-medium text-info">FFmpeg 로딩 중...</p>
            <p className="text-sm text-muted-foreground">
              고성능 비디오 처리 엔진을 준비하고 있습니다 (
              {ffmpegState.progress}%)
            </p>
          </div>
        </div>
      )}

      {ffmpegState.loaded && !ffmpegState.loading && (
        <div className="rounded-lg border border-success/30 bg-success/10 p-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-success" />
          <span className="text-sm text-success">
            FFmpeg.wasm 활성화됨 - 브라우저에서 비디오 압축 준비 완료
          </span>
        </div>
      )}

      {!ffmpegState.isSupported && (
        <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-warning" />
          <span className="text-sm text-warning">
            브라우저가 SharedArrayBuffer를 지원하지 않습니다. 일부 기능이 제한될
            수 있습니다.
          </span>
        </div>
      )}

      {/* File Upload */}
      {!originalVideo && ffmpegState.loaded && (
        <FileUploader
          onFileSelect={handleFileSelect}
          accept={{ "video/*": [".mp4", ".webm", ".mov", ".avi", ".mkv"] }}
          maxSize={500 * 1024 * 1024} // 500MB
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Main Content */}
      {originalVideo && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Options */}
          <div className="space-y-6">
            {/* Original Video Info */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Video className="h-4 w-4" />
                원본 비디오
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>파일명: {originalVideo.file.name}</p>
                <p>크기: {formatFileSize(originalVideo.file.size)}</p>
                <p>
                  해상도: {originalVideo.width} × {originalVideo.height}px
                </p>
                <p>길이: {formatDuration(originalVideo.duration)}</p>
              </div>
            </div>

            {/* Compression Options */}
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                압축 설정
              </h3>

              {/* Quality Preset */}
              <div className="space-y-2">
                <Label>품질 프리셋</Label>
                <Select
                  value={options.preset}
                  onValueChange={(value) => {
                    if (value !== "custom") {
                      applyPreset(value as Exclude<QualityPreset, "custom">);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRESET_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">사용자 정의</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <Label>출력 포맷</Label>
                <Select
                  value={options.format}
                  onValueChange={(value: VideoFormat) =>
                    updateOptions({ format: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FORMAT_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Max Resolution */}
              <div className="space-y-2">
                <Label>최대 해상도</Label>
                <Select
                  value={options.maxResolution || "original"}
                  onValueChange={(value) =>
                    updateOptions({
                      maxResolution:
                        value === "original"
                          ? undefined
                          : (value as "720p" | "1080p" | "1440p" | "4k"),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">원본 유지</SelectItem>
                    <SelectItem value="4k">4K (3840×2160)</SelectItem>
                    <SelectItem value="1440p">1440p (2560×1440)</SelectItem>
                    <SelectItem value="1080p">1080p (1920×1080)</SelectItem>
                    <SelectItem value="720p">720p (1280×720)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CRF Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>품질 (CRF)</Label>
                  <span className="text-sm text-muted-foreground">
                    {options.crf}{" "}
                    {options.crf <= 20
                      ? "(고품질)"
                      : options.crf >= 35
                        ? "(저품질)"
                        : "(중간)"}
                  </span>
                </div>
                <Slider
                  value={[options.crf]}
                  onValueChange={([value]) =>
                    updateOptions({ crf: value, preset: "custom" })
                  }
                  min={18}
                  max={40}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  낮을수록 고품질, 높을수록 작은 파일
                </p>
              </div>

              {/* Audio Options */}
              <div className="space-y-2">
                <Label>오디오</Label>
                <Select
                  value={options.removeAudio ? "none" : options.audioCodec}
                  onValueChange={(value: AudioCodec) =>
                    updateOptions({
                      audioCodec: value,
                      removeAudio: value === "none",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AUDIO_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fast Start */}
              {options.format === "mp4" && (
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fast-start">웹 스트리밍 최적화</Label>
                    <p className="text-xs text-muted-foreground">
                      MP4 파일을 웹에서 빠르게 재생
                    </p>
                  </div>
                  <Switch
                    id="fast-start"
                    checked={options.fastStart}
                    onCheckedChange={(checked) =>
                      updateOptions({ fastStart: checked })
                    }
                  />
                </div>
              )}
            </div>

            {/* Estimated Size */}
            <div className="rounded-lg border p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">예상 결과</span>
                <span className="text-sm text-muted-foreground">
                  ~{formatFileSize(estimatedSize)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                약{" "}
                {(
                  ((originalVideo.file.size - estimatedSize) /
                    originalVideo.file.size) *
                  100
                ).toFixed(0)}
                % 절감 예상
              </p>
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{stage || "처리 중..."}</span>
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
                onClick={() => void compress()}
                disabled={isProcessing || !ffmpegState.loaded}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    압축 중...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    압축 시작
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <RotateCcw className="mr-2 h-4 w-4" />
                초기화
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-4">
            {/* Original Preview */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">원본 미리보기</h3>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  src={originalVideo.preview}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Compressed Preview */}
            {compressedResult && (
              <div className="rounded-lg border p-4 border-success/30">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-success" />
                  압축 결과
                </h3>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                  <video
                    src={compressedResult.preview}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium">
                      {formatFileSize(compressedResult.size)}
                    </p>
                    <p className="text-xs text-success">
                      {compressionRatio}% 절감
                    </p>
                  </div>
                  <Button onClick={download} size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    다운로드
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Section */}
      {!originalVideo && !ffmpegState.loaded && (
        <div className="rounded-lg border p-6 text-center text-muted-foreground">
          <FileVideo className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="font-medium mb-2">브라우저에서 비디오 압축</h3>
          <p className="text-sm mb-4">
            FFmpeg.wasm을 사용하여 100% 로컬에서 비디오를 압축합니다.
            <br />
            파일이 서버로 전송되지 않아 안전합니다.
          </p>
          <p className="text-xs">지원 포맷: MP4, WebM, MOV, AVI • 최대 500MB</p>
        </div>
      )}
    </div>
  );
}
