"use client";

import { useState } from "react";
import { useHashGenerator, type InputMode } from "../model/use-hash-generator";
import { FileUploader } from "@/widgets/file-uploader";
import {
  Button,
  Input,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ShareButton,
} from "@/shared/ui";
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
} from "lucide-react";

export function HashGenerator() {
  const {
    inputMode,
    textInput,
    file,
    hashes,
    compareHash,
    isProcessing,
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

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <TabsList>
            <TabsTrigger value="text">
              <Type className="h-4 w-4 mr-2" />
              텍스트
            </TabsTrigger>
            <TabsTrigger value="file">
              <FileText className="h-4 w-4 mr-2" />
              파일
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            {hasHistory && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            )}
            {textInput && inputMode === "text" && (
              <ShareButton getShareUrl={getShareUrl} />
            )}
            <Button variant="outline" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
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
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                >
                  <X className="h-4 w-4" />
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
            <Label>텍스트 입력</Label>
            <textarea
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              placeholder="해시를 생성할 텍스트를 입력하세요"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
        </TabsContent>

        {/* File Input */}
        <TabsContent value="file" className="space-y-4">
          {!file ? (
            <FileUploader
              onFileSelect={handleFileSelect}
              accept={{ "*/*": [] }}
              maxSize={100 * 1024 * 1024}
            />
          ) : (
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
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

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="rounded-lg border p-4 text-center text-muted-foreground">
          해시 계산 중...
        </div>
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
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
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
            <Label>비교할 해시값</Label>
            <Input
              type="text"
              placeholder="비교할 해시값을 입력하세요"
              value={compareHash}
              onChange={(e) => setCompareHash(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
          {comparisonResult !== null && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                comparisonResult
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              {comparisonResult ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>해시가 일치합니다</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" />
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
