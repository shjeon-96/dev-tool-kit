import {
  FileJson,
  Lock,
  Image as ImageIcon,
  Clock,
  Binary,
  Smartphone,
  QrCode,
  Palette,
  Link,
  Fingerprint,
  Hash,
  Database,
  Timer,
  FileText,
  GitCompare,
  Calculator,
  TextCursorInput,
  Link2,
  Code,
  Square,
  Blend,
  Monitor,
  Regex,
  Tags,
  Terminal,
  FileImage,
  Paintbrush,
  Sparkles,
  FileCode,
  Minimize2,
  CaseSensitive,
  FileVideo,
  Files,
  ScanText,
} from "lucide-react";
import type { Tool, ToolSlug } from "./types";

export const tools: Record<ToolSlug, Tool> = {
  "json-formatter": {
    title: "JSON Formatter",
    description: "JSON 데이터를 포맷팅, 압축, 검증합니다.",
    icon: FileJson,
    category: "text",
    relatedTools: ["jwt-decoder", "json-to-typescript", "prettier-playground"],
  },
  "jwt-decoder": {
    title: "JWT Decoder",
    description:
      "JWT 토큰을 디코딩하여 Header, Payload, 만료 시간을 확인합니다.",
    icon: Lock,
    category: "security",
    relatedTools: ["base64-converter", "hash-generator", "json-formatter"],
  },
  "image-resizer": {
    title: "Image Resizer",
    description:
      "이미지 크기 조절, 포맷 변환, 품질 조정을 브라우저에서 처리합니다.",
    icon: ImageIcon,
    category: "media",
    relatedTools: ["app-icon-generator", "svg-optimizer", "video-compressor"],
  },
  "unix-timestamp": {
    title: "Unix Timestamp",
    description: "Unix 타임스탬프와 날짜/시간 간 양방향 변환을 지원합니다.",
    icon: Clock,
    category: "converters",
    relatedTools: ["cron-parser", "base-converter", "uuid-generator"],
  },
  "base64-converter": {
    title: "Base64 Converter",
    description: "텍스트, 파일을 Base64로 인코딩/디코딩합니다.",
    icon: Binary,
    category: "converters",
    relatedTools: ["url-encoder", "hash-generator", "jwt-decoder"],
  },
  "app-icon-generator": {
    title: "App Icon Generator",
    description:
      "iOS, Android, Favicon 규격에 맞는 앱 아이콘을 일괄 생성합니다.",
    icon: Smartphone,
    category: "media",
    relatedTools: ["image-resizer", "qr-generator", "svg-optimizer"],
  },
  "qr-generator": {
    title: "QR Code Generator",
    description: "URL, WiFi, 연락처 등 다양한 형식의 QR 코드를 생성합니다.",
    icon: QrCode,
    category: "media",
    relatedTools: ["url-encoder", "base64-converter", "app-icon-generator"],
  },
  "color-picker": {
    title: "Color Picker",
    description: "이미지에서 색상을 추출하고 팔레트를 생성합니다.",
    icon: Palette,
    category: "media",
    relatedTools: ["gradient-generator", "box-shadow", "css-to-tailwind"],
  },
  "url-parser": {
    title: "URL Parser",
    description:
      "URL을 분석하여 구성 요소를 분해하고 쿼리 파라미터를 편집합니다.",
    icon: Link,
    category: "text",
    relatedTools: ["url-encoder", "curl-builder", "meta-generator"],
  },
  "uuid-generator": {
    title: "UUID/ULID Generator",
    description: "UUID v1, v4 및 ULID를 생성하고 다양한 포맷으로 변환합니다.",
    icon: Fingerprint,
    category: "text",
    relatedTools: ["hash-generator", "base-converter", "unix-timestamp"],
  },
  "base-converter": {
    title: "Number Base Converter",
    description: "2진수, 8진수, 10진수, 16진수 간 상호 변환을 지원합니다.",
    icon: Calculator,
    category: "converters",
    relatedTools: ["hash-generator", "uuid-generator", "unix-timestamp"],
  },
  "hash-generator": {
    title: "Hash Generator",
    description: "MD5, SHA-1, SHA-256, SHA-512 해시를 생성하고 비교합니다.",
    icon: Hash,
    category: "security",
    relatedTools: ["base64-converter", "uuid-generator", "jwt-decoder"],
  },
  "sql-formatter": {
    title: "SQL Formatter",
    description: "SQL 쿼리를 포맷팅하고 다양한 방언을 지원합니다.",
    icon: Database,
    category: "text",
    relatedTools: ["json-formatter", "prettier-playground", "diff-checker"],
  },
  "cron-parser": {
    title: "Cron Parser",
    description: "Cron 표현식을 해석하고 다음 실행 시간을 예측합니다.",
    icon: Timer,
    category: "text",
    relatedTools: ["unix-timestamp", "regex-tester", "curl-builder"],
  },
  "markdown-preview": {
    title: "Markdown Preview",
    description:
      "Markdown을 실시간으로 렌더링하고 코드 하이라이팅을 지원합니다.",
    icon: FileText,
    category: "text",
    relatedTools: ["html-entity", "lorem-generator", "diff-checker"],
  },
  "diff-checker": {
    title: "Diff Checker",
    description: "두 텍스트의 차이점을 비교하고 변경 사항을 시각화합니다.",
    icon: GitCompare,
    category: "text",
    relatedTools: ["json-formatter", "prettier-playground", "markdown-preview"],
  },
  "lorem-generator": {
    title: "Lorem Ipsum Generator",
    description: "더미 텍스트를 단어, 문장, 문단 단위로 생성합니다.",
    icon: TextCursorInput,
    category: "text",
    relatedTools: ["text-case-converter", "markdown-preview", "uuid-generator"],
  },
  "url-encoder": {
    title: "URL Encoder/Decoder",
    description: "URL을 인코딩하거나 디코딩합니다.",
    icon: Link2,
    category: "converters",
    relatedTools: ["base64-converter", "html-entity", "url-parser"],
  },
  "html-entity": {
    title: "HTML Entity Encoder",
    description: "HTML 특수문자를 엔티티로 인코딩/디코딩합니다.",
    icon: Code,
    category: "converters",
    relatedTools: ["url-encoder", "markdown-preview", "meta-generator"],
  },
  "box-shadow": {
    title: "Box Shadow Generator",
    description: "CSS box-shadow를 시각적으로 편집하고 코드를 생성합니다.",
    icon: Square,
    category: "media",
    relatedTools: ["gradient-generator", "color-picker", "css-to-tailwind"],
  },
  "gradient-generator": {
    title: "Gradient Generator",
    description: "CSS 그라디언트를 시각적으로 편집하고 코드를 생성합니다.",
    icon: Blend,
    category: "media",
    relatedTools: ["color-picker", "box-shadow", "css-to-tailwind"],
  },
  "ua-parser": {
    title: "User Agent Parser",
    description:
      "User Agent 문자열을 분석하여 브라우저, OS, 디바이스 정보를 확인합니다.",
    icon: Monitor,
    category: "text",
    relatedTools: ["curl-builder", "meta-generator", "regex-tester"],
  },
  "regex-tester": {
    title: "Regex Tester",
    description: "정규식을 테스트하고 매칭 결과를 실시간으로 확인합니다.",
    icon: Regex,
    category: "text",
    relatedTools: [
      "text-case-converter",
      "diff-checker",
      "prettier-playground",
    ],
  },
  "meta-generator": {
    title: "Meta Tag Generator",
    description: "SEO용 메타 태그, Open Graph, Twitter Card를 생성합니다.",
    icon: Tags,
    category: "text",
    relatedTools: ["html-entity", "url-parser", "qr-generator"],
  },
  "curl-builder": {
    title: "cURL Builder",
    description: "HTTP 요청을 구성하고 cURL 명령어를 생성합니다.",
    icon: Terminal,
    category: "text",
    relatedTools: ["json-formatter", "url-parser", "jwt-decoder"],
  },
  "svg-optimizer": {
    title: "SVG Optimizer",
    description: "SVG 파일을 최적화하여 파일 크기를 줄입니다.",
    icon: FileImage,
    category: "media",
    isPremium: true,
    relatedTools: ["image-resizer", "css-minifier", "app-icon-generator"],
  },
  "css-to-tailwind": {
    title: "CSS to Tailwind",
    description: "CSS 속성을 Tailwind CSS 클래스로 변환합니다.",
    icon: Paintbrush,
    category: "converters",
    relatedTools: ["css-minifier", "box-shadow", "gradient-generator"],
  },
  "prettier-playground": {
    title: "Prettier Playground",
    description: "다양한 언어의 코드를 Prettier로 포맷팅합니다.",
    icon: Sparkles,
    category: "text",
    relatedTools: ["json-formatter", "sql-formatter", "css-minifier"],
  },
  "json-to-typescript": {
    title: "JSON to TypeScript",
    description: "JSON 데이터를 TypeScript 인터페이스/타입으로 변환합니다.",
    icon: FileCode,
    category: "converters",
    isPremium: true,
    relatedTools: ["json-formatter", "prettier-playground", "diff-checker"],
  },
  "css-minifier": {
    title: "CSS Minifier",
    description: "CSS 코드를 압축하고 최적화합니다.",
    icon: Minimize2,
    category: "text",
    relatedTools: ["css-to-tailwind", "prettier-playground", "svg-optimizer"],
  },
  "text-case-converter": {
    title: "Text Case Converter",
    description:
      "텍스트를 다양한 케이스(camelCase, snake_case 등)로 변환합니다.",
    icon: CaseSensitive,
    category: "converters",
    relatedTools: ["lorem-generator", "regex-tester", "diff-checker"],
  },
  "video-compressor": {
    title: "Video Compressor",
    description:
      "브라우저에서 비디오 파일을 압축합니다. FFmpeg.wasm 기반 100% 로컬 처리.",
    icon: FileVideo,
    category: "media",
    isPremium: true,
    relatedTools: ["image-resizer", "svg-optimizer", "app-icon-generator"],
  },
  "pdf-toolkit": {
    title: "PDF Toolkit",
    description:
      "PDF 병합, 분할, 압축을 브라우저에서 처리합니다. 100% 클라이언트 사이드 처리.",
    icon: Files,
    category: "media",
    relatedTools: ["image-resizer", "svg-optimizer", "video-compressor"],
  },
  "ocr-scanner": {
    title: "OCR Scanner",
    description:
      "이미지에서 텍스트를 추출합니다. 한/영/일 다국어 지원, 100% 클라이언트 사이드 처리.",
    icon: ScanText,
    category: "media",
    relatedTools: ["pdf-toolkit", "image-resizer", "text-case-converter"],
  },
};

export function getToolSlugs(): ToolSlug[] {
  return Object.keys(tools) as ToolSlug[];
}

export function getPremiumToolSlugs(): ToolSlug[] {
  return (Object.entries(tools) as [ToolSlug, Tool][])
    .filter(([, tool]) => tool.isPremium)
    .map(([slug]) => slug);
}

export function isToolPremium(slug: ToolSlug): boolean {
  return tools[slug]?.isPremium === true;
}
