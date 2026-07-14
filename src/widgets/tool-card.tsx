import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { getDictionary } from "@/shared/i18n/dictionaries";
import type { Locale } from "@/shared/config/site";
import { localizedPath } from "@/shared/config/site";
import type { ToolDefinition } from "@/shared/config/tools";
import { ToolIcon } from "@/shared/ui/tool-icon";

type Dictionary = ReturnType<typeof getDictionary>;

export function ToolCard({
  tool,
  locale,
  dictionary,
}: {
  tool: ToolDefinition;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = dictionary.tools[tool.slug];

  return (
    <Link
      className={`tool-card accent-${tool.accent}`}
      href={localizedPath(locale, `tools/${tool.slug}`)}
    >
      <div className="tool-card-topline">
        <span>{tool.index}</span>
        <ToolIcon name={tool.icon} />
      </div>
      <h3>{copy.title}</h3>
      <p>{copy.shortDescription}</p>
      <span className="tool-card-action">
        {dictionary.common.openTool}
        <ArrowUpRight aria-hidden="true" size={17} />
      </span>
    </Link>
  );
}
