import Link from "next/link";
import {
  EarbudsExperienceLazy,
  HeadphonesExperienceLazy,
} from "@/components/three/load-experiences";
import { PRODUCTS } from "@/lib/product-models";
import { HeroVideo } from "@/components/site/hero-video";

export default function Home() {
  return (
    <div className="bg-obsidian">
      {/* Section 01: Cinematic Opening */}
      <HeroVideo />

      {/* 3D Headphone Experience */}
      <HeadphonesExperienceLazy />

      {/* Technology Section 1: NOVA */}
      <ProductIntro
        id="technology"
        kicker={PRODUCTS.headphones.category}
        title={PRODUCTS.headphones.tagline}
        body={PRODUCTS.headphones.description}
        href={PRODUCTS.headphones.href}
        cta="Study NOVA"
      />

      {/* 3D Earbuds Experience */}
      <EarbudsExperienceLazy />

      {/* Technology Section 2: PULSE */}
      <ProductIntro
        kicker={PRODUCTS.earbuds.category}
        title={PRODUCTS.earbuds.tagline}
        body={PRODUCTS.earbuds.description}
        href={PRODUCTS.earbuds.href}
        cta="Study PULSE"
      />
    </div>
  );
}

function ProductIntro({
  kicker,
  title,
  body,
  href,
  cta,
  id,
}: {
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="mx-auto grid max-w-7xl scroll-mt-24 gap-8 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-10"
    >
      <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-lime">
        {kicker}
      </p>
      <div>
        <h2 className="font-serif text-4xl text-white md:text-5xl">{title}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-titanium/75">
          {body}
        </p>
        <Link
          href={href}
          className="mt-8 inline-block font-sans text-[11px] uppercase tracking-[0.28em] text-white underline decoration-lime/70 underline-offset-8"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
