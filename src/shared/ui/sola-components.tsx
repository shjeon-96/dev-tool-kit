"use client";

import * as UI from "@pixellogic/ui/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  PRODUCT_FACTS,
  PRODUCT_LINKS,
  localizedPath,
  productSlug,
  type Locale,
  type ProductId,
  type ProductLinkKind,
} from "@/shared/config/site";
import type { ProductCopy } from "@/shared/i18n/dictionaries";
import {
  HeroScene,
  PixelLogicAppIcon,
  ProductScreens,
  ProductVisual,
} from "@/shared/ui/brand-assets";

type ProductLinkLabels = Record<ProductLinkKind, string>;
type StoreBadgeSources = { appStore: string; googlePlay: string };

function StoreBadges({
  product,
  linkLabels,
  badges,
}: {
  product: ProductId;
  linkLabels: ProductLinkLabels;
  badges: StoreBadgeSources;
}) {
  const { appStore, googlePlay }: Partial<Record<ProductLinkKind, string>> =
    PRODUCT_LINKS[product];
  if (!appStore && !googlePlay) return null;

  return (
    <UI.AppStoreBadges
      appStore={
        appStore
          ? {
              href: appStore,
              src: badges.appStore,
              alt: linkLabels.appStore,
            }
          : undefined
      }
      googlePlay={
        googlePlay
          ? {
              href: googlePlay,
              src: badges.googlePlay,
              alt: linkLabels.googlePlay,
            }
          : undefined
      }
    />
  );
}

// 스토어 밖 페이지(웹 앱 등)는 상세 페이지에만 둔다. 카드에는 상세 보기 하나만 남겨 글자 버튼이 늘어서지 않게 한다.
function ProductPageLinks({
  product,
  linkLabels,
}: {
  product: ProductId;
  linkLabels: ProductLinkLabels;
}) {
  const entries = (
    Object.entries(PRODUCT_LINKS[product]) as [ProductLinkKind, string][]
  ).filter(([kind]) => kind !== "appStore" && kind !== "googlePlay");
  if (entries.length === 0) return null;

  return (
    <UI.Stack direction="row" gap="sm">
      {entries.map(([kind, url]) => (
        <UI.TextButton
          key={kind}
          variant="arrow"
          tone="muted"
          href={url}
          external={url.startsWith("http")}
        >
          {linkLabels[kind]}
        </UI.TextButton>
      ))}
    </UI.Stack>
  );
}

function SolaProductCard({
  locale,
  product,
  linkLabels,
  badges,
  detailsLabel,
}: {
  locale: Locale;
  product: ProductCopy;
  linkLabels: ProductLinkLabels;
  badges: StoreBadgeSources;
  detailsLabel: string;
}) {
  return (
    <UI.Card className="sola-product-card" data-testid="sola-product-card">
      <ProductVisual product={product.id} />
      <UI.CardHeader>
        <UI.Stack gap="md">
          <UI.Stack direction="row" align="center" gap="md">
            <PixelLogicAppIcon product={product.id} width={48} height={48} />
            <UI.CardTitle role="heading" aria-level={3}>
              {product.name}
            </UI.CardTitle>
          </UI.Stack>
          <UI.CardDescription>{product.description}</UI.CardDescription>
        </UI.Stack>
      </UI.CardHeader>
      <UI.CardFooter>
        <UI.Stack gap="md" align="start">
          <StoreBadges
            product={product.id}
            linkLabels={linkLabels}
            badges={badges}
          />
          <UI.TextButton
            variant="arrow"
            tone="muted"
            href={localizedPath(locale, `work/${productSlug(product.id)}`)}
          >
            {detailsLabel}
          </UI.TextButton>
        </UI.Stack>
      </UI.CardFooter>
    </UI.Card>
  );
}

export function SolaHomeHero({
  title,
  titleAccent,
  intro,
  primaryCta,
}: {
  title: string;
  titleAccent: string;
  intro: string;
  primaryCta: string;
}) {
  return (
    <UI.Hero
      title={`${title} ${titleAccent}`}
      description={intro}
      actions={
        <UI.Button
          href="#products"
          size="lg"
          endContent={<ArrowRight aria-hidden="true" size={18} />}
        >
          {primaryCta}
        </UI.Button>
      }
      media={<HeroScene />}
    />
  );
}

export function SolaProductShelf({
  locale,
  title,
  description,
  products,
  linkLabels,
  badges,
  detailsLabel,
}: {
  locale: Locale;
  title: string;
  description: string;
  products: readonly ProductCopy[];
  linkLabels: ProductLinkLabels;
  badges: StoreBadgeSources;
  detailsLabel: string;
}) {
  return (
    <UI.MarketingSection id="products" title={title} description={description}>
      <div className="sola-product-grid">
        {products.map((product) => (
          <SolaProductCard
            key={product.id}
            locale={locale}
            product={product}
            detailsLabel={detailsLabel}
            linkLabels={linkLabels}
            badges={badges}
          />
        ))}
      </div>
    </UI.MarketingSection>
  );
}

export function SolaPrinciplesSection({
  title,
  principles,
}: {
  title: string;
  principles: readonly { title: string; body: string }[];
}) {
  return (
    <UI.MarketingSection title={title} tone="muted">
      <UI.FeatureGrid
        items={principles.map((principle) => ({
          title: principle.title,
          description: principle.body,
        }))}
      />
    </UI.MarketingSection>
  );
}

