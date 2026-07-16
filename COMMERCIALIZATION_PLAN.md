# RUNWAY 10 상업화 실행 계획

> 상태: Phase A~C 배포 완료, 14일 수집 중
>
> 작성일: 2026-07-16
>
> 책임 범위: 제품, 측정, 성장, 광고, 스폰서십, 검증, 배포
>
> 권위: 이 파일이 RUNWAY 10 상업화 작업의 단일 계획 원본이다. 이슈·PR·대시보드는 이 파일에서 파생하며 별도 제품 규칙을 만들지 않는다.

## 1. 목표

RUNWAY 10을 단순 AdSense 페이지가 아니라, 직장인·창업자가 반복 방문하고 결과를 공유하는 일일 경영 게임으로 만든다.

사업 모델 우선순위:

1. 무료 일일 게임으로 반복 사용 확보
2. 결과 공유를 통한 신규 유입 확보
3. 게임 종료 지점 광고로 기본 수익 확보
4. 검증된 직장인 이용자 기반으로 B2B 직접 스폰서십 판매

구독, 게임 재화, 보상형 광고, 다중 게임 포트폴리오는 현재 범위가 아니다. 유지율과 수요가 확인되기 전에는 만들지 않는다.

## 2. 성공 정의

### 2.1 북극성 지표

`주간 반복 완료 사용자` = 최근 7개 UTC 날짜 중 서로 다른 3일 이상 게임을 완료한 익명 사용자 수.

페이지뷰 대신 이 지표를 사용한다. 반복 완료 사용자가 실제 광고 재고, 콘텐츠 수요, 스폰서 가치를 동시에 나타내기 때문이다.

### 2.2 제품 합격 기준

아래 기준을 신규 사용자 코호트 500명 이상에서 평가한다. 프로젝트용 판단 기준이며 업계 보장값이 아니다.

| 지표                      |     실패 |    관찰 |     합격 |
| ------------------------- | -------: | ------: | -------: |
| 게임 시작률               | 30% 미만 |  30~50% | 50% 이상 |
| 게임 완료율               | 40% 미만 |  40~60% | 60% 이상 |
| 정확한 D1 유지율          | 15% 미만 |  15~25% | 25% 이상 |
| 정확한 D7 유지율          |  4% 미만 |    4~8% |  8% 이상 |
| 공유 시트 완료율          |  2% 미만 |    2~5% |  5% 이상 |
| 공유 1건당 신규 게임 시작 | 0.1 미만 | 0.1~0.3 | 0.3 이상 |

### 2.3 수익화 진입 기준

다음 조건을 2주 연속 충족해야 직접 스폰서 파일럿과 추가 광고 실험을 시작한다.

- 주간 검증 완료 사용자 5,000명 이상
- 게임 완료율 60% 이상
- D1 25% 이상
- D7 8% 이상
- 공유 시트 완료율 5% 이상
- 무효 트래픽 또는 광고 정책 경고 없음

하나라도 미달하면 수익 기능을 추가하지 않는다. 게임 길이, 반복성, 공유 가치부터 수정한다.

## 3. 현재 기준선

현재 제품:

- 6개 회사 프로필
- 84개 다국어 시나리오
- UTC 날짜·업종 기준 결정론적 일일 순서
- 한 판 10개 결정
- 브라우저 로컬 진행 기록과 커리어 통계
- 서버 재검증 글로벌 업종 순위
- 결과 카드 PNG 저장
- 결과 화면 AdSense 1개
- Microsoft Clarity 이벤트

현재 문제:

1. `game_d1_return`은 로컬 저장소 날짜 비교다. 최초 사용자 코호트 분모와 기기 간 식별이 없어 정확한 D1이 아니다.
2. `result_shared`는 공유가 아니라 PNG 저장 성공을 뜻한다. 이벤트명이 행동과 다르다.
3. 광고 요청·로드·노출을 구분하지 않는다.
4. 공유 링크와 추천 유입이 없다.
5. 회사별 사용 가능 덱이 작아 10턴 플레이 시 다음 날 시나리오 반복이 빠르다.
6. 현재 광고 기회는 완료 플레이당 최대 1회다. AdSense만으로 큰 매출을 내려면 매우 큰 일일 트래픽이 필요하다.

