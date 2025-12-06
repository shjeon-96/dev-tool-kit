# [Project] DevToolkit: 웹 기반 올인원 개발자 도구 통합 문서

## 1. 프로젝트 개요 (Overview)
* **서비스명:** DevToolkit (가칭)
* **핵심 철학:**
    1.  **Security First:** 모든 데이터(토큰, 이미지, JSON)는 **브라우저(Client-side)**에서만 처리. 서버 전송 0%.
    2.  **Performance:** Next.js App Router 최적화, WASM/Canvas 활용.
    3.  **Utility:** 오프라인 지원(PWA), 다크모드, 키보드 중심 조작(Command Palette).

---

## 2. 기술 스택 (Tech Stack)
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, shadcn/ui (Radix UI 기반)
* **State Management:** Zustand (전역 설정)
* **Animation:** Framer Motion (페이지 전환)
* **Key Libraries:**
    * Editor: `@monaco-editor/react`
    * Data: `jwt-decode`, `js-beautify`
    * Media: `jszip`, `file-saver`, `react-dropzone`
    * UI: `lucide-react`, `next-themes`, `nextjs-toploader`

---

## 3. 디렉토리 구조 (Directory Structure)
```text
/app
  /(routes)
    /tools
      /[slug]
        page.tsx      # 개별 도구 (동적 라우팅)
    layout.tsx        # 메인 레이아웃 (Sidebar + Header)
    template.tsx      # 페이지 전환 애니메이션
    page.tsx          # 메인 대시보드
/components
  /layout
    sidebar.tsx       # 데스크탑 사이드바
    mobile-sidebar.tsx# 모바일 햄버거 메뉴 (Sheet)
  /tools
    /text             # 텍스트 관련 도구 컴포넌트
    /media            # 미디어 관련 도구 컴포넌트
  /ui                 # shadcn/ui 컴포넌트
/lib
  tools-registry.ts   # 도구 메타데이터 설정
  utils.ts            # 유틸리티 (CN 등)
4. 디자인 시스템 (Design System: "Tech Slate")
4.1. 테마 개요
폰트: Inter (UI), JetBrains Mono (Code)

모드: System / Dark / Light 지원 (깜빡임 없는 전환)

4.2. Tailwind 설정 (tailwind.config.ts) & CSS 변수 (globals.css)
설치: npm install next-themes lucide-react framer-motion clsx tailwind-merge

CSS

/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
  }
}
5. 핵심 레이아웃 구현 가이드
5.1. Providers (components/theme-provider.tsx)
TypeScript

"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
5.2. Sidebar (components/layout/sidebar.tsx)
TypeScript

"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutGrid, FileJson, Lock, Image as ImageIcon } from "lucide-react"

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const routes = [
    { label: "Overview", icon: LayoutGrid, href: "/tools", active: pathname === "/tools" },
    { label: "JSON Formatter", icon: FileJson, href: "/tools/json-formatter", active: pathname === "/tools/json-formatter" },
    { label: "JWT Decoder", icon: Lock, href: "/tools/jwt-decoder", active: pathname === "/tools/jwt-decoder" },
    { label: "Image Resizer", icon: ImageIcon, href: "/tools/image-resizer", active: pathname === "/tools/image-resizer" },
  ]

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-card", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">DevToolkit</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", route.active && "bg-secondary font-medium")}
                asChild
              >
                <Link href={route.href}><route.icon className="mr-2 h-4 w-4" />{route.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
5.3. Mobile Sidebar (components/layout/mobile-sidebar.tsx)
선행조건: npx shadcn-ui@latest add sheet

TypeScript

"use client"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => { setOpen(false) }, [pathname]) // 페이지 이동 시 닫힘

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden"><Menu /></Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-card w-72">
        <Sidebar className="border-none h-full" />
      </SheetContent>
    </Sheet>
  )
}
5.4. Root Layout (app/layout.tsx)
TypeScript

import { Sidebar } from "@/components/layout/sidebar"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import NextTopLoader from 'nextjs-toploader'
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="overflow-hidden">
        <NextTopLoader color="#2299DD" showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen bg-background">
            <aside className="hidden w-64 flex-col md:flex"><Sidebar /></aside>
            <main className="flex-1 flex flex-col overflow-hidden">
              <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
                <MobileSidebar />
                <div className="flex-1">{/* Command Palette Placeholder */}</div>
                <ModeToggle />
              </header>
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
5.5. Page Transition (app/template.tsx)
TypeScript

"use client"
import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
6. 기능 명세서 (Feature Specs)
A. JSON Formatter
Input: Monaco Editor (JSON String)

Action:

Minify (공백 제거)

Beautify (들여쓰기 정렬)

Validate (오류 라인 표시)

Output: Formatted Code, Copy, Download (.json)

B. JWT Decoder
Input: JWT String

Logic: jwt-decode 라이브러리 활용 (서명 검증 X)

Display: Header / Payload(Claims) / Expiration Time (Human Readable)

C. Image Resizer & Converter
Input: Drag & Drop (Image File)

Logic: HTML5 Canvas API (Client-side)

Features:

Resize (Width/Height px)

Convert format (PNG ↔ JPG ↔ WebP)

Quality Control (0.1 ~ 1.0)

Output: Blob Download

D. App Icon Generator
Input: 1024x1024px 권장 이미지

Logic: jszip을 사용하여 사이즈별 리사이징 후 압축

Output: app-icons.zip (iOS/Android 폴더 구조 포함)

7. 개발 로드맵 (Roadmap)
Phase 1: 프로젝트 셋업, Layout & Theme 구현, JSON Formatter 배포.

Phase 2: Canvas 기반 이미지 도구(Resizer, Icon Gen) 구현.

Phase 3: Cmd+K 검색(Command Palette) 및 로컬스토리지 히스토리 기능.

Phase 4: PWA 설정 및 SEO 최적화.

---

## 8. SEO 최적화 가이드 (Next.js 16 App Router)

Next.js 16 App Router의 Metadata API와 Sitemap 생성 기능을 활용한 검색 엔진 최적화(SEO) 가이드입니다.

이 설정을 적용하면:
- 구글/네이버 봇이 도구를 개별 페이지로 인식
- 카카오톡/슬랙 공유 시 썸네일(Open Graph) 정상 표시

### 8.1. 기본 설정 (Base Configuration)

SEO 설정의 핵심은 '정확한 도메인 주소'입니다. 도메인이 없다면 Vercel 배포 주소를 임시로 사용하세요.

```typescript
// lib/constants.ts
export const SITE_CONFIG = {
  title: "DevToolkit",
  description: "개발자를 위한 웹 기반 올인원 도구 모음. JSON Formatter, JWT Decoder, Image Resizer 등을 설치 없이 브라우저에서 바로 사용하세요.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://devtoolkit.vercel.app",
};
```

### 8.2. 루트 메타데이터 설정 (app/layout.tsx)

모든 페이지에 공통 적용될 기본 메타데이터입니다. `metadataBase` 설정은 상대 경로 이미지 URL 해결을 위해 필수입니다.

```typescript
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`, // 예: "JSON Formatter | DevToolkit"
  },
  description: SITE_CONFIG.description,
  keywords: ["개발자 도구", "JSON 변환", "JWT 디코딩", "이미지 리사이즈", "웹툴"],
  authors: [{ name: "Your Name", url: SITE_CONFIG.url }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
    images: [
      {
        url: "/og-image.png", // public 폴더에 1200x630 이미지 배치
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
    creator: "@yourtwitterhandle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", // PWA용
};
```

