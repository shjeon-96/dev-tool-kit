import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, localizedPath } from "@/shared/config/site";
import { FEATURED_TOOLS } from "@/shared/config/tools";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { createPageMetadata } from "@/shared/lib/metadata";
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

        <div className="hero-instrument" aria-hidden="true">
          <div className="instrument-ruler">
            <span>00</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
          </div>
          <div className="instrument-screen">
            <span>LOCAL PROCESS</span>
            <strong>
              READY<span>_</span>
            </strong>
            <code>{`{ "upload": false }`}</code>
          </div>
          <div className="instrument-note">INPUT → BROWSER → OUTPUT</div>
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
