"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wand2, X, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui";
import { tools, type ToolSlug } from "@/entities/tool";
import type { DetectionResult } from "../model/detector";

interface SmartPasteNotificationProps {
  show: boolean;
  detection: DetectionResult | null;
  onNavigate: (tool: string) => void;
  onDismiss: () => void;
}

export function SmartPasteNotification({
  show,
  detection,
  onNavigate,
  onDismiss,
}: SmartPasteNotificationProps) {
  if (!detection) return null;

  const tool = tools[detection.tool as ToolSlug];
  if (!tool) return null;

  const Icon = tool.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-background/95 backdrop-blur-md shadow-lg shadow-primary/10">
            {/* Magic wand icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Wand2 className="h-5 w-5 text-primary" />
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{detection.reason}</span>
              <span className="text-xs text-muted-foreground">
                Confidence: {Math.round(detection.confidence * 100)}%
              </span>
            </div>

            {/* Tool button */}
            <Button
              size="sm"
              onClick={() => onNavigate(detection.tool)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">Open in</span>
              <span className="font-medium">{tool.title}</span>
              <ArrowRight className="h-3 w-3" />
            </Button>

            {/* Dismiss button */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
