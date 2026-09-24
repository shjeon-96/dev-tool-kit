import { describe, expect, it, vi } from "vitest";
import {
  LOCALES,
  PRODUCT_LINKS,
  productFromSlug,
  productSlug,
  type ProductId,
} from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { PRODUCT_SCREENSHOTS } from "@/shared/ui/brand-assets";

// The registry is plain data; the kit ships images Node cannot import.
vi.mock("@pixellogic/ui/react", () => ({}));

describe("product detail copy", () => {
  it("gives every screenshot a caption in every locale", () => {
    for (const locale of LOCALES) {
      for (const product of getDictionary(locale).home.products) {
        const shots = PRODUCT_SCREENSHOTS[product.id]?.shots ?? [];
        expect(product.screens, `${locale} ${product.id}`).toHaveLength(
          shots.length,
        );
      }
    }
  });

  it("round-trips every product through its URL slug", () => {
    for (const id of Object.keys(PRODUCT_LINKS) as ProductId[]) {
      expect(productFromSlug(productSlug(id))).toBe(id);
    }
    expect(productFromSlug("unknown")).toBeUndefined();
  });
});
