"use client";

import { useState, useCallback, useMemo } from "react";

interface ConversionResult {
  tailwind: string;
  unsupported: string[];
}

// CSS to Tailwind mapping
const cssToTailwindMap: Record<string, (value: string) => string | null> = {
  // Display
  display: (v) => {
    const map: Record<string, string> = {
      block: "block",
      "inline-block": "inline-block",
      inline: "inline",
      flex: "flex",
      "inline-flex": "inline-flex",
      grid: "grid",
      "inline-grid": "inline-grid",
      hidden: "hidden",
      none: "hidden",
    };
    return map[v] || null;
  },

  // Position
  position: (v) => {
    const map: Record<string, string> = {
      static: "static",
      fixed: "fixed",
      absolute: "absolute",
      relative: "relative",
      sticky: "sticky",
    };
    return map[v] || null;
  },

  // Flexbox
  "flex-direction": (v) => {
    const map: Record<string, string> = {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
    };
    return map[v] || null;
  },
  "flex-wrap": (v) => {
    const map: Record<string, string> = {
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
      nowrap: "flex-nowrap",
    };
    return map[v] || null;
  },
  "justify-content": (v) => {
    const map: Record<string, string> = {
      "flex-start": "justify-start",
      "flex-end": "justify-end",
      center: "justify-center",
      "space-between": "justify-between",
      "space-around": "justify-around",
      "space-evenly": "justify-evenly",
    };
    return map[v] || null;
  },
  "align-items": (v) => {
    const map: Record<string, string> = {
      "flex-start": "items-start",
      "flex-end": "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    };
    return map[v] || null;
  },
  gap: (v) => {
    const size = parseSize(v);
    return size ? `gap-${size}` : null;
  },

  // Sizing
  width: (v) => {
    if (v === "100%") return "w-full";
    if (v === "100vw") return "w-screen";
    if (v === "auto") return "w-auto";
    if (v === "fit-content") return "w-fit";
    if (v === "max-content") return "w-max";
    if (v === "min-content") return "w-min";
    const size = parseSize(v);
    return size ? `w-${size}` : null;
  },
  height: (v) => {
    if (v === "100%") return "h-full";
    if (v === "100vh") return "h-screen";
    if (v === "auto") return "h-auto";
    if (v === "fit-content") return "h-fit";
    const size = parseSize(v);
    return size ? `h-${size}` : null;
  },
  "max-width": (v) => {
    if (v === "100%") return "max-w-full";
    if (v === "none") return "max-w-none";
    const size = parseSize(v);
    return size ? `max-w-${size}` : null;
  },
  "min-width": (v) => {
    if (v === "0") return "min-w-0";
    if (v === "100%") return "min-w-full";
    const size = parseSize(v);
    return size ? `min-w-${size}` : null;
  },

  // Spacing
  margin: (v) => {
    if (v === "auto") return "m-auto";
    if (v === "0") return "m-0";
    const size = parseSize(v);
    return size ? `m-${size}` : null;
  },
  "margin-top": (v) => {
    if (v === "auto") return "mt-auto";
    const size = parseSize(v);
    return size ? `mt-${size}` : null;
  },
  "margin-right": (v) => {
    if (v === "auto") return "mr-auto";
    const size = parseSize(v);
    return size ? `mr-${size}` : null;
  },
  "margin-bottom": (v) => {
    if (v === "auto") return "mb-auto";
    const size = parseSize(v);
    return size ? `mb-${size}` : null;
  },
  "margin-left": (v) => {
    if (v === "auto") return "ml-auto";
    const size = parseSize(v);
    return size ? `ml-${size}` : null;
  },
  padding: (v) => {
    if (v === "0") return "p-0";
    const size = parseSize(v);
    return size ? `p-${size}` : null;
  },
  "padding-top": (v) => {
    const size = parseSize(v);
    return size ? `pt-${size}` : null;
  },
  "padding-right": (v) => {
    const size = parseSize(v);
    return size ? `pr-${size}` : null;
  },
  "padding-bottom": (v) => {
    const size = parseSize(v);
    return size ? `pb-${size}` : null;
  },
  "padding-left": (v) => {
    const size = parseSize(v);
    return size ? `pl-${size}` : null;
  },

  // Typography
  "font-size": (v) => {
    const map: Record<string, string> = {
      "12px": "text-xs",
      "14px": "text-sm",
      "16px": "text-base",
      "18px": "text-lg",
      "20px": "text-xl",
      "24px": "text-2xl",
      "30px": "text-3xl",
      "36px": "text-4xl",
      "48px": "text-5xl",
      "60px": "text-6xl",
      "0.75rem": "text-xs",
      "0.875rem": "text-sm",
      "1rem": "text-base",
      "1.125rem": "text-lg",
      "1.25rem": "text-xl",
      "1.5rem": "text-2xl",
    };
    return map[v] || null;
  },
  "font-weight": (v) => {
    const map: Record<string, string> = {
      "100": "font-thin",
      "200": "font-extralight",
      "300": "font-light",
      "400": "font-normal",
      "500": "font-medium",
      "600": "font-semibold",
      "700": "font-bold",
      "800": "font-extrabold",
      "900": "font-black",
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };
    return map[v] || null;
  },
  "text-align": (v) => {
    const map: Record<string, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };
    return map[v] || null;
  },
  "text-decoration": (v) => {
    const map: Record<string, string> = {
      underline: "underline",
      "line-through": "line-through",
      none: "no-underline",
    };
    return map[v] || null;
  },
  "text-transform": (v) => {
    const map: Record<string, string> = {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      none: "normal-case",
    };
    return map[v] || null;
  },

  // Colors (simplified - only common patterns)
  color: (v) => {
    if (v === "white" || v === "#fff" || v === "#ffffff") return "text-white";
    if (v === "black" || v === "#000" || v === "#000000") return "text-black";
    if (v === "transparent") return "text-transparent";
    if (v === "inherit") return "text-inherit";
    return null;
  },
  "background-color": (v) => {
    if (v === "white" || v === "#fff" || v === "#ffffff") return "bg-white";
    if (v === "black" || v === "#000" || v === "#000000") return "bg-black";
    if (v === "transparent") return "bg-transparent";
    return null;
  },

  // Border
  "border-radius": (v) => {
    const map: Record<string, string> = {
      "0": "rounded-none",
      "2px": "rounded-sm",
      "4px": "rounded",
      "6px": "rounded-md",
      "8px": "rounded-lg",
      "12px": "rounded-xl",
      "16px": "rounded-2xl",
      "24px": "rounded-3xl",
      "9999px": "rounded-full",
      "50%": "rounded-full",
    };
    return map[v] || null;
  },
  "border-width": (v) => {
    const map: Record<string, string> = {
      "0": "border-0",
      "1px": "border",
      "2px": "border-2",
      "4px": "border-4",
      "8px": "border-8",
    };
    return map[v] || null;
  },

  // Effects
  opacity: (v) => {
    const num = parseFloat(v);
    if (isNaN(num)) return null;
    const percent = Math.round(num * 100);
    const map: Record<number, string> = {
      0: "opacity-0",
      5: "opacity-5",
      10: "opacity-10",
      20: "opacity-20",
      25: "opacity-25",
      30: "opacity-30",
      40: "opacity-40",
      50: "opacity-50",
      60: "opacity-60",
      70: "opacity-70",
      75: "opacity-75",
      80: "opacity-80",
      90: "opacity-90",
      95: "opacity-95",
      100: "opacity-100",
    };
    return map[percent] || null;
  },

  // Overflow
  overflow: (v) => {
    const map: Record<string, string> = {
      auto: "overflow-auto",
      hidden: "overflow-hidden",
      visible: "overflow-visible",
      scroll: "overflow-scroll",
    };
    return map[v] || null;
  },
  "overflow-x": (v) => {
    const map: Record<string, string> = {
      auto: "overflow-x-auto",
      hidden: "overflow-x-hidden",
      visible: "overflow-x-visible",
      scroll: "overflow-x-scroll",
    };
    return map[v] || null;
  },
  "overflow-y": (v) => {
    const map: Record<string, string> = {
      auto: "overflow-y-auto",
      hidden: "overflow-y-hidden",
      visible: "overflow-y-visible",
      scroll: "overflow-y-scroll",
    };
    return map[v] || null;
  },

  // Cursor
  cursor: (v) => {
    const map: Record<string, string> = {
      auto: "cursor-auto",
      default: "cursor-default",
      pointer: "cursor-pointer",
      wait: "cursor-wait",
      text: "cursor-text",
      move: "cursor-move",
      "not-allowed": "cursor-not-allowed",
    };
    return map[v] || null;
  },

  // Z-index
  "z-index": (v) => {
    const map: Record<string, string> = {
      "0": "z-0",
      "10": "z-10",
      "20": "z-20",
      "30": "z-30",
      "40": "z-40",
      "50": "z-50",
      auto: "z-auto",
    };
    return map[v] || null;
  },
};

