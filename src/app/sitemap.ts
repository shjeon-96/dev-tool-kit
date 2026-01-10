import { getToolSlugs, categoryConfig } from "@/entities/tool";
import { CHEATSHEET_SLUGS, type CheatsheetSlug } from "@/entities/cheatsheet";
import { getGuideSlugs } from "@/entities/guide";
import { getAllConversionSlugs } from "@/entities/converter";
import { getUseCaseSlugs } from "@/entities/use-case";
import { getComparisonSlugs } from "@/entities/comparison";
import { getAllHashTypeSlugs } from "@/entities/hash-type";
import { getAllEncodeDecodeTypeSlugs } from "@/entities/encode-decode-type";
import { getAllResizeTargetSlugs } from "@/entities/image-resize-target";
import { getAllFormatTypeSlugs } from "@/entities/format-type";
import { getAllGenerateTypeSlugs } from "@/entities/generate-type";
import { getAllMinifyTypeSlugs } from "@/entities/minify-type";
import { getAllValidateTypeSlugs } from "@/entities/validate-type";
import { getAllDiffTypeSlugs } from "@/entities/diff-type";
import { getAllPosts } from "@/entities/post";
import { getAllHowToSlugs } from "@/entities/how-to";
import { getAllVsSlugs } from "@/entities/vs";
import { getAllForSlugs } from "@/entities/for";
import { getAllLanguageTypeSlugs } from "@/entities/language-type";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://web-toolkit.app";
  const tools = getToolSlugs();
  const cheatsheets: CheatsheetSlug[] = [...CHEATSHEET_SLUGS];
  const locales = routing.locales;

  const entries: MetadataRoute.Sitemap = [];

  // Root URL
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${baseUrl}/${locale}`]),
      ),
    },
  });

  // Tools listing page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/tools`]),
        ),
      },
    });
  }

  // About page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/about`]),
        ),
      },
    });
  }

  // Privacy page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/privacy`]),
        ),
      },
    });
  }

  // Terms page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/terms`]),
        ),
      },
    });
  }

  // API Documentation page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/docs/api`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/docs/api`]),
        ),
      },
    });
  }

  // Tool pages for each locale
  for (const slug of tools) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/tools/${slug}`]),
          ),
        },
      });
    }
  }

  // Tool category hub pages for each locale
  const categories = Object.keys(categoryConfig);
  for (const category of categories) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/tools/category/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${baseUrl}/${l}/tools/category/${category}`,
            ]),
          ),
        },
      });
    }
  }

  // Cheatsheets listing page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/cheatsheets`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/cheatsheets`]),
        ),
      },
    });
  }

  // Cheatsheet pages for each locale
  for (const slug of cheatsheets) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/cheatsheets/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/cheatsheets/${slug}`]),
          ),
        },
      });
    }
  }

  // Guides listing page for each locale
  const guides = getGuideSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/guides`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/guides`]),
        ),
      },
    });
  }

  // Guide pages for each locale
  for (const slug of guides) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/guides/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/guides/${slug}`]),
          ),
        },
      });
    }
  }

  // Converters listing page for each locale
  const converters = getAllConversionSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/convert`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/convert`]),
        ),
      },
    });
  }

  // Converter pages for each locale
  for (const slug of converters) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/convert/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/convert/${slug}`]),
          ),
        },
      });
    }
  }

  // Use Cases listing page for each locale
  const useCases = getUseCaseSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/use-cases`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/use-cases`]),
        ),
      },
    });
  }

  // Use Case pages for each locale
  for (const slug of useCases) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/use-cases/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/use-cases/${slug}`]),
          ),
        },
      });
    }
  }

  // Compare listing page for each locale
  const comparisons = getComparisonSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/compare`]),
        ),
      },
    });
  }

  // Compare pages for each locale
  for (const slug of comparisons) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/compare/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/compare/${slug}`]),
          ),
        },
      });
    }
  }

  // Hash type pages (pSEO)
  const hashTypes = getAllHashTypeSlugs();
  for (const slug of hashTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/hash/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/hash/${slug}`]),
          ),
        },
      });
    }
  }

  // Encode type pages (pSEO)
  const encodeDecodeTypes = getAllEncodeDecodeTypeSlugs();
  for (const slug of encodeDecodeTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/encode/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/encode/${slug}`]),
          ),
        },
      });
    }
  }

  // Decode type pages (pSEO)
  for (const slug of encodeDecodeTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/decode/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/decode/${slug}`]),
          ),
        },
      });
    }
  }

  // Image resize target pages (pSEO)
  const resizeTargets = getAllResizeTargetSlugs();
  for (const slug of resizeTargets) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/resize-to/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/resize-to/${slug}`]),
          ),
        },
      });
    }
  }

  // Format type pages (pSEO)
  const formatTypes = getAllFormatTypeSlugs();
  for (const slug of formatTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/format/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/format/${slug}`]),
          ),
        },
      });
    }
  }

  // Generate type pages (pSEO)
  const generateTypes = getAllGenerateTypeSlugs();
  for (const slug of generateTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/generate/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/generate/${slug}`]),
          ),
        },
      });
    }
  }

  // Minify type pages (pSEO)
  const minifyTypes = getAllMinifyTypeSlugs();
  for (const slug of minifyTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/minify/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/minify/${slug}`]),
          ),
        },
      });
    }
  }

  // Validate type pages (pSEO)
  const validateTypes = getAllValidateTypeSlugs();
  for (const slug of validateTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/validate/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/validate/${slug}`]),
          ),
        },
      });
    }
  }

  // Diff type pages (pSEO)
  const diffTypes = getAllDiffTypeSlugs();
  for (const slug of diffTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/diff/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/diff/${slug}`]),
          ),
        },
      });
    }
  }

  // How-To listing page for each locale (pSEO)
  const howTos = getAllHowToSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/how-to`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/how-to`]),
        ),
      },
    });
  }

  // How-To pages for each locale (pSEO)
  for (const slug of howTos) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/how-to/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/how-to/${slug}`]),
          ),
        },
      });
    }
  }

  // VS Comparison listing page for each locale (pSEO)
  const vsComparisons = getAllVsSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/vs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/vs`]),
        ),
      },
    });
  }

  // VS Comparison pages for each locale (pSEO)
  for (const slug of vsComparisons) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/vs/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/vs/${slug}`]),
          ),
        },
      });
    }
  }

  // For Use-Case listing page for each locale (pSEO)
  const forUseCases = getAllForSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/for`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/for`]),
        ),
      },
    });
  }

  // For Use-Case pages for each locale (pSEO)
  for (const slug of forUseCases) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/for/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/for/${slug}`]),
          ),
        },
      });
    }
  }

  // Language Type listing page for each locale (pSEO)
  const languageTypes = getAllLanguageTypeSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/language`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/language`]),
        ),
      },
    });
  }

  // Language Type pages for each locale (pSEO)
  for (const slug of languageTypes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/language/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/language/${slug}`]),
          ),
        },
      });
    }
  }

  // Blog listing page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/blog`]),
        ),
      },
    });
  }

  // Blog post pages for each locale
  const posts = getAllPosts();
  for (const post of posts) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/blog/${post.slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
