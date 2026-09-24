import Image from "next/image";
import * as UI from "@pixellogic/ui/react";
import type { Locale } from "@/shared/config/site";

export const PRODUCT_APP_ICONS = {
  weightHistory: {
    src: "/brand/products/weight-history.png",
    source: "weight-history iOS AppIcon 1024",
    sha256: "3cebecc3e759ffd136ec7c3a8a756aae096e719db9704c9d8a077bb336440f0e",
  },
  solScheduler: {
    src: "/brand/products/sol-scheduler.png",
    source: "sol-calendar iOS AppIcon",
    sha256: "2e3f80e5c6a3377a9584fa996c5c0d60b58988b44102360910a2227c25ed595e",
  },
  oneSecondRun: {
    src: "/brand/products/one-second-run.png",
    source: "running-app iOS AppIcon 1024",
    sha256: "40f7cfb022628f273289272534b0ca793d66707cec3266ecf305c4b621441141",
  },
  blockBlast: {
    src: "/brand/products/block-blast.png",
    source: "block-blast assets/icon.png",
    sha256: "485c3a1b9317434c9a4f5cbf18ff65c218d7fa29cd104d71105c0eab2062c3e2",
  },
  orbit: {
    src: "/brand/products/orbit.png",
    source: "orbit/apps/mobile/assets/images/orbit-center.png",
    sha256: "73d2ae75147be4fcbd0600b5e2c12e560caf7717bf6ddd3d7141998bc8220898",
  },
} as const;

export type ProductAppIcon = keyof typeof PRODUCT_APP_ICONS;

// Only captures of the shipped product belong here: the App Store listing
// screenshots (itunes lookup screenshotUrls, 660w), or for a web-only product a
// capture of its live site. The first one is the product card image. A product
// without any falls back to its app icon (see docs/design.md).
// Captions are `screens` in dictionaries.ts, in the same order.
type Screenshot = { src: string; sha256: string };

export const PRODUCT_SCREENSHOTS: Partial<
  Record<ProductAppIcon, { source: string; shots: readonly Screenshot[] }>
> = {
  weightHistory: {
    source: "App Store id6749294913 (1.0.8)",
    shots: [
      {
        src: "/brand/screenshots/weight-history/01-record.png",
        sha256:
          "5f311333a9cea216d9e611691b17417541aa8dd8697e5d8d5460372f87173088",
      },
      {
        src: "/brand/screenshots/weight-history/02-forecast.png",
        sha256:
          "c8cb6dbcf70dcd3b6b0ab9b66a78ad03e8f979fb981a52eb63295471809bf5c8",
      },
      {
        src: "/brand/screenshots/weight-history/03-chart.png",
        sha256:
          "fb76062cd61573907ff74ea1df914ed5e3d5f6533ea2dc0db737cf70c12adac1",
      },
      {
        src: "/brand/screenshots/weight-history/04-history.png",
        sha256:
          "81f37c0d17293f9e9385e5ee15dd45a40df7f76133f8dd301394b22646aa7cea",
      },
    ],
  },
  solScheduler: {
    source: "App Store id6476537626 (227.0.0)",
    shots: [
      {
        src: "/brand/screenshots/sol-scheduler/01-calendar.png",
        sha256:
          "6844e36b9c3c099f436733d841367984750d947041ec04df0fa8ca9cac2e20a2",
      },
      {
        src: "/brand/screenshots/sol-scheduler/02-stickers.png",
        sha256:
          "c1b491dd20978455faffd7d8534d4881d51a2a23f672520f39fdef3e931c44dd",
      },
      {
        src: "/brand/screenshots/sol-scheduler/03-todos.png",
        sha256:
          "639c22a0d5a67ab8bb31df988484f524688d41c2b401189f4eb295f2be016852",
      },
      {
        src: "/brand/screenshots/sol-scheduler/04-settings.png",
        sha256:
          "67edf567c99bc6dbc5c305105620fcc390001b4de1f9131abbf71e30f596f2c4",
      },
    ],
  },
  oneSecondRun: {
    source: "App Store id6763670652 (1.0.0)",
    shots: [
      {
        src: "/brand/screenshots/one-second-run/01-today.png",
        sha256:
          "777b2d43b50210ebab6a92642eed5f9d70398d73dce95b6f78d62d096606d90f",
      },
      {
        src: "/brand/screenshots/one-second-run/02-timer.png",
        sha256:
          "e44054b675d297592a2ec45619de3d66e62e893532320654e896bee69225cc31",
      },
      {
        src: "/brand/screenshots/one-second-run/03-history.png",
        sha256:
          "9840457d2e839dee28f886d937c86185f0b0c7e10bb15ac66fc69de1f2644071",
      },
      {
        src: "/brand/screenshots/one-second-run/04-start.png",
        sha256:
          "0df6d1af3d4b04eaba503f6638e657d72986d5e37833b860a75055f5d3896660",
      },
    ],
  },
  blockBlast: {
    source: "App Store id6808668810 (1.0.12)",
    shots: [
      {
        src: "/brand/screenshots/pixellogic-blocks/01-clear.png",
        sha256:
          "2d7f64eff29b39f8a5f5196e563982292cfcc88b03062dc88622d879b76e7ca9",
      },
      {
        src: "/brand/screenshots/pixellogic-blocks/02-next.png",
        sha256:
          "199f57c47ed46b7bba9434a13ec208328366ee46ad6c4bdd32b5bcc5981e351c",
      },
      {
        src: "/brand/screenshots/pixellogic-blocks/03-best.png",
        sha256:
          "82d380bf11b6f752ae5bc8247d2aebc89611517a9332510ba6c13d4a9fea89cc",
      },
    ],
  },
  orbit: {
    source: "https://orbit.web-toolkit.app, 393pt mobile capture (2026-09-24)",
    shots: [
      {
        src: "/brand/screenshots/orbit/01-landing.png",
        sha256:
          "4962109f66ef235dc3f6789bb4ca04f199ff379ba1e7554e01fe726961a0104d",
      },
      {
        src: "/brand/screenshots/orbit/02-how-it-works.png",
        sha256:
          "d301eb6f614a38e6414e6de1ca1297327af51485875e8803e38b057e763a7db6",
      },
    ],
  },
};

