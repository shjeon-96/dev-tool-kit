import { MobileSidebar } from "@/widgets/sidebar";
import { ModeToggle } from "@/features/theme-toggle";
import { CommandMenu } from "@/widgets/command-menu";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
      <MobileSidebar />
      <div className="flex-1">
        <CommandMenu />
      </div>
      <LanguageSwitcher />
      <ModeToggle />
    </header>
  );
}
