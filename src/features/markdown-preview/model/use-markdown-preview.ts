"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type MarkdownIt from "markdown-it";

const sampleMarkdown = `# Markdown Preview

## 기본 문법

**굵은 글씨** 와 *기울임 글씨* 를 사용할 수 있습니다.

### 목록

- 항목 1
- 항목 2
  - 하위 항목

1. 첫 번째
2. 두 번째

### 코드

인라인 \`코드\` 예시입니다.

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### 링크와 이미지

[GitHub](https://github.com)

### 인용문

> 이것은 인용문입니다.

### 표

| 이름 | 설명 |
|------|------|
| A | 첫 번째 |
| B | 두 번째 |
`;

const escapeHtml = (str: string) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export function useMarkdownPreview() {
  const [input, setInput] = useState(sampleMarkdown);
  const [renderedHtml, setRenderedHtml] = useState("");
  const mdRef = useRef<MarkdownIt | null>(null);

  // Dynamic import and render
  useEffect(() => {
    const renderMarkdown = async () => {
      if (!input.trim()) {
        setRenderedHtml("");
        return;
      }

      try {
        // Dynamic import markdown-it and highlight.js
        if (!mdRef.current) {
          const [MarkdownItModule, hljsModule] = await Promise.all([
            import("markdown-it"),
            import("highlight.js"),
          ]);

          const MarkdownItClass = MarkdownItModule.default;
          const hljs = hljsModule.default;

          mdRef.current = new MarkdownItClass({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str: string, lang: string) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(str, {
                      language: lang,
                      ignoreIllegals: true,
                    }).value +
                    "</code></pre>"
                  );
                } catch {
                  // Ignore highlighting errors
                }
              }
              return (
                '<pre class="hljs"><code>' + escapeHtml(str) + "</code></pre>"
              );
            },
          });
        }

        setRenderedHtml(mdRef.current.render(input));
      } catch {
        setRenderedHtml("<p>렌더링 오류가 발생했습니다.</p>");
      }
    };

    const debounceTimer = setTimeout(renderMarkdown, 150);
    return () => clearTimeout(debounceTimer);
  }, [input]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handleReset = useCallback(() => {
    setInput(sampleMarkdown);
  }, []);

  return {
    input,
    setInput,
    renderedHtml,
    copyToClipboard,
    handleClear,
    handleReset,
  };
}
