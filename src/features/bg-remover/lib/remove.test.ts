import { describe, it, expect } from "vitest";
import * as removeModule from "./remove";

describe("Remove Module", () => {
  describe("Module Exports", () => {
    it("should export loadImageToCanvas function", () => {
      expect(typeof removeModule.loadImageToCanvas).toBe("function");
    });

    it("should export removeBackground function", () => {
      expect(typeof removeModule.removeBackground).toBe("function");
    });

    it("should export downloadImage function", () => {
      expect(typeof removeModule.downloadImage).toBe("function");
    });
  });

  describe("Function Signatures", () => {
    it("loadImageToCanvas should accept File or string", () => {
      // Function signature test - actual execution requires browser environment
      const fn = removeModule.loadImageToCanvas;
      expect(fn.length).toBe(1); // 1 parameter
    });

    it("removeBackground should have correct parameters", () => {
      const fn = removeModule.removeBackground;
      // imageSource, session, modelType, options?, onProgress?
      expect(fn.length).toBeGreaterThanOrEqual(3);
    });

    it("downloadImage should accept dataUrl and optional filename", () => {
      const fn = removeModule.downloadImage;
      expect(fn.length).toBeGreaterThanOrEqual(1);
    });
  });
});

// Note: Full integration tests for removeBackground require:
// - Browser environment with Canvas API
// - ONNX Runtime session
// - Image processing capabilities
// These should be tested via E2E tests (Playwright)
