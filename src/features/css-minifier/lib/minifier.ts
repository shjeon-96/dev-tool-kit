export interface MinifyResult {
  success: boolean;
  output: string;
  error?: string;
  stats?: {
    originalSize: number;
    minifiedSize: number;
    savings: number;
    savingsPercent: number;
  };
}

export interface MinifyOptions {
  removeComments: boolean;
  removeWhitespace: boolean;
  removeEmptyRules: boolean;
  mergeSelectors: boolean;
  shortenColors: boolean;
  shortenZeros: boolean;
}

// Convert 6-digit hex to 3-digit if possible
function shortenHexColor(hex: string): string {
  const match = hex.match(/^#([0-9a-fA-F]{6})$/);
  if (!match) return hex;

  const [, color] = match;
  const r1 = color[0],
    r2 = color[1];
  const g1 = color[2],
    g2 = color[3];
  const b1 = color[4],
    b2 = color[5];

  if (r1 === r2 && g1 === g2 && b1 === b2) {
    return `#${r1}${g1}${b1}`;
  }
  return hex;
}

// Color name to shorter hex if possible
const colorMap: Record<string, string> = {
  white: "#fff",
  black: "#000",
  red: "red", // same length
  navy: "#000080",
  teal: "#008080",
  aqua: "#0ff",
  fuchsia: "#f0f",
  yellow: "#ff0",
  maroon: "#800000",
  olive: "#808000",
  lime: "#0f0",
  silver: "#c0c0c0",
  gray: "#808080",
  grey: "#808080",
  purple: "#800080",
};

export function minifyCss(css: string, options: MinifyOptions): MinifyResult {
  const originalSize = new Blob([css]).size;

  try {
    let result = css;

    // Remove comments
    if (options.removeComments) {
      result = result.replace(/\/\*[\s\S]*?\*\//g, "");
    }

    // Remove whitespace
    if (options.removeWhitespace) {
      // Remove newlines and multiple spaces
      result = result.replace(/\s+/g, " ");
      // Remove spaces around special characters
      result = result.replace(/\s*([{};:,>~+])\s*/g, "$1");
      // Remove space after ( and before )
      result = result.replace(/\(\s+/g, "(");
      result = result.replace(/\s+\)/g, ")");
      // Trim
      result = result.trim();
    }

    // Remove empty rules
    if (options.removeEmptyRules) {
      result = result.replace(/[^{}]+\{\s*\}/g, "");
    }

    // Shorten colors
    if (options.shortenColors) {
      // Shorten hex colors
      result = result.replace(/#[0-9a-fA-F]{6}/g, shortenHexColor);
      // Replace color names with shorter hex
      Object.entries(colorMap).forEach(([name, hex]) => {
        const regex = new RegExp(`\\b${name}\\b`, "gi");
        if (hex.length < name.length) {
          result = result.replace(regex, hex);
        }
      });
      // rgb to hex when possible
      result = result.replace(
        /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/gi,
        (_, r, g, b) => {
          const hex = `#${parseInt(r).toString(16).padStart(2, "0")}${parseInt(g).toString(16).padStart(2, "0")}${parseInt(b).toString(16).padStart(2, "0")}`;
          return shortenHexColor(hex);
        },
      );
    }

    // Shorten zeros
    if (options.shortenZeros) {
      // 0px, 0em, 0%, etc. to 0
      result = result.replace(
        /\b0(px|em|rem|%|pt|pc|in|cm|mm|ex|ch|vw|vh|vmin|vmax)\b/g,
        "0",
      );
      // 0.5 to .5
      result = result.replace(/\b0+(\.\d+)/g, "$1");
      // Remove trailing zeros in decimals
      result = result.replace(/(\.\d*?)0+([;\s}])/g, "$1$2");
      // Remove unnecessary decimal points
      result = result.replace(/(\d)\.([;\s}])/g, "$1$2");
    }

    // Final cleanup
    result = result.replace(/;}/g, "}");
    result = result.replace(/\s+/g, " ").trim();

    const minifiedSize = new Blob([result]).size;
    const savings = originalSize - minifiedSize;
    const savingsPercent =
      originalSize > 0 ? Math.round((savings / originalSize) * 100) : 0;

    return {
      success: true,
      output: result,
      stats: {
        originalSize,
        minifiedSize,
        savings,
        savingsPercent,
      },
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Minification failed",
    };
  }
}

export function beautifyCss(css: string): MinifyResult {
  try {
    let result = css;

    // Add newlines after { and ;
    result = result.replace(/\{/g, " {\n  ");
    result = result.replace(/;/g, ";\n  ");
    result = result.replace(/\}/g, "\n}\n\n");

    // Clean up multiple newlines
    result = result.replace(/\n\s*\n\s*\n/g, "\n\n");
    result = result.replace(/\n\s+}/g, "\n}");
    result = result.trim();

    return {
      success: true,
      output: result,
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Beautification failed",
    };
  }
}
