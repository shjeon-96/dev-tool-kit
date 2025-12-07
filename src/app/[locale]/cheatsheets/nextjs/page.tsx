import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheatsheetTable, nextjsSyntax } from "@/entities/cheatsheet";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cheatsheets.nextjs");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NextjsCheatsheetPage() {
  const t = await getTranslations("cheatsheets.nextjs");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">{t("description")}</p>
      <CheatsheetTable items={nextjsSyntax} />
    </div>
  );
}
