/**
 * Format Labels & Placeholders
 *
 * 변환기에서 사용하는 포맷 라벨 및 플레이스홀더 유틸리티
 * - 다국어 지원 (en, ko, ja)
 * - 포맷별 표시명
 */

type SupportedLocale = "en" | "ko" | "ja";

const FORMAT_LABELS: Record<string, Record<SupportedLocale, string>> = {
  json: { en: "JSON", ko: "JSON", ja: "JSON" },
  yaml: { en: "YAML", ko: "YAML", ja: "YAML" },
  csv: { en: "CSV", ko: "CSV", ja: "CSV" },
  xml: { en: "XML", ko: "XML", ja: "XML" },
  base64: { en: "Base64", ko: "Base64", ja: "Base64" },
  text: { en: "Text", ko: "텍스트", ja: "テキスト" },
  url: { en: "URL Encoded", ko: "URL 인코딩", ja: "URLエンコード" },
  "hex-color": { en: "HEX Color", ko: "HEX 색상", ja: "HEXカラー" },
  rgb: { en: "RGB", ko: "RGB", ja: "RGB" },
  hsl: { en: "HSL", ko: "HSL", ja: "HSL" },
  decimal: { en: "Decimal", ko: "10진수", ja: "10進数" },
  "binary-num": { en: "Binary", ko: "2진수", ja: "2進数" },
  hexadecimal: { en: "Hexadecimal", ko: "16진수", ja: "16進数" },
  md5: { en: "MD5 Hash", ko: "MD5 해시", ja: "MD5ハッシュ" },
  sha256: { en: "SHA256 Hash", ko: "SHA256 해시", ja: "SHA256ハッシュ" },
  unix: {
    en: "Unix Timestamp",
    ko: "Unix 타임스탬프",
    ja: "Unixタイムスタンプ",
  },
  datetime: { en: "Date/Time", ko: "날짜/시간", ja: "日付/時間" },
  typescript: { en: "TypeScript", ko: "TypeScript", ja: "TypeScript" },
  css: { en: "CSS", ko: "CSS", ja: "CSS" },
  tailwind: { en: "Tailwind CSS", ko: "Tailwind CSS", ja: "Tailwind CSS" },
};

const FORMAT_PLACEHOLDERS: Record<string, Record<SupportedLocale, string>> = {
  json: {
    en: "Paste JSON here...",
    ko: "JSON을 붙여넣으세요...",
    ja: "JSONを貼り付けてください...",
  },
  yaml: {
    en: "Paste YAML here...",
    ko: "YAML을 붙여넣으세요...",
    ja: "YAMLを貼り付けてください...",
  },
  csv: {
    en: "Paste CSV here...",
    ko: "CSV를 붙여넣으세요...",
    ja: "CSVを貼り付けてください...",
  },
  text: {
    en: "Enter text here...",
    ko: "텍스트를 입력하세요...",
    ja: "テキストを入力してください...",
  },
  base64: {
    en: "Enter Base64 string...",
    ko: "Base64 문자열을 입력하세요...",
    ja: "Base64文字列を入力...",
  },
  url: {
    en: "Enter URL encoded string...",
    ko: "URL 인코딩된 문자열을 입력하세요...",
    ja: "URLエンコードされた文字列を入力...",
  },
  "hex-color": {
    en: "#FF5733 or FF5733",
    ko: "#FF5733 또는 FF5733",
    ja: "#FF5733 または FF5733",
  },
  rgb: {
    en: "rgb(255, 87, 51) or 255, 87, 51",
    ko: "rgb(255, 87, 51) 또는 255, 87, 51",
    ja: "rgb(255, 87, 51) または 255, 87, 51",
  },
  decimal: {
    en: "Enter decimal number...",
    ko: "10진수를 입력하세요...",
    ja: "10進数を入力...",
  },
  "binary-num": {
    en: "Enter binary number (0s and 1s)...",
    ko: "2진수를 입력하세요 (0과 1)...",
    ja: "2進数を入力 (0と1)...",
  },
  hexadecimal: {
    en: "Enter hex number (0-9, A-F)...",
    ko: "16진수를 입력하세요 (0-9, A-F)...",
    ja: "16進数を入力 (0-9, A-F)...",
  },
  unix: {
    en: "Enter Unix timestamp...",
    ko: "Unix 타임스탬프를 입력하세요...",
    ja: "Unixタイムスタンプを入力...",
  },
  datetime: {
    en: "2023-12-15 or ISO format...",
    ko: "2023-12-15 또는 ISO 형식...",
    ja: "2023-12-15 または ISO形式...",
  },
};

/**
 * 포맷에 대한 표시 라벨을 반환
 */
export function getFormatLabel(format: string, locale: string): string {
  const loc = (locale as SupportedLocale) || "en";
  return (
    FORMAT_LABELS[format]?.[loc] ||
    FORMAT_LABELS[format]?.en ||
    format.toUpperCase()
  );
}

/**
 * 포맷에 대한 플레이스홀더를 반환
 */
export function getPlaceholder(format: string, locale: string): string {
  const loc = (locale as SupportedLocale) || "en";
  return (
    FORMAT_PLACEHOLDERS[format]?.[loc] ||
    FORMAT_PLACEHOLDERS[format]?.en ||
    `Enter ${format}...`
  );
}

/**
 * 로케일별 UI 텍스트
 */
export const UI_TEXT = {
  loadExample: { en: "Load Example", ko: "예시 불러오기", ja: "例を読み込む" },
  clear: { en: "Clear", ko: "초기화", ja: "クリア" },
  examples: { en: "Examples", ko: "예시", ja: "例" },
  input: { en: "Input", ko: "입력", ja: "入力" },
  output: { en: "Output", ko: "출력", ja: "出力" },
} as const;

export function getUIText(key: keyof typeof UI_TEXT, locale: string): string {
  const loc = (locale as SupportedLocale) || "en";
  return UI_TEXT[key][loc] || UI_TEXT[key].en;
}
