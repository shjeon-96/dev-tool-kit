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

  // ============================================================
  // JSON & Code Tools (4개 추가)
  // ============================================================

  codebeautify: {
    slug: "codebeautify",
    name: "CodeBeautify",
    url: "https://codebeautify.org",
    description:
      "Popular code formatting site with many tools. Server-side processing and heavy advertising.",
    category: "online",
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
        feature: "Ad Experience",
        webToolkit: "Minimal ads",
        competitor: "Heavy advertising",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "AI error detection",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "100+ tools",
        advantage: "competitor",
      },
      {
        feature: "Page Speed",
        webToolkit: "Fast (client-side)",
        competitor: "Slow (server round-trip)",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: [
      "json-formatter",
      "sql-formatter",
      "html-entity",
      "base64-converter",
      "url-encoder",
    ],
    weaknesses: [
      "Server-side processing exposes sensitive data",
      "Heavy advertising disrupts workflow",
      "Slow page loads due to server processing",
      "No AI-generated code error support",
      "No offline capability",
    ],
    targetKeywords: [
      "codebeautify alternative",
      "codebeautify safe",
      "codebeautify privacy",
      "code beautifier offline",
      "codebeautify no ads",
    ],
    searchVolume: 4500,
  },

  freeformatter: {
    slug: "freeformatter",
    name: "FreeFormatter",
    url: "https://www.freeformatter.com",
    description:
      "Collection of online formatters and converters. Server-side processing with privacy concerns.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Data Processing",
        webToolkit: "100% Client-side",
        competitor: "Server-side",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Local processing",
        competitor: "Data uploaded to server",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Error Fixing",
        webToolkit: "ChatGPT/Claude support",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Modern UI",
        webToolkit: "Clean, responsive",
        competitor: "Dated interface",
        advantage: "web-toolkit",
      },
      {
        feature: "Offline Support",
        webToolkit: true,
        competitor: false,
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: [
      "json-formatter",
      "sql-formatter",
      "cron-parser",
      "hash-generator",
    ],
    weaknesses: [
      "Server-side processing - data privacy risk",
      "Outdated user interface",
      "No AI code error detection",
      "Requires internet connection",
      "Limited mobile experience",
    ],
    targetKeywords: [
      "freeformatter alternative",
      "freeformatter safe",
      "freeformatter offline",
      "free formatter privacy",
      "online formatter secure",
    ],
    searchVolume: 2100,
  },

  "beautifier-io": {
    slug: "beautifier-io",
    name: "Beautifier.io",
    url: "https://beautifier.io",
    description:
      "Simple code beautifier for JS/CSS/HTML. Limited functionality focused only on formatting.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "3 tools only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "AI error detection",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Code Languages",
        webToolkit: "JS, CSS, HTML, SQL, JSON",
        competitor: "JS, CSS, HTML only",
        advantage: "web-toolkit",
      },
      {
        feature: "Formatting Options",
        webToolkit: "Extensive Prettier options",
        competitor: "Limited options",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Client-side",
        competitor: "Client-side",
        advantage: "tie",
      },
    ],
    overlappingTools: ["prettier-playground", "css-minifier"],
    weaknesses: [
      "Very limited tool selection (3 tools)",
      "No JSON, SQL, or other formatters",
      "No AI-generated code support",
      "No utility tools",
      "Minimal customization options",
    ],
    targetKeywords: [
      "beautifier.io alternative",
      "js beautifier online",
      "code beautifier tool",
      "html beautifier alternative",
    ],
    searchVolume: 1400,
  },

  jsoncrack: {
    slug: "jsoncrack",
    name: "JSON Crack",
    url: "https://jsoncrack.com",
    description:
      "Visual JSON explorer with graph visualization. Great for visualization but limited editing.",
    category: "json",
    comparisonPoints: [
      {
        feature: "Visualization",
        webToolkit: "Tree view",
        competitor: "Graph visualization",
        advantage: "competitor",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "JSON only",
        advantage: "web-toolkit",
      },
      {
        feature: "Editing Capability",
        webToolkit: "Full editor",
        competitor: "View only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Error Fixing",
        webToolkit: "ChatGPT/Claude support",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Free Tier",
        webToolkit: "Unlimited",
        competitor: "Limited features",
        advantage: "web-toolkit",
      },
      {
        feature: "Large Files",
        webToolkit: "Good performance",
        competitor: "Slow with large JSON",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["json-formatter"],
    weaknesses: [
      "JSON visualization only, no editing",
      "Paid features for advanced use",
      "Slow performance with large files",
      "No AI code error detection",
      "No other developer tools",
    ],
    targetKeywords: [
      "jsoncrack alternative",
      "json crack free",
      "json visualizer alternative",
      "json graph tool free",
    ],
    searchVolume: 2800,
  },

  // ============================================================
  // API & Developer Tools (3개 추가)
  // ============================================================

  "jwt-io": {
    slug: "jwt-io",
    name: "JWT.io",
    url: "https://jwt.io",
    description:
      "Auth0's JWT decoder and verifier. Good for JWT but single-purpose tool with server validation.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "JWT only",
        advantage: "web-toolkit",
      },
      {
        feature: "Data Processing",
        webToolkit: "100% Client-side",
        competitor: "Signature verification server-side",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Error Fixing",
        webToolkit: "AI token error detection",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "JWT Decoding",
        webToolkit: "Full decode + claims",
        competitor: "Full decode + verify",
        advantage: "tie",
      },
      {
        feature: "Related Tools",
        webToolkit: "Base64, Hash, UUID nearby",
        competitor: "JWT only",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["jwt-decoder"],
    weaknesses: [
      "Single-purpose JWT tool only",
      "Server-side signature verification",
      "No AI-generated token error support",
      "No related security tools",
      "Limited to JWT debugging",
    ],
    targetKeywords: [
      "jwt.io alternative",
      "jwt decoder offline",
      "jwt decoder privacy",
      "jwt tool alternative",
      "decode jwt secure",
    ],
    searchVolume: 6200,
  },

  regex101: {
    slug: "regex101",
    name: "Regex101",
    url: "https://regex101.com",
    description:
      "Comprehensive regex tester with explanation. Excellent but server-side with account features.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Data Processing",
        webToolkit: "100% Client-side",
        competitor: "Server-side matching",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Local processing",
        competitor: "Patterns saved on server",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "Regex only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "AI regex error detection",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Regex Explanation",
        webToolkit: "Basic",
        competitor: "Detailed breakdown",
        advantage: "competitor",
      },
      {
        feature: "Language Support",
        webToolkit: "JavaScript",
        competitor: "Multiple languages",
        advantage: "competitor",
      },
    ],
    overlappingTools: ["regex-tester"],
    weaknesses: [
      "Server-side processing - patterns may be stored",
      "Account required for saving patterns",
      "No AI-generated regex error support",
      "No related developer tools",
      "Complex interface for simple tests",
    ],
    targetKeywords: [
      "regex101 alternative",
      "regex tester offline",
      "regex tester privacy",
      "regex101 without account",
      "simple regex tester",
    ],
    searchVolume: 8500,
  },

  reqbin: {
    slug: "reqbin",
    name: "ReqBin",
    url: "https://reqbin.com",
    description:
      "Online HTTP request tester. Server-side requests with potential data exposure.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Request Privacy",
        webToolkit: "Client-side curl builder",
        competitor: "Server proxies requests",
        advantage: "web-toolkit",
      },
      {
        feature: "API Key Safety",
        webToolkit: "Keys never leave device",
        competitor: "Keys sent through server",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "HTTP testing only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "AI curl error detection",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Request Execution",
        webToolkit: "Build only (safe)",
        competitor: "Execute requests",
        advantage: "tie",
      },
    ],
    overlappingTools: ["curl-builder"],
    weaknesses: [
      "Server-side request execution exposes API keys",
      "Potential credential logging",
      "No AI-generated request error support",
      "Single-purpose HTTP tool",
      "Privacy concerns with sensitive APIs",
    ],
    targetKeywords: [
      "reqbin alternative",
      "http tester safe",
      "api tester privacy",
      "curl builder online",
      "reqbin secure alternative",
    ],
    searchVolume: 3400,
  },

  // ============================================================
  // Encoding & Security Tools (3개 추가)
  // ============================================================

  base64decode: {
    slug: "base64decode",
    name: "Base64Decode.org",
    url: "https://www.base64decode.org",
    description:
      "Simple Base64 encoder/decoder. Server-side processing with privacy concerns.",
    category: "online",
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
        webToolkit: "44+ tools",
        competitor: "Base64 only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Error Fixing",
        webToolkit: "AI encoding error support",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Offline Support",
        webToolkit: true,
        competitor: false,
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["base64-converter"],
    weaknesses: [
      "Server-side processing - data exposure risk",
      "Single-purpose Base64 tool",
      "No AI code error detection",
      "No related encoding tools",
      "No offline capability",
    ],
    targetKeywords: [
      "base64decode alternative",
      "base64 decoder offline",
      "base64 encoder privacy",
      "secure base64 decoder",
      "base64 tool offline",
    ],
    searchVolume: 4800,
  },

  md5hashgenerator: {
    slug: "md5hashgenerator",
    name: "MD5HashGenerator",
    url: "https://www.md5hashgenerator.com",
    description:
      "MD5 hash generator with server-side processing. Privacy concerns for sensitive data hashing.",
    category: "online",
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
        competitor: "Data sent for hashing",
        advantage: "web-toolkit",
      },
      {
        feature: "Hash Algorithms",
        webToolkit: "MD5, SHA-1, SHA-256, SHA-512",
        competitor: "MD5 only",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "MD5 only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Error Support",
        webToolkit: "AI hash error detection",
        competitor: "None",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["hash-generator"],
    weaknesses: [
      "Server-side hashing - potential data logging",
      "MD5 only, no other hash algorithms",
      "No AI-generated code support",
      "No related security tools",
      "Outdated interface",
    ],
    targetKeywords: [
      "md5 generator alternative",
      "md5 hash offline",
      "hash generator privacy",
      "secure hash generator",
      "md5 generator no server",
    ],
    searchVolume: 2600,
  },

  "uuidgenerator-net": {
    slug: "uuidgenerator-net",
    name: "UUIDGenerator.net",
    url: "https://www.uuidgenerator.net",
    description:
      "Online UUID generator. Server-side generation with potential predictability concerns.",
    category: "online",
    comparisonPoints: [
      {
        feature: "UUID Generation",
        webToolkit: "Client-side (secure)",
        competitor: "Server-side",
        advantage: "web-toolkit",
      },
      {
        feature: "Randomness",
        webToolkit: "Crypto.randomUUID()",
        competitor: "Server random",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "UUID only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "AI UUID error detection",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Bulk Generation",
        webToolkit: true,
        competitor: true,
        advantage: "tie",
      },
    ],
    overlappingTools: ["uuid-generator"],
    weaknesses: [
      "Server-side generation - potential logging",
      "UUID only, no other ID formats",
      "No AI code error detection",
      "No related developer tools",
      "Simple functionality",
    ],
    targetKeywords: [
      "uuid generator alternative",
      "uuid generator offline",
      "secure uuid generator",
      "uuid v4 generator local",
      "uuid generator privacy",
    ],
    searchVolume: 1900,
  },

  // ============================================================
  // Image & Media Tools (4개 추가)
  // ============================================================

  tinypng: {
    slug: "tinypng",
    name: "TinyPNG",
    url: "https://tinypng.com",
    description:
      "Popular image compression service. Server-side processing with file upload requirements.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Data Processing",
        webToolkit: "100% Client-side",
        competitor: "Server-side upload",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Images never leave device",
        competitor: "Images uploaded to server",
        advantage: "web-toolkit",
      },
      {
        feature: "Free Tier",
        webToolkit: "Unlimited",
        competitor: "20 images/month",
        advantage: "web-toolkit",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "Image compression only",
        advantage: "web-toolkit",
      },
      {
        feature: "Compression Quality",
        webToolkit: "Good",
        competitor: "Excellent",
        advantage: "competitor",
      },
      {
        feature: "Bulk Processing",
        webToolkit: "Unlimited batch",
        competitor: "20 files limit",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["image-resizer", "image-converter"],
    weaknesses: [
      "Server-side upload - privacy concerns",
      "Limited free tier (20 images)",
      "No AI code error support",
      "Single-purpose image tool",
      "Requires uploading sensitive images",
    ],
    targetKeywords: [
      "tinypng alternative",
      "tinypng offline",
      "image compressor privacy",
      "compress image local",
      "tinypng free alternative",
    ],
    searchVolume: 7200,
  },

  squoosh: {
    slug: "squoosh",
    name: "Squoosh",
    url: "https://squoosh.app",
    description:
      "Google's image optimization app. Excellent but limited to image compression only.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Privacy",
        webToolkit: "Client-side",
        competitor: "Client-side",
        advantage: "tie",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "Image compression only",
        advantage: "web-toolkit",
      },
      {
        feature: "AI Code Support",
        webToolkit: "AI image code errors",
        competitor: "None",
        advantage: "web-toolkit",
      },
      {
        feature: "Format Support",
        webToolkit: "Common formats",
        competitor: "Extensive formats",
        advantage: "competitor",
      },
      {
        feature: "Compression Options",
        webToolkit: "Basic",
        competitor: "Advanced codecs",
        advantage: "competitor",
      },
      {
        feature: "Related Tools",
        webToolkit: "QR, icons, OCR, etc.",
        competitor: "None",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["image-resizer", "image-converter"],
    weaknesses: [
      "Image compression only, no other tools",
      "No AI code error detection",
      "No QR, icon, or utility tools",
      "Complex interface for simple tasks",
      "No batch processing",
    ],
    targetKeywords: [
      "squoosh alternative",
      "squoosh with more tools",
      "image optimizer all-in-one",
      "squoosh like tool",
      "google image optimizer alternative",
    ],
    searchVolume: 3800,
  },

  "remove-bg": {
    slug: "remove-bg",
    name: "Remove.bg",
    url: "https://www.remove.bg",
    description:
      "AI background removal service. Server-side processing with limited free usage.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Data Processing",
        webToolkit: "100% Client-side AI",
        competitor: "Server-side",
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "Images never leave device",
        competitor: "Images uploaded to server",
        advantage: "web-toolkit",
      },
      {
        feature: "Free Tier",
        webToolkit: "Unlimited",
        competitor: "1 free/month + watermark",
        advantage: "web-toolkit",
      },
      {
        feature: "Quality",
        webToolkit: "Good (WebGPU AI)",
        competitor: "Excellent",
        advantage: "competitor",
      },
      {
        feature: "Tool Variety",
        webToolkit: "44+ tools",
        competitor: "BG removal only",
        advantage: "web-toolkit",
      },
    ],
    overlappingTools: ["bg-remover"],
    weaknesses: [
      "Server-side upload - privacy concerns",
      "Very limited free tier (1 image)",
      "No AI code error detection",
      "Expensive for regular use",
      "Single-purpose tool",
    ],
    targetKeywords: [
      "remove.bg alternative",
      "remove bg free",
      "background remover offline",
      "remove bg privacy",
      "bg remover no upload",
    ],
    searchVolume: 12000,
  },

  canva: {
    slug: "canva",
    name: "Canva",
    url: "https://www.canva.com",
    description:
      "Design platform with many features. Account required, cloud-based, overkill for simple tasks.",
    category: "online",
    comparisonPoints: [
      {
        feature: "Account Required",
        webToolkit: false,
        competitor: true,
        advantage: "web-toolkit",
      },
      {
        feature: "Privacy",
        webToolkit: "No account, no tracking",
        competitor: "Account + cloud storage",
        advantage: "web-toolkit",
      },
      {
        feature: "Quick Tasks",
        webToolkit: "Instant use",
        competitor: "Sign up required",
        advantage: "web-toolkit",
      },
      {
        feature: "Developer Focus",
        webToolkit: "Developer tools",
        competitor: "Design focus",
        advantage: "web-toolkit",
      },
      {
        feature: "Design Features",
        webToolkit: "Basic",
        competitor: "Comprehensive",
        advantage: "competitor",
      },
      {
        feature: "Templates",
        webToolkit: "OG image templates",
        competitor: "Millions of templates",
        advantage: "competitor",
      },
    ],
    overlappingTools: ["og-generator", "qr-generator", "image-resizer"],
    weaknesses: [
      "Requires account creation",
      "Overkill for simple developer tasks",
      "No AI code error detection",
      "Not developer-focused",
      "Cloud-based with privacy concerns",
    ],
    targetKeywords: [
      "canva alternative for developers",
      "canva og image generator",
      "simple og generator",
      "canva without account",
      "quick image tool",
    ],
    searchVolume: 18000,
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
