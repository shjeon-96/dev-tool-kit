/**
 * List of tool slugs that use WebAssembly with COOP/COEP headers.
 * These pages have SharedArrayBuffer enabled but cannot load external scripts (AdSense, etc.)
 */
export const WASM_ISOLATED_TOOLS = [
  "image-resizer",
  "hash-generator",
  "video-compressor",
] as const;

export type WasmIsolatedTool = (typeof WASM_ISOLATED_TOOLS)[number];

/**
 * Check if a pathname is a Wasm-isolated page
 * @param pathname Current pathname (e.g., "/en/tools/image-resizer")
 * @returns true if the page uses Wasm and has COOP/COEP headers
 */
export function isWasmIsolatedPage(pathname: string): boolean {
  return WASM_ISOLATED_TOOLS.some((tool) =>
    pathname.includes(`/tools/${tool}`),
  );
}

/**
 * Check if a tool slug is Wasm-isolated
 * @param toolSlug Tool slug (e.g., "image-resizer")
 * @returns true if the tool uses Wasm
 */
export function isWasmIsolatedTool(toolSlug: string): boolean {
  return WASM_ISOLATED_TOOLS.includes(toolSlug as WasmIsolatedTool);
}
