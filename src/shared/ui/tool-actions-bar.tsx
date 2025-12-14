"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";
import { AIExplainButton } from "@/features/ai-explain";
import { PipelineButton, getConnectableTools } from "@/features/tool-pipeline";
import { SaveToWorkspace } from "@/features/workspace";
import { ShareButton } from "@/features/share";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import type { ToolSlug } from "@/entities/tool";
import type { ExplainContext } from "@/features/ai-explain/lib/prompts";

interface ToolActionsBarProps {
  toolSlug: ToolSlug;
  input: string;
  output: string;
  context?: ExplainContext;
  className?: string;
}

export function ToolActionsBar({
  toolSlug,
  input,
  output,
  context,
  className,
}: ToolActionsBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const connectableTools = getConnectableTools(toolSlug);

  const hasActions = input || output || connectableTools.length > 0;

  if (!hasActions) return null;

  return (
    <>
      {/* Desktop: 기존 가로 버튼 바 */}
      <div className={cn("hidden sm:block", className)}>
        <div className="flex items-center gap-2 flex-wrap">
          {/* AI Explain - 입력값 분석 */}
          <AIExplainButton input={input} context={context} />

          {/* Pipeline - 다른 도구로 전송 */}
          {output && connectableTools.length > 0 && (
            <PipelineButton
              currentTool={toolSlug}
              output={output}
              connectableTools={connectableTools}
            />
          )}

          {/* Save to Workspace */}
          {(input || output) && (
            <SaveToWorkspace
              toolSlug={toolSlug}
              data={JSON.stringify({ input, output }, null, 2)}
            />
          )}

          {/* Magic Share - 공유 링크 생성 */}
          {(input || output) && (
            <ShareButton toolSlug={toolSlug} input={input || output} />
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

        {/* FAB 메뉴 아이템들 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* 배경 오버레이 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* 메뉴 아이템들 */}
              <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3">
                {/* Save to Workspace */}
                {(input || output) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.15, delay: 0 }}
                    className="flex items-center gap-3 justify-end"
                  >
                    <span className="text-sm font-medium bg-popover px-3 py-1.5 rounded-md shadow-md">
                      워크스페이스에 저장
                    </span>
                    <div onClick={() => setIsMobileMenuOpen(false)}>
                      <SaveToWorkspace
                        toolSlug={toolSlug}
                        data={JSON.stringify({ input, output }, null, 2)}
                        className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Pipeline */}
                {output && connectableTools.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.15, delay: 0.05 }}
                    className="flex items-center gap-3 justify-end"
                  >
                    <span className="text-sm font-medium bg-popover px-3 py-1.5 rounded-md shadow-md">
                      다른 도구로 전송
                    </span>
                    <div onClick={() => setIsMobileMenuOpen(false)}>
                      <PipelineButton
                        currentTool={toolSlug}
                        output={output}
                        connectableTools={connectableTools}
                        className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                      />
                    </div>
                  </motion.div>
                )}

                {/* AI Explain */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.15, delay: 0.1 }}
                  className="flex items-center gap-3 justify-end"
                >
                  <span className="text-sm font-medium bg-popover px-3 py-1.5 rounded-md shadow-md">
                    AI 분석
                  </span>
                  <div onClick={() => setIsMobileMenuOpen(false)}>
                    <AIExplainButton
                      input={input}
                      context={context}
                      className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                    />
                  </div>
                </motion.div>

                {/* Magic Share */}
                {(input || output) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.15, delay: 0.15 }}
                    className="flex items-center gap-3 justify-end"
                  >
                    <span className="text-sm font-medium bg-popover px-3 py-1.5 rounded-md shadow-md">
                      공유 링크
                    </span>
                    <div onClick={() => setIsMobileMenuOpen(false)}>
                      <ShareButton
                        toolSlug={toolSlug}
                        input={input || output}
                        className="[&>button]:h-12 [&>button]:w-12 [&>button]:rounded-full [&>button]:shadow-md"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
