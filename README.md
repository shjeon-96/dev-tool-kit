# RUNWAY 10

Daily company-survival game. Make irreversible decisions while keeping cash, team, and trust above zero.

## Product

- 84 localized crises across six industry profiles
- One deterministic crisis sequence per profile and UTC date
- One featured industry crisis fixed for each UTC week
- Deterministic 6-vs-10 decision retention experiment
- Four live metrics: cash, team, trust, and growth
- Browser-local run persistence
- Daily streak, survival rate, and personal best records
- Native result sharing with attributed referral links
- Downloadable PNG result cards
- Server-verified global industry percentile
- Post-game AdSense placement
- Server-backed start, completion, D1/D7 cohort, sharing, and referral analytics
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
npm run report:growth -- --end=2026-07-16
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

Gameplay decisions are stored under profile- and date-scoped browser keys. On completion, the leaderboard API receives the anonymous player ID and decision history, replays the authoritative daily scenario order on the server, and stores only the verified score in Redis. Production builds load Clarity and a post-game AdSense unit kept outside decision controls.

Redis is the source of truth for growth metrics; Clarity remains exploratory UX analytics. The growth report reads the last 14 UTC days and never mutates production data.
