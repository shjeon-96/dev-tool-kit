/**
 * Converter Generators - Programmatic SEO용 변환 조합 자동 생성기
 *
 * 전략: 템플릿 기반 자동 생성으로 롱테일 키워드 대량 커버
 */

import type { Conversion, DataFormat } from "./types";

// ===============================
// 포맷 메타데이터 정의
// ===============================

/** 포맷 표시명 (다국어) */
export const FORMAT_NAMES: Record<
  string,
  { en: string; ko: string; ja: string }
> = {
  json: { en: "JSON", ko: "JSON", ja: "JSON" },
  yaml: { en: "YAML", ko: "YAML", ja: "YAML" },
  xml: { en: "XML", ko: "XML", ja: "XML" },
  csv: { en: "CSV", ko: "CSV", ja: "CSV" },
  toml: { en: "TOML", ko: "TOML", ja: "TOML" },
  properties: { en: "Properties", ko: "Properties", ja: "Properties" },
  ini: { en: "INI", ko: "INI", ja: "INI" },
  base64: { en: "Base64", ko: "Base64", ja: "Base64" },
  url: { en: "URL Encoded", ko: "URL 인코딩", ja: "URLエンコード" },
  text: { en: "Text", ko: "텍스트", ja: "テキスト" },
  "html-entity": {
    en: "HTML Entity",
    ko: "HTML 엔티티",
    ja: "HTMLエンティティ",
  },
  ascii: { en: "ASCII", ko: "ASCII", ja: "ASCII" },
  "hex-color": { en: "HEX Color", ko: "HEX 색상", ja: "HEXカラー" },
  rgb: { en: "RGB", ko: "RGB", ja: "RGB" },
  hsl: { en: "HSL", ko: "HSL", ja: "HSL" },
  decimal: { en: "Decimal", ko: "10진수", ja: "10進数" },
  "binary-num": { en: "Binary", ko: "2진수", ja: "2進数" },
  "octal-num": { en: "Octal", ko: "8진수", ja: "8進数" },
  hexadecimal: { en: "Hexadecimal", ko: "16진수", ja: "16進数" },
  md5: { en: "MD5", ko: "MD5", ja: "MD5" },
  sha1: { en: "SHA1", ko: "SHA1", ja: "SHA1" },
  sha256: { en: "SHA256", ko: "SHA256", ja: "SHA256" },
  sha512: { en: "SHA512", ko: "SHA512", ja: "SHA512" },
  unix: {
    en: "Unix Timestamp",
    ko: "Unix 타임스탬프",
    ja: "Unixタイムスタンプ",
  },
  datetime: { en: "Date/Time", ko: "날짜/시간", ja: "日付/時間" },
  iso: { en: "ISO 8601", ko: "ISO 8601", ja: "ISO 8601" },
  typescript: { en: "TypeScript", ko: "TypeScript", ja: "TypeScript" },
  css: { en: "CSS", ko: "CSS", ja: "CSS" },
  tailwind: { en: "Tailwind CSS", ko: "Tailwind CSS", ja: "Tailwind CSS" },
};

/** 관련 도구 매핑 */
export const RELATED_TOOLS: Record<string, string> = {
  json: "json-formatter",
  yaml: "json-formatter",
  csv: "json-formatter",
  xml: "json-formatter",
  toml: "json-formatter",
  base64: "base64-converter",
  url: "url-encoder",
  "html-entity": "html-entity",
  "hex-color": "color-picker",
  rgb: "color-picker",
  hsl: "color-picker",
  decimal: "base-converter",
  "binary-num": "base-converter",
  "octal-num": "base-converter",
  hexadecimal: "base-converter",
  md5: "hash-generator",
  sha1: "hash-generator",
  sha256: "hash-generator",
  sha512: "hash-generator",
  unix: "unix-timestamp",
  datetime: "unix-timestamp",
  typescript: "json-to-typescript",
  css: "css-to-tailwind",
  tailwind: "css-to-tailwind",
};

// ===============================
// 자동 변환 생성기
// ===============================

/** 이미 수동 정의된 slug 목록 (중복 방지) */
const MANUAL_SLUGS = new Set([
  // Data
  "json-to-yaml",
  "yaml-to-json",
  "json-to-csv",
  "csv-to-json",
  // Encoding
  "text-to-base64",
  "base64-to-text",
  "url-encode",
  "url-decode",
  // Color
  "hex-to-rgb",
  "rgb-to-hex",
  "hex-to-hsl",
  "rgb-to-hsl",
  // Number
  "decimal-to-binary",
  "decimal-to-hex",
  "binary-to-decimal",
  "hex-to-decimal",
  // Hash
  "md5-hash-generator",
  "sha256-hash-generator",
  // Time
  "unix-to-date",
  "date-to-unix",
  // Code
  "json-to-typescript",
  "css-to-tailwind",
]);

