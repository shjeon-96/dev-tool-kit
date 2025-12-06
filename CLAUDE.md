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
| **features** | `src/features/` | 사용자 기능 (theme-toggle 등) |
| **widgets** | `src/widgets/` | 독립 UI 블록 (Sidebar, Header) |
| **app** | `src/app/` | 라우팅만 담당 |

### Path Aliases
```typescript
"@/shared/*", "@/entities/*", "@/features/*", "@/widgets/*"
```

## Next.js 16 주의사항

### Async Params (Breaking Change)
```typescript
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;  // await 필수!
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
     category: "text" | "media" | "security",
   }
   ```

3. **컴포넌트 구현** → `src/features/tools/new-tool/`
4. 동적 라우팅 자동 처리 (`/tools/[slug]`)

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
```
→ `src/shared/ui/`에 생성, `src/shared/ui/index.ts`에서 export

## SEO

- **JSON-LD**: `src/shared/ui/json-ld.tsx` (SoftwareApplication 스키마)
- **설정**: `src/shared/config/site.ts` (SITE_CONFIG)
- 메타데이터는 `layout.tsx`에서 SITE_CONFIG 활용
