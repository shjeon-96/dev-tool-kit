import { toPng, toJpeg, toSvg } from "html-to-image";
import type { ExportFormat } from "./types";

export interface ExportOptions {
  format: ExportFormat;
  scale: number;
  filename?: string;
}

export async function exportToImage(
  element: HTMLElement,
  options: ExportOptions,
): Promise<Blob> {
  const { format, scale } = options;

  const pixelRatio = scale;

  const exportFn = {
    png: toPng,
    jpeg: toJpeg,
    svg: toSvg,
  }[format];

  const dataUrl = await exportFn(element, {
    pixelRatio,
    quality: format === "jpeg" ? 0.95 : undefined,
    backgroundColor: format === "jpeg" ? "#ffffff" : undefined,
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
    },
  });

  if (format === "svg") {
    // SVG returns a data URL, convert to blob
    const svgContent = dataUrl.replace("data:image/svg+xml;charset=utf-8,", "");
    return new Blob([decodeURIComponent(svgContent)], {
      type: "image/svg+xml",
    });
  }

  // Convert data URL to blob
  const response = await fetch(dataUrl);
  return response.blob();
}

export async function downloadImage(
  element: HTMLElement,
  options: ExportOptions,
): Promise<void> {
  const blob = await exportToImage(element, options);
  const url = URL.createObjectURL(blob);

  const extension = options.format === "jpeg" ? "jpg" : options.format;
  const filename = options.filename || `code-${Date.now()}.${extension}`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export async function copyImageToClipboard(
  element: HTMLElement,
  scale: number = 2,
): Promise<boolean> {
  try {
    const blob = await exportToImage(element, { format: "png", scale });

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);

    return true;
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
    return false;
  }
}

export function detectLanguage(code: string): string {
  // Simple language detection based on patterns
  const patterns: { lang: string; regex: RegExp }[] = [
    { lang: "json", regex: /^\s*[{[]/ },
    { lang: "html", regex: /<(!DOCTYPE|html|head|body|div|span)/i },
    { lang: "css", regex: /[.#][\w-]+\s*\{|@(media|import|keyframes)/ },
    {
      lang: "python",
      regex: /(def |import |from .+ import|class .+:|if __name__)/,
    },
    { lang: "bash", regex: /^(#!\/bin\/|npm |yarn |pnpm |git |curl |wget )/m },
    { lang: "sql", regex: /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP)\b/i },
    {
      lang: "typescript",
      regex: /:\s*(string|number|boolean|any)\b|interface\s+\w+|type\s+\w+\s*=/,
    },
    {
      lang: "javascript",
      regex:
        /(const|let|var)\s+\w+\s*=|function\s+\w+|=>|require\(|export\s+(default\s+)?/,
    },
    { lang: "go", regex: /^package\s+\w+|func\s+\w+\(|import\s+"/ },
    { lang: "rust", regex: /fn\s+\w+\(|let\s+mut\s+|impl\s+\w+|use\s+\w+::/ },
  ];

  for (const { lang, regex } of patterns) {
    if (regex.test(code)) {
      return lang;
    }
  }

  return "plaintext";
}