/** 데이터 포맷 간 변환 자동 생성 */
export function generateDataConversions(): Conversion[] {
  const DATA_FORMATS: DataFormat[] = ["json", "yaml", "xml", "csv", "toml"];
  const conversions: Conversion[] = [];

  DATA_FORMATS.forEach((from) => {
    DATA_FORMATS.forEach((to) => {
      if (from === to) return;
      const slug = `${from}-to-${to}`;
      if (MANUAL_SLUGS.has(slug)) return;

      const fromName = FORMAT_NAMES[from] || { en: from, ko: from, ja: from };
      const toName = FORMAT_NAMES[to] || { en: to, ko: to, ja: to };

      conversions.push({
        from,
        to,
        category: "data",
        direction: "bidirectional",
        slug,
        title: {
          en: `${fromName.en} to ${toName.en} Converter`,
          ko: `${fromName.ko}를 ${toName.ko}로 변환`,
          ja: `${fromName.ja}から${toName.ja}へ変換`,
        },
        description: {
          en: `Convert ${fromName.en} data to ${toName.en} format online. Free, fast, and works entirely in your browser.`,
          ko: `${fromName.ko} 데이터를 ${toName.ko} 형식으로 온라인 변환합니다. 무료, 빠름, 브라우저에서 100% 처리.`,
          ja: `${fromName.ja}データを${toName.ja}形式にオンラインで変換します。無料、高速、ブラウザで完全処理。`,
        },
        keywords: {
          en: [
            `${from} to ${to}`,
            `convert ${from} ${to}`,
            `${from} ${to} converter`,
            `${from} to ${to} online`,
          ],
          ko: [
            `${from} ${to} 변환`,
            `${from}을 ${to}로`,
            `${from} ${to} 변환기`,
          ],
          ja: [
            `${from} ${to} 変換`,
            `${from} から ${to}`,
            `${from} ${to} コンバーター`,
          ],
        },
        relatedTool: RELATED_TOOLS[from] || RELATED_TOOLS[to],
      });
    });
  });

  return conversions;
}

/** 숫자 진법 변환 자동 생성 */
export function generateNumberConversions(): Conversion[] {
  const NUMBER_FORMATS: { format: DataFormat; base: number }[] = [
    { format: "binary-num", base: 2 },
    { format: "octal-num", base: 8 },
    { format: "decimal", base: 10 },
    { format: "hexadecimal", base: 16 },
  ];
  const conversions: Conversion[] = [];

  NUMBER_FORMATS.forEach((fromItem) => {
    NUMBER_FORMATS.forEach((toItem) => {
      if (fromItem.format === toItem.format) return;

      // slug 정규화
      const fromSlug = fromItem.format
        .replace("-num", "")
        .replace("hexadecimal", "hex");
      const toSlug = toItem.format
        .replace("-num", "")
        .replace("hexadecimal", "hex");
      const slug = `${fromSlug}-to-${toSlug}`;

      if (MANUAL_SLUGS.has(slug)) return;

      const fromName = FORMAT_NAMES[fromItem.format];
      const toName = FORMAT_NAMES[toItem.format];

      conversions.push({
        from: fromItem.format,
        to: toItem.format,
        category: "number",
        direction: "bidirectional",
        slug,
        title: {
          en: `${fromName.en} to ${toName.en} Converter`,
          ko: `${fromName.ko}를 ${toName.ko}로 변환`,
          ja: `${fromName.ja}から${toName.ja}へ変換`,
        },
        description: {
          en: `Convert ${fromName.en} (base-${fromItem.base}) to ${toName.en} (base-${toItem.base}). Fast number base conversion online.`,
          ko: `${fromName.ko}(${fromItem.base}진법)를 ${toName.ko}(${toItem.base}진법)로 변환합니다. 빠른 온라인 진법 변환기.`,
          ja: `${fromName.ja}(${fromItem.base}進法)を${toName.ja}(${toItem.base}進法)に変換します。高速オンライン基数変換。`,
        },
        keywords: {
          en: [
            `${fromSlug} to ${toSlug}`,
            `base ${fromItem.base} to base ${toItem.base}`,
            `${fromSlug} ${toSlug} converter`,
            `number converter`,
          ],
          ko: [
            `${fromName.ko} ${toName.ko} 변환`,
            `${fromItem.base}진수 ${toItem.base}진수`,
            `진법 변환기`,
          ],
          ja: [
            `${fromName.ja} ${toName.ja} 変換`,
            `${fromItem.base}進数 ${toItem.base}進数`,
            `進数コンバーター`,
          ],
        },
        relatedTool: "base-converter",
      });
    });
  });

  return conversions;
}

