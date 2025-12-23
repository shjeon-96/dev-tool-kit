import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Code,
  Key,
  Zap,
  Shield,
  Clock,
  Terminal,
  FileJson,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/shared/config";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "API Documentation - Web Toolkit Developer API",
    ko: "API 문서 - Web Toolkit 개발자 API",
    ja: "APIドキュメント - Web Toolkit 開発者API",
  };

  const descriptions: Record<string, string> = {
    en: "Complete API documentation for Web Toolkit. Access JSON formatting, hash generation, QR code creation, and more via REST API.",
    ko: "Web Toolkit의 완전한 API 문서. REST API를 통해 JSON 포맷팅, 해시 생성, QR 코드 생성 등을 사용할 수 있습니다.",
    ja: "Web ToolkitのAPI完全ドキュメント。REST APIでJSONフォーマット、ハッシュ生成、QRコード作成などを利用できます。",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/docs/api`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/docs/api`,
      languages: {
        en: `${SITE_CONFIG.url}/en/docs/api`,
        ko: `${SITE_CONFIG.url}/ko/docs/api`,
        ja: `${SITE_CONFIG.url}/ja/docs/api`,
      },
    },
  };
}

export default async function ApiDocsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("api");

  const content = getContent(locale);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Terminal className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{content.title}</h1>
        </div>
        <p className="text-muted-foreground text-lg">{content.description}</p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={`/${locale}/docs/api/swagger`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            {content.tryItOut}
          </Link>
          <a
            href="/openapi.yaml"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-muted transition-colors text-sm font-medium"
          >
            <FileJson className="h-4 w-4" />
            {content.downloadSpec}
          </a>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-lg border bg-card">
            <Key className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-medium">{content.authMethod}</p>
            <p className="text-xs text-muted-foreground">Bearer Token</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <Zap className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-medium">{content.rateLimit}</p>
            <p className="text-xs text-muted-foreground">60/min, 10K/day</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <Shield className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-medium">{content.access}</p>
            <p className="text-xs text-muted-foreground">Pro Only</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <Clock className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-medium">{content.format}</p>
            <p className="text-xs text-muted-foreground">JSON</p>
          </div>
        </div>
      </div>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Key className="h-5 w-5" />
          {content.authTitle}
        </h2>
        <p className="text-muted-foreground mb-4">{content.authDesc}</p>
        <CodeBlock
          title="Authorization Header"
          code={`Authorization: Bearer wtk_your_api_key_here`}
        />
        <p className="text-sm text-muted-foreground mt-4">{content.authNote}</p>
      </section>

      {/* Base URL */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{content.baseUrlTitle}</h2>
        <CodeBlock title="Base URL" code={`${SITE_CONFIG.url}/api/v1`} />
      </section>

      {/* Endpoints */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Code className="h-5 w-5" />
          {content.endpointsTitle}
        </h2>

        {/* JSON Format */}
        <EndpointSection
          method="POST"
          path="/json/format"
          title={content.jsonTitle}
          description={content.jsonDesc}
          requestBody={`{
  "json": "{\\"name\\":\\"test\\"}",
  "indent": 2,
  "minify": false
}`}
          responseBody={`{
  "success": true,
  "data": {
    "formatted": "{\\n  \\"name\\": \\"test\\"\\n}",
    "valid": true,
    "size": {
      "original": 16,
      "formatted": 22
    }
  }
}`}
          params={[
            {
              name: "json",
              type: "string | object",
              required: true,
              desc: content.jsonParamJson,
            },
            {
              name: "indent",
              type: "number",
              required: false,
              desc: content.jsonParamIndent,
            },
            {
              name: "minify",
              type: "boolean",
              required: false,
              desc: content.jsonParamMinify,
            },
          ]}
        />

        {/* Hash Generate */}
        <EndpointSection
          method="POST"
          path="/hash/generate"
          title={content.hashTitle}
          description={content.hashDesc}
          requestBody={`{
  "input": "hello world",
  "algorithm": "sha256",
  "encoding": "hex"
}`}
          responseBody={`{
  "success": true,
  "data": {
    "hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    "algorithm": "sha256",
    "encoding": "hex",
    "inputLength": 11
  }
}`}
          params={[
            {
              name: "input",
              type: "string",
              required: true,
              desc: content.hashParamInput,
            },
            {
              name: "algorithm",
              type: "string",
              required: false,
              desc: content.hashParamAlgorithm,
            },
            {
              name: "encoding",
              type: "string",
              required: false,
              desc: content.hashParamEncoding,
            },
          ]}
        />

        {/* QR Generate */}
        <EndpointSection
          method="POST"
          path="/qr/generate"
          title={content.qrTitle}
          description={content.qrDesc}
          requestBody={`{
  "data": "https://example.com",
  "format": "dataurl",
  "size": 256,
  "margin": 4,
  "errorCorrectionLevel": "M",
  "color": {
    "dark": "#000000",
    "light": "#ffffff"
  }
}`}
          responseBody={`{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,...",
    "format": "dataurl",
    "size": 256,
    "dataLength": 19
  }
}`}
          params={[
            {
              name: "data",
              type: "string",
              required: true,
              desc: content.qrParamData,
            },
            {
              name: "format",
              type: "string",
              required: false,
              desc: content.qrParamFormat,
            },
            {
              name: "size",
              type: "number",
              required: false,
              desc: content.qrParamSize,
            },
            {
              name: "margin",
              type: "number",
              required: false,
              desc: content.qrParamMargin,
            },
            {
              name: "errorCorrectionLevel",
              type: "string",
              required: false,
              desc: content.qrParamEcl,
            },
            {
              name: "color",
              type: "object",
              required: false,
              desc: content.qrParamColor,
            },
          ]}
        />

        {/* Base64 Convert */}
        <EndpointSection
          method="POST"
          path="/base64/convert"
          title={content.base64Title}
          description={content.base64Desc}
          requestBody={`{
  "input": "Hello, World!",
  "mode": "encode",
  "urlSafe": false
}`}
          responseBody={`{
  "success": true,
  "data": {
    "result": "SGVsbG8sIFdvcmxkIQ==",
    "mode": "encode",
    "urlSafe": false,
    "inputLength": 13,
    "outputLength": 20
  }
}`}
          params={[
            {
              name: "input",
              type: "string",
              required: true,
              desc: content.base64ParamInput,
            },
            {
              name: "mode",
              type: "string",
              required: false,
              desc: content.base64ParamMode,
            },
            {
              name: "urlSafe",
              type: "boolean",
              required: false,
              desc: content.base64ParamUrlSafe,
            },
          ]}
        />

        {/* UUID Generate */}
        <EndpointSection
          method="POST"
          path="/uuid/generate"
          title={content.uuidTitle}
          description={content.uuidDesc}
          requestBody={`{
  "version": "v4",
  "count": 5,
  "format": "standard"
}`}
          responseBody={`{
  "success": true,
  "data": {
    "uuids": [
      "550e8400-e29b-41d4-a716-446655440000",
      "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      ...
    ],
    "version": "v4",
    "format": "standard",
    "count": 5
  }
}`}
          params={[
            {
              name: "version",
              type: "string",
              required: false,
              desc: content.uuidParamVersion,
            },
            {
              name: "count",
              type: "number",
              required: false,
              desc: content.uuidParamCount,
            },
            {
              name: "format",
              type: "string",
              required: false,
              desc: content.uuidParamFormat,
            },
          ]}
        />
      </section>

      {/* Error Codes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{content.errorsTitle}</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">
                  {content.errorCode}
                </th>
                <th className="text-left p-3 font-medium">
                  {content.errorDesc}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    401
                  </code>
                </td>
                <td className="p-3 text-muted-foreground">
                  {content.error401}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    403
                  </code>
                </td>
                <td className="p-3 text-muted-foreground">
                  {content.error403}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    429
                  </code>
                </td>
                <td className="p-3 text-muted-foreground">
                  {content.error429}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    400
                  </code>
                </td>
                <td className="p-3 text-muted-foreground">
                  {content.error400}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    500
                  </code>
                </td>
                <td className="p-3 text-muted-foreground">
                  {content.error500}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Example Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{content.exampleTitle}</h2>

        <h3 className="text-lg font-medium mb-2">cURL</h3>
        <CodeBlock
          code={`curl -X POST ${SITE_CONFIG.url}/api/v1/json/format \\
  -H "Authorization: Bearer wtk_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"json": "{\\"name\\":\\"test\\"}", "indent": 2}'`}
        />

        <h3 className="text-lg font-medium mb-2 mt-6">JavaScript (fetch)</h3>
        <CodeBlock
          language="javascript"
          code={`const response = await fetch('${SITE_CONFIG.url}/api/v1/json/format', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer wtk_your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    json: '{"name":"test"}',
    indent: 2
  })
});

const data = await response.json();
console.log(data.data.formatted);`}
        />

        <h3 className="text-lg font-medium mb-2 mt-6">Python (requests)</h3>
        <CodeBlock
          language="python"
          code={`import requests

response = requests.post(
    '${SITE_CONFIG.url}/api/v1/json/format',
    headers={
        'Authorization': 'Bearer wtk_your_api_key',
        'Content-Type': 'application/json'
    },
    json={
        'json': '{"name":"test"}',
        'indent': 2
    }
)

data = response.json()
print(data['data']['formatted'])`}
        />
      </section>
    </div>
  );
}

function CodeBlock({
  title,
  code,
  language = "bash",
}: {
  title?: string;
  code: string;
  language?: string;
}) {
  return (
    <div className="rounded-lg border overflow-hidden">
      {title && (
        <div className="bg-muted/50 px-4 py-2 border-b text-sm font-medium">
          {title}
        </div>
      )}
      <pre className="p-4 bg-muted/30 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface Param {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

function EndpointSection({
  method,
  path,
  title,
  description,
  requestBody,
  responseBody,
  params,
}: {
  method: string;
  path: string;
  title: string;
  description: string;
  requestBody: string;
  responseBody: string;
  params: Param[];
}) {
  return (
    <div className="mb-10 p-6 rounded-lg border bg-card">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-2 py-1 text-xs font-bold rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          {method}
        </span>
        <code className="text-sm font-medium">{path}</code>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>

      {/* Parameters */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Parameters</h4>
        <div className="rounded border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-2 font-medium">Name</th>
                <th className="text-left p-2 font-medium">Type</th>
                <th className="text-left p-2 font-medium">Required</th>
                <th className="text-left p-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {params.map((param) => (
                <tr key={param.name}>
                  <td className="p-2">
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {param.name}
                    </code>
                  </td>
                  <td className="p-2 text-muted-foreground">{param.type}</td>
                  <td className="p-2">
                    {param.required ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="p-2 text-muted-foreground">{param.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request/Response */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Request Body</h4>
          <CodeBlock code={requestBody} language="json" />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Response</h4>
          <CodeBlock code={responseBody} language="json" />
        </div>
      </div>
    </div>
  );
}

function getContent(locale: string) {
  const content: Record<string, Record<string, string>> = {
    en: {
      title: "API Documentation",
      description:
        "Access Web Toolkit features programmatically with our REST API. Available for Pro subscribers.",
      tryItOut: "Try it out (Swagger UI)",
      downloadSpec: "Download OpenAPI Spec",
      authMethod: "Authentication",
      rateLimit: "Rate Limit",
      access: "Access",
      format: "Format",
      authTitle: "Authentication",
      authDesc:
        "All API requests require authentication using a Bearer token. Include your API key in the Authorization header.",
      authNote:
        "Get your API key from the Dashboard > API Keys section. Keep your API key secure and never expose it in client-side code.",
      baseUrlTitle: "Base URL",
      endpointsTitle: "Endpoints",
      jsonTitle: "JSON Formatter",
      jsonDesc: "Format or minify JSON data with customizable indentation.",
      jsonParamJson: "JSON string or object to format",
      jsonParamIndent: "Indentation size (default: 2)",
      jsonParamMinify: "Minify output (default: false)",
      hashTitle: "Hash Generator",
      hashDesc:
        "Generate cryptographic hashes using various algorithms. Supports MD5, SHA1, SHA256, SHA384, SHA512, SHA3-256, SHA3-512.",
      hashParamInput: "Text to hash",
      hashParamAlgorithm:
        "Hash algorithm (default: sha256). Options: md5, sha1, sha256, sha384, sha512, sha3-256, sha3-512",
      hashParamEncoding:
        'Output encoding (default: hex). Options: "hex", "base64"',
      qrTitle: "QR Code Generator",
      qrDesc: "Generate QR codes with customizable size, colors, and format.",
      qrParamData: "Data to encode in QR code (max 4296 chars)",
      qrParamFormat:
        'Output format (default: dataurl). Options: "png", "svg", "dataurl"',
      qrParamSize: "QR code size in pixels (default: 256, range: 64-1024)",
      qrParamMargin: "Quiet zone margin (default: 4, range: 0-10)",
      qrParamEcl:
        'Error correction level (default: M). Options: "L", "M", "Q", "H"',
      qrParamColor:
        "Colors object with dark (foreground) and light (background) hex colors",
      base64Title: "Base64 Converter",
      base64Desc:
        "Encode or decode text using Base64 encoding. Supports standard and URL-safe Base64.",
      base64ParamInput: "Text to encode or Base64 string to decode",
      base64ParamMode:
        'Conversion mode (default: encode). Options: "encode", "decode"',
      base64ParamUrlSafe:
        "Use URL-safe Base64 (default: false). Replaces +/ with -_ and removes padding",
      uuidTitle: "UUID Generator",
      uuidDesc:
        "Generate UUIDs (Universally Unique Identifiers) with various formats.",
      uuidParamVersion:
        'UUID version (default: v4). Options: "v4" (random), "nil" (all zeros)',
      uuidParamCount: "Number of UUIDs to generate (default: 1, max: 100)",
      uuidParamFormat:
        'Output format (default: standard). Options: "standard", "uppercase", "no-dashes", "braces"',
      errorsTitle: "Error Codes",
      errorCode: "Code",
      errorDesc: "Description",
      error401: "Invalid or missing API key",
      error403: "API access requires Pro subscription",
      error429: "Rate limit exceeded",
      error400: "Invalid request parameters",
      error500: "Internal server error",
      exampleTitle: "Example Usage",
    },
    ko: {
      title: "API 문서",
      description:
        "REST API를 통해 Web Toolkit 기능을 프로그래밍 방식으로 사용하세요. Pro 구독자 전용입니다.",
      tryItOut: "테스트하기 (Swagger UI)",
      downloadSpec: "OpenAPI 스펙 다운로드",
      authMethod: "인증",
      rateLimit: "요청 제한",
      access: "접근 권한",
      format: "형식",
      authTitle: "인증",
      authDesc:
        "모든 API 요청에는 Bearer 토큰을 사용한 인증이 필요합니다. Authorization 헤더에 API 키를 포함하세요.",
      authNote:
        "대시보드 > API 키 섹션에서 API 키를 발급받으세요. API 키를 안전하게 보관하고 클라이언트 측 코드에 노출하지 마세요.",
      baseUrlTitle: "기본 URL",
      endpointsTitle: "엔드포인트",
      jsonTitle: "JSON 포맷터",
      jsonDesc:
        "들여쓰기를 사용자 정의하여 JSON 데이터를 포맷하거나 최소화합니다.",
      jsonParamJson: "포맷할 JSON 문자열 또는 객체",
      jsonParamIndent: "들여쓰기 크기 (기본값: 2)",
      jsonParamMinify: "출력 최소화 (기본값: false)",
      hashTitle: "해시 생성기",
      hashDesc:
        "다양한 알고리즘을 사용하여 암호화 해시를 생성합니다. MD5, SHA1, SHA256, SHA384, SHA512, SHA3-256, SHA3-512를 지원합니다.",
      hashParamInput: "해시할 텍스트",
      hashParamAlgorithm:
        "해시 알고리즘 (기본값: sha256). 옵션: md5, sha1, sha256, sha384, sha512, sha3-256, sha3-512",
      hashParamEncoding: '출력 인코딩 (기본값: hex). 옵션: "hex", "base64"',
      qrTitle: "QR 코드 생성기",
      qrDesc: "크기, 색상, 형식을 사용자 정의하여 QR 코드를 생성합니다.",
      qrParamData: "QR 코드에 인코딩할 데이터 (최대 4296자)",
      qrParamFormat:
        '출력 형식 (기본값: dataurl). 옵션: "png", "svg", "dataurl"',
      qrParamSize: "QR 코드 크기 (픽셀, 기본값: 256, 범위: 64-1024)",
      qrParamMargin: "여백 크기 (기본값: 4, 범위: 0-10)",
      qrParamEcl: '오류 정정 수준 (기본값: M). 옵션: "L", "M", "Q", "H"',
      qrParamColor: "dark (전경색)와 light (배경색) 16진수 색상이 포함된 객체",
      base64Title: "Base64 변환기",
      base64Desc:
        "Base64 인코딩을 사용하여 텍스트를 인코딩하거나 디코딩합니다. 표준 및 URL-safe Base64를 지원합니다.",
      base64ParamInput: "인코딩할 텍스트 또는 디코딩할 Base64 문자열",
      base64ParamMode: '변환 모드 (기본값: encode). 옵션: "encode", "decode"',
      base64ParamUrlSafe:
        "URL-safe Base64 사용 (기본값: false). +/를 -_로 대체하고 패딩을 제거합니다",
      uuidTitle: "UUID 생성기",
      uuidDesc: "다양한 형식의 UUID (범용 고유 식별자)를 생성합니다.",
      uuidParamVersion:
        'UUID 버전 (기본값: v4). 옵션: "v4" (랜덤), "nil" (모두 0)',
      uuidParamCount: "생성할 UUID 개수 (기본값: 1, 최대: 100)",
      uuidParamFormat:
        '출력 형식 (기본값: standard). 옵션: "standard", "uppercase", "no-dashes", "braces"',
      errorsTitle: "오류 코드",
      errorCode: "코드",
      errorDesc: "설명",
      error401: "유효하지 않거나 누락된 API 키",
      error403: "API 접근은 Pro 구독이 필요합니다",
      error429: "요청 제한 초과",
      error400: "잘못된 요청 매개변수",
      error500: "내부 서버 오류",
      exampleTitle: "사용 예시",
    },
    ja: {
      title: "APIドキュメント",
      description:
        "REST APIを通じてWeb Toolkit機能をプログラムで使用できます。Proサブスクライバー専用です。",
      tryItOut: "試してみる (Swagger UI)",
      downloadSpec: "OpenAPIスペックをダウンロード",
      authMethod: "認証",
      rateLimit: "レート制限",
      access: "アクセス",
      format: "形式",
      authTitle: "認証",
      authDesc:
        "すべてのAPIリクエストにはBearerトークンによる認証が必要です。AuthorizationヘッダーにAPIキーを含めてください。",
      authNote:
        "ダッシュボード > APIキーセクションでAPIキーを取得してください。APIキーを安全に保管し、クライアントサイドコードで公開しないでください。",
      baseUrlTitle: "ベースURL",
      endpointsTitle: "エンドポイント",
      jsonTitle: "JSONフォーマッター",
      jsonDesc:
        "カスタマイズ可能なインデントでJSONデータをフォーマットまたは最小化します。",
      jsonParamJson: "フォーマットするJSON文字列またはオブジェクト",
      jsonParamIndent: "インデントサイズ（デフォルト: 2）",
      jsonParamMinify: "出力を最小化（デフォルト: false）",
      hashTitle: "ハッシュジェネレーター",
      hashDesc:
        "さまざまなアルゴリズムを使用して暗号化ハッシュを生成します。MD5、SHA1、SHA256、SHA384、SHA512、SHA3-256、SHA3-512をサポートしています。",
      hashParamInput: "ハッシュ化するテキスト",
      hashParamAlgorithm:
        "ハッシュアルゴリズム（デフォルト: sha256）。オプション: md5, sha1, sha256, sha384, sha512, sha3-256, sha3-512",
      hashParamEncoding:
        '出力エンコーディング（デフォルト: hex）。オプション: "hex", "base64"',
      qrTitle: "QRコードジェネレーター",
      qrDesc: "サイズ、色、形式をカスタマイズしてQRコードを生成します。",
      qrParamData: "QRコードにエンコードするデータ（最大4296文字）",
      qrParamFormat:
        '出力形式（デフォルト: dataurl）。オプション: "png", "svg", "dataurl"',
      qrParamSize: "QRコードサイズ（ピクセル、デフォルト: 256、範囲: 64-1024）",
      qrParamMargin: "余白サイズ（デフォルト: 4、範囲: 0-10）",
      qrParamEcl:
        'エラー訂正レベル（デフォルト: M）。オプション: "L", "M", "Q", "H"',
      qrParamColor:
        "dark（前景色）とlight（背景色）の16進数カラーを含むオブジェクト",
      base64Title: "Base64コンバーター",
      base64Desc:
        "Base64エンコーディングを使用してテキストをエンコードまたはデコードします。標準およびURLセーフBase64をサポートしています。",
      base64ParamInput: "エンコードするテキストまたはデコードするBase64文字列",
      base64ParamMode:
        '変換モード（デフォルト: encode）。オプション: "encode", "decode"',
      base64ParamUrlSafe:
        "URLセーフBase64を使用（デフォルト: false）。+/を-_に置き換え、パディングを削除します",
      uuidTitle: "UUIDジェネレーター",
      uuidDesc: "さまざまな形式のUUID（汎用一意識別子）を生成します。",
      uuidParamVersion:
        'UUIDバージョン（デフォルト: v4）。オプション: "v4"（ランダム）、"nil"（すべて0）',
      uuidParamCount: "生成するUUIDの数（デフォルト: 1、最大: 100）",
      uuidParamFormat:
        '出力形式（デフォルト: standard）。オプション: "standard", "uppercase", "no-dashes", "braces"',
      errorsTitle: "エラーコード",
      errorCode: "コード",
      errorDesc: "説明",
      error401: "無効または欠落しているAPIキー",
      error403: "APIアクセスにはProサブスクリプションが必要です",
      error429: "レート制限超過",
      error400: "無効なリクエストパラメーター",
      error500: "内部サーバーエラー",
      exampleTitle: "使用例",
    },
  };

  return content[locale] || content.en;
}
