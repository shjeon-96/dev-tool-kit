# Web Toolkit Development Guide

`README.md` is the authoritative project overview. Keep implementation aligned with these invariants:

1. `web-toolkit.app` is the multilingual advertising-supported utility site.
2. English, Korean and Japanese routes always use locale prefixes.
3. Tool inputs remain client-side; adding network processing requires an explicit product decision and privacy update.
4. Site identity, locales, tools and AdSense settings each have one source in `src/shared/config`.
5. Localized copy lives only in `src/shared/i18n`.
6. Do not add placeholder ad units or invent AdSense slot IDs. Auto ads use the configured publisher ID in production.

Required completion checks:

```bash
npm run lint
npm run test:e2e
npm run build
```
