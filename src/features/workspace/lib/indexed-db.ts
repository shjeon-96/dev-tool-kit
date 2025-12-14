const DB_NAME = "web-toolkit-workspaces";
const DB_VERSION = 1;

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

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Workspaces store
      if (!db.objectStoreNames.contains("workspaces")) {
        const workspaceStore = db.createObjectStore("workspaces", {
          keyPath: "id",
        });
        workspaceStore.createIndex("name", "name", { unique: false });
        workspaceStore.createIndex("updatedAt", "updatedAt", { unique: false });
      }

      // Items store
      if (!db.objectStoreNames.contains("items")) {
        const itemStore = db.createObjectStore("items", { keyPath: "id" });
        itemStore.createIndex("workspaceId", "workspaceId", { unique: false });
        itemStore.createIndex("toolSlug", "toolSlug", { unique: false });
        itemStore.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };
  });

  return dbPromise;
}

// Workspace operations
export async function createWorkspace(
  workspace: Omit<Workspace, "id" | "createdAt" | "updatedAt">,
): Promise<Workspace> {
  const db = await openDB();
  const now = Date.now();
  const newWorkspace: Workspace = {
    ...workspace,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("workspaces", "readwrite");
    const store = transaction.objectStore("workspaces");
    const request = store.add(newWorkspace);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(newWorkspace);
  });
}

export async function getWorkspaces(): Promise<Workspace[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("workspaces", "readonly");
    const store = transaction.objectStore("workspaces");
    const index = store.index("updatedAt");
    const request = index.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result.reverse());
  });
}

export async function getWorkspace(id: string): Promise<Workspace | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("workspaces", "readonly");
    const store = transaction.objectStore("workspaces");
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function updateWorkspace(
  id: string,
  updates: Partial<Workspace>,
): Promise<Workspace> {
  const db = await openDB();
  const existing = await getWorkspace(id);
  if (!existing) throw new Error("Workspace not found");

  const updated: Workspace = {
    ...existing,
    ...updates,
    id, // Ensure ID cannot be changed
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("workspaces", "readwrite");
    const store = transaction.objectStore("workspaces");
    const request = store.put(updated);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(updated);
  });
}

export async function deleteWorkspace(id: string): Promise<void> {
  const db = await openDB();

  // First delete all items in the workspace
  const items = await getItemsByWorkspace(id);
  for (const item of items) {
    await deleteItem(item.id);
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("workspaces", "readwrite");
    const store = transaction.objectStore("workspaces");
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Item operations
export async function createItem(
  item: Omit<WorkspaceItem, "id" | "createdAt" | "updatedAt">,
): Promise<WorkspaceItem> {
  const db = await openDB();
  const now = Date.now();
  const newItem: WorkspaceItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("items", "readwrite");
    const store = transaction.objectStore("items");
    const request = store.add(newItem);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(newItem);
  });
}

export async function getItem(id: string): Promise<WorkspaceItem | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("items", "readonly");
    const store = transaction.objectStore("items");
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getItemsByWorkspace(
  workspaceId: string,
): Promise<WorkspaceItem[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("items", "readonly");
    const store = transaction.objectStore("items");
    const index = store.index("workspaceId");
    const request = index.getAll(workspaceId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getItemsByTool(
  toolSlug: string,
): Promise<WorkspaceItem[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("items", "readonly");
    const store = transaction.objectStore("items");
    const index = store.index("toolSlug");
    const request = index.getAll(toolSlug);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function updateItem(
  id: string,
  updates: Partial<WorkspaceItem>,
): Promise<WorkspaceItem> {
  const db = await openDB();
  const existing = await getItem(id);
  if (!existing) throw new Error("Item not found");

  const updated: WorkspaceItem = {
    ...existing,
    ...updates,
    id, // Ensure ID cannot be changed
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("items", "readwrite");
    const store = transaction.objectStore("items");
    const request = store.put(updated);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(updated);
  });
}

export async function deleteItem(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("items", "readwrite");
    const store = transaction.objectStore("items");
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Utility functions
export async function getAllItems(): Promise<WorkspaceItem[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("items", "readonly");
    const store = transaction.objectStore("items");
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function exportWorkspace(
  workspaceId: string,
): Promise<{ workspace: Workspace; items: WorkspaceItem[] }> {
  const workspace = await getWorkspace(workspaceId);
  if (!workspace) throw new Error("Workspace not found");

  const items = await getItemsByWorkspace(workspaceId);
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
