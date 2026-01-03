/**
 * Common UI labels for pSEO pages
 *
 * Centralized labels to reduce repetitive ternary operators like:
 * `locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home"`
 */

import { type LocaleKey, getSafeLocaleKey } from "./types";

// Label definition with all supported locales
type LabelDef = Record<LocaleKey, string>;

// Common labels used across pSEO pages
const LABELS = {
  // Navigation
  home: { en: "Home", ko: "홈", ja: "ホーム" },
  tools: { en: "Tools", ko: "도구", ja: "ツール" },
  encoders: { en: "Encoders", ko: "인코더", ja: "エンコーダー" },
  decoders: { en: "Decoders", ko: "디코더", ja: "デコーダー" },
  hashTools: { en: "Hash Tools", ko: "해시 도구", ja: "ハッシュツール" },
  converters: { en: "Converters", ko: "변환기", ja: "変換ツール" },

  // Section headings
  useCases: { en: "Use Cases", ko: "사용 사례", ja: "使用例" },
  features: { en: "Features", ko: "특징", ja: "特徴" },
  faq: { en: "FAQ", ko: "자주 묻는 질문", ja: "よくある質問" },
  technicalSpecs: {
    en: "Technical Specifications",
    ko: "기술 사양",
    ja: "技術仕様",
  },
  securityAnalysis: {
    en: "Security Analysis",
    ko: "보안 분석",
    ja: "セキュリティ分析",
  },
  history: { en: "History", ko: "역사", ja: "歴史" },
  knownVulnerabilities: {
    en: "Known Vulnerabilities",
    ko: "알려진 취약점",
    ja: "既知の脆弱性",
  },
  realWorldUseCases: {
    en: "Real World Use Cases",
    ko: "실제 사용 사례",
    ja: "実際の使用例",
  },
  codeExamples: { en: "Code Examples", ko: "코드 예제", ja: "コード例" },
  comparison: {
    en: "Comparison with Other Hashes",
    ko: "다른 해시와 비교",
    ja: "他のハッシュとの比較",
  },
  performance: { en: "Performance", ko: "성능", ja: "パフォーマンス" },
  references: { en: "References", ko: "참고 문헌", ja: "参考文献" },

  // Related tools
  relatedEncoders: {
    en: "Related Encoders",
    ko: "관련 인코더",
    ja: "関連エンコーダー",
  },
  relatedDecoders: {
    en: "Related Decoders",
    ko: "관련 디코더",
    ja: "関連デコーダー",
  },
  relatedHashTools: {
    en: "Related Hash Tools",
    ko: "관련 해시 도구",
    ja: "関連ハッシュツール",
  },
  relatedConverters: {
    en: "Related Converters",
    ko: "관련 변환기",
    ja: "関連変換ツール",
  },
  allHashTools: {
    en: "All Hash Tools",
    ko: "모든 해시 도구",
    ja: "すべてのハッシュツール",
  },

  // Technical spec labels
  outputLength: { en: "Output Length", ko: "출력 길이", ja: "出力長" },
  blockSize: { en: "Block Size", ko: "블록 크기", ja: "ブロックサイズ" },
  rounds: { en: "Rounds", ko: "라운드 수", ja: "ラウンド数" },
  structure: { en: "Structure", ko: "구조", ja: "構造" },
  algorithm: { en: "Algorithm", ko: "알고리즘", ja: "アルゴリズム" },
  securityStatus: {
    en: "Security Status",
    ko: "보안 상태",
    ja: "セキュリティ状態",
  },

  // Security labels
  collisionResistance: {
    en: "Collision Resistance",
    ko: "충돌 저항성",
    ja: "衝突耐性",
  },
  preimageResistance: {
    en: "Preimage Resistance",
    ko: "역상 저항성",
    ja: "原像耐性",
  },
  secondPreimageResistance: {
    en: "Second Preimage Resistance",
    ko: "제2 역상 저항성",
    ja: "第二原像耐性",
  },
  quantumResistance: {
    en: "Quantum Resistance",
    ko: "양자 저항성",
    ja: "量子耐性",
  },

  // Security level labels
  broken: { en: "Broken", ko: "취약", ja: "破損" },
  weak: { en: "Weak", ko: "약함", ja: "弱い" },
  deprecated: { en: "Deprecated", ko: "권장되지 않음", ja: "非推奨" },
  secure: { en: "Secure", ko: "안전", ja: "安全" },
  recommended: { en: "Recommended", ko: "권장", ja: "推奨" },
  notRecommended: { en: "Not Recommended", ko: "비권장", ja: "非推奨" },

  // History labels
  createdYear: { en: "Created", ko: "생성 연도", ja: "作成年" },
  creator: { en: "Creator", ko: "개발자", ja: "開発者" },
  organization: { en: "Organization", ko: "조직", ja: "組織" },
  standard: { en: "Standard", ko: "표준화", ja: "標準化" },

  // Performance labels
  speed: { en: "Speed", ko: "처리 속도", ja: "処理速度" },
  memoryUsage: { en: "Memory", ko: "메모리 사용량", ja: "メモリ使用量" },
  parallelizable: { en: "Parallelizable", ko: "병렬화", ja: "並列化" },
  hardwareAcceleration: {
    en: "Hardware Acceleration",
    ko: "하드웨어 가속",
    ja: "ハードウェアアクセラレーション",
  },
  yes: { en: "Yes", ko: "가능", ja: "可能" },
  no: { en: "No", ko: "불가", ja: "不可" },

  // When to use
  whenToUse: {
    en: "When to Use",
    ko: "사용하면 좋은 경우",
    ja: "使用する場合",
  },
  whenNotToUse: {
    en: "When NOT to Use",
    ko: "사용하지 말아야 할 경우",
    ja: "使用しない場合",
  },
  whyThisHash: {
    en: "Why this hash: ",
    ko: "이 해시를 사용하는 이유: ",
    ja: "このハッシュを使用する理由: ",
  },

  // FAQ common answers
  freeUnlimited: {
    en: "Yes, it's completely free. No signup required and unlimited usage.",
    ko: "네, 완전히 무료입니다. 회원가입 없이 무제한으로 사용할 수 있습니다.",
    ja: "はい、完全に無料です。登録なしで無制限に使用できます。",
  },
  clientSideProcessing: {
    en: "All processing happens locally in your browser. Your data never leaves your device.",
    ko: "모든 처리는 브라우저에서 로컬로 이루어집니다. 데이터가 서버로 전송되지 않습니다.",
    ja: "すべての処理はブラウザでローカルに行われます。データはサーバーに送信されません。",
  },

  // Feature descriptions
  featureClientSide: {
    en: "100% client-side - your data never leaves your browser",
    ko: "100% 클라이언트 사이드 - 데이터가 서버로 전송되지 않습니다",
    ja: "100%クライアントサイド - データはサーバーに送信されません",
  },
  featureFreeUnlimited: {
    en: "Free & unlimited - no signup required",
    ko: "무료 & 무제한 - 회원가입 없이 무제한 사용",
    ja: "無料＆無制限 - 登録なしで無制限に使用可能",
  },
  featureRealtime: {
    en: "Real-time computation - calculates as you type",
    ko: "실시간 계산 - 입력하는 동안 자동 계산",
    ja: "リアルタイム計算 - 入力中に自動計算",
  },
  featureOneClickCopy: {
    en: "One-click copy - instantly copy results to clipboard",
    ko: "원클릭 복사 - 결과를 클립보드에 즉시 복사",
    ja: "ワンクリックコピー - 結果をクリップボードに即座にコピー",
  },
} as const satisfies Record<string, LabelDef>;

