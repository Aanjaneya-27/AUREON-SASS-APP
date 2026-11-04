"use client";

import { useCallback, useRef, useState } from "react";
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
import { PulseColorSelector } from "@/components/ui/pulse-color-selector";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "@/lib/product-models";
import { setPulseColor, usePulseColor } from "@/lib/pulse-color-store";

type EarbudsExperienceProps = {
  className?: string;
  pinScroll?: boolean;
};

export function EarbudsExperience({
  className,
  pinScroll = false,
}: EarbudsExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useRef(0);
  const product = PRODUCTS.earbuds;
  const modelRef = useRef<GltfProductHandle>(null);
  const [open, setOpen] = useState(false);
  const [canToggleCase, setCanToggleCase] = useState(false);
  const pulseColor = usePulseColor();

  useGsapScrollRotation(sectionRef, scrollY, {
    enabled: true,
    pin: pinScroll,
    revolutions: 1,
  });

  const onCapabilities = useCallback((caps: ModelCapabilities) => {
    setCanToggleCase(caps.canToggleCase);
  }, []);

  const toggleCase = () => {
    const changed = modelRef.current?.toggleCase();
    if (changed) setOpen((value) => !value);
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-obsidian",
        className,
      )}
    >
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

      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 px-6 text-center md:top-28">
        <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-lime">
          {product.category}
        </p>
        <h2 className="mt-3 font-serif text-5xl text-white md:text-7xl">
          {product.name}
        </h2>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-4 px-6 md:bottom-8">
        <PulseColorSelector value={pulseColor.id} onChange={setPulseColor} />
        {canToggleCase ? (
          <button
            type="button"
            onClick={toggleCase}
            className="pointer-events-auto border border-titanium/30 bg-graphite/70 px-6 py-2 font-sans text-[10px] uppercase tracking-[0.32em] text-titanium backdrop-blur-md transition hover:border-lime hover:text-lime"
          >
            {open ? "Close case" : "Open case"}
          </button>
        ) : null}
        <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-titanium/70">
          Drag to orbit · Touch enabled
        </p>
      </div>
    </section>
  );
}