function parseSize(value: string): string | null {
  // Remove units and try to match to Tailwind spacing scale
  const num = parseFloat(value);
  if (isNaN(num)) return null;

  // px values
  if (value.endsWith("px")) {
    const pxMap: Record<number, string> = {
      0: "0",
      1: "px",
      2: "0.5",
      4: "1",
      6: "1.5",
      8: "2",
      10: "2.5",
      12: "3",
      14: "3.5",
      16: "4",
      20: "5",
      24: "6",
      28: "7",
      32: "8",
      36: "9",
      40: "10",
      44: "11",
      48: "12",
      56: "14",
      64: "16",
      80: "20",
      96: "24",
      112: "28",
      128: "32",
      144: "36",
      160: "40",
      176: "44",
      192: "48",
      208: "52",
      224: "56",
      240: "60",
      256: "64",
      288: "72",
      320: "80",
      384: "96",
    };
    return pxMap[num] || null;
  }

  // rem values
  if (value.endsWith("rem")) {
    const remMap: Record<number, string> = {
      0: "0",
      0.25: "1",
      0.5: "2",
      0.75: "3",
      1: "4",
      1.25: "5",
      1.5: "6",
      1.75: "7",
      2: "8",
      2.5: "10",
      3: "12",
      3.5: "14",
      4: "16",
      5: "20",
      6: "24",
    };
    return remMap[num] || null;
  }

  return null;
}