// Type for available label keys
export type LabelKey = keyof typeof LABELS;

/**
 * Get a localized label by key
 *
 * @example
 * getLabel("home", "ko") // "홈"
 * getLabel("tools", "en") // "Tools"
 */
export function getLabel(key: LabelKey, locale: string): string {
  const safeLocale = getSafeLocaleKey(locale);
  return LABELS[key][safeLocale];
}

/**
 * Get multiple labels at once
 *
 * @example
 * const { home, tools, faq } = getLabels(["home", "tools", "faq"], "ko");
 */
export function getLabels<K extends LabelKey>(
  keys: K[],
  locale: string,
): Record<K, string> {
  const safeLocale = getSafeLocaleKey(locale);
  return keys.reduce(
    (acc, key) => {
      acc[key] = LABELS[key][safeLocale];
      return acc;
    },
    {} as Record<K, string>,
  );
}

/**
 * Create a locale-aware label getter for a specific locale
 * Useful when you need many labels in the same component
 *
 * @example
 * const t = createLabelGetter("ko");
 * t("home") // "홈"
 * t("tools") // "도구"
 */
export function createLabelGetter(locale: string): (key: LabelKey) => string {
  const safeLocale = getSafeLocaleKey(locale);
  return (key: LabelKey) => LABELS[key][safeLocale];
}

// Re-export the labels object for direct access if needed
export { LABELS };
