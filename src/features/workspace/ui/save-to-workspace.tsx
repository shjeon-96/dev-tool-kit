"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Save, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  useWorkspaces,
  useWorkspace,
  useActiveWorkspace,
} from "../model/use-workspace";
import type { ToolSlug } from "@/entities/tool";

interface SaveToWorkspaceProps {
  toolSlug: ToolSlug;
  data: string;
  className?: string;
}

export function SaveToWorkspace({
  toolSlug,
  data,
  className,
}: SaveToWorkspaceProps) {
  const t = useTranslations("workspace");
  const { workspaces, create: createWorkspace } = useWorkspaces();
  const { activeId, setActive } = useActiveWorkspace();
  const { addItem } = useWorkspace(activeId);
  const [isOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    activeId,
  );
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasData = data.trim().length > 0;

  const handleSave = async () => {
    if (!selectedWorkspaceId || !itemName.trim() || !data.trim()) return;

    try {
      setIsSaving(true);

      // If saving to a different workspace, we need to use its addItem
      if (selectedWorkspaceId !== activeId) {
        setActive(selectedWorkspaceId);
      }

      await addItem(toolSlug, itemName.trim(), data);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setIsOpen(false);
        setItemName("");
      }, 1500);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) return;
    const workspace = await createWorkspace(newWorkspaceName.trim());
    setSelectedWorkspaceId(workspace.id);
    setActive(workspace.id);
    setNewWorkspaceName("");
    setIsCreatingWorkspace(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!hasData}
        className={cn(
          "gap-2 transition-all",
          hasData && "border-primary/50 hover:border-primary",
        )}
      >
        {saved ? (
          <>
            <Check className="h-4 w-4 text-success" />
            <span>{t("saved")}</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>{t("saveToWorkspace")}</span>
          </>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 z-50 w-[280px] rounded-lg border bg-popover p-4 shadow-lg"
          >
            <div className="space-y-4">
              {/* Item Name */}
              <div>
                <label className="text-sm font-medium">{t("itemName")}</label>
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder={t("enterItemName")}
                  className="mt-1"
                  autoFocus
                />
              </div>

              {/* Workspace Selection */}
              <div>
                <label className="text-sm font-medium">{t("workspace")}</label>
                <div className="mt-1 max-h-[150px] overflow-y-auto rounded-md border">
                  {workspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      onClick={() => setSelectedWorkspaceId(workspace.id)}
                      className={cn(
                        "flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors",
                        selectedWorkspaceId === workspace.id
                          ? "bg-primary/10"
                          : "hover:bg-accent",
                      )}
                    >
                      <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: workspace.color }}
                      />
                      <span className="flex-1 text-left truncate">
                        {workspace.name}
                      </span>
                      {selectedWorkspaceId === workspace.id && (
                        <Check className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}

                  {workspaces.length === 0 && (
                    <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                      {t("noWorkspaces")}
                    </div>
                  )}
                </div>
              </div>

              {/* Create New Workspace */}
              {isCreatingWorkspace ? (
                <div className="space-y-2">
                  <Input
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    placeholder={t("workspaceName")}
                    className="h-8 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreateWorkspace();
                      if (e.key === "Escape") setIsCreatingWorkspace(false);
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsCreatingWorkspace(false)}
                      className="flex-1"
                    >
                      {t("cancel")}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCreateWorkspace}
                      disabled={!newWorkspaceName.trim()}
                      className="flex-1"
                    >
                      {t("create")}
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsCreatingWorkspace(true)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t("newWorkspace")}</span>
                </button>
              )}

              {/* Save Button */}
              <Button
                className="w-full"
                onClick={handleSave}
                disabled={!selectedWorkspaceId || !itemName.trim() || isSaving}
              >
                {isSaving ? t("saving") : t("save")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsOpen(false);
            setIsCreatingWorkspace(false);
          }}
        />
      )}
    </div>
  );
}
