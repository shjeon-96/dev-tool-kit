import {
  FileJson,
  Code,
  FileCode,
  Component,
  Terminal,
  Server,
} from "lucide-react";
import type {
  ErrorFix,
  ErrorFixSlug,
  ErrorCategory,
  ErrorCategoryConfig,
} from "./types";

/**
 * Error Category Configuration
 */
export const errorCategories: Record<ErrorCategory, ErrorCategoryConfig> = {
  json: {
    id: "json",
    label: "JSON",
    description: "JSON 파싱 및 구문 오류",
    icon: FileJson,
    color: "text-warning",
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    description: "JavaScript 런타임 오류",
    icon: Code,
    color: "text-warning",
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    description: "TypeScript 타입 오류",
    icon: FileCode,
    color: "text-info",
  },
  react: {
    id: "react",
    label: "React",
    description: "React 컴포넌트 오류",
    icon: Component,
    color: "text-primary",
  },
  python: {
    id: "python",
    label: "Python",
    description: "Python 구문 및 런타임 오류",
    icon: Terminal,
    color: "text-success",
  },
  nodejs: {
    id: "nodejs",
    label: "Node.js",
    description: "Node.js 런타임 및 서버 오류",
    icon: Server,
    color: "text-success",
  },
};

/**
 * Error Fix Registry
 * 10개의 주요 AI 생성 코드 오류 및 해결 가이드
 */
