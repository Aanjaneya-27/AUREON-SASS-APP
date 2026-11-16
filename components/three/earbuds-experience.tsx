"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CinematicStage } from "@/components/three/cinematic-stage";
import { EntranceGroup } from "@/components/three/entrance-group";
import { ExperienceShell } from "@/components/three/experience-shell";
import { InteractiveTurntable } from "@/components/three/interactive-turntable";
import {
  LoadedGltfModel,
  type GltfProductHandle,
  type ModelCapabilities,
} from "@/components/three/loaded-gltf-model";
import { FramingRig } from "@/components/three/framing-rig";
import { ProductCanvas } from "@/components/three/product-canvas";
import { useGsapScrollRotation } from "@/components/three/use-gsap-scroll-rotation";
import { ProgressOverlay } from "@/components/three/progress-overlay";
import { getGsap } from "@/lib/gsap-client";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "@/lib/product-models";
import {
  PULSE_COLORS,
  type PulseColor,
  setPulseColor,
  usePulseColor,
} from "@/lib/pulse-color-store";

type EarbudsExperienceProps = {
  className?: string;
  pinScroll?: boolean;
  caption?: string;
};

export function EarbudsExperience({
  className,
  pinScroll = false,
  caption = "Drag · Touch · 360°",
}: EarbudsExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const product = PRODUCTS.earbuds;
  const modelRef = useRef<GltfProductHandle>(null);
  const [open, setOpen] = useState(false);
  const [canToggleCase, setCanToggleCase] = useState(false);
  const pulseColor = usePulseColor();

  // Scroll-driven rotation
  useGsapScrollRotation(sectionRef, scrollY, {
    enabled: true,
    pin: pinScroll,
    revolutions: 1,
  });

  // Capabilities detection (case open/close)
  const onCapabilities = useCallback((caps: ModelCapabilities) => {
    setCanToggleCase(caps.canToggleCase);
  }, []);

  const toggleCase = () => {
    const changed = modelRef.current?.toggleCase();
    if (changed) setOpen((value) => !value);
  };

  // GSAP text entrance for the right info panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const children = Array.from(panel.children);
      gsap.fromTo(
        children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.3,
        },
      );
    }, panel);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation for colour swatches
  const onSwatchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = PULSE_COLORS.length - 1;
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = index === last ? 0 : index + 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = index === 0 ? last : index - 1;
      } else if (event.key === "Home") {
        next = 0;
      } else if (event.key === "End") {
        next = last;
      } else {
        return;
      }
      event.preventDefault();
      setPulseColor(PULSE_COLORS[next].id);
      swatchRefs.current[next]?.focus();
    },
    [],
  );

  const selected: PulseColor =
    PULSE_COLORS.find((c) => c.id === pulseColor.id) ?? PULSE_COLORS[0];

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-obsidian",
        className,
      )}
    >
      {/* ── Full-bleed 3D Canvas ──────────────────────────────────────── */}
      <div className="absolute inset-0">
        <ExperienceShell modelPath={product.modelPath} label="AUREON PULSE">
          <ProductCanvas fov={32} exposure={1.3}>
            <FramingRig radius={0.64} padding={1.2} y={0.06} />
            <CinematicStage shadowY={-0.4} />
            <InteractiveTurntable scrollYRef={scrollY}>
              <EntranceGroup>
                <LoadedGltfModel
                  ref={modelRef}
                  url={product.modelPath}
                  targetSize={0.68}
                  shellColor={pulseColor.hex}
                  onCapabilities={onCapabilities}
                />
              </EntranceGroup>
            </InteractiveTurntable>
          </ProductCanvas>
          <ProgressOverlay label="Loading PULSE" />
        </ExperienceShell>
      </div>

      {/* ── Cinematic vignette: RIGHT column fade for text legibility ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[52%] bg-gradient-to-l from-obsidian/95 via-obsidian/60 to-transparent md:w-[46%]"
      />
      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-obsidian to-transparent"
      />
      {/* Top fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-obsidian/60 to-transparent"
      />

      {/* ── Right editorial panel ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex w-full items-center justify-end px-6 sm:px-10 md:px-12 lg:px-16">
        <div
          ref={panelRef}
          className="pointer-events-auto flex max-w-[380px] flex-col items-end text-right lg:max-w-[420px]"
        >
          {/* Product line kicker */}
          <div className="flex items-center gap-2.5">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.44em] text-lime">
              {product.category}
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_rgba(217,255,63,0.9)]" />
          </div>

          {/* Product name */}
          <h2 className="mt-4 font-serif text-[13vw] font-normal leading-[0.88] tracking-tight text-white sm:text-8xl md:text-[6rem] lg:text-[6.5rem]">
            {product.name}
          </h2>

          {/* Tagline */}
          <p className="mt-5 font-serif text-xl font-light italic leading-snug text-titanium/90 sm:text-2xl">
            &ldquo;A pair. A case. A private stage.&rdquo;
          </p>

          {/* Description */}
          <p className="mt-4 text-sm font-light leading-relaxed text-titanium/70 sm:text-base">
            Freedom in every movement. Precision in every detail.
          </p>

          {/* Case toggle */}
          {canToggleCase ? (
            <button
              type="button"
              onClick={toggleCase}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-titanium/25 bg-graphite/50 px-5 py-2 font-sans text-[10px] uppercase tracking-[0.28em] text-titanium backdrop-blur-md transition-all duration-300 hover:border-lime hover:text-lime focus:outline-none focus:ring-2 focus:ring-lime/50"
            >
              <svg
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-500",
                  open && "rotate-180",
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
              <span>{open ? "Close case" : "Open case"}</span>
            </button>
          ) : null}

          {/* Colour selector */}
          <div className="mt-6">
            <p
              aria-live="polite"
              className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.32em] text-titanium/70"
            >
              <span className="text-titanium/40">Finish&nbsp;&nbsp;</span>
              <span className="text-white">{selected.name}</span>
            </p>

            <div
              role="radiogroup"
              aria-label="PULSE earbud color"
              className="flex items-center justify-end gap-1.5"
            >
              {PULSE_COLORS.map((color, index) => {
                const isSelected = color.id === selected.id;
                return (
                  <button
                    key={color.id}
                    ref={(node) => {
                      swatchRefs.current[index] = node;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={color.name}
                    title={color.name}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setPulseColor(color.id)}
                    onKeyDown={(event) => onSwatchKeyDown(event, index)}
                    className="group relative flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-lime/70"
                  >
                    {/* Selection ring */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0.5 rounded-full border transition-all duration-300 ease-out",
                        isSelected
                          ? "scale-100 border-white/80 opacity-100"
                          : "scale-75 border-transparent opacity-0 group-hover:scale-90 group-hover:border-white/30 group-hover:opacity-100",
                      )}
                    />
                    {/* Swatch dot */}
                    <span
                      aria-hidden
                      style={{ backgroundColor: color.hex }}
                      className={cn(
                        "relative block h-5 w-5 rounded-full border border-white/25 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-2px_3px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out",
                        isSelected
                          ? "scale-100"
                          : "scale-90 group-hover:scale-100 group-active:scale-95",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Colour description */}
            <p className="mt-2 font-sans text-[10px] leading-relaxed text-titanium/50">
              {selected.description}
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/earbuds"
              className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.24em] text-titanium/70 transition-colors duration-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-3 w-3 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>View Experience</span>
            </Link>
            <Link
              href="/products/pulse"
              className="inline-flex items-center justify-center rounded-full bg-lime px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-obsidian shadow-[0_0_20px_rgba(217,255,63,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(217,255,63,0.55)] focus:outline-none focus:ring-2 focus:ring-lime"
            >
              Explore PULSE
            </Link>
          </div>
        </div>
      </div>

      {/* ── Interaction hint (bottom centre) ──────────────────────────── */}
      <p className="pointer-events-none absolute inset-x-0 bottom-6 z-20 text-center font-sans text-[10px] uppercase tracking-[0.36em] text-titanium/50">
        {caption}
      </p>
    </section>
  );
}
