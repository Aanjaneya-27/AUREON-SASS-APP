"use client";

import { useRef } from "react";
import { CinematicStage } from "@/components/three/cinematic-stage";
import { EntranceGroup } from "@/components/three/entrance-group";
import { ExperienceShell } from "@/components/three/experience-shell";
import { InteractiveTurntable } from "@/components/three/interactive-turntable";
import { LoadedGltfModel } from "@/components/three/loaded-gltf-model";
import { FramingRig } from "@/components/three/framing-rig";
import { ProductCanvas } from "@/components/three/product-canvas";
import { ProgressOverlay } from "@/components/three/progress-overlay";
import { HEADPHONES_MODEL_PATH } from "@/lib/product-models";
import { cn } from "@/lib/cn";

interface NovaProductViewerProps {
  colorHex: string;
  className?: string;
  onResetView?: () => void;
}

export function NovaProductViewer({
  colorHex,
  className,
}: NovaProductViewerProps) {
  const scrollYRef = useRef(0);

  return (
    <div
      className={cn(
        "relative h-full w-full min-h-[460px] md:min-h-[580px] lg:min-h-[640px] select-none overflow-hidden",
        className,
      )}
    >
      <ExperienceShell modelPath={HEADPHONES_MODEL_PATH} label="AUREON NOVA">
        <ProductCanvas fov={28} exposure={1.34}>
          <FramingRig radius={0.78} padding={1.22} y={0.02} />
          <CinematicStage shadowY={-0.56} />
          <InteractiveTurntable scrollYRef={scrollYRef} autoIdle={true}>
            <EntranceGroup>
              <LoadedGltfModel
                url={HEADPHONES_MODEL_PATH}
                targetSize={1.12}
                shellColor={colorHex}
              />
            </EntranceGroup>
          </InteractiveTurntable>
        </ProductCanvas>
        <ProgressOverlay label="Rendering NOVA" />
      </ExperienceShell>

      {/* Orbit hint pill */}
      <div className="pointer-events-none absolute bottom-4 inset-x-0 flex items-center justify-center z-10 px-4">
        <span className="flex items-center gap-2 rounded-full border border-white/10 bg-obsidian/70 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.28em] text-titanium/80 backdrop-blur-md">
          <svg
            className="h-3 w-3 text-lime animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          360° Drag & Touch to Orbit
        </span>
      </div>
    </div>
  );
}

