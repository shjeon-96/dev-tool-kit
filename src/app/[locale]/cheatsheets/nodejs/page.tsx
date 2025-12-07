import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheatsheetTable, nodejsSyntax } from "@/entities/cheatsheet";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cheatsheets.nodejs");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NodejsCheatsheetPage() {
  const t = await getTranslations("cheatsheets.nodejs");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">{t("description")}</p>
      <CheatsheetTable items={nodejsSyntax} />
    </div>
  );
}
