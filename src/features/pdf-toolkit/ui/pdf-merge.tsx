"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  File,
  Trash2,
  Download,
  GripVertical,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { usePdfToolkit } from "../model/use-pdf-toolkit";
import { Button } from "@/shared/ui";
import { Progress } from "@/shared/ui";
import { Alert, AlertDescription } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { Label } from "@/shared/ui";
import { formatSize } from "@/shared/lib";

interface PdfMergeProps {
  toolkit: ReturnType<typeof usePdfToolkit>;
}

export function PdfMerge({ toolkit }: PdfMergeProps) {
  const {
    files,
    isProcessing,
    progress,
    error,
    addFiles,
    removeFile,
    reorderFiles,
    clearFiles,
    handleMerge,
    downloadBlob,
  } = toolkit;

  const [outputName, setOutputName] = useState("merged");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
        e.target.value = "";
      }
    },
    [addFiles],
  );

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleDragOverItem = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();
      if (draggedIndex !== null && draggedIndex !== targetIndex) {
        reorderFiles(draggedIndex, targetIndex);
        setDraggedIndex(targetIndex);
      }
    },
    [draggedIndex, reorderFiles],
  );

  const handleMergeClick = useCallback(async () => {
    const blob = await handleMerge();
    if (blob) {
      downloadBlob(blob, `${outputName || "merged"}.pdf`);
    }
  }, [handleMerge, downloadBlob, outputName]);

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("pdf-merge-input")?.click()}
      >
        <input
          id="pdf-merge-input"
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium">Drop PDF files here</p>
        <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
      </div>

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Files ({files.length})</h3>
            <Button variant="ghost" size="sm" onClick={clearFiles}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={file.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOverItem(e, index)}
                className={`flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-grab active:cursor-grabbing ${
                  draggedIndex === index ? "opacity-50" : ""
                }`}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <File className="h-4 w-4 text-destructive" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.pageCount} pages • {formatSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Name */}
      {files.length >= 2 && (
        <div className="space-y-2">
          <Label htmlFor="output-name">Output filename</Label>
          <div className="flex gap-2">
            <Input
              id="output-name"
              value={outputName}
              onChange={(e) => setOutputName(e.target.value)}
              placeholder="merged"
            />
            <span className="flex items-center text-muted-foreground">
              .pdf
            </span>
          </div>
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Merging PDFs...</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {/* Merge Button */}
      {files.length >= 2 && (
        <Button
          onClick={handleMergeClick}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Merge & Download
        </Button>
      )}
    </div>
  );
}
