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
      alt="PixelLogic 보리 캐릭터"
      width={width}
      height={height}
      priority={priority}
    />
  );
}

export function BoriDocumentNote({ label }: { label: string }) {
  return (
    <div className="bori-document-note">
      <BoriCompanion className="bori-document-character" />
      <span className="bori-component-label">{label}</span>
    </div>
  );
}
