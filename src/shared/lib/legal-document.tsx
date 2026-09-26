import * as UI from "@pixellogic/ui/react";

type LegalCopySection = {
  title: string;
  body: string;
  links?: readonly { label: string; href: string }[];
};

export function legalDocumentSections(sections: readonly LegalCopySection[]) {
  return sections.map((section, index) => ({
    id: `section-${index + 1}`,
    title: section.title,
    body: (
      <>
        <p>{section.body}</p>
        {section.links?.length ? (
          <UI.Stack direction="row" gap="lg">
            {section.links.map((link) => (
              <UI.TextButton
                key={link.href}
                href={link.href}
                external
                variant="underline"
              >
                {link.label}
              </UI.TextButton>
            ))}
          </UI.Stack>
        ) : null}
      </>
    ),
  }));
}
