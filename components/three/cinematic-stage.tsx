"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { useIsMobile } from "@/components/three/use-is-mobile";

type CinematicStageProps = {
  shadowY?: number;
};

export function CinematicStage({ shadowY = -0.62 }: CinematicStageProps) {
  const isMobile = useIsMobile();
  const keyIntensity = isMobile ? 2.15 : 3.15;

  return (
    <>
      <ambientLight intensity={0.62} color="#d7dbe3" />
      <hemisphereLight args={["#f3f5f8", "#2c3036", 0.58]} />
      <spotLight
        castShadow={!isMobile}
        position={[3.1, 4.4, 3.2]}
        angle={0.48}
        penumbra={0.72}
        intensity={keyIntensity}
        color="#ffffff"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.00018}
      />
      <spotLight
        position={[-3.8, 2.4, 2.4]}
        angle={0.72}
        penumbra={1}
        intensity={1.45}
        color="#c8d0db"
      />
      <spotLight
        position={[0.15, 3.1, -3.8]}
        angle={0.42}
        penumbra={0.9}
        intensity={2.05}
        color="#eef3ff"
      />
      <directionalLight
        position={[-2.2, 1.4, -2.8]}
        intensity={0.38}
        color="#d9ff3f"
      />
      <Environment preset="studio" environmentIntensity={0.62} />
      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={isMobile ? 0.32 : 0.42}
        scale={6}
        blur={isMobile ? 3.4 : 2.4}
        far={3.2}
        color="#000000"
      />
    </>
  );
}
