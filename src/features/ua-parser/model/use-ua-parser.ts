"use client";

import { useState, useCallback, useMemo } from "react";
import { UAParser } from "ua-parser-js";

export interface ParsedUA {
  browser: {
    name?: string;
    version?: string;
    major?: string;
  };
  engine: {
    name?: string;
    version?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  device: {
    vendor?: string;
    model?: string;
    type?: string;
  };
  cpu: {
    architecture?: string;
  };
}

// Get initial user agent from browser
function getInitialUserAgent(): string {
  if (typeof navigator !== "undefined") {
    return navigator.userAgent;
  }
  return "";
}

export function useUAParser() {
  const [userAgent, setUserAgent] = useState(getInitialUserAgent);
  const [isCurrentBrowser, setIsCurrentBrowser] = useState(true);

  const parsedResult = useMemo((): ParsedUA | null => {
    if (!userAgent) return null;

    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
      browser: {
        name: result.browser.name,
        version: result.browser.version,
        major: result.browser.major,
      },
      engine: {
        name: result.engine.name,
        version: result.engine.version,
      },
      os: {
        name: result.os.name,
        version: result.os.version,
      },
      device: {
        vendor: result.device.vendor,
        model: result.device.model,
        type: result.device.type,
      },
      cpu: {
        architecture: result.cpu.architecture,
      },
    };
  }, [userAgent]);

  const useCurrentBrowser = useCallback(() => {
    if (typeof navigator !== "undefined") {
      setUserAgent(navigator.userAgent);
      setIsCurrentBrowser(true);
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setUserAgent(value);
    setIsCurrentBrowser(false);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const commonUserAgents = useMemo(
    () => [
      {
        name: "Chrome (Windows)",
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      {
        name: "Firefox (Windows)",
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
      },
      {
        name: "Safari (macOS)",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
      },
      {
        name: "Edge (Windows)",
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
      },
      {
        name: "Chrome (Android)",
        ua: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
      },
      {
        name: "Safari (iOS)",
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
      },
      {
        name: "Googlebot",
        ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      {
        name: "Bingbot",
        ua: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
      },
    ],
    [],
  );

  return {
    userAgent,
    setUserAgent: handleInputChange,
    parsedResult,
    isCurrentBrowser,
    useCurrentBrowser,
    copyToClipboard,
    commonUserAgents,
  };
}
