"use client";

import { useState, useCallback, useRef } from "react";
import {
  type ImageSettings,
  type ThemeType,
  type BackgroundType,
  type LanguageType,
  type ExportFormat,
  defaultSettings,
} from "../lib/types";
import {
  downloadImage,
  copyImageToClipboard,
  detectLanguage,
} from "../lib/export";

export interface UseShareAsImageReturn {
  // State
  code: string;
  settings: ImageSettings;
  isExporting: boolean;
  isCopying: boolean;
  error: string | null;
  previewRef: React.RefObject<HTMLDivElement | null>;

  // Actions
  setCode: (code: string) => void;
  setTheme: (theme: ThemeType) => void;
  setBackground: (background: BackgroundType) => void;
  setLanguage: (language: LanguageType) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setPaddingX: (padding: number) => void;
  setPaddingY: (padding: number) => void;
  setBorderRadius: (radius: number) => void;
  setShowLineNumbers: (show: boolean) => void;
  setShowWindowControls: (show: boolean) => void;
  setWindowTitle: (title: string) => void;
  setWatermark: (show: boolean) => void;
  setScale: (scale: number) => void;
  resetSettings: () => void;
  exportImage: (format: ExportFormat) => Promise<void>;
  copyToClipboard: () => Promise<boolean>;
  getDetectedLanguage: () => string;
}

export function useShareAsImage(): UseShareAsImageReturn {
  const [code, setCode] = useState<string>("");
  const [settings, setSettings] = useState<ImageSettings>(defaultSettings);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const updateSetting = useCallback(
    <K extends keyof ImageSettings>(key: K, value: ImageSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setTheme = useCallback(
    (theme: ThemeType) => updateSetting("theme", theme),
    [updateSetting],
  );

  const setBackground = useCallback(
    (background: BackgroundType) => updateSetting("background", background),
    [updateSetting],
  );

  const setLanguage = useCallback(
    (language: LanguageType) => updateSetting("language", language),
    [updateSetting],
  );

  const setFontSize = useCallback(
    (size: number) => updateSetting("fontSize", size),
    [updateSetting],
  );

  const setLineHeight = useCallback(
    (height: number) => updateSetting("lineHeight", height),
    [updateSetting],
  );

  const setPaddingX = useCallback(
    (padding: number) => updateSetting("paddingX", padding),
    [updateSetting],
  );

  const setPaddingY = useCallback(
    (padding: number) => updateSetting("paddingY", padding),
    [updateSetting],
  );

  const setBorderRadius = useCallback(
    (radius: number) => updateSetting("borderRadius", radius),
    [updateSetting],
  );

  const setShowLineNumbers = useCallback(
    (show: boolean) => updateSetting("showLineNumbers", show),
    [updateSetting],
  );

  const setShowWindowControls = useCallback(
    (show: boolean) => updateSetting("showWindowControls", show),
    [updateSetting],
  );

  const setWindowTitle = useCallback(
    (title: string) => updateSetting("windowTitle", title),
    [updateSetting],
  );

  const setWatermark = useCallback(
    (show: boolean) => updateSetting("watermark", show),
    [updateSetting],
  );

  const setScale = useCallback(
    (scale: number) => updateSetting("scale", scale),
    [updateSetting],
  );

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const exportImage = useCallback(
    async (format: ExportFormat) => {
      if (!previewRef.current) {
        setError("Preview element not found");
        return;
      }

      setIsExporting(true);
      setError(null);

      try {
        await downloadImage(previewRef.current, {
          format,
          scale: settings.scale,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Export failed");
      } finally {
        setIsExporting(false);
      }
    },
    [settings.scale],
  );

  const copyToClipboard = useCallback(async (): Promise<boolean> => {
    if (!previewRef.current) {
      setError("Preview element not found");
      return false;
    }

    setIsCopying(true);
    setError(null);

    try {
      const success = await copyImageToClipboard(
        previewRef.current,
        settings.scale,
      );
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Copy failed");
      return false;
    } finally {
      setIsCopying(false);
    }
  }, [settings.scale]);

  const getDetectedLanguage = useCallback(() => {
    if (settings.language !== "auto") {
      return settings.language;
    }
    return detectLanguage(code);
  }, [code, settings.language]);

  return {
    code,
    settings,
    isExporting,
    isCopying,
    error,
    previewRef,
    setCode,
    setTheme,
    setBackground,
    setLanguage,
    setFontSize,
    setLineHeight,
    setPaddingX,
    setPaddingY,
    setBorderRadius,
    setShowLineNumbers,
    setShowWindowControls,
    setWindowTitle,
    setWatermark,
    setScale,
    resetSettings,
    exportImage,
    copyToClipboard,
    getDetectedLanguage,
  };
}