// Official badges from Apple's and Google's badge tools, unedited apart from
// trimming Google's transparent margin. See docs/design.md.
export function storeBadgeSources(locale: Locale) {
  return {
    appStore: `/brand/badges/app-store-${locale}.svg`,
    googlePlay: `/brand/badges/google-play-${locale}.png`,
  };
}

export function PixelLogicMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="presentation">
        <path d="M8 8h15c7.2 0 12 3.8 12 10s-4.8 10-12 10h-7v12H8V8Zm8 7v6h6c3.2 0 5-1.1 5-3.2S25.2 15 22 15h-6Z" />
        <path d="M30 29h7v4h-7zM30 36h7v4h-7z" />
      </svg>
    </span>
  );
}

export function PixelLogicLockup() {
  return (
    <span className="brand-lockup">
      <PixelLogicMark />
      <span>
        <strong>PixelLogic</strong>
      </span>
    </span>
  );
}

export function PixelLogicAppIcon({
  product,
  className,
  width = 72,
  height = 72,
}: {
  product: ProductAppIcon;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      className={`product-app-icon${className ? ` ${className}` : ""}`}
      src={PRODUCT_APP_ICONS[product].src}
      alt=""
      width={width}
      height={height}
      aria-hidden="true"
    />
  );
}

function ScreenshotFrame({ src, sizes }: { src: string; sizes: string }) {
  return (
    <UI.DeviceFrame>
      <Image src={src} alt="" width={660} height={1434} sizes={sizes} />
    </UI.DeviceFrame>
  );
}

// 히어로 장면: 제품 카드 표지와 겹치지 않는 실제 화면 한 장(Weight History 차트).
// 고양이가 많은 화면은 솔라와 겹쳐 보여 고르지 않는다.
export function HeroScene() {
  const shot = PRODUCT_SCREENSHOTS.weightHistory?.shots[2];
  return shot ? (
    <ScreenshotFrame src={shot.src} sizes="(max-width: 720px) 70vw, 280px" />
  ) : null;
}

export function ProductVisual({ product }: { product: ProductAppIcon }) {
  const cover = PRODUCT_SCREENSHOTS[product]?.shots[0];

  return (
    <div className="product-visual">
      {cover ? (
        <div className="product-visual-device">
          <ScreenshotFrame
            src={cover.src}
            sizes="(max-width: 820px) 60vw, 220px"
          />
        </div>
      ) : (
        <PixelLogicAppIcon product={product} width={120} height={120} />
      )}
    </div>
  );
}

export function ProductScreens({
  product,
  captions,
}: {
  product: ProductAppIcon;
  captions: readonly string[];
}) {
  const shots = PRODUCT_SCREENSHOTS[product]?.shots ?? [];

  return (
    <ul className="product-screens">
      {shots.map((shot, index) => (
        <li key={shot.src}>
          <ScreenshotFrame
            src={shot.src}
            sizes="(max-width: 720px) 60vw, 240px"
          />
          <span>{captions[index]}</span>
        </li>
      ))}
    </ul>
  );
}
