import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SectionHeaderProps {
  title: string;
  accentColor?: "accent" | "foreground";
  badge?: {
    text: string;
    pulse?: boolean;
  };
  link?: {
    href: string;
    label: string;
  };
  className?: string;
}

export function SectionHeader({
  title,
  accentColor = "foreground",
  badge,
  link,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <div
          className={`w-1 h-8 rounded-full ${
            accentColor === "accent" ? "bg-accent" : "bg-foreground"
          }`}
        />
        <h2 className="text-2xl font-bold">{title}</h2>
        {badge && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold ${
              badge.pulse ? "pulse-subtle" : ""
            }`}
          >
            {badge.text}
          </span>
        )}
      </div>

      {link && (
        <Link
          href={link.href}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
        >
          {link.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
