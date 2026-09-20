import Image from "next/image";

export const CREAM_CAT_ASSET = {
  id: "neutral",
  version: "1.0.0",
  src: "/brand/cream-cat-neutral.png",
  sha256: "41f546d33f6fa67b2847dd4cedbea281b6775f1d17811ff50108c50b45d92734",
} as const;

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

export function PixelLogicLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup${compact ? " is-compact" : ""}`}>
      <PixelLogicMark />
      <span>
        <strong>PixelLogic</strong>
        {!compact ? <small>PRODUCT STUDIO</small> : null}
      </span>
    </span>
  );
}

export function CreamCatCompanion() {
  return (
    <Image
      className="brand-companion-image"
      src={CREAM_CAT_ASSET.src}
      alt="PixelLogic 크림 고양이 브랜드 캐릭터"
      width={1254}
      height={1254}
      priority
    />
  );
}
