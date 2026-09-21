import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_STORE_LINKS } from "@/shared/config/site";
import type { ProductCopy } from "@/shared/i18n/dictionaries";

export function ProductCard({
  product,
  index,
  icon: Icon,
  storeLabels,
}: {
  product: ProductCopy;
  index: number;
  icon: LucideIcon;
  storeLabels: { ios: string; android: string };
}) {
  const stores = PRODUCT_STORE_LINKS[product.id];

  return (
    <article className={`product-card accent-${product.accent}`}>
      <div className="product-card-topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{product.meta}</span>
      </div>
      <div className="product-card-mark" aria-hidden="true">
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <div className="product-card-copy">
        <div className="product-card-title-row">
          <h3>{product.name}</h3>
          <span className="product-status">{product.status}</span>
        </div>
        <p>{product.description}</p>
      </div>
      <div className="product-card-actions">
        <a href={stores.ios} target="_blank" rel="noreferrer">
          {storeLabels.ios} <ArrowUpRight aria-hidden="true" size={14} />
        </a>
        <a href={stores.android} target="_blank" rel="noreferrer">
          {storeLabels.android} <ArrowUpRight aria-hidden="true" size={14} />
        </a>
      </div>
    </article>
  );
}
