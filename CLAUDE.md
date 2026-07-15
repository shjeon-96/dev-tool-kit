# RUNWAY 10 Development Guide

## Product rules

1. `RUNWAY 10` is a daily company-survival decision game.
2. Every UTC date has one deterministic ten-scenario order shared by all locales.
3. Scenario data owns narrative and choice effects. Game engine owns state transitions and scoring.
4. Cash, team, or trust reaching zero ends a run. Growth affects score but is not a failure condition.
5. Decisions cannot be undone. Restart explicitly deletes the current local run.
6. English, Korean, and Japanese versions must expose identical rules and effects.
7. Do not add alternate game paths, placeholder scenarios, or compatibility implementations.

## Required checks

```bash
npm test -- --run
npm run lint
npm run build
npm run test:e2e
```
