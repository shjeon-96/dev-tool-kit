"use client";

import { useCallback, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { Upload, X, FileIcon, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: Accept;
  maxSize?: number;
  className?: string;
  preview?: string | null;
  onClear?: () => void;
  disabled?: boolean;
  warnSize?: number; // Size threshold for performance warning
}

export function FileUploader({
  onFileSelect,
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"] },
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
  preview,
  onClear,
  disabled = false,
  warnSize,
}: FileUploaderProps) {
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Check for size warning
        if (warnSize && file.size > warnSize) {
          setSizeWarning(
            `Large file detected (${formatSize(file.size)}). Processing may take several minutes and use significant memory.`,
          );
        } else {
          setSizeWarning(null);
        }

        onFileSelect(file);
      }
    },
    [onFileSelect, warnSize],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false,
      disabled,
    });

  const hasError = fileRejections.length > 0;
  const errorMessage = hasError ? fileRejections[0].errors[0].message : null;

  return (
    <div className={cn("space-y-2", className)}>
      {preview ? (
        <div className="relative rounded-lg border overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-[300px] object-contain bg-muted/50"
          />
          {onClear && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            hasError && "border-destructive bg-destructive/5",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {isDragActive ? (
              <>
                <Upload className="h-10 w-10 text-primary animate-bounce" />
                <p className="text-sm font-medium">Drop the file here</p>
              </>
            ) : (
              <>
                <FileIcon className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Drag & drop a file here, or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Max file size: {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      {sizeWarning && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400">
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{sizeWarning}</p>
        </div>
      )}
    </div>
  );
}
