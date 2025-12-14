// ============================================
// DevToolkit Chrome Extension Background Script
// Context Menu Integration
// ============================================

const BASE_URL = "https://web-toolkit.app/en/tools";

// Context menu items configuration
const CONTEXT_MENUS = [
  { id: "devtoolkit-json", title: "Format as JSON", tool: "json-formatter" },
  {
    id: "devtoolkit-base64-encode",
    title: "Encode to Base64",
    tool: "base64-converter",
  },
  {
    id: "devtoolkit-base64-decode",
    title: "Decode from Base64",
    tool: "base64-converter",
  },
  { id: "devtoolkit-hash", title: "Generate Hash", tool: "hash-generator" },
  { id: "devtoolkit-url-encode", title: "URL Encode", tool: "url-encoder" },
  { id: "devtoolkit-url-decode", title: "URL Decode", tool: "url-encoder" },
  { id: "devtoolkit-jwt", title: "Decode JWT", tool: "jwt-decoder" },
] as const;

// Create context menus on extension install
chrome.runtime.onInstalled.addListener(() => {
  // Create parent menu
  chrome.contextMenus.create({
    id: "devtoolkit-parent",
    title: "DevToolkit",
    contexts: ["selection"],
  });

  // Create child menus
  CONTEXT_MENUS.forEach((menu) => {
    chrome.contextMenus.create({
      id: menu.id,
      parentId: "devtoolkit-parent",
      title: menu.title,
      contexts: ["selection"],
    });
  });

  // Separator
  chrome.contextMenus.create({
    id: "devtoolkit-separator",
    parentId: "devtoolkit-parent",
    type: "separator",
    contexts: ["selection"],
  });

  // Open full app option
  chrome.contextMenus.create({
    id: "devtoolkit-open-app",
    parentId: "devtoolkit-parent",
    title: "Open DevToolkit",
    contexts: ["selection"],
  });

  console.log("DevToolkit context menus created");
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info) => {
  const selectedText = info.selectionText || "";

  if (info.menuItemId === "devtoolkit-open-app") {
    chrome.tabs.create({ url: BASE_URL });
    return;
  }

  // Find the matching menu item
  const menuItem = CONTEXT_MENUS.find((m) => m.id === info.menuItemId);
  if (!menuItem) return;

  // Build URL with selected text
  const params = new URLSearchParams();
  params.set("input", selectedText);

  // Add action hint for encode/decode tools
  if (info.menuItemId.includes("-encode")) {
    params.set("action", "encode");
  } else if (info.menuItemId.includes("-decode")) {
    params.set("action", "decode");
  }

  const url = `${BASE_URL}/${menuItem.tool}?${params.toString()}`;

  chrome.tabs.create({ url });

  // Track recent tool usage
  trackRecentTool(menuItem.tool);
});

// Track recently used tools for quick access
async function trackRecentTool(toolSlug: string) {
  const result = await chrome.storage.local.get(["recentTools"]);
  const recentTools: string[] = result.recentTools || [];

  // Remove if already exists (to move to front)
  const filtered = recentTools.filter((t) => t !== toolSlug);

  // Add to front and keep only last 5
  const updated = [toolSlug, ...filtered].slice(0, 5);

  await chrome.storage.local.set({ recentTools: updated });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_RECENT_TOOLS") {
    chrome.storage.local.get(["recentTools"]).then((result) => {
      sendResponse({ recentTools: result.recentTools || [] });
    });
    return true; // Keep channel open for async response
  }
});

export {};
