# Trend Battle

Trend Battle is a fast higher-or-lower comparison game. Users immediately see a round, choose which item has the bigger number, and get instant feedback with the actual values.

## MVP Scope

- Random game page at `/` and `/play`
- Category pages for countries, cities, movies, animals, and mountains
- Duel mode and Classic higher/lower mode
- Score, game over state, restart, share result, and local high score
- English and Korean routes (`/ko`, `/ko/countries`, etc.)
- SEO content pages for search queries such as country population and movie box office quizzes
- Daily 10-question challenge at `/daily` and `/ko/daily`
- About, Privacy, Terms, Contact, and Sources pages for AdSense readiness
- Static JSON-style data in local TypeScript data files

## Routes

| Route                                                  | Purpose                                       |
| ------------------------------------------------------ | --------------------------------------------- |
| `/`                                                    | Random game                                   |
| `/play`                                                | Random game                                   |
| `/daily`                                               | Daily 10-question challenge                   |
| `/countries`                                           | Country population game                       |
| `/cities`                                              | City population game                          |
| `/movies`                                              | Movie box office game                         |
| `/animals`                                             | Animal speed game                             |
| `/mountains`                                           | Mountain height game                          |
| `/higher-lower-country-population`                     | SEO page with country population game and FAQ |
| `/higher-lower-movie-box-office`                       | SEO page with movie box office game and FAQ   |
| `/which-country-has-more-people`                       | SEO page for country population query intent  |
| `/animal-speed-quiz`                                   | SEO page with animal speed game and FAQ       |
| `/mountain-height-quiz`                                | SEO page with mountain height game and FAQ    |
| `/ko/*`                                                | Korean localized routes                       |
| `/about`, `/privacy`, `/terms`, `/sources`, `/contact` | Policy and trust pages                        |

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm test -- --run
npm run lint
npm run build
```

## Project Structure

```text
src/app/                         Next.js App Router pages
src/app/_trend/                  Shared page shells
src/entities/trend-item/data/    Category and item data
src/shared/lib/trend-battle/     Game, format, storage, analytics, i18n logic
src/shared/types/                Shared product types
src/widgets/trend-battle/ui/     Game UI widgets
```
