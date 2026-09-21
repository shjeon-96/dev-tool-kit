"use client";

import * as UI from "@pixellogic/ui/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PRODUCT_LINKS, type ProductLinkKind } from "@/shared/config/site";
import type { ProductCopy } from "@/shared/i18n/dictionaries";
import {
  BoriCompanion,
  PixelLogicAppIcon,
  ProductVisual,
} from "@/shared/ui/brand-assets";

type ProductLinkLabels = Record<ProductLinkKind, string>;

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

function BoriProductCard({
  product,
  linkLabels,
}: {
  product: ProductCopy;
  linkLabels: ProductLinkLabels;
}) {
  const links = Object.entries(PRODUCT_LINKS[product.id]) as [
    ProductLinkKind,
    string,
  ][];

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
          <UI.Stack direction="row" gap="sm">
            {links.map(([kind, url]) => (
              <LinkButton key={kind} href={url}>
                {linkLabels[kind]}
                <ArrowUpRight aria-hidden="true" size={14} />
              </LinkButton>
            ))}
          </UI.Stack>
        </UI.Stack>
      </UI.CardFooter>
    </UI.Card>
  );
}

export function BoriHomeHero({
  eyebrow,
  title,
  titleAccent,
  intro,
  primaryCta,
  proof,
  products,
  heroLabel,
  heroMessage,
  heroDescription,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  primaryCta: string;
  proof: readonly string[];
  products: readonly ProductCopy[];
  heroLabel: string;
  heroMessage: string;
  heroDescription: string;
}) {
  return (
    <div className="bori-home-hero">
      <UI.Stack gap="xl" align="start" className="bori-hero-copy">
        <UI.PageHeader
          eyebrow={eyebrow}
          title={`${title} ${titleAccent}`}
          description={intro}
        />
        <LinkButton href="#products" size="lg" variant="default">
          {primaryCta}
          <ArrowRight aria-hidden="true" size={18} />
        </LinkButton>
        <ul className="bori-proof">
          {proof.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </UI.Stack>
      <UI.Card className="bori-guide-card">
        <UI.CardContent>
          <UI.Stack gap="lg" align="start">
            <BoriCompanion asset="welcome" width={144} height={144} priority />
            <UI.Stack gap="sm" align="start">
              <p className="bori-meta">{heroLabel}</p>
              <strong className="bori-guide-message">{heroMessage}</strong>
              <p className="bori-guide-description">{heroDescription}</p>
            </UI.Stack>
            <ul className="bori-hero-apps">
              {products.map((product) => (
                <li key={product.id}>
                  <PixelLogicAppIcon
                    product={product.id}
                    width={56}
                    height={56}
                  />
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          </UI.Stack>
        </UI.CardContent>
      </UI.Card>
    </div>
  );
}

export function BoriProductShelf({
  title,
  description,
  products,
  linkLabels,
  shelfLabel,
}: {
  title: string;
  description: string;
  products: readonly ProductCopy[];
  linkLabels: ProductLinkLabels;
  shelfLabel: string;
}) {
  return (
    <UI.Section
      id="products"
      className="bori-section bori-product-shelf"
      title={title}
      description={description}
      action={
        <UI.Stack direction="row" align="center" gap="sm">
          <BoriCompanion asset="wave" width={56} height={56} />
          <p className="bori-meta">{shelfLabel}</p>
        </UI.Stack>
      }
    >
      <div className="bori-product-grid">
        {products.map((product) => (
          <BoriProductCard
            key={product.id}
            product={product}
            linkLabels={linkLabels}
          />
        ))}
      </div>
    </UI.Section>
  );
}

export function BoriPrinciplesSection({
  title,
  description,
  principles,
}: {
  title: string;
  description: string;
  principles: readonly { title: string; body: string }[];
}) {
  return (
    <div className="bori-principles">
      <UI.Section
        className="bori-section"
        title={title}
        description={description}
        action={<BoriCompanion asset="planning" width={88} height={88} />}
      >
        <ol className="bori-principle-grid">
          {principles.map((principle, index) => (
            <li key={principle.title}>
              <span className="bori-principle-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ol>
      </UI.Section>
    </div>
  );
}

export function BoriContactSection({
  title,
  description,
  label,
  cta,
  email,
}: {
  title: string;
  description: string;
  label: string;
  cta: string;
  email: string;
}) {
  return (
    <section className="bori-section bori-contact" aria-labelledby="contact">
      <UI.Card className="bori-contact-card">
        <UI.CardContent>
          <div className="bori-contact-layout">
            <BoriCompanion asset="wave" width={120} height={120} />
            <UI.Stack gap="sm" align="start">
              <p className="bori-meta">{label}</p>
              <h2 id="contact">{title}</h2>
              <p className="bori-guide-description">{description}</p>
            </UI.Stack>
            <LinkButton href={`mailto:${email}`} size="lg" variant="default">
              {cta}
              <ArrowUpRight aria-hidden="true" size={18} />
            </LinkButton>
          </div>
        </UI.CardContent>
      </UI.Card>
    </section>
  );
}
