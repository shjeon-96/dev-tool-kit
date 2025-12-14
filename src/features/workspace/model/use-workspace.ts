"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getItemsByWorkspace,
  createItem,
  updateItem,
  deleteItem,
  type Workspace,
  type WorkspaceItem,
} from "../lib/indexed-db";

const WORKSPACE_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#14b8a6", // teal
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
];

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadWorkspaces = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getWorkspaces();
      setWorkspaces(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load workspaces"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  const create = useCallback(async (name: string, description?: string) => {
    const color =
      WORKSPACE_COLORS[Math.floor(Math.random() * WORKSPACE_COLORS.length)];
    const workspace = await createWorkspace({ name, description, color });
    setWorkspaces((prev) => [workspace, ...prev]);
    return workspace;
  }, []);

  const update = useCallback(
    async (id: string, updates: Partial<Workspace>) => {
      const updated = await updateWorkspace(id, updates);
      setWorkspaces((prev) => prev.map((w) => (w.id === id ? updated : w)));
      return updated;
    },
    [],
  );

  const remove = useCallback(async (id: string) => {
    await deleteWorkspace(id);
    setWorkspaces((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return {
    workspaces,
    isLoading,
    error,
    create,
    update,
    remove,
    refresh: loadWorkspaces,
  };
}

export function useWorkspace(workspaceId: string | null) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadWorkspace = useCallback(async () => {
    if (!workspaceId) {
      setWorkspace(null);
      setItems([]);
      return;
    }

    try {
      setIsLoading(true);
      const [workspaceData, itemsData] = await Promise.all([
        getWorkspace(workspaceId),
        getItemsByWorkspace(workspaceId),
      ]);
      setWorkspace(workspaceData || null);
      setItems(itemsData);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load workspace"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    loadWorkspace();
  }, [loadWorkspace]);

  const addItem = useCallback(
    async (toolSlug: string, name: string, data: string) => {
      if (!workspaceId) throw new Error("No workspace selected");
      const item = await createItem({ workspaceId, toolSlug, name, data });
      setItems((prev) => [...prev, item]);
      return item;
    },
    [workspaceId],
  );

  const updateItemData = useCallback(
    async (itemId: string, updates: Partial<WorkspaceItem>) => {
      const updated = await updateItem(itemId, updates);
      setItems((prev) => prev.map((i) => (i.id === itemId ? updated : i)));
      return updated;
    },
    [],
  );

  const removeItem = useCallback(async (itemId: string) => {
    await deleteItem(itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  return {
    workspace,
    items,
    isLoading,
    error,
    addItem,
    updateItem: updateItemData,
    removeItem,
    refresh: loadWorkspace,
  };
}

export function useActiveWorkspace() {
  const [activeId, setActiveId] = useState<string | null>(() => {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("active-workspace-id");
    }
    return null;
  });

  const setActive = useCallback((id: string | null) => {
    setActiveId(id);
    if (id) {
      localStorage.setItem("active-workspace-id", id);
    } else {
      localStorage.removeItem("active-workspace-id");
    }
  }, []);

  return { activeId, setActive };
}
