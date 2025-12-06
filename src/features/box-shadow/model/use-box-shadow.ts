"use client";

import { useState, useCallback, useMemo } from "react";

export interface BoxShadowConfig {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const defaultShadow: BoxShadowConfig = {
  offsetX: 5,
  offsetY: 5,
  blur: 15,
  spread: 0,
  color: "#000000",
  opacity: 25,
  inset: false,
};

export function useBoxShadow() {
  const [shadows, setShadows] = useState<BoxShadowConfig[]>([defaultShadow]);
  const [boxColor, setBoxColor] = useState("#ffffff");
  const [boxRadius, setBoxRadius] = useState(8);

  const hexToRgba = useCallback((hex: string, opacity: number): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0,0,0,${opacity / 100})`;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r},${g},${b},${opacity / 100})`;
  }, []);

  const cssValue = useMemo(() => {
    return shadows
      .map((s) => {
        const inset = s.inset ? "inset " : "";
        const rgba = hexToRgba(s.color, s.opacity);
        return `${inset}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${rgba}`;
      })
      .join(", ");
  }, [shadows, hexToRgba]);

  const cssCode = useMemo(() => {
    return `box-shadow: ${cssValue};`;
  }, [cssValue]);

  const updateShadow = useCallback(
    (index: number, updates: Partial<BoxShadowConfig>) => {
      setShadows((prev) =>
        prev.map((s, i) => (i === index ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const addShadow = useCallback(() => {
    setShadows((prev) => [...prev, { ...defaultShadow }]);
  }, []);

  const removeShadow = useCallback((index: number) => {
    setShadows((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const resetShadows = useCallback(() => {
    setShadows([defaultShadow]);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    shadows,
    boxColor,
    setBoxColor,
    boxRadius,
    setBoxRadius,
    cssValue,
    cssCode,
    updateShadow,
    addShadow,
    removeShadow,
    resetShadows,
    copyToClipboard,
  };
}