function parseCss(css: string): Array<{ property: string; value: string }> {
  const rules: Array<{ property: string; value: string }> = [];

  // Remove comments
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "");

  // Extract declarations (handling both with and without selectors)
  const declarationRegex = /([a-z-]+)\s*:\s*([^;{}]+)/gi;
  let match;

  while ((match = declarationRegex.exec(cleaned)) !== null) {
    rules.push({
      property: match[1].trim().toLowerCase(),
      value: match[2].trim(),
    });
  }

  return rules;
}

export function useCssToTailwind() {
  const [inputCss, setInputCss] = useState("");

  const result = useMemo((): ConversionResult => {
    if (!inputCss.trim()) {
      return { tailwind: "", unsupported: [] };
    }

    const rules = parseCss(inputCss);
    const tailwindClasses: string[] = [];
    const unsupported: string[] = [];

    for (const rule of rules) {
      const converter = cssToTailwindMap[rule.property];
      if (converter) {
        const tailwindClass = converter(rule.value);
        if (tailwindClass) {
          tailwindClasses.push(tailwindClass);
        } else {
          unsupported.push(`${rule.property}: ${rule.value}`);
        }
      } else {
        unsupported.push(`${rule.property}: ${rule.value}`);
      }
    }

    return {
      tailwind: tailwindClasses.join(" "),
      unsupported,
    };
  }, [inputCss]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setInputCss("");
  }, []);

  const exampleCss = `.example {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}`;

  const loadExample = useCallback(() => {
    setInputCss(exampleCss);
  }, [exampleCss]);

  return {
    inputCss,
    setInputCss,
    result,
    copyToClipboard,
    reset,
    loadExample,
  };
}
