import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type {
  HomeContent,
  ProductContent,
} from "@/shared/content/site-content";
import { SITE_EMAIL, localizedPath, type Locale } from "@/shared/config/site";
import { BrandHeader, PolicyFooter } from "@/shared/ui/brand-shell";

function ProductWindow({
  product,
  priority = false,
}: {
  product: ProductContent;
  priority?: boolean;
}) {
  return (
    <figure className={`product-window product-${product.id}`}>
      <figcaption className="window-bar">
        <span className="window-signal" aria-hidden="true" />
        <strong>{product.name}</strong>
        <span className="window-controls" aria-hidden="true">
          <i />
          <i />
        </span>
      </figcaption>
      <div className="window-viewport">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 760px) 76vw, (max-width: 1100px) 34vw, 280px"
        />
      </div>
    </figure>
  );
}

function ProductConstellation({
  products,
}: {
  products: readonly ProductContent[];
}) {
  return (
    <div
      className="constellation"
      aria-label="PixelLogic product constellation"
    >
      <svg
        className="constellation-lines"
        viewBox="0 0 720 620"
        aria-hidden="true"
      >
        <path className="line line-one" d="M356 303C455 303 452 104 563 104" />
        <path className="line line-two" d="M354 304C246 304 246 236 164 236" />
        <path
          className="line line-three"
          d="M358 307C390 398 385 472 326 509"
        />
        <path className="line line-four" d="M360 306C454 370 475 422 561 437" />
        <circle cx="563" cy="104" r="4" />
        <circle cx="164" cy="236" r="4" />
        <circle cx="326" cy="509" r="4" />
        <circle cx="561" cy="437" r="4" />
      </svg>
      <div className="constellation-hub" aria-hidden="true">
        <span>PL</span>
      </div>
      <ProductWindow product={products[0]} priority />
      <ProductWindow product={products[1]} priority />
      <ProductWindow product={products[2]} priority />
      <ProductWindow product={products[3]} priority />
      {Array.from({ length: 18 }, (_, index) => (
        <span
          className={`pixel pixel-${index + 1}`}
          key={index}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ProductStudioHome({
  locale,
  content,
}: {
  locale: Locale;
  content: HomeContent;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {content.skip}
      </a>
      <BrandHeader locale={locale} nav={content.nav} />
      <main id="main-content">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow reveal-item">{content.eyebrow}</p>
            <h1 id="hero-title" className="reveal-item">
              {content.title.split(", ").map((line, index, lines) => (
                <span key={line}>
                  {line}
                  {index < lines.length - 1 ? "," : ""}
                </span>
              ))}
            </h1>
            <p className="hero-intro reveal-item">{content.intro}</p>
            <div className="hero-actions reveal-item">
              <a className="button button-primary" href="#products">
                {content.primaryAction}
                <ArrowRight className="inline-icon" aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#data-use">
                {content.secondaryAction}
                <ArrowRight className="inline-icon" aria-hidden="true" />
              </a>
            </div>
            <p className="google-trust reveal-item">
              <ShieldCheck className="trust-icon" aria-hidden="true" />
              <span>{content.googleNote}</span>
            </p>
          </div>
          <ProductConstellation products={content.products} />
        </section>

        <section
          className="product-index shell"
          id="products"
          aria-labelledby="products-title"
        >
          <header className="section-heading">
            <p className="eyebrow">{content.productsLabel}</p>
            <div>
              <h2 id="products-title">{content.productsTitle}</h2>
              <p>{content.productsIntro}</p>
            </div>
          </header>
          <div className="product-list">
            {content.products.map((product, index) => (
              <article
                className={`product-row row-${product.id}`}
                key={product.id}
              >
                <span className="product-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="product-name">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                </div>
                <p>{product.description}</p>
                <span className="product-row-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section
          className="principles-section"
          id="principles"
          aria-labelledby="principles-title"
        >
          <div className="shell">
            <header className="section-heading section-heading-inverse">
              <p className="eyebrow">{content.principlesLabel}</p>
              <h2 id="principles-title">{content.principlesTitle}</h2>
            </header>
            <div className="principle-list">
              {content.principles.map((principle) => (
                <article key={principle.index}>
                  <span>{principle.index}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="data-section shell"
          id="data-use"
          aria-labelledby="data-title"
        >
          <div className="data-intro">
            <p className="eyebrow">{content.dataLabel}</p>
            <h2 id="data-title">{content.dataTitle}</h2>
            <p>{content.dataIntro}</p>
            <Link className="text-link" href={localizedPath(locale, "privacy")}>
              {content.dataLink}
              <ArrowRight className="inline-icon" aria-hidden="true" />
            </Link>
          </div>
          <div className="data-points">
            {content.dataPoints.map((point, index) => (
              <article key={point.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="shell contact-inner">
            <p className="eyebrow">{content.contactLabel}</p>
            <div>
              <h2 id="contact-title">{content.contactTitle}</h2>
              <p>{content.contactBody}</p>
            </div>
            <a className="button button-primary" href={`mailto:${SITE_EMAIL}`}>
              {content.contactAction}
              <ArrowRight className="inline-icon" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <PolicyFooter locale={locale} statement={content.footerStatement} />
    </>
  );
}
