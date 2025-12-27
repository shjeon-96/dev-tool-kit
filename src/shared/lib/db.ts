import Dexie, { type EntityTable } from "dexie";
import type { ToolSlug } from "@/shared/types/tool";

// ============================================
// Workspace Database Schema (Dexie.js)
// ============================================

/**
 * 워크스페이스 엔티티
 */
export interface Workspace {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 워크스페이스 아이템 엔티티
 */
export interface WorkspaceItem {
  id: string;
  workspaceId: string;
  toolSlug: ToolSlug;
  name: string;
  data: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI 설정 (암호화 전 Plain Text - MVP)
 * TODO: Web Crypto API를 통한 암호화 저장
 */
export interface AIConfig {
  id: string;
  provider: "openai" | "anthropic" | "google";
  apiKey: string;
  model: string;
  updatedAt: Date;
}

/**
 * DevToolkit 데이터베이스 클래스
 */
class DevToolkitDB extends Dexie {
  workspaces!: EntityTable<Workspace, "id">;
  workspaceItems!: EntityTable<WorkspaceItem, "id">;
  aiConfigs!: EntityTable<AIConfig, "id">;

  constructor() {
    super("devtoolkit");

    // Schema Version 1
    this.version(1).stores({
      workspaces: "id, name, createdAt, updatedAt",
      workspaceItems: "id, workspaceId, toolSlug, createdAt, updatedAt",
      aiConfigs: "id, provider, updatedAt",
    });
  }
}

// 싱글톤 인스턴스
export const db = new DevToolkitDB();

// ============================================
// Workspace CRUD Functions
// ============================================

/**
 * 새 워크스페이스 생성
 */
export async function createWorkspace(
  name: string,
  color: string,
): Promise<Workspace> {
  const now = new Date();
  const workspace: Workspace = {
    id: crypto.randomUUID(),
    name,
    color,
    createdAt: now,
    updatedAt: now,
  };

  await db.workspaces.add(workspace);
  return workspace;
}

/**
 * 모든 워크스페이스 조회
 */
export async function getAllWorkspaces(): Promise<Workspace[]> {
  return db.workspaces.orderBy("createdAt").reverse().toArray();
}

/**
 * 워크스페이스 업데이트
 */
export async function updateWorkspace(
  id: string,
  updates: Partial<Pick<Workspace, "name" | "color">>,
): Promise<void> {
  await db.workspaces.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
}

/**
 * 워크스페이스 삭제 (관련 아이템도 함께 삭제)
 */
export async function deleteWorkspace(id: string): Promise<void> {
  await db.transaction("rw", [db.workspaces, db.workspaceItems], async () => {
    await db.workspaceItems.where("workspaceId").equals(id).delete();
    await db.workspaces.delete(id);
  });
}

// ============================================
// WorkspaceItem CRUD Functions
// ============================================

/**
 * 워크스페이스에 아이템 추가
 */
export async function addWorkspaceItem(
  workspaceId: string,
  toolSlug: ToolSlug,
  name: string,
  data: string,
): Promise<WorkspaceItem> {
  const now = new Date();
  const item: WorkspaceItem = {
    id: crypto.randomUUID(),
    workspaceId,
    toolSlug,
    name,
    data,
    createdAt: now,
    updatedAt: now,
  };

  await db.workspaceItems.add(item);
  return item;
}

/**
 * 워크스페이스의 모든 아이템 조회
 */
export async function getWorkspaceItems(
  workspaceId: string,
): Promise<WorkspaceItem[]> {
  return db.workspaceItems
    .where("workspaceId")
    .equals(workspaceId)
    .reverse()
    .sortBy("createdAt");
}

/**
 * 아이템 업데이트
 */
export async function updateWorkspaceItem(
  id: string,
  updates: Partial<Pick<WorkspaceItem, "name" | "data">>,
): Promise<void> {
  await db.workspaceItems.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
}

/**
 * 아이템 삭제
 */
export async function deleteWorkspaceItem(id: string): Promise<void> {
  await db.workspaceItems.delete(id);
}

// ============================================
// AI Config Functions
// ============================================

/**
 * AI 설정 저장/업데이트
 */
export async function saveAIConfig(
  provider: AIConfig["provider"],
  apiKey: string,
  model: string,
): Promise<AIConfig> {
  const existing = await db.aiConfigs
    .where("provider")
    .equals(provider)
    .first();

  const config: AIConfig = {
    id: existing?.id ?? crypto.randomUUID(),
    provider,
    apiKey,
    model,
    updatedAt: new Date(),
  };

  await db.aiConfigs.put(config);
  return config;
}

/**
 * AI 설정 조회
 */
export async function getAIConfig(
  provider: AIConfig["provider"],
): Promise<AIConfig | undefined> {
  return db.aiConfigs.where("provider").equals(provider).first();
}

/**
 * 모든 AI 설정 조회
 */
export async function getAllAIConfigs(): Promise<AIConfig[]> {
  return db.aiConfigs.toArray();
}

/**
 * AI 설정 삭제
 */
export async function deleteAIConfig(
  provider: AIConfig["provider"],
): Promise<void> {
  await db.aiConfigs.where("provider").equals(provider).delete();
}
