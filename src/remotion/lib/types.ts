import type { ToolSlug } from "@/entities/tool";

// ============================================
// Remotion Video Types
// ============================================

/**
 * 도구 데모 비디오 Props
 */
export interface ToolDemoProps {
  toolSlug: ToolSlug;
  toolName: string;
  toolDescription: string;
  inputExample: string;
  outputExample: string;
  primaryColor: string;
  secondaryColor: string;
  /** 커스텀 아이콘 텍스트 (기본값: 도구 아이콘) */
  iconText?: string;
  /** 배경 타입 */
  backgroundType?: "gradient" | "solid" | "pattern";
}

/**
 * 도구별 테마 설정
 */
export interface ToolTheme {
  primary: string;
  secondary: string;
  icon: string;
  inputExample: string;
  outputExample: string;
}

/**
 * 비디오 렌더링 요청
 */
export interface RenderRequest {
  compositionId: "ToolDemo" | "ToolDemoSquare" | "ToolDemoVertical";
  toolSlug: ToolSlug;
  outputFormat?: "mp4" | "webm" | "gif";
}

/**
 * 비디오 렌더링 결과
 */
export interface RenderResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  duration?: number;
}

/**
 * 도구별 비디오 테마
 */
export const TOOL_VIDEO_THEMES: Partial<Record<ToolSlug, ToolTheme>> = {
  "json-formatter": {
    primary: "#f59e0b",
    secondary: "#fbbf24",
    icon: "{ }",
    inputExample: '{"name":"test","value":123}',
    outputExample: `{
  "name": "test",
  "value": 123
}`,
  },
  "hash-generator": {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    icon: "#",
    inputExample: "Hello, World!",
    outputExample: "dffd6021bb2bd5b0af67...",
  },
  "jwt-decoder": {
    primary: "#ec4899",
    secondary: "#f472b6",
    icon: "JWT",
    inputExample: "eyJhbGciOiJIUzI1NiIs...",
    outputExample: `{
  "sub": "1234567890",
  "name": "John Doe"
}`,
  },
  "base64-converter": {
    primary: "#06b6d4",
    secondary: "#22d3ee",
    icon: "B64",
    inputExample: "Hello, DevToolkit!",
    outputExample: "SGVsbG8sIERldlRvb2xraXQh",
  },
  "uuid-generator": {
    primary: "#10b981",
    secondary: "#34d399",
    icon: "UUID",
    inputExample: "Click Generate",
    outputExample: "550e8400-e29b-41d4-a716...",
  },
  "qr-generator": {
    primary: "#3b82f6",
    secondary: "#60a5fa",
    icon: "QR",
    inputExample: "https://web-toolkit.app",
    outputExample: "[QR Code Image]",
  },
  "url-encoder": {
    primary: "#14b8a6",
    secondary: "#2dd4bf",
    icon: "%",
    inputExample: "Hello World!",
    outputExample: "Hello%20World%21",
  },
  "color-picker": {
    primary: "#f43f5e",
    secondary: "#fb7185",
    icon: "#",
    inputExample: "#FF5733",
    outputExample: "rgb(255, 87, 51)",
  },
  "regex-tester": {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    icon: "/.*/",
    inputExample: "/\\d+/g",
    outputExample: "Matches: 123, 456",
  },
  "markdown-preview": {
    primary: "#6366f1",
    secondary: "#818cf8",
    icon: "MD",
    inputExample: "# Hello\\n**Bold**",
    outputExample: "Hello (rendered)",
  },
};

/**
 * 도구 테마 가져오기 (기본값 포함)
 */
export function getToolTheme(toolSlug: ToolSlug): ToolTheme {
  return (
    TOOL_VIDEO_THEMES[toolSlug] || {
      primary: "#6366f1",
      secondary: "#818cf8",
      icon: "⚡",
      inputExample: "Input data here...",
      outputExample: "Processed output...",
    }
  );
}
