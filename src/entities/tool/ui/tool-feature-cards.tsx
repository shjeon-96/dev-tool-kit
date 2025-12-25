"use client";

import { useTranslations } from "next-intl";
import { Check, Sparkles, Zap, Shield, Globe, Monitor } from "lucide-react";
import { cn } from "@/shared/lib";

interface ToolFeatureCardsProps {
  features: string[];
}

export function ToolFeatureCards({ features }: ToolFeatureCardsProps) {
  const t = useTranslations("common");

  if (!features || features.length === 0) return null;

  const icons = [Zap, Shield, Globe, Monitor, Sparkles, Check];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {features.map((feature, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl border bg-card/50 hover:bg-card/80 transition-colors"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-sm text-foreground/90 font-medium leading-relaxed mt-0.5">
              {feature}
            </p>
          </div>
        );
      })}
    </div>
  );
}
