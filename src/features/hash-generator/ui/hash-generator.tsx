"use client";

import { useState, useEffect } from "react";
import { useHashGenerator, type InputMode } from "../model/use-hash-generator";
import {
  Button,
  Input,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ShareButton,
  EmptyState,
  FileUploader,
} from "@/shared/ui";
import { ToolActionsBar } from "@/features/tool-actions";
import { usePipelineReceiver } from "@/features/tool-pipeline";
import {
  Copy,
  Check,
  RotateCcw,
  FileText,
  Type,
  CheckCircle,
  XCircle,
  History,
  Trash2,
  X,
  ShieldCheck,
} from "lucide-react";

export function HashGenerator() {
  const {
    inputMode,
    textInput,
    file,
    hashes,
    compareHash,
    isProcessing,
    progress,
    error,
    setTextInput,
    setCompareHash,
    handleFileSelect,
    handleModeChange,
    compareWithHash,
    copyToClipboard,
    handleClear,
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
    getShareUrl,
  } = useHashGenerator();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const { receivedData, checkForPipelineData, clearReceivedData } =
    usePipelineReceiver();

  // Pipeline에서 받은 데이터 처리
  useEffect(() => {
    checkForPipelineData();
  }, [checkForPipelineData]);

  useEffect(() => {
    if (receivedData) {
      setTextInput(receivedData.data);
      clearReceivedData();
    }
  }, [receivedData, setTextInput, clearReceivedData]);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleCopy = async (text: string, index: number) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const comparisonResult = compareWithHash();

  return (
    <div className="space-y-6">
      {/* Input Mode Tabs */}
      <Tabs
        value={inputMode}
        onValueChange={(value) => handleModeChange(value as InputMode)}
      >
        <div className="flex items-center justify-between">
          <TabsList aria-label="Input mode selection">
            <TabsTrigger value="text" aria-label="Text input mode">
              <Type className="h-4 w-4 mr-2" aria-hidden="true" />
              텍스트
            </TabsTrigger>
            <TabsTrigger value="file" aria-label="File input mode">
              <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
              파일
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            {hasHistory && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                aria-expanded={showHistory}
                aria-label="Toggle history panel"
              >
                <History className="h-4 w-4 mr-2" aria-hidden="true" />
                History
              </Button>
            )}
            {textInput && inputMode === "text" && (
              <ShareButton getShareUrl={getShareUrl} />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              aria-label="Reset all values"
            >
              <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
              초기화
            </Button>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && hasHistory && (
          <div className="rounded-md border bg-muted/30 p-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Recent History</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-destructive hover:text-destructive"
                  aria-label="Clear all history"
                >
                  <Trash2 className="h-3 w-3 mr-1" aria-hidden="true" />
                  Clear All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                  aria-label="Close history panel"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    loadFromHistory(item.input, item.output);
                    setShowHistory(false);
                  }}
                  className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      {truncateText(item.input)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input */}
        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hash-text-input">텍스트 입력</Label>
            <textarea
              id="hash-text-input"
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              placeholder="해시를 생성할 텍스트를 입력하세요"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              aria-describedby={error ? "hash-error" : undefined}
            />
          </div>
        </TabsContent>

        {/* File Input */}
        <TabsContent value="file" className="space-y-4">
          {!file ? (
            <FileUploader
              onFileSelect={handleFileSelect}
              accept={{ "*/*": [] }}
              maxSize={2 * 1024 * 1024 * 1024} // 2GB limit
              warnSize={500 * 1024 * 1024} // Warn at 500MB
            />
          ) : (
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModeChange("file")}
                >
                  다른 파일 선택
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* AI, Pipeline, Workspace Actions */}
      <ToolActionsBar
        toolSlug="hash-generator"
        input={textInput}
        output={hashes.map((h) => `${h.algorithm}: ${h.hash}`).join("\n")}
      />

      {/* Error Display */}
      {error && (
        <div
          id="hash-error"
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive"
        >
          {error}
        </div>
      )}

      {/* Processing Indicator with Progress */}
      {isProcessing && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border p-4 space-y-3"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">해시 계산 중...</span>
            {progress > 0 && <span className="font-medium">{progress}%</span>}
          </div>
          {progress > 0 && (
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {hashes.length === 0 && !isProcessing && !error && (
        <EmptyState
          icon={<ShieldCheck className="h-12 w-12" />}
          title="Generate secure hashes"
          description="Enter text or upload a file to generate MD5, SHA-1, SHA-256, and SHA-512 hashes. You can also compare hashes to verify file integrity."
          className="min-h-[200px]"
        />
      )}

      {/* Hash Results */}
      {hashes.length > 0 && (
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium">해시 결과</h3>
          <div className="space-y-3">
            {hashes.map((result, index) => (
              <div key={result.algorithm} className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="uppercase text-muted-foreground">
                    {result.algorithm}
                  </Label>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleCopy(result.hash, index)}
                    aria-label={
                      copiedIndex === index
                        ? "Copied"
                        : `Copy ${result.algorithm} hash`
                    }
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3 w-3" aria-hidden="true" />
                    )}
                  </Button>
                </div>
                <code className="block text-xs bg-muted p-2 rounded break-all font-mono">
                  {result.hash}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hash Comparison */}
      {hashes.length > 0 && (
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium">해시 비교</h3>
          <div className="space-y-2">
            <Label htmlFor="compare-hash-input">비교할 해시값</Label>
            <Input
              id="compare-hash-input"
              type="text"
              placeholder="비교할 해시값을 입력하세요"
              value={compareHash}
              onChange={(e) => setCompareHash(e.target.value)}
              className="font-mono text-sm"
              aria-label="Enter hash to compare"
            />
          </div>
          {comparisonResult !== null && (
            <div
              role="status"
              aria-live="polite"
              className={`flex items-center gap-2 p-3 rounded-lg ${
                comparisonResult
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              {comparisonResult ? (
                <>
                  <CheckCircle className="h-5 w-5" aria-hidden="true" />
                  <span>해시가 일치합니다</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                  <span>해시가 일치하지 않습니다</span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
