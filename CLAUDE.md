# PixelLogic homepage development guide

1. `web-toolkit.app` is the current hosted surface for the PixelLogic studio homepage.
2. English, Korean and Japanese routes always use locale prefixes.
3. Product names and localized showcase copy have one source in `src/shared/i18n/dictionaries.ts`.
4. Site identity and canonical metadata have one source in `src/shared/config/site.ts`.
5. Keep the homepage focused on PixelLogic products, craft and studio principles. Do not reintroduce the retired developer-utility surface.
6. Do not invent product metrics, store availability or product promises that are not confirmed by the source project.
7. Adding a product follows `docs/adding-a-product.md`. Visual changes follow `docs/design.md`: `@pixellogic/ui` tokens only, real links, verified product images, no badge or list-row filler.

Required completion checks:

```bash
npm run lint
npx vitest run
npm run build
```
