export function PolicyDocument({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: readonly {
    title: string;
    body: string;
    links?: readonly { label: string; href: string }[];
  }[];
}) {
  return (
    <main className="shell content-page">
      <header className="content-page-header">
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
              {section.links ? (
                <div className="document-links">
                  {section.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
