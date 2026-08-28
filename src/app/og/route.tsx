import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#f5f7fa",
        background: "#050914",
        padding: "58px 64px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.16,
          backgroundImage:
            "linear-gradient(#263043 1px, transparent 1px), linear-gradient(90deg, #263043 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#d9ff00",
            fontSize: "48px",
            fontWeight: 900,
          }}
        >
          PL
        </div>
        <div style={{ display: "flex", fontSize: "24px", fontWeight: 800 }}>
          PIXELLOGIC / 픽셀로직
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "830px",
          }}
        >
          <div
            style={{ color: "#a8afbc", fontSize: "18px", letterSpacing: "4px" }}
          >
            INDEPENDENT PRODUCT STUDIO
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: "72px",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-4px",
            }}
          >
            작은 호기심을, 오래 쓰는 경험으로.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "94px",
            height: "94px",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #9a78ff",
            borderRadius: "50%",
            color: "#d9ff00",
            fontSize: "30px",
            fontWeight: 900,
          }}
        >
          PL
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
