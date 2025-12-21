/**
 * WebGPU Detection Utility
 * Detects WebGPU support and provides fallback information
 */

// WebGPU types (simplified for detection purposes)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GPUAdapter = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GPUDevice = any;

declare global {
  interface Navigator {
    gpu?: {
      requestAdapter(): Promise<GPUAdapter | null>;
    };
  }
}

export interface WebGPUSupport {
  supported: boolean;
  adapter: GPUAdapter | null;
  device: GPUDevice | null;
  reason?: string;
}

/**
 * Check if WebGPU is supported in the current browser
 */
export async function detectWebGPU(): Promise<WebGPUSupport> {
  // Check if navigator.gpu exists
  if (typeof navigator === "undefined" || !("gpu" in navigator)) {
    return {
      supported: false,
      adapter: null,
      device: null,
      reason: "WebGPU is not supported in this browser",
    };
  }

  try {
    // Request adapter
    const adapter = await navigator.gpu!.requestAdapter();
    if (!adapter) {
      return {
        supported: false,
        adapter: null,
        device: null,
        reason: "No suitable GPU adapter found",
      };
    }

    // Request device
    const device = await adapter.requestDevice();
    if (!device) {
      return {
        supported: false,
        adapter,
        device: null,
        reason: "Failed to request GPU device",
      };
    }

    return {
      supported: true,
      adapter,
      device,
    };
  } catch (error) {
    return {
      supported: false,
      adapter: null,
      device: null,
      reason: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Check WebGPU support synchronously (basic check only)
 */
export function isWebGPUAvailable(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

/**
 * Get recommended execution provider based on browser capabilities
 */
export function getRecommendedExecutionProvider(): "webgpu" | "wasm" | "cpu" {
  if (isWebGPUAvailable()) {
    return "webgpu";
  }

  // Check for WebAssembly SIMD support
  if (typeof WebAssembly !== "undefined") {
    return "wasm";
  }

  return "cpu";
}

/**
 * Browser compatibility information
 */
export const WEBGPU_BROWSER_SUPPORT = {
  chrome: { minVersion: 113, supported: true },
  edge: { minVersion: 113, supported: true },
  firefox: { minVersion: 0, supported: false, note: "Behind flag" },
  safari: { minVersion: 17, supported: true },
  opera: { minVersion: 99, supported: true },
} as const;

/**
 * Get current browser info for WebGPU support
 */
export function getBrowserWebGPUInfo(): {
  browser: string;
  version: number;
  webgpuSupported: boolean;
  recommendation: string;
} {
  if (typeof navigator === "undefined") {
    return {
      browser: "unknown",
      version: 0,
      webgpuSupported: false,
      recommendation: "Use Chrome 113+ or Edge 113+ for best performance",
    };
  }

  const ua = navigator.userAgent;
  let browser = "unknown";
  let version = 0;

  if (ua.includes("Chrome/")) {
    browser = "chrome";
    version = parseInt(ua.split("Chrome/")[1]?.split(".")[0] || "0", 10);
  } else if (ua.includes("Firefox/")) {
    browser = "firefox";
    version = parseInt(ua.split("Firefox/")[1]?.split(".")[0] || "0", 10);
  } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
    browser = "safari";
    version = parseInt(ua.split("Version/")[1]?.split(".")[0] || "0", 10);
  } else if (ua.includes("Edg/")) {
    browser = "edge";
    version = parseInt(ua.split("Edg/")[1]?.split(".")[0] || "0", 10);
  }

  const webgpuSupported = isWebGPUAvailable();

  let recommendation = "";
  if (!webgpuSupported) {
    recommendation =
      "Use Chrome 113+, Edge 113+, or Safari 17+ for WebGPU acceleration";
  } else {
    recommendation = "WebGPU is available for hardware acceleration";
  }

  return {
    browser,
    version,
    webgpuSupported,
    recommendation,
  };
}
