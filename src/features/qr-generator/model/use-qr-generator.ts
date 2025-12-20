"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type QRCodeType from "qrcode";
import { useQuota } from "@/shared/lib/quota";

export type QRType = "url" | "text" | "wifi" | "vcard";

export interface WifiData {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
}

export interface QROptions {
  type: QRType;
  content: string;
  wifiData: WifiData;
  vcardData: VCardData;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
}

export function useQrGenerator() {
  const { trackUsage } = useQuota("qr-generator");
  const qrCodeRef = useRef<typeof QRCodeType | null>(null);

  const [options, setOptions] = useState<QROptions>({
    type: "url",
    content: "https://example.com",
    wifiData: {
      ssid: "",
      password: "",
      encryption: "WPA",
      hidden: false,
    },
    vcardData: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      organization: "",
    },
    size: 300,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    errorCorrectionLevel: "M",
  });

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateWifiString = useCallback((data: WifiData): string => {
    const escape = (str: string) => str.replace(/([\\;,:"'])/g, "\\$1");
    return `WIFI:T:${data.encryption};S:${escape(data.ssid)};P:${escape(data.password)};H:${data.hidden ? "true" : "false"};;`;
  }, []);

  const generateVCardString = useCallback((data: VCardData): string => {
    return `BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName}
FN:${data.firstName} ${data.lastName}
TEL:${data.phone}
EMAIL:${data.email}
ORG:${data.organization}
END:VCARD`;
  }, []);

  const getQRContent = useCallback((): string => {
    switch (options.type) {
      case "wifi":
        return generateWifiString(options.wifiData);
      case "vcard":
        return generateVCardString(options.vcardData);
      default:
        return options.content;
    }
  }, [options, generateWifiString, generateVCardString]);

  const generateQR = useCallback(async () => {
    const content = getQRContent();
    if (!content.trim()) {
      setQrDataUrl(null);
      return;
    }

    try {
      setError(null);

      // Dynamic import QRCode library
      if (!qrCodeRef.current) {
        const QRCodeModule = await import("qrcode");
        qrCodeRef.current = QRCodeModule.default;
      }

      const dataUrl = await qrCodeRef.current.toDataURL(content, {
        width: options.size,
        margin: 2,
        color: {
          dark: options.foregroundColor,
          light: options.backgroundColor,
        },
        errorCorrectionLevel: options.errorCorrectionLevel,
      });
      setQrDataUrl(dataUrl);
      trackUsage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate QR code");
      setQrDataUrl(null);
    }
  }, [options, getQRContent, trackUsage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      generateQR();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [generateQR]);

  const downloadQR = useCallback(
    async (format: "png" | "svg") => {
      if (!qrDataUrl) return;

      if (format === "png") {
        const link = document.createElement("a");
        link.href = qrDataUrl;
        link.download = "qrcode.png";
        link.click();
      } else {
        // Dynamic import QRCode library for SVG
        if (!qrCodeRef.current) {
          const QRCodeModule = await import("qrcode");
          qrCodeRef.current = QRCodeModule.default;
        }

        const content = getQRContent();
        const svg = await qrCodeRef.current.toString(content, {
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
        link.download = "qrcode.svg";
        link.click();
        URL.revokeObjectURL(url);
      }
    },
    [qrDataUrl, options, getQRContent],
  );

  const updateOptions = useCallback((updates: Partial<QROptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateWifiData = useCallback((updates: Partial<WifiData>) => {
    setOptions((prev) => ({
      ...prev,
      wifiData: { ...prev.wifiData, ...updates },
    }));
  }, []);

  const updateVCardData = useCallback((updates: Partial<VCardData>) => {
    setOptions((prev) => ({
      ...prev,
      vcardData: { ...prev.vcardData, ...updates },
    }));
  }, []);

  return {
    options,
    qrDataUrl,
    error,
    updateOptions,
    updateWifiData,
    updateVCardData,
    downloadQR,
  };
}
