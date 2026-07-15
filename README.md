# Web Toolkit

Fast, private browser utilities for common developer data. The main domain is an advertising-supported utility site.

Supported locales: English (`en`), Korean (`ko`), Japanese (`ja`). Locale prefixes are mandatory. `/` redirects using `Accept-Language`, with English as the explicit default.

## Tools

- JSON formatter and validator
- Base64 encoder and decoder
- UUID v4 generator
- Unix timestamp converter
- URL component encoder and decoder
- SHA-256/384/512 hash generator
- JWT decoder
- HTML entity encoder and decoder
- HEX/RGB/HSL color converter
- Regular expression tester
- Word, character, line and byte counter
- Text case converter
- URL slug generator
- Secure password generator
- Binary/octal/decimal/HEX converter
- CSV and JSON converter
- Query string parser and builder
- JSON to TypeScript generator
- Line sorter
- Duplicate line remover

All tool inputs are processed with browser APIs. Tool data is not sent to an application API.

## Architecture

```text
src/
├── app/[locale]/              # Localized routes and metadata
├── features/tools/            # Interactive browser workbench
├── shared/config/             # Site, tool and AdSense truth
├── shared/i18n/               # EN/KO/JA content dictionaries and tool guides
├── shared/lib/                # Shared metadata helpers
├── shared/ui/                 # Small presentational primitives
└── widgets/                   # Site shell, language switcher, tool cards
```

Authoritative sources:

- Locales and site identity: `src/shared/config/site.ts`
- Tool slugs and display definitions: `src/shared/config/tools.ts`
- Localized content: `src/shared/i18n/dictionaries.ts` and `extra-tool-copy.ts`
- AdSense publisher identity and `ads.txt`: `src/shared/config/adsense.ts`

Cards, routes, metadata and sitemap entries derive from these sources.

## Development

```bash
npm install
npm run dev
npm run lint
npm run test:e2e
npm run build
```

The project currently requires no runtime secrets. Auto ads load only in production. Google AdSense must also be enabled for `web-toolkit.app` in the AdSense console.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4 build pipeline with a custom field-manual design system
- Playwright for route and browser behavior verification

## License

[MIT](LICENSE)