/** 해시 생성 변환 자동 생성 (SHA1, SHA512) */
export function generateHashConversions(): Conversion[] {
  const HASH_TYPES: DataFormat[] = ["sha1", "sha512"];
  const conversions: Conversion[] = [];

  HASH_TYPES.forEach((hashType) => {
    const hashName = FORMAT_NAMES[hashType];
    const slug = `${hashType}-hash-generator`;

    if (MANUAL_SLUGS.has(slug)) return;

    conversions.push({
      from: "text",
      to: hashType,
      category: "hash",
      direction: "one-way",
      slug,
      title: {
        en: `${hashName.en} Hash Generator`,
        ko: `${hashName.ko} 해시 생성기`,
        ja: `${hashName.ja}ハッシュ生成器`,
      },
      description: {
        en: `Generate ${hashName.en} hash from text. Secure checksum calculator online for data integrity verification.`,
        ko: `텍스트에서 ${hashName.ko} 해시를 생성합니다. 데이터 무결성 검증을 위한 안전한 온라인 체크섬 계산기.`,
        ja: `テキストから${hashName.ja}ハッシュを生成します。データ整合性検証のための安全なオンラインチェックサム計算機。`,
      },
      keywords: {
        en: [
          `${hashType} generator`,
          `${hashType} hash`,
          `${hashType} checksum`,
          `generate ${hashType}`,
        ],
        ko: [`${hashType} 생성기`, `${hashType} 해시`, `${hashType} 체크섬`],
        ja: [
          `${hashType} 生成器`,
          `${hashType} ハッシュ`,
          `${hashType} チェックサム`,
        ],
      },
      relatedTool: "hash-generator",
    });
  });

  return conversions;
}

/** HTML 엔티티 및 ASCII 인코딩 변환 생성 */
export function generateEncodingConversions(): Conversion[] {
  const conversions: Conversion[] = [];

  // HTML Entity 인코딩
  conversions.push({
    from: "text",
    to: "html-entity",
    category: "encoding",
    direction: "bidirectional",
    slug: "html-entity-encode",
    title: {
      en: "HTML Entity Encoder",
      ko: "HTML 엔티티 인코더",
      ja: "HTMLエンティティエンコーダー",
    },
    description: {
      en: "Encode special characters to HTML entities. Convert text with special characters for safe HTML display.",
      ko: "특수문자를 HTML 엔티티로 인코딩합니다. 안전한 HTML 표시를 위한 텍스트 변환.",
      ja: "特殊文字をHTMLエンティティにエンコードします。安全なHTML表示のためのテキスト変換。",
    },
    keywords: {
      en: [
        "html entity encoder",
        "html encode",
        "html special characters",
        "html escape",
      ],
      ko: ["html 엔티티 인코더", "html 인코딩", "html 특수문자"],
      ja: [
        "html エンティティ エンコーダー",
        "html エンコード",
        "html 特殊文字",
      ],
    },
    relatedTool: "html-entity",
  });

  // HTML Entity 디코딩
  conversions.push({
    from: "html-entity",
    to: "text",
    category: "encoding",
    direction: "bidirectional",
    slug: "html-entity-decode",
    title: {
      en: "HTML Entity Decoder",
      ko: "HTML 엔티티 디코더",
      ja: "HTMLエンティティデコーダー",
    },
    description: {
      en: "Decode HTML entities to readable text. Convert &amp; &lt; &gt; back to original characters.",
      ko: "HTML 엔티티를 읽을 수 있는 텍스트로 디코딩합니다. &amp; &lt; &gt; 등을 원래 문자로 변환.",
      ja: "HTMLエンティティを読みやすいテキストにデコードします。&amp; &lt; &gt; などを元の文字に変換。",
    },
    keywords: {
      en: [
        "html entity decoder",
        "html decode",
        "html unescape",
        "decode html entities",
      ],
      ko: ["html 엔티티 디코더", "html 디코딩", "html 언이스케이프"],
      ja: [
        "html エンティティ デコーダー",
        "html デコード",
        "html アンエスケープ",
      ],
    },
    relatedTool: "html-entity",
  });

  // ASCII 인코딩
  conversions.push({
    from: "text",
    to: "ascii",
    category: "encoding",
    direction: "bidirectional",
    slug: "text-to-ascii",
    title: {
      en: "Text to ASCII Code Converter",
      ko: "텍스트를 ASCII 코드로 변환",
      ja: "テキストをASCIIコードに変換",
    },
    description: {
      en: "Convert text characters to ASCII code values. Get decimal ASCII values for each character.",
      ko: "텍스트 문자를 ASCII 코드 값으로 변환합니다. 각 문자의 10진수 ASCII 값을 얻으세요.",
      ja: "テキスト文字をASCIIコード値に変換します。各文字の10進数ASCII値を取得。",
    },
    keywords: {
      en: [
        "text to ascii",
        "ascii converter",
        "character to ascii",
        "ascii code",
      ],
      ko: ["텍스트 ascii 변환", "ascii 코드", "문자 ascii"],
      ja: ["テキスト ascii 変換", "ascii コード", "文字 ascii"],
    },
  });

  // ASCII 디코딩
  conversions.push({
    from: "ascii",
    to: "text",
    category: "encoding",
    direction: "bidirectional",
    slug: "ascii-to-text",
    title: {
      en: "ASCII Code to Text Converter",
      ko: "ASCII 코드를 텍스트로 변환",
      ja: "ASCIIコードをテキストに変換",
    },
    description: {
      en: "Convert ASCII code values to text characters. Decode ASCII numbers back to readable text.",
      ko: "ASCII 코드 값을 텍스트 문자로 변환합니다. ASCII 숫자를 읽을 수 있는 텍스트로 디코딩.",
      ja: "ASCIIコード値をテキスト文字に変換します。ASCII数値を読みやすいテキストにデコード。",
    },
    keywords: {
      en: [
        "ascii to text",
        "ascii decoder",
        "ascii to character",
        "decode ascii",
      ],
      ko: ["ascii 텍스트 변환", "ascii 디코더", "ascii 문자"],
      ja: ["ascii テキスト 変換", "ascii デコーダー", "ascii 文字"],
    },
  });

  return conversions;
}

