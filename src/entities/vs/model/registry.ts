import type { VsComparison, VsComparisonSlug, ComparisonAspect } from "./types";

// Helper to create comparison aspects
const ca = (
  aspect: string,
  item1: string,
  item2: string,
  winner?: "item1" | "item2" | "tie",
): ComparisonAspect => ({ aspect, item1, item2, winner });

export const vsComparisons: Record<VsComparisonSlug, VsComparison> = {
  // ============================================================
  // 데이터 포맷 비교 (10)
  // ============================================================

  "json-vs-yaml": {
    slug: "json-vs-yaml",
    item1: "JSON",
    item2: "YAML",
    category: "data-format",
    title: {
      en: "JSON vs YAML: Complete Comparison Guide",
      ko: "JSON vs YAML: 완벽 비교 가이드",
      ja: "JSON vs YAML: 完全比較ガイド",
    },
    description: {
      en: "Compare JSON and YAML data formats. Learn the differences in syntax, readability, and use cases.",
      ko: "JSON과 YAML 데이터 포맷을 비교합니다. 구문, 가독성, 사용 사례의 차이점을 알아보세요.",
      ja: "JSONとYAMLデータ形式を比較します。構文、可読性、ユースケースの違いを学びます。",
    },
    comparison: {
      en: [
        ca("Readability", "Brackets and quotes", "Clean indentation", "item2"),
        ca("Comments", "Not supported", "Supported", "item2"),
        ca("Parsing Speed", "Faster", "Slower", "item1"),
        ca("File Size", "Larger", "Smaller", "item2"),
        ca("Data Types", "Limited", "Rich types", "item2"),
      ],
      ko: [
        ca("가독성", "괄호와 따옴표", "깔끔한 들여쓰기", "item2"),
        ca("주석", "미지원", "지원", "item2"),
        ca("파싱 속도", "빠름", "느림", "item1"),
        ca("파일 크기", "큼", "작음", "item2"),
        ca("데이터 타입", "제한적", "다양함", "item2"),
      ],
      ja: [
        ca("可読性", "括弧と引用符", "クリーンなインデント", "item2"),
        ca("コメント", "非対応", "対応", "item2"),
        ca("解析速度", "高速", "低速", "item1"),
        ca("ファイルサイズ", "大きい", "小さい", "item2"),
        ca("データ型", "限定的", "豊富", "item2"),
      ],
    },
    conclusion: {
      en: "Use JSON for APIs and data exchange. Use YAML for configuration files.",
      ko: "API와 데이터 교환에는 JSON을, 설정 파일에는 YAML을 사용하세요.",
      ja: "APIとデータ交換にはJSON、設定ファイルにはYAMLを使用してください。",
    },
    relatedTool: "json-formatter",
    keywords: ["json vs yaml", "yaml vs json", "json yaml difference"],
    searchVolume: 12100,
  },

  "json-vs-xml": {
    slug: "json-vs-xml",
    item1: "JSON",
    item2: "XML",
    category: "data-format",
    title: {
      en: "JSON vs XML: Which Format Should You Use?",
      ko: "JSON vs XML: 어떤 포맷을 사용해야 할까?",
      ja: "JSON vs XML: どちらの形式を使うべき?",
    },
    description: {
      en: "Compare JSON and XML formats. Understand when to use each for your projects.",
      ko: "JSON과 XML 포맷을 비교합니다. 프로젝트에 맞는 선택을 하세요.",
      ja: "JSONとXML形式を比較します。プロジェクトに適した選択をしましょう。",
    },
    comparison: {
      en: [
        ca("Syntax", "Lightweight", "Verbose", "item1"),
        ca("Schema", "JSON Schema", "XSD/DTD", "tie"),
        ca("Parsing", "Native JS support", "Requires parser", "item1"),
        ca("Namespaces", "Not supported", "Supported", "item2"),
        ca("Attributes", "Not supported", "Supported", "item2"),
      ],
      ko: [
        ca("구문", "경량", "장황", "item1"),
        ca("스키마", "JSON Schema", "XSD/DTD", "tie"),
        ca("파싱", "네이티브 JS 지원", "파서 필요", "item1"),
        ca("네임스페이스", "미지원", "지원", "item2"),
        ca("속성", "미지원", "지원", "item2"),
      ],
      ja: [
        ca("構文", "軽量", "冗長", "item1"),
        ca("スキーマ", "JSON Schema", "XSD/DTD", "tie"),
        ca("解析", "ネイティブJS対応", "パーサー必要", "item1"),
        ca("名前空間", "非対応", "対応", "item2"),
        ca("属性", "非対応", "対応", "item2"),
      ],
    },
    conclusion: {
      en: "JSON is preferred for web APIs. XML is better for document markup and enterprise systems.",
      ko: "웹 API에는 JSON이 선호됩니다. XML은 문서 마크업과 엔터프라이즈 시스템에 적합합니다.",
      ja: "Web APIにはJSONが好まれます。XMLはドキュメントマークアップやエンタープライズシステムに適しています。",
    },
    relatedTool: "json-formatter",
    keywords: ["json vs xml", "xml vs json", "json xml comparison"],
    searchVolume: 9900,
  },

  "json-vs-csv": {
    slug: "json-vs-csv",
    item1: "JSON",
    item2: "CSV",
    category: "data-format",
    title: {
      en: "JSON vs CSV: Data Format Comparison",
      ko: "JSON vs CSV: 데이터 포맷 비교",
      ja: "JSON vs CSV: データ形式比較",
    },
    description: {
      en: "Compare JSON and CSV for data storage and exchange.",
      ko: "데이터 저장 및 교환을 위한 JSON과 CSV를 비교합니다.",
      ja: "データ保存と交換のためのJSONとCSVを比較します。",
    },
    comparison: {
      en: [
        ca("Structure", "Hierarchical", "Flat/Tabular", "item1"),
        ca("File Size", "Larger", "Smaller", "item2"),
        ca("Readability", "Moderate", "Excel-friendly", "item2"),
        ca("Nested Data", "Supported", "Not supported", "item1"),
        ca("Type Info", "Preserved", "Lost", "item1"),
      ],
      ko: [
        ca("구조", "계층적", "플랫/테이블", "item1"),
        ca("파일 크기", "큼", "작음", "item2"),
        ca("가독성", "보통", "Excel 친화적", "item2"),
        ca("중첩 데이터", "지원", "미지원", "item1"),
        ca("타입 정보", "유지", "손실", "item1"),
      ],
      ja: [
        ca("構造", "階層的", "フラット/表形式", "item1"),
        ca("ファイルサイズ", "大きい", "小さい", "item2"),
        ca("可読性", "普通", "Excel対応", "item2"),
        ca("ネストデータ", "対応", "非対応", "item1"),
        ca("型情報", "保持", "失われる", "item1"),
      ],
    },
    conclusion: {
      en: "Use JSON for complex data, CSV for tabular data.",
      ko: "복잡한 데이터는 JSON, 테이블 데이터는 CSV를 사용하세요.",
      ja: "複雑なデータにはJSON、表形式データにはCSVを使用してください。",
    },
    relatedTool: "json-formatter",
    keywords: ["json vs csv", "csv vs json"],
    searchVolume: 6600,
  },

  "yaml-vs-toml": {
    slug: "yaml-vs-toml",
    item1: "YAML",
    item2: "TOML",
    category: "data-format",
    title: {
      en: "YAML vs TOML: Config File Showdown",
      ko: "YAML vs TOML: 설정 파일 비교",
      ja: "YAML vs TOML: 設定ファイル比較",
    },
    description: {
      en: "Compare YAML and TOML configuration formats.",
      ko: "YAML과 TOML 설정 파일 포맷을 비교합니다.",
      ja: "YAMLとTOML設定形式を比較します。",
    },
    comparison: {
      en: [
        ca("Syntax", "Indentation-based", "INI-like sections", "tie"),
        ca("Complexity", "Handles complex", "Simple configs", "item1"),
        ca("Strictness", "More flexible", "More strict", "item2"),
        ca("Adoption", "Kubernetes/Docker", "Rust/Cargo", "tie"),
      ],
      ko: [
        ca("구문", "들여쓰기 기반", "INI 스타일 섹션", "tie"),
        ca("복잡성", "복잡한 구조 처리", "단순 설정", "item1"),
        ca("엄격성", "유연함", "엄격함", "item2"),
        ca("채택", "Kubernetes/Docker", "Rust/Cargo", "tie"),
      ],
      ja: [
        ca("構文", "インデントベース", "INI風セクション", "tie"),
        ca("複雑さ", "複雑な構造対応", "シンプルな設定", "item1"),
        ca("厳密性", "柔軟", "厳密", "item2"),
        ca("採用", "Kubernetes/Docker", "Rust/Cargo", "tie"),
      ],
    },
    conclusion: {
      en: "YAML for complex configs, TOML for simple ones.",
      ko: "복잡한 설정은 YAML, 간단한 설정은 TOML.",
      ja: "複雑な設定にはYAML、シンプルな設定にはTOML。",
    },
    relatedTool: "json-formatter",
    keywords: ["yaml vs toml", "toml vs yaml"],
    searchVolume: 3600,
  },

  "xml-vs-html": {
    slug: "xml-vs-html",
    item1: "XML",
    item2: "HTML",
    category: "data-format",
    title: {
      en: "XML vs HTML: Markup Language Comparison",
      ko: "XML vs HTML: 마크업 언어 비교",
      ja: "XML vs HTML: マークアップ言語比較",
    },
    description: {
      en: "Understand the differences between XML and HTML.",
      ko: "XML과 HTML의 차이점을 이해합니다.",
      ja: "XMLとHTMLの違いを理解します。",
    },
    comparison: {
      en: [
        ca("Purpose", "Data storage", "Web display", "tie"),
        ca("Tags", "Custom tags", "Predefined tags", "item1"),
        ca("Strictness", "Very strict", "Forgiving", "item1"),
        ca("Closing Tags", "Required", "Optional for some", "item1"),
      ],
      ko: [
        ca("목적", "데이터 저장", "웹 표시", "tie"),
        ca("태그", "사용자 정의", "미리 정의됨", "item1"),
        ca("엄격성", "매우 엄격", "관대함", "item1"),
        ca("닫는 태그", "필수", "일부 선택적", "item1"),
      ],
      ja: [
        ca("目的", "データ保存", "Web表示", "tie"),
        ca("タグ", "カスタムタグ", "定義済みタグ", "item1"),
        ca("厳密性", "非常に厳密", "寛容", "item1"),
        ca("閉じタグ", "必須", "一部オプション", "item1"),
      ],
    },
    conclusion: {
      en: "XML for data, HTML for web pages.",
      ko: "데이터는 XML, 웹 페이지는 HTML.",
      ja: "データにはXML、WebページにはHTML。",
    },
    relatedTool: "json-formatter",
    keywords: ["xml vs html", "html vs xml"],
    searchVolume: 5400,
  },

  "markdown-vs-html": {
    slug: "markdown-vs-html",
    item1: "Markdown",
    item2: "HTML",
    category: "data-format",
    title: {
      en: "Markdown vs HTML: Content Formatting",
      ko: "Markdown vs HTML: 콘텐츠 포맷팅",
      ja: "Markdown vs HTML: コンテンツフォーマット",
    },
    description: {
      en: "Compare Markdown and HTML for content creation.",
      ko: "콘텐츠 작성을 위한 Markdown과 HTML을 비교합니다.",
      ja: "コンテンツ作成のためのMarkdownとHTMLを比較します。",
    },
    comparison: {
      en: [
        ca("Learning Curve", "Easy", "Moderate", "item1"),
        ca("Features", "Basic formatting", "Full control", "item2"),
        ca("Readability", "Highly readable", "Tag-heavy", "item1"),
        ca("Extensibility", "Limited", "Unlimited", "item2"),
      ],
      ko: [
        ca("학습 곡선", "쉬움", "보통", "item1"),
        ca("기능", "기본 포맷팅", "완전한 제어", "item2"),
        ca("가독성", "매우 좋음", "태그 많음", "item1"),
        ca("확장성", "제한적", "무제한", "item2"),
      ],
      ja: [
        ca("学習曲線", "簡単", "普通", "item1"),
        ca("機能", "基本フォーマット", "完全制御", "item2"),
        ca("可読性", "非常に良い", "タグが多い", "item1"),
        ca("拡張性", "限定的", "無制限", "item2"),
      ],
    },
    conclusion: {
      en: "Markdown for docs, HTML for web apps.",
      ko: "문서는 Markdown, 웹 앱은 HTML.",
      ja: "ドキュメントにはMarkdown、WebアプリにはHTML。",
    },
    relatedTool: "markdown-preview",
    keywords: ["markdown vs html", "html vs markdown"],
    searchVolume: 4400,
  },

  "json-vs-toml": {
    slug: "json-vs-toml",
    item1: "JSON",
    item2: "TOML",
    category: "data-format",
    title: {
      en: "JSON vs TOML Comparison",
      ko: "JSON vs TOML 비교",
      ja: "JSON vs TOML 比較",
    },
    description: {
      en: "Compare JSON and TOML formats.",
      ko: "JSON과 TOML 포맷을 비교합니다.",
      ja: "JSONとTOML形式を比較します。",
    },
    comparison: {
      en: [
        ca("Comments", "Not supported", "Supported", "item2"),
        ca("Web Support", "Native", "Needs parser", "item1"),
        ca("Readability", "Good", "Better", "item2"),
        ca("Nesting", "Easy", "Verbose for deep", "item1"),
      ],
      ko: [
        ca("주석", "미지원", "지원", "item2"),
        ca("웹 지원", "네이티브", "파서 필요", "item1"),
        ca("가독성", "좋음", "더 좋음", "item2"),
        ca("중첩", "쉬움", "깊으면 장황", "item1"),
      ],
      ja: [
        ca("コメント", "非対応", "対応", "item2"),
        ca("Web対応", "ネイティブ", "パーサー必要", "item1"),
        ca("可読性", "良い", "より良い", "item2"),
        ca("ネスト", "簡単", "深いと冗長", "item1"),
      ],
    },
    conclusion: {
      en: "JSON for APIs, TOML for config.",
      ko: "API는 JSON, 설정은 TOML.",
      ja: "APIにはJSON、設定にはTOML。",
    },
    relatedTool: "json-formatter",
    keywords: ["json vs toml", "toml vs json"],
    searchVolume: 2900,
  },

  "csv-vs-excel": {
    slug: "csv-vs-excel",
    item1: "CSV",
    item2: "Excel",
    category: "data-format",
    title: {
      en: "CSV vs Excel: Spreadsheet Formats",
      ko: "CSV vs Excel: 스프레드시트 포맷",
      ja: "CSV vs Excel: スプレッドシート形式",
    },
    description: {
      en: "Compare CSV and Excel file formats.",
      ko: "CSV와 Excel 파일 포맷을 비교합니다.",
      ja: "CSVとExcelファイル形式を比較します。",
    },
    comparison: {
      en: [
        ca("Formatting", "None", "Rich formatting", "item2"),
        ca("File Size", "Small", "Larger", "item1"),
        ca("Formulas", "Not supported", "Supported", "item2"),
        ca("Portability", "Universal", "Needs Excel", "item1"),
      ],
      ko: [
        ca("서식", "없음", "풍부한 서식", "item2"),
        ca("파일 크기", "작음", "큼", "item1"),
        ca("수식", "미지원", "지원", "item2"),
        ca("호환성", "보편적", "Excel 필요", "item1"),
      ],
      ja: [
        ca("フォーマット", "なし", "リッチフォーマット", "item2"),
        ca("ファイルサイズ", "小さい", "大きい", "item1"),
        ca("数式", "非対応", "対応", "item2"),
        ca("互換性", "普遍的", "Excel必要", "item1"),
      ],
    },
    conclusion: {
      en: "CSV for data exchange, Excel for analysis.",
      ko: "데이터 교환은 CSV, 분석은 Excel.",
      ja: "データ交換にはCSV、分析にはExcel。",
    },
    relatedTool: "json-formatter",
    keywords: ["csv vs excel", "excel vs csv"],
    searchVolume: 8100,
  },

  "json-vs-protobuf": {
    slug: "json-vs-protobuf",
    item1: "JSON",
    item2: "Protocol Buffers",
    category: "data-format",
    title: {
      en: "JSON vs Protobuf: Serialization Formats",
      ko: "JSON vs Protobuf: 직렬화 포맷",
      ja: "JSON vs Protobuf: シリアライズ形式",
    },
    description: {
      en: "Compare JSON and Protocol Buffers.",
      ko: "JSON과 Protocol Buffers를 비교합니다.",
      ja: "JSONとProtocol Buffersを比較します。",
    },
    comparison: {
      en: [
        ca("Size", "Larger", "Smaller (binary)", "item2"),
        ca("Speed", "Slower", "Faster", "item2"),
        ca("Readability", "Human readable", "Binary format", "item1"),
        ca("Schema", "Optional", "Required", "item1"),
      ],
      ko: [
        ca("크기", "큼", "작음 (바이너리)", "item2"),
        ca("속도", "느림", "빠름", "item2"),
        ca("가독성", "사람이 읽기 쉬움", "바이너리 포맷", "item1"),
        ca("스키마", "선택적", "필수", "item1"),
      ],
      ja: [
        ca("サイズ", "大きい", "小さい(バイナリ)", "item2"),
        ca("速度", "遅い", "速い", "item2"),
        ca("可読性", "人間が読める", "バイナリ形式", "item1"),
        ca("スキーマ", "オプション", "必須", "item1"),
      ],
    },
    conclusion: {
      en: "JSON for debugging, Protobuf for performance.",
      ko: "디버깅은 JSON, 성능은 Protobuf.",
      ja: "デバッグにはJSON、パフォーマンスにはProtobuf。",
    },
    relatedTool: "json-formatter",
    keywords: ["json vs protobuf", "protobuf vs json"],
    searchVolume: 3600,
  },

  "xml-vs-json": {
    slug: "xml-vs-json",
    item1: "XML",
    item2: "JSON",
    category: "data-format",
    title: {
      en: "XML vs JSON: Modern Data Formats",
      ko: "XML vs JSON: 현대 데이터 포맷",
      ja: "XML vs JSON: 現代のデータ形式",
    },
    description: {
      en: "Compare XML and JSON for modern applications.",
      ko: "현대 애플리케이션을 위한 XML과 JSON을 비교합니다.",
      ja: "現代のアプリケーション向けXMLとJSONを比較します。",
    },
    comparison: {
      en: [
        ca("Verbosity", "Very verbose", "Concise", "item2"),
        ca("Browser Support", "Needs parser", "Native", "item2"),
        ca("Metadata", "Attributes support", "No attributes", "item1"),
        ca("Ecosystem", "Mature", "Modern", "tie"),
      ],
      ko: [
        ca("장황함", "매우 장황", "간결", "item2"),
        ca("브라우저 지원", "파서 필요", "네이티브", "item2"),
        ca("메타데이터", "속성 지원", "속성 없음", "item1"),
        ca("생태계", "성숙", "현대적", "tie"),
      ],
      ja: [
        ca("冗長性", "非常に冗長", "簡潔", "item2"),
        ca("ブラウザ対応", "パーサー必要", "ネイティブ", "item2"),
        ca("メタデータ", "属性対応", "属性なし", "item1"),
        ca("エコシステム", "成熟", "モダン", "tie"),
      ],
    },
    conclusion: {
      en: "JSON for web, XML for enterprise.",
      ko: "웹은 JSON, 엔터프라이즈는 XML.",
      ja: "WebにはJSON、エンタープライズにはXML。",
    },
    relatedTool: "json-formatter",
    keywords: ["xml vs json", "json vs xml comparison"],
    searchVolume: 9900,
  },

  // ============================================================
  // 인코딩 비교 (6)
  // ============================================================

  "base64-vs-hex": {
    slug: "base64-vs-hex",
    item1: "Base64",
    item2: "Hexadecimal",
    category: "encoding",
    title: {
      en: "Base64 vs Hex Encoding",
      ko: "Base64 vs Hex 인코딩",
      ja: "Base64 vs 16進エンコード",
    },
    description: {
      en: "Compare Base64 and Hexadecimal encoding.",
      ko: "Base64와 16진수 인코딩을 비교합니다.",
      ja: "Base64と16進エンコードを比較します。",
    },
    comparison: {
      en: [
        ca("Efficiency", "33% overhead", "100% overhead", "item1"),
        ca("Readability", "Less readable", "More readable", "item2"),
        ca("Use Case", "Binary data", "Debugging", "tie"),
        ca("Characters", "A-Za-z0-9+/=", "0-9A-F", "tie"),
      ],
      ko: [
        ca("효율성", "33% 오버헤드", "100% 오버헤드", "item1"),
        ca("가독성", "읽기 어려움", "읽기 쉬움", "item2"),
        ca("용도", "바이너리 데이터", "디버깅", "tie"),
        ca("문자", "A-Za-z0-9+/=", "0-9A-F", "tie"),
      ],
      ja: [
        ca("効率", "33%オーバーヘッド", "100%オーバーヘッド", "item1"),
        ca("可読性", "読みにくい", "読みやすい", "item2"),
        ca("用途", "バイナリデータ", "デバッグ", "tie"),
        ca("文字", "A-Za-z0-9+/=", "0-9A-F", "tie"),
      ],
    },
    conclusion: {
      en: "Base64 for efficiency, Hex for debugging.",
      ko: "효율성은 Base64, 디버깅은 Hex.",
      ja: "効率にはBase64、デバッグには16進数。",
    },
    relatedTool: "base64-converter",
    keywords: ["base64 vs hex", "hex vs base64"],
    searchVolume: 2900,
  },

  "utf8-vs-ascii": {
    slug: "utf8-vs-ascii",
    item1: "UTF-8",
    item2: "ASCII",
    category: "encoding",
    title: {
      en: "UTF-8 vs ASCII Encoding",
      ko: "UTF-8 vs ASCII 인코딩",
      ja: "UTF-8 vs ASCIIエンコード",
    },
    description: {
      en: "Compare UTF-8 and ASCII character encodings.",
      ko: "UTF-8과 ASCII 문자 인코딩을 비교합니다.",
      ja: "UTF-8とASCII文字エンコードを比較します。",
    },
    comparison: {
      en: [
        ca("Characters", "1M+ characters", "128 characters", "item1"),
        ca("Compatibility", "Superset of ASCII", "Limited", "item1"),
        ca("Size", "1-4 bytes", "1 byte", "item2"),
        ca("Languages", "All languages", "English only", "item1"),
      ],
      ko: [
        ca("문자 수", "100만+ 문자", "128 문자", "item1"),
        ca("호환성", "ASCII 상위집합", "제한적", "item1"),
        ca("크기", "1-4 바이트", "1 바이트", "item2"),
        ca("언어", "모든 언어", "영어만", "item1"),
      ],
      ja: [
        ca("文字数", "100万+文字", "128文字", "item1"),
        ca("互換性", "ASCIIのスーパーセット", "限定的", "item1"),
        ca("サイズ", "1-4バイト", "1バイト", "item2"),
        ca("言語", "全言語", "英語のみ", "item1"),
      ],
    },
    conclusion: {
      en: "UTF-8 for modern apps, ASCII for legacy.",
      ko: "현대 앱은 UTF-8, 레거시는 ASCII.",
      ja: "現代アプリにはUTF-8、レガシーにはASCII。",
    },
    relatedTool: "base64-converter",
    keywords: ["utf8 vs ascii", "ascii vs utf8"],
    searchVolume: 4400,
  },

  "url-encoding-vs-base64": {
    slug: "url-encoding-vs-base64",
    item1: "URL Encoding",
    item2: "Base64",
    category: "encoding",
    title: {
      en: "URL Encoding vs Base64",
      ko: "URL 인코딩 vs Base64",
      ja: "URLエンコード vs Base64",
    },
    description: {
      en: "Compare URL encoding and Base64.",
      ko: "URL 인코딩과 Base64를 비교합니다.",
      ja: "URLエンコードとBase64を比較します。",
    },
    comparison: {
      en: [
        ca("Purpose", "URL-safe strings", "Binary to text", "tie"),
        ca("Output", "Percent-encoded", "A-Za-z0-9+/=", "tie"),
        ca("Use Case", "Query params", "Data transfer", "tie"),
        ca("Size", "Variable", "33% larger", "tie"),
      ],
      ko: [
        ca("목적", "URL 안전 문자열", "바이너리를 텍스트로", "tie"),
        ca("출력", "퍼센트 인코딩", "A-Za-z0-9+/=", "tie"),
        ca("용도", "쿼리 파라미터", "데이터 전송", "tie"),
        ca("크기", "가변", "33% 증가", "tie"),
      ],
      ja: [
        ca("目的", "URL安全な文字列", "バイナリからテキスト", "tie"),
        ca("出力", "パーセントエンコード", "A-Za-z0-9+/=", "tie"),
        ca("用途", "クエリパラメータ", "データ転送", "tie"),
        ca("サイズ", "可変", "33%増加", "tie"),
      ],
    },
    conclusion: {
      en: "URL encoding for URLs, Base64 for binary data.",
      ko: "URL에는 URL 인코딩, 바이너리 데이터는 Base64.",
      ja: "URLにはURLエンコード、バイナリデータにはBase64。",
    },
    relatedTool: "url-encoder",
    keywords: ["url encoding vs base64"],
    searchVolume: 1900,
  },

  "base64-vs-base32": {
    slug: "base64-vs-base32",
    item1: "Base64",
    item2: "Base32",
    category: "encoding",
    title: {
      en: "Base64 vs Base32 Encoding",
      ko: "Base64 vs Base32 인코딩",
      ja: "Base64 vs Base32エンコード",
    },
    description: {
      en: "Compare Base64 and Base32 encoding schemes.",
      ko: "Base64와 Base32 인코딩 방식을 비교합니다.",
      ja: "Base64とBase32エンコード方式を比較します。",
    },
    comparison: {
      en: [
        ca("Efficiency", "33% overhead", "60% overhead", "item1"),
        ca("Case Sensitivity", "Case-sensitive", "Case-insensitive", "item2"),
        ca("Characters", "64 characters", "32 characters", "item2"),
        ca("URL Safety", "Needs encoding", "More URL-safe", "item2"),
      ],
      ko: [
        ca("효율성", "33% 오버헤드", "60% 오버헤드", "item1"),
        ca("대소문자 구분", "구분함", "구분 안함", "item2"),
        ca("문자 수", "64 문자", "32 문자", "item2"),
        ca("URL 안전", "인코딩 필요", "더 URL 안전", "item2"),
      ],
      ja: [
        ca("効率", "33%オーバーヘッド", "60%オーバーヘッド", "item1"),
        ca("大文字小文字", "区別する", "区別しない", "item2"),
        ca("文字数", "64文字", "32文字", "item2"),
        ca("URL安全", "エンコード必要", "よりURL安全", "item2"),
      ],
    },
    conclusion: {
      en: "Base64 for efficiency, Base32 for compatibility.",
      ko: "효율성은 Base64, 호환성은 Base32.",
      ja: "効率にはBase64、互換性にはBase32。",
    },
    relatedTool: "base64-converter",
    keywords: ["base64 vs base32", "base32 vs base64"],
    searchVolume: 1600,
  },

  "unicode-vs-utf8": {
    slug: "unicode-vs-utf8",
    item1: "Unicode",
    item2: "UTF-8",
    category: "encoding",
    title: {
      en: "Unicode vs UTF-8: What's the Difference?",
      ko: "Unicode vs UTF-8: 차이점은?",
      ja: "Unicode vs UTF-8: 違いは?",
    },
    description: {
      en: "Understand the relationship between Unicode and UTF-8.",
      ko: "Unicode와 UTF-8의 관계를 이해합니다.",
      ja: "UnicodeとUTF-8の関係を理解します。",
    },
    comparison: {
      en: [
        ca("Type", "Character set", "Encoding scheme", "tie"),
        ca("Purpose", "Define characters", "Store characters", "tie"),
        ca("Size", "Code points", "1-4 bytes", "tie"),
        ca("Relationship", "Standard", "Implementation", "tie"),
      ],
      ko: [
        ca("유형", "문자 집합", "인코딩 방식", "tie"),
        ca("목적", "문자 정의", "문자 저장", "tie"),
        ca("크기", "코드 포인트", "1-4 바이트", "tie"),
        ca("관계", "표준", "구현", "tie"),
      ],
      ja: [
        ca("種類", "文字セット", "エンコード方式", "tie"),
        ca("目的", "文字を定義", "文字を保存", "tie"),
        ca("サイズ", "コードポイント", "1-4バイト", "tie"),
        ca("関係", "標準", "実装", "tie"),
      ],
    },
    conclusion: {
      en: "Unicode is the standard, UTF-8 is how it's stored.",
      ko: "Unicode는 표준, UTF-8은 저장 방식입니다.",
      ja: "Unicodeは標準、UTF-8は保存方法です。",
    },
    relatedTool: "base64-converter",
    keywords: ["unicode vs utf8", "utf8 vs unicode"],
    searchVolume: 6600,
  },

  "percent-encoding-vs-url-encoding": {
    slug: "percent-encoding-vs-url-encoding",
    item1: "Percent Encoding",
    item2: "URL Encoding",
    category: "encoding",
    title: {
      en: "Percent Encoding vs URL Encoding",
      ko: "퍼센트 인코딩 vs URL 인코딩",
      ja: "パーセントエンコード vs URLエンコード",
    },
    description: {
      en: "Are percent encoding and URL encoding the same?",
      ko: "퍼센트 인코딩과 URL 인코딩은 같은 것인가요?",
      ja: "パーセントエンコードとURLエンコードは同じですか?",
    },
    comparison: {
      en: [
        ca("Definition", "RFC 3986 term", "Common term", "tie"),
        ca("Meaning", "Same thing", "Same thing", "tie"),
        ca("Format", "%XX", "%XX", "tie"),
        ca("Usage", "Technical docs", "General use", "tie"),
      ],
      ko: [
        ca("정의", "RFC 3986 용어", "일반 용어", "tie"),
        ca("의미", "동일함", "동일함", "tie"),
        ca("형식", "%XX", "%XX", "tie"),
        ca("사용", "기술 문서", "일반 사용", "tie"),
      ],
      ja: [
        ca("定義", "RFC 3986用語", "一般用語", "tie"),
        ca("意味", "同じもの", "同じもの", "tie"),
        ca("形式", "%XX", "%XX", "tie"),
        ca("使用", "技術文書", "一般使用", "tie"),
      ],
    },
    conclusion: {
      en: "They are the same thing with different names.",
      ko: "다른 이름의 동일한 개념입니다.",
      ja: "異なる名前の同じものです。",
    },
    relatedTool: "url-encoder",
    keywords: ["percent encoding vs url encoding"],
    searchVolume: 1300,
  },

  // ============================================================
  // 해시 알고리즘 비교 (6)
  // ============================================================

  "md5-vs-sha256": {
    slug: "md5-vs-sha256",
    item1: "MD5",
    item2: "SHA-256",
    category: "hash",
    title: {
      en: "MD5 vs SHA-256: Hash Algorithm Comparison",
      ko: "MD5 vs SHA-256: 해시 알고리즘 비교",
      ja: "MD5 vs SHA-256: ハッシュアルゴリズム比較",
    },
    description: {
      en: "Compare MD5 and SHA-256 hash algorithms for security.",
      ko: "보안을 위한 MD5와 SHA-256 해시 알고리즘을 비교합니다.",
      ja: "セキュリティのためのMD5とSHA-256ハッシュアルゴリズムを比較します。",
    },
    comparison: {
      en: [
        ca("Security", "Broken", "Secure", "item2"),
        ca("Hash Length", "128 bits", "256 bits", "item2"),
        ca("Speed", "Faster", "Slower", "item1"),
        ca("Collision Resistance", "Vulnerable", "Strong", "item2"),
      ],
      ko: [
        ca("보안", "취약", "안전", "item2"),
        ca("해시 길이", "128 비트", "256 비트", "item2"),
        ca("속도", "빠름", "느림", "item1"),
        ca("충돌 저항", "취약", "강함", "item2"),
      ],
      ja: [
        ca("セキュリティ", "脆弱", "安全", "item2"),
        ca("ハッシュ長", "128ビット", "256ビット", "item2"),
        ca("速度", "高速", "低速", "item1"),
        ca("衝突耐性", "脆弱", "強い", "item2"),
      ],
    },
    conclusion: {
      en: "Use SHA-256 for security, MD5 only for checksums.",
      ko: "보안에는 SHA-256, 체크섬에만 MD5를 사용하세요.",
      ja: "セキュリティにはSHA-256、チェックサムにのみMD5を使用してください。",
    },
    relatedTool: "hash-generator",
    keywords: ["md5 vs sha256", "sha256 vs md5"],
    searchVolume: 8100,
  },

  "sha1-vs-sha256": {
    slug: "sha1-vs-sha256",
    item1: "SHA-1",
    item2: "SHA-256",
    category: "hash",
    title: {
      en: "SHA-1 vs SHA-256 Comparison",
      ko: "SHA-1 vs SHA-256 비교",
      ja: "SHA-1 vs SHA-256 比較",
    },
    description: {
      en: "Compare SHA-1 and SHA-256 hash functions.",
      ko: "SHA-1과 SHA-256 해시 함수를 비교합니다.",
      ja: "SHA-1とSHA-256ハッシュ関数を比較します。",
    },
    comparison: {
      en: [
        ca("Security", "Deprecated", "Recommended", "item2"),
        ca("Hash Length", "160 bits", "256 bits", "item2"),
        ca("Performance", "Faster", "Slower", "item1"),
        ca("Usage", "Legacy only", "Modern standard", "item2"),
      ],
      ko: [
        ca("보안", "사용 중단", "권장", "item2"),
        ca("해시 길이", "160 비트", "256 비트", "item2"),
        ca("성능", "빠름", "느림", "item1"),
        ca("사용", "레거시만", "현대 표준", "item2"),
      ],
      ja: [
        ca("セキュリティ", "非推奨", "推奨", "item2"),
        ca("ハッシュ長", "160ビット", "256ビット", "item2"),
        ca("パフォーマンス", "高速", "低速", "item1"),
        ca("使用", "レガシーのみ", "現代標準", "item2"),
      ],
    },
    conclusion: {
      en: "Always prefer SHA-256 over SHA-1.",
      ko: "항상 SHA-1보다 SHA-256을 사용하세요.",
      ja: "常にSHA-1よりSHA-256を優先してください。",
    },
    relatedTool: "hash-generator",
    keywords: ["sha1 vs sha256", "sha256 vs sha1"],
    searchVolume: 5400,
  },

  "sha256-vs-sha512": {
    slug: "sha256-vs-sha512",
    item1: "SHA-256",
    item2: "SHA-512",
    category: "hash",
    title: {
      en: "SHA-256 vs SHA-512: Which to Use?",
      ko: "SHA-256 vs SHA-512: 어떤 것을 사용할까?",
      ja: "SHA-256 vs SHA-512: どちらを使う?",
    },
    description: {
      en: "Compare SHA-256 and SHA-512 hash algorithms.",
      ko: "SHA-256과 SHA-512 해시 알고리즘을 비교합니다.",
      ja: "SHA-256とSHA-512ハッシュアルゴリズムを比較します。",
    },
    comparison: {
      en: [
        ca("Hash Length", "256 bits", "512 bits", "item2"),
        ca("Security", "Very secure", "More secure", "item2"),
        ca("64-bit Performance", "Good", "Better", "item2"),
        ca("32-bit Performance", "Better", "Slower", "item1"),
      ],
      ko: [
        ca("해시 길이", "256 비트", "512 비트", "item2"),
        ca("보안", "매우 안전", "더 안전", "item2"),
        ca("64비트 성능", "좋음", "더 좋음", "item2"),
        ca("32비트 성능", "더 좋음", "느림", "item1"),
      ],
      ja: [
        ca("ハッシュ長", "256ビット", "512ビット", "item2"),
        ca("セキュリティ", "非常に安全", "より安全", "item2"),
        ca("64bit性能", "良い", "より良い", "item2"),
        ca("32bit性能", "より良い", "遅い", "item1"),
      ],
    },
    conclusion: {
      en: "SHA-256 for most uses, SHA-512 for 64-bit systems.",
      ko: "대부분은 SHA-256, 64비트 시스템은 SHA-512.",
      ja: "ほとんどの用途にはSHA-256、64bitシステムにはSHA-512。",
    },
    relatedTool: "hash-generator",
    keywords: ["sha256 vs sha512", "sha512 vs sha256"],
    searchVolume: 3600,
  },

  "bcrypt-vs-argon2": {
    slug: "bcrypt-vs-argon2",
    item1: "bcrypt",
    item2: "Argon2",
    category: "hash",
    title: {
      en: "bcrypt vs Argon2: Password Hashing",
      ko: "bcrypt vs Argon2: 비밀번호 해싱",
      ja: "bcrypt vs Argon2: パスワードハッシュ",
    },
    description: {
      en: "Compare bcrypt and Argon2 for password hashing.",
      ko: "비밀번호 해싱을 위한 bcrypt와 Argon2를 비교합니다.",
      ja: "パスワードハッシュのためのbcryptとArgon2を比較します。",
    },
    comparison: {
      en: [
        ca("Age", "1999", "2015 winner", "item2"),
        ca("GPU Resistance", "Good", "Better", "item2"),
        ca("Memory Hard", "No", "Yes", "item2"),
        ca("Adoption", "Widespread", "Growing", "item1"),
      ],
      ko: [
        ca("연도", "1999", "2015 우승", "item2"),
        ca("GPU 저항", "좋음", "더 좋음", "item2"),
        ca("메모리 하드", "아니오", "예", "item2"),
        ca("채택", "널리 사용", "증가 중", "item1"),
      ],
      ja: [
        ca("年代", "1999", "2015優勝", "item2"),
        ca("GPU耐性", "良い", "より良い", "item2"),
        ca("メモリハード", "いいえ", "はい", "item2"),
        ca("採用", "広範囲", "増加中", "item1"),
      ],
    },
    conclusion: {
      en: "Argon2 for new projects, bcrypt still acceptable.",
      ko: "새 프로젝트는 Argon2, bcrypt도 여전히 괜찮습니다.",
      ja: "新しいプロジェクトにはArgon2、bcryptも依然として許容可能。",
    },
    relatedTool: "hash-generator",
    keywords: ["bcrypt vs argon2", "argon2 vs bcrypt"],
    searchVolume: 4400,
  },

  "md5-vs-sha1": {
    slug: "md5-vs-sha1",
    item1: "MD5",
    item2: "SHA-1",
    category: "hash",
    title: {
      en: "MD5 vs SHA-1: Legacy Hash Comparison",
      ko: "MD5 vs SHA-1: 레거시 해시 비교",
      ja: "MD5 vs SHA-1: レガシーハッシュ比較",
    },
    description: {
      en: "Compare MD5 and SHA-1 legacy hash functions.",
      ko: "MD5와 SHA-1 레거시 해시 함수를 비교합니다.",
      ja: "MD5とSHA-1レガシーハッシュ関数を比較します。",
    },
    comparison: {
      en: [
        ca("Hash Length", "128 bits", "160 bits", "item2"),
        ca("Security", "Broken", "Broken", "tie"),
        ca("Speed", "Faster", "Slower", "item1"),
        ca("Status", "Deprecated", "Deprecated", "tie"),
      ],
      ko: [
        ca("해시 길이", "128 비트", "160 비트", "item2"),
        ca("보안", "취약", "취약", "tie"),
        ca("속도", "빠름", "느림", "item1"),
        ca("상태", "사용 중단", "사용 중단", "tie"),
      ],
      ja: [
        ca("ハッシュ長", "128ビット", "160ビット", "item2"),
        ca("セキュリティ", "脆弱", "脆弱", "tie"),
        ca("速度", "高速", "低速", "item1"),
        ca("状態", "非推奨", "非推奨", "tie"),
      ],
    },
    conclusion: {
      en: "Both are deprecated. Use SHA-256 instead.",
      ko: "둘 다 사용 중단되었습니다. SHA-256을 사용하세요.",
      ja: "両方とも非推奨です。SHA-256を使用してください。",
    },
    relatedTool: "hash-generator",
    keywords: ["md5 vs sha1", "sha1 vs md5"],
    searchVolume: 3600,
  },

  "sha256-vs-sha3": {
    slug: "sha256-vs-sha3",
    item1: "SHA-256",
    item2: "SHA-3",
    category: "hash",
    title: {
      en: "SHA-256 vs SHA-3 Comparison",
      ko: "SHA-256 vs SHA-3 비교",
      ja: "SHA-256 vs SHA-3 比較",
    },
    description: {
      en: "Compare SHA-256 and SHA-3 hash algorithms.",
      ko: "SHA-256과 SHA-3 해시 알고리즘을 비교합니다.",
      ja: "SHA-256とSHA-3ハッシュアルゴリズムを比較します。",
    },
    comparison: {
      en: [
        ca("Design", "Merkle-Damgård", "Sponge construction", "tie"),
        ca("Adoption", "Widespread", "Limited", "item1"),
        ca("Security", "Secure", "Secure", "tie"),
        ca("Resistance", "Length extension", "Better resistance", "item2"),
      ],
      ko: [
        ca("설계", "Merkle-Damgård", "스펀지 구조", "tie"),
        ca("채택", "널리 사용", "제한적", "item1"),
        ca("보안", "안전", "안전", "tie"),
        ca("저항", "길이 확장 공격", "더 나은 저항", "item2"),
      ],
      ja: [
        ca("設計", "Merkle-Damgård", "スポンジ構造", "tie"),
        ca("採用", "広範囲", "限定的", "item1"),
        ca("セキュリティ", "安全", "安全", "tie"),
        ca("耐性", "長さ拡張攻撃", "より良い耐性", "item2"),
      ],
    },
    conclusion: {
      en: "SHA-256 for compatibility, SHA-3 for new designs.",
      ko: "호환성은 SHA-256, 새 설계는 SHA-3.",
      ja: "互換性にはSHA-256、新しい設計にはSHA-3。",
    },
    relatedTool: "hash-generator",
    keywords: ["sha256 vs sha3", "sha3 vs sha256"],
    searchVolume: 2400,
  },

  // ============================================================
  // 이미지 포맷 비교 (6)
  // ============================================================

  "png-vs-jpeg": {
    slug: "png-vs-jpeg",
    item1: "PNG",
    item2: "JPEG",
    category: "image",
    title: {
      en: "PNG vs JPEG: Image Format Guide",
      ko: "PNG vs JPEG: 이미지 포맷 가이드",
      ja: "PNG vs JPEG: 画像形式ガイド",
    },
    description: {
      en: "Compare PNG and JPEG image formats.",
      ko: "PNG와 JPEG 이미지 포맷을 비교합니다.",
      ja: "PNGとJPEG画像形式を比較します。",
    },
    comparison: {
      en: [
        ca("Compression", "Lossless", "Lossy", "item1"),
        ca("Transparency", "Supported", "Not supported", "item1"),
        ca("File Size", "Larger", "Smaller", "item2"),
        ca("Best For", "Graphics/logos", "Photos", "tie"),
      ],
      ko: [
        ca("압축", "무손실", "손실", "item1"),
        ca("투명도", "지원", "미지원", "item1"),
        ca("파일 크기", "큼", "작음", "item2"),
        ca("적합", "그래픽/로고", "사진", "tie"),
      ],
      ja: [
        ca("圧縮", "可逆", "非可逆", "item1"),
        ca("透明度", "対応", "非対応", "item1"),
        ca("ファイルサイズ", "大きい", "小さい", "item2"),
        ca("適した用途", "グラフィック/ロゴ", "写真", "tie"),
      ],
    },
    conclusion: {
      en: "PNG for graphics, JPEG for photos.",
      ko: "그래픽은 PNG, 사진은 JPEG.",
      ja: "グラフィックにはPNG、写真にはJPEG。",
    },
    relatedTool: "image-converter",
    keywords: ["png vs jpeg", "jpeg vs png", "png vs jpg"],
    searchVolume: 14800,
  },

  "webp-vs-png": {
    slug: "webp-vs-png",
    item1: "WebP",
    item2: "PNG",
    category: "image",
    title: {
      en: "WebP vs PNG: Modern vs Classic",
      ko: "WebP vs PNG: 현대 vs 클래식",
      ja: "WebP vs PNG: モダン vs クラシック",
    },
    description: {
      en: "Compare WebP and PNG image formats.",
      ko: "WebP와 PNG 이미지 포맷을 비교합니다.",
      ja: "WebPとPNG画像形式を比較します。",
    },
    comparison: {
      en: [
        ca("File Size", "26% smaller", "Larger", "item1"),
        ca("Quality", "Same quality", "Same quality", "tie"),
        ca("Browser Support", "Modern browsers", "Universal", "item2"),
        ca("Transparency", "Supported", "Supported", "tie"),
      ],
      ko: [
        ca("파일 크기", "26% 작음", "큼", "item1"),
        ca("품질", "동일 품질", "동일 품질", "tie"),
        ca("브라우저 지원", "최신 브라우저", "모든 브라우저", "item2"),
        ca("투명도", "지원", "지원", "tie"),
      ],
      ja: [
        ca("ファイルサイズ", "26%小さい", "大きい", "item1"),
        ca("品質", "同等品質", "同等品質", "tie"),
        ca("ブラウザ対応", "現代ブラウザ", "全ブラウザ", "item2"),
        ca("透明度", "対応", "対応", "tie"),
      ],
    },
    conclusion: {
      en: "WebP for web, PNG for compatibility.",
      ko: "웹은 WebP, 호환성은 PNG.",
      ja: "WebにはWebP、互換性にはPNG。",
    },
    relatedTool: "image-converter",
    keywords: ["webp vs png", "png vs webp"],
    searchVolume: 9900,
  },

  "svg-vs-png": {
    slug: "svg-vs-png",
    item1: "SVG",
    item2: "PNG",
    category: "image",
    title: {
      en: "SVG vs PNG: Vector vs Raster",
      ko: "SVG vs PNG: 벡터 vs 래스터",
      ja: "SVG vs PNG: ベクター vs ラスター",
    },
    description: {
      en: "Compare SVG and PNG for different use cases.",
      ko: "다양한 용도에 맞는 SVG와 PNG를 비교합니다.",
      ja: "さまざまな用途向けのSVGとPNGを比較します。",
    },
    comparison: {
      en: [
        ca("Type", "Vector", "Raster", "tie"),
        ca("Scalability", "Infinite", "Fixed resolution", "item1"),
        ca("File Size", "Small for icons", "Large for icons", "item1"),
        ca("Editing", "Code-based", "Pixel-based", "tie"),
      ],
      ko: [
        ca("유형", "벡터", "래스터", "tie"),
        ca("확장성", "무한", "고정 해상도", "item1"),
        ca("파일 크기", "아이콘에 작음", "아이콘에 큼", "item1"),
        ca("편집", "코드 기반", "픽셀 기반", "tie"),
      ],
      ja: [
        ca("種類", "ベクター", "ラスター", "tie"),
        ca("拡張性", "無限", "固定解像度", "item1"),
        ca("ファイルサイズ", "アイコンに小さい", "アイコンに大きい", "item1"),
        ca("編集", "コードベース", "ピクセルベース", "tie"),
      ],
    },
    conclusion: {
      en: "SVG for icons/logos, PNG for complex images.",
      ko: "아이콘/로고는 SVG, 복잡한 이미지는 PNG.",
      ja: "アイコン/ロゴにはSVG、複雑な画像にはPNG。",
    },
    relatedTool: "image-converter",
    keywords: ["svg vs png", "png vs svg"],
    searchVolume: 8100,
  },

  "gif-vs-webp": {
    slug: "gif-vs-webp",
    item1: "GIF",
    item2: "WebP",
    category: "image",
    title: {
      en: "GIF vs WebP for Animations",
      ko: "애니메이션을 위한 GIF vs WebP",
      ja: "アニメーション用GIF vs WebP",
    },
    description: {
      en: "Compare GIF and WebP for animated images.",
      ko: "애니메이션 이미지를 위한 GIF와 WebP를 비교합니다.",
      ja: "アニメーション画像用のGIFとWebPを比較します。",
    },
    comparison: {
      en: [
        ca("Colors", "256 colors", "16M colors", "item2"),
        ca("File Size", "Larger", "Much smaller", "item2"),
        ca("Quality", "Limited", "High quality", "item2"),
        ca("Support", "Universal", "Modern browsers", "item1"),
      ],
      ko: [
        ca("색상", "256 색상", "1600만 색상", "item2"),
        ca("파일 크기", "큼", "훨씬 작음", "item2"),
        ca("품질", "제한적", "고품질", "item2"),
        ca("지원", "모든 브라우저", "최신 브라우저", "item1"),
      ],
      ja: [
        ca("色数", "256色", "1600万色", "item2"),
        ca("ファイルサイズ", "大きい", "非常に小さい", "item2"),
        ca("品質", "限定的", "高品質", "item2"),
        ca("対応", "全ブラウザ", "現代ブラウザ", "item1"),
      ],
    },
    conclusion: {
      en: "WebP for quality, GIF for compatibility.",
      ko: "품질은 WebP, 호환성은 GIF.",
      ja: "品質にはWebP、互換性にはGIF。",
    },
    relatedTool: "image-converter",
    keywords: ["gif vs webp", "webp vs gif"],
    searchVolume: 4400,
  },

  "avif-vs-webp": {
    slug: "avif-vs-webp",
    item1: "AVIF",
    item2: "WebP",
    category: "image",
    title: {
      en: "AVIF vs WebP: Next-Gen Formats",
      ko: "AVIF vs WebP: 차세대 포맷",
      ja: "AVIF vs WebP: 次世代形式",
    },
    description: {
      en: "Compare AVIF and WebP modern image formats.",
      ko: "AVIF와 WebP 현대 이미지 포맷을 비교합니다.",
      ja: "AVIFとWebP現代画像形式を比較します。",
    },
    comparison: {
      en: [
        ca("Compression", "Better", "Good", "item1"),
        ca("Browser Support", "Growing", "Wide", "item2"),
        ca("Encode Speed", "Slow", "Fast", "item2"),
        ca("Quality", "Superior", "Very good", "item1"),
      ],
      ko: [
        ca("압축", "더 좋음", "좋음", "item1"),
        ca("브라우저 지원", "증가 중", "광범위", "item2"),
        ca("인코딩 속도", "느림", "빠름", "item2"),
        ca("품질", "우수", "매우 좋음", "item1"),
      ],
      ja: [
        ca("圧縮", "より良い", "良い", "item1"),
        ca("ブラウザ対応", "増加中", "広範囲", "item2"),
        ca("エンコード速度", "遅い", "速い", "item2"),
        ca("品質", "優れている", "非常に良い", "item1"),
      ],
    },
    conclusion: {
      en: "AVIF for best quality, WebP for wider support.",
      ko: "최고 품질은 AVIF, 넓은 지원은 WebP.",
      ja: "最高品質にはAVIF、広いサポートにはWebP。",
    },
    relatedTool: "image-converter",
    keywords: ["avif vs webp", "webp vs avif"],
    searchVolume: 5400,
  },

  "jpeg-vs-webp": {
    slug: "jpeg-vs-webp",
    item1: "JPEG",
    item2: "WebP",
    category: "image",
    title: {
      en: "JPEG vs WebP: Photo Format Comparison",
      ko: "JPEG vs WebP: 사진 포맷 비교",
      ja: "JPEG vs WebP: 写真形式比較",
    },
    description: {
      en: "Compare JPEG and WebP for photos.",
      ko: "사진을 위한 JPEG와 WebP를 비교합니다.",
      ja: "写真用のJPEGとWebPを比較します。",
    },
    comparison: {
      en: [
        ca("File Size", "Larger", "25-34% smaller", "item2"),
        ca("Quality", "Good", "Same or better", "item2"),
        ca("Support", "Universal", "Modern browsers", "item1"),
        ca("Transparency", "No", "Yes", "item2"),
      ],
      ko: [
        ca("파일 크기", "큼", "25-34% 작음", "item2"),
        ca("품질", "좋음", "동일 또는 더 좋음", "item2"),
        ca("지원", "모든 브라우저", "최신 브라우저", "item1"),
        ca("투명도", "없음", "있음", "item2"),
      ],
      ja: [
        ca("ファイルサイズ", "大きい", "25-34%小さい", "item2"),
        ca("品質", "良い", "同等以上", "item2"),
        ca("対応", "全ブラウザ", "現代ブラウザ", "item1"),
        ca("透明度", "なし", "あり", "item2"),
      ],
    },
    conclusion: {
      en: "WebP for web, JPEG for legacy systems.",
      ko: "웹은 WebP, 레거시 시스템은 JPEG.",
      ja: "WebにはWebP、レガシーシステムにはJPEG。",
    },
    relatedTool: "image-converter",
    keywords: ["jpeg vs webp", "webp vs jpeg"],
    searchVolume: 6600,
  },

  // ============================================================
  // 코드/도구 비교 (6)
  // ============================================================

  "regex-vs-glob": {
    slug: "regex-vs-glob",
    item1: "Regex",
    item2: "Glob",
    category: "code",
    title: {
      en: "Regex vs Glob Patterns",
      ko: "Regex vs Glob 패턴",
      ja: "Regex vs Globパターン",
    },
    description: {
      en: "Compare regex and glob pattern matching.",
      ko: "Regex와 Glob 패턴 매칭을 비교합니다.",
      ja: "RegexとGlobパターンマッチングを比較します。",
    },
    comparison: {
      en: [
        ca("Complexity", "Complex", "Simple", "item2"),
        ca("Power", "Very powerful", "Limited", "item1"),
        ca("Use Case", "Text processing", "File matching", "tie"),
        ca("Learning", "Steep curve", "Easy", "item2"),
      ],
      ko: [
        ca("복잡성", "복잡", "단순", "item2"),
        ca("기능", "매우 강력", "제한적", "item1"),
        ca("용도", "텍스트 처리", "파일 매칭", "tie"),
        ca("학습", "가파른 곡선", "쉬움", "item2"),
      ],
      ja: [
        ca("複雑さ", "複雑", "シンプル", "item2"),
        ca("機能", "非常に強力", "限定的", "item1"),
        ca("用途", "テキスト処理", "ファイルマッチング", "tie"),
        ca("学習", "急な曲線", "簡単", "item2"),
      ],
    },
    conclusion: {
      en: "Regex for text, Glob for filenames.",
      ko: "텍스트는 Regex, 파일명은 Glob.",
      ja: "テキストにはRegex、ファイル名にはGlob。",
    },
    relatedTool: "regex-tester",
    keywords: ["regex vs glob", "glob vs regex"],
    searchVolume: 2900,
  },

  "jwt-vs-session": {
    slug: "jwt-vs-session",
    item1: "JWT",
    item2: "Session",
    category: "code",
    title: {
      en: "JWT vs Session Authentication",
      ko: "JWT vs Session 인증",
      ja: "JWT vs Session認証",
    },
    description: {
      en: "Compare JWT and session-based authentication.",
      ko: "JWT와 세션 기반 인증을 비교합니다.",
      ja: "JWTとセッションベース認証を比較します。",
    },
    comparison: {
      en: [
        ca("Storage", "Client-side", "Server-side", "tie"),
        ca("Scalability", "Stateless", "Stateful", "item1"),
        ca("Security", "XSS risk", "CSRF risk", "tie"),
        ca("Revocation", "Difficult", "Easy", "item2"),
      ],
      ko: [
        ca("저장소", "클라이언트", "서버", "tie"),
        ca("확장성", "상태 없음", "상태 있음", "item1"),
        ca("보안", "XSS 위험", "CSRF 위험", "tie"),
        ca("취소", "어려움", "쉬움", "item2"),
      ],
      ja: [
        ca("ストレージ", "クライアント側", "サーバー側", "tie"),
        ca("拡張性", "ステートレス", "ステートフル", "item1"),
        ca("セキュリティ", "XSSリスク", "CSRFリスク", "tie"),
        ca("無効化", "難しい", "簡単", "item2"),
      ],
    },
    conclusion: {
      en: "JWT for APIs, Sessions for traditional web apps.",
      ko: "API는 JWT, 전통적인 웹 앱은 Session.",
      ja: "APIにはJWT、従来のWebアプリにはSession。",
    },
    relatedTool: "jwt-decoder",
    keywords: ["jwt vs session", "session vs jwt"],
    searchVolume: 8100,
  },

  "uuid-vs-ulid": {
    slug: "uuid-vs-ulid",
    item1: "UUID",
    item2: "ULID",
    category: "code",
    title: {
      en: "UUID vs ULID: Unique ID Comparison",
      ko: "UUID vs ULID: 고유 ID 비교",
      ja: "UUID vs ULID: ユニークID比較",
    },
    description: {
      en: "Compare UUID and ULID for unique identifiers.",
      ko: "고유 식별자를 위한 UUID와 ULID를 비교합니다.",
      ja: "一意識別子のためのUUIDとULIDを比較します。",
    },
    comparison: {
      en: [
        ca("Sortable", "No (v4)", "Yes", "item2"),
        ca("Format", "8-4-4-4-12", "26 chars", "item2"),
        ca("Adoption", "Universal", "Growing", "item1"),
        ca("Timestamp", "v1 only", "Built-in", "item2"),
      ],
      ko: [
        ca("정렬 가능", "아니오 (v4)", "예", "item2"),
        ca("형식", "8-4-4-4-12", "26 문자", "item2"),
        ca("채택", "보편적", "증가 중", "item1"),
        ca("타임스탬프", "v1만", "내장", "item2"),
      ],
      ja: [
        ca("ソート可能", "いいえ(v4)", "はい", "item2"),
        ca("形式", "8-4-4-4-12", "26文字", "item2"),
        ca("採用", "普遍的", "増加中", "item1"),
        ca("タイムスタンプ", "v1のみ", "内蔵", "item2"),
      ],
    },
    conclusion: {
      en: "ULID for sortable IDs, UUID for compatibility.",
      ko: "정렬 가능한 ID는 ULID, 호환성은 UUID.",
      ja: "ソート可能なIDにはULID、互換性にはUUID。",
    },
    relatedTool: "uuid-generator",
    keywords: ["uuid vs ulid", "ulid vs uuid"],
    searchVolume: 3600,
  },

  "rest-vs-graphql": {
    slug: "rest-vs-graphql",
    item1: "REST",
    item2: "GraphQL",
    category: "code",
    title: {
      en: "REST vs GraphQL API Comparison",
      ko: "REST vs GraphQL API 비교",
      ja: "REST vs GraphQL API比較",
    },
    description: {
      en: "Compare REST and GraphQL API architectures.",
      ko: "REST와 GraphQL API 아키텍처를 비교합니다.",
      ja: "RESTとGraphQL APIアーキテクチャを比較します。",
    },
    comparison: {
      en: [
        ca("Data Fetching", "Fixed endpoints", "Flexible queries", "item2"),
        ca("Overfetching", "Common", "Avoided", "item2"),
        ca("Caching", "HTTP caching", "Complex", "item1"),
        ca("Learning Curve", "Simple", "Steeper", "item1"),
      ],
      ko: [
        ca("데이터 페칭", "고정 엔드포인트", "유연한 쿼리", "item2"),
        ca("오버페칭", "흔함", "회피", "item2"),
        ca("캐싱", "HTTP 캐싱", "복잡", "item1"),
        ca("학습 곡선", "단순", "가파름", "item1"),
      ],
      ja: [
        ca("データ取得", "固定エンドポイント", "柔軟なクエリ", "item2"),
        ca("オーバーフェッチ", "よくある", "回避", "item2"),
        ca("キャッシュ", "HTTPキャッシュ", "複雑", "item1"),
        ca("学習曲線", "シンプル", "急", "item1"),
      ],
    },
    conclusion: {
      en: "REST for simple APIs, GraphQL for complex data needs.",
      ko: "단순한 API는 REST, 복잡한 데이터는 GraphQL.",
      ja: "シンプルなAPIにはREST、複雑なデータにはGraphQL。",
    },
    relatedTool: "json-formatter",
    keywords: ["rest vs graphql", "graphql vs rest"],
    searchVolume: 12100,
  },

  "sql-vs-nosql": {
    slug: "sql-vs-nosql",
    item1: "SQL",
    item2: "NoSQL",
    category: "code",
    title: {
      en: "SQL vs NoSQL Database Comparison",
      ko: "SQL vs NoSQL 데이터베이스 비교",
      ja: "SQL vs NoSQLデータベース比較",
    },
    description: {
      en: "Compare SQL and NoSQL database types.",
      ko: "SQL과 NoSQL 데이터베이스 유형을 비교합니다.",
      ja: "SQLとNoSQLデータベースタイプを比較します。",
    },
    comparison: {
      en: [
        ca("Schema", "Strict", "Flexible", "item2"),
        ca("Scaling", "Vertical", "Horizontal", "item2"),
        ca("ACID", "Full support", "Varies", "item1"),
        ca("Relationships", "Strong", "Weak/None", "item1"),
      ],
      ko: [
        ca("스키마", "엄격", "유연", "item2"),
        ca("확장", "수직", "수평", "item2"),
        ca("ACID", "완전 지원", "다양함", "item1"),
        ca("관계", "강함", "약함/없음", "item1"),
      ],
      ja: [
        ca("スキーマ", "厳密", "柔軟", "item2"),
        ca("スケーリング", "垂直", "水平", "item2"),
        ca("ACID", "完全対応", "様々", "item1"),
        ca("リレーション", "強い", "弱い/なし", "item1"),
      ],
    },
    conclusion: {
      en: "SQL for structured data, NoSQL for flexibility.",
      ko: "구조화된 데이터는 SQL, 유연성은 NoSQL.",
      ja: "構造化データにはSQL、柔軟性にはNoSQL。",
    },
    relatedTool: "sql-formatter",
    keywords: ["sql vs nosql", "nosql vs sql"],
    searchVolume: 14800,
  },

  "typescript-vs-javascript": {
    slug: "typescript-vs-javascript",
    item1: "TypeScript",
    item2: "JavaScript",
    category: "code",
    title: {
      en: "TypeScript vs JavaScript",
      ko: "TypeScript vs JavaScript",
      ja: "TypeScript vs JavaScript",
    },
    description: {
      en: "Compare TypeScript and JavaScript.",
      ko: "TypeScript와 JavaScript를 비교합니다.",
      ja: "TypeScriptとJavaScriptを比較します。",
    },
    comparison: {
      en: [
        ca("Type Safety", "Static typing", "Dynamic", "item1"),
        ca("Learning", "More to learn", "Simpler", "item2"),
        ca("Tooling", "Better IDE support", "Good", "item1"),
        ca("Runtime", "Compiles to JS", "Native", "item2"),
      ],
      ko: [
        ca("타입 안전", "정적 타이핑", "동적", "item1"),
        ca("학습", "더 많이 배움", "단순", "item2"),
        ca("도구", "더 나은 IDE 지원", "좋음", "item1"),
        ca("런타임", "JS로 컴파일", "네이티브", "item2"),
      ],
      ja: [
        ca("型安全", "静的型付け", "動的", "item1"),
        ca("学習", "より多く学ぶ", "シンプル", "item2"),
        ca("ツール", "より良いIDE対応", "良い", "item1"),
        ca("ランタイム", "JSにコンパイル", "ネイティブ", "item2"),
      ],
    },
    conclusion: {
      en: "TypeScript for large projects, JavaScript for quick scripts.",
      ko: "대규모 프로젝트는 TypeScript, 빠른 스크립트는 JavaScript.",
      ja: "大規模プロジェクトにはTypeScript、クイックスクリプトにはJavaScript。",
    },
    relatedTool: "json-formatter",
    keywords: ["typescript vs javascript", "javascript vs typescript"],
    searchVolume: 18100,
  },
};

// Helper functions
export function getAllVsSlugs(): VsComparisonSlug[] {
  return Object.keys(vsComparisons) as VsComparisonSlug[];
}

export function getVsBySlug(slug: string): VsComparison | undefined {
  return vsComparisons[slug as VsComparisonSlug];
}
