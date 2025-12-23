"use client";

import { useState, useCallback, useMemo } from "react";
import type { SerpData, DeviceType } from "../lib/types";
import { SAMPLE_DATA } from "../lib/types";
import { analyzeSerpData } from "../lib/analyzer";

export function useSerpPreview() {
  const [data, setData] = useState<SerpData>({
    url: "",
    title: "",
    description: "",
  });
  const [device, setDevice] = useState<DeviceType>("desktop");

  const analysis = useMemo(() => analyzeSerpData(data, device), [data, device]);

  const updateUrl = useCallback((url: string) => {
    setData((prev) => ({ ...prev, url }));
  }, []);

  const updateTitle = useCallback((title: string) => {
    setData((prev) => ({ ...prev, title }));
  }, []);

  const updateDescription = useCallback((description: string) => {
    setData((prev) => ({ ...prev, description }));
  }, []);

  const loadSample = useCallback(() => {
    setData(SAMPLE_DATA);
  }, []);

  const clear = useCallback(() => {
    setData({
      url: "",
      title: "",
      description: "",
    });
  }, []);

  const toggleDevice = useCallback(() => {
    setDevice((prev) => (prev === "desktop" ? "mobile" : "desktop"));
  }, []);

  return {
    data,
    device,
    analysis,
    updateUrl,
    updateTitle,
    updateDescription,
    setDevice,
    toggleDevice,
    loadSample,
    clear,
  };
}
