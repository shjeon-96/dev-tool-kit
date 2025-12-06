"use client";

import { useState, useCallback, useMemo } from "react";

export interface MetaData {
  // Basic
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  viewport: string;
  charset: string;

  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  ogLocale: string;

  // Twitter Card
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  twitterCreator: string;

  // Additional
  themeColor: string;
  canonical: string;
}

const defaultMetaData: MetaData = {
  title: "",
  description: "",
  keywords: "",
  author: "",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",

  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
  ogType: "website",
  ogSiteName: "",
  ogLocale: "ko_KR",

  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  twitterSite: "",
  twitterCreator: "",

  themeColor: "#ffffff",
  canonical: "",
};

export function useMetaGenerator() {
  const [metaData, setMetaData] = useState<MetaData>(defaultMetaData);
  const [syncOG, setSyncOG] = useState(true);
  const [syncTwitter, setSyncTwitter] = useState(true);

  const updateField = useCallback(
    (field: keyof MetaData, value: string) => {
      setMetaData((prev) => {
        const updated = { ...prev, [field]: value };

        // Sync Open Graph with basic fields
        if (syncOG) {
          if (field === "title") updated.ogTitle = value;
          if (field === "description") updated.ogDescription = value;
        }

        // Sync Twitter with basic/OG fields
        if (syncTwitter) {
          if (field === "title" || field === "ogTitle") {
            updated.twitterTitle = field === "ogTitle" ? value : updated.ogTitle || value;
          }
          if (field === "description" || field === "ogDescription") {
            updated.twitterDescription =
              field === "ogDescription" ? value : updated.ogDescription || value;
          }
          if (field === "ogImage") updated.twitterImage = value;
        }

        return updated;
      });
    },
    [syncOG, syncTwitter]
  );

  const generatedCode = useMemo(() => {
    const lines: string[] = [];

    // Charset
    if (metaData.charset) {
      lines.push(`<meta charset="${metaData.charset}">`);
    }

    // Viewport
    if (metaData.viewport) {
      lines.push(`<meta name="viewport" content="${metaData.viewport}">`);
    }

    // Basic Meta
    if (metaData.title) {
      lines.push(`<title>${metaData.title}</title>`);
    }
    if (metaData.description) {
      lines.push(`<meta name="description" content="${metaData.description}">`);
    }
    if (metaData.keywords) {
      lines.push(`<meta name="keywords" content="${metaData.keywords}">`);
    }
    if (metaData.author) {
      lines.push(`<meta name="author" content="${metaData.author}">`);
    }
    if (metaData.robots) {
      lines.push(`<meta name="robots" content="${metaData.robots}">`);
    }

    // Canonical
    if (metaData.canonical) {
      lines.push(`<link rel="canonical" href="${metaData.canonical}">`);
    }

    // Theme Color
    if (metaData.themeColor) {
      lines.push(`<meta name="theme-color" content="${metaData.themeColor}">`);
    }

    // Open Graph
    const ogFields = [
      { key: "og:title", value: metaData.ogTitle },
      { key: "og:description", value: metaData.ogDescription },
      { key: "og:image", value: metaData.ogImage },
      { key: "og:url", value: metaData.ogUrl },
      { key: "og:type", value: metaData.ogType },
      { key: "og:site_name", value: metaData.ogSiteName },
      { key: "og:locale", value: metaData.ogLocale },
    ];

    const hasOG = ogFields.some((f) => f.value);
    if (hasOG) {
      lines.push("");
      lines.push("<!-- Open Graph / Facebook -->");
      ogFields.forEach((f) => {
        if (f.value) {
          lines.push(`<meta property="${f.key}" content="${f.value}">`);
        }
      });
    }

    // Twitter Card
    const twitterFields = [
      { key: "twitter:card", value: metaData.twitterCard },
      { key: "twitter:title", value: metaData.twitterTitle },
      { key: "twitter:description", value: metaData.twitterDescription },
      { key: "twitter:image", value: metaData.twitterImage },
      { key: "twitter:site", value: metaData.twitterSite },
      { key: "twitter:creator", value: metaData.twitterCreator },
    ];

    const hasTwitter = twitterFields.some((f) => f.value);
    if (hasTwitter) {
      lines.push("");
      lines.push("<!-- Twitter -->");
      twitterFields.forEach((f) => {
        if (f.value) {
          lines.push(`<meta name="${f.key}" content="${f.value}">`);
        }
      });
    }

    return lines.join("\n");
  }, [metaData]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setMetaData(defaultMetaData);
  }, []);

  const previewData = useMemo(() => {
    return {
      google: {
        title: metaData.title || "페이지 제목",
        description: metaData.description || "페이지 설명이 여기에 표시됩니다.",
        url: metaData.canonical || "https://example.com/page",
      },
      facebook: {
        title: metaData.ogTitle || metaData.title || "페이지 제목",
        description:
          metaData.ogDescription || metaData.description || "페이지 설명이 여기에 표시됩니다.",
        image: metaData.ogImage,
        siteName: metaData.ogSiteName || "사이트 이름",
      },
      twitter: {
        title: metaData.twitterTitle || metaData.ogTitle || metaData.title || "페이지 제목",
        description:
          metaData.twitterDescription ||
          metaData.ogDescription ||
          metaData.description ||
          "페이지 설명이 여기에 표시됩니다.",
        image: metaData.twitterImage || metaData.ogImage,
        site: metaData.twitterSite || "@username",
      },
    };
  }, [metaData]);

  const robotsOptions = useMemo(
    () => [
      { value: "index, follow", label: "Index, Follow (기본)" },
      { value: "noindex, follow", label: "No Index, Follow" },
      { value: "index, nofollow", label: "Index, No Follow" },
      { value: "noindex, nofollow", label: "No Index, No Follow" },
    ],
    []
  );

  const ogTypeOptions = useMemo(
    () => [
      { value: "website", label: "Website" },
      { value: "article", label: "Article" },
      { value: "product", label: "Product" },
      { value: "profile", label: "Profile" },
      { value: "video.other", label: "Video" },
      { value: "music.song", label: "Music" },
    ],
    []
  );

  const twitterCardOptions = useMemo(
    () => [
      { value: "summary", label: "Summary" },
      { value: "summary_large_image", label: "Summary Large Image" },
      { value: "app", label: "App" },
      { value: "player", label: "Player" },
    ],
    []
  );

  return {
    metaData,
    updateField,
    generatedCode,
    copyToClipboard,
    reset,
    previewData,
    syncOG,
    setSyncOG,
    syncTwitter,
    setSyncTwitter,
    robotsOptions,
    ogTypeOptions,
    twitterCardOptions,
  };
}
