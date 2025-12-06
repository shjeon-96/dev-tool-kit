"use client";

import { useState } from "react";
import { useMarkdownPreview } from "../model/use-markdown-preview";
import { Button, Label } from "@/shared/ui";
import { Copy, Check, Trash2, RotateCcw, Eye, Code } from "lucide-react";

export function MarkdownPreview() {
  const {
    input,
    setInput,
    renderedHtml,
    copyToClipboard,
    handleClear,
    handleReset,
  } = useMarkdownPreview();

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "preview" | "source">("split");

  const handleCopy = async () => {
    const success = await copyToClipboard(input);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <Button
            variant={viewMode === "split" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("split")}
          >
            분할
          </Button>
          <Button
            variant={viewMode === "source" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("source")}
          >
            <Code className="h-4 w-4 mr-2" />
            소스
          </Button>
          <Button
            variant={viewMode === "preview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("preview")}
          >
            <Eye className="h-4 w-4 mr-2" />
            미리보기
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleClear}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        className={`grid gap-4 ${
          viewMode === "split" ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* Source */}
        {(viewMode === "split" || viewMode === "source") && (
          <div className="space-y-2">
            {viewMode === "split" && <Label>Markdown 소스</Label>}
            <textarea
              className="flex min-h-[500px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono resize-none"
              placeholder="Markdown을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )}

        {/* Preview */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div className="space-y-2">
            {viewMode === "split" && <Label>미리보기</Label>}
            <div
              className="min-h-[500px] rounded-md border bg-background p-4 overflow-auto prose prose-sm dark:prose-invert max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-pre:bg-muted prose-pre:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        )}
      </div>

      {/* Quick Reference */}
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-3">빠른 참조</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <code className="bg-muted px-2 py-1 rounded"># H1</code>
            <span className="ml-2 text-muted-foreground">제목</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">**bold**</code>
            <span className="ml-2 text-muted-foreground">굵게</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">*italic*</code>
            <span className="ml-2 text-muted-foreground">기울임</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">`code`</code>
            <span className="ml-2 text-muted-foreground">코드</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">[text](url)</code>
            <span className="ml-2 text-muted-foreground">링크</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">- item</code>
            <span className="ml-2 text-muted-foreground">목록</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">&gt; quote</code>
            <span className="ml-2 text-muted-foreground">인용</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">```code```</code>
            <span className="ml-2 text-muted-foreground">코드블록</span>
          </div>
        </div>
      </div>
    </div>
  );
}
