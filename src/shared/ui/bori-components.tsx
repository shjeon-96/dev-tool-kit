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
  PixelLogicAppIcon,
  ProductScreens,
  ProductVisual,
} from "@/shared/ui/brand-assets";

type ProductLinkLabels = Record<ProductLinkKind, string>;
type StoreBadgeSources = { appStore: string; googlePlay: string };

function LinkButton({
  href,
  size = "sm",
  variant = "outline",
  children,
}: {
  href: string;
  size?: "sm" | "lg";
  variant?: "default" | "outline";
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <UI.Button asChild size={size} variant={variant}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </UI.Button>
  );
}

function ProductLinks({
  product,
  linkLabels,
  badges,
  children,
}: {
  product: ProductId;
  linkLabels: ProductLinkLabels;
  badges: StoreBadgeSources;
  children?: React.ReactNode;
}) {
  const links: Partial<Record<ProductLinkKind, string>> =
    PRODUCT_LINKS[product];
  const { appStore, googlePlay, ...pages } = links;

  return (
    <>
      {appStore || googlePlay ? (
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
      ) : null}
      {children || Object.keys(pages).length > 0 ? (
        <UI.Stack direction="row" gap="sm">
          {children}
          {(Object.entries(pages) as [ProductLinkKind, string][]).map(
            ([kind, url]) => (
              <LinkButton key={kind} href={url}>
                {linkLabels[kind]}
                <ArrowUpRight aria-hidden="true" size={14} />
              </LinkButton>
            ),
          )}
        </UI.Stack>
      ) : null}
    </>
  );
}

function BoriProductCard({
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
    <UI.Card className="bori-product-card" data-testid="bori-product-card">
      <ProductVisual product={product.id} />
      <UI.CardHeader>
        <UI.Stack gap="md">
          <UI.Stack direction="row" align="center" gap="md">
            <PixelLogicAppIcon product={product.id} width={48} height={48} />
            <UI.Stack gap="xs">
              <p className="bori-meta">{product.meta}</p>
              <UI.CardTitle role="heading" aria-level={3}>
                {product.name}
              </UI.CardTitle>
            </UI.Stack>
          </UI.Stack>
          <UI.CardDescription>{product.description}</UI.CardDescription>
        </UI.Stack>
      </UI.CardHeader>
      <UI.CardFooter>
        <UI.Stack gap="md" align="start">
          <UI.StatusBadge tone="success">{product.status}</UI.StatusBadge>
          <ProductLinks
            product={product.id}
            linkLabels={linkLabels}
            badges={badges}
          >
            <LinkButton
              href={localizedPath(locale, `work/${productSlug(product.id)}`)}
            >
              {detailsLabel}
              <ArrowRight aria-hidden="true" size={14} />
            </LinkButton>
          </ProductLinks>
        </UI.Stack>
      </UI.CardFooter>
    </UI.Card>
  );
}

export function BoriHomeHero({
  title,
  titleAccent,
  intro,
  primaryCta,
  products,
}: {
  title: string;
  titleAccent: string;
  intro: string;
  primaryCta: string;
  products: readonly ProductCopy[];
}) {
  return (
    <UI.Hero
      title={`${title} ${titleAccent}`}
      description={intro}
      actions={
        <LinkButton href="#products" size="lg" variant="default">
          {primaryCta}
          <ArrowRight aria-hidden="true" size={18} />
        </LinkButton>
      }
      media={
        <ul className="bori-hero-apps">
          {products.map((product) => (
            <li key={product.id}>
              <PixelLogicAppIcon product={product.id} width={56} height={56} />
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      }
    />
  );
}

export function BoriProductShelf({
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
      <div className="bori-product-grid">
        {products.map((product) => (
          <BoriProductCard
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

export function BoriPrinciplesSection({
  title,
  principles,
}: {
  title: string;
  principles: readonly { title: string; body: string }[];
}) {
  return (
    <UI.MarketingSection title={title} tone="muted">
      <ul className="bori-principle-grid">
        {principles.map((principle) => (
          <li key={principle.title}>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </li>
        ))}
      </ul>
    </UI.MarketingSection>
  );
}

export function BoriContactSection({
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
      <LinkButton href={`mailto:${email}`} size="lg" variant="outline">
        {cta}
        <ArrowUpRight aria-hidden="true" size={18} />
      </LinkButton>
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
          <UI.Breadcrumb>
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
          <UI.Stack direction="row" align="center" gap="lg">
            <PixelLogicAppIcon product={product.id} width={72} height={72} />
            <UI.Stack gap="xs">
              <p className="bori-meta">{product.meta}</p>
              <h1 className="product-detail-title">{product.name}</h1>
            </UI.Stack>
          </UI.Stack>
          <p className="product-detail-description">{product.description}</p>
          <UI.StatusBadge tone="success">{product.status}</UI.StatusBadge>
          <ProductLinks
            product={product.id}
            linkLabels={linkLabels}
            badges={badges}
          />
        </UI.Stack>
      </UI.MarketingSection>
      <UI.MarketingSection title={labels.screens} tone="muted">
        <ProductScreens product={product.id} captions={product.screens} />
      </UI.MarketingSection>
      <UI.MarketingSection title={labels.highlights}>
        <ul className="bori-principle-grid">
          {product.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
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
