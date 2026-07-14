import type { Locale } from "@/shared/config/site";
import type { ToolSlug } from "@/shared/config/tools";

interface ToolCopy {
  title: string;
  shortDescription: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
  primaryAction: string;
  secondaryAction: string;
  placeholder: string;
  guideTitle: string;
  guide: readonly string[];
  stepsTitle: string;
  steps: readonly string[];
  faqTitle: string;
  faq: readonly { question: string; answer: string }[];
}

interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    tools: string;
    about: string;
    products: string;
    menu: string;
    language: string;
  };
  common: {
    openTool: string;
    allTools: string;
    copy: string;
    copied: string;
    clear: string;
    error: string;
    privateBadge: string;
    browserOnly: string;
    advertisement: string;
    skipToContent: string;
  };
  home: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    proofOne: string;
    proofTwo: string;
    proofThree: string;
    toolsEyebrow: string;
    toolsTitle: string;
    toolsIntro: string;
    principleEyebrow: string;
    principleTitle: string;
    principles: readonly { title: string; body: string }[];
    productsEyebrow: string;
    productsTitle: string;
    productsIntro: string;
    visitProduct: string;
  };
  toolsIndex: { eyebrow: string; title: string; intro: string };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: readonly { title: string; body: string }[];
  };
  privacy: {
    title: string;
    updated: string;
    sections: readonly { title: string; body: string }[];
  };
  terms: {
    title: string;
    updated: string;
    sections: readonly { title: string; body: string }[];
  };
  footer: {
    statement: string;
    tools: string;
    company: string;
    legal: string;
    about: string;
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
  tools: Record<ToolSlug, ToolCopy>;
}

