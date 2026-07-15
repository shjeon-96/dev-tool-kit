import type { Locale } from "@/shared/config/site";
import type { ToolSlug } from "@/shared/config/tools";
import type { ToolCopy } from "@/shared/i18n/dictionaries";

type ExtraToolSlug = Exclude<
  ToolSlug,
  | "json-formatter"
  | "base64-converter"
  | "uuid-generator"
  | "timestamp-converter"
  | "url-encoder"
  | "hash-generator"
>;

interface ToolSeed {
  title: string;
  shortDescription: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
  primaryAction: string;
  secondaryAction: string;
  placeholder: string;
  guideTitle: string;
  concept: string;
  caution: string;
  question: string;
  answer: string;
}

interface CopyFrame {
  stepsTitle: string;
  enterStep: string;
  actionStep: (action: string) => string;
  reviewStep: string;
  faqTitle: string;
  privacyQuestion: string;
  privacyAnswer: string;
}

function buildToolCopy(seed: ToolSeed, frame: CopyFrame): ToolCopy {
  return {
    ...seed,
    guide: [seed.concept, seed.caution],
    stepsTitle: frame.stepsTitle,
    steps: [
      frame.enterStep,
      frame.actionStep(seed.primaryAction),
      frame.reviewStep,
    ],
    faqTitle: frame.faqTitle,
    faq: [
      { question: seed.question, answer: seed.answer },
      { question: frame.privacyQuestion, answer: frame.privacyAnswer },
    ],
  };
}

const FRAMES: Record<Locale, CopyFrame> = {
  en: {
    stepsTitle: "Field procedure",
    enterStep: "Enter or paste the source value in the workbench.",
    actionStep: (action) => `Choose ${action} and inspect the result.`,
    reviewStep: "Verify the output for your use case, then copy it.",
    faqTitle: "Common questions",
    privacyQuestion: "Does this tool upload my input?",
    privacyAnswer:
      "No. Processing uses browser APIs and the input is not sent to our server.",
  },
  ko: {
    stepsTitle: "사용 절차",
    enterStep: "작업대에 원본 값을 입력하거나 붙여넣습니다.",
    actionStep: (action) => `${action} 작업을 실행하고 결과를 확인합니다.`,
    reviewStep: "사용 목적에 맞는지 검토한 뒤 결과를 복사합니다.",
    faqTitle: "자주 묻는 질문",
    privacyQuestion: "입력값이 서버로 전송되나요?",
    privacyAnswer:
      "아니요. 브라우저 API로 처리하며 입력값을 서버로 보내지 않습니다.",
  },
  ja: {
    stepsTitle: "使用手順",
    enterStep: "ワークベンチに元の値を入力または貼り付けます。",
    actionStep: (action) => `${action}を実行して結果を確認します。`,
    reviewStep: "用途に合うか確認してから結果をコピーします。",
    faqTitle: "よくある質問",
    privacyQuestion: "入力はサーバーへ送信されますか？",
    privacyAnswer:
      "いいえ。ブラウザAPIで処理し、入力をサーバーへ送信しません。",
  },
};

