import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// 도구별 색상 테마
const TOOL_THEMES: Record<
  string,
  { primary: string; secondary: string; icon: string }
> = {
  "json-formatter": {
    primary: "#f59e0b",
    secondary: "#fbbf24",
    icon: "{ }",
  },
  "hash-generator": {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    icon: "#",
  },
  "base64-converter": {
    primary: "#06b6d4",
    secondary: "#22d3ee",
    icon: "64",
  },
  "uuid-generator": {
    primary: "#ec4899",
    secondary: "#f472b6",
    icon: "ID",
  },
  "qr-generator": {
    primary: "#10b981",
    secondary: "#34d399",
    icon: "QR",
  },
  "jwt-decoder": {
    primary: "#f97316",
    secondary: "#fb923c",
    icon: "JWT",
  },
  "url-encoder": {
    primary: "#3b82f6",
    secondary: "#60a5fa",
    icon: "%",
  },
  "color-converter": {
    primary: "#ef4444",
    secondary: "#f87171",
    icon: "🎨",
  },
  "image-resizer": {
    primary: "#14b8a6",
    secondary: "#2dd4bf",
    icon: "📷",
  },
  "regex-tester": {
    primary: "#a855f7",
    secondary: "#c084fc",
    icon: ".*",
  },
  "image-converter": {
    primary: "#3b82f6",
    secondary: "#60a5fa",
    icon: "🖼️",
  },
  default: {
    primary: "#60a5fa",
    secondary: "#93c5fd",
    icon: "🛠️",
  },
};

// 코드 미리보기 포맷팅 (JSON 등)
function formatCodePreview(code: string, maxLines = 8): string[] {
  try {
    // JSON인 경우 포맷팅
    const parsed = JSON.parse(code);
    const formatted = JSON.stringify(parsed, null, 2);
    return formatted.split("\n").slice(0, maxLines);
  } catch {
    // JSON이 아니면 그대로 분할
    return code.split("\n").slice(0, maxLines);
  }
}

// 해시 결과 표시용 포맷
function formatHashPreview(
  input: string,
  hash: string,
  algorithm: string,
): { input: string; hash: string; algorithm: string } {
  return {
    input: input.length > 20 ? input.slice(0, 20) + "..." : input,
    hash: hash.slice(0, 32) + "...",
    algorithm: algorithm.toUpperCase(),
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tool: string }> },
) {
  const { tool } = await params;
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || getDefaultTitle(tool);
  const description = searchParams.get("description") || "";
  const preview = searchParams.get("preview") || "";
  const type = searchParams.get("type") || "default"; // code, hash, color, qr 등

  const theme = TOOL_THEMES[tool] || TOOL_THEMES.default;

  // 도구별 특화 렌더링
  if (type === "code" && preview) {
    return renderCodeOG(title, preview, theme);
  }

  if (type === "hash" && preview) {
    const [input, hash, algorithm] = preview.split("|");
    return renderHashOG(title, input, hash, algorithm, theme);
  }

  if (type === "color" && preview) {
    return renderColorOG(title, preview, theme);
  }

  // 기본 OG 이미지
  return renderDefaultOG(title, description, theme, tool);
}

