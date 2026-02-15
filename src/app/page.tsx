import type { Metadata } from "next";
import Link from "next/link";

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
  },
  {
    name: "PlantPal",
    description: "Plant care companion with reminders and AI identify.",
    href: "https://plantpal.web-toolkit.app",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-sm font-semibold tracking-[0.14em] text-neutral-500">
          PIXELLOGIC
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Build small, useful apps for everyday life.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          PixelLogic ships focused products with simple UX and clear value.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <h2 className="text-xl font-semibold md:text-2xl">Products</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="rounded-2xl border border-neutral-200 p-6 transition hover:border-neutral-400"
            >
              <p className="text-2xl font-semibold tracking-tight">
                {product.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {product.description}
              </p>
              <p className="mt-5 text-sm font-medium text-neutral-900">
                Visit site
              </p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p>PixelLogic</p>
          <p>Contact: pixellogic.app@gmail.com</p>
        </div>
      </footer>
    </main>
  );
}