## 4. 고정 제품 결정

### 4.1 게임 정체성

- 이름: `RUNWAY 10`
- 포지션: `매일 한 번, 회사의 생존을 결정하는 경영 게임`
- 핵심 이용자: 직장인, 창업자, 경영·재무·테크 콘텐츠 소비자
- 핵심 세션: 회사 선택 → 결정 진행 → 최종 보고서 → 공유 또는 다음 날 재방문
- 첫 플레이 전 로그인 금지
- 결과와 광고를 명확히 분리
- 스폰서는 게임 선택 효과와 점수에 관여하지 않음

### 4.2 데이터 원본

| 규칙/데이터                   | 단일 원본                                         |
| ----------------------------- | ------------------------------------------------- |
| 시나리오와 선택 효과          | `src/entities/company-scenario/data/scenarios.ts` |
| 회사 프로필                   | `src/entities/company-scenario/data/profiles.ts`  |
| 게임 길이 정책·일일 순서·점수 | `src/shared/lib/company-survival/game.ts`         |
| 게임 상태 타입                | `src/shared/types/company-survival.ts`            |
| UI 문구                       | `src/features/company-survival/copy.ts`           |
| 익명 코호트·완료·추천 데이터  | Upstash Redis                                     |
| UX 세션 재생·탐색 이벤트      | Microsoft Clarity                                 |
| 광고 수익·RPM                 | Google AdSense 보고서                             |
| 실행 상태와 상업화 결정       | 이 파일                                           |

Clarity 수치를 사업 KPI 원본으로 사용하지 않는다. Redis는 코호트와 검증 완료 수치, Clarity는 UX 원인 조사만 담당한다.

## 5. 전체 실행 순서

작업은 아래 순서를 지킨다. 앞 단계가 실패하면 우회 구현하지 않고 실패 원인을 수정한다.

1. 측정 의미와 게임 길이 정책 확정
2. 서버 측 코호트·활동 저장 구현
3. 실제 공유와 추천 링크 구현
4. 6턴 대 10턴 실험 구현
5. 개인정보·광고 정책 정리
6. 단위·통합·E2E 검증
7. 프로덕션 배포와 계측 확인
8. 2주 데이터 수집
9. 합격 기준에 따라 유지율 개선 또는 수익화 진행

## 6. Phase A — 측정 기반

### A1. 이벤트 의미 교정

권위 있는 이벤트 목록:

| 이벤트                  | 발생 조건                                   | 저장 위치       | 주요 속성                        |
| ----------------------- | ------------------------------------------- | --------------- | -------------------------------- |
| `session_started`       | 해당 UTC 날짜 첫 페이지 진입                | Redis + Clarity | date, locale, ref, utm_source    |
| `profile_selected`      | 회사 프로필 선택                            | Clarity         | industry                         |
| `game_started`          | 시작/이어하기 버튼 클릭                     | Redis + Clarity | date, industry, variant, resumed |
| `choice_made`           | 유효한 선택 적용 완료                       | Clarity         | industry, turn, scenario, choice |
| `game_completed`        | 서버가 전체 기록 재실행 후 완료 판정        | Redis + Clarity | status, score, turns, variant    |
| `card_downloaded`       | PNG 저장 성공                               | Clarity         | industry, score                  |
| `share_opened`          | 추천 소유권 저장 후 Web Share API 호출 직전 | Redis + Clarity | industry, score, referral_id     |
| `share_sheet_completed` | `navigator.share()` Promise 정상 완료       | Redis + Clarity | industry, score, referral_id     |
| `referral_landed`       | 유효한 추천 링크 첫 진입                    | Redis + Clarity | referral_id, locale              |
| `referral_game_started` | 추천 유입 사용자가 게임 시작                | Redis           | referral_id, industry            |
| `ad_requested`          | 광고 컴포넌트가 Google 요청을 시작          | Clarity         | placement                        |
| `ad_loaded`             | 지원되는 광고 콜백에서 로드 확인            | Clarity         | placement                        |

