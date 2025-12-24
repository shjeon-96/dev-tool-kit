import type { Competitor, CompetitorSlug } from "./types";

export const competitors: Record<CompetitorSlug, Competitor> = {
  "jsonformatter-org": {
    slug: "jsonformatter-org",
    name: "JSONFormatter.org",
    url: "https://jsonformatter.org",
    description:
      "Popular online JSON formatter with server-side processing. Sends your data to external servers.",
    category: "json",
    comparisonPoints: [
      {
        feature: "Data Processing",
        webToolkit: "100% Client-side",
        competitor: "Server-side",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Data never leaves device",
        competitor: "Data sent to server",
        advantage: "web-toolkit",
      },
      {
        feature: "Offline Support",
        webToolkit: true,
        competitor: false,
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Error Detection",
        webToolkit: true,
        competitor: false,
        advantage: "web-toolkit",
      },
      {
        feature: "Multi-language UI",
        webToolkit: "EN, KO, JA",
        competitor: "EN only",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Count",
        webToolkit: "43+ tools",
        competitor: "JSON only",
        advantage: "web-toolkit",
      },
      {
        feature: "Ad Experience",
        webToolkit: "Minimal, non-intrusive",
        competitor: "Heavy advertising",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["json-formatter", "json-to-typescript"],
    weaknesses: [
      "Server-side processing exposes sensitive API keys and tokens",
      "No offline capability - requires constant internet",
      "Single-purpose tool with no related utilities",
      "Heavy advertising disrupts workflow",
      "No AI-generated code error detection",
    ],
    targetKeywords: [
      "jsonformatter.org alternative",
      "jsonformatter.org safe",
      "jsonformatter.org privacy",
      "json formatter no server",
      "secure json formatter",
      "offline json formatter",
    ],
    searchVolume: 2400,
  },

  cyberchef: {
    slug: "cyberchef",
    name: "CyberChef",
    url: "https://gchq.github.io/CyberChef",
    description:
      "GCHQ's versatile encoding/decoding tool. Powerful but complex interface not optimized for quick tasks.",
    category: "multi-tool",
    comparisonPoints: [
      {
        feature: "Ease of Use",
        webToolkit: "Simple, focused UI",
        competitor: "Complex recipe system",
        advantage: "web-toolkit",
      },
      {
        feature: "Learning Curve",
        webToolkit: "Instant use",
        competitor: "Requires training",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "ChatGPT/Claude error fixing",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Mobile Experience",
        webToolkit: "Fully responsive",
        competitor: "Desktop-focused",
        advantage: "web-toolkit",
      },
      {
        feature: "Operation Chaining",
        webToolkit: "Tool Pipeline feature",
        competitor: "Recipe system",
        advantage: "tie",
      },
      {
        feature: "Offline Support",
        webToolkit: true,
        competitor: true,
        advantage: "tie",
      },
      {
        feature: "Advanced Crypto",
        webToolkit: "Basic hashing",
        competitor: "Full crypto suite",
        advantage: "competitor",
      },
    ],
    overlappingTools: [
      "base64-converter",
      "hash-generator",
      "url-encoder",
      "json-formatter",
    ],
    weaknesses: [
      "Overwhelming interface for simple tasks",
      "No dedicated AI code error detection",
      "Poor mobile experience",
      "Steep learning curve for non-security professionals",
      "No multi-language support",
    ],
    targetKeywords: [
      "cyberchef alternative",
      "cyberchef simple",
      "cyberchef easy",
      "cyberchef for beginners",
      "cyberchef online alternative",
      "simple encoding tool",
    ],
    searchVolume: 1800,
  },

  devtoys: {
    slug: "devtoys",
    name: "DevToys",
    url: "https://devtoys.app",
    description:
      "Windows-only desktop application. Requires installation and doesn't work on Mac/Linux/mobile.",
    category: "desktop",
    comparisonPoints: [
      {
        feature: "Platform",
        webToolkit: "Any browser (all OS)",
        competitor: "Windows only",
        advantage: "web-toolkit",
      },
      {
        feature: "Installation",
        webToolkit: "No install needed",
        competitor: "Requires download",
        advantage: "web-toolkit",
      },
      {
        feature: "Mac/Linux Support",
        webToolkit: true,
        competitor: false,
        advantage: "web-toolkit",
      },
      {
        feature: "Mobile Support",
        webToolkit: true,
        competitor: false,
        advantage: "web-toolkit",
      },
      {
        feature: "Updates",
        webToolkit: "Always latest version",
        competitor: "Manual updates",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "ChatGPT/Claude fixing",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Client-side",
        competitor: "Local processing",
        advantage: "tie",
      },
    ],
    overlappingTools: [
      "json-formatter",
      "base64-converter",
      "hash-generator",
      "uuid-generator",
      "url-encoder",
    ],
    weaknesses: [
      "Windows-only excludes Mac and Linux developers",
      "Requires installation and updates",
      "No mobile access for on-the-go debugging",
      "No AI-generated code support",
      "Can't share tools across devices",
    ],
    targetKeywords: [
      "devtoys online",
      "devtoys web",
      "devtoys for mac",
      "devtoys alternative",
      "devtoys linux",
      "devtoys browser",
      "online developer tools",
    ],
    searchVolume: 3200,
  },

  "it-tools": {
    slug: "it-tools",
    name: "IT-Tools",
    url: "https://it-tools.tech",
    description:
      "Open-source collection of developer tools. Good variety but limited SEO and AI code support.",
    category: "online",
    comparisonPoints: [
      {
        feature: "AI Code Error Fixing",
        webToolkit: "Dedicated AI error pages",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "SEO Tools",
        webToolkit: "Meta tags, Schema, SERP preview",
        competitor: "Limited",
        advantage: "web-toolkit",
      },
      {
        feature: "PDF Tools",
        webToolkit: "Merge, split, compress",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Image AI",
        webToolkit: "Background remover, OCR",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Multi-language",
        webToolkit: "EN, KO, JA",
        competitor: "EN only",
        advantage: "web-toolkit",
      },
      {
        feature: "Open Source",
        webToolkit: false,
        competitor: true,
        advantage: "competitor",
      },
      {
        feature: "Self-hosting",
        webToolkit: false,
        competitor: true,
        advantage: "competitor",
      },
    ],
    overlappingTools: [
      "json-formatter",
      "base64-converter",
      "hash-generator",
      "uuid-generator",
      "qr-generator",
    ],
    weaknesses: [
      "No AI-generated code error detection",
      "Limited SEO and content tools",
      "No PDF or advanced image processing",
      "English-only interface",
      "No premium features or API access",
    ],
    targetKeywords: [
      "it-tools alternative",
      "it-tools.tech alternative",
      "better than it-tools",
      "it-tools with ai",
      "online dev tools",
    ],
    searchVolume: 1200,
  },

  "transform-tools": {
    slug: "transform-tools",
    name: "Transform.tools",
    url: "https://transform.tools",
    description:
      "Code transformation focused tool. Good for conversions but lacks utility tools and AI support.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Utility Tools",
        webToolkit: "43+ tools",
        competitor: "Conversions only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "Error detection & fixing",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Image Tools",
        webToolkit: "Resizer, QR, icons, OCR",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "SEO Tools",
        webToolkit: "Full suite",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Code Conversions",
        webToolkit: "JSON ↔ YAML/XML/CSV/TS",
        competitor: "Many formats",
        advantage: "tie",
      },
      {
        feature: "Privacy",
        webToolkit: "Client-side",
        competitor: "Client-side",
        advantage: "tie",
      },
    ],
    overlappingTools: [
      "json-formatter",
      "json-to-typescript",
      "css-to-tailwind",
    ],
    weaknesses: [
      "Limited to code transformations only",
      "No image or media tools",
      "No AI code error support",
      "No utility tools (QR, hash, UUID)",
      "No SEO or content tools",
    ],
    targetKeywords: [
      "transform.tools alternative",
      "transform tools alternative",
      "code converter online",
      "json to typescript online",
    ],
    searchVolume: 800,
  },

  jsonlint: {
    slug: "jsonlint",
    name: "JSONLint",
    url: "https://jsonlint.com",
    description:
      "Classic JSON validator with server-side processing. Privacy concerns and limited functionality.",
    category: "json",
    comparisonPoints: [
      {
        feature: "Data Processing",
        webToolkit: "100% Client-side",
        competitor: "Server-side",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Data never leaves device",
        competitor: "Data sent to server",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Variety",
        webToolkit: "43+ tools",
        competitor: "JSON validation only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Error Fixing",
        webToolkit: "ChatGPT/Claude support",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Offline Support",
        webToolkit: true,
        competitor: false,
        advantage: "web-toolkit",
      },
      {
        feature: "Error Messages",
        webToolkit: "Detailed with line numbers",
        competitor: "Basic",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["json-formatter"],
    weaknesses: [
      "Server-side processing - data privacy risk",
      "Only validates JSON, no other tools",
      "No AI-generated code error detection",
      "Outdated interface",
      "No offline capability",
    ],
    targetKeywords: [
      "jsonlint alternative",
      "jsonlint safe",
      "jsonlint privacy",
      "json validator offline",
      "secure json validator",
    ],
    searchVolume: 1600,
  },
};

export function getCompetitor(slug: CompetitorSlug): Competitor | undefined {
  return competitors[slug];
}

export function getCompetitorSlugs(): CompetitorSlug[] {
  return Object.keys(competitors) as CompetitorSlug[];
}

export function getAllCompetitors(): Competitor[] {
  return Object.values(competitors);
}
