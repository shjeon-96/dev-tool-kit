import Link from "next/link";
import { localizedPath, type Locale } from "@/shared/config/site";

export function PolicyDocument({
  title,
  updated,
  sections,
  locale,
}: {
  title: string;
  updated: string;
  sections: readonly { title: string; body: string }[];
  locale: Locale;
}) {
  return (
    <main className="shell content-page">
      <header className="content-page-header">
        <Link className="eyebrow" href={localizedPath(locale)}>
          RUNWAY 10 / DOCUMENT
        </Link>
        <h1>{title}</h1>
        <p>{updated}</p>
      </header>
      <div className="document-grid">
        {sections.map((section, index) => (
          <section key={section.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
