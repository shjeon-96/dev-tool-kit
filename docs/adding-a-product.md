# 제품(앱) 추가 가이드

홈페이지에 앱을 하나 더 올릴 때 무엇을 어디에 넣는지, 레이아웃이 어디까지 버티는지 정리한 문서다. 디자인 규칙 자체는 [design.md](./design.md)에 있다.

## 1. 손대는 파일은 5개다

순서대로 하면 타입 오류가 길잡이가 된다.

### (1) `src/shared/config/site.ts` — 제품 ID와 링크

```ts
export const PRODUCT_LINKS = {
  // ...
  newProduct: {
    appStore: "https://apps.apple.com/...",
    googlePlay: "https://play.google.com/...",
  },
} as const satisfies Record<string, Partial<Record<ProductLinkKind, string>>>;
```

- 여기에 키를 추가하면 그게 곧 `ProductId`다. 다른 파일은 이 타입을 따라간다.
- 링크 종류는 `PRODUCT_LINK_KINDS`(`appStore`, `googlePlay`, `web`, `publicPage`)로 제한된다. 없는 종류를 쓰면 컴파일 오류가 난다.
- 종류를 늘리려면 `PRODUCT_LINK_KINDS`와 `dictionaries.ts`의 `common` 라벨을 함께 늘린다. 라벨을 빼먹으면 `page.tsx`에서 오류가 난다.
- 링크는 실제로 열리는 것만 넣는다. 심사 중이거나 비공개 주소는 넣지 않는다.

### (2) `src/shared/ui/brand-assets.tsx` — 아이콘과 이미지

```ts
export const PRODUCT_APP_ICONS = {
  newProduct: {
    src: "/brand/products/new-product.png",
    source: "<원본 저장소> iOS AppIcon 1024",
    sha256: "<shasum -a 256 결과>",
  },
} as const;
```

- 아이콘은 `public/brand/products/<product>.png`에 넣는다. 원본은 앱 저장소의 iOS AppIcon 1024를 쓴다.
- 스크린샷(`PRODUCT_SCREENSHOTS`)은 선택이다. 없으면 큰 앱 아이콘이 대신 나오고 카드 크기는 같다. 등록 기준은 design.md 4번을 따른다.
- `source`와 `sha256`은 나중에 원본을 다시 찾기 위한 것이다. 반드시 채운다.

### (3) `src/shared/i18n/dictionaries.ts` — 문구 (en / ko / ja 3곳)

```ts
{
  id: "newProduct",
  name: "New Product",
  status: "Live app",
  description: "한 문장으로 무엇을 해주는 앱인지.",
  meta: "APP / CATEGORY",
  highlights: ["스토어 설명에 있는 기능 한 줄", "...", "..."],
  screens: ["첫 스크린샷 이름", "..."],
}
```

- `en`, `ko`, `ja` 세 배열 모두에 같은 `id`로 넣는다. 한 곳만 넣으면 그 언어에서만 제품이 사라진다. 타입은 이걸 잡아주지 못하니 직접 확인한다.
- `name`은 번역하지 않는다. 제품명은 세 언어에서 같다.
- `status`는 번역한다. 확인된 사실만 쓴다(design.md 6번, CLAUDE.md 6번).
- `meta`는 대문자 `APP / 분류` 형식을 따른다.
- `highlights`는 상세 페이지의 "이런 일을 해요" 3줄이다. 스토어 설명이나 운영 중인 사이트에 있는 기능만 쓴다.
- `screens`는 `PRODUCT_SCREENSHOTS`의 화면 순서와 같은 개수로 쓴다.

### (4) `src/shared/config/site.ts`의 `PRODUCT_FACTS` — 상세 페이지의 만든 방식

- `stack`은 제품 저장소의 `package.json`·`pubspec.yaml`에서 확인한 것만 쓴다.
- `launched`는 App Store lookup의 `releaseDate`다. 확인할 수 없으면 `undefined`로 둔다.
- 상세 페이지 주소는 제품 ID에서 자동으로 만든다(`weightHistory` → `/work/weight-history`). 사이트맵에도 자동으로 들어간다.

### (5) `public/brand/products/<product>.png` — 아이콘 파일

원본 저장소에서 복사한다. 다른 저장소는 읽기만 한다.

## 2. 원칙(principles)은 제품마다 늘리지 않는다

지금 원칙 3개가 제품 3개를 하나씩 언급해서 1:1처럼 보이지만, 원칙은 스튜디오의 관점이지 제품 목록이 아니다. 제품을 추가한다고 원칙을 따라 늘리지 않는다. 원칙이 실제로 바뀔 때만 손댄다.

## 3. 레이아웃이 버티는 범위

레이아웃은 제품 수를 세지 않고 폭으로 열을 정한다. 앱이 늘어도 CSS를 고칠 일은 없다.

| 영역                             | 규칙                    | 동작                                                                        |
| -------------------------------- | ----------------------- | --------------------------------------------------------------------------- |
| 제품 카드 (`.bori-product-grid`) | `auto-fill`, 최소 300px | 1120px에서 3열, 태블릿 2열, 모바일 1열. 카드 폭은 개수와 무관하게 일정하다. |
| 원칙 (`.bori-principle-grid`)    | `auto-fit`, 최소 240px  | 3개면 3열로 꽉 찬다. 늘어나면 줄바꿈한다.                                   |
| 히어로 앱 줄 (`.bori-hero-apps`) | `flex-wrap`             | 5개에서 3+2로 줄바꿈한다.                                                   |

제품 5개까지는 실제로 렌더링해 확인했다. 데스크톱은 3+2, 모바일은 1열로 떨어지고 넘치는 곳은 없다.

**8개를 넘어가면 다시 볼 것.** 히어로의 앱 아이콘 줄이 세 줄이 되어 안내 카드가 길어진다. 그때는 이 줄을 없애거나(바로 아래 제품 선반과 중복이다) 개수를 제한하는 편이 낫다. 지금 미리 만들지 않는다.

## 4. 확인

```bash
npm run lint
npx vitest run
npm run build
```

그리고 눈으로 본다.

- 세 언어(`/en`, `/ko`, `/ja`)에서 새 제품이 다 보이는지.
- 라이트/다크, 데스크톱(1280px)/모바일(390px).
- 새 제품의 스토어 버튼이 실제로 열리는지.

모바일 캡처를 헤드리스 Chrome으로 할 때는 `--window-size=390`을 그대로 믿지 않는다. 창 최소 폭 때문에 더 넓게 렌더링되고 잘린 화면이 찍힌다. 폭 430px짜리 `<iframe>`에 띄워서 찍는다.
