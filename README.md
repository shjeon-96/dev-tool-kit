# PixelLogic homepage

The multilingual PixelLogic product-studio homepage. It presents the studio's apps and digital products in English, Korean and Japanese.

## Development

```bash
npm install
npm run dev
npm run lint
npx vitest run
npm run build
```

## Structure

```text
src/
├── app/[locale]/       # Localized homepage, studio and legal routes
├── shared/config/      # Site identity and AdSense settings
├── shared/i18n/        # EN/KO/JA homepage and legal copy
├── shared/ui/          # Brand assets and document primitives
└── widgets/            # Site shell and product cards
```

PixelLogic product names and descriptions shown here are maintained in the localized dictionary and are intentionally separated from product runtime repositories.
