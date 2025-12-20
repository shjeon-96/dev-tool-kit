"use client";

import { useState, useRef, useEffect } from "react";
import {
  Copy,
  Check,
  Trash2,
  ClipboardPaste,
  Upload,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { ToolActionsBar } from "@/features/tool-actions";
import { useBase64 } from "../model/use-base64";
import { usePipelineReceiver } from "@/features/tool-pipeline";

export function Base64Converter() {
  const {
    input,
    output,
    mode,
    error,
    handleInputChange,
    handleModeChange,
    handleConvert,
    handleCopy,
    handleClear,
    handlePaste,
    handleFileUpload,
  } = useBase64();

  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { receivedData, checkForPipelineData, clearReceivedData } =
    usePipelineReceiver();

  // Pipeline에서 받은 데이터 처리
  useEffect(() => {
    checkForPipelineData();
  }, [checkForPipelineData]);

  useEffect(() => {
    if (receivedData) {
      handleInputChange(receivedData.data);
      clearReceivedData();
    }
  }, [receivedData, handleInputChange, clearReceivedData]);

  const onCopy = async () => {
    const success = await handleCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-md border p-1">
          <button
            onClick={() => handleModeChange("encode")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              mode === "encode"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => handleModeChange("decode")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              mode === "decode"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Decode
          </button>
        </div>

        <Button size="sm" onClick={handleConvert}>
          <ArrowRightLeft className="h-4 w-4 mr-1" />
          Convert
        </Button>

        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePaste}>
            <ClipboardPaste className="h-4 w-4 mr-1" />
            Paste
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-1" />
            File
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* AI, Pipeline, Workspace Actions */}
      <ToolActionsBar
        toolSlug="base64-converter"
        input={input}
        output={output}
      />

      {/* Error display */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {mode === "encode" ? "Text" : "Base64"}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter text to encode..."
                : "Enter Base64 to decode..."
            }
            className="h-[300px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {mode === "encode" ? "Base64" : "Text"}
            </label>
            {output && (
              <Button variant="ghost" size="sm" onClick={onCopy}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
              </Button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here"
            className="h-[300px] w-full rounded-md border bg-muted/50 p-3 font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      {/* File Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drag & drop a file here to convert to Base64
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Max file size: 10MB
        </p>
      </div>

      {/* Info */}
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">About Base64</h3>
        <p className="text-xs text-muted-foreground">
          Base64 is a binary-to-text encoding scheme that represents binary data
          in an ASCII string format. It&apos;s commonly used to encode binary
          data for storage or transfer over media that only support text
          content.
        </p>
      </div>
    </div>
  );
}
