import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gamepad2, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale, localizedPath, SITE_EMAIL } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import { CreamCatCompanion } from "@/shared/ui/brand-assets";
import { SectionHeading } from "@/shared/ui/section-heading";
import { ProductCard } from "@/widgets/product-card";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createPageMetadata({
    locale,
    title: dictionary.meta.title,
    description: dictionary.meta.description,
  });
}

const PRODUCT_ICONS = {
  oneSecondRun: Heart,
  pixelLogicBlocks: Gamepad2,
} as const;

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <main id="main-content">
      <section className="studio-hero shell">
        <div className="hero-copy">
          <p className="eyebrow">{dictionary.home.eyebrow}</p>
          <h1>
            {dictionary.home.title}
            <em>{dictionary.home.titleAccent}</em>
          </h1>
          <p className="hero-intro">{dictionary.home.intro}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#products">
              {dictionary.home.primaryCta}{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="text-link" href={localizedPath(locale, "about")}>
              {dictionary.home.secondaryCta}{" "}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="hero-proof" aria-label="PixelLogic principles">
            {[
              dictionary.home.proofOne,
              dictionary.home.proofTwo,
              dictionary.home.proofThree,
            ].map((proof, index) => (
              <span key={proof}>
                <b>0{index + 1}</b>
                {proof}
              </span>
            ))}
          </div>
        </div>

        <div className="studio-window" aria-label="PixelLogic product preview">
          <div className="studio-window-topbar">
            <span className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>PIXELLOGIC / STUDIO SHELF</span>
            <span>01 — 02</span>
          </div>
          <div className="studio-window-body">
            <div className="studio-window-heading">
              <span className="studio-window-kicker">MADE WITH CARE</span>
              <strong>Useful things, with a little feeling.</strong>
            </div>
            <div className="studio-product-stack">
              {dictionary.home.products.map((product, index) => (
                <div
                  className={`studio-product-row accent-${product.accent}`}
                  key={product.name}
                >
                  <span className="studio-product-index">0{index + 1}</span>
                  <span className="studio-product-name">{product.name}</span>
                  <span className="studio-product-status">
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="studio-cat-dock">
              <div>
                <span className="studio-window-kicker">A SMALL STUDIO</span>
                <strong>
                  Built slowly.
                  <br />
                  Used often.
                </strong>
              </div>
              <CreamCatCompanion />
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-block product-section" id="products">
        <SectionHeading
          eyebrow={dictionary.home.productsEyebrow}
          title={dictionary.home.productsTitle}
          intro={dictionary.home.productsIntro}
        />
        <div className="product-grid">
          {dictionary.home.products.map((product, index) => {
            const Icon = PRODUCT_ICONS[product.id];
            return (
              <ProductCard
                key={product.name}
                product={product}
                index={index}
                icon={Icon}
                storeLabels={{
                  ios: dictionary.common.appStore,
                  android: dictionary.common.googlePlay,
                }}
              />
            );
          })}
        </div>
      </section>

      <section className="principles-section">
        <div className="shell">
          <SectionHeading
            eyebrow={dictionary.home.principleEyebrow}
            title={dictionary.home.principleTitle}
          />
          <div className="principle-grid">
            {dictionary.home.principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-contact">
        <div className="shell studio-contact-inner">
          <div>
            <p className="eyebrow">{dictionary.home.contactEyebrow}</p>
            <h2>{dictionary.home.contactTitle}</h2>
            <p>{dictionary.home.contactBody}</p>
          </div>
          <a className="button button-primary" href={`mailto:${SITE_EMAIL}`}>
            {dictionary.home.contactCta}{" "}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