`share_sheet_completed`는 수신자에게 실제 전송됐다는 뜻이 아니다. 운영체제 공유 시트 처리가 정상 완료됐다는 뜻이다. 문서와 리포트에서 이 정의를 유지한다.

기존 `result_shared`와 `game_d1_return`은 삭제한다. 새 이벤트와 병행 기록하지 않는다.

### A2. 익명 식별자

- 기존 `runway-10:player:v1` UUID를 유지한다.
- 로그인이나 이메일과 연결하지 않는다.
- 추천 식별자는 별도 `runway-10:referral:v1` UUID로 1회 생성한다.
- URL에는 플레이어 ID를 넣지 않고 추천 식별자만 넣는다.
- 서버는 UUID 형식, 날짜, enum, 문자열 길이를 모두 검증한다.
- IP 주소를 애플리케이션 데이터로 저장하지 않는다.

### A3. Redis 키

키 규칙:

```text
runway10:user:first-date:v1:{playerId}               -> YYYY-MM-DD
runway10:activity:session:v1:{date}                  -> SET(playerId)
runway10:activity:start:v1:{date}                    -> SET(playerId)
runway10:activity:complete:v1:{date}                 -> SET(playerId)
runway10:activity:repeat-3:v1:{weekEndDate}          -> SET(playerId), 보고서에서 파생
runway10:cohort:first:v1:{date}                      -> SET(playerId)
runway10:cohort:d1:v1:{firstDate}                    -> SET(playerId)
runway10:cohort:d7:v1:{firstDate}                    -> SET(playerId)
runway10:activity:share:v1:{date}                    -> SET(playerId)
runway10:referral:owner:v1:{referralId}              -> playerId
runway10:referral:landed:v1:{date}:{referralId}      -> SET(playerId)
runway10:referral:started:v1:{date}:{referralId}     -> SET(playerId)
runway10:experiment:run-length:v1:start:{variant}:{date}    -> SET(playerId)
runway10:experiment:run-length:v1:complete:{variant}:{date} -> SET(playerId)
```

보존 기간:

- 일별 활동·코호트·추천 SET: 120일
- 사용자 최초 방문 날짜: 400일
- 추천 소유자 매핑: 400일
- 기존 리더보드: 현행 유지

동일 플레이어의 동일 날짜 이벤트는 Redis SET으로 중복 제거한다. 이벤트 재시도용 별도 큐나 데이터베이스는 만들지 않는다.

### A4. 서버 구조

신규/변경 파일:

```text
src/shared/lib/redis.ts
  - 기존 leaderboard.ts의 Redis 설정과 pipeline 호출 이동
  - 모든 Redis 기능이 같은 구현 사용

src/features/company-survival/engagement.ts
  - server-only
  - 세션, 시작, 공유, 추천 저장
  - 최초 방문 날짜에서 D1/D7 계산
  - TTL 적용

src/app/api/company-survival/activity/route.ts
  - session_started, game_started, share_sheet_completed,
    referral_landed, referral_game_started만 허용
  - discriminated union 검증
  - 잘못된 입력 400, Redis 실패 503

src/features/company-survival/leaderboard.ts
  - 공용 Redis helper 사용
  - 서버 검증 성공 후 complete SET과 실험 variant SET 기록

scripts/growth-report.mjs
  - Redis 원본에서 최근 코호트·완료·공유·추천 지표 계산
  - 데이터 변경 없는 읽기 전용 CLI
```

`package.json`에 `npm run report:growth`만 추가한다. 대시보드, 관리자 로그인, 새 분석 SaaS는 만들지 않는다.

### A5. 유지율 정의

