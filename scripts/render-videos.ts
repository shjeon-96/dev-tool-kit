/**
 * Remotion Video Render Script
 *
 * Usage:
 *   npx tsx scripts/render-videos.ts [tool-slug] [composition-id]
 *
 * Examples:
 *   npx tsx scripts/render-videos.ts                    # Render all tools
 *   npx tsx scripts/render-videos.ts json-formatter     # Render specific tool
 *   npx tsx scripts/render-videos.ts json-formatter ToolDemoSquare  # Specific format
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// Configuration
// ============================================

const OUTPUT_DIR = path.join(__dirname, "../public/videos");
const REMOTION_ENTRY = path.join(__dirname, "../src/remotion/index.tsx");

// 도구별 비디오 테마
const TOOL_CONFIGS: Record<
  string,
  {
    toolName: string;
    toolDescription: string;
    primaryColor: string;
    secondaryColor: string;
    iconText: string;
    inputExample: string;
    outputExample: string;
  }
> = {
  "json-formatter": {
    toolName: "JSON Formatter",
    toolDescription: "Format and validate JSON instantly",
    primaryColor: "#f59e0b",
    secondaryColor: "#fbbf24",
    iconText: "{ }",
    inputExample: '{"name":"DevToolkit","version":"1.0","active":true}',
    outputExample: `{
  "name": "DevToolkit",
  "version": "1.0",
  "active": true
}`,
  },
  "hash-generator": {
    toolName: "Hash Generator",
    toolDescription: "Generate secure hashes instantly",
    primaryColor: "#8b5cf6",
    secondaryColor: "#a78bfa",
    iconText: "#",
    inputExample: "Hello, World!",
    outputExample: "dffd6021bb2bd5b0af676290809ec3a5...",
  },
  "jwt-decoder": {
    toolName: "JWT Decoder",
    toolDescription: "Decode and inspect JWT tokens",
    primaryColor: "#ec4899",
    secondaryColor: "#f472b6",
    iconText: "JWT",
    inputExample: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    outputExample: `{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`,
  },
  "base64-converter": {
    toolName: "Base64 Converter",
    toolDescription: "Encode and decode Base64",
    primaryColor: "#06b6d4",
    secondaryColor: "#22d3ee",
    iconText: "B64",
    inputExample: "Hello, DevToolkit!",
    outputExample: "SGVsbG8sIERldlRvb2xraXQh",
  },
  "uuid-generator": {
    toolName: "UUID Generator",
    toolDescription: "Generate unique identifiers",
    primaryColor: "#10b981",
    secondaryColor: "#34d399",
    iconText: "UUID",
    inputExample: "Click Generate",
    outputExample: "550e8400-e29b-41d4-a716-446655440000",
  },
  "qr-generator": {
    toolName: "QR Code Generator",
    toolDescription: "Create QR codes instantly",
    primaryColor: "#3b82f6",
    secondaryColor: "#60a5fa",
    iconText: "QR",
    inputExample: "https://web-toolkit.app",
    outputExample: "[QR Code Generated]",
  },
  "regex-tester": {
    toolName: "Regex Tester",
    toolDescription: "Test regular expressions live",
    primaryColor: "#8b5cf6",
    secondaryColor: "#a78bfa",
    iconText: "/.*/",
    inputExample: "/\\d+/g",
    outputExample: "Matches: 123, 456, 789",
  },
  "sql-formatter": {
    toolName: "SQL Formatter",
    toolDescription: "Format SQL queries beautifully",
    primaryColor: "#0ea5e9",
    secondaryColor: "#38bdf8",
    iconText: "SQL",
    inputExample: "SELECT * FROM users WHERE id=1",
    outputExample: `SELECT *
FROM users
WHERE id = 1`,
  },
};

// 컴포지션 설정
const COMPOSITIONS = [
  { id: "ToolDemo", suffix: "16x9" },
  { id: "ToolDemoSquare", suffix: "1x1" },
  { id: "ToolDemoVertical", suffix: "9x16" },
];

// ============================================
// Render Functions
// ============================================

async function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

async function renderToolVideo(
  bundleLocation: string,
  toolSlug: string,
  compositionId: string,
): Promise<string> {
  const config = TOOL_CONFIGS[toolSlug];
  if (!config) {
    throw new Error(`Unknown tool: ${toolSlug}`);
  }

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    inputProps: {
      toolSlug,
      ...config,
    },
  });

  const suffix =
    COMPOSITIONS.find((c) => c.id === compositionId)?.suffix || "video";
  const outputPath = path.join(OUTPUT_DIR, `${toolSlug}-${suffix}.mp4`);

  console.log(`  Rendering ${toolSlug} (${compositionId})...`);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: {
      toolSlug,
      ...config,
    },
  });

  console.log(`  ✓ Saved to ${outputPath}`);
  return outputPath;
}

async function main() {
  const args = process.argv.slice(2);
  const targetTool = args[0];
  const targetComposition = args[1];

  console.log("\n🎬 Remotion Video Render Script");
  console.log("================================\n");

  // Output 디렉토리 생성
  await ensureOutputDir();

  // 번들링
  console.log("📦 Bundling Remotion project...");
  const bundleLocation = await bundle({
    entryPoint: REMOTION_ENTRY,
    webpackOverride: (config) => config,
  });
  console.log("✓ Bundle created\n");

  // 렌더링할 도구 목록
  const toolsToRender = targetTool ? [targetTool] : Object.keys(TOOL_CONFIGS);

  // 렌더링할 컴포지션 목록
  const compositionsToRender = targetComposition
    ? COMPOSITIONS.filter((c) => c.id === targetComposition)
    : COMPOSITIONS;

  console.log(`🎥 Rendering ${toolsToRender.length} tools...`);
  console.log(
    `   Formats: ${compositionsToRender.map((c) => c.suffix).join(", ")}\n`,
  );

  const results: { tool: string; path: string }[] = [];
  const errors: { tool: string; error: string }[] = [];

  for (const tool of toolsToRender) {
    console.log(`\n📌 ${TOOL_CONFIGS[tool]?.toolName || tool}`);

    for (const { id } of compositionsToRender) {
      try {
        const outputPath = await renderToolVideo(bundleLocation, tool, id);
        results.push({ tool, path: outputPath });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        errors.push({ tool, error: message });
        console.error(`  ✗ Error: ${message}`);
      }
    }
  }

  // 결과 요약
  console.log("\n================================");
  console.log("📊 Render Summary");
  console.log("================================");
  console.log(`✓ Success: ${results.length}`);
  console.log(`✗ Failed: ${errors.length}`);

  if (errors.length > 0) {
    console.log("\nErrors:");
    errors.forEach(({ tool, error }) => {
      console.log(`  - ${tool}: ${error}`);
    });
  }

  console.log("\n✨ Done!\n");
}

main().catch(console.error);
