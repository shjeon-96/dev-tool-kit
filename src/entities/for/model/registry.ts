import type { ForUseCase, ForUseCaseSlug } from "./types";

export const forUseCases: Record<ForUseCaseSlug, ForUseCase> = {
  // ============================================================
  // 개발자 워크플로우 (8)
  // ============================================================

  "json-formatter-for-api": {
    slug: "json-formatter-for-api",
    tool: "JSON Formatter",
    useCase: "API Development",
    category: "developer",
    title: {
      en: "JSON Formatter for API Development",
      ko: "API 개발을 위한 JSON 포맷터",
      ja: "API開発向けJSONフォーマッター",
    },
    description: {
      en: "Format and validate JSON responses for REST API development. Debug API payloads with syntax highlighting.",
      ko: "REST API 개발을 위한 JSON 응답 포맷팅 및 검증. 구문 강조로 API 페이로드를 디버깅하세요.",
      ja: "REST API開発向けJSONレスポンスのフォーマットと検証。構文ハイライトでAPIペイロードをデバッグ。",
    },
    benefits: {
      en: [
        "Instant JSON validation",
        "Syntax error detection",
        "API response beautification",
        "Copy-paste ready output",
      ],
      ko: [
        "즉각적인 JSON 검증",
        "구문 오류 감지",
        "API 응답 정리",
        "복사-붙여넣기 가능한 출력",
      ],
      ja: [
        "即座のJSON検証",
        "構文エラー検出",
        "APIレスポンスの整形",
        "コピペ可能な出力",
      ],
    },
    relatedTool: "json-formatter",
    keywords: ["json formatter for api", "api json formatter", "rest api json"],
    searchVolume: 4400,
  },

  "json-formatter-for-config": {
    slug: "json-formatter-for-config",
    tool: "JSON Formatter",
    useCase: "Config Files",
    category: "developer",
    title: {
      en: "JSON Formatter for Config Files",
      ko: "설정 파일을 위한 JSON 포맷터",
      ja: "設定ファイル向けJSONフォーマッター",
    },
    description: {
      en: "Format package.json, tsconfig.json, and other config files. Ensure proper indentation and syntax.",
      ko: "package.json, tsconfig.json 등 설정 파일 포맷팅. 적절한 들여쓰기와 구문을 보장합니다.",
      ja: "package.json、tsconfig.jsonなどの設定ファイルをフォーマット。適切なインデントと構文を確保。",
    },
    benefits: {
      en: [
        "Consistent indentation",
        "Valid JSON structure",
        "Easy config editing",
        "Error-free commits",
      ],
      ko: [
        "일관된 들여쓰기",
        "유효한 JSON 구조",
        "쉬운 설정 편집",
        "오류 없는 커밋",
      ],
      ja: [
        "一貫したインデント",
        "有効なJSON構造",
        "簡単な設定編集",
        "エラーのないコミット",
      ],
    },
    relatedTool: "json-formatter",
    keywords: ["json formatter for config", "package.json formatter"],
    searchVolume: 2900,
  },

  "base64-encoder-for-images": {
    slug: "base64-encoder-for-images",
    tool: "Base64 Encoder",
    useCase: "Image Embedding",
    category: "developer",
    title: {
      en: "Base64 Encoder for Images",
      ko: "이미지용 Base64 인코더",
      ja: "画像用Base64エンコーダー",
    },
    description: {
      en: "Convert images to Base64 for inline embedding in HTML, CSS, or JSON. Reduce HTTP requests.",
      ko: "HTML, CSS, JSON에 인라인 임베딩을 위해 이미지를 Base64로 변환. HTTP 요청을 줄입니다.",
      ja: "HTML、CSS、JSONへのインライン埋め込み用に画像をBase64に変換。HTTPリクエストを削減。",
    },
    benefits: {
      en: [
        "Inline image embedding",
        "Reduce HTTP requests",
        "Email-safe images",
        "No external dependencies",
      ],
      ko: [
        "인라인 이미지 임베딩",
        "HTTP 요청 감소",
        "이메일 안전 이미지",
        "외부 의존성 없음",
      ],
      ja: [
        "インライン画像埋め込み",
        "HTTPリクエスト削減",
        "メール安全な画像",
        "外部依存なし",
      ],
    },
    relatedTool: "base64-converter",
    keywords: ["base64 encoder for images", "image to base64"],
    searchVolume: 5400,
  },

  "hash-generator-for-passwords": {
    slug: "hash-generator-for-passwords",
    tool: "Hash Generator",
    useCase: "Password Security",
    category: "developer",
    title: {
      en: "Hash Generator for Passwords",
      ko: "비밀번호용 해시 생성기",
      ja: "パスワード用ハッシュジェネレーター",
    },
    description: {
      en: "Generate secure hash values for password storage. Compare different hash algorithms for security.",
      ko: "비밀번호 저장을 위한 안전한 해시 값 생성. 보안을 위해 다양한 해시 알고리즘을 비교합니다.",
      ja: "パスワード保存用の安全なハッシュ値を生成。セキュリティのために様々なハッシュアルゴリズムを比較。",
    },
    benefits: {
      en: [
        "Multiple algorithms",
        "Instant hash generation",
        "Security comparison",
        "No data transmission",
      ],
      ko: [
        "다양한 알고리즘",
        "즉각적인 해시 생성",
        "보안 비교",
        "데이터 전송 없음",
      ],
      ja: [
        "複数アルゴリズム",
        "即座のハッシュ生成",
        "セキュリティ比較",
        "データ送信なし",
      ],
    },
    relatedTool: "hash-generator",
    keywords: ["hash generator for passwords", "password hash generator"],
    searchVolume: 3600,
  },

  "uuid-generator-for-database": {
    slug: "uuid-generator-for-database",
    tool: "UUID Generator",
    useCase: "Database IDs",
    category: "developer",
    title: {
      en: "UUID Generator for Database",
      ko: "데이터베이스용 UUID 생성기",
      ja: "データベース用UUIDジェネレーター",
    },
    description: {
      en: "Generate unique identifiers for database records. Support for UUID v1, v4, and v7 formats.",
      ko: "데이터베이스 레코드를 위한 고유 식별자 생성. UUID v1, v4, v7 형식 지원.",
      ja: "データベースレコード用の一意識別子を生成。UUID v1、v4、v7形式をサポート。",
    },
    benefits: {
      en: [
        "Multiple UUID versions",
        "Bulk generation",
        "Copy to clipboard",
        "No collisions",
      ],
      ko: ["다양한 UUID 버전", "대량 생성", "클립보드에 복사", "충돌 없음"],
      ja: [
        "複数UUIDバージョン",
        "一括生成",
        "クリップボードにコピー",
        "衝突なし",
      ],
    },
    relatedTool: "uuid-generator",
    keywords: ["uuid generator for database", "database uuid generator"],
    searchVolume: 2900,
  },

  "jwt-decoder-for-debugging": {
    slug: "jwt-decoder-for-debugging",
    tool: "JWT Decoder",
    useCase: "Auth Debugging",
    category: "developer",
    title: {
      en: "JWT Decoder for Debugging",
      ko: "디버깅을 위한 JWT 디코더",
      ja: "デバッグ用JWTデコーダー",
    },
    description: {
      en: "Decode and inspect JWT tokens for authentication debugging. View header, payload, and signature.",
      ko: "인증 디버깅을 위한 JWT 토큰 디코딩 및 검사. 헤더, 페이로드, 서명을 확인합니다.",
      ja: "認証デバッグ用のJWTトークンをデコードして検査。ヘッダー、ペイロード、署名を表示。",
    },
    benefits: {
      en: [
        "Instant decoding",
        "Expiry checking",
        "Claim inspection",
        "No server needed",
      ],
      ko: ["즉각적인 디코딩", "만료 확인", "클레임 검사", "서버 불필요"],
      ja: ["即座のデコード", "有効期限確認", "クレーム検査", "サーバー不要"],
    },
    relatedTool: "jwt-decoder",
    keywords: ["jwt decoder for debugging", "debug jwt token"],
    searchVolume: 3600,
  },

  "regex-tester-for-validation": {
    slug: "regex-tester-for-validation",
    tool: "Regex Tester",
    useCase: "Input Validation",
    category: "developer",
    title: {
      en: "Regex Tester for Input Validation",
      ko: "입력 검증을 위한 정규식 테스터",
      ja: "入力検証用正規表現テスター",
    },
    description: {
      en: "Test and debug regex patterns for form validation. Real-time matching with highlighting.",
      ko: "폼 검증을 위한 정규식 패턴 테스트 및 디버깅. 하이라이팅과 함께 실시간 매칭.",
      ja: "フォーム検証用の正規表現パターンをテストしてデバッグ。ハイライト付きリアルタイムマッチング。",
    },
    benefits: {
      en: [
        "Real-time testing",
        "Match highlighting",
        "Common patterns",
        "No coding required",
      ],
      ko: ["실시간 테스팅", "매치 하이라이팅", "일반 패턴", "코딩 불필요"],
      ja: [
        "リアルタイムテスト",
        "マッチハイライト",
        "一般的なパターン",
        "コーディング不要",
      ],
    },
    relatedTool: "regex-tester",
    keywords: ["regex tester for validation", "regex form validation"],
    searchVolume: 4400,
  },

  "sql-formatter-for-queries": {
    slug: "sql-formatter-for-queries",
    tool: "SQL Formatter",
    useCase: "Query Formatting",
    category: "developer",
    title: {
      en: "SQL Formatter for Queries",
      ko: "쿼리용 SQL 포맷터",
      ja: "クエリ用SQLフォーマッター",
    },
    description: {
      en: "Format complex SQL queries for readability. Support for multiple SQL dialects.",
      ko: "복잡한 SQL 쿼리를 가독성 있게 포맷팅. 다양한 SQL 방언 지원.",
      ja: "複雑なSQLクエリを読みやすくフォーマット。複数のSQL方言をサポート。",
    },
    benefits: {
      en: [
        "Multiple dialects",
        "Keyword highlighting",
        "Indent control",
        "Query optimization hints",
      ],
      ko: [
        "다양한 방언",
        "키워드 하이라이팅",
        "들여쓰기 제어",
        "쿼리 최적화 힌트",
      ],
      ja: [
        "複数方言",
        "キーワードハイライト",
        "インデント制御",
        "クエリ最適化ヒント",
      ],
    },
    relatedTool: "sql-formatter",
    keywords: ["sql formatter for queries", "format sql query"],
    searchVolume: 6600,
  },

  // ============================================================
  // 웹 개발 (8)
  // ============================================================

  "image-converter-for-web": {
    slug: "image-converter-for-web",
    tool: "Image Converter",
    useCase: "Web Optimization",
    category: "web",
    title: {
      en: "Image Converter for Web",
      ko: "웹용 이미지 변환기",
      ja: "Web用画像コンバーター",
    },
    description: {
      en: "Convert images to WebP, AVIF for faster web loading. Optimize images for better Core Web Vitals.",
      ko: "더 빠른 웹 로딩을 위해 이미지를 WebP, AVIF로 변환. Core Web Vitals 개선을 위한 이미지 최적화.",
      ja: "高速なWebロード用に画像をWebP、AVIFに変換。Core Web Vitals向上のための画像最適化。",
    },
    benefits: {
      en: [
        "WebP/AVIF output",
        "Smaller file sizes",
        "Better LCP scores",
        "Batch conversion",
      ],
      ko: ["WebP/AVIF 출력", "작은 파일 크기", "더 나은 LCP 점수", "일괄 변환"],
      ja: [
        "WebP/AVIF出力",
        "小さいファイルサイズ",
        "より良いLCPスコア",
        "一括変換",
      ],
    },
    relatedTool: "image-converter",
    keywords: [
      "image converter for web",
      "webp converter",
      "web image optimization",
    ],
    searchVolume: 5400,
  },

  "image-resizer-for-social-media": {
    slug: "image-resizer-for-social-media",
    tool: "Image Resizer",
    useCase: "Social Media",
    category: "web",
    title: {
      en: "Image Resizer for Social Media",
      ko: "소셜 미디어용 이미지 리사이저",
      ja: "ソーシャルメディア用画像リサイザー",
    },
    description: {
      en: "Resize images for Facebook, Instagram, Twitter. Get perfect dimensions for each platform.",
      ko: "Facebook, Instagram, Twitter용 이미지 리사이즈. 각 플랫폼에 맞는 완벽한 크기를 얻으세요.",
      ja: "Facebook、Instagram、Twitter用に画像をリサイズ。各プラットフォームに最適なサイズを取得。",
    },
    benefits: {
      en: [
        "Platform presets",
        "Aspect ratio lock",
        "Batch processing",
        "Quality control",
      ],
      ko: ["플랫폼 프리셋", "종횡비 고정", "일괄 처리", "품질 제어"],
      ja: [
        "プラットフォームプリセット",
        "アスペクト比固定",
        "一括処理",
        "品質制御",
      ],
    },
    relatedTool: "image-resizer",
    keywords: ["image resizer for social media", "social media image size"],
    searchVolume: 6600,
  },

  "qr-generator-for-marketing": {
    slug: "qr-generator-for-marketing",
    tool: "QR Generator",
    useCase: "Marketing",
    category: "web",
    title: {
      en: "QR Generator for Marketing",
      ko: "마케팅용 QR 생성기",
      ja: "マーケティング用QRジェネレーター",
    },
    description: {
      en: "Create QR codes for marketing campaigns. Track scans and customize design.",
      ko: "마케팅 캠페인을 위한 QR 코드 생성. 스캔 추적 및 디자인 커스터마이징.",
      ja: "マーケティングキャンペーン用のQRコードを作成。スキャン追跡とデザインカスタマイズ。",
    },
    benefits: {
      en: [
        "Custom colors",
        "Logo embedding",
        "High resolution",
        "Multiple formats",
      ],
      ko: ["커스텀 색상", "로고 임베딩", "고해상도", "다양한 포맷"],
      ja: ["カスタムカラー", "ロゴ埋め込み", "高解像度", "複数フォーマット"],
    },
    relatedTool: "qr-generator",
    keywords: ["qr generator for marketing", "marketing qr code"],
    searchVolume: 4400,
  },

  "meta-generator-for-seo": {
    slug: "meta-generator-for-seo",
    tool: "Meta Generator",
    useCase: "SEO",
    category: "web",
    title: {
      en: "Meta Generator for SEO",
      ko: "SEO를 위한 메타 생성기",
      ja: "SEO用メタジェネレーター",
    },
    description: {
      en: "Generate meta tags for better search engine rankings. Preview how your page appears in search results.",
      ko: "더 나은 검색 엔진 순위를 위한 메타 태그 생성. 검색 결과에서 페이지가 어떻게 보이는지 미리보기.",
      ja: "検索エンジンランキング向上のためのメタタグを生成。検索結果でのページ表示をプレビュー。",
    },
    benefits: {
      en: [
        "SERP preview",
        "Character limits",
        "OG tags included",
        "Twitter cards",
      ],
      ko: ["SERP 미리보기", "문자 제한", "OG 태그 포함", "트위터 카드"],
      ja: ["SERPプレビュー", "文字制限", "OGタグ含む", "Twitterカード"],
    },
    relatedTool: "meta-generator",
    keywords: ["meta generator for seo", "seo meta tags generator"],
    searchVolume: 3600,
  },

  "schema-generator-for-google": {
    slug: "schema-generator-for-google",
    tool: "Schema Generator",
    useCase: "Rich Results",
    category: "web",
    title: {
      en: "Schema Generator for Google",
      ko: "Google용 스키마 생성기",
      ja: "Google用スキーマジェネレーター",
    },
    description: {
      en: "Create structured data for Google rich results. Support for Article, Product, FAQ schemas.",
      ko: "Google 리치 결과를 위한 구조화된 데이터 생성. Article, Product, FAQ 스키마 지원.",
      ja: "Googleリッチリザルト用の構造化データを作成。Article、Product、FAQスキーマをサポート。",
    },
    benefits: {
      en: [
        "Multiple schema types",
        "JSON-LD output",
        "Validation included",
        "Google compatible",
      ],
      ko: ["다양한 스키마 타입", "JSON-LD 출력", "검증 포함", "Google 호환"],
      ja: ["複数スキーマタイプ", "JSON-LD出力", "検証含む", "Google互換"],
    },
    relatedTool: "schema-generator",
    keywords: [
      "schema generator for google",
      "google structured data generator",
    ],
    searchVolume: 2900,
  },

  "sitemap-generator-for-seo": {
    slug: "sitemap-generator-for-seo",
    tool: "Sitemap Generator",
    useCase: "SEO Indexing",
    category: "web",
    title: {
      en: "Sitemap Generator for SEO",
      ko: "SEO를 위한 사이트맵 생성기",
      ja: "SEO用サイトマップジェネレーター",
    },
    description: {
      en: "Generate XML sitemaps for search engine indexing. Help crawlers discover your pages.",
      ko: "검색 엔진 인덱싱을 위한 XML 사이트맵 생성. 크롤러가 페이지를 발견하도록 도움.",
      ja: "検索エンジンインデックス用のXMLサイトマップを生成。クローラーがページを発見するのを支援。",
    },
    benefits: {
      en: [
        "XML format",
        "Priority settings",
        "Change frequency",
        "Last modified dates",
      ],
      ko: ["XML 형식", "우선순위 설정", "변경 빈도", "최종 수정일"],
      ja: ["XML形式", "優先度設定", "変更頻度", "最終更新日"],
    },
    relatedTool: "sitemap-generator",
    keywords: ["sitemap generator for seo", "xml sitemap generator"],
    searchVolume: 4400,
  },

  "color-picker-for-design": {
    slug: "color-picker-for-design",
    tool: "Color Picker",
    useCase: "Design Work",
    category: "web",
    title: {
      en: "Color Picker for Design",
      ko: "디자인을 위한 색상 선택기",
      ja: "デザイン用カラーピッカー",
    },
    description: {
      en: "Pick and convert colors for web design. Support for HEX, RGB, HSL formats.",
      ko: "웹 디자인을 위한 색상 선택 및 변환. HEX, RGB, HSL 형식 지원.",
      ja: "Webデザイン用の色を選択して変換。HEX、RGB、HSL形式をサポート。",
    },
    benefits: {
      en: [
        "Multiple formats",
        "Color palettes",
        "Contrast checker",
        "CSS output",
      ],
      ko: ["다양한 형식", "색상 팔레트", "대비 체커", "CSS 출력"],
      ja: ["複数形式", "カラーパレット", "コントラストチェッカー", "CSS出力"],
    },
    relatedTool: "color-picker",
    keywords: ["color picker for design", "web color picker"],
    searchVolume: 5400,
  },

  "css-minifier-for-performance": {
    slug: "css-minifier-for-performance",
    tool: "CSS Minifier",
    useCase: "Performance",
    category: "web",
    title: {
      en: "CSS Minifier for Performance",
      ko: "성능을 위한 CSS 압축기",
      ja: "パフォーマンス用CSS圧縮",
    },
    description: {
      en: "Minify CSS for faster page loads. Remove whitespace and optimize selectors.",
      ko: "더 빠른 페이지 로드를 위한 CSS 압축. 공백 제거 및 선택자 최적화.",
      ja: "高速なページロード用にCSSを圧縮。空白を削除してセレクターを最適化。",
    },
    benefits: {
      en: [
        "Size reduction",
        "Faster loading",
        "No dependencies",
        "Instant output",
      ],
      ko: ["크기 감소", "더 빠른 로딩", "의존성 없음", "즉각적인 출력"],
      ja: ["サイズ削減", "高速ロード", "依存なし", "即座の出力"],
    },
    relatedTool: "css-minifier",
    keywords: ["css minifier for performance", "minify css for speed"],
    searchVolume: 3600,
  },

  // ============================================================
  // API & 통합 (6)
  // ============================================================

  "json-formatter-for-postman": {
    slug: "json-formatter-for-postman",
    tool: "JSON Formatter",
    useCase: "API Testing",
    category: "api",
    title: {
      en: "JSON Formatter for Postman",
      ko: "Postman을 위한 JSON 포맷터",
      ja: "Postman用JSONフォーマッター",
    },
    description: {
      en: "Format JSON for Postman requests and responses. Perfect for API testing workflows.",
      ko: "Postman 요청 및 응답을 위한 JSON 포맷팅. API 테스팅 워크플로우에 완벽합니다.",
      ja: "Postmanリクエストとレスポンス用のJSONをフォーマット。APIテストワークフローに最適。",
    },
    benefits: {
      en: [
        "Copy-paste ready",
        "Syntax validation",
        "Quick formatting",
        "Error detection",
      ],
      ko: ["복사-붙여넣기 가능", "구문 검증", "빠른 포맷팅", "오류 감지"],
      ja: ["コピペ対応", "構文検証", "高速フォーマット", "エラー検出"],
    },
    relatedTool: "json-formatter",
    keywords: ["json formatter for postman", "postman json format"],
    searchVolume: 2900,
  },

  "url-encoder-for-api": {
    slug: "url-encoder-for-api",
    tool: "URL Encoder",
    useCase: "API Parameters",
    category: "api",
    title: {
      en: "URL Encoder for API",
      ko: "API를 위한 URL 인코더",
      ja: "API用URLエンコーダー",
    },
    description: {
      en: "Encode URL parameters for API calls. Handle special characters safely.",
      ko: "API 호출을 위한 URL 파라미터 인코딩. 특수 문자를 안전하게 처리.",
      ja: "API呼び出し用のURLパラメータをエンコード。特殊文字を安全に処理。",
    },
    benefits: {
      en: [
        "Safe encoding",
        "Special char handling",
        "Instant conversion",
        "Decode support",
      ],
      ko: ["안전한 인코딩", "특수 문자 처리", "즉각적인 변환", "디코딩 지원"],
      ja: [
        "安全なエンコード",
        "特殊文字処理",
        "即座の変換",
        "デコードサポート",
      ],
    },
    relatedTool: "url-encoder",
    keywords: ["url encoder for api", "api url encoding"],
    searchVolume: 2400,
  },

  "timestamp-converter-for-logs": {
    slug: "timestamp-converter-for-logs",
    tool: "Timestamp Converter",
    useCase: "Log Analysis",
    category: "api",
    title: {
      en: "Timestamp Converter for Logs",
      ko: "로그용 타임스탬프 변환기",
      ja: "ログ用タイムスタンプコンバーター",
    },
    description: {
      en: "Convert Unix timestamps from logs to readable dates. Debug timing issues easily.",
      ko: "로그의 Unix 타임스탬프를 읽기 쉬운 날짜로 변환. 타이밍 문제를 쉽게 디버깅.",
      ja: "ログのUnixタイムスタンプを読みやすい日付に変換。タイミング問題を簡単にデバッグ。",
    },
    benefits: {
      en: [
        "Multiple formats",
        "Timezone support",
        "Millisecond precision",
        "Quick conversion",
      ],
      ko: ["다양한 형식", "타임존 지원", "밀리초 정밀도", "빠른 변환"],
      ja: ["複数形式", "タイムゾーンサポート", "ミリ秒精度", "高速変換"],
    },
    relatedTool: "unix-timestamp",
    keywords: ["timestamp converter for logs", "unix timestamp to date"],
    searchVolume: 3600,
  },

  "diff-tool-for-code-review": {
    slug: "diff-tool-for-code-review",
    tool: "Diff Tool",
    useCase: "Code Review",
    category: "api",
    title: {
      en: "Diff Tool for Code Review",
      ko: "코드 리뷰를 위한 비교 도구",
      ja: "コードレビュー用Diffツール",
    },
    description: {
      en: "Compare code versions for code review. Side-by-side diff with syntax highlighting.",
      ko: "코드 리뷰를 위한 코드 버전 비교. 구문 강조와 함께 나란히 비교.",
      ja: "コードレビュー用のコードバージョンを比較。構文ハイライト付きサイドバイサイドdiff。",
    },
    benefits: {
      en: [
        "Side-by-side view",
        "Syntax highlighting",
        "Line numbers",
        "Change detection",
      ],
      ko: ["나란히 보기", "구문 강조", "줄 번호", "변경 감지"],
      ja: ["サイドバイサイド表示", "構文ハイライト", "行番号", "変更検出"],
    },
    relatedTool: "diff-checker",
    keywords: ["diff tool for code review", "code comparison tool"],
    searchVolume: 2900,
  },

  "lorem-generator-for-mockups": {
    slug: "lorem-generator-for-mockups",
    tool: "Lorem Generator",
    useCase: "Design Mockups",
    category: "api",
    title: {
      en: "Lorem Generator for Mockups",
      ko: "목업용 Lorem 생성기",
      ja: "モックアップ用Loremジェネレーター",
    },
    description: {
      en: "Generate placeholder text for design mockups. Control length and format.",
      ko: "디자인 목업을 위한 플레이스홀더 텍스트 생성. 길이와 형식을 제어합니다.",
      ja: "デザインモックアップ用のプレースホルダーテキストを生成。長さと形式を制御。",
    },
    benefits: {
      en: [
        "Custom length",
        "Paragraph/word options",
        "Quick copy",
        "Multiple formats",
      ],
      ko: ["커스텀 길이", "단락/단어 옵션", "빠른 복사", "다양한 형식"],
      ja: ["カスタム長さ", "段落/単語オプション", "高速コピー", "複数形式"],
    },
    relatedTool: "lorem-generator",
    keywords: ["lorem generator for mockups", "placeholder text generator"],
    searchVolume: 2400,
  },

  "cron-parser-for-scheduling": {
    slug: "cron-parser-for-scheduling",
    tool: "Cron Parser",
    useCase: "Job Scheduling",
    category: "api",
    title: {
      en: "Cron Parser for Scheduling",
      ko: "스케줄링을 위한 Cron 파서",
      ja: "スケジューリング用Cronパーサー",
    },
    description: {
      en: "Parse and generate cron expressions for job scheduling. Preview next execution times.",
      ko: "작업 스케줄링을 위한 cron 표현식 파싱 및 생성. 다음 실행 시간을 미리보기.",
      ja: "ジョブスケジューリング用のcron式を解析して生成。次の実行時間をプレビュー。",
    },
    benefits: {
      en: [
        "Expression builder",
        "Next run preview",
        "Common presets",
        "Validation",
      ],
      ko: ["표현식 빌더", "다음 실행 미리보기", "일반 프리셋", "검증"],
      ja: ["式ビルダー", "次回実行プレビュー", "一般的なプリセット", "検証"],
    },
    relatedTool: "cron-parser",
    keywords: ["cron parser for scheduling", "cron expression generator"],
    searchVolume: 3600,
  },

  // ============================================================
  // 데이터 처리 (6)
  // ============================================================

  "csv-converter-for-excel": {
    slug: "csv-converter-for-excel",
    tool: "CSV Converter",
    useCase: "Excel Import",
    category: "data",
    title: {
      en: "CSV Converter for Excel",
      ko: "Excel용 CSV 변환기",
      ja: "Excel用CSVコンバーター",
    },
    description: {
      en: "Convert JSON to CSV for Excel import. Handle nested data structures.",
      ko: "Excel 가져오기를 위해 JSON을 CSV로 변환. 중첩된 데이터 구조를 처리합니다.",
      ja: "Excelインポート用にJSONをCSVに変換。ネストされたデータ構造を処理。",
    },
    benefits: {
      en: [
        "Excel compatible",
        "Nested data handling",
        "Custom delimiters",
        "Header options",
      ],
      ko: ["Excel 호환", "중첩 데이터 처리", "커스텀 구분자", "헤더 옵션"],
      ja: [
        "Excel互換",
        "ネストデータ処理",
        "カスタム区切り文字",
        "ヘッダーオプション",
      ],
    },
    relatedTool: "json-formatter",
    keywords: ["csv converter for excel", "json to csv for excel"],
    searchVolume: 4400,
  },

  "yaml-converter-for-kubernetes": {
    slug: "yaml-converter-for-kubernetes",
    tool: "YAML Converter",
    useCase: "Kubernetes",
    category: "data",
    title: {
      en: "YAML Converter for Kubernetes",
      ko: "Kubernetes용 YAML 변환기",
      ja: "Kubernetes用YAMLコンバーター",
    },
    description: {
      en: "Convert JSON to YAML for Kubernetes configs. Validate YAML syntax instantly.",
      ko: "Kubernetes 설정을 위해 JSON을 YAML로 변환. YAML 구문을 즉시 검증합니다.",
      ja: "Kubernetes設定用にJSONをYAMLに変換。YAML構文を即座に検証。",
    },
    benefits: {
      en: [
        "K8s compatible",
        "Syntax validation",
        "Indent control",
        "Quick conversion",
      ],
      ko: ["K8s 호환", "구문 검증", "들여쓰기 제어", "빠른 변환"],
      ja: ["K8s互換", "構文検証", "インデント制御", "高速変換"],
    },
    relatedTool: "json-formatter",
    keywords: ["yaml converter for kubernetes", "json to yaml k8s"],
    searchVolume: 2900,
  },

  "xml-converter-for-legacy": {
    slug: "xml-converter-for-legacy",
    tool: "XML Converter",
    useCase: "Legacy Systems",
    category: "data",
    title: {
      en: "XML Converter for Legacy Systems",
      ko: "레거시 시스템용 XML 변환기",
      ja: "レガシーシステム用XMLコンバーター",
    },
    description: {
      en: "Convert JSON to XML for legacy system integration. Handle complex data structures.",
      ko: "레거시 시스템 통합을 위해 JSON을 XML로 변환. 복잡한 데이터 구조를 처리합니다.",
      ja: "レガシーシステム統合用にJSONをXMLに変換。複雑なデータ構造を処理。",
    },
    benefits: {
      en: [
        "Legacy compatible",
        "Attribute support",
        "Namespace handling",
        "Pretty print",
      ],
      ko: ["레거시 호환", "속성 지원", "네임스페이스 처리", "보기 좋은 출력"],
      ja: ["レガシー互換", "属性サポート", "名前空間処理", "整形出力"],
    },
    relatedTool: "json-formatter",
    keywords: ["xml converter for legacy", "json to xml converter"],
    searchVolume: 2400,
  },

  "markdown-preview-for-github": {
    slug: "markdown-preview-for-github",
    tool: "Markdown Preview",
    useCase: "GitHub READMEs",
    category: "data",
    title: {
      en: "Markdown Preview for GitHub",
      ko: "GitHub용 마크다운 미리보기",
      ja: "GitHub用Markdownプレビュー",
    },
    description: {
      en: "Preview Markdown files before pushing to GitHub. Support for GFM syntax.",
      ko: "GitHub에 푸시하기 전에 마크다운 파일 미리보기. GFM 구문 지원.",
      ja: "GitHubにプッシュする前にMarkdownファイルをプレビュー。GFM構文をサポート。",
    },
    benefits: {
      en: [
        "GFM support",
        "Real-time preview",
        "Table rendering",
        "Code highlighting",
      ],
      ko: ["GFM 지원", "실시간 미리보기", "테이블 렌더링", "코드 하이라이팅"],
      ja: [
        "GFMサポート",
        "リアルタイムプレビュー",
        "テーブルレンダリング",
        "コードハイライト",
      ],
    },
    relatedTool: "markdown-preview",
    keywords: ["markdown preview for github", "github readme preview"],
    searchVolume: 3600,
  },

  "json-validator-for-schema": {
    slug: "json-validator-for-schema",
    tool: "JSON Validator",
    useCase: "Schema Validation",
    category: "data",
    title: {
      en: "JSON Validator for Schema",
      ko: "스키마용 JSON 검증기",
      ja: "スキーマ用JSONバリデーター",
    },
    description: {
      en: "Validate JSON against JSON Schema. Ensure data conforms to expected structure.",
      ko: "JSON 스키마에 대해 JSON을 검증합니다. 데이터가 예상된 구조를 따르는지 확인합니다.",
      ja: "JSON SchemaでJSONを検証。データが期待される構造に準拠しているか確認。",
    },
    benefits: {
      en: [
        "Schema validation",
        "Error messages",
        "Draft support",
        "Quick feedback",
      ],
      ko: ["스키마 검증", "오류 메시지", "드래프트 지원", "빠른 피드백"],
      ja: [
        "スキーマ検証",
        "エラーメッセージ",
        "ドラフトサポート",
        "高速フィードバック",
      ],
    },
    relatedTool: "json-formatter",
    keywords: ["json validator for schema", "json schema validator"],
    searchVolume: 2900,
  },

  "text-diff-for-documents": {
    slug: "text-diff-for-documents",
    tool: "Text Diff",
    useCase: "Document Comparison",
    category: "data",
    title: {
      en: "Text Diff for Documents",
      ko: "문서용 텍스트 비교",
      ja: "ドキュメント用テキストDiff",
    },
    description: {
      en: "Compare text documents to find differences. Perfect for contract and document review.",
      ko: "텍스트 문서를 비교하여 차이점을 찾습니다. 계약서 및 문서 검토에 완벽합니다.",
      ja: "テキストドキュメントを比較して違いを見つける。契約書やドキュメントレビューに最適。",
    },
    benefits: {
      en: [
        "Word-level diff",
        "Line-level diff",
        "Character highlight",
        "Export options",
      ],
      ko: [
        "단어 수준 비교",
        "줄 수준 비교",
        "문자 하이라이트",
        "내보내기 옵션",
      ],
      ja: [
        "単語レベルdiff",
        "行レベルdiff",
        "文字ハイライト",
        "エクスポートオプション",
      ],
    },
    relatedTool: "diff-checker",
    keywords: ["text diff for documents", "document comparison tool"],
    searchVolume: 2400,
  },

  // ============================================================
  // 보안 & 인증 (4)
  // ============================================================

  "hash-generator-for-verification": {
    slug: "hash-generator-for-verification",
    tool: "Hash Generator",
    useCase: "File Verification",
    category: "security",
    title: {
      en: "Hash Generator for Verification",
      ko: "검증을 위한 해시 생성기",
      ja: "検証用ハッシュジェネレーター",
    },
    description: {
      en: "Generate file hashes for integrity verification. Compare checksums to detect tampering.",
      ko: "무결성 검증을 위한 파일 해시 생성. 체크섬을 비교하여 변조를 감지합니다.",
      ja: "整合性検証用のファイルハッシュを生成。チェックサムを比較して改ざんを検出。",
    },
    benefits: {
      en: [
        "Multiple algorithms",
        "File support",
        "Checksum comparison",
        "No upload needed",
      ],
      ko: ["다양한 알고리즘", "파일 지원", "체크섬 비교", "업로드 불필요"],
      ja: [
        "複数アルゴリズム",
        "ファイルサポート",
        "チェックサム比較",
        "アップロード不要",
      ],
    },
    relatedTool: "hash-generator",
    keywords: ["hash generator for verification", "file checksum generator"],
    searchVolume: 2900,
  },

  "base64-decoder-for-tokens": {
    slug: "base64-decoder-for-tokens",
    tool: "Base64 Decoder",
    useCase: "Token Inspection",
    category: "security",
    title: {
      en: "Base64 Decoder for Tokens",
      ko: "토큰용 Base64 디코더",
      ja: "トークン用Base64デコーダー",
    },
    description: {
      en: "Decode Base64 tokens for inspection. Debug authentication and API tokens safely.",
      ko: "검사를 위한 Base64 토큰 디코딩. 인증 및 API 토큰을 안전하게 디버깅합니다.",
      ja: "検査用にBase64トークンをデコード。認証とAPIトークンを安全にデバッグ。",
    },
    benefits: {
      en: [
        "Instant decoding",
        "Safe inspection",
        "No data sent",
        "Copy support",
      ],
      ko: ["즉각적인 디코딩", "안전한 검사", "데이터 전송 없음", "복사 지원"],
      ja: ["即座のデコード", "安全な検査", "データ送信なし", "コピーサポート"],
    },
    relatedTool: "base64-converter",
    keywords: ["base64 decoder for tokens", "decode api token"],
    searchVolume: 2400,
  },

  "password-generator-for-security": {
    slug: "password-generator-for-security",
    tool: "Password Generator",
    useCase: "Security",
    category: "security",
    title: {
      en: "Password Generator for Security",
      ko: "보안을 위한 비밀번호 생성기",
      ja: "セキュリティ用パスワードジェネレーター",
    },
    description: {
      en: "Generate strong passwords for better security. Customize length and complexity.",
      ko: "더 나은 보안을 위한 강력한 비밀번호 생성. 길이와 복잡성을 커스터마이징합니다.",
      ja: "セキュリティ向上のための強力なパスワードを生成。長さと複雑さをカスタマイズ。",
    },
    benefits: {
      en: [
        "Customizable length",
        "Symbol options",
        "No storage",
        "Entropy display",
      ],
      ko: ["커스텀 길이", "기호 옵션", "저장 없음", "엔트로피 표시"],
      ja: ["カスタム長さ", "記号オプション", "保存なし", "エントロピー表示"],
    },
    relatedTool: "hash-generator",
    keywords: ["password generator for security", "secure password generator"],
    searchVolume: 8100,
  },

  "jwt-decoder-for-auth": {
    slug: "jwt-decoder-for-auth",
    tool: "JWT Decoder",
    useCase: "Authentication",
    category: "security",
    title: {
      en: "JWT Decoder for Authentication",
      ko: "인증을 위한 JWT 디코더",
      ja: "認証用JWTデコーダー",
    },
    description: {
      en: "Decode JWT tokens for authentication systems. Inspect claims and expiration times.",
      ko: "인증 시스템을 위한 JWT 토큰 디코딩. 클레임과 만료 시간을 검사합니다.",
      ja: "認証システム用のJWTトークンをデコード。クレームと有効期限を検査。",
    },
    benefits: {
      en: [
        "Full token decode",
        "Expiry checking",
        "Claim validation",
        "Signature info",
      ],
      ko: ["전체 토큰 디코딩", "만료 확인", "클레임 검증", "서명 정보"],
      ja: [
        "完全なトークンデコード",
        "有効期限確認",
        "クレーム検証",
        "署名情報",
      ],
    },
    relatedTool: "jwt-decoder",
    keywords: ["jwt decoder for auth", "jwt authentication decoder"],
    searchVolume: 4400,
  },
};

// Helper functions
export function getAllForSlugs(): ForUseCaseSlug[] {
  return Object.keys(forUseCases) as ForUseCaseSlug[];
}

export function getForBySlug(slug: string): ForUseCase | undefined {
  return forUseCases[slug as ForUseCaseSlug];
}
