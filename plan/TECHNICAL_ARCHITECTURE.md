# DevToolkit 기술 아키텍처

## 🏗️ 아키텍처 개요

DevToolkit은 **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 하며, 확장 가능하고 유지보수가 용이한 구조를 지향합니다.

### 핵심 설계 원칙
1. **Layer-based Architecture**: 명확한 레이어 분리로 의존성 관리
2. **Domain-Driven Design**: 도구별 독립적인 도메인 모델
3. **Component Composition**: 재사용 가능한 컴포넌트 조합
4. **Performance First**: 번들 최적화 및 지연 로딩

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/            # 홈페이지 그룹
│   ├── tools/             # 도구 라우트
│   │   └── [slug]/        # 동적 도구 페이지
│   ├── api/               # API Routes (필요시)
│   └── layout.tsx         # Root Layout
│
├── entities/              # 비즈니스 엔티티
│   ├── tool/             # 도구 엔티티
│   │   ├── model/        # 타입, 인터페이스
│   │   ├── api/          # API 함수 (미래)
│   │   └── lib/          # 유틸리티
│   └── user/             # 사용자 설정 (미래)
│
├── features/              # 기능 단위 모듈
│   ├── json-formatter/    # JSON 포맷터
│   │   ├── ui/           # UI 컴포넌트
│   │   ├── model/        # 상태 관리
│   │   └── lib/          # 로직
│   ├── jwt-decoder/       # JWT 디코더
│   ├── image-resizer/     # 이미지 리사이저
│   └── ... (각 도구별)
│
├── widgets/               # 페이지 구성 블록
│   ├── tool-layout/      # 도구 공통 레이아웃
│   ├── code-editor/      # 코드 에디터 위젯
│   ├── file-uploader/    # 파일 업로드 위젯
│   └── result-viewer/    # 결과 뷰어 위젯
│
└── shared/                # 공유 리소스
    ├── ui/               # UI 컴포넌트 (shadcn)
    ├── lib/              # 공통 유틸리티
    ├── config/           # 설정
    └── hooks/            # 공통 훅
```

## 🧩 핵심 컴포넌트 설계

### 1. ToolLayout (도구 공통 레이아웃)

```typescript
interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  actions?: React.ReactNode; // 도구별 액션 버튼
}

// 사용 예시
<ToolLayout 
  title="JSON Formatter"
  description="JSON 데이터를 포맷팅하고 검증합니다"
  icon={FileJson}
  actions={<CopyButton />}
>
  <JsonFormatterContent />
</ToolLayout>
```

### 2. CodeEditor (Monaco Editor 래퍼)

```typescript
interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme?: 'light' | 'dark' | 'auto';
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  onValidate?: (markers: monaco.editor.IMarker[]) => void;
}

// 동적 로딩으로 번들 크기 최적화
const CodeEditor = dynamic(() => import('@/widgets/code-editor'), {
  ssr: false,
  loading: () => <EditorSkeleton />
});
```

### 3. FileUploader (드래그앤드롭)

```typescript
interface FileUploaderProps {
  accept?: string | string[];
  multiple?: boolean;
  maxSize?: number; // bytes
  onUpload: (files: File[]) => void;
  onError?: (error: Error) => void;
}

// 기능
- 드래그앤드롭 지원
- 클립보드 붙여넣기
- 파일 타입/크기 검증
- 미리보기 (이미지)
```

### 4. ResultViewer (결과 표시)

```typescript
interface ResultViewerProps {
  result: any;
  format: 'text' | 'code' | 'image' | 'table' | 'custom';
  actions?: ResultAction[]; // Copy, Download, Share
  language?: string; // for code format
}

interface ResultAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}
```

## 🔄 상태 관리 전략

### Zustand Store 구조

```typescript
// 도구별 독립 Store
interface JsonFormatterStore {
  input: string;
  output: string;
  options: JsonFormatterOptions;
  error: Error | null;
  
  setInput: (input: string) => void;
  format: () => void;
  minify: () => void;
  validate: () => void;
}

// 전역 설정 Store
interface AppStore {
  theme: 'light' | 'dark' | 'system';
  recentTools: ToolSlug[];
  preferences: UserPreferences;
  
  setTheme: (theme: Theme) => void;
  addRecentTool: (tool: ToolSlug) => void;
}
```

### Store 파일 구조

```
features/json-formatter/
├── model/
│   ├── store.ts         # Zustand store
│   ├── types.ts         # TypeScript types
│   └── constants.ts     # 기본값, 옵션
```

## ⚡ 성능 최적화 전략

### 1. Route-based Code Splitting

```typescript
// app/tools/[slug]/page.tsx
const toolComponents = {
  'json-formatter': dynamic(() => import('@/features/json-formatter')),
  'jwt-decoder': dynamic(() => import('@/features/jwt-decoder')),
  'image-resizer': dynamic(() => import('@/features/image-resizer')),
  // ... 각 도구별 동적 import
};
```

### 2. Web Workers 활용

```typescript
// 무거운 연산은 Web Worker에서 처리
// features/image-resizer/lib/resize.worker.ts
self.addEventListener('message', async (e) => {
  const { image, width, height, quality } = e.data;
  
  // Canvas API로 이미지 처리
  const result = await resizeImage(image, { width, height, quality });
  
  self.postMessage({ result });
});