- 신규 사용자: `first-date`가 해당 날짜로 처음 기록된 플레이어
- D1: 신규 사용자 중 정확히 다음 UTC 날짜에 `session_started`가 기록된 플레이어
- D7: 신규 사용자 중 정확히 7번째 UTC 날짜에 `session_started`가 기록된 플레이어
- 완료율: 해당 날짜 고유 완료 사용자 / 해당 날짜 고유 시작 사용자
- 공유율: 해당 날짜 고유 공유 시트 완료 사용자 / 해당 날짜 고유 완료 사용자
- 추천 전환율: 추천 링크로 진입한 고유 사용자 중 게임을 시작한 사용자 비율
- 공유당 신규 시작: 추천 게임 시작 고유 사용자 / 공유 시트 완료 고유 사용자

날짜 계산은 기존 UTC 날짜 helper를 사용한다. 로컬 시간 기준 코호트를 별도로 만들지 않는다.

## 7. Phase B — 실제 공유와 추천 루프

### B1. 결과 화면 행동

결과 화면 버튼 순서:

1. `결과 공유` — Web Share API 지원 환경에서만 표시
2. `결과 이미지 저장` — 기존 PNG 저장 기능
3. `오늘 다시 하기`
4. `다른 회사 선택`

공유 API 미지원 브라우저에 복사 버튼이나 별도 모달을 자동 제공하지 않는다. 이미지 저장은 독립 기능이며 공유 실패 fallback으로 취급하지 않는다.

### B2. 공유 내용

언어별 공유 텍스트 구성:

```text
RUNWAY 10 #{challengeNumber}
{companyCode} · {status}
Score {score} · {turns}/{targetTurns}
Can your company survive today?
{localized URL}?ref={referralId}&utm_source=share&utm_medium=web_share
```

원칙:

- 정답이나 선택 효과를 노출하지 않는다.
- 점수, 생존 상태, 회사 코드, 도전 번호만 포함한다.
- 추천 URL은 현재 locale을 유지한다.
- `ref`, `utm_source`, `utm_medium`만 허용하고 나머지 쿼리는 분석에서 무시한다.
- 추천 ID는 UUID 검증 후 기록한다.

### B3. 구현 위치

- `src/features/company-survival/company-survival-game.tsx`: 결과 액션, API 호출 연결
- `src/features/company-survival/copy.ts`: 3개 언어 공유 문구와 상태 메시지
- `src/shared/lib/company-survival/storage.ts`: 추천 UUID 읽기/생성
- `src/shared/lib/analytics.ts`: 이벤트 타입과 의미 교정
- `src/features/company-survival/share-card.ts`: 기존 이미지 기능 유지, 이벤트만 `card_downloaded`로 변경
- `src/features/company-survival/company-survival-game.tsx`: 브라우저 URL의 추천·UTM 쿼리 검증

공유 문자열 조립은 하나의 helper에서 처리한다. 컴포넌트와 카드 생성기에 같은 문구 규칙을 복제하지 않는다.

### B4. 완료 조건

- 지원 브라우저에서 공유 버튼 노출
- 공유 취소 시 `share_sheet_completed` 미기록
- 공유 성공 시 한 번만 기록
- 추천 링크 locale 유지
- 추천 링크 진입과 게임 시작 분리 기록
- PNG 저장은 `card_downloaded`만 기록
- 키보드와 스크린리더에서 모든 결과 버튼 구분 가능

## 8. Phase C — 6턴 대 10턴 실험

### C1. 목적

현재 10턴이 완료율을 낮추고 콘텐츠 반복을 가속하는지 확인한다. 새 시나리오 대량 제작 전에 게임 길이를 검증한다.

### C2. 단일 정책 원본

`src/shared/lib/company-survival/game.ts`에 다음 의미의 정책 객체 하나만 둔다.

```ts
RUN_LENGTH_POLICY = {
  id: "run-length-v1",
  mode: "experiment",
  variants: [6, 10],
};
```

실험 종료 후 같은 객체를 `mode: "fixed"`와 승리 길이로 변경한다. 별도 환경 변수, UI 상수, 서버 상수를 만들지 않는다.

