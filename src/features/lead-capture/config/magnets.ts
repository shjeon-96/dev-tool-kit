export interface LeadMagnetConfig {
  titleKey: string; // i18n key
  descriptionKey: string; // i18n key
  fileUrl: string;
  personaTag: string;
  toolSlugs: string[]; // 관련 도구들
}

export const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  "developer-toolkit": {
    titleKey: "leadMagnets.developerToolkit.title",
    descriptionKey: "leadMagnets.developerToolkit.description",
    fileUrl: "/lead-magnets/developer-toolkit-checklist.pdf",
    personaTag: "developer",
    toolSlugs: [
      "json-formatter",
      "jwt-decoder",
      "base64-converter",
      "hash-generator",
      "url-encoder",
      "regex-tester",
    ],
  },
  "api-debugging": {
    titleKey: "leadMagnets.apiDebugging.title",
    descriptionKey: "leadMagnets.apiDebugging.description",
    fileUrl: "/lead-magnets/api-debugging-guide.pdf",
    personaTag: "backend-developer",
    toolSlugs: ["json-formatter", "jwt-decoder", "curl-builder", "url-parser"],
  },
  "image-optimization": {
    titleKey: "leadMagnets.imageOptimization.title",
    descriptionKey: "leadMagnets.imageOptimization.description",
    fileUrl: "/lead-magnets/image-optimization-guide.pdf",
    personaTag: "designer",
    toolSlugs: [
      "image-resizer",
      "svg-optimizer",
      "app-icon-generator",
      "qr-generator",
    ],
  },
  "security-checklist": {
    titleKey: "leadMagnets.securityChecklist.title",
    descriptionKey: "leadMagnets.securityChecklist.description",
    fileUrl: "/lead-magnets/security-checklist.pdf",
    personaTag: "security",
    toolSlugs: ["hash-generator", "uuid-generator", "base64-converter"],
  },
  "frontend-resources": {
    titleKey: "leadMagnets.frontendResources.title",
    descriptionKey: "leadMagnets.frontendResources.description",
    fileUrl: "/lead-magnets/frontend-resources.pdf",
    personaTag: "frontend-developer",
    toolSlugs: [
      "color-picker",
      "gradient-generator",
      "box-shadow",
      "css-to-tailwind",
    ],
  },
};

/**
 * 도구 slug로 해당하는 Lead Magnet 찾기
 */
export function getLeadMagnetForTool(
  toolSlug: string,
): LeadMagnetConfig | null {
  for (const [, config] of Object.entries(LEAD_MAGNETS)) {
    if (config.toolSlugs.includes(toolSlug)) {
      return config;
    }
  }
  return null;
}

/**
 * Lead Magnet ID 가져오기
 */
export function getLeadMagnetId(toolSlug: string): string | null {
  for (const [id, config] of Object.entries(LEAD_MAGNETS)) {
    if (config.toolSlugs.includes(toolSlug)) {
      return id;
    }
  }
  return null;
}
