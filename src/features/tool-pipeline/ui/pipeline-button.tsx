"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Workflow, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tools, type ToolSlug } from "@/entities/tool";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface PipelineButtonProps {
  currentTool: ToolSlug;
  output: string;
  connectableTools: ToolSlug[];
  className?: string;
}

export function PipelineButton({
  currentTool,
  output,
  connectableTools,
  className,
}: PipelineButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("tools");
  const tPipeline = useTranslations("pipeline");

  const handleSendTo = useCallback(
    (targetTool: ToolSlug) => {
      // SSR safety check for sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "pipeline-data",
          JSON.stringify({
            from: currentTool,
            to: targetTool,
            data: output,
            timestamp: Date.now(),
          }),
        );
      }
      setIsOpen(false);
      router.push(`/${locale}/tools/${targetTool}`);
    },
    [currentTool, output, locale, router],
  );

  if (connectableTools.length === 0) return null;

  const hasOutput = output.trim().length > 0;

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!hasOutput}
        className={cn(
          "gap-2 transition-all",
          hasOutput && "border-primary/50 hover:border-primary",
        )}
      >
        <Workflow className="h-4 w-4" />
        <span>{tPipeline("sendTo")}</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 z-50 min-w-[200px] rounded-lg border bg-popover p-2 shadow-lg"
          >
            <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
              {tPipeline("availableTools")}
            </div>
            {connectableTools.map((toolSlug) => {
              const tool = tools[toolSlug];
              if (!tool) return null;
              const Icon = tool.icon;

              return (
                <button
                  key={toolSlug}
                  onClick={() => handleSendTo(toolSlug)}
                  className="flex items-center gap-2 w-full px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-left">
                    {t(`${toolSlug}.title`)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
