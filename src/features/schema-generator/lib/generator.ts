/**
 * Schema Markup Generator - JSON-LD Generation
 */

import type {
  SchemaType,
  ArticleSchema,
  ProductSchema,
  FAQSchema,
  HowToSchema,
  OrganizationSchema,
  LocalBusinessSchema,
  PersonSchema,
  EventSchema,
  RecipeSchema,
  BreadcrumbSchema,
} from "./types";

interface JsonLdOutput {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Generate Article JSON-LD
 */
export function generateArticle(data: ArticleSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    image: data.image || undefined,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      "@type": "Person",
      name: data.authorName,
      url: data.authorUrl || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: data.publisherName,
      logo: data.publisherLogo
        ? {
            "@type": "ImageObject",
            url: data.publisherLogo,
          }
        : undefined,
    },
  };
}

/**
 * Generate Product JSON-LD
 */
export function generateProduct(data: ProductSchema): JsonLdOutput {
  const result: JsonLdOutput = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    image: data.image || undefined,
    brand: data.brand
      ? {
          "@type": "Brand",
          name: data.brand,
        }
      : undefined,
    sku: data.sku || undefined,
    offers: {
      "@type": "Offer",
      price: data.price,
      priceCurrency: data.priceCurrency,
      availability: `https://schema.org/${data.availability}`,
    },
  };

  if (data.ratingValue && data.reviewCount) {
    result.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: data.ratingValue,
      reviewCount: data.reviewCount,
    };
  }

  return result;
}

/**
 * Generate FAQPage JSON-LD
 */
export function generateFAQ(data: FAQSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
  };
}

/**
 * Generate HowTo JSON-LD
 */
export function generateHowTo(data: HowToSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    totalTime: data.totalTime,
    estimatedCost: data.estimatedCost
      ? {
          "@type": "MonetaryAmount",
          currency: data.currency,
          value: data.estimatedCost,
        }
      : undefined,
    step: data.steps
      .filter((step) => step.name || step.text)
      .map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image || undefined,
      })),
  };
}

/**
 * Generate Organization JSON-LD
 */
export function generateOrganization(data: OrganizationSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url || undefined,
    logo: data.logo || undefined,
    description: data.description || undefined,
    email: data.email || undefined,
    telephone: data.phone || undefined,
    sameAs: data.sameAs.filter(Boolean).length > 0 ? data.sameAs : undefined,
  };
}

/**
 * Generate LocalBusiness JSON-LD
 */
export function generateLocalBusiness(data: LocalBusinessSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description || undefined,
    url: data.url || undefined,
    telephone: data.phone || undefined,
    email: data.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.streetAddress,
      addressLocality: data.addressLocality,
      addressRegion: data.addressRegion || undefined,
      postalCode: data.postalCode,
      addressCountry: data.addressCountry,
    },
    geo:
      data.latitude && data.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: data.latitude,
            longitude: data.longitude,
          }
        : undefined,
    priceRange: data.priceRange || undefined,
    openingHours: data.openingHours || undefined,
  };
}

/**
 * Generate Person JSON-LD
 */
export function generatePerson(data: PersonSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle || undefined,
    url: data.url || undefined,
    image: data.image || undefined,
    email: data.email || undefined,
    sameAs: data.sameAs.filter(Boolean).length > 0 ? data.sameAs : undefined,
  };
}

/**
 * Generate Event JSON-LD
 */
export function generateEvent(data: EventSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.name,
    description: data.description || undefined,
    startDate: data.startDate,
    endDate: data.endDate || undefined,
    location: {
      "@type": "Place",
      name: data.locationName,
      address: {
        "@type": "PostalAddress",
        streetAddress: data.streetAddress || undefined,
        addressLocality: data.addressLocality,
        addressCountry: data.addressCountry,
      },
    },
    image: data.image || undefined,
    offers: data.price
      ? {
          "@type": "Offer",
          url: data.ticketUrl || undefined,
          price: data.price,
          priceCurrency: data.priceCurrency,
          availability: `https://schema.org/${data.availability}`,
        }
      : undefined,
    organizer: data.organizerName
      ? {
          "@type": "Organization",
          name: data.organizerName,
        }
      : undefined,
  };
}

/**
 * Generate Recipe JSON-LD
 */
export function generateRecipe(data: RecipeSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: data.name,
    description: data.description || undefined,
    image: data.image || undefined,
    prepTime: data.prepTime || undefined,
    cookTime: data.cookTime || undefined,
    totalTime: data.totalTime || undefined,
    recipeYield: data.servings || undefined,
    nutrition: data.calories
      ? {
          "@type": "NutritionInformation",
          calories: `${data.calories} calories`,
        }
      : undefined,
    recipeIngredient: data.ingredients.filter(Boolean),
    recipeInstructions: data.instructions
      .filter(Boolean)
      .map((instruction, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: instruction,
      })),
    author: data.authorName
      ? {
          "@type": "Person",
          name: data.authorName,
        }
      : undefined,
  };
}

/**
 * Generate BreadcrumbList JSON-LD
 */
export function generateBreadcrumb(data: BreadcrumbSchema): JsonLdOutput {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items
      .filter((item) => item.name && item.url)
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
  };
}

/**
 * Remove undefined values from object recursively
 */
function cleanObject(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(cleanObject).filter((item) => item !== undefined);
  }

  if (obj && typeof obj === "object") {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = cleanObject(value);
      if (cleanedValue !== undefined && cleanedValue !== "") {
        cleaned[key] = cleanedValue;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  return obj;
}

/**
 * Generate JSON-LD for any schema type
 */
export function generateJsonLd(type: SchemaType, data: unknown): string {
  let result: JsonLdOutput;

  switch (type) {
    case "Article":
      result = generateArticle(data as ArticleSchema);
      break;
    case "Product":
      result = generateProduct(data as ProductSchema);
      break;
    case "FAQPage":
      result = generateFAQ(data as FAQSchema);
      break;
    case "HowTo":
      result = generateHowTo(data as HowToSchema);
      break;
    case "Organization":
      result = generateOrganization(data as OrganizationSchema);
      break;
    case "LocalBusiness":
      result = generateLocalBusiness(data as LocalBusinessSchema);
      break;
    case "Person":
      result = generatePerson(data as PersonSchema);
      break;
    case "Event":
      result = generateEvent(data as EventSchema);
      break;
    case "Recipe":
      result = generateRecipe(data as RecipeSchema);
      break;
    case "BreadcrumbList":
      result = generateBreadcrumb(data as BreadcrumbSchema);
      break;
    default:
      throw new Error(`Unknown schema type: ${type}`);
  }

  const cleaned = cleanObject(result);
  return JSON.stringify(cleaned, null, 2);
}

/**
 * Generate HTML script tag with JSON-LD
 */
export function generateScriptTag(jsonLd: string): string {
  return `<script type="application/ld+json">
${jsonLd}
</script>`;
}
