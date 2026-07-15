# RUNWAY 10

Daily company-survival game. Make ten irreversible decisions while keeping cash, team, and trust above zero.

## Product

- One deterministic crisis sequence per UTC date
- Ten decisions per run
- Four live metrics: cash, team, trust, and growth
- Browser-local run persistence
- Shareable final score
- English, Korean, and Japanese
- Responsive desktop and mobile interface

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest and Playwright

## Commands

```bash
npm install
npm run dev
npm test -- --run
npm run lint
npm run build
npm run test:e2e
```

## Architecture

```text
src/
├── app/                              # Routes, metadata, OG image, global design
├── entities/company-scenario/        # Authoritative scenario deck
├── features/company-survival/        # Interactive game and localized game copy
└── shared/
    ├── config/                       # Site and advertising configuration
    ├── i18n/                         # Localized legal copy
    ├── lib/company-survival/         # Pure game state transitions
    └── types/                        # Shared game contracts
```

## Sources of truth

- Scenario writing and effects: `src/entities/company-scenario/data/scenarios.ts`
- Initial metrics, daily order, status transitions, and score: `src/shared/lib/company-survival/game.ts`
- Game interface copy: `src/features/company-survival/copy.ts`
- Site identity and locales: `src/shared/config/site.ts`

Gameplay decisions are stored under a date-scoped key in browser local storage. No application API receives the run. Production builds load the configured AdSense script; ad placement remains separate from decision controls.
