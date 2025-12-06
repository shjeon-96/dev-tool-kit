import { MobileSidebar } from "@/widgets/sidebar";
import { ModeToggle } from "@/features/theme-toggle";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
      <MobileSidebar />
      <div className="flex-1">{/* Command Palette Placeholder */}</div>
      <ModeToggle />
    </header>
  );
}
