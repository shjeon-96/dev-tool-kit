import type { CheatsheetItem } from "../model/types";

export const nextjsSyntax: CheatsheetItem[] = [
  // App Router Basics
  {
    code: "app/page.tsx",
    name: "Page component",
    description: "Route page file",
    category: "App Router",
  },
  {
    code: "app/layout.tsx",
    name: "Layout",
    description: "Shared layout component",
    category: "App Router",
  },
  {
    code: "app/loading.tsx",
    name: "Loading UI",
    description: "Loading state component",
    category: "App Router",
  },
  {
    code: "app/error.tsx",
    name: "Error boundary",
    description: "Error handling component",
    category: "App Router",
  },
  {
    code: "app/not-found.tsx",
    name: "Not found",
    description: "404 page component",
    category: "App Router",
  },
  {
    code: "app/[slug]/page.tsx",
    name: "Dynamic route",
    description: "Dynamic route segment",
    category: "App Router",
  },
  {
    code: "app/[...slug]/page.tsx",
    name: "Catch-all route",
    description: "Catch all segments",
    category: "App Router",
  },
  {
    code: "app/[[...slug]]/page.tsx",
    name: "Optional catch-all",
    description: "Optional catch all segments",
    category: "App Router",
  },
  {
    code: "app/(group)/page.tsx",
    name: "Route group",
    description: "Group without affecting URL",
    category: "App Router",
  },
  {
    code: "app/@modal/page.tsx",
    name: "Parallel route",
    description: "Parallel route slot",
    category: "App Router",
  },
  {
    code: "app/(..)photo/[id]/page.tsx",
    name: "Intercepting route",
    description: "Intercept route navigation",
    category: "App Router",
  },

  // Server Components
  {
    code: "export default async function Page() {}",
    name: "Server Component",
    description: "Default async server component",
    category: "Server Components",
  },
  {
    code: "const data = await fetch(url)",
    name: "Server fetch",
    description: "Fetch data on server",
    category: "Server Components",
  },
  {
    code: "import { cookies } from 'next/headers'",
    name: "cookies()",
    description: "Access cookies on server",
    category: "Server Components",
  },
  {
    code: "import { headers } from 'next/headers'",
    name: "headers()",
    description: "Access headers on server",
    category: "Server Components",
  },
  {
    code: "fetch(url, { cache: 'no-store' })",
    name: "No cache",
    description: "Disable request caching",
    category: "Server Components",
  },
  {
    code: "fetch(url, { next: { revalidate: 3600 } })",
    name: "Revalidate",
    description: "Time-based revalidation",
    category: "Server Components",
  },
  {
    code: "fetch(url, { next: { tags: ['collection'] } })",
    name: "Cache tags",
    description: "Tag for on-demand revalidation",
    category: "Server Components",
  },

  // Client Components
  {
    code: "'use client'",
    name: "Client directive",
    description: "Mark as client component",
    category: "Client Components",
  },
  {
    code: "import { useState } from 'react'",
    name: "Client hooks",
    description: "Use React hooks in client",
    category: "Client Components",
  },
  {
    code: "onClick, onChange, onSubmit",
    name: "Event handlers",
    description: "Interactive event handlers",
    category: "Client Components",
  },
  {
    code: "useEffect, useLayoutEffect",
    name: "Browser APIs",
    description: "Access browser APIs",
    category: "Client Components",
  },

  // Server Actions
  {
    code: "'use server'",
    name: "Server action",
    description: "Mark as server action",
    category: "Server Actions",
  },
  {
    code: "async function action(formData: FormData) { 'use server' }",
    name: "Inline server action",
    description: "Define action inline",
    category: "Server Actions",
  },
  {
    code: "<form action={serverAction}>",
    name: "Form action",
    description: "Use server action in form",
    category: "Server Actions",
  },
  {
    code: "import { revalidatePath } from 'next/cache'",
    name: "revalidatePath",
    description: "Revalidate specific path",
    category: "Server Actions",
  },
  {
    code: "import { revalidateTag } from 'next/cache'",
    name: "revalidateTag",
    description: "Revalidate by cache tag",
    category: "Server Actions",
  },
  {
    code: "import { redirect } from 'next/navigation'",
    name: "redirect",
    description: "Redirect after action",
    category: "Server Actions",
  },

  // Navigation
  {
    code: "import Link from 'next/link'",
    name: "Link",
    description: "Client-side navigation",
    category: "Navigation",
  },
  {
    code: '<Link href="/path" prefetch={false}>',
    name: "Link prefetch",
    description: "Control prefetching",
    category: "Navigation",
  },
  {
    code: "import { useRouter } from 'next/navigation'",
    name: "useRouter",
    description: "Programmatic navigation",
    category: "Navigation",
  },
  {
    code: "router.push('/path')",
    name: "router.push",
    description: "Navigate to path",
    category: "Navigation",
  },
  {
    code: "router.replace('/path')",
    name: "router.replace",
    description: "Replace current history",
    category: "Navigation",
  },
  {
    code: "router.back()",
    name: "router.back",
    description: "Go back in history",
    category: "Navigation",
  },
  {
    code: "router.refresh()",
    name: "router.refresh",
    description: "Refresh current route",
    category: "Navigation",
  },
  {
    code: "import { usePathname } from 'next/navigation'",
    name: "usePathname",
    description: "Get current pathname",
    category: "Navigation",
  },
  {
    code: "import { useSearchParams } from 'next/navigation'",
    name: "useSearchParams",
    description: "Get search params",
    category: "Navigation",
  },
  {
    code: "import { useParams } from 'next/navigation'",
    name: "useParams",
    description: "Get route params",
    category: "Navigation",
  },

  // Metadata
  {
    code: "export const metadata: Metadata = { title: '...' }",
    name: "Static metadata",
    description: "Static page metadata",
    category: "Metadata",
  },
  {
    code: "export async function generateMetadata({ params }): Promise<Metadata>",
    name: "Dynamic metadata",
    description: "Generate metadata dynamically",
    category: "Metadata",
  },
  {
    code: "title: { template: '%s | Site', default: 'Site' }",
    name: "Title template",
    description: "Title template pattern",
    category: "Metadata",
  },
  {
    code: "openGraph: { title, description, images }",
    name: "Open Graph",
    description: "OG metadata",
    category: "Metadata",
  },
  {
    code: "robots: { index: true, follow: true }",
    name: "Robots",
    description: "Search engine directives",
    category: "Metadata",
  },

  // Static Generation
  {
    code: "export async function generateStaticParams() { return [...] }",
    name: "generateStaticParams",
    description: "Pre-render dynamic routes",
    category: "Static Generation",
  },
  {
    code: "export const dynamic = 'force-static'",
    name: "force-static",
    description: "Force static rendering",
    category: "Static Generation",
  },
  {
    code: "export const dynamic = 'force-dynamic'",
    name: "force-dynamic",
    description: "Force dynamic rendering",
    category: "Static Generation",
  },
  {
    code: "export const revalidate = 3600",
    name: "Segment revalidate",
    description: "Set revalidation interval",
    category: "Static Generation",
  },

  // Image Optimization
  {
    code: "import Image from 'next/image'",
    name: "Image",
    description: "Optimized image component",
    category: "Image",
  },
  {
    code: '<Image src="/img.png" width={500} height={300} alt="" />',
    name: "Image basic",
    description: "Basic image usage",
    category: "Image",
  },
  {
    code: '<Image fill className="object-cover" />',
    name: "Image fill",
    description: "Fill parent container",
    category: "Image",
  },
  {
    code: "<Image priority />",
    name: "Image priority",
    description: "Preload important image",
    category: "Image",
  },
  {
    code: '<Image placeholder="blur" blurDataURL="..." />',
    name: "Image blur",
    description: "Blur placeholder",
    category: "Image",
  },
  {
    code: 'sizes="(max-width: 768px) 100vw, 50vw"',
    name: "Image sizes",
    description: "Responsive sizes",
    category: "Image",
  },

  // Font Optimization
  {
    code: "import { Inter } from 'next/font/google'",
    name: "Google Font",
    description: "Import Google font",
    category: "Font",
  },
  {
    code: "const inter = Inter({ subsets: ['latin'] })",
    name: "Font config",
    description: "Configure font options",
    category: "Font",
  },
  {
    code: "<html className={inter.className}>",
    name: "Font className",
    description: "Apply font to element",
    category: "Font",
  },
  {
    code: "import localFont from 'next/font/local'",
    name: "Local font",
    description: "Import local font file",
    category: "Font",
  },

  // API Routes
  {
    code: "app/api/route.ts",
    name: "Route handler",
    description: "API route file",
    category: "API Routes",
  },
  {
    code: "export async function GET(request: Request) {}",
    name: "GET handler",
    description: "Handle GET requests",
    category: "API Routes",
  },
  {
    code: "export async function POST(request: Request) {}",
    name: "POST handler",
    description: "Handle POST requests",
    category: "API Routes",
  },
  {
    code: "return Response.json({ data })",
    name: "JSON response",
    description: "Return JSON response",
    category: "API Routes",
  },
  {
    code: "return new Response(body, { status: 200, headers })",
    name: "Custom response",
    description: "Custom Response object",
    category: "API Routes",
  },
  {
    code: "const body = await request.json()",
    name: "Parse body",
    description: "Parse request body",
    category: "API Routes",
  },
  {
    code: "const { searchParams } = new URL(request.url)",
    name: "Query params",
    description: "Get query parameters",
    category: "API Routes",
  },

  // Middleware
  {
    code: "middleware.ts",
    name: "Middleware file",
    description: "Root middleware file",
    category: "Middleware",
  },
  {
    code: "export function middleware(request: NextRequest) {}",
    name: "Middleware function",
    description: "Middleware handler",
    category: "Middleware",
  },
  {
    code: "return NextResponse.redirect(new URL('/login', request.url))",
    name: "Redirect",
    description: "Redirect in middleware",
    category: "Middleware",
  },
  {
    code: "return NextResponse.rewrite(new URL('/proxy', request.url))",
    name: "Rewrite",
    description: "Rewrite URL in middleware",
    category: "Middleware",
  },
  {
    code: "export const config = { matcher: ['/dashboard/:path*'] }",
    name: "Matcher",
    description: "Limit middleware paths",
    category: "Middleware",
  },

  // Environment Variables
  {
    code: "process.env.API_KEY",
    name: "Server env",
    description: "Server-only env variable",
    category: "Environment",
  },
  {
    code: "process.env.NEXT_PUBLIC_API_URL",
    name: "Public env",
    description: "Client-accessible env",
    category: "Environment",
  },
  {
    code: ".env.local",
    name: "Local env file",
    description: "Local environment file",
    category: "Environment",
  },
  {
    code: ".env.development / .env.production",
    name: "Env by mode",
    description: "Environment-specific files",
    category: "Environment",
  },

  // Config
  {
    code: "next.config.js / next.config.ts",
    name: "Config file",
    description: "Next.js configuration",
    category: "Config",
  },
  {
    code: "images: { remotePatterns: [...] }",
    name: "Remote images",
    description: "Allow remote image domains",
    category: "Config",
  },
  {
    code: "async redirects() { return [...] }",
    name: "Redirects",
    description: "Configure redirects",
    category: "Config",
  },
  {
    code: "async rewrites() { return [...] }",
    name: "Rewrites",
    description: "Configure URL rewrites",
    category: "Config",
  },
  {
    code: "async headers() { return [...] }",
    name: "Headers",
    description: "Configure custom headers",
    category: "Config",
  },
];
