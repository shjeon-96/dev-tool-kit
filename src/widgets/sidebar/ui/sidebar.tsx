"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { tools } from "@/entities/tool";
import { LayoutGrid } from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Overview",
      icon: LayoutGrid,
      href: "/tools",
      active: pathname === "/tools",
    },
    ...Object.entries(tools).map(([slug, tool]) => ({
      label: tool.title,
      icon: tool.icon,
      href: `/tools/${slug}`,
      active: pathname === `/tools/${slug}`,
    })),
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-card", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
            DevToolkit
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active && "bg-secondary font-medium"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
