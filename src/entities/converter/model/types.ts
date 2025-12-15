/**
 * Converter Types - Programmatic SEO용 변환 조합 타입 정의
 */

// 지원하는 데이터 포맷
export type DataFormat =
  // 데이터 직렬화 포맷
  | "json"
  | "yaml"
  | "xml"
  | "csv"
  | "toml"
  // 인코딩 포맷
  | "base64"
  | "url"
  | "hex"
  | "binary"
  | "text"
  // 색상 포맷
  | "rgb"
  | "hex-color"
  | "hsl"
  // 숫자 진법
  | "decimal"
  | "binary-num"
  | "octal"
  | "hexadecimal"
  // 해시
  | "md5"
  | "sha1"
  | "sha256"
  | "sha512"
  // 시간
  | "unix"
  | "iso"
  | "datetime"
  // 코드
  | "typescript"
  | "css"
  | "tailwind"
  // 추가 데이터 포맷
  | "properties"
  | "ini"
  // 추가 인코딩
  | "html-entity"
  | "ascii"
  // 추가 숫자
  | "octal-num";

// 변환 방향 (양방향 가능 여부)
export type ConversionDirection = "bidirectional" | "one-way";

// 변환 카테고리
export type ConversionCategory =
  | "encoding"
  | "data"
  | "color"
  | "number"
  | "hash"
  | "time"
  | "code";

// 변환 정의
export interface Conversion {
  from: DataFormat;
  to: DataFormat;
  category: ConversionCategory;
  direction: ConversionDirection;
  // SEO 메타데이터
  slug: string; // e.g., "json-to-yaml"
  title: {
    en: string;
    ko: string;
    ja: string;
  };
  description: {
    en: string;
    ko: string;
    ja: string;
  };
  keywords: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  // 관련 도구 (기존 tools와 연결)
  relatedTool?: string;
}

// 변환 결과
export interface ConversionResult {
  success: boolean;
  output: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

// 변환 함수 타입
export type ConvertFunction = (
  input: string,
  options?: Record<string, unknown>,
) => ConversionResult;

// 변환기 인터페이스
export interface Converter {
  conversion: Conversion;
  convert: ConvertFunction;
  // 역방향 변환 (양방향일 경우)
  reverseConvert?: ConvertFunction;
  // 입력 검증
  validate?: (input: string) => boolean;
  // 예시 입력
  examples: {
    input: string;
    output: string;
  }[];
}
