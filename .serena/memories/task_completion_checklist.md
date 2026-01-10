# Task Completion Checklist

## 코드 작성 완료 후

### 1. 타입 검사

```bash
npm run build           # 빌드 시 타입 에러 확인
```

### 2. 린트 검사

```bash
npm run lint            # ESLint 검사
```

### 3. 테스트 실행

```bash
npm run test --run      # 단위 테스트
npm run test:e2e        # E2E 테스트 (필요시)
```

## 새 기능 추가 체크리스트

### Feature 추가 시

1. [ ] `src/features/[feature]/` - Feature 구현
   - `model/use-*.ts` - Hook
   - `lib/*.ts` - 순수 함수
   - `lib/*.test.ts` - 단위 테스트
   - `ui/*.tsx` - UI 컴포넌트
   - `index.ts` - 배럴 export
2. [ ] `messages/en.json`, `messages/ko.json` - 번역 추가
3. [ ] `npm run lint` - 린트 통과
4. [ ] `npm run test --run` - 테스트 통과

### Entity 추가 시

1. [ ] `src/entities/[entity]/model/types.ts` - 타입 정의
2. [ ] `src/entities/[entity]/model/queries.ts` - Supabase 쿼리
3. [ ] `src/entities/[entity]/index.ts` - 배럴 export
4. [ ] Supabase 테이블 생성 (마이그레이션)

### API Route 추가 시

1. [ ] `src/app/api/[route]/route.ts` - API 핸들러
2. [ ] 인증/권한 검사 구현
3. [ ] 에러 핸들링 구현
4. [ ] API 테스트 (curl 또는 E2E)

### Cron Job 추가 시

1. [ ] `src/app/api/cron/[job]/route.ts` - Cron 핸들러
2. [ ] `vercel.json` - Cron 스케줄 등록
3. [ ] CRON_SECRET 인증 검사
4. [ ] 에러 핸들링 및 로깅

## 커밋 전 체크리스트

1. [ ] 모든 테스트 통과
2. [ ] 린트 에러 없음
3. [ ] 빌드 성공
4. [ ] 불필요한 console.log 제거
5. [ ] 커밋 메시지 컨벤션 준수

## 커밋 메시지 컨벤션

```
<type>: <subject>

feat: 새로운 기능
fix: 버그 수정
refactor: 리팩토링
test: 테스트 추가/수정
docs: 문서 수정
chore: 빌드, 설정 변경
```

## 배포 전 체크리스트

1. [ ] 환경 변수 설정 확인
   - SUPABASE_URL, SUPABASE_ANON_KEY
   - ANTHROPIC_API_KEY
   - LEMONSQUEEZY_API_KEY
   - CRON_SECRET
2. [ ] Vercel Cron Jobs 설정 확인
3. [ ] 프로덕션 빌드 성공 확인
