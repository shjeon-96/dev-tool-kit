"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSmartPaste } from "../model/use-smart-paste";
import { SmartPasteNotification } from "./smart-paste-notification";
import type { DetectionResult } from "../model/detector";

interface SmartPasteContextValue {
  isActive: boolean;
  detection: DetectionResult | null;
  navigateToTool: (tool: string) => void;
}

const SmartPasteContext = createContext<SmartPasteContextValue | null>(null);

export function useSmartPasteContext() {
  const context = useContext(SmartPasteContext);
  if (!context) {
    throw new Error(
      "useSmartPasteContext must be used within SmartPasteProvider",
    );
  }
  return context;
}

interface SmartPasteProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

export function SmartPasteProvider({
  children,
  enabled = true,
}: SmartPasteProviderProps) {
  const {
    isActive,
    detection,
    showNotification,
    navigateToTool,
    hideNotification,
  } = useSmartPaste({ enabled });

  return (
    <SmartPasteContext.Provider
      value={{
        isActive,
        detection,
        navigateToTool,
      }}
    >
      {children}
      <SmartPasteNotification
        show={showNotification}
        detection={detection}
        onNavigate={navigateToTool}
        onDismiss={hideNotification}
      />
    </SmartPasteContext.Provider>
  );
}
