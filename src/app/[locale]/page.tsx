import type { Metadata } from "next";
import Link from "next/link";
import * as UI from "@pixellogic/ui/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale, localizedPath, SITE_EMAIL } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
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

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const actionClass = "pl-button pl-button-primary pl-button-large";
  const secondaryActionClass = "pl-button pl-button-outline pl-button-large";

  return (
    <main id="main-content" className="pixel-home">
      <section className="studio-hero shell">
        <div className="hero-copy">
          <UI.PageHeader
            eyebrow={dictionary.home.eyebrow}
            title={`${dictionary.home.title} ${dictionary.home.titleAccent}`}
            description={dictionary.home.intro}
            action={
              <div className="hero-actions">
                <Link className={actionClass} href="#products">
                  {dictionary.home.primaryCta}
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link
                  className={secondaryActionClass}
                  href={localizedPath(locale, "about")}
                >
                  {dictionary.home.secondaryCta}
                </Link>
              </div>
            }
          />
          <div className="hero-proof" aria-label="PixelLogic principles">
            {[dictionary.home.proofOne, dictionary.home.proofTwo].map(
              (proof, index) => (
                <span key={proof}>
                  <b>0{index + 1}</b>
                  {proof}
                </span>
              ),
            )}
          </div>
        </div>

        <UI.Card className="studio-preview-card">
          <UI.CardHeader>
            <div className="studio-preview-topline">
              <UI.Badge variant="outline">PIXELLOGIC / LIVE APPS</UI.Badge>
              <UI.StatusBadge tone="success">
                {String(dictionary.home.products.length).padStart(2, "0")} APPS
              </UI.StatusBadge>
            </div>
            <UI.CardTitle>Useful things, with a little feeling.</UI.CardTitle>
          </UI.CardHeader>
          <UI.CardContent>
            <UI.Stack gap="sm">
              {dictionary.home.products.map((product) => (
                <div className="studio-app-row" key={product.id}>
                  <UI.Badge variant="outline">{product.meta}</UI.Badge>
                  <strong>{product.name}</strong>
                  <UI.StatusBadge tone="success">LIVE</UI.StatusBadge>
                </div>
              ))}
            </UI.Stack>
          </UI.CardContent>
          <UI.CardFooter className="studio-preview-footer">
            <div>
              <UI.Badge variant="secondary">A SMALL STUDIO</UI.Badge>
              <strong>Built slowly. Used often.</strong>
            </div>
            <UI.Mascot
              asset="neutral"
              size="large"
              label="PixelLogic 크림 고양이"
            />
          </UI.CardFooter>
        </UI.Card>
      </section>

      <UI.Section
        id="products"
        className="shell product-section"
        title={dictionary.home.productsTitle}
        description={dictionary.home.productsIntro}
      >
        <div className="product-grid">
          {dictionary.home.products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              linkLabels={{
                appStore: dictionary.common.appStore,
                googlePlay: dictionary.common.googlePlay,
                web: dictionary.common.webApp,
                publicPage: dictionary.common.publicPage,
              }}
            />
          ))}
        </div>
      </UI.Section>

      <UI.Section
        className="principles-section"
        title={dictionary.home.principleTitle}
        description={dictionary.home.principleEyebrow}
      >
        <div className="shell principle-grid">
          {dictionary.home.principles.map((principle, index) => (
            <div key={principle.title} className="principle-row">
              <UI.Badge variant="outline">0{index + 1}</UI.Badge>
              <div>
                <strong>{principle.title}</strong>
                <p>{principle.body}</p>
              </div>
            </div>
          ))}
        </div>
      </UI.Section>

      <UI.Section
        className="studio-contact"
        title={dictionary.home.contactTitle}
        description={dictionary.home.contactBody}
      >
        <div className="shell studio-contact-inner">
          <UI.Card className="studio-contact-card">
            <UI.CardContent>
              <UI.Badge variant="secondary">
                {dictionary.home.contactEyebrow}
              </UI.Badge>
            </UI.CardContent>
            <UI.CardFooter>
              <a className={actionClass} href={`mailto:${SITE_EMAIL}`}>
                {dictionary.home.contactCta}
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </UI.CardFooter>
          </UI.Card>
        </div>
      </UI.Section>
    </main>
  );
}
