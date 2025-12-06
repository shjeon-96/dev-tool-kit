"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { ToolSlug } from "@/entities/tool";

const toolComponents: Record<ToolSlug, React.ComponentType> = {
  "json-formatter": dynamic(
    () => import("@/features/json-formatter").then((mod) => mod.JsonFormatter),
    { ssr: false }
  ),
  "jwt-decoder": dynamic(
    () => import("@/features/jwt-decoder").then((mod) => mod.JwtDecoder),
    { ssr: false }
  ),
  "unix-timestamp": dynamic(
    () => import("@/features/unix-timestamp").then((mod) => mod.UnixTimestamp),
    { ssr: false }
  ),
  "base64-converter": dynamic(
    () =>
      import("@/features/base64-converter").then((mod) => mod.Base64Converter),
    { ssr: false }
  ),
  "image-resizer": dynamic(
    () => import("@/features/image-resizer").then((mod) => mod.ImageResizer),
    { ssr: false }
  ),
  "app-icon-generator": dynamic(
    () =>
      import("@/features/app-icon-generator").then(
        (mod) => mod.AppIconGenerator
      ),
    { ssr: false }
  ),
  "qr-generator": dynamic(
    () => import("@/features/qr-generator").then((mod) => mod.QrGenerator),
    { ssr: false }
  ),
  "color-picker": dynamic(
    () => import("@/features/color-picker").then((mod) => mod.ColorPicker),
    { ssr: false }
  ),
};

function ToolSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-muted rounded w-full" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-[400px] bg-muted rounded" />
        <div className="h-[400px] bg-muted rounded" />
      </div>
    </div>
  );
}

interface ToolRendererProps {
  slug: ToolSlug;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return (
      <p className="text-muted-foreground">
        이 도구는 아직 구현 중입니다.
      </p>
    );
  }

  return (
    <Suspense fallback={<ToolSkeleton />}>
      <ToolComponent />
    </Suspense>
  );
}
