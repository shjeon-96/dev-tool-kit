import { SITE_CONFIG } from "@/shared/config";

export function JsonLd() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/api/og`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icon.svg`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqItem {
  q: string;
  a: string;
}

interface FaqJsonLdProps {
  faqs: FaqItem[];
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema for guide pages
interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format (e.g., "PT5M" for 5 minutes)
  image?: string;
}

export function HowToJsonLd({
  name,
  description,
  steps,
  totalTime,
  image,
}: HowToJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(image && { image }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for tool pages (free software product)
interface ProductJsonLdProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  brand?: string;
}

export function ProductJsonLd({
  name,
  description,
  url,
  category = "Developer Tools",
  brand = SITE_CONFIG.title,
}: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    category,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// SoftwareApplication Schema for tool pages (Google recommended for developer tools)
interface SoftwareApplicationJsonLdProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  screenshot?: string;
  featureList?: string[];
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  image,
  applicationCategory = "DeveloperApplication",
  operatingSystem = "Web",
  screenshot,
  featureList,
  aggregateRating,
}: SoftwareApplicationJsonLdProps) {
  // Use provided image or generate OG image URL
  const imageUrl =
    image ||
    `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image: imageUrl,
    applicationCategory,
    operatingSystem,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(screenshot && { screenshot }),
    ...(featureList && { featureList }),
    ...(aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema for blog/guide content
interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author = SITE_CONFIG.author,
  image,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
    ...(image && { image }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ItemList Schema for category/list pages (pSEO index pages)
interface ItemListItem {
  name: string;
  url: string;
  description?: string;
  image?: string;
}

interface ItemListJsonLdProps {
  name: string;
  description: string;
  url: string;
  items: ItemListItem[];
  itemType?: "ListItem" | "HowTo" | "Article" | "SoftwareApplication";
}

export function ItemListJsonLd({
  name,
  description,
  url,
  items,
  itemType = "ListItem",
}: ItemListJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": itemType,
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
      ...(item.image && { image: item.image }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// TechArticle Schema for technical documentation
interface TechArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  dependencies?: string[];
  proficiencyLevel?: "Beginner" | "Intermediate" | "Expert";
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function TechArticleJsonLd({
  headline,
  description,
  url,
  dependencies,
  proficiencyLevel,
  datePublished,
  dateModified,
  author = SITE_CONFIG.author,
  image,
}: TechArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url,
    ...(dependencies && { dependencies }),
    ...(proficiencyLevel && { proficiencyLevel }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
    ...(image && { image }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// DefinedTerm Schema for glossary pages
interface DefinedTermJsonLdProps {
  name: string;
  description: string;
  url: string;
  inDefinedTermSet?: string;
}

export function DefinedTermJsonLd({
  name,
  description,
  url,
  inDefinedTermSet = "Developer Glossary",
}: DefinedTermJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: inDefinedTermSet,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebApplication Schema (enhanced for PWA-like tools)
interface WebApplicationJsonLdProps {
  name: string;
  description: string;
  url: string;
  browserRequirements?: string;
  featureList?: string[];
  permissions?: string;
  screenshot?: string;
}

export function WebApplicationJsonLd({
  name,
  description,
  url,
  browserRequirements = "Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).",
  featureList,
  permissions = "No special permissions required. All processing is done locally in your browser.",
  screenshot,
}: WebApplicationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "DeveloperApplication",
    browserRequirements,
    permissions,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(featureList && { featureList }),
    ...(screenshot && { screenshot }),
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Comparison Schema for VS pages (using Article with structured comparison)
interface ComparisonItem {
  aspect: string;
  item1Value: string;
  item2Value: string;
  winner?: "item1" | "item2" | "tie";
}

interface ComparisonJsonLdProps {
  item1: string;
  item2: string;
  headline: string;
  description: string;
  url: string;
  comparisons: ComparisonItem[];
  conclusion: string;
}

export function ComparisonJsonLd({
  item1,
  item2,
  headline,
  description,
  url,
  comparisons,
  conclusion,
}: ComparisonJsonLdProps) {
  // Format comparison as structured content
  const comparisonText = comparisons
    .map(
      (c) => `${c.aspect}: ${item1}=${c.item1Value}, ${item2}=${c.item2Value}`,
    )
    .join("; ");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    articleBody: `${description} ${comparisonText} Conclusion: ${conclusion}`,
    about: [
      { "@type": "Thing", name: item1 },
      { "@type": "Thing", name: item2 },
    ],
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// CollectionPage Schema for tool category pages
interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  mainEntity?: {
    name: string;
    url: string;
  }[];
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  mainEntity,
}: CollectionPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    ...(mainEntity && {
      mainEntity: mainEntity.map((item) => ({
        "@type": "SoftwareApplication",
        name: item.name,
        url: item.url,
      })),
    }),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
    },
  };

  // Safe: JSON.stringify escapes all content
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Person Schema for E-E-A-T author profiles
interface PersonJsonLdProps {
  name: string;
  url: string;
  description?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: {
    name: string;
    url: string;
  };
  sameAs?: string[];
  knowsAbout?: string[];
}

export function PersonJsonLd({
  name,
  url,
  description,
  image,
  jobTitle,
  worksFor,
  sameAs,
  knowsAbout,
}: PersonJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    ...(description && { description }),
    ...(image && { image }),
    ...(jobTitle && { jobTitle }),
    ...(worksFor && {
      worksFor: {
        "@type": "Organization",
        name: worksFor.name,
        url: worksFor.url,
      },
    }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
    ...(knowsAbout && knowsAbout.length > 0 && { knowsAbout }),
  };

  // Safe: JSON.stringify escapes all content
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// NewsArticle Schema with Person author support for E-E-A-T
interface NewsArticleAuthor {
  type: "Person" | "Organization";
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
}

interface NewsArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  wordCount?: number;
  author: NewsArticleAuthor;
  image?: string;
  keywords?: string[];
  articleSection?: string;
  inLanguage?: string;
}

export function NewsArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  wordCount,
  author,
  image,
  keywords,
  articleSection,
  inLanguage = "en-US",
}: NewsArticleJsonLdProps) {
  const authorSchema =
    author.type === "Person"
      ? {
          "@type": "Person",
          name: author.name,
          ...(author.url && { url: author.url }),
          ...(author.image && { image: author.image }),
          ...(author.jobTitle && { jobTitle: author.jobTitle }),
          ...(author.sameAs &&
            author.sameAs.length > 0 && { sameAs: author.sameAs }),
        }
      : {
          "@type": "Organization",
          name: author.name,
          url: author.url || SITE_CONFIG.url,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_CONFIG.url}/icon.svg`,
          },
        };

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(wordCount && { wordCount }),
    ...(image && { image }),
    ...(keywords && { keywords: keywords.join(", ") }),
    ...(articleSection && { articleSection }),
    inLanguage,
    author: authorSchema,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article p:first-of-type"],
    },
  };

  // Safe: JSON.stringify escapes all content
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
