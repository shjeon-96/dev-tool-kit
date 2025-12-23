import type { FormatType } from "./types";

export const FORMAT_TYPE_REGISTRY: Record<string, FormatType> = {
  json: {
    slug: "json",
    name: "JSON",
    fileExtension: ".json",
    mimeType: "application/json",
    title: {
      en: "JSON Formatter & Validator",
      ko: "JSON 포맷터 및 검증기",
      ja: "JSONフォーマッター＆バリデーター",
    },
    description: {
      en: "Format, validate, and beautify JSON data. Parse and minify JSON with syntax highlighting.",
      ko: "JSON 데이터를 포맷하고 검증하세요. 구문 강조와 함께 JSON을 파싱하고 압축합니다.",
      ja: "JSONデータをフォーマット、検証、整形します。シンタックスハイライト付きでJSONをパースして最小化します。",
    },
    keywords: {
      en: [
        "json formatter",
        "json validator",
        "json beautify",
        "json parser",
        "json minify",
      ],
      ko: ["json 포맷터", "json 검증기", "json 정렬", "json 파서", "json 압축"],
      ja: [
        "jsonフォーマッター",
        "json検証",
        "json整形",
        "jsonパーサー",
        "json最小化",
      ],
    },
    useCases: {
      en: [
        "API response formatting",
        "Config file editing",
        "Data debugging",
        "Schema validation",
      ],
      ko: ["API 응답 포맷팅", "설정 파일 편집", "데이터 디버깅", "스키마 검증"],
      ja: [
        "APIレスポンスのフォーマット",
        "設定ファイルの編集",
        "データのデバッグ",
        "スキーマ検証",
      ],
    },
    category: "data",
    isHumanReadable: true,
    supportsComments: false,
  },

  yaml: {
    slug: "yaml",
    name: "YAML",
    fileExtension: ".yaml",
    mimeType: "application/x-yaml",
    title: {
      en: "YAML Formatter & Validator",
      ko: "YAML 포맷터 및 검증기",
      ja: "YAMLフォーマッター＆バリデーター",
    },
    description: {
      en: "Format, validate, and convert YAML data. Human-readable data serialization format.",
      ko: "YAML 데이터를 포맷하고 검증합니다. 사람이 읽기 쉬운 데이터 직렬화 형식입니다.",
      ja: "YAMLデータをフォーマット、検証します。人間が読みやすいデータシリアライズ形式です。",
    },
    keywords: {
      en: [
        "yaml formatter",
        "yaml validator",
        "yaml to json",
        "yaml parser",
        "yaml beautify",
      ],
      ko: [
        "yaml 포맷터",
        "yaml 검증기",
        "yaml json 변환",
        "yaml 파서",
        "yaml 정렬",
      ],
      ja: [
        "yamlフォーマッター",
        "yaml検証",
        "yaml json変換",
        "yamlパーサー",
        "yaml整形",
      ],
    },
    useCases: {
      en: [
        "Kubernetes configs",
        "Docker Compose files",
        "CI/CD pipelines",
        "Configuration management",
      ],
      ko: [
        "Kubernetes 설정",
        "Docker Compose 파일",
        "CI/CD 파이프라인",
        "설정 관리",
      ],
      ja: [
        "Kubernetes設定",
        "Docker Composeファイル",
        "CI/CDパイプライン",
        "構成管理",
      ],
    },
    category: "config",
    isHumanReadable: true,
    supportsComments: true,
  },

  xml: {
    slug: "xml",
    name: "XML",
    fileExtension: ".xml",
    mimeType: "application/xml",
    title: {
      en: "XML Formatter & Validator",
      ko: "XML 포맷터 및 검증기",
      ja: "XMLフォーマッター＆バリデーター",
    },
    description: {
      en: "Format, validate, and beautify XML documents. Parse and minify XML with proper indentation.",
      ko: "XML 문서를 포맷하고 검증합니다. 적절한 들여쓰기로 XML을 파싱하고 압축합니다.",
      ja: "XMLドキュメントをフォーマット、検証、整形します。適切なインデントでXMLをパースして最小化します。",
    },
    keywords: {
      en: [
        "xml formatter",
        "xml validator",
        "xml beautify",
        "xml parser",
        "xml minify",
      ],
      ko: ["xml 포맷터", "xml 검증기", "xml 정렬", "xml 파서", "xml 압축"],
      ja: [
        "xmlフォーマッター",
        "xml検証",
        "xml整形",
        "xmlパーサー",
        "xml最小化",
      ],
    },
    useCases: {
      en: [
        "SOAP API responses",
        "RSS/Atom feeds",
        "SVG files",
        "Configuration files",
      ],
      ko: ["SOAP API 응답", "RSS/Atom 피드", "SVG 파일", "설정 파일"],
      ja: [
        "SOAP APIレスポンス",
        "RSS/Atomフィード",
        "SVGファイル",
        "設定ファイル",
      ],
    },
    category: "markup",
    isHumanReadable: true,
    supportsComments: true,
  },

  csv: {
    slug: "csv",
    name: "CSV",
    fileExtension: ".csv",
    mimeType: "text/csv",
    title: {
      en: "CSV Formatter & Converter",
      ko: "CSV 포맷터 및 변환기",
      ja: "CSVフォーマッター＆コンバーター",
    },
    description: {
      en: "Format, parse, and convert CSV data. Convert between CSV, JSON, and other formats.",
      ko: "CSV 데이터를 포맷하고 파싱합니다. CSV, JSON 및 기타 형식 간 변환을 지원합니다.",
      ja: "CSVデータをフォーマット、パースします。CSV、JSON、その他の形式間で変換します。",
    },
    keywords: {
      en: [
        "csv formatter",
        "csv to json",
        "csv parser",
        "csv converter",
        "csv editor",
      ],
      ko: [
        "csv 포맷터",
        "csv json 변환",
        "csv 파서",
        "csv 변환기",
        "csv 편집기",
      ],
      ja: [
        "csvフォーマッター",
        "csv json変換",
        "csvパーサー",
        "csvコンバーター",
        "csvエディター",
      ],
    },
    useCases: {
      en: [
        "Spreadsheet export",
        "Data migration",
        "Database import",
        "Report generation",
      ],
      ko: [
        "스프레드시트 내보내기",
        "데이터 마이그레이션",
        "데이터베이스 가져오기",
        "보고서 생성",
      ],
      ja: [
        "スプレッドシートのエクスポート",
        "データ移行",
        "データベースインポート",
        "レポート生成",
      ],
    },
    category: "data",
    isHumanReadable: true,
    supportsComments: false,
  },

  toml: {
    slug: "toml",
    name: "TOML",
    fileExtension: ".toml",
    mimeType: "application/toml",
    title: {
      en: "TOML Formatter & Validator",
      ko: "TOML 포맷터 및 검증기",
      ja: "TOMLフォーマッター＆バリデーター",
    },
    description: {
      en: "Format, validate, and convert TOML data. Minimal configuration file format.",
      ko: "TOML 데이터를 포맷하고 검증합니다. 최소한의 설정 파일 형식입니다.",
      ja: "TOMLデータをフォーマット、検証します。最小限の設定ファイル形式です。",
    },
    keywords: {
      en: [
        "toml formatter",
        "toml validator",
        "toml parser",
        "toml to json",
        "cargo toml",
      ],
      ko: [
        "toml 포맷터",
        "toml 검증기",
        "toml 파서",
        "toml json 변환",
        "cargo toml",
      ],
      ja: [
        "tomlフォーマッター",
        "toml検証",
        "tomlパーサー",
        "toml json変換",
        "cargo toml",
      ],
    },
    useCases: {
      en: [
        "Rust Cargo.toml",
        "Python pyproject.toml",
        "Hugo configuration",
        "Netlify config",
      ],
      ko: [
        "Rust Cargo.toml",
        "Python pyproject.toml",
        "Hugo 설정",
        "Netlify 설정",
      ],
      ja: [
        "Rust Cargo.toml",
        "Python pyproject.toml",
        "Hugo設定",
        "Netlify設定",
      ],
    },
    category: "config",
    isHumanReadable: true,
    supportsComments: true,
  },

  ini: {
    slug: "ini",
    name: "INI",
    fileExtension: ".ini",
    mimeType: "text/plain",
    title: {
      en: "INI File Formatter & Editor",
      ko: "INI 파일 포맷터 및 편집기",
      ja: "INIファイルフォーマッター＆エディター",
    },
    description: {
      en: "Format and edit INI configuration files. Simple section-based configuration format.",
      ko: "INI 설정 파일을 포맷하고 편집합니다. 간단한 섹션 기반 설정 형식입니다.",
      ja: "INI設定ファイルをフォーマット、編集します。シンプルなセクションベースの設定形式です。",
    },
    keywords: {
      en: [
        "ini editor",
        "ini formatter",
        "ini parser",
        "config file",
        "ini converter",
      ],
      ko: ["ini 편집기", "ini 포맷터", "ini 파서", "설정 파일", "ini 변환기"],
      ja: [
        "iniエディター",
        "iniフォーマッター",
        "iniパーサー",
        "設定ファイル",
        "iniコンバーター",
      ],
    },
    useCases: {
      en: [
        "Windows configuration",
        "PHP php.ini",
        "Git config",
        "Application settings",
      ],
      ko: ["Windows 설정", "PHP php.ini", "Git 설정", "애플리케이션 설정"],
      ja: ["Windows設定", "PHP php.ini", "Git設定", "アプリケーション設定"],
    },
    category: "config",
    isHumanReadable: true,
    supportsComments: true,
  },

  html: {
    slug: "html",
    name: "HTML",
    fileExtension: ".html",
    mimeType: "text/html",
    title: {
      en: "HTML Formatter & Beautifier",
      ko: "HTML 포맷터 및 정렬기",
      ja: "HTMLフォーマッター＆ビューティファイヤー",
    },
    description: {
      en: "Format, beautify, and minify HTML code. Clean up messy HTML with proper indentation.",
      ko: "HTML 코드를 포맷하고 정렬합니다. 지저분한 HTML을 적절한 들여쓰기로 정리합니다.",
      ja: "HTMLコードをフォーマット、整形、最小化します。適切なインデントで乱雑なHTMLを整理します。",
    },
    keywords: {
      en: [
        "html formatter",
        "html beautify",
        "html minify",
        "html cleaner",
        "html prettify",
      ],
      ko: ["html 포맷터", "html 정렬", "html 압축", "html 정리", "html 예쁘게"],
      ja: [
        "htmlフォーマッター",
        "html整形",
        "html最小化",
        "htmlクリーナー",
        "html整理",
      ],
    },
    useCases: {
      en: ["Web development", "Email templates", "Static pages", "CMS content"],
      ko: ["웹 개발", "이메일 템플릿", "정적 페이지", "CMS 콘텐츠"],
      ja: ["Web開発", "メールテンプレート", "静的ページ", "CMSコンテンツ"],
    },
    category: "markup",
    isHumanReadable: true,
    supportsComments: true,
  },

  css: {
    slug: "css",
    name: "CSS",
    fileExtension: ".css",
    mimeType: "text/css",
    title: {
      en: "CSS Formatter & Beautifier",
      ko: "CSS 포맷터 및 정렬기",
      ja: "CSSフォーマッター＆ビューティファイヤー",
    },
    description: {
      en: "Format, beautify, and minify CSS code. Organize styles with proper formatting.",
      ko: "CSS 코드를 포맷하고 정렬합니다. 적절한 서식으로 스타일을 정리합니다.",
      ja: "CSSコードをフォーマット、整形、最小化します。適切なフォーマットでスタイルを整理します。",
    },
    keywords: {
      en: [
        "css formatter",
        "css beautify",
        "css minify",
        "css prettify",
        "css cleaner",
      ],
      ko: ["css 포맷터", "css 정렬", "css 압축", "css 예쁘게", "css 정리"],
      ja: [
        "cssフォーマッター",
        "css整形",
        "css最小化",
        "css整理",
        "cssクリーナー",
      ],
    },
    useCases: {
      en: [
        "Stylesheet cleanup",
        "Code review prep",
        "Production optimization",
        "Style debugging",
      ],
      ko: [
        "스타일시트 정리",
        "코드 리뷰 준비",
        "프로덕션 최적화",
        "스타일 디버깅",
      ],
      ja: [
        "スタイルシートの整理",
        "コードレビュー準備",
        "本番最適化",
        "スタイルデバッグ",
      ],
    },
    category: "markup",
    isHumanReadable: true,
    supportsComments: true,
  },

  javascript: {
    slug: "javascript",
    name: "JavaScript",
    fileExtension: ".js",
    mimeType: "application/javascript",
    title: {
      en: "JavaScript Formatter & Beautifier",
      ko: "JavaScript 포맷터 및 정렬기",
      ja: "JavaScriptフォーマッター＆ビューティファイヤー",
    },
    description: {
      en: "Format, beautify, and minify JavaScript code. Clean up messy JS with proper formatting.",
      ko: "JavaScript 코드를 포맷하고 정렬합니다. 지저분한 JS를 적절한 서식으로 정리합니다.",
      ja: "JavaScriptコードをフォーマット、整形、最小化します。適切なフォーマットで乱雑なJSを整理します。",
    },
    keywords: {
      en: [
        "javascript formatter",
        "js beautify",
        "js minify",
        "javascript prettify",
        "js cleaner",
      ],
      ko: [
        "자바스크립트 포맷터",
        "js 정렬",
        "js 압축",
        "자바스크립트 예쁘게",
        "js 정리",
      ],
      ja: [
        "javascriptフォーマッター",
        "js整形",
        "js最小化",
        "javascript整理",
        "jsクリーナー",
      ],
    },
    useCases: {
      en: [
        "Code cleanup",
        "Debugging minified code",
        "Code review",
        "Bundle analysis",
      ],
      ko: ["코드 정리", "압축 코드 디버깅", "코드 리뷰", "번들 분석"],
      ja: [
        "コード整理",
        "ミニファイコードのデバッグ",
        "コードレビュー",
        "バンドル分析",
      ],
    },
    category: "markup",
    isHumanReadable: true,
    supportsComments: true,
  },

  typescript: {
    slug: "typescript",
    name: "TypeScript",
    fileExtension: ".ts",
    mimeType: "application/typescript",
    title: {
      en: "TypeScript Formatter & Beautifier",
      ko: "TypeScript 포맷터 및 정렬기",
      ja: "TypeScriptフォーマッター＆ビューティファイヤー",
    },
    description: {
      en: "Format and beautify TypeScript code. Clean up TS files with proper formatting.",
      ko: "TypeScript 코드를 포맷하고 정렬합니다. TS 파일을 적절한 서식으로 정리합니다.",
      ja: "TypeScriptコードをフォーマット、整形します。適切なフォーマットでTSファイルを整理します。",
    },
    keywords: {
      en: [
        "typescript formatter",
        "ts beautify",
        "typescript prettify",
        "ts formatter",
        "ts cleaner",
      ],
      ko: [
        "타입스크립트 포맷터",
        "ts 정렬",
        "타입스크립트 예쁘게",
        "ts 포맷터",
        "ts 정리",
      ],
      ja: [
        "typescriptフォーマッター",
        "ts整形",
        "typescript整理",
        "tsフォーマッター",
        "tsクリーナー",
      ],
    },
    useCases: {
      en: [
        "Code cleanup",
        "Code review",
        "Type debugging",
        "Codebase migration",
      ],
      ko: ["코드 정리", "코드 리뷰", "타입 디버깅", "코드베이스 마이그레이션"],
      ja: ["コード整理", "コードレビュー", "型デバッグ", "コードベース移行"],
    },
    category: "markup",
    isHumanReadable: true,
    supportsComments: true,
  },

  sql: {
    slug: "sql",
    name: "SQL",
    fileExtension: ".sql",
    mimeType: "application/sql",
    title: {
      en: "SQL Formatter & Beautifier",
      ko: "SQL 포맷터 및 정렬기",
      ja: "SQLフォーマッター＆ビューティファイヤー",
    },
    description: {
      en: "Format and beautify SQL queries. Clean up complex queries with proper indentation.",
      ko: "SQL 쿼리를 포맷하고 정렬합니다. 복잡한 쿼리를 적절한 들여쓰기로 정리합니다.",
      ja: "SQLクエリをフォーマット、整形します。適切なインデントで複雑なクエリを整理します。",
    },
    keywords: {
      en: [
        "sql formatter",
        "sql beautify",
        "sql prettify",
        "query formatter",
        "sql cleaner",
      ],
      ko: ["sql 포맷터", "sql 정렬", "sql 예쁘게", "쿼리 포맷터", "sql 정리"],
      ja: [
        "sqlフォーマッター",
        "sql整形",
        "sql整理",
        "クエリフォーマッター",
        "sqlクリーナー",
      ],
    },
    useCases: {
      en: [
        "Query debugging",
        "Code review",
        "Documentation",
        "Performance analysis",
      ],
      ko: ["쿼리 디버깅", "코드 리뷰", "문서화", "성능 분석"],
      ja: [
        "クエリデバッグ",
        "コードレビュー",
        "ドキュメント化",
        "パフォーマンス分析",
      ],
    },
    category: "data",
    isHumanReadable: true,
    supportsComments: true,
  },

  markdown: {
    slug: "markdown",
    name: "Markdown",
    fileExtension: ".md",
    mimeType: "text/markdown",
    title: {
      en: "Markdown Formatter & Preview",
      ko: "마크다운 포맷터 및 미리보기",
      ja: "Markdownフォーマッター＆プレビュー",
    },
    description: {
      en: "Format and preview Markdown documents. Edit with live preview and export options.",
      ko: "마크다운 문서를 포맷하고 미리보기합니다. 실시간 미리보기와 내보내기 옵션으로 편집합니다.",
      ja: "Markdownドキュメントをフォーマット、プレビューします。ライブプレビューとエクスポートオプションで編集します。",
    },
    keywords: {
      en: [
        "markdown editor",
        "markdown preview",
        "markdown formatter",
        "md editor",
        "markdown beautify",
      ],
      ko: [
        "마크다운 편집기",
        "마크다운 미리보기",
        "마크다운 포맷터",
        "md 편집기",
        "마크다운 정렬",
      ],
      ja: [
        "markdownエディター",
        "markdownプレビュー",
        "markdownフォーマッター",
        "mdエディター",
        "markdown整形",
      ],
    },
    useCases: {
      en: ["README files", "Documentation", "Blog posts", "Notes taking"],
      ko: ["README 파일", "문서화", "블로그 글", "노트 작성"],
      ja: ["READMEファイル", "ドキュメント化", "ブログ記事", "ノート作成"],
    },
    category: "document",
    isHumanReadable: true,
    supportsComments: false,
  },

  graphql: {
    slug: "graphql",
    name: "GraphQL",
    fileExtension: ".graphql",
    mimeType: "application/graphql",
    title: {
      en: "GraphQL Formatter & Beautifier",
      ko: "GraphQL 포맷터 및 정렬기",
      ja: "GraphQLフォーマッター＆ビューティファイヤー",
    },
    description: {
      en: "Format and beautify GraphQL queries and schemas. Clean up messy GraphQL code.",
      ko: "GraphQL 쿼리와 스키마를 포맷하고 정렬합니다. 지저분한 GraphQL 코드를 정리합니다.",
      ja: "GraphQLクエリとスキーマをフォーマット、整形します。乱雑なGraphQLコードを整理します。",
    },
    keywords: {
      en: [
        "graphql formatter",
        "graphql beautify",
        "graphql prettify",
        "graphql schema",
        "gql formatter",
      ],
      ko: [
        "graphql 포맷터",
        "graphql 정렬",
        "graphql 예쁘게",
        "graphql 스키마",
        "gql 포맷터",
      ],
      ja: [
        "graphqlフォーマッター",
        "graphql整形",
        "graphql整理",
        "graphqlスキーマ",
        "gqlフォーマッター",
      ],
    },
    useCases: {
      en: [
        "API development",
        "Schema design",
        "Query debugging",
        "Documentation",
      ],
      ko: ["API 개발", "스키마 설계", "쿼리 디버깅", "문서화"],
      ja: ["API開発", "スキーマ設計", "クエリデバッグ", "ドキュメント化"],
    },
    category: "data",
    isHumanReadable: true,
    supportsComments: true,
  },

  properties: {
    slug: "properties",
    name: "Properties",
    fileExtension: ".properties",
    mimeType: "text/x-java-properties",
    title: {
      en: "Properties File Editor",
      ko: "Properties 파일 편집기",
      ja: "Propertiesファイルエディター",
    },
    description: {
      en: "Edit and format Java properties files. Key-value configuration file format.",
      ko: "Java properties 파일을 편집하고 포맷합니다. 키-값 설정 파일 형식입니다.",
      ja: "Java propertiesファイルを編集、フォーマットします。キー・バリュー設定ファイル形式です。",
    },
    keywords: {
      en: [
        "properties editor",
        "java properties",
        "properties formatter",
        "config file",
        "key value editor",
      ],
      ko: [
        "properties 편집기",
        "java properties",
        "properties 포맷터",
        "설정 파일",
        "키값 편집기",
      ],
      ja: [
        "propertiesエディター",
        "java properties",
        "propertiesフォーマッター",
        "設定ファイル",
        "キー値エディター",
      ],
    },
    useCases: {
      en: [
        "Java configuration",
        "Spring Boot config",
        "Localization files",
        "Application settings",
      ],
      ko: ["Java 설정", "Spring Boot 설정", "다국어 파일", "애플리케이션 설정"],
      ja: [
        "Java設定",
        "Spring Boot設定",
        "多言語ファイル",
        "アプリケーション設定",
      ],
    },
    category: "config",
    isHumanReadable: true,
    supportsComments: true,
  },

  env: {
    slug: "env",
    name: ".env",
    fileExtension: ".env",
    mimeType: "text/plain",
    title: {
      en: ".env File Editor",
      ko: ".env 파일 편집기",
      ja: ".envファイルエディター",
    },
    description: {
      en: "Edit and validate .env files. Environment variable configuration format.",
      ko: ".env 파일을 편집하고 검증합니다. 환경 변수 설정 형식입니다.",
      ja: ".envファイルを編集、検証します。環境変数設定形式です。",
    },
    keywords: {
      en: [
        "env editor",
        "dotenv",
        "environment variables",
        "env file",
        "env formatter",
      ],
      ko: ["env 편집기", "dotenv", "환경 변수", "env 파일", "env 포맷터"],
      ja: [
        "envエディター",
        "dotenv",
        "環境変数",
        "envファイル",
        "envフォーマッター",
      ],
    },
    useCases: {
      en: [
        "Development setup",
        "Docker configuration",
        "CI/CD secrets",
        "App configuration",
      ],
      ko: ["개발 환경 설정", "Docker 설정", "CI/CD 시크릿", "앱 설정"],
      ja: ["開発環境設定", "Docker設定", "CI/CDシークレット", "アプリ設定"],
    },
    category: "config",
    isHumanReadable: true,
    supportsComments: true,
  },
};

// Helper functions
export function getFormatTypeBySlug(slug: string): FormatType | undefined {
  return FORMAT_TYPE_REGISTRY[slug];
}

export function getAllFormatTypeSlugs(): string[] {
  return Object.keys(FORMAT_TYPE_REGISTRY);
}

export function getFormatTypesByCategory(
  category: FormatType["category"],
): FormatType[] {
  return Object.values(FORMAT_TYPE_REGISTRY).filter(
    (format) => format.category === category,
  );
}

export function getRelatedFormatTypes(
  currentSlug: string,
  limit: number = 6,
): FormatType[] {
  const current = FORMAT_TYPE_REGISTRY[currentSlug];
  if (!current) return [];

  return Object.values(FORMAT_TYPE_REGISTRY)
    .filter(
      (format) =>
        format.slug !== currentSlug && format.category === current.category,
    )
    .slice(0, limit);
}
