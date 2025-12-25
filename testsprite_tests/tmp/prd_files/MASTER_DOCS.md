# Web Toolkit - Master Documentation

> **Version:** 0.4.0
> **Domain:** https://web-toolkit.app
> **Last Updated:** 2025-12-15

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Features (Tools)](#3-features-tools)
4. [Widgets](#4-widgets)
5. [Entities](#5-entities)
6. [Shared Components](#6-shared-components)
7. [Hooks & Utilities](#7-hooks--utilities)
8. [Routing Structure](#8-routing-structure)
9. [Internationalization (i18n)](#9-internationalization-i18n)
10. [UI/UX Guidelines](#10-uiux-guidelines)
11. [Adding New Tools](#11-adding-new-tools)
12. [Configuration](#12-configuration)
13. [Testing](#13-testing)
14. [Deployment](#14-deployment)

---

## 1. Project Overview

### 1.1 Description

Web Toolkit은 개발자를 위한 올인원 웹 기반 도구 모음입니다. 모든 처리는 클라이언트 사이드에서 수행되어 데이터 프라이버시를 보장합니다.

### 1.2 Tech Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| **Framework**  | Next.js 16.0.10 (App Router, Turbopack) |
| **Language**   | TypeScript 5.x (Strict Mode)            |
| **UI Library** | React 19.2.0                            |
| **Styling**    | Tailwind CSS 4                          |
| **Components** | Radix UI (Accessible primitives)        |
| **Animation**  | Framer Motion                           |
| **State**      | Zustand 5.0.9, Dexie.js (IndexedDB)     |
| **i18n**       | next-intl                               |
| **PWA**        | next-pwa                                |
| **Testing**    | Vitest, Playwright                      |

### 1.3 Project Stats

| Metric       | Value                 |
| ------------ | --------------------- |
| Tools        | 37                    |
| Converters   | 22 (Programmatic SEO) |
| Cheatsheets  | 14                    |
| Guides       | 31                    |
| Languages    | 3 (en, ko, ja)        |
| Static Pages | 319+                  |

---

## 2. Architecture

### 2.1 FSD (Feature-Sliced Design)

프로젝트는 FSD 아키텍처를 따릅니다. 의존성 방향: `app → widgets → features → entities → shared`

```
src/
├── app/                    # Next.js App Router (라우팅, 페이지)
├── widgets/                # 조합된 UI 블록 (7개)
├── features/               # 비즈니스 기능 (37개 도구 + 22개 변환기)
├── entities/               # 도메인 모델 (4개: tool, cheatsheet, guide, converter)
├── shared/                 # 공용 코드
│   ├── ui/                 # UI 컴포넌트
│   ├── lib/                # Hooks, Utils
│   └── config/             # 설정
├── i18n/                   # 국제화 설정
└── types/                  # 전역 타입
```

### 2.2 Feature Structure Pattern

모든 feature는 동일한 구조를 따릅니다:

```
features/[tool-slug]/
├── index.ts                # Public API (exports)
├── ui/
│   └── [tool-name].tsx    # UI 컴포넌트 ("use client")
├── model/
│   └── use-[tool-name].ts # 비즈니스 로직 (Custom Hook)
└── lib/                    # (선택) 순수 함수
    ├── [logic].ts
    └── [logic].test.ts
```

### 2.3 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│  User Input                                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  UI Component (features/*/ui/*.tsx)                         │
│  - 사용자 인터랙션 처리                                       │
│  - 렌더링 최적화                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Custom Hook (features/*/model/use-*.ts)                    │
│  - 상태 관리 (useState, useUrlState)                         │
│  - 히스토리 관리 (useToolHistory)                            │
│  - 부수 효과 (useEffect)                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Pure Functions (features/*/lib/*.ts)                       │
│  - 비즈니스 로직 (포매팅, 변환, 검증)                         │
│  - 테스트 가능한 순수 함수                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Output / Side Effects                                       │
│  - localStorage (History)                                    │
│  - URL State (공유 가능)                                     │
│  - Clipboard                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Features (Tools)

### 3.1 Tool Categories

| Category           | ID           | Description           |
| ------------------ | ------------ | --------------------- |
| **Text & Code**    | `text`       | 텍스트/코드 처리 도구 |
| **Media & Design** | `media`      | 이미지/미디어 처리    |
| **Converters**     | `converters` | 인코딩/디코딩/변환    |
| **Security**       | `security`   | 보안/암호화 도구      |

### 3.2 Complete Tool List

#### Text & Code (text)

| Slug                  | Name                | Description             |
| --------------------- | ------------------- | ----------------------- |
| `json-formatter`      | JSON Formatter      | JSON 포매팅, 압축, 검증 |
| `sql-formatter`       | SQL Formatter       | SQL 쿼리 포매팅         |
| `markdown-preview`    | Markdown Preview    | 마크다운 미리보기       |
| `diff-checker`        | Diff Checker        | 텍스트 비교 도구        |
| `lorem-generator`     | Lorem Generator     | Lorem Ipsum 생성        |
| `regex-tester`        | Regex Tester        | 정규표현식 테스터       |
| `cron-parser`         | Cron Parser         | Cron 표현식 파서        |
| `prettier-playground` | Prettier Playground | Prettier 코드 포매팅    |
| `text-case-converter` | Text Case Converter | 텍스트 케이스 변환      |
| `curl-builder`        | cURL Builder        | cURL 명령어 빌더        |
| `meta-generator`      | Meta Generator      | HTML Meta 태그 생성     |

#### Media & Design (media)

| Slug                 | Name               | Description             |
| -------------------- | ------------------ | ----------------------- |
| `image-resizer`      | Image Resizer      | 이미지 리사이징         |
| `app-icon-generator` | App Icon Generator | 앱 아이콘 생성          |
| `qr-generator`       | QR Generator       | QR 코드 생성            |
| `svg-optimizer`      | SVG Optimizer      | SVG 최적화              |
| `color-picker`       | Color Picker       | 컬러 픽커 (HEX/RGB/HSL) |
| `gradient-generator` | Gradient Generator | CSS 그라디언트 생성     |
| `box-shadow`         | Box Shadow         | CSS Box Shadow 생성     |

#### Converters (converters)

| Slug                 | Name               | Description           |
| -------------------- | ------------------ | --------------------- |
| `base64-converter`   | Base64 Converter   | Base64 인코딩/디코딩  |
| `url-encoder`        | URL Encoder        | URL 인코딩/디코딩     |
| `html-entity`        | HTML Entity        | HTML 엔티티 변환      |
| `base-converter`     | Base Converter     | 진법 변환 (2/8/10/16) |
| `unix-timestamp`     | Unix Timestamp     | 타임스탬프 변환       |
| `json-to-typescript` | JSON to TypeScript | JSON → TS 타입 변환   |
| `css-to-tailwind`    | CSS to Tailwind    | CSS → Tailwind 변환   |
| `css-minifier`       | CSS Minifier       | CSS 압축              |

#### Security (security)

| Slug             | Name              | Description         |
| ---------------- | ----------------- | ------------------- |
| `jwt-decoder`    | JWT Decoder       | JWT 토큰 디코딩     |
| `hash-generator` | Hash Generator    | 해시 생성 (MD5/SHA) |
| `uuid-generator` | UUID Generator    | UUID 생성           |
| `ua-parser`      | User Agent Parser | UA 문자열 파싱      |

#### System Features

| Slug                      | Name          | Description         |
| ------------------------- | ------------- | ------------------- |
| `ai-explain`              | AI Explain    | AI 기반 입력값 분석 |
| `tool-pipeline`           | Tool Pipeline | 도구 간 데이터 전송 |
| `workspace`               | Workspace     | 작업 저장/관리      |
| `share`                   | Share         | 공유 링크 생성      |
| `smart-paste`             | Smart Paste   | 지능형 붙여넣기     |
| `natural-language-search` | NL Search     | 자연어 검색         |
| `theme-toggle`            | Theme Toggle  | 다크/라이트 모드    |

### 3.3 Tool Implementation Example

```typescript
// features/json-formatter/index.ts
export { JsonFormatter } from "./ui/json-formatter";
export { useJsonFormatter } from "./model/use-json-formatter";
export * from "./lib/formatter";

// features/json-formatter/model/use-json-formatter.ts
"use client";
import { useState, useCallback } from "react";
import { useUrlState } from "@/shared/lib/hooks/use-url-state";
import { useToolHistory } from "@/shared/lib/hooks/use-tool-history";
import { formatJson, minifyJson, validateJson } from "../lib/formatter";

interface JsonFormatterState {
  input: string;
  indent: number;
}

export function useJsonFormatter() {
  // URL 기반 상태 (공유 가능)
  const { state, setState, getShareUrl, hasUrlState } = useUrlState<JsonFormatterState>({
    key: "json",
    defaultValue: { input: "", indent: 2 },
  });

  // 로컬 히스토리
  const { history, addToHistory, clearHistory, hasHistory, loadFromHistory } =
    useToolHistory("json-formatter");

  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = useCallback((mode: "beautify" | "minify") => {
    try {
      const result = mode === "beautify"
        ? formatJson(state.input, state.indent)
        : minifyJson(state.input);
      setOutput(result);
      setError(null);
      addToHistory(state.input, result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [state.input, state.indent, addToHistory]);

  return {
    input: state.input,
    output,
    error,
    indent: state.indent,
    setInput: (v: string) => setState({ ...state, input: v }),
    setIndent: (v: number) => setState({ ...state, indent: v }),
    handleFormat,
    handleClear: () => { setState({ input: "", indent: 2 }); setOutput(""); },
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
    getShareUrl,
    hasUrlState,
  };
}

// features/json-formatter/ui/json-formatter.tsx
"use client";
import { Button, EmptyState } from "@/shared/ui";
import { ToolActionsBar } from "@/widgets/tool-actions-bar";
import { useJsonFormatter } from "../model/use-json-formatter";
import { FileJson } from "lucide-react";

export function JsonFormatter() {
  const {
    input, output, error, indent,
    setInput, setIndent, handleFormat, handleClear,
    getShareUrl,
  } = useJsonFormatter();

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-2">
        <Button onClick={() => handleFormat("beautify")}>Beautify</Button>
        <Button onClick={() => handleFormat("minify")}>Minify</Button>
        <Button variant="outline" onClick={handleClear}>Clear</Button>
      </div>

      {/* AI/Pipeline Actions */}
      <ToolActionsBar
        toolSlug="json-formatter"
        input={input}
        output={output}
      />

      {/* Empty State */}
      {!input && !output && (
        <EmptyState
          icon={<FileJson className="h-12 w-12" />}
          title="Start formatting JSON"
          description="Paste your JSON to get started."
        />
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here..."
          className="min-h-[300px] font-mono text-sm"
        />
        <textarea
          value={output}
          readOnly
          placeholder="Formatted output..."
          className="min-h-[300px] font-mono text-sm"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}
    </div>
  );
}
```

---

## 4. Widgets

### 4.1 Widget List

| Widget             | Path                       | Description                            |
| ------------------ | -------------------------- | -------------------------------------- |
| `header`           | `widgets/header`           | 상단 헤더 (검색, 테마 토글, 언어 전환) |
| `sidebar`          | `widgets/sidebar`          | 좌측 네비게이션 (카테고리별 도구 목록) |
| `footer`           | `widgets/footer`           | 하단 푸터 (저작권, 링크)               |
| `command-menu`     | `widgets/command-menu`     | Cmd+K 검색 팔레트                      |
| `tools-list`       | `widgets/tools-list`       | 도구 그리드 목록 (Bento 스타일)        |
| `tool-actions-bar` | `widgets/tool-actions-bar` | AI/Pipeline/Share 액션 바              |
| `file-uploader`    | `widgets/file-uploader`    | 드래그앤드롭 파일 업로드               |

### 4.2 Widget Structure

```
widgets/[widget-name]/
├── index.ts                # Public API
└── ui/
    └── [widget-name].tsx   # 컴포넌트
```

### 4.3 Key Widgets Detail

#### Header

```typescript
// widgets/header/ui/header.tsx
- Logo + 홈 링크
- CommandMenu (Cmd+K 검색)
- LanguageSwitcher (en/ko/ja)
- ModeToggle (다크/라이트)
- MobileSidebar (모바일 메뉴)
```

#### Sidebar

```typescript
// widgets/sidebar/ui/sidebar.tsx
- 카테고리별 도구 그룹화
- 즐겨찾기 섹션
- 최근 사용 도구
- i18n 지원 라벨
```

#### ToolActionsBar

```typescript
// widgets/tool-actions-bar/ui/tool-actions-bar.tsx
- AIExplainButton: AI 분석
- PipelineButton: 다른 도구로 전송
- SaveToWorkspace: 워크스페이스 저장
- ShareButton: 공유 링크 생성
- Desktop: 가로 버튼 바
- Mobile: FAB 스타일 메뉴
```

---

## 5. Entities

### 5.1 Tool Entity

도구의 메타데이터와 SEO 콘텐츠를 관리합니다.

```
entities/tool/
├── index.ts
├── model/
│   ├── types.ts           # ToolSlug, Tool, ToolCategory
│   ├── registry.ts        # tools 객체 정의
│   ├── tools-config.ts    # 카테고리 설정
│   ├── seo-content.ts     # SEO 콘텐츠
│   └── index.ts
└── ui/
    ├── tool-seo-section.tsx
    └── index.ts
```

**Types:**

```typescript
export type ToolCategory = "text" | "media" | "converters" | "security";

export interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
}

export type ToolSlug =
  | "json-formatter"
  | "jwt-decoder"
  | ... // 37개
```

**Exports:**

```typescript
export { tools, getToolSlugs, toolSeoContent } from "./model";
export {
  categoryConfig,
  getToolsByCategory,
  getSortedCategories,
} from "./model";
export type { Tool, ToolSlug, ToolCategory } from "./model";
export { ToolSeoSection } from "./ui";
```

### 5.2 Cheatsheet Entity

프로그래밍 치트시트 데이터를 관리합니다.

```
entities/cheatsheet/
├── index.ts
├── data/
│   ├── git-commands.ts
│   ├── http-status.ts
│   ├── regex-syntax.ts
│   ├── mime-types.ts
│   ├── javascript-syntax.ts
│   ├── css-syntax.ts
│   ├── typescript-syntax.ts
│   ├── react-syntax.ts
│   ├── vue-syntax.ts
│   ├── nextjs-syntax.ts
│   ├── tailwind-syntax.ts
│   ├── nodejs-syntax.ts
│   ├── docker-syntax.ts
│   ├── bash-syntax.ts
│   └── index.ts
└── ui/
    └── cheatsheet-table.tsx
```

**Available Cheatsheets (14):**

- Git, HTTP Status, Regex, MIME Types
- JavaScript, CSS, TypeScript
- React, Vue, Next.js, Tailwind
- Node.js, Docker, Bash

### 5.3 Guide Entity

도구 사용 가이드를 관리합니다.

```
entities/guide/
├── index.ts
├── model/
│   └── types.ts
├── data/
│   ├── json-formatter.ts
│   ├── jwt-decoder.ts
│   └── ... (31개)
└── ui/
    ├── guide-content.tsx
    └── table-of-contents.tsx
```

### 5.4 Converter Entity (Programmatic SEO)

데이터 포맷 변환 도구를 관리합니다. 롱테일 SEO 키워드 타겟팅용.

```
entities/converter/
├── index.ts
├── model/
│   ├── types.ts           # DataFormat, Conversion, ConversionResult
│   ├── registry.ts        # 22개 변환 정의
│   ├── examples.ts        # 예시 데이터
│   └── index.ts
└── lib/
    └── converters.ts      # 변환 함수들
```

**Types:**

```typescript
export type DataFormat =
  | "json"
  | "yaml"
  | "csv"
  | "xml" // Data formats
  | "base64"
  | "text"
  | "url" // Encoding
  | "hex-color"
  | "rgb"
  | "hsl" // Colors
  | "decimal"
  | "binary-num"
  | "hexadecimal" // Numbers
  | "md5"
  | "sha256" // Hashes
  | "unix"
  | "datetime"; // Time

export interface Conversion {
  from: DataFormat;
  to: DataFormat;
  category: "data" | "encoding" | "color" | "number" | "hash" | "time" | "code";
  direction: "unidirectional" | "bidirectional";
  slug: string;
  title: Record<string, string>; // Multi-language
  description: Record<string, string>;
  keywords: Record<string, string[]>;
  relatedTool?: string;
}
```

**Available Conversions (22):**

| Category     | Conversions                             |
| ------------ | --------------------------------------- |
| **Data**     | JSON↔YAML, JSON↔CSV, CSV↔JSON           |
| **Encoding** | Text↔Base64, URL Encode/Decode          |
| **Color**    | HEX↔RGB, RGB↔HSL, HEX↔HSL               |
| **Number**   | Decimal↔Binary, Decimal↔Hex, Binary↔Hex |
| **Hash**     | Text→MD5, Text→SHA256                   |
| **Time**     | Unix↔DateTime                           |

**Exports:**

```typescript
export {
  CONVERSIONS,
  getConversion,
  getAllConversions,
  getAllConversionSlugs,
} from "./model";
export { converterMap, getConverter } from "./lib/converters";
export type {
  DataFormat,
  Conversion,
  ConversionResult,
  Converter,
} from "./model";
```

---

## 6. Shared Components

### 6.1 UI Components

| Component      | Path                          | Description                                           |
| -------------- | ----------------------------- | ----------------------------------------------------- |
| `Button`       | `shared/ui/button.tsx`        | 버튼 (variants: default, outline, ghost, destructive) |
| `Input`        | `shared/ui/input.tsx`         | 입력 필드                                             |
| `Label`        | `shared/ui/label.tsx`         | 라벨                                                  |
| `Select`       | `shared/ui/select.tsx`        | 드롭다운 선택                                         |
| `Slider`       | `shared/ui/slider.tsx`        | 슬라이더                                              |
| `Switch`       | `shared/ui/switch.tsx`        | 토글 스위치                                           |
| `Tabs`         | `shared/ui/tabs.tsx`          | 탭 네비게이션                                         |
| `Textarea`     | `shared/ui/textarea.tsx`      | 멀티라인 입력                                         |
| `Sheet`        | `shared/ui/sheet.tsx`         | 사이드 패널                                           |
| `Dialog`       | `shared/ui/dialog.tsx`        | 모달 다이얼로그                                       |
| `Command`      | `shared/ui/command.tsx`       | 커맨드 팔레트 (cmdk)                                  |
| `DropdownMenu` | `shared/ui/dropdown-menu.tsx` | 드롭다운 메뉴                                         |

### 6.2 Feedback Components

| Component       | Path                           | Description                        |
| --------------- | ------------------------------ | ---------------------------------- |
| `Toast`         | `shared/ui/toast.tsx`          | 토스트 알림 (success, error, info) |
| `Spinner`       | `shared/ui/spinner.tsx`        | 로딩 스피너                        |
| `Skeleton`      | `shared/ui/skeleton.tsx`       | 스켈레톤 로딩                      |
| `ErrorMessage`  | `shared/ui/error-message.tsx`  | 에러 메시지                        |
| `EmptyState`    | `shared/ui/error-message.tsx`  | 빈 상태 안내                       |
| `ErrorBoundary` | `shared/ui/error-boundary.tsx` | 에러 바운더리                      |

### 6.3 Special Components

| Component       | Path                           | Description         |
| --------------- | ------------------------------ | ------------------- |
| `ThemeProvider` | `shared/ui/theme-provider.tsx` | 다크/라이트 테마    |
| `ToastProvider` | `shared/ui/toast.tsx`          | 토스트 컨텍스트     |
| `ShareButton`   | `shared/ui/share-button.tsx`   | 공유 버튼           |
| `JsonLd`        | `shared/ui/json-ld.tsx`        | SEO 구조화 데이터   |
| `AdUnit`        | `shared/ui/ad-unit/`           | Google AdSense 광고 |
| `ClarityScript` | `shared/ui/clarity.tsx`        | MS Clarity 분석     |

### 6.4 Component Usage

```typescript
// 기본 import
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  EmptyState,
  ToastProvider,
  useToast,
} from "@/shared/ui";

// 버튼 variants
<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button size="icon">Icon Only</Button>

// 토스트 사용
const { showToast } = useToast();
showToast("Copied!", "success");
showToast("Error occurred", "error");
showToast("Information", "info");

// Empty State
<EmptyState
  icon={<FileJson className="h-12 w-12" />}
  title="No data"
  description="Enter some data to get started."
/>
```

---

## 7. Hooks & Utilities

### 7.1 Custom Hooks

#### useToolHistory

도구별 사용 히스토리 관리 (localStorage, 최대 20개)

```typescript
import { useToolHistory } from "@/shared/lib/hooks/use-tool-history";

const {
  history, // HistoryItem[]
  addToHistory, // (input: string, output: string) => void
  clearHistory, // () => void
  loadFromHistory, // (input: string, output: string) => void
  hasHistory, // boolean
} = useToolHistory("json-formatter");
```

#### useUrlState

URL 파라미터 기반 상태 관리 (LZ-String 압축)

```typescript
import { useUrlState } from "@/shared/lib/hooks/use-url-state";

const {
  state, // T
  setState, // (value: T) => void
  getShareUrl, // () => string
  hasUrlState, // boolean
  clearUrl, // () => void
} = useUrlState<{ input: string }>({
  key: "data",
  defaultValue: { input: "" },
});
```

#### useCopyToClipboard

클립보드 복사 (피드백 포함)

```typescript
import { useCopyToClipboard } from "@/shared/lib";

const { copied, copy } = useCopyToClipboard();

<Button onClick={() => copy(text)}>
  {copied ? "Copied!" : "Copy"}
</Button>
```

#### useDebounce

디바운싱 훅

```typescript
import {
  useDebounce,
  useDebouncedCallback,
  useDebouncedState,
} from "@/shared/lib";

// 값 디바운싱
const debouncedValue = useDebounce(value, 300);

// 콜백 디바운싱
const debouncedSave = useDebouncedCallback((text: string) => {
  saveToServer(text);
}, 500);

// 상태 디바운싱
const [input, debouncedInput, setInput] = useDebouncedState("", 300);
```

#### useFavorites

즐겨찾기 관리 (localStorage, 최대 10개)

```typescript
import { useFavorites } from "@/shared/lib";

const {
  favorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  isFavorite,
  hasFavorites,
} = useFavorites();
```

#### useRecentTools

최근 사용 도구 추적

```typescript
import { useRecentTools } from "@/shared/lib";

const { recentTools, addRecentTool, clearRecentTools } = useRecentTools();
```

### 7.2 Storage Utilities

```typescript
import {
  getByteSize,
  formatBytes,
  getSessionStorageUsage,
  getSessionStorageRemaining,
  isPipelineDataTooLarge,
  canStorePipelineData,
  safeSessionStorageSet,
  PIPELINE_DATA_LIMIT,
} from "@/shared/lib";
```

### 7.3 Database (Dexie.js)

```typescript
import { db } from "@/shared/lib";
import type { Workspace, WorkspaceItem, AIConfig } from "@/shared/lib";

// Workspace 저장
await db.workspaces.add({
  name: "My Workspace",
  items: [...],
  createdAt: new Date(),
});

// AI Config
await db.aiConfig.put({
  id: "default",
  apiKey: "...",
  model: "gpt-4",
});
```

---

## 8. Routing Structure

### 8.1 App Router Structure

```
src/app/
├── layout.tsx                    # Root Layout
├── page.tsx                      # / → /{locale} 리다이렉트
├── globals.css                   # 전역 스타일
├── robots.txt/route.ts           # SEO robots
├── sitemap.ts                    # SEO sitemap
│
├── [locale]/                     # 다국어 라우트
│   ├── layout.tsx               # Locale Layout (Providers)
│   ├── page.tsx                 # 홈페이지
│   │
│   ├── tools/
│   │   ├── page.tsx             # 도구 목록
│   │   └── [slug]/
│   │       ├── page.tsx         # 도구 상세
│   │       ├── tool-renderer.tsx
│   │       └── tool-seo-section.tsx
│   │
│   ├── cheatsheets/
│   │   ├── page.tsx             # 치트시트 목록
│   │   └── [type]/page.tsx      # 치트시트 상세
│   │
│   ├── guides/
│   │   ├── page.tsx             # 가이드 목록
│   │   └── [slug]/page.tsx      # 가이드 상세
│   │
│   ├── convert/                  # Programmatic SEO 변환기
│   │   ├── page.tsx             # 변환기 목록
│   │   └── [slug]/page.tsx      # 변환기 상세 (22개)
│   │
│   └── privacy/page.tsx          # 개인정보처리방침
│
├── offline/page.tsx              # PWA 오프라인 폴백
│
├── s/[id]/page.tsx               # 공유 링크 리다이렉트
│
└── api/
    ├── og/route.tsx              # OG 이미지 생성
    └── share/
        ├── route.ts              # POST: 공유 생성
        └── [id]/route.ts         # GET: 공유 조회
```

### 8.2 Dynamic Routes

| Route                          | Description                          |
| ------------------------------ | ------------------------------------ |
| `/[locale]`                    | 언어별 홈 (en, ko, ja)               |
| `/[locale]/tools/[slug]`       | 도구 상세 (37개)                     |
| `/[locale]/cheatsheets/[type]` | 치트시트 상세 (14개)                 |
| `/[locale]/guides/[slug]`      | 가이드 상세 (31개)                   |
| `/[locale]/convert/[slug]`     | 변환기 상세 (22개 × 3개 언어 = 66개) |
| `/s/[id]`                      | 공유 링크                            |
| `/offline`                     | PWA 오프라인 폴백                    |

### 8.3 Static Generation

```typescript
// generateStaticParams 예시
export function generateStaticParams() {
  const toolSlugs = Object.keys(tools);
  return toolSlugs.map((slug) => ({ slug }));
}
```

---

## 9. Internationalization (i18n)

### 9.1 Supported Languages

| Code | Language | Status   |
| ---- | -------- | -------- |
| `en` | English  | Default  |
| `ko` | 한국어   | Complete |
| `ja` | 日本語   | Complete |

### 9.2 Message Files Structure

```
messages/
├── en.json
├── ko.json
└── ja.json
```

### 9.3 Message Structure

```json
{
  "common": {
    "copy": "Copy",
    "copied": "Copied!",
    "clear": "Clear",
    "download": "Download",
    "noResults": "No results found",
    "searchTools": "Search tools..."
  },
  "tools": {
    "json-formatter": {
      "title": "JSON Formatter",
      "description": "Format, minify, and validate JSON data."
    }
  },
  "seo": {
    "json-formatter": {
      "whatIs": "JSON Formatter is an online tool...",
      "howToUse": "Paste your JSON data...",
      "features": ["Feature 1", "Feature 2"],
      "faq": [{ "q": "Question?", "a": "Answer." }]
    }
  },
  "categories": {
    "text": "Text & Code",
    "media": "Media & Design",
    "converters": "Converters",
    "security": "Security"
  },
  "footer": {
    "privacy": "Privacy Policy",
    "github": "GitHub",
    "rights": "All rights reserved."
  }
}
```

### 9.4 Usage

```typescript
// Server Component
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("tools");
  return <h1>{t("json-formatter.title")}</h1>;
}

// Client Component
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("common");
  return <button>{t("copy")}</button>;
}
```

---

## 10. UI/UX Guidelines

### 10.1 Accessibility (a11y)

| Feature             | Implementation                |
| ------------------- | ----------------------------- |
| ARIA Labels         | 모든 인터랙티브 요소에 적용   |
| Focus Management    | `focus-visible:ring-2` 스타일 |
| Skip Link           | 본문 바로가기 링크            |
| Screen Reader       | `aria-live`, `role="alert"`   |
| Keyboard Navigation | Tab, Enter, Escape 지원       |

```tsx
// 예시
<Button aria-label="Copy to clipboard">
  <Copy className="h-4 w-4" aria-hidden="true" />
</Button>

<nav aria-label="Main navigation">
  ...
</nav>

<div role="alert" aria-live="polite">
  {error}
</div>
```

### 10.2 Responsive Design

| Breakpoint | Width  | Usage     |
| ---------- | ------ | --------- |
| `sm`       | 640px  | 모바일    |
| `md`       | 768px  | 태블릿    |
| `lg`       | 1024px | 데스크탑  |
| `xl`       | 1280px | 대형 화면 |

```tsx
// Grid 반응형
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// 숨기기/보이기
<div className="hidden md:flex">  // 태블릿 이상에서 표시
<div className="md:hidden">       // 태블릿 이상에서 숨김

// 패딩/마진
<div className="p-4 sm:p-6">
```

### 10.3 Color System

```css
/* Semantic Colors (globals.css) */
:root {
  --success: 142 76% 36%;
  --success-foreground: 0 0% 100%;
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 0%;
  --info: 199 89% 48%;
  --info-foreground: 0 0% 100%;
}

.dark {
  --success: 142 69% 58%;
  --warning: 48 96% 53%;
  --info: 199 89% 70%;
}
```

### 10.4 Empty States

```tsx
<EmptyState
  icon={<IconComponent className="h-12 w-12" />}
  title="Title text"
  description="Description explaining what user can do."
  className="min-h-[200px]"
/>
```

### 10.5 Loading States

```tsx
// 버튼 로딩
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
  Submit
</Button>

// 스켈레톤
<Skeleton className="h-8 w-full" />
<SkeletonText lines={3} />
<SkeletonCard />

// 스피너
<Spinner size="sm" />
<LoadingOverlay />
```

### 10.6 Toast Notifications

```tsx
const { showToast } = useToast();

// Success (초록)
showToast("Copied to clipboard!", "success");

// Error (빨강)
showToast("Something went wrong", "error");

// Info (파랑)
showToast("Processing...", "info");
```

---

## 11. Adding New Tools

### 11.1 Checklist

- [ ] **Step 1:** `types.ts`에 ToolSlug 추가
- [ ] **Step 2:** `registry.ts`에 도구 메타데이터 추가
- [ ] **Step 3:** `features/[slug]/` 디렉토리 생성
- [ ] **Step 4:** `tool-renderer.tsx`에 dynamic import 추가
- [ ] **Step 5:** `messages/*.json`에 번역 추가 (3개 언어)
- [ ] **Step 6:** (선택) `seo-content.ts` 또는 `messages/*/seo` 추가
- [ ] **Step 7:** 빌드 검증

### 11.2 Step-by-Step Guide

#### Step 1: Add ToolSlug

```typescript
// src/entities/tool/model/types.ts
export type ToolSlug =
  | "json-formatter"
  | ...
  | "your-new-tool"  // 추가
```

#### Step 2: Register Tool

```typescript
// src/entities/tool/model/registry.ts
import { YourIcon } from "lucide-react";

export const tools: Record<ToolSlug, Tool> = {
  ...
  "your-new-tool": {
    title: "Your New Tool",
    description: "Tool description",
    icon: YourIcon,
    category: "text" | "media" | "converters" | "security",
  },
};
```

#### Step 3: Create Feature

```
src/features/your-new-tool/
├── index.ts
├── ui/
│   └── your-new-tool.tsx
└── model/
    └── use-your-new-tool.ts
```

```typescript
// index.ts
export { YourNewTool } from "./ui/your-new-tool";
export { useYourNewTool } from "./model/use-your-new-tool";

// model/use-your-new-tool.ts
"use client";
import { useUrlState } from "@/shared/lib/hooks/use-url-state";
import { useToolHistory } from "@/shared/lib/hooks/use-tool-history";

export function useYourNewTool() {
  const { state, setState, getShareUrl } = useUrlState({
    key: "your-tool",
    defaultValue: { input: "" },
  });

  const { history, addToHistory, clearHistory, hasHistory } =
    useToolHistory("your-new-tool");

  // 비즈니스 로직...

  return { /* state and actions */ };
}

// ui/your-new-tool.tsx
"use client";
import { Button, EmptyState } from "@/shared/ui";
import { ToolActionsBar } from "@/widgets/tool-actions-bar";
import { useYourNewTool } from "../model/use-your-new-tool";

export function YourNewTool() {
  const { input, output, setInput } = useYourNewTool();

  return (
    <div className="space-y-4">
      <ToolActionsBar
        toolSlug="your-new-tool"
        input={input}
        output={output}
      />
      {/* UI */}
    </div>
  );
}
```

#### Step 4: Add Dynamic Import

```typescript
// src/app/[locale]/tools/[slug]/tool-renderer.tsx
const toolComponents: Record<ToolSlug, React.ComponentType> = {
  ...
  "your-new-tool": dynamic(
    () => import("@/features/your-new-tool").then((mod) => mod.YourNewTool),
    { ssr: false }
  ),
};
```

#### Step 5: Add Translations

```json
// messages/en.json
{
  "tools": {
    "your-new-tool": {
      "title": "Your New Tool",
      "description": "Tool description in English"
    }
  },
  "seo": {
    "your-new-tool": {
      "whatIs": "...",
      "howToUse": "...",
      "features": ["..."],
      "faq": [{ "q": "?", "a": "." }]
    }
  }
}

// messages/ko.json, messages/ja.json 도 동일하게
```

---

## 12. Configuration

### 12.1 Environment Variables

```env
# .env.local

# Site
NEXT_PUBLIC_SITE_URL=https://web-toolkit.app

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx

# Ads
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX

# KV Storage (Vercel)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# AI (선택)
OPENAI_API_KEY=...
```

### 12.2 Site Config

```typescript
// src/shared/config/site.ts
export const SITE_CONFIG = {
  name: "Web Toolkit",
  title: "Web Toolkit - Developer Tools",
  description: "All-in-one web-based toolkit for developers",
  url: "https://web-toolkit.app",
  author: "...",
  keywords: ["developer tools", "JSON formatter", ...],
};
```

### 12.3 Next.js Config

```typescript
// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "next-pwa";

const withNextIntl = createNextIntlPlugin();
const withPWA = withPWAInit({ dest: "public", ... });

export default withNextIntl(withPWA({
  // Turbopack
  // WebAssembly headers
  // Image optimization
}));
```

### 12.4 PWA Caching Strategy

| Cache Name         | Strategy             | TTL     | Description                      |
| ------------------ | -------------------- | ------- | -------------------------------- |
| `wasm-cache`       | CacheFirst           | 1 year  | WebAssembly 바이너리 (FFmpeg 등) |
| `cdn-cache`        | CacheFirst           | 30 days | unpkg/jsdelivr CDN 리소스        |
| `google-fonts`     | CacheFirst           | 1 year  | Google Fonts                     |
| `static-resources` | StaleWhileRevalidate | 30 days | JS, CSS, WOFF2                   |
| `images`           | CacheFirst           | 30 days | 이미지 파일                      |
| `api-cache`        | NetworkFirst         | 1 hour  | API 요청                         |
| `next-static`      | CacheFirst           | 1 year  | Next.js 정적 파일                |
| `tools-pages`      | StaleWhileRevalidate | 7 days  | 도구 페이지                      |
| `convert-pages`    | StaleWhileRevalidate | 7 days  | 변환기 페이지                    |

**오프라인 폴백:**

- Document: `/offline` 페이지로 폴백
- 캐시된 도구는 오프라인에서도 사용 가능

### 12.5 TypeScript Config

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 13. Testing

### 13.1 Unit Tests (Vitest)

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
```

```bash
# 실행
npm run test
npm run test:coverage
```

### 13.2 E2E Tests (Playwright)

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
  },
});
```

```bash
# 실행
npm run test:e2e
npm run test:e2e:ui
```

### 13.3 Test Examples

```typescript
// features/json-formatter/lib/formatter.test.ts
import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, validateJson } from "./formatter";

describe("JSON Formatter", () => {
  it("formats valid JSON", () => {
    const result = formatJson('{"a":1}', 2);
    expect(result).toContain('"a": 1');
  });

  it("minifies JSON", () => {
    const result = minifyJson('{\n  "a": 1\n}');
    expect(result).toBe('{"a":1}');
  });
});
```

---

## 14. Deployment

### 14.1 Vercel (권장)

```bash
# Vercel CLI
npm i -g vercel
vercel
```

### 14.2 Build

```bash
# Node.js 20+ 필요
npm run build
npm run start
```

### 14.3 Pre-deployment Checklist

- [ ] `npm run build` 성공
- [ ] `npm run lint` 통과
- [ ] `npm run test` 통과
- [ ] 환경 변수 설정
- [ ] 번역 파일 완성 (en, ko, ja)
- [ ] SEO 메타데이터 확인

---

## Appendix

### A. Icon Reference

모든 아이콘은 [Lucide React](https://lucide.dev)에서 가져옵니다.

```typescript
import {
  FileJson,
  KeyRound,
  Image,
  QrCode,
  Hash,
  Binary,
  Link,
  Fingerprint,
  Clock,
  Palette,
  // ...
} from "lucide-react";
```

### B. Useful Commands

```bash
# Development
npm run dev              # 개발 서버 (Turbopack)
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버

# Testing
npm run test             # Vitest
npm run test:e2e         # Playwright

# Quality
npm run lint             # ESLint
npm run typecheck        # TypeScript

# Analysis
npm run analyze          # 번들 분석
```

### C. File Naming Conventions

| Type      | Convention      | Example               |
| --------- | --------------- | --------------------- |
| Component | PascalCase      | `JsonFormatter.tsx`   |
| Hook      | camelCase + use | `useJsonFormatter.ts` |
| Utility   | camelCase       | `formatter.ts`        |
| Type      | PascalCase      | `types.ts`            |
| Test      | \*.test.ts      | `formatter.test.ts`   |
| Route     | kebab-case      | `json-formatter/`     |

### D. Import Order

```typescript
// 1. React/Next.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 2. 외부 라이브러리
import { motion } from "framer-motion";
import { FileJson } from "lucide-react";

// 3. 내부 모듈 (@ alias)
import { Button, Input } from "@/shared/ui";
import { useCopyToClipboard } from "@/shared/lib";

// 4. 상대 경로
import { useJsonFormatter } from "../model/use-json-formatter";
import { formatJson } from "../lib/formatter";

// 5. 타입
import type { ToolSlug } from "@/entities/tool";
```

---

**Last Updated:** 2025-12-15
**Maintainer:** Web Toolkit Team
