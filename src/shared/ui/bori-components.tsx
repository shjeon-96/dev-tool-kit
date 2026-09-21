"use client";

import Link from "next/link";
import * as UI from "@pixellogic/ui/react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Heart,
  Scale,
} from "lucide-react";
import {
  PRODUCT_LINKS,
  localizedPath,
  type Locale,
} from "@/shared/config/site";
import type { ProductCopy } from "@/shared/i18n/dictionaries";
import { BoriCompanion } from "@/shared/ui/brand-assets";

const PRODUCT_ICONS = {
  weightHistory: Scale,
  solScheduler: CalendarDays,
  oneSecondRun: Heart,
} as const;

const PRODUCT_BORI_ASSETS = {
  weightHistory: "wellnessCheckup",
  solScheduler: "planning",
  oneSecondRun: "fitnessRunning",
} as const;

type ProductLinkLabels = {
  appStore: string;
  googlePlay: string;
  web: string;
  publicPage: string;
};

function BoriGuide({ label, message }: { label: string; message: string }) {
  return (
    <UI.Card className="bori-guide-card">
      <UI.CardContent>
        <UI.Stack direction="row" align="center" gap="lg">
          <BoriCompanion asset="welcome" width={96} height={96} />
          <UI.Stack gap="sm" align="start">
            <UI.Badge variant="secondary">{label}</UI.Badge>
            <strong>{message}</strong>
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
  const Icon = PRODUCT_ICONS[product.id];
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
            <UI.Icon icon={Icon} size="large" />
            <BoriCompanion
              asset={PRODUCT_BORI_ASSETS[product.id]}
              width={56}
              height={56}
            />
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
  locale,
  eyebrow,
  title,
  titleAccent,
  intro,
  primaryCta,
  secondaryCta,
  proof,
  products,
  heroLabel,
  heroMessage,
  shelfLabel,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  proof: readonly string[];
  products: readonly ProductCopy[];
  heroLabel: string;
  heroMessage: string;
  shelfLabel: string;
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
              <Link
                className={UI.buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
                href={localizedPath(locale, "about")}
              >
                {secondaryCta}
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
        <BoriGuide label={heroLabel} message={heroMessage} />
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
                  trailing={
                    <UI.StatusBadge tone="success">LIVE</UI.StatusBadge>
                  }
                />
              ))}
            </UI.Stack>
          </UI.CardContent>
          <UI.CardFooter>
            <UI.Stack direction="row" align="center" gap="sm">
              <BoriCompanion asset="success" width={64} height={64} />
              <UI.Badge variant="secondary">{shelfLabel}</UI.Badge>
            </UI.Stack>
          </UI.CardFooter>
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
    <UI.Section title={title} description={description}>
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
    <UI.Section title={title} description={description}>
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
    </UI.Section>
  );
}
