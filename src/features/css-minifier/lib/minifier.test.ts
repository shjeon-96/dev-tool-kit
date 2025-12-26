/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { minifyCss, beautifyCss, type MinifyOptions } from "./minifier";

const defaultOptions: MinifyOptions = {
  removeComments: true,
  removeWhitespace: true,
  removeEmptyRules: true,
  mergeSelectors: true,
  shortenColors: true,
  shortenZeros: true,
};

describe("minifyCss", () => {
  describe("removeComments", () => {
    it("removes CSS comments", () => {
      const css = "/* comment */ .class { color: red; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.success).toBe(true);
      expect(result.output).not.toContain("comment");
    });

    it("removes multi-line comments", () => {
      const css = `
        /*
         * Multi-line
         * comment
         */
        .class { color: red; }
      `;
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.success).toBe(true);
      expect(result.output).not.toContain("Multi-line");
    });

    it("preserves comments when option is false", () => {
      const css = "/* keep me */ .class { color: red; }";
      const result = minifyCss(css, {
        ...defaultOptions,
        removeComments: false,
      });
      expect(result.output).toContain("keep me");
    });
  });

  describe("removeWhitespace", () => {
    it("removes unnecessary whitespace", () => {
      const css = ".class   {   color:   red;   }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.success).toBe(true);
      expect(result.output).toBe(".class{color:red}");
    });

    it("removes newlines", () => {
      const css = `.class {
        color: red;
        background: blue;
      }`;
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).not.toContain("\n");
    });
  });

  describe("removeEmptyRules", () => {
    it("removes empty rule blocks", () => {
      const css = ".empty {} .filled { color: red; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.success).toBe(true);
      expect(result.output).not.toContain("empty");
      expect(result.output).toContain("filled");
    });
  });

  describe("shortenColors", () => {
    it("shortens 6-digit hex to 3-digit when possible", () => {
      const css = ".class { color: #ffffff; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).toContain("#fff");
      expect(result.output).not.toContain("#ffffff");
    });

    it("keeps 6-digit hex when not shortenable", () => {
      const css = ".class { color: #123456; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).toContain("#123456");
    });

    it("converts color names to shorter hex", () => {
      const css = ".class { color: white; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).toContain("#fff");
    });

    it("converts rgb to hex", () => {
      const css = ".class { color: rgb(255, 255, 255); }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).toContain("#fff");
    });
  });

  describe("shortenZeros", () => {
    it("removes unit from zero values", () => {
      const css = ".class { margin: 0px; padding: 0em; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).toContain("margin:0");
      expect(result.output).toContain("padding:0");
    });

    it("shortens 0.5 to .5", () => {
      const css = ".class { opacity: 0.5; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).toContain(".5");
    });
  });

  describe("stats calculation", () => {
    it("returns correct stats", () => {
      const css = ".class { color: red; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.stats).toBeDefined();
      expect(result.stats!.originalSize).toBeGreaterThan(0);
      expect(result.stats!.minifiedSize).toBeLessThanOrEqual(
        result.stats!.originalSize,
      );
    });
  });

  describe("final cleanup", () => {
    it("removes trailing semicolons before closing brace", () => {
      const css = ".class { color: red; }";
      const result = minifyCss(css, { ...defaultOptions });
      expect(result.output).toBe(".class{color:red}");
    });
  });
});

describe("beautifyCss", () => {
  it("adds newlines and indentation", () => {
    const css = ".class{color:red;background:blue}";
    const result = beautifyCss(css);
    expect(result.success).toBe(true);
    expect(result.output).toContain("\n");
  });

  it("formats minified CSS readably", () => {
    const css = ".a{color:red}.b{color:blue}";
    const result = beautifyCss(css);
    expect(result.success).toBe(true);
    expect(result.output.split("\n").length).toBeGreaterThan(1);
  });
});
