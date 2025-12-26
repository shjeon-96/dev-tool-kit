"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Image as ImageIcon,
  Trash2,
  Download,
  Play,
  FolderOpen,
  FileArchive,
  X,
  Crown,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Label } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { RadioGroup, RadioGroupItem } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Slider } from "@/shared/ui";
import { Switch } from "@/shared/ui";
import {
  BulkStatusIcon,
  BulkStatsBar,
  BulkProgressBar,
  EmptyDropzone,
} from "@/shared/ui";
import { UpgradeModal } from "@/entities/subscription";
import {
  useImageBulk,
  formatSize,
  type ResizeMode,
  type OutputFormat,
} from "../model/use-image-bulk";

export function ImageBulk() {
  const t = useTranslations("tools.bulk-actions");
  const {
    items,
    options,
    isProcessing,
    overallProgress,
    stats,
    limits,
    exportMode,
    totalSaved,
    fsAccess,
    isPro,
    canAccessBulkActions,
    setOptions,
    setExportMode,
    addFiles,
    removeItem,
    clearAll,
    processAll,
    exportResults,
    calculateDimensions,
  } = useImageBulk();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // 드래그 앤 드롭 핸들러
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (!canAccessBulkActions) {
        setShowUpgradeModal(true);
        return;
      }

      const files = e.dataTransfer.files;
      const result = await addFiles(files);
      if (!result.success && result.error) {
        // 제한 초과 시 업그레이드 모달 표시
        if (!isPro) {
          setShowUpgradeModal(true);
        }
      }
    },
    [canAccessBulkActions, addFiles, isPro],
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!canAccessBulkActions) {
        setShowUpgradeModal(true);
        return;
      }

      const files = e.target.files;
      if (files) {
        const result = await addFiles(files);
        if (!result.success && result.error && !isPro) {
          setShowUpgradeModal(true);
        }
      }
      e.target.value = "";
    },
    [canAccessBulkActions, addFiles, isPro],
  );

  const openFileDialog = useCallback(() => {
    if (!canAccessBulkActions) {
      setShowUpgradeModal(true);
      return;
    }
    fileInputRef.current?.click();
  }, [canAccessBulkActions]);

  const hasResults = stats.success > 0;

  return (
    <div className="space-y-6">
      {/* Options Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Resize Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resize Mode */}
          <div className="space-y-3">
            <Label>Resize Mode</Label>
            <RadioGroup
              value={options.mode}
              onValueChange={(v) =>
                setOptions({ ...options, mode: v as ResizeMode })
              }
              className="grid grid-cols-2 lg:grid-cols-4 gap-2"
            >
              <Label
                htmlFor="mode-percentage"
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted [&:has(:checked)]:border-primary"
              >
                <RadioGroupItem value="percentage" id="mode-percentage" />
                <span>Percentage</span>
              </Label>
              <Label
                htmlFor="mode-width"
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted [&:has(:checked)]:border-primary"
              >
                <RadioGroupItem value="width" id="mode-width" />
                <span>By Width</span>
              </Label>
              <Label
                htmlFor="mode-height"
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted [&:has(:checked)]:border-primary"
              >
                <RadioGroupItem value="height" id="mode-height" />
                <span>By Height</span>
              </Label>
              <Label
                htmlFor="mode-dimensions"
                className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted [&:has(:checked)]:border-primary"
              >
                <RadioGroupItem value="dimensions" id="mode-dimensions" />
                <span>Custom</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Mode-specific inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {options.mode === "percentage" && (
              <div className="space-y-2">
                <Label>Scale (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[options.percentage || 50]}
                    min={10}
                    max={200}
                    step={5}
                    onValueChange={([v]) =>
                      setOptions({ ...options, percentage: v })
                    }
                    className="flex-1"
                  />
                  <span className="w-12 text-right font-mono">
                    {options.percentage}%
                  </span>
                </div>
              </div>
            )}

            {(options.mode === "width" || options.mode === "dimensions") && (
              <div className="space-y-2">
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  value={options.width || ""}
                  onChange={(e) =>
                    setOptions({ ...options, width: parseInt(e.target.value) })
                  }
                  placeholder="800"
                  min={1}
                  max={10000}
                />
              </div>
            )}

            {(options.mode === "height" || options.mode === "dimensions") && (
              <div className="space-y-2">
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  value={options.height || ""}
                  onChange={(e) =>
                    setOptions({ ...options, height: parseInt(e.target.value) })
                  }
                  placeholder="600"
                  min={1}
                  max={10000}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select
                value={options.format}
                onValueChange={(v) =>
                  setOptions({ ...options, format: v as OutputFormat })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quality ({options.quality}%)</Label>
              <Slider
                value={[options.quality]}
                min={10}
                max={100}
                step={5}
                onValueChange={([v]) => setOptions({ ...options, quality: v })}
              />
            </div>
          </div>

          {/* Maintain Aspect Ratio */}
          <div className="flex items-center gap-2">
            <Switch
              id="aspect-ratio"
              checked={options.maintainAspectRatio}
              onCheckedChange={(checked) =>
                setOptions({ ...options, maintainAspectRatio: checked })
              }
            />
            <Label htmlFor="aspect-ratio" className="cursor-pointer">
              Maintain aspect ratio
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area / File List */}
      <Card>
        <CardContent className="pt-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {items.length === 0 ? (
              <EmptyDropzone
                icon={<ImageIcon className="h-12 w-12 text-muted-foreground" />}
                title="Drop images here"
                description={`Drag & drop images or click to browse. Max ${limits.maxItems} images, ${limits.maxFileSizeMB}MB each.`}
                isDragging={isDragging}
                onClick={openFileDialog}
              />
            ) : (
              <div className="space-y-4">
                {/* Stats and Controls */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <BulkStatsBar stats={stats} />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={openFileDialog}
                      disabled={isProcessing || stats.remaining <= 0}
                    >
                      Add More
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={clearAll}
                      disabled={isProcessing}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Progress */}
                <BulkProgressBar
                  isProcessing={isProcessing}
                  progress={overallProgress}
                  label="Resizing images"
                />

                {/* File List */}
                <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                  {items.map((item) => {
                    const preview =
                      item.status === "success" && item.resultWidth
                        ? `${item.resultWidth}×${item.resultHeight}`
                        : calculateDimensions(
                            item.originalWidth,
                            item.originalHeight,
                            options,
                          );
                    const targetSize =
                      typeof preview === "object"
                        ? `${preview.width}×${preview.height}`
                        : preview;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                      >
                        <BulkStatusIcon status={item.status} />

                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate" title={item.name}>
                            {item.name}
                          </p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>
                              {item.originalWidth}×{item.originalHeight}
                            </span>
                            <span>→</span>
                            <span>{targetSize}</span>
                            <span className="text-muted-foreground">|</span>
                            <span>{formatSize(item.size)}</span>
                            {item.status === "success" && item.resultSize && (
                              <>
                                <span>→</span>
                                <span
                                  className={
                                    item.resultSize < item.size
                                      ? "text-success"
                                      : "text-warning"
                                  }
                                >
                                  {formatSize(item.resultSize)}
                                </span>
                              </>
                            )}
                          </div>
                          {item.error && (
                            <p className="text-xs text-destructive mt-1">
                              {item.error}
                            </p>
                          )}
                        </div>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          disabled={isProcessing}
                          className="shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {/* Saved Size Summary */}
                {hasResults && totalSaved > 0 && (
                  <div className="text-center py-2 text-sm text-success bg-success/10 rounded-lg">
                    Total saved: {formatSize(totalSaved)}
                  </div>
                )}

                {/* Export Mode Selection */}
                {hasResults && fsAccess.isSupported && (
                  <div className="flex items-center justify-center gap-4 py-2">
                    <Label className="text-sm text-muted-foreground">
                      Export as:
                    </Label>
                    <RadioGroup
                      value={exportMode}
                      onValueChange={(v) =>
                        setExportMode(v as "folder" | "zip")
                      }
                      className="flex gap-4"
                    >
                      <Label
                        htmlFor="export-folder"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value="folder" id="export-folder" />
                        <FolderOpen className="h-4 w-4" />
                        <span>Folder</span>
                      </Label>
                      <Label
                        htmlFor="export-zip"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value="zip" id="export-zip" />
                        <FileArchive className="h-4 w-4" />
                        <span>ZIP</span>
                      </Label>
                    </RadioGroup>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={processAll}
                    disabled={isProcessing || stats.pending === 0}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Resize All ({stats.pending})
                  </Button>

                  {hasResults && (
                    <Button
                      onClick={exportResults}
                      disabled={isProcessing || fsAccess.isExporting}
                      variant="secondary"
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {fsAccess.isExporting
                        ? "Exporting..."
                        : `Export (${stats.success})`}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tier Badge */}
      {!isPro && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>
            Free tier: {limits.maxItems} images, {limits.maxFileSizeMB}MB max
          </span>
          <Button
            variant="link"
            size="sm"
            className="text-primary p-0 h-auto"
            onClick={() => setShowUpgradeModal(true)}
          >
            <Crown className="h-4 w-4 mr-1" />
            Upgrade to Pro
          </Button>
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        feature="Bulk Image Resize"
        currentLimit={`${limits.maxItems} images`}
        proLimit="100 images"
      />
    </div>
  );
}
