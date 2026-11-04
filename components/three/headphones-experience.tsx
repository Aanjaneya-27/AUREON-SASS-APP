"use client";

import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { CinematicStage } from "@/components/three/cinematic-stage";
import { EntranceGroup } from "@/components/three/entrance-group";
import { ExperienceShell } from "@/components/three/experience-shell";
import { InteractiveTurntable } from "@/components/three/interactive-turntable";
import { LoadedGltfModel } from "@/components/three/loaded-gltf-model";
import { FramingRig } from "@/components/three/framing-rig";
import { ProductCanvas } from "@/components/three/product-canvas";
import { ProgressOverlay } from "@/components/three/progress-overlay";
import { useGsapScrollRotation } from "@/components/three/use-gsap-scroll-rotation";
import { cn } from "@/lib/cn";
import { HEADPHONE_COLORS, type HeadphoneColor } from "@/lib/nova-colors";
import { PRODUCTS } from "@/lib/product-models";

type HeadphonesExperienceProps = {
  pinScroll?: boolean;
  className?: string;
  caption?: string;
};

export function HeadphonesExperience({
  pinScroll = true,
  className,
  caption = "Drag or scroll — 360°",
}: HeadphonesExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useRef(0);
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const product = PRODUCTS.headphones;

  const [colorId, setColorId] = useState<string>(HEADPHONE_COLORS[0].id);
  const selected: HeadphoneColor =
    HEADPHONE_COLORS.find((color) => color.id === colorId) ??
    HEADPHONE_COLORS[0];

  useGsapScrollRotation(sectionRef, scrollY, {
    enabled: pinScroll,
    pin: pinScroll,
    revolutions: 1,
  });

  const onSwatchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = HEADPHONE_COLORS.length - 1;
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
      setColorId(HEADPHONE_COLORS[next].id);
      swatchRefs.current[next]?.focus();
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-obsidian",
        className,
      )}
    >
      <div className="absolute inset-0">
        <ExperienceShell modelPath={product.modelPath} label="AUREON NOVA">
          <ProductCanvas fov={30} exposure={1.32}>
            <FramingRig radius={0.78} padding={1.28} y={0.03} />
            <CinematicStage shadowY={-0.58} />
            <InteractiveTurntable scrollYRef={scrollY}>
              <EntranceGroup>
                <LoadedGltfModel
                  url={product.modelPath}
                  targetSize={1.08}
                  shellColor={selected.hex}
                />
              </EntranceGroup>
            </InteractiveTurntable>
          </ProductCanvas>
          <ProgressOverlay label="Loading NOVA" />
        </ExperienceShell>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 px-6 text-center md:top-28">
        <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-lime">
          {product.category}
        </p>
        <h2 className="mt-3 font-serif text-5xl text-white md:text-7xl">
          {product.name}
        </h2>
      </div>

      {/* Color selector */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex flex-col items-center gap-3 px-4 md:bottom-20">
        <p
          aria-live="polite"
          className="font-sans text-[10px] uppercase tracking-[0.32em] text-titanium/80"
        >
          <span className="text-titanium/50">Finish&nbsp;&nbsp;</span>
          <span className="text-white">{selected.name}</span>
        </p>

        <div
          role="radiogroup"
          aria-label="NOVA headphone color"
          className="pointer-events-auto flex max-w-full items-center justify-center gap-0.5 rounded-full border border-white/10 bg-black/40 px-2 py-1 backdrop-blur-md sm:gap-2 sm:px-3"
        >
          {HEADPHONE_COLORS.map((color, index) => {
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
                onClick={() => setColorId(color.id)}
                onKeyDown={(event) => onSwatchKeyDown(event, index)}
                className="group relative flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-lime/80"
              >
                {/* Selection ring */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-1 rounded-full border transition-all duration-300 ease-out",
                    isSelected
                      ? "scale-100 border-white/90 opacity-100"
                      : "scale-75 border-white/0 opacity-0 group-hover:scale-90 group-hover:border-white/30 group-hover:opacity-100",
                  )}
                />
                {/* Swatch */}
                <span
                  aria-hidden
                  style={{ backgroundColor: color.hex }}
                  className={cn(
                    "relative block h-6 w-6 rounded-full border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.28),inset_0_-2px_3px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out",
                    isSelected
                      ? "scale-100"
                      : "scale-90 group-hover:scale-100 group-active:scale-95",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="pointer-events-none absolute inset-x-0 bottom-8 z-20 text-center font-sans text-[10px] uppercase tracking-[0.36em] text-titanium/70">
        {caption}
      </p>
    </section>
  );
}
