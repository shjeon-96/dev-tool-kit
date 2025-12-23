import type { ValidateType, ValidateTypeSlug } from "./types";

export const validateTypeRegistry: Record<ValidateTypeSlug, ValidateType> = {
  json: {
    slug: "json",
    name: "JSON",
    category: "data",
    content: {
      en: {
        title: "JSON Validator",
        description:
          "Validate JSON syntax and structure. Check for parsing errors, missing brackets, and invalid formatting.",
        metaTitle: "JSON Validator - Check JSON Syntax Online | Free Tool",
        metaDescription:
          "Free online JSON validator. Check JSON syntax, find parsing errors, and validate JSON structure instantly. Developer-friendly JSON linter.",
        keywords: [
          "json validator",
          "json syntax checker",
          "json linter",
          "validate json online",
          "json parser",
        ],
        validationRules: [
          "Valid JSON syntax",
          "Proper bracket matching",
          "Correct string escaping",
          "Valid data types",
        ],
        useCases: [
          "API response validation",
          "Configuration file checking",
          "Data interchange verification",
          "Debug JSON parsing errors",
        ],
      },
      ko: {
        title: "JSON 검증기",
        description:
          "JSON 구문과 구조를 검증합니다. 파싱 오류, 누락된 괄호, 잘못된 포맷팅을 확인합니다.",
        metaTitle: "JSON 검증기 - 온라인 JSON 구문 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 JSON 검증기. JSON 구문을 확인하고 파싱 오류를 찾아 JSON 구조를 즉시 검증합니다.",
        keywords: [
          "json 검증",
          "json 구문 검사",
          "json 린터",
          "온라인 json 검증",
          "json 파서",
        ],
        validationRules: [
          "유효한 JSON 구문",
          "올바른 괄호 매칭",
          "정확한 문자열 이스케이프",
          "유효한 데이터 타입",
        ],
        useCases: [
          "API 응답 검증",
          "설정 파일 확인",
          "데이터 교환 검증",
          "JSON 파싱 오류 디버그",
        ],
      },
      ja: {
        title: "JSONバリデーター",
        description:
          "JSON構文と構造を検証します。パースエラー、括弧の不一致、無効なフォーマットをチェックします。",
        metaTitle:
          "JSONバリデーター - オンラインでJSON構文チェック | 無料ツール",
        metaDescription:
          "無料のオンラインJSONバリデーター。JSON構文をチェックし、パースエラーを見つけ、JSON構造を即座に検証します。",
        keywords: [
          "json 検証",
          "json 構文チェック",
          "json リンター",
          "オンライン json 検証",
          "json パーサー",
        ],
        validationRules: [
          "有効なJSON構文",
          "正しい括弧のマッチング",
          "正確な文字列エスケープ",
          "有効なデータ型",
        ],
        useCases: [
          "APIレスポンス検証",
          "設定ファイルチェック",
          "データ交換検証",
          "JSONパースエラーのデバッグ",
        ],
      },
    },
  },
  xml: {
    slug: "xml",
    name: "XML",
    category: "markup",
    content: {
      en: {
        title: "XML Validator",
        description:
          "Validate XML documents for well-formedness. Check tag matching, attribute syntax, and proper nesting.",
        metaTitle: "XML Validator - Check XML Syntax Online | Free Tool",
        metaDescription:
          "Free online XML validator. Check XML well-formedness, validate tag structure, and find syntax errors instantly.",
        keywords: [
          "xml validator",
          "xml syntax checker",
          "xml linter",
          "validate xml online",
          "xml well-formed",
        ],
        validationRules: [
          "Well-formed XML structure",
          "Proper tag matching",
          "Valid attribute syntax",
          "Correct encoding declaration",
        ],
        useCases: [
          "SOAP message validation",
          "Configuration file verification",
          "RSS/Atom feed checking",
          "XML data validation",
        ],
      },
      ko: {
        title: "XML 검증기",
        description:
          "XML 문서의 적합성을 검증합니다. 태그 매칭, 속성 구문, 올바른 중첩을 확인합니다.",
        metaTitle: "XML 검증기 - 온라인 XML 구문 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 XML 검증기. XML 적합성을 확인하고 태그 구조를 검증하며 구문 오류를 즉시 찾습니다.",
        keywords: [
          "xml 검증",
          "xml 구문 검사",
          "xml 린터",
          "온라인 xml 검증",
          "xml 적합성",
        ],
        validationRules: [
          "적합한 XML 구조",
          "올바른 태그 매칭",
          "유효한 속성 구문",
          "정확한 인코딩 선언",
        ],
        useCases: [
          "SOAP 메시지 검증",
          "설정 파일 확인",
          "RSS/Atom 피드 확인",
          "XML 데이터 검증",
        ],
      },
      ja: {
        title: "XMLバリデーター",
        description:
          "XMLドキュメントの整形式を検証します。タグのマッチング、属性構文、正しい入れ子をチェックします。",
        metaTitle: "XMLバリデーター - オンラインでXML構文チェック | 無料ツール",
        metaDescription:
          "無料のオンラインXMLバリデーター。XMLの整形式をチェックし、タグ構造を検証し、構文エラーを即座に見つけます。",
        keywords: [
          "xml 検証",
          "xml 構文チェック",
          "xml リンター",
          "オンライン xml 検証",
          "xml 整形式",
        ],
        validationRules: [
          "整形式なXML構造",
          "正しいタグマッチング",
          "有効な属性構文",
          "正確なエンコーディング宣言",
        ],
        useCases: [
          "SOAPメッセージ検証",
          "設定ファイル確認",
          "RSS/Atomフィードチェック",
          "XMLデータ検証",
        ],
      },
    },
  },
  yaml: {
    slug: "yaml",
    name: "YAML",
    category: "data",
    content: {
      en: {
        title: "YAML Validator",
        description:
          "Validate YAML syntax and indentation. Check for parsing errors and proper document structure.",
        metaTitle: "YAML Validator - Check YAML Syntax Online | Free Tool",
        metaDescription:
          "Free online YAML validator. Check YAML syntax, validate indentation, and find parsing errors instantly. Perfect for config files.",
        keywords: [
          "yaml validator",
          "yaml syntax checker",
          "yaml linter",
          "validate yaml online",
          "yaml parser",
        ],
        validationRules: [
          "Valid YAML syntax",
          "Consistent indentation",
          "Proper key-value pairs",
          "Correct document structure",
        ],
        useCases: [
          "Docker Compose validation",
          "Kubernetes config checking",
          "CI/CD pipeline verification",
          "Application config validation",
        ],
      },
      ko: {
        title: "YAML 검증기",
        description:
          "YAML 구문과 들여쓰기를 검증합니다. 파싱 오류와 적절한 문서 구조를 확인합니다.",
        metaTitle: "YAML 검증기 - 온라인 YAML 구문 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 YAML 검증기. YAML 구문을 확인하고 들여쓰기를 검증하며 파싱 오류를 즉시 찾습니다.",
        keywords: [
          "yaml 검증",
          "yaml 구문 검사",
          "yaml 린터",
          "온라인 yaml 검증",
          "yaml 파서",
        ],
        validationRules: [
          "유효한 YAML 구문",
          "일관된 들여쓰기",
          "올바른 키-값 쌍",
          "정확한 문서 구조",
        ],
        useCases: [
          "Docker Compose 검증",
          "Kubernetes 설정 확인",
          "CI/CD 파이프라인 검증",
          "애플리케이션 설정 검증",
        ],
      },
      ja: {
        title: "YAMLバリデーター",
        description:
          "YAML構文とインデントを検証します。パースエラーと適切なドキュメント構造をチェックします。",
        metaTitle:
          "YAMLバリデーター - オンラインでYAML構文チェック | 無料ツール",
        metaDescription:
          "無料のオンラインYAMLバリデーター。YAML構文をチェックし、インデントを検証し、パースエラーを即座に見つけます。",
        keywords: [
          "yaml 検証",
          "yaml 構文チェック",
          "yaml リンター",
          "オンライン yaml 検証",
          "yaml パーサー",
        ],
        validationRules: [
          "有効なYAML構文",
          "一貫したインデント",
          "正しいキーと値のペア",
          "正確なドキュメント構造",
        ],
        useCases: [
          "Docker Compose検証",
          "Kubernetes設定チェック",
          "CI/CDパイプライン検証",
          "アプリケーション設定検証",
        ],
      },
    },
  },
  html: {
    slug: "html",
    name: "HTML",
    category: "markup",
    content: {
      en: {
        title: "HTML Validator",
        description:
          "Validate HTML markup for W3C compliance. Check tag structure, attribute validity, and accessibility.",
        metaTitle: "HTML Validator - Check HTML Syntax Online | Free Tool",
        metaDescription:
          "Free online HTML validator. Check HTML markup for errors, validate tag structure, and ensure W3C compliance.",
        keywords: [
          "html validator",
          "html syntax checker",
          "html linter",
          "validate html online",
          "w3c validator",
        ],
        validationRules: [
          "Valid HTML5 structure",
          "Proper tag nesting",
          "Valid attributes",
          "Accessibility compliance",
        ],
        useCases: [
          "Web page validation",
          "Email template checking",
          "SEO compliance",
          "Accessibility audit",
        ],
      },
      ko: {
        title: "HTML 검증기",
        description:
          "W3C 준수를 위한 HTML 마크업을 검증합니다. 태그 구조, 속성 유효성, 접근성을 확인합니다.",
        metaTitle: "HTML 검증기 - 온라인 HTML 구문 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 HTML 검증기. HTML 마크업 오류를 확인하고 태그 구조를 검증하며 W3C 준수를 보장합니다.",
        keywords: [
          "html 검증",
          "html 구문 검사",
          "html 린터",
          "온라인 html 검증",
          "w3c 검증기",
        ],
        validationRules: [
          "유효한 HTML5 구조",
          "올바른 태그 중첩",
          "유효한 속성",
          "접근성 준수",
        ],
        useCases: [
          "웹 페이지 검증",
          "이메일 템플릿 확인",
          "SEO 준수",
          "접근성 감사",
        ],
      },
      ja: {
        title: "HTMLバリデーター",
        description:
          "W3C準拠のためのHTMLマークアップを検証します。タグ構造、属性の有効性、アクセシビリティをチェックします。",
        metaTitle:
          "HTMLバリデーター - オンラインでHTML構文チェック | 無料ツール",
        metaDescription:
          "無料のオンラインHTMLバリデーター。HTMLマークアップのエラーをチェックし、タグ構造を検証し、W3C準拠を確認します。",
        keywords: [
          "html 検証",
          "html 構文チェック",
          "html リンター",
          "オンライン html 検証",
          "w3c バリデーター",
        ],
        validationRules: [
          "有効なHTML5構造",
          "正しいタグの入れ子",
          "有効な属性",
          "アクセシビリティ準拠",
        ],
        useCases: [
          "ウェブページ検証",
          "メールテンプレートチェック",
          "SEO準拠",
          "アクセシビリティ監査",
        ],
      },
    },
  },
  css: {
    slug: "css",
    name: "CSS",
    category: "markup",
    content: {
      en: {
        title: "CSS Validator",
        description:
          "Validate CSS syntax and properties. Check for parsing errors, invalid selectors, and deprecated rules.",
        metaTitle: "CSS Validator - Check CSS Syntax Online | Free Tool",
        metaDescription:
          "Free online CSS validator. Check CSS syntax, validate properties, and find styling errors instantly.",
        keywords: [
          "css validator",
          "css syntax checker",
          "css linter",
          "validate css online",
          "css parser",
        ],
        validationRules: [
          "Valid CSS syntax",
          "Valid property names",
          "Correct value types",
          "Proper selector format",
        ],
        useCases: [
          "Stylesheet validation",
          "CSS debugging",
          "Browser compatibility",
          "Code quality check",
        ],
      },
      ko: {
        title: "CSS 검증기",
        description:
          "CSS 구문과 속성을 검증합니다. 파싱 오류, 잘못된 선택자, 더 이상 사용되지 않는 규칙을 확인합니다.",
        metaTitle: "CSS 검증기 - 온라인 CSS 구문 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 CSS 검증기. CSS 구문을 확인하고 속성을 검증하며 스타일링 오류를 즉시 찾습니다.",
        keywords: [
          "css 검증",
          "css 구문 검사",
          "css 린터",
          "온라인 css 검증",
          "css 파서",
        ],
        validationRules: [
          "유효한 CSS 구문",
          "유효한 속성 이름",
          "올바른 값 유형",
          "적절한 선택자 형식",
        ],
        useCases: [
          "스타일시트 검증",
          "CSS 디버깅",
          "브라우저 호환성",
          "코드 품질 확인",
        ],
      },
      ja: {
        title: "CSSバリデーター",
        description:
          "CSS構文とプロパティを検証します。パースエラー、無効なセレクター、非推奨のルールをチェックします。",
        metaTitle: "CSSバリデーター - オンラインでCSS構文チェック | 無料ツール",
        metaDescription:
          "無料のオンラインCSSバリデーター。CSS構文をチェックし、プロパティを検証し、スタイリングエラーを即座に見つけます。",
        keywords: [
          "css 検証",
          "css 構文チェック",
          "css リンター",
          "オンライン css 検証",
          "css パーサー",
        ],
        validationRules: [
          "有効なCSS構文",
          "有効なプロパティ名",
          "正しい値の型",
          "適切なセレクター形式",
        ],
        useCases: [
          "スタイルシート検証",
          "CSSデバッグ",
          "ブラウザ互換性",
          "コード品質チェック",
        ],
      },
    },
  },
  email: {
    slug: "email",
    name: "Email",
    category: "input",
    content: {
      en: {
        title: "Email Validator",
        description:
          "Validate email address format and syntax. Check for proper structure and common typos.",
        metaTitle: "Email Validator - Check Email Format Online | Free Tool",
        metaDescription:
          "Free online email validator. Check email address format, validate syntax, and detect common typos instantly.",
        keywords: [
          "email validator",
          "email format checker",
          "validate email online",
          "email syntax checker",
          "email address validation",
        ],
        validationRules: [
          "Valid email format",
          "Proper domain structure",
          "No invalid characters",
          "Correct TLD format",
        ],
        useCases: [
          "Form input validation",
          "Email list cleaning",
          "User registration",
          "Contact form verification",
        ],
      },
      ko: {
        title: "이메일 검증기",
        description:
          "이메일 주소 형식과 구문을 검증합니다. 적절한 구조와 일반적인 오타를 확인합니다.",
        metaTitle: "이메일 검증기 - 온라인 이메일 형식 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 이메일 검증기. 이메일 주소 형식을 확인하고 구문을 검증하며 일반적인 오타를 즉시 감지합니다.",
        keywords: [
          "이메일 검증",
          "이메일 형식 검사",
          "온라인 이메일 검증",
          "이메일 구문 검사",
          "이메일 주소 검증",
        ],
        validationRules: [
          "유효한 이메일 형식",
          "적절한 도메인 구조",
          "잘못된 문자 없음",
          "올바른 TLD 형식",
        ],
        useCases: [
          "폼 입력 검증",
          "이메일 목록 정리",
          "사용자 등록",
          "문의 양식 확인",
        ],
      },
      ja: {
        title: "メールバリデーター",
        description:
          "メールアドレスの形式と構文を検証します。適切な構造と一般的なタイプミスをチェックします。",
        metaTitle:
          "メールバリデーター - オンラインでメール形式チェック | 無料ツール",
        metaDescription:
          "無料のオンラインメールバリデーター。メールアドレス形式をチェックし、構文を検証し、一般的なタイプミスを即座に検出します。",
        keywords: [
          "メール 検証",
          "メール 形式チェック",
          "オンライン メール 検証",
          "メール 構文チェック",
          "メールアドレス 検証",
        ],
        validationRules: [
          "有効なメール形式",
          "適切なドメイン構造",
          "無効な文字なし",
          "正しいTLD形式",
        ],
        useCases: [
          "フォーム入力検証",
          "メールリストクリーニング",
          "ユーザー登録",
          "お問い合わせフォーム確認",
        ],
      },
    },
  },
  url: {
    slug: "url",
    name: "URL",
    category: "input",
    content: {
      en: {
        title: "URL Validator",
        description:
          "Validate URL format and structure. Check for proper protocol, domain, and path components.",
        metaTitle: "URL Validator - Check URL Format Online | Free Tool",
        metaDescription:
          "Free online URL validator. Check URL format, validate structure, and ensure proper encoding instantly.",
        keywords: [
          "url validator",
          "url format checker",
          "validate url online",
          "url syntax checker",
          "link validator",
        ],
        validationRules: [
          "Valid URL format",
          "Proper protocol (http/https)",
          "Valid domain name",
          "Correct path encoding",
        ],
        useCases: [
          "Link validation",
          "Form input checking",
          "API endpoint verification",
          "Redirect configuration",
        ],
      },
      ko: {
        title: "URL 검증기",
        description:
          "URL 형식과 구조를 검증합니다. 적절한 프로토콜, 도메인, 경로 구성 요소를 확인합니다.",
        metaTitle: "URL 검증기 - 온라인 URL 형식 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 URL 검증기. URL 형식을 확인하고 구조를 검증하며 적절한 인코딩을 즉시 확인합니다.",
        keywords: [
          "url 검증",
          "url 형식 검사",
          "온라인 url 검증",
          "url 구문 검사",
          "링크 검증기",
        ],
        validationRules: [
          "유효한 URL 형식",
          "적절한 프로토콜 (http/https)",
          "유효한 도메인 이름",
          "올바른 경로 인코딩",
        ],
        useCases: [
          "링크 검증",
          "폼 입력 확인",
          "API 엔드포인트 검증",
          "리다이렉트 설정",
        ],
      },
      ja: {
        title: "URLバリデーター",
        description:
          "URL形式と構造を検証します。適切なプロトコル、ドメイン、パスコンポーネントをチェックします。",
        metaTitle: "URLバリデーター - オンラインでURL形式チェック | 無料ツール",
        metaDescription:
          "無料のオンラインURLバリデーター。URL形式をチェックし、構造を検証し、適切なエンコーディングを即座に確認します。",
        keywords: [
          "url 検証",
          "url 形式チェック",
          "オンライン url 検証",
          "url 構文チェック",
          "リンク バリデーター",
        ],
        validationRules: [
          "有効なURL形式",
          "適切なプロトコル (http/https)",
          "有効なドメイン名",
          "正しいパスエンコーディング",
        ],
        useCases: [
          "リンク検証",
          "フォーム入力チェック",
          "APIエンドポイント検証",
          "リダイレクト設定",
        ],
      },
    },
  },
  regex: {
    slug: "regex",
    name: "RegEx",
    category: "format",
    content: {
      en: {
        title: "RegEx Validator",
        description:
          "Validate regular expression patterns. Check syntax, test against sample strings, and debug regex issues.",
        metaTitle:
          "RegEx Validator - Check Regular Expression Online | Free Tool",
        metaDescription:
          "Free online regex validator. Check regular expression syntax, test patterns, and debug regex issues instantly.",
        keywords: [
          "regex validator",
          "regular expression checker",
          "validate regex online",
          "regex tester",
          "regex debugger",
        ],
        validationRules: [
          "Valid regex syntax",
          "Balanced parentheses",
          "Valid character classes",
          "Proper escape sequences",
        ],
        useCases: [
          "Pattern validation",
          "String matching tests",
          "Form field validation",
          "Text parsing rules",
        ],
      },
      ko: {
        title: "정규식 검증기",
        description:
          "정규식 패턴을 검증합니다. 구문을 확인하고 샘플 문자열에 대해 테스트하며 정규식 문제를 디버그합니다.",
        metaTitle: "정규식 검증기 - 온라인 정규식 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 정규식 검증기. 정규식 구문을 확인하고 패턴을 테스트하며 정규식 문제를 즉시 디버그합니다.",
        keywords: [
          "정규식 검증",
          "정규 표현식 검사",
          "온라인 정규식 검증",
          "정규식 테스터",
          "정규식 디버거",
        ],
        validationRules: [
          "유효한 정규식 구문",
          "균형 잡힌 괄호",
          "유효한 문자 클래스",
          "적절한 이스케이프 시퀀스",
        ],
        useCases: [
          "패턴 검증",
          "문자열 매칭 테스트",
          "폼 필드 검증",
          "텍스트 파싱 규칙",
        ],
      },
      ja: {
        title: "正規表現バリデーター",
        description:
          "正規表現パターンを検証します。構文をチェックし、サンプル文字列でテストし、正規表現の問題をデバッグします。",
        metaTitle:
          "正規表現バリデーター - オンラインで正規表現チェック | 無料ツール",
        metaDescription:
          "無料のオンライン正規表現バリデーター。正規表現構文をチェックし、パターンをテストし、正規表現の問題を即座にデバッグします。",
        keywords: [
          "正規表現 検証",
          "正規表現 チェック",
          "オンライン 正規表現 検証",
          "正規表現 テスター",
          "正規表現 デバッガー",
        ],
        validationRules: [
          "有効な正規表現構文",
          "バランスの取れた括弧",
          "有効な文字クラス",
          "適切なエスケープシーケンス",
        ],
        useCases: [
          "パターン検証",
          "文字列マッチングテスト",
          "フォームフィールド検証",
          "テキストパースルール",
        ],
      },
    },
  },
  "credit-card": {
    slug: "credit-card",
    name: "Credit Card",
    category: "input",
    content: {
      en: {
        title: "Credit Card Validator",
        description:
          "Validate credit card numbers using Luhn algorithm. Identify card type and check format validity.",
        metaTitle:
          "Credit Card Validator - Check Card Number Online | Free Tool",
        metaDescription:
          "Free online credit card validator. Check card number format, validate using Luhn algorithm, and identify card type.",
        keywords: [
          "credit card validator",
          "card number checker",
          "luhn algorithm",
          "validate credit card",
          "card type detector",
        ],
        validationRules: [
          "Luhn algorithm check",
          "Valid card length",
          "Recognized card issuer",
          "Correct number format",
        ],
        useCases: [
          "Payment form validation",
          "Test card verification",
          "E-commerce checkout",
          "Card type detection",
        ],
      },
      ko: {
        title: "신용카드 검증기",
        description:
          "Luhn 알고리즘을 사용하여 신용카드 번호를 검증합니다. 카드 유형을 식별하고 형식 유효성을 확인합니다.",
        metaTitle: "신용카드 검증기 - 온라인 카드번호 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 신용카드 검증기. 카드 번호 형식을 확인하고 Luhn 알고리즘으로 검증하며 카드 유형을 식별합니다.",
        keywords: [
          "신용카드 검증",
          "카드번호 검사",
          "luhn 알고리즘",
          "신용카드 확인",
          "카드 유형 감지",
        ],
        validationRules: [
          "Luhn 알고리즘 검사",
          "유효한 카드 길이",
          "인식된 카드 발급사",
          "올바른 번호 형식",
        ],
        useCases: [
          "결제 양식 검증",
          "테스트 카드 확인",
          "이커머스 결제",
          "카드 유형 감지",
        ],
      },
      ja: {
        title: "クレジットカードバリデーター",
        description:
          "Luhnアルゴリズムを使用してクレジットカード番号を検証します。カードタイプを識別し、形式の有効性をチェックします。",
        metaTitle:
          "クレジットカードバリデーター - オンラインでカード番号チェック | 無料ツール",
        metaDescription:
          "無料のオンラインクレジットカードバリデーター。カード番号形式をチェックし、Luhnアルゴリズムで検証し、カードタイプを識別します。",
        keywords: [
          "クレジットカード 検証",
          "カード番号 チェック",
          "luhn アルゴリズム",
          "クレジットカード 確認",
          "カードタイプ 検出",
        ],
        validationRules: [
          "Luhnアルゴリズムチェック",
          "有効なカード長",
          "認識されたカード発行者",
          "正しい番号形式",
        ],
        useCases: [
          "支払いフォーム検証",
          "テストカード確認",
          "Eコマースチェックアウト",
          "カードタイプ検出",
        ],
      },
    },
  },
  phone: {
    slug: "phone",
    name: "Phone Number",
    category: "input",
    content: {
      en: {
        title: "Phone Number Validator",
        description:
          "Validate phone number format for various countries. Check structure and formatting conventions.",
        metaTitle:
          "Phone Number Validator - Check Phone Format Online | Free Tool",
        metaDescription:
          "Free online phone number validator. Check phone number format, validate international numbers, and identify country codes.",
        keywords: [
          "phone validator",
          "phone number checker",
          "validate phone online",
          "international phone format",
          "phone number validation",
        ],
        validationRules: [
          "Valid phone format",
          "Country code recognition",
          "Proper digit count",
          "Format standardization",
        ],
        useCases: [
          "Contact form validation",
          "User registration",
          "SMS verification setup",
          "International dialing",
        ],
      },
      ko: {
        title: "전화번호 검증기",
        description:
          "다양한 국가의 전화번호 형식을 검증합니다. 구조와 포맷팅 규칙을 확인합니다.",
        metaTitle: "전화번호 검증기 - 온라인 전화번호 형식 검사 | 무료 도구",
        metaDescription:
          "무료 온라인 전화번호 검증기. 전화번호 형식을 확인하고 국제 번호를 검증하며 국가 코드를 식별합니다.",
        keywords: [
          "전화번호 검증",
          "전화번호 검사",
          "온라인 전화번호 검증",
          "국제 전화 형식",
          "전화번호 확인",
        ],
        validationRules: [
          "유효한 전화 형식",
          "국가 코드 인식",
          "적절한 자릿수",
          "형식 표준화",
        ],
        useCases: [
          "문의 양식 검증",
          "사용자 등록",
          "SMS 인증 설정",
          "국제 전화 걸기",
        ],
      },
      ja: {
        title: "電話番号バリデーター",
        description:
          "さまざまな国の電話番号形式を検証します。構造とフォーマット規則をチェックします。",
        metaTitle:
          "電話番号バリデーター - オンラインで電話番号形式チェック | 無料ツール",
        metaDescription:
          "無料のオンライン電話番号バリデーター。電話番号形式をチェックし、国際番号を検証し、国コードを識別します。",
        keywords: [
          "電話番号 検証",
          "電話番号 チェック",
          "オンライン 電話番号 検証",
          "国際電話 形式",
          "電話番号 確認",
        ],
        validationRules: [
          "有効な電話形式",
          "国コード認識",
          "適切な桁数",
          "形式標準化",
        ],
        useCases: [
          "お問い合わせフォーム検証",
          "ユーザー登録",
          "SMS認証設定",
          "国際電話",
        ],
      },
    },
  },
};

// Helper functions
export function getValidateTypeBySlug(slug: string): ValidateType | undefined {
  return validateTypeRegistry[slug as ValidateTypeSlug];
}

export function getAllValidateTypeSlugs(): ValidateTypeSlug[] {
  return Object.keys(validateTypeRegistry) as ValidateTypeSlug[];
}

export function getValidateTypesByCategory(
  category: ValidateType["category"],
): ValidateType[] {
  return Object.values(validateTypeRegistry).filter(
    (type) => type.category === category,
  );
}

export function getRelatedValidateTypes(
  currentSlug: ValidateTypeSlug,
  limit: number = 4,
): ValidateType[] {
  const current = validateTypeRegistry[currentSlug];
  if (!current) return [];

  const sameCategory = Object.values(validateTypeRegistry).filter(
    (type) => type.category === current.category && type.slug !== currentSlug,
  );

  const otherCategory = Object.values(validateTypeRegistry).filter(
    (type) => type.category !== current.category,
  );

  return [...sameCategory, ...otherCategory].slice(0, limit);
}
