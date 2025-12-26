"use client";

import { Search } from "lucide-react";
import { MobileSidebar } from "@/widgets/sidebar";
import { ModeToggle } from "@/features/theme-toggle";
import { CommandMenu } from "@/widgets/command-menu";
import { WorkspaceSelector } from "@/features/workspace";
import { UserMenu } from "@/widgets/user-menu";
import { GitHubStarBadge } from "@/widgets/github-star-badge";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/shared/ui";

function MobileSearchButton() {
  const openCommandMenu = () => {
    document.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={openCommandMenu}
      aria-label="Search"
    >
      <Search className="h-5 w-5" />
    </Button>
  );
}

export function Header() {
  return (
    <header className="flex h-14 items-center gap-2 sm:gap-4 border-b bg-muted/40 px-4 sm:px-6 lg:h-[60px]">
      <MobileSidebar />
      <MobileSearchButton />
      <div className="flex-1">
        <CommandMenu />
      </div>
      <GitHubStarBadge />
      <WorkspaceSelector className="hidden sm:flex" />
      <LanguageSwitcher />
      <ModeToggle />
      <UserMenu />
    </header>
  );
}
