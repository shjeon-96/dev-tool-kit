import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { tools, getToolsByCategory, type ToolSlug } from "@/entities/tool";
import type { ToolCategory } from "@/shared/types/tool";
import { BentoGrid } from "@/widgets/tools-list";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/shared/ui";

const VALID_CATEGORIES: ToolCategory[] = [
  "text",
  "media",
  "security",
  "converters",
];

const CATEGORY_META = {
  text: {
    icon: "Type",
    keywords: ["text tools", "string tools", "formatter", "parser"],
  },
  media: {
    icon: "Image",
    keywords: ["image tools", "media tools", "converter", "optimizer"],
  },
  security: {
    icon: "Shield",
    keywords: ["security tools", "hash generator", "encoder", "decoder"],
  },
  converters: {
    icon: "ArrowRightLeft",
    keywords: ["converter tools", "format converter", "data transformation"],
  },
} as const;

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_CATEGORIES.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;

  if (!VALID_CATEGORIES.includes(category as ToolCategory)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "sidebar" });
  const categoryName = t(`categories.${category}`);
  const meta = CATEGORY_META[category as ToolCategory];

  const title = `${categoryName} Tools - Free Online Developer Tools | ${SITE_CONFIG.title}`;
  const description = `Browse all ${categoryName.toLowerCase()} tools. Free online developer utilities for ${meta.keywords.join(", ")}.`;

  return {
    title,
    description,
    keywords: meta.keywords.join(", "),
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${locale}/tools/category/${category}`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/tools/category/${category}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/tools/category/${category}`,
        ]),
      ),
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  if (!VALID_CATEGORIES.includes(category as ToolCategory)) {
    return notFound();
  }

  const t = await getTranslations("sidebar");
  const tTools = await getTranslations("tools");
  const categoryName = t(`categories.${category}`);

  const groupedTools = getToolsByCategory(tools);
  const toolSlugs = groupedTools.get(category as ToolCategory) || [];

  return (
    <>
      {/* JSON-LD for SEO */}
      <BreadcrumbJsonLd
        items={[
          { url: SITE_CONFIG.url, name: "Home" },
          { url: `${SITE_CONFIG.url}/${locale}/tools`, name: "Tools" },
          {
            url: `${SITE_CONFIG.url}/${locale}/tools/category/${category}`,
            name: `${categoryName} Tools`,
          },
        ]}
      />
      <ItemListJsonLd
        name={`${categoryName} Developer Tools`}
        description={`Collection of ${categoryName.toLowerCase()} tools for developers`}
        url={`${SITE_CONFIG.url}/${locale}/tools/category/${category}`}
        items={toolSlugs.map((slug) => ({
          name: tTools(`${slug}.title`),
          url: `${SITE_CONFIG.url}/${locale}/tools/${slug}`,
        }))}
      />

      <div className="container py-6 lg:py-10">
        <div className="mb-8">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            All Tools
          </Link>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {categoryName} Tools
          </h1>
          <p className="mt-2 text-muted-foreground">
            {toolSlugs.length} free online {categoryName.toLowerCase()} tools
            for developers
          </p>
        </div>

        <BentoGrid slugs={toolSlugs as ToolSlug[]} />

        {/* SEO Content */}
        <section className="mt-12 pt-8 border-t">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>About {categoryName} Tools</h2>
            <p>
              Our collection of {categoryName.toLowerCase()} tools helps
              developers work more efficiently. All tools run entirely in your
              browser - no data is sent to any server, ensuring complete
              privacy.
            </p>

            <h3>All {categoryName} Tools</h3>
            <ul>
              {toolSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${locale}/tools/${slug}`}
                    className="text-primary hover:underline"
                  >
                    {tTools(`${slug}.title`)}
                  </Link>
                  {" - "}
                  {tTools(`${slug}.description`)}
                </li>
              ))}
            </ul>

            {/* Category-specific related links */}
            {category === "media" && (
              <>
                <h3>Related Image Processing</h3>
                <ul>
                  <li>
                    <Link
                      href={`/${locale}/resize-to/resize-image-for-whatsapp-status`}
                      className="text-primary hover:underline"
                    >
                      WhatsApp Status Resizer
                    </Link>{" "}
                    - Resize images to 1080×1920 for WhatsApp Stories
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/resize-to/resize-image-for-instagram-story`}
                      className="text-primary hover:underline"
                    >
                      Instagram Story Resizer
                    </Link>{" "}
                    - Resize images to 1080×1920 for Instagram Stories
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/convert/png-to-jpg`}
                      className="text-primary hover:underline"
                    >
                      PNG to JPG Converter
                    </Link>{" "}
                    - Convert PNG images to JPG format
                  </li>
                </ul>
              </>
            )}

            {category === "text" && (
              <>
                <h3>Related Text Processing</h3>
                <ul>
                  <li>
                    <Link
                      href={`/${locale}/format/json`}
                      className="text-primary hover:underline"
                    >
                      JSON Formatter
                    </Link>{" "}
                    - Format and beautify JSON data
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/convert/json-to-yaml`}
                      className="text-primary hover:underline"
                    >
                      JSON to YAML Converter
                    </Link>{" "}
                    - Convert JSON to YAML format
                  </li>
                </ul>
              </>
            )}

            {category === "security" && (
              <>
                <h3>Related Security Tools</h3>
                <ul>
                  <li>
                    <Link
                      href={`/${locale}/hash/sha256`}
                      className="text-primary hover:underline"
                    >
                      SHA-256 Hash Generator
                    </Link>{" "}
                    - Generate secure SHA-256 hashes
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/encode/base64`}
                      className="text-primary hover:underline"
                    >
                      Base64 Encoder
                    </Link>{" "}
                    - Encode text to Base64 format
                  </li>
                </ul>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
