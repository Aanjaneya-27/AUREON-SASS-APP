import type { Metadata } from "next";
import Link from "next/link";
import { EarbudsExperienceLazy } from "@/components/three/load-experiences";
import { PRODUCTS } from "@/lib/product-models";

export const metadata: Metadata = {
  title: "PULSE Wireless Earbuds",
  description: PRODUCTS.earbuds.description,
};

export default function EarbudsPage() {
  const product = PRODUCTS.earbuds;

  return (
    <div className="bg-obsidian pt-16">
      <EarbudsExperienceLazy pinScroll />
      <section className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8">
        <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-lime">
          {product.category}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-white md:text-6xl">
          {product.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-titanium/75">
          {product.description} If your GLB includes open/close clips or a lid
          mesh, the case control appears automatically. Drag or swipe for a
          full 360° inspection.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/products/pulse"
            className="inline-flex items-center gap-2 border border-lime bg-lime px-8 py-3.5 font-sans text-xs uppercase tracking-[0.28em] text-obsidian font-semibold transition hover:bg-lime/90"
          >
            Configure & Acquire PULSE →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.28em] text-titanium transition hover:border-white/50 hover:text-white"
          >
            Return to Atelier
          </Link>
        </div>
      </section>
    </div>
  );
}
