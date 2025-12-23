import type { MinifyType, MinifyTypeSlug } from "./types";

export const minifyTypeRegistry: Record<MinifyTypeSlug, MinifyType> = {
  json: {
    slug: "json",
    name: "JSON",
    fileExtension: ".json",
    mimeType: "application/json",
    category: "data",
    content: {
      en: {
        title: "JSON Minifier",
        description:
          "Minify JSON data by removing whitespace, newlines, and unnecessary characters to reduce file size.",
        metaTitle: "JSON Minifier - Compress JSON Online | Free Tool",
        metaDescription:
          "Free online JSON minifier. Compress JSON files by removing whitespace and formatting. Reduce JSON size for faster API responses and smaller payloads.",
        keywords: [
          "json minifier",
          "compress json",
          "json compressor",
          "minify json online",
          "reduce json size",
        ],
        benefits: [
          "Reduce API payload size",
          "Faster network transfers",
          "Lower bandwidth costs",
          "Improved application performance",
        ],
        useCases: [
          "API response optimization",
          "Configuration file compression",
          "Storage optimization",
          "CDN deployment",
        ],
      },
      ko: {
        title: "JSON 압축기",
        description:
          "공백, 줄바꿈, 불필요한 문자를 제거하여 JSON 데이터를 압축하고 파일 크기를 줄입니다.",
        metaTitle: "JSON 압축기 - 온라인 JSON 압축 | 무료 도구",
        metaDescription:
          "무료 온라인 JSON 압축기. 공백과 포맷팅을 제거하여 JSON 파일을 압축합니다. API 응답 속도 향상과 페이로드 크기 감소에 효과적입니다.",
        keywords: [
          "json 압축",
          "json 압축기",
          "json 최소화",
          "json 크기 줄이기",
          "온라인 json 압축",
        ],
        benefits: [
          "API 페이로드 크기 감소",
          "빠른 네트워크 전송",
          "대역폭 비용 절감",
          "애플리케이션 성능 향상",
        ],
        useCases: [
          "API 응답 최적화",
          "설정 파일 압축",
          "저장소 최적화",
          "CDN 배포",
        ],
      },
      ja: {
        title: "JSON圧縮ツール",
        description:
          "空白、改行、不要な文字を削除してJSONデータを圧縮し、ファイルサイズを縮小します。",
        metaTitle: "JSON圧縮ツール - オンラインでJSON圧縮 | 無料ツール",
        metaDescription:
          "無料のオンラインJSON圧縮ツール。空白とフォーマットを削除してJSONファイルを圧縮。API応答の高速化とペイロードサイズの削減に効果的です。",
        keywords: [
          "json 圧縮",
          "json 最小化",
          "json コンプレッサー",
          "json サイズ縮小",
          "オンライン json 圧縮",
        ],
        benefits: [
          "APIペイロードサイズの削減",
          "高速なネットワーク転送",
          "帯域幅コストの削減",
          "アプリケーションパフォーマンスの向上",
        ],
        useCases: [
          "API応答の最適化",
          "設定ファイルの圧縮",
          "ストレージの最適化",
          "CDNデプロイ",
        ],
      },
    },
  },
  javascript: {
    slug: "javascript",
    name: "JavaScript",
    fileExtension: ".js",
    mimeType: "application/javascript",
    category: "code",
    content: {
      en: {
        title: "JavaScript Minifier",
        description:
          "Minify JavaScript code by removing comments, whitespace, and shortening variable names.",
        metaTitle: "JavaScript Minifier - Compress JS Online | Free Tool",
        metaDescription:
          "Free online JavaScript minifier. Compress JS files to reduce load times. Remove comments, whitespace, and optimize code for production.",
        keywords: [
          "javascript minifier",
          "js minifier",
          "compress javascript",
          "minify js",
          "javascript compressor",
        ],
        benefits: [
          "Faster page load times",
          "Reduced bandwidth usage",
          "Improved Core Web Vitals",
          "Better SEO scores",
        ],
        useCases: [
          "Production deployment",
          "Website optimization",
          "Bundle size reduction",
          "Performance tuning",
        ],
      },
      ko: {
        title: "JavaScript 압축기",
        description:
          "주석, 공백을 제거하고 변수명을 축약하여 JavaScript 코드를 압축합니다.",
        metaTitle: "JavaScript 압축기 - 온라인 JS 압축 | 무료 도구",
        metaDescription:
          "무료 온라인 JavaScript 압축기. JS 파일을 압축하여 로딩 시간을 단축합니다. 프로덕션용 코드 최적화에 효과적입니다.",
        keywords: [
          "javascript 압축",
          "js 압축기",
          "자바스크립트 압축",
          "js 최소화",
          "javascript 최적화",
        ],
        benefits: [
          "페이지 로딩 속도 향상",
          "대역폭 사용량 감소",
          "Core Web Vitals 개선",
          "SEO 점수 향상",
        ],
        useCases: [
          "프로덕션 배포",
          "웹사이트 최적화",
          "번들 크기 감소",
          "성능 튜닝",
        ],
      },
      ja: {
        title: "JavaScript圧縮ツール",
        description:
          "コメント、空白を削除し、変数名を短縮してJavaScriptコードを圧縮します。",
        metaTitle: "JavaScript圧縮ツール - オンラインでJS圧縮 | 無料ツール",
        metaDescription:
          "無料のオンラインJavaScript圧縮ツール。JSファイルを圧縮してロード時間を短縮。本番環境向けのコード最適化に効果的です。",
        keywords: [
          "javascript 圧縮",
          "js 圧縮",
          "ジャバスクリプト 圧縮",
          "js 最小化",
          "javascript 最適化",
        ],
        benefits: [
          "ページロード時間の短縮",
          "帯域幅使用量の削減",
          "Core Web Vitalsの改善",
          "SEOスコアの向上",
        ],
        useCases: [
          "本番デプロイ",
          "ウェブサイト最適化",
          "バンドルサイズの削減",
          "パフォーマンスチューニング",
        ],
      },
    },
  },
  css: {
    slug: "css",
    name: "CSS",
    fileExtension: ".css",
    mimeType: "text/css",
    category: "code",
    content: {
      en: {
        title: "CSS Minifier",
        description:
          "Minify CSS stylesheets by removing comments, whitespace, and optimizing selectors.",
        metaTitle: "CSS Minifier - Compress CSS Online | Free Tool",
        metaDescription:
          "Free online CSS minifier. Compress CSS files to improve page speed. Remove comments, whitespace, and optimize stylesheets for production.",
        keywords: [
          "css minifier",
          "compress css",
          "css compressor",
          "minify css online",
          "css optimization",
        ],
        benefits: [
          "Faster stylesheet loading",
          "Reduced file size",
          "Improved render times",
          "Better performance scores",
        ],
        useCases: [
          "Production CSS optimization",
          "Critical CSS extraction",
          "Style bundle compression",
          "Web performance optimization",
        ],
      },
      ko: {
        title: "CSS 압축기",
        description:
          "주석, 공백을 제거하고 선택자를 최적화하여 CSS 스타일시트를 압축합니다.",
        metaTitle: "CSS 압축기 - 온라인 CSS 압축 | 무료 도구",
        metaDescription:
          "무료 온라인 CSS 압축기. CSS 파일을 압축하여 페이지 속도를 향상시킵니다. 프로덕션용 스타일시트 최적화에 효과적입니다.",
        keywords: [
          "css 압축",
          "css 압축기",
          "css 최소화",
          "스타일시트 압축",
          "css 최적화",
        ],
        benefits: [
          "스타일시트 로딩 속도 향상",
          "파일 크기 감소",
          "렌더링 시간 개선",
          "성능 점수 향상",
        ],
        useCases: [
          "프로덕션 CSS 최적화",
          "크리티컬 CSS 추출",
          "스타일 번들 압축",
          "웹 성능 최적화",
        ],
      },
      ja: {
        title: "CSS圧縮ツール",
        description:
          "コメント、空白を削除し、セレクターを最適化してCSSスタイルシートを圧縮します。",
        metaTitle: "CSS圧縮ツール - オンラインでCSS圧縮 | 無料ツール",
        metaDescription:
          "無料のオンラインCSS圧縮ツール。CSSファイルを圧縮してページ速度を向上。本番環境向けのスタイルシート最適化に効果的です。",
        keywords: [
          "css 圧縮",
          "css 最小化",
          "スタイルシート 圧縮",
          "css コンプレッサー",
          "css 最適化",
        ],
        benefits: [
          "スタイルシートの高速ロード",
          "ファイルサイズの削減",
          "レンダリング時間の改善",
          "パフォーマンススコアの向上",
        ],
        useCases: [
          "本番CSS最適化",
          "クリティカルCSS抽出",
          "スタイルバンドル圧縮",
          "ウェブパフォーマンス最適化",
        ],
      },
    },
  },
  html: {
    slug: "html",
    name: "HTML",
    fileExtension: ".html",
    mimeType: "text/html",
    category: "markup",
    content: {
      en: {
        title: "HTML Minifier",
        description:
          "Minify HTML markup by removing comments, whitespace, and optional tags.",
        metaTitle: "HTML Minifier - Compress HTML Online | Free Tool",
        metaDescription:
          "Free online HTML minifier. Compress HTML files to reduce page size. Remove comments, whitespace, and optimize markup for faster loading.",
        keywords: [
          "html minifier",
          "compress html",
          "html compressor",
          "minify html online",
          "html optimization",
        ],
        benefits: [
          "Smaller page size",
          "Faster initial load",
          "Reduced server bandwidth",
          "Improved TTFB",
        ],
        useCases: [
          "Static site generation",
          "Email template optimization",
          "Landing page optimization",
          "AMP page creation",
        ],
      },
      ko: {
        title: "HTML 압축기",
        description:
          "주석, 공백, 선택적 태그를 제거하여 HTML 마크업을 압축합니다.",
        metaTitle: "HTML 압축기 - 온라인 HTML 압축 | 무료 도구",
        metaDescription:
          "무료 온라인 HTML 압축기. HTML 파일을 압축하여 페이지 크기를 줄입니다. 빠른 로딩을 위한 마크업 최적화에 효과적입니다.",
        keywords: [
          "html 압축",
          "html 압축기",
          "html 최소화",
          "마크업 압축",
          "html 최적화",
        ],
        benefits: [
          "페이지 크기 감소",
          "초기 로딩 속도 향상",
          "서버 대역폭 절감",
          "TTFB 개선",
        ],
        useCases: [
          "정적 사이트 생성",
          "이메일 템플릿 최적화",
          "랜딩 페이지 최적화",
          "AMP 페이지 생성",
        ],
      },
      ja: {
        title: "HTML圧縮ツール",
        description:
          "コメント、空白、オプションタグを削除してHTMLマークアップを圧縮します。",
        metaTitle: "HTML圧縮ツール - オンラインでHTML圧縮 | 無料ツール",
        metaDescription:
          "無料のオンラインHTML圧縮ツール。HTMLファイルを圧縮してページサイズを削減。高速ロードのためのマークアップ最適化に効果的です。",
        keywords: [
          "html 圧縮",
          "html 最小化",
          "マークアップ 圧縮",
          "html コンプレッサー",
          "html 最適化",
        ],
        benefits: [
          "ページサイズの縮小",
          "初期ロードの高速化",
          "サーバー帯域幅の削減",
          "TTFBの改善",
        ],
        useCases: [
          "静的サイト生成",
          "メールテンプレート最適化",
          "ランディングページ最適化",
          "AMPページ作成",
        ],
      },
    },
  },
  xml: {
    slug: "xml",
    name: "XML",
    fileExtension: ".xml",
    mimeType: "application/xml",
    category: "markup",
    content: {
      en: {
        title: "XML Minifier",
        description:
          "Minify XML documents by removing comments, whitespace, and unnecessary formatting.",
        metaTitle: "XML Minifier - Compress XML Online | Free Tool",
        metaDescription:
          "Free online XML minifier. Compress XML files to reduce size. Remove comments, whitespace while preserving document structure.",
        keywords: [
          "xml minifier",
          "compress xml",
          "xml compressor",
          "minify xml online",
          "xml optimization",
        ],
        benefits: [
          "Reduced XML file size",
          "Faster XML parsing",
          "Lower storage costs",
          "Optimized data exchange",
        ],
        useCases: [
          "SOAP message optimization",
          "RSS feed compression",
          "Configuration file minification",
          "XML data transfer",
        ],
      },
      ko: {
        title: "XML 압축기",
        description:
          "주석, 공백, 불필요한 포맷팅을 제거하여 XML 문서를 압축합니다.",
        metaTitle: "XML 압축기 - 온라인 XML 압축 | 무료 도구",
        metaDescription:
          "무료 온라인 XML 압축기. 문서 구조를 유지하면서 XML 파일을 압축합니다. 주석과 공백 제거로 크기를 줄입니다.",
        keywords: [
          "xml 압축",
          "xml 압축기",
          "xml 최소화",
          "xml 크기 줄이기",
          "xml 최적화",
        ],
        benefits: [
          "XML 파일 크기 감소",
          "빠른 XML 파싱",
          "저장 비용 절감",
          "데이터 교환 최적화",
        ],
        useCases: [
          "SOAP 메시지 최적화",
          "RSS 피드 압축",
          "설정 파일 압축",
          "XML 데이터 전송",
        ],
      },
      ja: {
        title: "XML圧縮ツール",
        description:
          "コメント、空白、不要なフォーマットを削除してXMLドキュメントを圧縮します。",
        metaTitle: "XML圧縮ツール - オンラインでXML圧縮 | 無料ツール",
        metaDescription:
          "無料のオンラインXML圧縮ツール。ドキュメント構造を維持しながらXMLファイルを圧縮。コメントと空白を削除してサイズを削減します。",
        keywords: [
          "xml 圧縮",
          "xml 最小化",
          "xml コンプレッサー",
          "xml サイズ縮小",
          "xml 最適化",
        ],
        benefits: [
          "XMLファイルサイズの削減",
          "高速なXMLパース",
          "ストレージコストの削減",
          "データ交換の最適化",
        ],
        useCases: [
          "SOAPメッセージ最適化",
          "RSSフィード圧縮",
          "設定ファイルの圧縮",
          "XMLデータ転送",
        ],
      },
    },
  },
  svg: {
    slug: "svg",
    name: "SVG",
    fileExtension: ".svg",
    mimeType: "image/svg+xml",
    category: "markup",
    content: {
      en: {
        title: "SVG Minifier",
        description:
          "Minify SVG graphics by removing metadata, comments, and optimizing paths.",
        metaTitle: "SVG Minifier - Compress SVG Online | Free Tool",
        metaDescription:
          "Free online SVG minifier. Compress SVG files to reduce size while maintaining quality. Remove metadata, comments, and optimize vector paths.",
        keywords: [
          "svg minifier",
          "compress svg",
          "svg optimizer",
          "minify svg online",
          "svg compression",
        ],
        benefits: [
          "Smaller SVG file size",
          "Faster icon loading",
          "Optimized vector graphics",
          "Better web performance",
        ],
        useCases: [
          "Icon optimization",
          "Logo compression",
          "Illustration optimization",
          "Web graphics",
        ],
      },
      ko: {
        title: "SVG 압축기",
        description:
          "메타데이터, 주석을 제거하고 경로를 최적화하여 SVG 그래픽을 압축합니다.",
        metaTitle: "SVG 압축기 - 온라인 SVG 압축 | 무료 도구",
        metaDescription:
          "무료 온라인 SVG 압축기. 품질을 유지하면서 SVG 파일을 압축합니다. 메타데이터, 주석 제거 및 벡터 경로 최적화.",
        keywords: [
          "svg 압축",
          "svg 압축기",
          "svg 최적화",
          "svg 크기 줄이기",
          "벡터 최적화",
        ],
        benefits: [
          "SVG 파일 크기 감소",
          "빠른 아이콘 로딩",
          "최적화된 벡터 그래픽",
          "웹 성능 향상",
        ],
        useCases: [
          "아이콘 최적화",
          "로고 압축",
          "일러스트 최적화",
          "웹 그래픽",
        ],
      },
      ja: {
        title: "SVG圧縮ツール",
        description:
          "メタデータ、コメントを削除し、パスを最適化してSVGグラフィックを圧縮します。",
        metaTitle: "SVG圧縮ツール - オンラインでSVG圧縮 | 無料ツール",
        metaDescription:
          "無料のオンラインSVG圧縮ツール。品質を維持しながらSVGファイルを圧縮。メタデータ、コメントの削除とベクターパスの最適化。",
        keywords: [
          "svg 圧縮",
          "svg 最小化",
          "svg オプティマイザー",
          "svg サイズ縮小",
          "ベクター最適化",
        ],
        benefits: [
          "SVGファイルサイズの削減",
          "高速なアイコンロード",
          "最適化されたベクターグラフィック",
          "ウェブパフォーマンスの向上",
        ],
        useCases: [
          "アイコン最適化",
          "ロゴ圧縮",
          "イラスト最適化",
          "ウェブグラフィック",
        ],
      },
    },
  },
  sql: {
    slug: "sql",
    name: "SQL",
    fileExtension: ".sql",
    mimeType: "application/sql",
    category: "code",
    content: {
      en: {
        title: "SQL Minifier",
        description:
          "Minify SQL queries by removing comments, extra whitespace, and formatting.",
        metaTitle: "SQL Minifier - Compress SQL Online | Free Tool",
        metaDescription:
          "Free online SQL minifier. Compress SQL queries to single lines. Remove comments and whitespace while preserving query logic.",
        keywords: [
          "sql minifier",
          "compress sql",
          "sql compressor",
          "minify sql online",
          "sql optimization",
        ],
        benefits: [
          "Compact SQL queries",
          "Reduced query payload",
          "Easier query logging",
          "Optimized storage",
        ],
        useCases: [
          "Query optimization",
          "Log file reduction",
          "API payload compression",
          "Database script packaging",
        ],
      },
      ko: {
        title: "SQL 압축기",
        description:
          "주석, 추가 공백, 포맷팅을 제거하여 SQL 쿼리를 압축합니다.",
        metaTitle: "SQL 압축기 - 온라인 SQL 압축 | 무료 도구",
        metaDescription:
          "무료 온라인 SQL 압축기. SQL 쿼리를 한 줄로 압축합니다. 쿼리 로직을 유지하면서 주석과 공백을 제거합니다.",
        keywords: [
          "sql 압축",
          "sql 압축기",
          "sql 최소화",
          "쿼리 압축",
          "sql 최적화",
        ],
        benefits: [
          "컴팩트한 SQL 쿼리",
          "쿼리 페이로드 감소",
          "쿼리 로깅 간소화",
          "저장소 최적화",
        ],
        useCases: [
          "쿼리 최적화",
          "로그 파일 크기 감소",
          "API 페이로드 압축",
          "데이터베이스 스크립트 패키징",
        ],
      },
      ja: {
        title: "SQL圧縮ツール",
        description:
          "コメント、余分な空白、フォーマットを削除してSQLクエリを圧縮します。",
        metaTitle: "SQL圧縮ツール - オンラインでSQL圧縮 | 無料ツール",
        metaDescription:
          "無料のオンラインSQL圧縮ツール。SQLクエリを1行に圧縮。クエリロジックを維持しながらコメントと空白を削除します。",
        keywords: [
          "sql 圧縮",
          "sql 最小化",
          "sql コンプレッサー",
          "クエリ 圧縮",
          "sql 最適化",
        ],
        benefits: [
          "コンパクトなSQLクエリ",
          "クエリペイロードの削減",
          "クエリロギングの簡素化",
          "ストレージの最適化",
        ],
        useCases: [
          "クエリ最適化",
          "ログファイルサイズ削減",
          "APIペイロード圧縮",
          "データベーススクリプトパッケージング",
        ],
      },
    },
  },
};

// Helper functions
export function getMinifyTypeBySlug(slug: string): MinifyType | undefined {
  return minifyTypeRegistry[slug as MinifyTypeSlug];
}

export function getAllMinifyTypeSlugs(): MinifyTypeSlug[] {
  return Object.keys(minifyTypeRegistry) as MinifyTypeSlug[];
}

export function getMinifyTypesByCategory(
  category: MinifyType["category"],
): MinifyType[] {
  return Object.values(minifyTypeRegistry).filter(
    (type) => type.category === category,
  );
}

export function getRelatedMinifyTypes(
  currentSlug: MinifyTypeSlug,
  limit: number = 4,
): MinifyType[] {
  const current = minifyTypeRegistry[currentSlug];
  if (!current) return [];

  const sameCategory = Object.values(minifyTypeRegistry).filter(
    (type) => type.category === current.category && type.slug !== currentSlug,
  );

  const otherCategory = Object.values(minifyTypeRegistry).filter(
    (type) => type.category !== current.category,
  );

  return [...sameCategory, ...otherCategory].slice(0, limit);
}
