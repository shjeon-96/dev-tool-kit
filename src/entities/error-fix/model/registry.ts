import { FileJson, Code, FileCode, Component, Terminal } from "lucide-react";
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
