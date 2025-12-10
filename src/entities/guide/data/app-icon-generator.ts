import type { Guide } from "../model/types";

export const appIconGeneratorGuide: Guide = {
  slug: "app-icon-generator",
  sections: [
    {
      id: "what-is-app-icon",
      titleKey: "guides.app-icon-generator.sections.whatIs.title",
      contentKey: "guides.app-icon-generator.sections.whatIs.content",
    },
    {
      id: "icon-sizes",
      titleKey: "guides.app-icon-generator.sections.iconSizes.title",
      contentKey: "guides.app-icon-generator.sections.iconSizes.content",
      code: `// iOS App Icon Sizes
1024x1024  - App Store
180x180    - iPhone @3x
120x120    - iPhone @2x
167x167    - iPad Pro
152x152    - iPad @2x

// Android App Icon Sizes
512x512    - Play Store
192x192    - xxxhdpi
144x144    - xxhdpi
96x96      - xhdpi
72x72      - hdpi
48x48      - mdpi

// Favicon Sizes
16x16, 32x32, 48x48
180x180    - Apple Touch Icon
192x192    - Android Chrome`,
      language: "text",
    },
    {
      id: "how-to-use",
      titleKey: "guides.app-icon-generator.sections.howToUse.title",
      contentKey: "guides.app-icon-generator.sections.howToUse.content",
    },
    {
      id: "design-tips",
      titleKey: "guides.app-icon-generator.sections.designTips.title",
      contentKey: "guides.app-icon-generator.sections.designTips.content",
    },
  ],
  relatedTools: ["image-resizer", "svg-optimizer", "qr-generator"],
  keywords: [
    "app icon generator",
    "ios app icon sizes",
    "android app icon sizes",
    "favicon generator",
    "app store icon",
    "pwa icon generator",
    "apple touch icon",
  ],
  difficulty: "beginner",
  readTime: 5,
};
