// import Link from "next/link";
// import {
//   EarbudsExperienceLazy,
//   HeadphonesExperienceLazy,
// } from "@/components/three/load-experiences";
// import { PRODUCTS } from "@/lib/product-models";

// export default function Home() {
//   return (
//     <div className="bg-obsidian">
//       <section
//         id="story"
//         className="relative flex min-h-[100svh] scroll-mt-20 flex-col justify-end px-5 pb-20 pt-32 md:px-10 md:pb-24"
//       >
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(184,189,197,0.08),transparent_42%),radial-gradient(circle_at_20%_80%,rgba(217,255,63,0.05),transparent_36%)]" />
//         <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-lime">
//           Luxury audio atelier
//         </p>
//         <h1 className="mt-6 max-w-5xl font-serif text-[14vw] leading-[0.86] text-white md:text-[7.4rem]">
//           Engineered
//           <br />
//           for immersion.
//         </h1>
//         <p className="mt-8 max-w-xl text-base leading-relaxed text-titanium/80 md:text-lg">
//           Two instruments. One material language. Explore NOVA and PULSE as
//           fully interactive 3D objects — drag, touch, and scroll through a
//           cinematic presentation.
//         </p>
//         <div className="mt-10 flex flex-wrap gap-4">
//           <Link
//             href="/headphones"
//             className="bg-lime px-7 py-3 font-sans text-[11px] uppercase tracking-[0.24em] text-obsidian"
//           >
//             Enter NOVA
//           </Link>
//           <Link
//             href="/earbuds"
//             className="border border-titanium/30 px-7 py-3 font-sans text-[11px] uppercase tracking-[0.24em] text-titanium hover:border-lime hover:text-lime"
//           >
//             Enter PULSE
//           </Link>
//         </div>
//       </section>

//       <HeadphonesExperienceLazy />

//       <ProductIntro
//         id="technology"
//         kicker={PRODUCTS.headphones.category}
//         title={PRODUCTS.headphones.tagline}
//         body={PRODUCTS.headphones.description}
//         href={PRODUCTS.headphones.href}
//         cta="Study NOVA"
//       />

//       <EarbudsExperienceLazy />

//       <ProductIntro
//         kicker={PRODUCTS.earbuds.category}
//         title={PRODUCTS.earbuds.tagline}
//         body={PRODUCTS.earbuds.description}
//         href={PRODUCTS.earbuds.href}
//         cta="Study PULSE"
//       />
//     </div>
//   );
// }

// function ProductIntro({
//   kicker,
//   title,
//   body,
//   href,
//   cta,
//   id,
// }: {
//   kicker: string;
//   title: string;
//   body: string;
//   href: string;
//   cta: string;
//   id?: string;
// }) {
//   return (
//     <section
//       id={id}
//       className="mx-auto grid max-w-7xl scroll-mt-24 gap-8 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-10"
//     >
//       <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-lime">
//         {kicker}
//       </p>
//       <div>
//         <h2 className="font-serif text-4xl text-white md:text-5xl">{title}</h2>
//         <p className="mt-5 max-w-xl text-base leading-relaxed text-titanium/75">
//           {body}
//         </p>
//         <Link
//           href={href}
//           className="mt-8 inline-block font-sans text-[11px] uppercase tracking-[0.28em] text-white underline decoration-lime/70 underline-offset-8"
//         >
//           {cta}
//         </Link>
//       </div>
//     </section>
//   );
// }
import Link from "next/link";
import {
  EarbudsExperienceLazy,
  HeadphonesExperienceLazy,
} from "@/components/three/load-experiences";
import { PRODUCTS } from "@/lib/product-models";

// ⚠️ Replace with your real filename from /public (path starts with "/", never "/public").
const HERO_VIDEO_SRC = "/aureon-brand-video.mp4";

export default function Home() {
  return (
    <div className="bg-obsidian">
      <section
        id="story"
        className="relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(184,189,197,0.08),transparent_42%),radial-gradient(circle_at_20%_80%,rgba(217,255,63,0.05),transparent_36%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left: copy + CTAs */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-lime">
              Luxury audio atelier
            </p>
            <h1 className="mt-6 max-w-5xl font-serif text-[14vw] leading-[0.86] text-white md:text-[7.4rem] lg:text-[5.6rem] xl:text-[6.4rem]">
              Engineered
              <br />
              for immersion.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-titanium/80 md:text-lg">
              Two instruments. One material language. Explore NOVA and PULSE as
              fully interactive 3D objects — drag, touch, and scroll through a
              cinematic presentation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/headphones"
                className="bg-lime px-7 py-3 font-sans text-[11px] uppercase tracking-[0.24em] text-obsidian"
              >
                Enter NOVA
              </Link>
              <Link
                href="/earbuds"
                className="border border-titanium/30 px-7 py-3 font-sans text-[11px] uppercase tracking-[0.24em] text-titanium hover:border-lime hover:text-lime"
              >
                Enter PULSE
              </Link>
            </div>
          </div>

          {/* Right: cinematic video */}
          <div className="relative">
            {/* soft lime/titanium glow behind the frame */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,rgba(217,255,63,0.10),transparent_65%)] blur-2xl" />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-titanium/15 bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/5 sm:aspect-[16/11] lg:aspect-[4/5] lg:max-h-[78vh]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/AUREON.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                
              />

              {/* cinematic overlays */}
              <div className="pointer-events-none absolute inset-0 bg-black/25" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,6,0.85)_0%,rgba(5,5,6,0.1)_45%,rgba(5,5,6,0.45)_100%)]" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.65)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(217,255,63,0.10),transparent_40%)] mix-blend-screen" />

              {/* subtle caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.36em] text-titanium/80">
                  AUREON — Brand film
                </span>
                <span className="h-px w-16 bg-lime/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeadphonesExperienceLazy />

      <ProductIntro
        id="technology"
        kicker={PRODUCTS.headphones.category}
        title={PRODUCTS.headphones.tagline}
        body={PRODUCTS.headphones.description}
        href={PRODUCTS.headphones.href}
        cta="Study NOVA"
      />

      <EarbudsExperienceLazy />

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