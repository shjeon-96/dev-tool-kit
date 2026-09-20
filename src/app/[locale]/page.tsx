import Link from "next/link";
import { ArrowRight, Check, Copy, ShieldCheck, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, localizedPath } from "@/shared/config/site";
import { FEATURED_TOOLS } from "@/shared/config/tools";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
import { CreamCatCompanion } from "@/shared/ui/brand-assets";
import { SectionHeading } from "@/shared/ui/section-heading";
import { ToolCard } from "@/widgets/tool-card";

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

  return (
    <main id="main-content">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">{dictionary.home.eyebrow}</p>
          <h1>
            {dictionary.home.title}
            <em>{dictionary.home.titleAccent}</em>
          </h1>
          <p className="hero-intro">{dictionary.home.intro}</p>
          <div className="hero-actions">
            <Link
              className="button button-primary"
              href={localizedPath(locale, "tools")}
            >
              {dictionary.home.primaryCta}{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="text-link" href={localizedPath(locale, "privacy")}>
              <ShieldCheck aria-hidden="true" size={17} />{" "}
              {dictionary.home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="hero-instrument" aria-label="Local processing status">
          <div className="brand-panel-header">
            <span>PIXELLOGIC / BRAND ASSET</span>
            <span>01</span>
          </div>
          <div className="brand-companion-stage">
            <div className="brand-companion-copy">
              <span className="brand-companion-note">SAFE, LOCAL, READY</span>
              <strong>
                작업 데이터는
                <br />
                브라우저 안에 있어요.
              </strong>
            </div>
            <CreamCatCompanion />
            <div className="local-status-card">
              <span className="local-status-label">LOCAL PROCESSING</span>
              <strong>READY</strong>
              <code>{dictionary.home.proofThree}</code>
            </div>
          </div>
          <div className="brand-proof-row">
            <span>
              <Check aria-hidden="true" size={16} />
              {dictionary.common.browserOnly}
            </span>
            <span>
              <UserRound aria-hidden="true" size={16} />
              {dictionary.home.proofTwo}
            </span>
            <span>
              <Copy aria-hidden="true" size={16} />
              {dictionary.common.copy}
            </span>
          </div>
        </div>
      </section>

      <div className="proof-strip">
        <div className="shell">
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

      <section className="shell section-block" id="tools">
        <SectionHeading
          eyebrow={dictionary.home.toolsEyebrow}
          title={dictionary.home.toolsTitle}
          intro={dictionary.home.toolsIntro}
        />
        <div className="tool-grid">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              locale={locale}
              dictionary={dictionary}
            />
          ))}
        </div>
        <div className="section-action">
          <Link
            className="button button-secondary"
            href={localizedPath(locale, "tools")}
          >
            {dictionary.common.allTools}{" "}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
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
    </main>
  );
}
