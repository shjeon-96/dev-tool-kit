"use client";

import { useState, useCallback, useMemo } from "react";
import type { SitemapUrl, SitemapOptions, ChangeFrequency } from "../lib/types";
import { DEFAULT_OPTIONS } from "../lib/types";
import {
  parseUrls,
  generateSitemap,
  calculateStats,
  validateSameDomain,
} from "../lib/generator";

export function useSitemapGenerator() {
  const [urlInput, setUrlInput] = useState("");
  const [options, setOptions] = useState<SitemapOptions>(DEFAULT_OPTIONS);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // URL 파싱 및 SitemapUrl 변환
  const sitemapUrls = useMemo((): SitemapUrl[] => {
    const parsedUrls = parseUrls(urlInput);
    return parsedUrls.map((url) => ({
      loc: url,
      changefreq: options.defaultChangefreq,
      priority: options.defaultPriority,
    }));
  }, [urlInput, options.defaultChangefreq, options.defaultPriority]);

  // 통계 계산
  const stats = useMemo(() => {
    return calculateStats(sitemapUrls);
  }, [sitemapUrls]);

  // 도메인 검증
  const domainValidation = useMemo(() => {
    const urls = sitemapUrls.map((u) => u.loc);
    return validateSameDomain(urls);
  }, [sitemapUrls]);

  // Sitemap 생성
  const generate = useCallback(() => {
    setError(null);

    if (sitemapUrls.length === 0) {
      setError("Please enter at least one valid URL");
      setOutput("");
      return;
    }

    try {
      const sitemap = generateSitemap(sitemapUrls, options);
      setOutput(sitemap);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate sitemap");
      setOutput("");
    }
  }, [sitemapUrls, options]);

  // 옵션 업데이트
  const updateOptions = useCallback((updates: Partial<SitemapOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  // 입력 초기화
  const clear = useCallback(() => {
    setUrlInput("");
    setOutput("");
    setError(null);
  }, []);

  // 다운로드
  const download = useCallback(() => {
    if (!output) return;

    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sitemap.xml";
    link.click();
    URL.revokeObjectURL(url);
  }, [output]);

  // 클립보드 복사
  const copy = useCallback(async () => {
    if (!output) return false;

    try {
      await navigator.clipboard.writeText(output);
      return true;
    } catch {
      return false;
    }
  }, [output]);

  // 샘플 데이터 로드
  const loadSample = useCallback(() => {
    const sampleUrls = `https://example.com/
https://example.com/about
https://example.com/products
https://example.com/products/item-1
https://example.com/products/item-2
https://example.com/blog
https://example.com/blog/post-1
https://example.com/blog/post-2
https://example.com/contact`;
    setUrlInput(sampleUrls);
    setOutput("");
    setError(null);
  }, []);

  return {
    // State
    urlInput,
    options,
    output,
    error,
    stats,
    domainValidation,
    sitemapUrls,

    // Actions
    setUrlInput,
    updateOptions,
    generate,
    clear,
    download,
    copy,
    loadSample,
  };
}
