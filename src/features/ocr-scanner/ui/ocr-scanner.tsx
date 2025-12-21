"use client";

import { useCallback } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  ScanText,
  Copy,
  Download,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import { useOcrScanner } from "../model/use-ocr-scanner";
import { OCR_LANGUAGES, type OCRLanguage } from "../lib/types";
import { Button } from "@/shared/ui/button";
import { Progress } from "@/shared/ui/progress";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { useCopyToClipboard } from "@/shared/lib";

export function OcrScanner() {
  const {
    imageFile,
    imagePreview,
    language,
    isProcessing,
    progress,
    result,
    error,
    setImage,
    setLanguage,
    clearImage,
    handleExtract,
    downloadAsText,
  } = useOcrScanner();

  const { copy, copied } = useCopyToClipboard();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files.length > 0) {
        setImage(e.dataTransfer.files[0]);
      }
    },
    [setImage],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
        e.target.value = "";
      }
    },
    [setImage],
  );

  const handleCopy = useCallback(() => {
    if (result?.text) {
      copy(result.text);
    }
  }, [copy, result]);

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <div className="space-y-2">
        <Label htmlFor="language">Recognition Language</Label>
        <Select
          value={language}
          onValueChange={(v: OCRLanguage) => setLanguage(v)}
          disabled={isProcessing}
        >
          <SelectTrigger id="language" className="w-full md:w-[300px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {OCR_LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                <span className="flex flex-col">
                  <span>{lang.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {lang.description}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Drop Zone / Image Preview */}
      {!imagePreview ? (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("ocr-image-input")?.click()}
        >
          <input
            id="ocr-image-input"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/bmp,image/gif"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">Drop an image here</p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse (PNG, JPEG, WebP, BMP, GIF)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border bg-muted/30">
            <div className="relative aspect-video w-full">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() =>
                  document.getElementById("ocr-image-input")?.click()
                }
                disabled={isProcessing}
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={clearImage}
                disabled={isProcessing}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <input
              id="ocr-image-input"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/bmp,image/gif"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {imageFile && (
            <p className="text-sm text-muted-foreground text-center">
              {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Progress */}
      {isProcessing && progress && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">{progress.status}</span>
          </div>
          <Progress value={progress.progress} />
        </div>
      )}

      {/* Extract Button */}
      {imagePreview && (
        <Button
          onClick={handleExtract}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <ScanText className="h-4 w-4 mr-2" />
          )}
          Extract Text
        </Button>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Extracted Text</h3>
              <p className="text-sm text-muted-foreground">
                Confidence: {result.confidence.toFixed(1)}%
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={downloadAsText}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <Textarea
            value={result.text}
            readOnly
            className="min-h-[200px] font-mono text-sm"
          />

          {result.text.trim() === "" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No text was detected in the image. Try using a clearer image or
                selecting a different language.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