### C3. 배정

- 기존 익명 `playerId`와 정책 ID를 공용 hash helper에 넣는다.
- 50:50으로 6턴 또는 10턴에 고정 배정한다.
- 날짜와 회사가 바뀌어도 같은 사용자는 같은 variant를 유지한다.
- 클라이언트와 서버가 같은 helper를 사용한다.
- 요청 payload의 variant를 신뢰하지 않는다. 서버가 playerId로 다시 계산한다.

### C4. 상태 변경

`CompanyGameState`를 version 3으로 올린다.

추가 필드:

```ts
rulesetId: "run-length-v1";
targetTurns: 6 | 10;
```

기존 version 2 실행 기록은 읽지 않는다. 잘못된 상태로 간주하고 기존 오류 복구 UI를 통해 제거한다. 호환 fallback을 만들지 않는다.

다음 함수가 모두 `targetTurns`를 사용해야 한다.

- `createDailyScenarioOrder`
- `createInitialGameState`
- `replayCompanyRun`
- `applyDecision`
- `isCompanyGameState`
- 진행률 UI
- 최종 점수 계산
- 결과 카드
- 결과 API 검증

점수 비교의 공정성을 위해 턴 보너스를 길이로 정규화한다.

```text
normalizedTurnScore = completedTurns / targetTurns * 250
score = metric total + normalizedTurnScore
```

점수 공식은 `calculateCompanyScore` 한 곳에만 둔다.

### C5. 실험 판정

최소 조건:

- variant별 신규 사용자 500명 이상
- 최소 14일 운영
- 같은 유입원 비중 확인

우선순위:

1. D1
2. 완료율
3. 공유율
4. 평균 완료 시간
5. D7

6턴이 D1 또는 완료율을 10% 이상 상대 개선하고 D7이 악화되지 않으면 6턴 채택. 차이가 작으면 10턴 유지. 어느 쪽도 합격 기준에 못 미치면 길이가 아닌 핵심 재미 문제로 판정한다.

## 9. Phase D — 광고 정책과 기본 수익

### D1. 현재 광고

- 결과 화면 반응형 AdSense 1개 유지
- 선택지, 진행 버튼, 재시작 버튼 주변에 신규 배너 금지
- 실제 화면에서 게임·행동 버튼과 광고 간격 확인
- 자동 새로고침 금지
- 광고 클릭 보상 금지

Google은 게임과 콘텐츠 광고 사이에 최소 150px 거리를 권장한다. 데스크톱·모바일 결과 화면에서 이를 수동 측정한다.

### D2. 동의 관리

EEA, 영국, 스위스에 개인 맞춤 광고를 제공할 경우 Google 인증 CMP와 IAB TCF 연동을 배포 전 완료한다.

작업:

- AdSense `Privacy & messaging`에서 Google 인증 CMP 설정
- en/ko/ja 동의 문구 확인
- 동의 전 광고 요청 동작 확인
- 비동의 시 제한 광고 동작 확인
- 개인정보처리방침에 광고·동의·익명 분석 설명 반영

CMP 실패 시 임의 쿠키 배너를 자체 제작하지 않는다. 인증된 경로를 수정한다.

### D3. 추가 광고 게이트

수익화 진입 기준 통과 후에만 Google Ad Placement API를 검토한다.

첫 실험 위치는 `오늘 다시 하기` 버튼 이후 자연스러운 재시작 시점 하나다. 선택 진행 중 전면 광고, 게임 시작 전 광고, 보상형 광고는 제외한다.

추가 광고 판단 지표:

- 완료 플레이당 광고 노출
- 실제 page/ad RPM
- 재시작률 변화
- D1/D7 변화
- 광고 정책 경고

추가 광고가 재시작률 또는 D1을 10% 이상 상대 악화시키면 제거한다.

## 10. Phase E — 직접 스폰서십

수익화 진입 기준 통과 전에는 UI나 스폰서 관리 시스템을 만들지 않는다.

### E1. 첫 상품

