# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
npm run analyze  # 번들 분석 (ANALYZE=true)
```

**Node.js 20+ 필수** (`nvm use 20`)

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (Radix UI)
- **Zustand** (상태), **Framer Motion** (애니메이션), **next-themes** (다크모드)
- **next-intl** (i18n, `messages/en.json`, `messages/ko.json`, `messages/ja.json`)
- **next-pwa** (PWA 지원, 오프라인, 앱 설치)

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
- `messages/en.json` - 영어 (기본값)
- `messages/ko.json` - 한국어
- `messages/ja.json` - 일본어

### 언어 추가 방법
1. `messages/` 폴더에 새 언어 파일 생성 (예: `messages/es.json`)
2. `src/i18n/routing.ts`에 locale 추가: `locales: ["en", "ko", "ja", "es"]`
3. `src/widgets/header/ui/language-switcher.tsx`에 언어 옵션 추가

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

## PWA

- **manifest.json**: `public/manifest.json`
- **아이콘**: `public/icons/` (72x72 ~ 512x512)
- **아이콘 생성**: `node scripts/generate-icons.mjs`
- **설정**: `next.config.ts` (next-pwa)

## Shared Hooks

### useToolHistory
도구별 입출력 기록 저장 (LocalStorage 기반, 최대 20개)

```typescript
import { useToolHistory } from "@/shared/lib";

const {
  history,           // HistoryItem[] - 기록 목록
  hasHistory,        // boolean - 기록 존재 여부
  addToHistory,      // (input, output) => void - 기록 추가
  clearHistory,      // () => void - 전체 삭제
  loadFromHistory,   // (input, output) => void - 기록 불러오기
} = useToolHistory("json-formatter");

// 적용된 도구: JSON Formatter, JWT Decoder, Hash Generator
// 사용법: History 버튼 클릭 → 이전 기록 선택
```

## 광고 컴포넌트

### AdUnit 컴포넌트
```typescript
import { AdUnit, AdSidebar, ToolResultAd } from "@/shared/ui";

// 일반 광고 (자동 포맷)
<AdUnit slot="SLOT_ID" format="auto" />

// 사이드바 스티키 광고 (세로형)
<AdSidebar slot="SLOT_ID" />

// 도구 결과창 주변 광고 (가로형)
<ToolResultAd slot="SLOT_ID" position="bottom" />
```

| 컴포넌트 | 위치 | 포맷 |
|----------|------|------|
| `AdUnit` | 범용 | auto/horizontal/vertical/rectangle |
| `AdSidebar` | 사이드바 하단 (sticky) | vertical |
| `ToolResultAd` | 결과창 상단/하단 | horizontal |

## Analytics

- **Google Analytics**: GA4 (G-BHCZK28NQQ)
- **Google Tag Manager**: GTM-NKT5P48C
- **Microsoft Clarity**: 환경변수 `NEXT_PUBLIC_CLARITY_ID` 설정 시 활성화
- **AdSense**: ca-pub-4981986991458105