/** 색상 변환 추가 (HSL ↔ RGB 역방향) */
export function generateColorConversions(): Conversion[] {
  const conversions: Conversion[] = [];

  // HSL to HEX (역방향)
  conversions.push({
    from: "hsl",
    to: "hex-color",
    category: "color",
    direction: "bidirectional",
    slug: "hsl-to-hex",
    title: {
      en: "HSL to HEX Converter",
      ko: "HSL을 HEX로 변환",
      ja: "HSLからHEXへ変換",
    },
    description: {
      en: "Convert HSL color values to HEX format. Transform hue, saturation, lightness to hexadecimal color codes.",
      ko: "HSL 색상 값을 HEX 형식으로 변환합니다. 색조, 채도, 명도를 16진수 색상 코드로 변환.",
      ja: "HSLカラー値をHEX形式に変換します。色相、彩度、明度を16進数カラーコードに変換。",
    },
    keywords: {
      en: [
        "hsl to hex",
        "hsl hex converter",
        "hsl to hexadecimal",
        "color hsl",
      ],
      ko: ["hsl hex 변환", "hsl 16진수", "색상 hsl 변환"],
      ja: ["hsl hex 変換", "hsl 16進数", "カラー hsl 変換"],
    },
    relatedTool: "color-picker",
  });

  // HSL to RGB
  conversions.push({
    from: "hsl",
    to: "rgb",
    category: "color",
    direction: "bidirectional",
    slug: "hsl-to-rgb",
    title: {
      en: "HSL to RGB Converter",
      ko: "HSL을 RGB로 변환",
      ja: "HSLからRGBへ変換",
    },
    description: {
      en: "Convert HSL color values to RGB format. Transform hue, saturation, lightness to red, green, blue values.",
      ko: "HSL 색상 값을 RGB 형식으로 변환합니다. 색조, 채도, 명도를 빨강, 초록, 파랑 값으로 변환.",
      ja: "HSLカラー値をRGB形式に変換します。色相、彩度、明度を赤、緑、青の値に変換。",
    },
    keywords: {
      en: ["hsl to rgb", "hsl rgb converter", "color format converter"],
      ko: ["hsl rgb 변환", "색상 형식 변환기"],
      ja: ["hsl rgb 変換", "カラー形式コンバーター"],
    },
    relatedTool: "color-picker",
  });

  return conversions;
}

/**
 * 모든 자동 생성 변환 반환
 */
export function getAllGeneratedConversions(): Conversion[] {
  return [
    ...generateDataConversions(),
    ...generateNumberConversions(),
    ...generateHashConversions(),
    ...generateEncodingConversions(),
    ...generateColorConversions(),
  ];
}
