"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ label }: { label: string }) {
  function toggleTheme() {
    const root = document.documentElement;
    const current = root.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("pixellogic-theme-v1", next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <Sun
        className="theme-icon theme-icon-sun"
        aria-hidden="true"
        size={18}
        strokeWidth={1.8}
      />
      <Moon
        className="theme-icon theme-icon-moon"
        aria-hidden="true"
        size={18}
        strokeWidth={1.8}
      />
    </button>
  );
}
