# PixelLogic Website

픽셀로직이 직접 만들고 운영하는 모바일 제품과 데이터 처리 원칙을 소개하는 공식 홈페이지입니다.

## 공개 화면

- `/ko`, `/en` — 픽셀로직 홈페이지
- `/ko/privacy`, `/en/privacy` — 개인정보처리방침
- `/ko/terms`, `/en/terms` — 서비스 이용약관
- `/ko/account-deletion`, `/en/account-deletion` — 계정 및 데이터 삭제 안내

## 제품

- 헤아림 사주 — 근거를 펼쳐 보여주는 사주 앱
- TalkTalk — AI와 이어가는 안전한 영어 대화
- Orbit — 관계를 발견하는 소셜 퀴즈
- SideQuest — 평범한 하루를 작은 모험으로

## 개발

```bash
npm install
npm run dev
npm run lint
npm run build
npm run test:e2e
```

## 단일 원본

- 브랜드·토큰·컴포넌트·모션: `docs/design/DESIGN_SET.md`
- 홈페이지 콘텐츠와 제품 매핑: `src/shared/content/site-content.ts`
- 정책·약관·삭제 안내: `src/shared/i18n/legal.ts`
- 사이트 식별자와 로케일: `src/shared/config/site.ts`

Google OAuth 브랜딩 심사에 입력하는 홈페이지·개인정보처리방침·서비스 이용약관 URL은 이 사이트의 공개 정적 URL과 정확히 일치해야 합니다.
