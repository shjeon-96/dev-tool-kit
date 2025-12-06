import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { tools, type ToolSlug } from "@/entities/tool";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("tools");
  const tSite = await getTranslations("site");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DevToolkit</h1>
        <p className="text-muted-foreground">{tSite("description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(tools).map(([slug, tool]) => (
          <Link
            key={slug}
            href={`/${locale}/tools/${slug}`}
            className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <tool.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {t(`${slug as ToolSlug}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`${slug as ToolSlug}.description`)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
