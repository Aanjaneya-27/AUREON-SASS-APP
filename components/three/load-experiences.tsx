"use client";

import dynamic from "next/dynamic";
import { LoadingIndicator } from "@/components/three/loading-indicator";

export const HeadphonesExperienceLazy = dynamic(
  () =>
    import("@/components/three/headphones-experience").then(
      (mod) => mod.HeadphonesExperience,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[100svh] min-h-[640px] bg-obsidian">
        <LoadingIndicator label="Opening NOVA" />
      </div>
    ),
  },
);

export const EarbudsExperienceLazy = dynamic(
  () =>
    import("@/components/three/earbuds-experience").then(
      (mod) => mod.EarbudsExperience,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[100svh] min-h-[640px] bg-obsidian">
        <LoadingIndicator label="Opening PULSE" />
      </div>
    ),
  },
);

export const NovaProductViewerLazy = dynamic(
  () =>
    import("@/components/three/nova-product-viewer").then(
      (mod) => mod.NovaProductViewer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-full min-h-[460px] w-full items-center justify-center bg-obsidian/60">
        <LoadingIndicator label="Initializing NOVA 3D Atelier" />
      </div>
    ),
  },
);

export const PulseProductViewerLazy = dynamic(
  () =>
    import("@/components/three/pulse-product-viewer").then(
      (mod) => mod.PulseProductViewer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-full min-h-[460px] w-full items-center justify-center bg-obsidian/60">
        <LoadingIndicator label="Initializing PULSE 3D Atelier" />
      </div>
    ),
  },
);
