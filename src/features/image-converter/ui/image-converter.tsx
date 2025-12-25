"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRightLeft,
  Upload,
  Trash2,
  Download,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Slider } from "@/shared/ui/slider";
import { Progress } from "@/shared/ui/progress";
import { Badge } from "@/shared/ui/badge";
import {
  useImageConverter,
  type ImageFormat,
  FORMAT_INFO,
  formatFileSize,
  calculateCompressionRatio,
} from "../model/use-image-converter";

interface ImageConverterProps {
  defaultFormat?: ImageFormat;
}

export function ImageConverter({ defaultFormat }: ImageConverterProps) {
  const t = useTranslations("tools.image-converter");
  const {
    images,
    convertedImages,
    options,
    isConverting,
    progress,
    formatSupport,
    addImages,
    removeImage,
    clearImages,
    setOptions,
    convertAll,
    downloadResult,
    downloadAll,
  } = useImageConverter(defaultFormat ? { format: defaultFormat } : undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      await addImages(e.dataTransfer.files);
    },
    [addImages],
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        await addImages(files);
      }
      e.target.value = "";
    },
    [addImages],
  );

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formats: ImageFormat[] = ["jpeg", "png", "webp", "avif", "gif"];
  const hasConvertedImages = convertedImages.length > 0;

  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            {t("outputFormat")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={options.format}
            onValueChange={(v) => setOptions({ format: v as ImageFormat })}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
          >
            {formats.map((format) => {
              const info = FORMAT_INFO[format];
              const supported = formatSupport[format];

              return (
                <Label
                  key={format}
                  htmlFor={`format-${format}`}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors
                    ${!supported ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}
                    ${options.format === format ? "border-primary bg-primary/5" : ""}
                  `}
                >
                  <RadioGroupItem
                    value={format}
                    id={`format-${format}`}
                    disabled={!supported}
                    className="sr-only"
                  />
                  <span className="font-medium">{info.name}</span>
                  <div className="flex gap-1">
                    {info.supportsTransparency && (
                      <Badge variant="secondary" className="text-[10px] px-1">
                        Alpha
                      </Badge>
                    )}
                    {info.supportsQuality && (
                      <Badge variant="secondary" className="text-[10px] px-1">
                        Quality
                      </Badge>
                    )}
                  </div>
                  {!supported && (
                    <span className="text-xs text-muted-foreground">
                      Not supported
                    </span>
                  )}
                </Label>
              );
            })}
          </RadioGroup>

          {/* Quality Slider */}
          {FORMAT_INFO[options.format].supportsQuality && (
            <div className="space-y-2 pt-2">
              <Label className="flex items-center justify-between">
                <span>{t("quality")}</span>
                <span className="font-mono text-sm">{options.quality}%</span>
              </Label>
              <Slider
                value={[options.quality]}
                min={10}
                max={100}
                step={5}
                onValueChange={([v]) => setOptions({ quality: v })}
              />
              <p className="text-xs text-muted-foreground">
                {options.quality < 50 && t("qualityLow")}
                {options.quality >= 50 &&
                  options.quality < 80 &&
                  t("qualityMedium")}
                {options.quality >= 80 && t("qualityHigh")}
              </p>
            </div>
          )}

          {/* Transparency Warning */}
          {!FORMAT_INFO[options.format].supportsTransparency && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{t("transparencyWarning")}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Area */}
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
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
              ${isDragging ? "border-primary bg-primary/5" : "hover:border-primary/50"}
            `}
            onClick={openFileDialog}
          >
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">{t("dropzone.title")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("dropzone.description")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Image List */}
      {images.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {t("images")} ({images.length})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearImages}
              disabled={isConverting}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {t("clearAll")}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress */}
            {isConverting && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-center text-muted-foreground">
                  {t("converting")}... {progress}%
                </p>
              </div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => {
                const converted = convertedImages.find(
                  (c) => c.id === image.id,
                );
                const ratio = converted
                  ? calculateCompressionRatio(
                      image.size,
                      converted.convertedSize,
                    )
                  : null;

                return (
                  <div
                    key={image.id}
                    className="border rounded-lg overflow-hidden bg-card"
                  >
                    {/* Preview */}
                    <div className="relative aspect-video bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={converted?.dataUrl || image.previewUrl}
                        alt={image.name}
                        className="w-full h-full object-contain"
                      />
                      {converted && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">
                            <Check className="h-3 w-3 mr-1" />
                            Converted
                          </Badge>
                        </div>
                      )}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 left-2 h-7 w-7"
                        onClick={() => removeImage(image.id)}
                        disabled={isConverting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Info */}
                    <div className="p-3 space-y-2">
                      <p
                        className="font-medium text-sm truncate"
                        title={image.name}
                      >
                        {image.name}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {image.width}×{image.height}
                        </span>
                        <span className="uppercase">{image.format}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>{formatFileSize(image.size)}</span>
                        {converted && (
                          <span
                            className={
                              ratio && ratio > 0
                                ? "text-green-600"
                                : "text-orange-500"
                            }
                          >
                            → {formatFileSize(converted.convertedSize)}
                            {ratio !== null && (
                              <span className="ml-1">
                                ({ratio > 0 ? "-" : "+"}
                                {Math.abs(ratio)}%)
                              </span>
                            )}
                          </span>
                        )}
                      </div>

                      {/* Download Button */}
                      {converted && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => downloadResult(converted)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={convertAll}
                disabled={isConverting || images.length === 0}
                className="flex-1"
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                {t("convertAll")} ({images.length})
              </Button>

              {hasConvertedImages && (
                <Button
                  onClick={downloadAll}
                  disabled={isConverting}
                  variant="secondary"
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t("downloadAll")} ({convertedImages.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">{t("emptyState.title")}</p>
          <p className="text-sm">{t("emptyState.description")}</p>
        </div>
      )}
    </div>
  );
}
