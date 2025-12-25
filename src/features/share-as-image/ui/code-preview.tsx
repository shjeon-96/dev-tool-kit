"use client";

import { forwardRef } from "react";
import { type ImageSettings, themes, backgrounds } from "../lib/types";

interface CodePreviewProps {
  code: string;
  settings: ImageSettings;
  detectedLanguage: string;
}

export const CodePreview = forwardRef<HTMLDivElement, CodePreviewProps>(
  function CodePreview({ code, settings, detectedLanguage }, ref) {
    const theme = themes[settings.theme];
    const background = backgrounds[settings.background];
    const lines = code.split("\n");

    return (
      <div
        ref={ref}
        className="inline-block"
        style={{
          background: background.value,
          padding: `${settings.paddingY}px ${settings.paddingX}px`,
        }}
      >
        <div
          className="overflow-hidden shadow-2xl"
          style={{
            backgroundColor: theme.background,
            borderRadius: settings.borderRadius,
          }}
        >
          {/* Window Controls */}
          {settings.showWindowControls && (
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ backgroundColor: theme.background }}
            >
              {/* macOS dots */}
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              {/* Window Title */}
              {settings.windowTitle && (
                <div
                  className="ml-4 text-xs"
                  style={{ color: theme.lineNumber }}
                >
                  {settings.windowTitle}
                </div>
              )}
            </div>
          )}

          {/* Code Content */}
          <div
            className="overflow-x-auto"
            style={{
              padding: "16px 20px",
              paddingTop: settings.showWindowControls ? "8px" : "16px",
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: settings.fontSize,
                lineHeight: settings.lineHeight,
                color: theme.color,
              }}
            >
              {lines.map((line, index) => (
                <div key={index} className="flex">
                  {/* Line Number */}
                  {settings.showLineNumbers && (
                    <span
                      className="mr-4 select-none text-right"
                      style={{
                        color: theme.lineNumber,
                        minWidth: `${String(lines.length).length}ch`,
                      }}
                    >
                      {index + 1}
                    </span>
                  )}
                  {/* Line Content */}
                  <code>
                    <HighlightedLine
                      line={line}
                      theme={theme}
                      language={detectedLanguage}
                    />
                  </code>
                </div>
              ))}
            </pre>
          </div>

          {/* Watermark */}
          {settings.watermark && (
            <div
              className="px-4 py-2 text-right text-xs"
              style={{ color: theme.lineNumber }}
            >
              web-toolkit.app
            </div>
          )}
        </div>
      </div>
    );
  },
);

interface HighlightedLineProps {
  line: string;
  theme: (typeof themes)[keyof typeof themes];
  language: string;
}

function HighlightedLine({ line, theme, language }: HighlightedLineProps) {
  // Simple syntax highlighting
  if (language === "plaintext" || !line.trim()) {
    return <>{line || " "}</>;
  }

  // Tokenize the line for basic highlighting
  const tokens = tokenize(line, language);

  return (
    <>
      {tokens.map((token, i) => (
        <span
          key={i}
          style={{
            color: getTokenColor(token.type, theme),
          }}
        >
          {token.value}
        </span>
      ))}
    </>
  );
}

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "operator"
  | "default";

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(line: string, language: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  const patterns: { regex: RegExp; type: TokenType }[] = [
    // Comments
    { regex: /^(\/\/.*|#.*)/, type: "comment" },
    { regex: /^(\/\*[\s\S]*?\*\/)/, type: "comment" },
    // Strings
    {
      regex:
        /^("[^"\\]*(\\.[^"\\]*)*"|'[^'\\]*(\\.[^'\\]*)*'|`[^`\\]*(\\.[^`\\]*)*`)/,
      type: "string",
    },
    // Numbers
    { regex: /^(\b\d+(\.\d+)?\b)/, type: "number" },
    // Keywords (common across languages)
    {
      regex:
        /^(\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|throw|new|this|true|false|null|undefined|def|print|elif|None|True|False|fn|pub|mut|struct|impl|use|mod|type|interface|extends|implements)\b)/,
      type: "keyword",
    },
    // Function calls
    { regex: /^(\w+)(?=\()/, type: "function" },
    // Operators
    { regex: /^([+\-*/%=<>!&|^~?:;,{}[\]()]+)/, type: "operator" },
    // Default (identifiers, whitespace, etc.)
    { regex: /^(\S+|\s+)/, type: "default" },
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const { regex, type } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        tokens.push({ type, value: match[0] });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Fallback: take one character
      tokens.push({ type: "default", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

function getTokenColor(
  type: TokenType,
  theme: (typeof themes)[keyof typeof themes],
): string {
  switch (type) {
    case "keyword":
      return theme.keyword;
    case "string":
      return theme.string;
    case "comment":
      return theme.comment;
    case "number":
      return theme.number;
    case "function":
      return theme.function;
    case "operator":
      return theme.operator;
    default:
      return theme.color;
  }
}
