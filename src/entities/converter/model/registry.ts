/**
 * Converter Registry - Programmatic SEO용 변환 정의 레지스트리
 *
 * 전략: 수동 정의(고품질 SEO) + 자동 생성(대량 롱테일) 하이브리드 방식
 * - 수동 정의: 핵심 키워드, 상세 SEO 메타데이터
 * - 자동 생성: 조합형 롱테일 키워드 대량 커버
 */

import type { Conversion } from "./types";
import { getAllGeneratedConversions } from "./generators";

// 수동 정의 변환 (고품질 SEO 콘텐츠)
const manualConversions: Conversion[] = [
  // ===============================
  // 데이터 직렬화 변환
  // ===============================
  {
    from: "json",
    to: "yaml",
    category: "data",
    direction: "bidirectional",
    slug: "json-to-yaml",
    title: {
      en: "JSON to YAML Converter",
      ko: "JSON을 YAML로 변환",
      ja: "JSONからYAMLへ変換",
    },
    description: {
      en: "Convert JSON data to YAML format instantly. Free online tool with syntax validation and formatting.",
      ko: "JSON 데이터를 YAML 형식으로 즉시 변환합니다. 문법 검증과 포맷팅이 포함된 무료 온라인 도구.",
      ja: "JSONデータをYAML形式に即座に変換します。構文検証とフォーマット機能付きの無料オンラインツール。",
    },
    keywords: {
      en: [
        "json to yaml",
        "convert json yaml",
        "json yaml converter",
        "json to yml",
        "yaml generator",
      ],
      ko: ["json yaml 변환", "json을 yaml로", "json yaml 변환기", "yml 변환"],
      ja: ["json yaml 変換", "json から yaml", "yaml コンバーター"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "yaml",
    to: "json",
    category: "data",
    direction: "bidirectional",
    slug: "yaml-to-json",
    title: {
      en: "YAML to JSON Converter",
      ko: "YAML을 JSON으로 변환",
      ja: "YAMLからJSONへ変換",
    },
    description: {
      en: "Convert YAML to JSON format online. Validate YAML syntax and get clean JSON output.",
      ko: "YAML을 JSON 형식으로 온라인 변환합니다. YAML 문법 검증 및 깔끔한 JSON 출력.",
      ja: "YAMLをJSON形式にオンラインで変換します。YAML構文の検証とクリーンなJSON出力。",
    },
    keywords: {
      en: ["yaml to json", "yml to json", "yaml json converter", "yaml parser"],
      ko: ["yaml json 변환", "yaml을 json으로", "yml 변환기"],
      ja: ["yaml json 変換", "yaml から json", "yaml パーサー"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "json",
    to: "csv",
    category: "data",
    direction: "bidirectional",
    slug: "json-to-csv",
    title: {
      en: "JSON to CSV Converter",
      ko: "JSON을 CSV로 변환",
      ja: "JSONからCSVへ変換",
    },
    description: {
      en: "Convert JSON array data to CSV format. Export JSON to spreadsheet-compatible CSV files.",
      ko: "JSON 배열 데이터를 CSV 형식으로 변환합니다. 스프레드시트 호환 CSV 파일로 내보내기.",
      ja: "JSON配列データをCSV形式に変換します。スプレッドシート互換のCSVファイルにエクスポート。",
    },
    keywords: {
      en: [
        "json to csv",
        "json csv converter",
        "json to excel",
        "json export csv",
      ],
      ko: ["json csv 변환", "json을 csv로", "json 엑셀 변환"],
      ja: ["json csv 変換", "json から csv", "json エクセル"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "csv",
    to: "json",
    category: "data",
    direction: "bidirectional",
    slug: "csv-to-json",
    title: {
      en: "CSV to JSON Converter",
      ko: "CSV를 JSON으로 변환",
      ja: "CSVからJSONへ変換",
    },
    description: {
      en: "Convert CSV data to JSON format. Transform spreadsheet data into structured JSON arrays.",
      ko: "CSV 데이터를 JSON 형식으로 변환합니다. 스프레드시트 데이터를 구조화된 JSON 배열로 변환.",
      ja: "CSVデータをJSON形式に変換します。スプレッドシートデータを構造化されたJSON配列に変換。",
    },
    keywords: {
      en: ["csv to json", "csv json converter", "csv parser", "excel to json"],
      ko: ["csv json 변환", "csv를 json으로", "csv 파서"],
      ja: ["csv json 変換", "csv から json", "csv パーサー"],
    },
    relatedTool: "json-formatter",
  },

  // ===============================
  // 인코딩 변환
  // ===============================
  {
    from: "text",
    to: "base64",
    category: "encoding",
    direction: "bidirectional",
    slug: "text-to-base64",
    title: {
      en: "Text to Base64 Encoder",
      ko: "텍스트를 Base64로 인코딩",
      ja: "テキストをBase64にエンコード",
    },
    description: {
      en: "Encode plain text to Base64 format. Secure text encoding for URLs, APIs, and data transmission.",
      ko: "일반 텍스트를 Base64 형식으로 인코딩합니다. URL, API, 데이터 전송을 위한 안전한 텍스트 인코딩.",
      ja: "プレーンテキストをBase64形式にエンコードします。URL、API、データ転送のための安全なテキストエンコード。",
    },
    keywords: {
      en: [
        "text to base64",
        "base64 encoder",
        "encode base64",
        "string to base64",
      ],
      ko: ["텍스트 base64 변환", "base64 인코딩", "문자열 base64"],
      ja: ["テキスト base64 変換", "base64 エンコード", "文字列 base64"],
    },
    relatedTool: "base64-converter",
  },
  {
    from: "base64",
    to: "text",
    category: "encoding",
    direction: "bidirectional",
    slug: "base64-to-text",
    title: {
      en: "Base64 to Text Decoder",
      ko: "Base64를 텍스트로 디코딩",
      ja: "Base64をテキストにデコード",
    },
    description: {
      en: "Decode Base64 encoded strings to plain text. Fast and secure Base64 decoding online.",
      ko: "Base64로 인코딩된 문자열을 일반 텍스트로 디코딩합니다. 빠르고 안전한 온라인 Base64 디코딩.",
      ja: "Base64でエンコードされた文字列をプレーンテキストにデコードします。高速で安全なオンラインBase64デコード。",
    },
    keywords: {
      en: [
        "base64 to text",
        "base64 decoder",
        "decode base64",
        "base64 to string",
      ],
      ko: ["base64 텍스트 변환", "base64 디코딩", "base64 문자열"],
      ja: ["base64 テキスト 変換", "base64 デコード", "base64 文字列"],
    },
    relatedTool: "base64-converter",
  },
  {
    from: "text",
    to: "url",
    category: "encoding",
    direction: "bidirectional",
    slug: "url-encode",
    title: {
      en: "URL Encoder Online",
      ko: "URL 인코더 온라인",
      ja: "URLエンコーダーオンライン",
    },
    description: {
      en: "Encode text for safe URL usage. Convert special characters to URL-safe percent encoding.",
      ko: "안전한 URL 사용을 위한 텍스트 인코딩. 특수문자를 URL-safe 퍼센트 인코딩으로 변환.",
      ja: "安全なURL使用のためのテキストエンコード。特殊文字をURL安全なパーセントエンコードに変換。",
    },
    keywords: {
      en: ["url encoder", "url encode online", "percent encoding", "urlencode"],
      ko: ["url 인코더", "url 인코딩", "퍼센트 인코딩"],
      ja: ["url エンコーダー", "url エンコード", "パーセントエンコード"],
    },
    relatedTool: "url-encoder",
  },
  {
    from: "url",
    to: "text",
    category: "encoding",
    direction: "bidirectional",
    slug: "url-decode",
    title: {
      en: "URL Decoder Online",
      ko: "URL 디코더 온라인",
      ja: "URLデコーダーオンライン",
    },
    description: {
      en: "Decode URL-encoded strings to readable text. Convert percent encoding back to original characters.",
      ko: "URL 인코딩된 문자열을 읽을 수 있는 텍스트로 디코딩. 퍼센트 인코딩을 원래 문자로 변환.",
      ja: "URLエンコードされた文字列を読みやすいテキストにデコード。パーセントエンコードを元の文字に変換。",
    },
    keywords: {
      en: [
        "url decoder",
        "url decode online",
        "urldecode",
        "decode percent encoding",
      ],
      ko: ["url 디코더", "url 디코딩", "url 해독"],
      ja: ["url デコーダー", "url デコード", "url 解読"],
    },
    relatedTool: "url-encoder",
  },

  // ===============================
  // 색상 변환
  // ===============================
  {
    from: "hex-color",
    to: "rgb",
    category: "color",
    direction: "bidirectional",
    slug: "hex-to-rgb",
    title: {
      en: "HEX to RGB Converter",
      ko: "HEX를 RGB로 변환",
      ja: "HEXからRGBへ変換",
    },
    description: {
      en: "Convert HEX color codes to RGB values. Get RGB values from any hexadecimal color code.",
      ko: "HEX 색상 코드를 RGB 값으로 변환합니다. 16진수 색상 코드에서 RGB 값을 얻으세요.",
      ja: "HEXカラーコードをRGB値に変換します。16進数のカラーコードからRGB値を取得。",
    },
    keywords: {
      en: [
        "hex to rgb",
        "hex rgb converter",
        "color converter",
        "hex color to rgb",
      ],
      ko: ["hex rgb 변환", "16진수 rgb", "색상 변환기"],
      ja: ["hex rgb 変換", "16進数 rgb", "カラーコンバーター"],
    },
    relatedTool: "color-picker",
  },
  {
    from: "rgb",
    to: "hex-color",
    category: "color",
    direction: "bidirectional",
    slug: "rgb-to-hex",
    title: {
      en: "RGB to HEX Converter",
      ko: "RGB를 HEX로 변환",
      ja: "RGBからHEXへ変換",
    },
    description: {
      en: "Convert RGB color values to HEX format. Get hexadecimal color codes from RGB values.",
      ko: "RGB 색상 값을 HEX 형식으로 변환합니다. RGB 값에서 16진수 색상 코드를 얻으세요.",
      ja: "RGBカラー値をHEX形式に変換します。RGB値から16進数のカラーコードを取得。",
    },
    keywords: {
      en: [
        "rgb to hex",
        "rgb hex converter",
        "color to hex",
        "rgb to hexadecimal",
      ],
      ko: ["rgb hex 변환", "rgb 16진수", "색상 hex 변환"],
      ja: ["rgb hex 変換", "rgb 16進数", "カラー hex 変換"],
    },
    relatedTool: "color-picker",
  },
  {
    from: "hex-color",
    to: "hsl",
    category: "color",
    direction: "bidirectional",
    slug: "hex-to-hsl",
    title: {
      en: "HEX to HSL Converter",
      ko: "HEX를 HSL로 변환",
      ja: "HEXからHSLへ変換",
    },
    description: {
      en: "Convert HEX color codes to HSL format. Get hue, saturation, and lightness values.",
      ko: "HEX 색상 코드를 HSL 형식으로 변환합니다. 색조, 채도, 명도 값을 얻으세요.",
      ja: "HEXカラーコードをHSL形式に変換します。色相、彩度、明度の値を取得。",
    },
    keywords: {
      en: ["hex to hsl", "hex hsl converter", "color hsl", "hsl color"],
      ko: ["hex hsl 변환", "색상 hsl", "hsl 변환기"],
      ja: ["hex hsl 変換", "カラー hsl", "hsl コンバーター"],
    },
    relatedTool: "color-picker",
  },
  {
    from: "rgb",
    to: "hsl",
    category: "color",
    direction: "bidirectional",
    slug: "rgb-to-hsl",
    title: {
      en: "RGB to HSL Converter",
      ko: "RGB를 HSL로 변환",
      ja: "RGBからHSLへ変換",
    },
    description: {
      en: "Convert RGB color values to HSL format. Transform red, green, blue to hue, saturation, lightness.",
      ko: "RGB 색상 값을 HSL 형식으로 변환합니다. 빨강, 초록, 파랑을 색조, 채도, 명도로 변환.",
      ja: "RGBカラー値をHSL形式に変換します。赤、緑、青を色相、彩度、明度に変換。",
    },
    keywords: {
      en: ["rgb to hsl", "rgb hsl converter", "color format conversion"],
      ko: ["rgb hsl 변환", "색상 형식 변환"],
      ja: ["rgb hsl 変換", "カラー形式変換"],
    },
    relatedTool: "color-picker",
  },

  // ===============================
  // 숫자 진법 변환
  // ===============================
  {
    from: "decimal",
    to: "binary-num",
    category: "number",
    direction: "bidirectional",
    slug: "decimal-to-binary",
    title: {
      en: "Decimal to Binary Converter",
      ko: "10진수를 2진수로 변환",
      ja: "10進数から2進数へ変換",
    },
    description: {
      en: "Convert decimal numbers to binary. Fast and accurate base-10 to base-2 conversion.",
      ko: "10진수를 2진수로 변환합니다. 빠르고 정확한 10진법에서 2진법 변환.",
      ja: "10進数を2進数に変換します。高速で正確な10進法から2進法への変換。",
    },
    keywords: {
      en: [
        "decimal to binary",
        "number converter",
        "base converter",
        "binary number",
      ],
      ko: ["10진수 2진수 변환", "진법 변환", "이진수 변환"],
      ja: ["10進数 2進数 変換", "進数変換", "バイナリ変換"],
    },
    relatedTool: "base-converter",
  },
  {
    from: "decimal",
    to: "hexadecimal",
    category: "number",
    direction: "bidirectional",
    slug: "decimal-to-hex",
    title: {
      en: "Decimal to Hexadecimal Converter",
      ko: "10진수를 16진수로 변환",
      ja: "10進数から16進数へ変換",
    },
    description: {
      en: "Convert decimal numbers to hexadecimal. Base-10 to base-16 conversion for programming.",
      ko: "10진수를 16진수로 변환합니다. 프로그래밍을 위한 10진법에서 16진법 변환.",
      ja: "10進数を16進数に変換します。プログラミングのための10進法から16進法への変換。",
    },
    keywords: {
      en: [
        "decimal to hex",
        "decimal to hexadecimal",
        "hex converter",
        "number to hex",
      ],
      ko: ["10진수 16진수 변환", "hex 변환", "16진수 변환기"],
      ja: ["10進数 16進数 変換", "hex 変換", "16進数コンバーター"],
    },
    relatedTool: "base-converter",
  },
  {
    from: "binary-num",
    to: "decimal",
    category: "number",
    direction: "bidirectional",
    slug: "binary-to-decimal",
    title: {
      en: "Binary to Decimal Converter",
      ko: "2진수를 10진수로 변환",
      ja: "2進数から10進数へ変換",
    },
    description: {
      en: "Convert binary numbers to decimal. Fast base-2 to base-10 conversion.",
      ko: "2진수를 10진수로 변환합니다. 빠른 2진법에서 10진법 변환.",
      ja: "2進数を10進数に変換します。高速な2進法から10進法への変換。",
    },
    keywords: {
      en: ["binary to decimal", "binary converter", "base 2 to base 10"],
      ko: ["2진수 10진수 변환", "이진수 변환", "진법 변환기"],
      ja: ["2進数 10進数 変換", "バイナリ変換", "進数コンバーター"],
    },
    relatedTool: "base-converter",
  },
  {
    from: "hexadecimal",
    to: "decimal",
    category: "number",
    direction: "bidirectional",
    slug: "hex-to-decimal",
    title: {
      en: "Hexadecimal to Decimal Converter",
      ko: "16진수를 10진수로 변환",
      ja: "16進数から10進数へ変換",
    },
    description: {
      en: "Convert hexadecimal numbers to decimal. Base-16 to base-10 conversion online.",
      ko: "16진수를 10진수로 변환합니다. 온라인 16진법에서 10진법 변환.",
      ja: "16進数を10進数に変換します。オンライン16進法から10進法への変換。",
    },
    keywords: {
      en: [
        "hex to decimal",
        "hexadecimal to decimal",
        "hex converter",
        "base 16 to base 10",
      ],
      ko: ["16진수 10진수 변환", "hex 변환", "16진법 변환"],
      ja: ["16進数 10進数 変換", "hex 変換", "16進法変換"],
    },
    relatedTool: "base-converter",
  },

  // ===============================
  // 해시 생성 (단방향)
  // ===============================
  {
    from: "text",
    to: "md5",
    category: "hash",
    direction: "one-way",
    slug: "md5-hash-generator",
    title: {
      en: "MD5 Hash Generator",
      ko: "MD5 해시 생성기",
      ja: "MD5ハッシュ生成器",
    },
    description: {
      en: "Generate MD5 hash from text. Fast and secure MD5 checksum calculator online.",
      ko: "텍스트에서 MD5 해시를 생성합니다. 빠르고 안전한 온라인 MD5 체크섬 계산기.",
      ja: "テキストからMD5ハッシュを生成します。高速で安全なオンラインMD5チェックサム計算機。",
    },
    keywords: {
      en: ["md5 generator", "md5 hash", "md5 checksum", "generate md5"],
      ko: ["md5 생성기", "md5 해시", "md5 체크섬"],
      ja: ["md5 生成器", "md5 ハッシュ", "md5 チェックサム"],
    },
    relatedTool: "hash-generator",
  },
  {
    from: "text",
    to: "sha256",
    category: "hash",
    direction: "one-way",
    slug: "sha256-hash-generator",
    title: {
      en: "SHA256 Hash Generator",
      ko: "SHA256 해시 생성기",
      ja: "SHA256ハッシュ生成器",
    },
    description: {
      en: "Generate SHA256 hash from text. Secure SHA-256 checksum generator for data integrity.",
      ko: "텍스트에서 SHA256 해시를 생성합니다. 데이터 무결성을 위한 안전한 SHA-256 체크섬 생성기.",
      ja: "テキストからSHA256ハッシュを生成します。データ整合性のための安全なSHA-256チェックサム生成器。",
    },
    keywords: {
      en: [
        "sha256 generator",
        "sha256 hash",
        "sha-256 checksum",
        "generate sha256",
      ],
      ko: ["sha256 생성기", "sha256 해시", "sha-256 체크섬"],
      ja: ["sha256 生成器", "sha256 ハッシュ", "sha-256 チェックサム"],
    },
    relatedTool: "hash-generator",
  },

  // ===============================
  // 시간 변환
  // ===============================
  {
    from: "unix",
    to: "datetime",
    category: "time",
    direction: "bidirectional",
    slug: "unix-to-date",
    title: {
      en: "Unix Timestamp to Date Converter",
      ko: "Unix 타임스탬프를 날짜로 변환",
      ja: "Unixタイムスタンプを日付に変換",
    },
    description: {
      en: "Convert Unix timestamp to human-readable date. Epoch time converter with timezone support.",
      ko: "Unix 타임스탬프를 사람이 읽을 수 있는 날짜로 변환합니다. 타임존을 지원하는 Epoch 시간 변환기.",
      ja: "Unixタイムスタンプを人間が読める日付に変換します。タイムゾーンをサポートするエポック時間コンバーター。",
    },
    keywords: {
      en: [
        "unix timestamp to date",
        "epoch converter",
        "timestamp converter",
        "unix time",
      ],
      ko: ["unix 타임스탬프 변환", "epoch 변환", "타임스탬프 날짜"],
      ja: ["unix タイムスタンプ 変換", "epoch 変換", "タイムスタンプ 日付"],
    },
    relatedTool: "unix-timestamp",
  },
  {
    from: "datetime",
    to: "unix",
    category: "time",
    direction: "bidirectional",
    slug: "date-to-unix",
    title: {
      en: "Date to Unix Timestamp Converter",
      ko: "날짜를 Unix 타임스탬프로 변환",
      ja: "日付をUnixタイムスタンプに変換",
    },
    description: {
      en: "Convert date and time to Unix timestamp. Get epoch time from any date format.",
      ko: "날짜와 시간을 Unix 타임스탬프로 변환합니다. 모든 날짜 형식에서 Epoch 시간을 얻으세요.",
      ja: "日付と時刻をUnixタイムスタンプに変換します。任意の日付形式からエポック時間を取得。",
    },
    keywords: {
      en: [
        "date to unix",
        "date to timestamp",
        "date to epoch",
        "datetime converter",
      ],
      ko: ["날짜 unix 변환", "날짜 타임스탬프", "epoch 변환"],
      ja: ["日付 unix 変換", "日付 タイムスタンプ", "epoch 変換"],
    },
    relatedTool: "unix-timestamp",
  },

  // ===============================
  // 코드 변환
  // ===============================
  {
    from: "json",
    to: "typescript",
    category: "code",
    direction: "one-way",
    slug: "json-to-typescript",
    title: {
      en: "JSON to TypeScript Interface",
      ko: "JSON을 TypeScript 인터페이스로 변환",
      ja: "JSONからTypeScriptインターフェースへ変換",
    },
    description: {
      en: "Convert JSON to TypeScript interfaces. Generate type definitions from JSON data automatically.",
      ko: "JSON을 TypeScript 인터페이스로 변환합니다. JSON 데이터에서 타입 정의를 자동 생성.",
      ja: "JSONをTypeScriptインターフェースに変換します。JSONデータから型定義を自動生成。",
    },
    keywords: {
      en: [
        "json to typescript",
        "json to ts",
        "generate interface",
        "type generator",
      ],
      ko: ["json typescript 변환", "json 타입 생성", "인터페이스 생성"],
      ja: ["json typescript 変換", "json 型生成", "インターフェース生成"],
    },
    relatedTool: "json-to-typescript",
  },
  {
    from: "css",
    to: "tailwind",
    category: "code",
    direction: "one-way",
    slug: "css-to-tailwind",
    title: {
      en: "CSS to Tailwind Converter",
      ko: "CSS를 Tailwind로 변환",
      ja: "CSSからTailwindへ変換",
    },
    description: {
      en: "Convert CSS properties to Tailwind CSS classes. Transform your CSS code to utility-first classes.",
      ko: "CSS 속성을 Tailwind CSS 클래스로 변환합니다. CSS 코드를 유틸리티-퍼스트 클래스로 변환.",
      ja: "CSSプロパティをTailwind CSSクラスに変換します。CSSコードをユーティリティファーストクラスに変換。",
    },
    keywords: {
      en: [
        "css to tailwind",
        "tailwind converter",
        "css tailwind",
        "utility classes",
      ],
      ko: ["css tailwind 변환", "tailwind 변환기", "유틸리티 클래스"],
      ja: [
        "css tailwind 変換",
        "tailwind コンバーター",
        "ユーティリティクラス",
      ],
    },
    relatedTool: "css-to-tailwind",
  },

  // ===============================
  // XML 변환 (Programmatic SEO)
  // ===============================
  {
    from: "json",
    to: "xml",
    category: "data",
    direction: "bidirectional",
    slug: "json-to-xml",
    title: {
      en: "JSON to XML Converter",
      ko: "JSON을 XML로 변환",
      ja: "JSONからXMLへ変換",
    },
    description: {
      en: "Convert JSON to XML format instantly. Free online converter with proper formatting and validation.",
      ko: "JSON을 XML 형식으로 즉시 변환합니다. 적절한 포맷팅과 유효성 검사가 가능한 무료 온라인 변환기.",
      ja: "JSONをXML形式に即座に変換します。適切なフォーマットと検証が可能な無料オンラインコンバーター。",
    },
    keywords: {
      en: [
        "json to xml",
        "json xml converter",
        "convert json to xml",
        "xml generator",
      ],
      ko: ["json xml 변환", "json을 xml로", "json xml 변환기"],
      ja: ["json xml 変換", "json から xml", "xml コンバーター"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "xml",
    to: "json",
    category: "data",
    direction: "bidirectional",
    slug: "xml-to-json",
    title: {
      en: "XML to JSON Converter",
      ko: "XML을 JSON으로 변환",
      ja: "XMLからJSONへ変換",
    },
    description: {
      en: "Convert XML to JSON format instantly. Preserve structure and attributes. Perfect for API modernization.",
      ko: "XML을 JSON 형식으로 즉시 변환합니다. 구조와 속성을 보존합니다. API 현대화에 적합합니다.",
      ja: "XMLをJSON形式に即座に変換します。構造と属性を保持します。APIモダナイゼーションに最適です。",
    },
    keywords: {
      en: [
        "xml to json",
        "xml json converter",
        "convert xml to json",
        "xml parser",
      ],
      ko: ["xml json 변환", "xml을 json으로", "xml 파서"],
      ja: ["xml json 変換", "xml から json", "xml パーサー"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "yaml",
    to: "xml",
    category: "data",
    direction: "bidirectional",
    slug: "yaml-to-xml",
    title: {
      en: "YAML to XML Converter",
      ko: "YAML을 XML로 변환",
      ja: "YAMLからXMLへ変換",
    },
    description: {
      en: "Convert YAML to XML format instantly. Bridge modern and legacy systems with proper XML structure.",
      ko: "YAML을 XML 형식으로 즉시 변환합니다. 적절한 XML 구조로 현대 시스템과 레거시 시스템을 연결합니다.",
      ja: "YAMLをXML形式に即座に変換します。適切なXML構造でモダンシステムとレガシーシステムを橋渡しします。",
    },
    keywords: {
      en: [
        "yaml to xml",
        "yaml xml converter",
        "convert yaml to xml",
        "yml to xml",
      ],
      ko: ["yaml xml 변환", "yaml을 xml로", "yml xml 변환"],
      ja: ["yaml xml 変換", "yaml から xml", "yml xml 変換"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "xml",
    to: "yaml",
    category: "data",
    direction: "bidirectional",
    slug: "xml-to-yaml",
    title: {
      en: "XML to YAML Converter",
      ko: "XML을 YAML로 변환",
      ja: "XMLからYAMLへ変換",
    },
    description: {
      en: "Convert XML to YAML format instantly. Simplify complex XML configurations into readable YAML.",
      ko: "XML을 YAML 형식으로 즉시 변환합니다. 복잡한 XML 설정을 읽기 쉬운 YAML로 단순화합니다.",
      ja: "XMLをYAML形式に即座に変換します。複雑なXML設定を読みやすいYAMLに簡素化します。",
    },
    keywords: {
      en: [
        "xml to yaml",
        "xml yaml converter",
        "convert xml to yaml",
        "xml to yml",
      ],
      ko: ["xml yaml 변환", "xml을 yaml로", "xml yml 변환"],
      ja: ["xml yaml 変換", "xml から yaml", "xml yml 変換"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "xml",
    to: "csv",
    category: "data",
    direction: "bidirectional",
    slug: "xml-to-csv",
    title: {
      en: "XML to CSV Converter",
      ko: "XML을 CSV로 변환",
      ja: "XMLからCSVへ変換",
    },
    description: {
      en: "Convert XML data to CSV format for Excel and spreadsheet analysis. Flatten XML structure automatically.",
      ko: "Excel 및 스프레드시트 분석을 위해 XML 데이터를 CSV 형식으로 변환합니다.",
      ja: "ExcelやスプレッドシートでのデータをCSV形式に変換します。XML構造を自動的にフラット化します。",
    },
    keywords: {
      en: [
        "xml to csv",
        "xml csv converter",
        "convert xml to csv",
        "xml to excel",
      ],
      ko: ["xml csv 변환", "xml을 csv로", "xml 엑셀 변환"],
      ja: ["xml csv 変換", "xml から csv", "xml エクセル 変換"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "csv",
    to: "xml",
    category: "data",
    direction: "bidirectional",
    slug: "csv-to-xml",
    title: {
      en: "CSV to XML Converter",
      ko: "CSV를 XML로 변환",
      ja: "CSVからXMLへ変換",
    },
    description: {
      en: "Convert CSV spreadsheet data to XML format. Customize root element and row names for data interchange.",
      ko: "CSV 스프레드시트 데이터를 XML 형식으로 변환합니다. 루트 요소 및 행 이름을 사용자 정의할 수 있습니다.",
      ja: "CSVスプレッドシートデータをXML形式に変換します。データ交換用にルート要素と行名をカスタマイズできます。",
    },
    keywords: {
      en: [
        "csv to xml",
        "csv xml converter",
        "convert csv to xml",
        "excel to xml",
      ],
      ko: ["csv xml 변환", "csv를 xml로", "엑셀 xml 변환"],
      ja: ["csv xml 変換", "csv から xml", "エクセル xml 変換"],
    },
    relatedTool: "json-formatter",
  },

  // ===============================
  // TOML 변환 (Programmatic SEO)
  // ===============================
  {
    from: "json",
    to: "toml",
    category: "data",
    direction: "bidirectional",
    slug: "json-to-toml",
    title: {
      en: "JSON to TOML Converter",
      ko: "JSON을 TOML로 변환",
      ja: "JSONからTOMLへ変換",
    },
    description: {
      en: "Convert JSON to TOML format instantly. Perfect for Rust Cargo.toml, Python pyproject.toml configuration.",
      ko: "JSON을 TOML 형식으로 즉시 변환합니다. Rust Cargo.toml, Python pyproject.toml 설정에 완벽합니다.",
      ja: "JSONをTOML形式に即座に変換します。Rust Cargo.toml、Python pyproject.toml設定に最適です。",
    },
    keywords: {
      en: [
        "json to toml",
        "json toml converter",
        "cargo.toml",
        "pyproject.toml",
      ],
      ko: ["json toml 변환", "json을 toml로", "cargo.toml 생성"],
      ja: ["json toml 変換", "json から toml", "cargo.toml 生成"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "toml",
    to: "json",
    category: "data",
    direction: "bidirectional",
    slug: "toml-to-json",
    title: {
      en: "TOML to JSON Converter",
      ko: "TOML을 JSON으로 변환",
      ja: "TOMLからJSONへ変換",
    },
    description: {
      en: "Convert TOML configuration to JSON format instantly. Validate Cargo.toml, pyproject.toml files.",
      ko: "TOML 설정을 JSON 형식으로 즉시 변환합니다. Cargo.toml, pyproject.toml 파일을 검증합니다.",
      ja: "TOML設定をJSON形式に即座に変換します。Cargo.toml、pyproject.tomlファイルを検証します。",
    },
    keywords: {
      en: [
        "toml to json",
        "toml json converter",
        "toml parser",
        "cargo.toml parser",
      ],
      ko: ["toml json 변환", "toml을 json으로", "toml 파서"],
      ja: ["toml json 変換", "toml から json", "toml パーサー"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "yaml",
    to: "toml",
    category: "data",
    direction: "bidirectional",
    slug: "yaml-to-toml",
    title: {
      en: "YAML to TOML Converter",
      ko: "YAML을 TOML로 변환",
      ja: "YAMLからTOMLへ変換",
    },
    description: {
      en: "Convert YAML to TOML format instantly. Migrate configuration files to TOML for Rust and Python.",
      ko: "YAML을 TOML 형식으로 즉시 변환합니다. Rust, Python용 설정 파일을 TOML로 마이그레이션합니다.",
      ja: "YAMLをTOML形式に即座に変換します。RustやPython用に設定ファイルをTOMLに移行します。",
    },
    keywords: {
      en: [
        "yaml to toml",
        "yaml toml converter",
        "yml to toml",
        "config migration",
      ],
      ko: ["yaml toml 변환", "yaml을 toml로", "yml toml 변환"],
      ja: ["yaml toml 変換", "yaml から toml", "yml toml 変換"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "toml",
    to: "yaml",
    category: "data",
    direction: "bidirectional",
    slug: "toml-to-yaml",
    title: {
      en: "TOML to YAML Converter",
      ko: "TOML을 YAML로 변환",
      ja: "TOMLからYAMLへ変換",
    },
    description: {
      en: "Convert TOML to YAML format instantly. Migrate between configuration formats for different toolchains.",
      ko: "TOML을 YAML 형식으로 즉시 변환합니다. 다양한 도구 체인에 맞게 설정 형식을 마이그레이션합니다.",
      ja: "TOMLをYAML形式に即座に変換します。異なるツールチェーン用に設定形式間を移行します。",
    },
    keywords: {
      en: [
        "toml to yaml",
        "toml yaml converter",
        "toml to yml",
        "config conversion",
      ],
      ko: ["toml yaml 변환", "toml을 yaml로", "toml yml 변환"],
      ja: ["toml yaml 変換", "toml から yaml", "toml yml 変換"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "xml",
    to: "toml",
    category: "data",
    direction: "bidirectional",
    slug: "xml-to-toml",
    title: {
      en: "XML to TOML Converter",
      ko: "XML을 TOML로 변환",
      ja: "XMLからTOMLへ変換",
    },
    description: {
      en: "Convert XML configuration to TOML format. Modernize legacy XML configs to TOML.",
      ko: "XML 설정을 TOML 형식으로 변환합니다. 레거시 XML 설정을 TOML로 현대화합니다.",
      ja: "XML設定をTOML形式に変換します。レガシーXML設定をTOMLにモダナイズします。",
    },
    keywords: {
      en: ["xml to toml", "xml toml converter", "config modernization"],
      ko: ["xml toml 변환", "xml을 toml로", "설정 현대화"],
      ja: ["xml toml 変換", "xml から toml", "設定モダナイズ"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "toml",
    to: "xml",
    category: "data",
    direction: "bidirectional",
    slug: "toml-to-xml",
    title: {
      en: "TOML to XML Converter",
      ko: "TOML을 XML로 변환",
      ja: "TOMLからXMLへ変換",
    },
    description: {
      en: "Convert TOML to XML format. Bridge modern TOML configs with legacy XML systems.",
      ko: "TOML을 XML 형식으로 변환합니다. 현대 TOML 설정을 레거시 XML 시스템과 연결합니다.",
      ja: "TOMLをXML形式に変換します。モダンなTOML設定をレガシーXMLシステムと橋渡しします。",
    },
    keywords: {
      en: ["toml to xml", "toml xml converter", "legacy integration"],
      ko: ["toml xml 변환", "toml을 xml로", "레거시 통합"],
      ja: ["toml xml 変換", "toml から xml", "レガシー統合"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "csv",
    to: "toml",
    category: "data",
    direction: "bidirectional",
    slug: "csv-to-toml",
    title: {
      en: "CSV to TOML Converter",
      ko: "CSV를 TOML로 변환",
      ja: "CSVからTOMLへ変換",
    },
    description: {
      en: "Convert CSV data to TOML format. Transform spreadsheet data into TOML configuration.",
      ko: "CSV 데이터를 TOML 형식으로 변환합니다. 스프레드시트 데이터를 TOML 설정으로 변환합니다.",
      ja: "CSVデータをTOML形式に変換します。スプレッドシートデータをTOML設定に変換します。",
    },
    keywords: {
      en: ["csv to toml", "csv toml converter", "spreadsheet to toml"],
      ko: ["csv toml 변환", "csv를 toml로", "스프레드시트 toml"],
      ja: ["csv toml 変換", "csv から toml", "スプレッドシート toml"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "toml",
    to: "csv",
    category: "data",
    direction: "bidirectional",
    slug: "toml-to-csv",
    title: {
      en: "TOML to CSV Converter",
      ko: "TOML을 CSV로 변환",
      ja: "TOMLからCSVへ変換",
    },
    description: {
      en: "Convert TOML data to CSV format. Export TOML configuration to spreadsheet-compatible format.",
      ko: "TOML 데이터를 CSV 형식으로 변환합니다. TOML 설정을 스프레드시트 호환 형식으로 내보냅니다.",
      ja: "TOMLデータをCSV形式に変換します。TOML設定をスプレッドシート互換形式にエクスポートします。",
    },
    keywords: {
      en: ["toml to csv", "toml csv converter", "toml to excel"],
      ko: ["toml csv 변환", "toml을 csv로", "toml 엑셀 변환"],
      ja: ["toml csv 変換", "toml から csv", "toml エクセル 変換"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "csv",
    to: "yaml",
    category: "data",
    direction: "bidirectional",
    slug: "csv-to-yaml",
    title: {
      en: "CSV to YAML Converter",
      ko: "CSV를 YAML로 변환",
      ja: "CSVからYAMLへ変換",
    },
    description: {
      en: "Convert CSV data to YAML format. Perfect for configuration files and DevOps automation.",
      ko: "CSV 데이터를 YAML 형식으로 변환합니다. 설정 파일 및 DevOps 자동화에 완벽합니다.",
      ja: "CSVデータをYAML形式に変換します。設定ファイルやDevOps自動化に最適です。",
    },
    keywords: {
      en: [
        "csv to yaml",
        "csv yaml converter",
        "spreadsheet to yaml",
        "csv to yml",
      ],
      ko: ["csv yaml 변환", "csv를 yaml로", "csv yml 변환"],
      ja: ["csv yaml 変換", "csv から yaml", "csv yml 変換"],
    },
    relatedTool: "json-formatter",
  },
  {
    from: "yaml",
    to: "csv",
    category: "data",
    direction: "bidirectional",
    slug: "yaml-to-csv",
    title: {
      en: "YAML to CSV Converter",
      ko: "YAML을 CSV로 변환",
      ja: "YAMLからCSVへ変換",
    },
    description: {
      en: "Convert YAML array data to CSV format. Export YAML to Excel-compatible spreadsheet format.",
      ko: "YAML 배열 데이터를 CSV 형식으로 변환합니다. YAML을 Excel 호환 스프레드시트로 내보냅니다.",
      ja: "YAML配列データをCSV形式に変換します。YAMLをExcel互換のスプレッドシート形式にエクスポートします。",
    },
    keywords: {
      en: ["yaml to csv", "yaml csv converter", "yml to csv", "yaml to excel"],
      ko: ["yaml csv 변환", "yaml을 csv로", "yml csv 변환"],
      ja: ["yaml csv 変換", "yaml から csv", "yml csv 変換"],
    },
    relatedTool: "json-formatter",
  },
];

// ===============================
// 전체 변환 목록 (수동 + 자동 생성)
// ===============================
export const conversions: Conversion[] = [
  ...manualConversions,
  ...getAllGeneratedConversions(),
];

// 헬퍼 함수들
export function getConversionBySlug(slug: string): Conversion | undefined {
  return conversions.find((c) => c.slug === slug);
}

export function getAllConversionSlugs(): string[] {
  return conversions.map((c) => c.slug);
}

export function getConversionsByCategory(
  category: Conversion["category"],
): Conversion[] {
  return conversions.filter((c) => c.category === category);
}

export function getBidirectionalConversions(): Conversion[] {
  return conversions.filter((c) => c.direction === "bidirectional");
}

// 역변환 slug 생성 (예: json-to-yaml → yaml-to-json)
export function getReverseSlug(slug: string): string | null {
  const conversion = getConversionBySlug(slug);
  if (!conversion || conversion.direction !== "bidirectional") return null;

  const reverseSlug = `${conversion.to}-to-${conversion.from}`.replace(
    /-color|-num/g,
    "",
  );
  return getAllConversionSlugs().includes(reverseSlug) ? reverseSlug : null;
}

// 통계 정보
export function getConversionStats() {
  return {
    total: conversions.length,
    manual: manualConversions.length,
    generated: getAllGeneratedConversions().length,
    byCategory: {
      data: conversions.filter((c) => c.category === "data").length,
      encoding: conversions.filter((c) => c.category === "encoding").length,
      color: conversions.filter((c) => c.category === "color").length,
      number: conversions.filter((c) => c.category === "number").length,
      hash: conversions.filter((c) => c.category === "hash").length,
      time: conversions.filter((c) => c.category === "time").length,
      code: conversions.filter((c) => c.category === "code").length,
    },
  };
}
