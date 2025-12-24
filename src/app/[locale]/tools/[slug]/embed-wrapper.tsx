"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, useMemo } from "react";

// ============================================
// Embed Mode Wrapper
// ============================================

interface EmbedWrapperProps {
  /** 일반 페이지 콘텐츠 */
  children: ReactNode;
  /** 도구 컴포넌트만 (embed 모드용) */
  toolContent: ReactNode;
}

/**
 * Embed 모드 감지 및 조건부 렌더링
 * - embed=true: 도구만 렌더링 (광고, 헤더, SEO 콘텐츠 제외)
 * - embed=false: 전체 페이지 렌더링
 */
export function EmbedWrapper({ children, toolContent }: EmbedWrapperProps) {
  const searchParams = useSearchParams();

  const { isEmbed, theme } = useMemo(() => {
    if (!searchParams) {
      return { isEmbed: false, theme: "light" as const };
    }

    const embedParam = searchParams.get("embed");
    const themeParam = searchParams.get("theme");

    return {
      isEmbed: embedParam === "true",
      theme: (themeParam === "dark" ? "dark" : "light") as "light" | "dark",
    };
  }, [searchParams]);

  // Embed 모드: 도구만 렌더링
  if (isEmbed) {
    return (
      <div
        className="embed-mode"
        data-theme={theme}
        style={{
          padding: "16px",
          minHeight: "100vh",
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        }}
      >
        {/* 도구 콘텐츠만 렌더링 */}
        <div className="rounded-lg border p-4">{toolContent}</div>

        {/* Embed 모드용 스타일 오버라이드 */}
        <style jsx global>{`
          .embed-mode {
            --background: ${theme === "dark" ? "222.2 84% 4.9%" : "0 0% 100%"};
            --foreground: ${theme === "dark"
              ? "210 40% 98%"
              : "222.2 84% 4.9%"};
          }

          /* 불필요한 요소 숨김 */
          .embed-mode nav,
          .embed-mode header,
          .embed-mode footer,
          .embed-mode aside,
          .embed-mode .breadcrumb {
            display: none !important;
          }

          /* 스크롤바 스타일링 */
          .embed-mode::-webkit-scrollbar {
            width: 6px;
          }

          .embed-mode::-webkit-scrollbar-track {
            background: ${theme === "dark" ? "#374151" : "#f1f5f9"};
          }

          .embed-mode::-webkit-scrollbar-thumb {
            background: ${theme === "dark" ? "#6b7280" : "#cbd5e1"};
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  // 일반 모드: 전체 페이지 렌더링
  return <>{children}</>;
}
