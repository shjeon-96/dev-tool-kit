import type { LucideIcon } from "lucide-react";
import type { ProductCopy } from "@/shared/i18n/dictionaries";

export function ProductCard({
  product,
  index,
  icon: Icon,
}: {
  product: ProductCopy;
  index: number;
  icon: LucideIcon;
}) {
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
      <span className="product-card-note">{product.status}</span>
    </article>
  );
}
