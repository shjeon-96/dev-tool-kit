import type { Guide } from "../model/types";

export const qrGeneratorGuide: Guide = {
  slug: "qr-generator",
  sections: [
    {
      id: "what-is-qr-code",
      titleKey: "guides.qr-generator.sections.whatIs.title",
      contentKey: "guides.qr-generator.sections.whatIs.content",
    },
    {
      id: "qr-types",
      titleKey: "guides.qr-generator.sections.qrTypes.title",
      contentKey: "guides.qr-generator.sections.qrTypes.content",
      code: `// URL QR Code
https://example.com

// WiFi QR Code format
WIFI:T:WPA;S:NetworkName;P:Password;;

// vCard QR Code format
BEGIN:VCARD
VERSION:3.0
N:Doe;John
TEL:+1234567890
EMAIL:john@example.com
END:VCARD`,
      language: "text",
    },
    {
      id: "how-to-use",
      titleKey: "guides.qr-generator.sections.howToUse.title",
      contentKey: "guides.qr-generator.sections.howToUse.content",
    },
    {
      id: "customization",
      titleKey: "guides.qr-generator.sections.customization.title",
      contentKey: "guides.qr-generator.sections.customization.content",
    },
    {
      id: "best-practices",
      titleKey: "guides.qr-generator.sections.bestPractices.title",
      contentKey: "guides.qr-generator.sections.bestPractices.content",
    },
  ],
  relatedTools: ["url-encoder", "base64-converter", "app-icon-generator"],
  keywords: [
    "qr code generator free",
    "wifi qr code generator",
    "qr code with logo",
    "vcard qr code",
    "custom qr code",
    "qr code color",
    "qr code download png svg",
  ],
  difficulty: "beginner",
  readTime: 4,
};
