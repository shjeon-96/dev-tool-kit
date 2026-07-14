import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        color: "#171813",
        background: "#f2efe6",
        fontFamily: "serif",
        border: "24px solid #171813",
        padding: "66px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: "74px",
              height: "74px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fffdf5",
              background: "#171813",
              boxShadow: "8px 8px 0 #f05a28",
              fontSize: "24px",
            }}
          >
            W/
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: "30px" }}>WEB TOOLKIT</strong>
            <span style={{ fontSize: "15px", letterSpacing: "4px" }}>
              LOCAL UTILITY FIELD KIT
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#f05a28",
              fontFamily: "monospace",
              fontSize: "19px",
              letterSpacing: "4px",
            }}
          >
            FAST / PRIVATE / PRECISE
          </span>
          <div
            style={{
              maxWidth: "920px",
              marginTop: "18px",
              fontSize: "92px",
              lineHeight: 0.92,
              letterSpacing: "-5px",
            }}
          >
            Small tools for precise work.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "34px",
            fontFamily: "monospace",
            fontSize: "17px",
          }}
        >
          <span>JSON</span>
          <span>BASE64</span>
          <span>UUID</span>
          <span>TIME</span>
          <span>URL</span>
          <span>SHA</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "66px",
          right: "66px",
          width: "150px",
          height: "150px",
          border: "2px solid #2f55d4",
          borderRadius: "50%",
        }}
      />
    </div>,
    { width: 1200, height: 630 },
  );
}
