import { describe, it, expect } from "vitest";
import {
  DEFAULT_PROCESSING_OPTIONS,
  AVAILABLE_MODELS,
  type ModelType,
  type ProcessingOptions,
} from "./types";

describe("BgRemover Types", () => {
  describe("DEFAULT_PROCESSING_OPTIONS", () => {
    it("should have default model as u2netp", () => {
      expect(DEFAULT_PROCESSING_OPTIONS.model).toBe("u2netp");
    });

    it("should have default threshold as 0.5", () => {
      expect(DEFAULT_PROCESSING_OPTIONS.threshold).toBe(0.5);
    });

    it("should have default featherRadius as 0", () => {
      expect(DEFAULT_PROCESSING_OPTIONS.featherRadius).toBe(0);
    });

    it("should have default outputFormat as png", () => {
      expect(DEFAULT_PROCESSING_OPTIONS.outputFormat).toBe("png");
    });

    it("should have preserveOriginalSize as true", () => {
      expect(DEFAULT_PROCESSING_OPTIONS.preserveOriginalSize).toBe(true);
    });
  });

  describe("AVAILABLE_MODELS", () => {
    it("should have u2net model", () => {
      expect(AVAILABLE_MODELS.u2net).toBeDefined();
      expect(AVAILABLE_MODELS.u2net.name).toBe("u2net");
      expect(AVAILABLE_MODELS.u2net.inputSize).toBe(320);
    });

    it("should have u2netp model", () => {
      expect(AVAILABLE_MODELS.u2netp).toBeDefined();
      expect(AVAILABLE_MODELS.u2netp.name).toBe("u2netp");
      expect(AVAILABLE_MODELS.u2netp.inputSize).toBe(320);
    });

    it("should have isnet model", () => {
      expect(AVAILABLE_MODELS.isnet).toBeDefined();
      expect(AVAILABLE_MODELS.isnet.name).toBe("isnet");
      expect(AVAILABLE_MODELS.isnet.inputSize).toBe(1024);
    });

    it("should have valid URLs for all models", () => {
      Object.values(AVAILABLE_MODELS).forEach((model) => {
        expect(model.url).toMatch(/^https:\/\//);
        expect(model.url).toContain("huggingface.co");
      });
    });

    it("should have display names for all models", () => {
      Object.values(AVAILABLE_MODELS).forEach((model) => {
        expect(model.displayName).toBeTruthy();
        expect(typeof model.displayName).toBe("string");
      });
    });

    it("should have file size info for all models", () => {
      Object.values(AVAILABLE_MODELS).forEach((model) => {
        expect(model.fileSize).toMatch(/^\d+MB$/);
      });
    });
  });

  describe("ModelType", () => {
    it("should accept valid model types", () => {
      const validTypes: ModelType[] = ["u2net", "u2netp", "isnet"];
      validTypes.forEach((type) => {
        expect(AVAILABLE_MODELS[type]).toBeDefined();
      });
    });
  });

  describe("ProcessingOptions type check", () => {
    it("should allow partial options", () => {
      const partialOptions: Partial<ProcessingOptions> = {
        threshold: 0.7,
      };
      expect(partialOptions.threshold).toBe(0.7);
      expect(partialOptions.model).toBeUndefined();
    });

    it("should allow full options", () => {
      const fullOptions: ProcessingOptions = {
        model: "u2net",
        threshold: 0.6,
        featherRadius: 5,
        outputFormat: "webp",
        backgroundColor: "#ffffff",
        preserveOriginalSize: false,
      };
      expect(fullOptions.model).toBe("u2net");
      expect(fullOptions.outputFormat).toBe("webp");
    });
  });
});
