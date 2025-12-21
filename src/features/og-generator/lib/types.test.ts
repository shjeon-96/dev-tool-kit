/**
 * OG Generator Types Tests
 */
import { describe, it, expect } from "vitest";
import {
  DEFAULT_OG_CONFIG,
  TEMPLATES,
  GRADIENT_PRESETS,
  OG_SIZES,
  FONT_CONFIGS,
  type OGImageConfig,
  type TemplateType,
  type FontFamily,
  type GradientDirection,
  type TextAlign,
} from "./types";

describe("DEFAULT_OG_CONFIG", () => {
  it("should have all required properties", () => {
    expect(DEFAULT_OG_CONFIG).toHaveProperty("title");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("template");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("backgroundColor");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("textColor");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("titleFontSize");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("subtitleFontSize");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("fontFamily");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("textAlign");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("width");
    expect(DEFAULT_OG_CONFIG).toHaveProperty("height");
  });

  it("should have standard OG image dimensions", () => {
    expect(DEFAULT_OG_CONFIG.width).toBe(1200);
    expect(DEFAULT_OG_CONFIG.height).toBe(630);
  });

  it("should have valid default template", () => {
    const validTemplates: TemplateType[] = [
      "basic",
      "gradient",
      "blog",
      "product",
      "social",
      "minimal",
    ];
    expect(validTemplates).toContain(DEFAULT_OG_CONFIG.template);
  });

  it("should have valid default font family", () => {
    const validFonts: FontFamily[] = [
      "inter",
      "roboto",
      "poppins",
      "playfair",
      "noto-sans-kr",
      "noto-sans-jp",
    ];
    expect(validFonts).toContain(DEFAULT_OG_CONFIG.fontFamily);
  });

  it("should have valid text alignment", () => {
    const validAligns: TextAlign[] = ["left", "center", "right"];
    expect(validAligns).toContain(DEFAULT_OG_CONFIG.textAlign);
  });

  it("should have valid gradient direction", () => {
    const validDirections: GradientDirection[] = [
      "to-r",
      "to-l",
      "to-t",
      "to-b",
      "to-tr",
      "to-tl",
      "to-br",
      "to-bl",
    ];
    expect(validDirections).toContain(DEFAULT_OG_CONFIG.gradientDirection);
  });

  it("should have valid color formats", () => {
    const hexColorRegex = /^#[0-9a-fA-F]{6}$/;
    expect(DEFAULT_OG_CONFIG.backgroundColor).toMatch(hexColorRegex);
    expect(DEFAULT_OG_CONFIG.textColor).toMatch(hexColorRegex);
    expect(DEFAULT_OG_CONFIG.gradientFrom).toMatch(hexColorRegex);
    expect(DEFAULT_OG_CONFIG.gradientTo).toMatch(hexColorRegex);
    expect(DEFAULT_OG_CONFIG.accentColor).toMatch(hexColorRegex);
    expect(DEFAULT_OG_CONFIG.borderColor).toMatch(hexColorRegex);
  });

  it("should have positive font sizes", () => {
    expect(DEFAULT_OG_CONFIG.titleFontSize).toBeGreaterThan(0);
    expect(DEFAULT_OG_CONFIG.subtitleFontSize).toBeGreaterThan(0);
    expect(DEFAULT_OG_CONFIG.titleFontSize).toBeGreaterThan(
      DEFAULT_OG_CONFIG.subtitleFontSize,
    );
  });
});

describe("TEMPLATES", () => {
  it("should have 6 templates", () => {
    expect(TEMPLATES).toHaveLength(6);
  });

  it("should have all template types", () => {
    const templateIds = TEMPLATES.map((t) => t.id);
    expect(templateIds).toContain("basic");
    expect(templateIds).toContain("gradient");
    expect(templateIds).toContain("blog");
    expect(templateIds).toContain("product");
    expect(templateIds).toContain("social");
    expect(templateIds).toContain("minimal");
  });

  it("each template should have required properties", () => {
    TEMPLATES.forEach((template) => {
      expect(template).toHaveProperty("id");
      expect(template).toHaveProperty("name");
      expect(template).toHaveProperty("description");
      expect(template).toHaveProperty("defaultConfig");
      expect(template).toHaveProperty("preview");
    });
  });

  it("each template should have matching id in defaultConfig", () => {
    TEMPLATES.forEach((template) => {
      expect(template.defaultConfig.template).toBe(template.id);
    });
  });

  it("each template should have non-empty name and description", () => {
    TEMPLATES.forEach((template) => {
      expect(template.name.length).toBeGreaterThan(0);
      expect(template.description.length).toBeGreaterThan(0);
    });
  });
});

