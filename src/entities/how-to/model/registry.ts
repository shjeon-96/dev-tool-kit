import type { HowToGuide, HowToActionSlug } from "./types";

export const howToGuides: Record<HowToActionSlug, HowToGuide> = {
  // ============================================================
  // JSON 관련 (8)
  // ============================================================

  "convert-json-to-yaml": {
    slug: "convert-json-to-yaml",
    action: "convert JSON to YAML",
    category: "json",
    title: {
      en: "How to Convert JSON to YAML Online",
      ko: "JSON을 YAML로 변환하는 방법",
      ja: "JSONをYAMLに変換する方法",
    },
    description: {
      en: "Learn how to convert JSON data to YAML format instantly using our free online converter. No installation required.",
      ko: "무료 온라인 변환기를 사용하여 JSON 데이터를 YAML 형식으로 즉시 변환하는 방법을 알아보세요.",
      ja: "無料のオンラインコンバーターを使用して、JSONデータをYAML形式に即座に変換する方法を学びます。",
    },
    steps: {
      en: [
        "Open the JSON to YAML converter tool",
        "Paste your JSON data in the input field",
        "The YAML output will be generated automatically",
        "Copy the result or download as a file",
      ],
      ko: [
        "JSON to YAML 변환 도구를 엽니다",
        "입력 필드에 JSON 데이터를 붙여넣습니다",
        "YAML 출력이 자동으로 생성됩니다",
        "결과를 복사하거나 파일로 다운로드합니다",
      ],
      ja: [
        "JSON to YAML変換ツールを開きます",
        "入力フィールドにJSONデータを貼り付けます",
        "YAML出力が自動的に生成されます",
        "結果をコピーするか、ファイルとしてダウンロードします",
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "how to convert json to yaml",
      "json to yaml online",
      "json yaml converter",
    ],
    searchVolume: 8100,
  },

  "convert-json-to-xml": {
    slug: "convert-json-to-xml",
    action: "convert JSON to XML",
    category: "json",
    title: {
      en: "How to Convert JSON to XML Online",
      ko: "JSON을 XML로 변환하는 방법",
      ja: "JSONをXMLに変換する方法",
    },
    description: {
      en: "Convert JSON data to XML format easily with our free online tool. Perfect for API integration and data transformation.",
      ko: "무료 온라인 도구로 JSON 데이터를 XML 형식으로 쉽게 변환하세요. API 통합과 데이터 변환에 적합합니다.",
      ja: "無料のオンラインツールでJSONデータをXML形式に簡単に変換できます。API統合やデータ変換に最適です。",
    },
    steps: {
      en: [
        "Open the JSON to XML converter",
        "Enter or paste your JSON data",
        "View the XML output in real-time",
        "Copy or export the converted XML",
      ],
      ko: [
        "JSON to XML 변환기를 엽니다",
        "JSON 데이터를 입력하거나 붙여넣습니다",
        "실시간으로 XML 출력을 확인합니다",
        "변환된 XML을 복사하거나 내보냅니다",
      ],
      ja: [
        "JSON to XMLコンバーターを開きます",
        "JSONデータを入力または貼り付けます",
        "XML出力をリアルタイムで確認します",
        "変換されたXMLをコピーまたはエクスポートします",
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "how to convert json to xml",
      "json to xml online",
      "json xml converter",
    ],
    searchVolume: 5400,
  },

  "convert-json-to-csv": {
    slug: "convert-json-to-csv",
    action: "convert JSON to CSV",
    category: "json",
    title: {
      en: "How to Convert JSON to CSV Online",
      ko: "JSON을 CSV로 변환하는 방법",
      ja: "JSONをCSVに変換する方法",
    },
    description: {
      en: "Transform JSON arrays to CSV spreadsheet format. Ideal for exporting data to Excel or Google Sheets.",
      ko: "JSON 배열을 CSV 스프레드시트 형식으로 변환합니다. Excel이나 Google 시트로 데이터 내보내기에 적합합니다.",
      ja: "JSON配列をCSVスプレッドシート形式に変換します。ExcelやGoogleスプレッドシートへのデータエクスポートに最適です。",
    },
    steps: {
      en: [
        "Open the JSON to CSV converter",
        "Paste your JSON array data",
        "Configure column mappings if needed",
        "Download the CSV file",
      ],
      ko: [
        "JSON to CSV 변환기를 엽니다",
        "JSON 배열 데이터를 붙여넣습니다",
        "필요시 열 매핑을 설정합니다",
        "CSV 파일을 다운로드합니다",
      ],
      ja: [
        "JSON to CSVコンバーターを開きます",
        "JSON配列データを貼り付けます",
        "必要に応じて列マッピングを設定します",
        "CSVファイルをダウンロードします",
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "how to convert json to csv",
      "json to csv online",
      "json to excel",
    ],
    searchVolume: 6700,
  },

  "format-json-online": {
    slug: "format-json-online",
    action: "format JSON online",
    category: "json",
    title: {
      en: "How to Format JSON Online",
      ko: "JSON 온라인 포맷팅 방법",
      ja: "JSONをオンラインでフォーマットする方法",
    },
    description: {
      en: "Beautify and format messy JSON data with proper indentation. Makes JSON readable and easier to debug.",
      ko: "지저분한 JSON 데이터를 적절한 들여쓰기로 정리합니다. JSON을 읽기 쉽게 만들고 디버깅이 용이해집니다.",
      ja: "乱雑なJSONデータを適切なインデントで整形します。JSONを読みやすくし、デバッグを容易にします。",
    },
    steps: {
      en: [
        "Open the JSON Formatter tool",
        "Paste your unformatted JSON",
        "Choose indentation level (2 or 4 spaces)",
        "Copy the formatted output",
      ],
      ko: [
        "JSON 포맷터 도구를 엽니다",
        "포맷되지 않은 JSON을 붙여넣습니다",
        "들여쓰기 수준을 선택합니다 (2 또는 4 스페이스)",
        "포맷된 출력을 복사합니다",
      ],
      ja: [
        "JSONフォーマッターツールを開きます",
        "未フォーマットのJSONを貼り付けます",
        "インデントレベルを選択します（2または4スペース）",
        "フォーマットされた出力をコピーします",
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "how to format json",
      "json formatter online",
      "beautify json",
      "pretty print json",
    ],
    searchVolume: 12000,
  },

  "validate-json-syntax": {
    slug: "validate-json-syntax",
    action: "validate JSON syntax",
    category: "json",
    title: {
      en: "How to Validate JSON Syntax Online",
      ko: "JSON 구문 유효성 검사 방법",
      ja: "JSONの構文を検証する方法",
    },
    description: {
      en: "Check if your JSON is valid and find syntax errors instantly. Get detailed error messages with line numbers.",
      ko: "JSON이 유효한지 확인하고 구문 오류를 즉시 찾습니다. 줄 번호와 함께 상세한 오류 메시지를 받습니다.",
      ja: "JSONが有効かどうかを確認し、構文エラーを即座に見つけます。行番号付きの詳細なエラーメッセージが表示されます。",
    },
    steps: {
      en: [
        "Open the JSON Validator",
        "Paste your JSON data",
        "Check the validation result",
        "Fix any errors shown with line numbers",
      ],
      ko: [
        "JSON 검증기를 엽니다",
        "JSON 데이터를 붙여넣습니다",
        "유효성 검사 결과를 확인합니다",
        "줄 번호와 함께 표시된 오류를 수정합니다",
      ],
      ja: [
        "JSONバリデーターを開きます",
        "JSONデータを貼り付けます",
        "検証結果を確認します",
        "行番号付きで表示されたエラーを修正します",
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "how to validate json",
      "json validator online",
      "check json syntax",
    ],
    searchVolume: 9200,
  },

  "minify-json-data": {
    slug: "minify-json-data",
    action: "minify JSON data",
    category: "json",
    title: {
      en: "How to Minify JSON Online",
      ko: "JSON 압축(Minify) 방법",
      ja: "JSONを圧縮する方法",
    },
    description: {
      en: "Compress JSON by removing whitespace and reducing file size. Perfect for API responses and storage optimization.",
      ko: "공백을 제거하여 JSON을 압축하고 파일 크기를 줄입니다. API 응답과 저장 공간 최적화에 적합합니다.",
      ja: "空白を削除してJSONを圧縮し、ファイルサイズを削減します。APIレスポンスやストレージ最適化に最適です。",
    },
    steps: {
      en: [
        "Open the JSON Minifier",
        "Paste your formatted JSON",
        "Click Minify to compress",
        "Copy the minified output",
      ],
      ko: [
        "JSON 압축기를 엽니다",
        "포맷된 JSON을 붙여넣습니다",
        "압축 버튼을 클릭합니다",
        "압축된 출력을 복사합니다",
      ],
      ja: [
        "JSONミニファイヤーを開きます",
        "フォーマットされたJSONを貼り付けます",
        "圧縮をクリックします",
        "圧縮された出力をコピーします",
      ],
    },
    relatedTool: "json-formatter",
    keywords: ["how to minify json", "json minifier online", "compress json"],
    searchVolume: 4300,
  },

  "convert-json-to-typescript": {
    slug: "convert-json-to-typescript",
    action: "convert JSON to TypeScript",
    category: "json",
    title: {
      en: "How to Convert JSON to TypeScript Types",
      ko: "JSON을 TypeScript 타입으로 변환하는 방법",
      ja: "JSONをTypeScript型に変換する方法",
    },
    description: {
      en: "Generate TypeScript interfaces from JSON data automatically. Save time on type definitions for API responses.",
      ko: "JSON 데이터에서 TypeScript 인터페이스를 자동으로 생성합니다. API 응답의 타입 정의 시간을 절약합니다.",
      ja: "JSONデータからTypeScriptインターフェースを自動生成します。APIレスポンスの型定義の時間を節約します。",
    },
    steps: {
      en: [
        "Open the JSON to TypeScript converter",
        "Paste sample JSON data",
        "Review the generated TypeScript interfaces",
        "Copy and use in your project",
      ],
      ko: [
        "JSON to TypeScript 변환기를 엽니다",
        "샘플 JSON 데이터를 붙여넣습니다",
        "생성된 TypeScript 인터페이스를 검토합니다",
        "프로젝트에 복사하여 사용합니다",
      ],
      ja: [
        "JSON to TypeScriptコンバーターを開きます",
        "サンプルJSONデータを貼り付けます",
        "生成されたTypeScriptインターフェースを確認します",
        "プロジェクトにコピーして使用します",
      ],
    },
    relatedTool: "json-to-typescript",
    keywords: [
      "how to convert json to typescript",
      "json to typescript online",
      "generate typescript types",
    ],
    searchVolume: 7800,
  },

  "prettify-json-code": {
    slug: "prettify-json-code",
    action: "prettify JSON code",
    category: "json",
    title: {
      en: "How to Prettify JSON Code",
      ko: "JSON 코드 정리하는 방법",
      ja: "JSONコードを整形する方法",
    },
    description: {
      en: "Make JSON code beautiful and readable with proper formatting. Supports syntax highlighting and tree view.",
      ko: "적절한 포맷팅으로 JSON 코드를 보기 좋고 읽기 쉽게 만듭니다. 구문 강조와 트리 뷰를 지원합니다.",
      ja: "適切なフォーマットでJSONコードを美しく読みやすくします。構文ハイライトとツリービューをサポートします。",
    },
    steps: {
      en: [
        "Open the JSON Prettifier",
        "Paste your JSON code",
        "Select formatting options",
        "View the beautified result",
      ],
      ko: [
        "JSON 정리 도구를 엽니다",
        "JSON 코드를 붙여넣습니다",
        "포맷팅 옵션을 선택합니다",
        "정리된 결과를 확인합니다",
      ],
      ja: [
        "JSON整形ツールを開きます",
        "JSONコードを貼り付けます",
        "フォーマットオプションを選択します",
        "整形された結果を確認します",
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "how to prettify json",
      "json prettifier online",
      "beautify json code",
    ],
    searchVolume: 3600,
  },

  // ============================================================
  // 인코딩 관련 (6)
  // ============================================================

  "encode-base64-string": {
    slug: "encode-base64-string",
    action: "encode Base64 string",
    category: "encoding",
    title: {
      en: "How to Encode Text to Base64 Online",
      ko: "텍스트를 Base64로 인코딩하는 방법",
      ja: "テキストをBase64にエンコードする方法",
    },
    description: {
      en: "Convert any text or file to Base64 encoding instantly. Perfect for data embedding and API payloads.",
      ko: "모든 텍스트나 파일을 Base64 인코딩으로 즉시 변환합니다. 데이터 임베딩과 API 페이로드에 적합합니다.",
      ja: "任意のテキストやファイルをBase64エンコーディングに即座に変換します。データ埋め込みやAPIペイロードに最適です。",
    },
    steps: {
      en: [
        "Open the Base64 Encoder",
        "Enter your text or upload a file",
        "Click Encode to convert",
        "Copy the Base64 output",
      ],
      ko: [
        "Base64 인코더를 엽니다",
        "텍스트를 입력하거나 파일을 업로드합니다",
        "인코딩 버튼을 클릭합니다",
        "Base64 출력을 복사합니다",
      ],
      ja: [
        "Base64エンコーダーを開きます",
        "テキストを入力するかファイルをアップロードします",
        "エンコードをクリックします",
        "Base64出力をコピーします",
      ],
    },
    relatedTool: "base64-converter",
    keywords: [
      "how to encode base64",
      "base64 encoder online",
      "text to base64",
    ],
    searchVolume: 8900,
  },

  "decode-base64-online": {
    slug: "decode-base64-online",
    action: "decode Base64 online",
    category: "encoding",
    title: {
      en: "How to Decode Base64 Online",
      ko: "Base64 디코딩 방법",
      ja: "Base64をデコードする方法",
    },
    description: {
      en: "Decode Base64 strings back to original text or binary data. Supports URL-safe Base64 and file download.",
      ko: "Base64 문자열을 원본 텍스트나 바이너리 데이터로 디코딩합니다. URL-safe Base64와 파일 다운로드를 지원합니다.",
      ja: "Base64文字列を元のテキストまたはバイナリデータにデコードします。URL-safe Base64とファイルダウンロードをサポートします。",
    },
    steps: {
      en: [
        "Open the Base64 Decoder",
        "Paste your Base64 string",
        "Click Decode to convert",
        "View or download the result",
      ],
      ko: [
        "Base64 디코더를 엽니다",
        "Base64 문자열을 붙여넣습니다",
        "디코딩 버튼을 클릭합니다",
        "결과를 확인하거나 다운로드합니다",
      ],
      ja: [
        "Base64デコーダーを開きます",
        "Base64文字列を貼り付けます",
        "デコードをクリックします",
        "結果を表示またはダウンロードします",
      ],
    },
    relatedTool: "base64-converter",
    keywords: [
      "how to decode base64",
      "base64 decoder online",
      "base64 to text",
    ],
    searchVolume: 11000,
  },

  "encode-url-parameters": {
    slug: "encode-url-parameters",
    action: "encode URL parameters",
    category: "encoding",
    title: {
      en: "How to URL Encode Parameters",
      ko: "URL 파라미터 인코딩 방법",
      ja: "URLパラメータをエンコードする方法",
    },
    description: {
      en: "Encode special characters in URL parameters to make them safe for web requests. Essential for API development.",
      ko: "URL 파라미터의 특수 문자를 인코딩하여 웹 요청에 안전하게 만듭니다. API 개발에 필수적입니다.",
      ja: "URLパラメータの特殊文字をエンコードして、Webリクエストで安全に使用できるようにします。API開発に不可欠です。",
    },
    steps: {
      en: [
        "Open the URL Encoder",
        "Enter your text or URL parameters",
        "View the encoded output",
        "Copy and use in your URLs",
      ],
      ko: [
        "URL 인코더를 엽니다",
        "텍스트나 URL 파라미터를 입력합니다",
        "인코딩된 출력을 확인합니다",
        "URL에 복사하여 사용합니다",
      ],
      ja: [
        "URLエンコーダーを開きます",
        "テキストまたはURLパラメータを入力します",
        "エンコードされた出力を確認します",
        "URLにコピーして使用します",
      ],
    },
    relatedTool: "url-encoder",
    keywords: [
      "how to url encode",
      "url encoder online",
      "encode url parameters",
    ],
    searchVolume: 6200,
  },

  "decode-url-string": {
    slug: "decode-url-string",
    action: "decode URL string",
    category: "encoding",
    title: {
      en: "How to Decode URL Strings",
      ko: "URL 문자열 디코딩 방법",
      ja: "URL文字列をデコードする方法",
    },
    description: {
      en: "Convert percent-encoded URL strings back to readable text. Useful for debugging and analysis.",
      ko: "퍼센트 인코딩된 URL 문자열을 읽을 수 있는 텍스트로 변환합니다. 디버깅과 분석에 유용합니다.",
      ja: "パーセントエンコードされたURL文字列を読み取り可能なテキストに変換します。デバッグや分析に便利です。",
    },
    steps: {
      en: [
        "Open the URL Decoder",
        "Paste your encoded URL",
        "View the decoded text",
        "Copy the readable result",
      ],
      ko: [
        "URL 디코더를 엽니다",
        "인코딩된 URL을 붙여넣습니다",
        "디코딩된 텍스트를 확인합니다",
        "읽을 수 있는 결과를 복사합니다",
      ],
      ja: [
        "URLデコーダーを開きます",
        "エンコードされたURLを貼り付けます",
        "デコードされたテキストを確認します",
        "読み取り可能な結果をコピーします",
      ],
    },
    relatedTool: "url-encoder",
    keywords: [
      "how to decode url",
      "url decoder online",
      "decode percent encoding",
    ],
    searchVolume: 5100,
  },

  "convert-text-to-hex": {
    slug: "convert-text-to-hex",
    action: "convert text to hex",
    category: "encoding",
    title: {
      en: "How to Convert Text to Hexadecimal",
      ko: "텍스트를 16진수로 변환하는 방법",
      ja: "テキストを16進数に変換する方法",
    },
    description: {
      en: "Convert any text string to hexadecimal representation. Useful for debugging and low-level programming.",
      ko: "모든 텍스트 문자열을 16진수로 변환합니다. 디버깅과 저수준 프로그래밍에 유용합니다.",
      ja: "任意のテキスト文字列を16進数表現に変換します。デバッグや低レベルプログラミングに便利です。",
    },
    steps: {
      en: [
        "Open the Hex Converter",
        "Enter your text",
        "Select Text to Hex mode",
        "Copy the hex output",
      ],
      ko: [
        "16진수 변환기를 엽니다",
        "텍스트를 입력합니다",
        "텍스트 → 16진수 모드를 선택합니다",
        "16진수 출력을 복사합니다",
      ],
      ja: [
        "16進コンバーターを開きます",
        "テキストを入力します",
        "テキスト → 16進モードを選択します",
        "16進出力をコピーします",
      ],
    },
    relatedTool: "base-converter",
    keywords: [
      "how to convert text to hex",
      "text to hex online",
      "hex encoder",
    ],
    searchVolume: 3400,
  },

  "convert-hex-to-text": {
    slug: "convert-hex-to-text",
    action: "convert hex to text",
    category: "encoding",
    title: {
      en: "How to Convert Hexadecimal to Text",
      ko: "16진수를 텍스트로 변환하는 방법",
      ja: "16進数をテキストに変換する方法",
    },
    description: {
      en: "Decode hexadecimal strings back to readable text. Perfect for analyzing hex dumps and encoded data.",
      ko: "16진수 문자열을 읽을 수 있는 텍스트로 디코딩합니다. 헥스 덤프와 인코딩된 데이터 분석에 적합합니다.",
      ja: "16進数文字列を読み取り可能なテキストにデコードします。16進ダンプやエンコードデータの分析に最適です。",
    },
    steps: {
      en: [
        "Open the Hex Converter",
        "Paste your hex string",
        "Select Hex to Text mode",
        "View the decoded text",
      ],
      ko: [
        "16진수 변환기를 엽니다",
        "16진수 문자열을 붙여넣습니다",
        "16진수 → 텍스트 모드를 선택합니다",
        "디코딩된 텍스트를 확인합니다",
      ],
      ja: [
        "16進コンバーターを開きます",
        "16進文字列を貼り付けます",
        "16進 → テキストモードを選択します",
        "デコードされたテキストを確認します",
      ],
    },
    relatedTool: "base-converter",
    keywords: [
      "how to convert hex to text",
      "hex to text online",
      "hex decoder",
    ],
    searchVolume: 4200,
  },

  // ============================================================
  // 해시/보안 관련 (4)
  // ============================================================

  "generate-md5-hash": {
    slug: "generate-md5-hash",
    action: "generate MD5 hash",
    category: "security",
    title: {
      en: "How to Generate MD5 Hash Online",
      ko: "MD5 해시 생성 방법",
      ja: "MD5ハッシュを生成する方法",
    },
    description: {
      en: "Create MD5 hash from any text string. Useful for checksums and data integrity verification.",
      ko: "모든 텍스트 문자열에서 MD5 해시를 생성합니다. 체크섬과 데이터 무결성 검증에 유용합니다.",
      ja: "任意のテキスト文字列からMD5ハッシュを作成します。チェックサムやデータ整合性の検証に便利です。",
    },
    steps: {
      en: [
        "Open the Hash Generator",
        "Enter your text",
        "Select MD5 algorithm",
        "Copy the generated hash",
      ],
      ko: [
        "해시 생성기를 엽니다",
        "텍스트를 입력합니다",
        "MD5 알고리즘을 선택합니다",
        "생성된 해시를 복사합니다",
      ],
      ja: [
        "ハッシュジェネレーターを開きます",
        "テキストを入力します",
        "MD5アルゴリズムを選択します",
        "生成されたハッシュをコピーします",
      ],
    },
    relatedTool: "hash-generator",
    keywords: [
      "how to generate md5 hash",
      "md5 hash generator online",
      "md5 checksum",
    ],
    searchVolume: 7600,
  },

  "generate-sha256-hash": {
    slug: "generate-sha256-hash",
    action: "generate SHA-256 hash",
    category: "security",
    title: {
      en: "How to Generate SHA-256 Hash Online",
      ko: "SHA-256 해시 생성 방법",
      ja: "SHA-256ハッシュを生成する方法",
    },
    description: {
      en: "Create secure SHA-256 hash from text. Industry standard for password hashing and data security.",
      ko: "텍스트에서 안전한 SHA-256 해시를 생성합니다. 비밀번호 해싱과 데이터 보안의 업계 표준입니다.",
      ja: "テキストから安全なSHA-256ハッシュを作成します。パスワードハッシュやデータセキュリティの業界標準です。",
    },
    steps: {
      en: [
        "Open the Hash Generator",
        "Enter your text",
        "Select SHA-256 algorithm",
        "Copy the secure hash",
      ],
      ko: [
        "해시 생성기를 엽니다",
        "텍스트를 입력합니다",
        "SHA-256 알고리즘을 선택합니다",
        "안전한 해시를 복사합니다",
      ],
      ja: [
        "ハッシュジェネレーターを開きます",
        "テキストを入力します",
        "SHA-256アルゴリズムを選択します",
        "安全なハッシュをコピーします",
      ],
    },
    relatedTool: "hash-generator",
    keywords: [
      "how to generate sha256 hash",
      "sha256 hash generator online",
      "sha256 checksum",
    ],
    searchVolume: 5900,
  },

  "decode-jwt-token": {
    slug: "decode-jwt-token",
    action: "decode JWT token",
    category: "security",
    title: {
      en: "How to Decode JWT Token Online",
      ko: "JWT 토큰 디코딩 방법",
      ja: "JWTトークンをデコードする方法",
    },
    description: {
      en: "Decode and inspect JWT tokens to see header, payload, and signature. Essential for debugging authentication.",
      ko: "JWT 토큰을 디코딩하여 헤더, 페이로드, 서명을 확인합니다. 인증 디버깅에 필수적입니다.",
      ja: "JWTトークンをデコードしてヘッダー、ペイロード、署名を確認します。認証のデバッグに不可欠です。",
    },
    steps: {
      en: [
        "Open the JWT Decoder",
        "Paste your JWT token",
        "View the decoded header and payload",
        "Check expiration and claims",
      ],
      ko: [
        "JWT 디코더를 엽니다",
        "JWT 토큰을 붙여넣습니다",
        "디코딩된 헤더와 페이로드를 확인합니다",
        "만료 시간과 클레임을 확인합니다",
      ],
      ja: [
        "JWTデコーダーを開きます",
        "JWTトークンを貼り付けます",
        "デコードされたヘッダーとペイロードを確認します",
        "有効期限とクレームを確認します",
      ],
    },
    relatedTool: "jwt-decoder",
    keywords: [
      "how to decode jwt token",
      "jwt decoder online",
      "jwt token viewer",
    ],
    searchVolume: 9800,
  },

  "generate-uuid-online": {
    slug: "generate-uuid-online",
    action: "generate UUID online",
    category: "security",
    title: {
      en: "How to Generate UUID Online",
      ko: "UUID 생성 방법",
      ja: "UUIDを生成する方法",
    },
    description: {
      en: "Generate unique UUID v4 identifiers instantly. Perfect for database IDs and unique identifiers.",
      ko: "고유한 UUID v4 식별자를 즉시 생성합니다. 데이터베이스 ID와 고유 식별자에 적합합니다.",
      ja: "一意のUUID v4識別子を即座に生成します。データベースIDや一意識別子に最適です。",
    },
    steps: {
      en: [
        "Open the UUID Generator",
        "Click Generate to create new UUID",
        "Generate multiple UUIDs if needed",
        "Copy the generated UUID(s)",
      ],
      ko: [
        "UUID 생성기를 엽니다",
        "생성 버튼을 클릭하여 새 UUID를 만듭니다",
        "필요시 여러 UUID를 생성합니다",
        "생성된 UUID를 복사합니다",
      ],
      ja: [
        "UUIDジェネレーターを開きます",
        "生成をクリックして新しいUUIDを作成します",
        "必要に応じて複数のUUIDを生成します",
        "生成されたUUIDをコピーします",
      ],
    },
    relatedTool: "uuid-generator",
    keywords: [
      "how to generate uuid",
      "uuid generator online",
      "uuid v4 generator",
    ],
    searchVolume: 8400,
  },

  // ============================================================
  // 이미지 관련 (6)
  // ============================================================

  "resize-image-online": {
    slug: "resize-image-online",
    action: "resize image online",
    category: "image",
    title: {
      en: "How to Resize Image Online",
      ko: "온라인으로 이미지 크기 조정하는 방법",
      ja: "オンラインで画像をリサイズする方法",
    },
    description: {
      en: "Resize any image to specific dimensions. Client-side processing ensures your images stay private.",
      ko: "모든 이미지를 특정 크기로 조정합니다. 클라이언트 측 처리로 이미지 프라이버시가 보장됩니다.",
      ja: "任意の画像を特定のサイズにリサイズします。クライアント側処理で画像のプライバシーが保証されます。",
    },
    steps: {
      en: [
        "Open the Image Resizer",
        "Upload or drag your image",
        "Enter target dimensions",
        "Download the resized image",
      ],
      ko: [
        "이미지 리사이저를 엽니다",
        "이미지를 업로드하거나 드래그합니다",
        "목표 크기를 입력합니다",
        "크기 조정된 이미지를 다운로드합니다",
      ],
      ja: [
        "画像リサイザーを開きます",
        "画像をアップロードまたはドラッグします",
        "目標サイズを入力します",
        "リサイズされた画像をダウンロードします",
      ],
    },
    relatedTool: "image-resizer",
    keywords: [
      "how to resize image online",
      "image resizer online",
      "resize photo",
    ],
    searchVolume: 14500,
  },

  "convert-png-to-webp": {
    slug: "convert-png-to-webp",
    action: "convert PNG to WebP",
    category: "image",
    title: {
      en: "How to Convert PNG to WebP",
      ko: "PNG를 WebP로 변환하는 방법",
      ja: "PNGをWebPに変換する方法",
    },
    description: {
      en: "Convert PNG images to WebP format for better web performance. Smaller file size with same quality.",
      ko: "웹 성능 향상을 위해 PNG 이미지를 WebP 형식으로 변환합니다. 같은 품질에서 더 작은 파일 크기.",
      ja: "Webパフォーマンス向上のためにPNG画像をWebP形式に変換します。同じ品質でより小さいファイルサイズ。",
    },
    steps: {
      en: [
        "Open the Image Converter",
        "Upload your PNG file",
        "Select WebP as output format",
        "Download the converted image",
      ],
      ko: [
        "이미지 변환기를 엽니다",
        "PNG 파일을 업로드합니다",
        "출력 형식으로 WebP를 선택합니다",
        "변환된 이미지를 다운로드합니다",
      ],
      ja: [
        "画像コンバーターを開きます",
        "PNGファイルをアップロードします",
        "出力形式としてWebPを選択します",
        "変換された画像をダウンロードします",
      ],
    },
    relatedTool: "image-converter",
    keywords: [
      "how to convert png to webp",
      "png to webp online",
      "png to webp converter",
    ],
    searchVolume: 6800,
  },

  "convert-jpg-to-png": {
    slug: "convert-jpg-to-png",
    action: "convert JPG to PNG",
    category: "image",
    title: {
      en: "How to Convert JPG to PNG",
      ko: "JPG를 PNG로 변환하는 방법",
      ja: "JPGをPNGに変換する方法",
    },
    description: {
      en: "Convert JPEG images to PNG format with transparency support. Perfect for logos and graphics.",
      ko: "JPEG 이미지를 투명도를 지원하는 PNG 형식으로 변환합니다. 로고와 그래픽에 적합합니다.",
      ja: "JPEG画像を透明度サポート付きPNG形式に変換します。ロゴやグラフィックに最適です。",
    },
    steps: {
      en: [
        "Open the Image Converter",
        "Upload your JPG file",
        "Select PNG as output format",
        "Download the converted image",
      ],
      ko: [
        "이미지 변환기를 엽니다",
        "JPG 파일을 업로드합니다",
        "출력 형식으로 PNG를 선택합니다",
        "변환된 이미지를 다운로드합니다",
      ],
      ja: [
        "画像コンバーターを開きます",
        "JPGファイルをアップロードします",
        "出力形式としてPNGを選択します",
        "変換された画像をダウンロードします",
      ],
    },
    relatedTool: "image-converter",
    keywords: [
      "how to convert jpg to png",
      "jpg to png online",
      "jpeg to png converter",
    ],
    searchVolume: 9200,
  },

  "remove-image-background": {
    slug: "remove-image-background",
    action: "remove image background",
    category: "image",
    title: {
      en: "How to Remove Image Background Online",
      ko: "온라인으로 이미지 배경 제거하는 방법",
      ja: "オンラインで画像の背景を削除する方法",
    },
    description: {
      en: "Remove background from any image using AI. 100% client-side processing for privacy.",
      ko: "AI를 사용하여 모든 이미지에서 배경을 제거합니다. 프라이버시를 위한 100% 클라이언트 측 처리.",
      ja: "AIを使用して任意の画像から背景を削除します。プライバシーのための100%クライアント側処理。",
    },
    steps: {
      en: [
        "Open the Background Remover",
        "Upload your image",
        "Wait for AI processing",
        "Download the transparent image",
      ],
      ko: [
        "배경 제거 도구를 엽니다",
        "이미지를 업로드합니다",
        "AI 처리를 기다립니다",
        "투명 이미지를 다운로드합니다",
      ],
      ja: [
        "背景削除ツールを開きます",
        "画像をアップロードします",
        "AI処理を待ちます",
        "透明画像をダウンロードします",
      ],
    },
    relatedTool: "bg-remover",
    keywords: [
      "how to remove background from image",
      "remove bg online",
      "background remover",
    ],
    searchVolume: 22000,
  },

  "generate-qr-code": {
    slug: "generate-qr-code",
    action: "generate QR code",
    category: "image",
    title: {
      en: "How to Generate QR Code Online",
      ko: "QR 코드 생성 방법",
      ja: "QRコードを生成する方法",
    },
    description: {
      en: "Create QR codes for URLs, text, WiFi, and more. Customize colors and download in various formats.",
      ko: "URL, 텍스트, WiFi 등을 위한 QR 코드를 생성합니다. 색상을 사용자 정의하고 다양한 형식으로 다운로드합니다.",
      ja: "URL、テキスト、WiFiなどのQRコードを作成します。色をカスタマイズし、さまざまな形式でダウンロードできます。",
    },
    steps: {
      en: [
        "Open the QR Generator",
        "Enter your URL or text",
        "Customize colors and size",
        "Download the QR code",
      ],
      ko: [
        "QR 생성기를 엽니다",
        "URL이나 텍스트를 입력합니다",
        "색상과 크기를 사용자 정의합니다",
        "QR 코드를 다운로드합니다",
      ],
      ja: [
        "QRジェネレーターを開きます",
        "URLまたはテキストを入力します",
        "色とサイズをカスタマイズします",
        "QRコードをダウンロードします",
      ],
    },
    relatedTool: "qr-generator",
    keywords: [
      "how to generate qr code",
      "qr code generator online",
      "create qr code",
    ],
    searchVolume: 18500,
  },

  "compress-image-online": {
    slug: "compress-image-online",
    action: "compress image online",
    category: "image",
    title: {
      en: "How to Compress Image Online",
      ko: "온라인으로 이미지 압축하는 방법",
      ja: "オンラインで画像を圧縮する方法",
    },
    description: {
      en: "Reduce image file size while maintaining quality. Perfect for web optimization and faster loading.",
      ko: "품질을 유지하면서 이미지 파일 크기를 줄입니다. 웹 최적화와 빠른 로딩에 적합합니다.",
      ja: "品質を維持しながら画像ファイルサイズを削減します。Web最適化と高速ロードに最適です。",
    },
    steps: {
      en: [
        "Open the Image Compressor",
        "Upload your image",
        "Adjust compression level",
        "Download the compressed image",
      ],
      ko: [
        "이미지 압축기를 엽니다",
        "이미지를 업로드합니다",
        "압축 수준을 조정합니다",
        "압축된 이미지를 다운로드합니다",
      ],
      ja: [
        "画像コンプレッサーを開きます",
        "画像をアップロードします",
        "圧縮レベルを調整します",
        "圧縮された画像をダウンロードします",
      ],
    },
    relatedTool: "image-resizer",
    keywords: [
      "how to compress image",
      "image compressor online",
      "reduce image size",
    ],
    searchVolume: 16000,
  },

  // ============================================================
  // 코드 관련 (6)
  // ============================================================

  "format-sql-query": {
    slug: "format-sql-query",
    action: "format SQL query",
    category: "code",
    title: {
      en: "How to Format SQL Query Online",
      ko: "SQL 쿼리 포맷팅 방법",
      ja: "SQLクエリをフォーマットする方法",
    },
    description: {
      en: "Beautify and format SQL queries with proper indentation. Supports multiple SQL dialects.",
      ko: "적절한 들여쓰기로 SQL 쿼리를 정리합니다. 여러 SQL 방언을 지원합니다.",
      ja: "適切なインデントでSQLクエリを整形します。複数のSQL方言をサポートします。",
    },
    steps: {
      en: [
        "Open the SQL Formatter",
        "Paste your SQL query",
        "Select SQL dialect if needed",
        "Copy the formatted query",
      ],
      ko: [
        "SQL 포맷터를 엽니다",
        "SQL 쿼리를 붙여넣습니다",
        "필요시 SQL 방언을 선택합니다",
        "포맷된 쿼리를 복사합니다",
      ],
      ja: [
        "SQLフォーマッターを開きます",
        "SQLクエリを貼り付けます",
        "必要に応じてSQL方言を選択します",
        "フォーマットされたクエリをコピーします",
      ],
    },
    relatedTool: "sql-formatter",
    keywords: [
      "how to format sql query",
      "sql formatter online",
      "beautify sql",
    ],
    searchVolume: 8700,
  },

  "test-regex-pattern": {
    slug: "test-regex-pattern",
    action: "test regex pattern",
    category: "code",
    title: {
      en: "How to Test Regex Pattern Online",
      ko: "정규식 패턴 테스트 방법",
      ja: "正規表現パターンをテストする方法",
    },
    description: {
      en: "Test and debug regular expressions with real-time matching. See highlighted matches and groups.",
      ko: "실시간 매칭으로 정규 표현식을 테스트하고 디버깅합니다. 강조된 일치 항목과 그룹을 확인합니다.",
      ja: "リアルタイムマッチングで正規表現をテスト・デバッグします。ハイライトされたマッチとグループを確認できます。",
    },
    steps: {
      en: [
        "Open the Regex Tester",
        "Enter your regex pattern",
        "Paste test text",
        "View matches and groups",
      ],
      ko: [
        "정규식 테스터를 엽니다",
        "정규식 패턴을 입력합니다",
        "테스트 텍스트를 붙여넣습니다",
        "일치 항목과 그룹을 확인합니다",
      ],
      ja: [
        "正規表現テスターを開きます",
        "正規表現パターンを入力します",
        "テストテキストを貼り付けます",
        "マッチとグループを確認します",
      ],
    },
    relatedTool: "regex-tester",
    keywords: [
      "how to test regex",
      "regex tester online",
      "regular expression tester",
    ],
    searchVolume: 11000,
  },

  "convert-css-to-tailwind": {
    slug: "convert-css-to-tailwind",
    action: "convert CSS to Tailwind",
    category: "code",
    title: {
      en: "How to Convert CSS to Tailwind",
      ko: "CSS를 Tailwind로 변환하는 방법",
      ja: "CSSをTailwindに変換する方法",
    },
    description: {
      en: "Convert traditional CSS to Tailwind CSS utility classes. Speed up your migration to Tailwind.",
      ko: "전통적인 CSS를 Tailwind CSS 유틸리티 클래스로 변환합니다. Tailwind 마이그레이션을 가속화합니다.",
      ja: "従来のCSSをTailwind CSSユーティリティクラスに変換します。Tailwindへの移行を加速します。",
    },
    steps: {
      en: [
        "Open the CSS to Tailwind converter",
        "Paste your CSS code",
        "Review the Tailwind classes",
        "Copy and use in your project",
      ],
      ko: [
        "CSS to Tailwind 변환기를 엽니다",
        "CSS 코드를 붙여넣습니다",
        "Tailwind 클래스를 검토합니다",
        "프로젝트에 복사하여 사용합니다",
      ],
      ja: [
        "CSS to Tailwindコンバーターを開きます",
        "CSSコードを貼り付けます",
        "Tailwindクラスを確認します",
        "プロジェクトにコピーして使用します",
      ],
    },
    relatedTool: "css-to-tailwind",
    keywords: [
      "how to convert css to tailwind",
      "css to tailwind online",
      "tailwind converter",
    ],
    searchVolume: 4600,
  },

  "minify-css-code": {
    slug: "minify-css-code",
    action: "minify CSS code",
    category: "code",
    title: {
      en: "How to Minify CSS Code Online",
      ko: "CSS 코드 압축 방법",
      ja: "CSSコードを圧縮する方法",
    },
    description: {
      en: "Compress CSS by removing whitespace and comments. Reduce file size for faster page loading.",
      ko: "공백과 주석을 제거하여 CSS를 압축합니다. 빠른 페이지 로딩을 위해 파일 크기를 줄입니다.",
      ja: "空白とコメントを削除してCSSを圧縮します。高速なページ読み込みのためにファイルサイズを削減します。",
    },
    steps: {
      en: [
        "Open the CSS Minifier",
        "Paste your CSS code",
        "Click Minify to compress",
        "Copy the minified CSS",
      ],
      ko: [
        "CSS 압축기를 엽니다",
        "CSS 코드를 붙여넣습니다",
        "압축 버튼을 클릭합니다",
        "압축된 CSS를 복사합니다",
      ],
      ja: [
        "CSSミニファイヤーを開きます",
        "CSSコードを貼り付けます",
        "圧縮をクリックします",
        "圧縮されたCSSをコピーします",
      ],
    },
    relatedTool: "css-minifier",
    keywords: ["how to minify css", "css minifier online", "compress css"],
    searchVolume: 5100,
  },

  "format-markdown-text": {
    slug: "format-markdown-text",
    action: "format Markdown text",
    category: "code",
    title: {
      en: "How to Format Markdown Text",
      ko: "Markdown 텍스트 포맷팅 방법",
      ja: "Markdownテキストをフォーマットする方法",
    },
    description: {
      en: "Preview and format Markdown with live rendering. See your Markdown as it will appear.",
      ko: "실시간 렌더링으로 Markdown을 미리보고 포맷합니다. Markdown이 어떻게 보일지 확인합니다.",
      ja: "ライブレンダリングでMarkdownをプレビュー・フォーマットします。Markdownがどのように表示されるかを確認できます。",
    },
    steps: {
      en: [
        "Open the Markdown Preview",
        "Type or paste Markdown text",
        "View the live preview",
        "Copy or export the formatted content",
      ],
      ko: [
        "Markdown 미리보기를 엽니다",
        "Markdown 텍스트를 입력하거나 붙여넣습니다",
        "실시간 미리보기를 확인합니다",
        "포맷된 콘텐츠를 복사하거나 내보냅니다",
      ],
      ja: [
        "Markdownプレビューを開きます",
        "Markdownテキストを入力または貼り付けます",
        "ライブプレビューを確認します",
        "フォーマットされたコンテンツをコピーまたはエクスポートします",
      ],
    },
    relatedTool: "markdown-preview",
    keywords: [
      "how to format markdown",
      "markdown preview online",
      "markdown editor",
    ],
    searchVolume: 3800,
  },

  "generate-cron-expression": {
    slug: "generate-cron-expression",
    action: "generate cron expression",
    category: "code",
    title: {
      en: "How to Generate Cron Expression",
      ko: "Cron 표현식 생성 방법",
      ja: "Cron式を生成する方法",
    },
    description: {
      en: "Create and validate cron expressions with a visual builder. See next execution times.",
      ko: "비주얼 빌더로 cron 표현식을 생성하고 검증합니다. 다음 실행 시간을 확인합니다.",
      ja: "ビジュアルビルダーでCron式を作成・検証します。次の実行時間を確認できます。",
    },
    steps: {
      en: [
        "Open the Cron Parser",
        "Use the visual builder or enter expression",
        "View next execution times",
        "Copy the cron expression",
      ],
      ko: [
        "Cron 파서를 엽니다",
        "비주얼 빌더를 사용하거나 표현식을 입력합니다",
        "다음 실행 시간을 확인합니다",
        "cron 표현식을 복사합니다",
      ],
      ja: [
        "Cronパーサーを開きます",
        "ビジュアルビルダーを使用するか式を入力します",
        "次の実行時間を確認します",
        "Cron式をコピーします",
      ],
    },
    relatedTool: "cron-parser",
    keywords: [
      "how to generate cron expression",
      "cron generator online",
      "cron expression builder",
    ],
    searchVolume: 7200,
  },

  // ============================================================
  // SEO 관련 (4)
  // ============================================================

  "generate-meta-tags": {
    slug: "generate-meta-tags",
    action: "generate meta tags",
    category: "seo",
    title: {
      en: "How to Generate Meta Tags for SEO",
      ko: "SEO용 메타 태그 생성 방법",
      ja: "SEO用メタタグを生成する方法",
    },
    description: {
      en: "Create optimized meta tags for better search engine rankings. Includes Open Graph and Twitter cards.",
      ko: "검색 엔진 순위 향상을 위한 최적화된 메타 태그를 생성합니다. Open Graph와 Twitter 카드를 포함합니다.",
      ja: "検索エンジンランキング向上のための最適化されたメタタグを作成します。Open GraphとTwitterカードを含みます。",
    },
    steps: {
      en: [
        "Open the Meta Tag Generator",
        "Enter page title and description",
        "Configure OG and Twitter tags",
        "Copy the generated HTML",
      ],
      ko: [
        "메타 태그 생성기를 엽니다",
        "페이지 제목과 설명을 입력합니다",
        "OG와 Twitter 태그를 설정합니다",
        "생성된 HTML을 복사합니다",
      ],
      ja: [
        "メタタグジェネレーターを開きます",
        "ページタイトルと説明を入力します",
        "OGとTwitterタグを設定します",
        "生成されたHTMLをコピーします",
      ],
    },
    relatedTool: "meta-generator",
    keywords: [
      "how to generate meta tags",
      "meta tag generator online",
      "seo meta tags",
    ],
    searchVolume: 6500,
  },

  "create-schema-markup": {
    slug: "create-schema-markup",
    action: "create schema markup",
    category: "seo",
    title: {
      en: "How to Create Schema Markup for SEO",
      ko: "SEO용 스키마 마크업 생성 방법",
      ja: "SEO用スキーママークアップを作成する方法",
    },
    description: {
      en: "Generate structured data markup for rich search results. Supports Article, Product, FAQ, and more.",
      ko: "리치 검색 결과를 위한 구조화된 데이터 마크업을 생성합니다. Article, Product, FAQ 등을 지원합니다.",
      ja: "リッチ検索結果のための構造化データマークアップを生成します。Article、Product、FAQなどをサポートします。",
    },
    steps: {
      en: [
        "Open the Schema Generator",
        "Select schema type",
        "Fill in required fields",
        "Copy the JSON-LD code",
      ],
      ko: [
        "스키마 생성기를 엽니다",
        "스키마 유형을 선택합니다",
        "필수 필드를 채웁니다",
        "JSON-LD 코드를 복사합니다",
      ],
      ja: [
        "スキーマジェネレーターを開きます",
        "スキーマタイプを選択します",
        "必須フィールドを入力します",
        "JSON-LDコードをコピーします",
      ],
    },
    relatedTool: "schema-generator",
    keywords: [
      "how to create schema markup",
      "schema generator online",
      "json-ld generator",
    ],
    searchVolume: 5400,
  },

  "generate-sitemap-xml": {
    slug: "generate-sitemap-xml",
    action: "generate sitemap XML",
    category: "seo",
    title: {
      en: "How to Generate XML Sitemap",
      ko: "XML 사이트맵 생성 방법",
      ja: "XMLサイトマップを生成する方法",
    },
    description: {
      en: "Create XML sitemaps for better search engine crawling. Add URLs with priority and change frequency.",
      ko: "검색 엔진 크롤링 개선을 위한 XML 사이트맵을 생성합니다. 우선순위와 변경 빈도와 함께 URL을 추가합니다.",
      ja: "検索エンジンのクロール改善のためにXMLサイトマップを作成します。優先度と更新頻度とともにURLを追加します。",
    },
    steps: {
      en: [
        "Open the Sitemap Generator",
        "Add your URLs",
        "Set priority and frequency",
        "Download the sitemap.xml",
      ],
      ko: [
        "사이트맵 생성기를 엽니다",
        "URL을 추가합니다",
        "우선순위와 빈도를 설정합니다",
        "sitemap.xml을 다운로드합니다",
      ],
      ja: [
        "サイトマップジェネレーターを開きます",
        "URLを追加します",
        "優先度と頻度を設定します",
        "sitemap.xmlをダウンロードします",
      ],
    },
    relatedTool: "sitemap-generator",
    keywords: [
      "how to generate sitemap",
      "xml sitemap generator online",
      "create sitemap",
    ],
    searchVolume: 4800,
  },

  "preview-google-serp": {
    slug: "preview-google-serp",
    action: "preview Google SERP",
    category: "seo",
    title: {
      en: "How to Preview Google Search Results",
      ko: "Google 검색 결과 미리보기 방법",
      ja: "Google検索結果をプレビューする方法",
    },
    description: {
      en: "See how your page will appear in Google search results. Optimize title and description length.",
      ko: "페이지가 Google 검색 결과에서 어떻게 표시될지 확인합니다. 제목과 설명 길이를 최적화합니다.",
      ja: "ページがGoogle検索結果でどのように表示されるかを確認します。タイトルと説明の長さを最適化します。",
    },
    steps: {
      en: [
        "Open the SERP Preview tool",
        "Enter title and description",
        "Enter your URL",
        "Check the preview and optimize",
      ],
      ko: [
        "SERP 미리보기 도구를 엽니다",
        "제목과 설명을 입력합니다",
        "URL을 입력합니다",
        "미리보기를 확인하고 최적화합니다",
      ],
      ja: [
        "SERPプレビューツールを開きます",
        "タイトルと説明を入力します",
        "URLを入力します",
        "プレビューを確認して最適化します",
      ],
    },
    relatedTool: "serp-preview",
    keywords: [
      "how to preview google serp",
      "serp preview tool online",
      "google snippet preview",
    ],
    searchVolume: 3200,
  },

  // ============================================================
  // 유틸리티 (6)
  // ============================================================

  "parse-url-components": {
    slug: "parse-url-components",
    action: "parse URL components",
    category: "utility",
    title: {
      en: "How to Parse URL Components",
      ko: "URL 구성 요소 파싱 방법",
      ja: "URLコンポーネントを解析する方法",
    },
    description: {
      en: "Break down URLs into protocol, host, path, query parameters, and fragment. Debug API endpoints.",
      ko: "URL을 프로토콜, 호스트, 경로, 쿼리 파라미터, 프래그먼트로 분해합니다. API 엔드포인트를 디버깅합니다.",
      ja: "URLをプロトコル、ホスト、パス、クエリパラメータ、フラグメントに分解します。APIエンドポイントをデバッグします。",
    },
    steps: {
      en: [
        "Open the URL Parser",
        "Enter your URL",
        "View parsed components",
        "Edit and rebuild if needed",
      ],
      ko: [
        "URL 파서를 엽니다",
        "URL을 입력합니다",
        "파싱된 구성 요소를 확인합니다",
        "필요시 편집하고 재구성합니다",
      ],
      ja: [
        "URLパーサーを開きます",
        "URLを入力します",
        "解析されたコンポーネントを確認します",
        "必要に応じて編集して再構成します",
      ],
    },
    relatedTool: "url-parser",
    keywords: ["how to parse url", "url parser online", "url decoder online"],
    searchVolume: 2900,
  },

  "convert-unix-timestamp": {
    slug: "convert-unix-timestamp",
    action: "convert Unix timestamp",
    category: "utility",
    title: {
      en: "How to Convert Unix Timestamp",
      ko: "Unix 타임스탬프 변환 방법",
      ja: "Unixタイムスタンプを変換する方法",
    },
    description: {
      en: "Convert Unix timestamps to human-readable dates and vice versa. Supports multiple time zones.",
      ko: "Unix 타임스탬프를 읽을 수 있는 날짜로 변환하거나 그 반대로 변환합니다. 여러 시간대를 지원합니다.",
      ja: "Unixタイムスタンプを読みやすい日付に変換、またはその逆を行います。複数のタイムゾーンをサポートします。",
    },
    steps: {
      en: [
        "Open the Unix Timestamp tool",
        "Enter timestamp or date",
        "Select your time zone",
        "Copy the converted result",
      ],
      ko: [
        "Unix 타임스탬프 도구를 엽니다",
        "타임스탬프나 날짜를 입력합니다",
        "시간대를 선택합니다",
        "변환된 결과를 복사합니다",
      ],
      ja: [
        "Unixタイムスタンプツールを開きます",
        "タイムスタンプまたは日付を入力します",
        "タイムゾーンを選択します",
        "変換された結果をコピーします",
      ],
    },
    relatedTool: "unix-timestamp",
    keywords: [
      "how to convert unix timestamp",
      "unix timestamp converter online",
      "epoch converter",
    ],
    searchVolume: 7800,
  },

  "extract-text-from-image": {
    slug: "extract-text-from-image",
    action: "extract text from image",
    category: "utility",
    title: {
      en: "How to Extract Text from Image (OCR)",
      ko: "이미지에서 텍스트 추출하는 방법 (OCR)",
      ja: "画像からテキストを抽出する方法（OCR）",
    },
    description: {
      en: "Use OCR to extract text from images. Supports multiple languages including Korean and Japanese.",
      ko: "OCR을 사용하여 이미지에서 텍스트를 추출합니다. 한국어와 일본어를 포함한 여러 언어를 지원합니다.",
      ja: "OCRを使用して画像からテキストを抽出します。韓国語と日本語を含む複数の言語をサポートします。",
    },
    steps: {
      en: [
        "Open the OCR Scanner",
        "Upload your image",
        "Select the language",
        "Copy the extracted text",
      ],
      ko: [
        "OCR 스캐너를 엽니다",
        "이미지를 업로드합니다",
        "언어를 선택합니다",
        "추출된 텍스트를 복사합니다",
      ],
      ja: [
        "OCRスキャナーを開きます",
        "画像をアップロードします",
        "言語を選択します",
        "抽出されたテキストをコピーします",
      ],
    },
    relatedTool: "ocr-scanner",
    keywords: ["how to extract text from image", "ocr online", "image to text"],
    searchVolume: 12500,
  },

  "generate-lorem-ipsum": {
    slug: "generate-lorem-ipsum",
    action: "generate Lorem Ipsum",
    category: "utility",
    title: {
      en: "How to Generate Lorem Ipsum Text",
      ko: "Lorem Ipsum 텍스트 생성 방법",
      ja: "Lorem Ipsumテキストを生成する方法",
    },
    description: {
      en: "Generate placeholder text for designs and mockups. Customize paragraphs, sentences, and words.",
      ko: "디자인과 목업을 위한 플레이스홀더 텍스트를 생성합니다. 단락, 문장, 단어를 사용자 정의합니다.",
      ja: "デザインやモックアップ用のプレースホルダーテキストを生成します。段落、文、単語をカスタマイズできます。",
    },
    steps: {
      en: [
        "Open the Lorem Generator",
        "Select text type and amount",
        "Generate the placeholder text",
        "Copy and use in your project",
      ],
      ko: [
        "Lorem 생성기를 엽니다",
        "텍스트 유형과 양을 선택합니다",
        "플레이스홀더 텍스트를 생성합니다",
        "프로젝트에 복사하여 사용합니다",
      ],
      ja: [
        "Loremジェネレーターを開きます",
        "テキストタイプと量を選択します",
        "プレースホルダーテキストを生成します",
        "プロジェクトにコピーして使用します",
      ],
    },
    relatedTool: "lorem-generator",
    keywords: [
      "how to generate lorem ipsum",
      "lorem ipsum generator online",
      "placeholder text generator",
    ],
    searchVolume: 5600,
  },

  "compare-text-diff": {
    slug: "compare-text-diff",
    action: "compare text diff",
    category: "utility",
    title: {
      en: "How to Compare Text and Find Differences",
      ko: "텍스트 비교 및 차이점 찾는 방법",
      ja: "テキストを比較して違いを見つける方法",
    },
    description: {
      en: "Compare two texts and highlight differences. Perfect for code review and document comparison.",
      ko: "두 텍스트를 비교하고 차이점을 강조합니다. 코드 리뷰와 문서 비교에 적합합니다.",
      ja: "2つのテキストを比較して違いをハイライトします。コードレビューやドキュメント比較に最適です。",
    },
    steps: {
      en: [
        "Open the Diff Checker",
        "Paste original text in left panel",
        "Paste modified text in right panel",
        "View highlighted differences",
      ],
      ko: [
        "Diff 검사기를 엽니다",
        "왼쪽 패널에 원본 텍스트를 붙여넣습니다",
        "오른쪽 패널에 수정된 텍스트를 붙여넣습니다",
        "강조된 차이점을 확인합니다",
      ],
      ja: [
        "Diffチェッカーを開きます",
        "左パネルに元のテキストを貼り付けます",
        "右パネルに変更されたテキストを貼り付けます",
        "ハイライトされた違いを確認します",
      ],
    },
    relatedTool: "diff-checker",
    keywords: [
      "how to compare text",
      "diff checker online",
      "compare text files",
    ],
    searchVolume: 8200,
  },

  "generate-app-icons": {
    slug: "generate-app-icons",
    action: "generate app icons",
    category: "utility",
    title: {
      en: "How to Generate App Icons for All Platforms",
      ko: "모든 플랫폼용 앱 아이콘 생성 방법",
      ja: "全プラットフォーム用アプリアイコンを生成する方法",
    },
    description: {
      en: "Generate app icons in all required sizes for iOS, Android, and web. Upload once, download all.",
      ko: "iOS, Android, 웹에 필요한 모든 크기의 앱 아이콘을 생성합니다. 한 번 업로드하면 모두 다운로드.",
      ja: "iOS、Android、Web用の必要なすべてのサイズのアプリアイコンを生成します。一度アップロードすれば全てダウンロード。",
    },
    steps: {
      en: [
        "Open the App Icon Generator",
        "Upload your icon image (1024x1024)",
        "Select target platforms",
        "Download the icon pack",
      ],
      ko: [
        "앱 아이콘 생성기를 엽니다",
        "아이콘 이미지(1024x1024)를 업로드합니다",
        "대상 플랫폼을 선택합니다",
        "아이콘 팩을 다운로드합니다",
      ],
      ja: [
        "アプリアイコンジェネレーターを開きます",
        "アイコン画像（1024x1024）をアップロードします",
        "ターゲットプラットフォームを選択します",
        "アイコンパックをダウンロードします",
      ],
    },
    relatedTool: "app-icon-generator",
    keywords: [
      "how to generate app icons",
      "app icon generator online",
      "ios android icon generator",
    ],
    searchVolume: 4100,
  },
};

// Helper functions
export function getHowToGuide(slug: HowToActionSlug): HowToGuide | undefined {
  return howToGuides[slug];
}

export function getAllHowToSlugs(): HowToActionSlug[] {
  return Object.keys(howToGuides) as HowToActionSlug[];
}

export function getHowToGuidesByCategory(
  category: HowToGuide["category"],
): HowToGuide[] {
  return Object.values(howToGuides).filter(
    (guide) => guide.category === category,
  );
}
