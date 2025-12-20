"use client";

import { useState, useCallback, useRef, type RefObject } from "react";

interface UseFileDropzoneOptions {
  /** Accepted file types (e.g., ".json", "image/*") */
  accept?: string | string[];
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file count */
  maxFiles?: number;
  /** Max file size in bytes */
  maxFileSize?: number;
  /** Callback when files are selected */
  onFilesSelected?: (files: File[]) => void | Promise<void>;
  /** Callback when file validation fails */
  onError?: (error: string) => void;
  /** Disabled state */
  disabled?: boolean;
}

interface UseFileDropzoneReturn {
  /** Ref to attach to file input element */
  inputRef: RefObject<HTMLInputElement | null>;
  /** Whether user is dragging over the dropzone */
  isDragging: boolean;
  /** Whether files are being processed */
  isProcessing: boolean;
  /** Open file dialog programmatically */
  openFileDialog: () => void;
  /** Handle drag over event */
  handleDragOver: (e: React.DragEvent) => void;
  /** Handle drag leave event */
  handleDragLeave: (e: React.DragEvent) => void;
  /** Handle drop event */
  handleDrop: (e: React.DragEvent) => Promise<void>;
  /** Handle input change event */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  /** Get props for dropzone container */
  getDropzoneProps: () => {
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => Promise<void>;
    onClick: () => void;
  };
  /** Get props for file input */
  getInputProps: () => {
    ref: RefObject<HTMLInputElement | null>;
    type: "file";
    accept: string | undefined;
    multiple: boolean;
    className: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  };
}

/**
 * Hook for handling file drag-and-drop and file input selection
 *
 * @example
 * ```tsx
 * const { getDropzoneProps, getInputProps, isDragging } = useFileDropzone({
 *   accept: ".json",
 *   multiple: true,
 *   onFilesSelected: handleFiles,
 * });
 *
 * return (
 *   <div {...getDropzoneProps()} className={cn("dropzone", isDragging && "active")}>
 *     <input {...getInputProps()} />
 *     Drop files here
 *   </div>
 * );
 * ```
 */
export function useFileDropzone(
  options: UseFileDropzoneOptions = {},
): UseFileDropzoneReturn {
  const {
    accept,
    multiple = true,
    maxFiles,
    maxFileSize,
    onFilesSelected,
    onError,
    disabled = false,
  } = options;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const acceptString = Array.isArray(accept) ? accept.join(",") : accept;

  const validateFiles = useCallback(
    (files: FileList | File[]): File[] => {
      const fileArray = Array.from(files);

      // Check max files
      if (maxFiles && fileArray.length > maxFiles) {
        onError?.(`Maximum ${maxFiles} files allowed`);
        return fileArray.slice(0, maxFiles);
      }

      // Check file sizes
      if (maxFileSize) {
        const validFiles = fileArray.filter((file) => {
          if (file.size > maxFileSize) {
            onError?.(
              `File "${file.name}" exceeds max size of ${formatBytes(maxFileSize)}`,
            );
            return false;
          }
          return true;
        });
        return validFiles;
      }

      return fileArray;
    },
    [maxFiles, maxFileSize, onError],
  );

  const processFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setIsProcessing(true);
      try {
        const validFiles = validateFiles(files);
        if (validFiles.length > 0) {
          await onFilesSelected?.(validFiles);
        }
      } finally {
        setIsProcessing(false);
        // Reset input
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [validateFiles, onFilesSelected],
  );

  const openFileDialog = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      await processFiles(e.dataTransfer.files);
    },
    [disabled, processFiles],
  );

  const handleInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      await processFiles(e.target.files);
    },
    [processFiles],
  );

  const getDropzoneProps = useCallback(
    () => ({
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onClick: openFileDialog,
    }),
    [handleDragOver, handleDragLeave, handleDrop, openFileDialog],
  );

  const getInputProps = useCallback(
    () => ({
      ref: inputRef,
      type: "file" as const,
      accept: acceptString,
      multiple,
      className: "hidden",
      onChange: handleInputChange,
    }),
    [acceptString, multiple, handleInputChange],
  );

  return {
    inputRef,
    isDragging,
    isProcessing,
    openFileDialog,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    getDropzoneProps,
    getInputProps,
  };
}

// Helper function (internal)
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
