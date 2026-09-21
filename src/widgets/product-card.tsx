"use client";

import * as UI from "@pixellogic/ui/react";
import {
  ArrowUpRight,
  CalendarDays,
  Gamepad2,
  Heart,
  Scale,
} from "lucide-react";
import { PRODUCT_LINKS } from "@/shared/config/site";
import type { ProductCopy } from "@/shared/i18n/dictionaries";

const PRODUCT_ICONS = {
  weightHistory: Scale,
  solScheduler: CalendarDays,
  oneSecondRun: Heart,
  pixelLogicBlocks: Gamepad2,
} as const;

export function ProductCard({
  product,
  index,
  linkLabels,
}: {
  product: ProductCopy;
  index: number;
  linkLabels: {
    appStore: string;
    googlePlay: string;
    web: string;
    publicPage: string;
  };
}) {
  const links = PRODUCT_LINKS[product.id];
  const Icon = PRODUCT_ICONS[product.id];

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <UI.Card className={`product-card-shell accent-${product.accent}`}>
      <UI.CardHeader className="product-card-header">
        <div className="product-card-topline">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{product.meta}</span>
        </div>
        <div className="product-card-mark" aria-hidden="true">
          <UI.Icon icon={Icon} size="large" />
        </div>
        <div className="product-card-title-row">
          <UI.CardTitle role="heading" aria-level={3}>
            {product.name}
          </UI.CardTitle>
          <UI.StatusBadge tone="success">{product.status}</UI.StatusBadge>
        </div>
        <UI.CardDescription>{product.description}</UI.CardDescription>
      </UI.CardHeader>
      <UI.CardFooter className="product-card-footer">
        {Object.entries(links).map(([kind, url]) => (
          <UI.Button
            key={kind}
            size="sm"
            variant="outline"
            onClick={() => openLink(url)}
          >
            {kind === "appStore"
              ? linkLabels.appStore
              : kind === "googlePlay"
                ? linkLabels.googlePlay
                : kind === "web"
                  ? linkLabels.web
                  : linkLabels.publicPage}{" "}
            <ArrowUpRight aria-hidden="true" size={14} />
          </UI.Button>
        ))}
      </UI.CardFooter>
    </UI.Card>
  );
}
