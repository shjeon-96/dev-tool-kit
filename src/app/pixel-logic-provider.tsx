"use client";

import * as UI from "@pixellogic/ui/react";
import type { Locale } from "@/shared/config/site";

export function PixelLogicProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <UI.PixelLogicProvider
      className="pixellogic-theme"
      defaultMode="system"
      locale={locale}
      toast={false}
    >
      {children}
    </UI.PixelLogicProvider>
  );
}
