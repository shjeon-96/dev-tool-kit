import {
  FileJson,
  Lock,
  Image as ImageIcon,
  Clock,
  Binary,
  Smartphone,
  QrCode,
  Palette,
} from "lucide-react";
import type { Tool, ToolSlug } from "./types";

export const tools: Record<ToolSlug, Tool> = {
  "json-formatter": {
    title: "JSON Formatter",
    description: "JSON 데이터를 포맷팅, 압축, 검증합니다.",
    icon: FileJson,
    category: "text",
  },
  "jwt-decoder": {
    title: "JWT Decoder",
    description: "JWT 토큰을 디코딩하여 Header, Payload, 만료 시간을 확인합니다.",
    icon: Lock,
    category: "security",
  },
  "image-resizer": {
    title: "Image Resizer",
    description: "이미지 크기 조절, 포맷 변환, 품질 조정을 브라우저에서 처리합니다.",
    icon: ImageIcon,
    category: "media",
  },
  "unix-timestamp": {
    title: "Unix Timestamp",
    description: "Unix 타임스탬프와 날짜/시간 간 양방향 변환을 지원합니다.",
    icon: Clock,
    category: "converters",
  },
  "base64-converter": {
    title: "Base64 Converter",
    description: "텍스트, 파일을 Base64로 인코딩/디코딩합니다.",
    icon: Binary,
    category: "converters",
  },
  "app-icon-generator": {
    title: "App Icon Generator",
    description: "iOS, Android, Favicon 규격에 맞는 앱 아이콘을 일괄 생성합니다.",
    icon: Smartphone,
    category: "media",
  },
  "qr-generator": {
    title: "QR Code Generator",
    description: "URL, WiFi, 연락처 등 다양한 형식의 QR 코드를 생성합니다.",
    icon: QrCode,
    category: "media",
  },
  "color-picker": {
    title: "Color Picker",
    description: "이미지에서 색상을 추출하고 팔레트를 생성합니다.",
    icon: Palette,
    category: "media",
  },
};

export function getToolSlugs(): ToolSlug[] {
  return Object.keys(tools) as ToolSlug[];
}
