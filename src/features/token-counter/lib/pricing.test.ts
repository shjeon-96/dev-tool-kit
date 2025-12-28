import { describe, it, expect } from "vitest";
import {
  MODEL_INFO,
  OPENAI_MODELS,
  ANTHROPIC_MODELS,
  ALL_MODELS,
  getModelInfo,
  getModelsByProvider,
} from "./pricing";
import { AIModel } from "./types";

describe("pricing", () => {
  describe("MODEL_INFO", () => {
    it("should have all required models", () => {
      const expectedModels: AIModel[] = [
        "gpt-4o",
        "gpt-4o-mini",
        "gpt-4-turbo",
        "gpt-4",
        "gpt-3.5-turbo",
        "claude-3.5-sonnet",
        "claude-3.5-haiku",
        "claude-3-opus",
        "claude-3-sonnet",
        "claude-3-haiku",
        "o1",
        "o1-mini",
        "o1-pro",
      ];

      expectedModels.forEach((model) => {
        expect(MODEL_INFO[model]).toBeDefined();
      });
    });

    it("should have valid structure for each model", () => {
      Object.values(MODEL_INFO).forEach((info) => {
        expect(info.id).toBeDefined();
        expect(info.name).toBeDefined();
        expect(info.provider).toMatch(/^(openai|anthropic)$/);
        expect(info.contextWindow).toBeGreaterThan(0);
        expect(info.inputPrice).toBeGreaterThanOrEqual(0);
        expect(info.outputPrice).toBeGreaterThanOrEqual(0);
        expect(info.description).toBeDefined();
      });
    });

    it("should have correct provider for OpenAI models", () => {
      const openaiModels = [
        "gpt-4o",
        "gpt-4o-mini",
        "gpt-4-turbo",
        "gpt-4",
        "gpt-3.5-turbo",
        "o1",
        "o1-mini",
        "o1-pro",
      ];
      openaiModels.forEach((model) => {
        expect(MODEL_INFO[model as AIModel].provider).toBe("openai");
      });
    });

    it("should have correct provider for Anthropic models", () => {
      const anthropicModels = [
        "claude-3.5-sonnet",
        "claude-3.5-haiku",
        "claude-3-opus",
        "claude-3-sonnet",
        "claude-3-haiku",
      ];
      anthropicModels.forEach((model) => {
        expect(MODEL_INFO[model as AIModel].provider).toBe("anthropic");
      });
    });

    it("should have GPT-4o with expected properties", () => {
      const gpt4o = MODEL_INFO["gpt-4o"];
      expect(gpt4o.id).toBe("gpt-4o");
      expect(gpt4o.name).toBe("GPT-4o");
      expect(gpt4o.contextWindow).toBe(128000);
      expect(gpt4o.inputPrice).toBe(2.5);
      expect(gpt4o.outputPrice).toBe(10.0);
    });

    it("should have Claude 3.5 Sonnet with expected properties", () => {
      const claude = MODEL_INFO["claude-3.5-sonnet"];
      expect(claude.id).toBe("claude-3.5-sonnet");
      expect(claude.name).toBe("Claude 3.5 Sonnet");
      expect(claude.contextWindow).toBe(200000);
      expect(claude.inputPrice).toBe(3.0);
      expect(claude.outputPrice).toBe(15.0);
    });

    it("should have o1-pro as the most expensive model", () => {
      const o1Pro = MODEL_INFO["o1-pro"];
      expect(o1Pro.inputPrice).toBe(150.0);
      expect(o1Pro.outputPrice).toBe(600.0);

      // Verify it's the most expensive
      Object.values(MODEL_INFO).forEach((info) => {
        expect(info.inputPrice).toBeLessThanOrEqual(o1Pro.inputPrice);
        expect(info.outputPrice).toBeLessThanOrEqual(o1Pro.outputPrice);
      });
    });

    it("should have gpt-4o-mini as one of the cheapest models", () => {
      const gpt4oMini = MODEL_INFO["gpt-4o-mini"];
      expect(gpt4oMini.inputPrice).toBe(0.15);
      expect(gpt4oMini.outputPrice).toBe(0.6);
    });

    it("should have reasonable context windows", () => {
      Object.values(MODEL_INFO).forEach((info) => {
        expect(info.contextWindow).toBeGreaterThanOrEqual(8192);
        expect(info.contextWindow).toBeLessThanOrEqual(200000);
      });
    });

    it("should have output price >= input price for all models", () => {
      Object.values(MODEL_INFO).forEach((info) => {
        expect(info.outputPrice).toBeGreaterThanOrEqual(info.inputPrice);
      });
    });
  });

  describe("OPENAI_MODELS", () => {
    it("should contain 9 OpenAI models", () => {
      expect(OPENAI_MODELS).toHaveLength(9);
    });

    it("should include all expected OpenAI models", () => {
      expect(OPENAI_MODELS).toContain("gpt-4o");
      expect(OPENAI_MODELS).toContain("gpt-4o-mini");
      expect(OPENAI_MODELS).toContain("gpt-4-turbo");
      expect(OPENAI_MODELS).toContain("gpt-4");
      expect(OPENAI_MODELS).toContain("gpt-3.5-turbo");
      expect(OPENAI_MODELS).toContain("o1");
      expect(OPENAI_MODELS).toContain("o1-mini");
      expect(OPENAI_MODELS).toContain("o1-pro");
    });

    it("should not contain any Anthropic models", () => {
      OPENAI_MODELS.forEach((model) => {
        expect(model).not.toMatch(/claude/);
      });
    });
  });

  describe("ANTHROPIC_MODELS", () => {
    it("should contain 7 Anthropic models", () => {
      expect(ANTHROPIC_MODELS).toHaveLength(7);
    });

    it("should include all expected Anthropic models", () => {
      expect(ANTHROPIC_MODELS).toContain("claude-3.5-sonnet");
      expect(ANTHROPIC_MODELS).toContain("claude-3.5-haiku");
      expect(ANTHROPIC_MODELS).toContain("claude-3-opus");
      expect(ANTHROPIC_MODELS).toContain("claude-3-sonnet");
      expect(ANTHROPIC_MODELS).toContain("claude-3-haiku");
    });

    it("should only contain Claude models", () => {
      ANTHROPIC_MODELS.forEach((model) => {
        expect(model).toMatch(/claude/);
      });
    });
  });

  describe("ALL_MODELS", () => {
    it("should contain all models from both providers", () => {
      expect(ALL_MODELS).toHaveLength(
        OPENAI_MODELS.length + ANTHROPIC_MODELS.length,
      );
    });

    it("should include all OpenAI models", () => {
      OPENAI_MODELS.forEach((model) => {
        expect(ALL_MODELS).toContain(model);
      });
    });

    it("should include all Anthropic models", () => {
      ANTHROPIC_MODELS.forEach((model) => {
        expect(ALL_MODELS).toContain(model);
      });
    });

    it("should match MODEL_INFO keys", () => {
      const modelInfoKeys = Object.keys(MODEL_INFO);
      expect(ALL_MODELS.length).toBe(modelInfoKeys.length);
      ALL_MODELS.forEach((model) => {
        expect(modelInfoKeys).toContain(model);
      });
    });
  });

  describe("getModelInfo", () => {
    it("should return model info for valid model", () => {
      const info = getModelInfo("gpt-4o");
      expect(info.id).toBe("gpt-4o");
      expect(info.name).toBe("GPT-4o");
    });

    it("should return correct info for each model", () => {
      ALL_MODELS.forEach((model) => {
        const info = getModelInfo(model);
        expect(info.id).toBe(model);
        expect(info).toEqual(MODEL_INFO[model]);
      });
    });
  });

  describe("getModelsByProvider", () => {
    it("should return OpenAI models for openai provider", () => {
      const models = getModelsByProvider("openai");
      expect(models).toEqual(OPENAI_MODELS);
    });

    it("should return Anthropic models for anthropic provider", () => {
      const models = getModelsByProvider("anthropic");
      expect(models).toEqual(ANTHROPIC_MODELS);
    });

    it("should return different arrays for different providers", () => {
      const openai = getModelsByProvider("openai");
      const anthropic = getModelsByProvider("anthropic");
      expect(openai).not.toEqual(anthropic);
    });
  });
});
