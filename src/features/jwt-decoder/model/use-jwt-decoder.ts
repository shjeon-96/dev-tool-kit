"use client";

import { useState, useCallback, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useToolHistory } from "@/shared/lib";

export interface DecodedToken {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  isExpired: boolean;
  expiresAt: Date | null;
  issuedAt: Date | null;
}

export function useJwtDecoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  const {
    history,
    addToHistory,
    clearHistory,
    hasHistory,
  } = useToolHistory("jwt-decoder");

  const decodeToken = useCallback((token: string, saveToHistory: boolean = true) => {
    if (!token.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format: must have 3 parts");
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = jwtDecode<Record<string, unknown>>(token);

      const exp = payload.exp as number | undefined;
      const iat = payload.iat as number | undefined;

      const expiresAt = exp ? new Date(exp * 1000) : null;
      const issuedAt = iat ? new Date(iat * 1000) : null;
      const isExpired = expiresAt ? expiresAt < new Date() : false;

      setDecoded({
        header,
        payload,
        isExpired,
        expiresAt,
        issuedAt,
      });
      setError(null);

      // 히스토리에 저장 (JWT 앞부분만 저장하여 보안 유지)
      if (saveToHistory) {
        const truncatedToken = token.length > 50 ? token.substring(0, 50) + "..." : token;
        addToHistory(truncatedToken, JSON.stringify(payload, null, 2));
      }
    } catch (e) {
      setDecoded(null);
      setError(e instanceof Error ? e.message : "Invalid JWT token");
    }
  }, [addToHistory]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      decodeToken(value);
    },
    [decodeToken]
  );

  const handleClear = useCallback(() => {
    setInput("");
    setDecoded(null);
    setError(null);
    setTimeRemaining(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleInputChange(text);
    } catch {
      setError("Failed to paste from clipboard");
    }
  }, [handleInputChange]);

  // Update time remaining every second
  useEffect(() => {
    if (!decoded?.expiresAt || decoded.isExpired) {
      setTimeRemaining(null);
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const diff = decoded.expiresAt!.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("Expired");
        setDecoded((prev) => (prev ? { ...prev, isExpired: true } : null));
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [decoded?.expiresAt, decoded?.isExpired]);

  const loadFromHistory = useCallback(
    (historyInput: string, historyOutput: string) => {
      // 히스토리에서 불러올 때는 출력 결과만 표시
      setInput(historyInput);
      try {
        const payload = JSON.parse(historyOutput);
        setDecoded({
          header: {},
          payload,
          isExpired: false,
          expiresAt: null,
          issuedAt: null,
        });
        setError(null);
      } catch {
        setError("Failed to load from history");
      }
    },
    []
  );

  return {
    input,
    decoded,
    error,
    timeRemaining,
    handleInputChange,
    handleClear,
    handlePaste,
    // 히스토리 관련
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  };
}
