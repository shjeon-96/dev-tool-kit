# Build & Deploy Skill

빠른 빌드, 확인, 배포 워크플로우입니다.

## Trigger

- "빌드", "build"
- "배포", "deploy"
- "확인해줘", "check"
- "돌아가?", "작동해?"

## Quick Commands

### 🚀 한 줄 명령어

```bash
# 빠른 체크 (타입 + 린트)
npx tsc --noEmit && npm run lint

# 전체 검증 (타입 + 린트 + 테스트 + 빌드)
npx tsc --noEmit && npm run lint && npm run test --run && npm run build

# 개발 서버
npm run dev
```

## Development

### 개발 서버 실행

```bash
npm run dev
# http://localhost:3000
```

### 특정 포트로 실행

```bash
npm run dev -- -p 3001
```

## Build

### 프로덕션 빌드

```bash
npm run build
```

빌드 시 확인되는 항목:

- TypeScript 타입 검사
- ESLint 규칙
- 정적 페이지 생성
- 번역 키 존재

### 빌드 분석

```bash
npm run analyze
```

번들 크기와 의존성 트리 시각화

## Deploy

### Vercel 배포

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 프리뷰 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 환경 변수 확인

```bash
# 필수 환경 변수
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY
CRON_SECRET
```

## Health Check

### 빠른 상태 확인

```bash
# 1. 타입 에러?
npx tsc --noEmit

# 2. 린트 에러?
npm run lint

# 3. 테스트 통과?
npm run test --run

# 4. 빌드 성공?
npm run build
```

### 원라인 헬스 체크

```bash
npx tsc --noEmit && npm run lint && echo "✅ All good!"
```

## Cron Jobs 테스트

### 로컬에서 Cron 수동 실행

```bash
# 개발 서버 실행 상태에서

# 트렌드 수집
curl http://localhost:3000/api/cron/trends

# 기사 생성
curl http://localhost:3000/api/cron/generate-articles

# 기사 발행
curl http://localhost:3000/api/cron/publish-articles
```

## Troubleshooting

### 빌드 실패 시

```bash
# 캐시 삭제 후 재빌드
rm -rf .next node_modules/.cache
npm run build
```

### 타입 에러 시

```bash
# 상세 에러 확인
npx tsc --noEmit --pretty
```

### 의존성 문제 시

```bash
# 클린 설치
rm -rf node_modules package-lock.json
npm install
```

## CI/CD Pipeline

```yaml
# GitHub Actions
1. npx tsc --noEmit    # 타입 체크
2. npm run lint        # 린트
3. npm run test --run  # 테스트
4. npm run build       # 빌드
5. vercel --prod       # 배포
```

## 바이브 코딩 팁

```bash
# 코드 수정 후 빠른 확인
npx tsc --noEmit && npm run lint

# 문제 없으면 바로 커밋
git add . && git commit -m "feat: ..."

# 푸시하면 자동 배포 (Vercel)
git push
```
