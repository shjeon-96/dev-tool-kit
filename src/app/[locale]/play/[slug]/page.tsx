import { notFound, redirect } from "next/navigation";
import { isLocale, localizedPath } from "@/shared/config/site";

export default async function LegacyGamePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(localizedPath(locale));
}
