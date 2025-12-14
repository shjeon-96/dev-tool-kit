import { useState } from "react";

// ============================================
// DevToolkit Chrome Extension Popup
// ============================================

const TOOLS = [
  { slug: "json-formatter", name: "JSON Formatter", icon: "{ }" },
  { slug: "base64-converter", name: "Base64 Converter", icon: "B64" },
  { slug: "hash-generator", name: "Hash Generator", icon: "#" },
  { slug: "url-encoder", name: "URL Encoder", icon: "%" },
  { slug: "jwt-decoder", name: "JWT Decoder", icon: "JWT" },
  { slug: "uuid-generator", name: "UUID Generator", icon: "ID" },
] as const;

const BASE_URL = "https://web-toolkit.app/en/tools";

function IndexPopup() {
  const [recentTools] = useState<string[]>([]);

  const openTool = (slug: string) => {
    chrome.tabs.create({ url: `${BASE_URL}/${slug}` });
  };

  const openWithSelection = async (slug: string) => {
    // Get selected text from active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab.id) {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: () => window.getSelection()?.toString() || "",
        })
        .then((results) => {
          const selectedText = results[0]?.result || "";
          if (selectedText) {
            // Open tool with pre-filled data
            chrome.tabs.create({
              url: `${BASE_URL}/${slug}?input=${encodeURIComponent(selectedText)}`,
            });
          } else {
            openTool(slug);
          }
        });
    }
  };

  return (
    <div
      style={{
        width: 320,
        minHeight: 400,
        padding: 16,
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: "1px solid #27272a",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#3b82f6",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          DT
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            DevToolkit
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "#a1a1aa" }}>
            Developer tools at your fingertips
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#a1a1aa",
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Quick Tools
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {TOOLS.map((tool) => (
            <button
              key={tool.slug}
              onClick={() => openWithSelection(tool.slug)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                backgroundColor: "transparent",
                border: "1px solid #27272a",
                borderRadius: 8,
                cursor: "pointer",
                color: "#fafafa",
                textAlign: "left",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#27272a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#27272a",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "monospace",
                }}
              >
                {tool.icon}
              </span>
              <span style={{ fontSize: 14 }}>{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Tools */}
      {recentTools.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h2
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#a1a1aa",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Recent
          </h2>
          {/* Recent tools list will be populated from storage */}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 12,
          borderTop: "1px solid #27272a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => chrome.tabs.create({ url: BASE_URL })}
          style={{
            fontSize: 12,
            color: "#3b82f6",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Open Full App →
        </button>
        <span style={{ fontSize: 11, color: "#71717a" }}>v0.4.0</span>
      </div>
    </div>
  );
}

export default IndexPopup;
