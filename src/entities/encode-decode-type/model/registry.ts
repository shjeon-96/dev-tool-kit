/**
 * Encode/Decode Type Registry
 * 인코딩/디코딩 pSEO 페이지를 위한 데이터 레지스트리
 */

import type { EncodeDecodeType, LocaleKey } from "./types";

export const allEncodeDecodeTypes: EncodeDecodeType[] = [
  // === Base64 계열 ===
  {
    slug: "base64",
    name: "Base64",
    mode: "both",
    category: "binary",
    title: {
      en: "Base64 Encoder & Decoder",
      ko: "Base64 인코더 & 디코더",
      ja: "Base64エンコーダー＆デコーダー",
    },
    description: {
      en: "Convert text to Base64 encoding and decode Base64 back to plain text. Essential for data transmission and storage.",
      ko: "텍스트를 Base64로 인코딩하고 Base64를 다시 일반 텍스트로 디코딩합니다. 데이터 전송 및 저장에 필수적입니다.",
      ja: "テキストをBase64にエンコードし、Base64をプレーンテキストにデコードします。データ転送と保存に不可欠です。",
    },
    keywords: {
      en: [
        "base64 encoder",
        "base64 decoder",
        "base64 converter",
        "encode to base64",
        "decode base64",
      ],
      ko: [
        "base64 인코더",
        "base64 디코더",
        "base64 변환",
        "base64 인코딩",
        "base64 디코딩",
      ],
      ja: [
        "base64エンコーダー",
        "base64デコーダー",
        "base64変換",
        "base64エンコード",
        "base64デコード",
      ],
    },
    useCases: {
      en: [
        "Email attachments (MIME)",
        "Data URLs in HTML/CSS",
        "API data transmission",
        "Binary data in JSON",
      ],
      ko: [
        "이메일 첨부파일 (MIME)",
        "HTML/CSS의 Data URL",
        "API 데이터 전송",
        "JSON의 바이너리 데이터",
      ],
      ja: [
        "メール添付ファイル（MIME）",
        "HTML/CSSのData URL",
        "APIデータ転送",
        "JSONのバイナリデータ",
      ],
    },
  },
  {
    slug: "base64url",
    name: "Base64URL",
    mode: "both",
    category: "binary",
    title: {
      en: "Base64URL Encoder & Decoder",
      ko: "Base64URL 인코더 & 디코더",
      ja: "Base64URLエンコーダー＆デコーダー",
    },
    description: {
      en: "URL-safe Base64 encoding without padding. Perfect for JWT tokens and URL parameters.",
      ko: "패딩 없이 URL에 안전한 Base64 인코딩입니다. JWT 토큰과 URL 파라미터에 적합합니다.",
      ja: "パディングなしのURL安全なBase64エンコーディング。JWTトークンとURLパラメータに最適です。",
    },
    keywords: {
      en: [
        "base64url",
        "url safe base64",
        "jwt encoding",
        "url parameter encoding",
      ],
      ko: ["base64url", "url 안전 base64", "jwt 인코딩", "url 파라미터 인코딩"],
      ja: [
        "base64url",
        "url安全base64",
        "jwtエンコーディング",
        "urlパラメータエンコーディング",
      ],
    },
    useCases: {
      en: [
        "JWT tokens",
        "URL query parameters",
        "OAuth tokens",
        "WebSocket authentication",
      ],
      ko: ["JWT 토큰", "URL 쿼리 파라미터", "OAuth 토큰", "WebSocket 인증"],
      ja: [
        "JWTトークン",
        "URLクエリパラメータ",
        "OAuthトークン",
        "WebSocket認証",
      ],
    },
  },
  // === URL 인코딩 ===
  {
    slug: "url",
    name: "URL Encode",
    mode: "both",
    category: "url",
    title: {
      en: "URL Encoder & Decoder",
      ko: "URL 인코더 & 디코더",
      ja: "URLエンコーダー＆デコーダー",
    },
    description: {
      en: "Encode and decode URLs for safe transmission. Converts special characters to percent-encoded format.",
      ko: "안전한 전송을 위해 URL을 인코딩하고 디코딩합니다. 특수 문자를 퍼센트 인코딩 형식으로 변환합니다.",
      ja: "安全な転送のためにURLをエンコードおよびデコードします。特殊文字をパーセントエンコード形式に変換します。",
    },
    keywords: {
      en: [
        "url encoder",
        "url decoder",
        "percent encoding",
        "urlencode",
        "urldecode",
      ],
      ko: [
        "url 인코더",
        "url 디코더",
        "퍼센트 인코딩",
        "url 인코드",
        "url 디코드",
      ],
      ja: [
        "urlエンコーダー",
        "urlデコーダー",
        "パーセントエンコーディング",
        "urlエンコード",
        "urlデコード",
      ],
    },
    useCases: {
      en: [
        "Query string parameters",
        "Form data submission",
        "API requests",
        "Web scraping",
      ],
      ko: ["쿼리 문자열 파라미터", "폼 데이터 제출", "API 요청", "웹 스크래핑"],
      ja: [
        "クエリ文字列パラメータ",
        "フォームデータ送信",
        "APIリクエスト",
        "Webスクレイピング",
      ],
    },
  },
  {
    slug: "uri-component",
    name: "URI Component",
    mode: "both",
    category: "url",
    title: {
      en: "URI Component Encoder & Decoder",
      ko: "URI 컴포넌트 인코더 & 디코더",
      ja: "URIコンポーネントエンコーダー＆デコーダー",
    },
    description: {
      en: "Encode/decode URI components. Encodes all characters except alphabets, digits, and -_.!~*'()",
      ko: "URI 컴포넌트를 인코딩/디코딩합니다. 알파벳, 숫자, -_.!~*'()를 제외한 모든 문자를 인코딩합니다.",
      ja: "URIコンポーネントをエンコード/デコードします。アルファベット、数字、-_.!~*'()を除くすべての文字をエンコードします。",
    },
    keywords: {
      en: [
        "encodeURIComponent",
        "decodeURIComponent",
        "uri component",
        "javascript encoding",
      ],
      ko: [
        "encodeURIComponent",
        "decodeURIComponent",
        "uri 컴포넌트",
        "자바스크립트 인코딩",
      ],
      ja: [
        "encodeURIComponent",
        "decodeURIComponent",
        "uriコンポーネント",
        "javascriptエンコーディング",
      ],
    },
    useCases: {
      en: [
        "JavaScript URL handling",
        "Query parameter values",
        "Cookie values",
        "Form submissions",
      ],
      ko: ["JavaScript URL 처리", "쿼리 파라미터 값", "쿠키 값", "폼 제출"],
      ja: [
        "JavaScript URL処理",
        "クエリパラメータ値",
        "Cookie値",
        "フォーム送信",
      ],
    },
  },
  // === HTML 인코딩 ===
  {
    slug: "html",
    name: "HTML Entities",
    mode: "both",
    category: "html",
    title: {
      en: "HTML Entity Encoder & Decoder",
      ko: "HTML 엔티티 인코더 & 디코더",
      ja: "HTMLエンティティエンコーダー＆デコーダー",
    },
    description: {
      en: "Convert special characters to HTML entities and back. Prevent XSS and display special characters correctly.",
      ko: "특수 문자를 HTML 엔티티로 변환하고 되돌립니다. XSS를 방지하고 특수 문자를 올바르게 표시합니다.",
      ja: "特殊文字をHTMLエンティティに変換して元に戻します。XSSを防止し、特殊文字を正しく表示します。",
    },
    keywords: {
      en: [
        "html encoder",
        "html decoder",
        "html entities",
        "xss prevention",
        "escape html",
      ],
      ko: [
        "html 인코더",
        "html 디코더",
        "html 엔티티",
        "xss 방지",
        "html 이스케이프",
      ],
      ja: [
        "htmlエンコーダー",
        "htmlデコーダー",
        "htmlエンティティ",
        "xss防止",
        "htmlエスケープ",
      ],
    },
    useCases: {
      en: [
        "XSS prevention",
        "Display special characters",
        "Content management",
        "Web templating",
      ],
      ko: ["XSS 방지", "특수 문자 표시", "콘텐츠 관리", "웹 템플릿"],
      ja: ["XSS防止", "特殊文字表示", "コンテンツ管理", "Webテンプレート"],
    },
  },
  // === 텍스트 변환 ===
  {
    slug: "unicode-escape",
    name: "Unicode Escape",
    mode: "both",
    category: "text",
    title: {
      en: "Unicode Escape Converter",
      ko: "유니코드 이스케이프 변환기",
      ja: "Unicodeエスケープ変換ツール",
    },
    description: {
      en: "Convert text to Unicode escape sequences (\\uXXXX) and back. Essential for JavaScript strings and internationalization.",
      ko: "텍스트를 유니코드 이스케이프 시퀀스(\\uXXXX)로 변환하고 되돌립니다. JavaScript 문자열과 국제화에 필수적입니다.",
      ja: "テキストをUnicodeエスケープシーケンス（\\uXXXX）に変換して元に戻します。JavaScript文字列と国際化に不可欠です。",
    },
    keywords: {
      en: [
        "unicode escape",
        "\\u encoding",
        "javascript unicode",
        "utf-16 escape",
      ],
      ko: [
        "유니코드 이스케이프",
        "\\u 인코딩",
        "자바스크립트 유니코드",
        "utf-16 이스케이프",
      ],
      ja: [
        "unicodeエスケープ",
        "\\uエンコーディング",
        "javascriptユニコード",
        "utf-16エスケープ",
      ],
    },
    useCases: {
      en: [
        "JavaScript strings",
        "JSON encoding",
        "Cross-platform compatibility",
        "Emoji handling",
      ],
      ko: [
        "JavaScript 문자열",
        "JSON 인코딩",
        "크로스 플랫폼 호환성",
        "이모지 처리",
      ],
      ja: [
        "JavaScript文字列",
        "JSONエンコーディング",
        "クロスプラットフォーム互換性",
        "絵文字処理",
      ],
    },
  },
  {
    slug: "hex",
    name: "Hexadecimal",
    mode: "both",
    category: "binary",
    title: {
      en: "Hex Encoder & Decoder",
      ko: "16진수 인코더 & 디코더",
      ja: "16進数エンコーダー＆デコーダー",
    },
    description: {
      en: "Convert text to hexadecimal representation and back. Useful for debugging and data analysis.",
      ko: "텍스트를 16진수 표현으로 변환하고 되돌립니다. 디버깅과 데이터 분석에 유용합니다.",
      ja: "テキストを16進数表現に変換して元に戻します。デバッグとデータ分析に便利です。",
    },
    keywords: {
      en: [
        "hex encoder",
        "hex decoder",
        "hexadecimal converter",
        "text to hex",
        "hex to text",
      ],
      ko: [
        "16진수 인코더",
        "16진수 디코더",
        "16진수 변환",
        "텍스트를 16진수로",
        "16진수를 텍스트로",
      ],
      ja: [
        "16進数エンコーダー",
        "16進数デコーダー",
        "16進数変換",
        "テキストから16進数",
        "16進数からテキスト",
      ],
    },
    useCases: {
      en: [
        "Debugging binary data",
        "Color codes",
        "Memory addresses",
        "Network protocols",
      ],
      ko: [
        "바이너리 데이터 디버깅",
        "색상 코드",
        "메모리 주소",
        "네트워크 프로토콜",
      ],
      ja: [
        "バイナリデータのデバッグ",
        "カラーコード",
        "メモリアドレス",
        "ネットワークプロトコル",
      ],
    },
  },
  {
    slug: "binary",
    name: "Binary",
    mode: "both",
    category: "binary",
    title: {
      en: "Binary Encoder & Decoder",
      ko: "이진수 인코더 & 디코더",
      ja: "バイナリエンコーダー＆デコーダー",
    },
    description: {
      en: "Convert text to binary (0s and 1s) and back. Visualize how text is stored in computers.",
      ko: "텍스트를 이진수(0과 1)로 변환하고 되돌립니다. 컴퓨터에서 텍스트가 저장되는 방식을 시각화합니다.",
      ja: "テキストをバイナリ（0と1）に変換して元に戻します。コンピュータでテキストがどのように保存されるかを視覚化します。",
    },
    keywords: {
      en: [
        "binary encoder",
        "binary decoder",
        "text to binary",
        "binary to text",
        "binary converter",
      ],
      ko: [
        "이진수 인코더",
        "이진수 디코더",
        "텍스트를 이진수로",
        "이진수를 텍스트로",
        "이진수 변환",
      ],
      ja: [
        "バイナリエンコーダー",
        "バイナリデコーダー",
        "テキストからバイナリ",
        "バイナリからテキスト",
        "バイナリ変換",
      ],
    },
    useCases: {
      en: [
        "Educational purposes",
        "Data visualization",
        "Computer science learning",
        "Bit manipulation",
      ],
      ko: ["교육 목적", "데이터 시각화", "컴퓨터 과학 학습", "비트 조작"],
      ja: [
        "教育目的",
        "データ可視化",
        "コンピュータサイエンス学習",
        "ビット操作",
      ],
    },
  },
  {
    slug: "ascii",
    name: "ASCII",
    mode: "both",
    category: "binary",
    title: {
      en: "ASCII Encoder & Decoder",
      ko: "ASCII 인코더 & 디코더",
      ja: "ASCIIエンコーダー＆デコーダー",
    },
    description: {
      en: "Convert text to ASCII codes and vice versa. Understand character encoding fundamentals.",
      ko: "텍스트를 ASCII 코드로 변환하고 그 반대로도 변환합니다. 문자 인코딩의 기초를 이해합니다.",
      ja: "テキストをASCIIコードに変換し、その逆も行います。文字エンコーディングの基礎を理解します。",
    },
    keywords: {
      en: [
        "ascii encoder",
        "ascii decoder",
        "character codes",
        "ascii table",
        "ascii values",
      ],
      ko: [
        "ascii 인코더",
        "ascii 디코더",
        "문자 코드",
        "ascii 테이블",
        "ascii 값",
      ],
      ja: [
        "asciiエンコーダー",
        "asciiデコーダー",
        "文字コード",
        "asciiテーブル",
        "ascii値",
      ],
    },
    useCases: {
      en: [
        "Character encoding",
        "Programming education",
        "Data conversion",
        "Legacy systems",
      ],
      ko: ["문자 인코딩", "프로그래밍 교육", "데이터 변환", "레거시 시스템"],
      ja: [
        "文字エンコーディング",
        "プログラミング教育",
        "データ変換",
        "レガシーシステム",
      ],
    },
  },
  {
    slug: "rot13",
    name: "ROT13",
    mode: "both",
    category: "text",
    title: {
      en: "ROT13 Encoder & Decoder",
      ko: "ROT13 인코더 & 디코더",
      ja: "ROT13エンコーダー＆デコーダー",
    },
    description: {
      en: "Apply ROT13 substitution cipher. Shift letters by 13 positions, commonly used to hide spoilers.",
      ko: "ROT13 대체 암호를 적용합니다. 문자를 13자리 이동시키며, 스포일러를 숨기는 데 일반적으로 사용됩니다.",
      ja: "ROT13置換暗号を適用します。文字を13位置シフトし、スポイラーを隠すためによく使用されます。",
    },
    keywords: {
      en: [
        "rot13",
        "caesar cipher",
        "letter rotation",
        "simple cipher",
        "spoiler hider",
      ],
      ko: ["rot13", "시저 암호", "문자 회전", "간단한 암호", "스포일러 숨기기"],
      ja: [
        "rot13",
        "シーザー暗号",
        "文字回転",
        "シンプル暗号",
        "スポイラー隠し",
      ],
    },
    useCases: {
      en: [
        "Hide spoilers",
        "Simple obfuscation",
        "Puzzle games",
        "Educational cryptography",
      ],
      ko: ["스포일러 숨기기", "간단한 난독화", "퍼즐 게임", "교육용 암호학"],
      ja: ["スポイラー隠し", "簡単な難読化", "パズルゲーム", "教育用暗号学"],
    },
  },
  {
    slug: "morse",
    name: "Morse Code",
    mode: "both",
    category: "text",
    title: {
      en: "Morse Code Translator",
      ko: "모스 부호 변환기",
      ja: "モールス信号変換ツール",
    },
    description: {
      en: "Convert text to Morse code and back. Learn the classic telecommunication encoding system.",
      ko: "텍스트를 모스 부호로 변환하고 되돌립니다. 고전적인 통신 인코딩 시스템을 배웁니다.",
      ja: "テキストをモールス信号に変換して元に戻します。古典的な通信エンコーディングシステムを学びます。",
    },
    keywords: {
      en: [
        "morse code",
        "morse translator",
        "dots and dashes",
        "telegraph code",
        "sos morse",
      ],
      ko: ["모스 부호", "모스 변환기", "점과 선", "전신 코드", "sos 모스"],
      ja: [
        "モールス信号",
        "モールス変換",
        "点と線",
        "電信コード",
        "sosモールス",
      ],
    },
    useCases: {
      en: [
        "Learning Morse code",
        "Amateur radio",
        "Educational purposes",
        "Emergency communication",
      ],
      ko: ["모스 부호 학습", "아마추어 라디오", "교육 목적", "비상 통신"],
      ja: ["モールス信号学習", "アマチュア無線", "教育目的", "緊急通信"],
    },
  },
  // === JSON/데이터 포맷 ===
  {
    slug: "json-escape",
    name: "JSON Escape",
    mode: "both",
    category: "format",
    title: {
      en: "JSON String Escaper",
      ko: "JSON 문자열 이스케이프",
      ja: "JSON文字列エスケープ",
    },
    description: {
      en: "Escape and unescape JSON strings. Handle special characters in JSON data properly.",
      ko: "JSON 문자열을 이스케이프하고 되돌립니다. JSON 데이터의 특수 문자를 적절히 처리합니다.",
      ja: "JSON文字列をエスケープおよびアンエスケープします。JSONデータの特殊文字を適切に処理します。",
    },
    keywords: {
      en: [
        "json escape",
        "json unescape",
        "json string",
        "escape quotes",
        "json formatter",
      ],
      ko: [
        "json 이스케이프",
        "json 언이스케이프",
        "json 문자열",
        "따옴표 이스케이프",
        "json 포맷터",
      ],
      ja: [
        "jsonエスケープ",
        "jsonアンエスケープ",
        "json文字列",
        "引用符エスケープ",
        "jsonフォーマッター",
      ],
    },
    useCases: {
      en: [
        "API development",
        "Data serialization",
        "Configuration files",
        "Logging",
      ],
      ko: ["API 개발", "데이터 직렬화", "설정 파일", "로깅"],
      ja: ["API開発", "データシリアライゼーション", "設定ファイル", "ロギング"],
    },
  },
  {
    slug: "punycode",
    name: "Punycode",
    mode: "both",
    category: "url",
    title: {
      en: "Punycode Encoder & Decoder",
      ko: "퓨니코드 인코더 & 디코더",
      ja: "Punycodeエンコーダー＆デコーダー",
    },
    description: {
      en: "Convert internationalized domain names to ASCII-compatible encoding. Essential for IDN handling.",
      ko: "국제화된 도메인 이름을 ASCII 호환 인코딩으로 변환합니다. IDN 처리에 필수적입니다.",
      ja: "国際化ドメイン名をASCII互換エンコーディングに変換します。IDN処理に不可欠です。",
    },
    keywords: {
      en: [
        "punycode",
        "idn",
        "internationalized domain",
        "domain encoding",
        "xn-- domain",
      ],
      ko: ["퓨니코드", "idn", "국제화 도메인", "도메인 인코딩", "xn-- 도메인"],
      ja: [
        "punycode",
        "idn",
        "国際化ドメイン",
        "ドメインエンコーディング",
        "xn--ドメイン",
      ],
    },
    useCases: {
      en: [
        "Domain registration",
        "Email addresses",
        "URL handling",
        "DNS configuration",
      ],
      ko: ["도메인 등록", "이메일 주소", "URL 처리", "DNS 설정"],
      ja: ["ドメイン登録", "メールアドレス", "URL処理", "DNS設定"],
    },
  },
  {
    slug: "quoted-printable",
    name: "Quoted-Printable",
    mode: "both",
    category: "text",
    title: {
      en: "Quoted-Printable Encoder & Decoder",
      ko: "Quoted-Printable 인코더 & 디코더",
      ja: "Quoted-Printableエンコーダー＆デコーダー",
    },
    description: {
      en: "Encode and decode Quoted-Printable format used in email MIME. Handle non-ASCII characters in emails.",
      ko: "이메일 MIME에서 사용되는 Quoted-Printable 형식을 인코딩하고 디코딩합니다. 이메일의 비ASCII 문자를 처리합니다.",
      ja: "メールMIMEで使用されるQuoted-Printable形式をエンコードおよびデコードします。メール内の非ASCII文字を処理します。",
    },
    keywords: {
      en: [
        "quoted printable",
        "mime encoding",
        "email encoding",
        "content transfer encoding",
      ],
      ko: [
        "quoted printable",
        "mime 인코딩",
        "이메일 인코딩",
        "콘텐츠 전송 인코딩",
      ],
      ja: [
        "quoted printable",
        "mimeエンコーディング",
        "メールエンコーディング",
        "コンテンツ転送エンコーディング",
      ],
    },
    useCases: {
      en: [
        "Email encoding",
        "MIME messages",
        "Legacy email systems",
        "Internationalized emails",
      ],
      ko: [
        "이메일 인코딩",
        "MIME 메시지",
        "레거시 이메일 시스템",
        "국제화된 이메일",
      ],
      ja: [
        "メールエンコーディング",
        "MIMEメッセージ",
        "レガシーメールシステム",
        "国際化メール",
      ],
    },
  },
];

