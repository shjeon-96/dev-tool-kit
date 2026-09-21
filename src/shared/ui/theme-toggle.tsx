"use client";

import { Moon, Sun } from "lucide-react";
import * as UI from "@pixellogic/ui/react";

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedMode, setMode } = UI.useTheme();

  return (
    <UI.IconButton
      icon={resolvedMode === "dark" ? Sun : Moon}
      label={label}
      variant="ghost"
      onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
    />
  );
}