상품명: `RUNWAY 10 Weekly Report Sponsor`

포함 항목:

- 결과 화면 하단 단독 스폰서 로고·한 줄 설명·링크
- 주간 결과 리포트 `presented by` 표기
- 노출, 고유 완료 사용자, 클릭 수 주간 보고
- 선택지·점수·순위에는 영향 없음

### E2. 대상 광고주

- 회계·세무 SaaS
- 채용·HR SaaS
- 기업 카드·핀테크
- 협업·생산성 도구
- 클라우드·개발 인프라
- 창업 교육·비즈니스 뉴스레터

### E3. 가격 원칙

가격은 페이지뷰가 아니라 검증된 주간 완료 사용자로 계산한다.

```text
스폰서 기준가 = 주간 스폰서 노출 완료 사용자 / 1,000 × 목표 유효 CPM
```

첫 2주는 한 광고주만 운영한다. 파일럿 종료 후 고유 노출, 클릭률, 반복 완료 사용자 비중으로 갱신 여부를 결정한다. 셀프서비스 광고 시스템은 만들지 않는다.

### E4. 구현 게이트 통과 후 파일

```text
src/shared/config/sponsor.ts
  - 활성 스폰서 하나의 이름, 기간, locale별 문구, URL

src/features/company-survival/game-over-sponsor.tsx
  - 결과 화면 단일 스폰서 표시

src/app/api/company-survival/sponsor-click/route.ts
  - 캠페인 ID와 익명 playerId 중복 제거 클릭 기록
```

스폰서가 없으면 컴포넌트를 렌더링하지 않는다. 임시 광고나 placeholder를 표시하지 않는다.

## 11. Phase F — 선택형 재방문 채널

이 단계는 제품 합격 기준 통과 후 별도 승인한다.

후보:

- 결과 화면의 `내일 위기 알림 받기`
- 주간 업종 결과 이메일

구현 전 결정할 항목:

- 이메일 제공자
- 명시적 opt-in 문구
- locale별 발송 시간
- 수신 해지와 삭제
- 개인정보처리방침
- 비용 한도

제공자와 정책이 정해지기 전 이메일 입력 UI를 만들지 않는다.

## 12. 테스트 계획

### 12.1 단위 테스트

`src/features/company-survival/game.test.ts`

- 같은 playerId는 항상 같은 variant
- variant 분포가 결정론적
- 6턴/10턴 주문 길이 정확
- 상태가 targetTurns에서 완료
- 정규화 점수 계산 정확
- 서버 replay가 잘못된 variant와 순서를 거부
- v2 상태 거부, v3 유효 상태 허용

`src/shared/lib/company-survival/storage.test.ts`

- referralId 1회 생성·재사용
- 잘못된 UUID 교체
- v3 실행 저장·복구

`src/features/company-survival/share-card.test.ts`

- targetTurns 표시
- locale별 카드 핵심 데이터 유지

`src/features/company-survival/engagement.test.ts`

- 최초 방문 코호트 기록
- 동일 날짜 중복 제거
- D1/D7 정확한 날짜에만 기록
- TTL 명령 포함
- 허용되지 않은 이벤트 거부

### 12.2 API 테스트

- 잘못된 JSON → 400
- 잘못된 날짜/UUID/industry/event → 400
- 미완료 결과 → 503이 아니라 명시적 검증 오류로 처리
- Redis 미설정 → 503, 성공으로 위장하지 않음
- 조작한 게임 순서/길이 → 거부
- 정상 완료 → 리더보드와 완료 SET 모두 기록

### 12.3 E2E

데스크톱 Chromium:

1. 회사 선택
2. 게임 시작
3. 배정 variant만큼 결정
4. 최종 결과·순위·광고 영역 표시
5. PNG 저장 함수 호출
6. `navigator.share` 성공 stub에서 공유 완료 기록
7. 공유 취소 stub에서 완료 미기록
8. 추천 URL 진입 후 게임 시작 기록
9. 재시작
10. 다른 회사 선택

