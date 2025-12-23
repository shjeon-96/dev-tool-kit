/**
 * PDF Redaction Module
 * Uses pdfjs-dist for text extraction and pdf-lib for applying redactions
 */

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type {
  RedactPattern,
  RedactPatternConfig,
  RedactOptions,
  RedactMatch,
  RedactResult,
} from "./types";

// Pattern configurations
export const REDACT_PATTERNS: Record<RedactPattern, RedactPatternConfig> = {
  creditCard: {
    id: "creditCard",
    label: "Credit Card",
    description: "Visa, MasterCard, Amex, etc.",
    regex:
      /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b/g,
    enabled: true,
  },
  ssn: {
    id: "ssn",
    label: "SSN / 주민등록번호",
    description: "Social Security Number, Korean RRN",
    regex: /\b(?:\d{3}-\d{2}-\d{4}|\d{6}-[1-4]\d{6}|\d{2}-\d{7})\b/g,
    enabled: true,
  },
  phone: {
    id: "phone",
    label: "Phone Number",
    description: "Various phone formats",
    regex:
      /\b(?:\+?82[-.\s]?)?(?:0?1[0-9]|02|0[3-9][0-9])[-.\s]?\d{3,4}[-.\s]?\d{4}\b|\b\d{3}[-.\s]?\d{3,4}[-.\s]?\d{4}\b/g,
    enabled: false,
  },
  email: {
    id: "email",
    label: "Email Address",
    description: "Email addresses",
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    enabled: false,
  },
  custom: {
    id: "custom",
    label: "Custom Keywords",
    description: "User-defined keywords",
    regex: /.*/g, // Will be replaced with custom keywords
    enabled: false,
  },
};

// Color mapping
const COLOR_MAP = {
  black: rgb(0, 0, 0),
  white: rgb(1, 1, 1),
  gray: rgb(0.5, 0.5, 0.5),
};

/**
 * Extract text items with positions from PDF using pdfjs-dist
 */
async function extractTextWithPositions(pdfData: ArrayBuffer): Promise<
  Array<{
    pageIndex: number;
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>
> {
  // Dynamic import to handle SSR
  const pdfjsLib = await import("pdfjs-dist");

  // Set worker path
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const textItems: Array<{
    pageIndex: number;
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }> = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.0 });

    for (const item of textContent.items) {
      // Type guard for text items
      if ("str" in item && "transform" in item) {
        const str = item.str;
        if (!str.trim()) continue;

        // Transform matrix: [scaleX, skewX, skewY, scaleY, translateX, translateY]
        const transform = item.transform;
        const x = transform[4];
        // PDF coordinates are from bottom-left, convert to top-left
        const y = viewport.height - transform[5];
        const width = item.width || str.length * 6; // Estimate width
        const height = Math.abs(transform[3]) || 12; // Font size

        textItems.push({
          pageIndex: pageNum - 1,
          text: str,
          x,
          y,
          width,
          height,
        });
      }
    }
  }

  return textItems;
}

/**
 * Find matches for sensitive data patterns
 */
