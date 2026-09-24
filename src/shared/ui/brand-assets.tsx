import Image from "next/image";
import * as UI from "@pixellogic/ui/react";

export const BORI_ASSET_SOURCE = { id: "cream-cat", version: "1.0.0" } as const;

export const BORI_ASSETS = {
  neutral: {
    id: "neutral",
    src: "/brand/cream-cat-neutral.png",
    sha256: "5f907374e5b4961f19591446bff576caa893706be411287b1330ecd15c5ed5fb",
  },
  welcome: {
    id: "welcome",
    src: "/brand/bori/welcome.png",
    sha256: "0dd8186ed4a22026014b00db4786a81b3f1e07ef1c55b3ba31d02eea0cfb564d",
  },
  wave: {
    id: "wave",
    src: "/brand/bori/wave.png",
    sha256: "7851ec5f0e79fd466ebc64abe2c2e38f9fd76584f3e74fb81345af102e7e5d77",
  },
  planning: {
    id: "planning",
    src: "/brand/bori/planning.png",
    sha256: "ebdbfce999ffc5e83d57d0d22a099e90cd6aeb32bb7ee172a212690a187371bb",
  },
  success: {
    id: "success",
    src: "/brand/bori/success.png",
    sha256: "cf3765ea03cc63558dffcdfc40bd789c3075929c7192c39a8a349e2d80943767",
  },
  wellnessCheckup: {
    id: "wellness-checkup",
    src: "/brand/bori/wellness-checkup.png",
    sha256: "00f0d2c16ac602f314c0090117045dd8b687ca2f8eaac30b58b796325767fcea",
  },
  fitnessRunning: {
    id: "fitness-running",
    src: "/brand/bori/fitness-running.png",
    sha256: "e39488efa7388823fb43721cdcf7f74bce218375c96a434f2a9168c47550151d",
  },
  workProjectPlan: {
    id: "work-project-plan",
    src: "/brand/bori/work-project-plan.png",
    sha256: "57677e8b4060b420ba34bf85c309d04cb9294187a6973d360cb7b678ec227ae2",
  },
} as const;

export type BoriAsset = keyof typeof BORI_ASSETS;

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

// Only store-grade captures of the shipped app belong here. A product without
// one falls back to its Bori illustration (see docs/design.md).
export const PRODUCT_SCREENSHOTS: Partial<
  Record<ProductAppIcon, { src: string; source: string; sha256: string }>
> = {
  oneSecondRun: {
    src: "/brand/screenshots/one-second-run.png",
    source: "running-app marketing/app-store/iphone-69/02-today.png (660w)",
    sha256: "f4cb92a01cd2691feabcbed0ff6f84dfa1533f23b9d51884b480bdfba32d90d0",
  },
};

const PRODUCT_BORI: Record<ProductAppIcon, BoriAsset> = {
  weightHistory: "wellnessCheckup",
  solScheduler: "workProjectPlan",
  oneSecondRun: "fitnessRunning",
  blockBlast: "success",
  orbit: "welcome",
};

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

export function BoriCompanion({
  asset = "neutral",
  className,
  priority = false,
  width = 1254,
  height = 1254,
}: {
  asset?: BoriAsset;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      className={`brand-companion-image${className ? ` ${className}` : ""}`}
      src={BORI_ASSETS[asset].src}
      alt=""
      width={width}
      height={height}
      priority={priority}
    />
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

export function ProductVisual({ product }: { product: ProductAppIcon }) {
  const screenshot = PRODUCT_SCREENSHOTS[product];

  return (
    <div className="product-visual">
      {screenshot ? (
        <div className="product-visual-device">
          <UI.DeviceFrame>
            <Image
              src={screenshot.src}
              alt=""
              width={660}
              height={1434}
              sizes="(max-width: 820px) 60vw, 220px"
            />
          </UI.DeviceFrame>
        </div>
      ) : (
        <BoriCompanion asset={PRODUCT_BORI[product]} width={168} height={168} />
      )}
    </div>
  );
}
