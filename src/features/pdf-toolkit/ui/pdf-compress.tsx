"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  File,
  Trash2,
  Download,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import type { usePdfToolkit } from "../model/use-pdf-toolkit";
import { Button } from "@/shared/ui";
import { Progress } from "@/shared/ui";
import { Alert, AlertDescription } from "@/shared/ui";
import { Label } from "@/shared/ui";
import { Switch } from "@/shared/ui";
import { formatSize } from "@/shared/lib";

interface PdfCompressProps {
  toolkit: ReturnType<typeof usePdfToolkit>;
}

export function PdfCompress({ toolkit }: PdfCompressProps) {
  const {
    files,
    isProcessing,
    progress,
    error,
    compressionResult,
    addFiles,
    clearFiles,
    handleCompress,
    downloadBlob,
  } = toolkit;

  const [removeMetadata, setRemoveMetadata] = useState(true);

  const selectedFile = files[0];

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files.length > 0) {
        clearFiles();
        addFiles([e.dataTransfer.files[0]]);
      }
    },
    [addFiles, clearFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        clearFiles();
        addFiles([e.target.files[0]]);
        e.target.value = "";
      }
    },
    [addFiles, clearFiles],
  );

  const handleCompressClick = useCallback(async () => {
    if (!selectedFile) return;

    const blob = await handleCompress(selectedFile, { removeMetadata });
    if (blob) {
      const baseName = selectedFile.name.replace(/\.pdf$/i, "");
      downloadBlob(blob, `${baseName}_compressed.pdf`);
    }
  }, [selectedFile, removeMetadata, handleCompress, downloadBlob]);

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      {!selectedFile && (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("pdf-compress-input")?.click()}
        >
          <input
            id="pdf-compress-input"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">Drop a PDF file here</p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Selected File */}
      {selectedFile && (
        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
          <File className="h-5 w-5 text-destructive" />
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {selectedFile.pageCount} pages • {formatSize(selectedFile.size)}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={clearFiles}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Options */}
      {selectedFile && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="remove-metadata">Remove metadata</Label>
              <p className="text-xs text-muted-foreground">
                Strip author, title, and other metadata
              </p>
            </div>
            <Switch
              id="remove-metadata"
              checked={removeMetadata}
              onCheckedChange={setRemoveMetadata}
            />
          </div>
        </div>
      )}

      {/* Compression Result */}
      {compressionResult && (
        <Alert>
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription>
            <div className="space-y-1">
              <p>
                Compressed from{" "}
                <strong>{formatSize(compressionResult.originalSize)}</strong> to{" "}
                <strong>{formatSize(compressionResult.compressedSize)}</strong>
              </p>
              {compressionResult.savedPercent > 0 && (
                <p className="text-success">
                  Saved {formatSize(compressionResult.savedBytes)} (
                  {compressionResult.savedPercent.toFixed(1)}%)
                </p>
              )}
              {compressionResult.savedPercent <= 0 && (
                <p className="text-muted-foreground">
                  File is already optimized
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Progress */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Compressing PDF...</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {/* Compress Button */}
      {selectedFile && (
        <Button
          onClick={handleCompressClick}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Compress & Download
        </Button>
      )}
    </div>
  );
}
