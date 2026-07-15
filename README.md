# RUNWAY 10

Daily company-survival game. Make ten irreversible decisions while keeping cash, team, and trust above zero.

## Product

- 84 localized crises across six industry profiles
- One deterministic crisis sequence per profile and UTC date
- One featured industry crisis fixed for each UTC week
- Ten decisions per run
- Four live metrics: cash, team, trust, and growth
- Browser-local run persistence
- Daily streak, survival rate, and personal best records
- Downloadable PNG result cards
- Server-verified global industry percentile
- Post-game AdSense placement
- Start, completion, D1 return, sharing, and choice analytics
- English, Korean, and Japanese
- Responsive desktop and mobile interface

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Upstash Redis through Vercel Marketplace
- Microsoft Clarity product analytics
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
- Industry profile copy: `src/entities/company-scenario/data/profiles.ts`
- Initial metrics, daily order, status transitions, and score: `src/shared/lib/company-survival/game.ts`
- Game interface copy: `src/features/company-survival/copy.ts`
- Site identity and locales: `src/shared/config/site.ts`

Gameplay decisions are stored under profile- and date-scoped browser keys. On completion, the leaderboard API receives the anonymous player ID and decision history, replays the authoritative daily scenario order on the server, and stores only the verified score in Redis. Production builds load Clarity, Vercel page analytics, and a post-game AdSense unit kept outside decision controls.
