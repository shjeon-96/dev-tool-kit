// ============================================
// Dynamic OG Image Generation for Google Discover
// ============================================

import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Category colors for visual distinction
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  tech: { bg: "#3B82F6", text: "#FFFFFF" },
  business: { bg: "#10B981", text: "#FFFFFF" },
  lifestyle: { bg: "#F59E0B", text: "#FFFFFF" },
  entertainment: { bg: "#EC4899", text: "#FFFFFF" },
  trending: { bg: "#8B5CF6", text: "#FFFFFF" },
  news: { bg: "#EF4444", text: "#FFFFFF" },
};

// Category display names
const CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  tech: { ko: "테크", en: "Tech" },
  business: { ko: "비즈니스", en: "Business" },
  lifestyle: { ko: "라이프스타일", en: "Lifestyle" },
  entertainment: { ko: "엔터테인먼트", en: "Entertainment" },
  trending: { ko: "트렌딩", en: "Trending" },
  news: { ko: "뉴스", en: "News" },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Web Toolkit";
  const category = searchParams.get("category") || "trending";
  const locale = searchParams.get("locale") || "en";

  const categoryColor = CATEGORY_COLORS[category] || CATEGORY_COLORS.trending;
  const categoryLabel =
    CATEGORY_LABELS[category]?.[locale as "ko" | "en"] ||
    CATEGORY_LABELS.trending.en;

  // Truncate title if too long
  const displayTitle = title.length > 80 ? title.slice(0, 77) + "..." : title;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0F172A",
        padding: "60px",
      }}
    >
      {/* Category Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: categoryColor.bg,
            color: categoryColor.text,
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "28px",
            fontWeight: 600,
          }}
        >
          {categoryLabel}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: title.length > 40 ? "56px" : "68px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {displayTitle}
        </h1>
      </div>

      {/* Footer: Branding */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Logo placeholder - circle */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 700 }}
            >
              W
            </span>
          </div>
          <span
            style={{
              color: "#94A3B8",
              fontSize: "32px",
              fontWeight: 500,
            }}
          >
            Web Toolkit
          </span>
        </div>

        {/* URL */}
        <span
          style={{
            color: "#64748B",
            fontSize: "24px",
          }}
        >
          web-toolkit.app
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