const en: Dictionary = {
  meta: {
    title: "Web Toolkit — Fast, private browser utilities",
    description:
      "Free developer utilities for JSON, Base64, UUIDs, timestamps, URLs and hashes. Everything runs locally in your browser.",
  },
  nav: {
    tools: "Tools",
    about: "About",
    products: "Products",
    menu: "Menu",
    language: "Language",
  },
  common: {
    openTool: "Open tool",
    allTools: "All tools",
    copy: "Copy",
    copied: "Copied",
    clear: "Clear",
    error: "Could not process that value.",
    privateBadge: "Local-first",
    browserOnly: "Your data stays in this browser",
    advertisement: "Advertisement",
    skipToContent: "Skip to content",
  },
  home: {
    eyebrow: "FIELD KIT / 2026 EDITION",
    title: "Small tools for",
    titleAccent: "precise work.",
    intro:
      "Format, convert and generate common developer data without accounts, uploads or unnecessary steps.",
    primaryCta: "Browse the toolkit",
    secondaryCta: "How privacy works",
    proofOne: "6 focused utilities",
    proofTwo: "3 languages",
    proofThree: "0 server uploads",
    toolsEyebrow: "THE WORKBENCH",
    toolsTitle: "Pick a job. Get it done.",
    toolsIntro:
      "Each utility is built around one repeatable task, with practical examples and clear output.",
    principleEyebrow: "OPERATING PRINCIPLES",
    principleTitle: "Useful before clever.",
    principles: [
      {
        title: "Local by default",
        body: "Inputs are processed with browser APIs. The toolkit does not send your working data to our servers.",
      },
      {
        title: "Explain the result",
        body: "Every tool includes context, examples and answers—not only an empty input box surrounded by ads.",
      },
      {
        title: "Built for repetition",
        body: "Fast copy actions, responsive layouts and sensible defaults keep recurring work moving.",
      },
    ],
    productsEyebrow: "FROM PIXELLOGIC",
    productsTitle: "More focused products.",
    productsIntro:
      "Independent apps live on their own subdomains while Web Toolkit stays dedicated to useful browser utilities.",
    visitProduct: "Visit product",
  },
  toolsIndex: {
    eyebrow: "COMPLETE INDEX",
    title: "Six tools. No account.",
    intro:
      "Every utility runs on the client and includes a concise field guide for the format it handles.",
  },
  about: {
    eyebrow: "ABOUT THE PROJECT",
    title: "A quieter way to use web tools.",
    intro:
      "Web Toolkit is an independent PixelLogic project for developers, students and anyone who works with structured data.",
    sections: [
      {
        title: "Why it exists",
        body: "Many utility sites bury simple jobs under sign-ups, pop-ups and unclear data handling. Web Toolkit keeps each task direct and documents what happens to your input.",
      },
      {
        title: "How it works",
        body: "Conversions and generators use browser-native JavaScript APIs. Inputs stay on your device unless a page explicitly says otherwise.",
      },
      {
        title: "How it is funded",
        body: "Advertising helps keep the tools free. Ads are separated from controls and never change tool output.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Updated July 15, 2026",
    sections: [
      {
        title: "Tool inputs",
        body: "Text entered into Web Toolkit utilities is processed locally in your browser. We do not intentionally transmit or store tool input on our servers.",
      },
      {
        title: "Advertising",
        body: "We use Google AdSense. Google and its partners may use cookies or similar technologies to show, measure and personalize advertising according to your consent and regional requirements.",
      },
      {
        title: "Technical data",
        body: "Our hosting and analytics providers may process standard request information such as IP address, browser type, requested URL and timestamps for security and aggregate performance measurement.",
      },
      {
        title: "Your choices",
        body: "You can control cookies through your browser and available consent controls. Blocking storage may affect advertising but not core tool processing.",
      },
      {
        title: "Contact",
        body: "Questions about privacy can be sent to pixellogic.app@gmail.com.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    updated: "Updated July 15, 2026",
    sections: [
      {
        title: "Use of the service",
        body: "Web Toolkit provides general-purpose utilities for lawful use. Do not use the service to violate rights, disrupt systems or process data you are not authorized to handle.",
      },
      {
        title: "No warranty",
        body: "Tools are provided as-is. Verify important output independently before using it in production, security, financial or legal workflows.",
      },
      {
        title: "Availability",
        body: "Features may change or become temporarily unavailable. We do not guarantee uninterrupted operation or preservation of browser state.",
      },
      {
        title: "Third-party services",
        body: "Advertising and linked products may be provided by third parties under their own terms and privacy practices.",
      },
      {
        title: "Contact",
        body: "Questions about these terms can be sent to pixellogic.app@gmail.com.",
      },
    ],
  },
  footer: {
    statement: "Focused browser utilities. Built by PixelLogic.",
    tools: "Toolkit",
    company: "Project",
    legal: "Legal",
    about: "About",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  tools: {
    "json-formatter": {
      title: "JSON Formatter & Validator",
      shortDescription:
        "Format, minify and validate JSON with precise error feedback.",
      description:
        "Turn compact or uneven JSON into readable structured data. Validation happens before output, so syntax problems surface without sending your payload anywhere.",
      inputLabel: "JSON input",
      outputLabel: "Processed JSON",
      primaryAction: "Format JSON",
      secondaryAction: "Minify",
      placeholder: '{"status":"ready","items":[1,2,3]}',
      guideTitle: "Why format JSON?",
      guide: [
        "JSON is a text format for structured data used by APIs, configuration files and application storage. Whitespace does not change its meaning, but consistent indentation makes nested objects easier to inspect.",
        "The formatter parses the full input before rendering it. A successful result is valid JSON; an error points to malformed syntax such as missing quotes, commas or braces.",
      ],
      stepsTitle: "Field procedure",
      steps: [
        "Paste a JSON object or array.",
        "Choose Format or Minify.",
        "Review and copy the validated result.",
      ],
      faqTitle: "JSON questions",
      faq: [
        {
          question: "Is my JSON uploaded?",
          answer: "No. Parsing and formatting run entirely in your browser.",
        },
        {
          question: "Does formatting change values?",
          answer:
            "No. It changes whitespace only. Minifying also preserves the parsed values.",
        },
        {
          question: "What indentation is used?",
          answer: "Formatted output uses two spaces per nesting level.",
        },
      ],
    },
    "base64-converter": {
      title: "Base64 Encoder & Decoder",
      shortDescription:
        "Encode Unicode text to Base64 or decode it back safely.",
      description:
        "Convert text to and from Base64 using UTF-8 aware browser APIs. Useful for inspecting data URLs, API credentials and text-based payloads.",
      inputLabel: "Text or Base64 input",
      outputLabel: "Converted output",
      primaryAction: "Encode",
      secondaryAction: "Decode",
      placeholder: "Web Toolkit — precise work",
      guideTitle: "What Base64 does",
      guide: [
        "Base64 represents binary bytes with printable ASCII characters. It is encoding, not encryption, and should never be treated as protection for secrets.",
        "This converter first maps text to UTF-8 bytes, preserving international characters, then produces Base64. Decoding reverses the same process.",
      ],
      stepsTitle: "Field procedure",
      steps: [
        "Enter plain text or a Base64 value.",
        "Choose Encode or Decode.",
        "Copy the converted output.",
      ],
      faqTitle: "Base64 questions",
      faq: [
        {
          question: "Is Base64 secure?",
          answer:
            "No. Anyone can decode it. Use encryption for confidentiality.",
        },
        {
          question: "Does it support Korean and Japanese?",
          answer: "Yes. Input is converted through UTF-8 before encoding.",
        },
        {
          question: "Why is the result longer?",
          answer:
            "Base64 usually adds about one third to the original byte size.",
        },
      ],
    },
    "uuid-generator": {
      title: "UUID v4 Generator",
      shortDescription:
        "Generate one or many cryptographically random UUID v4 values.",
      description:
        "Create standards-shaped UUID v4 identifiers with the browser crypto API. Generate up to twenty values at once for fixtures, records and distributed systems.",
      inputLabel: "Quantity",
      outputLabel: "Generated UUIDs",
      primaryAction: "Generate UUIDs",
      secondaryAction: "Generate again",
      placeholder: "1",
      guideTitle: "When to use UUID v4",
      guide: [
        "UUIDs are 128-bit identifiers designed to be unique without a central counter. Version 4 uses random bits and is common for database records, request IDs and test fixtures.",
        "Random UUIDs are excellent identifiers but not secrets. Avoid exposing sensitive meaning through surrounding data or assuming an identifier grants authorization.",
      ],
      stepsTitle: "Field procedure",
      steps: [
        "Select a quantity from one to twenty.",
        "Generate UUID v4 values.",
        "Copy the list into your project.",
      ],
      faqTitle: "UUID questions",
      faq: [
        {
          question: "Are these UUIDs random?",
          answer:
            "Yes. They use crypto.randomUUID from the browser Web Crypto API.",
        },
        {
          question: "Can duplicates occur?",
          answer:
            "The probability is extremely small, but uniqueness should still be enforced where required.",
        },
        {
          question: "Can I use them as passwords?",
          answer:
            "No. Identifiers and authentication secrets have different security requirements.",
        },
      ],
    },
    "timestamp-converter": {
      title: "Unix Timestamp Converter",
      shortDescription:
        "Convert local dates into Unix seconds, milliseconds, ISO and UTC.",
      description:
        "Inspect one moment across common timestamp formats. The converter makes timezone behavior visible and keeps every calculation on your device.",
      inputLabel: "Local date and time",
      outputLabel: "Timestamp formats",
      primaryAction: "Convert time",
      secondaryAction: "Use current time",
      placeholder: "2026-07-15T09:30",
      guideTitle: "Understanding Unix time",
      guide: [
        "Unix time counts elapsed seconds since 00:00:00 UTC on January 1, 1970. JavaScript commonly uses milliseconds, while many APIs and databases use seconds.",
        "A timestamp identifies a moment; a displayed calendar time also depends on a timezone. ISO and UTC output help make that distinction explicit.",
      ],
      stepsTitle: "Field procedure",
      steps: [
        "Choose a local date and time.",
        "Convert it into common formats.",
        "Copy the exact value your system expects.",
      ],
      faqTitle: "Timestamp questions",
      faq: [
        {
          question: "Seconds or milliseconds?",
          answer:
            "Unix seconds have 10 digits today; JavaScript milliseconds usually have 13.",
        },
        {
          question: "Which timezone is the input?",
          answer:
            "The date-time input is interpreted in your device's local timezone.",
        },
        {
          question: "What does ISO use?",
          answer: "The ISO result is normalized to UTC and ends with Z.",
        },
      ],
    },
    "url-encoder": {
      title: "URL Encoder & Decoder",
      shortDescription:
        "Encode query values or decode percent-encoded URL components.",
      description:
        "Safely transform spaces, Unicode and reserved characters for use inside URL components. Decode existing values for inspection and debugging.",
      inputLabel: "URL component input",
      outputLabel: "Converted component",
      primaryAction: "Encode component",
      secondaryAction: "Decode component",
      placeholder: "search=web tools & language=한국어",
      guideTitle: "Why URLs need encoding",
      guide: [
        "URLs reserve characters such as ?, &, = and # for structure. Percent-encoding represents data bytes without allowing those characters to change the URL's meaning.",
        "This tool uses encodeURIComponent and decodeURIComponent, making it suitable for individual path or query values rather than an entire complete URL.",
      ],
      stepsTitle: "Field procedure",
      steps: [
        "Paste one URL component or query value.",
        "Choose Encode or Decode.",
        "Insert the result into the intended URL position.",
      ],
      faqTitle: "URL questions",
      faq: [
        {
          question: "Should I encode a complete URL?",
          answer:
            "Usually no. Encode individual path segments or query values.",
        },
        {
          question: "Why does a space become %20?",
          answer:
            "Percent-encoding represents the UTF-8 byte for a space as %20.",
        },
        {
          question: "Does decoding navigate anywhere?",
          answer: "No. It only transforms the text in your browser.",
        },
      ],
    },
    "hash-generator": {
      title: "SHA Hash Generator",
      shortDescription:
        "Create SHA-256, SHA-384 and SHA-512 digests from text.",
      description:
        "Generate deterministic hexadecimal hashes with the Web Crypto API. Compare content, prepare fixtures and inspect integrity values without uploading source text.",
      inputLabel: "Text to hash",
      outputLabel: "Hex digest",
      primaryAction: "Generate hash",
      secondaryAction: "Change algorithm",
      placeholder: "Content to fingerprint",
      guideTitle: "What a cryptographic hash means",
      guide: [
        "A hash maps input data to a fixed-length digest. The same input and algorithm produce the same result, while a small input change produces a very different digest.",
        "Hashes help verify integrity but do not encrypt data. Password storage requires a dedicated slow password-hashing function with a salt, not plain SHA.",
      ],
      stepsTitle: "Field procedure",
      steps: [
        "Enter the source text.",
        "Choose SHA-256, SHA-384 or SHA-512.",
        "Generate and copy the hexadecimal digest.",
      ],
      faqTitle: "Hash questions",
      faq: [
        {
          question: "Can a SHA hash be reversed?",
          answer:
            "There is no direct reverse operation, though weak inputs can be guessed and compared.",
        },
        {
          question: "Which algorithm should I choose?",
          answer:
            "SHA-256 is the common default. Use another size when a protocol specifically requires it.",
        },
        {
          question: "Can I hash passwords here?",
          answer:
            "Do not use plain SHA for password storage. Use Argon2, scrypt, bcrypt or PBKDF2 with proper parameters.",
        },
      ],
    },
  },
};

const ko: Dictionary = {
  meta: {
    title: "Web Toolkit — 빠르고 안전한 브라우저 도구",
    description:
      "JSON, Base64, UUID, 타임스탬프, URL, 해시 작업을 위한 무료 개발자 도구. 모든 데이터는 브라우저에서 처리됩니다.",
  },
  nav: {
    tools: "도구",
    about: "소개",
    products: "제품",
    menu: "메뉴",
    language: "언어",
  },
  common: {
    openTool: "도구 열기",
    allTools: "전체 도구",
    copy: "복사",
    copied: "복사됨",
    clear: "지우기",
    error: "입력값을 처리할 수 없습니다.",
    privateBadge: "로컬 우선",
    browserOnly: "데이터는 이 브라우저에만 머뭅니다",
    advertisement: "광고",
    skipToContent: "본문으로 건너뛰기",
  },
  home: {
    eyebrow: "FIELD KIT / 2026 EDITION",
    title: "정확한 작업을 위한",
    titleAccent: "작고 빠른 도구.",
    intro:
      "회원가입, 업로드, 불필요한 과정 없이 개발 데이터를 변환하고 생성하세요.",
    primaryCta: "도구 둘러보기",
    secondaryCta: "개인정보 처리 방식",
    proofOne: "집중된 도구 6개",
    proofTwo: "지원 언어 3개",
    proofThree: "서버 업로드 0회",
    toolsEyebrow: "THE WORKBENCH",
    toolsTitle: "작업을 고르고 바로 끝내세요.",
    toolsIntro:
      "반복되는 한 가지 작업에 집중하고, 실용적인 예시와 명확한 결과를 제공합니다.",
    principleEyebrow: "OPERATING PRINCIPLES",
    principleTitle: "기발함보다 유용함.",
    principles: [
      {
        title: "기본은 로컬 처리",
        body: "입력값은 브라우저 API로 처리되며 작업 데이터를 서버로 보내지 않습니다.",
      },
      {
        title: "결과까지 설명",
        body: "빈 입력창과 광고만 두지 않고 형식의 개념, 예시와 자주 묻는 질문을 제공합니다.",
      },
      {
        title: "반복 작업에 최적화",
        body: "빠른 복사, 반응형 화면과 합리적인 기본값으로 자주 하는 작업을 줄입니다.",
      },
    ],
    productsEyebrow: "FROM PIXELLOGIC",
    productsTitle: "더 집중된 독립 제품.",
    productsIntro:
      "독립 앱은 서브도메인에서 운영하고 Web Toolkit은 브라우저 유틸리티에 집중합니다.",
    visitProduct: "제품 방문",
  },
  toolsIndex: {
    eyebrow: "COMPLETE INDEX",
    title: "도구 6개. 계정은 필요 없습니다.",
    intro:
      "모든 유틸리티는 클라이언트에서 실행되며 다루는 형식에 대한 간결한 설명을 포함합니다.",
  },
  about: {
    eyebrow: "ABOUT THE PROJECT",
    title: "웹 도구를 사용하는 조용한 방식.",
    intro:
      "Web Toolkit은 개발자, 학생, 구조화된 데이터를 다루는 사람을 위한 PixelLogic의 독립 프로젝트입니다.",
    sections: [
      {
        title: "만든 이유",
        body: "많은 유틸리티 사이트가 간단한 작업을 가입, 팝업, 불명확한 데이터 처리로 복잡하게 만듭니다. Web Toolkit은 작업과 데이터 흐름을 분명하게 유지합니다.",
      },
      {
        title: "작동 방식",
        body: "변환과 생성 기능은 브라우저 기본 JavaScript API를 사용합니다. 별도 안내가 없는 한 입력값은 기기를 떠나지 않습니다.",
      },
      {
        title: "운영 방식",
        body: "광고 수익으로 무료 도구를 유지합니다. 광고는 조작 요소와 분리되며 도구 결과에 영향을 주지 않습니다.",
      },
    ],
  },
  privacy: {
    title: "개인정보처리방침",
    updated: "최종 수정: 2026년 7월 15일",
    sections: [
      {
        title: "도구 입력값",
        body: "Web Toolkit 도구에 입력한 텍스트는 브라우저에서 로컬로 처리됩니다. 도구 입력값을 서버로 전송하거나 저장하도록 의도적으로 구성하지 않았습니다.",
      },
      {
        title: "광고",
        body: "Google AdSense를 사용합니다. Google 및 파트너는 동의와 지역별 요건에 따라 광고 표시, 측정, 맞춤화를 위해 쿠키 또는 유사 기술을 사용할 수 있습니다.",
      },
      {
        title: "기술 정보",
        body: "호스팅 및 분석 제공자는 보안과 집계 성능 측정을 위해 IP 주소, 브라우저 종류, 요청 URL, 시각 같은 표준 요청 정보를 처리할 수 있습니다.",
      },
      {
        title: "사용자 선택",
        body: "브라우저와 제공되는 동의 관리 기능에서 쿠키를 제어할 수 있습니다. 저장소 차단은 광고에 영향을 줄 수 있지만 핵심 도구 처리에는 영향을 주지 않습니다.",
      },
      {
        title: "문의",
        body: "개인정보 관련 문의는 pixellogic.app@gmail.com으로 보내주세요.",
      },
    ],
  },
  terms: {
    title: "이용약관",
    updated: "최종 수정: 2026년 7월 15일",
    sections: [
      {
        title: "서비스 이용",
        body: "Web Toolkit은 합법적인 사용을 위한 범용 유틸리티를 제공합니다. 권리 침해, 시스템 방해, 권한 없는 데이터 처리에 사용해서는 안 됩니다.",
      },
      {
        title: "보증의 부인",
        body: "도구는 현재 상태로 제공됩니다. 프로덕션, 보안, 금융, 법률 작업에 사용하기 전 중요한 결과는 독립적으로 검증해야 합니다.",
      },
      {
        title: "가용성",
        body: "기능은 변경되거나 일시적으로 중단될 수 있습니다. 중단 없는 운영이나 브라우저 상태 보존을 보장하지 않습니다.",
      },
      {
        title: "외부 서비스",
        body: "광고 및 연결된 제품은 각자의 약관과 개인정보 처리 기준을 적용하는 제3자가 제공할 수 있습니다.",
      },
      {
        title: "문의",
        body: "약관 관련 문의는 pixellogic.app@gmail.com으로 보내주세요.",
      },
    ],
  },
  footer: {
    statement: "집중된 브라우저 도구. PixelLogic 제작.",
    tools: "도구 모음",
    company: "프로젝트",
    legal: "정책",
    about: "소개",
    privacy: "개인정보",
    terms: "이용약관",
    contact: "문의",
    rights: "All rights reserved.",
  },
  tools: {
    "json-formatter": {
      title: "JSON 포맷터 및 검증기",
      shortDescription: "JSON을 정렬·압축하고 문법 오류를 정확하게 확인합니다.",
      description:
        "압축되거나 불규칙한 JSON을 읽기 좋은 구조로 변환합니다. 출력 전에 전체 문법을 검증하며 데이터는 외부로 전송되지 않습니다.",
      inputLabel: "JSON 입력",
      outputLabel: "처리된 JSON",
      primaryAction: "JSON 정렬",
      secondaryAction: "압축",
      placeholder: '{"status":"ready","items":[1,2,3]}',
      guideTitle: "JSON을 정렬하는 이유",
      guide: [
        "JSON은 API, 설정 파일, 앱 저장소에서 쓰는 구조화 텍스트 형식입니다. 공백은 의미를 바꾸지 않지만 일정한 들여쓰기는 중첩 구조를 쉽게 보여줍니다.",
        "포맷터는 전체 입력을 파싱한 뒤 결과를 만듭니다. 결과가 나오면 유효한 JSON이며, 실패하면 따옴표·쉼표·괄호 등의 문법 오류를 확인할 수 있습니다.",
      ],
      stepsTitle: "사용 절차",
      steps: [
        "JSON 객체 또는 배열을 붙여넣습니다.",
        "정렬 또는 압축을 선택합니다.",
        "검증된 결과를 확인하고 복사합니다.",
      ],
      faqTitle: "JSON 질문",
      faq: [
        {
          question: "JSON이 서버로 전송되나요?",
          answer: "아니요. 파싱과 정렬은 브라우저에서만 실행됩니다.",
        },
        {
          question: "정렬하면 값이 바뀌나요?",
          answer: "아니요. 공백만 바뀌며 압축도 파싱된 값을 그대로 유지합니다.",
        },
        {
          question: "들여쓰기는 몇 칸인가요?",
          answer: "중첩 단계마다 공백 두 칸을 사용합니다.",
        },
      ],
    },
    "base64-converter": {
      title: "Base64 인코더 및 디코더",
      shortDescription:
        "유니코드 텍스트를 Base64로 변환하거나 원문으로 복원합니다.",
      description:
        "UTF-8을 지원하는 브라우저 API로 Base64를 양방향 변환합니다. 데이터 URL, API 자격 정보, 텍스트 페이로드를 점검할 때 유용합니다.",
      inputLabel: "텍스트 또는 Base64 입력",
      outputLabel: "변환 결과",
      primaryAction: "인코딩",
      secondaryAction: "디코딩",
      placeholder: "Web Toolkit — 정확한 작업",
      guideTitle: "Base64의 역할",
      guide: [
        "Base64는 바이너리 바이트를 출력 가능한 ASCII 문자로 표현합니다. 암호화가 아니므로 비밀 정보를 보호하는 수단으로 사용하면 안 됩니다.",
        "이 도구는 텍스트를 UTF-8 바이트로 변환한 후 Base64를 생성합니다. 디코딩은 같은 과정을 반대로 수행해 다국어 문자도 보존합니다.",
      ],
      stepsTitle: "사용 절차",
      steps: [
        "일반 텍스트 또는 Base64 값을 입력합니다.",
        "인코딩 또는 디코딩을 선택합니다.",
        "변환 결과를 복사합니다.",
      ],
      faqTitle: "Base64 질문",
      faq: [
        {
          question: "Base64는 안전한가요?",
          answer:
            "아니요. 누구나 디코딩할 수 있습니다. 기밀성에는 암호화를 사용하세요.",
        },
        {
          question: "한글과 일본어도 지원하나요?",
          answer: "네. 인코딩 전 UTF-8 바이트로 변환합니다.",
        },
        {
          question: "결과가 더 긴 이유는?",
          answer:
            "Base64는 일반적으로 원본 바이트 크기보다 약 3분의 1 커집니다.",
        },
      ],
    },
    "uuid-generator": {
      title: "UUID v4 생성기",
      shortDescription:
        "암호학적 난수 기반 UUID v4를 한 번에 여러 개 생성합니다.",
      description:
        "브라우저 Crypto API로 UUID v4 식별자를 생성합니다. 픽스처, 레코드, 분산 시스템을 위해 최대 20개를 한 번에 만들 수 있습니다.",
      inputLabel: "생성 개수",
      outputLabel: "생성된 UUID",
      primaryAction: "UUID 생성",
      secondaryAction: "다시 생성",
      placeholder: "1",
      guideTitle: "UUID v4를 쓰는 경우",
      guide: [
        "UUID는 중앙 카운터 없이 고유하도록 설계된 128비트 식별자입니다. 버전 4는 난수를 사용하며 데이터베이스 레코드, 요청 ID, 테스트 픽스처에 널리 사용됩니다.",
        "UUID는 좋은 식별자지만 비밀값은 아닙니다. 식별자 자체가 권한을 제공한다고 가정하면 안 됩니다.",
      ],
      stepsTitle: "사용 절차",
      steps: [
        "1개부터 20개까지 수량을 선택합니다.",
        "UUID v4 값을 생성합니다.",
        "목록을 프로젝트에 복사합니다.",
      ],
      faqTitle: "UUID 질문",
      faq: [
        {
          question: "정말 무작위인가요?",
          answer:
            "네. 브라우저 Web Crypto API의 crypto.randomUUID를 사용합니다.",
        },
        {
          question: "중복될 수 있나요?",
          answer:
            "확률은 극히 낮지만 필요한 시스템에서는 고유 제약조건을 함께 사용해야 합니다.",
        },
        {
          question: "비밀번호로 써도 되나요?",
          answer: "아니요. 식별자와 인증 비밀값은 보안 요구사항이 다릅니다.",
        },
      ],
    },
    "timestamp-converter": {
      title: "Unix 타임스탬프 변환기",
      shortDescription:
        "로컬 날짜를 Unix 초·밀리초, ISO, UTC 형식으로 변환합니다.",
      description:
        "하나의 시점을 자주 쓰는 타임스탬프 형식으로 비교합니다. 시간대 차이를 명확히 보여주며 계산은 기기에서 실행됩니다.",
      inputLabel: "로컬 날짜 및 시간",
      outputLabel: "타임스탬프 형식",
      primaryAction: "시간 변환",
      secondaryAction: "현재 시간 사용",
      placeholder: "2026-07-15T09:30",
      guideTitle: "Unix 시간 이해하기",
      guide: [
        "Unix 시간은 1970년 1월 1일 00:00:00 UTC부터 흐른 초를 셉니다. JavaScript는 주로 밀리초를 쓰고 많은 API와 데이터베이스는 초를 사용합니다.",
        "타임스탬프는 한 시점을 나타내지만 화면의 날짜와 시간은 시간대에 따라 달라집니다. ISO와 UTC 결과로 차이를 확인할 수 있습니다.",
      ],
      stepsTitle: "사용 절차",
      steps: [
        "로컬 날짜와 시간을 선택합니다.",
        "자주 쓰는 형식으로 변환합니다.",
        "시스템이 요구하는 정확한 값을 복사합니다.",
      ],
      faqTitle: "타임스탬프 질문",
      faq: [
        {
          question: "초와 밀리초를 어떻게 구분하나요?",
          answer:
            "현재 Unix 초는 10자리, JavaScript 밀리초는 보통 13자리입니다.",
        },
        {
          question: "입력 시간대는 무엇인가요?",
          answer: "날짜·시간 입력은 현재 기기의 로컬 시간대로 해석합니다.",
        },
        {
          question: "ISO 결과의 Z는 무엇인가요?",
          answer: "UTC로 정규화된 시간임을 뜻합니다.",
        },
      ],
    },
    "url-encoder": {
      title: "URL 인코더 및 디코더",
      shortDescription:
        "쿼리 값을 인코딩하거나 퍼센트 인코딩된 URL 구성요소를 복원합니다.",
      description:
        "공백, 유니코드, 예약 문자를 URL 구성요소에 안전하게 사용할 수 있도록 변환합니다. 기존 값을 디코딩해 디버깅할 수도 있습니다.",
      inputLabel: "URL 구성요소 입력",
      outputLabel: "변환된 구성요소",
      primaryAction: "구성요소 인코딩",
      secondaryAction: "구성요소 디코딩",
      placeholder: "search=web tools & language=한국어",
      guideTitle: "URL 인코딩이 필요한 이유",
      guide: [
        "URL은 ?, &, =, # 같은 문자를 구조 표현에 예약합니다. 퍼센트 인코딩은 데이터가 URL 구조를 바꾸지 않도록 바이트를 표현합니다.",
        "이 도구는 encodeURIComponent와 decodeURIComponent를 사용하므로 전체 URL이 아니라 개별 경로나 쿼리 값에 적합합니다.",
      ],
      stepsTitle: "사용 절차",
      steps: [
        "URL 구성요소 또는 쿼리 값을 붙여넣습니다.",
        "인코딩 또는 디코딩을 선택합니다.",
        "결과를 URL의 알맞은 위치에 넣습니다.",
      ],
      faqTitle: "URL 질문",
      faq: [
        {
          question: "전체 URL을 인코딩해야 하나요?",
          answer: "보통은 아닙니다. 개별 경로 조각이나 쿼리 값을 인코딩하세요.",
        },
        {
          question: "공백이 %20이 되는 이유는?",
          answer:
            "퍼센트 인코딩이 공백의 UTF-8 바이트를 %20으로 표현하기 때문입니다.",
        },
        {
          question: "디코딩하면 해당 주소로 이동하나요?",
          answer: "아니요. 브라우저 안에서 텍스트만 변환합니다.",
        },
      ],
    },
    "hash-generator": {
      title: "SHA 해시 생성기",
      shortDescription:
        "텍스트에서 SHA-256, SHA-384, SHA-512 다이제스트를 생성합니다.",
      description:
        "Web Crypto API로 결정적인 16진수 해시를 만듭니다. 원문을 업로드하지 않고 콘텐츠 비교, 픽스처, 무결성 값을 점검할 수 있습니다.",
      inputLabel: "해시할 텍스트",
      outputLabel: "16진수 다이제스트",
      primaryAction: "해시 생성",
      secondaryAction: "알고리즘 변경",
      placeholder: "지문을 만들 콘텐츠",
      guideTitle: "암호학적 해시의 의미",
      guide: [
        "해시는 입력 데이터를 고정 길이 다이제스트로 매핑합니다. 같은 입력과 알고리즘은 같은 결과를 만들고, 입력이 조금만 바뀌어도 결과는 크게 달라집니다.",
        "해시는 무결성 확인에 유용하지만 데이터를 암호화하지 않습니다. 비밀번호 저장에는 단순 SHA가 아니라 salt를 포함한 전용 저속 해시 함수가 필요합니다.",
      ],
      stepsTitle: "사용 절차",
      steps: [
        "원본 텍스트를 입력합니다.",
        "SHA-256, SHA-384, SHA-512 중 하나를 선택합니다.",
        "16진수 다이제스트를 생성하고 복사합니다.",
      ],
      faqTitle: "해시 질문",
      faq: [
        {
          question: "SHA 해시를 되돌릴 수 있나요?",
          answer:
            "직접적인 역연산은 없지만 약한 입력은 추측 후 비교할 수 있습니다.",
        },
        {
          question: "어떤 알고리즘을 써야 하나요?",
          answer:
            "SHA-256이 일반적인 기본값입니다. 프로토콜이 요구할 때 다른 길이를 선택하세요.",
        },
        {
          question: "비밀번호를 해시해도 되나요?",
          answer:
            "비밀번호 저장에 단순 SHA를 쓰지 마세요. Argon2, scrypt, bcrypt 또는 PBKDF2를 사용해야 합니다.",
        },
      ],
    },
  },
};

const ja: Dictionary = {
  meta: {
    title: "Web Toolkit — 高速でプライベートなブラウザツール",
    description:
      "JSON、Base64、UUID、タイムスタンプ、URL、ハッシュの無料開発ツール。すべてブラウザ内で処理されます。",
  },
  nav: {
    tools: "ツール",
    about: "概要",
    products: "製品",
    menu: "メニュー",
    language: "言語",
  },
  common: {
    openTool: "ツールを開く",
    allTools: "すべてのツール",
    copy: "コピー",
    copied: "コピー済み",
    clear: "クリア",
    error: "入力値を処理できませんでした。",
    privateBadge: "ローカル優先",
    browserOnly: "データはこのブラウザ内に留まります",
    advertisement: "広告",
    skipToContent: "本文へ移動",
  },
  home: {
    eyebrow: "FIELD KIT / 2026 EDITION",
    title: "正確な作業のための",
    titleAccent: "小さく速いツール。",
    intro:
      "アカウント、アップロード、余計な手順なしで開発データを変換・生成できます。",
    primaryCta: "ツールを見る",
    secondaryCta: "プライバシーの仕組み",
    proofOne: "6つの専用ツール",
    proofTwo: "3言語対応",
    proofThree: "サーバー送信0回",
    toolsEyebrow: "THE WORKBENCH",
    toolsTitle: "作業を選び、すぐ完了。",
    toolsIntro:
      "各ツールは一つの反復作業に集中し、実例と明確な結果を提供します。",
    principleEyebrow: "OPERATING PRINCIPLES",
    principleTitle: "賢さより実用性。",
    principles: [
      {
        title: "ローカル処理が基本",
        body: "入力はブラウザAPIで処理され、作業データをサーバーへ送りません。",
      },
      {
        title: "結果まで説明",
        body: "空の入力欄と広告だけではなく、形式の背景、例、よくある質問を掲載します。",
      },
      {
        title: "反復作業に最適化",
        body: "素早いコピー、レスポンシブ画面、適切な初期値で繰り返し作業を短縮します。",
      },
    ],
    productsEyebrow: "FROM PIXELLOGIC",
    productsTitle: "さらに特化した製品。",
    productsIntro:
      "独立アプリはサブドメインで運営し、Web Toolkitはブラウザユーティリティに集中します。",
    visitProduct: "製品を見る",
  },
  toolsIndex: {
    eyebrow: "COMPLETE INDEX",
    title: "6つのツール。アカウント不要。",
    intro:
      "すべてクライアント上で動作し、扱う形式の簡潔なフィールドガイドを備えています。",
  },
  about: {
    eyebrow: "ABOUT THE PROJECT",
    title: "もっと静かにウェブツールを使う。",
    intro:
      "Web Toolkitは、開発者、学生、構造化データを扱う人のためのPixelLogic独立プロジェクトです。",
    sections: [
      {
        title: "存在する理由",
        body: "多くのユーティリティサイトは、簡単な作業を登録、ポップアップ、不透明なデータ処理で複雑にします。Web Toolkitは作業とデータの流れを明確に保ちます。",
      },
      {
        title: "動作の仕組み",
        body: "変換と生成にはブラウザ標準のJavaScript APIを使います。明記されない限り、入力は端末の外へ出ません。",
      },
      {
        title: "運営方法",
        body: "広告収益で無料ツールを維持します。広告は操作部分から分離され、ツールの結果を変えません。",
      },
    ],
  },
  privacy: {
    title: "プライバシーポリシー",
    updated: "更新日：2026年7月15日",
    sections: [
      {
        title: "ツールへの入力",
        body: "Web Toolkitに入力したテキストはブラウザ内で処理されます。ツール入力を意図的にサーバーへ送信・保存する構成ではありません。",
      },
      {
        title: "広告",
        body: "Google AdSenseを利用しています。Googleとそのパートナーは、同意および地域要件に従い、広告の表示、測定、パーソナライズにCookie等を使用する場合があります。",
      },
      {
        title: "技術データ",
        body: "ホスティングおよび分析事業者は、セキュリティと集計測定のため、IPアドレス、ブラウザ種別、URL、時刻などの標準リクエスト情報を処理する場合があります。",
      },
      {
        title: "ユーザーの選択",
        body: "ブラウザや提供される同意管理機能でCookieを制御できます。保存を遮断すると広告に影響する場合がありますが、主要ツールの処理には影響しません。",
      },
      {
        title: "お問い合わせ",
        body: "プライバシーに関する質問はpixellogic.app@gmail.comへお送りください。",
      },
    ],
  },
  terms: {
    title: "利用規約",
    updated: "更新日：2026年7月15日",
    sections: [
      {
        title: "サービスの利用",
        body: "Web Toolkitは合法的な利用のための汎用ツールを提供します。権利侵害、システム妨害、権限のないデータ処理に使用しないでください。",
      },
      {
        title: "保証なし",
        body: "ツールは現状有姿で提供されます。本番、セキュリティ、金融、法律に関わる利用前に、重要な出力を独立して検証してください。",
      },
      {
        title: "可用性",
        body: "機能は変更または一時停止される場合があります。中断のない動作やブラウザ状態の保存は保証しません。",
      },
      {
        title: "第三者サービス",
        body: "広告およびリンク先製品は、それぞれの規約とプライバシー方針を持つ第三者が提供する場合があります。",
      },
      {
        title: "お問い合わせ",
        body: "規約に関する質問はpixellogic.app@gmail.comへお送りください。",
      },
    ],
  },
  footer: {
    statement: "用途を絞ったブラウザツール。PixelLogic制作。",
    tools: "ツールキット",
    company: "プロジェクト",
    legal: "ポリシー",
    about: "概要",
    privacy: "プライバシー",
    terms: "利用規約",
    contact: "お問い合わせ",
    rights: "All rights reserved.",
  },
  tools: {
    "json-formatter": {
      title: "JSONフォーマッター＆バリデーター",
      shortDescription: "JSONを整形・圧縮し、構文エラーを正確に確認します。",
      description:
        "圧縮または不揃いなJSONを読みやすい構造に変換します。出力前に全文を検証し、データを外部へ送信しません。",
      inputLabel: "JSON入力",
      outputLabel: "処理済みJSON",
      primaryAction: "JSONを整形",
      secondaryAction: "圧縮",
      placeholder: '{"status":"ready","items":[1,2,3]}',
      guideTitle: "JSONを整形する理由",
      guide: [
        "JSONはAPI、設定ファイル、アプリ保存領域で使われる構造化テキスト形式です。空白は意味を変えませんが、一定のインデントは入れ子構造を読みやすくします。",
        "フォーマッターは入力全体を解析してから出力します。結果が出れば有効なJSONで、失敗時は引用符、カンマ、括弧などを確認できます。",
      ],
      stepsTitle: "使用手順",
      steps: [
        "JSONオブジェクトまたは配列を貼り付けます。",
        "整形または圧縮を選びます。",
        "検証済みの結果を確認してコピーします。",
      ],
      faqTitle: "JSONの質問",
      faq: [
        {
          question: "JSONはアップロードされますか？",
          answer: "いいえ。解析と整形はブラウザ内だけで実行されます。",
        },
        {
          question: "整形で値は変わりますか？",
          answer:
            "いいえ。空白だけが変わり、圧縮でも解析済みの値は維持されます。",
        },
        {
          question: "インデント幅は？",
          answer: "階層ごとに2つのスペースを使います。",
        },
      ],
    },
    "base64-converter": {
      title: "Base64エンコーダー＆デコーダー",
      shortDescription: "UnicodeテキストをBase64へ変換、または元に戻します。",
      description:
        "UTF-8対応のブラウザAPIでBase64を双方向変換します。データURL、API資格情報、テキストペイロードの確認に便利です。",
      inputLabel: "テキストまたはBase64入力",
      outputLabel: "変換結果",
      primaryAction: "エンコード",
      secondaryAction: "デコード",
      placeholder: "Web Toolkit — 正確な作業",
      guideTitle: "Base64の役割",
      guide: [
        "Base64はバイナリバイトを印字可能なASCII文字で表します。暗号化ではなく、秘密情報を守る用途には使えません。",
        "このツールはテキストをUTF-8バイトに変換してからBase64を生成します。デコードは同じ処理を逆に行います。",
      ],
      stepsTitle: "使用手順",
      steps: [
        "通常テキストまたはBase64値を入力します。",
        "エンコードまたはデコードを選びます。",
        "変換結果をコピーします。",
      ],
      faqTitle: "Base64の質問",
      faq: [
        {
          question: "Base64は安全ですか？",
          answer:
            "いいえ。誰でもデコードできます。機密性には暗号化を使ってください。",
        },
        {
          question: "韓国語や日本語に対応しますか？",
          answer: "はい。エンコード前にUTF-8バイトへ変換します。",
        },
        {
          question: "結果が長くなる理由は？",
          answer: "Base64は通常、元のバイトサイズより約3分の1大きくなります。",
        },
      ],
    },
    "uuid-generator": {
      title: "UUID v4ジェネレーター",
      shortDescription: "暗号学的乱数によるUUID v4をまとめて生成します。",
      description:
        "ブラウザのCrypto APIでUUID v4識別子を生成します。フィクスチャ、レコード、分散システム向けに最大20件を一度に作れます。",
      inputLabel: "生成数",
      outputLabel: "生成されたUUID",
      primaryAction: "UUIDを生成",
      secondaryAction: "再生成",
      placeholder: "1",
      guideTitle: "UUID v4を使う場面",
      guide: [
        "UUIDは中央カウンターなしで一意になるよう設計された128ビット識別子です。バージョン4は乱数を使用し、DBレコード、リクエストID、テストフィクスチャで広く使われます。",
        "ランダムUUIDは優れた識別子ですが秘密値ではありません。識別子そのものが権限を与えると考えないでください。",
      ],
      stepsTitle: "使用手順",
      steps: [
        "1から20まで生成数を選びます。",
        "UUID v4を生成します。",
        "一覧をプロジェクトへコピーします。",
      ],
      faqTitle: "UUIDの質問",
      faq: [
        {
          question: "本当にランダムですか？",
          answer: "はい。Web Crypto APIのcrypto.randomUUIDを使用します。",
        },
        {
          question: "重複は起こりますか？",
          answer:
            "確率は非常に低いものの、必要なシステムでは一意制約も使ってください。",
        },
        {
          question: "パスワードにできますか？",
          answer: "いいえ。識別子と認証用秘密値では要件が異なります。",
        },
      ],
    },
    "timestamp-converter": {
      title: "Unixタイムスタンプ変換",
      shortDescription: "ローカル日時をUnix秒・ミリ秒、ISO、UTCへ変換します。",
      description:
        "一つの瞬間を一般的なタイムスタンプ形式で比較します。タイムゾーンの違いを明示し、計算は端末内で行います。",
      inputLabel: "ローカル日時",
      outputLabel: "タイムスタンプ形式",
      primaryAction: "時刻を変換",
      secondaryAction: "現在時刻を使用",
      placeholder: "2026-07-15T09:30",
      guideTitle: "Unix時間を理解する",
      guide: [
        "Unix時間は1970年1月1日00:00:00 UTCから経過した秒数です。JavaScriptは主にミリ秒、多くのAPIやDBは秒を使います。",
        "タイムスタンプは一瞬を示しますが、表示される日時はタイムゾーンで変わります。ISOとUTC出力で違いを確認できます。",
      ],
      stepsTitle: "使用手順",
      steps: [
        "ローカル日時を選びます。",
        "一般的な形式へ変換します。",
        "システムが必要とする値をコピーします。",
      ],
      faqTitle: "タイムスタンプの質問",
      faq: [
        {
          question: "秒とミリ秒の見分け方は？",
          answer: "現在のUnix秒は10桁、JavaScriptミリ秒は通常13桁です。",
        },
        {
          question: "入力のタイムゾーンは？",
          answer: "端末のローカルタイムゾーンとして解釈されます。",
        },
        {
          question: "ISO末尾のZは？",
          answer: "UTCへ正規化された時刻を意味します。",
        },
      ],
    },
    "url-encoder": {
      title: "URLエンコーダー＆デコーダー",
      shortDescription:
        "クエリ値をエンコード、またはパーセント表記を復元します。",
      description:
        "空白、Unicode、予約文字をURL構成要素で安全に扱える形へ変換します。既存値のデコードとデバッグにも使えます。",
      inputLabel: "URL構成要素",
      outputLabel: "変換済み構成要素",
      primaryAction: "エンコード",
      secondaryAction: "デコード",
      placeholder: "search=web tools & language=日本語",
      guideTitle: "URLエンコードが必要な理由",
      guide: [
        "URLでは?、&、=、#などが構造用に予約されています。パーセントエンコードはデータがURL構造を変えないようバイトを表現します。",
        "encodeURIComponentとdecodeURIComponentを使うため、URL全体ではなく個別のパスやクエリ値に適しています。",
      ],
      stepsTitle: "使用手順",
      steps: [
        "URL構成要素またはクエリ値を貼り付けます。",
        "エンコードまたはデコードを選びます。",
        "結果をURLの適切な位置へ入れます。",
      ],
      faqTitle: "URLの質問",
      faq: [
        {
          question: "URL全体をエンコードしますか？",
          answer:
            "通常はしません。個別のパス部分やクエリ値をエンコードしてください。",
        },
        {
          question: "空白が%20になる理由は？",
          answer: "空白のUTF-8バイトをパーセント表記で%20と表すためです。",
        },
        {
          question: "デコードすると移動しますか？",
          answer: "いいえ。ブラウザ内でテキストだけを変換します。",
        },
      ],
    },
    "hash-generator": {
      title: "SHAハッシュジェネレーター",
      shortDescription: "テキストからSHA-256、SHA-384、SHA-512を生成します。",
      description:
        "Web Crypto APIで決定的な16進ハッシュを作ります。原文をアップロードせず、内容比較、フィクスチャ、整合性値を確認できます。",
      inputLabel: "ハッシュ化するテキスト",
      outputLabel: "16進ダイジェスト",
      primaryAction: "ハッシュを生成",
      secondaryAction: "アルゴリズム変更",
      placeholder: "フィンガープリントを作る内容",
      guideTitle: "暗号学的ハッシュとは",
      guide: [
        "ハッシュは入力を固定長のダイジェストへ写像します。同じ入力とアルゴリズムは同じ結果となり、入力が少し変わると結果は大きく変化します。",
        "ハッシュは整合性確認に役立ちますが暗号化ではありません。パスワード保存にはsalt付きの専用低速ハッシュ関数が必要です。",
      ],
      stepsTitle: "使用手順",
      steps: [
        "元のテキストを入力します。",
        "SHA-256、SHA-384、SHA-512を選びます。",
        "16進ダイジェストを生成してコピーします。",
      ],
      faqTitle: "ハッシュの質問",
      faq: [
        {
          question: "SHAハッシュは元に戻せますか？",
          answer:
            "直接の逆演算はありませんが、弱い入力は推測して比較できます。",
        },
        {
          question: "どのアルゴリズムを選びますか？",
          answer:
            "SHA-256が一般的な初期値です。プロトコルが要求する場合のみ他を選びます。",
        },
        {
          question: "パスワードに使えますか？",
          answer:
            "単純SHAをパスワード保存に使わないでください。Argon2、scrypt、bcrypt、PBKDF2が必要です。",
        },
      ],
    },
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, ko, ja };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
