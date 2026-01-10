"use client";

import { MobileSidebar } from "@/widgets/sidebar";
import { UserMenu } from "@/widgets/user-menu";
import { LanguageSwitcher } from "./language-switcher";
import { ModeToggle } from "@/shared/ui";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-2 sm:gap-4 border-b bg-muted/40 px-4 sm:px-6 lg:h-[60px]">
      <MobileSidebar />
      <div className="flex-1" />
      <LanguageSwitcher />
      <ModeToggle />
      <UserMenu />
    </header>
  );
}
