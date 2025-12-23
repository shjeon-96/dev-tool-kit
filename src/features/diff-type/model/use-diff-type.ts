"use client";

import { useState, useCallback } from "react";
import type { DiffType } from "@/entities/diff-type";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
  lineNumber: {
    left?: number;
    right?: number;
  };
}

interface DiffResult {
  lines: DiffLine[];
  stats: {
    added: number;
    removed: number;
    unchanged: number;
  };
}

interface UseDiffTypeReturn {
  leftInput: string;
  setLeftInput: (value: string) => void;
  rightInput: string;
  setRightInput: (value: string) => void;
  result: DiffResult | null;
  compare: () => void;
  clear: () => void;
  isProcessing: boolean;
}

export function useDiffType(diffType: DiffType): UseDiffTypeReturn {
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [result, setResult] = useState<DiffResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // LCS (Longest Common Subsequence) based diff
  const computeDiff = useCallback(
    (left: string[], right: string[]): DiffLine[] => {
      const m = left.length;
      const n = right.length;

      // Build LCS table
      const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));

      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (left[i - 1] === right[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }

      // Backtrack to find diff
      const lines: DiffLine[] = [];
      let i = m;
      let j = n;
      let leftLineNum = m;
      let rightLineNum = n;

      const tempLines: DiffLine[] = [];

      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && left[i - 1] === right[j - 1]) {
          tempLines.unshift({
            type: "unchanged",
            content: left[i - 1],
            lineNumber: { left: leftLineNum, right: rightLineNum },
          });
          i--;
          j--;
          leftLineNum--;
          rightLineNum--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
          tempLines.unshift({
            type: "added",
            content: right[j - 1],
            lineNumber: { right: rightLineNum },
          });
          j--;
          rightLineNum--;
        } else if (i > 0) {
          tempLines.unshift({
            type: "removed",
            content: left[i - 1],
            lineNumber: { left: leftLineNum },
          });
          i--;
          leftLineNum--;
        }
      }

      return tempLines;
    },
    [],
  );

  const compareText = useCallback(
    (left: string, right: string): DiffResult => {
      const leftLines = left.split("\n");
      const rightLines = right.split("\n");

      const lines = computeDiff(leftLines, rightLines);

      const stats = {
        added: lines.filter((l) => l.type === "added").length,
        removed: lines.filter((l) => l.type === "removed").length,
        unchanged: lines.filter((l) => l.type === "unchanged").length,
      };

      return { lines, stats };
    },
    [computeDiff],
  );

  const compareJson = useCallback(
    (left: string, right: string): DiffResult => {
      try {
        const leftObj = JSON.parse(left);
        const rightObj = JSON.parse(right);

        // Pretty print for comparison
        const leftFormatted = JSON.stringify(leftObj, null, 2);
        const rightFormatted = JSON.stringify(rightObj, null, 2);

        return compareText(leftFormatted, rightFormatted);
      } catch {
        // Fallback to text comparison
        return compareText(left, right);
      }
    },
    [compareText],
  );

  const compare = useCallback(() => {
    if (!leftInput.trim() && !rightInput.trim()) {
      setResult(null);
      return;
    }

    setIsProcessing(true);

    try {
      let diffResult: DiffResult;

      switch (diffType.slug) {
        case "json":
          diffResult = compareJson(leftInput, rightInput);
          break;
        case "xml":
        case "html":
        case "css":
        case "javascript":
        case "markdown":
        case "yaml":
        case "text":
        default:
          diffResult = compareText(leftInput, rightInput);
          break;
      }

      setResult(diffResult);
    } finally {
      setIsProcessing(false);
    }
  }, [leftInput, rightInput, diffType.slug, compareText, compareJson]);

  const clear = useCallback(() => {
    setLeftInput("");
    setRightInput("");
    setResult(null);
  }, []);

  return {
    leftInput,
    setLeftInput,
    rightInput,
    setRightInput,
    result,
    compare,
    clear,
    isProcessing,
  };
}