// ============================================
// Helper Functions
// ============================================

/**
 * slug로 인코드/디코드 타입 찾기
 */
export function getEncodeDecodeTypeBySlug(
  slug: string,
): EncodeDecodeType | undefined {
  return allEncodeDecodeTypes.find((t) => t.slug === slug);
}

/**
 * 모든 인코드/디코드 타입 slug 배열 반환
 */
export function getAllEncodeDecodeTypeSlugs(): string[] {
  return allEncodeDecodeTypes.map((t) => t.slug);
}

/**
 * 카테고리별 필터링
 */
export function getEncodeDecodeTypesByCategory(
  category: EncodeDecodeType["category"],
): EncodeDecodeType[] {
  return allEncodeDecodeTypes.filter((t) => t.category === category);
}

/**
 * 관련 인코드/디코드 타입 반환 (같은 카테고리 우선)
 */
export function getRelatedEncodeDecodeTypes(
  currentSlug: string,
  limit = 6,
): EncodeDecodeType[] {
  const current = getEncodeDecodeTypeBySlug(currentSlug);
  if (!current) return allEncodeDecodeTypes.slice(0, limit);

  const sameCategory = allEncodeDecodeTypes.filter(
    (t) => t.slug !== currentSlug && t.category === current.category,
  );
  const differentCategory = allEncodeDecodeTypes.filter(
    (t) => t.slug !== currentSlug && t.category !== current.category,
  );

  return [...sameCategory, ...differentCategory].slice(0, limit);
}

/**
 * 특정 로케일의 제목 반환
 */
export function getEncodeDecodeTypeTitle(
  type: EncodeDecodeType,
  locale: LocaleKey,
): string {
  return type.title[locale] || type.title.en;
}

/**
 * 특정 로케일의 설명 반환
 */
export function getEncodeDecodeTypeDescription(
  type: EncodeDecodeType,
  locale: LocaleKey,
): string {
  return type.description[locale] || type.description.en;
}
