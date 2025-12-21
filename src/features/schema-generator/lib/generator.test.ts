import { describe, it, expect } from "vitest";
import {
  generateArticle,
  generateProduct,
  generateFAQ,
  generateHowTo,
  generateOrganization,
  generateLocalBusiness,
  generatePerson,
  generateEvent,
  generateRecipe,
  generateBreadcrumb,
  generateJsonLd,
  generateScriptTag,
} from "./generator";
import type {
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

describe("Schema Generator", () => {
  describe("generateArticle", () => {
    it("generates valid Article JSON-LD", () => {
      const data: ArticleSchema = {
        headline: "Test Article",
        description: "A test article description",
        image: "https://example.com/image.jpg",
        datePublished: "2024-01-01",
        dateModified: "2024-01-02",
        authorName: "John Doe",
        authorUrl: "https://example.com/author",
        publisherName: "Example Publisher",
        publisherLogo: "https://example.com/logo.png",
      };

      const result = generateArticle(data);

      expect(result["@context"]).toBe("https://schema.org");
      expect(result["@type"]).toBe("Article");
      expect(result.headline).toBe("Test Article");
      expect(result.author).toEqual({
        "@type": "Person",
        name: "John Doe",
        url: "https://example.com/author",
      });
    });

    it("handles missing optional fields", () => {
      const data: ArticleSchema = {
        headline: "Minimal Article",
        description: "",
        image: "",
        datePublished: "2024-01-01",
        dateModified: "",
        authorName: "Author",
        authorUrl: "",
        publisherName: "Publisher",
        publisherLogo: "",
      };

      const result = generateArticle(data);

      expect(result.headline).toBe("Minimal Article");
      expect(result.image).toBeUndefined();
    });
  });

  describe("generateProduct", () => {
    it("generates valid Product JSON-LD", () => {
      const data: ProductSchema = {
        name: "Test Product",
        description: "A test product",
        image: "https://example.com/product.jpg",
        brand: "Test Brand",
        sku: "SKU123",
        price: "99.99",
        priceCurrency: "USD",
        availability: "InStock",
        ratingValue: "4.5",
        reviewCount: "100",
      };

      const result = generateProduct(data);

      expect(result["@type"]).toBe("Product");
      expect(result.name).toBe("Test Product");
      expect(result.offers).toEqual({
        "@type": "Offer",
        price: "99.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      });
      expect(result.aggregateRating).toEqual({
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "100",
      });
    });

    it("excludes aggregateRating when not provided", () => {
      const data: ProductSchema = {
        name: "Basic Product",
        description: "",
        image: "",
        brand: "",
        sku: "",
        price: "50",
        priceCurrency: "USD",
        availability: "InStock",
        ratingValue: "",
        reviewCount: "",
      };

      const result = generateProduct(data);

      expect(result.aggregateRating).toBeUndefined();
    });
  });

  describe("generateFAQ", () => {
    it("generates valid FAQPage JSON-LD", () => {
      const data: FAQSchema = {
        items: [
          { question: "What is this?", answer: "This is a test." },
          { question: "How does it work?", answer: "It works well." },
        ],
      };

      const result = generateFAQ(data);

      expect(result["@type"]).toBe("FAQPage");
      expect(result.mainEntity).toHaveLength(2);
      expect((result.mainEntity as unknown[])[0]).toEqual({
        "@type": "Question",
        name: "What is this?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This is a test.",
        },
      });
    });

    it("filters empty FAQ items", () => {
      const data: FAQSchema = {
        items: [
          { question: "Valid question?", answer: "Valid answer" },
          { question: "", answer: "" },
        ],
      };

      const result = generateFAQ(data);

      expect(result.mainEntity).toHaveLength(1);
    });
  });

  describe("generateHowTo", () => {
    it("generates valid HowTo JSON-LD", () => {
      const data: HowToSchema = {
        name: "How to Test",
        description: "Learn how to test",
        totalTime: "PT30M",
        estimatedCost: "50",
        currency: "USD",
        steps: [
          { name: "Step 1", text: "First step", image: "" },
          { name: "Step 2", text: "Second step", image: "" },
        ],
      };

      const result = generateHowTo(data);

      expect(result["@type"]).toBe("HowTo");
      expect(result.totalTime).toBe("PT30M");
      expect(result.step).toHaveLength(2);
    });
  });

  describe("generateOrganization", () => {
    it("generates valid Organization JSON-LD", () => {
      const data: OrganizationSchema = {
        name: "Test Org",
        url: "https://example.com",
        logo: "https://example.com/logo.png",
        description: "A test organization",
        email: "contact@example.com",
        phone: "+1-555-555-5555",
        sameAs: [
          "https://twitter.com/test",
          "https://linkedin.com/company/test",
        ],
      };

      const result = generateOrganization(data);

      expect(result["@type"]).toBe("Organization");
      expect(result.name).toBe("Test Org");
      expect(result.sameAs).toHaveLength(2);
    });
  });

  describe("generateLocalBusiness", () => {
    it("generates valid LocalBusiness JSON-LD", () => {
      const data: LocalBusinessSchema = {
        name: "Test Business",
        description: "A local business",
        url: "https://business.com",
        phone: "+1-555-123-4567",
        email: "info@business.com",
        streetAddress: "123 Main St",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US",
        latitude: "40.7128",
        longitude: "-74.0060",
        priceRange: "$$",
        openingHours: "Mo-Fr 09:00-17:00",
      };

      const result = generateLocalBusiness(data);

      expect(result["@type"]).toBe("LocalBusiness");
      expect(result.address).toBeDefined();
      expect(result.geo).toBeDefined();
    });
  });

  describe("generatePerson", () => {
    it("generates valid Person JSON-LD", () => {
      const data: PersonSchema = {
        name: "John Doe",
        jobTitle: "Software Engineer",
        url: "https://johndoe.com",
        image: "https://johndoe.com/photo.jpg",
        email: "john@example.com",
        sameAs: ["https://github.com/johndoe"],
      };

      const result = generatePerson(data);

      expect(result["@type"]).toBe("Person");
      expect(result.name).toBe("John Doe");
      expect(result.jobTitle).toBe("Software Engineer");
    });
  });

  describe("generateEvent", () => {
    it("generates valid Event JSON-LD", () => {
      const data: EventSchema = {
        name: "Tech Conference",
        description: "A tech event",
        startDate: "2024-06-01T09:00",
        endDate: "2024-06-02T17:00",
        locationName: "Convention Center",
        streetAddress: "456 Event Ave",
        addressLocality: "San Francisco",
        addressCountry: "US",
        image: "https://event.com/image.jpg",
        ticketUrl: "https://tickets.com/event",
        price: "100",
        priceCurrency: "USD",
        availability: "InStock",
        organizerName: "Tech Corp",
      };

      const result = generateEvent(data);

      expect(result["@type"]).toBe("Event");
      expect(result.location).toBeDefined();
      expect(result.offers).toBeDefined();
    });
  });

  describe("generateRecipe", () => {
    it("generates valid Recipe JSON-LD", () => {
      const data: RecipeSchema = {
        name: "Chocolate Cake",
        description: "Delicious cake",
        image: "https://recipe.com/cake.jpg",
        prepTime: "PT15M",
        cookTime: "PT30M",
        totalTime: "PT45M",
        servings: "8",
        calories: "350",
        ingredients: ["2 cups flour", "1 cup sugar"],
        instructions: ["Mix ingredients", "Bake at 350F"],
        authorName: "Chef John",
      };

      const result = generateRecipe(data);

      expect(result["@type"]).toBe("Recipe");
      expect(result.recipeIngredient).toHaveLength(2);
      expect(result.recipeInstructions).toHaveLength(2);
    });
  });

  describe("generateBreadcrumb", () => {
    it("generates valid BreadcrumbList JSON-LD", () => {
      const data: BreadcrumbSchema = {
        items: [
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: "Shoes", url: "/products/shoes" },
        ],
      };

      const result = generateBreadcrumb(data);

      expect(result["@type"]).toBe("BreadcrumbList");
      expect(result.itemListElement).toHaveLength(3);
      expect((result.itemListElement as unknown[])[2]).toEqual({
        "@type": "ListItem",
        position: 3,
        name: "Shoes",
        item: "/products/shoes",
      });
    });
  });

  describe("generateJsonLd", () => {
    it("returns JSON string for valid schema type", () => {
      const data: ArticleSchema = {
        headline: "Test",
        description: "",
        image: "",
        datePublished: "2024-01-01",
        dateModified: "",
        authorName: "Author",
        authorUrl: "",
        publisherName: "Publisher",
        publisherLogo: "",
      };

      const result = generateJsonLd("Article", data);

      expect(typeof result).toBe("string");
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it("throws error for unknown schema type", () => {
      expect(() => generateJsonLd("Unknown" as never, {})).toThrow();
    });
  });

  describe("generateScriptTag", () => {
    it("wraps JSON-LD in script tag", () => {
      const jsonLd = '{"@context": "https://schema.org"}';
      const result = generateScriptTag(jsonLd);

      expect(result).toContain('<script type="application/ld+json">');
      expect(result).toContain("</script>");
      expect(result).toContain(jsonLd);
    });
  });
});