describe("GRADIENT_PRESETS", () => {
  it("should have 8 presets", () => {
    expect(GRADIENT_PRESETS).toHaveLength(8);
  });

  it("each preset should have name, from, and to colors", () => {
    GRADIENT_PRESETS.forEach((preset) => {
      expect(preset).toHaveProperty("name");
      expect(preset).toHaveProperty("from");
      expect(preset).toHaveProperty("to");
    });
  });

  it("each preset should have valid hex colors", () => {
    const hexColorRegex = /^#[0-9a-fA-F]{6}$/;
    GRADIENT_PRESETS.forEach((preset) => {
      expect(preset.from).toMatch(hexColorRegex);
      expect(preset.to).toMatch(hexColorRegex);
    });
  });

  it("each preset should have unique name", () => {
    const names = GRADIENT_PRESETS.map((p) => p.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});

describe("OG_SIZES", () => {
  it("should have 5 size options", () => {
    expect(OG_SIZES).toHaveLength(5);
  });

  it("each size should have name, width, and height", () => {
    OG_SIZES.forEach((size) => {
      expect(size).toHaveProperty("name");
      expect(size).toHaveProperty("width");
      expect(size).toHaveProperty("height");
    });
  });

  it("all sizes should have 1200px width", () => {
    OG_SIZES.forEach((size) => {
      expect(size.width).toBe(1200);
    });
  });

  it("all sizes should have valid dimensions", () => {
    OG_SIZES.forEach((size) => {
      expect(size.width).toBeGreaterThan(0);
      expect(size.height).toBeGreaterThan(0);
    });
  });

  it("should include standard OG image size (1200×630)", () => {
    const ogSize = OG_SIZES.find((s) => s.width === 1200 && s.height === 630);
    expect(ogSize).toBeDefined();
  });

  it("should include square size option", () => {
    const squareSize = OG_SIZES.find(
      (s) => s.width === 1200 && s.height === 1200,
    );
    expect(squareSize).toBeDefined();
  });
});

describe("FONT_CONFIGS", () => {
  const fontFamilies: FontFamily[] = [
    "inter",
    "roboto",
    "poppins",
    "playfair",
    "noto-sans-kr",
    "noto-sans-jp",
  ];

  it("should have 6 font configurations", () => {
    expect(Object.keys(FONT_CONFIGS)).toHaveLength(6);
  });

  it("should have configuration for each font family", () => {
    fontFamilies.forEach((font) => {
      expect(FONT_CONFIGS).toHaveProperty(font);
    });
  });

  it("each font config should have name, url, and weight", () => {
    fontFamilies.forEach((font) => {
      const config = FONT_CONFIGS[font];
      expect(config).toHaveProperty("name");
      expect(config).toHaveProperty("url");
      expect(config).toHaveProperty("weight");
    });
  });

  it("each font should have valid Google Fonts URL", () => {
    fontFamilies.forEach((font) => {
      const config = FONT_CONFIGS[font];
      expect(config.url).toMatch(/^https:\/\/fonts\.gstatic\.com\//);
      expect(config.url).toMatch(/\.woff2$/);
    });
  });

  it("each font should have valid weight", () => {
    fontFamilies.forEach((font) => {
      const config = FONT_CONFIGS[font];
      expect(config.weight).toBeGreaterThanOrEqual(100);
      expect(config.weight).toBeLessThanOrEqual(900);
    });
  });

  it("should include Korean and Japanese fonts", () => {
    expect(FONT_CONFIGS["noto-sans-kr"]).toBeDefined();
    expect(FONT_CONFIGS["noto-sans-jp"]).toBeDefined();
  });
});

describe("Type Guards and Helpers", () => {
  it("should validate OGImageConfig structure", () => {
    const config: OGImageConfig = {
      ...DEFAULT_OG_CONFIG,
      title: "Test Title",
    };

    expect(config.title).toBe("Test Title");
    expect(config.width).toBe(1200);
    expect(config.height).toBe(630);
  });

  it("should allow partial override of default config", () => {
    const customConfig: Partial<OGImageConfig> = {
      title: "Custom Title",
      backgroundColor: "#ff0000",
    };

    const merged: OGImageConfig = {
      ...DEFAULT_OG_CONFIG,
      ...customConfig,
    };

    expect(merged.title).toBe("Custom Title");
    expect(merged.backgroundColor).toBe("#ff0000");
    expect(merged.textColor).toBe("#ffffff"); // from default
  });

  it("template defaultConfig should be mergeable with DEFAULT_OG_CONFIG", () => {
    TEMPLATES.forEach((template) => {
      const merged: OGImageConfig = {
        ...DEFAULT_OG_CONFIG,
        ...template.defaultConfig,
      };

      expect(merged.width).toBe(1200);
      expect(merged.height).toBe(630);
      expect(merged.template).toBe(template.id);
    });
  });
});
