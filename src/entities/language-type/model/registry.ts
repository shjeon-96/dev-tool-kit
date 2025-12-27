import type { LanguageType, LanguageTypeSlug } from "./types";

/**
 * Language-Type Registry
 * 검색량 높은 조합부터 등록 (Phase 1: 10개)
 */
export const LANGUAGE_TYPE_REGISTRY: Record<LanguageTypeSlug, LanguageType> = {
  // ============================================================
  // JSON 관련 (가장 높은 검색량)
  // ============================================================

  "json-in-python": {
    slug: "json-in-python",
    tool: "json",
    language: "python",
    category: "data-format",
    title: {
      en: "JSON in Python: Complete Guide",
      ko: "Python에서 JSON 다루기: 완벽 가이드",
      ja: "PythonでJSON: 完全ガイド",
    },
    description: {
      en: "Learn how to parse, create, and manipulate JSON data in Python using the built-in json module. Includes examples for reading/writing files and API responses.",
      ko: "Python의 내장 json 모듈을 사용하여 JSON 데이터를 파싱, 생성, 조작하는 방법을 배웁니다. 파일 읽기/쓰기 및 API 응답 처리 예제 포함.",
      ja: "Pythonの組み込みjsonモジュールを使用してJSONデータを解析、作成、操作する方法を学びます。ファイルの読み書きとAPIレスポンスの例を含みます。",
    },
    useCases: {
      en: [
        "Parse JSON from API responses",
        "Read and write JSON configuration files",
        "Convert Python dictionaries to JSON",
        "Handle nested JSON structures",
      ],
      ko: [
        "API 응답에서 JSON 파싱",
        "JSON 설정 파일 읽기/쓰기",
        "Python 딕셔너리를 JSON으로 변환",
        "중첩된 JSON 구조 처리",
      ],
      ja: [
        "APIレスポンスからJSONを解析",
        "JSON設定ファイルの読み書き",
        "Pythonディクショナリをjsonに変換",
        "ネストされたJSON構造の処理",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Parse JSON string",
          code: `import json

data = '{"name": "John", "age": 30}'
parsed = json.loads(data)
print(parsed["name"])  # John`,
          description: "Convert JSON string to Python dictionary",
        },
        {
          title: "Write JSON to file",
          code: `import json

data = {"name": "John", "age": 30}
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)`,
          description: "Save Python dictionary as formatted JSON file",
        },
      ],
      ko: [
        {
          title: "JSON 문자열 파싱",
          code: `import json

data = '{"name": "홍길동", "age": 30}'
parsed = json.loads(data)
print(parsed["name"])  # 홍길동`,
          description: "JSON 문자열을 Python 딕셔너리로 변환",
        },
        {
          title: "JSON 파일 저장",
          code: `import json

data = {"name": "홍길동", "age": 30}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)`,
          description: "Python 딕셔너리를 JSON 파일로 저장",
        },
      ],
      ja: [
        {
          title: "JSON文字列の解析",
          code: `import json

data = '{"name": "太郎", "age": 30}'
parsed = json.loads(data)
print(parsed["name"])  # 太郎`,
          description: "JSON文字列をPythonディクショナリに変換",
        },
        {
          title: "JSONファイルの書き込み",
          code: `import json

data = {"name": "太郎", "age": 30}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)`,
          description: "PythonディクショナリをJSONファイルとして保存",
        },
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "json python",
      "python json parse",
      "python json load",
      "python json dump",
      "python read json file",
    ],
    searchVolume: 95,
  },

  "json-in-javascript": {
    slug: "json-in-javascript",
    tool: "json",
    language: "javascript",
    category: "data-format",
    title: {
      en: "JSON in JavaScript: Complete Guide",
      ko: "JavaScript에서 JSON 다루기: 완벽 가이드",
      ja: "JavaScriptでJSON: 完全ガイド",
    },
    description: {
      en: "Master JSON parsing and stringification in JavaScript. Learn JSON.parse(), JSON.stringify(), and best practices for handling JSON data in web applications.",
      ko: "JavaScript에서 JSON 파싱과 문자열화를 마스터하세요. JSON.parse(), JSON.stringify() 및 웹 애플리케이션에서 JSON 데이터를 처리하는 모범 사례를 배웁니다.",
      ja: "JavaScriptでのJSON解析と文字列化をマスターしましょう。JSON.parse()、JSON.stringify()、およびWebアプリケーションでのJSONデータ処理のベストプラクティスを学びます。",
    },
    useCases: {
      en: [
        "Parse JSON from fetch API responses",
        "Store data in localStorage",
        "Send JSON data to servers",
        "Deep clone objects",
      ],
      ko: [
        "fetch API 응답에서 JSON 파싱",
        "localStorage에 데이터 저장",
        "서버로 JSON 데이터 전송",
        "객체 깊은 복사",
      ],
      ja: [
        "fetch APIレスポンスからJSONを解析",
        "localStorageにデータを保存",
        "サーバーにJSONデータを送信",
        "オブジェクトのディープクローン",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Parse JSON string",
          code: `const json = '{"name": "John", "age": 30}';
const obj = JSON.parse(json);
console.log(obj.name); // John`,
          description: "Convert JSON string to JavaScript object",
        },
        {
          title: "Fetch API with JSON",
          code: `const response = await fetch('/api/data');
const data = await response.json();
console.log(data);`,
          description: "Parse JSON from API response",
        },
      ],
      ko: [
        {
          title: "JSON 문자열 파싱",
          code: `const json = '{"name": "홍길동", "age": 30}';
const obj = JSON.parse(json);
console.log(obj.name); // 홍길동`,
          description: "JSON 문자열을 JavaScript 객체로 변환",
        },
        {
          title: "Fetch API와 JSON",
          code: `const response = await fetch('/api/data');
const data = await response.json();
console.log(data);`,
          description: "API 응답에서 JSON 파싱",
        },
      ],
      ja: [
        {
          title: "JSON文字列の解析",
          code: `const json = '{"name": "太郎", "age": 30}';
const obj = JSON.parse(json);
console.log(obj.name); // 太郎`,
          description: "JSON文字列をJavaScriptオブジェクトに変換",
        },
        {
          title: "Fetch APIとJSON",
          code: `const response = await fetch('/api/data');
const data = await response.json();
console.log(data);`,
          description: "APIレスポンスからJSONを解析",
        },
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "json javascript",
      "javascript json parse",
      "json stringify",
      "javascript json object",
      "fetch json",
    ],
    searchVolume: 98,
  },

  "json-in-typescript": {
    slug: "json-in-typescript",
    tool: "json",
    language: "typescript",
    category: "data-format",
    title: {
      en: "JSON in TypeScript: Type-Safe Guide",
      ko: "TypeScript에서 JSON 다루기: 타입 안전 가이드",
      ja: "TypeScriptでJSON: 型安全ガイド",
    },
    description: {
      en: "Learn type-safe JSON handling in TypeScript. Define interfaces for JSON data, use type guards, and handle unknown JSON structures safely.",
      ko: "TypeScript에서 타입 안전한 JSON 처리를 배웁니다. JSON 데이터용 인터페이스 정의, 타입 가드 사용, 알 수 없는 JSON 구조를 안전하게 처리하는 방법을 알아봅니다.",
      ja: "TypeScriptでの型安全なJSON処理を学びます。JSONデータ用のインターフェース定義、型ガードの使用、未知のJSON構造を安全に処理する方法を説明します。",
    },
    useCases: {
      en: [
        "Define TypeScript interfaces for JSON",
        "Type-safe API response handling",
        "Validate JSON structure at runtime",
        "Generic JSON parsing functions",
      ],
      ko: [
        "JSON용 TypeScript 인터페이스 정의",
        "타입 안전한 API 응답 처리",
        "런타임에서 JSON 구조 검증",
        "제네릭 JSON 파싱 함수",
      ],
      ja: [
        "JSON用TypeScriptインターフェースの定義",
        "型安全なAPIレスポンス処理",
        "ランタイムでのJSON構造検証",
        "ジェネリックJSON解析関数",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Type-safe JSON parsing",
          code: `interface User {
  name: string;
  age: number;
}

const json = '{"name": "John", "age": 30}';
const user: User = JSON.parse(json);
console.log(user.name); // John (typed)`,
          description: "Parse JSON with TypeScript interface",
        },
        {
          title: "Type guard for JSON",
          code: `function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null
    && 'name' in obj && 'age' in obj;
}

const data = JSON.parse(json);
if (isUser(data)) {
  console.log(data.name); // Safe access
}`,
          description: "Validate JSON structure with type guard",
        },
      ],
      ko: [
        {
          title: "타입 안전 JSON 파싱",
          code: `interface User {
  name: string;
  age: number;
}

const json = '{"name": "홍길동", "age": 30}';
const user: User = JSON.parse(json);
console.log(user.name); // 타입 지정됨`,
          description: "TypeScript 인터페이스로 JSON 파싱",
        },
        {
          title: "JSON용 타입 가드",
          code: `function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null
    && 'name' in obj && 'age' in obj;
}

const data = JSON.parse(json);
if (isUser(data)) {
  console.log(data.name); // 안전한 접근
}`,
          description: "타입 가드로 JSON 구조 검증",
        },
      ],
      ja: [
        {
          title: "型安全なJSON解析",
          code: `interface User {
  name: string;
  age: number;
}

const json = '{"name": "太郎", "age": 30}';
const user: User = JSON.parse(json);
console.log(user.name); // 型付け済み`,
          description: "TypeScriptインターフェースでJSON解析",
        },
        {
          title: "JSON用型ガード",
          code: `function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null
    && 'name' in obj && 'age' in obj;
}

const data = JSON.parse(json);
if (isUser(data)) {
  console.log(data.name); // 安全なアクセス
}`,
          description: "型ガードでJSON構造を検証",
        },
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "json typescript",
      "typescript json type",
      "typescript parse json",
      "typescript json interface",
      "type safe json",
    ],
    searchVolume: 85,
  },

  // ============================================================
  // Base64 관련
  // ============================================================

  "base64-in-python": {
    slug: "base64-in-python",
    tool: "base64",
    language: "python",
    category: "encoding",
    title: {
      en: "Base64 Encoding in Python",
      ko: "Python에서 Base64 인코딩",
      ja: "PythonでBase64エンコード",
    },
    description: {
      en: "Learn Base64 encoding and decoding in Python using the base64 module. Encode strings, files, and images for safe data transmission.",
      ko: "Python의 base64 모듈을 사용한 Base64 인코딩 및 디코딩을 배웁니다. 안전한 데이터 전송을 위해 문자열, 파일, 이미지를 인코딩합니다.",
      ja: "Pythonのbase64モジュールを使用したBase64エンコードとデコードを学びます。安全なデータ転送のために文字列、ファイル、画像をエンコードします。",
    },
    useCases: {
      en: [
        "Encode images for data URLs",
        "Encode binary data for APIs",
        "Decode Base64 encoded strings",
        "Handle file uploads",
      ],
      ko: [
        "데이터 URL용 이미지 인코딩",
        "API용 바이너리 데이터 인코딩",
        "Base64 인코딩된 문자열 디코딩",
        "파일 업로드 처리",
      ],
      ja: [
        "データURL用の画像エンコード",
        "API用のバイナリデータエンコード",
        "Base64エンコードされた文字列のデコード",
        "ファイルアップロードの処理",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Encode string to Base64",
          code: `import base64

text = "Hello, World!"
encoded = base64.b64encode(text.encode()).decode()
print(encoded)  # SGVsbG8sIFdvcmxkIQ==`,
          description: "Convert string to Base64",
        },
        {
          title: "Encode image file",
          code: `import base64

with open("image.png", "rb") as f:
    encoded = base64.b64encode(f.read()).decode()
    data_url = f"data:image/png;base64,{encoded}"`,
          description: "Create data URL from image file",
        },
      ],
      ko: [
        {
          title: "문자열을 Base64로 인코딩",
          code: `import base64

text = "안녕하세요!"
encoded = base64.b64encode(text.encode()).decode()
print(encoded)  # 7JWI64WV7ZWY7IS47JqUIQ==`,
          description: "문자열을 Base64로 변환",
        },
        {
          title: "이미지 파일 인코딩",
          code: `import base64

with open("image.png", "rb") as f:
    encoded = base64.b64encode(f.read()).decode()
    data_url = f"data:image/png;base64,{encoded}"`,
          description: "이미지 파일로 데이터 URL 생성",
        },
      ],
      ja: [
        {
          title: "文字列をBase64にエンコード",
          code: `import base64

text = "こんにちは!"
encoded = base64.b64encode(text.encode()).decode()
print(encoded)  # 44GT44KT44Gr44Gh44GvIQ==`,
          description: "文字列をBase64に変換",
        },
        {
          title: "画像ファイルのエンコード",
          code: `import base64

with open("image.png", "rb") as f:
    encoded = base64.b64encode(f.read()).decode()
    data_url = f"data:image/png;base64,{encoded}"`,
          description: "画像ファイルからデータURLを作成",
        },
      ],
    },
    relatedTool: "base64-converter",
    keywords: [
      "python base64",
      "python base64 encode",
      "python base64 decode",
      "python encode image base64",
      "base64 python string",
    ],
    searchVolume: 80,
  },

  "base64-in-javascript": {
    slug: "base64-in-javascript",
    tool: "base64",
    language: "javascript",
    category: "encoding",
    title: {
      en: "Base64 Encoding in JavaScript",
      ko: "JavaScript에서 Base64 인코딩",
      ja: "JavaScriptでBase64エンコード",
    },
    description: {
      en: "Learn Base64 encoding in JavaScript using btoa(), atob(), and the Buffer API. Handle text and binary data encoding for web applications.",
      ko: "JavaScript에서 btoa(), atob(), Buffer API를 사용한 Base64 인코딩을 배웁니다. 웹 애플리케이션을 위한 텍스트 및 바이너리 데이터 인코딩을 처리합니다.",
      ja: "JavaScriptでbtoa()、atob()、Buffer APIを使用したBase64エンコードを学びます。Webアプリケーション向けのテキストとバイナリデータのエンコードを処理します。",
    },
    useCases: {
      en: [
        "Encode data for URL parameters",
        "Create data URLs for images",
        "Handle file uploads with FileReader",
        "Decode Base64 tokens",
      ],
      ko: [
        "URL 매개변수용 데이터 인코딩",
        "이미지용 데이터 URL 생성",
        "FileReader로 파일 업로드 처리",
        "Base64 토큰 디코딩",
      ],
      ja: [
        "URLパラメータ用のデータエンコード",
        "画像用データURLの作成",
        "FileReaderでファイルアップロード処理",
        "Base64トークンのデコード",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Encode string (browser)",
          code: `const text = "Hello, World!";
const encoded = btoa(text);
console.log(encoded); // SGVsbG8sIFdvcmxkIQ==

const decoded = atob(encoded);
console.log(decoded); // Hello, World!`,
          description: "Use btoa/atob for simple strings",
        },
        {
          title: "Encode file with FileReader",
          code: `const file = inputElement.files[0];
const reader = new FileReader();
reader.onload = () => {
  const base64 = reader.result.split(',')[1];
  console.log(base64);
};
reader.readAsDataURL(file);`,
          description: "Convert file to Base64 data URL",
        },
      ],
      ko: [
        {
          title: "문자열 인코딩 (브라우저)",
          code: `const text = "Hello, World!";
const encoded = btoa(text);
console.log(encoded); // SGVsbG8sIFdvcmxkIQ==

const decoded = atob(encoded);
console.log(decoded); // Hello, World!`,
          description: "단순 문자열에 btoa/atob 사용",
        },
        {
          title: "FileReader로 파일 인코딩",
          code: `const file = inputElement.files[0];
const reader = new FileReader();
reader.onload = () => {
  const base64 = reader.result.split(',')[1];
  console.log(base64);
};
reader.readAsDataURL(file);`,
          description: "파일을 Base64 데이터 URL로 변환",
        },
      ],
      ja: [
        {
          title: "文字列のエンコード（ブラウザ）",
          code: `const text = "Hello, World!";
const encoded = btoa(text);
console.log(encoded); // SGVsbG8sIFdvcmxkIQ==

const decoded = atob(encoded);
console.log(decoded); // Hello, World!`,
          description: "シンプルな文字列にbtoa/atobを使用",
        },
        {
          title: "FileReaderでファイルをエンコード",
          code: `const file = inputElement.files[0];
const reader = new FileReader();
reader.onload = () => {
  const base64 = reader.result.split(',')[1];
  console.log(base64);
};
reader.readAsDataURL(file);`,
          description: "ファイルをBase64データURLに変換",
        },
      ],
    },
    relatedTool: "base64-converter",
    keywords: [
      "javascript base64",
      "btoa atob",
      "javascript base64 encode",
      "javascript base64 image",
      "filereader base64",
    ],
    searchVolume: 85,
  },

  // ============================================================
  // YAML 관련
  // ============================================================

  "yaml-in-python": {
    slug: "yaml-in-python",
    tool: "yaml",
    language: "python",
    category: "data-format",
    title: {
      en: "YAML in Python: PyYAML Guide",
      ko: "Python에서 YAML 다루기: PyYAML 가이드",
      ja: "PythonでYAML: PyYAMLガイド",
    },
    description: {
      en: "Learn to read and write YAML files in Python using PyYAML. Handle configuration files, Kubernetes manifests, and complex nested structures.",
      ko: "PyYAML을 사용하여 Python에서 YAML 파일을 읽고 쓰는 방법을 배웁니다. 설정 파일, Kubernetes 매니페스트, 복잡한 중첩 구조를 처리합니다.",
      ja: "PyYAMLを使用してPythonでYAMLファイルを読み書きする方法を学びます。設定ファイル、Kubernetesマニフェスト、複雑なネスト構造を処理します。",
    },
    useCases: {
      en: [
        "Parse Kubernetes YAML manifests",
        "Read configuration files",
        "Convert YAML to Python dict",
        "Write YAML with custom formatting",
      ],
      ko: [
        "Kubernetes YAML 매니페스트 파싱",
        "설정 파일 읽기",
        "YAML을 Python dict로 변환",
        "커스텀 포맷으로 YAML 작성",
      ],
      ja: [
        "Kubernetes YAMLマニフェストの解析",
        "設定ファイルの読み込み",
        "YAMLをPython dictに変換",
        "カスタムフォーマットでYAML作成",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Read YAML file",
          code: `import yaml

with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)
print(config["database"]["host"])`,
          description: "Load YAML file into Python dictionary",
        },
        {
          title: "Write YAML file",
          code: `import yaml

data = {
    "name": "app",
    "version": "1.0.0",
    "features": ["auth", "api"]
}
with open("output.yaml", "w") as f:
    yaml.dump(data, f, default_flow_style=False)`,
          description: "Save Python dict as formatted YAML",
        },
      ],
      ko: [
        {
          title: "YAML 파일 읽기",
          code: `import yaml

with open("config.yaml", "r", encoding="utf-8") as f:
    config = yaml.safe_load(f)
print(config["database"]["host"])`,
          description: "YAML 파일을 Python 딕셔너리로 로드",
        },
        {
          title: "YAML 파일 쓰기",
          code: `import yaml

data = {
    "name": "앱",
    "version": "1.0.0",
    "features": ["인증", "API"]
}
with open("output.yaml", "w", encoding="utf-8") as f:
    yaml.dump(data, f, default_flow_style=False, allow_unicode=True)`,
          description: "Python dict를 포맷된 YAML로 저장",
        },
      ],
      ja: [
        {
          title: "YAMLファイルの読み込み",
          code: `import yaml

with open("config.yaml", "r", encoding="utf-8") as f:
    config = yaml.safe_load(f)
print(config["database"]["host"])`,
          description: "YAMLファイルをPythonディクショナリにロード",
        },
        {
          title: "YAMLファイルの書き込み",
          code: `import yaml

data = {
    "name": "アプリ",
    "version": "1.0.0",
    "features": ["認証", "API"]
}
with open("output.yaml", "w", encoding="utf-8") as f:
    yaml.dump(data, f, default_flow_style=False, allow_unicode=True)`,
          description: "Python dictをフォーマットされたYAMLとして保存",
        },
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "python yaml",
      "pyyaml",
      "python read yaml",
      "python yaml load",
      "yaml safe_load",
    ],
    searchVolume: 75,
  },

  "yaml-in-javascript": {
    slug: "yaml-in-javascript",
    tool: "yaml",
    language: "javascript",
    category: "data-format",
    title: {
      en: "YAML in JavaScript: js-yaml Guide",
      ko: "JavaScript에서 YAML 다루기: js-yaml 가이드",
      ja: "JavaScriptでYAML: js-yamlガイド",
    },
    description: {
      en: "Parse and stringify YAML in JavaScript using js-yaml library. Handle configuration files and convert between YAML and JSON formats.",
      ko: "js-yaml 라이브러리를 사용하여 JavaScript에서 YAML을 파싱하고 문자열화합니다. 설정 파일을 처리하고 YAML과 JSON 형식 간 변환을 수행합니다.",
      ja: "js-yamlライブラリを使用してJavaScriptでYAMLを解析および文字列化します。設定ファイルを処理し、YAMLとJSON形式間の変換を行います。",
    },
    useCases: {
      en: [
        "Parse YAML configuration files",
        "Convert YAML to JSON",
        "Read YAML in Node.js applications",
        "Generate YAML from JavaScript objects",
      ],
      ko: [
        "YAML 설정 파일 파싱",
        "YAML을 JSON으로 변환",
        "Node.js 애플리케이션에서 YAML 읽기",
        "JavaScript 객체에서 YAML 생성",
      ],
      ja: [
        "YAML設定ファイルの解析",
        "YAMLをJSONに変換",
        "Node.jsアプリケーションでYAML読み込み",
        "JavaScriptオブジェクトからYAML生成",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Parse YAML string",
          code: `import yaml from 'js-yaml';

const yamlStr = \`
name: app
version: 1.0.0
features:
  - auth
  - api
\`;

const obj = yaml.load(yamlStr);
console.log(obj.name); // app`,
          description: "Convert YAML string to JavaScript object",
        },
        {
          title: "Convert to YAML",
          code: `import yaml from 'js-yaml';

const obj = { name: 'app', version: '1.0.0' };
const yamlStr = yaml.dump(obj);
console.log(yamlStr);`,
          description: "Convert JavaScript object to YAML string",
        },
      ],
      ko: [
        {
          title: "YAML 문자열 파싱",
          code: `import yaml from 'js-yaml';

const yamlStr = \`
name: 앱
version: 1.0.0
features:
  - 인증
  - API
\`;

const obj = yaml.load(yamlStr);
console.log(obj.name); // 앱`,
          description: "YAML 문자열을 JavaScript 객체로 변환",
        },
        {
          title: "YAML로 변환",
          code: `import yaml from 'js-yaml';

const obj = { name: '앱', version: '1.0.0' };
const yamlStr = yaml.dump(obj);
console.log(yamlStr);`,
          description: "JavaScript 객체를 YAML 문자열로 변환",
        },
      ],
      ja: [
        {
          title: "YAML文字列の解析",
          code: `import yaml from 'js-yaml';

const yamlStr = \`
name: アプリ
version: 1.0.0
features:
  - 認証
  - API
\`;

const obj = yaml.load(yamlStr);
console.log(obj.name); // アプリ`,
          description: "YAML文字列をJavaScriptオブジェクトに変換",
        },
        {
          title: "YAMLに変換",
          code: `import yaml from 'js-yaml';

const obj = { name: 'アプリ', version: '1.0.0' };
const yamlStr = yaml.dump(obj);
console.log(yamlStr);`,
          description: "JavaScriptオブジェクトをYAML文字列に変換",
        },
      ],
    },
    relatedTool: "json-formatter",
    keywords: [
      "javascript yaml",
      "js-yaml",
      "nodejs yaml",
      "yaml parse javascript",
      "yaml to json javascript",
    ],
    searchVolume: 70,
  },

  // ============================================================
  // Hash 관련
  // ============================================================

  "hash-in-python": {
    slug: "hash-in-python",
    tool: "hash",
    language: "python",
    category: "security",
    title: {
      en: "Hash Functions in Python: hashlib Guide",
      ko: "Python에서 해시 함수: hashlib 가이드",
      ja: "Pythonでハッシュ関数: hashlibガイド",
    },
    description: {
      en: "Learn to generate MD5, SHA-256, and other hash values in Python using hashlib. Create checksums, verify file integrity, and hash passwords securely.",
      ko: "Python의 hashlib을 사용하여 MD5, SHA-256 및 기타 해시 값을 생성하는 방법을 배웁니다. 체크섬 생성, 파일 무결성 검증, 비밀번호 안전하게 해싱합니다.",
      ja: "Pythonのhashlibを使用してMD5、SHA-256、その他のハッシュ値を生成する方法を学びます。チェックサムの作成、ファイル整合性の検証、パスワードの安全なハッシュ化を行います。",
    },
    useCases: {
      en: [
        "Generate SHA-256 checksums",
        "Hash passwords for storage",
        "Verify file integrity",
        "Create unique identifiers",
      ],
      ko: [
        "SHA-256 체크섬 생성",
        "저장용 비밀번호 해싱",
        "파일 무결성 검증",
        "고유 식별자 생성",
      ],
      ja: [
        "SHA-256チェックサムの生成",
        "保存用パスワードのハッシュ化",
        "ファイル整合性の検証",
        "一意識別子の作成",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "Generate SHA-256 hash",
          code: `import hashlib

text = "Hello, World!"
hash_obj = hashlib.sha256(text.encode())
print(hash_obj.hexdigest())
# dffd6021bb2bd5b0af67...`,
          description: "Create SHA-256 hash from string",
        },
        {
          title: "Hash a file",
          code: `import hashlib

def file_hash(path):
    sha256 = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256.update(chunk)
    return sha256.hexdigest()`,
          description: "Calculate file checksum efficiently",
        },
      ],
      ko: [
        {
          title: "SHA-256 해시 생성",
          code: `import hashlib

text = "안녕하세요!"
hash_obj = hashlib.sha256(text.encode())
print(hash_obj.hexdigest())
# 5e05b9c8c7c...`,
          description: "문자열에서 SHA-256 해시 생성",
        },
        {
          title: "파일 해싱",
          code: `import hashlib

def file_hash(path):
    sha256 = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256.update(chunk)
    return sha256.hexdigest()`,
          description: "효율적으로 파일 체크섬 계산",
        },
      ],
      ja: [
        {
          title: "SHA-256ハッシュの生成",
          code: `import hashlib

text = "こんにちは!"
hash_obj = hashlib.sha256(text.encode())
print(hash_obj.hexdigest())
# a1b2c3d4...`,
          description: "文字列からSHA-256ハッシュを作成",
        },
        {
          title: "ファイルのハッシュ化",
          code: `import hashlib

def file_hash(path):
    sha256 = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256.update(chunk)
    return sha256.hexdigest()`,
          description: "効率的にファイルチェックサムを計算",
        },
      ],
    },
    relatedTool: "hash-generator",
    keywords: [
      "python hash",
      "python hashlib",
      "python sha256",
      "python md5",
      "python hash file",
    ],
    searchVolume: 72,
  },

  "hash-in-javascript": {
    slug: "hash-in-javascript",
    tool: "hash",
    language: "javascript",
    category: "security",
    title: {
      en: "Hash Functions in JavaScript",
      ko: "JavaScript에서 해시 함수",
      ja: "JavaScriptでハッシュ関数",
    },
    description: {
      en: "Learn to generate hash values in JavaScript using Web Crypto API and crypto-js. Create SHA-256, MD5 hashes for browser and Node.js applications.",
      ko: "Web Crypto API와 crypto-js를 사용하여 JavaScript에서 해시 값을 생성하는 방법을 배웁니다. 브라우저와 Node.js 애플리케이션용 SHA-256, MD5 해시를 생성합니다.",
      ja: "Web Crypto APIとcrypto-jsを使用してJavaScriptでハッシュ値を生成する方法を学びます。ブラウザとNode.jsアプリケーション用のSHA-256、MD5ハッシュを作成します。",
    },
    useCases: {
      en: [
        "Hash passwords client-side",
        "Generate content hashes",
        "Verify data integrity",
        "Create unique cache keys",
      ],
      ko: [
        "클라이언트 측 비밀번호 해싱",
        "콘텐츠 해시 생성",
        "데이터 무결성 검증",
        "고유 캐시 키 생성",
      ],
      ja: [
        "クライアント側でのパスワードハッシュ化",
        "コンテンツハッシュの生成",
        "データ整合性の検証",
        "一意のキャッシュキー作成",
      ],
    },
    codeExamples: {
      en: [
        {
          title: "SHA-256 with Web Crypto API",
          code: `async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

await sha256("Hello"); // 185f8db32...`,
          description: "Generate SHA-256 hash in browser",
        },
        {
          title: "Node.js crypto module",
          code: `import crypto from 'crypto';

const hash = crypto
  .createHash('sha256')
  .update('Hello, World!')
  .digest('hex');
console.log(hash);`,
          description: "Generate hash in Node.js",
        },
      ],
      ko: [
        {
          title: "Web Crypto API로 SHA-256",
          code: `async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

await sha256("안녕"); // 해시값...`,
          description: "브라우저에서 SHA-256 해시 생성",
        },
        {
          title: "Node.js crypto 모듈",
          code: `import crypto from 'crypto';

const hash = crypto
  .createHash('sha256')
  .update('안녕하세요!')
  .digest('hex');
console.log(hash);`,
          description: "Node.js에서 해시 생성",
        },
      ],
      ja: [
        {
          title: "Web Crypto APIでSHA-256",
          code: `async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

await sha256("こんにちは"); // ハッシュ値...`,
          description: "ブラウザでSHA-256ハッシュを生成",
        },
        {
          title: "Node.js cryptoモジュール",
          code: `import crypto from 'crypto';

const hash = crypto
  .createHash('sha256')
  .update('こんにちは!')
  .digest('hex');
console.log(hash);`,
          description: "Node.jsでハッシュを生成",
        },
      ],
    },
    relatedTool: "hash-generator",
    keywords: [
      "javascript hash",
      "javascript sha256",
      "web crypto api",
      "javascript md5",
      "crypto js",
    ],
    searchVolume: 68,
  },

  // Placeholder entries for remaining slugs (to satisfy TypeScript)
  // These will be expanded in Phase 2
  "json-in-nodejs": {
    slug: "json-in-nodejs",
    tool: "json",
    language: "nodejs",
    category: "data-format",
    title: {
      en: "JSON in Node.js",
      ko: "Node.js에서 JSON",
      ja: "Node.jsでJSON",
    },
    description: {
      en: "Handle JSON in Node.js",
      ko: "Node.js에서 JSON 처리",
      ja: "Node.jsでJSON処理",
    },
    useCases: {
      en: ["Read JSON files"],
      ko: ["JSON 파일 읽기"],
      ja: ["JSONファイル読み込み"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["nodejs json", "node json parse"],
    searchVolume: 60,
  },
  "json-in-java": {
    slug: "json-in-java",
    tool: "json",
    language: "java",
    category: "data-format",
    title: { en: "JSON in Java", ko: "Java에서 JSON", ja: "JavaでJSON" },
    description: {
      en: "Handle JSON in Java",
      ko: "Java에서 JSON 처리",
      ja: "JavaでJSON処理",
    },
    useCases: {
      en: ["Parse JSON with Jackson"],
      ko: ["Jackson으로 JSON 파싱"],
      ja: ["JacksonでJSON解析"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["java json", "jackson json"],
    searchVolume: 55,
  },
  "json-in-csharp": {
    slug: "json-in-csharp",
    tool: "json",
    language: "csharp",
    category: "data-format",
    title: { en: "JSON in C#", ko: "C#에서 JSON", ja: "C#でJSON" },
    description: {
      en: "Handle JSON in C#",
      ko: "C#에서 JSON 처리",
      ja: "C#でJSON処理",
    },
    useCases: {
      en: ["Serialize with System.Text.Json"],
      ko: ["System.Text.Json으로 직렬화"],
      ja: ["System.Text.Jsonで直列化"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["csharp json", "c# json serialize"],
    searchVolume: 50,
  },
  "json-in-go": {
    slug: "json-in-go",
    tool: "json",
    language: "go",
    category: "data-format",
    title: { en: "JSON in Go", ko: "Go에서 JSON", ja: "GoでJSON" },
    description: {
      en: "Handle JSON in Go",
      ko: "Go에서 JSON 처리",
      ja: "GoでJSON処理",
    },
    useCases: {
      en: ["Marshal/Unmarshal JSON"],
      ko: ["JSON 마샬링"],
      ja: ["JSONマーシャリング"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["go json", "golang json marshal"],
    searchVolume: 48,
  },
  "json-in-rust": {
    slug: "json-in-rust",
    tool: "json",
    language: "rust",
    category: "data-format",
    title: { en: "JSON in Rust", ko: "Rust에서 JSON", ja: "RustでJSON" },
    description: {
      en: "Handle JSON in Rust",
      ko: "Rust에서 JSON 처리",
      ja: "RustでJSON処理",
    },
    useCases: {
      en: ["Use serde_json"],
      ko: ["serde_json 사용"],
      ja: ["serde_json使用"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["rust json", "serde json"],
    searchVolume: 40,
  },
  "json-in-php": {
    slug: "json-in-php",
    tool: "json",
    language: "php",
    category: "data-format",
    title: { en: "JSON in PHP", ko: "PHP에서 JSON", ja: "PHPでJSON" },
    description: {
      en: "Handle JSON in PHP",
      ko: "PHP에서 JSON 처리",
      ja: "PHPでJSON処理",
    },
    useCases: {
      en: ["json_encode/decode"],
      ko: ["json_encode/decode"],
      ja: ["json_encode/decode"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["php json", "json_encode php"],
    searchVolume: 45,
  },
  "json-in-ruby": {
    slug: "json-in-ruby",
    tool: "json",
    language: "ruby",
    category: "data-format",
    title: { en: "JSON in Ruby", ko: "Ruby에서 JSON", ja: "RubyでJSON" },
    description: {
      en: "Handle JSON in Ruby",
      ko: "Ruby에서 JSON 처리",
      ja: "RubyでJSON処理",
    },
    useCases: {
      en: ["JSON.parse/generate"],
      ko: ["JSON.parse/generate"],
      ja: ["JSON.parse/generate"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["ruby json", "json parse ruby"],
    searchVolume: 35,
  },
  "yaml-in-nodejs": {
    slug: "yaml-in-nodejs",
    tool: "yaml",
    language: "nodejs",
    category: "data-format",
    title: {
      en: "YAML in Node.js",
      ko: "Node.js에서 YAML",
      ja: "Node.jsでYAML",
    },
    description: {
      en: "Handle YAML in Node.js",
      ko: "Node.js에서 YAML 처리",
      ja: "Node.jsでYAML処理",
    },
    useCases: {
      en: ["Read config files"],
      ko: ["설정 파일 읽기"],
      ja: ["設定ファイル読み込み"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["nodejs yaml", "node yaml parse"],
    searchVolume: 55,
  },
  "yaml-in-go": {
    slug: "yaml-in-go",
    tool: "yaml",
    language: "go",
    category: "data-format",
    title: { en: "YAML in Go", ko: "Go에서 YAML", ja: "GoでYAML" },
    description: {
      en: "Handle YAML in Go",
      ko: "Go에서 YAML 처리",
      ja: "GoでYAML処理",
    },
    useCases: {
      en: ["gopkg.in/yaml.v3"],
      ko: ["gopkg.in/yaml.v3"],
      ja: ["gopkg.in/yaml.v3"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["go yaml", "golang yaml"],
    searchVolume: 40,
  },
  "yaml-in-ruby": {
    slug: "yaml-in-ruby",
    tool: "yaml",
    language: "ruby",
    category: "data-format",
    title: { en: "YAML in Ruby", ko: "Ruby에서 YAML", ja: "RubyでYAML" },
    description: {
      en: "Handle YAML in Ruby",
      ko: "Ruby에서 YAML 처리",
      ja: "RubyでYAML処理",
    },
    useCases: {
      en: ["YAML.load/dump"],
      ko: ["YAML.load/dump"],
      ja: ["YAML.load/dump"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["ruby yaml", "yaml load ruby"],
    searchVolume: 30,
  },
  "yaml-in-java": {
    slug: "yaml-in-java",
    tool: "yaml",
    language: "java",
    category: "data-format",
    title: { en: "YAML in Java", ko: "Java에서 YAML", ja: "JavaでYAML" },
    description: {
      en: "Handle YAML in Java",
      ko: "Java에서 YAML 처리",
      ja: "JavaでYAML処理",
    },
    useCases: {
      en: ["SnakeYAML library"],
      ko: ["SnakeYAML 라이브러리"],
      ja: ["SnakeYAMLライブラリ"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["java yaml", "snakeyaml"],
    searchVolume: 38,
  },
  "base64-in-nodejs": {
    slug: "base64-in-nodejs",
    tool: "base64",
    language: "nodejs",
    category: "encoding",
    title: {
      en: "Base64 in Node.js",
      ko: "Node.js에서 Base64",
      ja: "Node.jsでBase64",
    },
    description: {
      en: "Base64 encoding in Node.js",
      ko: "Node.js에서 Base64 인코딩",
      ja: "Node.jsでBase64エンコード",
    },
    useCases: {
      en: ["Buffer.from()"],
      ko: ["Buffer.from()"],
      ja: ["Buffer.from()"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "base64-converter",
    keywords: ["nodejs base64", "node buffer base64"],
    searchVolume: 65,
  },
  "base64-in-java": {
    slug: "base64-in-java",
    tool: "base64",
    language: "java",
    category: "encoding",
    title: { en: "Base64 in Java", ko: "Java에서 Base64", ja: "JavaでBase64" },
    description: {
      en: "Base64 encoding in Java",
      ko: "Java에서 Base64 인코딩",
      ja: "JavaでBase64エンコード",
    },
    useCases: {
      en: ["java.util.Base64"],
      ko: ["java.util.Base64"],
      ja: ["java.util.Base64"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "base64-converter",
    keywords: ["java base64", "base64 encoder java"],
    searchVolume: 55,
  },
  "base64-in-csharp": {
    slug: "base64-in-csharp",
    tool: "base64",
    language: "csharp",
    category: "encoding",
    title: { en: "Base64 in C#", ko: "C#에서 Base64", ja: "C#でBase64" },
    description: {
      en: "Base64 encoding in C#",
      ko: "C#에서 Base64 인코딩",
      ja: "C#でBase64エンコード",
    },
    useCases: {
      en: ["Convert.ToBase64String"],
      ko: ["Convert.ToBase64String"],
      ja: ["Convert.ToBase64String"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "base64-converter",
    keywords: ["c# base64", "csharp base64 encode"],
    searchVolume: 45,
  },
  "base64-in-go": {
    slug: "base64-in-go",
    tool: "base64",
    language: "go",
    category: "encoding",
    title: { en: "Base64 in Go", ko: "Go에서 Base64", ja: "GoでBase64" },
    description: {
      en: "Base64 encoding in Go",
      ko: "Go에서 Base64 인코딩",
      ja: "GoでBase64エンコード",
    },
    useCases: {
      en: ["encoding/base64"],
      ko: ["encoding/base64"],
      ja: ["encoding/base64"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "base64-converter",
    keywords: ["go base64", "golang base64"],
    searchVolume: 40,
  },
  "hash-in-nodejs": {
    slug: "hash-in-nodejs",
    tool: "hash",
    language: "nodejs",
    category: "security",
    title: {
      en: "Hash in Node.js",
      ko: "Node.js에서 해시",
      ja: "Node.jsでハッシュ",
    },
    description: {
      en: "Hash functions in Node.js",
      ko: "Node.js에서 해시 함수",
      ja: "Node.jsでハッシュ関数",
    },
    useCases: {
      en: ["crypto.createHash"],
      ko: ["crypto.createHash"],
      ja: ["crypto.createHash"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "hash-generator",
    keywords: ["nodejs hash", "node crypto hash"],
    searchVolume: 55,
  },
  "hash-in-java": {
    slug: "hash-in-java",
    tool: "hash",
    language: "java",
    category: "security",
    title: { en: "Hash in Java", ko: "Java에서 해시", ja: "Javaでハッシュ" },
    description: {
      en: "Hash functions in Java",
      ko: "Java에서 해시 함수",
      ja: "Javaでハッシュ関数",
    },
    useCases: {
      en: ["MessageDigest"],
      ko: ["MessageDigest"],
      ja: ["MessageDigest"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "hash-generator",
    keywords: ["java hash", "java sha256"],
    searchVolume: 50,
  },
  "hash-in-go": {
    slug: "hash-in-go",
    tool: "hash",
    language: "go",
    category: "security",
    title: { en: "Hash in Go", ko: "Go에서 해시", ja: "Goでハッシュ" },
    description: {
      en: "Hash functions in Go",
      ko: "Go에서 해시 함수",
      ja: "Goでハッシュ関数",
    },
    useCases: {
      en: ["crypto/sha256"],
      ko: ["crypto/sha256"],
      ja: ["crypto/sha256"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "hash-generator",
    keywords: ["go hash", "golang sha256"],
    searchVolume: 35,
  },
  "regex-in-python": {
    slug: "regex-in-python",
    tool: "regex",
    language: "python",
    category: "utility",
    title: {
      en: "Regex in Python",
      ko: "Python에서 정규식",
      ja: "Pythonで正規表現",
    },
    description: {
      en: "Regular expressions in Python",
      ko: "Python에서 정규 표현식",
      ja: "Pythonでの正規表現",
    },
    useCases: { en: ["re module"], ko: ["re 모듈"], ja: ["reモジュール"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "regex-tester",
    keywords: ["python regex", "python re"],
    searchVolume: 75,
  },
  "regex-in-javascript": {
    slug: "regex-in-javascript",
    tool: "regex",
    language: "javascript",
    category: "utility",
    title: {
      en: "Regex in JavaScript",
      ko: "JavaScript에서 정규식",
      ja: "JavaScriptで正規表現",
    },
    description: {
      en: "Regular expressions in JavaScript",
      ko: "JavaScript에서 정규 표현식",
      ja: "JavaScriptでの正規表現",
    },
    useCases: {
      en: ["RegExp object"],
      ko: ["RegExp 객체"],
      ja: ["RegExpオブジェクト"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "regex-tester",
    keywords: ["javascript regex", "js regexp"],
    searchVolume: 78,
  },
  "regex-in-java": {
    slug: "regex-in-java",
    tool: "regex",
    language: "java",
    category: "utility",
    title: { en: "Regex in Java", ko: "Java에서 정규식", ja: "Javaで正規表現" },
    description: {
      en: "Regular expressions in Java",
      ko: "Java에서 정규 표현식",
      ja: "Javaでの正規表現",
    },
    useCases: {
      en: ["Pattern/Matcher"],
      ko: ["Pattern/Matcher"],
      ja: ["Pattern/Matcher"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "regex-tester",
    keywords: ["java regex", "java pattern matcher"],
    searchVolume: 55,
  },
  "regex-in-go": {
    slug: "regex-in-go",
    tool: "regex",
    language: "go",
    category: "utility",
    title: { en: "Regex in Go", ko: "Go에서 정규식", ja: "Goで正規表現" },
    description: {
      en: "Regular expressions in Go",
      ko: "Go에서 정규 표현식",
      ja: "Goでの正規表現",
    },
    useCases: {
      en: ["regexp package"],
      ko: ["regexp 패키지"],
      ja: ["regexpパッケージ"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "regex-tester",
    keywords: ["go regex", "golang regexp"],
    searchVolume: 40,
  },
  "regex-in-php": {
    slug: "regex-in-php",
    tool: "regex",
    language: "php",
    category: "utility",
    title: { en: "Regex in PHP", ko: "PHP에서 정규식", ja: "PHPで正規表現" },
    description: {
      en: "Regular expressions in PHP",
      ko: "PHP에서 정규 표현식",
      ja: "PHPでの正規表現",
    },
    useCases: { en: ["preg_match"], ko: ["preg_match"], ja: ["preg_match"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "regex-tester",
    keywords: ["php regex", "preg_match"],
    searchVolume: 50,
  },
  "jwt-in-python": {
    slug: "jwt-in-python",
    tool: "jwt",
    language: "python",
    category: "security",
    title: { en: "JWT in Python", ko: "Python에서 JWT", ja: "PythonでJWT" },
    description: {
      en: "JWT handling in Python",
      ko: "Python에서 JWT 처리",
      ja: "PythonでJWT処理",
    },
    useCases: {
      en: ["PyJWT library"],
      ko: ["PyJWT 라이브러리"],
      ja: ["PyJWTライブラリ"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "jwt-decoder",
    keywords: ["python jwt", "pyjwt"],
    searchVolume: 60,
  },
  "jwt-in-javascript": {
    slug: "jwt-in-javascript",
    tool: "jwt",
    language: "javascript",
    category: "security",
    title: {
      en: "JWT in JavaScript",
      ko: "JavaScript에서 JWT",
      ja: "JavaScriptでJWT",
    },
    description: {
      en: "JWT handling in JavaScript",
      ko: "JavaScript에서 JWT 처리",
      ja: "JavaScriptでJWT処理",
    },
    useCases: {
      en: ["jsonwebtoken"],
      ko: ["jsonwebtoken"],
      ja: ["jsonwebtoken"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "jwt-decoder",
    keywords: ["javascript jwt", "jsonwebtoken"],
    searchVolume: 65,
  },
  "jwt-in-nodejs": {
    slug: "jwt-in-nodejs",
    tool: "jwt",
    language: "nodejs",
    category: "security",
    title: { en: "JWT in Node.js", ko: "Node.js에서 JWT", ja: "Node.jsでJWT" },
    description: {
      en: "JWT handling in Node.js",
      ko: "Node.js에서 JWT 처리",
      ja: "Node.jsでJWT処理",
    },
    useCases: {
      en: ["jsonwebtoken"],
      ko: ["jsonwebtoken"],
      ja: ["jsonwebtoken"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "jwt-decoder",
    keywords: ["nodejs jwt", "node jsonwebtoken"],
    searchVolume: 70,
  },
  "jwt-in-java": {
    slug: "jwt-in-java",
    tool: "jwt",
    language: "java",
    category: "security",
    title: { en: "JWT in Java", ko: "Java에서 JWT", ja: "JavaでJWT" },
    description: {
      en: "JWT handling in Java",
      ko: "Java에서 JWT 처리",
      ja: "JavaでJWT処理",
    },
    useCases: {
      en: ["jjwt library"],
      ko: ["jjwt 라이브러리"],
      ja: ["jjwtライブラリ"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "jwt-decoder",
    keywords: ["java jwt", "jjwt"],
    searchVolume: 50,
  },
  "uuid-in-python": {
    slug: "uuid-in-python",
    tool: "uuid",
    language: "python",
    category: "utility",
    title: { en: "UUID in Python", ko: "Python에서 UUID", ja: "PythonでUUID" },
    description: {
      en: "UUID generation in Python",
      ko: "Python에서 UUID 생성",
      ja: "PythonでUUID生成",
    },
    useCases: {
      en: ["uuid module"],
      ko: ["uuid 모듈"],
      ja: ["uuidモジュール"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "uuid-generator",
    keywords: ["python uuid", "python uuid4"],
    searchVolume: 55,
  },
  "uuid-in-javascript": {
    slug: "uuid-in-javascript",
    tool: "uuid",
    language: "javascript",
    category: "utility",
    title: {
      en: "UUID in JavaScript",
      ko: "JavaScript에서 UUID",
      ja: "JavaScriptでUUID",
    },
    description: {
      en: "UUID generation in JavaScript",
      ko: "JavaScript에서 UUID 생성",
      ja: "JavaScriptでUUID生成",
    },
    useCases: {
      en: ["crypto.randomUUID"],
      ko: ["crypto.randomUUID"],
      ja: ["crypto.randomUUID"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "uuid-generator",
    keywords: ["javascript uuid", "js uuid"],
    searchVolume: 60,
  },
  "uuid-in-java": {
    slug: "uuid-in-java",
    tool: "uuid",
    language: "java",
    category: "utility",
    title: { en: "UUID in Java", ko: "Java에서 UUID", ja: "JavaでUUID" },
    description: {
      en: "UUID generation in Java",
      ko: "Java에서 UUID 생성",
      ja: "JavaでUUID生成",
    },
    useCases: {
      en: ["java.util.UUID"],
      ko: ["java.util.UUID"],
      ja: ["java.util.UUID"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "uuid-generator",
    keywords: ["java uuid", "uuid randomuuid"],
    searchVolume: 50,
  },
  "uuid-in-go": {
    slug: "uuid-in-go",
    tool: "uuid",
    language: "go",
    category: "utility",
    title: { en: "UUID in Go", ko: "Go에서 UUID", ja: "GoでUUID" },
    description: {
      en: "UUID generation in Go",
      ko: "Go에서 UUID 생성",
      ja: "GoでUUID生成",
    },
    useCases: { en: ["google/uuid"], ko: ["google/uuid"], ja: ["google/uuid"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "uuid-generator",
    keywords: ["go uuid", "golang uuid"],
    searchVolume: 40,
  },
  "url-encoding-in-python": {
    slug: "url-encoding-in-python",
    tool: "url-encoding",
    language: "python",
    category: "encoding",
    title: {
      en: "URL Encoding in Python",
      ko: "Python에서 URL 인코딩",
      ja: "PythonでURLエンコード",
    },
    description: {
      en: "URL encoding in Python",
      ko: "Python에서 URL 인코딩",
      ja: "PythonでURLエンコード",
    },
    useCases: {
      en: ["urllib.parse"],
      ko: ["urllib.parse"],
      ja: ["urllib.parse"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "url-encoder",
    keywords: ["python url encode", "urllib quote"],
    searchVolume: 55,
  },
  "url-encoding-in-javascript": {
    slug: "url-encoding-in-javascript",
    tool: "url-encoding",
    language: "javascript",
    category: "encoding",
    title: {
      en: "URL Encoding in JavaScript",
      ko: "JavaScript에서 URL 인코딩",
      ja: "JavaScriptでURLエンコード",
    },
    description: {
      en: "URL encoding in JavaScript",
      ko: "JavaScript에서 URL 인코딩",
      ja: "JavaScriptでURLエンコード",
    },
    useCases: {
      en: ["encodeURIComponent"],
      ko: ["encodeURIComponent"],
      ja: ["encodeURIComponent"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "url-encoder",
    keywords: ["javascript url encode", "encodeuricomponent"],
    searchVolume: 65,
  },
  "url-encoding-in-java": {
    slug: "url-encoding-in-java",
    tool: "url-encoding",
    language: "java",
    category: "encoding",
    title: {
      en: "URL Encoding in Java",
      ko: "Java에서 URL 인코딩",
      ja: "JavaでURLエンコード",
    },
    description: {
      en: "URL encoding in Java",
      ko: "Java에서 URL 인코딩",
      ja: "JavaでURLエンコード",
    },
    useCases: {
      en: ["URLEncoder.encode"],
      ko: ["URLEncoder.encode"],
      ja: ["URLEncoder.encode"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "url-encoder",
    keywords: ["java url encode", "urlencoder java"],
    searchVolume: 45,
  },
  "url-encoding-in-php": {
    slug: "url-encoding-in-php",
    tool: "url-encoding",
    language: "php",
    category: "encoding",
    title: {
      en: "URL Encoding in PHP",
      ko: "PHP에서 URL 인코딩",
      ja: "PHPでURLエンコード",
    },
    description: {
      en: "URL encoding in PHP",
      ko: "PHP에서 URL 인코딩",
      ja: "PHPでURLエンコード",
    },
    useCases: { en: ["urlencode()"], ko: ["urlencode()"], ja: ["urlencode()"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "url-encoder",
    keywords: ["php url encode", "urlencode php"],
    searchVolume: 40,
  },
  "xml-in-python": {
    slug: "xml-in-python",
    tool: "xml",
    language: "python",
    category: "data-format",
    title: { en: "XML in Python", ko: "Python에서 XML", ja: "PythonでXML" },
    description: {
      en: "XML parsing in Python",
      ko: "Python에서 XML 파싱",
      ja: "PythonでXML解析",
    },
    useCases: { en: ["ElementTree"], ko: ["ElementTree"], ja: ["ElementTree"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["python xml", "elementtree"],
    searchVolume: 50,
  },
  "xml-in-javascript": {
    slug: "xml-in-javascript",
    tool: "xml",
    language: "javascript",
    category: "data-format",
    title: {
      en: "XML in JavaScript",
      ko: "JavaScript에서 XML",
      ja: "JavaScriptでXML",
    },
    description: {
      en: "XML parsing in JavaScript",
      ko: "JavaScript에서 XML 파싱",
      ja: "JavaScriptでXML解析",
    },
    useCases: { en: ["DOMParser"], ko: ["DOMParser"], ja: ["DOMParser"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["javascript xml", "domparser xml"],
    searchVolume: 45,
  },
  "xml-in-java": {
    slug: "xml-in-java",
    tool: "xml",
    language: "java",
    category: "data-format",
    title: { en: "XML in Java", ko: "Java에서 XML", ja: "JavaでXML" },
    description: {
      en: "XML parsing in Java",
      ko: "Java에서 XML 파싱",
      ja: "JavaでXML解析",
    },
    useCases: { en: ["JAXB/DOM"], ko: ["JAXB/DOM"], ja: ["JAXB/DOM"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["java xml", "jaxb xml"],
    searchVolume: 48,
  },
  "xml-in-csharp": {
    slug: "xml-in-csharp",
    tool: "xml",
    language: "csharp",
    category: "data-format",
    title: { en: "XML in C#", ko: "C#에서 XML", ja: "C#でXML" },
    description: {
      en: "XML parsing in C#",
      ko: "C#에서 XML 파싱",
      ja: "C#でXML解析",
    },
    useCases: { en: ["XDocument"], ko: ["XDocument"], ja: ["XDocument"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["c# xml", "xdocument"],
    searchVolume: 42,
  },
  "csv-in-python": {
    slug: "csv-in-python",
    tool: "csv",
    language: "python",
    category: "data-format",
    title: { en: "CSV in Python", ko: "Python에서 CSV", ja: "PythonでCSV" },
    description: {
      en: "CSV handling in Python",
      ko: "Python에서 CSV 처리",
      ja: "PythonでCSV処理",
    },
    useCases: {
      en: ["csv module, pandas"],
      ko: ["csv 모듈, pandas"],
      ja: ["csvモジュール, pandas"],
    },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["python csv", "pandas csv"],
    searchVolume: 70,
  },
  "csv-in-javascript": {
    slug: "csv-in-javascript",
    tool: "csv",
    language: "javascript",
    category: "data-format",
    title: {
      en: "CSV in JavaScript",
      ko: "JavaScript에서 CSV",
      ja: "JavaScriptでCSV",
    },
    description: {
      en: "CSV handling in JavaScript",
      ko: "JavaScript에서 CSV 처리",
      ja: "JavaScriptでCSV処理",
    },
    useCases: { en: ["PapaParse"], ko: ["PapaParse"], ja: ["PapaParse"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["javascript csv", "papaparse"],
    searchVolume: 55,
  },
  "csv-in-java": {
    slug: "csv-in-java",
    tool: "csv",
    language: "java",
    category: "data-format",
    title: { en: "CSV in Java", ko: "Java에서 CSV", ja: "JavaでCSV" },
    description: {
      en: "CSV handling in Java",
      ko: "Java에서 CSV 처리",
      ja: "JavaでCSV処理",
    },
    useCases: { en: ["OpenCSV"], ko: ["OpenCSV"], ja: ["OpenCSV"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["java csv", "opencsv"],
    searchVolume: 45,
  },
  "csv-in-php": {
    slug: "csv-in-php",
    tool: "csv",
    language: "php",
    category: "data-format",
    title: { en: "CSV in PHP", ko: "PHP에서 CSV", ja: "PHPでCSV" },
    description: {
      en: "CSV handling in PHP",
      ko: "PHP에서 CSV 처리",
      ja: "PHPでCSV処理",
    },
    useCases: { en: ["fgetcsv"], ko: ["fgetcsv"], ja: ["fgetcsv"] },
    codeExamples: { en: [], ko: [], ja: [] },
    relatedTool: "json-formatter",
    keywords: ["php csv", "fgetcsv"],
    searchVolume: 40,
  },
};

// Helper functions
export function getAllLanguageTypeSlugs(): LanguageTypeSlug[] {
  return Object.keys(LANGUAGE_TYPE_REGISTRY) as LanguageTypeSlug[];
}

export function getLanguageType(
  slug: LanguageTypeSlug,
): LanguageType | undefined {
  return LANGUAGE_TYPE_REGISTRY[slug];
}

export function getLanguageTypesByCategory(
  category: LanguageType["category"],
): LanguageType[] {
  return Object.values(LANGUAGE_TYPE_REGISTRY).filter(
    (lt) => lt.category === category,
  );
}

export function getLanguageTypesByTool(
  tool: LanguageType["tool"],
): LanguageType[] {
  return Object.values(LANGUAGE_TYPE_REGISTRY).filter((lt) => lt.tool === tool);
}

export function getLanguageTypesByLanguage(
  language: LanguageType["language"],
): LanguageType[] {
  return Object.values(LANGUAGE_TYPE_REGISTRY).filter(
    (lt) => lt.language === language,
  );
}
