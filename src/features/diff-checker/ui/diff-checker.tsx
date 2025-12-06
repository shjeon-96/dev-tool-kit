"use client";

import { useDiffChecker, type DiffViewMode, type EditorLanguage } from "../model/use-diff-checker";
import { DiffEditor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { ArrowLeftRight, RotateCcw, Trash2, Plus, Minus, FileText } from "lucide-react";

const languages: { value: EditorLanguage; label: string }[] = [
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "json", label: "JSON" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "markdown", label: "Markdown" },
];

export function DiffChecker() {
  const {
    original,
    setOriginal,
    modified,
    setModified,
    viewMode,
    setViewMode,
    language,
    setLanguage,
    diffStats,
    handleSwap,
    handleClear,
    handleReset,
  } = useDiffChecker();

  const { theme } = useTheme();
  const editorTheme = theme === "dark" ? "vs-dark" : "light";

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Label className="text-sm">언어</Label>
            <Select
              value={language}
              onValueChange={(value: EditorLanguage) => setLanguage(value)}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2">
            <Label className="text-sm">보기</Label>
            <Select
              value={viewMode}
              onValueChange={(value: DiffViewMode) => setViewMode(value)}
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="split">분할</SelectItem>
                <SelectItem value="inline">인라인</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSwap}>
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            좌우 교환
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="h-4 w-4 mr-2" />
            초기화
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            예시 복원
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">변경사항:</span>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <Plus className="h-4 w-4" />
          <span>{diffStats.additions} 추가</span>
        </div>
        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
          <Minus className="h-4 w-4" />
          <span>{diffStats.deletions} 삭제</span>
        </div>
      </div>

      {/* Diff Editor */}
      <div className="rounded-lg border overflow-hidden">
        <DiffEditor
          height="500px"
          language={language}
          original={original}
          modified={modified}
          theme={editorTheme}
          options={{
            readOnly: false,
            renderSideBySide: viewMode === "split",
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            originalEditable: true,
          }}
          onMount={(editor) => {
            const originalEditor = editor.getOriginalEditor();
            const modifiedEditor = editor.getModifiedEditor();

            originalEditor.onDidChangeModelContent(() => {
              setOriginal(originalEditor.getValue());
            });

            modifiedEditor.onDidChangeModelContent(() => {
              setModified(modifiedEditor.getValue());
            });
          }}
        />
      </div>

      {/* Labels */}
      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="text-center">원본 (Original)</div>
        <div className="text-center">수정본 (Modified)</div>
      </div>
    </div>
  );
}
