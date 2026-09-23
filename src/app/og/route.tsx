import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";

export function GET() {
  const home = getDictionary("en").home;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // OG 렌더러는 홈페이지의 CSS 변수를 읽지 못해 기존 브랜드 색을 직접 사용한다.
        background: "#fffbf6",
        color: "#39281f",
        fontFamily: "sans-serif",
        padding: "64px 76px",
      }}
    >
      <strong style={{ fontSize: 32 }}>{SITE_NAME}</strong>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            width: 92,
            height: 8,
            borderRadius: 4,
            background: "#f3aa8c",
          }}
        />
        <div
          style={{
            maxWidth: 1040,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          {`${home.title} ${home.titleAccent}`}
        </div>
        <div style={{ fontSize: 24, opacity: 0.8 }}>{home.intro}</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
