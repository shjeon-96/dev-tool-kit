# Suggested Commands for dev-tool-kit

## Development

```bash
nvm use 20              # Node.js 20+ 필수
npm install             # 의존성 설치
npm run dev             # 개발 서버 - http://localhost:3000
npm run build           # 프로덕션 빌드
npm start               # 프로덕션 서버 실행
```

## Testing

```bash
npm run test            # Vitest 단위 테스트 (watch 모드)
npm run test [pattern]  # 특정 패턴 테스트
npm run test --run      # 단일 실행 (watch 없이, CI용)
npm run test:coverage   # 커버리지 리포트 생성
npm run test:ui         # Vitest UI 모드
npm run test:e2e        # Playwright E2E 테스트
npm run test:e2e:ui     # Playwright UI 모드 (디버깅용)
```

## Code Quality

```bash
npm run lint            # ESLint 검사
```

## Analysis

```bash
npm run analyze         # 번들 분석 (ANALYZE=true)
```

## Cron Job Manual Trigger (개발용)

트렌드 수집, 기사 생성, 발행 API를 수동으로 테스트:

```bash
# 트렌드 수집
curl -X GET "http://localhost:3000/api/cron/trends" \
  -H "Authorization: Bearer $CRON_SECRET"

# AI 기사 생성
curl -X GET "http://localhost:3000/api/cron/generate-articles" \
  -H "Authorization: Bearer $CRON_SECRET"

# 기사 발행
curl -X GET "http://localhost:3000/api/cron/publish-articles" \
  -H "Authorization: Bearer $CRON_SECRET"
```

## Database (Supabase)

Supabase Studio에서 직접 관리하거나 SQL 실행:

```bash
# Supabase CLI (선택사항)
npx supabase login
npx supabase db push        # 마이그레이션 푸시
npx supabase db reset       # DB 리셋 (주의!)
```

## Git / System (Darwin/macOS)

```bash
git status              # 변경사항 확인
git diff                # 변경 내용 확인
git add .               # 스테이징
git commit -m "msg"     # 커밋
git push                # 푸시
```
