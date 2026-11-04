import type { Metadata } from "next";
import Link from "next/link";
import { HeadphonesExperienceLazy } from "@/components/three/load-experiences";
import { PRODUCTS } from "@/lib/product-models";

export const metadata: Metadata = {
  title: "NOVA Headphones",
  description: PRODUCTS.headphones.description,
};

export default function HeadphonesPage() {
  const product = PRODUCTS.headphones;

  return (
    <div className="bg-obsidian pt-16">
      <HeadphonesExperienceLazy caption="Scroll to orbit · Drag for precision" />
      <section className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8">
        <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-lime">
          {product.category}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-white md:text-6xl">
          {product.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-titanium/75">
          {product.description} The canvas uses React Three Fiber, cinematic
          lighting, and GSAP ScrollTrigger so rotation stays locked to your
          scroll while mouse and touch remain free for fine control.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/products/nova"
            className="inline-flex items-center gap-2 border border-lime bg-lime px-8 py-3.5 font-sans text-xs uppercase tracking-[0.28em] text-obsidian font-semibold transition hover:bg-lime/90"
          >
            Configure & Acquire NOVA →
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
