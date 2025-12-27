"use client";

import { useState, useCallback } from "react";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import { ulid } from "ulid";
import { useQuota } from "@/features/quota";

export type IdType = "uuid-v1" | "uuid-v4" | "ulid";

export interface GeneratorOptions {
  type: IdType;
  count: number;
  uppercase: boolean;
  noDashes: boolean;
}

export function useUuidGenerator() {
  const { trackUsage } = useQuota("uuid-generator");
  const [options, setOptions] = useState<GeneratorOptions>({
    type: "uuid-v4",
    count: 1,
    uppercase: false,
    noDashes: false,
  });
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  const generateId = useCallback((type: IdType): string => {
    switch (type) {
      case "uuid-v1":
        return uuidv1();
      case "uuid-v4":
        return uuidv4();
      case "ulid":
        return ulid();
      default:
        return uuidv4();
    }
  }, []);

  const formatId = useCallback(
    (id: string): string => {
      let result = id;
      if (options.noDashes) {
        result = result.replace(/-/g, "");
      }
      if (options.uppercase) {
        result = result.toUpperCase();
      }
      return result;
    },
    [options.noDashes, options.uppercase],
  );

  const handleGenerate = useCallback(() => {
    const ids: string[] = [];
    for (let i = 0; i < options.count; i++) {
      const id = generateId(options.type);
      ids.push(formatId(id));
    }
    setGeneratedIds(ids);
    trackUsage();
  }, [options.count, options.type, generateId, formatId, trackUsage]);

  const updateOptions = useCallback((updates: Partial<GeneratorOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const copyAllToClipboard = useCallback(async () => {
    const text = generatedIds.join("\n");
    return copyToClipboard(text);
  }, [generatedIds, copyToClipboard]);

  const handleClear = useCallback(() => {
    setGeneratedIds([]);
  }, []);

  return {
    options,
    generatedIds,
    updateOptions,
    handleGenerate,
    copyToClipboard,
    copyAllToClipboard,
    handleClear,
  };
}
