"use client";

import Link from "next/link";
import * as UI from "@pixellogic/ui/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PRODUCT_LINKS } from "@/shared/config/site";
import type { ProductCopy } from "@/shared/i18n/dictionaries";
import { BoriCompanion, PixelLogicAppIcon } from "@/shared/ui/brand-assets";

type ProductLinkLabels = {
  appStore: string;
  googlePlay: string;
  web: string;
  publicPage: string;
};

function BoriGuide({
  label,
  message,
  description,
}: {
  label: string;
  message: string;
  description: string;
}) {
  return (
    <UI.Card className="bori-guide-card">
      <UI.CardContent>
        <UI.Stack direction="row" align="center" gap="lg">
          <BoriCompanion asset="welcome" width={96} height={96} />
          <UI.Stack gap="sm" align="start">
            <UI.Badge variant="secondary">{label}</UI.Badge>
            <strong>{message}</strong>
            <p className="bori-guide-description">{description}</p>
          </UI.Stack>
        </UI.Stack>
      </UI.CardContent>
    </UI.Card>
  );
}

function BoriProductCard({
  product,
  index,
  linkLabels,
}: {
  product: ProductCopy;
  index: number;
  linkLabels: ProductLinkLabels;
}) {
  const links = PRODUCT_LINKS[product.id];

  return (
    <UI.Card className="bori-product-card" data-testid="bori-product-card">
      <UI.CardHeader>
        <UI.Stack gap="sm">
          <UI.Stack direction="row" align="center" gap="sm">
            <UI.Badge variant="outline">
              {String(index + 1).padStart(2, "0")}
            </UI.Badge>
            <UI.Badge variant="outline">{product.meta}</UI.Badge>
          </UI.Stack>
          <UI.Stack direction="row" align="center" gap="md">
            <PixelLogicAppIcon product={product.id} />
          </UI.Stack>
          <UI.Stack direction="row" align="center" gap="sm">
            <UI.CardTitle role="heading" aria-level={3}>
              {product.name}
            </UI.CardTitle>
            <UI.StatusBadge tone="success">{product.status}</UI.StatusBadge>
          </UI.Stack>
          <UI.CardDescription>{product.description}</UI.CardDescription>
        </UI.Stack>
      </UI.CardHeader>
      <UI.CardFooter>
        <UI.Stack direction="row" gap="sm">
          {Object.entries(links).map(([kind, url]) => (
            <UI.Button
              key={kind}
              size="sm"
              variant="outline"
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
            >
              {kind === "appStore"
                ? linkLabels.appStore
                : kind === "googlePlay"
                  ? linkLabels.googlePlay
                  : kind === "web"
                    ? linkLabels.web
                    : linkLabels.publicPage}
              <ArrowUpRight aria-hidden="true" size={14} />
            </UI.Button>
          ))}
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
    <UI.Stack gap="xxl" className="bori-home-hero">
      <UI.Stack gap="lg" className="bori-hero-copy">
        <UI.PageHeader
          eyebrow={eyebrow}
          title={`${title} ${titleAccent}`}
          description={intro}
          action={
            <UI.Stack direction="row" gap="sm">
              <Link
                className={UI.buttonVariants({ size: "lg" })}
                href="#products"
              >
                {primaryCta}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </UI.Stack>
          }
        />
        <UI.Stack gap="sm">
          {proof.map((item, index) => (
            <UI.ListRow
              key={item}
              title={item}
              leading={<UI.Badge variant="outline">0{index + 1}</UI.Badge>}
            />
          ))}
        </UI.Stack>
      </UI.Stack>
      <UI.Stack gap="lg" className="bori-hero-side">
        <BoriGuide
          label={heroLabel}
          message={heroMessage}
          description={heroDescription}
        />
        <UI.Card className="bori-live-preview">
          <UI.CardHeader>
            <UI.Stack direction="row" align="center" gap="sm">
              <UI.Badge variant="outline">PIXELLOGIC / LIVE APPS</UI.Badge>
              <UI.StatusBadge tone="success">
                {String(products.length).padStart(2, "0")} APPS
              </UI.StatusBadge>
            </UI.Stack>
            <UI.CardTitle>Useful things, with a little feeling.</UI.CardTitle>
          </UI.CardHeader>
          <UI.CardContent>
            <UI.Stack gap="sm">
              {products.map((product) => (
                <UI.ListRow
                  key={product.id}
                  title={product.name}
                  description={product.meta}
                  leading={
                    <PixelLogicAppIcon
                      product={product.id}
                      width={36}
                      height={36}
                    />
                  }
                  trailing={
                    <UI.StatusBadge tone="success">LIVE</UI.StatusBadge>
                  }
                />
              ))}
            </UI.Stack>
          </UI.CardContent>
        </UI.Card>
      </UI.Stack>
    </UI.Stack>
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
      className="bori-product-shelf"
      title={title}
      description={description}
    >
      <UI.Stack gap="lg" className="bori-product-grid">
        {products.map((product, index) => (
          <BoriProductCard
            key={product.id}
            product={product}
            index={index}
            linkLabels={linkLabels}
          />
        ))}
        <UI.Stack direction="row" align="center" gap="sm">
          <BoriCompanion asset="wave" width={56} height={56} />
          <UI.Badge variant="secondary">{shelfLabel}</UI.Badge>
        </UI.Stack>
      </UI.Stack>
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
    <UI.Section
      className="bori-principles"
      title={title}
      description={description}
    >
      <UI.Stack
        direction="row"
        align="start"
        gap="xl"
        className="bori-principles-layout"
      >
        <BoriCompanion asset="planning" width={88} height={88} />
        <UI.Stack gap="sm" className="bori-principle-grid">
          {principles.map((principle, index) => (
            <UI.ListRow
              key={principle.title}
              className="bori-principle-row"
              title={principle.title}
              description={principle.body}
              leading={<UI.Badge variant="outline">0{index + 1}</UI.Badge>}
            />
          ))}
        </UI.Stack>
      </UI.Stack>
    </UI.Section>
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
    <UI.Section
      className="bori-contact"
      title={title}
      description={description}
    >
      <UI.Card className="bori-contact-card">
        <UI.CardContent>
          <UI.Stack direction="row" align="center" gap="xl">
            <BoriCompanion asset="wave" width={88} height={88} />
            <UI.Stack gap="sm" align="start">
              <UI.Badge variant="secondary">{label}</UI.Badge>
              <UI.Button
                size="lg"
                onClick={() => {
                  window.location.href = `mailto:${email}`;
                }}
              >
                {cta}
                <ArrowUpRight aria-hidden="true" size={18} />
              </UI.Button>
            </UI.Stack>
          </UI.Stack>
        </UI.CardContent>
      </UI.Card>
    </UI.Section>
  );
}
