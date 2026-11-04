"use client";

import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { cn } from "@/lib/cn";
import { useIsMobile } from "@/components/three/use-is-mobile";

type ProductCanvasProps = {
  children: ReactNode;
  className?: string;
  fov?: number;
  exposure?: number;
};

export function ProductCanvas({
  children,
  className,
  fov = 30,
  exposure = 1.28,
}: ProductCanvasProps) {
  const isMobile = useIsMobile();

  return (
    <Canvas
      className={cn("h-full w-full touch-none", className)}
      camera={{ position: [0, 0.04, 3.2], fov, near: 0.12, far: 60 }}
      dpr={isMobile ? [1, 1.25] : [1, 1.75]}
      shadows={!isMobile}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? "low-power" : "high-performance",
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = exposure;
        gl.domElement.style.touchAction = "none";
      }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
