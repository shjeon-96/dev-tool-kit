"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Settings, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useAIExplain } from "../model/use-ai-explain";
import { AIConfigDialog } from "./ai-config-dialog";
import type { ExplainContext } from "../lib/prompts";

interface AIExplainButtonProps {
  input: string;
  context?: ExplainContext;
  onResult?: (result: string) => void;
  className?: string;
}

export function AIExplainButton({
  input,
  context,
  onResult,
  className,
}: AIExplainButtonProps) {
  const t = useTranslations("aiExplain");
  const [showConfig, setShowConfig] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const {
    config,
    isConfigured,
    saveConfig,
    explain,
    isLoading,
    error,
    result,
    detectInputContext,
  } = useAIExplain();

  const hasInput = input.trim().length > 0;
  const detectedContext = context || detectInputContext(input);

  const handleExplain = async () => {
    if (!isConfigured) {
      setShowConfig(true);
      return;
    }

    const response = await explain(input, detectedContext);
    if (response) {
      setShowResult(true);
      onResult?.(response);
    }
  };

  return (
    <>
      <div className={cn("relative", className)}>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExplain}
            disabled={!hasInput || isLoading}
            className={cn(
              "gap-2 transition-all",
              hasInput &&
                "border-violet-500/50 hover:border-violet-500 hover:bg-violet-500/10",
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 text-violet-500" />
            )}
            <span>{t("explain")}</span>
          </Button>

          {isConfigured && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowConfig(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Error tooltip */}
        {error && (
          <div className="absolute top-full mt-2 left-0 z-50 max-w-xs">
            <div className="flex items-start gap-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-md px-3 py-2 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Config Dialog */}
      <AIConfigDialog
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        onSave={(newConfig) => saveConfig(newConfig)}
        currentConfig={config}
      />

      {/* Result Panel */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-4 md:bottom-4 md:w-[400px] z-50"
          >
            <div className="bg-card border rounded-lg shadow-lg max-h-[60vh] overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b bg-violet-500/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  <span className="font-medium text-sm">
                    {t("aiExplanation")}
                  </span>
                </div>
                <button
                  onClick={() => setShowResult(false)}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  {t("close")}
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(60vh-48px)] prose prose-sm dark:prose-invert prose-p:my-2 prose-headings:my-3">
                <div
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(result) }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple markdown to HTML converter
function formatMarkdown(text: string): string {
  return (
    text
      // Headers
      .replace(/^### (.*$)/gim, "<h4>$1</h4>")
      .replace(/^## (.*$)/gim, "<h3>$1</h3>")
      .replace(/^# (.*$)/gim, "<h2>$1</h2>")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Code blocks
      .replace(
        /```(\w*)\n([\s\S]*?)```/g,
        '<pre><code class="language-$1">$2</code></pre>',
      )
      // Inline code
      .replace(/`(.*?)`/g, "<code>$1</code>")
      // Lists
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>[\s\S]*<\/li>)/, "<ul>$1</ul>")
      // Line breaks
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")
  );
}
