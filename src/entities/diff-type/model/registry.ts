import type { DiffType, DiffTypeSlug } from "./types";

export const diffTypeRegistry: Record<DiffTypeSlug, DiffType> = {
  text: {
    slug: "text",
    name: "Text",
    fileExtension: ".txt",
    category: "text",
    content: {
      en: {
        title: "Text Diff",
        description:
          "Compare two text files or strings. Find differences line by line with highlighted changes.",
        metaTitle: "Text Diff - Compare Text Online | Free Tool",
        metaDescription:
          "Free online text diff tool. Compare two text files, find differences, and see highlighted changes line by line.",
        keywords: [
          "text diff",
          "compare text",
          "text comparison",
          "find differences",
          "diff tool",
        ],
        features: [
          "Line-by-line comparison",
          "Side-by-side view",
          "Unified diff output",
          "Character-level highlighting",
        ],
        useCases: [
          "Document version comparison",
          "Content change tracking",
          "Text file comparison",
          "Log file analysis",
        ],
      },
      ko: {
        title: "텍스트 비교",
        description:
          "두 텍스트 파일 또는 문자열을 비교합니다. 변경 사항이 강조된 줄 단위 차이를 찾습니다.",
        metaTitle: "텍스트 비교 - 온라인 텍스트 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 텍스트 비교 도구. 두 텍스트 파일을 비교하고 차이점을 찾아 줄별로 변경 사항을 확인합니다.",
        keywords: [
          "텍스트 비교",
          "텍스트 diff",
          "문자열 비교",
          "차이점 찾기",
          "비교 도구",
        ],
        features: [
          "줄 단위 비교",
          "나란히 보기",
          "통합 diff 출력",
          "문자 수준 강조",
        ],
        useCases: [
          "문서 버전 비교",
          "콘텐츠 변경 추적",
          "텍스트 파일 비교",
          "로그 파일 분석",
        ],
      },
      ja: {
        title: "テキスト比較",
        description:
          "2つのテキストファイルまたは文字列を比較します。変更がハイライトされた行単位の差分を見つけます。",
        metaTitle: "テキスト比較 - オンラインでテキスト比較 | 無料ツール",
        metaDescription:
          "無料のオンラインテキスト比較ツール。2つのテキストファイルを比較し、差分を見つけ、行ごとの変更を確認します。",
        keywords: [
          "テキスト 比較",
          "テキスト diff",
          "文字列 比較",
          "差分 検索",
          "比較 ツール",
        ],
        features: [
          "行単位の比較",
          "横並び表示",
          "統合diff出力",
          "文字レベルのハイライト",
        ],
        useCases: [
          "ドキュメントバージョン比較",
          "コンテンツ変更追跡",
          "テキストファイル比較",
          "ログファイル分析",
        ],
      },
    },
  },
  json: {
    slug: "json",
    name: "JSON",
    fileExtension: ".json",
    category: "data",
    content: {
      en: {
        title: "JSON Diff",
        description:
          "Compare two JSON objects or files. Detect added, removed, and modified properties with semantic comparison.",
        metaTitle: "JSON Diff - Compare JSON Online | Free Tool",
        metaDescription:
          "Free online JSON diff tool. Compare two JSON files, find structural differences, and see property changes.",
        keywords: [
          "json diff",
          "compare json",
          "json comparison",
          "json difference",
          "diff json files",
        ],
        features: [
          "Semantic comparison",
          "Key sorting option",
          "Nested object support",
          "Array diff detection",
        ],
        useCases: [
          "API response comparison",
          "Config file changes",
          "Data migration verification",
          "Schema evolution tracking",
        ],
      },
      ko: {
        title: "JSON 비교",
        description:
          "두 JSON 객체 또는 파일을 비교합니다. 의미론적 비교로 추가, 제거, 수정된 속성을 감지합니다.",
        metaTitle: "JSON 비교 - 온라인 JSON 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 JSON 비교 도구. 두 JSON 파일을 비교하고 구조적 차이를 찾아 속성 변경을 확인합니다.",
        keywords: [
          "json 비교",
          "json diff",
          "json 차이점",
          "json 파일 비교",
          "json 변경 사항",
        ],
        features: [
          "의미론적 비교",
          "키 정렬 옵션",
          "중첩 객체 지원",
          "배열 차이 감지",
        ],
        useCases: [
          "API 응답 비교",
          "설정 파일 변경",
          "데이터 마이그레이션 검증",
          "스키마 진화 추적",
        ],
      },
      ja: {
        title: "JSON比較",
        description:
          "2つのJSONオブジェクトまたはファイルを比較します。セマンティック比較で追加、削除、変更されたプロパティを検出します。",
        metaTitle: "JSON比較 - オンラインでJSON比較 | 無料ツール",
        metaDescription:
          "無料のオンラインJSON比較ツール。2つのJSONファイルを比較し、構造的な差分を見つけ、プロパティの変更を確認します。",
        keywords: [
          "json 比較",
          "json diff",
          "json 差分",
          "json ファイル 比較",
          "json 変更",
        ],
        features: [
          "セマンティック比較",
          "キーソートオプション",
          "ネストオブジェクトサポート",
          "配列差分検出",
        ],
        useCases: [
          "APIレスポンス比較",
          "設定ファイル変更",
          "データ移行検証",
          "スキーマ進化追跡",
        ],
      },
    },
  },
  xml: {
    slug: "xml",
    name: "XML",
    fileExtension: ".xml",
    category: "markup",
    content: {
      en: {
        title: "XML Diff",
        description:
          "Compare two XML documents. Find differences in elements, attributes, and structure.",
        metaTitle: "XML Diff - Compare XML Online | Free Tool",
        metaDescription:
          "Free online XML diff tool. Compare two XML files, find element differences, and track structural changes.",
        keywords: [
          "xml diff",
          "compare xml",
          "xml comparison",
          "xml difference",
          "diff xml files",
        ],
        features: [
          "Element comparison",
          "Attribute diff",
          "Namespace support",
          "Structural analysis",
        ],
        useCases: [
          "Configuration comparison",
          "SOAP message diff",
          "RSS/Atom feed changes",
          "XML schema comparison",
        ],
      },
      ko: {
        title: "XML 비교",
        description:
          "두 XML 문서를 비교합니다. 요소, 속성, 구조의 차이를 찾습니다.",
        metaTitle: "XML 비교 - 온라인 XML 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 XML 비교 도구. 두 XML 파일을 비교하고 요소 차이를 찾아 구조적 변경을 추적합니다.",
        keywords: [
          "xml 비교",
          "xml diff",
          "xml 차이점",
          "xml 파일 비교",
          "xml 변경",
        ],
        features: ["요소 비교", "속성 diff", "네임스페이스 지원", "구조 분석"],
        useCases: [
          "설정 비교",
          "SOAP 메시지 비교",
          "RSS/Atom 피드 변경",
          "XML 스키마 비교",
        ],
      },
      ja: {
        title: "XML比較",
        description:
          "2つのXMLドキュメントを比較します。要素、属性、構造の違いを見つけます。",
        metaTitle: "XML比較 - オンラインでXML比較 | 無料ツール",
        metaDescription:
          "無料のオンラインXML比較ツール。2つのXMLファイルを比較し、要素の差分を見つけ、構造的な変更を追跡します。",
        keywords: [
          "xml 比較",
          "xml diff",
          "xml 差分",
          "xml ファイル 比較",
          "xml 変更",
        ],
        features: ["要素比較", "属性diff", "名前空間サポート", "構造分析"],
        useCases: [
          "設定比較",
          "SOAPメッセージ比較",
          "RSS/Atomフィード変更",
          "XMLスキーマ比較",
        ],
      },
    },
  },
  html: {
    slug: "html",
    name: "HTML",
    fileExtension: ".html",
    category: "markup",
    content: {
      en: {
        title: "HTML Diff",
        description:
          "Compare two HTML documents. Detect changes in tags, attributes, and content structure.",
        metaTitle: "HTML Diff - Compare HTML Online | Free Tool",
        metaDescription:
          "Free online HTML diff tool. Compare two HTML files, find markup differences, and track DOM changes.",
        keywords: [
          "html diff",
          "compare html",
          "html comparison",
          "html difference",
          "diff html files",
        ],
        features: [
          "Tag comparison",
          "Attribute tracking",
          "Content diff",
          "DOM structure analysis",
        ],
        useCases: [
          "Web page comparison",
          "Template changes",
          "Email template diff",
          "Static site tracking",
        ],
      },
      ko: {
        title: "HTML 비교",
        description:
          "두 HTML 문서를 비교합니다. 태그, 속성, 콘텐츠 구조의 변경을 감지합니다.",
        metaTitle: "HTML 비교 - 온라인 HTML 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 HTML 비교 도구. 두 HTML 파일을 비교하고 마크업 차이를 찾아 DOM 변경을 추적합니다.",
        keywords: [
          "html 비교",
          "html diff",
          "html 차이점",
          "html 파일 비교",
          "마크업 비교",
        ],
        features: ["태그 비교", "속성 추적", "콘텐츠 diff", "DOM 구조 분석"],
        useCases: [
          "웹 페이지 비교",
          "템플릿 변경",
          "이메일 템플릿 비교",
          "정적 사이트 추적",
        ],
      },
      ja: {
        title: "HTML比較",
        description:
          "2つのHTMLドキュメントを比較します。タグ、属性、コンテンツ構造の変更を検出します。",
        metaTitle: "HTML比較 - オンラインでHTML比較 | 無料ツール",
        metaDescription:
          "無料のオンラインHTML比較ツール。2つのHTMLファイルを比較し、マークアップの差分を見つけ、DOM変更を追跡します。",
        keywords: [
          "html 比較",
          "html diff",
          "html 差分",
          "html ファイル 比較",
          "マークアップ 比較",
        ],
        features: ["タグ比較", "属性追跡", "コンテンツdiff", "DOM構造分析"],
        useCases: [
          "ウェブページ比較",
          "テンプレート変更",
          "メールテンプレート比較",
          "静的サイト追跡",
        ],
      },
    },
  },
  css: {
    slug: "css",
    name: "CSS",
    fileExtension: ".css",
    category: "code",
    content: {
      en: {
        title: "CSS Diff",
        description:
          "Compare two CSS stylesheets. Find differences in selectors, properties, and values.",
        metaTitle: "CSS Diff - Compare CSS Online | Free Tool",
        metaDescription:
          "Free online CSS diff tool. Compare two CSS files, find style differences, and track property changes.",
        keywords: [
          "css diff",
          "compare css",
          "css comparison",
          "css difference",
          "diff css files",
        ],
        features: [
          "Selector comparison",
          "Property diff",
          "Value tracking",
          "Rule-based analysis",
        ],
        useCases: [
          "Style regression testing",
          "Design system updates",
          "Theme comparison",
          "CSS refactoring",
        ],
      },
      ko: {
        title: "CSS 비교",
        description:
          "두 CSS 스타일시트를 비교합니다. 선택자, 속성, 값의 차이를 찾습니다.",
        metaTitle: "CSS 비교 - 온라인 CSS 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 CSS 비교 도구. 두 CSS 파일을 비교하고 스타일 차이를 찾아 속성 변경을 추적합니다.",
        keywords: [
          "css 비교",
          "css diff",
          "css 차이점",
          "css 파일 비교",
          "스타일 비교",
        ],
        features: ["선택자 비교", "속성 diff", "값 추적", "규칙 기반 분석"],
        useCases: [
          "스타일 회귀 테스트",
          "디자인 시스템 업데이트",
          "테마 비교",
          "CSS 리팩토링",
        ],
      },
      ja: {
        title: "CSS比較",
        description:
          "2つのCSSスタイルシートを比較します。セレクター、プロパティ、値の違いを見つけます。",
        metaTitle: "CSS比較 - オンラインでCSS比較 | 無料ツール",
        metaDescription:
          "無料のオンラインCSS比較ツール。2つのCSSファイルを比較し、スタイルの差分を見つけ、プロパティ変更を追跡します。",
        keywords: [
          "css 比較",
          "css diff",
          "css 差分",
          "css ファイル 比較",
          "スタイル 比較",
        ],
        features: [
          "セレクター比較",
          "プロパティdiff",
          "値追跡",
          "ルールベース分析",
        ],
        useCases: [
          "スタイル回帰テスト",
          "デザインシステム更新",
          "テーマ比較",
          "CSSリファクタリング",
        ],
      },
    },
  },
  javascript: {
    slug: "javascript",
    name: "JavaScript",
    fileExtension: ".js",
    category: "code",
    content: {
      en: {
        title: "JavaScript Diff",
        description:
          "Compare two JavaScript files. Find code differences with syntax-aware comparison.",
        metaTitle: "JavaScript Diff - Compare JS Online | Free Tool",
        metaDescription:
          "Free online JavaScript diff tool. Compare two JS files, find code differences, and track function changes.",
        keywords: [
          "javascript diff",
          "compare javascript",
          "js comparison",
          "js difference",
          "diff js files",
        ],
        features: [
          "Syntax highlighting",
          "Function comparison",
          "Variable tracking",
          "Import diff",
        ],
        useCases: [
          "Code review preparation",
          "Version comparison",
          "Refactoring verification",
          "Merge conflict analysis",
        ],
      },
      ko: {
        title: "JavaScript 비교",
        description:
          "두 JavaScript 파일을 비교합니다. 구문 인식 비교로 코드 차이를 찾습니다.",
        metaTitle: "JavaScript 비교 - 온라인 JS 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 JavaScript 비교 도구. 두 JS 파일을 비교하고 코드 차이를 찾아 함수 변경을 추적합니다.",
        keywords: [
          "javascript 비교",
          "js diff",
          "자바스크립트 비교",
          "js 파일 비교",
          "코드 비교",
        ],
        features: ["구문 강조", "함수 비교", "변수 추적", "import diff"],
        useCases: [
          "코드 리뷰 준비",
          "버전 비교",
          "리팩토링 검증",
          "병합 충돌 분석",
        ],
      },
      ja: {
        title: "JavaScript比較",
        description:
          "2つのJavaScriptファイルを比較します。構文対応の比較でコードの違いを見つけます。",
        metaTitle: "JavaScript比較 - オンラインでJS比較 | 無料ツール",
        metaDescription:
          "無料のオンラインJavaScript比較ツール。2つのJSファイルを比較し、コードの差分を見つけ、関数変更を追跡します。",
        keywords: [
          "javascript 比較",
          "js diff",
          "ジャバスクリプト 比較",
          "js ファイル 比較",
          "コード 比較",
        ],
        features: ["構文ハイライト", "関数比較", "変数追跡", "importdiff"],
        useCases: [
          "コードレビュー準備",
          "バージョン比較",
          "リファクタリング検証",
          "マージ競合分析",
        ],
      },
    },
  },
  markdown: {
    slug: "markdown",
    name: "Markdown",
    fileExtension: ".md",
    category: "text",
    content: {
      en: {
        title: "Markdown Diff",
        description:
          "Compare two Markdown documents. Find differences in headings, content, and formatting.",
        metaTitle: "Markdown Diff - Compare MD Files Online | Free Tool",
        metaDescription:
          "Free online Markdown diff tool. Compare two MD files, find content differences, and track document changes.",
        keywords: [
          "markdown diff",
          "compare markdown",
          "md comparison",
          "markdown difference",
          "diff md files",
        ],
        features: [
          "Heading comparison",
          "Content diff",
          "Link tracking",
          "List comparison",
        ],
        useCases: [
          "Documentation updates",
          "README changes",
          "Wiki revisions",
          "Blog post editing",
        ],
      },
      ko: {
        title: "Markdown 비교",
        description:
          "두 Markdown 문서를 비교합니다. 제목, 콘텐츠, 포맷팅의 차이를 찾습니다.",
        metaTitle: "Markdown 비교 - 온라인 MD 파일 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 Markdown 비교 도구. 두 MD 파일을 비교하고 콘텐츠 차이를 찾아 문서 변경을 추적합니다.",
        keywords: [
          "markdown 비교",
          "md diff",
          "마크다운 비교",
          "md 파일 비교",
          "문서 비교",
        ],
        features: ["제목 비교", "콘텐츠 diff", "링크 추적", "목록 비교"],
        useCases: [
          "문서 업데이트",
          "README 변경",
          "위키 수정",
          "블로그 포스트 편집",
        ],
      },
      ja: {
        title: "Markdown比較",
        description:
          "2つのMarkdownドキュメントを比較します。見出し、コンテンツ、フォーマットの違いを見つけます。",
        metaTitle: "Markdown比較 - オンラインでMDファイル比較 | 無料ツール",
        metaDescription:
          "無料のオンラインMarkdown比較ツール。2つのMDファイルを比較し、コンテンツの差分を見つけ、ドキュメント変更を追跡します。",
        keywords: [
          "markdown 比較",
          "md diff",
          "マークダウン 比較",
          "md ファイル 比較",
          "ドキュメント 比較",
        ],
        features: ["見出し比較", "コンテンツdiff", "リンク追跡", "リスト比較"],
        useCases: [
          "ドキュメント更新",
          "README変更",
          "Wiki修正",
          "ブログ投稿編集",
        ],
      },
    },
  },
  yaml: {
    slug: "yaml",
    name: "YAML",
    fileExtension: ".yaml",
    category: "data",
    content: {
      en: {
        title: "YAML Diff",
        description:
          "Compare two YAML files. Find differences in keys, values, and structure with semantic comparison.",
        metaTitle: "YAML Diff - Compare YAML Online | Free Tool",
        metaDescription:
          "Free online YAML diff tool. Compare two YAML files, find configuration differences, and track structural changes.",
        keywords: [
          "yaml diff",
          "compare yaml",
          "yaml comparison",
          "yaml difference",
          "diff yaml files",
        ],
        features: [
          "Semantic comparison",
          "Key ordering",
          "Nested structure support",
          "Comment awareness",
        ],
        useCases: [
          "Kubernetes config diff",
          "Docker Compose changes",
          "CI/CD pipeline comparison",
          "Application config tracking",
        ],
      },
      ko: {
        title: "YAML 비교",
        description:
          "두 YAML 파일을 비교합니다. 의미론적 비교로 키, 값, 구조의 차이를 찾습니다.",
        metaTitle: "YAML 비교 - 온라인 YAML 비교 | 무료 도구",
        metaDescription:
          "무료 온라인 YAML 비교 도구. 두 YAML 파일을 비교하고 설정 차이를 찾아 구조적 변경을 추적합니다.",
        keywords: [
          "yaml 비교",
          "yaml diff",
          "yaml 차이점",
          "yaml 파일 비교",
          "설정 비교",
        ],
        features: ["의미론적 비교", "키 순서", "중첩 구조 지원", "주석 인식"],
        useCases: [
          "Kubernetes 설정 비교",
          "Docker Compose 변경",
          "CI/CD 파이프라인 비교",
          "애플리케이션 설정 추적",
        ],
      },
      ja: {
        title: "YAML比較",
        description:
          "2つのYAMLファイルを比較します。セマンティック比較でキー、値、構造の違いを見つけます。",
        metaTitle: "YAML比較 - オンラインでYAML比較 | 無料ツール",
        metaDescription:
          "無料のオンラインYAML比較ツール。2つのYAMLファイルを比較し、設定の差分を見つけ、構造的な変更を追跡します。",
        keywords: [
          "yaml 比較",
          "yaml diff",
          "yaml 差分",
          "yaml ファイル 比較",
          "設定 比較",
        ],
        features: [
          "セマンティック比較",
          "キー順序",
          "ネスト構造サポート",
          "コメント認識",
        ],
        useCases: [
          "Kubernetes設定比較",
          "Docker Compose変更",
          "CI/CDパイプライン比較",
          "アプリケーション設定追跡",
        ],
      },
    },
  },
};

// Helper functions
export function getDiffTypeBySlug(slug: string): DiffType | undefined {
  return diffTypeRegistry[slug as DiffTypeSlug];
}

export function getAllDiffTypeSlugs(): DiffTypeSlug[] {
  return Object.keys(diffTypeRegistry) as DiffTypeSlug[];
}

export function getDiffTypesByCategory(
  category: DiffType["category"],
): DiffType[] {
  return Object.values(diffTypeRegistry).filter(
    (type) => type.category === category,
  );
}

export function getRelatedDiffTypes(
  currentSlug: DiffTypeSlug,
  limit: number = 4,
): DiffType[] {
  const current = diffTypeRegistry[currentSlug];
  if (!current) return [];

  const sameCategory = Object.values(diffTypeRegistry).filter(
    (type) => type.category === current.category && type.slug !== currentSlug,
  );

  const otherCategory = Object.values(diffTypeRegistry).filter(
    (type) => type.category !== current.category,
  );

  return [...sameCategory, ...otherCategory].slice(0, limit);
}
