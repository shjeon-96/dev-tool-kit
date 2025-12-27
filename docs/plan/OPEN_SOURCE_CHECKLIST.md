# Open Source Release Checklist

> Web Toolkit 오픈 소스화 준비 체크리스트

**Target Repository**: https://github.com/shjeon-96/web-toolkit
**License**: MIT

---

## 📊 현재 상태 Summary

| 항목             | 상태    | 비고                        |
| ---------------- | ------- | --------------------------- |
| LICENSE          | ✅ 완료 | MIT                         |
| README.md        | ✅ 완료 | 상세함                      |
| CONTRIBUTING.md  | ✅ 완료 | 도구 추가 가이드 포함       |
| CLAUDE.md        | ✅ 완료 | AI 협업 가이드              |
| .gitignore       | ✅ 완료 | 적절히 설정됨               |
| Issue 템플릿     | ✅ 완료 | bug_report, feature_request |
| .env.example     | ✅ 완료 | 전체 환경변수 문서화        |
| PR 템플릿        | ✅ 완료 | pull_request_template.md    |
| CI/CD 워크플로우 | ✅ 완료 | lint, test, build, validate |
| 민감정보 체크    | ✅ 완료 | 하드코딩 없음 확인          |

---

## Phase 1: 필수 항목 (Must Have)

### 1.1 환경변수 템플릿 완성

- [x] `.env.example` 모든 환경변수 추가

```bash
# App
NEXT_PUBLIC_APP_URL=https://web-toolkit.app

# Analytics (Optional)
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
NEXT_PUBLIC_GA_ID=your_ga_id

# Supabase (Optional - for auth features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# LemonSqueezy (Optional - for billing features)
LEMONSQUEEZY_API_KEY=your_api_key
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret
LEMONSQUEEZY_STORE_ID=your_store_id

# Vercel KV (Optional - for Magic Share)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token

# Google Search Console (Optional - for GSC reports)
GOOGLE_SERVICE_ACCOUNT=your_service_account_json
```

### 1.2 민감정보 스캔

- [x] API 키 하드코딩 확인 (없음)
- [x] 개인정보 포함 여부 확인 (없음)
- [x] `.env` 파일 커밋 이력 확인 (없음)

```bash
# 민감정보 검색 명령어
git log --all --full-history -p -- "*.env*"
grep -r "sk-\|sk_live\|api_key.*=" --include="*.ts" --include="*.tsx" src/
```

### 1.3 문서 일관성

- [x] PROJECT_STATUS.md: "Private" → "MIT" 수정
- [x] 버전 정보 일관성 확인 (현재 45개 도구)

---

## Phase 2: GitHub 설정 (Should Have)

### 2.1 PR 템플릿 추가

- [x] `.github/pull_request_template.md` 생성

### 2.2 CI/CD 워크플로우

- [x] `.github/workflows/ci.yml` - lint, test, build, validate-tools
- [ ] `.github/workflows/e2e.yml` - E2E 테스트 (optional)

### 2.3 Branch Protection (GitHub 설정)

- [ ] `main` 브랜치 보호 규칙
  - Require PR before merging
  - Require status checks
  - Require linear history (optional)

### 2.4 Repository 설정

- [ ] Description 추가
- [ ] Topics 추가: `developer-tools`, `nextjs`, `react`, `typescript`, `pwa`
- [ ] Website URL 추가
- [ ] Discussions 활성화 (optional)

---

## Phase 3: 선택 항목 (Nice to Have)

### 3.1 추가 문서

- [ ] SECURITY.md - 보안 취약점 리포트 가이드
- [ ] CODE_OF_CONDUCT.md - 행동 강령
- [ ] CHANGELOG.md - 변경 이력 (자동 생성 도구 사용 가능)

### 3.2 Badge 추가 (README.md)

```markdown
![GitHub stars](https://img.shields.io/github/stars/shjeon-96/web-toolkit)
![GitHub issues](https://img.shields.io/github/issues/shjeon-96/web-toolkit)
![GitHub license](https://img.shields.io/github/license/shjeon-96/web-toolkit)
![Build Status](https://github.com/shjeon-96/web-toolkit/actions/workflows/ci.yml/badge.svg)
```

### 3.3 Sponsorship

- [ ] GitHub Sponsors 설정
- [ ] FUNDING.yml 추가

---

## 실행 계획

### Day 1: 필수 항목

1. `.env.example` 완성
2. 민감정보 스캔 및 정리
3. PROJECT_STATUS.md 수정

### Day 2: GitHub 설정

4. PR 템플릿 추가
5. CI 워크플로우 추가
6. Repository 설정

### Day 3: 최종 점검

7. 로컬 빌드/테스트 확인
8. README 최종 검토
9. Public 전환

---

## 관련 파일

| 파일                      | 설명           |
| ------------------------- | -------------- |
| `LICENSE`                 | MIT 라이선스   |
| `README.md`               | 프로젝트 소개  |
| `CONTRIBUTING.md`         | 기여 가이드    |
| `CLAUDE.md`               | AI 협업 가이드 |
| `.github/ISSUE_TEMPLATE/` | 이슈 템플릿    |
| `.github/workflows/`      | GitHub Actions |

---

_Last Updated: 2025-12-27_
