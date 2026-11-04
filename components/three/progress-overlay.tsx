"use client";

import { useProgress } from "@react-three/drei";
import { LoadingIndicator } from "@/components/three/loading-indicator";

export function ProgressOverlay({ label }: { label: string }) {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <LoadingIndicator
      label={`${label} ${Math.min(100, Math.round(progress))}%`}
    />
  );
}
