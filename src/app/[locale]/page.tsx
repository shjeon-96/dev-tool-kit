import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect(`/${locale}/tools`);
}
