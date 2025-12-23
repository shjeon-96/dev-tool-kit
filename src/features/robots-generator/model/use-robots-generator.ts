"use client";

import { useState, useCallback, useMemo } from "react";
import type { RobotsConfig, RuleType } from "../lib/types";
import {
  createDefaultConfig,
  createEmptyUserAgent,
  createEmptyRule,
} from "../lib/types";
import {
  generateRobotsTxt,
  parseRobotsTxt,
  SAMPLE_ROBOTS_TXT,
} from "../lib/generator";

export function useRobotsGenerator() {
  const [config, setConfig] = useState<RobotsConfig>(createDefaultConfig);
  const [importText, setImportText] = useState("");

  const output = useMemo(() => generateRobotsTxt(config), [config]);

  const addUserAgent = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      userAgents: [...prev.userAgents, createEmptyUserAgent()],
    }));
  }, []);

  const removeUserAgent = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      userAgents: prev.userAgents.filter((ua) => ua.id !== id),
    }));
  }, []);

  const updateUserAgent = useCallback((id: string, userAgent: string) => {
    setConfig((prev) => ({
      ...prev,
      userAgents: prev.userAgents.map((ua) =>
        ua.id === id ? { ...ua, userAgent } : ua,
      ),
    }));
  }, []);

  const addRule = useCallback(
    (userAgentId: string, type: RuleType = "allow") => {
      setConfig((prev) => ({
        ...prev,
        userAgents: prev.userAgents.map((ua) =>
          ua.id === userAgentId
            ? { ...ua, rules: [...ua.rules, createEmptyRule(type)] }
            : ua,
        ),
      }));
    },
    [],
  );

  const removeRule = useCallback((userAgentId: string, ruleId: string) => {
    setConfig((prev) => ({
      ...prev,
      userAgents: prev.userAgents.map((ua) =>
        ua.id === userAgentId
          ? { ...ua, rules: ua.rules.filter((r) => r.id !== ruleId) }
          : ua,
      ),
    }));
  }, []);

  const updateRule = useCallback(
    (
      userAgentId: string,
      ruleId: string,
      updates: { type?: RuleType; path?: string },
    ) => {
      setConfig((prev) => ({
        ...prev,
        userAgents: prev.userAgents.map((ua) =>
          ua.id === userAgentId
            ? {
                ...ua,
                rules: ua.rules.map((r) =>
                  r.id === ruleId ? { ...r, ...updates } : r,
                ),
              }
            : ua,
        ),
      }));
    },
    [],
  );

  const setSitemapUrl = useCallback((sitemapUrl: string) => {
    setConfig((prev) => ({ ...prev, sitemapUrl }));
  }, []);

  const setCrawlDelay = useCallback((crawlDelay: number | undefined) => {
    setConfig((prev) => ({ ...prev, crawlDelay }));
  }, []);

  const loadSample = useCallback(() => {
    const parsed = parseRobotsTxt(SAMPLE_ROBOTS_TXT);
    setConfig(parsed);
  }, []);

  const reset = useCallback(() => {
    setConfig(createDefaultConfig());
  }, []);

  const importFromText = useCallback(() => {
    if (importText.trim()) {
      const parsed = parseRobotsTxt(importText);
      setConfig(parsed);
      setImportText("");
    }
  }, [importText]);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(output);
  }, [output]);

  const downloadFile = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return {
    config,
    output,
    importText,
    setImportText,
    addUserAgent,
    removeUserAgent,
    updateUserAgent,
    addRule,
    removeRule,
    updateRule,
    setSitemapUrl,
    setCrawlDelay,
    loadSample,
    reset,
    importFromText,
    copyToClipboard,
    downloadFile,
  };
}