const SEEDS: Record<Locale, Record<ExtraToolSlug, ToolSeed>> = {
  en: {
    "jwt-decoder": {
      title: "JWT Decoder",
      shortDescription:
        "Inspect JWT headers, payloads and expiration times locally.",
      description:
        "Decode the readable parts of a JSON Web Token without uploading credentials. Review claims, timestamps and token structure during API debugging.",
      inputLabel: "Encoded JWT",
      outputLabel: "Decoded header and payload",
      primaryAction: "Decode JWT",
      secondaryAction: "Use sample token",
      placeholder: "eyJhbGciOi...",
      guideTitle: "Reading a JSON Web Token",
      concept:
        "A JWT normally contains Base64URL-encoded header, payload and signature segments. The payload often carries claims such as issuer, subject and expiration.",
      caution:
        "Decoding is not signature verification. Never treat displayed claims as trusted until a server verifies the signature and expected algorithm.",
      question: "Can this verify a JWT signature?",
      answer:
        "No. It only decodes the header and payload for inspection; verification requires the correct key and server-side checks.",
    },
    "html-entity-converter": {
      title: "HTML Entity Encoder & Decoder",
      shortDescription:
        "Escape HTML-sensitive characters or restore entity text.",
      description:
        "Convert angle brackets, ampersands and quotes into HTML entities, or decode existing entities back to readable text.",
      inputLabel: "HTML or plain text",
      outputLabel: "Converted text",
      primaryAction: "Encode entities",
      secondaryAction: "Decode entities",
      placeholder: '<button title="Save & close">Done</button>',
      guideTitle: "Why HTML entities matter",
      concept:
        "Entities represent characters that otherwise have structural meaning in HTML. Escaping them lets code examples and literal symbols display as text.",
      caution:
        "Entity encoding alone is not a complete XSS defense. Applications must escape values for the exact HTML, attribute, URL or script context.",
      question: "Does encoding make untrusted HTML safe?",
      answer:
        "Not universally. Use framework escaping and a trusted sanitizer when rendering user-provided markup.",
    },
    "color-converter": {
      title: "HEX, RGB & HSL Color Converter",
      shortDescription: "Convert CSS colors between HEX, RGB and HSL formats.",
      description:
        "Enter a HEX or RGB color and get matching HEX, RGB and HSL values plus a live swatch for design and CSS work.",
      inputLabel: "HEX or RGB color",
      outputLabel: "Equivalent color formats",
      primaryAction: "Convert color",
      secondaryAction: "Use sample color",
      placeholder: "#ff6b35 or rgb(255, 107, 53)",
      guideTitle: "Choosing a CSS color format",
      concept:
        "HEX and RGB describe red, green and blue channels. HSL describes hue, saturation and lightness, which can be easier for systematic color adjustments.",
      caution:
        "Equivalent formats may be rounded by one unit. Always check contrast when the color is used for text, controls or status meaning.",
      question: "Does conversion change the visible color?",
      answer:
        "No. The formats describe the same sRGB color, apart from harmless rounding in HSL values.",
    },
    "regex-tester": {
      title: "Regular Expression Tester",
      shortDescription:
        "Test JavaScript regex patterns and inspect every match.",
      description:
        "Run a JavaScript regular expression against sample text, review match positions and test flags without opening a console.",
      inputLabel: "Test text",
      outputLabel: "Matches",
      primaryAction: "Test expression",
      secondaryAction: "Use sample pattern",
      placeholder: "Order IDs: AB-1204, CD-9981",
      guideTitle: "Testing regex safely",
      concept:
        "Regular expressions match text using literals, character classes, groups and quantifiers. Flags change behavior such as case sensitivity and global matching.",
      caution:
        "Complex nested quantifiers can cause slow backtracking. Test patterns against long and adversarial inputs before production use.",
      question: "Which regex flavor does this use?",
      answer: "JavaScript RegExp syntax supported by your current browser.",
    },
    "word-counter": {
      title: "Word, Character & Line Counter",
      shortDescription: "Count words, characters, lines and UTF-8 bytes.",
      description:
        "Measure text length for articles, metadata, messages and storage limits with separate word, character, line and byte counts.",
      inputLabel: "Text to measure",
      outputLabel: "Text statistics",
      primaryAction: "Count text",
      secondaryAction: "Trim whitespace",
      placeholder: "Paste an article, description or message…",
      guideTitle: "Understanding text length",
      concept:
        "Word and character limits describe human-facing copy, while UTF-8 byte counts matter for transport and storage. Unicode characters may use multiple bytes.",
      caution:
        "Word boundaries differ across languages. This tool uses the browser's Unicode-aware segmentation when available and a whitespace rule otherwise.",
      question: "Why are bytes and characters different?",
      answer:
        "UTF-8 stores many non-ASCII characters using more than one byte.",
    },
    "case-converter": {
      title: "Text Case Converter",
      shortDescription:
        "Convert text to camelCase, snake_case and common styles.",
      description:
        "Normalize labels and identifiers into camelCase, snake_case, kebab-case, PascalCase, uppercase or lowercase.",
      inputLabel: "Words or identifier",
      outputLabel: "Case variants",
      primaryAction: "Build case variants",
      secondaryAction: "Use sample text",
      placeholder: "customer account status",
      guideTitle: "Consistent identifier casing",
      concept:
        "Programming languages and APIs use casing conventions to signal identifiers, constants and filenames. Consistency makes code easier to scan and integrate.",
      caution:
        "Automatic splitting cannot infer every acronym or language-specific word boundary. Review names such as OAuth, iOS and existing API fields.",
      question: "Are accents and Unicode letters preserved?",
      answer:
        "Letters are preserved where possible, while punctuation is treated as a word separator.",
    },
    "slug-generator": {
      title: "URL Slug Generator",
      shortDescription: "Turn a title into a clean, lowercase URL slug.",
      description:
        "Create readable kebab-case paths from titles by normalizing accents, spacing and punctuation entirely in your browser.",
      inputLabel: "Page title",
      outputLabel: "URL slug",
      primaryAction: "Generate slug",
      secondaryAction: "Preserve Unicode",
      placeholder: "A Practical Guide to Browser Tools",
      guideTitle: "Building readable URLs",
      concept:
        "A slug is the human-readable final segment of a URL. Short descriptive words help users and search engines understand the page before opening it.",
      caution:
        "Changing a published slug changes its URL. Add a permanent redirect when renaming existing pages to preserve links and search signals.",
      question: "Should every word stay in the slug?",
      answer:
        "Keep words that explain the page and remove filler only when the result stays clear and unique.",
    },
    "password-generator": {
      title: "Secure Password Generator",
      shortDescription:
        "Generate strong passwords with browser cryptographic randomness.",
      description:
        "Create passwords from configurable character sets and length using crypto.getRandomValues, with no generated value sent to a server.",
      inputLabel: "Length and character sets",
      outputLabel: "Generated password",
      primaryAction: "Generate password",
      secondaryAction: "Regenerate",
      placeholder: "",
      guideTitle: "Generating stronger passwords",
      concept:
        "Long random passwords resist guessing because each extra character increases the possible combinations. Unique passwords also contain damage from a breached service.",
      caution:
        "Store passwords in a reputable password manager. Do not reuse generated passwords or send them through insecure messages.",
      question: "Is Math.random used?",
      answer:
        "No. Generation uses crypto.getRandomValues from the Web Crypto API.",
    },
    "number-base-converter": {
      title: "Binary, Decimal & HEX Converter",
      shortDescription:
        "Convert integers across binary, octal, decimal and hexadecimal.",
      description:
        "Translate signed integers between common number bases for debugging, bit work, permissions and low-level data inspection.",
      inputLabel: "Integer value",
      outputLabel: "Base representations",
      primaryAction: "Convert number",
      secondaryAction: "Use sample value",
      placeholder: "255, 0xff, 0b11111111 or 0o377",
      guideTitle: "How number bases relate",
      concept:
        "Binary uses two digits, octal eight, decimal ten and hexadecimal sixteen. They are different written representations of the same integer value.",
      caution:
        "This converter handles integers with BigInt. Fractions and language-specific fixed-width overflow rules are intentionally excluded.",
      question: "How is the input base detected?",
      answer:
        "Prefixes 0b, 0o and 0x select binary, octal and hexadecimal; unprefixed input is decimal.",
    },
    "csv-json-converter": {
      title: "CSV to JSON Converter",
      shortDescription:
        "Convert header-based CSV to JSON and JSON arrays back to CSV.",
      description:
        "Move tabular data between CSV and JSON while preserving quoted commas, line breaks and escaped quote characters.",
      inputLabel: "CSV or JSON array",
      outputLabel: "Converted data",
      primaryAction: "CSV to JSON",
      secondaryAction: "JSON to CSV",
      placeholder: "name,role\nAda,Engineer\nLin,Designer",
      guideTitle: "Moving between rows and objects",
      concept:
        "CSV represents a table as delimited rows, while JSON represents records as objects. A header row supplies property names during CSV conversion.",
      caution:
        "CSV has dialect differences. This tool uses commas, double-quote escaping and the first row as headers; review unusual exports before use.",
      question: "Are quoted commas supported?",
      answer:
        "Yes. Fields enclosed in double quotes may contain commas, newlines and escaped double quotes.",
    },
    "query-string-parser": {
      title: "Query String Parser & Builder",
      shortDescription:
        "Parse URL parameters into JSON or build a query string.",
      description:
        "Inspect repeated and encoded URL parameters as structured JSON, or turn a JSON object into an encoded query string.",
      inputLabel: "Query string or JSON object",
      outputLabel: "Parsed or built value",
      primaryAction: "Parse query string",
      secondaryAction: "Build query string",
      placeholder: "?page=2&tag=web&tag=tools",
      guideTitle: "Working with URL parameters",
      concept:
        "A query string carries key-value pairs after a URL question mark. Repeated keys can represent multiple selections and percent-encoding protects reserved characters.",
      caution:
        "Parameter interpretation is application-specific. Values remain strings unless your application explicitly validates and converts them.",
      question: "How are repeated keys represented?",
      answer:
        "One value stays a string; repeated values become an array in the parsed JSON.",
    },
    "json-to-typescript": {
      title: "JSON to TypeScript Interface",
      shortDescription: "Infer a readable TypeScript interface from JSON data.",
      description:
        "Turn a JSON object or array into nested TypeScript interfaces for API prototypes, fixtures and typed integration work.",
      inputLabel: "JSON sample",
      outputLabel: "TypeScript definitions",
      primaryAction: "Generate interfaces",
      secondaryAction: "Use type aliases",
      placeholder: '{"id":1,"profile":{"name":"Ada"},"active":true}',
      guideTitle: "Inferring types from examples",
      concept:
        "A JSON sample reveals observed object keys and primitive values. Generated definitions provide a starting point for typed code and editor completion.",
      caution:
        "One sample cannot prove optional fields, unions or all array shapes. Compare multiple real responses and refine generated types before production use.",
      question: "Does this validate an API schema?",
      answer:
        "No. It infers types from one sample and does not replace runtime validation or an OpenAPI schema.",
    },
    "text-sorter": {
      title: "Line Sorter",
      shortDescription:
        "Sort text lines ascending or descending with locale-aware order.",
      description:
        "Alphabetize lists, imports and labels while optionally retaining blank lines and reviewing the exact sorted output.",
      inputLabel: "Lines to sort",
      outputLabel: "Sorted lines",
      primaryAction: "Sort A to Z",
      secondaryAction: "Sort Z to A",
      placeholder: "pear\napple\norange",
      guideTitle: "Sorting text predictably",
      concept:
        "Locale-aware comparison produces a more natural order for letters and numbers than raw character-code sorting.",
      caution:
        "Sorting changes source order and may alter meaning in ordered procedures, logs or configuration files. Keep the original when order matters.",
      question: "Is sorting case-sensitive?",
      answer:
        "Comparison is case-insensitive for primary ordering, with stable browser ordering for ties.",
    },
    "duplicate-line-remover": {
      title: "Duplicate Line Remover",
      shortDescription:
        "Remove repeated lines while preserving their first occurrence.",
      description:
        "Clean copied lists, IDs and exports by removing exact duplicate lines, with an option to ignore surrounding whitespace.",
      inputLabel: "Lines to deduplicate",
      outputLabel: "Unique lines",
      primaryAction: "Remove duplicates",
      secondaryAction: "Trim and deduplicate",
      placeholder: "alpha\nbeta\nalpha\ngamma",
      guideTitle: "Deduplicating line-based data",
      concept:
        "Stable deduplication keeps the first occurrence of each line and preserves the remaining order, making the result easier to compare with its source.",
      caution:
        "Exact mode treats capitalization and whitespace as meaningful. Trim mode removes surrounding whitespace but still preserves letter case.",
      question: "Will the original order change?",
      answer: "No. The first occurrence stays in its original position.",
    },
  },
  ko: {
    "jwt-decoder": {
      title: "JWT 디코더",
      shortDescription: "JWT 헤더, 페이로드와 만료 시간을 로컬에서 확인합니다.",
      description:
        "JSON Web Token의 읽을 수 있는 부분을 업로드 없이 해석해 API 디버깅 중 클레임과 구조를 확인합니다.",
      inputLabel: "인코딩된 JWT",
      outputLabel: "디코딩된 헤더와 페이로드",
      primaryAction: "JWT 디코딩",
      secondaryAction: "샘플 토큰 사용",
      placeholder: "eyJhbGciOi...",
      guideTitle: "JSON Web Token 읽기",
      concept:
        "JWT는 보통 Base64URL로 인코딩된 헤더, 페이로드, 서명으로 구성됩니다. 페이로드에는 발급자, 주체, 만료 시간 같은 클레임이 담깁니다.",
      caution:
        "디코딩은 서명 검증이 아닙니다. 서버가 서명과 허용 알고리즘을 검증하기 전에는 표시된 클레임을 신뢰하지 마세요.",
      question: "JWT 서명도 검증하나요?",
      answer:
        "아니요. 헤더와 페이로드만 확인하며, 검증에는 올바른 키와 서버 측 검사가 필요합니다.",
    },
    "html-entity-converter": {
      title: "HTML 엔티티 인코더·디코더",
      shortDescription:
        "HTML 특수 문자를 이스케이프하거나 엔티티를 원문으로 복원합니다.",
      description:
        "꺾쇠, 앰퍼샌드, 따옴표를 HTML 엔티티로 변환하거나 기존 엔티티를 읽을 수 있는 텍스트로 되돌립니다.",
      inputLabel: "HTML 또는 일반 텍스트",
      outputLabel: "변환된 텍스트",
      primaryAction: "엔티티 인코딩",
      secondaryAction: "엔티티 디코딩",
      placeholder: '<button title="저장 & 닫기">완료</button>',
      guideTitle: "HTML 엔티티가 필요한 이유",
      concept:
        "엔티티는 HTML 구조에서 특별한 의미를 갖는 문자를 텍스트로 표시하게 해줍니다. 코드 예시와 기호를 안전하게 표현할 때 유용합니다.",
      caution:
        "엔티티 인코딩만으로 모든 XSS를 막을 수 없습니다. HTML, 속성, URL, 스크립트 문맥에 맞는 이스케이프가 필요합니다.",
      question: "인코딩하면 신뢰할 수 없는 HTML이 안전해지나요?",
      answer:
        "모든 경우에 그렇지는 않습니다. 프레임워크 이스케이프와 검증된 sanitizer를 사용하세요.",
    },
    "color-converter": {
      title: "HEX·RGB·HSL 색상 변환기",
      shortDescription: "CSS 색상을 HEX, RGB, HSL 형식으로 변환합니다.",
      description:
        "HEX 또는 RGB 색상을 입력해 동일한 HEX, RGB, HSL 값과 미리보기 색상을 확인합니다.",
      inputLabel: "HEX 또는 RGB 색상",
      outputLabel: "동일 색상 형식",
      primaryAction: "색상 변환",
      secondaryAction: "샘플 색상 사용",
      placeholder: "#ff6b35 또는 rgb(255, 107, 53)",
      guideTitle: "CSS 색상 형식 선택",
      concept:
        "HEX와 RGB는 빨강, 초록, 파랑 채널을 나타냅니다. HSL은 색상, 채도, 명도로 표현해 체계적인 밝기 조절에 편리합니다.",
      caution:
        "HSL 변환에서 한 단위 정도 반올림될 수 있습니다. 텍스트와 상태 색상은 항상 명도 대비를 확인하세요.",
      question: "변환하면 화면의 색상이 달라지나요?",
      answer:
        "아니요. 반올림 차이를 제외하면 같은 sRGB 색상을 다른 표기로 나타냅니다.",
    },
    "regex-tester": {
      title: "정규식 테스터",
      shortDescription:
        "JavaScript 정규식을 테스트하고 모든 일치 항목을 확인합니다.",
      description:
        "샘플 텍스트에 JavaScript 정규식을 실행해 일치 위치, 그룹과 플래그 동작을 콘솔 없이 점검합니다.",
      inputLabel: "테스트할 텍스트",
      outputLabel: "일치 결과",
      primaryAction: "정규식 테스트",
      secondaryAction: "샘플 패턴 사용",
      placeholder: "주문 번호: AB-1204, CD-9981",
      guideTitle: "정규식 안전하게 테스트하기",
      concept:
        "정규식은 리터럴, 문자 클래스, 그룹, 수량자로 텍스트를 찾습니다. 플래그는 대소문자 구분과 전체 검색 방식을 바꿉니다.",
      caution:
        "복잡한 중첩 수량자는 긴 역추적을 만들 수 있습니다. 운영 전 긴 입력과 악의적인 입력으로 성능을 확인하세요.",
      question: "어떤 정규식 문법을 사용하나요?",
      answer: "현재 브라우저가 지원하는 JavaScript RegExp 문법을 사용합니다.",
    },
    "word-counter": {
      title: "단어·글자·줄 수 계산기",
      shortDescription: "단어, 글자, 줄과 UTF-8 바이트 수를 계산합니다.",
      description:
        "글, 메타데이터, 메시지와 저장 제한을 위해 단어, 글자, 줄, 바이트 길이를 각각 측정합니다.",
      inputLabel: "측정할 텍스트",
      outputLabel: "텍스트 통계",
      primaryAction: "텍스트 계산",
      secondaryAction: "공백 정리",
      placeholder: "글, 설명 또는 메시지를 붙여넣으세요…",
      guideTitle: "텍스트 길이 이해하기",
      concept:
        "단어와 글자 수는 사람이 읽는 문구 제한에 쓰이고, UTF-8 바이트 수는 전송과 저장 제한에 중요합니다. Unicode 문자는 여러 바이트를 쓸 수 있습니다.",
      caution:
        "언어마다 단어 경계가 다릅니다. 지원되는 브라우저에서는 Unicode 기반 구분을, 아니면 공백 기준을 사용합니다.",
      question: "글자 수와 바이트 수가 왜 다른가요?",
      answer:
        "UTF-8에서는 많은 비 ASCII 문자가 한 글자에 여러 바이트를 사용합니다.",
    },
    "case-converter": {
      title: "문자열 케이스 변환기",
      shortDescription: "텍스트를 camelCase, snake_case 등으로 변환합니다.",
      description:
        "라벨과 식별자를 camelCase, snake_case, kebab-case, PascalCase, 대문자와 소문자로 정리합니다.",
      inputLabel: "단어 또는 식별자",
      outputLabel: "케이스 변형",
      primaryAction: "케이스 변형 생성",
      secondaryAction: "샘플 텍스트 사용",
      placeholder: "customer account status",
      guideTitle: "일관된 식별자 표기",
      concept:
        "프로그래밍 언어와 API는 케이스 규칙으로 식별자, 상수와 파일명을 구분합니다. 일관성은 코드를 읽고 연동하기 쉽게 만듭니다.",
      caution:
        "자동 분리는 모든 약어나 언어별 단어 경계를 추론하지 못합니다. OAuth, iOS, 기존 API 필드는 직접 확인하세요.",
      question: "Unicode 글자와 악센트가 유지되나요?",
      answer: "가능한 한 글자는 유지하고 구두점은 단어 구분자로 처리합니다.",
    },
    "slug-generator": {
      title: "URL 슬러그 생성기",
      shortDescription: "제목을 깔끔한 소문자 URL 슬러그로 변환합니다.",
      description:
        "제목의 악센트, 공백과 구두점을 정리해 읽기 쉬운 kebab-case 경로를 브라우저에서 만듭니다.",
      inputLabel: "페이지 제목",
      outputLabel: "URL 슬러그",
      primaryAction: "슬러그 생성",
      secondaryAction: "Unicode 유지",
      placeholder: "브라우저 도구 실전 가이드",
      guideTitle: "읽기 쉬운 URL 만들기",
      concept:
        "슬러그는 URL의 마지막에 있는 사람이 읽을 수 있는 부분입니다. 짧고 구체적인 단어는 페이지 내용을 주소만으로 이해하게 합니다.",
      caution:
        "공개된 슬러그를 바꾸면 URL도 바뀝니다. 기존 페이지를 변경할 때는 링크와 검색 신호를 위해 영구 리디렉션을 추가하세요.",
      question: "제목의 모든 단어를 유지해야 하나요?",
      answer:
        "페이지를 명확하고 고유하게 설명하는 단어는 유지하고 불필요한 말만 줄이세요.",
    },
    "password-generator": {
      title: "안전한 비밀번호 생성기",
      shortDescription: "브라우저 암호학적 난수로 강한 비밀번호를 생성합니다.",
      description:
        "crypto.getRandomValues를 사용해 길이와 문자 집합을 조절한 비밀번호를 만들며 생성값은 서버로 보내지 않습니다.",
      inputLabel: "길이와 문자 집합",
      outputLabel: "생성된 비밀번호",
      primaryAction: "비밀번호 생성",
      secondaryAction: "다시 생성",
      placeholder: "",
      guideTitle: "더 강한 비밀번호 만들기",
      concept:
        "길고 무작위인 비밀번호는 가능한 조합이 많아 추측하기 어렵습니다. 서비스마다 다른 비밀번호를 쓰면 유출 피해도 제한됩니다.",
      caution:
        "신뢰할 수 있는 비밀번호 관리자로 저장하세요. 생성된 값을 재사용하거나 안전하지 않은 메시지로 보내지 마세요.",
      question: "Math.random을 사용하나요?",
      answer: "아니요. Web Crypto API의 crypto.getRandomValues를 사용합니다.",
    },
    "number-base-converter": {
      title: "2진수·10진수·16진수 변환기",
      shortDescription: "정수를 2진수, 8진수, 10진수와 16진수로 변환합니다.",
      description:
        "디버깅, 비트 작업과 저수준 데이터 확인을 위해 부호 있는 정수를 일반적인 진법 사이에서 변환합니다.",
      inputLabel: "정수 값",
      outputLabel: "진법별 표현",
      primaryAction: "숫자 변환",
      secondaryAction: "샘플 값 사용",
      placeholder: "255, 0xff, 0b11111111 또는 0o377",
      guideTitle: "진법 사이의 관계",
      concept:
        "2진수는 숫자 2개, 8진수는 8개, 10진수는 10개, 16진수는 16개를 사용합니다. 모두 같은 정수를 다르게 적은 표현입니다.",
      caution:
        "BigInt 정수만 처리합니다. 소수와 언어별 고정 비트 오버플로 규칙은 의도적으로 제외했습니다.",
      question: "입력 진법은 어떻게 판단하나요?",
      answer:
        "0b, 0o, 0x 접두사는 각각 2진수, 8진수, 16진수이며 접두사가 없으면 10진수입니다.",
    },
    "csv-json-converter": {
      title: "CSV·JSON 변환기",
      shortDescription:
        "헤더가 있는 CSV를 JSON으로, JSON 배열을 CSV로 변환합니다.",
      description:
        "따옴표 안의 쉼표, 줄바꿈과 이스케이프 따옴표를 보존하며 표 데이터를 CSV와 JSON 사이에서 변환합니다.",
      inputLabel: "CSV 또는 JSON 배열",
      outputLabel: "변환된 데이터",
      primaryAction: "CSV를 JSON으로",
      secondaryAction: "JSON을 CSV로",
      placeholder: "name,role\nAda,Engineer\nLin,Designer",
      guideTitle: "행과 객체 사이 변환",
      concept:
        "CSV는 구분된 행으로 표를 나타내고 JSON은 레코드를 객체로 나타냅니다. 첫 헤더 행은 CSV 변환 시 속성 이름이 됩니다.",
      caution:
        "CSV에는 여러 방언이 있습니다. 이 도구는 쉼표, 큰따옴표 이스케이프와 첫 행 헤더를 사용하므로 특수한 내보내기 파일은 확인하세요.",
      question: "따옴표 안의 쉼표도 지원하나요?",
      answer:
        "네. 큰따옴표로 감싼 필드에는 쉼표, 줄바꿈과 이스케이프된 큰따옴표가 포함될 수 있습니다.",
    },
    "query-string-parser": {
      title: "쿼리 문자열 파서·빌더",
      shortDescription:
        "URL 파라미터를 JSON으로 해석하거나 쿼리 문자열을 만듭니다.",
      description:
        "반복되거나 인코딩된 URL 파라미터를 구조화된 JSON으로 확인하고, JSON 객체를 인코딩된 쿼리 문자열로 변환합니다.",
      inputLabel: "쿼리 문자열 또는 JSON 객체",
      outputLabel: "해석 또는 생성 결과",
      primaryAction: "쿼리 문자열 해석",
      secondaryAction: "쿼리 문자열 생성",
      placeholder: "?page=2&tag=web&tag=tools",
      guideTitle: "URL 파라미터 다루기",
      concept:
        "쿼리 문자열은 URL 물음표 뒤에 키와 값 쌍을 전달합니다. 반복 키는 여러 선택값을 나타내고 퍼센트 인코딩은 예약 문자를 보호합니다.",
      caution:
        "파라미터 해석 방식은 앱마다 다릅니다. 애플리케이션이 검증하고 변환하기 전까지 값은 문자열입니다.",
      question: "반복된 키는 어떻게 표시하나요?",
      answer: "값이 하나면 문자열, 같은 키가 반복되면 JSON 배열로 표시합니다.",
    },
    "json-to-typescript": {
      title: "JSON to TypeScript 인터페이스",
      shortDescription:
        "JSON 데이터에서 읽기 쉬운 TypeScript 인터페이스를 추론합니다.",
      description:
        "JSON 객체나 배열을 중첩 TypeScript 인터페이스로 바꿔 API 프로토타입과 타입 연동 작업에 사용합니다.",
      inputLabel: "JSON 샘플",
      outputLabel: "TypeScript 정의",
      primaryAction: "인터페이스 생성",
      secondaryAction: "type 별칭 사용",
      placeholder: '{"id":1,"profile":{"name":"Ada"},"active":true}',
      guideTitle: "예시에서 타입 추론하기",
      concept:
        "JSON 샘플은 관찰된 객체 키와 기본값 종류를 보여줍니다. 생성된 정의는 타입 코드와 편집기 자동완성의 시작점입니다.",
      caution:
        "샘플 하나로 선택 필드, union, 모든 배열 형태를 알 수 없습니다. 여러 실제 응답을 비교하고 운영 전에 타입을 다듬으세요.",
      question: "API 스키마를 검증하나요?",
      answer:
        "아니요. 샘플 하나에서 타입을 추론하며 런타임 검증이나 OpenAPI 스키마를 대체하지 않습니다.",
    },
    "text-sorter": {
      title: "텍스트 줄 정렬기",
      shortDescription:
        "텍스트 줄을 언어 인식 순서로 오름차순 또는 내림차순 정렬합니다.",
      description:
        "목록, import와 라벨을 자연스러운 순서로 정렬하고 결과를 바로 복사합니다.",
      inputLabel: "정렬할 줄",
      outputLabel: "정렬된 줄",
      primaryAction: "가나다·A-Z 정렬",
      secondaryAction: "역순 정렬",
      placeholder: "배\n사과\n오렌지",
      guideTitle: "텍스트를 예측 가능하게 정렬하기",
      concept:
        "언어 인식 비교는 단순 문자 코드 정렬보다 글자와 숫자를 자연스러운 순서로 배치합니다.",
      caution:
        "정렬은 원본 순서를 바꾸며 절차, 로그, 설정 파일에서는 의미를 바꿀 수 있습니다. 순서가 중요하면 원본을 보관하세요.",
      question: "대소문자를 구분하나요?",
      answer:
        "첫 정렬 기준에서는 대소문자를 구분하지 않으며 동률은 브라우저의 안정 정렬을 따릅니다.",
    },
    "duplicate-line-remover": {
      title: "중복 줄 제거기",
      shortDescription: "첫 번째 등장 순서를 유지하며 반복 줄을 제거합니다.",
      description:
        "복사한 목록, ID와 내보내기 데이터에서 완전히 같은 줄을 제거하고 필요하면 앞뒤 공백도 무시합니다.",
      inputLabel: "중복 제거할 줄",
      outputLabel: "고유한 줄",
      primaryAction: "중복 제거",
      secondaryAction: "공백 정리 후 제거",
      placeholder: "alpha\nbeta\nalpha\ngamma",
      guideTitle: "줄 단위 데이터 중복 제거",
      concept:
        "안정적인 중복 제거는 각 줄의 첫 번째 항목을 유지해 원본과 결과를 쉽게 비교할 수 있게 합니다.",
      caution:
        "기본 모드는 대소문자와 공백을 다른 값으로 봅니다. 공백 정리 모드는 앞뒤 공백만 없애고 대소문자는 유지합니다.",
      question: "원래 순서도 바뀌나요?",
      answer: "아니요. 각 줄이 처음 등장한 위치의 순서를 유지합니다.",
    },
  },
  ja: {
    "jwt-decoder": {
      title: "JWTデコーダー",
      shortDescription: "JWTのヘッダー、ペイロード、有効期限をローカル確認。",
      description:
        "JSON Web Tokenの可読部分をアップロードせず解析し、APIデバッグ中のクレームと構造を確認します。",
      inputLabel: "エンコード済みJWT",
      outputLabel: "デコード結果",
      primaryAction: "JWTをデコード",
      secondaryAction: "サンプルトークン",
      placeholder: "eyJhbGciOi...",
      guideTitle: "JSON Web Tokenの読み方",
      concept:
        "JWTは通常、Base64URL形式のヘッダー、ペイロード、署名で構成されます。ペイロードには発行者や有効期限などのクレームが含まれます。",
      caution:
        "デコードは署名検証ではありません。サーバーが署名とアルゴリズムを検証するまでクレームを信用しないでください。",
      question: "JWT署名も検証しますか？",
      answer:
        "いいえ。ヘッダーとペイロードの確認のみで、検証には正しい鍵とサーバー側処理が必要です。",
    },
    "html-entity-converter": {
      title: "HTMLエンティティ変換",
      shortDescription: "HTML特殊文字をエスケープまたは復元。",
      description:
        "山括弧、アンパサンド、引用符をHTMLエンティティへ変換し、既存エンティティをテキストへ戻します。",
      inputLabel: "HTMLまたはテキスト",
      outputLabel: "変換結果",
      primaryAction: "エンティティ化",
      secondaryAction: "デコード",
      placeholder: '<button title="保存 & 閉じる">完了</button>',
      guideTitle: "HTMLエンティティの用途",
      concept:
        "エンティティはHTML構造で特別な意味を持つ文字をテキストとして表示します。コード例や記号の表示に役立ちます。",
      caution:
        "エンティティ化だけでは完全なXSS対策になりません。HTML、属性、URL、スクリプトの文脈別に処理が必要です。",
      question: "未信頼HTMLは安全になりますか？",
      answer:
        "常に安全とは限りません。フレームワークのエスケープと信頼できるサニタイザーを使ってください。",
    },
    "color-converter": {
      title: "HEX・RGB・HSLカラー変換",
      shortDescription: "CSS色をHEX、RGB、HSL間で変換。",
      description:
        "HEXまたはRGBを入力し、同じ色のHEX、RGB、HSL値とプレビューを確認します。",
      inputLabel: "HEXまたはRGB色",
      outputLabel: "同等の色形式",
      primaryAction: "色を変換",
      secondaryAction: "サンプル色",
      placeholder: "#ff6b35 または rgb(255, 107, 53)",
      guideTitle: "CSS色形式の選択",
      concept:
        "HEXとRGBは赤・緑・青の各チャネル、HSLは色相・彩度・明度で表します。HSLは体系的な明るさ調整に便利です。",
      caution:
        "HSL変換で1程度の丸めが生じます。文字や状態色には必ずコントラストを確認してください。",
      question: "変換で見える色は変わりますか？",
      answer: "いいえ。丸め差を除き同じsRGB色を別形式で表します。",
    },
    "regex-tester": {
      title: "正規表現テスター",
      shortDescription: "JavaScript正規表現と全一致を確認。",
      description:
        "サンプル文字列へJavaScript正規表現を実行し、一致位置とフラグをコンソールなしで確認します。",
      inputLabel: "テスト文字列",
      outputLabel: "一致結果",
      primaryAction: "正規表現をテスト",
      secondaryAction: "サンプルパターン",
      placeholder: "注文ID: AB-1204, CD-9981",
      guideTitle: "正規表現の安全なテスト",
      concept:
        "正規表現はリテラル、文字クラス、グループ、量指定子で文字列を探します。フラグは大文字小文字や全件検索を変えます。",
      caution:
        "複雑な量指定子の入れ子は遅いバックトラックを起こします。本番前に長い入力でも性能を確認してください。",
      question: "どの正規表現形式ですか？",
      answer: "現在のブラウザが対応するJavaScript RegExp構文です。",
    },
    "word-counter": {
      title: "単語・文字・行カウンター",
      shortDescription: "単語、文字、行、UTF-8バイトを計測。",
      description:
        "記事、メタデータ、メッセージの単語数、文字数、行数、バイト数を個別に計測します。",
      inputLabel: "計測するテキスト",
      outputLabel: "テキスト統計",
      primaryAction: "テキストを計測",
      secondaryAction: "空白を整理",
      placeholder: "記事、説明、メッセージを貼り付け…",
      guideTitle: "テキスト長の理解",
      concept:
        "単語数と文字数は人向けの制限、UTF-8バイト数は転送と保存の制限に関係します。Unicode文字は複数バイトを使う場合があります。",
      caution:
        "言語で単語境界は異なります。対応ブラウザではUnicodeセグメント、それ以外では空白基準を使います。",
      question: "文字数とバイト数が違う理由は？",
      answer: "UTF-8では多くの非ASCII文字が1文字に複数バイトを使うためです。",
    },
    "case-converter": {
      title: "テキストケース変換",
      shortDescription: "camelCase、snake_caseなどへ変換。",
      description:
        "ラベルと識別子をcamelCase、snake_case、kebab-case、PascalCase、大小文字へ整理します。",
      inputLabel: "単語または識別子",
      outputLabel: "ケース一覧",
      primaryAction: "ケース一覧を生成",
      secondaryAction: "サンプル文字列",
      placeholder: "customer account status",
      guideTitle: "一貫した識別子表記",
      concept:
        "言語やAPIはケース規則で識別子、定数、ファイル名を区別します。一貫性はコードを読みやすくします。",
      caution:
        "自動分割はすべての略語や言語別境界を推測できません。OAuth、iOS、既存API項目は確認してください。",
      question: "Unicode文字は保持されますか？",
      answer: "可能な限り文字を維持し、句読点を単語区切りとして扱います。",
    },
    "slug-generator": {
      title: "URLスラッグ生成",
      shortDescription: "タイトルを読みやすい小文字URLへ変換。",
      description:
        "アクセント、空白、句読点を整え、タイトルからkebab-caseのパスをブラウザ内で作ります。",
      inputLabel: "ページタイトル",
      outputLabel: "URLスラッグ",
      primaryAction: "スラッグを生成",
      secondaryAction: "Unicodeを維持",
      placeholder: "ブラウザツール実践ガイド",
      guideTitle: "読みやすいURL作り",
      concept:
        "スラッグはURL末尾の人が読める部分です。短く具体的な語でページ内容を開く前に伝えます。",
      caution:
        "公開済みスラッグの変更はURL変更になります。既存ページには恒久リダイレクトを設定してください。",
      question: "すべての単語を残しますか？",
      answer: "内容を明確かつ固有に説明する語を残し、不要語だけを減らします。",
    },
    "password-generator": {
      title: "安全なパスワード生成",
      shortDescription: "ブラウザ暗号乱数で強いパスワードを生成。",
      description:
        "crypto.getRandomValuesで長さと文字種を指定したパスワードを作り、生成値はサーバーへ送りません。",
      inputLabel: "長さと文字種",
      outputLabel: "生成パスワード",
      primaryAction: "パスワードを生成",
      secondaryAction: "再生成",
      placeholder: "",
      guideTitle: "強いパスワードの生成",
      concept:
        "長いランダムパスワードは組合せが増えて推測が困難です。サービスごとに固有なら漏洩被害も限定できます。",
      caution:
        "信頼できるパスワードマネージャーへ保存し、再利用や安全でないメッセージ送信を避けてください。",
      question: "Math.randomを使いますか？",
      answer: "いいえ。Web Crypto APIのcrypto.getRandomValuesを使います。",
    },
    "number-base-converter": {
      title: "2進・10進・16進変換",
      shortDescription: "整数を2進、8進、10進、16進へ変換。",
      description:
        "デバッグ、ビット処理、低水準データ確認のため符号付き整数を各基数へ変換します。",
      inputLabel: "整数値",
      outputLabel: "各基数の表記",
      primaryAction: "数値を変換",
      secondaryAction: "サンプル値",
      placeholder: "255, 0xff, 0b11111111 または 0o377",
      guideTitle: "基数間の関係",
      concept:
        "2進は2個、8進は8個、10進は10個、16進は16個の数字を使います。すべて同じ整数の異なる表記です。",
      caution:
        "BigInt整数のみを扱います。小数や言語固有の固定ビットオーバーフローは対象外です。",
      question: "入力基数はどう判定しますか？",
      answer: "0b、0o、0xは2進、8進、16進を示し、接頭辞なしは10進です。",
    },
    "csv-json-converter": {
      title: "CSV・JSON変換",
      shortDescription: "ヘッダーCSVとJSON配列を相互変換。",
      description:
        "引用符内のカンマ、改行、エスケープ引用符を保ちながらCSVとJSONを変換します。",
      inputLabel: "CSVまたはJSON配列",
      outputLabel: "変換データ",
      primaryAction: "CSVからJSON",
      secondaryAction: "JSONからCSV",
      placeholder: "name,role\nAda,Engineer\nLin,Designer",
      guideTitle: "行とオブジェクトの変換",
      concept:
        "CSVは区切り行で表を示し、JSONはレコードをオブジェクトで示します。先頭行がプロパティ名になります。",
      caution:
        "CSVには方言があります。本ツールはカンマ、二重引用符、先頭ヘッダーを使うため特殊な出力は確認してください。",
      question: "引用符内のカンマに対応しますか？",
      answer:
        "はい。二重引用符内にはカンマ、改行、エスケープ引用符を含められます。",
    },
    "query-string-parser": {
      title: "クエリ文字列解析・生成",
      shortDescription: "URLパラメータをJSON解析または生成。",
      description:
        "反復・エンコード済みURLパラメータをJSONで確認し、JSONオブジェクトからクエリ文字列を作ります。",
      inputLabel: "クエリ文字列またはJSON",
      outputLabel: "解析・生成結果",
      primaryAction: "クエリを解析",
      secondaryAction: "クエリを生成",
      placeholder: "?page=2&tag=web&tag=tools",
      guideTitle: "URLパラメータの扱い",
      concept:
        "クエリ文字列はURLの疑問符以降へキーと値を運びます。反復キーは複数選択、パーセント表記は予約文字を保護します。",
      caution:
        "値の解釈はアプリ固有です。アプリが検証・変換するまでは文字列として扱います。",
      question: "反復キーはどう表示しますか？",
      answer: "1値は文字列、同じキーの複数値はJSON配列になります。",
    },
    "json-to-typescript": {
      title: "JSONからTypeScript",
      shortDescription: "JSONからTypeScriptインターフェースを推論。",
      description:
        "JSONオブジェクトまたは配列をネストしたTypeScript定義へ変換します。",
      inputLabel: "JSONサンプル",
      outputLabel: "TypeScript定義",
      primaryAction: "インターフェース生成",
      secondaryAction: "type別名を使用",
      placeholder: '{"id":1,"profile":{"name":"Ada"},"active":true}',
      guideTitle: "例から型を推論",
      concept:
        "JSONサンプルは観測されたキーと基本値を示し、生成定義は型付きコードと補完の出発点になります。",
      caution:
        "1サンプルでは省略可能項目、union、全配列形状は分かりません。複数応答を比較し本番前に修正してください。",
      question: "APIスキーマを検証しますか？",
      answer:
        "いいえ。1サンプルから推論するだけで、ランタイム検証やOpenAPIを置き換えません。",
    },
    "text-sorter": {
      title: "行ソーター",
      shortDescription: "行を自然な昇順・降順に並べ替え。",
      description:
        "一覧、import、ラベルを言語対応の自然な順序へ並べ、結果をコピーします。",
      inputLabel: "並べ替える行",
      outputLabel: "並べ替え結果",
      primaryAction: "昇順に並べる",
      secondaryAction: "降順に並べる",
      placeholder: "梨\nりんご\nオレンジ",
      guideTitle: "予測可能なテキスト並べ替え",
      concept:
        "ロケール対応比較は単純な文字コード順より文字と数字を自然に配置します。",
      caution:
        "手順、ログ、設定では順序変更が意味を変える場合があります。順序が重要なら原本を保管してください。",
      question: "大文字小文字を区別しますか？",
      answer: "主な比較では区別せず、同順位はブラウザの安定ソートに従います。",
    },
    "duplicate-line-remover": {
      title: "重複行削除",
      shortDescription: "最初の出現順を保って重複行を削除。",
      description:
        "コピーした一覧、ID、出力データから同一行を除き、必要なら前後空白も無視します。",
      inputLabel: "重複を除く行",
      outputLabel: "固有行",
      primaryAction: "重複を削除",
      secondaryAction: "空白整理して削除",
      placeholder: "alpha\nbeta\nalpha\ngamma",
      guideTitle: "行データの重複除去",
      concept:
        "安定した重複除去は各行の最初の出現を保ち、元データと結果を比較しやすくします。",
      caution:
        "通常モードは大文字小文字と空白を区別します。空白整理モードは前後空白だけ除きます。",
      question: "元の順序は変わりますか？",
      answer: "いいえ。各行が最初に現れた順序を保ちます。",
    },
  },
};

export const EXTRA_TOOL_COPY = Object.fromEntries(
  (Object.keys(SEEDS) as Locale[]).map((locale) => [
    locale,
    Object.fromEntries(
      Object.entries(SEEDS[locale]).map(([slug, seed]) => [
        slug,
        buildToolCopy(seed, FRAMES[locale]),
      ]),
    ) as Record<ExtraToolSlug, ToolCopy>,
  ]),
) as Record<Locale, Record<ExtraToolSlug, ToolCopy>>;
