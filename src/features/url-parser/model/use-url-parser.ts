"use client";

import { useState, useCallback, useMemo } from "react";

export interface ParsedUrl {
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  username: string;
  password: string;
}

export interface QueryParam {
  key: string;
  value: string;
}

export function useUrlParser() {
  const [input, setInput] = useState(
    "https://example.com/path?name=value&foo=bar#section",
  );

  // Parse URL and return result with error
  const { parsedUrl, error } = useMemo((): {
    parsedUrl: ParsedUrl | null;
    error: string | null;
  } => {
    if (!input.trim()) {
      return { parsedUrl: null, error: null };
    }

    try {
      const url = new URL(input);
      return {
        parsedUrl: {
          href: url.href,
          protocol: url.protocol,
          host: url.host,
          hostname: url.hostname,
          port: url.port,
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
          origin: url.origin,
          username: url.username,
          password: url.password,
        },
        error: null,
      };
    } catch {
      return { parsedUrl: null, error: "유효한 URL이 아닙니다" };
    }
  }, [input]);

  const queryParams = useMemo((): QueryParam[] => {
    if (!parsedUrl) return [];

    const params: QueryParam[] = [];
    const searchParams = new URLSearchParams(parsedUrl.search);
    searchParams.forEach((value, key) => {
      params.push({ key, value });
    });
    return params;
  }, [parsedUrl]);

  const updateQueryParam = useCallback(
    (index: number, field: "key" | "value", newValue: string) => {
      if (!parsedUrl) return;

      try {
        const url = new URL(parsedUrl.href);
        const params = new URLSearchParams(url.search);
        const entries = Array.from(params.entries());

        if (index < entries.length) {
          const [oldKey] = entries[index];
          params.delete(oldKey);

          if (field === "key") {
            entries[index] = [newValue, entries[index][1]];
          } else {
            entries[index] = [entries[index][0], newValue];
          }

          const newParams = new URLSearchParams();
          entries.forEach(([k, v]) => newParams.append(k, v));
          url.search = newParams.toString();
          setInput(url.href);
        }
      } catch {
        // Ignore errors during editing
      }
    },
    [parsedUrl],
  );

  const addQueryParam = useCallback(() => {
    if (!parsedUrl) return;

    try {
      const url = new URL(parsedUrl.href);
      const params = new URLSearchParams(url.search);
      params.append("key", "value");
      url.search = params.toString();
      setInput(url.href);
    } catch {
      // Ignore errors
    }
  }, [parsedUrl]);

  const removeQueryParam = useCallback(
    (index: number) => {
      if (!parsedUrl) return;

      try {
        const url = new URL(parsedUrl.href);
        const params = new URLSearchParams(url.search);
        const entries = Array.from(params.entries());

        if (index < entries.length) {
          const newParams = new URLSearchParams();
          entries.forEach(([k, v], i) => {
            if (i !== index) newParams.append(k, v);
          });
          url.search = newParams.toString();
          setInput(url.href);
        }
      } catch {
        // Ignore errors
      }
    },
    [parsedUrl],
  );

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  return {
    input,
    setInput,
    parsedUrl,
    queryParams,
    error,
    updateQueryParam,
    addQueryParam,
    removeQueryParam,
    copyToClipboard,
    handleClear,
  };
}
