"use client";

import { GitCompare, Trash2, Plus, Minus, Equal } from "lucide-react";
import { Button, Textarea, Label } from "@/shared/ui";
import { useDiffType } from "../model/use-diff-type";
import type { DiffType, LocaleKey } from "@/entities/diff-type";

interface DiffTypeToolProps {
  type: DiffType;
  locale: string;
}

export function DiffTypeTool({ type, locale }: DiffTypeToolProps) {
  const {
    leftInput,
    setLeftInput,
    rightInput,
    setRightInput,
    result,
    compare,
    clear,
    isProcessing,
  } = useDiffType(type);

  const localeKey = locale as LocaleKey;

  const labels = {
    original: {
      en: "Original",
      ko: "원본",
      ja: "オリジナル",
    },
    modified: {
      en: "Modified",
      ko: "수정본",
      ja: "変更後",
    },
    compare: {
      en: "Compare",
      ko: "비교",
      ja: "比較",
    },
    clear: {
      en: "Clear",
      ko: "지우기",
      ja: "クリア",
    },
    placeholder: {
      en: `Paste ${type.name} here...`,
      ko: `${type.name}을(를) 붙여넣으세요...`,
      ja: `${type.name}をここに貼り付けてください...`,
    },
    result: {
      en: "Diff Result",
      ko: "비교 결과",
      ja: "比較結果",
    },
    added: {
      en: "Added",
      ko: "추가",
      ja: "追加",
    },
    removed: {
      en: "Removed",
      ko: "삭제",
      ja: "削除",
    },
    unchanged: {
      en: "Unchanged",
      ko: "변경 없음",
      ja: "変更なし",
    },
  };

  return (
    <div className="space-y-6">
      {/* Type Info Badge */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted capitalize">
          {type.category}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {type.fileExtension}
        </span>
      </div>

      {/* Input Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{labels.original[localeKey] || labels.original.en}</Label>
          <Textarea
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            rows={10}
            className="font-mono text-sm"
            placeholder={labels.placeholder[localeKey] || labels.placeholder.en}
          />
        </div>
        <div className="space-y-2">
          <Label>{labels.modified[localeKey] || labels.modified.en}</Label>
          <Textarea
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            rows={10}
            className="font-mono text-sm"
            placeholder={labels.placeholder[localeKey] || labels.placeholder.en}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={compare}
          disabled={isProcessing || (!leftInput.trim() && !rightInput.trim())}
          className="flex-1"
        >
          <GitCompare className="h-4 w-4 mr-2" />
          {labels.compare[localeKey] || labels.compare.en}
        </Button>
        <Button variant="outline" onClick={clear}>
          <Trash2 className="h-4 w-4 mr-2" />
          {labels.clear[localeKey] || labels.clear.en}
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-muted-foreground">
                {labels.added[localeKey] || labels.added.en}:
              </span>
              <span className="font-mono font-medium text-green-600 dark:text-green-400">
                {result.stats.added}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-muted-foreground">
                {labels.removed[localeKey] || labels.removed.en}:
              </span>
              <span className="font-mono font-medium text-red-600 dark:text-red-400">
                {result.stats.removed}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Equal className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {labels.unchanged[localeKey] || labels.unchanged.en}:
              </span>
              <span className="font-mono font-medium">
                {result.stats.unchanged}
              </span>
            </div>
          </div>

          {/* Diff Output */}
          <div className="space-y-2">
            <Label>{labels.result[localeKey] || labels.result.en}</Label>
            <div className="rounded-lg border overflow-hidden">
              <div className="max-h-[400px] overflow-auto">
                <table className="w-full text-sm font-mono">
                  <tbody>
                    {result.lines.map((line, index) => (
                      <tr
                        key={index}
                        className={
                          line.type === "added"
                            ? "bg-green-50 dark:bg-green-900/20"
                            : line.type === "removed"
                              ? "bg-red-50 dark:bg-red-900/20"
                              : ""
                        }
                      >
                        <td className="w-10 px-2 py-1 text-right text-muted-foreground border-r select-none">
                          {line.lineNumber.left || ""}
                        </td>
                        <td className="w-10 px-2 py-1 text-right text-muted-foreground border-r select-none">
                          {line.lineNumber.right || ""}
                        </td>
                        <td className="w-6 px-2 py-1 text-center border-r select-none">
                          {line.type === "added" ? (
                            <Plus className="h-3 w-3 text-green-600 dark:text-green-400 inline" />
                          ) : line.type === "removed" ? (
                            <Minus className="h-3 w-3 text-red-600 dark:text-red-400 inline" />
                          ) : (
                            <span className="text-muted-foreground">
                              &nbsp;
                            </span>
                          )}
                        </td>
                        <td
                          className={`px-2 py-1 whitespace-pre ${
                            line.type === "added"
                              ? "text-green-700 dark:text-green-300"
                              : line.type === "removed"
                                ? "text-red-700 dark:text-red-300"
                                : ""
                          }`}
                        >
                          {line.content || " "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
