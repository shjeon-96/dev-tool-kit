# PixelLogic homepage

The multilingual PixelLogic product-studio homepage. It presents the studio's apps, games and experiments in English, Korean and Japanese, with the daily Trend Battle game kept as a separate playful surface.

## Development

```bash
npm install
npm run dev
npm run lint
npm run test:e2e
npm run build
```

## Structure

```text
src/
├── app/[locale]/       # Localized homepage, studio, play and legal routes
├── entities/           # Trend Battle game data
├── features/           # Trend Battle game experience
├── shared/config/      # Site identity and AdSense settings
├── shared/i18n/        # EN/KO/JA homepage and legal copy
├── shared/ui/          # Brand assets and document primitives
└── widgets/            # Site shell and product cards
```

PixelLogic product names and descriptions shown here are maintained in the localized dictionary and are intentionally separated from product runtime repositories.
