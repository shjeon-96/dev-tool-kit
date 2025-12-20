"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLeadCapture } from "../model/use-lead-capture";
import { LeadCaptureModal } from "./lead-capture-modal";

interface LeadCaptureContextType {
  openModal: (toolSlug: string, onDownload: () => void) => void;
  hasInteracted: (toolSlug: string) => boolean;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | null>(null);

export function useLeadCaptureContext() {
  const context = useContext(LeadCaptureContext);
  if (!context) {
    throw new Error(
      "useLeadCaptureContext must be used within a LeadCaptureProvider",
    );
  }
  return context;
}

interface LeadCaptureProviderProps {
  children: ReactNode;
}

export function LeadCaptureProvider({ children }: LeadCaptureProviderProps) {
  const {
    isOpen,
    toolSlug,
    isSubmitting,
    error,
    openModal,
    closeModal,
    submitEmail,
    hasInteracted,
  } = useLeadCapture();

  return (
    <LeadCaptureContext.Provider value={{ openModal, hasInteracted }}>
      {children}
      <LeadCaptureModal
        isOpen={isOpen}
        toolSlug={toolSlug}
        isSubmitting={isSubmitting}
        error={error}
        onClose={closeModal}
        onSubmit={submitEmail}
      />
    </LeadCaptureContext.Provider>
  );
}