export const errorFixes: Record<ErrorFixSlug, ErrorFix> = {
  // ============================================
  // JSON 관련 오류
  // ============================================
  "json-unexpected-token": {
    slug: "json-unexpected-token",
    title: "JSON Unexpected Token Error",
    errorMessage: "SyntaxError: Unexpected token",
    description:
      "JSON 파싱 중 예상치 못한 문자가 발견되었을 때 발생하는 오류입니다. AI가 생성한 JSON에서 가장 흔하게 발생합니다.",
    category: "json",
    severity: "high",
    icon: FileJson,
    cause:
      "JSON 문법 규칙 위반 - 잘못된 따옴표, 누락된 콤마, 또는 유효하지 않은 문자 사용",
    aiContext:
      "AI는 종종 JavaScript 객체 리터럴 문법을 JSON으로 잘못 생성하거나, 주석을 포함하거나, 작은따옴표를 사용합니다.",
    fixSteps: [
      {
        title: "작은따옴표를 큰따옴표로 변경",
        description: "JSON은 반드시 큰따옴표만 사용해야 합니다.",
        code: {
          before: "{ 'name': 'value' }",
          after: '{ "name": "value" }',
          language: "json",
        },
      },
      {
        title: "주석 제거",
        description: "JSON은 주석을 지원하지 않습니다.",
        code: {
          before: '{ "name": "value" // comment }',
          after: '{ "name": "value" }',
          language: "json",
        },
      },
      {
        title: "후행 콤마 제거",
        description: "마지막 항목 뒤의 콤마를 제거합니다.",
        code: {
          before: '{ "a": 1, "b": 2, }',
          after: '{ "a": 1, "b": 2 }',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "JSON 구문을 자동으로 검증하고 포맷팅합니다.",
      },
    ],
    relatedErrors: ["json-unterminated-string", "json-trailing-comma"],
    faq: [
      {
        question: "왜 AI가 작은따옴표로 JSON을 생성하나요?",
        answer:
          "AI 모델은 JavaScript 코드와 JSON을 혼동할 수 있습니다. JavaScript에서는 작은따옴표가 유효하지만 JSON에서는 큰따옴표만 허용됩니다.",
      },
      {
        question: "JSON에 주석을 추가할 수 있나요?",
        answer:
          "표준 JSON은 주석을 지원하지 않습니다. JSONC 또는 JSON5를 사용하면 주석을 포함할 수 있습니다.",
      },
    ],
    keywords: [
      "json unexpected token",
      "json syntax error",
      "json parse error",
      "invalid json",
      "json parsing failed",
    ],
    searchVolume: 12000,
  },

  "json-unterminated-string": {
    slug: "json-unterminated-string",
    title: "JSON Unterminated String Error",
    errorMessage: "SyntaxError: Unterminated string in JSON",
    description:
      "문자열이 제대로 닫히지 않았을 때 발생하는 JSON 파싱 오류입니다.",
    category: "json",
    severity: "high",
    icon: FileJson,
    cause:
      "문자열의 닫는 따옴표가 누락되었거나 이스케이프되지 않은 특수문자 포함",
    aiContext:
      "AI가 긴 텍스트나 여러 줄 문자열을 생성할 때 따옴표를 누락하거나 줄바꿈을 잘못 처리합니다.",
    fixSteps: [
      {
        title: "닫는 따옴표 확인",
        description: "모든 문자열이 열고 닫는 따옴표 쌍을 가지는지 확인합니다.",
        code: {
          before: '{ "message": "Hello world }',
          after: '{ "message": "Hello world" }',
          language: "json",
        },
      },
      {
        title: "줄바꿈 이스케이프",
        description: "문자열 내 줄바꿈은 \\n으로 이스케이프합니다.",
        code: {
          before: '{ "text": "Line 1\nLine 2" }',
          after: '{ "text": "Line 1\\nLine 2" }',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "문자열 오류를 자동으로 감지합니다.",
      },
    ],
    relatedErrors: ["json-unexpected-token"],
    faq: [
      {
        question: "JSON에서 여러 줄 문자열을 어떻게 처리하나요?",
        answer:
          "JSON은 여러 줄 문자열을 직접 지원하지 않습니다. 줄바꿈은 \\n으로, 탭은 \\t로 이스케이프해야 합니다.",
      },
    ],
    keywords: [
      "json unterminated string",
      "json string not closed",
      "json missing quote",
    ],
    searchVolume: 5000,
  },

  "json-trailing-comma": {
    slug: "json-trailing-comma",
    title: "JSON Trailing Comma Error",
    errorMessage: "SyntaxError: Trailing comma in JSON",
    description: "배열이나 객체의 마지막 요소 뒤에 콤마가 있을 때 발생합니다.",
    category: "json",
    severity: "medium",
    icon: FileJson,
    cause: "JavaScript에서 허용되는 후행 콤마가 JSON에서는 구문 오류",
    aiContext:
      "AI는 JavaScript 습관으로 후행 콤마를 추가하는 경향이 있으며, 이는 JSON에서 유효하지 않습니다.",
    fixSteps: [
      {
        title: "마지막 콤마 제거",
        description: "배열이나 객체의 마지막 요소 뒤 콤마를 삭제합니다.",
        code: {
          before: '[\n  "item1",\n  "item2",\n]',
          after: '[\n  "item1",\n  "item2"\n]',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "후행 콤마를 자동으로 제거합니다.",
      },
    ],
    relatedErrors: ["json-unexpected-token"],
    faq: [
      {
        question: "왜 JSON은 후행 콤마를 허용하지 않나요?",
        answer:
          "JSON은 JavaScript의 엄격한 부분집합으로 설계되었습니다. 후행 콤마는 나중에 JavaScript에 추가된 기능입니다.",
      },
    ],
    keywords: ["json trailing comma", "json extra comma", "json comma error"],
    searchVolume: 3000,
  },

  "json-duplicate-keys": {
    slug: "json-duplicate-keys",
    title: "JSON Duplicate Keys Error",
    errorMessage: "SyntaxError: Duplicate key in JSON object",
    description:
      "JSON 객체에 동일한 키가 두 번 이상 정의되었을 때 발생하는 오류입니다.",
    category: "json",
    severity: "medium",
    icon: FileJson,
    cause: "같은 객체 내에서 동일한 키 이름을 여러 번 사용",
    aiContext:
      "AI가 코드를 병합하거나 여러 소스에서 데이터를 합칠 때 중복 키를 생성하는 경우가 있습니다.",
    fixSteps: [
      {
        title: "중복 키 제거",
        description: "객체 내 중복된 키를 찾아 하나만 남깁니다.",
        code: {
          before: '{\n  "name": "John",\n  "age": 30,\n  "name": "Jane"\n}',
          after: '{\n  "name": "Jane",\n  "age": 30\n}',
          language: "json",
        },
      },
      {
        title: "배열로 변환",
        description: "여러 값이 필요하면 배열로 변환합니다.",
        code: {
          before: '{\n  "tag": "react",\n  "tag": "javascript"\n}',
          after: '{\n  "tags": ["react", "javascript"]\n}',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "중복 키를 감지하고 경고합니다.",
      },
    ],
    relatedErrors: ["json-unexpected-token"],
    faq: [
      {
        question: "중복 키가 있으면 어떤 값이 사용되나요?",
        answer:
          "대부분의 JSON 파서는 마지막 값을 사용하지만, 이는 구현에 따라 다를 수 있어 의존하면 안 됩니다.",
      },
    ],
    keywords: [
      "json duplicate key",
      "json same key twice",
      "json object duplicate",
    ],
    searchVolume: 2500,
  },

  "json-invalid-escape": {
    slug: "json-invalid-escape",
    title: "JSON Invalid Escape Sequence",
    errorMessage: "SyntaxError: Invalid escape sequence in JSON string",
    description:
      "JSON 문자열에서 유효하지 않은 이스케이프 시퀀스를 사용할 때 발생합니다.",
    category: "json",
    severity: "high",
    icon: FileJson,
    cause: "JSON에서 허용되지 않는 이스케이프 문자 사용 (예: \\x, \\0)",
    aiContext:
      "AI가 파일 경로나 정규식을 JSON에 포함할 때 잘못된 이스케이프 시퀀스를 생성합니다.",
    fixSteps: [
      {
        title: "유효한 이스케이프 시퀀스만 사용",
        description:
          'JSON에서 허용되는 이스케이프: \\", \\\\, \\/, \\b, \\f, \\n, \\r, \\t, \\uXXXX',
        code: {
          before: '{ "path": "C:\\Users\\name" }',
          after: '{ "path": "C:\\\\Users\\\\name" }',
          language: "json",
        },
      },
      {
        title: "슬래시 변경",
        description: "파일 경로는 슬래시를 사용하거나 이스케이프합니다.",
        code: {
          before: '{ "regex": "\\d+" }',
          after: '{ "regex": "\\\\d+" }',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "이스케이프 시퀀스 오류를 자동으로 감지합니다.",
      },
    ],
    relatedErrors: ["json-unterminated-string"],
    faq: [
      {
        question: "JSON에서 백슬래시를 사용하려면 어떻게 하나요?",
        answer:
          '백슬래시는 \\\\로 이스케이프해야 합니다. 예: { "path": "C:\\\\Program Files" }',
      },
    ],
    keywords: [
      "json invalid escape",
      "json backslash error",
      "json escape sequence",
    ],
    searchVolume: 4000,
  },

  "json-number-format": {
    slug: "json-number-format",
    title: "JSON Number Format Error",
    errorMessage: "SyntaxError: Invalid number format in JSON",
    description:
      "JSON에서 유효하지 않은 숫자 형식을 사용할 때 발생하는 오류입니다.",
    category: "json",
    severity: "medium",
    icon: FileJson,
    cause: "JSON 표준에 맞지 않는 숫자 표현 (선행 0, Infinity, NaN 등)",
    aiContext:
      "AI가 JavaScript의 특수 숫자 값(Infinity, NaN)이나 8진수/16진수 표현을 JSON에 사용합니다.",
    fixSteps: [
      {
        title: "선행 0 제거",
        description: "숫자 앞의 불필요한 0을 제거합니다.",
        code: {
          before: '{ "code": 0123 }',
          after: '{ "code": 123 }',
          language: "json",
        },
      },
      {
        title: "특수 값을 문자열로 변환",
        description: "Infinity나 NaN은 문자열이나 null로 대체합니다.",
        code: {
          before: '{ "value": Infinity }',
          after: '{ "value": null }',
          language: "json",
        },
      },
      {
        title: "16진수를 10진수로 변환",
        description: "16진수 표현을 10진수로 변환합니다.",
        code: {
          before: '{ "color": 0xFF }',
          after: '{ "color": 255 }',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "숫자 형식 오류를 자동으로 감지합니다.",
      },
      {
        slug: "base-converter",
        reason: "진법 변환에 사용할 수 있습니다.",
      },
    ],
    relatedErrors: ["json-unexpected-token"],
    faq: [
      {
        question: "JSON에서 큰 숫자를 어떻게 처리하나요?",
        answer:
          "JavaScript의 Number.MAX_SAFE_INTEGER를 초과하는 숫자는 문자열로 저장하는 것이 안전합니다.",
      },
    ],
    keywords: [
      "json number format",
      "json invalid number",
      "json infinity nan",
    ],
    searchVolume: 2000,
  },

  "json-depth-exceeded": {
    slug: "json-depth-exceeded",
    title: "JSON Maximum Depth Exceeded",
    errorMessage: "RangeError: Maximum call stack size exceeded",
    description:
      "JSON 구조가 너무 깊게 중첩되어 파싱 한계를 초과할 때 발생합니다.",
    category: "json",
    severity: "high",
    icon: FileJson,
    cause: "지나치게 깊은 중첩 구조 또는 순환 참조로 인한 무한 루프",
    aiContext:
      "AI가 재귀적 데이터 구조를 생성하거나 자기 참조하는 객체를 JSON으로 변환하려고 시도합니다.",
    fixSteps: [
      {
        title: "중첩 구조 평탄화",
        description: "깊은 중첩을 피하고 평탄한 구조로 재설계합니다.",
        code: {
          before:
            '{\n  "level1": {\n    "level2": {\n      "level3": { ... }\n    }\n  }\n}',
          after:
            '{\n  "items": [\n    { "level": 1, "data": "..." },\n    { "level": 2, "data": "..." }\n  ]\n}',
          language: "json",
        },
      },
      {
        title: "ID 참조 사용",
        description: "중첩 대신 ID로 관계를 표현합니다.",
        code: {
          before: '{ "parent": { "child": { "grandchild": {} } } }',
          after:
            '{\n  "nodes": [\n    { "id": 1, "parentId": null },\n    { "id": 2, "parentId": 1 }\n  ]\n}',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "JSON 구조를 시각화하고 깊이를 분석합니다.",
      },
    ],
    relatedErrors: ["json-circular-reference"],
    faq: [
      {
        question: "JSON의 최대 중첩 깊이는 얼마인가요?",
        answer:
          "JSON 표준에는 제한이 없지만, 파서마다 다릅니다. 일반적으로 20-100 레벨이 안전합니다.",
      },
    ],
    keywords: [
      "json max depth",
      "json too nested",
      "json stack overflow",
      "json recursion limit",
    ],
    searchVolume: 1500,
  },

  "json-circular-reference": {
    slug: "json-circular-reference",
    title: "JSON Circular Reference Error",
    errorMessage: "TypeError: Converting circular structure to JSON",
    description:
      "순환 참조가 있는 객체를 JSON.stringify()로 변환하려고 할 때 발생합니다.",
    category: "json",
    severity: "critical",
    icon: FileJson,
    cause: "객체가 자기 자신을 참조하거나 상호 참조하는 구조",
    aiContext:
      "AI가 DOM 요소, 클래스 인스턴스, 또는 양방향 관계가 있는 객체를 직접 JSON으로 변환하려고 합니다.",
    fixSteps: [
      {
        title: "순환 참조 제거",
        description: "객체에서 순환 참조를 제거합니다.",
        code: {
          before:
            "const obj = { name: 'test' };\nobj.self = obj;\nJSON.stringify(obj);",
          after:
            "const obj = { name: 'test' };\n// self 참조 제거\nJSON.stringify(obj);",
          language: "javascript",
        },
      },
      {
        title: "replacer 함수 사용",
        description: "JSON.stringify의 replacer로 순환 참조를 필터링합니다.",
        code: {
          before: "JSON.stringify(obj)",
          after:
            "const seen = new WeakSet();\nJSON.stringify(obj, (key, value) => {\n  if (typeof value === 'object' && value !== null) {\n    if (seen.has(value)) return;\n    seen.add(value);\n  }\n  return value;\n});",
          language: "javascript",
        },
      },
      {
        title: "필요한 필드만 추출",
        description: "직렬화가 필요한 필드만 새 객체로 복사합니다.",
        code: {
          before: "JSON.stringify(domElement)",
          after:
            "const data = {\n  id: domElement.id,\n  className: domElement.className,\n  text: domElement.textContent\n};\nJSON.stringify(data);",
          language: "javascript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "JSON 구조를 검증합니다.",
      },
    ],
    relatedErrors: ["json-depth-exceeded"],
    faq: [
      {
        question: "언제 순환 참조가 발생하나요?",
        answer:
          "DOM 요소, window 객체, 부모-자식 양방향 참조, 이벤트 핸들러가 있는 객체 등에서 흔히 발생합니다.",
      },
    ],
    keywords: [
      "json circular reference",
      "converting circular structure",
      "json stringify circular",
    ],
    searchVolume: 8000,
  },

  // ============================================
  // JavaScript 관련 오류
  // ============================================
  "js-undefined-is-not-a-function": {
    slug: "js-undefined-is-not-a-function",
    title: "undefined is not a function",
    errorMessage: "TypeError: undefined is not a function",
    description:
      "undefined 값을 함수처럼 호출하려고 할 때 발생하는 JavaScript 런타임 오류입니다.",
    category: "javascript",
    severity: "critical",
    icon: Code,
    cause:
      "존재하지 않는 함수 호출, 잘못된 메서드 이름, 또는 초기화되지 않은 변수를 함수로 호출",
    aiContext:
      "AI가 존재하지 않는 API를 사용하거나, 오타가 있는 메서드 이름을 생성하거나, 잘못된 라이브러리 버전의 API를 사용합니다.",
    fixSteps: [
      {
        title: "함수 이름 철자 확인",
        description: "메서드나 함수 이름의 철자가 정확한지 확인합니다.",
        code: {
          before: "array.mapp(x => x * 2)",
          after: "array.map(x => x * 2)",
          language: "javascript",
        },
      },
      {
        title: "함수 존재 여부 확인",
        description: "선택적 체이닝으로 안전하게 호출합니다.",
        code: {
          before: "obj.callback()",
          after: "obj.callback?.()",
          language: "javascript",
        },
      },
      {
        title: "import 확인",
        description: "필요한 함수가 제대로 import 되었는지 확인합니다.",
        code: {
          before: "import { someFunc } from 'library';",
          after: "import { someFunction } from 'library'; // 정확한 이름 확인",
          language: "javascript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "prettier-playground",
        reason: "코드 구조를 검증하고 오류를 사전에 감지합니다.",
      },
    ],
    relatedErrors: ["js-cannot-read-property-of-undefined"],
    faq: [
      {
        question: "이 오류가 특정 브라우저에서만 발생하면 어떻게 하나요?",
        answer:
          "브라우저별 API 지원 차이일 수 있습니다. polyfill을 추가하거나 브라우저 호환성을 확인하세요.",
      },
    ],
    keywords: [
      "undefined is not a function",
      "javascript function error",
      "cannot call undefined",
    ],
    searchVolume: 15000,
  },

  "js-cannot-read-property-of-undefined": {
    slug: "js-cannot-read-property-of-undefined",
    title: "Cannot read property of undefined",
    errorMessage: "TypeError: Cannot read property 'x' of undefined",
    description:
      "undefined 값의 속성에 접근하려고 할 때 발생하는 가장 흔한 JavaScript 오류입니다.",
    category: "javascript",
    severity: "critical",
    icon: Code,
    cause: "객체가 존재하지 않거나 초기화되지 않은 상태에서 속성에 접근",
    aiContext:
      "AI는 종종 데이터가 항상 존재한다고 가정하고 null 체크 없이 중첩 속성에 접근하는 코드를 생성합니다.",
    fixSteps: [
      {
        title: "선택적 체이닝 사용",
        description: "?. 연산자로 안전하게 중첩 속성에 접근합니다.",
        code: {
          before: "user.profile.name",
          after: "user?.profile?.name",
          language: "javascript",
        },
      },
      {
        title: "기본값 설정",
        description: "Nullish 병합 연산자로 기본값을 제공합니다.",
        code: {
          before: "const name = user.name;",
          after: 'const name = user?.name ?? "Unknown";',
          language: "javascript",
        },
      },
      {
        title: "조건부 렌더링",
        description: "React에서 조건부로 컴포넌트를 렌더링합니다.",
        code: {
          before: "<div>{data.items.map(...)}</div>",
          after: "<div>{data?.items?.map(...) ?? 'Loading...'}</div>",
          language: "jsx",
        },
      },
    ],
    relatedTools: [
      {
        slug: "prettier-playground",
        reason: "코드 최적화 중 잠재적 오류를 감지합니다.",
      },
    ],
    relatedErrors: ["js-undefined-is-not-a-function"],
    faq: [
      {
        question: "async/await에서 이 오류가 발생하면 어떻게 하나요?",
        answer:
          "API 응답이 예상과 다를 수 있습니다. try-catch로 감싸고 응답 구조를 검증하세요.",
      },
    ],
    keywords: [
      "cannot read property of undefined",
      "undefined error javascript",
      "null reference error",
    ],
    searchVolume: 25000,
  },

  "js-syntaxerror-unexpected-token": {
    slug: "js-syntaxerror-unexpected-token",
    title: "JavaScript Unexpected Token",
    errorMessage: "SyntaxError: Unexpected token",
    description:
      "JavaScript 코드에서 예상치 못한 문자나 토큰을 만났을 때 발생하는 구문 오류입니다.",
    category: "javascript",
    severity: "critical",
    icon: Code,
    cause:
      "잘못된 구문, 누락된 괄호/중괄호, 예약어 오용, 또는 지원되지 않는 문법",
    aiContext:
      "AI가 ES6+ 문법을 구버전 환경에서 사용하거나, 실험적 기능을 잘못 생성하거나, 괄호를 누락합니다.",
    fixSteps: [
      {
        title: "괄호 짝 확인",
        description: "모든 괄호, 중괄호, 대괄호의 짝이 맞는지 확인합니다.",
        code: {
          before: "function test( {\n  return true;\n}",
          after: "function test() {\n  return true;\n}",
          language: "javascript",
        },
      },
      {
        title: "콤마와 세미콜론 확인",
        description: "누락되거나 잘못된 구분자를 확인합니다.",
        code: {
          before: "const obj = { a: 1 b: 2 };",
          after: "const obj = { a: 1, b: 2 };",
          language: "javascript",
        },
      },
      {
        title: "예약어 확인",
        description: "예약어를 변수명으로 사용하지 않았는지 확인합니다.",
        code: {
          before: "const class = 'test';",
          after: "const className = 'test';",
          language: "javascript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "prettier-playground",
        reason: "구문 오류를 자동으로 감지합니다.",
      },
    ],
    relatedErrors: ["js-undefined-is-not-a-function"],
    faq: [
      {
        question: "import 문에서 이 오류가 발생하면?",
        answer:
          'Node.js에서 ES 모듈을 사용하려면 package.json에 "type": "module"을 추가하거나 .mjs 확장자를 사용하세요.',
      },
    ],
    keywords: [
      "javascript unexpected token",
      "syntax error javascript",
      "js parse error",
    ],
    searchVolume: 20000,
  },

  "js-referenceerror-not-defined": {
    slug: "js-referenceerror-not-defined",
    title: "JavaScript ReferenceError Not Defined",
    errorMessage: "ReferenceError: x is not defined",
    description:
      "존재하지 않는 변수나 함수를 참조할 때 발생하는 JavaScript 오류입니다.",
    category: "javascript",
    severity: "high",
    icon: Code,
    cause: "변수 선언 전 사용, 오타, 또는 스코프 외부에서 접근 시도",
    aiContext:
      "AI가 import 문을 생략하거나, 다른 파일에 정의된 변수를 참조하거나, 변수명에 오타가 있습니다.",
    fixSteps: [
      {
        title: "변수 선언 확인",
        description: "변수가 사용 전에 선언되었는지 확인합니다.",
        code: {
          before: "console.log(myVar);\nconst myVar = 'test';",
          after: "const myVar = 'test';\nconsole.log(myVar);",
          language: "javascript",
        },
      },
      {
        title: "import 문 추가",
        description: "외부 모듈이나 파일에서 필요한 것을 import합니다.",
        code: {
          before: "const result = lodash.map(arr, fn);",
          after:
            "import lodash from 'lodash';\nconst result = lodash.map(arr, fn);",
          language: "javascript",
        },
      },
      {
        title: "철자 확인",
        description: "변수명이나 함수명의 철자가 정확한지 확인합니다.",
        code: {
          before: "const lenght = arr.length;",
          after: "const length = arr.length;",
          language: "javascript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "diff-checker",
        reason: "코드 차이를 비교하여 오타를 발견합니다.",
      },
    ],
    relatedErrors: ["js-undefined-is-not-a-function"],
    faq: [
      {
        question: "window 객체에서 이 오류가 발생하면?",
        answer:
          "서버 사이드 렌더링(SSR) 환경에서는 window가 없습니다. typeof window !== 'undefined'로 체크하세요.",
      },
    ],
    keywords: [
      "javascript reference error",
      "variable not defined",
      "is not defined js",
    ],
    searchVolume: 18000,
  },

  "js-typeerror-null-property": {
    slug: "js-typeerror-null-property",
    title: "Cannot Read Property of Null",
    errorMessage: "TypeError: Cannot read property 'x' of null",
    description:
      "null 값의 속성에 접근하려고 할 때 발생하는 JavaScript 오류입니다.",
    category: "javascript",
    severity: "critical",
    icon: Code,
    cause:
      "null을 반환하는 DOM 쿼리, API 응답, 또는 명시적으로 null로 설정된 변수",
    aiContext:
      "AI가 document.querySelector가 null을 반환할 수 있다는 것을 고려하지 않거나, API 응답의 null 케이스를 처리하지 않습니다.",
    fixSteps: [
      {
        title: "null 체크 추가",
        description: "속성 접근 전 null 여부를 확인합니다.",
        code: {
          before:
            "const element = document.querySelector('.btn');\nelement.click();",
          after:
            "const element = document.querySelector('.btn');\nif (element) {\n  element.click();\n}",
          language: "javascript",
        },
      },
      {
        title: "선택적 체이닝 사용",
        description: "?. 연산자로 안전하게 접근합니다.",
        code: {
          before: "document.querySelector('.btn').click();",
          after: "document.querySelector('.btn')?.click();",
          language: "javascript",
        },
      },
      {
        title: "기본값 제공",
        description: "null일 경우 사용할 기본값을 설정합니다.",
        code: {
          before: "const name = user.name;",
          after: "const name = user?.name ?? 'Anonymous';",
          language: "javascript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "prettier-playground",
        reason: "코드 품질을 검증합니다.",
      },
    ],
    relatedErrors: ["js-cannot-read-property-of-undefined"],
    faq: [
      {
        question: "null과 undefined의 차이점은?",
        answer:
          "null은 명시적으로 '값 없음'을 나타내고, undefined는 선언되었지만 값이 할당되지 않은 상태입니다.",
      },
    ],
    keywords: [
      "cannot read property of null",
      "null error javascript",
      "null reference error",
    ],
    searchVolume: 22000,
  },

  "js-rangeerror-invalid-array-length": {
    slug: "js-rangeerror-invalid-array-length",
    title: "Invalid Array Length",
    errorMessage: "RangeError: Invalid array length",
    description:
      "배열에 유효하지 않은 길이를 설정하려고 할 때 발생하는 JavaScript 오류입니다.",
    category: "javascript",
    severity: "high",
    icon: Code,
    cause: "음수 길이, 정수가 아닌 길이, 또는 최대 배열 크기 초과",
    aiContext:
      "AI가 계산 결과를 검증하지 않고 배열 길이로 사용하거나, 잘못된 수식으로 음수를 생성합니다.",
    fixSteps: [
      {
        title: "길이 값 검증",
        description: "배열 길이가 유효한 양의 정수인지 확인합니다.",
        code: {
          before: "const arr = new Array(length);",
          after:
            "const safeLength = Math.max(0, Math.floor(length));\nconst arr = new Array(safeLength);",
          language: "javascript",
        },
      },
      {
        title: "Array.from 사용",
        description: "더 안전한 배열 생성 방법을 사용합니다.",
        code: {
          before: "new Array(-1)",
          after: "Array.from({ length: Math.max(0, value) }, (_, i) => i)",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-maximum-call-stack"],
    faq: [
      {
        question: "JavaScript 배열의 최대 크기는?",
        answer:
          "JavaScript 배열의 최대 길이는 2^32 - 1 (약 43억)이지만, 실제로는 메모리 제한이 더 빨리 적용됩니다.",
      },
    ],
    keywords: [
      "invalid array length",
      "rangeerror javascript",
      "array length error",
    ],
    searchVolume: 5000,
  },

  "js-maximum-call-stack": {
    slug: "js-maximum-call-stack",
    title: "Maximum Call Stack Size Exceeded",
    errorMessage: "RangeError: Maximum call stack size exceeded",
    description:
      "함수가 너무 많이 재귀 호출되어 스택 한계를 초과할 때 발생합니다.",
    category: "javascript",
    severity: "critical",
    icon: Code,
    cause: "무한 재귀, 종료 조건 없는 재귀 함수, 또는 순환 참조",
    aiContext:
      "AI가 재귀 함수의 종료 조건을 잘못 설정하거나, 무한 루프를 생성하거나, 상호 재귀 호출을 만듭니다.",
    fixSteps: [
      {
        title: "종료 조건 확인",
        description: "재귀 함수에 올바른 종료 조건이 있는지 확인합니다.",
        code: {
          before: "function factorial(n) {\n  return n * factorial(n - 1);\n}",
          after:
            "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}",
          language: "javascript",
        },
      },
      {
        title: "반복문으로 변환",
        description: "깊은 재귀는 반복문으로 변환합니다.",
        code: {
          before:
            "function sum(arr, i = 0) {\n  if (i >= arr.length) return 0;\n  return arr[i] + sum(arr, i + 1);\n}",
          after:
            "function sum(arr) {\n  return arr.reduce((acc, val) => acc + val, 0);\n}",
          language: "javascript",
        },
      },
      {
        title: "트램펄린 패턴 사용",
        description: "꼬리 재귀를 트램펄린으로 최적화합니다.",
        code: {
          before: "function deepRecurse(n) { return deepRecurse(n - 1); }",
          after:
            "function trampoline(fn) {\n  return (...args) => {\n    let result = fn(...args);\n    while (typeof result === 'function') {\n      result = result();\n    }\n    return result;\n  };\n}",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["json-depth-exceeded"],
    faq: [
      {
        question: "콜 스택의 최대 크기는 얼마인가요?",
        answer:
          "브라우저마다 다르지만 일반적으로 10,000~50,000개입니다. Chrome은 약 10,000개, Firefox는 약 50,000개입니다.",
      },
    ],
    keywords: [
      "maximum call stack",
      "stack overflow javascript",
      "infinite recursion",
    ],
    searchVolume: 15000,
  },

  "js-cors-error": {
    slug: "js-cors-error",
    title: "CORS Policy Error",
    errorMessage:
      "Access to fetch has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header",
    description:
      "브라우저의 동일 출처 정책으로 인해 다른 도메인의 리소스에 접근이 차단될 때 발생합니다.",
    category: "javascript",
    severity: "high",
    icon: Code,
    cause:
      "서버에서 CORS 헤더를 설정하지 않았거나, 허용되지 않은 도메인에서 요청",
    aiContext:
      "AI가 CORS 설정 없이 외부 API를 직접 호출하거나, 프록시 없이 프론트엔드에서 직접 요청합니다.",
    fixSteps: [
      {
        title: "서버에 CORS 헤더 추가",
        description: "API 서버에 적절한 CORS 헤더를 설정합니다.",
        code: {
          before: "// 서버 응답에 CORS 헤더 없음",
          after:
            "// Express.js 예시\napp.use(cors({\n  origin: 'https://your-domain.com'\n}));",
          language: "javascript",
        },
      },
      {
        title: "프록시 서버 사용",
        description: "개발 환경에서 프록시를 설정합니다.",
        code: {
          before: "fetch('https://external-api.com/data')",
          after:
            "// vite.config.js\nserver: {\n  proxy: {\n    '/api': {\n      target: 'https://external-api.com',\n      changeOrigin: true\n    }\n  }\n}",
          language: "javascript",
        },
      },
      {
        title: "서버리스 함수 사용",
        description: "백엔드에서 API를 호출하고 결과를 전달합니다.",
        code: {
          before: "// 클라이언트에서 직접 호출",
          after:
            "// Next.js API Route\nexport default async function handler(req, res) {\n  const data = await fetch('https://external-api.com/data');\n  res.json(await data.json());\n}",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-fetch-failed"],
    faq: [
      {
        question: "개발 중에 CORS를 우회할 수 있나요?",
        answer:
          "브라우저 확장 프로그램이나 --disable-web-security 플래그로 가능하지만, 프로덕션에서는 반드시 적절한 CORS 설정을 해야 합니다.",
      },
    ],
    keywords: [
      "cors error",
      "cors policy blocked",
      "access control allow origin",
    ],
    searchVolume: 30000,
  },

  "js-fetch-failed": {
    slug: "js-fetch-failed",
    title: "Fetch Failed Error",
    errorMessage: "TypeError: Failed to fetch",
    description:
      "네트워크 요청이 실패했을 때 발생하는 오류입니다. 다양한 원인이 있을 수 있습니다.",
    category: "javascript",
    severity: "high",
    icon: Code,
    cause:
      "네트워크 연결 끊김, 잘못된 URL, CORS 오류, 서버 다운, 또는 HTTPS 문제",
    aiContext:
      "AI가 존재하지 않는 엔드포인트를 호출하거나, 네트워크 오류 처리를 생략합니다.",
    fixSteps: [
      {
        title: "URL 확인",
        description: "요청 URL이 올바른지 확인합니다.",
        code: {
          before: "fetch('htps://api.example.com/data')",
          after: "fetch('https://api.example.com/data')",
          language: "javascript",
        },
      },
      {
        title: "에러 처리 추가",
        description: "try-catch로 네트워크 오류를 처리합니다.",
        code: {
          before: "const data = await fetch(url).then(r => r.json());",
          after:
            "try {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n} catch (error) {\n  console.error('Fetch failed:', error);\n}",
          language: "javascript",
        },
      },
      {
        title: "타임아웃 설정",
        description: "AbortController로 요청 타임아웃을 설정합니다.",
        code: {
          before: "fetch(url)",
          after:
            "const controller = new AbortController();\nconst timeoutId = setTimeout(() => controller.abort(), 5000);\nfetch(url, { signal: controller.signal })\n  .finally(() => clearTimeout(timeoutId));",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-cors-error"],
    faq: [
      {
        question: "localhost에서만 fetch가 실패하는 이유는?",
        answer:
          "HTTPS 사이트에서 HTTP localhost를 호출하면 mixed content 오류가 발생합니다. HTTPS로 로컬 서버를 실행하세요.",
      },
    ],
    keywords: [
      "failed to fetch",
      "fetch error javascript",
      "network error fetch",
    ],
    searchVolume: 12000,
  },

  "js-promise-unhandled-rejection": {
    slug: "js-promise-unhandled-rejection",
    title: "Unhandled Promise Rejection",
    errorMessage:
      "UnhandledPromiseRejectionWarning: Unhandled promise rejection",
    description:
      "Promise가 reject되었지만 catch 핸들러가 없을 때 발생하는 경고/오류입니다.",
    category: "javascript",
    severity: "high",
    icon: Code,
    cause: "Promise의 reject가 처리되지 않음, catch 블록 누락",
    aiContext:
      "AI가 async 함수에서 try-catch를 생략하거나, Promise 체인에서 .catch()를 누락합니다.",
    fixSteps: [
      {
        title: "catch 핸들러 추가",
        description: "Promise 체인에 .catch()를 추가합니다.",
        code: {
          before:
            "fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data));",
          after:
            "fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));",
          language: "javascript",
        },
      },
      {
        title: "try-catch 사용",
        description: "async/await와 함께 try-catch를 사용합니다.",
        code: {
          before:
            "async function getData() {\n  const data = await fetch(url);\n}",
          after:
            "async function getData() {\n  try {\n    const data = await fetch(url);\n  } catch (error) {\n    console.error('Failed:', error);\n  }\n}",
          language: "javascript",
        },
      },
      {
        title: "전역 핸들러 설정",
        description: "처리되지 않은 rejection을 전역으로 캐치합니다.",
        code: {
          before: "// 처리되지 않은 rejection이 무시됨",
          after:
            "window.addEventListener('unhandledrejection', event => {\n  console.error('Unhandled rejection:', event.reason);\n  event.preventDefault();\n});",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-fetch-failed"],
    faq: [
      {
        question: "Node.js에서 이 경고가 프로세스를 종료시키나요?",
        answer:
          "Node.js 15+에서는 처리되지 않은 rejection이 프로세스를 종료시킵니다. --unhandled-rejections=warn 플래그로 동작을 변경할 수 있습니다.",
      },
    ],
    keywords: [
      "unhandled promise rejection",
      "promise catch error",
      "async error handling",
    ],
    searchVolume: 10000,
  },

  "js-module-not-found": {
    slug: "js-module-not-found",
    title: "Module Not Found Error",
    errorMessage: "Error: Cannot find module 'x'",
    description:
      "import하려는 모듈이나 파일을 찾을 수 없을 때 발생하는 오류입니다.",
    category: "javascript",
    severity: "high",
    icon: Code,
    cause: "패키지 미설치, 잘못된 경로, 파일 확장자 누락, 또는 오타",
    aiContext:
      "AI가 설치되지 않은 패키지를 import하거나, 존재하지 않는 파일 경로를 사용합니다.",
    fixSteps: [
      {
        title: "패키지 설치",
        description: "필요한 npm 패키지를 설치합니다.",
        code: {
          before: "import lodash from 'lodash'; // Error",
          after: "npm install lodash\n// 그 다음\nimport lodash from 'lodash';",
          language: "javascript",
        },
      },
      {
        title: "경로 확인",
        description: "상대 경로가 올바른지 확인합니다.",
        code: {
          before: "import { utils } from './util';",
          after: "import { utils } from './utils'; // 정확한 파일명",
          language: "javascript",
        },
      },
      {
        title: "확장자 추가",
        description: "필요한 경우 파일 확장자를 명시합니다.",
        code: {
          before: "import config from './config';",
          after: "import config from './config.js';",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-referenceerror-not-defined"],
    faq: [
      {
        question: "node_modules 폴더가 있는데도 오류가 발생하면?",
        answer:
          "node_modules를 삭제하고 npm install을 다시 실행하세요. package-lock.json도 함께 삭제하면 더 깔끔합니다.",
      },
    ],
    keywords: [
      "cannot find module",
      "module not found",
      "import error javascript",
    ],
    searchVolume: 15000,
  },

  "js-invalid-left-hand-side": {
    slug: "js-invalid-left-hand-side",
    title: "Invalid Left-Hand Side in Assignment",
    errorMessage: "SyntaxError: Invalid left-hand side in assignment",
    description:
      "할당 연산자의 왼쪽에 유효하지 않은 표현식이 올 때 발생하는 오류입니다.",
    category: "javascript",
    severity: "medium",
    icon: Code,
    cause: "상수에 재할당, 리터럴에 할당 시도, 또는 연산자 혼동 (= vs ==)",
    aiContext:
      "AI가 조건문에서 = 대신 ==를 사용해야 할 때 실수하거나, const 변수에 재할당합니다.",
    fixSteps: [
      {
        title: "할당 vs 비교 확인",
        description: "조건문에서 = 대신 == 또는 ===를 사용합니다.",
        code: {
          before: "if (x = 5) { }",
          after: "if (x === 5) { }",
          language: "javascript",
        },
      },
      {
        title: "const를 let으로 변경",
        description: "재할당이 필요하면 let을 사용합니다.",
        code: {
          before: "const count = 0;\ncount = 1; // Error",
          after: "let count = 0;\ncount = 1; // OK",
          language: "javascript",
        },
      },
      {
        title: "증감 연산자 확인",
        description: "증감 연산자가 올바른 피연산자에 적용되었는지 확인합니다.",
        code: {
          before: "array.length++ = 5; // Error",
          after: "array.push(5); // 또는 array.length = array.length + 1;",
          language: "javascript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "prettier-playground",
        reason: "코드 포맷팅과 구문 검사를 수행합니다.",
      },
    ],
    relatedErrors: ["js-syntaxerror-unexpected-token"],
    faq: [
      {
        question: "의도적으로 할당을 조건에 쓰려면?",
        answer:
          "괄호로 감싸면 됩니다: if ((result = getValue())) { }. 하지만 가독성을 위해 분리하는 것이 좋습니다.",
      },
    ],
    keywords: [
      "invalid left-hand side",
      "assignment error",
      "cannot assign to",
    ],
    searchVolume: 6000,
  },

  // ============================================
  // TypeScript 관련 오류
  // ============================================
  "ts-type-not-assignable": {
    slug: "ts-type-not-assignable",
    title: "Type is not assignable to type",
    errorMessage: "Type 'X' is not assignable to type 'Y'",
    description:
      "TypeScript에서 호환되지 않는 타입을 할당하려고 할 때 발생하는 타입 오류입니다.",
    category: "typescript",
    severity: "high",
    icon: FileCode,
    cause: "변수나 파라미터에 호환되지 않는 타입의 값을 할당",
    aiContext:
      "AI는 JavaScript 스타일 코드를 생성하거나, 타입 정의를 생략하거나, 잘못된 타입 추론에 의존합니다.",
    fixSteps: [
      {
        title: "타입 명시적 선언",
        description: "변수에 올바른 타입을 명시합니다.",
        code: {
          before: "const items = [];",
          after: "const items: string[] = [];",
          language: "typescript",
        },
      },
      {
        title: "타입 단언 사용",
        description: "확실할 때 타입 단언을 사용합니다.",
        code: {
          before: "const data = response.json();",
          after: "const data = response.json() as ResponseType;",
          language: "typescript",
        },
      },
      {
        title: "유니온 타입 고려",
        description: "여러 타입이 가능한 경우 유니온 타입을 사용합니다.",
        code: {
          before: "function process(input: string) {}",
          after: "function process(input: string | number) {}",
          language: "typescript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-to-typescript",
        reason: "JavaScript를 TypeScript로 안전하게 변환합니다.",
      },
    ],
    relatedErrors: [],
    faq: [
      {
        question: "any 타입을 사용해도 되나요?",
        answer:
          "any는 타입 체크를 우회하므로 권장하지 않습니다. unknown 타입과 타입 가드를 사용하세요.",
      },
    ],
    keywords: [
      "type not assignable typescript",
      "typescript type error",
      "incompatible types",
    ],
    searchVolume: 18000,
  },

  "ts-property-does-not-exist": {
    slug: "ts-property-does-not-exist",
    title: "Property Does Not Exist on Type",
    errorMessage: "Property 'x' does not exist on type 'Y'",
    description:
      "타입에 정의되지 않은 속성에 접근하려고 할 때 발생하는 TypeScript 오류입니다.",
    category: "typescript",
    severity: "high",
    icon: FileCode,
    cause: "타입 정의에 없는 속성 접근, 오타, 또는 타입 정의가 불완전한 경우",
    aiContext:
      "AI가 타입 정의를 확인하지 않고 속성에 접근하거나, 외부 라이브러리의 타입을 잘못 추론합니다.",
    fixSteps: [
      {
        title: "타입에 속성 추가",
        description: "인터페이스나 타입에 필요한 속성을 추가합니다.",
        code: {
          before:
            "interface User {\n  name: string;\n}\nconst user: User = { name: 'John', age: 30 };",
          after:
            "interface User {\n  name: string;\n  age: number;\n}\nconst user: User = { name: 'John', age: 30 };",
          language: "typescript",
        },
      },
      {
        title: "인덱스 시그니처 추가",
        description: "동적 속성을 허용하는 인덱스 시그니처를 추가합니다.",
        code: {
          before: "interface Data {\n  id: number;\n}",
          after:
            "interface Data {\n  id: number;\n  [key: string]: unknown;\n}",
          language: "typescript",
        },
      },
      {
        title: "타입 가드 사용",
        description: "런타임에 속성 존재 여부를 확인합니다.",
        code: {
          before: "console.log(obj.customProp);",
          after:
            "if ('customProp' in obj) {\n  console.log(obj.customProp);\n}",
          language: "typescript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-to-typescript",
        reason: "JSON에서 TypeScript 타입을 자동 생성합니다.",
      },
    ],
    relatedErrors: ["ts-type-not-assignable"],
    faq: [
      {
        question: "window 객체에 커스텀 속성을 추가하려면?",
        answer:
          "declare global { interface Window { myProp: string; } }를 사용하여 Window 인터페이스를 확장하세요.",
      },
    ],
    keywords: [
      "property does not exist",
      "typescript property error",
      "unknown property",
    ],
    searchVolume: 20000,
  },

  "ts-argument-type-not-assignable": {
    slug: "ts-argument-type-not-assignable",
    title: "Argument Type Not Assignable",
    errorMessage:
      "Argument of type 'X' is not assignable to parameter of type 'Y'",
    description:
      "함수 인자의 타입이 매개변수 타입과 호환되지 않을 때 발생하는 오류입니다.",
    category: "typescript",
    severity: "high",
    icon: FileCode,
    cause: "함수 호출 시 잘못된 타입의 인자 전달",
    aiContext:
      "AI가 함수 시그니처를 확인하지 않고 인자를 전달하거나, 타입 변환을 생략합니다.",
    fixSteps: [
      {
        title: "올바른 타입으로 변환",
        description: "인자를 예상 타입으로 변환합니다.",
        code: {
          before: "processNumber('42');",
          after: "processNumber(parseInt('42', 10));",
          language: "typescript",
        },
      },
      {
        title: "타입 단언 사용",
        description: "확실한 경우 타입 단언을 사용합니다.",
        code: {
          before: "handleEvent(event);",
          after: "handleEvent(event as MouseEvent);",
          language: "typescript",
        },
      },
      {
        title: "함수 오버로드 추가",
        description: "여러 타입을 받을 수 있도록 오버로드를 정의합니다.",
        code: {
          before: "function process(input: string): void { }",
          after:
            "function process(input: string): void;\nfunction process(input: number): void;\nfunction process(input: string | number): void { }",
          language: "typescript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["ts-type-not-assignable"],
    faq: [
      {
        question: "콜백 함수의 인자 타입 오류는 어떻게 해결하나요?",
        answer:
          "콜백 함수의 매개변수 타입을 명시적으로 지정하거나, 제네릭을 사용하여 타입을 추론하게 하세요.",
      },
    ],
    keywords: [
      "argument type not assignable",
      "parameter type error",
      "typescript function argument",
    ],
    searchVolume: 15000,
  },

  "ts-object-is-possibly-undefined": {
    slug: "ts-object-is-possibly-undefined",
    title: "Object is Possibly Undefined",
    errorMessage: "Object is possibly 'undefined'",
    description:
      "undefined일 수 있는 값에 안전하지 않게 접근할 때 발생하는 TypeScript 오류입니다.",
    category: "typescript",
    severity: "medium",
    icon: FileCode,
    cause: "선택적 속성이나 nullable 값에 대한 안전하지 않은 접근",
    aiContext:
      "AI가 strictNullChecks를 고려하지 않고 코드를 생성하거나, optional 속성을 필수로 가정합니다.",
    fixSteps: [
      {
        title: "선택적 체이닝 사용",
        description: "?. 연산자로 안전하게 접근합니다.",
        code: {
          before: "const name = user.profile.name;",
          after: "const name = user?.profile?.name;",
          language: "typescript",
        },
      },
      {
        title: "Non-null 단언 사용",
        description: "확실히 존재할 때 ! 연산자를 사용합니다.",
        code: {
          before:
            "const item = array.find(x => x.id === 1);\nconsole.log(item.name);",
          after:
            "const item = array.find(x => x.id === 1);\nconsole.log(item!.name); // 확실할 때만",
          language: "typescript",
        },
      },
      {
        title: "타입 가드 사용",
        description: "조건문으로 타입을 좁힙니다.",
        code: {
          before: "console.log(value.length);",
          after: "if (value !== undefined) {\n  console.log(value.length);\n}",
          language: "typescript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["ts-property-does-not-exist"],
    faq: [
      {
        question: "strictNullChecks를 끄면 해결되나요?",
        answer:
          "기술적으로는 가능하지만 권장하지 않습니다. null/undefined 오류를 런타임이 아닌 컴파일 타임에 잡는 것이 좋습니다.",
      },
    ],
    keywords: [
      "object possibly undefined",
      "possibly null",
      "typescript null check",
    ],
    searchVolume: 12000,
  },

  "ts-cannot-find-module": {
    slug: "ts-cannot-find-module",
    title: "Cannot Find Module",
    errorMessage:
      "Cannot find module 'x' or its corresponding type declarations",
    description:
      "모듈을 찾을 수 없거나 타입 선언이 없을 때 발생하는 TypeScript 오류입니다.",
    category: "typescript",
    severity: "high",
    icon: FileCode,
    cause: "패키지 미설치, @types 패키지 누락, 또는 잘못된 모듈 경로",
    aiContext:
      "AI가 설치되지 않은 패키지를 import하거나, 타입 선언 패키지가 필요한지 확인하지 않습니다.",
    fixSteps: [
      {
        title: "타입 패키지 설치",
        description: "@types 패키지를 설치합니다.",
        code: {
          before: "import express from 'express'; // 타입 오류",
          after:
            "npm install --save-dev @types/express\n// 또는\nnpm install express @types/express",
          language: "bash",
        },
      },
      {
        title: "타입 선언 파일 생성",
        description: "타입이 없는 모듈에 대한 선언을 추가합니다.",
        code: {
          before: "import something from 'untyped-package';",
          after:
            "// types/untyped-package.d.ts\ndeclare module 'untyped-package' {\n  const content: any;\n  export default content;\n}",
          language: "typescript",
        },
      },
      {
        title: "tsconfig paths 설정",
        description: "모듈 경로 별칭을 설정합니다.",
        code: {
          before: "import { utils } from '../../../shared/utils';",
          after:
            '// tsconfig.json\n{\n  "compilerOptions": {\n    "paths": {\n      "@/*": ["./src/*"]\n    }\n  }\n}\n// 사용\nimport { utils } from \'@/shared/utils\';',
          language: "json",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-module-not-found"],
    faq: [
      {
        question: ".d.ts 파일이란?",
        answer:
          "TypeScript 선언 파일로, JavaScript 라이브러리에 대한 타입 정보를 제공합니다. @types/ 패키지가 이 파일들을 포함합니다.",
      },
    ],
    keywords: [
      "cannot find module typescript",
      "module declaration",
      "types not found",
    ],
    searchVolume: 16000,
  },

  "ts-no-overload-matches": {
    slug: "ts-no-overload-matches",
    title: "No Overload Matches This Call",
    errorMessage: "No overload matches this call",
    description:
      "함수 호출이 어떤 오버로드 시그니처와도 일치하지 않을 때 발생합니다.",
    category: "typescript",
    severity: "medium",
    icon: FileCode,
    cause: "함수 오버로드에 정의되지 않은 인자 조합으로 호출",
    aiContext:
      "AI가 라이브러리 함수의 모든 오버로드를 파악하지 못하고 잘못된 인자를 전달합니다.",
    fixSteps: [
      {
        title: "올바른 시그니처 확인",
        description: "함수의 오버로드 시그니처를 확인합니다.",
        code: {
          before: "element.addEventListener('click', handler, true, false);",
          after:
            "element.addEventListener('click', handler, { capture: true });",
          language: "typescript",
        },
      },
      {
        title: "인자 순서 확인",
        description: "인자의 순서가 올바른지 확인합니다.",
        code: {
          before: "fs.writeFile(data, 'file.txt', callback);",
          after: "fs.writeFile('file.txt', data, callback);",
          language: "typescript",
        },
      },
      {
        title: "옵션 객체 사용",
        description: "여러 옵션은 객체로 전달합니다.",
        code: {
          before: "fetch(url, 'POST', headers);",
          after: "fetch(url, { method: 'POST', headers });",
          language: "typescript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["ts-argument-type-not-assignable"],
    faq: [
      {
        question: "오버로드가 많은 함수는 어떻게 사용하나요?",
        answer:
          "IDE의 자동완성이나 문서를 참고하세요. 마우스를 올리면 가능한 시그니처들이 표시됩니다.",
      },
    ],
    keywords: [
      "no overload matches",
      "function overload error",
      "typescript overload",
    ],
    searchVolume: 8000,
  },

  "ts-implicit-any": {
    slug: "ts-implicit-any",
    title: "Parameter Implicitly Has Any Type",
    errorMessage: "Parameter 'x' implicitly has an 'any' type",
    description:
      "타입이 명시되지 않아 any로 추론될 때 발생하는 TypeScript 오류입니다.",
    category: "typescript",
    severity: "medium",
    icon: FileCode,
    cause: "noImplicitAny 옵션이 켜져 있을 때 타입 미지정",
    aiContext:
      "AI가 JavaScript 스타일로 타입 없이 코드를 생성하거나, 제네릭을 생략합니다.",
    fixSteps: [
      {
        title: "타입 명시",
        description: "매개변수에 명시적 타입을 추가합니다.",
        code: {
          before: "function greet(name) {\n  return `Hello, ${name}`;\n}",
          after:
            "function greet(name: string): string {\n  return `Hello, ${name}`;\n}",
          language: "typescript",
        },
      },
      {
        title: "화살표 함수 타입 지정",
        description: "화살표 함수에도 타입을 명시합니다.",
        code: {
          before: "const handler = (event) => { };",
          after: "const handler = (event: MouseEvent): void => { };",
          language: "typescript",
        },
      },
      {
        title: "콜백 타입 정의",
        description: "콜백 함수의 타입을 별도로 정의합니다.",
        code: {
          before: "array.map(item => item.value);",
          after:
            "type Item = { value: number };\narray.map((item: Item) => item.value);",
          language: "typescript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-to-typescript",
        reason: "데이터에서 타입을 자동 생성합니다.",
      },
    ],
    relatedErrors: ["ts-type-not-assignable"],
    faq: [
      {
        question: "noImplicitAny를 끄면 해결되나요?",
        answer:
          "가능하지만 타입 안전성이 크게 감소합니다. 타입을 명시하는 것이 좋습니다.",
      },
    ],
    keywords: [
      "implicit any typescript",
      "noImplicitAny error",
      "typescript any type",
    ],
    searchVolume: 10000,
  },

  "ts-missing-properties": {
    slug: "ts-missing-properties",
    title: "Missing Required Properties",
    errorMessage: "Type '{}' is missing the following properties: x, y, z",
    description:
      "필수 속성이 누락된 객체를 할당하려고 할 때 발생하는 TypeScript 오류입니다.",
    category: "typescript",
    severity: "high",
    icon: FileCode,
    cause: "인터페이스에서 요구하는 필수 속성이 객체에 없음",
    aiContext:
      "AI가 인터페이스의 모든 필수 속성을 포함하지 않고 객체를 생성합니다.",
    fixSteps: [
      {
        title: "누락된 속성 추가",
        description: "필수 속성을 객체에 추가합니다.",
        code: {
          before:
            "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\nconst user: User = { id: 1 };",
          after:
            "const user: User = {\n  id: 1,\n  name: 'John',\n  email: 'john@example.com'\n};",
          language: "typescript",
        },
      },
      {
        title: "선택적 속성으로 변경",
        description: "인터페이스에서 속성을 선택적으로 만듭니다.",
        code: {
          before: "interface Config {\n  host: string;\n  port: number;\n}",
          after:
            "interface Config {\n  host: string;\n  port?: number; // 선택적\n}",
          language: "typescript",
        },
      },
      {
        title: "Partial 유틸리티 사용",
        description: "모든 속성을 선택적으로 만듭니다.",
        code: {
          before: "const partial: User = { name: 'John' };",
          after: "const partial: Partial<User> = { name: 'John' };",
          language: "typescript",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-to-typescript",
        reason: "올바른 타입 구조를 생성합니다.",
      },
    ],
    relatedErrors: ["ts-type-not-assignable"],
    faq: [
      {
        question: "Partial과 Required의 차이는?",
        answer:
          "Partial<T>는 모든 속성을 선택적으로, Required<T>는 모든 속성을 필수로 만듭니다.",
      },
    ],
    keywords: [
      "missing properties typescript",
      "required property",
      "typescript interface error",
    ],
    searchVolume: 14000,
  },

  "ts-generic-constraint": {
    slug: "ts-generic-constraint",
    title: "Generic Type Constraint Error",
    errorMessage: "Type 'X' does not satisfy the constraint 'Y'",
    description:
      "제네릭 타입이 정의된 제약 조건을 만족하지 않을 때 발생합니다.",
    category: "typescript",
    severity: "medium",
    icon: FileCode,
    cause: "제네릭 타입 매개변수가 extends 제약 조건을 충족하지 않음",
    aiContext: "AI가 제네릭 제약 조건을 무시하고 잘못된 타입을 전달합니다.",
    fixSteps: [
      {
        title: "제약 조건 확인",
        description: "제네릭이 요구하는 제약 조건을 확인합니다.",
        code: {
          before:
            "function getLength<T>(arg: T): number {\n  return arg.length; // Error\n}",
          after:
            "function getLength<T extends { length: number }>(arg: T): number {\n  return arg.length;\n}",
          language: "typescript",
        },
      },
      {
        title: "올바른 타입 사용",
        description: "제약 조건을 만족하는 타입을 사용합니다.",
        code: {
          before:
            "interface HasId { id: number }\nfunction process<T extends HasId>(item: T) { }\nprocess({ name: 'test' }); // Error",
          after: "process({ id: 1, name: 'test' }); // OK",
          language: "typescript",
        },
      },
      {
        title: "제약 조건 완화",
        description: "필요하다면 제약 조건을 더 유연하게 정의합니다.",
        code: {
          before: "function log<T extends string>(value: T) { }",
          after: "function log<T extends string | number>(value: T) { }",
          language: "typescript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["ts-type-not-assignable"],
    faq: [
      {
        question: "extends는 상속과 같은 의미인가요?",
        answer:
          "제네릭에서 extends는 '~를 포함해야 함'이라는 제약 조건입니다. 상속이 아닌 타입 호환성을 의미합니다.",
      },
    ],
    keywords: [
      "generic constraint typescript",
      "type does not satisfy constraint",
      "typescript generics error",
    ],
    searchVolume: 7000,
  },

  // ============================================
  // React 관련 오류
  // ============================================
  "react-hooks-rules-violation": {
    slug: "react-hooks-rules-violation",
    title: "React Hooks Rules Violation",
    errorMessage: "React Hook is called conditionally or in a loop",
    description:
      "React Hooks 규칙을 위반했을 때 발생하는 오류입니다. 조건문이나 반복문 안에서 Hook을 호출하면 발생합니다.",
    category: "react",
    severity: "critical",
    icon: Component,
    cause: "Hooks가 조건문, 반복문, 중첩 함수 안에서 호출됨",
    aiContext:
      "AI는 종종 조건부 로직 안에 Hooks를 배치하거나, 커스텀 Hook이 아닌 일반 함수 안에서 Hooks를 사용합니다.",
    fixSteps: [
      {
        title: "조건문 밖으로 Hook 이동",
        description: "Hook은 컴포넌트 최상위에서만 호출해야 합니다.",
        code: {
          before:
            "if (condition) {\n  const [state, setState] = useState(0);\n}",
          after:
            "const [state, setState] = useState(0);\nif (condition) {\n  // state 사용\n}",
          language: "jsx",
        },
      },
      {
        title: "조건부 effect는 내부에서 처리",
        description: "조건은 useEffect 콜백 내부에서 처리합니다.",
        code: {
          before: "if (shouldFetch) {\n  useEffect(() => { fetch() }, []);\n}",
          after:
            "useEffect(() => {\n  if (shouldFetch) { fetch(); }\n}, [shouldFetch]);",
          language: "jsx",
        },
      },
    ],
    relatedTools: [
      { slug: "regex-tester", reason: "Hook 패턴 검증에 활용할 수 있습니다." },
    ],
    relatedErrors: ["react-key-prop-missing"],
    faq: [
      {
        question: "왜 조건문 안에서 Hook을 쓰면 안 되나요?",
        answer:
          "React는 Hook 호출 순서로 상태를 추적합니다. 조건에 따라 호출 순서가 바뀌면 상태가 잘못 매핑됩니다.",
      },
    ],
    keywords: [
      "react hooks rules",
      "conditional hook",
      "hooks in loop",
      "invalid hook call",
    ],
    searchVolume: 10000,
  },

  "react-key-prop-missing": {
    slug: "react-key-prop-missing",
    title: "Missing key prop in list",
    errorMessage:
      'Warning: Each child in a list should have a unique "key" prop',
    description:
      "배열을 렌더링할 때 각 요소에 고유한 key prop이 없을 때 발생하는 React 경고입니다.",
    category: "react",
    severity: "medium",
    icon: Component,
    cause: "리스트 렌더링 시 각 항목에 고유한 key prop 미제공",
    aiContext:
      "AI는 종종 key prop을 생략하거나, 배열 인덱스를 key로 사용하는 비권장 패턴을 생성합니다.",
    fixSteps: [
      {
        title: "고유 ID를 key로 사용",
        description: "데이터의 고유 식별자를 key로 사용합니다.",
        code: {
          before: "items.map(item => <Item {...item} />)",
          after: "items.map(item => <Item key={item.id} {...item} />)",
          language: "jsx",
        },
      },
      {
        title: "인덱스 사용 지양",
        description: "정적 리스트가 아니라면 인덱스를 key로 사용하지 마세요.",
        code: {
          before: "items.map((item, index) => <Item key={index} {...item} />)",
          after: "items.map(item => <Item key={item.id} {...item} />)",
          language: "jsx",
        },
      },
    ],
    relatedTools: [
      { slug: "uuid-generator", reason: "고유 ID 생성에 활용할 수 있습니다." },
    ],
    relatedErrors: ["react-hooks-rules-violation"],
    faq: [
      {
        question: "언제 인덱스를 key로 사용해도 되나요?",
        answer:
          "항목이 재정렬되지 않고, 추가/삭제되지 않는 정적 리스트에서만 인덱스를 사용해도 됩니다.",
      },
    ],
    keywords: ["react key prop", "list key warning", "unique key react"],
    searchVolume: 8000,
  },

  "react-too-many-rerenders": {
    slug: "react-too-many-rerenders",
    title: "Too Many Re-renders",
    errorMessage: "Too many re-renders. React limits the number of renders",
    description:
      "무한 렌더링 루프가 발생할 때 React가 보호 조치로 렌더링을 중단시키는 오류입니다.",
    category: "react",
    severity: "critical",
    icon: Component,
    cause:
      "렌더링 중 setState 호출, useEffect 의존성 배열 문제, 또는 이벤트 핸들러 잘못 바인딩",
    aiContext:
      "AI가 렌더링 중에 setState를 직접 호출하거나, useEffect 의존성을 잘못 설정합니다.",
    fixSteps: [
      {
        title: "렌더링 중 setState 제거",
        description: "컴포넌트 본문에서 setState를 직접 호출하지 않습니다.",
        code: {
          before:
            "function Counter() {\n  const [count, setCount] = useState(0);\n  setCount(count + 1); // Error!\n  return <div>{count}</div>;\n}",
          after:
            "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      {count}\n    </button>\n  );\n}",
          language: "jsx",
        },
      },
      {
        title: "이벤트 핸들러 바인딩 수정",
        description: "함수 호출이 아닌 함수 참조를 전달합니다.",
        code: {
          before: "<button onClick={setCount(count + 1)}>Click</button>",
          after: "<button onClick={() => setCount(count + 1)}>Click</button>",
          language: "jsx",
        },
      },
      {
        title: "useEffect 의존성 확인",
        description:
          "useEffect 내에서 의존성으로 설정한 값을 변경하지 않습니다.",
        code: {
          before:
            "useEffect(() => {\n  setData(fetchData());\n}, [data]); // data 변경 → effect 실행 → data 변경 → ...",
          after:
            "useEffect(() => {\n  setData(fetchData());\n}, []); // 마운트 시 한 번만 실행",
          language: "jsx",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["react-hooks-rules-violation"],
    faq: [
      {
        question: "렌더링 횟수 제한은 몇 회인가요?",
        answer:
          "정확한 숫자는 React 버전에 따라 다르지만, 일반적으로 50회 이상의 연속 렌더링에서 발생합니다.",
      },
    ],
    keywords: [
      "too many re-renders",
      "infinite loop react",
      "render limit exceeded",
    ],
    searchVolume: 15000,
  },

  "react-invalid-hook-call": {
    slug: "react-invalid-hook-call",
    title: "Invalid Hook Call",
    errorMessage:
      "Invalid hook call. Hooks can only be called inside of the body of a function component",
    description:
      "Hook을 잘못된 위치에서 호출했을 때 발생하는 React 오류입니다.",
    category: "react",
    severity: "critical",
    icon: Component,
    cause:
      "일반 함수에서 Hook 호출, React 버전 불일치, 또는 여러 개의 React 복사본",
    aiContext:
      "AI가 커스텀 Hook이 아닌 일반 함수에서 Hook을 사용하거나, 클래스 컴포넌트에서 Hook을 호출합니다.",
    fixSteps: [
      {
        title: "함수 컴포넌트로 변환",
        description: "Hook은 함수 컴포넌트에서만 사용할 수 있습니다.",
        code: {
          before:
            "class MyComponent extends React.Component {\n  render() {\n    const [state] = useState(0); // Error!\n  }\n}",
          after:
            "function MyComponent() {\n  const [state, setState] = useState(0);\n  return <div>{state}</div>;\n}",
          language: "jsx",
        },
      },
      {
        title: "커스텀 Hook으로 추출",
        description:
          "일반 함수에서 Hook을 사용하려면 커스텀 Hook으로 만듭니다.",
        code: {
          before:
            "function fetchData() {\n  const [data] = useState(null); // Error!\n}",
          after:
            "function useFetchData() {\n  const [data, setData] = useState(null);\n  return data;\n}",
          language: "jsx",
        },
      },
      {
        title: "React 버전 확인",
        description: "react와 react-dom 버전이 일치하는지 확인합니다.",
        code: {
          before: "npm ls react",
          after: "// 버전이 다르면:\nnpm install react@latest react-dom@latest",
          language: "bash",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["react-hooks-rules-violation"],
    faq: [
      {
        question: "여러 개의 React 복사본 문제는 어떻게 해결하나요?",
        answer:
          "npm ls react로 확인 후, 중복되는 패키지를 삭제하고 npm dedupe를 실행하세요.",
      },
    ],
    keywords: [
      "invalid hook call",
      "hooks only in function component",
      "react hook error",
    ],
    searchVolume: 12000,
  },

  "react-cannot-update-unmounted": {
    slug: "react-cannot-update-unmounted",
    title: "Cannot Update Unmounted Component",
    errorMessage:
      "Warning: Can't perform a React state update on an unmounted component",
    description:
      "컴포넌트가 언마운트된 후 상태를 업데이트하려고 할 때 발생하는 경고입니다.",
    category: "react",
    severity: "medium",
    icon: Component,
    cause:
      "비동기 작업 완료 후 컴포넌트가 이미 언마운트된 상태에서 setState 호출",
    aiContext:
      "AI가 비동기 작업의 cleanup 함수를 구현하지 않거나, 컴포넌트 마운트 상태를 확인하지 않습니다.",
    fixSteps: [
      {
        title: "AbortController 사용",
        description: "fetch 요청을 취소할 수 있게 합니다.",
        code: {
          before:
            "useEffect(() => {\n  fetch(url).then(r => r.json()).then(setData);\n}, []);",
          after:
            "useEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal })\n    .then(r => r.json())\n    .then(setData)\n    .catch(e => {\n      if (e.name !== 'AbortError') throw e;\n    });\n  return () => controller.abort();\n}, []);",
          language: "jsx",
        },
      },
      {
        title: "마운트 상태 추적",
        description: "useRef로 마운트 상태를 추적합니다.",
        code: {
          before:
            "useEffect(() => {\n  setTimeout(() => setData('loaded'), 1000);\n}, []);",
          after:
            "useEffect(() => {\n  let isMounted = true;\n  setTimeout(() => {\n    if (isMounted) setData('loaded');\n  }, 1000);\n  return () => { isMounted = false; };\n}, []);",
          language: "jsx",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["react-hooks-rules-violation"],
    faq: [
      {
        question: "이 경고가 메모리 누수를 의미하나요?",
        answer:
          "직접적인 메모리 누수는 아니지만, 리소스가 낭비되고 잠재적인 버그의 신호일 수 있습니다.",
      },
    ],
    keywords: [
      "cannot update unmounted",
      "memory leak react",
      "state update unmounted",
    ],
    searchVolume: 10000,
  },

  "react-hydration-mismatch": {
    slug: "react-hydration-mismatch",
    title: "React Hydration Mismatch",
    errorMessage: "Text content did not match. Server: 'x' Client: 'y'",
    description:
      "서버 렌더링 결과와 클라이언트 렌더링 결과가 일치하지 않을 때 발생합니다.",
    category: "react",
    severity: "high",
    icon: Component,
    cause:
      "서버와 클라이언트에서 다른 데이터 사용, 브라우저 전용 API 사용, 또는 랜덤 값",
    aiContext:
      "AI가 SSR에서 Date, Math.random, localStorage 등 서버와 클라이언트에서 다른 값을 반환하는 것을 사용합니다.",
    fixSteps: [
      {
        title: "useEffect로 클라이언트 전용 로직 이동",
        description: "브라우저 전용 코드는 useEffect 안에서 실행합니다.",
        code: {
          before:
            "function Clock() {\n  return <div>{new Date().toLocaleTimeString()}</div>;\n}",
          after:
            "function Clock() {\n  const [time, setTime] = useState('');\n  useEffect(() => {\n    setTime(new Date().toLocaleTimeString());\n  }, []);\n  return <div>{time}</div>;\n}",
          language: "jsx",
        },
      },
      {
        title: "suppressHydrationWarning 사용",
        description: "의도적인 불일치에는 경고를 억제합니다.",
        code: {
          before: "<div>{Date.now()}</div>",
          after: "<div suppressHydrationWarning>{Date.now()}</div>",
          language: "jsx",
        },
      },
      {
        title: "dynamic import with ssr: false",
        description: "Next.js에서 클라이언트 전용 컴포넌트로 분리합니다.",
        code: {
          before: "import Chart from 'chart-library';",
          after:
            "import dynamic from 'next/dynamic';\nconst Chart = dynamic(() => import('chart-library'), {\n  ssr: false\n});",
          language: "jsx",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: [],
    faq: [
      {
        question: "hydration 경고를 무시해도 되나요?",
        answer:
          "작은 불일치는 큰 문제가 아닐 수 있지만, hydration 오류는 버그의 신호이므로 수정하는 것이 좋습니다.",
      },
    ],
    keywords: [
      "hydration mismatch",
      "server client mismatch",
      "ssr hydration error",
    ],
    searchVolume: 8000,
  },

  "react-objects-not-valid-child": {
    slug: "react-objects-not-valid-child",
    title: "Objects Are Not Valid as React Child",
    errorMessage: "Objects are not valid as a React child",
    description:
      "객체를 직접 JSX에서 렌더링하려고 할 때 발생하는 React 오류입니다.",
    category: "react",
    severity: "high",
    icon: Component,
    cause: "객체나 배열을 문자열로 변환하지 않고 직접 렌더링 시도",
    aiContext:
      "AI가 API 응답 객체를 직접 렌더링하거나, JSON.stringify 없이 객체를 표시하려고 합니다.",
    fixSteps: [
      {
        title: "객체의 속성 접근",
        description: "객체 전체가 아닌 특정 속성을 렌더링합니다.",
        code: {
          before: "return <div>{user}</div>;",
          after: "return <div>{user.name}</div>;",
          language: "jsx",
        },
      },
      {
        title: "JSON.stringify 사용",
        description: "디버깅용으로 객체를 문자열로 변환합니다.",
        code: {
          before: "return <div>{data}</div>;",
          after: "return <pre>{JSON.stringify(data, null, 2)}</pre>;",
          language: "jsx",
        },
      },
      {
        title: "배열 매핑",
        description: "배열은 map으로 개별 요소를 렌더링합니다.",
        code: {
          before: "return <div>{items}</div>;",
          after:
            "return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;",
          language: "jsx",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "JSON 데이터 구조를 확인합니다.",
      },
    ],
    relatedErrors: ["react-key-prop-missing"],
    faq: [
      {
        question: "Date 객체는 어떻게 렌더링하나요?",
        answer:
          "date.toLocaleDateString() 또는 date.toISOString()으로 문자열로 변환하세요.",
      },
    ],
    keywords: [
      "objects not valid react child",
      "render object react",
      "cannot render object",
    ],
    searchVolume: 9000,
  },

  "react-ref-not-forwarded": {
    slug: "react-ref-not-forwarded",
    title: "Ref Not Forwarded",
    errorMessage:
      "Warning: Function components cannot be given refs. Did you mean to use React.forwardRef()?",
    description:
      "함수 컴포넌트에 ref를 전달했지만 forwardRef가 구현되지 않았을 때 발생합니다.",
    category: "react",
    severity: "medium",
    icon: Component,
    cause: "함수 컴포넌트에서 ref를 받으려면 forwardRef로 감싸야 함",
    aiContext:
      "AI가 커스텀 컴포넌트에 ref를 전달하면서 forwardRef 구현을 생략합니다.",
    fixSteps: [
      {
        title: "forwardRef 사용",
        description: "컴포넌트를 forwardRef로 감쌉니다.",
        code: {
          before: "function Input(props) {\n  return <input {...props} />;\n}",
          after:
            "const Input = forwardRef((props, ref) => {\n  return <input ref={ref} {...props} />;\n});",
          language: "jsx",
        },
      },
      {
        title: "다른 prop 이름 사용",
        description: "ref 대신 다른 이름의 prop을 사용합니다.",
        code: {
          before: "<CustomInput ref={inputRef} />",
          after:
            "// CustomInput에서\nfunction CustomInput({ inputRef }) {\n  return <input ref={inputRef} />;\n}\n// 사용\n<CustomInput inputRef={inputRef} />",
          language: "jsx",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["react-hooks-rules-violation"],
    faq: [
      {
        question: "언제 forwardRef가 필요한가요?",
        answer:
          "부모 컴포넌트가 자식의 DOM 요소에 직접 접근해야 할 때 필요합니다. 예: 포커스, 스크롤, 측정 등.",
      },
    ],
    keywords: [
      "forwardRef react",
      "ref not forwarded",
      "function component ref",
    ],
    searchVolume: 6000,
  },

  "react-context-not-provided": {
    slug: "react-context-not-provided",
    title: "Context Value Not Provided",
    errorMessage: "Cannot read property of undefined (reading context value)",
    description:
      "Context.Provider 없이 useContext를 사용했을 때 발생하는 오류입니다.",
    category: "react",
    severity: "high",
    icon: Component,
    cause: "Provider 컴포넌트로 감싸지 않은 상태에서 useContext 사용",
    aiContext: "AI가 Context를 생성하고 사용하면서 Provider 래핑을 누락합니다.",
    fixSteps: [
      {
        title: "Provider로 감싸기",
        description: "컴포넌트 트리를 Provider로 감쌉니다.",
        code: {
          before:
            "// App.js\nfunction App() {\n  return <Child />; // Provider 없음\n}",
          after:
            "function App() {\n  return (\n    <ThemeContext.Provider value={theme}>\n      <Child />\n    </ThemeContext.Provider>\n  );\n}",
          language: "jsx",
        },
      },
      {
        title: "기본값 설정",
        description: "createContext에 기본값을 제공합니다.",
        code: {
          before: "const ThemeContext = createContext();",
          after:
            "const ThemeContext = createContext({\n  theme: 'light',\n  toggleTheme: () => {}\n});",
          language: "jsx",
        },
      },
      {
        title: "커스텀 Hook 생성",
        description: "안전한 Context 사용을 위한 Hook을 만듭니다.",
        code: {
          before: "const theme = useContext(ThemeContext);",
          after:
            "function useTheme() {\n  const context = useContext(ThemeContext);\n  if (!context) {\n    throw new Error('useTheme must be used within ThemeProvider');\n  }\n  return context;\n}",
          language: "jsx",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-cannot-read-property-of-undefined"],
    faq: [
      {
        question: "여러 개의 Context를 사용하려면?",
        answer:
          "Provider를 중첩하거나, 여러 Context를 조합한 단일 Provider를 만들 수 있습니다.",
      },
    ],
    keywords: [
      "context not provided",
      "useContext undefined",
      "react context error",
    ],
    searchVolume: 7000,
  },

  "react-controlled-uncontrolled": {
    slug: "react-controlled-uncontrolled",
    title: "Controlled to Uncontrolled Warning",
    errorMessage:
      "A component is changing a controlled input to be uncontrolled",
    description:
      "입력 요소가 controlled와 uncontrolled 사이를 전환할 때 발생하는 경고입니다.",
    category: "react",
    severity: "medium",
    icon: Component,
    cause: "value가 undefined로 변경되거나, value와 defaultValue를 혼용",
    aiContext:
      "AI가 입력 상태를 초기화할 때 undefined를 사용하거나, controlled/uncontrolled 패턴을 혼합합니다.",
    fixSteps: [
      {
        title: "초기값을 빈 문자열로 설정",
        description: "undefined 대신 빈 문자열을 사용합니다.",
        code: {
          before: "const [value, setValue] = useState();",
          after: "const [value, setValue] = useState('');",
          language: "jsx",
        },
      },
      {
        title: "nullish 병합 사용",
        description: "value가 undefined일 때 빈 문자열을 제공합니다.",
        code: {
          before: "<input value={formData.name} />",
          after: "<input value={formData.name ?? ''} />",
          language: "jsx",
        },
      },
      {
        title: "패턴 일관성 유지",
        description: "controlled 또는 uncontrolled 중 하나만 사용합니다.",
        code: {
          before: "<input value={value} defaultValue='default' /> // 혼합!",
          after:
            "// Controlled\n<input value={value} onChange={handleChange} />\n// 또는 Uncontrolled\n<input defaultValue='default' ref={inputRef} />",
          language: "jsx",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: [],
    faq: [
      {
        question: "controlled와 uncontrolled의 차이는?",
        answer:
          "Controlled는 React 상태가 입력을 제어하고, Uncontrolled는 DOM이 자체적으로 상태를 관리합니다.",
      },
    ],
    keywords: [
      "controlled uncontrolled",
      "input warning react",
      "form control react",
    ],
    searchVolume: 5000,
  },

  // ============================================
  // Python 관련 오류
  // ============================================
  "python-indentation-error": {
    slug: "python-indentation-error",
    title: "Python IndentationError",
    errorMessage: "IndentationError: unexpected indent",
    description:
      "Python 코드의 들여쓰기가 일관되지 않을 때 발생하는 구문 오류입니다.",
    category: "python",
    severity: "high",
    icon: Terminal,
    cause: "탭과 스페이스 혼용, 또는 일관되지 않은 들여쓰기 수준",
    aiContext:
      "AI가 다양한 소스에서 코드를 합성할 때 들여쓰기 스타일이 혼합되거나 잘못된 수준의 들여쓰기를 생성합니다.",
    fixSteps: [
      {
        title: "스페이스로 통일",
        description: "모든 들여쓰기를 4개의 스페이스로 통일합니다.",
        code: {
          before: "def func():\n\tif True:\n        print('mixed')",
          after: "def func():\n    if True:\n        print('consistent')",
          language: "python",
        },
      },
      {
        title: "편집기 설정 확인",
        description: "VS Code에서 Tab Size: 4, Insert Spaces: true 설정",
        code: {
          after:
            '{\n  "editor.tabSize": 4,\n  "editor.insertSpaces": true,\n  "editor.detectIndentation": false\n}',
          language: "json",
        },
      },
    ],
    relatedTools: [
      {
        slug: "diff-checker",
        reason: "들여쓰기 차이를 시각적으로 비교합니다.",
      },
    ],
    relatedErrors: ["python-name-not-defined"],
    faq: [
      {
        question: "탭과 스페이스 중 어떤 것을 사용해야 하나요?",
        answer: "PEP 8은 4개의 스페이스를 권장합니다. 탭 사용은 지양하세요.",
      },
    ],
    keywords: [
      "python indentation error",
      "unexpected indent",
      "tab vs spaces python",
    ],
    searchVolume: 12000,
  },

  "python-name-not-defined": {
    slug: "python-name-not-defined",
    title: "Python NameError",
    errorMessage: "NameError: name 'x' is not defined",
    description:
      "정의되지 않은 변수나 함수를 사용하려고 할 때 발생하는 Python 오류입니다.",
    category: "python",
    severity: "high",
    icon: Terminal,
    cause: "변수/함수 미정의, 오타, 또는 잘못된 스코프",
    aiContext:
      "AI가 import 문을 생략하거나, 다른 코드 블록에서 정의된 변수를 참조하거나, 오타가 있는 변수명을 생성합니다.",
    fixSteps: [
      {
        title: "변수 정의 확인",
        description: "변수가 사용 전에 정의되었는지 확인합니다.",
        code: {
          before: "print(result)",
          after: "result = calculate()\nprint(result)",
          language: "python",
        },
      },
      {
        title: "import 문 추가",
        description: "필요한 모듈이나 함수를 import합니다.",
        code: {
          before: "data = json.loads(text)",
          after: "import json\ndata = json.loads(text)",
          language: "python",
        },
      },
      {
        title: "철자 확인",
        description: "변수명이나 함수명의 철자를 확인합니다.",
        code: {
          before: "lenght = len(items)",
          after: "length = len(items)",
          language: "python",
        },
      },
    ],
    relatedTools: [
      {
        slug: "regex-tester",
        reason: "변수명 패턴 검증에 활용할 수 있습니다.",
      },
    ],
    relatedErrors: ["python-indentation-error"],
    faq: [
      {
        question: "함수 안에서 전역 변수를 사용하려면 어떻게 하나요?",
        answer:
          "함수 내부에서 global 키워드를 사용하거나, 함수 파라미터로 전달하세요. global 사용은 지양하는 것이 좋습니다.",
      },
    ],
    keywords: [
      "python name not defined",
      "undefined variable python",
      "name error python",
    ],
    searchVolume: 15000,
  },

  "python-type-error": {
    slug: "python-type-error",
    title: "Python TypeError",
    errorMessage: "TypeError: unsupported operand type(s)",
    description:
      "잘못된 타입의 객체에 연산을 수행하려고 할 때 발생하는 Python 오류입니다.",
    category: "python",
    severity: "high",
    icon: Terminal,
    cause: "호환되지 않는 타입 간의 연산, 잘못된 함수 인자 타입",
    aiContext:
      "AI가 타입 검사 없이 연산을 수행하거나, 문자열과 숫자를 직접 연결하려고 합니다.",
    fixSteps: [
      {
        title: "타입 변환",
        description: "연산 전에 적절한 타입으로 변환합니다.",
        code: {
          before: "result = '10' + 5",
          after: "result = int('10') + 5  # 또는\nresult = '10' + str(5)",
          language: "python",
        },
      },
      {
        title: "타입 확인",
        description: "isinstance()로 타입을 확인합니다.",
        code: {
          before: "def process(data):\n    return data + 1",
          after:
            "def process(data):\n    if isinstance(data, (int, float)):\n        return data + 1\n    raise TypeError('Expected number')",
          language: "python",
        },
      },
      {
        title: "None 체크",
        description: "None 값에 대한 연산을 방지합니다.",
        code: {
          before: "length = len(result)",
          after: "length = len(result) if result is not None else 0",
          language: "python",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["python-attribute-error"],
    faq: [
      {
        question: "문자열과 숫자를 연결하려면?",
        answer:
          "f-string을 사용하세요: f'Value: {number}' 또는 str(number)로 변환하세요.",
      },
    ],
    keywords: [
      "python type error",
      "unsupported operand type",
      "cannot concatenate",
    ],
    searchVolume: 18000,
  },

  "python-attribute-error": {
    slug: "python-attribute-error",
    title: "Python AttributeError",
    errorMessage: "AttributeError: 'X' object has no attribute 'Y'",
    description:
      "객체에 존재하지 않는 속성이나 메서드에 접근할 때 발생하는 Python 오류입니다.",
    category: "python",
    severity: "high",
    icon: Terminal,
    cause: "오타, 잘못된 객체 타입, 또는 None 객체의 속성 접근",
    aiContext:
      "AI가 존재하지 않는 메서드를 호출하거나, 다른 라이브러리 버전의 API를 사용합니다.",
    fixSteps: [
      {
        title: "속성/메서드 이름 확인",
        description: "올바른 이름을 사용하는지 확인합니다.",
        code: {
          before: "text = 'hello'.upperCase()  # JavaScript 스타일",
          after: "text = 'hello'.upper()  # Python 스타일",
          language: "python",
        },
      },
      {
        title: "hasattr 사용",
        description: "속성 존재 여부를 먼저 확인합니다.",
        code: {
          before: "value = obj.custom_attr",
          after:
            "value = getattr(obj, 'custom_attr', None)\n# 또는\nif hasattr(obj, 'custom_attr'):\n    value = obj.custom_attr",
          language: "python",
        },
      },
      {
        title: "None 체크",
        description: "None 객체의 속성 접근을 방지합니다.",
        code: {
          before: "result = response.json()",
          after:
            "if response is not None:\n    result = response.json()\nelse:\n    result = {}",
          language: "python",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["python-type-error"],
    faq: [
      {
        question: "NoneType 오류가 자주 발생합니다. 어떻게 해결하나요?",
        answer:
          "함수가 None을 반환하는 경우를 처리하세요. 특히 find(), get() 등의 메서드 반환값을 확인하세요.",
      },
    ],
    keywords: [
      "python attribute error",
      "object has no attribute",
      "nonetype has no attribute",
    ],
    searchVolume: 20000,
  },

  "python-index-error": {
    slug: "python-index-error",
    title: "Python IndexError",
    errorMessage: "IndexError: list index out of range",
    description:
      "리스트나 튜플의 범위를 벗어난 인덱스에 접근할 때 발생하는 오류입니다.",
    category: "python",
    severity: "high",
    icon: Terminal,
    cause: "빈 리스트 접근, 잘못된 인덱스 계산, 또는 오프-바이-원 오류",
    aiContext:
      "AI가 리스트 길이를 확인하지 않고 인덱스에 접근하거나, 반복문 범위를 잘못 설정합니다.",
    fixSteps: [
      {
        title: "길이 확인",
        description: "인덱스 접근 전 리스트 길이를 확인합니다.",
        code: {
          before: "first = items[0]",
          after: "first = items[0] if items else None",
          language: "python",
        },
      },
      {
        title: "try-except 사용",
        description: "IndexError를 잡아서 처리합니다.",
        code: {
          before: "value = data[index]",
          after:
            "try:\n    value = data[index]\nexcept IndexError:\n    value = default_value",
          language: "python",
        },
      },
      {
        title: "안전한 인덱싱",
        description: "범위를 벗어나면 기본값을 반환합니다.",
        code: {
          before: "item = arr[i]",
          after:
            "def safe_get(lst, idx, default=None):\n    return lst[idx] if 0 <= idx < len(lst) else default\n\nitem = safe_get(arr, i)",
          language: "python",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["python-key-error"],
    faq: [
      {
        question: "음수 인덱스도 IndexError가 발생하나요?",
        answer:
          "네, -1은 마지막 요소지만 리스트 길이를 초과하는 음수(예: 3개 요소에서 -4)는 오류입니다.",
      },
    ],
    keywords: [
      "python index error",
      "list index out of range",
      "index out of bounds",
    ],
    searchVolume: 16000,
  },

  "python-key-error": {
    slug: "python-key-error",
    title: "Python KeyError",
    errorMessage: "KeyError: 'key_name'",
    description:
      "딕셔너리에 존재하지 않는 키에 접근할 때 발생하는 Python 오류입니다.",
    category: "python",
    severity: "high",
    icon: Terminal,
    cause: "존재하지 않는 키 접근, 키 이름 오타, 또는 동적 키 사용",
    aiContext:
      "AI가 API 응답의 모든 키가 항상 존재한다고 가정하거나, 키 이름에 오타가 있습니다.",
    fixSteps: [
      {
        title: "get() 메서드 사용",
        description: "존재하지 않는 키에 대해 기본값을 반환합니다.",
        code: {
          before: "value = data['key']",
          after: "value = data.get('key', 'default_value')",
          language: "python",
        },
      },
      {
        title: "in 연산자로 확인",
        description: "키 존재 여부를 먼저 확인합니다.",
        code: {
          before: "if data['status'] == 'ok':",
          after: "if 'status' in data and data['status'] == 'ok':",
          language: "python",
        },
      },
      {
        title: "setdefault 사용",
        description: "키가 없으면 기본값을 설정하고 반환합니다.",
        code: {
          before: "items = data['items']",
          after: "items = data.setdefault('items', [])",
          language: "python",
        },
      },
    ],
    relatedTools: [
      {
        slug: "json-formatter",
        reason: "JSON 데이터 구조를 확인합니다.",
      },
    ],
    relatedErrors: ["python-index-error"],
    faq: [
      {
        question: "defaultdict는 언제 사용하나요?",
        answer:
          "키가 없을 때 자동으로 기본값을 생성해야 할 때 사용합니다: from collections import defaultdict",
      },
    ],
    keywords: [
      "python key error",
      "dictionary key error",
      "key not found python",
    ],
    searchVolume: 14000,
  },

  "python-import-error": {
    slug: "python-import-error",
    title: "Python ImportError / ModuleNotFoundError",
    errorMessage: "ModuleNotFoundError: No module named 'X'",
    description:
      "import하려는 모듈을 찾을 수 없을 때 발생하는 Python 오류입니다.",
    category: "python",
    severity: "high",
    icon: Terminal,
    cause: "패키지 미설치, 가상환경 문제, 또는 잘못된 모듈 이름",
    aiContext:
      "AI가 설치되지 않은 패키지를 import하거나, 잘못된 패키지 이름을 사용합니다.",
    fixSteps: [
      {
        title: "패키지 설치",
        description: "pip로 필요한 패키지를 설치합니다.",
        code: {
          before: "import pandas as pd  # ModuleNotFoundError",
          after: "pip install pandas\n# 그 다음\nimport pandas as pd",
          language: "python",
        },
      },
      {
        title: "가상환경 확인",
        description: "올바른 가상환경이 활성화되었는지 확인합니다.",
        code: {
          before: "python script.py  # 잘못된 환경",
          after:
            "# 가상환경 활성화\nsource venv/bin/activate  # Linux/Mac\nvenv\\Scripts\\activate  # Windows\npython script.py",
          language: "bash",
        },
      },
      {
        title: "패키지 이름 확인",
        description: "import 이름과 pip 패키지 이름이 다를 수 있습니다.",
        code: {
          before: "pip install opencv",
          after: "pip install opencv-python\n# import는:\nimport cv2",
          language: "bash",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["python-name-not-defined"],
    faq: [
      {
        question: "로컬 모듈을 import할 수 없습니다.",
        answer:
          "PYTHONPATH에 경로를 추가하거나, 패키지 구조에 __init__.py 파일이 있는지 확인하세요.",
      },
    ],
    keywords: ["python import error", "module not found", "no module named"],
    searchVolume: 25000,
  },

  // ============================================
  // Node.js 관련 오류
  // ============================================
  "node-cannot-find-module": {
    slug: "node-cannot-find-module",
    title: "Node.js Cannot Find Module",
    errorMessage: "Error: Cannot find module 'X'",
    description:
      "Node.js에서 require/import하려는 모듈을 찾을 수 없을 때 발생합니다.",
    category: "nodejs",
    severity: "high",
    icon: Server,
    cause: "패키지 미설치, 경로 오류, 또는 node_modules 손상",
    aiContext:
      "AI가 설치되지 않은 패키지를 사용하거나, 상대 경로를 잘못 지정합니다.",
    fixSteps: [
      {
        title: "패키지 설치",
        description: "npm으로 필요한 패키지를 설치합니다.",
        code: {
          before: "const express = require('express'); // Error",
          after: "npm install express\n// 그 다음 사용",
          language: "javascript",
        },
      },
      {
        title: "node_modules 재설치",
        description: "손상된 node_modules를 재설치합니다.",
        code: {
          before: "// 모듈을 찾을 수 없는 오류",
          after: "rm -rf node_modules package-lock.json\nnpm install",
          language: "bash",
        },
      },
      {
        title: "상대 경로 확인",
        description: "로컬 모듈의 경로가 올바른지 확인합니다.",
        code: {
          before: "const utils = require('./util');",
          after: "const utils = require('./utils'); // 정확한 파일명",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-module-not-found"],
    faq: [
      {
        question: "전역 패키지를 사용하려면?",
        answer:
          "전역 패키지는 프로젝트에서 직접 import할 수 없습니다. npm link를 사용하거나 로컬에 설치하세요.",
      },
    ],
    keywords: [
      "node cannot find module",
      "require error node",
      "module not found nodejs",
    ],
    searchVolume: 12000,
  },

  "node-enoent": {
    slug: "node-enoent",
    title: "Node.js ENOENT Error",
    errorMessage: "Error: ENOENT: no such file or directory",
    description:
      "존재하지 않는 파일이나 디렉토리에 접근하려고 할 때 발생하는 Node.js 오류입니다.",
    category: "nodejs",
    severity: "high",
    icon: Server,
    cause: "파일 경로 오류, 파일 미생성, 또는 상대 경로 문제",
    aiContext:
      "AI가 존재하지 않는 파일 경로를 사용하거나, 작업 디렉토리 기준 상대 경로를 잘못 계산합니다.",
    fixSteps: [
      {
        title: "경로 확인",
        description: "파일 경로가 올바른지 확인합니다.",
        code: {
          before: "fs.readFileSync('config.json');",
          after:
            "const path = require('path');\nfs.readFileSync(path.join(__dirname, 'config.json'));",
          language: "javascript",
        },
      },
      {
        title: "파일 존재 확인",
        description: "접근 전에 파일 존재 여부를 확인합니다.",
        code: {
          before: "const data = fs.readFileSync(filePath);",
          after:
            "if (fs.existsSync(filePath)) {\n  const data = fs.readFileSync(filePath);\n} else {\n  console.error('File not found:', filePath);\n}",
          language: "javascript",
        },
      },
      {
        title: "디렉토리 생성",
        description: "필요한 디렉토리가 없으면 생성합니다.",
        code: {
          before: "fs.writeFileSync('logs/app.log', data);",
          after:
            "const dir = 'logs';\nif (!fs.existsSync(dir)) {\n  fs.mkdirSync(dir, { recursive: true });\n}\nfs.writeFileSync('logs/app.log', data);",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["node-cannot-find-module"],
    faq: [
      {
        question: "__dirname과 process.cwd()의 차이는?",
        answer:
          "__dirname은 현재 파일의 디렉토리, process.cwd()는 Node.js를 실행한 디렉토리입니다.",
      },
    ],
    keywords: ["enoent node", "no such file directory", "file not found node"],
    searchVolume: 10000,
  },

  "node-eaddrinuse": {
    slug: "node-eaddrinuse",
    title: "Node.js EADDRINUSE Error",
    errorMessage: "Error: listen EADDRINUSE: address already in use",
    description:
      "이미 사용 중인 포트에서 서버를 시작하려고 할 때 발생하는 Node.js 오류입니다.",
    category: "nodejs",
    severity: "medium",
    icon: Server,
    cause:
      "다른 프로세스가 해당 포트를 사용 중, 또는 이전 서버가 종료되지 않음",
    aiContext:
      "AI가 서버 재시작 시 기존 프로세스를 종료하지 않거나, 포트 충돌을 처리하지 않습니다.",
    fixSteps: [
      {
        title: "포트 사용 프로세스 확인 및 종료",
        description: "해당 포트를 사용하는 프로세스를 찾아 종료합니다.",
        code: {
          before: "// Error: EADDRINUSE :::3000",
          after:
            "# Mac/Linux\nlsof -i :3000\nkill -9 <PID>\n\n# Windows\nnetstat -ano | findstr :3000\ntaskkill /PID <PID> /F",
          language: "bash",
        },
      },
      {
        title: "다른 포트 사용",
        description: "환경 변수로 다른 포트를 지정합니다.",
        code: {
          before: "app.listen(3000);",
          after: "const PORT = process.env.PORT || 3000;\napp.listen(PORT);",
          language: "javascript",
        },
      },
      {
        title: "자동 포트 선택",
        description: "사용 가능한 포트를 자동으로 찾습니다.",
        code: {
          before: "server.listen(3000);",
          after:
            "const net = require('net');\nfunction getAvailablePort(start) {\n  return new Promise((resolve) => {\n    const server = net.createServer();\n    server.listen(start, () => {\n      const port = server.address().port;\n      server.close(() => resolve(port));\n    });\n    server.on('error', () => resolve(getAvailablePort(start + 1)));\n  });\n}",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: [],
    faq: [
      {
        question: "개발 중에 서버를 자주 재시작하는데 이 오류가 발생합니다.",
        answer:
          "nodemon 같은 도구를 사용하면 파일 변경 시 안전하게 재시작됩니다. npm install -g nodemon",
      },
    ],
    keywords: ["eaddrinuse node", "port already in use", "address in use"],
    searchVolume: 8000,
  },

  "node-heap-out-of-memory": {
    slug: "node-heap-out-of-memory",
    title: "Node.js Heap Out of Memory",
    errorMessage:
      "FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory",
    description:
      "Node.js 프로세스가 사용 가능한 메모리를 초과했을 때 발생합니다.",
    category: "nodejs",
    severity: "critical",
    icon: Server,
    cause: "메모리 누수, 대용량 데이터 처리, 또는 기본 메모리 제한 초과",
    aiContext:
      "AI가 대용량 파일을 한 번에 메모리에 로드하거나, 메모리 누수가 있는 코드를 생성합니다.",
    fixSteps: [
      {
        title: "메모리 제한 증가",
        description: "Node.js의 메모리 제한을 늘립니다.",
        code: {
          before: "node app.js",
          after:
            'node --max-old-space-size=4096 app.js\n# 또는 package.json scripts에:\n"start": "node --max-old-space-size=4096 app.js"',
          language: "bash",
        },
      },
      {
        title: "스트림 처리 사용",
        description: "대용량 파일은 스트림으로 처리합니다.",
        code: {
          before: "const data = fs.readFileSync('huge-file.json');",
          after:
            "const stream = fs.createReadStream('huge-file.json');\nstream.on('data', (chunk) => {\n  // 청크 단위로 처리\n});",
          language: "javascript",
        },
      },
      {
        title: "메모리 누수 수정",
        description: "클로저와 이벤트 리스너를 정리합니다.",
        code: {
          before:
            "function process() {\n  const bigArray = [];\n  // bigArray가 계속 유지됨\n}",
          after:
            "function process() {\n  const bigArray = [];\n  // 사용 후 정리\n  bigArray.length = 0;\n}\n// 이벤트 리스너 제거\nemitter.removeAllListeners('event');",
          language: "javascript",
        },
      },
    ],
    relatedTools: [],
    relatedErrors: ["js-maximum-call-stack"],
    faq: [
      {
        question: "기본 메모리 제한은 얼마인가요?",
        answer:
          "Node.js 12+에서는 시스템 메모리에 따라 자동 설정되지만, 일반적으로 1.5~2GB입니다.",
      },
    ],
    keywords: ["heap out of memory", "javascript heap", "memory limit node"],
    searchVolume: 9000,
  },
};

/**
 * Helper Functions
 */
export function getErrorFix(slug: ErrorFixSlug): ErrorFix | undefined {
  return errorFixes[slug];
}

export function getErrorFixSlugs(): ErrorFixSlug[] {
  return Object.keys(errorFixes) as ErrorFixSlug[];
}

export function getErrorsByCategory(category: ErrorCategory): ErrorFix[] {
  return Object.values(errorFixes).filter(
    (error) => error.category === category,
  );
}

export function getSortedCategories(): ErrorCategory[] {
  return ["json", "javascript", "typescript", "react", "python"];
}
