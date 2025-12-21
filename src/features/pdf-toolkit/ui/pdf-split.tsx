"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  File,
  Trash2,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { usePdfToolkit } from "../model/use-pdf-toolkit";
import type { SplitMode } from "../lib/types";
import { Button } from "@/shared/ui/button";
import { Progress } from "@/shared/ui/progress";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { formatSize } from "@/shared/lib";

interface PdfSplitProps {
  toolkit: ReturnType<typeof usePdfToolkit>;
}

export function PdfSplit({ toolkit }: PdfSplitProps) {
  const {
    files,
    isProcessing,
    progress,
    error,
    addFiles,
    removeFile,
    clearFiles,
    handleSplit,
    downloadBlob,
    downloadMultiple,
  } = toolkit;

  const [splitMode, setSplitMode] = useState<SplitMode["type"]>("all");
  const [rangeInput, setRangeInput] = useState("");

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

  const handleSplitClick = useCallback(async () => {
    if (!selectedFile) return;

    const mode: SplitMode = {
      type: splitMode,
      rangeInput: splitMode === "range" ? rangeInput : undefined,
    };

    const result = await handleSplit(selectedFile, mode);
    if (result) {
      if (result.blobs.length === 1) {
        downloadBlob(result.blobs[0], result.filenames[0]);
      } else {
        const baseName = selectedFile.name.replace(/\.pdf$/i, "");
        await downloadMultiple(
          result.blobs,
          result.filenames,
          `${baseName}_split.zip`,
        );
      }
    }
  }, [
    selectedFile,
    splitMode,
    rangeInput,
    handleSplit,
    downloadBlob,
    downloadMultiple,
  ]);

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      {!selectedFile && (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("pdf-split-input")?.click()}
        >
          <input
            id="pdf-split-input"
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
          <File className="h-5 w-5 text-red-500" />
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

      {/* Split Options */}
      {selectedFile && (
        <div className="space-y-4">
          <Label>Split Mode</Label>
          <RadioGroup
            value={splitMode}
            onValueChange={(v: SplitMode["type"]) => setSplitMode(v)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="split-all" />
              <Label htmlFor="split-all" className="font-normal cursor-pointer">
                Extract all pages (one PDF per page)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="range" id="split-range" />
              <Label
                htmlFor="split-range"
                className="font-normal cursor-pointer"
              >
                Extract specific pages
              </Label>
            </div>
          </RadioGroup>

          {splitMode === "range" && (
            <div className="space-y-2 pl-6">
              <Label htmlFor="page-range">Page range</Label>
              <Input
                id="page-range"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="e.g., 1-5, 8, 10-12"
              />
              <p className="text-xs text-muted-foreground">
                Enter page numbers or ranges separated by commas
              </p>
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Splitting PDF...</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {/* Split Button */}
      {selectedFile && (
        <Button
          onClick={handleSplitClick}
          disabled={isProcessing || (splitMode === "range" && !rangeInput)}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Split & Download
        </Button>
      )}
    </div>
  );
}
