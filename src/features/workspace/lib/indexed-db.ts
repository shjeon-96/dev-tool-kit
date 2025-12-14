import Dexie, { type EntityTable } from "dexie";

// ============================================
// Workspace Database Schema (Dexie.js)
// ============================================

export interface WorkspaceItem {
  id: string;
  workspaceId: string;
  toolSlug: string;
  name: string;
  data: string;
  createdAt: number;
  updatedAt: number;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// Dexie Database Instance
// ============================================

class WorkspaceDB extends Dexie {
  workspaces!: EntityTable<Workspace, "id">;
  items!: EntityTable<WorkspaceItem, "id">;

  constructor() {
    super("web-toolkit-workspaces");
    this.version(1).stores({
      workspaces: "id, name, updatedAt",
      items: "id, workspaceId, toolSlug, updatedAt",
    });
  }
}

export const db = new WorkspaceDB();

// ============================================
// Workspace Operations
// ============================================

export async function createWorkspace(
  workspace: Omit<Workspace, "id" | "createdAt" | "updatedAt">,
): Promise<Workspace> {
  const now = Date.now();
  const newWorkspace: Workspace = {
    ...workspace,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  await db.workspaces.add(newWorkspace);
  return newWorkspace;
}

export async function getWorkspaces(): Promise<Workspace[]> {
  return db.workspaces.orderBy("updatedAt").reverse().toArray();
}

export async function getWorkspace(id: string): Promise<Workspace | undefined> {
  return db.workspaces.get(id);
}

export async function updateWorkspace(
  id: string,
  updates: Partial<Workspace>,
): Promise<Workspace> {
  const existing = await db.workspaces.get(id);
  if (!existing) throw new Error("Workspace not found");

  const updated: Workspace = {
    ...existing,
    ...updates,
    id, // Ensure ID cannot be changed
    updatedAt: Date.now(),
  };

  await db.workspaces.put(updated);
  return updated;
}

export async function deleteWorkspace(id: string): Promise<void> {
  // Delete all items in the workspace first
  await db.items.where("workspaceId").equals(id).delete();
  // Then delete the workspace
  await db.workspaces.delete(id);
}

// ============================================
// Item Operations
// ============================================

export async function createItem(
  item: Omit<WorkspaceItem, "id" | "createdAt" | "updatedAt">,
): Promise<WorkspaceItem> {
  const now = Date.now();
  const newItem: WorkspaceItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  await db.items.add(newItem);
  return newItem;
}

export async function getItem(id: string): Promise<WorkspaceItem | undefined> {
  return db.items.get(id);
}

export async function getItemsByWorkspace(
  workspaceId: string,
): Promise<WorkspaceItem[]> {
  return db.items.where("workspaceId").equals(workspaceId).toArray();
}

export async function getItemsByTool(
  toolSlug: string,
): Promise<WorkspaceItem[]> {
  return db.items.where("toolSlug").equals(toolSlug).toArray();
}

export async function updateItem(
  id: string,
  updates: Partial<WorkspaceItem>,
): Promise<WorkspaceItem> {
  const existing = await db.items.get(id);
  if (!existing) throw new Error("Item not found");

  const updated: WorkspaceItem = {
    ...existing,
    ...updates,
    id, // Ensure ID cannot be changed
    updatedAt: Date.now(),
  };

  await db.items.put(updated);
  return updated;
}

export async function deleteItem(id: string): Promise<void> {
  await db.items.delete(id);
}

// ============================================
// Utility Functions
// ============================================

export async function getAllItems(): Promise<WorkspaceItem[]> {
  return db.items.toArray();
}

export async function exportWorkspace(
  workspaceId: string,
): Promise<{ workspace: Workspace; items: WorkspaceItem[] }> {
  const workspace = await db.workspaces.get(workspaceId);
  if (!workspace) throw new Error("Workspace not found");

  const items = await db.items
    .where("workspaceId")
    .equals(workspaceId)
    .toArray();
  return { workspace, items };
}

export async function importWorkspace(data: {
  workspace: Workspace;
  items: WorkspaceItem[];
}): Promise<Workspace> {
  const newWorkspace = await createWorkspace({
    name: data.workspace.name,
    description: data.workspace.description,
    color: data.workspace.color,
  });

  for (const item of data.items) {
    await createItem({
      workspaceId: newWorkspace.id,
      toolSlug: item.toolSlug,
      name: item.name,
      data: item.data,
    });
  }

  return newWorkspace;
}

// ============================================
// Database Utilities
// ============================================

/**
 * Clear all data (for debugging/testing)
 */
export async function clearAllData(): Promise<void> {
  await db.items.clear();
  await db.workspaces.clear();
}

/**
 * Get database statistics
 */
export async function getDatabaseStats(): Promise<{
  workspaceCount: number;
  itemCount: number;
}> {
  const [workspaceCount, itemCount] = await Promise.all([
    db.workspaces.count(),
    db.items.count(),
  ]);
  return { workspaceCount, itemCount };
}