// 사용
const worker = new Worker('/workers/resize.worker.js');
worker.postMessage({ image, width: 800, height: 600 });
```

### 3. 번들 최적화

```typescript
// next.config.ts
export default {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'lodash-es'
    ]
  },
  
  webpack: (config) => {
    // Monaco Editor 최적화
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['json', 'javascript', 'typescript', 'css', 'html'],
        features: ['format', 'validate']
      })
    );
    
    return config;
  }
};
```

### 4. 이미지 최적화

```typescript
// 이미지 처리 최적화
const optimizeImage = async (file: File): Promise<Blob> => {
  // 브라우저 네이티브 API 활용
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // WebP 지원 확인
  const supportsWebP = await checkWebPSupport();
  const format = supportsWebP ? 'image/webp' : 'image/jpeg';
  
  return canvas.toBlob(blob => blob, format, 0.9);
};
```

## 🔌 외부 라이브러리 통합

### 1. Monaco Editor 설정

```typescript
// shared/config/monaco.ts
export const monacoConfig = {
  theme: {
    light: 'vs',
    dark: 'vs-dark'
  },
  
  options: {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    automaticLayout: true
  },
  
  // 언어별 설정
  languages: {
    json: {
      validate: true,
      schemas: [] // JSON Schema 지원
    }
  }
};
```

### 2. 라이브러리 Lazy Loading

```typescript
// 필요할 때만 라이브러리 로드
const loadPrettier = async () => {
  const [prettier, parserBabel] = await Promise.all([
    import('prettier/standalone'),
    import('prettier/parser-babel')
  ]);
  
  return { prettier, plugins: [parserBabel] };
};
```

## 🎨 UI/UX 컴포넌트 시스템

### 1. 디자인 토큰

```css
/* shared/styles/tokens.css */
:root {
  /* Colors */
  --color-primary: hsl(222.2 47.4% 11.2%);
  --color-secondary: hsl(210 40% 96.1%);
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

### 2. 컴포넌트 변형 시스템

```typescript
// Variant 시스템 (CVA 활용)
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
        ghost: "hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
```

## 🔒 보안 고려사항

### 1. 입력 검증

```typescript
// 모든 사용자 입력 검증
const validateInput = (input: string, type: InputType) => {
  // XSS 방지
  const sanitized = DOMPurify.sanitize(input);
  
  // 크기 제한
  if (sanitized.length > MAX_INPUT_SIZE) {
    throw new Error('Input too large');
  }
  
  // 타입별 검증
  switch (type) {
    case 'json':
      JSON.parse(sanitized); // 유효한 JSON인지 확인
      break;
    case 'url':
      new URL(sanitized); // 유효한 URL인지 확인
      break;
  }
  
  return sanitized;
};
```

### 2. CSP (Content Security Policy)

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob:;
      font-src 'self';
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

## 🚀 배포 아키텍처

### 1. Vercel 최적화

```json
// vercel.json
{
  "functions": {
    "app/api/*": {
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/tools/:tool",
      "destination": "/tools/[slug]"
    }
  ]
}
```

### 2. Edge Functions 활용

```typescript
// OG Image 생성 등 서버 사이드 필요 기능
export const runtime = 'edge';

export async function GET(request: Request) {
  // Edge에서 실행되는 가벼운 함수
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get('tool');
  
  // OG 이미지 생성 로직
}
```

## 📊 모니터링 및 분석

### 1. 성능 모니터링

```typescript
// Web Vitals 측정
import { getCLS, getFID, getLCP } from 'web-vitals';

export function reportWebVitals() {
  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);
}
```

### 2. 에러 트래킹

```typescript
// Sentry 통합
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 0.1,
});
```

## 🔄 향후 확장 계획

### 1. PWA (Progressive Web App)

```typescript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  // 기존 설정
});
```

### 2. API 서비스

```typescript
// 향후 API 제공을 위한 구조
interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST';
  rateLimit: number; // requests per minute
  requiresAuth: boolean;
}

const endpoints: Record<ToolSlug, ApiEndpoint> = {
  'json-formatter': {
    path: '/api/tools/json-formatter',
    method: 'POST',
    rateLimit: 60,
    requiresAuth: false
  }
};
```

### 3. 플러그인 시스템

```typescript
// 써드파티 도구 통합을 위한 플러그인 시스템
interface ToolPlugin {
  id: string;
  name: string;
  version: string;
  component: React.ComponentType;
  config: ToolConfig;
}

const loadPlugin = async (pluginId: string): Promise<ToolPlugin> => {
  // 동적 플러그인 로딩
};
```