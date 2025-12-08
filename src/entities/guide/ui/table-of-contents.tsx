"use client";

import { cn } from "@/shared/lib";

interface TableOfContentsProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
  activeId?: string;
}

export function TableOfContents({ sections, activeId }: TableOfContentsProps) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-6">
      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
        Contents
      </h4>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className={cn(
                "text-left hover:text-primary transition-colors block w-full truncate",
                activeId === section.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground",
              )}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
