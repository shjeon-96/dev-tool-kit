# 홈페이지 디자인 규칙

PixelLogic 홈페이지의 화면을 고칠 때 지키는 규칙이다. 규칙마다 이유를 같이 적었다. 이유가 더 이상 맞지 않으면 규칙을 고친다.

## 1. 시각 언어는 하나다: `@pixellogic/ui` 토큰

- 색, 간격, 라운드, 폰트는 전부 `--pl-*` 토큰에서 가져온다. `globals.css`에 hex 색이나 별도 색 변수를 새로 만들지 않는다.
- 예외는 두 가지뿐이다.
  - 키트에 없는 마케팅용 글자 크기: `--home-display`, `--home-heading`, `--home-shell` (`.pixellogic-theme`에 정의).
  - `html` 배경색: 키트 토큰이 `.pl-theme` 안에서만 정의되기 때문에 그 바깥의 캔버스만 `--pl-background` 값을 hex로 반복한다. 키트 색이 바뀌면 같이 바꾼다.
- 헤더, 푸터, 약관 페이지도 같은 토큰을 쓴다.

**이유.** 예전에는 `--paper/--ink` 계열의 에디토리얼 CSS와 키트 토큰이 섞여 있었다. 테마 토글은 키트 쪽만 바꿨기 때문에, 시스템이 다크일 때 라이트로 전환하면 헤더·푸터만 다크로 남았다.

## 2. 키트는 앱 UI용이다. 홈페이지에 맞지 않는 컴포넌트를 억지로 쓰지 않는다

`@pixellogic/ui`는 앱 화면용 primitive 모음이다. 홈페이지에서의 용도는 아래로 제한한다.

| 컴포넌트                                 | 써도 되는 곳                | 쓰지 않는 곳         |
| ---------------------------------------- | --------------------------- | -------------------- |
| `Card`, `Section`, `PageHeader`, `Stack` | 레이아웃 골격               | -                    |
| `buttonVariants`                         | 모든 버튼 모양              | -                    |
| `StatusBadge`                            | 제품 카드당 1개 (배포 상태) | 그 외 전부           |
| `Badge`                                  | 쓰지 않는다                 | 번호, 라벨, 카테고리 |
| `ListRow`                                | 쓰지 않는다                 | 제품 목록, 원칙 목록 |

- 라벨과 카테고리는 `.bori-meta` 텍스트로 쓴다. 번호는 `.bori-principle-number`처럼 일반 텍스트로 쓴다.
- 같은 정보를 한 화면에 두 번 보여주지 않는다. 제품 목록은 제품 선반 한 곳에만 있다.

**이유.** 키트에서 강조 수단이 `Badge`뿐이라 번호, 메타, 상태, 라벨이 전부 pill이 됐고, `ListRow`로 만든 히어로는 설정 화면처럼 보였다.

## 3. 이동은 항상 진짜 링크다

- 스토어, 웹앱, 메일 등 어디로 가는 요소는 `<a href>`로 만든다. `onClick`에서 `window.open`이나 `location.href`를 쓰지 않는다.
- 모든 버튼은 `UI.Button`으로 만든다. 이동하는 버튼은 `bori-components.tsx`의 `LinkButton`을 쓴다. `UI.Button asChild`로 자식 `<a href>`를 감싼 얇은 래퍼이고, 외부 링크에는 `target`과 `rel`을 붙인다.
- `UI.buttonVariants`를 직접 쓰지 않는다. `asChild`가 같은 일을 하면서 `data-*` 속성까지 맞춰 준다.

**이유.** `onClick` 이동은 새 탭 열기, 링크 복사, 검색 크롤링이 모두 안 된다.

## 4. 제품 이미지는 확인된 것만 쓴다

