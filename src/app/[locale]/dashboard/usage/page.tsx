import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BarChart3, Construction } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard");
  return {
    title: t("quickLinks.usage"),
  };
}

export default async function UsagePage() {
  const t = await getTranslations("dashboard");

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BarChart3 className="h-8 w-8" />
          {t("quickLinks.usage")}
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md">
          Usage analytics is under development. You&apos;ll be able to track
          your API calls, tool usage, and quota consumption.
        </p>
      </div>
    </div>
  );
}
