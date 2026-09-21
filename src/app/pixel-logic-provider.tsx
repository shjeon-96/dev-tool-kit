"use client";

import * as UI from "@pixellogic/ui/react";

export function PixelLogicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UI.PixelLogicProvider defaultMode="system" toast={false}>
      {children}
    </UI.PixelLogicProvider>
  );
}
