# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

**Node.js 20+ 필수** (`nvm use 20`)

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (Radix UI)
- **Zustand** (상태), **Framer Motion** (애니메이션), **next-themes** (다크모드)
- **next-intl** (i18n, `messages/ko.json`, `messages/en.json`)

## Architecture (FSD)

### Layer 규칙
```
app → widgets → features → entities → shared
(상위 → 하위 import만 허용, 같은 레이어 간 import 금지)
```

### 주요 디렉토리
| Layer | 위치 | 역할 |
|-------|------|------|
| **shared** | `src/shared/` | UI 컴포넌트, 유틸, 설정 (`SITE_CONFIG`) |
| **entities** | `src/entities/tool/` | Tool 타입, 레지스트리 |
| **features** | `src/features/` | 각 도구별 기능 (json-formatter, jwt-decoder 등) |
| **widgets** | `src/widgets/` | 독립 UI 블록 (Sidebar, Header) |
| **app** | `src/app/[locale]/` | 라우팅만 담당 |

### Path Aliases
```typescript
"@/shared/*", "@/entities/*", "@/features/*", "@/widgets/*"
```

## Next.js 16 주의사항

### Async Params (Breaking Change)
```typescript
interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;  // await 필수!
}

// generateMetadata도 동일하게 await 필요
```

## 도구 추가 워크플로우

1. **타입 추가** → `src/entities/tool/model/types.ts`
   ```typescript
   export type ToolSlug = "existing" | "new-tool";
   ```

2. **Registry 등록** → `src/entities/tool/model/registry.ts`
   ```typescript
   "new-tool": {
     title: "도구 이름",
     description: "설명",
     icon: IconComponent,
     category: "text" | "media" | "security" | "converters",
   }
   ```

3. **Feature 구현** → `src/features/new-tool/`
   ```
   new-tool/
   ├── model/use-new-tool.ts  # 비즈니스 로직 Hook
   ├── ui/new-tool.tsx        # UI 컴포넌트
   └── index.ts               # export { NewTool } from "./ui/new-tool"
   ```

4. **Renderer 등록** → `src/app/[locale]/tools/[slug]/tool-renderer.tsx`
   ```typescript
   "new-tool": dynamic(
     () => import("@/features/new-tool").then((mod) => mod.NewTool),
     { ssr: false }
   ),
   ```

5. **번역 추가** → `messages/ko.json`, `messages/en.json`
   ```json
   "tools": {
     "new-tool": {
       "title": "도구 이름",
       "description": "설명"
     }
   }
   ```

## Feature 구조 패턴

```typescript
// model/use-xxx.ts - 비즈니스 로직은 Hook으로 분리
export function useNewTool() {
  const [state, setState] = useState();
  const handleAction = () => { /* ... */ };
  return { state, handleAction };
}

// ui/xxx.tsx - UI는 Hook 사용만
export function NewTool() {
  const { state, handleAction } = useNewTool();
  return <div>...</div>;
}
```

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
```
→ `src/shared/ui/`에 생성, `src/shared/ui/index.ts`에서 export

## SEO

- **JSON-LD**: `src/shared/ui/json-ld.tsx` (BreadcrumbJsonLd, FaqJsonLd)
- **설정**: `src/shared/config/site.ts` (SITE_CONFIG)
- **OG 이미지**: `/api/og` 동적 생성
- 메타데이터는 page.tsx의 `generateMetadata`에서 처리

## Widgets

### Header (`src/widgets/header/`)
- **ModeToggle**: 다크/라이트 테마 전환
- **LanguageSwitcher**: 언어 전환 (EN/KO) - `ui/language-switcher.tsx`
- **CommandMenu**: Cmd+K 도구 검색 - `src/widgets/command-menu/`

### Sidebar (`src/widgets/sidebar/`)
- 카테고리별 도구 그룹화 (Text, Media, Converters, Security)
- `getToolsByCategory()`, `getSortedCategories()` 함수 활용
- 카테고리 설정: `src/entities/tool/model/tools-config.ts`

### Command Palette (Cmd+K)
```typescript
// src/widgets/command-menu/ui/command-menu.tsx
// 키보드 단축키: Cmd+K (Mac) / Ctrl+K (Windows)
// 모든 도구 검색 및 빠른 이동 지원
```

## Tool Categories

카테고리 설정 파일: `src/entities/tool/model/tools-config.ts`

| Category | labelKey | 도구 예시 |
|----------|----------|-----------|
| **text** | `sidebar.categories.text` | JSON Formatter, SQL Formatter, Regex Tester |
| **media** | `sidebar.categories.media` | Image Resizer, QR Generator, Color Picker |
| **converters** | `sidebar.categories.converters` | Base64, Unix Timestamp, URL Encoder |
| **security** | `sidebar.categories.security` | JWT Decoder, Hash Generator |

```typescript
// 카테고리별 도구 그룹화
import { getToolsByCategory, getSortedCategories, tools } from "@/entities/tool";

const groupedTools = getToolsByCategory(tools);
const sortedCategories = getSortedCategories();
```

## i18n 구조

### 번역 파일
- `messages/en.json` - 영어
- `messages/ko.json` - 한국어

### 주요 네임스페이스
| Namespace | 용도 |
|-----------|------|
| `site` | 사이트 메타 정보 |
| `navigation` | 네비게이션 텍스트 |
| `sidebar` | 사이드바, 카테고리 라벨 |
| `common` | 공통 UI 텍스트 (Copy, Clear, Download 등) |
| `tools` | 도구별 title, description |
| `seo` | SEO 콘텐츠 (whatIs, howToUse, features, faq) |

### 사용법
```typescript
// Client Component
import { useTranslations, useLocale } from "next-intl";

const t = useTranslations("tools");
const locale = useLocale();
t("json-formatter.title"); // "JSON Formatter"

// Server Component
import { getTranslations } from "next-intl/server";

const t = await getTranslations("tools");
```
