import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DeletionContent, PolicyContent } from "@/shared/i18n/legal";
import { SITE_EMAIL, localizedPath, type Locale } from "@/shared/config/site";
import { BrandMark, PolicyFooter } from "@/shared/ui/brand-shell";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

function DocumentHeader({
  locale,
  homeLink,
  themeLabel,
}: {
  locale: Locale;
  homeLink: string;
  themeLabel: string;
}) {
  const otherLocale: Locale = locale === "ko" ? "en" : "ko";

  return (
    <header className="site-header document-site-header">
      <div className="shell header-row document-header-row">
        <Link
          className="brand-link"
          href={localizedPath(locale)}
          aria-label="PixelLogic home"
        >
          <BrandMark />
        </Link>
        <Link className="document-back" href={localizedPath(locale)}>
          <ArrowRight className="inline-icon" aria-hidden="true" />
          {homeLink}
        </Link>
        <div className="header-actions">
          <Link
            className="language-link"
            href={localizedPath(otherLocale)}
            hrefLang={otherLocale}
          >
            <strong>{locale.toUpperCase()}</strong>
            <span aria-hidden="true">·</span>
            <span>{otherLocale.toUpperCase()}</span>
          </Link>
          <ThemeToggle label={themeLabel} />
        </div>
      </div>
    </header>
  );
}

export function PolicyDocument({
  content,
  locale,
  homeLink,
  footerStatement,
  accent,
}: {
  content: PolicyContent;
  locale: Locale;
  homeLink: string;
  footerStatement: string;
  accent: "signal" | "violet";
}) {
  return (
    <>
      <a className="skip-link" href="#document-content">
        {locale === "ko" ? "문서 내용으로 건너뛰기" : "Skip to document"}
      </a>
      <DocumentHeader
        locale={locale}
        homeLink={homeLink}
        themeLabel={locale === "ko" ? "색상 테마 바꾸기" : "Change color theme"}
      />
      <main
        className={`document-page policy-accent-${accent}`}
        id="document-content"
      >
        <header className="document-header shell">
          <p className="eyebrow">{content.label}</p>
          <div>
            <h1>{content.title}</h1>
            <p className="document-description">{content.description}</p>
            <p className="document-meta">{content.effectiveDate}</p>
          </div>
        </header>
        <div className="document-layout shell">
          <nav
            className="policy-toc"
            aria-label={locale === "ko" ? "문서 목차" : "Document sections"}
          >
            {content.sections.map((section, index) => (
              <a href={`#${section.id}`} key={section.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            ))}
          </nav>
          <div className="document-body">
            {content.sections.map((section, index) => (
              <section id={section.id} key={section.id}>
                <span className="policy-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="document-copy">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <PolicyFooter locale={locale} statement={footerStatement} />
    </>
  );
}

export function AccountDeletionDocument({
  content,
  locale,
  homeLink,
  footerStatement,
}: {
  content: DeletionContent;
  locale: Locale;
  homeLink: string;
  footerStatement: string;
}) {
  return (
    <>
      <a className="skip-link" href="#document-content">
        {locale === "ko" ? "삭제 안내로 건너뛰기" : "Skip to deletion guide"}
      </a>
      <DocumentHeader
        locale={locale}
        homeLink={homeLink}
        themeLabel={locale === "ko" ? "색상 테마 바꾸기" : "Change color theme"}
      />
      <main className="document-page deletion-page" id="document-content">
        <header className="document-header shell">
          <p className="eyebrow">{content.label}</p>
          <div>
            <h1>{content.title}</h1>
            <p className="document-description">{content.description}</p>
            <p className="document-meta">{content.effectiveDate}</p>
          </div>
        </header>
        <div className="deletion-content shell">
          <section
            className="deletion-steps"
            aria-labelledby="deletion-steps-title"
          >
            <p className="eyebrow">01 · IN THE APP</p>
            <h2 id="deletion-steps-title">{content.stepsTitle}</h2>
            <ol>
              {content.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section
            className="deletion-scope"
            aria-labelledby="deletion-scope-title"
          >
            <p className="eyebrow">02 · SCOPE</p>
            <h2 id="deletion-scope-title">{content.scopeTitle}</h2>
            <div className="deletion-callout">
              <strong>{content.lastAppNotice}</strong>
            </div>
            <div className="scope-comparison">
              {[content.appScope, content.accountScope].map((scope) => (
                <article key={scope.title}>
                  <span>{scope.badge}</span>
                  <h3>{scope.title}</h3>
                  <ul>
                    {scope.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <p>{scope.note}</p>
                </article>
              ))}
            </div>
          </section>
          <section
            className="deletion-support"
            aria-labelledby="deletion-support-title"
          >
            <p className="eyebrow">03 · SUPPORT</p>
            <div>
              <h2 id="deletion-support-title">{content.supportTitle}</h2>
              <p>{content.supportBody}</p>
            </div>
            <a
              className="button button-primary"
              href={`mailto:${SITE_EMAIL}?subject=PixelLogic%20account%20deletion`}
            >
              {content.supportAction}
              <ArrowRight className="inline-icon" aria-hidden="true" />
            </a>
          </section>
        </div>
      </main>
      <PolicyFooter locale={locale} statement={footerStatement} />
    </>
  );
}
