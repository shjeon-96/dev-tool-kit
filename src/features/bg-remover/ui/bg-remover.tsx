"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Upload,
  Download,
  Loader2,
  Image as ImageIcon,
  Wand2,
  Settings2,
  RefreshCw,
  Cpu,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useBgRemover } from "../model/use-bg-remover";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Progress } from "@/shared/ui/progress";
import { Slider } from "@/shared/ui/slider";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { cn } from "@/shared/lib/utils";
import type { ModelType } from "../lib/types";

export function BgRemover() {
  const t = useTranslations("tools.bg-remover");
  const {
    modelState,
    processingProgress,
    result,
    options,
    selectedFile,
    previewUrl,
    loadSelectedModel,
    processImage,
    setOptions,
    setSelectedFile,
    downloadResult,
    reset,
    availableModels,
  } = useBgRemover();

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setError(t("errors.invalidFileType"));
        return;
      }

      setError(null);
      setSelectedFile(file);
    },
    [setSelectedFile, t],
  );

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect],
  );

  // Handle process
  const handleProcess = useCallback(async () => {
    if (!selectedFile) return;

    setError(null);

    try {
      // Load model if not loaded
      if (!modelState.isLoaded) {
        await loadSelectedModel(options.model);
      }

      // Process image
      await processImage(selectedFile);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("errors.processingFailed"),
      );
    }
  }, [
    selectedFile,
    modelState.isLoaded,
    loadSelectedModel,
    options.model,
    processImage,
    t,
  ]);

  const isProcessing =
    modelState.isLoading ||
    (processingProgress !== null && processingProgress.stage !== "complete");

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            {t("modelSelection.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={options.model}
            onValueChange={(value) => setOptions({ model: value as ModelType })}
            className="grid gap-3"
          >
            {Object.entries(availableModels).map(([key, model]) => (
              <div key={key} className="flex items-center space-x-3">
                <RadioGroupItem value={key} id={key} disabled={isProcessing} />
                <Label
                  htmlFor={key}
                  className={cn(
                    "flex flex-1 items-center justify-between cursor-pointer",
                    isProcessing && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <div>
                    <span className="font-medium">{model.displayName}</span>
                    <p className="text-sm text-muted-foreground">
                      {model.description}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {model.fileSize}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {modelState.isLoaded && modelState.modelType && (
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Zap className="h-4 w-4" />
              {t("modelSelection.loaded", {
                model: availableModels[modelState.modelType].displayName,
                provider: modelState.provider?.toUpperCase() ?? "UNKNOWN",
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {t("upload.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25",
              isProcessing && "opacity-50 pointer-events-none",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="space-y-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg object-contain"
                />
                <p className="text-sm text-muted-foreground">
                  {selectedFile?.name}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  disabled={isProcessing}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t("upload.changeImage")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">{t("upload.dropzone")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("upload.supportedFormats")}
                  </p>
                </div>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    disabled={isProcessing}
                  />
                  <Button variant="outline" asChild>
                    <span>{t("upload.selectFile")}</span>
                  </Button>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            {t("options.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>{t("options.threshold")}</Label>
              <span className="text-sm text-muted-foreground">
                {options.threshold.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[options.threshold]}
              min={0}
              max={1}
              step={0.05}
              onValueChange={([value]) => setOptions({ threshold: value })}
              disabled={isProcessing}
            />
            <p className="text-xs text-muted-foreground">
              {t("options.thresholdDescription")}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>{t("options.featherRadius")}</Label>
              <span className="text-sm text-muted-foreground">
                {options.featherRadius}px
              </span>
            </div>
            <Slider
              value={[options.featherRadius]}
              min={0}
              max={20}
              step={1}
              onValueChange={([value]) => setOptions({ featherRadius: value })}
              disabled={isProcessing}
            />
            <p className="text-xs text-muted-foreground">
              {t("options.featherDescription")}
            </p>
          </div>

          <div className="space-y-3">
            <Label>{t("options.outputFormat")}</Label>
            <RadioGroup
              value={options.outputFormat}
              onValueChange={(value) =>
                setOptions({ outputFormat: value as "png" | "webp" })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="png" id="png" disabled={isProcessing} />
                <Label htmlFor="png">PNG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="webp"
                  id="webp"
                  disabled={isProcessing}
                />
                <Label htmlFor="webp">WebP</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {(error || modelState.error) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || modelState.error}</AlertDescription>
        </Alert>
      )}

      {/* Progress */}
      {processingProgress && processingProgress.stage !== "complete" && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{processingProgress.message}</span>
                <span>{Math.round(processingProgress.progress)}%</span>
              </div>
              <Progress value={processingProgress.progress} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Process Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleProcess}
        disabled={!selectedFile || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            {t("processing")}
          </>
        ) : (
          <>
            <Wand2 className="h-5 w-5 mr-2" />
            {t("removeBackground")}
          </>
        )}
      </Button>

      {/* Result */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{t("result.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  {t("result.original")}
                </p>
                <div className="rounded-lg overflow-hidden bg-muted/50 p-2">
                  <img
                    src={result.originalImage}
                    alt="Original"
                    className="max-h-64 mx-auto object-contain"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  {t("result.processed")}
                </p>
                <div
                  className="rounded-lg overflow-hidden p-2"
                  style={{
                    background:
                      "repeating-conic-gradient(#80808040 0% 25%, transparent 0% 50%) 50% / 20px 20px",
                  }}
                >
                  <img
                    src={result.resultImage}
                    alt="Result"
                    className="max-h-64 mx-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {t("result.processingTime", {
                  time: (result.processingTime / 1000).toFixed(2),
                })}
              </span>
              <span>
                {t("result.dimensions", {
                  width: result.width,
                  height: result.height,
                })}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => downloadResult("result")}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                {t("result.downloadResult")}
              </Button>
              <Button variant="outline" onClick={() => downloadResult("mask")}>
                <Download className="h-4 w-4 mr-2" />
                {t("result.downloadMask")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
