/**
 * Schema Markup Generator Types
 */

export type SchemaType =
  | "Article"
  | "Product"
  | "FAQPage"
  | "HowTo"
  | "Organization"
  | "LocalBusiness"
  | "Person"
  | "Event"
  | "Recipe"
  | "BreadcrumbList";

export interface SchemaTypeOption {
  value: SchemaType;
  label: string;
  description: string;
}

export const SCHEMA_TYPES: SchemaTypeOption[] = [
  {
    value: "Article",
    label: "Article",
    description: "News, blog posts, or other articles",
  },
  {
    value: "Product",
    label: "Product",
    description: "E-commerce product with price and availability",
  },
  {
    value: "FAQPage",
    label: "FAQ Page",
    description: "Frequently asked questions and answers",
  },
  {
    value: "HowTo",
    label: "How-To",
    description: "Step-by-step instructions",
  },
  {
    value: "Organization",
    label: "Organization",
    description: "Company or organization info",
  },
  {
    value: "LocalBusiness",
    label: "Local Business",
    description: "Local business with address and hours",
  },
  {
    value: "Person",
    label: "Person",
    description: "Person profile information",
  },
  {
    value: "Event",
    label: "Event",
    description: "Event with date, location, and tickets",
  },
  {
    value: "Recipe",
    label: "Recipe",
    description: "Cooking recipe with ingredients and steps",
  },
  {
    value: "BreadcrumbList",
    label: "Breadcrumb",
    description: "Navigation breadcrumb trail",
  },
];

// Article Schema
export interface ArticleSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl: string;
  publisherName: string;
  publisherLogo: string;
}

// Product Schema
export interface ProductSchema {
  name: string;
  description: string;
  image: string;
  brand: string;
  sku: string;
  price: string;
  priceCurrency: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
  ratingValue: string;
  reviewCount: string;
}

// FAQ Schema
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchema {
  items: FAQItem[];
}

// HowTo Schema
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface HowToSchema {
  name: string;
  description: string;
  totalTime: string;
  estimatedCost: string;
  currency: string;
  steps: HowToStep[];
}

// Organization Schema
export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  phone: string;
  sameAs: string[];
}

// LocalBusiness Schema
export interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  latitude: string;
  longitude: string;
  priceRange: string;
  openingHours: string;
}

// Person Schema
export interface PersonSchema {
  name: string;
  jobTitle: string;
  url: string;
  image: string;
  email: string;
  sameAs: string[];
}

// Event Schema
export interface EventSchema {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  locationName: string;
  streetAddress: string;
  addressLocality: string;
  addressCountry: string;
  image: string;
  ticketUrl: string;
  price: string;
  priceCurrency: string;
  availability: "InStock" | "SoldOut" | "PreOrder";
  organizerName: string;
}

// Recipe Schema
export interface RecipeSchema {
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  calories: string;
  ingredients: string[];
  instructions: string[];
  authorName: string;
}

// Breadcrumb Schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbSchema {
  items: BreadcrumbItem[];
}

// Union type for all schema data
export type SchemaData =
  | ArticleSchema
  | ProductSchema
  | FAQSchema
  | HowToSchema
  | OrganizationSchema
  | LocalBusinessSchema
  | PersonSchema
  | EventSchema
  | RecipeSchema
  | BreadcrumbSchema;

// Default values for each schema type
export const DEFAULT_ARTICLE: ArticleSchema = {
  headline: "",
  description: "",
  image: "",
  datePublished: new Date().toISOString().split("T")[0],
  dateModified: new Date().toISOString().split("T")[0],
  authorName: "",
  authorUrl: "",
  publisherName: "",
  publisherLogo: "",
};

export const DEFAULT_PRODUCT: ProductSchema = {
  name: "",
  description: "",
  image: "",
  brand: "",
  sku: "",
  price: "",
  priceCurrency: "USD",
  availability: "InStock",
  ratingValue: "",
  reviewCount: "",
};

export const DEFAULT_FAQ: FAQSchema = {
  items: [{ question: "", answer: "" }],
};

export const DEFAULT_HOWTO: HowToSchema = {
  name: "",
  description: "",
  totalTime: "PT30M",
  estimatedCost: "",
  currency: "USD",
  steps: [{ name: "", text: "", image: "" }],
};

export const DEFAULT_ORGANIZATION: OrganizationSchema = {
  name: "",
  url: "",
  logo: "",
  description: "",
  email: "",
  phone: "",
  sameAs: [],
};

export const DEFAULT_LOCALBUSINESS: LocalBusinessSchema = {
  name: "",
  description: "",
  url: "",
  phone: "",
  email: "",
  streetAddress: "",
  addressLocality: "",
  addressRegion: "",
  postalCode: "",
  addressCountry: "",
  latitude: "",
  longitude: "",
  priceRange: "",
  openingHours: "",
};

export const DEFAULT_PERSON: PersonSchema = {
  name: "",
  jobTitle: "",
  url: "",
  image: "",
  email: "",
  sameAs: [],
};

export const DEFAULT_EVENT: EventSchema = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  locationName: "",
  streetAddress: "",
  addressLocality: "",
  addressCountry: "",
  image: "",
  ticketUrl: "",
  price: "",
  priceCurrency: "USD",
  availability: "InStock",
  organizerName: "",
};

export const DEFAULT_RECIPE: RecipeSchema = {
  name: "",
  description: "",
  image: "",
  prepTime: "PT15M",
  cookTime: "PT30M",
  totalTime: "PT45M",
  servings: "4",
  calories: "",
  ingredients: [""],
  instructions: [""],
  authorName: "",
};

export const DEFAULT_BREADCRUMB: BreadcrumbSchema = {
  items: [{ name: "Home", url: "/" }],
};