- 제품 스크린샷은 `brand-assets.tsx`의 `PRODUCT_SCREENSHOTS`에 등록한다. `source`(원본 경로)와 `sha256`을 같이 적는다.
- 등록 기준: **배포된 앱**의 **스토어 제출 품질** 캡처. debug 빌드, 빈 상태 화면, 아직 배포되지 않은 재작성 버전의 캡처는 넣지 않는다.
- 스크린샷이 없는 제품은 자동으로 해당 제품의 Bori 일러스트(`PRODUCT_BORI`)가 나온다. 카드 크기는 같다.
- 추가 방법: `public/brand/screenshots/<product>.png`에 폭 660px로 넣고 `PRODUCT_SCREENSHOTS`에 한 항목을 추가한다.

현재 상태 (2026-09-21):

| 제품           | 스크린샷 | 비고                                                                  |
| -------------- | -------- | --------------------------------------------------------------------- |
| One Second Run | 있음     | `running-app/marketing/app-store/iphone-69/02-today.png`              |
| Weight History | 없음     | 저장소에 debug 빌드의 빈 화면 캡처만 있다                             |
| Sol Scheduler  | 없음     | 저장소에 RN 재작성 작업 중 캡처만 있어 배포본과 같은지 확인할 수 없다 |

**이유.** CLAUDE.md 6번 규칙(확인되지 않은 제품 정보를 만들지 않는다)은 이미지에도 적용된다.

## 5. 문구는 전부 `dictionaries.ts`에 둔다

- 컴포넌트 안에 사용자에게 보이는 문자열을 직접 쓰지 않는다. `aria-label`도 포함한다.
- 장식용 이미지(Bori, 앱 아이콘, 스크린샷)는 `alt=""`로 둔다.

**이유.** 히어로에 영문 문구가 하드코딩돼 있어 ko/ja 페이지에도 영어로 나왔고, Bori의 `alt`는 en/ja 페이지에서도 한국어였다.

## 6. 타이포그래피

- 본문 폰트 Pretendard는 키트가 가변 woff2 한 벌(`PretendardVariable.woff2`, 2.06MB)로 싣는다. 굵기별 OTF는 네이티브 전용이라 웹은 받지 않는다. 웹에서 `@font-face`가 2개 이상 나오면 키트 쪽 회귀다.

- 제목 자간은 `--pl-letter-spacing-display`(-0.035em)보다 좁히지 않는다. 한글과 일본어는 그보다 좁히면 글자가 겹친다.
- `.pixellogic-theme`의 `word-break: keep-all`을 유지한다. 한글 제목이 단어 중간에서 끊기지 않게 한다.
- 폰트는 `--pl-font-family-ui` 하나만 쓴다. 세리프나 모노 폰트를 섞지 않는다.

## 7. 장식

쓰지 않는 것: 배경 그리드, 노이즈 오버레이, 오프셋 그림자(`6px 6px 0`), 기울인 카드(`rotate`), 그라디언트 텍스트. 구분은 `--pl-border` 선과 `--pl-muted` 면으로 한다.

## 8. 새 컴포넌트를 어디에 만드나

1. 키트에 맞는 컴포넌트가 있으면 그것을 쓴다.
2. 없으면 이 저장소의 `src/shared/ui`에 키트 토큰과 primitive로 조립해 만든다. 페이지 파일(`app/[locale]/page.tsx`)에는 조립만 남긴다.
3. 키트 저장소(`brand-assets/design-system`)에는 넣지 않는다. 홈페이지용 컴포넌트를 쓰는 곳이 두 군데 이상 생기면 그때 옮긴다.
4. 앱에서도 필요한 범용 기능은 키트 저장소(`design-system`)에서 직접 고친다. `Button`의 `asChild`가 그 예이고 0.4.1에 들어갔다. 고친 뒤에는 키트에서 `npm run verify`를 돌리고, `npm run pack:ui`로 패킹한 tgz를 이 저장소 `vendor/`에 넣어 `package.json`을 가리키게 한다.

## 9. 확인 방법

화면을 고쳤으면 다크/라이트, 데스크톱(1280px)/모바일(390px), en/ko/ja 중 최소 ko와 en을 눈으로 확인한다. 약관 페이지(`/ko/privacy`)도 같은 CSS를 쓰므로 같이 본다.

```bash
npm run lint
npx vitest run
npm run build
```
