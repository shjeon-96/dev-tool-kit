"use client";

import { useState, useCallback, useRef } from "react";
import type QRCodeType from "qrcode";
import { useFeatureAccess } from "@/entities/subscription";
import { BULK_LIMITS } from "../../model/bulk-limits";

export interface QRBulkItem {
  id: string;
  content: string;
  label: string;
  status: "pending" | "processing" | "success" | "error";
  dataUrl: string | null;
  error?: string;
}

export interface QRBulkOptions {
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  format: "png" | "svg";
}

export function useQrBulk() {
  const { tier, isPro, canAccessBulkActions } = useFeatureAccess();
  const limits = BULK_LIMITS[tier].qrGenerator;

  const [items, setItems] = useState<QRBulkItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<QRBulkOptions>({
    size: 300,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    errorCorrectionLevel: "M",
    format: "png",
  });

  const qrCodeRef = useRef<typeof QRCodeType | null>(null);

  const stats = {
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    success: items.filter((i) => i.status === "success").length,
    error: items.filter((i) => i.status === "error").length,
    remaining:
      items.filter((i) => i.status === "pending").length +
      items.filter((i) => i.status === "processing").length,
  };

  const addItem = useCallback(
    (content: string, label?: string): { success: boolean; error?: string } => {
      if (!canAccessBulkActions) {
        return {
          success: false,
          error: "Upgrade to Pro to access bulk actions",
        };
      }

      if (items.length >= limits.maxItems) {
        return {
          success: false,
          error: `Maximum ${limits.maxItems} items allowed. Upgrade to Pro for more.`,
        };
      }

      const newItem: QRBulkItem = {
        id: `qr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: content.trim(),
        label: label?.trim() || content.trim().slice(0, 30),
        status: "pending",
        dataUrl: null,
      };

      setItems((prev) => [...prev, newItem]);
      return { success: true };
    },
    [items.length, limits.maxItems, canAccessBulkActions],
  );

  const addMultipleItems = useCallback(
    (lines: string[]): { success: boolean; added: number; error?: string } => {
      if (!canAccessBulkActions) {
        return {
          success: false,
          added: 0,
          error: "Upgrade to Pro to access bulk actions",
        };
      }

      const availableSlots = limits.maxItems - items.length;
      if (availableSlots <= 0) {
        return {
          success: false,
          added: 0,
          error: `Maximum ${limits.maxItems} items allowed.`,
        };
      }

      const validLines = lines.filter((line) => line.trim().length > 0);
      const linesToAdd = validLines.slice(0, availableSlots);

      const newItems: QRBulkItem[] = linesToAdd.map((line, index) => ({
        id: `qr-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        content: line.trim(),
        label: line.trim().slice(0, 30),
        status: "pending",
        dataUrl: null,
      }));

      setItems((prev) => [...prev, ...newItems]);

      return {
        success: true,
        added: newItems.length,
        error:
          validLines.length > availableSlots
            ? `Only ${availableSlots} items added. Upgrade to Pro for more.`
            : undefined,
      };
    },
    [items.length, limits.maxItems, canAccessBulkActions],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    setProgress(0);
  }, []);

  const updateOptions = useCallback((updates: Partial<QRBulkOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  const processAll = useCallback(async () => {
    const pendingItems = items.filter((i) => i.status === "pending");
    if (pendingItems.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      // Dynamic import QRCode library
      if (!qrCodeRef.current) {
        const QRCodeModule = await import("qrcode");
        qrCodeRef.current = QRCodeModule.default;
      }

      const totalItems = pendingItems.length;
      let processed = 0;

      for (const item of pendingItems) {
        // Mark as processing
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: "processing" } : i,
          ),
        );

        try {
          const dataUrl = await qrCodeRef.current.toDataURL(item.content, {
            width: options.size,
            margin: 2,
            color: {
              dark: options.foregroundColor,
              light: options.backgroundColor,
            },
            errorCorrectionLevel: options.errorCorrectionLevel,
          });

          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id ? { ...i, status: "success", dataUrl } : i,
            ),
          );
        } catch (err) {
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    status: "error",
                    error:
                      err instanceof Error
                        ? err.message
                        : "Failed to generate QR",
                  }
                : i,
            ),
          );
        }

        processed++;
        setProgress(Math.round((processed / totalItems) * 100));
      }
    } finally {
      setIsProcessing(false);
    }
  }, [items, options]);

  const downloadItem = useCallback(
    async (item: QRBulkItem) => {
      if (!item.dataUrl) return;

      if (options.format === "png") {
        const link = document.createElement("a");
        link.href = item.dataUrl;
        link.download = `${item.label.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
        link.click();
      } else {
        // SVG format
        if (!qrCodeRef.current) {
          const QRCodeModule = await import("qrcode");
          qrCodeRef.current = QRCodeModule.default;
        }

        const svg = await qrCodeRef.current.toString(item.content, {
          type: "svg",
          width: options.size,
          margin: 2,
          color: {
            dark: options.foregroundColor,
            light: options.backgroundColor,
          },
          errorCorrectionLevel: options.errorCorrectionLevel,
        });

        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${item.label.replace(/[^a-zA-Z0-9]/g, "_")}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      }
    },
    [options],
  );

  const downloadAll = useCallback(async () => {
    const successItems = items.filter(
      (i) => i.status === "success" && i.dataUrl,
    );
    if (successItems.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    if (options.format === "png") {
      // Download as PNG
      for (const item of successItems) {
        if (item.dataUrl) {
          const base64Data = item.dataUrl.split(",")[1];
          const filename = `${item.label.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
          zip.file(filename, base64Data, { base64: true });
        }
      }
    } else {
      // Download as SVG
      if (!qrCodeRef.current) {
        const QRCodeModule = await import("qrcode");
        qrCodeRef.current = QRCodeModule.default;
      }

      for (const item of successItems) {
        const svg = await qrCodeRef.current.toString(item.content, {
          type: "svg",
          width: options.size,
          margin: 2,
          color: {
            dark: options.foregroundColor,
            light: options.backgroundColor,
          },
          errorCorrectionLevel: options.errorCorrectionLevel,
        });
        const filename = `${item.label.replace(/[^a-zA-Z0-9]/g, "_")}.svg`;
        zip.file(filename, svg);
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-codes-${Date.now()}.zip`;
    link.click();
    URL.revokeObjectURL(url);
  }, [items, options]);

  const copyToClipboard = useCallback(
    async (dataUrl: string): Promise<boolean> => {
      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  return {
    items,
    options,
    isProcessing,
    progress,
    stats,
    limits,
    isPro,
    addItem,
    addMultipleItems,
    removeItem,
    clearAll,
    updateOptions,
    processAll,
    downloadItem,
    downloadAll,
    copyToClipboard,
  };
}