추가 수동 검증:

- iOS Safari Web Share
- Android Chrome Web Share
- 360px 모바일 레이아웃
- 키보드 전용 탐색
- 스크린리더 버튼명
- 광고와 행동 버튼 간격
- CMP 동의/거부

### 12.4 필수 명령

```bash
npm test -- --run
npm run lint
npm run build
npm run test:e2e
```

네 명령 중 하나라도 실패하면 배포하지 않는다. 테스트를 건너뛰는 배포 경로를 만들지 않는다.

## 13. 배포 계획

### 13.1 배포 전

- 현재 사용자 변경 `.serena/project.yml` 유지
- 변경 파일 diff 검토
- Redis production 환경 변수 존재 확인
- AdSense CMP 설정 확인
- 모든 자동 테스트 통과
- 프로덕션 데이터 키 prefix 확인
- 개인정보·이용약관 문구 확인

### 13.2 배포

1. 단일 커밋으로 코드와 이 계획 상태 갱신
2. `main` push
3. Vercel production 배포 완료 대기
4. 배포 URL HTTP 200 확인
5. 세 언어 랜딩·게임 완료 smoke test
6. Redis에 session/start/complete 키 생성 확인
7. Clarity 이벤트명 확인
8. AdSense 요청과 CMP 확인

### 13.3 실패 처리

- 빌드 실패: 해당 커밋 수정 후 재배포
- Redis 실패: 503과 구조화 로그 확인, 환경 변수 또는 primary Redis 경로 수정
- 공유 실패: Web Share 호출 원인 수정, 다른 공유 구현으로 자동 우회하지 않음
- 광고 정책 문제: 광고 배치 제거 또는 수정 후 재검토
- 데이터 정의 오류: 이 파일의 정의를 먼저 수정하고 코드·리포트를 같은 변경에서 맞춤

## 14. 운영 리듬

### 매일

- Vercel 오류 로그
- Redis activity 기록 여부
- 광고 정책 경고
- 치명적 게임 완료 오류

### 매주

`npm run report:growth -- --end YYYY-MM-DD` 실행:

- 신규 사용자
- 시작 사용자
- 완료 사용자
- 완료율
- D1/D7
- 주간 반복 완료 사용자
- 공유 완료 사용자
- 추천 진입·시작
- variant별 지표
- AdSense 실제 수익과 RPM은 Google 보고서에서 별도 확인

리포트는 원본 데이터를 복사해 별도 수동 숫자를 만들지 않는다. 실행 결과를 의사결정 기록으로 이 파일 하단에 추가한다.

## 15. 의사결정 규칙

### 14일 후

- 6턴 승리 → 정책을 fixed 6으로 변경
- 10턴 승리 → 정책을 fixed 10으로 변경
- 둘 다 실패 → 추가 광고·스폰서 중단, 핵심 재미 재설계
- 표본 부족 → 기능 추가 없이 동일 실험 연장

### 제품 합격 후

- 주간 완료 5,000 미만 → 유통·공유 개선
- 주간 완료 5,000 이상 + 유지율 합격 → 스폰서 1개 영업
- 광고 수익만 낮음 → 트래픽보다 광고 위치를 무작정 늘리지 않음
- 스폰서 수요 있음 → 단일 파일럿, 관리 시스템 없음

### 중단 기준

신규 사용자 1,000명 이상 확보 후에도 아래가 2회 연속 발생하면 현재 형태의 게임 확장을 중단한다.

- D1 15% 미만
- 완료율 40% 미만
- 공유율 2% 미만

중단은 프로젝트 폐기를 뜻하지 않는다. 광고·콘텐츠 추가를 멈추고 핵심 루프를 다시 정의한다.

## 16. 명시적 비범위

- 유료 구독
- 게임 내 화폐와 상점
- 보상형 광고
- 멀티플레이
- 계정·소셜 로그인
- 친구 리그·회사 리그
- 모바일 앱
- CrazyGames/Poki 별도 빌드
- 관리자 대시보드
- 셀프서비스 광고주 시스템
- AI 시나리오 자동 생성
- 84개 시나리오별 SEO 페이지
- 유지율 검증 전 시나리오 대량 추가

