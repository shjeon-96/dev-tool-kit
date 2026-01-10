# 트렌드 블로그 배포 체크리스트

> web-toolkit.app을 자동화 트렌드 블로그로 전환하기 위한 배포 가이드

---

## 1. Supabase 설정

### 1.1 마이그레이션 실행

Supabase 대시보드 또는 CLI에서 아래 SQL 파일 실행:

```bash
# 파일 위치
supabase/migrations/20260110_create_trend_blog_tables.sql
```

**또는** Supabase 대시보드 → SQL Editor에서 직접 실행

### 1.2 생성되는 테이블 확인

| 테이블 | 용도 |
|--------|------|
| `trends` | 수집된 트렌드 키워드 저장 |
| `articles` | AI 생성 기사 저장 |
| `publish_queue` | 발행 대기열 관리 |
| `article_analytics` | 기사 조회수/통계 |

### 1.3 RLS (Row Level Security) 확인

마이그레이션에 RLS 정책이 포함되어 있음. 실행 후 확인:
- `trends`: 서비스 롤만 쓰기 가능
- `articles`: 발행된 기사만 공개 읽기 가능

---

## 2. 환경 변수 설정

### 2.1 Vercel 대시보드에서 설정

Settings → Environment Variables에서 추가:

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | Claude API 키 | `sk-ant-api03-...` |
| `CRON_SECRET` | Cron 인증용 시크릿 | 랜덤 문자열 32자 이상 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서비스 롤 키 | Supabase 대시보드에서 복사 |

### 2.2 CRON_SECRET 생성 방법

```bash
# 터미널에서 실행
openssl rand -hex 32
```

### 2.3 기존 환경 변수 확인

이미 설정되어 있어야 하는 변수들:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://web-toolkit.app
```

---

## 3. Anthropic API 설정

### 3.1 API 키 발급

1. https://console.anthropic.com 접속
2. API Keys → Create Key
3. 키 복사 후 Vercel 환경 변수에 저장

### 3.2 예산 설정 (권장)

Anthropic 콘솔에서 월간 사용량 제한 설정:
- 권장: $50/월
- 하드 리밋: $60/월

### 3.3 비용 예상

| 항목 | 비용 |
|------|------|
| 기사 1개 생성 | ~$0.004 |
| 일일 20개 | ~$0.08 |
| 월간 600개 | ~$2.40 |

실제로는 여유있게 $50 예산 권장

---

## 4. 배포

### 4.1 배포 명령어

```bash
# 프로덕션 배포
vercel deploy --prod
```

### 4.2 배포 후 확인사항

- [ ] 홈페이지 정상 로딩 (https://web-toolkit.app)
- [ ] 카테고리 페이지 접근 가능 (/en/tech, /ko/tech 등)
- [ ] Cron 작업 등록 확인 (Vercel 대시보드 → Cron Jobs)

---

## 5. Cron 작업 테스트

### 5.1 수동 트리거 (터미널)

```bash
# 트렌드 수집 테스트
curl -X POST "https://web-toolkit.app/api/cron/trends" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# 기사 생성 테스트
curl -X POST "https://web-toolkit.app/api/cron/generate-articles" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# 기사 발행 테스트
curl -X POST "https://web-toolkit.app/api/cron/publish-articles" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 5.2 Vercel 대시보드에서 확인

1. Vercel 프로젝트 → Cron Jobs 탭
2. 등록된 3개 Cron 확인:
   - `/api/cron/trends` - 매 2시간
   - `/api/cron/generate-articles` - 매 4시간
   - `/api/cron/publish-articles` - 매 1시간

### 5.3 로그 확인

Vercel Functions → Logs에서 실행 로그 확인

---

## 6. 첫 번째 콘텐츠 생성 (수동)

배포 직후 콘텐츠가 없으므로 수동으로 첫 실행:

```bash
# 1단계: 트렌드 수집
curl -X POST "https://web-toolkit.app/api/cron/trends" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# 5분 대기 후

# 2단계: 기사 생성 (최대 5개)
curl -X POST "https://web-toolkit.app/api/cron/generate-articles" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# 1분 대기 후

# 3단계: 기사 발행
curl -X POST "https://web-toolkit.app/api/cron/publish-articles" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 7. 모니터링

### 7.1 일일 확인사항

- [ ] Vercel Functions 로그에 에러 없음
- [ ] 새 기사가 정상 생성됨 (Supabase → articles 테이블)
- [ ] API 비용 정상 범위 (Anthropic 콘솔)

### 7.2 Supabase 쿼리 (기사 수 확인)

```sql
-- 오늘 생성된 기사 수
SELECT COUNT(*) FROM articles
WHERE created_at >= CURRENT_DATE;

-- 발행된 기사 수
SELECT COUNT(*) FROM articles
WHERE status = 'published';

-- 오늘 API 비용
SELECT SUM(generation_cost_usd) FROM articles
WHERE created_at >= CURRENT_DATE;
```

### 7.3 알림 설정 (선택)

Vercel 또는 Supabase에서 에러 발생 시 알림 설정 권장

---

## 8. 문제 해결

### 8.1 Cron이 실행되지 않음

- Vercel Pro 플랜 필요 (Hobby는 Cron 미지원)
- 환경 변수 `CRON_SECRET` 확인

### 8.2 기사 생성 실패

- `ANTHROPIC_API_KEY` 유효성 확인
- Anthropic 계정 크레딧 확인
- Vercel Functions 로그 확인

### 8.3 Supabase 연결 실패

- `SUPABASE_SERVICE_ROLE_KEY` 확인 (anon key 아님!)
- Supabase 프로젝트 활성 상태 확인

### 8.4 빈 홈페이지

- 첫 번째 콘텐츠 수동 생성 필요 (섹션 6 참고)
- articles 테이블에 `status = 'published'` 기사 존재 확인

---

## 9. 운영 일정 요약

| 시간 | 작업 | 설명 |
|------|------|------|
| 매 2시간 | 트렌드 수집 | Google Trends, Reddit, News RSS |
| 매 4시간 | 기사 생성 | 최대 5개, 일일 예산 $2 |
| 매 1시간 | 기사 발행 | 대기열에서 발행 처리 |

### 예상 결과

| 기간 | 예상 기사 수 | 예상 비용 |
|------|-------------|----------|
| 1일 | 10-20개 | ~$0.08 |
| 1주 | 70-140개 | ~$0.56 |
| 1개월 | 300-600개 | ~$2.40 |

---

## 10. 완료 체크리스트

- [ ] Supabase 마이그레이션 실행
- [ ] Vercel 환경 변수 설정 (ANTHROPIC_API_KEY, CRON_SECRET)
- [ ] 프로덕션 배포
- [ ] Cron 작업 등록 확인
- [ ] 첫 번째 콘텐츠 수동 생성
- [ ] 홈페이지에 기사 표시 확인
- [ ] 24시간 후 자동 생성 확인

---

## 관련 파일

| 파일 | 설명 |
|------|------|
| `supabase/migrations/20260110_create_trend_blog_tables.sql` | DB 스키마 |
| `vercel.json` | Cron 스케줄 설정 |
| `src/app/api/cron/trends/route.ts` | 트렌드 수집 API |
| `src/app/api/cron/generate-articles/route.ts` | 기사 생성 API |
| `src/app/api/cron/publish-articles/route.ts` | 기사 발행 API |
| `src/lib/trend-detector/` | 트렌드 감지 로직 |
| `src/lib/content-generator/` | AI 콘텐츠 생성 로직 |
