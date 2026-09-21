import Image from "next/image";

export const BORI_ASSETS = {
  neutral: {
    id: "neutral",
    src: "/brand/cream-cat-neutral.png",
    sha256: "41f546d33f6fa67b2847dd4cedbea281b6775f1d17811ff50108c50b45d92734",
  },
  welcome: {
    id: "welcome",
    src: "/brand/bori/welcome.png",
    sha256: "5ea37ba1bad9d559af8b6c041a2df3681fe6f490a535fdc5d636af56ba902bac",
  },
  wave: {
    id: "wave",
    src: "/brand/bori/wave.png",
    sha256: "da0b5d2d748cb00848f93e96d597634e66c21d6ee14d529d2d526852536bd7cb",
  },
  planning: {
    id: "planning",
    src: "/brand/bori/planning.png",
    sha256: "2b147d7d747c5a2d43b29b45dbb414af3e2f4c1a9d4d183ebf33ae5aa246c94e",
  },
  success: {
    id: "success",
    src: "/brand/bori/success.png",
    sha256: "75399c68dc8f09a4128a69f4a9e936e28c2204292c85680bbb59cdb987133683",
  },
  wellnessCheckup: {
    id: "wellness-checkup",
    src: "/brand/bori/wellness-checkup.png",
    sha256: "b789e0e6a26a89ffeb14085e48d2fbb4f49b07bca9e84a14925e56c786035264",
  },
  fitnessRunning: {
    id: "fitness-running",
    src: "/brand/bori/fitness-running.png",
    sha256: "c8b2983dfe5690ad262cc3c1535344096fcf691b6e6d046bb01a912c09591500",
  },
  workProjectPlan: {
    id: "work-project-plan",
    src: "/brand/bori/work-project-plan.png",
    sha256: "56aee1a6a9d0d2603ea5a265de2a504b45b33dd8d6c3857f350ea8def74eb128",
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
        <Image
          className="product-visual-phone"
          src={screenshot.src}
          alt=""
          width={660}
          height={1434}
          sizes="(max-width: 820px) 60vw, 220px"
        />
      ) : (
        <BoriCompanion asset={PRODUCT_BORI[product]} width={168} height={168} />
      )}
    </div>
  );
}