비범위 기능은 합격 데이터와 별도 제품 결정 없이는 추가하지 않는다.

## 17. 실행 체크리스트

### 계획·정의

- [x] 이벤트 사전 확정
- [x] RUN_LENGTH_POLICY 확정
- [x] 개인정보 문구 확정
- [x] Google CMP 강제 표시 검증 (`fc=alwaysshow&fctype=gdpr`)

### 코드

- [x] Redis helper 공용화
- [x] engagement 서버 모듈 구현
- [x] activity API 구현
- [x] 서버 완료 기록 연결
- [x] 잘못된 기존 분석 이벤트 제거
- [x] 실제 Web Share 구현
- [x] 추천 ID·URL 구현
- [x] 추천 진입·시작 추적
- [x] 게임 상태 v3 전환
- [x] 6턴/10턴 결정론적 배정
- [x] 점수 정규화
- [x] 결과 UI·카드·copy 갱신
- [x] 성장 리포트 CLI 구현
- [x] README와 법적 문서 갱신

### 검증

- [x] 단위 테스트 통과
- [x] API 검증 통과
- [x] E2E 통과
- [x] lint 통과
- [x] production build 통과
- [ ] 모바일 실제 공유 검증
- [x] CMP 운영 설정 검증
- [x] 결과 행동 버튼과 광고 150px 분리

### 배포·운영

- [x] 커밋
- [x] 작업 브랜치 push
- [x] Vercel production Ready
- [x] production smoke test
- [x] Redis 이벤트 확인 후 probe 제거
- [x] Clarity 이벤트 요청 확인
- [x] 14일 수집 시작일 기록: 2026-07-16
- [ ] 14일 판정 기록

## 18. 의사결정 기록

모든 상업화 변경은 아래 형식으로 이 섹션에만 기록한다.

```text
YYYY-MM-DD
- 표본: 신규 N / 시작 N / 완료 N
- 지표: 완료율 X%, D1 X%, D7 X%, 공유율 X%, 추천 시작/공유 X
- variant: 6턴 {...}, 10턴 {...}
- 결정: 유지 / 변경 / 중단
- 근거: 한 문장
- 다음 작업: 한 문장
```

현재 기록:

```text
2026-07-16
- 표본: 신뢰 가능한 서버 코호트 없음
- 결정: 수익화 확대 보류
- 근거: 현행 D1과 공유 이벤트 의미가 실제 행동을 측정하지 못함
- 다음 작업: Phase A부터 순서대로 구현
```

## 19. 근거 자료

- Google AdSense RPM 계산: <https://support.google.com/adsense/answer/190515/revenue-per-thousand-impressions-rpm>
- Google Ad Placement API: <https://developers.google.com/ad-placement/apis>
- Google 게임 종료 광고 예시: <https://developers.google.com/ad-placement/docs/example>
- Google 게임 페이지 광고 정책: <https://support.google.com/adsense/answer/2768340>
- Google 광고 배치 정책: <https://support.google.com/adsense/answer/1346295>
- Google CMP 요구사항: <https://support.google.com/adsense/answer/13554116?hl=en>
- LinkedIn 일일 게임 재방문 사례: <https://www.linkedin.com/pulse/hello-tango-introducing-our-newest-daily-logic-game-somasundaram-6zszf>
- NYT Games 사업 참고: <https://apnews.com/article/4ab76097d6155a022f089d03e94807c3>
- GameAnalytics 리포트: <https://www.gameanalytics.com/reports>
- Morning Brew 게임: <https://www.morningbrew.com/games>
- Morning Brew 광고 상품: <https://morningbrewinc.com/advertise-with-us>
- CrazyGames 광고 요구사항: <https://docs.crazygames.com/requirements/ads/>
- Poki SDK: <https://sdk.poki.com/sdk-documentation>
