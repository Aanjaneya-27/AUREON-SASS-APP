"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

/* ────────────────────────────────────────────────────────────────────────────
 * Section 06 — Materials & Craftsmanship
 *
 * A luxury editorial section built entirely with CSS-generated abstract
 * macro visuals (no image assets required). Every material claim below is
 * sourced from the verified NOVA and PULSE product-page specifications.
 * ──────────────────────────────────────────────────────────────────────── */

const CHAPTERS = [
  {
    index: "01",
    label: "MATERIALS",
    heading: "Surface & substance.",
    body: "Aero-grade titanium alloy with CNC brushed finish forms the NOVA yoke and sliders. Matte impact-resistant polycarbonate sculpts the PULSE charging case. Each surface is selected for acoustic integrity, tactile quality, and enduring refinement.",
    accent: "from-titanium/10 to-titanium/3",
    // Abstract material texture — simulated brushed metal grain
    visual: (
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-graphite">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(184,189,197,0.04)_2px,rgba(184,189,197,0.04)_3px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(184,189,197,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(217,255,63,0.06),transparent_50%)]" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-titanium/40">
            Titanium alloy · Polycarbonate · Protein leather
          </p>
        </div>
      </div>
    ),
  },
  {
    index: "02",
    label: "PRECISION",
    heading: "Measured in microns.",
    body: "40mm electro-dynamic beryllium drivers formed from pure beryllium foil with an ultra-stiff structural lattice. 11mm graphene-infused diaphragms tuned with high-flux neodymium magnets. Every transducer engineered for crystalline frequency extension and near-zero harmonic distortion.",
    accent: "from-lime/8 to-lime/2",
    // Abstract precision visual — concentric rings suggesting driver geometry
    visual: (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-graphite">
        {[100, 78, 56, 38, 22].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-titanium/10"
            style={{ width: `${size}%`, height: `${size}%` }}
          />
        ))}
        <div className="absolute h-4 w-4 rounded-full bg-lime/20 shadow-[0_0_40px_16px_rgba(217,255,63,0.08)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(8,9,11,0.7)_100%)]" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-titanium/40">
            Beryllium foil · Graphene diaphragm · Neodymium magnet
          </p>
        </div>
      </div>
    ),
  },
  {
    index: "03",
    label: "CRAFT",
    heading: "The ritual of opening.",
    body: "The PULSE charging case conceals a stainless steel hinge pin with magnetic tension dampener — engineered for a weighted, reassuring tactile ritual. NOVA ear cushions pair high-density memory foam with breathable protein leather and a magnetic quick-snap replaceable system.",
    accent: "from-titanium/6 to-titanium/2",
    // Abstract craft visual — hinge & curve language
    visual: (
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-graphite">
        <div className="absolute left-[15%] top-[20%] h-[60%] w-px bg-gradient-to-b from-transparent via-titanium/25 to-transparent" />
        <div className="absolute left-[15%] top-[20%] h-px w-[70%] bg-gradient-to-r from-titanium/25 via-titanium/10 to-transparent" />
        <div className="absolute bottom-[30%] left-[15%] h-px w-[50%] bg-gradient-to-r from-titanium/20 to-transparent" />
        <div className="absolute left-[14%] top-[19%] h-3 w-3 rounded-full border border-titanium/30 bg-graphite" />
        <div className="absolute bottom-[29%] left-[14%] h-2 w-2 rounded-full bg-lime/30 shadow-[0_0_12px_rgba(217,255,63,0.15)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(184,189,197,0.06),transparent_60%)]" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-titanium/40">
            Stainless steel hinge · Memory foam · Liquid silicone
          </p>
        </div>
      </div>
    ),
  },
] as const;

export function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      // Headline entrance
      const heading = section.querySelector("[data-craft-heading]");
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Subheading entrance
      const sub = section.querySelector("[data-craft-sub]");
      if (sub) {
        gsap.fromTo(
          sub,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sub,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Chapter reveals — staggered, alternating direction
      const chapters = section.querySelectorAll("[data-craft-chapter]");
      chapters.forEach((chapter, i) => {
        const visual = chapter.querySelector("[data-craft-visual]");
        const text = chapter.querySelector("[data-craft-text]");
        const isEven = i % 2 === 0;

        if (visual) {
          gsap.fromTo(
            visual,
            { opacity: 0, x: isEven ? -40 : 40, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.15,
              scrollTrigger: {
                trigger: chapter,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      // Subtle parallax on visual blocks
      const visuals = section.querySelectorAll("[data-craft-visual]");
      visuals.forEach((visual) => {
        gsap.to(visual, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // Clean up ScrollTrigger instances created inside this context
      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-obsidian pb-32 pt-24 md:pb-40 md:pt-32"
    >
      {/* ── Ambient atmosphere ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-titanium/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(184,189,197,0.03),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(217,255,63,0.025),transparent_50%)]" />
      </div>

      {/* ── Section header ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-lime/60" />
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.44em] text-lime">
            Materials &amp; Craftsmanship
          </p>
        </div>

        <h2
          data-craft-heading
          className="mt-8 max-w-4xl font-serif text-[10vw] font-normal uppercase leading-[0.88] tracking-tight text-white sm:text-6xl md:text-[5rem] lg:text-[5.6rem]"
        >
          Perfection lives
          <br />
          in the details.
        </h2>

        <p
          data-craft-sub
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-titanium/75 sm:text-lg md:mt-8"
        >
          Every surface, every contour, every finish is considered. The
          experience begins long before the first note.
        </p>
      </div>

      {/* ── Visual chapters ─────────────────────────────────────────────── */}
      <div className="mx-auto mt-20 max-w-7xl space-y-24 px-6 sm:px-10 md:mt-28 md:space-y-32 md:px-12 lg:px-16">
        {CHAPTERS.map((chapter, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={chapter.index}
              data-craft-chapter
              className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 lg:gap-16 ${
                isEven ? "" : "md:[direction:rtl]"
              }`}
            >
              {/* Visual block */}
              <div
                data-craft-visual
                className="md:col-span-7 md:[direction:ltr]"
              >
                <div className={`aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br ${chapter.accent} shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]`}>
                  {chapter.visual}
                </div>
              </div>

              {/* Text block */}
              <div
                data-craft-text
                className="md:col-span-5 md:[direction:ltr]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-lime/70">
                    {chapter.index}
                  </span>
                  <span className="h-px w-5 bg-titanium/20" />
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.36em] text-titanium/60">
                    {chapter.label}
                  </p>
                </div>

                <h3 className="mt-5 font-serif text-3xl font-normal text-white sm:text-4xl">
                  {chapter.heading}
                </h3>

                <p className="mt-4 text-sm font-light leading-relaxed text-titanium/70 sm:text-base">
                  {chapter.body}
                </p>

                {/* Subtle decorative line */}
                <div className="mt-8 h-px w-16 bg-gradient-to-r from-lime/40 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom transition line ──────────────────────────────────────── */}
      <div className="mx-auto mt-28 max-w-7xl px-6 sm:px-10 md:mt-36 md:px-12 lg:px-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-titanium/12 to-transparent" />
      </div>
    </section>
  );
}