function findMatches(
  textItems: Array<{
    pageIndex: number;
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>,
  options: RedactOptions,
): RedactMatch[] {
  const matches: RedactMatch[] = [];

  // Build combined text per page to find patterns that span multiple items
  const pageTexts: Map<
    number,
    Array<{ text: string; x: number; y: number; width: number; height: number }>
  > = new Map();

  for (const item of textItems) {
    if (!pageTexts.has(item.pageIndex)) {
      pageTexts.set(item.pageIndex, []);
    }
    pageTexts.get(item.pageIndex)!.push(item);
  }

  for (const [pageIndex, items] of pageTexts) {
    const fullText = items.map((i) => i.text).join(" ");

    for (const patternId of options.patterns) {
      if (patternId === "custom") continue; // Handle custom separately

      const config = REDACT_PATTERNS[patternId];
      const regex = new RegExp(config.regex.source, "g");
      let match: RegExpExecArray | null;

      while ((match = regex.exec(fullText)) !== null) {
        // Find the text item(s) that contain this match
        const matchText = match[0];
        let charIndex = 0;

        for (const item of items) {
          const itemEnd = charIndex + item.text.length + 1; // +1 for space

          if (
            match.index >= charIndex &&
            match.index < itemEnd &&
            item.text.includes(matchText.split(" ")[0])
          ) {
            matches.push({
              pageIndex,
              text: matchText,
              pattern: patternId,
              x: item.x,
              y: item.y,
              width: Math.max(item.width, matchText.length * 6),
              height: item.height,
            });
            break;
          }
          charIndex = itemEnd;
        }
      }
    }

    // Handle custom keywords
    if (
      options.patterns.includes("custom") &&
      options.customKeywords.length > 0
    ) {
      for (const keyword of options.customKeywords) {
        if (!keyword.trim()) continue;

        const regex = new RegExp(
          keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "gi",
        );
        let match: RegExpExecArray | null;

        while ((match = regex.exec(fullText)) !== null) {
          let charIndex = 0;
          for (const item of items) {
            const itemEnd = charIndex + item.text.length + 1;

            if (item.text.toLowerCase().includes(keyword.toLowerCase())) {
              matches.push({
                pageIndex,
                text: match[0],
                pattern: "custom",
                x: item.x,
                y: item.y,
                width: Math.max(item.width, match[0].length * 6),
                height: item.height,
              });
              break;
            }
            charIndex = itemEnd;
          }
        }
      }
    }
  }

  return matches;
}

/**
 * Apply redactions to PDF
 */
export async function redactPDF(
  file: File,
  options: RedactOptions,
  onProgress?: (progress: number) => void,
): Promise<RedactResult> {
  try {
    onProgress?.(10);

    // Read file
    const arrayBuffer = await file.arrayBuffer();
    onProgress?.(20);

    // Extract text with positions
    const textItems = await extractTextWithPositions(arrayBuffer);
    onProgress?.(40);

    // Find matches
    const matches = findMatches(textItems, options);
    onProgress?.(50);

    if (matches.length === 0) {
      return {
        success: true,
        matchCount: 0,
        pagesAffected: 0,
      };
    }

    // Load PDF with pdf-lib
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    onProgress?.(60);

    // Apply redactions
    const color = COLOR_MAP[options.redactColor];
    const affectedPages = new Set<number>();

    for (const match of matches) {
      if (match.pageIndex >= pages.length) continue;

      const page = pages[match.pageIndex];
      const { height: pageHeight } = page.getSize();

      // Convert coordinates (pdfjs uses top-left, pdf-lib uses bottom-left)
      const y = pageHeight - match.y;

      // Draw redaction rectangle
      page.drawRectangle({
        x: match.x - 2,
        y: y - 2,
        width: match.width + 4,
        height: match.height + 4,
        color,
      });

      affectedPages.add(match.pageIndex);
    }

    onProgress?.(80);

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    onProgress?.(100);

    return {
      success: true,
      matchCount: matches.length,
      pagesAffected: affectedPages.size,
      data: pdfBytes,
    };
  } catch (error) {
    console.error("Redaction error:", error);
    return {
      success: false,
      matchCount: 0,
      pagesAffected: 0,
      error: error instanceof Error ? error.message : "Failed to redact PDF",
    };
  }
}

/**
 * Scan PDF for sensitive data (preview without redacting)
 */
export async function scanPDF(
  file: File,
  options: RedactOptions,
): Promise<{ matches: RedactMatch[]; error?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const textItems = await extractTextWithPositions(arrayBuffer);
    const matches = findMatches(textItems, options);
    return { matches };
  } catch (error) {
    console.error("Scan error:", error);
    return {
      matches: [],
      error: error instanceof Error ? error.message : "Failed to scan PDF",
    };
  }
}
