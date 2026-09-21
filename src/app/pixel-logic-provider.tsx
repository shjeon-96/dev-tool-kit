"use client";

import * as UI from "@pixellogic/ui/react";

export function PixelLogicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UI.PixelLogicProvider
      className="pixellogic-theme"
      defaultMode="system"
      toast={false}
    >
      {children}
    </UI.PixelLogicProvider>
  );
}