### 8.3. 동적 메타데이터 설정 (app/tools/[slug]/page.tsx)

개별 도구 페이지마다 제목과 설명이 자동으로 바뀌도록 `generateMetadata`를 구현합니다.

**Next.js 16 변경사항**: `params`가 Promise로 변경되어 `await`가 필요합니다.

```typescript
import type { Metadata } from "next";
import { tools, ToolSlug } from "@/lib/tools-registry";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    return {};
  }

  return {
    title: tool.title, // layout의 template에 의해 "JSON Formatter | DevToolkit"으로 완성
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `/tools/${slug}`,
    },
    alternates: {
      canonical: `/tools/${slug}`,
    },
  };
}

// Page 컴포넌트도 동일하게 async params 처리
export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    notFound();
  }

  // ... 기존 렌더링 로직
}
```

### 8.4. 정적 경로 사전 생성 (generateStaticParams)

빌드 시점에 모든 도구 페이지를 사전 생성하여 성능을 최적화합니다.

```typescript
// app/tools/[slug]/page.tsx에 추가
import { tools } from "@/lib/tools-registry";

export function generateStaticParams() {
  return Object.keys(tools).map((slug) => ({
    slug,
  }));
}
```

### 8.5. 동적 사이트맵 생성 (app/sitemap.ts)

검색 엔진 봇에게 사이트의 모든 페이지를 알려주는 XML 파일을 자동 생성합니다.

```typescript
import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { tools } from "@/lib/tools-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // 1. 정적 페이지
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 2. 동적 도구 페이지 (Registry 기반 자동 생성)
  const toolRoutes: MetadataRoute.Sitemap = Object.keys(tools).map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...toolRoutes];
}
```

### 8.6. Robots.txt 생성 (app/robots.ts)

검색 봇의 접근 권한과 사이트맵 위치를 지정합니다.

```typescript
import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"], // 크롤링 금지 경로
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
```

### 8.7. Next.js 16 주요 변경사항 요약

| 항목 | Next.js 14 | Next.js 16 |
|------|------------|------------|
| `params` | 동기 객체 | `Promise` (await 필요) |
| `searchParams` | 동기 객체 | `Promise` (await 필요) |
| Page/Layout Props | `{ params: { slug } }` | `{ params: Promise<{ slug }> }` |
| generateMetadata | 동기 params 접근 | `await params` 필요 |