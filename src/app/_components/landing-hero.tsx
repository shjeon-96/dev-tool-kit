"use client";

import { useEffect, useMemo, useState } from "react";
import { TrackedLink } from "./tracked-link";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, unknown> },
    ) => void;
  }
}

type HeroVariant = "a" | "b";

const HERO_COPY: Record<HeroVariant, { title: string; subtitle: string }> = {
  a: {
    title: "Build small, useful apps for everyday life.",
    subtitle:
      "Focused products for health and daily routines. No clutter, clear value, practical results.",
  },
  b: {
    title: "Practical apps that make daily routines easier.",
    subtitle:
      "PixelLogic ships focused tools for real habits, faster decisions, and consistent outcomes.",
  },
};

function resolveHeroVariant(): HeroVariant {
  if (typeof window === "undefined") return "a";

  const urlVariant = new URLSearchParams(window.location.search).get("ab");
  if (urlVariant === "a" || urlVariant === "b") {
    localStorage.setItem("pixellogic_hero_ab", urlVariant);
    return urlVariant;
  }

  const saved = localStorage.getItem("pixellogic_hero_ab");
  if (saved === "a" || saved === "b") return saved;

  const assigned: HeroVariant = Math.random() < 0.5 ? "a" : "b";
  localStorage.setItem("pixellogic_hero_ab", assigned);
  return assigned;
}

export function LandingHero() {
  const [variant] = useState<HeroVariant>(() => resolveHeroVariant());

  useEffect(() => {
    document.documentElement.dataset.heroAbVariant = variant;

    const payload = {
      event: "hero_variant_view",
      hero_variant: variant,
      timestamp: Date.now(),
    };

    window.dataLayer?.push(payload);
    window.gtag?.("event", "hero_variant_view", payload);
    window.plausible?.("hero_variant_view", {
      props: { hero_variant: variant },
    });
  }, [variant]);

  const copy = useMemo(() => HERO_COPY[variant], [variant]);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-14 md:pt-28 md:pb-20">
      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500">
        PIXELLOGIC
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
        {copy.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
        {copy.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLink
          href="https://shotday.web-toolkit.app"
          eventName="hero_shotday_click"
          location="hero"
          className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Start with ShotDay
        </TrackedLink>
        <TrackedLink
          href="https://plantpal.web-toolkit.app"
          eventName="hero_plantpal_click"
          location="hero"
          className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-500"
        >
          Explore PlantPal
        </TrackedLink>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 text-xs text-neutral-600">
        <span className="rounded-full border border-neutral-300 bg-white px-3 py-1">
          Built by PixelLogic
        </span>
        <span className="rounded-full border border-neutral-300 bg-white px-3 py-1">
          Mobile-first products
        </span>
        <span className="rounded-full border border-neutral-300 bg-white px-3 py-1">
          Fast iteration
        </span>
      </div>
    </section>
  );
}
