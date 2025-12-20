"use client";

import { useState, useCallback, useEffect } from "react";
import { useFeatureAccess } from "@/entities/subscription";
import { useAuth } from "@/features/auth";
import type { ApiKey, ApiKeyCreateInput } from "./types";
import {
  generateApiKey,
  maskApiKey,
  calculateExpirationDate,
} from "../lib/api-key-utils";

const STORAGE_KEY = "wtk_api_keys";

// In production, this would be stored in a database
// For now, we use localStorage for demonstration
function loadKeysFromStorage(): ApiKey[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((key: ApiKey) => ({
      ...key,
      createdAt: new Date(key.createdAt),
      lastUsedAt: key.lastUsedAt ? new Date(key.lastUsedAt) : null,
      expiresAt: key.expiresAt ? new Date(key.expiresAt) : null,
    }));
  } catch {
    return [];
  }
}

function saveKeysToStorage(keys: ApiKey[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

export function useApiKeys() {
  const { isPro, canAccessApi } = useFeatureAccess();
  const { user } = useAuth();

  const [keys, setKeys] = useState<ApiKey[]>(() => loadKeysFromStorage());
  const [isLoading, setIsLoading] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

  // Save keys when changed
  useEffect(() => {
    if (!isLoading) {
      saveKeysToStorage(keys);
    }
  }, [keys, isLoading]);

  const createKey = useCallback(
    (
      input: ApiKeyCreateInput,
    ): { success: boolean; key?: string; error?: string } => {
      if (!canAccessApi) {
        return {
          success: false,
          error: "API access requires Pro subscription",
        };
      }

      if (!user) {
        return {
          success: false,
          error: "You must be logged in to create API keys",
        };
      }

      // Limit to 5 API keys per user
      if (keys.length >= 5) {
        return {
          success: false,
          error: "Maximum 5 API keys allowed",
        };
      }

      const rawKey = generateApiKey();
      const newKey: ApiKey = {
        id: `key_${Date.now()}`,
        name: input.name,
        key: rawKey,
        maskedKey: maskApiKey(rawKey),
        createdAt: new Date(),
        lastUsedAt: null,
        expiresAt: calculateExpirationDate(input.expiresIn || "never"),
        usageCount: 0,
        isActive: true,
      };

      setKeys((prev) => [...prev, { ...newKey, key: "" }]); // Don't store raw key
      setNewlyCreatedKey(rawKey);

      return { success: true, key: rawKey };
    },
    [canAccessApi, user, keys.length],
  );

  const revokeKey = useCallback((keyId: string): boolean => {
    setKeys((prev) =>
      prev.map((key) => (key.id === keyId ? { ...key, isActive: false } : key)),
    );
    return true;
  }, []);

  const deleteKey = useCallback((keyId: string): boolean => {
    setKeys((prev) => prev.filter((key) => key.id !== keyId));
    return true;
  }, []);

  const renameKey = useCallback((keyId: string, newName: string): boolean => {
    setKeys((prev) =>
      prev.map((key) => (key.id === keyId ? { ...key, name: newName } : key)),
    );
    return true;
  }, []);

  const clearNewlyCreatedKey = useCallback(() => {
    setNewlyCreatedKey(null);
  }, []);

  return {
    keys,
    isLoading,
    isPro,
    canAccessApi,
    newlyCreatedKey,
    createKey,
    revokeKey,
    deleteKey,
    renameKey,
    clearNewlyCreatedKey,
  };
}
