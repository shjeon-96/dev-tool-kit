"use client";

import { useEffect, useRef } from "react";
import { trackTrendEvent } from "@/shared/lib/trend-battle/analytics";

interface AdSlotProps {
  label: string;
  text?: string;
  placement?: string;
}

export function AdSlot({
  label,
  text = "Advertisement",
  placement = label,
}: AdSlotProps) {
  const slotRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        trackTrendEvent("ad_slot_view", {
          placement,
          label,
        });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(slot);

    return () => observer.disconnect();
  }, [label, placement]);

  return (
    <aside
      ref={slotRef}
      aria-label={label}
      data-ad-placement={placement}
      className="mx-auto flex min-h-24 w-full max-w-3xl items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/70 px-4 py-6 text-center text-xs font-semibold uppercase text-slate-500"
    >
      {text}
    </aside>
  );
}
