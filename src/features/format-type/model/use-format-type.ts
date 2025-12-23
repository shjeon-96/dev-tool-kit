"use client";

import { useState, useCallback } from "react";
import type { FormatType } from "@/entities/format-type";

interface UseFormatTypeReturn {
  input: string;
  setInput: (value: string) => void;
  output: string;
  mode: "beautify" | "minify";
  setMode: (mode: "beautify" | "minify") => void;
  format: () => void;
  clear: () => void;
  isProcessing: boolean;
  error: string | null;
  indentSize: number;
  setIndentSize: (size: number) => void;
}

export function useFormatType(formatType: FormatType): UseFormatTypeReturn {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = useCallback(
    (text: string, beautify: boolean): string => {
      const parsed = JSON.parse(text);
      return beautify
        ? JSON.stringify(parsed, null, indentSize)
        : JSON.stringify(parsed);
    },
    [indentSize],
  );

  const formatXml = useCallback(
    (text: string, beautify: boolean): string => {
      if (!beautify) {
        return text.replace(/>\s+</g, "><").trim();
      }

      let formatted = "";
      let indent = 0;
      const indentStr = " ".repeat(indentSize);

      text.split(/>\s*</).forEach((node, index) => {
        if (index > 0) {
          node = "<" + node;
        }
        if (index < text.split(/>\s*</).length - 1) {
          node = node + ">";
        }

        if (node.match(/^<\//)) {
          indent = Math.max(0, indent - 1);
        }

        formatted += indentStr.repeat(indent) + node.trim() + "\n";

        if (
          node.match(/^<[^/]/) &&
          !node.match(/\/>/) &&
          !node.match(/<.*>.*<\//)
        ) {
          indent++;
        }
      });

      return formatted.trim();
    },
    [indentSize],
  );

  const formatCss = useCallback(
    (text: string, beautify: boolean): string => {
      if (!beautify) {
        return text
          .replace(/\s+/g, " ")
          .replace(/\s*{\s*/g, "{")
          .replace(/\s*}\s*/g, "}")
          .replace(/\s*;\s*/g, ";")
          .replace(/\s*:\s*/g, ":")
          .trim();
      }

      const indentStr = " ".repeat(indentSize);
      let formatted = "";
      let indent = 0;

      text.split("").forEach((char) => {
        if (char === "{") {
          formatted += " {\n";
          indent++;
        } else if (char === "}") {
          indent = Math.max(0, indent - 1);
          formatted += indentStr.repeat(indent) + "}\n";
        } else if (char === ";") {
          formatted += ";\n" + indentStr.repeat(indent);
        } else if (char === "\n" || char === "\r") {
          // skip
        } else {
          formatted += char;
        }
      });

      return formatted
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line)
        .map((line, i, arr) => {
          if (line.endsWith("{")) return line;
          if (line === "}") return line;
          if (i < arr.length - 1 && !arr[i + 1].startsWith("}")) {
            return indentStr + line;
          }
          return line;
        })
        .join("\n");
    },
    [indentSize],
  );

  const formatSql = useCallback((text: string, beautify: boolean): string => {
    if (!beautify) {
      return text.replace(/\s+/g, " ").trim();
    }

    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
      "OR",
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "OUTER JOIN",
      "ON",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE FROM",
      "CREATE TABLE",
      "ALTER TABLE",
      "DROP TABLE",
      "LIMIT",
      "OFFSET",
      "UNION",
      "CASE",
      "WHEN",
      "THEN",
      "ELSE",
      "END",
    ];

    let formatted = text.replace(/\s+/g, " ").trim();

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formatted = formatted.replace(regex, `\n${keyword.toUpperCase()}`);
    });

    return formatted
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)
      .join("\n");
  }, []);

  const formatHtml = useCallback(
    (text: string, beautify: boolean): string => {
      if (!beautify) {
        return text.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
      }

      const indentStr = " ".repeat(indentSize);
      let formatted = "";
      let indent = 0;

      // 간단한 HTML 포맷팅
      const tags = text.match(/<[^>]+>|[^<]+/g) || [];

      tags.forEach((tag) => {
        const trimmedTag = tag.trim();
        if (!trimmedTag) return;

        if (trimmedTag.startsWith("</")) {
          indent = Math.max(0, indent - 1);
          formatted += indentStr.repeat(indent) + trimmedTag + "\n";
        } else if (
          trimmedTag.startsWith("<") &&
          !trimmedTag.endsWith("/>") &&
          !trimmedTag.match(/<(br|hr|img|input|meta|link)/i)
        ) {
          formatted += indentStr.repeat(indent) + trimmedTag + "\n";
          indent++;
        } else if (trimmedTag.startsWith("<")) {
          formatted += indentStr.repeat(indent) + trimmedTag + "\n";
        } else {
          formatted += indentStr.repeat(indent) + trimmedTag + "\n";
        }
      });

      return formatted.trim();
    },
    [indentSize],
  );

  const formatYaml = useCallback((text: string, beautify: boolean): string => {
    // YAML은 이미 사람이 읽기 쉬운 형식이므로 기본적인 정리만 수행
    if (!beautify) {
      return text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .join(" ");
    }

    return text
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .trim();
  }, []);

  const formatMarkdown = useCallback(
    (text: string, beautify: boolean): string => {
      if (!beautify) {
        return text.replace(/\n{3,}/g, "\n\n").trim();
      }

      // 마크다운 정리
      return text
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    },
    [],
  );

  const formatGeneric = useCallback(
    (text: string, beautify: boolean): string => {
      if (!beautify) {
        return text.replace(/\s+/g, " ").trim();
      }
      return text
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n")
        .trim();
    },
    [],
  );

  const format = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let result: string;
      const beautify = mode === "beautify";

      switch (formatType.slug) {
        case "json":
          result = formatJson(input, beautify);
          break;
        case "xml":
          result = formatXml(input, beautify);
          break;
        case "css":
          result = formatCss(input, beautify);
          break;
        case "sql":
          result = formatSql(input, beautify);
          break;
        case "html":
          result = formatHtml(input, beautify);
          break;
        case "yaml":
          result = formatYaml(input, beautify);
          break;
        case "markdown":
          result = formatMarkdown(input, beautify);
          break;
        case "javascript":
        case "typescript":
          // JS/TS는 JSON과 유사한 방식으로 처리 시도
          try {
            result = formatJson(input, beautify);
          } catch {
            result = formatGeneric(input, beautify);
          }
          break;
        default:
          result = formatGeneric(input, beautify);
      }

      setOutput(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while formatting",
      );
      setOutput("");
    } finally {
      setIsProcessing(false);
    }
  }, [
    input,
    mode,
    formatType.slug,
    formatJson,
    formatXml,
    formatCss,
    formatSql,
    formatHtml,
    formatYaml,
    formatMarkdown,
    formatGeneric,
  ]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  return {
    input,
    setInput,
    output,
    mode,
    setMode,
    format,
    clear,
    isProcessing,
    error,
    indentSize,
    setIndentSize,
  };
}
