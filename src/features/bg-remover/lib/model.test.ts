import { describe, it, expect } from "vitest";
import {
  getModelConfig,
  getCurrentSession,
  getCurrentModelType,
  isModelLoaded,
} from "./model";

describe("Model Utils", () => {
  describe("getModelConfig", () => {
    it("should return config for u2net model", () => {
      const config = getModelConfig("u2net");
      expect(config.name).toBe("u2net");
      expect(config.inputSize).toBe(320);
      expect(config.fileSize).toBe("176MB");
    });

    it("should return config for u2netp model", () => {
      const config = getModelConfig("u2netp");
      expect(config.name).toBe("u2netp");
      expect(config.inputSize).toBe(320);
      expect(config.fileSize).toBe("4MB");
    });

    it("should return config for isnet model", () => {
      const config = getModelConfig("isnet");
      expect(config.name).toBe("isnet");
      expect(config.inputSize).toBe(1024);
      expect(config.fileSize).toBe("44MB");
    });

    it("should have valid HuggingFace URLs for all models", () => {
      const models = ["u2net", "u2netp", "isnet"] as const;
      models.forEach((model) => {
        const config = getModelConfig(model);
        expect(config.url).toContain("huggingface.co");
        expect(config.url).toContain(".onnx");
      });
    });
  });

  describe("Session State", () => {
    it("getCurrentSession should return null initially", () => {
      // Note: This tests initial state; actual loading requires browser environment
      expect(getCurrentSession()).toBeNull();
    });

    it("getCurrentModelType should return null initially", () => {
      expect(getCurrentModelType()).toBeNull();
    });

    it("isModelLoaded should return false initially", () => {
      expect(isModelLoaded()).toBe(false);
    });

    it("isModelLoaded with modelType should return false initially", () => {
      expect(isModelLoaded("u2net")).toBe(false);
      expect(isModelLoaded("u2netp")).toBe(false);
      expect(isModelLoaded("isnet")).toBe(false);
    });
  });
});
