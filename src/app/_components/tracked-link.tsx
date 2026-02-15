"use client";

import Link from "next/link";
import type { ReactNode } from "react";

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

interface TrackedLinkProps {
  href: string;
  className?: string;
  eventName: string;
  location: string;
  children: ReactNode;
}

export function TrackedLink({
  href,
  className,
  eventName,
  location,
  children,
}: TrackedLinkProps) {
  const handleClick = () => {
    const abVariant = document.documentElement.dataset.heroAbVariant ?? "a";

    const payload = {
      event: "cta_click",
      cta_event: eventName,
      location,
      href,
      ab_variant: abVariant,
      timestamp: Date.now(),
    };

    window.dataLayer?.push(payload);
    window.gtag?.("event", "cta_click", payload);
    window.plausible?.("cta_click", {
      props: {
        cta_event: eventName,
        location,
        ab_variant: abVariant,
      },
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
