"use client";

import { useState, useCallback, useMemo } from "react";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
export type AuthType = "none" | "basic" | "bearer";
export type BodyType = "none" | "json" | "form" | "raw";

export interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface QueryParam {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

const generateId = () => Math.random().toString(36).substring(7);

export function useCurlBuilder() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Header[]>([
    { id: generateId(), key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [authType, setAuthType] = useState<AuthType>("none");
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [bodyType, setBodyType] = useState<BodyType>("none");
  const [bodyContent, setBodyContent] = useState("");

  const addHeader = useCallback(() => {
    setHeaders((prev) => [...prev, { id: generateId(), key: "", value: "", enabled: true }]);
  }, []);

  const removeHeader = useCallback((id: string) => {
    setHeaders((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const updateHeader = useCallback((id: string, updates: Partial<Omit<Header, "id">>) => {
    setHeaders((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  }, []);

  const addQueryParam = useCallback(() => {
    setQueryParams((prev) => [...prev, { id: generateId(), key: "", value: "", enabled: true }]);
  }, []);

  const removeQueryParam = useCallback((id: string) => {
    setQueryParams((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQueryParam = useCallback((id: string, updates: Partial<Omit<QueryParam, "id">>) => {
    setQueryParams((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const fullUrl = useMemo(() => {
    if (!url) return "";
    const enabledParams = queryParams.filter((p) => p.enabled && p.key);
    if (enabledParams.length === 0) return url;

    const queryString = enabledParams
      .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join("&");

    return url.includes("?") ? `${url}&${queryString}` : `${url}?${queryString}`;
  }, [url, queryParams]);

  const curlCommand = useMemo(() => {
    if (!url) return "";

    const parts: string[] = ["curl"];

    // Method
    if (method !== "GET") {
      parts.push(`-X ${method}`);
    }

    // URL
    parts.push(`'${fullUrl}'`);

    // Headers
    const enabledHeaders = headers.filter((h) => h.enabled && h.key);
    enabledHeaders.forEach((h) => {
      parts.push(`-H '${h.key}: ${h.value}'`);
    });

    // Auth
    if (authType === "basic" && authUsername) {
      parts.push(`-u '${authUsername}:${authPassword}'`);
    } else if (authType === "bearer" && authToken) {
      parts.push(`-H 'Authorization: Bearer ${authToken}'`);
    }

    // Body
    if (bodyType !== "none" && bodyContent && ["POST", "PUT", "PATCH"].includes(method)) {
      if (bodyType === "json") {
        parts.push(`-d '${bodyContent}'`);
      } else if (bodyType === "form") {
        parts.push(`--data-urlencode '${bodyContent}'`);
      } else {
        parts.push(`-d '${bodyContent}'`);
      }
    }

    return parts.join(" \\\n  ");
  }, [method, url, fullUrl, headers, authType, authUsername, authPassword, authToken, bodyType, bodyContent]);

  const parseCurl = useCallback((curlString: string) => {
    try {
      // Reset state
      setMethod("GET");
      setHeaders([]);
      setQueryParams([]);
      setAuthType("none");
      setAuthUsername("");
      setAuthPassword("");
      setAuthToken("");
      setBodyType("none");
      setBodyContent("");

      // Parse method
      const methodMatch = curlString.match(/-X\s+(\w+)/i);
      if (methodMatch) {
        setMethod(methodMatch[1].toUpperCase() as HttpMethod);
      }

      // Parse URL
      const urlMatch = curlString.match(/curl\s+(?:-X\s+\w+\s+)?['"]?([^'">\s]+)['"]?/i) ||
                       curlString.match(/['"]?(https?:\/\/[^'">\s]+)['"]?/i);
      if (urlMatch) {
        const parsedUrl = urlMatch[1];
        const [baseUrl, queryString] = parsedUrl.split("?");
        setUrl(baseUrl);

        if (queryString) {
          const params = queryString.split("&").map((param) => {
            const [key, value] = param.split("=");
            return {
              id: generateId(),
              key: decodeURIComponent(key),
              value: decodeURIComponent(value || ""),
              enabled: true,
            };
          });
          setQueryParams(params);
        }
      }

      // Parse headers
      const headerMatches = curlString.matchAll(/-H\s+['"]([^'"]+)['"]/gi);
      const parsedHeaders: Header[] = [];
      for (const match of headerMatches) {
        const [key, ...valueParts] = match[1].split(":");
        const value = valueParts.join(":").trim();

        // Check for Bearer token
        if (key.toLowerCase() === "authorization" && value.toLowerCase().startsWith("bearer ")) {
          setAuthType("bearer");
          setAuthToken(value.substring(7));
        } else {
          parsedHeaders.push({
            id: generateId(),
            key: key.trim(),
            value,
            enabled: true,
          });
        }
      }
      if (parsedHeaders.length > 0) {
        setHeaders(parsedHeaders);
      }

      // Parse basic auth
      const authMatch = curlString.match(/-u\s+['"]?([^:'"]+):([^'"]+)['"]?/i);
      if (authMatch) {
        setAuthType("basic");
        setAuthUsername(authMatch[1]);
        setAuthPassword(authMatch[2]);
      }

      // Parse body
      const dataMatch = curlString.match(/-d\s+['"]([^'"]+)['"]/i) ||
                        curlString.match(/--data\s+['"]([^'"]+)['"]/i);
      if (dataMatch) {
        setBodyContent(dataMatch[1]);
        // Try to detect JSON
        try {
          JSON.parse(dataMatch[1]);
          setBodyType("json");
        } catch {
          setBodyType("raw");
        }

        // Set method to POST if not specified
        if (!methodMatch) {
          setMethod("POST");
        }
      }

      return true;
    } catch {
      return false;
    }
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setMethod("GET");
    setUrl("");
    setHeaders([{ id: generateId(), key: "Content-Type", value: "application/json", enabled: true }]);
    setQueryParams([]);
    setAuthType("none");
    setAuthUsername("");
    setAuthPassword("");
    setAuthToken("");
    setBodyType("none");
    setBodyContent("");
  }, []);

  return {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    addHeader,
    removeHeader,
    updateHeader,
    queryParams,
    addQueryParam,
    removeQueryParam,
    updateQueryParam,
    authType,
    setAuthType,
    authUsername,
    setAuthUsername,
    authPassword,
    setAuthPassword,
    authToken,
    setAuthToken,
    bodyType,
    setBodyType,
    bodyContent,
    setBodyContent,
    fullUrl,
    curlCommand,
    parseCurl,
    copyToClipboard,
    reset,
  };
}
