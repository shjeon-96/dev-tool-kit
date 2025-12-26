import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Clock, BookOpen } from "lucide-react";
import { cn } from "@/shared/lib";
import { tools } from "@/entities/tool";
import { getAllGuides, type GuideSlug } from "@/entities/guide";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guides");
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

const difficultyColors = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-warning/10 text-warning",
  advanced: "bg-destructive/10 text-destructive",
};

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("guides");
  const tTools = await getTranslations("tools");

  const guides = getAllGuides();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
        </div>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide) => {
          const tool = tools[guide.slug as keyof typeof tools];
          const Icon = tool?.icon;

          return (
            <Link
              key={guide.slug}
              href={`/${locale}/guides/${guide.slug}`}
              className="group block rounded-lg border p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="p-3 rounded-lg bg-muted transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">
                    {tTools(`${guide.slug as GuideSlug}.title`)} Guide
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {t(`${guide.slug}.summary`)}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        difficultyColors[guide.difficulty],
                      )}
                    >
                      {difficultyLabels[guide.difficulty]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {guide.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
