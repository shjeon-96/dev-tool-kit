import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";
import { getAllUseCases, type UseCaseSlug } from "@/entities/use-case";
import { tools } from "@/entities/tool";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("useCases");
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function UseCasesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("useCases");
  const tTools = await getTranslations("tools");

  const useCases = getAllUseCases();

  // Group by tool
  const groupedByTool = useCases.reduce(
    (acc, useCase) => {
      const toolSlug = useCase.toolSlug;
      if (!acc[toolSlug]) {
        acc[toolSlug] = [];
      }
      acc[toolSlug].push(useCase);
      return acc;
    },
    {} as Record<string, typeof useCases>,
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
        </div>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedByTool).map(([toolSlug, toolUseCases]) => {
          const tool = tools[toolSlug as keyof typeof tools];
          if (!tool) return null;

          const Icon = tool.icon;

          return (
            <div key={toolSlug} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">
                  {tTools(`${toolSlug}.title`)}
                </h2>
              </div>

              <div className="grid gap-3">
                {toolUseCases.map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/${locale}/use-cases/${useCase.slug}`}
                    className="group flex items-center justify-between rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                  >
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {t(`${useCase.slug as UseCaseSlug}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t(`${useCase.slug as UseCaseSlug}.description`)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
