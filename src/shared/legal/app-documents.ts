import { LOCALES, type Locale } from "@/shared/config/site";
import { BITEMORY_DOCUMENTS } from "./bitemory";
import { BLOCK_BLAST_DOCUMENTS } from "./block-blast";
import { BORI_CLEANER_DOCUMENTS } from "./bori-cleaner";
import { ONE_SECOND_RUN_DOCUMENTS } from "./one-second-run";
import { ORBIT_DOCUMENTS } from "./orbit";
import { SOL_SCHEDULER_DOCUMENTS } from "./sol-scheduler";
import { SORIPDF_DOCUMENTS } from "./soripdf";
import { TALK_TALK_DOCUMENTS } from "./talk-talk";
import { WEIGHT_HISTORY_DOCUMENTS } from "./weight-history";
import { WOON_DOCUMENTS } from "./woon";

// 스토어에 등록하는 앱별 개인정보 처리방침·약관·지원 URL의 원본이다.
// 주소는 /{locale}/work/{slug}/{kind}이고, slug는 상세페이지(productSlug)와 같게 둔다.
// 출시 전 앱도 심사에 URL이 필요해서 제품 목록(PRODUCT_LINKS)과 따로 둔다.
export const APP_DOCUMENT_KINDS = ["privacy", "terms", "support"] as const;
export type AppDocumentKind = (typeof APP_DOCUMENT_KINDS)[number];

export type AppDocument = {
  title: string;
  description: string;
  lead?: string;
  effectiveAt?: string;
  updatedAt: string;
  sections: readonly {
    title: string;
    body?: readonly string[];
    items?: readonly string[];
    links?: readonly { label: string; href: string }[];
  }[];
};

type AppDocuments = Partial<
  Record<Locale, Partial<Record<AppDocumentKind, AppDocument>>>
>;

export const APP_DOCUMENTS: Record<string, AppDocuments> = {
  bitemory: BITEMORY_DOCUMENTS,
  "block-blast": BLOCK_BLAST_DOCUMENTS,
  "bori-cleaner": BORI_CLEANER_DOCUMENTS,
  "one-second-run": ONE_SECOND_RUN_DOCUMENTS,
  orbit: ORBIT_DOCUMENTS,
  "sol-scheduler": SOL_SCHEDULER_DOCUMENTS,
  soripdf: SORIPDF_DOCUMENTS,
  "talk-talk": TALK_TALK_DOCUMENTS,
  "weight-history": WEIGHT_HISTORY_DOCUMENTS,
  woon: WOON_DOCUMENTS,
};

export function appDocumentEntries() {
  return Object.entries(APP_DOCUMENTS).flatMap(([slug, byLocale]) =>
    LOCALES.flatMap((locale) =>
      APP_DOCUMENT_KINDS.filter((kind) => byLocale[locale]?.[kind]).map(
        (kind) => ({ locale, slug, kind }),
      ),
    ),
  );
}

export function findAppDocument(slug: string, locale: Locale, kind: string) {
  if (!Object.hasOwn(APP_DOCUMENTS, slug)) return undefined;
  const byKind: Partial<Record<string, AppDocument>> =
    APP_DOCUMENTS[slug][locale] ?? {};
  return Object.hasOwn(byKind, kind) ? byKind[kind] : undefined;
}
