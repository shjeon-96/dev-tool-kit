# RUNWAY 10

Five-minute daily office-management roguelike. Play action cards, build department chains, and survive six months to Demo Day.

## Product

- Illustrated late-night office board and four animated role sprites
- Four employee, five project, and three funding cards in an editable eight-card deck
- Persistent payroll/production, project completion, funding pressure, and incident counters
- Six industries with distinct starting resources and monthly passives
- Six incidents and three unlockable CEO traits
- One deterministic three-card hand per industry, turn, and UTC date
- Six-month fixed daily run with same-seed retries
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
├── entities/company-scenario/        # Industry profiles
├── features/company-survival/        # Interactive game and localized game copy
└── shared/
    ├── config/                       # Site and advertising configuration
    ├── i18n/                         # Localized legal copy
    ├── lib/company-survival/         # Pure game state transitions
    └── types/                        # Shared game contracts
```

## Sources of truth

- Cards, incidents, CEO traits and effects: `src/shared/lib/company-survival/rules.ts`
- Industry profile copy: `src/entities/company-scenario/data/profiles.ts`
- Daily hands, settlement, chains, status transitions, and score: `src/shared/lib/company-survival/game.ts`
- Game interface copy: `src/features/company-survival/copy.ts`
- Site identity and locales: `src/shared/config/site.ts`

Card decisions are stored under profile- and date-scoped browser keys. On completion, the leaderboard API receives the anonymous player ID, CEO trait, selected deck, and card history, replays the authoritative daily engine on the server, and stores only the verified score in Redis. Production builds load Clarity and a post-game AdSense unit kept outside game controls.

Redis is the source of truth for growth metrics; Clarity remains exploratory UX analytics. The growth report reads the last 14 UTC days and never mutates production data.
