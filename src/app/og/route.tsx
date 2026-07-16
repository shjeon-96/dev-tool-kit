import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        color: "#e9ff70",
        background: "#111713",
        border: "22px solid #e9ff70",
        padding: "64px",
        fontFamily: "monospace",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            letterSpacing: "4px",
          }}
        >
          <strong>RUNWAY 10</strong>
          <span>DAILY CORPORATE CRISIS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ color: "#ff674d", fontSize: "18px", letterSpacing: "5px" }}
          >
            DECISION REQUIRED
          </span>
          <strong
            style={{
              maxWidth: "940px",
              marginTop: "22px",
              color: "#f5f0df",
              fontFamily: "serif",
              fontSize: "94px",
              lineHeight: 0.92,
              letterSpacing: "-5px",
            }}
          >
            Keep the company alive.
          </strong>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#f5f0df",
            fontSize: "18px",
          }}
        >
          <span>CASH / TEAM / TRUST / GROWTH</span>
          <span>10 DECISIONS. NO UNDO.</span>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
