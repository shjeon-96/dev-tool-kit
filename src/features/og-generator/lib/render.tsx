/**
 * OG Image Renderer
 * Uses Satori for SVG generation and resvg-wasm for PNG conversion
 */

import satori from "satori";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import type { OGImageConfig, FontFamily } from "./types";
import { FONT_CONFIGS } from "./types";

// WASM initialization state
let wasmInitialized = false;

/**
 * Initialize resvg WASM module
 */
async function initResvg(): Promise<void> {
  if (wasmInitialized) return;

  try {
    const wasmUrl = "https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm";
    const response = await fetch(wasmUrl);
    const wasmBuffer = await response.arrayBuffer();
    await initWasm(wasmBuffer);
    wasmInitialized = true;
  } catch (error) {
    // Already initialized or error
    if (
      error instanceof Error &&
      error.message.includes("already been initialized")
    ) {
      wasmInitialized = true;
    } else {
      throw error;
    }
  }
}

/**
 * Font cache to avoid re-fetching
 */
const fontCache = new Map<FontFamily, ArrayBuffer>();

/**
 * Load font data
 */
async function loadFont(fontFamily: FontFamily): Promise<ArrayBuffer> {
  if (fontCache.has(fontFamily)) {
    return fontCache.get(fontFamily)!;
  }

  const fontConfig = FONT_CONFIGS[fontFamily];
  const response = await fetch(fontConfig.url);
  const fontData = await response.arrayBuffer();

  fontCache.set(fontFamily, fontData);
  return fontData;
}

/**
 * Generate gradient background style
 */
function getBackgroundStyle(config: OGImageConfig): React.CSSProperties {
  const {
    template,
    backgroundColor,
    gradientFrom,
    gradientTo,
    gradientDirection,
  } = config;

  if (template === "gradient" || template === "blog" || template === "social") {
    const directionMap: Record<string, string> = {
      "to-r": "to right",
      "to-l": "to left",
      "to-t": "to top",
      "to-b": "to bottom",
      "to-tr": "to top right",
      "to-tl": "to top left",
      "to-br": "to bottom right",
      "to-bl": "to bottom left",
    };

    const direction = directionMap[gradientDirection || "to-br"];
    return {
      background: `linear-gradient(${direction}, ${gradientFrom}, ${gradientTo})`,
    };
  }

  return { backgroundColor };
}

/**
 * Build the React element for Satori
 */
function buildOGElement(config: OGImageConfig): React.ReactElement {
  const {
    title,
    subtitle,
    author,
    siteName,
    textColor,
    accentColor,
    titleFontSize,
    subtitleFontSize,
    textAlign,
    width,
    height,
    showBorder,
    borderColor,
    borderRadius,
    template,
  } = config;

  const backgroundStyle = getBackgroundStyle(config);
  const alignItems =
    textAlign === "center"
      ? "center"
      : textAlign === "right"
        ? "flex-end"
        : "flex-start";

  // Base container style
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: template === "minimal" ? "60px" : "80px",
    justifyContent: "center",
    alignItems,
    ...backgroundStyle,
    ...(showBorder
      ? {
          border: `4px solid ${borderColor || "#e5e5e5"}`,
          borderRadius: borderRadius || 0,
        }
      : {}),
  };

  // Build elements based on template
  const elements: React.ReactElement[] = [];

  // Site name (for blog template)
  if (siteName && (template === "blog" || template === "product")) {
    elements.push(
      <div
        key="siteName"
        style={{
          display: "flex",
          fontSize: 24,
          color: accentColor || textColor,
          marginBottom: 20,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {siteName}
      </div>,
    );
  }

  // Title
  elements.push(
    <div
      key="title"
      style={{
        display: "flex",
        fontSize: titleFontSize,
        fontWeight: 700,
        color: textColor,
        lineHeight: 1.2,
        textAlign,
        maxWidth: "100%",
        wordBreak: "break-word",
      }}
    >
      {title}
    </div>,
  );

  // Subtitle
  if (subtitle) {
    elements.push(
      <div
        key="subtitle"
        style={{
          display: "flex",
          fontSize: subtitleFontSize,
          color: textColor,
          opacity: 0.9,
          marginTop: 20,
          textAlign,
          maxWidth: "100%",
        }}
      >
        {subtitle}
      </div>,
    );
  }

  // Author (for blog template)
  if (author && template === "blog") {
    elements.push(
      <div
        key="author"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 40,
          fontSize: 24,
          color: textColor,
          opacity: 0.8,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: accentColor || textColor,
            marginRight: 16,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: textColor === "#ffffff" ? "#1a1a2e" : "#ffffff",
          }}
        >
          {author.charAt(0).toUpperCase()}
        </div>
        {author}
      </div>,
    );
  }

  return (<div style={containerStyle}>{elements}</div>) as React.ReactElement;
}

/**
 * Render OG image to SVG
 */
export async function renderToSVG(config: OGImageConfig): Promise<string> {
  const fontData = await loadFont(config.fontFamily);
  const fontConfig = FONT_CONFIGS[config.fontFamily];

  const svg = await satori(buildOGElement(config), {
    width: config.width,
    height: config.height,
    fonts: [
      {
        name: fontConfig.name,
        data: fontData,
        weight: fontConfig.weight as
          | 100
          | 200
          | 300
          | 400
          | 500
          | 600
          | 700
          | 800
          | 900,
        style: "normal",
      },
    ],
  });

  return svg;
}

/**
 * Render OG image to PNG
 */
export async function renderToPNG(config: OGImageConfig): Promise<Uint8Array> {
  await initResvg();

  const svg = await renderToSVG(config);

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: config.width,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}

/**
 * Render OG image to data URL
 */
export async function renderToDataURL(config: OGImageConfig): Promise<string> {
  const pngData = await renderToPNG(config);
  const base64 = btoa(
    Array.from(pngData)
      .map((byte) => String.fromCharCode(byte))
      .join(""),
  );
  return `data:image/png;base64,${base64}`;
}

/**
 * Download the rendered image
 */
export function downloadImage(
  dataUrl: string,
  filename: string = "og-image.png",
): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
