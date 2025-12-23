import type { GenerateType } from "./types";

export const GENERATE_TYPE_REGISTRY: Record<string, GenerateType> = {
  uuid: {
    slug: "uuid",
    name: "UUID",
    title: {
      en: "UUID Generator - Generate Random UUIDs",
      ko: "UUID 생성기 - 랜덤 UUID 생성",
      ja: "UUIDジェネレーター - ランダムUUID生成",
    },
    description: {
      en: "Generate random UUIDs (v4) and other versions. Create unique identifiers for your applications.",
      ko: "랜덤 UUID(v4) 및 기타 버전을 생성합니다. 애플리케이션용 고유 식별자를 만드세요.",
      ja: "ランダムなUUID(v4)やその他のバージョンを生成します。アプリケーション用のユニーク識別子を作成します。",
    },
    keywords: {
      en: [
        "uuid generator",
        "random uuid",
        "uuid v4",
        "guid generator",
        "unique identifier",
      ],
      ko: ["uuid 생성기", "랜덤 uuid", "uuid v4", "guid 생성", "고유 식별자"],
      ja: [
        "uuidジェネレーター",
        "ランダムuuid",
        "uuid v4",
        "guidジェネレーター",
        "ユニーク識別子",
      ],
    },
    useCases: {
      en: [
        "Database primary keys",
        "Session IDs",
        "Transaction IDs",
        "API keys",
      ],
      ko: ["데이터베이스 기본키", "세션 ID", "트랜잭션 ID", "API 키"],
      ja: [
        "データベース主キー",
        "セッションID",
        "トランザクションID",
        "APIキー",
      ],
    },
    category: "identifier",
    outputExample: "550e8400-e29b-41d4-a716-446655440000",
  },

  password: {
    slug: "password",
    name: "Password",
    title: {
      en: "Password Generator - Create Strong Passwords",
      ko: "비밀번호 생성기 - 강력한 비밀번호 생성",
      ja: "パスワードジェネレーター - 強力なパスワード生成",
    },
    description: {
      en: "Generate secure random passwords with custom length and character options.",
      ko: "사용자 지정 길이와 문자 옵션으로 안전한 랜덤 비밀번호를 생성합니다.",
      ja: "カスタム長さと文字オプションで安全なランダムパスワードを生成します。",
    },
    keywords: {
      en: [
        "password generator",
        "random password",
        "secure password",
        "strong password",
        "password creator",
      ],
      ko: [
        "비밀번호 생성기",
        "랜덤 비밀번호",
        "안전한 비밀번호",
        "강력한 비밀번호",
        "비밀번호 만들기",
      ],
      ja: [
        "パスワードジェネレーター",
        "ランダムパスワード",
        "安全なパスワード",
        "強力なパスワード",
        "パスワード作成",
      ],
    },
    useCases: {
      en: [
        "Account security",
        "API key generation",
        "Encryption keys",
        "Temporary access codes",
      ],
      ko: ["계정 보안", "API 키 생성", "암호화 키", "임시 접근 코드"],
      ja: [
        "アカウントセキュリティ",
        "APIキー生成",
        "暗号化キー",
        "一時アクセスコード",
      ],
    },
    category: "security",
    outputExample: "X9#mK2$pL5@nQ8&w",
  },

  lorem: {
    slug: "lorem",
    name: "Lorem Ipsum",
    title: {
      en: "Lorem Ipsum Generator - Placeholder Text",
      ko: "Lorem Ipsum 생성기 - 플레이스홀더 텍스트",
      ja: "Lorem Ipsumジェネレーター - プレースホルダーテキスト",
    },
    description: {
      en: "Generate Lorem Ipsum placeholder text for design mockups and prototypes.",
      ko: "디자인 모형과 프로토타입을 위한 Lorem Ipsum 플레이스홀더 텍스트를 생성합니다.",
      ja: "デザインモックアップとプロトタイプ用のLorem Ipsumプレースホルダーテキストを生成します。",
    },
    keywords: {
      en: [
        "lorem ipsum",
        "placeholder text",
        "dummy text",
        "filler text",
        "sample text",
      ],
      ko: [
        "lorem ipsum",
        "플레이스홀더 텍스트",
        "더미 텍스트",
        "채움 텍스트",
        "샘플 텍스트",
      ],
      ja: [
        "lorem ipsum",
        "プレースホルダーテキスト",
        "ダミーテキスト",
        "フィラーテキスト",
        "サンプルテキスト",
      ],
    },
    useCases: {
      en: [
        "Web design mockups",
        "UI prototypes",
        "Print layouts",
        "Content placeholders",
      ],
      ko: [
        "웹 디자인 모형",
        "UI 프로토타입",
        "인쇄 레이아웃",
        "콘텐츠 플레이스홀더",
      ],
      ja: [
        "Webデザインモックアップ",
        "UIプロトタイプ",
        "印刷レイアウト",
        "コンテンツプレースホルダー",
      ],
    },
    category: "text",
    outputExample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },

  color: {
    slug: "color",
    name: "Color",
    title: {
      en: "Color Generator - Random Color Palette",
      ko: "색상 생성기 - 랜덤 색상 팔레트",
      ja: "カラージェネレーター - ランダムカラーパレット",
    },
    description: {
      en: "Generate random colors and color palettes. Get HEX, RGB, and HSL values.",
      ko: "랜덤 색상과 색상 팔레트를 생성합니다. HEX, RGB, HSL 값을 얻으세요.",
      ja: "ランダムなカラーとカラーパレットを生成します。HEX、RGB、HSL値を取得します。",
    },
    keywords: {
      en: [
        "color generator",
        "random color",
        "color palette",
        "hex color",
        "rgb color",
      ],
      ko: ["색상 생성기", "랜덤 색상", "색상 팔레트", "hex 색상", "rgb 색상"],
      ja: [
        "カラージェネレーター",
        "ランダムカラー",
        "カラーパレット",
        "hexカラー",
        "rgbカラー",
      ],
    },
    useCases: {
      en: [
        "Design inspiration",
        "UI color schemes",
        "Brand colors",
        "Art projects",
      ],
      ko: ["디자인 영감", "UI 색상 구성", "브랜드 색상", "아트 프로젝트"],
      ja: [
        "デザインインスピレーション",
        "UIカラースキーム",
        "ブランドカラー",
        "アートプロジェクト",
      ],
    },
    category: "design",
    outputExample: "#3B82F6",
  },

  name: {
    slug: "name",
    name: "Name",
    title: {
      en: "Random Name Generator - Generate Fake Names",
      ko: "랜덤 이름 생성기 - 가짜 이름 생성",
      ja: "ランダム名前ジェネレーター - 偽名生成",
    },
    description: {
      en: "Generate random names for testing, prototyping, and sample data creation.",
      ko: "테스트, 프로토타이핑, 샘플 데이터 생성을 위한 랜덤 이름을 생성합니다.",
      ja: "テスト、プロトタイピング、サンプルデータ作成のためのランダムな名前を生成します。",
    },
    keywords: {
      en: [
        "name generator",
        "random name",
        "fake name",
        "sample name",
        "test data",
      ],
      ko: [
        "이름 생성기",
        "랜덤 이름",
        "가짜 이름",
        "샘플 이름",
        "테스트 데이터",
      ],
      ja: [
        "名前ジェネレーター",
        "ランダム名前",
        "偽名",
        "サンプル名",
        "テストデータ",
      ],
    },
    useCases: {
      en: [
        "Test data generation",
        "User research",
        "Database seeding",
        "Privacy protection",
      ],
      ko: [
        "테스트 데이터 생성",
        "사용자 연구",
        "데이터베이스 시딩",
        "개인정보 보호",
      ],
      ja: [
        "テストデータ生成",
        "ユーザーリサーチ",
        "データベースシーディング",
        "プライバシー保護",
      ],
    },
    category: "data",
    outputExample: "John Smith",
  },

  email: {
    slug: "email",
    name: "Email",
    title: {
      en: "Random Email Generator - Generate Fake Emails",
      ko: "랜덤 이메일 생성기 - 가짜 이메일 생성",
      ja: "ランダムメールジェネレーター - 偽メール生成",
    },
    description: {
      en: "Generate random email addresses for testing and sample data.",
      ko: "테스트와 샘플 데이터를 위한 랜덤 이메일 주소를 생성합니다.",
      ja: "テストとサンプルデータのためのランダムなメールアドレスを生成します。",
    },
    keywords: {
      en: [
        "email generator",
        "random email",
        "fake email",
        "test email",
        "sample email",
      ],
      ko: [
        "이메일 생성기",
        "랜덤 이메일",
        "가짜 이메일",
        "테스트 이메일",
        "샘플 이메일",
      ],
      ja: [
        "メールジェネレーター",
        "ランダムメール",
        "偽メール",
        "テストメール",
        "サンプルメール",
      ],
    },
    useCases: {
      en: [
        "Form testing",
        "User registration tests",
        "Database seeding",
        "API testing",
      ],
      ko: [
        "폼 테스트",
        "사용자 등록 테스트",
        "데이터베이스 시딩",
        "API 테스트",
      ],
      ja: [
        "フォームテスト",
        "ユーザー登録テスト",
        "データベースシーディング",
        "APIテスト",
      ],
    },
    category: "data",
    outputExample: "john.doe@example.com",
  },

  phone: {
    slug: "phone",
    name: "Phone",
    title: {
      en: "Random Phone Generator - Generate Fake Phone Numbers",
      ko: "랜덤 전화번호 생성기 - 가짜 전화번호 생성",
      ja: "ランダム電話番号ジェネレーター - 偽電話番号生成",
    },
    description: {
      en: "Generate random phone numbers for testing and sample data creation.",
      ko: "테스트와 샘플 데이터 생성을 위한 랜덤 전화번호를 생성합니다.",
      ja: "テストとサンプルデータ作成のためのランダムな電話番号を生成します。",
    },
    keywords: {
      en: [
        "phone generator",
        "random phone",
        "fake phone",
        "test phone",
        "sample phone",
      ],
      ko: [
        "전화번호 생성기",
        "랜덤 전화번호",
        "가짜 전화번호",
        "테스트 전화번호",
        "샘플 전화번호",
      ],
      ja: [
        "電話番号ジェネレーター",
        "ランダム電話番号",
        "偽電話番号",
        "テスト電話番号",
        "サンプル電話番号",
      ],
    },
    useCases: {
      en: [
        "Contact form testing",
        "CRM data seeding",
        "User registration",
        "API testing",
      ],
      ko: ["연락처 폼 테스트", "CRM 데이터 시딩", "사용자 등록", "API 테스트"],
      ja: [
        "連絡先フォームテスト",
        "CRMデータシーディング",
        "ユーザー登録",
        "APIテスト",
      ],
    },
    category: "data",
    outputExample: "+1 (555) 123-4567",
  },

  address: {
    slug: "address",
    name: "Address",
    title: {
      en: "Random Address Generator - Generate Fake Addresses",
      ko: "랜덤 주소 생성기 - 가짜 주소 생성",
      ja: "ランダム住所ジェネレーター - 偽住所生成",
    },
    description: {
      en: "Generate random addresses for testing and sample data creation.",
      ko: "테스트와 샘플 데이터 생성을 위한 랜덤 주소를 생성합니다.",
      ja: "テストとサンプルデータ作成のためのランダムな住所を生成します。",
    },
    keywords: {
      en: [
        "address generator",
        "random address",
        "fake address",
        "test address",
        "sample address",
      ],
      ko: ["주소 생성기", "랜덤 주소", "가짜 주소", "테스트 주소", "샘플 주소"],
      ja: [
        "住所ジェネレーター",
        "ランダム住所",
        "偽住所",
        "テスト住所",
        "サンプル住所",
      ],
    },
    useCases: {
      en: [
        "Shipping form tests",
        "E-commerce testing",
        "Database seeding",
        "Location services",
      ],
      ko: [
        "배송 폼 테스트",
        "전자상거래 테스트",
        "데이터베이스 시딩",
        "위치 서비스",
      ],
      ja: [
        "配送フォームテスト",
        "Eコマーステスト",
        "データベースシーディング",
        "位置情報サービス",
      ],
    },
    category: "data",
    outputExample: "123 Main St, New York, NY 10001",
  },

  credit_card: {
    slug: "credit-card",
    name: "Credit Card",
    title: {
      en: "Test Credit Card Generator - Generate Test Card Numbers",
      ko: "테스트 신용카드 생성기 - 테스트 카드 번호 생성",
      ja: "テストクレジットカードジェネレーター - テストカード番号生成",
    },
    description: {
      en: "Generate valid test credit card numbers for payment testing (not real cards).",
      ko: "결제 테스트용 유효한 테스트 신용카드 번호를 생성합니다 (실제 카드 아님).",
      ja: "決済テスト用の有効なテストクレジットカード番号を生成します（実際のカードではありません）。",
    },
    keywords: {
      en: [
        "test credit card",
        "card number generator",
        "payment testing",
        "stripe test card",
        "sandbox card",
      ],
      ko: [
        "테스트 신용카드",
        "카드 번호 생성기",
        "결제 테스트",
        "스트라이프 테스트 카드",
        "샌드박스 카드",
      ],
      ja: [
        "テストクレジットカード",
        "カード番号ジェネレーター",
        "決済テスト",
        "Stripeテストカード",
        "サンドボックスカード",
      ],
    },
    useCases: {
      en: [
        "Payment integration testing",
        "Stripe sandbox",
        "E-commerce development",
        "QA testing",
      ],
      ko: [
        "결제 통합 테스트",
        "스트라이프 샌드박스",
        "전자상거래 개발",
        "QA 테스트",
      ],
      ja: [
        "決済統合テスト",
        "Stripeサンドボックス",
        "Eコマース開発",
        "QAテスト",
      ],
    },
    category: "data",
    outputExample: "4242 4242 4242 4242",
  },

  timestamp: {
    slug: "timestamp",
    name: "Timestamp",
    title: {
      en: "Timestamp Generator - Unix Timestamp & Date",
      ko: "타임스탬프 생성기 - Unix 타임스탬프 및 날짜",
      ja: "タイムスタンプジェネレーター - Unixタイムスタンプ＆日付",
    },
    description: {
      en: "Generate Unix timestamps, ISO dates, and various date formats.",
      ko: "Unix 타임스탬프, ISO 날짜 및 다양한 날짜 형식을 생성합니다.",
      ja: "Unixタイムスタンプ、ISO日付、様々な日付形式を生成します。",
    },
    keywords: {
      en: [
        "timestamp generator",
        "unix timestamp",
        "epoch time",
        "date generator",
        "iso date",
      ],
      ko: [
        "타임스탬프 생성기",
        "unix 타임스탬프",
        "epoch 시간",
        "날짜 생성기",
        "iso 날짜",
      ],
      ja: [
        "タイムスタンプジェネレーター",
        "unixタイムスタンプ",
        "エポック時間",
        "日付ジェネレーター",
        "iso日付",
      ],
    },
    useCases: {
      en: [
        "API development",
        "Database timestamps",
        "Log analysis",
        "Time calculations",
      ],
      ko: ["API 개발", "데이터베이스 타임스탬프", "로그 분석", "시간 계산"],
      ja: ["API開発", "データベースタイムスタンプ", "ログ分析", "時間計算"],
    },
    category: "identifier",
    outputExample: "1703318400",
  },

  hash: {
    slug: "hash",
    name: "Hash",
    title: {
      en: "Random Hash Generator - SHA256, MD5, and More",
      ko: "랜덤 해시 생성기 - SHA256, MD5 등",
      ja: "ランダムハッシュジェネレーター - SHA256、MD5等",
    },
    description: {
      en: "Generate random hashes in various algorithms including SHA256, MD5, and SHA512.",
      ko: "SHA256, MD5, SHA512 등 다양한 알고리즘으로 랜덤 해시를 생성합니다.",
      ja: "SHA256、MD5、SHA512など様々なアルゴリズムでランダムなハッシュを生成します。",
    },
    keywords: {
      en: ["hash generator", "random hash", "sha256", "md5", "hash string"],
      ko: ["해시 생성기", "랜덤 해시", "sha256", "md5", "해시 문자열"],
      ja: [
        "ハッシュジェネレーター",
        "ランダムハッシュ",
        "sha256",
        "md5",
        "ハッシュ文字列",
      ],
    },
    useCases: {
      en: ["Token generation", "Unique identifiers", "Cache keys", "Test data"],
      ko: ["토큰 생성", "고유 식별자", "캐시 키", "테스트 데이터"],
      ja: ["トークン生成", "ユニーク識別子", "キャッシュキー", "テストデータ"],
    },
    category: "security",
    outputExample: "a3f5b2c8d1e4f6g7h8i9j0k1l2m3n4o5",
  },

  slug: {
    slug: "slug",
    name: "Slug",
    title: {
      en: "Slug Generator - URL-Friendly Slugs",
      ko: "슬러그 생성기 - URL 친화적 슬러그",
      ja: "スラグジェネレーター - URLフレンドリースラグ",
    },
    description: {
      en: "Generate URL-friendly slugs from text. Convert titles to SEO-friendly URLs.",
      ko: "텍스트에서 URL 친화적인 슬러그를 생성합니다. 제목을 SEO 친화적 URL로 변환합니다.",
      ja: "テキストからURLフレンドリーなスラグを生成します。タイトルをSEOフレンドリーなURLに変換します。",
    },
    keywords: {
      en: [
        "slug generator",
        "url slug",
        "seo url",
        "permalink",
        "url friendly",
      ],
      ko: ["슬러그 생성기", "url 슬러그", "seo url", "퍼머링크", "url 친화적"],
      ja: [
        "スラグジェネレーター",
        "urlスラグ",
        "seo url",
        "パーマリンク",
        "urlフレンドリー",
      ],
    },
    useCases: {
      en: [
        "Blog post URLs",
        "Product URLs",
        "Category slugs",
        "SEO optimization",
      ],
      ko: ["블로그 포스트 URL", "제품 URL", "카테고리 슬러그", "SEO 최적화"],
      ja: ["ブログ記事URL", "商品URL", "カテゴリスラグ", "SEO最適化"],
    },
    category: "text",
    outputExample: "how-to-generate-url-slugs",
  },

  api_key: {
    slug: "api-key",
    name: "API Key",
    title: {
      en: "API Key Generator - Generate Secure API Keys",
      ko: "API 키 생성기 - 안전한 API 키 생성",
      ja: "APIキージェネレーター - 安全なAPIキー生成",
    },
    description: {
      en: "Generate secure random API keys with customizable formats and prefixes.",
      ko: "사용자 지정 형식과 접두사로 안전한 랜덤 API 키를 생성합니다.",
      ja: "カスタマイズ可能な形式とプレフィックスで安全なランダムAPIキーを生成します。",
    },
    keywords: {
      en: [
        "api key generator",
        "random api key",
        "secure key",
        "token generator",
        "access key",
      ],
      ko: [
        "api 키 생성기",
        "랜덤 api 키",
        "안전한 키",
        "토큰 생성기",
        "액세스 키",
      ],
      ja: [
        "apiキージェネレーター",
        "ランダムapiキー",
        "安全なキー",
        "トークンジェネレーター",
        "アクセスキー",
      ],
    },
    useCases: {
      en: [
        "API authentication",
        "Third-party integrations",
        "Service tokens",
        "Webhook secrets",
      ],
      ko: ["API 인증", "서드파티 통합", "서비스 토큰", "웹훅 시크릿"],
      ja: [
        "API認証",
        "サードパーティ統合",
        "サービストークン",
        "Webhookシークレット",
      ],
    },
    category: "security",
    outputExample: "sk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  },

  jwt: {
    slug: "jwt",
    name: "JWT",
    title: {
      en: "JWT Generator - Create JSON Web Tokens",
      ko: "JWT 생성기 - JSON 웹 토큰 생성",
      ja: "JWTジェネレーター - JSONウェブトークン生成",
    },
    description: {
      en: "Generate JSON Web Tokens (JWT) for authentication and data exchange.",
      ko: "인증과 데이터 교환을 위한 JSON 웹 토큰(JWT)을 생성합니다.",
      ja: "認証とデータ交換のためのJSONウェブトークン（JWT）を生成します。",
    },
    keywords: {
      en: [
        "jwt generator",
        "json web token",
        "jwt token",
        "bearer token",
        "auth token",
      ],
      ko: [
        "jwt 생성기",
        "json 웹 토큰",
        "jwt 토큰",
        "베어러 토큰",
        "인증 토큰",
      ],
      ja: [
        "jwtジェネレーター",
        "jsonウェブトークン",
        "jwtトークン",
        "ベアラートークン",
        "認証トークン",
      ],
    },
    useCases: {
      en: [
        "API authentication",
        "Single sign-on",
        "Stateless sessions",
        "Microservices auth",
      ],
      ko: [
        "API 인증",
        "싱글 사인온",
        "상태 비저장 세션",
        "마이크로서비스 인증",
      ],
      ja: [
        "API認証",
        "シングルサインオン",
        "ステートレスセッション",
        "マイクロサービス認証",
      ],
    },
    category: "security",
    outputExample: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  },

  number: {
    slug: "number",
    name: "Number",
    title: {
      en: "Random Number Generator - Generate Random Numbers",
      ko: "랜덤 숫자 생성기 - 랜덤 숫자 생성",
      ja: "ランダム数字ジェネレーター - ランダム数字生成",
    },
    description: {
      en: "Generate random numbers within a specified range. Supports integers and decimals.",
      ko: "지정된 범위 내에서 랜덤 숫자를 생성합니다. 정수와 소수를 지원합니다.",
      ja: "指定された範囲内でランダムな数字を生成します。整数と小数をサポートします。",
    },
    keywords: {
      en: [
        "random number",
        "number generator",
        "random integer",
        "rng",
        "random decimal",
      ],
      ko: ["랜덤 숫자", "숫자 생성기", "랜덤 정수", "rng", "랜덤 소수"],
      ja: [
        "ランダム数字",
        "数字ジェネレーター",
        "ランダム整数",
        "rng",
        "ランダム小数",
      ],
    },
    useCases: {
      en: [
        "Lottery numbers",
        "Test data",
        "Game development",
        "Statistical sampling",
      ],
      ko: ["로또 번호", "테스트 데이터", "게임 개발", "통계 샘플링"],
      ja: ["宝くじ番号", "テストデータ", "ゲーム開発", "統計サンプリング"],
    },
    category: "data",
    outputExample: "42",
  },

  string: {
    slug: "string",
    name: "String",
    title: {
      en: "Random String Generator - Generate Random Strings",
      ko: "랜덤 문자열 생성기 - 랜덤 문자열 생성",
      ja: "ランダム文字列ジェネレーター - ランダム文字列生成",
    },
    description: {
      en: "Generate random strings with customizable character sets and length.",
      ko: "사용자 지정 문자 세트와 길이로 랜덤 문자열을 생성합니다.",
      ja: "カスタマイズ可能な文字セットと長さでランダムな文字列を生成します。",
    },
    keywords: {
      en: [
        "random string",
        "string generator",
        "random text",
        "alphanumeric",
        "random characters",
      ],
      ko: [
        "랜덤 문자열",
        "문자열 생성기",
        "랜덤 텍스트",
        "영숫자",
        "랜덤 문자",
      ],
      ja: [
        "ランダム文字列",
        "文字列ジェネレーター",
        "ランダムテキスト",
        "英数字",
        "ランダム文字",
      ],
    },
    useCases: {
      en: [
        "Token generation",
        "Test data",
        "Unique codes",
        "Placeholder content",
      ],
      ko: ["토큰 생성", "테스트 데이터", "고유 코드", "플레이스홀더 콘텐츠"],
      ja: [
        "トークン生成",
        "テストデータ",
        "ユニークコード",
        "プレースホルダーコンテンツ",
      ],
    },
    category: "text",
    outputExample: "aB3xY7mK9pL2",
  },
};

// Helper functions
export function getGenerateTypeBySlug(slug: string): GenerateType | undefined {
  return GENERATE_TYPE_REGISTRY[slug];
}

export function getAllGenerateTypeSlugs(): string[] {
  return Object.keys(GENERATE_TYPE_REGISTRY);
}

export function getGenerateTypesByCategory(
  category: GenerateType["category"],
): GenerateType[] {
  return Object.values(GENERATE_TYPE_REGISTRY).filter(
    (type) => type.category === category,
  );
}

export function getRelatedGenerateTypes(
  currentSlug: string,
  limit: number = 6,
): GenerateType[] {
  const current = GENERATE_TYPE_REGISTRY[currentSlug];
  if (!current) return [];

  return Object.values(GENERATE_TYPE_REGISTRY)
    .filter(
      (type) => type.slug !== currentSlug && type.category === current.category,
    )
    .slice(0, limit);
}
