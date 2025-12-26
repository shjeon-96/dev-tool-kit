import Link from "next/link";
import { Button } from "@/shared/ui/button";

interface RelatedItem {
  slug: string;
  name: string;
}

interface RelatedToolsProps {
  locale: string;
  title: string;
  routePrefix: string;
  items: RelatedItem[];
}

/**
 * Related Tools Section
 *
 * pSEO 페이지에서 사용하는 관련 도구 링크 섹션
 */
export function RelatedTools({
  locale,
  title,
  routePrefix,
  items,
}: RelatedToolsProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link key={item.slug} href={`/${locale}/${routePrefix}/${item.slug}`}>
            <Button variant="outline" size="sm">
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
