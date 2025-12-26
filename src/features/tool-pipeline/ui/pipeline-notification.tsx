"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { tools, type ToolSlug } from "@/entities/tool";
import { Button } from "@/shared/ui";

interface PipelineNotificationProps {
  from: ToolSlug;
  onAccept: () => void;
  onDismiss: () => void;
}

export function PipelineNotification({
  from,
  onAccept,
  onDismiss,
}: PipelineNotificationProps) {
  const t = useTranslations("tools");
  const tPipeline = useTranslations("pipeline");
  const [isVisible, setIsVisible] = useState(true);

  const fromTool = tools[from];
  if (!fromTool) return null;

  const FromIcon = fromTool.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 200);
  };

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(onAccept, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="rounded-lg border bg-card shadow-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Workflow className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {tPipeline("dataReceived")}
                </p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <FromIcon className="h-3 w-3" />
                  <span>{t(`${from}.title`)}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>{tPipeline("here")}</span>
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" onClick={handleDismiss}>
                {tPipeline("dismiss")}
              </Button>
              <Button size="sm" onClick={handleAccept}>
                {tPipeline("useData")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
