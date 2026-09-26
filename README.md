> 이 저장소는 보관됐어요. 사이트는 [pixellogic-design-system](https://github.com/shjeon-96/pixellogic-design-system) 모노레포의 `apps/web-toolkit`으로 옮겼고, Vercel도 그 저장소에서 배포해요(2026-09-27).

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
