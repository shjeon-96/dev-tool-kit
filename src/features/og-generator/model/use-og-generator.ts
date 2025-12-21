/**
 * OG Generator State Management Hook
 */

import { useState, useCallback, useRef } from "react";
import type { OGImageConfig, TemplateType, FontFamily } from "../lib/types";
import { DEFAULT_OG_CONFIG, TEMPLATES } from "../lib/types";
import { renderToDataURL, downloadImage } from "../lib/render";

interface OGGeneratorState {
  config: OGImageConfig;
  previewUrl: string | null;
  isRendering: boolean;
  error: string | null;
  lastRenderTime: number | null;
}

interface UseOGGeneratorReturn {
  // State
  config: OGImageConfig;
  previewUrl: string | null;
  isRendering: boolean;
  error: string | null;
  lastRenderTime: number | null;

  // Config setters
  setConfig: (config: Partial<OGImageConfig>) => void;
  setTemplate: (template: TemplateType) => void;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setAuthor: (author: string) => void;
  setSiteName: (siteName: string) => void;
  setBackgroundColor: (color: string) => void;
  setGradient: (from: string, to: string) => void;
  setTextColor: (color: string) => void;
  setFontFamily: (fontFamily: FontFamily) => void;
  setTitleFontSize: (size: number) => void;
  setDimensions: (width: number, height: number) => void;

  // Actions
  renderPreview: () => Promise<void>;
  downloadPNG: (filename?: string) => Promise<void>;
  reset: () => void;
}

export function useOGGenerator(): UseOGGeneratorReturn {
  const [state, setState] = useState<OGGeneratorState>({
    config: DEFAULT_OG_CONFIG,
    previewUrl: null,
    isRendering: false,
    error: null,
    lastRenderTime: null,
  });

  // Debounce timer ref
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update config helper
  const setConfig = useCallback((updates: Partial<OGImageConfig>) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...updates },
      error: null,
    }));
  }, []);

  // Template setter (applies template defaults)
  const setTemplate = useCallback((template: TemplateType) => {
    const templateConfig = TEMPLATES.find((t) => t.id === template);
    if (templateConfig) {
      setState((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          ...templateConfig.defaultConfig,
          template,
        },
        error: null,
      }));
    }
  }, []);

  // Individual setters
  const setTitle = useCallback(
    (title: string) => setConfig({ title }),
    [setConfig],
  );
  const setSubtitle = useCallback(
    (subtitle: string) => setConfig({ subtitle }),
    [setConfig],
  );
  const setAuthor = useCallback(
    (author: string) => setConfig({ author }),
    [setConfig],
  );
  const setSiteName = useCallback(
    (siteName: string) => setConfig({ siteName }),
    [setConfig],
  );
  const setBackgroundColor = useCallback(
    (backgroundColor: string) => setConfig({ backgroundColor }),
    [setConfig],
  );
  const setGradient = useCallback(
    (gradientFrom: string, gradientTo: string) =>
      setConfig({ gradientFrom, gradientTo }),
    [setConfig],
  );
  const setTextColor = useCallback(
    (textColor: string) => setConfig({ textColor }),
    [setConfig],
  );
  const setFontFamily = useCallback(
    (fontFamily: FontFamily) => setConfig({ fontFamily }),
    [setConfig],
  );
  const setTitleFontSize = useCallback(
    (titleFontSize: number) => setConfig({ titleFontSize }),
    [setConfig],
  );
  const setDimensions = useCallback(
    (width: number, height: number) => setConfig({ width, height }),
    [setConfig],
  );

  // Render preview
  const renderPreview = useCallback(async () => {
    // Cancel any pending render
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    setState((prev) => ({ ...prev, isRendering: true, error: null }));

    try {
      const startTime = performance.now();
      const dataUrl = await renderToDataURL(state.config);
      const endTime = performance.now();

      setState((prev) => ({
        ...prev,
        previewUrl: dataUrl,
        isRendering: false,
        lastRenderTime: endTime - startTime,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isRendering: false,
        error: error instanceof Error ? error.message : "Rendering failed",
      }));
    }
  }, [state.config]);

  // Download PNG
  const downloadPNG = useCallback(
    async (filename?: string) => {
      setState((prev) => ({ ...prev, isRendering: true, error: null }));

      try {
        const dataUrl = await renderToDataURL(state.config);
        const name =
          filename ||
          `og-image-${state.config.width}x${state.config.height}.png`;
        downloadImage(dataUrl, name);

        setState((prev) => ({ ...prev, isRendering: false }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isRendering: false,
          error: error instanceof Error ? error.message : "Download failed",
        }));
      }
    },
    [state.config],
  );

  // Reset to defaults
  const reset = useCallback(() => {
    setState({
      config: DEFAULT_OG_CONFIG,
      previewUrl: null,
      isRendering: false,
      error: null,
      lastRenderTime: null,
    });
  }, []);

  return {
    config: state.config,
    previewUrl: state.previewUrl,
    isRendering: state.isRendering,
    error: state.error,
    lastRenderTime: state.lastRenderTime,
    setConfig,
    setTemplate,
    setTitle,
    setSubtitle,
    setAuthor,
    setSiteName,
    setBackgroundColor,
    setGradient,
    setTextColor,
    setFontFamily,
    setTitleFontSize,
    setDimensions,
    renderPreview,
    downloadPNG,
    reset,
  };
}
