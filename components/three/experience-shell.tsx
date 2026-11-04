"use client";

import { type ReactNode } from "react";
import { LoadingIndicator } from "@/components/three/loading-indicator";
import { MissingModelFallback } from "@/components/three/missing-model-fallback";
import { ModelErrorBoundary } from "@/components/three/model-error-boundary";
import { useModelExists } from "@/components/three/use-model-exists";

type ExperienceShellProps = {
  modelPath: string;
  label: string;
  children: ReactNode;
};

export function ExperienceShell({
  modelPath,
  label,
  children,
}: ExperienceShellProps) {
  const status = useModelExists(modelPath);

  if (status === "checking") {
    return <LoadingIndicator label={`Preparing ${label}`} />;
  }

  if (status === "missing") {
    return <MissingModelFallback path={modelPath} label={label} />;
  }

  return (
    <ModelErrorBoundary path={modelPath} label={label}>
      {children}
    </ModelErrorBoundary>
  );
}
