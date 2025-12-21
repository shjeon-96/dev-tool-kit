/**
 * OG Image Generator Types
 */

/**
 * Template types for OG images
 */
export type TemplateType =
  | "basic"
  | "gradient"
  | "blog"
  | "product"
  | "social"
  | "minimal";

/**
 * Gradient directions
 */
export type GradientDirection =
  | "to-r"
  | "to-l"
  | "to-t"
  | "to-b"
  | "to-tr"
  | "to-tl"
  | "to-br"
  | "to-bl";

/**
 * Text alignment options
 */
export type TextAlign = "left" | "center" | "right";

/**
 * OG Image configuration
 */
export interface OGImageConfig {
  // Content
  title: string;
  subtitle?: string;
  description?: string;
  author?: string;
  siteName?: string;
  logoUrl?: string;

  // Styling
  template: TemplateType;
  backgroundColor: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDirection?: GradientDirection;
  textColor: string;
  accentColor?: string;

  // Typography
  titleFontSize: number;
  subtitleFontSize: number;
  fontFamily: FontFamily;
  textAlign: TextAlign;

  // Dimensions
  width: number;
  height: number;

  // Additional
  showBorder?: boolean;
  borderColor?: string;
  borderRadius?: number;
  pattern?: PatternType;
}

/**
 * Font families available
 */
export type FontFamily =
  | "inter"
  | "roboto"
  | "poppins"
  | "playfair"
  | "noto-sans-kr"
  | "noto-sans-jp";

/**
 * Background patterns
 */
export type PatternType = "none" | "dots" | "grid" | "waves" | "noise";

/**
 * Template configuration
 */
export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  defaultConfig: Partial<OGImageConfig>;
  preview: string; // Preview color/gradient
}

/**
 * Default OG image configuration
 */
export const DEFAULT_OG_CONFIG: OGImageConfig = {
  title: "Your Title Here",
  subtitle: "",
  description: "",
  author: "",
  siteName: "",
  logoUrl: "",
  template: "gradient",
  backgroundColor: "#1a1a2e",
  gradientFrom: "#667eea",
  gradientTo: "#764ba2",
  gradientDirection: "to-br",
  textColor: "#ffffff",
  accentColor: "#fbbf24",
  titleFontSize: 64,
  subtitleFontSize: 32,
  fontFamily: "inter",
  textAlign: "center",
  width: 1200,
  height: 630,
  showBorder: false,
  borderColor: "#ffffff",
  borderRadius: 0,
  pattern: "none",
};

/**
 * Available templates
 */
export const TEMPLATES: TemplateConfig[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Simple solid background with text",
    defaultConfig: {
      backgroundColor: "#1a1a2e",
      textColor: "#ffffff",
      template: "basic",
    },
    preview: "#1a1a2e",
  },
  {
    id: "gradient",
    name: "Gradient",
    description: "Colorful gradient background",
    defaultConfig: {
      gradientFrom: "#667eea",
      gradientTo: "#764ba2",
      gradientDirection: "to-br",
      textColor: "#ffffff",
      template: "gradient",
    },
    preview: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  {
    id: "blog",
    name: "Blog Post",
    description: "Perfect for blog articles",
    defaultConfig: {
      backgroundColor: "#0f172a",
      gradientFrom: "#0ea5e9",
      gradientTo: "#8b5cf6",
      gradientDirection: "to-r",
      textColor: "#ffffff",
      template: "blog",
    },
    preview: "linear-gradient(90deg, #0ea5e9, #8b5cf6)",
  },
  {
    id: "product",
    name: "Product",
    description: "Showcase your product",
    defaultConfig: {
      backgroundColor: "#ffffff",
      textColor: "#1a1a2e",
      accentColor: "#f59e0b",
      template: "product",
    },
    preview: "#ffffff",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Eye-catching social posts",
    defaultConfig: {
      gradientFrom: "#ec4899",
      gradientTo: "#f97316",
      gradientDirection: "to-tr",
      textColor: "#ffffff",
      template: "social",
    },
    preview: "linear-gradient(45deg, #ec4899, #f97316)",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and minimal design",
    defaultConfig: {
      backgroundColor: "#fafafa",
      textColor: "#171717",
      showBorder: true,
      borderColor: "#e5e5e5",
      template: "minimal",
    },
    preview: "#fafafa",
  },
];

/**
 * Preset gradient options
 */
export const GRADIENT_PRESETS = [
  { name: "Sunset", from: "#f97316", to: "#ec4899" },
  { name: "Ocean", from: "#0ea5e9", to: "#6366f1" },
  { name: "Forest", from: "#22c55e", to: "#14b8a6" },
  { name: "Purple", from: "#a855f7", to: "#6366f1" },
  { name: "Fire", from: "#ef4444", to: "#f97316" },
  { name: "Midnight", from: "#1e3a8a", to: "#7c3aed" },
  { name: "Gold", from: "#fbbf24", to: "#f59e0b" },
  { name: "Dark", from: "#1f2937", to: "#111827" },
];

/**
 * Standard OG image sizes
 */
export const OG_SIZES = [
  { name: "OG Image (1200×630)", width: 1200, height: 630 },
  { name: "Twitter Card (1200×600)", width: 1200, height: 600 },
  { name: "Facebook (1200×630)", width: 1200, height: 630 },
  { name: "LinkedIn (1200×627)", width: 1200, height: 627 },
  { name: "Square (1200×1200)", width: 1200, height: 1200 },
];

/**
 * Font configurations for loading
 */
export const FONT_CONFIGS: Record<
  FontFamily,
  { name: string; url: string; weight: number }
> = {
  inter: {
    name: "Inter",
    url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2",
    weight: 700,
  },
  roboto: {
    name: "Roboto",
    url: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2",
    weight: 700,
  },
  poppins: {
    name: "Poppins",
    url: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
    weight: 700,
  },
  playfair: {
    name: "Playfair Display",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDTbtPY_Q.woff2",
    weight: 700,
  },
  "noto-sans-kr": {
    name: "Noto Sans KR",
    url: "https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuozeLTq8H4hfeE.woff2",
    weight: 700,
  },
  "noto-sans-jp": {
    name: "Noto Sans JP",
    url: "https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.woff2",
    weight: 700,
  },
};
