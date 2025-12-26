"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";
import { AIExplainButton } from "@/features/ai-explain";
import { PipelineButton } from "@/features/tool-pipeline";
import { SaveToWorkspace } from "@/features/workspace";
import { ShareButton } from "@/features/share";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useToolActions } from "../model/use-tool-actions";
import { MOBILE_MENU_LABELS } from "../lib/types";
import type { ToolActionsBarProps } from "../lib/types";

export function ToolActionsBar({
  toolSlug,
  input,
  output,
  context,
  className,
}: ToolActionsBarProps) {
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    connectableTools,
    hasActions,
    hasPipelineTarget,
    hasShareableContent,
  } = useToolActions({ toolSlug, input, output });

  if (!hasActions) return null;

  return (
    <>
      {/* Desktop: 가로 버튼 바 */}
      <div className={cn("hidden sm:block", className)}>
        <div className="flex items-center gap-2 flex-wrap">
          <AIExplainButton input={input} context={context} />

          {hasPipelineTarget && (
            <PipelineButton
              currentTool={toolSlug}
              output={output}
              connectableTools={connectableTools}
            />
          )}

          {hasShareableContent && (
            <>
              <SaveToWorkspace
                toolSlug={toolSlug}
                data={JSON.stringify({ input, output }, null, 2)}
              />
              <ShareButton toolSlug={toolSlug} input={input || output} />
            </>
          )}
        </div>
      </div>

      {/* Mobile: FAB 스타일 메뉴 */}
      <div className="sm:hidden">
        {/* FAB 트리거 버튼 */}
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
          onClick={toggleMobileMenu}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MoreHorizontal className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* FAB 메뉴 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* 배경 오버레이 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                onClick={closeMobileMenu}
              />

              {/* 메뉴 아이템들 */}
              <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3">
                {/* Save to Workspace */}
                {hasShareableContent && (
                  <FabMenuItem delay={0} label={MOBILE_MENU_LABELS.workspace}>
                    <div onClick={closeMobileMenu}>
                      <SaveToWorkspace
                        toolSlug={toolSlug}
                        data={JSON.stringify({ input, output }, null, 2)}
                        className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                      />
                    </div>
                  </FabMenuItem>
                )}

                {/* Pipeline */}
                {hasPipelineTarget && (
                  <FabMenuItem delay={0.05} label={MOBILE_MENU_LABELS.pipeline}>
                    <div onClick={closeMobileMenu}>
                      <PipelineButton
                        currentTool={toolSlug}
                        output={output}
                        connectableTools={connectableTools}
                        className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                      />
                    </div>
                  </FabMenuItem>
                )}

                {/* AI Explain */}
                <FabMenuItem delay={0.1} label={MOBILE_MENU_LABELS.aiExplain}>
                  <div onClick={closeMobileMenu}>
                    <AIExplainButton
                      input={input}
                      context={context}
                      className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                    />
                  </div>
                </FabMenuItem>

                {/* Magic Share */}
                {hasShareableContent && (
                  <FabMenuItem delay={0.15} label={MOBILE_MENU_LABELS.share}>
                    <div onClick={closeMobileMenu}>
                      <ShareButton
                        toolSlug={toolSlug}
                        input={input || output}
                        className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                      />
                    </div>
                  </FabMenuItem>
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/**
 * FAB 메뉴 아이템 컴포넌트
 */
function FabMenuItem({
  delay,
  label,
  children,
}: {
  delay: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      transition={{ duration: 0.15, delay }}
      className="flex items-center gap-3 justify-end"
    >
      <span className="text-sm font-medium bg-popover px-3 py-1.5 rounded-md shadow-md">
        {label}
      </span>
      {children}
    </motion.div>
  );
}
