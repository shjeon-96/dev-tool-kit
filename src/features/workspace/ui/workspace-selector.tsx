"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Folder, Plus, Check, ChevronDown, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useWorkspaces, useActiveWorkspace } from "../model/use-workspace";
import type { Workspace } from "../lib/indexed-db";

interface WorkspaceSelectorProps {
  className?: string;
}

export function WorkspaceSelector({ className }: WorkspaceSelectorProps) {
  const t = useTranslations("workspace");
  const { workspaces, isLoading, create, remove } = useWorkspaces();
  const { activeId, setActive } = useActiveWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");

  const activeWorkspace = workspaces.find((w) => w.id === activeId);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const workspace = await create(newName.trim());
    setActive(workspace.id);
    setNewName("");
    setIsCreating(false);
    setIsOpen(false);
  };

  const handleSelect = (workspace: Workspace) => {
    setActive(workspace.id);
    setIsOpen(false);
  };

  const handleDelete = async (e: React.MouseEvent, workspaceId: string) => {
    e.stopPropagation();
    await remove(workspaceId);
    if (activeId === workspaceId) {
      setActive(null);
    }
  };

  if (isLoading) {
    return (
      <div
        className={cn("h-9 w-32 animate-pulse rounded-md bg-muted", className)}
      />
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 min-w-[140px] justify-between"
      >
        <div className="flex items-center gap-2">
          {activeWorkspace ? (
            <>
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: activeWorkspace.color }}
              />
              <span className="truncate max-w-[100px]">
                {activeWorkspace.name}
              </span>
            </>
          ) : (
            <>
              <Folder className="h-4 w-4" />
              <span>{t("selectWorkspace")}</span>
            </>
          )}
        </div>
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
            className="absolute top-full mt-2 left-0 z-50 min-w-[220px] rounded-lg border bg-popover p-2 shadow-lg"
          >
            {/* Workspace List */}
            <div className="max-h-[200px] overflow-y-auto">
              {workspaces.length === 0 && !isCreating ? (
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  {t("noWorkspaces")}
                </div>
              ) : (
                workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => handleSelect(workspace)}
                    className="flex items-center gap-2 w-full px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors group"
                  >
                    <div
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: workspace.color }}
                    />
                    <span className="flex-1 text-left truncate">
                      {workspace.name}
                    </span>
                    {activeId === workspace.id && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                    <button
                      onClick={(e) => handleDelete(e, workspace.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-opacity"
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </button>
                  </button>
                ))
              )}
            </div>

            {/* Divider */}
            <div className="my-2 border-t" />

            {/* Create New */}
            {isCreating ? (
              <div className="p-2">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={t("workspaceName")}
                  className="h-8 text-sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate();
                    if (e.key === "Escape") setIsCreating(false);
                  }}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsCreating(false)}
                    className="flex-1"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCreate}
                    disabled={!newName.trim()}
                    className="flex-1"
                  >
                    {t("create")}
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 w-full px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors text-muted-foreground"
              >
                <Plus className="h-4 w-4" />
                <span>{t("newWorkspace")}</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsOpen(false);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
}
