"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, Button } from "@/shared/ui";
import { Sidebar } from "./sidebar";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-card w-72">
        <Sidebar className="border-none h-full" />
      </SheetContent>
    </Sheet>
  );
}
