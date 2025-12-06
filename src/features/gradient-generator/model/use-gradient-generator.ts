"use client";

import { useState, useCallback, useMemo } from "react";

export type GradientType = "linear" | "radial" | "conic";

export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

const generateId = () => Math.random().toString(36).substring(7);

export function useGradientGenerator() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: generateId(), color: "#667eea", position: 0 },
    { id: generateId(), color: "#764ba2", position: 100 },
  ]);

  const cssValue = useMemo(() => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    switch (type) {
      case "linear":
        return `linear-gradient(${angle}deg, ${stops})`;
      case "radial":
        return `radial-gradient(circle, ${stops})`;
      case "conic":
        return `conic-gradient(from ${angle}deg, ${stops})`;
    }
  }, [type, angle, colorStops]);

  const cssCode = useMemo(() => {
    return `background: ${cssValue};`;
  }, [cssValue]);

  const addColorStop = useCallback(() => {
    const lastPosition = Math.max(...colorStops.map((s) => s.position), 0);
    const newPosition = Math.min(lastPosition + 25, 100);
    setColorStops((prev) => [
      ...prev,
      { id: generateId(), color: "#ffffff", position: newPosition },
    ]);
  }, [colorStops]);

  const removeColorStop = useCallback((id: string) => {
    setColorStops((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const updateColorStop = useCallback(
    (id: string, updates: Partial<Omit<ColorStop, "id">>) => {
      setColorStops((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const resetGradient = useCallback(() => {
    setType("linear");
    setAngle(90);
    setColorStops([
      { id: generateId(), color: "#667eea", position: 0 },
      { id: generateId(), color: "#764ba2", position: 100 },
    ]);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const presets = useMemo(
    () => [
      {
        name: "Sunset",
        stops: [
          { color: "#f093fb", position: 0 },
          { color: "#f5576c", position: 100 },
        ],
      },
      {
        name: "Ocean",
        stops: [
          { color: "#667eea", position: 0 },
          { color: "#764ba2", position: 100 },
        ],
      },
      {
        name: "Forest",
        stops: [
          { color: "#11998e", position: 0 },
          { color: "#38ef7d", position: 100 },
        ],
      },
      {
        name: "Fire",
        stops: [
          { color: "#f12711", position: 0 },
          { color: "#f5af19", position: 100 },
        ],
      },
      {
        name: "Rainbow",
        stops: [
          { color: "#ff0000", position: 0 },
          { color: "#ff7f00", position: 17 },
          { color: "#ffff00", position: 33 },
          { color: "#00ff00", position: 50 },
          { color: "#0000ff", position: 67 },
          { color: "#4b0082", position: 83 },
          { color: "#9400d3", position: 100 },
        ],
      },
    ],
    []
  );

  const applyPreset = useCallback(
    (preset: (typeof presets)[0]) => {
      setColorStops(preset.stops.map((s) => ({ ...s, id: generateId() })));
    },
    []
  );

  return {
    type,
    setType,
    angle,
    setAngle,
    colorStops,
    cssValue,
    cssCode,
    addColorStop,
    removeColorStop,
    updateColorStop,
    resetGradient,
    copyToClipboard,
    presets,
    applyPreset,
  };
}