export function SolaContactSection({
  title,
  description,
  cta,
  email,
}: {
  title: string;
  description: string;
  cta: string;
  email: string;
}) {
  return (
    <UI.MarketingSection title={title} description={description}>
      <UI.Button
        href={`mailto:${email}`}
        size="lg"
        variant="outline"
        endContent={<ArrowUpRight aria-hidden="true" size={18} />}
      >
        {cta}
      </UI.Button>
    </UI.MarketingSection>
  );
}

const PLATFORM_NAMES: Partial<Record<ProductLinkKind, string>> = {
  appStore: "iOS",
  googlePlay: "Android",
  web: "Web",
};

export function ProductDetail({
  locale,
  product,
  labels,
  linkLabels,
  badges,
}: {
  locale: Locale;
  product: ProductCopy;
  labels: {
    products: string;
    breadcrumb: string;
    highlights: string;
    screens: string;
    build: string;
    stack: string;
    platforms: string;
    launched: string;
  };
  linkLabels: ProductLinkLabels;
  badges: StoreBadgeSources;
}) {
  const facts = PRODUCT_FACTS[product.id];
  const platforms = Object.keys(PRODUCT_LINKS[product.id])
    .map((kind) => PLATFORM_NAMES[kind as ProductLinkKind])
    .filter(Boolean);

  return (
    <>
      <UI.MarketingSection>
        <UI.Stack gap="xl" align="start">
          <UI.Breadcrumb aria-label={labels.breadcrumb}>
            <UI.BreadcrumbList>
              <UI.BreadcrumbItem>
                <UI.BreadcrumbLink href={localizedPath(locale, "#products")}>
                  {labels.products}
                </UI.BreadcrumbLink>
              </UI.BreadcrumbItem>
              <UI.BreadcrumbSeparator />
              <UI.BreadcrumbItem>
                <UI.BreadcrumbPage>{product.name}</UI.BreadcrumbPage>
              </UI.BreadcrumbItem>
            </UI.BreadcrumbList>
          </UI.Breadcrumb>
          <PixelLogicAppIcon product={product.id} width={72} height={72} />
          <UI.PageHeader
            title={product.name}
            description={product.description}
          />
          <StoreBadges
            product={product.id}
            linkLabels={linkLabels}
            badges={badges}
          />
          <ProductPageLinks product={product.id} linkLabels={linkLabels} />
        </UI.Stack>
      </UI.MarketingSection>
      <UI.MarketingSection title={labels.screens} tone="muted">
        <ProductScreens product={product.id} captions={product.screens} />
      </UI.MarketingSection>
      <UI.MarketingSection title={labels.highlights}>
        <UI.FeatureList
          items={product.highlights.map((label) => ({ label }))}
        />
      </UI.MarketingSection>
      <UI.MarketingSection title={labels.build}>
        <div className="product-facts">
          <UI.KeyValueRow
            leftRatio={30}
            align="left"
            left={labels.platforms}
            right={platforms.join(" · ")}
          />
          <UI.KeyValueRow
            leftRatio={30}
            align="left"
            left={labels.stack}
            right={facts.stack.join(" · ")}
          />
          {facts.launched ? (
            <UI.KeyValueRow
              leftRatio={30}
              align="left"
              left={labels.launched}
              right={new Intl.DateTimeFormat(locale, {
                year: "numeric",
                month: "long",
              }).format(new Date(facts.launched))}
            />
          ) : null}
        </div>
      </UI.MarketingSection>
    </>
  );
}

export function ProcessSections({
  locale,
  copy,
  products,
}: {
  locale: Locale;
  copy: {
    title: string;
    intro: string;
    scope: string;
    stepsTitle: string;
    steps: readonly { title: string; body: string }[];
    proofTitle: string;
    proof: readonly string[];
    stackTitle: string;
  };
  products: readonly ProductCopy[];
}) {
  // 제품 상세 페이지의 스택을 기술별로 모은다. 새 제품을 넣으면 여기도 따라온다.
  const stack = new Map<string, ProductCopy[]>();
  for (const product of products) {
    for (const tool of PRODUCT_FACTS[product.id].stack) {
      stack.set(tool, [...(stack.get(tool) ?? []), product]);
    }
  }

  return (
    <>
      <UI.MarketingSection>
        <UI.PageHeader
          title={copy.title}
          description={`${copy.intro} ${copy.scope}`}
        />
      </UI.MarketingSection>
      <UI.MarketingSection title={copy.stepsTitle} tone="muted">
        <ol className="process-steps">
          {copy.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </UI.MarketingSection>
      <UI.MarketingSection title={copy.proofTitle}>
        <UI.FeatureList items={copy.proof.map((label) => ({ label }))} />
      </UI.MarketingSection>
      <UI.MarketingSection title={copy.stackTitle}>
        <ul className="sola-principle-grid">
          {[...stack].map(([tool, used]) => (
            <li key={tool}>
              <h3>{tool}</h3>
              <p>
                {used.map((product, index) => (
                  <span key={product.id}>
                    {index > 0 ? " · " : null}
                    <UI.TextButton
                      variant="underline"
                      href={localizedPath(
                        locale,
                        `work/${productSlug(product.id)}`,
                      )}
                    >
                      {product.name}
                    </UI.TextButton>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </UI.MarketingSection>
    </>
  );
}
