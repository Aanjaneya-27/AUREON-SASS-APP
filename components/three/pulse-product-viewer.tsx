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
import { ProgressOverlay } from "@/components/three/progress-overlay";
import { EARBUDS_MODEL_PATH } from "@/lib/product-models";
import { cn } from "@/lib/cn";

interface PulseProductViewerProps {
  colorHex: string;
  className?: string;
}

export function PulseProductViewer({
  colorHex,
  className,
}: PulseProductViewerProps) {
  const scrollYRef = useRef(0);
  const modelRef = useRef<GltfProductHandle>(null);
  const [open, setOpen] = useState(false);
  const [canToggleCase, setCanToggleCase] = useState(false);

  const onCapabilities = useCallback((caps: ModelCapabilities) => {
    setCanToggleCase(caps.canToggleCase);
  }, []);

  const toggleCase = () => {
    const changed = modelRef.current?.toggleCase();
    if (changed) setOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "relative h-full w-full min-h-[460px] md:min-h-[580px] lg:min-h-[640px] select-none overflow-hidden",
        className,
      )}
    >
      <ExperienceShell modelPath={EARBUDS_MODEL_PATH} label="AUREON PULSE">
        <ProductCanvas fov={32} exposure={1.3}>
          <FramingRig radius={0.64} padding={1.2} y={0.06} />
          <CinematicStage shadowY={-0.4} />
          <InteractiveTurntable scrollYRef={scrollYRef} autoIdle={true}>
            <EntranceGroup>
              <LoadedGltfModel
                ref={modelRef}
                url={EARBUDS_MODEL_PATH}
                targetSize={0.68}
                shellColor={colorHex}
                onCapabilities={onCapabilities}
              />
            </EntranceGroup>
          </InteractiveTurntable>
        </ProductCanvas>
        <ProgressOverlay label="Rendering PULSE" />
      </ExperienceShell>

      {/* Case Toggle & Orbit Controls Pill */}
      <div className="absolute bottom-4 inset-x-0 flex flex-wrap items-center justify-center gap-3 z-10 px-4">
        {canToggleCase && (
          <button
            type="button"
            onClick={toggleCase}
            aria-label={open ? "Close charging case" : "Open charging case"}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-titanium/30 bg-graphite/80 px-5 py-2 font-sans text-[10px] uppercase tracking-[0.28em] text-white backdrop-blur-md transition-all duration-200 hover:border-lime hover:text-lime active:scale-95"
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                open ? "bg-lime" : "bg-titanium/60",
              )}
            />
            {open ? "Close Case" : "Open Case"}
          </button>
        )}

        <span className="pointer-events-none flex items-center gap-2 rounded-full border border-white/10 bg-obsidian/70 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.28em] text-titanium/80 backdrop-blur-md">
          <svg
            className="h-3 w-3 text-lime animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          360° Drag to Orbit
        </span>
      </div>
    </div>
  );
}