// 기본 OG 이미지
function renderDefaultOG(
  title: string,
  description: string,
  theme: { primary: string; secondary: string; icon: string },
  tool: string,
) {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.primary}15 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${theme.secondary}15 0%, transparent 50%)`,
      }}
    >
      {/* 아이콘 배지 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          borderRadius: "24px",
          backgroundColor: `${theme.primary}20`,
          border: `3px solid ${theme.primary}`,
          marginBottom: "32px",
          fontSize: "40px",
          fontWeight: "bold",
          color: theme.primary,
        }}
      >
        {theme.icon}
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: title.length > 25 ? "52px" : "64px",
          fontWeight: "bold",
          color: "#ffffff",
          textAlign: "center",
          marginBottom: "16px",
          lineHeight: 1.1,
          maxWidth: "90%",
        }}
      >
        {title}
      </h1>

      {/* 설명 */}
      {description && (
        <p
          style={{
            fontSize: "26px",
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          {description.length > 80
            ? description.slice(0, 80) + "..."
            : description}
        </p>
      )}

      {/* 푸터 */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: theme.primary,
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span>Web Toolkit</span>
        </div>
        <span style={{ color: "#52525b" }}>|</span>
        <span style={{ color: "#71717a", fontSize: "18px" }}>
          100% Client-Side
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

// 코드 미리보기 OG (JSON Formatter 등)
function renderCodeOG(
  title: string,
  code: string,
  theme: { primary: string; secondary: string; icon: string },
) {
  const lines = formatCodePreview(code, 10);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0a0a",
        padding: "48px",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              backgroundColor: `${theme.primary}20`,
              border: `2px solid ${theme.primary}`,
              fontSize: "24px",
              fontWeight: "bold",
              color: theme.primary,
            }}
          >
            {theme.icon}
          </div>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#fff" }}>
            {title}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: theme.primary,
          }}
        >
          <span style={{ fontSize: "18px" }}>web-toolkit.app</span>
        </div>
      </div>

      {/* 코드 블록 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#18181b",
          borderRadius: "16px",
          border: "1px solid #27272a",
          padding: "24px",
          overflow: "hidden",
        }}
      >
        {/* 코드 윈도우 버튼 */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
        </div>

        {/* 코드 라인 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          {lines.map((line, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  color: "#52525b",
                  width: "40px",
                  textAlign: "right",
                  marginRight: "16px",
                }}
              >
                {i + 1}
              </span>
              <span style={{ color: "#e4e4e7" }}>
                {highlightJsonLine(line)}
              </span>
            </div>
          ))}
          {lines.length >= 10 && (
            <div
              style={{
                color: "#52525b",
                marginTop: "8px",
                marginLeft: "56px",
              }}
            >
              ...
            </div>
          )}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

// 해시 결과 OG
function renderHashOG(
  title: string,
  input: string,
  hash: string,
  algorithm: string,
  theme: { primary: string; secondary: string; icon: string },
) {
  const formatted = formatHashPreview(input || "", hash || "", algorithm || "");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        backgroundImage: `radial-gradient(circle at 30% 30%, ${theme.primary}15 0%, transparent 50%)`,
      }}
    >
      {/* 알고리즘 배지 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 32px",
          borderRadius: "999px",
          backgroundColor: `${theme.primary}20`,
          border: `2px solid ${theme.primary}`,
          marginBottom: "32px",
          fontSize: "24px",
          fontWeight: "bold",
          color: theme.primary,
        }}
      >
        {formatted.algorithm}
      </div>

      {/* 입력 → 해시 다이어그램 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* 입력 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 32px",
            backgroundColor: "#18181b",
            borderRadius: "16px",
            border: "1px solid #27272a",
          }}
        >
          <span
            style={{ color: "#71717a", fontSize: "14px", marginBottom: "8px" }}
          >
            INPUT
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontFamily: "monospace",
            }}
          >
            {formatted.input}
          </span>
        </div>

        {/* 화살표 */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.primary}
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>

        {/* 해시 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 32px",
            backgroundColor: "#18181b",
            borderRadius: "16px",
            border: `2px solid ${theme.primary}40`,
          }}
        >
          <span
            style={{
              color: theme.primary,
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            HASH
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: "20px",
              fontFamily: "monospace",
              maxWidth: "400px",
              wordBreak: "break-all",
            }}
          >
            {formatted.hash}
          </span>
        </div>
      </div>

      {/* 푸터 */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#71717a",
          fontSize: "18px",
        }}
      >
        <span>web-toolkit.app</span>
        <span>•</span>
        <span>100% Client-Side Processing</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

// 색상 미리보기 OG
function renderColorOG(
  title: string,
  colorValue: string,
  theme: { primary: string; secondary: string; icon: string },
) {
  // colorValue는 "hex|rgb|hsl" 형식 (예: "#FF5733|rgb(255,87,51)|hsl(11,100%,60%)")
  const [hex, rgb, hsl] = colorValue.split("|");
  const displayColor = hex || "#60a5fa";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* 색상 견본 (왼쪽 절반) */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: displayColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "16px",
          }}
        >
          <span style={{ color: "#fff", fontSize: "48px", fontWeight: "bold" }}>
            {hex || displayColor}
          </span>
        </div>
      </div>

      {/* 정보 (오른쪽 절반) */}
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: "32px",
          }}
        >
          {title}
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {hex && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
                backgroundColor: "#18181b",
                borderRadius: "8px",
              }}
            >
              <span style={{ color: "#71717a" }}>HEX</span>
              <span style={{ color: "#fff", fontFamily: "monospace" }}>
                {hex}
              </span>
            </div>
          )}
          {rgb && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
                backgroundColor: "#18181b",
                borderRadius: "8px",
              }}
            >
              <span style={{ color: "#71717a" }}>RGB</span>
              <span style={{ color: "#fff", fontFamily: "monospace" }}>
                {rgb}
              </span>
            </div>
          )}
          {hsl && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
                backgroundColor: "#18181b",
                borderRadius: "8px",
              }}
            >
              <span style={{ color: "#71717a" }}>HSL</span>
              <span style={{ color: "#fff", fontFamily: "monospace" }}>
                {hsl}
              </span>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#71717a",
            fontSize: "16px",
          }}
        >
          <span>web-toolkit.app</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

// JSON 구문 강조 헬퍼 (간단한 버전)
function highlightJsonLine(line: string): string {
  // Edge runtime에서는 복잡한 처리를 피하고 그대로 반환
  return line;
}

// 도구별 기본 제목
function getDefaultTitle(tool: string): string {
  const titles: Record<string, string> = {
    "json-formatter": "JSON Formatter",
    "hash-generator": "Hash Generator",
    "base64-converter": "Base64 Converter",
    "uuid-generator": "UUID Generator",
    "qr-generator": "QR Code Generator",
    "jwt-decoder": "JWT Decoder",
    "url-encoder": "URL Encoder/Decoder",
    "color-converter": "Color Converter",
    "image-resizer": "Image Resizer",
    "regex-tester": "Regex Tester",
  };
  return titles[tool] || "Web Toolkit";
}
