import type { Metadata } from "next";
import { LandingHero } from "./_components/landing-hero";
import { TrackedLink } from "./_components/tracked-link";

export const metadata: Metadata = {
  title: "PixelLogic",
  description: "Build small, useful apps for everyday life.",
  alternates: {
    canonical: "https://web-toolkit.app",
  },
  openGraph: {
    type: "website",
    title: "PixelLogic",
    description: "Build small, useful apps for everyday life.",
    url: "https://web-toolkit.app",
    siteName: "PixelLogic",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelLogic",
    description: "Build small, useful apps for everyday life.",
  },
};

const products = [
  {
    name: "ShotDay",
    description: "GLP-1 tracker for consistent shot routines.",
    href: "https://shotday.web-toolkit.app",
    status: "Live",
    value: "Medication routine tracking",
  },
  {
    name: "PlantPal",
    description: "Plant care companion with reminders and AI identify.",
    href: "https://plantpal.web-toolkit.app",
    status: "Live",
    value: "Plant care and identification",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8f8f3_0%,#ffffff_35%,#f6f7fb_100%)] text-neutral-900">
      <LandingHero />

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <h2 className="text-xl font-semibold md:text-2xl">Products</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <TrackedLink
              key={product.name}
              href={product.href}
              eventName={`product_${product.name.toLowerCase()}_click`}
              location="product_card"
              className="group rounded-2xl border border-neutral-200 bg-white/90 p-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold tracking-tight">
                  {product.name}
                </p>
                <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {product.status}
                </span>
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
                {product.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {product.description}
              </p>
              <p className="mt-6 text-sm font-semibold text-neutral-900 group-hover:text-neutral-700">
                Visit site
              </p>
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white/80 p-8 md:p-10">
          <p className="text-xs font-semibold tracking-[0.14em] text-neutral-500">
            WHY PIXELLOGIC
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">Simple by default</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Minimal interfaces with clear next actions.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Practical outcomes</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Every product focuses on one repeatable user job.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Fast updates</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Continuous iteration based on real usage feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p>PixelLogic</p>
          <TrackedLink
            href="mailto:pixellogic.app@gmail.com"
            eventName="footer_contact_click"
            location="footer"
            className="hover:text-neutral-900"
          >
            Contact: pixellogic.app@gmail.com
          </TrackedLink>
        </div>
      </footer>
    </main>
  );
}
